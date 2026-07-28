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
   العلوم (g4s-) والرياضيات (g4m-) مفعّلتان؛ إضافة كتابٍ = سطرٌ واحد هنا. */
var SHOOGP_BOOKS=[
  {key:'g4-sci',  prefix:'g4s-', subject:'science'},
  {key:'g4-math', prefix:'g4m-', subject:'math'}
];
/* كتاب الدرس (أو null إن خارج النطاق) — يُعتمد لتحديد النطاق والمادة معاً */
function lessonBook(ls){
  if(!ls || !ls.file) return null;
  for(var i=0;i<SHOOGP_BOOKS.length;i++){
    var b=SHOOGP_BOOKS[i];
    var idx=(window.DATA && DATA.index && DATA.index[b.key]);
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
/* ═══ قشورُ أزرارِ الإجابة حسبَ المادة (كسوةٌ بصريةٌ بحتة) ═══
   «القشرة» = صنفٌ واحدٌ يُوضَع على #questionList بجانبِ بوّابةِ .shoogp-ui، يلتقطه
   CSS (§٩ في css/shoogp-ui.css) فيُعيدُ كسوةَ أزرارِ الإجابةِ لتلكَ المادةِ وحدَها.
   المصدرُ هو **نفسُ منطقِ إطاراتِ المواد** (lessonSubject ← الكتاب في SHOOGP_BOOKS)،
   فلا مصدرَ ثانٍ للحقيقة. المادةُ التي لا قشرةَ لها تبقى على شكلِها القائمِ دونَ أيِّ
   تغيير (الرياضياتُ اليوم). لا تمسُّ القشرةُ منطقَ الأسئلةِ ولا بنيةَ DOM.
   **إضافةُ مادةٍ لاحقاً = سطرٌ هنا + كتلةُ CSS بنفسِ اسمِ الصنف.** */
var SUBJECT_SKINS={ science:'skin-rocky' };
/* مرحلةُ المعاينة: القشرةُ محصورةٌ بهذه الدروسِ وحدَها ريثما تُعتمَد.
   **للتعميمِ على كلِّ دروسِ المادة: اجعلْ قيمتَها `null`.** */
var SKIN_PREVIEW_ONLY=['g4s-1-1'];
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
    m:{img:'frame-moon-m.png', ar:'1445 / 1065', win:{top:'10%',  left:'9.5%', right:'9.5%',  bottom:'11%'},   hasFill:false},
    l:{img:'frame-moon-l.png', ar:'1246 / 1222', win:{top:'10.5%',left:'12.5%',right:'11.5%', bottom:'11.5%'}, hasFill:false},
    tall:{img:'frame-moon-tall.png', ar:'973 / 1464', win:{top:'9.7%', left:'14.6%', right:'14.3%', bottom:'13.8%'}, hasFill:false}
  }},
  /* الرياضيات — حجماً بحجم: s وm لهما فريمُهما المعبّأ (frame-math-s/‏m)، وl/tall تستعملُ
     القمريَّ مؤقتاً حتى يتوفّر نظيرُها math.
     s: hasFill:true (تعبئةٌ مدموجةٌ سماوية #00b6d7، لا .qfill)؛ 1536×1024؛ win = منطقتُها
        الداخلية (قِيست L13.8/R13.8/T26.8/B24.3٪) + تنفّسٌ يسير.
     m: hasFill:true (تعبئةٌ مدموجةٌ فيروزية ~#00c7c6، لا .qfill)؛ win = منطقتُها الداخلية
        (قِيست L14.5/R14.5/T16.4/B22.4٪) + تنفّسٌ يسير. */
  math:{ order:['s','m','l','tall'], flexBase:'l', sizes:{
    s:{img:'frame-math-s.png', ar:'1536 / 1024', win:{top:'28.5%',left:'15.5%',right:'15.5%',bottom:'26%'},   hasFill:true, fillColor:'#00b6d7'},
    m:{img:'frame-math-m.png', ar:'1445 / 1055', win:{top:'18%',  left:'16%',  right:'16%',   bottom:'23%'},   hasFill:true, fillColor:'#00c7c6'},
    l:{img:'frame-moon-l.png', ar:'1246 / 1222', win:{top:'10.5%',left:'12.5%',right:'11.5%', bottom:'11.5%'}, hasFill:false},  /* مؤقت: قمريّ حتى يتوفّر frame-math-l */
    tall:{img:'frame-moon-tall.png', ar:'968 / 1464', win:{top:'9.7%', left:'14.6%', right:'14.3%', bottom:'13.8%'}, hasFill:false}  /* مؤقت */
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
      _frameGeo[name]={natW:W,natH:H,oL:bl,oR:br,oT:bt,oB:bb,aL:aL,aR:aR,aT:aT,aB:aB};
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
  var scale=Math.min(bw/geo.natW, bh/geo.natH);          /* contain */
  var offX=(bw-geo.natW*scale)/2, offY=(bh-geo.natH*scale)/2;
  var bleed=Math.max(2, Math.round(scale*6));            /* تداخلٌ يسير تحت المعدن */
  /* حوافُّ الفتحة داخل صندوق الإطار (بالبكسل): يسار/أعلى موضعان، يمين/أسفل إزاحتان */
  var Lx=offX+geo.oL*scale, Rx=offX+geo.oR*scale;
  var Ty=offY+geo.oT*scale, By=offY+geo.oB*scale;
  fill.style.left  =Math.round(Math.max(0, Lx-bleed))+'px';
  fill.style.top   =Math.round(Math.max(0, Ty-bleed))+'px';
  fill.style.right =Math.round(Math.max(0, bw-Rx-bleed))+'px';
  fill.style.bottom=Math.round(Math.max(0, bh-By-bleed))+'px';
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
     المرنة: الصورةُ contain داخلَ الصندوق فتُحاطُ بشريطَين — يدخلانِ الحساب. */
  var scale = f.classList.contains('qflex')
      ? Math.min(bw/g.natW, bh/g.natH) : (bh/g.natH);
  var offY = f.classList.contains('qflex') ? (bh-g.natH*scale)/2 : 0;
  return { top: offY + g.aT*scale, bottom: offY + (g.natH-1-g.aB)*scale };
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
/* الأيقوناتُ ثمّ الشريطُ — الشريطُ يقرأُ صندوقَ ‎.qhead‎ فيجبُ أن يكونَ قد استقرَّ */
function placeChrome(){ placeIcons(); placeBand(); }

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
/* ═══ قشرةُ تعبئةِ الشريطِ حسبَ المادة — **تجربةُ مقارنةٍ مؤقتة** ═══
   العلوم: تعبئةُ الشريطِ = **الخلفيةُ البصريةُ لبطاقةِ كتابِ العلوم** وحدَها (بلا نصوصٍ ولا
   أيقونة) — انظرْ `.qband.qb-sci` في css/shoogp-ui.css. بقيةُ الكتبِ (ومنها الرياضيات) تبقى
   على الرماديِّ الشفّافِ كما هو، فتُقارَنُ النسختانِ جنباً إلى جنب.
   الصنفُ يُوضَع على **الشريطِ نفسِه** لا على questionList، لأنّ الشريطَ ابنُ body فلا تصلُه
   علامةُ المادة `subj-*`. مصدرُ المادةِ نفسُه (`_curSubject`).
   ⚠️ تجربةٌ غيرُ محسومة: **لا تُوثَّق في مهارةِ shoogp-ui** حتى تُعتمَدَ النسخةُ الفائزة. */
var BAND_SKINS={ science:'qb-sci' };
function allBandSkinClasses(){
  return Object.keys(BAND_SKINS).map(function(k){ return BAND_SKINS[k]; });
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
  /* قشرةُ التعبئةِ حسبَ المادة (تجربةُ مقارنة): تُنزَعُ كلُّها ثمّ تُوضَعُ قشرةُ المادةِ إن وُجدت */
  allBandSkinClasses().forEach(function(c){ b.classList.remove(c); });
  var bs=BAND_SKINS[_curSubject];
  if(bs) b.classList.add(bs);
  /* الصندوقُ يغطّي المنفذَ (inset:0) ونقتصُّ حافّتيه: من البكسلِ الحقيقيِّ (rect) إلى
     فضاءِ المحتوى المزوَّم بالقسمةِ على الزوم. inset(أعلى يمين أسفل يسار). */
  var Wv=window.innerWidth/z;
  b.style.clipPath='inset(0px '+(Wv-R/z).toFixed(2)+'px 0px '+(L/z).toFixed(2)+'px)';
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
  var best=null, ORDER=curFam().order;
  for(var i=0;i<ORDER.length;i++){
    var size=ORDER[i], cfg=resolveCfg(size), r=frameAR(cfg);
    var baseW=BASE_FILL*availH/r;                 /* عرض مقياس 1 */
    var Wmax=Wceil;                               /* التكبير حرّ بنسبة محفوظة */
    var Wmin=Math.min(Wmax, CAP_DOWN*baseW);      /* أدنى عرض (−25%) */
    if(!frameFits(f,fill,w,size,Wmax)) continue;  /* لا يسع حتى عند الأكبر */
    var d=Math.abs(frameWinAR(cfg)-D);            /* بُعد نسبة نافذته عن نسبة المحتوى */
    if(best && d>=best.d) continue;               /* أبعد من الفائز الحاليّ */
    /* بحث ثنائي عن أصغر عرض يسع في [Wmin,Wmax] (hi يسع دائماً) */
    var lo=Wmin, hi=Wmax;
    for(var it=0; it<16; it++){
      var mid=(lo+hi)/2;
      if(frameFits(f,fill,w,size,mid)) hi=mid; else lo=mid;
    }
    best={size:size, W:hi, baseW:baseW, d:d};
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
  shown.dataset.fitSig=sig;
  _fitBusy=true;
  try{ fitFrame(shown); }
  finally{ setTimeout(function(){_fitBusy=false;},0); placeChrome(); }
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
    if(shown.dataset.fit==='flex') return;          /* المرنة تنمو تلقائياً */
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
    /* نراقب أبناء النافذة (تنمو أطوالهم مع توزيع البطاقات) — النافذة نفسها ثابتة الأبعاد */
    Array.prototype.forEach.call(w.children,function(ch){ contentRO.observe(ch); });
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
window.addEventListener('resize',function(){
  if(!gateOn()) return;
  document.querySelectorAll('.qcard').forEach(function(c){c.dataset.fitSig='';});
  fitShown(); watchShown(); placeChrome();
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
