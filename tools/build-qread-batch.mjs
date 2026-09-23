/* ═══ قراءةُ نصِّ السؤالِ صوتياً — مولِّدُ الدفعةِ وسِجِلُّ المتاح ═══
   (قرار المالك ٢٠٢٦-٠٩-٢٣: أصواتُ قراءةِ الأسئلةِ لكتبِ الصفِّ الأولِ بصوتِ «حطاب» من داريجات)

   ‏① `node tools/build-qread-batch.mjs batch <batchId> [--limit N] [--sample N]`
      يكتبُ `tools/audio-batch.json` بنصوصِ الأسئلةِ التي **لا ملفَّ لها بعدُ** في
      `audio/qread/` — فتشغيلُه مرّةً بعدَ مرّةٍ يُكمِلُ الناقصَ ولا يُكرِّرُ المولَّد.
      `--limit` يقطعُ الدفعةَ (سيرُ n8n يُرسِلُ عنصراً كلَّ ١٥ ثانية، فَـ٨٠ ≈ ٢٠ دقيقة)،
      و`--sample` يأخذُ عيّنةً موزّعةً على الكتبِ للتجربة.
      `--redo qr-a,qr-b` يعيدُ توليدَ مقاطعَ موجودة (باسمٍ ملحَقٍ في فرعِ الاستلامِ لأنّ الأصلَ
      موجودٌ هناك؛ ويُنسَخُ عندَ الاستلامِ إلى اسمِه الأصليّ).
      **ولا يدخلُ الدفعةَ نصٌّ عربيٌّ غيرُ مشكولٍ تامّاً** (‏`toneProblem`) — قرارُ المالك
      ٢٠٢٦-٠٩-٢٣: داريجات لا يضبطُ النطقَ بلا تشكيل. فيُكتَبُ في `tools/qread-spoken.json` أوّلاً.
   ‏② `node tools/build-qread-batch.mjs manifest`
      يكتبُ `js/qread.js` بقائمةِ البصماتِ التي لها ملفٌّ فعلاً — فلا يظهرُ زرٌّ بلا صوت.
   ‏③ `node tools/build-qread-batch.mjs list`   يطبعُ النصَّ المنطوقَ لكلِّ سؤالٍ (للمراجعة).

   **اسمُ الملفِّ بصمةُ النصِّ الخامِ لا رقمُ السؤال** (‏`qr-<fnv1a>` على `q.prompt||q.statement`
   كما يُعرَضُ حرفياً): فسؤالٌ عُدِّلَ نصُّه تتغيّرُ بصمتُه فيختفي زرُّه **بدلَ أن يَقرأَ نصّاً قديماً**،
   وسؤالانِ بالنصِّ نفسِه يتشاركانِ ملفّاً واحداً. والدالّةُ نفسُها في `js/app.js` (‏`qreadHash`).

   **النصُّ المنطوقُ غيرُ المعروض** (`spoken()`): تُحذَفُ الآيةُ ﴿…﴾ فلا يقرأُ صوتٌ آليٌّ نصّاً
   قرآنياً (قرار المالك)، وتُكتَبُ ﷺ صلاةً كاملة، وتُحذَفُ الرموزُ التعبيريةُ (عدُّها هو السؤال). */
import fs from 'node:fs';
import vm from 'node:vm';

const ROOT = new URL('..', import.meta.url).pathname;
const GRADE = 'g1-';
const DIR = 'audio/qread';

export function qreadHash(s){
  let h = 0x811c9dc5;
  for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return 'qr-' + h.toString(16).padStart(8, '0');
}

/* استثناءاتٌ بالنصِّ المعروضِ حرفياً — حيثُ القاعدةُ العامّةُ لا تُنتِجُ جملةً مفهومة. */
const OVERRIDE = {
  '﴿بِسْمِ اللهِ الرَّحْمنِ الرَّحيمِ﴾ تُسَمّى…': 'الآيَةُ الكَريمَةُ المَكْتوبَةُ تُسَمّى…',
  // قراءةُ الكلمةِ الناقصةِ تكشفُ الحرفَ المطلوب
  'بِأَيِّ حَرْفٍ تُكْمِلُ كَلِمَةَ (خَديـ … ـةُ)؟': 'بِأَيِّ حَرْفٍ تُكْمِلُ الكَلِمَةَ؟'
};

function spoken(raw){
  if (OVERRIDE[raw]) return OVERRIDE[raw];
  let t = String(raw).replace(/<[^>]+>/g, ' ');
  t = t.replace(/﴿[^﴾]*﴾/g, ' ');
  t = t.replace(/\s*ﷺ/g, ' صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ');
  t = t.replace(/[\u{1F000}-\u{1FAFF}☀-➿]/gu, ' ');
  t = t.replace(/\s*\+\s*/g, ' زائِدُ ');
  t = t.replace(/\s*>\s*/g, '، ثُمَّ ');
  t = t.replace(/_{2,}/g, '…');
  t = t.replace(/[«»]/g, '').replace(/\s*—\s*/g, '، ');
  return t.replace(/\s+/g, ' ').replace(/\s+([؟?.,،:])/g, '$1').trim();
}

/* النصُّ المشكولُ المعتمَد (قرار المالك ٢٠٢٦-٠٩-٢٣) — يعلو على `spoken()` الآليّ. */
const SPOKEN = JSON.parse(fs.readFileSync(ROOT + 'tools/qread-spoken.json', 'utf8')).spoken;

