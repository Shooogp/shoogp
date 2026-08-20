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
   ③ **قائمةُ المطروحِ للبيع** — كلُّ مفتاحٍ في `ON_SALE` بـ`pay.html` يُحَلُّ
      إلى كتابٍ أو حزمة. مفتاحٌ لا يُحَلُّ يختفي من السلّةِ صامتاً، فتدفعُ
      المعلّمةُ ولا تجدُ ما اشترتْ — وهذا الملفُّ هو الموضعُ الوحيدُ لقائمةِ
      المطروحِ عمداً (‏`js/unlock.js` §كتلةُ الشراء)، فلا رقيبَ عليه سواه.

   ⚠️ ولا يُفحَصُ **ترتيبُ** الكتبِ ولا بقيّةُ حقولِها (اللونُ والغلافُ والشارة):
   الترتيبُ ترتيبُ عرضٍ لا صحّة، وبقيّةُ الحقولِ انحرافُها يُرى بالعينِ فوراً.

   ⚠️ **ولا حقلَ `onSale` في البيانات** — قُصِدَ ذلك: قائمةُ المطروحِ تسكنُ
   `pay.html` وحدَها، و`js/unlock.js` **لا يقرؤها** فيُظهرُ رابطَي الشراءِ لكلِّ
   الكتبِ وصفحةُ الدفعِ وحدَها تقولُ «مطروحٌ» أو «قريباً». والفحصُ ③ يحرسُ هذا
   التصميمَ لا يستبدلُه.
   ═══════════════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';

const BOOKS    = 'data/books.json';
const FALLBACK = 'js/data.js';
const BUNDLES  = 'data/bundles.json';
const PAY      = 'pay.html';
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

/* ③ قائمةُ المطروحِ في pay.html: تُقرأُ نصّاً لا بتنفيذِ الصفحة (‏`ON_SALE : [ … ]`).
   إن تغيّرت صياغةُ الإعلانِ فلن يُعثَرَ عليها — وذلك خطأٌ يُبلَّغُ عنه، لا يُتجاوَز. */
const payText  = readFileSync(PAY, 'utf8');
const onSaleRe = /ON_SALE\s*:\s*\[([\s\S]*?)\]/;
const m = payText.match(onSaleRe);
if (!m) {
  errors.push(`${PAY}: لم يُعثَرْ على إعلانِ ON_SALE — أتغيّرت صياغتُه؟`);
} else {
  const saleIds = [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
  if (!saleIds.length) errors.push(`${PAY}: قائمةُ ON_SALE فارغة`);
  const seen = new Set();
  for (const id of saleIds) {
    if (seen.has(id)) errors.push(`${PAY}: مفتاحٌ مكرّرٌ في ON_SALE — ${id}`);
    seen.add(id);
    if (!bookKeys.has(id) && !Object.hasOwn(bundles || {}, id)) {
      errors.push(`${PAY}: ON_SALE فيه «${id}» ولا كتابَ بهذا المفتاحِ ولا حزمة`);
    }
  }
}

if (errors.length) {
  console.error(`\n✗ انحرافٌ في بياناتِ الكتبِ والبيع (${errors.length}):\n`);
  errors.forEach(e => console.error('  • ' + e));
  console.error(`\nالعلاج: طابِقِ الملفّاتِ — ${BOOKS} و${FALLBACK} بنفسِ المفاتيح،\nوأعضاءُ ${BUNDLES} ومفاتيحُ ON_SALE في ${PAY} كلُّها موجودةٌ فعلاً.\n`);
  process.exit(1);
}

const nBundles = Object.keys(bundles || {}).length;
console.log(`✓ البياناتُ متماسكة — ${books.size} كتاباً في الملفَّين، ${nBundles} حزمةً بأعضاءٍ صحيحة، وقائمةُ ON_SALE كلُّها تُحَلّ.`);
