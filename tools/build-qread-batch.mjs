/* ═══ قراءةُ نصِّ السؤالِ صوتياً — مولِّدُ الدفعةِ وسِجِلُّ المتاح ═══
   (قرار المالك ٢٠٢٦-٠٩-٢٣: أصواتُ قراءةِ الأسئلةِ لكتبِ الصفِّ الأولِ بصوتِ «حطاب» من داريجات)

   ‏① `node tools/build-qread-batch.mjs batch <batchId> [--limit N] [--sample N]`
      يكتبُ `tools/audio-batch.json` بنصوصِ الأسئلةِ التي **لا ملفَّ لها بعدُ** في
      `audio/qread/` — فتشغيلُه مرّةً بعدَ مرّةٍ يُكمِلُ الناقصَ ولا يُكرِّرُ المولَّد.
      `--limit` يقطعُ الدفعةَ (سيرُ n8n يُرسِلُ عنصراً كلَّ ١٥ ثانية، فَـ٨٠ ≈ ٢٠ دقيقة)،
      و`--sample` يأخذُ عيّنةً موزّعةً على الكتبِ للتجربة.
      `--redo qr-a,qr-b` يعيدُ توليدَ مقاطعَ موجودة.
      **ولا يدخلُ الدفعةَ نصٌّ عربيٌّ غيرُ مشكولٍ تامّاً** (‏`toneProblem`) — قرارُ المالك
      ٢٠٢٦-٠٩-٢٣: داريجات لا يضبطُ النطقَ بلا تشكيل. فيُكتَبُ في `tools/qread-spoken.json` أوّلاً.
   ‏①ب `node tools/build-qread-batch.mjs import <batchId>` — يستلمُ الدفعةَ من فرعِ `graphics-inbox`.
   ‏①ج `node tools/build-qread-batch.mjs audit <batchId> [--limit N] [--only a,b]` — دفعةُ فحصِ النطقِ بجيميناي.
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
import { execSync } from 'node:child_process';

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

/* ═══ وصلُ «ال» بما قبلَها — كتابةٌ كما يُلفَظ (قرار المالك ٢٠٢٦-٠٩-٢٣) ═══
   داريجات يُسقطُ حركةَ آخرِ الكلمةِ إذا تلتها كلمةٌ تبدأُ بـ«ال» («وُلِدَ النَّبِيُّ» ← «وُلِدْ»)
   ولو كانت مشكولة. والعلاجُ الذي اختارَه المالكُ بالسماع: تُنقَلُ لامُ التعريفِ (أو الحرفُ
   الشمسيُّ المدغَمُ فيها) ساكنةً إلى آخرِ الكلمةِ السابقة، فتبقى الحركةُ داخلَ الكلمة:
     وُلِدَ النَّبِيُّ ← وُلِدَنْ نَبِيُّ      (شمسيّة: الحرفُ نفسُه)
     وُلِدَ القَمَرُ  ← وُلِدَلْ قَمَرُ       (قمريّة: اللام)
   لا يُمسُّ إلا **كلمةٌ تنتهي بحركةٍ قصيرة** تليها **«ال» مجرّدةٌ** بلا علامةِ ترقيمٍ بينهما.
   وهذه طبقةُ نطقٍ فقط: النصُّ المعروضُ على الشاشةِ لا يتغيّر. */
const SUN = 'تثدذرزسشصضطظلن';
const SHORT = /[\u064E\u064F\u0650]\u0651?$/;   // والحركةُ قد تسبقُ الشدّةَ في الترميز («حَيِّ»)          // فتحة · ضمّة · كسرة
/* ═══ الاستثناءُ الثاني (قرار المالك ٢٠٢٦-٠٩-٢٣ بالسماع): كلمةٌ تنتهي بتاءٍ مربوطةٍ ═══
   إلصاقُ اللامِ بها يُنتجُ «كَلِمَةِلْ» — تاءٌ مربوطةٌ في وسطِ كلمة، رسمٌ لا يعرفُه المحرّكُ
   فيخطئُ نطقَه. فالنصُّ الذي فيه هذه الحالةُ يُكتَبُ كلُّه بألفِ الوصلِ «ٱ» بدلَ الإلصاق
   (‏«أَكْمِلِ ٱلْجُمْلَةَ بِسَحْبِ ٱلْكَلِمَةِ ٱلْمُنَاسِبَةْ») — الصيغةُ التي اختارَها المالكُ
   من ثلاث. ولفظُ الجلالةِ يبقى بألفِه كما هو. */
