/* ═══════════════════════════════════════════════════════════════
   بانِي معرفةِ «مساعد المعلّمة» — data/assistant/<كتاب>.json
   ───────────────────────────────────────────────────────────────
   المساعدُ الصوتيُّ (assistant.html) لا يقرأُ كتابَ التلميذ — فملفّاتُ PDF
   محلّيةٌ لا تُرفَع (§قواعد حقوق النشر في CLAUDE.md). بل يقرأُ ما ألّفته
   شوجب نفسُها من الكتاب: أهدافَ الدرسِ وأسئلتَه وبنكَ ألعابِه، مُحوَّلةً إلى
   «حقائقَ» مقروءة (العبارةُ الصحيحة، الإجابةُ الصحيحة، الجملةُ مكتملة…).

   يقرؤه سيرُ n8n «شوجب — مساعد المعلمة (رمز الجلسة)» فيبني منه تعليماتِ
   جيميناي لايف للدرسِ الذي اختارته المعلّمة.

   التشغيل:  npm run assistant-data
   ويُعادُ تشغيلُه بعدَ أيِّ تأليفٍ أو تعديلٍ في أسئلةِ كتابٍ مشمول.
   ═══════════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import vm from 'node:vm';

/* الكتبُ المشمولةُ في التجربةِ الأولى (قرار المالك ٢٠٢٦-١١-٠٢: العلوم للصفوف الأربعة) */
const BOOKS = ['g1-sci', 'g2-sci', 'g3-sci', 'g4-sci'];
const OUT_DIR = 'data/assistant';

const index = JSON.parse(fs.readFileSync('data/index.json', 'utf8'));
const qSrc = fs.readFileSync('js/questions.js', 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(qSrc, ctx, { timeout: 30000 });
const Q = ctx.window.QUESTIONS || {};

/* صفحاتُ كتابِ التلميذ من تعليقِ رأسِ الدرس: «… (كتاب التلميذ ص١٨–١٩)» */
const pagesOf = {};
{
  const lines = qSrc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*"(g\d[a-z]+\d*-[\d-]+)"\s*:\s*\[/);
    if (!m) continue;
    for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
      const p = lines[j].match(/كتاب التلميذ\s*(ص[^)]*)/);
      if (p) { pagesOf[m[1]] = p[1].trim(); break; }
      if (lines[j].trim() && !lines[j].trim().startsWith('//')) break;
    }
  }
}

/* بنكُ ألعابِ الكتاب — أسئلةٌ إضافيةٌ لكلِّ درس (اختيار من متعدد · صح وخطأ) */
function loadBank(book) {
  const f = `games/data/${book}.js`;
  if (!fs.existsSync(f)) return {};
  const s = fs.readFileSync(f, 'utf8');
  const json = s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1);
  const data = JSON.parse(json);
  const out = {};
  for (const u of data.units || []) for (const l of u.lessons || []) out[l.id] = l.qs || [];
  return out;
}

/* الحركاتُ تُبقى (النصُّ مشكولٌ للتلميذ) ولا تضرُّ النموذج؛ ويُمحى ما ليس نصّاً */
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const isText = (s) => typeof s === 'string' && s.trim() && !s.includes('<') && !/\.(png|jpe?g|svg|webp|wav|mp3)$/i.test(s);
const label = (o) => (typeof o === 'string' ? o : (o && (o.label || o.text || o.name)) || '');

