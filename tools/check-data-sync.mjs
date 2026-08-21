/* ═══════════════════════════════════════════════════════════════════
   فحصُ تماسكِ بياناتِ الكتبِ والبيع — يفشلُ عندَ الانحراف
   ───────────────────────────────────────────────────────────────────
   الاستعمال:  node tools/check-data-sync.mjs      (أو `npm run check`)
   المخرَج:    0 = متماسكة · 1 = انحرافٌ (ويُطبَعُ سببُه سطراً سطراً)

   ═══ لماذا فحصٌ آليٌّ لا تحذيرٌ مكتوب ═══
   بياناتُ الكتبِ موزّعةٌ على أربعةِ ملفّاتٍ لكلٍّ سببُ وجودِه، والانحرافُ بينها
   **لا يُرى في الصفحةِ إلا بعدَ أن يقعَ على معلّمة**. وقد وقعَ فعلاً: سقطت
   بطاقةُ علومِ الثالثِ من احتياطِ `js/data.js` وهي في `data/books.json`،
   فاختفى الكتابُ في وضعِ `file://` وحدَه — والتحذيرُ النصيُّ في رأسِ الاحتياطِ
   كان مكتوباً حينَها ولم يمنعْ شيئاً. فالنسيانُ لا يُعالَجُ بتذكيرٍ بل بفحصٍ يفشل.

   ═══ ما يُفحَص ═══
   ① **المفاتيح** — `data/books.json` و`js/data.js` بنفسِ الفصولِ والصفوفِ
      والمفاتيح. الأولُ يُجلَبُ عبرَ HTTP والثاني احتياطٌ لوضعِ `file://`،
      فهما نسختانِ لبياناتٍ واحدةٍ يجبُ ألّا تتفرّقا.
   ② **أعضاءُ الحزم** — كلُّ عضوٍ في `data/bundles.json` له كتابٌ في
      `books.json`. عضوٌ بمفتاحٍ خاطئٍ يجعلُ الحزمةَ تُفتَحُ ناقصةً بعدَ الشراء.
   ③ **بنيةُ `onSale`** — وهو خاصّيةُ **الوحدةِ القابلةِ للبيعِ** لا خاصّيةُ كلِّ
      كتاب، فتُفحَصُ البنيةُ لا القيمُ وحدَها:
      • **الكتابُ المستقلُّ** (لا حزمةَ له) يحملُ `onSale` صريحاً — وغيابُه
        يُقرَأُ `false` وقتَ التشغيل، فبلا هذا الفحصِ يُنشَرُ كتابٌ جديدٌ
        **صامتاً غيرَ قابلٍ للبيعِ** ولا يُكتشَفُ إلا حينَ تسألُ معلّمةٌ عن زرٍّ
        لا يعمل.
      • **جزءُ الحزمةِ لا يحملُه إطلاقاً** — لا يُباعُ وحدَه، فحقلٌ فيه ادّعاءٌ
        كاذبٌ ومصدرُ انحرافٍ (الحزمةُ `true` والجزءُ `false`، فأيُّهما يُصدَّق؟).
      • **الحزمةُ** تحملُه صريحاً في `data/bundles.json`.
      • وقيمتُه في `books.json` = قيمتُه في `js/data.js` — وانحرافُها أخطرُ من
        غيرِه: كتابٌ يُباعُ لزائرٍ ولا يُباعُ لآخرَ بحسبِ كيفيةِ فتحِه للموقع.
      • ولا تبقى في `pay.html` قائمةُ `ON_SALE` ثابتة — وجودُها ارتدادٌ إلى
        مصدرَينِ للحقيقةِ الواحدة.
   ④ **فهرسُ الدروس** — `data/index.json` و`js/data.js` بنفسِ الدروسِ ونفسِ
      `open` ونفسِ `bookOnly`. **وهذا الفحصُ وُلِدَ من عطبٍ حقيقيّ:** ١٣ درسَ
      علومٍ مؤلَّفةً (‏`g2s-3-*` و`g4s-2-*` و`g4s-3-*`) كانت `open:true` في
      الفهرسِ و`open:false` في الاحتياط، **فتظهرُ ميّتةً مقفلةً في وضعِ
      `file://` وحدَه** — نفسُ حادثةِ `g3-sci` أعلاه بحذافيرِها، لكن على
      الدروسِ لا على البطاقات. والفحصُ ① كان يمرُّ عليها لأنّه يفحصُ
      **الكتبَ** لا دروسَها.

   ⚠️ ولا يُفحَصُ **ترتيبُ** الكتبِ ولا بقيّةُ حقولِها (اللونُ والغلافُ والشارة):
   الترتيبُ ترتيبُ عرضٍ لا صحّة، وبقيّةُ الحقولِ انحرافُها يُرى بالعينِ فوراً.
   أمّا `onSale` فلا أثرَ له يُرى حتى تُنقَرَ شارةُ القفل.
   ═══════════════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';

const BOOKS    = 'data/books.json';
const FALLBACK = 'js/data.js';
const BUNDLES  = 'data/bundles.json';
const PAY      = 'pay.html';
const INDEX    = 'data/index.json';
const errors   = [];

/* الاحتياطُ ملفُّ سكربتٍ لا JSON: يُنفَّذُ بـ`window` وهميٍّ فيُلتقَطُ ما عُلِّقَ عليه.
   لا `import` له — الملفُّ يفترضُ متصفّحاً ولا يُصدِّرُ شيئاً. */