const AL_WORD = /^\u0627\u0644(?:\u0652?[\u0621-\u064A]|[\u064B-\u0652]*\u0651)/;
function waslaMode(t){
  const w = t.split(' ');
  for (let i = 1; i < w.length; i++) {
    const bare = x => x.replace(/[\u064B-\u0652\u0670]/g, '');
    if (!AL_WORD.test(w[i]) || !SHORT.test(w[i - 1])) continue;
    if (/^\u0627\u0644\u0644\u0647/.test(bare(w[i]))) continue;
    w[i] = '\u0671' + w[i].slice(1);
  }
  return w.join(' ');
}
export function liaison(t){
  const w = t.split(' ');
  /* أنماطُ الخطرِ التي تُحيلُ النصَّ كلَّه إلى ألفِ الوصل (قرار المالك ٢٠٢٦-٠٩-٢٣ — تحوّطاً بعدَ سماعِ
     خطأِ التاءِ المربوطة): آخرُ الكلمةِ السابقةِ تاءٌ مربوطةٌ أو همزةٌ أو هاءٌ أو لامٌ أو ياءٌ أو واو،
     أو حرفٌ يماثلُ الحرفَ الذي سيُلصَقُ به («أَكْمِلِلْ» · «تَحْتَاجُهُلْ» · «أَجْزَاءِلْ»). */
  const RISK = '\u0629\u0621\u0623\u0624\u0626\u0647\u0644\u064A\u0648';
  const risky = w.some((x, i) => {
    if (!i || !AL_WORD.test(x) || !SHORT.test(w[i - 1])) return false;
    const pl = w[i - 1].replace(/[\u064B-\u0652\u0670]/g, '').slice(-1);
    const nx = x.replace(/[\u064B-\u0652\u0670]/g, '').slice(2, 3);
    const joined = (SUN.includes(nx) && /^\u0627\u0644[\u064B-\u0652]*\u0651|^\u0627\u0644\u0652?.[\u064B-\u0652]*\u0651/.test(x)) ? nx : '\u0644';
    return RISK.includes(pl) || pl === joined;
  });
  if (risky) return waslaMode(t);
  for (let i = 1; i < w.length; i++) {
    // «الَّذي/الَّتي» بلامٍ واحدةٍ مشدّدة: تُعامَلُ لامُها معاملةَ الحرفِ الشمسيّ
    const rel = /^\u0627\u0644([\u064B-\u0652]*\u0651[\u064B-\u0652]*)(.*)$/.exec(w[i]);
    const m = rel ? [null, '\u0644', rel[1], rel[2]]
                  : /^\u0627\u0644\u0652?([\u0621-\u064A])([\u064B-\u0652]*)(.*)$/.exec(w[i]);
    const prev = w[i - 1];
    if (!m || !SHORT.test(prev)) continue;
    // لفظُ الجلالةِ لا يُمَسّ قبلَه ولا بعدَه: «قالَلْ لَهُ» تقصُرُ مدَّه، و«اللَّهِرْ» تُلصِقُ به حرفاً
    const bare = x => x.replace(/[\u064B-\u0652\u0670]/g, '');
    if (/^\u0627\u0644\u0644\u0647/.test(bare(w[i])) || /\u0644\u0644\u0647$/.test(bare(prev))) continue;
    const [, c, marks, rest] = m;
    // الإدغامُ بالشدّةِ المكتوبةِ لا بالحرف: «الْتِقاطُ» لامُها أصليّةٌ فتبقى
    if (SUN.includes(c) && marks.includes('\u0651')) { w[i - 1] = prev + c + '\u0652'; w[i] = c + marks.replace('\u0651', '') + rest; }
    else { w[i - 1] = prev + '\u0644\u0652'; w[i] = c + marks.replace(/^\u0652/, '') + rest; }
  }
  return w.join(' ');
}