/* سؤالٌ ← سطرُ حقيقة. ما لا يحملُ نصّاً مفهوماً (بازل بلا نصّ) يعودُ بموجِّهِه وحدَه */
function factOf(q) {
  const P = clean(q.prompt);
  const ans = (arr, a) => (Array.isArray(a) ? a.map((i) => label(arr[i])).join('، ') : label(arr?.[a]));
  switch (q.type) {
    case 'true-false':
      return `${clean(q.statement || q.prompt)} ← ${q.answer ? 'صحيح' : 'خطأ'}${q.reason ? ` (${clean(q.reason)})` : ''}`;
    case 'mcq':
    case 'audio-q':
      return `${P} ← ${clean(ans(q.options || [], q.answer))}${q.reason ? ` (${clean(q.reason)})` : ''}`;
    case 'exclude':
      return `${P} [${(q.options || []).map(label).join('، ')}] ← المختلف: ${clean(label(q.options?.[q.answer]))}${q.reason ? ` — ${clean(q.reason)}` : ''}`;
    case 'fill-blank': {
      let i = 0;
      return clean(String(q.text || '').replace(/\{\}/g, () => q.answers?.[i++] ?? '…'));
    }
    case 'classify':
      return `${P} ← ${(q.groups || []).map((g) => `${clean(g.name)}: ${(g.items || []).map(label).join('، ')}`).join(' · ')}`;
    case 'matching':
    case 'memory':
      return `${P} ← ${(q.pairs || []).map((p) => `${clean(label(p.a))} ↔ ${clean(label(p.b))}`).join(' · ')}`;
    case 'sequence':
      return `${P} ← ${(q.steps || []).map(label).join(' ← ')}`;
    case 'mindmap':
      return `${clean(q.center)}: ${(q.branches || []).map((b) => `${clean(b.label)} ${clean(b.answer)}`).join(' · ')}`;
    case 'drag-drop':
      return `${P} ← الأجزاء: ${(q.targets || []).map((t) => clean(t.answer)).join('، ')}`;
    case 'color':
      return `${P} ← ${(q.parts || []).map((p) => clean(p.name)).join('، ')}`;
    case 'lens':
      return `${P} ← ${(q.spots || []).map((s) => clean(s.label)).join('، ')}`;
    case 'slider':
      return `${P} ← نحو ${q.answer}${q.unit ? ' ' + q.unit : ''}`;
    default: {
      /* احتياطٌ لأيِّ نوعٍ آخر: الموجِّهُ وما فيه من نصوصٍ قصيرة */
      const bits = [];
      for (const [k, v] of Object.entries(q)) {
        if (['type', 'objective', 'level', 'prompt', 'bg', 'fit', 'image', 'svg', 'hidden', 'sound'].includes(k)) continue;
        if (isText(v) && v.length < 120) bits.push(clean(v));
      }
      return clean([P, bits.join('، ')].filter(Boolean).join(' ← '));
    }
  }
}

function bankFact(b) {
  if (b.t === 't') return `${clean(b.q)} ← ${b.a ? 'صحيح' : 'خطأ'}`;
  if (b.t === 'm') return `${clean(b.q)} ← ${clean((b.o || [])[b.a])}`;
  return '';
}

/* مقارنةٌ بلا حركاتٍ ولا ترقيم — لإسقاطِ المكرَّرِ بين الدرسِ وبنكِ الألعاب */
const key = (s) => String(s).replace(/[ً-ْـ]/g, '').replace(/[^\p{L}\p{N}]+/gu, '');

/* ═══ أرقامُ المنصّةِ لمحادثةِ المالك (طلبُ إبراهيم ٢٠٢٦-١١-٠٢) ═══
   سألَ المساعدَ «كم عددُ الكتب؟» فقالَ لا أعرف — لأنّ ملخّصَ n8n (‏BRIEF) نصٌّ ثابتٌ بلا أرقام،
   وتعليماتُه تمنعُه أن يخترعَ رقماً. فالأرقامُ تُحسَبُ هنا من البياناتِ نفسِها وتُعادُ مع كلِّ تشغيل،
   فلا تتقادم: data/books.json (البطاقاتُ المنشورة) · data/index.json (الوحداتُ والدروس) ·
   js/questions.js (الأسئلة) · games/data (بنوكُ الألعاب) · data/bundles.json · js/sales-state.js ·
   js/unlock.js (المجّانيّ) · pay.html (السعر).
   وتُكتَبُ جُملاً عربيةً جاهزةً في حقلِ `platform` من كلِّ ملفِّ كتاب — لأنّ سيرَ n8n يجلبُ ملفّاً
   واحداً في كلِّ جلسة، فلا عقدةَ جلبٍ ثانية. ولا تُقرَأُ إلا في محادثةِ المالك. */