function loadFallback() {
  const win = {};
  new Function('window', readFileSync(FALLBACK, 'utf8'))(win);
  if (!win.DATA_FALLBACK || !win.DATA_FALLBACK.terms) {
    throw new Error(`${FALLBACK}: لم يُعرَّف window.DATA_FALLBACK.terms`);
  }
  return win.DATA_FALLBACK.terms;
}

/* فهرسُ الدروسِ في الاحتياطِ يسكنُ `DATA_FALLBACK.index` (بجانبِ `.terms`). */
function loadFallbackIndex() {
  const win = {};
  new Function('window', readFileSync(FALLBACK, 'utf8'))(win);
  if (!win.DATA_FALLBACK || !win.DATA_FALLBACK.index) {
    throw new Error(`${FALLBACK}: لم يُعرَّف window.DATA_FALLBACK.index`);
  }
  return win.DATA_FALLBACK.index;
}

/* الفصلُ ← الصفُّ ← قائمةُ الكتب  ⇒  خريطةٌ مسطّحة: "الفصل/الصف/المفتاح" ← الكتاب.
   المسارُ في المفتاحِ لا المفتاحُ وحدَه، فيقولُ التقريرُ **أينَ** وقعَ الانحراف. */
function flatten(terms, where) {
  const out = new Map();
  for (const [term, grades] of Object.entries(terms || {})) {
    for (const [grade, list] of Object.entries(grades || {})) {
      (list || []).forEach((b, i) => {
        if (!b || !b.key) {
          errors.push(`${where}: كتابٌ بلا مفتاح في «${term}/${grade}» بالموضع ${i}`);
          return;
        }
        const path = `${term}/${grade}/${b.key}`;
        if (out.has(path)) errors.push(`${where}: مفتاحٌ مكرّر — ${path}`);
        out.set(path, b);
      });
    }
  }
  return out;
}

const books    = flatten(JSON.parse(readFileSync(BOOKS, 'utf8')), BOOKS);
const fallback = flatten(loadFallback(), FALLBACK);
const bundles  = JSON.parse(readFileSync(BUNDLES, 'utf8'));

// ① المفاتيح: ما في أحدِهما وليس في الآخر
for (const path of books.keys()) {
  if (!fallback.has(path)) errors.push(`ناقصٌ من ${FALLBACK}: ${path}`);
}
for (const path of fallback.keys()) {
  if (!books.has(path)) errors.push(`ناقصٌ من ${BOOKS}: ${path}`);
}

/* مجموعةُ مفاتيحِ الكتبِ مجرّدةً من مسارِها — الحزمُ وقائمةُ البيعِ تشيرانِ
   إلى المفتاحِ وحدَه لا إلى موضعِه في الفصلِ والصفّ. */
const bookKeys = new Set([...books.values()].map(b => b.key));

// ② أعضاءُ الحزم: كلُّ عضوٍ له كتابٌ حقيقيّ
for (const [id, b] of Object.entries(bundles || {})) {
  const members = (b && b.members) || [];
  if (!members.length) { errors.push(`${BUNDLES}: الحزمةُ «${id}» بلا أعضاء`); continue; }
  for (const m of members) {
    if (!bookKeys.has(m)) errors.push(`${BUNDLES}: عضوٌ لا كتابَ له — «${id}» ← ${m}`);
  }
}

/* ③ بنيةُ onSale. الوحدةُ القابلةُ للبيع = كتابٌ مستقلٌّ أو حزمة؛ وجزءُ
   الحزمةِ ليس وحدةً فلا يحملُ الحقل. */
const memberKeys = new Set(
  Object.values(bundles || {}).flatMap(b => (b && b.members) || [])
);

for (const [path, b] of books) {
  const f = fallback.get(path);
  if (memberKeys.has(b.key)) {
    if ('onSale' in b) {
      errors.push(`${BOOKS}: «${path}» جزءُ حزمةٍ ولا يُباعُ وحدَه، فلا يحملُ onSale`);
    }
    if (f && 'onSale' in f) {
      errors.push(`${FALLBACK}: «${path}» جزءُ حزمةٍ ولا يُباعُ وحدَه، فلا يحملُ onSale`);
    }
    continue;
  }
  if (typeof b.onSale !== 'boolean') {
    errors.push(`${BOOKS}: «${path}» كتابٌ مستقلٌّ بلا حقلِ onSale صريح (true/false)`);
  }
  if (!f) continue;                        // بُلِّغَ عنه في ① فلا يُكرَّر
  if (typeof f.onSale !== 'boolean') {
    errors.push(`${FALLBACK}: «${path}» كتابٌ مستقلٌّ بلا حقلِ onSale صريح (true/false)`);
  } else if (b.onSale !== f.onSale) {
    errors.push(`onSale مختلف — ${path}: ${BOOKS}=${b.onSale} · ${FALLBACK}=${f.onSale}`);
  }
}

