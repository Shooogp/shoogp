/* ═══════════════════════════════════════════════════════════════
   منطق المنصة التفاعلية
   - يحمّل البيانات من data/*.json (عند التشغيل عبر خادم محلي)
   - وإن مُنع ذلك (فتح بالنقر المزدوج) يرجع تلقائياً إلى js/data.js
   ═══════════════════════════════════════════════════════════════ */

// مفتاح تبديل غلاف العلوم:
//   true  = الغلاف المدرسي الحقيقي (للاستخدام الصفّي الخاص فقط ⚠️ محمي بحقوق النشر)
//   false = البطاقة الأصلية (المجهر) — آمنة للنشر العام ✅
const USE_REAL_COVER = false;

// تُملأ بعد تحميل البيانات
let DATA = { terms:{}, index:{} };

/* ===== تحميل البيانات (JSON مع نسخة احتياطية) ===== */
async function loadData(){
  try{
    const [terms, index] = await Promise.all([
      fetch('data/books.json').then(r=>{ if(!r.ok) throw new Error('http '+r.status); return r.json(); }),
      fetch('data/index.json').then(r=>{ if(!r.ok) throw new Error('http '+r.status); return r.json(); })
    ]);
    return { terms, index };
  }catch(e){
    // وضع file:// يمنع fetch — نستخدم البيانات المضمّنة في js/data.js
    if(window.DATA_FALLBACK){
      console.warn('تعذّر جلب JSON — استخدام البيانات المضمّنة (js/data.js).', e);
      return window.DATA_FALLBACK;
    }
    throw e;
  }
}

/* ===== الحالة والصوت والنقاط ===== */
let score=0, streak=0;
let arVoice=null, audioReady=false;
function pickVoice(){const vs=speechSynthesis.getVoices();arVoice=vs.find(v=>v.lang&&v.lang.toLowerCase().startsWith('ar'))||null;}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}
function speak(t){if(muted||!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ar-SA';u.rate=.95;if(!arVoice)pickVoice();if(arVoice)u.voice=arVoice;speechSynthesis.speak(u);}catch(e){}}

/* ===== صوت الإجابة الصحيحة (audio/correct.mp3) ===== */
// مسار نسبيّ ليعمل على GitHub Pages. يُشغّل فقط عند الإجابة الصحيحة.
const correctSound = new Audio('audio/correct.mp3');
correctSound.preload = 'auto';
// صوت الإجابة الخاطئة (audio/wrong.mp3) — بنفس أسلوب صوت الصواب
const wrongSound = new Audio('audio/wrong.mp3');
wrongSound.preload = 'auto';
// حالة الكتم محفوظة بين الجلسات ليختار المعلّم مرّة واحدة
let muted = (function(){try{return localStorage.getItem('shoogp-muted')==='1';}catch(e){return false;}})();
function playCorrectSound(){
  if(muted) return;
  try{ correctSound.currentTime=0; const p=correctSound.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){}
}
function playWrongSound(){
  if(muted) return;
  try{ wrongSound.currentTime=0; const p=wrongSound.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){}
}

// فكّ قفل الصوت عند أول تفاعل (سياسة التشغيل التلقائي في متصفح السبورة الذكية)
function unlockAudio(){
  if(audioReady) return; audioReady=true;
  // تهيئة نطق الكلام العربي
  if('speechSynthesis' in window){try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);pickVoice();}catch(e){}}
  // تهيئة ملف الصوت: تشغيل صامت ثم إيقاف ليُسمح بالتشغيل البرمجي لاحقاً
  [correctSound,wrongSound].forEach(function(snd){
    try{const prev=snd.muted;snd.muted=true;const p=snd.play();
      if(p&&p.then)p.then(function(){snd.pause();snd.currentTime=0;snd.muted=prev;})
                    .catch(function(){snd.muted=prev;});
      else{snd.pause();snd.currentTime=0;snd.muted=prev;}
    }catch(e){}
  });
}
['click','touchstart','keydown'].forEach(ev=>document.addEventListener(ev,unlockAudio,{once:true,passive:true}));

/* ===== زر كتم/تشغيل الصوت ===== */
function updateSoundBtn(){
  const b=document.getElementById('soundBtn'); if(!b) return;
  b.textContent = muted ? '🔇' : '🔊';
  b.classList.toggle('muted', muted);
  b.title = muted ? 'الصوت مكتوم — اضغط للتشغيل' : 'الصوت يعمل — اضغط للكتم';
}
function toggleMute(){
  muted = !muted;
  try{localStorage.setItem('shoogp-muted', muted?'1':'0');}catch(e){}
  if(muted){ try{correctSound.pause();}catch(e){} try{wrongSound.pause();}catch(e){} if('speechSynthesis'in window){try{speechSynthesis.cancel();}catch(e){}} }
  updateSoundBtn();
}
(function(){var b=document.getElementById('soundBtn');if(b){b.addEventListener('click',toggleMute);updateSoundBtn();}})();
function addStar(n){score+=n;document.getElementById('starTxt').textContent=score;}
function bumpStreak(){streak++;document.getElementById('streak').textContent=streak;}

/* ===== نجوم الخلفية ===== */
(function(){const s=document.getElementById('stars');for(let i=0;i<60;i++){const t=document.createElement('i');const sz=Math.random()*3+1;t.style.width=sz+'px';t.style.height=sz+'px';t.style.left=Math.random()*100+'%';t.style.top=Math.random()*100+'%';t.style.animationDelay=Math.random()*3+'s';s.appendChild(t);}})();

/* ===== ① بناء الصفوف والكتب ===== */
let currentTerm="الأول";
let currentGrade="الرابع";
function buildTerms(){
  const t=document.getElementById('terms');t.innerHTML='';
  Object.keys(DATA.terms).forEach(name=>{
    const b=document.createElement('button');b.className='term-btn'+(name===currentTerm?' active':'');
    b.innerHTML=`<span class="term-ic">${name==='الأول'?'📘':'📗'}</span> الفصل الدراسي ${name}`;
    b.onclick=()=>{currentTerm=name;buildTerms();buildGrades();buildBooks();};
    t.appendChild(b);
  });
}
function buildGrades(){
  const g=document.getElementById('grades');g.innerHTML='';
  Object.keys(DATA.terms[currentTerm]).forEach(name=>{
    const b=document.createElement('button');b.className='grade'+(name===currentGrade?' active':'');
    b.textContent='الصف '+name;
    b.onclick=()=>{currentGrade=name;buildGrades();buildBooks();};
    g.appendChild(b);
  });
}
function buildBooks(){
  const wrap=document.getElementById('books');wrap.innerHTML='';
  const books=DATA.terms[currentTerm][currentGrade];
  if(!books.length){wrap.innerHTML=`<div class="empty">📚 كتب الصف ${currentGrade} — الفصل ${currentTerm} ستُضاف قريباً بإذن الله</div>`;return;}
  books.forEach(bk=>{
    const cover = bk.coverReal ? (USE_REAL_COVER ? bk.coverReal : bk.coverOriginal) : (bk.cover||null);
    const el=document.createElement('div');el.className='book '+bk.color+(cover?' has-cover':'');
    if(cover){
      el.innerHTML=(bk.isNew?'<span class="newbadge">جديد!</span>':'')+
        `<img class="cover-img" src="${cover}" alt="${bk.title}">`;
    }else{
      el.innerHTML=(bk.isNew?'<span class="newbadge">جديد!</span>':'')+
        `<div class="ic">${bk.ic}</div>`+
        `<div><div class="btitle">${bk.title}</div><div class="term">${bk.term}</div></div>`;
    }
    el.onclick=()=>openBook(bk.key);
    wrap.appendChild(el);
  });
}

/* ===== ③ فتح كتاب: عرض الفهرس ===== */
let currentBook=null;
let currentBookColor='';   // صنف لون بطاقة الكتاب (bk-*) لتلوين بطاقات الأسئلة بهويته
function openBook(key){
  currentBook=key;
  const idx=DATA.index[key];
  // ابحث عن الكتاب لتطبيق ثيمه ولونه
  const bk=DATA.terms[currentTerm][currentGrade].find(b=>b.key===key);
  currentBookColor=(bk && bk.color) ? bk.color : '';
  setTheme(bk && bk.theme ? bk.theme : 'theme-home');
  document.getElementById('bookTitle').textContent=idx.book;
  const totalL = idx.units.reduce((s,u)=>s+u.lessons.length,0);
  document.getElementById('bookSub').textContent=`${idx.units.length} وحدات · ${totalL} درساً`;
  const list=document.getElementById('lessons');list.innerHTML='';
  let n=0;
  idx.units.forEach((u,ui)=>{
    // --- بطاقة الوحدة (قابلة للطي) ---
    const unitBox=document.createElement('div');unitBox.className='unit-box';

    // رأس الوحدة (زر الطي)
    const uh=document.createElement('button');
    uh.className='unit-head'+(ui===0?' open':'');
    const count=u.lessons.length;
    uh.innerHTML=`<span class="unit-no">الوحدة ${ui+1}</span>`+
      `<span class="unit-title">${u.unit}</span>`+
      `<span class="unit-count">${count} دروس</span>`+
      `<span class="unit-chevron">⌄</span>`;

    // حاوية الدروس (تنطوي)
    const body=document.createElement('div');
    body.className='unit-body'+(ui===0?' open':'');

    u.lessons.forEach(ls=>{
      n++;
      const el=document.createElement('div');el.className='lesson'+(ls.open?'':' locked');
      el.innerHTML=`<div class="num">${n}</div><div class="lt">${ls.title}</div>`+
        `<div class="arrow">${ls.open?'←':'🔒'}</div>`;
      if(ls.open) el.onclick=()=>openLesson(ls);
      body.appendChild(el);
    });

    // تفعيل الطيّ/الفتح
    uh.onclick=()=>{
      const isOpen=uh.classList.contains('open');
      uh.classList.toggle('open',!isOpen);
      body.classList.toggle('open',!isOpen);
    };

    unitBox.appendChild(uh);
    unitBox.appendChild(body);
    list.appendChild(unitBox);
  });
  showScreen('lessonsScreen');
}