/* النصُّ المشكولُ المعتمَد (قرار المالك ٢٠٢٦-٠٩-٢٣) — يعلو على `spoken()` الآليّ. */
const SPOKEN = JSON.parse(fs.readFileSync(ROOT + 'tools/qread-spoken.json', 'utf8')).spoken;

/* هل النصُّ العربيُّ مشكولٌ تامّاً؟ (قرار المالك ٢٠٢٦-٠٩-٢٣: «بدون مشاكل أخرى في التشكيل»)
   **كلُّ حرفٍ يحملُ حركتَه، ومنه آخرُ الكلمةِ في وسطِ الجملة** — فهو ما يُسقطُه داريجات.
   ويُعفى: ألفُ المدِّ والألفُ المقصورة · الواوُ والياءُ بعدَ ضمّةٍ/كسرةٍ (مدّ) · ألفُ «ال» ولامُها
   قبلَ حرفٍ شمسيٍّ مشدَّد · آخرُ الكلمةِ قبلَ علامةِ ترقيمٍ أو في نهايةِ النصّ (وقف).
   والأرقامُ ممنوعةٌ: تُكتَبُ كلماتٍ معرَبة. يعيدُ سببَ الرفضِ أو ''. */
const AR = /[\u0621-\u064A]/;
const MARK = /[\u064B-\u0652\u0670]/;          // ومنها الألفُ الخنجريّة (هٰذا)
export function toneProblem(t){
  if (!AR.test(t)) return '';                                    // إنجليزيّ
  if (/[0-9\u0660-\u0669]/.test(t)) return 'أرقام';
  const toks = t.split(/\s+/).filter(Boolean);
  const bad = [];
  toks.forEach((tok, ti) => {
    const pausal = /[،؟.,:!؛…]$/.test(tok) || ti === toks.length - 1;
    const w = tok.replace(/[^\u0621-\u0652\u0670]/g, '');
    if (!AR.test(w)) return;
    const L = [];                                   // [حرف, علاماتُه]
    for (const ch of w) { if (MARK.test(ch)) { if (L.length) L[L.length - 1][1] += ch; } else L.push([ch, '']); }
    const miss = L.some(([c, mk], k) => {
      if (mk) return false;
      if ('\u0627\u0649\u0622'.includes(c)) return false;                       // ا ى آ
      const pm = k ? L[k - 1][1] : '';
      if ((c === '\u0648' && pm.includes('\u064F')) || (c === '\u064A' && pm.includes('\u0650'))) return false;
      if (c === '\u0644' && k && '\u0627\u0644'.includes(L[k - 1][0]) && L[k + 1] && L[k + 1][1].includes('\u0651')) return false; // لامُ «ال» الشمسيّة (ومنها «لِلنَّبات»)
      if (k === L.length - 1 && pausal) return false;                       // وقف
      return true;
    });
    if (miss) bad.push(tok);
  });
  return bad.length ? 'ناقصُ الشكل: ' + bad.slice(0, 4).join(' · ') : '';
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
        if (!out.has(name)) { const base = SPOKEN[name] || spoken(raw); out.set(name, { name, base, text: liaison(base), raw, book, refs: [] }); }
        out.get(name).refs.push(`${l.file}#${i + 1}`);
      });
    }
  }
  return [...out.values()];
}

/* لاحقةُ الدفعةِ على اسمِ الملفِّ في فرعِ الاستلام: سيرُ n8n يُنشئُ الملفَّ ولا يستبدلُه، فإعادةُ
   توليدِ مقطعٍ موجودٍ تفشلُ بلا لاحقة. ويُنزَعُ عندَ الاستلامِ (`import`). */
const tag = id => String(id).replace(/[^a-z0-9]+/gi, '').slice(-10);