for (const [id, b] of Object.entries(bundles || {})) {
  if (typeof (b || {}).onSale !== 'boolean') {
    errors.push(`${BUNDLES}: الحزمةُ «${id}» بلا حقلِ onSale صريح (true/false)`);
  }
}

/* ولا ترتدُّ `pay.html` إلى قائمةٍ ثابتة. */
if (/ON_SALE\s*:/.test(readFileSync(PAY, 'utf8'))) {
  errors.push(`${PAY}: عادت قائمةُ ON_SALE الثابتة — المصدرُ هو onSale في البيانات`);
}

/* ④ فهرسُ الدروس: نفسُ المفاتيحِ ونفسُ حالةِ الفتحِ ووسمِ «في الكتاب».
   `bookOnly` (مع `open:false`) يعني مدخلاً في كتابِ التلميذِ بلا نشاطٍ رقميٍّ
   أبداً — يُعرَضُ بـ📖 لا 🔒 (‏`shoogp-ui` §١.٦‑ج). فانحرافُه بين الملفَّينِ
   يُظهِرُ الدرسَ «اشترِ لتفتح» لزائرٍ و«في الكتاب» لآخرَ بحسبِ كيفيةِ فتحِه. */
function flatLessons(index, where) {
  const out = new Map();
  for (const [book, v] of Object.entries(index || {})) {
    for (const u of (v && v.units) || []) {
      for (const l of (u && u.lessons) || []) {
        if (!l || !l.file) { errors.push(`${where}: درسٌ بلا مفتاحِ ملفٍّ في «${book}»`); continue; }
        if (out.has(l.file)) errors.push(`${where}: درسٌ مكرّر — ${l.file}`);
        out.set(l.file, { book, open: !!l.open, bookOnly: !!l.bookOnly });
      }
    }
  }
  return out;
}

const lsBooks = flatLessons(JSON.parse(readFileSync(INDEX, 'utf8')), INDEX);
const lsFall  = flatLessons(loadFallbackIndex(), FALLBACK);

for (const [file, a] of lsBooks) {
  const b = lsFall.get(file);
  if (!b) { errors.push(`ناقصٌ من فهرسِ ${FALLBACK}: ${file} (${a.book})`); continue; }
  if (a.open !== b.open) {
    errors.push(`open مختلف — ${file}: ${INDEX}=${a.open} · ${FALLBACK}=${b.open}`);
  }
  if (a.bookOnly !== b.bookOnly) {
    errors.push(`bookOnly مختلف — ${file}: ${INDEX}=${a.bookOnly} · ${FALLBACK}=${b.bookOnly}`);
  }
  /* `bookOnly` بلا `open:false` تناقضٌ: الدرسُ مؤلَّفٌ ومعروضٌ «بلا نشاطٍ رقميّ» معاً. */
  if (a.bookOnly && a.open) errors.push(`${INDEX}: «${file}» يحملُ bookOnly وهو open:true`);
}
for (const file of lsFall.keys()) {
  if (!lsBooks.has(file)) errors.push(`ناقصٌ من فهرسِ ${INDEX}: ${file}`);
}

if (errors.length) {
  console.error(`\n✗ انحرافٌ في بياناتِ الكتبِ والبيع (${errors.length}):\n`);
  errors.forEach(e => console.error('  • ' + e));
  console.error(`\nالعلاج: طابِقِ الملفّاتِ — ${BOOKS} و${FALLBACK} بنفسِ المفاتيح،\nوأعضاءُ ${BUNDLES} موجودةٌ فعلاً، وonSale على الوحداتِ القابلةِ للبيعِ وحدَها.\n`);
  process.exit(1);
}

const nBundles   = Object.keys(bundles || {}).length;
const standalone = [...books.values()].filter(b => !memberKeys.has(b.key));
const forSale    = standalone.filter(b => b.onSale).length
                 + Object.values(bundles || {}).filter(b => b.onSale).length;
console.log(`✓ البياناتُ متماسكة — ${books.size} كتاباً في الملفَّين، ${nBundles} حزمةً بأعضاءٍ صحيحة،`);
console.log(`  و${standalone.length + nBundles} وحدةً قابلةً للبيعِ منها ${forSale} مطروحةٌ اليوم.`);
const nOpen = [...lsBooks.values()].filter(l => l.open).length;
const nBook = [...lsBooks.values()].filter(l => l.bookOnly).length;
console.log(`  وفهرسُ الدروسِ متطابق — ${lsBooks.size} درساً: ${nOpen} مؤلَّفاً · ${nBook} «في الكتاب» · ${lsBooks.size - nOpen - nBook} لم يُؤلَّفْ بعد.`);