/* ===== ④ فتح درس: عرض الأسئلة التفاعلية ===== */
function openLesson(ls){
  document.getElementById('lessonTitle').textContent=ls.title;
  renderQuestions(ls);
  showScreen('activityScreen');
}

function setTheme(name){
  // أزل كل سمات theme-* (لا قائمة ثابتة ناقصة) كي لا تبقى خلفية كتابٍ عالقة عند التنقّل
  [].slice.call(document.body.classList).forEach(function(c){ if(c.indexOf('theme-')===0) document.body.classList.remove(c); });
  document.body.classList.add(name || 'theme-home');
}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
// عند مغادرة شاشة النشاط: أزل مسار الصاروخ وأعِد إظهار شريط النقاط
function leaveRocket(){document.body.classList.remove('rocket-mode');if(window.RocketJourney)RocketJourney.unmount();}
function goHome(){leaveRocket();setTheme('theme-home');showScreen('home');}
function backToLessons(){leaveRocket();showScreen('lessonsScreen');}

/* ═══════════════ محرّك الأسئلة الموحّد (خمسة أنواع) ═══════════════ */
function shuffle(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);}

// تغذية راجعة موحّدة: نجاح (نجوم + احتفال + صوت) / إخفاق (تشجيع)
// عند الصواب: يكفي صوت correct.mp3 — بلا نطق آلي متداخل معه
function qWin(fb,msg,stars){fb.textContent=msg||'🎉 أحسنت!';fb.className='fb qfb good';playCorrectSound();addStar(stars||1);bumpStreak();if(window.RocketJourney)RocketJourney.onAnswer(true);}
// عند الخطأ: صوت wrong.mp3 — بنفس أسلوب صوت الصواب، بلا نطق آلي متداخل معه
function qFail(fb,msg){fb.textContent=msg||'حاول مرة أخرى';fb.className='fb qfb bad';playWrongSound();if(window.RocketJourney)RocketJourney.onAnswer(false);}

const Q_LABEL={'drag-drop':'🌿 سحب وإفلات','matching':'🔗 توصيل','mcq':'✅ اختيار من متعدد','true-false':'⚖️ صواب أو خطأ','hotspot':'🎯 تحديد الأجزاء','sequence':'🔢 ترتيب تسلسلي','classify':'🗂️ تصنيف','fill-blank':'✏️ ملء الفراغ','exclude':'🚫 الاستبعاد','arrange':'🔤 ترتيب الحروف','mindmap':'🧠 خريطة ذهنية','find-error':'🔍 اكتشف الخطأ','audio-q':'🔊 سؤال صوتي','zoom-reveal':'🔎 تكبير تدريجي','color':'🎨 تلوين بالتعليمات','puzzle':'🧩 البازل','slider':'🎚️ الشريط المتدرج','memory':'🎴 بطاقات الذاكرة'};

// تحويل الأرقام إلى هندية (عربية) للعرض
function arNum(n){ return String(n).replace(/[0-9]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[+d];}); }

