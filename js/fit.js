/* ═══════════════════════════════════════════════════════════════
   ملاءمة الشاشة (fit to viewport) — تحجيم موحّد لكامل المنصّة كي تتّسع في
   النافذة بالكامل، بلا أيّ شريط تمرير (عموديّ ولا أفقيّ).

   الخوارزمية (احتواء): نقيس ارتفاع المحتوى الفعليّ بالفضاء التصميميّ (scrollHeight
   مستقلّ عن zoom)، ونطبّق على الجذر:
        zoom = الأصغر بين ( عرض النافذة ÷ العرض التصميميّ ,  ارتفاع النافذة ÷ ارتفاع المحتوى )
   فيتّسع كل شيء عرضاً وطولاً داخل النافذة دفعةً واحدة. ونمنع أشرطة التمرير نهائياً
   بـ overflow:hidden. اخترنا CSS zoom (لا transform) كي تبقى العناصر الثابتة
   (عمود الصاروخ) واللمسات سليمة.

   قيدٌ نعالجه: تحت zoom يرجع getBoundingClientRect إحداثيات مكبّرة بينما الأنماط
   تُطبَّق بوحدات تصميميّة. لذا نكشف window.ShoogpFit {zoom, designW, designH}
   وwindow.fitRect(el) (مستطيل بالفضاء التصميميّ) — يستعملها الصاروخ ونظام الإطار
   وأسئلة السحب/التوصيل/الخريطة الذهنية. الارتفاع المرجعيّ designH ثابت كي يبقى
   قياس الصاروخ/الإطار مستقرّاً، ثم يتكفّل الاحتواء الشامل بملاءمة الكلّ للشاشة.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var DESIGN_W = 1000;   // العرض التصميميّ
  var DESIGN_H = 700;    // ارتفاع تصميميّ مرجعيّ (للصاروخ ونظام الإطار)
  var ZOOM_MAX = 3, ZOOM_MIN = 0.2;
  var ZOOM_LOCK_MAX = 1;   // سقفُ شاشةِ الأسئلة — العلّةُ والقياسُ عندَ موضعِ الاستعمالِ أدناه

  var state = { zoom:1, designW:DESIGN_W, designH:DESIGN_H, contentH:DESIGN_H, active:true };
  window.ShoogpFit = state;
  window.fitRect = function(el){ var r=el.getBoundingClientRect(), z=state.zoom||1;
    return { left:r.left/z, top:r.top/z, right:r.right/z, bottom:r.bottom/z, width:r.width/z, height:r.height/z }; };

  /* نطاق قفل التمرير (قرار المالك ٢٠٢٦-٠٨-٠١): الاحتواء الكامل ومنع التمرير
     في **شاشة الأسئلة وحدها** (fit-lock على الجذر عندما #activityScreen نشطة)؛
     أما صفحتا الكتب والفهرس فتتلاءمان عرضاً فقط ويعمل تمريرهما الرأسي طبيعياً. */
  var st=document.createElement('style');
  st.textContent='html,body{margin:0 !important;overflow-x:hidden !important}html{height:100%}'+
    'html.fit-lock,html.fit-lock body{overflow:hidden !important}';
  (document.head||document.documentElement).appendChild(st);

  var mo=null;
  function ensureAppWidth(app){
    if(!app) return;
    if(app.style.width!==DESIGN_W+'px') app.style.width=DESIGN_W+'px';
    if(app.style.maxWidth!==DESIGN_W+'px') app.style.maxWidth=DESIGN_W+'px';
    if(app.style.marginLeft!=='auto'){ app.style.marginLeft='auto'; app.style.marginRight='auto'; }
  }
  /* ⚠️ عمودُ الصاروخِ **لا يدخلُ في هذا القياس** — وكانَ يدخلُه فيسقُفُ الزومَ تحتَ ١
     إلى الأبد (مقيسٌ ٢٠٢٦-١٠-٢٦).

     العلّةُ حلقةٌ مغلقة: ارتفاعُ العمودِ نفسُه مُسنَدٌ أدناه في `apply()` إلى
     `ih − LANE_MARGIN − laneTop + EARTH_BOTTOM` = **`ih − 38`**. فلو حُسِبَ هنا
     صارَ طولُ المحتوى `92 + (ih−38) + 8` = **`ih + 62`** — أي **أطولَ من المنفذِ
     دائماً مهما كبُرَ** — فيصيرُ `zoom = (ih−4)/(ih+62)` ولا يبلغُ ١ أبداً:
     0.942 عند 1080 · 0.956 عند 1440 · 0.970 عند 2160. فلوحُ المدرسةِ 86″ بدقّةِ
     3840×2160 كانَ يعرضُ المنصّةَ بمقاسِ تصميمِها 1000×700 ولا يستفيدُ من مساحتِه.

     وإخراجُه صحيحٌ لا تساهُل: العمودُ `position:fixed` **خارجَ تدفّقِ `.app`**،
     ويُطبَّقُ عليه في `apply()` **زومٌ مضادٌّ (`1/zoom`)** فيُرسَمُ بالبكسلِ الحقيقيِّ
     ولا يتأثّرُ بزومِ المحتوى إطلاقاً، وموضعُه وارتفاعُه مشتقّانِ من `ih` الحيِّ
     فهو **مضمونُ الاحتواءِ بالبناءِ لا بالقياس**. فإدخالُه في حسابِ ما يُزَمُّ
     لأجلِه تحصيلُ حاصلٍ يضرُّ ولا ينفع.
     *(الحارسُ من عهدِ ما قبلَ الزومِ المضادّ، حينَ كانَ العمودُ يُزَمُّ مع المحتوى
     فعلاً — وبقيَ بعدَه سهواً.)* */
  function contentHeight(app){
    return Math.max(1, app ? app.scrollHeight : DESIGN_H);   // مستقلّ عن zoom
  }

  function apply(){
    var de=document.documentElement, app=document.querySelector('.app');
    var iw=window.innerWidth||DESIGN_W, ih=window.innerHeight||DESIGN_H;
    // نكتب عرض .app دون إطلاق المراقب في حلقة (نعطّله لحظة الكتابة)
    if(mo) mo.disconnect();
    ensureAppWidth(app);
    var Hc = contentHeight(app);
    /* شاشة الأسئلة = احتواء كامل بلا تمرير (كما كان)؛ الكتب والفهرس = بلا زوم
       (الحجم الطبيعي ١:١) والتمرير الرأسي يعمل — مع انكماش وقائي فقط إن كانت
       الشاشة أضيق من العرض التصميمي كي لا تُقص الأطراف (قرار المالك ٢٠٢٦-٠٨-٠١) */
    var act=document.getElementById('activityScreen');
    var locked=!!(act && act.classList.contains('active'));
    de.classList.toggle('fit-lock', locked);
    // هامش أمان بسيط (بضعة بكسلات) كي لا يُقصّ المحتوى عند الحافّة
    /* 🔴 سقفُ الزومِ في شاشةِ الأسئلةِ **١ لا `ZOOM_MAX`** — حدُّ سلامةٍ مقيسٌ لا تفضيل.
       فوقَ ١ تنكشفُ علّةُ طلاءٍ في Chromium: خلفيةُ `body` المنتشرةُ إلى لوحِ الصفحةِ
       تُطلى بجزءٍ من المنفذِ فقط، فيظهرُ أسفلُ الشاشةِ وجانبُها **أسودَ**. مقيسٌ
       ٢٠٢٦-١٠-٢٦ على زوم 1.477 و2.013، **ولا يُصلحُه** نقلُ التدرّجِ إلى الجذرِ ولا
       `background-attachment:scroll` — جُرِّبا واختُبِرا بطلاءٍ فاقعٍ فلم يصلا المنطقةَ
       السوداء. ورفعُ السقفِ فوقَ ١ يحتاجُ حلَّ تلك العلّةِ أوّلاً، وهو **طلبٌ مستقلّ**
       (ومعه قرارُ مالكٍ في المقياس: كلُّ ورقةِ مواصفاتِ الإطاراتِ والقشورِ معايَرةٌ
       على ١:١). و`ZOOM_MAX` يبقى للمرجعِ ولا يُستعمَلُ هنا. */
    var zoom = locked
      ? Math.max(ZOOM_MIN, Math.min(ZOOM_LOCK_MAX, Math.min((iw-2)/DESIGN_W, (ih-4)/Hc)))
      : Math.max(ZOOM_MIN, Math.min(1, (iw-2)/DESIGN_W));
    de.style.zoom = String(zoom);
    state.zoom=zoom; state.designW=DESIGN_W; state.designH=DESIGN_H; state.contentH=Hc; state.active=true;
    // عمود الصاروخ: مفصولٌ عن زوم المحتوى ليبقى ثابتاً بين الأسئلة. نطبّق عليه زوماً
    // مضادّاً (1÷zoom) فيُرسم بالبكسل الحقيقيّ (لا يتأثّر بتغيّر زوم المحتوى)، ونثبّته:
    //  • رأسياً: القمر على بُعد LANE_MARGIN من الحافة العليا، والأرض على بُعده من السفلى.
    //  • أفقياً: في منتصف المنطقة اليسرى (موضع ثابت حسب عرض النافذة، لا يتغيّر مع السؤال).
    var lane=document.querySelector('.rocket-lane');
    if(lane){
      /* LANE_MARGIN = طولُ المسارِ من طرفَيه: القمرُ على بُعدِه من الحافّةِ العليا،
         والأرضُ على بُعدِه من السفلى — **مهما كان ارتفاعُ المنفذ** (يُحسَبُ من ih الحيّ).
         MOON_TOP/EARTH_BOTTOM = موضعا الصورتين داخلَ العمود (‎css/style.css‎)، وهما
         المُعادَلانِ هنا. ضُبطا (‎82→32‎ و‎80→30‎) مع خفضِ LANE_MARGIN إلى 50 كي يمتدَّ
         المسارُ 50px من كلِّ حافّة **بلا أن يتغيّرَ صندوقُ العمودِ نفسُه** (‎laneTop=18‎
         والارتفاع ‎ih−38‎ كما كانا) — فلا يتأثّرُ حارسُ contentHeight أدناه ولا الزوم. */
      /* ⚠️ MOON_TOP هنا **موضعُ صندوقِ العمودِ لا موضعُ القمر**: بقيَ 32 بينما صارَ
         `top` القمرِ في CSS ‏72 (أُنزِلَ 40px بطلبِ المالك ٢٠٢٦-٠٩-٢٠)، فالعمودُ في مكانِه
         (‏`laneTop=18`) والقمرُ وحدَه نزل — فهو الآن على بُعدِ 90px من الحافّةِ العليا لا 50. */
      var LANE_MARGIN=50, MOON_TOP=32, EARTH_BOTTOM=30, LANE_W=124;
      lane.style.zoom = String(1/zoom);                 // يُلغي زوم المحتوى → بكسل حقيقيّ
      var laneTop = LANE_MARGIN - MOON_TOP;             // =18: القمر (top:82) يقع عند LANE_MARGIN من الأعلى
      lane.style.top = laneTop + 'px';
      lane.style.bottom = 'auto';
      lane.style.height = (ih - LANE_MARGIN - laneTop + EARTH_BOTTOM) + 'px';  // الأرض عند ih−LANE_MARGIN
      var cx = Math.max(85, Math.min(300, iw*0.13));    // منتصف المنطقة اليسرى (ثابت حسب النافذة)
      lane.style.left = Math.round(cx - LANE_W/2) + 'px';
    }
    if(mo && app) mo.observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class','hidden']});
    try{ window.dispatchEvent(new Event('shoogp-fit')); }catch(e){}
  }

  var raf=0;
  function schedule(){ if(raf) return; raf=requestAnimationFrame(function(){ raf=0; apply(); }); }
  state.apply=apply; state.schedule=schedule;

  function boot(){
    mo=new MutationObserver(schedule);
    apply();                                   // يبدأ المراقبة داخل apply
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
