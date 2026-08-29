/* ═══════════════════════════════════════════════════════════════════
   فحصُ رسومِ البطاقات — يمنعُ الرسمَ الذي يكشفُ الإجابة
   ───────────────────────────────────────────────────────────────────
   الاستعمال:  node tools/check-qpics.mjs        (أو `npm run check:pics`)
   المخرَج:    0 = سليم · 1 = عطبٌ (ويُطبَعُ سببُه سطراً سطراً)

   ═══ لماذا فحصٌ آليٌّ لا قاعدةٌ مكتوبة ═══
   قاعدةُ `pics` في `CLAUDE.md` مكتوبةٌ منذُ وُضِعَت، **ولم تمنعْ**: سؤالُ
   «صنّف موادَّ حفلةِ أحمدَ حسبَ حالتِها» (‏`g4s-3-1` #٥) مرَّ في مسحِ الصفَّينِ
   الثالثِ والرابعِ ولم يُحكَمْ عليه، فبقيَ نصّاً **بالمصادفةِ لا بالحكم**.
   ولم يُكتشَفْ ذلك إلا بسؤالِ المالكِ عن سؤالٍ آخر. فالقاعدةُ تُقرأُ حينَ
   يتذكّرُها القارئُ، والفحصُ يعملُ ولو نُسِيَت.

   ═══ ما يُفحَص ═══
   ① **العمودُ/المجموعةُ المختلطة** (عطبٌ — يُفشِلُ):
      `pics` مفعَّلٌ وفي المجموعةِ الواحدةِ بطاقةٌ مرسومةٌ وأخرى بلا رسم.
      فالمرسومُ يوحي أنّه المقصود.
   ② **البطاقةُ العاريةُ تكشفُ المجموعة** (عطبٌ — يُفشِلُ):
      `pics` مفعَّلٌ وكلُّ ما لا يُرسَمُ يقعُ في **مجموعةٍ واحدةٍ ويستوعبُها
      بتمامِها** — فيصيرُ «بلا رسمٍ» إجابةً، ويحلُّ السؤالَ من لا يعرفُه.
      وهذا هو الحدُّ الثالثُ في `CLAUDE.md` (§قاعدةُ بطاقاتِ الصور).
   ③ **خلفيةُ البطاقةِ الصلبة** (عطبٌ — يُفشِلُ):
      ملفُّ بطاقةٍ ركنُه معتمٌ — فيظهرُ **مربَّعاً أبيضَ** على كبسولةِ البطاقة.
      **ووُلِدَ هذا الفحصُ من عطبٍ حقيقيّ (٢٠٢٦-٠٨-٢٩):** ظهرَ «المُشطُ» مربَّعاً في
      `g1d1-1-2`#٣، فمُسِحَتِ المكتبةُ فإذا **عشرُ بطاقاتٍ من ٢٠٤** كذلك — كلُّها
      أصولٌ سبقت مسارَ التهيئة، وأكثرُها فُعِّلَ في الجلسةِ نفسِها.
   ④ **المرشَّحُ المحجوبُ بنقصِ مكتبةٍ** (تنبيهٌ لا يُفشِل):
      `pics` مطفأٌ، وكلُّ بطاقاتِ السؤالِ مرسومةٌ **إلا قليلاً يقعُ في مجموعةٍ
      واحدة** — فلو فُعِّلَ لَكشَف. يُطبَعُ لِيُنظَرَ فيه، لا لِيُوقِفَ النشر.

   ⚠️ **والفحصُ لا يعرفُ الغازَ من غيرِه** ولا يميّزُ «لا جسمَ له» من «ناقصٌ
   من المكتبة» — ذانِ حكمانِ بشريّان. وظيفتُه أن **يُظهِرَ الحالةَ** فتُحكَمَ،
   ولذلك ③ تنبيهٌ لا فشل.

   ═══ كيف يُقرأُ سِجِلُّ الرسوم ═══
   **يُشغَّلُ `js/qpics.js` نفسُه** على `document` مصطنَعٍ (كلُّ حاجتِه منه
   `currentScript` و`getElementsByTagName` لِيلتقطَ وسمَ النسخة)، ثمّ تُستعمَلُ
   دالّتُه `window.qPic` كما يستعملُها المتصفّح.

   ⚠️ **ولا يُستخرَجُ السجلُّ نصّياً بأنماطٍ على الملفّ.** جُرِّبَ ففشلَ فشلاً
   صامتاً: النمطُ اللاهثُ `[^]*?` بدأَ من أوّلِ قوسٍ مربّعٍ في الملفِّ — وهو
   داخلَ تعبيرٍ نمطيٍّ في دالّةِ `key` — فالتقطَ **نصَّ التعليقاتِ** بدلَ مصفوفةِ
   الكلمات، فخرجَ سبعةٌ وعشرونَ مفتاحاً خردةً بدلَ المئتَين، **فأنذرَ الرقيبُ
   من تسعةٍ وخمسينَ سؤالاً سليماً**. وتشغيلُ المصدرِ يُلغي هذا الصنفَ كلَّه:
   لا منطقَ مكرَّرٌ ينحرف. */

import { readFileSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(join(ROOT, p), 'utf8');

/* ── شفافيةُ ركنِ الصورة — يقرأُ البكسلَ (٠،٠) من ملفِّ PNG مباشرةً ──────
   بلا اعتمادِ خارجيّ: `node:zlib` مدمَجٌ كـ`node:fs`، فالأداةُ تبقى بلا
   `npm install` في سيرِ العمل.

   **ولماذا البكسلُ (٠،٠) وحدَه يكفي:** صفُّ البكسلِ الأولُ لا صفَّ فوقَه،
   والبكسلُ الأولُ لا بكسلَ يسارَه — فمُتنبِّئُ المرشِّحِ صفرٌ في الأنواعِ
   الخمسةِ كلِّها، وبايتاتُه الخامُ هي بايتاتُه المفكوكة. فلا حاجةَ إلى فكِّ
   الصورةِ كلِّها.

   يُرجِعُ: true معتمٌ · false شفّافٌ · null تعذّرَ القياس (مضفورٌ أو غيرُ مدعوم). */
function cornerOpaque(file) {
  let b; try { b = readFileSync(file); } catch { return null; }
  if (b.length < 8 || b.readUInt32BE(0) !== 0x89504e47) return null;
  let off = 8, ihdr = null, trns = null; const idat = [];
  while (off + 8 <= b.length) {
    const len = b.readUInt32BE(off), type = b.toString('latin1', off + 4, off + 8);
    const data = b.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') ihdr = data;
    else if (type === 'tRNS') trns = data;
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    off += 12 + len;
  }
  if (!ihdr || !idat.length) return null;
  const depth = ihdr[8], colour = ihdr[9], interlace = ihdr[12];
  if (depth !== 8 || interlace !== 0) return null;      // خارجَ نطاقِ القياسِ البسيط
  let row0; try { row0 = inflateSync(Buffer.concat(idat)); } catch { return null; }
  if (row0.length < 2) return null;
  const px = row0.subarray(1);                           // بعدَ بايتِ المرشِّح
  if (colour === 6) return px[3] > 200;                  // RGBA
  if (colour === 4) return px[1] > 200;                  // رماديٌّ + ألفا
  if (colour === 3) {                                    // لوحةُ ألوان
    if (!trns) return true;                              // بلا tRNS = معتمٌ قطعاً
    const i = px[0];
    return (i < trns.length ? trns[i] : 255) > 200;
  }
  return true;                                           // 0 و2: لا ألفا أصلاً
}

/* ── سِجِلُّ الرسوم: يُشغَّلُ المصدرُ نفسُه على document مصطنَع ──────── */
function loadPics() {
  const win = {};
  const doc = { currentScript: { src: '' }, getElementsByTagName: () => [] };
  new Function('window', 'document', read('js/qpics.js'))(win, doc);
  if (typeof win.qPic !== 'function' || !win.QPICS)
    throw new Error('js/qpics.js لم يُصدِّرْ qPic — تغيّرَت بنيتُه');
  const files = new Set();
  for (const k of Object.keys(win.QPICS)) {
    const m = /src="images\/([^"?]+)\.png/.exec(win.QPICS[k]);
    if (m) files.add(decodeURIComponent(m[1]));
  }
  return { has: w => !!win.qPic(w), size: Object.keys(win.QPICS).length, files: [...files].sort() };
}

/* ── أسئلةُ المنصّة ──────────────────────────────────────────────── */
function questions() {
  const g = { window: {}, document: undefined };
  const src = read('js/questions.js');
  const fn = new Function('window', src + '\n;return (typeof QUESTIONS!=="undefined")?QUESTIONS:window.QUESTIONS;');
  const Q = fn(g.window);
  if (!Q) throw new Error('تعذّرَ تحميلُ js/questions.js');
  return Q;
}

/* ── مجموعاتُ البطاقاتِ في كلِّ نوعٍ يقبلُ pics ────────────────────
   الوحدةُ **المجموعةُ لا السؤال**: عمودا التوصيلِ مجموعتانِ لا واحدة،
   فالتوصيلُ الأحاديُّ (`pics:"a"`) عمودٌ كاملُ الرسمِ وعمودٌ كاملُ النصّ
   وكلاهما سليم. ولا تُفحَصُ إلا المجموعاتُ التي يُفعَّلُ فيها الرسمُ فعلاً. */