// يبني أسئلة الدرس ويعرضها واحداً تلو الآخر مع تنقّل حرّ ومؤشّر تقدّم وزر إنهاء
function renderQuestions(ls){
  const host=document.getElementById('questionList'); if(!host) return; host.innerHTML='';
  const qs=(window.QUESTIONS && QUESTIONS[ls.file]) || [];
  // لا سؤال افتراضي: إن لم تُؤلَّف أسئلة الدرس نعرض رسالة لطيفة بدل سؤال غير متعلّق بالكتاب
  if(!qs.length){
    const m=document.createElement('div'); m.className='card-box qcard';
    m.innerHTML='<div class="qbody" style="text-align:center;padding:14px 6px;font-size:1.15rem">📚 أسئلة هذا الدرس ستُضاف قريباً بإذن الله</div>';
    host.appendChild(m); return;
  }
  const R={'drag-drop':renderDragDrop,'matching':renderMatching,'mcq':renderMcq,'true-false':renderTrueFalse,'hotspot':renderHotspot,'sequence':renderSequence,'classify':renderClassify,'fill-blank':renderFillBlank,'exclude':renderExclude,'arrange':renderArrange,'mindmap':renderMindmap,'find-error':renderFindError,'audio-q':renderAudioQ,'zoom-reveal':renderZoom,'color':renderColor,'puzzle':renderPuzzle,'slider':renderSlider,'memory':renderMemory};

  // بناء كل البطاقات (تبقى في الصفحة لحفظ إجاباتها، ونُظهر واحدة فقط)
  const slides=document.createElement('div'); slides.className='qslides';
  qs.forEach((q,i)=>{
    const fn=R[q.type]; if(!fn) return;
    const card=document.createElement('div');
    card.className='card-box qcard';
    card.innerHTML=`<div class="qhead"><span class="qnum">سؤال ${arNum(i+1)}</span><span class="qtype">${Q_LABEL[q.type]||''}</span></div>`+
      `<h3 class="qprompt">${q.prompt||q.statement||''}</h3>`+
      `<div class="qbody"></div><div class="fb qfb"></div>`;
    fn(q, card.querySelector('.qbody'), card.querySelector('.qfb'));
    slides.appendChild(card);
  });
  host.appendChild(slides);
  const cards=[].slice.call(slides.children);
  const total=cards.length;

  // ── رحلة الصاروخ: بديل النجوم في الدروس المفعَّلة فقط ──
  const rocketOn = !!(window.RocketJourney && RocketJourney.isEnabled(ls.file));
  const actSub = document.querySelector('#activityScreen .screen-sub');
  if(rocketOn){
    document.body.classList.add('rocket-mode');
    if(actSub) actSub.textContent='أجب عن الأسئلة وأطلق صاروخك إلى القمر 🚀';
    RocketJourney.mount(host, total);
  }else{
    document.body.classList.remove('rocket-mode');
    if(window.RocketJourney) RocketJourney.unmount();
    if(actSub) actSub.textContent='أجب عن الأسئلة واجمع النجوم ⭐';
  }

  // شريط التنقّل + مؤشّر التقدّم
  const nav=document.createElement('div'); nav.className='qnav';
  nav.innerHTML='<button class="btn qprev">→ السابق</button>'+
    '<span class="qprogress"></span>'+
    '<button class="btn qnext">التالي ←</button>'+
    '<button class="btn qfinish">إنهاء 🏁</button>';
  host.appendChild(nav);
  const result=document.createElement('div'); result.className='qresult'; host.appendChild(result);

  let cur=0;
  function show(i){
    cur=Math.max(0,Math.min(total-1,i));
    cards.forEach((c,idx)=>{ c.style.display=(idx===cur)?'block':'none'; });
    nav.querySelector('.qprogress').textContent='السؤال '+arNum(cur+1)+' من '+arNum(total);
    nav.querySelector('.qprev').disabled=(cur===0);
    const last=(cur===total-1);
    nav.querySelector('.qnext').style.display=last?'none':'';
    nav.querySelector('.qfinish').style.display=last?'':'none';
    result.innerHTML='';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  nav.querySelector('.qprev').onclick=function(){ show(cur-1); };
  nav.querySelector('.qnext').onclick=function(){ show(cur+1); };
  nav.querySelector('.qfinish').onclick=function(){
    const good=host.querySelectorAll('.qfb.good').length;
    result.innerHTML='<div class="card-box qresult-box">'+
      '<h3>🎉 أنهيت الدرس!</h3>'+
      '<p>أجبت صحيحاً عن <b>'+arNum(good)+'</b> من <b>'+arNum(total)+'</b> أسئلة.</p>'+
      // في درس الصاروخ يُحذف سطر «مجموع نجومك» (النجوم مُستبدَلة بالصاروخ)
      (rocketOn ? '' : '<p>مجموع نجومك ⭐ <b>'+arNum(score)+'</b></p>')+
      (good===total ? '<p class="qresult-cheer">ممتاز! أكملت كل الأسئلة 🌟</p>'
                    : '<p class="qresult-cheer">أحسنت! يمكنك الرجوع وإكمال ما تبقّى.</p>')+
      '</div>';
    if(good===total) speak('أحسنت، أكملت كل الأسئلة');
    window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
  };
  show(0);
}

/* ① سحب وإفلات: targets[{answer,x,y}] + خلفية image/svg */
function renderDragDrop(q, body, fb){
  let dragged=null;
  // الوسط: صورة تُحجّم مباشرةً (تظهر كاملة لكل النِسَب) أو رسم SVG داخل غلاف
  const media = q.svg ? `<div class="labelimg">${q.svg}</div>` : `<img class="labelimg" src="${q.image}" alt="">`;
  // النقاط: تُوضع ديناميكياً حسب صندوق الصورة الحيّ (نِسَب الصورة محفوظة في data)
  const dots = q.targets.map((t,i)=>`<span class="dnd-dot" data-i="${i}" data-x="${t.dot.x}" data-y="${t.dot.y}"></span>`).join('');
  // الصناديق حول الصورة (نِسَب مئوية من منطقة النشاط)
  const boxes = q.targets.map((t,i)=>`<div class="target" data-i="${i}" data-answer="${t.answer}" style="left:${t.box.x}%;top:${t.box.y}%">؟</div>`).join('');
  body.innerHTML=`<div class="dnd"><div class="stage stage-label"${q.bg?` style="background:${q.bg}"`:''}>`+
    media +
    `<svg class="dndlines"></svg>`+
    dots + boxes +
    `</div>`+
    `<div class="bank"><div class="bt">البطاقات:</div>`+
    shuffle(q.targets.map(t=>t.answer)).map(w=>`<div class="chip" draggable="true" data-w="${w}">${w}</div>`).join('')+
    `</div></div><div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  // وضع النقاط + رسم الخطوط ديناميكياً (دقيق مهما تغيّر الحجم أو ظهر السؤال)
  const stage=body.querySelector('.stage'), svg=body.querySelector('.dndlines'), imgEl=body.querySelector('.labelimg');
  const SVGNS='http://www.w3.org/2000/svg';
  function redraw(){
    const sr=stage.getBoundingClientRect(); if(!sr.width||!imgEl) return;
    const ir=imgEl.getBoundingClientRect();
    body.querySelectorAll('.dnd-dot').forEach(dot=>{
      dot.style.left=(ir.left-sr.left + (+dot.dataset.x)/100*ir.width)+'px';
      dot.style.top =(ir.top -sr.top  + (+dot.dataset.y)/100*ir.height)+'px';
    });
    svg.innerHTML='';
    body.querySelectorAll('.target').forEach(bx=>{
      const dot=body.querySelector('.dnd-dot[data-i="'+bx.dataset.i+'"]'); if(!dot) return;
      const br=bx.getBoundingClientRect(), dr=dot.getBoundingClientRect();
      // مركز الصندوق ومركز النقطة (نسبةً إلى منطقة النشاط)
      const cx=br.left+br.width/2-sr.left, cy=br.top+br.height/2-sr.top;
      const px=dr.left+dr.width/2-sr.left, py=dr.top+dr.height/2-sr.top;
      // يبدأ الخط من حافة الصندوق (بعد الحد المنقّط) لا من مركزه
      const dx=px-cx, dy=py-cy;
      const GAP=4; // فراغ بسيط بعد الحد المنقّط
      const hw=br.width/2, hh=br.height/2;
      let sx=cx, sy=cy;
      if(dx||dy){
        const t=Math.min(hw/Math.abs(dx||1e-6), hh/Math.abs(dy||1e-6));
        const len=Math.hypot(dx,dy);
        sx=cx + dx*t + dx/len*GAP;
        sy=cy + dy*t + dy/len*GAP;
      }
      const ln=document.createElementNS(SVGNS,'line');
      ln.setAttribute('x1',sx); ln.setAttribute('y1',sy);
      ln.setAttribute('x2',px); ln.setAttribute('y2',py);
      ln.setAttribute('class','dndline'); svg.appendChild(ln);
    });
  }
  if(window.ResizeObserver){ new ResizeObserver(redraw).observe(stage); }
  if(imgEl && imgEl.tagName==='IMG') imgEl.addEventListener('load',redraw);
  setTimeout(redraw,60);
  const used=()=>{const p=[...body.querySelectorAll('.target')].map(t=>t.dataset.placed).filter(Boolean);body.querySelectorAll('.chip').forEach(c=>c.classList.toggle('used',p.includes(c.dataset.w)));};
  const drop=tg=>{if(!dragged)return;tg.textContent=dragged.dataset.w;tg.dataset.placed=dragged.dataset.w;tg.classList.add('filled');tg.classList.remove('correct');tg.style.borderColor='';used();dragged=null;};
  body.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const g=el&&el.closest('.target');if(g)drop(g);chip.classList.remove('dragging')});
  });
  body.querySelectorAll('.target').forEach(tg=>{
    tg.addEventListener('dragover',e=>{e.preventDefault();tg.classList.add('over')});
    tg.addEventListener('dragleave',()=>tg.classList.remove('over'));
    tg.addEventListener('drop',e=>{e.preventDefault();tg.classList.remove('over');drop(tg)});
  });
  body.querySelector('.btn-check').onclick=()=>{
    let ok=0;const ts=body.querySelectorAll('.target');
    ts.forEach(t=>{if(t.dataset.placed===t.dataset.answer){t.classList.add('correct');ok++;}else{t.classList.remove('correct');if(t.dataset.placed)t.style.borderColor='#c94a4a';}});
    if(ok===ts.length&&ts.length) qWin(fb,'🎉 أحسنت! كل البطاقات في مكانها',3);
    else qFail(fb,`راجع إجاباتك — الصحيح ${ok} من ${ts.length}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderDragDrop(q,body,fb);
}

/* ② توصيل: خط منحنٍ (Bézier) بنقطتين يُرسم بين المفردتين عند التوصيل الصحيح */
const MATCH_LINE='#a7c957';
function renderMatching(q, body, fb){
  body.innerHTML=`<div class="matchwrap"><svg class="matchsvg"></svg>`+
    `<div class="match"><div class="mcol mcolL"></div><div class="mcol mcolR"></div></div></div>`+
    `<div class="actions"><button class="btn btn-reset">إعادة ↺</button></div>`;
  const wrap=body.querySelector('.matchwrap'), svg=body.querySelector('.matchsvg');
  const L=body.querySelector('.mcolL'), Rr=body.querySelector('.mcolR');
  let sel=null, done=0;
  const NS='http://www.w3.org/2000/svg';

  // يرسم خطاً منحنياً بين عنصرَين مع نقطة دائرية عند كل طرف
  function drawLink(a,b){
    const wr=wrap.getBoundingClientRect(), ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect();
    const aRight = ra.left < rb.left; // أيّهما إلى اليمين لاختيار الحافة المواجهة
    const ax=(aRight?ra.right:ra.left)-wr.left, ay=ra.top+ra.height/2-wr.top;
    const bx=(aRight?rb.left:rb.right)-wr.left, by=rb.top+rb.height/2-wr.top;
    const mx=(ax+bx)/2;
    const p=document.createElementNS(NS,'path');
    p.setAttribute('d',`M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`);
    p.setAttribute('fill','none'); p.setAttribute('stroke',MATCH_LINE);
    p.setAttribute('stroke-width','3.5'); p.setAttribute('stroke-linecap','round');
    svg.appendChild(p);
    [[ax,ay],[bx,by]].forEach(pt=>{const c=document.createElementNS(NS,'circle');
      c.setAttribute('cx',pt[0]); c.setAttribute('cy',pt[1]); c.setAttribute('r','5'); c.setAttribute('fill',MATCH_LINE); svg.appendChild(c);});
  }

  shuffle(q.pairs).forEach(pr=>{const d=document.createElement('div');d.className='mitem left';d.textContent=pr.a;d.dataset.k=pr.a;
    d.onclick=()=>{if(d.classList.contains('matched'))return;L.querySelectorAll('.left').forEach(x=>x.classList.remove('selected'));d.classList.add('selected');sel=d;speak(pr.a);};L.appendChild(d);});
  shuffle(q.pairs).forEach(pr=>{const d=document.createElement('div');d.className='mitem right';d.textContent=pr.b;d.dataset.k=pr.a;
    d.onclick=()=>{if(!sel||d.classList.contains('matched'))return;
      if(sel.dataset.k===pr.a){drawLink(sel,d);sel.classList.add('matched');d.classList.add('matched');sel.classList.remove('selected');sel=null;done++;playCorrectSound();addStar(1);
        if(done===q.pairs.length) qWin(fb,'🌟 ممتاز! أكملت التوصيل',1);}
      else{qFail(fb,'ليست الإجابة الصحيحة، حاول مجدداً');d.style.background='#fde2e2';setTimeout(()=>d.style.background='',500);}};Rr.appendChild(d);});
  body.querySelector('.btn-reset').onclick=()=>renderMatching(q,body,fb);
}

/* ③ اختيار من متعدد: options[] + answer (فهرس الخيار الصحيح) */
function renderMcq(q, body, fb){
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  body.innerHTML=`<div class="opts">`+opts.map(x=>`<button class="opt" data-i="${x.idx}">${x.o}</button>`).join('')+`</div>`;
  let done=false;
  body.querySelectorAll('.opt').forEach(btn=>{btn.onclick=()=>{
    if(done)return;
    if(+btn.dataset.i===q.answer){done=true;btn.classList.add('correct');body.querySelectorAll('.opt').forEach(b=>b.disabled=true);qWin(fb,'🎉 إجابة صحيحة!',2);}
    else{btn.classList.add('wrong');btn.disabled=true;qFail(fb,'ليست الصحيحة، جرّب خياراً آخر');}
  };});
}

/* ④ صواب وخطأ: statement + answer (true/false) */
function renderTrueFalse(q, body, fb){
  body.innerHTML=`<div class="tf-btns"><button class="btn tf tf-t">صواب ✔</button><button class="btn tf tf-f">خطأ ✘</button></div>`;
  let done=false;
  const judge=(val,btn)=>{if(done)return;if(val===q.answer){done=true;btn.classList.add('tf-correct');qWin(fb,'🎉 إجابة صحيحة!',2);}else{btn.classList.add('tf-wrong');qFail(fb,'الإجابة غير صحيحة، فكّر مجدداً');}};
  body.querySelector('.tf-t').onclick=e=>judge(true,e.currentTarget);
  body.querySelector('.tf-f').onclick=e=>judge(false,e.currentTarget);
}

/* ⑤ تحديد الأجزاء (hotspot): صورة/رسم + spot{x,y,r} (النقر على الموضع الصحيح) */
function renderHotspot(q, body, fb){
  const inner=q.svg?q.svg:`<img src="${q.image}" alt="">`;
  const figCls = q.fit==='width' ? 'figwrap fw hsfig' : 'figwrap hsfig';
  body.innerHTML=`<div class="dnd dnd-solo"><div class="stage stage-img"${q.bg?` style="background:${q.bg}"`:''}><div class="${figCls}">${inner}</div></div></div>`;
  const fig=body.querySelector('.hsfig'); fig.style.cursor='pointer';
  let done=false;
  fig.onclick=(e)=>{
    if(done)return;
    const box=fig.getBoundingClientRect();
    const px=(e.clientX-box.left)/box.width*100, py=(e.clientY-box.top)/box.height*100;
    if(px<0||px>100||py<0||py>100) return;
    const mark=document.createElement('div');mark.className='hs-mark';mark.style.left=px+'%';mark.style.top=py+'%';
    if(Math.hypot(px-q.spot.x,py-q.spot.y)<=(q.spot.r||10)){done=true;mark.classList.add('hit');qWin(fb,'🎯 أحسنت! نقرت على المكان الصحيح',2);}
    else{mark.classList.add('miss');qFail(fb,'ليس هنا، حاول مرة أخرى');setTimeout(()=>mark.remove(),800);}
    fig.appendChild(mark);
  };
}

/* ⑫ اكتشف الخطأ (find-error): صورة فيها خطأ علمي واحد + spot{x,y,r} — الطالب يضغط على موضع الخطأ.
   نفس آليّة النقطة الساخنة بصرياً؛ عند إصابة موضع الخطأ يفوز، وإلا يشجَّع على التدقيق أكثر */
function renderFindError(q, body, fb){
  const inner=q.svg?q.svg:`<img src="${q.image}" alt="">`;
  const figCls = q.fit==='width' ? 'figwrap fw hsfig' : 'figwrap hsfig';
  body.innerHTML=`<div class="dnd dnd-solo"><div class="stage stage-img"${q.bg?` style="background:${q.bg}"`:''}><div class="${figCls}">${inner}</div></div></div>`;
  const fig=body.querySelector('.hsfig'); fig.style.cursor='pointer';
  let done=false;
  fig.onclick=(e)=>{
    if(done)return;
    const box=fig.getBoundingClientRect();
    const px=(e.clientX-box.left)/box.width*100, py=(e.clientY-box.top)/box.height*100;
    if(px<0||px>100||py<0||py>100) return;
    const mark=document.createElement('div');mark.className='hs-mark';mark.style.left=px+'%';mark.style.top=py+'%';
    if(Math.hypot(px-q.spot.x,py-q.spot.y)<=(q.spot.r||10)){done=true;mark.classList.add('hit');qWin(fb,'🔍 أحسنت! اكتشفت الخطأ',2);}
    else{mark.classList.add('miss');qFail(fb,'ليس هنا الخطأ، دقّق أكثر');setTimeout(()=>mark.remove(),800);}
    fig.appendChild(mark);
  };
}

/* ⑬ السؤال الصوتي (audio-q): sound (ملف صوت) + options[{image,label}] + answer (فهرس الصحيح).
   يُشغَّل الصوت بزر «استمع»، والطالب يختار مصدره من صور الخيارات (تُخلط تلقائياً كنمط MCQ).
   صوت السؤال يُشغَّل بضغطة صريحة على الزر (مستقلّ عن كتم أصوات التغذية الراجعة correct/wrong).
   إن تعذّر تحميل صورة خيار تُخفى وتبقى تسميتها (تدرّج سليم قبل توليد الصور). */
function renderAudioQ(q, body, fb){
  const snd=new Audio(q.sound); snd.preload='auto';
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  body.innerHTML=`<div class="audioq">`+
    `<button class="btn aplay">🔊 استمع</button>`+
    `<div class="aopts">`+opts.map(x=>
      `<button class="aopt" data-i="${x.idx}">`+
      (x.o.image?`<img class="aopt-img" src="${x.o.image}" alt="${x.o.label||''}">`:'')+
      (x.o.label?`<span class="aopt-label">${x.o.label}</span>`:'')+
      `</button>`).join('')+
    `</div></div>`;
  // تشغيل صوت السؤال عند الطلب (ضغطة صريحة؛ لا يخضع لكتم التغذية الراجعة)
  body.querySelector('.aplay').onclick=()=>{ try{ snd.currentTime=0; const p=snd.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){} };
  // إن فشل تحميل صورة خيار، أخفها وأبقِ التسمية ظاهرة
  body.querySelectorAll('.aopt-img').forEach(im=>{ im.onerror=()=>{ im.style.display='none'; im.closest('.aopt').classList.add('noimg'); }; });
  let done=false;
  body.querySelectorAll('.aopt').forEach(btn=>{ btn.onclick=()=>{
    if(done)return;
    if(+btn.dataset.i===q.answer){done=true;btn.classList.add('correct');body.querySelectorAll('.aopt').forEach(b=>b.disabled=true);qWin(fb,'🎉 أحسنت! هذا هو مصدر الصوت',2);}
    else{btn.classList.add('wrong');btn.disabled=true;qFail(fb,'ليس هذا مصدر الصوت، استمع مرّة أخرى');}
  };});
}

/* ⑭ التكبير التدريجي (zoom-reveal): image + options[] + answer + (maxZoom, seconds اختياريان).
   تبدأ الصورة مقرّبة جداً (scale=maxZoom) ثم تتّسع تدريجياً إلى حجمها الكامل خلال seconds؛
   التخمين المبكر (والصورة أكثر تقريباً) يمنح نجوماً أكثر. الخيارات تُخلط كنمط MCQ.
   أصوات correct/wrong عبر qWin/qFail مع زر الكتم. */
function renderZoom(q, body, fb){
  const maxZoom=q.maxZoom||6;      // مقدار التقريب الابتدائي
  const seconds=q.seconds||9;      // زمن الاتّساع الكامل بالثواني
  const MAXSTARS=5;
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  body.innerHTML=`<div class="zoomq">`+
    `<div class="zoom-stage"><img class="zoom-img" src="${q.image}" alt=""></div>`+
    `<div class="zoom-meter">التخمين الآن يمنح <b class="zoom-pts">${arNum(MAXSTARS)}</b> ⭐</div>`+
    `<button class="btn zoom-start">ابدأ التكبير 🔎</button>`+
    `<div class="opts zoom-opts" hidden>`+
      opts.map(x=>`<button class="opt" data-i="${x.idx}">${x.o}</button>`).join('')+
    `</div></div>`;
  const img=body.querySelector('.zoom-img'), ptsEl=body.querySelector('.zoom-pts');
  const optsWrap=body.querySelector('.zoom-opts'), startBtn=body.querySelector('.zoom-start');
  const meter=body.querySelector('.zoom-meter');
  img.style.transform=`scale(${maxZoom})`;
  let done=false, scale=maxZoom, raf=null, t0=null;
  // النجوم الحالية بحسب مقدار التقريب (تنخفض من MAXSTARS عند أقصى تقريب إلى 1 عند الحجم الكامل)
  function curStars(){ return Math.max(1, Math.round(1 + (scale-1)/(maxZoom-1)*(MAXSTARS-1))); }
  function frame(ts){
    if(t0===null) t0=ts;
    const p=Math.min(1,(ts-t0)/(seconds*1000));
    scale=maxZoom-(maxZoom-1)*p;
    img.style.transform=`scale(${scale})`;
    ptsEl.textContent=arNum(curStars());
    if(p<1 && !done) raf=requestAnimationFrame(frame);
  }
  startBtn.onclick=()=>{ startBtn.hidden=true; optsWrap.hidden=false; t0=null; raf=requestAnimationFrame(frame); };
  optsWrap.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
    if(done)return;
    if(+btn.dataset.i===q.answer){
      done=true; if(raf)cancelAnimationFrame(raf);
      const win=curStars();
      btn.classList.add('correct'); optsWrap.querySelectorAll('.opt').forEach(b=>b.disabled=true);
      meter.innerHTML=`ربحت <b class="zoom-pts">${arNum(win)}</b> ⭐`;
      qWin(fb,'🎉 أحسنت! عرفته — +'+arNum(win)+' نجوم',win);
    } else { btn.classList.add('wrong'); btn.disabled=true; qFail(fb,'ليس هذا، انتظر حتى تتّضح الصورة ثم جرّب'); }
  };});
}

