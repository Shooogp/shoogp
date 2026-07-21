/* ═══════════════════════════════════════════════════════════════
   رحلة الصاروخ — نظام تقدّم بصريّ مشترك (بديل النجوم)
   - ملفّ مستقلّ قابل للإضافة لأي درس (لا كود داخل درس بعينه).
   - التفعيل محصور بمفاتيح الدروس في LESSONS أدناه.
   - المعادلة: الارتفاع = (الإجابات الصحيحة ÷ عدد أسئلة الدرس) × المسافة الكلية.
   - يعتمد على عدّ عناصر ‎.qfb.good‎ في حاوية الأسئلة (نفس مصدر التقرير النهائي)،
     فلا يحتاج ربطاً بمنطق كل نوع سؤال على حِدة.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  // الدروس المفعَّل فيها نظام الصاروخ (الإضافة لدرس آخر = سطر واحد هنا)
  const LESSONS = new Set(['g4s-1-1']);

  // صاروخ المنصّة (SVG داخل الكود) — أسلوب فضائيّ مسطّح، أبيض/برتقالي
  const ROCKET_SVG =
    '<svg viewBox="0 0 60 120" width="100%" height="100%" aria-hidden="true">'+
      // النفث (اللهب) — يظهر/يخفى بالأصناف
      '<g class="rj-flame">'+
        '<path class="rj-flame-out" d="M22 96 Q30 138 38 96 Q30 108 22 96 Z"/>'+
        '<path class="rj-flame-in" d="M25 96 Q30 122 35 96 Q30 104 25 96 Z"/>'+
      '</g>'+
      // الزعانف
      '<path class="rj-fin" d="M18 78 L6 100 L18 96 Z"/>'+
      '<path class="rj-fin" d="M42 78 L54 100 L42 96 Z"/>'+
      // جسم الصاروخ
      '<path class="rj-body" d="M30 6 C44 22 44 60 40 96 L20 96 C16 60 16 22 30 6 Z"/>'+
      // مخروط الرأس
      '<path class="rj-nose" d="M30 6 C40 20 42 34 42 40 L18 40 C18 34 20 20 30 6 Z"/>'+
      // النافذة
      '<circle class="rj-win" cx="30" cy="52" r="9"/>'+
      '<circle class="rj-win-g" cx="30" cy="52" r="4.5"/>'+
    '</svg>';

  const RocketJourney = {
    LESSONS: LESSONS,
    isEnabled: function(file){ return LESSONS.has(file); },

    // حالة الرحلة الحالية
    lane:null, rocket:null, host:null,
    total:0, ignited:false, hadError:false, arrived:false, travel:0,

    // ── تركيب المسار في شاشة النشاط ──
    mount: function(host, total){
      this.unmount();
      this.host=host; this.total=total||0;
      this.ignited=false; this.hadError=false; this.arrived=false;

      const lane=document.createElement('div');
      lane.className='rocket-lane';
      lane.setAttribute('aria-hidden','true'); // مؤشّر بصريّ فقط
      lane.innerHTML=
        '<div class="rj-moon">🌙</div>'+
        '<div class="rj-track"></div>'+
        '<div class="rj-rocket">'+ROCKET_SVG+'<div class="rj-smoke"></div></div>'+
        '<div class="rj-earth">'+
          '<div class="rj-pad"></div>'+
          '<div class="rj-planet">🌍</div>'+
        '</div>';
      document.body.appendChild(lane);

      this.lane=lane;
      this.rocket=lane.querySelector('.rj-rocket');
      this._measure();
      this._place(0, false);

      // إعادة القياس عند تغيّر حجم السبورة
      this._onResize=()=>{ this._measure(); this._apply(); };
      window.addEventListener('resize', this._onResize);
    },

    unmount: function(){
      if(this._onResize){ window.removeEventListener('resize', this._onResize); this._onResize=null; }
      if(this.lane && this.lane.parentNode) this.lane.parentNode.removeChild(this.lane);
      this.lane=this.rocket=this.host=null;
      this.total=0; this.ignited=false; this.hadError=false; this.arrived=false; this._frac=0;
    },

    // المسافة القابلة للقطع (بين منصّة الإطلاق والقمر)
    _measure: function(){
      if(!this.lane) return;
      const h=this.lane.clientHeight||0;
      // هامش علويّ للقمر وسفليّ للأرض/المنصّة
      this.travel=Math.max(0, h - 210);
    },

    // ── الخطّاف الموحّد: يُنادى من qWin/qFail بعد ضبط صنف ‎.qfb‎ ──
    onAnswer: function(ok){
      if(!this.lane || !this.host) return;
      const solved=this.host.querySelectorAll('.qfb.good').length;
      const step = this.total ? (1/this.total) : 0;
      let frac = this.total ? (solved/this.total) : 0;

      if(ok){
        if(!this.ignited){ this.ignited=true; this.lane.classList.add('rj-lit'); }
        this._frac=frac;
        this._apply();
        // بلوغ القمر عند حلّ كل الأسئلة
        if(this.total && solved>=this.total && !this.arrived){ this._arrive(); }
      }else{
        this.hadError=true;
        // انزلاق هبوط لطيف بمقدار خطوة واحدة، ولا ينزل تحت المنصّة أبداً
        this._frac=Math.max(0, frac - step);
        this._apply();
        this._sputter();
      }
    },

    // ── تطبيق الارتفاع الحالي على الصاروخ ──
    _apply: function(){ this._place(this._frac||0, true); },

    _place: function(frac, smooth){
      if(!this.rocket) return;
      const y = -(frac * this.travel);
      this.rocket.style.setProperty('--rj-y', y+'px'); // تستخدمه حركة الوصول
      this.rocket.style.transition = smooth ? 'transform 1.1s cubic-bezier(.22,.61,.36,1)' : 'none';
      this.rocket.style.transform  = 'translateY('+y+'px)';
      // اللهب يشتعل ما دام الصاروخ مقلعاً فوق المنصّة
      this.lane.classList.toggle('rj-airborne', frac>0.001 && this.ignited);
    },

    // دخان متقطّع عند الخطأ (محرك يتعثّر)
    _sputter: function(){
      if(!this.lane) return;
      this.lane.classList.add('rj-sputter');
      clearTimeout(this._spT);
      this._spT=setTimeout(()=>{ this.lane && this.lane.classList.remove('rj-sputter'); }, 900);
    },

    // ── الوصول إلى القمر: حركة احتفالية + تمييز صوتيّ ──
    _arrive: function(){
      this.arrived=true;
      this.lane.classList.add('rj-arrived');
      const msg = this.hadError
        ? 'أحسنت! وصلت القمر بعد رحلة مليئة بالتحدّي!'
        : 'أحسنت! وصلت القمر في الوقت المناسب!';
      // نطق بعد صوت الإجابة الصحيحة بقليل كي لا يتداخلا (يخضع لزرّ الكتم عبر speak)
      clearTimeout(this._arrT);
      this._arrT=setTimeout(()=>{ try{ if(typeof speak==='function') speak(msg); }catch(e){} }, 750);
    }
  };

  window.RocketJourney = RocketJourney;
})();
