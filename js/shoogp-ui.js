/* ═══════════════════════════════════════════════════════════════════
   نظام واجهة شوجب الفضائي (مهارة shoogp-ui) — سكربت التفعيل
   المرحلة الأولى: مطبَّق على درس نموذج واحد فقط عبر بوّابة .shoogp-ui.
   لا يمسّ app.js ولا بقية الدروس؛ كل ما هنا يعمل فقط حين تكون البوّابة مفتوحة.
   ═══════════════════════════════════════════════════════════════════ */
var SHOOGP_LESSON='g4s-2-1';   /* الدرس النموذج (الطيور المُدهشة) */
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
  s:{img:'../images/ui/frame-moon-s.png', ar:'1859 / 788',
     win:{top:'13%',   left:'8.5%',  right:'9%',    bottom:'14.5%'}},
  m:{img:'../images/ui/frame-moon-m.png', ar:'1445 / 1055',
     win:{top:'10%',   left:'9.5%',  right:'9.5%',  bottom:'11%'}},
  l:{img:'../images/ui/frame-moon-l.png', ar:'1246 / 1222',
     win:{top:'10.5%', left:'12.5%', right:'11.5%', bottom:'11.5%'}}
};
var FRAME_ORDER=['s','m','l'];
var BASE_FILL=0.70;   /* حجم مقياس 1: ارتفاع الإطار = 70% من المساحة المتاحة */
var CAP_UP=1.30, CAP_DOWN=0.75, OUTER=0.92;
var DEV=true;         /* تقرير تطويري في الطرفية عن دقّة الحساب المسبق */

function frameAR(cfg){          /* الارتفاع÷العرض (لاشتقاق ارتفاع من عرض) */
  if(!cfg._r){ var p=cfg.ar.split('/'); cfg._r=parseFloat(p[1])/parseFloat(p[0]); }
  return cfg._r;
}
function availHeight(){ return Math.max(380, window.innerHeight*0.80); }

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
/* يضبط صورة الإطار (في متغيّر --fimg لطبقة .qmoon) ونسبته وإزاحات فتحته لمقاس.
   إزاحات التعبئة = نصف إزاحات الفتحة → تمتدّ تحت حافة الإطار (تداخل بلا فجوة) */
function applyFrame(f,fill,w,size){
  var cfg=FRAME_SIZES[size];
  f.style.setProperty('--fimg',"url('"+cfg.img+"')");
  f.style.aspectRatio=cfg.ar;
  ['top','left','right','bottom'].forEach(function(k){
    w.style[k]=cfg.win[k];
    fill.style[k]=(parseFloat(cfg.win[k])*0.5).toFixed(2)+'%';
  });
  return cfg;
}
/* يبني الإطار بعرض Wf ويعيد هل يسع محتواه (بلا فائض) */
function frameFits(f,fill,w,size,Wf){
  applyFrame(f,fill,w,size);
  f.className='qframe qf-'+size;
  f.style.width=Wf+'px';
  return w.scrollHeight<=w.clientHeight+2;   /* قراءة تفرض التخطيط */
}
/* الملاذ الأخير: حاوية مرنة بروح العائلة، بلا تمرير */
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
  var Wceil=Math.max(contW, Math.min(1240, window.innerWidth-60));

  f.style.marginLeft=''; f.style.marginRight='';
  /* قيّم المرشحين الثلاثة: أصغر عرض يسع لكل منهم، ثم اختر أصغرهم مساحةً
     نهائية — فلا يأخذ سؤال قصير إطاراً عريضاً ضخماً لمجرد أنه «يسع» */
  var best=null;
  for(var i=0;i<FRAME_ORDER.length;i++){
    var size=FRAME_ORDER[i], cfg=FRAME_SIZES[size], r=frameAR(cfg);
    var baseW=BASE_FILL*availH/r;                 /* عرض مقياس 1 */
    var Wmax=Wceil;                               /* التكبير حرّ بنسبة محفوظة */
    var Wmin=Math.min(Wmax, CAP_DOWN*baseW);      /* أدنى عرض (−25%) */
    if(!frameFits(f,fill,w,size,Wmax)) continue;  /* لا يسع حتى عند الأكبر */
    /* بحث ثنائي عن أصغر عرض يسع في [Wmin,Wmax] (hi يسع دائماً) */
    var lo=Wmin, hi=Wmax;
    for(var it=0; it<16; it++){
      var mid=(lo+hi)/2;
      if(frameFits(f,fill,w,size,mid)) hi=mid; else lo=mid;
    }
    var area=hi*(hi*r);
    if(!best || area<best.area) best={size:size, W:hi, baseW:baseW, area:area};
  }
  if(!best){ toFlex(f,fill,w,'l'); card.dataset.fit='flex'; _worstH=w.scrollHeight; return; }
  frameFits(f,fill,w,best.size,best.W);           /* ثبّت الفائز */
  _worstH=w.scrollHeight;                          /* ارتفاع أسوأ الحالات في الإطار الفائز */
  if(best.W>contW){                               /* أعرض من العمود → وسّطه فوقه */
    var mrg=(contW-best.W)/2;
    f.style.marginLeft=mrg+'px'; f.style.marginRight=mrg+'px';
  }
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
        var _p=FRAME_SIZES[_sz].ar.split('/');
        _origAR=parseFloat(_p[0])/parseFloat(_p[1]);
        var _diff=Math.abs(_shownAR-_origAR)/_origAR;
        _ratioOK=_diff<=0.01;
        if(!_ratioOK) console.warn('%c[إطار] ⛔ كُسِرت نسبة الأبعاد! '+_kind+' ('+_fit+') — '+
          'أصلية '+_origAR.toFixed(4)+' / معروضة '+_shownAR.toFixed(4)+
          ' (فرق '+(_diff*100).toFixed(1)+'%)','color:#c0392b;font-weight:bold;font-size:13px');
      } else if(_sz==='flex'){
        console.warn('[إطار] ⚠️ الحاوية المرنة (qflex) ملاذٌ أخير — نسبة الإطار غير مثبّتة هنا. '+_kind);
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

/* ═══ تفعيل النظام لدرس نموذج واحد فقط (المرحلة الأولى من التعميم) ═══
   نرقّع openLesson (دون تعديل app.js المشترك): نضيف صنف .shoogp-ui على
   #questionList عند فتح الدرس النموذج فقط، ونزيله لأي درس آخر — فتبقى كل
   أنماط النظام وسكربته معزولةً في هذا الدرس ولا تمسّ بقية الدروس. */
(function(){
  var orig=window.openLesson;
  if(typeof orig!=='function') return;
  window.openLesson=function(ls){
    var on = !!(ls && ls.file===SHOOGP_LESSON);
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
