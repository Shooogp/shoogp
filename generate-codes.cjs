#!/usr/bin/env node
/* ============================================================================
   شوجب — مولّد رموز الفتح
   ----------------------------------------------------------------------------
   يولّد دفعة رموز عشوائية، ويكتب:
     • البصمات فقط  →  data/codes.json          (يُدفع إلى المستودع)
     • الرموز الصريحة → codes-private.csv        (محلّي — لا يُدفع أبداً)

   الاستعمال (أمرٌ واحد):
     npm run codes -- --count 30 --scope g4-sci  --exp 2026-12-31
     npm run codes -- --count 5  --scope g2-sci#3

   النطاق = **مفتاحُ الكتابِ في `data/books.json` حرفياً** (‏`g4-sci`‏، `g4-math`‏،
   `g2-arabic-1`‏) — لا بادئةُ ملفِّ الدرس (‏`g4s-1-1`‏)، وبينهما اختلافٌ قائمٌ في
   المستودع. ونطاقُ الوحدةِ يُفصَلُ بـ`#` لا بشرطة، لأنّ المفاتيحَ نفسَها تحوي شرطات.
   القاعدةُ كاملةً في `js/unlock.js`.

   ⚠️ الامتدادُ `.cjs` مقصود: `package.json` فيه `"type":"module"`، فملفُّ `.js`
   يُقرأُ وحدةَ ESM ويسقطُ عندَ `require`.
   ========================================================================== */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/* ------------------------------ الإعدادات ------------------------------ */
// ⚠️ يجب أن تطابق SALT في js/unlock.js — وتغييرُها يُبطِلُ كلَّ الرموزِ الصادرة
const SALT = 'shoogp::2026';
const CODES_FILE = 'data/codes.json';
const PRIVATE_FILE = 'codes-private.csv';
const LENGTH = 10;                     // طول الرمز — لا تُنقصه عن ١٠

// أبجدية بلا أحرف ملتبسة: حُذفت O و0 و I و1 و L
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/* ------------------------------- المدخلات ------------------------------ */
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const count = parseInt(arg('count', '20'), 10);
const scope = arg('scope');
const exp = arg('exp', null);

if (!scope) {
  console.error('ينقص --scope  (مثال: g4-sci للكتاب كاملاً، أو g4-sci#3 لوحدةٍ واحدة)');
  process.exit(1);
}

/* حارسُ النطاق: يتحقّقُ أنّ الكتابَ موجودٌ فعلاً في `data/books.json` قبلَ إصدارِ
   رموزٍ لا تفتحُ شيئاً. البنيةُ: فصلٌ ← صفٌّ ← مصفوفةُ كتب. */
const bookKey = scope.split('#')[0];
try {
  const terms = JSON.parse(fs.readFileSync(path.resolve('data/books.json'), 'utf8'));
  const keys = [];
  Object.values(terms).forEach((grades) =>
    Object.values(grades).forEach((books) => books.forEach((b) => keys.push(b.key))));
  if (!keys.includes(bookKey)) {
    console.error(`\n✗ لا كتابَ مفتاحُه «${bookKey}» في data/books.json.`);
    console.error('  النطاقُ هو مفتاحُ الكتابِ حرفياً — لا بادئةُ ملفِّ الدرس (g4s-1-1).');
    console.error(`  المتاح: ${keys.join('، ')}\n`);
    process.exit(1);
  }
} catch (e) {
  console.error('تعذّرت قراءة data/books.json للتحقّق من النطاق:', e.message);
  process.exit(1);
}

/* -------------------------------- التوليد ------------------------------ */
const normalize = (s) => s.trim().toUpperCase().replace(/[\s\-_]/g, '');
const hash = (code) =>
  crypto.createHash('sha256').update(SALT + normalize(code)).digest('hex');

function makeCode() {
  let raw = '';
  for (let i = 0; i < LENGTH; i++) {
    raw += ALPHABET[crypto.randomInt(ALPHABET.length)];
  }
  // تقسيم بشرطة ليسهل نسخه وإملاؤه
  return `${raw.slice(0, 5)}-${raw.slice(5)}`;
}

/* --------------------------- الدمج مع الموجود -------------------------- */
const codesPath = path.resolve(CODES_FILE);
fs.mkdirSync(path.dirname(codesPath), { recursive: true });

let store = {};
if (fs.existsSync(codesPath)) {
  store = JSON.parse(fs.readFileSync(codesPath, 'utf8'));
}
const before = Object.keys(store).length;

const fresh = [];
while (fresh.length < count) {
  const code = makeCode();
  const h = hash(code);
  if (h in store) continue;              // تصادم مستبعَد، لكن نتحقّق
  store[h] = exp ? { scope, exp } : scope;
  fresh.push(code);
}

fs.writeFileSync(codesPath, JSON.stringify(store, null, 2) + '\n', 'utf8');

/* ------------------------ السجل الخاص المحلّي --------------------------- */
const privPath = path.resolve(PRIVATE_FILE);
if (!fs.existsSync(privPath)) {
  fs.writeFileSync(privPath, 'الرمز,النطاق,ينتهي,تاريخ التوليد,سُلّم إلى,رقم الواتساب\n', 'utf8');
}
const stamp = new Date().toISOString().slice(0, 10);
fs.appendFileSync(
  privPath,
  fresh.map((c) => `${c},${scope},${exp || ''},${stamp},,\n`).join(''),
  'utf8'
);

/* -------------------------------- التقرير ------------------------------ */
console.log(`\nالنطاق: ${scope}${exp ? `   ينتهي: ${exp}` : '   بلا انتهاء'}`);
console.log(`رموز جديدة: ${fresh.length}   |   إجمالي البصمات: ${before} ← ${Object.keys(store).length}\n`);
fresh.forEach((c, i) => console.log(`  ${String(i + 1).padStart(3, ' ')}.  ${c}`));
console.log(`\nالبصمات كُتبت في   ${CODES_FILE}   (ادفعها إلى main)`);
console.log(`الرموز أُلحقت بـ  ${PRIVATE_FILE}   (محلّيٌّ — مستثنى في .gitignore، لا يُدفَع)\n`);
