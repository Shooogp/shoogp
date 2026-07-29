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

/* ===== الحالة والصوت ===== */
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
// نظام المكافأة هو رحلة الصاروخ (js/rocket.js) — أُزيل نظام النجوم/السلسلة نهائياً

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
// عند مغادرة شاشة النشاط: أزل مسار الصاروخ
function leaveRocket(){document.body.classList.remove('rocket-mode');if(window.RocketJourney)RocketJourney.unmount();}
function goHome(){leaveRocket();setTheme('theme-home');showScreen('home');}
function backToLessons(){leaveRocket();showScreen('lessonsScreen');}

/* ═══════════════ محرّك الأسئلة الموحّد (خمسة أنواع) ═══════════════ */
function shuffle(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);}

// تغذية راجعة موحّدة: نجاح (صوت صحيح + رفع الصاروخ) / إخفاق (اختناق المحرّك + انزلاق)
// المكافأة هي رحلة الصاروخ (onAnswer)؛ أُزيل نظام النجوم — الوسيط stars مُهمَل (للتوافق فقط)
function qWin(fb,msg,stars){fb.textContent=msg||'🎉 أحسنت!';fb.className='fb qfb good';playCorrectSound();if(window.RocketJourney)RocketJourney.onAnswer(true);}
// عند الخطأ: يُكتم wrong.mp3 ما دام الصاروخ مركَّباً (اختناق المحرّك هو تنبيه الخطأ)؛
// أي واجهة بلا صاروخ تُبقي wrong.mp3 يعمل (بقية دروس المنصّة كلها تحوي الصاروخ الآن)
function qFail(fb,msg){fb.textContent=msg||'حاول مرة أخرى';fb.className='fb qfb bad';if(!(window.RocketJourney&&RocketJourney.isActive&&RocketJourney.isActive()))playWrongSound();if(window.RocketJourney)RocketJourney.onAnswer(false);}

const Q_LABEL={'drag-drop':'🌿 سحب وإفلات','matching':'🔗 توصيل','mcq':'✅ اختيار من متعدد','true-false':'⚖️ صواب أو خطأ','hotspot':'🎯 تحديد الأجزاء','sequence':'🔢 ترتيب تسلسلي','classify':'🗂️ تصنيف','fill-blank':'✏️ ملء الفراغ','exclude':'🚫 الاستبعاد','arrange':'🔤 ترتيب الحروف','mindmap':'🧠 خريطة ذهنية','find-error':'🔍 اكتشف الخطأ','audio-q':'🔊 سؤال صوتي','zoom-reveal':'🔎 تكبير تدريجي','color':'🎨 تلوين بالتعليمات','puzzle':'🧩 البازل','slider':'🎚️ الشريط المتدرج','memory':'🎴 بطاقات الذاكرة','lens':'🔍 العدسة المكبّرة','equation-builder':'🧮 بناء المعادلة','number-line':'📏 خط الأعداد','hundred-chart':'💯 لوحة المائة'};

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
  const R={'drag-drop':renderDragDrop,'matching':renderMatching,'mcq':renderMcq,'true-false':renderTrueFalse,'hotspot':renderHotspot,'sequence':renderSequence,'classify':renderClassify,'fill-blank':renderFillBlank,'exclude':renderExclude,'arrange':renderArrange,'mindmap':renderMindmap,'find-error':renderFindError,'audio-q':renderAudioQ,'zoom-reveal':renderZoom,'color':renderColor,'puzzle':renderPuzzle,'slider':renderSlider,'memory':renderMemory,'lens':renderLens,'equation-builder':renderEquationBuilder,'number-line':renderNumberLine,'hundred-chart':renderHundredChart};

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

  // ── رحلة الصاروخ: نظام المكافأة الافتراضيّ لكل الدروس (المعادلة تتكيّف مع عدد الأسئلة) ──
  const actSub = document.querySelector('#activityScreen .screen-sub');
  if(window.RocketJourney){
    document.body.classList.add('rocket-mode');
    if(actSub) actSub.textContent='أجب عن الأسئلة وأطلق صاروخك إلى القمر 🚀';
    RocketJourney.mount(host, total);
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
      // أُزيل سطر «مجموع نجومك» (النجوم مُستبدَلة برحلة الصاروخ) — بقية التقرير كما هي
      (good===total ? '<p class="qresult-cheer">ممتاز! أكملت كل الأسئلة 🌟</p>'
                    : '<p class="qresult-cheer">أحسنت! يمكنك الرجوع وإكمال ما تبقّى.</p>')+
      '</div>';
    if(good===total) speak('أحسنت، أكملت كل الأسئلة');
    window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
  };
  show(0);
}

/* عتبة «عرضية» لأسئلة السحب والإفلات ذات نقاط الارتساء: النسبة = عرض÷ارتفاع.
   الصورة العرضية (ar ≥ DND_WIDE_AR) → البطاقات صفّ أفقيّ في الأعلى والصورة بالعرض
   الكامل أسفلها (فلا يقتطع العمود الجانبيُّ عرضَها فتظهر صغيرة)؛ الطولية/المربّعة →
   العمود الجانبي كما هو. احتياط: إن التفّ صفّ البطاقات إلى أكثر من سطرين رجعنا للعمود. */
