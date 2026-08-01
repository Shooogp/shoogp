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
