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

  var state = { zoom:1, designW:DESIGN_W, designH:DESIGN_H, contentH:DESIGN_H, active:true };
  window.ShoogpFit = state;
  window.fitRect = function(el){ var r=el.getBoundingClientRect(), z=state.zoom||1;
    return { left:r.left/z, top:r.top/z, right:r.right/z, bottom:r.bottom/z, width:r.width/z, height:r.height/z }; };

  // منع أشرطة التمرير نهائياً (عموديّ وأفقيّ)
  var st=document.createElement('style');
  st.textContent='html,body{margin:0 !important;overflow:hidden !important;}html{height:100%}';
  (document.head||document.documentElement).appendChild(st);

  var mo=null;
  function ensureAppWidth(app){
    if(!app) return;
    if(app.style.width!==DESIGN_W+'px') app.style.width=DESIGN_W+'px';
    if(app.style.maxWidth!==DESIGN_W+'px') app.style.maxWidth=DESIGN_W+'px';
    if(app.style.marginLeft!=='auto'){ app.style.marginLeft='auto'; app.style.marginRight='auto'; }
  }
  function contentHeight(app){
    var h = app ? app.scrollHeight : DESIGN_H;           // مستقلّ عن zoom
    var lane = document.querySelector('.rocket-lane');   // عمود الصاروخ ثابت (خارج تدفّق .app)
    if(lane){ var lh = 92 + lane.offsetHeight + 8; if(lh>h) h=lh; }   // top:92 تصميميّ + هامش
    return Math.max(1, h);
  }

  function apply(){
    var de=document.documentElement, app=document.querySelector('.app');
    var iw=window.innerWidth||DESIGN_W, ih=window.innerHeight||DESIGN_H;
    // نكتب عرض .app دون إطلاق المراقب في حلقة (نعطّله لحظة الكتابة)
    if(mo) mo.disconnect();
    ensureAppWidth(app);
    var Hc = contentHeight(app);
    // هامش أمان بسيط (بضعة بكسلات) كي لا يُقصّ المحتوى عند الحافّة
    var zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, Math.min((iw-2)/DESIGN_W, (ih-4)/Hc)));
    de.style.zoom = String(zoom);
    state.zoom=zoom; state.designW=DESIGN_W; state.designH=DESIGN_H; state.contentH=Hc; state.active=true;
    // عمود الصاروخ: مفصولٌ عن زوم المحتوى ليبقى ثابتاً بين الأسئلة. نطبّق عليه زوماً
    // مضادّاً (1÷zoom) فيُرسم بالبكسل الحقيقيّ (لا يتأثّر بتغيّر زوم المحتوى)، ونثبّته:
    //  • رأسياً: القمر على بُعد LANE_MARGIN من الحافة العليا، والأرض على بُعده من السفلى.
    //  • أفقياً: في منتصف المنطقة اليسرى (موضع ثابت حسب عرض النافذة، لا يتغيّر مع السؤال).
    var lane=document.querySelector('.rocket-lane');
    if(lane){
      var LANE_MARGIN=100, MOON_TOP=82, EARTH_BOTTOM=80, LANE_W=124;
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
