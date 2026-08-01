/* ═══════════════════════════════════════════════════════════════════
   نظام واجهة شوجب الفضائي (مهارة shoogp-ui) — سكربت التفعيل
   مُعمَّم على كامل كتاب علوم الصف الرابع (g4-sci) عبر بوّابة .shoogp-ui.
   لا يمسّ app.js ولا الكتب الأخرى؛ كل ما هنا يعمل فقط حين تكون البوّابة مفتوحة.
   ═══════════════════════════════════════════════════════════════════ */
/* ═══ مسار صور الإطارات: يُحسب ديناميكياً من موقع ملف السكربت نفسه ═══
   المسار النسبيّ ../images/ (في متغيّر CSS --fimg على عنصرٍ inline) يُحَلّ نسبةً
   إلى *المستند* لا إلى ملف السكربت؛ فينكسر على مواقع مشاريع GitHub Pages
   (‎/repo/‎ → ‎/images/‎ فوق الجذر → 404)، ويتكرّر مع أي عمق نشرٍ مختلف.
   الحلّ الصامد: نستخرج جذر الصور من document.currentScript.src (رابطٌ مطلق دائماً،
   محسوبٌ من موقع السكربت الفعليّ)، فيعمل الإطار في أيّ درسٍ ونطاقٍ بلا تعديل يدويّ. */
