/* ═══════════════════════════════════════════════════════════════
   رحلة الصاروخ — نظام تقدّم بصريّ مشترك (بديل النجوم)
   - ملفّ مستقلّ قابل للإضافة لأي درس (LESSONS أدناه).
   - المعادلة: الارتفاع = (الإجابات الصحيحة ÷ عدد أسئلة الدرس) × المسافة الكلية.
   - يعتمد على عدّ ‎.qfb.good‎ في حاوية الأسئلة (نفس مصدر التقرير النهائي).
   - الصاروخ صورة جسم فقط (rocket-body.png)؛ اللهب والدخان حيّان بالكامل بالكود
     (لهب متذبذب + جسيمات دخان)، بتدرّج طاقة بين الصعود والتعثّر.
   - مسار منحنٍ (S)، نقاط محطّات ديناميكية، هبوط على القمر ورفع علم عُمان،
     ومؤثرات محرّك مولّدة بالكود (WebAudio) تخضع لزرّ الكتم.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const LESSONS = new Set(['g4s-1-1']);
  const IMG = 'images/rocket/';
  const WIN_RATIO = 0.528;   // موضع النافذة من أعلى صورة الجسم (بعد القصّ)

  /* ===== مؤثرات المحرّك (WebAudio، بلا ملفات، أخفّ من أصوات الصح/الخطأ) ===== */
  const SFX = {
    ctx:null,
    muted:function(){ try{ return (typeof muted!=='undefined') ? muted
      : (localStorage.getItem('shoogp-muted')==='1'); }catch(e){ return false; } },
    _c:function(){ if(!this.ctx){ try{ this.ctx=new (window.AudioContext||window.webkitAudioContext)(); }
        catch(e){ return null; } } if(this.ctx.state==='suspended'){ try{this.ctx.resume();}catch(e){} } return this.ctx; },
    _noise:function(c,dur){ const n=Math.max(1,(c.sampleRate*dur)|0); const b=c.createBuffer(1,n,c.sampleRate);
      const d=b.getChannelData(0); for(let i=0;i<n;i++) d[i]=Math.random()*2-1; const s=c.createBufferSource(); s.buffer=b; return s; },
    // اشتعال: هدير قصير مهيب (~1.3ث)
    ignite:function(){ if(this.muted())return; const c=this._c(); if(!c)return; const t=c.currentTime;
      const n=this._noise(c,1.4), lp=c.createBiquadFilter(), g=c.createGain();
      lp.type='lowpass'; lp.frequency.setValueAtTime(110,t); lp.frequency.exponentialRampToValueAtTime(420,t+.3); lp.frequency.exponentialRampToValueAtTime(85,t+1.3);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.26,t+.12); g.gain.exponentialRampToValueAtTime(.001,t+1.35);
      n.connect(lp); lp.connect(g); g.connect(c.destination); n.start(t); n.stop(t+1.4);
      const o=c.createOscillator(), og=c.createGain(); o.type='sine';
      o.frequency.setValueAtTime(68,t); o.frequency.exponentialRampToValueAtTime(40,t+1.2);
      og.gain.setValueAtTime(0,t); og.gain.linearRampToValueAtTime(.16,t+.1); og.gain.exponentialRampToValueAtTime(.001,t+1.3);
      o.connect(og); og.connect(c.destination); o.start(t); o.stop(t+1.3); },
    // اندفاع صعود: ووش خاطف (<1ث)
    whoosh:function(){ if(this.muted())return; const c=this._c(); if(!c)return; const t=c.currentTime;
      const n=this._noise(c,.5), bp=c.createBiquadFilter(), g=c.createGain();
      bp.type='bandpass'; bp.Q.value=.7; bp.frequency.setValueAtTime(320,t); bp.frequency.exponentialRampToValueAtTime(1700,t+.32);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.15,t+.05); g.gain.exponentialRampToValueAtTime(.001,t+.4);
      n.connect(bp); bp.connect(g); g.connect(c.destination); n.start(t); n.stop(t+.5); },
    // تعثّر: تقطيع خافت جداً بعد wrong.mp3 (لا يتصادم معه)
    sputter:function(){ if(this.muted())return; const c=this._c(); if(!c)return; const t0=c.currentTime+.42;
      for(let i=0;i<4;i++){ const t=t0+i*.1; const n=this._noise(c,.06), lp=c.createBiquadFilter(), g=c.createGain();
        lp.type='lowpass'; lp.frequency.value=520; g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.05,t+.008); g.gain.exponentialRampToValueAtTime(.001,t+.06);
        n.connect(lp); lp.connect(g); g.connect(c.destination); n.start(t); n.stop(t+.07); } },
    // هبوط ناعم قصير
    landing:function(){ if(this.muted())return; const c=this._c(); if(!c)return; const t=c.currentTime;
      const o=c.createOscillator(), g=c.createGain(); o.type='sine';
      o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(58,t+.28);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.19,t+.04); g.gain.exponentialRampToValueAtTime(.001,t+.4);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+.42);
      const n=this._noise(c,.22), lp=c.createBiquadFilter(), ng=c.createGain(); lp.type='lowpass'; lp.frequency.value=320;
      ng.gain.setValueAtTime(.11,t); ng.gain.exponentialRampToValueAtTime(.001,t+.24);
      n.connect(lp); lp.connect(ng); ng.connect(c.destination); n.start(t); n.stop(t+.24); }
  };

  const RocketJourney = {
    LESSONS: LESSONS,
    isEnabled: function(file){ return LESSONS.has(file); },

    lane:null, rocket:null, flag:null, curve:null, cloud:null, sat:null, host:null, dots:[],
    total:0, ignited:false, hadError:false, arrived:false, travel:0,
    _frame:null, _sputtering:false, amp:0,

    mount: function(host, total){
      this.unmount();
      this.host=host; this.total=total||0;
      this.ignited=false; this.hadError=false; this.arrived=false;
      this._frame='idle'; this._sputtering=false;

      const lane=document.createElement('div');
      lane.className='rocket-lane'; lane.setAttribute('aria-hidden','true');

      let dotsHTML='';
      for(let k=0;k<this.total;k++) dotsHTML+='<span class="rj-dot" data-k="'+k+'"></span>';

      lane.innerHTML=
        '<img class="rj-moon-img" src="'+IMG+'moon.png" alt="">'+
        '<svg class="rj-curve-svg"><path class="rj-curve"></path></svg>'+
        '<img class="rj-sat-img" src="'+IMG+'satellite.png" alt="">'+
        '<img class="rj-cloud-img" src="'+IMG+'cloud.png" alt="">'+
        '<div class="rj-dots">'+dotsHTML+'</div>'+
        '<img class="rj-flag-img" src="'+IMG+'flag.png" alt="">'+
        '<div class="rj-rocket"><div class="rj-rocket-inner">'+
          '<img class="rj-body-img" src="'+IMG+'rocket-body.png" alt="">'+
          '<div class="rj-flame"><i class="fo"></i><i class="fi"></i></div>'+
        '</div></div>'+
        '<img class="rj-earth-img" src="'+IMG+'earth-pad.png" alt="">';
      document.body.appendChild(lane);

      this.lane=lane;
      this.rocket=lane.querySelector('.rj-rocket');
      this.flag  =lane.querySelector('.rj-flag-img');
      this.curve =lane.querySelector('.rj-curve');
      this.cloud =lane.querySelector('.rj-cloud-img');
      this.sat   =lane.querySelector('.rj-sat-img');
      this.dots=[].slice.call(lane.querySelectorAll('.rj-dot'));

      const ready=()=>{ this._measure(); this._place(0,false); this._lightDots(0); };
      ready();
      const eimg=lane.querySelector('.rj-earth-img'), bimg=lane.querySelector('.rj-body-img');
      if(eimg && !eimg.complete) eimg.addEventListener('load', ready, {once:true});
      if(bimg && !bimg.complete) bimg.addEventListener('load', ready, {once:true});

      this._onResize=()=>{ this._measure(); this._apply(); };
      window.addEventListener('resize', this._onResize);
      this._emitT=setInterval(()=>this._emit(), 55);
    },

    unmount: function(){
      if(this._onResize){ window.removeEventListener('resize', this._onResize); this._onResize=null; }
      clearInterval(this._emitT); clearTimeout(this._spT); clearTimeout(this._arrT);
      if(this.lane && this.lane.parentNode) this.lane.parentNode.removeChild(this.lane);
      this.lane=this.rocket=this.flag=this.curve=this.cloud=this.sat=this.host=null; this.dots=[];
      this.total=0; this.ignited=false; this.hadError=false; this.arrived=false;
      this._frac=0; this._frame=null; this._sputtering=false;
    },

    // ── منحنى S: إزاحة أفقية بذروتين مغلّفتين، صفر عند الطرفين ──
    _dxAt: function(t){ return this.amp * Math.sin(2*Math.PI*t) * Math.sin(Math.PI*t); },
    _tiltAt: function(t){ const d=(this._dxAt(t+0.02)-this._dxAt(t-0.02))/0.04;
      return Math.max(-12, Math.min(12, d*0.10)); },

    _measure: function(){
      if(!this.lane || !this.rocket) return;
      const L=this.lane.getBoundingClientRect();
      this._laneH=L.height; this._cx=L.width/2; this.amp=Math.min(26, L.width*0.20);

      const pt=this.rocket.style.transform, ptr=this.rocket.style.transition;
      this.rocket.style.transition='none'; this.rocket.style.transform='translate(0,0)';
      const rr=this.rocket.getBoundingClientRect();
      const winRest = L.bottom - (rr.top + WIN_RATIO*rr.height); const rH=rr.height;
      this.rocket.style.transform=pt; this.rocket.style.transition=ptr;
      this._winRest=winRest;

      // المسافة: تهبط الفوّهة على أعلى قوس القمر عند الاكتمال
      const M=this.lane.querySelector('.rj-moon-img').getBoundingClientRect();
      const nozzleTarget = L.bottom - (M.top + M.height*0.30);
      const winF1 = nozzleTarget + (1-WIN_RATIO)*rH;   // النافذة أعلى الفوّهة (الفوّهة ≈ أسفل الصورة)
      this.travel=Math.max(0, winF1 - winRest);

      const N=this.total||1;
      this.dots.forEach((d,i)=>{ const t=(i+0.5)/N;
        d.style.left  =(this._cx + this._dxAt(t))+'px';
        d.style.bottom=(winRest + t*this.travel - 8)+'px'; });
      this._placeMarker(this.cloud, 0.30, 8);
      this._placeMarker(this.sat,   0.70, -6);
      // العلم: الساريّة خلف الصاروخ والقماش يمينه مرئي بالكامل
      if(this.flag){ this.flag.style.left=(this._cx + this._dxAt(1) + 20)+'px';
        this.flag.style.bottom=(winRest + this.travel - 20)+'px'; }
      this._drawCurve();
    },

    _placeMarker: function(el, t, ex){ if(!el) return;
      el.style.left=(this._cx + this._dxAt(t) + (ex||0))+'px';
      el.style.bottom=(this._winRest + t*this.travel - 4)+'px'; },

    _drawCurve: function(){ if(!this.curve) return; const H=this._laneH, steps=44;
      // يتوقّف المسار عند آخر محطّة (لا نقاط بعدها نحو القمر)
      const N=this.total||1, tEnd=(N-0.5)/N; let d='';
      for(let i=0;i<=steps;i++){ const t=tEnd*i/steps; const x=this._cx+this._dxAt(t); const y=H-(this._winRest+t*this.travel);
        d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' '; }
      this.curve.setAttribute('d', d); },

    _lightDots: function(n){ this.dots.forEach((d,i)=> d.classList.toggle('on', i<n)); },

    // حالة المحرّك: idle / flying / sputtering → أصناف تتحكّم باللهب الحيّ
    _setFrame: function(state){
      if(!this.rocket || this._frame===state) return; this._frame=state;
      this.rocket.classList.toggle('st-fly', state==='flying');
      this.rocket.classList.toggle('st-sput', state==='sputtering');
    },

    onAnswer: function(ok){
      if(!this.lane || !this.host) return;
      const solved=this.host.querySelectorAll('.qfb.good').length;
      const step = this.total ? (1/this.total) : 0;
      let frac = this.total ? (solved/this.total) : 0;
      this._lightDots(solved);

      if(ok){
        const first=!this.ignited;
        if(first){ this.ignited=true; this.lane.classList.add('rj-lit'); }
        this._frac=frac; this._apply();
        if(this.total && solved>=this.total && !this.arrived){ this._arrive(); }   // يشمل صوت الهبوط
        else if(first){ SFX.ignite(); }
        else { SFX.whoosh(); }
      }else{
        this.hadError=true;
        this._frac=Math.max(0, frac - step); this._apply();
        this._sputter(); SFX.sputter();
      }
    },

    _apply: function(){ this._place(this._frac||0, true); },

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
      this._sputtering=true; this._setFrame('sputtering'); this.lane.classList.add('rj-sputter');
      clearTimeout(this._spT);
      this._spT=setTimeout(()=>{ this._sputtering=false;
        if(this.lane) this.lane.classList.remove('rj-sputter');
        if(!this.arrived) this._setFrame(((this._frac||0)>0.001 && this.ignited) ? 'flying' : 'idle');
      }, 1000);
    },

    // ── دخان حيّ: فرق واضح — صعود أبيض غزير متدفّق، تعثّر رماديّ شحيح متقطّع ──
    _emit: function(){
      if(!this.lane || this.arrived) return;
      if(this._frame==='flying'){                 // غزير: 3–4 نفثات كلّ نبضة
        const n=3+(Math.random()<0.6?1:0);
        for(let i=0;i<n;i++) this._puff(false);
      } else if(this._frame==='sputtering'){       // شحيح ومتقطّع: نفثة واحدة أحياناً
        if(Math.random()<0.3) this._puff(true);
      }
    },
    _puff: function(gray){
      const L=this.lane.getBoundingClientRect(), rr=this.rocket.getBoundingClientRect();
      const x=(rr.left-L.left)+rr.width/2 + (Math.random()*(gray?8:14)-(gray?4:7));
      const y=(rr.top -L.top )+rr.height - 2;   // الفوّهة ≈ أسفل الصورة
      const p=document.createElement('i'); p.className='rj-particle'+(gray?' gray':'');
      const s=(gray?4:9)+Math.random()*(gray?4:12);   // الصعود جسيمات أكبر
      p.style.left=x+'px'; p.style.top=y+'px'; p.style.width=s+'px'; p.style.height=s+'px';
      p.style.setProperty('--dx',(Math.random()*(gray?16:26)-(gray?8:13))+'px');
      p.style.setProperty('--dx2',(Math.random()*12-6)+'px');   // تمايل جانبيّ (اهتزاز)
      p.style.setProperty('--dy',((gray?14:34)+Math.random()*(gray?14:34))+'px');
      p.addEventListener('animationend', ()=>{ if(p.parentNode) p.parentNode.removeChild(p); });
      this.lane.appendChild(p);
    },

    _arrive: function(){
      this.arrived=true; this._sputtering=false;
      this._setFrame('idle');                 // أُطفئ المحرّك
      this.lane.classList.remove('rj-airborne');
      this.lane.classList.add('rj-arrived');
      SFX.landing();
      const msg = this.hadError
        ? 'أحسنت! وصلت القمر بعد رحلة مليئة بالتحدّي!'
        : 'أحسنت! وصلت القمر في الوقت المناسب!';
      clearTimeout(this._arrT);
      this._arrT=setTimeout(()=>{ try{ if(typeof speak==='function') speak(msg); }catch(e){} }, 900);
    }
  };

  window.RocketJourney = RocketJourney;
})();
