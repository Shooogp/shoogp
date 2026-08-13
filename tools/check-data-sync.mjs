/* ═══════════════════════════════════════════════════════════════════
   فحصُ تطابقِ `data/books.json` مع احتياطِ `js/data.js` — يفشلُ عندَ الانحراف
   ───────────────────────────────────────────────────────────────────
   الاستعمال:  node tools/check-data-sync.mjs      (أو `npm run check`)
   المخرَج:    0 = متطابقان · 1 = انحرافٌ (ويُطبَعُ سببُه سطراً سطراً)

   ═══ لماذا فحصٌ آليٌّ لا تحذيرٌ مكتوب ═══
   الملفّانِ نسختانِ لبياناتٍ واحدة: `data/books.json` يُجلَبُ عبرَ HTTP، و
   `js/data.js` (‏`window.DATA_FALLBACK`) يُستعمَلُ حينَ يفشلُ الجلبُ — أي عندَ
   فتحِ `index.html` بالنقرِ المزدوج (وضعُ `file://`). **والانحرافُ وقعَ فعلاً:**
   سقطت بطاقةُ علومِ الثالثِ من الاحتياطِ وهي في `books.json`، فاختفى الكتابُ
   في وضعِ `file://` وحدَه — والتحذيرُ النصيُّ في رأسِ `js/data.js` كان مكتوباً
   حينَها ولم يمنعْ شيئاً. فالنسيانُ لا يُعالَجُ بتذكيرٍ بل بفحصٍ يفشل.

   ═══ ما يُفحَص ═══
   ① **المفاتيح** — نفسُ الفصولِ ونفسُ الصفوفِ ونفسُ مفاتيحِ الكتبِ في كلِّ صفّ.
   ② **قيمُ `onSale`** — متطابقةٌ لكلِّ مفتاح. وانحرافُها أخطرُ من غيرِه: كتابٌ
      `true` في أحدِهما و`false` في الآخرِ يُباعُ لزائرٍ ولا يُباعُ لآخرَ بحسبِ
      كيفيةِ فتحِه للموقع.
   ③ **وجودُ `onSale` صراحةً** في كلِّ كتاب — لأنّ الغيابَ يُقرأُ `false` وقتَ
      التشغيل (القاعدةُ المقصودة)، فبلا هذا الفحصِ يُنشَرُ كتابٌ جديدٌ **صامتاً
      غيرَ قابلٍ للبيعِ** ولا يُكتشَفُ إلا حينَ تسألُ معلّمةٌ عن زرٍّ لا يعمل.

   ⚠️ ولا يُفحَصُ **ترتيبُ** الكتبِ ولا بقيّةُ حقولِها (اللونُ والغلافُ والشارة):
   الترتيبُ ترتيبُ عرضٍ لا صحّة، وبقيّةُ الحقولِ انحرافُها يُرى بالعينِ فوراً في
   البطاقة. أمّا `onSale` فلا أثرَ له يُرى حتى تُنقَرَ شارةُ القفل.
   ═══════════════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';

const BOOKS = 'data/books.json';
const FALLBACK = 'js/data.js';
const errors = [];

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

const books = flatten(JSON.parse(readFileSync(BOOKS, 'utf8')), BOOKS);
const fallback = flatten(loadFallback(), FALLBACK);

// ① المفاتيح: ما في أحدِهما وليس في الآخر
for (const path of books.keys()) {
  if (!fallback.has(path)) errors.push(`ناقصٌ من ${FALLBACK}: ${path}`);
}
for (const path of fallback.keys()) {
  if (!books.has(path)) errors.push(`ناقصٌ من ${BOOKS}: ${path}`);
}

// ② و③ قيمةُ onSale: موجودةٌ صراحةً في الملفَّين، ومتطابقة
for (const [path, b] of books) {
  const f = fallback.get(path);
  if (!f) continue;                        // بُلِّغَ عنه في ① فلا يُكرَّر
  if (typeof b.onSale !== 'boolean') {
    errors.push(`${BOOKS}: «${path}» بلا حقلِ onSale صريح (true/false)`);
  }
  if (typeof f.onSale !== 'boolean') {
    errors.push(`${FALLBACK}: «${path}» بلا حقلِ onSale صريح (true/false)`);
  }
  if (b.onSale !== f.onSale) {
    errors.push(`onSale مختلف — ${path}: ${BOOKS}=${b.onSale} · ${FALLBACK}=${f.onSale}`);
  }
}

if (errors.length) {
  console.error(`\n✗ انحرافٌ بين ${BOOKS} و${FALLBACK} (${errors.length}):\n`);
  errors.forEach(e => console.error('  • ' + e));
  console.error(`\nالعلاج: طابِقِ الملفَّينِ — كلُّ كتابٍ في ${BOOKS} له نظيرٌ في ${FALLBACK} بنفسِ onSale.\n`);
  process.exit(1);
}

const forSale = [...books.values()].filter(b => b.onSale).length;
console.log(`✓ ${BOOKS} و${FALLBACK} متطابقان — ${books.size} كتاباً، منها ${forSale} مطروحةٌ للبيع.`);
