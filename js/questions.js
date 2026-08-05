/* ═══════════════════════════════════════════════════════════════
   أسئلة الدروس التفاعلية — مرجعها ملف "نماذج-الأسئلة.md"
   المفتاح: معرّف الدرس (file) → مصفوفة أسئلة.
   كل سؤال: { type, objective, level, ...حقول النوع }
   الأنواع: drag-drop | matching | mcq | true-false | hotspot
   المستوى (level): knowledge (معرفة) | application (تطبيق) | reasoning (استدلال)
          وفي اللغة العربية «أحب لغتي» وحدَها مستوىً رابع: evaluation (تقويم) —
          ممنوعٌ في العلوم والرياضيات.
   قاعدة: ٤–٦ أسئلة لكل درس على نوعين مختلفين على الأقل، متدرّجة الصعوبة،
          وكل سؤال مبني على هدف من وثيقة الأهداف ومستمدّ من الكتاب.
          التوزيع المعرفي الأساسي: العلوم ٣ معرفة + ١ تطبيق + ١ استدلال،
          الرياضيات ٢ + ٢ + ١، واللغة العربية 1 knowledge + 1 reasoning +
          2 application + 1 evaluation (المرجع الملزم CLAUDE.md).
   ═══════════════════════════════════════════════════════════════ */

/* رسم أصليّ لشعار سلطنة عُمان (خنجر وسيفان ونِطاق) — يخدم سؤالَي الدرس g4a1-1-2
   (تحديد الأجزاء + السحب والإفلات) فيُعرَّف مرّة ويُستعمل مرّتين.
   مبنيّ على الورقة البصرية المعتمدة في CLAUDE.md: حدّ #111111 (٣ خارجيّ / ٢ داخليّ)
   مستدير الرؤوس، تدرّج ٣–٤ درجات بحوافّ حادّة لا مزج ناعم، لمعة بيضاء عريضة،
   أجسام طافية بلا خطّ أرض ولا ظلّ مُلقًى، وبلا أيّ ملامح وجه.
   السلالم: معدنيّ رماديّ (النِّصال) · كهرمانيّ (المقابض والغِمد والنِّطاق) ·
   أبيض الصاروخ (قبضة الخنجر). نسبة viewBox = 600÷430 ≈ 1.40 (دون سقف ٢٫٢). */
const SHOOGP_SVG_EMBLEM = `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="شعار: خنجر عُمانيّ في الوسط وخلفه سيفان متقاطعان يربطهما نِطاق">
  <g stroke="#111111" stroke-linecap="round" stroke-linejoin="round">

    <!-- السَّيفان المتقاطعان (خلف) — نِصالٌ طويلةٌ تَبرُزُ أسفلَ النِّطاقِ فيَبينُ السَّيفانِ -->
    <g transform="translate(180 34) rotate(-38)">
      <path d="M-18 80 L18 80 L10 348 L0 372 L-10 348 Z" fill="#C0C0C0" stroke-width="3"/>
      <path d="M0 80 L10 348 L0 372 Z" fill="#808080" stroke-width="2"/>
      <path d="M-12 90 L-6 90 L-4 334 L-9 334 Z" fill="#FFFFFF" stroke="none"/>
      <rect x="-42" y="58" width="84" height="22" rx="11" fill="#FFA000" stroke-width="3"/>
      <rect x="-13" y="12" width="26" height="46" rx="8" fill="#E08000" stroke-width="3"/>
      <rect x="-22" y="-10" width="44" height="26" rx="12" fill="#FFA000" stroke-width="3"/>
    </g>
    <g transform="translate(420 34) rotate(38)">
      <path d="M-18 80 L18 80 L10 348 L0 372 L-10 348 Z" fill="#C0C0C0" stroke-width="3"/>
      <path d="M0 80 L10 348 L0 372 Z" fill="#808080" stroke-width="2"/>
      <path d="M-12 90 L-6 90 L-4 334 L-9 334 Z" fill="#FFFFFF" stroke="none"/>
      <rect x="-42" y="58" width="84" height="22" rx="11" fill="#FFA000" stroke-width="3"/>
      <rect x="-13" y="12" width="26" height="46" rx="8" fill="#E08000" stroke-width="3"/>
      <rect x="-22" y="-10" width="44" height="26" rx="12" fill="#FFA000" stroke-width="3"/>
    </g>

    <!-- النِّطاق (الحزام) — سَيرانِ جِلدِيّانِ مائِلانِ قَليلاً يَشُدّانِ السَّيفَينِ إلى الخِنجَرِ -->
    <g transform="translate(178 271) rotate(-6)">
      <rect x="-84" y="-23" width="168" height="46" rx="16" fill="#C06000" stroke-width="3"/>
      <rect x="-74" y="-15" width="150" height="12" rx="6" fill="#FFA000" stroke="none"/>
      <rect x="-48" y="3"  width="18"  height="13" rx="5" fill="#984800" stroke-width="2"/>
      <rect x="8"   y="3"  width="18"  height="13" rx="5" fill="#984800" stroke-width="2"/>
    </g>
    <g transform="translate(422 271) rotate(6)">
      <rect x="-84" y="-23" width="168" height="46" rx="16" fill="#C06000" stroke-width="3"/>
      <rect x="-76" y="-15" width="150" height="12" rx="6" fill="#FFA000" stroke="none"/>
      <rect x="-26" y="3"  width="18"  height="13" rx="5" fill="#984800" stroke-width="2"/>
      <rect x="30"  y="3"  width="18"  height="13" rx="5" fill="#984800" stroke-width="2"/>
    </g>

    <!-- الخِنْجَر (أمام) -->
    <rect x="252" y="36" width="96" height="44" rx="14" fill="#F9F8F3" stroke-width="3"/>
    <rect x="262" y="46" width="30" height="14" rx="7" fill="#FFFFFF" stroke="none"/>
    <path d="M272 80 H328 L322 144 H278 Z" fill="#FFFFFF" stroke-width="3"/>
    <path d="M280 88 H290 L287 138 H278 Z" fill="#F7F6F1" stroke="none"/>
    <rect x="254" y="144" width="92" height="24" rx="7" fill="#FFA000" stroke-width="3"/>
    <rect x="262" y="168" width="76" height="78" fill="#E08000" stroke-width="3"/>
    <rect x="270" y="178" width="14" height="58" rx="7" fill="#FFFFFF" stroke="none"/>
    <path d="M290 186 h22 v14 h-22 z M290 214 h22 v14 h-22 z" fill="#C06000" stroke-width="2"/>
    <path d="M262 246 H338 V286
             C338 330 314 358 268 366
             C240 372 216 364 202 346
             C230 344 248 331 256 311
             C261 297 262 274 262 246 Z" fill="#C06000" stroke-width="3"/>
    <path d="M270 254 h14 c0 34 -6 60 -18 78 c-6 8 -14 14 -24 16 c14 -14 24 -30 28 -48 c3 -14 4 -28 0 -46 z" fill="#FFA000" stroke="none"/>
    <path d="M300 258 h20 v12 h-20 z" fill="#984800" stroke-width="2"/>

  </g>
</svg>`;

window.QUESTIONS = {

  // الرياضيات/الثاني — النشاط الأساسي ١-١: صناعة لوحة المائة (كتاب التلميذ ص٤–٥، الوحدة ١أ)
  // الأهداف: 2Nn1 (العدّ والقراءة والكتابة حتى ١٠٠ تصاعدياً وتنازلياً) و2Nn9 (عدد بين أضعاف العشرة)
  // التوزيع المعرفي (رياضيات): ٢ معرفة + ٢ تطبيق + ١ استدلال + إثرائي اختياري
  "g2m-1-1": [

    // ① لوحة المائة (missing) — معرفة — 2Nn1
    {
      type: "hundred-chart",
      mode: "missing",
      objective: "2Nn1: يعدّ ويقرأ ويكتب الأعداد حتى ١٠٠ كحد أدنى، تصاعدياً وتنازلياً",
      level: "knowledge",
      prompt: "أكمِلْ لَوحةَ المِائةِ: ضَعْ كُلَّ عَدَدٍ ناقِصٍ في خانَتِهِ الصَّحيحةِ.",
      from: 1, to: 100, columns: 10,
      missing: [7, 23, 56, 80, 99]
    },

    // ② صواب وخطأ — معرفة — 2Nn1
    {
      type: "true-false",
      objective: "2Nn1: يعدّ ويقرأ ويكتب الأعداد حتى ١٠٠ كحد أدنى، تصاعدياً وتنازلياً",
      level: "knowledge",
      statement: "العَدَدُ الَّذي يَأتي بَعدَ ٦٩ مُباشَرةً هو ٧٠.",
      answer: true
    },

    // ③ اختيار من متعدد — تطبيق — 2Nn9
    {
      type: "mcq",
      objective: "2Nn9: يذكر عدداً بين أي عددين متجاورين من أضعاف العشرة، مثال: عدد بين ٤٠ و٥٠",
      level: "application",
      prompt: "أيُّ عَدَدٍ يَقَعُ بَينَ ٤٠ و٥٠؟",
      options: ["٣٩", "٤٦", "٥٤", "٦٠"],
      answer: 1
    },

    // ④ سحب وإفلات — تطبيق — 2Nn1 (صفّ ٣١–٤٠ بثلاث خانات ناقصة)
    // الصفّ يُقرأ من اليمين إلى اليسار كصفوف لوحة المائة في السؤال ①، فيتّسق المشهدان.
    // الخانات الناقصة مرسومة بحدٍّ متقطّع وأرضيّة غائرة كخانات اللوحة الناقصة تماماً.
    // نسبة الرسم ٢٫١٩٥ التزاماً بقاعدة الرسوم الأفقية الطويلة (shoogp-ui §١.١٠): عرض الخانة
    // محكومٌ بعشرة أعمدة فلا يزيد، فنمت الخانة ارتفاعاً (٩٠ ⇒ ١٣٠) وتوسّطت الصفَّ في الارتفاع.
    {
      type: "drag-drop",
      objective: "2Nn1: يعدّ ويقرأ ويكتب الأعداد حتى ١٠٠ كحد أدنى، تصاعدياً وتنازلياً",
      level: "application",
      prompt: "اسحَبْ كُلَّ عَدَدٍ إلى خانَتِهِ الفارِغةِ في صَفِّ لَوحةِ المِائةِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="صف من لوحة المائة من ٣١ إلى ٤٠ فيه ثلاث خانات ناقصة">
        <rect x="789" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="828" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٣١</text>
        <rect x="705" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="744" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٣٢</text>
        <rect x="621" y="140" width="78" height="130" rx="16" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>
        <rect x="537" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="576" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٣٤</text>
        <rect x="453" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="492" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٣٥</text>
        <rect x="369" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="408" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٣٦</text>
        <rect x="285" y="140" width="78" height="130" rx="16" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>
        <rect x="201" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="240" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٣٨</text>
        <rect x="117" y="140" width="78" height="130" rx="16" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>
        <rect x="33" y="140" width="78" height="130" rx="16" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
        <text x="72" y="222" font-size="50" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">٤٠</text>
      </svg>`,
      targets: [
        { answer: "٣٣", box:{x:74, y:10}, dot:{x:73.3, y:50.0} },
        { answer: "٣٧", box:{x:45, y:10}, dot:{x:36.0, y:50.0} },
        { answer: "٣٩", box:{x:16, y:10}, dot:{x:17.3, y:50.0} }
      ]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Nn1 (العدّ التنازلي عبر عقد العشرة)
    {
      type: "sequence",
      objective: "2Nn1: يعدّ ويقرأ ويكتب الأعداد حتى ١٠٠ كحد أدنى، تصاعدياً وتنازلياً",
      level: "reasoning",
      prompt: "رَتِّبِ البِطاقاتِ تَنازُلِيّاً مِنَ الأكبَرِ إلى الأصغَرِ.",
      steps: ["٥١", "٥٠", "٤٩", "٤٨"]
    },

    // ⑥ البازل (إثرائي اختياري) — استدلال — 2Nn9
    // الصورة رسم SVG مضمّن (data URI) مصمّم على قاعدة «صورة القطع ممتلئة المعالم»
    // (DESIGN_RULES.md §أسئلة البازل): معالم مميّزة في كل خلية من خلايا ٣×٣ —
    // إطار يمرّ بقطع الحواف، رموز مختلفة في الأركان الأربعة (هلال/نجمة/كوكب/صاروخ)،
    // خط أعداد ٧٠–٨٠ يعبر الصف العلوي كاملاً (استمرارية تعين على التركيب)، والعدد
    // ٧٥ الكبير وتمثيله بالعشرات والآحاد يملآن الوسط والأسفل — فلا قطعة خالية.
    {
      type: "puzzle",
      objective: "2Nn9: يذكر عدداً بين أي عددين متجاورين من أضعاف العشرة، مثال: عدد بين ٤٠ و٥٠",
      level: "reasoning",
      prompt: "لُغزٌ: أنا عَدَدٌ بَينَ ٧٠ و٨٠، وفي آحادي ٥. رَكِّبِ القِطَعَ لِتَكشِفَ مَنْ أنا.",
      bg: "#fdf9ee",
      grid: { cols: 3, rows: 3 },
      image: "data:image/svg+xml," + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
          <defs>
            <g id="rod">
              <rect x="0" y="0" width="44" height="150" rx="8" fill="#ffffff" stroke="#2f6fb0" stroke-width="4"/>
              <line x1="0" y1="15" x2="44" y2="15" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="30" x2="44" y2="30" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="45" x2="44" y2="45" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="60" x2="44" y2="60" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="75" x2="44" y2="75" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="90" x2="44" y2="90" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="105" x2="44" y2="105" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="120" x2="44" y2="120" stroke="#2f6fb0" stroke-width="2"/>
              <line x1="0" y1="135" x2="44" y2="135" stroke="#2f6fb0" stroke-width="2"/>
            </g>
            <pattern id="pzdots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="2.2" fill="#f2ead9"/>
            </pattern>
          </defs>
          <rect width="900" height="600" fill="#fdf9ee"/>
          <rect width="900" height="600" fill="url(#pzdots)"/>
          <rect x="14" y="14" width="872" height="572" rx="26" fill="none" stroke="#2f6fb0" stroke-width="12"/>
          <circle cx="64" cy="64" r="26" fill="#f2c14e"/>
          <circle cx="76" cy="54" r="22" fill="#fdf9ee"/>
          <path d="M836,36 L843.6,54 L862,54 L847,66 L852,84 L836,73 L820,84 L825,66 L810,54 L828.4,54 Z" fill="#f2c14e" stroke="#c8791f" stroke-width="3"/>
          <circle cx="64" cy="536" r="24" fill="#7fb3e0" stroke="#2f6fb0" stroke-width="4"/>
          <ellipse cx="64" cy="536" rx="40" ry="12" fill="none" stroke="#d97a2b" stroke-width="4"/>
          <g stroke="#8a4a1f" stroke-width="3" fill="#e8875a">
            <rect x="822" y="500" width="30" height="58" rx="14"/>
            <path d="M837,486 L851,506 L823,506 Z"/>
            <path d="M822,544 L808,566 L822,558 Z"/>
            <path d="M852,544 L866,566 L852,558 Z"/>
          </g>
          <circle cx="837" cy="524" r="7" fill="#dceefb" stroke="#8a4a1f" stroke-width="3"/>
          <line x1="80" y1="105" x2="820" y2="105" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
          <line x1="810" y1="92" x2="810" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="810" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٠</text>
          <line x1="738" y1="92" x2="738" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="738" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧١</text>
          <line x1="666" y1="92" x2="666" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="666" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٢</text>
          <line x1="594" y1="92" x2="594" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="594" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٣</text>
          <line x1="522" y1="92" x2="522" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="522" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٤</text>
          <circle cx="450" cy="105" r="26" fill="#ffd79a" stroke="#d97a2b" stroke-width="4"/>
          <line x1="450" y1="92" x2="450" y2="118" stroke="#33415e" stroke-width="5"/>
          <text x="450" y="158" font-size="34" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Cairo, Tajawal, sans-serif">٧٥</text>
          <line x1="378" y1="92" x2="378" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="378" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٦</text>
          <line x1="306" y1="92" x2="306" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="306" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٧</text>
          <line x1="234" y1="92" x2="234" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="234" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٨</text>
          <line x1="162" y1="92" x2="162" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="162" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٧٩</text>
          <line x1="90" y1="92" x2="90" y2="118" stroke="#33415e" stroke-width="4"/>
          <text x="90" y="158" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Cairo, Tajawal, sans-serif">٨٠</text>
          <text x="450" y="318" font-size="185" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Cairo, Tajawal, Segoe UI, sans-serif">٧٥</text>
          <text x="450" y="378" font-size="36" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, Segoe UI, sans-serif">أنا بَينَ ٧٠ و٨٠</text>
          <text x="745" y="330" font-size="44" font-weight="800" text-anchor="middle" fill="#2f6fb0" font-family="Cairo, Tajawal, Segoe UI, sans-serif">٧ عشرات</text>
          <line x1="745" y1="348" x2="745" y2="392" stroke="#2f6fb0" stroke-width="5" stroke-linecap="round"/>
          <path d="M733,390 L757,390 L745,408 Z" fill="#2f6fb0"/>
          <text x="160" y="330" font-size="44" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Cairo, Tajawal, Segoe UI, sans-serif">٥ آحاد</text>
          <line x1="160" y1="348" x2="160" y2="392" stroke="#d97a2b" stroke-width="5" stroke-linecap="round"/>
          <path d="M148,390 L172,390 L160,408 Z" fill="#d97a2b"/>
          <rect x="70" y="418" width="220" height="164" rx="14" fill="none" stroke="#d97a2b" stroke-width="3" stroke-dasharray="10 8"/>
          <use href="#rod" x="380" y="420"/>
          <use href="#rod" x="438" y="420"/>
          <use href="#rod" x="496" y="420"/>
          <use href="#rod" x="554" y="420"/>
          <use href="#rod" x="612" y="420"/>
          <use href="#rod" x="670" y="420"/>
          <use href="#rod" x="728" y="420"/>
          <rect x="95" y="435" width="44" height="44" rx="8" fill="#ffffff" stroke="#d97a2b" stroke-width="5"/>
          <rect x="215" y="435" width="44" height="44" rx="8" fill="#ffffff" stroke="#d97a2b" stroke-width="5"/>
          <rect x="155" y="495" width="44" height="44" rx="8" fill="#ffffff" stroke="#d97a2b" stroke-width="5"/>
          <rect x="95" y="555" width="44" height="44" rx="8" fill="#ffffff" stroke="#d97a2b" stroke-width="5"/>
          <rect x="215" y="555" width="44" height="44" rx="8" fill="#ffffff" stroke="#d97a2b" stroke-width="5"/>
        </svg>`)
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٢-١: العدّ بالاثنينات والخمسات والعشرات (كتاب التلميذ ص٦–٧، الوحدة ١أ)
  "g2m-2-1": [

    // ① العدّ بالنقر (قفز بالخمسات) — معرفة — 2Nn4
    {
      type: "count-tap",
      mode: "step",
      objective: "2Nn4: يعدّ بزيادة اثنينات وخمسات وعشرات، واستخدام التجميع بالقفز لعدّ المجموعات الكبيرة من الأشياء",
      level: "knowledge",
      prompt: "عُدَّ الصَّدَفاتِ بِالقَفزِ خَمْساتٍ: انقُرْ كُلَّ مَجموعةٍ بِالتَّرتيبِ حَتّى تَصِلَ إلى ٣٠.",
      glyph: "🐚", step: 5, groups: 6, target: 30
    },

    // ② اختيار من متعدد — معرفة — 2Nn2
    {
      type: "mcq",
      objective: "2Nn2: يعدّ حتى ١٠٠ عنصر، مثال: عدّ الخرز على الشريط",
      level: "knowledge",
      prompt: "عَدَّ سَعيدٌ أقراصَ العَدِّ بِالعَشَراتِ فَقالَ: ١٠، ٢٠، ٣٠، ٤٠، ٥٠. كَمْ قُرْصاً عَدَّ؟",
      options: ["٥٠", "٥", "١٥", "٥٥"],
      answer: 0
    },

    // ③ لوحة المائة (more-less) — تطبيق — 2Nn7
    {
      type: "hundred-chart",
      mode: "more-less",
      objective: "2Nn7: يجد العدد أكثر/أقل بمقدار ١ أو ١٠ من أي عدد مكوّن من رقمين",
      level: "application",
      prompt: "اسْتَعِنْ بِلَوحةِ المِائةِ: انقُرْ خانةَ العَدَدِ المَطلوبِ في كُلِّ مَطلَبٍ.",
      from: 1, to: 100, columns: 10,
      asks: [
        { base: 34, delta: 10 },
        { base: 57, delta: -10 },
        { base: 69, delta: 1 }
      ]
    },

    // ④ إكمال النمط (قفز بالاثنينات) — تطبيق — 2Nn4
    {
      type: "pattern",
      objective: "2Nn4: يعدّ بزيادة اثنينات وخمسات وعشرات، واستخدام التجميع بالقفز لعدّ المجموعات الكبيرة من الأشياء",
      level: "application",
      prompt: "أكمِلِ النَّمَطَ: العَدُّ بِالاثنيناتِ.",
      items: ["٢", "٤", "__", "٨", "__", "١٢"],
      answers: ["٦", "١٠"],
      distractors: ["٥", "٩"],
      rule: "نَزيدُ ٢ كُلَّ مَرّةٍ"
    },

    // ⑤ التصنيف — استدلال — 2Nn9 (ملصقات الأكياس في كتاب التلميذ ص٧)
    {
      type: "classify",
      objective: "2Nn9: يذكر عدداً بين أي عددين متجاورين من أضعاف العشرة، مثال: عدد بين ٤٠ و٥٠",
      level: "reasoning",
      prompt: "على كُلِّ كيسٍ مُلصَقٌ يَذكُرُ مَدى عَدَدِهِ. صَنِّفِ الأعدادَ في كيسِها الصَّحيحِ.",
      groups: [
        { name: "ما بَينَ ٦٠ و٧٠", items: ["٦٣", "٦٧", "٦٩"] },
        { name: "ما بَينَ ٧٠ و٨٠", items: ["٧٢", "٧٥", "٧٨"] }
      ]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nn14
    {
      type: "exclude",
      objective: "2Nn14: يفهم الأعداد الفردية والزوجية ويميزها حتى العدد ٢٠ على الأقل",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ الأعدادِ زَوجيّةٌ وواحِدٌ دَخيلٌ — اضغَطْ على الدَّخيلِ.",
      options: ["٤", "١٢", "٧", "٢٠"],
      answer: 2,
      reason: "٧ عَدَدٌ فَرديٌّ لا يُقسَمُ إلى نِصفَينِ مُتساوِيَينِ، وباقي الأعدادِ زَوجيّةٌ."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٣-١: الأزواج العددية للعدد ١٠٠ (كتاب التلميذ ص٨، الوحدة ١أ)
  "g2m-3-1": [

    // ① بناء المعادلة (fill) — معرفة — 2Nc3
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "knowledge",
      prompt: "أكمِلِ الزَّوجَ العَدَديَّ لِلمِائةِ: اسحَبِ البِطاقةَ المُناسِبةَ إلى الخانةِ الفارِغةِ.",
      tokens: ["٤٠", "+", "__", "=", "١٠٠"],
      bank: ["٥٠", "٦٠", "٧٠", "٣٠"],
      answers: ["٦٠"]
    },

    // ② التوصيل — معرفة — 2Nc1 (يربط زوج العشرة بزوج المائة)
    {
      type: "matching",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      prompt: "صِلْ كُلَّ زَوجٍ عَدَديٍّ لِلعَشَرةِ بِزَوجِهِ لِلمِائةِ.",
      pairs: [
        { a: "٤ + ٦ = ١٠", b: "٤٠ + ٦٠ = ١٠٠" },
        { a: "٣ + ٧ = ١٠", b: "٣٠ + ٧٠ = ١٠٠" },
        { a: "٢ + ٨ = ١٠", b: "٢٠ + ٨٠ = ١٠٠" },
        { a: "١ + ٩ = ١٠", b: "١٠ + ٩٠ = ١٠٠" }
      ]
    },

    // ③ سحب وإفلات — تطبيق — 2Nc3 (ثلاث كِفَف، في كلٍّ كتلة معلومة وخانة ناقصة)
    // كل كِفّة مستقلّة بجوابٍ واحدٍ لا يقبل التبادل، فلا يُظلَم طفلٌ رتّب الكتلتين بترتيبٍ آخر.
    // الشريط العلويّ (y=0..75 من ٤١٠) مُبقًى فارغاً عمداً ليجلس فيه صندوق البطاقة بلا تراكب.
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): كبرت الكتلتان (١٠٤×٩٠ ⇒ ١٠٤×١١٦) وتباعد عمودُ
    // الميزان وقاعدتُه على الارتفاع الجديد؛ عرضُ الكِفّة محكومٌ بثلاث كِفَفٍ فلم يُمَسّ.
    {
      type: "drag-drop",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "application",
      prompt: "مَجموعُ الكُتلَتَينِ في كُلِّ كِفّةٍ ١٠٠ غرام. اسحَبِ الكُتلةَ النّاقِصةَ إلى مَكانِها.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاث كِفَف ميزان، في كل كِفّة كتلة معلومة وخانة ناقصة، ومجموع كل كِفّة مئة غرام">
        ${[{gx:590,given:'٢٠'},{gx:310,given:'٤٠'},{gx:30,given:'٩٠'}].map(g=>`
          <text x="${g.gx+140}" y="104" font-size="40" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">١٠٠ غرام</text>
          <rect x="${g.gx+152}" y="136" width="104" height="116" rx="14" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
          <text x="${g.gx+204}" y="208" font-size="46" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">${g.given}</text>
          <text x="${g.gx+140}" y="208" font-size="42" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">+</text>
          <rect x="${g.gx+24}" y="136" width="104" height="116" rx="14" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>
          <rect x="${g.gx+10}" y="272" width="260" height="18" rx="9" fill="#d9c7a4"/>
          <rect x="${g.gx+129}" y="290" width="22" height="46" fill="#c9b48c"/>
          <rect x="${g.gx+65}" y="336" width="150" height="20" rx="10" fill="#c9b48c"/>`).join('')}
      </svg>`,
      targets: [
        { answer: "٨٠", box: { x: 74, y: 6 }, dot: { x: 74.0, y: 47.3 } },
        { answer: "٦٠", box: { x: 43, y: 6 }, dot: { x: 42.9, y: 47.3 } },
        { answer: "١٠", box: { x: 12, y: 6 }, dot: { x: 11.8, y: 47.3 } }
      ]
    },

    // ④ قراءة أداة القياس (scale-set) — تطبيق — 2Nc3
    // وضع الضبط لا القراءة: الطفل يحسب ١٠٠ − ٣٠ ثمّ يرسم الجواب على الميناء، فيخدم الهدف حقّاً.
    {
      type: "measure-tool",
      mode: "scale-set",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "application",
      prompt: "في الكِفّةِ ٣٠ غراماً. اضبِطْ مُؤشِّرَ الميزانِ على الكُتلةِ الَّتي تُكمِلُها إلى ١٠٠ غرام.",
      min: 0, max: 100, step: 10, labelEvery: 2,
      target: 70, unit: "غرام"
    },

    // ⑤ صواب وخطأ — استدلال — 2Nc14
    {
      type: "true-false",
      objective: "2Nc14: يفهم أن الجمع يمكن أن يكون بأي ترتيب، ولكن هذا غير ممكن في حالة الطرح",
      level: "reasoning",
      statement: "بِما أنَّ ٣٠ + ٧٠ = ١٠٠، فَإنَّ ٧٠ + ٣٠ = ١٠٠ أيضاً.",
      answer: true
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — تطبيق — 2Nc3
    {
      type: "memory",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "application",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتَجِدَ العَدَدَينِ اللَّذَينِ مَجموعُهُما ١٠٠.",
      pairs: [
        { a: "١٠", b: "٩٠" },
        { a: "٢٠", b: "٨٠" },
        { a: "٣٠", b: "٧٠" },
        { a: "٤٠", b: "٦٠" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٣-٢: جمع وطرح الأزواج العددية حتى ١٠٠ (كتاب التلميذ ص٩، الوحدة ١أ)
  "g2m-3-2": [

    // ① بناء المعادلة (fill) — معرفة — 2Nc3 (حقيقة الطرح من عائلة المائة)
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "knowledge",
      prompt: "أكمِلْ حَقيقةَ الطَّرحِ مِنْ عائِلةِ حَقائِقِ المِائةِ.",
      tokens: ["١٠٠", "−", "٤٠", "=", "__"],
      bank: ["٦٠", "٥٠", "٧٠", "٤٠"],
      answers: ["٦٠"]
    },

    // ② اختيار من متعدد — معرفة — 2Nc3
    {
      type: "mcq",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "knowledge",
      prompt: "في مُثَلَّثِ عائِلةِ الحَقائِقِ عَدَدانِ: ١٠٠ و٣٠. ما العَدَدُ الثّالِثُ؟",
      options: ["٧٠", "٦٠", "٨٠", "١٣٠"],
      answer: 0
    },

    // ③ سحب وإفلات — تطبيق — 2Nc3 (ثلاثة مثلثات، رأسٌ ناقصٌ في كلٍّ منها)
    // الشريط العلويّ (y=0..66 من ٤١٠) فارغٌ عمداً ليجلس فيه صندوق البطاقة فوق كل مثلث.
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): كبرت الدوائر (نق ٤٢ ⇒ ٥٢) وارتفع المثلث،
    // وضاقت قاعدتُه (٩٢ ⇒ ٨٢) كي يبقى مجموعُ (نصفِ القاعدة + نصفِ القطر) ١٣٤ فلا تتلامس المثلثات.
    {
      type: "drag-drop",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "application",
      prompt: "أكمِلْ كُلَّ مُثَلَّثِ عائِلةِ حَقائِقٍ: اسحَبِ العَدَدَ النّاقِصَ إلى رَأسِهِ الفارِغِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاثة مثلثات لعائلة حقائق المئة، في كل مثلث رأس فارغ">
        ${[{cx:730,given:'٤٠'},{cx:450,given:'٣٠'},{cx:170,given:'١٠'}].map(t=>`
          <path d="M ${t.cx} 118 L ${t.cx+82} 302 L ${t.cx-82} 302 Z" fill="none" stroke="#9c7b3f" stroke-width="6" stroke-linejoin="round"/>
          <text x="${t.cx}" y="240" font-size="36" font-weight="700" text-anchor="middle" fill="#9c7b3f" font-family="Cairo, Tajawal, sans-serif">+ −</text>
          <circle cx="${t.cx}" cy="118" r="52" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
          <text x="${t.cx}" y="134" font-size="40" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">١٠٠</text>
          <circle cx="${t.cx+82}" cy="302" r="52" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
          <text x="${t.cx+82}" y="318" font-size="44" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">${t.given}</text>
          <circle cx="${t.cx-82}" cy="302" r="52" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>`).join('')}
      </svg>`,
      targets: [
        { answer: "٦٠", box: { x: 71, y: 5 }, dot: { x: 72.0, y: 73.7 } },
        { answer: "٧٠", box: { x: 40, y: 5 }, dot: { x: 40.9, y: 73.7 } },
        { answer: "٩٠", box: { x: 9,  y: 5 }, dot: { x: 9.8,  y: 73.7 } }
      ]
    },

    // ④ ملء الفراغ — تطبيق — 2Nc14
    {
      type: "fill-blank",
      objective: "2Nc14: يفهم أن الجمع يمكن أن يكون بأي ترتيب، ولكن هذا غير ممكن في حالة الطرح",
      level: "application",
      prompt: "أكمِلِ الجُملةَ بِسَحبِ الكَلِمةِ المُناسِبةِ.",
      text: "الجَمْعُ يُمكِنُ بِأيِّ {}، فَـ٣٠ + ٧٠ = ٧٠ + ٣٠. أمّا {} فَلا يُمكِنُ فيهِ تَغييرُ التَّرتيبِ.",
      answers: ["تَرتيبٍ", "الطَّرحُ"],
      distractors: ["الجَمْعُ", "عَدَدٍ"]
    },

    // ⑤ التصنيف — استدلال — 2Nc3
    {
      type: "classify",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "reasoning",
      prompt: "صَنِّفِ العَمَلِيّاتِ: أيُّها مِنْ عائِلةِ حَقائِقِ المِائةِ؟",
      groups: [
        { name: "مِنْ عائِلةِ المِائةِ",   items: ["٤٠ + ٦٠", "١٠٠ − ٣٠", "٩٠ + ١٠"] },
        { name: "لَيسَتْ مِنْ عائِلةِ المِائةِ", items: ["٥٠ + ٤٠", "١٠٠ − ٣٥", "٢٠ + ٧٠"] }
      ]
    },

    // ⑥ الخريطة الذهنية (إثرائي اختياري) — تطبيق — 2Nc3
    {
      type: "mindmap",
      objective: "2Nc3: يجد كلّ الأزواج العددية لمضاعفات العدد ١٠ بمجموع ١٠٠، وتسجيل حقائق الجمع والطرح المتعلقة بها",
      level: "application",
      prompt: "أكمِلْ خَريطةَ أزواجِ المِائةِ بِسَحبِ العَدَدِ النّاقِصِ إلى كُلِّ فَرعٍ.",
      center: "أزواجُ المِائةِ",
      branches: [
        { label: "٢٠ +", answer: "٨٠" },
        { label: "٤٠ +", answer: "٦٠" },
        { label: "٩٠ +", answer: "١٠" }
      ],
      distractors: ["٧٠", "٥٠"]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٤-١: استخدام خط الأعداد (كتاب التلميذ ص١٠، الوحدة ١أ)
  "g2m-4-1": [

    // ① خط الأعداد (place) — معرفة — 2Nn10
    {
      type: "number-line",
      mode: "place",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "knowledge",
      prompt: "ضَعِ المُؤشِّرَ على العَدَدِ ٤٥ في خَطِّ الأعدادِ.",
      min: 0, max: 100, step: 5, labelEvery: 2,
      target: 45
    },

    // ② اختيار من متعدد — معرفة — 2Nn10
    {
      type: "mcq",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "knowledge",
      prompt: "بَينَ أيِّ عَقْدَينِ يَقَعُ العَدَدُ ٧٩ على خَطِّ الأعدادِ؟",
      options: ["بَينَ ٧٠ و٨٠", "بَينَ ٨٠ و٩٠", "بَينَ ٦٠ و٧٠", "بَينَ ٩٠ و١٠٠"],
      answer: 0
    },

    // ③ سحب وإفلات — تطبيق — 2Nn10 (ثلاث خانات تحت الخط في مواضع ١٨ و٤٥ و٩٥)
    // الخانات تحت الخط والشريط العلويّ (y=0..78 من ٤١٠) فارغٌ ليجلس فيه صندوق البطاقة.
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): كبرت الخانة (٧٦×٦٤ ⇒ ١١٠×١٠٤) وطالت
    // علاماتُ التدريجِ وأرقامُه، وتوزّع الكلُّ على الارتفاع الجديد.
    {
      type: "drag-drop",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "application",
      prompt: "اسحَبْ كُلَّ عَدَدٍ إلى خانَتِهِ في مَوضِعِهِ الصَّحيحِ على خَطِّ الأعدادِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من صفر إلى مئة تحته ثلاث خانات فارغة">
        <line x1="60" y1="158" x2="840" y2="158" stroke="#cf3b3b" stroke-width="8" stroke-linecap="round"/>
        ${[0,10,20,30,40,50,60,70,80,90,100].map((v,i)=>{const x=60+v*7.8;const lbl=["٠","١٠","٢٠","٣٠","٤٠","٥٠","٦٠","٧٠","٨٠","٩٠","١٠٠"][i];return `
          <line x1="${x}" y1="140" x2="${x}" y2="176" stroke="#cf3b3b" stroke-width="5"/>
          <text x="${x}" y="104" font-size="34" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">${lbl}</text>`;}).join("")}
        ${[18,45,95].map(v=>{const cx=60+v*7.8;return `
          <line x1="${cx}" y1="176" x2="${cx}" y2="244" stroke="#9c7b3f" stroke-width="4" stroke-dasharray="8 7"/>
          <rect x="${cx-55}" y="244" width="110" height="104" rx="16" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>`;}).join("")}
      </svg>`,
      targets: [
        { answer: "١٨", box: { x: 22, y: 4 }, dot: { x: 22.3, y: 72.2 } },
        { answer: "٤٥", box: { x: 46, y: 4 }, dot: { x: 45.7, y: 72.2 } },
        { answer: "٩٥", box: { x: 89, y: 4 }, dot: { x: 89.0, y: 72.2 } }
      ]
    },

    // ④ المقارنة — تطبيق — 2Nn10
    {
      type: "compare",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "application",
      prompt: "أيُّهُما أسبَقُ على خَطِّ الأعدادِ؟ ضَعِ الرَّمزَ المُناسِبَ بَينَ كُلِّ عَدَدَينِ.",
      pairs: [
        { a: "٤٥", b: "٥٤" },
        { a: "٧٩", b: "٩٥" },
        { a: "١٨", b: "١٨" }
      ]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Nn10 (أعداد صفحة الكتاب الخمسة)
    {
      type: "sequence",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "reasoning",
      prompt: "رَتِّبِ الأعدادَ كَما تَظهَرُ على خَطِّ الأعدادِ مِنَ الأصغَرِ إلى الأكبَرِ.",
      steps: ["٥", "١٨", "٤٥", "٧٩", "٩٥"]
    },

    // ⑥ اكتشف الخطأ (إثرائي اختياري) — استدلال — 2Nn10
    // مهمّة الكتاب نفسها: عددٌ وُضع في غير موضعه. ٩٥ معلّقٌ عند ٦٦ فهو الخطأ.
    {
      type: "find-error",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "reasoning",
      prompt: "أحَدُ الأعدادِ وُضِعَ في المَكانِ الخَطأِ على خَطِّ الأعدادِ — اضغَطْ عَلَيهِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد عليه خمسة أعداد أحدها في غير موضعه">
        <line x1="60" y1="286" x2="840" y2="286" stroke="#cf3b3b" stroke-width="8" stroke-linecap="round"/>
        ${[0,10,20,30,40,50,60,70,80,90,100].map((v,i)=>{const x=60+v*7.8;const lbl=["٠","١٠","٢٠","٣٠","٤٠","٥٠","٦٠","٧٠","٨٠","٩٠","١٠٠"][i];return `
          <line x1="${x}" y1="268" x2="${x}" y2="304" stroke="#cf3b3b" stroke-width="5"/>
          <text x="${x}" y="352" font-size="34" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">${lbl}</text>`;}).join("")}
        ${[{v:5,lbl:"٥"},{v:18,lbl:"١٨"},{v:45,lbl:"٤٥"},{v:66,lbl:"٩٥"},{v:79,lbl:"٧٩"}].map(n=>{const x=60+n.v*7.8;return `
          <line x1="${x}" y1="124" x2="${x}" y2="286" stroke="#2f6fb0" stroke-width="5"/>
          <rect x="${x-42}" y="48" width="84" height="76" rx="14" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
          <text x="${x}" y="100" font-size="40" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">${n.lbl}</text>`;}).join("")}
      </svg>`,
      spot: { x: 63.9, y: 21.0, r: 8 }
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٤-٢: تقريب الأعداد باستخدام خط الأعداد (كتاب التلميذ ص١١، الوحدة ١أ)
  "g2m-4-2": [

    // ① خط الأعداد (round) — معرفة — 2Nn8
    // وضعُ التقريب يعلّم ٦٣ ثابتاً على الخط، والجوابُ يُحسب من roundTo فلا يُؤلَّف يدوياً.
    {
      type: "number-line",
      mode: "round",
      objective: "2Nn8: يقرّب عدداً من رقمين لأقرب مضاعف من مضاعفات ١٠",
      level: "knowledge",
      prompt: "العَدَدُ ٦٣ مُعَلَّمٌ على الخَطِّ. ضَعِ المُؤشِّرَ على أقرَبِ عَشَرةٍ إلَيهِ.",
      min: 0, max: 100, step: 10, labelEvery: 1,
      target: 63, roundTo: 10
    },

    // ② اختيار من متعدد — معرفة — 2Nn8
    {
      type: "mcq",
      objective: "2Nn8: يقرّب عدداً من رقمين لأقرب مضاعف من مضاعفات ١٠",
      level: "knowledge",
      prompt: "إلى أيِّ عَشَرةٍ يُقَرَّبُ العَدَدُ ٤٨؟",
      options: ["٥٠", "٤٠", "٤٥", "٦٠"],
      answer: 0
    },

    // ③ التصنيف — تطبيق — 2Nn8 (بطاقات كتاب التلميذ ص١١)
    {
      type: "classify",
      objective: "2Nn8: يقرّب عدداً من رقمين لأقرب مضاعف من مضاعفات ١٠",
      level: "application",
      prompt: "صَنِّفْ بِطاقاتِ الأعدادِ حَسَبَ جِهةِ التَّقريبِ.",
      groups: [
        { name: "يُقَرَّبُ إلى العَدَدِ الأدنى", items: ["٢٢", "٣٤", "٩٤"] },
        { name: "يُقَرَّبُ إلى العَدَدِ الأعلى", items: ["٤٨", "٦٩", "٩٥"] }
      ]
    },

    // ④ سحب وإفلات — تطبيق — 2Nn10 (كل عدد إلى العشرة التي يُقرَّب إليها)
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠) بنفس توزيع خط أعداد النشاط ٤-١.
    {
      type: "drag-drop",
      objective: "2Nn10: يضع عدداً من رقمين على خط الأعداد المميّز بمضاعفات العدد ١٠",
      level: "application",
      prompt: "اسحَبْ كُلَّ عَدَدٍ إلى خانةِ العَشَرةِ الَّتي يُقَرَّبُ إلَيها.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من صفر إلى مئة تحته ثلاث خانات عند الثلاثين والستين والتسعين">
        <line x1="60" y1="158" x2="840" y2="158" stroke="#cf3b3b" stroke-width="8" stroke-linecap="round"/>
        ${[0,10,20,30,40,50,60,70,80,90,100].map((v,i)=>{const x=60+v*7.8;const lbl=["٠","١٠","٢٠","٣٠","٤٠","٥٠","٦٠","٧٠","٨٠","٩٠","١٠٠"][i];return `
          <line x1="${x}" y1="140" x2="${x}" y2="176" stroke="#cf3b3b" stroke-width="5"/>
          <text x="${x}" y="104" font-size="34" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">${lbl}</text>`;}).join("")}
        ${[30,60,90].map(v=>{const cx=60+v*7.8;return `
          <line x1="${cx}" y1="176" x2="${cx}" y2="244" stroke="#9c7b3f" stroke-width="4" stroke-dasharray="8 7"/>
          <rect x="${cx-55}" y="244" width="110" height="104" rx="16" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>`;}).join("")}
      </svg>`,
      targets: [
        { answer: "٣٤", box: { x: 33, y: 4 }, dot: { x: 32.7, y: 72.2 } },
        { answer: "٦٣", box: { x: 59, y: 4 }, dot: { x: 58.7, y: 72.2 } },
        { answer: "٩٤", box: { x: 85, y: 4 }, dot: { x: 84.7, y: 72.2 } }
      ]
    },

    // ⑤ ملء الفراغ — استدلال — 2Nn8 (تعليل قاعدة الآحاد ٥)
    {
      type: "fill-blank",
      objective: "2Nn8: يقرّب عدداً من رقمين لأقرب مضاعف من مضاعفات ١٠",
      level: "reasoning",
      prompt: "أكمِلْ قاعِدةَ التَّقريبِ بِسَحبِ الكَلِماتِ المُناسِبةِ.",
      text: "إذا كانَ آحادُ العَدَدِ أقَلَّ مِنْ ٥ قَرَّبناهُ إلى العَدَدِ {}، وإذا كانَ ٥ أو أكثَرَ قَرَّبناهُ إلى العَدَدِ {}. فَلِذَلِكَ ٩٥ يُقَرَّبُ إلى {}.",
      answers: ["الأدنى", "الأعلى", "١٠٠"],
      distractors: ["٩٠", "نَفْسِهِ"]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nn8
    {
      type: "exclude",
      objective: "2Nn8: يقرّب عدداً من رقمين لأقرب مضاعف من مضاعفات ١٠",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ الأعدادِ تُقَرَّبُ إلى ٦٠ وواحِدٌ دَخيلٌ — اضغَطْ على الدَّخيلِ.",
      options: ["٥٨", "٦٣", "٦١", "٤٨"],
      answer: 3,
      reason: "٤٨ يُقَرَّبُ إلى ٥٠، أمّا ٥٨ و٦٣ و٦١ فَتُقَرَّبُ كُلُّها إلى ٦٠."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٥-١: الأزواج العددية لـ٢٠ (كتاب التلميذ ص١٢، الوحدة ١أ)
  "g2m-5-1": [

    // ① بناء المعادلة (fill) — معرفة — 2Nc1
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      prompt: "أكمِلِ الزَّوجَ العَدَديَّ لِلعِشرينَ.",
      tokens: ["١٤", "+", "__", "=", "٢٠"],
      bank: ["٦", "٤", "٧", "١٦"],
      answers: ["٦"]
    },

    // ② اختيار من متعدد — معرفة — 2Nc1
    {
      type: "mcq",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      prompt: "أيُّ زَوجٍ مَجموعُهُ ٢٠؟",
      options: ["١٣ + ٧", "١٢ + ٩", "١١ + ٨", "١٥ + ٦"],
      answer: 0
    },

    // ③ سحب وإفلات — تطبيق — 2Nc2 (ثلاثة صفوف من إطاري العشرة)
    // الهامش الأيسر (x=0..268 من ٩٠٠) فارغٌ عمداً ليجلس فيه صندوق كل بطاقة بمحاذاة صفّه.
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): تباعدت السطور الثلاثة (خطوة ١٢٦ ⇒ ١٢٨، وفجوة
    // إطاري العشرة ٤٢ ⇒ ٤٤) وكبرت خانة الجواب (٨٠×٦٤ ⇒ ٨٤×٦٨)؛ عرضُ الخلية محكومٌ بعشرة أعمدة.
    {
      type: "drag-drop",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "application",
      prompt: "في كُلِّ سَطرٍ إطارا عَشَرةٍ فيهِما ٢٠ خانةً. اسحَبِ العَدَدَ الَّذي يُكمِلُ المُلَوَّنَ إلى ٢٠.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاثة سطور، كل سطر إطارا عشرة فيهما عشرون خانة بعضها ملوّن وخانة فارغة للجواب">
        ${[14,11,17].map((filled,r)=>{const y0=24+r*128;let cells="";for(let k=0;k<20;k++){const col=k%10,row=Math.floor(k/10);const x=774-col*42,y=y0+row*44;const on=k<filled;cells+=`<rect x="${x}" y="${y}" width="36" height="36" rx="6" fill="${on?"#2f6fb0":"#ffffff"}" stroke="#33334d" stroke-width="3"/>`;}return `
          ${cells}
          <text x="872" y="${y0+56}" font-size="38" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">٢٠</text>
          <text x="832" y="${y0+56}" font-size="38" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">=</text>
          <text x="360" y="${y0+56}" font-size="38" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">+</text>
          <rect x="278" y="${y0+10}" width="84" height="68" rx="14" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>`;}).join("")}
      </svg>`,
      targets: [
        { answer: "٦", box: { x: 8, y: 11 }, dot: { x: 35.6, y: 16.6 } },
        { answer: "٩", box: { x: 8, y: 43 }, dot: { x: 35.6, y: 47.8 } },
        { answer: "٣", box: { x: 8, y: 74 }, dot: { x: 35.6, y: 79.0 } }
      ]
    },

    // ④ العدّ بالنقر — تطبيق — 2Nc2
    {
      type: "count-tap",
      mode: "each",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "application",
      prompt: "أمامَكَ ٢٠ مُكَعَّباً. انقُرْ ١٤ مِنها، ثُمَّ لاحِظْ كَمْ بَقِيَ بِلا نَقْرٍ.",
      glyph: "🟦", count: 20, target: 14
    },

    // ⑤ التصنيف — استدلال — 2Nc14 (تغيير الترتيب لا يغيّر المجموع)
    {
      type: "classify",
      objective: "2Nc14: يفهم أن الجمع يمكن أن يكون بأي ترتيب، ولكن هذا غير ممكن في حالة الطرح",
      level: "reasoning",
      prompt: "صَنِّفِ العَمَلِيّاتِ حَسَبَ مَجموعِها، ولاحِظْ أنَّ تَغييرَ التَّرتيبِ لا يُغَيِّرُ المَجموعَ.",
      groups: [
        { name: "مَجموعُهُ ٢٠",        items: ["١٣ + ٧", "٧ + ١٣", "١٥ + ٥"] },
        { name: "مَجموعُهُ لَيسَ ٢٠", items: ["١٢ + ٩", "٦ + ١٣", "١١ + ٨"] }
      ]
    },

    // ⑥ التلوين بالتعليمات (إثرائي اختياري) — تطبيق — 2Nc2
    // ٢٠ خانةً كلُّ واحدةٍ جزءٌ مستقلٌّ؛ أسماؤها وألوانُها الصحيحة مُشتقّةٌ من موضعها
    // (أوّل ١٤ من اليمين أزرق والباقي برتقالي) فيرى الطفل الزوج ١٤ و٦ ملوّناً بيدِه.
    // الأشكال بلا fill/stroke لترث لون الجزء من CSS كبقيّة أسئلة التلوين.
    // نسبة الرسم ٢٫١٨٩ (shoogp-ui §١.١٠): عرض الخانة محكومٌ بعشرة أعمدة (خطوة ٥٠) فلم يزد
    // إلا يسيراً (٤٤ ⇒ ٤٦)، ونمت ارتفاعاً (٤٤ ⇒ ٧٦) فارتفع هدف اللمس، وتباعد إطارا العشرة.
    {
      type: "color",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "application",
      prompt: "لَوِّنْ أوَّلَ ١٤ خانةً مِنَ اليَمينِ بِالأزرَقِ والباقيَ بِالبُرتُقاليِّ لِتُظهِرَ الزَّوجَ ١٤ و٦.",
      bg: "#fdf9ee",
      palette: [
        { name: "أزرق",    color: "#2f6fb0" },
        { name: "برتقالي", color: "#d97a2b" }
      ],
      parts: (function(){
        const ar = n => String(n).replace(/[0-9]/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
        return Array.from({ length: 20 }, (_, k) =>
          ({ name: "خانة " + ar(k + 1), color: k < 14 ? "#2f6fb0" : "#d97a2b" }));
      })(),
      svg: (function(){
        const ar = n => String(n).replace(/[0-9]/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
        const cells = Array.from({ length: 20 }, (_, k) => {
          const col = k % 10, row = Math.floor(k / 10);
          const x = 470 - col * 50, y = 36 + row * 96;
          return `<g class="cpart" data-name="خانة ${ar(k + 1)}"><rect x="${x}" y="${y}" width="46" height="76" rx="12"/></g>`;
        }).join("");
        return `<svg viewBox="0 0 534 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="إطارا عشرة فيهما عشرون خانة للتلوين">${cells}</svg>`;
      })()
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٥-٢: الأزواج العددية بين ١٠ و٢٠ (كتاب التلميذ ص١٣، الوحدة ١أ)
  // ملاحظة تأليف: مينا السّاعة في هذه الصفحة **وعاءٌ لأزواج العدد ١٢** لا موضوعَ توقيت،
  // وأهداف الدرس عدديّة (2Nc) لا زمنيّة (2Mt) — فلم يُستخدم نوع `clock` هنا عن قصد.
  "g2m-5-2": [

    // ① بناء المعادلة (fill) — معرفة — 2Nc1
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      prompt: "أكمِلِ الزَّوجَ العَدَديَّ لِلعَدَدِ ١٢.",
      tokens: ["٥", "+", "__", "=", "١٢"],
      bank: ["٧", "٦", "٨", "٥"],
      answers: ["٧"]
    },

    // ② التوصيل — معرفة — 2Nc2
    {
      type: "matching",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَدَدٍ على مينا السّاعةِ بِزَوجِهِ الَّذي يُكمِلُهُ إلى ١٢.",
      pairs: [
        { a: "٢", b: "١٠" },
        { a: "٣", b: "٩" },
        { a: "٤", b: "٨" },
        { a: "٥", b: "٧" }
      ]
    },

    // ③ تحديد الأجزاء — تطبيق — 2Nc2 (مينا ساعة مبنيّ SVG، والجواب ٨ زوجُ ٤)
    {
      type: "hotspot",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "application",
      prompt: "على مينا السّاعةِ: اضغَطْ على العَدَدِ الَّذي يُكمِلُ ٤ إلى ١٢.",
      bg: "#fdf9ee",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مينا ساعة عليه الأعداد من واحد إلى اثني عشر">
        <circle cx="150" cy="150" r="132" fill="#ffffff" stroke="#9c7b3f" stroke-width="7"/>
        <circle cx="150" cy="150" r="7" fill="#9c7b3f"/>
        ${Array.from({length:12},(_,i)=>{const n=i+1;const a=n*30*Math.PI/180;const x=150+92*Math.sin(a);const y=150-92*Math.cos(a);const lbl=["١","٢","٣","٤","٥","٦","٧","٨","٩","١٠","١١","١٢"][i];return `
          <text x="${x.toFixed(1)}" y="${(y+12).toFixed(1)}" font-size="34" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">${lbl}</text>`;}).join("")}
      </svg>`,
      spot: { x: 23.4, y: 65.3, r: 10 }
    },

    // ④ ملء الفراغ — تطبيق — 2Nc1
    {
      type: "fill-blank",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "application",
      prompt: "أكمِلِ الجُمَلَ بِسَحبِ الأعدادِ والكَلِماتِ المُناسِبةِ.",
      text: "على مينا السّاعةِ، زَوجُ العَدَدِ ٤ لِيُكمِلَ ١٢ هو {}، وزَوجُ العَدَدِ ٩ هو {}. وكُلَّما زادَ عَدَدٌ نَقَصَ {}.",
      answers: ["٨", "٣", "زَوجُهُ"],
      distractors: ["٤", "١٢"]
    },

    // ⑤ إكمال النمط — استدلال — 2Nc2 (أزواج ١٢ تتنازل واحداً واحداً)
    {
      type: "pattern",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "reasoning",
      prompt: "هذِهِ أزواجُ العَدَدِ ١٢ مُرَتَّبةً. أكمِلِ النَّمَطَ ثُمَّ صِفْ قاعِدَتَهُ.",
      items: ["١١", "١٠", "__", "٨", "__", "٦"],
      answers: ["٩", "٧"],
      distractors: ["١٢", "٥"],
      rule: "نَنقُصُ ١ كُلَّ مَرّةٍ"
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — تطبيق — 2Nc1
    {
      type: "memory",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "application",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتَجِدَ العَدَدَينِ اللَّذَينِ مَجموعُهُما ١٢.",
      pairs: [
        { a: "١", b: "١١" },
        { a: "٢", b: "١٠" },
        { a: "٣", b: "٩" },
        { a: "٤", b: "٨" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٦-١: الجمع باستخدام الأزواج العددية (كتاب التلميذ ص١٤، الوحدة ١أ)
  "g2m-6-1": [

    // ① بناء المعادلة (fill) — معرفة — 2Nc8 (المجموعة الخضراء ٤ و٥ و٩ و٢)
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc8: يجمع أربعة أو خمسة أعداد صغيرة مكوّنة من رقم واحد مع بعضها",
      level: "knowledge",
      prompt: "اجمَعْ أعدادَ المَجموعةِ الخَضراءِ: اسحَبِ المَجموعَ الصَّحيحَ.",
      tokens: ["٤", "+", "٥", "+", "٩", "+", "٢", "=", "__"],
      bank: ["٢٠", "١٩", "٢١", "١٨"],
      answers: ["٢٠"]
    },

    // ② اختيار من متعدد — معرفة — 2Nc8 (المجموعة البرتقالية)
    {
      type: "mcq",
      objective: "2Nc8: يجمع أربعة أو خمسة أعداد صغيرة مكوّنة من رقم واحد مع بعضها",
      level: "knowledge",
      prompt: "المَجموعةُ البُرتُقاليّةُ فيها ٣ و٤ و٧ و٨. ما مَجموعُها؟",
      options: ["٢٢", "٢٠", "٢٣", "٢١"],
      answer: 0
    },

    // ③ سحب وإفلات — تطبيق — 2Nc11 (جمع آحاد إلى عدد من رقمين)
    // الشريط العلويّ (y=0..96 من ٤١٠) فارغٌ عمداً ليجلس فيه صندوق كل بطاقة فوق بطاقتها.
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): طالت البطاقة (١٠٠ ⇒ ٢٠٠) وخانةُ الجواب (٧٢ ⇒ ١٤٠)
    // فتوسّطتا الارتفاع الجديد؛ وعرضُ البطاقة ٢٦٠ وخطُّ العملية ٣٨ لم يُمَسّا كي يسع النصُّ إطارَه.
    {
      type: "drag-drop",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "application",
      prompt: "اسحَبِ المَجموعَ الصَّحيحَ إلى خانَتِهِ في كُلِّ بِطاقةٍ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاث بطاقات جمع، في كل بطاقة خانة فارغة للمجموع">
        ${[{gx:590,exp:"٤٧ + ٥"},{gx:310,exp:"٦٨ + ٤"},{gx:30,exp:"٣٩ + ٦"}].map(g=>`
          <rect x="${g.gx+10}" y="96" width="260" height="200" rx="20" fill="#ffffff" stroke="#d9c7a4" stroke-width="4"/>
          <text x="${g.gx+200}" y="212" font-size="38" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">${g.exp}</text>
          <text x="${g.gx+150}" y="212" font-size="38" font-weight="700" text-anchor="middle" fill="#4a3a10" font-family="Cairo, Tajawal, sans-serif">=</text>
          <rect x="${g.gx+30}" y="126" width="100" height="140" rx="16" fill="#efe6d6" stroke="#9c7b3f" stroke-width="5" stroke-dasharray="14 10"/>`).join("")}
      </svg>`,
      targets: [
        { answer: "٥٢", box: { x: 74, y: 6 }, dot: { x: 74.4, y: 47.8 } },
        { answer: "٧٢", box: { x: 43, y: 6 }, dot: { x: 43.3, y: 47.8 } },
        { answer: "٤٥", box: { x: 12, y: 6 }, dot: { x: 12.2, y: 47.8 } }
      ]
    },

    // ④ التصنيف — تطبيق — 2Nc7
    {
      type: "classify",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي، مثلاً: ١٦+٤ = ١٧+٣",
      level: "application",
      prompt: "صَنِّفِ العَمَلِيّاتِ: أيُّها يُساوي ٢٠؟",
      groups: [
        { name: "يُساوي ٢٠",     items: ["١٣ + ٧", "٤ + ٥ + ٩ + ٢", "١٥ + ٥"] },
        { name: "لا يُساوي ٢٠", items: ["٣ + ٤ + ٧ + ٨", "٢ + ٨ + ٧ + ٦", "١٢ + ٩"] }
      ]
    },

    // ⑤ صواب وخطأ — استدلال — 2Nc14
    {
      type: "true-false",
      objective: "2Nc14: يفهم أن الجمع يمكن أن يكون بأي ترتيب، ولكن هذا غير ممكن في حالة الطرح",
      level: "reasoning",
      statement: "إذا جَمَعْتَ أعدادَ المَجموعةِ بِتَرتيبٍ مُختَلِفٍ فَسَيَتَغَيَّرُ المَجموعُ.",
      answer: false
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nc8
    {
      type: "exclude",
      objective: "2Nc8: يجمع أربعة أو خمسة أعداد صغيرة مكوّنة من رقم واحد مع بعضها",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ العَمَلِيّاتِ مَجموعُها ٢٠ وواحِدةٌ دَخيلةٌ — اضغَطْ على الدَّخيلةِ.",
      options: ["١٥ + ٥", "١٣ + ٧", "٤ + ٥ + ٩ + ٢", "٣ + ٤ + ٧ + ٨"],
      answer: 3,
      reason: "مَجموعُها ٢٢، أمّا البَقيّةُ فَمَجموعُ كُلٍّ مِنها ٢٠."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٦-٢: التحقّق من الحل (كتاب التلميذ ص١٥، الوحدة ١أ)
  "g2m-6-2": [

    // ① بناء المعادلة (fill) — معرفة — 2Nc11
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "knowledge",
      prompt: "بِطاقاتُ القُلوبِ أزواجٌ عَدَديّةٌ لِلعَدَدِ ٢٠. أكمِلْ ما على ظَهرِ بِطاقةِ ١٣.",
      tokens: ["٢٠", "−", "١٣", "=", "__"],
      bank: ["٧", "٦", "٨", "١٣"],
      answers: ["٧"]
    },

    // ② التوصيل — معرفة — 2Nc11 (قلوب كتاب التلميذ: ١٣ و١٥ و١٨ و١٧)
    {
      type: "matching",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "knowledge",
      prompt: "صِلْ كُلَّ بِطاقةِ قَلبٍ بِالعَدَدِ المَوجودِ على ظَهرِها لِيَكونَ المَجموعُ ٢٠.",
      pairs: [
        { a: "١٣", b: "٧" },
        { a: "١٥", b: "٥" },
        { a: "١٨", b: "٢" },
        { a: "١٧", b: "٣" }
      ]
    },

    // ③ التصنيف — تطبيق — 2Nc7 (القلوب للعشرين والنجوم للثلاثين)
    {
      type: "classify",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي، مثلاً: ١٦+٤ = ١٧+٣",
      level: "application",
      prompt: "بِطاقاتُ القُلوبِ لِلعِشرينَ وبِطاقاتُ النُّجومِ لِلثَّلاثينَ. صَنِّفِ العَمَلِيّاتِ حَسَبَ مَجموعِها.",
      groups: [
        { name: "مَجموعُهُ ٢٠", items: ["١٣ + ٧", "١٨ + ٢", "١٧ + ٣"] },
        { name: "مَجموعُهُ ٣٠", items: ["١٤ + ١٦", "٢٣ + ٧", "٢١ + ٩"] }
      ]
    },

    // ④ ملء الفراغ — تطبيق — 2Pt7 (التحقّق من الطرح بالجمع)
    {
      type: "fill-blank",
      objective: "2Pt7: يتحقق من الطرح بجمع الإجابة إلى العدد الأصغر من عملية الطرح الأساسية",
      level: "application",
      prompt: "أكمِلْ طَريقةَ التَّحَقُّقِ بِسَحبِ الأعدادِ المُناسِبةِ.",
      text: "لِأتَحَقَّقَ مِنْ أنَّ ٢٠ − ١٣ = ٧ أجمَعُ الجَوابَ ٧ إلى {}، فَيَجِبُ أن أحصُلَ على {}.",
      answers: ["١٣", "٢٠"],
      distractors: ["٧", "٣٠"]
    },

    // ⑤ صواب وخطأ — استدلال — 2Pt6 (التحقّق من الجمع بترتيب مختلف)
    {
      type: "true-false",
      objective: "2Pt6: يتحقق من إجابة عملية جمع عن طريق جمع الأعداد بترتيب مختلف أو استخدام استراتيجية مختلفة",
      level: "reasoning",
      statement: "أتَحَقَّقُ مِنْ أنَّ ١٣ + ٧ = ٢٠ بِجَمْعِ العَدَدَينِ بِتَرتيبٍ آخَرَ: ٧ + ١٣.",
      answer: true
    },

    // ⑥ اكتشف الخطأ (إثرائي اختياري) — استدلال — 2Pt6
    // أربع بطاقاتٍ لأزواج العشرين، الثّالثةُ (١٧ + ٤) خاطئةٌ فالصّحيحُ ١٧ + ٣.
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): طالت البطاقة (١١٠ ⇒ ٢٣٠) وكبر القلبُ ١٫٨ مرّة
    // وارتفع خطُّ العملية (٣٢ ⇒ ٣٦)؛ وعرضُ البطاقة ١٩٠ محكومٌ بأربعة أعمدة فلم يُمَسّ.
    {
      type: "find-error",
      objective: "2Pt6: يتحقق من إجابة عملية جمع عن طريق جمع الأعداد بترتيب مختلف أو استخدام استراتيجية مختلفة",
      level: "reasoning",
      prompt: "إحدى بِطاقاتِ القُلوبِ فيها خَطأٌ في الجَمْعِ — اضغَطْ عَلَيها.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="أربع بطاقات جمع مجموع كل منها عشرون إحداها خاطئة">
        ${[{x:670,exp:"١٣ + ٧ = ٢٠"},{x:460,exp:"١٥ + ٥ = ٢٠"},{x:250,exp:"١٧ + ٤ = ٢٠"},{x:40,exp:"١٨ + ٢ = ٢٠"}].map(c=>`
          <rect x="${c.x}" y="90" width="190" height="230" rx="26" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
          <path d="M ${c.x+95} ${163} l 23 -23 a 16 16 0 0 1 23 23 l -46 46 l -46 -46 a 16 16 0 0 1 23 -23 z" fill="#2f6fb0"/>
          <text x="${c.x+95}" y="278" font-size="36" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">${c.exp}</text>`).join("")}
      </svg>`,
      spot: { x: 38.3, y: 50.0, r: 10 }
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٦-٣: المتساوي والمتكافئ (كتاب التلميذ ص١٦، الوحدة ١أ)
  "g2m-6-3": [

    // ① بناء المعادلة (equivalence) — معرفة — 2Nc7
    // وضعُ التكافؤ يقبل **أيَّ ملءٍ يجعل الطرفين متساويين** لا الجوابَ النموذجيَّ وحده،
    // وهو عينُ ما تفعله «آلة التساوي» في كتاب التلميذ: دخلٌ ٤ + ١٢ وخرجٌ ٢١ − ٥.
    {
      type: "equation-builder",
      mode: "equivalence",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي، مثلاً: ١٦+٤ = ١٧+٣",
      level: "knowledge",
      prompt: "آلةُ التَّساوي تُخرِجُ عَمَليّةً تُساوي ما دَخَلَ. أكمِلْ خانةَ الخُروجِ لِيَتَساوى الطَّرَفانِ.",
      tokens: ["٤", "+", "١٢", "=", "٢١", "−", "__"],
      bank: ["٥", "٦", "٤", "٧"],
      answers: ["٥"]
    },

    // ② صواب وخطأ — معرفة — 2Nc7 (من صندوق مفردات الدرس)
    {
      type: "true-false",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي، مثلاً: ١٦+٤ = ١٧+٣",
      level: "knowledge",
      statement: "٥ + ٢ و٩ − ٢ مُتَكافِئانِ لِأنَّ قيمةَ كُلٍّ مِنهُما ٧.",
      answer: true
    },

    // ③ التوصيل — تطبيق — 2Nc11 (بطاقات الآلة في كتاب التلميذ ص١٦)
    {
      type: "matching",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "application",
      prompt: "صِلْ كُلَّ بِطاقةٍ مِنْ بِطاقاتِ الآلةِ بِقيمَتِها.",
      pairs: [
        { a: "٥ + ١١", b: "١٦" },
        { a: "٢٣ + ٤", b: "٢٧" },
        { a: "٣٦ − ٧", b: "٢٩" },
        { a: "١٧ − ٨", b: "٩" }
      ]
    },

    // ④ ملء الفراغ — تطبيق — 2Nc8
    {
      type: "fill-blank",
      objective: "2Nc8: يجمع أربعة أو خمسة أعداد صغيرة مكوّنة من رقم واحد مع بعضها",
      level: "application",
      prompt: "أكمِلِ الجُملةَ بِسَحبِ الكَلِمةِ والعَدَدِ المُناسِبَينِ.",
      text: "قيمةُ ٥ + ١١ هي {}، وقيمةُ ٤ + ٤ + ٤ + ٤ هي العَدَدُ نَفسُهُ، فَالبِطاقَتانِ {}.",
      answers: ["١٦", "مُتَكافِئَتانِ"],
      distractors: ["١٤", "مُختَلِفَتانِ"]
    },

    // ⑤ التصنيف — استدلال — 2Nc7 (كل البطاقات من صفحة الكتاب)
    {
      type: "classify",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي، مثلاً: ١٦+٤ = ١٧+٣",
      level: "reasoning",
      prompt: "صَنِّفْ بِطاقاتِ الآلةِ: أيُّها قيمَتُها ١٦؟",
      groups: [
        { name: "قيمَتُها ١٦",        items: ["٥ + ١١", "٨ + ٨", "٢١ − ٥"] },
        { name: "قيمَتُها لَيسَتْ ١٦", items: ["٢٣ + ٤", "٣٦ − ٧", "٣٩ + ٣"] }
      ]
    },

    // ⑥ الخريطة الذهنية (إثرائي اختياري) — تطبيق — 2Nc7
    {
      type: "mindmap",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي، مثلاً: ١٦+٤ = ١٧+٣",
      level: "application",
      prompt: "أكمِلْ خَريطةَ البِطاقاتِ الَّتي قيمَتُها ١٦ بِسَحبِ العَدَدِ النّاقِصِ إلى كُلِّ فَرعٍ.",
      center: "قيمَتُها ١٦",
      branches: [
        { label: "٥ +", answer: "١١" },
        { label: "٨ +", answer: "٨" },
        { label: "٢١ −", answer: "٥" }
      ],
      distractors: ["٤", "١٢"]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٧-١: مقدمة حول المصفوفات (كتاب التلميذ ص١٧، الوحدة ١أ)
  // ملاحظة تأليف: مصفوفتا العجلات (د) والعناكب (هـ) في صفحة الكتاب لم تُستخدَما، لأنّ عدَّ
  // صفوفهما وأعمدتهما غير حاسمٍ بصريّاً — والأسئلة هنا مبنيّةٌ على المصفوفات المؤكّدة
  // (الضفادع ٢×٨، والنجوم ٣×٢، والأزهار ٤×٥، والأصداف ٢×٥) وعلى الدرّاجات الثلاثية.
  "g2m-7-1": [

    // ① المصفوفات (build) — معرفة — 2Nc17 (مصفوفة صندوق المفردات نفسها)
    {
      type: "array",
      mode: "build",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "knowledge",
      prompt: "ابْنِ مَصفوفةً فيها صَفّانِ، في كُلِّ صَفٍّ ٣ مُربَّعاتٍ.",
      rows: 2, cols: 3,
      answerSentence: "٢ × ٣ = ٦"
    },

    // ② اختيار من متعدد — معرفة — 2Nc4
    {
      type: "mcq",
      objective: "2Nc4: يفهم ويميز مضاعفات الأعداد ٢، ٥، ١٠ ويستخلص حقائق القسمة المرتبطة بها",
      level: "knowledge",
      prompt: "مَصفوفةُ الأزهارِ فيها ٤ صُفوفٍ، في كُلِّ صَفٍّ ٥ أزهارٍ. كَمْ زَهرةً فيها؟",
      options: ["٢٠", "٩", "٤٥", "٢٥"],
      answer: 0
    },

    // ③ التوصيل — تطبيق — 2Nc16
    {
      type: "matching",
      objective: "2Nc16: يستوعب أنّ الضرب هو عملية جمع مكرّرة ويستخدم إشارة ×",
      level: "application",
      prompt: "صِلْ كُلَّ عَمَلِيّةِ ضَربٍ بِجَمْعِها المُكَرَّرِ.",
      pairs: [
        { a: "٢ × ٣", b: "٣ + ٣" },
        { a: "٣ × ٢", b: "٢ + ٢ + ٢" },
        { a: "٢ × ٥", b: "٥ + ٥" },
        { a: "٤ × ٥", b: "٥ + ٥ + ٥ + ٥" }
      ]
    },

    // ④ بناء المعادلة (fill) — تطبيق — 2Nc16 (أربع درّاجات ثلاثية العجلات)
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc16: يستوعب أنّ الضرب هو عملية جمع مكرّرة ويستخدم إشارة ×",
      level: "application",
      prompt: "أربَعُ دَرّاجاتٍ ثُلاثيّةِ العَجَلاتِ. أكمِلْ جَمْعَ العَجَلاتِ المُكَرَّرَ.",
      tokens: ["٣", "+", "٣", "+", "٣", "+", "٣", "=", "__"],
      bank: ["١٢", "٩", "١٥", "٧"],
      answers: ["١٢"]
    },

    // ⑤ ملء الفراغ — استدلال — 2Pt5 (قصّة خلفان العددية من كتاب التلميذ)
    {
      type: "fill-blank",
      objective: "2Pt5: يؤلف قصة عددية تتماشى مع عملية حسابية",
      level: "reasoning",
      prompt: "أكمِلْ قِصّةَ خَلفانَ العَدَديّةَ بِسَحبِ الكَلِماتِ والأعدادِ المُناسِبةِ.",
      text: "في الدَّرّاجةِ الثُّلاثيّةِ {} عَجَلاتٍ. أصلَحَ خَلفانُ ٥ دَرّاجاتٍ، فَصارَ عَدَدُ العَجَلاتِ {} عَجَلةً. ويَكسِبُ عَنْ كُلِّ عَجَلةٍ {} واحِداً.",
      answers: ["٣", "١٥", "ريالاً"],
      distractors: ["٥", "٨"]
    },

    // ⑥ التلوين بالتعليمات (إثرائي اختياري) — تطبيق — 2Nn14
    // الرابط بالدرس: المصفوفة ذات الصفَّين المتساويين تحتاج عدداً زوجيّاً، فالتلوين
    // يفصل ما يصلح لمصفوفة صفَّين عمّا لا يصلح — لا تمريناً منفصلاً عن الأعداد الفردية.
    {
      type: "color",
      objective: "2Nn14: يفهم الأعداد الفردية والزوجية ويميزها حتى العدد ٢٠ على الأقل",
      level: "application",
      prompt: "المَصفوفةُ ذاتُ الصَّفَّينِ المُتساوِيَينِ تَحتاجُ عَدَداً زَوجيّاً. لَوِّنِ الزَّوجيَّ بِالأخضَرِ والفَرديَّ بِالبُرتُقاليِّ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر",    color: "#3e9b4f" },
        { name: "برتقالي", color: "#e8862e" }
      ],
      parts: [
        { name: "٦",  color: "#3e9b4f" },
        { name: "٩",  color: "#e8862e" },
        { name: "١٢", color: "#3e9b4f" },
        { name: "١٥", color: "#e8862e" },
        { name: "١٨", color: "#3e9b4f" },
        { name: "٢٠", color: "#3e9b4f" }
      ],
      svg: `<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ستة أعداد في دوائر للتلوين">
        ${[{n:"٦",cx:450,cy:95},{n:"٩",cx:280,cy:95},{n:"١٢",cx:110,cy:95},{n:"١٥",cx:450,cy:245},{n:"١٨",cx:280,cy:245},{n:"٢٠",cx:110,cy:245}].map(c=>`
        <g class="cpart" data-name="${c.n}" id="part-n${c.n}">
          <circle cx="${c.cx}" cy="${c.cy}" r="52"/>
          <text x="${c.cx}" y="${c.cy+17}" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">${c.n}</text>
        </g>`).join("")}
      </svg>`
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٨-١: الأشكال الثنائية الأبعاد (الوحدة ١ب)
  // التوزيع المعرفي (رياضيات): ٢ معرفة + ٢ تطبيق + ١ استدلال + إثرائي اختياري
  "g2m-8-1": [

    // ① اختيار من متعدد — معرفة — 2Gs1
    {
      type: "mcq",
      objective: "2Gs1: يصنّف ويسمّي ويصف ويرسم الأشكال الثنائية الأبعاد بناءً على خصائصها",
      level: "knowledge",
      prompt: "ما اسمُ الشَّكلِ الَّذي لَهُ ٣ أضلاعٍ و٣ رُؤوسٍ؟",
      options: ["المُثَلَّثُ", "المُرَبَّعُ", "المُستَطيلُ", "الدّائِرةُ"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Gs1
    {
      type: "true-false",
      objective: "2Gs1: يصنّف ويسمّي ويصف ويرسم الأشكال الثنائية الأبعاد بناءً على خصائصها",
      level: "knowledge",
      statement: "المُرَبَّعُ لَهُ ٤ أضلاعٍ مُتَساوِيةٍ في الطّولِ.",
      answer: true
    },

    // ③ سحب وإفلات — تطبيق — 2Gs1 (تسمية أربعة أشكال في صفّ، النوع أ بخطوط واصلة)
    // نسبة الرسم ٢٫١٩٥ التزاماً بقاعدة الرسوم الأفقية الطويلة (shoogp-ui §١.١٠).
    {
      type: "drag-drop",
      objective: "2Gs1: يصنّف ويسمّي ويصف ويرسم الأشكال الثنائية الأبعاد بناءً على خصائصها",
      level: "application",
      prompt: "اسحَبِ اسمَ كُلِّ شَكلٍ إلى صُندوقِهِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="أربعة أشكال ثنائية الأبعاد: مربع ومثلث ومستطيل ودائرة">
        <rect x="717" y="175" width="150" height="150" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <polygon points="562,165 482,325 642,325" fill="#7fb3e0" stroke="#2f6fb0" stroke-width="6"/>
        <rect x="247" y="195" width="190" height="110" fill="#9bd39b" stroke="#3e9b4f" stroke-width="6"/>
        <circle cx="112" cy="250" r="78" fill="#e8875a" stroke="#8a4a1f" stroke-width="6"/>
      </svg>`,
      targets: [
        { answer: "مُرَبَّعٌ",   box:{x:84, y:8}, dot:{x:88.0, y:42.7} },
        { answer: "مُثَلَّثٌ",   box:{x:59, y:8}, dot:{x:62.4, y:40.2} },
        { answer: "مُستَطيلٌ",  box:{x:34, y:8}, dot:{x:38.0, y:47.6} },
        { answer: "دائِرةٌ",    box:{x:9,  y:8}, dot:{x:12.4, y:42.0} }
      ]
    },

    // ④ النقطة الساخنة — تطبيق — 2Gs1 (تمييز السداسي بعدّ أضلاعه)
    {
      type: "hotspot",
      objective: "2Gs1: يصنّف ويسمّي ويصف ويرسم الأشكال الثنائية الأبعاد بناءً على خصائصها",
      level: "application",
      prompt: "عُدَّ الأضلاعَ بِعَينَيكَ ثُمَّ انقُرْ عَلى الشَّكلِ السُّداسِيِّ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="أربعة أشكال: مثلث وخماسي وسداسي ودائرة">
        <polygon points="787,170 707,330 867,330" fill="#7fb3e0" stroke="#2f6fb0" stroke-width="6"/>
        <polygon points="562,165 481,224 512,319 612,319 643,224" fill="#cf9de0" stroke="#8e44ad" stroke-width="6"/>
        <polygon points="337,165 263,208 263,293 337,335 411,293 411,208" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <circle cx="112" cy="250" r="75" fill="#e8875a" stroke="#8a4a1f" stroke-width="6"/>
      </svg>`,
      spot: { x: 37, y: 61, r: 11 }
    },

    // ⑤ التصنيف — استدلال — 2Gs1 (التصنيف حسب عدد الأضلاع)
    // ٣ مجموعات × ٤ عناصر لا أكثر: الصيغة الأثقل (٥ عناصر) أسقطت السؤال إلى الحاوية
    // المرنة (qflex) فجلس سطر التغذية الراجعة على شريط التعبئة تحت رسم الإطار —
    // بهذا التخفيف يدخل السؤال إطار tall الحقيقي (مقيس على مصفوفة المنافذ).
    {
      type: "classify",
      objective: "2Gs1: يصنّف ويسمّي ويصف ويرسم الأشكال الثنائية الأبعاد بناءً على خصائصها",
      level: "reasoning",
      prompt: "صَنِّفِ الأشكالَ حَسَبَ عَدَدِ أضلاعِها.",
      groups: [
        { name: "لَهُ ٣ أضلاعٍ", items: ["المُثَلَّثُ"] },
        { name: "لَهُ ٤ أضلاعٍ", items: ["المُرَبَّعُ", "المُستَطيلُ"] },
        { name: "لَهُ ٦ أضلاعٍ", items: ["السُّداسِيُّ"] }
      ]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Gs1
    {
      type: "exclude",
      objective: "2Gs1: يصنّف ويسمّي ويصف ويرسم الأشكال الثنائية الأبعاد بناءً على خصائصها",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ الأشكالِ لَها أضلاعٌ مُستَقيمةٌ وواحِدٌ دَخيلٌ — اضغَطْ عَلى الدَّخيلِ.",
      options: ["المُرَبَّعُ", "المُثَلَّثُ", "الدّائِرةُ", "المُستَطيلُ"],
      answer: 2,
      reason: "الدّائِرةُ لَيسَ لَها أضلاعٌ مُستَقيمةٌ ولا رُؤوسٌ، وباقي الأشكالِ لَها أضلاعٌ ورُؤوسٌ."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٨-٢: المجسمات (الوحدة ١ب)
  "g2m-8-2": [

    // ① صواب وخطأ — معرفة — 2Gs2
    {
      type: "true-false",
      objective: "2Gs2: يصنّف ويسمّي ويصف وينشئ الأشكال الثلاثية الأبعاد ويميزها من رسومات ثنائية",
      level: "knowledge",
      statement: "المُكَعَّبُ لَهُ ٦ أوجُهٍ، كُلُّ وَجهٍ مِنها مُرَبَّعٌ.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Gs2
    {
      type: "mcq",
      objective: "2Gs2: يصنّف ويسمّي ويصف وينشئ الأشكال الثلاثية الأبعاد ويميزها من رسومات ثنائية",
      level: "knowledge",
      prompt: "ما اسمُ المُجَسَّمِ الَّذي لَهُ وَجهٌ دائِرِيٌّ واحِدٌ ورَأسٌ مُدَبَّبٌ؟",
      options: ["المَخروطُ", "الأُسطُوانةُ", "الكُرةُ", "المُكَعَّبُ"],
      answer: 0
    },

    // ③ التوصيل — تطبيق — 2Gs4 (المجسم وما يشبهه من البيئة)
    {
      type: "matching",
      objective: "2Gs4: يجد أمثلة للأشكال والمجسمات والتماثل من البيئة",
      level: "application",
      prompt: "صِلْ كُلَّ مُجَسَّمٍ بِشَيءٍ يُشبِهُهُ مِنْ حَولِكَ.",
      pairs: [
        { a: "الكُرةُ",      b: "كُرةُ القَدَمِ" },
        { a: "المُكَعَّبُ",   b: "حَجَرُ النَّردِ" },
        { a: "الأُسطُوانةُ", b: "عُلبةُ المَشروبِ" },
        { a: "المَخروطُ",    b: "قُمعُ المُثَلَّجاتِ" }
      ]
    },

    // ④ ملء الفراغ بالسحب — تطبيق — 2Gs2
    // فراغان لا ثلاثة: صيغة الفراغات الثلاثة كانت على حافة اتساع إطار tall فتسقط
    // أحياناً إلى الحاوية المرنة (qflex) ويمتد ذيلها تحت رسم الإطار — كإصلاح ٨-١ س٥.
    {
      type: "fill-blank",
      objective: "2Gs2: يصنّف ويسمّي ويصف وينشئ الأشكال الثلاثية الأبعاد ويميزها من رسومات ثنائية",
      level: "application",
      prompt: "أكمِلِ الجُمَلَ بِسَحبِ الكَلِماتِ المُناسِبةِ.",
      text: "لِلمُكَعَّبِ {} أوجُهٍ مُتَطابِقةٍ، ولِلأُسطُوانةِ وَجهانِ {} مُتَقابِلانِ",
      answers: ["٦", "دائِرِيّانِ"],
      distractors: ["٤", "مُرَبَّعانِ"]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Gs2 (الترتيب حسب عدد الأوجه المستوية)
    // الكرة بلا وجه مستوٍ، والمخروط وجه واحد، والأسطوانة وجهان، والمكعب ستة.
    {
      type: "sequence",
      objective: "2Gs2: يصنّف ويسمّي ويصف وينشئ الأشكال الثلاثية الأبعاد ويميزها من رسومات ثنائية",
      level: "reasoning",
      prompt: "رَتِّبِ المُجَسَّماتِ تَصاعُدِيّاً: مِنَ الأقَلِّ أوجُهاً مُستَوِيةً إلى الأكثَرِ.",
      steps: ["الكُرةُ", "المَخروطُ", "الأُسطُوانةُ", "المُكَعَّبُ"]
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — معرفة — 2Gs2
    {
      type: "memory",
      objective: "2Gs2: يصنّف ويسمّي ويصف وينشئ الأشكال الثلاثية الأبعاد ويميزها من رسومات ثنائية",
      level: "knowledge",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتُطابِقَ كُلَّ مُجَسَّمٍ بِصِفَتِهِ المُمَيِّزةِ.",
      pairs: [
        { a: "الكُرةُ",                b: "تَتَدَحرَجُ في كُلِّ اتِّجاهٍ" },
        { a: "المُكَعَّبُ",             b: "٦ أوجُهٍ مُرَبَّعةٍ" },
        { a: "المَخروطُ",              b: "لَهُ رَأسٌ مُدَبَّبٌ" },
        { a: "مُتَوازي المُستَطيلاتِ", b: "يُشبِهُ عُلبةَ الأحذِيةِ" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٨-٣: التماثل (الوحدة ١ب)
  "g2m-8-3": [

    // ① صواب وخطأ — معرفة — 2Gs3
    {
      type: "true-false",
      objective: "2Gs3: يحدد انعكاس التماثل ويرسم خطوط التماثل",
      level: "knowledge",
      statement: "خَطُّ التَّماثُلِ يَقسِمُ الشَّكلَ إلى نِصفَينِ مُتَطابِقَينِ تَمامَ التَّطابُقِ.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Gs3
    {
      type: "mcq",
      objective: "2Gs3: يحدد انعكاس التماثل ويرسم خطوط التماثل",
      level: "knowledge",
      prompt: "كَمْ خَطَّ تَماثُلٍ لِلمُرَبَّعِ؟",
      options: ["٤", "١", "٢", "٣"],
      answer: 0
    },

    // ③ خط التماثل (line) — تطبيق — 2Gs3 (التحقق على مجموعة خطوط المستطيل)
    {
      type: "symmetry",
      objective: "2Gs3: يحدد انعكاس التماثل ويرسم خطوط التماثل",
      level: "application",
      prompt: "انقُرْ خُطوطَ التَّماثُلِ الصَّحيحةَ في المُستَطيلِ.",
      mode: "line", shape: "rect",
      lines: [
        { x1: 100, y1: 35,  x2: 100, y2: 165, ok: true },
        { x1: 15,  y1: 100, x2: 185, y2: 100, ok: true },
        { x1: 25,  y1: 45,  x2: 175, y2: 155, ok: false }
      ]
    },

    // ④ التوصيل — تطبيق — 2Gs3 (عدد خطوط التماثل لكل شكل)
    {
      type: "matching",
      objective: "2Gs3: يحدد انعكاس التماثل ويرسم خطوط التماثل",
      level: "application",
      prompt: "صِلْ كُلَّ شَكلٍ بِعَدَدِ خُطوطِ تَماثُلِهِ.",
      pairs: [
        { a: "المُرَبَّعُ",   b: "٤ خُطوطٍ" },
        { a: "المُستَطيلُ",  b: "خَطّانِ" },
        { a: "القَلبُ",      b: "خَطٌّ واحِدٌ" },
        { a: "الدّائِرةُ",   b: "خُطوطٌ كَثيرةٌ جِدّاً" }
      ]
    },

    // ⑤ النقطة الساخنة — استدلال — 2Gs3 (تمييز خط التماثل الصحيح من الخاطئ)
    // المثلث خطه المتقطع عمودي من الرأس فيقسمه نصفين متطابقين (صحيح)؛
    // المستطيل خطه قطري (خطأ)، والدائرة خطها لا يمر بالمركز (خطأ).
    {
      type: "hotspot",
      objective: "2Gs3: يحدد انعكاس التماثل ويرسم خطوط التماثل",
      level: "reasoning",
      prompt: "واحِدٌ فَقَط مِنَ الخُطوطِ المُتَقَطِّعةِ خَطُّ تَماثُلٍ صَحيحٌ — انقُرْ عَلى الشَّكلِ صاحِبِ الخَطِّ الصَّحيحِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاثة أشكال على كل منها خط متقطع: مثلث ومستطيل ودائرة">
        <polygon points="750,160 660,330 840,330" fill="#7fb3e0" stroke="#2f6fb0" stroke-width="6"/>
        <line x1="750" y1="145" x2="750" y2="345" stroke="#33415e" stroke-width="5" stroke-dasharray="14 10" stroke-linecap="round"/>
        <rect x="360" y="185" width="190" height="130" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <line x1="352" y1="178" x2="558" y2="322" stroke="#33415e" stroke-width="5" stroke-dasharray="14 10" stroke-linecap="round"/>
        <circle cx="140" cy="250" r="80" fill="#9bd39b" stroke="#3e9b4f" stroke-width="6"/>
        <line x1="175" y1="155" x2="175" y2="345" stroke="#33415e" stroke-width="5" stroke-dasharray="14 10" stroke-linecap="round"/>
      </svg>`,
      spot: { x: 83, y: 61, r: 12 }
    },

    // ⑥ التلوين بالتعليمات (إثرائي اختياري) — استدلال — 2Gs4
    // أشكال متماثلة (قلب، مربع، مثلث متساوي الأضلاع) وغير متماثلة (مثلث مختلف
    // الأضلاع، رباعي غير منتظم، علم) — التلوين يفصل بينها.
    {
      type: "color",
      objective: "2Gs4: يجد أمثلة للأشكال والمجسمات والتماثل من البيئة",
      level: "reasoning",
      prompt: "لَوِّنِ الشَّكلَ المُتَماثِلَ بِالأخضَرِ، والشَّكلَ غَيرَ المُتَماثِلِ بِالبُرتُقالِيِّ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر",    color: "#3e9b4f" },
        { name: "برتقالي", color: "#e8862e" }
      ],
      parts: [
        { name: "القَلبُ",                     color: "#3e9b4f" },
        { name: "المُثَلَّثُ المُتَساوي الأضلاعِ", color: "#3e9b4f" },
        { name: "المُثَلَّثُ المُختَلِفُ الأضلاعِ", color: "#e8862e" },
        { name: "المُرَبَّعُ",                   color: "#3e9b4f" },
        { name: "الرُّباعِيُّ غَيرُ المُنتَظِمِ",   color: "#e8862e" },
        { name: "العَلَمُ",                     color: "#e8862e" }
      ],
      svg: `<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ستة أشكال للتلوين: منها المتماثل ومنها غير المتماثل">
        <g class="cpart" data-name="القَلبُ" id="part-heart">
          <path d="M450,130 C420,105 405,88 405,72 C405,58 416,48 429,48 C438,48 446,53 450,62 C454,53 462,48 471,48 C484,48 495,58 495,72 C495,88 480,105 450,130 Z"/>
        </g>
        <g class="cpart" data-name="المُثَلَّثُ المُتَساوي الأضلاعِ" id="part-eqtri">
          <polygon points="280,45 235,140 325,140"/>
        </g>
        <g class="cpart" data-name="المُثَلَّثُ المُختَلِفُ الأضلاعِ" id="part-sctri">
          <polygon points="70,140 160,140 90,50"/>
        </g>
        <g class="cpart" data-name="المُرَبَّعُ" id="part-square">
          <rect x="405" y="200" width="90" height="90"/>
        </g>
        <g class="cpart" data-name="الرُّباعِيُّ غَيرُ المُنتَظِمِ" id="part-quad">
          <polygon points="235,290 330,275 305,205 250,220"/>
        </g>
        <g class="cpart" data-name="العَلَمُ" id="part-flag">
          <rect x="138" y="195" width="8" height="110"/>
          <polygon points="138,200 60,220 138,240"/>
        </g>
      </svg>`
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٩-١: صناعة علبة (كتاب التلميذ ص٢٢، الوحدة ١ج)
  // التوزيع المعرفي (رياضيات): ٢ معرفة + ٢ تطبيق + ١ استدلال + إثرائي اختياري
  "g2m-9-1": [

    // ① صواب وخطأ — معرفة — 2Ml1
    {
      type: "true-false",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      statement: "نَقيسُ طولَ القَلَمِ بِالسَّنتيمِتراتِ.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Ml1
    {
      type: "mcq",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "أيُّ أداةٍ نَستَخدِمُها لِقِياسِ طولِ ضِلعِ العُلبةِ؟",
      options: ["المِسطَرةُ", "الميزانُ", "السّاعةُ", "المِقياسُ الحَرارِيُّ"],
      answer: 0
    },

    // ③ قراءة أداة القياس (مسطرة) — تطبيق — 2Ml1
    {
      type: "measure-tool",
      mode: "ruler-read",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "صَنَعَ سالِمٌ عُلبةً — اقرَأِ المِسطَرةَ: كَمْ طولُ ضِلعِها بِالسَّنتيمِتراتِ؟",
      min: 0, max: 20, step: 1, labelEvery: 5, value: 8,
      unit: "سم", options: ["٨", "٥", "١٠", "١٢"]
    },

    // ④ ملء الفراغ بالسحب — تطبيق — 2Ml1
    {
      type: "fill-blank",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "أكمِلِ الجُملةَ بِسَحبِ الكَلِمةِ المُناسِبةِ.",
      text: "نَقيسُ طولَ العُلبةِ بِوَحدةِ {}، وكُلَّما زادَ عَدَدُ السَّنتيمِتراتِ كانَ الجِسمُ {}",
      answers: ["السَّنتيمِترِ", "أطوَلَ"],
      distractors: ["الجرامِ", "أقصَرَ"]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Ml1
    {
      type: "sequence",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "رَتِّبِ الأشياءَ مِنَ الأقصَرِ إلى الأطوَلِ.",
      steps: ["مِشبَكُ الوَرَقِ", "قَلَمُ الرَّصاصِ", "المِسطَرةُ", "عَصا المِكنَسةِ"]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Ml1
    {
      type: "exclude",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "ثَلاثٌ مِنْ هذِهِ الأدَواتِ تَقيسُ الطّولَ وواحِدةٌ دَخيلةٌ — اضغَطْ عَلى الدَّخيلةِ.",
      options: ["المِسطَرةُ", "شَريطُ القِياسِ", "المِترُ الخَشَبِيُّ", "الميزانُ"],
      answer: 3,
      reason: "الميزانُ يَقيسُ الكُتلةَ لا الطّولَ."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٩-٢: قياس المسافة (كتاب التلميذ ص٢٣، الوحدة ١ج)
  "g2m-9-2": [

    // ① اختيار من متعدد — معرفة — 2Ml1
    {
      type: "mcq",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "بِأَيِّ وَحدةٍ نَقيسُ المَسافةَ بَينَ بابِ الصَّفِّ والسَّبّورةِ؟",
      options: ["المِترِ", "الجرامِ", "الدَّقيقةِ", "اللِّترِ"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Ml1
    {
      type: "true-false",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      statement: "المِترُ الواحِدُ أطوَلُ مِنَ السَّنتيمِترِ الواحِدِ.",
      answer: true
    },

    // ③ المقارنة — تطبيق — 2Ml1
    {
      type: "compare",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "قارِنْ بَينَ المَسافَتَينِ: ضَعِ الرَّمزَ المُناسِبَ.",
      unit: "سم",
      pairs: [ { a: "٣٥", b: "٥٣" }, { a: "٦٠", b: "٦٠" }, { a: "٤٨", b: "٢٩" } ]
    },

    // ④ خط الأعداد — تطبيق — 2Nn9
    {
      type: "number-line",
      mode: "place",
      objective: "2Nn9: يذكر عدداً بين أي عددين متجاورين من أضعاف العشرة",
      level: "application",
      prompt: "قَفَزَ الأرنَبُ مَسافةَ ٤٥ سَنتيمِتراً — ضَعِ المُؤشِّرَ عَلى العَدَدِ ٤٥.",
      min: 40, max: 50, step: 1, labelEvery: 10,
      target: 45
    },

    // ⑤ التصنيف — استدلال — 2Ml1
    {
      type: "classify",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "بِمَ نَقيسُ كُلًّا مِمّا يَلي؟ صَنِّفْ.",
      groups: [
        { name: "بِالسَّنتيمِترِ", items: ["طولُ القَلَمِ", "طولُ الكِتابِ"] },
        { name: "بِالمِترِ", items: ["طولُ المَمَرِّ", "عَرضُ المَلعَبِ"] }
      ]
    },

    // ⑥ الشريط المتدرّج (إثرائي اختياري) — تطبيق — 2Ml1
    {
      type: "slider",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "قَدِّرْ: كَمْ سَنتيمِتراً يَبلُغُ طولُ قَلَمِ الرَّصاصِ الجَديدِ تَقريباً؟",
      min: 0, max: 30, answer: 15, tolerance: 3, unit: "سم", ticks: 5
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ٩-٣: صناعة أجسام متحركة (كتاب التلميذ ص٢٤، الوحدة ١ج)
  "g2m-9-3": [

    // ① اختيار من متعدد — معرفة — 2Ml1
    {
      type: "mcq",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "صَنَعَ التَّلاميذُ عَرَباتٍ تَتَدَحرَجُ — بِأَيِّ أداةٍ يَقيسونَ مَسافةَ تَدَحرُجِها؟",
      options: ["شَريطِ القِياسِ", "الميزانِ", "السّاعةِ", "المِقياسِ الحَرارِيِّ"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nn1
    {
      type: "true-false",
      objective: "2Nn1: يعدّ ويقرأ ويكتب الأعداد حتى ١٠٠ كحد أدنى، تصاعدياً وتنازلياً",
      level: "knowledge",
      statement: "العَدَدُ الَّذي يَأتي قَبلَ ٦٠ مُباشَرةً هو ٥٩.",
      answer: true
    },

    // ③ قراءة أداة القياس (مسطرة) — تطبيق — 2Ml1
    {
      type: "measure-tool",
      mode: "ruler-read",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "تَدَحرَجَتْ عَرَبةُ أحمَدَ ثُمَّ تَوَقَّفَتْ — اقرَأِ المِسطَرةَ: كَمْ سَنتيمِتراً قَطَعَتْ؟",
      min: 0, max: 20, step: 1, labelEvery: 5, value: 14,
      unit: "سم", options: ["١٤", "١٢", "١٦", "٩"]
    },

    // ④ العد بالنقر — تطبيق — 2Nn2
    {
      type: "count-tap",
      mode: "each",
      objective: "2Nn2: يعدّ حتى ١٠٠ عنصر (مثال: عدّ الخرز على الشريط)",
      level: "application",
      prompt: "انقُرْ ٦ عَرَباتٍ مِنَ العَرَباتِ المُتَسابِقةِ وعُدَّها.",
      glyph: "🚗", count: 10, target: 6
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Ml1
    {
      type: "sequence",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "تَدَحرَجَتِ العَرَباتُ ثُمَّ تَوَقَّفَتْ — رَتِّبِ المَسافاتِ مِنَ الأقصَرِ إلى الأبعَدِ.",
      steps: ["٢٥ سم", "٤٠ سم", "٥٢ سم", "٧٠ سم"]
    },

    // ⑥ اكتشف الخطأ (إثرائي اختياري) — استدلال — 2Pt3
    // عربة خشبية بثلاث عجلات دائرية وواحدة مربعة — الخطأ الذي يمنع التدحرج.
    // النموذج الأول لقاعدة التفصيل البصري (CLAUDE.md): مكونات طبيعية (ألواح، مسامير،
    // حافة معدنية، مقبض بيد، عجلات بصرة وأضلاع) + عمق مسطح (ظل أرضي وخط أرض)؛
    // وبند الترقية إلى مستوى فن المنصة مسجل في graphics-queue.md.
    {
      type: "find-error",
      objective: "2Pt3: يستكشف المسائل العددية والألغاز",
      level: "reasoning",
      prompt: "في هذِهِ العَرَبةِ خَطَأٌ يَمنَعُها مِنَ التَّدَحرُجِ — اضغَطْ عَلَيهِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="عربة خشبية مفصلة بثلاث عجلات دائرية وعجلة مربعة">
        <ellipse cx="465" cy="362" rx="340" ry="10" fill="#e8dfc9"/>
        <line x1="40" y1="360" x2="860" y2="360" stroke="#c9b189" stroke-width="6" stroke-linecap="round"/>
        <rect x="180" y="108" width="540" height="152" rx="12" fill="#d9a05b" stroke="#8a5a2b" stroke-width="6"/>
        <line x1="186" y1="146" x2="714" y2="146" stroke="#b97f3e" stroke-width="4"/>
        <line x1="186" y1="184" x2="714" y2="184" stroke="#b97f3e" stroke-width="4"/>
        <line x1="186" y1="222" x2="714" y2="222" stroke="#b97f3e" stroke-width="4"/>
        <line x1="320" y1="114" x2="320" y2="254" stroke="#b97f3e" stroke-width="4"/>
        <line x1="460" y1="114" x2="460" y2="254" stroke="#b97f3e" stroke-width="4"/>
        <line x1="600" y1="114" x2="600" y2="254" stroke="#b97f3e" stroke-width="4"/>
        <circle cx="205" cy="127" r="6" fill="#6b4423"/>
        <circle cx="695" cy="127" r="6" fill="#6b4423"/>
        <circle cx="205" cy="241" r="6" fill="#6b4423"/>
        <circle cx="695" cy="241" r="6" fill="#6b4423"/>
        <rect x="170" y="94" width="560" height="22" rx="10" fill="#aab4bd" stroke="#5b6770" stroke-width="5"/>
        <line x1="200" y1="94" x2="200" y2="52" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/>
        <polygon points="200,54 152,64 200,78" fill="#d94f4f" stroke="#a33636" stroke-width="3"/>
        <line x1="725" y1="140" x2="845" y2="88" stroke="#5b6770" stroke-width="10" stroke-linecap="round"/>
        <circle cx="852" cy="85" r="15" fill="#e8862e" stroke="#8a4a1f" stroke-width="5"/>
        <rect x="252" y="250" width="16" height="18" fill="#5b6770"/>
        <rect x="392" y="250" width="16" height="18" fill="#5b6770"/>
        <rect x="532" y="250" width="16" height="18" fill="#5b6770"/>
        <rect x="662" y="250" width="16" height="18" fill="#5b6770"/>
        <circle cx="260" cy="310" r="48" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <circle cx="260" cy="310" r="34" fill="none" stroke="#c8791f" stroke-width="4"/>
        <line x1="226" y1="310" x2="294" y2="310" stroke="#c8791f" stroke-width="5"/>
        <line x1="260" y1="276" x2="260" y2="344" stroke="#c8791f" stroke-width="5"/>
        <circle cx="260" cy="310" r="9" fill="#8a5a2b"/>
        <circle cx="400" cy="310" r="48" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <circle cx="400" cy="310" r="34" fill="none" stroke="#c8791f" stroke-width="4"/>
        <line x1="366" y1="310" x2="434" y2="310" stroke="#c8791f" stroke-width="5"/>
        <line x1="400" y1="276" x2="400" y2="344" stroke="#c8791f" stroke-width="5"/>
        <circle cx="400" cy="310" r="9" fill="#8a5a2b"/>
        <circle cx="540" cy="310" r="48" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <circle cx="540" cy="310" r="34" fill="none" stroke="#c8791f" stroke-width="4"/>
        <line x1="506" y1="310" x2="574" y2="310" stroke="#c8791f" stroke-width="5"/>
        <line x1="540" y1="276" x2="540" y2="344" stroke="#c8791f" stroke-width="5"/>
        <circle cx="540" cy="310" r="9" fill="#8a5a2b"/>
        <rect x="622" y="262" width="96" height="96" fill="#f2c14e" stroke="#c8791f" stroke-width="6"/>
        <rect x="636" y="276" width="68" height="68" fill="none" stroke="#c8791f" stroke-width="4"/>
        <line x1="636" y1="310" x2="704" y2="310" stroke="#c8791f" stroke-width="5"/>
        <line x1="670" y1="276" x2="670" y2="344" stroke="#c8791f" stroke-width="5"/>
        <circle cx="670" cy="310" r="9" fill="#8a5a2b"/>
      </svg>`,
      spot: { x: 74, y: 76, r: 11 }
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٠-١: قياس الوقت (كتاب التلميذ ص٢٥، الوحدة ١ج)
  "g2m-10-1": [

    // ① اختيار من متعدد — معرفة — 2Mt1
    {
      type: "mcq",
      objective: "2Mt1: يعرف وحدات قياس الوقت (ثوانٍ، دقائق، ساعات، أيام، أسابيع، أشهر، سنوات)",
      level: "knowledge",
      prompt: "أيُّ هذِهِ الوَحَداتِ نَقيسُ بِها الوَقتَ؟",
      options: ["الدَّقيقةُ", "المِترُ", "الجرامُ", "السَّنتيمِترُ"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Mt2
    {
      type: "true-false",
      objective: "2Mt2: يعرف العلاقات بين وحدات الوقت المتتالية",
      level: "knowledge",
      statement: "في الدَّقيقةِ الواحِدةِ ٦٠ ثانِيةً.",
      answer: true
    },

    // ③ الساعة التفاعلية (قراءة) — تطبيق — 2Mt1
    // ثلاثة خيارات لا أربعة: الميناء طويل، وبأربعة خيارات سقط السؤال إلى الحاوية
    // المرنة (قاعدة فحص الإطار في CLAUDE.md) — بثلاثة يدخل إطار tall الحقيقي.
    {
      type: "clock",
      mode: "read",
      objective: "2Mt1: يعرف وحدات قياس الوقت (ثوانٍ، دقائق، ساعات، أيام، أسابيع، أشهر، سنوات)",
      level: "application",
      prompt: "انظُرْ إلى السّاعةِ: كَمِ الوَقتُ؟",
      target: "٣:٣٠",
      options: ["٣:٣٠", "٦:١٥", "٩:٣٠"]
    },

    // ④ ملء الفراغ بالسحب — تطبيق — 2Mt2
    {
      type: "fill-blank",
      objective: "2Mt2: يعرف العلاقات بين وحدات الوقت المتتالية",
      level: "application",
      prompt: "أكمِلِ الجُملةَ بِسَحبِ العَدَدِ المُناسِبِ.",
      text: "في السّاعةِ الواحِدةِ {} دَقيقةً، وفي الأُسبوعِ {} أيّامٍ.",
      answers: ["٦٠", "٧"],
      distractors: ["٢٤", "١٢"]
    },

    // ⑤ التصنيف — استدلال — 2Mt4
    {
      type: "classify",
      objective: "2Mt4: يقيس وقت تنفيذ الأنشطة بالثواني والدقائق",
      level: "reasoning",
      prompt: "كَمْ يَستَغرِقُ كُلُّ نَشاطٍ؟ صَنِّفْ.",
      groups: [
        { name: "يَستَغرِقُ ثَوانِيَ", items: ["تَصفيقةٌ واحِدةٌ", "غَمضةُ عَينٍ"] },
        { name: "يَستَغرِقُ دَقائِقَ", items: ["سَلقُ البَيضةِ", "تَنظيفُ الصَّفِّ"] }
      ]
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — معرفة — 2Mt2
    {
      type: "memory",
      objective: "2Mt2: يعرف العلاقات بين وحدات الوقت المتتالية",
      level: "knowledge",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتُطابِقَ كُلَّ وَحدةِ وَقتٍ بِما يُساويها.",
      pairs: [
        { a: "الدَّقيقةُ", b: "٦٠ ثانِيةً" },
        { a: "السّاعةُ",  b: "٦٠ دَقيقةً" },
        { a: "اليَومُ",   b: "٢٤ ساعةً" },
        { a: "الأُسبوعُ", b: "٧ أيّامٍ" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٠-٢: قياس المسافة (كتاب التلميذ ص٢٦، الوحدة ١ج)
  "g2m-10-2": [

    // ① صواب وخطأ — معرفة — 2Ml1
    {
      type: "true-false",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      statement: "نَقيسُ المَسافةَ الَّتي يَقفِزُها التِّلميذُ بِالسَّنتيمِتراتِ.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Ml1
    {
      type: "mcq",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "قَفَزَ ناصِرٌ مَسافةً طولُها ٩٥ سَنتيمِتراً — أيُّ أداةٍ تَصلُحُ لِقِياسِها؟",
      options: ["شَريطُ القِياسِ", "الميزانُ", "المِقياسُ الحَرارِيُّ", "السّاعةُ"],
      answer: 0
    },

    // ③ قراءة التمثيل البياني — تطبيق — 2Dh1
    {
      type: "chart-read",
      mode: "read",
      objective: "2Dh1: يجمع ويسجل بيانات في لوائح وجداول ويمثلها برسم بياني أو توضيحي",
      level: "application",
      prompt: "يُبَيِّنُ التَّمثيلُ مَسافاتِ قَفزِ ثَلاثةِ تَلاميذَ — كَمْ سَنتيمِتراً قَفَزَ سالِمٌ؟",
      series: [
        { label: "سالِم",  value: 60 },
        { label: "بَدر",   value: 80 },
        { label: "عَلياء", value: 50 }
      ],
      step: 10, yTitle: "المَسافةُ بِالسَّنتيمِترِ",
      options: ["٦٠", "٨٠", "٥٠", "٧٠"],
      answer: "٦٠"
    },

    // ④ المقارنة — تطبيق — 2Ml1
    {
      type: "compare",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "قارِنْ بَينَ مَسافاتِ القَفزِ: ضَعِ الرَّمزَ المُناسِبَ.",
      unit: "سم",
      pairs: [ { a: "٦٢", b: "٢٦" }, { a: "٤٥", b: "٥٤" }, { a: "٨٠", b: "٨٠" } ]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Ml1
    {
      type: "sequence",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "رَتِّبْ مَسافاتِ القَفزِ مِنَ الأقصَرِ إلى الأبعَدِ.",
      steps: ["٤٨ سم", "٥٦ سم", "٦٥ سم", "٨٢ سم"]
    },

    // ⑥ الشريط المتدرّج (إثرائي اختياري) — تطبيق — 2Ml1
    {
      type: "slider",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "قَدِّرْ: كَمْ سَنتيمِتراً يَبلُغُ طولُ خُطوَتِكَ الواحِدةِ تَقريباً؟",
      min: 0, max: 100, answer: 40, tolerance: 10, unit: "سم", ticks: 20
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٠-٣: قياس الارتفاع (كتاب التلميذ ص٢٧، الوحدة ١ج)
  "g2m-10-3": [

    // ① اختيار من متعدد — معرفة — 2Ml1
    {
      type: "mcq",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "بِأَيِّ وَحدةٍ نَقيسُ ارتِفاعَ بابِ الصَّفِّ؟",
      options: ["المِترِ", "الجرامِ", "الثّانِيةِ", "اللِّترِ"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Ml1
    {
      type: "true-false",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      statement: "ارتِفاعُ النَّخلةِ أكبَرُ مِنِ ارتِفاعِ شُجَيرةِ الوَردِ.",
      answer: true
    },

    // ③ قراءة أداة القياس (مسطرة) — تطبيق — 2Ml1
    {
      type: "measure-tool",
      mode: "ruler-read",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "زَرَعَ الصَّفُّ نَبتةً وقاسوا ارتِفاعَها — اقرَأِ المِسطَرةَ: كَمْ سَنتيمِتراً بَلَغَ؟",
      min: 0, max: 20, step: 1, labelEvery: 5, value: 7,
      unit: "سم", options: ["٧", "٥", "٩", "١٧"]
    },

    // ④ ملء الفراغ بالسحب — تطبيق — 2Ml1
    {
      type: "fill-blank",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "أكمِلِ الجُملةَ بِسَحبِ الكَلِمةِ المُناسِبةِ.",
      text: "نَقيسُ ارتِفاعَ البِنايةِ بِوَحدةِ {}، ونَقيسُ ارتِفاعَ كوبِ الماءِ بِوَحدةِ {}",
      answers: ["المِترِ", "السَّنتيمِترِ"],
      distractors: ["الجرامِ", "اللِّترِ"]
    },

    // ⑤ التصنيف — استدلال — 2Ml1
    {
      type: "classify",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "صَنِّفِ الأشياءَ حَسَبَ ارتِفاعِها.",
      groups: [
        { name: "أطوَلُ مِنْ مِترٍ", items: ["بابُ الصَّفِّ", "النَّخلةُ"] },
        { name: "أقصَرُ مِنْ مِترٍ", items: ["قَلَمُ الرَّصاصِ", "كوبُ الماءِ"] }
      ]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Ml1
    {
      type: "exclude",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ الأشياءِ عالِيةٌ مُرتَفِعةٌ وواحِدٌ دَخيلٌ — اضغَطْ عَلى الدَّخيلِ.",
      options: ["الزَّرافةُ", "النَّخلةُ", "المِئذَنةُ", "المِشبَكُ"],
      answer: 3,
      reason: "المِشبَكُ صَغيرٌ قَصيرٌ، وباقي الأشياءِ عالِيةٌ مُرتَفِعةٌ."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١١-١: قياس المكونات (كتاب التلميذ ص٢٨، الوحدة ١ج)
  "g2m-11-1": [

    // ① اختيار من متعدد — معرفة — 2Ml1
    {
      type: "mcq",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "أرادَتْ أُمُّ خالِدٍ وَزنَ الدَّقيقِ لِعَمَلِ البَسكَويتِ — أيُّ أداةٍ تَستَخدِمُ؟",
      options: ["الميزانَ", "المِسطَرةَ", "السّاعةَ", "شَريطَ القِياسِ"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Ml1
    {
      type: "true-false",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      statement: "نَقيسُ كُتلةَ السُّكَّرِ بِالجراماتِ.",
      answer: true
    },

    // ③ قراءة أداة القياس (ميزان) — تطبيق — 2Ml1
    {
      type: "measure-tool",
      mode: "scale-read",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "وَضَعَتْ أُمُّ خالِدٍ الدَّقيقَ عَلى الميزانِ — اقرَأِ المُؤشِّرَ: كَمْ جراماً؟",
      min: 0, max: 1000, step: 50, labelEvery: 2, value: 400,
      unit: "جرام", options: ["٤٠٠", "٣٠٠", "٥٠٠", "٤٥٠"]
    },

    // ④ المقارنة — تطبيق — 2Ml1
    {
      type: "compare",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "application",
      prompt: "قارِنْ بَينَ كُتلَتَيِ المُكَوِّنَينِ في كُلِّ صَفٍّ.",
      unit: "جرام",
      pairs: [ { a: "٢٥٠", b: "٥٢٠" }, { a: "٣٠٠", b: "٣٠٠" }, { a: "٤٥٠", b: "٤٠٥" } ]
    },

    // ⑤ التصنيف — استدلال — 2Ml1
    {
      type: "classify",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "reasoning",
      prompt: "صَنِّفِ الأشياءَ حَسَبَ كُتلَتِها.",
      groups: [
        { name: "أثقَلُ مِنْ كيلوجرامٍ", items: ["البِطّيخةُ", "دَلوُ الماءِ"] },
        { name: "أخَفُّ مِنْ كيلوجرامٍ", items: ["الرّيشةُ", "مِلعَقةُ السُّكَّرِ"] }
      ]
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — معرفة — 2Ml1
    {
      type: "memory",
      objective: "2Ml1: يقدّر ويقيس ويقارن الأطوال والكتل والسعات بوحدات مناسبة وأدوات قياس مناسبة",
      level: "knowledge",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتُطابِقَ كُلَّ أداةٍ بِما تَقيسُهُ.",
      pairs: [
        { a: "الميزانُ",          b: "الكُتلةُ" },
        { a: "المِسطَرةُ",        b: "الطّولُ" },
        { a: "السّاعةُ",          b: "الوَقتُ" },
        { a: "الكوبُ المُدَرَّجُ", b: "السَّعةُ" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١١-٢: وقت الطهي (كتاب التلميذ ص٢٩، الوحدة ١ج)
  "g2m-11-2": [

    // ① صواب وخطأ — معرفة — 2Mt1
    {
      type: "true-false",
      objective: "2Mt1: يعرف وحدات قياس الوقت (ثوانٍ، دقائق، ساعات، أيام، أسابيع، أشهر، سنوات)",
      level: "knowledge",
      statement: "نَقيسُ وَقتَ خَبزِ البَسكَويتِ بِالدَّقائِقِ.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Mt4
    {
      type: "mcq",
      objective: "2Mt4: يقيس وقت تنفيذ الأنشطة بالثواني والدقائق",
      level: "knowledge",
      prompt: "سَلقُ البَيضةِ يَستَغرِقُ ١٠ ...",
      options: ["دَقائِقَ", "ثَوانٍ", "أيّامٍ", "أسابيعَ"],
      answer: 0
    },

    // ③ الساعة التفاعلية (الزمن المنقضي) — تطبيق — 2Mt4
    {
      type: "clock",
      mode: "elapsed",
      objective: "2Mt4: يقيس وقت تنفيذ الأنشطة بالثواني والدقائق",
      level: "application",
      prompt: "وَضَعَتْ أُمُّ سالِمٍ البَسكَويتَ في الفُرنِ السّاعةَ ٤:٠٠ وهو يَحتاجُ ٣٠ دَقيقةً — اضبِطِ السّاعةَ عَلى وَقتِ إخراجِهِ.",
      start: "٤:٠٠", minutes: 30
    },

    // ④ بناء المعادلة — تطبيق — 2Mt4
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Mt4: يقيس وقت تنفيذ الأنشطة بالثواني والدقائق",
      level: "application",
      prompt: "يَحتاجُ الكَعكُ ٢٠ دَقيقةً في الفُرنِ و١٠ دَقائِقَ لِيَبرُدَ — كَمْ دَقيقةً نَنتَظِرُ؟ أكمِلْ.",
      tokens: ["٢٠", "+", "١٠", "=", "__"],
      bank: ["٣٠", "٢٥", "٤٠", "١٥"],
      answers: ["٣٠"]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Mt4
    {
      type: "sequence",
      objective: "2Mt4: يقيس وقت تنفيذ الأنشطة بالثواني والدقائق",
      level: "reasoning",
      prompt: "رَتِّبْ خُطُواتِ صُنعِ البَسكَويتِ مِنَ البِدايةِ إلى النِّهايةِ.",
      steps: ["نَخلِطُ المُكَوِّناتِ", "نُشَكِّلُ العَجينَ", "نَخبِزُهُ في الفُرنِ", "نَترُكُهُ لِيَبرُدَ"]
    },

    // ⑥ الشريط المتدرّج (إثرائي اختياري) — تطبيق — 2Mt4
    {
      type: "slider",
      objective: "2Mt4: يقيس وقت تنفيذ الأنشطة بالثواني والدقائق",
      level: "application",
      prompt: "قَدِّرْ: كَمْ دَقيقةً يَستَغرِقُ سَلقُ البَيضةِ تَقريباً؟",
      min: 0, max: 30, answer: 10, tolerance: 3, unit: "دقيقة", ticks: 5
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١١-٣: البسكويت الثمين (كتاب التلميذ ص٣٠، الوحدة ١ج)
  "g2m-11-3": [

    // ① اختيار من متعدد — معرفة — 2Mm2
    {
      type: "mcq",
      objective: "2Mm2: يستخدم صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "knowledge",
      prompt: "كَمْ بَيسةً في الرِّيالِ العُمانِيِّ الواحِدِ؟",
      options: ["١٠٠٠", "١٠٠", "٥٠٠", "١٠"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Mm2
    {
      type: "true-false",
      objective: "2Mm2: يستخدم صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "knowledge",
      statement: "نِصفُ رِيالٍ عُمانِيٍّ يُساوي ٥٠٠ بَيسةٍ.",
      answer: true
    },

    // ③ النقود العُمانية — تطبيق — 2Mm3
    {
      type: "money",
      mode: "pay",
      objective: "2Mm3: يجد المجاميع والأوراق النقدية لدفع مبلغ؛ ويجد الباقي",
      level: "application",
      prompt: "ثَمَنُ كيسِ البَسكَويتِ ١٥٠ بَيسةً — كَوِّنِ المَبلَغَ مِنَ الرَّفِّ.",
      target: 150, rack: [25, 50, 100, 200]
    },

    // ④ بناء المعادلة — تطبيق — 2Mm3
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Mm3: يجد المجاميع والأوراق النقدية لدفع مبلغ؛ ويجد الباقي",
      level: "application",
      prompt: "ثَمَنُ البَسكَويتةِ ٥٠ بَيسةً، واشتَرى ناصِرٌ بَسكَويتَتَينِ — أكمِلْ ثَمَنَهُما.",
      tokens: ["٥٠", "+", "٥٠", "=", "__"],
      bank: ["١٠٠", "٥٠", "١٥٠", "٢٠٠"],
      answers: ["١٠٠"]
    },

    // ⑤ ملء الفراغ بالسحب — استدلال — 2Mm3
    {
      type: "fill-blank",
      objective: "2Mm3: يجد المجاميع والأوراق النقدية لدفع مبلغ؛ ويجد الباقي",
      level: "reasoning",
      prompt: "ثَمَنُ البَسكَويتةِ ٧٥ بَيسةً — أكمِلْ بِسَحبِ الإجابةِ الصَّحيحةِ.",
      text: "دَفَعَ سالِمٌ ١٠٠ بَيسةٍ فَيَكونُ الباقي {} بَيسةً، ولَو دَفَعَ ٧٥ بَيسةً لَكانَ الباقي {}",
      answers: ["٢٥", "صِفراً"],
      distractors: ["٥٠", "١٧٥"]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Mm1
    {
      type: "exclude",
      objective: "2Mm1: يعرف كل الأوراق النقدية",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ مَبالِغُ نَقدِيّةٌ وواحِدٌ دَخيلٌ — اضغَطْ عَلى الدَّخيلِ.",
      options: ["١٠٠ بَيسةٍ", "نِصفُ رِيالٍ", "رِيالٌ واحِدٌ", "٥ سَنتيمِتراتٍ"],
      answer: 3,
      reason: "السَّنتيمِترُ وَحدةُ طولٍ، ولَيسَ نُقوداً."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٢-١: العشرات والآحاد حتى ١٠٠ (كتاب التلميذ ص٣١، الوحدة ٢أ)
  "g2m-12-1": [

    // ④ صواب وخطأ (الأسهل) — 2Nn6
    {
      type: "true-false",
      objective: "2Nn6: يعرف ما يمثّله كل رقم في الأعداد المكوّنة من رقمين؛ ويجزّئ العدد إلى عشرات وآحاد",
      level: "knowledge",
      statement: "العددُ ٦٠ فيهِ ٦ عَشَراتٍ و٠ آحاد.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Nn6
    {
      type: "mcq",
      objective: "2Nn6: يعرف ما يمثّله كل رقم في الأعداد المكوّنة من رقمين؛ ويجزّئ العدد إلى عشرات وآحاد",
      level: "knowledge",
      prompt: "ما قيمةُ الرقمِ ٥ في العددِ ٥٨؟",
      options: ["٥ عَشَرات", "٥ آحاد", "٨ عَشَرات", "٥ عَشَرات و٨ آحاد"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 2Nn6
    {
      type: "fill-blank",
      objective: "2Nn6: يعرف ما يمثّله كل رقم في الأعداد المكوّنة من رقمين؛ ويجزّئ العدد إلى عشرات وآحاد",
      level: "application",
      prompt: "أكملِ الجملةَ بسحبِ الرقمِ المناسبِ إلى كلِّ فراغ.",
      text: "العددُ ٧٣ فيهِ {} عَشَراتٍ و {} آحاد.",
      answers: ["٧", "٣"],
      distractors: ["٣٧", "١٠"]
    },

    // ② توصيل — 2Nn6 (فكرة بطاقات القيمة المكانية)
    {
      type: "matching",
      objective: "2Nn6: يعرف ما يمثّله كل رقم في الأعداد المكوّنة من رقمين؛ ويجزّئ العدد إلى عشرات وآحاد",
      level: "application",
      prompt: "صِلْ كلَّ عددٍ بعشراتِهِ وآحادِهِ.",
      pairs: [
        { a: "٣٧", b: "٣ عَشَرات و ٧ آحاد" },
        { a: "٥٢", b: "٥ عَشَرات و ٢ آحاد" },
        { a: "٨٠", b: "٨ عَشَرات و ٠ آحاد" },
        { a: "٤٦", b: "٤ عَشَرات و ٦ آحاد" }
      ]
    },

    // ⑥ الترتيب التسلسلي — 2Nn3 (العدّ بالعشرات: كل عدد أكبر بعَشرة)
    {
      type: "sequence",
      objective: "2Nn3: يعدّ آحاداً وعشرات من عدد مكوّن من رقم أو رقمين، تصاعدياً وتنازلياً",
      level: "reasoning",
      prompt: "رتّبِ البطاقاتِ للعدِّ بالعشراتِ تصاعدياً.",
      steps: ["١٥", "٢٥", "٣٥", "٤٥"]
    },

    // ⑤ النقطة الساخنة (إثرائي) — 2Nn6
    {
      type: "hotspot",
      objective: "2Nn6: يعرف ما يمثّله كل رقم في الأعداد المكوّنة من رقمين؛ ويجزّئ العدد إلى عشرات وآحاد",
      level: "application",
      prompt: "اضغطْ على رقمِ العَشَراتِ في العددِ ٨٤.",
      bg: "#fdf9ee",
      svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="العدد ٨٤">
        <text x="120" y="140" font-size="140" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٨</text>
        <text x="240" y="140" font-size="140" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤</text>
      </svg>`,
      spot: { x: 33, y: 45, r: 17 }
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٢-٢: مقارنة وترتيب الأعداد (كتاب التلميذ ص٣٢، الوحدة ٢أ)
  "g2m-12-2": [

    // ① اختيار من متعدد — معرفة — 2Nn12
    {
      type: "mcq",
      objective: "2Nn12: يرتّب الأعداد حتى ١٠٠؛ ويقارن بين عددين بعلامتي < و>",
      level: "knowledge",
      prompt: "أيُّ هذِهِ الأعدادِ أكبَرُ مِنْ ٦٥؟",
      options: ["٧٢", "٥٦", "٦٤", "٦٠"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nn12
    {
      type: "true-false",
      objective: "2Nn12: يرتّب الأعداد حتى ١٠٠؛ ويقارن بين عددين بعلامتي < و>",
      level: "knowledge",
      statement: "العَدَدُ ٣٥ أكبَرُ مِنَ العَدَدِ ٥٣.",
      answer: false
    },

    // ③ المقارنة — تطبيق — 2Nn12
    {
      type: "compare",
      objective: "2Nn12: يرتّب الأعداد حتى ١٠٠؛ ويقارن بين عددين بعلامتي < و>",
      level: "application",
      prompt: "ضَعِ الرَّمزَ المُناسِبَ بَينَ كُلِّ عَدَدَينِ.",
      pairs: [ { a: "٣٤", b: "٤٣" }, { a: "٧٠", b: "٧٠" }, { a: "٥٨", b: "٤٩" } ]
    },

    // ④ القيمة المنزلية بالمكعبات — تطبيق — 2Nn6
    {
      type: "place-value",
      mode: "build",
      objective: "2Nn6: يعرف ما يمثّله كل رقم في الأعداد المكوّنة من رقمين؛ ويجزّئ العدد إلى عشرات وآحاد",
      level: "application",
      prompt: "ابنِ العَدَدَ ٤٧ بِالعَشَراتِ والآحادِ.",
      target: 47
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Nn12
    {
      type: "sequence",
      objective: "2Nn12: يرتّب الأعداد حتى ١٠٠؛ ويقارن بين عددين بعلامتي < و>",
      level: "reasoning",
      prompt: "رَتِّبِ الأعدادَ تَصاعُدِيّاً مِنَ الأصغَرِ إلى الأكبَرِ.",
      steps: ["٣٦", "٤٥", "٥٤", "٦٣"]
    },

    // ⑥ اكتشف الخطأ (إثرائي اختياري) — استدلال — 2Nn12
    // كل بطاقة تعرض مقارنة بترتيب رياضي (يسار→يمين) بعناصر نصية منفصلة الإحداثيات
    // كي لا يقلب الـbidi رمز المقارنة. الخاطئة: ٣٧ > ٧٣ (البطاقة اليسرى).
    {
      type: "find-error",
      objective: "2Nn12: يرتّب الأعداد حتى ١٠٠؛ ويقارن بين عددين بعلامتي < و>",
      level: "reasoning",
      prompt: "واحِدةٌ مِنَ المُقارَناتِ الثَّلاثِ خاطِئةٌ — اضغَطْ عَلَيها.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاث بطاقات مقارنة بين أعداد">
        <rect x="630" y="140" width="240" height="140" rx="20" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
        <text x="675" y="232" font-size="52" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٥</text>
        <text x="750" y="230" font-size="52" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">&gt;</text>
        <text x="825" y="232" font-size="52" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٢٣</text>
        <rect x="330" y="140" width="240" height="140" rx="20" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
        <text x="375" y="232" font-size="52" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥٠</text>
        <text x="450" y="230" font-size="52" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">=</text>
        <text x="525" y="232" font-size="52" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥٠</text>
        <rect x="30" y="140" width="240" height="140" rx="20" fill="#ffffff" stroke="#2f6fb0" stroke-width="5"/>
        <text x="75" y="232" font-size="52" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٧</text>
        <text x="150" y="230" font-size="52" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">&gt;</text>
        <text x="225" y="232" font-size="52" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٧٣</text>
      </svg>`,
      spot: { x: 17, y: 51, r: 13 }
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٣-١: التقدير (كتاب التلميذ ص٣٣، الوحدة ٢أ)
  "g2m-13-1": [

    // ① صواب وخطأ — معرفة — 2Nn13
    {
      type: "true-false",
      objective: "2Nn13: يعطي تقديراً منطقياً لعدد أشياء حتى ١٠٠",
      level: "knowledge",
      statement: "التَّقديرُ هو تَخمينٌ مَنطِقِيٌّ لِعَدَدِ الأشياءِ دونَ عَدِّها واحِداً واحِداً.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Nn13
    {
      type: "mcq",
      objective: "2Nn13: يعطي تقديراً منطقياً لعدد أشياء حتى ١٠٠",
      level: "knowledge",
      prompt: "قالَتِ المُعَلِّمةُ: في الصَّفِّ حَوالَيْ ٣٠ تِلميذاً — كَلِمةُ «حَوالَيْ» تَعني أنَّ العَدَدَ ...",
      options: ["تَقديرِيٌّ قَريبٌ مِنْ ٣٠", "مَضبوطٌ تَماماً", "أكبَرُ مِنْ ١٠٠", "أقَلُّ مِنْ ١٠"],
      answer: 0
    },

    // ③ العد بالنقر (قفز خمسات) — تطبيق — 2Nn4
    {
      type: "count-tap",
      mode: "step",
      objective: "2Nn4: يعدّ بزيادة اثنينات وخمسات وعشرات، والتجميع بالقفز لعدّ المجموعات الكبيرة",
      level: "application",
      prompt: "تَحَقَّقْ مِنَ التَّقديرِ بِالعَدِّ القَفزِيِّ: انقُرْ كُلَّ مَجموعةِ حَلوى حَتّى تَصِلَ إلى ٢٠.",
      glyph: "🍬", step: 5, groups: 4, target: 20
    },

    // ④ النقطة الساخنة — تطبيق — 2Nn13 (مرطبانان: قليل وكثير)
    // رسم مُغنى وفق قاعدة التفصيل البصري (CLAUDE.md): مرطبانان زجاجيان بغطاء
    // معدني بطبقتين وعنق ولمعة زجاج، وخرزات ملونة متنوعة مرصوصة، وظل وخط أرض.
    {
      type: "hotspot",
      objective: "2Nn13: يعطي تقديراً منطقياً لعدد أشياء حتى ١٠٠",
      level: "application",
      prompt: "انقُرِ المِرطَبانَ الَّذي فيهِ حَوالَيْ ٥٠ خَرَزةً.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مرطبانان زجاجيان: أحدهما فيه خرزات قليلة والآخر مملوء بخرزات كثيرة">
        <ellipse cx="250" cy="374" rx="130" ry="9" fill="#e8dfc9"/>
        <ellipse cx="650" cy="374" rx="130" ry="9" fill="#e8dfc9"/>
        <line x1="60" y1="372" x2="840" y2="372" stroke="#c9b189" stroke-width="5" stroke-linecap="round"/>
        <rect x="573" y="92" width="154" height="30" rx="10" fill="#9c7b3f" stroke="#6b4423" stroke-width="4"/>
        <rect x="563" y="120" width="174" height="22" rx="6" fill="#c8a76b" stroke="#6b4423" stroke-width="4"/>
        <rect x="545" y="140" width="210" height="230" rx="26" fill="#eaf6ff" stroke="#2f6fb0" stroke-width="6"/>
        <rect x="566" y="164" width="16" height="140" rx="8" fill="#ffffff"/>
        ${[[578,336],[614,336],[650,336],[686,336],[722,336],[596,308],[632,308],[668,308],[704,308],[614,280],[650,280],[686,280]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="15" fill="${['#e8862e','#3e9b4f','#d94f70','#f2c14e','#7f5bd5'][i%5]}" stroke="#5b4632" stroke-width="3"/>`).join("")}
        <rect x="173" y="92" width="154" height="30" rx="10" fill="#9c7b3f" stroke="#6b4423" stroke-width="4"/>
        <rect x="163" y="120" width="174" height="22" rx="6" fill="#c8a76b" stroke="#6b4423" stroke-width="4"/>
        <rect x="145" y="140" width="210" height="230" rx="26" fill="#eaf6ff" stroke="#2f6fb0" stroke-width="6"/>
        <rect x="166" y="164" width="16" height="140" rx="8" fill="#ffffff"/>
        ${Array.from({length:50},(_,i)=>{const row=Math.floor(i/7),col=i%7;const cx=174+col*24+(row%2?12:0);const cy=348-row*23;return `<circle cx="${cx}" cy="${cy}" r="11" fill="${['#e8862e','#3e9b4f','#d94f70','#f2c14e','#7f5bd5'][i%5]}" stroke="#5b4632" stroke-width="3"/>`;}).join("")}
      </svg>`,
      spot: { x: 28, y: 62, r: 14 }
    },

    // ⑤ إكمال النمط — استدلال — 2Nn4
    {
      type: "pattern",
      objective: "2Nn4: يعدّ بزيادة اثنينات وخمسات وعشرات، والتجميع بالقفز لعدّ المجموعات الكبيرة",
      level: "reasoning",
      prompt: "أكمِلِ النَّمَطَ لِتَعُدَّ المَجموعاتِ الكَبيرةَ بِسُرعةٍ.",
      items: ["١٠", "٢٠", "__", "٤٠", "__", "٦٠"],
      answers: ["٣٠", "٥٠"],
      distractors: ["٢٥", "٤٥"],
      rule: "نَعُدُّ بِالعَشَراتِ: نَزيدُ ١٠ كُلَّ مَرّةٍ"
    },

    // ⑥ الشريط المتدرّج (إثرائي اختياري) — استدلال — 2Nn13
    {
      type: "slider",
      objective: "2Nn13: يعطي تقديراً منطقياً لعدد أشياء حتى ١٠٠",
      level: "reasoning",
      prompt: "عَدَّ ناصِرٌ صَفّاً واحِداً مِنْ حَبّاتِ الحِمَّصِ فَوَجَدَ ١٠ حَبّاتٍ، والكيسُ فيهِ ٥ صُفوفٍ مِثلُهُ — قَدِّرِ العَدَدَ الكُلِّيَّ.",
      min: 0, max: 100, answer: 50, tolerance: 10, ticks: 20
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٤-١: الأزواج العددية لـ٢٠ (كتاب التلميذ ص٣٤، الوحدة ٢أ)
  "g2m-14-1": [

    // ① صواب وخطأ — معرفة — 2Nc1
    {
      type: "true-false",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      statement: "١٥ + ٥ = ٢٠",
      answer: true
    },

    // ② التوصيل — معرفة — 2Nc1
    {
      type: "matching",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَدَدٍ بِشَريكِهِ لِيَكونَ المَجموعُ ٢٠.",
      pairs: [
        { a: "١٢", b: "٨" },
        { a: "١٥", b: "٥" },
        { a: "١١", b: "٩" },
        { a: "١٤", b: "٦" }
      ]
    },

    // ③ بناء المعادلة — تطبيق — 2Nc1
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "application",
      prompt: "أكمِلِ الزَّوجَ العَدَدِيَّ لِلعِشرينَ.",
      tokens: ["١٣", "+", "__", "=", "٢٠"],
      bank: ["٧", "٦", "٨", "٣"],
      answers: ["٧"]
    },

    // ④ خط الأعداد (قفز) — تطبيق — 2Nc2
    {
      type: "number-line",
      mode: "jump",
      objective: "2Nc2: يجزّئ جميع الأعداد حتى ٢٠ إلى أزواج ويسجل حقائق الجمع والطرح المرتبطة بها",
      level: "application",
      prompt: "اقفِزْ مِنْ ١٤ قَفزَتَينِ كُلٌّ مِنهُما ٣ لِتَصِلَ إلى ٢٠.",
      min: 10, max: 20, step: 1, labelEvery: 5,
      jump: { start: 14, size: 3, count: 2 }
    },

    // ⑤ اختيار من متعدد — استدلال — 2Nc7
    {
      type: "mcq",
      objective: "2Nc7: يستخدم إشارة = للتعبير عن التساوي (١٦+٤ = ١٧+٣)",
      level: "reasoning",
      prompt: "أيُّ عِبارةٍ مِنْ هذِهِ العِباراتِ صَحيحةٌ؟",
      options: ["١٦ + ٤ = ١٧ + ٣", "١٦ + ٤ = ١٥ + ٣", "١٢ + ٨ = ١٣ + ٩", "١٠ + ٥ = ٢٠"],
      answer: 0
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — معرفة — 2Nc1
    {
      type: "memory",
      objective: "2Nc1: يجد ويحفظ غيباً كل الأزواج العددية للعدد ١٠ والأزواج بمجموع ٢٠",
      level: "knowledge",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: كُلُّ عَدَدَينِ مَجموعُهُما ٢٠ زَوجانِ مُتَطابِقانِ.",
      pairs: [
        { a: "١٦", b: "٤" },
        { a: "١٣", b: "٧" },
        { a: "١٨", b: "٢" },
        { a: "١٧", b: "٣" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٤-٢: المضاعفات — خطوط الضعف (كتاب التلميذ ص٣٥، الوحدة ٢أ)
  "g2m-14-2": [

    // ① اختيار من متعدد — معرفة — 2Nc5
    {
      type: "mcq",
      objective: "2Nc5: يجد ويتعلّم أضعاف جميع الأعداد حتى ١٠ و١٥ و٢٠ و٢٥ و٥٠",
      level: "knowledge",
      prompt: "ما ضِعفُ العَدَدِ ٥؟",
      options: ["١٠", "٧", "١٥", "٢٥"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nc5
    {
      type: "true-false",
      objective: "2Nc5: يجد ويتعلّم أضعاف جميع الأعداد حتى ١٠ و١٥ و٢٠ و٢٥ و٥٠",
      level: "knowledge",
      statement: "ضِعفُ العَدَدِ ١٠ هو ٢٠.",
      answer: true
    },

    // ③ بناء المعادلة — تطبيق — 2Nc5
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc5: يجد ويتعلّم أضعاف جميع الأعداد حتى ١٠ و١٥ و٢٠ و٢٥ و٥٠",
      level: "application",
      prompt: "ضِعفُ العَدَدِ هو جَمعُهُ مَعَ نَفسِهِ — أكمِلْ ضِعفَ السَّبعةِ.",
      tokens: ["٧", "+", "٧", "=", "__"],
      bank: ["١٤", "١٣", "١٥", "١٧"],
      answers: ["١٤"]
    },

    // ④ التوصيل — تطبيق — 2Nc5
    {
      type: "matching",
      objective: "2Nc5: يجد ويتعلّم أضعاف جميع الأعداد حتى ١٠ و١٥ و٢٠ و٢٥ و٥٠",
      level: "application",
      prompt: "صِلْ كُلَّ عَدَدٍ بِضِعفِهِ.",
      pairs: [
        { a: "٣",  b: "٦" },
        { a: "٦",  b: "١٢" },
        { a: "٩",  b: "١٨" },
        { a: "١٠", b: "٢٠" }
      ]
    },

    // ⑤ إكمال النمط — استدلال — 2Nc5
    {
      type: "pattern",
      objective: "2Nc5: يجد ويتعلّم أضعاف جميع الأعداد حتى ١٠ و١٥ و٢٠ و٢٥ و٥٠",
      level: "reasoning",
      prompt: "اكتَشِفِ القاعِدةَ وأكمِلِ النَّمَطَ.",
      items: ["١", "٢", "٤", "٨", "__"],
      answers: ["١٦"],
      distractors: ["١٠", "١٢"],
      rule: "كُلُّ عَدَدٍ ضِعفُ الَّذي قَبلَهُ"
    },

    // ⑥ التلوين بالتعليمات (إثرائي اختياري) — استدلال — 2Nn14
    // الضعف دائماً عدد زوجي: التلوين يفصل الأضعاف الزوجية عن الأعداد الفردية.
    {
      type: "color",
      objective: "2Nn14: يفهم الأعداد الفردية والزوجية ويميزها حتى ٢٠ على الأقل",
      level: "reasoning",
      prompt: "ضِعفُ أيِّ عَدَدٍ يَكونُ زَوجِيّاً — لَوِّنِ الأعدادَ الزَّوجِيّةَ بِالأخضَرِ والفَردِيّةَ بِالبُرتُقالِيِّ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر",    color: "#3e9b4f" },
        { name: "برتقالي", color: "#e8862e" }
      ],
      parts: [
        { name: "٨",  color: "#3e9b4f" },
        { name: "١١", color: "#e8862e" },
        { name: "١٤", color: "#3e9b4f" },
        { name: "٩",  color: "#e8862e" },
        { name: "٢٠", color: "#3e9b4f" },
        { name: "١٥", color: "#e8862e" }
      ],
      svg: `<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ستة أعداد في دوائر للتلوين">
        ${[{n:"٨",cx:450,cy:95},{n:"١١",cx:280,cy:95},{n:"١٤",cx:110,cy:95},{n:"٩",cx:450,cy:245},{n:"٢٠",cx:280,cy:245},{n:"١٥",cx:110,cy:245}].map(c=>`
        <g class="cpart" data-name="${c.n}" id="part-n${c.n}">
          <circle cx="${c.cx}" cy="${c.cy}" r="52"/>
          <text x="${c.cx}" y="${c.cy+17}" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">${c.n}</text>
        </g>`).join("")}
      </svg>`
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٤-٣: تصنيف الأعداد — الدخيل (كتاب التلميذ ص٣٦، الوحدة ٢أ)
  "g2m-14-3": [

    // ① صواب وخطأ — معرفة — 2Nn14
    {
      type: "true-false",
      objective: "2Nn14: يفهم الأعداد الفردية والزوجية ويميزها حتى ٢٠ على الأقل",
      level: "knowledge",
      statement: "العَدَدُ ١٤ عَدَدٌ زَوجِيٌّ.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Nn15
    {
      type: "mcq",
      objective: "2Nn15: يصنّف الأعداد (فردي/زوجي، مضاعفات ٢ و٥ و١٠)",
      level: "knowledge",
      prompt: "أيُّ هذِهِ الأعدادِ مِنْ مُضاعَفاتِ العَدَدِ ٥؟",
      options: ["٣٥", "٢٣", "١٧", "٤٢"],
      answer: 0
    },

    // ③ لوحة المائة (مضاعفات) — تطبيق — 2Nn15 (٦ أعمدة لخلايا أكبر — الحد المقيس)
    {
      type: "hundred-chart",
      mode: "multiples",
      objective: "2Nn15: يصنّف الأعداد (فردي/زوجي، مضاعفات ٢ و٥ و١٠)",
      level: "application",
      prompt: "لَوِّنْ مُضاعَفاتِ العَدَدِ ٥ في اللَّوحةِ.",
      from: 1, to: 30, columns: 6,
      multiple: 5
    },

    // ④ التصنيف — تطبيق — 2Nn14
    {
      type: "classify",
      objective: "2Nn14: يفهم الأعداد الفردية والزوجية ويميزها حتى ٢٠ على الأقل",
      level: "application",
      prompt: "صَنِّفِ الأعدادَ: زَوجِيٌّ أم فَردِيٌّ؟",
      groups: [
        { name: "زَوجِيٌّ", items: ["٨", "١٤"] },
        { name: "فَردِيٌّ", items: ["٧", "١٥"] }
      ]
    },

    // ⑤ التوصيل — استدلال — 2Dh2 (وصف بمعيارين مع استخدام «ليس»)
    {
      type: "matching",
      objective: "2Dh2: يستخدم مخططات فن وكارول للتصنيف وفق معيار واحد ثم معيارين",
      level: "reasoning",
      prompt: "صِلْ كُلَّ عَدَدٍ بِوَصفِهِ الصَّحيحِ.",
      pairs: [
        { a: "١٥", b: "فَردِيٌّ مِنْ مُضاعَفاتِ ٥" },
        { a: "١٠", b: "زَوجِيٌّ مِنْ مُضاعَفاتِ ٥" },
        { a: "٧",  b: "فَردِيٌّ لَيسَ مِنْ مُضاعَفاتِ ٥" },
        { a: "٨",  b: "زَوجِيٌّ لَيسَ مِنْ مُضاعَفاتِ ٥" }
      ]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nn15 (موضوع الدرس: الدخيل)
    {
      type: "exclude",
      objective: "2Nn15: يصنّف الأعداد (فردي/زوجي، مضاعفات ٢ و٥ و١٠)",
      level: "reasoning",
      prompt: "ثَلاثةُ أعدادٍ مِنْ مُضاعَفاتِ العَشَرةِ وواحِدٌ دَخيلٌ — اضغَطْ عَلَيهِ.",
      options: ["٣٠", "٧٠", "٩٠", "٤٥"],
      answer: 3,
      reason: "٤٥ لَيسَ مِنْ مُضاعَفاتِ العَشَرةِ — آحادُهُ لَيسَتْ صِفراً."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٥-١: الأعداد المكوّنة من رقم أو رقمين (كتاب التلميذ ص٣٧، الوحدة ٢أ)
  "g2m-15-1": [

    // ① صواب وخطأ — معرفة — 2Nn7
    {
      type: "true-false",
      objective: "2Nn7: يجد العدد أكثر/أقل بمقدار ١ أو ١٠ من أي عدد من رقمين",
      level: "knowledge",
      statement: "العَدَدُ الأكثَرُ بِمِقدارِ ١٠ مِنَ العَدَدِ ٣٤ هو ٤٤.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Nc11
    {
      type: "mcq",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "knowledge",
      prompt: "٢٥ + ٣ = ؟",
      options: ["٢٨", "٢٢", "٣٥", "٥٥"],
      answer: 0
    },

    // ③ بناء المعادلة — تطبيق — 2Nc11
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "application",
      prompt: "أكمِلِ المُعادَلةَ بِالبِطاقةِ المُناسِبةِ.",
      tokens: ["٤٢", "+", "__", "=", "٤٧"],
      bank: ["٥", "٣", "٦", "٩"],
      answers: ["٥"]
    },

    // ④ لوحة المائة (أكثر/أقل) — تطبيق — 2Nn7
    {
      type: "hundred-chart",
      mode: "more-less",
      objective: "2Nn7: يجد العدد أكثر/أقل بمقدار ١ أو ١٠ من أي عدد من رقمين",
      level: "application",
      prompt: "اسْتَعِنْ بِاللَّوحةِ: انقُرْ خانةَ العَدَدِ المَطلوبِ في كُلِّ مَطلَبٍ.",
      from: 1, to: 50, columns: 10,
      asks: [
        { base: 23, delta: 10 },
        { base: 45, delta: -1 },
        { base: 36, delta: -10 }
      ]
    },

    // ⑤ خط الأعداد (قفز آحاد) — استدلال — 2Nc11
    {
      type: "number-line",
      mode: "jump",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "reasoning",
      prompt: "جِدْ ناتِجَ ٢٦ + ٣ بِالقَفزِ آحاداً عَلى خَطِّ الأعدادِ.",
      min: 20, max: 35, step: 1, labelEvery: 5,
      jump: { start: 26, size: 1, count: 3 }
    },

    // ⑥ اكتشف الخطأ (إثرائي اختياري) — استدلال — 2Nc11
    // ثلاث عمليات جمع بعناصر نصية منفصلة الإحداثيات (ترتيب رياضي يسار→يمين)؛
    // الخاطئة في الوسط: ٤١ + ٥ = ٤٧ والصواب ٤٦.
    {
      type: "find-error",
      objective: "2Nc11: يجمع أو يطرح عدداً من رقم واحد إلى/من عدد من رقمين",
      level: "reasoning",
      prompt: "واحِدةٌ مِنَ العَمَلِيّاتِ الثَّلاثِ ناتِجُها خاطِئٌ — اضغَطْ عَلَيها.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاث بطاقات عمليات جمع">
        <rect x="630" y="140" width="240" height="140" rx="20" fill="#ffffff" stroke="#3e9b4f" stroke-width="5"/>
        <text x="660" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٥</text>
        <text x="703" y="226" font-size="40" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">+</text>
        <text x="742" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣</text>
        <text x="781" y="226" font-size="40" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">=</text>
        <text x="828" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٨</text>
        <rect x="330" y="140" width="240" height="140" rx="20" fill="#ffffff" stroke="#3e9b4f" stroke-width="5"/>
        <text x="360" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤١</text>
        <text x="403" y="226" font-size="40" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">+</text>
        <text x="442" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥</text>
        <text x="481" y="226" font-size="40" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">=</text>
        <text x="528" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٧</text>
        <rect x="30" y="140" width="240" height="140" rx="20" fill="#ffffff" stroke="#3e9b4f" stroke-width="5"/>
        <text x="60" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥٢</text>
        <text x="103" y="226" font-size="40" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">+</text>
        <text x="142" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤</text>
        <text x="181" y="226" font-size="40" font-weight="800" text-anchor="middle" fill="#d97a2b" font-family="Tajawal, Dubai, Cairo, sans-serif">=</text>
        <text x="228" y="228" font-size="40" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥٦</text>
      </svg>`,
      spot: { x: 50, y: 51, r: 13 }
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٥-٢: الأعداد المكوّنة من رقمين (كتاب التلميذ ص٣٨، الوحدة ٢أ)
  "g2m-15-2": [

    // ① اختيار من متعدد — معرفة — 2Nc12
    {
      type: "mcq",
      objective: "2Nc12: يجمع عددين مكوّن كل منهما من رقمين",
      level: "knowledge",
      prompt: "٢٠ + ٣٠ = ؟",
      options: ["٥٠", "٢٣", "٦٠", "٤٠"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nc12
    {
      type: "true-false",
      objective: "2Nc12: يجمع عددين مكوّن كل منهما من رقمين",
      level: "knowledge",
      statement: "٤٠ + ٢٥ = ٦٥",
      answer: true
    },

    // ③ بناء المعادلة — تطبيق — 2Nc12
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc12: يجمع عددين مكوّن كل منهما من رقمين",
      level: "application",
      prompt: "اجمَعِ العَدَدَينِ وأكمِلِ المُعادَلةَ.",
      tokens: ["٢٤", "+", "١٣", "=", "__"],
      bank: ["٣٧", "٢٧", "٣٤", "٤٧"],
      answers: ["٣٧"]
    },

    // ④ التوصيل — تطبيق — 2Nc12
    {
      type: "matching",
      objective: "2Nc12: يجمع عددين مكوّن كل منهما من رقمين",
      level: "application",
      prompt: "صِلْ كُلَّ عَمَلِيّةٍ بِناتِجِها.",
      pairs: [
        { a: "٢١ + ١٢", b: "٣٣" },
        { a: "٣٥ + ١٤", b: "٤٩" },
        { a: "٥٢ + ٢٦", b: "٧٨" },
        { a: "١٣ + ١٣", b: "٢٦" }
      ]
    },

    // ⑤ الترتيب التسلسلي — استدلال — 2Pt6 (استراتيجية ٣٥ + ١٩)
    {
      type: "sequence",
      objective: "2Pt6: يتحقق من الجمع بترتيب مختلف أو استراتيجية مختلفة",
      level: "reasoning",
      prompt: "رَتِّبْ خُطُواتِ حِسابِ ٣٥ + ١٩ بِالطَّريقةِ الذَّكِيّةِ.",
      steps: [
        "نُلاحِظُ أنَّ ١٩ قَريبٌ مِنْ ٢٠",
        "نَجمَعُ: ٣٥ + ٢٠ = ٥٥",
        "نَطرَحُ الزِّيادةَ: ٥٥ − ١ = ٥٤",
        "النّاتِجُ ٥٤"
      ]
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nc12
    {
      type: "exclude",
      objective: "2Nc12: يجمع عددين مكوّن كل منهما من رقمين",
      level: "reasoning",
      prompt: "ثَلاثُ عَمَلِيّاتٍ ناتِجُها ٥٠ وواحِدةٌ دَخيلةٌ — اضغَطْ عَلَيها.",
      options: ["٢٠ + ٣٠", "٢٥ + ٢٥", "٤٠ + ١٠", "٣٠ + ٣٠"],
      answer: 3,
      reason: "ناتِجُ ٣٠ + ٣٠ هو ٦٠ لا ٥٠."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٦-١: العثور على الفروقات البسيطة (كتاب التلميذ ص٣٩، الوحدة ٢أ)
  "g2m-16-1": [

    // ① صواب وخطأ — معرفة — 2Nc15
    {
      type: "true-false",
      objective: "2Nc15: يفهم الطرح من ناحية الفرق والأخذ من",
      level: "knowledge",
      statement: "الفَرقُ بَينَ العَدَدَينِ ١٢ و١٠ هو ٢.",
      answer: true
    },

    // ② اختيار من متعدد — معرفة — 2Nc13
    {
      type: "mcq",
      objective: "2Nc13: يعثر على فروقات صغيرة بين أزواج عددية من رقمين",
      level: "knowledge",
      prompt: "ما الفَرقُ بَينَ العَدَدَينِ ٤٢ و٣٩؟",
      options: ["٣", "٢", "٤", "١٣"],
      answer: 0
    },

    // ③ خط الأعداد (قفز لإيجاد الفرق) — تطبيق — 2Nc13
    {
      type: "number-line",
      mode: "jump",
      objective: "2Nc13: يعثر على فروقات صغيرة بين أزواج عددية من رقمين",
      level: "application",
      prompt: "جِدِ الفَرقَ بَينَ ٣٨ و٤٢: اقفِزْ مِنْ ٣٨ آحاداً حَتّى تَصِلَ إلى ٤٢.",
      min: 35, max: 45, step: 1, labelEvery: 5,
      jump: { start: 38, size: 1, count: 4 }
    },

    // ④ بناء المعادلة — تطبيق — 2Nc15
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc15: يفهم الطرح من ناحية الفرق والأخذ من",
      level: "application",
      prompt: "أكمِلِ المُعادَلةَ بِالبِطاقةِ المُناسِبةِ.",
      tokens: ["٥٠", "−", "__", "=", "٤٨"],
      bank: ["٢", "٣", "٨", "١٢"],
      answers: ["٢"]
    },

    // ⑤ التوصيل — استدلال — 2Pt7 (التحقق من الطرح بالجمع)
    {
      type: "matching",
      objective: "2Pt7: يتحقق من الطرح بجمع الإجابة إلى العدد الأصغر",
      level: "reasoning",
      prompt: "صِلْ كُلَّ عَمَلِيّةِ طَرحٍ بِجُملةِ الجَمعِ الَّتي تَتَحَقَّقُ بِها مِنها.",
      pairs: [
        { a: "٩ − ٤ = ٥",   b: "٥ + ٤ = ٩" },
        { a: "١٧ − ٥ = ١٢", b: "١٢ + ٥ = ١٧" },
        { a: "٢٠ − ٨ = ١٢", b: "١٢ + ٨ = ٢٠" },
        { a: "١٥ − ٦ = ٩",  b: "٩ + ٦ = ١٥" }
      ]
    },

    // ⑥ التلوين بالتعليمات (إثرائي اختياري) — استدلال — 2Nc13
    {
      type: "color",
      objective: "2Nc13: يعثر على فروقات صغيرة بين أزواج عددية من رقمين",
      level: "reasoning",
      prompt: "لَوِّنِ العَمَلِيّاتِ الَّتي فَرقُها ٣ بِالأخضَرِ، والَّتي فَرقُها ٢ بِالبُرتُقالِيِّ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر",    color: "#3e9b4f" },
        { name: "برتقالي", color: "#e8862e" }
      ],
      parts: [
        { name: "٢٥ − ٢٢", color: "#3e9b4f" },
        { name: "١٨ − ١٦", color: "#e8862e" },
        { name: "٤١ − ٣٨", color: "#3e9b4f" },
        { name: "٣٠ − ٢٨", color: "#e8862e" },
        { name: "٥٤ − ٥١", color: "#3e9b4f" },
        { name: "٦٧ − ٦٥", color: "#e8862e" }
      ],
      svg: `<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ست بطاقات عمليات طرح للتلوين">
        ${[{t:"٢٥ − ٢٢",cx:450,cy:95},{t:"١٨ − ١٦",cx:280,cy:95},{t:"٤١ − ٣٨",cx:110,cy:95},{t:"٣٠ − ٢٨",cx:450,cy:245},{t:"٥٤ − ٥١",cx:280,cy:245},{t:"٦٧ − ٦٥",cx:110,cy:245}].map((c,i)=>`
        <g class="cpart" data-name="${c.t}" id="part-sub${i}">
          <rect x="${c.cx-75}" y="${c.cy-45}" width="150" height="90" rx="16"/>
          <text x="${c.cx}" y="${c.cy+12}" font-size="30" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">${c.t}</text>
        </g>`).join("")}
      </svg>`
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٧-١: المصفوفات (كتاب التلميذ ص٤٠–٤١، الوحدة ٢أ)
  "g2m-17-1": [

    // ① اختيار من متعدد — معرفة — 2Nc17
    {
      type: "mcq",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "knowledge",
      prompt: "مَصفوفةٌ فيها صَفّانِ، في كُلِّ صَفٍّ ٥ دَوائِرَ — أيُّ جُملةِ ضَربٍ تَصِفُها؟",
      options: ["٢ × ٥ = ١٠", "٥ × ٥ = ٢٥", "٢ + ٥ = ٧", "٢ × ٢ = ٤"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nc17
    {
      type: "true-false",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "knowledge",
      statement: "المَصفوفةُ صُفوفٌ مُتَساوِيةٌ مِنَ الأشياءِ.",
      answer: true
    },

    // ③ المصفوفات (بناء) — تطبيق — 2Nc17
    {
      type: "array",
      mode: "build",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "application",
      prompt: "ابنِ مَصفوفةً فيها ٣ صُفوفٍ، في كُلِّ صَفٍّ ٥ مُرَبَّعاتٍ.",
      rows: 3, cols: 5,
      answerSentence: "٣ × ٥ = ١٥"
    },

    // ④ التوصيل — تطبيق — 2Nc17
    {
      type: "matching",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "application",
      prompt: "صِلْ وَصفَ كُلِّ مَصفوفةٍ بِجُملةِ الضَّربِ الَّتي تُمَثِّلُها.",
      pairs: [
        { a: "صَفّانِ في كُلٍّ مِنهُما ٤",   b: "٢ × ٤ = ٨" },
        { a: "٣ صُفوفٍ في كُلٍّ مِنها ٢",   b: "٣ × ٢ = ٦" },
        { a: "٤ صُفوفٍ في كُلٍّ مِنها ٥",   b: "٤ × ٥ = ٢٠" },
        { a: "٥ صُفوفٍ في كُلٍّ مِنها ١٠",  b: "٥ × ١٠ = ٥٠" }
      ]
    },

    // ⑤ النقطة الساخنة — استدلال — 2Nc17 (تمييز مصفوفة ٣×٤ من ٢×٤)
    {
      type: "hotspot",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "reasoning",
      prompt: "انقُرْ عَلى المَصفوفةِ الَّتي تُمَثِّلُ ٣ × ٤.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مصفوفتان من الدوائر: ثلاثة صفوف في أربعة، وصفان في أربعة">
        ${[180,250,320].map(cy=>[545,615,685,755].map(cx=>`<circle cx="${cx}" cy="${cy}" r="26" fill="#e8862e" stroke="#8a4a1f" stroke-width="4"/>`).join("")).join("")}
        ${[215,285].map(cy=>[145,215,285,355].map(cx=>`<circle cx="${cx}" cy="${cy}" r="26" fill="#7fb3e0" stroke="#2f6fb0" stroke-width="4"/>`).join("")).join("")}
      </svg>`,
      spot: { x: 72, y: 61, r: 15 }
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nc17
    {
      type: "exclude",
      objective: "2Nc17: يفهم الضرب على أنه وصف لمصفوفة",
      level: "reasoning",
      prompt: "ثَلاثُ جُمَلِ ضَربٍ ناتِجُها ١٢ وواحِدةٌ دَخيلةٌ — اضغَطْ عَلَيها.",
      options: ["٣ × ٤", "٤ × ٣", "٢ × ٦", "٣ × ٥"],
      answer: 3,
      reason: "ناتِجُ ٣ × ٥ هو ١٥، وباقي الجُمَلِ ناتِجُها ١٢."
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٧-٢: العدّ بالاثنينات والخمسات والعشرات (كتاب التلميذ ص٤٢، الوحدة ٢أ)
  "g2m-17-2": [

    // ① اختيار من متعدد — معرفة — 2Nc19
    {
      type: "mcq",
      objective: "2Nc19: يستخدم العدّ اثنينات/خمسات/عشرات لحل مسائل الجمع المتكرر",
      level: "knowledge",
      prompt: "٥ سِلالٍ في كُلِّ سَلّةٍ ١٠ تَمراتٍ — عُدَّ بِالعَشَراتِ: كَمْ تَمرةً جَميعاً؟",
      options: ["٥٠", "١٥", "٥٥", "١٠٠"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nc19
    {
      type: "true-false",
      objective: "2Nc19: يستخدم العدّ اثنينات/خمسات/عشرات لحل مسائل الجمع المتكرر",
      level: "knowledge",
      statement: "العَدُّ بِالاثنيناتِ أسرَعُ مِنْ عَدِّ الأشياءِ واحِداً واحِداً.",
      answer: true
    },

    // ③ العد بالنقر (قفز خمسات) — تطبيق — 2Nc19
    {
      type: "count-tap",
      mode: "step",
      objective: "2Nc19: يستخدم العدّ اثنينات/خمسات/عشرات لحل مسائل الجمع المتكرر",
      level: "application",
      prompt: "في كُلِّ يَدٍ ٥ أصابِعَ — انقُرِ الأيدِيَ بِالتَّرتيبِ وعُدَّ بِالخَمساتِ حَتّى ٢٥.",
      glyph: "🖐️", step: 5, groups: 5, target: 25
    },

    // ④ إكمال النمط — تطبيق — 2Nc19
    {
      type: "pattern",
      objective: "2Nc19: يستخدم العدّ اثنينات/خمسات/عشرات لحل مسائل الجمع المتكرر",
      level: "application",
      prompt: "أكمِلِ النَّمَطَ: العَدُّ بِالعَشَراتِ.",
      items: ["١٠", "٢٠", "٣٠", "__", "٥٠", "__"],
      answers: ["٤٠", "٦٠"],
      distractors: ["٤٥", "٥٥"],
      rule: "نَزيدُ ١٠ كُلَّ مَرّةٍ"
    },

    // ⑤ بناء المعادلة — استدلال — 2Nc19 (من الجمع المتكرر إلى الضرب)
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc19: يستخدم العدّ اثنينات/خمسات/عشرات لحل مسائل الجمع المتكرر",
      level: "reasoning",
      prompt: "٥ + ٥ + ٥ ثَلاثُ خَمساتٍ — أكمِلْ جُملةَ الضَّربِ المُكافِئةَ.",
      tokens: ["٥", "+", "٥", "+", "٥", "=", "__", "×", "٥"],
      bank: ["٣", "٥", "١٥", "٢"],
      answers: ["٣"]
    },

    // ⑥ بطاقات الذاكرة (إثرائي اختياري) — معرفة — 2Nc19
    {
      type: "memory",
      objective: "2Nc19: يستخدم العدّ اثنينات/خمسات/عشرات لحل مسائل الجمع المتكرر",
      level: "knowledge",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتُطابِقَ كُلَّ جَمعٍ مُكَرَّرٍ بِجُملةِ الضَّربِ.",
      pairs: [
        { a: "٢ + ٢ + ٢",     b: "٣ × ٢" },
        { a: "٥ + ٥",          b: "٢ × ٥" },
        { a: "١٠ + ١٠ + ١٠",  b: "٣ × ١٠" },
        { a: "٤ + ٤",          b: "٢ × ٤" }
      ]
    }

  ],

  // الرياضيات/الثاني — النشاط الأساسي ١٧-٣: القسمة (كتاب التلميذ ص٤٣، الوحدة ٢أ)
  "g2m-17-3": [

    // ① اختيار من متعدد — معرفة — 2Nc18
    {
      type: "mcq",
      objective: "2Nc18: يفهم القسمة كعملية تجميع ويستخدم رمز ÷",
      level: "knowledge",
      prompt: "وَزَّعنا ١٠ تَمراتٍ بِالتَّساوي عَلى طَبَقَينِ — كَمْ تَمرةً في كُلِّ طَبَقٍ؟",
      options: ["٥", "٢", "٨", "٢٠"],
      answer: 0
    },

    // ② صواب وخطأ — معرفة — 2Nc23
    {
      type: "true-false",
      objective: "2Nc23: يفهم أنه قد يبقى عدد بعد عملية القسمة",
      level: "knowledge",
      statement: "عِندَ تَوزيعِ ٧ أقلامٍ عَلى تِلميذَينِ بِالتَّساوي يَبقى قَلَمٌ واحِدٌ.",
      answer: true
    },

    // ③ التصنيف — تطبيق — 2Nc23
    {
      type: "classify",
      objective: "2Nc23: يفهم أنه قد يبقى عدد بعد عملية القسمة",
      level: "application",
      prompt: "قَسَمنا كُلَّ عَدَدٍ عَلى ٢ — صَنِّفْهُ.",
      groups: [
        { name: "بِلا باقٍ",    items: ["٦", "١٠"] },
        { name: "يَبقى باقٍ",   items: ["٧", "٩"] }
      ]
    },

    // ④ بناء المعادلة — تطبيق — 2Nc18
    {
      type: "equation-builder",
      mode: "fill",
      objective: "2Nc18: يفهم القسمة كعملية تجميع ويستخدم رمز ÷",
      level: "application",
      prompt: "أكمِلْ عَمَلِيّةَ القِسمةِ.",
      tokens: ["١٢", "÷", "٢", "=", "__"],
      bank: ["٦", "٤", "٢", "١٠"],
      answers: ["٦"]
    },

    // ⑤ المصفوفات (بناء — قسمة) — استدلال — 2Nc18
    {
      type: "array",
      mode: "build",
      objective: "2Nc18: يفهم القسمة كعملية تجميع ويستخدم رمز ÷",
      level: "reasoning",
      prompt: "وَزِّعْ ١٢ نُقطةً في ٣ صُفوفٍ مُتَساوِيةٍ — ابنِ المَصفوفةَ لِتَعرِفَ كَمْ في كُلِّ صَفٍّ.",
      rows: 3, cols: 4,
      answerSentence: "١٢ ÷ ٣ = ٤"
    },

    // ⑥ الاستبعاد (إثرائي اختياري) — استدلال — 2Nc23
    {
      type: "exclude",
      objective: "2Nc23: يفهم أنه قد يبقى عدد بعد عملية القسمة",
      level: "reasoning",
      prompt: "ثَلاثةُ أعدادٍ تُقسَمُ عَلى ٢ بِلا باقٍ وواحِدٌ دَخيلٌ — اضغَطْ عَلَيهِ.",
      options: ["٤", "٦", "٨", "٩"],
      answer: 3,
      reason: "٩ عَدَدٌ فَردِيٌّ — عِندَ قِسمَتِهِ عَلى ٢ يَبقى ١."
    }

  ],

  /* ── الرياضيات/الرابع — الوحدة ١: الأعداد ونظام العدّ ──
     الأهداف من: المصادر/الفصل الدراسي الاول/الصف الرابع/مادة الرياضيات/الأهداف.md */

  // الرياضيات/الرابع — الدرس ١-١: قراءة وكتابة وتجزئة الأعداد
  "g4m-1-1": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Nn3: يفهم ما يمثّله كل رقم في عدد مكوّن من أربعة أرقام، ويجزّئ العدد إلى آلاف ومئات وعشرات وآحاد",
      level: "knowledge",
      statement: "قيمةُ الرقمِ ٧ في العددِ ٢٧٥٣ هي ٧٠٠.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Nn1: يقرأ ويكتب الأعداد حتى ١٠٠٠٠",
      level: "knowledge",
      prompt: "ما العددُ الذي يُقرأُ: ثلاثةُ آلافٍ وخمسُمئةٍ وأربعون؟",
      options: ["٣٥٤٠", "٣٥٠٤", "٣٤٥٠", "٥٣٤٠"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Nn3: يفهم ما يمثّله كل رقم في عدد مكوّن من أربعة أرقام، ويجزّئ العدد إلى آلاف ومئات وعشرات وآحاد",
      level: "knowledge",
      prompt: "صِلْ كلَّ عددٍ بتجزئتِهِ الصحيحةِ.",
      pairs: [
        { a: "٢٦٤٨", b: "٢٠٠٠ + ٦٠٠ + ٤٠ + ٨" },
        { a: "٦٢٨٤", b: "٦٠٠٠ + ٢٠٠ + ٨٠ + ٤" },
        { a: "٤٨٦٢", b: "٤٠٠٠ + ٨٠٠ + ٦٠ + ٢" },
        { a: "٨٤٢٦", b: "٨٠٠٠ + ٤٠٠ + ٢٠ + ٦" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — تطبيق
    {
      type: "fill-blank",
      objective: "4Nn3: يفهم ما يمثّله كل رقم في عدد مكوّن من أربعة أرقام، ويجزّئ العدد إلى آلاف ومئات وعشرات وآحاد",
      level: "application",
      prompt: "أكملِ الجملةَ بسحبِ الرقمِ المناسبِ إلى كلِّ فراغٍ.",
      text: "العددُ ٥٠٧٩ فيهِ {} آلافٍ و {} مئاتٍ و {} عشراتٍ و {} آحادٍ.",
      answers: ["٥", "٠", "٧", "٩"],
      distractors: ["٥٠", "٧٩"]
    },

    // ⑥ الترتيب التسلسلي — استدلال (العدّ التنازلي بالمئات عبر حدّ الآلاف)
    {
      type: "sequence",
      objective: "4Nn2: يعدّ تصاعدياً وتنازلياً بالآحاد والعشرات والمئات والآلاف من أعداد مكوّنة من أربعة أرقام",
      level: "reasoning",
      prompt: "رتّبِ البطاقاتِ للعدِّ التنازليِّ بالمئاتِ ابتداءً منَ العددِ ٤١٥٠.",
      steps: ["٤١٥٠", "٤٠٥٠", "٣٩٥٠", "٣٨٥٠"]
    },

    // ⑬ الخريطة الذهنية الناقصة (إثرائي) — تطبيق
    {
      type: "mindmap",
      objective: "4Nn3: يفهم ما يمثّله كل رقم في عدد مكوّن من أربعة أرقام، ويجزّئ العدد إلى آلاف ومئات وعشرات وآحاد",
      level: "application",
      prompt: "أكملِ الخريطةَ الذهنيةَ بسحبِ الرقمِ المناسبِ إلى كلِّ خانةٍ منْ خاناتِ العددِ.",
      center: "العددُ ٦٣٠٧",
      branches: [
        { label: "خانة الآلاف",  answer: "٦" },
        { label: "خانة المئات",  answer: "٣" },
        { label: "خانة العشرات", answer: "٠" },
        { label: "خانة الآحاد",  answer: "٧" }
      ],
      distractors: ["٤", "٩"]
    }

  ],

  // الرياضيات/الرابع — الدرس ١-٢: الترتيب والتقريب
  "g4m-1-2": [

    // ④ صواب وخطأ — معرفة (قاعدة التقريب)
    {
      type: "true-false",
      objective: "4Nn5: يقرّب الأعداد المكوّنة من ثلاثة أو أربعة أرقام إلى أقرب ١٠ أو ١٠٠",
      level: "knowledge",
      statement: "عندَ التقريبِ إلى أقربِ عشرةٍ: إذا كانَ رقمُ الآحادِ ٥ أوْ أكثرَ نُقرِّبُ إلى العشرةِ الأعلى.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة (خطوات المقارنة)
    {
      type: "mcq",
      objective: "4Nn8: يقارن بين زوجين من الأعداد المكوّنة من ثلاثة أو أربعة أرقام، ويجد عدداً يقع بينهما",
      level: "knowledge",
      prompt: "عندَ مقارنةِ عددينِ مكوّنينِ منْ أربعةِ أرقامٍ، بأيِّ خانةٍ نبدأُ المقارنةَ؟",
      options: ["خانة الآلاف", "خانة الآحاد", "خانة العشرات", "خانة المئات"],
      answer: 0
    },

    // ② توصيل — معرفة (تقريب مباشر لأقرب عشرة)
    {
      type: "matching",
      objective: "4Nn5: يقرّب الأعداد المكوّنة من ثلاثة أو أربعة أرقام إلى أقرب ١٠ أو ١٠٠",
      level: "knowledge",
      prompt: "صِلْ كلَّ عددٍ بتقريبِهِ إلى أقربِ عشرةٍ.",
      pairs: [
        { a: "٤٣", b: "٤٠" },
        { a: "٥٧", b: "٦٠" },
        { a: "٧٥", b: "٨٠" },
        { a: "٨٩", b: "٩٠" }
      ]
    },

    // ⑤ النقطة الساخنة — تطبيق (تحديد موضع عدد على خط الأعداد)
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): طالت علامات التدريج وكبرت الأرقام (٣٠ ⇒ ٤٢).
    {
      type: "hotspot",
      objective: "4Nn6: يضع الأعداد بدقة على خط أعداد مقسّم بمضاعفات ١٠ أو ١٠٠",
      level: "application",
      prompt: "خطُّ الأعدادِ منْ ٣٠٠٠ إلى ٤٠٠٠ مقسّمٌ بالمئاتِ — اضغطْ على موضعِ العددِ ٣٧٠٠.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" width="900" height="410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من ٣٠٠٠ إلى ٤٠٠٠">
        <line x1="70" y1="190" x2="830" y2="190" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="70" y1="150" x2="70" y2="230" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="146" y1="164" x2="146" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="222" y1="164" x2="222" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="298" y1="164" x2="298" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="374" y1="164" x2="374" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="450" y1="150" x2="450" y2="230" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="526" y1="164" x2="526" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="602" y1="164" x2="602" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="678" y1="164" x2="678" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="754" y1="164" x2="754" y2="216" stroke="#33415e" stroke-width="5"/>
        <line x1="830" y1="150" x2="830" y2="230" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <text x="70" y="300" font-size="42" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٠٠٠</text>
        <text x="450" y="300" font-size="42" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٥٠٠</text>
        <text x="830" y="300" font-size="42" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٠٠٠</text>
      </svg>`,
      spot: { x: 67, y: 46.3, r: 5 }
    },

    // ⑦ التصنيف في مجموعات — استدلال (تحليل التقريب لأقرب مئة)
    {
      type: "classify",
      objective: "4Nn5: يقرّب الأعداد المكوّنة من ثلاثة أو أربعة أرقام إلى أقرب ١٠ أو ١٠٠",
      level: "reasoning",
      prompt: "صنّفِ الأعدادَ حسبَ تقريبِها إلى أقربِ مئةٍ.",
      groups: [
        { name: "تُقرَّبُ إلى ٦٠٠", items: ["٥٧٤", "٦٤٩", "٥٥١"] },
        { name: "تُقرَّبُ إلى ٧٠٠", items: ["٦٥٣", "٧٤٩", "٦٨٢"] }
      ]
    },

    // ⑫ اكتشف الخطأ (إثرائي) — استدلال
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): طالت العلامات وكبرت الأرقام (٢٤ ⇒ ٣٤).
    {
      type: "find-error",
      objective: "4Nn6: يضع الأعداد بدقة على خط أعداد مقسّم بمضاعفات ١٠ أو ١٠٠",
      level: "reasoning",
      prompt: "خطُّ الأعدادِ منْ ٠ إلى ١٠٠٠ فيهِ عددٌ واحدٌ في غيرِ موضعِهِ — اضغطْ عليهِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" width="900" height="410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من صفر إلى ألف فيه عدد خاطئ">
        <line x1="70" y1="180" x2="830" y2="180" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="70" y1="140" x2="70" y2="220" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="146" y1="154" x2="146" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="222" y1="154" x2="222" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="298" y1="154" x2="298" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="374" y1="154" x2="374" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="450" y1="154" x2="450" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="526" y1="154" x2="526" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="602" y1="154" x2="602" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="678" y1="154" x2="678" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="754" y1="154" x2="754" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="830" y1="140" x2="830" y2="220" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <text x="70"  y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٠</text>
        <text x="146" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">١٠٠</text>
        <text x="222" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٢٠٠</text>
        <text x="298" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٠٠</text>
        <text x="374" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٠٠</text>
        <text x="450" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥٠٠</text>
        <text x="526" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٦٥٠</text>
        <text x="602" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٧٠٠</text>
        <text x="678" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٨٠٠</text>
        <text x="754" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٩٠٠</text>
        <text x="830" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">١٠٠٠</text>
      </svg>`,
      spot: { x: 58.4, y: 68, r: 6 }
    }

  ],

  // الرياضيات/الرابع — الدرس ١-٣: الأعداد الموجبة والسالبة
  "g4m-1-3": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Nn9: يستخدم الأعداد السالبة في سياقات عملية مثل درجات الحرارة",
      level: "knowledge",
      statement: "الأعدادُ السالبةُ أصغرُ منَ الصفرِ.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Nn9: يستخدم الأعداد السالبة في سياقات عملية مثل درجات الحرارة",
      level: "knowledge",
      prompt: "درجةُ الحرارةِ خمسُ درجاتٍ تحتَ الصفرِ — كيفَ نكتبُها؟",
      options: ["٥-", "٥", "٥٠", "٠٫٥"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Nn9: يستخدم الأعداد السالبة في سياقات عملية مثل درجات الحرارة",
      level: "knowledge",
      prompt: "صِلْ كلَّ وصفٍ لدرجةِ الحرارةِ بالعددِ المناسبِ.",
      pairs: [
        { a: "ثلاثُ درجاتٍ فوقَ الصفرِ",  b: "٣" },
        { a: "أربعُ درجاتٍ تحتَ الصفرِ",  b: "٤-" },
        { a: "درجةُ التجمُّدِ (الصفرُ)",   b: "٠" },
        { a: "درجةٌ واحدةٌ تحتَ الصفرِ",  b: "١-" }
      ]
    },

    // ① سحب وإفلات — تطبيق (وضع أعداد على خط الأعداد الممتد تحت الصفر)
    // نسبة الرسم ٢٫١٩٥ (shoogp-ui §١.١٠): كبرت الدوائر (نق ١١ ⇒ ١٧) والأرقام (٢٨ ⇒ ٣٨).
    {
      type: "drag-drop",
      objective: "4Nn9: يستخدم الأعداد السالبة في سياقات عملية مثل درجات الحرارة",
      level: "application",
      prompt: "اسحبْ كلَّ عددٍ إلى موضعِهِ الصحيحِ على خطِّ الأعدادِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من سالب خمسة إلى خمسة">
        <line x1="70" y1="180" x2="830" y2="180" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="70" y1="140" x2="70" y2="220" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="222" y1="154" x2="222" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="298" y1="154" x2="298" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="450" y1="140" x2="450" y2="220" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <line x1="526" y1="154" x2="526" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="602" y1="154" x2="602" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="754" y1="154" x2="754" y2="206" stroke="#33415e" stroke-width="5"/>
        <line x1="830" y1="140" x2="830" y2="220" stroke="#33415e" stroke-width="7" stroke-linecap="round"/>
        <circle cx="146" cy="180" r="17" fill="#fff" stroke="#d97a2b" stroke-width="5"/>
        <circle cx="374" cy="180" r="17" fill="#fff" stroke="#d97a2b" stroke-width="5"/>
        <circle cx="678" cy="180" r="17" fill="#fff" stroke="#d97a2b" stroke-width="5"/>
        <text x="70"  y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">-٥</text>
        <text x="222" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">-٣</text>
        <text x="298" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">-٢</text>
        <text x="450" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٠</text>
        <text x="526" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">١</text>
        <text x="602" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٢</text>
        <text x="754" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤</text>
        <text x="830" y="290" font-size="38" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥</text>
      </svg>`,
      targets: [
        { answer: "٤-", box:{x:16,y:10}, dot:{x:16.2,y:43.9} },
        { answer: "١-", box:{x:50,y:10}, dot:{x:41.6,y:43.9} },
        { answer: "٣",  box:{x:84,y:10}, dot:{x:75.3,y:43.9} }
      ]
    },

    // ⑥ الترتيب التسلسلي — استدلال (نمط عدّ تنازلي يعبر الصفر)
    {
      type: "sequence",
      objective: "4Nn10: يتعرّف الأنماط العددية المتكوّنة بالعدّ تصاعدياً أو تنازلياً بخطوات ثابتة ويمدّها، متجاوزاً الصفر عند العدّ التنازلي",
      level: "reasoning",
      prompt: "رتّبِ البطاقاتِ لإكمالِ نمطِ العدِّ التنازليِّ باثنينِ اثنينِ مروراً بالصفرِ.",
      steps: ["٤", "٢", "٠", "٢-", "٤-"]
    },

    // ⑨ الاستبعاد (إثرائي) — استدلال
    {
      type: "exclude",
      objective: "4Nn9: يستخدم الأعداد السالبة في سياقات عملية مثل درجات الحرارة",
      level: "reasoning",
      prompt: "أيُّ الأعدادِ لا ينتمي إلى المجموعةِ؟",
      options: ["٣-", "٧-", "١-", "٥"],
      answer: 3,
      reason: "٥ عددٌ موجبٌ فوقَ الصفرِ، والبقيّةُ أعدادٌ سالبةٌ تحتَ الصفرِ"
    }

  ],

  // الرياضيات/الرابع — الدرس ١-٤: الأعداد الفردية والزوجية
  "g4m-1-4": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Nn11: يميّز الأعداد الفردية والزوجية",
      level: "knowledge",
      statement: "العددُ ٣٦ عددٌ زوجيٌّ لأنَّ رقمَ آحادِهِ ٦.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Nn11: يميّز الأعداد الفردية والزوجية",
      level: "knowledge",
      prompt: "بأيِّ الأرقامِ تنتهي الأعدادُ الفرديةُ؟",
      options: ["١ أو ٣ أو ٥ أو ٧ أو ٩", "٠ أو ٢ أو ٤ أو ٦ أو ٨", "٠ أو ٥ فقط", "٢ أو ٣ فقط"],
      answer: 0
    },

    // ⑤ النقطة الساخنة — معرفة (تمييز العدد الزوجي)
    // نسبة الرسم ٢٫١٩٢ (shoogp-ui §١.١٠): طالت البطاقات (١١٠ ⇒ ١٨٥) وكبر الخط (٥٦ ⇒ ٧٢).
    {
      type: "hotspot",
      objective: "4Nn11: يميّز الأعداد الفردية والزوجية",
      level: "knowledge",
      prompt: "اضغطْ على العددِ الزوجيِّ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 800 365" width="800" height="365" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="أربع بطاقات أعداد">
        <rect x="50"  y="90" width="150" height="185" rx="22" fill="#eef4fb" stroke="#33415e" stroke-width="4"/>
        <rect x="230" y="90" width="150" height="185" rx="22" fill="#eef4fb" stroke="#33415e" stroke-width="4"/>
        <rect x="410" y="90" width="150" height="185" rx="22" fill="#eef4fb" stroke="#33415e" stroke-width="4"/>
        <rect x="590" y="90" width="150" height="185" rx="22" fill="#eef4fb" stroke="#33415e" stroke-width="4"/>
        <text x="125" y="208" font-size="72" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٧</text>
        <text x="305" y="208" font-size="72" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٩</text>
        <text x="485" y="208" font-size="72" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٦٢</text>
        <text x="665" y="208" font-size="72" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٨٥</text>
      </svg>`,
      spot: { x: 60.6, y: 50, r: 10 }
    },

    // ⑧ ملء الفراغ بالسحب — تطبيق (تعميمات مجموع الفردي والزوجي)
    {
      type: "fill-blank",
      objective: "4Nn12: يصوغ عبارات عامة عن مجموع الأعداد الفردية والزوجية والفرق بينها",
      level: "application",
      prompt: "أكملِ القاعدتينِ بسحبِ الكلمةِ المناسبةِ.",
      text: "مجموعُ عددينِ فرديينِ عددٌ {}، ومجموعُ عددٍ زوجيٍّ وعددٍ فرديٍّ عددٌ {}.",
      answers: ["زوجي", "فردي"],
      distractors: ["صفر"]
    },

    // ⑦ التصنيف في مجموعات — استدلال
    {
      type: "classify",
      objective: "4Nn11: يميّز الأعداد الفردية والزوجية",
      level: "reasoning",
      prompt: "صنّفِ الأعدادَ إلى فرديةٍ وزوجيةٍ.",
      groups: [
        { name: "أعدادٌ فردية", items: ["١٥٧", "٤٦٣", "٢٠٩"] },
        { name: "أعدادٌ زوجية", items: ["٣٤٢", "٦٧٨", "٥٩٠"] }
      ]
    },

    // ⑩ التلوين بالتعليمات (إثرائي) — تطبيق
    {
      type: "color",
      objective: "4Nn11: يميّز الأعداد الفردية والزوجية",
      level: "application",
      prompt: "لوِّنِ الأعدادَ الزوجيةَ بالأخضرِ والأعدادَ الفرديةَ بالبرتقاليِّ: اخترْ لوناً ثمَّ اضغطِ العددَ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر",    color: "#3e9b4f" },
        { name: "برتقالي", color: "#e8862e" }
      ],
      parts: [
        { name: "١٢", color: "#3e9b4f" },
        { name: "٧",  color: "#e8862e" },
        { name: "٢٠", color: "#3e9b4f" },
        { name: "٩",  color: "#e8862e" },
        { name: "١٦", color: "#3e9b4f" },
        { name: "٢٥", color: "#e8862e" }
      ],
      svg: `<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ست دوائر أعداد للتلوين">
        <g class="cpart" data-name="١٢" id="part-n12">
          <circle cx="110" cy="95" r="52"/>
          <text x="110" y="112" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">١٢</text>
        </g>
        <g class="cpart" data-name="٧" id="part-n7">
          <circle cx="280" cy="95" r="52"/>
          <text x="280" y="112" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">٧</text>
        </g>
        <g class="cpart" data-name="٢٠" id="part-n20">
          <circle cx="450" cy="95" r="52"/>
          <text x="450" y="112" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">٢٠</text>
        </g>
        <g class="cpart" data-name="٩" id="part-n9">
          <circle cx="110" cy="245" r="52"/>
          <text x="110" y="262" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">٩</text>
        </g>
        <g class="cpart" data-name="١٦" id="part-n16">
          <circle cx="280" cy="245" r="52"/>
          <text x="280" y="262" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">١٦</text>
        </g>
        <g class="cpart" data-name="٢٥" id="part-n25">
          <circle cx="450" cy="245" r="52"/>
          <text x="450" y="262" font-size="44" font-weight="800" text-anchor="middle" fill="#243040" stroke="none" font-family="Tajawal, Dubai, Cairo, sans-serif">٢٥</text>
        </g>
      </svg>`
    }

  ],

  // العلوم/الرابع — الدرس الأول: الهياكل العظمية (ص ٢٢–٢٣)
  "g4s-1-1": [

    // ④ صواب وخطأ (الأسهل)
    {
      type: "true-false",
      objective: "4Bh1: يستنتج أنّ للإنسان وبعض الحيوانات هيكلاً عظميًّا داخل الجسم",
      level: "knowledge",
      statement: "يملك الإنسانُ هيكلاً عظميًّا داخل جسمه.",
      answer: true
    },

    // ③ اختيار من متعدد
    {
      type: "mcq",
      objective: "4Bh1: يستنتج أنّ للإنسان وبعض الحيوانات هيكلاً عظميًّا داخل الجسم",
      level: "knowledge",
      prompt: "مِمَّ تتكوّن الهياكل العظمية؟",
      options: ["العظام", "العضلات", "الجلد", "الشَّعر"],
      answer: 0
    },

    // ⑤ تحديد الأجزاء (hotspot)
    {
      type: "hotspot",
      objective: "4Bh1: يستنتج أنّ للإنسان وبعض الحيوانات هيكلاً عظميًّا داخل الجسم",
      level: "knowledge",
      prompt: "انقر على الجُمجمة (عظام الرأس) في الهيكل العظمي.",
      image: "images/skeleton.png",
      fit: "height",
      bg: "#fdf9ee",
      spot: { x: 50, y: 7, r: 9 }
    },

    // ① سحب وإفلات: تسمية أجزاء الهيكل (الأصعب)
    {
      type: "drag-drop",
      objective: "4Bh1: يستنتج أنّ للإنسان وبعض الحيوانات هيكلاً عظميًّا داخل الجسم",
      level: "application",
      prompt: "اسحب اسم كل جزء إلى مكانه في الهيكل.",
      image: "images/skeleton.png",
      bg: "#fdf9ee",
      targets: [
        { answer: "الأضلاع",      box:{x:84,y:26}, dot:{x:53,y:27} },
        { answer: "العمود الفقري", box:{x:16,y:38}, dot:{x:50,y:36} },
        { answer: "عظام الورك",   box:{x:84,y:52}, dot:{x:50,y:46} },
        { answer: "قصبة الساق",   box:{x:16,y:82}, dot:{x:58,y:83} }
      ]
    },

    // ⑦ التصنيف في مجموعات: تصنيف الحيوانات حسب هيكلها (سؤال تجريبي لنوع التصنيف)
    {
      type: "classify",
      objective: "4Bh1: يستنتج أنّ للإنسان وبعض الحيوانات هيكلاً عظميًّا داخل الجسم",
      level: "reasoning",
      prompt: "صنّف الحيوانات حسب هيكلها.",
      groups: [
        { name: "فقاريات",   items: ["إنسان", "سمكة", "طائر"] },
        { name: "لافقاريات", items: ["حلزون", "دودة", "حشرة"] }
      ]
    },

    // ⑲ العدسة المكبّرة — سؤال تجريبي لنوع العدسة المكبّرة الجديد (قيد الاختبار)
    // عدسة أشعة سينية فوق صورة طفل تكشف هيكله العظمي. الصورتان متطابقتا الأبعاد (1536×1024):
    // العلوية "طفل-أشعة.png" (الطفل بقميصه) والسفلية "طفل-أشعة-خفي.png" (طبقة الهيكل العظمي).
    {
      type: "lens",
      objective: "4Bh1: يستنتج أنّ للإنسان وبعض الحيوانات هيكلاً عظميًّا داخل الجسم",
      level: "application",
      prompt: "اسحب عدسة الأشعة السينية فوق جسم الطفل، واضغط على كل جزء من هيكله العظمي يظهر داخلها.",
      image: "images/طفل-أشعة.png",
      hidden: "images/طفل-أشعة-خفي.png",
      bg: "#fdf9ee",
      spots: [
        { label: "الجمجمة",       x: 49.5, y: 23.5, r: 8 },
        { label: "القفص الصدري",  x: 50,   y: 43,   r: 6 },
        { label: "العمود الفقري", x: 50,   y: 53,   r: 5.5 },
        { label: "عظام الذراعين", x: 40.5, y: 55,   r: 8,   alt: { x: 59.5, y: 55 },   labelBelow: true },
        { label: "عظام الساقين",  x: 45.5, y: 72.5, r: 9,   alt: { x: 53,   y: 72.5 }, labelBelow: true }
      ]
    }

  ],

  // العلوم/الرابع — الدرس الثاني: الهيكل العظمي للإنسان (ص ٢٥–٢٦)
  "g4s-1-2": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Bh6: يلاحظ أنّ للعظام أشكالاً وأحجاماً مختلفة",
      level: "knowledge",
      prompt: "كم عدد العظام في هيكل جسم الإنسان؟",
      options: ["١٠٦ عظمة", "٢٠٦ عظمة", "٣٠٦ عظمة", "٤٠٦ عظمة"],
      answer: 1
    },

    // ② توصيل: العظم ← نوعه — معرفة
    {
      type: "matching",
      objective: "4Bh6: يلاحظ أنّ للعظام أشكالاً وأحجاماً مختلفة",
      level: "knowledge",
      prompt: "صِل كل عظم بنوعه.",
      pairs: [
        { a: "عظمة الفخذ",   b: "عظم طويل" },
        { a: "عظام الأصابع", b: "عظم قصير" },
        { a: "الجُمجمة",     b: "عظم مسطّح" },
        { a: "الفقرة",       b: "عظم غير منتظم" }
      ]
    },

    // ⑤ تحديد الأجزاء (hotspot) — معرفة
    {
      type: "hotspot",
      objective: "4Bh7: يستنتج أنّ العظام ترتبط مع بعضها لتكوّن الهيكل العظمي",
      level: "knowledge",
      prompt: "انقر على القفص الصدري (الأضلاع) الذي يحمي القلب والرئتين.",
      image: "images/skeleton.png",
      fit: "height",
      bg: "#fdf9ee",
      spot: { x: 53, y: 27, r: 11 }
    },

    // ① سحب وإفلات: تسمية عظام الهيكل — تطبيق
    {
      type: "drag-drop",
      objective: "4Bh7: يستنتج أنّ العظام ترتبط مع بعضها لتكوّن الهيكل العظمي",
      level: "application",
      prompt: "اسحب اسم كل عظم إلى مكانه في الهيكل.",
      image: "images/skeleton.png",
      bg: "#fdf9ee",
      targets: [
        { answer: "الجُمجمة",    box:{x:80,y:10}, dot:{x:50,y:7} },
        { answer: "ألواح الكتف", box:{x:16,y:22}, dot:{x:36,y:17} },
        { answer: "الأضلاع",     box:{x:84,y:30}, dot:{x:53,y:27} },
        { answer: "عظام الورك",  box:{x:16,y:48}, dot:{x:50,y:46} },
        { answer: "عظمة الفخذ",  box:{x:84,y:64}, dot:{x:42,y:61} },
        { answer: "قصبة الساق",  box:{x:16,y:82}, dot:{x:58,y:83} }
      ]
    },

    // ④ صواب وخطأ — استدلال (ربط شكل العظم بوظيفته)
    {
      type: "true-false",
      objective: "4Bh6: يلاحظ أنّ للعظام أشكالاً وأحجاماً مختلفة",
      level: "reasoning",
      statement: "العظامُ المسطّحةُ مثلُ الجُمجمةِ أنسبُ لحمايةِ الأعضاءِ من العظامِ الطويلةِ.",
      answer: true
    },

    // ⑯ البازل (تركيب الصورة)
    // صورة واحدة "هيكل-بازل.png" يقسّمها الكود إلى شبكة ٣×٣ قطعاً ويبعثرها، ثم يعيد الطالب ترتيبها بالسحب.
    {
      type: "puzzle",
      objective: "4Bh7: يستنتج أنّ العظام ترتبط مع بعضها لتكوّن الهيكل العظمي",
      level: "application",
      prompt: "ركّب صورة الهيكل العظمي: اسحب كل قطعة إلى مكانها الصحيح.",
      image: "images/هيكل-بازل.png",
      bg: "#fdf9ee",
      grid: { cols: 3, rows: 3 }
    }

  ],

  // العلوم/الرابع — الدرس الثالث: لماذا نحتاج إلى هيكل عظمي؟ (ص ٢٧–٢٨)
  "g4s-1-3": [

    // ⑤ تحديد الأجزاء (hotspot)
    {
      type: "hotspot",
      objective: "4Bh2: يميّز أنّ الهيكل العظمي ينمو مع نمو الإنسان ويدعم ويحمي الجسم",
      level: "application",
      prompt: "انقر على هيكل الشخص البالغ (الأكبر حجماً).",
      image: "images/skeleton-ages.jpg",
      fit: "width",
      bg: "#fdf9ee",
      spot: { x: 86, y: 50, r: 12 }
    },

    // ③ اختيار من متعدد
    {
      type: "mcq",
      objective: "4Bh2: يميّز أنّ الهيكل العظمي ينمو مع نمو الإنسان ويدعم ويحمي الجسم",
      level: "knowledge",
      prompt: "ما اسم الصورة التي يطلبها الأطباء لرؤية العظام داخل الجسم والتأكّد من سلامتها؟",
      options: ["الأشعة السينية", "الصورة الملوّنة", "صورة المجهر", "الصورة الحرارية"],
      answer: 0
    },

    // ④ صواب وخطأ
    {
      type: "true-false",
      objective: "4Bh2: يميّز أنّ الهيكل العظمي ينمو مع نمو الإنسان ويدعم ويحمي الجسم",
      level: "knowledge",
      statement: "تبقى العظام مكسورة ولا تلتئم أبداً.",
      answer: false
    },

    // ① سحب وإفلات (تسمية على صورة): الهيكل ينمو مع العمر
    {
      type: "drag-drop",
      objective: "4Bh2: يميّز أنّ الهيكل العظمي ينمو مع نمو الإنسان ويدعم ويحمي الجسم",
      level: "reasoning",
      prompt: "اسحب المرحلة العمرية المناسبة تحت كل هيكل، من الأصغر إلى الأكبر.",
      image: "images/skeleton-ages.jpg",
      bg: "#ebd1ad",
      targets: [
        { answer: "طفل صغير", box:{x:28,y:82}, dot:{x:13,y:55} },
        { answer: "طفل",      box:{x:43,y:84}, dot:{x:38,y:55} },
        { answer: "مراهق",    box:{x:58,y:82}, dot:{x:63,y:55} },
        { answer: "بالغ",     box:{x:72,y:84}, dot:{x:86,y:55} }
      ]
    },

    // ② توصيل: المصطلح ← معناه
    {
      type: "matching",
      objective: "4Bh2: يميّز أنّ الهيكل العظمي ينمو مع نمو الإنسان ويدعم ويحمي الجسم",
      level: "knowledge",
      prompt: "صِل كل مصطلح بمعناه.",
      pairs: [
        { a: "الكَسْر",        b: "إصابة في العظام" },
        { a: "الأشعة السينية", b: "صور تُظهر العظام داخل الجسم" },
        { a: "اللافقاري",      b: "حيوان بلا هيكل عظمي" },
        { a: "الالتئام",       b: "نموّ أطراف العظم المكسور نحو بعضها" }
      ]
    },

    // ⑨ الاستبعاد (الدخيل) — إثرائي: ما ليس من فوائد الهيكل العظمي
    {
      type: "exclude",
      objective: "4Bh2: يميّز أنّ الهيكل العظمي ينمو مع نمو الإنسان ويدعم ويحمي الجسم",
      level: "reasoning",
      prompt: "أيُّها ليس من فوائدِ الهيكلِ العظميِّ؟",
      options: ["يدعمُ الجسمَ", "يحمي الأعضاءَ", "ينمو مع الإنسانِ", "يهضمُ الطعامَ"],
      answer: 3,
      reason: "الهضمُ وظيفةُ الجهازِ الهضميِّ لا الهيكلِ العظميِّ."
    }

  ],

  // العلوم/الرابع — الدرس الرابع: الهياكل العظمية والحركة (ص ٢٩–٣٠)
  "g4s-1-4": [

    // ④ صواب وخطأ
    {
      type: "true-false",
      objective: "4Bh3: يستنتج أنّ الحيوانات ذات الهيكل العظمي تملك عضلات مرتبطة بالعظام",
      level: "knowledge",
      statement: "العضلات في أجسامنا مرتبطة بالعظام.",
      answer: true
    },

    // ⑤ تحديد الأجزاء (hotspot)
    {
      type: "hotspot",
      objective: "4Bh4b: يميّز طريقة عمل العضلة بشكل ثنائي لتساعدنا على الحركة",
      level: "reasoning",
      prompt: "انقر على الذراع التي انقبضت عضلتها الأمامية (الذراع المثنيّة).",
      image: "images/muscles-arm.jpg",
      fit: "width",
      bg: "#e9dcc2",
      spot: { x: 22, y: 48, r: 16 }
    },

    // ③ اختيار من متعدد
    {
      type: "mcq",
      objective: "4Bh4a: يستنتج أنّ انقباض العضلة يؤدّي إلى حركة العظام",
      level: "knowledge",
      prompt: "ماذا يحدث للعضلة عندما تنقبض؟",
      options: ["تصبح أقصر وتجذب العظم", "تصبح أطول وترتاح", "تلتوي حول العظم", "تنفصل عن العظم"],
      answer: 0
    },

    // ① سحب وإفلات (تسمية على صورة): العمل الثنائي للعضلات
    {
      type: "drag-drop",
      objective: "4Bh4b: يميّز طريقة عمل العضلة بشكل ثنائي لتساعدنا على الحركة",
      level: "application",
      prompt: "اسحب حالة العضلة الأمامية لكل ذراع: «منقبضة» للذراع المثنيّة، و«منبسطة» للذراع الممدودة.",
      image: "images/muscles-arm.jpg",
      bg: "#e9dcc2",
      targets: [
        { answer: "منقبضة", box:{x:16,y:46}, dot:{x:16,y:49} },
        { answer: "منبسطة", box:{x:84,y:46}, dot:{x:73,y:49} }
      ]
    },

    // ② توصيل: المصطلح ← معناه
    {
      type: "matching",
      objective: "4Bh4a: يستنتج أنّ انقباض العضلة يؤدّي إلى حركة العظام",
      level: "knowledge",
      prompt: "صِل كل مصطلح بمعناه.",
      pairs: [
        { a: "تنقبض العضلة", b: "تصبح أقصر وتجذب العظم" },
        { a: "تنبسط العضلة", b: "تصبح أطول فترتاح" },
        { a: "العضلات",      b: "تغطّي الهيكل وتسمح بالحركة" },
        { a: "القلب",        b: "عضلة غير مرتبطة بالعظام" }
      ]
    },

    // 🎨 التلوين بالتعليمات — إثرائي: تلوين العضلة المنقبضة والمنبسطة (رسم SVG بلا ملامح وجه)
    {
      type: "color",
      objective: "4Bh4b: يميّز طريقة عمل العضلة بشكل ثنائي لتساعدنا على الحركة",
      level: "application",
      prompt: "لوّن العضلةَ المنقبضةَ بالأحمرِ والمنبسطةَ بالأزرقِ: اختر لوناً من اللوحة ثم اضغط الجزء.",
      bg: "#e9dcc2",
      palette: [
        { name: "أحمر",  color: "#cf3b3b" },
        { name: "أزرق",  color: "#2f6fb0" },
        { name: "رمادي", color: "#9aa3ab" }
      ],
      parts: [
        { name: "العضلة الأمامية (منقبضة)", color: "#cf3b3b" },
        { name: "العضلة الخلفية (منبسطة)",  color: "#2f6fb0" }
      ],
      svg: `<svg viewBox="108 -45 1181 1178" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ذراع مثنية تُظهر العضلة الأمامية والخلفية">
        <path d="M0 0 C2.7 0.02 5.39 0.02 8.09 0.01 C21.79 0.03 35.39 0.63 48.56 4.71 C50.07 5.16 51.58 5.6 53.09 6.04 C54.2 6.37 54.2 6.37 55.32 6.71 C58.08 7.5 60.86 8.21 63.64 8.91 C69.95 10.51 75.67 12.49 81.5 15.34 C82.83 15.9 84.17 16.46 85.5 17.02 C102.66 24.72 117.9 34.27 131.5 47.34 C132 47.8 132.5 48.26 133.01 48.74 C164.32 77.78 175.72 119.03 183.5 159.71 C183.63 160.38 183.76 161.06 183.89 161.75 C184.15 163.1 184.41 164.45 184.67 165.79 C185.28 168.98 185.89 172.16 186.5 175.34 C186.7 176.35 186.89 177.36 187.09 178.41 C196.59 226.62 219 257.22 253.11 290.91 C257.93 295.68 262.65 300.49 267.06 305.65 C269.03 307.95 271.11 310.13 273.19 312.34 C279.5 319.27 285.03 326.73 290.5 334.34 C290.93 334.92 291.36 335.51 291.8 336.11 C309.75 360.93 321.06 389.8 328.5 419.34 C328.7 420.11 328.89 420.88 329.09 421.67 C330.44 427.19 331.54 432.73 332.5 438.34 C332.73 439.64 332.73 439.64 332.96 440.97 C339.15 478.64 335.98 518.18 331.19 555.85 C323.51 610.13 323.51 610.13 341.5 660.34 C344.96 656.93 348.31 653.43 351.61 649.87 C362.37 638.29 373.07 627.13 385.5 617.34 C386.6 616.43 387.69 615.52 388.78 614.61 C403.03 602.81 418.64 592.83 434.5 583.34 C435.93 582.47 437.36 581.61 438.79 580.75 C447.24 575.66 455.72 570.61 464.22 565.6 C499.86 544.55 534.88 522.92 566.4 495.97 C569.33 493.47 572.31 491.06 575.31 488.65 C579.24 485.45 582.87 482.13 586.36 478.45 C588.13 476.7 589.93 475.11 591.83 473.5 C597.87 468.25 603.46 462.52 609.11 456.86 C611.06 454.9 613.01 452.95 614.97 451.01 C623.27 442.71 623.27 442.71 631.12 433.97 C633.29 431.41 635.59 428.98 637.88 426.52 C642.11 421.93 646.16 417.23 650.07 412.36 C651.86 410.13 653.67 407.92 655.49 405.72 C663.62 395.9 671.19 385.78 678.5 375.34 C679.26 374.26 679.26 374.26 680.04 373.16 C690.63 358.15 700.01 342.08 706.31 324.77 C706.56 324.1 706.81 323.43 707.07 322.74 C708.46 318.58 708.73 315.55 707.5 311.34 C706.41 309.52 706.41 309.52 704.94 307.96 C693.74 293.85 685.96 272.26 686.5 254.34 C685.68 254.36 684.86 254.38 684.01 254.41 C669.41 254.64 653.8 252.05 642.39 242.2 C631.2 231.15 624.17 213.37 623.37 197.74 C623.38 193.49 623.4 189.48 624.5 185.34 C623.53 185.27 622.56 185.21 621.56 185.15 C609.18 183.28 599.43 172.16 592.19 162.76 C585.53 153.21 583.55 142.8 585.5 131.34 C587.83 123.41 591.12 115.82 594.32 108.22 C596.76 102.26 598.61 96.34 599.88 90.02 C602.62 77.99 606.99 66.9 617.76 59.86 C623.07 57.13 627.28 56.22 633.19 56.27 C634.96 56.29 634.96 56.29 636.76 56.3 C637.67 56.31 638.57 56.32 639.5 56.34 C639.35 54.73 639.35 54.73 639.19 53.09 C639.22 43.46 644.87 34.02 651.5 27.34 C661.7 19.06 671.85 18.31 684.5 19.34 C712.76 22.69 741.37 29.88 768.5 38.34 C769.4 38.61 770.29 38.89 771.21 39.18 C791.76 45.59 810.52 53.24 821.12 73.41 C829.21 91.43 835.05 111.74 837.08 131.39 C837.25 135.12 837.25 135.12 838.5 137.34 C839.22 140.81 839.71 144.33 840.25 147.84 C840.42 148.95 840.59 150.05 840.77 151.2 C842.76 164.46 844.29 177.78 845.84 191.1 C845.94 191.99 846.04 192.88 846.15 193.79 C846.34 195.46 846.54 197.13 846.73 198.8 C846.82 199.56 846.9 200.32 846.99 201.1 C847.07 201.75 847.14 202.4 847.22 203.07 C847.45 204.92 847.72 206.76 848 208.61 C848.52 212.49 848.83 216.36 849.05 220.27 C849.09 221.01 849.13 221.75 849.18 222.51 C849.59 230.15 849.68 237.78 849.7 245.43 C849.71 246.16 849.71 246.88 849.71 247.63 C849.73 251.47 849.74 255.31 849.74 259.15 C849.75 262.26 849.76 265.37 849.78 268.48 C849.92 287.33 849.41 305.66 846.5 324.34 C846.35 325.35 846.19 326.37 846.03 327.41 C843.19 346 838.55 363.75 832.44 381.52 C832.12 382.44 831.81 383.36 831.48 384.31 C829.18 390.83 826.42 397.07 823.5 403.34 C822.81 404.88 822.12 406.42 821.44 407.96 C821.12 408.69 820.8 409.41 820.47 410.16 C820.15 410.88 819.83 411.6 819.5 412.34 C818.83 413.84 818.17 415.34 817.5 416.84 C817.17 417.58 816.84 418.33 816.5 419.1 C815.85 420.56 815.19 422.02 814.54 423.48 C813.14 426.6 811.75 429.72 810.49 432.9 C807.56 440.29 804.02 447.24 800.24 454.22 C797.57 459.19 795.16 464.23 792.85 469.38 C790.31 474.93 787.55 480.38 784.81 485.84 C784.35 486.75 784.35 486.75 783.88 487.69 C779.72 496 775.48 504.25 771.12 512.46 C767.98 518.37 764.98 524.34 762 530.34 C758.23 537.93 754.38 545.46 750.41 552.95 C747.5 558.43 744.63 563.94 741.78 569.45 C736.16 580.31 730.42 591.1 724.52 601.82 C722.45 605.6 720.39 609.39 718.35 613.2 C710.72 627.44 702.75 641.44 694.5 655.34 C693.57 656.91 693.57 656.91 692.62 658.51 C684.94 671.44 677.13 684.27 669.03 696.93 C667.41 699.48 665.81 702.03 664.21 704.59 C656.25 717.27 647.89 729.63 639.25 741.86 C637.77 743.96 636.3 746.05 634.83 748.16 C627.95 757.96 620.64 767.44 613.34 776.93 C611.75 779.01 610.16 781.1 608.57 783.18 C597.29 797.97 585.31 812.18 572.74 825.88 C570.77 828.05 568.84 830.24 566.94 832.46 C563.69 836.2 560.2 839.65 556.68 843.13 C554.76 845.08 552.96 847.07 551.19 849.15 C544.62 856.79 537.35 863.91 529.68 870.44 C527.36 872.46 525.12 874.54 522.87 876.64 C517.47 881.68 511.98 886.52 506.22 891.14 C503.43 893.39 500.72 895.7 498 898.02 C471.91 919.72 442.59 937.55 413.53 954.92 C396.98 964.83 380.63 975.03 364.41 985.47 C354.13 992.08 343.81 998.63 333.31 1004.9 C332.64 1005.3 331.97 1005.71 331.28 1006.13 C327.4 1008.42 323.57 1010.18 319.33 1011.68 C316.91 1012.55 314.59 1013.64 312.25 1014.71 C286.92 1025.08 257.25 1026.23 231.5 1016.34 C230.3 1015.94 230.3 1015.94 229.08 1015.54 C205.78 1007.69 184.72 992.95 166.77 976.42 C164.69 974.51 162.58 972.67 160.44 970.84 C153.19 964.49 146.75 957.66 140.74 950.13 C139.3 948.33 137.82 946.55 136.32 944.79 C126.38 933.11 118.79 919.86 110.97 906.72 C95.95 881.49 79.37 857.55 61.52 834.23 C40.38 806.6 20.47 778.14 2.5 748.34 C1.94 747.42 1.39 746.49 0.81 745.55 C-8.68 729.75 -17.34 713.58 -25.6 697.12 C-26.47 695.39 -27.34 693.66 -28.21 691.93 C-40.03 668.38 -49.99 644.03 -58.82 619.22 C-59.51 617.31 -60.23 615.42 -60.96 613.53 C-63.21 607.57 -65.01 601.46 -66.89 595.38 C-68.15 591.39 -69.42 587.52 -71.08 583.68 C-72.72 579.83 -73.74 576.01 -74.75 571.96 C-76.75 564.14 -78.87 556.36 -81.06 548.59 C-82.96 541.85 -84.84 535.11 -86.62 528.34 C-88.21 522.32 -89.94 516.36 -91.75 510.41 C-94.77 500.36 -96.57 490.04 -98.56 479.75 C-99.75 473.66 -101.15 467.69 -102.88 461.73 C-103.47 459.43 -103.8 457.26 -104 454.9 C-104.3 451.44 -104.98 448.26 -105.87 444.9 C-107.2 439.86 -108.13 434.85 -108.94 429.71 C-112.82 405.35 -118.72 380.04 -128.5 357.34 C-129.02 356.06 -129.54 354.77 -130.05 353.49 C-134.68 342.02 -139.8 330.82 -145.26 319.72 C-159.11 291.42 -170.9 262.45 -176.5 231.34 C-176.66 230.43 -176.83 229.53 -177 228.6 C-181.7 201.57 -181.27 172.31 -176.5 145.34 C-176.36 144.53 -176.23 143.72 -176.09 142.89 C-172.75 123.1 -166.25 103.87 -156.5 86.34 C-155.92 85.27 -155.35 84.21 -154.76 83.12 C-145.42 66.42 -132.42 50.88 -117 39.46 C-116.31 38.95 -115.62 38.43 -114.91 37.9 C-108.05 32.88 -100.89 28.51 -93.5 24.34 C-92.4 23.7 -91.3 23.06 -90.16 22.4 C-82.53 18.11 -74.79 15.11 -66.5 12.34 C-65.08 11.8 -63.66 11.26 -62.25 10.71 C-57.71 9.05 -53.14 7.67 -48.5 6.34 C-47.7 6.09 -46.91 5.84 -46.08 5.59 C-30.99 1.1 -15.68 -0.15 0 0 Z " fill="#16120F" transform="translate(364.498779296875,31.663818359375)"/>
        <path d="M0 0 C2.7 0.02 5.39 0.02 8.09 0.01 C21.79 0.03 35.39 0.63 48.56 4.71 C50.07 5.16 51.58 5.6 53.09 6.04 C54.2 6.37 54.2 6.37 55.32 6.71 C58.08 7.5 60.86 8.21 63.64 8.91 C69.95 10.51 75.67 12.49 81.5 15.34 C82.83 15.9 84.17 16.46 85.5 17.02 C102.66 24.72 117.9 34.27 131.5 47.34 C132 47.8 132.5 48.26 133.01 48.74 C164.32 77.78 175.72 119.03 183.5 159.71 C183.63 160.38 183.76 161.06 183.89 161.75 C184.15 163.1 184.41 164.45 184.67 165.79 C185.28 168.98 185.89 172.16 186.5 175.34 C186.7 176.35 186.89 177.36 187.09 178.41 C196.59 226.62 219 257.22 253.11 290.91 C257.93 295.68 262.65 300.49 267.06 305.65 C269.03 307.95 271.11 310.13 273.19 312.34 C279.5 319.27 285.03 326.73 290.5 334.34 C290.93 334.92 291.36 335.51 291.8 336.11 C309.75 360.93 321.06 389.8 328.5 419.34 C328.7 420.11 328.89 420.88 329.09 421.67 C330.44 427.19 331.54 432.73 332.5 438.34 C332.73 439.64 332.73 439.64 332.96 440.97 C339.15 478.64 335.98 518.18 331.19 555.85 C323.51 610.13 323.51 610.13 341.5 660.34 C344.96 656.93 348.31 653.43 351.61 649.87 C362.37 638.29 373.07 627.13 385.5 617.34 C386.6 616.43 387.69 615.52 388.78 614.61 C403.03 602.81 418.64 592.83 434.5 583.34 C435.93 582.47 437.36 581.61 438.79 580.75 C447.24 575.66 455.72 570.61 464.22 565.6 C499.86 544.55 534.88 522.92 566.4 495.97 C569.33 493.47 572.31 491.06 575.31 488.65 C579.24 485.45 582.87 482.13 586.36 478.45 C588.13 476.7 589.93 475.11 591.83 473.5 C597.87 468.25 603.46 462.52 609.11 456.86 C611.06 454.9 613.01 452.95 614.97 451.01 C623.27 442.71 623.27 442.71 631.12 433.97 C633.29 431.41 635.59 428.98 637.88 426.52 C642.11 421.93 646.16 417.23 650.07 412.36 C651.86 410.13 653.67 407.92 655.49 405.72 C663.62 395.9 671.19 385.78 678.5 375.34 C679.26 374.26 679.26 374.26 680.04 373.16 C690.63 358.15 700.01 342.08 706.31 324.77 C706.56 324.1 706.81 323.43 707.07 322.74 C708.46 318.58 708.73 315.55 707.5 311.34 C706.41 309.52 706.41 309.52 704.94 307.96 C693.74 293.85 685.96 272.26 686.5 254.34 C685.68 254.36 684.86 254.38 684.01 254.41 C669.41 254.64 653.8 252.05 642.39 242.2 C631.2 231.15 624.17 213.37 623.37 197.74 C623.38 193.49 623.4 189.48 624.5 185.34 C623.53 185.27 622.56 185.21 621.56 185.15 C609.18 183.28 599.43 172.16 592.19 162.76 C585.53 153.21 583.55 142.8 585.5 131.34 C587.83 123.41 591.12 115.82 594.32 108.22 C596.76 102.26 598.61 96.34 599.88 90.02 C602.62 77.99 606.99 66.9 617.76 59.86 C623.07 57.13 627.28 56.22 633.19 56.27 C634.96 56.29 634.96 56.29 636.76 56.3 C637.67 56.31 638.57 56.32 639.5 56.34 C639.35 54.73 639.35 54.73 639.19 53.09 C639.22 43.46 644.87 34.02 651.5 27.34 C661.7 19.06 671.85 18.31 684.5 19.34 C712.76 22.69 741.37 29.88 768.5 38.34 C769.4 38.61 770.29 38.89 771.21 39.18 C791.76 45.59 810.52 53.24 821.12 73.41 C829.21 91.43 835.05 111.74 837.08 131.39 C837.25 135.12 837.25 135.12 838.5 137.34 C839.22 140.81 839.71 144.33 840.25 147.84 C840.42 148.95 840.59 150.05 840.77 151.2 C842.76 164.46 844.29 177.78 845.84 191.1 C845.94 191.99 846.04 192.88 846.15 193.79 C846.34 195.46 846.54 197.13 846.73 198.8 C846.82 199.56 846.9 200.32 846.99 201.1 C847.07 201.75 847.14 202.4 847.22 203.07 C847.45 204.92 847.72 206.76 848 208.61 C848.52 212.49 848.83 216.36 849.05 220.27 C849.09 221.01 849.13 221.75 849.18 222.51 C849.59 230.15 849.68 237.78 849.7 245.43 C849.71 246.16 849.71 246.88 849.71 247.63 C849.73 251.47 849.74 255.31 849.74 259.15 C849.75 262.26 849.76 265.37 849.78 268.48 C849.92 287.33 849.41 305.66 846.5 324.34 C846.35 325.35 846.19 326.37 846.03 327.41 C843.19 346 838.55 363.75 832.44 381.52 C832.12 382.44 831.81 383.36 831.48 384.31 C829.18 390.83 826.42 397.07 823.5 403.34 C822.81 404.88 822.12 406.42 821.44 407.96 C821.12 408.69 820.8 409.41 820.47 410.16 C820.15 410.88 819.83 411.6 819.5 412.34 C818.83 413.84 818.17 415.34 817.5 416.84 C817.17 417.58 816.84 418.33 816.5 419.1 C815.85 420.56 815.19 422.02 814.54 423.48 C813.14 426.6 811.75 429.72 810.49 432.9 C807.56 440.29 804.02 447.24 800.24 454.22 C797.57 459.19 795.16 464.23 792.85 469.38 C790.31 474.93 787.55 480.38 784.81 485.84 C784.35 486.75 784.35 486.75 783.88 487.69 C779.72 496 775.48 504.25 771.12 512.46 C767.98 518.37 764.98 524.34 762 530.34 C758.23 537.93 754.38 545.46 750.41 552.95 C747.5 558.43 744.63 563.94 741.78 569.45 C736.16 580.31 730.42 591.1 724.52 601.82 C722.45 605.6 720.39 609.39 718.35 613.2 C710.72 627.44 702.75 641.44 694.5 655.34 C693.57 656.91 693.57 656.91 692.62 658.51 C684.94 671.44 677.13 684.27 669.03 696.93 C667.41 699.48 665.81 702.03 664.21 704.59 C656.25 717.27 647.89 729.63 639.25 741.86 C637.77 743.96 636.3 746.05 634.83 748.16 C627.95 757.96 620.64 767.44 613.34 776.93 C611.75 779.01 610.16 781.1 608.57 783.18 C597.29 797.97 585.31 812.18 572.74 825.88 C570.77 828.05 568.84 830.24 566.94 832.46 C563.69 836.2 560.2 839.65 556.68 843.13 C554.76 845.08 552.96 847.07 551.19 849.15 C544.62 856.79 537.35 863.91 529.68 870.44 C527.36 872.46 525.12 874.54 522.87 876.64 C517.47 881.68 511.98 886.52 506.22 891.14 C503.43 893.39 500.72 895.7 498 898.02 C471.91 919.72 442.59 937.55 413.53 954.92 C396.98 964.83 380.63 975.03 364.41 985.47 C354.13 992.08 343.81 998.63 333.31 1004.9 C332.64 1005.3 331.97 1005.71 331.28 1006.13 C327.4 1008.42 323.57 1010.18 319.33 1011.68 C316.91 1012.55 314.59 1013.64 312.25 1014.71 C286.92 1025.08 257.25 1026.23 231.5 1016.34 C230.3 1015.94 230.3 1015.94 229.08 1015.54 C205.78 1007.69 184.72 992.95 166.77 976.42 C164.69 974.51 162.58 972.67 160.44 970.84 C153.19 964.49 146.75 957.66 140.74 950.13 C139.3 948.33 137.82 946.55 136.32 944.79 C126.38 933.11 118.79 919.86 110.97 906.72 C95.95 881.49 79.37 857.55 61.52 834.23 C40.38 806.6 20.47 778.14 2.5 748.34 C1.94 747.42 1.39 746.49 0.81 745.55 C-8.68 729.75 -17.34 713.58 -25.6 697.12 C-26.47 695.39 -27.34 693.66 -28.21 691.93 C-40.03 668.38 -49.99 644.03 -58.82 619.22 C-59.51 617.31 -60.23 615.42 -60.96 613.53 C-63.21 607.57 -65.01 601.46 -66.89 595.38 C-68.15 591.39 -69.42 587.52 -71.08 583.68 C-72.72 579.83 -73.74 576.01 -74.75 571.96 C-76.75 564.14 -78.87 556.36 -81.06 548.59 C-82.96 541.85 -84.84 535.11 -86.62 528.34 C-88.21 522.32 -89.94 516.36 -91.75 510.41 C-94.77 500.36 -96.57 490.04 -98.56 479.75 C-99.75 473.66 -101.15 467.69 -102.88 461.73 C-103.47 459.43 -103.8 457.26 -104 454.9 C-104.3 451.44 -104.98 448.26 -105.87 444.9 C-107.2 439.86 -108.13 434.85 -108.94 429.71 C-112.82 405.35 -118.72 380.04 -128.5 357.34 C-129.02 356.06 -129.54 354.77 -130.05 353.49 C-134.68 342.02 -139.8 330.82 -145.26 319.72 C-159.11 291.42 -170.9 262.45 -176.5 231.34 C-176.66 230.43 -176.83 229.53 -177 228.6 C-181.7 201.57 -181.27 172.31 -176.5 145.34 C-176.36 144.53 -176.23 143.72 -176.09 142.89 C-172.75 123.1 -166.25 103.87 -156.5 86.34 C-155.92 85.27 -155.35 84.21 -154.76 83.12 C-145.42 66.42 -132.42 50.88 -117 39.46 C-116.31 38.95 -115.62 38.43 -114.91 37.9 C-108.05 32.88 -100.89 28.51 -93.5 24.34 C-92.4 23.7 -91.3 23.06 -90.16 22.4 C-82.53 18.11 -74.79 15.11 -66.5 12.34 C-65.08 11.8 -63.66 11.26 -62.25 10.71 C-57.71 9.05 -53.14 7.67 -48.5 6.34 C-47.7 6.09 -46.91 5.84 -46.08 5.59 C-30.99 1.1 -15.68 -0.15 0 0 Z M-84.5 76.34 C-85.19 76.93 -85.88 77.52 -86.59 78.13 C-95.03 85.95 -101.48 96.61 -105.5 107.34 C-105.89 108.35 -106.28 109.36 -106.69 110.4 C-110.31 123.52 -110.44 139.93 -105.28 152.55 C-103.48 159 -106.13 164.35 -109.06 169.96 C-109.41 170.65 -109.76 171.34 -110.13 172.05 C-113.11 177.8 -116.43 183.31 -119.93 188.76 C-123.73 195.01 -123.03 202.28 -122.5 209.34 C-121.57 212.63 -120.13 215.35 -118.5 218.34 C-114.66 225.63 -113.09 233.02 -111.62 241.09 C-111.37 242.44 -111.12 243.79 -110.86 245.14 C-107.76 261.82 -105.12 278.58 -102.5 295.34 C-102.39 296 -102.29 296.67 -102.18 297.35 C-101.23 303.46 -100.29 309.57 -99.36 315.68 C-99.22 316.59 -99.08 317.5 -98.94 318.44 C-98.62 320.56 -98.3 322.67 -97.98 324.79 C-97.81 325.95 -97.64 327.1 -97.46 328.29 C-97.3 329.35 -97.14 330.4 -96.98 331.49 C-96.57 333.89 -96.07 336.18 -95.44 338.52 C-94.47 342.46 -94.05 346.21 -93.74 350.23 C-93.61 352.39 -93.61 352.39 -92.5 354.34 C-92.26 355.68 -92.06 357.03 -91.89 358.39 C-91.77 359.22 -91.66 360.05 -91.55 360.91 C-91.43 361.81 -91.31 362.72 -91.19 363.65 C-90.06 371.9 -88.67 380.06 -87.05 388.22 C-85.51 396.09 -84.21 403.98 -82.98 411.9 C-82.05 417.71 -80.79 423.28 -79.13 428.91 C-78.54 431.17 -78.23 433.26 -78.06 435.59 C-77.65 440.24 -76.41 444.57 -75.15 449.06 C-73.68 454.42 -72.55 459.81 -71.5 465.27 C-69.8 474.05 -67.77 482.69 -65.5 491.34 C-65.04 493.13 -65.04 493.13 -64.57 494.96 C-62.26 503.82 -59.66 512.59 -57 521.35 C-55.84 525.19 -54.71 529.03 -53.6 532.88 C-50.1 544.99 -46.41 557.14 -41.55 568.78 C-40.41 571.55 -39.35 574.35 -38.29 577.15 C-35.33 584.84 -32.16 592.44 -28.94 600.02 C-28.63 600.74 -28.33 601.45 -28.02 602.19 C-22.54 615.08 -16.8 627.83 -10.83 640.5 C-9.58 643.16 -8.34 645.83 -7.1 648.5 C-2.39 658.62 2.65 668.52 7.92 678.37 C9.42 681.18 10.9 684 12.38 686.83 C19.83 701.02 27.38 715.1 35.55 728.89 C39.3 735.24 42.89 741.65 46.38 748.15 C52.17 758.92 58.4 769.41 64.67 779.91 C67.94 785.37 71.14 790.88 74.31 796.4 C89.75 823.18 106.51 849.2 124.5 874.34 C125.07 875.13 125.63 875.93 126.22 876.74 C132.96 886.2 139.84 895.24 147.9 903.61 C150.06 905.88 152.07 908.18 154.06 910.59 C162.64 920.47 176.29 931.84 188.85 936.14 C192.16 937.63 194.37 939.66 197.06 942.09 C205.98 949.81 216.36 955.47 228.4 955.51 C238.63 955.57 238.63 955.57 242.81 959.65 C243.71 960.59 243.71 960.59 244.63 961.55 C251.56 968.18 261.64 967.95 270.65 967.88 C288.82 967.24 300.05 956.48 312 943.97 C314.9 940.82 317.53 937.44 320.2 934.09 C327.68 925.14 336.34 917.51 345.5 910.34 C346.56 909.49 347.61 908.64 348.67 907.79 C359.36 899.24 370.46 891.24 381.69 883.41 C391.46 876.59 400.97 869.48 410.42 862.23 C414.23 859.3 418.08 856.41 421.95 853.55 C429.52 847.96 436.71 842.03 443.79 835.82 C445.49 834.35 447.2 832.89 448.92 831.44 C461.53 820.8 473.54 809.52 485.06 797.71 C487.5 795.34 487.5 795.34 490.38 793.02 C492.67 791.14 494.58 789.16 496.5 786.9 C499.96 782.83 503.7 779.09 507.5 775.34 C511.69 771.18 515.78 767.03 519.6 762.52 C522.32 759.39 525.17 756.37 528 753.34 C532.59 748.41 537.12 743.45 541.5 738.34 C542.4 737.29 543.3 736.24 544.2 735.2 C554.1 723.69 563.93 712.12 573.5 700.34 C574.52 699.09 575.54 697.84 576.56 696.59 C587.53 683.15 598.19 669.49 608.7 655.69 C610.61 653.2 612.52 650.71 614.43 648.22 C622.98 637.06 631.34 625.78 639.5 614.34 C640.36 613.14 641.21 611.94 642.07 610.74 C643.28 609.04 644.49 607.35 645.7 605.66 C648.52 601.7 651.36 597.76 654.22 593.82 C664.61 579.46 674.78 564.96 684.93 550.43 C687.28 547.08 689.62 543.74 691.97 540.39 C699.95 529.05 707.8 517.62 715.59 506.14 C721.22 497.87 726.86 489.6 732.5 481.34 C733.02 480.58 733.53 479.82 734.06 479.05 C761.86 438.35 761.86 438.35 781.06 425.26 C786.48 420.99 789.97 415.58 790.83 408.72 C791.12 401.5 789.94 396.09 784.99 390.69 C781.9 387.86 778.74 385.9 775 384.02 C770.44 381.64 768.09 378.54 765.12 374.42 C761.62 369.91 756.97 367.62 751.5 366.34 C744.89 365.52 740.04 366.63 734.5 370.34 C727.93 375.84 724.54 382.45 722.3 390.57 C717.69 406.57 708.83 418.63 698.5 431.34 C697.67 432.35 697.67 432.35 696.83 433.39 C689.35 442.59 681.72 451.65 673.97 460.63 C672.47 462.38 670.97 464.13 669.47 465.89 C664.24 472.04 658.94 478.09 653.44 484 C650.45 487.24 647.63 490.58 644.88 494.02 C641.44 498.3 637.8 502.18 633.84 505.97 C631.22 508.62 628.8 511.4 626.37 514.21 C623.36 517.64 620.25 520.96 617.13 524.27 C616.47 524.97 615.82 525.67 615.14 526.39 C611.05 530.73 606.91 535 602.63 539.15 C600.85 540.98 599.21 542.84 597.56 544.77 C591.67 551.56 585.14 557.75 578.75 564.06 C577.04 565.76 575.33 567.45 573.63 569.15 C573.12 569.65 572.6 570.15 572.08 570.67 C569.31 573.42 566.69 576.24 564.14 579.19 C560.33 583.6 556.25 587.71 552.12 591.82 C551.34 592.59 550.56 593.37 549.76 594.17 C547.3 596.62 544.84 599.07 542.38 601.52 C540.72 603.18 539.06 604.83 537.4 606.49 C534.35 609.53 531.31 612.56 528.26 615.59 C522.99 620.83 522.99 620.83 517.76 626.11 C514.95 628.98 512.09 631.72 509.02 634.31 C503.22 639.35 497.89 644.87 492.5 650.34 C480.53 662.46 480.53 662.46 474.17 667.89 C471.83 669.92 469.67 672.11 467.5 674.34 C464.01 677.86 460.46 681.2 456.7 684.43 C453.92 686.84 451.21 689.34 448.5 691.84 C443.89 696.07 439.25 700.25 434.5 704.34 C434.01 704.76 433.52 705.18 433.01 705.62 C429.44 708.69 425.87 711.75 422.29 714.8 C420.61 716.24 418.94 717.69 417.27 719.13 C409.67 725.69 401.77 731.77 393.69 737.72 C391.39 739.42 389.11 741.13 386.82 742.86 C377.01 750.22 367.07 757.1 356.5 763.34 C355.89 763.7 355.29 764.07 354.66 764.45 C352.93 765.5 351.19 766.51 349.44 767.52 C348.46 768.09 347.48 768.67 346.47 769.25 C342.66 770.64 340.4 770.35 336.5 769.34 C324.15 761.84 318.64 747.13 313.5 734.34 C313.11 733.4 312.72 732.46 312.31 731.49 C308.34 720.94 307.15 709.44 305.5 698.34 C305.32 697.28 305.15 696.23 304.96 695.15 C304.38 690.36 304.3 685.65 304.26 680.83 C304.25 679.81 304.24 678.79 304.23 677.74 C304.21 674.42 304.2 671.1 304.19 667.77 C304.19 666.64 304.18 665.5 304.18 664.33 C304.17 643.43 305.68 623.03 308.5 602.34 C308.73 600.6 308.73 600.6 308.97 598.83 C309.49 594.95 310.01 591.08 310.56 587.22 C311.4 581.39 311.91 575.6 312.26 569.72 C312.48 566.61 312.83 563.53 313.23 560.44 C320.36 505.11 316.02 445.08 294.5 393.34 C294.24 392.69 293.98 392.03 293.71 391.36 C286.39 373.24 276.14 356.97 264.5 341.34 C263.83 340.43 263.83 340.43 263.14 339.5 C255.65 329.43 247.21 320.36 238.5 311.34 C237.73 310.52 236.95 309.7 236.15 308.86 C231.82 304.39 227.12 300.49 222.26 296.6 C219.74 294.53 217.37 292.38 215 290.15 C207.37 283.21 198.85 277.37 190.5 271.34 C188.96 270.21 187.41 269.09 185.87 267.97 C178.58 262.68 171.25 257.45 163.88 252.27 C155.62 246.47 147.53 240.45 139.5 234.34 C138.91 233.89 138.33 233.44 137.72 232.98 C130.18 227.26 122.76 221.41 115.5 215.34 C114.94 214.87 114.38 214.4 113.81 213.92 C102.6 204.52 92.63 194.82 83.5 183.34 C82.63 182.29 81.75 181.24 80.88 180.19 C73.21 170.91 67.2 160.92 61.5 150.34 C60.89 149.23 60.28 148.12 59.65 146.97 C56.3 140.35 54.58 133.79 53 126.59 C51.05 117.71 49.06 110.16 41.19 104.77 C36.75 103.04 33.19 102.95 28.5 103.34 C28.35 101.8 28.35 101.8 28.19 100.23 C25.86 87.1 15.58 75.06 5.22 67.16 C-24.16 47.51 -58.68 54.04 -84.5 76.34 Z " fill="#FBC594" transform="translate(364.498779296875,31.663818359375)"/>
        <path d="M0 0 C12.18 8.94 19.36 19.19 23.36 33.66 C23.87 36.16 23.87 36.16 25.12 37.25 C26.85 37.38 28.58 37.48 30.31 37.56 C35.32 38 38.38 38.68 42.12 42.25 C45.72 47.88 47.08 53.78 48.38 60.25 C50.57 70.2 54.06 78.46 59.12 87.25 C59.48 87.89 59.84 88.52 60.2 89.18 C65.42 98.49 71.35 107.01 78.12 115.25 C78.59 115.82 79.05 116.38 79.53 116.96 C87.95 127.19 96.86 137.5 107.38 145.62 C110.12 148.25 110.12 148.25 111.06 152.12 C111.09 153.67 111.09 153.67 111.12 155.25 C108.49 154.92 105.85 154.59 103.12 154.25 C103.31 155.22 103.5 156.19 103.69 157.19 C103.9 158.7 103.9 158.7 104.12 160.25 C103.12 161.25 103.12 161.25 100.56 161.31 C99.76 161.29 98.95 161.27 98.12 161.25 C97.13 164.22 97.13 164.22 96.12 167.25 C94.46 167.29 92.79 167.29 91.12 167.25 C90.79 166.92 90.47 166.59 90.12 166.25 C89.79 167.9 89.47 169.55 89.12 171.25 C88.13 171.58 87.14 171.91 86.12 172.25 C85.79 172.91 85.47 173.57 85.12 174.25 C83.81 174.25 82.49 174.25 81.12 174.25 C80.79 173.59 80.47 172.93 80.12 172.25 C79.13 175.22 79.13 175.22 78.12 178.25 C76.81 178.25 75.49 178.25 74.12 178.25 C73.95 177.63 73.77 177.01 73.59 176.38 C66.35 151.11 55.98 125.4 36.12 107.25 C35.36 106.43 34.6 105.6 33.81 104.75 C28.65 99.95 21.26 93.25 14.12 93.25 C15.43 96.37 15.43 96.37 18.12 98.25 C18.42 100.1 18.42 100.1 18.51 102.59 C18.56 103.55 18.61 104.51 18.66 105.5 C18.73 107.11 18.73 107.11 18.81 108.75 C20.43 134.27 25.89 159.52 30.88 184.56 C31.09 185.64 31.09 185.64 31.31 186.73 C32.82 194.28 34.48 201.77 36.39 209.24 C38.08 216.18 39.4 223.2 40.79 230.21 C42.3 237.69 44.08 245.04 46.09 252.4 C47.89 259.11 49.5 265.87 51.12 272.62 C51.48 274.1 51.84 275.58 52.2 277.05 C53.87 283.99 55.52 290.92 57.12 297.88 C59.74 309.07 62.69 320.19 65.59 331.32 C66.7 335.59 67.79 339.86 68.88 344.13 C72.09 356.67 75.45 369.16 78.94 381.62 C79.13 382.32 79.33 383.02 79.53 383.74 C80.08 385.73 80.65 387.72 81.21 389.71 C81.69 391.42 81.69 391.42 82.18 393.17 C83.03 395.94 84.04 398.57 85.12 401.25 C85.8 403.81 86.45 406.36 87.06 408.94 C88.33 414.15 89.69 419.3 91.28 424.43 C92.46 428.37 93.54 432.34 94.62 436.31 C96.08 441.59 97.58 446.81 99.38 451.98 C100.75 456.15 101.89 460.4 103.06 464.62 C104.31 468.87 105.71 473.06 107.12 477.25 C107.99 479.84 108.86 482.43 109.73 485.02 C109.97 485.74 110.21 486.45 110.45 487.19 C111.22 489.48 111.98 491.77 112.75 494.06 C113.01 494.85 113.28 495.64 113.55 496.45 C116.33 504.76 119.09 513.07 121.74 521.42 C122.13 522.66 122.53 523.91 122.94 525.19 C123.66 527.48 124.38 529.77 125.09 532.07 C127.05 538.26 129.29 544.22 131.85 550.19 C133.62 554.43 135.21 558.73 136.81 563.04 C162.81 632.92 162.81 632.92 204.12 694.25 C205.35 695.69 205.35 695.69 206.59 697.15 C220.23 712.86 235.93 722.23 256.22 727.03 C266.49 729.54 275.58 734.12 281.41 743.27 C285.63 751.19 286.47 760.22 284.06 768.88 C281.77 775.04 277.72 778.88 271.98 781.91 C267.62 783.68 263.34 783.7 258.69 783.75 C248.94 783.86 241.9 785.88 234.23 792.09 C231.15 795.25 229.35 798.81 227.38 802.73 C223.88 809.75 218.28 814.21 211.06 817.06 C201.77 819.84 190.93 819.34 182.12 815.25 C164.49 805.56 154.78 790.19 149.12 771.25 C147.31 764.94 145.62 758.59 143.93 752.24 C135.12 719.32 124.52 686.98 113.9 654.61 C113.19 652.44 112.48 650.27 111.76 648.1 C110.66 644.73 109.55 641.36 108.44 638 C108.14 637.08 107.83 636.16 107.52 635.21 C105.93 630.44 104.11 625.87 102.12 621.25 C98.97 612.49 96.33 603.52 93.53 594.64 C91.57 588.5 89.49 582.49 87.04 576.53 C85.56 572.83 84.36 569.04 83.12 565.25 C82.42 563.14 81.71 561.03 81 558.92 C80.23 556.61 79.46 554.31 78.69 552 C78.31 550.86 77.92 549.72 77.53 548.55 C75.67 542.99 73.86 537.43 72.15 531.83 C69.95 524.59 67.54 517.42 65.12 510.25 C61.14 498.42 57.38 486.53 53.84 474.56 C51.22 465.61 51.22 465.61 48.12 456.81 C45.79 450.67 44.11 444.33 42.34 438.01 C40.74 432.35 39.01 426.78 37.11 421.21 C33.25 409.58 30.13 397.7 26.85 385.89 C24.88 378.83 22.79 371.81 20.62 364.81 C17.72 355.42 15.1 345.97 12.61 336.47 C11.22 331.21 9.76 326 8.13 320.8 C6.09 314.26 4.37 307.65 2.69 301 C0.64 292.98 -1.48 285.02 -3.89 277.1 C-6.1 269.71 -7.97 262.23 -9.88 254.75 C-12.16 245.8 -14.48 236.88 -17.16 228.04 C-18.65 223.1 -19.97 218.12 -21.25 213.12 C-33.07 165.78 -33.07 165.78 -55.88 123.25 C-56.39 122.54 -56.9 121.82 -57.43 121.09 C-59.95 117.81 -61.17 116.45 -65.25 115.31 C-66.12 115.29 -66.98 115.27 -67.88 115.25 C-66.63 118.99 -64.93 119.85 -61.88 122.25 C-58.11 126.33 -58.38 129.88 -58.53 135.22 C-59.26 141.66 -62.18 145.59 -66.5 150.25 C-72.01 156.33 -72.21 162.53 -72.08 170.51 C-71.83 173.85 -71.15 176.94 -70.32 180.17 C-69.66 183.25 -69.74 186.11 -69.88 189.25 C-71.19 188.92 -72.51 188.59 -73.88 188.25 C-75.36 190.73 -75.36 190.73 -76.88 193.25 C-78.19 192.59 -79.51 191.93 -80.88 191.25 C-81.87 192.57 -82.86 193.89 -83.88 195.25 C-87.75 194.38 -87.75 194.38 -88.88 193.25 C-89.54 194.24 -90.19 195.23 -90.88 196.25 C-93.04 195.74 -94.87 195.25 -96.88 194.25 C-97.2 194.91 -97.54 195.57 -97.88 196.25 C-99.19 196.25 -100.51 196.25 -101.88 196.25 C-104.05 188.47 -105.41 180.8 -106.42 172.79 C-107.79 162.12 -110.61 152.66 -116.19 143.38 C-119.06 137.65 -118.86 131.45 -117.88 125.25 C-116.05 120.56 -113.61 116.46 -110.88 112.25 C-109.93 110.78 -109.93 110.78 -108.96 109.27 C-107.77 107.44 -106.58 105.6 -105.39 103.77 C-103.35 100.37 -102.08 97.02 -100.88 93.25 C-100.11 94.05 -99.35 94.86 -98.56 95.69 C-96.08 98.42 -96.08 98.42 -92.88 99.25 C-93.46 94.94 -95.04 91.97 -97.25 88.25 C-104.53 74.88 -106.36 58.34 -102.81 43.44 C-96.29 23.82 -83.03 7.56 -64.57 -1.99 C-43.53 -12.23 -20.19 -12.24 0 0 Z " fill="#FBF3D9" transform="translate(364.875,101.75)"/>
        <path d="M0 0 C2.72 1.27 4.96 2.64 7.26 4.58 C7.87 5.1 8.49 5.61 9.13 6.14 C10.12 6.97 10.12 6.97 11.12 7.81 C19.12 14.41 27.42 20.47 35.86 26.47 C38.47 28.34 41.05 30.25 43.63 32.16 C49.76 36.7 55.99 41.05 62.31 45.31 C71.12 51.28 79.54 57.65 87.85 64.28 C89.94 65.96 92.05 67.62 94.16 69.28 C103.54 76.74 112.38 84.67 121 93 C121.64 93.61 122.28 94.22 122.94 94.85 C131.79 103.35 139.67 112.16 147 122 C147.82 123.05 147.82 123.05 148.66 124.12 C150.15 126.05 151.58 128.01 153 130 C153.7 130.97 154.4 131.94 155.12 132.94 C160.72 140.88 165.39 149.2 169.88 157.81 C170.42 158.86 170.97 159.91 171.53 160.99 C174.72 167.22 177.51 173.47 180 180 C180.4 180.98 180.8 181.96 181.21 182.98 C184.52 191.23 186.95 199.56 189.06 208.19 C189.23 208.88 189.4 209.57 189.58 210.28 C192.9 223.74 195.35 237.23 197 251 C197.17 252.4 197.17 252.4 197.35 253.83 C202.88 300.28 196.05 347.54 190.4 393.68 C187.61 416.72 187.39 439.82 187 463 C186.67 463 186.34 463 186 463 C185.96 461.84 185.96 461.84 185.92 460.66 C185.87 459.66 185.81 458.66 185.75 457.62 C185.7 456.63 185.66 455.63 185.61 454.6 C185.28 451.85 185.28 451.85 182.95 450.65 C182.31 450.43 181.66 450.22 181 450 C180.34 451.65 179.68 453.3 179 455 C178.34 454.34 177.68 453.68 177 453 C174.43 452.35 174.43 452.35 172 452 C171.67 453.98 171.34 455.96 171 458 C170.34 458 169.68 458 169 458 C168.01 456.51 168.01 456.51 167 455 C164.42 454.75 164.42 454.75 162 455 C161.34 457.31 160.68 459.62 160 462 C159.42 461.48 158.85 460.97 158.25 460.44 C156.12 458.73 156.12 458.73 153.75 459.31 C153.17 459.54 152.6 459.77 152 460 C151.67 461.32 151.34 462.64 151 464 C150.34 464 149.68 464 149 464 C148.01 462.51 148.01 462.51 147 461 C144 460.67 144 460.67 142.31 462.5 C141.88 463 141.45 463.49 141 464 C140.72 463.52 140.44 463.05 140.15 462.55 C133.99 452.15 127.55 442.44 120 433 C118.8 431.41 117.6 429.83 116.4 428.24 C106.86 415.6 96.13 403.92 85.47 392.23 C80.59 386.87 75.73 381.5 71 376 C70.18 375.05 69.36 374.09 68.51 373.11 C62.24 365.79 56.21 358.3 50.31 350.68 C49.09 349.12 47.85 347.58 46.61 346.04 C23.64 317.14 7.78 284.41 -5 250 C-5.33 249.18 -5.65 248.36 -5.99 247.52 C-8.98 239.85 -10.85 231.96 -12.78 223.98 C-13.79 219.81 -14.9 215.69 -16.06 211.56 C-20 196.74 -22.29 181.71 -24.12 166.5 C-24.21 165.84 -24.29 165.17 -24.37 164.49 C-24.95 159.66 -25.48 154.83 -26 150 C-26.08 149.23 -26.17 148.46 -26.25 147.67 C-28.02 131.12 -28.85 114.55 -29.68 97.93 C-30.98 69.25 -30.98 69.25 -35.12 40.88 C-35.48 39.04 -35.84 37.2 -36.2 35.37 C-36.43 34.21 -36.43 34.21 -36.66 33.03 C-37 31 -37 31 -37 28 C-35.68 27.67 -34.36 27.34 -33 27 C-32.67 25.02 -32.34 23.04 -32 21 C-31.34 21.33 -30.68 21.66 -30 22 C-30 22.66 -30 23.32 -30 24 C-28.68 24 -27.36 24 -26 24 C-25.67 23.01 -25.34 22.02 -25 21 C-24.01 21 -23.02 21 -22 21 C-22 19.02 -22 17.04 -22 15 C-19.69 15.33 -17.38 15.66 -15 16 C-14.67 14.02 -14.34 12.04 -14 10 C-12.02 10 -10.04 10 -8 10 C-8.33 7.69 -8.66 5.38 -9 3 C-4.55 3.99 -4.55 3.99 0 5 C0 3.35 0 1.7 0 0 Z " class="cpart" data-name="العضلة الأمامية (منقبضة)" id="muscle-front" fill="#E8E4DC" transform="translate(476,252)"/>
        <path d="M0 0 C2.37 2.31 3.56 4.07 5.19 6.88 C8.52 12.28 13.05 14.2 18.61 16.94 C22.84 19.22 25.76 21.73 27.21 26.47 C28.29 31.91 28.48 36.76 25.69 41.69 C22.45 46.29 18.16 49.33 13.62 52.56 C-5.57 66.29 -17.8 87.11 -30.85 106.33 C-33.14 109.69 -35.44 113.03 -37.75 116.38 C-41.41 121.69 -45.05 127.01 -48.67 132.35 C-60.61 149.89 -72.76 167.28 -84.94 184.66 C-87.27 187.98 -89.59 191.3 -91.9 194.62 C-102.43 209.72 -113.19 224.64 -124.14 239.44 C-128.17 244.91 -132.16 250.42 -136.12 255.94 C-140.96 262.66 -145.9 269.27 -151 275.79 C-152.55 277.79 -154.1 279.8 -155.65 281.8 C-161.9 289.88 -168.22 297.89 -174.69 305.8 C-178.16 310.05 -181.57 314.35 -184.94 318.69 C-189.15 324.1 -193.54 329.33 -198.03 334.52 C-201.09 338.05 -204.07 341.62 -207 345.25 C-210.8 349.93 -214.81 354.37 -218.89 358.8 C-221.38 361.57 -223.73 364.41 -226.06 367.31 C-229.06 371.03 -232.15 374.47 -235.59 377.78 C-237.38 379.56 -239.03 381.41 -240.68 383.32 C-251.83 396.15 -263.87 408.16 -275.88 420.19 C-276.53 420.85 -277.19 421.5 -277.86 422.18 C-290.55 434.91 -290.55 434.91 -296.71 440.14 C-299.45 442.48 -302.06 444.97 -304.69 447.44 C-310.39 452.74 -316.3 457.69 -322.38 462.56 C-323.65 463.6 -324.92 464.65 -326.2 465.69 C-333.55 471.72 -340.96 477.64 -348.63 483.28 C-350.67 484.78 -352.71 486.29 -354.74 487.8 C-362.39 493.48 -370.08 499.09 -377.88 504.56 C-389.85 512.96 -401.83 521.46 -413.15 530.74 C-414.69 532 -416.24 533.23 -417.82 534.45 C-429.9 543.92 -440.83 555.03 -450.34 567.07 C-460.27 579.25 -471.74 587.67 -487.63 589.88 C-496.36 590.16 -505.4 587.92 -512.38 582.56 C-512.87 581.08 -512.87 581.08 -513.38 579.56 C-512.3 579.05 -511.23 578.55 -510.12 578.02 C-495.92 571.2 -486.59 564.25 -481.02 548.78 C-479.61 543.91 -479.2 538.83 -478.65 533.81 C-477.95 528.4 -476.86 524.94 -473.38 520.56 C-472.95 519.97 -472.53 519.38 -472.09 518.77 C-468.18 514.29 -464.02 513.48 -458.33 512.25 C-450.17 510.35 -444.08 505.6 -438.38 499.56 C-437.91 498.71 -437.44 497.86 -436.96 496.98 C-434.94 493.9 -433.12 493.22 -429.75 491.81 C-425.29 489.74 -422.37 487.81 -419.12 484.12 C-415.48 480.2 -411.78 478.11 -406.88 476.12 C-377.57 464.25 -351.46 442.64 -327.38 422.56 C-326.49 421.85 -325.61 421.14 -324.7 420.41 C-318.72 415.59 -313.01 410.57 -307.39 405.34 C-305.12 403.23 -302.81 401.18 -300.47 399.15 C-296.6 395.77 -292.81 392.32 -289.06 388.81 C-288.06 387.87 -288.06 387.87 -287.03 386.91 C-278.94 379.28 -271.11 371.38 -263.28 363.48 C-259.68 359.85 -256.05 356.24 -252.41 352.64 C-250.94 351.17 -249.47 349.71 -248 348.25 C-247.27 347.53 -246.54 346.81 -245.79 346.06 C-241.71 342.01 -237.82 337.86 -234.07 333.51 C-231.26 330.28 -228.31 327.18 -225.38 324.06 C-220.61 318.98 -215.9 313.87 -211.38 308.56 C-210.48 307.52 -209.58 306.47 -208.68 305.43 C-198.78 293.92 -188.95 282.35 -179.38 270.56 C-178.34 269.3 -177.31 268.04 -176.28 266.78 C-170.01 259.11 -163.85 251.4 -157.86 243.51 C-156.1 241.2 -154.32 238.89 -152.55 236.58 C-145.43 227.28 -138.4 217.94 -131.66 208.37 C-129.15 204.83 -126.6 201.33 -124.06 197.81 C-123.24 196.67 -123.24 196.67 -122.4 195.51 C-119.65 191.71 -116.9 187.91 -114.15 184.12 C-108.52 176.35 -102.94 168.55 -97.44 160.69 C-96.85 159.85 -96.27 159.02 -95.67 158.16 C-92.75 153.98 -89.84 149.79 -86.94 145.59 C-80.04 135.63 -72.93 125.89 -65.44 116.36 C-64.79 115.53 -64.15 114.7 -63.48 113.84 C-62.9 113.11 -62.33 112.38 -61.74 111.63 C-60.38 109.57 -59.8 107.98 -59.38 105.56 C-62.4 105.87 -63.39 106.58 -65.57 108.79 C-66.35 109.77 -67.13 110.74 -67.94 111.75 C-68.37 112.28 -68.8 112.81 -69.24 113.36 C-72.04 116.82 -74.76 120.34 -77.5 123.85 C-77.95 124.44 -78.41 125.02 -78.88 125.62 C-79.33 126.21 -79.79 126.8 -80.26 127.41 C-83.96 132.13 -87.91 136.54 -91.99 140.93 C-94.33 143.51 -96.51 146.16 -98.69 148.88 C-102.76 153.93 -107.13 158.64 -111.58 163.37 C-115.62 167.68 -119.37 172.17 -123.07 176.79 C-126.21 180.57 -129.56 184.13 -132.92 187.71 C-136.94 192.03 -140.66 196.54 -144.36 201.14 C-146.66 203.9 -149.13 206.4 -151.71 208.91 C-154.06 211.25 -156.2 213.76 -158.37 216.27 C-160.79 219.03 -163.26 221.74 -165.75 224.44 C-171.82 231.04 -177.87 237.66 -183.75 244.44 C-188.06 249.39 -192.52 254.2 -196.97 259.03 C-199.19 261.45 -201.41 263.88 -203.62 266.31 C-204.37 267.13 -205.12 267.95 -205.89 268.8 C-207.85 270.98 -209.79 273.19 -211.72 275.41 C-215.26 279.46 -218.92 283.4 -222.62 287.31 C-227.07 292.04 -231.5 296.77 -235.88 301.56 C-237.71 303.56 -239.54 305.56 -241.38 307.56 C-241.85 308.08 -242.33 308.61 -242.82 309.14 C-254.21 321.53 -266.09 333.43 -278 345.32 C-280.78 348.09 -283.56 350.87 -286.33 353.65 C-288.5 355.82 -290.67 357.99 -292.84 360.16 C-293.87 361.19 -294.89 362.21 -295.91 363.24 C-301.04 368.37 -306.18 373.41 -311.7 378.13 C-314.41 380.45 -317.01 382.88 -319.62 385.31 C-320.75 386.35 -321.87 387.39 -323 388.43 C-323.56 388.95 -324.12 389.47 -324.69 390.01 C-331.15 395.98 -337.61 401.93 -344.25 407.69 C-346.99 410.11 -349.68 412.58 -352.38 415.06 C-356.33 418.7 -360.32 422.29 -364.38 425.82 C-370.28 430.97 -376.08 436.19 -381.56 441.78 C-383.34 443.53 -385.18 445.15 -387.08 446.76 C-391.43 450.55 -395.47 454.6 -399.5 458.73 C-401.02 460.28 -402.55 461.83 -404.08 463.38 C-406.45 465.78 -408.82 468.2 -411.18 470.62 C-413.49 472.97 -415.8 475.32 -418.12 477.66 C-418.82 478.38 -419.51 479.1 -420.22 479.84 C-427.46 487.12 -434.73 491.62 -445.12 491.88 C-450.74 491.79 -454.98 491.22 -459.38 487.56 C-467.14 478.72 -468.75 469.65 -468.19 458.25 C-467.96 448.75 -468.61 442.4 -474.38 434.56 C-475.06 433.55 -475.06 433.55 -475.76 432.51 C-479.59 427.41 -484.84 424.55 -490.38 421.56 C-489.94 419.79 -489.5 418.02 -489.06 416.25 C-488.7 414.77 -488.7 414.77 -488.32 413.26 C-487.79 411.2 -487.24 409.14 -486.62 407.11 C-484.54 400.22 -483.87 393.93 -483.94 386.75 C-483.95 385.67 -483.95 384.58 -483.96 383.47 C-484.45 359.87 -490.84 334.78 -503.52 314.7 C-504.61 311.97 -504.17 310.35 -503.38 307.56 C-502.05 307.23 -500.74 306.9 -499.38 306.56 C-498.72 307.88 -498.05 309.2 -497.38 310.56 C-496.72 310.56 -496.05 310.56 -495.38 310.56 C-495.04 308.91 -494.72 307.26 -494.38 305.56 C-492.56 304.88 -492.56 304.88 -490.38 304.56 C-488.62 306 -488.62 306 -487.38 307.56 C-487.07 306.59 -486.76 305.62 -486.44 304.62 C-485.38 301.56 -485.38 301.56 -484.38 300.56 C-482.71 300.52 -481.04 300.52 -479.38 300.56 C-478.38 302.54 -478.38 302.54 -477.38 304.56 C-476.72 304.56 -476.05 304.56 -475.38 304.56 C-475.04 302.58 -474.72 300.6 -474.38 298.56 C-472.04 298.56 -469.71 298.56 -467.38 298.56 C-466.72 297.57 -466.05 296.58 -465.38 295.56 C-461.5 297.44 -461.5 297.44 -460.38 298.56 C-460.13 300.5 -459.95 302.44 -459.8 304.38 C-459.69 305.61 -459.58 306.84 -459.47 308.1 C-459.42 308.76 -459.36 309.41 -459.3 310.09 C-456.61 340.85 -451.35 374.32 -428.39 396.88 C-426.38 398.76 -426.38 398.76 -423.38 399.56 C-423.38 400.22 -423.38 400.88 -423.38 401.56 C-432.96 405.37 -442.15 404.7 -452.29 404.27 C-454.17 404.23 -454.17 404.23 -456.09 404.18 C-457.23 404.13 -458.36 404.09 -459.53 404.04 C-462.6 404.27 -462.6 404.27 -464.27 407.09 C-464.63 407.9 -465 408.72 -465.38 409.56 C-464.38 409.23 -463.39 408.9 -462.38 408.56 C-460.14 408.48 -457.91 408.45 -455.68 408.46 C-433.86 408.4 -433.86 408.4 -413.38 401.56 C-412.6 401.19 -411.83 400.82 -411.04 400.43 C-401 395.53 -391.48 390.05 -382.38 383.56 C-381.25 382.77 -380.12 381.98 -378.99 381.2 C-371.52 375.94 -364.22 370.47 -357.02 364.85 C-355.35 363.54 -353.66 362.24 -351.98 360.95 C-343.81 354.63 -335.98 347.98 -328.22 341.17 C-326.44 339.62 -324.65 338.09 -322.84 336.56 C-315.3 330.18 -308.02 323.57 -300.82 316.79 C-298.08 314.22 -295.31 311.69 -292.5 309.19 C-282.3 300.06 -272.28 290.69 -262.75 280.87 C-260.78 278.96 -258.79 277.18 -256.71 275.4 C-252.51 271.73 -248.54 267.87 -244.6 263.92 C-243.87 263.19 -243.14 262.46 -242.39 261.71 C-239.99 259.32 -237.6 256.93 -235.21 254.54 C-233.54 252.86 -231.86 251.19 -230.19 249.51 C-226.69 246.01 -223.18 242.51 -219.69 239 C-215.21 234.53 -210.74 230.05 -206.26 225.58 C-202.8 222.13 -199.35 218.67 -195.89 215.21 C-194.24 213.57 -192.6 211.92 -190.95 210.27 C-188.63 207.96 -186.33 205.65 -184.02 203.34 C-183.35 202.67 -182.67 201.99 -181.98 201.3 C-178.11 197.42 -174.43 193.42 -170.86 189.27 C-169.06 187.2 -167.17 185.26 -165.22 183.34 C-164.51 182.64 -163.79 181.93 -163.06 181.21 C-161.6 179.78 -160.15 178.35 -158.69 176.92 C-154.62 172.89 -150.75 168.76 -147.01 164.42 C-144.59 161.67 -142 159.12 -139.38 156.56 C-135.55 152.79 -131.89 148.97 -128.41 144.88 C-125.51 141.58 -122.5 138.39 -119.5 135.19 C-107.98 122.89 -96.92 110.22 -85.96 97.41 C-84.41 95.61 -82.87 93.81 -81.32 92 C-78.82 89.09 -76.33 86.18 -73.83 83.27 C-72.87 82.15 -71.92 81.03 -70.96 79.91 C-63.86 71.64 -57 63.22 -50.38 54.56 C-49.89 53.93 -49.4 53.3 -48.9 52.65 C-42.07 43.7 -36.19 35.4 -32.77 24.56 C-32.48 23.64 -32.19 22.72 -31.89 21.77 C-31.31 19.93 -30.75 18.08 -30.22 16.22 C-27.99 8.95 -24.57 2.98 -17.81 -0.91 C-11.78 -2.21 -5.71 -2.43 0 0 Z " fill="#FAF2D7" transform="translate(1122.375,405.4375)"/>
        <path d="M0 0 C2.7 0.02 5.39 0.02 8.09 0.01 C21.79 0.03 35.39 0.63 48.56 4.71 C50.07 5.16 51.58 5.6 53.09 6.04 C54.2 6.37 54.2 6.37 55.32 6.71 C58.08 7.5 60.86 8.21 63.64 8.91 C69.95 10.51 75.67 12.49 81.5 15.34 C82.83 15.9 84.17 16.46 85.5 17.02 C102.66 24.72 117.9 34.27 131.5 47.34 C132 47.8 132.5 48.26 133.01 48.74 C164.32 77.78 175.72 119.03 183.5 159.71 C183.63 160.38 183.76 161.06 183.89 161.75 C184.15 163.1 184.41 164.45 184.67 165.79 C185.28 168.98 185.89 172.16 186.5 175.34 C186.7 176.35 186.89 177.36 187.09 178.41 C196.59 226.62 219 257.22 253.11 290.91 C257.93 295.68 262.65 300.49 267.06 305.65 C269.03 307.95 271.11 310.13 273.19 312.34 C279.5 319.27 285.03 326.73 290.5 334.34 C290.93 334.92 291.36 335.51 291.8 336.11 C309.75 360.93 321.06 389.8 328.5 419.34 C328.7 420.11 328.89 420.88 329.09 421.67 C330.44 427.19 331.54 432.73 332.5 438.34 C332.73 439.64 332.73 439.64 332.96 440.97 C339.15 478.64 335.98 518.18 331.19 555.85 C323.51 610.13 323.51 610.13 341.5 660.34 C344.96 656.93 348.31 653.43 351.61 649.87 C362.37 638.29 373.07 627.13 385.5 617.34 C386.6 616.43 387.69 615.52 388.78 614.61 C403.03 602.81 418.64 592.83 434.5 583.34 C435.93 582.47 437.36 581.61 438.79 580.75 C447.24 575.66 455.72 570.61 464.22 565.6 C499.86 544.55 534.88 522.92 566.4 495.97 C569.33 493.47 572.31 491.06 575.31 488.65 C579.24 485.45 582.87 482.13 586.36 478.45 C588.13 476.7 589.93 475.11 591.83 473.5 C597.87 468.25 603.46 462.52 609.11 456.86 C611.06 454.9 613.01 452.95 614.97 451.01 C623.27 442.71 623.27 442.71 631.12 433.97 C633.29 431.41 635.59 428.98 637.88 426.52 C642.11 421.93 646.16 417.23 650.07 412.36 C651.86 410.13 653.67 407.92 655.49 405.72 C663.62 395.9 671.19 385.78 678.5 375.34 C679.26 374.26 679.26 374.26 680.04 373.16 C690.63 358.15 700.01 342.08 706.31 324.77 C706.56 324.1 706.81 323.43 707.07 322.74 C708.46 318.58 708.73 315.55 707.5 311.34 C706.41 309.52 706.41 309.52 704.94 307.96 C693.74 293.85 685.96 272.26 686.5 254.34 C685.68 254.36 684.86 254.38 684.01 254.41 C669.41 254.64 653.8 252.05 642.39 242.2 C631.2 231.15 624.17 213.37 623.37 197.74 C623.38 193.49 623.4 189.48 624.5 185.34 C623.53 185.27 622.56 185.21 621.56 185.15 C609.18 183.28 599.43 172.16 592.19 162.76 C585.53 153.21 583.55 142.8 585.5 131.34 C587.83 123.41 591.12 115.82 594.32 108.22 C596.76 102.26 598.61 96.34 599.88 90.02 C602.62 77.99 606.99 66.9 617.76 59.86 C623.07 57.13 627.28 56.22 633.19 56.27 C634.96 56.29 634.96 56.29 636.76 56.3 C637.67 56.31 638.57 56.32 639.5 56.34 C639.35 54.73 639.35 54.73 639.19 53.09 C639.22 43.46 644.87 34.02 651.5 27.34 C661.7 19.06 671.85 18.31 684.5 19.34 C712.76 22.69 741.37 29.88 768.5 38.34 C769.4 38.61 770.29 38.89 771.21 39.18 C791.76 45.59 810.52 53.24 821.12 73.41 C829.21 91.43 835.05 111.74 837.08 131.39 C837.25 135.12 837.25 135.12 838.5 137.34 C839.22 140.81 839.71 144.33 840.25 147.84 C840.42 148.95 840.59 150.05 840.77 151.2 C842.76 164.46 844.29 177.78 845.84 191.1 C845.94 191.99 846.04 192.88 846.15 193.79 C846.34 195.46 846.54 197.13 846.73 198.8 C846.82 199.56 846.9 200.32 846.99 201.1 C847.07 201.75 847.14 202.4 847.22 203.07 C847.45 204.92 847.72 206.76 848 208.61 C848.52 212.49 848.83 216.36 849.05 220.27 C849.09 221.01 849.13 221.75 849.18 222.51 C849.59 230.15 849.68 237.78 849.7 245.43 C849.71 246.16 849.71 246.88 849.71 247.63 C849.73 251.47 849.74 255.31 849.74 259.15 C849.75 262.26 849.76 265.37 849.78 268.48 C849.92 287.33 849.41 305.66 846.5 324.34 C846.35 325.35 846.19 326.37 846.03 327.41 C843.19 346 838.55 363.75 832.44 381.52 C832.12 382.44 831.81 383.36 831.48 384.31 C829.18 390.83 826.42 397.07 823.5 403.34 C822.81 404.88 822.12 406.42 821.44 407.96 C821.12 408.69 820.8 409.41 820.47 410.16 C820.15 410.88 819.83 411.6 819.5 412.34 C818.83 413.84 818.17 415.34 817.5 416.84 C817.17 417.58 816.84 418.33 816.5 419.1 C815.85 420.56 815.19 422.02 814.54 423.48 C813.14 426.6 811.75 429.72 810.49 432.9 C807.56 440.29 804.02 447.24 800.24 454.22 C797.57 459.19 795.16 464.23 792.85 469.38 C790.31 474.93 787.55 480.38 784.81 485.84 C784.35 486.75 784.35 486.75 783.88 487.69 C779.72 496 775.48 504.25 771.12 512.46 C767.98 518.37 764.98 524.34 762 530.34 C758.23 537.93 754.38 545.46 750.41 552.95 C747.5 558.43 744.63 563.94 741.78 569.45 C736.16 580.31 730.42 591.1 724.52 601.82 C722.45 605.6 720.39 609.39 718.35 613.2 C710.72 627.44 702.75 641.44 694.5 655.34 C693.57 656.91 693.57 656.91 692.62 658.51 C684.94 671.44 677.13 684.27 669.03 696.93 C667.41 699.48 665.81 702.03 664.21 704.59 C656.25 717.27 647.89 729.63 639.25 741.86 C637.77 743.96 636.3 746.05 634.83 748.16 C627.95 757.96 620.64 767.44 613.34 776.93 C611.75 779.01 610.16 781.1 608.57 783.18 C597.29 797.97 585.31 812.18 572.74 825.88 C570.77 828.05 568.84 830.24 566.94 832.46 C563.69 836.2 560.2 839.65 556.68 843.13 C554.76 845.08 552.96 847.07 551.19 849.15 C544.62 856.79 537.35 863.91 529.68 870.44 C527.36 872.46 525.12 874.54 522.87 876.64 C517.47 881.68 511.98 886.52 506.22 891.14 C503.43 893.39 500.72 895.7 498 898.02 C471.91 919.72 442.59 937.55 413.53 954.92 C396.98 964.83 380.63 975.03 364.41 985.47 C354.13 992.08 343.81 998.63 333.31 1004.9 C332.64 1005.3 331.97 1005.71 331.28 1006.13 C327.4 1008.42 323.57 1010.18 319.33 1011.68 C316.91 1012.55 314.59 1013.64 312.25 1014.71 C286.92 1025.08 257.25 1026.23 231.5 1016.34 C230.3 1015.94 230.3 1015.94 229.08 1015.54 C205.78 1007.69 184.72 992.95 166.77 976.42 C164.69 974.51 162.58 972.67 160.44 970.84 C153.19 964.49 146.75 957.66 140.74 950.13 C139.3 948.33 137.82 946.55 136.32 944.79 C126.38 933.11 118.79 919.86 110.97 906.72 C95.95 881.49 79.37 857.55 61.52 834.23 C40.38 806.6 20.47 778.14 2.5 748.34 C1.94 747.42 1.39 746.49 0.81 745.55 C-8.68 729.75 -17.34 713.58 -25.6 697.12 C-26.47 695.39 -27.34 693.66 -28.21 691.93 C-40.03 668.38 -49.99 644.03 -58.82 619.22 C-59.51 617.31 -60.23 615.42 -60.96 613.53 C-63.21 607.57 -65.01 601.46 -66.89 595.38 C-68.15 591.39 -69.42 587.52 -71.08 583.68 C-72.72 579.83 -73.74 576.01 -74.75 571.96 C-76.75 564.14 -78.87 556.36 -81.06 548.59 C-82.96 541.85 -84.84 535.11 -86.62 528.34 C-88.21 522.32 -89.94 516.36 -91.75 510.41 C-94.77 500.36 -96.57 490.04 -98.56 479.75 C-99.75 473.66 -101.15 467.69 -102.88 461.73 C-103.47 459.43 -103.8 457.26 -104 454.9 C-104.3 451.44 -104.98 448.26 -105.87 444.9 C-107.2 439.86 -108.13 434.85 -108.94 429.71 C-112.82 405.35 -118.72 380.04 -128.5 357.34 C-129.02 356.06 -129.54 354.77 -130.05 353.49 C-134.68 342.02 -139.8 330.82 -145.26 319.72 C-159.11 291.42 -170.9 262.45 -176.5 231.34 C-176.66 230.43 -176.83 229.53 -177 228.6 C-181.7 201.57 -181.27 172.31 -176.5 145.34 C-176.36 144.53 -176.23 143.72 -176.09 142.89 C-172.75 123.1 -166.25 103.87 -156.5 86.34 C-155.92 85.27 -155.35 84.21 -154.76 83.12 C-145.42 66.42 -132.42 50.88 -117 39.46 C-116.31 38.95 -115.62 38.43 -114.91 37.9 C-108.05 32.88 -100.89 28.51 -93.5 24.34 C-92.4 23.7 -91.3 23.06 -90.16 22.4 C-82.53 18.11 -74.79 15.11 -66.5 12.34 C-65.08 11.8 -63.66 11.26 -62.25 10.71 C-57.71 9.05 -53.14 7.67 -48.5 6.34 C-47.7 6.09 -46.91 5.84 -46.08 5.59 C-30.99 1.1 -15.68 -0.15 0 0 Z M-112.5 45.34 C-113.09 45.81 -113.68 46.28 -114.29 46.77 C-140.45 67.99 -157.17 96.88 -165.56 129.34 C-165.82 130.33 -166.07 131.32 -166.34 132.34 C-177.79 177.75 -175.47 230.64 -157.17 273.98 C-155.51 277.93 -153.86 281.89 -152.24 285.86 C-147.03 298.48 -141.42 310.84 -135.51 323.15 C-119.83 355.84 -109.35 388.92 -102.27 424.49 C-102.05 425.59 -101.83 426.7 -101.61 427.84 C-101.17 430.04 -100.73 432.25 -100.3 434.46 C-99.42 438.91 -98.53 443.35 -97.4 447.75 C-96.64 450.77 -96.07 453.7 -95.62 456.77 C-94.69 462.66 -93.36 468.42 -91.91 474.2 C-91.06 477.65 -90.38 481 -90 484.54 C-89.55 487.96 -88.8 490.2 -87.5 493.34 C-86.64 496.52 -85.92 499.74 -85.19 502.96 C-83.37 510.76 -81.45 518.51 -79.37 526.24 C-78.27 530.38 -77.21 534.53 -76.2 538.7 C-73.73 548.85 -70.68 558.8 -67.56 568.77 C-66.53 572.08 -65.5 575.4 -64.47 578.71 C-64.22 579.51 -63.97 580.32 -63.71 581.15 C-62.25 585.83 -60.85 590.53 -59.5 595.24 C-57.79 601.19 -55.99 607.02 -53.58 612.73 C-52.21 616.03 -50.97 619.38 -49.72 622.73 C-40.86 646.43 -31.2 669.66 -19.6 692.17 C-18.27 694.78 -16.99 697.4 -15.7 700.03 C-10.11 711.41 -4.29 722.52 2.3 733.35 C3.51 735.35 4.68 737.36 5.85 739.38 C16.81 758.33 28.77 776.55 41.5 794.34 C42.07 795.13 42.63 795.93 43.22 796.74 C49.33 805.31 55.54 813.77 61.98 822.08 C70.1 832.54 77.91 843.21 85.5 854.06 C87.48 856.89 89.48 859.69 91.5 862.48 C98.54 872.22 104.81 882.28 110.9 892.63 C121.72 910.94 132.55 929.2 146.5 945.34 C147.45 946.46 147.45 946.46 148.43 947.6 C160.2 961.06 172.9 973.96 187.5 984.34 C188.38 984.96 188.38 984.96 189.27 985.6 C202.08 994.65 215.78 1003.4 230.82 1008.16 C233.25 1008.94 235.67 1009.76 238.08 1010.62 C248 1014.12 256.9 1015.11 267.38 1014.9 C268.49 1014.89 268.49 1014.89 269.62 1014.88 C280.99 1014.75 291.63 1013.83 302.5 1010.34 C303.63 1010.02 304.75 1009.7 305.91 1009.38 C326.4 1002.99 344.98 989.6 362.74 977.88 C375.45 969.5 388.36 961.54 401.43 953.75 C402.37 953.19 402.37 953.19 403.33 952.62 C403.95 952.25 404.57 951.88 405.21 951.5 C413.15 946.76 421.01 941.88 428.86 936.98 C431.74 935.19 434.63 933.4 437.52 931.63 C460.06 917.71 481.2 902.36 501.5 885.34 C502.02 884.91 502.53 884.48 503.06 884.04 C517.95 871.57 531.82 858.11 545.56 844.4 C546.15 843.81 546.74 843.23 547.35 842.62 C553.09 836.9 558.8 831.19 564.06 825.02 C566.26 822.45 568.57 820 570.88 817.52 C575.09 812.96 579.1 808.27 583 803.43 C584.9 801.08 586.82 798.75 588.75 796.43 C596.12 787.58 603.2 778.58 610.03 769.32 C611.51 767.33 613 765.35 614.49 763.38 C635.37 735.81 654.49 706.85 672.5 677.34 C672.91 676.67 673.32 676 673.74 675.31 C675.91 671.75 678.04 668.17 680.17 664.58 C681.8 661.84 683.44 659.11 685.08 656.37 C703.69 625.24 720.84 593.3 737.52 561.09 C740.18 555.95 742.86 550.83 745.56 545.71 C746.77 543.43 747.97 541.15 749.17 538.87 C750.03 537.24 750.88 535.61 751.74 533.99 C760.64 517.11 769.22 500.08 777.76 483.01 C779.29 479.94 780.83 476.86 782.38 473.79 C798.19 442.31 798.19 442.31 812.34 410.05 C813.43 407.51 814.63 405.08 815.94 402.65 C818.57 397.52 820.42 392.2 822.27 386.75 C823.57 382.94 824.95 379.19 826.49 375.47 C828.58 370.31 830.13 365.08 831.56 359.71 C831.82 358.76 832.08 357.8 832.34 356.82 C834.2 349.83 835.68 342.83 836.92 335.7 C837.77 330.8 838.87 325.97 840.02 321.13 C840.79 316.61 840.9 312.06 841.11 307.49 C841.4 301.69 841.4 301.69 842.01 299.49 C842.67 296.6 842.63 293.88 842.63 290.92 C842.63 289.62 842.64 288.32 842.64 286.97 C842.64 285.56 842.64 284.14 842.63 282.72 C842.63 281.26 842.64 279.8 842.64 278.34 C842.64 275.28 842.64 272.22 842.63 269.17 C842.63 265.26 842.63 261.35 842.64 257.44 C842.64 254.42 842.64 251.41 842.64 248.39 C842.63 246.95 842.64 245.51 842.64 244.07 C842.64 242.05 842.64 240.03 842.63 238.01 C842.63 236.87 842.63 235.72 842.63 234.54 C842.5 231.39 842.06 228.44 841.5 225.34 C841.35 222.71 841.23 220.09 841.13 217.46 C840.63 206.96 839.25 196.61 837.87 186.19 C837.24 181.28 836.68 176.35 836.15 171.42 C835.83 168.57 835.41 166.08 834.5 163.34 C834.2 160.88 833.94 158.42 833.69 155.96 C832.23 142.74 829.91 129.53 826.13 116.76 C825.46 114.16 825.1 111.62 824.75 108.96 C821.95 91.23 814.96 70.74 800.5 59.34 C796.96 57.01 793.34 55.12 789.5 53.34 C788.6 52.91 787.7 52.48 786.77 52.04 C778.69 48.43 770.32 46.2 761.8 43.95 C759.66 43.38 757.53 42.78 755.4 42.16 C735.67 36.44 715.63 31.86 695.38 28.4 C694.16 28.19 692.95 27.98 691.7 27.76 C676.86 25.26 676.86 25.26 662.5 28.34 C653.04 35.64 648.56 42.72 645.81 54.21 C645.34 58.92 645.43 63.61 645.5 68.34 C646.55 68.09 646.55 68.09 647.63 67.85 C665.68 64.63 685.54 67.57 703.5 70.34 C705.82 70.68 708.14 71.02 710.45 71.36 C719.87 72.75 729.23 74.16 738.5 76.34 C738.5 77.33 738.5 78.32 738.5 79.34 C725.54 79.79 713.29 78.4 700.5 76.34 C691.18 74.9 681.93 73.74 672.5 73.34 C671.64 73.29 670.77 73.25 669.89 73.2 C666.99 73.06 664.09 72.98 661.19 72.9 C660.27 72.85 659.35 72.81 658.4 72.76 C651.32 72.65 646.8 74.63 641.5 79.34 C633.37 89.08 633.77 101.13 634.73 113.23 C634.95 115.27 635.22 117.31 635.5 119.34 C636.36 119.12 637.22 118.91 638.11 118.69 C646.35 116.78 653.99 115.86 662.44 115.96 C663.66 115.97 664.89 115.97 666.15 115.98 C686.29 116.19 706.42 117.9 726.5 119.34 C726.83 120.33 727.16 121.32 727.5 122.34 C715.85 124.57 703.44 123.3 691.61 122.91 C680.89 122.56 670.16 122.23 659.44 122.15 C658.66 122.14 657.87 122.12 657.07 122.11 C649.47 122.1 641.14 122.73 635.04 127.67 C630.64 132.42 628.23 138 627.94 144.46 C628.33 152.85 630.34 163 634.5 170.34 C636.75 169.78 639 169.21 641.24 168.62 C642.79 168.23 642.79 168.23 644.38 167.84 C645.38 167.58 646.39 167.32 647.43 167.05 C660.45 164.44 674.17 165.21 687.38 165.27 C689.34 165.28 691.3 165.28 693.26 165.29 C698 165.3 702.75 165.32 707.5 165.34 C707.5 166.33 707.5 167.32 707.5 168.34 C705.03 169.57 703.22 169.56 700.46 169.69 C699.41 169.75 698.36 169.8 697.27 169.86 C696.13 169.91 694.99 169.96 693.81 170.02 C691.4 170.14 688.98 170.27 686.57 170.39 C682.76 170.58 678.95 170.77 675.14 170.96 C671.47 171.14 667.8 171.33 664.12 171.52 C662.99 171.57 661.87 171.62 660.7 171.68 C650.04 172.24 642.64 173.36 634.19 180.21 C630.01 185.47 631.1 193.94 631.5 200.34 C633.05 212.42 637.49 229.35 647.5 237.34 C653.38 241.43 659.62 243.55 666.5 245.34 C667.18 245.54 667.86 245.75 668.56 245.96 C673.94 247.52 678.91 247.49 684.5 247.34 C684.17 241.4 683.84 235.46 683.5 229.34 C681.73 229.11 679.95 228.88 678.13 228.65 C672.07 227.64 666.53 225.96 661.5 222.34 C660.23 220.17 660.23 220.17 659.5 218.34 C660.72 218.7 661.94 219.06 663.19 219.43 C664.82 219.9 666.44 220.37 668.06 220.84 C668.86 221.07 669.66 221.31 670.49 221.56 C675.33 222.94 679.46 223.61 684.5 223.34 C684.83 222.35 685.16 221.36 685.5 220.34 C686.49 220.34 687.48 220.34 688.5 220.34 C688.61 221.25 688.71 222.16 688.82 223.1 C693.43 270.57 693.43 270.57 716.5 311.34 C717.29 312.21 718.08 313.08 718.89 313.97 C724.82 320.19 731.14 325.3 738.19 330.19 C741.93 332.84 744.45 334.65 745.5 339.34 C745.74 342.04 745.59 344.61 745.5 347.34 C744.51 347.01 743.52 346.68 742.5 346.34 C742.34 345.33 742.17 344.31 742 343.27 C740.54 337.24 734.34 334.55 729.5 331.34 C728.06 330.26 726.62 329.18 725.19 328.09 C722.05 325.69 718.79 323.51 715.5 321.34 C715.16 322.22 715.16 322.22 714.8 323.12 C703.37 352.07 687.53 377.38 667.93 401.57 C666.36 403.51 664.8 405.45 663.25 407.4 C657.82 414.16 652.32 420.81 646.46 427.2 C644.71 429.11 643 431.06 641.31 433.02 C631.23 444.57 620.49 455.51 609.64 466.33 C607.6 468.36 605.57 470.4 603.54 472.43 C602.22 473.76 600.89 475.08 599.57 476.4 C598.98 476.99 598.39 477.59 597.77 478.2 C594.06 481.89 590.23 485.39 586.27 488.81 C583.92 490.84 581.65 492.97 579.38 495.09 C573.53 500.42 567.35 505.26 561.09 510.1 C558.95 511.77 556.85 513.49 554.75 515.21 C542.63 524.91 529.81 533.66 516.69 541.95 C514.43 543.38 512.17 544.82 509.92 546.27 C495.12 555.7 480.07 564.67 464.93 573.52 C420.78 599.25 420.78 599.25 380.95 631.07 C378.84 633.03 376.69 634.91 374.5 636.77 C366.57 643.68 359.25 651.29 352.5 659.34 C351.74 660.23 350.99 661.12 350.2 662.04 C346.64 666.27 343.1 670.5 339.78 674.93 C339.33 675.52 338.89 676.11 338.43 676.71 C337.58 677.85 336.74 679 335.9 680.15 C333.72 683.07 331.96 685.06 328.5 686.34 C329.94 681.01 332.55 676.62 335.36 671.92 C336.68 668.94 336.49 668.32 335.5 665.34 C334.96 664.12 334.37 662.91 333.76 661.73 C333.41 661.05 333.07 660.38 332.72 659.69 C332 658.3 331.28 656.92 330.56 655.53 C326.83 648.23 324.24 641.24 322.88 633.15 C322.63 631.78 322.39 630.41 322.15 629.04 C321.94 627.82 321.72 626.6 321.5 625.34 C321.33 624.57 321.16 623.79 320.98 623 C319.96 617.33 320.11 611.52 320.06 605.77 C320.05 604.66 320.05 604.66 320.04 603.53 C319.97 585.23 322.29 567.2 324.59 549.08 C327.15 528.91 328.9 508.8 328.81 488.46 C328.81 487.19 328.81 487.19 328.81 485.89 C328.76 470.88 327.86 456.18 325.5 441.34 C325.36 440.45 325.22 439.57 325.08 438.66 C317.52 392.64 296.94 351.31 266.5 316.34 C265.88 315.6 265.25 314.86 264.61 314.1 C260.61 309.42 256.3 305.11 251.92 300.79 C249.78 298.62 247.78 296.41 245.81 294.09 C243.18 291 240.37 288.46 237.24 285.89 C234.7 283.62 232.57 281.05 230.37 278.45 C228.43 276.25 226.37 274.24 224.25 272.21 C210.15 258.23 200.43 241.4 192.5 223.34 C191.81 221.77 191.81 221.77 191.1 220.17 C184.24 203.57 181.06 185.62 177.75 168.05 C171.71 134.45 171.71 134.45 160.5 102.34 C160.2 101.65 159.89 100.97 159.58 100.27 C142.69 62.59 113.77 35.44 75.08 20.65 C73.9 20.22 72.72 19.78 71.5 19.34 C70.7 19.04 69.91 18.74 69.08 18.43 C66.91 17.66 64.72 16.99 62.5 16.34 C61.3 15.96 60.11 15.58 58.88 15.19 C2.27 -2.11 -65.77 7.64 -112.5 45.34 Z " fill="#110F0D" transform="translate(364.498779296875,31.663818359375)"/>
        <path d="M0 0 C2.2 3.29 3.2 6.5 4.31 10.25 C4.76 11.71 5.2 13.16 5.65 14.62 C5.99 15.72 5.99 15.72 6.33 16.85 C7.91 21.91 9.63 26.94 11.32 31.96 C12.07 34.2 12.81 36.45 13.54 38.7 C13.81 39.49 14.07 40.29 14.34 41.12 C14.85 42.66 15.35 44.2 15.86 45.75 C17.35 50.28 19.11 54.61 21 59 C21.84 61.43 22.65 63.87 23.44 66.31 C25.07 71.32 26.84 76.22 28.85 81.09 C30.25 84.64 31.51 88.24 32.77 91.84 C34.73 97.45 36.74 103.03 38.8 108.6 C45.77 127.48 52.24 146.5 58.5 165.62 C58.89 166.8 59.27 167.98 59.67 169.19 C64.11 182.71 68.32 196.25 72 210 C72.62 212.21 73.24 214.42 73.88 216.62 C74.19 217.74 74.51 218.85 74.84 219.99 C75.76 223.19 76.71 226.38 77.66 229.57 C80.88 240.38 83.84 251.15 86.18 262.19 C87.03 266.13 88.06 269.98 89.16 273.85 C90.34 278.28 91.39 282.73 92.44 287.19 C95.82 301.46 99.43 315.62 103.43 329.73 C105.1 335.65 106.66 341.56 108 347.56 C110 356.47 112.61 365.19 115.21 373.94 C116.35 377.78 117.47 381.63 118.54 385.5 C121.19 395.05 124.11 404.41 127.46 413.74 C129.64 419.85 131.57 426.01 133.31 432.27 C134.44 436.26 135.75 440.1 137.23 443.96 C138.01 446.03 138.74 448.1 139.46 450.18 C142.89 460.11 142.89 460.11 147 469.77 C148.73 473.64 150.17 477.62 151.66 481.59 C153.31 485.79 155.15 489.89 157 494 C157.98 496.22 158.97 498.44 159.95 500.66 C174.37 533.07 189.56 566.48 213.96 592.75 C217.81 596.99 220.65 601.04 223.19 606.19 C228.77 616.7 236.55 623.93 246 631 C245.84 631.91 245.69 632.82 245.52 633.76 C243.47 646.48 247.84 658.47 253 670 C207.43 653.84 172.99 578.29 150.59 540.67 C148.85 537.75 147.1 534.84 145.34 531.94 C133 511.48 121.24 490.73 109.6 469.86 C108.18 467.33 106.77 464.79 105.35 462.26 C73.64 405.48 45.66 347.8 24.44 286.31 C24.19 285.6 23.94 284.88 23.69 284.14 C20.75 275.63 18.14 267.11 15.88 258.4 C14.91 254.67 13.85 250.98 12.77 247.28 C8.26 231.91 4.51 216.39 1.58 200.64 C1.27 198.09 1.27 198.09 0 197 C-0.5 194.59 -0.95 192.18 -1.38 189.75 C-2.31 184.57 -3.33 179.44 -4.56 174.31 C-5.81 169.04 -6.7 163.77 -7.48 158.41 C-8.13 154.13 -8.94 149.89 -9.75 145.64 C-12.37 131.84 -14.72 117.98 -16.96 104.11 C-17.56 100.44 -18.24 96.81 -18.99 93.17 C-20.07 87.85 -20.81 82.51 -21.5 77.12 C-22.84 67.05 -24.35 57.08 -26.44 47.12 C-27.76 40.61 -28.78 34.08 -29.69 27.5 C-29.88 26.1 -29.88 26.1 -30.09 24.68 C-30.75 19.73 -31.14 14.99 -31 10 C-30.01 10 -29.02 10 -28 10 C-27.34 8.68 -26.68 7.36 -26 6 C-25.01 7.49 -25.01 7.49 -24 9 C-23.01 9 -22.02 9 -21 9 C-20.34 8.01 -19.68 7.02 -19 6 C-18.34 6.66 -17.68 7.32 -17 8 C-14.95 7.9 -14.95 7.9 -13 7 C-12.34 6.01 -11.68 5.02 -11 4 C-9.68 4.66 -8.36 5.32 -7 6 C-6.34 4.35 -5.68 2.7 -5 1 C-3.35 1.66 -1.7 2.32 0 3 C0 2.01 0 1.02 0 0 Z " class="cpart" data-name="العضلة الخلفية (منبسطة)" id="muscle-back" fill="#E8E4DC" transform="translate(295,288)"/>
        <path d="M0 0 C16.83 6.82 29.95 31.5 36.94 47.09 C38.59 51.02 40.02 54.99 41.35 59.04 C41.78 60.33 42.22 61.61 42.67 62.9 C53.2 92.91 53.36 127.53 54.44 159.06 C55.3 183.69 58.15 208.67 62 233 C62.14 233.94 62.29 234.88 62.44 235.85 C64.19 247.16 66.34 258.1 69.78 269.02 C71.04 273.02 72.03 277.05 73 281.12 C75.46 291.28 78.52 301.3 82.98 310.76 C83.99 312.99 84.89 315.23 85.77 317.51 C97.98 348.2 115.18 377.38 136 403 C136.73 403.91 137.46 404.82 138.22 405.76 C140.46 408.53 142.72 411.27 145 414 C145.64 414.77 145.64 414.77 146.3 415.56 C151.97 422.36 157.75 429 163.73 435.52 C166.26 438.28 168.71 441.09 171.16 443.92 C173.37 446.42 175.62 448.86 177.88 451.31 C181.99 455.83 185.91 460.46 189.74 465.21 C192.01 468.02 194.35 470.76 196.69 473.5 C207.27 486.21 216.92 499.55 225 514 C225.35 514.62 225.71 515.24 226.07 515.87 C231.06 524.64 234.91 533.36 238 543 C238.45 544.33 238.89 545.65 239.34 546.98 C241.83 554.45 243.67 561.67 244.64 569.52 C244.87 572 244.87 572 246 574 C247.46 590.13 245.73 606.21 239 621 C212.49 616.55 193.15 602.28 177.31 580.75 C175.5 578.19 173.74 575.6 172 573 C171.55 572.34 171.09 571.67 170.62 570.99 C154.21 546.84 142.06 519.93 131 493 C130.74 492.36 130.47 491.71 130.2 491.05 C124.09 476.16 118.18 461.2 112.74 446.05 C112.04 444.11 111.32 442.19 110.59 440.27 C109.04 436.14 107.58 431.99 106.14 427.82 C105.88 427.06 105.62 426.3 105.35 425.51 C104.5 423.05 103.66 420.59 102.81 418.12 C102.52 417.29 102.24 416.45 101.94 415.58 C97.27 401.95 92.85 388.28 88.76 374.46 C88.2 372.65 87.62 370.85 87.02 369.05 C85.27 363.8 83.71 358.49 82.12 353.19 C81.84 352.23 81.84 352.23 81.55 351.26 C76.63 334.87 71.84 318.45 67.05 302.02 C65.42 296.43 63.78 290.85 62.13 285.27 C59.57 276.53 57.09 267.78 54.73 258.98 C54.43 257.86 54.13 256.74 53.82 255.58 C50.48 243.14 47.29 230.67 44.12 218.19 C43.67 216.4 43.67 216.4 43.21 214.57 C31.28 167.6 20.14 120.47 10.41 72.98 C10.02 71.07 9.62 69.17 9.22 67.26 C7.34 58.06 5.75 48.83 4.27 39.55 C3.87 37.11 3.47 34.66 3.07 32.21 C2.82 30.62 2.56 29.03 2.3 27.45 C2.19 26.73 2.07 26.01 1.95 25.28 C0.85 18.37 -0.16 11.45 -0.06 4.44 C-0.05 3.59 -0.04 2.74 -0.04 1.87 C-0.02 1.25 -0.01 0.64 0 0 Z " fill="#FAC594" transform="translate(388,204)"/>
        <path d="M0 0 C4.46 4.69 6.31 10.24 8.56 16.19 C8.95 17.18 9.33 18.17 9.73 19.19 C11.84 24.66 13.68 30.13 15.3 35.76 C16.04 38.26 16.04 38.26 17.54 41.58 C19.24 45.55 20.35 49.52 21.44 53.69 C22.78 58.78 24.24 63.78 25.95 68.76 C28.11 75.16 29.8 81.64 31.44 88.19 C33.57 96.58 35.79 104.92 38.3 113.2 C39.87 118.43 41.2 123.7 42.49 129 C43.64 133.71 44.97 138.36 46.38 143 C48.46 149.89 50.23 156.82 51.94 163.81 C53.98 172.15 56.23 180.37 58.75 188.57 C60.6 194.6 62.3 200.66 63.94 206.75 C68.47 223.55 73.43 240.21 78.51 256.84 C81.6 266.93 84.6 277.04 87.46 287.19 C90.06 296.39 92.75 305.52 95.84 314.57 C97.32 318.96 98.67 323.37 100.01 327.8 C100.79 330.33 101.61 332.84 102.46 335.34 C103.66 338.94 104.78 342.56 105.85 346.2 C108.53 355.31 111.36 364.36 114.28 373.4 C114.49 374.05 114.7 374.69 114.91 375.36 C120.82 393.65 126.9 411.89 132.98 430.12 C134.63 435.08 136.28 440.04 137.93 445 C139.21 448.87 140.5 452.74 141.79 456.6 C142.4 458.43 143.01 460.26 143.62 462.1 C144.46 464.63 145.31 467.17 146.16 469.71 C146.4 470.45 146.65 471.19 146.9 471.95 C148.39 476.41 150.12 480.69 152 485 C152.75 487.15 153.47 489.32 154.16 491.49 C154.54 492.69 154.92 493.89 155.32 495.13 C155.71 496.37 156.1 497.6 156.5 498.88 C157.28 501.33 158.06 503.79 158.84 506.24 C159.21 507.41 159.58 508.57 159.97 509.77 C161.28 513.86 162.63 517.93 164 522 C164.43 523.28 164.85 524.56 165.28 525.84 C165.91 527.72 166.53 529.6 167.16 531.48 C168.04 534.11 168.91 536.74 169.78 539.37 C170.9 542.79 172.07 546.2 173.3 549.59 C176.48 558.32 179.25 567.1 181.74 576.05 C183.41 582.01 185.22 587.92 187.12 593.81 C189.41 600.9 191.32 608.01 193.05 615.25 C194.27 620.05 195.78 624.73 197.36 629.43 C198 632 198 632 197 635 C171.14 605.94 155.07 567.16 140.66 531.47 C138.97 527.31 137.2 523.2 135.32 519.13 C133.39 514.95 131.82 510.83 130.44 506.44 C129.13 502.3 127.74 498.29 126.1 494.27 C123.82 488.66 121.89 482.94 120 477.19 C119.65 476.12 119.3 475.06 118.93 473.96 C116.53 466.67 114.21 459.35 112 452 C111.49 450.33 110.97 448.66 110.45 446.99 C99.3 410.82 89.79 374.15 80.99 337.34 C79.09 329.39 77.09 321.49 74.96 313.6 C73.43 307.88 72.04 302.12 70.62 296.38 C67.68 284.5 64.5 272.72 61 261 C60.72 260.05 60.43 259.09 60.14 258.11 C57 247.6 53.8 237.12 50.24 226.74 C49.17 223.52 48.17 220.29 47.18 217.05 C44.84 209.44 42.38 201.87 39.88 194.31 C39.62 193.56 39.37 192.8 39.12 192.03 C32.59 172.42 25.51 153.02 18.46 133.59 C14 121.27 9.63 108.93 5.26 96.58 C4.33 93.94 3.39 91.29 2.45 88.65 C2.16 87.82 1.87 86.99 1.56 86.14 C-0.31 80.88 -2.26 75.65 -4.25 70.44 C-6.6 64.25 -8.59 58.02 -10.31 51.62 C-10.81 49.83 -11.3 48.03 -11.8 46.23 C-12.01 45.46 -12.22 44.69 -12.43 43.9 C-12.96 41.94 -12.96 41.94 -14 40 C-15.08 22.8 -15.08 22.8 -9.35 16.06 C-8.12 14.69 -6.89 13.34 -5.65 11.99 C-2.67 8.39 -1.47 4.4 0 0 Z " fill="#F8C493" transform="translate(311,238)"/>
        <path d="M0 0 C5.92 4.97 8.58 10.27 9.44 17.88 C9.19 25.11 4.37 29.76 -0.56 34.56 C-1.68 35.59 -1.68 35.59 -2.82 36.63 C-8.33 42.61 -9.54 47.73 -10.31 55.56 C-11.88 67.92 -15.93 78.38 -25.34 87.03 C-36.32 95.16 -47.71 98.18 -61.29 96.76 C-72.83 94.68 -81.92 88.18 -90 80 C-90.65 79.37 -91.3 78.75 -91.96 78.1 C-97.28 72.59 -100.17 66.05 -103 59 C-103.38 58.05 -103.77 57.1 -104.16 56.12 C-105.21 52.21 -105.22 48.66 -105.12 44.62 C-105.12 43.89 -105.11 43.15 -105.1 42.39 C-105.07 40.6 -105.04 38.8 -105 37 C-103.89 37.33 -102.77 37.66 -101.62 38 C-88.98 40.76 -75.76 40.26 -64.55 33.53 C-59.38 29.91 -56.48 25.98 -53.46 20.5 C-49.37 13.51 -43.79 7.6 -36 5 C-34.55 4.9 -33.1 4.85 -31.65 4.82 C-30.8 4.8 -29.94 4.78 -29.07 4.75 C-27.3 4.71 -25.52 4.68 -23.75 4.66 C-17.38 4.45 -12.63 2.97 -7 0 C-4.24 -1.38 -2.92 -0.89 0 0 Z " fill="#FAF2D8" transform="translate(650,885)"/>
        <path d="M0 0 C0 3.58 -0.71 4.29 -2.86 7.07 C-3.47 7.88 -4.09 8.68 -4.72 9.51 C-5.73 10.8 -5.73 10.8 -6.75 12.12 C-8.14 13.95 -9.53 15.77 -10.92 17.6 C-11.61 18.51 -12.31 19.42 -13.02 20.36 C-15.78 24.04 -18.43 27.79 -21.06 31.56 C-29.4 43.49 -37.89 55.35 -47.09 66.63 C-49.38 69.47 -51.6 72.36 -53.81 75.25 C-64.58 89.29 -75.56 103.11 -87.2 116.45 C-90.41 120.14 -93.55 123.87 -96.62 127.69 C-100.7 132.73 -105.04 137.48 -109.45 142.23 C-111.5 144.46 -113.52 146.71 -115.5 149 C-119.23 153.3 -123.08 157.49 -126.94 161.67 C-128.81 163.71 -130.68 165.75 -132.53 167.8 C-140.85 176.93 -149.53 185.68 -158.27 194.4 C-160.76 196.89 -163.25 199.38 -165.73 201.87 C-167.34 203.47 -168.94 205.08 -170.55 206.68 C-171.28 207.41 -172.01 208.14 -172.76 208.9 C-176.81 212.93 -180.95 216.78 -185.27 220.51 C-187.2 222.17 -189.06 223.89 -190.89 225.65 C-191.53 226.26 -192.17 226.87 -192.83 227.49 C-193.49 228.11 -194.14 228.73 -194.81 229.38 C-200.24 234.5 -205.73 239.38 -211.57 244.04 C-213.89 245.91 -216.1 247.87 -218.31 249.88 C-239.53 268.88 -265.06 289.06 -291 301 C-291.66 300.67 -292.32 300.34 -293 300 C-279.14 285.96 -279.14 285.96 -272.92 280.7 C-270.51 278.57 -268.26 276.29 -266 274 C-262.47 270.43 -258.87 267.04 -255.05 263.77 C-250.97 260.25 -247 256.61 -243 253 C-241.33 251.5 -239.67 250 -238 248.5 C-236.76 247.39 -236.76 247.39 -235.5 246.25 C-233 244 -230.5 241.75 -228 239.5 C-227.17 238.75 -226.34 238.01 -225.49 237.24 C-223.85 235.77 -222.21 234.29 -220.57 232.82 C-215.04 227.86 -209.55 222.86 -204.09 217.83 C-202.01 215.93 -199.93 214.03 -197.85 212.14 C-191.25 206.13 -184.86 199.96 -178.62 193.56 C-176.43 191.42 -174.18 189.4 -171.88 187.38 C-166.51 182.58 -161.41 177.52 -156.31 172.44 C-155.5 171.63 -154.7 170.83 -153.86 170 C-149.58 165.71 -145.47 161.33 -141.51 156.73 C-139.61 154.55 -137.58 152.52 -135.5 150.5 C-132.05 147.1 -128.83 143.58 -125.68 139.9 C-124.02 138.02 -122.29 136.26 -120.5 134.5 C-118.21 132.24 -116.04 129.94 -113.94 127.5 C-110.48 123.49 -106.87 119.62 -103.25 115.75 C-94.82 106.75 -86.49 97.68 -78.25 88.5 C-75.81 85.78 -73.34 83.08 -70.88 80.38 C-68.07 77.3 -65.29 74.21 -62.56 71.06 C-59.6 67.65 -56.56 64.32 -53.5 61 C-48.78 55.87 -44.16 50.66 -39.6 45.38 C-37.96 43.48 -36.33 41.58 -34.69 39.69 C-34.12 39.03 -33.56 38.38 -32.98 37.71 C-29.62 33.84 -26.22 30.02 -22.75 26.25 C-18.74 21.88 -14.98 17.34 -11.25 12.73 C-7.64 8.36 -3.83 4.17 0 0 Z " fill="#F4C393" transform="translate(1013,573)"/>
        <path d="M0 0 C1.46 0.03 1.46 0.03 2.96 0.05 C3.69 0.08 4.43 0.1 5.19 0.12 C6.11 9.62 6.11 9.62 3.99 13.06 C2.96 14.14 1.92 15.19 0.85 16.23 C-5.24 23.16 -5.39 31.99 -5.19 40.75 C-5.19 42.37 -5.19 42.37 -5.18 44.02 C-5.13 48.77 -4.97 53.08 -3.62 57.64 C-2.81 61.12 -2.81 61.12 -3.86 63.45 C-4.7 64.34 -4.7 64.34 -5.56 65.25 C-11.22 71.41 -11.24 77.98 -11.14 86.02 C-10.72 93.41 -9 101.56 -5.12 107.88 C-4.69 108.62 -4.26 109.36 -3.81 110.12 C-4.62 112.94 -4.62 112.94 -5.81 115.12 C-15.3 114.77 -22.73 110.02 -29.15 103.18 C-36.26 94.39 -41.61 85.45 -41.37 73.93 C-40.13 65.43 -36.21 57.63 -32.81 49.81 C-29.51 41.96 -27.55 33.84 -25.54 25.58 C-23.48 17.51 -20.96 10.18 -14.31 4.75 C-13.77 4.29 -13.22 3.83 -12.66 3.35 C-8.48 0.58 -4.97 -0.12 0 0 Z " fill="#F7C393" transform="translate(997.8125,94.875)"/>
        <path d="M0 0 C4.29 1.49 5.92 4.6 8.12 8.31 C13.58 17.12 19.41 25.87 27.12 32.88 C30.69 36.24 32.76 40.04 34.94 44.38 C40.44 55.3 48.24 62.71 58 70 C57.84 70.91 57.69 71.82 57.52 72.76 C55.47 85.48 59.84 97.47 65 109 C32.19 97.37 5.16 48.29 -12 21 C-12.44 20.31 -12.87 19.62 -13.32 18.91 C-15.35 15.56 -16 14.03 -16 10 C-14.68 10.33 -13.36 10.66 -12 11 C-12 10.67 -12 10.34 -12 10 C-12 8.33 -12 6.67 -12 5 C-11.36 5.16 -10.72 5.33 -10.06 5.5 C-8.19 6.04 -8.19 6.04 -7 6 C-7 4.68 -7 3.36 -7 2 C-5.68 2 -4.36 2 -3 2 C-2.34 2.66 -1.68 3.32 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#F7F0D6" transform="translate(483,849)"/>
      </svg>`
    }

  ],

  // العلوم/الرابع — الدرس الخامس: العقاقير كأدوية (ص ٣١–٣٢)
  "g4s-1-5": [

    // ⑤ تحديد الأجزاء (hotspot)
    {
      type: "hotspot",
      objective: "4Bh9: يميّز طرق استهلاك الأدوية",
      level: "knowledge",
      prompt: "انقر على الدواء الذي يُؤخذ عبر الدم (المحلول الوريدي).",
      image: "images/medicine-types.jpg",
      fit: "width",
      bg: "#f3e8d6",
      spot: { x: 86, y: 55, r: 12 }
    },

    // ④ صواب وخطأ
    {
      type: "true-false",
      objective: "4Bh5: يشرح دور العقاقير كأدوية",
      level: "reasoning",
      statement: "جميع الأدوية عقاقير، لكن ليست جميع العقاقير أدوية.",
      answer: true
    },

    // ③ اختيار من متعدد
    {
      type: "mcq",
      objective: "4Bh8: يستنتج أنّ الأدوية تحمي وتشفي وتخفّف من أعراض المرض",
      level: "knowledge",
      prompt: "متى يتناول الناس الأدوية؟",
      options: ["عند المرض لتحسين صحتهم", "للتسلية واللعب", "عند الجوع", "قبل النوم دائماً"],
      answer: 0
    },

    // ① سحب وإفلات (تسمية على صورة): طرق تناول الأدوية
    {
      type: "drag-drop",
      objective: "4Bh9: يميّز طرق استهلاك الأدوية",
      level: "application",
      prompt: "اسحب اسم كل شكل من أشكال الدواء إلى صندوقه في الأعلى.",
      image: "images/medicine-types.jpg",
      bg: "#f3e8d6",
      targets: [
        { answer: "أقراص",   box:{x:26,y:19}, dot:{x:13,y:58} },
        { answer: "مرهم",    box:{x:42,y:17}, dot:{x:37,y:58} },
        { answer: "شراب",    box:{x:58,y:19}, dot:{x:62,y:58} },
        { answer: "عبر الدم", box:{x:74,y:17}, dot:{x:86,y:58} }
      ]
    },

    // ② توصيل: المصطلح ← معناه
    {
      type: "matching",
      objective: "4Bh8: يستنتج أنّ الأدوية تحمي وتشفي وتخفّف من أعراض المرض",
      level: "knowledge",
      prompt: "صِل كل مصطلح بمعناه.",
      pairs: [
        { a: "العقاقير", b: "مواد تؤثّر على الجسم" },
        { a: "الأدوية",  b: "عقاقير تساعد على الشفاء من المرض" },
        { a: "الوقاية",  b: "الإسهام في منع المرض" },
        { a: "التبغ",    b: "عقّار ضارّ ليس دواءً" }
      ]
    },

    // ⑪ الخريطة الذهنية الناقصة — إثرائي: ربط شكل الدواء بطريقة أخذه (التبغ مموّه ليس دواءً)
    {
      type: "mindmap",
      objective: "4Bh9: يميّز طرق استهلاك الأدوية",
      level: "application",
      prompt: "أكمل الخريطةَ الذهنيةَ بسحبِ شكلِ الدواءِ المناسبِ إلى كلِّ فرعٍ.",
      center: "الأدوية",
      branches: [
        { label: "للبلع", answer: "أقراص" },
        { label: "للدهن", answer: "مرهم" },
        { label: "للشرب", answer: "شراب" }
      ],
      distractors: ["تبغ"]
    }

  ],

  // العلوم/الرابع — الدرس السادس: كيف تعمل الأدوية؟ (ص ٣٢–٣٣: الأعراض والجراثيم والعلاج وتناول الدواء بحذر)
  "g4s-1-6": [

    // ④ صواب وخطأ — معرفة (الجراثيم لا تُرى إلّا بالمجهر)
    {
      type: "true-false",
      objective: "4Bh13: يدرك أنّ الجراثيم من أسباب المرض ولا تُرى إلّا بالمجهر",
      level: "knowledge",
      statement: "لا يُمكنُ رؤيةُ الجراثيمِ إلّا باستخدامِ المِجهرِ.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة (دور الأدوية)
    {
      type: "mcq",
      objective: "4Bh8: يستنتج أنّ الأدوية تحمي وتشفي وتخفّف من أعراض المرض",
      level: "knowledge",
      prompt: "كيف تساعدُنا الأدويةُ عندما نمرضُ؟",
      options: [
        "تُخفّفُ الأعراضَ وتقضي على الجراثيمِ",
        "تزيدُ الأعراضَ سوءاً",
        "تُدخِلُ الجراثيمَ إلى الجسمِ",
        "لا تفعلُ شيئاً"
      ],
      answer: 0
    },

    // ② توصيل — معرفة (مفردات الدرس: الأعراض علامات المرض)
    {
      type: "matching",
      objective: "4Bh12: يتعرّف على الأعراض كعلامات تظهر عند المرض",
      level: "knowledge",
      prompt: "صِل كلَّ مصطلحٍ بمعناه.",
      pairs: [
        { a: "الأعراض",      b: "علاماتُ المرضِ" },
        { a: "الجراثيم",     b: "كائناتٌ دقيقةٌ تُسبّبُ المرضَ" },
        { a: "العلاج",       b: "الشفاءُ من المرضِ" },
        { a: "الوصفة الطبية", b: "ورقةُ الطبيبِ بالأدويةِ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — تطبيق: قواعد أخذ الدواء بأمان
    {
      type: "fill-blank",
      objective: "4Bh11: يدرك أهمية أخذ الدواء بالجرعة والوقت المناسبين وبإشراف بالغ",
      level: "application",
      prompt: "أكمل الجمل بسحب الكلمات المناسبة.",
      text: "يجب أخذ الدواء بـ {} المحددة، وفي {} المناسب، ولا نتناول دواءً دون إشراف {}",
      answers: ["الجرعة", "الوقت", "شخص بالغ"],
      distractors: ["اللون", "الحجم"]
    },

    // ⑥ الترتيب التسلسلي — استدلال: رحلة الدواء في الجسم
    {
      type: "sequence",
      objective: "4Bh10: يتتبّع مسار الدواء في الجسم حتى وصوله إلى موضع الألم",
      level: "reasoning",
      prompt: "رتّب رحلة الدواء في الجسم من البداية إلى النهاية.",
      steps: [
        "تناول الدواء",
        "وصوله إلى المعدة",
        "انتقاله إلى الدم",
        "وصوله إلى مكان الألم"
      ]
    },

    // ⑫ اكتشف الخطأ — إثرائي: تناول كمية كبيرة من الدواء (رسم SVG بلا ملامح وجه)
    {
      type: "find-error",
      objective: "4Bh11: يدرك أهمية أخذ الدواء بالجرعة والوقت المناسبين وبإشراف بالغ",
      level: "reasoning",
      prompt: "الطريقةُ الآمنةُ أن نأخذَ الجرعةَ المحدّدةَ فقط. اضغط على الخطأِ في هذا المشهدِ.",
      bg: "#f3e8d6",
      spot: { x: 50, y: 62, r: 16 },
      svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="يد تتناول كمية كبيرة من الأقراص من زجاجة دواء">
        <g transform="rotate(-36 318 96)">
          <rect x="292" y="54" width="52" height="84" rx="12" fill="#e6913c" stroke="#9c5a1e" stroke-width="4"/>
          <rect x="303" y="36" width="30" height="24" rx="5" fill="#c76f28" stroke="#9c5a1e" stroke-width="4"/>
          <rect x="299" y="78" width="38" height="34" rx="4" fill="#fff5e2" stroke="#9c5a1e" stroke-width="2"/>
          <line x1="305" y1="88" x2="331" y2="88" stroke="#c76f28" stroke-width="3"/>
          <line x1="305" y1="98" x2="331" y2="98" stroke="#c76f28" stroke-width="3"/>
        </g>
        <path d="M132 236 Q126 196 172 190 L236 190 Q282 196 276 236 Q270 268 204 271 Q138 268 132 236 Z" fill="#f0c8a2" stroke="#cf9a6e" stroke-width="5"/>
        <g fill="#f28a8a" stroke="#b23b3b" stroke-width="2">
          <ellipse cx="176" cy="176" rx="17" ry="11"/>
          <ellipse cx="212" cy="170" rx="17" ry="11"/>
          <ellipse cx="246" cy="178" rx="17" ry="11"/>
          <ellipse cx="192" cy="192" rx="17" ry="11"/>
          <ellipse cx="230" cy="192" rx="17" ry="11"/>
          <ellipse cx="164" cy="196" rx="17" ry="11"/>
          <ellipse cx="258" cy="198" rx="17" ry="11"/>
          <ellipse cx="204" cy="156" rx="17" ry="11"/>
        </g>
        <g fill="#f7b3b3" stroke="#b23b3b" stroke-width="2">
          <ellipse cx="238" cy="132" rx="13" ry="8" transform="rotate(-30 238 132)"/>
          <ellipse cx="222" cy="150" rx="13" ry="8" transform="rotate(-20 222 150)"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس الأول: الطيور المُدهشة (ص ٣٦–٣٧)
  "g4s-2-1": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "ما المقصودُ بـ«موطنِ» الكائنِ الحيِّ؟",
      options: [
        "البيئةُ المحليةُ التي يعيشُ فيها ويحصلُ على احتياجاتِه",
        "نوعُ الطعامِ الذي يأكلُه فقط",
        "شكلُ منقارِه",
        "سرعةُ طيرانِه"
      ],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      statement: "تتكيّفُ أجسامُ الطيورِ لتساعدَها على العيشِ في موطنِها.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "صِل كلَّ تكيّفٍ بفائدتِه.",
      pairs: [
        { a: "المخالب الحادّة",  b: "حملُ الفريسةِ وتمزيقُ اللحمِ" },
        { a: "الأقدام المسطّحة", b: "السباحةُ في الماءِ" },
        { a: "الجسم الانسيابي",  b: "الطيرانُ بسرعةٍ عاليةٍ" },
        { a: "الريش",            b: "حفظُ حرارةِ الجسمِ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "تتكيّفُ أجسامُ الطيورِ لتعيشَ في {} الخاصِّ بها، فمخالبُ النسرِ {} لتحملَ الفريسةَ، وأقدامُ البطريقِ {} لتساعدَه على السباحةِ.",
      answers: ["الموطنِ", "حادّةٌ", "مسطّحةٌ"],
      distractors: ["ناعمةٌ", "قصيرةٌ"]
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "reasoning",
      prompt: "صنّف كلَّ تكيّفٍ تحت الطائرِ صاحبِه.",
      groups: [
        { name: "النسر",        items: ["أجنحة قوية", "مخالب حادّة"] },
        { name: "البطريق",      items: ["أقدام مسطّحة", "ريش يحفظ الحرارة"] },
        { name: "طائر السمامة", items: ["جسم انسيابي", "طيران سريع"] }
      ]
    },

    // ⑬ السؤال الصوتي — إثرائي (أصول موجودة: sound-bird.wav + صور الحيوانات)
    {
      type: "audio-q",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "استمع إلى الصوتِ، ثم اختر الحيوانَ الذي أصدرَه.",
      sound: "audio/sound-bird.wav",
      options: [
        { image: "images/حيوان-طائر.png", label: "طائر" },
        { image: "images/حيوان-قطة.png",  label: "قطة" },
        { image: "images/حيوان-ضفدع.png", label: "ضفدع" }
      ],
      answer: 0
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس الثاني: موطن الحلزون (ص ٣٨–٣٩)
  "g4s-2-2": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      statement: "عندما تجِفُّ البيئةُ يلجأُ الحلزونُ إلى داخلِ قوقعتِه.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "بِمَ يأكلُ الحلزونُ الأوراقَ وهو بلا أسنانٍ؟",
      options: ["بلسانِه الخشنِ", "بأسنانِه الحادّةِ", "بقوقعتِه", "بقدمِه"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "صِل كلَّ جزءٍ من الحلزونِ بوظيفتِه.",
      pairs: [
        { a: "القوقعة",      b: "الحمايةُ والاختباءُ" },
        { a: "القدم",        b: "الزحفُ والحركةُ" },
        { a: "اللسان الخشن", b: "أكلُ الأوراقِ" },
        { a: "الجلد الرطب",  b: "يجبُ ألّا يجفَّ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "يعيشُ الحلزونُ تحت {} وبالقربِ من {}؛ لأنّ جلدَه {} يجبُ ألّا يجفَّ.",
      answers: ["الأحجارِ", "الماءِ", "الرطبَ"],
      distractors: ["الشمسِ", "الجافِّ"]
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "reasoning",
      prompt: "صنّف ما يناسبُ الحلزونَ في موطنِه وما يضرُّه.",
      groups: [
        { name: "يناسبُه", items: ["الرطوبة", "أماكن للاختباء", "الأوراق"] },
        { name: "يضرُّه",  items: ["الجفاف", "الشمس الحارقة"] }
      ]
    },

    // ⑪ الخريطة الذهنية — إثرائي
    {
      type: "mindmap",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "application",
      prompt: "أكمل الخريطةَ الذهنيةَ بسحبِ الكلمةِ المناسبةِ إلى كلِّ فرعٍ.",
      center: "الحلزون",
      branches: [
        { label: "يأكل",         answer: "الأوراق" },
        { label: "يختبئ تحت",    answer: "الأحجار" },
        { label: "يحمي نفسه بـ", answer: "القوقعة" }
      ],
      distractors: ["الأسنان"]
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس الثالث: الحيوانات في المواطن الطبيعية
  "g4s-2-3": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "تعيشُ الحيواناتُ في الموطنِ الذي يؤمّنُ لها ماذا؟",
      options: ["الغذاءَ", "الألوانَ", "الأسماءَ", "السرعةَ"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      statement: "بعضُ الحيواناتِ تأكلُ النباتاتِ، وبعضُها الآخرُ يأكلُ حيواناتٍ أخرى.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "knowledge",
      prompt: "صِل كلَّ حيوانٍ بصفتِه في موطنِه.",
      pairs: [
        { a: "الأرنب",  b: "يأكلُ النباتاتِ" },
        { a: "الثعلب",  b: "يأكلُ الحيواناتِ" },
        { a: "البطّة",  b: "تسبحُ في الماءِ" },
        { a: "البومة",  b: "تصطادُ ليلاً" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "تحتاجُ الحيواناتُ إلى {} يؤمّنُ لها {}؛ فبعضُها يأكلُ {} وبعضُها يأكلُ حيواناتٍ أخرى.",
      answers: ["موطنٍ", "الغذاءَ", "النباتاتِ"],
      distractors: ["ملابسَ", "الألوانَ"]
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "reasoning",
      prompt: "صنّف حيواناتِ الغابةِ حسب غذائِها.",
      groups: [
        { name: "تأكل النباتات",        items: ["الأرنب", "البطّ", "الإوزّ"] },
        { name: "تأكل حيواناتٍ أخرى", items: ["الثعلب", "الصقر", "البومة"] }
      ]
    },

    // ⑫ اكتشف الخطأ — إثرائي (صورة موجودة: سمكة في الموطن الخطأ)
    {
      type: "find-error",
      objective: "4Be1: يتحرّى أنواع الحيوانات في المواطن الطبيعية وطرق تلاؤمها",
      level: "reasoning",
      prompt: "في هذا المشهدِ كائنٌ وُضِعَ في الموطنِ الخطأِ — اضغط على الخطأِ.",
      image: "images/خطأ-الموطن.png",
      spot: { x: 57, y: 29, r: 12 }
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس الرابع: المفاتيح التعريفية
  "g4s-2-4": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "knowledge",
      statement: "يستخدمُ العلماءُ المفتاحَ التعريفيَّ لتمييزِ الحيواناتِ وتصنيفِها.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "knowledge",
      prompt: "ماذا يحوي كلُّ مستطيلٍ في المفتاحِ التعريفيِّ؟",
      options: ["سؤالاً إجابتُه نعم أو لا", "صورةً ملوّنةً", "اسمَ العالِمِ", "رقماً سرّيّاً"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "knowledge",
      prompt: "صِل كلَّ صفةٍ بالحيوانِ الذي يميّزُه المفتاحُ.",
      pairs: [
        { a: "له ريش",        b: "الطير" },
        { a: "له أربع أرجل",  b: "القطة" },
        { a: "له زعانف",      b: "السمكة" },
        { a: "يزحف على الأرض", b: "الثعبان" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "application",
      prompt: "أكمل خطواتِ المفتاحِ بسحبِ الكلماتِ المناسبةِ.",
      text: "إذا كان للحيوانِ {} فهو طيرٌ، وإذا كان له {} فهو سمكةٌ، وإذا كان {} على الأرضِ فهو ثعبانٌ.",
      answers: ["ريشٌ", "زعانفُ", "يزحفُ"],
      distractors: ["فراءٌ", "يقفزُ"]
    },

    // ⑥ الترتيب التسلسلي — استدلال (اتباع مسار المفتاح)
    {
      type: "sequence",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "reasoning",
      prompt: "اتبع المفتاحَ التعريفيَّ: رتّب الأسئلةَ للوصولِ إلى «الطيرِ».",
      steps: [
        "هل للحيوانِ أرجلٌ؟",
        "هل له رِجلانِ؟",
        "هل له ريشٌ؟",
        "إنّه الطيرُ"
      ]
    },

    // ⑨ الاستبعاد — إثرائي
    {
      type: "exclude",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "reasoning",
      prompt: "أيُّها لا ينتمي إلى مجموعةِ «له أرجلٌ»؟",
      options: ["القطة", "الكلب", "الطير", "السمكة"],
      answer: 3,
      reason: "السمكةُ لا أرجلَ لها بل زعانفُ."
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس الخامس: تمييز الحيوانات اللافقارية
  "g4s-2-5": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "knowledge",
      prompt: "كم رِجلاً للحشرةِ؟",
      options: ["ستُّ أرجلٍ", "أربعُ أرجلٍ", "رِجلانِ", "ثمانِ أرجلٍ"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "knowledge",
      statement: "دودةُ الأرضِ من الحيواناتِ اللافقاريةِ لكنّها ليست حشرةً.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "knowledge",
      prompt: "صِل كلَّ كائنٍ لافقاريٍّ بصفتِه.",
      pairs: [
        { a: "النحل",       b: "يصنعُ العسلَ" },
        { a: "النمل",       b: "يعملُ في مجموعاتٍ" },
        { a: "الفراشة",     b: "لها جناحانِ وستُّ أرجلٍ" },
        { a: "دودة الأرض", b: "تعيشُ في التربةِ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "الحشرةُ حيوانٌ {}، لها {} أرجلٍ، وغالباً ما تستطيعُ {}.",
      answers: ["لافقاريٌّ", "ستُّ", "الطيرانَ"],
      distractors: ["فقاريٌّ", "أربعُ"]
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "reasoning",
      prompt: "صنّف الكائناتِ: حشرةٌ أم ليست حشرةً؟",
      groups: [
        { name: "حشرة",       items: ["النحلة", "الفراشة", "النملة"] },
        { name: "ليست حشرة", items: ["دودة الأرض", "الحلزون", "العنكبوت"] }
      ]
    },

    // 🎨 التلوين — إثرائي: تمييز الحشرة (رسم SVG بلا ملامح وجه)
    {
      type: "color",
      objective: "4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً",
      level: "application",
      prompt: "لوّن الحشرةَ (ذاتَ الستِّ أرجلٍ) بالأخضرِ، والكائنَ اللافقاريَّ الذي ليس حشرةً بالبنّيِّ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر", color: "#3e9b4f" },
        { name: "بنّي", color: "#8a5a2b" },
        { name: "رمادي", color: "#9aa3ab" }
      ],
      parts: [
        { name: "الحشرة",     color: "#3e9b4f" },
        { name: "دودة الأرض", color: "#8a5a2b" }
      ],
      // رسم مُغنى وفق قاعدة التفصيل البصري (CLAUDE.md): حشرة بتشريحها (رأس/صدر/بطن،
      // جناحان، ٦ أرجل مفصلية، قرنا استشعار، خطوط بطن) ودودة متعرجة مقسمة على كومة
      // تربة، مع خط أرض وأعشاب — وبلا ملامح وجه. الزخارف الثابتة بألوان صريحة،
      // وجزءا التلوين (cpart) بلا تعبئة ليرثا لون الطالب.
      svg: `<svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="حشرة مفصلة ودودة أرض على كومة تربة">
        <line x1="30" y1="300" x2="530" y2="300" stroke="#c9b189" stroke-width="5" stroke-linecap="round"/>
        <path d="M70,300 L64,282 M70,300 L74,280 M70,300 L81,286" stroke="#3e9b4f" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M262,300 L256,284 M262,300 L266,281 M262,300 L272,287" stroke="#3e9b4f" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M508,300 L502,283 M508,300 L512,281 M508,300 L518,287" stroke="#3e9b4f" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="122" cy="198" rx="36" ry="16" fill="#dceefb" stroke="#7fb3e0" stroke-width="3" transform="rotate(-32 122 198)"/>
        <ellipse cx="178" cy="198" rx="36" ry="16" fill="#dceefb" stroke="#7fb3e0" stroke-width="3" transform="rotate(32 178 198)"/>
        <g stroke="#5b4a2f" stroke-width="5" stroke-linecap="round" fill="none">
          <path d="M132,220 L100,238 L92,262"/>
          <path d="M130,232 L96,252 L92,278"/>
          <path d="M134,244 L104,266 L104,290"/>
          <path d="M168,220 L200,238 L208,262"/>
          <path d="M170,232 L204,252 L208,278"/>
          <path d="M166,244 L196,266 L196,290"/>
          <path d="M142,166 C134,150 130,142 120,134"/>
          <path d="M158,166 C166,150 170,142 180,134"/>
        </g>
        <circle cx="120" cy="134" r="5" fill="#5b4a2f"/>
        <circle cx="180" cy="134" r="5" fill="#5b4a2f"/>
        <g class="cpart" data-name="الحشرة" id="part-insect">
          <circle cx="150" cy="174" r="18"/>
          <ellipse cx="150" cy="212" rx="24" ry="20"/>
          <ellipse cx="150" cy="262" rx="20" ry="34"/>
        </g>
        <path d="M132,248 Q150,254 168,248" stroke="#5b4a2f" stroke-width="3" fill="none"/>
        <path d="M131,266 Q150,272 169,266" stroke="#5b4a2f" stroke-width="3" fill="none"/>
        <path d="M134,284 Q150,290 166,284" stroke="#5b4a2f" stroke-width="3" fill="none"/>
        <path d="M310,300 Q400,258 510,300 Z" fill="#e8d9b8" stroke="#c9b189" stroke-width="4"/>
        <g class="cpart" data-name="دودة الأرض" id="part-worm">
          <circle cx="340" cy="288" r="11"/>
          <circle cx="360" cy="272" r="13"/>
          <circle cx="384" cy="260" r="15"/>
          <circle cx="410" cy="254" r="15"/>
          <circle cx="436" cy="257" r="15"/>
          <circle cx="460" cy="266" r="15"/>
          <circle cx="480" cy="280" r="16"/>
        </g>
        <path d="M372,268 q7,-6 13,-5" stroke="#5b4a2f" stroke-width="3" fill="none"/>
        <path d="M398,256 q7,-3 13,-2" stroke="#5b4a2f" stroke-width="3" fill="none"/>
        <path d="M448,260 q7,2 12,5" stroke="#5b4a2f" stroke-width="3" fill="none"/>
      </svg>`
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس السادس: كيف نؤثّر على البيئة؟ (ص ٤٦–٤٧)
  "g4s-2-6": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      statement: "يؤثّرُ الإنسانُ على البيئةِ بطرقٍ مفيدةٍ وأخرى ضارّةٍ.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      prompt: "غرقُ خزّانِ النفطِ وتسرّبُه في المحيطِ مثالٌ على…",
      options: ["كارثةٍ من صُنعِ الإنسانِ", "كارثةٍ طبيعيةٍ", "سلوكٍ مفيدٍ للبيئةِ", "إعادةِ تدويرٍ"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      prompt: "صِل كلَّ حدثٍ بنوعِه.",
      pairs: [
        { a: "تسرّب النفط",   b: "كارثةٌ من صُنعِ الإنسانِ" },
        { a: "الزلزال",       b: "كارثةٌ طبيعيةٌ" },
        { a: "دخان المصانع",  b: "تلويثٌ من صُنعِ الإنسانِ" },
        { a: "إعادة التدوير", b: "سلوكٌ مفيدٌ للبيئةِ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "يحتاجُ الإنسانُ والحيواناتُ والنباتاتُ إلى {} و{} نظيفٍ، لذا علينا {} البيئةَ.",
      answers: ["هواءٍ", "ماءٍ", "حمايةُ"],
      distractors: ["دخانٍ", "نفاياتٍ"]
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "reasoning",
      prompt: "صنّف كلَّ حدثٍ: كارثةٌ طبيعيةٌ أم من صُنعِ الإنسانِ؟",
      groups: [
        { name: "كارثة طبيعية",      items: ["الزلزال", "الفيضان"] },
        { name: "من صُنع الإنسان", items: ["تسرّب النفط", "دخان المصانع", "تلويث الأنهار"] }
      ]
    },

    // ⑫ اكتشف الخطأ — إثرائي: الضرر البيئي (رسم SVG بلا ملامح وجه)
    {
      type: "find-error",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "reasoning",
      prompt: "في هذا المشهدِ سلوكٌ يضرُّ بالبيئةِ — اضغط على الخطأِ.",
      spot: { x: 75, y: 24, r: 15 },
      svg: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="مشهد بيئي فيه مصنع يطلق دخاناً">
        <rect x="0" y="0" width="400" height="200" fill="#cfe8f5"/>
        <rect x="0" y="196" width="400" height="64" fill="#bfe0a0"/>
        <circle cx="52" cy="46" r="24" fill="#f6c945"/>
        <rect x="98" y="150" width="14" height="48" fill="#8a5a2b"/>
        <circle cx="105" cy="140" r="32" fill="#4a9b48"/>
        <rect x="166" y="162" width="12" height="38" fill="#8a5a2b"/>
        <circle cx="172" cy="152" r="26" fill="#5aa856"/>
        <rect x="250" y="140" width="112" height="58" fill="#9aa3ab" stroke="#5b6570" stroke-width="3"/>
        <rect x="292" y="94" width="20" height="48" fill="#7d8790" stroke="#5b6570" stroke-width="3"/>
        <g fill="#7a7a7a">
          <circle cx="302" cy="80" r="14"/>
          <circle cx="288" cy="64" r="16"/>
          <circle cx="312" cy="56" r="15"/>
          <circle cx="298" cy="42" r="18"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس السابع: الماء الرائع (ص ٤٨–٤٩)
  "g4s-2-7": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      prompt: "لماذا لا نستطيعُ شربَ معظمِ ماءِ الأرضِ؟",
      options: ["لأنّه مالحٌ", "لأنّه باردٌ", "لأنّه قليلٌ", "لأنّه ملوّنٌ"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      statement: "تؤذي المياهُ الملوّثةُ الإنسانَ والحيوانَ والنباتَ.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      prompt: "صِل كلَّ سببٍ بأثرِه.",
      pairs: [
        { a: "نفايات الإنسان في البحر", b: "موتُ النباتاتِ والحيواناتِ" },
        { a: "شرب ماء ملوّث",          b: "مرضُ الإنسانِ" },
        { a: "إيقاف التلوّث",           b: "عودةُ النظافةِ للماءِ" },
        { a: "نبع الأنهار من الجبال",   b: "مياهٌ نظيفةٌ وآمنةٌ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "نحتاجُ المياهَ {} للشربِ، ولسقيِ {}، ولتشربَ منها {}.",
      answers: ["العذبةَ", "النباتاتِ", "الحيواناتُ"],
      distractors: ["المالحةَ", "السياراتُ"]
    },

    // ⑥ الترتيب التسلسلي — استدلال: تجربة تنظيف الماء
    {
      type: "sequence",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "reasoning",
      prompt: "رتّب خطواتِ تجربةِ تنظيفِ الماءِ.",
      steps: [
        "لاحظ الماءَ العذبَ النظيفَ",
        "اخلط الرملَ فيتلوّثُ الماءُ",
        "مرّر الماءَ في القمعِ وورقةِ الترشيحِ",
        "اجمع الماءَ النظيفَ في الكأسِ"
      ]
    },

    // ⑪ الخريطة الذهنية — إثرائي
    {
      type: "mindmap",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "application",
      prompt: "أكمل الخريطةَ الذهنيةَ بسحبِ الكلمةِ المناسبةِ إلى كلِّ فرعٍ.",
      center: "تلوّث الماء",
      branches: [
        { label: "السبب", answer: "نفايات الإنسان" },
        { label: "الأثر", answer: "موت الكائنات" },
        { label: "الحلّ", answer: "إيقاف التلوّث" }
      ],
      distractors: ["ماء الجبال"]
    }

  ],

  // العلوم/الرابع — الوحدة الثانية، الدرس الثامن: إعادة التدوير تحمي الأرض (ص ٥٠–٥١)
  "g4s-2-8": [

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      statement: "عندما تُطمَرُ النفاياتُ فإنّها تلوّثُ التربةَ والمياهَ الجوفيةَ.",
      answer: true
    },

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      prompt: "ماذا نصنعُ من نفاياتِ الزجاجِ المُعادِ تدويرُها؟",
      options: ["قنانيَ زجاجيةً جديدةً", "أوراقاً جديدةً", "أدواتٍ بلاستيكيةً", "سماداً عضويّاً"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "knowledge",
      prompt: "صِل كلَّ صندوقِ تدويرٍ بلونِه بما يوضَعُ فيه.",
      pairs: [
        { a: "الصندوق الأزرق",    b: "البلاستيك" },
        { a: "الصندوق البرتقالي", b: "الورق" },
        { a: "الصندوق الأخضر",    b: "الزجاج" },
        { a: "الصندوق الأحمر",    b: "النفايات العامّة" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "بدلاً من {} النفاياتِ، يمكنُنا {} البلاستيكِ والورقِ و{} في أغراضٍ مفيدةٍ.",
      answers: ["طمرِ", "إعادةِ تدويرِ", "الزجاجِ"],
      distractors: ["حرقِ", "أكلِ"]
    },

    // ⑥ الترتيب التسلسلي — استدلال: صنع السماد العضوي
    {
      type: "sequence",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "reasoning",
      prompt: "رتّب خطواتِ صنعِ السمادِ العضويِّ.",
      steps: [
        "يكدّسُ المزارعُ الموادَّ النباتيةَ الميّتةَ",
        "تتغذّى الكائناتُ الدقيقةُ عليها (التعفّن)",
        "تتحوّلُ إلى سمادٍ عضويٍّ",
        "يُضافُ السمادُ للتربةِ فيساعدُ النباتَ على النموِّ"
      ]
    },

    // 🎨 التلوين — إثرائي: صناديق التدوير الأربعة (رسم SVG)
    {
      type: "color",
      objective: "4Be3: يميّز الطرق التي يؤثّر فيها الإنسان على البيئة",
      level: "application",
      prompt: "لوّن كلَّ صندوقٍ باللونِ المعتمدِ لنوعِ ما يوضَعُ فيه.",
      bg: "#fdf9ee",
      palette: [
        { name: "أحمر",    color: "#cf3b3b" },
        { name: "أزرق",    color: "#2f6fb0" },
        { name: "برتقالي", color: "#e08a2b" },
        { name: "أخضر",    color: "#3e9b4f" }
      ],
      parts: [
        { name: "صندوق النفايات العامّة", color: "#cf3b3b" },
        { name: "صندوق البلاستيك",         color: "#2f6fb0" },
        { name: "صندوق الورق",             color: "#e08a2b" },
        { name: "صندوق الزجاج",            color: "#3e9b4f" }
      ],
      svg: `<svg viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="أربعة صناديق لإعادة التدوير">
        <g class="cpart" data-name="صندوق النفايات العامّة" id="bin-general"><rect x="20" y="60" width="80" height="110" rx="8"/></g>
        <rect x="14" y="48" width="92" height="18" rx="6" fill="#5b6570"/>
        <text x="60" y="196" text-anchor="middle" font-size="16" fill="#33334d" font-family="sans-serif">عام</text>
        <g class="cpart" data-name="صندوق البلاستيك" id="bin-plastic"><rect x="130" y="60" width="80" height="110" rx="8"/></g>
        <rect x="124" y="48" width="92" height="18" rx="6" fill="#5b6570"/>
        <text x="170" y="196" text-anchor="middle" font-size="16" fill="#33334d" font-family="sans-serif">بلاستيك</text>
        <g class="cpart" data-name="صندوق الورق" id="bin-paper"><rect x="240" y="60" width="80" height="110" rx="8"/></g>
        <rect x="234" y="48" width="92" height="18" rx="6" fill="#5b6570"/>
        <text x="280" y="196" text-anchor="middle" font-size="16" fill="#33334d" font-family="sans-serif">ورق</text>
        <g class="cpart" data-name="صندوق الزجاج" id="bin-glass"><rect x="350" y="60" width="80" height="110" rx="8"/></g>
        <rect x="344" y="48" width="92" height="18" rx="6" fill="#5b6570"/>
        <text x="390" y="196" text-anchor="middle" font-size="16" fill="#33334d" font-family="sans-serif">زجاج</text>
      </svg>`
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس الأول: المادة
  "g4s-3-1": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      prompt: "كم حالةً للمادّةِ؟",
      options: ["ثلاثُ حالاتٍ: صلبةٌ وسائلةٌ وغازِيّةٌ", "حالتانِ فقط", "أربعُ حالاتٍ", "حالةٌ واحدةٌ"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      statement: "الهواءُ خليطٌ من غازاتٍ مختلفةٍ.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      prompt: "صِل كلَّ مصطلحٍ بمعناه.",
      pairs: [
        { a: "المادّة",   b: "كلُّ ما يحيطُ بنا" },
        { a: "الحالة",    b: "مظهرُ المادّةِ" },
        { a: "الأُكسِجين", b: "غازٌ نتنفّسُه لنعيشَ" },
        { a: "الكلور",    b: "غازٌ لونُه أصفر" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "الهواءُ خليطٌ من {}؛ يُشكّلُ {} أربعةَ أخماسِه، ونتنفّسُ منه {} لنعيشَ.",
      answers: ["غازاتٍ", "النيتروجينُ", "الأُكسِجينَ"],
      distractors: ["الماءِ", "الثلجِ"]
    },

    // ⑦ التصنيف — استدلال
    // ملاحظة بوّابة الرسومات: هذا السؤال كان مخطّطاً كنقر/تلوين على «مشهد حفلة أحمد»؛
    // سقط في البوّابة الرباعية (>٤ مناطق + تداخل + ألوان متقاربة) فحُوّل إلى تصنيف نصّي يخدم الهدف نفسه.
    {
      type: "classify",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "reasoning",
      prompt: "صنّف موادَّ حفلةِ أحمدَ حسبَ حالتِها.",
      groups: [
        { name: "صلبة",   items: ["الطوب", "الكعكة"] },
        { name: "سائلة",  items: ["الماء", "العصير"] },
        { name: "غازِيّة", items: ["الهواء", "غاز البالون"] }
      ]
    },

    // ⑨ الاستبعاد — إثرائي
    {
      type: "exclude",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "reasoning",
      prompt: "أيُّها ليس حالةً للمادّةِ؟",
      options: ["الصلبة", "السائلة", "الغازِيّة", "الحارّة"],
      answer: 3,
      reason: "الحرارةُ ليست حالةً للمادّةِ، بل تُسبّبُ تغيّرَ حالتِها."
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس الثاني: المادة تتكوّن من الجزيئات (ص ٥٦–٥٧)
  "g4s-3-2": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      prompt: "مِمّ تتكوّنُ المادّةُ؟",
      options: ["من جُزيئاتٍ صغيرةٍ جدًّا", "من صناديقَ", "من ألوانٍ", "من حرارةٍ"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      statement: "جُزيئاتُ المادّةِ الصلبةِ متلاصقةٌ بشدّةٍ وتهتزُّ في موضِعِها.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      prompt: "صِل كلَّ حالةٍ بترتيبِ جُزيئاتِها.",
      pairs: [
        { a: "الصلبة",        b: "جُزيئاتٌ متلاصقةٌ منتظمةٌ" },
        { a: "السائلة",       b: "جُزيئاتٌ متقاربةٌ تنزلقُ" },
        { a: "الغازِيّة",      b: "جُزيئاتٌ متباعدةٌ منتشرةٌ" },
        { a: "النموذج العلمي", b: "يشرحُ ما لا نراه بالعينِ" }
      ]
    },

    // ⑤ تحديد الأجزاء (hotspot) — تطبيق (رسم SVG هندسيّ: لا يحتاج مسار الرسومات)
    {
      type: "hotspot",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "application",
      prompt: "انقر على الصندوقِ الذي تكونُ فيه الجُزيئاتُ متلاصقةً منتظمةً (المادّةُ الصلبةُ).",
      fit: "width",
      bg: "#fdf9ee",
      spot: { x: 82.5, y: 50, r: 13 },
      // نسبة الرسم ٢٫١٩٦ (shoogp-ui §١.١٠): طالت الصناديق (١٣٠×١٣٠ ⇒ ١٣٨×١٦٥) وكبرت
      // الجزيئات (نق ٩ ⇒ ١٠) وأُعيد توزيعها على الارتفاع الجديد بنفس أعدادها وأنماطها.
      svg: `<svg viewBox="0 0 470 214" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ثلاثة صناديق بترتيب الجزيئات">
        <rect x="12" y="25" width="138" height="165" rx="12" fill="#eef2f6" stroke="#33334d" stroke-width="3"/>
        <g fill="#2f6fb0"><circle cx="45" cy="62" r="10"/><circle cx="115" cy="54" r="10"/><circle cx="80" cy="108" r="10"/><circle cx="40" cy="152" r="10"/><circle cx="120" cy="146" r="10"/></g>
        <rect x="166" y="25" width="138" height="165" rx="12" fill="#eef2f6" stroke="#33334d" stroke-width="3"/>
        <g fill="#2f6fb0"><circle cx="188" cy="92" r="10"/><circle cx="216" cy="82" r="10"/><circle cx="246" cy="94" r="10"/><circle cx="276" cy="86" r="10"/><circle cx="198" cy="127" r="10"/><circle cx="228" cy="134" r="10"/><circle cx="258" cy="126" r="10"/><circle cx="288" cy="120" r="10"/><circle cx="208" cy="164" r="10"/><circle cx="242" cy="168" r="10"/><circle cx="274" cy="160" r="10"/></g>
        <rect x="320" y="25" width="138" height="165" rx="12" fill="#eef2f6" stroke="#33334d" stroke-width="3"/>
        <g fill="#2f6fb0"><circle cx="344" cy="58" r="10"/><circle cx="374" cy="58" r="10"/><circle cx="404" cy="58" r="10"/><circle cx="434" cy="58" r="10"/><circle cx="344" cy="94" r="10"/><circle cx="374" cy="94" r="10"/><circle cx="404" cy="94" r="10"/><circle cx="434" cy="94" r="10"/><circle cx="344" cy="130" r="10"/><circle cx="374" cy="130" r="10"/><circle cx="404" cy="130" r="10"/><circle cx="434" cy="130" r="10"/><circle cx="344" cy="166" r="10"/><circle cx="374" cy="166" r="10"/><circle cx="404" cy="166" r="10"/><circle cx="434" cy="166" r="10"/></g>
      </svg>`
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "reasoning",
      prompt: "صنّف كلَّ صفةٍ تحت حالتِها.",
      groups: [
        { name: "صلبة",   items: ["يحافظُ على شكلِه", "جُزيئاتُه تهتزُّ في مكانِها"] },
        { name: "سائلة",  items: ["ينزلقُ ويغيّرُ شكلَه"] },
        { name: "غازِيّة", items: ["يأخذُ شكلَ الوعاءِ", "جُزيئاتُه متباعدةٌ"] }
      ]
    },

    // ⑪ الخريطة الذهنية — إثرائي
    {
      type: "mindmap",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "application",
      prompt: "أكمل الخريطةَ الذهنيةَ بسحبِ الترتيبِ المناسبِ إلى كلِّ حالةٍ.",
      center: "حالاتُ المادّةِ",
      branches: [
        { label: "صلبة",   answer: "جزيئات متلاصقة" },
        { label: "سائلة",  answer: "جزيئات متقاربة" },
        { label: "غازِيّة", answer: "جزيئات متباعدة" }
      ],
      distractors: ["جزيئات مضيئة"]
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس الثالث: كيف تختلف المواد الصلبة والسائلة والغازية؟ (ص ٥٨–٥٩)
  // ملاحظة: السؤال الإثرائي (تلوين الأجسام بحالاتها) اجتاز بوّابة الرسومات وأُجِّل للجولة الثانية (graphics-queue.md).
  "g4s-3-3": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      prompt: "أيُّ حالةٍ تأخذُ شكلَ الوعاءِ وتنتشرُ في كلِّ الاتّجاهاتِ؟",
      options: ["الغازِيّة", "الصلبة", "المعدن", "الخشب"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      statement: "معظمُ المَوادِّ الصلبةِ لا تُغيّرُ شكلَها عند الضغطِ عليها.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "knowledge",
      prompt: "صِل كلَّ حالةٍ بخاصيّتِها.",
      pairs: [
        { a: "الصلبة",   b: "لا تُضغطُ ولا تُغيّرُ شكلَها" },
        { a: "السائلة",  b: "تأخذُ شكلَ الوعاءِ وتُسكبُ" },
        { a: "الغازِيّة", b: "تنتشرُ وتملأُ الوعاءَ" },
        { a: "الطوب",    b: "مثالٌ على المادّةِ الصلبةِ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "المادّةُ الصلبةُ {} شكلَها، والسائلةُ تأخذُ شكلَ {}، والغازِيّةُ {} في كلِّ مكانٍ.",
      answers: ["لا تُغيّرُ", "الوعاءِ", "تنتشرُ"],
      distractors: ["تأكلُ", "تختفي"]
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Cs1: يميّز المادة الصلبة والسائلة والغازية",
      level: "reasoning",
      prompt: "صنّف حسبَ قابليّةِ تغييرِ الشكلِ.",
      groups: [
        { name: "يصعبُ تغييرُ شكلِه", items: ["الطوب", "الحجر", "القلم"] },
        { name: "يسهلُ تغييرُ شكلِه", items: ["الماء", "الهواء", "العصير"] }
      ]
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس الرابع: الانصهار والتجمّد والغليان (ص ٦٠–٦١)
  "g4s-3-4": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Cs3: يعرّف الانصهار بالتغيّر من الحالة الصلبة إلى السائلة وأنّ التجمّد عكسه",
      level: "knowledge",
      prompt: "التغيّرُ من الحالةِ الصلبةِ إلى السائلةِ بالتسخينِ يُسمّى…",
      options: ["الانصِهارَ", "التّجمُّدَ", "الغَلَيانَ", "التّبريدَ"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Cs3: يعرّف الانصهار بالتغيّر من الحالة الصلبة إلى السائلة وأنّ التجمّد عكسه",
      level: "knowledge",
      statement: "التّجمُّدُ عكسُ الانصِهارِ.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "knowledge",
      prompt: "صِل كلَّ عمليةٍ بتعريفِها.",
      pairs: [
        { a: "الانصِهار", b: "تحوّلُ الصلبِ إلى سائلٍ" },
        { a: "التّجمُّد",  b: "تحوّلُ السائلِ إلى صلبٍ" },
        { a: "الغَلَيان",  b: "تحوّلُ السائلِ إلى غازٍ" },
        { a: "التّبريد",   b: "إنقاصُ حرارةِ المادّةِ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Cs4: يلاحظ كيف يتغيّر الماء إلى بخار عند تسخينه وعند التبريد يعود ماءً",
      level: "application",
      prompt: "أكمل الجملةَ بسحبِ الكلماتِ المناسبةِ.",
      text: "يوجدُ الماءُ في ثلاثِ حالاتٍ: {} صلبٌ، و{} سائلٌ، و{} غازٌ.",
      answers: ["الثلجُ", "الماءُ", "بخارُ الماءِ"],
      distractors: ["الحديدُ", "الرملُ"]
    },

    // ⑥ الترتيب التسلسلي — استدلال
    {
      type: "sequence",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "reasoning",
      prompt: "رتّب تغيّرَ الثلجِ عند التسخينِ من البدايةِ إلى النهايةِ.",
      steps: [
        "ثلجٌ (صلبٌ)",
        "ينصهرُ فيصيرُ ماءً (سائلاً)",
        "يغلي الماءُ",
        "يتحوّلُ إلى بخارٍ (غازٍ)"
      ]
    },

    // ⑨ الاستبعاد — إثرائي
    {
      type: "exclude",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "reasoning",
      prompt: "أيُّها ليس تغيّراً في حالةِ المادّةِ؟",
      options: ["الانصِهار", "التّجمُّد", "الغَلَيان", "القياس"],
      answer: 3,
      reason: "القياسُ تحديدٌ لدرجةِ الحرارةِ، وليس تغيّراً في حالةِ المادّةِ."
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس الخامس: انصهار أنواع مختلفة من المواد الصلبة (ص ٦٢–٦٣)
  "g4s-3-5": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "knowledge",
      prompt: "أيُّ المَوادِّ تحتاجُ حرارةً عاليةً جدًّا كي تنصهرَ؟",
      options: ["المعادنُ مثلُ الذهبِ والحديدِ", "الزُّبدةُ", "الثلجُ", "الشوكولاتة"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Cs3: يعرّف الانصهار بالتغيّر من الحالة الصلبة إلى السائلة وأنّ التجمّد عكسه",
      level: "knowledge",
      statement: "عندما تبردُ المعادنُ المنصهرةُ تعودُ صلبةً مرّةً أخرى.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Cs3: يعرّف الانصهار بالتغيّر من الحالة الصلبة إلى السائلة وأنّ التجمّد عكسه",
      level: "knowledge",
      prompt: "صِل كلَّ مصطلحٍ بمعناه.",
      pairs: [
        { a: "الانصِهار", b: "تحوّلُ الصلبِ إلى سائلٍ" },
        { a: "السبائك",   b: "ألواحُ ذهبٍ صلبةٌ" },
        { a: "الفُرن",     b: "يُسخّنُ المعادنَ حتّى تنصهرَ" },
        { a: "الذهب",     b: "معدنٌ يُصبُّ في قالبٍ" }
      ]
    },

    // ⑧ ملء الفراغ — تطبيق
    {
      type: "fill-blank",
      objective: "4Cs3: يعرّف الانصهار بالتغيّر من الحالة الصلبة إلى السائلة وأنّ التجمّد عكسه",
      level: "application",
      prompt: "أكمل جملةَ تشكيلِ الذهبِ بسحبِ الكلماتِ المناسبةِ.",
      text: "يُسخّنُ الذهبُ حتّى {}، ثمّ يُسكبُ في {}، فيبردُ ويعودُ {}.",
      answers: ["ينصهرَ", "القالبِ", "صلباً"],
      distractors: ["يطيرَ", "غازاً"]
    },

    // ⑥ الترتيب التسلسلي — استدلال
    {
      type: "sequence",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "reasoning",
      prompt: "رتّب مراحلَ تشكيلِ سبيكةِ الذهبِ.",
      steps: [
        "ذهبٌ صلبٌ",
        "يُسخّنُ في الفُرنِ",
        "ينصهرُ فيصيرُ سائلاً",
        "يُسكبُ في القالبِ",
        "يبردُ فيصيرُ سبيكةً صلبةً"
      ]
    },

    // ⑪ الخريطة الذهنية — إثرائي
    {
      type: "mindmap",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "application",
      prompt: "أكمل الخريطةَ الذهنيةَ بسحبِ الكلمةِ المناسبةِ إلى كلِّ فرعٍ.",
      center: "الانصِهار",
      branches: [
        { label: "مادّةٌ تنصهرُ بسهولةٍ",     answer: "الزُّبدة" },
        { label: "مادّةٌ تحتاجُ حرارةً عاليةً", answer: "الحديد" },
        { label: "ناتجُ تبريدِ المنصهرِ",     answer: "مادّة صلبة" }
      ],
      distractors: ["الهواء"]
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس السادس: درجات الانصهار ودرجات الغليان
  "g4s-3-6": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "4Cs4: يلاحظ كيف يتغيّر الماء إلى بخار عند تسخينه وعند التبريد يعود ماءً",
      level: "knowledge",
      prompt: "ما درجةُ غَلَيانِ الماءِ؟",
      options: ["١٠٠°س", "٠°س", "٥٠°س", "٢٠٠°س"],
      answer: 0
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "knowledge",
      statement: "درجةُ انصِهارِ الثلجِ هي صفرٌ °س.",
      answer: true
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "knowledge",
      prompt: "صِل كلَّ مصطلحٍ بتعريفِه.",
      pairs: [
        { a: "درجة الانصِهار",   b: "حرارةُ تحوّلِ الصلبِ إلى سائلٍ" },
        { a: "درجة الغَلَيان",   b: "حرارةُ تحوّلِ السائلِ إلى غازٍ" },
        { a: "الدرجة السيليزيّة", b: "وحدةُ قياسِ درجةِ الحرارةِ" },
        { a: "ميزان الحرارة",    b: "أداةُ قياسِ درجةِ الحرارةِ" }
      ]
    },

    // ⑤ تحديد الأجزاء (hotspot) — تطبيق (ميزان حرارة SVG هندسيّ: لا يحتاج مسار الرسومات)
    {
      type: "hotspot",
      objective: "4Cs4: يلاحظ كيف يتغيّر الماء إلى بخار عند تسخينه وعند التبريد يعود ماءً",
      level: "application",
      prompt: "انقر على درجةِ غَلَيانِ الماءِ (١٠٠°س) على ميزانِ الحرارةِ.",
      bg: "#fdf9ee",
      spot: { x: 54, y: 26, r: 8 },
      svg: `<svg viewBox="0 0 220 380" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ميزان حرارة بمقياس سيليزي">
        <rect x="95" y="45" width="30" height="300" rx="15" fill="#f4f1ea" stroke="#33334d" stroke-width="3"/>
        <circle cx="110" cy="352" r="24" fill="#cf3b3b" stroke="#33334d" stroke-width="3"/>
        <rect x="101" y="283" width="18" height="72" fill="#cf3b3b"/>
        <circle cx="110" cy="352" r="16" fill="#cf3b3b"/>
        <g stroke="#33334d" stroke-width="2"><line x1="125" y1="330" x2="140" y2="330"/><line x1="125" y1="283" x2="140" y2="283"/><line x1="125" y1="237" x2="140" y2="237"/><line x1="125" y1="190" x2="140" y2="190"/><line x1="125" y1="143" x2="140" y2="143"/><line x1="125" y1="97" x2="140" y2="97"/><line x1="125" y1="50" x2="140" y2="50"/></g>
        <g font-family="sans-serif" font-size="15" fill="#33334d"><text x="146" y="335">٠</text><text x="146" y="288">٢٠</text><text x="146" y="242">٤٠</text><text x="146" y="195">٦٠</text><text x="146" y="148">٨٠</text><text x="146" y="102">١٠٠</text><text x="146" y="55">١٢٠</text></g>
      </svg>`
    },

    // ⑦ التصنيف — استدلال
    {
      type: "classify",
      objective: "4Cs2: يستقصي تغيّرات المادة عند التسخين والتبريد",
      level: "reasoning",
      prompt: "صنّف كلَّ تغيّرٍ حسبَ سببِه.",
      groups: [
        { name: "يحدثُ بالتسخينِ", items: ["الانصِهار", "الغَلَيان"] },
        { name: "يحدثُ بالتبريدِ", items: ["التّجمُّد", "تحوّل البخار إلى ماء"] }
      ]
    },

    // ⑫ اكتشف الخطأ — إثرائي (صورة غليان-الماء.png: الماء يغلي لكنّ قراءة الميزان منخفضة خطأً)
    // spot مضبوط على قراءة الميزان المنخفضة (الزئبق قرب القاع) وهي موضع الخطأ.
    {
      type: "find-error",
      objective: "4Cs4: يلاحظ كيف يتغيّر الماء إلى بخار عند تسخينه وعند التبريد يعود ماءً",
      level: "reasoning",
      prompt: "الماءُ يغلي، لكنّ قراءةَ ميزانِ الحرارةِ خاطئةٌ — اضغط على الخطأِ.",
      image: "images/غليان-الماء.png",
      fit: "width",
      bg: "#ffffff",
      spot: { x: 82, y: 74, r: 13 }
    }

  ],

  // العلوم/الأول — الوحدة الأولى، الدرس الأول: النباتات والحيوانات هي كائنات حيّة (كتاب التلميذ ص١٦–١٧)
  "g1s-1-1": [

    // ④ صواب وخطأ (الأسهل) — 1Bp2 معرفة
    {
      type: "true-false",
      objective: "1Bp2: يتعلّم أنّ النباتات والحيوانات هي كائنات حيّة",
      level: "knowledge",
      statement: "النَّباتاتُ والحَيَواناتُ كائِناتٌ حَيَّةٌ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bp1 معرفة
    {
      type: "mcq",
      objective: "1Bp1: يتعلّم أنّ هناك كائنات حيّة وأشياء غير حيّة",
      level: "knowledge",
      prompt: "أيُّ هذِهِ الأشياءِ غَيرُ حَيٍّ؟",
      options: ["الصَّخرَةُ", "الأرنَبُ", "النَّخلَةُ", "الفَراشَةُ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bp1 معرفة
    {
      type: "fill-blank",
      objective: "1Bp1: يتعلّم أنّ هناك كائنات حيّة وأشياء غير حيّة",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَةِ المُناسِبَةِ.",
      text: "الشَّمسُ {} لكِنَّها لا تَنمو، فهيَ شَيءٌ {}.",
      answers: ["حارَّةٌ", "غَيرُ حَيٍّ"],
      distractors: ["حَيَوانٌ", "نَبتَةٌ"]
    },

    // ⑤ تحديد الأجزاء — 1Bp2 تطبيق (النبتة كائن حيّ بين أشياء غير حيّة)
    {
      type: "hotspot",
      objective: "1Bp2: يتعلّم أنّ النباتات والحيوانات هي كائنات حيّة",
      level: "application",
      prompt: "اضغَطْ على الكائِنِ الحَيِّ في الصُّورَةِ.",
      image: "images/مشهد-كائنات-حية.png",
      fit: "width",
      bg: "#eef7ff",
      spot: { x: 51, y: 47, r: 22 }
    },

    // ⑦ التصنيف في مجموعات — 1Bp1 استدلال
    {
      type: "classify",
      objective: "1Bp1: يتعلّم أنّ هناك كائنات حيّة وأشياء غير حيّة",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ شَيءٍ إلى كائِنٍ حَيٍّ أو شَيءٍ غَيرِ حَيٍّ.",
      groups: [
        { name: "كائِنٌ حَيٌّ",   items: ["نَخلَةٌ", "عُصفورٌ", "سَمَكَةٌ"] },
        { name: "شَيءٌ غَيرُ حَيٍّ", items: ["صَخرَةٌ", "كُرسِيٌّ", "حافِلَةٌ"] }
      ]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bp1 استدلال
    {
      type: "exclude",
      objective: "1Bp1: يتعلّم أنّ هناك كائنات حيّة وأشياء غير حيّة",
      level: "reasoning",
      prompt: "أيُّها لا يَنتَمي؟",
      options: ["شَجَرَةٌ", "قِطَّةٌ", "حَجَرٌ", "طائِرٌ"],
      answer: 2,
      reason: "الحَجَرُ شَيءٌ غَيرُ حَيٍّ، والبَقِيَّةُ كائِناتٌ حَيَّةٌ"
    }

  ],

  // العلوم/الأول — الوحدة الأولى، الدرس الثاني: البيئات المحلّية (كتاب التلميذ ص١٨–١٩)
  "g1s-1-2": [

    // ④ صواب وخطأ (الأسهل) — 1Bp3 معرفة
    {
      type: "true-false",
      objective: "1Bp3: يستكشف الطرق التي تعيش فيها مختلف النباتات والحيوانات في البيئات المحلّية",
      level: "knowledge",
      statement: "تَحتاجُ جَميعُ الكائِناتِ الحَيَّةِ إلى مَكانٍ تَعيشُ فيهِ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bp3 معرفة
    {
      type: "mcq",
      objective: "1Bp3: يستكشف الطرق التي تعيش فيها مختلف النباتات والحيوانات في البيئات المحلّية",
      level: "knowledge",
      prompt: "ماذا تُوَفِّرُ البيئَةُ المَحَلِّيَّةُ للكائِنِ الحَيِّ؟",
      options: ["المَسكَنَ والطَّعامَ والماءَ", "الألعابَ", "المَلابِسَ", "السَّيّاراتِ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bp3 معرفة
    {
      type: "fill-blank",
      objective: "1Bp3: يستكشف الطرق التي تعيش فيها مختلف النباتات والحيوانات في البيئات المحلّية",
      level: "knowledge",
      prompt: "أكمِلْ ما تُوَفِّرُهُ البيئَةُ للكائِنِ الحَيِّ بسَحبِ الكَلِماتِ.",
      text: "تُوَفِّرُ البيئَةُ للكائِنِ الحَيِّ: {} و {} و {}.",
      answers: ["المَسكَنَ", "الطَّعامَ", "الماءَ"],
      distractors: ["اللَّعِبَ"]
    },

    // ② توصيل — 1Bp3 تطبيق (كلّ حيوان ومكان عيشه)
    {
      type: "matching",
      objective: "1Bp3: يستكشف الطرق التي تعيش فيها مختلف النباتات والحيوانات في البيئات المحلّية",
      level: "application",
      prompt: "صِلْ كُلَّ حَيَوانٍ بالمَكانِ الَّذي يَعيشُ فيهِ.",
      pairs: [
        { a: "السَّمَكَةُ", b: "الماءُ" },
        { a: "البومَةُ",   b: "الشَّجَرَةُ" },
        { a: "الأرنَبُ",   b: "الجُحرُ" },
        { a: "الجَمَلُ",   b: "الصَّحراءُ" }
      ]
    },

    // ⑦ التصنيف في مجموعات — 1Bp3 استدلال (حسب مكان العيش)
    {
      type: "classify",
      objective: "1Bp3: يستكشف الطرق التي تعيش فيها مختلف النباتات والحيوانات في البيئات المحلّية",
      level: "reasoning",
      prompt: "صَنِّفِ الحَيَواناتِ حَسَبَ المَكانِ الَّذي تَعيشُ فيهِ.",
      groups: [
        { name: "يَعيشُ في الماءِ",   items: ["سَمَكَةٌ", "دُلفينٌ", "سُلَحفاةٌ مائِيَّةٌ"] },
        { name: "يَعيشُ على اليابِسَةِ", items: ["جَمَلٌ", "أرنَبٌ", "ثَعلَبٌ"] }
      ]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bp3 استدلال
    {
      type: "exclude",
      objective: "1Bp3: يستكشف الطرق التي تعيش فيها مختلف النباتات والحيوانات في البيئات المحلّية",
      level: "reasoning",
      prompt: "أيُّها لا يَعيشُ في الماءِ؟",
      options: ["سَمَكَةٌ", "دُلفينٌ", "جَمَلٌ", "سُلَحفاةٌ مائِيَّةٌ"],
      answer: 2,
      reason: "الجَمَلُ يَعيشُ في الصَّحراءِ على اليابِسَةِ"
    }

  ],

  // العلوم/الأول — الوحدة الأولى، الدرس الثالث: صغير الإنسان وصغير الحيوان (كتاب التلميذ ص٢٠–٢١)
  "g1s-1-3": [

    // ④ صواب وخطأ (الأسهل) — 1Bh5 معرفة
    {
      type: "true-false",
      objective: "1Bh5: يعرف أنّ الإنسان والحيوان قادران على إنجاب الصغار الذين يكبرون ليصبحوا بالغين",
      level: "knowledge",
      statement: "يَكبُرُ صَغيرُ الإنسانِ ليُصبِحَ بالِغاً.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bh5 معرفة
    {
      type: "mcq",
      objective: "1Bh5: يعرف أنّ الإنسان والحيوان قادران على إنجاب الصغار الذين يكبرون ليصبحوا بالغين",
      level: "knowledge",
      prompt: "ماذا يُسَمّى صَغيرُ الأسَدِ؟",
      options: ["الشِّبلُ", "الحَمَلُ", "العِجلُ", "الجَحشُ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bh5 معرفة
    {
      type: "fill-blank",
      objective: "1Bh5: يعرف أنّ الإنسان والحيوان قادران على إنجاب الصغار الذين يكبرون ليصبحوا بالغين",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَتَينِ بسَحبِ الكَلِمَةِ المُناسِبَةِ.",
      text: "تُنجِبُ الأمُّ عِندَ الإنسانِ عادَةً {} واحِداً، وبَعضُ الحَيَواناتِ تُنجِبُ {} مِنَ الصِّغارِ.",
      answers: ["طِفلاً", "العَديدَ"],
      distractors: ["بَيتاً"]
    },

    // ② توصيل — 1Bh5 تطبيق (كلّ حيوان بصغيره)
    {
      type: "matching",
      objective: "1Bh5: يعرف أنّ الإنسان والحيوان قادران على إنجاب الصغار الذين يكبرون ليصبحوا بالغين",
      level: "application",
      prompt: "صِلْ كُلَّ حَيَوانٍ بصَغيرِهِ.",
      pairs: [
        { a: "الأسَدُ",    b: "الشِّبلُ" },
        { a: "الدَّجاجَةُ", b: "الكَتكوتُ" },
        { a: "الضِّفدَعُ",  b: "الشَّرغوفُ" },
        { a: "القِطَّةُ",   b: "الهُرَيرَةُ" }
      ]
    },

    // ⑥ الترتيب التسلسلي — 1Bh5 استدلال (مراحل النموّ)
    {
      type: "sequence",
      objective: "1Bh5: يعرف أنّ الإنسان والحيوان قادران على إنجاب الصغار الذين يكبرون ليصبحوا بالغين",
      level: "reasoning",
      prompt: "رَتِّبْ مَراحِلَ نُمُوِّ الإنسانِ مِنَ الأصغَرِ إلى الأكبَرِ.",
      steps: ["رَضيعٌ", "طِفلٌ", "شابٌّ", "بالِغٌ"]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bh5 استدلال (الصغير الذي لا يشبه أباه)
    {
      type: "exclude",
      objective: "1Bh5: يعرف أنّ الإنسان والحيوان قادران على إنجاب الصغار الذين يكبرون ليصبحوا بالغين",
      level: "reasoning",
      prompt: "أيُّ صَغيرٍ لا يُشبِهُ أباهُ كَثيراً؟",
      options: ["الشِّبلُ", "الكَتكوتُ", "الشَّرغوفُ", "الهُرَيرَةُ"],
      answer: 2,
      reason: "الشَّرغوفُ لا يُشبِهُ الضِّفدَعَ، ثُمَّ يَتَغَيَّرُ شَكلُهُ حينَ يَكبُرُ"
    }

  ],

  // العلوم/الأول — الوحدة الأولى، الدرس الرابع: الطعام والشراب الصحّي (كتاب التلميذ ص٢٢–٢٣)
  "g1s-1-4": [

    // ④ صواب وخطأ (الأسهل) — 1Bh3 معرفة
    {
      type: "true-false",
      objective: "1Bh3: يعرف حاجة الإنسان للغذاء الصحّي، بما في ذلك أنواع الطعام والماء المناسبين",
      level: "knowledge",
      statement: "شُربُ الكَثيرِ مِنَ الماءِ أمرٌ صِحّيٌّ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bh3 معرفة
    {
      type: "mcq",
      objective: "1Bh3: يعرف حاجة الإنسان للغذاء الصحّي، بما في ذلك أنواع الطعام والماء المناسبين",
      level: "knowledge",
      prompt: "أيُّ هذِهِ الأطعِمَةِ صِحّيٌّ؟",
      options: ["التُّفّاحُ", "الشّوكولاتَةُ", "الحَلوى", "المَشروبُ الغازِيُّ"],
      answer: 0
    },

    // ② توصيل — 1Bh3 معرفة (كلّ مجموعة بمثالها)
    {
      type: "matching",
      objective: "1Bh3: يعرف حاجة الإنسان للغذاء الصحّي، بما في ذلك أنواع الطعام والماء المناسبين",
      level: "knowledge",
      prompt: "صِلْ كُلَّ نَوعٍ بمِثالِهِ.",
      pairs: [
        { a: "فاكِهَةٌ",          b: "تُفّاحَةٌ" },
        { a: "خُضارٌ",           b: "جَزَرَةٌ" },
        { a: "شَرابٌ صِحّيٌّ",    b: "ماءٌ" },
        { a: "طَعامٌ غَيرُ صِحّيٍّ", b: "حَلوى" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 1Bh3 تطبيق
    {
      type: "fill-blank",
      objective: "1Bh3: يعرف حاجة الإنسان للغذاء الصحّي، بما في ذلك أنواع الطعام والماء المناسبين",
      level: "application",
      prompt: "أكمِلْ ما آكُلُهُ لأنمُوَ بصِحَّةٍ بسَحبِ الكَلِماتِ.",
      text: "لأنمُوَ بصِحَّةٍ آكُلُ {} و {}، وأشرَبُ الكَثيرَ مِنَ {}.",
      answers: ["الفَواكِهَ", "الخُضارَ", "الماءِ"],
      distractors: ["الحَلوى", "الشّوكولاتَةِ"]
    },

    // ⑦ التصنيف في مجموعات — 1Bh3 استدلال (صحّي / غير صحّي)
    {
      type: "classify",
      objective: "1Bh3: يعرف حاجة الإنسان للغذاء الصحّي، بما في ذلك أنواع الطعام والماء المناسبين",
      level: "reasoning",
      prompt: "صَنِّفِ الأطعِمَةَ والمَشروباتِ إلى صِحّيٍّ وغَيرِ صِحّيٍّ.",
      groups: [
        { name: "صِحّيٌّ",     items: ["تُفّاحَةٌ", "خُضارٌ", "ماءٌ"] },
        { name: "غَيرُ صِحّيٍّ", items: ["شوكولاتَةٌ", "حَلوى", "مَشروبٌ غازِيٌّ"] }
      ]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bh3 استدلال
    {
      type: "exclude",
      objective: "1Bh3: يعرف حاجة الإنسان للغذاء الصحّي، بما في ذلك أنواع الطعام والماء المناسبين",
      level: "reasoning",
      prompt: "أيُّها لَيسَ طَعاماً صِحّيّاً؟",
      options: ["تُفّاحَةٌ", "جَزَرَةٌ", "موزَةٌ", "شوكولاتَةٌ"],
      answer: 3,
      reason: "الشّوكولاتَةُ فيها كَثيرٌ مِنَ السُّكَّرِيّاتِ، فهيَ غَيرُ صِحّيَّةٍ"
    }

  ],

  // العلوم/الأول — الوحدة الثانية، الدرس الأول: أجزاء النبات (كتاب التلميذ ص٢٦–٢٧)
  "g1s-2-1": [

    // ④ صواب وخطأ (الأسهل) — 1Bp4 معرفة
    {
      type: "true-false",
      objective: "1Bp4: يسمّي الأجزاء الرئيسية في النباتات",
      level: "knowledge",
      statement: "لِلنَّباتِ جُذورٌ وساقٌ وأوراقٌ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bp4 معرفة
    {
      type: "mcq",
      objective: "1Bp4: يسمّي الأجزاء الرئيسية في النباتات",
      level: "knowledge",
      prompt: "أيُّ أجزاءِ النَّباتِ يَنمو تَحتَ التُّرابِ؟",
      options: ["الجُذورُ", "الزَّهرَةُ", "الساقُ", "الثَّمَرَةُ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bp4 معرفة
    {
      type: "fill-blank",
      objective: "1Bp4: يسمّي الأجزاء الرئيسية في النباتات",
      level: "knowledge",
      prompt: "أكمِلْ أجزاءَ النَّباتِ بسَحبِ الكَلِماتِ.",
      text: "لِلنَّباتِ {} و {} و {}.",
      answers: ["جُذورٌ", "ساقٌ", "أوراقٌ"],
      distractors: ["حَجَرٌ"]
    },

    // ① سحب وإفلات — 1Bp4 تطبيق (تسمية أجزاء النبتة على صورة نبتة-اجزاء.png)
    {
      type: "drag-drop",
      objective: "1Bp4: يسمّي الأجزاء الرئيسية في النباتات",
      level: "application",
      prompt: "اسحَبِ اسمَ كُلِّ جُزءٍ إلى مَكانِهِ في النَّبتَةِ.",
      bg: "#eef7ff",
      image: "images/نبتة-اجزاء.png",
      targets: [
        { answer: "الزَّهرَةُ", box:{x:80,y:8},  dot:{x:47,y:12} },
        { answer: "الثَّمَرَةُ", box:{x:84,y:50}, dot:{x:71,y:49} },
        { answer: "الوَرَقَةُ", box:{x:16,y:36}, dot:{x:22,y:42} },
        { answer: "الساقُ",    box:{x:16,y:70}, dot:{x:47,y:62} },
        { answer: "الجُذورُ",  box:{x:82,y:90}, dot:{x:48,y:84} }
      ]
    },

    // ⑥ الترتيب التسلسلي — 1Bp4 استدلال (ترتيب الأجزاء من الأسفل إلى الأعلى)
    {
      type: "sequence",
      objective: "1Bp4: يسمّي الأجزاء الرئيسية في النباتات",
      level: "reasoning",
      prompt: "رَتِّبْ أجزاءَ النَّباتِ مِنَ الأسفَلِ إلى الأعلى.",
      steps: ["الجُذورُ", "الساقُ", "الوَرَقَةُ", "الزَّهرَةُ"]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bp4 استدلال
    {
      type: "exclude",
      objective: "1Bp4: يسمّي الأجزاء الرئيسية في النباتات",
      level: "reasoning",
      prompt: "أيُّها لَيسَ جُزءاً مِنَ النَّباتِ؟",
      options: ["الجُذورُ", "الساقُ", "الحَجَرُ", "الوَرَقَةُ"],
      answer: 2,
      reason: "الحَجَرُ شَيءٌ غَيرُ حَيٍّ ولَيسَ جُزءاً مِنَ النَّباتِ"
    }

  ],

  // العلوم/الأول — الوحدة الثانية، الدرس الثاني: زراعة البذور (كتاب التلميذ ص٢٨–٢٩)
  "g1s-2-2": [

    // ④ صواب وخطأ (الأسهل) — 1Bp5 معرفة
    {
      type: "true-false",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "knowledge",
      statement: "تَحتاجُ البُذورُ إلى الماءِ لِتَنمو.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bp6 معرفة
    {
      type: "mcq",
      objective: "1Bp6: يكتشف الطرق التي تنمو فيها البذور لتصبح نبتة مزهرة",
      level: "knowledge",
      prompt: "ماذا تُصبِحُ البَذرَةُ عِندَما تَنمو؟",
      options: ["نَبتَةً", "حَجَراً", "ماءً", "تُراباً"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bp6 معرفة (ينمو الجذر أولاً)
    {
      type: "fill-blank",
      objective: "1Bp6: يكتشف الطرق التي تنمو فيها البذور لتصبح نبتة مزهرة",
      level: "knowledge",
      prompt: "أكمِلْ تَرتيبَ نُمُوِّ البَذرَةِ بسَحبِ الكَلِماتِ.",
      text: "يَنمو {} أوَّلاً، ثُمَّ تَنمو {} والأوراقُ.",
      answers: ["الجَذرُ", "الساقُ"],
      distractors: ["الزَّهرَةُ"]
    },

    // ⑤ تحديد الأجزاء — 1Bp6 تطبيق (اختيار البذرة التي نمت وأصبحت نبتة على مخطّط SVG)
    {
      type: "hotspot",
      objective: "1Bp6: يكتشف الطرق التي تنمو فيها البذور لتصبح نبتة مزهرة",
      level: "application",
      prompt: "اضغَطْ على البَذرَةِ الَّتي نَمَت وأصبَحَت نَبتَةً.",
      fit: "width",
      bg: "#eaf3fb",
      spot: { x: 83, y: 40, r: 14 },
      svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مراحل نمو البذرة">
        <rect x="0" y="112" width="360" height="108" fill="#c8935e"/>
        <rect x="0" y="112" width="360" height="9" fill="#a9743f"/>
        <ellipse cx="60" cy="150" rx="15" ry="10" fill="#e6c15a" stroke="#b9922f" stroke-width="2.5" transform="rotate(20 60 150)"/>
        <g transform="translate(180 0)">
          <ellipse cx="0" cy="146" rx="14" ry="9" fill="#e6c15a" stroke="#b9922f" stroke-width="2.5"/>
          <path d="M0 152 Q-6 176 -14 196" fill="none" stroke="#d9d2b0" stroke-width="4" stroke-linecap="round"/>
          <path d="M0 152 Q4 172 10 190" fill="none" stroke="#d9d2b0" stroke-width="4" stroke-linecap="round"/>
        </g>
        <g transform="translate(300 0)">
          <line x1="0" y1="118" x2="0" y2="52" stroke="#4e9d42" stroke-width="7" stroke-linecap="round"/>
          <path d="M0 78 Q-26 70 -40 74 Q-26 90 0 78 Z" fill="#63c154" stroke="#3c8a34" stroke-width="2.5"/>
          <path d="M0 64 Q26 56 40 60 Q26 76 0 64 Z" fill="#63c154" stroke="#3c8a34" stroke-width="2.5"/>
          <path d="M0 120 Q-8 150 -16 190" fill="none" stroke="#d9d2b0" stroke-width="4" stroke-linecap="round"/>
          <path d="M0 120 Q6 150 12 192" fill="none" stroke="#d9d2b0" stroke-width="4" stroke-linecap="round"/>
        </g>
      </svg>`
    },

    // ⑥ الترتيب التسلسلي — 1Bp6 استدلال (مراحل نمو البذرة)
    {
      type: "sequence",
      objective: "1Bp6: يكتشف الطرق التي تنمو فيها البذور لتصبح نبتة مزهرة",
      level: "reasoning",
      prompt: "رَتِّبْ مَراحِلَ نُمُوِّ البَذرَةِ مِنَ البِدايَةِ إلى النِّهايَةِ.",
      steps: ["بَذرَةٌ في التُّرابِ", "يَنمو الجَذرُ", "تَنمو الساقُ والأوراقُ", "نَبتَةٌ كامِلَةٌ"]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bp5 استدلال
    {
      type: "exclude",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "reasoning",
      prompt: "أيُّها لا تَحتاجُهُ البَذرَةُ لِتَنمو؟",
      options: ["الماءُ", "التُّرابُ", "الضَّوءُ", "الحِذاءُ"],
      answer: 3,
      reason: "الحِذاءُ لا عَلاقَةَ لَهُ بنُمُوِّ البَذرَةِ"
    }

  ],

  // العلوم/الأول — الوحدة الثانية، الدرس الثالث: النبات والضوء (كتاب التلميذ ص٣٠–٣١)
  "g1s-2-3": [

    // ④ صواب وخطأ (الأسهل) — 1Bp5 معرفة
    {
      type: "true-false",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "knowledge",
      statement: "تَحتاجُ النَّباتاتُ إلى الضَّوءِ لِتَنمو.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bp5 معرفة
    {
      type: "mcq",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "knowledge",
      prompt: "إلى أيِّ جِهَةٍ تَنمو النَّباتاتُ؟",
      options: ["باتِّجاهِ الضَّوءِ", "بَعيداً عَنِ الضَّوءِ", "نَحوَ الأرضِ", "نَحوَ الظَّلامِ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bp5 معرفة
    {
      type: "fill-blank",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَةِ المُناسِبَةِ.",
      text: "تَنحَني النَّباتاتُ وتَنمو باتِّجاهِ {}.",
      answers: ["الضَّوءِ"],
      distractors: ["الظَّلامِ", "الأرضِ"]
    },

    // ⑤ تحديد الأجزاء — 1Bp5 تطبيق (اختيار النبتة التي تنمو أفضل على مخطّط تجربة SVG)
    {
      type: "hotspot",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "application",
      prompt: "نَبتَةٌ في الضَّوءِ وأُخرى داخِلَ صُندوقٍ مُظلِمٍ. اضغَطْ على النَّبتَةِ الَّتي سَتَنمو أفضَلَ.",
      fit: "width",
      bg: "#eaf3fb",
      spot: { x: 22, y: 55, r: 15 },
      svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="تجربة النبات والضوء">
        <g fill="#f7d64a">
          <circle cx="70" cy="42" r="26"/>
          <g stroke="#f7d64a" stroke-width="5" stroke-linecap="round">
            <line x1="70" y1="4" x2="70" y2="14"/>
            <line x1="70" y1="70" x2="70" y2="80"/>
            <line x1="32" y1="42" x2="42" y2="42"/>
            <line x1="98" y1="42" x2="108" y2="42"/>
            <line x1="43" y1="15" x2="50" y2="22"/>
            <line x1="90" y1="62" x2="97" y2="69"/>
            <line x1="43" y1="69" x2="50" y2="62"/>
            <line x1="90" y1="22" x2="97" y2="15"/>
          </g>
        </g>
        <rect x="20" y="150" width="120" height="30" rx="6" fill="#c8935e"/>
        <path d="M40 150 l40 -34 l40 34 Z" fill="none"/>
        <line x1="80" y1="150" x2="80" y2="96" stroke="#4e9d42" stroke-width="8" stroke-linecap="round"/>
        <path d="M80 120 Q52 112 38 116 Q52 132 80 120 Z" fill="#63c154" stroke="#3c8a34" stroke-width="2.5"/>
        <path d="M80 104 Q108 96 122 100 Q108 116 80 104 Z" fill="#63c154" stroke="#3c8a34" stroke-width="2.5"/>
        <rect x="235" y="70" width="110" height="110" rx="8" fill="#a9743f" stroke="#7c4a22" stroke-width="4"/>
        <path d="M235 70 l55 -22 l110 0 l-55 22 Z" fill="#c8935e" stroke="#7c4a22" stroke-width="4"/>
        <path d="M345 70 l55 -22 l0 110 l-55 22 Z" fill="#9c692f" stroke="#7c4a22" stroke-width="4"/>
        <text x="290" y="135" font-size="30" text-anchor="middle" fill="#f3e2c6" font-family="Tajawal, Dubai, sans-serif">؟</text>
      </svg>`
    },

    // ⑦ التصنيف في مجموعات — 1Bp5 استدلال (أماكن مضيئة / مظلمة)
    {
      type: "classify",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "reasoning",
      prompt: "صَنِّفِ الأماكِنَ: مُضيئَةٌ تَنمو فيها النَّباتاتُ أم مُظلِمَةٌ لا تَنمو فيها جَيِّداً.",
      groups: [
        { name: "مَكانٌ مُضيءٌ",  items: ["قُربَ النافِذَةِ", "في الحَديقَةِ", "تَحتَ الشَّمسِ"] },
        { name: "مَكانٌ مُظلِمٌ", items: ["داخِلَ صُندوقٍ", "في خِزانَةٍ مُغلَقَةٍ"] }
      ]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bp5 استدلال
    {
      type: "exclude",
      objective: "1Bp5: يعرف أنّ النباتات تحتاج إلى الضوء والماء لتنمو",
      level: "reasoning",
      prompt: "أيُّها لا يُعطي النَّبتَةَ ضَوءاً؟",
      options: ["الشَّمسُ", "المِصباحُ", "النافِذَةُ المُضيئَةُ", "الصُّندوقُ المُغلَقُ"],
      answer: 3,
      reason: "الصُّندوقُ المُغلَقُ يَحجُبُ الضَّوءَ عَنِ النَّبتَةِ"
    }

  ],

  // العلوم/الأول — الوحدة الثالثة، الدرس الأول: نحن متشابهون (كتاب التلميذ ص٣٤–٣٥)
  "g1s-3-1": [

    // ③ اختيار من متعدد (الأسهل) — 1Bh1 معرفة
    {
      type: "mcq",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "knowledge",
      prompt: "جَميعُ الأطفالِ يَحتاجونَ أنْ...",
      options: ["يَأكُلوا", "يَطيروا", "يَسبَحوا كالسَّمَكِ", "يَناموا في المَدرَسَةِ"],
      answer: 0
    },

    // ④ صواب وخطأ — 1Bh1 معرفة
    {
      type: "true-false",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "knowledge",
      statement: "نَحنُ مُتَشابِهونَ في الكَثيرِ مِنَ الأشياءِ.",
      answer: true
    },

    // ⑧ ملء الفراغ بالسحب — 1Bh1 معرفة
    {
      type: "fill-blank",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِماتِ المُناسِبَةِ.",
      text: "جَميعُنا يُحِبُّ {}، وجَميعُنا يَحتاجُ إلى {}.",
      answers: ["اللَّعِبَ", "الطَّعامِ"],
      distractors: ["البُكاءَ"]
    },

    // ② توصيل — 1Bh1 تطبيق (ما يشترك فيه الجميع من مشاعر وأفعال)
    {
      type: "matching",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "application",
      prompt: "صِلْ كُلَّ شُعورٍ بِما نَفعَلُهُ جَميعاً.",
      pairs: [
        { a: "نَشعُرُ بالجوعِ",  b: "نَأكُلُ" },
        { a: "نَشعُرُ بالعَطَشِ", b: "نَشرَبُ" },
        { a: "نُريدُ المَرَحَ",   b: "نَلعَبُ" },
        { a: "نَشعُرُ بالتَّعَبِ", b: "نَنامُ" }
      ]
    },

    // ⑦ التصنيف في مجموعات — 1Bh1 استدلال (حاجات مشتركة / أشياء يحبّها بعضنا)
    {
      type: "classify",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "reasoning",
      prompt: "صَنِّفْ: ما يَحتاجُهُ كُلُّ الأطفالِ، وما يُحِبُّهُ بَعضُهُم فَقَط.",
      groups: [
        { name: "يَحتاجُهُ كُلُّ الأطفالِ",   items: ["الطَّعامُ", "الماءُ", "النَّومُ"] },
        { name: "يُحِبُّهُ بَعضُ الأطفالِ فَقَط", items: ["كُرَةُ القَدَمِ", "الرَّسمُ", "القِصَصُ"] }
      ]
    },

    // ⑪ الخريطة الذهنية الناقصة (إثرائي) — 1Bh1 تطبيق
    {
      type: "mindmap",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "application",
      prompt: "أكمِلْ خَريطَةَ التَّشابُهِ بَينَنا بسَحبِ الكَلِمَةِ المُناسِبَةِ إلى كُلِّ فَرعٍ.",
      center: "جَميعُنا",
      branches: [
        { label: "نُحِبُّ",       answer: "اللَّعِبَ" },
        { label: "نَحتاجُ إلى",   answer: "الطَّعامِ" },
        { label: "نَشرَبُ",       answer: "الماءَ" }
      ],
      distractors: ["الحَجَرَ"]
    }

  ],

  // العلوم/الأول — الوحدة الثالثة، الدرس الثاني: نحن مختلفون (كتاب التلميذ ص٣٦–٣٧)
  "g1s-3-2": [

    // ④ صواب وخطأ (الأسهل) — 1Bh1 معرفة
    {
      type: "true-false",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "knowledge",
      statement: "التَّلاميذُ مُختَلِفونَ قَليلاً بَعضُهُم عَن بَعضٍ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bh1 معرفة
    {
      type: "mcq",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "knowledge",
      prompt: "فيمَ يَختَلِفُ الأطفالُ بَعضُهُم عَن بَعضٍ؟",
      options: ["في لَونِ الشَّعرِ والطُّولِ", "في عَدَدِ العُيونِ", "في عَدَدِ الأيدي", "في حاجَتِهِم إلى الطَّعامِ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bh1 معرفة
    {
      type: "fill-blank",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِماتِ الَّتي نَختَلِفُ فيها.",
      text: "نَختَلِفُ في لَونِ {} وفي {} الجِسمِ.",
      answers: ["الشَّعرِ", "طولِ"],
      distractors: ["الطَّعامِ"]
    },

    // ⑤ تحديد الأجزاء — 1Bh1 تطبيق (اختيار الطفل صاحب الشعر الداكن على مخطّط SVG)
    {
      type: "hotspot",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "application",
      prompt: "اضغَطْ على الطِّفلِ صاحِبِ الشَّعرِ الداكِنِ.",
      fit: "width",
      bg: "#eef7ff",
      spot: { x: 82, y: 45, r: 15 },
      svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاثة أطفال مختلفون">
        <g>
          <circle cx="60" cy="90" r="34" fill="#f6c9a0" stroke="#d89b6a" stroke-width="3"/>
          <path d="M28 82 Q60 40 92 82 Q92 60 60 52 Q28 60 28 82 Z" fill="#e8b23a" stroke="#c7911f" stroke-width="2.5"/>
          <circle cx="49" cy="90" r="4" fill="#3b2a1a"/><circle cx="71" cy="90" r="4" fill="#3b2a1a"/>
          <path d="M50 106 Q60 114 70 106" fill="none" stroke="#7c4a22" stroke-width="3" stroke-linecap="round"/>
          <rect x="36" y="130" width="48" height="60" rx="14" fill="#e0574c"/>
        </g>
        <g>
          <circle cx="180" cy="90" r="34" fill="#e7b48a" stroke="#c98e5c" stroke-width="3"/>
          <path d="M148 84 Q180 44 212 84 Q214 62 180 54 Q146 62 148 84 Z" fill="#9b6a3c" stroke="#794f2a" stroke-width="2.5"/>
          <circle cx="169" cy="90" r="4" fill="#3b2a1a"/><circle cx="191" cy="90" r="4" fill="#3b2a1a"/>
          <path d="M170 106 Q180 114 190 106" fill="none" stroke="#7c4a22" stroke-width="3" stroke-linecap="round"/>
          <rect x="156" y="130" width="48" height="60" rx="14" fill="#4e9d42"/>
        </g>
        <g>
          <circle cx="300" cy="90" r="34" fill="#f3d3b3" stroke="#d3ab86" stroke-width="3"/>
          <path d="M266 86 Q300 40 334 86 Q336 58 300 50 Q262 58 266 86 Z" fill="#2f2622" stroke="#15100d" stroke-width="2.5"/>
          <circle cx="289" cy="90" r="4" fill="#3b2a1a"/><circle cx="311" cy="90" r="4" fill="#3b2a1a"/>
          <path d="M290 106 Q300 114 310 106" fill="none" stroke="#7c4a22" stroke-width="3" stroke-linecap="round"/>
          <rect x="276" y="130" width="48" height="60" rx="14" fill="#2f6fb0"/>
        </g>
      </svg>`
    },

    // ⑦ التصنيف في مجموعات — 1Bh1 استدلال (نتشابه فيه / نختلف فيه)
    {
      type: "classify",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "reasoning",
      prompt: "صَنِّفْ: أشياءُ نَتَشابَهُ فيها، وأشياءُ نَختَلِفُ فيها.",
      groups: [
        { name: "نَتَشابَهُ فيهِ", items: ["نَحتاجُ إلى الطَّعامِ", "نَنمو ونَكبُرُ", "نُحِبُّ اللَّعِبَ"] },
        { name: "نَختَلِفُ فيهِ",  items: ["لَونُ الشَّعرِ", "الطُّولُ", "لَونُ البَشَرَةِ"] }
      ]
    },

    // ⑨ الاستبعاد (إثرائي) — 1Bh1 استدلال
    {
      type: "exclude",
      objective: "1Bh1: يتعرّف أوجه التشابه والاختلاف بيننا",
      level: "reasoning",
      prompt: "أيُّ شَيءٍ لا نَختَلِفُ فيهِ؟",
      options: ["لَونُ الشَّعرِ", "الطُّولُ", "الحاجَةُ إلى الطَّعامِ", "لَونُ البَشَرَةِ"],
      answer: 2,
      reason: "الحاجَةُ إلى الطَّعامِ يَتَشابَهُ فيها كُلُّ النّاسِ ولا نَختَلِفُ فيها"
    }

  ],

  // العلوم/الأول — الوحدة الثالثة، الدرس الثالث: أجسامنا (كتاب التلميذ ص٣٨–٣٩)
  "g1s-3-3": [

    // ④ صواب وخطأ (الأسهل) — 1Bh2 معرفة
    {
      type: "true-false",
      objective: "1Bh2: يسمّي الأجزاء الرئيسية في الجسم ويحدّد مواضعها",
      level: "knowledge",
      statement: "نُمسِكُ الأشياءَ بِأصابِعِ اليَدِ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bh2 معرفة
    {
      type: "mcq",
      objective: "1Bh2: يسمّي الأجزاء الرئيسية في الجسم ويحدّد مواضعها",
      level: "knowledge",
      prompt: "أينَ تُوجَدُ العَينُ والأنفُ والفَمُ؟",
      options: ["في الرَّأسِ", "في القَدَمِ", "في الرُّكبَةِ", "في الكَتِفِ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 1Bh2 معرفة
    {
      type: "fill-blank",
      objective: "1Bh2: يسمّي الأجزاء الرئيسية في الجسم ويحدّد مواضعها",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "نَمشي على {}، ونَنظُرُ بِـ {}.",
      answers: ["القَدَمَينِ", "العَينَينِ"],
      distractors: ["الأذُنَينِ"]
    },

    // ① سحب وإفلات — 1Bh2 تطبيق (تسمية أجزاء الجسم على مخطّط SVG)
    {
      type: "drag-drop",
      objective: "1Bh2: يسمّي الأجزاء الرئيسية في الجسم ويحدّد مواضعها",
      level: "application",
      prompt: "اسحَبِ اسمَ كُلِّ جُزءٍ إلى مَكانِهِ في الجِسمِ.",
      bg: "#eef7ff",
      targets: [
        { answer: "الرَّأسُ",  box:{x:82,y:8},  dot:{x:50,y:13} },
        { answer: "الذِّراعُ", box:{x:16,y:32}, dot:{x:33,y:37} },
        { answer: "اليَدُ",    box:{x:16,y:52}, dot:{x:28,y:51} },
        { answer: "الساقُ",    box:{x:84,y:70}, dot:{x:59,y:74} },
        { answer: "القَدَمُ",  box:{x:84,y:90}, dot:{x:57,y:94} }
      ],
      svg: `<svg viewBox="0 0 300 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مخطّط جسم طفل">
        <circle cx="150" cy="62" r="40" fill="#f6c9a0" stroke="#d89b6a" stroke-width="3"/>
        <path d="M110 55 Q150 8 190 55 Q192 30 150 22 Q108 30 110 55 Z" fill="#3a2a1c"/>
        <circle cx="137" cy="60" r="4.5" fill="#3b2a1a"/><circle cx="163" cy="60" r="4.5" fill="#3b2a1a"/>
        <path d="M150 66 L150 74" stroke="#c98e5c" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M138 82 Q150 92 162 82" stroke="#b5533f" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="140" y="98" width="20" height="16" fill="#f6c9a0"/>
        <path d="M118 116 Q150 108 182 116 L176 250 L124 250 Z" fill="#e0574c" stroke="#b8402f" stroke-width="2"/>
        <path d="M120 120 Q92 172 84 232" fill="none" stroke="#f6c9a0" stroke-width="16" stroke-linecap="round"/>
        <path d="M180 120 Q208 172 216 232" fill="none" stroke="#f6c9a0" stroke-width="16" stroke-linecap="round"/>
        <circle cx="84" cy="238" r="12" fill="#f6c9a0" stroke="#d89b6a" stroke-width="2"/>
        <circle cx="216" cy="238" r="12" fill="#f6c9a0" stroke="#d89b6a" stroke-width="2"/>
        <path d="M126 250 L120 430 L146 430 L150 300 L154 430 L180 430 L174 250 Z" fill="#2f6fb0" stroke="#22507f" stroke-width="2"/>
        <ellipse cx="128" cy="440" rx="20" ry="10" fill="#5a3a22"/>
        <ellipse cx="172" cy="440" rx="20" ry="10" fill="#5a3a22"/>
      </svg>`
    },

    // ⑦ التصنيف في مجموعات — 1Bh2 استدلال (أجزاء الرأس / أطراف الجسم)
    {
      type: "classify",
      objective: "1Bh2: يسمّي الأجزاء الرئيسية في الجسم ويحدّد مواضعها",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ جُزءٍ: هل هوَ في الرَّأسِ أم مِنَ الأطرافِ؟",
      groups: [
        { name: "في الرَّأسِ",  items: ["العَينُ", "الأنفُ", "الفَمُ", "الأذُنُ"] },
        { name: "مِنَ الأطرافِ", items: ["اليَدُ", "القَدَمُ", "الذِّراعُ", "الساقُ"] }
      ]
    },

    // ⑭ البازل (إثرائي) — 1Bh2 تطبيق (تركيب صورة جسم الطفل)
    {
      type: "puzzle",
      objective: "1Bh2: يسمّي الأجزاء الرئيسية في الجسم ويحدّد مواضعها",
      level: "application",
      prompt: "رَكِّبْ صورَةَ جِسمِ الطِّفلِ: اسحَبْ كُلَّ قِطعَةٍ إلى مَكانِها الصَّحيحِ.",
      image: "images/جسم-الطفل-بازل.png",
      bg: "#eef7ff",
      grid: { cols: 3, rows: 3 }
    }

  ],

  // العلوم/الأول — الوحدة الثالثة، الدرس الرابع: حواسّنا الرائعة (كتاب التلميذ ص٤٠–٤١)
  "g1s-3-4": [

    // ④ صواب وخطأ (الأسهل) — 1Bh3 معرفة
    {
      type: "true-false",
      objective: "1Bh3: يتعرّف الحواسّ الخمس وأعضاءها ووظائفها",
      level: "knowledge",
      statement: "نَستَخدِمُ العَينَ لِنَرى الأشياءَ.",
      answer: true
    },

    // ③ اختيار من متعدد — 1Bh3 معرفة
    {
      type: "mcq",
      objective: "1Bh3: يتعرّف الحواسّ الخمس وأعضاءها ووظائفها",
      level: "knowledge",
      prompt: "بأيِّ حاسَّةٍ نَعرِفُ طَعمَ الطَّعامِ؟",
      options: ["التَّذَوُّقُ", "السَّمعُ", "البَصَرُ", "الشَّمُّ"],
      answer: 0
    },

    // ② توصيل — 1Bh3 معرفة (كلّ عضو بحاسّته)
    {
      type: "matching",
      objective: "1Bh3: يتعرّف الحواسّ الخمس وأعضاءها ووظائفها",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عُضوٍ بالحاسَّةِ الَّتي نَستَخدِمُهُ فيها.",
      pairs: [
        { a: "العَينُ",   b: "البَصَرُ" },
        { a: "الأذُنُ",   b: "السَّمعُ" },
        { a: "الأنفُ",    b: "الشَّمُّ" },
        { a: "اللِّسانُ", b: "التَّذَوُّقُ" },
        { a: "الجِلدُ",   b: "اللَّمسُ" }
      ]
    },

    // ⑤ تحديد الأجزاء — 1Bh3 تطبيق (اختيار عضو الشمّ على مخطّط وجه SVG)
    {
      type: "hotspot",
      objective: "1Bh3: يتعرّف الحواسّ الخمس وأعضاءها ووظائفها",
      level: "application",
      prompt: "اضغَطْ على العُضوِ الَّذي نَشُمُّ بِهِ الرَّوائِحَ.",
      bg: "#eef7ff",
      spot: { x: 50, y: 55, r: 9 },
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مخطّط وجه">
        <ellipse cx="52" cy="152" rx="16" ry="26" fill="#f1b98f" stroke="#d89b6a" stroke-width="3"/>
        <ellipse cx="248" cy="152" rx="16" ry="26" fill="#f1b98f" stroke="#d89b6a" stroke-width="3"/>
        <circle cx="150" cy="152" r="108" fill="#f6c9a0" stroke="#d89b6a" stroke-width="3"/>
        <path d="M60 92 Q150 10 240 92 Q244 40 150 30 Q56 40 60 92 Z" fill="#3a2a1c"/>
        <circle cx="115" cy="132" r="11" fill="#ffffff" stroke="#c98e5c" stroke-width="2"/><circle cx="115" cy="132" r="5" fill="#3b2a1a"/>
        <circle cx="185" cy="132" r="11" fill="#ffffff" stroke="#c98e5c" stroke-width="2"/><circle cx="185" cy="132" r="5" fill="#3b2a1a"/>
        <path d="M150 150 Q141 176 150 184 Q159 182 156 173" fill="none" stroke="#c98e5c" stroke-width="4" stroke-linecap="round"/>
        <path d="M124 216 Q150 236 176 216" fill="none" stroke="#b5533f" stroke-width="4" stroke-linecap="round"/>
      </svg>`
    },

    // ⑦ التصنيف في مجموعات — 1Bh3 استدلال (بأيّ حاسّة نعرف كلّ شيء)
    {
      type: "classify",
      objective: "1Bh3: يتعرّف الحواسّ الخمس وأعضاءها ووظائفها",
      level: "reasoning",
      prompt: "صَنِّفْ: هل نَعرِفُ هذا الشَّيءَ بالعَينِ أم بالأذُنِ؟",
      groups: [
        { name: "نَعرِفُهُ بالعَينِ (البَصَرِ)", items: ["ألوانُ الزَّهرَةِ", "ضَوءُ الشَّمسِ", "شَكلُ الكِتابِ"] },
        { name: "نَعرِفُهُ بالأذُنِ (السَّمعِ)", items: ["صَوتُ الطَّائِرِ", "رَنينُ الجَرَسِ", "قَرعُ الطَّبلِ"] }
      ]
    },

    // ⑪ السؤال الصوتي (إثرائي) — 1Bh3 معرفة (استخدام حاسّة السمع)
    {
      type: "audio-q",
      objective: "1Bh3: يتعرّف الحواسّ الخمس وأعضاءها ووظائفها",
      level: "knowledge",
      prompt: "استَخدِمْ حاسَّةَ السَّمعِ: استَمِعْ إلى الصَّوتِ، ثُمَّ اختَرِ الحَيَوانَ الَّذي أصدَرَهُ.",
      sound: "audio/sound-bird.wav",
      options: [
        { image: "images/حيوان-طائر.png", label: "طائر" },
        { image: "images/حيوان-قطة.png",  label: "قطة" },
        { image: "images/حيوان-ضفدع.png", label: "ضفدع" }
      ],
      answer: 0
    }

  ],

  // العلوم/الثاني — الوحدة الأولى، الدرس الأول: أماكن مختلفة للعيش (كتاب التلميذ ص١٦–١٧)
  "g2s-1-1": [

    // ④ صواب وخطأ (الأسهل) — 2Be1 معرفة
    {
      type: "true-false",
      objective: "2Be1: يحدّد أوجه التشابه والاختلاف بين البيئات المحلّية وتأثيرها على ما يعيش فيها",
      level: "knowledge",
      statement: "تَعيشُ الحَيَواناتُ والنَّباتاتُ المُختَلِفَةُ في بيئاتٍ مُختَلِفَةٍ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Be1 معرفة
    {
      type: "mcq",
      objective: "2Be1: يحدّد أوجه التشابه والاختلاف بين البيئات المحلّية وتأثيرها على ما يعيش فيها",
      level: "knowledge",
      prompt: "أيُّ الحَيَواناتِ يَعيشُ في الماءِ؟",
      options: ["السَّمَكَةُ", "الأسَدُ", "الجَمَلُ", "الغَزالُ"],
      answer: 0
    },

    // ② توصيل — 2Be1 معرفة (كلّ حيوان ومكان عيشه)
    {
      type: "matching",
      objective: "2Be1: يحدّد أوجه التشابه والاختلاف بين البيئات المحلّية وتأثيرها على ما يعيش فيها",
      level: "knowledge",
      prompt: "صِلْ كُلَّ حَيَوانٍ بالمَكانِ الَّذي يَعيشُ فيهِ.",
      pairs: [
        { a: "السَّمَكَةُ", b: "الماءُ" },
        { a: "الأسَدُ",    b: "السَّافانا" },
        { a: "البَطَّةُ",   b: "البِركَةُ" },
        { a: "الجَمَلُ",    b: "الصَّحراءُ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Be1 تطبيق (توظيف قاعدة ملاءمة الكائن لبيئته)
    {
      type: "fill-blank",
      objective: "2Be1: يحدّد أوجه التشابه والاختلاف بين البيئات المحلّية وتأثيرها على ما يعيش فيها",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "يَعيشُ السَّمَكُ في {} ، ويَعيشُ الجَمَلُ في {}.",
      answers: ["الماءِ", "الصَّحراءِ"],
      distractors: ["الثَّلجِ"]
    },

    // ⑦ التصنيف في مجموعات — 2Be1 استدلال (حسب مكان العيش)
    {
      type: "classify",
      objective: "2Be1: يحدّد أوجه التشابه والاختلاف بين البيئات المحلّية وتأثيرها على ما يعيش فيها",
      level: "reasoning",
      prompt: "صَنِّفِ الحَيَواناتِ حَسَبَ المَكانِ الَّذي تَعيشُ فيهِ.",
      groups: [
        { name: "يَعيشُ في الماءِ",   items: ["سَمَكَةٌ", "بَطَّةٌ", "سُلَحفاةٌ مائِيَّةٌ"] },
        { name: "يَعيشُ على اليابِسَةِ", items: ["أسَدٌ", "جَمَلٌ", "غَزالٌ"] }
      ]
    },

    // ⑫ الاستبعاد (إثرائي) — 2Be1 استدلال
    {
      type: "exclude",
      objective: "2Be1: يحدّد أوجه التشابه والاختلاف بين البيئات المحلّية وتأثيرها على ما يعيش فيها",
      level: "reasoning",
      prompt: "أيُّ حَيَوانٍ لا يَعيشُ في البِركَةِ؟",
      options: ["بَطَّةٌ", "ضِفدَعٌ", "سَمَكَةٌ", "جَمَلٌ"],
      answer: 3,
      reason: "الجَمَلُ يَعيشُ في الصَّحراءِ لا في البِركَةِ"
    }

  ],

  // العلوم/الثاني — الوحدة الأولى، الدرس الثاني: هل يمكننا العناية ببيئتنا؟ (كتاب التلميذ ص١٨–١٩)
  "g2s-1-2": [

    // ④ صواب وخطأ (الأسهل) — 2Be2 معرفة
    {
      type: "true-false",
      objective: "2Be2: يحدّد طرقاً للعناية بالبيئة",
      level: "knowledge",
      statement: "مياهُ المَجاري والنُّفاياتُ في البَحرِ تُؤذي الكائِناتِ البَحرِيَّةَ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Be2 معرفة
    {
      type: "mcq",
      objective: "2Be2: يحدّد طرقاً للعناية بالبيئة",
      level: "knowledge",
      prompt: "أيُّ سُلوكٍ يَعتَني بالبيئَةِ؟",
      options: ["جَمعُ النُّفاياتِ في الحاوِيَةِ", "إلقاءُ النُّفاياتِ في البَحرِ", "تَركُ الشَّاطئِ مُتَّسِخاً", "قَطعُ الأشجارِ"],
      answer: 0
    },

    // ② توصيل — 2Be2 معرفة (كلّ سلوك ونتيجته على البيئة)
    {
      type: "matching",
      objective: "2Be2: يحدّد طرقاً للعناية بالبيئة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ سُلوكٍ بنَتيجَتِهِ.",
      pairs: [
        { a: "زِراعَةُ الأشجارِ",       b: "هَواءٌ نَقِيٌّ" },
        { a: "جَمعُ النُّفاياتِ",        b: "شاطئٌ نَظيفٌ" },
        { a: "سَكبُ المَجاري في البَحرِ", b: "ماءٌ مُلَوَّثٌ" },
        { a: "قَطعُ الأشجارِ",          b: "ضَرَرٌ للحَيَواناتِ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Be2 تطبيق (توظيف قاعدة العناية بالبيئة)
    {
      type: "fill-blank",
      objective: "2Be2: يحدّد طرقاً للعناية بالبيئة",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "لِنَحميَ البيئَةَ نَجمَعُ {} ، ولا نَسكُبُ {} في البَحرِ.",
      answers: ["النُّفاياتِ", "المَجاري"],
      distractors: ["الأشجارَ"]
    },

    // ⑦ التصنيف في مجموعات — 2Be2 استدلال (سلوك يحمي البيئة / يؤذيها)
    {
      type: "classify",
      objective: "2Be2: يحدّد طرقاً للعناية بالبيئة",
      level: "reasoning",
      prompt: "صَنِّفِ السُّلوكَ: هل يَحمي البيئَةَ أم يُؤذيها؟",
      groups: [
        { name: "يَحمي البيئَةَ", items: ["جَمعُ النُّفاياتِ", "زِراعَةُ الأشجارِ", "تَرشيدُ استِهلاكِ الماءِ"] },
        { name: "يُؤذي البيئَةَ", items: ["رَميُ النُّفاياتِ في البَحرِ", "قَطعُ الأشجارِ", "سَكبُ المَجاري في البَحرِ"] }
      ]
    },

    // ⑬ الخريطة الذهنية الناقصة (إثرائي) — 2Be2 تطبيق
    {
      type: "mindmap",
      objective: "2Be2: يحدّد طرقاً للعناية بالبيئة",
      level: "application",
      prompt: "أكمِلْ خَريطَةَ العِنايَةِ بالبيئَةِ بسَحبِ الكَلِمَةِ المُناسِبَةِ إلى كُلِّ فَرعٍ.",
      center: "العِنايَةُ بالبيئَةِ",
      branches: [
        { label: "نَجمَعُ", answer: "النُّفاياتِ" },
        { label: "نَزرَعُ", answer: "الأشجارَ" },
        { label: "نُرَشِّدُ", answer: "الماءَ" }
      ],
      distractors: ["المَجاري"]
    }

  ],

  // العلوم/الثاني — الوحدة الأولى، الدرس الثالث: طقسنا (كتاب التلميذ ص٢٠–٢١)
  "g2s-1-3": [

    // ④ صواب وخطأ (الأسهل) — 2Be3 معرفة
    {
      type: "true-false",
      objective: "2Be3: يلاحظ الطقس ويسجّل ملاحظاته حول الأحوال الجوية",
      level: "knowledge",
      statement: "يَتَغَيَّرُ الطَّقسُ من يَومٍ إلى آخَرَ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Be3 معرفة
    {
      type: "mcq",
      objective: "2Be3: يلاحظ الطقس ويسجّل ملاحظاته حول الأحوال الجوية",
      level: "knowledge",
      prompt: "ماذا نَلبَسُ في اليَومِ المُمطِرِ؟",
      options: ["مِعطَفٌ ومِظَلَّةٌ", "مَلابِسُ خَفيفَةٌ", "قُبَّعَةُ الشَّمسِ", "نَظّارَةٌ شَمسِيَّةٌ"],
      answer: 0
    },

    // ② توصيل — 2Be3 معرفة (كلّ حالة طقس وما يناسبها)
    {
      type: "matching",
      objective: "2Be3: يلاحظ الطقس ويسجّل ملاحظاته حول الأحوال الجوية",
      level: "knowledge",
      prompt: "صِلْ كُلَّ حالَةِ طَقسٍ بما يُناسِبُها.",
      pairs: [
        { a: "مُشمِسٌ", b: "قُبَّعَةُ الشَّمسِ" },
        { a: "مُمطِرٌ", b: "المِظَلَّةُ" },
        { a: "بارِدٌ",  b: "المِعطَفُ الثَّقيلُ" },
        { a: "عاصِفٌ", b: "الطَّائِرَةُ الوَرَقِيَّةُ" }
      ]
    },

    // ⑤ تحديد الأجزاء — 2Be3 تطبيق (اختيار رمز الطقس الممطر على مخطّط رموز SVG)
    {
      type: "hotspot",
      objective: "2Be3: يلاحظ الطقس ويسجّل ملاحظاته حول الأحوال الجوية",
      level: "application",
      prompt: "اضغَطْ على رَمزِ الطَّقسِ المُمطِرِ.",
      fit: "width",
      bg: "#eaf3fb",
      spot: { x: 25, y: 74, r: 13 },
      // نسبة الرسم ١٫٦ (shoogp-ui §١.١٠): أُعيد توزيع الرموز الأربعة على صفّين (٢×٢)
      // فكبر كل رمز ١٫٣ مرّة نسبةً إلى العرض بدل صفٍّ واحدٍ رفيع. لم تُنزَل النسبة تحت ١٫٦
      // كي لا يتجاوز ارتفاعُ الرسم المعروض مسرحَ الـ400px على المنافذ العريضة.
      svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="رموز حالات الطقس">
        <g transform="translate(100,65) scale(1.3) translate(-55,-55)">
          <circle cx="55" cy="55" r="22" fill="#f2c230"/>
          <g stroke="#f2c230" stroke-width="4" stroke-linecap="round">
            <line x1="55" y1="20" x2="55" y2="8"/><line x1="55" y1="90" x2="55" y2="102"/>
            <line x1="20" y1="55" x2="8" y2="55"/><line x1="90" y1="55" x2="102" y2="55"/>
            <line x1="30" y1="30" x2="21" y2="21"/><line x1="80" y1="30" x2="89" y2="21"/>
            <line x1="30" y1="80" x2="21" y2="89"/><line x1="80" y1="80" x2="89" y2="89"/>
          </g>
        </g>
        <g transform="translate(300,65) scale(1.3) translate(-155,-60)">
          <path d="M120 70 Q120 50 142 52 Q150 38 168 48 Q188 46 188 66 Q202 68 198 82 L120 82 Q108 80 120 70 Z" fill="#c9d2d9" stroke="#9aa7b0" stroke-width="2"/>
        </g>
        <g transform="translate(100,185) scale(1.3) translate(-255,-59)">
          <path d="M220 60 Q220 40 242 42 Q250 28 268 38 Q288 36 288 56 Q302 58 298 72 L220 72 Q208 70 220 60 Z" fill="#9aa7b0" stroke="#7c8a94" stroke-width="2"/>
          <g fill="#2f6fb0">
            <path d="M235 80 q-4 8 0 11 q4 -3 0 -11 Z"/>
            <path d="M258 80 q-4 8 0 11 q4 -3 0 -11 Z"/>
            <path d="M281 80 q-4 8 0 11 q4 -3 0 -11 Z"/>
          </g>
        </g>
        <g transform="translate(300,185) scale(1.3) translate(-355,-59)">
          <path d="M320 60 Q320 40 342 42 Q350 28 368 38 Q388 36 388 56 Q402 58 398 72 L320 72 Q308 70 320 60 Z" fill="#c9d2d9" stroke="#9aa7b0" stroke-width="2"/>
          <g fill="#7fb2e0"><circle cx="335" cy="86" r="4"/><circle cx="358" cy="86" r="4"/><circle cx="381" cy="86" r="4"/></g>
        </g>
      </svg>`
    },

    // ⑦ التصنيف في مجموعات — 2Be3 استدلال (نشاط يناسب كلّ طقس)
    {
      type: "classify",
      objective: "2Be3: يلاحظ الطقس ويسجّل ملاحظاته حول الأحوال الجوية",
      level: "reasoning",
      prompt: "صَنِّفِ النَّشاطَ حَسَبَ الطَّقسِ المُناسِبِ لَهُ.",
      groups: [
        { name: "طَقسٌ مُشمِسٌ", items: ["السِّباحَةُ", "اللَّعِبُ في الحَديقَةِ", "رِحلَةٌ إلى الشَّاطئِ"] },
        { name: "طَقسٌ مُمطِرٌ", items: ["حَملُ المِظَلَّةِ", "لُبسُ المِعطَفِ", "البَقاءُ في المَنزِلِ"] }
      ]
    },

    // ⑩ التلوين بالتعليمات (إثرائي) — 2Be3 معرفة (تلوين مشهد الطقس)
    {
      type: "color",
      objective: "2Be3: يلاحظ الطقس ويسجّل ملاحظاته حول الأحوال الجوية",
      level: "knowledge",
      prompt: "لَوِّنْ مَشهَدَ الطَّقسِ: اختَرْ لَوناً من اللَّوحَةِ ثُمَّ اضغَطِ الجُزءَ.",
      bg: "#eaf3fb",
      palette: [
        { name: "أصفر", color: "#f2c230" },
        { name: "رمادي", color: "#9aa7b0" },
        { name: "أزرق", color: "#2f6fb0" },
        { name: "أخضر", color: "#3e9b4f" }
      ],
      parts: [
        { name: "الشمس",       color: "#f2c230" },
        { name: "السحابة",     color: "#9aa7b0" },
        { name: "قطرات المطر", color: "#2f6fb0" },
        { name: "العشب",       color: "#3e9b4f" }
      ],
      svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مشهد طقس للتلوين">
        <rect x="0" y="0" width="300" height="200" fill="#cfeafb"/>
        <g class="cpart" data-name="الشمس" id="part-sun"><circle cx="55" cy="50" r="28"/></g>
        <g class="cpart" data-name="السحابة" id="part-cloud">
          <path d="M150 78 Q150 52 178 55 Q190 36 214 48 Q244 44 244 74 Q266 76 260 96 L150 96 Q130 94 150 78 Z"/>
        </g>
        <g class="cpart" data-name="قطرات المطر" id="part-rain">
          <path d="M175 104 q-5 12 0 16 q5 -4 0 -16 Z"/>
          <path d="M205 104 q-5 12 0 16 q5 -4 0 -16 Z"/>
          <path d="M235 104 q-5 12 0 16 q5 -4 0 -16 Z"/>
        </g>
        <g class="cpart" data-name="العشب" id="part-grass"><rect x="0" y="165" width="300" height="35"/></g>
      </svg>`
    }

  ],

  // العلوم/الثاني — الوحدة الأولى، الدرس الرابع: الطقس القاسي (كتاب التلميذ ص٢٢–٢٣)
  "g2s-1-4": [

    // ④ صواب وخطأ (الأسهل) — 2Be3 معرفة
    {
      type: "true-false",
      objective: "2Be3: يلاحظ الطقس القاسي ويتعرّف أنواعه وطرق السلامة فيه",
      level: "knowledge",
      statement: "الإعصارُ نَوعٌ من الطَّقسِ القاسي.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Be3 معرفة
    {
      type: "mcq",
      objective: "2Be3: يلاحظ الطقس القاسي ويتعرّف أنواعه وطرق السلامة فيه",
      level: "knowledge",
      prompt: "مَنْ يُخبِرُنا كَيفَ سَيَكونُ الطَّقسُ؟",
      options: ["مُراقِبُ الطَّقسِ", "سائِقُ الحافِلَةِ", "بائِعُ الخُبزِ", "لاعِبُ الكُرَةِ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 2Be3 معرفة (الأقمار الاصطناعية تجمع معلومات الطقس)
    {
      type: "fill-blank",
      objective: "2Be3: يلاحظ الطقس القاسي ويتعرّف أنواعه وطرق السلامة فيه",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "يَجمَعُ {} الاصطِناعِيُّ مَعلوماتٍ عنِ الطَّقسِ من {} الخارِجِيِّ.",
      answers: ["القَمَرُ", "الفَضاءِ"],
      distractors: ["المَطَرُ"]
    },

    // ② توصيل — 2Be3 تطبيق (توظيف قاعدة السلامة في الطقس القاسي)
    {
      type: "matching",
      objective: "2Be3: يلاحظ الطقس القاسي ويتعرّف أنواعه وطرق السلامة فيه",
      level: "application",
      prompt: "صِلْ كُلَّ حالَةٍ بالتَّصَرُّفِ الآمِنِ المُناسِبِ لَها.",
      pairs: [
        { a: "عاصِفَةٌ قَوِيَّةٌ",   b: "نَبقى داخِلَ المَنزِلِ" },
        { a: "عاصِفَةٌ رَملِيَّةٌ", b: "نُغلِقُ النَّوافِذَ" },
        { a: "مَطَرٌ غَزيرٌ",       b: "نَحمِلُ المِظَلَّةَ" },
        { a: "طَقسٌ حارٌّ",         b: "نَشرَبُ الماءَ كَثيراً" }
      ]
    },

    // ⑦ التصنيف في مجموعات — 2Be3 استدلال (طقس عادي / طقس قاسٍ)
    {
      type: "classify",
      objective: "2Be3: يلاحظ الطقس القاسي ويتعرّف أنواعه وطرق السلامة فيه",
      level: "reasoning",
      prompt: "صَنِّفْ: هل هوَ طَقسٌ عادِيٌّ أم طَقسٌ قاسٍ؟",
      groups: [
        { name: "طَقسٌ عادِيٌّ", items: ["يَومٌ مُشمِسٌ", "نَسيمٌ خَفيفٌ", "غَيمٌ قَليلٌ"] },
        { name: "طَقسٌ قاسٍ",   items: ["إعصارٌ", "عاصِفَةٌ رَملِيَّةٌ", "زَوبَعَةٌ"] }
      ]
    },

    // ⑫ الاستبعاد (إثرائي) — 2Be3 استدلال
    {
      type: "exclude",
      objective: "2Be3: يلاحظ الطقس القاسي ويتعرّف أنواعه وطرق السلامة فيه",
      level: "reasoning",
      prompt: "أيُّها لَيسَ من الطَّقسِ القاسي؟",
      options: ["الإعصارُ", "العاصِفَةُ الرَّملِيَّةُ", "النَّسيمُ اللَّطيفُ", "الزَّوبَعَةُ"],
      answer: 2,
      reason: "النَّسيمُ اللَّطيفُ طَقسٌ عادِيٌّ هادئٌ، لا قاسٍ"
    }

  ],

  // العلوم/الثاني — الوحدة الثانية، الدرس الأول: ما هي الصخور؟ (كتاب التلميذ ص٢٦–٢٧)
  "g2s-2-1": [

    // ④ صواب وخطأ (الأسهل) — 2Cp1a معرفة
    {
      type: "true-false",
      objective: "2Cp1a: يتعرّف على بعض أنواع الصخور",
      level: "knowledge",
      statement: "يَتَكَوَّنُ سَطحُ الأرضِ منَ الصُّخورِ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp1a معرفة
    {
      type: "mcq",
      objective: "2Cp1a: يتعرّف على بعض أنواع الصخور",
      level: "knowledge",
      prompt: "ما اسمُ المَكانِ الَّذي تُنتَزَعُ منهُ الصُّخورُ منَ الأرضِ؟",
      options: ["المَحجَرُ", "المَتحَفُ", "المَزرَعَةُ", "المَصنَعُ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp1a معرفة
    {
      type: "fill-blank",
      objective: "2Cp1a: يتعرّف على بعض أنواع الصخور",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "تَختَلِفُ الصُّخورُ في {} وفي {}.",
      answers: ["الحَجمِ", "اللَّونِ"],
      distractors: ["الصَّوتِ"]
    },

    // ⑤ تحديد الأجزاء — 2Cp1a تطبيق (اختيار أكبر صخرة على مخطّط SVG)
    {
      type: "hotspot",
      objective: "2Cp1a: يتعرّف على بعض أنواع الصخور",
      level: "application",
      prompt: "اضغَطْ على أكبَرِ صَخرَةٍ.",
      fit: "width",
      bg: "#f3efe6",
      spot: { x: 50, y: 74, r: 15 },
      // نسبة الرسم ١٫٦ (shoogp-ui §١.١٠): الصخرتان الصغيرتان في صفٍّ علويّ والكبرى وحدها
      // أسفلهما، فكبرت كلُّها ١٫٢٥ مرّة نسبةً إلى العرض وبقي تفاوتُ الأحجام بيّناً.
      svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاث صخور بأحجام مختلفة">
        <g transform="translate(100,70) scale(1.25) translate(-73,-109)">
          <path d="M42 118 Q32 96 55 90 Q78 84 92 100 Q104 116 88 126 Q62 134 42 118 Z" fill="#c2c8cd" stroke="#8a9096" stroke-width="3"/>
        </g>
        <g transform="translate(300,70) scale(1.25) translate(-205,-115)">
          <path d="M165 132 Q150 98 186 88 Q224 80 244 106 Q260 130 234 142 Q194 150 165 132 Z" fill="#b2b9bf" stroke="#7c848a" stroke-width="3"/>
        </g>
        <g transform="translate(200,185) scale(1.25) translate(-336,-106)">
          <path d="M292 148 Q268 92 322 72 Q384 56 396 108 Q404 146 356 152 Q318 156 292 148 Z" fill="#a3abb1" stroke="#6f777d" stroke-width="3"/>
        </g>
      </svg>`
    },

    // ⑥ الترتيب التسلسلي — 2Cp1a استدلال (خطوات الحصول على الصخور من المحجر)
    {
      type: "sequence",
      objective: "2Cp1a: يتعرّف على بعض أنواع الصخور",
      level: "reasoning",
      prompt: "رَتِّبْ خُطُواتِ الحُصولِ على الصُّخورِ منَ المَحجَرِ.",
      steps: [
        "يَحفِرُ العُمّالُ بالآلاتِ",
        "تُنتَزَعُ الصُّخورُ منَ الأرضِ",
        "تُنقَلُ الصُّخورُ منَ المَحجَرِ",
        "نَستَخدِمُها في البِناءِ"
      ]
    },

    // ⑫ الاستبعاد (إثرائي) — 2Cp1a استدلال
    {
      type: "exclude",
      objective: "2Cp1a: يتعرّف على بعض أنواع الصخور",
      level: "reasoning",
      prompt: "أيُّها لَيسَ نَوعاً منَ الصُّخورِ؟",
      options: ["الجرانيتُ", "الحَجَرُ الرَّمليُّ", "الحَجَرُ الجيريُّ", "الماءُ"],
      answer: 3,
      reason: "الماءُ سائِلٌ ولَيسَ صَخراً"
    }

  ],

  // العلوم/الثاني — الوحدة الثانية، الدرس الثاني: استخدامات الصخور (كتاب التلميذ ص٢٨–٢٩)
  "g2s-2-2": [

    // ④ صواب وخطأ (الأسهل) — 2Cp1b معرفة
    {
      type: "true-false",
      objective: "2Cp1b: يحدّد استخدامات الصخور المختلفة",
      level: "knowledge",
      statement: "يُستَخدَمُ حَجَرُ الجرانيتِ في البِناءِ لأنَّهُ قَوِيٌّ جِدّاً.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp1b معرفة
    {
      type: "mcq",
      objective: "2Cp1b: يحدّد استخدامات الصخور المختلفة",
      level: "knowledge",
      prompt: "في أيِّ شَيءٍ يُستَخدَمُ الألماسُ؟",
      options: ["صِناعَةِ المُجَوهَراتِ", "صِناعَةِ الخُبزِ", "رَيِّ النَّباتِ", "غَسلِ المَلابِسِ"],
      answer: 0
    },

    // ② توصيل — 2Cp1b معرفة (كلّ صخر واستخدامه)
    {
      type: "matching",
      objective: "2Cp1b: يحدّد استخدامات الصخور المختلفة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ صَخرٍ باستِخدامِهِ.",
      pairs: [
        { a: "الجرانيتُ", b: "البِناءُ" },
        { a: "الرُّخامُ",  b: "الدِّيكورُ" },
        { a: "الألماسُ",  b: "المُجَوهَراتُ" },
        { a: "الكوارتزُ", b: "السّاعاتُ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp1b تطبيق (توظيف صفة قوّة الصخر في الاستخدام)
    {
      type: "fill-blank",
      objective: "2Cp1b: يحدّد استخدامات الصخور المختلفة",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "نَستَخدِمُ الصُّخورَ القَوِيَّةَ في بِناءِ {} و{}.",
      answers: ["الطُّرُقاتِ", "الجُدرانِ"],
      distractors: ["الطَّعامِ"]
    },

    // ⑦ التصنيف في مجموعات — 2Cp1b استدلال (استخدام الصخر: بناء / زينة ومجوهرات)
    {
      type: "classify",
      objective: "2Cp1b: يحدّد استخدامات الصخور المختلفة",
      level: "reasoning",
      prompt: "صَنِّفِ الصَّخرَ حَسَبَ استِخدامِهِ.",
      groups: [
        { name: "للبِناءِ والأرضيّاتِ", items: ["الجرانيتُ", "الأردوازُ", "الحَجَرُ الرَّمليُّ"] },
        { name: "للزّينَةِ والمُجَوهَراتِ", items: ["الألماسُ", "الرُّخامُ", "الكوارتزُ"] }
      ]
    },

    // ⑬ الخريطة الذهنية الناقصة (إثرائي) — 2Cp1b تطبيق
    {
      type: "mindmap",
      objective: "2Cp1b: يحدّد استخدامات الصخور المختلفة",
      level: "application",
      prompt: "أكمِلْ خَريطَةَ استِخداماتِ الصُّخورِ بسَحبِ الكَلِمَةِ المُناسِبَةِ إلى كُلِّ فَرعٍ.",
      center: "استِخداماتُ الصُّخورِ",
      branches: [
        { label: "الجرانيتُ", answer: "البِناءُ" },
        { label: "الألماسُ", answer: "المُجَوهَراتُ" },
        { label: "الكوارتزُ", answer: "السّاعاتُ" }
      ],
      distractors: ["الطَّعامُ"]
    }

  ],

  // العلوم/الثاني — الوحدة الثانية، الدرس الثالث: التربة (كتاب التلميذ ص٣٠–٣١)
  "g2s-2-3": [

    // ④ صواب وخطأ (الأسهل) — 2Cp1 معرفة
    {
      type: "true-false",
      objective: "2Cp1: يتعرّف تأثير الصخور في تكوّن التربة وأهمية الحصى فيها",
      level: "knowledge",
      statement: "تَحتَوي التُّربَةُ على صُخورٍ صَغيرَةٍ تُسَمّى الحَصى.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp1 معرفة
    {
      type: "mcq",
      objective: "2Cp1: يتعرّف تأثير الصخور في تكوّن التربة وأهمية الحصى فيها",
      level: "knowledge",
      prompt: "لِماذا نَحتاجُ إلى التُّربَةِ؟",
      options: ["لِنَزرَعَ فيها غِذاءَنا", "لِنَشرَبَها", "لِنَلعَبَ بها الكُرَةَ", "لِنَصنَعَ منها الزُّجاجَ"],
      answer: 0
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp1 معرفة (تفتّت الصخور يكوّن التربة)
    {
      type: "fill-blank",
      objective: "2Cp1: يتعرّف تأثير الصخور في تكوّن التربة وأهمية الحصى فيها",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "تَتَفَتَّتُ الصُّخورُ الكَبيرَةُ إلى أجزاءٍ {} تَبقى داخِلَ {}.",
      answers: ["صَغيرَةٍ", "التُّربَةِ"],
      distractors: ["كَبيرَةٍ"]
    },

    // ② توصيل — 2Cp1 تطبيق (توظيف وصف أنواع التربة)
    {
      type: "matching",
      objective: "2Cp1: يتعرّف تأثير الصخور في تكوّن التربة وأهمية الحصى فيها",
      level: "application",
      prompt: "صِلْ كُلَّ نَوعٍ بوَصفِهِ الصَّحيحِ.",
      pairs: [
        { a: "تُربَةٌ رَمليَّةٌ", b: "شَبيهَةٌ بالرِّمالِ" },
        { a: "تُربَةٌ طينيَّةٌ", b: "مِثلُ الطِّينِ" },
        { a: "الحَصى",         b: "صُخورٌ صَغيرَةٌ في التُّربَةِ" }
      ]
    },

    // ⑦ التصنيف في مجموعات — 2Cp1 استدلال (ما نجده في التربة: حيّ / غير حيّ)
    {
      type: "classify",
      objective: "2Cp1: يتعرّف تأثير الصخور في تكوّن التربة وأهمية الحصى فيها",
      level: "reasoning",
      prompt: "صَنِّفْ ما نَجِدُهُ في التُّربَةِ: كائِنٌ حَيٌّ أم غَيرُ حَيٍّ.",
      groups: [
        { name: "كائِنٌ حَيٌّ",   items: ["دودَةٌ", "حَشَرَةٌ", "جُذورُ نَبتَةٍ"] },
        { name: "غَيرُ حَيٍّ", items: ["حَصى", "رَملٌ", "ماءٌ"] }
      ]
    },

    // ⑩ التلوين بالتعليمات (إثرائي) — 2Cp1 معرفة (تلوين مشهد التربة)
    {
      type: "color",
      objective: "2Cp1: يتعرّف تأثير الصخور في تكوّن التربة وأهمية الحصى فيها",
      level: "knowledge",
      prompt: "لَوِّنْ مَشهَدَ التُّربَةِ: اختَرْ لَوناً منَ اللَّوحَةِ ثُمَّ اضغَطِ الجُزءَ.",
      bg: "#eef7ff",
      palette: [
        { name: "أخضر", color: "#3e9b4f" },
        { name: "بنّي", color: "#8a5a2b" },
        { name: "رمادي", color: "#9aa7b0" }
      ],
      parts: [
        { name: "العشب",  color: "#3e9b4f" },
        { name: "التربة", color: "#8a5a2b" },
        { name: "الحصى",  color: "#9aa7b0" }
      ],
      svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مشهد تربة للتلوين">
        <rect x="0" y="0" width="300" height="60" fill="#cfeafb"/>
        <!-- شمس بأشعة (زينة ثابتة) -->
        <g pointer-events="none">
          <g stroke="#f4c531" stroke-width="3" stroke-linecap="round">
            <line x1="268" y1="6" x2="268" y2="14"/>
            <line x1="290" y1="28" x2="298" y2="28"/>
            <line x1="238" y1="28" x2="246" y2="28"/>
            <line x1="251" y1="11" x2="256" y2="16"/>
            <line x1="285" y1="11" x2="280" y2="16"/>
            <line x1="251" y1="45" x2="256" y2="40"/>
            <line x1="285" y1="45" x2="280" y2="40"/>
          </g>
          <circle cx="268" cy="28" r="14" fill="#f7d64a" stroke="#e8b42a" stroke-width="2"/>
        </g>
        <!-- غيمتان بحواف ناعمة منحنية (زينة ثابتة) -->
        <g pointer-events="none" fill="#ffffff" stroke="#dfeaf2" stroke-width="1.5" stroke-linejoin="round">
          <path d="M36 37 Q33 27 44 26 Q47 17 58 21 Q67 14 75 23 Q87 23 85 34 Q91 41 78 41 L46 41 Q31 41 36 37 Z"/>
          <path d="M150 31 Q147 22 157 22 Q161 13 172 17 Q182 12 185 24 Q196 25 191 34 L159 35 Q145 35 150 31 Z"/>
        </g>
        <!-- العشب: حافة علوية متموّجة (منطقة تلوين) -->
        <g class="cpart" data-name="العشب" id="part-grass">
          <path d="M0 74 L0 55 Q19 47 38 53 Q57 59 76 51 Q95 45 114 53 Q133 60 152 51 Q171 44 190 53 Q209 60 228 51 Q247 44 266 53 Q283 59 300 52 L300 74 Z"/>
        </g>
        <!-- التربة (منطقة تلوين) -->
        <g class="cpart" data-name="التربة" id="part-soil"><rect x="0" y="74" width="300" height="126"/></g>
        <!-- تفاصيل صغيرة في التربة (زينة ثابتة لا تؤثّر في التلوين) -->
        <g pointer-events="none">
          <g fill="#a9743f" opacity="0.5">
            <ellipse cx="30" cy="100" rx="3" ry="2"/>
            <ellipse cx="96" cy="128" rx="2.6" ry="1.8"/>
            <ellipse cx="190" cy="122" rx="3" ry="2"/>
            <ellipse cx="272" cy="140" rx="2.6" ry="2"/>
            <ellipse cx="45" cy="166" rx="3" ry="2"/>
            <ellipse cx="168" cy="186" rx="2.6" ry="1.8"/>
            <ellipse cx="206" cy="158" rx="2.4" ry="1.8"/>
          </g>
          <g fill="none" stroke="#7c4a22" stroke-width="1.6" stroke-linecap="round" opacity="0.4">
            <path d="M80 98 q6 8 2 17"/>
            <path d="M214 132 q-5 7 0 15"/>
          </g>
        </g>
        <!-- الحصى (منطقة تلوين) -->
        <g class="cpart" data-name="الحصى" id="part-pebbles">
          <circle cx="60" cy="118" r="11"/>
          <circle cx="150" cy="150" r="13"/>
          <circle cx="232" cy="112" r="10"/>
          <circle cx="110" cy="176" r="12"/>
          <circle cx="248" cy="170" r="11"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الثاني — الوحدة الثانية، الدرس الرابع: المواد الطبيعية الأخرى (كتاب التلميذ ص٣٢–٣٣)
  "g2s-2-4": [

    // ④ صواب وخطأ (الأسهل) — 2Cp2 معرفة
    {
      type: "true-false",
      objective: "2Cp2: يميّز بين المواد الطبيعية والمواد المصنّعة",
      level: "knowledge",
      statement: "الصُّخورُ مادَّةٌ طَبيعِيَّةٌ تُستَخرَجُ منَ الأرضِ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp2 معرفة
    {
      type: "mcq",
      objective: "2Cp2: يميّز بين المواد الطبيعية والمواد المصنّعة",
      level: "knowledge",
      prompt: "من أينَ نَحصُلُ على الخَشَبِ؟",
      options: ["منَ الشَّجَرِ", "منَ الحَديدِ", "منَ البَحرِ", "منَ الزُّجاجِ"],
      answer: 0
    },

    // ② توصيل — 2Cp2 معرفة (كلّ مادة طبيعية ومصدرها)
    {
      type: "matching",
      objective: "2Cp2: يميّز بين المواد الطبيعية والمواد المصنّعة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ مادَّةٍ طَبيعِيَّةٍ بمَصدَرِها.",
      pairs: [
        { a: "القُطنُ",  b: "نَباتُ القُطنِ" },
        { a: "الخَشَبُ", b: "جِذعُ الشَّجَرِ" },
        { a: "الصُّخورُ", b: "باطِنُ الأرضِ" },
        { a: "المَطّاطُ", b: "عَصارَةُ الشَّجَرِ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp2 تطبيق (توظيف قاعدة الطبيعي مقابل المصنّع)
    {
      type: "fill-blank",
      objective: "2Cp2: يميّز بين المواد الطبيعية والمواد المصنّعة",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "المادَّةُ الطَّبيعِيَّةُ نَجِدُها في {} ، والمادَّةُ المَصنَّعَةُ يَصنَعُها {}.",
      answers: ["الطَّبيعَةِ", "الإنسانُ"],
      distractors: ["المَصنَعِ"]
    },

    // ⑦ التصنيف في مجموعات — 2Cp2 استدلال (مادة طبيعية / مصنّعة)
    {
      type: "classify",
      objective: "2Cp2: يميّز بين المواد الطبيعية والمواد المصنّعة",
      level: "reasoning",
      prompt: "صَنِّفِ المَوادَّ: طَبيعِيَّةٌ أم مَصنَّعَةٌ؟",
      groups: [
        { name: "طَبيعِيَّةٌ", items: ["خَشَبٌ", "قُطنٌ", "صَخرٌ"] },
        { name: "مَصنَّعَةٌ", items: ["بلاستيكٌ", "زُجاجٌ", "وَرَقٌ"] }
      ]
    },

    // ⑫ الاستبعاد (إثرائي) — 2Cp2 استدلال
    {
      type: "exclude",
      objective: "2Cp2: يميّز بين المواد الطبيعية والمواد المصنّعة",
      level: "reasoning",
      prompt: "أيُّها مادَّةٌ مَصنَّعَةٌ وليسَت طَبيعِيَّةً؟",
      options: ["الخَشَبُ", "القُطنُ", "البلاستيكُ", "الصَّخرُ"],
      answer: 2,
      reason: "البلاستيكُ من صُنعِ الإنسانِ، والبَقِيَّةُ موادُّ طَبيعِيَّةٌ"
    }

  ],

  /* ═══════════════════════════════════════════════════════════════════════
     العلوم/الثاني — الوحدة الثالثة: تغيير المواد
     أهدافها (2Cp3 – 2Cp6) مستكمِلةٌ لترقيم الوحدتين ١ و٢ وصياغتِهما؛ تُصحَّح
     نصوصُها في حقل objective وحده عند الرجوع إلى كتاب التلميذ، بلا مساس بالأسئلة.
     ═══════════════════════════════════════════════════════════════════════ */

  // الدرس الأول: تغيير شكل المواد
  "g2s-3-1": [

    // ④ صواب وخطأ (الأسهل) — 2Cp3 معرفة
    {
      type: "true-false",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "knowledge",
      statement: "يُمكِنُنا تَغييرُ شَكلِ العَجينِ بالضَّغطِ عَلَيهِ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp3 معرفة
    {
      type: "mcq",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "knowledge",
      prompt: "ماذا يَحدُثُ للصَّلصالِ عِندَ الضَّغطِ عَلَيهِ؟",
      options: ["يَتَغَيَّرُ شَكلُهُ", "يَختَفي", "يُصبِحُ ماءً", "يُصبِحُ صَخراً"],
      answer: 0
    },

    // ② توصيل — 2Cp3 معرفة (كلّ فعل وما يُحدِثُهُ في المادة)
    {
      type: "matching",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "knowledge",
      prompt: "صِلْ كُلَّ فِعلٍ بما يَحدُثُ للمادَّةِ.",
      pairs: [
        { a: "الضَّغطُ", b: "تَنبَعِجُ المادَّةُ" },
        { a: "الشَّدُّ",  b: "تَستَطيلُ المادَّةُ" },
        { a: "الثَّنيُ",  b: "تَنحَني المادَّةُ" },
        { a: "اللَّيُّ",   b: "تَلتَوي المادَّةُ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp3 تطبيق (فراغان فقط — قيد السعة)
    {
      type: "fill-blank",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "نُغَيِّرُ شَكلَ العَجينِ بـ{} ، ونُغَيِّرُ شَكلَ المَطّاطِ بـ{}.",
      answers: ["الضَّغطِ", "الشَّدِّ"],
      distractors: ["الشَّمِّ"]
    },

    // ⑦ التصنيف في مجموعات — 2Cp3 استدلال (مجموعتان × عنصران — قيد السعة)
    {
      type: "classify",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "reasoning",
      prompt: "صَنِّفِ المَوادَّ حَسَبَ سُهولَةِ تَغييرِ شَكلِها.",
      groups: [
        { name: "يَسهُلُ تَغييرُ شَكلِها", items: ["عَجينٌ", "صَلصالٌ"] },
        { name: "يَصعُبُ تَغييرُ شَكلِها", items: ["صَخرٌ", "زُجاجٌ"] }
      ]
    },

    // ⑬ الخريطة الذهنية الناقصة (إثرائي) — 2Cp3 تطبيق
    {
      type: "mindmap",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "application",
      prompt: "أكمِلْ خَريطَةَ تَغييرِ الشَّكلِ بسَحبِ المادَّةِ المُناسِبَةِ إلى كُلِّ فَرعٍ.",
      center: "نُغَيِّرُ الشَّكلَ",
      branches: [
        { label: "نَضغَطُ", answer: "العَجينَ" },
        { label: "نَشُدُّ",  answer: "المَطّاطَ" },
        { label: "نَثني",   answer: "السِّلكَ" }
      ],
      distractors: ["الصَّخرَ"]
    }

  ],

  // الدرس الثاني: الثَّني واللَّيّ
  "g2s-3-2": [

    // ④ صواب وخطأ (الأسهل) — 2Cp3 معرفة
    {
      type: "true-false",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "knowledge",
      statement: "السِّلكُ المَعدِنِيُّ الرَّفيعُ يُمكِنُ ثَنيُهُ ولَيُّهُ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp3 معرفة
    {
      type: "mcq",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "knowledge",
      prompt: "أيُّ هذِهِ المَوادِّ يَنكَسِرُ ولا يَنثَني؟",
      options: ["الزُّجاجُ", "السِّلكُ", "الوَرَقُ", "الخَيطُ"],
      answer: 0
    },

    // ② توصيل — 2Cp3 معرفة (كلّ جسم وما نفعله به)
    {
      type: "matching",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "knowledge",
      prompt: "صِلْ كُلَّ جِسمٍ بما نَفعَلُهُ بهِ.",
      pairs: [
        { a: "السِّلكُ",  b: "نَلويهِ" },
        { a: "الوَرَقُ",  b: "نَثنيهِ" },
        { a: "الإسفَنجُ", b: "نَضغَطُهُ" },
        { a: "المَطّاطُ", b: "نَشُدُّهُ" }
      ]
    },

    // ⑤ تحديد الأجزاء — 2Cp3 تطبيق (اختيار الجسم القابل للثني من أربعة أجسام)
    // نسبة الرسم ١٫٦ (shoogp-ui §١.١٠): أربعة أجسام في صفّين ٢×٢ ليكبر كلٌّ منها.
    {
      type: "hotspot",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "application",
      prompt: "اضغَطْ على الجِسمِ الَّذي يُمكِنُ ثَنيُهُ ولَيُّهُ.",
      fit: "width",
      bg: "#f3f6f8",
      spot: { x: 75, y: 33, r: 14 },
      svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="أربعة أجسام: كوب زجاج وسلك معدني وصخرة وقضيب حديد">
        <!-- كوب زجاج (لا يُثنى) -->
        <g>
          <ellipse cx="100" cy="116" rx="34" ry="7" fill="#000" opacity="0.10"/>
          <path d="M80 34 L86 106 Q86 112 100 112 Q114 112 114 106 L120 34 Z" fill="#dff0f7" stroke="#6b7c88" stroke-width="4" stroke-linejoin="round"/>
          <path d="M89 44 L93 100" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
          <ellipse cx="100" cy="34" rx="20" ry="6" fill="#eef8fc" stroke="#6b7c88" stroke-width="4"/>
        </g>
        <!-- سلك معدني ملويّ (الإجابة الصحيحة) -->
        <g>
          <ellipse cx="300" cy="116" rx="46" ry="7" fill="#000" opacity="0.10"/>
          <path d="M252 96 Q268 52 288 90 T322 90 Q338 90 350 62" fill="none" stroke="#5d6a73" stroke-width="14" stroke-linecap="round"/>
          <path d="M252 96 Q268 52 288 90 T322 90 Q338 90 350 62" fill="none" stroke="#c3ced6" stroke-width="6" stroke-linecap="round"/>
          <circle cx="252" cy="96" r="7" fill="#8e9aa3" stroke="#5d6a73" stroke-width="3"/>
          <circle cx="350" cy="62" r="7" fill="#8e9aa3" stroke="#5d6a73" stroke-width="3"/>
        </g>
        <!-- صخرة (لا تُثنى) -->
        <g>
          <ellipse cx="100" cy="228" rx="48" ry="8" fill="#000" opacity="0.12"/>
          <path d="M56 222 L66 180 L90 162 L124 168 L144 194 L140 222 Z" fill="#9b9186" stroke="#6d655c" stroke-width="4" stroke-linejoin="round"/>
          <path d="M66 180 L98 190 L92 222 L56 222 Z" fill="#867c72"/>
          <path d="M90 162 L124 168 L98 190 Z" fill="#b0a69a"/>
          <path d="M56 222 L66 180 L90 162 L124 168 L144 194 L140 222 Z" fill="none" stroke="#6d655c" stroke-width="4" stroke-linejoin="round"/>
        </g>
        <!-- قضيب حديد سميك (لا يُثنى) -->
        <g>
          <ellipse cx="300" cy="228" rx="52" ry="8" fill="#000" opacity="0.12"/>
          <rect x="246" y="180" width="108" height="34" rx="17" fill="#8e9aa3" stroke="#5d6a73" stroke-width="4"/>
          <path d="M258 189 H342" stroke="#c3ced6" stroke-width="7" stroke-linecap="round"/>
          <circle cx="266" cy="197" r="4.5" fill="#5d6a73"/>
          <circle cx="334" cy="197" r="4.5" fill="#5d6a73"/>
        </g>
      </svg>`
    },

    // ⑦ التصنيف في مجموعات — 2Cp3 استدلال (مجموعتان × عنصران — قيد السعة)
    {
      type: "classify",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "reasoning",
      prompt: "صَنِّفِ الأجسامَ: هل يَنثَني أم لا يَنثَني؟",
      groups: [
        { name: "يَنثَني",     items: ["سِلكٌ رَفيعٌ", "وَرَقَةٌ"] },
        { name: "لا يَنثَني", items: ["زُجاجٌ", "صَخرٌ"] }
      ]
    },

    // ⑫ الاستبعاد (إثرائي) — 2Cp3 استدلال
    {
      type: "exclude",
      objective: "2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ",
      level: "reasoning",
      prompt: "أيُّها لا يُمكِنُ ثَنيُهُ؟",
      options: ["سِلكٌ", "وَرَقٌ", "خَيطٌ", "صَخرٌ"],
      answer: 3,
      reason: "الصَّخرُ صُلبٌ لا يَنثَني، أمّا السِّلكُ والوَرَقُ والخَيطُ فَتَنثَني"
    }

  ],

  // الدرس الثالث: المرونة الرائعة
  "g2s-3-3": [

    // ④ صواب وخطأ (الأسهل) — 2Cp4 معرفة
    {
      type: "true-false",
      objective: "2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي",
      level: "knowledge",
      statement: "الرِّباطُ المَطّاطِيُّ يَعودُ إلى شَكلِهِ الأوَّلِ بَعدَ أن نَترُكَهُ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp4 معرفة
    {
      type: "mcq",
      objective: "2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي",
      level: "knowledge",
      prompt: "ما مَعنى أنَّ المادَّةَ مَرِنَةٌ؟",
      options: ["تَعودُ إلى شَكلِها بَعدَ شَدِّها", "تَبقى مَشدودَةً دائِماً", "تَنكَسِرُ بسُرعَةٍ", "تَذوبُ في الماءِ"],
      answer: 0
    },

    // ② توصيل — 2Cp4 معرفة (كلّ جسم مرن واستخدامه)
    {
      type: "matching",
      objective: "2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي",
      level: "knowledge",
      prompt: "صِلْ كُلَّ جِسمٍ مَرِنٍ باستِخدامِهِ.",
      pairs: [
        { a: "الرِّباطُ المَطّاطِيُّ", b: "يَربِطُ الأشياءَ" },
        { a: "الإسفَنجَةُ",          b: "تُنَظِّفُ الأطباقَ" },
        { a: "النَّابِضُ",             b: "داخِلَ القَلَمِ" },
        { a: "الكُرَةُ",              b: "تَرتَدُّ عنِ الأرضِ" }
      ]
    },

    // ① سحب وإفلات — 2Cp4 تطبيق (تسمية ثلاثة أجسام مرنة على الرسم)
    // نسبة الرسم ٢٫٠ (≤ 2.2)، وتخطيطه صفّ بطاقات أعلى الصورة (نسبة ≥ 1.2).
    {
      type: "drag-drop",
      objective: "2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي",
      level: "application",
      prompt: "اسحَبِ اسمَ كُلِّ جِسمٍ مَرِنٍ إلى مَكانِهِ.",
      fit: "width",
      bg: "#f3f6f8",
      // الشريط العلويّ (y=0..58 من ٢٣٠) مُبقًى فارغاً عمداً ليجلس فيه صفّ الصناديق بلا تراكب.
      targets: [
        // نقطة الرباط على حلقته نفسها لا في جوفها الفارغ (جوف الحلقة ليس جزءاً من الجسم)
        { answer: "رِباطٌ مَطّاطِيٌّ", box: { x: 15, y: 11 }, dot: { x: 17.5, y: 42 } },
        { answer: "إسفَنجَةٌ",        box: { x: 50, y: 11 }, dot: { x: 50,   y: 58 } },
        { answer: "نابِضٌ",           box: { x: 85, y: 11 }, dot: { x: 82.5, y: 56 } }
      ],
      svg: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="رباط مطاطي وإسفنجة ونابض">
        <!-- رباط مطاطي -->
        <g>
          <ellipse cx="70" cy="188" rx="42" ry="7" fill="#000" opacity="0.10"/>
          <ellipse cx="70" cy="124" rx="44" ry="32" fill="none" stroke="#8a5a2b" stroke-width="18"/>
          <ellipse cx="70" cy="124" rx="44" ry="32" fill="none" stroke="#d08a45" stroke-width="10"/>
          <path d="M40 106 q10 -12 26 -14" fill="none" stroke="#f0bb85" stroke-width="5" stroke-linecap="round"/>
        </g>
        <!-- إسفنجة -->
        <g>
          <ellipse cx="200" cy="188" rx="48" ry="7" fill="#000" opacity="0.10"/>
          <rect x="154" y="96" width="92" height="76" rx="14" fill="#f2c230" stroke="#a8801f" stroke-width="4"/>
          <path d="M154 120 q46 -18 92 0 V110 q0 -14 -14 -14 H168 q-14 0 -14 14 Z" fill="#f8dd7c"/>
          <g fill="#c99a1e">
            <circle cx="176" cy="136" r="7"/><circle cx="206" cy="150" r="8"/>
            <circle cx="230" cy="130" r="6"/><circle cx="190" cy="162" r="5"/>
            <circle cx="228" cy="160" r="6"/>
          </g>
          <rect x="154" y="96" width="92" height="76" rx="14" fill="none" stroke="#a8801f" stroke-width="4"/>
        </g>
        <!-- نابض -->
        <g>
          <ellipse cx="330" cy="188" rx="40" ry="7" fill="#000" opacity="0.10"/>
          <rect x="296" y="166" width="68" height="11" rx="5.5" fill="#8e9aa3" stroke="#5d6a73" stroke-width="3"/>
          <path d="M304 162 L356 152 L304 140 L356 130 L304 118 L356 108 L304 98" fill="none" stroke="#5d6a73" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M304 162 L356 152 L304 140 L356 130 L304 118 L356 108 L304 98" fill="none" stroke="#c3ced6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="296" y="86" width="68" height="11" rx="5.5" fill="#8e9aa3" stroke="#5d6a73" stroke-width="3"/>
        </g>
      </svg>`
    },

    // ⑥ الترتيب التسلسلي — 2Cp4 استدلال (ما يحدث للرباط المطاطي بالترتيب)
    {
      type: "sequence",
      objective: "2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي",
      level: "reasoning",
      prompt: "رَتِّبْ ما يَحدُثُ للرِّباطِ المَطّاطِيِّ منَ البِدايَةِ إلى النِّهايَةِ.",
      steps: [
        "نُمسِكُ الرِّباطَ المَطّاطِيَّ",
        "نَشُدُّهُ بأصابِعِنا",
        "يَستَطيلُ ويَطولُ",
        "نَترُكُهُ فَيَعودُ كَما كانَ"
      ]
    },

    // ⑯ بطاقات الذاكرة (إثرائي) — 2Cp4 معرفة
    {
      type: "memory",
      objective: "2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي",
      level: "knowledge",
      prompt: "اعثُرْ على الأزواجِ المُتَطابِقَةِ: اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ.",
      pairs: [
        { a: "الرِّباطُ المَطّاطِيُّ", b: "يَستَطيلُ ثُمَّ يَعودُ" },
        { a: "الإسفَنجَةُ",          b: "تَنضَغِطُ ثُمَّ تَنتَفِخُ" },
        { a: "النَّابِضُ",             b: "يَنكَمِشُ ثُمَّ يَمتَدُّ" },
        { a: "الصَّخرُ",              b: "لا يَتَغَيَّرُ شَكلُهُ" }
      ]
    }

  ],

  // الدرس الرابع: التسخين والتبريد
  "g2s-3-4": [

    // ④ صواب وخطأ (الأسهل) — 2Cp5 معرفة
    {
      type: "true-false",
      objective: "2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد",
      level: "knowledge",
      statement: "الثَّلجُ يَذوبُ ويُصبِحُ ماءً عِندَ تَسخينِهِ.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp5 معرفة
    {
      type: "mcq",
      objective: "2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد",
      level: "knowledge",
      prompt: "ماذا يَحدُثُ للماءِ إذا وَضَعناهُ في المُجَمِّدِ؟",
      options: ["يَتَجَمَّدُ ويُصبِحُ ثَلجاً", "يَغلي", "يَختَفي", "يُصبِحُ مِلحاً"],
      answer: 0
    },

    // ② توصيل — 2Cp5 معرفة (كلّ حالة وما يحدث فيها)
    {
      type: "matching",
      objective: "2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد",
      level: "knowledge",
      prompt: "صِلْ كُلَّ حالَةٍ بما يَحدُثُ فيها.",
      pairs: [
        { a: "الشُّوكولاتَةُ في الشَّمسِ", b: "تَنصَهِرُ" },
        { a: "الماءُ في المُجَمِّدِ",       b: "يَتَجَمَّدُ" },
        { a: "الماءُ على النَّارِ",         b: "يَغلي" },
        { a: "العَجينُ في الفُرنِ",        b: "يُصبِحُ خُبزاً" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp5 تطبيق (فراغان فقط — قيد السعة)
    {
      type: "fill-blank",
      objective: "2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "التَّسخينُ يُذيبُ {} ، والتَّبريدُ يُجَمِّدُ {}.",
      answers: ["الثَّلجَ", "الماءَ"],
      distractors: ["الصَّخرَ"]
    },

    // ⑥ الترتيب التسلسلي — 2Cp5 استدلال (رحلة مكعّب الثلج مع التسخين)
    {
      type: "sequence",
      objective: "2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد",
      level: "reasoning",
      prompt: "رَتِّبْ ما يَحدُثُ لمُكَعَّبِ الثَّلجِ عِندَ تَسخينِهِ.",
      steps: [
        "مُكَعَّبُ ثَلجٍ صُلبٌ",
        "يَبدَأُ الذَّوَبانُ",
        "يُصبِحُ ماءً سائِلاً",
        "يَغلي فَيَتَصاعَدُ البُخارُ"
      ]
    },

    // ⑩ التلوين بالتعليمات (إثرائي) — 2Cp5 تطبيق (الساخن أحمر والبارد أزرق)
    // نسبة الرسم ١٫٧٤ (≤ 2.2). الأسماء مخفيّة (showLabels:false) كي يُميّز الطالب بالصورة.
    {
      type: "color",
      objective: "2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد",
      level: "application",
      prompt: "لَوِّنِ السَّاخِنَ بالأحمَرِ والباردَ بالأزرَقِ: اختَرْ لَوناً ثُمَّ اضغَطِ الشَّيءَ.",
      bg: "#f3f6f8",
      showLabels: false,
      palette: [
        { name: "أحمر", color: "#cf3b3b" },
        { name: "أزرق", color: "#2f6fb0" },
        { name: "أصفر", color: "#f2c230" }
      ],
      parts: [
        { name: "كوب الشاي",  color: "#cf3b3b" },
        { name: "الخبز",      color: "#cf3b3b" },
        { name: "مكعب الثلج", color: "#2f6fb0" },
        { name: "المثلجات",   color: "#2f6fb0" }
      ],
      svg: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="كوب شاي وخبز ومكعب ثلج ومثلجات للتلوين">
        <!-- بخار كوب الشاي (ثابت لا يُلوَّن) -->
        <g fill="none" stroke="#c9d2d9" stroke-width="4" stroke-linecap="round">
          <path d="M86 30 q7 -9 0 -18"/><path d="M100 26 q7 -9 0 -18"/><path d="M114 30 q7 -9 0 -18"/>
        </g>
        <ellipse cx="100" cy="106" rx="48" ry="9" fill="#e6ded2" stroke="#5b4632" stroke-width="3"/>
        <g class="cpart" data-name="كوب الشاي" id="part-tea">
          <path d="M64 44 L72 94 Q74 102 100 102 Q126 102 128 94 L136 44 Z" stroke="#5b4632" stroke-width="4" stroke-linejoin="round"/>
          <path d="M134 54 Q156 54 156 68 Q156 82 134 82" fill="none" stroke="#5b4632" stroke-width="8" stroke-linecap="round"/>
        </g>
        <!-- بخار الخبز (ثابت) -->
        <g fill="none" stroke="#c9d2d9" stroke-width="4" stroke-linecap="round">
          <path d="M286 26 q7 -9 0 -18"/><path d="M312 26 q7 -9 0 -18"/>
        </g>
        <ellipse cx="300" cy="100" rx="50" ry="8" fill="#000" opacity="0.10"/>
        <g class="cpart" data-name="الخبز" id="part-bread">
          <path d="M254 96 Q248 58 276 48 Q300 34 324 48 Q352 58 346 96 Z" stroke="#7a5227" stroke-width="4" stroke-linejoin="round"/>
        </g>
        <g fill="none" stroke="#7a5227" stroke-width="3" stroke-linecap="round">
          <path d="M276 68 l14 -12"/><path d="M296 70 l14 -12"/><path d="M316 72 l12 -11"/>
        </g>
        <!-- مكعّب ثلج -->
        <ellipse cx="100" cy="212" rx="42" ry="7" fill="#000" opacity="0.10"/>
        <g class="cpart" data-name="مكعب الثلج" id="part-ice">
          <path d="M64 142 L100 128 L136 142 L136 194 L100 208 L64 194 Z" stroke="#39708c" stroke-width="4" stroke-linejoin="round"/>
        </g>
        <g fill="none" stroke="#39708c" stroke-width="3" stroke-linejoin="round">
          <path d="M64 142 L100 156 L136 142"/><path d="M100 156 L100 208"/>
        </g>
        <path d="M76 152 L94 145" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
        <!-- مثلّجات (المخروط ثابت والكرة تُلوَّن) -->
        <ellipse cx="300" cy="212" rx="34" ry="6" fill="#000" opacity="0.10"/>
        <path d="M270 152 L300 208 L330 152 Z" fill="#d9a441" stroke="#7a5227" stroke-width="4" stroke-linejoin="round"/>
        <g fill="none" stroke="#7a5227" stroke-width="2.5">
          <path d="M280 168 L312 162"/><path d="M288 182 L318 176"/><path d="M286 160 L296 186"/><path d="M304 156 L314 180"/>
        </g>
        <g class="cpart" data-name="المثلجات" id="part-icecream">
          <path d="M266 152 Q266 118 300 118 Q334 118 334 152 Z" stroke="#5b4632" stroke-width="4" stroke-linejoin="round"/>
        </g>
      </svg>`
    }

  ],

  // الدرس الخامس: لماذا تكون مياه البحر مالحة؟
  "g2s-3-5": [

    // ④ صواب وخطأ (الأسهل) — 2Cp6 معرفة
    {
      type: "true-false",
      objective: "2Cp6: يستكشف ذوبان بعض المواد في الماء وعدم ذوبان غيرها",
      level: "knowledge",
      statement: "مياهُ البَحرِ مالِحَةٌ لأنَّ فيها مِلحاً ذائِباً.",
      answer: true
    },

    // ③ اختيار من متعدد — 2Cp6 معرفة
    {
      type: "mcq",
      objective: "2Cp6: يستكشف ذوبان بعض المواد في الماء وعدم ذوبان غيرها",
      level: "knowledge",
      prompt: "ماذا يَحدُثُ للمِلحِ إذا حَرَّكناهُ في الماءِ؟",
      options: ["يَذوبُ فيهِ", "يَطفو فَوقَهُ", "يُصبِحُ رَملاً", "يَبقى كَما هُوَ"],
      answer: 0
    },

    // ② توصيل — 2Cp6 معرفة (كلّ ماء وطعمه، وكلّ مادة وسلوكها في الماء)
    {
      type: "matching",
      objective: "2Cp6: يستكشف ذوبان بعض المواد في الماء وعدم ذوبان غيرها",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عِبارَةٍ بما يُناسِبُها.",
      pairs: [
        { a: "مياهُ البَحرِ",   b: "مالِحَةٌ" },
        { a: "مياهُ المَطَرِ",  b: "عَذبَةٌ" },
        { a: "المِلحُ في الماءِ", b: "يَذوبُ" },
        { a: "الرَّملُ في الماءِ", b: "لا يَذوبُ" }
      ]
    },

    // ⑧ ملء الفراغ بالسحب — 2Cp6 تطبيق (فراغان فقط — قيد السعة)
    {
      type: "fill-blank",
      objective: "2Cp6: يستكشف ذوبان بعض المواد في الماء وعدم ذوبان غيرها",
      level: "application",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "المِلحُ {} في الماءِ، أمّا الرَّملُ فَـ{} فيهِ.",
      answers: ["يَذوبُ", "يَرسُبُ"],
      distractors: ["يَطفو"]
    },

    // ⑦ التصنيف في مجموعات — 2Cp6 استدلال (مجموعتان × عنصران — قيد السعة)
    {
      type: "classify",
      objective: "2Cp6: يستكشف ذوبان بعض المواد في الماء وعدم ذوبان غيرها",
      level: "reasoning",
      prompt: "صَنِّفِ المَوادَّ: هل تَذوبُ في الماءِ أم لا؟",
      groups: [
        { name: "تَذوبُ في الماءِ",    items: ["مِلحٌ", "سُكَّرٌ"] },
        { name: "لا تَذوبُ في الماءِ", items: ["رَملٌ", "حَصىً"] }
      ]
    },

    // ⑨ اكتشف الخطأ (إثرائي) — 2Cp6 استدلال (كوب الرمل رُسم صافياً بلا رَسوب)
    // نسبة الرسم ١٫٦ (≤ 2.2)؛ التسميات داخل الرسم لأنّ الخطأ في العلاقة بين المادة والكوب.
    {
      type: "find-error",
      objective: "2Cp6: يستكشف ذوبان بعض المواد في الماء وعدم ذوبان غيرها",
      level: "reasoning",
      prompt: "الرَّملُ لا يَذوبُ في الماءِ. اضغَطْ على الكوبِ الَّذي رُسِمَ خَطَأً.",
      fit: "width",
      bg: "#eaf3fb",
      spot: { x: 81, y: 58, r: 13 },
      svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاثة أكواب ماء: ملح وسكر ورمل">
        <defs>
          <g id="jar">
            <ellipse cx="0" cy="196" rx="42" ry="7" fill="#000" opacity="0.10"/>
            <path d="M-36 92 L-32 180 Q-32 190 0 190 Q32 190 32 180 L36 92 Z" fill="#dff0f7" stroke="#6b7c88" stroke-width="4" stroke-linejoin="round"/>
            <path d="M-33.5 120 L-32 180 Q-32 187 0 187 Q32 187 32 180 L33.5 120 Z" fill="#9fd4ee"/>
            <ellipse cx="0" cy="120" rx="33.5" ry="6" fill="#c2e6f7"/>
            <path d="M-26 132 L-24 172" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
            <path d="M-36 92 L-32 180 Q-32 190 0 190 Q32 190 32 180 L36 92 Z" fill="none" stroke="#6b7c88" stroke-width="4" stroke-linejoin="round"/>
            <ellipse cx="0" cy="92" rx="36" ry="7" fill="none" stroke="#6b7c88" stroke-width="4"/>
          </g>
        </defs>
        <!-- كوب المِلح: حبيبات بيضاء تُسكب، والماء صافٍ (صحيح) -->
        <g transform="translate(76,0)">
          <use href="#jar"/>
          <g fill="#f4f7f9" stroke="#9aa7b0" stroke-width="2">
            <circle cx="-10" cy="60" r="5"/><circle cx="4" cy="50" r="5"/><circle cx="14" cy="66" r="5"/><circle cx="0" cy="74" r="4"/>
          </g>
          <text x="0" y="228" text-anchor="middle" font-size="21" font-weight="700" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">مِلحٌ</text>
        </g>
        <!-- كوب السُّكّر: مكعّبات تُسكب، والماء صافٍ (صحيح) -->
        <g transform="translate(200,0)">
          <use href="#jar"/>
          <g fill="#fdfaf2" stroke="#c2ac82" stroke-width="2">
            <rect x="-16" y="50" width="14" height="14" rx="2"/><rect x="2" y="60" width="14" height="14" rx="2"/><rect x="-4" y="36" width="12" height="12" rx="2"/>
          </g>
          <text x="0" y="228" text-anchor="middle" font-size="21" font-weight="700" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">سُكَّرٌ</text>
        </g>
        <!-- كوب الرَّمل: حبيبات بنّية تُسكب، لكنّ الماء رُسم صافياً بلا رَسوب في القاع (الخطأ) -->
        <g transform="translate(324,0)">
          <use href="#jar"/>
          <g fill="#c79a5a" stroke="#8a6a3f" stroke-width="2">
            <circle cx="-12" cy="58" r="5"/><circle cx="2" cy="48" r="5"/><circle cx="14" cy="64" r="5"/><circle cx="-2" cy="72" r="4"/>
          </g>
          <text x="0" y="228" text-anchor="middle" font-size="21" font-weight="700" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">رَملٌ</text>
        </g>
      </svg>`
    }

  ],

  /* ═══════════ العلوم — الصف الثالث · الوحدة الأولى: الاعتناءُ بالنّباتات ═══════════
     المصدر: كتاب التلميذ ص١٤–٢٣ (PDF ١٦–٢٥)، والأهداف من جدول «عبارات أستطيع»
     المستخرَج في المصادر/…/الصف الثالث/مادة العلوم/الأهداف.md.
     كل درس: ٥ أساسية (٥ أنواع مختلفة) بتوزيع ٣ معرفة + ١ تطبيق + ١ استدلال، وإثرائيّ
     واحد. الرسوم SVG بورقة المواصفات البصرية (حدّ #111111 بسماكة 3/2، سلالم ٣ درجات
     بحوافّ حادّة، لمعة بيضاء، بلا ملامح وجه). */

  // العلوم/الثالث — الوحدة ١، الدرس ١-١: النباتات وأجزاؤها (ص١٤–١٥)
  "g3s-1-1": [

    // ① صواب/خطأ — معرفة — 3Bp1
    {
      type: "true-false",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "knowledge",
      prompt: "لِمُعْظَمِ النَّباتاتِ أَربَعةُ أَجزاءٍ رَئيسيَّةٍ.",
      answer: true,
      reason: "أَجزاؤُها الرَّئيسيَّةُ: الجُذورُ والسّاقُ والأَوراقُ والأَزهارُ"
    },

    // ② اختيار من متعدد — معرفة — 3Bp1
    {
      type: "mcq",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "knowledge",
      prompt: "أَيُّ جُزءٍ مِنَ النَّبتةِ يَصنَعُ الغِذاءَ؟",
      options: ["الأَوراقُ", "الجُذورُ", "السّاقُ", "الأَزهارُ"],
      answer: 0,
      reason: "الأَوراقُ تَصنَعُ الغِذاءَ لِلنَّبتةِ"
    },

    // ③ التوصيل — معرفة — 3Bp1
    {
      type: "matching",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "knowledge",
      prompt: "صِلْ كُلَّ جُزءٍ مِنَ النَّبتةِ بِوَظيفَتِهِ.",
      pairs: [
        { a: "الجُذورُ", b: "تُثَبِّتُ النَّبتةَ وتَمْتَصُّ الماءَ" },
        { a: "السّاقُ",  b: "تَنقُلُ الماءَ إلى بَقيَّةِ الأَجزاءِ" },
        { a: "الأَوراقُ", b: "تَصنَعُ الغِذاءَ" },
        { a: "الأَزهارُ", b: "تُساعِدُ على إنتاجِ البُذورِ" }
      ]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bp1
    {
      type: "hotspot",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "application",
      prompt: "اضغَطْ على الجُزءِ الَّذي يَمْتَصُّ الماءَ مِنَ التُّربةِ.",
      bg: "#eef7ff",
      spot: { x: 50, y: 82, r: 16 },
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتة بأجزائها: جذور وساق وأوراق وزهرة">
        <rect x="0" y="300" width="600" height="130" fill="#9A6636"/>
        <rect x="0" y="300" width="600" height="14" fill="#7A4C22"/>
        <rect x="0" y="392" width="600" height="38" fill="#7A4C22"/>
        <line x1="0" y1="300" x2="600" y2="300" stroke="#111111" stroke-width="3"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q297 352 294 404" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <path d="M300 306 Q297 352 294 404" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#F9F8F3" stroke-width="3"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#F9F8F3" stroke-width="3"/>
        <path d="M300 306 Q297 352 294 404" fill="none" stroke="#F9F8F3" stroke-width="3"/>
        <line x1="300" y1="308" x2="300" y2="118" stroke="#111111" stroke-width="15"/>
        <line x1="300" y1="308" x2="300" y2="118" stroke="#4A9018" stroke-width="11"/>
        <line x1="298" y1="304" x2="298" y2="122" stroke="#60C020" stroke-width="6"/>
        <line x1="296" y1="300" x2="296" y2="128" stroke="#80C020" stroke-width="2.5"/>
        <path d="M300 232 Q252 216 226 224 Q252 254 300 232 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 232 Q252 216 226 224 Q256 231 300 232 Z" fill="#80C020"/>
        <path d="M300 232 Q256 231 226 224 Q252 254 300 232 Z" fill="#4A9018"/>
        <path d="M300 232 Q252 216 226 224 Q252 254 300 232 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <path d="M300 195 Q348 179 374 187 Q348 217 300 195 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 195 Q348 179 374 187 Q344 193 300 195 Z" fill="#80C020"/>
        <path d="M300 195 Q344 193 374 187 Q348 217 300 195 Z" fill="#4A9018"/>
        <path d="M300 195 Q348 179 374 187 Q348 217 300 195 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <g stroke="#111111" stroke-width="3">
          <ellipse cx="300" cy="66" rx="22" ry="30" fill="#E07E8A"/>
          <ellipse cx="338" cy="88" rx="30" ry="22" fill="#E07E8A"/>
          <ellipse cx="262" cy="88" rx="30" ry="22" fill="#E07E8A"/>
          <ellipse cx="326" cy="126" rx="24" ry="26" fill="#E07E8A"/>
          <ellipse cx="274" cy="126" rx="24" ry="26" fill="#E07E8A"/>
          <circle cx="300" cy="100" r="26" fill="#FFA000"/>
          <path d="M279.4 92 A26 26 0 0 1 320.6 92 Z" fill="#FFFFC0" stroke="none"/>
          <ellipse cx="290" cy="88" rx="8" ry="3.5" transform="rotate(-24 290 88)" fill="#FFFFFF" stroke="none"/>
        </g>
      </svg>`
    },

    // ⑤ ملء الفراغ — استدلال — 3Bp4
    {
      type: "fill-blank",
      objective: "3Bp4: يعرف أن النباتات تحتاج إلى جذور وأوراق وسيقان سليمة لتنمو بشكل جيد",
      level: "reasoning",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "إذا صارَتْ جُذورُ النَّبتةِ غَيرَ سَليمةٍ فَلَنْ تَمْتَصَّ {}، وسَتُصبِحُ النَّبتةُ {}.",
      answers: ["الماءَ", "ذابِلةً"],
      distractors: ["الغِذاءَ", "قَويَّةً"]
    },

    // ⑥ إثرائي: التلوين بالتعليمات — تطبيق — 3Bp1
    {
      type: "color",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "application",
      prompt: "لَوِّنْ أَجزاءَ النَّبتةِ: اختَرْ لَوناً مِنَ اللَّوحةِ ثُمَّ اضغَطِ الجُزءَ.",
      bg: "#eef7ff",
      palette: [
        { name: "بنّي",  color: "#8a5a2b" },
        { name: "أخضر", color: "#3e9b4f" },
        { name: "وردي", color: "#e0708a" }
      ],
      parts: [
        { name: "الجُذورُ", color: "#8a5a2b" },
        { name: "السّاقُ",  color: "#3e9b4f" },
        { name: "الأَزهارُ", color: "#e0708a" }
      ],
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتة للتلوين: جذور وساق وأزهار">
        <rect x="0" y="300" width="600" height="130" fill="#efe4d2"/>
        <line x1="0" y1="300" x2="600" y2="300" stroke="#111111" stroke-width="3"/>
        <g class="cpart" data-name="الجُذورُ" id="part-roots">
          <path d="M288 300 L312 300 L308 336 L336 396 L316 400 L300 352 L284 400 L264 396 L292 336 Z"/>
        </g>
        <g class="cpart" data-name="السّاقُ" id="part-stem">
          <rect x="288" y="120" width="24" height="184" rx="8"/>
        </g>
        <path d="M300 232 Q252 216 226 224 Q252 254 300 232 Z" fill="#63c154" stroke="#111111" stroke-width="3"/>
        <path d="M300 195 Q348 179 374 187 Q348 217 300 195 Z" fill="#63c154" stroke="#111111" stroke-width="3"/>
        <g class="cpart" data-name="الأَزهارُ" id="part-flowers">
          <ellipse cx="300" cy="66" rx="22" ry="30"/>
          <ellipse cx="338" cy="88" rx="30" ry="22"/>
          <ellipse cx="262" cy="88" rx="30" ry="22"/>
          <ellipse cx="326" cy="126" rx="24" ry="26"/>
          <ellipse cx="274" cy="126" rx="24" ry="26"/>
        </g>
        <circle cx="300" cy="100" r="26" fill="#FFA000" stroke="#111111" stroke-width="3"/>
      </svg>`
    }

  ],

  // العلوم/الثالث — الوحدة ١، الدرس ١-٢: النباتات بحاجة إلى الضوء والماء (ص١٦–١٧)
  "g3s-1-2": [

    // ① صواب/خطأ — معرفة — 3Bp2
    {
      type: "true-false",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "knowledge",
      prompt: "تَحتاجُ النَّباتاتُ إلى الضَّوءِ والماءِ لِتَنمُوَ سَليمةً.",
      answer: true,
      reason: "الضَّوءُ والماءُ يُساعِدانِ النَّباتاتِ على صُنعِ الغِذاءِ"
    },

    // ② اختيار من متعدد — معرفة — 3Bp2
    {
      type: "mcq",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "knowledge",
      prompt: "ماذا يَحدُثُ لِلنَّبتةِ إذا لَمْ تَحصُلْ على الماءِ؟",
      options: ["تَذبُلُ", "تُزهِرُ أَكثَرَ", "يَكبُرُ حَجمُها", "يَصيرُ لَونُها أَزرَقَ"],
      answer: 0,
      reason: "بِلا ماءٍ تَذبُلُ النَّبتةُ وتَتَدَلّى أَوراقُها"
    },

    // ③ ملء الفراغ — معرفة — 3Bp2
    {
      type: "fill-blank",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "يُساعِدُ {} و{} النَّباتاتِ على صُنعِ الغِذاءِ.",
      answers: ["الضَّوءُ", "الماءُ"],
      distractors: ["الرَّملُ", "الظَّلامُ"]
    },

    // ④ سحب وإفلات — تطبيق — 3Bp2
    {
      type: "drag-drop",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "application",
      prompt: "اسحَبِ اسمَ ما تَحتاجُهُ النَّبتةُ إلى مَكانِهِ في الصّورةِ.",
      bg: "#eef7ff",
      targets: [
        { answer: "الضَّوءُ", box:{x:84,y:10}, dot:{x:83,y:19} },
        { answer: "الماءُ",   box:{x:16,y:30}, dot:{x:19,y:35} },
        { answer: "التُّربةُ", box:{x:84,y:82}, dot:{x:50,y:84} }
      ],
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتة في أصيص مع شمس ومرشّة ماء">
        <g stroke="#111111" stroke-width="3">
          <polygon points="562,82 545.3,92.2 549.9,111.2 530.9,106.6 520,124 509.1,106.6 490.1,111.2 494.7,92.2 478,82 494.7,71.8 490.1,52.8 509.1,57.4 520,40 530.9,57.4 549.9,52.8 545.3,71.8" fill="#E08000"/>
          <circle cx="520" cy="82" r="27" fill="#FFA000"/>
          <path d="M501.4 72 A27 27 0 0 1 538.6 72 Z" fill="#FFFFC0" stroke="none"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="70" y="128" width="96" height="66" rx="14" fill="#20A0FF"/>
          <rect x="78" y="134" width="80" height="16" rx="8" fill="#40C0FF" stroke="none"/>
          <rect x="78" y="176" width="80" height="12" rx="6" fill="#2080E0" stroke="none"/>
          <rect x="70" y="128" width="96" height="66" rx="14" fill="none"/>
          <path d="M166 142 L206 118 L214 132 L176 156 Z" fill="#20A0FF"/>
          <path d="M96 128 Q112 100 140 108" fill="none" stroke-width="9"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <path d="M206 122 Q202 140 212 150" fill="none" stroke="#40C0FF" stroke-width="7"/>
          <path d="M222 126 Q220 144 230 154" fill="none" stroke="#40C0FF" stroke-width="7"/>
        </g>
        <rect x="196" y="330" width="208" height="86" rx="14" fill="#C06000" stroke="#111111" stroke-width="3"/>
        <rect x="204" y="336" width="192" height="18" fill="#E08000"/>
        <rect x="204" y="392" width="192" height="18" fill="#984800"/>
        <rect x="196" y="330" width="208" height="86" rx="14" fill="none" stroke="#111111" stroke-width="3"/>
        <rect x="186" y="306" width="228" height="30" rx="10" fill="#E08000" stroke="#111111" stroke-width="3"/>
        <line x1="300" y1="336" x2="300" y2="220" stroke="#111111" stroke-width="15"/>
        <line x1="300" y1="336" x2="300" y2="220" stroke="#4A9018" stroke-width="11"/>
        <line x1="298" y1="332" x2="298" y2="224" stroke="#60C020" stroke-width="6"/>
        <path d="M300 268 Q256 252 232 260 Q256 290 300 268 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 268 Q256 252 232 260 Q260 267 300 268 Z" fill="#80C020"/>
        <path d="M300 268 Q256 252 232 260 Q256 290 300 268 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <path d="M300 240 Q344 224 368 232 Q344 262 300 240 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 240 Q344 224 368 232 Q340 238 300 240 Z" fill="#80C020"/>
        <path d="M300 240 Q344 224 368 232 Q344 262 300 240 Z" fill="none" stroke="#111111" stroke-width="3"/>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bp2
    {
      type: "classify",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ حالةٍ: نَبتةٌ سَتَنمو سَليمةً أَم نَبتةٌ سَتَذبُلُ؟",
      groups: [
        { name: "سَتَنمو سَليمةً", items: ["في نافِذةٍ مُشمِسةٍ وتُروى كُلَّ يَومٍ", "تُروى بانتِظامٍ وتَبقى في الضَّوءِ"] },
        { name: "سَتَذبُلُ", items: ["داخِلَ عُلبةٍ مُغلَقةٍ مُظلِمةٍ", "لَمْ تُروَ مُنذُ أُسبوعٍ"] }
      ]
    },

    // ⑥ إثرائي: اكتشف الخطأ — استدلال — 3Bp2
    {
      type: "find-error",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "reasoning",
      prompt: "في هذا المَشهَدِ خَطَأٌ يَمنَعُ النَّبتةَ مِنَ النُّمُوِّ — اضغَطْ عَلَيهِ.",
      bg: "#eef7ff",
      fit: "width",
      spot: { x: 72, y: 52, r: 20 },
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتة في الضوء وأخرى تحت صندوق مغلق">
        <g stroke="#111111" stroke-width="3">
          <polygon points="118,52 105.4,59.7 108.9,74 94.6,70.5 86,84 77.4,70.5 63.1,74 66.6,59.7 54,52 66.6,44.3 63.1,30 77.4,33.5 86,20 94.6,33.5 108.9,30 105.4,44.3" fill="#E08000"/>
          <circle cx="86" cy="52" r="20" fill="#FFA000"/>
          <path d="M72.2 44.5 A20 20 0 0 1 99.8 44.5 Z" fill="#FFFFC0" stroke="none"/>
        </g>
        <rect x="120" y="236" width="150" height="52" rx="10" fill="#C06000" stroke="#111111" stroke-width="3"/>
        <rect x="126" y="240" width="138" height="12" fill="#E08000"/>
        <rect x="120" y="236" width="150" height="52" rx="10" fill="none" stroke="#111111" stroke-width="3"/>
        <line x1="195" y1="240" x2="195" y2="168" stroke="#111111" stroke-width="13"/>
        <line x1="195" y1="240" x2="195" y2="168" stroke="#4A9018" stroke-width="9"/>
        <path d="M195 200 Q162 188 144 194 Q162 216 195 200 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M195 182 Q228 170 246 176 Q228 198 195 182 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <rect x="380" y="236" width="150" height="52" rx="10" fill="#C06000" stroke="#111111" stroke-width="3"/>
        <path d="M368 236 L368 96 L410 66 L560 66 L560 206 L518 236 Z" fill="#8A5A2B" stroke="#111111" stroke-width="3"/>
        <path d="M368 96 L410 66 L560 66 L518 96 Z" fill="#B98551" stroke="#111111" stroke-width="3"/>
        <path d="M518 96 L560 66 L560 206 L518 236 Z" fill="#6B4320" stroke="#111111" stroke-width="3"/>
        <line x1="368" y1="96" x2="518" y2="96" stroke="#111111" stroke-width="3"/>
      </svg>`
    }

  ],

  // العلوم/الثالث — الوحدة ١، الدرس ١-٣: نقل الماء (ص١٨–١٩)
  "g3s-1-3": [

    // ① اختيار من متعدد — معرفة — 3Bp3
    {
      type: "mcq",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "knowledge",
      prompt: "أَيُّ جُزءٍ مِنَ النَّبتةِ يَمْتَصُّ الماءَ مِنَ التُّربةِ؟",
      options: ["الجُذورُ", "السّاقُ", "الأَوراقُ", "الأَزهارُ"],
      answer: 0,
      reason: "الجُذورُ تَمْتَصُّ الماءَ مِنَ التُّربةِ ثُمَّ تَنقُلُهُ إلى السّاقِ"
    },

    // ② صواب/خطأ — معرفة — 3Bp3
    {
      type: "true-false",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "knowledge",
      prompt: "تَنقُلُ السّاقُ الماءَ إلى الأَوراقِ والأَزهارِ.",
      answer: true,
      reason: "السّاقُ طَريقُ الماءِ مِنَ الجُذورِ إلى بَقيَّةِ أَجزاءِ النَّبتةِ"
    },

    // ③ التوصيل — معرفة — 3Bp3
    {
      type: "matching",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "knowledge",
      prompt: "صِلْ كُلَّ جُزءٍ بِدَورِهِ في رِحلةِ الماءِ.",
      pairs: [
        { a: "التُّربةُ", b: "فيها الماءُ" },
        { a: "الجُذورُ", b: "تَمْتَصُّ الماءَ" },
        { a: "السّاقُ",  b: "تَنقُلُ الماءَ إلى أَعلى" },
        { a: "الأَوراقُ", b: "يَصِلُها الماءُ أَخيراً" }
      ]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bp3
    {
      type: "hotspot",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "application",
      prompt: "اضغَطْ على الجُزءِ الَّذي يَنقُلُ الماءَ مِنَ الجُذورِ إلى الأَوراقِ.",
      bg: "#eef7ff",
      spot: { x: 50, y: 50, r: 14 },
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="مسار الماء في النبتة من الجذور إلى الأوراق">
        <rect x="0" y="300" width="600" height="130" fill="#9A6636"/>
        <rect x="0" y="300" width="600" height="14" fill="#7A4C22"/>
        <line x1="0" y1="300" x2="600" y2="300" stroke="#111111" stroke-width="3"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <line x1="300" y1="308" x2="300" y2="140" stroke="#111111" stroke-width="15"/>
        <line x1="300" y1="308" x2="300" y2="140" stroke="#4A9018" stroke-width="11"/>
        <line x1="298" y1="304" x2="298" y2="144" stroke="#60C020" stroke-width="6"/>
        <path d="M300 236 Q252 220 226 228 Q252 258 300 236 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 236 Q252 220 226 228 Q256 235 300 236 Z" fill="#80C020"/>
        <path d="M300 236 Q252 220 226 228 Q252 258 300 236 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <path d="M300 196 Q348 180 374 188 Q348 218 300 196 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 196 Q348 180 374 188 Q344 194 300 196 Z" fill="#80C020"/>
        <path d="M300 196 Q348 180 374 188 Q348 218 300 196 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <g stroke="#20A0FF" stroke-width="7" fill="none" stroke-dasharray="14 10">
          <path d="M262 372 Q286 340 300 300"/>
          <path d="M338 372 Q314 340 300 300"/>
          <path d="M300 296 L300 168"/>
        </g>
        <g fill="#20A0FF" stroke="#111111" stroke-width="2">
          <polygon points="300,152 310,176 290,176"/>
          <polygon points="268,226 246,238 262,220"/>
          <polygon points="332,190 354,180 340,198"/>
        </g>
      </svg>`
    },

    // ⑤ الترتيب التسلسلي — استدلال — 3Bp3
    {
      type: "sequence",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "reasoning",
      prompt: "رَتِّبْ رِحلةَ الماءِ في النَّبتةِ مِنَ البِدايةِ إلى النِّهايةِ.",
      steps: [
        "الماءُ في التُّربةِ",
        "تَمْتَصُّهُ الجُذورُ",
        "تَنقُلُهُ السّاقُ إلى أَعلى",
        "يَصِلُ إلى الأَوراقِ والأَزهارِ"
      ]
    },

    // ⑥ إثرائي: الخريطة الذهنية — استدلال — 3Bp3
    {
      type: "mindmap",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "reasoning",
      prompt: "أَكمِلْ خَريطةَ رِحلةِ الماءِ بِسَحبِ الكَلِمةِ المُناسِبةِ إلى كُلِّ فَرعٍ.",
      center: "رِحلةُ الماءِ",
      branches: [
        { label: "يَبدَأُ مِنْ",   answer: "التُّربةِ" },
        { label: "يَمْتَصُّهُ",    answer: "الجُذورُ" },
        { label: "يَنقُلُهُ",      answer: "السّاقُ" },
        { label: "يَصِلُ إلى",     answer: "الأَوراقِ" }
      ],
      distractors: ["الحَجَرِ", "الرّيحِ"]
    }

  ],

  // العلوم/الثالث — الوحدة ١، الدرس ١-٤: نمو النباتات ودرجة الحرارة (ص٢٠–٢١)
  "g3s-1-4": [

    // ① صواب/خطأ — معرفة — 3Bp5
    {
      type: "true-false",
      objective: "3Bp5: يعرف أن نمو النبات يتأثر بدرجة الحرارة",
      level: "knowledge",
      prompt: "تَتَأَثَّرُ سُرعةُ نُمُوِّ النَّبتةِ بِدَرَجةِ الحَرارةِ.",
      answer: true,
      reason: "النَّبتةُ تَنمو أَفضَلَ في الدِّفءِ المُعتَدِلِ، وببُطءٍ في البَردِ الشَّديدِ"
    },

    // ② اختيار من متعدد — معرفة — 3Bp5
    {
      type: "mcq",
      objective: "3Bp5: يعرف أن نمو النبات يتأثر بدرجة الحرارة",
      level: "knowledge",
      prompt: "في أَيِّ مَكانٍ تَنمو النَّبتةُ أَفضَلَ؟",
      options: ["مَكانٌ دافِئٌ مُعتَدِلٌ", "مَكانٌ شَديدُ البُرودةِ", "مَكانٌ مُغَطّى بِالثَّلجِ", "مَكانٌ مُظلِمٌ بارِدٌ"],
      answer: 0,
      reason: "الدِّفءُ المُعتَدِلُ أَنسَبُ لِنُمُوِّ مُعظَمِ النَّباتاتِ"
    },

    // ③ ملء الفراغ — معرفة — 3Bp5
    {
      type: "fill-blank",
      objective: "3Bp5: يعرف أن نمو النبات يتأثر بدرجة الحرارة",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "تَنمو النَّبتةُ ببُطءٍ في المَكانِ {}، وتَنمو أَفضَلَ في المَكانِ {}.",
      answers: ["البارِدِ", "الدّافِئِ"],
      distractors: ["الرَّطبِ", "المُغبَرِّ"]
    },

    // ④ سحب وإفلات — تطبيق — 3Eo2 (هدف استقصاء: القياس بأدوات بسيطة)
    {
      type: "drag-drop",
      objective: "3Eo2: يقيس باستخدام معدات بسيطة ويسجل الملاحظات بطرق متنوعة",
      level: "application",
      prompt: "اسحَبِ اسمَ كُلِّ أَداةٍ إلى ما تَقيسُهُ.",
      bg: "#eef7ff",
      fit: "width",
      targets: [
        { answer: "المِسطَرةُ",       box:{x:18,y:14}, dot:{x:26,y:55} },
        { answer: "مِقياسُ الحَرارةِ", box:{x:82,y:14}, dot:{x:74,y:55} }
      ],
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="مسطرة ومقياس حرارة">
        <rect x="96" y="120" width="70" height="150" rx="10" fill="#E08000" stroke="#111111" stroke-width="3"/>
        <rect x="104" y="126" width="54" height="16" fill="#FFA000"/>
        <rect x="96" y="120" width="70" height="150" rx="10" fill="none" stroke="#111111" stroke-width="3"/>
        <g stroke="#111111" stroke-width="3">
          <line x1="112" y1="140" x2="150" y2="140"/><line x1="112" y1="162" x2="150" y2="162"/>
          <line x1="112" y1="184" x2="150" y2="184"/><line x1="112" y1="206" x2="150" y2="206"/>
          <line x1="112" y1="228" x2="150" y2="228"/><line x1="112" y1="250" x2="150" y2="250"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="452" y="90" width="34" height="140" rx="17" fill="#F9F8F3"/>
          <rect x="458" y="96" width="10" height="120" rx="5" fill="#FFFFFF" stroke="none"/>
          <rect x="452" y="90" width="34" height="140" rx="17" fill="none"/>
          <circle cx="469" cy="244" r="26" fill="#FF2020"/>
          <path d="M449.4 236 A26 26 0 0 1 488.6 236 Z" fill="#FF4020" stroke="none"/>
          <circle cx="469" cy="244" r="26" fill="none"/>
          <rect x="461" y="160" width="16" height="76" fill="#FF2020" stroke="none"/>
          <line x1="492" y1="118" x2="512" y2="118"/><line x1="492" y1="142" x2="512" y2="142"/>
          <line x1="492" y1="166" x2="512" y2="166"/><line x1="492" y1="190" x2="512" y2="190"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bp5
    {
      type: "classify",
      objective: "3Bp5: يعرف أن نمو النبات يتأثر بدرجة الحرارة",
      level: "reasoning",
      prompt: "صَنِّفِ الأَماكِنَ: تَنمو فيها النَّبتةُ جَيِّداً أَمْ لا تَنمو جَيِّداً؟",
      groups: [
        { name: "تَنمو جَيِّداً", items: ["نافِذةٌ دافِئةٌ مُشمِسةٌ", "غُرفةُ الصَّفِّ المُعتَدِلةُ"] },
        { name: "لا تَنمو جَيِّداً", items: ["داخِلَ الثَّلّاجةِ", "مَكانٌ مُغَطّى بِالثَّلجِ"] }
      ]
    },

    // ⑥ إثرائي: الشريط المتدرّج — تطبيق — 3Bp5 (أول استعمال للنوع في المنصّة)
    {
      type: "slider",
      objective: "3Bp5: يعرف أن نمو النبات يتأثر بدرجة الحرارة",
      level: "application",
      prompt: "قَدِّرْ: عِندَ أَيِّ دَرَجةِ حَرارةٍ تَنمو مُعظَمُ النَّباتاتِ أَفضَلَ؟",
      min: 0, max: 50, answer: 25, tolerance: 5, unit: "°س", ticks: 10,
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="مقياس حرارة">
        <g stroke="#111111" stroke-width="3">
          <rect x="290" y="40" width="46" height="180" rx="23" fill="#F9F8F3"/>
          <rect x="298" y="48" width="12" height="156" rx="6" fill="#FFFFFF" stroke="none"/>
          <rect x="290" y="40" width="46" height="180" rx="23" fill="none"/>
          <circle cx="313" cy="240" r="36" fill="#FF2020"/>
          <path d="M285.6 229 A36 36 0 0 1 340.4 229 Z" fill="#FF4020" stroke="none"/>
          <circle cx="313" cy="240" r="36" fill="none"/>
          <rect x="303" y="130" width="20" height="96" fill="#FF2020" stroke="none"/>
          <line x1="344" y1="70" x2="372" y2="70"/><line x1="344" y1="100" x2="372" y2="100"/>
          <line x1="344" y1="130" x2="380" y2="130"/><line x1="344" y1="160" x2="372" y2="160"/>
          <line x1="344" y1="190" x2="372" y2="190"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الثالث — الوحدة ١، الدرس ١-٥: تحقّق من تقدّمك (ص٢٢–٢٣)
  // درس مراجعة: يعيد استخدام رسوم الوحدة ولا يُنشئ رسوماً جديدة (قاعدة CLAUDE.md)
  "g3s-1-5": [

    // ① اختيار من متعدد — معرفة — 3Bp1
    {
      type: "mcq",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "knowledge",
      prompt: "أَيُّ الأَجزاءِ يُساعِدُ النَّبتةَ على إنتاجِ البُذورِ؟",
      options: ["الأَزهارُ", "الجُذورُ", "السّاقُ", "الأَوراقُ"],
      answer: 0,
      reason: "الأَزهارُ تُساعِدُ النَّبتةَ على إنتاجِ البُذورِ"
    },

    // ② صواب/خطأ — معرفة — 3Bp2
    {
      type: "true-false",
      objective: "3Bp2: يشرح الملاحظات المرتبطة بحاجة النباتات إلى الضوء والماء لتنمو",
      level: "knowledge",
      prompt: "تَستَطيعُ النَّبتةُ أَنْ تَنمُوَ سَليمةً في الظَّلامِ التّامِّ.",
      answer: false,
      reason: "بِلا ضَوءٍ لا تَصنَعُ النَّبتةُ غِذاءَها فَتَذبُلُ"
    },

    // ③ ملء الفراغ — معرفة — 3Bp3
    {
      type: "fill-blank",
      objective: "3Bp3: يعرف أن الماء يُمتص بواسطة الجذور ويُنقل عبر الساق",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "تَمْتَصُّ {} الماءَ مِنَ التُّربةِ، وتَنقُلُهُ {} إلى الأَوراقِ.",
      answers: ["الجُذورُ", "السّاقُ"],
      distractors: ["الأَزهارُ", "التُّربةُ"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bp1 (نفس رسم الدرس ١-١)
    {
      type: "hotspot",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "application",
      prompt: "اضغَطْ على الجُزءِ الَّذي يَصنَعُ الغِذاءَ لِلنَّبتةِ.",
      bg: "#eef7ff",
      spot: { x: 44, y: 53, r: 14 },
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتة بأجزائها: جذور وساق وأوراق وزهرة">
        <rect x="0" y="300" width="600" height="130" fill="#9A6636"/>
        <rect x="0" y="300" width="600" height="14" fill="#7A4C22"/>
        <rect x="0" y="392" width="600" height="38" fill="#7A4C22"/>
        <line x1="0" y1="300" x2="600" y2="300" stroke="#111111" stroke-width="3"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#111111" stroke-width="11"/>
        <path d="M300 306 Q268 344 240 396" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <path d="M300 306 Q332 344 360 396" fill="none" stroke="#D8D6D0" stroke-width="7"/>
        <line x1="300" y1="308" x2="300" y2="118" stroke="#111111" stroke-width="15"/>
        <line x1="300" y1="308" x2="300" y2="118" stroke="#4A9018" stroke-width="11"/>
        <line x1="298" y1="304" x2="298" y2="122" stroke="#60C020" stroke-width="6"/>
        <path d="M300 232 Q252 216 226 224 Q252 254 300 232 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 232 Q252 216 226 224 Q256 231 300 232 Z" fill="#80C020"/>
        <path d="M300 232 Q252 216 226 224 Q252 254 300 232 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <path d="M300 195 Q348 179 374 187 Q348 217 300 195 Z" fill="#60C020" stroke="#111111" stroke-width="3"/>
        <path d="M300 195 Q348 179 374 187 Q344 193 300 195 Z" fill="#80C020"/>
        <path d="M300 195 Q348 179 374 187 Q348 217 300 195 Z" fill="none" stroke="#111111" stroke-width="3"/>
        <g stroke="#111111" stroke-width="3">
          <ellipse cx="300" cy="66" rx="22" ry="30" fill="#E07E8A"/>
          <ellipse cx="338" cy="88" rx="30" ry="22" fill="#E07E8A"/>
          <ellipse cx="262" cy="88" rx="30" ry="22" fill="#E07E8A"/>
          <ellipse cx="326" cy="126" rx="24" ry="26" fill="#E07E8A"/>
          <ellipse cx="274" cy="126" rx="24" ry="26" fill="#E07E8A"/>
          <circle cx="300" cy="100" r="26" fill="#FFA000"/>
          <path d="M279.4 92 A26 26 0 0 1 320.6 92 Z" fill="#FFFFC0" stroke="none"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bp5
    {
      type: "classify",
      objective: "3Bp5: يعرف أن نمو النبات يتأثر بدرجة الحرارة",
      level: "reasoning",
      prompt: "صَنِّفْ: أَيُّها يُساعِدُ النَّبتةَ على النُّمُوِّ وأَيُّها يَضُرُّ بِنُمُوِّها؟",
      groups: [
        { name: "يُساعِدُ على النُّمُوِّ", items: ["ماءٌ كافٍ", "ضَوءُ الشَّمسِ", "دِفءٌ مُعتَدِلٌ"] },
        { name: "يَضُرُّ بِالنُّمُوِّ", items: ["ظَلامٌ تامٌّ", "بَردٌ شَديدٌ", "عَطَشٌ طَويلٌ"] }
      ]
    },

    // ⑥ إثرائي: الاستبعاد — استدلال — 3Bp1
    {
      type: "exclude",
      objective: "3Bp1: يعرف أن النباتات لها جذور وأوراق وسيقان وأزهار",
      level: "reasoning",
      prompt: "أَيُّها لَيسَ جُزءاً مِنَ النَّبتةِ؟",
      options: ["الجُذورُ", "السّاقُ", "الأَوراقُ", "المِسطَرةُ"],
      answer: 3,
      reason: "المِسطَرةُ أَداةُ قِياسٍ، وبَقيَّةُ الخِياراتِ أَجزاءٌ مِنَ النَّبتةِ"
    }

  ],

  /* ═══════════ العلوم — الصف الثالث · الوحدة الثانية: الاعتناءُ بأنفسنا ═══════════
     المصدر: كتاب التلميذ ص٢٤–٣٣ (PDF ٢٦–٣٥). الأهداف: 3Bh3 (نظام غذائي كافٍ ومتنوّع
     وتمارين) و3Bh4 (أضرار السكّر والدهون)، ومعها 3Ep1 لخطوات التجربة.
     رسوم الوحدة **أشياءٌ بلا أشخاص** (قاعدة «بلا ملامح وجه» — CLAUDE.md). */

  // العلوم/الثالث — الوحدة ٢، الدرس ٢-١: المجموعات الغذائية (ص٢٤–٢٥)
  "g3s-2-1": [

    // ① اختيار من متعدد — معرفة — 3Bh3
    {
      type: "mcq",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "أَيُّ مَجموعةٍ غِذائيَّةٍ تُعطينا الطّاقةَ؟",
      options: ["النَّشَوِيّاتُ", "البُروتيناتُ", "مُنتَجاتُ الأَلبانِ", "الفَواكِهُ"],
      answer: 0,
      reason: "النَّشَوِيّاتُ كالخُبزِ والأَرُزِّ مَصدَرُ الطّاقةِ لِلجِسمِ"
    },

    // ② صواب/خطأ — معرفة — 3Bh3
    {
      type: "true-false",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "نَحتاجُ إلى مُنتَجاتِ الأَلبانِ لِعِظامٍ وأَسنانٍ قَويَّةٍ.",
      answer: true,
      reason: "الحَليبُ والجُبنُ يُقَوّيانِ العِظامَ والأَسنانَ"
    },

    // ③ التوصيل — معرفة — 3Bh3
    {
      type: "matching",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ مَجموعةٍ غِذائيَّةٍ بِفائِدَتِها.",
      pairs: [
        { a: "مُنتَجاتُ الأَلبانِ",     b: "عِظامٌ وأَسنانٌ قَويَّةٌ" },
        { a: "النَّشَوِيّاتُ",          b: "إنتاجُ الطّاقةِ" },
        { a: "البُروتيناتُ",            b: "نُمُوُّ الجِسمِ" },
        { a: "الفَواكِهُ والخَضراواتُ", b: "الوِقايةُ مِنَ الأَمراضِ" }
      ]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh3
    {
      type: "hotspot",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "application",
      prompt: "اضغَطْ على سَلّةِ البُروتيناتِ (اللُّحومِ والأَسماكِ).",
      bg: "#eef7ff",
      spot: { x: 27, y: 73, r: 16 },
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="أربع سلال غذائية: ألبان ونشويات وبروتينات وفواكه وخضراوات">
        <g stroke="#111111" stroke-width="3">
          <rect x="60" y="40" width="210" height="150" rx="18" fill="#E08000"/>
          <rect x="68" y="46" width="194" height="20" fill="#FFA000"/>
          <rect x="68" y="166" width="194" height="18" fill="#C06000"/>
          <rect x="60" y="40" width="210" height="150" rx="18" fill="none"/>
          <rect x="100" y="76" width="46" height="86" rx="8" fill="#F9F8F3"/>
          <rect x="106" y="106" width="34" height="52" rx="5" fill="#FFFFFF" stroke="none"/>
          <rect x="100" y="76" width="46" height="86" rx="8" fill="none"/>
          <polygon points="176,160 230,160 230,110" fill="#FFA000"/>
          <circle cx="212" cy="142" r="5" fill="#E08000"/>
          <circle cx="222" cy="152" r="4" fill="#E08000"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="330" y="40" width="210" height="150" rx="18" fill="#E08000"/>
          <rect x="338" y="46" width="194" height="20" fill="#FFA000"/>
          <rect x="338" y="166" width="194" height="18" fill="#C06000"/>
          <rect x="330" y="40" width="210" height="150" rx="18" fill="none"/>
          <ellipse cx="392" cy="122" rx="46" ry="30" fill="#C88A5E"/>
          <path d="M346 118 A46 30 0 0 1 438 118 Z" fill="#E0A87F" stroke="none"/>
          <ellipse cx="392" cy="122" rx="46" ry="30" fill="none"/>
          <path d="M470 156 L470 100 Q470 86 490 86 Q510 86 510 100 L510 156 Z" fill="#F2C3A0"/>
          <path d="M470 100 Q470 86 490 86 Q510 86 510 100 L510 112 L470 112 Z" fill="#F7D3B4" stroke="none"/>
          <path d="M470 156 L470 100 Q470 86 490 86 Q510 86 510 100 L510 156 Z" fill="none"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="60" y="240" width="210" height="150" rx="18" fill="#E08000"/>
          <rect x="68" y="246" width="194" height="20" fill="#FFA000"/>
          <rect x="68" y="366" width="194" height="18" fill="#C06000"/>
          <rect x="60" y="240" width="210" height="150" rx="18" fill="none"/>
          <ellipse cx="140" cy="320" rx="52" ry="30" fill="#20A0FF"/>
          <path d="M88 314 A52 30 0 0 1 192 314 Z" fill="#40C0FF" stroke="none"/>
          <ellipse cx="140" cy="320" rx="52" ry="30" fill="none"/>
          <polygon points="192,320 224,298 224,342" fill="#2080E0"/>
          <ellipse cx="230" cy="330" rx="26" ry="32" fill="#F9F8F3"/>
          <path d="M204 326 A26 32 0 0 1 256 326 Z" fill="#FFFFFF" stroke="none"/>
          <ellipse cx="230" cy="330" rx="26" ry="32" fill="none"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="330" y="240" width="210" height="150" rx="18" fill="#E08000"/>
          <rect x="338" y="246" width="194" height="20" fill="#FFA000"/>
          <rect x="338" y="366" width="194" height="18" fill="#C06000"/>
          <rect x="330" y="240" width="210" height="150" rx="18" fill="none"/>
          <circle cx="392" cy="326" r="42" fill="#FF2020"/>
          <path d="M362 305 A42 42 0 0 1 422 305 Z" fill="#FF4020" stroke="none"/>
          <circle cx="392" cy="326" r="42" fill="none"/>
          <path d="M392 284 L392 268" stroke-width="7"/>
          <polygon points="480,286 512,368 466,368" fill="#FFA000"/>
          <path d="M480 286 L498 332 L470 332 Z" fill="#E08000" stroke="none"/>
          <polygon points="480,286 512,368 466,368" fill="none"/>
          <path d="M480 286 Q466 262 448 260" fill="none" stroke="#4A9018" stroke-width="8"/>
          <path d="M480 286 Q496 264 514 264" fill="none" stroke="#4A9018" stroke-width="8"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh3
    {
      type: "classify",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ طَعامٍ إلى مَجموعَتِهِ الغِذائيَّةِ.",
      groups: [
        { name: "النَّشَوِيّاتُ", items: ["الخُبزُ", "الأَرُزُّ"] },
        { name: "البُروتيناتُ", items: ["السَّمَكُ", "البَيضُ"] },
        { name: "فَواكِهُ وخَضراواتُ", items: ["التُّفّاحُ", "الجَزَرُ"] }
      ]
    },

    // ⑥ إثرائي: بطاقات الذاكرة — تطبيق — 3Bh3 (أول استعمال للنوع في المنصّة)
    {
      type: "memory",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "application",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ وابحَثْ عَنِ المَجموعةِ وفائِدَتِها.",
      pairs: [
        { a: "مُنتَجاتُ الأَلبانِ", b: "عِظامٌ قَويَّةٌ" },
        { a: "النَّشَوِيّاتُ",      b: "الطّاقةُ" },
        { a: "البُروتيناتُ",        b: "النُّمُوُّ" },
        { a: "فَواكِهُ وخَضراواتُ", b: "الوِقايةُ مِنَ الأَمراضِ" }
      ]
    }

  ],

  // العلوم/الثالث — الوحدة ٢، الدرس ٢-٢: نظام غذائي صحي (ص٢٦–٢٧)
  "g3s-2-2": [

    // ① صواب/خطأ — معرفة — 3Bh3
    {
      type: "true-false",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "النِّظامُ الغِذائيُّ الصِّحّيُّ يَجِبُ أَنْ يَكونَ مُتَنَوِّعاً.",
      answer: true,
      reason: "تَوازُنُ الأَطعِمةِ مِنْ مُختَلِفِ المَجموعاتِ يَمنَحُ الجِسمَ التَّغذِيةَ اللّازِمةَ"
    },

    // ② اختيار من متعدد — معرفة — 3Bh3
    {
      type: "mcq",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "أَيُّ مَجموعةٍ في قِمّةِ الهَرَمِ الغِذائيِّ نَأكُلُ مِنها أَقَلَّ شَيءٍ؟",
      options: ["الدُّهونُ والسُّكَّرِيّاتُ", "النَّشَوِيّاتُ", "الخَضراواتُ", "البُروتيناتُ"],
      answer: 0,
      reason: "الدُّهونُ والسُّكَّرِيّاتُ في القِمّةِ، فَنَأكُلُ مِنها أَقَلَّ شَيءٍ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh3
    {
      type: "fill-blank",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "تَوازُنُ الأَطعِمةِ مِنْ مُختَلِفِ المَجموعاتِ يَمنَحُ جِسمَكَ {} اللّازِمةَ، ويَجِبُ أَنْ يَكونَ غِذاؤُكَ {}.",
      answers: ["التَّغذِيةَ", "مُتَنَوِّعاً"],
      distractors: ["الحَلوى", "واحِداً"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh3
    {
      type: "hotspot",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "application",
      prompt: "اضغَطْ على قاعِدةِ الهَرَمِ الغِذائيِّ: المَجموعةُ الَّتي نَأكُلُ مِنها أَكثَرَ شَيءٍ.",
      bg: "#eef7ff",
      spot: { x: 50, y: 79, r: 13 },
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="الهرم الغذائي بأربع طبقات">
        <g stroke="#111111" stroke-width="3">
          <polygon points="300,50 351.5,135 248.5,135" fill="#E07E8A"/>
          <polygon points="300,50 326,93 274,93" fill="#F49AA4" stroke="none"/>
          <polygon points="300,50 351.5,135 248.5,135" fill="none"/>
          <polygon points="351.5,135 400,215 200,215 248.5,135" fill="#FF2020"/>
          <polygon points="351.5,135 366,159 234,159 248.5,135" fill="#FF4020" stroke="none"/>
          <polygon points="400,215 388,196 212,196 200,215" fill="#E02000" stroke="none"/>
          <polygon points="351.5,135 400,215 200,215 248.5,135" fill="none"/>
          <polygon points="400,215 451.5,300 148.5,300 200,215" fill="#60C020"/>
          <polygon points="400,215 415,240 185,240 200,215" fill="#80C020" stroke="none"/>
          <polygon points="451.5,300 438,278 162,278 148.5,300" fill="#4A9018" stroke="none"/>
          <polygon points="400,215 451.5,300 148.5,300 200,215" fill="none"/>
          <polygon points="451.5,300 500,380 100,380 148.5,300" fill="#E08000"/>
          <polygon points="451.5,300 466,324 134,324 148.5,300" fill="#FFA000" stroke="none"/>
          <polygon points="500,380 488,360 112,360 100,380" fill="#C06000" stroke="none"/>
          <polygon points="451.5,300 500,380 100,380 148.5,300" fill="none"/>
        </g>
      </svg>`
    },

    // ⑤ الترتيب التسلسلي — استدلال — 3Bh3
    {
      type: "sequence",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "reasoning",
      prompt: "رَتِّبْ طَبَقاتِ الهَرَمِ الغِذائيِّ مِنَ المَجموعةِ الَّتي نَأكُلُ مِنها أَكثَرَ إلى الَّتي نَأكُلُ مِنها أَقَلَّ.",
      steps: [
        "النَّشَوِيّاتُ",
        "الفَواكِهُ والخَضراواتُ",
        "البُروتيناتُ ومُنتَجاتُ الأَلبانِ",
        "الدُّهونُ والسُّكَّرِيّاتُ"
      ]
    },

    // ⑥ إثرائي: الاستبعاد — استدلال — 3Bh3
    {
      type: "exclude",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "reasoning",
      prompt: "أَيُّها لَيسَ مِنَ الفَواكِهِ والخَضراواتِ؟",
      options: ["الجَزَرُ", "التُّفّاحُ", "الطَّماطِمُ", "الجُبنُ"],
      answer: 3,
      reason: "الجُبنُ مِنْ مُنتَجاتِ الأَلبانِ، وبَقيَّةُ الخِياراتِ فَواكِهُ وخَضراواتٌ"
    }

  ],

  // العلوم/الثالث — الوحدة ٢، الدرس ٢-٣: نظام غذائي غير صحي (ص٢٨–٢٩)
  "g3s-2-3": [

    // ① صواب/خطأ — معرفة — 3Bh4
    {
      type: "true-false",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "knowledge",
      prompt: "بَعضُ الأَطعِمةِ الغَنيَّةِ بِالسُّكَّرِ أَوِ الدُّهونِ قَدْ تَضُرُّ بِالصِّحّةِ.",
      answer: true,
      reason: "الإكثارُ مِنَ السُّكَّرِ والدُّهونِ يَضُرُّ بِالأَسنانِ وبِالصِّحّةِ عامّةً"
    },

    // ② اختيار من متعدد — معرفة — 3Bh4
    {
      type: "mcq",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "knowledge",
      prompt: "ماذا يَفعَلُ السُّكَّرُ الكَثيرُ بِأَسنانِكَ؟",
      options: ["يُتلِفُها ويُسَبِّبُ التَّسَوُّسَ", "يُقَوّيها", "يُبَيِّضُها", "لا يُؤَثِّرُ فيها"],
      answer: 0,
      reason: "تَجرِبةُ قِشرةِ البَيضِ تُبَيِّنُ أَنَّ السُّكَّرَ يُتلِفُ المادّةَ الَّتي تُكَوِّنُ الأَسنانَ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh4
    {
      type: "fill-blank",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "المَشروباتُ الغَنيَّةُ بِـ{} تَضُرُّ بِالأَسنانِ، والأَفضَلُ أَنْ نَشرَبَ {}.",
      answers: ["السُّكَّرِ", "الماءَ"],
      distractors: ["الخُضارِ", "المَشروبَ الغازِيَّ"]
    },

    // ④ الترتيب التسلسلي — تطبيق — 3Ep1 (هدف استقصاء: خطوات جمع الأدلّة)
    {
      type: "sequence",
      objective: "3Ep1: يجمع الأدلة في سياقات متنوعة بهدف الإجابة عن الأسئلة أو اختبار الأفكار",
      level: "application",
      prompt: "رَتِّبْ خُطُواتِ تَجرِبةِ قِشرةِ البَيضِ.",
      steps: [
        "ضَعْ نِصفَ قِشرةِ بَيضٍ في كُلِّ كوبٍ",
        "أَضِفْ ماءً إلى كوبٍ وشَرابَ السُّكَّرِ إلى الآخَرِ",
        "انتَظِرْ عِدّةَ أَيّامٍ",
        "لاحِظْ ما حَدَثَ لِلقِشرَتَينِ"
      ]
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh4
    {
      type: "classify",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ صِنفٍ: صِحّيٌّ أَمْ غَيرُ صِحّيٍّ؟",
      groups: [
        { name: "صِحّيٌّ", items: ["الماءُ", "الحَليبُ", "الفَواكِهُ"] },
        { name: "غَيرُ صِحّيٍّ", items: ["المَشروبُ الغازِيُّ", "الحَلوى", "الرَّقائِقُ المَقلِيَّةُ"] }
      ]
    },

    // ⑥ إثرائي: اكتشف الخطأ — استدلال — 3Bh4
    {
      type: "find-error",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "reasoning",
      prompt: "في هذِهِ الوَجبةِ صِنفٌ يَضُرُّ بِالصِّحّةِ إذا أَكثَرْنا مِنهُ — اضغَطْ عَلَيهِ.",
      bg: "#eef7ff",
      fit: "width",
      spot: { x: 78, y: 50, r: 17 },
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="صينية عليها تفاحة وكوب حليب وكوب مشروب غازي">
        <ellipse cx="320" cy="252" rx="290" ry="30" fill="#C88A5E" stroke="#111111" stroke-width="3"/>
        <ellipse cx="320" cy="244" rx="272" ry="22" fill="#E0A87F" stroke="none"/>
        <ellipse cx="320" cy="252" rx="290" ry="30" fill="none" stroke="#111111" stroke-width="3"/>
        <g stroke="#111111" stroke-width="3">
          <circle cx="150" cy="176" r="54" fill="#FF2020"/>
          <path d="M112 149 A54 54 0 0 1 188 149 Z" fill="#FF4020" stroke="none"/>
          <circle cx="150" cy="176" r="54" fill="none"/>
          <path d="M150 122 L150 100" stroke-width="8"/>
          <path d="M150 108 Q128 92 108 100" fill="none" stroke="#4A9018" stroke-width="8"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <path d="M292 108 L348 108 L340 232 L300 232 Z" fill="#F9F8F3"/>
          <path d="M292 108 L348 108 L346 138 L294 138 Z" fill="#FFFFFF" stroke="none"/>
          <path d="M300 232 L340 232 L342 200 L298 200 Z" fill="#E4E6E8" stroke="none"/>
          <path d="M292 108 L348 108 L340 232 L300 232 Z" fill="none"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <path d="M446 92 L556 92 L540 232 L462 232 Z" fill="#E02000"/>
          <path d="M446 92 L556 92 L552 128 L450 128 Z" fill="#FF4020" stroke="none"/>
          <path d="M462 232 L540 232 L544 194 L458 194 Z" fill="#B01800" stroke="none"/>
          <path d="M446 92 L556 92 L540 232 L462 232 Z" fill="none"/>
          <ellipse cx="501" cy="92" rx="55" ry="12" fill="#FF4020"/>
          <rect x="486" y="30" width="14" height="64" rx="7" fill="#F9F8F3"/>
          <path d="M486 44 L500 36" stroke-width="4"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الثالث — الوحدة ٢، الدرس ٢-٤: التمارين الرياضية والنوم (ص٣٠–٣١)
  "g3s-2-4": [

    // ① صواب/خطأ — معرفة — 3Bh3
    {
      type: "true-false",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "knowledge",
      prompt: "التَّمارينُ الرِّياضيَّةُ تُقَوّي القَلبَ والعِظامَ والعَضَلاتِ.",
      answer: true,
      reason: "الحَرَكةُ واللَّعِبُ والجَريُ تُقَوّي القَلبَ والعِظامَ والعَضَلاتِ"
    },

    // ② اختيار من متعدد — معرفة — 3Bh3
    {
      type: "mcq",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "knowledge",
      prompt: "كَمْ ساعةً يَحتاجُ مُعظَمُ تَلاميذِ المَدارِسِ لِلنَّومِ يَوميّاً؟",
      options: ["مِنْ ١٠ إلى ١٢ ساعةً", "مِنْ ٣ إلى ٤ ساعاتٍ", "مِنْ ٥ إلى ٦ ساعاتٍ", "مِنْ ١٥ إلى ١٦ ساعةً"],
      answer: 0,
      reason: "يَحتاجُ مُعظَمُ تَلاميذِ المَدارِسِ لِلنَّومِ مِنْ ١٠ إلى ١٢ ساعةً يَوميّاً"
    },

    // ③ التوصيل — معرفة — 3Bh3
    {
      type: "matching",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عادةٍ بِفائِدَتِها.",
      pairs: [
        { a: "الجَريُ واللَّعِبُ",   b: "يُقَوّيانِ القَلبَ والعَضَلاتِ" },
        { a: "النَّومُ الكافي",     b: "يُريحُ الجِسمَ ويَحفَظُ الصِّحّةَ" },
        { a: "الغِذاءُ المُتَنَوِّعُ", b: "يَمنَحُ الجِسمَ التَّغذِيةَ اللّازِمةَ" },
        { a: "شُربُ الماءِ",        b: "يَقي الجِسمَ مِنَ الجَفافِ" }
      ]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh3
    {
      type: "hotspot",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "application",
      prompt: "اضغَطْ على ما يُقَوّي عَضَلاتِكَ إذا استَعمَلتَهُ كُلَّ يَومٍ.",
      bg: "#eef7ff",
      fit: "width",
      spot: { x: 18, y: 50, r: 15 },
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="حبل نطّ وسرير وأريكة أمام شاشة">
        <g stroke="#111111" stroke-width="3">
          <path d="M62 118 Q116 44 170 118 Q116 210 62 118 Z" fill="none" stroke-width="9"/>
          <rect x="44" y="112" width="26" height="60" rx="12" fill="#FF2020"/>
          <rect x="162" y="112" width="26" height="60" rx="12" fill="#FF2020"/>
          <rect x="48" y="118" width="18" height="18" rx="9" fill="#FF4020" stroke="none"/>
          <rect x="166" y="118" width="18" height="18" rx="9" fill="#FF4020" stroke="none"/>
          <rect x="44" y="112" width="26" height="60" rx="12" fill="none"/>
          <rect x="162" y="112" width="26" height="60" rx="12" fill="none"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="248" y="150" width="164" height="56" rx="10" fill="#20A0FF"/>
          <rect x="256" y="156" width="148" height="14" fill="#40C0FF" stroke="none"/>
          <rect x="256" y="188" width="148" height="12" fill="#2080E0" stroke="none"/>
          <rect x="248" y="150" width="164" height="56" rx="10" fill="none"/>
          <rect x="258" y="120" width="60" height="34" rx="12" fill="#F9F8F3"/>
          <rect x="240" y="132" width="16" height="86" rx="6" fill="#8A5A2B"/>
          <rect x="404" y="150" width="16" height="68" rx="6" fill="#8A5A2B"/>
        </g>
        <g stroke="#111111" stroke-width="3">
          <rect x="486" y="152" width="130" height="56" rx="12" fill="#8A5A2B"/>
          <rect x="494" y="158" width="114" height="14" fill="#A87048" stroke="none"/>
          <rect x="486" y="152" width="130" height="56" rx="12" fill="none"/>
          <rect x="478" y="120" width="24" height="56" rx="10" fill="#A87048"/>
          <rect x="600" y="120" width="24" height="56" rx="10" fill="#A87048"/>
          <rect x="506" y="46" width="94" height="62" rx="8" fill="#606060"/>
          <rect x="514" y="52" width="78" height="18" fill="#808080" stroke="none"/>
          <rect x="506" y="46" width="94" height="62" rx="8" fill="none"/>
          <rect x="544" y="108" width="18" height="14" fill="#404040"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh3
    {
      type: "classify",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ عادةٍ: صِحّيّةٌ أَمْ غَيرُ صِحّيّةٍ؟",
      groups: [
        { name: "عادةٌ صِحّيّةٌ", items: ["المَشيُ إلى المَدرَسةِ", "النَّومُ مُبَكِّراً", "شُربُ الماءِ"] },
        { name: "عادةٌ غَيرُ صِحّيّةٍ", items: ["الجُلوسُ أَمامَ الشّاشةِ طَويلاً", "السَّهَرُ لِوَقتٍ مُتَأَخِّرٍ", "الإكثارُ مِنَ الحَلوى"] }
      ]
    },

    // ⑥ إثرائي: الشريط المتدرّج — تطبيق — 3Bh3
    {
      type: "slider",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "application",
      prompt: "قَدِّرْ: كَمْ ساعةً يَنامُ تِلميذُ المَدرَسةِ في اللَّيلةِ؟",
      min: 0, max: 16, answer: 11, tolerance: 1, unit: " ساعة", ticks: 4,
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="سرير وهلال يدلّان على النوم">
        <g stroke="#111111" stroke-width="3">
          <rect x="180" y="150" width="230" height="76" rx="14" fill="#20A0FF"/>
          <rect x="190" y="158" width="210" height="20" fill="#40C0FF" stroke="none"/>
          <rect x="190" y="204" width="210" height="16" fill="#2080E0" stroke="none"/>
          <rect x="180" y="150" width="230" height="76" rx="14" fill="none"/>
          <rect x="194" y="110" width="86" height="46" rx="16" fill="#F9F8F3"/>
          <rect x="202" y="116" width="70" height="14" rx="7" fill="#FFFFFF" stroke="none"/>
          <rect x="194" y="110" width="86" height="46" rx="16" fill="none"/>
          <rect x="168" y="122" width="20" height="118" rx="8" fill="#8A5A2B"/>
          <rect x="402" y="150" width="20" height="90" rx="8" fill="#8A5A2B"/>
          <path d="M470 60 A56 56 0 1 0 536 126 A44 44 0 1 1 470 60 Z" fill="#FFA000"/>
          <path d="M470 60 A56 56 0 0 0 448 100 A44 44 0 0 1 470 60 Z" fill="#FFFFC0" stroke="none"/>
          <path d="M470 60 A56 56 0 1 0 536 126 A44 44 0 1 1 470 60 Z" fill="none"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الثالث — الوحدة ٢، الدرس ٢-٥: تحقّق من تقدّمك (ص٣٢–٣٣) — مراجعة
  "g3s-2-5": [

    // ① اختيار من متعدد — معرفة — 3Bh3
    {
      type: "mcq",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "knowledge",
      prompt: "أَيُّ مَجموعةٍ غِذائيَّةٍ نَحتاجُها لِنُمُوِّ الجِسمِ؟",
      options: ["البُروتيناتُ", "النَّشَوِيّاتُ", "الدُّهونُ", "السُّكَّرِيّاتُ"],
      answer: 0,
      reason: "البُروتيناتُ كاللُّحومِ والأَسماكِ والبَيضِ تُساعِدُ الجِسمَ على النُّمُوِّ"
    },

    // ② صواب/خطأ — معرفة — 3Bh4
    {
      type: "true-false",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "knowledge",
      prompt: "الإكثارُ مِنَ المَشروباتِ السُّكَّرِيَّةِ لا يَضُرُّ بِالأَسنانِ.",
      answer: false,
      reason: "السُّكَّرُ الكَثيرُ يُتلِفُ الأَسنانَ ويُسَبِّبُ التَّسَوُّسَ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh3
    {
      type: "fill-blank",
      objective: "3Bh3: يستكشف في التمارين الرياضية والنظام الغذائي الضروريّ للحفاظ على صحّة جيّدة",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "لِتَكونَ صِحّيّاً تَحتاجُ إلى غِذاءٍ {} ومُمارَسةِ {} ونَومٍ كافٍ.",
      answers: ["مُتَنَوِّعٍ", "الرِّياضةِ"],
      distractors: ["واحِدٍ", "الشّاشةِ"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh3 (نفس هرم الدرس ٢-٢)
    {
      type: "hotspot",
      objective: "3Bh3: يستكشف في النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "application",
      prompt: "اضغَطْ على المَجموعةِ الَّتي نَأكُلُ مِنها أَقَلَّ شَيءٍ.",
      bg: "#eef7ff",
      spot: { x: 50, y: 23, r: 12 },
      svg: `<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="الهرم الغذائي بأربع طبقات">
        <g stroke="#111111" stroke-width="3">
          <polygon points="300,50 351.5,135 248.5,135" fill="#E07E8A"/>
          <polygon points="300,50 326,93 274,93" fill="#F49AA4" stroke="none"/>
          <polygon points="300,50 351.5,135 248.5,135" fill="none"/>
          <polygon points="351.5,135 400,215 200,215 248.5,135" fill="#FF2020"/>
          <polygon points="351.5,135 366,159 234,159 248.5,135" fill="#FF4020" stroke="none"/>
          <polygon points="400,215 388,196 212,196 200,215" fill="#E02000" stroke="none"/>
          <polygon points="351.5,135 400,215 200,215 248.5,135" fill="none"/>
          <polygon points="400,215 451.5,300 148.5,300 200,215" fill="#60C020"/>
          <polygon points="400,215 415,240 185,240 200,215" fill="#80C020" stroke="none"/>
          <polygon points="451.5,300 438,278 162,278 148.5,300" fill="#4A9018" stroke="none"/>
          <polygon points="400,215 451.5,300 148.5,300 200,215" fill="none"/>
          <polygon points="451.5,300 500,380 100,380 148.5,300" fill="#E08000"/>
          <polygon points="451.5,300 466,324 134,324 148.5,300" fill="#FFA000" stroke="none"/>
          <polygon points="500,380 488,360 112,360 100,380" fill="#C06000" stroke="none"/>
          <polygon points="451.5,300 500,380 100,380 148.5,300" fill="none"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh4
    {
      type: "classify",
      objective: "3Bh4: يعرف أن بعض الأطعمة الغنية بالسكر أو الدهون قد تضر بالصحة",
      level: "reasoning",
      prompt: "صَنِّفْ: يُفيدُ الجِسمَ أَمْ يَضُرُّ بِهِ إذا أَكثَرْنا مِنهُ؟",
      groups: [
        { name: "يُفيدُ الجِسمَ", items: ["الفَواكِهُ", "الماءُ", "السَّمَكُ"] },
        { name: "يَضُرُّ إذا أَكثَرْنا", items: ["الحَلوى", "المَشروبُ الغازِيُّ", "الرَّقائِقُ المَقلِيَّةُ"] }
      ]
    },

    // ⑥ إثرائي: الخريطة الذهنية — استدلال — 3Bh3
    {
      type: "mindmap",
      objective: "3Bh3: يستكشف ويبحث عن النظام الغذائي الكافي والمتنوع اللازم للحفاظ على صحة جيدة",
      level: "reasoning",
      prompt: "أَكمِلْ خَريطةَ المَجموعاتِ الغِذائيَّةِ بِسَحبِ الفائِدةِ المُناسِبةِ إلى كُلِّ فَرعٍ.",
      center: "المَجموعاتُ الغِذائيَّةُ",
      branches: [
        { label: "النَّشَوِيّاتُ",          answer: "الطّاقةُ" },
        { label: "البُروتيناتُ",            answer: "النُّمُوُّ" },
        { label: "مُنتَجاتُ الأَلبانِ",     answer: "العِظامُ القَويَّةُ" },
        { label: "الفَواكِهُ والخَضراواتُ", answer: "الوِقايةُ" }
      ],
      distractors: ["النَّومُ", "الجَريُ"]
    }

  ],
  // ═══════════════════════════════════════════════════════════════════════════
  // العلوم/الثالث — الوحدة الثالثة: الكائنات الحية (كتاب التلميذ ص٣٤–٤٥)
  // الأهداف: 3Bh2 (الحيّ وغير الحيّ) · 3Bh1 (النمو والتغذية والحركة والتكاثر)
  //          · 3Bh6 (التصنيف). كل الرسوم مبنيّة على مواصفات التفصيل البصري
  //          (حدّ #111111 بسماكة ٣ خارجيّ و٢ داخليّ، نطاقات لونية حادّة الحواف،
  //          لمعان أبيض، بلا خطّ أرض ولا ظلّ مُلقى، وبلا ملامح وجه إطلاقاً).
  // ═══════════════════════════════════════════════════════════════════════════

  // ٣-١ الكائنات الحية والأشياء غير الحية (كتاب التلميذ ص٣٤)
  "g3s-3-1": [

    // ① صواب/خطأ — معرفة — 3Bh2
    {
      type: "true-false",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "knowledge",
      prompt: "جَميعُ الكائِناتِ الحَيَّةِ تَتَنَفَّسُ.",
      answer: true,
      reason: "التَّنَفُّسُ عَمَليَّةٌ حَيَويَّةٌ تَقومُ بِها كُلُّ الكائِناتِ الحَيَّةِ"
    },

    // ② اختيار من متعدد — معرفة — 3Bh2
    {
      type: "mcq",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "knowledge",
      prompt: "ما الَّذي تَفعَلُهُ كُلُّ الكائِناتِ الحَيَّةِ؟",
      options: ["تَتَنَفَّسُ وتَنمو وتَتَكاثَرُ", "تَطيرُ في الهَواءِ", "تَسبَحُ في الماءِ", "تُضيءُ في الظَّلامِ"],
      answer: 0,
      reason: "العَمَلِيّاتُ الحَيَوِيَّةُ مُشتَرَكةٌ بَينَ كُلِّ الكائِناتِ الحَيَّةِ: التَّنَفُّسُ والنُّمُوُّ والتَّكاثُرُ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh2
    {
      type: "fill-blank",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "الكائِنُ الحَيُّ {} ويَحتاجُ إلى {} لِيَتَنَفَّسَ.",
      answers: ["يَنمو", "الهَواءِ"],
      distractors: ["يَلمَعُ", "الكَهرَباءِ"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh2
    {
      type: "hotspot",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "application",
      prompt: "اضغَطْ على الكائِنِ الحَيِّ.",
      bg: "#eef7ff",
      spot: { x: 17.7, y: 50, r: 18 },
      svg: `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="فراشة وحاسوب وصخرة">
        <g stroke="#111111" stroke-width="3">
          <path d="M100,112 C56,62 20,72 20,112 C20,150 58,166 100,154 Z" fill="#FF8000"/>
          <path d="M120,112 C164,62 200,72 200,112 C200,150 162,166 120,154 Z" fill="#FF8000"/>
          <path d="M100,168 C64,178 38,200 48,230 C58,256 92,250 104,214 Z" fill="#E04000"/>
          <path d="M120,168 C156,178 182,200 172,230 C162,256 128,250 116,214 Z" fill="#E04000"/>
          <path d="M96,118 C66,90 38,96 38,116 C38,140 64,150 96,144 Z" fill="#FFA000" stroke-width="2"/>
          <path d="M124,118 C154,90 182,96 182,116 C182,140 156,150 124,144 Z" fill="#FFA000" stroke-width="2"/>
          <circle cx="62" cy="118" r="9" fill="#FFFFC0" stroke-width="2"/>
          <circle cx="158" cy="118" r="9" fill="#FFFFC0" stroke-width="2"/>
          <circle cx="72" cy="214" r="8" fill="#FF8000" stroke-width="2"/>
          <circle cx="148" cy="214" r="8" fill="#FF8000" stroke-width="2"/>
          <rect x="101" y="94" width="18" height="130" rx="9" fill="#606060"/>
          <path d="M106,102 L106,214" stroke="#C0C0C0" stroke-width="4" fill="none"/>
          <path d="M104,94 C96,70 86,60 74,56" fill="none"/>
          <path d="M116,94 C124,70 134,60 146,56" fill="none"/>
          <circle cx="72" cy="54" r="6" fill="#606060"/>
          <circle cx="148" cy="54" r="6" fill="#606060"/>

          <rect x="228" y="58" width="164" height="124" rx="14" fill="#808080"/>
          <rect x="242" y="72" width="136" height="96" rx="8" fill="#40C0FF" stroke-width="2"/>
          <path d="M250,76 L274,76 L250,124 Z" fill="#FFFFFF" stroke="none" opacity=".55"/>
          <path d="M242,138 L378,138 L378,160 A8,8 0 0 1 370,168 L250,168 A8,8 0 0 1 242,160 Z" fill="#2080E0" stroke-width="2"/>
          <rect x="292" y="182" width="36" height="26" fill="#606060"/>
          <rect x="254" y="208" width="112" height="16" rx="8" fill="#606060"/>
          <rect x="222" y="238" width="176" height="34" rx="10" fill="#C0C0C0"/>
          <g stroke-width="2" fill="#808080">
            <rect x="234" y="248" width="20" height="14" rx="3"/>
            <rect x="262" y="248" width="20" height="14" rx="3"/>
            <rect x="290" y="248" width="20" height="14" rx="3"/>
            <rect x="318" y="248" width="20" height="14" rx="3"/>
            <rect x="346" y="248" width="40" height="14" rx="3"/>
          </g>

          <path d="M424,232 C412,206 424,174 452,156 C478,138 514,132 544,144 C574,156 590,182 588,208 C586,232 566,248 540,250 L452,250 C436,250 428,244 424,232 Z" fill="#808080"/>
          <path d="M428,208 C430,182 452,160 484,150 C514,141 548,146 570,166 C548,176 514,172 484,182 C456,191 436,198 428,208 Z" fill="#C0C0C0" stroke-width="2"/>
          <path d="M434,240 C450,248 476,252 506,250 L540,250 C562,248 578,240 585,224 C558,236 514,240 474,236 C456,234 442,236 434,240 Z" fill="#606060" stroke-width="2"/>
          <path d="M504,166 L516,196 L502,220" fill="none" stroke-width="3"/>
          <path d="M452,180 C466,170 482,166 496,168" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".5"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh2
    {
      type: "classify",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "reasoning",
      prompt: "صَنِّفْ: كائِنٌ حَيٌّ أَمْ شَيءٌ غَيرُ حَيٍّ؟",
      groups: [
        { name: "كائِنٌ حَيٌّ",      items: ["نَخلةٌ", "صَقرٌ", "فَراشةٌ"] },
        { name: "شَيءٌ غَيرُ حَيٍّ", items: ["صَخرةٌ", "حاسوبٌ", "صاروخٌ"] }
      ]
    },

    // ⑥ إثرائي: الاستبعاد — استدلال — 3Bh2
    {
      type: "exclude",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ كائِناتٌ حَيَّةٌ وواحِدٌ دَخيلٌ — اضغَطْ على الدَّخيلِ.",
      options: ["نَبتةٌ", "سَمَكةٌ", "شُعلةُ نارٍ", "نَملةٌ"],
      answer: 2,
      reason: "شُعلةُ النّارِ تَكبُرُ وتَتَحَرَّكُ لكِنَّها لا تَتَغَذّى ولا تَتَكاثَرُ، فَلَيسَتْ كائِناً حَيّاً."
    }

  ],

  // ٣-٢ النمو والتغذية (كتاب التلميذ ص٣٦)
  "g3s-3-2": [

    // ① صواب/خطأ — معرفة — 3Bh1
    {
      type: "true-false",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "صِغارُ الكائِناتِ الحَيَّةِ تَنمو لِتُصبِحَ بالِغةً.",
      answer: true,
      reason: "النُّمُوُّ عَمَليَّةٌ حَيَويَّةٌ: الصَّغيرُ يَكبُرُ حَتّى يَصيرَ بالِغاً مِثلَ والِدَيهِ"
    },

    // ② اختيار من متعدد — معرفة — 3Bh1
    {
      type: "mcq",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "ما أَوَّلُ مَرحَلةٍ في نُمُوِّ النَّبتةِ؟",
      options: ["البَذرةُ", "النَّبتةُ الصَّغيرةُ", "الزَّهرةُ", "الأَوراقُ"],
      answer: 0,
      reason: "تَبدَأُ النَّبتةُ بَذرةً، ثُمَّ تَنمو حَتّى تُصبِحَ نَبتةً زَهرِيَّةً كامِلةً"
    },

    // ③ التوصيل — معرفة — 3Bh1
    {
      type: "matching",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "صِلْ كُلَّ حَيَوانٍ بالِغٍ بِصَغيرِهِ.",
      pairs: [
        { a: "جَمَلٌ",  b: "حُوارٌ" },
        { a: "قِطّةٌ",  b: "هِرَّةٌ" },
        { a: "ضِفدَعٌ", b: "شُرغوفٌ" },
        { a: "دَجاجةٌ", b: "كَتكوتٌ" }
      ]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh1 (المراحل الأربع، والأولى في أقصى اليمين)
    {
      type: "hotspot",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "application",
      prompt: "اضغَطْ على مَرحَلةِ البَذرةِ.",
      bg: "#f3faee",
      spot: { x: 87, y: 52, r: 11 },
      svg: `<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="أربع مراحل لنمو النبتة">
        <g stroke="#111111" stroke-width="3" font-family="Cairo, Tajawal, sans-serif">
          <ellipse cx="609" cy="172" rx="27" ry="36" fill="#C06000"/>
          <path d="M609,136 C592,146 586,164 590,182 C594,198 604,206 609,208 Z" fill="#E08000" stroke-width="2"/>
          <ellipse cx="600" cy="152" rx="7" ry="11" fill="#FFFFFF" stroke="none" opacity=".55"/>
          <text x="609" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#2f3a2c" stroke="none">١</text>

          <ellipse cx="437" cy="186" rx="24" ry="32" fill="#C06000"/>
          <path d="M437,154 C422,163 417,179 421,194 C425,207 433,214 437,216 Z" fill="#E08000" stroke-width="2"/>
          <path d="M437,154 C437,138 434,126 428,116" fill="none"/>
          <path d="M428,116 C414,110 406,116 404,126 C412,132 424,128 428,116 Z" fill="#80C020" stroke-width="2"/>
          <path d="M437,218 C437,236 442,250 452,262" fill="none"/>
          <path d="M437,218 C433,236 426,248 414,258" fill="none"/>
          <text x="437" y="290" font-size="34" font-weight="700" text-anchor="middle" fill="#2f3a2c" stroke="none">٢</text>

          <path d="M264,244 C264,196 268,164 274,132" fill="none" stroke-width="7"/>
          <path d="M270,178 C246,164 226,168 218,182 C232,196 256,194 270,178 Z" fill="#60C020"/>
          <path d="M270,196 C294,182 314,186 322,200 C308,214 284,212 270,196 Z" fill="#80C020"/>
          <path d="M274,148 C258,138 244,142 240,152 C250,162 266,160 274,148 Z" fill="#80C020" stroke-width="2"/>
          <path d="M264,244 C258,258 250,266 240,272" fill="none"/>
          <path d="M264,244 C270,258 278,266 288,272" fill="none"/>
          <text x="264" y="304" font-size="34" font-weight="700" text-anchor="middle" fill="#2f3a2c" stroke="none">٣</text>

          <path d="M92,254 C92,200 96,158 100,112" fill="none" stroke-width="7"/>
          <path d="M96,168 C70,152 48,156 40,172 C56,188 82,186 96,168 Z" fill="#60C020"/>
          <path d="M98,190 C124,174 146,178 154,194 C138,210 112,208 98,190 Z" fill="#80C020"/>
          <path d="M96,146 C78,134 62,138 58,150 C70,162 88,160 96,146 Z" fill="#4A9018" stroke-width="2"/>
          <circle cx="100" cy="88" r="26" fill="#FFA000"/>
          <g fill="#FF8000" stroke-width="2">
            <ellipse cx="100" cy="50" rx="16" ry="22"/>
            <ellipse cx="138" cy="88" rx="22" ry="16"/>
            <ellipse cx="100" cy="126" rx="16" ry="22"/>
            <ellipse cx="62" cy="88" rx="22" ry="16"/>
          </g>
          <circle cx="100" cy="88" r="26" fill="#FFA000"/>
          <circle cx="100" cy="88" r="14" fill="#FFFFC0" stroke-width="2"/>
          <path d="M92,254 C86,266 78,274 68,280" fill="none"/>
          <path d="M92,254 C98,266 106,274 116,280" fill="none"/>
          <text x="92" y="312" font-size="34" font-weight="700" text-anchor="middle" fill="#2f3a2c" stroke="none">٤</text>
        </g>
      </svg>`
    },

    // ⑤ الترتيب التسلسلي — استدلال — 3Bh1
    {
      type: "sequence",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "reasoning",
      prompt: "رَتِّبْ مَراحِلَ نُمُوِّ النَّبتةِ مِنَ الأَوَّلِ إلى الأَخيرِ.",
      steps: ["بَذرةٌ", "تَبدَأُ البَذرةُ بِالنُّمُوِّ", "تَنشَأُ نَبتةٌ صَغيرةٌ", "تُصبِحُ نَبتةً زَهرِيَّةً كامِلةً"]
    },

    // ⑥ إثرائي: الخريطة الذهنية — استدلال — 3Bh1
    {
      type: "mindmap",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "reasoning",
      prompt: "أَكمِلْ خَريطةَ ما تَحتاجُهُ الكائِناتُ الحَيَّةُ بِسَحبِ الكَلِمةِ المُناسِبةِ إلى كُلِّ فَرعٍ.",
      center: "تَحتاجُ الكائِناتُ الحَيَّةُ",
      branches: [
        { label: "لِتَحصُلَ على الطّاقةِ", answer: "الغِذاءَ" },
        { label: "لِتَشرَبَ",             answer: "الماءَ" },
        { label: "لِتَتَنَفَّسَ",          answer: "الهَواءَ" },
        { label: "لِتَنمُوَ",             answer: "الوَقتَ" }
      ],
      distractors: ["الحِبرَ", "الكَهرَباءَ"]
    }

  ],

  // ٣-٣ الحركة والتكاثر (كتاب التلميذ ص٣٨)
  "g3s-3-3": [

    // ① صواب/خطأ — معرفة — 3Bh1
    {
      type: "true-false",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "تَتَحَرَّكُ النَّباتاتُ بِرِفقٍ نَحوَ الضَّوءِ.",
      answer: true,
      reason: "حَرَكةُ النَّباتِ بَطيئةٌ لا نَكادُ نَراها، لكِنَّ ساقَهُ تَميلُ نَحوَ الضَّوءِ"
    },

    // ② اختيار من متعدد — معرفة — 3Bh1
    {
      type: "mcq",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "كَيفَ تَتَكاثَرُ الطُّيورُ؟",
      options: ["بِوَضعِ البَيضِ", "بِالوِلادةِ", "بِالطَّيَرانِ", "بِالسِّباحةِ"],
      answer: 0,
      reason: "تَضَعُ الطُّيورُ بَيضاً يَفقِسُ عَنْ صِغارٍ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh1
    {
      type: "fill-blank",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "تَتَكاثَرُ الحَيَواناتُ بِوَضعِ {} أَوْ بِـ{}.",
      answers: ["البَيضِ", "الوِلادةِ"],
      distractors: ["الأَوراقِ", "الجَريِ"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh1 (انتشار البذور حركةٌ في النبات)
    {
      type: "hotspot",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "application",
      prompt: "اضغَطْ على ما يَنتَشِرُ مَعَ الرّيحِ لِتَنمُوَ نَباتاتٌ جَديدةٌ.",
      bg: "#eef7ff",
      spot: { x: 70, y: 32.6, r: 20 },
      svg: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتة تنثر بذورها مع الريح">
        <g stroke="#111111" stroke-width="3">
          <path d="M186,330 C186,264 190,214 196,168" fill="none" stroke-width="8"/>
          <path d="M192,240 C158,220 126,226 116,246 C138,268 174,264 192,240 Z" fill="#60C020"/>
          <path d="M194,204 C228,184 260,190 270,210 C248,232 212,228 194,204 Z" fill="#80C020"/>
          <path d="M190,282 C160,268 134,274 126,290 C146,308 176,304 190,282 Z" fill="#4A9018"/>
          <path d="M186,330 C176,344 164,352 150,356" fill="none"/>
          <path d="M186,330 C196,344 208,352 222,356" fill="none"/>
          <circle cx="198" cy="140" r="34" fill="#E0C060"/>
          <circle cx="198" cy="140" r="18" fill="#FFFFC0" stroke-width="2"/>
          <path d="M186,126 C190,120 198,118 206,120" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".6"/>
          <g stroke-width="2">
            <path d="M198,106 L198,88" fill="none" stroke-width="3"/>
            <path d="M174,116 L162,100" fill="none" stroke-width="3"/>
            <path d="M222,116 L234,100" fill="none" stroke-width="3"/>
          </g>

          <g fill="#F7F6F1">
            <g>
              <path d="M370,103 L370,73" fill="none" stroke-width="3"/>
              <path d="M370,73 C352,61 344,71 346,83 C358,91 368,85 370,73 Z" stroke-width="2"/>
              <path d="M370,73 C388,61 396,71 394,83 C382,91 372,85 370,73 Z" stroke-width="2"/>
              <ellipse cx="370" cy="111" rx="8" ry="12" fill="#C06000"/>
            </g>
            <g>
              <path d="M440,103 L440,73" fill="none" stroke-width="3"/>
              <path d="M440,73 C422,61 414,71 416,83 C428,91 438,85 440,73 Z" stroke-width="2"/>
              <path d="M440,73 C458,61 466,71 464,83 C452,91 442,85 440,73 Z" stroke-width="2"/>
              <ellipse cx="440" cy="111" rx="8" ry="12" fill="#C06000"/>
            </g>
            <g>
              <path d="M400,157 L400,127" fill="none" stroke-width="3"/>
              <path d="M400,127 C382,115 374,125 376,137 C388,145 398,139 400,127 Z" stroke-width="2"/>
              <path d="M400,127 C418,115 426,125 424,137 C412,145 402,139 400,127 Z" stroke-width="2"/>
              <ellipse cx="400" cy="165" rx="8" ry="12" fill="#C06000"/>
            </g>
            <g>
              <path d="M470,151 L470,121" fill="none" stroke-width="3"/>
              <path d="M470,121 C452,109 444,119 446,131 C458,139 468,133 470,121 Z" stroke-width="2"/>
              <path d="M470,121 C488,109 496,119 494,131 C482,139 472,133 470,121 Z" stroke-width="2"/>
              <ellipse cx="470" cy="159" rx="8" ry="12" fill="#C06000"/>
            </g>
          </g>
          <g fill="none" stroke="#40C0FF" stroke-width="5" opacity=".85">
            <path d="M262,208 C300,192 340,196 378,206"/>
            <path d="M300,246 C338,230 378,234 416,244"/>
          </g>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh1
    {
      type: "classify",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ حَيَوانٍ بِحَسَبِ طَريقةِ تَكاثُرِهِ.",
      groups: [
        { name: "يَضَعُ البَيضَ", items: ["دَجاجةٌ", "سَمَكةٌ", "سُلَحفاةٌ"] },
        { name: "يَلِدُ صِغارَهُ", items: ["قِطّةٌ", "جَمَلٌ", "حوتٌ"] }
      ]
    },

    // ⑥ إثرائي: اكتشف الخطأ — استدلال — 3Bh1
    // نبتتان عند نافذة: اليمنى تميل نحو الضوء (صحيح) واليسرى تميل بعيداً عنه (الخطأ).
    {
      type: "find-error",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "reasoning",
      prompt: "إحدى النَّبتَتَينِ تَميلُ في الاتِّجاهِ الخَطأِ — اضغَطْ عَلَيها.",
      bg: "#fdf9ee",
      spot: { x: 12.5, y: 52, r: 14 },
      svg: `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="نبتتان بجانب نافذة إحداهما تميل بعيداً عن الضوء">
        <g stroke="#111111" stroke-width="3">
          <rect x="470" y="40" width="150" height="240" rx="12" fill="#40C0FF"/>
          <path d="M482,52 L546,52 L482,180 Z" fill="#FFFFFF" stroke="none" opacity=".5"/>
          <path d="M545,40 L545,280" fill="none" stroke-width="5"/>
          <path d="M470,160 L620,160" fill="none" stroke-width="5"/>
          <rect x="470" y="40" width="150" height="240" rx="12" fill="none"/>
          <g fill="none" stroke="#E0C060" stroke-width="6" opacity=".9">
            <path d="M452,110 L392,132"/>
            <path d="M452,160 L392,168"/>
            <path d="M452,210 L392,204"/>
          </g>

          <rect x="272" y="290" width="112" height="76" rx="10" fill="#C06000"/>
          <rect x="264" y="272" width="128" height="26" rx="8" fill="#E08000" stroke-width="2"/>
          <path d="M328,272 C338,232 356,204 384,186" fill="none" stroke-width="8"/>
          <path d="M348,224 C376,208 402,212 412,228 C392,248 362,244 348,224 Z" fill="#60C020"/>
          <path d="M336,254 C312,242 290,246 282,260 C300,276 326,272 336,254 Z" fill="#80C020"/>
          <path d="M384,186 C374,166 380,148 396,140 C408,154 400,176 384,186 Z" fill="#4A9018"/>

          <rect x="60" y="290" width="112" height="76" rx="10" fill="#C06000"/>
          <rect x="52" y="272" width="128" height="26" rx="8" fill="#E08000" stroke-width="2"/>
          <path d="M116,272 C106,232 88,204 60,186" fill="none" stroke-width="8"/>
          <path d="M96,224 C68,208 42,212 32,228 C52,248 82,244 96,224 Z" fill="#60C020"/>
          <path d="M108,254 C132,242 154,246 162,260 C144,276 118,272 108,254 Z" fill="#80C020"/>
          <path d="M60,186 C70,166 64,148 48,140 C36,154 44,176 60,186 Z" fill="#4A9018"/>
        </g>
      </svg>`
    }

  ],

  // ٣-٤ تصنيف البشر (كتاب التلميذ ص٤٠)
  "g3s-3-4": [

    // ① صواب/خطأ — معرفة — 3Bh6
    {
      type: "true-false",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "بَصَماتُ أَصابِعِ النّاسِ مُختَلِفةٌ.",
      answer: true,
      reason: "لا تَتَشابَهُ بَصمةُ شَخصٍ مَعَ بَصمةِ شَخصٍ آخَرَ أَبَداً"
    },

    // ② اختيار من متعدد — معرفة — 3Bh6
    {
      type: "mcq",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "أَيُّ الآتي نَوعٌ مِنْ أَنواعِ البَصَماتِ؟",
      options: ["الدَّوّاماتُ", "المُرَبَّعاتُ", "النُّجومُ", "الخُطوطُ المُستَقيمةُ"],
      answer: 0,
      reason: "أَنواعُ البَصَماتِ ثَلاثةٌ: الحَلَقاتُ والدَّوّاماتُ والمُنحَنَياتُ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh6
    {
      type: "fill-blank",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "أَنواعُ البَصَماتِ ثَلاثةٌ: الحَلَقاتُ و{} و{}.",
      answers: ["الدَّوّاماتُ", "المُنحَنَياتُ"],
      distractors: ["المُثَلَّثاتُ", "النُّقَطُ"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh6 (بلا تسميات: التمييز بصريّ)
    {
      type: "hotspot",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "application",
      prompt: "اضغَطْ على البَصمةِ الَّتي خُطوطُها تَدورُ حَولَ مَركَزٍ — بَصمةِ الدَّوّاماتِ.",
      bg: "#f6f2ff",
      spot: { x: 50, y: 48, r: 18 },
      svg: `<svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="ثلاث بصمات بأنماط مختلفة">
        <g stroke="#111111" stroke-width="3">
          <rect x="440" y="40" width="120" height="220" rx="60" fill="#F2C3A0"/>
          <path d="M500,40 A60,60 0 0 1 560,100 L560,200 A60,60 0 0 1 500,260 L500,246 A46,46 0 0 0 546,200 L546,100 A46,46 0 0 0 500,54 Z" fill="#E0A87F" stroke="none"/>
          <ellipse cx="474" cy="82" rx="13" ry="22" fill="#FFFFFF" stroke="none" opacity=".45"/>
          <rect x="440" y="40" width="120" height="220" rx="60" fill="none"/>
          <g fill="none" stroke="#984800" stroke-width="4">
            <path d="M470,224 C470,168 486,132 500,132 C514,132 530,168 530,224"/>
            <path d="M470,200 C470,152 486,120 500,120 C514,120 530,152 530,200"/>
            <path d="M470,176 C470,136 486,108 500,108 C514,108 530,136 530,176"/>
            <path d="M478,152 C480,124 490,96 500,96 C510,96 520,124 522,152"/>
            <path d="M488,132 C490,110 494,84 500,84 C506,84 510,110 512,132"/>
          </g>

          <rect x="260" y="40" width="120" height="220" rx="60" fill="#F2C3A0"/>
          <path d="M320,40 A60,60 0 0 1 380,100 L380,200 A60,60 0 0 1 320,260 L320,246 A46,46 0 0 0 366,200 L366,100 A46,46 0 0 0 320,54 Z" fill="#E0A87F" stroke="none"/>
          <ellipse cx="294" cy="82" rx="13" ry="22" fill="#FFFFFF" stroke="none" opacity=".45"/>
          <rect x="260" y="40" width="120" height="220" rx="60" fill="none"/>
          <g fill="none" stroke="#984800" stroke-width="4">
            <ellipse cx="320" cy="150" rx="10" ry="12"/>
            <ellipse cx="320" cy="150" rx="20" ry="24"/>
            <ellipse cx="320" cy="150" rx="30" ry="38"/>
            <ellipse cx="320" cy="150" rx="40" ry="52"/>
            <path d="M320,84 C296,84 282,110 282,150 C282,190 296,216 320,216"/>
          </g>

          <rect x="80" y="40" width="120" height="220" rx="60" fill="#F2C3A0"/>
          <path d="M140,40 A60,60 0 0 1 200,100 L200,200 A60,60 0 0 1 140,260 L140,246 A46,46 0 0 0 186,200 L186,100 A46,46 0 0 0 140,54 Z" fill="#E0A87F" stroke="none"/>
          <ellipse cx="114" cy="82" rx="13" ry="22" fill="#FFFFFF" stroke="none" opacity=".45"/>
          <rect x="80" y="40" width="120" height="220" rx="60" fill="none"/>
          <g fill="none" stroke="#984800" stroke-width="4">
            <path d="M104,226 C124,206 156,206 176,226"/>
            <path d="M104,200 C124,176 156,176 176,200"/>
            <path d="M104,174 C124,146 156,146 176,174"/>
            <path d="M106,148 C126,118 154,118 174,148"/>
            <path d="M110,122 C128,98 152,98 170,122"/>
            <path d="M116,96 C130,80 150,80 164,96"/>
          </g>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh6
    {
      type: "classify",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "reasoning",
      prompt: "صَنِّفْ: صِفةٌ نَتَشابَهُ فيها كُلُّنا أَمْ صِفةٌ نَختَلِفُ فيها؟",
      groups: [
        { name: "نَتَشابَهُ فيها", items: ["لَنا عَينانِ", "لَنا أَصابِعُ", "نَحتاجُ الطَّعامَ"] },
        { name: "نَختَلِفُ فيها", items: ["لَونُ العَينَينِ", "شَكلُ البَصمةِ", "الطّولُ"] }
      ]
    },

    // ⑥ إثرائي: الاستبعاد — استدلال — 3Bh6
    {
      type: "exclude",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "reasoning",
      prompt: "ثَلاثةٌ مِنْ هذِهِ أَنواعُ بَصَماتٍ وواحِدٌ دَخيلٌ — اضغَطْ على الدَّخيلِ.",
      options: ["الحَلَقاتُ", "الدَّوّاماتُ", "المُثَلَّثاتُ", "المُنحَنَياتُ"],
      answer: 2,
      reason: "المُثَلَّثاتُ شَكلٌ هَندَسيٌّ ولَيسَتْ نَوعاً مِنْ أَنواعِ البَصَماتِ الثَّلاثةِ."
    }

  ],

  // ٣-٥ تصنيف الكائنات الحية (كتاب التلميذ ص٤٢)
  "g3s-3-5": [

    // ① اختيار من متعدد — معرفة — 3Bh6
    {
      type: "mcq",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "إلى أَيِّ مَجموعةٍ يَنتَمي النَّسرُ؟",
      options: ["الحَيَواناتُ ذاتُ الرّيشِ", "الحَيَواناتُ ذاتُ الفَروِ", "الحَيَواناتُ ذاتُ الحَراشِفِ", "الحَيَواناتُ بِلا غِطاءٍ"],
      answer: 0,
      reason: "جِسمُ النَّسرِ مُغَطّىً بِالرّيشِ كَبَقِيَّةِ الطُّيورِ"
    },

    // ② صواب/خطأ — معرفة — 3Bh6
    {
      type: "true-false",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "الأَسَدُ مِنَ الحَيَواناتِ ذاتِ الفَروِ.",
      answer: true,
      reason: "جِسمُ الأَسَدِ مُغَطّىً بِالفَروِ، ولِذَكَرِهِ لَبْدةٌ كَثيفةٌ حَولَ رَأسِهِ"
    },

    // ③ التوصيل — معرفة — 3Bh6
    {
      type: "matching",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "صِلْ كُلَّ حَيَوانٍ بِغِطاءِ جِسمِهِ.",
      pairs: [
        { a: "نَسرٌ",   b: "ريشٌ" },
        { a: "أَسَدٌ",  b: "فَروٌ" },
        { a: "سَمَكةٌ", b: "حَراشِفُ" },
        { a: "بَجَعةٌ", b: "ريشٌ ناعِمٌ" }
      ]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh6
    {
      type: "hotspot",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "application",
      prompt: "اضغَطْ على الحَيَوانِ ذي الحَراشِفِ.",
      bg: "#eef7ff",
      spot: { x: 17, y: 50, r: 17 },
      svg: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="سمكة ودبّ وطائر">
        <g stroke="#111111" stroke-width="3">
          <path d="M40,150 C40,110 78,84 118,84 C158,84 190,110 196,150 C190,190 158,216 118,216 C78,216 40,190 40,150 Z" fill="#00A0E0"/>
          <path d="M40,150 C40,110 78,84 118,84 L118,216 C78,216 40,190 40,150 Z" fill="#40C0FF" stroke="none"/>
          <path d="M40,150 C40,110 78,84 118,84 C158,84 190,110 196,150 C190,190 158,216 118,216 C78,216 40,190 40,150 Z" fill="none"/>
          <path d="M196,150 L228,118 L222,150 L228,182 Z" fill="#0080C0"/>
          <path d="M100,84 C104,58 118,44 136,40 C140,58 132,76 118,86 Z" fill="#0080C0" stroke-width="2"/>
          <path d="M96,216 C100,238 112,250 128,254 C132,238 124,222 112,214 Z" fill="#0080C0" stroke-width="2"/>
          <g fill="none" stroke="#0060A0" stroke-width="3">
            <path d="M84,110 C96,126 96,174 84,190"/>
            <path d="M116,102 C130,122 130,178 116,198"/>
            <path d="M148,108 C162,126 162,174 148,192"/>
          </g>
          <path d="M64,104 C58,120 56,142 58,158" fill="none" stroke-width="4"/>
          <ellipse cx="78" cy="122" rx="14" ry="8" fill="#FFFFFF" stroke="none" opacity=".55" transform="rotate(-24 78 122)"/>

          <circle cx="304" cy="70" r="17" fill="#984800"/>
          <circle cx="368" cy="70" r="17" fill="#984800"/>
          <circle cx="304" cy="70" r="8" fill="#C06000" stroke-width="2"/>
          <circle cx="368" cy="70" r="8" fill="#C06000" stroke-width="2"/>
          <circle cx="336" cy="104" r="42" fill="#C06000"/>
          <path d="M336,62 A42,42 0 0 0 336,146 Z" fill="#E08000" stroke="none"/>
          <circle cx="336" cy="104" r="42" fill="none"/>
          <ellipse cx="336" cy="196" rx="68" ry="58" fill="#C06000"/>
          <path d="M336,138 A68,58 0 0 0 336,254 Z" fill="#E08000" stroke="none"/>
          <ellipse cx="336" cy="196" rx="68" ry="58" fill="none"/>
          <g fill="#984800" stroke-width="2">
            <ellipse cx="302" cy="248" rx="21" ry="16"/>
            <ellipse cx="370" cy="248" rx="21" ry="16"/>
          </g>
          <g fill="none" stroke="#984800" stroke-width="3">
            <path d="M288,168 C294,178 294,198 288,208"/>
            <path d="M302,158 C310,172 310,204 302,218"/>
          </g>
          <ellipse cx="316" cy="86" rx="12" ry="8" fill="#FFFFFF" stroke="none" opacity=".5" transform="rotate(-28 316 86)"/>

          <path d="M498,190 L436,172 L446,192 L432,212 L496,214 Z" fill="#2080E0"/>
          <g fill="#E0C060" stroke-width="2">
            <path d="M528,228 L528,264 A8,8 0 0 0 544,264 L544,228 Z"/>
            <path d="M566,228 L566,264 A8,8 0 0 0 582,264 L582,228 Z"/>
          </g>
          <path d="M576,74 C578,56 590,46 604,46 C600,62 594,72 586,82 Z" fill="#00A0E0" stroke-width="2"/>
          <circle cx="580" cy="106" r="34" fill="#40C0FF"/>
          <ellipse cx="552" cy="182" rx="66" ry="56" fill="#40C0FF"/>
          <path d="M552,126 A66,56 0 0 0 552,238 Z" fill="#20A0FF" stroke="none"/>
          <ellipse cx="552" cy="182" rx="66" ry="56" fill="none"/>
          <path d="M514,164 C546,148 582,156 596,180 C570,202 530,196 514,164 Z" fill="#2080E0"/>
          <g fill="none" stroke="#1060A0" stroke-width="3">
            <path d="M524,170 C548,162 574,168 588,182"/>
            <path d="M522,182 C546,176 570,180 584,194"/>
          </g>
          <ellipse cx="566" cy="92" rx="10" ry="7" fill="#FFFFFF" stroke="none" opacity=".5" transform="rotate(-30 566 92)"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh6
    {
      type: "classify",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "reasoning",
      prompt: "صَنِّفِ الحَيَواناتِ بِحَسَبِ غِطاءِ أَجسامِها.",
      groups: [
        { name: "ذاتُ ريشٍ",    items: ["بَجَعةٌ", "نَسرٌ"] },
        { name: "ذاتُ فَروٍ",   items: ["دُبٌّ", "ماعِزٌ"] },
        { name: "ذاتُ حَراشِفَ", items: ["سَمَكةٌ", "تِمساحٌ"] }
      ]
    },

    // ⑥ إثرائي: بطاقات الذاكرة — تطبيق — 3Bh6
    {
      type: "memory",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "application",
      prompt: "اقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ لِتَجِدَ الحَيَوانَ ومَجموعَتَهُ.",
      pairs: [
        { a: "بَجَعةٌ",  b: "ذاتُ ريشٍ" },
        { a: "قِردٌ",    b: "ذاتُ فَروٍ" },
        { a: "تِمساحٌ",  b: "ذاتُ حَراشِفَ" },
        { a: "فَراشةٌ",  b: "ذاتُ أَجنِحةٍ" }
      ]
    }

  ],

  // ٣-٦ تحقّق من تقدّمك — مراجعة الوحدة الثالثة (كتاب التلميذ ص٤٤)
  "g3s-3-6": [

    // ① اختيار من متعدد — معرفة — 3Bh2
    {
      type: "mcq",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ كائِنٌ حَيٌّ؟",
      options: ["نَملةٌ", "حاسوبٌ", "صَخرةٌ", "دَرّاجةٌ"],
      answer: 0,
      reason: "النَّملةُ تَتَنَفَّسُ وتَتَغَذّى وتَنمو وتَتَكاثَرُ، فَهيَ كائِنٌ حَيٌّ"
    },

    // ② صواب/خطأ — معرفة — 3Bh1
    {
      type: "true-false",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "knowledge",
      prompt: "كُلُّ الكائِناتِ الحَيَّةِ تَتَكاثَرُ.",
      answer: true,
      reason: "التَّكاثُرُ عَمَليَّةٌ حَيَويَّةٌ: لِكُلِّ كائِنٍ حَيٍّ صِغارٌ تُشبِهُهُ"
    },

    // ③ ملء الفراغ — معرفة — 3Bh6
    {
      type: "fill-blank",
      objective: "3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف",
      level: "knowledge",
      prompt: "أكمِلِ الجُملَةَ بسَحبِ الكَلِمَتَينِ المُناسِبَتَينِ.",
      text: "يُصَنِّفُ العُلَماءُ الحَيَواناتِ إلى ذاتِ {} وذاتِ فَروٍ وذاتِ {}.",
      answers: ["ريشٍ", "حَراشِفَ"],
      distractors: ["وَرَقٍ", "عَجَلاتٍ"]
    },

    // ④ تحديد الأجزاء — تطبيق — 3Bh2 (نفس رسم الدرس ٣-١، والمطلوب هنا غيرُ الحيِّ)
    {
      type: "hotspot",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "application",
      prompt: "اضغَطْ على الشَّيءِ غَيرِ الحَيِّ الَّذي يَعمَلُ بِالكَهرَباءِ.",
      bg: "#eef7ff",
      spot: { x: 50, y: 37.5, r: 17 },
      svg: `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="فراشة وحاسوب وصخرة">
        <g stroke="#111111" stroke-width="3">
          <path d="M100,112 C56,62 20,72 20,112 C20,150 58,166 100,154 Z" fill="#FF8000"/>
          <path d="M120,112 C164,62 200,72 200,112 C200,150 162,166 120,154 Z" fill="#FF8000"/>
          <path d="M100,168 C64,178 38,200 48,230 C58,256 92,250 104,214 Z" fill="#E04000"/>
          <path d="M120,168 C156,178 182,200 172,230 C162,256 128,250 116,214 Z" fill="#E04000"/>
          <path d="M96,118 C66,90 38,96 38,116 C38,140 64,150 96,144 Z" fill="#FFA000" stroke-width="2"/>
          <path d="M124,118 C154,90 182,96 182,116 C182,140 156,150 124,144 Z" fill="#FFA000" stroke-width="2"/>
          <circle cx="62" cy="118" r="9" fill="#FFFFC0" stroke-width="2"/>
          <circle cx="158" cy="118" r="9" fill="#FFFFC0" stroke-width="2"/>
          <circle cx="72" cy="214" r="8" fill="#FF8000" stroke-width="2"/>
          <circle cx="148" cy="214" r="8" fill="#FF8000" stroke-width="2"/>
          <rect x="101" y="94" width="18" height="130" rx="9" fill="#606060"/>
          <path d="M106,102 L106,214" stroke="#C0C0C0" stroke-width="4" fill="none"/>
          <path d="M104,94 C96,70 86,60 74,56" fill="none"/>
          <path d="M116,94 C124,70 134,60 146,56" fill="none"/>
          <circle cx="72" cy="54" r="6" fill="#606060"/>
          <circle cx="148" cy="54" r="6" fill="#606060"/>

          <rect x="228" y="58" width="164" height="124" rx="14" fill="#808080"/>
          <rect x="242" y="72" width="136" height="96" rx="8" fill="#40C0FF" stroke-width="2"/>
          <path d="M250,76 L274,76 L250,124 Z" fill="#FFFFFF" stroke="none" opacity=".55"/>
          <path d="M242,138 L378,138 L378,160 A8,8 0 0 1 370,168 L250,168 A8,8 0 0 1 242,160 Z" fill="#2080E0" stroke-width="2"/>
          <rect x="292" y="182" width="36" height="26" fill="#606060"/>
          <rect x="254" y="208" width="112" height="16" rx="8" fill="#606060"/>
          <rect x="222" y="238" width="176" height="34" rx="10" fill="#C0C0C0"/>
          <g stroke-width="2" fill="#808080">
            <rect x="234" y="248" width="20" height="14" rx="3"/>
            <rect x="262" y="248" width="20" height="14" rx="3"/>
            <rect x="290" y="248" width="20" height="14" rx="3"/>
            <rect x="318" y="248" width="20" height="14" rx="3"/>
            <rect x="346" y="248" width="40" height="14" rx="3"/>
          </g>

          <path d="M424,232 C412,206 424,174 452,156 C478,138 514,132 544,144 C574,156 590,182 588,208 C586,232 566,248 540,250 L452,250 C436,250 428,244 424,232 Z" fill="#808080"/>
          <path d="M428,208 C430,182 452,160 484,150 C514,141 548,146 570,166 C548,176 514,172 484,182 C456,191 436,198 428,208 Z" fill="#C0C0C0" stroke-width="2"/>
          <path d="M434,240 C450,248 476,252 506,250 L540,250 C562,248 578,240 585,224 C558,236 514,240 474,236 C456,234 442,236 434,240 Z" fill="#606060" stroke-width="2"/>
          <path d="M504,166 L516,196 L502,220" fill="none" stroke-width="3"/>
          <path d="M452,180 C466,170 482,166 496,168" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".5"/>
        </g>
      </svg>`
    },

    // ⑤ التصنيف في مجموعات — استدلال — 3Bh1
    {
      type: "classify",
      objective: "3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر",
      level: "reasoning",
      prompt: "صَنِّفْ: عَمَليَّةٌ حَيَوِيَّةٌ تَقومُ بِها الكائِناتُ الحَيَّةُ أَمْ لا؟",
      groups: [
        { name: "عَمَليَّةٌ حَيَوِيَّةٌ", items: ["التَّنَفُّسُ", "النُّمُوُّ", "التَّكاثُرُ"] },
        { name: "لَيسَتْ كَذلِكَ",      items: ["الصَّدَأُ", "الشَّحنُ بِالكَهرَباءِ", "الذَّوَبانُ"] }
      ]
    },

    // ⑥ إثرائي: التلوين — تطبيق — 3Bh2
    // كل شكل مجموعةُ cpart واحدةٌ بلون واحد (طبقةُ التلوين تفرض تعبئةً واحدة)،
    // والأسماء تحت الأشكال نصوصٌ خارج المجموعات فلا تُلوَّن.
    {
      type: "color",
      objective: "3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة",
      level: "application",
      prompt: "لَوِّنِ الكائِناتِ الحَيَّةَ بِالأَخضَرِ والأَشياءَ غَيرَ الحَيَّةِ بِالرَّماديِّ.",
      bg: "#fdf9ee",
      palette: [
        { name: "أخضر",  color: "#4A9018" },
        { name: "رمادي", color: "#808080" }
      ],
      parts: [
        { name: "شَجَرة", color: "#4A9018" },
        { name: "سَمَكة", color: "#4A9018" },
        { name: "زَهرة",  color: "#4A9018" },
        { name: "صَخرة",  color: "#808080" },
        { name: "كوب",    color: "#808080" },
        { name: "مِفتاح", color: "#808080" }
      ],
      svg: `<svg viewBox="0 0 620 344" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="ستة أشكال للتلوين: شجرة وسمكة وزهرة وصخرة وكوب ومفتاح">
        <g class="cpart" data-name="شَجَرة"><path d="M492,150 L492,100 A44,44 0 1 1 518,100 L518,150 Z"/></g>
        <text x="505" y="180" font-size="20" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">شَجَرة</text>

        <g class="cpart" data-name="سَمَكة"><path d="M258,90 C258,64 282,46 310,46 C338,46 360,64 364,90 C360,116 338,134 310,134 C282,134 258,116 258,90 Z M364,90 L396,60 L390,90 L396,120 Z"/></g>
        <text x="320" y="180" font-size="20" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">سَمَكة</text>

        <g class="cpart" data-name="زَهرة"><path d="M94,48 A21,21 0 1 0 136,48 A21,21 0 1 0 94,48 Z M126.3,71.5 A21,21 0 1 0 168.3,71.5 A21,21 0 1 0 126.3,71.5 Z M114,109.5 A21,21 0 1 0 156,109.5 A21,21 0 1 0 114,109.5 Z M74,109.5 A21,21 0 1 0 116,109.5 A21,21 0 1 0 74,109.5 Z M61.7,71.5 A21,21 0 1 0 103.7,71.5 A21,21 0 1 0 61.7,71.5 Z M93,82 A22,22 0 1 0 137,82 A22,22 0 1 0 93,82 Z M109,118 L109,158 L121,158 L121,118 Z M109,136 C94,126 76,130 70,142 C82,154 100,150 109,140 Z"/></g>
        <text x="115" y="180" font-size="20" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">زَهرة</text>

        <g class="cpart" data-name="صَخرة"><path d="M452,296 C442,278 452,256 472,244 C494,230 522,228 544,238 C566,248 576,266 574,282 C572,296 558,304 542,304 L470,304 C460,304 456,300 452,296 Z"/></g>
        <text x="513" y="330" font-size="20" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">صَخرة</text>

        <g class="cpart" data-name="كوب"><path d="M272,214 L352,214 L342,296 C341,302 336,306 330,306 L294,306 C288,306 283,302 282,296 Z M352,230 C374,226 388,236 386,252 C384,266 370,273 350,272 L352,258 C362,258 370,256 371,250 C372,243 364,240 352,242 Z"/></g>
        <text x="316" y="330" font-size="20" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">كوب</text>

        <g class="cpart" data-name="مِفتاح"><path d="M68,255 A32,32 0 1 1 132,255 A32,32 0 1 1 68,255 Z M132,247 L200,247 L200,265 L188,265 L188,281 L172,281 L172,265 L156,265 L156,283 L140,283 L140,265 L132,265 Z M90,255 A10,10 0 1 0 110,255 A10,10 0 1 0 90,255 Z"/></g>
        <text x="134" y="330" font-size="20" font-weight="700" text-anchor="middle" fill="#2f3a2c" font-family="Cairo, Tajawal, sans-serif">مِفتاح</text>
      </svg>`
    }

  ],

  /* ═══ الرياضيات — الصف الأول · الوحدة ١أ · الفصل ١: العدُّ حتى العشرة ═══ */

  "g1m-1-1": [
    {
      type: "count-tap",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "knowledge",
      prompt: "اِنْقُرْ سَبْعَ فَراشاتٍ وعُدَّها.",
      mode: "each", glyph: "🦋", count: 10, target: 7
    },
    {
      type: "mcq",
      objective: "1Nn2: يقرأ ويكتب الأعداد من ٠ حتى ٢٠",
      level: "knowledge",
      prompt: "أَيُّ هٰذِهِ هُوَ العَدَدُ ثَمانِيَةٌ؟",
      options: ["٦", "٨", "٩", "٧"],
      answer: 1
    },
    {
      type: "matching",
      objective: "1Nn2: يقرأ ويكتب الأعداد من ٠ حتى ٢٠",
      level: "application",
      prompt: "صِلْ كُلَّ عَدَدٍ بِاسْمِهِ.",
      pairs: [
        { a: "٤",  b: "أَرْبَعَةٌ" },
        { a: "٦",  b: "سِتَّةٌ" },
        { a: "٨",  b: "ثَمانِيَةٌ" },
        { a: "١٠", b: "عَشَرَةٌ" }
      ]
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "application",
      prompt: "رَتِّبِ الأَعْدادَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
      steps: ["٣", "٥", "٦", "٨", "٩"]
    },
    {
      type: "pattern",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "reasoning",
      prompt: "أَكْمِلِ النَّمَطَ: العَدُّ واحِدًا واحِدًا.",
      items: ["١", "٢", "__", "٤", "٥", "__", "٧"],
      answers: ["٣", "٦"],
      distractors: ["٨", "٩"],
      rule: "نَزيدُ ١ كُلَّ مَرَّةٍ"
    },
    {
      type: "memory",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ عَدَدٍ بِمَجْموعَتِهِ.",
      pairs: [
        { a: "٢", b: "🔵🔵" },
        { a: "٣", b: "🔵🔵🔵" },
        { a: "٤", b: "🔵🔵🔵🔵" },
        { a: "٥", b: "🔵🔵🔵🔵🔵" }
      ]
    }
  ],

  "g1m-1-2": [
    {
      type: "mcq",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "knowledge",
      prompt: "كَمْ صَدَفَةً في هٰذِهِ المَجْموعَةِ؟ 🐚🐚🐚🐚",
      options: ["٣", "٤", "٥", "٦"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "knowledge",
      statement: "في هٰذِهِ المَجْموعَةِ سِتُّ صَدَفاتٍ: 🐚🐚🐚🐚🐚",
      answer: false
    },
    {
      type: "count-tap",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "application",
      prompt: "اِنْقُرْ تِسْعَ صَدَفاتٍ وعُدَّها.",
      mode: "each", glyph: "🐚", count: 12, target: 9
    },
    {
      type: "matching",
      objective: "1Nn2: يقرأ ويكتب الأعداد من ٠ حتى ٢٠",
      level: "application",
      prompt: "صِلْ كُلَّ مَجْموعَةٍ بِعَدَدِها.",
      pairs: [
        { a: "🐚",            b: "١" },
        { a: "🐚🐚",          b: "٢" },
        { a: "🐚🐚🐚🐚",       b: "٤" },
        { a: "🐚🐚🐚🐚🐚🐚",    b: "٦" }
      ]
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "reasoning",
      prompt: "رَتِّبِ المَجْموعاتِ مِنَ الأَقَلِّ إِلَى الأَكْثَرِ.",
      steps: ["🐚", "🐚🐚", "🐚🐚🐚🐚", "🐚🐚🐚🐚🐚🐚"]
    },
    {
      type: "exclude",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "reasoning",
      prompt: "كُلُّها مَجْموعاتٌ فيها أَرْبَعَةُ عَناصِرَ — أَيُّها لا يَنْتَمي؟",
      options: ["🐚🐚🐚🐚", "⭐⭐⭐⭐", "🌸🌸🌸", "🍎🍎🍎🍎"],
      answer: 2,
      reason: "فيها ثَلاثَةُ عَناصِرَ لا أَرْبَعَةً"
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٢: العدد عشرة ═══ */

  "g1m-2-1": [
    {
      type: "mcq",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "knowledge",
      prompt: "في إِطارِ العَشَرَةِ خَمْسَةُ أَقْراصٍ حَمْراءَ وثَلاثَةٌ صَفْراءُ. كَمْ قُرْصًا فيهِ؟",
      options: ["٧", "٨", "٩", "١٠"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "knowledge",
      prompt: "أَكْمِلِ المُعادَلَةَ لِتُكَوِّنَ العَشَرَةَ.",
      tokens: ["٦", "+", "__", "=", "١٠"],
      bank: ["٢", "٣", "٤", "٥"],
      answers: ["٤"]
    },
    {
      type: "count-tap",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "application",
      prompt: "اِنْقُرْ سِتَّةَ أَقْراصٍ، ثُمَّ فَكِّرْ: كَمْ يَنْقُصُ لِتُكْمِلَ العَشَرَةَ؟",
      mode: "each", glyph: "🔴", count: 10, target: 6
    },
    {
      type: "drag-drop",
      objective: "1Nc8: يفهم الجمع على أنه العدّ تصاعديًّا وجمع مجموعتين",
      level: "application",
      prompt: "اِسْحَبِ العَدَدَ إِلَى إِطارِ العَشَرَةِ الَّذي يَحْمِلُ هٰذا العَدَدَ مِنَ الأَقْراصِ.",
      bg: "#fdf6ec",
      svg: `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="tf-disc">
            <circle r="22" fill="#FF2020" stroke="#111111" stroke-width="2"/>
            <ellipse cx="-6" cy="-8" rx="9" ry="6" fill="#FF8080" opacity=".85"/>
          </g>
        </defs>
        <g stroke="#111111" stroke-linecap="round" stroke-linejoin="round" fill="#FFFFFF">
          <rect x="20"  y="110" width="160" height="128" rx="10" stroke-width="3"/>
          <rect x="200" y="110" width="160" height="128" rx="10" stroke-width="3"/>
          <rect x="380" y="110" width="160" height="128" rx="10" stroke-width="3"/>
        </g>
        <g stroke="#111111" stroke-width="2" stroke-linecap="round">
          <path d="M52,110 V238 M84,110 V238 M116,110 V238 M148,110 V238 M20,174 H180"/>
          <path d="M232,110 V238 M264,110 V238 M296,110 V238 M328,110 V238 M200,174 H360"/>
          <path d="M412,110 V238 M444,110 V238 M476,110 V238 M508,110 V238 M380,174 H540"/>
        </g>
        <g>
          <use href="#tf-disc" x="36"  y="142"/><use href="#tf-disc" x="68"  y="142"/>
          <use href="#tf-disc" x="100" y="142"/><use href="#tf-disc" x="132" y="142"/>
        </g>
        <g>
          <use href="#tf-disc" x="216" y="142"/><use href="#tf-disc" x="248" y="142"/>
          <use href="#tf-disc" x="280" y="142"/><use href="#tf-disc" x="312" y="142"/>
          <use href="#tf-disc" x="344" y="142"/><use href="#tf-disc" x="216" y="206"/>
        </g>
        <g>
          <use href="#tf-disc" x="396" y="142"/><use href="#tf-disc" x="428" y="142"/>
          <use href="#tf-disc" x="460" y="142"/><use href="#tf-disc" x="492" y="142"/>
          <use href="#tf-disc" x="524" y="142"/><use href="#tf-disc" x="396" y="206"/>
          <use href="#tf-disc" x="428" y="206"/><use href="#tf-disc" x="460" y="206"/>
        </g>
      </svg>`,
      targets: [
        { answer: "٤", box: { x: 82, y: 16 }, dot: { x: 18, y: 58 } },
        { answer: "٦", box: { x: 50, y: 16 }, dot: { x: 50, y: 58 } },
        { answer: "٨", box: { x: 18, y: 16 }, dot: { x: 82, y: 58 } }
      ]
    },
    {
      type: "matching",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "reasoning",
      prompt: "صِلْ كُلَّ عَدَدٍ بِشَريكِهِ الَّذي يُكَوِّنُ مَعَهُ عَشَرَةً.",
      pairs: [
        { a: "١", b: "٩" },
        { a: "٢", b: "٨" },
        { a: "٣", b: "٧" },
        { a: "٤", b: "٦" }
      ]
    },
    {
      type: "memory",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ جَمْعٍ بِمَجْموعِهِ.",
      pairs: [
        { a: "٦ + ٤", b: "١٠" },
        { a: "٥ + ٣", b: "٨" },
        { a: "٤ + ٣", b: "٧" },
        { a: "٢ + ٧", b: "٩" }
      ]
    }
  ],

  "g1m-2-2": [
    {
      type: "mcq",
      objective: "1Nc9: يفهم الطرح على أنه العدّ تنازليًّا والأخذ بعيدًا",
      level: "knowledge",
      prompt: "في إِطارِ العَشَرَةِ عَشَرَةُ أَقْراصٍ، أَخَذْنا أَرْبَعَةً. كَمْ بَقِيَ؟",
      options: ["٥", "٦", "٧", "٤"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc9: يفهم الطرح على أنه العدّ تنازليًّا والأخذ بعيدًا",
      level: "knowledge",
      prompt: "أَكْمِلِ المُعادَلَةَ: كَمْ يَبْقى؟",
      tokens: ["١٠", "−", "٣", "=", "__"],
      bank: ["٦", "٧", "٨", "٩"],
      answers: ["٧"]
    },
    {
      type: "count-tap",
      objective: "1Nc9: يفهم الطرح على أنه العدّ تنازليًّا والأخذ بعيدًا",
      level: "application",
      prompt: "أَخَذْنا مِنَ العَشَرَةِ خَمْسَةً. اِنْقُرِ الأَقْراصَ الباقِيَةَ وعُدَّها.",
      mode: "each", glyph: "🔴", count: 8, target: 5
    },
    {
      type: "fill-blank",
      objective: "1Nc11: يجمع / يطرح عددًا مؤلَّفًا من رقم واحد بواسطة العدّ تصاعديًّا وللخلف",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ العَدَدِ المُناسِبِ.",
      text: "أَخَذْنا مِنَ العَشَرَةِ سِتَّةً فَبَقِيَ {} ، وأَخَذْنا مِنَ العَشَرَةِ ثَمانِيَةً فَبَقِيَ {}",
      answers: ["٤", "٢"],
      distractors: ["٣", "٥"]
    },
    {
      type: "matching",
      objective: "1Nc11: يجمع / يطرح عددًا مؤلَّفًا من رقم واحد بواسطة العدّ تصاعديًّا وللخلف",
      level: "reasoning",
      prompt: "صِلْ كُلَّ جُمْلَةِ طَرْحٍ بِناتِجِها.",
      pairs: [
        { a: "١٠ − ١", b: "٩" },
        { a: "١٠ − ٥", b: "٥" },
        { a: "١٠ − ٧", b: "٣" },
        { a: "١٠ − ٩", b: "١" }
      ]
    },
    {
      type: "find-error",
      objective: "1Nc9: يفهم الطرح على أنه العدّ تنازليًّا والأخذ بعيدًا",
      level: "reasoning",
      prompt: "البِطاقَةُ تَقولُ إِنَّ في الإِطارِ سَبْعَةَ أَقْراصٍ — اِضْغَطْ عَلى الخَطَإِ.",
      bg: "#fdf6ec",
      spot: { x: 82, y: 50, r: 15 },
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="fe-disc">
            <circle r="24" fill="#20A0FF" stroke="#111111" stroke-width="2"/>
            <ellipse cx="-7" cy="-9" rx="10" ry="7" fill="#A8DCFF" opacity=".9"/>
          </g>
        </defs>
        <rect x="30" y="66" width="340" height="128" rx="12" fill="#FFFFFF"
              stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
        <g stroke="#111111" stroke-width="2" stroke-linecap="round">
          <path d="M98,66 V194 M166,66 V194 M234,66 V194 M302,66 V194 M30,130 H370"/>
        </g>
        <g>
          <use href="#fe-disc" x="64"  y="98"/><use href="#fe-disc" x="132" y="98"/>
          <use href="#fe-disc" x="200" y="98"/><use href="#fe-disc" x="268" y="98"/>
          <use href="#fe-disc" x="336" y="98"/><use href="#fe-disc" x="64"  y="162"/>
        </g>
        <g>
          <rect x="404" y="86" width="112" height="88" rx="14" fill="#FFFFC0"
                stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
          <text x="460" y="148" font-size="58" font-weight="800" text-anchor="middle"
                fill="#111111" font-family="Cairo, Tajawal, sans-serif">٧</text>
        </g>
      </svg>`
    }
  ],

  "g1m-2-3": [
    {
      type: "true-false",
      objective: "1Nc5: يعرف الضعف حتى ٥ على الأقل",
      level: "knowledge",
      statement: "ضِعْفُ العَدَدِ ثَلاثَةٍ هُوَ سِتَّةٌ.",
      answer: true
    },
    {
      type: "mcq",
      objective: "1Nc5: يعرف الضعف حتى ٥ على الأقل",
      level: "knowledge",
      prompt: "ما ضِعْفُ العَدَدِ أَرْبَعَةٍ؟",
      options: ["٦", "٧", "٨", "٩"],
      answer: 2
    },
    {
      type: "array",
      mode: "build",
      objective: "1Nc5: يعرف الضعف حتى ٥ على الأقل",
      level: "application",
      prompt: "ابْنِ مَصْفوفَةً فيها صَفّانِ، في كُلِّ صَفٍّ خَمْسَةُ مُرَبَّعاتٍ — لِتَرى ضِعْفَ الخَمْسَةِ.",
      rows: 2, cols: 5,
      answerSentence: "٥ + ٥ = ١٠"
    },
    {
      type: "fill-blank",
      objective: "1Nc5: يعرف الضعف حتى ٥ على الأقل",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ العَدَدِ المُناسِبِ.",
      text: "ضِعْفُ الاِثْنَيْنِ هُوَ {} ، وضِعْفُ الخَمْسَةِ هُوَ {}",
      answers: ["٤", "١٠"],
      distractors: ["٦", "٨"]
    },
    {
      type: "classify",
      objective: "1Nc5: يعرف الضعف حتى ٥ على الأقل",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ جَمْعٍ: أَهُوَ ضِعْفٌ أَمْ لا؟",
      groups: [
        { name: "ضِعْفٌ",     items: ["٣ + ٣", "٥ + ٥"] },
        { name: "لَيْسَ ضِعْفًا", items: ["٤ + ٢", "٦ + ١"] }
      ]
    },
    {
      type: "color",
      objective: "1Nc5: يعرف الضعف حتى ٥ على الأقل",
      level: "reasoning",
      prompt: "لَوِّنِ المَجْموعَةَ الَّتي تُظْهِرُ ضِعْفًا بِالأَخْضَرِ، والَّتي لَيْسَتْ ضِعْفًا بِالأَحْمَرِ.",
      bg: "#fdf6ec",
      showLabels: true,
      palette: [
        { name: "أَخْضَر", color: "#60C020" },
        { name: "أَحْمَر", color: "#FF2020" }
      ],
      parts: [
        { name: "٢ + ٢", color: "#60C020" },
        { name: "٣ + ٣", color: "#60C020" },
        { name: "٤ + ١", color: "#FF2020" }
      ],
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g class="cpart" data-name="٢ + ٢" id="part-d2" stroke="#111111" stroke-width="2"
           stroke-linejoin="round">
          <circle cx="52"  cy="96"  r="20"/><circle cx="100" cy="96"  r="20"/>
          <circle cx="52"  cy="150" r="20"/><circle cx="100" cy="150" r="20"/>
        </g>
        <g class="cpart" data-name="٣ + ٣" id="part-d3" stroke="#111111" stroke-width="2"
           stroke-linejoin="round">
          <circle cx="228" cy="96"  r="20"/><circle cx="276" cy="96"  r="20"/>
          <circle cx="324" cy="96"  r="20"/><circle cx="228" cy="150" r="20"/>
          <circle cx="276" cy="150" r="20"/><circle cx="324" cy="150" r="20"/>
        </g>
        <g class="cpart" data-name="٤ + ١" id="part-n4" stroke="#111111" stroke-width="2"
           stroke-linejoin="round">
          <circle cx="428" cy="96"  r="20"/><circle cx="476" cy="96"  r="20"/>
          <circle cx="524" cy="96"  r="20"/><circle cx="452" cy="150" r="20"/>
          <circle cx="500" cy="150" r="20"/>
        </g>
      </svg>`
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٤: العد ما بعد العشرة ═══ */

  "g1m-4-1": [
    {
      type: "mcq",
      objective: "1Nc2: يبدأ بالتعرّف إلى أزواج الأعداد ٦، ٧، ٨، ٩، ١٠",
      level: "knowledge",
      prompt: "مَجْموعُ خَمْسَةٍ وواحِدٍ هُوَ:",
      options: ["٤", "٥", "٦", "٧"],
      answer: 2
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc8: يفهم الجمع على أنه العدّ تصاعديًّا وجمع مجموعتين",
      level: "knowledge",
      prompt: "أَكْمِلِ المُعادَلَةَ.",
      tokens: ["٤", "+", "٣", "=", "__"],
      bank: ["٥", "٦", "٧", "٨"],
      answers: ["٧"]
    },
    {
      type: "count-tap",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "application",
      prompt: "اِنْقُرْ ثَماني دَوائِرَ وعُدَّها.",
      mode: "each", glyph: "🟢", count: 11, target: 8
    },
    {
      type: "matching",
      objective: "1Nc2: يبدأ بالتعرّف إلى أزواج الأعداد ٦، ٧، ٨، ٩، ١٠",
      level: "application",
      prompt: "صِلْ كُلَّ زَوْجٍ بِمَجْموعِهِ.",
      pairs: [
        { a: "٥ + ١", b: "٦" },
        { a: "٤ + ٣", b: "٧" },
        { a: "٢ + ٦", b: "٨" },
        { a: "٣ + ٦", b: "٩" }
      ]
    },
    {
      type: "classify",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ زَوْجٍ حَسَبَ مَجْموعِهِ.",
      groups: [
        { name: "مَجْموعُهُ ٧", items: ["٤ + ٣", "٥ + ٢"] },
        { name: "مَجْموعُهُ ٩", items: ["٦ + ٣", "٨ + ١"] }
      ]
    },
    {
      type: "exclude",
      objective: "1Nc2: يبدأ بالتعرّف إلى أزواج الأعداد ٦، ٧، ٨، ٩، ١٠",
      level: "reasoning",
      prompt: "كُلُّها أَزْواجٌ مَجْموعُها ثَمانِيَةٌ — أَيُّها لا يَنْتَمي؟",
      options: ["٥ + ٣", "٦ + ٢", "٤ + ٤", "٥ + ٤"],
      answer: 3,
      reason: "٥ + ٤ = ٩ لا ٨"
    }
  ],

  "g1m-4-2": [
    {
      type: "mcq",
      objective: "1Nn8: يستخدم المفردات «أكبر» و«أقل» لوصف عدد يقع بين عددين آخرين",
      level: "knowledge",
      prompt: "أَيُّ عَدَدٍ يَقَعُ بَيْنَ ١٤ و١٦؟",
      options: ["١٣", "١٥", "١٧", "١٢"],
      answer: 1
    },
    {
      type: "place-value",
      mode: "build",
      objective: "1Nn6: يجزّئ العدد من منزلتين إلى آحاد وعشرات والعكس",
      level: "knowledge",
      prompt: "ابْنِ العَدَدَ ١٣ بِالعَشَراتِ والآحادِ.",
      target: 13
    },
    {
      type: "number-line",
      mode: "place",
      objective: "1Nn9: يرتّب الأعداد حتى ٢٠ على الأقل على أشرطة الأعداد",
      level: "application",
      prompt: "ضَعِ المُؤَشِّرَ عَلى العَدَدِ ١٧.",
      min: 10, max: 20, step: 1, labelEvery: 1,
      target: 17
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "application",
      prompt: "رَتِّبِ الأَعْدادَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
      steps: ["١١", "١٢", "١٣", "١٤", "١٥"]
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم المفردات «أكبر» و«أقل» لوصف عدد يقع بين عددين آخرين",
      level: "reasoning",
      prompt: "ضَعِ الرَّمْزَ المُناسِبَ بَيْنَ كُلِّ عَدَدَيْنِ.",
      pairs: [ { a: "١٢", b: "١٧" }, { a: "١٥", b: "١٥" }, { a: "١٩", b: "١٣" } ]
    },
    {
      type: "slider",
      objective: "1Nn9: يرتّب الأعداد حتى ٢٠ على الأقل على أشرطة الأعداد",
      level: "application",
      prompt: "اِسْحَبِ المُؤَشِّرَ إِلَى العَدَدِ سِتَّةَ عَشَرَ.",
      min: 10, max: 20, answer: 16, tolerance: 0, ticks: 2
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٥: التقدير ═══ */

  "g1m-5-1": [
    {
      type: "mcq",
      objective: "1Nn11: يعطي تقديرًا معقولًا لبعض الأشياء قبل عدّها حتى ٣٠",
      level: "knowledge",
      prompt: "خَمِّنْ: كَمْ مُكَعَّبًا هُنا تَقْريبًا؟ 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦",
      options: ["٥", "١٢", "٢٥", "٣٠"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Nn11: يعطي تقديرًا معقولًا لبعض الأشياء قبل عدّها حتى ٣٠",
      level: "knowledge",
      statement: "التَّقْديرُ تَخْمينٌ قَريبٌ مِنَ العَدَدِ الحَقيقِيِّ.",
      answer: true
    },
    {
      type: "count-tap",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "application",
      prompt: "الآنَ عُدَّ لِلتَّحَقُّقِ: اِنْقُرِ اثْنَيْ عَشَرَ مُكَعَّبًا.",
      mode: "each", glyph: "🟦", count: 15, target: 12
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "application",
      prompt: "رَتِّبِ التَّقْديراتِ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
      steps: ["٥", "١٠", "١٥", "٢٠", "٢٥"]
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم المفردات «أكبر» و«أقل» لوصف عدد يقع بين عددين آخرين",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ التَّقْديرِ والعَدَدِ الحَقيقِيِّ.",
      pairs: [ { a: "١٢", b: "٢٠" }, { a: "٢٥", b: "٢٥" }, { a: "٣٠", b: "١٨" } ]
    },
    {
      type: "memory",
      objective: "1Nn2: يقرأ ويكتب الأعداد من ٠ حتى ٢٠",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ عَدَدٍ بِاسْمِهِ.",
      pairs: [
        { a: "١٠", b: "عَشَرَة" },
        { a: "١٥", b: "خَمْسَةَ عَشَرَ" },
        { a: "٢٠", b: "عِشْرونَ" },
        { a: "٣٠", b: "ثَلاثونَ" }
      ]
    }
  ],

  "g1m-5-2": [
    {
      type: "mcq",
      objective: "1Nn11: يعطي تقديرًا معقولًا لبعض الأشياء قبل عدّها حتى ٣٠",
      level: "knowledge",
      prompt: "في الكَفِّ سِتُّ قِطَعٍ. فَإِذا كانَ ما في الكَفَّيْنِ ضِعْفَها، فَكَمْ قِطْعَةً فيهِما؟",
      options: ["٨", "١٠", "١٢", "١٤"],
      answer: 2
    },
    {
      type: "true-false",
      objective: "1Nn11: يعطي تقديرًا معقولًا لبعض الأشياء قبل عدّها حتى ٣٠",
      level: "knowledge",
      statement: "إِذا كانَ في الكَفِّ خَمْسُ قِطَعٍ فَإِنَّ ضِعْفَها إِحْدى عَشْرَةَ قِطْعَةً.",
      answer: false
    },
    {
      type: "count-tap",
      objective: "1Nn3: يعدّ أغراضًا حتى الـ٢٠، ويتعرّف حفظ الأعداد",
      level: "application",
      prompt: "اِنْقُرْ عَشْرَ قِطَعٍ وعُدَّها.",
      mode: "each", glyph: "🟨", count: 14, target: 10
    },
    {
      type: "classify",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "application",
      prompt: "في الكَفِّ نَحْوُ اثْنَتَيْ عَشْرَةَ قِطْعَةً — صَنِّفِ التَّقْديراتِ.",
      groups: [
        { name: "تَقْديرٌ مَعْقولٌ",     items: ["١٠ قِطَعٍ", "١٣ قِطْعَةً"] },
        { name: "تَقْديرٌ غَيْرُ مَعْقولٍ", items: ["١٠٠ قِطْعَةٍ", "قِطْعَتانِ"] }
      ]
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم المفردات «أكبر» و«أقل» لوصف عدد يقع بين عددين آخرين",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ عَدَدِ قِطَعِ الكَفِّ وعَدَدِ قِطَعِ الكَفَّيْنِ.",
      pairs: [ { a: "٦", b: "١٢" }, { a: "٩", b: "٩" }, { a: "١٤", b: "٧" } ]
    },
    {
      type: "exclude",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "reasoning",
      prompt: "تَقْديرٌ لِعَدَدِ القِطَعِ في كَفٍّ واحِدَةٍ — أَيُّها غَيْرُ مَعْقولٍ؟",
      options: ["٧ قِطَعٍ", "١٠ قِطَعٍ", "١٢ قِطْعَةً", "٩٠ قِطْعَةً"],
      answer: 3,
      reason: "الكَفُّ الواحِدَةُ لا تَحْمِلُ تِسْعينَ قِطْعَةً"
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٧: العدُّ لما بعد العشرين ═══ */

  "g1m-7-1": [
    {
      type: "mcq",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "knowledge",
      prompt: "أَيُّ زَوْجٍ مَجْموعُهُ سَبْعَةٌ؟",
      options: ["٣ + ٥", "٤ + ٣", "٦ + ٢", "٥ + ٥"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc8: يفهم الجمع على أنه العدّ تصاعديًّا وجمع مجموعتين",
      level: "knowledge",
      prompt: "أَكْمِلِ المُعادَلَةَ: ما العَدَدُ المَفْقودُ؟",
      tokens: ["__", "+", "٢", "=", "٧"],
      bank: ["٣", "٤", "٥", "٦"],
      answers: ["٥"]
    },
    {
      type: "matching",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "application",
      prompt: "صِلْ كُلَّ عَدَدٍ بِشَريكِهِ الَّذي يُكَوِّنُ مَعَهُ سَبْعَةً.",
      pairs: [
        { a: "٦", b: "١" },
        { a: "٥", b: "٢" },
        { a: "٤", b: "٣" },
        { a: "٧", b: "٠" }
      ]
    },
    {
      type: "fill-blank",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ العَدَدِ المُناسِبِ.",
      text: "سِتَّةٌ و {} يُكَوِّنانِ سَبْعَةً، وخَمْسَةٌ و {} يُكَوِّنانِ سَبْعَةً",
      answers: ["١", "٢"],
      distractors: ["٣", "٤"]
    },
    {
      type: "true-false",
      objective: "1Nc15: يفهم أن تغيير ترتيب عملية الجمع لا يغيّر ناتجها",
      level: "reasoning",
      statement: "٣ + ٤ يُساوي ٤ + ٣.",
      answer: true
    },
    {
      type: "find-error",
      objective: "1Nc1: يعرف كل أزواج الأعداد حتى عشرة",
      level: "reasoning",
      prompt: "كُلُّ سَطْرٍ يَجِبُ أَنْ يَكونَ مَجْموعُهُ سَبْعَةً — اِضْغَطْ عَلى السَّطْرِ الخاطِئِ.",
      bg: "#fdf6ec",
      spot: { x: 50, y: 80, r: 17 },
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g font-family="Cairo, Tajawal, sans-serif" font-size="42" font-weight="800"
           fill="#111111" text-anchor="middle">
          <g>
            <rect x="130" y="24" width="300" height="58" rx="14" fill="#FFFFC0"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="66">٦ + ١ = ٧</text>
          </g>
          <g>
            <rect x="130" y="100" width="300" height="58" rx="14" fill="#FFFFC0"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="142">٤ + ٣ = ٧</text>
          </g>
          <g>
            <rect x="130" y="176" width="300" height="58" rx="14" fill="#FFFFC0"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="218">٥ + ٣ = ٧</text>
          </g>
        </g>
      </svg>`
    }
  ],

  "g1m-7-2": [
    {
      type: "mcq",
      objective: "1Nn2: يقرأ ويكتب الأعداد من ٠ حتى ٢٠",
      level: "knowledge",
      prompt: "أَيُّ هٰذِهِ هُوَ العَدَدُ خَمْسَةٌ وثَلاثونَ؟",
      options: ["٣٥", "٥٣", "٢٥", "٤٥"],
      answer: 0
    },
    {
      type: "hundred-chart",
      mode: "missing",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "knowledge",
      prompt: "أَكْمِلِ الخَلايا النّاقِصَةَ في اللَّوْحَةِ.",
      from: 1, to: 30, columns: 10,
      missing: [7, 14, 23],
      distractors: [17, 24]
    },
    {
      type: "place-value",
      mode: "build",
      objective: "1Nn6: يجزّئ العدد من منزلتين إلى آحاد وعشرات والعكس",
      level: "application",
      prompt: "ابْنِ العَدَدَ ٣٤ بِالعَشَراتِ والآحادِ.",
      target: 34
    },
    {
      type: "count-tap",
      objective: "1Nn4: يعدّ بالعشرات من الصفر حتى ١٠٠ أو أكثر من ذلك بقليل",
      level: "application",
      prompt: "عُدَّ بِالعَشَراتِ حَتّى الخَمْسينَ: اِنْقُرْ كُلَّ مَجْموعَةٍ بِدَوْرِها.",
      mode: "step", glyph: "🟠", step: 10, groups: 5, target: 50
    },
    {
      type: "pattern",
      objective: "1Pt7: يصف ويكمل النمط، مثل العدّ والعدّ التنازلي بالعشرات",
      level: "reasoning",
      prompt: "أَكْمِلِ النَّمَطَ: العَدُّ التَّنازُلِيُّ بِالعَشَراتِ.",
      items: ["٩٠", "٨٠", "__", "٦٠", "__", "٤٠"],
      answers: ["٧٠", "٥٠"],
      distractors: ["٧٥", "٥٥"],
      rule: "نَنْقُصُ ١٠ كُلَّ مَرَّةٍ"
    },
    {
      type: "color",
      objective: "1Nn4: يعدّ بالعشرات من الصفر حتى ١٠٠ أو أكثر من ذلك بقليل",
      level: "reasoning",
      prompt: "لَوِّنْ مُضاعَفاتِ العَشَرَةِ بِالأَخْضَرِ، وما عَداها بِالأَحْمَرِ.",
      bg: "#fdf6ec",
      showLabels: true,
      palette: [
        { name: "أَخْضَر", color: "#60C020" },
        { name: "أَحْمَر", color: "#FF2020" }
      ],
      parts: [
        { name: "١٠", color: "#60C020" },
        { name: "٢٠", color: "#60C020" },
        { name: "٣٠", color: "#60C020" },
        { name: "٢٥", color: "#FF2020" },
        { name: "٣٣", color: "#FF2020" }
      ],
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#111111" stroke-width="3" stroke-linejoin="round">
          <g class="cpart" data-name="١٠" id="part-t10"><circle cx="70"  cy="130" r="44"/></g>
          <g class="cpart" data-name="٢٥" id="part-t25"><circle cx="180" cy="130" r="44"/></g>
          <g class="cpart" data-name="٢٠" id="part-t20"><circle cx="290" cy="130" r="44"/></g>
          <g class="cpart" data-name="٣٣" id="part-t33"><circle cx="400" cy="130" r="44"/></g>
          <g class="cpart" data-name="٣٠" id="part-t30"><circle cx="504" cy="130" r="44"/></g>
        </g>
      </svg>`
    }
  ],

  /* ═══ الوحدة ١ب · الفصل ٦: الأشكال الثنائية الأبعاد والمجسَّمات وأنماطها ═══ */

  "g1m-6-1": [
    {
      type: "mcq",
      objective: "1Gs1: يسمّي ويصنّف الأشكال الثنائية الأبعاد الشائعة باستخدام ميزات مثل عدد الأضلاع",
      level: "knowledge",
      prompt: "كَمْ ضِلْعًا لِلْمُضَلَّعِ الخُماسِيِّ؟",
      options: ["٣", "٤", "٥", "٦"],
      answer: 2
    },
    {
      type: "matching",
      objective: "1Gs1: يسمّي ويصنّف الأشكال الثنائية الأبعاد الشائعة باستخدام ميزات مثل عدد الأضلاع",
      level: "knowledge",
      prompt: "صِلْ كُلَّ شَكْلٍ بِعَدَدِ أَضْلاعِهِ.",
      pairs: [
        { a: "مُثَلَّث",          b: "٣ أَضْلاعٍ" },
        { a: "مُرَبَّع",          b: "٤ أَضْلاعٍ" },
        { a: "مُضَلَّع خُماسِيّ",  b: "٥ أَضْلاعٍ" },
        { a: "مُضَلَّع سُداسِيّ",  b: "٦ أَضْلاعٍ" }
      ]
    },
    {
      type: "classify",
      objective: "1Gs1: يسمّي ويصنّف الأشكال الثنائية الأبعاد الشائعة باستخدام ميزات مثل عدد الأضلاع",
      level: "application",
      prompt: "صَنِّفِ الأَشْكالَ: أَلَها أَضْلاعٌ مُسْتَقيمَةٌ أَمْ لا؟",
      groups: [
        { name: "لَها أَضْلاعٌ مُسْتَقيمَةٌ", items: ["مُثَلَّث", "مُرَبَّع"] },
        { name: "لَيْسَ لَها أَضْلاعٌ",      items: ["دائِرَة", "بَيْضاوِيّ"] }
      ]
    },
    {
      type: "count-tap",
      objective: "1Gs1: يسمّي ويصنّف الأشكال الثنائية الأبعاد الشائعة باستخدام ميزات مثل عدد الأضلاع",
      level: "application",
      prompt: "اِنْقُرْ أَرْبَعَةَ عيدانٍ — وهُوَ عَدَدُ ما يَلْزَمُ لِصُنْعِ مُرَبَّعٍ.",
      mode: "each", glyph: "🟫", count: 8, target: 4
    },
    {
      type: "sequence",
      objective: "1Pt8: يحدّد العلاقات البسيطة بين الأعداد والأشكال",
      level: "reasoning",
      prompt: "رَتِّبِ الأَشْكالَ مِنَ الأَقَلِّ أَضْلاعًا إِلَى الأَكْثَرِ.",
      steps: ["مُثَلَّث", "مُرَبَّع", "مُضَلَّع خُماسِيّ", "مُضَلَّع سُداسِيّ"]
    },
    {
      type: "memory",
      objective: "1Gs1: يسمّي ويصنّف الأشكال الثنائية الأبعاد الشائعة باستخدام ميزات مثل عدد الأضلاع",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ شَكْلٍ بِوَصْفِهِ.",
      pairs: [
        { a: "مُرَبَّع",        b: "أَرْبَعَةُ أَضْلاعٍ مُتَساوِيَةٍ" },
        { a: "دائِرَة",         b: "بِلا أَضْلاعٍ" },
        { a: "مُثَلَّث",        b: "ثَلاثَةُ أَضْلاعٍ" },
        { a: "مُضَلَّع سُداسِيّ", b: "سِتَّةُ أَضْلاعٍ" }
      ]
    }
  ],

  "g1m-6-2": [
    {
      type: "mcq",
      objective: "1Gs2: يسمّي ويصنّف المجسَّمات الشائعة باستخدام ميزات مثل عدد الوجوه",
      level: "knowledge",
      prompt: "أَيُّ مُجَسَّمٍ كُلُّ أَوْجُهِهِ مُرَبَّعاتٌ؟",
      options: ["الكُرَة", "المُكَعَّب", "المَخْروط", "الهَرَم"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Gs2: يسمّي ويصنّف المجسَّمات الشائعة باستخدام ميزات مثل عدد الوجوه",
      level: "knowledge",
      statement: "الكُرَةُ لَيْسَ لَها أَوْجُهٌ مُسْتَوِيَةٌ.",
      answer: true
    },
    {
      type: "matching",
      objective: "1Gs2: يسمّي ويصنّف المجسَّمات الشائعة باستخدام ميزات مثل عدد الوجوه",
      level: "application",
      prompt: "صِلْ كُلَّ مُجَسَّمٍ بِوَصْفِ أَوْجُهِهِ.",
      pairs: [
        { a: "المُكَعَّب",    b: "سِتَّةُ أَوْجُهٍ مُرَبَّعَةٍ" },
        { a: "الهَرَم",       b: "قاعِدَةٌ ومُثَلَّثاتٌ" },
        { a: "الأُسْطُوانَة",  b: "دائِرَتانِ وسَطْحٌ مُنْحَنٍ" },
        { a: "المَخْروط",     b: "دائِرَةٌ ورَأْسٌ واحِدٌ" }
      ]
    },
    {
      type: "fill-blank",
      objective: "1Gs2: يسمّي ويصنّف المجسَّمات الشائعة باستخدام ميزات مثل عدد الوجوه",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ الكَلِمَةِ المُناسِبَةِ.",
      text: "لِلْمُكَعَّبِ {} أَوْجُهٍ، ولِلْمَخْروطِ رَأْسٌ {}",
      answers: ["سِتَّةُ", "واحِدٌ"],
      distractors: ["أَرْبَعَةُ", "اثْنانِ"]
    },
    {
      type: "classify",
      objective: "1Pt8: يحدّد العلاقات البسيطة بين الأعداد والأشكال",
      level: "reasoning",
      prompt: "صَنِّفِ المُجَسَّماتِ: أَيُّها يَتَدَحْرَجُ؟",
      groups: [
        { name: "يَتَدَحْرَجُ",    items: ["الكُرَة", "الأُسْطُوانَة"] },
        { name: "لا يَتَدَحْرَجُ", items: ["المُكَعَّب", "الهَرَم"] }
      ]
    },
    {
      type: "exclude",
      objective: "1Gs2: يسمّي ويصنّف المجسَّمات الشائعة باستخدام ميزات مثل عدد الوجوه",
      level: "reasoning",
      prompt: "كُلُّها مُجَسَّماتٌ لَها أَوْجُهٌ مُسْتَوِيَةٌ — أَيُّها لا يَنْتَمي؟",
      options: ["المُكَعَّب", "الهَرَم", "المِنْشورُ الثُّلاثِيُّ", "الكُرَة"],
      answer: 3,
      reason: "الكُرَةُ سَطْحُها مُنْحَنٍ كُلُّهُ"
    }
  ],

  "g1m-6-3": [
    {
      type: "mcq",
      objective: "1Gs3: يتعرّف إلى خط التماثل",
      level: "knowledge",
      prompt: "كَمْ خَطَّ تَماثُلٍ لِلْمُرَبَّعِ؟",
      options: ["١", "٢", "٣", "٤"],
      answer: 3
    },
    {
      type: "true-false",
      objective: "1Gs3: يتعرّف إلى خط التماثل",
      level: "knowledge",
      statement: "لِلدّائِرَةِ خَطُّ تَماثُلٍ واحِدٌ فَقَطْ.",
      answer: false
    },
    {
      type: "symmetry",
      mode: "line",
      objective: "1Gs3: يتعرّف إلى خط التماثل",
      level: "application",
      prompt: "اِنْقُرْ خُطوطَ التَّماثُلِ في المُسْتَطيلِ.",
      shape: "rect",
      lines: [
        { x1: 100, y1: 35,  x2: 100, y2: 165, ok: true },
        { x1: 15,  y1: 100, x2: 185, y2: 100, ok: true },
        { x1: 25,  y1: 45,  x2: 175, y2: 155, ok: false }
      ]
    },
    {
      type: "pattern",
      objective: "1Pt8: يحدّد العلاقات البسيطة بين الأعداد والأشكال",
      level: "application",
      prompt: "أَكْمِلِ النَّمَطَ المُتَكَرِّرَ.",
      items: ["🟧", "🔴", "🟧", "__", "🟧", "🔴"],
      answers: ["🔴"],
      distractors: ["🟧", "🔺"],
      rule: "يَتَكَرَّرُ: بُرْتُقالِيٌّ ثُمَّ أَحْمَرُ"
    },
    {
      type: "classify",
      objective: "1Gs3: يتعرّف إلى خط التماثل",
      level: "reasoning",
      prompt: "صَنِّفِ الأَشْكالَ: أَلَها خَطُّ تَماثُلٍ أَمْ لا؟",
      groups: [
        { name: "لَهُ خَطُّ تَماثُلٍ",  items: ["مُرَبَّع", "دائِرَة"] },
        { name: "لَيْسَ لَهُ تَماثُلٌ", items: ["مُثَلَّثٌ مُخْتَلِفُ الأَضْلاعِ", "شَكْلٌ غَيْرُ مُنْتَظِمٍ"] }
      ]
    },
    {
      type: "color",
      objective: "1Pt8: يحدّد العلاقات البسيطة بين الأعداد والأشكال",
      level: "reasoning",
      prompt: "النَّمَطُ يَتَكَرَّرُ: مُرَبَّعٌ بُرْتُقالِيٌّ ثُمَّ دائِرَةٌ حَمْراءُ — لَوِّنِ الشَّكْلَيْنِ الأَخيرَيْنِ.",
      bg: "#fdf6ec",
      showLabels: false,
      palette: [
        { name: "بُرْتُقالِيّ", color: "#FF6000" },
        { name: "أَحْمَر",    color: "#FF2020" }
      ],
      parts: [
        { name: "خانة ٥", color: "#FF6000" },
        { name: "خانة ٦", color: "#FF2020" }
      ],
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#111111" stroke-width="3" stroke-linejoin="round">
          <rect x="466" y="88" width="84" height="84" rx="10" fill="#FF6000"/>
          <circle cx="420" cy="130" r="42" fill="#FF2020"/>
          <rect x="290" y="88" width="84" height="84" rx="10" fill="#FF6000"/>
          <circle cx="244" cy="130" r="42" fill="#FF2020"/>
          <g class="cpart" data-name="خانة ٥"><rect x="114" y="88" width="84" height="84" rx="10"/></g>
          <g class="cpart" data-name="خانة ٦"><circle cx="68" cy="130" r="42"/></g>
        </g>
      </svg>`
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ٣: الطول ═══ */

  "g1m-3-1": [
    {
      type: "mcq",
      objective: "1Ml3: يستخدم لغة المقارنة، مثل: أطول، أقصر، أثقل، أخف",
      level: "knowledge",
      prompt: "الحَبْلُ الَّذي طولُهُ ٩ وَحَداتٍ والحَبْلُ الَّذي طولُهُ ٤ وَحَداتٍ — أَيُّهُما أَطْوَلُ؟",
      options: ["الَّذي طولُهُ ٤", "الَّذي طولُهُ ٩", "مُتَساوِيانِ", "لا يُمْكِنُ المَعْرِفَةُ"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Ml1: يقارن بين الأطوال بالمقارنة المباشرة ثم بوحدات متناسقة غير قياسية",
      level: "knowledge",
      statement: "لِمُقارَنَةِ طولَيْنِ مُقارَنَةً مُباشِرَةً نَبْدَأُ مِنَ الطَّرَفِ نَفْسِهِ.",
      answer: true
    },
    {
      type: "measure-tool",
      mode: "ruler-read",
      objective: "1Ml1: يقارن بين الأطوال بالمقارنة المباشرة ثم بوحدات متناسقة غير قياسية",
      level: "application",
      prompt: "كَمْ طولُ الشَّريطِ بِالسَّنْتيمِتْراتِ؟",
      max: 20, step: 1, labelEvery: 5, value: 12,
      unit: "سم", options: ["١٢", "١٠", "١٤", "٢٠"]
    },
    {
      type: "sequence",
      objective: "1Ml3: يستخدم لغة المقارنة، مثل: أطول، أقصر، أثقل، أخف",
      level: "application",
      prompt: "رَتِّبِ الأَشْياءَ مِنَ الأَقْصَرِ إِلَى الأَطْوَلِ.",
      steps: ["قَلَمٌ", "مِسْطَرَةٌ", "مِظَلَّةٌ", "بابٌ"]
    },
    {
      type: "compare",
      objective: "1Ml3: يستخدم لغة المقارنة، مثل: أطول، أقصر، أثقل، أخف",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ الطّولَيْنِ بِالسَّنْتيمِتْراتِ.",
      unit: "سم",
      pairs: [ { a: "٧", b: "١٣" }, { a: "١٠", b: "١٠" }, { a: "١٨", b: "٩" } ]
    },
    {
      type: "slider",
      objective: "1Pt9: يقدّر الحسابات، ويفسّر ما إذا كانت الإجابة معقولة",
      level: "application",
      prompt: "قَدِّرْ طولَ القَلَمِ بِالسَّنْتيمِتْراتِ — اِسْحَبِ المُؤَشِّرَ.",
      min: 0, max: 20, answer: 14, tolerance: 2, unit: " سم", ticks: 5
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ٨: السعة ═══ */

  "g1m-8-1": [
    {
      type: "mcq",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "knowledge",
      prompt: "السَّعَةُ هِيَ:",
      options: ["كَمْ يَزِنُ الوِعاءُ", "كَمْ يَتَّسِعُ الوِعاءُ", "كَمْ طولُ الوِعاءِ", "لَوْنُ الوِعاءِ"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "knowledge",
      statement: "الوِعاءُ الأَكْبَرُ يَتَّسِعُ لِماءٍ أَكْثَرَ مِنَ الوِعاءِ الأَصْغَرِ.",
      answer: true
    },
    {
      type: "count-tap",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "application",
      prompt: "مَلَأْنا الإِبْريقَ بِسَبْعَةِ أَكْوابٍ — اِنْقُرْها وعُدَّها.",
      mode: "each", glyph: "🥛", count: 10, target: 7
    },
    {
      type: "matching",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "application",
      prompt: "صِلْ كُلَّ وِعاءٍ بِعَدَدِ الأَكْوابِ الَّتي تَمْلَؤُهُ.",
      pairs: [
        { a: "كوبٌ صَغيرٌ",  b: "كوبٌ واحِدٌ" },
        { a: "إِبْريقٌ",     b: "سِتَّةُ أَكْوابٍ" },
        { a: "دَلْوٌ",       b: "عَشَرَةُ أَكْوابٍ" },
        { a: "مِلْعَقَةٌ",    b: "أَقَلُّ مِنْ كوبٍ" }
      ]
    },
    {
      type: "compare",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ سَعَتَيِ الوِعاءَيْنِ بِعَدَدِ الأَكْوابِ.",
      unit: "كوب",
      pairs: [ { a: "٣", b: "٨" }, { a: "٦", b: "٦" }, { a: "١٢", b: "٥" } ]
    },
    {
      type: "memory",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ وِعاءٍ بِسَعَتِهِ.",
      pairs: [
        { a: "مِلْعَقَةٌ", b: "أَصْغَرُ سَعَةً" },
        { a: "كوبٌ",      b: "سَعَةٌ صَغيرَةٌ" },
        { a: "إِبْريقٌ",   b: "سَعَةٌ مُتَوَسِّطَةٌ" },
        { a: "دَلْوٌ",     b: "أَكْبَرُ سَعَةً" }
      ]
    }
  ],

  "g1m-8-2": [
    {
      type: "mcq",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "knowledge",
      prompt: "قَدِّرْ: كَمْ كوبًا يَمْلَأُ إِبْريقًا مُتَوَسِّطًا تَقْريبًا؟",
      options: ["كوبٌ واحِدٌ", "سِتَّةُ أَكْوابٍ", "خَمْسونَ كوبًا", "مِئَةُ كوبٍ"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Pt1: يختار استراتيجية مناسبة للعمليات الحسابية مع شرح خطوات الحل",
      level: "knowledge",
      statement: "التَّقْديرُ قَبْلَ القِياسِ يُساعِدُنا عَلى اخْتِيارِ الوِعاءِ المُناسِبِ.",
      answer: true
    },
    {
      type: "classify",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "application",
      prompt: "صَنِّفِ الأَوْعِيَةَ حَسَبَ سَعَتِها.",
      groups: [
        { name: "سَعَةٌ صَغيرَةٌ", items: ["مِلْعَقَةٌ", "كوبٌ"] },
        { name: "سَعَةٌ كَبيرَةٌ", items: ["دَلْوٌ", "حَوْضٌ"] }
      ]
    },
    {
      type: "sequence",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "application",
      prompt: "رَتِّبِ الأَوْعِيَةَ مِنَ الأَقَلِّ سَعَةً إِلَى الأَكْثَرِ.",
      steps: ["مِلْعَقَةٌ", "كوبٌ", "إِبْريقٌ", "دَلْوٌ"]
    },
    {
      type: "exclude",
      objective: "1Pt1: يختار استراتيجية مناسبة للعمليات الحسابية مع شرح خطوات الحل",
      level: "reasoning",
      prompt: "تَقْديرٌ لِسَعَةِ كوبٍ واحِدٍ — أَيُّها غَيْرُ مَعْقولٍ؟",
      options: ["نِصْفُ إِبْريقٍ", "أَقَلُّ مِنْ إِبْريقٍ", "أَكْثَرُ مِنْ مِلْعَقَةٍ", "أَكْثَرُ مِنْ دَلْوٍ"],
      answer: 3,
      reason: "الدَّلْوُ أَكْبَرُ سَعَةً مِنَ الكوبِ بِكَثيرٍ"
    },
    {
      type: "slider",
      objective: "1Ml2: يُقدِّر ويقارن السعات المختلفة عن طريق المقارنة المباشرة ثم بوحدات غير قياسية",
      level: "application",
      prompt: "قَدِّرْ: كَمْ كوبًا يَمْلَأُ هٰذا الإِبْريقَ؟ اِسْحَبِ المُؤَشِّرَ.",
      min: 0, max: 12, answer: 6, tolerance: 1, unit: " كوب", ticks: 2
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ٩: النقود والوقت ═══ */

  "g1m-9-1": [
    {
      type: "mcq",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "knowledge",
      prompt: "في مَطْعَمِ المَدْرَسَةِ ثَلاثُ فَطائِرَ وأَرْبَعُ حَبّاتِ تُفّاحٍ. كَمْ صِنْفًا مِنَ الطَّعامِ فيهِ؟",
      options: ["صِنْفانِ", "ثَلاثَةٌ", "أَرْبَعَةٌ", "سَبْعَةٌ"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "knowledge",
      statement: "إِذا كانَ في القائِمَةِ ثَلاثُ فَطائِرَ وأَرْبَعُ حَبّاتِ تُفّاحٍ فَالمَجْموعُ سَبْعُ قِطَعٍ.",
      answer: true
    },
    {
      type: "count-tap",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "application",
      prompt: "اِنْقُرْ خَمْسَ حَبّاتِ تُفّاحٍ لِقائِمَةِ الطَّعامِ.",
      mode: "each", glyph: "🍎", count: 9, target: 5
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Pt1: يختار استراتيجية مناسبة للعمليات الحسابية مع شرح خطوات الحل",
      level: "application",
      prompt: "ثَلاثُ فَطائِرَ وأَرْبَعُ حَبّاتِ تُفّاحٍ — أَكْمِلِ المُعادَلَةَ.",
      tokens: ["٣", "+", "٤", "=", "__"],
      bank: ["٥", "٦", "٧", "٨"],
      answers: ["٧"]
    },
    {
      type: "classify",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "reasoning",
      prompt: "صَنِّفْ ما يَحْتاجُهُ مَطْعَمُ المَدْرَسَةِ.",
      groups: [
        { name: "طَعامٌ",  items: ["فَطيرَةٌ", "تُفّاحَةٌ"] },
        { name: "أَدَواتٌ", items: ["صَحْنٌ", "مِلْعَقَةٌ"] }
      ]
    },
    {
      type: "memory",
      objective: "1Pt2: يستكشف المسائل العددية والألغاز",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ صِنْفٍ بِعَدَدِهِ في القائِمَةِ.",
      pairs: [
        { a: "فَطائِرُ",    b: "٣" },
        { a: "تُفّاحٌ",     b: "٤" },
        { a: "أَكْوابُ ماءٍ", b: "٦" },
        { a: "تَمْرٌ",      b: "٨" }
      ]
    }
  ],

  "g1m-9-2": [
    {
      type: "mcq",
      objective: "1Mm1: يتعرَّف على جميع العملات ويتدرَّب على كيفية دفع النقود بالضبط",
      level: "knowledge",
      prompt: "أَيُّ هٰذِهِ المَبالِغِ أَكْبَرُ؟",
      options: ["٥٠ بَيْسَةً", "١٠٠ بَيْسَةٍ", "٢٠٠ بَيْسَةٍ", "٢٥ بَيْسَةً"],
      answer: 2
    },
    {
      type: "true-false",
      objective: "1Mm1: يتعرَّف على جميع العملات ويتدرَّب على كيفية دفع النقود بالضبط",
      level: "knowledge",
      statement: "الرِّيالُ العُمانِيُّ الواحِدُ يُساوي ١٠٠٠ بَيْسَةٍ.",
      answer: true
    },
    {
      type: "money",
      mode: "pay",
      objective: "1Mm1: يتعرَّف على جميع العملات ويتدرَّب على كيفية دفع النقود بالضبط",
      level: "application",
      prompt: "ثَمَنُ الفَطيرَةِ ١٥٠ بَيْسَةً — كَوِّنِ المَبْلَغَ.",
      target: 150, rack: [25, 50, 100, 200]
    },
    {
      type: "matching",
      objective: "1Pt1: يختار استراتيجية مناسبة للعمليات الحسابية مع شرح خطوات الحل",
      level: "application",
      prompt: "صِلْ كُلَّ صِنْفٍ بِثَمَنِهِ.",
      pairs: [
        { a: "تُفّاحَةٌ",  b: "٥٠ بَيْسَةً" },
        { a: "فَطيرَةٌ",   b: "١٥٠ بَيْسَةً" },
        { a: "عَصيرٌ",    b: "٢٠٠ بَيْسَةٍ" },
        { a: "ساندويتش", b: "٣٠٠ بَيْسَةٍ" }
      ]
    },
    {
      type: "compare",
      objective: "1Pt9: يقدّر الحسابات، ويفسّر ما إذا كانت الإجابة معقولة",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ الثَّمَنَيْنِ بِالبَيْسَةِ.",
      unit: "بيسة",
      pairs: [ { a: "٥٠", b: "١٥٠" }, { a: "٢٠٠", b: "٢٠٠" }, { a: "٣٠٠", b: "١٠٠" } ]
    },
    {
      type: "exclude",
      objective: "1Mm1: يتعرَّف على جميع العملات ويتدرَّب على كيفية دفع النقود بالضبط",
      level: "reasoning",
      prompt: "كُلُّها مَبالِغُ أَقَلُّ مِنْ رِيالٍ — أَيُّها لا يَنْتَمي؟",
      options: ["٥٠ بَيْسَةً", "٢٠٠ بَيْسَةٍ", "٥٠٠ بَيْسَةٍ", "١٥٠٠ بَيْسَةٍ"],
      answer: 3,
      reason: "١٥٠٠ بَيْسَةٍ أَكْثَرُ مِنْ رِيالٍ (١٠٠٠ بَيْسَة)"
    }
  ],

  "g1m-9-3": [
    {
      type: "mcq",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "knowledge",
      prompt: "عِنْدَما يُشيرُ العَقْرَبُ الطَّويلُ إِلى ١٢ والقَصيرُ إِلى ٣ تَكونُ السّاعَةُ:",
      options: ["١٢:٣٠", "٣:٠٠", "٣:١٢", "١٢:٠٣"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "knowledge",
      statement: "عِنْدَما يُشيرُ العَقْرَبُ الطَّويلُ إِلى ١٢ تَكونُ السّاعَةُ تَمامًا.",
      answer: true
    },
    {
      type: "clock",
      mode: "set",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "application",
      prompt: "اضْبِطِ السّاعَةَ عَلى الثّانِيَةِ تَمامًا.",
      target: "٢:٠٠", from: "١٢:٠٠"
    },
    {
      type: "matching",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "application",
      prompt: "صِلْ كُلَّ نَشاطٍ بِوَقْتِهِ.",
      pairs: [
        { a: "الاسْتِيقاظُ",       b: "٦:٠٠ صَباحًا" },
        { a: "بِدايَةُ المَدْرَسَةِ", b: "٧:٠٠ صَباحًا" },
        { a: "الغَداءُ",          b: "١:٠٠ ظُهْرًا" },
        { a: "النَّوْمُ",          b: "٩:٠٠ مَساءً" }
      ]
    },
    {
      type: "sequence",
      objective: "1Pt7: يصف ويكمل النمط",
      level: "reasoning",
      prompt: "رَتِّبْ أَنْشِطَةَ اليَوْمِ مِنَ الأَوَّلِ إِلَى الأَخيرِ.",
      steps: ["الاسْتِيقاظُ", "الذَّهابُ إِلى المَدْرَسَةِ", "الغَداءُ", "النَّوْمُ"]
    },
    {
      type: "find-error",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "reasoning",
      prompt: "سَطْرٌ واحِدٌ فيهِ وَقْتٌ غَيْرُ مَعْقولٍ لِنَشاطِهِ — اِضْغَطْ عَلَيْهِ.",
      bg: "#fdf6ec",
      spot: { x: 50, y: 80, r: 17 },
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g font-family="Cairo, Tajawal, sans-serif" font-size="30" font-weight="800"
           fill="#111111" text-anchor="middle">
          <g>
            <rect x="90" y="24" width="380" height="58" rx="14" fill="#A8DCFF"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="63">الاسْتِيقاظُ ٦:٠٠ صَباحًا</text>
          </g>
          <g>
            <rect x="90" y="100" width="380" height="58" rx="14" fill="#A8DCFF"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="139">الغَداءُ ١:٠٠ ظُهْرًا</text>
          </g>
          <g>
            <rect x="90" y="176" width="380" height="58" rx="14" fill="#A8DCFF"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="215">النَّوْمُ ٧:٠٠ صَباحًا</text>
          </g>
        </g>
      </svg>`
    }
  ],

  "g1m-9-4": [
    {
      type: "mcq",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "knowledge",
      prompt: "في الجَدْوَلِ الزَّمَنِيِّ: الحِصَّةُ الأولى ٧:٠٠ والثّانِيَةُ ٨:٠٠. كَمْ تَسْتَغْرِقُ الحِصَّةُ؟",
      options: ["نِصْفَ ساعَةٍ", "ساعَةً واحِدَةً", "ساعَتَيْنِ", "ثَلاثَ ساعاتٍ"],
      answer: 1
    },
    {
      type: "clock",
      mode: "read",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "knowledge",
      prompt: "كَمِ السّاعَةُ؟",
      target: "١٠:٠٠",
      options: ["١٠:٠٠", "٩:٠٠", "١١:٠٠", "١٠:٣٠"]
    },
    {
      type: "fill-blank",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "application",
      prompt: "أَكْمِلِ الجَدْوَلَ بِسَحْبِ الوَقْتِ المُناسِبِ.",
      text: "تَبْدَأُ الحِصَّةُ الأولى السّاعَةَ {} وتَنْتَهي السّاعَةَ {}",
      answers: ["٧:٠٠", "٨:٠٠"],
      distractors: ["٩:٠٠", "١٠:٠٠"]
    },
    {
      type: "matching",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "application",
      prompt: "صِلْ كُلَّ حِصَّةٍ بِوَقْتِ بِدايَتِها.",
      pairs: [
        { a: "الحِصَّةُ الأولى",  b: "٧:٠٠" },
        { a: "الحِصَّةُ الثّانِيَةُ", b: "٨:٠٠" },
        { a: "الحِصَّةُ الثّالِثَةُ", b: "٩:٠٠" },
        { a: "الحِصَّةُ الرّابِعَةُ", b: "١٠:٠٠" }
      ]
    },
    {
      type: "sequence",
      objective: "1Pt7: يصف ويكمل النمط",
      level: "reasoning",
      prompt: "رَتِّبْ أَوْقاتَ الجَدْوَلِ مِنَ الأَبْكَرِ إِلَى الأَحْدَثِ.",
      steps: ["٧:٠٠", "٨:٠٠", "٩:٠٠", "١٠:٠٠", "١١:٠٠"]
    },
    {
      type: "exclude",
      objective: "1Mt2: يقرأ الوقت بالساعات ويعرف الأوقات الرئيسية في اليوم لأقرب ساعة",
      level: "reasoning",
      prompt: "كُلُّها أَوْقاتُ صَباحٍ في الجَدْوَلِ — أَيُّها لا يَنْتَمي؟",
      options: ["٧:٠٠ صَباحًا", "٨:٠٠ صَباحًا", "٩:٠٠ صَباحًا", "٩:٠٠ مَساءً"],
      answer: 3,
      reason: "التّاسِعَةُ مَساءً لَيْسَتْ وَقْتَ دِراسَةٍ"
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ١٠: مقارنة الوزن ═══ */

  "g1m-10-1": [
    {
      type: "mcq",
      objective: "1Ml3: يستخدم صيغة المقارنة مثل: أثقل من — أخف من",
      level: "knowledge",
      prompt: "إِذا مالَتْ كِفَّةُ الميزانِ إِلى أَسْفَلَ فَإِنَّ ما فيها:",
      options: ["أَخَفُّ", "أَثْقَلُ", "مُتَساوٍ", "أَصْغَرُ حَجْمًا"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Ml1: يقارن الأوزان مقارنة مباشرة ثم باستخدام وحدات غير قياسيّة",
      level: "knowledge",
      statement: "الشَّيْءُ الأَكْبَرُ حَجْمًا يَكونُ دائِمًا أَثْقَلَ.",
      answer: false
    },
    {
      type: "measure-tool",
      mode: "scale-read",
      objective: "1Ml1: يقارن الأوزان مقارنة مباشرة ثم باستخدام وحدات غير قياسيّة",
      level: "application",
      prompt: "كَمْ كُتْلَةُ الشَّيْءِ عَلى الميزانِ؟",
      min: 0, max: 500, step: 50, labelEvery: 2, value: 300,
      unit: "غرام", options: ["٣٠٠", "٢٠٠", "٤٠٠", "٥٠٠"]
    },
    {
      type: "classify",
      objective: "1Ml3: يستخدم صيغة المقارنة مثل: أثقل من — أخف من",
      level: "application",
      prompt: "صَنِّفِ الأَشْياءَ حَسَبَ وَزْنِها.",
      groups: [
        { name: "خَفيفٌ", items: ["ريشَةٌ", "وَرَقَةٌ"] },
        { name: "ثَقيلٌ", items: ["حَجَرٌ", "كِتابٌ"] }
      ]
    },
    {
      type: "compare",
      objective: "1Ml3: يستخدم صيغة المقارنة مثل: أثقل من — أخف من",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ الكُتْلَتَيْنِ بِالغِرامِ.",
      unit: "غرام",
      pairs: [ { a: "١٠٠", b: "٣٠٠" }, { a: "٢٠٠", b: "٢٠٠" }, { a: "٥٠٠", b: "١٥٠" } ]
    },
    {
      type: "memory",
      objective: "1Ml3: يستخدم صيغة المقارنة مثل: أثقل من — أخف من",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ شَيْءٍ بِوَصْفِ وَزْنِهِ.",
      pairs: [
        { a: "ريشَةٌ",     b: "خَفيفَةٌ جِدًّا" },
        { a: "تُفّاحَةٌ",   b: "خَفيفَةٌ" },
        { a: "كِتابٌ",     b: "ثَقيلٌ" },
        { a: "حَقيبَةٌ مَلْأى", b: "ثَقيلَةٌ جِدًّا" }
      ]
    }
  ],

  "g1m-10-2": [
    {
      type: "mcq",
      objective: "1Ml1: يقارن الأوزان مقارنة مباشرة ثم باستخدام وحدات غير قياسيّة",
      level: "knowledge",
      prompt: "تَوازَنَ الكِتابُ مَعَ ثَمانِ مُكَعَّباتٍ. كَمْ يَزِنُ الكِتابُ؟",
      options: ["سِتَّ مُكَعَّباتٍ", "ثَمانِ مُكَعَّباتٍ", "عَشْرَ مُكَعَّباتٍ", "مُكَعَّبًا واحِدًا"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Ml1: يقارن الأوزان مقارنة مباشرة ثم باستخدام وحدات غير قياسيّة",
      level: "knowledge",
      statement: "إِذا اسْتَوَتْ كِفَّتا الميزانِ فَالوَزْنانِ مُتَساوِيانِ.",
      answer: true
    },
    {
      type: "count-tap",
      objective: "1Ml1: يقارن الأوزان مقارنة مباشرة ثم باستخدام وحدات غير قياسيّة",
      level: "application",
      prompt: "اِنْقُرْ سِتَّ مُكَعَّباتٍ لِتُوازِنَ الكِفَّةَ الأُخْرى.",
      mode: "each", glyph: "🟦", count: 10, target: 6
    },
    {
      type: "measure-tool",
      mode: "scale-set",
      objective: "1Ml1: يقارن الأوزان مقارنة مباشرة ثم باستخدام وحدات غير قياسيّة",
      level: "application",
      prompt: "أَدِرْ مُؤَشِّرَ الميزانِ إِلى ٢٥٠ غِرامًا.",
      min: 0, max: 500, step: 50, labelEvery: 2, target: 250,
      unit: "غرام"
    },
    {
      type: "sequence",
      objective: "1Pt1: يختار استراتيجية مناسبة للعمليات الحسابية مع شرح خطوات الحل",
      level: "reasoning",
      prompt: "رَتِّبِ الأَشْياءَ مِنَ الأَخَفِّ إِلَى الأَثْقَلِ.",
      steps: ["ريشَةٌ", "قَلَمٌ", "تُفّاحَةٌ", "كِتابٌ"]
    },
    {
      type: "color",
      objective: "1Ml3: يستخدم صيغة المقارنة مثل: أثقل من — أخف من",
      level: "reasoning",
      prompt: "لَوِّنِ الكِفَّةَ الأَثْقَلَ بِالأَحْمَرِ والكِفَّةَ الأَخَفَّ بِالأَزْرَقِ.",
      bg: "#fdf6ec",
      showLabels: true,
      palette: [
        { name: "أَحْمَر", color: "#FF2020" },
        { name: "أَزْرَق", color: "#20A0FF" }
      ],
      parts: [
        { name: "الكِفَّةُ اليُمْنى", color: "#20A0FF" },
        { name: "الكِفَّةُ اليُسْرى", color: "#FF2020" }
      ],
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#111111" stroke-linecap="round" stroke-linejoin="round">
          <path d="M280,208 L280,70" stroke-width="4" fill="none"/>
          <path d="M200,236 L360,236" stroke-width="6" fill="none"/>
          <path d="M170,96 L390,60" stroke-width="4" fill="none"/>
          <path d="M170,96 L170,120 M390,60 L390,84" stroke-width="3" fill="none"/>
          <g class="cpart" data-name="الكِفَّةُ اليُمْنى" stroke-width="3">
            <path d="M118,120 L222,120 L196,168 L144,168 Z"/>
          </g>
          <g class="cpart" data-name="الكِفَّةُ اليُسْرى" stroke-width="3">
            <path d="M338,84 L442,84 L416,132 L364,132 Z"/>
          </g>
        </g>
      </svg>`
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١١: الأعداد الفردية والزوجية ═══ */

  "g1m-11-1": [
    {
      type: "mcq",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "knowledge",
      prompt: "أَيُّ هٰذِهِ عَدَدٌ زَوْجِيٌّ؟",
      options: ["٧", "٩", "١٢", "١٥"],
      answer: 2
    },
    {
      type: "true-false",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "knowledge",
      statement: "العَدَدُ الزَّوْجِيُّ يُمْكِنُ تَقْسيمُهُ إِلى أَزْواجٍ بِلا باقٍ.",
      answer: true
    },
    {
      type: "hundred-chart",
      mode: "multiples",
      objective: "1Nc7: يبدأ في التعرّف على مضاعفات ٢ (وعشرة)",
      level: "application",
      prompt: "لَوِّنْ مُضاعَفاتِ العَدَدِ ٢ في اللَّوْحَةِ.",
      from: 1, to: 20, columns: 10,
      multiple: 2
    },
    {
      type: "count-tap",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "application",
      prompt: "عُدَّ بِالاثْنَيْنِ حَتّى العَشَرَةِ: اِنْقُرْ كُلَّ زَوْجٍ بِدَوْرِهِ.",
      mode: "step", glyph: "👟", step: 2, groups: 5, target: 10
    },
    {
      type: "classify",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "reasoning",
      prompt: "صَنِّفِ الأَعْدادَ: زَوْجِيٌّ أَمْ فَرْدِيٌّ؟",
      groups: [
        { name: "زَوْجِيٌّ", items: ["٤", "١٠"] },
        { name: "فَرْدِيٌّ", items: ["٧", "١٣"] }
      ]
    },
    {
      type: "exclude",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "reasoning",
      prompt: "كُلُّها أَعْدادٌ زَوْجِيَّةٌ — أَيُّها لا يَنْتَمي؟",
      options: ["٢", "٦", "٨", "٩"],
      answer: 3,
      reason: "٩ فَرْدِيٌّ لا يَنْقَسِمُ إِلى أَزْواجٍ"
    }
  ],

  "g1m-11-2": [
    {
      type: "mcq",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "knowledge",
      prompt: "أَيُّ هٰذِهِ عَدَدٌ فَرْدِيٌّ؟",
      options: ["٤", "٨", "١١", "١٤"],
      answer: 2
    },
    {
      type: "true-false",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "knowledge",
      statement: "إِذا أَضَفْنا واحِدًا إِلى عَدَدٍ زَوْجِيٍّ صارَ فَرْدِيًّا.",
      answer: true
    },
    {
      type: "pattern",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "application",
      prompt: "أَكْمِلِ نَمَطَ الأَعْدادِ الفَرْدِيَّةِ.",
      items: ["١", "٣", "__", "٧", "__", "١١"],
      answers: ["٥", "٩"],
      distractors: ["٤", "٨"],
      rule: "نَزيدُ ٢ كُلَّ مَرَّةٍ"
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "application",
      prompt: "أَضِفْ واحِدًا إِلى عَدَدٍ زَوْجِيٍّ — أَكْمِلِ المُعادَلَةَ.",
      tokens: ["٨", "+", "١", "=", "__"],
      bank: ["٧", "٩", "١٠", "١١"],
      answers: ["٩"]
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "reasoning",
      prompt: "رَتِّبِ الأَعْدادَ الفَرْدِيَّةَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
      steps: ["١", "٣", "٥", "٧", "٩"]
    },
    {
      type: "memory",
      objective: "1Nn5: يعدّ بإضافة اثنين، ويبدأ بمعرفة الأعداد الفردية والزوجية إلى ٢٠",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ عَدَدٍ زَوْجِيٍّ بِالفَرْدِيِّ الَّذي يَليهِ.",
      pairs: [
        { a: "٢", b: "٣" },
        { a: "٦", b: "٧" },
        { a: "١٠", b: "١١" },
        { a: "١٤", b: "١٥" }
      ]
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٢: ترتيب الأعداد (١) ═══ */

  "g1m-12-1": [
    {
      type: "mcq",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "knowledge",
      prompt: "أَيُّ هٰذِهِ الأَعْدادِ أَكْبَرُ؟",
      options: ["٩", "١٤", "١١", "٦"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Nn9: يرتّب الأعداد إلى ما لا يقل عن ٢٠، ويضعها على مسار عددي",
      level: "knowledge",
      statement: "عَلى خَطِّ الأَعْدادِ يَأْتي العَدَدُ الأَكْبَرُ بَعْدَ الأَصْغَرِ.",
      answer: true
    },
    {
      type: "number-line",
      mode: "place",
      objective: "1Nn9: يرتّب الأعداد إلى ما لا يقل عن ٢٠، ويضعها على مسار عددي",
      level: "application",
      prompt: "ضَعِ المُؤَشِّرَ عَلى العَدَدِ ١٤.",
      min: 0, max: 20, step: 1, labelEvery: 5,
      target: 14
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "application",
      prompt: "رَتِّبِ الأَعْدادَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
      steps: ["٦", "٩", "١٢", "١٦", "١٩"]
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "reasoning",
      prompt: "ضَعِ الرَّمْزَ المُناسِبَ بَيْنَ كُلِّ عَدَدَيْنِ.",
      pairs: [ { a: "٨", b: "١٤" }, { a: "١١", b: "١١" }, { a: "١٧", b: "٦" } ]
    },
    {
      type: "slider",
      objective: "1Nn9: يرتّب الأعداد إلى ما لا يقل عن ٢٠، ويضعها على مسار عددي",
      level: "application",
      prompt: "اِسْحَبِ المُؤَشِّرَ إِلَى العَدَدِ ثَمانِيَةَ عَشَرَ.",
      min: 0, max: 20, answer: 18, tolerance: 0, ticks: 5
    }
  ],

  "g1m-12-2": [
    {
      type: "mcq",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "knowledge",
      prompt: "أَيُّ عَدَدٍ يَقَعُ بَيْنَ ٧ و٩؟",
      options: ["٦", "٨", "١٠", "١١"],
      answer: 1
    },
    {
      type: "true-false",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "knowledge",
      statement: "العَدَدُ ١٢ يَقَعُ بَيْنَ ١٠ و١٥.",
      answer: true
    },
    {
      type: "number-line",
      mode: "place",
      objective: "1Nn9: يرتّب الأعداد إلى ما لا يقل عن ٢٠، ويضعها على مسار عددي",
      level: "application",
      prompt: "ضَعِ المُؤَشِّرَ عَلى العَدَدِ الَّذي يَقَعُ بَيْنَ ١٢ و١٤.",
      min: 5, max: 20, step: 1, labelEvery: 5,
      target: 13
    },
    {
      type: "fill-blank",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ العَدَدِ المُناسِبِ.",
      text: "يَقَعُ العَدَدُ {} بَيْنَ ٤ و٦، ويَقَعُ العَدَدُ {} بَيْنَ ١٥ و١٧",
      answers: ["٥", "١٦"],
      distractors: ["٧", "١٤"]
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "reasoning",
      prompt: "ضَعِ الرَّمْزَ المُناسِبَ بَيْنَ كُلِّ عَدَدَيْنِ.",
      pairs: [ { a: "٥", b: "٩" }, { a: "١٣", b: "١٣" }, { a: "١٨", b: "١٢" } ]
    },
    {
      type: "exclude",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد، وإعطاء العدد الذي يقع بينها",
      level: "reasoning",
      prompt: "كُلُّها أَعْدادٌ تَقَعُ بَيْنَ ١٠ و٢٠ — أَيُّها لا يَنْتَمي؟",
      options: ["١٢", "١٥", "١٨", "٢٤"],
      answer: 3,
      reason: "٢٤ أَكْبَرُ مِنْ ٢٠"
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٣: الجمع والطرح — الإضافة والحذف ═══ */

  "g1m-13-1": [
    {
      type: "mcq",
      objective: "1Nc1: يعرف الأزواج العددية جميعًا حتى ١٠",
      level: "knowledge",
      prompt: "أَيُّ زَوْجٍ مَجْموعُهُ عَشَرَةٌ؟",
      options: ["٦ + ٣", "٧ + ٣", "٥ + ٤", "٨ + ١"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc1: يعرف الأزواج العددية جميعًا حتى ١٠",
      level: "knowledge",
      prompt: "أَكْمِلِ المُعادَلَةَ لِتُكَوِّنَ العَشَرَةَ.",
      tokens: ["٧", "+", "__", "=", "١٠"],
      bank: ["١", "٢", "٣", "٤"],
      answers: ["٣"]
    },
    {
      type: "count-tap",
      objective: "1Nc1: يعرف الأزواج العددية جميعًا حتى ١٠",
      level: "application",
      prompt: "اِنْقُرْ أَرْبَعَةَ أَقْراصٍ — وهِيَ ما يَنْقُصُ السِّتَّةَ لِتُكْمِلَ العَشَرَةَ.",
      mode: "each", glyph: "🔵", count: 9, target: 4
    },
    {
      type: "fill-blank",
      objective: "1Nc1: يعرف الأزواج العددية جميعًا حتى ١٠",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ العَدَدِ المُناسِبِ.",
      text: "ثَمانِيَةٌ و {} يُكَوِّنانِ عَشَرَةً، وسِتَّةٌ و {} يُكَوِّنانِ عَشَرَةً",
      answers: ["٢", "٤"],
      distractors: ["٣", "٥"]
    },
    {
      type: "classify",
      objective: "1Nc1: يعرف الأزواج العددية جميعًا حتى ١٠",
      level: "reasoning",
      prompt: "صَنِّفِ الأَزْواجَ: أَمَجْموعُها عَشَرَةٌ أَمْ لا؟",
      groups: [
        { name: "مَجْموعُها ١٠",   items: ["٦ + ٤", "٩ + ١"] },
        { name: "لَيْسَ مَجْموعُها ١٠", items: ["٥ + ٣", "٧ + ٤"] }
      ]
    },
    {
      type: "memory",
      objective: "1Nc1: يعرف الأزواج العددية جميعًا حتى ١٠",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ عَدَدٍ بِشَريكِهِ إِلَى العَشَرَةِ.",
      pairs: [
        { a: "١", b: "٩" },
        { a: "٣", b: "٧" },
        { a: "٤", b: "٦" },
        { a: "٢", b: "٨" }
      ]
    }
  ],

  "g1m-13-2": [
    {
      type: "mcq",
      objective: "1Nc8: يفهم الجمع كدمج لمجموعتين أو أكثر ويكتب جملة عددية خاصة بالجمع",
      level: "knowledge",
      prompt: "مَجْموعَةٌ فيها ٥ أَقْلامٍ وأُخْرى فيها ٤. كَمْ قَلَمًا مَعًا؟",
      options: ["٧", "٨", "٩", "١٠"],
      answer: 2
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc8: يفهم الجمع كدمج لمجموعتين أو أكثر ويكتب جملة عددية خاصة بالجمع",
      level: "knowledge",
      prompt: "أَكْمِلِ جُمْلَةَ الجَمْعِ.",
      tokens: ["٥", "+", "٤", "=", "__"],
      bank: ["٧", "٨", "٩", "١٠"],
      answers: ["٩"]
    },
    {
      type: "count-tap",
      objective: "1Nc8: يفهم الجمع كدمج لمجموعتين أو أكثر ويكتب جملة عددية خاصة بالجمع",
      level: "application",
      prompt: "ضُمَّ المَجْموعَتَيْنِ: اِنْقُرْ تِسْعَةَ أَقْلامٍ وعُدَّها.",
      mode: "each", glyph: "✏️", count: 12, target: 9
    },
    {
      type: "matching",
      objective: "1Nc8: يفهم الجمع كدمج لمجموعتين أو أكثر ويكتب جملة عددية خاصة بالجمع",
      level: "application",
      prompt: "صِلْ كُلَّ جُمْلَةِ جَمْعٍ بِناتِجِها.",
      pairs: [
        { a: "٣ + ٤", b: "٧" },
        { a: "٥ + ٣", b: "٨" },
        { a: "٦ + ٤", b: "١٠" },
        { a: "٢ + ٩", b: "١١" }
      ]
    },
    {
      type: "classify",
      objective: "1Nc8: يفهم الجمع كدمج لمجموعتين أو أكثر ويكتب جملة عددية خاصة بالجمع",
      level: "reasoning",
      prompt: "صَنِّفْ كُلَّ جَمْعٍ حَسَبَ ناتِجِهِ.",
      groups: [
        { name: "ناتِجُهُ ٨",  items: ["٥ + ٣", "٦ + ٢"] },
        { name: "ناتِجُهُ ١٠", items: ["٧ + ٣", "٤ + ٦"] }
      ]
    },
    {
      type: "find-error",
      objective: "1Nc8: يفهم الجمع كدمج لمجموعتين أو أكثر ويكتب جملة عددية خاصة بالجمع",
      level: "reasoning",
      prompt: "كُلُّ سَطْرٍ يَجِبُ أَنْ يَكونَ ناتِجُهُ تِسْعَةً — اِضْغَطْ عَلى السَّطْرِ الخاطِئِ.",
      bg: "#fdf6ec",
      spot: { x: 50, y: 80, r: 17 },
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g font-family="Cairo, Tajawal, sans-serif" font-size="42" font-weight="800"
           fill="#111111" text-anchor="middle">
          <g>
            <rect x="130" y="24" width="300" height="58" rx="14" fill="#80C020"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="66">٥ + ٤ = ٩</text>
          </g>
          <g>
            <rect x="130" y="100" width="300" height="58" rx="14" fill="#80C020"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="142">٦ + ٣ = ٩</text>
          </g>
          <g>
            <rect x="130" y="176" width="300" height="58" rx="14" fill="#80C020"
                  stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
            <text x="280" y="218">٧ + ٣ = ٩</text>
          </g>
        </g>
      </svg>`
    }
  ],

  "g1m-13-3": [
    {
      type: "mcq",
      objective: "1Nc9: يفهم الطرح على أنه عملية العدّ تنازليًّا والأخذ بعيدًا أو الإبعاد",
      level: "knowledge",
      prompt: "في السَّلَّةِ ٩ تُفّاحاتٍ، أَخَذْنا ٤. كَمْ بَقِيَ؟",
      options: ["٣", "٤", "٥", "٦"],
      answer: 2
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc9: يفهم الطرح على أنه عملية العدّ تنازليًّا والأخذ بعيدًا أو الإبعاد",
      level: "knowledge",
      prompt: "أَكْمِلِ جُمْلَةَ الطَّرْحِ.",
      tokens: ["٩", "−", "٤", "=", "__"],
      bank: ["٣", "٤", "٥", "٦"],
      answers: ["٥"]
    },
    {
      type: "count-tap",
      objective: "1Nc9: يفهم الطرح على أنه عملية العدّ تنازليًّا والأخذ بعيدًا أو الإبعاد",
      level: "application",
      prompt: "اِنْقُرِ التُّفّاحاتِ الباقِيَةَ الخَمْسَ وعُدَّها.",
      mode: "each", glyph: "🍎", count: 9, target: 5
    },
    {
      type: "fill-blank",
      objective: "1Nc11: يجمع / يطرح عددًا من منزلتين عن طريق العدّ تصاعديًّا أو للخلف",
      level: "application",
      prompt: "أَكْمِلِ الجُمْلَتَيْنِ بِسَحْبِ العَدَدِ المُناسِبِ.",
      text: "أَخَذْنا مِنَ الثَّمانِيَةِ ثَلاثَةً فَبَقِيَ {} ، وأَخَذْنا مِنَ السَّبْعَةِ خَمْسَةً فَبَقِيَ {}",
      answers: ["٥", "٢"],
      distractors: ["٤", "٣"]
    },
    {
      type: "matching",
      objective: "1Nc9: يفهم الطرح على أنه عملية العدّ تنازليًّا والأخذ بعيدًا أو الإبعاد",
      level: "reasoning",
      prompt: "صِلْ كُلَّ جُمْلَةِ طَرْحٍ بِناتِجِها.",
      pairs: [
        { a: "٨ − ٢", b: "٦" },
        { a: "٩ − ٥", b: "٤" },
        { a: "٧ − ٤", b: "٣" },
        { a: "٦ − ٥", b: "١" }
      ]
    },
    {
      type: "color",
      objective: "1Nc9: يفهم الطرح على أنه عملية العدّ تنازليًّا والأخذ بعيدًا أو الإبعاد",
      level: "reasoning",
      prompt: "مِنْ خَمْسَةِ أَقْراصٍ نَأْخُذُ اثْنَيْنِ — لَوِّنِ المَأْخوذَيْنِ بِالأَحْمَرِ والباقِيَ بِالأَزْرَقِ.",
      bg: "#fdf6ec",
      showLabels: false,
      palette: [
        { name: "أَحْمَر", color: "#FF2020" },
        { name: "أَزْرَق", color: "#20A0FF" }
      ],
      parts: [
        { name: "خانة ١", color: "#FF2020" },
        { name: "خانة ٢", color: "#FF2020" },
        { name: "خانة ٣", color: "#20A0FF" },
        { name: "خانة ٤", color: "#20A0FF" },
        { name: "خانة ٥", color: "#20A0FF" }
      ],
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#111111" stroke-width="3" stroke-linejoin="round">
          <g class="cpart" data-name="خانة ١"><circle cx="490" cy="130" r="42"/></g>
          <g class="cpart" data-name="خانة ٢"><circle cx="390" cy="130" r="42"/></g>
          <g class="cpart" data-name="خانة ٣"><circle cx="280" cy="130" r="42"/></g>
          <g class="cpart" data-name="خانة ٤"><circle cx="170" cy="130" r="42"/></g>
          <g class="cpart" data-name="خانة ٥"><circle cx="70"  cy="130" r="42"/></g>
        </g>
      </svg>`
    }
  ],

  "g1m-13-4": [
    {
      type: "mcq",
      objective: "1Nc10: يفهم الفرق على أنه الإبْعاد أو الحذف أو الأخذ بعيدًا",
      level: "knowledge",
      prompt: "ما الفَرْقُ بَيْنَ ٩ و٤؟",
      options: ["٣", "٤", "٥", "٦"],
      answer: 2
    },
    {
      type: "true-false",
      objective: "1Nc10: يفهم الفرق على أنه الإبْعاد أو الحذف أو الأخذ بعيدًا",
      level: "knowledge",
      statement: "الفَرْقُ بَيْنَ عَدَدَيْنِ هُوَ عَدَدُ القَفَزاتِ بَيْنَهُما عَلى خَطِّ الأَعْدادِ.",
      answer: true
    },
    {
      type: "number-line",
      mode: "jump",
      objective: "1Nc10: يفهم الفرق على أنه الإبْعاد أو الحذف أو الأخذ بعيدًا",
      level: "application",
      prompt: "اِقْفِزْ مِنَ ٤ إِلَى ٩ قَفْزَةً قَفْزَةً لِتَجِدَ الفَرْقَ.",
      min: 0, max: 15, step: 1, labelEvery: 5,
      jump: { start: 4, size: 1, count: 5 }
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "1Nc10: يفهم الفرق على أنه الإبْعاد أو الحذف أو الأخذ بعيدًا",
      level: "application",
      prompt: "أَكْمِلِ المُعادَلَةَ لِتَجِدَ الفَرْقَ.",
      tokens: ["١٢", "−", "٧", "=", "__"],
      bank: ["٤", "٥", "٦", "٧"],
      answers: ["٥"]
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد",
      level: "reasoning",
      prompt: "قارِنْ بَيْنَ الفَرْقَيْنِ.",
      pairs: [ { a: "٥", b: "٨" }, { a: "٦", b: "٦" }, { a: "٩", b: "٤" } ]
    },
    {
      type: "slider",
      objective: "1Nc10: يفهم الفرق على أنه الإبْعاد أو الحذف أو الأخذ بعيدًا",
      level: "application",
      prompt: "الفَرْقُ بَيْنَ ١٤ و٦ — اِسْحَبِ المُؤَشِّرَ إِلَيْهِ.",
      min: 0, max: 15, answer: 8, tolerance: 0, ticks: 5
    }
  ],

  "g1m-13-5": [
    {
      type: "mcq",
      objective: "1Nc12: يجد ٢ أكثر، أو ٢ أقل من أي عدد حتى ٢٠",
      level: "knowledge",
      prompt: "اثْنانِ أَكْثَرُ مِنْ ١٥ هُوَ:",
      options: ["١٣", "١٦", "١٧", "١٨"],
      answer: 2
    },
    {
      type: "true-false",
      objective: "1Nc12: يجد ٢ أكثر، أو ٢ أقل من أي عدد حتى ٢٠",
      level: "knowledge",
      statement: "اثْنانِ أَقَلُّ مِنْ ١٠ هُوَ ٨.",
      answer: true
    },
    {
      type: "number-line",
      mode: "jump",
      objective: "1Nc12: يجد ٢ أكثر، أو ٢ أقل من أي عدد حتى ٢٠",
      level: "application",
      prompt: "اِقْفِزْ بِالاثْنَيْنِ مِنَ ٦: انْقُرْ مَوْضِعَ كُلِّ قَفْزَةٍ.",
      min: 0, max: 20, step: 1, labelEvery: 5,
      jump: { start: 6, size: 2, count: 4 }
    },
    {
      type: "pattern",
      objective: "1Nc12: يجد ٢ أكثر، أو ٢ أقل من أي عدد حتى ٢٠",
      level: "application",
      prompt: "أَكْمِلِ النَّمَطَ: القَفْزُ بِالاثْنَيْنِ.",
      items: ["٤", "٦", "__", "١٠", "__", "١٤"],
      answers: ["٨", "١٢"],
      distractors: ["٩", "١٣"],
      rule: "نَزيدُ ٢ كُلَّ مَرَّةٍ"
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "reasoning",
      prompt: "رَتِّبْ نَواتِجَ القَفْزِ بِالاثْنَيْنِ.",
      steps: ["٦", "٨", "١٠", "١٢", "١٤"]
    },
    {
      type: "exclude",
      objective: "1Nc12: يجد ٢ أكثر، أو ٢ أقل من أي عدد حتى ٢٠",
      level: "reasoning",
      prompt: "كُلُّها نَواتِجُ القَفْزِ بِالاثْنَيْنِ مِنَ ٦ — أَيُّها لا يَنْتَمي؟",
      options: ["٨", "١٠", "١١", "١٢"],
      answer: 2,
      reason: "١١ فَرْدِيٌّ لا تَقَعُ عَلَيْهِ قَفْزَةُ الاثْنَيْنِ مِنَ ٦"
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٤: ترتيب الأعداد (٢) ═══ */

  "g1m-14-1": [
    {
      type: "mcq",
      objective: "1Nn6: يبدأ بتجزئة الأعداد إلى عشرات وآحاد والعكس",
      level: "knowledge",
      prompt: "العَدَدُ ٢٧ يَتَكَوَّنُ مِنْ:",
      options: ["٧ عَشَراتٍ و٢ آحادٍ", "٢ عَشَراتٍ و٧ آحادٍ", "٢٧ عَشْرَةً", "٩ آحادٍ"],
      answer: 1
    },
    {
      type: "place-value",
      mode: "build",
      objective: "1Nn6: يبدأ بتجزئة الأعداد إلى عشرات وآحاد والعكس",
      level: "knowledge",
      prompt: "ابْنِ العَدَدَ ٢٧ بِالعَشَراتِ والآحادِ.",
      target: 27
    },
    {
      type: "sequence",
      objective: "1Nn1: يضع الأعداد بالترتيب",
      level: "application",
      prompt: "رَتِّبِ الأَعْدادَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
      steps: ["١٢", "١٨", "٢٣", "٢٧", "٣١"]
    },
    {
      type: "number-line",
      mode: "place",
      objective: "1Nn9: يرتّب الأعداد إلى ما لا يقل عن ٢٠، ويضعها على مسار عددي",
      level: "application",
      prompt: "ضَعِ المُؤَشِّرَ عَلى العَدَدِ ٢٣.",
      min: 10, max: 30, step: 1, labelEvery: 5,
      target: 23
    },
    {
      type: "compare",
      objective: "1Nn8: يستخدم أكبر أو أصغر للمقارنة بين الأعداد",
      level: "reasoning",
      prompt: "ضَعِ الرَّمْزَ المُناسِبَ بَيْنَ كُلِّ عَدَدَيْنِ.",
      pairs: [ { a: "١٩", b: "٢٤" }, { a: "٢٧", b: "٢٧" }, { a: "٣١", b: "١٣" } ]
    },
    {
      type: "memory",
      objective: "1Nn6: يبدأ بتجزئة الأعداد إلى عشرات وآحاد والعكس",
      level: "knowledge",
      prompt: "اِقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ: طابِقْ كُلَّ عَدَدٍ بِتَجْزِئَتِهِ.",
      pairs: [
        { a: "١٤", b: "عَشْرَةٌ و٤ آحادٍ" },
        { a: "٢٣", b: "عَشْرَتانِ و٣ آحادٍ" },
        { a: "٣٠", b: "٣ عَشَراتٍ" },
        { a: "٢٧", b: "عَشْرَتانِ و٧ آحادٍ" }
      ]
    }
  ],

  "g1m-14-2": [
    {
      type: "mcq",
      objective: "1Pt3: يجد العديد من التركيبات",
      level: "knowledge",
      prompt: "لَدَيْنا قَميصانِ وثَلاثُ قُبَّعاتٍ — كَمْ تَرْكيبَةً مُخْتَلِفَةً يُمْكِنُ تَكْوينُها؟",
      options: ["٢", "٣", "٥", "٦"],
      answer: 3
    },
    {
      type: "true-false",
      objective: "1Pt3: يجد العديد من التركيبات",
      level: "knowledge",
      statement: "الطَّريقَةُ المُنَظَّمَةُ تُساعِدُنا عَلى إِيجادِ كُلِّ التَّراكيبِ بِلا تَكْرارٍ.",
      answer: true
    },
    {
      type: "array",
      mode: "build",
      objective: "1Pt3: يجد العديد من التركيبات",
      level: "application",
      prompt: "ابْنِ مَصْفوفَةً فيها صَفّانِ، في كُلِّ صَفٍّ ثَلاثَةُ مُرَبَّعاتٍ — لِتَرى كُلَّ التَّراكيبِ.",
      rows: 2, cols: 3,
      answerSentence: "٢ × ٣ = ٦"
    },
    {
      type: "count-tap",
      objective: "1Pt3: يجد العديد من التركيبات",
      level: "application",
      prompt: "اِنْقُرْ سِتَّ تَراكيبَ وعُدَّها.",
      mode: "each", glyph: "🧢", count: 9, target: 6
    },
    {
      type: "classify",
      objective: "1Pt3: يجد العديد من التركيبات",
      level: "reasoning",
      prompt: "صَنِّفِ الطُّرُقَ: أَيُّها يَضْمَنُ إِيجادَ كُلِّ التَّراكيبِ؟",
      groups: [
        { name: "طَريقَةٌ مُنَظَّمَةٌ",  items: ["نُثَبِّتُ القَميصَ ونُغَيِّرُ القُبَّعَةَ", "نَكْتُبُ التَّراكيبَ في جَدْوَلٍ"] },
        { name: "طَريقَةٌ عَشْوائِيَّةٌ", items: ["نَخْتارُ بِلا تَرْتيبٍ", "نُعيدُ التَّرْكيبَ نَفْسَهُ"] }
      ]
    },
    {
      type: "color",
      objective: "1Pt3: يجد العديد من التركيبات",
      level: "reasoning",
      prompt: "الصَّفُّ الأَوَّلُ لِلْقَميصِ الأَحْمَرِ والثّاني لِلأَزْرَقِ — لَوِّنْ كُلَّ صَفٍّ بِلَوْنِهِ.",
      bg: "#fdf6ec",
      showLabels: false,
      palette: [
        { name: "أَحْمَر", color: "#FF2020" },
        { name: "أَزْرَق", color: "#20A0FF" }
      ],
      parts: [
        { name: "خانة ١", color: "#FF2020" },
        { name: "خانة ٢", color: "#FF2020" },
        { name: "خانة ٣", color: "#FF2020" },
        { name: "خانة ٤", color: "#20A0FF" },
        { name: "خانة ٥", color: "#20A0FF" },
        { name: "خانة ٦", color: "#20A0FF" }
      ],
      svg: `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#111111" stroke-width="3" stroke-linejoin="round">
          <g class="cpart" data-name="خانة ١"><rect x="396" y="34" width="96" height="82" rx="12"/></g>
          <g class="cpart" data-name="خانة ٢"><rect x="232" y="34" width="96" height="82" rx="12"/></g>
          <g class="cpart" data-name="خانة ٣"><rect x="68"  y="34" width="96" height="82" rx="12"/></g>
          <g class="cpart" data-name="خانة ٤"><rect x="396" y="144" width="96" height="82" rx="12"/></g>
          <g class="cpart" data-name="خانة ٥"><rect x="232" y="144" width="96" height="82" rx="12"/></g>
          <g class="cpart" data-name="خانة ٦"><rect x="68"  y="144" width="96" height="82" rx="12"/></g>
        </g>
      </svg>`
    }
  ],

  /* ═══ الرياضيات — الصف الثالث · الوحدة ١أ · الفصل ١: القيمة المكانيّة (١) ═══ */

  "g3m-1-1": [
    {
      type: "fill-blank",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "knowledge",
      prompt: "أَكمِلْ تَفكيكَ العَدَدِ إلى مِئاتٍ وعَشَراتٍ وآحاد.",
      text: "العَدَدُ ٤٦٣ = ٤ مِئاتٍ + {} عَشَراتٍ + {} آحاد",
      answers: ["٦", "٣"],
      distractors: ["٤", "٠"]
    },
    {
      type: "mcq",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "knowledge",
      prompt: "ما قيمةُ الرَّقمِ ٦ في العَدَدِ ٤٦٣؟",
      options: ["٦", "٦٠", "٦٠٠", "٦٠٠٠"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nn6: يجد ١ و١٠ و١٠٠ أكثر / أقل من الأعداد المكونة من رقمين أو ثلاثة",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ: اسحَبِ البِطاقةَ المُناسِبةَ إلى الخانةِ الفارِغةِ.",
      tokens: ["٥٤٧", "-", "١٠٠", "=", "__"],
      bank: ["٤٤٧", "٥٣٧", "٥٥٧", "٦٤٧"],
      answers: ["٤٤٧"]
    },
    {
      type: "number-line",
      mode: "place",
      objective: "3Nn9: يضع العدد المكوّن من ثلاثة أرقام على خط الأعداد المحدَّد بمضاعفات ١٠٠",
      level: "application",
      prompt: "ضَعِ العَدَدَ ٤٠٠ على خَطِّ الأَعدادِ المُتدرِّجِ بِمُضاعَفاتِ المِئة.",
      min: 0, max: 1000, step: 100, labelEvery: 1,
      target: 400
    },
    {
      type: "sequence",
      objective: "3Nn3: يعدّ تصاعديًّا وتنازليًّا بآحاد وعشرات ومئات من الأعداد المكوّنة من رقمين ومن الأعداد المكونة من ثلاثة أرقام",
      level: "reasoning",
      prompt: "رَتِّبْ هذهِ الأَعدادَ مِنَ الأَصغَرِ إلى الأَكبَرِ.",
      steps: ["١٤٧", "٣٨٥", "٥٩٢", "٧٢٦"]
    },
    {
      type: "slider",
      objective: "3Nn9: يضع العدد المكوّن من ثلاثة أرقام على خط الأعداد المحدَّد بمضاعفات ١٠٠",
      level: "application",
      prompt: "قَدِّرْ مَوضِعَ العَدَدِ ٣٥٠ تَقريباً عَلى الشَّريط.",
      min: 0, max: 1000, answer: 350, tolerance: 20, ticks: 100
    }
  ],

  "g3m-1-2": [
    {
      type: "matching",
      objective: "3Nn2: يقرأ ويكتب الأعداد حتى ١٠٠٠ على الأقل",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَدَدٍ مَكتوباً بِالكَلِماتِ بِرَقمِهِ.",
      pairs: [
        { a: "تِسْعُمِئَةٍ وعِشرونَ", b: "٩٢٠" },
        { a: "خَمْسُمِئَةٍ وثَلاثَةٌ وأربَعونَ", b: "٥٤٣" },
        { a: "مِئَتانِ وتِسْعَةَ عَشَرَ", b: "٢١٩" },
        { a: "سَبْعُمِئَةٍ وثَمانِيَةٌ", b: "٧٠٨" }
      ]
    },
    {
      type: "mcq",
      objective: "3Nn2: يقرأ ويكتب الأعداد حتى ١٠٠٠ على الأقل",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَعدادِ يَتَكوَّنُ مِن ٥ مِئاتٍ فَقَط، بِلا عَشَراتٍ ولا آحاد؟",
      options: ["٥٠٥", "٥٥٠", "٥٠٠", "٥٥٥"],
      answer: 2
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ لِتَحصُلَ عَلى العَدَدِ الصَّحيح.",
      tokens: ["٢٠٠", "+", "٩٠", "+", "٤", "=", "__"],
      bank: ["٢٩٤", "٢٩٠", "٢٤٩", "٢٩٦"],
      answers: ["٢٩٤"]
    },
    {
      type: "number-line",
      mode: "jump",
      objective: "3Nn3: يعدّ تصاعديًّا وتنازليًّا بآحاد وعشرات ومئات من الأعداد المكوّنة من رقمين ومن الأعداد المكونة من ثلاثة أرقام",
      level: "application",
      prompt: "اِنقُرْ كُلَّ قَفزَةٍ بِدَورِها لِتَعُدَّ تَصاعُدياً بِالعَشَراتِ ابتِداءً مِن ٥٦٠.",
      min: 550, max: 610, step: 10, labelEvery: 1,
      jump: { start: 560, size: 10, count: 4 }
    },
    {
      type: "sequence",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "reasoning",
      prompt: "رَتِّبْ هذِهِ الأَعدادَ مِنَ الأَصغَرِ إلى الأَكبَرِ.",
      steps: ["١٣١", "٢٩٤", "٤٣٥", "٦٢٤"]
    },
    {
      type: "exclude",
      objective: "3Nn3: يعدّ تصاعديًّا وتنازليًّا بآحاد وعشرات ومئات من الأعداد المكوّنة من رقمين ومن الأعداد المكونة من ثلاثة أرقام",
      level: "reasoning",
      prompt: "كُلُّ هذِهِ الأَعدادِ مِن مُضاعَفاتِ العَشَرَةِ إلّا واحِداً — أَيُّها لا يَنتَمي؟",
      options: ["٢٩٠", "٤٣٠", "٥٢٥", "٦١٠"],
      answer: 2,
      reason: "يَنتَهي بِالرَّقمِ ٥ لا بِصِفر"
    }
  ],

  "g3m-1-3": [
    {
      type: "matching",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَدَدٍ بِتَجزِئَتِهِ الصَّحيحة.",
      pairs: [
        { a: "٤٢١", b: "٤٠٠ + ٢٠ + ١" },
        { a: "١٤٨", b: "١٠٠ + ٤٠ + ٨" },
        { a: "٧٧٧", b: "٧٠٠ + ٧٠ + ٧" },
        { a: "٨٦٥", b: "٨٠٠ + ٦٠ + ٥" }
      ]
    },
    {
      type: "compare",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "knowledge",
      prompt: "قارِنْ: أَيُّهُما أَكبَر؟",
      pairs: [
        { a: "٤ مِئات", b: "٤٤ عَشَرَة" },
        { a: "٨ مِئات", b: "٨٨ عَشَرَة" },
        { a: "٣ عَشَرات", b: "٢ آحاد" }
      ]
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ بِإيجادِ العَدَدِ النَّاقِص.",
      tokens: ["٤٢١", "=", "__", "+", "٢٠", "+", "١"],
      bank: ["٤٠٠", "٤٠", "٤", "٢٠٠"],
      answers: ["٤٠٠"]
    },
    {
      type: "mcq",
      objective: "3Ps3: يستكشف ويحل المشكلات العددية والألغاز",
      level: "application",
      prompt: "لَدَيْكَ الأَرقامُ ٧، ٤، ٩، ١ — ما أَكبَرُ عَدَدٍ مُكَوَّنٍ مِن ثَلاثَةِ أَرقامٍ يُمكِنُ تَكوينُهُ؟",
      options: ["٩٧٤", "٩٧١", "٧٩٤", "٩٤١"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Ps3: يستكشف ويحل المشكلات العددية والألغاز",
      level: "reasoning",
      statement: "أَصغَرُ عَدَدٍ مُكَوَّنٍ مِن ثَلاثَةِ أَرقامٍ يُمكِنُ تَكوينُهُ مِنَ الأَرقامِ ٧، ٤، ٩، ١ هُوَ ١٤٧.",
      answer: true
    },
    {
      type: "memory",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ عَدَدٍ بِتَجزِئَتِهِ.",
      pairs: [
        { a: "٢٣٤", b: "٢ مئات و٣ عشرات و٤ آحاد" },
        { a: "٦١٨", b: "٦ مئات و١ عشرة و٨ آحاد" },
        { a: "٣٠٥", b: "٣ مئات و٠ عشرات و٥ آحاد" },
        { a: "٩٥٠", b: "٩ مئات و٥ عشرات و٠ آحاد" }
      ]
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٢: اللعب بـ١٠ و١٠٠ ═══ */

  "g3m-2-1": [
    {
      type: "mcq",
      objective: "3Nc9: يجمع ويطرح ١٠ ومضاعفات ١٠ من وإلى الأعداد المكونة من ثلاثة أرقام",
      level: "application",
      prompt: "يوجَدُ في المَتْجَرِ ٣٤ تُفّاحَةً. بيعَ مِنها ٢٠ تُفّاحَةً. كَم تُفّاحَةً بَقِيَت؟",
      options: ["١٤", "٢٤", "٥٤", "١٦"],
      answer: 0
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc10: يجمع ١٠٠ ومضاعفات ١٠٠ إلى الأعداد المكونة من ثلاثة أرقام",
      level: "application",
      prompt: "كانَ في المَتْجَرِ ١٠٧ أَكياسٍ مِنَ الأُرزِّ، ثُمَّ تَسَلَّمَ ٢٠٠ كيسٍ إضافةً إلَيها. أَكمِلِ المُعادَلة.",
      tokens: ["١٠٧", "+", "٢٠٠", "=", "__"],
      bank: ["٣٠٧", "٣٠٠", "٣١٧", "٢٠٧"],
      answers: ["٣٠٧"]
    },
    {
      type: "fill-blank",
      objective: "3Nn6: يجد ١ و١٠ و١٠٠ أكثر / أقل من الأعداد المكونة من رقمين أو ثلاثة",
      level: "knowledge",
      prompt: "أَكمِلْ حِسابَ الأَكثَرِ والأَقَلّ.",
      text: "٤٥٠ + ١٠٠ = {} ، و٤٥٠ − ١٠ = {}",
      answers: ["٥٥٠", "٤٤٠"],
      distractors: ["٥٦٠", "٤٣٠"]
    },
    {
      type: "true-false",
      objective: "3Ps6: يحدّد العلاقات البسيطة بين الأعداد",
      level: "reasoning",
      statement: "إذا زادَ عَدَدٌ بِمِقدارِ ١٠ ثُمَّ نَقَصَ بِمِقدارِ ١٠، فإنَّهُ يَعودُ إلى قيمَتِهِ الأَصليَّة.",
      answer: true
    },
    {
      type: "matching",
      objective: "3Nc9: يجمع ويطرح ١٠ ومضاعفات ١٠ من وإلى الأعداد المكونة من ثلاثة أرقام",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَمَليَّةٍ حِسابيَّةٍ بِناتِجِها.",
      pairs: [
        { a: "١٧٥ + ٢٠", b: "١٩٥" },
        { a: "٦٤ - ٢٠", b: "٤٤" },
        { a: "٢١٢ + ١٠٠", b: "٣١٢" },
        { a: "٣٠٠ - ٢٢٠", b: "٨٠" }
      ]
    }
  ],

  "g3m-3-1": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc12: يجمع عدة أعداد صغيرة مكونة من رقم واحد",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ بِجَمعِ الأَعدادِ الصَّغيرَةِ كُلِّها.",
      tokens: ["٣", "+", "٥", "+", "٢", "+", "٤", "=", "__"],
      bank: ["١٤", "١٣", "١٥", "١٢"],
      answers: ["١٤"]
    },
    {
      type: "mcq",
      objective: "3Nc16: يعيد ترتيب الجمع للمساعدة في الحساب",
      level: "reasoning",
      prompt: "ما الطَّريقَةُ الأَسهَلُ لِحِسابِ ٤ + ٧ + ٦ ذِهنيّاً؟",
      options: [
        "نَجمَعُ ٤ و٦ أَوَّلاً لأنَّهُما يُكَوِّنانِ ١٠، ثُمَّ نُضيفُ ٧",
        "نَضرِبُ الأَعدادَ الثَّلاثَةَ مَعاً",
        "نَطرَحُ ٧ مِن ٤",
        "لا توجَدُ طَريقَةٌ أَسهَل"
      ],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Nc16: يعيد ترتيب الجمع للمساعدة في الحساب",
      level: "knowledge",
      statement: "٥ + ٣ + ٢ = ٢ + ٣ + ٥",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Nc12: يجمع عدة أعداد صغيرة مكونة من رقم واحد",
      level: "application",
      prompt: "أَكمِلْ حَلَّ المَسأَلَةِ.",
      text: "في السَّاحَةِ ٤ عَصافيرَ و٦ حَمامات و٣ بَجَعات. عَدَدُ الطُّيورِ كُلِّها = {}",
      answers: ["١٣"],
      distractors: ["١٢", "١٤"]
    },
    {
      type: "matching",
      objective: "3Nc12: يجمع عدة أعداد صغيرة مكونة من رقم واحد",
      level: "knowledge",
      prompt: "صِلْ كُلَّ جُملَةِ جَمعٍ بِناتِجِها.",
      pairs: [
        { a: "٤+٦+٧", b: "١٧" },
        { a: "٥+٥+٥", b: "١٥" },
        { a: "٢+٣+٨", b: "١٣" },
        { a: "٩+١+٦", b: "١٦" }
      ]
    },
    {
      type: "exclude",
      objective: "3Ps3: يستكشف ويحل المشكلات العددية والألغاز",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الجُمَلِ الجَمعيَّةِ مَجموعُها لا يُساوي ١٥؟",
      options: ["٤+٥+٦", "٧+٣+٥", "٢+٤+٩", "٦+٦+٦"],
      answer: 3,
      reason: "مَجموعُها ١٨ لا ١٥"
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٤: الضعف والنصف ═══ */

  "g3m-4-1": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ لِتَجِدَ ضِعفَ العَدَدِ.",
      tokens: ["٦", "×", "٢", "=", "__"],
      bank: ["١٢", "١٤", "٨", "١٠"],
      answers: ["١٢"]
    },
    {
      type: "mcq",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "knowledge",
      prompt: "ما نِصْفُ العَدَدِ ٥٠؟",
      options: ["٢٠", "٢٥", "٣٠", "١٠٠"],
      answer: 1
    },
    {
      type: "matching",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَدَدٍ بِضِعفِهِ.",
      pairs: [
        { a: "٤", b: "٨" },
        { a: "٧", b: "١٤" },
        { a: "٩", b: "١٨" },
        { a: "١٢", b: "٢٤" }
      ]
    },
    {
      type: "true-false",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "application",
      statement: "نِصْفُ العَدَدِ ٥٠٠ يُساوي ٢٥٠.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "reasoning",
      prompt: "أَكمِلِ الجُملَةَ العَكسيَّةَ.",
      text: "الجُملَةُ العَكسيَّةُ لِـ«ضِعفُ ١٠ = ٢٠» هي: نِصفُ {} = {}",
      answers: ["٢٠", "١٠"],
      distractors: ["٤٠", "٥"]
    },
    {
      type: "memory",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ عَدَدٍ بِضِعفِهِ.",
      pairs: [
        { a: "٥", b: "١٠" },
        { a: "٨", b: "١٦" },
        { a: "١١", b: "٢٢" },
        { a: "١٥", b: "٣٠" }
      ]
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٥: الأزواج العدديّة ═══ */

  "g3m-5-1": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc2: يعرف حقائق الجمع والطرح التالية: مضاعفات ١٠٠ بمجموع ١٠٠٠ · مضاعفات ٥ بمجموع ١٠٠",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ لِيَكونَ مَجموعُ الطَّرَفَينِ ١٠٠.",
      tokens: ["٣٠", "+", "__", "=", "١٠٠"],
      bank: ["٧٠", "٦٠", "٨٠", "٥٠"],
      answers: ["٧٠"]
    },
    {
      type: "mcq",
      objective: "3Nc2: يعرف حقائق الجمع والطرح التالية: مضاعفات ١٠٠ بمجموع ١٠٠٠ · مضاعفات ٥ بمجموع ١٠٠",
      level: "knowledge",
      prompt: "أَيُّ زَوجٍ مِنَ الأَعدادِ التّاليَةِ مَجموعُهُ ١٠٠؟",
      options: ["٤٠ و٦٠", "٣٠ و٦٠", "٥٠ و٦٠", "٧٠ و٤٠"],
      answer: 0
    },
    {
      type: "matching",
      objective: "3Nc2: يعرف حقائق الجمع والطرح التالية: مضاعفات ١٠٠ بمجموع ١٠٠٠ · مضاعفات ٥ بمجموع ١٠٠",
      level: "knowledge",
      prompt: "صِلْ كُلَّ عَدَدٍ بِزَوجِهِ الَّذي مَجموعُهُما ١٠٠.",
      pairs: [
        { a: "١٥", b: "٨٥" },
        { a: "٢٥", b: "٧٥" },
        { a: "٤٥", b: "٥٥" },
        { a: "٥", b: "٩٥" }
      ]
    },
    {
      type: "true-false",
      objective: "3Nc2: يعرف حقائق الجمع والطرح التالية: مضاعفات ١٠٠ بمجموع ١٠٠٠ · مضاعفات ٥ بمجموع ١٠٠",
      level: "application",
      statement: "مَجموعُ ٥٥ و٤٥ يُساوي ١٠٠.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt4: يتحقق من نتائج جمع عددين باستخدام الطرح، وجمع عدة أعداد من خلال إعادة ترتيب جمع الأعداد",
      level: "reasoning",
      prompt: "لَدَى بَدرٍ ٤ عِصيٍّ واشتَرى ٧ أُخرى، ولَدى خالِدٍ ١٥ عَصا وأَعطى ٣ لِغَيرِهِ. أَكمِلِ الحَلَّ.",
      text: "عَدَدُ عِصيِّ بَدرٍ = {} ، وعَدَدُ عِصيِّ خالِدٍ = {}",
      answers: ["١١", "١٢"],
      distractors: ["١٠", "١٣"]
    },
    {
      type: "exclude",
      objective: "3Nc2: يعرف حقائق الجمع والطرح التالية: مضاعفات ١٠٠ بمجموع ١٠٠٠ · مضاعفات ٥ بمجموع ١٠٠",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَزواجِ مَجموعُهُ لا يُساوي ١٠٠؟",
      options: ["٢٠و٨٠", "٣٥و٦٥", "١٠و٨٠", "٥٠و٥٠"],
      answer: 2,
      reason: "مَجموعُهُما ٩٠ لا ١٠٠"
    }
  ],

  "g3m-5-2": [
    {
      type: "equation-builder",
      mode: "equivalence",
      objective: "3Nc11: يستخدم العلامة (=) للتعبير عن التساوي",
      level: "application",
      prompt: "أَكمِلِ الخانَةَ لِيَتَساوى طَرَفا المُعادَلة.",
      tokens: ["٨", "+", "__", "=", "٥", "+", "٦"],
      bank: ["٣", "٤", "٥", "٢"],
      answers: ["٣"]
    },
    {
      type: "mcq",
      objective: "3Nc1: يعرف حقائق الجمع والطرح لجميع الأعداد حتى ٢٠",
      level: "knowledge",
      prompt: "أَيُّ عَمَليَّةٍ حِسابيَّةٍ ناتِجُها ١١؟",
      options: ["٧+٤", "٦+٦", "٩+٣", "٥+٥"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Nc11: يستخدم العلامة (=) للتعبير عن التساوي",
      level: "knowledge",
      statement: "٨ + ٣ = ٥ + ٦",
      answer: true
    },
    {
      type: "classify",
      objective: "3Nc1: يعرف حقائق الجمع والطرح لجميع الأعداد حتى ٢٠",
      level: "reasoning",
      prompt: "صَنِّفِ العَمَليّاتِ الحِسابيَّةَ.",
      groups: [
        { name: "ناتِجُها ١١", items: ["٨+٣", "٩+٢"] },
        { name: "ناتِجُها لَيسَ ١١", items: ["٥+٥", "١٠+٣"] }
      ]
    },
    {
      type: "matching",
      objective: "3Nc11: يستخدم العلامة (=) للتعبير عن التساوي",
      level: "application",
      prompt: "صِلْ كُلَّ عَمَليَّةٍ بِعَمَليَّةٍ أُخرى تُساويها في النّاتِج.",
      pairs: [
        { a: "٨+٣", b: "٥+٦" },
        { a: "٩+٢", b: "٧+٤" },
        { a: "١٠+١", b: "٦+٥" },
        { a: "٤+٧", b: "٣+٨" }
      ]
    },
    {
      type: "memory",
      objective: "3Nc11: يستخدم العلامة (=) للتعبير عن التساوي",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ عَمَليَّةٍ بِمَا يُساويها.",
      pairs: [
        { a: "٨+٣", b: "٩+٢" },
        { a: "١٠+١", b: "٦+٥" },
        { a: "٧+٤", b: "٥+٦" },
        { a: "٠+١١", b: "٤+٧" }
      ]
    }
  ],

  /* ═══ الوحدة ١أ · الفصل ٦: المضاعفات ═══ */

  "g3m-6-1": [
    {
      type: "array",
      mode: "build",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "application",
      prompt: "ابْنِ مَصفوفةً فيها صَفّانِ، في كُلِّ صَفٍّ خَمسَةُ مُرَبَّعات.",
      rows: 2, cols: 5,
      answerSentence: "٢ × ٥ = ١٠"
    },
    {
      type: "mcq",
      objective: "3Nc20: يفهم تأثير ضرب الأعداد المكوّنة من رقمين × ١٠",
      level: "knowledge",
      prompt: "ما ناتِجُ ١٠ × ٤؟",
      options: ["١٤", "٤٠", "٤٤", "٤"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["٥", "×", "٦", "=", "__"],
      bank: ["٣٠", "٣٥", "٢٥", "٦٠"],
      answers: ["٣٠"]
    },
    {
      type: "true-false",
      objective: "3Nc25: يفهم ويطبّق فكرة أنّ الضرب عمليّة إبدالية",
      level: "knowledge",
      statement: "٢ × ٩ = ٩ × ٢",
      answer: true
    },
    {
      type: "pattern",
      objective: "3Ps5: يصف ويستكمل الأنماط التي تتضمن العدّ تصاعديًّا وتنازليًّا اثنينات، أو ثلاثات، أو أربعات، أو خمسات، أو عشرات، أو مئات",
      level: "reasoning",
      prompt: "أَكمِلِ النَّمَطَ: مُضاعَفاتُ العَدَدِ ٥.",
      items: ["٥", "١٠", "__", "٢٠", "__"],
      answers: ["١٥", "٢٥"],
      distractors: ["١٢", "٢٢"],
      rule: "كُلُّ عَدَدٍ أَكبَرُ مِن سابِقِهِ بِخَمسَة."
    },
    {
      type: "exclude",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَعدادِ لَيسَ مِن مُضاعَفاتِ العَدَدِ ٣؟",
      options: ["٩", "١٢", "١٤", "١٥"],
      answer: 2,
      reason: "ليسَ مِن مُضاعَفاتِ ٣"
    }
  ],

  "g3m-6-2": [
    {
      type: "classify",
      objective: "3Nc5: يتعرّف على المضاعفات المكونة من رقمين وثلاثة الأرقام للأعداد ٢، ٥، ١٠",
      level: "application",
      prompt: "صَنِّفِ الأَعدادَ.",
      groups: [
        { name: "مُضاعَفاتُ العَدَدِ ٥", items: ["١٠", "٢٠", "٣٠"] },
        { name: "لَيسَت مِن مُضاعَفاتِ العَدَدِ ٥", items: ["١٢", "١٨"] }
      ]
    },
    {
      type: "mcq",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "أَيٌّ مِن هذِهِ الأَعدادِ مِن مُضاعَفاتِ العَدَدِ ٣؟",
      options: ["٢٢", "٢٥", "٢٧", "٢٨"],
      answer: 2
    },
    {
      type: "fill-blank",
      objective: "3Nc5: يتعرّف على المضاعفات المكونة من رقمين وثلاثة الأرقام للأعداد ٢، ٥، ١٠",
      level: "knowledge",
      prompt: "أَكمِلِ الجُملَة.",
      text: "مُضاعَفاتُ العَدَدِ ٥ آحادُها دائِماً {} أَو {}",
      answers: ["٠", "٥"],
      distractors: ["٢", "٣"]
    },
    {
      type: "true-false",
      objective: "3Nc5: يتعرّف على المضاعفات المكونة من رقمين وثلاثة الأرقام للأعداد ٢، ٥، ١٠",
      level: "application",
      statement: "العَدَدُ ٤٥ مِن مُضاعَفاتِ العَدَدِ ٥.",
      answer: true
    },
    {
      type: "sequence",
      objective: "3Ps5: يصف ويستكمل الأنماط التي تتضمن العدّ تصاعديًّا وتنازليًّا اثنينات، أو ثلاثات، أو أربعات، أو خمسات، أو عشرات، أو مئات",
      level: "reasoning",
      prompt: "رَتِّبْ مُضاعَفاتِ العَدَدِ ٣ هذِهِ مِنَ الأَصغَرِ إلى الأَكبَر.",
      steps: ["٩", "١٥", "١٨", "٢١"]
    },
    {
      type: "memory",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ عَدَدٍ بِوَصفِهِ.",
      pairs: [
        { a: "٩", b: "مُضاعَفُ ٣" },
        { a: "١٠", b: "لَيسَ مُضاعَفَ ٣" },
        { a: "١٢", b: "مُضاعَفُ ٣" },
        { a: "١٤", b: "لَيسَ مُضاعَفَ ٣" }
      ]
    }
  ],

  "g3m-6-3": [
    {
      type: "hundred-chart",
      mode: "multiples",
      objective: "3Ps5: يصف ويستكمل الأنماط التي تتضمن العدّ تصاعديًّا وتنازليًّا اثنينات، أو ثلاثات، أو أربعات، أو خمسات، أو عشرات، أو مئات",
      level: "application",
      prompt: "لَوِّنْ مُضاعَفاتِ العَدَدِ ٥ في اللَّوحَةِ.",
      from: 1, to: 50, columns: 10,
      multiple: 5
    },
    {
      type: "mcq",
      objective: "3Ps5: يصف ويستكمل الأنماط التي تتضمن العدّ تصاعديًّا وتنازليًّا اثنينات، أو ثلاثات، أو أربعات، أو خمسات، أو عشرات، أو مئات",
      level: "reasoning",
      prompt: "أَيُّ الأَنماطِ التّاليَةِ يَصِفُ مَواضِعَ مُضاعَفاتِ العَدَدِ ١٠ عَلى شَبَكَةِ ١٠ أَعمِدَة؟",
      options: [
        "تَقَعُ كُلُّها في عَمودٍ واحِد",
        "تَتَوَزَّعُ عَشوائيّاً بِلا نَمَط",
        "تَقَعُ في قُطرٍ واحِدٍ فَقَط",
        "لا نَمَطَ لَها إطلاقاً"
      ],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Nc5: يتعرّف على المضاعفات المكونة من رقمين وثلاثة الأرقام للأعداد ٢، ٥، ١٠",
      level: "knowledge",
      statement: "جَميعُ مُضاعَفاتِ العَدَدِ ٥ تَنتَهي بِالرَّقمِ ٠ أَو ٥.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Nc4: يبدأ في معرفة جدول ضرب الـ٤",
      level: "application",
      prompt: "أَكمِلْ أَوَّلَ أَربَعَةِ مُضاعَفاتٍ لِلعَدَدِ ٤.",
      text: "٤ ، {} ، ١٢ ، {}",
      answers: ["٨", "١٦"],
      distractors: ["٦", "١٤"]
    },
    {
      type: "matching",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "صِلْ كُلَّ مُضاعَفٍ لِلعَدَدِ ٣ بِالمُضاعَفِ الَّذي يَليهِ مُباشَرَةً.",
      pairs: [
        { a: "٣", b: "٦" },
        { a: "٩", b: "١٢" },
        { a: "١٥", b: "١٨" },
        { a: "٢١", b: "٢٤" }
      ]
    },
    {
      type: "exclude",
      objective: "3Nc4: يبدأ في معرفة جدول ضرب الـ٤",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَعدادِ لَيسَ مِن مُضاعَفاتِ العَدَدِ ٤؟",
      options: ["٨", "١٢", "١٤", "١٦"],
      answer: 2,
      reason: "ليسَ مِن مُضاعَفاتِ ٤"
    }
  ],

  /* ═══ الوحدة ١ب · الفصل ٧: المزيد من الأشكال الهندسيّة ═══ */

  "g3m-7-1": [
    {
      type: "mcq",
      objective: "3Gs1: يتعرّف على الأشكال الثنائيّة الأبعاد المنتظمة وغير المنتظمة، ورسمها ووصفها بما في ذلك المضلّع الخماسي والسداسي والثماني وأشباه الدوائر",
      level: "knowledge",
      prompt: "كَم عَدَدُ أَضلاعِ الشَّكلِ الخُماسيِّ (المُخَمَّس)؟",
      options: ["٤", "٥", "٦", "٨"],
      answer: 1
    },
    {
      type: "matching",
      objective: "3Gs2: يصنّف الأشكال الثنائية الأبعاد طبقًا لعدد الأضلاع والزوايا القائمة والرؤوس",
      level: "knowledge",
      prompt: "صِلْ كُلَّ شَكلٍ بِعَدَدِ أَضلاعِهِ.",
      pairs: [
        { a: "مُثَلَّث", b: "٣ أَضلاع" },
        { a: "مُرَبَّع", b: "٤ أَضلاع" },
        { a: "خُماسيّ", b: "٥ أَضلاع" },
        { a: "سُداسيّ", b: "٦ أَضلاع" }
      ]
    },
    {
      type: "classify",
      objective: "3Gs8: يحدد الزوايا القائمة في الأشكال الثنائية الأبعاد",
      level: "application",
      prompt: "صَنِّفِ الأَشكالَ.",
      groups: [
        { name: "لَها زَوايا قائِمَة", items: ["المُرَبَّع", "المُستَطيل"] },
        { name: "لَيسَ لَها زَوايا قائِمَة", items: ["المُثَلَّثُ المُتَساوي الأَضلاع", "الخُماسيُّ المُنتَظِم"] }
      ]
    },
    {
      type: "true-false",
      objective: "3Gs1: يتعرّف على الأشكال الثنائيّة الأبعاد المنتظمة وغير المنتظمة، ورسمها ووصفها بما في ذلك المضلّع الخماسي والسداسي والثماني وأشباه الدوائر",
      level: "application",
      statement: "الشَّكلُ الَّذي لَدَيهِ ثَلاثَةُ أَضلاعٍ وزاويَةٌ قائِمَةٌ واحِدَةٌ يُسَمّى مُثَلَّثاً قائِمَ الزّاوِيَة.",
      answer: true
    },
    {
      type: "hotspot",
      objective: "3Gs8: يحدد الزوايا القائمة في الأشكال الثنائية الأبعاد",
      level: "reasoning",
      prompt: "انقُرْ عَلى الزّاوِيَةِ القائِمَةِ في هذا المُثَلَّث.",
      bg: "#fdf9ee",
      svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مثلث قائم الزاوية">
        <polygon points="60,60 60,240 260,240" fill="#7fb3e0" stroke="#2f6fb0" stroke-width="6"/>
      </svg>`,
      spot: { x: 20, y: 80, r: 13 }
    },
    {
      type: "exclude",
      objective: "3Gs2: يصنّف الأشكال الثنائية الأبعاد طبقًا لعدد الأضلاع والزوايا القائمة والرؤوس",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَشكالِ لَيسَ رُباعيَّ الأَضلاع؟",
      options: ["مُرَبَّع", "مُستَطيل", "خُماسيّ", "مُعَيَّن"],
      answer: 2,
      reason: "الخُماسيُّ لَهُ خَمسَةُ أَضلاعٍ لا أَربَعَة"
    }
  ],

  "g3m-7-2": [
    {
      type: "mcq",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "knowledge",
      prompt: "لَدَيَّ سِتَّةُ أَوجُهٍ وثَمانيَةُ رُؤوسٍ واثنا عَشَرَ حَدّاً، وكُلُّ أَوجُهي مُرَبَّعَةُ الشَّكلِ نَفسُه. مَن أَنا؟",
      options: ["المُكَعَّب", "مُتَوازي المُستَطيلات", "الهَرَم", "المَنشورُ الثُّلاثيّ"],
      answer: 0
    },
    {
      type: "matching",
      objective: "3Gs4: يصنّف الأجسام الثلاثيّة الأبعاد طبقًا لعدد شكل الأوجه، وعدد الرؤوس والحواف",
      level: "knowledge",
      prompt: "صِلْ كُلَّ شَكلٍ بِعَدَدِ أَوجُهِه.",
      pairs: [
        { a: "المُكَعَّب", b: "٦ أَوجُه" },
        { a: "الهَرَمُ الرُّباعيّ", b: "٥ أَوجُه" },
        { a: "المَنشورُ الثُّلاثيّ", b: "٥ أَوجُه" },
        { a: "مُتَوازي المُستَطيلات", b: "٦ أَوجُه" }
      ]
    },
    {
      type: "classify",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "application",
      prompt: "صَنِّفِ الأَشكالَ الثُّلاثيَّةَ الأَبعاد.",
      groups: [
        { name: "لَها رَأسٌ مُدَبَّب (أَهرام)", items: ["الهَرَمُ الرُّباعيّ", "الهَرَمُ الثُّلاثيّ"] },
        { name: "مَنشوراتٌ (وَجهانِ مُتَطابِقان)", items: ["المُكَعَّب", "المَنشورُ الثُّلاثيّ"] }
      ]
    },
    {
      type: "true-false",
      objective: "3Gs4: يصنّف الأجسام الثلاثيّة الأبعاد طبقًا لعدد شكل الأوجه، وعدد الرؤوس والحواف",
      level: "application",
      statement: "كُلُّ أَوجُهِ مُتَوازي المُستَطيلاتِ مُستَطيلَةُ الشَّكل.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt9: يحدد الفروق والتشابه بين مختلف الأشكال الثلاثية الأبعاد",
      level: "reasoning",
      prompt: "أَكمِلِ اسمَ الشَّكل.",
      text: "الشَّكلُ الَّذي لَدَيهِ خَمسَةُ أَوجُهٍ (٢ مُثَلَّثٍ و٣ مُستَطيلات) وسِتَّةُ رُؤوسٍ وتِسعَةُ حُدودٍ يُسَمّى {}",
      answers: ["المَنشورُ الثُّلاثيّ"],
      distractors: ["الهَرَمُ الرُّباعيّ"]
    },
    {
      type: "exclude",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَشكالِ لَيسَ لَهُ وَجهٌ مُثَلَّثٌ؟",
      options: ["الهَرَمُ الرُّباعيّ", "المَنشورُ الثُّلاثيّ", "المُكَعَّب", "الهَرَمُ الثُّلاثيّ"],
      answer: 2,
      reason: "كُلُّ أَوجُهِ المُكَعَّبِ مُرَبَّعَةٌ لا مُثَلَّثَة"
    }
  ],

  "g3m-7-3": [
    {
      type: "true-false",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "knowledge",
      statement: "شَبَكَةُ الشَّكلِ ثُلاثيِّ الأَبعادِ هي رَسمٌ مُسَطَّحٌ يُمكِنُ طَيُّهُ لِتَكوينِ ذلِكَ الشَّكل.",
      answer: true
    },
    {
      type: "mcq",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "knowledge",
      prompt: "كَم عَدَدَ المُرَبَّعاتِ الَّتي تَتَكَوَّنُ مِنها شَبَكَةُ المُكَعَّب؟",
      options: ["٤", "٥", "٦", "٨"],
      answer: 2
    },
    {
      type: "matching",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "application",
      prompt: "صِلْ كُلَّ شَكلٍ بِشَبَكَتِهِ.",
      pairs: [
        { a: "شَبَكَةُ المُكَعَّب", b: "٦ مُرَبَّعات" },
        { a: "شَبَكَةُ الهَرَمِ الرُّباعيّ", b: "مُرَبَّعٌ و٤ مُثَلَّثات" },
        { a: "شَبَكَةُ المَنشورِ الثُّلاثيّ", b: "مُستَطيلانِ ومُثَلَّثان" },
        { a: "شَبَكَةُ مُتَوازي المُستَطيلات", b: "٦ مُستَطيلات" }
      ]
    },
    {
      type: "classify",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "application",
      prompt: "صَنِّفِ الأَشكالَ حَسَبَ شَبَكَتِها.",
      groups: [
        { name: "شَبَكَتُها مِن مُرَبَّعاتٍ فَقَط", items: ["المُكَعَّب"] },
        { name: "شَبَكَتُها فيها مُثَلَّثات", items: ["الهَرَمُ الرُّباعيّ", "المَنشورُ الثُّلاثيّ"] }
      ]
    },
    {
      type: "fill-blank",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "reasoning",
      prompt: "أَكمِلِ الجُملَة.",
      text: "شَبَكَةٌ فيها مُرَبَّعٌ واحِدٌ في الوَسَطِ وأَربَعَةُ مُثَلَّثاتٍ حَولَ أَضلاعِهِ، إذا طُوِيَت تُكَوِّنُ {}",
      answers: ["هَرَماً رُباعيَّ القاعِدَة"],
      distractors: ["مُكَعَّباً"]
    },
    {
      type: "memory",
      objective: "3Gs3: يتعرّف على الأشكال الثلاثيّة الأبعاد ويصفها ويكوّنها بما في ذلك الأهرامات والمنشورات، ويستكشف أي الشبكات ستكوّن المكعّب",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ شَكلٍ بِشَبَكَتِه.",
      pairs: [
        { a: "المُكَعَّب", b: "٦ مُرَبَّعات" },
        { a: "الهَرَمُ الرُّباعيّ", b: "مُرَبَّعٌ و٤ مُثَلَّثات" },
        { a: "مُتَوازي المُستَطيلات", b: "٦ مُستَطيلات" },
        { a: "المَنشورُ الثُّلاثيّ", b: "مُستَطيلانِ ومُثَلَّثان" }
      ]
    }
  ],

  /* ═══ الوحدة ١ب · الفصل ٨: التماثل والحركة ═══ */

  "g3m-8-1": [
    {
      type: "symmetry",
      mode: "mirror",
      objective: "3Gs5: يرسم ويكمل الأشكال ثنائية الأبعاد ذات تماثل منعكس، ويرسم انعكاس هذه الأشكال",
      level: "application",
      prompt: "أَكمِلِ الصّورَةَ المِرآتيَّةَ لِلشَّكلِ.",
      rows: 4, cols: 4, axis: "v",
      shape: [[0,0],[1,1],[2,0],[3,1]]
    },
    {
      type: "mcq",
      objective: "3Gs7: يتعرف الأشكال ثنائية وثلاثية الأبعاد ذات تماثُل منعكس، ويرسم انعكاس هذه الأشكال",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الحُروفِ الإنجليزيَّةِ لَهُ خَطُّ تَماثُلٍ رَأسيّ؟",
      options: ["A", "F", "G", "J"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Gs7: يتعرف الأشكال ثنائية وثلاثية الأبعاد ذات تماثُل منعكس، ويرسم انعكاس هذه الأشكال",
      level: "knowledge",
      statement: "الدّائِرَةُ لَها عَدَدٌ لا نِهائيٌّ مِن خُطوطِ التَّماثُل.",
      answer: true
    },
    {
      type: "classify",
      objective: "3Gs7: يتعرف الأشكال ثنائية وثلاثية الأبعاد ذات تماثُل منعكس، ويرسم انعكاس هذه الأشكال",
      level: "reasoning",
      prompt: "صَنِّفِ الحُروفَ الإنجليزيَّةَ.",
      groups: [
        { name: "لَها خَطُّ تَماثُل", items: ["A", "B", "C"] },
        { name: "لَيسَ لَها خَطُّ تَماثُل", items: ["F", "G"] }
      ]
    },
    {
      type: "matching",
      objective: "3Gs7: يتعرف الأشكال ثنائية وثلاثية الأبعاد ذات تماثُل منعكس، ويرسم انعكاس هذه الأشكال",
      level: "application",
      prompt: "صِلْ كُلَّ شَكلٍ بِعَدَدِ خُطوطِ تَماثُلِهِ.",
      pairs: [
        { a: "المُرَبَّع", b: "٤ خُطوط" },
        { a: "المُستَطيل", b: "خَطّان" },
        { a: "المُثَلَّثُ المُتَساوي الأَضلاع", b: "٣ خُطوط" },
        { a: "الدّائِرَة", b: "لا نِهائيّ" }
      ]
    },
    {
      type: "exclude",
      objective: "3Gs7: يتعرف الأشكال ثنائية وثلاثية الأبعاد ذات تماثُل منعكس، ويرسم انعكاس هذه الأشكال",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الحُروفِ لَيسَ لَهُ خَطُّ تَماثُلٍ رَأسيّ؟",
      options: ["A", "H", "M", "N"],
      answer: 3,
      reason: "لا يَملِكُ خَطَّ تَماثُلٍ رَأسيّ"
    }
  ],

  "g3m-8-2": [
    {
      type: "mcq",
      objective: "3Gp1: يستخدم اللغة التي تشير إلى الموضع والاتجاه والحركة، بما في ذلك اتجاه عقارب الساعة، وعكس اتجاه عقارب الساعة",
      level: "knowledge",
      prompt: "ما مِقدارُ الدَّورَةِ الكامِلَةِ بِالدَّرَجات؟",
      options: ["٩٠°", "١٨٠°", "٣٦٠°", "٤٥°"],
      answer: 2
    },
    {
      type: "matching",
      objective: "3Gp1: يستخدم اللغة التي تشير إلى الموضع والاتجاه والحركة، بما في ذلك اتجاه عقارب الساعة، وعكس اتجاه عقارب الساعة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ دَورَةٍ بِمِقدارِها بِالدَّرَجات.",
      pairs: [
        { a: "دَورَةٌ كامِلَة", b: "٣٦٠°" },
        { a: "نِصفُ دَورَة", b: "١٨٠°" },
        { a: "رُبعُ دَورَة", b: "٩٠°" },
        { a: "ثَلاثَةُ أَرباعِ دَورَة", b: "٢٧٠°" }
      ]
    },
    {
      type: "true-false",
      objective: "3Gp1: يستخدم اللغة التي تشير إلى الموضع والاتجاه والحركة، بما في ذلك اتجاه عقارب الساعة، وعكس اتجاه عقارب الساعة",
      level: "application",
      statement: "الدَّورانُ مَعَ عَقارِبِ السّاعَةِ مِنَ اتِّجاهِ الشَّمالِ يُؤَدّي إلى اتِّجاهِ الشَّرقِ أَوَّلاً.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Gp1: يستخدم اللغة التي تشير إلى الموضع والاتجاه والحركة، بما في ذلك اتجاه عقارب الساعة، وعكس اتجاه عقارب الساعة",
      level: "application",
      prompt: "أَكمِلِ الجُملَتَينِ.",
      text: "إذا دارَ الشَّخصُ رُبعَ دَورَةٍ مَعَ عَقارِبِ السّاعَةِ مِنَ اتِّجاهِ الشَّمالِ، يُصبِحُ مُتَّجِهاً نَحوَ {}. وإذا دارَ نِصفَ دَورَةٍ مِنَ الشَّمالِ يُصبِحُ مُتَّجِهاً نَحوَ {}",
      answers: ["الشَّرق", "الجَنوب"],
      distractors: ["الغَرب", "الشَّمال"]
    },
    {
      type: "sequence",
      objective: "3Gp1: يستخدم اللغة التي تشير إلى الموضع والاتجاه والحركة، بما في ذلك اتجاه عقارب الساعة، وعكس اتجاه عقارب الساعة",
      level: "reasoning",
      prompt: "رَتِّبِ الجِهاتِ الأَربَعَ بِاتِّجاهِ عَقارِبِ السّاعَةِ ابتِداءً مِنَ الشَّمال.",
      steps: ["الشَّمال", "الشَّرق", "الجَنوب", "الغَرب"]
    },
    {
      type: "memory",
      objective: "3Gp1: يستخدم اللغة التي تشير إلى الموضع والاتجاه والحركة، بما في ذلك اتجاه عقارب الساعة، وعكس اتجاه عقارب الساعة",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ دَورَةٍ بِمِقدارِها.",
      pairs: [
        { a: "دَورَةٌ كامِلَة", b: "٣٦٠°" },
        { a: "نِصفُ دَورَة", b: "١٨٠°" },
        { a: "رُبعُ دَورَة", b: "٩٠°" },
        { a: "بِلا دَوَران", b: "٠°" }
      ]
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ٩: النقود ═══ */

  "g3m-9-1": [
    {
      type: "money",
      mode: "pay",
      objective: "3Mm1: يستوعب استخدام صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "application",
      prompt: "ثَمَنُ الكِتابِ ٣٥٠ بَيْسَةً — كَوِّنِ المَبْلَغَ.",
      target: 350, rack: [5, 10, 25, 50, 100, 200, 500]
    },
    {
      type: "mcq",
      objective: "3Mm1: يستوعب استخدام صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "knowledge",
      prompt: "١ ريال عُماني يُساوي كَم بَيْسَة؟",
      options: ["١٠٠", "٥٠٠", "١٠٠٠", "١٠"],
      answer: 2
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Mm1: يستوعب استخدام صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["٥", "+", "١٠", "=", "__"],
      bank: ["١٥", "١٤", "١٦", "٥٠"],
      answers: ["١٥"]
    },
    {
      type: "true-false",
      objective: "3Mm1: يستوعب استخدام صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "knowledge",
      statement: "٥٠ بَيْسَة + ٢٥ بَيْسَة = ٧٥ بَيْسَة",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt11: يعطي تقديرات معقولة للإجابة عن إحدى العمليات الحسابية",
      level: "reasoning",
      prompt: "دَفَعَ سالِمٌ ١ ريالاً ثَمَنَ قَلَمٍ بِـ٤٠٠ بَيْسَة. أَكمِلِ الحَلّ.",
      text: "الباقي لَهُ = {} بَيْسَة",
      answers: ["٦٠٠"],
      distractors: ["٥٠٠", "٤٠٠"]
    },
    {
      type: "exclude",
      objective: "3Mm1: يستوعب استخدام صيغة كتابة النقود (المبلغ الكامل أو نصف ريال عماني)",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ المَبالِغِ لا يُساوي ١ ريالاً عُمانيّاً (١٠٠٠ بَيْسَة)؟",
      options: ["٥٠٠+٥٠٠ بَيْسَة", "٩٠٠+٥٠ بَيْسَة", "٢٠٠×٥ بَيْسَة", "١٠٠٠ بَيْسَة"],
      answer: 1,
      reason: "مَجموعُها ٩٥٠ بَيْسَة لا ١٠٠٠"
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ١٠: الوقت ═══ */

  "g3m-10-1": [
    {
      type: "clock",
      mode: "read",
      objective: "3Mt2: يقرأ الوقت على ساعة العقارب والساعة الرقمية إلى أقرب خمس دقائق على ساعة العقارب، وإلى أقرب دقيقة على الساعة الرقمية",
      level: "knowledge",
      prompt: "اِقرَأِ الوَقتَ.",
      target: "٩:١٠",
      options: ["٩:١٠", "١٠:٥٠", "٩:٥٠"]
    },
    {
      type: "mcq",
      objective: "3Mt2: يقرأ الوقت على ساعة العقارب والساعة الرقمية إلى أقرب خمس دقائق على ساعة العقارب، وإلى أقرب دقيقة على الساعة الرقمية",
      level: "application",
      prompt: "بَدَأَ دَرسٌ السّاعَةَ ٣:٠٠ واستَمَرَّ ٤٥ دَقيقَة. مَتى يَنتَهي؟",
      options: ["٣:٤٥", "٤:٤٥", "٣:١٥", "٤:١٥"],
      answer: 0
    },
    {
      type: "fill-blank",
      objective: "3Mt1: يقترح ويستخدم الوحدات المناسبة لقياس الزمن ويميز العلاقة فيما بينها",
      level: "knowledge",
      prompt: "أَكمِلِ الجُملَتَين.",
      text: "في السّاعَةِ الواحِدَةِ {} دَقيقَة، وفي نِصفِ ساعَةٍ {} دَقيقَة",
      answers: ["٦٠", "٣٠"],
      distractors: ["١٠٠", "١٥"]
    },
    {
      type: "true-false",
      objective: "3Mt2: يقرأ الوقت على ساعة العقارب والساعة الرقمية إلى أقرب خمس دقائق على ساعة العقارب، وإلى أقرب دقيقة على الساعة الرقمية",
      level: "application",
      statement: "السّاعَةُ الرَّقميَّةُ ١٢:١٥ تَعني السّاعَةَ الثّانيَةَ عَشرَةَ وخَمسَ عَشرَةَ دَقيقَة.",
      answer: true
    },
    {
      type: "sequence",
      objective: "3Ml5: يحل المشكلات اللفظية التي تتضمن قياسات",
      level: "reasoning",
      prompt: "رَتِّبْ أَحداثَ اليَومِ حَسَبَ وَقتِها.",
      steps: ["٧:٠٠ الفُطور", "١٢:٠٠ الغَداء", "٤:٠٠ اللَّعِب", "٨:٠٠ النَّوم"]
    },
    {
      type: "exclude",
      objective: "3Mt2: يقرأ الوقت على ساعة العقارب والساعة الرقمية إلى أقرب خمس دقائق على ساعة العقارب، وإلى أقرب دقيقة على الساعة الرقمية",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَوقاتِ لا يُساوي التّاسِعَةَ والنِّصف؟",
      options: ["٩:٣٠", "تِسعَةٌ ونِصف", "٣٠:٩", "٩ و٣٠ دَقيقَة"],
      answer: 2,
      reason: "صيغَةٌ غَيرُ صَحيحَةٍ لِكِتابَةِ الوَقت"
    }
  ],

  /* ═══ الوحدة ١ج · الفصل ١١: القياسات ═══ */

  "g3m-11-1": [
    {
      type: "measure-tool",
      mode: "ruler-read",
      objective: "3Ml3: يقرأ لأقرب علامة أو نصف العلامة (على الموازين) الموازين المرقَّمة أو شبه المرقَّمة جزئيًّا",
      level: "knowledge",
      prompt: "كَم طولُ النَّبتَةِ بِالسَّنتيمِتْرات؟",
      max: 20, step: 1, labelEvery: 5, value: 12,
      unit: "سم", options: ["١٢", "١٠", "١٤", "٢٠"]
    },
    {
      type: "mcq",
      objective: "3Ml2: يعرف العلاقة بين الكيلومترات والأمتار وبين الأمتار والسنتيمترات وبين الكيلوغرامات والغرامات وبين اللترات والمللِيلترات",
      level: "knowledge",
      prompt: "كَم سَنتيمِتراً في المِترِ الواحِد؟",
      options: ["١٠", "١٠٠", "١٠٠٠", "٥٠"],
      answer: 1
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Pt2: يبدأ في فهم أنظمة القياس اليومية ذات الصلة بالطول والوزن والسعة والوقت، ويستخدمها لإجراء القياسات على النحو المناسب",
      level: "application",
      prompt: "طولُ نَبتَةِ الفُلفُلِ ٣٨ سم، وتَنمو ٥ سم كُلَّ يَوم. أَكمِلِ المُعادَلة.",
      tokens: ["٣٨", "+", "٥", "=", "__"],
      bank: ["٤٣", "٤٢", "٤٤", "٣٣"],
      answers: ["٤٣"]
    },
    {
      type: "true-false",
      objective: "3Ml2: يعرف العلاقة بين الكيلومترات والأمتار وبين الأمتار والسنتيمترات وبين الكيلوغرامات والغرامات وبين اللترات والمللِيلترات",
      level: "application",
      statement: "١٠٠٠ متر تُساوي كيلومتراً واحداً.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Ps2: يشرح سبب اختيار إستراتيجية حسابية ويبين كيفية الوصول للإجابة",
      level: "reasoning",
      prompt: "طولُ نَبتَةِ الفاصولياءِ ١ سم في اليَومِ الأَوَّلِ، وَيَتَضاعَفُ كُلَّ يَوم. أَكمِلِ الحَلّ.",
      text: "طولُها في اليَومِ الثّاني = {} سم، وفي اليَومِ الثّالِثِ = {} سم",
      answers: ["٢", "٤"],
      distractors: ["٣", "٥"]
    },
    {
      type: "exclude",
      objective: "3Ml2: يعرف العلاقة بين الكيلومترات والأمتار وبين الأمتار والسنتيمترات وبين الكيلوغرامات والغرامات وبين اللترات والمللِيلترات",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ القِياساتِ لا يُساوي مِتراً واحِداً؟",
      options: ["١٠٠ سم", "١٠٠٠ ملم", "٥٠ سم", "١٠ ديسيمتر"],
      answer: 2,
      reason: "٥٠ سم تُساوي نِصفَ مِترٍ فَقَط"
    }
  ],

  "g3m-11-2": [
    {
      type: "chart-read",
      mode: "read",
      objective: "3Pt2: يبدأ في فهم أنظمة القياس اليومية ذات الصلة بالطول والوزن والسعة والوقت، ويستخدمها لإجراء القياسات على النحو المناسب",
      level: "knowledge",
      prompt: "أَيُّ الفاكِهَةِ حُصِدَ بِأَكبَرِ كَميَّةٍ (كغم)؟",
      yTitle: "الكُتلَة (كغم)",
      series: [
        { label: "تُفّاح", value: 40 },
        { label: "بُرتُقال", value: 25 },
        { label: "كُمَّثرى", value: 15 }
      ],
      options: ["تُفّاح", "بُرتُقال", "كُمَّثرى"],
      answer: "تُفّاح"
    },
    {
      type: "mcq",
      objective: "3Ml2: يعرف العلاقة بين الكيلومترات والأمتار وبين الأمتار والسنتيمترات وبين الكيلوغرامات والغرامات وبين اللترات والمللِيلترات",
      level: "knowledge",
      prompt: "كَم غراماً في الكيلوغرامِ الواحِد؟",
      options: ["١٠", "١٠٠", "١٠٠٠", "٥٠٠"],
      answer: 2
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Pt2: يبدأ في فهم أنظمة القياس اليومية ذات الصلة بالطول والوزن والسعة والوقت، ويستخدمها لإجراء القياسات على النحو المناسب",
      level: "application",
      prompt: "حُصِدَ ٤٠ كغم تُفّاحاً و٢٥ كغم بُرتُقالاً. أَكمِلِ المُعادَلة.",
      tokens: ["٤٠", "+", "٢٥", "=", "__"],
      bank: ["٦٥", "٦٠", "٧٥", "٥٥"],
      answers: ["٦٥"]
    },
    {
      type: "true-false",
      objective: "3Ml2: يعرف العلاقة بين الكيلومترات والأمتار وبين الأمتار والسنتيمترات وبين الكيلوغرامات والغرامات وبين اللترات والمللِيلترات",
      level: "application",
      statement: "١ كيلوغرام أَثقَلُ مِن ١ غرام.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt2: يبدأ في فهم أنظمة القياس اليومية ذات الصلة بالطول والوزن والسعة والوقت، ويستخدمها لإجراء القياسات على النحو المناسب",
      level: "reasoning",
      prompt: "أَكمِلِ الحَلّ.",
      text: "الفَرقُ بَينَ كَميَّةِ التُّفّاحِ (٤٠كغم) والكُمَّثرى (١٥كغم) = {} كغم",
      answers: ["٢٥"],
      distractors: ["١٥", "٥٥"]
    },
    {
      type: "memory",
      objective: "3Ml2: يعرف العلاقة بين الكيلومترات والأمتار وبين الأمتار والسنتيمترات وبين الكيلوغرامات والغرامات وبين اللترات والمللِيلترات",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ وَحدَةٍ بِمُكافِئِها.",
      pairs: [
        { a: "١ كم", b: "١٠٠٠ م" },
        { a: "١ م", b: "١٠٠ سم" },
        { a: "١ كغم", b: "١٠٠٠ غم" },
        { a: "١ لتر", b: "١٠٠٠ مل" }
      ]
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٢: القيمة المكانيّة (٢) ═══ */

  "g3m-12-1": [
    {
      type: "sequence",
      objective: "3Nn12: يرتّب الأعداد من رقمين وثلاثة أرقام",
      level: "knowledge",
      prompt: "رَتِّبْ هذِهِ الأَعدادَ مِنَ الأَصغَرِ إلى الأَكبَر.",
      steps: ["٢٣٤", "٢٤٣", "٣٢٤", "٣٤٢"]
    },
    {
      type: "mcq",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "reasoning",
      prompt: "ما أَكبَرُ عَدَدٍ ثُلاثيٍّ يُمكِنُ تَكوينُهُ مِنَ الأَرقامِ ٢، ٤، ٥، ٧، ٨ (كُلُّ رَقمٍ مَرَّةً واحِدَة)؟",
      options: ["٨٧٥", "٨٧٤", "٧٨٥", "٥٤٢"],
      answer: 0
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nn5: يفهم ما يمثله كل رقم في الأعداد المكوّنة من ثلاثة أرقام ويجزّئها إلى مئات وعشرات وآحاد",
      level: "application",
      prompt: "أَكمِلِ المُعادَلةَ بِإيجادِ العَدَدِ النّاقِص.",
      tokens: ["٤٥١", "=", "__", "+", "٥٠", "+", "١"],
      bank: ["٤٠٠", "٤٠", "٤", "٤٥٠"],
      answers: ["٤٠٠"]
    },
    {
      type: "true-false",
      objective: "3Nn12: يرتّب الأعداد من رقمين وثلاثة أرقام",
      level: "knowledge",
      statement: "العَدَدُ ٧٦٨ أَصغَرُ مِنَ العَدَدِ ٨٦٧.",
      answer: true
    },
    {
      type: "number-line",
      mode: "place",
      objective: "3Nn9: يضع العدد المكوّن من ثلاثة أرقام على خط الأعداد المحدَّد بمضاعفات ١٠٠",
      level: "application",
      prompt: "ضَعِ العَدَدَ ٦٥٠ عَلى خَطِّ الأَعدادِ المُتَدَرِّجِ بِمُضاعَفاتِ المِئَة.",
      min: 0, max: 1000, step: 100, labelEvery: 1,
      target: 650
    },
    {
      type: "exclude",
      objective: "3Nn12: يرتّب الأعداد من رقمين وثلاثة أرقام",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَعدادِ لَيسَ بَينَ ٣٠٠ و٤٠٠؟",
      options: ["٣٢٤", "٣٥٠", "٤٥١", "٣٩٩"],
      answer: 2,
      reason: "٤٥١ أَكبَرُ مِن ٤٠٠"
    }
  ],

  "g3m-12-2": [
    {
      type: "compare",
      objective: "3Nn11: يقارن الأعداد من ثلاثة أرقام باستخدام علامتَي «أكبر من» و«أصغر من» ويجد العدد بينها",
      level: "application",
      prompt: "ضَعِ الرَّمزَ المُناسِبَ بَينَ كُلِّ عَدَدَين.",
      pairs: [
        { a: "٣٤٠", b: "٣٦٠" },
        { a: "٥٠٠", b: "٤٩٩" },
        { a: "٧٠٠", b: "٧٠٠" }
      ]
    },
    {
      type: "mcq",
      objective: "3Nn11: يقارن الأعداد من ثلاثة أرقام باستخدام علامتَي «أكبر من» و«أصغر من» ويجد العدد بينها",
      level: "knowledge",
      prompt: "أَيُّ عَدَدٍ يَقَعُ بَينَ ٣٤٠ و٣٦٠؟",
      options: ["٣٣٥", "٣٥٠", "٣٦٥", "٣٠٠"],
      answer: 1
    },
    {
      type: "sequence",
      objective: "3Nn12: يرتّب الأعداد من رقمين وثلاثة أرقام",
      level: "application",
      prompt: "رَتِّبْ هذِهِ الأَعدادَ مِنَ الأَكبَرِ إلى الأَصغَر.",
      steps: ["٦٥٠", "٥٢٠", "٣١٠", "٢٠٥"]
    },
    {
      type: "true-false",
      objective: "3Nn11: يقارن الأعداد من ثلاثة أرقام باستخدام علامتَي «أكبر من» و«أصغر من» ويجد العدد بينها",
      level: "knowledge",
      statement: "العَدَدُ ٥٠٠ أَكبَرُ مِنَ العَدَدِ ٤٩٩.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Ps9: يشرح شفهيًّا طريقة الحل ويفسر سبب اختيارها، بما في ذلك الأفكار المبدئية حول الإجابات المحتملة لمشكلة ما",
      level: "reasoning",
      prompt: "أَكمِلِ الحَلّ.",
      text: "عَدَدٌ بَينَ ٢٠٠ و٣٠٠، رَقمُ آحادِهِ ٥، ورَقمُ عَشَراتِهِ ٩. هذا العَدَدُ = {}",
      answers: ["٢٩٥"],
      distractors: ["٢٥٩", "٢٩٠"]
    },
    {
      type: "memory",
      objective: "3Nn11: يقارن الأعداد من ثلاثة أرقام باستخدام علامتَي «أكبر من» و«أصغر من» ويجد العدد بينها",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ مُقارَنَةٍ بِصِحَّتِها.",
      pairs: [
        { a: "٣٤٠ < ٣٦٠", b: "صَحيح" },
        { a: "٥٠٠ > ٦٠٠", b: "خَطَأ" },
        { a: "٧٠٠ = ٧٠٠", b: "صَحيح" },
        { a: "٢٥ < ٢٥٠", b: "صَحيح" }
      ]
    }
  ],

  "g3m-12-3": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nn7: يضرب الأعداد من رقمين × ١٠ ويفهم التأثير الناجم عن ذلك",
      level: "application",
      prompt: "كُلُّ عُلبَةٍ فيها ١٠ أَقلام. لَدى المَتجَرِ ٣٨ عُلبَة. أَكمِلِ المُعادَلة.",
      tokens: ["٣٨", "×", "١٠", "=", "__"],
      bank: ["٣٨٠", "٣٨", "٣٨٠٠", "٤٨٠"],
      answers: ["٣٨٠"]
    },
    {
      type: "mcq",
      objective: "3Nn7: يضرب الأعداد من رقمين × ١٠ ويفهم التأثير الناجم عن ذلك",
      level: "knowledge",
      prompt: "ما ناتِجُ ٢٤ × ١٠؟",
      options: ["٢٤٠", "٢٤", "٢٤٠٠", "٣٤٠"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Nn7: يضرب الأعداد من رقمين × ١٠ ويفهم التأثير الناجم عن ذلك",
      level: "knowledge",
      statement: "عِندَ ضَربِ أَيِّ عَدَدٍ في ١٠، تَتَحَرَّكُ كُلُّ رَقمٍ مَنزِلَةً واحِدَةً إلى اليَسارِ وتُضافُ صِفرٌ إلى اليَمين.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt1: يختار الإستراتيجيات الذهنية الملائمة لإجراء العمليات الحسابات",
      level: "application",
      prompt: "يَستَطيعُ ١٠ أَولادٍ الجُلوسَ حَولَ طاوِلَةٍ واحِدَة. أَكمِلِ الحَلّ.",
      text: "عَدَدُ الطّاوِلاتِ اللّازِمَةِ لِـ١٧٠ وَلَداً = {}",
      answers: ["١٧"],
      distractors: ["١٨", "١٦"]
    },
    {
      type: "matching",
      objective: "3Nn7: يضرب الأعداد من رقمين × ١٠ ويفهم التأثير الناجم عن ذلك",
      level: "reasoning",
      prompt: "صِلْ كُلَّ عَمَليَّةِ ضَربٍ في ١٠ بِناتِجِها — لاحِظِ النَّمَط.",
      pairs: [
        { a: "١٨×١٠", b: "١٨٠" },
        { a: "٣٩×١٠", b: "٣٩٠" },
        { a: "٧×١٠", b: "٧٠" },
        { a: "٥٠×١٠", b: "٥٠٠" }
      ]
    },
    {
      type: "exclude",
      objective: "3Nn7: يضرب الأعداد من رقمين × ١٠ ويفهم التأثير الناجم عن ذلك",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ النَّواتِجِ خَطَأٌ لِعَمَليَّةِ ضَربٍ في ١٠؟",
      options: ["٢٠×١٠=٢٠٠", "١٥×١٠=١٥٠", "٩×١٠=٩٠", "٧×١٠=٧٧"],
      answer: 3,
      reason: "الصَّوابُ ٧×١٠=٧٠"
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٣: التقدير والتقريب ═══ */

  "g3m-13-1": [
    {
      type: "number-line",
      mode: "round",
      objective: "3Nn8: يقرّب الأعداد المكونة من رقمين إلى أقرب ١٠ والأعداد المكونة من ثلاثة أرقام إلى أقرب ١٠٠",
      level: "application",
      prompt: "قَرِّبِ العَدَدَ ٤٧ إلى أَقرَبِ عَشَرَة.",
      min: 0, max: 100, step: 10, labelEvery: 1,
      target: 47, roundTo: 10
    },
    {
      type: "mcq",
      objective: "3Nn8: يقرّب الأعداد المكونة من رقمين إلى أقرب ١٠ والأعداد المكونة من ثلاثة أرقام إلى أقرب ١٠٠",
      level: "knowledge",
      prompt: "قَرِّبِ العَدَدَ ٦٧٨ إلى أَقرَبِ مِئَة.",
      options: ["٦٠٠", "٧٠٠", "٦٨٠", "٥٠٠"],
      answer: 1
    },
    {
      type: "fill-blank",
      objective: "3Nn8: يقرّب الأعداد المكونة من رقمين إلى أقرب ١٠ والأعداد المكونة من ثلاثة أرقام إلى أقرب ١٠٠",
      level: "application",
      prompt: "أَكمِلِ التَّقريب.",
      text: "قَرِّبْ ٤٥ إلى أَقرَبِ عَشَرَة = {} ، وقَرِّبْ ٦٥٢ إلى أَقرَبِ مِئَة = {}",
      answers: ["٥٠", "٧٠٠"],
      distractors: ["٤٠", "٦٠٠"]
    },
    {
      type: "true-false",
      objective: "3Nn8: يقرّب الأعداد المكونة من رقمين إلى أقرب ١٠ والأعداد المكونة من ثلاثة أرقام إلى أقرب ١٠٠",
      level: "knowledge",
      statement: "عِندَ التَّقريبِ، إذا كانَ رَقمُ الآحادِ ٥ فَأَكثَر نُقَرِّبُ لِأَعلى.",
      answer: true
    },
    {
      type: "classify",
      objective: "3Nn8: يقرّب الأعداد المكونة من رقمين إلى أقرب ١٠ والأعداد المكونة من ثلاثة أرقام إلى أقرب ١٠٠",
      level: "reasoning",
      prompt: "صَنِّفِ الأَعدادَ حَسَبَ اتِّجاهِ التَّقريبِ لِأَقرَبِ عَشَرَة.",
      groups: [
        { name: "يُقَرَّبُ لِأَسفَل", items: ["٢٣", "٤١"] },
        { name: "يُقَرَّبُ لِأَعلى", items: ["٢٧", "٤٨"] }
      ]
    },
    {
      type: "exclude",
      objective: "3Nn8: يقرّب الأعداد المكونة من رقمين إلى أقرب ١٠ والأعداد المكونة من ثلاثة أرقام إلى أقرب ١٠٠",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَعدادِ لا يُقَرَّبُ إلى ٥٠ عِندَ التَّقريبِ لِأَقرَبِ عَشَرَة؟",
      options: ["٤٤", "٤٦", "٤٧", "٤٥"],
      answer: 0,
      reason: "٤٤ يُقَرَّبُ إلى ٤٠ لا ٥٠"
    }
  ],

  "g3m-13-2": [
    {
      type: "mcq",
      objective: "3Pt11: يعطي تقديرات معقولة للإجابة عن إحدى العمليات الحسابية. مثلًا: يستخدم التقريب",
      level: "knowledge",
      prompt: "أَيُّ تَقديرٍ مَعقولٍ لِعَدَدِ التَّلاميذِ في مَدرَسَةٍ مُتَوَسِّطَةِ الحَجم؟",
      options: ["٥٠٠", "٥", "٥٠٠٠٠", "٥٠٠٠٠٠"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Pt11: يعطي تقديرات معقولة للإجابة عن إحدى العمليات الحسابية. مثلًا: يستخدم التقريب",
      level: "knowledge",
      statement: "التَّقديرُ المَعقولُ لِطولِ قَلَمِ الرَّصاصِ هُوَ ١٥ سَنتيمِتراً تَقريباً.",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt11: يعطي تقديرات معقولة للإجابة عن إحدى العمليات الحسابية. مثلًا: يستخدم التقريب",
      level: "application",
      prompt: "أَكمِلِ التَّقدير.",
      text: "إذا كانَ الإناءُ المُمتَلِئُ يَحتَوي عَلى ٥٠٠ كُرَة، فَإنَّ الإناءَ نِصفَ المُمتَلِئ يَحتَوي تَقريباً عَلى {} كُرَة",
      answers: ["٢٥٠"],
      distractors: ["١٥٠", "٣٥٠"]
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Pt10: يقدّر ويقرّب عند القيام بالعمليات الحسابية، ويتحقق من صحة عمله",
      level: "application",
      prompt: "قَدِّرْ ناتِجَ ٤٨ + ٣١ بِالتَّقريبِ لِأَقرَبِ عَشَرَة، ثُمَّ أَكمِلِ المُعادَلة.",
      tokens: ["٥٠", "+", "٣٠", "=", "__"],
      bank: ["٨٠", "٧٠", "٩٠", "٦٠"],
      answers: ["٨٠"]
    },
    {
      type: "sequence",
      objective: "3Pt10: يقدّر ويقرّب عند القيام بالعمليات الحسابية، ويتحقق من صحة عمله",
      level: "reasoning",
      prompt: "رَتِّبْ هذِهِ المَجموعاتِ مِنَ الأَصغَرِ تَقديراً إلى الأَكبَر.",
      steps: ["١٠+١٠", "٤٠+٤٠", "٧٠+٧٠"]
    },
    {
      type: "memory",
      objective: "3Pt11: يعطي تقديرات معقولة للإجابة عن إحدى العمليات الحسابية. مثلًا: يستخدم التقريب",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ شَيءٍ بِتَقديرِهِ المَعقول.",
      pairs: [
        { a: "طولُ قَلَمِ رَصاص", b: "١٥ سم تَقريباً" },
        { a: "كُتلَةُ تُفّاحَة", b: "١٥٠ غم تَقريباً" },
        { a: "سَعَةُ كوب", b: "٢٥٠ مل تَقريباً" },
        { a: "طولُ سَيّارَة", b: "٤ أَمتار تَقريباً" }
      ]
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٤: الضعف والنصف ═══ */

  "g3m-14-1": [
    {
      type: "fill-blank",
      objective: "3Nc19: يفهم العلاقة بين الضعف والنصف",
      level: "knowledge",
      prompt: "حُلَّ اللُّغزَ.",
      text: "نِصفي العَدَدُ ٥، وضِعفي العَدَدُ ٢٠. أَنا العَدَدُ {}",
      answers: ["١٠"],
      distractors: ["٢٠", "٥"]
    },
    {
      type: "mcq",
      objective: "3Nc6: يحسب سريعًا ضعف الأعداد من ١ إلى ٢٠ ويستنتج أنصافها",
      level: "knowledge",
      prompt: "ما ضِعفُ العَدَدِ ٣٢؟",
      options: ["٦٤", "٦٢", "٣٤", "١٦"],
      answer: 0
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc6: يحسب سريعًا ضعف الأعداد من ١ إلى ٢٠ ويستنتج أنصافها",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["٢٨", "÷", "٢", "=", "__"],
      bank: ["١٤", "١٦", "١٢", "٢٤"],
      answers: ["١٤"]
    },
    {
      type: "true-false",
      objective: "3Nc7: يحسب بسرعة ضعف مضاعفات العدد ٥ (أقل من ١٠٠) ويستنتج أنصافها",
      level: "application",
      statement: "ضِعفُ العَدَدِ ٤٥ هُوَ ٩٠.",
      answer: true
    },
    {
      type: "matching",
      objective: "3Ps8: يستقصي عن إحدى العبارات العامة البسيطة عن طريق إيجاد الأمثلة التي تثبت هذه العبارة أو تنفيها",
      level: "reasoning",
      prompt: "صِلْ كُلَّ لُغزٍ بِالعَدَدِ الَّذي يَصِفُه.",
      pairs: [
        { a: "نِصفي ٢٠، ضِعفي ٨٠", b: "٤٠" },
        { a: "نِصفي ١، ضِعفي ٤", b: "٢" },
        { a: "نِصفي ١٨، ضِعفي ٧٢", b: "٣٦" },
        { a: "نِصفي ٨، ضِعفي ٣٢", b: "١٦" }
      ]
    },
    {
      type: "exclude",
      objective: "3Nc7: يحسب بسرعة ضعف مضاعفات العدد ٥ (أقل من ١٠٠) ويستنتج أنصافها",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الأَزواجِ (عَدَد، ضِعفُه) خَطَأ؟",
      options: ["١٥ و٣٠", "٩ و١٨", "٢٠ و٤٥", "٦ و١٢"],
      answer: 2,
      reason: "ضِعفُ ٢٠ هُوَ ٤٠ لا ٤٥"
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٥: الجمع والطرح ═══ */

  "g3m-15-1": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc17: يجمع / يطرح الأعداد المؤلّفة من رقم واحد إلى / من الأعداد المكوّنة من ثلاثة أرقام",
      level: "knowledge",
      prompt: "أَكمِلِ المُعادَلة: طوبَتانِ مُتَجاوِرَتانِ ٦ و٤.",
      tokens: ["٦", "+", "٤", "=", "__"],
      bank: ["١٠", "٢٤", "٢", "١١"],
      answers: ["١٠"]
    },
    {
      type: "mcq",
      objective: "3Nc14: يجمع ويطرح الأزواج العددية المكوّنة من رقمين",
      level: "knowledge",
      prompt: "إذا كانَتِ الطّوبَتانِ المُتَجاوِرَتانِ ٤ و٦، فَما العَدَدُ في الطّوبَةِ الأَعلى؟",
      options: ["١٠", "٢", "٢٤", "٦"],
      answer: 0
    },
    {
      type: "fill-blank",
      objective: "3Nc14: يجمع ويطرح الأزواج العددية المكوّنة من رقمين",
      level: "application",
      prompt: "أَكمِلْ جَمعَ الطّوباتِ المُتَجاوِرَة.",
      text: "٢ + ٤ = {} ، و٤ + ٦ = {}",
      answers: ["٦", "١٠"],
      distractors: ["٨", "١٢"]
    },
    {
      type: "true-false",
      objective: "3Ps8: يستقصي عن إحدى العبارات العامة البسيطة عن طريق إيجاد الأمثلة التي تثبت هذه العبارة أو تنفيها",
      level: "application",
      statement: "لِبِناءِ طوبَةِ الأَعلى في الجِدارِ، نَجمَعُ العَدَدَينِ المُتَجاوِرَينِ أَسفَلَها.",
      answer: true
    },
    {
      type: "sequence",
      objective: "3Ps8: يستقصي عن إحدى العبارات العامة البسيطة عن طريق إيجاد الأمثلة التي تثبت هذه العبارة أو تنفيها",
      level: "reasoning",
      prompt: "رَتِّبْ نَواتِجَ الجَمعِ التّاليَةَ مِنَ الأَصغَرِ إلى الأَكبَر.",
      steps: ["٦+٥", "٧+٦", "٥+٩", "٨+٩"]
    },
    {
      type: "exclude",
      objective: "3Nc14: يجمع ويطرح الأزواج العددية المكوّنة من رقمين",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الجُمَلِ الجَمعيَّةِ ناتِجُها لَيسَ ١٥؟",
      options: ["٩+٦", "٧+٨", "٥+١٠", "٦+٨"],
      answer: 3,
      reason: "٦+٨=١٤ لا ١٥"
    }
  ],

  "g3m-15-2": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Pt5: يتحقق من ناتج عملية الطرح من خلال جمع الإجابة إلى أصغر عدد في العملية الحسابية الأصلية",
      level: "application",
      prompt: "طولُ حَبلٍ ١٢٦ م وآخَرَ ٤٢ م. أَكمِلِ المُعادَلةَ لِتَجِدَ الفَرقَ بَينَهُما.",
      tokens: ["١٢٦", "-", "٤٢", "=", "__"],
      bank: ["٨٤", "٨٦", "٨٠", "٩٤"],
      answers: ["٨٤"]
    },
    {
      type: "mcq",
      objective: "3Nc14: يجمع ويطرح الأزواج العددية المكوّنة من رقمين",
      level: "knowledge",
      prompt: "ناتِجُ ٥٨ - ٤٢ = ؟",
      options: ["١٦", "١٨", "٢٦", "١٠"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Nc17: يجمع / يطرح الأعداد المؤلّفة من رقم واحد إلى / من الأعداد المكوّنة من ثلاثة أرقام",
      level: "knowledge",
      statement: "١٣٣ - ٧ = ١٢٦",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt5: يتحقق من ناتج عملية الطرح من خلال جمع الإجابة إلى أصغر عدد في العملية الحسابية الأصلية",
      level: "application",
      prompt: "لِقياسِ مَسافَةٍ طولُها ٦٨ م باستِخدامِ حَبلَينِ مِن أَطوالِ (٧، ٩، ٤٢، ٥٨، ١٢٦، ١٣٣)، نَستَخدِمُ حَبلَ ١٢٦م. أَكمِلِ المُعادَلة.",
      text: "١٢٦ - {} = ٦٨",
      answers: ["٥٨"],
      distractors: ["٤٢", "٩"]
    },
    {
      type: "classify",
      objective: "3Pt5: يتحقق من ناتج عملية الطرح من خلال جمع الإجابة إلى أصغر عدد في العملية الحسابية الأصلية",
      level: "reasoning",
      prompt: "صَنِّفْ عَمَليّاتِ الطَّرحِ حَسَبَ ناتِجِها.",
      groups: [
        { name: "الفَرقُ أَكبَرُ مِن ٥٠", items: ["١٣٣-٧", "١٢٦-٤٢"] },
        { name: "الفَرقُ ٥٠ أَو أَقَلّ", items: ["٥٨-٤٢", "٤٢-٩"] }
      ]
    },
    {
      type: "memory",
      objective: "3Pt5: يتحقق من ناتج عملية الطرح من خلال جمع الإجابة إلى أصغر عدد في العملية الحسابية الأصلية",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ عَمَليَّةِ طَرحٍ بِناتِجِها.",
      pairs: [
        { a: "١٣٣-٧", b: "١٢٦" },
        { a: "٥٨-٤٢", b: "١٦" },
        { a: "١٢٦-٤٢", b: "٨٤" },
        { a: "٤٢-٩", b: "٣٣" }
      ]
    }
  ],

  "g3m-15-3": [
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc17: يجمع / يطرح الأعداد المؤلّفة من رقم واحد إلى / من الأعداد المكوّنة من ثلاثة أرقام",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["٤٥٦", "+", "٢٣٤", "=", "__"],
      bank: ["٦٩٠", "٦٨٠", "٦٩٩", "٧٠٠"],
      answers: ["٦٩٠"]
    },
    {
      type: "mcq",
      objective: "3Nc17: يجمع / يطرح الأعداد المؤلّفة من رقم واحد إلى / من الأعداد المكوّنة من ثلاثة أرقام",
      level: "knowledge",
      prompt: "ناتِجُ ٦٧٨ - ٢٣٤ = ؟",
      options: ["٤٤٤", "٤٣٤", "٤٥٤", "٤٤٠"],
      answer: 0
    },
    {
      type: "true-false",
      objective: "3Nc15: يجمع عددًا مكوّنًا من ثلاثة أرقام مع عدد مكوّن من رقمين مستخدمًا الملاحظات لتيسير احتساب الناتج",
      level: "knowledge",
      statement: "٣٠٠ + ٢٥٠ = ٥٥٠",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Pt4: يتحقق من نتائج جمع عددين باستخدام الطرح، وجمع عدة أعداد من خلال إعادة ترتيب جمع الأعداد",
      level: "application",
      prompt: "تَحَقَّقْ مِن ٥٦٠ - ١٢٠ = ٤٤٠ بِالجَمع.",
      text: "٤٤٠ + {} = {}",
      answers: ["١٢٠", "٥٦٠"],
      distractors: ["١١٠", "٥٥٠"]
    },
    {
      type: "sequence",
      objective: "3Pt4: يتحقق من نتائج جمع عددين باستخدام الطرح، وجمع عدة أعداد من خلال إعادة ترتيب جمع الأعداد",
      level: "reasoning",
      prompt: "رَتِّبْ نَواتِجَ الجَمعِ التّاليَةَ مِنَ الأَصغَرِ إلى الأَكبَر.",
      steps: ["٢٢٠+١٥٠", "١٩٠+١٩٠", "٣٤٥+١١٠", "٥٠٠+٤٠"]
    },
    {
      type: "exclude",
      objective: "3Nc17: يجمع / يطرح الأعداد المؤلّفة من رقم واحد إلى / من الأعداد المكوّنة من ثلاثة أرقام",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ العَمَليّاتِ ناتِجُها خَطَأ؟",
      options: ["٣٠٠+٢٠٠=٥٠٠", "٤٥٠-١٥٠=٣٠٠", "٢٣٤+١١=٢٤٥", "٥٠٠-١٠٠=٣٥٠"],
      answer: 3,
      reason: "الصَّوابُ ٥٠٠-١٠٠=٤٠٠"
    }
  ],

  /* ═══ الوحدة ٢أ · الفصل ١٦: المزيد من المضاعفات ═══ */

  "g3m-16-1": [
    {
      type: "array",
      mode: "build",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "application",
      prompt: "ابْنِ مَصفوفَةً فيها ٣ صُفوف، في كُلِّ صَفٍّ ٥ مُرَبَّعات.",
      rows: 3, cols: 5,
      answerSentence: "٣ × ٥ = ١٥"
    },
    {
      type: "mcq",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "ما ناتِجُ ٥ × ٧؟",
      options: ["٣٥", "٣٠", "٢٥", "٤٠"],
      answer: 0
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["١٠", "×", "٦", "=", "__"],
      bank: ["٦٠", "١٦", "٦٦", "٥٠"],
      answers: ["٦٠"]
    },
    {
      type: "true-false",
      objective: "3Nc26: يفهم العلاقات بين عمليتي الضرب والقسمة ويكتب الحقائق ذات الصلة بهما",
      level: "knowledge",
      statement: "إذا كانَ ٥ × ٨ = ٤٠، فَإنَّ ٤٠ ÷ ٥ = ٨.",
      answer: true
    },
    {
      type: "matching",
      objective: "3Nc26: يفهم العلاقات بين عمليتي الضرب والقسمة ويكتب الحقائق ذات الصلة بهما",
      level: "reasoning",
      prompt: "صِلْ كُلَّ حَقيقَةِ ضَربٍ بِحَقيقَةِ القِسمَةِ المُرتَبِطَةِ بِها.",
      pairs: [
        { a: "٥×٦=٣٠", b: "٣٠÷٥=٦" },
        { a: "١٠×٤=٤٠", b: "٤٠÷١٠=٤" },
        { a: "٥×٩=٤٥", b: "٤٥÷٥=٩" },
        { a: "١٠×٧=٧٠", b: "٧٠÷١٠=٧" }
      ]
    },
    {
      type: "exclude",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الحَقائِقِ خَطَأ؟",
      options: ["٥×٣=١٥", "١٠×٥=٥٠", "٥×٦=٣٥", "١٠×٩=٩٠"],
      answer: 2,
      reason: "الصَّوابُ ٥×٦=٣٠"
    }
  ],

  "g3m-16-2": [
    {
      type: "array",
      mode: "build",
      objective: "3Nc21: يضرب الأعداد المكونة من رقم واحد ويقسم الأعداد المكونة من رقمين على / بـ ٢ و٣ و٤ و٥ و٦ و٩ و١٠",
      level: "application",
      prompt: "ابْنِ مَصفوفَةً فيها ٢ صَفّ، في كُلِّ صَفٍّ ٦ مُرَبَّعات.",
      rows: 2, cols: 6,
      answerSentence: "٢ × ٦ = ١٢"
    },
    {
      type: "mcq",
      objective: "3Nc21: يضرب الأعداد المكونة من رقم واحد ويقسم الأعداد المكونة من رقمين على / بـ ٢ و٣ و٤ و٥ و٦ و٩ و١٠",
      level: "knowledge",
      prompt: "ناتِجُ ٤ × ٧ = ؟",
      options: ["٢٨", "٢٤", "٣٢", "٢١"],
      answer: 0
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc21: يضرب الأعداد المكونة من رقم واحد ويقسم الأعداد المكونة من رقمين على / بـ ٢ و٣ و٤ و٥ و٦ و٩ و١٠",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["٤", "×", "٦", "=", "__"],
      bank: ["٢٤", "٢٠", "٢٨", "١٦"],
      answers: ["٢٤"]
    },
    {
      type: "true-false",
      objective: "3Nc21: يضرب الأعداد المكونة من رقم واحد ويقسم الأعداد المكونة من رقمين على / بـ ٢ و٣ و٤ و٥ و٦ و٩ و١٠",
      level: "knowledge",
      statement: "٢ × ٩ = ١٨",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Nc26: يفهم العلاقات بين عمليتي الضرب والقسمة ويكتب الحقائق ذات الصلة بهما",
      level: "reasoning",
      prompt: "أَكمِلِ الحَلّ.",
      text: "إذا كانَت ٤ × ٥ = ٢٠، فَإنَّ ٢٠ ÷ ٤ = {} ، و٢٠ ÷ ٥ = {}",
      answers: ["٥", "٤"],
      distractors: ["٢٠", "١"]
    },
    {
      type: "memory",
      objective: "3Nc21: يضرب الأعداد المكونة من رقم واحد ويقسم الأعداد المكونة من رقمين على / بـ ٢ و٣ و٤ و٥ و٦ و٩ و١٠",
      level: "knowledge",
      prompt: "اِقلِبْ بِطاقَتَينِ في كُلِّ دَورٍ: طابِقْ كُلَّ عَمَليَّةِ ضَربٍ بِناتِجِها.",
      pairs: [
        { a: "٢×٧", b: "١٤" },
        { a: "٤×٥", b: "٢٠" },
        { a: "٢×٩", b: "١٨" },
        { a: "٤×٨", b: "٣٢" }
      ]
    }
  ],

  "g3m-16-3": [
    {
      type: "array",
      mode: "build",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "application",
      prompt: "ابْنِ مَصفوفَةً فيها ٣ صُفوف، في كُلِّ صَفٍّ ٦ مُرَبَّعات.",
      rows: 3, cols: 6,
      answerSentence: "٣ × ٦ = ١٨"
    },
    {
      type: "mcq",
      objective: "3Pt6: يتحقّق من ناتج ضرب عددين من خلال عكس الترتيب، فمثلًا ناتج ٦ × ٤ = ٢٤، وبالمثل كذلك ٤ × ٦",
      level: "knowledge",
      prompt: "ناتِجُ ٦ × ٤ = ؟",
      options: ["٢٤", "٢٨", "٢٠", "٣٠"],
      answer: 0
    },
    {
      type: "equation-builder",
      mode: "fill",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "application",
      prompt: "أَكمِلِ المُعادَلة.",
      tokens: ["٩", "×", "٣", "=", "__"],
      bank: ["٢٧", "٢٤", "٣٦", "٢١"],
      answers: ["٢٧"]
    },
    {
      type: "true-false",
      objective: "3Pt6: يتحقّق من ناتج ضرب عددين من خلال عكس الترتيب، فمثلًا ناتج ٦ × ٤ = ٢٤، وبالمثل كذلك ٤ × ٦",
      level: "knowledge",
      statement: "٦ × ٤ = ٤ × ٦",
      answer: true
    },
    {
      type: "fill-blank",
      objective: "3Nc24: يفهم أنه قد يوجد عدد متبقٍّ من ناتج عملية القسمة (ما يُمكن تسميته بالباقي)",
      level: "reasoning",
      prompt: "أَكمِلِ الحَلّ.",
      text: "عِندَ قِسمَةِ ١٤ عَلى ٣، النّاتِجُ = {} والباقي = {}",
      answers: ["٤", "٢"],
      distractors: ["٥", "١"]
    },
    {
      type: "exclude",
      objective: "3Nc3: يعرف حقائق الضرب والقسمة لجداول ضرب الأعداد ٢ و٣ و٥ و١٠",
      level: "knowledge",
      prompt: "أَيُّ هذِهِ الحَقائِقِ خَطَأ؟",
      options: ["٩×٢=١٨", "٦×٥=٣٠", "٣×٧=٢٤", "٩×٤=٣٦"],
      answer: 2,
      reason: "الصَّوابُ ٣×٧=٢١"
    }
  ],

  // اللغة العربية (أحب لغتي)/الرابع — درس المراجعة: مها والعصافير (ص ١٦-٢٢)
  "g4a1-0-1": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "فهم أحداث القصة والإجابة عن أسئلة تفصيلية عنها",
      level: "knowledge",
      prompt: "لماذا لم تذهب مها إلى المدرسة كما ظنَّت العصافير؟",
      options: ["لأنّها في عُطلة", "لأنّها مريضة", "لأنّها تأخّرت عن الحافلة", "لأنّها نسيت حقيبتها"],
      answer: 0
    },

    // ⑥ الترتيب التسلسلي — استدلال
    {
      type: "sequence",
      objective: "ترتيب أحداث القصة حسب تسلسلها الزمني",
      level: "reasoning",
      prompt: "رتّب أحداث القصة حسب حدوثها.",
      steps: [
        "أشرقت الشمس وحطّت العصافير الثلاثة على حافة الشُّبّاك",
        "صاح العصفور الأول بدهشة: مها ما زالت نائمة",
        "قال العصفوران الثاني والثالث: يجب أن نحاول إيقاظها",
        "غرَّدت العصافير الثلاثة، لكنّ مها ظلّت نائمة",
        "استيقظت مها وضحكت، وأخبرتهم أنّها في عُطلة"
      ]
    },

    /* ⑧ ملء الفراغ بالسحب — تطبيق (كان معرفةً: استرجاعَ «أشرقَتِ/حَطَّتْ»، وهما
       مُعادانِ حرفياً في الخطوة ١ من سؤال الترتيب أعلاه. صارَ نقلاً للفعلَين إلى
       مشهدٍ جديد — مُخرَج ٦. والفاعلُ بعدَ كلِّ فراغٍ يحسمُ فعلَه: الشمسُ تُشرقُ
       والفراشاتُ تَحُطُّ، فلا يصلحُ العكس.) */
    {
      type: "fill-blank",
      objective: "يوظّف مفردات النصّ وتراكيبه في جملة من إنشائه",
      level: "application",
      prompt: "وَظِّفْ فِعْلَيْنِ مِنَ النَّصِّ لِوَصْفِ صَباحٍ في حَديقَةٍ.",
      text: "لَمَّا {} الشَّمسُ، {} الفَراشاتُ على الأَزْهارِ.",
      answers: ["أشرقَتِ", "حَطَّتِ"],
      distractors: ["غرَبَتِ", "طارَتْ"]
    },

    // ⑦ التصنيف في مجموعات — تطبيق
    {
      type: "classify",
      objective: "تمييز الاسم والفعل والحرف داخل نص مقروء",
      level: "application",
      prompt: "أعود إلى النص، وأصنّف الكلمات الآتية إلى اسم أو فعل أو حرف.",
      groups: [
        { name: "أفعال", items: ["حَطَّتْ"] },
        { name: "حروف",  items: ["على"] },
        { name: "أسماء", items: ["عصافير", "شُبّاك"] }
      ]
    },

    /* ㊱ الحكم والتعليل — تقويم (حلَّ محلَّ «صواب وخطأ» الذي كان ينفي وصفَ العصافير
       بـ٥٠٪ تخمين). وهو **جوهرُ القصّة**: تمييزُ الحقيقةِ من الانطباعِ الأوّلِ الخاطئ —
       فاستحقَّ حكماً مُعلَّلاً لا نفياً. الهدفُ الملغى مغطّىً هنا وأتمّ. */
    {
      type: "judge-reason",
      objective: "يُصدر حكماً مُعلَّلاً على وصف العصافير لمها مستنداً إلى النصّ",
      level: "evaluation",
      prompt: "هَلْ كانَ حُكْمُ العَصافيرِ على مَها مُنْصِفاً؟",
      options: ["نَعَمْ", "لا"],
      answer: 1,
      reasons: [
        "لِأَنَّها كانَتْ في عُطْلَةٍ، وَلَمْ تَتَكاسَلْ عَنِ المَدْرَسَةِ",
        "لِأَنَّ العَصافيرَ غَرَّدَتْ لِتوقِظَها",
        "لِأَنَّ العُطْلَةَ كانَتْ يَوْماً واحِداً فَقَطْ"
      ],
      reasonAnswer: 0
    },

    // ⑩ ترتيب الحروف — إثرائي (نوع خاص باللغة العربية)
    {
      type: "arrange",
      objective: "ترسيخ إملاء مفردات القصة (نشاط إثرائي)",
      level: "knowledge",
      prompt: "رتّب الحروف لتكوين كلمة من القصة.",
      word: "عصافير"
    }

  ],

  // ═══════════════════════════════════════════════════════════════════
  // اللغة العربية (أحب لغتي — الجزء الأول)/الرابع — المحور الأول: في رُبوع وطني
  // المصدر: كتاب-التلميذ-ج1.pdf (صفحة الكتاب = صفحة PDF − ٢)
  // الأهداف: مُخرَجات المحور الأول (ص ٢٥) + أنشطة كل درس
  // التوزيع المعرفي المعتمد للغة العربية (CLAUDE.md §المستوى المعرفي):
  //   1 knowledge + 1 reasoning + 2 application + 1 evaluation + إثرائيّ اختياريّ
  // ⚠️ دروس هذا المحور أُلِّفت قبل اعتماد السُّلَّم الرباعيّ، فهي على النسبة القديمة
  //    (٣ معرفة + ١ تطبيق + ١ استدلال) وتُوائَم في مهمة مستقلة — **إلا g4a1-1-1
  //    فقد وُوئم** (١ معرفة + ٢ تطبيق + ١ استدلال + ١ تقويم). وكلّها دروسُ قراءةٍ
  //    وفهمٍ فيلزمُها التوزيع؛ ولا درسَ لغويّاً/إملائياً في المحور.
  //    أمّا التأليف الجديد في اللغة العربية فيلتزم التوزيع أعلاه.
  // ═══════════════════════════════════════════════════════════════════

  // الاستماع: أجمل مكان في الدنيا (ص ٢٦-٢٧)
  // ⚠️ نصّ الاستماع يقرؤه المعلّم من دليل المعلم (غير متوفّر في المصادر)، والأسئلة
  // أدناه ملتزمة حرفياً بما تكشفه أسئلة كتاب التلميذ نفسها بلا تفاصيل مُخترَعة.
  "g4a1-1-1": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "يتعرّف شخصيات نصّ الاستماع وأحداثه",
      level: "knowledge",
      prompt: "مَنْ طَلَبَ مِنَ النَّسْرِ أَنْ يَبْحَثَ عَنْ أَجْمَلِ مَكانٍ في الدُّنْيا؟",
      options: ["المَلِكُ", "الصَّيّادُ", "الرّاعي", "التّاجِرُ"],
      answer: 0
    },

    // ⑥ الترتيب التسلسلي — استدلال
    {
      type: "sequence",
      objective: "يتعرّف أحداث النصّ ويرتّبها",
      level: "reasoning",
      prompt: "رَتِّبْ أَحْداثَ القِصَّةِ حَسَبَ حُدوثِها.",
      steps: [
        "طَلَبَ المَلِكُ مِنَ النَّسْرِ أَنْ يَبْحَثَ عَنْ أَجْمَلِ مَكانٍ في الدُّنْيا",
        "طارَ النَّسْرُ وَمَرَّ بِأَماكِنَ كَثيرَةٍ",
        "نَزَلَ في مَكانٍ فَاحْتَضَنَ صَخْرَتَهُ وَاسْتَنْشَقَ هَواءَهُ",
        "تَعَجَّبَ المَلِكُ مِنَ المَكانِ الَّذي نَزَلَ فيهِ",
        "أَجابَ النَّسْرُ: أَجْمَلُ مَكانٍ في الدُّنْيا هُوَ الوَطَنُ"
      ]
    },

    /* ⑧ ملء الفراغ بالسحب — تطبيق (كان معرفةً: استرجاعَ «الصَّخْرَةَ/الهَواءَ»، وهما
       مُعادانِ حرفياً في الخطوة ٣ من سؤال الترتيب أعلاه. أُعيدت صياغتُه إلى **توظيفِ
       فِعْلَي النصِّ في موقفٍ جديد** — مُخرَج ٦ «يوظّف المفردات والتراكيب في جُمَلٍ من
       إنشائه» — فصارَ نقلاً للمفردةِ لا استرجاعاً لها. فراغان فقط (قيد السعة). */
    {
      type: "fill-blank",
      objective: "يوظّف مفردات النصّ وتراكيبه في جملة من إنشائه",
      level: "application",
      prompt: "وَظِّفْ فِعْلَيْنِ مِنَ النَّصِّ لِوَصْفِ مُسافِرٍ عادَ إلى وَطَنِهِ.",
      text: "عادَ المُسافِرُ إلى وَطَنِهِ، فَـ{} أَرْضَهُ بِقُوَّةٍ، وَ{} هَواءَهُ بِعُمْقٍ.",
      answers: ["احْتَضَنَ", "اسْتَنْشَقَ"],
      distractors: ["شاهَدَ", "سَمِعَ"]
    },

    // ② توصيل — تطبيق
    {
      type: "matching",
      objective: "يصف النسر بصفاته",
      level: "application",
      prompt: "صِلْ كُلَّ عِبارَةٍ بِالصِّفَةِ الَّتي تَدُلُّ عَلَيْها في النَّسْرِ.",
      pairs: [
        { a: "طارَ فَوْقَ أَماكِنَ كَثيرَةٍ",  b: "قُوَّةٌ وَتَحَمُّلٌ" },
        { a: "نَفَّذَ ما طَلَبَهُ المَلِكُ",   b: "أَمانَةٌ" },
        { a: "اخْتارَ وَطَنَهُ في النِّهايَةِ", b: "وَفاءٌ لِلْوَطَنِ" }
      ]
    },

    /* ㊱ الحكم والتعليل — تقويم (حلَّ محلَّ سؤالِ «صواب وخطأ» المعرفيّ الذي كان يعرضُ
       مغزى النصِّ نفسَه عبارةً صحيحةً فيؤكّدُها الطالبُ بلا تفكير). الهدفُ الملغى
       «يستنتج مغزى النصّ» **مغطّىً هنا وأتمّ**: الحكمُ على جوابِ النَّسرِ هو المغزى نفسُه،
       لكنّه يُطلَبُ مُعلَّلاً لا مؤكَّداً.
       الأسبابُ الثلاثةُ على القالبِ المطلوب: مسنِدٌ من النصّ · صحيحٌ وردَ في النصِّ لكنّه
       لا يُسنِدُ الحكم · لم يردْ أصلاً. وكلُّها متّسقةٌ مع الحكمِ الصحيحِ فلا يُستدَلُّ
       بالإقصاء (شرطُ صياغةِ الأسباب في `نماذج-الأسئلة.md`). */
    {
      type: "judge-reason",
      objective: "يُصدر حكماً مُعلَّلاً على جواب النَّسر مستنداً إلى النصّ",
      level: "evaluation",
      prompt: "هَلْ كانَ جَوابُ النَّسْرِ لِلْمَلِكِ صَواباً؟",
      options: ["نَعَمْ", "لا"],
      answer: 0,
      reasons: [
        "لِأَنَّهُ لَمْ يَحْكُمْ حَتّى طارَ وَمَرَّ بِأَماكِنَ كَثيرَةٍ، ثُمَّ اخْتارَ وَطَنَهُ",
        "لِأَنَّ المَلِكَ هُوَ الَّذي طَلَبَ مِنْهُ البَحْثَ",
        "لِأَنَّ وَطَنَهُ كانَ أَقْرَبَ مَكانٍ إِلَيْهِ"
      ],
      reasonAnswer: 0
    },

    // ⑩ ترتيب الحروف — إثرائي (نوع خاص باللغة العربية)
    {
      type: "arrange",
      objective: "يرسّخ إملاء مفردات نصّ الاستماع",
      level: "knowledge",
      prompt: "رَتِّبِ الحُروفَ لِتَكوينَ كَلِمَةٍ هِيَ مِفْتاحُ القِصَّةِ.",
      word: "الوطن"
    }

  ],

  // مستند بصري: قراءة شعار (ص ٢٨-٣٠) — شعار سلطنة عُمان: خنجر وسيفان ونِطاق
  // الرسم SVG أصليّ (لا نسخ للشعار الرسميّ) بمواصفات الورقة البصرية:
  // حدّ #111111 رفيع (٣ خارجيّ / ٢ داخليّ)، تدرّج ٣-٤ درجات بحواف حادّة،
  // لمعة بيضاء، بلا خطّ أرض ولا ظلّ مُلقًى، وبلا ملامح وجه.
  "g4a1-1-2": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "يقرأ مستنداً بصرياً «شعاراً»",
      level: "knowledge",
      prompt: "ماذا يُسَمّى الشِّعارُ الَّذي يَتَكَوَّنُ مِنْ خِنْجَرٍ وَسَيْفَيْنِ مُتَقاطِعَيْنِ؟",
      options: [
        "شِعارُ سَلْطَنَةِ عُمانَ",
        "شِعارُ المَدْرَسَةِ",
        "شِعارُ النّادي الرِّياضِيِّ",
        "شِعارُ المَكْتَبَةِ"
      ],
      answer: 0
    },

    // ② توصيل — استدلال
    {
      type: "matching",
      objective: "يستنتج ما يرمز إليه كل جزء من الشعار",
      level: "reasoning",
      prompt: "صِلْ كُلَّ جُزْءٍ مِنَ الشِّعارِ بِما يَرْمُزُ إلَيْهِ.",
      pairs: [
        { a: "الخِنْجَرُ",  b: "الأَصالَةُ وَالتُّراثُ" },
        { a: "السَّيْفانِ", b: "القُوَّةُ وَالدِّفاعُ عَنِ الوَطَنِ" },
        { a: "النِّطاقُ",   b: "تَماسُكُ أَبْناءِ الوَطَنِ" }
      ]
    },

    /* ④ صواب وخطأ — تطبيق (كان معرفةً: حقيقةٌ اجتماعيةٌ عن الخِنْجَرِ تُقبَلُ بـ٥٠٪
       تخمين. صارَ **نقلاً لرمزيّةِ الجزءِ إلى موقفٍ جديد**: يوظّفُ الطالبُ ما وصلَه
       في سؤالِ التوصيلِ (النِّطاقُ = تماسُك) في اختيارِ شعارٍ لمدرسة. */
    {
      type: "true-false",
      objective: "يوظّف رمزية أجزاء الشعار في موقف جديد",
      level: "application",
      statement: "لَوْ أَرادَتْ مَدْرَسَةٌ رَمْزاً يَدُلُّ عَلى تَماسُكِ تَلاميذِها، فَالنِّطاقُ أَنْسَبُ مِنَ السَّيْفَيْنِ.",
      answer: true
    },

    // ① سحب وإفلات — تطبيق
    {
      type: "drag-drop",
      objective: "يتعرّف أجزاء شعار السلطنة ويسمّيها",
      level: "application",
      prompt: "اسْحَبِ اسْمَ كُلِّ جُزْءٍ إلى مَوْضِعِهِ في الشِّعارِ.",
      bg: "#fdf9ee",
      svg: SHOOGP_SVG_EMBLEM,
      targets: [
        { answer: "الخِنْجَرُ", box: { x: 50, y: 88 }, dot: { x: 50, y: 46 } },
        { answer: "السَّيْفانِ", box: { x: 18, y: 88 }, dot: { x: 66, y: 72 } },
        { answer: "النِّطاقُ",  box: { x: 82, y: 88 }, dot: { x: 30, y: 63 } }
      ]
    },

    /* ㊱ الحكم والتعليل — تقويم (حلَّ محلَّ سؤالِ «تحديد الأجزاء» الذي كان يطلبُ النقرَ
       على الخِنْجَرِ عندَ `spot {x:50,y:46}` — **وهي نقطةُ الهدفِ نفسُها بالإحداثيّاتِ
       ذاتِها** في سؤالِ السحبِ أعلاه (`dot {x:50,y:46}`)، فكان مُستوعَباً فيه بالكامل
       وحذفُه لا يُنقصُ الدرسَ شيئاً. */
    {
      type: "judge-reason",
      objective: "يُصدر حكماً مُعلَّلاً على ملاءمة رمز في الشعار",
      level: "evaluation",
      prompt: "هَلْ يَصْلُحُ النِّطاقُ رَمْزاً لِتَماسُكِ أَبْناءِ الوَطَنِ؟",
      options: ["نَعَمْ", "لا"],
      answer: 0,
      reasons: [
        "لِأَنَّهُ يَرْبِطُ الخِنْجَرَ وَالسَّيْفَيْنِ مَعاً في شِعارٍ واحِدٍ",
        "لِأَنَّ الخِنْجَرَ جُزْءٌ مِنَ الزِّيِّ العُمانِيِّ التَّقْليدِيِّ",
        "لِأَنَّ النِّطاقَ أَكْبَرُ أَجْزاءِ الشِّعارِ"
      ],
      reasonAnswer: 0
    },

    // ⑨ الاستبعاد — إثرائي — استدلال
    {
      type: "exclude",
      objective: "يميّز ما ينتمي إلى الشعار ممّا لا ينتمي إليه",
      level: "reasoning",
      prompt: "ثَلاثَةٌ مِنْ هذِهِ تَظْهَرُ في شِعارِ السَّلْطَنَةِ وَواحِدٌ دَخيلٌ — اضْغَطْ عَلى الدَّخيلِ.",
      options: ["الخِنْجَرُ", "السَّيْفانِ", "النِّطاقُ", "النَّخْلَةُ"],
      answer: 3,
      reason: "النَّخْلَةُ رَمْزٌ عُمانِيٌّ جَميلٌ، لكِنَّها لا تَظْهَرُ في شِعارِ السَّلْطَنَةِ."
    }

  ],

  // الدرس الأول: مغامرة إلى قرية (الغَمْب) — خالد العنقودي (ص ٣١-٤٨)
  // النمط اللغوي: مكوّنات الجملة الاسمية · النمط الإملائي: همزتا القطع والوصل
  "g4a1-1-3": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "يستخرج معلومات صريحة من النصّ",
      level: "knowledge",
      prompt: "أَيْنَ تَقَعُ قَرْيَةُ (الغَمْبِ) الجَبَلِيَّةُ؟",
      options: ["في نِيابَةِ طيوي", "في وِلايَةِ صورَ", "في نِيابَةِ الحَمْراءِ", "في وِلايَةِ نِزْوى"],
      answer: 0
    },

    // ⑥ الترتيب التسلسلي — استدلال
    {
      type: "sequence",
      objective: "يستنتج تسلسل أحداث المغامرة",
      level: "reasoning",
      prompt: "رَتِّبْ أَحْداثَ المُغامَرَةِ حَسَبَ حُدوثِها.",
      steps: [
        "بَدَأَ صُعودُ الجَبَلِ وَالسّاعَةُ تُشيرُ إلى التّاسِعَةِ صَباحاً",
        "اسْتَراحَ المُغامِرونَ تَحْتَ ظِلِّ سِدْرَةٍ كَبيرَةٍ",
        "انْفَصَلَتْ مَجْموعَةٌ مُسْرِعَةٌ فَضَلَّتِ الطَّريقَ",
        "اشْتَعَلَتِ المَصابيحُ تُنيرُ الطَّريقَ وَسَطَ الظَّلامِ",
        "وَصَلوا قَرْيَةَ (الغَمْبِ) عِنْدَ الثّامِنَةِ مَساءً"
      ]
    },

    /* ④ صواب وخطأ — تطبيق (كان معرفةً: نفيُ حدثٍ يغطّيه سؤالُ الترتيبِ أصلاً، بـ٥٠٪
       تخمين. صارَ **نقلاً لدرسِ النصِّ السببيِّ إلى حالةٍ جديدة**: الإسراعُ والانفصالُ
       عن الرِّفاقِ يؤدّيانِ إلى ضلالِ الطريق. */
    {
      type: "true-false",
      objective: "يوظّف ما استنتجه من أحداث النصّ في موقف مشابه",
      level: "application",
      statement: "لَوْ أَسْرَعَتْ مَجْموعَةٌ في رِحْلَةٍ جَبَلِيَّةٍ وَانْفَصَلَتْ عَنْ رِفاقِها، فَقَدْ تَضِلُّ الطَّريقَ كَما حَدَثَ في النَّصِّ.",
      answer: true
    },

    // ⑦ التصنيف — تطبيق (النمط اللغوي: الجملة الاسمية) — مجموعتان × ٤ عناصر
    {
      type: "classify",
      objective: "يميّز مكوّنات الجملة الاسمية من الجملة الفعلية",
      level: "application",
      prompt: "صَنِّفِ الجُمَلَ المَأْخوذَةَ مِنَ النَّصِّ.",
      groups: [
        { name: "جُمْلَةٌ اسْمِيَّةٌ", items: ["الجِبالُ شاهِقَةٌ", "الطَّبيعَةُ آسِرَةٌ"] },
        { name: "جُمْلَةٌ فِعْلِيَّةٌ", items: ["بَدَأَتْ مُغامَرَتُنا", "أَسْرَعْنا نَحْوَهُمْ"] }
      ]
    },

    /* ㊱ الحكم والتعليل — تقويم (حلَّ محلَّ سؤالِ ملءِ الفراغِ العدديّ «١٧ كم / ١٦٠٠ م»
       الذي كانتِ **الخريطةُ الذهنيةُ الإثرائيةُ تحملُ بياناتِه نفسَها** في الفرعِ
       «المَسافَةُ → ١٧ كم» — بل ومشتّتَه نفسَه «٢٧ كم». فكان أشدَّ أسئلةِ الدرسِ تكراراً. */
    {
      type: "judge-reason",
      objective: "يُصدر حكماً مُعلَّلاً على تصرّف المجموعة في المغامرة",
      level: "evaluation",
      prompt: "هَلْ أَحْسَنَتِ المَجْموعَةُ الَّتي أَسْرَعَتْ وَانْفَصَلَتْ عَنْ رِفاقِها صُنْعاً؟",
      options: ["نَعَمْ", "لا"],
      answer: 1,
      reasons: [
        "لِأَنَّها ضَلَّتِ الطَّريقَ حينَ انْفَصَلَتْ عَنْ رِفاقِها",
        "لِأَنَّ المُغامِرينَ اسْتَراحوا تَحْتَ ظِلِّ سِدْرَةٍ كَبيرَةٍ",
        "لِأَنَّ المَجْموعَةَ لَمْ تَحْمِلْ ماءً كافِياً"
      ],
      reasonAnswer: 0
    },

    // ⑪ الخريطة الذهنية — إثرائي — تطبيق
    {
      type: "mindmap",
      objective: "يلخّص بطاقة المغامرة كما وردت في النصّ",
      level: "application",
      prompt: "أَكْمِلْ بِطاقَةَ المُغامَرَةِ بِسَحْبِ المَعْلومَةِ المُناسِبَةِ إلى كُلِّ فَرْعٍ.",
      center: "مُغامَرَةٌ إلى (الغَمْبِ)",
      branches: [
        { label: "المَكانُ",  answer: "نِيابَةُ طيوي" },
        { label: "المَسافَةُ", answer: "١٧ كم" },
        { label: "الوَقْتُ",  answer: "٨-٩ ساعاتٍ" },
        { label: "المَسارُ",  answer: "صَعْبٌ" }
      ],
      distractors: ["٢٧ كم", "سَهْلٌ"]
    }

  ],

  // الدرس الثاني: خُبز ولَبَن — محمود الرحبي (ص ٤٩-٦٦)
  // النمط اللغوي: ضمائر الرفع المتصلة بالأفعال · النمط الإملائي: الهمزة المتوسطة
  "g4a1-1-4": [

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "يعرف معاني مفردات النصّ",
      level: "knowledge",
      prompt: "صِلْ كُلَّ كَلِمَةٍ بِمَعْناها.",
      pairs: [
        { a: "مُنَكَّسَيْنِ", b: "مَقْلوبَيْنِ" },
        { a: "نَدِيَّةٌ",    b: "لَطيفَةٌ" },
        { a: "حَفْنَةٌ",    b: "كَمِّيَّةٌ قَليلَةٌ" },
        { a: "مَشارِفِ",   b: "أَطْرافِ" }
      ]
    },

    // ⑦ التصنيف — استدلال — مجموعتان × ٤ عناصر
    {
      type: "classify",
      objective: "يوضّح دور المرأة في صباح البيت العُمانيّ القديم",
      level: "reasoning",
      prompt: "صَنِّفْ ما وَرَدَ في النَّصِّ.",
      groups: [
        { name: "أَوانٍ وَأَدَواتٌ", items: ["الجِحالُ", "الطُّوبَجُ"] },
        { name: "أَعْمالٌ قامَتْ بِها سالِمَةُ", items: ["مَلْءُ الماءِ", "خَبْزُ العَجينِ"] }
      ]
    },

    /* ③ اختيار من متعدد — تطبيق، **بإجاباتٍ متعددة** (كان معرفةً: «بِمَ تُسمّى
       الفخّاريّاتُ...؟ → الجِحالُ» — وهو مُكرَّرٌ حرفياً في بطاقاتِ الذاكرةِ الإثرائيةِ
       بالزوجِ «الجِحالُ → حِفْظُ الماءِ» وفي سؤالِ التصنيف. صارَ خانةَ «الإبداع» ④ في
       قالبِ القراءة: يستخلصُ الطالبُ وصفاً للشخصيةِ من مجموعِ أفعالِها لا من جملةٍ
       واحدة، وتصحُّ فيه أكثرُ من إجابة (`answer` مصفوفةً). */
    {
      type: "mcq",
      objective: "يستخلص وصفاً لشخصية النصّ من مجموع أفعالها",
      level: "application",
      prompt: "أَيُّ الكَلِماتِ يَصْلُحُ لِوَصْفِ صَباحِ سالِمَةَ؟ (أَكْثَرُ مِنْ إِجابَةٍ صَحيحَةٍ)",
      options: ["نَشيطٌ", "مُبَكِّرٌ", "كَسولٌ", "صاخِبٌ"],
      answer: [0, 1]
    },

    // ⑥ الترتيب التسلسلي — تطبيق
    {
      type: "sequence",
      objective: "يتتبّع مراحل صنع الخبز العُمانيّ كما وردت في النصّ",
      level: "application",
      prompt: "رَتِّبْ مَراحِلَ صُنْعِ الخُبْزِ العُمانِيِّ كَما وَرَدَتْ في النَّصِّ.",
      steps: [
        "خَلْطُ الطَّحينِ بِالمِلْحِ وَالماءِ",
        "إِشْعالُ النّارِ وَتَقْريبُ (الطُّوبَجِ) فَوْقَها",
        "الانْتِظارُ حَتّى يَلْتَهِبَ (الطُّوبَجُ)",
        "صَبْغُ (الطُّوبَجِ) بِمَسْحَةٍ مِنْ كُرَةِ العَجينِ",
        "رَفْعُ الخُبْزَةِ النّاضِجَةِ إلى الصَّحْنِ"
      ]
    },

    /* ㊱ الحكم والتعليل — تقويم (حلَّ محلَّ «صواب وخطأ» الذي كان ينقلُ جملةً من النصِّ
       كما هي («نهضتْ سالمةُ مع خيوطِ الفجرِ الأولى») ويطلبُ تصديقَها بـ٥٠٪ تخمين.
       المضمونُ نفسُه بقيَ، لكنّه صارَ حكماً يُعلَّلُ لا خبراً يُصدَّق. */
    {
      type: "judge-reason",
      objective: "يُصدر حكماً مُعلَّلاً على تصرّف سالمة مستنداً إلى النصّ",
      level: "evaluation",
      prompt: "هَلْ أَحْسَنَتْ سالِمَةُ حينَ نَهَضَتْ مَعَ خُيوطِ الفَجْرِ الأولى؟",
      options: ["نَعَمْ", "لا"],
      answer: 0,
      reasons: [
        "لِأَنَّها أَنْجَزَتْ مَلْءَ الماءِ وَخَبْزَ العَجينِ قَبْلَ أَنْ يَسْتَيْقِظَ أَهْلُ البَيْتِ",
        "لِأَنَّ الجِحالَ فَخّارِيّاتٌ مُعَلَّقَةٌ يُحْفَظُ فيها الماءُ",
        "لِأَنَّ أَهْلَ البَيْتِ طَلَبوا مِنْها أَنْ تَسْتَيْقِظَ مُبَكِّرَةً"
      ],
      reasonAnswer: 0
    },

    // ⑰ بطاقات الذاكرة — إثرائي — تطبيق
    {
      type: "memory",
      objective: "يربط كل إناء تقليديّ باستعماله",
      level: "application",
      prompt: "اعْثُرْ عَلى الأَزْواجِ: اقْلِبْ بِطاقَتَيْنِ في كُلِّ دَوْرٍ لِتَرْبِطَ كُلَّ أَداةٍ بِاسْتِعْمالِها.",
      pairs: [
        { a: "الجِحالُ",     b: "حِفْظُ الماءِ" },
        { a: "الهانْدُوَّةُ", b: "نَقْلُ الماءِ" },
        { a: "الطُّوبَجُ",   b: "خَبْزُ العَجينِ" },
        { a: "القَناديلُ",   b: "الإِضاءَةُ لَيْلاً" }
      ]
    }

  ],

  // الدرس الثالث: بلادي عُمان — نورة بنت عبدالله البادية (ص ٦٧-٨١)
  // النمط اللغوي: أسماء الإشارة للبعيد · النمط الإملائي: الهمزة المتوسطة على واو وعلى السطر
  "g4a1-1-5": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "يفهم معاني مفردات القصيدة",
      level: "knowledge",
      prompt: "في قَوْلِ الشّاعِرَةِ: «جُدودِيَ سادوا البِحارَ»، كَلِمَةُ (سادوا) تَعْني:",
      options: ["سَيْطَروا", "تَأَمَّلوا", "تاجَروا", "عَبَروا"],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "يفهم معاني مفردات القصيدة",
      level: "knowledge",
      prompt: "صِلْ كُلَّ كَلِمَةٍ مِنَ القَصيدَةِ بِمَعْناها.",
      pairs: [
        { a: "فَرْقَدا", b: "نَجْماً" },
        { a: "المَدى",  b: "الأُفُقُ البَعيدُ" },
        { a: "الرُّبا", b: "ما ارْتَفَعَ مِنَ الأَرْضِ" },
        { a: "ذُرًى",   b: "قِمَماً" }
      ]
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "يتعرّف قائلة القصيدة ونوع النصّ",
      level: "knowledge",
      statement: "نَصُّ (بِلادي عُمانُ) نَصٌّ شِعْرِيٌّ لِلشّاعِرَةِ العُمانِيَّةِ نورَةَ بِنْتِ عَبْدِاللهِ البادِيَّةِ.",
      answer: true
    },

    // ⑧ ملء الفراغ بالسحب — تطبيق (النمط اللغوي: أسماء الإشارة للبعيد)
    {
      type: "fill-blank",
      objective: "يوظّف أسماء الإشارة للبعيد",
      level: "application",
      prompt: "أَكْمِلْ بِسَحْبِ اسْمِ الإِشارَةِ المُناسِبِ لِلْبَعيدِ.",
      text: "انْظُرْ إلى {} الجَبَلِ الشّامِخِ، وَتَأَمَّلْ {} الأَفْلاجَ الجارِيَةَ.",
      answers: ["ذلِكَ", "تِلْكَ"],
      distractors: ["هذا", "هذِهِ"]
    },

    // ⑦ التصنيف — استدلال — ٣ مجموعات × ٤ عناصر (حدّ السعة المقيس)
    {
      type: "classify",
      objective: "يستنتج مظاهر اعتزاز الشاعرة بوطنها",
      level: "reasoning",
      prompt: "صَنِّفْ ما جاءَ في القَصيدَةِ حَسَبَ ما يَدُلُّ عَلَيْهِ.",
      groups: [
        { name: "اعْتِزازٌ بِالتّاريخِ", items: ["جُدودِيَ سادوا البِحارَ"] },
        { name: "وَصْفٌ لِلطَّبيعَةِ",   items: ["جِبالاً سُهولاً ذُرًى", "لِأَفْلاجِها لِلرُّبا"] },
        { name: "تَعْبيرٌ عَنِ الحُبِّ",  items: ["وَحُبّي لَها في الفُؤادِ مَكينٌ"] }
      ]
    },

    // ⑨ الاستبعاد — إثرائي — استدلال
    {
      type: "exclude",
      objective: "يستخرج ألفاظاً تدلّ على الطبيعة في عُمان",
      level: "reasoning",
      prompt: "ثَلاثَةٌ مِنْ هذِهِ الأَلْفاظِ ذَكَرَتْها الشّاعِرَةُ لِطَبيعَةِ عُمانَ وَواحِدٌ دَخيلٌ.",
      options: ["جِبالٌ", "أَفْلاجٌ", "نَخْلاتٌ", "مَصانِعُ"],
      answer: 3,
      reason: "المَصانِعُ مِنْ صُنْعِ الإِنْسانِ، وَباقي الأَلْفاظِ مِنَ الطَّبيعَةِ الَّتي ذَكَرَتْها الشّاعِرَةُ."
    }

  ],

  // أنشد وأحفظ: بني وطني — سعيد الصقلاوي (ص ٨٢-٨٣)
  "g4a1-1-6": [

    // ③ اختيار من متعدد — معرفة
    {
      type: "mcq",
      objective: "يتعرّف شاعر النشيد",
      level: "knowledge",
      prompt: "مَنْ شاعِرُ نَشيدِ (بَني وَطَني)؟",
      options: [
        "سَعيدٌ الصَّقْلاوِيُّ",
        "خالِدٌ العَنْقودِيُّ",
        "مَحْمودٌ الرَّحْبِيُّ",
        "نورَةُ البادِيَّةُ"
      ],
      answer: 0
    },

    // ② توصيل — معرفة
    {
      type: "matching",
      objective: "يعرف معاني مفردات النشيد",
      level: "knowledge",
      prompt: "صِلْ كُلَّ كَلِمَةٍ مِنَ النَّشيدِ بِمَعْناها.",
      pairs: [
        { a: "وَهْجٌ",    b: "ضِياءٌ وَنورٌ" },
        { a: "المَوّارُ", b: "الثّائِرُ" },
        { a: "الوَقْدا",  b: "الاشْتِعالُ" },
        { a: "الدُّنا",   b: "جَمْعُ دُنْيا" }
      ]
    },

    // ④ صواب وخطأ — معرفة
    {
      type: "true-false",
      objective: "يحدّد البيت الدالّ على شوق الوطن لأبنائه",
      level: "knowledge",
      statement: "في قَوْلِ الشّاعِرِ: «بَني وَطَني حَبيبَتُكُمْ... تُناديكُمْ وَتَدْعوكُمْ» يَظْهَرُ شَوْقُ الوَطَنِ لِأَبْنائِهِ.",
      answer: true
    },

    // ⑧ ملء الفراغ بالسحب — تطبيق (فراغان فقط — قيد السعة)
    {
      type: "fill-blank",
      objective: "يحفظ أبيات النشيد ويكملها",
      level: "application",
      prompt: "أَكْمِلْ بَيْتَ النَّشيدِ بِسَحْبِ الكَلِمَتَيْنِ المُناسِبَتَيْنِ.",
      text: "فَكونوا النَّهْرَ دَفّاقاً وَكونوا {} وَ{}",
      answers: ["النّورَ", "الوَقْدا"],
      distractors: ["البَحْرَ", "الظِّلَّ"]
    },

    // ⑥ الترتيب التسلسلي — استدلال
    {
      type: "sequence",
      objective: "يستنتج ما يدعو إليه الشاعر أبناء وطنه",
      level: "reasoning",
      prompt: "رَتِّبْ دَعَواتِ الشّاعِرِ لِأَبْناءِ وَطَنِهِ كَما وَرَدَتْ في النَّشيدِ.",
      steps: [
        "أَنْ يَكونوا النَّهْرَ دَفّاقاً",
        "أَنْ يَكونوا النّورَ وَالوَقْدا",
        "أَنْ يَكونوا أَنْجُماً تَهْدي",
        "أَنْ يَكونوا مَواكِبَ تَصْنَعُ المَجْدا",
        "أَنْ تَزْهُوَ بِهِمْ حَضارَتُنا وَتُشْرِقَ لِلدُّنا رُشْدا"
      ]
    },

    // ⑪ الخريطة الذهنية — إثرائي — تطبيق
    {
      type: "mindmap",
      objective: "يوظّف مفردات النشيد في بيان ما دعا إليه الشاعر",
      level: "application",
      prompt: "أَكْمِلِ الخَريطَةَ بِسَحْبِ ما دَعا إلَيْهِ الشّاعِرُ في كُلِّ فَرْعٍ.",
      center: "بَني وَطَني",
      branches: [
        { label: "كونوا كَالنَّهْرِ",   answer: "دَفّاقاً" },
        { label: "كونوا كَالنُّجومِ",   answer: "تَهْدي" },
        { label: "كونوا كَالمَواكِبِ", answer: "تَصْنَعُ المَجْدا" }
      ],
      distractors: ["ساكِناً", "تَنامُ"]
    }

  ]
};