function groupsOf(q) {
  const on = q.pics;
  const G = [];
  switch (q.type) {
    case 'classify':
      if (!q.groups) break;
      for (const g of q.groups) G.push({ label: g.name, words: g.items || [], live: !!on });
      break;
    case 'mcq': case 'exclude':
      G.push({ label: 'الخيارات', words: q.options || q.choices || [], live: !!on });
      break;
    case 'sequence':
      G.push({ label: 'الخطوات', words: q.steps || q.items || [], live: !!on });
      break;
    case 'memory':
      G.push({ label: 'البطاقات', words: q.cards || q.pairs || [], live: !!on });
      break;
    case 'mindmap':
      G.push({ label: 'البنك', words: q.bank || [], live: !!on });
      break;
    case 'matching':
      if (!q.pairs) break;
      G.push({ label: 'العمود أ', words: q.pairs.map(p => p.a), live: on === true || on === 'a' });
      G.push({ label: 'العمود ب', words: q.pairs.map(p => p.b), live: on === true || on === 'b' });
      break;
  }
  return G.filter(g => g.words.length && g.words.every(w => typeof w === 'string'));
}

/* ── الفحص ───────────────────────────────────────────────────────── */
const PICS = loadPics();
const Q = questions();
const drawn = w => PICS.has(w);

const errors = [], notes = [];

for (const lesson of Object.keys(Q)) {
  Q[lesson].forEach((q, i) => {
    const id = `${lesson}#${i + 1}`;
    const G = groupsOf(q);
    if (!G.length) return;
    const live = G.filter(g => g.live);

    // ① المجموعةُ المختلطة — لا تُفحَصُ إلا حيثُ الرسمُ مفعَّل
    for (const g of live) {
      const miss = g.words.filter(w => !drawn(w));
      if (miss.length && miss.length < g.words.length)
        errors.push(`✘ ${id}  «${g.label}» مختلطةٌ — بلا رسم: ${miss.join(' · ')}`);
    }

    // ② البطاقةُ العاريةُ تكشفُ المجموعة (التصنيفُ وحدَه — هو ذو المجموعاتِ المصنَّفة)
    if (q.type !== 'classify' || !q.groups) return;
    /* والتصنيفُ الإملائيُّ خارجَ البابِ أصلاً — لا يُفعَّلُ فيه الرسمُ بحالٍ
       (§قاعدةُ بطاقاتِ الصورِ: المقيسُ رسمُ الكلمةِ لا معناها). وعلامتُه
       بنيويّةٌ لا لفظيّة: اسمُ المجموعةِ **حرفٌ واحد** (د · ق · ف). */
    const bare0 = w => String(w).replace(/[\u064B-\u0652\u0670\u0640]/g, '').trim();
    if (q.groups.every(g => bare0(g.name).length === 1)) return;
    const bare = q.groups.filter(g => (g.items || []).every(w => !drawn(w)));
    const some = q.groups.some(g => (g.items || []).some(w => drawn(w)));
    if (bare.length !== 1 || !some) return;
    const line = `${id}  المجموعةُ «${bare[0].name}» عاريةٌ بتمامِها (${bare[0].items.join(' · ')})`
      + `  «${String(q.prompt || '').slice(0, 60)}»`;
    if (q.pics) errors.push(`✘ ${line}  ← الرسمُ مفعَّلٌ فَـ«بلا رسمٍ» إجابة`);
    else notes.push(`• ${line}`);
  });
}

/* ③ خلفيةُ البطاقةِ الصلبة — تظهرُ مربَّعاً أبيضَ على كبسولةِ البطاقة */
const opaque = [], unmeasured = [];
for (const f of PICS.files) {
  const p = join(ROOT, 'images', f + '.png');
  if (!existsSync(p)) continue;
  const o = cornerOpaque(p);
  if (o === null) unmeasured.push(f); else if (o) opaque.push(f);
}
if (opaque.length)
  errors.push(...opaque.map(f => `✘ images/${f}.png  خلفيتُه صلبةٌ — يظهرُ مربَّعاً على البطاقة`));

if (notes.length) {
  console.log('ℹ️  مرشَّحاتٌ لو فُعِّلَ فيها الرسمُ لَكشَف — يُنظَرُ فيها ولا توقفُ النشر:');
  notes.forEach(n => console.log('   ' + n));
  console.log('   (الغازُ لا جسمَ له فيبقى نصّاً دائماً؛ وناقصُ المكتبةِ يُفعَّلُ متى وُلِّدَ رسمُه.)\n');
}
if (errors.length) {
  console.error('✘ رسومُ بطاقاتٍ تكشفُ الإجابةَ أو تختلط:\n');
  errors.forEach(e => console.error('   ' + e));
  console.error(`\n  المجموع: ${errors.length}. القاعدةُ في CLAUDE.md §قاعدةُ بطاقاتِ الصور.`);
  process.exit(1);
}
console.log(`✓ رسومُ البطاقاتِ سليمة — ${PICS.size} مفتاحاً في السِّجِلّ · ${PICS.files.length} ملفَّ بطاقةٍ شفّافَ الخلفية`
  + (unmeasured.length ? ` (${unmeasured.length} تعذّرَ قياسُه)` : '') + `، ولا مجموعةَ مختلطةً ولا كاشفة.`);