/* هل النصُّ العربيُّ مشكولٌ تامّاً؟ كلُّ حرفٍ عربيٍّ (عدا حروفِ المدِّ والتاءِ المربوطةِ في
   الوقفِ وألفِ «ال») يتبعُه تشكيل — ويُقاسُ بنسبةٍ لأنّ الحرفَ الساكنَ الأخيرَ قد يُترَك.
   والأرقامُ ممنوعةٌ: تُكتَبُ كلماتٍ معرَبة. يعيدُ سببَ الرفضِ أو ''. */
const AR = /[\u0621-\u064A]/;
export function toneProblem(t){
  if (!AR.test(t)) return '';                                    // إنجليزيّ
  if (/[0-9\u0660-\u0669]/.test(t)) return 'أرقام';
  const words = t.split(/[\s،؟.,:!]+/).filter(w => AR.test(w));
  const bare = words.filter(w => {
    const letters = (w.match(/[\u0621-\u064A]/g) || []).filter(c => !'اويىآ'.includes(c)).length;
    const marks = (w.match(/[\u064B-\u0652]/g) || []).length;
    return letters > 1 && marks < letters - 1;
  });
  return bare.length ? 'ناقصُ الشكل: ' + bare.slice(0, 3).join(' · ') : '';
}

function loadAll(){
  const ctx = { window: {}, document: {} };
  vm.runInNewContext(fs.readFileSync(ROOT + 'js/questions.js', 'utf8'), ctx);
  const Q = ctx.window.QUESTIONS;
  const I = JSON.parse(fs.readFileSync(ROOT + 'data/index.json', 'utf8'));
  const out = new Map();   // name → {name,text,raw,book,refs[]}
  for (const book of Object.keys(I).filter(k => k.startsWith(GRADE))) {
    for (const u of I[book].units || []) for (const l of u.lessons || []) {
      (Q[l.file] || []).forEach((q, i) => {
        const raw = q.prompt || q.statement; if (!raw) return;
        const name = qreadHash(raw);
        if (!out.has(name)) out.set(name, { name, text: SPOKEN[name] || spoken(raw), raw, book, refs: [] });
        out.get(name).refs.push(`${l.file}#${i + 1}`);
      });
    }
  }
  return [...out.values()];
}

const have = () => new Set(fs.existsSync(ROOT + DIR)
  ? fs.readdirSync(ROOT + DIR).filter(f => f.endsWith('.mp3')).map(f => f.slice(0, -4)) : []);

const [cmd, ...args] = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i < 0 ? null : Number(args[i + 1]); };

if (cmd === 'list') {
  for (const it of loadAll()) console.log(`${it.name}\t${it.book}\t${toneProblem(it.text) || 'ok'}\t${it.text}`);
} else if (cmd === 'manifest') {
  const names = [...have()].sort();
  fs.writeFileSync(ROOT + 'js/qread.js',
    '/* مولَّدٌ بـ`node tools/build-qread-batch.mjs manifest` — لا يُحرَّرُ يدوياً.\n' +
    '   بصماتُ الأسئلةِ التي لها ملفُّ قراءةٍ في audio/qread/ (§qreadHash في js/app.js). */\n' +
    'window.QREAD_HAVE = ' + JSON.stringify(names) + ';\n');
  console.log('js/qread.js:', names.length, 'ملفّاً');
} else if (cmd === 'batch') {
  const batchId = args[0]; if (!batchId || batchId.startsWith('--')) throw new Error('batchId مطلوب');
  const done = have();
  const redo = args.includes('--redo') ? new Set(args[args.indexOf('--redo') + 1].split(',')) : null;
  let items = loadAll().filter(it => redo ? redo.has(it.name) : !done.has(it.name));
  const bad = items.filter(it => toneProblem(it.text));
  if (bad.length) console.log(`⛔ ${bad.length} نصّاً غيرُ مشكولٍ تامّاً خارجَ الدفعة — تُكتَبُ في tools/qread-spoken.json أوّلاً`);
  items = items.filter(it => !toneProblem(it.text));
  const sample = opt('--sample');
  if (sample) {   // عيّنةٌ موزّعةٌ: من كلِّ كتابٍ بالتناوب
    const byBook = {}; items.forEach(it => (byBook[it.book] ||= []).push(it));
    const books = Object.values(byBook); const pick = [];
    for (let i = 0; pick.length < sample && books.some(b => b.length); i++) {
      const b = books[i % books.length]; if (b.length) pick.push(b.splice(Math.floor(b.length / 2), 1)[0]);
    }
    items = pick;
  }
  const limit = opt('--limit'); if (limit) items = items.slice(0, limit);
  const P = ROOT + 'tools/audio-batch.json';
  const old = JSON.parse(fs.readFileSync(P, 'utf8'));
  fs.writeFileSync(P, JSON.stringify({ _readme: old._readme, batchId, voice: 'حطاب',
    items: items.map(({ name, text }) => ({ name: redo ? name + '--' + batchId.slice(-6) : name, text })) }, null, 1) + '\n');
  const left = loadAll().filter(it => !done.has(it.name)).length;
  console.log(`tools/audio-batch.json: ${items.length} عنصراً · الباقي بلا صوت قبلَ هذه الدفعة: ${left}`);
} else {
  console.log('الاستعمال: batch <batchId> [--limit N] [--sample N] | manifest | list');
}
