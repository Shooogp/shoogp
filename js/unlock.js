/* ═══════════════════════════════════════════════════════════════════
   شوجب — قفل الوحدات وفتحها برمز  (النسخة الأولى)
   ═══════════════════════════════════════════════════════════════════
   **هذا الملفُّ هو موطنُ قاعدةِ القفلِ كاملةً** — لا تُكرَّرْ في مكانٍ آخر.
   ‏`CLAUDE.md` يشيرُ إليه بسطرٍ واحدٍ فقط.

   ── القاعدةُ الأساسية: عتبةُ وحداتٍ مجانيةٍ في رأسِ كلِّ كتاب ──
   • **الوحداتُ المجانيةُ في رأسِ الكتاب، وما بعدَها مقفلٌ** حتى يُدخَلَ رمزُ فتحٍ صالح.
   • القاعدةُ **مشتقّةٌ من رقمِ الوحدةِ نفسِه** (ترتيبِها في `units`) — فلا حقلَ
     `locked` في `data/index.json`، ولا تعديلَ بياناتٍ عندَ إضافةِ كتاب.
   • **وعددُ المجانيِّ يختلفُ بالمادّة** (قرارُ المالك ٢٠٢٦-٠٩-٠٥ — `freeUnits` أدناه):

     | الكتاب | المجانيّ | المقفول |
     |---|---|---|
     | **أحب لغتي — الجزءُ الأول** (`g*-arabic-1`) | **كلُّ الوحدات** | لا شيء |
     | **أحب لغتي — الجزءُ الثاني** (`g*-arabic-2`) | لا شيء | **كلُّ الوحدات** |
     | **ديني حياتي — كلا الجزأين** (`g*-dini-*`) | كلُّ الوحداتِ **إلا الأخيرة** | **الأخيرةُ وحدَها** |
     | **بقيّةُ الكتب** (العلوم · الرياضيات) | **الأولى** وحدَها | ما بعدَها |

     ⚠️ **والمقفولُ في الحالاتِ كلِّها ذيلٌ متّصلٌ في آخرِ الكتاب** — فإطارُ القفلِ
     الواحدُ في `js/app.js` باقٍ على حالِه بلا حالةِ «مقفلةٌ تسبقُ مفتوحة».
     و«أخيرة» ديني حياتي تحتاجُ **عددَ الوحدات**، فيُمرَّرُ وسيطاً ثالثاً إلى
     `isUnitLocked` من الفهرسِ نفسِه الذي تُرسَمُ منه القائمة.

   ── نطاقُ الرمز: الكتابُ كاملاً لا غير (قرارُ المالك ٢٠٢٦-٠٨-٠٧) ──
   **الرمزُ يفتحُ كتاباً كاملاً. ولا وجودَ لنطاقِ وحدةٍ مستقلٍّ إطلاقاً**، فالبيعُ
   والفتحُ على مستوى الكتاب.

   ⚠️ **النطاقُ هو مفتاحُ الكتابِ في `data/books.json` حرفياً** (‏`g4-sci`‏، `g4-math`‏،
   `g2-arabic-1`‏) — **لا بادئةُ ملفِّ الدرس** (‏`g4s-1-1`‏). وبينهما اختلافٌ قائمٌ في
   المستودع، ولا تُبنى ترجمةٌ بينهما في أيِّ موضع: هويةُ الكتابِ في القفلِ تُقرأُ من
   **المصدرِ نفسِه الذي تُقرأُ منه القائمة** (`currentBook` في `js/app.js`).

   ── الحزمة: نطاقُ بيعٍ يمنحُ كتابَين ──
   «ديني حياتي» و«أحب لغتي» جزآنِ في كلِّ صفّ، ويُباعانِ **كتاباً واحداً بثمنٍ
   واحدٍ ورمزٍ واحد**. فالنطاقُ `g1-din` **حزمةٌ** لا مفتاحُ كتاب: يمنحُ
   `g1-dini-1` و`g1-dini-2` معاً. التعريفُ في `data/bundles.json`، والتفصيلُ
   عندَ `bundlesCache` أدناه. ⚠️ **والحزمةُ تُفَكُّ عندَ الفتحِ لا عندَ العرض:**
   المخزَّنُ في `localStorage` مفاتيحُ الكتبِ الحقيقيةُ وحدَها، فلا يعرفُ القفلُ
   بالحزمِ شيئاً وتبقى القاعدةُ أعلاه على حالِها بلا ترجمةٍ وقتَ الرسم.

   ⚠️ **الصيغةُ القديمةُ `g4-sci#3` (نطاقُ وحدة) أُسقِطت من المنطقِ ولا تُرفَض:**
   يُقتَطَعُ ما بعدَ `#` فتُعامَلُ رمزَ كتاب — في `redeem` لِما يردُ من `codes.json`،
   وفي `grants` لِما قد يكونُ محفوظاً في متصفّحِ معلّمةٍ من قبل. **احتياطٌ بسطرَين
   لا أكثر:** مُتحقَّقٌ أنّ الرموزَ الـ١٢٠ الصادرةَ فعلاً كلَّها بنطاقِ كتاب.

   ⚠️ **والإسقاطُ لا يُبطِلُ رمزاً واحداً صادراً:** البصمةُ `SHA-256` تُحسَبُ على
   `SALT + الرمزُ المطبَّع` **ولا يدخلُ النطاقُ فيها إطلاقاً** — النطاقُ **قيمةٌ**
   في خريطةِ الرموزِ لا جزءٌ من مفتاحِها. فتغييرُ دلالةِ النطاقِ يمسُّ ما يفعلُه
   الرمزُ لا صحّتَه.

   ── الوحداتُ المجانية: عتبةٌ لا نطاق ──
   `FREE_UNITS = 1` هو الافتراضُ، و`freeUnits()` تُبدّلُه بالمادّة. وهو **عتبةُ
   عرضٍ** مشتقّةٌ من رقمِ الوحدة، لا نطاقَ منحةٍ يُشترى — فلا علاقةَ له بإسقاطِ
   نطاقِ الوحدة، ولا يُبطِلُ رمزاً: الرمزُ يفتحُ الكتابَ كلَّه أيّاً كانت عتبتُه.

   ── آليةُ التحقّق ──
   • **لا يُخزَّنُ أيُّ رمزٍ صريحٍ في المستودع.** يُخزَّنُ `SHA-256` للنصِّ
     `SALT + الرمزُ المطبَّع`، والتطبيعُ: رفعٌ إلى الحروفِ الكبيرةِ وحذفُ الفراغاتِ
     والشرطاتِ والشرطاتِ السفلية.
   • ‏`data/codes.json` يُجلَبُ بـ`cache:'no-store'` لأنّه يتغيّرُ بين النشرات،
     و**لا يُجلَبُ إلا عندَ التحقّقِ من رمزٍ مُدخَل** — حالةُ الفتحِ نفسُها تُقرأُ من
     `localStorage` فتُرسَمُ الأقفالُ فوراً بلا انتظارِ شبكة.
   • لكلِّ رمزٍ تاريخُ انتهاءٍ اختياريّ (`exp`) لأنّ البيعَ بالفصلِ الدراسيِّ لا مدى
     الحياة. يُتحقَّقُ من الانتهاءِ **في كلِّ قراءة**، لا عندَ الفتحِ فقط.
   • ما يُفتَحُ يُحفَظُ في `localStorage` تحتَ **مفتاحٍ واحد** (`shoogp-unlocked`)
     خريطةً: النطاقُ ← تاريخُ الانتهاء (أو `null` بلا انتهاء).

   ── زرُّ تبديلِ القفل (بقرارِ المالك ٢٠٢٦-٠٨-٠٦، ومحجوبٌ منذُ ٢٠٢٦-٠٩-٠٢) ──
   زرٌّ في أعلى الصفحةِ الرئيسيةِ وشاشةِ الكتاب يبدّلُ القفلَ بين مفعَّلٍ ومعطَّلٍ
   بنقرة. حالتُه في `localStorage` تحتَ `shoogp-lock-off` — **مفتاحٌ منفصلٌ لا
   يمسُّ خريطةَ المنَحِ (`shoogp-unlocked`) في الحالتَين**. التفصيلُ عندَ `OFF_KEY`.
   ⚠️ **ولا يظهرُ إلا في وضعِ المطوِّر** (‏`DEV_KEY` أدناه): كان ظاهراً لكلِّ زائرٍ
   فيفتحُ الكتبَ المدفوعةَ بنقرة، وهو ما لا يصحُّ والبيعُ قائم.

   ── كتلةُ الشراءِ في نافذةِ الرمز: عنوانٌ نصّيٌّ ثمّ طريقان ──
   أسفلَ زرِّ «فتح الكتاب»: سطرُ **«شراء الكتاب»** نصّاً لا زرّاً، وتحتَه رابطان
   يفتحانِ **تبويباً جديداً** (‏`target="_blank"` مع `rel="noopener"`):
   • **واتساب** — `wa.me/<WA_NUMBER>` ومعه **رسالةٌ مكتوبةٌ سلفاً باسمِ الكتاب**.
     والتعبئةُ المسبقةُ ليست زينةً: مسارُ الواتساب يستخرجُ الكتابَ من نصِّ الرسالة،
     فصياغةٌ أخرى تُنتِجُ «لم نعرف أيّ كتاب تريدين». والاسمُ اسمُ **الحزمةِ** إن كان
     الكتابُ جزءاً منها (‏`bundleOfBook`)، فلا تطلبُ جزءاً لا يُباعُ وحدَه.
   • **من الموقع** — `pay.html?book=<مفتاحُ الكتاب>`. يُمرَّرُ المفتاحُ كما هو،
     وصفحةُ الدفعِ هي التي تردُّ الجزءَ إلى حزمتِه (‏`saleIdOf` هناك) — فلا تُكرَّرُ
     معرفةُ الحزمِ في طرفَين.
   **يظهرانِ لكلِّ الكتبِ بلا استثناء** — وصفحةُ الدفعِ وحدَها هي التي تقولُ إن كان
   الكتابُ مطروحاً للبيعِ أو «قريباً»، فلا تُكرَّرُ معرفةُ المطروحِ في مكانَين.
   ومصدرُها حقلُ `onSale` في البياناتِ نفسِها — على **الوحدةِ القابلةِ للبيع**:
   `data/books.json` للكتابِ المستقلّ و`data/bundles.json` للحزمة، ولا يحملُه
   جزءُ حزمةٍ لأنّه لا يُباعُ وحدَه.
   ⚠️ زرُّ الواتساب **أخضرُ بلونِ العلامةِ لا رمليّ** — استثناءٌ مقصودٌ من قاعدةِ
   «فعلٌ أخضرُ واحدٌ في النافذة»، لأنّ لونَ واتساب يُعرَفُ قبلَ أن يُقرَأ. وهو معزولٌ
   تحتَ عنوانٍ نصّيٍّ يفصلُ «عندي رمز» عن «أريد أن أشتري».
   ⚠️ **الزرُّ في النافذةِ لا في شارةِ رأسِ الوحدة** (‏`.unit-lock` في `js/app.js`):
   تلك الشارةُ `span` داخلَ `button` رأسِ الوحدةِ عمداً — فعنصرٌ تفاعليٌّ داخلَها
   يُعشِّشُ زرّاً في زرّ. والنافذةُ هي ما يُفتَحُ بنقرِ الشارةِ أصلاً.
   ⚠️ **المفتاحُ هو مفتاحُ الكتابِ نفسُه** (`pending.bookKey`)، وهو مفتاحُ
   `data/books.json` الذي تقرأُ منه صفحةُ الدفعِ قائمتَها — فالطرفانِ على مصدرٍ واحد.

   ── حدٌّ صريحٌ لا يُتجاوَز ──
   هذا **حاجزُ شراءٍ لا حمايةٌ أمنية**. أيُّ قفلٍ في موقعٍ ثابتٍ يمكنُ تجاوزُه من
   أدواتِ المطوّر، وأيُّ رمزٍ يمكنُ مشاركتُه. **لا يُبنى تعقيدٌ إضافيٌّ لمنعِ ذلك** —
   لا تشويشَ على الكود، ولا ربطَ بالجهاز، ولا كشفَ لأدواتِ المطوّر.

   ── توليدُ الرموز ──
   `npm run codes -- --count 30 --scope g4-sci --exp 2026-12-31`
   يكتبُ البصماتِ في `data/codes.json` (تُدفَع) والرموزَ الصريحةَ في
   `codes-private.csv` (محلّيٌّ — في `.gitignore`، لا يُدفَعُ أبداً).

   ⚠️ **قيمةُ `SALT` تُثبَّتُ مرّةً واحدة**، وهي هنا وفي `generate-codes.cjs` معاً.
   **تغييرُها يُبطِلُ كلَّ الرموزِ الصادرةِ من قبل** — لا تُغيَّرْ إلا بقرارٍ صريحٍ
   من المالكِ وبعدَ تنبيهِه.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SALT = 'shoogp::2026';        // ⚠️ يجب أن يطابق SALT في generate-codes.cjs
  var STORE_KEY = 'shoogp-unlocked';
  var CODES_URL = 'data/codes.json';
  var BUNDLES_URL = 'data/bundles.json';
  /* رقمُ واتساب شوجب التجاريُّ الذي يستقبلُ الطلبات (‏+968 7171 2937) — بصيغةِ
     `wa.me`: أرقامٌ فقط بمفتاحِ الدولةِ بلا `+` ولا فراغات. وهو الرقمُ نفسُه الذي
     يستمعُ إليه مسارُ «شوجب — استقبال واتساب» في n8n. */
  var WA_NUMBER = '96871712937';
  var FREE_UNITS = 1;               // الافتراض: وحدةٌ مجانيةٌ واحدةٌ في رأس كل كتاب

  /* عددُ الوحداتِ المجانيةِ في رأسِ الكتاب — بالمادّةِ (قرارُ المالك ٢٠٢٦-٠٩-٠٥؛
     الجدولُ في رأسِ الملف). `unitCount` عددُ وحداتِ الكتابِ من الفهرس، ولا يلزمُ
     إلا لـ«ديني حياتي» (كلُّها إلا الأخيرة)؛ فإن غابَ عادَ الافتراض. */
  function freeUnits(bookKey, unitCount) {
    var k = String(bookKey || '');
    if (/^g\d+-arabic-1$/.test(k)) return Infinity;            // أحب لغتي ج١: مفتوحٌ كلُّه
    if (/^g\d+-arabic-2$/.test(k)) return 0;                   // أحب لغتي ج٢: مقفولٌ كلُّه
    if (/^g\d+-dini-\d+$/.test(k)) {                            // ديني حياتي: الأخيرةُ وحدَها مقفولة
      var n = Number(unitCount);
      return (n > 0) ? n - 1 : FREE_UNITS;
    }
    return FREE_UNITS;                                          // بقيّةُ الكتب: الأولى مجانية
  }

  /* نطاقُ الكتابِ من أيِّ نطاقٍ مخزَّن: يقتطعُ لاحقةَ `#n` من الصيغةِ القديمة
     (نطاقُ الوحدة) فتُعامَلُ رمزَ كتاب. سطرٌ واحدٌ يحمي رمزاً قديماً إن وُجد. */
  function bookOf(scope) { return String(scope == null ? '' : scope).split('#')[0]; }

  /* ═══════════════════ الحزمة: نطاقُ بيعٍ يمنحُ أكثرَ من كتاب ═══════════════════
     «ديني حياتي» و«أحب لغتي» جزآنِ في كلِّ صفّ، فهما في `data/books.json` كتابانِ
     مستقلّانِ لكلٍّ منهما وحداتُه. وقرارُ البيعِ أنّ **الجزأينِ كتابٌ واحدٌ بثمنٍ
     واحدٍ ورمزٍ واحد** — فلا تشتري المعلّمةُ ما تراه كتاباً مرّتَين.

     فالنطاقُ `g1-din` **حزمةٌ**: لا كتابَ بهذا المفتاحِ في `books.json`، وإنما
     يمنحُ أعضاءَه `g1-dini-1` و`g1-dini-2`. والتعريفُ في `data/bundles.json`
     **مصدراً واحداً** تقرأُ منه ثلاثةُ مواضع: هذا الملفُّ، و`pay.html`،
     و`generate-codes.cjs`.

     ⚠️ **ولا يخرقُ هذا قاعدةَ «النطاقُ مفتاحُ الكتابِ حرفياً» أعلاه:** تلك تمنعُ
     الترجمةَ بينَ بادئةِ ملفِّ الدرسِ ومفتاحِ الكتاب. والحزمةُ ليست ترجمةً بل
     **مفهومُ بيعٍ** فوقَ المفاتيح: ما يُخزَّنُ في `localStorage` بعدَ الفتحِ هو
     **مفاتيحُ الكتبِ الحقيقيةُ لا مفتاحُ الحزمة**، فيبقى `isUnitLocked` وخريطةُ
     المنَحِ على المفاتيحِ الحرفيةِ وحدَها بلا أيِّ ترجمةٍ وقتَ العرض.

     ⚠️ **ولا يُبطِلُ رمزاً صادراً:** البصمةُ تُحسَبُ على الرمزِ المطبَّعِ وحدَه ولا
     يدخلُ النطاقُ فيها — النطاقُ قيمةٌ في `codes.json` لا جزءٌ من مفتاحِها. */
  var bundlesCache = null;

  function loadBundles() {
    if (bundlesCache) return Promise.resolve(bundlesCache);
    return fetch(BUNDLES_URL, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (o) {
        bundlesCache = (o && typeof o === 'object') ? o : {};
        return bundlesCache;
      })
      // غيابُ الملفِّ لا يكسرُ الفتح: النطاقُ حينَها يُعامَلُ مفتاحَ كتابٍ كما كان
      .catch(function () { bundlesCache = {}; return bundlesCache; });
  }

  /* الكتبُ التي يفتحُها نطاقٌ ما: أعضاءُ الحزمةِ إن كانت حزمة، وإلا فهو نفسُه. */
  function booksOfScope(scope, bundles) {
    var b = bundles && bundles[scope];
    var m = b && b.members;
    return (m && m.length) ? m.slice() : [scope];
  }

  /* الحزمةُ التي ينتمي إليها كتابٌ ما، أو `null` إن كان يُباعُ وحدَه. */
  function bundleOfBook(bookKey, bundles) {
    var ids = Object.keys(bundles || {});
    for (var i = 0; i < ids.length; i++) {
      var m = bundles[ids[i]].members || [];
      if (m.indexOf(bookKey) !== -1) return ids[i];
    }
    return null;
  }

  /* اسمُ النطاقِ المقروء: عنوانُ الحزمةِ وصفُّها، وإلا فعنوانُ الكتابِ من الفهرس. */
  function scopeTitle(scope, bundles) {
    var b = bundles && bundles[scope];
    if (b && b.title) return b.title + (b.grade ? ' — الصف ' + b.grade : '');
    return bookTitle(scope);
  }

  /* ───────────────────────── أدوات صغيرة ───────────────────────── */

  function normalize(s) {
    return String(s == null ? '' : s).trim().toUpperCase().replace(/[\s\-_]/g, '');
  }

  // تاريخ اليوم ISO بالتوقيت المحلّي (لا UTC — المعلّمة تقرأ تقويمها لا تقويم غرينتش)
  function todayISO() {
    var d = new Date();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  // exp شامل: الرمز صالح في يوم انتهائه نفسه، ومنتهٍ في اليوم التالي
  function isExpired(exp) {
    return !!exp && String(exp) < todayISO();
  }

  /* ── التخزين المحلّي — لا ينهار في التصفّح الخاص ──
     كل نداء محاط بـtry: قراءةٌ فاشلة ⇒ لا مفاتيح مفتوحة (الوحدة الأولى تبقى
     مجانية فيبقى الموقع صالحاً للاستعمال)، وكتابةٌ فاشلة ⇒ نُخبر المعلّمة. */
  function readStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return {};
      var o = JSON.parse(raw);
      return (o && typeof o === 'object') ? o : {};
    } catch (e) { return {}; }
  }

  function writeStore(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); return true; }
    catch (e) { return false; }
  }

  /* المنَحُ الصالحةُ الآن: تُسقِطُ المنتهيةَ عند كل قراءة (لا عند الفتح فقط)،
     وتكتبُ الخريطةَ المنقّاةَ إن تغيّرت فلا تتراكم أسطرٌ ميتة. */
  function grants() {
    var raw = readStore(), out = {}, dirty = false;
    Object.keys(raw).forEach(function (scope) {
      var exp = raw[scope];
      if (isExpired(exp)) { dirty = true; return; }
      // منحةٌ قديمةٌ بصيغةِ `g4-sci#3` تصيرُ منحةَ كتاب — فلا يُقفَلُ كتابٌ فُتِحَ فعلاً
      var book = bookOf(scope);
      if (book !== scope) dirty = true;
      out[book] = exp || null;
    });
    if (dirty) writeStore(out);
    return out;
  }

  /* ═══════════ مفتاحُ تعطيلِ القفل — حالةٌ مستقلّةٌ عن الرموز ═══════════
     تبديلٌ يدويٌّ بزرٍّ في أعلى الصفحة: حين يكونُ القفلُ **معطَّلاً** تُفتَحُ كلُّ
     الوحداتِ بلا رمز، وحين يعودُ **مفعَّلاً** يعملُ القفلُ كما كانَ تماماً.

     ⚠️ **مفتاحُ تخزينٍ منفصلٌ تماماً عن `STORE_KEY`** — والفصلُ مقصودٌ لا تنظيميّ:
     التعطيلُ **لا يقرأُ خريطةَ المنَحِ ولا يكتبُها ولا يمسحُها**، فالرموزُ المفتوحةُ
     تبقى كما هي في الحالتَين، ويعودُ ما فُتِحَ بها مفتوحاً لحظةَ إعادةِ التفعيل.
     ‏(‏`removeItem` عندَ التفعيلِ يمحو **مفتاحَ التعطيلِ وحدَه** لا شيءَ سواه.)

     ⚠️ **وهذا الزرُّ محجوبٌ إلا في وضعِ المطوِّر** — فهو تبديلٌ للفحصِ والعرضِ
     لا حاجزُ شراء. حاجزُ الشراءِ نفسُه يبقى ما وُصِفَ في رأسِ الملفّ. */
  var OFF_KEY = 'shoogp-lock-off';

  var lockOff = (function () {
    try { return localStorage.getItem(OFF_KEY) === '1'; } catch (e) { return false; }
  })();

  /* ═══════════════════ وضعُ المطوِّر: مَن يرى زرَّ التبديل ═══════════════════
     الزرُّ يفتحُ الكتبَ المدفوعةَ كلَّها بنقرة، فظهورُه لكلِّ زائرٍ يُبطِلُ البيع.
     فصار محجوزاً لجهازِ المالك: يُفتَحُ الوضعُ **مرّةً واحدةً لكلِّ متصفّح** بزيارةِ
     الموقعِ ومعه `?dev=<الكلمة>`، وتُحفَظُ الإشارةُ في `localStorage`، ثمّ يعملُ
     الزرُّ بعدَها في كلِّ زيارةٍ بلا وسيط. و`?dev=off` يُطفئُ الوضعَ ويُعيدُ القفل.

     ⚠️ هذا **حجبٌ لا تأمين**: الكلمةُ مكتوبةٌ في ملفٍّ يُنزَّلُ إلى كلِّ متصفّح،
     ومَن يفتحُ أدواتِ المطوِّرِ يبلغُها. وهو كافٍ لغرضِه — منعُ المعلّمةِ من رؤيةِ
     زرٍّ يفتحُ لها ما لم تشترِه — أمّا التأمينُ الحقيقيُّ فمحلُّه الخادمُ لا المتصفّح.

     ⚠️ والوسيطُ يُمحى من شريطِ العنوانِ بعدَ قراءتِه (‏`replaceState`) كي لا تُعرَضَ
     الكلمةُ على السبورةِ أمامَ الصفّ. وهذا **ليس توجيهاً بالروابط** — المنصّةُ بلا
     توجيهٍ كما هي، والنداءُ يقعُ مرّةً واحدةً عندَ الإقلاعِ ولا يُنشئُ حالةَ تصفّح. */
  var DEV_KEY  = 'shoogp-dev';
  var DEV_PASS = 'shoogp2026';

  var devMode = (function () {
    var m = /[?&]dev=([^&#]*)/.exec(location.search || '');
    var on = false;
    try { on = localStorage.getItem(DEV_KEY) === '1'; } catch (e) {}
    if (!m) return on;

    var v = '';
    try { v = decodeURIComponent(m[1]); } catch (e) { v = m[1]; }
    try {
      if (v === DEV_PASS) { localStorage.setItem(DEV_KEY, '1'); on = true; }
      else if (v === 'off') { localStorage.removeItem(DEV_KEY); localStorage.removeItem(OFF_KEY); on = false; }
    } catch (e) {}

    try {
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname + location.hash);
      }
    } catch (e) {}
    return on;
  })();

  /* بلا وضعِ المطوِّرِ لا تعطيلَ ألبتّة — وإلّا بقيَ متصفّحٌ عطّلَ القفلَ سابقاً
     مفتوحاً على كلِّ الكتبِ بلا زرٍّ يُعيدُ القفل. */
  if (!devMode && lockOff) {
    lockOff = false;
    try { localStorage.removeItem(OFF_KEY); } catch (e) {}
  }

  function isLockOff() { return lockOff; }

  /* ───────────────────── حالة القفل (بلا شبكة) ───────────────────── */

  /* الوحدةُ مقفلةٌ ما لم تكن مجانيةً بالعتبةِ أو يكن **الكتابُ** ممنوحاً.
     لا فحصَ لنطاقِ وحدةٍ — أُسقِط (انظر رأسَ الملف). `unitCount` عددُ وحداتِ
     الكتابِ (يلزمُ لـ«ديني حياتي» وحدَها — `freeUnits`). */
  function isUnitLocked(bookKey, unitIndex, unitCount) {
    if (lockOff) return false;                         // القفلُ معطَّلٌ ⇒ كلُّ الوحداتِ مفتوحة
    if (!bookKey) return false;
    if (unitIndex < freeUnits(bookKey, unitCount)) return false;   // الرأسُ المجانيُّ بالمادّة
    return !Object.prototype.hasOwnProperty.call(grants(), bookKey);
  }

  /* حارسُ الدرس: يمنعُ فتحَ درسٍ في وحدةٍ مقفلة مهما كان مدخلُه (نقرٌ أو نداءٌ
     برمجيّ أو رابطٌ مباشرٌ إن أُضيف لاحقاً). هويةُ الكتابِ تأتي **وسيطاً** من
     `currentBook` — لا تُشتَقُّ هنا من اسمِ ملفِّ الدرس. */
  function guardLesson(bookKey, lesson, indexData) {
    var idx = bookKey && indexData && indexData[bookKey];
    if (!idx || !idx.units || !lesson) return false;
    for (var i = 0; i < idx.units.length; i++) {
      var lessons = idx.units[i].lessons || [];
      for (var j = 0; j < lessons.length; j++) {
        if (lessons[j].file === lesson.file) {
          /* حجبٌ صامتٌ بلا نافذة: نافذةُ الرمزِ تُفتَحُ من القفلِ الكبيرِ على الإطارِ
             وحدَه، ونقرُ الدرسِ المقفلِ يوجّهُ النظرَ إليه (`nudge` في `js/app.js`). */
          if (isUnitLocked(bookKey, i, idx.units.length)) return true;
          return false;   // وُجد الدرس ووحدتُه مفتوحة
        }
      }
    }
    return false;         // درسٌ خارجَ الفهرس — لا يُحجَب
  }

  /* ───────────────────── التحقّق من رمزٍ مُدخَل ───────────────────── */

  function sha256hex(text) {
    var subtle = window.crypto && window.crypto.subtle;
    if (!subtle) return Promise.reject(new Error('no-subtle'));
    var bytes = new TextEncoder().encode(text);
    return subtle.digest('SHA-256', bytes).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    });
  }

  // {ok:true, scope, exp} | {ok:false, reason:'empty'|'bad'|'expired'|'net'|'store'}
  function redeem(input) {
    var code = normalize(input);
    if (!code) return Promise.resolve({ ok: false, reason: 'empty' });

    return sha256hex(SALT + code)
      .then(function (digest) {
        return Promise.all([
          fetch(CODES_URL, { cache: 'no-store' })
            .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); }),
          loadBundles()
        ]).then(function (a) { return { digest: digest, codes: a[0], bundles: a[1] }; });
      })
      .then(function (res) {
        var entry = res.codes && res.codes[res.digest];
        if (!entry) return { ok: false, reason: 'bad' };

        // الصيغتان: نصٌّ مجرّد (بلا انتهاء) أو كائن {scope, exp}
        // و`bookOf` يقتطعُ `#n` فيُقبَلُ رمزُ الوحدةِ القديمُ رمزَ كتابٍ لا يُرفَض
        var scope = bookOf((typeof entry === 'string') ? entry : entry.scope);
        var exp = (typeof entry === 'string') ? null : (entry.exp || null);
        if (!scope) return { ok: false, reason: 'bad' };
        if (isExpired(exp)) return { ok: false, reason: 'expired' };

        /* الحزمةُ تُفَكُّ هنا مرّةً واحدة: يُخزَّنُ **أعضاؤها** لا مفتاحُها، فما بعدَ
           هذه النقطةِ لا يعرفُ شيءٌ في الملفِّ بالحزمِ — لا `grants` ولا القفل. */
        var opened = booksOfScope(scope, res.bundles);
        var g = grants();
        opened.forEach(function (k) { g[k] = exp; });
        if (!writeStore(g)) return { ok: false, reason: 'store' };
        return {
          ok: true, scope: scope, exp: exp,
          books: opened, title: scopeTitle(scope, res.bundles)
        };
      })
      .catch(function () { return { ok: false, reason: 'net' }; });
  }

  /* ───────────────────────── نافذة الإدخال ───────────────────────── */

  var MSG = {
    empty:   'أدخلي رمز الفتح أولاً.',
    bad:     'هذا الرمز غير صحيح. تأكّدي من كتابته كما وصلكِ.',
    expired: 'انتهت صلاحية هذا الرمز. إن كنتِ متأكدة أنه حديث، فتحقّقي من تاريخ الجهاز.',
    net:     'تعذّر الاتصال للتحقّق من الرمز. تأكّدي من الإنترنت وأعيدي المحاولة.',
    store:   'متصفّحكِ يمنع الحفظ (تصفّح خاص؟). جرّبي نافذة عادية.',
    ok:      '🎉 تمّ الفتح! تظهر الدروس الآن…'
  };

  // الأرقام الهندية وجوباً — `arNum` من `js/app.js`، وبديلٌ محلّيٌّ إن غاب
  function num(n) {
    return (typeof window.arNum === 'function')
      ? window.arNum(n)
      : String(n).replace(/[0-9]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[+d]; });
  }

  /* عنوانُ الكتابِ المقروءُ للمعلّمة (مثل «العلوم — الصف الأول»).
     `DATA` مُعرَّفٌ بـ`let` في `js/app.js`، فهو في النطاقِ المعجميِّ العامِّ لا على
     `window`؛ ويُقرأُ هنا وقتَ الاستعمالِ لا وقتَ التحميل. و`try` تحمي من منطقةِ
     الموتِ المؤقّتة (TDZ) لو نودِيَت قبلَ تنفيذِ `app.js` — إذ حتى `typeof` يرمي. */
  function bookTitle(bookKey) {
    try {
      var idx = DATA && DATA.index && DATA.index[bookKey];
      return (idx && idx.book) || bookKey;
    } catch (e) { return bookKey; }
  }

  /* ═══ هل الرمزُ لهذا الكتاب؟ ═══
     يُفحَصُ على **الكتبِ التي فتحَها الرمزُ فعلاً** (`res.books`) لا على نطاقِه —
     فرمزُ الحزمةِ `g1-din` يغطّي `g1-dini-1` و`g1-dini-2` كليهما. وبدونِ هذا
     الفحصِ يُقبَلُ رمزُ كتابٍ آخرَ وتظهرُ رسالةُ نجاحٍ ثمّ لا يُفتَحُ ما أمامها. */
  function scopeCovers(res, bookKey) {
    var list = (res && res.books && res.books.length) ? res.books : [res && res.scope];
    return list.indexOf(bookKey) !== -1;
  }

  /* رسالةُ عدمِ التطابقِ — تقولُ للمعلّمةِ **ما الذي يفتحُه رمزُها** و**أين هي الآن**،
     وتطمئنُها أنّ الرمزَ لم يُهدَرْ (المنحةُ محفوظةٌ فعلاً — الرمزُ مدفوعٌ وصحيح). */
  function mismatchMsg(res, p) {
    return 'هذا الرمز لكتابٍ آخر: «' + (res.title || bookTitle(res.scope)) + '»، ' +
           'وأنتِ الآن في «' + bookTitle(p.bookKey) + '». ' +
           'الرمز محفوظٌ ولم يُهدَر — افتحي ذلك الكتاب لتجديه مفتوحاً.';
  }

  var box = null, elInput, elMsg, elGo, elBuyWa, elBuySt, elClose, elTitle, elSub, elBand,
      elWaQr, elWaCv, elBuyRow, lastFocus = null;

  function build() {
    if (box) return box;

    box = document.createElement('div');
    box.className = 'lockwrap';
    box.setAttribute('hidden', '');
    box.innerHTML =
      '<div class="lockback" data-close="1"></div>' +
      '<div class="lockbox" role="dialog" aria-modal="true" aria-labelledby="lockTitle">' +
        '<div class="lockband"></div>' +
        '<button type="button" class="lockclose" aria-label="إغلاق النافذة">✕</button>' +
        '<div class="lockicon" aria-hidden="true">🔒</div>' +
        '<h2 class="locktitle" id="lockTitle">هذه الوحدة مقفلة</h2>' +
        '<p class="locksub"></p>' +
        '<label class="locklabel" for="lockInput">أدخلي رمز الفتح</label>' +
        '<input class="lockinput" id="lockInput" type="text" autocomplete="off"' +
              ' spellcheck="false" autocapitalize="characters" dir="ltr" placeholder="XXXXX-XXXXX">' +
        '<p class="lockmsg" role="status" aria-live="polite"></p>' +
        '<button type="button" class="lockgo">افتح الكتاب</button>' +
        '<p class="lockbuytitle">شراء الكتاب</p>' +
        '<div class="lockbuyrow">' +
          /* بطاقةُ رمزِ الواتساب — بديلُ الزرِّ على الشاشةِ العريضة. تُبنى مخفيّةً
             و`setWaHref` هي التي تُظهرُ أحدَهما وتُخفي الآخر. */
          '<div class="lockwaqr" hidden>' +
            /* ترويسةُ البطاقة: أيقونةُ واتساب واسمُه — يُعرَفانِ قبلَ أن يُقرَأَ
               النصّ، وهما ما كان يحملُه الزرُّ الأخضرُ المستبدَل. */
            '<span class="lockwaqr-brand">' +
              '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' +
                '<path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.21.88 2.39 1 2.55.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z"/>' +
              '</svg>واتساب' +
            '</span>' +
            '<canvas class="lockwaqr-cv" width="180" height="180" aria-hidden="true"></canvas>' +
            '<span class="lockwaqr-cap">امسحي الرمز بكاميرا هاتفك<br>لتُفتَحَ محادثة واتساب بطلبك</span>' +
          '</div>' +
          '<a class="lockbuy lockbuy-wa" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
              '<path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.21.88 2.39 1 2.55.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z"/>' +
            '</svg>' +
            '<span>واتساب</span>' +
          '</a>' +
          '<a class="lockbuy lockbuy-site" target="_blank" rel="noopener">' +
            '<span class="lockbuy-ico" aria-hidden="true">🛒</span><span>من الموقع</span>' +
          '</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(box);
    elBand  = box.querySelector('.lockband');
    elTitle = box.querySelector('.locktitle');
    elSub   = box.querySelector('.locksub');
    elInput = box.querySelector('.lockinput');
    elMsg   = box.querySelector('.lockmsg');
    elGo    = box.querySelector('.lockgo');
    elBuyWa = box.querySelector('.lockbuy-wa');
    elBuySt = box.querySelector('.lockbuy-site');
    elBuyRow = box.querySelector('.lockbuyrow');
    elWaQr  = box.querySelector('.lockwaqr');
    elWaCv  = box.querySelector('.lockwaqr-cv');
    elClose = box.querySelector('.lockclose');

    /* ثلاثةُ مخارجَ للإغلاق: الزرُّ ✕ · الخلفيةُ خارجَ النافذة · مفتاحُ Escape.
       ⚠️ **المستمعُ على `<button>` نفسِه لا مفوَّضاً على الحاوية** — التفويضُ كان
       يعملُ لكنّه يجعلُ إصابةَ الزرِّ تابعةً لِما يعلوه في اختبارِ النقر. */
    elClose.addEventListener('click', close);
    box.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) close();   // الخلفيةُ `.lockback` وحدَها
    });
    elGo.addEventListener('click', submit);
    elInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
    });
    elInput.addEventListener('input', function () { say('', ''); });

    // Esc للإغلاق + حبسُ التركيزِ داخلَ النافذة
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      /* `:not([hidden])` لازمٌ — زرُّ الواتساب يُخفى حينَ يظهرُ الرمز،
         ولولاه لوقفَ التركيزُ على عنصرٍ غيرِ مرئيّ. */
      var f = box.querySelectorAll('.lockclose, .lockinput, .lockgo,' +
                                   ' .lockbuy-wa:not([hidden]), .lockbuy-site');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    return box;
  }

  /* ═══ وجهةُ الواتساب تتبعُ الجهاز ═══
     `wa.me` يحاولُ فتحَ **تطبيقِ** واتساب، فيقفُ على الكمبيوترِ والسبورةِ الذكيةِ إن
     لم يكن مثبَّتاً — والمنصّةُ تُستعمَلُ على الشاشاتِ الكبيرةِ لا الهاتفِ وحدَه.
     فالشاشةُ الكبيرةُ تُوجَّهُ إلى **واتساب ويب** مباشرةً، والهاتفُ إلى `wa.me`.

     ⚠️ **القياسُ بالعرضِ لا بنوعِ الإدخال** — للسببِ الموثَّقِ في `pay.html`:
     السبورةُ الذكيةُ شاشةُ لمسٍ فتُبلِغُ `pointer: coarse`، فيُصنَّفُ أهمُّ أجهزةِ
     المنصّةِ هاتفاً. و**أصغرُ القيمتَين** `innerWidth` و`screen.width` لأنّ وضعَ
     «موقع سطح المكتب» في متصفّحِ الهاتفِ يفرضُ منفذاً ≈٩٨٠px فيخدعُ الأولى. */
  function isWide() {
    var a = window.innerWidth || 9999;
    var b = (window.screen && window.screen.width) || 9999;
    return Math.min(a, b) >= 700;
  }

  function waBase() {
    return isWide()
      ? 'https://web.whatsapp.com/send?phone=' + WA_NUMBER + '&text='
      : 'https://wa.me/' + WA_NUMBER + '?text=';
  }

  /* رسالةُ الواتساب المكتوبةُ سلفاً — صياغتُها مطابقةٌ لِما يتوقّعُه مسارُ الواتساب:
     اسمُ المادةِ ثمّ الصفُّ في سطرٍ واحدٍ بلا زخرفة. */
  /* ═══ طريقُ الواتساب: رمزٌ على الشاشةِ العريضةِ وزرٌّ على الهاتف ═══
     على السبورةِ كان الزرُّ يفتحُ **واتساب ويب** — وهو يتطلّبُ جلسةً مسجَّلةً على
     جهازِ المدرسةِ ويعرضُ محادثاتِ المعلّمةِ أمامَ الصفّ. فالرمزُ ينقلُ الطلبَ إلى
     هاتفِها هي. وعلى الهاتفِ يبقى الزرُّ: الهاتفُ لا يمسحُ شاشتَه.
     ⚠️ الرمزُ يحملُ `wa.me` دائماً لا `web.whatsapp.com` — قارئُه هاتفٌ بحكمِ
     التعريف، فالوجهةُ تطبيقُ الواتساب. */
  function setWaHref(label) {
    if (!elBuyWa) return;
    var t = encodeURIComponent('السلام عليكم، أريد شراء: ' + label);

    if (isWide() && elWaCv && typeof QRCode !== 'undefined') {
      QRCode.toCanvas(elWaCv, 'https://wa.me/' + WA_NUMBER + '?text=' + t,
        { width: 180, margin: 1, color: { dark: '#000000', light: '#ffffff' } },
        function (err) {
          if (err) { waAsButton(t); return; }   // إخفاقُ الرسمِ يُرجِعُ الزرّ
          elWaQr.removeAttribute('hidden');
          elBuyWa.setAttribute('hidden', '');
          elBuyRow.classList.add('has-qr');   // زرُّ الموقعِ يصيرُ بطاقةً بحجمِ الرمز
        });
      return;
    }
    waAsButton(t);
  }

  function waAsButton(t) {
    if (elBuyRow) elBuyRow.classList.remove('has-qr');
    if (elWaQr) elWaQr.setAttribute('hidden', '');
    elBuyWa.removeAttribute('hidden');
    elBuyWa.href = waBase() + t;
  }

  function say(text, kind) {
    elMsg.textContent = text || '';
    elMsg.className = 'lockmsg' + (kind ? ' ' + kind : '');
  }

  var pending = null;   // {bookKey}

  /* النافذةُ على مستوى **الكتاب**: لا وسيطَ وحدةٍ ولا عنوانَ وحدة. */
  function ask(bookKey) {
    build();
    pending = { bookKey: bookKey };

    // لونُ الكتابِ حيث يصحّ: شريطٌ علويٌّ بصنفِ بطاقةِ الكتابِ الحالي
    elBand.className = 'lockband' + (window.currentBookColor ? ' ' + window.currentBookColor : '');
    elTitle.textContent = bookTitle(bookKey);
    elSub.textContent = 'أدخلي رمز الفتح لتظهر وحدات هذا الكتاب كاملةً.';
    elInput.value = '';
    say('', '');
    elGo.disabled = false;

    /* ═══ طريقا الشراء ═══
       زرُّ الموقعِ يحملُ مفتاحَ الكتابِ الحاليَّ، وصفحةُ الدفعِ هي التي تردُّ الجزءَ
       إلى حزمتِه (‏`saleIdOf` هناك) — فلا تُكرَّرُ معرفةُ الحزمِ في طرفَين.

       وزرُّ الواتساب يفتحُ المحادثةَ **ورسالتُها مكتوبةٌ سلفاً باسمِ الكتاب**، لأنّ
       مسارَ الواتساب يستخرجُ الكتابَ من نصِّ الرسالة: فلو كتبتْه المعلّمةُ بنفسِها
       بصياغةٍ أخرى ردَّ عليها «لم نعرف أيّ كتاب تريدين». والاسمُ المكتوبُ هو اسمُ
       **الحزمةِ** إن كان الكتابُ جزءاً منها، فلا تطلبُ جزءاً لا يُباعُ وحدَه. */
    elBuySt.href = 'pay.html?book=' + encodeURIComponent(bookKey);
    setWaHref(bookTitle(bookKey));          // اسمٌ مبدئيٌّ يعملُ قبلَ وصولِ الحزم
    loadBundles().then(function (bundles) {
      if (!pending || pending.bookKey !== bookKey) return;   // أُغلقت أو تبدّلت
      var id = bundleOfBook(bookKey, bundles);
      if (id) setWaHref(scopeTitle(id, bundles));
    });

    lastFocus = document.activeElement;
    box.removeAttribute('hidden');
    document.body.classList.add('lock-open');
    // التركيزُ بعدَ الرسمِ كي لا تُلغيه حركةُ الظهور
    requestAnimationFrame(function () { elInput.focus(); });
  }

  function close() {
    if (!box || box.hasAttribute('hidden')) return;
    box.setAttribute('hidden', '');
    document.body.classList.remove('lock-open');
    pending = null;
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    lastFocus = null;
  }

  function submit() {
    if (elGo.disabled) return;
    elGo.disabled = true;
    say('جارٍ التحقّق…', '');

    var p = pending;   // نلتقطُه الآن: `close()` يصفّرُه، والوعدُ يُحَلُّ لاحقاً
    redeem(elInput.value).then(function (res) {
      if (res.ok) {
        /* الرمزُ صحيحٌ ومحفوظ — لكن هل هو لهذا الكتاب؟ إن لم يكنْ فلا نقولُ
           «تمّ الفتح» ثمّ ندعُها أمامَ كتابٍ مقفل. */
        if (p && !scopeCovers(res, p.bookKey)) {
          elGo.disabled = false;
          say(mismatchMsg(res, p), 'bad');
          elInput.focus(); elInput.select();
          return;
        }
        say(MSG.ok, 'good');
        // صوتُ فتحِ قفلٍ حقيقيّ (audio/sfx/ui-unlock.mp3) — خاضعٌ لزرِّ الكتمِ العامّ
        if (window.SHOOGP_SFX) { try { SHOOGP_SFX.play('unlock'); } catch (e) {} }
        setTimeout(function () { close(); reveal(p); }, 700);
        return;
      }
      elGo.disabled = false;
      say(MSG[res.reason] || MSG.bad, 'bad');
      elInput.focus();
      elInput.select();
    });
  }

  /* ═══ إعادةُ رسمِ الكتابِ كلِّه بدلَ `location.reload()` ═══
     إعادةُ التحميلِ كانت تُرجِعُ المعلّمةَ إلى الشاشةِ الرئيسيةِ فتفقدُ موضعَها
     وتظنُّ أنّ شيئاً لم يحدث. بدلَها نعيدُ بناءَ الكتابِ نفسِه — فتُقرأُ الأقفالُ
     من `localStorage` من جديدٍ فيسقطُ الإطارُ وقفلُه وتظهرُ الوحداتُ كلُّها.
     ولا استهدافَ لوحدةٍ بعينِها: الرمزُ يفتحُ الكتابَ كاملاً. */
  function reveal(p) {
    if (!p || typeof window.openBook !== 'function') return;
    window.openBook(p.bookKey);                       // يعيدُ الرسمَ ويبقى على شاشةِ الدروس
  }

  /* ═══ تنبيهُ «القفلُ هناك» — بديلُ النافذةِ عندَ نقرِ درسٍ مقفل ═══
     لا صوتَ ولا رسالة: اهتزازٌ أفقيٌّ خفيفٌ للإطارِ (400ms) مع إبرازِ القفل.
     واحترامُ `prefers-reduced-motion` في **CSS** لا هنا — الصنفانِ يُوضَعانِ
     دائماً، والوسائطُ تُلغي الاهتزازَ وتُبقي الإبراز. */
  var NUDGE_MS = 400, nudgeTimer = null;

  function nudge() {
    var frame = document.querySelector('.paylock-frame');
    if (!frame) return;
    var btn = frame.querySelector('.paylock-btn');
    // إعادةُ التشغيلِ من الصفرِ لو نُقِرَ درسٌ آخرُ أثناءَ الحركة
    clearTimeout(nudgeTimer);
    frame.classList.remove('paylock-nudge');
    if (btn) btn.classList.remove('paylock-pop');
    void frame.offsetWidth;                            // إجبارُ إعادةِ التدفّقِ ليُعادَ تشغيلُ الحركة
    frame.classList.add('paylock-nudge');
    if (btn) btn.classList.add('paylock-pop');
    nudgeTimer = setTimeout(function () {
      frame.classList.remove('paylock-nudge');
      if (btn) btn.classList.remove('paylock-pop');
    }, NUDGE_MS);
  }

  /* ═══════════════ زرُّ تبديلِ القفل (أعلى الصفحة) ═══════════════
     زرٌّ واحدٌ ظاهرٌ في كلِّ الأجهزةِ والمنافذ، على الشاشةِ الرئيسيةِ وشاشةِ الكتاب.
     نصُّه ولونُه يقولانِ الحالةَ الجاريةَ بلا نقر: **رمليٌّ = القفلُ مفعَّل**،
     **أحمرُ = القفلُ معطَّل**. ويُخفى في شاشةِ الأسئلةِ وحدَها (‏`css/unlock.css`)
     كي لا يعلوَ حاويةَ السؤالِ المحسوبةَ الارتفاع.

     ⚠️ **في تدفّقِ `.app` لا `position:fixed`** — جُرِّبَ الثابتُ أولاً فركبَ شعارَ
     شوجبِ في الشاشةِ الرئيسية (‏**تراكبٌ مقيسٌ 20px**: الشعارُ يبدأُ عندَ 26px
     والزرُّ ينتهي عندَ 46، ولا هامشَ شفّافاً في `logo-mark.png` يخفيه — مقيسٌ:
     أوّلُ صفٍّ معتمٍ = 0). العنصرُ في التدفّقِ **يحجزُ مساحتَه** فيستحيلُ التراكب. */

  var devWrap = null, devBtn = null;

  /* الزومُ المضادّ — نفسُ حيلةِ عمودِ الصاروخِ في `js/fit.js`.
     بدونَه يُرسَمُ الزرُّ بالزومِ العامّ: على منفذِ الهاتفِ (‏375px) الزومُ ≈0.37
     فيصيرُ ارتفاعُ 46px نحوَ **17px** — نصٌّ لا يُقرَأُ وهدفٌ لا يُلمَس.
     ولأنّه في التدفّقِ فالزومُ المضادُّ **يحجزُ المساحةَ الحقيقيةَ أيضاً**
     (‏46÷0.37 ≈ 123 وحدةً تصميميةً تُرسَمُ 46px حقيقية) — فلا تراكبَ في أيِّ منفذ. */
  function fitBtn() {
    if (!devBtn) return;
    var z = (window.ShoogpFit && window.ShoogpFit.zoom) || 1;
    devBtn.style.zoom = String(1 / z);
  }

  function paintBtn() {
    if (!devBtn) return;
    devBtn.classList.toggle('off', lockOff);
    devBtn.textContent = lockOff ? '🔓 القفل معطّل' : '🔒 القفل مفعّل';
    devBtn.title = lockOff
      ? 'كلُّ الوحدات مفتوحة بلا رمز — اضغطي لإعادة تفعيل القفل'
      : 'القفل يعمل — اضغطي لتعطيله وفتح كلّ الوحدات';
  }

  /* إعادةُ رسمِ قائمةِ الوحداتِ في مكانِها — لا `location.reload()`.
     ‏`openBook` يُعيدُ قراءةَ حالةِ القفلِ لكلِّ وحدةٍ فتظهرُ الأقفالُ أو تختفي فوراً. */
  function redrawUnits() {
    var scr = document.getElementById('lessonsScreen');
    if (!scr || !scr.classList.contains('active')) return;
    if (window.currentBook && typeof window.openBook === 'function') window.openBook(window.currentBook);
  }

  function setLockOff(v) {
    lockOff = !!v;
    // الكتابةُ تمسُّ `OFF_KEY` وحدَه — خريطةُ المنَحِ (`STORE_KEY`) لا تُقرَأُ ولا تُكتَب
    try {
      if (lockOff) localStorage.setItem(OFF_KEY, '1');
      else localStorage.removeItem(OFF_KEY);
    } catch (e) {}
    if (lockOff) close();          // نافذةُ الرمزِ المفتوحةُ لا معنى لها والقفلُ معطَّل
    paintBtn();
    redrawUnits();
  }

  function buildBtn() {
    if (!devMode) return;      // الحجبُ عندَ البناءِ لا بالإخفاءِ: لا عنصرَ في الصفحةِ أصلاً
    if (devWrap) return;
    var app = document.querySelector('.app');
    if (!app) return;
    devWrap = document.createElement('div');
    devWrap.className = 'lockdev';
    devBtn = document.createElement('button');
    devBtn.type = 'button';
    devBtn.className = 'lockdev-btn';
    devWrap.appendChild(devBtn);
    app.insertBefore(devWrap, app.firstChild);   // أوّلُ عنصرٍ في `.app` — فوقَ الترويسة
    devBtn.addEventListener('click', function () { setLockOff(!lockOff); });
    paintBtn();
    fitBtn();
  }

  window.addEventListener('shoogp-fit', fitBtn);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildBtn);
  else buildBtn();

  /* ───────────────────────────── الواجهة ───────────────────────────── */
  window.ShoogpLock = {
    isUnitLocked: isUnitLocked,
    freeUnits:    freeUnits,
    guardLesson:  guardLesson,
    ask:          ask,
    nudge:        nudge,
    close:        close,
    normalize:    normalize,
    isLockOff:    isLockOff,
    setLockOff:   setLockOff,
    FREE_UNITS:   FREE_UNITS
  };
})();