/* ⑥ الترتيب التسلسلي (sequence): steps[] بالترتيب الصحيح — الطالب يرتّب البطاقات المبعثرة
   بالسحب لتغيير أماكنها (فأرة + لمس على السبورة الذكية) */
function renderSequence(q, body, fb){
  const correct=q.steps.slice();
  // ترتيب مبدئي مبعثر يختلف عن الصحيح (حتى لا يبدأ محلولاً)
  let order=shuffle(correct);
  if(correct.length>1){ let g=0; while(order.every((s,i)=>s===correct[i]) && g++<20) order=shuffle(correct); }
  body.innerHTML=`<div class="seq"><div class="seq-hint">اسحب البطاقات لترتيبها</div><ol class="seqlist"></ol></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const list=body.querySelector('.seqlist');
  order.forEach(txt=>{
    const li=document.createElement('li');
    li.className='seqitem'; li.dataset.k=txt; li.draggable=true;
    li.innerHTML=`<span class="seq-txt">${txt}</span><span class="seq-grip" aria-hidden="true">≡</span>`;
    list.appendChild(li);
  });
  const items=()=>[...list.querySelectorAll('.seqitem')];
  // الأرقام عمود ثابت خارج الصناديق (١،٢،٣…): تُعرض بجانب كل صفّ عبر data-pos، لا تتحرك مع البطاقة
  function renumber(){ items().forEach((li,i)=>{ li.setAttribute('data-pos',arNum(i+1)); li.classList.remove('correct','wrong'); }); }
  renumber();
  // السحب لإعادة الترتيب: تُزاح البطاقات لإفساح مكان البطاقة المسحوبة (فأرة + لمس)
  let dragged=null;
  function afterElement(y){ return items().filter(li=>li!==dragged).reduce((closest,li)=>{
    const box=li.getBoundingClientRect(); const off=y-box.top-box.height/2;
    return (off<0 && off>closest.offset) ? {offset:off,el:li} : closest;
  },{offset:-Infinity,el:null}).el; }
  function moveTo(y){ if(!dragged)return; const after=afterElement(y); if(!after) list.appendChild(dragged); else list.insertBefore(dragged,after); renumber(); }
  function start(li){ dragged=li; li.classList.add('dragging'); }
  function end(){ if(dragged)dragged.classList.remove('dragging'); dragged=null; renumber(); }
  // فأرة (HTML5 DnD)
  list.addEventListener('dragstart',e=>{const li=e.target.closest('.seqitem'); if(!li)return; start(li); try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','');}catch(_){}});
  list.addEventListener('dragover',e=>{ if(!dragged)return; e.preventDefault(); moveTo(e.clientY); });
  list.addEventListener('drop',e=>{ if(dragged)e.preventDefault(); });
  list.addEventListener('dragend',end);
  // لمس (السبورة الذكية)
  list.addEventListener('touchstart',e=>{const li=e.target.closest('.seqitem'); if(!li)return; start(li);},{passive:true});
  list.addEventListener('touchmove',e=>{ if(!dragged)return; e.preventDefault(); moveTo(e.touches[0].clientY); },{passive:false});
  list.addEventListener('touchend',end);
  list.addEventListener('touchcancel',end);
  body.querySelector('.btn-check').onclick=()=>{
    const cur=items(); let ok=0;
    cur.forEach((li,i)=>{ if(li.dataset.k===correct[i]){li.classList.add('correct');ok++;} else li.classList.add('wrong'); });
    if(ok===correct.length) qWin(fb,'🎉 أحسنت! الترتيب صحيح',3);
    else qFail(fb,`راجع الترتيب — الصحيح ${arNum(ok)} من ${arNum(correct.length)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderSequence(q,body,fb);
}

/* ⑦ التصنيف في مجموعات (classify): groups[{name, items[]}] — سحب العناصر إلى صندوق مجموعتها
   (صناديق المجموعات جنباً إلى جنب، بلا صورة/خطوط؛ سحب فأرة + لمس للسبورة) */
function renderClassify(q, body, fb){
  // خريطة كل عنصر ← اسم مجموعته الصحيحة
  const correct={}; q.groups.forEach(g=>g.items.forEach(it=>correct[it]=g.name));
  const all=shuffle(q.groups.reduce((a,g)=>a.concat(g.items),[]));
  const groupsHtml=q.groups.map((g,i)=>
    `<div class="grp"><div class="grp-h">${g.name}</div><div class="grp-drop" data-i="${i}" data-name="${g.name}"></div></div>`).join('');
  body.innerHTML=`<div class="classify"><div class="grp-row">${groupsHtml}</div>`+
    `<div class="bank clsbank"><div class="bt">العناصر:</div><div class="chips">`+
    all.map(w=>`<div class="chip" draggable="true" data-w="${w}">${w}</div>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  let dragged=null;
  const clearMark=()=>body.querySelectorAll('.chip').forEach(c=>c.classList.remove('ok','no'));
  const place=zone=>{ if(!dragged)return; zone.appendChild(dragged); clearMark(); dragged=null; };
  body.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const z=el&&el.closest('.grp-drop, .chips');if(z)place(z);chip.classList.remove('dragging')});
  });
  body.querySelectorAll('.grp-drop, .chips').forEach(zone=>{
    zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('over')});
    zone.addEventListener('dragleave',()=>zone.classList.remove('over'));
    zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('over');place(zone)});
  });
  body.querySelector('.btn-check').onclick=()=>{
    let ok=0;const total=all.length;
    q.groups.forEach((g,i)=>{
      body.querySelector('.grp-drop[data-i="'+i+'"]').querySelectorAll('.chip').forEach(c=>{
        if(correct[c.dataset.w]===g.name){c.classList.add('ok');c.classList.remove('no');ok++;}
        else{c.classList.add('no');c.classList.remove('ok');}
      });
    });
    if(ok===total) qWin(fb,'🎉 أحسنت! كل العناصر في مجموعتها',3);
    else qFail(fb,`راجع التصنيف — الصحيح ${arNum(ok)} من ${arNum(total)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderClassify(q,body,fb);
}

/* ⑮ التلوين بالتعليمات (color): رسم SVG بأجزاء منفصلة — كل جزء عنصر <g class="cpart" data-name="…">
   بنيته على نمط دورة حياة النبات (مجموعات <g> قابلة للتلوين، لا صورة نقطية).
   palette[{name,color}] = لوحة الألوان الكبيرة، parts[{name,color}] = اللون الصحيح لكل جزء مطلوب
   (يُطابق data-name في الرسم). الطالب يختار لوناً ثم يضغط الجزء فيتلوّن؛ التحقّق: هل كل جزء
   مطلوب باللون الصحيح؟ الأجزاء غير المذكورة في parts تبقى حرّة (تلوينها لا يؤثّر في النتيجة).
   الصوت: qWin/qFail يشغّلان correct.mp3/wrong.mp3 ويخضعان لزرّ الكتم العامّ. */
function renderColor(q, body, fb){
  const norm=c=>String(c||'').trim().toLowerCase();
  const nameOf=c=>{ const p=q.palette.find(x=>norm(x.color)===norm(c)); return p?p.name:''; };
  // لوحة ألوان كبيرة تناسب اللمس على السبورة
  const swatches=q.palette.map(p=>
    `<button class="cswatch" type="button" data-color="${p.color}" title="${p.name}">`+
      `<span class="cswatch-dot" style="background:${p.color}"></span>`+
      `<span class="cswatch-name">${p.name}</span></button>`).join('');
  // شريط التعليمات: لكل جزء مطلوب اسمه ولونه المطلوب
  const instr=q.parts.map(pt=>
    `<span class="cinstr"><span class="cinstr-dot" style="background:${pt.color}"></span>`+
    `${pt.name} ← ${nameOf(pt.color)}</span>`).join('');
  body.innerHTML=
    `<div class="colorq">`+
      `<div class="cpalette">${swatches}</div>`+
      `<div class="cinstrbar">${instr}</div>`+
      `<div class="dnd dnd-solo"><div class="stage stage-img"${q.bg?` style="background:${q.bg}"`:''}>`+
        `<div class="figwrap csvg">${q.svg}</div>`+
      `</div></div>`+
    `</div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  let chosen=null;
  // اختيار لون من اللوحة
  body.querySelectorAll('.cswatch').forEach(sw=>{ sw.onclick=()=>{
    body.querySelectorAll('.cswatch').forEach(x=>x.classList.remove('sel'));
    sw.classList.add('sel'); chosen=sw.dataset.color;
    speak(sw.querySelector('.cswatch-name').textContent);
  };});
  // تلوين جزء عند الضغط (بعد اختيار لون)
  body.querySelectorAll('.cpart').forEach(part=>{
    part.style.cursor='pointer';
    part.addEventListener('click',()=>{
      if(!chosen){ fb.textContent='اختر لوناً أوّلاً من اللوحة 🎨'; fb.className='fb qfb'; return; }
      part.style.fill=chosen; part.dataset.fill=chosen; part.classList.remove('cwrong');
    });
  });
  // التحقّق: كل جزء مطلوب باللون الصحيح حسب التعليمات
  body.querySelector('.btn-check').onclick=()=>{
    let ok=0; const need=q.parts.length;
    q.parts.forEach(pt=>{
      const el=body.querySelector('.cpart[data-name="'+pt.name+'"]'); if(!el) return;
      if(norm(el.dataset.fill)===norm(pt.color)){ ok++; el.classList.remove('cwrong'); }
      else el.classList.add('cwrong');
    });
    if(ok===need && need) qWin(fb,'🎨 أحسنت! لوّنت كل جزء باللون الصحيح',3);
    else qFail(fb,`راجع الألوان — الصحيح ${arNum(ok)} من ${arNum(need)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderColor(q,body,fb);
}

/* ⑯ البازل (تركيب الصورة) — puzzle:
   صورة واحدة كاملة تُقسَّم برمجياً إلى شبكة grid.cols × grid.rows قطعاً عبر خاصية
   background-position (لا حاجة لصور متعددة — صورة واحدة تكفي والكود يقسّمها). تُبعثَر
   القطع في صينية سفلية، والطالب يعيد ترتيبها بالسحب إلى لوح الشبكة (فأرة + لمس).
   عند اكتمال كل القطع في مكانها الصحيح → مكافأة (تختفي الفواصل فتظهر الصورة كاملة)
   وصوت correct.mp3. اللوح بـ direction:ltr كي تطابق أعمدةُ الشبكة أعمدةَ الصورة
   (الصورة محتوى بصري لا نصّ) بينما تبقى بقيّة الواجهة RTL.
   الصوت: qWin/qFail يشغّلان correct.mp3/wrong.mp3 ويخضعان لزرّ الكتم العامّ. */
function renderPuzzle(q, body, fb){
  const cols=(q.grid&&q.grid.cols)||3, rows=(q.grid&&q.grid.rows)||3, n=cols*rows;
  // موضع خلفية كل قطعة: العمود يتوزّع أفقياً والصف عمودياً (نسبة مئوية قياسية)
  const posX=i=>cols>1?(i%cols)/(cols-1)*100:0;
  const posY=i=>rows>1?Math.floor(i/cols)/(rows-1)*100:0;
  const piece=i=>`<div class="pzpiece" draggable="true" data-i="${i}" `+
    `style="background-image:url('${q.image}');background-size:${cols*100}% ${rows*100}%;`+
    `background-position:${posX(i)}% ${posY(i)}%"></div>`;
  const slots=Array.from({length:n},(_,i)=>`<div class="pzslot" data-i="${i}"></div>`).join('');
  const pieces=shuffle(Array.from({length:n},(_,i)=>i)).map(piece).join('');
  body.innerHTML=`<div class="puzzle">`+
    `<div class="pzboard" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)">${slots}</div>`+
    `<div class="bank pzbank"><div class="bt">القطع:</div><div class="chips pztray">${pieces}</div></div>`+
    `</div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const board=body.querySelector('.pzboard'), tray=body.querySelector('.pztray');
  if(q.bg) board.style.background=q.bg;
  // نسبة اللوح = نسبة الصورة الحقيقية، وحجم قطع الصينية = حجم خانة اللوح (يُحدَّث مع تغيّر القياس)
  function sizePieces(){ const s=board.querySelector('.pzslot'); if(!s)return;
    tray.style.setProperty('--pw', s.clientWidth+'px');
    tray.style.setProperty('--ph', s.clientHeight+'px'); }
  const probe=new Image();
  probe.onload=()=>{ if(probe.naturalWidth) board.style.aspectRatio=probe.naturalWidth+'/'+probe.naturalHeight; sizePieces(); };
  probe.src=q.image;
  if(window.ResizeObserver){ new ResizeObserver(sizePieces).observe(board); }
  setTimeout(sizePieces,60);
  let dragged=null;
  const clearMark=()=>{ board.classList.remove('solved'); body.querySelectorAll('.pzslot').forEach(s=>s.classList.remove('correct','wrong')); };
  // نقل القطعة إلى خانة (مع تبديل القطعة الموجودة إلى الصينية) أو إعادتها إلى الصينية
  const toSlot=slot=>{ if(!dragged)return; const ex=slot.querySelector('.pzpiece'); if(ex&&ex!==dragged) tray.appendChild(ex); slot.appendChild(dragged); clearMark(); dragged=null; };
  const toTray=()=>{ if(!dragged)return; tray.appendChild(dragged); clearMark(); dragged=null; };
  body.querySelectorAll('.pzpiece').forEach(p=>{
    p.addEventListener('dragstart',()=>{dragged=p;p.classList.add('dragging')});
    p.addEventListener('dragend',()=>p.classList.remove('dragging'));
    p.addEventListener('touchstart',()=>{dragged=p;p.classList.add('dragging')},{passive:true});
    p.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const z=el&&el.closest('.pzslot, .pztray');if(z){z.classList.contains('pzslot')?toSlot(z):toTray();}p.classList.remove('dragging')});
  });
  body.querySelectorAll('.pzslot').forEach(slot=>{
    slot.addEventListener('dragover',e=>{e.preventDefault();slot.classList.add('over')});
    slot.addEventListener('dragleave',()=>slot.classList.remove('over'));
    slot.addEventListener('drop',e=>{e.preventDefault();slot.classList.remove('over');toSlot(slot)});
  });
  tray.addEventListener('dragover',e=>{e.preventDefault();tray.classList.add('over')});
  tray.addEventListener('dragleave',()=>tray.classList.remove('over'));
  tray.addEventListener('drop',e=>{e.preventDefault();tray.classList.remove('over');toTray()});
  body.querySelector('.btn-check').onclick=()=>{
    let ok=0;const ss=body.querySelectorAll('.pzslot');
    ss.forEach(s=>{const p=s.querySelector('.pzpiece');
      if(p&&+p.dataset.i===+s.dataset.i){s.classList.add('correct');s.classList.remove('wrong');ok++;}
      else{s.classList.remove('correct');if(p)s.classList.add('wrong');else s.classList.remove('wrong');}});
    if(ok===n){ board.classList.add('solved'); qWin(fb,'🧩 أحسنت! ركّبت الصورة كاملة',3); }
    else qFail(fb,`راجع القطع — الصحيح ${arNum(ok)} من ${arNum(n)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderPuzzle(q,body,fb);
}

/* ⑧ ملء الفراغ بالسحب (fill-blank): text فيه علامات {} للفراغات + answers[] + distractors[]
   الطالب يسحب الكلمة المناسبة من البنك إلى كل فراغ (فأرة + لمس)؛ نقر الفراغ يفرّغه */
function renderFillBlank(q, body, fb){
  const parts=q.text.split('{}');
  const n=parts.length-1; // عدد الفراغات
  let sentence='<p class="fbtext">';
  parts.forEach((seg,i)=>{
    sentence+=`<span class="fbseg">${seg}</span>`;
    if(i<n) sentence+=`<span class="blank" data-i="${i}" data-answer="${q.answers[i]}">______</span>`;
  });
  sentence+='</p>';
  const bankWords=shuffle(q.answers.concat(q.distractors||[]));
  body.innerHTML=`<div class="fill">${sentence}`+
    `<div class="bank fillbank"><div class="bt">الكلمات:</div><div class="chips">`+
    bankWords.map(w=>`<div class="chip" draggable="true" data-w="${w}">${w}</div>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  let dragged=null;
  const used=()=>{const p=[...body.querySelectorAll('.blank')].map(b=>b.dataset.placed).filter(Boolean);
    body.querySelectorAll('.chip').forEach(c=>c.classList.toggle('used',p.includes(c.dataset.w)));};
  const fill=bl=>{ if(!dragged)return; bl.textContent=dragged.dataset.w; bl.dataset.placed=dragged.dataset.w;
    bl.classList.add('filled'); bl.classList.remove('correct','wrong'); used(); dragged=null; };
  body.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const bl=el&&el.closest('.blank');if(bl)fill(bl);chip.classList.remove('dragging')});
  });
  body.querySelectorAll('.blank').forEach(bl=>{
    bl.addEventListener('dragover',e=>{e.preventDefault();bl.classList.add('over')});
    bl.addEventListener('dragleave',()=>bl.classList.remove('over'));
    bl.addEventListener('drop',e=>{e.preventDefault();bl.classList.remove('over');fill(bl)});
    // نقر فراغ ممتلئ يفرّغه (يعيد الكلمة للبنك)
    bl.addEventListener('click',()=>{ if(bl.dataset.placed){ bl.textContent='______'; delete bl.dataset.placed; bl.classList.remove('filled','correct','wrong'); used(); }});
  });
  body.querySelector('.btn-check').onclick=()=>{
    const bls=body.querySelectorAll('.blank'); let ok=0;
    bls.forEach(bl=>{ if(bl.dataset.placed===bl.dataset.answer){bl.classList.add('correct');bl.classList.remove('wrong');ok++;}
      else{bl.classList.add('wrong');bl.classList.remove('correct');} });
    if(ok===bls.length) qWin(fb,'🎉 أحسنت! كل الفراغات صحيحة',3);
    else qFail(fb,`راجع الفراغات — الصحيح ${arNum(ok)} من ${arNum(bls.length)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderFillBlank(q,body,fb);
}

/* ⑨ الاستبعاد (الدخيل): options[] + answer (فهرس العنصر الدخيل) — الطالب يضغط العنصر الذي لا ينتمي
   reason (اختياري): سبب عدم انتماء الدخيل، يُعرض عند الإجابة الصحيحة. الخيارات تُخلط تلقائياً */
function renderExclude(q, body, fb){
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  body.innerHTML=`<div class="excl">`+opts.map(x=>`<button class="excl-opt" data-i="${x.idx}">${x.o}</button>`).join('')+`</div>`;
  let done=false;
  body.querySelectorAll('.excl-opt').forEach(btn=>{btn.onclick=()=>{
    if(done)return;
    if(+btn.dataset.i===q.answer){done=true;btn.classList.add('correct');body.querySelectorAll('.excl-opt').forEach(b=>b.disabled=true);qWin(fb, q.reason ? '🎉 أحسنت! هذا هو الدخيل — '+q.reason : '🎉 أحسنت! هذا هو الدخيل',2);}
    else{btn.classList.add('wrong');btn.disabled=true;qFail(fb,'هذا العنصر ينتمي للمجموعة، ابحث عن الدخيل');}
  };});
}

/* ⑩ ترتيب الحروف (arrange): word (الكلمة الصحيحة) + letters[] (اختياري، الحروف المبعثرة)
   الطالب يسحب كل حرف من البنك إلى خانته بالترتيب (قراءة يمين→يسار) لتكوين الكلمة.
   الحروف تُعرض **منفصلة (مفردة)** أثناء الترتيب — أوضح للأطفال وأبسط؛ وعند الترتيب الصحيح
   تُكشف **الكلمة كاملة متّصلة** كي يرى الطفل شكلها النهائي.
   تُحرّك بطاقة الحرف نفسها إلى الخانة (تدعم الحروف المكرّرة)؛ نقر الخانة الممتلئة يعيد الحرف للبنك.
   يعمل بالسحب (فأرة + لمس على السبورة). عند التحقّق: الحرف الصحيح أخضر والخاطئ أحمر */
function renderArrange(q, body, fb){
  const target=Array.from(q.word);                                   // الترتيب الصحيح للحروف
  const scatter=(q.letters && q.letters.length) ? q.letters.slice() : target.slice();
  const n=target.length;
  // خلط الحروف بحيث لا يبدأ البنك بالترتيب الصحيح
  let bank=shuffle(scatter);
  if(n>1){ let g=0; while(bank.every((c,i)=>c===target[i]) && g++<20) bank=shuffle(scatter); }
  let cells='';
  for(let i=0;i<n;i++) cells+=`<span class="lslot" data-i="${i}" data-answer="${target[i]}"></span>`;
  body.innerHTML=`<div class="arrange"><div class="lslots">${cells}</div>`+
    `<div class="bank arrbank"><div class="bt">الحروف:</div><div class="chips lbank">`+
    bank.map(c=>`<div class="chip lchip" draggable="true" data-w="${c}">${c}</div>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  let dragged=null, done=false;
  const bankEl=body.querySelector('.lbank');
  const clearMark=()=>body.querySelectorAll('.lchip').forEach(c=>c.classList.remove('ok','no'));
  // إسقاط حرف في خانة: إن كانت ممتلئة يُعاد حرفها السابق للبنك أولاً
  const place=slot=>{ if(!dragged)return; const ex=slot.querySelector('.lchip');
    if(ex && ex!==dragged) bankEl.appendChild(ex); slot.appendChild(dragged); clearMark(); dragged=null; };
  const toBank=()=>{ if(!dragged)return; bankEl.appendChild(dragged); clearMark(); dragged=null; };
  body.querySelectorAll('.lchip').forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const z=el&&el.closest('.lslot, .lbank');if(z){z.classList.contains('lslot')?place(z):toBank();}chip.classList.remove('dragging')});
  });
  body.querySelectorAll('.lslot').forEach(slot=>{
    slot.addEventListener('dragover',e=>{e.preventDefault();slot.classList.add('over')});
    slot.addEventListener('dragleave',()=>slot.classList.remove('over'));
    slot.addEventListener('drop',e=>{e.preventDefault();slot.classList.remove('over');place(slot)});
    // نقر الخانة الممتلئة يعيد حرفها للبنك
    slot.addEventListener('click',()=>{const c=slot.querySelector('.lchip'); if(c){bankEl.appendChild(c);clearMark();}});
  });
  bankEl.addEventListener('dragover',e=>{e.preventDefault();bankEl.classList.add('over')});
  bankEl.addEventListener('dragleave',()=>bankEl.classList.remove('over'));
  bankEl.addEventListener('drop',e=>{e.preventDefault();bankEl.classList.remove('over');toBank()});
  body.querySelector('.btn-check').onclick=()=>{
    if(done)return;
    const slots=body.querySelectorAll('.lslot'); let ok=0;
    slots.forEach(s=>{const c=s.querySelector('.lchip');
      if(c && c.dataset.w===s.dataset.answer){c.classList.add('ok');c.classList.remove('no');ok++;}
      else if(c){c.classList.add('no');c.classList.remove('ok');} });
    if(ok===n){
      done=true;
      qWin(fb,'🎉 أحسنت! كوّنت الكلمة: '+q.word,3);
      // كشف الكلمة كاملة متّصلة بعد أن رتّب الطفل حروفها منفصلة
      const wrap=body.querySelector('.lslots');
      if(wrap) wrap.innerHTML=`<span class="lword">${q.word}</span>`;
    }
    else qFail(fb,`راجع الترتيب — الصحيح ${arNum(ok)} من ${arNum(n)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderArrange(q,body,fb);
}

/* ⑪ الخريطة الذهنية الناقصة (mindmap): center + branches[{label, answer}] + distractors[]
   عقدة مركزية تتفرّع إلى فروع، لكلّ فرع عنوان ثابت وخانة فارغة يسحب إليها الطالب الكلمة الصحيحة
   من البنك (فأرة + لمس على السبورة). تُرسم خطوط منحنية من المركز إلى كل فرع وتُحدَّث ديناميكياً.
   تُحرّك بطاقة الكلمة نفسها إلى الخانة (تدعم التكرار)؛ نقر الخانة الممتلئة يعيد كلمتها للبنك.
   عند التحقّق: الخانة الصحيحة خضراء والخاطئة حمراء */
function renderMindmap(q, body, fb){
  const branches=q.branches||[];
  const bankWords=shuffle(branches.map(b=>b.answer).concat(q.distractors||[]));
  const branchesHtml=branches.map((b,i)=>
    `<div class="mm-branch"><div class="mm-label">${b.label}</div>`+
    `<div class="mm-slot" data-i="${i}" data-answer="${b.answer}"></div></div>`).join('');
  body.innerHTML=`<div class="mindmap"><div class="mm-stage">`+
    `<svg class="mmlines"></svg>`+
    `<div class="mm-center">${q.center||''}</div>`+
    `<div class="mm-branches">${branchesHtml}</div></div>`+
    `<div class="bank mmbank"><div class="bt">الكلمات:</div><div class="chips mmchips">`+
    bankWords.map(w=>`<div class="chip mmchip" draggable="true" data-w="${w}">${w}</div>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  // رسم خطوط منحنية من أسفل العقدة المركزية إلى أعلى كل فرع (دقيقة على كل الأحجام)
  const stage=body.querySelector('.mm-stage'), svg=body.querySelector('.mmlines'), center=body.querySelector('.mm-center');
  const NS='http://www.w3.org/2000/svg';
  function redraw(){
    const sr=stage.getBoundingClientRect(); if(!sr.width) return;
    const cr=center.getBoundingClientRect();
    const cx=cr.left+cr.width/2-sr.left, cy=cr.bottom-sr.top;
    svg.innerHTML='';
    body.querySelectorAll('.mm-branch').forEach(br=>{
      const rr=br.getBoundingClientRect();
      const bx=rr.left+rr.width/2-sr.left, by=rr.top-sr.top, my=(cy+by)/2;
      const ln=document.createElementNS(NS,'path');
      ln.setAttribute('d',`M ${cx} ${cy} C ${cx} ${my}, ${bx} ${my}, ${bx} ${by}`);
      ln.setAttribute('class','mmline'); ln.setAttribute('fill','none');
      svg.appendChild(ln);
    });
  }
  if(window.ResizeObserver){ new ResizeObserver(redraw).observe(stage); }
  setTimeout(redraw,60);
  // السحب (كنمط arrange/classify): تحريك بطاقة الكلمة إلى الخانة
  let dragged=null;
  const bankEl=body.querySelector('.mmchips');
  const clearMark=()=>body.querySelectorAll('.mmchip').forEach(c=>c.classList.remove('ok','no'));
  const place=slot=>{ if(!dragged)return; const ex=slot.querySelector('.mmchip');
    if(ex && ex!==dragged) bankEl.appendChild(ex); slot.appendChild(dragged); clearMark(); dragged=null; setTimeout(redraw,0); };
  const toBank=()=>{ if(!dragged)return; bankEl.appendChild(dragged); clearMark(); dragged=null; setTimeout(redraw,0); };
  body.querySelectorAll('.mmchip').forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const z=el&&el.closest('.mm-slot, .mmchips');if(z){z.classList.contains('mm-slot')?place(z):toBank();}chip.classList.remove('dragging')});
  });
  body.querySelectorAll('.mm-slot').forEach(slot=>{
    slot.addEventListener('dragover',e=>{e.preventDefault();slot.classList.add('over')});
    slot.addEventListener('dragleave',()=>slot.classList.remove('over'));
    slot.addEventListener('drop',e=>{e.preventDefault();slot.classList.remove('over');place(slot)});
    // نقر الخانة الممتلئة يعيد كلمتها للبنك
    slot.addEventListener('click',()=>{const c=slot.querySelector('.mmchip'); if(c){bankEl.appendChild(c);clearMark();setTimeout(redraw,0);}});
  });
  bankEl.addEventListener('dragover',e=>{e.preventDefault();bankEl.classList.add('over')});
  bankEl.addEventListener('dragleave',()=>bankEl.classList.remove('over'));
  bankEl.addEventListener('drop',e=>{e.preventDefault();bankEl.classList.remove('over');toBank()});
  body.querySelector('.btn-check').onclick=()=>{
    const slots=body.querySelectorAll('.mm-slot'); let ok=0;
    slots.forEach(s=>{const c=s.querySelector('.mmchip');
      if(c && c.dataset.w===s.dataset.answer){c.classList.add('ok');c.classList.remove('no');ok++;}
      else if(c){c.classList.add('no');c.classList.remove('ok');} });
    if(ok===slots.length && slots.length) qWin(fb,'🎉 أحسنت! أكملت الخريطة الذهنية',3);
    else qFail(fb,`راجع الفروع — الصحيح ${arNum(ok)} من ${arNum(slots.length)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderMindmap(q,body,fb);
}

/* ⑬ الشريط المتدرّج (slider): شريط أفقي بمؤشّر يسحبه الطالب لتحديد قيمة رقمية على تدريج مرئيّ.
   min/max حدّا الشريط، answer القيمة الصحيحة، tolerance هامش القبول (±) لأن اللمس على السبورة
   غير دقيق. step خطوة الحركة (الافتراضي ١)، unit لاحقة العرض (مثل °)، ticks مسافة التدريج الكبير.
   الشريط dir:ltr كي تتصاعد الأرقام يساراً→يميناً كمسطرة، بينما تبقى بقيّة الواجهة RTL.
   يعمل بالسحب (فأرة + لمس على السبورة) والنقر على الشريط ينقل المؤشّر مباشرةً. عناصر كبيرة
   وأرقام واضحة تناسب اللمس. عند التحقّق: |القيمة − الصحيحة| ≤ tolerance → فوز (المؤشّر أخضر)،
   وإلّا تلميح إن كانت أصغر أو أكبر من المطلوب.
   الصوت: qWin/qFail يشغّلان correct.mp3/wrong.mp3 ويخضعان لزرّ الكتم العامّ. */
function renderSlider(q, body, fb){
  const min=+q.min, max=+q.max, span=max-min;
  const step=q.step||1;
  const tol=(q.tolerance!=null)?+q.tolerance:0;
  const unit=q.unit||'';
  // مسافة التدريج الكبير: من البيانات أو نحو ٦ فترات افتراضياً
  const tickStep=q.ticks||Math.max(step,Math.round(span/6));
  // علامات التدريج وأرقامها الكبيرة على طول الشريط
  let ticks='';
  for(let v=min; v<=max+1e-9; v+=tickStep){
    const r=(v-min)/span*100;
    ticks+=`<span class="sld-tick" style="left:${r}%"></span>`+
           `<span class="sld-tlabel" style="left:${r}%">${arNum(Math.round(v))}${unit}</span>`;
  }
  body.innerHTML=`<div class="slider">`+
    `<div class="sld-value">القيمة المختارة: <b class="sld-num"></b></div>`+
    `<div class="sld-scale" dir="ltr">`+
      `<div class="sld-track">`+
        `<div class="sld-fill"></div>`+
        `<div class="sld-ticks">${ticks}</div>`+
        `<button class="sld-thumb" type="button" aria-label="مؤشّر الشريط">≡</button>`+
      `</div>`+
      `<div class="sld-ends"><span>${arNum(min)}${unit}</span><span>${arNum(max)}${unit}</span></div>`+
    `</div>`+
    `</div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const track=body.querySelector('.sld-track'), thumb=body.querySelector('.sld-thumb');
  const fill=body.querySelector('.sld-fill'), numEl=body.querySelector('.sld-num');
  let val=min, done=false, dragging=false;
  const clamp=v=>Math.max(min,Math.min(max,v));
  function setVal(v){
    val=clamp(Math.round(v/step)*step);
    const r=(val-min)/span*100;
    thumb.style.left=r+'%'; fill.style.width=r+'%'; numEl.textContent=arNum(val)+unit;
  }
  function fromX(clientX){ const rc=track.getBoundingClientRect(); if(!rc.width)return; setVal(min+(clientX-rc.left)/rc.width*span); }
  // السحب: تُضاف مستمعات الحركة عند البدء وتُزال عند الإفلات (بلا تسريب)
  function onMouseMove(e){ if(dragging) fromX(e.clientX); }
  function onTouchMove(e){ if(dragging){ fromX(e.touches[0].clientX); e.preventDefault(); } }
  function endDrag(){ dragging=false; thumb.classList.remove('grab');
    window.removeEventListener('mousemove',onMouseMove); window.removeEventListener('mouseup',endDrag);
    window.removeEventListener('touchmove',onTouchMove); window.removeEventListener('touchend',endDrag); }
  function startDrag(clientX){ if(done)return; dragging=true; thumb.classList.add('grab'); if(clientX!=null) fromX(clientX);
    window.addEventListener('mousemove',onMouseMove); window.addEventListener('mouseup',endDrag);
    window.addEventListener('touchmove',onTouchMove,{passive:false}); window.addEventListener('touchend',endDrag); }
  track.addEventListener('mousedown',e=>{ e.preventDefault(); startDrag(e.clientX); });
  track.addEventListener('touchstart',e=>{ startDrag(e.touches[0].clientX); },{passive:true});
  // القيمة الابتدائية في منتصف الشريط (لا تبدأ عند الإجابة)
  setVal((min+max)/2);
  body.querySelector('.btn-check').onclick=()=>{
    if(done)return;
    if(Math.abs(val-q.answer)<=tol){
      done=true; thumb.classList.add('correct'); endDrag();
      qWin(fb,'🎯 أحسنت! القيمة صحيحة — '+arNum(q.answer)+unit,2);
    } else {
      qFail(fb, val<q.answer ? 'القيمة أصغر من المطلوب، حرّك المؤشّر يميناً قليلاً' : 'القيمة أكبر من المطلوب، حرّك المؤشّر يساراً قليلاً');
    }
  };
  body.querySelector('.btn-reset').onclick=()=>renderSlider(q,body,fb);
}

/* ⑱ بطاقات الذاكرة (memory): pairs[{a,b}] — كل زوج يولّد بطاقتين تشتركان في مفتاح (فهرس الزوج).
   تُخلط البطاقات مقلوبة في شبكة. يقلب الطالب بطاقتين في كل دور: إن تطابقتا (نفس المفتاح) تبقيان
   مكشوفتين (صوت correct.mp3 + نجمة)، وإلا تُقلبان ثانيةً بعد لحظة (صوت wrong.mp3). ينتهي السؤال
   عند كشف كل الأزواج. نسخة نصية (مطابقة كلمة بكلمة) لا تحتاج صوراً؛ بطاقات كبيرة تناسب اللمس على
   السبورة واتجاه RTL. الصوت عبر playCorrectSound/playWrongSound وqWin خاضعاً لزرّ الكتم العامّ. */
function renderMemory(q, body, fb){
  // كل زوج → بطاقتان تشتركان في مفتاح k (فهرس الزوج)، ثم تُخلط كل البطاقات مقلوبة
  const cards=shuffle(q.pairs.reduce((a,p,i)=>a.concat([{k:i,t:p.a},{k:i,t:p.b}]),[]));
  const cols=cards.length<=6?3:4;   // شبكة تناسب العدد (٦ بطاقات ← ٣ أعمدة، ٨ ← ٤)
  const total=q.pairs.length;
  body.innerHTML=`<div class="memory">`+
    `<div class="memgrid" style="grid-template-columns:repeat(${cols},1fr)">`+
    cards.map(c=>
      `<button class="memcard" type="button" data-k="${c.k}">`+
        `<span class="memface memback">🎴</span>`+
        `<span class="memface memfront">${c.t}</span>`+
      `</button>`).join('')+
    `</div>`+
    `<div class="actions"><button class="btn btn-reset">إعادة ↺</button></div>`;
  let first=null, lock=false, matched=0;
  body.querySelectorAll('.memcard').forEach(card=>{ card.onclick=()=>{
    // تجاهل النقر أثناء قلب زوج غير متطابق، أو على بطاقة مكشوفة/متطابقة
    if(lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped'); speak(card.querySelector('.memfront').textContent);
    if(!first){ first=card; return; }           // البطاقة الأولى في الدور
    if(first.dataset.k===card.dataset.k){        // تطابق: تبقى البطاقتان مكشوفتين
      first.classList.add('matched'); card.classList.add('matched');
      first=null; matched++; playCorrectSound(); addStar(1); bumpStreak();
      if(matched===total) qWin(fb,'🎉 أحسنت! كشفت كل الأزواج',3);
    }else{                                        // عدم تطابق: تُقلب البطاقتان ثانيةً بعد لحظة
      lock=true; const a=first, b=card; first=null; playWrongSound();
      setTimeout(()=>{ a.classList.remove('flipped'); b.classList.remove('flipped'); lock=false; },900);
    }
  };});
  body.querySelector('.btn-reset').onclick=()=>renderMemory(q,body,fb);
}

/* ===== إقلاع ===== */
// أسئلة الدرس تُبنى عند فتحه (renderQuestions)؛ الصفوف والكتب تنتظر البيانات

loadData().then(function(d){
  DATA = d;
  setTheme('theme-home');
  buildTerms();
  buildGrades();
  buildBooks();
}).catch(function(err){
  console.error('فشل تحميل البيانات:', err);
  const books = document.getElementById('books');
  if(books) books.innerHTML =
    '<div class="empty">تعذّر تحميل البيانات. شغّل المشروع عبر الخادم المحلي (start-server.bat) أو تأكد من وجود ملف js/data.js</div>';
});
