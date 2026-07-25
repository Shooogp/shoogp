/* ═══════════════════════════════════════════════════════════════
   أسئلة الدروس التفاعلية — مرجعها ملف "نماذج-الأسئلة.md"
   المفتاح: معرّف الدرس (file) → مصفوفة أسئلة.
   كل سؤال: { type, objective, level, ...حقول النوع }
   الأنواع: drag-drop | matching | mcq | true-false | hotspot
   المستوى (level): knowledge (معرفة) | application (تطبيق) | reasoning (استدلال)
   قاعدة: ٤–٦ أسئلة لكل درس على نوعين مختلفين على الأقل، متدرّجة الصعوبة،
          وكل سؤال مبني على هدف من وثيقة الأهداف ومستمدّ من الكتاب.
          التوزيع المعرفي الأساسي: ٣ معرفة + ١ تطبيق + ١ استدلال (المرجع question-types.md).
   ═══════════════════════════════════════════════════════════════ */
window.QUESTIONS = {

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

  /* ── الرياضيات/الرابع — الوحدة ١: الأعداد ونظام العدّ ──
     الأهداف من: المصادر/الفصل الدراسي الاول/الصف الرابع/مادة الرياضيات/الرياضيات-الرابع-الأهداف.md */

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
    {
      type: "hotspot",
      objective: "4Nn6: يضع الأعداد بدقة على خط أعداد مقسّم بمضاعفات ١٠ أو ١٠٠",
      level: "application",
      prompt: "خطُّ الأعدادِ منْ ٣٠٠٠ إلى ٤٠٠٠ مقسّمٌ بالمئاتِ — اضغطْ على موضعِ العددِ ٣٧٠٠.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 210" width="900" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من ٣٠٠٠ إلى ٤٠٠٠">
        <line x1="70" y1="120" x2="830" y2="120" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="70" y1="98" x2="70" y2="142" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="146" y1="106" x2="146" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="222" y1="106" x2="222" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="298" y1="106" x2="298" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="374" y1="106" x2="374" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="450" y1="98" x2="450" y2="142" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="526" y1="106" x2="526" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="602" y1="106" x2="602" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="678" y1="106" x2="678" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="754" y1="106" x2="754" y2="134" stroke="#33415e" stroke-width="4"/>
        <line x1="830" y1="98" x2="830" y2="142" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <text x="70" y="180" font-size="30" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٠٠٠</text>
        <text x="450" y="180" font-size="30" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٥٠٠</text>
        <text x="830" y="180" font-size="30" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٠٠٠</text>
      </svg>`,
      spot: { x: 67, y: 57, r: 5 }
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
    {
      type: "find-error",
      objective: "4Nn6: يضع الأعداد بدقة على خط أعداد مقسّم بمضاعفات ١٠ أو ١٠٠",
      level: "reasoning",
      prompt: "خطُّ الأعدادِ منْ ٠ إلى ١٠٠٠ فيهِ عددٌ واحدٌ في غيرِ موضعِهِ — اضغطْ عليهِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 210" width="900" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من صفر إلى ألف فيه عدد خاطئ">
        <line x1="70" y1="110" x2="830" y2="110" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="70" y1="88" x2="70" y2="132" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="146" y1="96" x2="146" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="222" y1="96" x2="222" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="298" y1="96" x2="298" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="374" y1="96" x2="374" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="450" y1="96" x2="450" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="526" y1="96" x2="526" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="602" y1="96" x2="602" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="678" y1="96" x2="678" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="754" y1="96" x2="754" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="830" y1="88" x2="830" y2="132" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <text x="70"  y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٠</text>
        <text x="146" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">١٠٠</text>
        <text x="222" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٢٠٠</text>
        <text x="298" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٠٠</text>
        <text x="374" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٠٠</text>
        <text x="450" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥٠٠</text>
        <text x="526" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٦٥٠</text>
        <text x="602" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٧٠٠</text>
        <text x="678" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٨٠٠</text>
        <text x="754" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٩٠٠</text>
        <text x="830" y="165" font-size="24" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">١٠٠٠</text>
      </svg>`,
      spot: { x: 58.4, y: 76, r: 6 }
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
    {
      type: "drag-drop",
      objective: "4Nn9: يستخدم الأعداد السالبة في سياقات عملية مثل درجات الحرارة",
      level: "application",
      prompt: "اسحبْ كلَّ عددٍ إلى موضعِهِ الصحيحِ على خطِّ الأعدادِ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 900 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="خط أعداد من سالب خمسة إلى خمسة">
        <line x1="70" y1="110" x2="830" y2="110" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="70" y1="88" x2="70" y2="132" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="222" y1="96" x2="222" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="298" y1="96" x2="298" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="450" y1="88" x2="450" y2="132" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <line x1="526" y1="96" x2="526" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="602" y1="96" x2="602" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="754" y1="96" x2="754" y2="124" stroke="#33415e" stroke-width="4"/>
        <line x1="830" y1="88" x2="830" y2="132" stroke="#33415e" stroke-width="5" stroke-linecap="round"/>
        <circle cx="146" cy="110" r="11" fill="#fff" stroke="#d97a2b" stroke-width="4"/>
        <circle cx="374" cy="110" r="11" fill="#fff" stroke="#d97a2b" stroke-width="4"/>
        <circle cx="678" cy="110" r="11" fill="#fff" stroke="#d97a2b" stroke-width="4"/>
        <text x="70"  y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">-٥</text>
        <text x="222" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">-٣</text>
        <text x="298" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">-٢</text>
        <text x="450" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٠</text>
        <text x="526" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">١</text>
        <text x="602" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٢</text>
        <text x="754" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤</text>
        <text x="830" y="165" font-size="28" font-weight="700" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٥</text>
      </svg>`,
      targets: [
        { answer: "٤-", box:{x:16,y:10}, dot:{x:16.2,y:52.4} },
        { answer: "١-", box:{x:50,y:10}, dot:{x:41.6,y:52.4} },
        { answer: "٣",  box:{x:84,y:10}, dot:{x:75.3,y:52.4} }
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
    {
      type: "hotspot",
      objective: "4Nn11: يميّز الأعداد الفردية والزوجية",
      level: "knowledge",
      prompt: "اضغطْ على العددِ الزوجيِّ.",
      bg: "#fdf9ee",
      fit: "width",
      svg: `<svg viewBox="0 0 800 220" width="800" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="أربع بطاقات أعداد">
        <rect x="50"  y="55" width="150" height="110" rx="16" fill="#eef4fb" stroke="#33415e" stroke-width="3"/>
        <rect x="230" y="55" width="150" height="110" rx="16" fill="#eef4fb" stroke="#33415e" stroke-width="3"/>
        <rect x="410" y="55" width="150" height="110" rx="16" fill="#eef4fb" stroke="#33415e" stroke-width="3"/>
        <rect x="590" y="55" width="150" height="110" rx="16" fill="#eef4fb" stroke="#33415e" stroke-width="3"/>
        <text x="125" y="130" font-size="56" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٤٧</text>
        <text x="305" y="130" font-size="56" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٣٩</text>
        <text x="485" y="130" font-size="56" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٦٢</text>
        <text x="665" y="130" font-size="56" font-weight="800" text-anchor="middle" fill="#1f2937" font-family="Tajawal, Dubai, Cairo, sans-serif">٨٥</text>
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
      svg: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="حشرة ودودة أرض">
        <g stroke="#5b4a2f" stroke-width="4" stroke-linecap="round" fill="none">
          <line x1="90" y1="118" x2="58" y2="150"/>
          <line x1="92" y1="130" x2="60" y2="168"/>
          <line x1="96" y1="142" x2="72" y2="178"/>
          <line x1="120" y1="118" x2="152" y2="150"/>
          <line x1="118" y1="130" x2="150" y2="168"/>
          <line x1="114" y1="142" x2="138" y2="178"/>
          <line x1="99" y1="84" x2="84" y2="60"/>
          <line x1="111" y1="84" x2="126" y2="60"/>
        </g>
        <g class="cpart" data-name="الحشرة" id="part-insect">
          <ellipse cx="105" cy="90" rx="15" ry="13"/>
          <ellipse cx="105" cy="116" rx="20" ry="16"/>
          <ellipse cx="105" cy="150" rx="17" ry="24"/>
        </g>
        <g class="cpart" data-name="دودة الأرض" id="part-worm">
          <ellipse cx="250" cy="150" rx="16" ry="13"/>
          <ellipse cx="274" cy="136" rx="16" ry="13"/>
          <ellipse cx="298" cy="138" rx="16" ry="13"/>
          <ellipse cx="318" cy="156" rx="16" ry="13"/>
          <ellipse cx="312" cy="180" rx="16" ry="13"/>
        </g>
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

    // ⑩ ترتيب الحروف — سؤال تجريبي لنوع ترتيب الحروف الجديد
    {
      type: "arrange",
      objective: "يرسّخ كتابة مصطلح «المادة» بترتيب حروفه ترتيباً صحيحاً",
      level: "knowledge",
      prompt: "رتّب الحروف لتكوين الكلمة الصحيحة.",
      word: "مادة"
    },

    // ⑪ الخريطة الذهنية الناقصة — سؤال تجريبي لنوع الخريطة الذهنية الجديد
    {
      type: "mindmap",
      objective: "يربط كل حالة من حالات المادة بمثال مناسب لها",
      level: "application",
      prompt: "أكمل الخريطة الذهنية بسحب المثال المناسب إلى كل فرع.",
      center: "حالات المادة",
      branches: [
        { label: "صلبة",  answer: "طوب" },
        { label: "سائلة", answer: "ماء" },
        { label: "غازية", answer: "هواء" }
      ],
      distractors: ["نار", "ضوء"]
    },

    // 🎨 التلوين بالتعليمات (color) — سؤال تجريبي لنوع التلوين
    // رسم SVG: ثلاثة صناديق، كل صندوق جزيئاته مرتّبة حسب حالة المادة (صلب/سائل/غاز)
    {
      type: "color",
      objective: "يميّز ترتيب الجزيئات في حالات المادة الثلاث",
      level: "knowledge",
      prompt: "لوّن كل صندوق حسب حالة المادة: اختر لوناً من اللوحة ثم اضغط الصندوق.",
      bg: "#fdf9ee",
      palette: [
        { name: "أزرق", color: "#2f6fb0" },
        { name: "أخضر", color: "#3e9b4f" },
        { name: "أصفر", color: "#f2c230" }
      ],
      parts: [
        { name: "صندوق الصلب",  color: "#2f6fb0" },
        { name: "صندوق السائل", color: "#3e9b4f" },
        { name: "صندوق الغاز",  color: "#f2c230" }
      ],
      svg: `<svg viewBox="0 0 470 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="صناديق حالات المادة الثلاث">
        <g class="cpart" data-name="صندوق الغاز" id="part-gas">
          <rect x="20" y="35" width="130" height="130" rx="10"/>
          <circle cx="55" cy="70" r="9" fill="#fff"/>
          <circle cx="112" cy="60" r="9" fill="#fff"/>
          <circle cx="82" cy="105" r="9" fill="#fff"/>
          <circle cx="48" cy="140" r="9" fill="#fff"/>
          <circle cx="122" cy="132" r="9" fill="#fff"/>
        </g>
        <g class="cpart" data-name="صندوق السائل" id="part-liquid">
          <rect x="170" y="35" width="130" height="130" rx="10"/>
          <circle cx="192" cy="62" r="9" fill="#fff"/>
          <circle cx="216" cy="54" r="9" fill="#fff"/>
          <circle cx="242" cy="66" r="9" fill="#fff"/>
          <circle cx="270" cy="58" r="9" fill="#fff"/>
          <circle cx="202" cy="90" r="9" fill="#fff"/>
          <circle cx="230" cy="98" r="9" fill="#fff"/>
          <circle cx="258" cy="90" r="9" fill="#fff"/>
          <circle cx="284" cy="86" r="9" fill="#fff"/>
          <circle cx="210" cy="126" r="9" fill="#fff"/>
          <circle cx="244" cy="130" r="9" fill="#fff"/>
          <circle cx="276" cy="122" r="9" fill="#fff"/>
        </g>
        <g class="cpart" data-name="صندوق الصلب" id="part-solid">
          <rect x="320" y="35" width="130" height="130" rx="10"/>
          <circle cx="342" cy="57" r="9" fill="#fff"/>
          <circle cx="366" cy="57" r="9" fill="#fff"/>
          <circle cx="390" cy="57" r="9" fill="#fff"/>
          <circle cx="414" cy="57" r="9" fill="#fff"/>
          <circle cx="342" cy="81" r="9" fill="#fff"/>
          <circle cx="366" cy="81" r="9" fill="#fff"/>
          <circle cx="390" cy="81" r="9" fill="#fff"/>
          <circle cx="414" cy="81" r="9" fill="#fff"/>
          <circle cx="342" cy="105" r="9" fill="#fff"/>
          <circle cx="366" cy="105" r="9" fill="#fff"/>
          <circle cx="390" cy="105" r="9" fill="#fff"/>
          <circle cx="414" cy="105" r="9" fill="#fff"/>
          <circle cx="342" cy="129" r="9" fill="#fff"/>
          <circle cx="366" cy="129" r="9" fill="#fff"/>
          <circle cx="390" cy="129" r="9" fill="#fff"/>
          <circle cx="414" cy="129" r="9" fill="#fff"/>
        </g>
      </svg>`
    }

  ],

  // العلوم/الرابع — الوحدة الثالثة، الدرس السادس: درجات الانصهار ودرجات الغليان
  "g4s-3-6": [

    // ⑬ الشريط المتدرّج — سؤال تجريبي لنوع الشريط المتدرّج الجديد
    // شريط من ٠° إلى ١٢٠°، الإجابة الصحيحة ١٠٠° (درجة غليان الماء) وهامش القبول ±٢
    // لأن اللمس على السبورة غير دقيق. تدريج كبير كل ٢٠° وأرقام واضحة.
    {
      type: "slider",
      objective: "يحدد درجة غليان الماء على مقياس الحرارة",
      level: "knowledge",
      prompt: "اسحب المؤشر إلى درجة غليان الماء على مقياس الحرارة.",
      min: 0,
      max: 120,
      answer: 100,
      tolerance: 2,
      unit: "°",
      ticks: 20
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
      spot: { x: 65, y: 51, r: 13 },
      svg: `<svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="رموز حالات الطقس">
        <circle cx="55" cy="55" r="22" fill="#f2c230"/>
        <g stroke="#f2c230" stroke-width="4" stroke-linecap="round">
          <line x1="55" y1="20" x2="55" y2="8"/><line x1="55" y1="90" x2="55" y2="102"/>
          <line x1="20" y1="55" x2="8" y2="55"/><line x1="90" y1="55" x2="102" y2="55"/>
          <line x1="30" y1="30" x2="21" y2="21"/><line x1="80" y1="30" x2="89" y2="21"/>
          <line x1="30" y1="80" x2="21" y2="89"/><line x1="80" y1="80" x2="89" y2="89"/>
        </g>
        <path d="M120 70 Q120 50 142 52 Q150 38 168 48 Q188 46 188 66 Q202 68 198 82 L120 82 Q108 80 120 70 Z" fill="#c9d2d9" stroke="#9aa7b0" stroke-width="2"/>
        <path d="M220 60 Q220 40 242 42 Q250 28 268 38 Q288 36 288 56 Q302 58 298 72 L220 72 Q208 70 220 60 Z" fill="#9aa7b0" stroke="#7c8a94" stroke-width="2"/>
        <g fill="#2f6fb0">
          <path d="M235 80 q-4 8 0 11 q4 -3 0 -11 Z"/>
          <path d="M258 80 q-4 8 0 11 q4 -3 0 -11 Z"/>
          <path d="M281 80 q-4 8 0 11 q4 -3 0 -11 Z"/>
        </g>
        <path d="M320 60 Q320 40 342 42 Q350 28 368 38 Q388 36 388 56 Q402 58 398 72 L320 72 Q308 70 320 60 Z" fill="#c9d2d9" stroke="#9aa7b0" stroke-width="2"/>
        <g fill="#7fb2e0"><circle cx="335" cy="86" r="4"/><circle cx="358" cy="86" r="4"/><circle cx="381" cy="86" r="4"/></g>
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
      spot: { x: 84, y: 64, r: 15 },
      svg: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ثلاث صخور بأحجام مختلفة">
        <path d="M42 118 Q32 96 55 90 Q78 84 92 100 Q104 116 88 126 Q62 134 42 118 Z" fill="#c2c8cd" stroke="#8a9096" stroke-width="3"/>
        <path d="M165 132 Q150 98 186 88 Q224 80 244 106 Q260 130 234 142 Q194 150 165 132 Z" fill="#b2b9bf" stroke="#7c848a" stroke-width="3"/>
        <path d="M292 148 Q268 92 322 72 Q384 56 396 108 Q404 146 356 152 Q318 156 292 148 Z" fill="#a3abb1" stroke="#6f777d" stroke-width="3"/>
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

  ]

};