function platformLines() {
  const books = JSON.parse(fs.readFileSync('data/books.json', 'utf8'));
  const bundles = JSON.parse(fs.readFileSync('data/bundles.json', 'utf8'));
  const salesSrc = fs.readFileSync('js/sales-state.js', 'utf8');
  const unlockSrc = fs.readFileSync('js/unlock.js', 'utf8');
  const price = Number((fs.readFileSync('pay.html', 'utf8').match(/PRICE\s*:\s*([\d.]+)/) || [])[1]) || 0;

  /* قاعدةُ المجّانيّ من js/unlock.js نفسِه (‏freeUnits) — لا نسخةَ ثانيةً منها هنا */
  const fuSrc = (unlockSrc.match(/function freeUnits\([\s\S]*?\n  }\n/) || [])[0];
  const fuDefault = Number((unlockSrc.match(/var FREE_UNITS\s*=\s*(\d+)/) || [])[1] || 1);
  const freeUnits = fuSrc ? vm.runInNewContext(`var FREE_UNITS=${fuDefault};${fuSrc};freeUnits`) : () => fuDefault;
  /* القيمُ من كائنِ SHOOGP_SALES نفسِه لا من تعليقِ رأسِ الملفّ (فيه «freeAll:false» مثالاً) */
  const salesObj = (salesSrc.match(/SHOOGP_SALES\s*=\s*\{([\s\S]*?)\}/) || [])[1] || '';
  const flag = (k) => /true/.test((salesObj.match(new RegExp(k + '\\s*:\\s*(\\w+)')) || [])[1] || '');
  const sTitle = (salesObj.match(/title\s*:\s*'([^']*)'/) || [])[1] || '';

  const inBundle = new Set(Object.values(bundles).flatMap((b) => b.members || []));
  const bankCount = (key) => Object.values(loadBank(key)).reduce((n, qs) => n + qs.length, 0);
  const N = (n) => String(n);

  const terms = [];
  const subj = new Map();   // اسمُ المادّة ← مجاميعُها
  const perBook = [];
  const types = new Set();
  let cards = 0, hidden = 0, standaloneSale = 0, units = 0, lessons = 0, qCount = 0, bankAll = 0;

  for (const [term, grades] of Object.entries(books)) {
    let termCards = 0;
    for (const [grade, list] of Object.entries(grades)) {
      for (const bk of list) {
        if (bk.devOnly) { hidden++; continue; }
        termCards++; cards++;
        if (!inBundle.has(bk.key) && bk.onSale) standaloneSale++;
        const ix = index[bk.key] || { units: [] };
        const u = ix.units.length;
        const ls = ix.units.flatMap((x) => x.lessons);
        const q = ls.reduce((n, l) => n + (Q[l.file] || []).length, 0);
        ls.forEach((l) => (Q[l.file] || []).forEach((x) => x.type && types.add(x.type)));
        const bank = bankCount(bk.key);
        units += u; lessons += ls.length; qCount += q; bankAll += bank;
        const part = /-1$/.test(bk.key) ? ' (الجزء الأول)' : /-2$/.test(bk.key) && inBundle.has(bk.key) ? ' (الجزء الثاني)' : '';
        const f = freeUnits(bk.key, u);
        const free = f === Infinity || f >= u ? 'الكتابُ كلُّه' : f <= 0 ? 'لا شيء' : f === u - 1 && u > 2 ? 'كلُّ الوحداتِ إلا الأخيرة' : f === 1 ? 'الوحدةُ الأولى' : f === 2 ? 'الوحدتان الأوليان' : `أوّلُ ${N(f)} وحدات`;
        perBook.push(`- ${bk.title}${part} — الصف ${grade}: الوحدات ${N(u)}، الدروس ${N(ls.length)}، الأسئلة ${N(q)}، بنك الألعاب ${N(bank)}، المجّانيّ في الوضع العادي: ${free}.`);
        const s = subj.get(bk.title) || { cards: 0, grades: new Set(), units: 0, lessons: 0, q: 0, bank: 0 };
        s.cards++; s.grades.add(grade); s.units += u; s.lessons += ls.length; s.q += q; s.bank += bank;
        subj.set(bk.title, s);
      }
    }
    terms.push(`الفصل الدراسي ${term}: ${termCards ? N(termCards) + ' بطاقة' : 'لم يُبنَ بعد'}`);
  }

  const bundleSale = Object.values(bundles).filter((b) => b.onSale).length;
  const sellable = standaloneSale + bundleSale;
  const twoPart = [...inBundle].filter((k) => /-1$/.test(k)).length;   // كتابٌ بجزأين = بطاقتان
  /* صيغةُ «الاسم: العدد» عمداً — فالمساعدُ يصوغُ العددَ والمعدودَ نطقاً صحيحاً، بدلَ «4 كتاباً» */
  const lines = [
    `- الكتب المنشورة: بطاقات الكتب ${N(cards)}، وهي ${N(cards - twoPart)} كتاباً مطبوعاً لأنّ أحبّ لغتي وديني حياتي بجزأين في كلّ صفّ وكلّ جزءٍ بطاقة. المواد ${N(subj.size)}، والصفوف من الأول إلى الرابع. ${terms.join('، ')}.` + (hidden ? ` ومخفيٌّ قيد الإعداد: ${N(hidden)}.` : ''),
    `- المجموع في المنصّة كلّها: الوحدات ${N(units)}، الدروس ${N(lessons)}، الأسئلة التفاعلية في الدروس ${N(qCount)}، أسئلة بنوك الألعاب ${N(bankAll)}، أنواع الأسئلة المستعملة ${N(types.size)}.`,
    `- وحدات البيع ${N(sellable)}: كتبٌ مستقلّة ${N(standaloneSale)}، وحزمُ جزأين ${N(bundleSale)} (أحبّ لغتي وديني حياتي يُباع جزآهما برمزٍ واحد)` + (price ? `، والسعر ${N(price)} ريالات عُمانية لكلّ وحدةٍ للعام الدراسي.` : '.'),
    '- لكلّ مادّة (مجموع الصفوف الأربعة):',
    ...[...subj].map(([t, s]) => `  - ${t}: البطاقات ${N(s.cards)}، الوحدات ${N(s.units)}، الدروس ${N(s.lessons)}، الأسئلة ${N(s.q)}، بنك الألعاب ${N(s.bank)}.`),
    '- لكلّ كتاب:',
    ...perBook.map((l) => '  ' + l),
    `- حالُ البيع الآن: ${flag('freeAll') ? `كلّ الوحدات مفتوحةٌ مجّاناً للجميع${sTitle ? ` («${sTitle}»)` : ''}` : 'القفلُ عاملٌ على الوحدات غير المجّانية'}، و${flag('paused') ? 'الشراءُ موقوفٌ مؤقّتاً' : 'الشراءُ قائم'}.`,
  ];
  return { generated: new Date().toISOString().slice(0, 10), lines };
}
const PLATFORM = platformLines();