var IMG_BASE=(function(){
  var s=(document.currentScript && document.currentScript.src) || '';
  var b=s.replace(/[?#].*$/,'').replace(/\/js\/[^\/]*$/,'/images/ui/');
  return /\/images\/ui\/$/.test(b) ? b : 'images/ui/';   /* احتياطٌ آمن */
})();
function imgURL(name){ return IMG_BASE + name; }
/* نطاق التعميم: كتب الحلقة المفعّلة في النظام. لكل كتاب: مفتاحه في DATA.index
   (مصدر النطاق — أي درس يُضاف للكتاب يدخل تلقائياً)، وبادئة رمز دروسه (احتياطٌ
   عند غياب DATA)، ومادّته (مفتاح اختيار الإطار حسب المادة — §مادة الدرس).
   المفعَّلُ اليوم: علومُ الرابع (g4s-) ورياضياتُ الرابع (g4m-) ورياضياتُ الثاني (g2m-)؛
   إضافة كتابٍ = سطرٌ واحد هنا، يرثُ به كلَّ قواعدِ مادّتِه بلا كودٍ جديد. */
var SHOOGP_BOOKS=[
  {key:'g4-sci',  prefix:'g4s-', subject:'science'},
  {key:'g4-math', prefix:'g4m-', subject:'math'},
  /* الرياضيات — الصف الثاني: أوّلُ كتابٍ يرثُ مرجعَ مادّتِه بسطرٍ واحدٍ بلا كودٍ خاصّ
     ولا صنفٍ ولا قاعدةِ CSS. عائلةُ math وقشرةُ skin-metal وعلامةُ subj-math تُشتَقُّ
     كلُّها من `subject` وحدَه، ولونُ الشريطِ من `band` في data/books.json. */
  {key:'g2-math', prefix:'g2m-', subject:'math'}
];
/* ═══ الوصولُ إلى DATA — لا عبرَ window ═══
   `DATA` في js/data.js معلَنٌ بـ`const` على مستوى السكربت، و`const/let` في النطاقِ
   العلويِّ **لا تُصبحُ خصائصَ على window** (بخلافِ `var`). فـ`window.DATA` تساوي
   `undefined` دائماً، وكلُّ حارسٍ مكتوبٍ هكذا يسقطُ صامتاً إلى الاحتياط. الوصولُ
   الصحيحُ هو الاسمُ المجرّدُ محروساً بـ`typeof` (سكربتاتُ المنصّةِ كلُّها كلاسيكيةٌ
   في نطاقٍ عامٍّ واحد). نفسُ العلّةِ تنطبقُ على `currentBookColor` في app.js. */
function theData(){ return (typeof DATA!=='undefined') ? DATA : null; }
/* كتاب الدرس (أو null إن خارج النطاق) — يُعتمد لتحديد النطاق والمادة معاً */
function lessonBook(ls){
  if(!ls || !ls.file) return null;
  var D=theData();
  for(var i=0;i<SHOOGP_BOOKS.length;i++){
    var b=SHOOGP_BOOKS[i];
    var idx=(D && D.index && D.index[b.key]);
    if(idx){
      if(idx.units.some(function(u){
        return u.lessons.some(function(l){ return l.file===ls.file; }); })) return b;
    } else if(ls.file.indexOf(b.prefix)===0){ return b; }
  }
  return null;
}
function lessonInScope(ls){ return !!lessonBook(ls); }
/* مادة الدرس (science/math) — مفتاح اختيار الإطار حسب المادة */
function lessonSubject(ls){ var b=lessonBook(ls); return b?b.subject:null; }
/* مادة الدرس المفتوح حالياً — تُضبط في ترقيع openLesson، وتقرؤها resolveCfg */
var _curSubject=null;
/* وكتابُه (مدخلُه في SHOOGP_BOOKS) — مفتاحُ لونِ بطاقتِه لكسوةِ الشريطِ الخلفيّ */
var _curBook=null;
/* ═══ قشورُ أزرارِ الإجابة حسبَ المادة (كسوةٌ بصريةٌ بحتة) ═══
   «القشرة» = صنفٌ واحدٌ يُوضَع على #questionList بجانبِ بوّابةِ .shoogp-ui، يلتقطه
   CSS (§٩ في css/shoogp-ui.css) فيُعيدُ كسوةَ أزرارِ الإجابةِ لتلكَ المادةِ وحدَها.
   المصدرُ هو **نفسُ منطقِ إطاراتِ المواد** (lessonSubject ← الكتاب في SHOOGP_BOOKS)،
   فلا مصدرَ ثانٍ للحقيقة. المادةُ التي لا قشرةَ لها تبقى على شكلِها القائمِ دونَ أيِّ
   تغيير (الرياضياتُ اليوم). لا تمسُّ القشرةُ منطقَ الأسئلةِ ولا بنيةَ DOM.
   **إضافةُ مادةٍ لاحقاً = سطرٌ هنا + كتلةُ CSS بنفسِ اسمِ الصنف.** */
var SUBJECT_SKINS={ science:'skin-rocky', math:'skin-metal' };
/* مرحلةُ المعاينة: تحصرُ القشرةَ بدروسٍ بعينِها ريثما تُعتمَد.
   **اعتُمدت القشرةُ وعُمِّمت على كلِّ دروسِ العلوم** — `null` تعني «بلا حصر».
   (تُعادُ قائمةٌ هنا لو أُريدَ حصرُ قشرةٍ *جديدةٍ* بدروسِ معاينةٍ مستقبلاً.) */
var SKIN_PREVIEW_ONLY=null;
/* قشرةُ الدرس (أو null): قشرةُ مادتِه، محكومةً بقائمةِ المعاينةِ إن كانت مفعّلة. */
function skinFor(ls){
  var skin=SUBJECT_SKINS[lessonSubject(ls)];
  if(!skin) return null;
  if(SKIN_PREVIEW_ONLY && SKIN_PREVIEW_ONLY.indexOf(ls && ls.file)<0) return null;
  return skin;
}
/* كلُّ أصنافِ القشور — تُنزَع جميعاً قبلَ وضعِ صنفِ الدرسِ الحاليّ (لا بقايا بين الدروس) */
function allSkinClasses(){
  return Object.keys(SUBJECT_SKINS).map(function(k){ return SUBJECT_SKINS[k]; });
}
/* ═══ علامةُ المادة (`subj-*`) — دائمةٌ لكلِّ دروسِ المادة ═══
   تُميَّزُ عن «القشرة» أعلاه: القشرةُ كسوةٌ ثقيلةٌ محكومةٌ بقائمةِ المعاينة، أمّا هذه
   فعلامةٌ خفيفةٌ تُوضَع **لكلِّ درسٍ في نطاقِ النظام** تقولُ «هذا درسُ علومٍ/رياضيات»،
   فتلتقطُها قواعدُ CSS الخاصةُ بمادةٍ بعينِها (كلونِ نصِّ السؤال) وتسري على الكتابِ كلِّه.
   مصدرُها نفسُه: `lessonSubject` ← `SHOOGP_BOOKS`. */
function subjectClass(subj){ return subj ? 'subj-'+subj : null; }
function allSubjectClasses(){
  return SHOOGP_BOOKS.map(function(b){ return subjectClass(b.subject); });
}
/* البوّابة: هل النظام مُفعَّل الآن؟ (صنف .shoogp-ui على #questionList) */
function gateOn(){
  var q=document.getElementById('questionList');
  return !!(q && q.classList.contains('shoogp-ui'));
}

/* ═══════════════════════════════════════════════════════
   حقن صور التنقل بعد أن يبني app.js الأزرار:
   الصورة <img> داخل الزرّ (التالي معكوس scaleX(-1) عبر CSS أعلاه)
   والنصّ الحيّ في <span class="ncap"> منفصل فلا يُعكس معها.
   معالجات النقر على الزرّ نفسه فتبقى سليمة.
   بقية العناصر (تحقّق/إعادة/الشارات/المؤشر/البطاقات) صور خلفية CSS خالصة.
   ═══════════════════════════════════════════════════════ */
/* ═══════════ عائلة الإطارات القمرية — خوارزمية «اختيار ثم ضبط» ═══════════
   لا تمرير داخلياً أبداً. لكل سؤال:
   (١) الاختيار: نقيس ارتفاع محتواه الفعلي (بالخطوط الدنيا: السؤال 22px،
       العناصر 18px، التفاعلي 60px) داخل نافذة كل إطار عند حجمه الأساسي،
       فنحسب kNeed = المطلوب/المتاح. الإطار المختار = الأصغر الذي يسع المحتوى
       ضمن سقف التكبير (أكبر kNeed ≤ 1.30) = الأقرب سعةً بأقلّ هدر.
   (٢) الضبط: نكبّر/نصغّر الإطار كاملاً بمقياس موحّد (النسبة محفوظة، بلا شد)
       حتى تسع نافذته المحتوى بالضبط.
   القيود: تكبير ≤ +30% · تصغير ≥ −25% · الإطار ≤ 92% من المساحة الرأسية.
   إن عجز l حتى عند +30% → حاوية CSS مرنة (qflex) بروح العائلة، بلا تمرير.
   FRAME_FAMILIES: جدولٌ صريحٌ (مادة × حجم)؛ كلُّ خانةٍ {img,ar,win,hasFill[,fillColor]}. */
/* ═══ نظام «فريم لكل مادة» — جدولٌ حجماً بحجم ═══
   لكلِّ مادةٍ عائلةٌ فيها **خانةٌ لكلِّ حجم** (s/m/l/tall)؛ خوارزميةُ «الاختيار ثم الضبط»
   تعملُ داخلَ عائلةِ المادةِ الحالية فتختارُ الحجمَ بالنسبة، ثم تأخذُ خانتَه.
   **`hasFill` لكلِّ خانة** (لا للعائلة):
     • false ← تعبئةٌ نقطيةٌ عبر طبقةِ .qfill (القمريّ).
     • true  ← التعبئةُ مدموجةٌ في صورةِ الفريم نفسِها؛ لا تُبنى/تُخفى .qfill.
   `ar` = نسبةُ الصورةِ الفعلية (**خطٌّ أحمر §٣**). `win` = إزاحاتُ نافذةِ المحتوى (تحصرُه
   في المنطقةِ الداخلية). `fillColor` (لخانةِ hasFill) = لونُ التعبئةِ المدموج (لخلفيةِ الحاوية
   المرنة). المسارُ مطلقٌ عبر imgURL. **الإكمالُ لاحقاً:** استبدلْ خانةَ الرياضيات s/l بفريمِها
   المعبّأ بسطرٍ واحد (img+ar+win+hasFill:true+fillColor) متى توفّر frame-math-l. */
var FRAME_FAMILIES={
  moon:{ order:['s','m','l','tall'], flexBase:'l', sizes:{
    s:{img:'frame-moon-s.png', ar:'1836 / 856',  win:{top:'13%',  left:'8.5%', right:'9%',    bottom:'13.5%'}, hasFill:false},
    m:{img:'frame-moon-m.png', ar:'1448 / 1086', win:{top:'10%',  left:'9.5%', right:'9.5%',  bottom:'11%'},   hasFill:false},
    l:{img:'frame-moon-l.png', ar:'1246 / 1222', win:{top:'10.5%',left:'12.5%',right:'11.5%', bottom:'11.5%'}, hasFill:false},
    tall:{img:'frame-moon-tall.png', ar:'973 / 1464', win:{top:'9.7%', left:'14.6%', right:'14.3%', bottom:'13.8%'}, hasFill:false}
  }},
  /* الرياضيات — **عائلةٌ مكتملةٌ الآن**: أربعُ خاناتٍ بفريمِها المعبّأ، بلا أيِّ إحالةٍ
     إلى صورِ القمر. كلُّ `win` **مقيسةٌ من صورتِها بملءٍ فيضيٍّ من المركز** (أدقُّ من
     مسحِ سطرٍ واحدٍ لأنّ حوافَّ إطاراتِ الرياضياتِ تحملُ أضواءً سماويةً تُشبهُ لونَ
     التعبئةِ فتخدعُ المسحَ الخطّيّ)، مضافاً إليها تنفّسٌ يسير (~2%)، والأسفلُ أوسعُ
     لأنّ ميداليةَ النجمةِ تقتحمُ حافّتَه في الأربعةِ جميعاً.
       s    1536×1024 · تعبئة #00b6d7 · فتحةٌ قِيست L13.8/R13.8/T26.8/B24.3٪
       m    1138×818  · تعبئة #01afda · فتحةٌ قِيست L11.8/R11.9/T13.8/B15.0٪ (مساحة 50.8٪)
       l    1261×1247 · تعبئة #03a5ec · فتحةٌ قِيست L13.1/R12.8/T10.4/B13.1٪ (نافذة 934×954)
       tall 1086×1448 · تعبئة #01a2df · فتحةٌ قِيست L14.5/R14.3/T9.9/B9.3٪  (نافذة 773×1171)
     ونِسَبُ `win` أدناه **أوسعُ إنساحاً من الفتحةِ المقيسة عمداً**: الفتحةُ تُقاسُ إلى
     أقصى امتدادِ اللونِ فتشملُ مدى الزوايا المستديرة، فلو لُصِقَ المحتوى بها لامسَ
     القوسَ في الأركان. الإنساحُ الزائدُ يُبعدُه عن الأقواسِ ويحفظُ التنفّس (§٨). */
  math:{ order:['s','m','l','tall'], flexBase:'l', sizes:{
    s:{img:'frame-math-s.png', ar:'1536 / 1024', win:{top:'28.5%',left:'15.5%',right:'15.5%',bottom:'26%'},   hasFill:true, fillColor:'#00b6d7'},
    m:{img:'frame-math-m.png', ar:'1138 / 818',  win:{top:'16%',  left:'14%',  right:'14%',   bottom:'19%'},   hasFill:true, fillColor:'#01afda'},
    l:{img:'frame-math-l.png', ar:'1261 / 1247', win:{top:'13%',  left:'15%',  right:'15%',   bottom:'18.5%'}, hasFill:true, fillColor:'#03a5ec'},
    tall:{img:'frame-math-tall.png', ar:'1086 / 1448', win:{top:'13%', left:'16.5%', right:'16.5%', bottom:'14%'}, hasFill:true, fillColor:'#01a2df'}
  }}
};
/* مادةُ الدرس → عائلةُ الفريم: الرياضيات ← math، وبقيةُ المواد ← moon (الافتراضية). */
function famFor(subj){ return (subj==='math') ? FRAME_FAMILIES.math : FRAME_FAMILIES.moon; }
function curFam(){ return famFor(_curSubject); }
/* هندسةُ الفريم لخانةِ (المادةِ الحالية × الحجم). */
function resolveCfg(size){ var fam=curFam(); return fam.sizes[size] || fam.sizes[fam.order[0]]; }
var BASE_FILL=0.70;   /* حجم مقياس 1: ارتفاع الإطار = 70% من المساحة المتاحة */
var CAP_DOWN=0.75;    /* حدّ التصغير: −25% من الحجم الأساسي */
var DEV=true;         /* تقرير تطويري في الطرفية عن دقّة الحساب المسبق */
/* الحاوية المرنة (qflex) ملاذٌ أخير ونادر. يُطبع رقم انحراف صندوقها عن نسبة نافذة l. */
var QFLEX_NOM_AR=1246/1222;     /* نسبة إطار moon l (مرجع طباعة الانحراف) */
var BASE_FILL=0.70;   /* حجم مقياس 1: ارتفاع الإطار = 70% من المساحة المتاحة */
var CAP_DOWN=0.75;    /* حدّ التصغير: −25% من الحجم الأساسي */
var DEV=true;         /* تقرير تطويري في الطرفية عن دقّة الحساب المسبق */
/* الحاوية المرنة (qflex) ملاذٌ أخير ونادر بعد إضافة tall. لم تعد معفاةً من فحص
   النسبة: يُطبع رقم انحراف صندوقها عن نسبة نافذة l. لا سقف ولا مئزر ولا round —
   صورتها تُعرض contain كسائر الإطارات (بلا مطّ ولا تكرار). */
var QFLEX_NOM_AR=1246/1222;     /* نسبة إطار l (مرجع طباعة الانحراف) */

function frameAR(cfg){          /* الارتفاع÷العرض (لاشتقاق ارتفاع من عرض) */
  if(!cfg._r){ var p=cfg.ar.split('/'); cfg._r=parseFloat(p[1])/parseFloat(p[0]); }
  return cfg._r;
}
/* نسبة نافذة الإطار (العرض÷الارتفاع بعد إزاحات .win) — مفتاح الاختيار بالنسبة.
   محسوبة مرّة ومخبّأة. تُقارَن بنسبة المحتوى: الإطار يسع المحتوى إن كانت نسبة
   نافذته ≤ نسبة المحتوى، والأفضل = أعلى نسبة نافذة تسعه (أقلّ فراغ رأسيّ). */
function frameWinAR(cfg){
  if(cfg._war==null){
    var p=cfg.ar.split('/'), W=parseFloat(p[0]), H=parseFloat(p[1]);
    var iw=1-parseFloat(cfg.win.left)/100-parseFloat(cfg.win.right)/100;
    var ih=1-parseFloat(cfg.win.top)/100-parseFloat(cfg.win.bottom)/100;
    cfg._war=(W*iw)/(H*ih);
  }
  return cfg._war;
}
/* الارتفاع/العرض في الفضاء التصميميّ (واعٍ بملاءمة العرض zoom): تحت الملاءمة
   نقيس على الأبعاد التصميميّة لا الحقيقية، وإلا اختلّ اختيار الإطار وحجمه. */
function fitH(){ var f=window.ShoogpFit; return (f&&f.active)? f.designH : window.innerHeight; }
function fitW(){ var f=window.ShoogpFit; return (f&&f.active)? f.designW : window.innerWidth; }
function availHeight(){ return Math.max(380, fitH()*0.80); }

/* لفّ محتوى كل بطاقة داخل هيكل الإطار — بمقاس مبدئي محايد؛ fitFrame() يختار الحجم.
   طبقةُ .qfill تُبنى **دائماً** (الحجمُ/الخانةُ غيرُ معروفَين بعد)، ثم يُخفيها applyFrame
   لخاناتِ hasFill:true (تعبئةٌ مدموجة) ويُظهرها للنقطية — فقد تختلطُ خاناتٌ من النوعين
   في درسٍ واحد (كسؤالِ رياضياتٍ حجمُه m معبّأ وآخرَ حجمُه s قمريّ نقطيّ). */
function frameize(){
  document.querySelectorAll('.qcard:not([data-frame])').forEach(function(c){
    c.dataset.frame='1';
    var head=c.querySelector('.qhead');
    var f=document.createElement('div'); f.className='qframe qf-m';
    var fill=document.createElement('div'); fill.className='qfill';
    var moon=document.createElement('div'); moon.className='qmoon';
    var w=document.createElement('div'); w.className='qwin';
    f.appendChild(fill); f.appendChild(moon); f.appendChild(w);
    Array.prototype.slice.call(c.children).forEach(function(ch){
      if(ch!==head) w.appendChild(ch);
    });
    c.appendChild(f);
  });
}
/* عاملُ انحصار التعبئة: حافةُ .qfill تقعُ عند نسبةٍ من عمقِ حافةِ الإطار (من الحدِّ
   الخارجيّ 0 إلى الحدِّ الداخليّ = الفتحة). 0.9 ⇒ تصلُ التعبئةُ إلى الفتحة وتتوغّلُ
   ~10% من عمقِ الحافة تحتَ المعدنِ (تداخلٌ يمنعُ الخيطَ الفاصلَ، محصورٌ تحتَ الإطار). */
var FILL_K=0.9;
/* نسبةُ فتحةِ صورةِ الإطار (٪ من أبعاد الصورة) من القياس الحيّ — أو null إن لم يجهز.
   بما أنّ نسبةَ صندوقِ الإطار = نسبةَ صورته (بلا letterbox)، فنسبةُ الفتحةِ من الصورة
   = نسبتُها من الصندوق مباشرةً، فتصلحُ كإزاحةٍ مئويةٍ للتعبئةِ في أيِّ مقاسٍ (scale). */
function openingPct(name){
  var g=_frameGeo[name];
  if(!g || g==='pending') return null;
  return {left:g.oL/g.natW*100, right:(g.natW-1-g.oR)/g.natW*100,
          top:g.oT/g.natH*100,  bottom:(g.natH-1-g.oB)/g.natH*100};
}
/* هل للصورةِ فتحةٌ شفّافةٌ حقيقيةٌ تُرى منها التعبئةُ النقطية؟
   القياسُ يلتقطُ «أطولَ مدىً شفّافٍ» في السطرِ/العمودِ الأوسط؛ فإن كانت الصورةُ معتمةَ
   الداخلِ (تعبئتُها مدموجةٌ في الملفّ) التقطَ بدلاً عن الفتحةِ هامشاً خارجياً ملاصقاً
   للحافّة — فتنزلقُ .qfill إلى شريطٍ رفيعٍ على الحافّةِ يظهرُ من تحتِ الإطارِ كخيطٍ أخضر.
   الفتحةُ الحقيقيةُ لا تلامسُ حافّةَ الصورةِ أبداً ولا تكونُ ضامرة؛ فمتى لامستْ حافّةً أو
   قلَّ مساحتُها عن رُبعِ الصورة عددناها «بلا فتحة» فتُخفى .qfill (وهي أصلاً محجوبةٌ خلفَ
   إطارٍ معتم). قاعدةٌ عامةٌ تصحّحُ نفسَها: إن أُعيدَ تصديرُ الصورةِ بفتحةٍ شفّافةٍ عادتِ
   التعبئةُ تلقائياً. `null` (لم يجهزِ القياسُ بعد) ← أبقِ السلوكَ السابقَ حتى يجهز. */
function frameHasWindow(name){
  var g=_frameGeo[name];
  if(!g || g==='pending') return true;            /* لم يجهز → لا تحكم بعد */
  if(g.oL<=0 || g.oT<=0 || g.oR>=g.natW-1 || g.oB>=g.natH-1) return false;
  return ((g.oR-g.oL+1)*(g.oB-g.oT+1)) > (g.natW*g.natH*0.25);
}
/* ═══ فصلُ «الهندسة» عن «الرسم» — علاجُ عاصفةِ الطلباتِ الملغاة (canceled) ═══
   خوارزميةُ الاختيارِ تستدعي applyFrame ٢١ مرّةً لكلِّ بطاقة (قِيست) (مرشَّحٌ لكلِّ حجم +
   ١٦ خطوةَ بحثٍ ثنائيّ + التثبيت). لو كتبنا --fimg في كلِّ استدعاءٍ لأطلقَ المتصفّحُ
   طلبَ صورةٍ جديداً في كلِّ مرّة ثمّ ألغاه فورَ تغيُّرِ المتغيّر — عشراتُ طلباتٍ ملغاةٍ
   (canceled) عندَ تعطيلِ الكاش، وتأخُّرُ ظهورِ صورةِ الفائزِ لأنّ تحميلَها لا يبدأُ إلا
   بعدَ آخرِ كتابة. والحقيقةُ أنّ القياسَ لا يحتاجُ الصورةَ إطلاقاً: الاتساعُ يتحدّدُ
   بنسبةِ الصندوق (aspect-ratio) وإزاحاتِ النافذة فقط، و.qfill مطلقةُ الموضعِ فلا تدخلُ
   في scrollHeight. فصلناهما: applyFrame = هندسةٌ خالصة (تُستدعى في كلِّ سبر)، وpaintFrame
   = رسمٌ (صورة + طبقةُ التعبئة) يُستدعى **مرّةً واحدةً** على الفائزِ فقط. */
function applyFrame(f,fill,w,size,paint){
  var cfg=resolveCfg(size);
  f.style.aspectRatio=cfg.ar;
  ['top','left','right','bottom'].forEach(function(k){ w.style[k]=cfg.win[k]; });
  if(paint) paintFrame(f,fill,cfg);
  return cfg;
}
/* الرسم: صورةُ الإطار (--fimg، مسارٌ مطلق عبر imgURL) وطبقةُ التعبئة.
   إزاحاتُ التعبئة (.qfill) = نسبةٌ مئويةٌ من أبعاد الإطار محكومةٌ بفتحته الفعلية
   (openingPct × FILL_K) — قاعدةٌ نسبيةٌ واحدةٌ تتبعها كلُّ الأطر، تنحصرُ تلقائياً بين
   الحافتين مهما تغيّر الحجمُ أو الدرسُ أو المادة. احتياطاً (قبل جهوزِ القياس): نصفُ
   إزاحةِ نافذةِ الإعداد. (الحاويةُ المرنةُ qflex تُعالَج بـplaceFill لأنها تُحاط letterbox.)
   لا نكتبُ --fimg إلا إن تغيّرت قيمتُه فعلاً، فلا طلبَ جديداً لصورةٍ معروضةٍ أصلاً. */
function paintFrame(f,fill,cfg){
  var url="url('"+imgURL(cfg.img)+"')";
  f.dataset.fimg=cfg.img;                       /* اسمُ الصورةِ المعروضة — مفتاحُ هندسةِ الأيقونات */
  if(f.style.getPropertyValue('--fimg')!==url) f.style.setProperty('--fimg',url);
  if(!fill) return;
  /* تعبئةٌ مدموجةٌ في الصورة (إعلاناً أو واقعاً: صورةٌ بلا فتحةٍ شفّافة) → أخفِ الطبقةَ النقطية */
  if(cfg.hasFill || !frameHasWindow(cfg.img)){ fill.style.display='none'; return; }
  fill.style.display='';
  var op=openingPct(cfg.img);   /* انحصار التعبئة النقطية بفتحة الصورة (§٥) */
  ['top','left','right','bottom'].forEach(function(k){
    var v = op ? (op[k]*FILL_K) : (parseFloat(cfg.win[k])*0.5);
    fill.style[k]=v.toFixed(2)+'%';
  });
}
/* ═══ قياسُ فتحةِ صورةِ الإطار (bbox الشفافية) — مصدرُ هندسةِ التعبئة ═══
   نقيسُ *مرّةً* فتحةَ كلِّ صورةِ إطارٍ عبر canvas ونخبّئها. تُشتَقّ منها نسبةُ الفتحة
   (openingPct) لقاعدةِ انحصارِ التعبئة النسبية في applyFrame — وتُستعمَل أيضاً في
   placeFill لحالةِ الحاوية المرنة qflex فقط (لأنها تُحاط letterbox فلا تكفيها النِّسَب).
   القياسُ من نفسِ الأصل (imgURL مطلق) فلا تلوُّثَ CORS. */
var _frameGeo={};   /* name → {natW,natH,oL,oR,oT,oB,aL,aR,aT,aB} | 'pending' | null(تعذّر) */
function measureFrameGeo(name){
  if(!name || _frameGeo[name]!==undefined) return;   /* مقيسٌ أو قيد القياس */
  _frameGeo[name]='pending';
  var im=new Image();
  im.onload=function(){
    try{
      var W=im.naturalWidth,H=im.naturalHeight,x,y,a;
      var cv=document.createElement('canvas'); cv.width=W; cv.height=H;
      var g=cv.getContext('2d'); g.drawImage(im,0,0);
      var d=g.getImageData(0,0,W,H).data;
      var cy=H>>1, bl=0,br=0,best=0,cs=-1;         /* أطول مدى شفّاف في السطر الأوسط */
      for(x=0;x<W;x++){ a=d[(cy*W+x)*4+3];
        if(a<128){ if(cs<0)cs=x; } else if(cs>=0){ if(x-cs>best){best=x-cs;bl=cs;br=x-1;} cs=-1; } }
      if(cs>=0 && W-cs>best){best=W-cs;bl=cs;br=W-1;}
      var cxx=(bl+br)>>1, bt=0,bb=0,bv=0; cs=-1;   /* وفي العمود الأوسط للنافذة */
      for(y=0;y<H;y++){ a=d[(y*W+cxx)*4+3];
        if(a<128){ if(cs<0)cs=y; } else if(cs>=0){ if(y-cs>bv){bv=y-cs;bt=cs;bb=y-1;} cs=-1; } }
      if(cs>=0 && H-cs>bv){bv=H-cs;bt=cs;bb=H-1;}
      /* ═══ صندوقُ الرسمِ المعتم (حافّةُ الإطارِ الفعلية) — مصدرُ موضعِ الأيقونات ═══
         صورةُ الإطارِ تحملُ هامشاً شفّافاً حولَ صخرِ القمر (~2%)، فحافّةُ *الصندوق* ليست
         حافّةَ الإطارِ المرئية. نمسحُ الشفافيةَ مرّةً (في نفسِ التمريرةِ التي تقيسُ الفتحة)
         ونخبّئُ حدودَ أوّلِ/آخرِ بكسلٍ معتمٍ — فتُشتَقُّ منها إزاحاتُ الأيقوناتِ نسبةً،
         فتلاحقُ الإطارَ في كلِّ مقاسٍ وكلِّ ضبطِ scale بلا رقمٍ ثابتٍ واحد. */
      var aL=W, aT=-1, aR=-1, aB=-1;
      for(y=0;y<H;y++){
        var row=y*W, f0=-1, f1=-1;
        for(x=0;x<W;x++){ if(d[(row+x)*4+3]>=8){ if(f0<0) f0=x; f1=x; } }
        if(f0<0) continue;
        if(aT<0) aT=y;
        aB=y; if(f0<aL) aL=f0; if(f1>aR) aR=f1;
      }
      if(aT<0){ aL=0; aT=0; aR=W-1; aB=H-1; }   /* صورةٌ شفّافةٌ كلُّها → الصندوقُ كما هو */
      /* ═══ الحدُّ الداخليُّ للزخرفةِ العلوية/السفلية (decoT/decoB) — للحاويةِ المرنة ═══
         الداخلُ معتمٌ فلا تسعفُه الشفافية؛ نكشفُه لوناً: مرجعُنا لونُ مركزِ الصورة
         (التعبئةُ المستقرّة)، وننزلُ من أعلى الرسمِ حتى أوّلِ مدى مستقرٍّ بلونِ المرجع
         (طولُه ≥4% من الارتفاع) فذاك حيثُ تنتهي الزخرفةُ وتبدأُ ساحةُ المحتوى.
         داخلٌ غيرُ مستقرٍّ (مزخرفٌ كلُّه) → null ويتكفّلُ الاحتياطُ النسبيُّ في CSS. */
      var cx2=W>>1, ci=((H>>1)*W+cx2)*4, rR=d[ci], rG=d[ci+1], rB2=d[ci+2];
      var nearRef=function(yy){ var i2=(yy*W+cx2)*4;
        return d[i2+3]>=128 && Math.abs(d[i2]-rR)+Math.abs(d[i2+1]-rG)+Math.abs(d[i2+2]-rB2)<=48; };
      var runN=Math.max(8,Math.round(H*0.04)), decoT=null, decoB=null, rc=0;
      for(y=aT;y<=(H>>1);y++){ if(nearRef(y)){ if(++rc>=runN){ decoT=y-runN+1; break; } } else rc=0; }
      rc=0;
      for(y=aB;y>=(H>>1);y--){ if(nearRef(y)){ if(++rc>=runN){ decoB=y+runN-1; break; } } else rc=0; }
      _frameGeo[name]={natW:W,natH:H,oL:bl,oR:br,oT:bt,oB:bb,aL:aL,aR:aR,aT:aT,aB:aB,decoT:decoT,decoB:decoB};
    }catch(e){ _frameGeo[name]=null; }   /* تعذّر (CORS مثلاً) → تبقى الإزاحات الاحتياطية */
    reconcileAR(name, im.naturalWidth, im.naturalHeight);
    /* أعد ضبط البطاقة الظاهرة كي تُطبَّق نسبةُ الفتحة الجاهزةُ الآن على التعبئة */
    if(gateOn()){ var sh=currentShown(); if(sh){ sh.dataset.fitSig=''; fitShown(); } }
  };
  im.onerror=function(){ _frameGeo[name]=null; };
  im.src=imgURL(name);
}
/* يضع .qfill على الفتحة الفعلية بتحويل contain — للحاوية المرنة qflex فقط (نسبتها ≠
   نسبة صورتها فتُحاط letterbox، فلا تكفيها النسبةُ المئوية). تداخلٌ يسير تحت المعدن. */
function placeFill(f,fill,name){
  var geo=_frameGeo[name];
  if(!geo || geo==='pending'){ measureFrameGeo(name); return; }
  var bw=f.clientWidth, bh=f.clientHeight; if(!bw||!bh) return;
  var scale=Math.min(bw/geo.natW, bh/geo.natH);          /* contain — مُرساةً أعلى (center top) */
  var offX=(bw-geo.natW*scale)/2, offY=0;
  var bleed=Math.max(2, Math.round(scale*6));            /* تداخلٌ يسير تحت المعدن */
  /* حوافُّ الفتحة داخل صندوق الإطار (بالبكسل): يسار/أعلى موضعان، يمين/أسفل إزاحتان */
  var Lx=offX+geo.oL*scale, Rx=offX+geo.oR*scale;
  var Ty=offY+geo.oT*scale, By=offY+geo.oB*scale;
  fill.style.left  =Math.round(Math.max(0, Lx-bleed))+'px';
  fill.style.top   =Math.round(Math.max(0, Ty-bleed))+'px';
  fill.style.right =Math.round(Math.max(0, bw-Rx-bleed))+'px';
  fill.style.bottom=Math.round(Math.max(0, bh-By-bleed))+'px';
}
/* ═══ حشوةُ الحاويةِ المرنة (qflex) — «المحتوى يبدأُ أسفلَ الزخرفةِ العلوية» §١.٤ز ═══
   صورةُ qflex تُحاطُ letterbox (وسطاً) وزخرفتُها العلويةُ مرسومةٌ داخلَها معتمةً،
   فيقعُ نصُّ السؤالِ فوقَها. نحسبُ حشوةً علويةً تُنزِلُ بدايةَ المحتوى تحتَ الحدِّ
   الداخليِّ للزخرفة (decoT المقيس لوناً) بخلوصٍ علويٍّ ≥ السفليِّ (§١.٥ج) و≥ تنفّسِ
   §١.٥ب. المعادلة تراعي أنّ كلَّ بكسلِ حشوةٍ يُطيلُ الصندوقَ فيُنزِلُ الصورةَ نصفَه:
   pad = (h0−imgH) + 2×(deco + خلوص − t0). تُكتَبُ في --flexpad (يستهلكُها CSS تحتَ
   .qframe.qflex فقط، فزوالُ الصنفِ يُبطِلُها)، والاحتياطُ النسبيُّ في CSS إن غابت
   الهندسة. الجانبان: حافّةُ الرسمِ + تنفّس (--flexpadx). */
var FLEX_BREATH=16;   /* هامشُ التنفّس §١.٥ب */
function placeFlexPad(f,w){
  var g=_frameGeo[f.dataset.fimg||''];
  if(g==='pending') return;               /* اكتمالُ القياسِ يعيدُ الضبطَ (measureFrameGeo) */
  var bw=f.clientWidth; if(!bw) return;
  if(!g || g.decoT==null){                /* بلا هندسة: احتياطٌ نسبيّ ~15% من العرض + تنفّس */
    f.style.setProperty('--flexpad', Math.round(bw*0.15+FLEX_BREATH)+'px');
    return;
  }
  /* أساسُ القياس: حشوةٌ صفر (القياسُ بالوحداتِ التصميميّة — العلاقةُ rect/client تعزلُ الزوم) */
  var cur=parseFloat(f.style.getPropertyValue('--flexpad'))||0;
  f.style.setProperty('--flexpad','0px');
  var h0=f.clientHeight; if(!h0) return;
  var fr=f.getBoundingClientRect(); if(!fr.width) return;
  var k=bw/fr.width;
  var p=w.querySelector('.qprompt'); if(!p) return;
  var t0=(p.getBoundingClientRect().top-fr.top)*k;      /* بدايةُ النصِّ داخلَ الصندوق */
  var last=0;                                            /* أسفلُ آخرِ محتوى مرئيّ */
  for(var ch=w.firstElementChild; ch; ch=ch.nextElementSibling){
    var cb=(ch.getBoundingClientRect().bottom-fr.top)*k; if(cb>last) last=cb;
  }
  /* الصورةُ مُرساةٌ **أعلى** (center top — §«حارس الشاشة») فلا letterbox فوقَها:
     الحدُّ الداخليُّ للزخرفةِ ثابتٌ من قمّةِ الصندوقِ مهما نما المحتوى، والمعادلةُ
     مباشرةٌ بلا حدِّ (h0−imgH) — كانت للإرساءِ الأوسطِ حيثُ كلُّ بكسلِ حشوةٍ
     يُغرقُ الصورةَ نصفَه. */
  var sW=bw/g.natW;
  var deco=g.decoT*sW;                                   /* الحدُّ الداخليُّ من أعلى الصورة */
  var C=Math.max(FLEX_BREATH, h0-last);                  /* الخلوصُ العلويُّ ≥ السفليِّ و≥ التنفّس */
  var pad=Math.max(0, deco + C - t0);
  var side=Math.round(Math.max(g.aL, g.natW-1-g.aR)*sW) + FLEX_BREATH;
  /* حارسُ الذبذبة: قيمةٌ قريبةٌ من السابقةِ (±1px) تُعادُ كما كانت، فلا كتابةَ متكررة.
     والسقفُ (ceil) لا التقريبُ: يضمنُ «العلويُّ ≥ السفليُّ» (§١.٥ج) حرفياً لا ±نصفَ بكسل */
  f.style.setProperty('--flexpad', Math.ceil(Math.abs(cur-pad)>1 ? pad : cur)+'px');
  var curX=parseFloat(f.style.getPropertyValue('--flexpadx'))||0;
  if(Math.abs(curX-side)>1) f.style.setProperty('--flexpadx', side+'px');
}
/* ═══ الأيقوناتُ حولَ الحاوية — 10px من حافّةِ الإطارِ الفعلية (قاعدةٌ دائمة) ═══
   فوقَ الحاوية: شارتا رقمِ السؤالِ ونوعِه (‏.qhead‎). أسفلَها: زرّا السابق/التالي وشارةُ
   «السؤال من/إلى» (‏.qnav‎). المسافةُ **10px بالضبط** من حافّةِ الإطارِ المرئيةِ **بعدَ
   الـscale**، فتلاحقُ الأيقوناتُ الحاويةَ مع كلِّ سؤالٍ ومع كلِّ تغيّرِ مقاس.

   **لماذا لا يكفي هامشٌ ثابتٌ في CSS:** حافّةُ صندوقِ الإطارِ ليست حافّتَه المرئية —
   صورةُ الإطارِ تحملُ هامشاً شفّافاً حولَ صخرِ القمر (~2%)، والحاويةُ المرنةُ qflex
   تُحاطُ letterbox فوقَ ذلك (نسبتُها ≠ نسبةَ صورتِها). فهامشُ CSS الثابتُ يقيسُ من
   الصندوقِ لا من الرسم، ويتغيّرُ خطؤه مع كلِّ مقاسٍ لأنّ الهامشَ الشفّافَ **نسبةٌ**
   تكبرُ وتصغرُ مع الإطار. لذا نشتقُّ الإزاحةَ من **نفسِ مصدرِ الهندسةِ الحيّة** الذي
   تعتمدُه placeFill/measureFrameGeo: صندوقُ الرسمِ المعتمُ المقيسُ من الصورةِ نفسِها،
   مُسقَطاً على مقاسِ الإطارِ المعروضِ الآن.

   القياسُ كلُّه بالوحداتِ التصميميّة (clientWidth/clientHeight لا rect) فلا يدخلُ
   الزومُ الحسابَ أصلاً. تسري القاعدةُ على كلِّ المقاسات (s/m/l/tall) وإطاراتِ المواد
   والحاويةِ المرنةِ وفي المنفذَينِ العريضِ والطوليِّ سواء. */
var ICON_GAP=10;   /* بالبكسلِ التصميميّ — الرقمُ الوحيدُ في القاعدة */
/* إزاحةُ الرسمِ المعتمِ عن حافّتَي صندوقِ الإطارِ العليا والسفلى (بكسلٌ تصميميّ). */
function artOffsets(f){
  var bw=f.clientWidth, bh=f.clientHeight;
  if(!bw||!bh) return null;
  var g=_frameGeo[f.dataset.fimg||''];
  if(!g || g==='pending' || g.aT==null) return {top:0,bottom:0};
  /* غيرُ المرنة: النسبةُ محفوظةٌ (§٣) فالصندوقُ = الصورةُ تماماً، بلا letterbox.
     المرنة: الصورةُ contain **مُرساةً أعلى** (§«حارس الشاشة») — فلا شريطَ فوقَها،
     وشريطُ letterbox كلُّه أسفلَها يدخلُ حسابَ الحافّةِ السفلى. */
  var flex=f.classList.contains('qflex');
  var scale = flex ? Math.min(bw/g.natW, bh/g.natH) : (bh/g.natH);
  var offB = flex ? Math.max(0, bh-g.natH*scale) : 0;
  return { top: g.aT*scale, bottom: offB + (g.natH-1-g.aB)*scale };
}
/* كتابةٌ لا تُطلقُ حلقةَ المراقب: لا نلمسُ النمطَ إلا إن تغيّرت قيمتُه فعلاً
   (‏MutationObserver يُسجّلُ تغيّرَ السمةِ حتى لو كانت القيمةُ نفسَها). */
function setStyleOnce(el,prop,v){ if(el && el.style[prop]!==v) el.style[prop]=v; }
function placeIcons(){
  var q=document.getElementById('questionList');
  var nav=q && q.querySelector('.qnav');
  var act=document.getElementById('activityScreen');
  var shown=(gateOn() && act && act.classList.contains('active')) ? currentShown() : null;
  var f=shown && shown.querySelector('.qframe');
  var head=shown && shown.querySelector('.qhead');
  if(!f || !f.clientHeight){        /* خارجَ النظام/الشاشة → أعِدِ الهوامشَ لأنماطِ المنصّة */
    setStyleOnce(head,'marginBottom',''); setStyleOnce(nav,'marginTop','');
    return;
  }
  var ao=artOffsets(f) || {top:0,bottom:0};
  /* الهامشُ يُقاسُ إلى حافّةِ *الصندوق*، والمطلوبُ 10px إلى حافّةِ *الرسم*؛ فنطرحُ
     الهامشَ الشفّافَ. إن جاوزَ الشفّافُ العشرةَ صارَ الهامشُ سالباً فتدخلُ الأيقونةُ
     في المنطقةِ الشفّافةِ من الصندوق — وهو المقصود (‏.qhead‎ عند z=2 و‎.qnav‎ لاحقٌ
     في الترتيب، فكلاهما فوقَ الإطار). */
  setStyleOnce(head,'marginBottom',(ICON_GAP-ao.top).toFixed(2)+'px');
  setStyleOnce(nav ,'marginTop'   ,(ICON_GAP-ao.bottom).toFixed(2)+'px');
}
/* ═══ قناعُ المحتوى (قرارُ المالك ٢٠٢٦-٠٨-٠١) ═══
   ما تجاوزَ من محتوى النافذةِ حدودَها يُقَصُّ عندَ حدٍّ يقعُ **تحتَ حافّةِ رسمِ الإطارِ
   الداخلية** فيبدو المتجاوزُ وكأنّه داخلٌ أسفلَ الإطارِ (كبطاقاتِ بنكٍ عريضةٍ تركبُ
   على رملِ الإطار — قِيسَ في g4s-1-5 س٤). الحدُّ = إزاحاتُ النافذةِ (win) × MASK_K:
   إزاحاتُ win أوسعُ عمداً من فتحةِ الرسمِ (§أعلاه)، فعندَ 0.8 يقعُ خطُّ القصِّ بينَ
   الفتحةِ وحافّةِ المعدنِ في الأطرِ المقيسةِ كلِّها — أي مغطّىً بالرسمِ أو ملاصقاً له.
   القصُّ **خارجَ صندوقِ النافذةِ بالكامل**، فالمحتوى المنضبطُ داخلَها لا يتأثّرُ بشيء؛
   والمرنةُ (qflex) مستثناةٌ (رسمُها letterbox لا تصدقُ عليه نسبُ win). */
var MASK_K=0.8;
function placeMask(){
  var R=window.fitRect||function(el){ return el.getBoundingClientRect(); };
  document.querySelectorAll('.qcard .qframe').forEach(function(f){
    var w=f.querySelector('.qwin'); if(!w) return;
    if(f.classList.contains('qflex')){ if(w.style.clipPath) w.style.clipPath=''; return; }
    var fr=R(f); if(!fr.width || !fr.height) return;      /* بطاقةٌ مخفيّةٌ — تُحسَبُ عندَ ظهورِها */
    var ins={ top:parseFloat(w.style.top), left:parseFloat(w.style.left),
              right:parseFloat(w.style.right), bottom:parseFloat(w.style.bottom) };
    if(isNaN(ins.top)||isNaN(ins.left)){ if(w.style.clipPath) w.style.clipPath=''; return; }
    /* امتدادُ القصِّ خارجَ صندوقِ النافذة = الجزءُ المتبقّي من إزاحةِ win بعدَ MASK_K */
    var exL=fr.width *ins.left  *(1-MASK_K)/100,
        exR=fr.width *ins.right *(1-MASK_K)/100,
        exT=fr.height*ins.top   *(1-MASK_K)/100,
        exB=fr.height*ins.bottom*(1-MASK_K)/100;
    var wr=R(w);
    var poly='polygon('+(-exL).toFixed(1)+'px '+(-exT).toFixed(1)+'px, '
      +(wr.width+exR).toFixed(1)+'px '+(-exT).toFixed(1)+'px, '
      +(wr.width+exR).toFixed(1)+'px '+(wr.height+exB).toFixed(1)+'px, '
      +(-exL).toFixed(1)+'px '+(wr.height+exB).toFixed(1)+'px)';
    if(w.style.clipPath!==poly) w.style.clipPath=poly;
  });
}
/* الأيقوناتُ ثمّ الشريطُ — الشريطُ يقرأُ صندوقَ ‎.qhead‎ فيجبُ أن يكونَ قد استقرَّ */
function placeChrome(){ placeIcons(); placeBand(); placeMask(); }

/* ═══ الشريطُ الرماديُّ الخلفيُّ (.qband) ═══
   مستطيلٌ رأسيٌّ يمتدُّ من أعلى الشاشةِ إلى أسفلِها خلفَ منطقةِ السؤال، عرضُه يتبعُ
   **عرضَ الإطارِ الحاليِّ بمقاسِه المعروضِ** مضافاً إليه الأيقونات (شارتا .qhead) وخلوصٌ.

   **قاعدةُ الهندسةِ الحيّة (سببُ وجودِها):** لا بُعدَ ثابتاً هنا إطلاقاً. كلُّ رقمٍ يُقرأ
   لحظةَ الحسابِ من `getBoundingClientRect` للعناصرِ الفعلية (الإطار + الأيقونات + عمودُ
   الصاروخ) — نفسُ مصدرِ الهندسةِ الحيّةِ الذي تعتمدُه placeFill/measureFrameGeo. الأبعادُ
   المعلَنةُ سلفاً هي التي بَلِيَت في طبقةِ النقاط حين أُعيدَ تصديرُ الصور، فلا نُعيدُها.

   **وحدةُ القياس — مصيدةٌ حقيقية:** ملاءمةُ العرضِ تُطبِّق **CSS `zoom` على الجذر** (لا
   `transform`)، فـ`getBoundingClientRect` يرجعُ بكسلاً *حقيقياً* بينما الأنماطُ المكتوبةُ
   تُفسَّرُ بوحداتٍ *مزوَّمة*. لذلك نقيسُ بالبكسلِ الحقيقيِّ ثم **نقسمُ على الزوم** قبلَ
   الكتابة، فيستقرُّ الشريطُ في نفسِ فضاءِ بقيةِ المحتوى (مقيسٌ حيّاً: كتابةُ `left:200px`
   بلا زومٍ خاصٍّ تُرسَم عند 139.6 = 200×0.698 ✔). ولا نُعطيه زوماً مضادّاً كما تفعلُ
   `.rocket-lane` (تحتاجُه لأنّها تُرسَم بالبكسلِ الحقيقيِّ بغضِّ النظرِ عن زومِ المحتوى)؛
   البقاءُ في فضاءِ المحتوى أبسطُ هنا ويكفي.

   **العرضُ يتحرّكُ بـ`clip-path` لا بـ`left`/`width`:** الصندوقُ يغطّي المنفذَ كلَّه
   (`inset:0` في CSS) ونقتصُّ حافّتيه، فيتغيّرُ العرضُ **بلا أيِّ إعادةِ تخطيط** في كلِّ
   إطارٍ من الانتقال (‏`left`/`width` تُعيدُ التخطيطَ لكلِّ إطار)، و`inset:0` يكفلُ الامتدادَ
   الكاملَ من أعلى الشاشةِ إلى أسفلِها بلا حسابِ ارتفاعٍ إطلاقاً.

   **حدُّ الصاروخ:** الشريطُ لا يمتدُّ تحتَ عمودِ الصاروخ؛ إن تجاوزَ الإطارُ العريضُ حافّتَه
   اليمنى تُقصَّ حافّةُ الشريطِ اليسرى عندَها (يبقى الإطارُ بارزاً، والصاروخُ مكشوفاً). */
var BAND_PAD=26;        /* الخلوصُ على الجانبين، بكسلٌ تصميميّ (يُضرَب في الزوم) */
var BAND_LANE_GAP=0;    /* فجوةٌ إضافيةٌ قبلَ عمودِ الصاروخ (بكسلٌ حقيقيّ) */
/* ═══ الحدّانِ الرأسيّانِ للشريطِ وانحناءُ زواياه ═══
   لم يعدِ الشريطُ يمتدُّ من أعلى الشاشةِ إلى أسفلِها: قمّتُه فوقَ صفِّ الشاراتِ بـ20px
   وقاعدتُه تحتَ صفِّ أزرارِ التنقّلِ بـ20px، فيحتضنُ منطقةَ السؤالِ وحدَها ويبقى
   سطرُ التلميحِ `.hint` خارجَه. القياسُ حيٌّ من `getBoundingClientRect` كالعرضِ تماماً
   (نفسُ فضاءِ الإحداثيات: يُقسَمُ على الزوم قبلَ الكتابة).
   **حارسُ الترويسة:** القاعدةُ الأصليةُ `qhead.top − 20`، فإن وقعت فوقَ أسفلِ الترويسة
   (زرُّ الرجوع · سطرُ الشعارِ والعنوان · السطرُ التعريفيّ) هبطت إلى ما بعدَ أسفلِها
   بخلوصٍ مريح — فلا يلمسُ المستطيلُ نصّاً ولا شعاراً من الترويسةِ أبداً، ولو التفَّ
   عنوانُ الدرسِ إلى سطرين. */
/* ═══ هندسةُ دائرتَي الزاويتين — نِسَبٌ من **عرضِ المستطيل** لا بكسلاتٌ ثابتة ═══
   مستخرَجةٌ من الغلافِ المرجعيِّ `images/cover-g1-sci.jpg`: قوسُ الدائرةِ العليا
   يقطعُ الحدَّ الأعلى عند 44.4٪ من العرضِ والأيسرَ عند 28٪ من الارتفاع، والسفلى
   تقطعُ الأسفلَ عند 70.6٪ والأيمنَ عند 71.8٪؛ وكلتاهما تمرُّ بنقطةِ الزاويةِ نفسِها،
   فمركزُ كلٍّ منهما منتصفُ وترِها ونصفُ قطرِها نصفُ قطرِ ذلك الوتر.
   (تحقُّقٌ مستقلٌّ بالكودِ من الملفِّ أعطى 44.6/28.8/70.0/71.2٪ — فروقٌ دون 1٪.) */
/* ═══ أنصافُ الأقطار — **حدٌّ أدنى هندسيٌّ لا يجوزُ النزولُ تحتَه** ═══
   المركزانِ داخلَ الشريطِ لا على حافّتِه، فبُعدُ نقطةِ الزاويةِ عن كلِّ مركزٍ ثابت:
        العليا: √(0.222² + 0.185²) = **0.289W**   ·   السفلى: √(0.147² + 0.185²) = **0.236W**
   والشريطُ يغطّيه إطارُ السؤالِ إلا حاشيةً رفيعةً (26px جانبياً) أوسعَ ما تكونُ عندَ
   الزاوية. فإن نزلَ نصفُ القطرِ تحتَ ذلك البُعدِ **خرجتِ الزاويةُ من القرصِ فتُظلمُ
   أوضحُ بقعةٍ مرئيةٍ منه** ولا يُرى شيءٌ تقريباً. لذا يبقى كلٌّ فوقَ حدِّه.
   **إزاحةُ المركزَينِ إلى الخارج (بطلبِ المالك)** تخفضُ ذلك الحدَّ لأنّ بُعدَ الزاويةِ
   يقصر، فيتّسعُ هامشُ المناورةِ في نصفِ القطرِ لاحقاً:
        المركزان   قبل: (0.222, 0.185) و(0.147, 0.185)
                   بعد: (0.145, 0.120) و(0.096, 0.120)
        بُعدُ الزاوية قبل: 0.289W و0.236W  ←  بعد: **0.188W** و**0.154W**
   ومع بقاءِ نصفَي القطرِ (0.330 و0.248) صارَ الفائضُ فوقَ الحدِّ **0.142W** و**0.094W**
   بدلَ 0.041 و0.012 — أي أنّ القرصَ يتجاوزُ الزاويةَ بمسافةٍ مريحةٍ فيُضيءُ طولاً
   أكبرَ من الحاشيةِ المرئية.
   القيمُ الحالية: العليا 0.330W والسفلى 0.248W، والنسبةُ بينهما **1.33** (الثُلث).
   وبعدَ إلغاءِ التلاشي صارَ القرصُ مصمتاً حتى حافّتِه، فلم يعُدْ لتوسيعِ القطرِ
   (الذي كان يُخرجُ الحافّةَ المتلاشيةَ من الحاشية) معنىً — ولذلك صحَّ التصغير. */
var BAND_C1_X=0.145, BAND_C1_Y=0.120, BAND_C1_R=0.330;   /* العليا اليسرى */
var BAND_C2_X=0.096, BAND_C2_Y=0.120, BAND_C2_R=0.248;   /* السفلى اليمنى */
var BAND_PAD_V=20;       /* فوقَ الشاراتِ وتحتَ أزرارِ التنقّل، بكسلٌ تصميميّ */
var BAND_HEAD_GAP=10;    /* خلوصُ الأمانِ تحتَ الترويسةِ حين يلزمُ الهبوط */
/* نصفُ قطرِ الزوايا = نصفُ قطرِ **بطاقةِ الكتابِ** نفسِها — يُقرأُ من `.book` حيّاً
   فلا يتكرّرُ الرقمُ في مكانين (البطاقةُ مصدرُ هوية الشريطِ لوناً وشكلاً). */
var _bandR=null;
function bandRadius(){
  if(_bandR!=null) return _bandR;
  var bk=document.querySelector('.book');
  var v=bk ? parseFloat(getComputedStyle(bk).borderTopLeftRadius) : NaN;
  _bandR=(v>0)?v:30;      /* احتياطٌ آمنٌ إن لم تُبنَ البطاقاتُ بعد */
  return _bandR;
}
/* ═══ كسوةُ الشريطِ ببطاقةِ الكتابِ الحاليّ — **لكلِّ المواد** ═══
   تعبئةُ الشريطِ = **الهويةُ البصريةُ لبطاقةِ الكتابِ المفتوح** (لونُها ونقاطُها ودائرتاها،
   بلا نصوصٍ ولا أيقونة) — انظرْ `.qband.qb-book` في css/shoogp-ui.css.
   الصنفُ يُوضَع على **الشريطِ نفسِه** لا على questionList، لأنّ الشريطَ ابنُ body فلا تصلُه
   علامةُ المادة `subj-*`.
   **مصدرُ اللونِ هو مصدرُ البطاقةِ نفسُه:** حقلُ `color` للكتابِ في `data/books.json`
   (‏`bk-*`) — وهو ما يضعُه app.js على بطاقةِ الكتابِ في صفحةِ التنقّلِ ويحفظُه في
   `currentBookColor`. نبحثُ عنه بمفتاحِ كتابِ الدرسِ في `DATA.terms`، واحتياطاً
   `window.currentBookColor`. فلا مصدرَ ثانٍ للحقيقةِ ولا لونَ مكرّرٌ في الكود. */
/* مدخلُ الكتابِ الحاليِّ في `data/books.json` (أو null) */
function bookEntry(){
  var b=_curBook, D=theData(), T=D && D.terms;
  if(!b || !T) return null;
  for(var t in T){ for(var g in T[t]){
    for(var i=0;i<T[t][g].length;i++){ if(T[t][g][i].key===b.key) return T[t][g][i]; } } }
  return null;
}
function bookColorClass(){
  var e=bookEntry();
  if(e && e.color) return e.color;
  /* احتياطٌ: ما وضعَه app.js على البطاقة (اسمٌ مجرّدٌ لا window — راجعْ theData) */
  return (typeof currentBookColor!=='undefined' && currentBookColor) ? currentBookColor : null;
}
/* ═══ لونُ الشريطِ = لونُ البطاقةِ **كما تُرى** لا كما يُعلَنُ التدرّج ═══
   بطاقةُ الكتابِ تُعرَضُ **بصورةِ غلافٍ** فوقَ تدرّجِ `bk-*`، فالمرئيُّ هو الغلافُ
   لا التدرّج. وكان الشريطُ يأخذُ التدرّجَ وحدَه، فتصادفَ التقاربُ في بعضِ الكتبِ
   (العلوم) وانحرفَ في غيرِها انحرافاً صارخاً (الرياضياتُ: تدرّجٌ برتقاليٌّ مقابلَ
   غلافٍ أخضرَ ليمونيّ — ΔE≈66).
   لذا صارَ لكلِّ كتابٍ **زوجُ لونٍ صريحٌ في البيانات** (`band:[فاتح,غامق]`) مصدرُه
   غلافُه، يُقرأُ مباشرةً بلا أيِّ سحبٍ لونيٍّ وقتَ التشغيل (لا canvas، لا عملَ عند
   كلِّ فتحِ درس، ولا ارتجافَ لون). وصنفُ `bk-*` يبقى **احتياطاً** لأيِّ كتابٍ بلا
   `band` (أو بلا غلاف). */
function bookBandPair(){
  var e=bookEntry();
  var p=e && e.band;
  return (p && p.length===2 && p[0] && p[1]) ? p : null;
}
/* كلُّ أصنافِ الكسوةِ الممكنة — تُنزَع جميعاً قبلَ وضعِ صنفِ الكتابِ الحاليّ */
var BAND_COLOR_CLASSES=['bk-red','bk-green','bk-orange','bk-blue','bk-purple','bk-teal'];
function allBandSkinClasses(){
  return ['qb-book'].concat(BAND_COLOR_CLASSES.map(function(c){ return 'qb-'+c; }));
}
var _bandEl=null;
function bandEl(){
  if(_bandEl && _bandEl.isConnected) return _bandEl;
  _bandEl=document.querySelector('.qband');
  if(!_bandEl){
    _bandEl=document.createElement('div');
    _bandEl.className='qband';
    _bandEl.setAttribute('aria-hidden','true');   /* زخرفةٌ بحتة، لا يقرؤها القارئُ الصوتيّ */
    document.body.appendChild(_bandEl);
  }
  return _bandEl;
}
/* معامِلُ الزوم الحيّ: من ShoogpFit إن توفّر، وإلا يُشتَقّ من العنصرِ نفسِه
   (مرئيّ ÷ تصميميّ) فلا يعتمدُ على ثابتٍ ولا على حالةٍ خارجية. */
function liveZoom(el){
  var z=(window.ShoogpFit && ShoogpFit.zoom) || 0;
  if(z>0) return z;
  return (el && el.offsetWidth) ? (el.getBoundingClientRect().width/el.offsetWidth) : 1;
}
function placeBand(){
  var b=bandEl();
  var act=document.getElementById('activityScreen');
  var shown=(gateOn() && act && act.classList.contains('active')) ? currentShown() : null;
  var f=shown && shown.querySelector('.qframe');
  var fr=f && f.getBoundingClientRect();
  if(!fr || !fr.width){ b.style.display='none'; return; }
  var z=liveZoom(f);
  var pad=BAND_PAD*z;
  /* اتحادُ الإطارِ والأيقوناتِ أفقياً — الشارتانِ (فوق) وأزرارُ التنقّلِ ومؤشّرُ التقدّم
     (تحت) قد تتجاوزُ إطاراً ضيقاً والعكس، فيحتضنُ الشريطُ الجميعَ في مواضعِهم الفعلية */
  var L=fr.left, R=fr.right;
  [shown.querySelector('.qhead'), document.querySelector('#questionList .qnav')]
    .forEach(function(el){
      if(!el) return;
      var r=el.getBoundingClientRect();
      if(r.width){ L=Math.min(L,r.left); R=Math.max(R,r.right); }
    });
  L-=pad; R+=pad;
  /* لا يمتدُّ تحتَ عمودِ الصاروخ */
  var lane=document.querySelector('.rocket-lane');
  if(lane){
    var lr=lane.getBoundingClientRect();
    if(lr.width) L=Math.max(L, lr.right+BAND_LANE_GAP);
  }
  L=Math.max(0,L); R=Math.min(window.innerWidth,R);
  if(R-L<2){ b.style.display='none'; return; }
  b.style.display='block';   /* صريحٌ لا '' — الـCSS يبدأُ بـdisplay:none فيعودُ إليه الفراغ */
  /* كسوةُ بطاقةِ الكتاب — **أولويةُ المصادر**:
       ١) زوجُ `band` الصريحُ في البيانات (مصدرُه الغلافُ المرئيّ) ← يُكتَبُ متغيّرَين.
       ٢) وإلا صنفُ `bk-*` (التدرّجُ المعلَن) ← احتياطٌ لكتابٍ بلا `band`.
       ٣) وإلا يبقى الشريطُ على الرماديِّ الأساسيِّ (تراجُعٌ آمن).
     تُنزَعُ الأصنافُ والمتغيّراتُ أولاً فلا تتسرّبُ كسوةُ كتابٍ إلى آخر. */
  allBandSkinClasses().forEach(function(c){ b.classList.remove(c); });
  b.style.removeProperty('--qb-a'); b.style.removeProperty('--qb-b');
  var pair=bookBandPair(), bc=bookColorClass();
  if(pair){
    b.classList.add('qb-book');
    b.style.setProperty('--qb-a', pair[0]);
    b.style.setProperty('--qb-b', pair[1]);
  } else if(bc && BAND_COLOR_CLASSES.indexOf(bc)>=0){
    b.classList.add('qb-book','qb-'+bc);
  }
  /* ── الحدّانِ الرأسيّان (نفسُ مصدرِ الهندسةِ الحيّةِ ونفسُ فضاءِ الإحداثيات) ── */
  var Wv=window.innerWidth/z, Hv=window.innerHeight/z;
  var headEl=shown.querySelector('.qhead');
  var navEl=document.querySelector('#questionList .qnav');
  var hr=headEl && headEl.getBoundingClientRect();
  var nr=navEl && navEl.getBoundingClientRect();
  /* بديلٌ آمنٌ إن غابَ أحدُ المرجعَين: حافّةُ الإطارِ نفسُها بالخلوصِ ذاتِه */
  var top = (hr && hr.height) ? hr.top/z - BAND_PAD_V : fr.top/z - BAND_PAD_V;
  var bot = (nr && nr.height) ? nr.bottom/z + BAND_PAD_V : fr.bottom/z + BAND_PAD_V;
  /* حارسُ الترويسة: لا يعلو الشريطُ على أسفلِ آخرِ عنصرٍ من الترويسةِ الظاهرة */
  var headerBottom=0;
  ['.back', '.lesson-head', '.screen-sub'].forEach(function(sel){
    var e=act.querySelector(sel); if(!e) return;
    var r=e.getBoundingClientRect();
    if(r.height && r.bottom/z>headerBottom) headerBottom=r.bottom/z;
  });
  if(headerBottom && top < headerBottom) top = headerBottom + BAND_HEAD_GAP;
  /* احتواءٌ داخلَ المنفذِ وحراسةٌ من الانقلاب */
  top=Math.max(0, top); bot=Math.min(Hv, bot);
  if(bot-top<8){ b.style.display='none'; return; }
  /* الصندوقُ يغطّي المنفذَ (inset:0) ونقتصُّ حوافَّه الأربع: من البكسلِ الحقيقيِّ
     (rect) إلى فضاءِ المحتوى المزوَّم بالقسمةِ على الزوم.
     inset(أعلى يمين أسفل يسار round نصفُ القطر). */
  b.style.clipPath='inset('+top.toFixed(2)+'px '+(Wv-R/z).toFixed(2)+'px '+
    (Hv-bot).toFixed(2)+'px '+(L/z).toFixed(2)+'px round '+bandRadius()+'px)';
  /* ── دائرتا الزاويتين: مقاسٌ وموضعٌ بوحدةِ **عرضِ المستطيلِ المرئيّ** ──
     تُحسبانِ هنا لا بالنسبةِ المئويةِ في CSS، لأنّ صندوقَ الشريطِ يغطّي المنفذَ كلَّه
     ولا يُقتَصُّ إلا بـ`clip-path`، فالنسبةُ المئويةُ كانت تُقاسُ على المنفذِ لا على
     المستطيل. كلُّ القيمِ بالفضاءِ التصميميِّ (المقسومِ على الزوم) كبقيةِ الكتابة. */
  var Ld=L/z, Rd=R/z, Wb=Rd-Ld;
  var r1=BAND_C1_R*Wb, r2=BAND_C2_R*Wb;
  setBandVar(b,'--qb-c1d',(2*r1).toFixed(1)+'px');
  setBandVar(b,'--qb-c1x',(Ld+BAND_C1_X*Wb-r1).toFixed(1)+'px');
  setBandVar(b,'--qb-c1y',(top+BAND_C1_Y*Wb-r1).toFixed(1)+'px');
  setBandVar(b,'--qb-c2d',(2*r2).toFixed(1)+'px');
  setBandVar(b,'--qb-c2x',(Rd-BAND_C2_X*Wb-r2).toFixed(1)+'px');
  setBandVar(b,'--qb-c2y',(bot-BAND_C2_Y*Wb-r2).toFixed(1)+'px');
}
/* كتابةٌ لا تُطلقُ حلقةَ المراقب (نفسُ مبدأِ setStyleOnce) */
function setBandVar(el,name,v){
  if(el.style.getPropertyValue(name)!==v) el.style.setProperty(name,v);
}
/* ═══ التحميلُ المسبقُ لإطاراتِ المادة (كلُّ خاناتِ العائلة، لا النقطيةُ وحدَها) ═══
   الطبقةُ القديمةُ كانت تُحمّلُ *فقط* خاناتِ hasFill:false — أي أربعةَ إطارٍ قمريّ لا غير،
   لأنّ خاناتِ الرياضياتِ المعبّأةَ (hasFill:true) لم تكن تُقاسُ فتحتُها فلم تُحمَّل. النتيجةُ:
   أوّلُ بطاقةِ رياضياتٍ تبدأُ تحميلَ إطارِها لحظةَ الرسمِ لا قبله، فتظهرُ بلا إطارٍ ريثما
   يصلُ الملفُّ (ميغابايتان+). فصلنا الغرضين:
     • **التحميلُ المسبق** ← لكلِّ خانةٍ مهما كان hasFill (الغرضُ: تسخينُ الكاش).
     • **قياسُ الفتحة** (canvas) ← للنقطيةِ فقط (المعبّأةُ لا فتحةَ شفّافةَ فيها ولا .qfill).
   والنداءُ حسبَ مادةِ الدرس: القمريّةُ عندَ الإقلاع (الافتراضية)، وعائلةُ مادةِ الدرسِ في
   ترقيعِ openLesson قبلَ بناءِ الأسئلة. عائلةٌ جديدةٌ تدخلُ تلقائياً بلا تعديلٍ هنا. */
var _preloaded={};
function preloadFamily(fam){
  if(!fam) return;
  fam.order.forEach(function(s){
    var cfg=fam.sizes[s];
    if(!cfg || _preloaded[cfg.img]) return;
    _preloaded[cfg.img]=1;
    /* يُحمّلُ ويقيسُ (الفتحةَ + صندوقَ الرسمِ المعتم) ويُصالحُ النسبة — **لكلِّ خانةٍ مهما
       كان hasFill**: الفتحةُ تلزمُ النقطيةَ وحدَها، أمّا صندوقُ الرسمِ (حافّةُ الإطارِ
       الفعلية) فيلزمُ موضعَ الأيقوناتِ في كلِّ الخانات، معبّأةً كانت أو نقطية. */
    measureFrameGeo(cfg.img);
  });
}
/* فهرسٌ عكسيّ: اسمُ الصورة → كلُّ خاناتِ الجدولِ التي تستعملُها (الصورةُ الواحدةُ قد
   تُشارَك بين عائلتين، كالقمريِّ l في العلومِ والرياضيات). */
var _cfgsByImg=(function(){
  var m={};
  Object.keys(FRAME_FAMILIES).forEach(function(fk){
    var fam=FRAME_FAMILIES[fk];
    fam.order.forEach(function(s){ var c=fam.sizes[s]; (m[c.img]=m[c.img]||[]).push(c); });
  });
  return m;
})();
/* مصالحةُ النسبةِ المعلنةِ مع أبعادِ الصورةِ الفعلية — حارسُ «قداسةِ النسبة» (§٣).
   `ar` في الجدولِ إعلانٌ يدويٌّ يَبلى متى أُعيدَ تصديرُ الصورةِ بأبعادٍ مختلفة؛ وحينَها
   يُحاطُ الإطارُ letterbox داخلَ صندوقِه (background:contain) فينكمشُ عن حوافِّه وتنزلقُ
   نسبُ التعبئةِ عن فتحتِه. فحصُ DEV القائمُ يقارنُ الصندوقَ بالنسبةِ *المعلنة* فلا يرى
   هذا الانحراف. نقيسُ الأبعادَ الطبيعيةَ عندَ التحميلِ المسبقِ ونصحّحُ الإعلانَ إن جاوزَ
   الفرقُ 0.5٪، فلا يُشترطُ تحديثُ الجدولِ يدوياً بعدَ كلِّ إعادةِ تصدير. */
function reconcileAR(img,W,H){
  if(!W||!H) return;
  var changed=false;
  (_cfgsByImg[img]||[]).forEach(function(c){
    var p=c.ar.split('/'), dw=parseFloat(p[0]), dh=parseFloat(p[1]), real=W/H;
    if(!(dw>0&&dh>0) || Math.abs((dw/dh)-real)/real<=0.005) return;
    if(DEV) console.warn('%c[إطار] ⚠️ نسبةُ '+img+' المعلنةُ '+c.ar+' ('+(dw/dh).toFixed(4)+
      ') ≠ أبعادُ الملفِّ الفعلية '+W+'×'+H+' ('+real.toFixed(4)+') — صُحّحت تلقائياً. '+
      'حدّثِ الجدولَ في FRAME_FAMILIES.','color:#c0392b;font-weight:bold');
    c.ar=W+' / '+H; c._r=null; c._war=null; changed=true;
  });
  if(changed && gateOn()){ var sh=currentShown(); if(sh){ sh.dataset.fitSig=''; fitShown(); } }
}
preloadFamily(FRAME_FAMILIES.moon);   /* الإقلاع: العائلةُ الافتراضية */
/* يبني الإطار بعرض Wf ويعيد هل يسع محتواه (بلا فائض). يحفظ وسمَ qf-hasfill حسب الخانة.
   سبرٌ هندسيٌّ خالص (بلا رسم) — يُنادى عشراتِ المرّاتِ في الضبطِ الواحد. */
function frameFits(f,fill,w,size,Wf){
  var cfg=applyFrame(f,fill,w,size,false);
  f.className='qframe qf-'+size+(cfg.hasFill?' qf-hasfill':'');
  f.style.width=Wf+'px';
  return w.scrollHeight<=w.clientHeight+2;   /* قراءة تفرض التخطيط */
}
/* الملاذ الأخير: حاوية مرنة بروح العائلة، بلا تمرير (صورة الإطار contain). يعيد cfg. */
function toFlex(f,fill,w,base){
  var cfg=applyFrame(f,fill,w,base,true);   /* ملاذٌ نهائيّ → يُرسَم فوراً */
  f.className='qframe qf-'+base+' qflex'+(cfg.hasFill?' qf-hasfill':'');
  f.style.width=''; f.style.aspectRatio='';
  /* خانةُ التعبئةِ المدموجة في الحاوية المرنة: الصورةُ (contain) تُحاط letterbox فلا تُغطّي
     المحتوى المتجاوز؛ نملأُ الصندوقَ بلونِ التعبئةِ المدموج (inline !important ليتغلّبَ على
     background:none !important في .qflex) فيبقى المحتوى على تعبئةٍ مقروءة. الخانةُ النقطيةُ
     تُبقي .qfill (placeFill). */
  if(cfg.hasFill && cfg.fillColor) f.style.setProperty('background', cfg.fillColor, 'important');
  else f.style.background='';
  return cfg;
}
/* البطاقة الظاهرة حالياً (غير المخفيّة) */
function currentShown(){
  return Array.prototype.find.call(document.querySelectorAll('.qcard'),
    function(k){return k.style.display!=='none';});
}
/* ═══ الحساب المسبق بأسوأ الحالات (للأنواع ذات المحتوى المتحرّك) ═══
   بدل قياس المحتوى في حالته الابتدائية، نُرتّبه مؤقتاً في حالة *التوزيع النهائي
   الأقصى* فيُقاس الارتفاع الأكبر ويُختار الإطار له من اللحظة الأولى، فلا يتمدّد
   أثناء إجابة الطالب. نُعيد كل شيء فوراً بعد القياس (تغيير DOM متزامن بلا رسم).
   يعيد {kind, restore} أو null للأنواع الثابتة.
   • classify   : كل البطاقات في أضيق صندوق (أطول التفاف = أقصى ارتفاع للصف).
   • fill-blank : كل فراغ بأطول كلمة متاحة (أقصى التفاف للجملة).
   • drag-drop  : صناديق الأهداف مطلقة فوق الصورة (لا تُنمّي الطول) — نملؤها
                  بنصوص إجاباتها للاكتمال؛ الحالة الابتدائية عملياً هي الأقصى.
   • sequence   : كل العناصر ظاهرة أصلاً؛ الترتيب لا يغيّر الطول — الابتدائية هي الأقصى. */
function worstCaseArrange(w){
  /* — التصنيف — */
  var drops=w.querySelectorAll('.grp-drop');
  var clsBank=w.querySelector('.clsbank .chips');
  if(drops.length && clsBank){
    var zones=[clsBank]; for(var d=0;d<drops.length;d++) zones.push(drops[d]);
    var snap=zones.map(function(z){
      return {zone:z, chips:Array.prototype.filter.call(z.children,function(el){
        return el.classList&&el.classList.contains('chip'); })};
    });
    var target=drops[0];              /* أضيق صندوق = أكثر التفافاً */
    for(var i=1;i<drops.length;i++){ if(drops[i].clientWidth<target.clientWidth) target=drops[i]; }
    snap.forEach(function(s){ s.chips.forEach(function(c){ target.appendChild(c); }); });
    return {kind:'classify', restore:function(){
      snap.forEach(function(s){ s.chips.forEach(function(c){ s.zone.appendChild(c); }); }); }};
  }
  /* — ملء الفراغ — */
  var blanks=w.querySelectorAll('.blank');
  var fbChips=w.querySelectorAll('.fillbank .chips .chip');
  if(blanks.length && fbChips.length){
    var longest=''; Array.prototype.forEach.call(fbChips,function(c){
      var t=c.textContent||''; if(t.length>longest.length) longest=t; });
    var bsnap=Array.prototype.map.call(blanks,function(b){ return {b:b, txt:b.textContent}; });
    /* أطول محتوى لكل فراغ = الأطول بين النائب "______" وأطول كلمة */
    bsnap.forEach(function(o){ if(longest.length>(o.txt||'').length) o.b.textContent=longest; });
    return {kind:'fill-blank', restore:function(){
      bsnap.forEach(function(o){ o.b.textContent=o.txt; }); }};
  }
  /* — السحب على صورة — */
  var targets=w.querySelectorAll('.target');
  if(targets.length){
    var tsnap=Array.prototype.map.call(targets,function(t){ return {t:t, txt:t.textContent}; });
    tsnap.forEach(function(o){ var a=o.t.getAttribute('data-answer'); if(a) o.t.textContent=a; });
    return {kind:'drag-drop', restore:function(){
      tsnap.forEach(function(o){ o.t.textContent=o.txt; }); }};
  }
  /* — الترتيب التسلسلي (ثابت الطول) — */
  if(w.querySelector('.seqitem')) return {kind:'sequence', restore:function(){}};
  return null;
}
/* الخوارزمية الكاملة لبطاقة واحدة: اختيار ثم ضبط.
   الاتساع رتيب مع عرض الإطار (أكبر = نافذة أعلى وأقلّ التفاف)، فنعتمد بحثاً ثنائياً.
   التكبير عند اللزوم يكون للإطار كاملاً بمقياس موحّد يحفظ نسبته تماماً —
   بلا سقف نسبة، وإنما حدّه الوحيد عرض الشاشة الفعلي (والصفحة تتمرر عمودياً
   إن طال الإطار — لا تمرير داخلياً أبداً). التصغير حدّه −25%.
   نمرّ s→m→l ونأخذ أوّل إطار يسع عند أقصى عرضه، ثم أصغر عرض يسع داخله.
   الإطار الأعرض من عمود السؤال يُوسَّط فوقه بهوامش سالبة (النسبة محفوظة).
   الملاذ المطاطي (qflex) يبقى فقط لو ضاقت الشاشة نفسها عن أكبر إطار. */
function fitFrame(card){
  var f=card.querySelector('.qframe'),
      fill=card.querySelector('.qfill'),
      w=card.querySelector('.qwin');
  if(!f||!w) return;
  /* ═══ محتوىٌ فيه «وسيطٌ مرن» (‏`.qfit-flex` — قاعدةُ الاحتواءِ الأساسية §④) ═══
     الوسيطُ المرنُ يتقلّصُ ليتلاءمَ مع النافذة، فالبطاقةُ «تسعُ» أيَّ إطارٍ مهما ضاق —
     ولو تُرِكَ البحثُ الثنائيُّ على حالِه لاختارَ **أضيقَ** إطارٍ فسُحِقَ الرسمُ إلى لا شيء.
     فمعيارُ الاختيارِ ينقلبُ لهذه البطاقات: **أوسعُ إطارٍ مسموح**، فيأخذَ الرسمُ كلَّ ما
     تبقّى من النافذة. (اختيارُ *الحجمِ* بالنسبة لا يتغيّر: النسبةُ D تُقاسُ والنافذةُ
     `height:auto` فالوسيطُ عندها بحجمِه الطبيعيّ.) ونُهيّئُ وعاءَ الوسيطِ عمودَ flex
     كي يصلَ التقلّصُ من النافذةِ إليه (‏`.qbody.qflexmedia` في css/style.css). */
  var _flexMedia=w.querySelector('.qfit-flex');
  if(_flexMedia){
    var _fmBody=_flexMedia.closest('.qbody');
    if(_fmBody) _fmBody.classList.add('qflexmedia');
  }
  /* قِس بأسوأ الحالات (للأنواع المتحرّكة) ثم أعِد كل شيء كما كان في finally */
  var _wc=worstCaseArrange(w);
  var _restore=_wc&&_wc.restore;
  var _kind=(_wc&&_wc.kind)||'static';
  var _worstH=0;                     /* ارتفاع المحتوى بأسوأ الحالات (للتقرير) */
  var _prevW=f.style.width;          /* العرض المُثبَّت قبل هذا الضبط (للانتقال السلس) */
  f.style.transition='none';         /* عطّل الانتقال أثناء القياس ليطبَّق العرض فوراً */
  try{
  var availH=availHeight();
  var contW=(card.clientWidth||600);
  var Wceil=Math.max(contW, Math.min(1240, fitW()-60));

  f.style.marginLeft=''; f.style.marginRight='';
  /* نسبة المحتوى الطبيعية D: تُقاس بعرضٍ مريح ثابت (DREF) والنافذة height:auto —
     فتعكس شكل المحتوى الحقيقيّ لا مطاطيّةَ الإطار (scrollHeight يُقصّ عند حجم
     النافذة، لذا نقيس بارتفاعٍ حرّ). هي الهدف الذي نطابق عليه نسبة النافذة. */
  var DREF=760;
  /* حشوةُ qflex من ضبطٍ سابقٍ تُلوّثُ قياسَ D (طولٌ وهميّ) — تُصفَّرُ قبلَه،
     وtoFlex يعيدُ حسابَها إن انتهى السقوطُ إلى المرنةِ ثانيةً (§١.٤ز). */
  if(f.style.getPropertyValue('--flexpad')) f.style.removeProperty('--flexpad');
  var _ws={position:w.style.position,height:w.style.height,width:w.style.width,top:w.style.top,right:w.style.right,bottom:w.style.bottom,left:w.style.left,overflow:w.style.overflow};
  w.style.position='static'; w.style.height='auto'; w.style.width=DREF+'px';
  w.style.top='auto'; w.style.right='auto'; w.style.bottom='auto'; w.style.left='auto'; w.style.overflow='visible';
  void w.offsetWidth;
  var D=DREF/Math.max(1,w.scrollHeight);
  w.style.position=_ws.position; w.style.height=_ws.height; w.style.width=_ws.width;
  w.style.top=_ws.top; w.style.right=_ws.right; w.style.bottom=_ws.bottom; w.style.left=_ws.left; w.style.overflow=_ws.overflow;
  /* الاختيار بالنسبة داخلَ عائلةِ المادةِ الحالية: من أطرها التي تسع المحتوى نأخذ الأقرب
     نسبةَ نافذةٍ إلى نسبة المحتوى D. عضوٌ جديد (كـframe-math-s) يدخل المطابقة تلقائياً
     بمجرّد إضافته إلى sizes/order في عائلته. (الرياضيات: m فقط الآن → يُختار دائماً.) */
  var ORDER=curFam().order;
  function selectBest(){
    var bst=null;
    for(var i=0;i<ORDER.length;i++){
      var size=ORDER[i], cfg=resolveCfg(size), r=frameAR(cfg);
      var baseW=BASE_FILL*availH/r;                 /* عرض مقياس 1 */
      var Wmax=Wceil;                               /* التكبير حرّ بنسبة محفوظة */
      var Wmin=Math.min(Wmax, CAP_DOWN*baseW);      /* أدنى عرض (−25%) */
      if(!frameFits(f,fill,w,size,Wmax)) continue;  /* لا يسع حتى عند الأكبر */
      var d=Math.abs(frameWinAR(cfg)-D);            /* بُعد نسبة نافذته عن نسبة المحتوى */
      if(bst && d>=bst.d) continue;                 /* أبعد من الفائز الحاليّ */
      /* بحث ثنائي عن أصغر عرض يسع في [Wmin,Wmax] (hi يسع دائماً).
         والوسيطُ المرنُ يتخطّاه: أوسعُ عرضٍ مسموحٍ (hi=Wmax) هو مطلوبُه (انظر أعلاه). */
      var lo=Wmin, hi=Wmax;
      if(!_flexMedia) for(var it=0; it<16; it++){
        var mid=(lo+hi)/2;
        if(frameFits(f,fill,w,size,mid)) hi=mid; else lo=mid;
      }
      bst={size:size, W:hi, baseW:baseW, d:d};
    }
    return bst;
  }
  var best=selectBest();
  if(!best){
    /* ═══ «تصغيرُ المحتوى قبلَ الملاذِ الأخير» (§١.٤ز) ═══
       المرنةُ لمحتوى لا يسعُه إطارٌ حقيقيٌّ البتة؛ أمّا محتوىً يفصلُه عن أكبرِ
       نافذةٍ هامشٌ يسير (قِيس: 970 مقابل 914 في تلوينِ المصفوفات) فتصغيرُه
       التدريجيُّ (--s: خطوطٌ حتى أرضياتِها §١.٥أ ووسائطُ بنسبةِ المقياس) يُدخلُه
       إطاراً حقيقياً — خيرٌ من مرنةٍ صندوقُها يفيضُ مئاتِ البكسلاتِ تحتَ رسمِها
       شريطاً أزرقَ خاماً. القياسُ كلُّه بفضاءِ التصميم (client لا rect) فالقرارُ
       **مستقلٌّ عن الزوم** ومستقرٌّ عبرَ المنافذ. */
    var s0=parseFloat(card.dataset.cs||'1'), sTry=s0;
    while(!best && sTry>CS_MIN+1e-9){
      sTry=+Math.max(CS_MIN, sTry-CS_STEP).toFixed(2);
      w.style.setProperty('--s', String(sTry));
      best=selectBest();
    }
    if(best){
      card.dataset.cs=String(sTry);
      if(DEV) console.log('%c[إطار] تصغير قبل الملاذ: --s='+sTry.toFixed(2)+
        ' أدخل المحتوى إطارَ '+best.size,'color:#2B5748;font-weight:bold');
    } else {
      /* لم يُجدِ التصغيرُ حتى الأرضية → مرنةٌ حقّاً؛ أعدِ المقياسَ لحالتِه */
      if(s0>=1) w.style.removeProperty('--s'); else w.style.setProperty('--s', String(s0));
    }
  }
  if(!best){ var fb=curFam().flexBase; var fcfg=toFlex(f,fill,w,fb); card.dataset.fit='flex'; _worstH=w.scrollHeight;
    if(!fcfg.hasFill) placeFill(f,fill,resolveCfg(fb).img);   /* النقطية فقط؛ المدموجة من الصورة/اللون */
    return; }
  frameFits(f,fill,w,best.size,best.W);           /* ثبّت الفائز (هندسةً) */
  paintFrame(f,fill,resolveCfg(best.size));       /* ثمّ ارسمه مرّةً واحدة — طلبُ صورةٍ واحدٌ لا عشرات */
  _worstH=w.scrollHeight;                          /* ارتفاع أسوأ الحالات في الإطار الفائز */
  if(best.W>contW){                               /* أعرض من العمود → وسّطه فوقه */
    var mrg=(contW-best.W)/2;
    f.style.marginLeft=mrg+'px'; f.style.marginRight=mrg+'px';
  }
  /* التعبئة للأطر المقيسة تُضبط بالنسبة المئوية في applyFrame (openingPct×FILL_K)،
     فلا تحتاج px هنا؛ placeFill يبقى للحاوية المرنة فقط (letterbox). */
  card.dataset.fit=best.size+'@'+Math.round(best.W/best.baseW*100)+'%';
  }finally{
    if(_restore) _restore();
    /* §١.٤ز: حشوةُ qflex تُحسَبُ بعدَ استرجاعِ المحتوى الحقيقيِّ (لا بأسوأِ الحالات —
       صندوقُ المرنةِ ديناميكيٌّ أصلاً، وonContentResize يلاحقُ نموَّه أثناءَ الإجابة) */
    if(f.classList.contains('qflex')) placeFlexPad(f,w);
    /* القياس تمّ بلا انتقال؛ الآن نُحرّك التغيّر النهائي في العرض بسلاسة:
       نقفز للعرض السابق فوراً ثم نُعيد الانتقال ونضبط العرض النهائي فيتحرّك. */
    var _finalW=f.style.width;
    if(!f.classList.contains('qflex') && _prevW && _prevW!==_finalW){
      f.style.width=_prevW; void f.offsetWidth;
      f.style.transition=''; f.style.width=_finalW;
    } else {
      f.style.transition='';
    }
    /* تقرير تطويري + فحص قداسة نسبة الأبعاد: بعد كل ضبط نقارن النسبة المعروضة
       (العرض/الارتفاع الفعليّين) بالنسبة الأصلية لصورة الإطار، ونطبع تحذيراً
       صارخاً إن اختلفتا بأكثر من 1% — فأي كسر مستقبليّ يُكشف فوراً. */
    if(DEV){
      var _fit=card.dataset.fit||'?';
      var _sz=_fit.split('@')[0];
      var _fr=f.getBoundingClientRect();
      var _shownAR=_fr.height>0?_fr.width/_fr.height:0;
      var _origAR=null, _ratioOK=null;
      if(_sz!=='flex' && curFam().sizes[_sz]){
        var _p=resolveCfg(_sz).ar.split('/');   /* الإطار الفعلي المطبَّق (عائلة المادة) */
        _origAR=parseFloat(_p[0])/parseFloat(_p[1]);
        var _diff=Math.abs(_shownAR-_origAR)/_origAR;
        _ratioOK=_diff<=0.01;
        if(!_ratioOK) console.warn('%c[إطار] ⛔ كُسِرت نسبة الأبعاد! '+_kind+' ('+_fit+') — '+
          'أصلية '+_origAR.toFixed(4)+' / معروضة '+_shownAR.toFixed(4)+
          ' (فرق '+(_diff*100).toFixed(1)+'%)','color:#c0392b;font-weight:bold;font-size:13px');
      } else if(_sz==='flex'){
        /* qflex لم يعد معفياً من الفحص: نطبع رقم انحراف صندوقه عن نسبة نافذة l */
        var _fw=f.getBoundingClientRect().width;
        var _ch=w.scrollHeight;
        var _flexAR=_ch>0?_fw/_ch:0;
        var _devF=QFLEX_NOM_AR>0?(QFLEX_NOM_AR-_flexAR)/QFLEX_NOM_AR:0;
        console.warn('%c[إطار] ⚠️ qflex (ملاذ أخير) '+_kind+' — نسبة الصندوق '+_flexAR.toFixed(3)+
          ' · انحراف '+(_devF*100).toFixed(1)+'% عن نسبة نافذة l ('+QFLEX_NOM_AR.toFixed(2)+')',
          'color:#c0392b;font-weight:bold;font-size:12px');
      }
      console.log('%c[إطار] '+_kind+' → '+_fit+
        ' | نسبة أصلية '+(_origAR?_origAR.toFixed(4):'—')+' / معروضة '+_shownAR.toFixed(4)+' '+
        (_ratioOK===true?'✓':(_ratioOK===false?'✗':'(flex)'))+
        ' | أسوأ الحالات ≈'+Math.round(_worstH)+'px | نافذة '+w.clientHeight+'px'+
        ' | RO:'+(card.dataset.roIntervened?'⚠️تدخّل':'✔'),
        'color:#2B5748;font-weight:bold');
    }
  }
}
/* ═══ أزرارُ التنقّل: صورةُ btn-next-prev.png كما كانت (قرارُ المالك) ═══
   **استثناءٌ نهائيّ:** الشاراتُ وأزرارُ التنقّلِ وتحقّق/إعادة **خارجَ التعميمِ
   الحجريّ**، لأنّ الأسلوبَ الحجريَّ مقصودٌ **داخلَ حاويةِ السؤال (`.qwin`) وحدَها**.
   فأُزيلَ توليدُ السهمِ SVG وعادَ عنصرُ `<img>` لكلِّ المواد بلا استثناء،
   وأُزيلَ فصلُ رمزِ «تحقّق/إعادة» فعادَ الرمزُ في عقدةِ نصِّ الزرِّ كما يكتبُه app.js. */
function enhanceNav(){
  frameize();
  document.querySelectorAll('.qnav .qprev:not([data-img])').forEach(function(b){
    b.dataset.img='1'; b.classList.add('nav-btn','nav-prev');
    b.innerHTML='<img src="images/ui/btn-next-prev.png" alt="">'+
                '<span class="ncap">السابق</span>';
  });
  document.querySelectorAll('.qnav .qnext:not([data-img])').forEach(function(b){
    b.dataset.img='1'; b.classList.add('nav-btn','nav-next');
    b.innerHTML='<img src="images/ui/btn-next-prev.png" alt="">'+
                '<span class="ncap">التالي</span>';
  });
}
/* يضبط البطاقة الظاهرة فقط، مع حارس يمنع حلقة المراقب (كتابتنا للأنماط
   تُطلق المراقب) وتوقيع يتجنّب إعادة الحساب دون داعٍ */
var _fitBusy=false;
function fitShown(){
  if(_fitBusy) return;
  var shown=currentShown();
  if(!shown||!shown.querySelector('.qframe')) return;
  var sig=(shown.clientWidth||0)+'x'+Math.round(availHeight());
  if(shown.dataset.fitSig===sig && shown.dataset.fit) return;
  /* توقيعٌ جديدٌ حقاً (منفذٌ/عرضٌ آخر): مقياسُ المحتوى يبدأُ من 1 وحارسُ الشاشةِ يخفضُه
     ثانيةً إن لزم. يُقارَنُ بتوقيعٍ محفوظٍ مستقلٍّ (csSig) لا بـfitSig — لأنّ مراقبَ
     الفيضِ يمسحُ fitSig عمداً لإعادةِ الضبط، ولو صفّرنا المقياسَ عندَها لدخلنا حلقةَ
     «تصفيرٌ → تصغيرُ الحارسِ → فيضٌ حدّيٌّ → مسحٌ → تصفيرٌ…» بلا نهاية (وقعت فعلاً). */
  if(shown.dataset.csSig!==sig){
    shown.dataset.csSig=sig;
    delete shown.dataset.cs;
    delete shown.dataset.csTries;
    var w0=shown.querySelector('.qwin'); if(w0) w0.style.removeProperty('--s');
  }
  shown.dataset.fitSig=sig;
  _fitBusy=true;
  try{ fitFrame(shown); }
  finally{ setTimeout(function(){_fitBusy=false;},0); placeChrome(); scheduleScreenGuard(); }
}
/* ═══ حارسُ الشاشة — «لا يتجاوزُ ارتفاعُ أيِّ إطارٍ (شاملاً حشوةَ qflex) ارتفاعَ
   الشاشةِ المتاح؛ عندَ التجاوزِ يُصغَّرُ المحتوى لا الإطار» (§١.٤ب/§١.٤ز) ═══
   زومُ fit.js يحتوي المحتوى المتدفّقَ أصلاً، لكنّ ما يمتدُّ فوقَ أصلِ التمريرِ
   (الهوامشُ السالبةُ لركوبِ الأيقونات + letterbox المرنةِ الملوَّنُ بتعبئتِها) لا
   يراهُ scrollHeight فيُقصُّ من أعلى الشاشةِ بلا علاج — وهذه حالةُ qflex الثقيلة.
   المعيارُ إمبريقيٌّ بالبكسلِ الحقيقيّ: قمّةُ العمودِ (الإطار/الشارات) ≥ 0 وقاعُه
   (الإطار/التنقّل) ≤ ارتفاعِ المنفذ، مع «صفرِ تجاوزٍ» داخلَ النافذة (§١.٤و).
   **البنيةُ تكّاتٌ مستقرّةٌ لا حلقةٌ متزامنة:** القياسُ داخلَ fitShown يسبقُ placeChrome
   والمراقباتِ وانتقالَ العرضِ فيقرأُ حالةً لم تستقرَّ (تذبذبَ فعلاً وتأرجحَ بين qflex
   وtall بلا نهاية). فالفحصُ يُجدوَلُ بعدَ سكونِ كلِّ شيء (rAF مزدوجٌ يَعقُبُ زومَ
   fit.js المجدوَل): إن تجاوزَ العمودُ الشاشةَ خُفِّضَ مقياسُ المحتوى `--s` خطوةً
   (inline على .qwin — إعلانُ الورقةِ عليها يغلبُ الوراثة، فتنكمشُ الخطوطُ حتى
   أرضياتِها §١.٥أ والوسائطُ بنسبةِ المقياس) وأُعيدَ الاختيارُ والضبطُ ثم تكّةٌ
   جديدة — حتى الاتساعِ أو أرضيةِ CS_MIN، وبصمّامِ CS_TRIES_MAX ضدّ أيّ تأرجح.
   السؤالُ المتّسعُ أصلاً تمرُّ تكّتُه قياساً صِرفاً دونَ أيِّ تغيير. */
var CS_MIN=0.5, CS_STEP=0.07, CS_TRIES_MAX=12;
/* الجدولةُ بمؤقّتٍ لا بـrAF: rAF لا ينبضُ في لوحةٍ غيرِ معروضة (سبورةٌ مطفأة،
   تبويبٌ خلفيّ) فيتجمّدُ الحارسُ — والمؤقّتُ ينبضُ دائماً (مخنوقاً في الخلفيةِ إلى
   ~ثانية، وهو كافٍ). والتكّةُ تستدعي ShoogpFit.apply بنفسِها فلا تعتمدُ على rAF زومِ
   fit.js المجدوَل. مهلةُ 60ms تدعُ المراقباتِ والانتقالاتِ تسكن. */
var _sgTimer=0;
function scheduleScreenGuard(){
  if(_sgTimer) return;
  _sgTimer=setTimeout(function(){ _sgTimer=0; screenGuardTick(); }, 60);
}
function screenGuardTick(){
  if(!gateOn() || _fitBusy) return;
  var card=currentShown(); if(!card) return;
  var f=card.querySelector('.qframe'), w=card.querySelector('.qwin');
  if(!f||!w||!f.clientHeight) return;
  /* هندسةُ صورِ العائلةِ أساسُ القياسِ الصادق (حشوةُ qflex وهوامشُ الأيقونات) —
     قبلَ جهوزِها لا حُكْمَ: اكتمالُ القياسِ يستدعي fitShown فتُجدوَلُ تكّةٌ صادقة. */
  var fam=curFam(), k2, st2;
  for(k2 in fam.sizes){ st2=_frameGeo[fam.sizes[k2].img];
    if(st2===undefined) measureFrameGeo(fam.sizes[k2].img);
    if(st2===undefined || st2==='pending') return;
  }
  /* ثبّتِ انتقالَ العرضِ قبلَ القياس (القياسُ أثناءَ الحركةِ يقرأُ عرضاً لم يستقرّ) */
  f.style.transition='none'; void f.offsetWidth;
  if(window.ShoogpFit && ShoogpFit.apply) ShoogpFit.apply();
  var ih=window.innerHeight;
  var fr=f.getBoundingClientRect(), top=fr.top, bot=fr.bottom, r2;
  var head=card.querySelector('.qhead');
  if(head){ r2=head.getBoundingClientRect(); if(r2.top<top) top=r2.top; }
  var q=document.getElementById('questionList'), nav=q && q.querySelector('.qnav');
  if(nav){ r2=nav.getBoundingClientRect(); if(r2.bottom>bot) bot=r2.bottom; }
  var ovf=(w.scrollHeight>w.clientHeight+2) && !f.classList.contains('qflex');
  /* (أ) نسبةُ المحتوى إلى الإطار — إطارٌ منفوخٌ فوقَ محتواه (فراغٌ مفرط)؟
     و(ب) البرومبتُ أسفلَ الحدِّ الداخليِّ للزخرفةِ العلوية دائماً (§١.٤ز).
     كلاهما بفضاءِ التصميم (client) فالحكمُ مستقلٌّ عن الزوم. */
  var inflated=false, promptClash=false;
  if(w.scrollHeight && f.clientHeight && (w.scrollHeight/f.clientHeight)<0.5) inflated=true;
  var g2=_frameGeo[f.dataset.fimg||''];
  if(f.classList.contains('qflex') && g2 && g2!=='pending' && g2.decoT!=null){
    var p2=w.querySelector('.qprompt');
    if(p2){
      var k2b=f.clientWidth/fr.width;
      var s2b=Math.min(f.clientWidth/g2.natW, f.clientHeight/g2.natH);
      promptClash=((p2.getBoundingClientRect().top-fr.top)*k2b) < (g2.decoT*s2b + FLEX_BREATH - 2);
    }
  }
  f.style.transition='';
  var s=parseFloat(card.dataset.cs||'1');
  if(top>=-0.5 && bot<=ih+0.5 && !ovf && !inflated && !promptClash){
    if(DEV && s<1) console.log('%c[إطار] حارس الشاشة: اتّسع عند --s='+s.toFixed(2)+
      ' (قمة '+top.toFixed(1)+' / قاع '+bot.toFixed(1)+' / منفذ '+ih+')','color:#2B5748;font-weight:bold');
    delete card.dataset.csTries;
    return;
  }
  var tries=+(card.dataset.csTries||0);
  if(tries>=CS_TRIES_MAX) return;               /* صمّامُ الأمان: لا مطاردةَ بلا نهاية */
  card.dataset.csTries=String(tries+1);
  /* والشاشةُ متّسعة (فيضُ تقريبٍ أو انتفاخٌ أو تزاحمُ برومبت) → إعادةُ اختيارٍ وضبطٍ
     بلا تصغيرٍ أولاً؛ فإن **استمرّتِ** المخالفةُ بعدَ محاولتَينِ فالنتيجةُ حتميةٌ
     (كفيضِ تقريبٍ بثلاثِ بكسلاتٍ يعيدُ نفسَه) — عندَها التصغيرُ هو الحلّ. */
  if(top<-0.5 || bot>ih+0.5 || tries>=3){
    if(s<=CS_MIN){
      if(DEV) console.warn('%c[إطار] ⚠️ حارس الشاشة: بلغ الأرضية --s='+CS_MIN+
        ' وما زال التجاوز (قمة '+top.toFixed(1)+' / قاع '+bot.toFixed(1)+' / منفذ '+ih+
        ') — الأرضياتُ الدنيا (§١.٥أ) تمنعُ مزيدَ التصغير','color:#c0392b;font-weight:bold');
      return;
    }
    s=Math.max(CS_MIN, +(s-CS_STEP).toFixed(2));
    card.dataset.cs=String(s);
    w.style.setProperty('--s', String(s));
  }
  card.dataset.fitSig='';
  fitShown();                    /* يعيدُ الاختيارَ والضبطَ ويجدولُ تكّةَ تحقّقٍ جديدة */
}

/* ═══ إعادة حساب ديناميكية: شبكة أمان بمراقب أبعاد على محتوى النافذة ═══
   «أسوأ الحالات» يمنع تغيّر المقاس أثناء الإجابة سلفاً؛ وهذا المراقب احتياطٌ
   إن نما المحتوى وفاض رغم ذلك (تقدير ناقص أو نوع سؤال آخر ينمو): نُبطل التوقيع
   ونعيد الاختيار والضبط (بانتقال CSS سلس). إن عجز أكبر إطار → الحاوية المرنة
   (qflex) التي تنمو تلقائياً بلا فيضان ولا تمرير. */
var _croRAF=0;
function onContentResize(){
  if(_croRAF) return;
  _croRAF=requestAnimationFrame(function(){
    _croRAF=0;
    if(_fitBusy||!gateOn()) return;
    var shown=currentShown(); if(!shown) return;
    var w=shown.querySelector('.qwin'); if(!w) return;
    if(shown.dataset.fit==='flex'){                 /* المرنة تنمو تلقائياً — وحشوتُها تلاحقُ
       المحتوى الحيَّ (لا أسوأَ الحالات): الصندوقُ نفسُه ديناميكيٌّ فالحشوةُ مثلُه (§١.٤ز) */
      var ff=shown.querySelector('.qframe'); if(ff) placeFlexPad(ff,w);
      return;
    }
    if(w.scrollHeight > w.clientHeight+2){            /* فائض فعليّ → كبّر الإطار */
      if(DEV) console.warn('[إطار] ResizeObserver تدخّل: المحتوى فاض بعد الحساب المسبق ('+
        w.scrollHeight+'>'+w.clientHeight+'px) — إعادة الاختيار والضبط. (تقدير مسبق ناقص)');
      shown.dataset.roIntervened='1';               /* يُسجَّل في التقرير التالي */
      shown.dataset.fitSig='';
      fitShown();
      watchShown();
    }
  });
}
var contentRO = window.ResizeObserver ? new ResizeObserver(onContentResize) : null;
/* مراقبُ صندوقِ الإطارِ نفسِه — للشريطِ الخلفيّ وحدَه. عرضُ الإطارِ يتغيّر بانتقالِ CSS
   (‏transition:width) فلا تكفي قراءةٌ واحدةٌ بعدَ الضبط: نتابعُ الصندوقَ حتى يستقرَّ فيلاحقَه
   الشريطُ لحظةً بلحظة. لا يمسُّ خوارزميةَ الاختيارِ ولا يُعيدُ الضبطَ إطلاقاً. */
var frameRO = window.ResizeObserver ? new ResizeObserver(function(){ placeChrome(); }) : null;
function watchShown(){
  var shown=currentShown(); if(!shown) return;
  var w=shown.querySelector('.qwin');
  if(contentRO && w){
    try{ contentRO.disconnect(); }catch(e){}
    /* نراقب أبناء النافذة (تنمو أطوالهم مع توزيع البطاقات) — النافذة نفسها ثابتة الأبعاد.
       **وأبناءَ أبنائِها معهم**: قاعدةُ الاحتواءِ الأساسية (css/style.css) تسقُفُ `.qbody`
       بـ`max-height:100%`، فصندوقُه لا يعلو عن النافذةِ بعدَها ولو نما محتواه — فلو
       اكتفينا بالمستوى الأول لَصَمَتَ المراقبُ عن نموٍّ حقيقيٍّ داخلَه. المستوى الثاني
       يُبقي شبكةَ الأمانِ حيّةً (طبقةٌ مشتركةٌ لكلِّ الأنواع، بلا استثناءٍ لنوع). */
    Array.prototype.forEach.call(w.children,function(ch){
      contentRO.observe(ch);
      Array.prototype.forEach.call(ch.children,function(gc){ contentRO.observe(gc); });
    });
  }
  if(frameRO){
    var f=shown.querySelector('.qframe');
    try{ frameRO.disconnect(); }catch(e){}
    if(f) frameRO.observe(f);
  }
}

new MutationObserver(function(){ if(_fitBusy||!gateOn()) return; enhanceNav(); fitShown(); watchShown(); placeChrome(); })
  .observe(document.getElementById('questionList'),
    {childList:true,subtree:true,attributes:true,attributeFilter:['style']});
/* `orientationchange` معه: بعضُ الأجهزةِ تُطلقُه دونَ `resize` موثوقٍ في اللحظةِ
   نفسِها، وحدّا الشريطِ الرأسيّانِ يعتمدانِ على مواضعَ تتبدّلُ مع دوران الشاشة.
   (الزومُ يتغيّرُ عبرَ fit.js فيُطلقُ مراقبَ الأنماطِ ثمّ placeChrome — مغطّىً أصلاً.) */
['resize','orientationchange'].forEach(function(ev){
  window.addEventListener(ev,function(){
    if(!gateOn()) return;
    document.querySelectorAll('.qcard').forEach(function(c){c.dataset.fitSig='';});
    fitShown(); watchShown(); placeChrome();
  });
});
/* مغادرةُ شاشةِ النشاطِ لا تُطفئُ البوّابةَ (الصنفُ يبقى على questionList)، فنرقّعُ
   showScreen كي يختفيَ الشريطُ خارجَ صفحةِ الدرسِ ويعودَ عندَ الرجوعِ إليها. */
(function(){
  var orig=window.showScreen;
  if(typeof orig!=='function') return;
  window.showScreen=function(){
    var r=orig.apply(this, arguments);
    placeChrome();
    return r;
  };
})();

/* ═══ تفعيل النظام لكامل كتاب علوم الصف الرابع (g4-sci) ═══
   نرقّع openLesson (دون تعديل app.js المشترك): نضيف صنف .shoogp-ui على
   #questionList عند فتح أي درس من الكتاب، ونزيله لأي كتاب آخر — فيبقى النظام
   معزولاً في هذا الكتاب وحده ولا يمسّ بقية الكتب. */
(function(){
  var orig=window.openLesson;
  if(typeof orig!=='function') return;
  window.openLesson=function(ls){
    var on = lessonInScope(ls);
    _curBook = on ? lessonBook(ls) : null;        /* كتابُ الدرس (لونُ بطاقتِه للشريط) */
    _curSubject = on ? lessonSubject(ls) : null;  /* مادة الدرس لاختيار الإطار */
    if(on) preloadFamily(curFam());               /* سخّن إطاراتِ مادةِ الدرس قبل بناء الأسئلة */
    var q=document.getElementById('questionList');
    if(q){
      q.classList.toggle('shoogp-ui', on);       /* البوّابة: قبل بناء الأسئلة */
      /* علامةُ المادة — لكلِّ دروسِ المادة (تلتقطها قواعدُ CSS الخاصةُ بمادةٍ بعينِها) */
      var sc = on ? subjectClass(_curSubject) : null;
      allSubjectClasses().forEach(function(c){ q.classList.remove(c); });
      if(sc) q.classList.add(sc);
      var sk = on ? skinFor(ls) : null;          /* قشرةُ أزرارِ الإجابة (محكومةٌ بالمعاينة) */
      allSkinClasses().forEach(function(c){ q.classList.remove(c); });
      if(sk) q.classList.add(sk);
      /* ═══ حارسُ التلازم: القشرةُ لا تُوضَع إلا مع علامةِ مادّتِها ═══
         `skin-rocky` كسوةُ العلوم، و`subj-science` علامتُها؛ وكلاهما مشتقٌّ اليوم
         من `lessonSubject` فهما متلازمانِ بنيوياً. الحارسُ يمنعُ انفكاكَهما لو
         تغيّرَ أحدُ المصدرَينِ مستقبلاً — فتتسرّبَ كسوةُ العلومِ إلى مادةٍ أخرى. */
      if(DEV){
        var skinOn=allSkinClasses().filter(function(c){ return q.classList.contains(c); });
        skinOn.forEach(function(c){
          var owner=Object.keys(SUBJECT_SKINS).filter(function(k){ return SUBJECT_SKINS[k]===c; })[0];
          if(!q.classList.contains(subjectClass(owner)))
            console.warn('%c[قشرة] ⛔ تسرُّب: الصنفُ '+c+' موضوعٌ بلا علامةِ مادّتِه '+
              subjectClass(owner)+' (الدرس '+(ls&&ls.file)+') — راجعْ skinFor/lessonSubject.',
              'color:#c0392b;font-weight:bold;font-size:13px');
        });
      }
    }
    return orig.apply(this, arguments);
  };
})();

/* ═══ اهتزاز لطيف عند خطأ التوصيل ═══
   محرّك التوصيل في app.js لا يضيف صنفاً عند الخطأ، بل يفرض خلفية وردية inline
   لنصف ثانية. أسلوبنا الزجاجي يتجاهل تلك الوردية (background !important)،
   ونكتفي هنا بإضافة صنف .shake مؤقتاً على البطاقة اليمنى لإطلاق الاهتزاز.
   نستمع في طور الالتقاط: إن كان هناك اختيارٌ يساري قائم ولم تُطابَق البطاقة
   بعد النقر، فتلك محاولة خاطئة → اهتزاز. (يعمل داخل الصفحة التجريبية فقط.) */
document.getElementById('questionList').addEventListener('click', function(e){
  if(!gateOn()) return;
  var right=e.target.closest('.mitem.right');
  if(!right || right.classList.contains('matched')) return;
  var hasSel=document.querySelector('.mitem.left.selected');
  if(!hasSel) return;                       /* بلا اختيار → لا تغذية (كمنطق app.js) */
  setTimeout(function(){
    if(!right.classList.contains('matched')){ /* لم تُطابَق → محاولة خاطئة */
      right.classList.remove('shake');       /* إعادة التشغيل لو تكرّر الخطأ */
      void right.offsetWidth;
      right.classList.add('shake');
      setTimeout(function(){ right.classList.remove('shake'); }, 500);
    }
  }, 0);
}, true);
