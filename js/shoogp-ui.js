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
   FRAME_SIZES: هندسة كل مقاس (الصورة، النسبة، إزاحات الفتحة المتحفظة). */
var FRAME_SIZES={
  /* إزاحاتُ النافذةِ مضبوطةٌ ليكونَ الهامشُ العلويُّ (إزاحة−زخرفة) ≥ السفليِّ في كلِّ
     إطارٍ (قاعدةُ §8). القيمُ المقيسةُ للزخرفةِ الداخليةِ (وسيطُ النطاقِ المركزيِّ، %H):
     s: علوية10.03/سفلية10.53 · m: 7.01/9.19 · l: 7.45/9.17 · tall: 8.74/12.91.
     s: خُفِّضَت bottom (14.5→13.5) لموازنةِ الهامشِ (السفليُّ كان أكبرَ) وتقليصِ فجوةٍ
        سفليةٍ زائدةٍ. tall: رُفِعَت top (8.4→9.7) لإصلاحِ هامشٍ علويٍّ سالبٍ (المحتوى
        كان يركبُ الزخرفةَ العلويةَ) وموازنتِه. m وl علويُّهما أكبرُ أصلاً فلم يُمَسّا. */
  s:{img:'frame-moon-s.png', ar:'1859 / 788',
     win:{top:'13%',   left:'8.5%',  right:'9%',    bottom:'13.5%'}},
  m:{img:'frame-moon-m.png', ar:'1445 / 1055',
     win:{top:'10%',   left:'9.5%',  right:'9.5%',  bottom:'11%'}},
  l:{img:'frame-moon-l.png', ar:'1246 / 1222',
     win:{top:'10.5%', left:'12.5%', right:'11.5%', bottom:'11.5%'}},
  tall:{img:'frame-moon-tall.png', ar:'968 / 1464',
     win:{top:'9.7%',  left:'14.6%', right:'14.3%', bottom:'13.8%'}}
};
/* إطار الرياضيات لمقاس s حصراً: صورة بزخارف رياضية. يُبدَّل مكان s حين تكون مادةُ
   الدرس رياضيات (resolveCfg)، وليس عضواً في FRAME_ORDER فلا يُختار مستقلاً. العلوم
   تبقى دائماً على frame-moon-s (لا استبدال). m/l/tall للرياضيات غير جاهزة بعد فتقع
   دروسُها عليها على إطار moon العادي مؤقتاً (مقبول).
   **الهندسة تُطابق صورةَ الإطار الفعلية على القرص** (نافذتها الشفّافة ~2.25): `ar`
   نسبةُ أبعاد الصورة، و`win` إزاحاتُ نافذة المحتوى داخل الفتحة (بتنفّسٍ يسير). أيّ
   تبديلٍ لصورة الإطار يوجب مزامنةَ هذين الحقلين مع أبعاد/فتحة الصورة الجديدة —
   وطبقةُ التعبئة تنحصر تلقائياً بالقياس الحيّ (§قاعدة انحصار التعبئة النقطية). */
var FRAME_MATH_S={img:'frame-moon-math-s.png', ar:'1536 / 1024',
     win:{top:'25%', left:'15%', right:'15%', bottom:'29%'}};
/* اختيار الإطار حسب المادة: يُرجِع هندسة الإطار الفعلية لمقاسٍ ما، مع مراعاة المادة.
   القاعدة الوحيدة: مقاس s في مادة الرياضيات → إطار الرياضيات؛ ما عداه بلا تغيير. */
function resolveCfg(size){
  if(size==='s' && _curSubject==='math') return FRAME_MATH_S;
  return FRAME_SIZES[size];
}
/* ترتيب التقييم — العضو الجديد يُضاف هنا وفي FRAME_SIZES فقط، بلا إعادة هيكلة */
var FRAME_ORDER=['s','m','l','tall'];
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

/* لفّ محتوى كل بطاقة (عدا الشارتين) داخل هيكل الإطار (طبقة .qfill الشبه شفافة
   ثم نافذة .qwin) — بمقاس مبدئي محايد؛ fitFrame() هو من يختار المقاس ويضبطه */
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
/* يضبط صورة الإطار (--fimg، مسارٌ مطلق عبر imgURL) ونسبته وإزاحات نافذته لمقاس.
   إزاحاتُ التعبئة (.qfill) = نسبةٌ مئويةٌ من أبعاد الإطار محكومةٌ بفتحته الفعلية
   (openingPct × FILL_K) — قاعدةٌ نسبيةٌ واحدةٌ تتبعها كلُّ الأطر، تنحصرُ تلقائياً بين
   الحافتين مهما تغيّر الحجمُ أو الدرسُ أو المادة. احتياطاً (قبل جهوزِ القياس): نصفُ
   إزاحةِ نافذةِ الإعداد. (الحاويةُ المرنةُ qflex تُعالَج بـplaceFill لأنها تُحاط letterbox.) */
