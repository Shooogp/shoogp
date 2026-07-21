/* ═══════════════════════════════════════════════════════════════
   رحلة الصاروخ — نظام تقدّم بصريّ مشترك (بديل النجوم)
   - ملفّ مستقلّ قابل للإضافة لأي درس (لا كود داخل درس بعينه).
   - التفعيل محصور بمفاتيح الدروس في LESSONS أدناه.
   - المعادلة: الارتفاع = (الإجابات الصحيحة ÷ عدد أسئلة الدرس) × المسافة الكلية.
   - يعتمد على عدّ عناصر ‎.qfb.good‎ في حاوية الأسئلة (نفس مصدر التقرير النهائي).
   - العناصر صور جاهزة (images/rocket/*.png): الصاروخ يتبدّل بالحالة، المعالم ثابتة،
     وعلم عُمان بديل الاحتفال عند الوصول. المسار المتقطّع ونقاط المحطّات مرسومة بالكود.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  // الدروس المفعَّل فيها نظام الصاروخ (الإضافة لدرس آخر = سطر واحد هنا)
  const LESSONS = new Set(['g4s-1-1']);

  const IMG = 'images/rocket/';
  const FRAMES = { idle:IMG+'rocket-idle.png', flying:IMG+'rocket-flying.png', sputtering:IMG+'rocket-sputtering.png' };
  // نسبة موضع نافذة الصاروخ من أعلى صورة الإطار (بعد القصّ الموحّد المحاذى على النافذة)
  const ROCKET_WIN_RATIO = 0.2857;

  const RocketJourney = {
    LESSONS: LESSONS,
    isEnabled: function(file){ return LESSONS.has(file); },

    // حالة الرحلة الحالية
    lane:null, rocket:null, flag:null, host:null, dots:[],
    total:0, ignited:false, hadError:false, arrived:false, travel:0,
    _frame:null, _sputtering:false,

    // ── تركيب المسار في شاشة النشاط ──
    mount: function(host, total){
      this.unmount();
      this.host=host; this.total=total||0;
      this.ignited=false; this.hadError=false; this.arrived=false;
      this._frame=null; this._sputtering=false;

      const lane=document.createElement('div');
      lane.className='rocket-lane';
      lane.setAttribute('aria-hidden','true'); // مؤشّر بصريّ فقط

      // نقاط المحطّات: عددها = عدد أسئلة الدرس (تُضيء كلّما تجاوزها الصاروخ)
      let dotsHTML='';
      for(let k=0;k<this.total;k++) dotsHTML+='<span class="rj-dot" data-k="'+k+'"></span>';

      lane.innerHTML=
        '<img class="rj-moon-img" src="'+IMG+'moon.png" alt="">'+
        '<img class="rj-sat-img" src="'+IMG+'satellite.png" alt="">'+
        '<div class="rj-track"></div>'+
        '<div class="rj-dots">'+dotsHTML+'</div>'+
        '<img class="rj-cloud-img" src="'+IMG+'cloud.png" alt="">'+
        '<img class="rj-flag-img" src="'+IMG+'flag.png" alt="">'+
        '<img class="rj-rocket" src="'+FRAMES.idle+'" alt="">'+
        '<img class="rj-earth-img" src="'+IMG+'earth-pad.png" alt="">';
      document.body.appendChild(lane);

      this.lane=lane;
      this.rocket=lane.querySelector('.rj-rocket');
      this.flag=lane.querySelector('.rj-flag-img');
      this.dots=[].slice.call(lane.querySelectorAll('.rj-dot'));
      this._frame='idle';

      // قِس بعد اكتمال تخطيط الصور (قد لا تكون أبعادها جاهزة فوراً)
      const ready=()=>{ this._measure(); this._place(0,false); this._lightDots(0); };
      ready();
      const eimg=lane.querySelector('.rj-earth-img');
      if(eimg && !eimg.complete) eimg.addEventListener('load', ready, {once:true});

      this._onResize=()=>{ this._measure(); this._apply(); };
      window.addEventListener('resize', this._onResize);
    },

    unmount: function(){
      if(this._onResize){ window.removeEventListener('resize', this._onResize); this._onResize=null; }
      clearTimeout(this._spT); clearTimeout(this._arrT);
      if(this.lane && this.lane.parentNode) this.lane.parentNode.removeChild(this.lane);
      this.lane=this.rocket=this.flag=this.host=null; this.dots=[];
      this.total=0; this.ignited=false; this.hadError=false; this.arrived=false;
      this._frac=0; this._frame=null; this._sputtering=false;
    },

    // المسافة القابلة للقطع + توزيع نقاط المحطّات + موضع العلم
    _measure: function(){
      if(!this.lane || !this.rocket) return;
      const laneRect=this.lane.getBoundingClientRect();
      // هامش سفليّ للأرض/المنصّة وعلويّ للقمر (يقف الصاروخ على سطح القمر عند الاكتمال)
      this.travel=Math.max(0, laneRect.height - 194);
      // موضع نافذة الصاروخ عند القاع (translate 0) بإحداثي bottom داخل المسار
      const prevT=this.rocket.style.transform, prevTr=this.rocket.style.transition;
      this.rocket.style.transition='none'; this.rocket.style.transform='translateY(0)';
      const rr=this.rocket.getBoundingClientRect();
      const winRestBottom = laneRect.bottom - (rr.top + ROCKET_WIN_RATIO*rr.height);
      this.rocket.style.transform=prevT; this.rocket.style.transition=prevTr;
      this._winRestBottom = winRestBottom;
      // النقطة k عند نسبة (k+0.5)/total كي تبقى المُضاءة أسفل الصاروخ وكلها تحت القمر
      const N=this.total||1;
      this.dots.forEach((d,i)=>{
        const f=(i+0.5)/N;
        d.style.bottom=(winRestBottom + f*this.travel - 8)+'px';
      });
      // العلم يقف قرب سطح القمر (موضع النافذة عند الاكتمال)، خلف الصاروخ ومزاحاً قليلاً
      if(this.flag) this.flag.style.bottom=(winRestBottom + this.travel - 26)+'px';
    },

    // إضاءة أول n نقطة (n = عدد الإجابات الصحيحة)
    _lightDots: function(n){ this.dots.forEach((d,i)=> d.classList.toggle('on', i<n)); },

    // تبديل إطار صورة الصاروخ حسب الحالة
    _setFrame: function(state){
      if(!this.rocket || this._frame===state) return;
      this._frame=state; this.rocket.src=FRAMES[state];
    },

    // ── الخطّاف الموحّد: يُنادى من qWin/qFail بعد ضبط صنف ‎.qfb‎ ──
    onAnswer: function(ok){
      if(!this.lane || !this.host) return;
      const solved=this.host.querySelectorAll('.qfb.good').length;
      const step = this.total ? (1/this.total) : 0;
      let frac = this.total ? (solved/this.total) : 0;

      // إضاءة نقاط المحطّات بحسب عدد الإجابات الصحيحة
      this._lightDots(solved);

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
      this.rocket.style.setProperty('--rj-y', y+'px');
      this.rocket.style.transition = smooth ? 'transform 1.1s cubic-bezier(.22,.61,.36,1)' : 'none';
      this.rocket.style.transform  = 'translateY('+y+'px)';
      const airborne = frac>0.001 && this.ignited;
      this.lane.classList.toggle('rj-airborne', airborne);
      // الإطار: مقلع = flying، على المنصّة = idle (ما لم يكن يتعثّر أو وصل)
      if(!this.arrived && !this._sputtering) this._setFrame(airborne ? 'flying' : 'idle');
    },

    // تعثّر المحرك عند الخطأ: إطار الدخان المتقطّع لحظةً ثم العودة
    _sputter: function(){
      if(!this.lane) return;
      this._sputtering=true; this._setFrame('sputtering');
      this.lane.classList.add('rj-sputter');
      clearTimeout(this._spT);
      this._spT=setTimeout(()=>{
        this._sputtering=false;
        if(this.lane) this.lane.classList.remove('rj-sputter');
        if(!this.arrived) this._setFrame(((this._frac||0)>0.001 && this.ignited) ? 'flying' : 'idle');
      }, 900);
    },

    // ── الوصول إلى القمر: هبوط + رفع علم عُمان + تمييز صوتيّ ──
    _arrive: function(){
      this.arrived=true; this._sputtering=false;
      this._setFrame('idle');                 // هبط على السطح، أُطفئ المحرك
      this.lane.classList.add('rj-arrived');  // يُطلق حركة رفع العلم
      const msg = this.hadError
        ? 'أحسنت! وصلت القمر بعد رحلة مليئة بالتحدّي!'
        : 'أحسنت! وصلت القمر في الوقت المناسب!';
      clearTimeout(this._arrT);
      this._arrT=setTimeout(()=>{ try{ if(typeof speak==='function') speak(msg); }catch(e){} }, 750);
    }
  };

  window.RocketJourney = RocketJourney;
})();
