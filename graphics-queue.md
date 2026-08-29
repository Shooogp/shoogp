# طابور توليد الرسومات

> ملفٌّ **مؤقّت غير مُودَع** (لا يُدفع للمستودع). يجمع برومبتات الصور للأسئلة التي **اجتازت البوّابة الرباعية** في مهارة `shoogp-graphics`.
> الجولة الثانية بعد توليد الصور: تتبّع بـvtracer ← تسمية المسارات بالمعرّفات الإنجليزية أدناه ← تحييد الألوان الكاشفة إلى `#E8E4DC` ← بوّابة الجودة ← الربط والإيداع.
>
> **إعداد التتبّع المعتمد:** `vtracer --colormode color --color_precision 4 --filter_speckle 16 --gradient_step 32 --mode spline` ثم حذف مسار الخلفية البيضاء.

---

## بند ١ — `g4s-3-3` · السؤال الإثرائي (تلوين حالات المادة)

- **رمز السؤال:** `g4s-3-3` (الدرس الثالث: كيف تختلف المواد الصلبة والسائلة والغازية؟) — السؤال الإثرائي `color`.
- **الهدف:** `4Cs1: يميّز المادة الصلبة والسائلة والغازية`. المستوى: تطبيق.
- **نصّ السؤال (بعد الربط):** «لوّن كلَّ جسمٍ بلونِ حالتِه: الصلبَ، والسائلَ، والغازيَّ.»
- **اسم الملف العربي المقترح:** `images/حالات-المادة-اجسام.png` (ومنه `حالات-المادة-اجسام.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — ٣ مناطق (≤٤) · حدود مغلقة واضحة لكلٍّ · بلا تداخل · لون مسطّح فريد لكلٍّ.

### المناطق التفاعلية (٣) — المعرّف الإنجليزي · لون التوليد الفريد · لون الإجابة النهائي

| المنطقة | المعرّف `id`/`data-name` | لون التوليد (مفتاح العزل) | لون الإجابة النهائي (الحالة) |
|---------|--------------------------|---------------------------|------------------------------|
| مكعّب الثلج (صلب) | `state-solid` | `#3AA0FF` (أزرق صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أزرق `#2f6fb0` |
| كوب الماء (سائل) | `state-liquid` | `#35C759` (أخضر صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أخضر `#3e9b4f` |
| البالون (غاز) | `state-gas` | `#F2C94C` (أصفر صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أصفر `#f2c230` |

> ملاحظة: ألوان التوليد الثلاثة **مختلفة تماماً** (أزرق/أخضر/أصفر) لتخرج كلُّ منطقة مساراً واحداً نظيفاً في التتبّع. تُحيَّد كلُّها إلى البيج `#E8E4DC` بعد التتبّع كي تظهر «غير ملوّنة» ابتداءً، وتبقى لوحة الألوان وأزرار التلوين هي التي يستعملها الطالب.

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً بسيطاً لثلاثةِ أجسامٍ منفصلةٍ متجاورةٍ على خطٍّ أفقيٍّ، تمثّلُ حالاتِ المادّةِ الثلاثَ: **مكعّبُ ثلجٍ** (مادّة صلبة) بلونٍ **أزرقَ مسطّحٍ صريحٍ `#3AA0FF`**، و**كوبٌ زجاجيٌّ ممتلئٌ بالماءِ** (مادّة سائلة) بلونٍ **أخضرَ مسطّحٍ صريحٍ `#35C759`**، و**بالونٌ منفوخٌ** (يمثّلُ الغازَ) بلونٍ **أصفرَ مسطّحٍ صريحٍ `#F2C94C`**. لكلِّ جسمٍ **حدٌّ خارجيٌّ أسودُ سميكٌ مغلقٌ** يفصلُه تماماً عن غيرِه، ولا تتداخلُ الأجسامُ، ولا يتكرّرُ لونٌ بينها. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو تسمياتٍ أو أرقامٍ. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create a simple educational illustration of three separate objects placed side by side in a horizontal row, representing the three states of matter: an **ice cube** (solid) in a flat solid **blue `#3AA0FF`**, a **glass filled with water** (liquid) in a flat solid **green `#35C759`**, and an **inflated balloon** (representing gas) in a flat solid **yellow `#F2C94C`**. Each object has a **thick closed black outline** fully separating it from the others; objects do not overlap; no color is repeated between them. Pure **white background `#FFFFFF`**, with no text, labels, or numbers. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

---

## بند ٢ — `g2s-3-4` · السؤال الإثرائي (تلوين الساخن والبارد)

- **رمز السؤال:** `g2s-3-4` (العلوم/الثاني — الوحدة الثالثة، الدرس الرابع: التسخين والتبريد) — السؤال الإثرائي `color`.
- **الهدف:** `2Cp5: يلاحظ التغيّرات التي يُحدثها التسخين والتبريد في المواد`. المستوى: تطبيق.
- **نصّ السؤال (بعد الربط):** «لَوِّنِ السَّاخِنَ بالأحمَرِ والباردَ بالأزرَقِ: اختَرْ لَوناً ثُمَّ اضغَطِ الشَّيءَ.»
- **اسم الملف العربي المقترح:** `images/ساخن-بارد-اجسام.png` (ومنه `ساخن-بارد-اجسام.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — ٤ مناطق (≤٤) · حدود مغلقة لكلٍّ · بلا تداخل · لون مسطّح فريد لكلٍّ.

| المنطقة | المعرّف `id`/`data-name` | لون التوليد (مفتاح العزل) | لون الإجابة النهائي |
|---------|--------------------------|---------------------------|---------------------|
| كوب الشاي (ساخن) | `hot-tea` | `#3AA0FF` (أزرق صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أحمر `#cf3b3b` |
| رغيف الخبز (ساخن) | `hot-bread` | `#35C759` (أخضر صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أحمر `#cf3b3b` |
| مكعّب الثلج (بارد) | `cold-ice` | `#F2C94C` (أصفر صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أزرق `#2f6fb0` |
| كرة المثلّجات (بارد) | `cold-icecream` | `#B14BE0` (بنفسجي صريح) | يُحيَّد إلى `#E8E4DC`؛ الإجابة: أزرق `#2f6fb0` |

> ألوانُ التوليد الأربعة مختلفةٌ تماماً وإن تشارك جسمانِ **لونَ الإجابة** — اللون مفتاحُ العزل في التتبّع لا معنى الإجابة.
> الأجزاءُ الثابتةُ (صحنُ الكوب، مخروطُ المثلّجات، البخار) تبقى بألوانها الطبيعية ولا تُلوَّن.

**عربي:** أنشئ رسماً تعليمياً لأربعةِ أشياءَ منفصلةٍ في صفَّينِ (٢×٢): **كوبُ شايٍ ساخنٍ بصحنٍ ويتصاعدُ منه بخارٌ** بلونٍ **أزرقَ مسطّحٍ صريحٍ `#3AA0FF`**، و**رغيفُ خبزٍ ساخنٍ يتصاعدُ منه بخارٌ** بلونٍ **أخضرَ مسطّحٍ صريحٍ `#35C759`**، و**مكعّبُ ثلجٍ** بلونٍ **أصفرَ مسطّحٍ صريحٍ `#F2C94C`**، و**مثلّجاتٌ في مخروطٍ** كرتُها بلونٍ **بنفسجيٍّ مسطّحٍ صريحٍ `#B14BE0`**. لكلِّ شيءٍ **حدٌّ خارجيٌّ أسودُ سميكٌ مغلقٌ** يفصلُه تماماً، ولا تتداخلُ الأشياءُ، ولا يتكرّرُ لونٌ بينها. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو تسمياتٍ أو أرقامٍ. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:** Create an educational illustration of four separate objects arranged in two rows (2×2): a **hot cup of tea on a saucer with steam rising**, in flat solid **blue `#3AA0FF`**; a **hot loaf of bread with steam rising**, in flat solid **green `#35C759`**; an **ice cube**, in flat solid **yellow `#F2C94C`**; and an **ice cream cone** whose scoop is flat solid **purple `#B14BE0`**. Each object has a **thick closed black outline** fully separating it; objects do not overlap; no color is repeated between them. Pure **white background `#FFFFFF`**, with no text, labels, or numbers. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

---

## بند ٣ — `g2s-3-3` · السؤال الرابع (سحب أسماء الأجسام المرنة)

- **رمز السؤال:** `g2s-3-3` (الوحدة الثالثة، الدرس الثالث: المرونة الرائعة) — السؤال الرابع `drag-drop`.
- **الهدف:** `2Cp4: يتعرّف المواد المرنة ويميّزها بعودتها إلى شكلها الأصلي`. المستوى: تطبيق.
- **اسم الملف العربي المقترح:** `images/اجسام-مرنة.png`.
- **نتيجة البوّابة:** ✅ **مرّ** — ٣ مناطق · حدود مغلقة · بلا تداخل · لون فريد لكلٍّ.

| المنطقة | المعرّف | لون التوليد | ملاحظة |
|---------|---------|-------------|--------|
| رِباط مطّاطي (حلقة) | `elastic-band` | `#3AA0FF` | نقطةُ الارتساء على الحلقةِ نفسِها لا في جوفِها |
| إسفنجة | `elastic-sponge` | `#35C759` | |
| نابِض | `elastic-spring` | `#F2C94C` | |

> **قيدُ تخطيطٍ عندَ الاستبدال:** يُبقى **الشريطُ العلويُّ (نحو ربعِ الارتفاع) فارغاً** ليجلسَ فيه صفُّ الصناديق، ونسبةُ الصورةِ تبقى ≥ 1.2 (تخطيطُ الصفِّ العلويّ) و≤ 2.2 (سقفُ النسبة). وبعدَ الاستبدالِ **يُعاد حسابُ `targets[].dot`** وفحصُ الإطار.

**عربي:** أنشئ رسماً تعليمياً لثلاثةِ أجسامٍ مرنةٍ منفصلةٍ في صفٍّ أفقيٍّ واحدٍ في **النصفِ السفليِّ من الصورة** (يُترك النصفُ العلويُّ فارغاً بالكامل): **رِباطٌ مطّاطيٌّ على هيئةِ حلقةٍ سميكةٍ** بلونٍ **أزرقَ مسطّحٍ صريحٍ `#3AA0FF`**، و**إسفنجةُ تنظيفٍ مستطيلةٌ بحوافَّ دائريّةٍ وثقوبٍ ظاهرةٍ** بلونٍ **أخضرَ مسطّحٍ صريحٍ `#35C759`**، و**نابِضٌ لولبيٌّ بلوحٍ معدنيٍّ في أعلاه وأسفلِه** بلونٍ **أصفرَ مسطّحٍ صريحٍ `#F2C94C`**. لكلِّ جسمٍ **حدٌّ خارجيٌّ أسودُ سميكٌ مغلقٌ**، ولا تتداخلُ الأجسامُ، ولا يتكرّرُ لونٌ بينها. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو تسمياتٍ أو أرقامٍ. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:** Create an educational illustration of three separate elastic objects in a single horizontal row placed in the **lower half of the image** (leave the upper half completely empty): a **thick rubber band shaped as a ring**, in flat solid **blue `#3AA0FF`**; a **rectangular cleaning sponge with rounded corners and visible holes**, in flat solid **green `#35C759`**; and a **coiled spring with a metal plate at its top and bottom**, in flat solid **yellow `#F2C94C`**. Each object has a **thick closed black outline**; objects do not overlap; no color is repeated between them. Pure **white background `#FFFFFF`**, with no text, labels, or numbers. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

---

## بند ٤ — `g2s-3-2` · السؤال الرابع (الجسم القابل للثني)

- **رمز السؤال:** `g2s-3-2` (الوحدة الثالثة، الدرس الثاني: الثَّني واللَّيّ) — السؤال الرابع `hotspot`.
- **الهدف:** `2Cp3: يستكشف أنّ شكل بعض المواد يتغيّر بالضغط والشدّ والثني واللَّيّ`. المستوى: تطبيق.
- **اسم الملف العربي المقترح:** `images/اجسام-تنثني.png`.
- **نتيجة البوّابة:** ✅ **مرّ** — ٤ مناطق · حدود مغلقة · بلا تداخل · لون فريد لكلٍّ.

| المنطقة | المعرّف | لون التوليد | ملاحظة |
|---------|---------|-------------|--------|
| سِلك معدنيّ ملويّ | `bend-wire` | `#3AA0FF` | **الإجابة الصحيحة** — عليها `spot` |
| كوب زجاج | `bend-glass` | `#35C759` | مموّه |
| صخرة | `bend-rock` | `#F2C94C` | مموّه |
| قضيب حديد سميك | `bend-rod` | `#B14BE0` | مموّه |

> بعدَ الاستبدالِ **يُعاد حسابُ `spot.x/y`** على مركزِ السِّلك (`spot.r` لا يُمَسّ).

**عربي:** أنشئ رسماً تعليمياً لأربعةِ أجسامٍ منفصلةٍ في صفَّينِ (٢×٢): **سِلكٌ معدنيٌّ رفيعٌ ملويٌّ بانحناءاتٍ واضحةٍ** بلونٍ **أزرقَ مسطّحٍ صريحٍ `#3AA0FF`**، و**كوبُ زجاجٍ فارغٌ** بلونٍ **أخضرَ مسطّحٍ صريحٍ `#35C759`**، و**صخرةٌ ذاتُ أوجهٍ** بلونٍ **أصفرَ مسطّحٍ صريحٍ `#F2C94C`**، و**قضيبُ حديدٍ سميكٌ أفقيٌّ** بلونٍ **بنفسجيٍّ مسطّحٍ صريحٍ `#B14BE0`**. لكلِّ جسمٍ **حدٌّ خارجيٌّ أسودُ سميكٌ مغلقٌ**، ولا تتداخلُ الأجسامُ، ولا يتكرّرُ لونٌ بينها. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو تسمياتٍ أو أرقامٍ. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:** Create an educational illustration of four separate objects arranged in two rows (2×2): a **thin twisted metal wire with clear bends**, in flat solid **blue `#3AA0FF`**; an **empty drinking glass**, in flat solid **green `#35C759`**; a **faceted rock**, in flat solid **yellow `#F2C94C`**; and a **thick horizontal iron rod**, in flat solid **purple `#B14BE0`**. Each object has a **thick closed black outline**; objects do not overlap; no color is repeated between them. Pure **white background `#FFFFFF`**, with no text, labels, or numbers. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

---

> **خارج الطابور عمداً — `g2s-3-5` السؤال الإثرائي (اكتشف الخطأ: أكواب المِلح والسُّكّر والرَّمل):** يسقطُ في البوّابةِ لأنّ المشهدَ يحتاجُ **تسمياتٍ نصّيّةً** تحتَ كلِّ كوبٍ (بها وحدَها يُعرَف أيُّ كوبٍ رُسِمَ خطأً)، وقالبُ التوليدِ يشترطُ صورةً **بلا أيّ نصوصٍ**. فيبقى رسماً يدوياً دائماً — وهذا هو المخرَجُ الصحيحُ في البوّابة: لا يُغيَّرُ الهدفُ التعليميّ ولا يُقحَمُ المسار.

---

## ملاحظات للجولة الثانية
- بعد التتبّع: سمِّ المسارات الثلاثة `state-solid` / `state-liquid` / `state-gas`، وحوّلها إلى `class="cpart" data-name="..."`، وحيّد تعبئتها إلى `#E8E4DC`.
- بيانات السؤال `parts`: `state-solid`→`#2f6fb0`، `state-liquid`→`#3e9b4f`، `state-gas`→`#f2c230`. واللوحة `palette`: أزرق/أخضر/أصفر بنفس القيم.
- بوّابة الجودة قبل الإدراج: عدد المسارات · الحجم < 80KB · بلا `<style>` · التعبئة سمة `fill` · لا أثر لونيّ كاشف متبقٍّ · النسبة والإطار القمريّ المختار.

---

## بند ٥ — `g2m-9-3` · السؤال الإثرائي (اكتشف الخطأ: العربة ذات العجلة المربعة)

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٨ — بالمسارِ النقطيِّ لا بالتتبّع، وسقطَ معه لونُ العزل.**
> `images/عربة-عجلة-مربعة.png` (‏٩٠٠×٥٨٧ · نسبة ١٫٥٣ · ٢٩KB)، و`spot` **مستطيلٌ**
> `{x:19.4, y:76.7, w:19.5, h:31.0}`.
>
> **ولماذا سقطَ لونُ العزلِ الأحمر:** كانَ في البرومبتِ لِيَفصِلَ العجلةَ المربعةَ عندَ
> التتبّع، ثمّ تُحيَّدُ إلى أصفرِ أخواتِها كي لا يكشفَ اللونُ الإجابة. **وبتعديلِ حدِّ
> المنعِ في `CLAUDE.md` (‏٢٠٢٦-٠٨-٢٨) صارَ `find-error` يقبلُ الصورةَ النقطيّةَ**، فلا
> تتبّعَ ولا حاجةَ إلى لونٍ يفصل — فوُلِّدَت العجلةُ المربعةُ **بلونِ أخواتِها ابتداءً**،
> والدليلُ شكلُها وحدَه. خطوةٌ أقلُّ وخطرُ كشفٍ أقل.
>
> **و`spot` مستطيلٌ لا دائرة** — الهدفُ مربَّعٌ، والدائرةُ تقتطعُ أركانَه الأربعةَ
> (§قاعدةُ شكلِ منطقةِ الإجابة). وقُيسَ بطريقتَينِ متّفقتَين: تحليلِ المكوّناتِ المتّصلةِ
> وشبكةِ النِّسَبِ المرسومةِ فوقَ الصورة، ثمّ رُسِمَ المستطيلُ فوقَها ونُظِرَ إليه.
>
> **واختبارُ النقرِ ذو الطرفَين:** سبعُ نقراتٍ داخلَ العجلةِ (مركزٌ وأركان) كلُّها تُقبَل،
> وسبعٌ خارجَها (العجلاتُ الدائريةُ والصندوقُ وأسفلَ الرسم) كلُّها تُرَدّ.
>
> ⚠️ **وموضعُ العجلةِ المربعةِ انقلبَ**: كانَ في الرسمِ اليدويِّ يميناً (‏`x:74`) وصارَ
> في المولَّدِ يساراً (‏`x:19.4`). **فنقلُ `spot` القديمِ كما هو كانَ سيُصيبُ عجلةً
> دائريةً سليمة** — ولا يُكتشَفُ إلا بالاختبار. القياسُ بعدَ كلِّ استبدالٍ ليس تزيّداً.

> **أول بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`)** — مسار الترقية إلى مستوى فنّ المنصّة. الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت يُستبدل بناتج هذا البند.

- **رمز السؤال:** `g2m-9-3` (صناعة أجسام متحركة، رياضيات الصف الثاني) — السؤال الإثرائي `find-error`.
- **الهدف:** `2Pt3: يستكشف المسائل العددية والألغاز`. المستوى: استدلال.
- **نصّ السؤال:** «في هذِهِ العَرَبةِ خَطَأٌ يَمنَعُها مِنَ التَّدَحرُجِ — اضغَطْ عَلَيهِ.»
- **اسم الملف العربي المقترح:** `images/عربة-عجلة-مربعة.png` (ومنه `عربة-عجلة-مربعة.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (≤٤) · حدود مغلقة · بلا تداخل · لون توليد فريد لها.
- **قيد النسبة:** الصورة عريضة أفقياً بنسبة **≤ 2.2** (عرض ÷ ارتفاع) التزاماً بسقف `viewBox`.

### المناطق التفاعلية (١)

| المنطقة | المعرّف `id`/هدف `spot` | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|--------------------------|---------------------------|----------------------|
| العجلة المربعة | `wheel-square` | `#E84C5B` (أحمر صريح) | **تُحيَّد إلى أصفر العجلات نفسه** — الدليل شكلُها لا لونُها، ولونٌ مميّز يكشف الإجابة |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لعربةٍ خشبيةٍ صغيرةٍ لِلُعبةِ أطفالٍ، تُرى مِن الجانبِ على خطِّ أرضٍ بسيطٍ: صندوقٌ خشبيٌّ بألواحٍ ظاهرةٍ ومساميرَ في الزوايا وحافةٍ معدنيةٍ علويةٍ وعلمٍ صغيرٍ ومقبضِ سحبٍ مائلٍ بيدٍ دائريةٍ، ولها أربعُ عجلاتٍ: **ثلاثُ عجلاتٍ دائريةٍ صفراءَ** بصُرَّةٍ وأضلاعٍ ظاهرةٍ، **وعجلةٌ واحدةٌ مربعةُ الشكلِ بلونٍ أحمرَ مسطّحٍ صريحٍ `#E84C5B`** بصُرَّةٍ وأضلاعٍ مثلِها، لها حدٌّ خارجيٌّ أسودُ سميكٌ مغلقٌ يفصلُها تماماً. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو تسمياتٍ أو أرقامٍ، وبلا أيّ كائنٍ حيٍّ. الصورةُ عريضةٌ أفقياً (نسبةُ العرضِ إلى الارتفاعِ نحو ٢ إلى ١). رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of a small wooden toy cart seen from the side on a simple ground line: a wooden box with visible planks, corner nails, a metal top rim, a small flag, and a tilted pull handle with a round grip. It has four wheels: **three round yellow wheels** with visible hubs and spokes, and **one square-shaped wheel in a flat solid red `#E84C5B`** with a hub and spokes like the others, fully enclosed by a thick closed black outline. Pure **white background `#FFFFFF`**, with no text, labels, or numbers, and no living creatures. The image is horizontally wide (aspect ratio about 2:1). Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- بعد التتبّع: سمِّ مسار العجلة المربعة `wheel-square` **وحيّد لونه إلى أصفر العجلات** (لا بيج هنا — التحييد لإخفاء التلميح اللوني لا لإظهار «غير ملوّن»).
- أعد حساب `spot` من موضع العجلة المربعة في الرسم الجديد (نِسَب مئوية من `viewBox`)، وأبقِ `r` كما هو ما لم يتغيّر حجم الهدف نسبياً.
- بوّابة الجودة قبل الإدراج كما في بند ١، ثم فحص الإطار على مصفوفة المنافذ (قاعدة فحص الإطار في `CLAUDE.md`).

---

## بند ٦ — `g2m-13-1` · السؤال الرابع (تحديد الأجزاء: مرطبانا التقدير)

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.

- **رمز السؤال:** `g2m-13-1` (التقدير، رياضيات الصف الثاني) — السؤال ④ `hotspot`.
- **الهدف:** `2Nn13: يعطي تقديراً منطقياً لعدد أشياء حتى ١٠٠`. المستوى: تطبيق.
- **نصّ السؤال:** «انقُرِ المِرطَبانَ الَّذي فيهِ حَوالَيْ ٥٠ خَرَزةً.»
- **اسم الملف العربي المقترح:** `images/مرطبانا-التقدير.png` (ومنه `مرطبانا-التقدير.svg`).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (المرطبان الممتلئ) · حدود مغلقة · بلا تداخل · لون توليد فريد لها.
- **قيد المحتوى الحاسم:** عددا الخرزات جزء من منطق السؤال — المرطبان الممتلئ **حوالي ٥٠ خرزة فعلاً** والقليل **~١٢** (يُعَدّان في الصورة المولّدة قبل الاعتماد، وإلا أُعيد التوليد).
- **قيد النسبة:** صورة عريضة (النسبة ≤ 2.2).

### المناطق التفاعلية (١)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| المرطبان الممتلئ (~٥٠) | `jar-many` | `#E84C9B` (وردي صريح على زجاجه) | يُحيَّد زجاجه إلى زجاج المرطبان الآخر نفسه — الدليل عددُ الخرزات لا لونُ المرطبان |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لمرطبانَين زجاجيَّين متجاورَين على خطِّ أرضٍ بسيطٍ، لكلٍّ منهما غطاءٌ معدنيٌّ بُنيٌّ وعنقٌ ولمعةُ زجاجٍ بيضاءُ بسيطةٌ، بحدودٍ خارجيةٍ سوداءَ سميكةٍ مغلقةٍ. المرطبانُ الأولُ (على اليمين) فيه **اثنتا عشرةَ خرزةً ملوّنةً فقط** مستقرّةً في قاعِه، والمرطبانُ الثاني (على اليسار) **زجاجُهُ بلونٍ ورديٍّ مسطّحٍ صريحٍ `#E84C9B`** وهو **مملوءٌ بحوالي خمسينَ خرزةً ملوّنةً** مرصوصةً حتى ثُلثَيهِ. الخرزاتُ دوائرُ مصمتةٌ بألوانٍ متنوعةٍ (برتقالي، أخضر، أصفر، بنفسجي، أحمر) بحدودٍ داكنة. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو أرقامٍ، وبلا كائناتٍ حيّة. الصورةُ عريضةٌ أفقياً (نحو ٢ إلى ١). رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of two glass jars side by side on a simple ground line, each with a brown metal lid, a neck, and a simple white glass shine, all with thick closed black outlines. The first jar (on the right) contains **only twelve colored beads** resting at its bottom; the second jar (on the left) has its **glass in a flat solid pink `#E84C9B`** and is **filled with about fifty colored beads** packed up to two-thirds of its height. The beads are solid circles in varied colors (orange, green, yellow, purple, red) with dark outlines. Pure **white background `#FFFFFF`**, no text or numbers, no living creatures. The image is horizontally wide (about 2:1). Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- **عُدَّ الخرزات في الصورة المولّدة** قبل أي شيء: الممتلئ ٤٥–٥٥ والقليل ١٠–١٤، وإلا أعد التوليد (العدد منطقُ السؤال).
- سمِّ مسار المرطبان الممتلئ `jar-many` وحيّد لون زجاجه إلى زجاج الآخر.
- أعد حساب `spot` من موضع المرطبان الممتلئ في الرسم الجديد.
- بوّابة الجودة ثم فحص الإطار كسابقيه.

---

## بند ٧ — `g4s-2-5` · السؤال الإثرائي (تلوين: الحشرة ودودة الأرض)

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.

- **رمز السؤال:** `g4s-2-5` (تمييز الحيوانات اللافقارية، علوم الصف الرابع) — السؤال الإثرائي `color`.
- **الهدف:** `4Be2: يستخدم مفتاحاً تعريفياً مبسّطاً`. المستوى: تطبيق.
- **نصّ السؤال:** «لوّن الحشرةَ (ذاتَ الستِّ أرجلٍ) بالأخضرِ، والكائنَ اللافقاريَّ الذي ليس حشرةً بالبنّيِّ.»
- **اسم الملف العربي المقترح:** `images/حشرة-ودودة-تلوين.png` (ومنه `حشرة-ودودة-تلوين.svg`).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقتان تفاعليتان (≤٤) · حدود مغلقة · بلا تداخل · لون توليد فريد لكلٍّ.
- **قيد المحتوى الحاسم:** الحشرة **بستّ أرجل بالضبط** (تُعَدّ في الصورة قبل الاعتماد — عدد الأرجل هو منطق السؤال)، **وبلا ملامح وجه** لكلا الكائنين (قاعدة المشروع).

### المناطق التفاعلية (٢)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| جسم الحشرة (رأس/صدر/بطن) | `insect-body` | `#3AA0FF` (أزرق صريح) | يُحيَّد إلى `#E8E4DC` (اللون يكشف الإجابة) |
| جسم دودة الأرض | `worm-body` | `#F2C94C` (أصفر صريح) | يُحيَّد إلى `#E8E4DC` |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لكائنَين لافقاريَّين متجاورَين على خطِّ أرضٍ بسيطٍ فيه أعشابٌ صغيرةٌ: **حشرةٌ** واقفةٌ على اليمين مكوّنةٌ من رأسٍ وصدرٍ وبطنٍ مُقلَّمٍ، لها **ستُّ أرجلٍ مفصليةٍ بالضبط** وجناحانِ شفّافانِ فاتحانِ وقرنا استشعارٍ، **جسمُها كلُّه بلونٍ أزرقَ مسطّحٍ صريحٍ `#3AA0FF`**؛ و**دودةُ أرضٍ** على اليسار بجسمٍ متعرّجٍ مُقسَّمٍ إلى حلقاتٍ تزحفُ على كومةِ تربةٍ صغيرةٍ، **جسمُها كلُّه بلونٍ أصفرَ مسطّحٍ صريحٍ `#F2C94C`**. **بلا أيّ ملامحِ وجهٍ** (لا عيونَ ولا فم) لكلا الكائنَين، ولكلٍّ منهما حدٌّ خارجيٌّ أسودُ سميكٌ مغلقٌ، ولا يتداخلان. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا نصوصٍ أو أرقامٍ. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of two invertebrates side by side on a simple ground line with small grass tufts: an **insect** standing on the right, made of a head, thorax, and striped abdomen, with **exactly six jointed legs**, two light translucent-looking flat wings, and two antennae, its **entire body in a flat solid blue `#3AA0FF`**; and an **earthworm** on the left with a curved, ring-segmented body crawling over a small soil mound, its **entire body in a flat solid yellow `#F2C94C`**. **No facial features at all** (no eyes, no mouth) on either creature; each has a thick closed black outline and they do not overlap. Pure **white background `#FFFFFF`**, no text or numbers. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- **عُدَّ أرجل الحشرة في الصورة المولّدة**: ستٌّ بالضبط وإلا أعد التوليد، وتأكد من خلوّ الوجهين من الملامح.
- سمِّ المسارين `insect-body` و`worm-body` وحوّلهما إلى `cpart` بأسماء «الحشرة» و«دودة الأرض»، وحيّد اللونين إلى `#E8E4DC`.
- الأرجل والأجنحة وقرون الاستشعار والتربة مسارات ثابتة غير قابلة للنقر (كعظام العضلات في المرجع).
- بوّابة الجودة ثم فحص الإطار كسابقيه.

---

## بند ٨ — `g4s-1-6` · السؤال السادس (اكتشف الخطأ: كمية الدواء الكبيرة)

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.

- **رمز السؤال:** `g4s-1-6` (كيف تعمل الأدوية؟، علوم الصف الرابع) — السؤال الإثرائي `find-error`.
- **الهدف:** `4Bh11: يدرك أهمية أخذ الدواء بالجرعة والوقت المناسبين وبإشراف بالغ`. المستوى: استدلال.
- **نصّ السؤال:** «الطريقةُ الآمنةُ أن نأخذَ الجرعةَ المحدّدةَ فقط. اضغط على الخطأِ في هذا المشهدِ.»
- **اسم الملف العربي المقترح:** `images/يد-كمية-دواء.png` (ومنه `يد-كمية-دواء.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (كومة الأقراص كلّها) · حدود مغلقة · بلا تداخل بين المناطق · لون توليد فريد لها.
- **قيد المحتوى الحاسم:** **بلا ملامح وجه** (لا وجه في المشهد أصلاً — يدٌ فقط)، والكمية **كبيرة بوضوح** (١٢–١٤ قرصاً) لأن الكثرة هي الخطأ المطلوب اكتشافه.
- **قيد النسبة:** `viewBox` الحالي 600×450 (نسبة ١٫٣٣ ≤ 2.2) — تُحفظ الصورة المولّدة بنسبة ٤:٣.

### المناطق التفاعلية (١)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| كومة الأقراص في الكفّ | `pills-heap` | `#7B2FF2` (بنفسجي صريح على الأقراص كلّها) | **تُعاد إلى ألوان الأقراص الطبيعية** (أحمر `#e8736a` وكبسولات صفراء/زرقاء) — التحييد هنا لإزالة لون العزل لا لإخفاء تلميح |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً ليدٍ بشريةٍ مفتوحةٍ راحتُها إلى الأعلى بسُلَّمِ بشرةٍ `#F2C3A0` ← `#E0A87F` ← `#C88A5E`، تُرى من الأمام، لها **أربعُ أصابعَ ممتدةٍ إلى الأعلى وإبهامٌ مائلٌ إلى الجانب**، بمفاصلَ ظاهرةٍ كخطوطٍ قصيرةٍ وتجاعيدِ راحةٍ، ولها معصمٌ وكُمُّ قميصٍ سماويٌّ بسُلَّمِ `#40C0FF` ← `#20A0FF` ← `#2080E0` عند الأسفل. في راحةِ اليدِ **كومةٌ كبيرةٌ من نحوِ اثنَي عشرَ قرصَ دواءٍ** مكدّسةً في ثلاثِ طبقاتٍ، **جميعُها بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2`**، بعضُها أقراصٌ دائريةٌ بخطٍّ فاصلٍ في المنتصفِ وسماكةِ حافّةٍ ظاهرةٍ وبعضُها كبسولاتٌ مستطيلةٌ مستديرةُ الطرفَين، وتحتَ الكومةِ **ظلُّ تماسٍّ باهتٌ** في الكفّ. وفي أعلى اليمينِ **زجاجةُ دواءٍ برتقاليةٌ مائلةٌ بسُلَّمِ `#FF8000` ← `#FF6000` ← `#E04000` ← `#C04000`** فمُها متّجهٌ نحوَ اليدِ، لها غطاءٌ أحمرُ `#FF2020` مضلّعٌ وعنقٌ وملصقٌ أبيضُ `#F9F8F3` عليه صليبٌ أحمرُ وسطران، ولمعةٌ بيضاءُ عريضةٌ على زجاجِها المنحني، ومنها **يتساقطُ قرصانِ في الهواءِ** نحوَ الكومة. **بلا أيّ وجهٍ أو ملامحَ** في المشهد — لا على اليدِ ولا على الزجاجةِ ولا على الأقراص. **ولا خطَّ أرضٍ** (المشهدُ طافٍ لا يستقرُّ على أرض). الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا نصوصٍ أو أرقامٍ. نسبةُ الصورةِ ٤:٣ أفقية. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of an open human hand in a skin ramp `#F2C3A0` / `#E0A87F` / `#C88A5E`, palm facing up, seen from the front, with **four fingers extending upward and a thumb angled to the side**, showing knuckle creases as short lines and palm creases, with a wrist and a sky-blue shirt cuff in the ramp `#40C0FF` / `#20A0FF` / `#2080E0` at the bottom. In the palm is a **large heap of about twelve medicine tablets** stacked in three layers, **all in a flat solid purple `#7B2FF2`**, some being round tablets with a score line across the middle and a visible edge thickness, and some being rounded-end capsules, with a **soft contact shadow** beneath the heap in the palm. In the upper right is a **tilted orange medicine bottle in the ramp `#FF8000` / `#FF6000` / `#E04000` / `#C04000`** with its mouth pointing toward the hand, having a ridged red `#FF2020` cap, a neck, a white `#F9F8F3` label with a red cross and two lines, and a broad white gloss highlight on its curved glass; **two tablets fall through the air** from it toward the heap. **No face or facial features anywhere** in the scene — not on the hand, the bottle, or the tablets. **No ground line** (the scene floats and rests on nothing). Pure **white background `#FFFFFF`**, no text or numbers. Image aspect ratio 4:3 horizontal. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- **عُدَّ الأقراص في الصورة المولّدة**: ١٢–١٤ قرصاً (الكثرة منطقُ السؤال) وإلا أعد التوليد.
- بعد التتبّع: ادمج مسارات الأقراص في مجموعةٍ واحدةٍ باسم `pills-heap`، ثمّ **أعد ألوانها الطبيعية** (أحمر وكبسولات صفراء/زرقاء) — البنفسجي مفتاحُ عزلٍ لا لونٌ نهائيّ.
- أعد حساب `spot` من مركز الكومة في الرسم الجديد، **وتحقّق أن القرصَين المتساقطَين داخل الدائرة** وأن فمَ الزجاجةِ خارجَها (المسافة في فضاء النسب المئوية لا البكسل — المحور الرأسيّ أضيق فيكبر وزنُه).
- بوّابة الجودة ثم فحص الإطار كسابقيه.

---

## بند ٩ — `g3s-3-1` · السؤال الرابع (تحديد الأجزاء: الكائن الحيّ بين الأشياء غير الحيّة)

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٧ — بالمسارِ النقطيِّ لا بالتتبّع.** الصورةُ وُلِّدَت بلونِ العزلِ ثمّ
> حُيِّدَ لونُها برمجياً (تدويرُ صبغةٍ يحفظُ حزمَ التظليل)، وأُودِعَت ملفّاً في `images/`
> و`spot` **مستطيلٌ مقيسٌ بالبكسل**. **ولم يُستعمَلْ `vtracer`**: إجابةُ `hotspot`/`find-error`
> تُقاسُ بنسبةٍ مئويةٍ من صندوقِ الرسمِ لا بمساراتِه، فالتتبّعُ كلفةٌ بلا مقابل.

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.
> **الصورة تخدم سؤالَين:** `g3s-3-1` السؤال الرابع (الهدف = الفراشة) و`g3s-3-6` السؤال الرابع (الهدف = الحاسوب) — رسمٌ واحدٌ، و`spot` مختلف لكلٍّ.

- **رمز السؤال:** `g3s-3-1` (الكائنات الحية والأشياء غير الحية، علوم الصف الثالث) — السؤال الرابع `hotspot`.
- **الهدف:** `3Bh2: يصف الاختلافات بين الكائنات الحية والأشياء غير الحية من خلال معرفتهم عن العمليّات الحيويّة`. المستوى: تطبيق.
- **نصّ السؤال:** «اضغَطْ على الكائِنِ الحَيِّ.»
- **اسم الملف العربي المقترح:** `images/حي-وغير-حي.png` (ومنه `حي-وغير-حي.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (الفراشة) · حدود مغلقة · بلا تداخل · لون توليد فريد لها.
- **قيد المحتوى الحاسم:** **بلا ملامح وجه** على الفراشة (لا عيون ولا فم) — قاعدة إلزامية. والأجسام الثلاثة **متباعدةٌ لا تتلامس** لأن دائرةَ الإصابة تُقاس بالنسب المئوية فالتقاربُ يُدخل جسماً مُلهياً في الدائرة.
- **قيد النسبة:** `viewBox` الحالي 620×320 (نسبة ١٫٩٤ ≤ 2.2) — تُحفظ الصورة المولّدة بنسبة ١٦:٩ تقريباً.

### المناطق التفاعلية (١)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| الفراشة كاملةً | `living-butterfly` | `#7B2FF2` (بنفسجي صريح على الجناحين والجسم) | **تُعاد إلى ألوانها البرتقالية** `#FF8000` ← `#FF6000` ← `#E04000` ← `#C04000` — التحييد لإزالة لون العزل لا لإخفاء تلميح |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لثلاثةِ أشياءَ منفصلةٍ متباعدةٍ على صفٍّ أفقيٍّ واحد: على اليمينِ **فراشةٌ منشورةُ الجناحين** بأربعةِ أجنحةٍ مستديرةٍ عليها بقعٌ دائريةٌ وجسمٍ مجزّأٍ وقرنَي استشعارٍ منتهيَينِ بكرتَينِ صغيرتَين، **بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` على جناحَيها وجسمِها كلِّه**؛ وفي الوسطِ **حاسوبٌ مكتبيٌّ** بشاشةٍ رماديةٍ `#808080` معروضٌ عليها لونٌ سماويٌّ `#40C0FF` وشريطٌ أزرقُ أسفلَها، وله عنقٌ وقاعدةٌ ولوحةُ مفاتيحَ رماديةٌ فاتحةٌ `#C0C0C0` بمفاتيحَ ظاهرة؛ وعلى اليسارِ **صخرةٌ ملساءُ** رماديةٌ بسُلَّمِ `#C0C0C0` ← `#808080` ← `#606060` ← `#404040` بحزامٍ فاتحٍ يتبعُ حافّتَها العلويةَ وحزامٍ غامقٍ يتبعُ قاعدتَها وشقٍّ رفيعٍ في وسطِها. **الأشياءُ الثلاثةُ متباعدةٌ لا يلمسُ أحدُها الآخرَ**، ولا يتكرّرُ لونُ الفراشةِ في غيرِها. **بلا أيِّ ملامحِ وجهٍ على الفراشةِ** ولا على أيِّ شيءٍ في المشهد. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو تسمياتٍ أو أرقامٍ. نسبةُ الصورةِ عريضةٌ نحو ١٦:٩. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of three separate, well-spaced objects in a single horizontal row: on the right a **butterfly with open wings**, four rounded wings bearing circular spots, a segmented body, and two antennae ending in small balls, rendered in a **flat solid purple `#7B2FF2` across its wings and whole body**; in the middle a **desktop computer** with a grey `#808080` monitor showing a sky-blue `#40C0FF` screen with a darker blue band at its base, plus a stand, a tower, and a light grey `#C0C0C0` keyboard with visible keys; on the left a **smooth grey rock** in the ramp `#C0C0C0` / `#808080` / `#606060` / `#404040`, with a lighter band following its upper edge, a darker band following its base, and a fine crack across its middle. The **three objects are well separated and never touch**, and the butterfly's colour is not repeated anywhere else. **No facial features on the butterfly** or on anything in the scene. Pure **white background `#FFFFFF`**, with no text, labels, or numbers. Wide image aspect ratio, roughly 16:9. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- بعد التتبّع: ادمج مسارات الفراشة في مجموعةٍ باسم `living-butterfly` وأعد ألوانها البرتقالية.
- **أعد حساب `spot` مرّتين** — مرّةً على مركز الفراشة لـ`g3s-3-1` ومرّةً على مركز الشاشة لـ`g3s-3-6` — ثمّ **امسح الدائرتين شبكياً** للتأكّد أن دائرةَ كلٍّ لا تلمسُ صندوقَ جسمٍ آخر (القياسُ في فضاء النسب المئوية: المحور الرأسيّ أضيق فيكبر وزنُه).
- بوّابة الجودة ثمّ فحص الإطار.

---

## بند ١٠ — `g3s-3-2` · السؤال الرابع (تحديد الأجزاء: مرحلة البذرة)

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٧ — بالمسارِ النقطيِّ لا بالتتبّع.** الصورةُ وُلِّدَت بلونِ العزلِ ثمّ
> حُيِّدَ لونُها برمجياً (تدويرُ صبغةٍ يحفظُ حزمَ التظليل)، وأُودِعَت ملفّاً في `images/`
> و`spot` **مستطيلٌ مقيسٌ بالبكسل**. **ولم يُستعمَلْ `vtracer`**: إجابةُ `hotspot`/`find-error`
> تُقاسُ بنسبةٍ مئويةٍ من صندوقِ الرسمِ لا بمساراتِه، فالتتبّعُ كلفةٌ بلا مقابل.

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.

- **رمز السؤال:** `g3s-3-2` (النمو والتغذية، علوم الصف الثالث) — السؤال الرابع `hotspot`.
- **الهدف:** `3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر`. المستوى: تطبيق.
- **نصّ السؤال:** «اضغَطْ على مَرحَلةِ البَذرةِ.»
- **اسم الملف العربي المقترح:** `images/مراحل-نمو-النبتة.png` (ومنه `مراحل-نمو-النبتة.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (البذرة المفردة) · حدود مغلقة · بلا تداخل · لون توليد فريد لها.
- **قيد المحتوى الحاسم:** المراحلُ **أربعٌ بالترتيب من اليمين إلى اليسار** كما في كتاب التلميذ (بذرة ← تبدأ بالنمو ← نبتة صغيرة ← نبتة زهرية كاملة)، لأن السؤال الخامس في الدرس نفسِه يرتّبها. والأرقامُ **لا تُكتَب في الصورة** (تُضاف نصّاً في الـSVG بعد التتبّع).
- **قيد النسبة:** `viewBox` الحالي 700×330 (نسبة ٢٫١٢ ≤ 2.2) — تُحفظ الصورة المولّدة بنسبة ٢:١ تقريباً.

### المناطق التفاعلية (١)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| البذرة المفردة (المرحلة الأولى) | `stage-seed` | `#7B2FF2` (بنفسجي صريح) | **تُعاد إلى لونها الكهرمانيّ** `#C06000` مع لمعةٍ `#E08000` |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لأربعِ مراحلَ من نُمُوِّ نبتةٍ مصفوفةً على صفٍّ أفقيٍّ واحدٍ **من اليمينِ إلى اليسارِ**، متباعدةً لا تتلامس: **أوّلاً على أقصى اليمين بذرةٌ بيضويةٌ مفردةٌ** بلونٍ **بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2`**؛ **ثمّ البذرةُ نفسُها وقد بدأت تنمو** بلونها الكهرمانيِّ `#C06000` يخرجُ منها جُذَيرٌ رفيعٌ إلى الأسفلِ وبُرعمٌ أخضرُ صغيرٌ إلى الأعلى؛ **ثمّ نبتةٌ صغيرةٌ** لها ساقٌ أخضرُ وثلاثُ أوراقٍ بسُلَّمِ `#80C020` ← `#60C020` ← `#4A9018` وجذورٌ رفيعةٌ؛ **وأخيراً على أقصى اليسارِ نبتةٌ زهريةٌ كاملةٌ** لها ساقٌ طويلٌ وأوراقٌ وزهرةٌ برتقاليةٌ بخمسِ بتلاتٍ `#FF8000` وقلبٍ أصفرَ `#FFFFC0`. المراحلُ **متدرّجةٌ في الحجمِ تصاعدياً** فيُرى النموُّ بوضوح، ولا يتكرّرُ البنفسجيُّ في غيرِ البذرةِ الأولى. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا أيّ نصوصٍ أو أرقامٍ أو أسهمٍ أو تسمياتٍ. نسبةُ الصورةِ عريضةٌ نحو ٢:١. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of four stages of a plant's growth arranged in one horizontal row **from right to left**, well spaced and never touching: **first, at the far right, a single oval seed** in a **flat solid purple `#7B2FF2`**; **then the same seed beginning to germinate**, in its amber colour `#C06000`, with a thin rootlet growing downward and a small green shoot growing upward; **then a small plant** with a green stem, three leaves in the ramp `#80C020` / `#60C020` / `#4A9018`, and thin roots; **and finally, at the far left, a fully grown flowering plant** with a tall stem, leaves, and an orange five-petalled flower `#FF8000` with a yellow `#FFFFC0` centre. The stages **increase in size progressively** so the growth is obvious, and the purple is not repeated anywhere except the first seed. Pure **white background `#FFFFFF`**, with no text, numbers, arrows, or labels. Wide image aspect ratio, roughly 2:1. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- **تحقّق من ترتيب المراحل** في الصورة المولّدة (البذرةُ على أقصى اليمين) وإلا أعد التوليد — الترتيبُ يمينيٌّ لأن القراءةَ عربية.
- أضِف أرقامَ المراحل ١–٤ **نصّاً في الـSVG** بعد التتبّع لا في الصورة.
- أعد حساب `spot` من مركز البذرة، وتحقّق أن الدائرةَ **لا تلمسُ صندوقَ المرحلةِ الثانية** (وهي أقربُ الملهيات).
- بوّابة الجودة ثمّ فحص الإطار.

---

## بند ١١ — `g3s-3-3` · السؤال الإثرائي (اكتشف الخطأ: النبتة المائلة بعيداً عن الضوء)

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٧ — بالمسارِ النقطيِّ لا بالتتبّع.** الصورةُ وُلِّدَت بلونِ العزلِ ثمّ
> حُيِّدَ لونُها برمجياً (تدويرُ صبغةٍ يحفظُ حزمَ التظليل)، وأُودِعَت ملفّاً في `images/`
> و`spot` **مستطيلٌ مقيسٌ بالبكسل**. **ولم يُستعمَلْ `vtracer`**: إجابةُ `hotspot`/`find-error`
> تُقاسُ بنسبةٍ مئويةٍ من صندوقِ الرسمِ لا بمساراتِه، فالتتبّعُ كلفةٌ بلا مقابل.

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.

- **رمز السؤال:** `g3s-3-3` (الحركة والتكاثر، علوم الصف الثالث) — السؤال الإثرائي `find-error`.
- **الهدف:** `3Bh1: يعرف أن العمليات الحيوية المشتركة بين الإنسان والحيوان تشمل التغذية والحركة والنمو والتكاثر`. المستوى: استدلال.
- **نصّ السؤال:** «إحدى النَّبتَتَينِ تَميلُ في الاتِّجاهِ الخَطأِ — اضغَطْ عَلَيها.»
- **اسم الملف العربي المقترح:** `images/نبتتان-نحو-الضوء.png` (ومنه `نبتتان-نحو-الضوء.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (النبتة المائلة خطأً) · حدود مغلقة · بلا تداخل · لون توليد فريد لها.
- **قيد المحتوى الحاسم:** الميلُ **صريحٌ ومتعاكسٌ** بين النبتتَين، والنافذةُ **في جهةٍ واحدةٍ فقط** — فإن غمضَ الاتجاهُ ضاعَ الخطأُ المطلوبُ اكتشافُه. والأصيصانِ **متطابقانِ في الشكلِ واللون** فلا يُميَّزانِ إلا بالميل.
- **قيد النسبة:** `viewBox` الحالي 640×400 (نسبة ١٫٦٠ ≤ 2.2) — تُحفظ الصورة المولّدة بنسبة ٨:٥.

### المناطق التفاعلية (١)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| النبتة المائلة بعيداً عن الضوء (ساقُها وأوراقُها دون أصيصِها) | `plant-wrong-lean` | `#7B2FF2` (بنفسجي صريح) | **تُعاد إلى أخضرِها** `#80C020` ← `#60C020` ← `#4A9018` كي تُطابقَ النبتةَ الصحيحةَ تماماً — فلا يهتدي الطالبُ باللونِ بل بالاتجاه |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لمشهدٍ فيه **نافذةٌ على أقصى اليمين** إطارُها أسودُ رفيعٌ وزجاجُها سماويٌّ بسُلَّمِ `#40C0FF` ← `#20A0FF` ← `#2080E0` عليه لمعةٌ بيضاءُ عريضةٌ مائلةٌ، ويخرجُ منها **ثلاثةُ أشعّةِ ضوءٍ صفراءَ `#E0C060`** مستقيمةٌ متّجهةٌ إلى اليسار. وأمامَ النافذةِ **أصيصانِ متطابقانِ تماماً** كهرمانيّانِ بسُلَّمِ `#C06000` ← `#E08000` بحافّةٍ علويةٍ عريضة. في الأصيصِ **الأقربِ إلى النافذةِ نبتةٌ خضراءُ** بسُلَّمِ `#80C020` ← `#60C020` ← `#4A9018` **ساقُها منحنٍ بوضوحٍ نحوَ النافذةِ (إلى اليمين)** وأوراقُها الثلاثُ مائلةٌ نحوَ الضوء. وفي الأصيصِ **الأبعدِ نبتةٌ مماثلةٌ في الشكلِ والحجمِ تماماً** لكنّ **ساقَها منحنٍ في الاتّجاهِ المعاكسِ بعيداً عن النافذةِ (إلى اليسار)**، وهي **بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` على ساقِها وأوراقِها** دونَ أصيصِها. الميلانِ **متعاكسانِ وواضحانِ** لا يلتبسان. **بلا أيِّ ملامحِ وجهٍ** على النبتتَينِ ولا على شيءٍ في المشهد. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا نصوصٍ أو أسهمٍ أو تسمياتٍ. نسبةُ الصورةِ ٨:٥ أفقية. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of a scene with a **window at the far right**, its frame a thin black outline and its glass sky-blue in the ramp `#40C0FF` / `#20A0FF` / `#2080E0` with a broad diagonal white gloss, emitting **three straight yellow `#E0C060` light rays** pointing left. In front of the window stand **two completely identical amber flowerpots** in the ramp `#C06000` / `#E08000` with a wide top rim. In the pot **nearer the window is a green plant** in the ramp `#80C020` / `#60C020` / `#4A9018` whose **stem bends clearly toward the window (to the right)**, its three leaves angled toward the light. In the **farther pot is a plant identical in shape and size**, but whose **stem bends the opposite way, away from the window (to the left)**, rendered in a **flat solid purple `#7B2FF2` on its stem and leaves** but not its pot. The two leans are **opposite and unmistakable**. **No facial features** on either plant or anything in the scene. Pure **white background `#FFFFFF`**, with no text, arrows, or labels. Image aspect ratio 8:5 horizontal. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- **تحقّق أن الميلَين متعاكسان فعلاً** في الصورة المولّدة (النماذجُ تميلُ إلى رسمِ نبتتَينِ متشابهتَينِ في الاتجاه) — وإلا أعد التوليد؛ فإن اتّفقَ الميلانِ ضاعَ السؤالُ كلُّه.
- بعد التتبّع: ادمج ساقَ النبتةِ الخطأِ وأوراقَها في مجموعةٍ باسم `plant-wrong-lean` وأعد لونَها الأخضرَ **مطابقاً للنبتةِ الصحيحة**.
- أعد حساب `spot` من مركز كتلةِ النبتةِ الخطأِ (لا من أصيصِها)، وتحقّق أن الدائرةَ لا تلمسُ النبتةَ الصحيحةَ ولا النافذة.
- بوّابة الجودة ثمّ فحص الإطار.

---

## بند ١٢ — `g3s-3-5` · السؤال الرابع (تحديد الأجزاء: الحيوان ذو الحراشف)

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٧ — بالمسارِ النقطيِّ لا بالتتبّع.** الصورةُ وُلِّدَت بلونِ العزلِ ثمّ
> حُيِّدَ لونُها برمجياً (تدويرُ صبغةٍ يحفظُ حزمَ التظليل)، وأُودِعَت ملفّاً في `images/`
> و`spot` **مستطيلٌ مقيسٌ بالبكسل**. **ولم يُستعمَلْ `vtracer`**: إجابةُ `hotspot`/`find-error`
> تُقاسُ بنسبةٍ مئويةٍ من صندوقِ الرسمِ لا بمساراتِه، فالتتبّعُ كلفةٌ بلا مقابل.

> بند بموجب «قاعدة التفصيل البصري» (`CLAUDE.md`) — الرسم اليدوي الغنيّ الحالي في `js/questions.js` جسرٌ مؤقت.

- **رمز السؤال:** `g3s-3-5` (تصنيف الكائنات الحية، علوم الصف الثالث) — السؤال الرابع `hotspot`.
- **الهدف:** `3Bh6: يصنف الكائنات الحيّة إلى مجموعات باستخدام سمات بسيطة ووصف الأساس المنطقي لهذا التصنيف`. المستوى: تطبيق.
- **نصّ السؤال:** «اضغَطْ على الحَيَوانِ ذي الحَراشِفِ.»
- **اسم الملف العربي المقترح:** `images/حراشف-فرو-ريش.png` (ومنه `حراشف-فرو-ريش.svg` بعد التتبّع).
- **نتيجة البوّابة:** ✅ **مرّ** — منطقة تفاعلية واحدة (السمكة) · حدود مغلقة · بلا تداخل · لون توليد فريد لها.
- **قيد المحتوى الحاسم:** **بلا ملامح وجه** على أيِّ حيوان (لا عيونَ ولا مناقيرَ ولا أفواه) — قاعدة إلزامية؛ فالتمييزُ **بغطاءِ الجسمِ وحدَه**: حراشفُ ظاهرةٌ على السمكةِ، وفروٌ على الدبِّ، وريشٌ مصفوفٌ على الطائر. وهذا الغطاءُ **هو موضوعُ السؤال** فيجبُ أن يكونَ أوضحَ ما في كلِّ حيوان.
- **قيد النسبة:** `viewBox` الحالي 640×300 (نسبة ٢٫١٣ ≤ 2.2) — تُحفظ الصورة المولّدة بنسبة ٢:١ تقريباً.

### المناطق التفاعلية (١)

| المنطقة | المعرّف | لون التوليد (مفتاح العزل) | المعالجة بعد التتبّع |
|---------|---------|---------------------------|----------------------|
| السمكة كاملةً | `animal-scales-fish` | `#7B2FF2` (بنفسجي صريح على الجسم والزعانف والذيل) | **تُعاد إلى أزرقِها المحيطيِّ** `#00A0E0` ← `#0080C0` ← `#0060A0` ← `#004880` |

### البرومبت الكامل (يُلصق في ChatGPT/DALL·E — صورة واحدة)

**عربي:**
> أنشئ رسماً تعليمياً لثلاثةِ حيواناتٍ منفصلةٍ متباعدةٍ على صفٍّ أفقيٍّ واحد: على اليمينِ **سمكةٌ** جسمُها بيضويٌّ ممتلئٌ وذيلُها مشقوقٌ ولها زعنفةٌ ظهريةٌ وأخرى بطنيةٌ، **وعلى جسمِها ثلاثةُ صفوفٍ واضحةٍ من الحراشفِ المقوّسة**، وهي كلُّها بلونٍ **بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2`**؛ وفي الوسطِ **دُبٌّ جالسٌ** جسمُه دائريٌّ ممتلئٌ ورأسُه دائريٌّ عليه أذنانِ مستديرتان وله كفّانِ أماميّانِ، بلونٍ كهرمانيٍّ بسُلَّمِ `#C06000` ← `#E08000` ← `#984800` **وعلى جانبِ جسمِه خصلاتُ فروٍ قصيرةٌ منحنيةٌ**؛ وعلى اليسارِ **طائرٌ** جسمُه بيضويٌّ ورأسُه دائريٌّ عليه عُرفٌ صغيرٌ ولهُ ساقانِ نحيلتانِ صفراوانِ `#E0C060` وذيلٌ من ثلاثِ ريشاتٍ مدبّبةٍ، بلونٍ سماويٍّ بسُلَّمِ `#40C0FF` ← `#20A0FF` ← `#2080E0` **وجناحُه مرسومٌ بثلاثِ طبقاتٍ من الريشِ المصفوف**. الحيواناتُ **متباعدةٌ لا يلمسُ أحدُها الآخرَ**، ولا يتكرّرُ البنفسجيُّ في غيرِ السمكة. **بلا أيِّ ملامحِ وجهٍ على أيِّ حيوانٍ إطلاقاً — لا عيونَ ولا مناقيرَ ولا أفواه**، والتمييزُ بغطاءِ الجسمِ وحدَه. الخلفيةُ **بيضاءُ نقيّةٌ `#FFFFFF`** بلا نصوصٍ أو تسمياتٍ. نسبةُ الصورةِ عريضةٌ نحو ٢:١. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى. صورة واحدة مستقلّة فقط.

**English:**
> Create an educational illustration of three separate, well-spaced animals in a single horizontal row: on the right a **fish** with a plump oval body, a forked tail, a dorsal fin and a ventral fin, and **three clear rows of curved scales across its body**, rendered entirely in a **flat solid purple `#7B2FF2`**; in the middle a **sitting bear** with a round plump body, a round head with two rounded ears, and two front paws, in an amber ramp `#C06000` / `#E08000` / `#984800`, **with short curved fur tufts along the side of its body**; on the left a **bird** with an oval body, a round head bearing a small crest, two slender yellow `#E0C060` legs, and a tail of three pointed feathers, in a sky-blue ramp `#40C0FF` / `#20A0FF` / `#2080E0`, **its wing drawn as three layered rows of feathers**. The animals are **well separated and never touch**, and the purple is not repeated anywhere except the fish. **Absolutely no facial features on any animal — no eyes, no beaks, no mouths**; the animals are told apart by body covering alone. Pure **white background `#FFFFFF`**, with no text or labels. Wide image aspect ratio, roughly 2:1. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow. One single standalone image only.

### ملاحظات الجولة الثانية لهذا البند
- **افحص الوجوهَ أوّلاً**: النماذجُ تُصرُّ على إضافةِ عيونٍ ومناقيرَ للحيوانات — إن ظهرَ أيُّ ملمحِ وجهٍ أعد التوليدَ ولا تُصلِحْه بالتحرير.
- **تحقّق أن غطاءَ الجسمِ الثلاثيَّ ظاهرٌ** (حراشف/فرو/ريش) وإلا فقدَ السؤالُ مِعيارَه.
- بعد التتبّع: ادمج مسارات السمكة في مجموعةٍ باسم `animal-scales-fish` وأعد لونَها الأزرق.
- أعد حساب `spot` من مركز جسمِ السمكة، وتحقّق أن الدائرةَ لا تلمسُ الدُبَّ (أقربُ الملهيات).
- بوّابة الجودة ثمّ فحص الإطار.

---

# بنودُ علومِ الصفِّ الثالث — سُجِّلَت ٢٠٢٦-٠٨-٢٧

مسحٌ كاملٌ لأسئلةِ الكتابِ الستِّ والتسعين: **٢٢ سؤالاً تحملُ رسماً**، خمسةٌ منها أُنجِزَت (البنودُ ٩–١٢)، **وسبعةَ عشرَ بقيَت**. هذه البنودُ تُغطّي **أربعةَ عشرَ منها بعشرِ صورٍ** — لأنّ صورةً واحدةً قد تخدمُ أكثرَ من سؤال.

## ⛔ وثلاثةٌ أسقطَتْها البوّابةُ صراحةً

| السؤال | النوع | العلّة |
|---|---|---|
| `g3s-1-4#6` | `slider` | **مقياسُ حرارةٍ عدديّ** — رسمٌ هندسيٌّ صرفٌ، و`CLAUDE.md` تنصُّ أنّه لا يدخلُ طابورَ الترقية |
| `g3s-2-4#6` | `slider` | **مقياسُ ساعاتِ نومٍ عدديّ** — كذلك |
| `g3s-3-6#6` | `color` | **ستُّ مناطقَ تلوينٍ** والبوّابةُ تشترطُ **≤ ٤**. ولا يُغيَّرُ الهدفُ التعليميُّ بل يبقى الرسمُ يدوياً — «المحتوى يقودُ الأداةَ لا العكس» |

> **ولونُ العزلِ في كلِّ البنودِ أدناهُ `#7B2FF2`** ما لم يُذكَرْ غيرُه — بنفسجيٌّ صريحٌ لا يردُ في سلالمِ ورقةِ المواصفاتِ فلا يلتبسُ بلونٍ حقيقيّ.


---

## بند ١٣ — `نبتة-كاملة`

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٨ — بمخرَجَين لا مخرَجٍ واحد:**
> - **`images/نبتة-كاملة.png`** (‏681×900) — الصورةُ اللامعةُ محيَّدةُ الصبغةِ إلى ألوانِها
>   الطبيعية (جذورٌ تربةٌ · ساقٌ وأوراقٌ أخضرُ · أزهارٌ أحمرُ)، لِأسئلةِ **التحديدِ الثلاثة**.
> - **`نبتة-كاملة.svg`** مضمَّناً في سؤالِ **التلوين** — متتبَّعٌ بـ`vtracer` (‏١٥ مساراً ·
>   ٢١٫٤KB · بلا `<style>` · التعبئةُ سمةٌ)، الجذورُ والساقُ والأزهارُ محيَّدةٌ إلى `#E8E4DC`
>   والأوراقُ خضراءُ `#60C020`.
>
> **ولماذا التتبّعُ لسؤالٍ واحدٍ فقط:** إجابةُ `hotspot` نسبةٌ مئويةٌ من صندوقِ الرسمِ لا
> مسارٌ فيه، فالنقطيُّ يكفيها ويخفُّ. أمّا التلوينُ فيحتاجُ **مساراً يُملأُ لكلِّ منطقة**.
>
> **وأمرانِ اقتضاهما البندُ في طبقةِ النوعِ المشتركة** (وُثِّقا في `نماذج-الأسئلة.md`):
> `spot` **مصفوفةً** — لأنّ «الأوراقَ» أربعةُ أجسامٍ حولَ الساقِ والمستطيلُ الجامعُ يبتلعُها،
> والساقُ **جوابُ `g3s-1-3` #٤**؛ و`cpart` على **عدّةِ عناصرَ** بالاسمِ نفسِه — لأنّ التتبّعَ
> أخرجَ الأزهارَ خمسةَ مساراتٍ ودمجُها يدفنُها تحتَ الحدِّ الأسود.
>
> **والتسطيحُ قبلَ التتبّعِ مقصود:** التدرّجُ الناعمُ يُخرِجُ عشراتِ المساراتِ ويُسقِطُ
> البوّابة، والمنطقةُ المُلوَّنةُ تعبئةٌ واحدةٌ فلا تحملُ حزماً أصلاً.

> **يخدمُ **أربعةَ** أسئلةٍ برسمٍ واحد.**

- **اسمُ الملف:** `images/نبتة-كاملة.png` (ومنه `نبتة-كاملة.svg` بعد التتبّع)
- **المسار:** **تتبّعٌ بـ`vtracer`** — لازمٌ لأنّ التلوينَ يحتاجُ مساراً يُملَأُ لكلِّ منطقة
- **الهدف:** 3Bp1 · 3Bp3 — أجزاء النبات، وامتصاصُ الماءِ ونقلُه
- **نسبةُ الـ`viewBox` الحالية:** ٦٠٠×٤٣٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-1-1` #٤ | `hotspot` | اضغَطْ على الجُزءِ الَّذي يَمْتَصُّ الماءَ مِنَ التُّربةِ. | **الجُذور** |
| `g3s-1-1` #٦ | `color` | لَوِّنْ أَجزاءَ النَّبتةِ: اختَرْ لَوناً مِنَ اللَّوحةِ ثُمَّ اضغَطِ الجُزءَ. | **الجذور والساق والأزهار** |
| `g3s-1-3` #٤ | `hotspot` | اضغَطْ على الجُزءِ الَّذي يَنقُلُ الماءَ مِنَ الجُذورِ إلى الأَوراقِ. | **السّاق** |
| `g3s-1-5` #٤ | `hotspot` | اضغَطْ على الجُزءِ الَّذي يَصنَعُ الغِذاءَ لِلنَّبتةِ. | **الأوراق** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| الجذور | `plant-roots` | `#7B2FF2` | تُعادُ إلى **التربة** `#B98551` ← `#9A6636` ← `#7A4C22` ← `#68411D` |
| الساق | `plant-stem` | `#00E5A0` | يُعادُ إلى **الأخضر** `#80C020` ← `#60C020` ← `#4A9018` ← `#356810` |
| الأوراق | `plant-leaves` | `#FF00A8` | تُعادُ إلى **الأخضر** نفسِه — فلا يفرّقُها لونٌ عن الساقِ بل شكلُها |
| الأزهار | `plant-flowers` | `#00A8FF` | تُعادُ إلى **الأحمر** `#FF4020` ← `#FF2020` ← `#E02000` ← `#B01800` |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لنبتةٍ واحدةٍ كاملةٍ من الجانب، قائمةً في وسطِ الإطار، وأجزاؤها الأربعةُ متمايزةٌ تمايزاً تامّاً: **جذورٌ** متفرّعةٌ تحتَ شريطِ تربةٍ أفقيٍّ في أسفلِ الصورة بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` يشملُ كلَّ خيطٍ من الجذور؛ و**ساقٌ** واحدةٌ قائمةٌ سميكةٌ ترتفعُ من التربةِ إلى أعلى الصورةِ بلونٍ أخضرَ فيروزيٍّ مسطّحٍ صريحٍ `#00E5A0` وحدَه؛ و**أربعُ أوراقٍ** كبيرةٍ بيضويّةٍ بعِرقٍ أوسطَ ظاهر، ورقتانِ على كلِّ جانبٍ من الساق، بلونٍ ورديٍّ مسطّحٍ صريحٍ `#FF00A8`؛ و**زهرتانِ** في أعلى الساقِ بخمسِ بتلاتٍ مستديرةٍ ومركزٍ دائريّ، بلونٍ سماويٍّ مسطّحٍ صريحٍ `#00A8FF`. **لا يتكرّرُ أيٌّ من هذه الألوانِ الأربعةِ في غيرِ جزئِه**، والأجزاءُ **لا يتداخلُ بعضُها في بعض**: الأوراقُ تلتقي الساقَ بحدٍّ واضحٍ ولا تعبرُها، والزهرتانِ فوقَ الساقِ لا تلمسانِ الأوراق. شريطُ التربةِ بنّيٌّ `#9A6636` وليس بنفسجياً. نسبةُ الصورةِ نحو ١٤:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of ONE whole plant seen from the side, standing in the centre of the frame, with its four parts completely distinct: **roots** branching below a horizontal soil strip at the bottom, in flat solid purple `#7B2FF2` covering every root thread; ONE thick upright **stem** rising from the soil to the top, in flat solid turquoise-green `#00E5A0` and nothing else; **four large oval leaves** with a visible midrib, two on each side of the stem, in flat solid pink `#FF00A8`; and **two flowers** at the top of the stem, each with five rounded petals and a round centre, in flat solid sky-blue `#00A8FF`. **None of these four colours appears anywhere except on its own part**, and the parts **never overlap**: leaves meet the stem at a clean edge and do not cross it, and the flowers sit above the stem without touching the leaves. The soil strip is brown `#9A6636`, not purple. Image aspect ratio roughly 14:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- **هذا البندُ يخدمُ أربعةَ أسئلةٍ برسمٍ واحد** — ثلاثةُ `hotspot` بأهدافٍ مختلفةٍ وسؤالُ تلوينٍ واحد.
- **والتتبّعُ لازمٌ هنا** (بخلافِ بنودِ التحديدِ الخالصة): سؤالُ التلوينِ يحتاجُ كلَّ منطقةٍ **مساراً يُملأ** (`cpart`)، فلا يكفي ملفٌّ نقطيّ.
- بعدَ التتبّع: تُحيَّدُ **الجذورُ والساقُ والأزهارُ** إلى `#E8E4DC` لأنّها مناطقُ التلوينِ الثلاث؛ **والأوراقُ تبقى خضراءَ** فليست منطقةَ تلوين.
- ثمّ يُعادُ حسابُ `spot` **ثلاثَ مرّات** — الجذورُ ثمّ الساقُ ثمّ الأوراقُ — **مستطيلاً لا دائرةً** لأنّ الساقَ شريطٌ طوليٌّ والجذورَ مروحةٌ عرضيّة.

---

## بند ١٤ — `هرم-غذائي`

> **يخدمُ **سؤالَين** برسمٍ واحد.**

- **اسمُ الملف:** `images/هرم-غذائي.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bh3 — النظامُ الغذائيُّ الكافي والمتنوّع
- **نسبةُ الـ`viewBox` الحالية:** ٦٠٠×٤٣٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-2-2` #٤ | `hotspot` | اضغَطْ على قاعِدةِ الهَرَمِ الغِذائيِّ: المَجموعةُ الَّتي نَأكُلُ مِنها أَكثَرَ شَيءٍ. | **القاعدة** |
| `g3s-2-5` #٤ | `hotspot` | اضغَطْ على المَجموعةِ الَّتي نَأكُلُ مِنها أَقَلَّ شَيءٍ. | **القمّة** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| قاعدةُ الهرم | `pyramid-base` | `—` | لا لونَ عزلٍ — الطبقاتُ متمايزةٌ بمواضعِها فيُقاسُ `spot` بالبكسل |
| قمّةُ الهرم | `pyramid-top` | `—` | كذلك |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لهرمٍ غذائيٍّ من أربعِ طبقاتٍ أفقيّةٍ متساويةِ السماكةِ يعلو بعضُها بعضاً، **وبينَ كلِّ طبقتَينِ فاصلٌ أبيضُ واضحٌ لا تلامُس**. من الأسفلِ إلى الأعلى: الطبقةُ الأولى **الأعرضُ** برتقاليّةٌ فيها رغيفُ خبزٍ وطبقُ أرزٍ وسنبلةُ قمح؛ والثانيةُ خضراءُ فيها تفّاحةٌ وجزرةٌ وعنقودُ عنب؛ والثالثةُ سماويّةٌ فيها سمكةٌ وبيضةٌ وكوبُ حليب؛ والرابعةُ **الأضيقُ وهي القمّةُ** حمراءُ فيها قطعةُ حلوى وكوبُ مشروبٍ غازيّ. الأطعمةُ داخلَ كلِّ طبقةٍ صغيرةٌ واضحةٌ ولا تتجاوزُ حدودَ طبقتِها. بلا أرقامٍ ولا كلماتٍ على الهرم. نسبةُ الصورةِ نحو ١٤:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of a food pyramid made of four horizontal bands of equal thickness stacked on top of each other, **with a clear white gap between every two bands so they never touch**. From bottom to top: the first band is the **widest** and orange, holding a bread loaf, a plate of rice and a wheat ear; the second is green, holding an apple, a carrot and a bunch of grapes; the third is sky-blue, holding a fish, an egg and a glass of milk; the fourth is the **narrowest, the apex**, and red, holding a sweet and a fizzy-drink cup. The foods inside each band are small, clear, and never cross their band. No numbers and no words on the pyramid. Image aspect ratio roughly 14:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- **بندٌ واحدٌ لسؤالَين** — القاعدةُ هدفُ الأول، والقمّةُ هدفُ الثاني.
- **والفاصلُ الأبيضُ بين الطبقاتِ شرطٌ لا زينة**: هو الذي يسمحُ بقياسِ حدودِ كلِّ طبقةٍ بالبكسلِ فلا يبتلعُ مستطيلُ القاعدةِ الطبقةَ التي فوقَها.
- `spot` **مستطيلٌ** في السؤالَين — الطبقةُ شريطٌ عرضيٌّ لا قرص.

---

## بند ١٥ — `حاجات-النبتة`

- **اسمُ الملف:** `images/حاجات-النبتة.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bp2 — حاجةُ النباتِ إلى الضوءِ والماء
- **نسبةُ الـ`viewBox` الحالية:** ٦٠٠×٤٣٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-1-2` #٤ | `drag-drop` | اسحَبِ اسمَ ما تَحتاجُهُ النَّبتةُ إلى مَكانِهِ في الصّورةِ. | **ثلاثُ نقاطِ ارتساء** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| — | `—` | `—` | خلفيةٌ فحسب: السحبُ في طبقةٍ فوقَها، فلا مناطقَ تفاعليةَ في الرسم |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لمشهدٍ واحدٍ: **نبتةٌ صغيرةٌ في أصيصٍ بنّيٍّ** في وسطِ أسفلِ الإطارِ لها ساقٌ خضراءُ وأربعُ أوراق؛ و**شمسٌ برتقاليّةٌ** في الزاويةِ العليا اليمنى تُرسِلُ ثلاثةَ أشعّةٍ صفراءَ مستقيمةٍ نحوَ النبتة؛ و**مرشّةُ ماءٍ زرقاءُ** في الزاويةِ العليا اليسرى يتساقطُ منها ثلاثُ قطراتٍ زرقاءَ نحوَ الأصيص؛ و**تربةٌ بنّيّةٌ** ظاهرةٌ داخلَ الأصيصِ في أعلاه. الأجسامُ الثلاثةُ (الشمسُ والمرشّةُ والنبتة) **متباعدةٌ لا يلمسُ أحدُها الآخرَ**، وحولَ كلٍّ منها فراغٌ أبيضُ واسع. نسبةُ الصورةِ نحو ١٤:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of one scene: a **small plant in a brown pot** at the bottom centre of the frame with a green stem and four leaves; an **orange sun** in the top right corner sending three straight yellow rays toward the plant; a **blue watering can** in the top left corner with three blue drops falling toward the pot; and **brown soil** visible at the top of the pot. The three objects (sun, watering can, plant) are **well separated and never touch**, with generous white space around each. Image aspect ratio roughly 14:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- **سؤالُ سحبٍ وإفلات** — الرسمُ **خلفيةٌ** والتفاعلُ في طبقةٍ فوقَها، فينطبقُ عليه «مسموحٌ الاستبدال» بلا تحفّظ.
- ⚠️ **وتُعادُ إحداثياتُ `dot` الثلاثُ حتماً** — نِسَبٌ من **الصورةِ الجديدةِ** لا من الرسمِ القديم: الشمسُ والمرشّةُ والتربة.
- ويُراجَعُ التخطيطُ: نسبةُ ١٤:١٠ = ١٫٤ ≥ ١٫٢ فيتحوّلُ إلى **الصفِّ الأفقيّ** تلقائياً (‏`shoogp-ui` §١٫٧‑هـ).

---

## بند ١٦ — `نبتة-في-الظلام`

- **اسمُ الملف:** `images/نبتة-في-الظلام.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bp2 — حاجةُ النباتِ إلى الضوءِ والماء
- **نسبةُ الـ`viewBox` الحالية:** ٦٤٠×٣٠٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-1-2` #٦ | `find-error` | في هذا المَشهَدِ خَطَأٌ يَمنَعُ النَّبتةَ مِنَ النُّمُوِّ — اضغَطْ عَلَيهِ. | **الصندوقُ المغلقُ فوقَ النبتة** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| الخطأُ المقصود | `error-box` | `#7B2FF2` | يُعادُ إلى **بنّيِّ الكرتونِ** `#B98551` ← `#9A6636` ← `#7A4C22` |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لثلاثةِ أصائصَ متباعدةٍ في صفٍّ أفقيٍّ واحد، بينَ كلِّ اثنَينِ فراغٌ أبيضُ واسعٌ ولا يتلامسان. الأصيصُ الأيمنُ فيه نبتةٌ خضراءُ نضرةٌ وفوقَها شمسٌ صغيرةٌ برتقاليّة؛ والأوسطُ فيه نبتةٌ خضراءُ نضرةٌ وفوقَها مرشّةُ ماءٍ زرقاءُ تسقيها؛ **والأيسرُ نبتتُه مغطّاةٌ تماماً بصندوقٍ مقلوبٍ مغلقٍ يحجبُ عنها الضوءَ، والصندوقُ بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` لا يتكرّرُ في غيرِه**. الأصائصُ الثلاثةُ بنّيّةٌ متماثلة. نسبةُ الصورةِ عريضةٌ نحو ٢١:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of three well-spaced flower pots in one horizontal row, with generous white space between each pair and no touching. The right pot holds a fresh green plant with a small orange sun above it; the middle pot holds a fresh green plant with a blue watering can above it watering it; **the left pot has its plant completely covered by an upside-down closed box that blocks the light from it, and that box is a flat solid purple `#7B2FF2` that appears nowhere else**. The three pots are identical and brown. Image aspect ratio wide, roughly 21:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- `spot` **مستطيلٌ** — الصندوقُ مكعّبٌ، والدائرةُ حولَه تقتطعُ أركانَه الأربعة.
- **ويشملُ المستطيلُ الصندوقَ وحدَه لا الأصيصَ تحتَه** — السؤالُ عن الخطأِ وهو الحجب.

---

## بند ١٧ — `أدوات-القياس`

- **اسمُ الملف:** `images/أدوات-القياس.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Eo2 — القياسُ بمعدّاتٍ بسيطةٍ وتسجيلُ الملاحظات
- **نسبةُ الـ`viewBox` الحالية:** ٦٤٠×٣٠٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-1-4` #٤ | `drag-drop` | اسحَبِ اسمَ كُلِّ أَداةٍ إلى ما تَقيسُهُ. | **نقاطُ ارتساءٍ على الأدوات** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| — | `—` | `—` | خلفيةٌ فحسب — السحبُ في طبقةٍ فوقَها |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لثلاثِ أدواتِ قياسٍ متباعدةٍ في صفٍّ أفقيٍّ واحد، بينَ كلِّ اثنتَينِ فراغٌ أبيضُ واسعٌ ولا تتلامسان: **مسطرةٌ** صفراءُ طويلةٌ مستلقيةٌ أفقياً بعلاماتِ تدريجٍ سوداءَ قصيرةٍ على حافّتِها؛ و**ميزانُ مطبخٍ** أبيضُ بقرصٍ دائريٍّ فيه عقربٌ أحمرُ وصحنٌ مسطّحٌ فوقَه؛ و**كوبُ قياسٍ** زجاجيٌّ شفّافٌ فيه ماءٌ أزرقُ إلى نصفِه وعلاماتُ تدريجٍ على جانبِه. الأدواتُ الثلاثُ متساويةُ الحجمِ تقريباً. نسبةُ الصورةِ عريضةٌ نحو ٢١:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of three well-spaced measuring tools in one horizontal row, with generous white space between each pair and no touching: a long yellow **ruler** lying horizontally with short black tick marks along its edge; a white **kitchen scale** with a round dial holding a red needle and a flat pan on top; and a clear glass **measuring cup** half full of blue water with tick marks up its side. The three tools are roughly equal in size. Image aspect ratio wide, roughly 21:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- ⚠️ **تُعادُ إحداثياتُ `dot` الثلاثُ** — نِسَبٌ من الصورةِ الجديدةِ لا من الرسمِ القديم.
- النسبةُ ٢٫١ ≥ ١٫٢ فالتخطيطُ **صفٌّ أفقيٌّ** والبطاقاتُ فوقَ الصورة.

---

## بند ١٨ — `سلال-الغذاء`

- **اسمُ الملف:** `images/سلال-الغذاء.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bh3 — النظامُ الغذائيُّ الكافي والمتنوّع
- **نسبةُ الـ`viewBox` الحالية:** ٦٠٠×٤٣٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-2-1` #٤ | `hotspot` | اضغَطْ على سَلّةِ البُروتيناتِ (اللُّحومِ والأَسماكِ). | **سلّةُ البروتينات** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| سلّةُ البروتينات | `basket-protein` | `#7B2FF2` | تُعادُ إلى **الكهرمانيّ** `#FFA000` ← `#E08000` ← `#C06000` — لونُ السلّةِ لا محتواها |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لأربعِ سلالٍ متباعدةٍ في مربّعٍ (اثنتانِ فوقَ اثنتَين)، بينَ كلِّ سلّتَينِ فراغٌ أبيضُ واسعٌ ولا تتلامسان. كلُّ سلّةٍ سلّةٌ منسوجةٌ مفتوحةٌ يظهرُ فيها طعامُها: الأولى فيها **حبوبٌ** (رغيفُ خبزٍ وسنبلةُ قمحٍ وطبقُ أرز)؛ والثانيةُ فيها **فواكهُ** (تفّاحةٌ وموزةٌ وعنقودُ عنب)؛ والثالثةُ فيها **خضارٌ** (جزرةٌ وطماطمُ وخيارة)؛ **والرابعةُ فيها بروتيناتٌ (سمكةٌ وقطعةُ لحمٍ وبيضةٌ)، وسلّتُها وحدَها بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` لا يتكرّرُ في غيرِها** — أمّا الطعامُ داخلَها فبألوانِه الطبيعية. السلالُ الثلاثُ الأخرى بنّيّةٌ منسوجة. نسبةُ الصورةِ نحو ١٤:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of four well-spaced baskets arranged in a square (two above two), with generous white space between each pair and no touching. Each is an open woven basket showing its food: the first holds **grains** (a bread loaf, a wheat ear, a plate of rice); the second holds **fruit** (an apple, a banana, a bunch of grapes); the third holds **vegetables** (a carrot, a tomato, a cucumber); **the fourth holds proteins (a fish, a piece of meat, an egg), and that basket alone is a flat solid purple `#7B2FF2` appearing nowhere else** — while the food inside it keeps its natural colours. The other three baskets are brown and woven. Image aspect ratio roughly 14:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- `spot` **مستطيلٌ** يشملُ السلّةَ ومحتواها معاً — السؤالُ عن «سلّةِ البروتينات» فالهدفُ الوحدةُ كلُّها.
- **ويُفحَصُ ألّا يبلغَ المستطيلُ سلّةً مجاورةً** — الفراغُ الأبيضُ بينَ السلالِ هو ضمانُ ذلك.

---

## بند ١٩ — `وجبة-فيها-ضار`

- **اسمُ الملف:** `images/وجبة-فيها-ضار.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bh4 — أطعمةٌ غنيّةٌ بالسكرِ أو الدهونِ قد تضرُّ بالصحّة
- **نسبةُ الـ`viewBox` الحالية:** ٦٤٠×٣٠٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-2-3` #٦ | `find-error` | في هذِهِ الوَجبةِ صِنفٌ يَضُرُّ بِالصِّحّةِ إذا أَكثَرْنا مِنهُ — اضغَطْ عَلَيهِ. | **المشروبُ الغازيّ** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| المشروبُ الغازيّ | `drink-soda` | `#7B2FF2` | يُعادُ إلى **الأحمر** `#FF4020` ← `#FF2020` ← `#E02000` |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لأربعةِ أصنافِ طعامٍ متباعدةٍ في صفٍّ أفقيٍّ واحدٍ على سطحٍ خشبيٍّ بنّيٍّ رفيع، بينَ كلِّ صنفَينِ فراغٌ أبيضُ واسعٌ ولا يتلامسان: **تفّاحةٌ** حمراءُ بورقةٍ خضراء؛ و**كوبُ حليبٍ** أبيضُ ممتلئ؛ و**طبقُ سلطةٍ** فيه ورقُ خسٍّ أخضرُ وشريحةُ طماطمَ حمراء؛ **وكوبُ مشروبٍ غازيٍّ كبيرٌ بغطاءٍ وماصّةٍ، وهو وحدَه بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` لا يتكرّرُ في غيرِه**. نسبةُ الصورةِ عريضةٌ نحو ٢١:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of four well-spaced food items in one horizontal row on a thin brown wooden surface, with generous white space between each pair and no touching: a red **apple** with a green leaf; a full white **glass of milk**; a **bowl of salad** with green lettuce and a red tomato slice; **and a large fizzy-drink cup with a lid and a straw, which alone is a flat solid purple `#7B2FF2` appearing nowhere else**. Image aspect ratio wide, roughly 21:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- `spot` **مستطيلٌ** — الكوبُ أسطوانةٌ طوليّةٌ بغطاءٍ وماصّة، والدائرةُ تقتطعُ أعلاه وأسفلَه.
- **والماصّةُ داخلَ المستطيلِ** لأنّها جزءٌ من الكوبِ في عينِ التلميذ.

---

## بند ٢٠ — `عادات-تقوي-الجسم`

- **اسمُ الملف:** `images/عادات-تقوي-الجسم.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bh3 — التمارينُ الرياضيةُ والنظامُ الغذائيّ
- **نسبةُ الـ`viewBox` الحالية:** ٦٤٠×٣٠٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-2-4` #٤ | `hotspot` | اضغَطْ على ما يُقَوّي عَضَلاتِكَ إذا استَعمَلتَهُ كُلَّ يَومٍ. | **الدرّاجةُ أو الكرة** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| الدرّاجة | `habit-bike` | `#7B2FF2` | تُعادُ إلى **الأحمر** `#FF4020` ← `#FF2020` ← `#E02000` ← `#B01800` |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لثلاثةِ أشياءَ متباعدةٍ في صفٍّ أفقيٍّ واحد، بينَ كلِّ اثنَينِ فراغٌ أبيضُ واسعٌ ولا يتلامسان: **جهازُ تلفازٍ** أسودُ بشاشةٍ سماويّةٍ وقاعدةٍ رفيعة؛ و**كيسُ رقائقَ** برتقاليٌّ منتفخٌ مغلق؛ **ودرّاجةٌ هوائيّةٌ** من الجانبِ بعجلتَينِ وإطارٍ ومقودٍ ودوّاسة، **وهي وحدَها بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` يشملُ إطارَها وعجلتَيها لا يتكرّرُ في غيرِها**. نسبةُ الصورةِ عريضةٌ نحو ٢١:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of three well-spaced objects in one horizontal row, with generous white space between each pair and no touching: a black **television** with a sky-blue screen and a thin stand; a puffed closed orange **crisps bag**; and a **bicycle** seen from the side with two wheels, a frame, handlebars and a pedal, **which alone is a flat solid purple `#7B2FF2` covering its frame and both wheels and appearing nowhere else**. Image aspect ratio wide, roughly 21:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- `spot` **مستطيلٌ** يشملُ الدرّاجةَ كاملةً — عجلتَينِ وإطاراً ومقوداً.
- ⚠️ **ونصُّ السؤالِ يُراجَعُ عندَ التنفيذ**: هو اليومَ «ما يُقَوّي عَضَلاتِكَ إذا استَعمَلتَهُ كُلَّ يَومٍ» والدرّاجةُ تُحقّقُه.

---

## بند ٢١ — `بذور-تنتشر-بالريح`

- **اسمُ الملف:** `images/بذور-تنتشر-بالريح.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bh1 — العملياتُ الحيويةُ المشتركةُ ومنها التكاثر
- **نسبةُ الـ`viewBox` الحالية:** ٦٠٠×٣٦٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-3-3` #٤ | `hotspot` | اضغَطْ على ما يَنتَشِرُ مَعَ الرّيحِ لِتَنمُوَ نَباتاتٌ جَديدةٌ. | **بذرةُ الهندباءِ الطائرة** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| بذرةُ الهندباء | `seed-dandelion` | `#7B2FF2` | تُعادُ إلى **الأبيضِ والرماديّ** `#FFFFFF` ← `#C0C0C0` ← `#808080` — فهي زغبٌ أبيض |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لثلاثةِ أشياءَ متباعدةٍ في صفٍّ أفقيٍّ واحد، بينَ كلِّ اثنَينِ فراغٌ أبيضُ واسعٌ ولا يتلامسان: **حجرٌ** رماديٌّ أملسُ مستديرٌ؛ و**تفّاحةٌ** حمراءُ بورقةٍ خضراء؛ **وبذرةُ هندباءَ طائرةٌ** لها ساقٌ رفيعةٌ ينتهي أعلاها بتاجٍ من الزغبِ المتفرّعِ كالمظلّة، مائلةٌ قليلاً كأنّ الريحَ تحملُها، **وهي وحدَها بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` يشملُ زغبَها وساقَها لا يتكرّرُ في غيرِها**. نسبةُ الصورةِ نحو ١٧:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of three well-spaced objects in one horizontal row, with generous white space between each pair and no touching: a smooth round grey **stone**; a red **apple** with a green leaf; and a flying **dandelion seed** with a thin stalk topped by a branching umbrella-like crown of fluff, tilted slightly as if carried by the wind, **which alone is a flat solid purple `#7B2FF2` covering its fluff and stalk and appearing nowhere else**. Image aspect ratio roughly 17:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- `spot` **مستطيلٌ** يشملُ الزغبَ والساقَ معاً.
- **وتاجُ الزغبِ متفرّعٌ رفيعٌ** فيُفحَصُ أنّ لونَ العزلِ بلغَ خيوطَه كلَّها قبلَ القياس، وإلّا خرجَ المستطيلُ أصغرَ من البذرة.

---

## بند ٢٢ — `بصمات-الأصابع`

- **اسمُ الملف:** `images/بصمات-الأصابع.png`
- **المسار:** **نقطيٌّ** — إجابةُ التحديدِ نسبةٌ مئويةٌ من صندوقِ الرسمِ لا مسار، فالتتبّعُ كلفةٌ بلا مقابل
- **الهدف:** 3Bh6 — تصنيفُ الكائناتِ بسماتٍ بسيطة
- **نسبةُ الـ`viewBox` الحالية:** ٦٤٠×٣١٠

**الأسئلةُ التي يخدمُها:**

| السؤال | النوع | النصّ | الهدفُ في الرسم |
|---|---|---|---|
| `g3s-3-4` #٤ | `hotspot` | اضغَطْ على البَصمةِ الَّتي خُطوطُها تَدورُ حَولَ مَركَزٍ — بَصمةِ الدَّوّاماتِ. | **بصمةُ الدوّامات** |

**المناطقُ ولونُ العزلِ والتحييد:**

| المنطقة | المعرّف | لونُ التوليد | المعالجةُ بعدَ التوليد |
|---|---|---|---|
| بصمةُ الدوّامات | `print-whorl` | `#7B2FF2` | تُعادُ إلى **الرماديِّ المعدنيّ** `#C0C0C0` ← `#808080` ← `#606060` كأختِها فلا يفرّقُها لون |

**نتيجةُ البوّابة:** ✅ مرّ — مناطقُ تفاعليةٌ ≤ ٤ · حدودٌ مغلقة · بلا تداخل · لونُ عزلٍ فريدٌ لكلِّ منطقة

**البرومبت — عربيّ:**

> أنشئ رسماً تعليمياً لثلاثِ بصماتِ أصابعَ متباعدةٍ في صفٍّ أفقيٍّ واحد، كلٌّ منها بيضويّةٌ قائمةٌ بحدٍّ خارجيٍّ واضح، بينَ كلِّ بصمتَينِ فراغٌ أبيضُ واسعٌ ولا تتلامسان. **خطوطُ كلِّ بصمةٍ نمطُها مختلفٌ اختلافاً بيّناً**: اليمنى **أقواسٌ** خطوطٌ متوازيةٌ تعبرُ البصمةَ من جانبٍ إلى جانبٍ في تحدّبٍ خفيفٍ بلا مركز؛ والوسطى **عُقَدٌ** خطوطٌ تدخلُ من جانبٍ واحدٍ وتلتفُّ ثمّ تخرجُ من الجانبِ نفسِه؛ **واليسرى دوّاماتٌ خطوطٌ دائريّةٌ متّحدةُ المركزِ تدورُ حولَ نقطةٍ في وسطِ البصمة، وهي وحدَها بلونٍ بنفسجيٍّ مسطّحٍ صريحٍ `#7B2FF2` لا يتكرّرُ في غيرِها**. البصمتانِ الأُخريانِ رماديّتان. نسبةُ الصورةِ عريضةٌ نحو ٢١:١٠. رسم كرتونيّ متّجهي لامع بأسلوب ملصقات الفضاء، بألوانٍ صريحةٍ مشبعة، لكلِّ جسمٍ تدرّجُ حجمٍ من ثلاثِ إلى أربعِ درجاتٍ من لونِه نفسِه (فاتحةٌ ثمّ أساسيةٌ ثمّ غامقةٌ ثمّ ظِلّ) بحوافَّ فاصلةٍ واضحةٍ بين الدرجاتِ لا مزجٍ ناعم، مع لمعةٍ بيضاءَ عريضةٍ على الأسطحِ المنحنية، وحدٍّ خارجيٍّ أسودَ رفيعٍ واضحٍ ‎#111111‎ مستديرِ الرؤوسِ يحيطُ كلَّ جسمٍ وأجزاءَه الداخلية (خطٌّ نظيفٌ رفيعٌ لا حدٌّ ثقيل)، بأشكالٍ ممتلئةٍ مستديرةٍ بلا زاويةٍ حادّة، والأجسامُ طافيةٌ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى، وبلا أيِّ ملامحِ وجهٍ على أيِّ شيءٍ إطلاقاً. الخلفيةُ بيضاءُ نقيّةٌ ‎#FFFFFF‎ بلا أيّ نصوصٍ أو تسمياتٍ أو أرقام. صورة واحدة مستقلّة فقط.

**English:**

> Create an educational illustration of three well-spaced fingerprints in one horizontal row, each an upright oval with a clear outline, with generous white space between each pair and no touching. **Each print has a clearly different ridge pattern**: the right one is an **arch** — parallel ridges crossing from side to side in a gentle rise, with no centre; the middle one is a **loop** — ridges entering from one side, curving round, and leaving on the same side; **the left one is a whorl — concentric circular ridges turning around a point at the centre of the print, and it alone is a flat solid purple `#7B2FF2` appearing nowhere else**. The other two prints are grey. Image aspect ratio wide, roughly 21:10. Glossy cartoon vector illustration in a space-sticker style, bold saturated colors, each object shaded with a 3-4 step ramp of its own hue (highlight, base, shade, deep shade) as crisp discrete bands with hard edges and no soft blending, a broad white gloss highlight on curved surfaces, a thin crisp black outline #111111 with rounded caps around every object and its inner parts (a clean fine line, not a heavy border), plump rounded forms with no sharp angles, objects floating with no ground line and no cast shadow, absolutely no facial features on anything. Pure white background #FFFFFF with no text, labels or numbers. One single standalone image only.

**ملاحظاتُ التنفيذ:**

- `spot` **مستطيلٌ** — البصمةُ بيضويّةٌ قائمةٌ، ومستطيلُها أدقُّ من دائرةٍ تقتطعُ طرفَيها.
- ⚠️ **والتحييدُ هنا شرطُ صحّةٍ لا تجميل**: لو بقيَتِ الدوّاماتُ بنفسجيّةً لَعرفَها التلميذُ باللونِ لا بالنمطِ فسقطَ ما يقيسُه السؤال.

---

# جولةُ إتمامِ كتبِ العلوم — ٢٠٢٦-٠٨-٢٨

> ✅ **أُنجِزَت.** ليست بنداً في الطابور بل **مسحاً كاملاً لكتبِ العلومِ الأربعة** أفرزَ
> رسومَها اليدويةَ إلى ثلاثِ فئات: ما يُستبدَلُ برسمٍ مولَّدٍ نقطيٍّ، وما يُستبدَلُ برسمٍ
> **متتبَّعٍ** (التلوينُ وحدَه)، وما **يبقى يدوياً بقرار**.

## ① الطبقةُ النقطيّةُ — ١١ رسمةً تخدمُ ١٥ سؤالاً

`مراحل-البذرة` · `نبتة-ضوء-وظلام` · `أطفال-ثلاثة` · `جسم-طفل` · `وجه-الحواس` ·
`رموز-الطقس` · `صخور-ثلاث` · `أجسام-أربعة` · `أجسام-مرنة` · `جرعة-الدواء` · `مشهد-بيئي`

ثلاثةَ عشرَ سؤالَ **تحديدٍ واكتشافِ خطأ** بمستطيلاتِ `spot` مقيسةٍ، وسؤالا **سحبٍ وإفلاتٍ**
أُعيدَ حسابُ نقاطِ `dot` فيهما على الصورةِ الجديدة. الخمسةَ عشرَ اجتازت اختبارَ النقرِ
ذا الطرفَين (يُقبَلُ الهدفُ، ويُرَدُّ الجار).

## ② الطبقةُ المتتبَّعةُ — أربعُ رسماتٍ لأربعةِ أسئلةِ تلوين

**إعدادُ التتبّعِ المستعمَل** — كالمعتمَدِ في المهارةِ **وزيادةً `path_precision=2`**:

```
colormode=color · color_precision=4 · filter_speckle=16 · mode=spline · path_precision=2
```

> ⚠️ **و`path_precision` ليس زينةً — هو الفرقُ بينَ المرورِ والسقوط.** بالقيمةِ الافتراضيةِ
> (‏٨ خاناتٍ عشرية) خرَجَ رسمُ الحشرةِ **١١٥KB** والتربةُ **٩٠KB**، وكلاهما يتجاوزُ سقفَ
> **٨٠KB** في بوّابةِ الجودة. وبخانتَينِ نزلا إلى **٤٩KB** و**٤٠KB** بلا فرقٍ مرئيّ.

| السؤال | الرسمة | المناطق | مسارات | الحجم | النسبة | الإطار |
|---|---|---|:--:|:--:|:--:|:--:|
| `g2s-1-3` #٦ | مشهدُ الطقس | الشمس · السحابة · قطرات المطر · العشب | ١٨ | ٢٢٫٠KB | ١٫٨٤ | `qf-tall` |
| `g2s-2-3` #٦ | مقطعُ التربة | العشب · التربة · الحصى | ٢٢ | ٣٩٫٧KB | ١٫٨٤ | `qf-tall` |
| `g2s-3-4` #٦ | ساخنٌ وبارد | كوب الشاي · الخبز · مكعب الثلج · المثلجات | ١٧ | ٢٨٫٧KB | ٠٫٩٤ | `qf-l` |
| `g4s-2-5` #٦ | حشرةٌ ودودة | الحشرة · دودة الأرض | ٢٠ | ٤٨٫٩KB | ١٫٨٤ | `qf-tall` |

**بوّابةُ الجودةِ للأربعة:** ✅ الحجمُ < ٨٠KB · بلا `<style>` داخليّ · التعبئةُ سمةُ `fill` ·
كلُّ منطقةٍ كاشفةٍ محيَّدةٌ إلى `#E8E4DC` · لا `qflex` في أيٍّ منها.

**والمنطقةُ الواحدةُ عدّةُ مسارات** (قطراتُ المطرِ خمسةٌ · الحصى سبعةٌ · الحشرةُ تسعةٌ ·
الخبزُ أربعةٌ) — يحملُها `data-name` نفسُه، و`partsOf` في `renderColor` يلوّنُها معاً.

### أمرانِ اقتضاهما التنفيذُ ووُثِّقا هنا

**أ) الفيضُ من الزاويتَينِ العُليَيَينِ لا من الأربع.** الأرضُ في مشهدَي الحشرةِ والطقسِ
تبلغُ حافّةَ الصورةِ السفلى، فالفيضُ من زاويةٍ سفلى **يبتلعُها**. والشرطُ
`min(r,g,b) > 100`: كلُّ لونٍ مشبَعٍ وكلُّ حدٍّ أسودَ قناتُه الدنيا منخفضة، فلا يتسرّبُ
الفيضُ إلى الرسم.

**ب) هالةُ التصغيرِ تُغسَلُ بعدَ التصغيرِ لا قبلَه.** غسلُ المحيطِ ثمّ التصغيرُ يُنتِجُ
هالةً جديدةً من مزجِ الأبيضِ بحافّةِ الجسم، فتخرجُ في التتبّعِ لوناً خامساً كاذباً
(وقعَ فعلاً في مقطعِ التربة: خمسةُ مساراتٍ خضراءَ فاتحةٍ خارجَ المستطيل).

**ج) أرضُ المشهدِ تُعادُ إلى رملٍ محايدٍ `#E8D9B8` لا إلى بنّيِّها.** بنّيُّ الأرضِ
**هو جوابُ «دودة الأرض» نفسُه** `#8a5a2b`، فبقاؤه يكشفُ الإجابةَ بالجِوار.

## ③ الرسمةُ المشتقّةُ — بلا توليدٍ إطلاقاً

**`g1s-2-4` #٦ (تلوينُ أجزاءِ النبتة)** اشتُقَّ من **هندسةِ `g3s-1-1` #٦ المتتبَّعةِ نفسِها**
(‏`نبتة-كاملة`): الجذورُ والساقُ والأزهارُ مناطقُ قائمةٌ فيها، **والأوراقُ الأربعُ كانت
خضراءَ ثابتةً فصارت منطقةَ تلوينٍ محيَّدة**. ولا صورةَ وُلِّدَت ولا ملفَّ أُضيف.

> وأُعيدَت تسميةُ جزئِه `الزَّهرَةُ` ← **`الأَزهارُ`** لأنّ الرسمَ فيه زهرتانِ لا زهرةٌ واحدة.

## ④ ما بقيَ يدوياً — ثمانيةُ رسومٍ بقرار

شريطانِ متدرّجانِ · مِقياسا حرارةٍ · مخطَّطٌ جزيئيٌّ · سؤالُ تلوينٍ بستِّ مناطقَ
(يتجاوزُ سقفَ الأربع)، **وسؤالانِ إجابتُهما معلَّقةٌ بنصٍّ مطبوعٍ داخلَ الرسم**:
`g2s-3-5` #٦ (ملح/سكر/رمل) و`g4s-2-8` #٦ (عامّ/بلاستيك/ورق/زجاج) — والتوليدُ
**ممنوعٌ فيه النصُّ** أصلاً، فالرسمُ اليدويُّ هو الطريقُ الوحيد.

---

## مرشَّحٌ مؤجَّل — `g1d2-3-1` #٤ (صنّفْ كلَّ مخلوق)

**بطاقاتُه الأربعُ كلُّها أجسامٌ تُرسَم** (العقربُ · الذئبُ · الطائرُ · الماعز)، **لكنّ
العقربَ والذئبَ غيرُ موجودَينِ في `js/qpics.js`** — والطائرُ والماعزُ موجودان. فلو فُعِّلَ
`pics` اليومَ لَخرجَت مجموعةُ «من شرِّ ما خلق» **عاريةً بتمامِها** فكشفَتِ الإجابة
(§الحدُّ الثالث في `CLAUDE.md`).

> **وهذا ليس استبعاداً دائماً بخلافِ أسئلةِ الغاز**: علّتُه **نقصُ مكتبةٍ لا امتناعُ رسم**.
> يُفعَّلُ متى وُلِّدَ الرسمانِ — وهما جسمانِ عاديّانِ لا مانعَ فيهما.

> ✅ **أُنجِزَ ٢٠٢٦-٠٨-٢٨.** وُلِّدَ الرسمانِ فصارت بطاقاتُ السؤالِ الأربعُ مرسومةً
> (عقربٌ · ذئبٌ · ماعزٌ · طائرٌ) وفُعِّلَ `pics: true`، فارتفعَتِ المجموعةُ العاريةُ
> ولم يعدْ يظهرُ في تنبيهاتِ `tools/check-qpics.mjs`.

**والعقربُ وُلِّدَ مرّتَين — والأولى درسٌ يُسجَّل:**

البرومبتُ الأولُ كُتِبَ بحقلِ `subject` المختصرِ فبنَتِ العقدةُ حولَه ورقةَ المواصفاتِ
بسلالمِها العشرة، **فرسمَ النموذجُ لوحةَ ألوانٍ لا عقرباً**: كلُّ حلقةٍ من حلقاتِ الذيلِ
بلونٍ مختلفٍ (أحمرُ · أصفرُ · أزرقُ · أخضرُ)، والكلّابتانِ برتقاليّتانِ، والجسمُ أزرقُ
وبشرةٌ. وهو عينُ ما يحذّرُ منه رأسُ `tools/graphics-batch.json`.

> **والعلاجُ برومبتٌ كاملٌ صريحٌ لا `subject`**: يثبّتُ **سُلَّماً واحداً** للجسمِ كلِّه
> (الكهرمانيَّ `#FFA000` ← `#E08000` ← `#C06000` ← `#984800`) **وينفي بقيّةَ الألوانِ
> بأسمائِها** («لا أحمرَ ولا أزرقَ ولا أخضرَ…»). فالنموذجُ يقرأُ قائمةَ السلالمِ دعوةً
> إلى التنويعِ ما لم يُمنَعْ صراحةً.
>
> **والذئبُ خرجَ سليماً من الأولى** — سُلَّمٌ رماديٌّ واحدٌ بلا ملامحِ وجه. فالعطبُ ليس
> في كلِّ برومبتٍ مختصرٍ، بل في **الجسمِ المفصَّلِ ذي الأجزاءِ الكثيرة**: كثرةُ الأجزاءِ
> تُغري بتلوينِ كلٍّ منها على حِدَة.

---

# جردُ كتبِ العلوم — ما يُفعَّلُ فيه الرسمُ وما لا يُفعَّل (٢٠٢٦-٠٨-٢٨)

مُسِحَت **كلُّ** أسئلةِ كتبِ العلومِ الأربعةِ التي يقبلُ نوعُها `pics`:

| الحال | العدد |
|---|:--:|
| مفعَّلٌ فيه الرسمُ سلفاً | **٨٠** |
| 🟢 كلُّ بطاقاتِه مرسومةٌ والرسمُ مطفأ | **٠** |
| 🟡 بعضُ بطاقاتِه ناقصٌ من المكتبة | ١٩ |
| ⚪ لا شيءَ من بطاقاتِه مرسوم | ١٠٦ |

> **الصفرُ في السطرِ الثاني هو الخلاصة:** لم يبقَ في العلومِ سؤالٌ يُفتَحُ بمجرّدِ تفعيلِ
> الحقلِ — كلُّ ما كانَ جاهزاً فُعِّلَ. والباقي إمّا **ممتنعٌ بقاعدة** أو **موقوفٌ على رسمٍ
> جديد**، لا منسيّ.

## الممتنعُ بقاعدةٍ لا بنقصِ مكتبة

| العلّة | الأسئلة |
|---|---|
| **غازٌ لا جسمَ له** | `g4s-3-1`#٥ · `g4s-3-3`#٥ · `g4s-3-7`#٥ · `g4s-3-3`#١ |
| **البطاقةُ اسمُ الصفةِ المقيسةِ نفسِها** | `g3s-2-1`#١ (النشوياتُ · البروتينات) · `g4s-1-7`#١ (الهيكلُ العظميُّ · الجهازُ الهضميّ) · `g4s-1-5`#٥ (العقاقيرُ · الوقاية) |
| **ظرفٌ لا جسمَ** | `g4s-2-2`#٥ (الرطوبةُ · الجفافُ · الشمسُ الحارقة) |
| **الرسمُ لا يفرّق** | `g2s-2-1`#٦ و`g2s-2-2`#٣ و#٥ (الحجرُ الرمليُّ والجيريُّ والرخامُ والكوارتز — صخورٌ رسمُها واحد) · `g2s-2-3`#٤ (تربةٌ رمليّةٌ وطينيّة) |
| **بطاقةٌ مركّبةٌ لا أيقونةَ لها** | `g2s-1-3`#٢ («مِعطَفٌ ومِظَلَّةٌ» جسمانِ في بطاقةٍ واحدة) |
| **عبارةٌ لا جسم** | `g3s-3-2`#٥ («تَبدَأُ البَذرةُ بِالنُّمُوِّ») · `g2s-3-6`#٣ عمودُ أ (الثَّنيُ · الضَّغطُ — أفعال) |

## ⚠️ فخُّ الأصلِ المُشابِه — `g4s-2-2`#٣ يبقى نصّاً

«صِل كلَّ جزءٍ من الحلزونِ بوظيفتِه» بدا مرشَّحاً لِـ`pics:"a"`: القوقعةُ والقدمُ في السِّجِلِّ،
واللسانُ والجلدُ يُحالانِ بصيغة. **لكنّ `images/قدم.png` قدمُ إنسانٍ لا قدمَ حلزون** — وهي
عضوٌ عضليٌّ منبسطٌ تحتَ الصَّدَفة. فتفعيلُ الرسمِ يضعُ قدمَ آدميٍّ في سؤالٍ عن الحلزون.

> وهو نفسُ صنفِ الفخِّ المسجَّلِ سابقاً (‏`طاولة.png` منضدةٌ خشبيّةٌ · `جمل.png` بالغٌ لا حُوار)
> — **الاسمُ يطابقُ والرسمُ لا يطابق**. فقاعدةُ فحصِ المكتبةِ تقتضي **النظرَ إلى الأصلِ** لا
> الاكتفاءَ بوجودِ مفتاحِه.

## ✅ الموقوفُ على رسمٍ جديدٍ — أُنجِزَ بدفعةِ `2026-08-28-gap-fill-7`

| الرسم | يفتحُ |
|---|---|
| `نفايات-عامة` | `g4s-2-8`#٣ ← `pics:"b"` (البلاستيكُ والورقُ والزجاجُ مرسومةٌ سلفاً) |
| `منشفة` | `g2s-3-6`#٣ ← `pics:"b"` (مع صيغتَي «سلك معدني رفيع» و«قطعة صلصال») |
| `دلو` · `حوض` | `g1m-8-2`#٣ — رياضيات |
| `باب` | `g2m-10-3`#٥ — رياضيات (‏`مدرسة-باب.png` مبنًى كاملٌ بخلفيةٍ صلبةٍ لا بطاقةَ باب) |
| `جبال` · `جسر` | `g3d1-1-3`#٤ — ديني حياتي (مع صيغةِ «الطائرة») |

> ⛔ **و`g1d1-1-5`#٤ («صَنِّفْ كُلَّ شَيْءٍ»: الدَّمُ · الْقَيْءُ) لا يُولَّدُ له شيءٌ ويبقى
> نصّاً** — لا لأنّ رسمَه متعذّرٌ بل لأنّه **لا يليقُ ببطاقةِ تلميذٍ في الصفِّ الأول**.
> **و`g1m-6-2`#٥** (المُكَعَّبُ · الهَرَمُ · الأُسطُوانة) يبقى نصّاً بقاعدةِ الصفةِ المجرّدة:
> الرسمُ يحوّلُ استرجاعَ التعريفِ إلى نظرٍ في الشكل.

> ✅ **وصلَتِ السبعةُ كلُّها على المواصفةِ من التوليدِ الأوّل** (سُلَّمٌ واحدٌ لكلِّ جسمٍ،
> بلا لوحةِ ألوان) — لأنّ برومباتِها كُتِبَت كاملةً صريحةً منذُ البداية، عملاً بدرسِ العقرب.
> وفُعِّلَ الرسمُ في الخمسةِ: `g4s-2-8`#٣ و`g2s-3-6`#٣ بـ`pics:"b"`، والثلاثةُ الباقيةُ
> بـ`pics: true`.
>
> **ومنشفةُ `g2s-3-6` رُسِمَت مطويّةً عمداً لا ملويّةً** — لأنّ «اللَّيَّ» هو جوابُها في
> السؤال، فرسمُها ملويّةً يكشفُ الإجابةَ قبلَ أن يُسأل.

---

# جولةُ الرياضيات — ٢٠٢٦-٠٨-٢٨

مُسِحَت كتبُ الرياضياتِ الأربعةُ بالجردِ نفسِه الذي أنهى العلوم:

| الحال | العلوم | **الرياضيات** |
|---|:--:|:--:|
| الرسمُ مفعَّلٌ سلفاً | ٨٠ | **٤** |
| كلُّ بطاقاتِه مرسومةٌ والرسمُ مطفأ | ٠ | ١ |
| بعضُ بطاقاتِه ناقصٌ من المكتبة | ١٩ | ١٩ |
| لا شيءَ من بطاقاتِه مرسوم | ١٠٦ | ٣١٠ |

> **والـ٣١٠ ليست ثغرةً**: أكثرُها أرقامٌ وأشكالٌ هندسيّةٌ وخطوطُ أعدادٍ ولوحاتُ مئةٍ —
> لا تدخلُ بابَ البطاقاتِ المصوّرةِ أصلاً. الشغلُ كلُّه في العشرينَ الباقية.

**النتيجة: ثلاثةَ عشرَ سؤالاً فُعِّلَ فيه الرسمُ** (من أربعةٍ إلى سبعةَ عشر).

## ① ثلاثةٌ بلا توليدٍ إطلاقاً — أصولٌ كانت موجودةً ولم تُسجَّل

`زرافة.png` و`إبريق.png` في `images/` منذُ زمنٍ ولم يكونا في `js/qpics.js`، و«كوب صغير»
يُحالُ إلى `كأس`. ففُتِحَ بذلك `g1m-3-1`#٤ و`g1m-8-2`#٤ و`g1m-8-1`#٤.

> **⚠️ والفحصُ نفسُه كشفَ فخّاً ثالثاً:** `علبة-مشروب.png` **ليست علبةَ مشروبٍ بل حقيبةَ
> غداءٍ فيها علبةٌ وكيسُ وجبة** — فلا تصلحُ لبطاقةِ «عُلبةُ المَشروبِ» في سؤالِ تشبيهِ
> المجسَّمات. فوُلِّدَت `علبة-مشروب-معدنية.png` أسطوانةً بلسانِ فتحٍ، **والأصلُ القديمُ
> باقٍ بلا مساسٍ** لأنّه مستعمَلٌ في سؤالٍ آخر.

## ② ستةَ عشرَ رسماً وُلِّدَت — أربعةَ عشرَ قُبِلَت من الأولى

| المجموعة | الرسوم |
|---|---|
| أدواتُ القياس | `ميزان` · `ساعة` · `مقياس-حراري` · `شريط-قياس` · `متر-خشبي` |
| المقارنةُ بالطولِ والوزن | `مشبك-ورق` · `مكنسة` · `مئذنة` · `ريشة` |
| مطعمُ المدرسة | `فطيرة` · `صحن` · `عصير` · `ساندويتش` |
| تشبيهُ المجسَّمات | `حجر-النرد` · `قمع-المثلجات` · `علبة-مشروب-معدنية` |

**⚠️ ولوحاتُ القياسِ الثلاثُ فارغةٌ عمداً** — الميزانُ والساعةُ والمقياسُ الحراريُّ
**بلا أرقامٍ ولا تدريج**. والعلّةُ أنّ الكتابَ نفسَه فيه أسئلةُ **قراءةِ مقياسٍ**
(‏`clock` و`measure-tool`)، فبطاقةٌ تحملُ عقارِبَ على وقتٍ معلومٍ أو مؤشّراً على رقمٍ
تُناقِضُ سؤالاً آخرَ في الدرسِ نفسِه.

### والعطبانِ اللذانِ لزمَ علاجُهما

**أ) الميزانُ خرجَ ومعه شريطُ ألوانٍ** — أربعُ درجاتِ السُّلَّمِ الرماديِّ مرسومةً حُزَماً
مصمتةً بجانبِ الجسم. **عولِجَ بالقصِّ** (نصفُ الصورةِ الأيسرُ) لا بإعادةِ التوليد، فالجسمُ
نفسُه سليم.

**ب) المترُ الخشبيُّ خرجَ عصيّاً متفرّقةً** لا مترَ طيٍّ متّصلاً — أربعُ قطعٍ متقاطعةٌ لا
يمسُّ بعضُها بعضاً. وأُعيدَ توليدُه ببرومبتٍ يشترطُ **شكلاً واحداً متّصلاً على هيئةِ حرفِ W
بمفاصلَ مستديرةٍ ظاهرةٍ**، وينصُّ أنّ كلَّ قطعةٍ تلمسُ التي تليها ولا قطعةَ طليقة.

> **وكلا العطبَين من صنفٍ واحد: النموذجُ يملأُ الفراغَ بما لم يُمنَعْ صراحةً.** فصارَ
> البرومبتُ يمنعُ «شريطَ الألوانِ والعيّنةَ» بالاسم كما يمنعُ الألوانَ الأخرى.

## ③ ما يبقى نصّاً في الرياضياتِ بقاعدةٍ لا بنقصِ مكتبة

| العلّة | الأسئلة |
|---|---|
| **البطاقةُ اسمُ المجسَّمِ المقيسِ نفسِه** | `g2m-8-2`#٢ و#٥ · `g1m-6-2`#١ و#٥ و#٦ (المكعّبُ · المخروطُ · الأسطوانةُ · الهرم) |
| **فعلٌ لا جسم** | `g1m-9-3`#٤ و#٥ (الاستيقاظُ · الذهابُ إلى المدرسةِ · الغداء) |

> **واستُثنيَ `g2m-8-2`#٣ من منعِ المجسَّماتِ فَفُعِّلَ فيه `pics:"b"` وحدَه:** عمودُ «ب»
> أجسامٌ (نردٌ · علبةٌ · قمعٌ · كرةُ قدم)، **ورؤيةُ شكلِها هي المهارةُ المقصودةُ نفسُها** —
> فنصُّ السؤالِ «صِلْ كلَّ مجسَّمٍ بشيءٍ يُشبِهُه **من حولك**». وهو عينُ استثناءِ «عدُّ أرجلِ
> النحلةِ» المنصوصِ في `CLAUDE.md`: ملاحظةٌ لا استرجاع. **وعمودُ «أ» يبقى نصّاً** لأنّه
> أسماءُ المجسَّمات.

---

# جولةُ «أحب لغتي» — ٢٠٢٦-٠٨-٢٨

| الكتاب | أسئلة | بطاقاتٌ مفعَّلة | جاهزٌ باقٍ | رسومٌ يدويّة |
|---|:--:|:--:|:--:|:--:|
| الأول | ١٨٦ | ٩ ← **١٣** | ٠ | ٣ |
| الثاني | ٧٦ | ١ ← **٢** | ٠ | ٢ |
| الثالث | ٧١ | ٠ | — | ٠ |
| الرابع | ٧٨ | ٠ | — | ٢ |

> **والثالثُ والرابعُ خارجَ نطاقِ البطاقاتِ المصوَّرةِ أصلاً** — قاعدةُ `CLAUDE.md`:
> «أحب لغتي — **الأول والثاني** ولا تتعدّاهما»، لأنّ الكلمةَ المكتوبةَ في اللغةِ قد تكونُ
> هي المهارةَ المقيسةَ نفسَها. فالصفرُ فيهما التزامٌ لا نقص.

## ① أربعةٌ فُتِحَت بلا توليدٍ إطلاقاً

صيغتانِ تُحيلانِ إلى أصلَينِ موجودَين — **«الفرشاة» ← `أسنان.png`** (وهو **فرشاةٌ ومعجونٌ
لا أسنان**، فُحِصَ بالنظر) و**«الكتب» ← `كتاب`**:

`g1a1-0-1`#٢ (`pics:"b"`) · `g1a1-0-2`#٣ و`g1a2-3-2`#٦ (`pics:"a"`) · `g2a1-1-1`#١ (`true`)

## ② رسمانِ فتحا سؤالاً — `صمغ` و`مقص`

‏`g1a1-0-3`#٥ («صِلْ كُلَّ أَداةٍ بِعَمَلِها») بـ`pics:"a"`؛ عمودُ «ب» أفعالٌ («أُلْصِقُ بِهِ»)
فيبقى نصّاً.

## ③ ما يبقى نصّاً في «أحب لغتي» بقاعدة

**خمسةُ أسئلةِ تصنيفٍ إملائيّ** — `g1a1-1-1`#٦ و`g1a1-1-5`#٥ و`g1a1-2-2`#٦ و`g1a1-2-5`#٥
و`g1a2-3-1`#٦ و`g1a2-3-7`#٥ («صنّفِ الكلماتِ بحسبِ موضعِ الحرفِ / حرفِها الأوّل»).

> ⚠️ **وبعضُ بطاقاتِها مرسومٌ في السِّجِلِّ سلفاً** (سمكةٌ · فراشةٌ · كتابٌ) فيظهرُ السؤالُ
> «جاهزاً» في أيِّ جردٍ آليّ. **وهو ليس جاهزاً**: المقيسُ فيه **رسمُ الكلمةِ لا معناها**،
> والصورةُ تصرفُ العينَ عن الحرفِ المطلوبِ تمييزُه. فالجردُ الآليُّ يُظهِرُ الحالةَ
> والحكمُ بشريّ.

## ④ رسومُ الأسئلةِ — سبعةٌ يدويّةٌ، ستّةٌ تبقى، وواحدٌ يُعرَضُ على المالك

**خمسةٌ تحملُ نصّاً داخلَ الرسمِ فيمتنعُ توليدُها** (والتوليدُ ممنوعٌ فيه النصُّ أصلاً):
`g1a1-1-2`#٢ · `g1a1-2-2`#٢ · `g1a1-2-3`#٢ · `g4a2-2-2`#١ · وسؤالا علاماتِ الترقيمِ
`g2a1-1-6`#٦ و`g2a2-2-6`#٦ — **والعلامةُ المرسومةُ هي السؤالُ نفسُه**.

### ⚠️ `g4a1-1-2`#٤ — شعارُ عُمان الوطنيّ: **موقوفٌ على قرارِ المالك**

الرسمُ الوحيدُ الخالي من النصِّ هو **الشعارُ الوطنيّ** (خنجرٌ وسيفانِ ونِطاق) في سؤالِ
«اسحبِ اسمَ كلِّ جزءٍ إلى موضعِه في الشِّعار».

> **ولم أولّدْه ولم ألمسْه.** الشعارُ **رمزٌ وطنيٌّ رسميّ**، ونموذجُ توليدٍ قد يُخرجُه بنسبٍ
> أو تفاصيلَ غيرِ دقيقةٍ — وشعارٌ غيرُ دقيقٍ أمامَ تلاميذِ عُمان أسوأُ من رسمٍ يدويٍّ بسيطٍ
> صحيح. **والرسمُ الحاليُّ يعملُ ونقاطُ سحبِه مضبوطة.**
>
> فإن أُريدَ تحسينُه فبقرارٍ صريحٍ من المالكِ ومراجعتِه للنتيجةِ قبلَ الاعتماد.

---

# جولةُ «ديني حياتي» — ٢٠٢٦-٠٨-٢٩

## ① الجردُ أوّلاً — ولماذا الحصادُ قليلٌ وهذا طبيعيّ

الكتبُ الثمانيةُ **٦١٨ سؤالاً**، منها **٣١١ لا تحملُ بطاقةً واحدةً تُرسَم**. والسببُ
طبيعةُ المادّةِ لا نقصُ المكتبة: غالبُ محتواها **مجرَّد** — عباراتٌ وأذكارٌ · مفاهيمُ
عقديةٌ (يومُ الحساب · البعث) · صفاتٌ وقيمٌ (الأمانةُ · التواضع) · جُمَلٌ فعليّةٌ
(أرفعُ يدي · أساعدُ جاري) · أسماءُ صحابة.

**فلم تبلغِ المرشَّحاتُ الحقيقيةُ أربعةَ أسئلةٍ في المادّةِ كلِّها** — وقد فُعِّلَت جميعاً:

| السؤال | الكتاب | ما لزم |
|---|---|---|
| `g1d2-3-2`#٤ «صنّف ما سخّره الله لي» | الأول ج٢ | **لا شيء** |
| `g1d2-4-2`#٤ «صنّف كلّ عضو» | الأول ج٢ | **لا شيء** |
| `g1d1-1-2`#٣ «صِلْ كلّ أداةٍ بما تنظّفه» | الأول ج١ | `سواك` · `صابون` · تسجيلُ `مشط` |
| `g1d1-1-5`#١ «أيُّ الحيواناتِ نجسٌ حرّم الله أكله؟» | الأول ج١ | `خنزير` · `بقرة` |

> **ورسمُ الخنزيرِ بموافقةِ المالكِ الصريحةِ** حينَ سُئِلَ (٢٠٢٦-٠٨-٢٩)، وهو معتادٌ في
> الكتبِ المدرسيةِ العُمانيةِ لهذا السؤالِ بعينِه.

## ② ما لا يُرسَمُ في هذه المادّةِ — بابٌ مستقلٌّ عن الصفوف

| المحتوى | الحكم |
|---|---|
| آيةٌ · حديثٌ · ذكرٌ مأثور | ⛔ **حرمةُ النصِّ الشريف** — لا يُرسَمُ ولا يُبعثَر |
| النبيُّ ﷺ والصحابة | ⛔ **لا صورةَ لهم** — يُمثَّلُ الحدثُ بالمكانِ والرمز |
| مفاهيمُ عقديةٌ وصفاتٌ وقيم | ⛔ لا جسمَ لها، والرسمُ يستبدلُ السؤال |
| الدمُ والقيء (`g1d1-1-5`#٤) | ⛔ لا تليقُ ببطاقةِ تلميذٍ في الصفِّ الأول |

## ③ رسومُ الأسئلة — ثلاثةَ عشرَ تبقى، وثلاثةٌ نُظِرَ فيها

**ثمانيةٌ منها صفحةُ المصحفِ نفسُها** (واحدةٌ في كلِّ كتاب): «انقرْ على شريطِ اسمِ السورة» —
**آياتٌ قرآنيةٌ داخلَ الرسم**، تبقى يدويّةً قطعاً. وخمسةٌ أخرى فيها نصٌّ (أذكارٌ · أوراقٌ
مكتوبةٌ · علامةُ سجودِ التلاوة) فتبقى كذلك.

| المرشَّح | القرار |
|---|---|
| `g1d1-2-5`#٦ «ما يمنعُ صلاتَه في المسجد» | ✅ **أُنجِزَ** — انظر أدناه |
| `g1d1-1-3`#٦ «الصورةُ التي فيها خطأ» (العطاس) | ⛔ **يبقى يدوياً** — أربعُ لوحاتٍ بأربعةِ أشخاصٍ يفترقونَ بفرقٍ دقيقٍ واحد. التوليدُ لا يضبطُ **عددَ اللوحاتِ ولا الفرقَ بينها**، ويخالفُ «التقليل» |
| `g1d1-1-4`#٦ «لوّنِ البيتَ الذي وُلِدَ فيه النبيُّ ﷺ» | ⛔ **يبقى يدوياً** — تلوينٌ يحتاجُ مساراتٍ مسمّاةً لا صورةً نقطيّة |

> **وقاعدةُ الأشخاصِ في هذه المادّة (قرارُ المالك ٢٠٢٦-٠٨-٢٩): «يُسمَحُ ولكنْ مع التقليل».**
> فالشخصُ العاديُّ بلا ملامحِ وجهٍ مباحٌ في مشاهدِ السلوك، **ويُقلَّلُ عددُه ما أمكن** —
> ومشهدٌ يحتاجُ أربعةَ أشخاصٍ يُترَكُ.

## ④ ⛔ عطبٌ عامٌّ اكتُشِفَ بالمصادفةِ وأُصلِح — عشرُ بطاقاتٍ بخلفيةٍ بيضاءَ صلبة

ظهرَ «المُشطُ» في `g1d1-1-2`#٣ **مربَّعاً أبيضَ** على كبسولةِ البطاقة. والعلّةُ أنّ
`مشط.png` **خلفيتُه بيضاءُ صلبةٌ لا شفّافة** — وهو العطبُ المحذَّرُ منه في مهارةِ
`shoogp-graphics` («الخلفيةُ الصلبةُ عطبٌ لا تفصيل»).

**فمُسِحَتِ المكتبةُ كلُّها**: من **٢٠٤ بطاقةٍ مسجَّلةٍ** كانت **عشرةٌ** بخلفيةٍ صلبة:

`أسنان` · `إبريق` · `إوزة` · `بيض` · `حاسوب` · `دراجة` · `زرافة` · `صقر` · `طائرة` · `كأس`
(‏و`مشط` معها).

> **وكلُّها أصولٌ قديمةٌ سبقت مسارَ التهيئةِ الحاليّ** — فكلُّ ما وُلِّدَ ومُرِّرَ على
> `prep.py` خرجَ شفّافاً. وأكثرُها **فُعِّلَ في هذه الجلسةِ نفسِها** (زرافةٌ وإبريقٌ وكأسٌ
> وطائرةٌ وأسنانٌ وحاسوب)، فكانَ العطبُ سيظهرُ في أسئلةٍ عدّةٍ دفعةً واحدة.
>
> **أُصلِحَت العشرةُ بالفيضِ من الحافّةِ** (‏`prep.py` نفسُه) بلا إعادةِ توليدٍ ولا مساسٍ
> بالرسمِ نفسِه، وأُعيدَ الفحصُ فصارَ **صفراً**.

### ✅ `g1d1-2-5`#٦ — مشهدُ المسجدِ أُنجِزَ (٢٠٢٦-٠٨-٢٩)

`images/مسجد-وطفل.png` (‏٩٠٠×٥١٨ · نسبة ١٫٧٤ · ٢٠KB)، و`spot` **مستطيلٌ**
`{x:86.0, y:57.1, w:10.0, h:17.0}`.

**والتقليلُ محفوظ: شخصٌ واحدٌ فقط** — طفلٌ في ثوبٍ أبيضَ **بلا ملامحِ وجهٍ إطلاقاً**،
ومسجدٌ بقبّةٍ ومئذنةٍ وبابٍ معقود. لا ثالثَ لهما في الصورة.

**والبقعةُ قِيسَت بالبكسلِ لا بالعين:** الأحمرُ اللونُ **الوحيدُ** في الصورةِ كلِّها
(نُصَّ عليه في البرومبتِ لهذا السبب)، فمسحُ البكسلِ الأحمرِ أعطى حدودَها مباشرةً:
‏٨٣٫٢٪–٨٨٫٨٪ عرضاً و٥١٫٠٪–٦٣٫٣٪ ارتفاعاً.

> ⚠️ **ووُسِّعَ المستطيلُ عن المقيسِ عمداً** من ‏٥٫٦×١٢٫٤ إلى ‏١٠×١٧: البقعةُ المقيسةُ
> **٥٫٦٪ عرضاً فقط**، وهو هدفٌ ضيّقٌ على إصبعِ تلميذِ الصفِّ الأولِ على السبّورة. والتوسيعُ
> **يبقى داخلَ الثوبِ الأبيضِ** ولا يبلغُ يداً ولا رأساً ولا حافّة — رُسِمَ فوقَ الصورةِ
> ونُظِرَ إليه قبلَ الاعتماد. **فالقاعدةُ تمنعُ ابتلاعَ الجارِ لا التوسيعَ في فراغِ الهدفِ نفسِه.**

**واختبارُ النقرِ ذو الطرفَين:** سبعٌ داخلَ المستطيلِ تُقبَل، وسبعٌ خارجَه (الرأسُ · أسفلُ
الثوبِ · المسجدُ · الفراغُ · يمينَ الطفلِ ويسارَه) تُرَدّ.