function applyFrame(f,fill,w,size){
  var cfg=resolveCfg(size);
  f.style.setProperty('--fimg',"url('"+imgURL(cfg.img)+"')");
  f.style.aspectRatio=cfg.ar;
  var op=openingPct(cfg.img);
  ['top','left','right','bottom'].forEach(function(k){
    w.style[k]=cfg.win[k];
    var v = op ? (op[k]*FILL_K) : (parseFloat(cfg.win[k])*0.5);
    fill.style[k]=v.toFixed(2)+'%';
  });
  return cfg;
}
/* ═══ قياسُ فتحةِ صورةِ الإطار (bbox الشفافية) — مصدرُ هندسةِ التعبئة ═══
   نقيسُ *مرّةً* فتحةَ كلِّ صورةِ إطارٍ عبر canvas ونخبّئها. تُشتَقّ منها نسبةُ الفتحة
   (openingPct) لقاعدةِ انحصارِ التعبئة النسبية في applyFrame — وتُستعمَل أيضاً في
   placeFill لحالةِ الحاوية المرنة qflex فقط (لأنها تُحاط letterbox فلا تكفيها النِّسَب).
   القياسُ من نفسِ الأصل (imgURL مطلق) فلا تلوُّثَ CORS. */
var _frameGeo={};   /* name → {natW,natH,oL,oR,oT,oB} | 'pending' | null(تعذّر) */
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
      _frameGeo[name]={natW:W,natH:H,oL:bl,oR:br,oT:bt,oB:bb};
    }catch(e){ _frameGeo[name]=null; }   /* تعذّر (CORS مثلاً) → تبقى الإزاحات الاحتياطية */
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
/* تهيئة: قِس فتحات كل صور الإطارات مسبقاً (مرّة) كي تجهز التعبئة عند فتح أول درس */
(function(){
  FRAME_ORDER.forEach(function(s){ measureFrameGeo(FRAME_SIZES[s].img); });
  measureFrameGeo(FRAME_MATH_S.img);
})();
/* يبني الإطار بعرض Wf ويعيد هل يسع محتواه (بلا فائض) */
function frameFits(f,fill,w,size,Wf){
  applyFrame(f,fill,w,size);
  f.className='qframe qf-'+size;
  f.style.width=Wf+'px';
  return w.scrollHeight<=w.clientHeight+2;   /* قراءة تفرض التخطيط */
}
/* الملاذ الأخير: حاوية مرنة بروح العائلة، بلا تمرير (صورة الإطار contain) */
function toFlex(f,fill,w,base){
  applyFrame(f,fill,w,base);
  f.className='qframe qf-'+base+' qflex';
  f.style.width=''; f.style.aspectRatio='';
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
  /* الاختيار بالنسبة (لا بترتيب الحجم): من بين الأطر التي تسع المحتوى نأخذ الأقرب
     نسبةَ نافذةٍ إلى نسبة المحتوى D — أفضل مطابقة شكلٍ، وأقلّ هدر. عضوٌ جديد يدخل
     المطابقة تلقائياً بمجرّد إضافته إلى FRAME_SIZES/FRAME_ORDER. */
  var best=null;
  for(var i=0;i<FRAME_ORDER.length;i++){
    var size=FRAME_ORDER[i], cfg=resolveCfg(size), r=frameAR(cfg);
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
  if(!best){ toFlex(f,fill,w,'l'); card.dataset.fit='flex'; _worstH=w.scrollHeight;
    placeFill(f,fill,resolveCfg('l').img); return; }   /* احصر تعبئة المرنة أيضاً بالفتحة الفعلية */
  frameFits(f,fill,w,best.size,best.W);           /* ثبّت الفائز */
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
      if(_sz!=='flex' && FRAME_SIZES[_sz]){
        var _p=resolveCfg(_sz).ar.split('/');   /* الإطار الفعلي المطبَّق (يراعي مادة الرياضيات) */
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
  finally{ setTimeout(function(){_fitBusy=false;},0); }
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
function watchShown(){
  if(!contentRO) return;
  var shown=currentShown(); if(!shown) return;
  var w=shown.querySelector('.qwin'); if(!w) return;
  try{ contentRO.disconnect(); }catch(e){}
  /* نراقب أبناء النافذة (تنمو أطوالهم مع توزيع البطاقات) — النافذة نفسها ثابتة الأبعاد */
  Array.prototype.forEach.call(w.children,function(ch){ contentRO.observe(ch); });
}

new MutationObserver(function(){ if(_fitBusy||!gateOn()) return; enhanceNav(); fitShown(); watchShown(); })
  .observe(document.getElementById('questionList'),
    {childList:true,subtree:true,attributes:true,attributeFilter:['style']});
window.addEventListener('resize',function(){
  if(!gateOn()) return;
  document.querySelectorAll('.qcard').forEach(function(c){c.dataset.fitSig='';});
  fitShown(); watchShown();
});

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
    var q=document.getElementById('questionList');
    if(q) q.classList.toggle('shoogp-ui', on);   /* البوّابة: قبل بناء الأسئلة */
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
