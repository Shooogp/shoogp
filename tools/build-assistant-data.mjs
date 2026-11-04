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

/* الأرقامُ الهنديةُ ← عدد (لِحسابِ إجابةِ «المقارنة»، فهي لا تُخزَّنُ في السؤال) */
const numOf = (s) => Number(String(s).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[^\d.]/g, ''));
const compareLine = (a, b) => {
  const x = numOf(a), y = numOf(b);
  return `${a} ${x > y ? 'أكبر من' : x < y ? 'أصغر من' : 'يساوي'} ${b}`;
};
/* «الشمسية والقمرية»: الإجابةُ تُحسَبُ من الحرفِ بعدَ «ال» (لا تُخزَّنُ في السؤال) */
const SUN = new Set('تثدذرزسشصضطظلن');
const sunMoon = (words) => {
  const g = { s: [], m: [] };
  for (const w of words) { const b = String(w).replace(/[ً-ْـ]/g, ''); (SUN.has(b.replace(/^ال/, '')[0]) ? g.s : g.m).push(w); }
  return `شمسية: ${g.s.join('، ')} · قمرية: ${g.m.join('، ')}`;
};

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
    /* ── أنواعُ الموادِّ الأخرى (لملفّاتِ بحثِ المالك — ‏lessons/) ── */
    case 'judge-reason':
      return `${P} ← ${clean(label(q.options?.[q.answer]))}، ${clean(label(q.reasons?.[q.reasonAnswer]))}`;
    case 'equation-builder': {
      let i = 0;
      return `${P} ← ${(q.tokens || []).map((t) => (t === '__' ? q.answers?.[i++] ?? '…' : t)).join(' ')}`;
    }
    case 'pattern': {
      let i = 0;
      return `${P} ← ${(q.items || []).map((t) => (t === '__' ? q.answers?.[i++] ?? '…' : t)).join('، ')}${q.rule ? ` (${clean(q.rule)})` : ''}`;
    }
    case 'tashkeel':
    case 'arrange':
      return `${P} ← ${clean(q.word)}`;
    case 'sentence':
      return `${P} ← ${clean(q.sentence)}`;
    case 'sun-moon':
      return `${P} ← ${sunMoon(q.words || [])}`;
    case 'letter-picture':
      return `${P} ← ${(q.pairs || []).map((p) => `${clean(p.letter)} ↔ ${clean(p.word)}`).join(' · ')}`;
    case 'sound-blend':
      return `${P} [${(q.letters || []).join(' ')}] ← ${clean(label(q.options?.[q.answer]))}`;
    case 'trace-letter':
      return `${P} ← الحرف ${clean(q.letter)}`;
    case 'compare':
      return `${P} ← ${(q.pairs || []).map((p) => compareLine(p.a, p.b)).join(' · ')}`;
    case 'count-tap':
      return `${P} ← ${q.target ?? q.count ?? ''}`;
    case 'number-line':
      return `${P} ← ${q.target ?? ''}`;
    case 'hundred-chart':
      return `${P} ← ${(q.missing || q.multiple ? [].concat(q.missing || [], q.multiple ? [`مضاعفات ${q.multiple}`] : []) : []).join('، ')}`;
    case 'array':
      return `${P} ← ${q.rows} صفوف × ${q.cols}${q.answerSentence ? ` (${clean(q.answerSentence)})` : ''}`;
    case 'measure-tool':
      return `${P} ← ${q.target ?? q.value ?? ''}${q.unit ? ' ' + q.unit : ''}`;
    case 'clock':
      return `${P} ← ${clean(q.target)}`;
    case 'chart-read':
      return `${P} ← ${clean(q.answer)} [${(q.series || []).map((s) => `${clean(s.label)} ${s.value}`).join('، ')}]`;
    case 'money':
      return `${P} ← ${q.target ?? ''} بيسة`;
    case 'place-value':
      return `${P} ← ${q.target}`;
    case 'symmetry':
      return `${P} ← خطوط التماثل الصحيحة: ${(q.lines || []).filter((l) => l.ok).length}`;
    case 'listen-locate':
      return `${P} (سورة ${clean(q.surah)} الآية ${q.ayah})${q.why ? ` ← ${clean(q.why)}` : ''}`;
    case 'maze':
      return `${P} ← ${clean(q.targetLabel)}`;
    case 'hotspot':
    case 'find-error':
      return `${P} (الجواب موضعٌ يُنقَرُ في الرسم)`;
    case 'puzzle':
      return `${P} (بازل صورة)`;
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

