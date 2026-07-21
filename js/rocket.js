/* ═══════════════════════════════════════════════════════════════
   رحلة الصاروخ — نظام تقدّم بصريّ مشترك (بديل النجوم)
   - ملفّ مستقلّ قابل للإضافة لأي درس (LESSONS أدناه).
   - المعادلة: الارتفاع = (الإجابات الصحيحة ÷ عدد أسئلة الدرس) × المسافة الكلية.
   - يعتمد على عدّ ‎.qfb.good‎ في حاوية الأسئلة (نفس مصدر التقرير النهائي).
   - الصاروخ والمعالم صور (images/rocket/*.png). المسار منحنٍ (S) مرسوم بالكود،
     نقاط المحطّات ديناميكية على المنحنى، ودخان حيّ (جسيمات CSS) من الفوّهة،
     وعند الوصول يهبط الصاروخ على سطح القمر وينبثق علم عُمان.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const LESSONS = new Set(['g4s-1-1']);

  const IMG = 'images/rocket/';
  const FRAMES = { idle:IMG+'rocket-idle.png', flying:IMG+'rocket-flying.png', sputtering:IMG+'rocket-sputtering.png' };
  // نِسَب داخل إطار الصاروخ (بعد القصّ الموحّد المحاذى على النافذة)
  const WIN_RATIO   = 0.40;  // موضع النافذة من أعلى الإطار
  const NOZZLE_RATIO= 0.73;  // موضع الفوّهة من أعلى الإطار (لحساب الهبوط)
  const EMIT_RATIO  = 0.82;  // نقطة انبعاث الدخان من أعلى الإطار (منطقة اللهب)

  const RocketJourney = {
    LESSONS: LESSONS,
    isEnabled: function(file){ return LESSONS.has(file); },

    lane:null, rocket:null, flag:null, curve:null, cloud:null, sat:null, host:null, dots:[],
    total:0, ignited:false, hadError:false, arrived:false, travel:0,
    _frame:null, _sputtering:false, amp:0,

    // ── تركيب المسار ──
    mount: function(host, total){
      this.unmount();
      this.host=host; this.total=total||0;
      this.ignited=false; this.hadError=false; this.arrived=false;
      this._frame=null; this._sputtering=false;

      const lane=document.createElement('div');
      lane.className='rocket-lane';
      lane.setAttribute('aria-hidden','true');

      let dotsHTML='';
      for(let k=0;k<this.total;k++) dotsHTML+='<span class="rj-dot" data-k="'+k+'"></span>';

      lane.innerHTML=
        '<img class="rj-moon-img" src="'+IMG+'moon.png" alt="">'+
        '<svg class="rj-curve-svg"><path class="rj-curve"></path></svg>'+
        '<img class="rj-sat-img" src="'+IMG+'satellite.png" alt="">'+
        '<img class="rj-cloud-img" src="'+IMG+'cloud.png" alt="">'+
        '<div class="rj-dots">'+dotsHTML+'</div>'+
        '<img class="rj-flag-img" src="'+IMG+'flag.png" alt="">'+
        '<img class="rj-rocket" src="'+FRAMES.idle+'" alt="">'+
        '<img class="rj-earth-img" src="'+IMG+'earth-pad.png" alt="">';
      document.body.appendChild(lane);

      this.lane=lane;
      this.rocket=lane.querySelector('.rj-rocket');
      this.flag  =lane.querySelector('.rj-flag-img');
      this.curve =lane.querySelector('.rj-curve');
      this.cloud =lane.querySelector('.rj-cloud-img');
      this.sat   =lane.querySelector('.rj-sat-img');
      this.dots=[].slice.call(lane.querySelectorAll('.rj-dot'));
      this._frame='idle';

      const ready=()=>{ this._measure(); this._place(0,false); this._lightDots(0); };
      ready();
      const eimg=lane.querySelector('.rj-earth-img');
      if(eimg && !eimg.complete) eimg.addEventListener('load', ready, {once:true});
      const rimg=this.rocket;
      if(rimg && !rimg.complete) rimg.addEventListener('load', ready, {once:true});

      this._onResize=()=>{ this._measure(); this._apply(); };
      window.addEventListener('resize', this._onResize);

      // حلقة انبعاث الدخان الحيّ (خفيفة: كل 60ms)
      this._emitT=setInterval(()=>this._emit(), 60);
    },

    unmount: function(){
      if(this._onResize){ window.removeEventListener('resize', this._onResize); this._onResize=null; }
      clearInterval(this._emitT); clearTimeout(this._spT); clearTimeout(this._arrT);
      if(this.lane && this.lane.parentNode) this.lane.parentNode.removeChild(this.lane);
      this.lane=this.rocket=this.flag=this.curve=this.cloud=this.sat=this.host=null; this.dots=[];
      this.total=0; this.ignited=false; this.hadError=false; this.arrived=false;
      this._frac=0; this._frame=null; this._sputtering=false;
    },

    // ── هندسة المنحنى (S لطيف): إزاحة أفقية بذروتين مغلّفتين، صفر عند الطرفين ──
    _dxAt: function(t){ return this.amp * Math.sin(2*Math.PI*t) * Math.sin(Math.PI*t); },
    // ميلان الصاروخ حسب اتجاه المماس (بسيط، مقيَّد)
    _tiltAt: function(t){
      const d=(this._dxAt(t+0.02)-this._dxAt(t-0.02))/0.04; // dx/dt تقريبيّ
      let deg=d*0.10; return Math.max(-12, Math.min(12, deg));
    },

    _measure: function(){
      if(!this.lane || !this.rocket) return;
      const L=this.lane.getBoundingClientRect();
      this._laneH=L.height; this._cx=L.width/2;
      this.amp=Math.min(26, L.width*0.20); // سعة الانحناء الأفقي

      // موضع النافذة عند القاع (translate 0)
      const pt=this.rocket.style.transform, ptr=this.rocket.style.transition;
      this.rocket.style.transition='none'; this.rocket.style.transform='translate(0,0)';
      const rr=this.rocket.getBoundingClientRect();
      const winRest = L.bottom - (rr.top + WIN_RATIO*rr.height);
      const rH=rr.height;
      this.rocket.style.transform=pt; this.rocket.style.transition=ptr;
      this._winRest=winRest;

      // المسافة: يهبط الصاروخ بفوّهته على أعلى قوس القمر عند الاكتمال
      const M=this.lane.querySelector('.rj-moon-img').getBoundingClientRect();
      const nozzleTarget = L.bottom - (M.top + M.height*0.30);       // فوّهة عند أعلى القمر
      const winF1 = nozzleTarget + (NOZZLE_RATIO-WIN_RATIO)*rH;      // النافذة أعلى الفوّهة
      this.travel=Math.max(0, winF1 - winRest);

      // نقاط المحطّات على المنحنى: t=(i+0.5)/N
      const N=this.total||1;
      this.dots.forEach((d,i)=>{ const t=(i+0.5)/N;
        d.style.left  =(this._cx + this._dxAt(t))+'px';
        d.style.bottom=(winRest + t*this.travel - 8)+'px';
      });
      // المعالم عند انحناءات المنحنى (السحابة أسفل يمين، القمر الصناعي أعلى يسار)
      this._placeMarker(this.cloud, 0.30, 8);
      this._placeMarker(this.sat,   0.70, -6);
      // العلم قرب سطح القمر خلف الصاروخ
      if(this.flag){ this.flag.style.left=(this._cx + this._dxAt(1) + 2)+'px';
        this.flag.style.bottom=(winRest + this.travel - 18)+'px'; }
      // رسم المنحنى المتقطّع
      this._drawCurve();
    },

    _placeMarker: function(el, t, extraX){
      if(!el) return;
      el.style.left  =(this._cx + this._dxAt(t) + (extraX||0))+'px';
      el.style.bottom=(this._winRest + t*this.travel - 4)+'px';
    },

    _drawCurve: function(){
      if(!this.curve) return;
      const H=this._laneH, steps=44; let d='';
      for(let i=0;i<=steps;i++){ const t=i/steps;
        const x=this._cx + this._dxAt(t);
        const y=H - (this._winRest + t*this.travel);
        d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' ';
      }
      this.curve.setAttribute('d', d);
    },

    _lightDots: function(n){ this.dots.forEach((d,i)=> d.classList.toggle('on', i<n)); },

    _setFrame: function(state){
      if(!this.rocket || this._frame===state) return;
      this._frame=state; this.rocket.src=FRAMES[state];
    },

    // ── الخطّاف الموحّد ──
    onAnswer: function(ok){
      if(!this.lane || !this.host) return;
      const solved=this.host.querySelectorAll('.qfb.good').length;
      const step = this.total ? (1/this.total) : 0;
      let frac = this.total ? (solved/this.total) : 0;
      this._lightDots(solved);

      if(ok){
        if(!this.ignited){ this.ignited=true; this.lane.classList.add('rj-lit'); }
        this._frac=frac; this._apply();
        if(this.total && solved>=this.total && !this.arrived){ this._arrive(); }
      }else{
        this.hadError=true;
        this._frac=Math.max(0, frac - step); this._apply();
        this._sputter();
      }
    },

    _apply: function(){ this._place(this._frac||0, true); },

    // موضع الصاروخ على المنحنى: إزاحة (x,y) + ميلان + تبديل الإطار
    _place: function(frac, smooth){
      if(!this.rocket) return;
      const y=(-(frac*this.travel)).toFixed(2), x=(this._dxAt(frac)).toFixed(2), rot=(this._tiltAt(frac)).toFixed(2);
      this.rocket.style.setProperty('--rj-y', y+'px');
      this.rocket.style.setProperty('--rj-x', x+'px');
      this.rocket.style.setProperty('--rj-rot', rot+'deg');
      this.rocket.style.transition = smooth ? 'transform 1.1s cubic-bezier(.22,.61,.36,1)' : 'none';
      this.rocket.style.transform  = 'translate('+x+'px,'+y+'px) rotate('+rot+'deg)';
      const airborne = frac>0.001 && this.ignited;
      this.lane.classList.toggle('rj-airborne', airborne);
      if(!this.arrived && !this._sputtering) this._setFrame(airborne ? 'flying' : 'idle');
    },

    _sputter: function(){
      if(!this.lane) return;
      this._sputtering=true; this._setFrame('sputtering');
      this.lane.classList.add('rj-sputter');
      clearTimeout(this._spT);
      this._spT=setTimeout(()=>{
        this._sputtering=false;
        if(this.lane) this.lane.classList.remove('rj-sputter');
        if(!this.arrived) this._setFrame(((this._frac||0)>0.001 && this.ignited) ? 'flying' : 'idle');
      }, 1000);
    },

    // ── دخان حيّ: جسيمات من الفوّهة (كثيفة أثناء الطيران، شحيحة رمادية أثناء التعثّر) ──
    _emit: function(){
      if(!this.lane || this.arrived) return;
      if(this._frame==='flying'){ this._puff(false); if(Math.random()<0.6) this._puff(false); }
      else if(this._frame==='sputtering'){ if(Math.random()<0.5) this._puff(true); }
    },
    _puff: function(gray){
      const L=this.lane.getBoundingClientRect();
      const rr=this.rocket.getBoundingClientRect();
      const x=(rr.left-L.left)+rr.width/2 + (Math.random()*8-4);
      const y=(rr.top -L.top )+EMIT_RATIO*rr.height;
      const p=document.createElement('i'); p.className='rj-particle'+(gray?' gray':'');
      const s=(gray?5:7)+Math.random()*7;
      p.style.left=x+'px'; p.style.top=y+'px'; p.style.width=s+'px'; p.style.height=s+'px';
      p.style.setProperty('--dx',(Math.random()*18-9)+'px');
      p.style.setProperty('--dy',(22+Math.random()*30)+'px');
      p.addEventListener('animationend', ()=>{ if(p.parentNode) p.parentNode.removeChild(p); });
      this.lane.appendChild(p);
    },

    // ── الوصول: هبوط على القمر + رفع علم عُمان + تمييز صوتيّ ──
    _arrive: function(){
      this.arrived=true; this._sputtering=false;
      this._setFrame('idle');
      this.lane.classList.add('rj-arrived');
      const msg = this.hadError
        ? 'أحسنت! وصلت القمر بعد رحلة مليئة بالتحدّي!'
        : 'أحسنت! وصلت القمر في الوقت المناسب!';
      clearTimeout(this._arrT);
      this._arrT=setTimeout(()=>{ try{ if(typeof speak==='function') speak(msg); }catch(e){} }, 750);
    }
  };

  window.RocketJourney = RocketJourney;
})();
