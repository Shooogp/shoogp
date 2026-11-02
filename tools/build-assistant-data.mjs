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
  const out = { book, title: b.book, generated: new Date().toISOString().slice(0, 10), lessons };
  fs.writeFileSync(`${OUT_DIR}/${book}.json`, JSON.stringify(out, null, 1) + '\n');
  const size = fs.statSync(`${OUT_DIR}/${book}.json`).size;
  console.log(`✓ ${book}: ${Object.keys(lessons).length} درساً — ${(size / 1024).toFixed(1)} ك.ب`);
}
console.log(`المجموع: ${total} درساً`);