/* ═══ ألعابُ شوجب (طلبُ إبراهيم ٢٠٢٦-١١-٠٤: «لاحظتُه لا يعلمُ شيئاً عن ألعابِ شوجب») ═══
   كانَ في ملخّصِ n8n سطرٌ بأسماءِ الألعابِ وحدَها (وبعضُها قديم). فالقائمةُ هنا من games/index.html نفسِه
   (‏GAMES: الاسمُ ووصفُ البطاقةِ والنوع) فتتبعُ الصفحة، وطريقةُ لعبِ كلِّ لعبةٍ مختصرةٌ من مهارةِ shoogp-games
   في HOW — ولعبةٌ جديدةٌ بلا سطرٍ هنا تُوصَفُ بوصفِ بطاقتِها، فلا تغيبُ عن المساعد. و`aka` كلماتٌ يُسمّيها بها
   الناسُ فتطابقُها أداةُ open_games («الغنجتين» اسمٌ قديمٌ لسباقِ السفينتين).
   تُكتَبُ في حقلِ `games` من ملفّاتِ المعرفة (يقرؤه n8n في جلستَي المعلّمةِ والمالك)، وفي data/assistant/games.json
   لأداةِ open_games في assistant.html. */
const HOW = {
  build: { aka: 'المنارة العيجة صور البناء', how: 'كلّ إجابةٍ صحيحةٍ يُنزل بها صاروخ شوجب قطعةً من منارة العيجة بالحبال إلى مكانها على الرأس الصخريّ في صور، حتى تكتمل ستّ قطعٍ ويُضاء مصباحها. والشمس تتّجه نحو الغروب مع كلّ سؤال، ويستمرّ البناء ليلاً على ضوء الفوانيس.' },
  'build-nizwa': { aka: 'القلعه نزوى البناء', how: 'مثل بناء المنارة: كلّ إجابةٍ صحيحةٍ يُنزل بها الصاروخ قطعةً من قلعة نزوى في واحتها، حتى تكتمل ستّ قطعٍ ويُرفع العلم على برجها.' },
  meteors: { aka: 'النيزك الشهب', how: 'خيارات السؤال مكتوبةٌ على نيازك تهبط ببطءٍ فوق قلعة نزوى، فيلمس التلاميذ النيزك الصحيح ويفتّته الصاروخ بشعاع. والخطأ أو انتهاء الوقت يُسقط النيازك على الأرض. والهدف تفتيت ستّة نيازك.' },
  falaj: { aka: 'الافلاج الماء المزرعه', how: 'فلجٌ يخرج من نفقٍ عند الجبل إلى مزرعة نخيل، عليه ستّة حواجز تحجز الماء. كلّ إجابةٍ صحيحةٍ يرفع بها الصاروخ حاجزاً فيجري الماء إلى الذي يليه، وفي الختام تمتلئ أحواض النخيل وتخضرّ.' },
  souq: { aka: 'السوق مطرح البيسات الجفير التسوق', how: 'كلّ إجابةٍ صحيحةٍ تربح مئتي بيسة، ويختار التلاميذ ما يشترونه من دكاكين سوق مطرح متى كفت نقودهم، حتى يمتلئ الجفير بخمسة أغراض؛ فيتعلّمون الادّخار والمقارنة بين الأسعار.' },
  rocks: { aka: 'الصخور العواصف السفينه الغنجه البحر', how: 'سفينةٌ شراعيّةٌ تبحر، وفي كلّ سؤالٍ تقترب منها صخرةٌ أو غيمةُ عاصفة؛ الإجابة الصحيحة قبل وصولها يفتّتها بها الصاروخ فتتقدّم السفينة، والخطأ أو انتهاء الوقت يجعلها تتضرّر وتتراجع مرحلة. والهدف ستّ مراحل حتى الجزيرة.' },
  balloons: { aka: 'البالونات العيد الحاره', how: 'خيارات السؤال معلّقةٌ ببالوناتٍ تصعد من ساحة الحارة القديمة يوم العيد؛ يلمس التلاميذ البالون الصحيح فيتفرقع وتسقط هديّته في سلّة العيد، حتى تمتلئ بستّ هدايا.' },
  tug: { aka: 'شد الحبل الحبل', how: 'فريقان، البرتقاليّ يميناً والأزرق يساراً، والسؤال نفسه على الجانبين بترتيب خياراتٍ مختلف. أوّل فريقٍ يجيب صحيحاً يسحب الحبل المربوط بين صاروخين، والخطأ يُقفل جانبه في ذلك السؤال. ويفوز من يسحب أربع مرّاتٍ صافية.' },
  duel: { aka: 'سباق الغنجتين الغنجه السفينتين السفن', how: 'فريقان على طريقة شدّ الحبل نفسها؛ أوّل من يجيب صحيحاً تُبحر سفينته الشراعيّة من صور مرحلة، وأوّل سفينةٍ تصل إلى الجزيرة بعد ستّ مراحل تفوز.' },
  kite: { aka: 'الطائره الورقيه الجبل الاخضر الورد', how: 'فريقان على طريقة شدّ الحبل نفسها؛ أوّل من يجيب صحيحاً ترتفع طائرته الورقيّة مدرّجاً فوق مدرّجات الجبل الأخضر وتجمع ورداً في سلّتها، وأوّل طائرةٍ تبلغ القمّة بعد ستّة مدرّجاتٍ تفوز.' },
};
function gamesInfo() {
  const src = fs.readFileSync('games/index.html', 'utf8');
  const m = src.match(/const GAMES = (\[[\s\S]*?\]);/);
  const list = m ? JSON.parse(m[1]) : [];
  if (!list.length) console.warn('⚠ لم أجد قائمةَ GAMES في games/index.html');
  const games = list.map((g) => ({
    id: g.id, name: g.t, kind: g.k === 'فريقان' ? 'تحدٍّ بين فريقين' : 'تعاونيّة للصفّ كلّه',
    aka: (HOW[g.id] && HOW[g.id].aka) || '', how: (HOW[g.id] && HOW[g.id].how) || g.d + '.',
  }));
  const duo = games.filter((g) => g.kind !== 'تعاونيّة للصفّ كلّه').length;
  const lines = [
    `- لكلّ كتابٍ في شوجب صفحة «ألعاب الكتاب»، يفتحها زرّ «العب» في رأس فهرس الكتاب، وفيها ${games.length} ألعابٍ صفّيّةٍ تُلعب على السبورة: ${games.length - duo} منها تعاونيّةٌ يعمل فيها الصفّ كلّه لهدفٍ واحد، و${duo} منها تحدٍّ بين فريقين على جانبي السبورة.`,
    '- تختار المعلّمة من قائمتين: الدرس أو «الوحدة كاملة» (أسئلة دروسها مخلوطة)، ثمّ اللعبة. فأيّ لعبةٍ تعمل مع أيّ درس، ولا تبدأ لعبةٌ حتى تختارها، وتغيير الدرس أو اللعبة في أيّ وقتٍ يبدأ اللعبة بالأسئلة الجديدة.',
    '- الأسئلة من بنك ألعاب الدرس: نحو عشرة أسئلةٍ لكلّ درسٍ من محتواه، اختيارٌ من متعدّدٍ وصحٌّ وخطأ فقط. ترتيبها عشوائيّ، والإجابة الخاطئة لا تكشف الصواب بل يعود السؤال لاحقاً، ولا خسارة في أيّ لعبة: لا تنتهي بفشلٍ مهما كثرت الأخطاء.',
    '- ألعاب الوحدات المقفلة تُفتح مع رمز الكتاب نفسه، وألعاب الوحدات المجّانيّة مفتوحة للجميع. وللألعاب أصواتٌ هادئةٌ تناسب مكانها، تعمل بعد أوّل لمسةٍ وتُكتم بزرّ الصوت.',
    '- الألعاب وطريقة كلٍّ منها:',
    ...games.map((g) => `  - ${g.name} (${g.kind}): ${g.how}`),
  ];
  return { generated: PLATFORM.generated, list: games.map(({ id, name, kind, aka }) => ({ id, name, kind, aka })), lines };
}
const GAMES = gamesInfo();

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
        bank: (bank[l.file] || []).length,   // عددُ أسئلةِ بنكِ ألعابِ الدرس — تذكرُه المساعدةُ إن سُئلت عن ألعابِه
      };
      total++;
    });
  });
  const out = { book, title: b.book, generated: new Date().toISOString().slice(0, 10), platform: PLATFORM, games: { generated: GAMES.generated, lines: GAMES.lines }, lessons };
  fs.writeFileSync(`${OUT_DIR}/${book}.json`, JSON.stringify(out, null, 1) + '\n');
  const size = fs.statSync(`${OUT_DIR}/${book}.json`).size;
  console.log(`✓ ${book}: ${Object.keys(lessons).length} درساً — ${(size / 1024).toFixed(1)} ك.ب`);
}
console.log(`المجموع: ${total} درساً`);
fs.writeFileSync(`${OUT_DIR}/games.json`, JSON.stringify({ generated: GAMES.generated, games: GAMES.list }, null, 1) + '\n');
console.log(`✓ ألعاب شوجب: ${GAMES.list.length} لعبة (games.json وحقلُ games في ملفّاتِ المعرفة)`);

