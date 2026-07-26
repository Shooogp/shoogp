/* ═══════════════════════════════════════════════════════════════
   ملاءمة العرض (fit to viewport) — تحجيم موحّد للواجهة لتملأ عرض النافذة.
   الفكرة: المحتوى مؤلَّف على عرض تصميميّ ثابت DESIGN_W، ونطبّق CSS zoom على
   الجذر = عرض النافذة ÷ DESIGN_W، فتملأ الواجهة عرض النافذة بالكامل وتُمرَّر
   عمودياً. اخترنا zoom (لا transform) لأنه يُبقي العناصر الثابتة (position:fixed
   كعمود الصاروخ) واللمسات سليمةً.

   قيدٌ تقنيّ نعالجه: تحت zoom يرجع getBoundingClientRect إحداثياتٍ *مكبّرة* بينما
   قيم الأنماط (transform/left/top وسمات SVG) تُطبَّق بوحدات *تصميميّة* ثم تُكبَّر.
   لذا نكشف zoom والأبعاد التصميميّة عبر window.ShoogpFit، ونوفّر window.fitRect(el)
   التي تُرجع مستطيل العنصر بالفضاء التصميميّ (مقسوماً على zoom) — يستعملها الصاروخ
   ونظام الإطار وأسئلة السحب/التوصيل/الخريطة الذهنية كي تتطابق قياساتها مع الرسم.

   على الشاشات الضيّقة (< MIN_W، كالهواتف) نُبقي التخطيط المرن كما هو (بلا zoom)،
   فتبقى استعلامات الميديا الأصلية سليمةً هناك.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var DESIGN_W = 1000;   // العرض التصميميّ (يطابق أقصى عرض .app)
  var MIN_W    = 900;    // دون هذا العرض: تخطيط مرن بلا تحجيم (تبقى الميديا الأصلية)
  var ZOOM_MAX = 2.5;    // سقف أمان لئلّا يتضخّم المحتوى على الشاشات العريضة جداً

  var state = { zoom:1, designW: (window.innerWidth||DESIGN_W), designH:(window.innerHeight||700), active:false };
  window.ShoogpFit = state;

  // مستطيل العنصر في الفضاء التصميميّ (يُلغي أثر zoom) — الأساس المشترك لكل القياسات
  window.fitRect = function(el){
    var r = el.getBoundingClientRect(), z = state.zoom || 1;
    return { left:r.left/z, top:r.top/z, right:r.right/z, bottom:r.bottom/z, width:r.width/z, height:r.height/z };
  };

  function apply(){
    var de = document.documentElement, app = document.querySelector('.app');
    var iw = window.innerWidth || DESIGN_W, ih = window.innerHeight || 700;
    if(iw >= MIN_W){
      var zoom = Math.min(ZOOM_MAX, iw / DESIGN_W);
      de.style.zoom = String(zoom);
      if(app){ app.style.width = DESIGN_W + 'px'; app.style.maxWidth = DESIGN_W + 'px'; }
      state.zoom = zoom; state.designW = DESIGN_W; state.designH = ih / zoom; state.active = true;
    } else {
      de.style.zoom = '';
      if(app){ app.style.width = ''; app.style.maxWidth = ''; }
      state.zoom = 1; state.designW = iw; state.designH = ih; state.active = false;
    }
    // نبّه الأنظمة المعتمِدة (الصاروخ/الإطار) لإعادة القياس على القياس الجديد فوراً
    try{ window.dispatchEvent(new Event('shoogp-fit')); }catch(e){}
  }
  state.apply = apply;

  apply();
  window.addEventListener('resize', apply);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', apply);
})();