const have = () => new Set(fs.existsSync(ROOT + DIR)
  ? fs.readdirSync(ROOT + DIR).filter(f => f.endsWith('.mp3')).map(f => f.slice(0, -4)) : []);

const [cmd, ...args] = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i < 0 ? null : Number(args[i + 1]); };

if (cmd === 'list') {
  for (const it of loadAll()) console.log(`${it.name}\t${it.book}\t${toneProblem(it.base) || 'ok'}\t${it.base}`);
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
  const bad = items.filter(it => toneProblem(it.base));
  if (bad.length) console.log(`⛔ ${bad.length} نصّاً غيرُ مشكولٍ تامّاً خارجَ الدفعة — تُكتَبُ في tools/qread-spoken.json أوّلاً`);
  items = items.filter(it => !toneProblem(it.base));
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
    items: items.map(({ name, text }) => ({ name: name + '--' + tag(batchId), text })) }, null, 1) + '\n');
  const left = loadAll().filter(it => !done.has(it.name)).length;
  console.log(`tools/audio-batch.json: ${items.length} عنصراً · الباقي بلا صوت قبلَ هذه الدفعة: ${left}`);
} else if (cmd === 'import') {       // ينقلُ ملفّاتِ دفعةٍ من فرعِ الاستلامِ إلى audio/qread/ ثمّ يبني السِّجِلّ
  const t = tag(args[0]); if (!args[0]) throw new Error('batchId مطلوب');
  const sh = c => execSync(c, { cwd: ROOT, encoding: 'buffer', maxBuffer: 1 << 28 });
  sh('git fetch -q origin +graphics-inbox:refs/remotes/origin/graphics-inbox');
  const files = sh('git ls-tree --name-only origin/graphics-inbox audio-inbox/').toString().split('\n')
    .filter(f => f.endsWith(`--${t}.mp3`));
  fs.mkdirSync(ROOT + DIR, { recursive: true });
  for (const f of files) fs.writeFileSync(`${ROOT}${DIR}/${f.slice(12, -(t.length + 6))}.mp3`, sh(`git show origin/graphics-inbox:${f}`));
  console.log(`استُلِمَ ${files.length} ملفّاً من الدفعة ${args[0]}`);
} else if (cmd === 'audit') {        // دفعةُ فحصِ النطق لسيرِ n8n «شوجب — فحص نطق الأسئلة (جيميناي)»
  const batchId = args[0]; if (!batchId || batchId.startsWith('--')) throw new Error('batchId مطلوب');
  const only = args.includes('--only') ? new Set(args[args.indexOf('--only') + 1].split(',')) : null;
  const done = have();
  let items = loadAll().filter(it => done.has(it.name) && (!only || only.has(it.name)));
  const limit = opt('--limit'); if (limit) items = items.slice(0, limit);
  fs.writeFileSync(ROOT + 'tools/qread-audit.json', JSON.stringify({
    _readme: 'دفعةُ فحصِ النطق: يقرؤُها سيرُ n8n «شوجب — فحص نطق الأسئلة (جيميناي)» — لكلِّ مقطعٍ نصُّه كما أُرسِلَ إلى داريجات. تُبنى بـ`node tools/build-qread-batch.mjs audit <batchId> [--limit N] [--only a,b]`.',
    batchId, items: items.map(({ name, text }) => ({ name, text })) }, null, 1) + '\n');
  console.log(`tools/qread-audit.json: ${items.length} مقطعاً للفحص`);
} else if (cmd === 'check') {        // فحصُ ملفِّ تشكيلٍ {name: text} قبلَ دمجِه
  const map = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  let n = 0;
  for (const [k, v] of Object.entries(map)) { const p = toneProblem(v); if (p) { n++; console.log(`${k}\t${p}\t${v}`); } }
  console.log(n ? `⛔ ${n} نصّاً فيه نقص` : `✓ ${Object.keys(map).length} نصّاً مشكولٌ تامّاً`);
} else {
  console.log('الاستعمال: batch <batchId> [--limit N] [--sample N] | manifest | list');
}