/* ═══ ملفّاتُ البحثِ لمحادثةِ المالك — data/assistant/lessons/<كتاب>.json (طلبُ إبراهيم ٢٠٢٦-١١-٠٣) ═══
   لاحظَ أنّ المساعدَ في محادثتِه «لا يعرفُ الدروسَ والفهارسَ والأسئلة»: فملفّاتُ العلومِ أعلاه تُقرَأُ
   لدرسٍ واحدٍ تختارُه المعلّمة. فهنا ملفٌّ لكلِّ كتابٍ في الموقع (الموادُّ كلُّها) فيه كلُّ درسٍ بأهدافِه
   وأسئلتِه (النوعُ والمستوى والهدفُ والإجابة) وبنكِ ألعابِه — تجلبُه الصفحةُ (assistant.html) حينَ يسألُ
   المالكُ عن درسٍ بأداةِ get_lesson_content، فلا يدخلُ تعليماتِ الجلسةِ كلُّه (‏js/questions.js ٢٫٤ ميغابايت). */
const TYPE_AR = {
  mcq: 'اختيار من متعدد', 'true-false': 'صح وخطأ', matching: 'التوصيل', classify: 'التصنيف', 'fill-blank': 'ملء الفراغ',
  sequence: 'الترتيب التسلسلي', exclude: 'الاستبعاد', 'judge-reason': 'الحكم والتعليل', memory: 'بطاقات الذاكرة',
  hotspot: 'النقطة الساخنة', mindmap: 'الخريطة الذهنية', 'equation-builder': 'بناء المعادلة', color: 'التلوين بالتعليمات',
  'drag-drop': 'السحب والإفلات', tashkeel: 'التشكيل', sentence: 'ترتيب كلمات الجملة', 'find-error': 'اكتشف الخطأ',
  arrange: 'ترتيب الحروف', 'sound-blend': 'دمج الأصوات', 'letter-picture': 'توصيل الحرف بالصورة', 'count-tap': 'العدّ بالنقر',
  compare: 'المقارنة', 'number-line': 'خط الأعداد', puzzle: 'البازل', pattern: 'النمط', slider: 'الشريط المتدرّج',
  array: 'المصفوفة', 'measure-tool': 'أداة القياس', 'hundred-chart': 'لوحة المائة', 'trace-letter': 'تتبّع الحرف',
  clock: 'الساعة', 'listen-locate': 'استمع وحدّد', 'chart-read': 'قراءة التمثيل البياني', money: 'النقود',
  'place-value': 'القيمة المنزلية', symmetry: 'التماثل', 'sun-moon': 'الشمسية والقمرية', maze: 'المتاهة',
  'audio-q': 'السؤال الصوتي', lens: 'العدسة المكبّرة',
};
const LEVEL_AR = { knowledge: 'معرفة', application: 'تطبيق', reasoning: 'استدلال', evaluation: 'تقويم' };
/* «أحب لغتي» بمسمّياتِ وثيقةِ التقويم (§مستويات «أحب لغتي» في CLAUDE.md) */
const LEVEL_AR_LUG = { knowledge: 'التذكّر', reasoning: 'الفهم والاستدلال المباشر', application: 'التطبيق والتحليل والإبداع', evaluation: 'التقويم' };
const LOOK_DIR = `${OUT_DIR}/lessons`;
fs.mkdirSync(LOOK_DIR, { recursive: true });
let lookLessons = 0, lookBytes = 0;
for (const [book, b] of Object.entries(index)) {
  const bank = loadBank(book);
  const LV = /arabic/.test(book) ? LEVEL_AR_LUG : LEVEL_AR;
  const lessons = {};
  b.units.forEach((u, ui) => {
    u.lessons.forEach((l, li) => {
      const qs = Q[l.file] || [];
      const objectives = [...new Set(qs.map((q) => clean(q.objective)).filter(Boolean))];
      const seen = new Set();
      const questions = qs.map((q) => {
        const text = factOf(q);
        seen.add(key(text));
        const o = objectives.indexOf(clean(q.objective));
        return { type: TYPE_AR[q.type] || q.type, level: LV[q.level] || q.level || '', ...(o > -1 ? { objective: o + 1 } : {}), text };
      });
      const extra = [];
      (bank[l.file] || []).forEach((x) => { const f = bankFact(x); const k = key(f); if (f && k.length > 3 && !seen.has(k)) { seen.add(k); extra.push(f); } });
      lessons[l.file] = {
        title: clean(l.title), unit: clean(u.unit), unitNo: ui + 1, lessonNo: li + 1,
        ...(pagesOf[l.file] ? { pages: pagesOf[l.file] } : {}),
        objectives, questions, bank: extra,
      };
      lookLessons++;
    });
  });
  const f = `${LOOK_DIR}/${book}.json`;
  fs.writeFileSync(f, JSON.stringify({ book, title: b.book, generated: PLATFORM.generated, lessons }) + '\n');
  lookBytes += fs.statSync(f).size;
}
console.log(`✓ ملفّاتُ بحثِ المالك: ${Object.keys(index).length} كتاباً، ${lookLessons} درساً — ${(lookBytes / 1024).toFixed(0)} ك.ب`);
