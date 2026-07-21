/* ═══════════════════════════════════════════════════════════════
   رحلة الصاروخ — نظام تقدّم بصريّ مشترك (بديل النجوم)
   - مفعَّل افتراضياً في كل دروس المنصّة (أي درس له أسئلة مؤلَّفة) بكل المواد والصفوف.
   - المعادلة: الارتفاع = (الإجابات الصحيحة ÷ عدد أسئلة الدرس) × المسافة الكلية.
   - يعتمد على عدّ ‎.qfb.good‎ في حاوية الأسئلة (نفس مصدر التقرير النهائي).
   - الصاروخ صورة جسم فقط (rocket-body.png)؛ اللهب والدخان حيّان بالكامل بالكود
     (لهب متذبذب + جسيمات دخان)، بتدرّج طاقة بين الصعود والتعثّر.
   - مسار منحنٍ (S)، نقاط محطّات ديناميكية، هبوط على القمر ورفع علم عُمان،
     ومؤثرات محرّك مولّدة بالكود (WebAudio) تخضع لزرّ الكتم.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const IMG = 'images/rocket/';
  const WIN_RATIO = 0.528;   // موضع النافذة من أعلى صورة الجسم (بعد القصّ)

  /* ===== مؤثرات المحرّك (WebAudio، بلا ملفات، أخفّ من أصوات الصح/الخطأ) ===== */
  const SFX = {
    ctx:null,
    muted:function(){ try{ return (typeof muted!=='undefined') ? muted
      : (localStorage.getItem('shoogp-muted')==='1'); }catch(e){ return false; } },
    _c:function(){ if(!this.ctx){ try{ this.ctx=new (window.AudioContext||window.webkitAudioContext)(); }
        catch(e){ return null; } }
      // استئناف السياقات الحيّة فقط (السياق غير المتّصل offline لا يُستأنف)
      if(this.ctx.state==='suspended' && typeof this.ctx.startRendering!=='function'){ try{this.ctx.resume();}catch(e){} }
      return this.ctx; },
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
    // هبوط: لحظة ختامية مسموعة بوضوح (لا تطغى على «أحسنت» التي تليها بعد ~0.9ث)
    landing:function(){ if(this.muted())return; const c=this._c(); if(!c)return; const t=c.currentTime;
      const o=c.createOscillator(), g=c.createGain(); o.type='sine';
      o.frequency.setValueAtTime(180,t); o.frequency.exponentialRampToValueAtTime(60,t+.32);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.42,t+.03); g.gain.exponentialRampToValueAtTime(.001,t+.5);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+.52);
      const o2=c.createOscillator(), g2=c.createGain(); o2.type='sine'; // نغمة ناعمة ختامية
      o2.frequency.setValueAtTime(320,t); o2.frequency.exponentialRampToValueAtTime(220,t+.4);
      g2.gain.setValueAtTime(0,t); g2.gain.linearRampToValueAtTime(.16,t+.05); g2.gain.exponentialRampToValueAtTime(.001,t+.5);
      o2.connect(g2); g2.connect(c.destination); o2.start(t); o2.stop(t+.52);
      const n=this._noise(c,.28), lp=c.createBiquadFilter(), ng=c.createGain(); lp.type='lowpass'; lp.frequency.value=340;
      ng.gain.setValueAtTime(.22,t); ng.gain.exponentialRampToValueAtTime(.001,t+.3);
      n.connect(lp); lp.connect(ng); ng.connect(c.destination); n.start(t); n.stop(t+.3); },

    /* ── هدير محرّك واقعيّ مستمرّ: ضجيج عريض مفلتر (لا نغمات) بمركز طاقة أعلى قليلاً
       (يُسمع على سماعات السبورة)، باتساع غير منتظم (هدير خشن حيّ) + طقطقة عشوائية.
       أرضية خفيفة تعلو مع الصعود وتخفت في التحويم، وتخضع لزرّ الكتم حيّاً. */
    engine:{on:false, nodes:[], gain:null, amp:null, base:0, timer:null, swT:null, chokeT:null, choking:false, landing:false, landT:null},
    engineStart:function(){ const c=this._c(); if(!c || this.engine.on) return; this.engine.on=true;
      const g=c.createGain(); g.gain.value=0; g.connect(c.destination);
      const amp=c.createGain(); amp.gain.value=1; amp.connect(g);           // اتساع غير منتظم (خشونة)
      const n=this._noise(c,3); n.loop=true;                                // ضجيج عريض متكرّر
      const lp=c.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=360; lp.Q.value=0.6;
      const bp=c.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=180; bp.Q.value=0.9; // مركز الطاقة ~180Hz
      const bpg=c.createGain(); bpg.gain.value=2.2;                         // تعويض خسارة bandpass
      n.connect(lp); lp.connect(bp); bp.connect(bpg); bpg.connect(amp);
      try{ n.start(); }catch(e){}
      this.engine.nodes=[n]; this.engine.gain=g; this.engine.amp=amp;
      this.engine.base=0.075; this.engine.choking=false; this.engine.landing=false;
      // تحكّم حيّ: خشونة اتساع + طقطقة عشوائية + كتم + مستوى القاعدة
      this.engine.timer=setInterval(()=>{ const c2=this.ctx; if(!c2||!this.engine.gain) return; const t=c2.currentTime;
        // اتساع غير منتظم (هدير خشن): هدف عشوائيّ سريع
        const rough=0.55+Math.random()*0.75; try{ this.engine.amp.gain.setTargetAtTime(rough, t, 0.05); }catch(e){}
        // طقطقة/فرقعة خفيفة عشوائية
        if(!this.muted() && Math.random()<0.16){ try{
          const cn=this._noise(c2,.05), chp=c2.createBiquadFilter(), cg=c2.createGain();
          chp.type='bandpass'; chp.frequency.value=900+Math.random()*700; chp.Q.value=1.2;
          cg.gain.setValueAtTime(0.0001,t); cg.gain.linearRampToValueAtTime(0.02+Math.random()*0.03,t+.008); cg.gain.exponentialRampToValueAtTime(0.0008,t+.05);
          cn.connect(chp); chp.connect(cg); cg.connect(c2.destination); cn.start(t); cn.stop(t+.06);
        }catch(e){} }
        // مستوى القاعدة (لا يُلمس أثناء الاختناق/الهبوط إلا للكتم)
        if(this.muted()){ try{ this.engine.gain.gain.setTargetAtTime(0, t, 0.12); }catch(e){} }
        else if(!this.engine.choking && !this.engine.landing){ try{ this.engine.gain.gain.setTargetAtTime(this.engine.base, t, 0.25); }catch(e){} }
      }, 90);
      try{ g.gain.setTargetAtTime(this.muted()?0:0.075, c.currentTime, 0.4); }catch(e){} },
    engineSwell:function(){ if(!this.engine.on || this.engine.landing) return; this.engine.base=0.12;   // يعلو مع الووش
      clearTimeout(this.engine.swT); this.engine.swT=setTimeout(()=>{ this.engine.base=0.062; }, 520); }, // ثم يخفت للتحويم
    // خفوت متزامن مع مشهد الهبوط: يصل الصمت لحظة الملامسة (بلا قطع مفاجئ)
    engineLand:function(dur){ if(!this.engine.on) return; this.engine.choking=false; this.engine.landing=true;
      clearTimeout(this.engine.swT);
      const c=this.ctx, g=this.engine.gain;
      if(c && g){ const t=c.currentTime; try{ g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(Math.max(0.0001, this.muted()?0:this.engine.base), t);
        g.gain.linearRampToValueAtTime(0, t+dur); }catch(e){} }
      clearTimeout(this.engine.landT); this.engine.landT=setTimeout(()=>{ this.engineStop(); }, dur*1000+90); },
    // اختناق المحرّك عند الخطأ: هبوط سريع + تقطّعات (فقدان وقود) ثم استعادة تدريجية
    engineChoke:function(){ if(this.muted())return; const c=this._c(); if(!c) return; const t=c.currentTime;
      // صوت اختناق قصير (التنبيه الوحيد للخطأ): ضجيج هابط بتقطّعات
      const n=this._noise(c,.85), lp=c.createBiquadFilter(), g=c.createGain(); lp.type='lowpass';
      lp.frequency.setValueAtTime(340,t); lp.frequency.exponentialRampToValueAtTime(120,t+.7);
      n.connect(lp); lp.connect(g); g.connect(c.destination);
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.34,t+.03);
      [0.07,0.16,0.27,0.4,0.55].forEach((dt,i)=>{ const a=0.32*(1-i*0.17);
        g.gain.setValueAtTime(0.02,t+dt); g.gain.linearRampToValueAtTime(Math.max(0.03,a),t+dt+0.02); });
      g.gain.exponentialRampToValueAtTime(0.001,t+.8); n.start(t); n.stop(t+.85);
      // اخنق الهدير المستمرّ إن كان يعمل، ثم استعده تدريجياً
      if(this.engine.on && this.engine.gain){ const eg=this.engine.gain, b=this.engine.base;
        this.engine.choking=true; try{ eg.gain.cancelScheduledValues(t);
          eg.gain.setTargetAtTime(b*0.1,t,0.04);
          [0.12,0.26,0.42].forEach(dt=>{ eg.gain.setValueAtTime(b*0.04,t+dt); eg.gain.setTargetAtTime(b*0.3,t+dt+0.02,0.03); });
          eg.gain.setTargetAtTime(b,t+0.72,0.5);
        }catch(e){}
        clearTimeout(this.engine.chokeT); this.engine.chokeT=setTimeout(()=>{ this.engine.choking=false; }, 1300); } },
    engineStop:function(){ if(!this.engine.on) return; this.engine.on=false; this.engine.choking=false; this.engine.landing=false;
      clearInterval(this.engine.timer); clearTimeout(this.engine.swT); clearTimeout(this.engine.chokeT); clearTimeout(this.engine.landT);
      const c=this.ctx, g=this.engine.gain, nodes=this.engine.nodes.slice();
      if(c && g){ const t=c.currentTime; try{ g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(0,t,0.18); }catch(e){} }
      setTimeout(()=>{ nodes.forEach(s=>{ try{s.stop();}catch(e){} }); if(g){ try{g.disconnect();}catch(e){} } }, 650);
      this.engine.nodes=[]; this.engine.gain=null; this.engine.amp=null; }
  };

  const RocketJourney = {
    // مفعَّل افتراضياً لكل الدروس (المعادلة تتكيّف تلقائياً مع عدد أسئلة كل درس)
    isEnabled: function(file){ return true; },
    isActive: function(){ return !!(this.lane && this.host); },   // مركَّب حالياً في درسٍ ما

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

      // ── مرجعية ثابتة للمسار (إصلاح): المسار حاوية مستقلّة بارتفاع محدَّد بالبكسل،
      //    مُثبَّتة من الأعلى فقط (top ثابت + height ثابت، بلا bottom). يُحسب الارتفاع
      //    مرّة واحدة عند التركيب، فلا يتزحزح القمر/المنصّة/المسافة الكلية إطلاقاً مع
      //    تغيّر ارتفاع الأسئلة، أو ظهور/اختفاء أشرطة التمرير، أو أي إعادة تخطيط لاحقة.
      //    (قبل الإصلاح كان الأسفل مربوطاً بحافّة النافذة فيتحرّك طرفا المسار على نحوٍ
      //     متعاكس عند أي تغيّر في ارتفاع النافذة، فيخطئ الصاروخ القمر.)
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      this._laneHpx = Math.max(360, Math.round(vh) - 114);   // نفس هامش التصميم: أعلى ٩٢ + أسفل ٢٢
      lane.style.height = this._laneHpx + 'px';
      lane.style.bottom = 'auto';

      this.lane=lane;
      this.rocket=lane.querySelector('.rj-rocket');
      this.flag  =lane.querySelector('.rj-flag-img');
      this.curve =lane.querySelector('.rj-curve');
      this.cloud =lane.querySelector('.rj-cloud-img');
      this.sat   =lane.querySelector('.rj-sat-img');
      this.dots=[].slice.call(lane.querySelectorAll('.rj-dot'));

      const ready=()=>{ this._measure(); this._place(this._frac||0,false); this._lightDots(this._solvedCount()); };
      ready();
      // إعادة القياس مرّة واحدة عند اكتمال تحميل كلّ صور المسار (القمر أيضاً — كان مفقوداً)
      // كي تُحسب المسافة على أبعاد القمر الحقيقية لا على صورة غير محمّلة.
      const eimg=lane.querySelector('.rj-earth-img'), bimg=lane.querySelector('.rj-body-img'),
            mimg=lane.querySelector('.rj-moon-img');
      if(eimg && !eimg.complete) eimg.addEventListener('load', ready, {once:true});
      if(bimg && !bimg.complete) bimg.addEventListener('load', ready, {once:true});
      if(mimg && !mimg.complete) mimg.addEventListener('load', ready, {once:true});

      // الحاوية مثبَّتة بارتفاع بكسليّ ثابت، فقياسها لا يتغيّر مع النافذة؛ نكتفي بإعادة
      // وضع الصاروخ على مرحلته الحالية دون إعادة حساب المسار (مرجعية ثابتة تماماً).
      this._onResize=()=>{ this._apply(); };
      window.addEventListener('resize', this._onResize);
      this._emitT=setInterval(()=>this._emit(), 55);
    },

    unmount: function(){
      try{ SFX.engineStop(); }catch(e){}   // أوقف همهمة المحرّك عند مغادرة الدرس
      if(this._onResize){ window.removeEventListener('resize', this._onResize); this._onResize=null; }
      clearInterval(this._emitT); clearTimeout(this._spT); clearTimeout(this._arrT); clearTimeout(this._arrT2);
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

    // عدد الإجابات الصحيحة الحالية (نفس مصدر onAnswer والتقرير النهائي)
    _solvedCount: function(){ return this.host ? this.host.querySelectorAll('.qfb.good').length : 0; },

    // حالة المحرّك: idle / flying / sputtering → أصناف تتحكّم باللهب الحيّ
    _setFrame: function(state){
      if(!this.rocket || this._frame===state) return; this._frame=state;
      this.rocket.classList.toggle('st-fly', state==='flying');
      this.rocket.classList.toggle('st-sput', state==='sputtering');
    },

    onAnswer: function(ok){
      if(!this.lane || !this.host) return;
      // قياس مباشر للمسار من الموضع المرسوم الفعلي لعنصر القمر **لحظة الحركة** —
      // المسافة الكلّية تُشتقّ من إحداثيات القمر كما هو مرسوم الآن (لا من رقم محسوب
      // مسبقاً عند التركيب قد يكون بُنيَ على صورة غير محمّلة أو على مقياس مختلف عن
      // الرسم). بهذا يستحيل منطقياً أن تنفصل نهاية حركة الصاروخ عن سطح القمر: أينما
      // رُسم القمر، إليه يذهب الصاروخ. (يعالج جذرياً «توقّف الصاروخ دون القمر».)
      this._measure();
      const solved=this.host.querySelectorAll('.qfb.good').length;
      const step = this.total ? (1/this.total) : 0;
      let frac = this.total ? (solved/this.total) : 0;
      this._lightDots(solved);

      if(ok){
        const first=!this.ignited;
        if(first){ this.ignited=true; this.lane.classList.add('rj-lit'); }
        if(this.total && solved>=this.total && !this.arrived){
          if(first){ SFX.ignite(); SFX.engineStart(); }   // حالة نادرة (سؤال واحد)
          this._frac=1; this._land();                     // مشهد هبوط بطيء مُبطئ + خفوت المحرّك
        } else {
          this._frac=frac; this._apply();
          if(first){ SFX.ignite(); SFX.engineStart(); }   // اشتعال + بدء الهدير المستمرّ
          else { SFX.whoosh(); SFX.engineSwell(); }        // ووش يندمج مع علوّ الهدير
        }
      }else{
        this.hadError=true;
        this._frac=Math.max(0, frac - step); this._apply();
        this._sputter();          // انزلاق + لهب متقطّع (بصريّ)
        SFX.engineChoke();        // اختناق المحرّك = التنبيه الصوتيّ الوحيد للخطأ
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

    // ── مشهد هبوط هادئ: نزول بطيء ممتدّ بإبطاء قويّ حتى ملامسة القمر ثم استقرار ──
    LAND_DUR: 2.7,   // ثوانٍ — أطول بوضوح من خطوة الصعود العادية (1.1ث)
    _land: function(){
      this._sputtering=false;
      const dur=this.LAND_DUR;
      const y=(-(1*this.travel)).toFixed(2), x=(this._dxAt(1)).toFixed(2), rot=(this._tiltAt(1)).toFixed(2);
      this.rocket.style.setProperty('--rj-y', y+'px');
      this.rocket.style.setProperty('--rj-x', x+'px');
      this.rocket.style.setProperty('--rj-rot', rot+'deg');
      // إبطاء تدريجيّ قويّ كلّما اقترب من السطح (ease-out حادّ)
      this.rocket.style.transition='transform '+dur+'s cubic-bezier(.08,.66,.16,1)';
      this.rocket.style.transform ='translate('+x+'px,'+y+'px) rotate('+rot+'deg)';
      this._setFrame('flying');                  // المحرّك مشتعل أثناء الاقتراب
      this.lane.classList.add('rj-airborne');     // يبقى التأرجح حتى الملامسة
      SFX.engineLand(dur);                        // خفوت المحرّك متزامن → صمت لحظة الملامسة
      clearTimeout(this._arrT);
      this._arrT=setTimeout(()=>{ this._touchdown(); }, dur*1000);
    },
    _touchdown: function(){
      this.arrived=true; this._sputtering=false;
      this._setFrame('idle');                     // أُطفئ المحرّك عند الاستقرار
      this.lane.classList.remove('rj-airborne','rj-sputter');   // توقّف التأرجح
      this.lane.classList.add('rj-arrived');      // رفع العلم + استقرار لطيف
      SFX.landing();                              // صوت الهبوط الختاميّ (بعد الصمت)
      const msg = this.hadError
        ? 'أحسنت! وصلت القمر بعد رحلة مليئة بالتحدّي!'
        : 'أحسنت! وصلت القمر في الوقت المناسب!';
      clearTimeout(this._arrT2);
      this._arrT2=setTimeout(()=>{ try{ if(typeof speak==='function') speak(msg); }catch(e){} }, 650);
    }
  };

  window.RocketJourney = RocketJourney;
  RocketJourney._sfx = SFX;   // مرجع داخليّ (للاختبار/التشخيص)
})();