const DND_WIDE_AR = 1.2;
function dndSvgAR(svgStr){
  const m=/viewBox\s*=\s*["']\s*[-\d.eE]+\s+[-\d.eE]+\s+([\d.eE]+)\s+([\d.eE]+)/.exec(svgStr||'');
  if(m){ const w=parseFloat(m[1]), h=parseFloat(m[2]); if(w>0&&h>0) return w/h; }
  return null;
}
/* ── الحدّ الأدنى لعرض مسرح الصورة: مُشتَقّ من هندسة السؤال نفسه لا رقمٌ سحريّ ──
   صناديق الإفلات تُوضَع بنسبة مئوية من عرض *المسرح* مع translate(-50%)، فالصندوق
   الأقرب إلى الحافّة يخرج عن المسرح ما لم يكن:
        عرض المسرح ≥ عرض الصندوق ÷ (٢ × نسبة أقرب صندوق إلى الحافّة)
   قياسٌ حيّ على أسئلة العلوم الخمسة يعطي المطلوب: 388 · 351 · 275 · 177 · 169px،
   وأقصاها 388px — وهو ما يفسّر أنّ «الهياكل العظمية» (مسرحه 391px) نجا بـ3px فقط
   بينما «الهيكل العظمي للإنسان» (196px) انهار. نحسبها لكل سؤال بدل تثبيت رقم،
   فتصحّ لأي سؤال يُؤلَّف لاحقاً مهما كانت مواضعه، وDND_MIN_STAGE أرضيةٌ احتياطية. */
const DND_MIN_STAGE = 300;
function dndStageNeed(dnd){
  const stage=dnd.querySelector('.stage'); if(!stage) return DND_MIN_STAGE;
  let edge=.5, wmax=0;
  dnd.querySelectorAll('.target').forEach(t=>{
    const x=parseFloat(t.style.left);                 // نسبة الصندوق من عرض المسرح
    if(!isNaN(x)) edge=Math.min(edge, Math.min(x,100-x)/100);
    const keep=t.textContent;                          // أسوأ الحالات: بنصّ إجابته
    t.textContent=t.dataset.answer||keep;
    wmax=Math.max(wmax, t.getBoundingClientRect().width);
    t.textContent=keep;
  });
  if(!wmax || edge<=0) return DND_MIN_STAGE;
  const z=(window.ShoogpFit&&ShoogpFit.zoom)||1;
  return Math.max(DND_MIN_STAGE, (wmax/z)/(2*edge));
}
/* حارس خنق الصورة.
   **لا يقيس المسرح الحاليّ** — بل يحسب العرض الذي *سيؤول* إليه المسرح في تخطيط
   العمودين من عرض الحاوية: `عرض .dnd − (عمود البطاقات 260 + الفجوة 24)`. والسبب
   أنّ عرض المسرح الفعليّ يمرّ بقيمٍ عابرةٍ ضيّقةٍ قبل أن تستقرّ خوارزمية الإطار،
   فقياسه مباشرةً كان يقلب أسئلةً سليمةً إلى الصفّ الأفقيّ بناءً على لحظةٍ عابرة
   (رُصد فعلاً على «الهياكل العظمية»). الحساب من عرض الحاوية ثابتٌ ولا يخدعه العبور.
   وللمنع من التذبذب: العودة إلى العمودين تشترط فائضاً 15% فوق الحاجة (هستيريسيس)،
   ولا تقع أصلاً إن كانت نسبة الصورة هي التي فرضت الصفّ (arWide). */
const DND_BANK_COL = 260 + 24;      // عمود البطاقات + الفجوة (مطابق لـ.dnd في style.css)
function dndStageGuard(dnd){
  if(!dnd) return;
  const need=dndStageNeed(dnd);
  const z=(window.ShoogpFit&&ShoogpFit.zoom)||1;
  const colStage=dnd.getBoundingClientRect().width/z - DND_BANK_COL;
  if(colStage < need) dnd.classList.add('dnd-wide');
  else if(dnd.dataset.arWide!=='1' && colStage >= need*1.15) dnd.classList.remove('dnd-wide');
  dndCapStage(dnd, need);
}
/* سقف عرض المسرح للصور الطولية في الصفّ الأفقيّ.
   الصفّ يمنح المسرح عرض النافذة كاملاً، فتبتعد صناديق الوسم عن صورةٍ طوليّةٍ ضيّقة
   (محكومةٌ بارتفاع المسرح لا بعرضه) فتبدو سابحةً بعيداً عنها رغم الخيوط الواصلة.
   المرجع المقيس: الحالة السليمة «الهياكل العظمية» — أقصى بُعد صندوق عن مركز الصورة
   = 84% من عرض الصورة. وبما أنّ البُعد = (٥٠٪ − نسبة الحافّة) × عرض المسرح، يكون:
        عرض المسرح ≤ 0.84 × عرض الصورة ÷ (٥٠٪ − نسبة الحافّة)  ≈ 2.5 × عرض الصورة
   ولا ينزل السقف تحت الحاجة أبداً (منع الخروج مقدَّم على التنسيق).
   لا يُطبَّق على الصور العرضية: عرضها يتبع المسرح فيلاحقه السقف بلا معنى. */
function dndCapStage(dnd, need){
  const stage=dnd.querySelector('.stage'), im=dnd.querySelector('.labelimg');
  if(!stage||!im) return;
  if(!dnd.classList.contains('dnd-wide') || dnd.dataset.arWide==='1'){ stage.style.maxWidth=''; return; }
  const z=(window.ShoogpFit&&ShoogpFit.zoom)||1;
  const iw=im.getBoundingClientRect().width/z; if(!iw) return;
  const cap=Math.max(need, 2.5*iw);
  const v=Math.round(cap)+'px';
  if(stage.style.maxWidth!==v) stage.style.maxWidth=v;   // لا كتابة بلا تغيّر (لا حلقة مع المراقب)
}
function applyDndLayout(dnd, ar){
  if(!dnd) return;
  let wide = ar!=null && ar >= DND_WIDE_AR;
  dnd.classList.toggle('dnd-wide', wide);
  if(wide){                         // احتياط: صفّ بطاقات يتجاوز سطرين → عُد للعمود الجانبي
    const tops={};
    dnd.querySelectorAll('.bank .chip').forEach(c=>{ tops[Math.round(c.offsetTop)]=1; });
    if(Object.keys(tops).length>2){ dnd.classList.remove('dnd-wide'); wide=false; }
  }
  dnd.dataset.arWide = wide ? '1' : '0';   // قرار النسبة، ليعرف الحارس ما يجوز نقضه
  dndStageGuard(dnd);
}

/* ① سحب وإفلات: targets[{answer,x,y}] + خلفية image/svg */
function renderDragDrop(q, body, fb){
  let dragged=null;
  // الوسط: صورة تُحجّم مباشرةً (تظهر كاملة لكل النِسَب) أو رسم SVG داخل غلاف
  // fit:"width" للرسوم/الصور العريضة (كخط الأعداد): تملأ العرض ويُشتقّ ارتفاعها من نسبتها
  const wideCls = q.fit==='width' ? ' lw' : '';
  const media = q.svg ? `<div class="labelimg${wideCls}">${q.svg}</div>` : `<img class="labelimg${wideCls}" src="${q.image}" alt="">`;
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
  const dndEl=body.querySelector('.dnd');
  const SVGNS='http://www.w3.org/2000/svg';
  // اختيار اتجاه التخطيط حسب نسبة الصورة (SVG فوراً من viewBox، والصورة عند تحميلها)
  function relayout(){
    let ar=null;
    if(q.svg) ar=dndSvgAR(q.svg);
    else if(imgEl && imgEl.naturalWidth && imgEl.naturalHeight) ar=imgEl.naturalWidth/imgEl.naturalHeight;
    applyDndLayout(dndEl, ar);
  }
  function redraw(){
    const R=window.fitRect||(el=>el.getBoundingClientRect());   // مستطيل بالفضاء التصميميّ (واعٍ بـ zoom)
    const sr=R(stage); if(!sr.width||!imgEl) return;
    const ir=R(imgEl);
    body.querySelectorAll('.dnd-dot').forEach(dot=>{
      dot.style.left=(ir.left-sr.left + (+dot.dataset.x)/100*ir.width)+'px';
      dot.style.top =(ir.top -sr.top  + (+dot.dataset.y)/100*ir.height)+'px';
    });
    svg.innerHTML='';
    body.querySelectorAll('.target').forEach(bx=>{
      const dot=body.querySelector('.dnd-dot[data-i="'+bx.dataset.i+'"]'); if(!dot) return;
      const br=R(bx), dr=R(dot);
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
  /* مراقب أبعاد المسرح: يعيد رسم الخيوط، **ويعيد فحص خنق الصورة** — لأنّ عرض المسرح
     لا يستقرّ إلا بعد أن تختار خوارزمية الإطار مقاسها وتضبطه، أي بعد relayout الأول.
     الحارس رتيب (يضيف ولا يزيل) فلا يتذبذب مع هذا المراقب. */
  if(window.ResizeObserver){ new ResizeObserver(()=>{ redraw(); dndStageGuard(dndEl); }).observe(stage); }
  if(q.svg) relayout();                                   // نسبة الـSVG معروفة فوراً (قبل اختيار الإطار)
  if(imgEl && imgEl.tagName==='IMG'){
    if(imgEl.complete && imgEl.naturalWidth) relayout();  // صورة مخبّأة: قرّر فوراً
    imgEl.addEventListener('load',()=>{ relayout(); redraw(); });  // وإلا عند التحميل (وشبكة الأمان تعيد اختيار الإطار)
  }
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
    const R=window.fitRect||(el=>el.getBoundingClientRect());   // مستطيل بالفضاء التصميميّ (واعٍ بـ zoom)
    const wr=R(wrap), ra=R(a), rb=R(b);
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
      if(sel.dataset.k===pr.a){drawLink(sel,d);sel.classList.add('matched');d.classList.add('matched');sel.classList.remove('selected');sel=null;done++;playCorrectSound();
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
  // لوحة ألوان: دلو طلاء طفوليّ مرسوم SVG — جسمه ثابت، والطلاء (السطح والانسكاب والقطرات)
  // يأخذ لون خيار السؤال تلقائياً فيعمل مع أيّ لون دون أصول جديدة.
  const bucket=color=>`<span class="bucket-wrap"><svg class="bucket-ic" viewBox="0 0 56 56" aria-hidden="true">`+
    // المقبض (ثابت)
    `<path d="M15 19 Q28 4 41 19" fill="none" stroke="#9a8259" stroke-width="3" stroke-linecap="round"/>`+
    // جسم الدلو الممتلئ مستدير الحواف (ثابت)
    `<path d="M11 20 C9 31 11 42 15 47 Q28 54 41 47 C45 42 47 31 45 20 Z" fill="#e2e8ee" stroke="#5b4a2f" stroke-width="2.6" stroke-linejoin="round"/>`+
    // حلقة الحافة (ثابت)
    `<ellipse cx="28" cy="20" rx="17" ry="5.4" fill="#eef2f6" stroke="#5b4a2f" stroke-width="2.6"/>`+
    // سطح الطلاء داخل الفتحة (لون الخيار)
    `<ellipse cx="28" cy="20" rx="13" ry="3.7" fill="${color}"/>`+
    // انسكاب الطلاء فوق الحافة الأمامية (لون الخيار)
    `<path d="M17 22 C11 25 10 34 14 40 C17 44 23 42 22 35 C21 30 23 25 23 22 Z" fill="${color}"/>`+
    // قطرة منسكبة (لون الخيار)
    `<path d="M15 42 q-2.6 4.4 0 6.6 q2.6 -2.2 0 -6.6 Z" fill="${color}"/>`+
    // قطرة متطايرة (لون الخيار)
    `<circle cx="20" cy="49" r="2.1" fill="${color}"/>`+
    `</svg></span>`;
  const swatches=q.palette.map(p=>
    `<button class="cswatch" type="button" data-color="${p.color}" title="${p.name}">`+
      bucket(p.color)+
      `<span class="cswatch-name">${p.name}</span></button>`).join('');
  // شارات المفردات: المفردة وحدها دون اسم اللون أو أيقونته (كي لا تُكشف الإجابة)
  const instr=q.parts.map(pt=>`<span class="cinstr">${pt.name}</span>`).join('');
  body.innerHTML=
    `<div class="colorq">`+
      `<div class="cpalette">${swatches}</div>`+
      `<div class="cinstrbar">${instr}</div>`+
      `<div class="dnd dnd-solo"><div class="stage stage-img"${q.bg?` style="background:${q.bg}"`:''}>`+
        `<div class="figwrap csvg">${q.svg}</div>`+
      `</div></div>`+
    `</div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const area=body.querySelector('.csvg');
  let chosen=null;
  // اختيار دلو طلاء من اللوحة: يفعّل حالة الرفع (لمس) وفرشاة المؤشّر (حاسوب)
  body.querySelectorAll('.cswatch').forEach(sw=>{ sw.onclick=()=>{
    body.querySelectorAll('.cswatch').forEach(x=>x.classList.remove('sel'));
    sw.classList.add('sel'); chosen=sw.dataset.color;
    if(area) area.classList.add('brushing');
    speak(sw.querySelector('.cswatch-name').textContent);
  };});
  // تلوين جزء عند الضغط (بعد اختيار لون)
  body.querySelectorAll('.cpart').forEach(part=>{
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
  /* حجم قطع الصينية: **من عرض عمود الصينية** لا من خانة اللوح.
     ربطُه بالخانة كان يجعل الصينية تكبر مع اللوح فتنكسر إلى صفّين ويطول السؤال؛
     ولا حاجة للتطابق أصلاً، فالقطعة تملأ الخانة عند إسقاطها (`.pzslot .pzpiece`).
     **نسبة القطعة محفوظة تماماً**: نأخذ نسبة الخانة ونضرب فيها العرض المحسوب،
     فلا تشويه مهما تغيّر العرض. وحدٌّ أدنى 60px للبُعد الأكبر (قاعدة اللمس §٨). */
  function sizePieces(){ const s=board.querySelector('.pzslot'); if(!s)return;
    /* نسبة القطعة تُشتقّ من **نسبة الصورة والشبكة** لا من صندوق الخانة: حدود الخانة
       (2px) وحدود القطعة (1px) تدخل في `clientHeight` على نحوٍ غير متماثل فتنحرف
       النسبة ~2% (قِيس 0.653 بدل 0.667). هذا الاشتقاق يعطي النسبة بالضبط. */
    const ar=(pzAR>0)? (rows/cols)/pzAR : 1.5;   // ارتفاع ÷ عرض للقطعة الواحدة
    const gap=10, TRAY_COLS=3;                   // مطابقٌ لـ.pztray في style.css
    const colW=tray.clientWidth || 220;
    let pw=Math.floor((colW-gap*(TRAY_COLS-1))/TRAY_COLS);
    if(pw*Math.max(1,ar)<60) pw=Math.ceil(60/Math.max(1,ar));   // لا ينزل البُعد الأكبر عن 60px
    tray.style.setProperty('--pw', pw+'px');
    tray.style.setProperty('--ph', Math.round(pw*ar)+'px'); }
  /* ── سقف ارتفاع اللوح: يمنع سقوط السؤال إلى الحاوية المرنة qflex ──
     صورة البازل قد تكون طوليّة (‏1024×1536 هنا)، فكلّما وُسّع اللوح **طال**. ومع
     الصينية تحته كان مجموع الارتفاع يتجاوز أطول إطار فيسقط السؤال إلى qflex،
     وعندها تُحاط صورة الإطار letterbox فيخرج المحتوى عن الرمل ويُقصّ أعلى الإطار.
     الحلّ: عرض اللوح = **سقف الارتفاع × نسبة الصورة**، مقيَّداً بالعرض المتاح —
     فالنسبة محفوظة بالضبط والارتفاع مضمون. */
  const PZ_BOARD_MAX_H = 430;      // بكسل تصميميّ (يقابل صينية 3×3 بارتفاع ~375)
  const PZ_BANK_COL    = 240;      // عمود الصينية 220 + الفجوة 20
  let pzAR = 1;                    // عرض ÷ ارتفاع لصورة البازل
  function fitBoard(){
    const wrap=body.querySelector('.puzzle'); if(!wrap) return;
    const avail=wrap.clientWidth-PZ_BANK_COL;
    const w=Math.max(160, Math.min(avail>0?avail:160, PZ_BOARD_MAX_H*pzAR));
    const v=Math.round(w)+'px';
    if(board.style.width!==v) board.style.width=v;
  }
  const probe=new Image();
  probe.onload=()=>{ if(probe.naturalWidth){ pzAR=probe.naturalWidth/probe.naturalHeight;
      board.style.aspectRatio=probe.naturalWidth+'/'+probe.naturalHeight; }
    fitBoard(); sizePieces(); };
  probe.src=q.image;
  if(window.ResizeObserver){
    new ResizeObserver(sizePieces).observe(board);
    /* نراقب الغلاف لا اللوح: كتابتنا لعرض اللوح تُطلق مراقبه فتنشأ حلقة */
    const wrap=body.querySelector('.puzzle'); if(wrap) new ResizeObserver(fitBoard).observe(wrap);
  }
  setTimeout(()=>{ fitBoard(); sizePieces(); },60);
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

/* ═══ بنك البطاقات المشترك (wireBank) ═══
   منطق «بنك بطاقات ← خانات» مكتوبٌ **مرّة واحدة** يعمل مع كل نوع يستعمله: كان أصلاً
   داخل `renderFillBlank` فاستُخرج كما هو ليتقاسمه `fill-blank` و`equation-builder`
   (وأيّ نوع لاحق) بلا تكرار — نفس السحب بالفأرة واللمس، ونفس تفريغ الخانة بالنقر.
   زيادتان على الأصل تخدمان السبورة والأعداد المكرّرة:
   • **النقر للسبورة:** نقر البطاقة يختارها (`.picked`) ثم نقر الخانة يضعها فيها —
     الإصبع على السبورة أدقّ في النقر منه في السحب (قاعدة lesson-authoring).
   • **الوسم بالهوية لا بالقيمة:** كل بطاقة تحمل `data-cid` فريداً والخانة تخزّنه،
     فبطاقتا «٣» في بنك معادلة لا تُشطبان معاً عند استعمال إحداهما (الأصل كان يقارن
     النصّ فيشطب كل ما يساويه — لا يظهر في العلوم لأنّ كلماتها لا تتكرّر).
   الوسائط: `chip` محدِّد البطاقة، `slot` محدِّد الخانة، `empty` نصّ الخانة الفارغة،
   `onChange` نداءٌ بعد كل تغيير. تُرجع `{sync, clearSlot}`. */
function wireBank(body, o){
  o=o||{};
  const chipSel=o.chip||'.chip', slotSel=o.slot||'.blank', empty=(o.empty!=null)?o.empty:'______';
  const chips=[].slice.call(body.querySelectorAll(chipSel));
  chips.forEach((c,i)=>{ c.dataset.cid=String(i); });
  let dragged=null, picked=null;
  // شطب البطاقات المستعملة: بالهوية (cid) لا بالنصّ، فتصحّ مع القيم المكرّرة
  function sync(){
    const held={};
    body.querySelectorAll(slotSel).forEach(sl=>{ if(sl.dataset.cid!=null&&sl.dataset.cid!=='') held[sl.dataset.cid]=1; });
    chips.forEach(c=>c.classList.toggle('used', !!held[c.dataset.cid]));
  }
  function pick(c){ if(picked&&picked!==c) picked.classList.remove('picked');
    picked=(c&&picked!==c)?c:null; if(picked) picked.classList.add('picked'); }
  function put(sl, chip){
    if(!chip||!sl) return;
    sl.textContent=chip.dataset.w; sl.dataset.placed=chip.dataset.w; sl.dataset.cid=chip.dataset.cid;
    sl.classList.add('filled'); sl.classList.remove('correct','wrong','over');
    dragged=null; pick(null); sync(); if(o.onChange) o.onChange();
  }
  function clearSlot(sl){
    if(!sl||!sl.dataset.placed) return;
    sl.textContent=empty; delete sl.dataset.placed; delete sl.dataset.cid;
    sl.classList.remove('filled','correct','wrong'); sync(); if(o.onChange) o.onChange();
  }
  chips.forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);
      const sl=el&&el.closest(slotSel); if(sl) put(sl,chip); chip.classList.remove('dragging')});
    chip.addEventListener('click',()=>{ if(!chip.classList.contains('used')) pick(chip); });
  });
  body.querySelectorAll(slotSel).forEach(sl=>{
    sl.addEventListener('dragover',e=>{e.preventDefault();sl.classList.add('over')});
    sl.addEventListener('dragleave',()=>sl.classList.remove('over'));
    sl.addEventListener('drop',e=>{e.preventDefault();sl.classList.remove('over');put(sl,dragged)});
    // بطاقة مختارة → وضعها؛ وإلا فنقر الخانة الممتلئة يفرّغها (يعيد بطاقتها للبنك)
    sl.addEventListener('click',()=>{ if(picked) put(sl,picked); else clearSlot(sl); });
  });
  sync();
  return { sync:sync, clearSlot:clearSlot };
}

/* ⑧ ملء الفراغ بالسحب (fill-blank): text فيه علامات {} للفراغات + answers[] + distractors[]
   الطالب يسحب الكلمة المناسبة من البنك إلى كل فراغ (فأرة + لمس)؛ نقر الفراغ يفرّغه.
   منطق البنك مشترك في `wireBank` أعلاه (يتقاسمه مع `equation-builder`) */
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
  wireBank(body, { chip:'.chip', slot:'.blank', empty:'______' });
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
    const R=window.fitRect||(el=>el.getBoundingClientRect());   // مستطيل بالفضاء التصميميّ (واعٍ بـ zoom)
    const sr=R(stage); if(!sr.width) return;
    const cr=R(center);
    const cx=cr.left+cr.width/2-sr.left, cy=cr.bottom-sr.top;
    svg.innerHTML='';
    body.querySelectorAll('.mm-branch').forEach(br=>{
      const rr=R(br);
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
      first=null; matched++; playCorrectSound();
      if(matched===total) qWin(fb,'🎉 أحسنت! كشفت كل الأزواج',3);
    }else{                                        // عدم تطابق: تُقلب البطاقتان ثانيةً بعد لحظة
      lock=true; const a=first, b=card; first=null; playWrongSound();
      setTimeout(()=>{ a.classList.remove('flipped'); b.classList.remove('flipped'); lock=false; },900);
    }
  };});
  body.querySelector('.btn-reset').onclick=()=>renderMemory(q,body,fb);
}

/* ⑲ العدسة المكبّرة (lens): صورتان PNG متطابقتا الأبعاد — image العلوية (المشهد الظاهر)
   وhidden السفلية (الطبقة الخفية) — والعدسة دائرة clip-path قطرها ~160px بمقبض واضح،
   تُسحب بالفأرة واللمس معاً (الاستخدام الأساسي سبورة تفاعلية بالأصابع) فتكشف السفلية
   أينما تحرّكت. spots[{label,x,y,r}] العناصر المخفية (نِسَب مئوية كنمط hotspot).
   الطالب يضغط العنصر وهو ظاهر داخل العدسة: صحيح = صوت النجاح + يثبت العنصر مكشوفاً
   بتسميته + تقدّم عدّاد «اكتشفت … من …»؛ خاطئ = تغذية الخطأ المعتمدة (qFail: اختناق
   محرّك الصاروخ، وwrong.mp3 في واجهة بلا صاروخ). يكتمل السؤال باكتشاف كل العناصر. */
function renderLens(q, body, fb){
  const R=80;      // نصف قطر فتحة العدسة بالبكسل (قطر ~160px يناسب أصابع السبورة)
  // إطار العدسة صورة "عدسة-إطار.png" (فتحة شفافة الجوف): دائرة الكشف تطابق الفتحة تماماً
  // موقعاً وقطراً (التحجيم والإزاحة في CSS مشتقّان من قياس الصورة: مركز الفتحة 746,484
  // ونصف قطرها 371px من أصل 1254px). المسك = جسم الإطار: حلقة R→RING_OUT + كبسولة المقبض.
  const RING_OUT=100;                                    // نصف القطر الخارجي للحلقة (بعد التحجيم)
  const HANDLE={ax:-68,ay:73,bx:-149,by:154,hw:24};      // كبسولة المقبض نسبةً لمركز الفتحة (px)
  function onFrame(dx,dy){                               // هل النقطة على جسم الإطار (حلقة/مقبض)؟
    const d=Math.hypot(dx,dy);
    if(d>=R-4 && d<=RING_OUT+4) return true;
    const vx=HANDLE.bx-HANDLE.ax, vy=HANDLE.by-HANDLE.ay;
    const t=Math.max(0,Math.min(1,((dx-HANDLE.ax)*vx+(dy-HANDLE.ay)*vy)/(vx*vx+vy*vy)));
    return Math.hypot(dx-(HANDLE.ax+vx*t), dy-(HANDLE.ay+vy*t))<=HANDLE.hw;
  }
  const spots=q.spots||[];
  const figCls=q.fit==='width' ? 'figwrap fw lensfig' : 'figwrap lensfig';
  body.innerHTML=`<div class="lensq">`+
    `<div class="lens-progress">اكتشفت <b class="lens-count">٠</b> من <b>${arNum(spots.length)}</b></div>`+
    `<div class="dnd dnd-solo"><div class="stage stage-img"${q.bg?` style="background:${q.bg}"`:''}>`+
      `<div class="${figCls}">`+
        `<img class="lens-top" src="${q.image}" alt="">`+
        `<div class="lens-reveal"><img class="lens-under" src="${q.hidden}" alt=""></div>`+
        `<div class="lens-found"></div>`+
        `<div class="lens-glass"><img class="lens-frame" src="images/عدسة-إطار.png" alt=""></div>`+
      `</div>`+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-reset">إعادة ↺</button></div>`;
  const fig=body.querySelector('.lensfig'), glass=body.querySelector('.lens-glass');
  const reveal=body.querySelector('.lens-reveal'), foundLayer=body.querySelector('.lens-found');
  const countEl=body.querySelector('.lens-count'), topImg=body.querySelector('.lens-top');
  let lx=76, ly=80;                // موضع مركز العدسة % (تبدأ أسفل المشهد كي يظهر كاملاً)
  let found=0, done=false;
  const foundSet={};
  // رسم العدسة: يضع الزجاج على مركزها ويقصّ الطبقة الخفية بدائرتها (يُعاد مع كل حركة/تغيّر حجم)
  function draw(){
    const w=fig.clientWidth, h=fig.clientHeight; if(!w||!h) return;
    const cx=lx/100*w, cy=ly/100*h;
    glass.style.left=cx+'px'; glass.style.top=cy+'px';
    reveal.style.clipPath='circle('+R+'px at '+cx+'px '+cy+'px)';
  }
  if(window.ResizeObserver){ new ResizeObserver(draw).observe(fig); }
  topImg.addEventListener('load',draw);
  setTimeout(draw,60);
  // هل النقطة (px,py) داخل العنصر؟ — دائرته الرئيسة أو البديلة alt (للأعضاء المزدوجة كالذراعين)
  function hitSpot(sp,px,py){
    if(Math.hypot(px-sp.x,py-sp.y)<=(sp.r||10)) return true;
    return !!(sp.alt && Math.hypot(px-sp.alt.x,py-sp.alt.y)<=(sp.alt.r||sp.r||10));
  }
  // تثبيت عنصر مكتشف: دائرة كشف دائمة حول موضعه (بنِسَب مئوية تصمد مع تغيّر الحجم) + تسميته
  function fixSpot(i){
    const sp=spots[i]; foundSet[i]=true;
    [sp, sp.alt].filter(Boolean).forEach(c=>{
      const d=document.createElement('div'); d.className='lens-spot';
      d.style.clipPath='circle('+((c.r||sp.r||10)*1.35)+'% at '+c.x+'% '+c.y+'%)';
      d.innerHTML=`<img class="lens-under" src="${q.hidden}" alt="">`;
      foundLayer.appendChild(d);
    });
    const lb=document.createElement('span');
    lb.className='lens-label'+(sp.labelBelow?' below':'');   // below: التسمية أسفل العنصر (لتفادي تزاحم التسميات المتجاورة)
    lb.style.left=sp.x+'%'; lb.style.top=sp.y+'%'; lb.textContent=sp.label;
    foundLayer.appendChild(lb);
  }
  // السحب (فأرة + لمس، كنمط الشريط المتدرّج) — والنقرة القصيرة دون حركة تُحتسب إجابة
  let dragging=false, moved=false, sx=0, sy=0, offX=0, offY=0;
  const rel=(cx,cy)=>{ const r=fig.getBoundingClientRect(); return {x:cx-r.left, y:cy-r.top, w:r.width, h:r.height}; };
  function start(cx,cy){
    const p=rel(cx,cy); if(!p.w) return;
    moved=false; sx=p.x; sy=p.y;
    const dx=p.x-lx/100*p.w, dy=p.y-ly/100*p.h;
    if(Math.hypot(dx,dy)<=R || onFrame(dx,dy)){
      dragging=true; offX=lx/100*p.w-p.x; offY=ly/100*p.h-p.y; glass.classList.add('grab');
      window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',end);
      window.addEventListener('touchmove',onTouchMove,{passive:false}); window.addEventListener('touchend',end);
    }
  }
  function track(cx,cy){
    const p=rel(cx,cy); if(!p.w) return;
    if(Math.hypot(p.x-sx,p.y-sy)>7) moved=true;
    lx=Math.max(0,Math.min(100,(p.x+offX)/p.w*100));
    ly=Math.max(0,Math.min(100,(p.y+offY)/p.h*100));
    draw();
  }
  function onMove(e){ if(dragging) track(e.clientX,e.clientY); }
  function onTouchMove(e){ if(dragging){ track(e.touches[0].clientX,e.touches[0].clientY); e.preventDefault(); } }
  function end(){ dragging=false; glass.classList.remove('grab');
    window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',end);
    window.removeEventListener('touchmove',onTouchMove); window.removeEventListener('touchend',end); }
  fig.addEventListener('mousedown',e=>{ e.preventDefault(); start(e.clientX,e.clientY); });
  fig.addEventListener('touchstart',e=>{ start(e.touches[0].clientX,e.touches[0].clientY); },{passive:true});
  // النقر = محاولة إجابة (بعد استبعاد سحبات العدسة ومسكات إطارها/مقبضها)
  fig.addEventListener('click',e=>{
    if(done || moved) return;                        // moved: كانت سحبة عدسة لا نقرة
    const p=rel(e.clientX,e.clientY); if(!p.w) return;
    const px=p.x/p.w*100, py=p.y/p.h*100;
    if(px<0||px>100||py<0||py>100) return;
    const dx=p.x-lx/100*p.w, dy=p.y-ly/100*p.h;
    const distLens=Math.hypot(dx,dy);
    if(distLens>R && onFrame(dx,dy)) return;         // نقرة على جسم الإطار/المقبض: مسك لا إجابة
    let hit=-1;
    spots.forEach((sp,i)=>{ if(hit<0 && !foundSet[i] && hitSpot(sp,px,py)) hit=i; });
    if(hit>=0 && distLens<=R){                       // العنصر مضغوط وهو ظاهر داخل العدسة
      fixSpot(hit); found++; countEl.textContent=arNum(found);
      speak(spots[hit].label);
      if(found===spots.length){ done=true; qWin(fb,'🎉 أحسنت! اكتشفت كل العناصر الخفية',3); }
      else{ playCorrectSound();
        fb.textContent='🔍 أحسنت! اكتشفت: '+spots[hit].label; fb.className='fb qfb'; }
    } else {
      qFail(fb, distLens<=R ? 'ليس هذا هو المطلوب — دقّق فيما يظهر داخل العدسة'
                            : 'حرّك العدسة فوق الصورة لتكشف ما تحتها ثم اضغط عليه');
    }
  });
  body.querySelector('.btn-reset').onclick=()=>renderLens(q,body,fb);
}

/* ═══ أدوات عددية مشتركة لأنواع الرياضيات ═══
   الأرقام في بيانات الأسئلة تُكتب هندية (٣ ٤ ٥) كما تُقرأ على الشاشة، والحساب يحتاجها
   لاتينية — فالتحويل في اتجاهين هنا مرّة واحدة بدل تكراره في كل نوع. */
const AR_DIGITS='٠١٢٣٤٥٦٧٨٩';
function toLatinNum(s){ return String(s).replace(/[٠-٩]/g,d=>String(AR_DIGITS.indexOf(d))).replace(/[٫،]/g,'.'); }
function numOf(s){ const v=parseFloat(toLatinNum(String(s).trim())); return isNaN(v)?null:v; }
/* رموز العمليات المقبولة في بناء المعادلة (الطرح بعلامة «−» الرياضية أو «-» العادية) */
const EQ_OPS={'+':1,'−':1,'-':1,'×':1,'÷':1,'=':1,'<':1,'>':1};
function isEqOp(t){ return EQ_OPS[String(t).trim()]===1; }

/* ═══ محرّك الشبكة والتدريج المشترك (NumGrid) ═══
   تتقاسمه أنواع الرياضيات الثلاثة: خط الأعداد ولوحة المائة والمصفوفات — يكتب المنطق
   مرّة واحدة (بناء التدريج، بناء شبكة الأعداد، تحويل إحداثيات الحدث إلى فضاء الرسم،
   والتقاط أقرب علامة). كل الرسوم SVG داخل الكود بلا صور خارجية. */
const SVG_NS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs,txt){
  const e=document.createElementNS(SVG_NS,tag);
  for(const k in attrs) e.setAttribute(k,attrs[k]);
  if(txt!=null) e.textContent=txt;
  return e;
}
/* علامات التدريج على مدى [min,max] بخطوة step: كل علامة {v,i,major}
   و`labelEvery` = كل كم خطوةٍ تحمل العلامةُ رقماً (1 = كلّها) */
function scaleTicks(min,max,step,labelEvery){
  const st=Math.abs(+step)||1, every=Math.max(1,Math.round(+labelEvery||1)), out=[];
  const n=Math.round((max-min)/st);
  for(let i=0;i<=n;i++){
    const v=+(min+i*st).toFixed(10);
    out.push({v:v, i:i, major:(i%every===0)});
  }
  return out;
}
/* موضع قيمة على محور مرسوم بين x0 وx1 (وعكسه) */
function scalePos(v,min,max,x0,x1){ return x0+(v-min)/(max-min)*(x1-x0); }
function scaleVal(x,min,max,x0,x1){ return min+(x-x0)/(x1-x0)*(max-min); }
/* شبكة أعداد متّصلة من from إلى to بعدد أعمدة columns → خلايا {v,r,c} + عدد الصفوف.
   الأعمدة تُملأ **من اليمين إلى اليسار** (اتجاه القراءة العربي): العمود ٠ أقصى اليمين. */
function numCells(from,to,columns){
  const cols=Math.max(1,Math.round(+columns||10)), cells=[];
  const n=Math.max(0,Math.round(to-from))+1;
  for(let k=0;k<n;k++) cells.push({v:from+k, r:Math.floor(k/cols), c:k%cols});
  return {cells:cells, cols:cols, rows:Math.ceil(n/cols)};
}
/* إحداثيات حدث الفأرة/اللمس داخل فضاء الـviewBox — عبر مصفوفة الشاشة المقلوبة،
   فتصحّ مع زوم الجذر ومع أيّ تحجيم للإطار بلا حساب يدويّ لعوامل المقياس. */
function svgPoint(svg, clientX, clientY){
  const m=svg.getScreenCTM(); if(!m) return null;
  const p=svg.createSVGPoint(); p.x=clientX; p.y=clientY;
  const q=p.matrixTransform(m.inverse());
  return {x:q.x, y:q.y};
}
/* يربط النقر واللمس والسحب على رسم SVG بدالّة واحدة تستقبل نقطة بفضاء الرسم.
   `onMove` (اختياري) للسحب المتواصل، و`onDown` للنقرة/بداية السحب. */
function svgPointer(svg, onDown, onMove){
  let live=false;
  const at=(cx,cy)=>svgPoint(svg,cx,cy);
  function down(cx,cy){ const p=at(cx,cy); if(!p) return; live=true; onDown(p); }
  function move(cx,cy){ if(!live||!onMove) return; const p=at(cx,cy); if(p) onMove(p); }
  function up(){ live=false;
    window.removeEventListener('mousemove',mm); window.removeEventListener('mouseup',up);
    window.removeEventListener('touchmove',tm); window.removeEventListener('touchend',up); }
  function mm(e){ move(e.clientX,e.clientY); }
  function tm(e){ if(live){ move(e.touches[0].clientX,e.touches[0].clientY); e.preventDefault(); } }
  svg.addEventListener('mousedown',e=>{ e.preventDefault(); down(e.clientX,e.clientY);
    window.addEventListener('mousemove',mm); window.addEventListener('mouseup',up); });
  svg.addEventListener('touchstart',e=>{ down(e.touches[0].clientX,e.touches[0].clientY);
    window.addEventListener('touchmove',tm,{passive:false}); window.addEventListener('touchend',up); },{passive:true});
}
/* مقارنة مجموعتَي أعداد (للتحقّق على مجموعة خلايا لا على خلية واحدة) */
function sameNumSet(a,b){
  const A=[...new Set(a)].sort((x,y)=>x-y), B=[...new Set(b)].sort((x,y)=>x-y);
  return A.length===B.length && A.every((v,i)=>v===B[i]);
}

/* ㉑ خط الأعداد (number-line): min/max/step/labelEvery لضبط التدريج + mode
   ثلاثة أوضاع — place (وضع عدد على الخط)، jump (القفز بالعدّ)، round (التقريب لأقرب عشرة).
   التفاعل: نقر التدريجة أو سحب المؤشّر إليها (فأرة + لمس)، مع tolerance لمساحة الخطأ.
   الرسم SVG بالكامل من محرّك التدريج المشترك أعلاه. */
function renderNumberLine(q, body, fb){
  const min=+q.min, max=+q.max, step=Math.abs(+q.step)||1;
  const mode=q.mode||'place';
  const tol=(q.tolerance!=null)?Math.abs(+q.tolerance):0;
  const ticks=scaleTicks(min,max,step,q.labelEvery||1);
  // مساحة الرسم: عريضة بطبعها، والهوامش تتّسع لأرقام التدريج ولقوس القفز فوق الخط
  // الهوامش ضيّقة عمداً: عرض النافذة المقيس ~483px هو كل ما يتاح للخط، فكل بكسل هامشٍ
  // يقتطع من تباعد التدريجات — وهو ما يحكم دقّة اللمس على السبورة
  const W=900, H=260, X0=46, X1=854, Y=170;
  const jump=q.jump||{}, jStart=+jump.start||min, jSize=Math.abs(+jump.size)||step, jCount=Math.max(1,Math.round(+jump.count||1));
  const roundTo=Math.abs(+q.roundTo)||10;
  const answer = mode==='round' ? Math.round((+q.target)/roundTo)*roundTo
               : mode==='jump'  ? jStart+jSize*jCount
               : +q.target;
  const px=v=>scalePos(v,min,max,X0,X1);
  // ── بناء الرسم ──
  let marks='';
  ticks.forEach(t=>{
    const x=px(t.v), h=t.major?26:14;
    marks+=`<line class="nl-tick${t.major?' nl-major':''}" x1="${x}" y1="${Y-h}" x2="${x}" y2="${Y+h}"></line>`;
    if(t.major) marks+=`<text class="nl-num" x="${x}" y="${Y+64}">${arNum(t.v)}</text>`;
  });
  // في وضع التقريب: العدد المطلوب تقريبُه معلَّمٌ ثابتاً على الخط ليقارن الطالب بُعده عن العشرتين
  let fixed='';
  if(mode==='round'){
    const tx=px(+q.target);
    fixed=`<g class="nl-given"><line x1="${tx}" y1="${Y-64}" x2="${tx}" y2="${Y}"></line>`+
      `<circle cx="${tx}" cy="${Y}" r="11"></circle>`+
      `<text x="${tx}" y="${Y-76}">${arNum(+q.target)}</text></g>`;
  }
  const showMarker = (mode!=='jump');
  /* المؤشّر: كبسولة عرضها 128 وحدة (~64px تصميميّ بعد التحجيم) برأسٍ مدبّب يلمس الخط.
     وهو **مؤشّر لا مقبض**: مساحة اللمس هي لوح الرسم كلّه (نقرة في أي موضع تنقله)، كما
     أنّ .hs-mark في «تحديد الأجزاء» علامةُ عرضٍ لا هدفَ لمس — فلا يسري عليه حدّ 60px. */
  const MT=Y-136;                                   // قمّة الكبسولة
  const marker = showMarker ? `<g class="nl-marker" transform="translate(${px(min)},0)">`+
      `<path class="nl-mhead" d="M -50 ${MT} h 100 a 14 14 0 0 1 14 14 v 74 a 14 14 0 0 1 -14 14 h -34 l -16 18 l -16 -18 h -34 a 14 14 0 0 1 -14 -14 v -74 a 14 14 0 0 1 14 -14 z"></path>`+
      `<circle class="nl-mdot" cx="0" cy="${Y}" r="12"></circle>`+
      `<text class="nl-mval" x="0" y="${MT+72}"></text></g>` : '';
  const actions = (mode==='jump')
    ? `<div class="actions"><button class="btn btn-reset">إعادة ↺</button></div>`
    : `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  body.innerHTML=`<div class="numline">`+
    (mode==='jump'?`<div class="nl-progress">القَفَزاتُ: <b>٠</b> من <b>${arNum(jCount)}</b></div>`:'')+
    `<svg class="nlsvg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">`+
      `<line class="nl-axis" x1="${X0-24}" y1="${Y}" x2="${X1+24}" y2="${Y}"></line>`+
      `<g class="nl-jumps"></g>${marks}${fixed}${marker}`+
    `</svg></div>${actions}`;
  const svg=body.querySelector('.nlsvg');
  const mk=body.querySelector('.nl-marker'), mval=body.querySelector('.nl-mval');
  const jumpsG=body.querySelector('.nl-jumps');
  let val=min, done=false, jDone=0;
  function setVal(v){
    // الالتقاط إلى أقرب تدريجة: اللمس على السبورة غير دقيق فلا تُترك القيمة بين علامتين
    const snapped=Math.max(min,Math.min(max, min+Math.round((v-min)/step)*step));
    val=+snapped.toFixed(10);
    if(mk){ mk.setAttribute('transform','translate('+px(val)+',0)'); mval.textContent=arNum(val); }
  }
  // قوس قفزة واحدة من a إلى b فوق الخط، بسهم ومقدار القفزة
  function drawJump(a,b){
    const xa=px(a), xb=px(b), mx=(xa+xb)/2, top=Y-84;
    jumpsG.appendChild(svgEl('path',{class:'nl-arc',d:`M ${xa} ${Y-14} Q ${mx} ${top} ${xb} ${Y-14}`,fill:'none'}));
    jumpsG.appendChild(svgEl('path',{class:'nl-arrow',d:`M ${xb} ${Y-10} l -9 -13 l 18 0 z`}));
    jumpsG.appendChild(svgEl('text',{class:'nl-arclabel',x:mx,y:top+6},'+'+arNum(jSize)));
    jumpsG.appendChild(svgEl('circle',{class:'nl-jdot',cx:xb,cy:Y,r:10}));
  }
  if(mode==='jump'){
    jumpsG.appendChild(svgEl('circle',{class:'nl-jdot nl-jstart',cx:px(jStart),cy:Y,r:12}));
    jumpsG.appendChild(svgEl('text',{class:'nl-jlabel',x:px(jStart),y:Y+96},'البداية'));
  } else setVal(min);
  // ── التفاعل: نقر التدريجة أو سحب المؤشّر إليها ──
  function pointAt(p){
    if(done) return;
    const v=scaleVal(p.x,min,max,X0,X1);
    if(mode==='jump'){
      const snapped=Math.max(min,Math.min(max, min+Math.round((v-min)/step)*step));
      const want=jStart+jSize*(jDone+1);
      if(Math.abs(snapped-want)<=Math.max(tol,step/2)){
        drawJump(jStart+jSize*jDone, want); jDone++;
        const pr=body.querySelector('.nl-progress b'); if(pr) pr.textContent=arNum(jDone);
        if(jDone===jCount){ done=true; qWin(fb,'🎉 أحسنت! وصلت بالقفز إلى '+arNum(answer),3); }
        else{ playCorrectSound(); fb.textContent='👍 قفزة صحيحة — تابع'; fb.className='fb qfb'; }
      } else qFail(fb,'ليست هذه القفزة — اقفز '+arNum(jSize)+' من آخر موضع وصلت إليه');
      return;
    }
    setVal(v);
  }
  svgPointer(svg, pointAt, p=>{ if(mode!=='jump') pointAt(p); });
  const chk=body.querySelector('.btn-check');
  if(chk) chk.onclick=()=>{
    if(done) return;
    if(Math.abs(val-answer)<=tol){
      done=true; if(mk) mk.classList.add('correct');
      qWin(fb, mode==='round' ? '🎯 أحسنت! '+arNum(+q.target)+' يُقرَّب إلى '+arNum(answer)
                              : '🎯 أحسنت! هذا موضع العدد '+arNum(answer), 3);
    } else qFail(fb, val<answer ? 'موضعك قبل المطلوب — تقدّم على الخط قليلاً'
                                : 'موضعك بعد المطلوب — تراجع على الخط قليلاً');
  };
  body.querySelector('.btn-reset').onclick=()=>renderNumberLine(q,body,fb);
}

/* ㉒ لوحة المائة (hundred-chart): شبكة من from إلى to بعدد أعمدة columns (افتراضياً ١٠)
   من محرّك الشبكة المشترك (numCells) — تُملأ الأعمدة من اليمين إلى اليسار باتجاه القراءة.
   ثلاثة أوضاع: multiples (تلوين مضاعفات عدد)، missing (ملء خلايا ناقصة من بنك بطاقات)،
   more-less (إيجاد الأكثر/الأقل بمقدار ١ أو ١٠). النقر يلوّن الخلية،
   و**التحقّق على مجموعة الخلايا لا على خلية واحدة** (sameNumSet). */
function renderHundredChart(q, body, fb){
  const from=Math.round(+q.from||1), to=Math.round(+q.to||100);
  const mode=q.mode||'multiples';
  const G=numCells(from,to,q.columns||10);
  const CELL=100, PAD=6;                                  // وحدات viewBox
  const W=G.cols*CELL, H=G.rows*CELL;
  const missing=(q.missing||[]).map(Number);
  const asks=(q.asks||[]).map(a=>({base:Math.round(+a.base), delta:Math.round(+a.delta)}));
  // مجموعة الإجابات الصحيحة لكل وضع
  let answers=[];
  if(mode==='multiples'){
    const m=Math.abs(Math.round(+q.multiple))||2;
    G.cells.forEach(c=>{ if(c.v%m===0) answers.push(c.v); });
  } else if(mode==='more-less'){
    answers=asks.map(a=>a.base+a.delta);
  } else answers=missing.slice();
  // ── بناء الشبكة ──
  const baseSet={}; asks.forEach(a=>baseSet[a.base]=1);
  let cellsHtml='';
  G.cells.forEach(c=>{
    const x=(G.cols-1-c.c)*CELL, y=c.r*CELL;              // العمود ٠ أقصى اليمين
    const blank=(mode==='missing' && missing.indexOf(c.v)>=0);
    const cls='hc-cell'+(blank?' hc-blank':'')+(baseSet[c.v]?' hc-base':'');
    /* مستطيلٌ شفّافٌ يملأ **كامل خطوة الخلية**: اختبار الإصابة في SVG يقع على الشكل
       المرسوم وحدَه، فلولاه لصار هدفُ اللمس هو المستطيلَ المرئيَّ المحشوَّ (‏52.8px
       تصميميّ) بدل خطوة الخلية كاملةً (‏60px) — أي فقدُ 12% من مساحة اللمس بلا سبب */
    cellsHtml+=`<g class="${cls}" data-v="${c.v}">`+
      `<rect class="hc-hit" x="${x}" y="${y}" width="${CELL}" height="${CELL}"></rect>`+
      `<rect class="hc-face" x="${x+PAD}" y="${y+PAD}" width="${CELL-PAD*2}" height="${CELL-PAD*2}" rx="14"></rect>`+
      `<text x="${x+CELL/2}" y="${y+CELL/2+16}">${blank?'':arNum(c.v)}</text></g>`;
  });
  // شريط تعليمات وضع الأكثر/الأقل: بطاقة لكل مطلوب فلا يحتاج المعلّم شرحاً شفهياً
  let bar='';
  if(mode==='more-less' && asks.length)
    bar=`<div class="hc-asks">`+asks.map(a=>
      `<span class="hc-ask"><b>${arNum(a.base)}</b> ← ${a.delta>0?'أكثرُ بـ':'أقلُّ بـ'}${arNum(Math.abs(a.delta))}</span>`).join('')+`</div>`;
  // بنك بطاقات الأعداد لوضع الخلايا الناقصة
  let bank='';
  if(mode==='missing')
    bank=`<div class="bank hcbank"><div class="bt">الأعداد:</div><div class="chips hcchips">`+
      shuffle(missing.concat(q.distractors||[]).map(Number)).map(v=>
        `<div class="chip hcchip" draggable="true" data-w="${arNum(v)}" data-v="${v}">${arNum(v)}</div>`).join('')+
      `</div></div>`;
  body.innerHTML=`<div class="hchart">${bar}`+
    `<svg class="hcsvg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${cellsHtml}</svg>`+
    `${bank}</div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const cellEls=[].slice.call(body.querySelectorAll('.hc-cell'));
  let done=false, picked=null;
  const sel={};                                            // الخلايا المختارة (multiples/more-less)
  const put={};                                            // العدد الموضوع في كل خلية ناقصة (missing)
  // ── وضع الخلايا الناقصة: اختر بطاقة ثم انقر الخانة (أو اسحبها إليها) ──
  function pick(c){ if(picked&&picked!==c) picked.classList.remove('picked');
    picked=(c&&picked!==c)?c:null; if(picked) picked.classList.add('picked'); }
  function syncChips(){
    const held={}; Object.keys(put).forEach(k=>{ if(put[k]!=null) held[put[k]]=1; });
    body.querySelectorAll('.hcchip').forEach(ch=>ch.classList.toggle('used', !!held[ch.dataset.v]));
  }
  function placeIn(g, chip){
    const t=g.querySelector('text'); t.textContent=chip.dataset.w;
    put[g.dataset.v]=+chip.dataset.v;
    g.classList.add('filled'); g.classList.remove('correct','wrong');
    pick(null); syncChips();
  }
  function clearCell(g){
    if(put[g.dataset.v]==null) return;
    g.querySelector('text').textContent=''; delete put[g.dataset.v];
    g.classList.remove('filled','correct','wrong'); syncChips();
  }
  body.querySelectorAll('.hcchip').forEach(chip=>{
    chip.addEventListener('click',()=>{ if(!chip.classList.contains('used')) pick(chip); });
    chip.addEventListener('touchstart',()=>{picked=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('dragstart',()=>{picked=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchend',e=>{ const t=e.changedTouches[0];
      const el=document.elementFromPoint(t.clientX,t.clientY);
      const g=el&&el.closest&&el.closest('.hc-blank'); if(g) placeIn(g,chip); chip.classList.remove('dragging'); });
  });
  // ── النقر على الخلايا ──
  cellEls.forEach(g=>{
    g.addEventListener('click',()=>{
      if(done) return;
      if(mode==='missing'){
        if(!g.classList.contains('hc-blank')) return;      // الخلايا المطبوعة ليست أهدافاً
        if(picked) placeIn(g,picked); else clearCell(g);
        return;
      }
      const v=+g.dataset.v;                                 // تلوين/إلغاء تلوين
      if(sel[v]){ delete sel[v]; g.classList.remove('picked-cell'); }
      else { sel[v]=1; g.classList.add('picked-cell'); }
      g.classList.remove('correct','wrong');
    });
  });
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    if(mode==='missing'){
      let ok=0;
      cellEls.forEach(g=>{ if(!g.classList.contains('hc-blank')) return;
        const good=(put[g.dataset.v]===+g.dataset.v);
        g.classList.toggle('correct',good); g.classList.toggle('wrong',!good); if(good) ok++; });
      if(ok===missing.length){ done=true; qWin(fb,'🎉 أحسنت! كل الخلايا الناقصة صحيحة',3); }
      else qFail(fb,`راجع الخلايا — الصحيح ${arNum(ok)} من ${arNum(missing.length)}`);
      return;
    }
    // التحقّق على **مجموعة** الخلايا: لا تكفي خلية صحيحة مع نقص أو زيادة
    const chosen=Object.keys(sel).map(Number);
    cellEls.forEach(g=>{ const v=+g.dataset.v;
      if(sel[v]) g.classList.toggle(answers.indexOf(v)>=0?'correct':'wrong',true); });
    if(sameNumSet(chosen,answers)){
      done=true;
      qWin(fb, mode==='multiples' ? '🎉 أحسنت! لوّنت كل المضاعفات ولم تزد عليها'
                                  : '🎉 أحسنت! وجدت كل الأعداد المطلوبة', 3);
    } else {
      const hit=chosen.filter(v=>answers.indexOf(v)>=0).length;
      const extra=chosen.length-hit;
      qFail(fb, extra ? `الصحيح ${arNum(hit)} من ${arNum(answers.length)}، ولديك ${arNum(extra)} خلية زائدة`
                      : `الصحيح ${arNum(hit)} من ${arNum(answers.length)} — أكمل الباقي`);
    }
  };
  body.querySelector('.btn-reset').onclick=()=>renderHundredChart(q,body,fb);
}

/* ⑳ بناء المعادلة (equation-builder): tokens[] فيها "__" لكل خانة فارغة + bank[] + answers[]
   المعادلة صفٌّ من رموز ثابتة وخانات فارغة، وبنك بطاقات أرقام ورموز (+ − =) تُسحب إليها
   (أو تُنقر البطاقة ثم الخانة — أدقّ على السبورة). منطق البنك مشترك في `wireBank`
   (هو نفسه منطق `fill-blank` بلا تكرار). وضعان:
   • `fill` — إكمال الناتج أو المجهول: كل خانة تُقارَن بـ`answers[i]` بترتيب الخانات.
   • `equivalence` — الحكم على تكافؤ طرفَي «=»: يُقبل **أيُّ ملءٍ يجعل الطرفين متساويين**
     (لا الإجابة النموذجية وحدها)، وهو معنى التكافؤ لا التطابق النصّي؛ و`answers` تبقى
     الإجابة النموذجية للمراجعة. الحساب يحترم أسبقية × ÷ على + −.
   الصوت وزر الكتم والصاروخ عبر qWin/qFail كسائر الأنواع. */
function renderEquationBuilder(q, body, fb){
  const toks=q.tokens||[];
  const mode=q.mode||'fill';
  const answers=q.answers||[];
  let si=0;
  const row=toks.map(t=>{
    const s=String(t);
    if(s==='__'){ const i=si++;
      return `<span class="blank eqslot" data-i="${i}" data-answer="${answers[i]!=null?answers[i]:''}">؟</span>`; }
    return `<span class="eqtok ${isEqOp(s)?'eqop':'eqnum'}">${s}</span>`;
  }).join('');
  const nSlots=si;
  body.innerHTML=`<div class="eqb"><div class="eqrow">${row}</div>`+
    `<div class="bank eqbank"><div class="bt">البطاقات:</div><div class="chips eqchips">`+
    shuffle((q.bank||[]).slice()).map(w=>`<div class="chip eqchip${isEqOp(w)?' eqchip-op':''}" draggable="true" data-w="${w}">${w}</div>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  wireBank(body, { chip:'.eqchip', slot:'.eqslot', empty:'؟' });
  // قراءة المعادلة كاملةً بعد استبدال الخانات بما وُضع فيها (null إن بقيت خانة فارغة)
  function readTokens(){
    const slots=[].slice.call(body.querySelectorAll('.eqslot'));
    let k=0, out=[];
    for(let i=0;i<toks.length;i++){
      const s=String(toks[i]);
      if(s==='__'){ const v=slots[k++].dataset.placed; if(!v) return null; out.push(v); }
      else out.push(s);
    }
    return out;
  }
  // حساب طرفٍ من المعادلة: × ÷ أولاً ثم + − (يمين→يسار لا يغيّر النتيجة مع هذه الأسبقية)
  function evalSide(list){
    const t=list.slice(); let i=0;
    const vals=[], ops=[];
    while(i<t.length){
      const v=numOf(t[i]); if(v===null) return null; vals.push(v); i++;
      if(i<t.length){ const op=String(t[i]).trim(); if(!isEqOp(op)||op==='=') return null; ops.push(op); i++; }
    }
    if(!vals.length || ops.length!==vals.length-1) return null;
    for(let j=0;j<ops.length;){                      // تمريرة الضرب والقسمة
      if(ops[j]==='×'||ops[j]==='÷'){
        const r=(ops[j]==='×')?vals[j]*vals[j+1]:(vals[j+1]===0?null:vals[j]/vals[j+1]);
        if(r===null) return null;
        vals.splice(j,2,r); ops.splice(j,1);
      } else j++;
    }
    let acc=vals[0];
    for(let j=0;j<ops.length;j++) acc=(ops[j]==='+')?acc+vals[j+1]:acc-vals[j+1];
    return acc;
  }
  function markAll(cls){ body.querySelectorAll('.eqslot').forEach(sl=>{ sl.classList.remove('correct','wrong'); if(cls) sl.classList.add(cls); }); }
  body.querySelector('.btn-check').onclick=()=>{
    const full=readTokens();
    if(!full){ qFail(fb,'أكمل كل الخانات أولاً — اسحب بطاقة إلى كل خانة فارغة'); return; }
    if(mode==='equivalence'){
      // شقّ المعادلة عند «=» وقارن الطرفين حساباً (التكافؤ لا التطابق النصّي)
      const sides=[[]]; full.forEach(t=>{ if(String(t).trim()==='=') sides.push([]); else sides[sides.length-1].push(t); });
      const vs=sides.map(evalSide);
      if(sides.length<2 || vs.some(v=>v===null)){ qFail(fb,'راجع ترتيب البطاقات — المعادلة غير مكتملة'); return; }
      const ok=vs.every(v=>Math.abs(v-vs[0])<1e-9);
      if(ok){ markAll('correct'); qWin(fb,'🎉 أحسنت! الطرفان متكافئان — كلٌّ منهما يساوي '+arNum(vs[0]),3); }
      else{ markAll('wrong'); qFail(fb,'الطرفان غير متساويين: '+arNum(vs[0])+' مقابل '+arNum(vs[1])); }
      return;
    }
    // وضع الإكمال: كل خانة تُقارَن بإجابتها (بعد توحيد صيغة الأرقام)
    const slots=body.querySelectorAll('.eqslot'); let ok=0;
    slots.forEach(sl=>{
      const good=toLatinNum(sl.dataset.placed||'')===toLatinNum(sl.dataset.answer||'');
      sl.classList.toggle('correct',good); sl.classList.toggle('wrong',!good); if(good) ok++;
    });
    if(ok===nSlots) qWin(fb,'🎉 أحسنت! المعادلة صحيحة',3);
    else qFail(fb,`راجع المعادلة — الصحيح ${arNum(ok)} من ${arNum(nSlots)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderEquationBuilder(q,body,fb);
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