fs.mkdirSync(OUT_DIR, { recursive: true });
let total = 0;
for (const book of BOOKS) {
  const b = index[book];
  if (!b) { console.warn('⚠ كتابٌ غيرُ موجودٍ في الفهرس:', book); continue; }
  const bank = loadBank(book);
  const lessons = {};
  b.units.forEach((u, ui) => {
    u.lessons.forEach((l, li) => {
      const qs = Q[l.file] || [];
      const objectives = [...new Set(qs.map((q) => clean(q.objective)).filter(Boolean))];
      const seen = new Set();
      const facts = [];
      const push = (f) => { const k = key(f); if (f && k.length > 3 && !seen.has(k)) { seen.add(k); facts.push(f); } };
      qs.forEach((q) => push(factOf(q)));
      (bank[l.file] || []).forEach((x) => push(bankFact(x)));
      lessons[l.file] = {
        title: clean(l.title),
        unit: clean(u.unit),
        unitNo: ui + 1,
        lessonNo: li + 1,
        pages: pagesOf[l.file] || '',
        objectives,
        facts,
      };
      total++;
    });
  });
  const out = { book, title: b.book, generated: new Date().toISOString().slice(0, 10), platform: PLATFORM, lessons };
  fs.writeFileSync(`${OUT_DIR}/${book}.json`, JSON.stringify(out, null, 1) + '\n');
  const size = fs.statSync(`${OUT_DIR}/${book}.json`).size;
  console.log(`✓ ${book}: ${Object.keys(lessons).length} درساً — ${(size / 1024).toFixed(1)} ك.ب`);
}
console.log(`المجموع: ${total} درساً`);
