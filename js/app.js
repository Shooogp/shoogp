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

/* ═══ ختمُ نسخةِ الأصولِ المطلوبةِ من JS — يُلتقَطُ من وسمِ هذا السكربتِ نفسِه ═══
   ما يُطلَبُ من **JS** لا من وسمٍ في HTML لا يمسُّه ختمُ `?v=` الذي يكتبُه النشرُ في
   وسومِ HTML (‏.github/workflows/pages.yml) — فيخزّنُه المتصفّحُ ويعيدُ القديمَ بعدَ
   نشرةٍ ناجحة. **وهي علّةُ `frame-arabic-tall.png` نفسُها** (`CLAUDE.md` §النشرُ وختمُ
   نسخِ الأصول)، وعلاجُها نظيرُ `imgURL()` في `js/shoogp-ui.js`: نلتقطُ `?v=` من رابطِ
   `js/app.js` (وقد ختمَه النشرُ ببصمةِ النشرة) ونُلحقُه بالمسار.

   **ويخدمُ اليومَ أصلَين:**
   • **`data/index.json` و`data/books.json`** — وهذا **أخطرُهما**: الفهرسُ يحملُ الدروسَ
     وعناوينَها وحقلَ `audio` وحالةَ الفتح، فتخزينُه يعني أنّ المعلّمةَ **لا ترى درساً
     جديداً ولا زرَ استماعٍ أُضيفَ** رغمَ نجاحِ النشر — وقد وقعَ فعلاً وشُخِّصَ ٢٠٢٦-٠٨-٢٠.
   • **تسجيلَ درسِ الاستماع** (`renderLessonAudio`).

   ⚠️ **يُقرأُ في المستوى العلويِّ لا داخلَ دالّة** — `document.currentScript` لا يصلحُ
   إلا أثناءَ التنفيذِ الأوّليِّ للسكربت، ويرجعُ `null` بعدَه. */
const ASSET_VER=(function(){
  const src=(document.currentScript && document.currentScript.src)||'';
  const m=/[?&]v=([^&#]+)/.exec(src);
  return m ? '?v='+m[1] : '';
})();

/* ===== تحميل البيانات (JSON مع نسخة احتياطية) ===== */
async function loadData(){
  try{
    const [terms, index] = await Promise.all([
      fetch('data/books.json'+ASSET_VER).then(r=>{ if(!r.ok) throw new Error('http '+r.status); return r.json(); }),
      fetch('data/index.json'+ASSET_VER).then(r=>{ if(!r.ok) throw new Error('http '+r.status); return r.json(); })
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
let audioReady=false;
/* ═══ أُزيلَ النطقُ الآليُّ (`speechSynthesis`) نهائياً — قرارُ المالك ٢٠٢٦-٠٨-١٧ ═══
   كانَ نطقُ العباراتِ يخرجُ من **محرّكِ جهازِ المعلّمةِ لا من المنصّة**، فيختلفُ الدرسُ
   الواحدُ من فصلٍ إلى فصل: جهازٌ فيه صوتٌ عربيٌّ يَنطقُ، وجهازٌ بلا صوتٍ عربيٍّ يسقطُ
   على محرّكٍ لاتينيٍّ فيخرجُ مشوَّهاً أو صامتاً. والتعزيزُ الذي لا يُسمَعُ بانتظامٍ
   يفقدُ أثرَه التربويّ. فصارَ كلُّ صوتٍ **ملفّاً في المستودع** (`js/sfx.js`).

   وأُلغيَتْ معه **قراءةُ محتوى الأسئلةِ آلياً** (الكلمةُ والحرفُ واسمُ اللونِ ووسمُ
   الخريطةِ وبطاقةُ الذاكرةِ وطرفُ المطابقة) — قرارُ المالكِ في الجلسةِ نفسِها.

   `speak` باقيةٌ **غلافاً للتوافقِ فقط**: تحوّلُ العبارةَ إلى مقطعِها البشريِّ إن
   عُرِفَتْ، وتصمتُ فيما عداه. فأيُّ استدعاءٍ قديمٍ فاتَنا لا يكسرُ شيئاً ولا يَنطقُ آلياً. */
const VOICE_BY_TEXT={
  'أحسنت، أكملت كل الأسئلة':'all-done',
  'أحسنت! وصلت القمر في الوقت المناسب!':'moon-arrived',
  'أحسنت! وصلت القمر بعد رحلة مليئة بالتحدّي!':'moon-arrived-hard'
};
function speak(t){
  const key=VOICE_BY_TEXT[String(t||'').trim()];
  if(key&&window.SHOOGP_SFX) SHOOGP_SFX.voice(key);
}

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
  // تهيئة مؤثّرات المنصّة: تحميلُها وفكُّ سياقِ WebAudio عند أوّل تفاعل
  if(window.SHOOGP_SFX){try{SHOOGP_SFX.warm();}catch(e){}}
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
  if(muted){ try{correctSound.pause();}catch(e){} try{wrongSound.pause();}catch(e){} if(window.SHOOGP_SFX){try{SHOOGP_SFX.stopVoice();}catch(e){}} }
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
  /* ‏`let` في سكربتٍ كلاسيكيٍّ لا يصيرُ خاصيةً على `window`، فنُصدّرُه صراحةً
     ليقرأَه `js/unlock.js`: اللونُ لشريطِ نافذةِ الرمز، والمفتاحُ ليُعيدَ زرُّ
     تبديلِ القفلِ رسمَ الكتابِ المفتوحِ في مكانِه عندَ التبديل. */
  window.currentBookColor=currentBookColor;
  window.currentBook=key;
  setTheme(bk && bk.theme ? bk.theme : 'theme-home');
  document.getElementById('bookTitle').textContent=idx.book;
  const totalL = idx.units.reduce((s,u)=>s+u.lessons.length,0);
  const list=document.getElementById('lessons');list.innerHTML='';
  /* كتابٌ له بطاقة ولمّا تُبنَ دروسُه بعد: يُعرض بلطفٍ بدل قائمةٍ فارغة صامتة.
     (البطاقة تسبق الفهرس عمداً — تُنشأ عند إرفاق كتاب التلميذ، ويُبنى الفهرس لاحقاً.) */
  if(!totalL){
    document.getElementById('bookSub').textContent='البطاقة جاهزة · الدروس تُضاف قريباً';
    list.innerHTML='<div class="empty">📖 دروس هذا الكتاب ستُضاف قريباً بإذن الله</div>';
    showScreen('lessonsScreen');
    return;
  }
  document.getElementById('bookSub').textContent=`${arNum(idx.units.length)} وحدات · ${arNum(totalL)} درساً`;
  let n=0;
  /* تُجمَعُ الصناديقُ أوّلاً ولا تُلحَقُ بالقائمةِ في الحلقة: قرارُ «أيُّ وحدةٍ تدخلُ
     إطارَ القفل» يحتاجُ معرفةَ **آخرِ وحدةٍ مفتوحة**، ولا تُعرَفُ إلا بعدَ المرورِ
     على الوحداتِ كلِّها. */
  const boxes=[];
  idx.units.forEach((u,ui)=>{
    /* قفلُ الشراء: مشتقٌّ من رقمِ الوحدةِ وحدَه (الأولى مجانيةٌ دائماً) — لا حقلَ
       `locked` في البيانات. القاعدةُ كاملةً في `js/unlock.js`. */
    const payLocked = !!(window.ShoogpLock && ShoogpLock.isUnitLocked(key, ui));

    // --- بطاقة الوحدة (قابلة للطي) ---
    const unitBox=document.createElement('div');unitBox.className='unit-box';

    // رأس الوحدة (زر الطي)
    const uh=document.createElement('button');
    uh.className='unit-head'+(ui===0?' open':'')+(payLocked?' paylock':'');
    const count=u.lessons.length;
    /* بلا شارةِ قفلٍ هنا: القفلُ صارَ **واحداً** على إطارِ الوحداتِ المقفلةِ أدناه.
       وتُعادُ الشارةُ استثناءً لوحدةٍ مقفلةٍ تقعُ **خارجَ** الإطار (انظر أدناه). */
    uh.innerHTML=`<span class="unit-no">الوحدة ${arNum(ui+1)}</span>`+
      `<span class="unit-title">${u.unit}</span>`+
      `<span class="unit-count">${arNum(count)} دروس</span>`+
      `<span class="unit-chevron">⌄</span>`;

    // حاوية الدروس (تنطوي)
    const body=document.createElement('div');
    body.className='unit-body'+(ui===0?' open':'');

    u.lessons.forEach(ls=>{
      n++;
      /* ثلاثُ حالاتٍ لا تُخلَط:
         • `ls.bookOnly` = مدخلٌ **في الكتابِ بلا نشاطٍ رقميّ** ولن يُؤلَّفَ أبداً
           (تقويمٌ ذاتيٌّ بلا جوابٍ صحيح، أو قراءةٌ حرّةٌ يختارُ التلميذُ كتابَها)
           ⇒ **📖 لا 🔒**، فلا يُقرأُ «اشترِ لتفتح» ولا «لم يُنجَزْ بعد».
         • `!ls.open`  = الدرسُ لم يُؤلَّفْ **بعد** ⇒ باهتٌ وميّت بـ🔒، ولا يفتحُه رمز.
           (يبقى كما هو — ومنه ما يُؤلَّفُ لاحقاً متى وصلَ مصدرُه.)
         • payLocked   = الدرسُ مؤلَّفٌ في وحدةٍ مقفلةٍ بالشراء ⇒ حيٌّ ويفتحُ نافذةَ الرمز. */
      const authored = !!ls.open;
      const bookOnly = !authored && !!ls.bookOnly;
      const payl = payLocked && authored;
      const el=document.createElement('div');
      el.className='lesson'+(authored?'':(bookOnly?' bookonly':' locked'))+(payl?' paylocked':'');
      el.innerHTML=`<div class="num">${arNum(n)}</div><div class="lt">${ls.title}`+
        (bookOnly?` <span class="lbook">في الكتاب</span>`:'')+`</div>`+
        `<div class="arrow">${authored?(payl?'🔒':'←'):(bookOnly?'📖':'🔒')}</div>`;
      if(bookOnly) el.setAttribute('aria-label', ls.title+' — نشاطٌ في الكتابِ الورقيّ، بلا أسئلةٍ في المنصّة');
      if(payl){
        /* الدرسُ المقفلُ **لا يفتحُ نافذةَ الرمز** — النافذةُ من القفلِ الكبيرِ على
           الإطارِ وحدَه. ونقرُه يوجّهُ النظرَ إلى ذلك القفلِ باهتزازٍ وإبراز.
           صفٌّ حيٌّ ⇒ يُبلَّغُ للقارئِ الشاشيِّ ويُبلَغُ بلوحةِ المفاتيح. */
        el.tabIndex=0; el.setAttribute('role','button');
        const point=()=>ShoogpLock.nudge();
        el.onclick=point;
        el.onkeydown=(e)=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();point();} };
      }else if(authored){
        el.onclick=()=>openLesson(ls);
      }
      body.appendChild(el);
    });

    // تفعيل الطيّ/الفتح — بلا استثناءِ شارةٍ: لم تعدْ في رأسِ الوحدةِ شارةُ قفل
    uh.onclick=()=>{
      const isOpen=uh.classList.contains('open');
      uh.classList.toggle('open',!isOpen);
      body.classList.toggle('open',!isOpen);
    };

    unitBox.appendChild(uh);
    unitBox.appendChild(body);
    boxes.push({box:unitBox, head:uh, locked:payLocked, ui:ui, title:u.unit});
  });

  /* ═══════ إطارُ الوحداتِ المقفلة — قفلٌ واحدٌ لا شارةَ في كلِّ وحدة ═══════
     يبدأُ **بعدَ آخرِ وحدةٍ مفتوحة**. والنطاقُ صارَ الكتابَ كاملاً (‏`js/unlock.js`)
     فالمقفولُ **ذيلٌ متّصلٌ دائماً**: إمّا الكتابُ ممنوحٌ فلا مقفولَ أصلاً، وإمّا
     الوحداتُ المجانيةُ في الرأسِ وما بعدَها مقفلٌ كلُّه. ولذلك سقطتْ حالةُ «وحدةٌ
     مقفلةٌ تسبقُ مفتوحةً» ومعها شارةُ القفلِ المفردة.
     وكتابٌ مفتوحٌ كاملاً ⇒ `framed` فارغةٌ ⇒ لا إطارَ ولا قفلَ إطلاقاً. */
  let lastOpen=-1;
  boxes.forEach((b,i)=>{ if(!b.locked) lastOpen=i; });
  const framed=boxes.slice(lastOpen+1);

  boxes.slice(0,lastOpen+1).forEach(b=>list.appendChild(b.box));

  if(framed.length){
    /* ⚠️ `fieldset`/`legend` لا `div` بموضعٍ مطلق: الفجوةُ في الخطِّ يصنعُها
       المتصفّحُ بنفسِه هنا **بلا لونِ خلفيةٍ إطلاقاً**. وخلفيةُ الصفحةِ تدرّجٌ
       رأسيٌّ يختلفُ بين ٢٥ ثيمةً و`background-attachment:fixed`، فرقعةٌ مصمتةٌ
       تقطعُ الخطَّ لن تطابقَه إلا عندَ موضعِ تمريرٍ واحدٍ في ثيمةٍ واحدة. */
    const fs=document.createElement('fieldset'); fs.className='paylock-frame';
    const lg=document.createElement('legend'); lg.className='paylock-legend';
    const btn=document.createElement('button');
    btn.type='button'; btn.className='paylock-btn';
    btn.textContent='🔒 مقفلة';
    btn.title='افتحي هذه الوحدات برمز';
    // القفلُ يفتحُ النافذةَ على **أوّلِ** وحدةٍ مقفلة — أقربُ ما تحاولُه المعلّمة
    btn.onclick=()=>ShoogpLock.ask(key);   // النافذةُ على مستوى الكتاب
    lg.appendChild(btn); fs.appendChild(lg);
    framed.forEach(b=>fs.appendChild(b.box));
    list.appendChild(fs);
  }
  showScreen('lessonsScreen');
}

/* ===== ④ فتح درس: عرض الأسئلة التفاعلية ===== */
function openLesson(ls){
  /* حارسُ القفل — هنا لا في معالجِ النقر، فيغطّي أيَّ مدخلٍ للدرس (نداءٌ برمجيٌّ
     أو رابطٌ مباشرٌ إن أُضيفَ لاحقاً) لا النقرَ وحدَه. هويةُ الكتابِ من `currentBook`
     (مفتاحُ `data/books.json`) — **لا تُشتَقُّ من اسمِ ملفِّ الدرس**. */
  if(window.ShoogpLock && ShoogpLock.guardLesson(currentBook, ls, DATA.index)) return;
  document.getElementById('lessonTitle').textContent=ls.title;
  renderLessonAudio(ls);
  renderQuestions(ls);
  showScreen('activityScreen');
}

/* ═══ شريطُ استماعِ الدرس — نصُّ الاستماعِ في «أحب لغتي» ═══
   دروسُ الاستماعِ في الكتابِ نصُّها **ليس في كتابِ التلميذ**: يقرؤُه المعلّمُ من دليلِه
   ثمّ يجيبُ التلميذُ عن أسئلةِ الكتاب. فهذا الشريطُ يُغني عن القراءةِ الحيّة: تضغطُ
   المعلّمةُ فيسمعُ الصفُّ التسجيلَ ثمّ يحلّون.

   **الصوتُ وحدَه بلا نصٍّ معروض (قرارُ المالك ٢٠٢٦-٠٨-١٩):** الدرسُ درسُ **استماعٍ**،
   فعرضُ النصِّ مكتوباً يُحوّلُه إلى فهمِ مقروءٍ ويُلغي المهارةَ التي يقيسُها. فلا حقلَ
   للنصِّ في البياناتِ أصلاً — النصُّ مصدرُ تأليفٍ عندَ المعلّمِ لا بيانٌ في المنصّة.

   **ولماذا الترويسةُ لا جسمُ السؤال:** الأسئلةُ تُعرَضُ **واحداً واحداً** (`.qslides`)،
   فحقلُ `audio` داخلَ سؤالٍ يغيبُ عن بقيّةِ الأسئلة — والمعلّمةُ تحتاجُ إعادةَ التشغيلِ
   في أيِّ سؤالٍ كان. وهنا يبقى الشريطُ ظاهراً مع الدرسِ كلِّه.
   (وحقلُ `audio` على **السؤال** باقٍ كما هو لمقاطعِ الكلمةِ الواحدة — §`renderMcq`.)

   البيانات: `audio` على الدرسِ في `js/data.js`. وغيابُه = لا شريطَ في DOM أصلاً،
   فكلُّ دروسِ المنصّةِ الأخرى تمرُّ كما كانت حرفاً بحرف. */
let lessonSnd=null;
/* يُنادى عندَ مغادرةِ شاشةِ النشاطِ من مخرجَيها — وإلا استمرَّ نصُّ الاستماعِ يُسمَعُ
   في صفحةِ الكتبِ بعدَ الخروجِ من الدرس. */
function stopLessonAudio(){ if(lessonSnd){ try{ lessonSnd.pause(); }catch(e){} } }
function renderLessonAudio(ls){
  const bar=document.getElementById('lessonAudio'); if(!bar) return;
  stopLessonAudio(); lessonSnd=null;
  bar.innerHTML=''; bar.hidden=true;
  if(!ls.audio) return;
  bar.hidden=false;
  bar.innerHTML=
    `<button class="btn aplay la-play" type="button">🔊 استماع</button>`+
    `<button class="btn aplay la-again" type="button">↻ من البداية</button>`;
  const snd=new Audio(ls.audio+ASSET_VER); snd.preload='auto'; lessonSnd=snd;
  const play=bar.querySelector('.la-play');
  /* المزامنةُ **بأحداثِ المشغّلِ لا بالنقر**: `play()` غيرُ متزامنٍ وقد يُرفَضُ
     (سياساتُ التشغيلِ التلقائيّ)، فلو كُتِبَ النصُّ عندَ النقرِ لَقالَ «إيقاف» وهو ساكن. */
  const sync=()=>{ play.textContent = snd.paused ? '🔊 استماع' : '⏸ إيقاف'; };
  snd.onplay=sync; snd.onpause=sync; snd.onended=sync;
  const start=()=>{ try{ const p=snd.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){} };
  play.onclick=()=>{ if(snd.paused) start(); else snd.pause(); };
  bar.querySelector('.la-again').onclick=()=>{ try{ snd.currentTime=0; }catch(e){} start(); };
}

function setTheme(name){
  // أزل كل سمات theme-* (لا قائمة ثابتة ناقصة) كي لا تبقى خلفية كتابٍ عالقة عند التنقّل
  [].slice.call(document.body.classList).forEach(function(c){ if(c.indexOf('theme-')===0) document.body.classList.remove(c); });
  document.body.classList.add(name || 'theme-home');
}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
// عند مغادرة شاشة النشاط: أزل مسار الصاروخ
function leaveRocket(){document.body.classList.remove('rocket-mode');if(window.RocketJourney)RocketJourney.unmount();}
function goHome(){stopLessonAudio();leaveRocket();setTheme('theme-home');showScreen('home');}
function backToLessons(){stopLessonAudio();leaveRocket();showScreen('lessonsScreen');}

/* ═══════════════ محرّك الأسئلة الموحّد (خمسة أنواع) ═══════════════ */
function shuffle(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);}

// تغذية راجعة موحّدة: نجاح (صوت صحيح + رفع الصاروخ) / إخفاق (اختناق المحرّك + انزلاق)
// المكافأة هي رحلة الصاروخ (onAnswer)؛ أُزيل نظام النجوم — الوسيط stars مُهمَل (للتوافق فقط)
function qWin(fb,msg,stars){fb.textContent=msg||'🎉 أحسنت!';fb.className='fb qfb good';playCorrectSound();if(window.RocketJourney)RocketJourney.onAnswer(true);}
// عند الخطأ: يُكتم wrong.mp3 ما دام الصاروخ مركَّباً (اختناق المحرّك هو تنبيه الخطأ)؛
// أي واجهة بلا صاروخ تُبقي wrong.mp3 يعمل (بقية دروس المنصّة كلها تحوي الصاروخ الآن)
function qFail(fb,msg){fb.textContent=msg||'حاول مرة أخرى';fb.className='fb qfb bad';if(!(window.RocketJourney&&RocketJourney.isActive&&RocketJourney.isActive()))playWrongSound();if(window.RocketJourney)RocketJourney.onAnswer(false);}

const Q_LABEL={'drag-drop':'🌿 سحب وإفلات','matching':'🔗 توصيل','mcq':'✅ اختيار من متعدد','true-false':'⚖️ صواب أو خطأ','hotspot':'🎯 تحديد الأجزاء','sequence':'🔢 ترتيب تسلسلي','classify':'🗂️ تصنيف','fill-blank':'✏️ ملء الفراغ','exclude':'🚫 الاستبعاد','arrange':'🔤 ترتيب الحروف','mindmap':'🧠 خريطة ذهنية','find-error':'🔍 اكتشف الخطأ','audio-q':'🔊 سؤال صوتي','zoom-reveal':'🔎 تكبير تدريجي','color':'🎨 تلوين بالتعليمات','puzzle':'🧩 البازل','slider':'🎚️ الشريط المتدرج','memory':'🎴 بطاقات الذاكرة','lens':'🔍 العدسة المكبّرة','equation-builder':'🧮 بناء المعادلة','number-line':'📏 خط الأعداد','hundred-chart':'💯 لوحة المائة','array':'🔲 المصفوفات','compare':'⚖️ المقارنة','pattern':'🔁 إكمال النمط','count-tap':'🖐️ العد بالنقر','place-value':'🧱 القيمة المنزلية','clock':'🕐 الساعة التفاعلية','measure-tool':'📐 أداة القياس','money':'🪙 النقود العُمانية','symmetry':'🪞 خط التماثل','chart-read':'📊 التمثيل البياني','tashkeel':'ـَ التشكيل','sentence':'📝 ترتيب الجملة','sun-moon':'☀️ شمسية وقمرية','letter-picture':'🔠 الحرف والصورة','judge-reason':'⚖️ الحكم والتعليل','listen-locate':'🎧 أستمع وأحدّد'};

/* تحويل الأرقام إلى هندية (عربية) للعرض — قاعدةُ المنصّة: **كلُّ رقمٍ يراه المستخدمُ
   بالأرقامِ الهندية**. يُستعمَلُ في محرّكِ الأسئلةِ **وفي طبقةِ التنقّلِ أعلاه أيضاً**
   (بطاقةُ الكتابِ ورؤوسُ الوحداتِ وأرقامُ الدروس) — فهو مُعرَّفٌ هنا لكنّه مرفوعٌ
   (hoisted) فيعملُ في `openBook` السابقِ له في الملفّ. لا يُلَفُّ هذا الملفُّ في IIFE
   دونَ نقلِ الدالّةِ أوّلاً.
   ⛔ لا يُطبَّقُ على المعرّفاتِ والمفاتيحِ والمسارات (`g4-sci`، `g4s-1-1`، إحداثيات
   SVG، `data-*` التي تُقرأُ برمجياً) — تحويلُها يكسرُ المطابقة. */
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
  const R={'drag-drop':renderDragDrop,'matching':renderMatching,'mcq':renderMcq,'true-false':renderTrueFalse,'hotspot':renderHotspot,'sequence':renderSequence,'classify':renderClassify,'fill-blank':renderFillBlank,'exclude':renderExclude,'arrange':renderArrange,'mindmap':renderMindmap,'find-error':renderFindError,'audio-q':renderAudioQ,'zoom-reveal':renderZoom,'color':renderColor,'puzzle':renderPuzzle,'slider':renderSlider,'memory':renderMemory,'lens':renderLens,'equation-builder':renderEquationBuilder,'number-line':renderNumberLine,'hundred-chart':renderHundredChart,'array':renderArray,'compare':renderCompare,'pattern':renderPattern,'count-tap':renderCountTap,'place-value':renderPlaceValue,'clock':renderClock,'measure-tool':renderMeasureTool,'money':renderMoney,'symmetry':renderSymmetry,'chart-read':renderChartRead,'tashkeel':renderTashkeel,'sentence':renderSentence,'sun-moon':renderSunMoon,'letter-picture':renderLetterPicture,'judge-reason':renderJudgeReason,'listen-locate':renderListenLocate};

  // بناء كل البطاقات (تبقى في الصفحة لحفظ إجاباتها، ونُظهر واحدة فقط)
  // شارة رقم السؤال أُلغيت (قرار المالك): مؤشر التقدم «السؤال ٢ من ٦» يغني عنها
  // ويحل محلها في رأس البطاقة — نصه ثابت لكل بطاقة فيُكتب عند البناء.
  const slides=document.createElement('div'); slides.className='qslides';
  let relocateActions=null;   // تُعرَّف بعد بناء شريط التنقّل (تبنّي أزرار تحقق/إعادة)
  qs.forEach((q,i)=>{
    const fn=R[q.type]; if(!fn) return;
    const card=document.createElement('div');
    card.className='card-box qcard';
    card.innerHTML=`<div class="qhead"><span class="qprogress">السؤال ${arNum(i+1)} من ${arNum(qs.length)}</span><span class="qtype">${Q_LABEL[q.type]||''}</span></div>`+
      `<h3 class="qprompt">${q.prompt||q.statement||''}</h3>`+
      `<div class="qbody"></div><div class="fb qfb"></div>`;
    fn(q, card.querySelector('.qbody'), card.querySelector('.qfb'));
    // زر «إعادة» يعيد بناء جسم السؤال فيولد .actions جديدة داخله — المراقب
    // يعيد تبنّيها إلى شريط التنقّل فور ظهورها (للسؤال الظاهر فقط).
    new MutationObserver(()=>{ if(relocateActions) relocateActions(card); })
      .observe(card.querySelector('.qbody'),{childList:true});
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

  // شريط التنقّل — وسطه يتبنّى أزرار «تحقّق/إعادة» من جسم السؤال الظاهر
  // (قرار المالك: الأزرار بين «السابق» و«التالي» خارج الحاوية، فيتفرّغ داخل
  // الإطار للسؤال وحده؛ ومؤشر التقدم صعد إلى رأس البطاقة مكان شارة الرقم الملغاة)
  const nav=document.createElement('div'); nav.className='qnav';
  nav.innerHTML='<button class="btn qprev">→ السابق</button>'+
    '<span class="qnav-mid"></span>'+
    '<button class="btn qnext">التالي ←</button>'+
    '<button class="btn qfinish">إنهاء 🏁</button>';
  host.appendChild(nav);
  const result=document.createElement('div'); result.className='qresult'; host.appendChild(result);

  let cur=0;
  const navMid=nav.querySelector('.qnav-mid');
  let navOwner=null;   // البطاقة التي أزرارها في الشريط الآن (تُعاد لجسمها عند مغادرتها)
  relocateActions=function(card){
    if(card!==cards[cur]) return;
    const a=card.querySelector('.qbody .actions'); if(!a) return;
    navMid.innerHTML=''; navOwner=card; navMid.appendChild(a);
  };
  function adoptActions(){
    if(navOwner===cards[cur] && navMid.querySelector('.actions')) return;
    if(navOwner){
      const back=navMid.querySelector('.actions');
      const nb=navOwner.querySelector('.qbody');
      if(back&&nb) nb.appendChild(back);
    }
    navMid.innerHTML=''; navOwner=null;
    const act=cards[cur].querySelector('.qbody .actions');
    if(act){ navOwner=cards[cur]; navMid.appendChild(act); }
  }
  function show(i){
    cur=Math.max(0,Math.min(total-1,i));
    cards.forEach((c,idx)=>{ c.style.display=(idx===cur)?'block':'none'; });
    adoptActions();
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
    // «أحسنت، أكملتَ كلَّ الأسئلة» — مقطعٌ بشريٌّ من المستودع لا نطقٌ آليّ
    if(good===total && window.SHOOGP_SFX) SHOOGP_SFX.voice('all-done');
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
   (محكومةٌ بارتفاع المسرح لا بعرضه) فتبدو سابحةً بعيداً عنها رغم الخيوط الواصلة —
   وفي الرياضيات (بلا خطوط، DESIGN_RULES.md) القربُ المكانيُّ وسيلةُ الربطِ الوحيدة فالسقفُ ألزم.
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

/* ① سحب وإفلات: targets[{answer,box,dot}] + خلفية image/svg
   ═══ قاعدة تصميم دائمة — انظر DESIGN_RULES.md §«أسئلة السحب والإفلات — خطوط التوصيل» ═══
   نوعا مناطق الإفلات:
   (أ) مناطق استقبال منفصلة حول الرسم (.target «؟») — السلوك الافتراضي لكل
       المواد بما فيها الرياضيات: خط واصل (.dndline داخل svg.dndlines) ونقطة
       (.dnd-dot) بين المنطقة وموضعها على الرسم/الصورة.
   (ب) خانات فارغة داخل رسم السؤال نفسه (rect/circle بحدّ متقطّع داخل svg —
       كالخانات الناقصة بين الأرقام في صف لوحة المائة) — استثناء الرياضيات:
       الهدف الذي تقع نقطته داخل خانةٍ منها يصير طبقةَ إفلاتٍ شفافةً على
       الخانة نفسها (.target-cell)، بلا خط ولا نقطة — لا تُنشأ عناصرها أصلاً
       في DOM — والسحب مباشر إلى الخانة الفارغة بين الأرقام، لأن موضعها صحيح
       وثابت فلا يحتاج خطاً يوجّه إليه.
   التصنيف تلقائيّ من الرسم الحيّ والشرط مركزيّ هنا، فيرثه كل سؤال سحب
   وإفلات حالي أو مستقبلي تلقائياً دون تعديل بياناته. */
function renderDragDrop(q, body, fb){
  let dragged=null;
  // استثناء الرياضيات (DESIGN_RULES.md): صنف subj-math يضعه shoogp-ui.js على #questionList
  // قبل بناء الأسئلة. البطاقة تُبنى منفصلةً ثم تُلحق، فـclosest وحدها لا تكفي وقت
  // الرسم — نقرأ الصنف من حاوية الأسئلة مباشرةً، وclosest احتياطٌ لإعادة الرسم (إعادة ↺).
  const _ql=document.getElementById('questionList');
  const isMath = !!(_ql && _ql.classList.contains('subj-math')) || !!body.closest('.subj-math');
  // الوسط: صورة تُحجّم مباشرةً (تظهر كاملة لكل النِسَب) أو رسم SVG داخل غلاف
  // fit:"width" للرسوم/الصور العريضة (كخط الأعداد): تملأ العرض ويُشتقّ ارتفاعها من نسبتها
  const wideCls = q.fit==='width' ? ' lw' : '';
  const media = q.svg ? `<div class="labelimg${wideCls}">${q.svg}</div>` : `<img class="labelimg${wideCls}" src="${q.image}" alt="">`;
  // الصناديق حول الصورة (نِسَب مئوية من منطقة النشاط)
  const boxes = q.targets.map((t,i)=>`<div class="target" data-i="${i}" data-answer="${t.answer}" style="left:${t.box.x}%;top:${t.box.y}%">؟</div>`).join('');
  body.innerHTML=`<div class="dnd"><div class="stage stage-label"${q.bg?` style="background:${q.bg}"`:''}>`+
    media + boxes +
    `</div>`+
    `<div class="bank"><div class="bt">البطاقات:</div>`+
    shuffle(q.targets.map(t=>t.answer)).map(w=>`<div class="chip" draggable="true" data-w="${w}">${w}</div>`).join('')+
    `</div></div><div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const stage=body.querySelector('.stage'), imgEl=body.querySelector('.labelimg');
  const dndEl=body.querySelector('.dnd');
  const SVGNS='http://www.w3.org/2000/svg';
  /* ── تصنيف الأهداف (DESIGN_RULES.md): النوع (ب) = خانة داخل الرسم ──
     الخانة الفارغة عنصر rect/circle/ellipse يحمل stroke-dasharray في svg السؤال
     الحيّ (لا في النص المصدري — القوالب تتوسّع بـmap). الهدف الذي تقع نقطته dot
     داخل حدود خانةٍ يُصنَّف (ب)؛ والقياس بنسب viewBox المئوية كنسب dot نفسها. */
  let cellOf=q.targets.map(()=>null);
  /* حجم العدد بعد الإفلات = حجم أرقام الرسم نفسها: نقيس خط نصوص svg السؤال
     (الوسيط بين عناصر text بوحدات viewBox) ونحوّله بكسلاً حسب مقياس الصورة الحيّ
     في redraw — فلا يتقلّص العدد الموضوع في الخانة ولا يظهر أصغر من جيرانه. */
  let cellFontSvg=null, cellVbW=0;
  if(isMath && q.svg){
    const inSvg=imgEl && imgEl.querySelector('svg');
    const vb=inSvg && inSvg.viewBox && inSvg.viewBox.baseVal;
    if(vb && vb.width && vb.height){
      cellVbW=vb.width;
      const fss=[].map.call(inSvg.querySelectorAll('text'),t=>parseFloat(t.getAttribute('font-size'))||0)
        .filter(v=>v>0).sort((a,b)=>a-b);
      if(fss.length) cellFontSvg=fss[Math.floor(fss.length/2)];
      const cells=[];
      inSvg.querySelectorAll('rect[stroke-dasharray],circle[stroke-dasharray],ellipse[stroke-dasharray]').forEach(el=>{
        let cx,cy,w,h;
        const sw=+el.getAttribute('stroke-width')||0;
        if(el.tagName==='rect'){
          const x=+el.getAttribute('x')||0, y=+el.getAttribute('y')||0;
          w=+el.getAttribute('width'); h=+el.getAttribute('height'); cx=x+w/2; cy=y+h/2;
        }else{
          cx=+el.getAttribute('cx'); cy=+el.getAttribute('cy');
          const rx=+(el.getAttribute('r')||el.getAttribute('rx')), ry=+(el.getAttribute('r')||el.getAttribute('ry'));
          w=2*rx; h=2*ry;
        }
        if(!w||!h) return;
        /* الحدُّ المتقطّعُ مركزيٌّ على المسار (نصفُ سماكتِه داخلٌ ونصفُها خارج)،
           فيبرزُ بصرياً خارجَ صندوقِ الخانةِ الهندسيّ (x/y/width/height) بمقدار
           نصفِ سماكتِه من كلِّ جهة. الطبقةُ الشفّافةُ فوقَها بلا امتلاءٍ فلا يُرى
           هذا الفرقُ، لكنّ خلفيّةَ الامتلاءِ المصمَتةَ (‏.target.filled) تُرسَمُ
           بمقاسِ الصندوقِ الهندسيِّ المجرَّد فتبدو أضيقَ من الخانةِ الفارغةِ التي
           استبدلتْها (بلاغُ المالك: g2m-1-1#٤ «تضيق الأزرار بعد الإفلات»). تُضافُ
           السماكةُ كاملةً (نصفٌ لكلِّ جهةٍ) فيطابقُ الامتلاءُ الحدَّ المرئيَّ نفسَه. */
        cells.push({cx:(cx-vb.x)/vb.width*100, cy:(cy-vb.y)/vb.height*100,
                    w:(w+sw)/vb.width*100, h:(h+sw)/vb.height*100, round:el.tagName!=='rect'});
      });
      cellOf=q.targets.map(t=>cells.find(c=>
        Math.abs(t.dot.x-c.cx)<=c.w/2 && Math.abs(t.dot.y-c.cy)<=c.h/2)||null);
    }
  }
  // أهداف النوع (ب): طبقة شفافة على الخانة نفسها (الموضع المبدئي مركز الخانة؛
  // redraw يضبطه بالبكسل على صندوق الصورة الحيّ ويمنحها مقاس الخانة)
  body.querySelectorAll('.target').forEach(tg=>{
    const c=cellOf[+tg.dataset.i]; if(!c) return;
    tg.classList.add('target-cell');
    tg.style.left=c.cx+'%'; tg.style.top=c.cy+'%';
    if(c.round) tg.style.borderRadius='50%';
  });
  // الخط والنقطة لأهداف النوع (أ) فقط — لا تُنشأ عناصرها أصلاً حين لا حاجة إليها
  const firstTarget=stage.querySelector('.target');
  if(q.targets.some((t,i)=>!cellOf[i])){
    const lsvg=document.createElementNS(SVGNS,'svg');
    lsvg.setAttribute('class','dndlines');
    stage.insertBefore(lsvg, firstTarget);
    q.targets.forEach((t,i)=>{
      if(cellOf[i]) return;
      const d=document.createElement('span'); d.className='dnd-dot';
      d.dataset.i=i; d.dataset.x=t.dot.x; d.dataset.y=t.dot.y;
      stage.insertBefore(d, firstTarget);
    });
  }
  const svg=stage.querySelector('.dndlines');   // null إن كانت كل الأهداف خانات (ب)
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
    // أهداف النوع (ب): تُطابَق على خانتها المرسومة موقعاً ومقاساً (DESIGN_RULES.md)
    body.querySelectorAll('.target-cell').forEach(tg=>{
      const c=cellOf[+tg.dataset.i]; if(!c) return;
      tg.style.left =(ir.left-sr.left + c.cx/100*ir.width)+'px';
      tg.style.top  =(ir.top -sr.top  + c.cy/100*ir.height)+'px';
      tg.style.width =(c.w/100*ir.width)+'px';
      tg.style.height=(c.h/100*ir.height)+'px';
      /* خط العدد الموضوع = خط أرقام الرسم بمقياس الصورة الحيّ (لا يتقلّص مع
         الخانة) — والاحتياط عند غياب نصوص في الرسم: نصف ارتفاع الخانة تقريباً */
      const fs = cellFontSvg ? cellFontSvg*ir.width/cellVbW : 0.48*c.h/100*ir.height;
      tg.style.setProperty('--cellfs', fs.toFixed(2)+'px');
    });
    /* ═══ حارسُ حدودِ المشهد لصناديقِ النوع (أ) ═══
       الصندوقُ موضوعٌ بنسبةٍ مئويةٍ من المشهدِ **ومركزُه** هو النقطة
       (‏`translate(-50%,-50%)`)، فنسبةٌ أصغرُ من نصفِ ارتفاعِه تُخرِجُ نصفَه
       العلويَّ فوقَ الحافّة — و`.stage` يقصُّ بـ`overflow:hidden`، فيرى التلميذُ
       صندوقاً مبتورَ الأعلى. مقيسٌ في `g2m-8-1#٣`: أربعةُ صناديقَ على `y:8`،
       ارتفاعُ الواحدِ ٥٧px في مشهدٍ ارتفاعُه ٢٩٣ — فبرزَت ٤٫٣px فوقَ الحافّةِ
       وبُتِرَت، ومعها ١٫٣px من يسارِ أوّلِها.
       والعلاجُ **إزاحةٌ بالهامشِ لا إعادةُ تأليف**: يُدفَعُ الصندوقُ إلى الداخلِ بأقلِّ
       ما يلزم، فتبقى إحداثياتُ المؤلِّفِ كما هي ما دامت داخلَ الحدود، ويُحمى
       كلُّ سؤالِ سحبٍ قائمٍ ومستقبَليٍّ بلا لمسِ بياناتِه.
       ⛔ ولا يمسُّ النوعَ (ب): خانتُه مطابِقةٌ لخانةٍ مرسومةٍ في الرسمِ موقعاً
       ومقاساً، وإزاحتُها تفكُّ المطابقةَ التي هي جوهرُها. */
    const boxes=[].slice.call(body.querySelectorAll('.target:not(.target-cell)'));
    if(boxes.length){
      /* الحدُّ **صندوقُ القصِّ لا صندوقُ الحدّ**: `overflow:hidden` يقصُّ عند حافّةِ
         الحشوةِ (داخلَ الإطارِ المرسوم)، فالمقارنةُ بالحافّةِ الخارجيةِ تُبقي بقيّةً
         بمقدارِ سُمكِ الإطار. (مقيسٌ: بقيَ ١٫٣px بعدَ أوّلِ علاجٍ قاسَ الخارجية.) */
      const scs=getComputedStyle(stage);
      const bl=(parseFloat(scs.borderLeftWidth)||0), bt=(parseFloat(scs.borderTopWidth)||0),
            br_=(parseFloat(scs.borderRightWidth)||0), bb=(parseFloat(scs.borderBottomWidth)||0);
      const cl=sr.left+bl, ct=sr.top+bt, cr=sr.right-br_, cb=sr.bottom-bb;
      boxes.forEach(tg=>{ tg.style.marginTop=''; tg.style.marginLeft=''; });
      boxes.forEach(tg=>{
        const b=R(tg);
        let dx=Math.max(0, cl-b.left) - Math.max(0, b.right-cr);
        let dy=Math.max(0, ct-b.top)  - Math.max(0, b.bottom-cb);
        /* هامشُ أمانٍ نصفُ بكسلٍ في اتجاهِ الدفعِ — يمنعُ بقيّةَ التقريب */
        if(dx) dx+=Math.sign(dx)*0.5;
        if(dy) dy+=Math.sign(dy)*0.5;
        if(Math.abs(dx)>0.2) tg.style.marginLeft=dx.toFixed(1)+'px';
        if(Math.abs(dy)>0.2) tg.style.marginTop =dy.toFixed(1)+'px';
      });
    }
    if(!svg) return;      // كل الأهداف خانات (ب) — لا خطوط ولا نقاط أصلاً
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
  /* مراقب أبعاد المسرح: يعيد رسم الخيوط والنقاط، **ويعيد فحص خنق الصورة** — لأنّ عرض المسرح
     لا يستقرّ إلا بعد أن تختار خوارزمية الإطار مقاسها وتضبطه، أي بعد relayout الأول.
     الحارس رتيب (يضيف ولا يزيل) فلا يتذبذب مع هذا المراقب. */
  if(window.ResizeObserver){ new ResizeObserver(()=>{ redraw(); dndStageGuard(dndEl); }).observe(stage); }
  /* ═══ ولا يكفي مراقبُ الأبعادِ وحدَه: الزومُ لا يوقظُه ═══
     `redraw` كلُّه يقيسُ بـ`fitRect` (فضاءُ التصميمِ = البكسل ÷ الزوم)، و`ShoogpFit`
     يضبطُ الزومَ بـ`transform` على `.fit-lock` — **والتحويلُ لا يغيّرُ مقاسَ التخطيط**
     فلا يُطلِقُ `ResizeObserver` أصلاً. فتبقى الخيوطُ والنقاطُ وإزاحةُ حارسِ الحدودِ
     على قياسِ زومٍ سابق. مقيسٌ في `g2m-8-1#٣`: أزاحَ الحارسُ ٣٫٠٩px والحاجةُ ٥٫٩٧
     لأنّ آخرَ نداءٍ وقعَ قبلَ استقرارِ الزوم، فبقيَ الصندوقُ مبتوراً ٢px.
     والمستمعُ **يرفعُ نفسَه** متى فارقَ المسرحُ الصفحة، فلا يتراكمُ مع كلِّ درس. */
  const onFit=function(){
    if(!stage.isConnected){ window.removeEventListener('shoogp-fit', onFit); return; }
    redraw(); dndStageGuard(dndEl);
  };
  window.addEventListener('shoogp-fit', onFit);
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
    else qFail(fb,`راجع إجاباتك — الصحيح ${arNum(ok)} من ${arNum(ts.length)}`);
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

  shuffle(q.pairs).forEach(pr=>{const d=document.createElement('div');const f=qFace(q,pr.a,'a');
    d.className='mitem left'+f.cls;d.innerHTML=f.html;d.dataset.k=pr.a;
    d.onclick=()=>{if(d.classList.contains('matched'))return;L.querySelectorAll('.left').forEach(x=>x.classList.remove('selected'));d.classList.add('selected');sel=d;};L.appendChild(d);});
  /* ═══ الحُكمُ بنصِّ البطاقةِ لا بربطِها ═══
     كانت بطاقةُ العمودِ الأيمنِ تحملُ مفتاحَ **زوجِها** (‏`dataset.k = pr.a`)
     والتحقّقُ يقارنُه بمفتاحِ المختار. فإن تطابقت بطاقتانِ نصّاً في هذا العمود —
     وهو واردٌ ومقصودٌ في التصنيفِ بالوصف: «٦ أَوجُه» للمكعّبِ ولمتوازي المستطيلات —
     رأى التلميذُ بطاقتَينِ لا يفرّقُ بينهما، فالوصلُ إلى «الخطأِ» منهما **يُرَدُّ وهو
     صحيحٌ نصّاً**، ولا سبيلَ له إلى معرفةِ أيَّتِهما قُصِدَت. مقيسٌ في `g3m-7-2#٢`:
     وُصِلَ «المُكَعَّب» بـ«٦ أَوجُه» فرُدَّ لأنّها مربوطةٌ بـ«مُتَوازي المُستَطيلات».
     فالمقياسُ الآنَ **نصُّ الطرفِ الصحيحِ للمختار** (‏`want`).

     ومعه **مبادلةُ الربط**: إن قُبِلَت بطاقةٌ مربوطةٌ بزوجٍ آخرَ بُودِلَ مفتاحُها
     مع قرينتِها المطابقةِ نصّاً. المبادلةُ **غيرُ مرئيةٍ** (النصُّ واحد) لكنّها
     تُبقي ما تبقّى من البطاقاتِ قابلاً للوصلِ كاملاً — فلا يُحشَرُ التلميذُ في
     آخرِ زوجَينِ لا يتطابقان. */
  const wantOf={}; q.pairs.forEach(p=>{ if(!(p.a in wantOf)) wantOf[p.a]=p.b; });
  shuffle(q.pairs).forEach(pr=>{const d=document.createElement('div');const f=qFace(q,pr.b,'b');
    d.className='mitem right'+f.cls;d.innerHTML=f.html;d.dataset.k=pr.a;d.dataset.b=pr.b;
    d.onclick=()=>{if(!sel||d.classList.contains('matched'))return;
      if(d.dataset.b===wantOf[sel.dataset.k]){
        if(d.dataset.k!==sel.dataset.k){
          const twin=[].slice.call(Rr.children).filter(x=>x.dataset.k===sel.dataset.k)[0];
          if(twin){ twin.dataset.k=d.dataset.k; d.dataset.k=sel.dataset.k; }
        }
        drawLink(sel,d);sel.classList.add('matched');d.classList.add('matched');sel.classList.remove('selected');sel=null;done++;playCorrectSound();
        if(done===q.pairs.length) qWin(fb,'🌟 ممتاز! أكملت التوصيل',1);}
      else{qFail(fb,'ليست الإجابة الصحيحة، حاول مجدداً');d.style.background='#fde2e2';setTimeout(()=>d.style.background='',500);}};Rr.appendChild(d);});
  body.querySelector('.btn-reset').onclick=()=>renderMatching(q,body,fb);
}

/* ═══ مشغّلُ صوتِ السؤال — مشتركٌ بين الأنواع ═══
   مستخرَجٌ من `renderAudioQ` بترميزِه نفسِه (`.aplay`) وسلوكِه نفسِه حرفياً، ليستعملَه
   `audio-q` (حيثُ الصوتُ **جوهرُ** السؤال) و`mcq` و`arrange` (حيثُ الصوتُ **إضافةٌ
   اختيارية** عبر الحقلِ `audio`). مصدرٌ واحدٌ للحقيقةِ بدلَ ثلاثِ نسخٍ تنحرفُ لاحقاً.
   ملاحظتانِ منقولتانِ من الأصلِ بلا تغيير: التشغيلُ **بضغطةٍ صريحة** (لا تلقائياً،
   فالمتصفّحاتُ تحجبُه)، وهو **مستقلٌّ عن كتمِ أصواتِ التغذيةِ الراجعة** correct/wrong.
   `audioPlayerHTML()` يعيدُ **الزرَّ وحدَه بلا غلاف** — والغلافُ مسؤوليةُ المستدعي عمداً:
   `audio-q` يضعُه ابناً مباشراً لـ`.audioq` (فترميزُه يبقى مطابقاً لما كان حرفاً بحرف،
   إذ `.audioq` فليكسٌ عموديٌّ يوسّطُ أبناءَه المباشرين، ولو لُفَّ الزرُّ لَتغيّرَ التوسيط)،
   بينما `mcq` و`arrange` يلفّانِه بـ`.qaudio` لضبطِ المسافةِ فوقَ الخيارات.
   وإن غابَ المسارُ لم يُبنَ شيءٌ أصلاً، وإن فشلَ التحميلُ ابتُلعَ الخطأُ فلا يكسرُ السؤال. */
function audioPlayerHTML(src, label){
  if(!src) return '';
  return `<button class="btn aplay" type="button">🔊 ${label||'استمع'}</button>`;
}
function wireAudioPlayer(scope, src){
  if(!src) return;
  const btn=scope.querySelector('.aplay'); if(!btn) return;
  const snd=new Audio(src); snd.preload='auto';
  btn.onclick=()=>{ try{ snd.currentTime=0; const p=snd.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){} };
}

/* ③ اختيار من متعدد: options[] + answer (فهرس الخيار الصحيح).
   **توسعتانِ اختياريتانِ متوافقتانِ تماماً مع القديم** (كلتاهما لا تعملُ إلا إذا وُجد
   الحقلُ الجديد، والأسئلةُ القائمةُ الـ١٦٩ لا تحملُه فتمرُّ على المسارِ نفسِه حرفياً):
   • `audio` (اختياريّ) — مسارُ ملفٍّ صوتيّ، يُعرَضُ مشغّلُه فوقَ الخيارات. يخدمُ أسئلةَ
     الاستماعِ في اللغةِ العربية. غيابُه = لا مشغّلَ ولا عنصرَ في DOM.
   • `answer` يقبلُ **مصفوفةَ فهارس** بدلَ فهرسٍ واحد، فأيُّ فهرسٍ فيها يُحتسَبُ صحيحاً.
     يخدمُ «اقترحْ بديلاً» و«ضعْ عنواناً آخر» حيثُ تصحُّ أكثرُ من إجابة.
     **التوافقُ بالبناءِ لا بالفحص:** فرعُ الرقمِ المفردِ هو تعبيرُ اليومِ حرفياً
     (`+btn.dataset.i===q.answer`)، والرقمُ لا يدخلُ `Array.isArray` أصلاً. */
/* إجابةٌ قصيرةٌ (رقمٌ أو كلمةٌ من ٣ أحرفٍ فأقلّ، بلا فراغ) تُوسَّطُ في بطاقتِها وتُكبَّرُ
   بدلَ أن تجلسَ ملتصقةً بحافّةٍ فارغةٍ (بلاغُ المالك). مشتركةٌ بين `renderMcq` (صنفُ
   `opt-num`) و`renderSequence` (صنفُ `seq-num`) — منطقٌ واحدٌ لكلا الاستعمالَين. */
function isShortAnswer(s){ return typeof s==='string' && !/\s/.test(s) && s.length<=3; }

function renderMcq(q, body, fb){
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  const isShort = isShortAnswer;
  body.innerHTML=(q.audio?`<div class="qaudio">`+audioPlayerHTML(q.audio)+`</div>`:'')+
    `<div class="opts">`+opts.map(x=>{const f=qFace(q,x.o);
      const shortCls=(!f.cls && isShort(x.o))?' opt-num':'';
      return `<button class="opt${f.cls}${shortCls}" data-i="${x.idx}">${f.html}</button>`;}).join('')+`</div>`;
  wireAudioPlayer(body,q.audio);
  let done=false;
  body.querySelectorAll('.opt').forEach(btn=>{btn.onclick=()=>{
    if(done)return;
    const i=+btn.dataset.i;
    const ok=Array.isArray(q.answer) ? q.answer.indexOf(i)>=0 : i===q.answer;
    if(ok){done=true;btn.classList.add('correct');body.querySelectorAll('.opt').forEach(b=>b.disabled=true);qWin(fb,'🎉 إجابة صحيحة!',2);}
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

/* هل النقرةُ (px,py) داخلَ منطقةِ الإجابة؟ — الإحداثياتُ نِسَبٌ مئويةٌ من إطارِ الرسم.
   والمنطقةُ شكلانِ لا شكلٌ واحد:
     • دائريّةٌ  {x,y,r}    — نصفُ القطرِ r، للأهدافِ المستديرةِ والصغيرة.
     • مستطيلةٌ {x,y,w,h}  — العرضُ والارتفاعُ كاملَين، للأهدافِ المربَّعةِ والمستطيلة.
   و(x,y) مركزُ المنطقةِ في الحالتَين، فتحويلُ هدفٍ من دائرةٍ إلى مستطيلٍ لا يمسُّ مركزَه.
   علّةُ الشكلِ الثاني: الدائرةُ حولَ هدفٍ مربَّعٍ تقتطعُ أركانَه الأربعة (نحوَ ٢١٪ من
   مساحتِه)، فتُرَدُّ نقرةٌ واقعةٌ في الجزءِ الصحيحِ نفسِه؛ وتوسيعُ نصفِ القطرِ لِتَسَعَها
   يبتلعُ ما حولَ الهدف. فالمستطيلُ يطابقُ الهدفَ بلا اقتطاعٍ ولا ابتلاع.
   وإن ذُكر أحدُ البعدَين وحدَه فالآخرُ مثلُه (مربّع).
   وشكلٌ ثالثٌ يُبنى منهما: **مصفوفةٌ** من مناطقَ [{…},{…}] — اتّحادُها هو منطقةُ الإجابة.
   علّتُه: هدفٌ واحدٌ في السؤالِ قد يكونُ **أجساماً متفرّقةً في الرسم** (أوراقُ النبتةِ
   الأربعُ حولَ ساقِها)، فلا يسعُها مستطيلٌ واحدٌ إلا بابتلاعِ ما بينَها — والمستطيلُ
   الجامعُ لأوراقِ النبتةِ يبتلعُ الساقَ، وهي **جوابُ سؤالٍ آخرَ في الدرسِ نفسِه**. */
function hitsSpot(sp,px,py){
  if(!sp) return false;
  if(Array.isArray(sp)) return sp.some(s=>hitsSpot(s,px,py));
  if(sp.w!=null||sp.h!=null){
    const hw=(sp.w!=null?sp.w:sp.h)/2, hh=(sp.h!=null?sp.h:sp.w)/2;
    return Math.abs(px-sp.x)<=hw && Math.abs(py-sp.y)<=hh;
  }
  return Math.hypot(px-sp.x,py-sp.y)<=(sp.r||10);
}

/* نسبةُ العرضِ إلى الارتفاعِ الحقيقيةُ للوسيط — من `viewBox` لِـSVG أو الأبعادِ الطبيعيةِ
   لصورة. تعودُ null إن تعذّرَ القياسُ (فيُعتمَدُ صندوقُ `fig` كما هو، السلوكُ القديم). */
function mediaAspect(media){
  if(!media) return null;
  if(media.tagName && media.tagName.toLowerCase()==='svg'){
    const vb=media.viewBox && media.viewBox.baseVal;
    if(vb && vb.width && vb.height) return vb.width/vb.height;
    return null;
  }
  return (media.naturalWidth && media.naturalHeight) ? media.naturalWidth/media.naturalHeight : null;
}
/* صندوقُ المحتوى الفعليُّ المرسومُ داخلَ `fig` — لا صندوقُ `fig` نفسِه دائماً.
   العلّة: `.figwrap` عنصرُ flex داخلَ `.stage-img`، وحين تتباعدُ نسبتُه المفروضةُ (عرضُها
   إلى ارتفاعِها) عن نسبةِ الوسيطِ الحقيقية، يُصغَّرُ المحتوى ويُتوسَّطُ (سلوكُ `viewBox`
   الافتراضيّ `xMidYMid meet`) تاركاً شريطَي تنفّسٍ فارغَين — فحسابُ النسبةِ المئويةِ على
   صندوقِ `fig` الخام يُزيحُ الإصابةَ عن `spot` المكتوبةِ على افتراضِ تطابُقِهما.
   **مقيسٌ حيّاً (بلاغُ المالك على g1m-7-1#٦):** رسمٌ ‎viewBox="0 0 560 260"‎ (نسبتُه ٢٫١٥)
   دخلَ صندوقاً ٦٠٦×٣٩٨ (نسبتُه ١٫٥٢)، فتصغّرَ المحتوى رأسياً وتوسَّط — نقرةٌ على السطرِ
   الثالثِ ظاهرياً (‏٧١٫٥٪ من ارتفاعِ صندوقِ `fig`) لم تُصِب `spot.y=78.8` المكتوبةَ على
   ارتفاعِ المحتوى الفعليّ لا صندوقِ `fig`. */
function figContentBox(fig){
  const box=fig.getBoundingClientRect();
  const ratio=mediaAspect(fig.querySelector('svg,img'));
  if(!ratio || !box.width || !box.height) return box;
  const boxRatio=box.width/box.height;
  let w,h,x,y;
  if(boxRatio>ratio){ h=box.height; w=h*ratio; x=box.left+(box.width-w)/2; y=box.top; }
  else{ w=box.width; h=w/ratio; x=box.left; y=box.top+(box.height-h)/2; }
  return {left:x, top:y, width:w, height:h};
}
/* نقطةُ نقرٍ واحدةٌ تُستعمَلُ لغرضَين مختلفَين: موضعُ العلامةِ المرئيةِ نِسبةٌ من صندوقِ
   `fig` كما يراهُ المستخدمُ (مهما كان توسيطُ المحتوى)، واختبارُ الإصابةِ نِسبةٌ من صندوقِ
   المحتوى الفعليِّ وحدَه — فلا تنزاحُ العلامةُ عن إصبعِ الطالبِ رغم تصحيحِ الحساب. */
function figClickPoint(fig,e){
  const box=fig.getBoundingClientRect();
  const cbox=figContentBox(fig);
  return {
    markX:(e.clientX-box.left)/box.width*100, markY:(e.clientY-box.top)/box.height*100,
    px:(e.clientX-cbox.left)/cbox.width*100, py:(e.clientY-cbox.top)/cbox.height*100
  };
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
    const {markX,markY,px,py}=figClickPoint(fig,e);
    if(px<0||px>100||py<0||py>100) return;
    const mark=document.createElement('div');mark.className='hs-mark';mark.style.left=markX+'%';mark.style.top=markY+'%';
    if(hitsSpot(q.spot,px,py)){done=true;mark.classList.add('hit');qWin(fb,'🎯 أحسنت! نقرت على المكان الصحيح',2);}
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
    const {markX,markY,px,py}=figClickPoint(fig,e);
    if(px<0||px>100||py<0||py>100) return;
    const mark=document.createElement('div');mark.className='hs-mark';mark.style.left=markX+'%';mark.style.top=markY+'%';
    if(hitsSpot(q.spot,px,py)){done=true;mark.classList.add('hit');qWin(fb,'🔍 أحسنت! اكتشفت الخطأ',2);}
    else{mark.classList.add('miss');qFail(fb,'ليس هنا الخطأ، دقّق أكثر');setTimeout(()=>mark.remove(),800);}
    fig.appendChild(mark);
  };
}

/* ⑬ السؤال الصوتي (audio-q): sound (ملف صوت) + options[{image,label}] + answer (فهرس الصحيح).
   يُشغَّل الصوت بزر «استمع»، والطالب يختار مصدره من صور الخيارات (تُخلط تلقائياً كنمط MCQ).
   صوت السؤال يُشغَّل بضغطة صريحة على الزر (مستقلّ عن كتم أصوات التغذية الراجعة correct/wrong).
   إن تعذّر تحميل صورة خيار تُخفى وتبقى تسميتها (تدرّج سليم قبل توليد الصور). */
function renderAudioQ(q, body, fb){
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  body.innerHTML=`<div class="audioq">`+
    audioPlayerHTML(q.sound)+                       // الزرُّ نفسُه بلا غلافٍ — ترميزٌ مطابقٌ لما كان
    `<div class="aopts">`+opts.map(x=>
      `<button class="aopt" data-i="${x.idx}">`+
      (x.o.image?`<img class="aopt-img" src="${x.o.image}" alt="${x.o.label||''}">`:'')+
      (x.o.label?`<span class="aopt-label">${x.o.label}</span>`:'')+
      `</button>`).join('')+
    `</div></div>`;
  // تشغيل صوت السؤال عند الطلب (ضغطة صريحة؛ لا يخضع لكتم التغذية الراجعة)
  wireAudioPlayer(body,q.sound);
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
    const f=qFace(q,txt);
    const numCls=(!f.cls && isShortAnswer(txt))?' seq-num':'';
    li.className='seqitem'+f.cls; li.dataset.k=txt; li.draggable=true;
    li.innerHTML=`<span class="seq-txt${numCls}">${f.html}</span><span class="seq-grip" aria-hidden="true">≡</span>`;
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

/* وجهُ البطاقةِ: نصٌّ خامٌّ افتراضاً، و**رسمٌ يجاورُ الكلمة** حين يحملُ السؤالُ
   `pics: true` ويكونُ للكلمةِ رسمٌ في سِجِلِّ `js/qpics.js`.

   **ستّةُ أنواعٍ تُنادي هذه الدالّة**، فالمنطقُ مكتوبٌ مرّةً: التصنيفُ (بطاقاتُ
   البنك) · الاستبعادُ (الخيارات) · التوصيلُ (طرفا الزوج) · الترتيبُ التسلسليُّ
   (الخطوات) · **الاختيارُ من متعدد (الخيارات)** · **بطاقاتُ الذاكرة (وجهُ البطاقة)**.
   والأخيرانِ فُتِحا ٢٠٢٦-٠٨-٢٧ لإتمامِ علومِ الصفِّ الأول.
   الكلمةُ التي لا رسمَ لها تبقى نصّاً — فالسِّجِلُّ الناقصُ لا يكسرُ سؤالاً.
   العلّةُ التربوية: تلميذُ الصفَّينِ الأولِ والثاني لَمّا يُتقنِ القراءة، فالكلمةُ
   وحدَها تُحوّلُ سؤالَ العلومِ إلى اختبارِ قراءة (التفصيلُ في رأسِ `qpics.js`). */
/* ⚠️ **`picMap` — مفتاحٌ خاصٌّ بالسؤالِ حين تكونُ الكلمةُ مشترَكةً بينَ معنيَين.**
   السِّجِلُّ مفتاحُه الكلمةُ المجرّدة، فالكلمةُ الواحدةُ رسمٌ واحدٌ في المنصّةِ
   كلِّها. وذلك يكفي إلا حيثُ تُشيرُ الكلمةُ إلى شيئَينِ مختلفَين: **«الساقُ»
   ساقُ نبتةٍ في درسِ النبات، وساقُ إنسانٍ في درسِ الجسم** — فأيُّ رسمٍ عُلِّقَ
   بالمفتاحِ أخطأَ الدرسَ الآخر. و`picMap: { "الساقُ": "رِجل" }` على السؤالِ
   يحوّلُ الكلمةَ إلى مفتاحٍ آخرَ **في هذا السؤالِ وحدَه**، فيبقى السجلُّ
   مصدراً واحداً ولا يُنسَخُ رسمٌ باسمَين.
   والتحويلُ يُطبَّقُ على **الكلمةِ المجرّدة** (‏`qPicKey`) فيستوي أن يكتبَ
   المؤلِّفُ الكلمةَ مشكولةً أو خالية. */
/* ⚠️ **`pics: "a"` أو `"b"` — تصويرُ عمودٍ واحدٍ في التوصيل.**
   في `matching` قد يكونُ تصويرُ العمودَينِ معاً **تسريباً للجواب** لا إعانةً:
   في `g1s-3-4#3` («صِلْ كُلَّ عُضوٍ بالحاسّة») العمودُ الأيسرُ أعضاءٌ والأيمنُ
   أسماءُ حواسٍّ تُحالُ إلى أعضائِها — فَـ«العَينُ» و«البَصَرُ» صورتانِ متطابقتان،
   فيُطابقُ الطفلُ الصورتَينِ بلا تفكيرٍ ويسقطُ ما يقيسُه السؤال.
   والحلُّ تصويرُ **عمودِ الأعضاءِ وحدَه**: يتعرّفُ التلميذُ على العضوِ بالصورةِ
   ثمّ يربطُه بالكلمةِ المكتوبة — وهو هدفُ الدرسِ نفسُه.
   ويخدمُ الحالةَ الثانيةَ كذلك: طرفٌ يُرسَمُ وطرفٌ **عبارةٌ** لا تُرسَم
   («اليَدُ ↔ نُمسِكُ بِها»)، فيُصوَّرُ ما يُرسَمُ ويبقى الآخرُ نصّاً.
   ⛔ **وهذا ليس نقضاً لقاعدةِ «نصفِ الرسوم»** — تلك تمنعُ رسمَ بعضِ عناصرِ
   **مجموعةٍ واحدةٍ** يختارُ منها التلميذ، وهنا عمودانِ دورُهما مختلف. */
function qFace(q, w, side){
  const on = q && (q.pics === true || (side && q.pics === side));
  if (!on) return { cls:'', html:w };
  let key = w;
  if (q && q.picMap && window.qPicKey) {
    const kw = window.qPicKey(w);
    for (const k in q.picMap) if (window.qPicKey(k) === kw) { key = q.picMap[k]; break; }
  }
  const p = window.qPic ? window.qPic(key) : '';
  return p ? { cls:' haspic', html:`<span class="qpic">${p}</span><span class="qpic-t">${w}</span>` }
           : { cls:'',        html:w };
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
    all.map(w=>{const f=qFace(q,w);return `<div class="chip${f.cls}" draggable="true" data-w="${w}">${f.html}</div>`;}).join('')+
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
  // لوحة ألوان: دلو طلاء مولَّدٌ بجيميناي عبر سير n8n (بلاغُ المالك) ثمّ مُعالَجٌ محلياً:
  // جسم الدلو صورةٌ نقطيّةٌ ثابتة (images/دلو-طلاء.png) بخلفيةٍ شفّافةٍ (إزالةٌ بالفيضان
  // اللونيّ من الزوايا، لا تمسّ اللمعةَ البيضاءَ الداخليةَ فوقَ الجسم) ومناطقُ الطلاءِ
  // الأربع مقطوعةٌ منها بالكامل (كانت مولَّدةً بلونِ عزلٍ مجنتا صريح)، فتُكشَفُ عبرها
  // مساراتُ SVG الأربعةُ التالية (مُتتبَّعةٌ بـvtracer من الصورةِ الأصليةِ فتطابقُ حدودَ
  // القطعِ تماماً) المرسومةُ **تحتَ** الصورة بلون خيار السؤال — فيبدو الطلاءُ الملوَّنُ
  // داخلَ حدودِ الدلوِ نفسِها دون أصولٍ جديدةٍ لكلِّ لون.
  const bucket=color=>`<span class="bucket-wrap"><svg class="bucket-ic" viewBox="0 0 677 763" aria-hidden="true">
    <path d="M0 0 C2.56 -0 5.11 -0.02 7.67 -0.04 C21.94 -0.09 35.94 1.14 50 3.62 C50.69 3.73 51.38 3.84 52.09 3.95 C56.2 4.67 59.45 5.5 62.69 8.19 C66.13 14.85 70.03 24.54 68.69 32.19 C66.8 35.34 64.34 37.66 61.69 40.19 C60.53 41.53 59.39 42.88 58.25 44.25 C54.71 48.29 50.79 51.72 46.69 55.19 C45.46 56.29 44.23 57.39 43 58.5 C34.94 65.52 26.37 71.85 17.5 77.81 C16.86 78.25 16.21 78.69 15.54 79.14 C10.94 82.19 10.94 82.19 8.69 82.19 C8.69 82.85 8.69 83.51 8.69 84.19 C8.02 84.5 7.34 84.81 6.65 85.14 C-0.86 88.74 -0.86 88.74 -3.43 91.31 C-6.21 94.08 -9.58 95.12 -13.31 96.19 C-13.97 96.19 -14.63 96.19 -15.31 96.19 C-15.31 96.85 -15.31 97.51 -15.31 98.19 C-21.05 101.23 -26.89 103.6 -32.98 105.88 C-37.1 107.49 -41.08 109.35 -45.07 111.27 C-47.31 112.19 -47.31 112.19 -50.31 112.19 C-50.31 112.85 -50.31 113.51 -50.31 114.19 C-51.28 114.47 -52.25 114.74 -53.25 115.03 C-62.74 117.78 -72.17 120.7 -81.55 123.77 C-85.72 125.12 -89.83 126.34 -94.12 127.23 C-109.23 130.43 -119.17 142.68 -128.31 154.19 C-129.69 155.87 -131.08 157.53 -132.5 159.19 C-133.09 159.89 -133.68 160.59 -134.29 161.31 C-138.91 165.6 -143.18 166.59 -149.37 166.5 C-150.56 166.49 -151.75 166.49 -152.97 166.49 C-156.16 166.2 -158.43 165.55 -161.31 164.19 C-161.31 163.53 -161.31 162.87 -161.31 162.19 C-170.23 160.49 -181.46 158.95 -189.31 164.19 C-196.31 170.98 -199.46 180.52 -199.75 190.12 C-199.54 196.23 -198.76 202.26 -197.93 208.31 C-197.81 209.24 -197.68 210.16 -197.55 211.11 C-197.42 211.99 -197.29 212.86 -197.16 213.76 C-197.04 214.54 -196.93 215.32 -196.81 216.12 C-196.31 218.19 -196.31 218.19 -194.31 221.19 C-194.08 223.94 -193.98 226.56 -194 229.31 C-194 229.69 -194 229.69 -194.01 231.63 C-194.13 237.81 -194.54 243.91 -198.71 248.85 C-201.46 251.15 -203.79 251.13 -207.31 251.19 C-211.77 249.68 -214.67 248.14 -217.31 244.19 C-217.53 241.68 -217.64 239.32 -217.62 236.81 C-217.62 236.09 -217.62 235.38 -217.61 234.64 C-217.51 229.02 -216.47 223.97 -215.04 218.53 C-213.64 212.16 -213.53 205.68 -213.31 199.19 C-213.28 198.69 -213.28 198.69 -213.15 196.2 C-212.63 180.39 -216.43 166.35 -221.65 151.63 C-227.42 135.35 -233.21 118.47 -225.63 101.65 C-225.2 100.84 -224.76 100.02 -224.31 99.19 C-224.05 98.7 -224.05 98.7 -222.77 96.22 C-218.94 89.29 -214.45 83.18 -209.31 77.19 C-208.97 76.78 -208.97 76.78 -207.26 74.73 C-199.86 66.14 -191.05 58.05 -181.31 52.19 C-180.32 52.19 -179.33 52.19 -178.31 52.19 C-178.31 51.53 -178.31 50.87 -178.31 50.19 C-177.57 49.94 -176.82 49.69 -176.06 49.44 C-173.31 48.19 -173.31 48.19 -171.43 46.19 C-168.65 43.57 -165.98 43.03 -162.31 42.19 C-162.31 41.53 -162.31 40.87 -162.31 40.19 C-126.8 22.81 -126.8 22.81 -119.31 23.19 C-119.31 22.53 -119.31 21.87 -119.31 21.19 C-118.75 21.04 -118.18 20.89 -117.6 20.74 C-110.18 18.76 -102.83 16.57 -95.48 14.34 C-93.83 13.85 -92.19 13.35 -90.54 12.86 C-88.64 12.29 -86.74 11.68 -84.85 11.07 C-80.22 9.91 -75.62 9.48 -70.87 9.06 C-69.95 8.97 -69.03 8.89 -68.08 8.8 C-65.82 8.59 -63.56 8.38 -61.31 8.19 C-61.31 7.53 -61.31 6.87 -61.31 6.19 C-61.01 6.15 -61.01 6.15 -59.49 5.94 C-56.74 5.57 -53.99 5.19 -51.25 4.81 C-50.3 4.68 -49.36 4.56 -48.39 4.43 C-47.93 4.36 -47.93 4.36 -45.59 4.04 C-44.74 3.92 -43.9 3.81 -43.03 3.69 C-40.31 3.19 -40.31 3.19 -36.93 2.17 C-25.31 -0.99 -11.98 -0 0 0 Z " fill="${color}" transform="translate(372.30810546875,255.814697265625)"/>
    <path d="M0 0 C0.66 0 1.32 0 2 0 C2.27 0.97 2.54 1.94 2.81 2.94 C3.2 3.95 3.6 4.96 4 6 C4.99 6.33 5.98 6.66 7 7 C11.93 13.11 12.48 22.21 12.32 29.8 C11.84 33.1 10.42 34.79 8 37 C3.98 39.68 0.73 39.69 -4 39 C-7.34 36.94 -8.83 35.26 -11 32 C-12.51 20.05 -8.34 12.01 -1.84 2.31 C-1.23 1.55 -0.63 0.78 0 0 Z " fill="${color}" transform="translate(166,549)"/>
    <path d="M0 0 C0.99 0 1.98 0 3 0 C7 6.75 7 6.75 7 9 C7.66 9 8.32 9 9 9 C11.42 13.98 11.65 18.39 10.31 23.75 C8.56 26.75 7.21 27.67 4 29 C-0.3 29.54 -3.29 29.48 -7 27 C-7 26.34 -7 25.68 -7 25 C-7.66 25 -8.32 25 -9 25 C-9.88 17.34 -9.75 12.11 -5.06 5.75 C-3.43 3.76 -1.82 1.82 0 0 Z " fill="${color}" transform="translate(61,483)"/>
    <path d="M0 0 C4.94 4.94 6.88 14.83 7.36 21.7 C6.65 26.3 3.24 28.91 0 32 C-1.16 33.34 -2.3 34.7 -3.44 36.06 C-6.98 40.11 -10.9 43.54 -15 47 C-16.23 48.1 -17.46 49.21 -18.69 50.31 C-26.75 57.34 -35.32 63.66 -44.19 69.62 C-44.84 70.06 -45.48 70.5 -46.15 70.95 C-50.75 74 -50.75 74 -53 74 C-53 74.66 -53 75.32 -53 76 C-53.68 76.31 -54.35 76.63 -55.05 76.95 C-62.56 80.56 -62.56 80.56 -65.12 83.12 C-67.9 85.9 -71.27 86.93 -75 88 C-75.66 88 -76.32 88 -77 88 C-77 88.66 -77 89.32 -77 90 C-82.75 93.04 -88.58 95.41 -94.67 97.7 C-98.79 99.31 -102.77 101.16 -106.76 103.08 C-109 104 -109 104 -112 104 C-112 104.66 -112 105.32 -112 106 C-114.64 106.33 -117.28 106.66 -120 107 C-117.76 104.76 -116.05 104.07 -113.12 102.9 C-112.12 102.49 -111.13 102.09 -110.1 101.68 C-109.57 101.46 -109.57 101.46 -106.88 100.38 C-97 96.32 -87.41 92.03 -78 87 C-77.65 86.81 -77.65 86.81 -75.89 85.88 C-54.1 74.23 -34.67 60.81 -16.06 44.63 C-14.18 42.99 -12.28 41.44 -10.32 39.89 C-7.41 37.52 -5.12 34.86 -2.71 32 C-1 30 -1 30 0.56 28.46 C3.22 25.75 4.36 23.6 4.56 19.88 C4.3 14.83 2.62 10.3 0.88 5.6 C0 3 0 3 0 0 Z " fill="${color}" transform="translate(434,264)"/>
    <image href="images/دلو-طلاء.png" width="677" height="763"/>
  </svg></span>`;
  const swatches=q.palette.map(p=>
    `<button class="cswatch" type="button" data-color="${p.color}" title="${p.name}">`+
      bucket(p.color)+
      `<span class="cswatch-name">${p.name}</span></button>`).join('');
  // شارات المفردات: المفردة وحدها دون اسم اللون أو أيقونته (كي لا تُكشف الإجابة)
  // «تسمية الجزء تُعرَض فقط إن كانت معلومة تعليمية»: showLabels الصريح يتقدّم على الافتراض،
  // وإلا تُخفى الشارات تلقائياً إن كانت كل الأسماء معرّفات متسلسلة «خانة N» (الطالب يلوّن
  // بالموضع لا بالاسم). data-name يبقى دائماً في الرسم — التحقّق ومساحة اللمس لا يتأثران.
  const techName=/^خانة\s*[٠-٩0-9]+$/;
  const showLabels = q.showLabels!==undefined ? !!q.showLabels
                   : !(q.parts.length && q.parts.every(pt=>techName.test(String(pt.name).trim())));
  const instr=showLabels ? q.parts.map(pt=>`<span class="cinstr">${pt.name}</span>`).join('') : '';
  body.innerHTML=
    `<div class="colorq">`+
      `<div class="cpalette">${swatches}</div>`+
      (instr?`<div class="cinstrbar">${instr}</div>`:'')+
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
  };});
  /* الجزء الواحد قد يكون **عدّة عناصر** تحمل data-name نفسه (رسمٌ متتبَّعٌ بـvtracer
     يُخرج الأزهارَ خمسةَ مسارات) — فالنقر على أيّها يلوّن الجزء كلَّه، والتحقّق يقرأ
     أوّلها. والعنصر المفرد حالةٌ خاصّةٌ من ذلك فلا يتغيّر سلوكه. */
  const partsOf=name=>[...body.querySelectorAll('.cpart[data-name="'+name+'"]')];
  // تلوين جزء عند الضغط (بعد اختيار لون)
  body.querySelectorAll('.cpart').forEach(part=>{
    part.addEventListener('click',()=>{
      if(!chosen){ fb.textContent='اختر لوناً أوّلاً من اللوحة 🎨'; fb.className='fb qfb'; return; }
      partsOf(part.dataset.name).forEach(el=>{
        el.style.fill=chosen; el.dataset.fill=chosen; el.classList.remove('cwrong');
      });
    });
  });
  // التحقّق: كل جزء مطلوب باللون الصحيح حسب التعليمات
  body.querySelector('.btn-check').onclick=()=>{
    let ok=0; const need=q.parts.length;
    q.parts.forEach(pt=>{
      const els=partsOf(pt.name); if(!els.length) return;
      if(norm(els[0].dataset.fill)===norm(pt.color)){ ok++; els.forEach(el=>el.classList.remove('cwrong')); }
      else els.forEach(el=>el.classList.add('cwrong'));
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
/* ═══ قاعدة تصميم دائمة — DESIGN_RULES.md §«أسئلة البازل — صورة القطع» ═══
   صورة البازل يجب أن تكون ممتلئة المعالم بالكامل: كل قطعة من قطع الشبكة تحمل
   معالم مميّزة يستدلّ بها الطالب على موضعها — لا قطعة خالية بلا معالم.
   الحارس pzGuard أدناه يفحص كل خلية عند تحميل الصورة ويحذّر صراحةً من أي خلية
   شبه خالية، فلا تُعتمد صورة مخالفة أثناء التأليف (فحصٌ لا رفض — لا يكسر
   السؤال أمام الطالب). لا تُزل الحارس ولا تتجاهل تحذيره. */
function renderPuzzle(q, body, fb){
  const cols=(q.grid&&q.grid.cols)||3, rows=(q.grid&&q.grid.rows)||3, n=cols*rows;
  /* فحص امتلاء المعالم (DESIGN_RULES.md): لكل خلية نحسب نسبة البكسلات المخالفة
     لمتوسط لون الخلية — الخلية الملساء (خلفية بلا محتوى) نسبتها شبه صفرية. */
  function pzGuard(im){
    try{
      const S=120, cv=document.createElement('canvas');
      cv.width=cols*S; cv.height=rows*S;
      const g=cv.getContext('2d'); g.drawImage(im,0,0,cv.width,cv.height);
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
        const d=g.getImageData(c*S,r*S,S,S).data, N=S*S;
        let mr=0,mg=0,mb=0;
        for(let i=0;i<d.length;i+=4){ mr+=d[i]; mg+=d[i+1]; mb+=d[i+2]; }
        mr/=N; mg/=N; mb/=N;
        let feat=0;
        for(let i=0;i<d.length;i+=4)
          if(Math.abs(d[i]-mr)+Math.abs(d[i+1]-mg)+Math.abs(d[i+2]-mb)>60) feat++;
        if(feat/N<0.02)
          console.warn('%c[بازل] ⛔ قطعة شبه خالية من المعالم (الصف '+(r+1)+'، العمود '+(c+1)+' من '+
            rows+'×'+cols+') — خلاف قاعدة DESIGN_RULES.md §أسئلة البازل — صورة القطع. السؤال: '+
            (q.prompt||'').slice(0,50), 'color:#c0392b;font-weight:bold');
      }
    }catch(e){}
  }
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
    fitBoard(); sizePieces();
    pzGuard(probe); };   /* حارس امتلاء المعالم (DESIGN_RULES.md §أسئلة البازل) */
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
  body.innerHTML=`<div class="excl">`+opts.map(x=>{const f=qFace(q,x.o);return `<button class="excl-opt${f.cls}" data-i="${x.idx}">${f.html}</button>`;}).join('')+`</div>`;
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
  const out=renderTokenOrder(q, body, fb, {
    target, scatter,
    wrapClass:'arrange', slotClass:'', chipClass:'',
    bankTitle:'الحروف:',
    reveal:q.word,
    win:'🎉 أحسنت! كوّنت الكلمة: '+q.word,
    fail:'راجع الترتيب',
    again:()=>renderArrange(q,body,fb)
  });
  /* `audio` (اختياريّ) — يسمعُ الطالبُ الكلمةَ ثمّ يرتّبُ حروفَها، فيخدمُ القضايا الإملائية.
     يُحقَنُ **بعدَ** المحرّكِ المشتركِ لأنّه هو الذي يكتبُ `body.innerHTML`، وبذلك يبقى
     `renderTokenOrder` بلا تعديلٍ فلا يتأثّرُ النوعُ `sentence` الذي يشاركُه المحرّك.
     وزرُّ «إعادة ↺» يستدعي `renderArrange` فيُعادُ بناءُ المشغّلِ تلقائياً. */
  if(q.audio){
    const bar=document.createElement('div');
    bar.className='qaudio';
    bar.innerHTML=audioPlayerHTML(q.audio,'استمع للكلمة');
    body.insertBefore(bar, body.firstChild);
    wireAudioPlayer(bar,q.audio);
  }
  return out;
}

/* محرّكُ الترتيبِ المشترك — يخدمُ `arrange` (حروف) و`sentence` (كلمات) بمنطقٍ واحد.
   الفرقُ بينهما بيانيٌّ لا سلوكيّ: ما يُرتَّب رمزٌ (حرفٌ أو كلمة)، والخاناتُ والبنكُ
   والتحقّقُ والكشفُ سواء. أصنافُ الـDOM تبقى أصنافَ `arrange` نفسَها (`lslot`/`lchip`)
   فترثُ CSS القائمَ وقشرةَ المادةِ تلقائياً، ويضيفُ النوعُ الجديدُ صنفَه المميِّزَ فوقَها.
   cfg: { target[], scatter[], wrapClass, slotClass, chipClass, bankTitle, reveal, win, fail, again } */
function renderTokenOrder(q, body, fb, cfg){
  const target=cfg.target, scatter=cfg.scatter.slice();
  const n=target.length;
  // خلط الحروف بحيث لا يبدأ البنك بالترتيب الصحيح
  let bank=shuffle(scatter);
  if(n>1){ let g=0; while(bank.every((c,i)=>c===target[i]) && g++<20) bank=shuffle(scatter); }
  let cells='';
  for(let i=0;i<n;i++) cells+=`<span class="lslot ${cfg.slotClass}" data-i="${i}" data-answer="${target[i]}"></span>`;
  body.innerHTML=`<div class="arrange ${cfg.wrapClass}"><div class="lslots">${cells}</div>`+
    `<div class="bank arrbank"><div class="bt">${cfg.bankTitle}</div><div class="chips lbank">`+
    bank.map(c=>`<div class="chip lchip ${cfg.chipClass}" draggable="true" data-w="${c}">${c}</div>`).join('')+
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
      qWin(fb,cfg.win,3);
      // كشف النصّ كاملاً متّصلاً بعد أن رتّب الطفل رموزه منفصلة
      const wrap=body.querySelector('.lslots');
      if(wrap) wrap.innerHTML=`<span class="lword ${cfg.chipClass}">${cfg.reveal}</span>`;
    }
    else qFail(fb,`${cfg.fail} — الصحيح ${arNum(ok)} من ${arNum(n)}`);
  };
  body.querySelector('.btn-reset').onclick=cfg.again;
}

/* ⑪ الخريطة الذهنية الناقصة (mindmap): center + branches[{label, answer}] + distractors[]
   عقدة مركزية تتفرّع إلى فروع، لكلّ فرع عنوان ثابت وخانة فارغة يسحب إليها الطالب الكلمة الصحيحة
   من البنك (فأرة + لمس على السبورة). تُرسم خطوط منحنية من المركز إلى كل فرع وتُحدَّث ديناميكياً.
   تُحرّك بطاقة الكلمة نفسها إلى الخانة (تدعم التكرار)؛ نقر الخانة الممتلئة يعيد كلمتها للبنك.
   عند التحقّق: الخانة الصحيحة خضراء والخاطئة حمراء
   ▸ **ويقبل `pics` كبقيّة أنواع البطاقات** (٢٠٢٦-٠٨-٢٨): البطاقةُ **تنتقلُ بعينِها**
     إلى الخانة (‏`slot.appendChild(dragged)`) فيسافرُ الرسمُ معها بلا منطقٍ إضافيّ،
     والتحقّقُ يقرأُ `data-w` لا نصَّ البطاقة فلا يتأثّر. */
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
    bankWords.map(w=>{const f=qFace(q,w);
      return `<div class="chip mmchip${f.cls}" draggable="true" data-w="${w}">${f.html}</div>`;}).join('')+
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
  // رسمٌ اختياريٌّ فوق الشريط: svg مباشر أو image من images/ — مرجعٌ بصريٌّ للمقدار
  // المطلوب تقديرُه (قلمٌ يُقدَّر طولُه مثلاً). يُحذف كلياً من DOM إن لم يوجد في البيانات.
  const sldFig=(q.svg||q.image)
    ? `<div class="sldfig">${q.svg?q.svg:`<img src="${q.image}" alt="">`}</div>`
    : '';
  body.innerHTML=`<div class="slider">`+
    sldFig+
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
  const cards=shuffle(q.pairs.reduce((a,p,i)=>a.concat([{k:i,s:'a',t:p.a},{k:i,s:'b',t:p.b}]),[]));
  const cols=cards.length<=6?3:4;   // عدد الأعمدة المفضَّل (٦ بطاقات ← ٣ أعمدة، ٨ ← ٤)
  const total=q.pairs.length;
  /* ‏--memcols لا قالب أعمدة إنلاين (DESIGN_RULES.md §أسئلة بطاقات الذاكرة —
     تخطيط الشبكة): قالب الأعمدة المتجاوب في .memgrid (css/style.css) يحقق العدد
     المفضَّل في العرض الواسع ويقلّله تلقائياً إن ضاق الإطار، فلا تُقصّ بطاقة أبداً. */
  body.innerHTML=`<div class="memory">`+
    `<div class="memgrid" style="--memcols:${cols}">`+
    cards.map(c=>{const f=qFace(q,c.t);
      return `<button class="memcard" type="button" data-k="${c.k}" data-s="${c.s}" data-t="${c.t}">`+
        `<span class="memface memback">🎴</span>`+
        `<span class="memface memfront${f.cls}">${f.html}</span>`+
      `</button>`;}).join('')+
    `</div>`+
    `<div class="actions"><button class="btn btn-reset">إعادة ↺</button></div>`;
  let first=null, lock=false, matched=0;
  body.querySelectorAll('.memcard').forEach(card=>{ card.onclick=()=>{
    // تجاهل النقر أثناء قلب زوج غير متطابق، أو على بطاقة مكشوفة/متطابقة
    if(lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    if(!first){ first=card; return; }           // البطاقة الأولى في الدور
    /* ═══ التطابقُ بنصِّ البطاقتَينِ لا بفهرسِ زوجِهما ═══
       كانت البطاقتانِ تتطابقانِ بالفهرسِ وحدَه، فإن تكرّرَ نصٌّ في وجهٍ واحدٍ — وهو
       واردٌ ومقصودٌ في «طابِقْ كلَّ مقارنةٍ بصحّتِها» حيثُ «صَحيح» تتكرّرُ ثلاثاً —
       صارت ثلاثُ بطاقاتٍ لا يفرّقُ التلميذُ بينها، وقلبُ الصحيحةِ منها **يُرَدُّ
       خطأً** إن لم تكنْ هي المربوطةَ فهرسياً. مقيسٌ في `g3m-12-2#٦`: قُلِبَت
       «٢٥ < ٢٥٠» و«صَحيح» — مطابقةٌ سليمةٌ تماماً — فرُدَّت، **فلا يُحَلُّ السؤالُ
       إلا بالحظّ**. فالمقياسُ الآنَ: وجهانِ مختلفانِ (‏`a` و`b`) ونصّاهما زوجٌ في
       البيانات. ومبادلةُ الفهرسِ بين القرينتَينِ المتطابقتَينِ نصّاً تُبقي ما تبقّى
       قابلاً للمطابقةِ كاملاً (مبادلةٌ غيرُ مرئيةٍ — النصُّ واحد). */
    const A=first.dataset.s==='a'?first:card, B=first.dataset.s==='a'?card:first;
    const okPair=first.dataset.s!==card.dataset.s &&
      q.pairs.some(p=>p.a===A.dataset.t && p.b===B.dataset.t);
    if(okPair){                                  // تطابق: تبقى البطاقتان مكشوفتين
      if(first.dataset.k!==card.dataset.k){
        const twin=[].slice.call(body.querySelectorAll('.memcard')).filter(x=>
          x!==card && x.dataset.k===first.dataset.k && x.dataset.s===card.dataset.s)[0];
        if(twin){ twin.dataset.k=card.dataset.k; card.dataset.k=first.dataset.k; }
      }
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

/* ⑳ خط الأعداد (number-line): min/max/step/labelEvery لضبط التدريج + mode
   ثلاثة أوضاع — place (وضع عدد على الخط)، jump (القفز بالعدّ)، round (التقريب لأقرب عشرة).
   التفاعل: نقر التدريجة أو سحب المؤشّر إليها (فأرة + لمس)، مع tolerance لمساحة الخطأ.
   الرسم SVG بالكامل من محرّك التدريج المشترك أعلاه.

   ⏳ **توحيد مؤجَّل مع `slider` (قرار مالك):** النوعان يتقاسمان الأساس نفسه — شريط أفقيّ
   بتدريج ومؤشّر يُسحب — لكنّ محرّكيهما منفصلان: `renderSlider` مبنيّ على عناصر DOM
   (`.sld-track`) وهذا مبنيّ على SVG ومحرّك التدريج المشترك. **يُؤجَّل دمجهما في محرّك
   واحد إلى دفعة تنظيف `zoom-reveal`** فيُنجَز التنظيفان معاً في طلب مستقلّ. حتى ذلك
   الحين: **لا تُبنى أوضاع جديدة في أيٍّ منهما اعتماداً على الآخر**، ولا يُكسر توافق
   صيغة بيانات `slider` القائمة. (المرجع: «قرار إلغاء» في `question-types.md`.) */
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

/* ㉑ لوحة المائة (hundred-chart): شبكة من from إلى to بعدد أعمدة columns (افتراضياً ١٠)
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
  /* ‏`qfit-flex` = وسمُ «الوسيطِ المرن» في قاعدةِ الاحتواءِ الأساسية (css/style.css §④):
     الشبكةُ المربّعةُ ١٠×١٠ أطولُ من أن تسعَها نافذةُ أيِّ إطارٍ بعرضِها الكامل مع نصِّ
     السؤالِ وبطاقاتِه وأزراره، فتُعلَنُ مرنةً لتضيقَ إلى ما تبقّى (نسبتُها محفوظةٌ
     بـpreserveAspectRatio)، وتُعطي طبقةُ الإطارِ البطاقةَ أوسعَ إطارٍ مسموحٍ لأجلِها. */
  body.innerHTML=`<div class="hchart">${bar}`+
    `<svg class="hcsvg qfit-flex" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${cellsHtml}</svg>`+
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

/* ㉒ المصفوفات (array): rows × cols + answerSentence (جملة الضرب أو الجمع المتكرر)
   وضعان — build يبني فيها الطالب الشبكة بالنقر على لوح فارغ، وread تُعرض فيها المصفوفة
   مبنيّةً ويختار جملتها من options. الرسم SVG من محرّك الشبكة المشترك. */
function renderArray(q, body, fb){
  const rows=Math.max(1,Math.round(+q.rows)), cols=Math.max(1,Math.round(+q.cols));
  const mode=q.mode||'build';
  const CELL=100, R=30;                                   // خطوة الخلية ونصف قطر القرص
  if(mode==='read'){
    // ── وضع القراءة: المصفوفة معروضة والطالب يختار جملتها ──
    const W=cols*CELL, H=rows*CELL;
    let dots='';
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++)
      dots+=`<circle class="ar-dot" cx="${(cols-1-c)*CELL+CELL/2}" cy="${r*CELL+CELL/2}" r="${R}"></circle>`;
    const opts=shuffle((q.options||[]).slice());
    body.innerHTML=`<div class="arrayq">`+
      `<svg class="arsvg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${dots}</svg>`+
      `<div class="opts">`+opts.map(o=>`<button class="opt" data-o="${o}">${o}</button>`).join('')+`</div>`+
      `</div>`;
    let done=false;
    body.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
      if(done) return;
      if(btn.dataset.o===q.answerSentence){
        done=true; btn.classList.add('correct');
        body.querySelectorAll('.opt').forEach(b=>b.disabled=true);
        qWin(fb,'🎉 أحسنت! '+q.answerSentence,3);
      } else { btn.classList.add('wrong'); btn.disabled=true; qFail(fb,'ليست الجملة الصحيحة — عُدَّ الصفوف ثم ما في كل صفّ'); }
    };});
    return;
  }
  // ── وضع البناء: لوح فارغ أوسع من المطلوب، يبني الطالب مصفوفته بالنقر ──
  const gRows=Math.max(rows, Math.min(8, Math.round(+((q.grid||{}).rows) || rows+2)));
  const gCols=Math.max(cols, Math.min(8, Math.round(+((q.grid||{}).cols) || cols+2)));
  const W=gCols*CELL, H=gRows*CELL;
  let cells='';
  for(let r=0;r<gRows;r++) for(let c=0;c<gCols;c++){
    const x=(gCols-1-c)*CELL, y=r*CELL;                   // العمود ٠ أقصى اليمين (اتجاه القراءة)
    cells+=`<g class="ar-cell" data-r="${r}" data-c="${c}">`+
      `<rect class="ar-hit" x="${x}" y="${y}" width="${CELL}" height="${CELL}"></rect>`+
      `<rect class="ar-face" x="${x+5}" y="${y+5}" width="${CELL-10}" height="${CELL-10}" rx="12"></rect>`+
      `<circle class="ar-dot" cx="${x+CELL/2}" cy="${y+CELL/2}" r="${R}"></circle></g>`;
  }
  body.innerHTML=`<div class="arrayq">`+
    `<div class="ar-count">اخترتَ <b>٠</b> مربّعاً</div>`+
    `<svg class="arsvg arsvg-build" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${cells}</svg>`+
    `<div class="ar-sentence"></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const on={}; let done=false;
  const countEl=body.querySelector('.ar-count b');
  body.querySelectorAll('.ar-cell').forEach(g=>{
    g.addEventListener('click',()=>{
      if(done) return;
      const k=g.dataset.r+','+g.dataset.c;
      if(on[k]){ delete on[k]; g.classList.remove('on'); } else { on[k]=1; g.classList.add('on'); }
      g.classList.remove('correct','wrong');
      countEl.textContent=arNum(Object.keys(on).length);
    });
  });
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const keys=Object.keys(on);
    if(!keys.length){ qFail(fb,'اضغط المربّعات لتبني المصفوفة أولاً'); return; }
    const rs=keys.map(k=>+k.split(',')[0]), cs=keys.map(k=>+k.split(',')[1]);
    const r0=Math.min(...rs), r1=Math.max(...rs), c0=Math.min(...cs), c1=Math.max(...cs);
    const gotR=r1-r0+1, gotC=c1-c0+1;
    const solid=(keys.length===gotR*gotC);                 // مستطيل مصمت بلا ثقوب
    if(!solid){ qFail(fb,'المصفوفة يجب أن تكون مستطيلاً كاملاً بلا فراغات بين مربّعاتها'); return; }
    if(gotR===rows && gotC===cols){
      done=true;
      body.querySelectorAll('.ar-cell.on').forEach(g=>g.classList.add('correct'));
      const s=body.querySelector('.ar-sentence');
      if(q.answerSentence){ s.textContent=q.answerSentence; s.classList.add('show'); }
      qWin(fb,'🎉 أحسنت! '+(q.answerSentence||'المصفوفة صحيحة'),3);
    } else if(gotR===cols && gotC===rows){
      qFail(fb,`الصفوف والأعمدة معكوسة — المطلوب ${arNum(rows)} صفوف في كل صفّ ${arNum(cols)}`);
    } else {
      qFail(fb,`بنيت ${arNum(gotR)} × ${arNum(gotC)} والمطلوب ${arNum(rows)} × ${arNum(cols)}`);
    }
  };
  body.querySelector('.btn-reset').onclick=()=>renderArray(q,body,fb);
}

/* ⑲ بناء المعادلة (equation-builder): tokens[] فيها "__" لكل خانة فارغة + bank[] + answers[]
   ═══ قاعدة تصميم دائمة — DESIGN_RULES.md §«أسئلة بناء المعادلة — اتجاه العرض» ═══
   المعادلة تُعرض RTL دائماً: tokens[] بترتيب القراءة (الحدّ الأول أولاً و«=» والناتج
   آخراً)، وحاوية العرض .eqrow مضبوطة direction:rtl (css/style.css) فيبدأ أول حدّ
   من أقصى اليمين وينتهي الناتج في أقصى اليسار — القاعدة مركزية في .eqrow فترثها
   كل أسئلة المعادلات، ومنطق التحقق يعمل على مصفوفة الرموز فلا يتأثر بالاتجاه.
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


/* ═══════════════ أنواعٌ رياضيّةٌ إضافيّةٌ (الدفعةُ الثانية) ═══════════════
   بُنيت بطلبٍ مستقلٍّ لتغطيةِ وحداتِ الرياضياتِ كلِّها لا وحدةَ الأعدادِ وحدَها، على المحرّكاتِ
   المشتركةِ نفسِها (wireBank، وأدواتُ الأعدادِ، ومحرّكُ الشبكةِ والتدريجِ) بلا صورٍ خارجيّة. */

/* ⓐ المقارنة (compare): pairs[] لكل صفٍّ عددان a وb وخانةٌ بينهما، والبطاقات < = >
   الرمزُ الصحيحُ **يُحسب** من العددين لا يُؤلَّف. الصفُّ يُعرض بترتيبٍ رياضيّ (يسار→يمين)
   داخل الصفحة RTL: a يساراً وb يميناً، فيصحّ معنى «يفتح فمه نحو الأكبر». بطاقاتُ الرموز
   لا تُستهلك (الرمزُ يصلح لعدّة صفوف)، والسحبُ واللمسُ والنقرُ كلُّها تعمل. */
function renderCompare(q, body, fb){
  const pairs=(q.pairs||[]).map(p=>({a:numOf(p.a), b:numOf(p.b), unit:p.unit||q.unit||''}));
  if(!pairs.length){ body.textContent='لا توجد أزواج في هذا السؤال'; return; }
  const SYMS=[{s:'<',w:'أصغرُ من'},{s:'=',w:'يساوي'},{s:'>',w:'أكبرُ من'}];
  // الرمز الصحيح **يُحسب** من العددين فلا يُؤلَّف يدوياً (لا خطأ تأليف ممكن)
  const symOf=p=>(p.a<p.b?'<':(p.a>p.b?'>':'='));
  const rows=pairs.map((p,i)=>
    '<div class="cmp-row">'+
    '<span class="cmp-num">'+arNum(p.a)+(p.unit?' '+p.unit:'')+'</span>'+
    '<span class="blank cmp-slot" data-i="'+i+'">؟</span>'+
    '<span class="cmp-num">'+arNum(p.b)+(p.unit?' '+p.unit:'')+'</span>'+
    '</div>').join('');
  body.innerHTML='<div class="cmp">'+rows+
    '<div class="bank cmpbank"><div class="bt">الرموز:</div><div class="chips">'+
    SYMS.map(x=>'<div class="chip cmp-chip" draggable="true" data-s="'+x.s+'"><b>'+x.s+'</b><i>'+x.w+'</i></div>').join('')+
    '</div></div></div>'+
    '<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
  let picked=null, dragged=null, done=false;
  // بطاقات الرموز **لا تُستهلك**: الرمز نفسه يصلح لعدّة صفوف (بخلاف بنك fill-blank)
  function put(sl, s){ if(!sl||!s) return;
    sl.textContent=s; sl.dataset.placed=s;
    sl.classList.add('filled'); sl.classList.remove('correct','wrong','over');
    if(picked){ picked.classList.remove('picked'); picked=null; } }
  function clearSlot(sl){ if(!sl.dataset.placed) return;
    sl.textContent='؟'; delete sl.dataset.placed; sl.classList.remove('filled','correct','wrong'); }
  body.querySelectorAll('.cmp-chip').forEach(ch=>{
    ch.addEventListener('click',()=>{ if(done) return;
      if(picked&&picked!==ch) picked.classList.remove('picked');
      picked=(picked===ch)?null:ch; ch.classList.toggle('picked', picked===ch); });
    ch.addEventListener('dragstart',()=>{dragged=ch;ch.classList.add('dragging')});
    ch.addEventListener('dragend',()=>ch.classList.remove('dragging'));
    ch.addEventListener('touchstart',()=>{dragged=ch;ch.classList.add('dragging')},{passive:true});
    ch.addEventListener('touchend',e=>{ const t=e.changedTouches[0];
      const el=document.elementFromPoint(t.clientX,t.clientY);
      const sl=el&&el.closest&&el.closest('.cmp-slot'); if(sl&&!done) put(sl,ch.dataset.s);
      ch.classList.remove('dragging'); });
  });
  body.querySelectorAll('.cmp-slot').forEach(sl=>{
    sl.addEventListener('dragover',e=>{e.preventDefault();sl.classList.add('over')});
    sl.addEventListener('dragleave',()=>sl.classList.remove('over'));
    sl.addEventListener('drop',e=>{e.preventDefault();sl.classList.remove('over'); if(!done&&dragged) put(sl,dragged.dataset.s)});
    sl.addEventListener('click',()=>{ if(done) return; if(picked) put(sl,picked.dataset.s); else clearSlot(sl); });
  });
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const slots=[].slice.call(body.querySelectorAll('.cmp-slot'));
    if(slots.some(sl=>!sl.dataset.placed)){ qFail(fb,'ضع رمزاً في كل خانة أولاً'); return; }
    let ok=0;
    slots.forEach(sl=>{ const p=pairs[+sl.dataset.i], good=(sl.dataset.placed===symOf(p));
      sl.classList.toggle('correct',good); sl.classList.toggle('wrong',!good); if(good) ok++; });
    if(ok===slots.length){ done=true;
      qWin(fb, slots.length>1?'🎉 أحسنت! كل المقارنات صحيحة':'🎉 أحسنت! المقارنة صحيحة', 3);
    } else qFail(fb,'الصحيح '+arNum(ok)+' من '+arNum(slots.length)+' — تذكّر: الرمز يفتح فمه نحو العدد الأكبر');
  };
  body.querySelector('.btn-reset').onclick=()=>renderCompare(q,body,fb);
}

/* ⓑ إكمال النمط (pattern): items[] فيها "__" لكل خانة ناقصة + answers[] بترتيب الخانات
   + bank[] (أو answers+distractors). الشريطُ يُقرأ يميناً→يساراً كنصّ الصفحة والسهم «←»،
   و`ltr:true` يقلبه إلى يسار→يمين مع السهم «→». منطقُ البنك المشترك (wireBank)، والمقارنةُ
   قيميّةٌ للأعداد ونصّيّةٌ لغيرها (فيصحّ النمطُ بالأشكال والرموز). `rule` تُكشف عند الصواب. */
function renderPattern(q, body, fb){
  const items=(q.items||[]).map(String);
  const answers=(q.answers||[]).map(String);
  if(!items.length){ body.textContent='لا عناصر في هذا النمط'; return; }
  const ltr=!!q.ltr;                       // الافتراض: النمط يُقرأ يميناً→يساراً كنصّ الصفحة
  const arrow=ltr?'→':'←';
  let si=0;
  const cells=items.map(it=>{
    if(it==='__'){ const i=si++;
      return '<span class="blank pt-slot" data-i="'+i+'" data-answer="'+(answers[i]!=null?answers[i]:'')+'">؟</span>'; }
    return '<span class="pt-cell">'+it+'</span>';
  });
  const nSlots=si;
  const strip=cells.join('<span class="pt-arrow">'+arrow+'</span>');
  body.innerHTML='<div class="patt'+(ltr?' patt-ltr':'')+'">'+
    '<div class="pt-strip">'+strip+'</div>'+
    '<div class="bank ptbank"><div class="bt">البطاقات:</div><div class="chips ptchips">'+
    shuffle((q.bank||answers.concat(q.distractors||[])).map(String)).map(w=>
      '<div class="chip ptchip" draggable="true" data-w="'+w+'">'+w+'</div>').join('')+
    '</div></div>'+
    '<div class="pt-rule">'+(q.rule?('القاعدة: '+q.rule):'')+'</div></div>'+
    '<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
  // بنك البطاقات: المنطق المشترك نفسه (wireBank) — بطاقة واحدة لكل خانة، والمكرّر يصحّ بالهوية
  wireBank(body, { chip:'.ptchip', slot:'.pt-slot', empty:'؟' });
  let done=false;
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const slots=[].slice.call(body.querySelectorAll('.pt-slot'));
    if(slots.some(sl=>!sl.dataset.placed)){ qFail(fb,'أكمل كل خانات النمط أولاً'); return; }
    let ok=0;
    slots.forEach(sl=>{
      const got=sl.dataset.placed||'', want=sl.dataset.answer||'';
      // الأعداد تُقارَن قيمةً (هندية/لاتينية سواء)، وغيرها نصّاً
      const good=(numOf(want)!=null&&numOf(got)!=null)?(numOf(got)===numOf(want)):(got===want);
      sl.classList.toggle('correct',good); sl.classList.toggle('wrong',!good); if(good) ok++;
    });
    if(ok===nSlots){ done=true;
      const r=body.querySelector('.pt-rule'); if(q.rule) r.classList.add('show');
      qWin(fb,'🎉 أحسنت! أكملت النمط'+(q.rule?' — '+q.rule:''),3);
    } else qFail(fb,'راجع النمط — الصحيح '+arNum(ok)+' من '+arNum(nSlots)+'؛ انظر مقدار التغيّر بين كل عنصرين');
  };
  body.querySelector('.btn-reset').onclick=()=>renderPattern(q,body,fb);
}

/* ⓒ العد بالنقر (count-tap): وضعان — each عناصرٌ مفردةٌ يُنقر منها `target` (والافتراضُ عدُّها
   كلِّها)، وstep مجموعاتٌ في كلٍّ منها `step` عنصراً فيُعَدُّ بالقفز (٢، ٥، ١٠). العددُ يظهر
   على العنصر المنقور بترتيب النقر، والمجموعُ التراكميُّ في وضع القفز — فالعدُّ مرئيٌّ لا خفيّ.
   إعادةُ النقر تُلغي العدَّ، والتحقّقُ يقارن المجموعَ بـ`target`. */
function renderCountTap(q, body, fb){
  const mode=q.mode||'each';
  const glyph=q.glyph||'🔵';
  const step=Math.max(1,Math.round(numOf(q.step)||1));
  const count=Math.max(1,Math.round(numOf(q.count)||10));
  const groups=Math.max(1,Math.round(numOf(q.groups)||5));
  const target=(q.target!=null)?Math.round(numOf(q.target)):(mode==='step'?step*groups:count);
  let tiles='';
  if(mode==='step'){
    for(let g=0;g<groups;g++){
      let inner=''; for(let k=0;k<step;k++) inner+='<span class="ct-glyph">'+glyph+'</span>';
      tiles+='<div class="ct-group" data-g="'+g+'"><div class="ct-glyphs">'+inner+'</div><span class="ct-badge"></span></div>';
    }
  } else {
    for(let i=0;i<count;i++)
      tiles+='<div class="ct-tile" data-i="'+i+'"><span class="ct-glyph">'+glyph+'</span><span class="ct-badge"></span></div>';
  }
  body.innerHTML='<div class="cnt"><div class="ct-count">عدَدتَ: <b>٠</b>'+
    (mode==='step'?' <i>(بالقفز '+arNum(step)+')</i>':'')+'</div>'+
    '<div class="ct-area'+(mode==='step'?' ct-area-step':'')+'">'+tiles+'</div></div>'+
    '<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
  const sel=[]; let done=false;
  const unit=(mode==='step')?step:1;
  const countEl=body.querySelector('.ct-count b');
  const nodes=[].slice.call(body.querySelectorAll(mode==='step'?'.ct-group':'.ct-tile'));
  /* شارةُ العنصرِ المعدود: علامةُ ✓ في وضعِ «each» — تمييزٌ بصريٌّ لِما عُدَّ فلا يُكرَّرُ
     ولا يُفوَّتُ، بلا كشفِ رقمِ ترتيبِه (كانت تعرضُ الرقمَ نفسَه، فيتحوّلُ العدُّ إلى مجرّدِ
     قراءةِ الأرقامِ المكتوبةِ — بلاغُ المالك). أمّا وضعُ «step» (العدُّ بالقفز) فيبقى على
     الرقمِ التراكميِّ ٥، ١٠، ١٥ … لأنَّ الرقمَ نفسَه هو المهارةُ المقصودةُ هناك لا زخرفةً. */
  function renumber(){
    nodes.forEach(n=>{ n.classList.remove('on'); n.querySelector('.ct-badge').textContent=''; });
    sel.forEach((n,i)=>{ n.classList.add('on'); n.querySelector('.ct-badge').textContent=(mode==='step')?arNum((i+1)*unit):'✓'; });
    countEl.textContent=arNum(sel.length*unit);
  }
  nodes.forEach(n=>{ n.addEventListener('click',()=>{ if(done) return;
    const at=sel.indexOf(n); if(at>=0) sel.splice(at,1); else sel.push(n);
    n.classList.remove('correct','wrong'); renumber(); }); });
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const got=sel.length*unit;
    if(got===target){ done=true; sel.forEach(n=>n.classList.add('correct'));
      qWin(fb,'🎉 أحسنت! عددتَ '+arNum(target)+(mode==='step'?' بالقفز '+arNum(step):''),3);
    } else qFail(fb, got<target ? 'عددتَ '+arNum(got)+' — المطلوب '+arNum(target)+'، تابع العدّ'
                                : 'عددتَ '+arNum(got)+' وهو أكثر من المطلوب '+arNum(target)+' — انقر العنصر مرّة أخرى لإلغائه');
  };
  body.querySelector('.btn-reset').onclick=()=>renderCountTap(q,body,fb);
}

/* ⓓ القيمة المنزلية بالمكعبات (place-value): وضعان — build يبني الطالبُ فيه `target` بإضافةِ
   أعمدةِ العشراتِ ومكعّباتِ الآحادِ (نقرُ القطعةِ يحذفها)، وread تُعرض فيه `tens` و`ones`
   فيختارُ العددَ من `options`. العشرةُ عمودٌ بطولِ عشرِ مكعّباتٍ فالعلاقةُ مرئيّةٌ بالقياس.
   لوحُ المنازلِ بترتيبِ الكتابةِ (العشراتُ يساراً والآحادُ يميناً). والتحقّقُ يشترطُ الصورةَ
   القانونيّةَ (آحادٌ < ١٠) إلّا إذا نُصَّ `allowExchange:true` لدروسِ التبديل. */
function renderPlaceValue(q, body, fb){
  const mode=q.mode||'build';
  /* المكعّبُ وحدةُ الرسم (٢٢ في فضاء الـviewBox) والعشرةُ عمودٌ من عشرةِ مكعّباتٍ بالطول نفسِه،
     فالعلاقةُ «عشرةٌ = عشرُ آحادٍ» مرئيّةٌ بالقياس لا بالكلام. كلُّ قطعةٍ في غلافٍ لمسُه ≥60px. */
  function rodMarkup(){ let ln='';
    for(let i=1;i<10;i++) ln+='<line class="pv-line" x1="0" y1="'+(i*22)+'" x2="22" y2="'+(i*22)+'"></line>';
    return '<svg class="pv-svg pv-rod" viewBox="-2 -2 26 224"><rect class="pv-face" x="0" y="0" width="22" height="220" rx="3"></rect>'+ln+'</svg>'; }
  function cubeMarkup(){
    return '<svg class="pv-svg pv-cube" viewBox="-2 -2 26 26"><rect class="pv-face" x="0" y="0" width="22" height="22" rx="3"></rect></svg>'; }
  function word(n,one,two,many){ return n===1?one:(n===2?two:arNum(n)+' '+many); }
  function readout(t,o){ return word(t,'عشرةٌ واحدة','عشرتان','عشرات')+' و'+word(o,'واحدٌ','اثنان','آحاد')+' = '+arNum(t*10+o); }
  const addBtn=(p,lbl)=> (mode==='build')?'<button class="btn pv-add" data-p="'+p+'">＋ '+lbl+'</button>':'';
  body.innerHTML='<div class="pv"><div class="pv-panes">'+
    '<div class="pv-pane"><div class="pv-head">عشرات</div><div class="pv-items" data-p="tens"></div>'+addBtn('tens','عشرة')+'</div>'+
    '<div class="pv-pane"><div class="pv-head">آحاد</div><div class="pv-items" data-p="ones"></div>'+addBtn('ones','واحد')+'</div>'+
    '</div><div class="pv-read"></div>'+
    (mode==='read'?'<div class="opts">'+shuffle((q.options||[]).slice()).map(o=>'<button class="opt" data-o="'+o+'">'+o+'</button>').join('')+'</div>':'')+
    '</div>'+
    (mode==='build'?'<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>':'');
  const tensBox=body.querySelector('.pv-items[data-p="tens"]'), onesBox=body.querySelector('.pv-items[data-p="ones"]');
  const readEl=body.querySelector('.pv-read');
  let done=false;
  if(mode==='read'){
    const t=Math.max(0,Math.round(numOf(q.tens)||0)), o=Math.max(0,Math.round(numOf(q.ones)||0));
    tensBox.innerHTML=Array(t).fill('<span class="pv-item">'+rodMarkup()+'</span>').join('');
    onesBox.innerHTML=Array(o).fill('<span class="pv-item pv-item-cube">'+cubeMarkup()+'</span>').join('');
    const val=t*10+o;
    body.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
      if(done) return;
      if(numOf(btn.dataset.o)===val){ done=true; btn.classList.add('correct');
        body.querySelectorAll('.opt').forEach(b=>b.disabled=true);
        readEl.textContent=readout(t,o); readEl.classList.add('show');
        qWin(fb,'🎉 أحسنت! '+readout(t,o),3);
      } else { btn.classList.add('wrong'); btn.disabled=true;
        qFail(fb,'عُدَّ الأعمدةَ عشراتٍ ثم المكعّباتَ المفردةَ آحاداً'); }
    };});
    return;
  }
  // ── وضعُ البناء: يبني الطالبُ العددَ بإضافةِ عشراتٍ وآحادٍ، ونقرُ القطعةِ يحذفها ──
  const target=Math.round(numOf(q.target)||0);
  /* هامشُ عشراتٍ فوقَ عشراتِ الهدفِ بالضبطِ — بطلبِ المالك (٢٠٢٦-٠٨-٣٠): الحدُّ الدقيقُ
     (عشراتُ الهدفِ حرفياً) كان يُتيحُ استنتاجَ الجوابِ من رفضِ الزيادةِ نفسِه (راجع
     الإصلاحَ السابقَ لرسالةِ الرفض). هامشُ ‎+٢‎ يسمحُ للطالبِ بتجربةِ عشرتَينِ زائدتَينِ
     قبلَ الرفضِ، فيصيرُ الرفضُ حَدَثاً طبيعياً لا كاشفاً للعدد. q.maxTens الصريحُ يتقدّمُ
     كما كان (بلا هامشٍ — تصريحٌ لا تخمين). */
  const PV_TENS_MARGIN=2;
  const maxTens=Math.max(1,Math.round(numOf(q.maxTens)||(Math.floor(target/10)+PV_TENS_MARGIN)));
  const maxOnes=Math.max(1,Math.round(numOf(q.maxOnes)||10));
  /* الحسابُ بأسوأِ الحالات (shoogp-ui §١.٤ب): تُحجَزُ ساحتا اللوحِ منذُ البناءِ **عرضاً
     وارتفاعاً** بأقصى حالةٍ يسمحُ بها الحدّانِ — فلا يكبرُ السؤالُ أثناءَ إجابةِ الطالبِ
     ولا يلتفُّ صفُّ الساحتَينِ فوقَ بعضِه، ويُختارُ الإطارُ على الحالةِ النهائيةِ لا على
     اللوحِ الفارغِ (النموُّ بعدَ الإجابةِ كان يُخرِجُ المحتوى من الإطارِ — قِيسَ +132px
     في g2m-12-2 س٤). ومقاساتُ القطعِ في css/style.css (العمودُ 180 والمكعّبُ 21 بنفسِ
     نسبةِ الرسمِ فتبقى «العشرةُ = عشرُ آحادٍ» بالقياس).
     **سعةُ الصفِّ لم تعُدْ واحدةً مشتركة** — هامشُ العشراتِ أعلاه يُعرِّضُ ساحةَ
     العشراتِ، فقُلِّصَت سعةُ صفِّ الآحادِ من ٤ إلى ٣ قطعٍ (٦٢px أقلَّ عرضاً) تعويضاً،
     بطلبِ المالك صراحةً — لا يمسُّ الحدَّ الأدنى للمس (تبقى القطعةُ ٦٢×٦٢ كما هي، والتقليصُ
     في عددِ الأعمدةِ لا في حجمِ القطعةِ). */
  const PV_ROW_TENS=4, PV_ROW_ONES=3, PV_ROD_H=180, PV_CUBE_H=62, PV_GAP=2;
  const pvCapT=Math.min(maxTens,PV_ROW_TENS), pvCapO=Math.min(maxOnes,PV_ROW_ONES);
  const pvRowsT=Math.ceil(maxTens/pvCapT), pvRowsO=Math.ceil(maxOnes/pvCapO);
  tensBox.style.width=(pvCapT*62+(pvCapT-1)*PV_GAP)+'px';
  onesBox.style.width=(pvCapO*62+(pvCapO-1)*PV_GAP)+'px';
  tensBox.style.minHeight=(pvRowsT*PV_ROD_H+(pvRowsT-1)*PV_GAP)+'px';
  onesBox.style.minHeight=(pvRowsO*PV_CUBE_H+(pvRowsO-1)*PV_GAP)+'px';
  const exchange=!!q.allowExchange;   // الافتراض: الصورةُ القانونيّة (الآحادُ أقلُّ من عشرة)
  let tens=0, ones=0;
  function paint(){
    tensBox.innerHTML=Array(tens).fill('<span class="pv-item">'+rodMarkup()+'</span>').join('');
    onesBox.innerHTML=Array(ones).fill('<span class="pv-item pv-item-cube">'+cubeMarkup()+'</span>').join('');
    readEl.textContent=readout(tens,ones); readEl.classList.add('show');
    tensBox.querySelectorAll('.pv-item').forEach(el=>el.onclick=()=>{ if(done) return; tens--; paint(); });
    onesBox.querySelectorAll('.pv-item').forEach(el=>el.onclick=()=>{ if(done) return; ones--; paint(); });
  }
  body.querySelectorAll('.pv-add').forEach(b=>{ b.onclick=()=>{
    if(done) return;
    /* ⚠️ الرسالةُ لا تذكرُ رقمَ الحدِّ: `maxTens` الافتراضيُّ = عشراتُ الهدفِ بالضبطِ
       (أعلاه)، فذكرُ رقمِه هنا كان يُسرّبُ رقمَ العشراتِ الصحيحَ للطالبِ لحظةَ محاولتِه
       تجاوزَه — قبلَ الضغطِ على «تحقّق» (بلاغُ المالك على سؤالِ بناءِ ١٣، ٢٠٢٦-٠٨-٣٠). */
    if(b.dataset.p==='tens'){ if(tens>=maxTens){ qFail(fb,'لا يمكنُ إضافةُ المزيدِ من العشراتِ هنا'); return; } tens++; }
    else { if(ones>=maxOnes){ qFail(fb,'لا يمكنُ إضافةُ المزيدِ من الآحادِ هنا'); return; } ones++; }
    paint();
  };});
  paint();
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const val=tens*10+ones;
    if(val!==target){
      qFail(fb, val<target ? 'بنيتَ '+arNum(val)+' والمطلوب '+arNum(target)+' — أضِف المزيد'
                           : 'بنيتَ '+arNum(val)+' والمطلوب '+arNum(target)+' — انقر قطعةً لحذفها');
      return;
    }
    if(!exchange && ones>9){
      qFail(fb,'القيمةُ صحيحةٌ، لكن بدّل عشرَ آحادٍ بعشرةٍ واحدةٍ لتكتب العددَ بمنازله');
      return;
    }
    done=true;
    body.querySelectorAll('.pv-item').forEach(el=>el.classList.add('correct'));
    qWin(fb,'🎉 أحسنت! '+readout(tens,ones),3);
  };
  body.querySelector('.btn-reset').onclick=()=>renderPlaceValue(q,body,fb);
}

/* ⓔ الساعة التفاعلية (clock): ثلاثةُ أوضاعٍ —
   • read: الميناءُ يُظهرُ `target` فيقرؤه الطالبُ ويختارُ من `options` (تُقارَنُ الأوقاتُ تحليلاً لا نصّاً).
   • set: يضبطُ الطالبُ العقربَينِ إلى `target` (وموضعُ البدايةِ `from`)، والدقائقُ تلتقطُ إلى `snap`.
   • elapsed: يبدأُ من `start` ويُضيفُ `minutes` فيُحسبُ الهدفُ حسابياً (وقتُ الطهيِ ونحوُه).
   عقربُ الساعاتِ يتقدّمُ بكسرِ الساعةِ تلقائياً (M×٠٫٥ درجة) فلا يكذبُ الميناءُ.
   اللمس: الحلقةُ الخارجيّةُ (نصفُ القطر ≥١٠٠) للدقائقِ والوسطُ للساعاتِ — هدفانِ واسعانِ. */
function renderClock(q, body, fb){
  const mode=q.mode||'read';
  const snap=Math.max(1,Math.round(numOf(q.snap)||5));   // دقّةُ ضبطِ الدقائق (٥ افتراضاً)
  function parseTime(s){ const p=String(toLatinNum(s)).split(':');
    let h=parseInt(p[0],10)||0, m=parseInt(p[1],10)||0; return {h:((h%12)+12)%12, m:((m%60)+60)%60}; }
  function fmt(h,m){ const hh=(h%12===0)?12:h%12; return arNum(hh)+':'+arNum(m<10?('0'+m):m); }
  const start=q.start?parseTime(q.start):null;
  const addMin=Math.round(numOf(q.minutes)||0);
  let target;
  if(mode==='elapsed'&&start){ const t=start.h*60+start.m+addMin; target={h:Math.floor(t/60)%12, m:t%60}; }
  else target=parseTime(q.target||'12:00');
  // ── رسمُ الميناء: ٦٠ علامةَ دقيقةٍ و١٢ رقمَ ساعةٍ بالأرقامِ الهندية ──
  const CX=200, CY=200, R=170;
  const pol=(r,deg)=>({x:CX+r*Math.sin(deg*Math.PI/180), y:CY-r*Math.cos(deg*Math.PI/180)});
  let ticks='', nums='';
  for(let i=0;i<60;i++){
    const big=(i%5===0), a=i*6, p1=pol(R-(big?22:11),a), p2=pol(R-2,a);
    ticks+='<line class="ck-tick'+(big?' ck-tick-h':'')+'" x1="'+p1.x.toFixed(1)+'" y1="'+p1.y.toFixed(1)+'" x2="'+p2.x.toFixed(1)+'" y2="'+p2.y.toFixed(1)+'"></line>';
  }
  for(let n=1;n<=12;n++){ const p=pol(R-52,n*30);
    nums+='<text class="ck-num" x="'+p.x.toFixed(1)+'" y="'+(p.y+12).toFixed(1)+'">'+arNum(n)+'</text>'; }
  const readout=(mode==='set'||mode==='elapsed')?'<div class="ck-read"><span class="ck-time"></span></div>':'';
  const hint=(mode==='set'||mode==='elapsed')?'<div class="ck-hint">اسحبْ في الحلقةِ الخارجيّةِ لعقربِ الدقائق، وفي الوسطِ لعقربِ الساعات</div>':'';
  const head=(mode==='elapsed'&&start)?'<div class="ck-task">البدايةُ <b>'+fmt(start.h,start.m)+'</b> — أضِفْ <b>'+arNum(addMin)+'</b> دقيقة</div>':'';
  // شبكةُ عمودين لا عمودٌ واحد (بلاغُ المالك على g1m-9-4#٢): القرصُ ٣٦٠px فوقَ عمودٍ
  // من ٤ أزرارٍ يحتاجُ ٧٣٠px ارتفاعاً فيدفعُ أزرارَ التالي/السابق تحتَ الشاشةِ على
  // نوافذَ أقصرَ — والشبكةُ تُنصِّفُ ارتفاعَ القائمةِ دونَ تصغيرِ القرص.
  const opts=(mode==='read')?'<div class="opts ck-opts">'+shuffle((q.options||[]).slice()).map(o=>'<button class="opt" data-o="'+o+'">'+o+'</button>').join('')+'</div>':'';
  const acts=(mode==='read')?'':'<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
  body.innerHTML='<div class="clockq">'+head+
    '<svg class="cksvg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">'+
    '<circle class="ck-face" cx="200" cy="200" r="184"></circle>'+ticks+nums+
    '<g class="ck-hand ck-hour"><line x1="200" y1="200" x2="200" y2="110"></line></g>'+
    '<g class="ck-hand ck-min"><line x1="200" y1="200" x2="200" y2="62"></line></g>'+
    '<circle class="ck-pin" cx="200" cy="200" r="9"></circle></svg>'+
    readout+hint+opts+'</div>'+acts;
  const svg=body.querySelector('.cksvg');
  const hourG=body.querySelector('.ck-hour'), minG=body.querySelector('.ck-min');
  const timeEl=body.querySelector('.ck-time');
  let H, M, done=false;
  function paint(){
    minG.setAttribute('transform','rotate('+(M*6)+' 200 200)');
    hourG.setAttribute('transform','rotate('+((H%12)*30+M*0.5)+' 200 200)');
    if(timeEl) timeEl.textContent=fmt(H,M);
  }
  if(mode==='read'){ H=target.h; M=target.m; paint(); }
  else if(mode==='elapsed'&&start){ H=start.h; M=start.m; paint(); }
  else { H=parseTime(q.from||'12:00').h; M=parseTime(q.from||'12:00').m; paint(); }
  if(mode==='read'){
    body.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
      if(done) return;
      const t=parseTime(btn.dataset.o);
      if(t.h===target.h&&t.m===target.m){ done=true; btn.classList.add('correct');
        body.querySelectorAll('.opt').forEach(b=>b.disabled=true);
        qWin(fb,'🎉 أحسنت! الساعةُ تشيرُ إلى '+fmt(target.h,target.m),3);
      } else { btn.classList.add('wrong'); btn.disabled=true;
        qFail(fb,'العقربُ القصيرُ للساعاتِ والطويلُ للدقائق — اقرأْهما معاً'); }
    };});
    return;
  }
  // ── الضبطُ باللمس: الحلقةُ الخارجيّةُ للدقائقِ والوسطُ للساعات (هدفانِ واسعانِ لا مقبضانِ دقيقان) ──
  function at(p){
    if(done) return;
    const dx=p.x-CX, dy=p.y-CY, r=Math.hypot(dx,dy);
    let a=Math.atan2(dx,-dy)*180/Math.PI; if(a<0) a+=360;
    if(r>=100){ const steps=Math.round(a/6/snap)*snap; M=((steps%60)+60)%60; }
    else { H=(Math.round(a/30))%12; }
    paint();
  }
  svgPointer(svg, at, at);
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    if(H%12===target.h&&M===target.m){ done=true; svg.classList.add('correct');
      qWin(fb,'🎉 أحسنت! '+(mode==='elapsed'?('بعدَ '+arNum(addMin)+' دقيقةً تصيرُ الساعةُ '):'الساعةُ ')+fmt(target.h,target.m),3);
    } else {
      const mine=H%12*60+M, want=target.h*60+target.m;
      qFail(fb, (M!==target.m&&H%12===target.h) ? 'الساعاتُ صحيحةٌ وعقربُ الدقائقِ ليس في موضعه'
        : (mine<want?'ضبطُك قبلَ الوقتِ المطلوب':'ضبطُك بعدَ الوقتِ المطلوب'));
    }
  };
  body.querySelector('.btn-reset').onclick=()=>renderClock(q,body,fb);
}

/* ⓕ قراءة أداة القياس (measure-tool): أربعةُ أوضاعٍ على أداتَينِ —
   • ruler-read: جسمٌ ممتدٌّ من الصفرِ بطولِ `value` فيقرأُ الطالبُ طولَه ويختارُ من `options`.
   • ruler-set: يمدُّ الطالبُ الجسمَ حتى `target` (رسمُ طولٍ مطلوبٍ لا قراءتُه).
   • scale-read: مؤشّرُ الميزانِ عند `value` فيقرأُ الكتلةَ ويختارُ من `options`.
   • scale-set: يُدير الطالبُ المؤشّرَ إلى `target`.
   التدريجُ من `min`/`max`/`step`/`labelEvery` بمحرّكِ التدريجِ المشترك (scaleTicks/scalePos/scaleVal)،
   و`unit` وحدةُ العرضِ (سم، غرام، مل…). القيمةُ تلتقطُ إلى `step` فلا تقعُ بين تدريجتَين. */
function renderMeasureTool(q, body, fb){
  const mode=q.mode||'ruler-read';
  const isRuler=(mode.indexOf('ruler')===0), isSet=(mode.indexOf('-set')>0);
  const unit=q.unit||(isRuler?'سم':'غرام');
  const min=isRuler?0:(numOf(q.min)||0), max=numOf(q.max)||(isRuler?20:1000);
  const step=Math.abs(numOf(q.step))||(isRuler?1:50);
  const labelEvery=Math.max(1,Math.round(numOf(q.labelEvery)||(isRuler?5:2)));
  const ticks=scaleTicks(min,max,step,labelEvery);
  const value=(q.value!=null)?numOf(q.value):null;                 // للقراءة
  const target=(q.target!=null)?numOf(q.target):value;             // للضبط
  let cur=isSet?min:(value!=null?value:min);
  let done=false;
  let svgHtml='', W, H;
  if(isRuler){
    W=900; H=230; const X0=60, X1=840, RY=120;
    const px=v=>scalePos(v,min,max,X0,X1);
    let marks='';
    ticks.forEach(t=>{ const x=px(t.v), h=t.major?46:26;
      marks+='<line class="ms-tick'+(t.major?' ms-major':'')+'" x1="'+x.toFixed(1)+'" y1="'+RY+'" x2="'+x.toFixed(1)+'" y2="'+(RY+h)+'"></line>';
      if(t.major) marks+='<text class="ms-num" x="'+x.toFixed(1)+'" y="'+(RY+78)+'">'+arNum(t.v)+'</text>';
    });
    svgHtml='<svg class="mssvg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+
      '<rect class="ms-ruler" x="'+(X0-26)+'" y="'+RY+'" width="'+(X1-X0+52)+'" height="96" rx="8"></rect>'+marks+
      '<g class="ms-obj"><rect class="ms-bar" x="'+X0+'" y="52" height="52" rx="16" width="0"></rect>'+
      '<line class="ms-edge" x1="0" y1="40" x2="0" y2="'+(RY+8)+'"></line></g></svg>';
  } else {
    /* هَيئةُ «ميزانٍ» لا «ساعة» (بلاغُ المالك ٢٠٢٦-٠٨-٣١، ثمّ طلبُه الصريحُ توليدَ
       الهيكلِ بجيميناي لا رسمَه يدوياً ٢٠٢٦-٠٨-٣١): هيكلُ الميزانِ (عُلّاقةٌ + حاويةٌ
       كهرمانيةٌ + كِفّةٌ مُعلَّقة، بنافذةٍ دائريةٍ فارغةٍ في وسطِها) صورةٌ واحدةٌ
       `images/هيكل-ميزان.png` مولَّدةٌ عبرَ مسارِ n8n/جيميناي — لا رسمَ يدويّاً.
       والتدريجُ والمؤشّرُ ونقطةُ الارتكازِ **يبقَون SVG ديناميكياً فوقَها** لأنّهم
       يختلفونَ بحسبِ min/max/value لكلِّ سؤال، فلا يصلحُ توليدُهم صورةً ثابتة.
       CX/CY/R أسفلَ مقيسةٌ يدوياً من مركزِ النافذةِ الدائريةِ في الصورةِ (بعدَ
       تحجيمِها لارتفاعِ ٣٠٠ وحدةٍ — الميزانيةُ الرأسيةُ الآمنةُ نفسُها المُثبَتةُ
       أدناه) — أيُّ استبدالٍ لهذه الصورةِ يوجبُ إعادةَ هذا القياس. */
    W=420; H=300; const CX=210, CY=152, R=74;
    const imgW=242.6, imgH=300, imgX=CX-imgW/2;
    const A0=-120, A1=120;                                        // قوسُ الميناءِ ٢٤٠ درجة
    const pol=(r,deg)=>({x:CX+r*Math.sin(deg*Math.PI/180), y:CY-r*Math.cos(deg*Math.PI/180)});
    const ang=v=>A0+(v-min)/(max-min)*(A1-A0);
    window.__msAng=ang;
    let marks='';
    ticks.forEach(t=>{ const a=ang(t.v), p1=pol(R-(t.major?20:12),a), p2=pol(R-2,a);
      marks+='<line class="ms-tick'+(t.major?' ms-major':'')+'" x1="'+p1.x.toFixed(1)+'" y1="'+p1.y.toFixed(1)+'" x2="'+p2.x.toFixed(1)+'" y2="'+p2.y.toFixed(1)+'"></line>';
      if(t.major){ const pn=pol(R-37,a);
        marks+='<text class="ms-num" x="'+pn.x.toFixed(1)+'" y="'+(pn.y+6).toFixed(1)+'">'+arNum(t.v)+'</text>'; }
    });
    svgHtml='<svg class="mssvg mssvg-dial" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+
      '<image href="images/هيكل-ميزان.png" x="'+imgX.toFixed(1)+'" y="0" width="'+imgW+'" height="'+imgH+'"></image>'+
      marks+'<g class="ms-needle"><line x1="'+CX+'" y1="'+CY+'" x2="'+CX+'" y2="'+(CY-R+20)+'"></line></g>'+
      '<circle class="ms-pin" cx="'+CX+'" cy="'+CY+'" r="7"></circle>'+
      '<text class="ms-unit" x="'+CX+'" y="'+(CY+20)+'">'+unit+'</text></svg>';
  }
  const readout=isSet?'<div class="ms-read"><b></b> '+unit+'</div>':'';
  const opts=(!isSet)?'<div class="opts">'+shuffle((q.options||[]).slice()).map(o=>'<button class="opt" data-o="'+o+'">'+o+'</button>').join('')+'</div>':'';
  const acts=isSet?'<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>':'';
  body.innerHTML='<div class="meas">'+svgHtml+readout+opts+'</div>'+acts;
  const svg=body.querySelector('.mssvg');
  const readEl=body.querySelector('.ms-read b');
  function paint(){
    if(isRuler){
      const X0=60, X1=840;
      const x=scalePos(cur,min,max,X0,X1);
      const bar=svg.querySelector('.ms-bar'), edge=svg.querySelector('.ms-edge');
      bar.setAttribute('width', Math.max(0,x-X0).toFixed(1));
      edge.setAttribute('x1', x.toFixed(1)); edge.setAttribute('x2', x.toFixed(1));
    } else {
      svg.querySelector('.ms-needle').setAttribute('transform','rotate('+window.__msAng(cur).toFixed(2)+' 210 152)');
    }
    if(readEl) readEl.textContent=arNum(cur);
  }
  cur=isSet?min:(value!=null?value:min); paint();
  if(!isSet){
    const ans=value;
    body.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
      if(done) return;
      if(numOf(btn.dataset.o)===ans){ done=true; btn.classList.add('correct');
        body.querySelectorAll('.opt').forEach(b=>b.disabled=true);
        qWin(fb,'🎉 أحسنت! القراءةُ '+arNum(ans)+' '+unit,3);
      } else { btn.classList.add('wrong'); btn.disabled=true;
        qFail(fb, isRuler?'ابدأْ من الصفرِ وعُدَّ التدريجاتِ حتى طرفِ الجسم'
                        :'اقرأْ أقربَ تدريجةٍ يشيرُ إليها المؤشّر'); }
    };});
    return;
  }
  // ── الضبطُ: النقرُ أو السحبُ على لوحِ الرسمِ كلِّه (لا مقبضٌ دقيق)، والقيمةُ تلتقطُ إلى step ──
  function at(p){
    if(done) return;
    let v;
    if(isRuler) v=scaleVal(p.x,min,max,60,840);
    else { const dx=p.x-210, dy=p.y-152; let a=Math.atan2(dx,-dy)*180/Math.PI;
      a=Math.max(-120,Math.min(120,a)); v=min+(a+120)/240*(max-min); }
    cur=Math.max(min,Math.min(max, min+Math.round((v-min)/step)*step));
    cur=+cur.toFixed(10); paint();
  }
  svgPointer(svg, at, at);
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    if(cur===target){ done=true; svg.classList.add('correct');
      qWin(fb,'🎉 أحسنت! '+arNum(target)+' '+unit,3);
    } else qFail(fb, cur<target?'قراءتُك أقلُّ من المطلوب — تقدّمْ قليلاً':'قراءتُك أكثرُ من المطلوب — تراجعْ قليلاً');
  };
  body.querySelector('.btn-reset').onclick=()=>renderMeasureTool(q,body,fb);
}

/* ⓖ النقود العُمانية (money): كلُّ القيمِ **بالبيسة** (١ ر.ع = ١٠٠٠ بيسة) فالحسابُ صحيحٌ بلا
   كسورٍ عشريّة، والعرضُ يُنسَّق تلقائياً (ر.ع/بيسة). ثلاثةُ أوضاعٍ —
   • pay: يُكوّن الطالبُ `target` من رفِّ النقودِ `rack` (نقرُ القطعةِ في الصندوقِ يُرجعها).
   • count: قطعٌ معروضةٌ في `items` فيختارُ مجموعَها من `options`.
   • change: `price` و`paid` والهدفُ = الفرقُ، يُكوّنه الطالبُ نقوداً.
   القطعُ مرسومةٌ SVG (قرصٌ للعملةِ ومستطيلٌ للورقة) لا صورَ عملةٍ حقيقيّة، و`maxPieces` تحدُّ العدد. */
function renderMoney(q, body, fb){
  const mode=q.mode||'pay';
  /* كلُّ القيمِ بالبيسة (١ ريال = ١٠٠٠ بيسة) فالحسابُ صحيحٌ بلا كسورٍ عشريّة */
  const RACK=(q.rack||[5,10,25,50,100,200,500,1000]).map(v=>Math.round(numOf(v)));
  function fmt(v){ if(v>=1000){ const r=Math.floor(v/1000), b=v%1000;
      return arNum(r)+' ر.ع'+(b?(' و'+arNum(b)+' بيسة'):''); } return arNum(v)+' بيسة'; }
  function pieceSvg(v){
    // ≤١٠٠ بيسة تُرسم عملةً معدنيّةً، وما فوقها ورقةً نقديّةً — تمييزٌ شكليٌّ لا لونيٌّ فحسب
    if(v<=100) return '<svg class="mn-svg mn-coin" viewBox="0 0 80 80"><circle class="mn-coinface" cx="40" cy="40" r="36"></circle>'+
      '<circle class="mn-coinring" cx="40" cy="40" r="29"></circle>'+
      '<text class="mn-val" x="40" y="46">'+arNum(v)+'</text>'+
      '<text class="mn-unit" x="40" y="63">بيسة</text></svg>';
    const lbl=(v>=1000)?(arNum(v/1000)+' ر.ع'):(arNum(v)+' بيسة');
    return '<svg class="mn-svg mn-note" viewBox="0 0 132 76"><rect class="mn-noteface" x="3" y="3" width="126" height="70" rx="9"></rect>'+
      '<rect class="mn-noteinner" x="13" y="13" width="106" height="50" rx="6"></rect>'+
      '<text class="mn-val mn-noteval" x="66" y="46">'+lbl+'</text></svg>';
  }
  const price=(q.price!=null)?Math.round(numOf(q.price)):null;
  const paid=(q.paid!=null)?Math.round(numOf(q.paid)):null;
  let target=(q.target!=null)?Math.round(numOf(q.target)):null;
  if(mode==='change'&&price!=null&&paid!=null) target=paid-price;
  const head = (mode==='change')
    ? '<div class="mn-task">الثمنُ <b>'+fmt(price)+'</b> ودفعَ <b>'+fmt(paid)+'</b> — كم الباقي؟</div>'
    : (mode==='pay'&&target!=null ? '<div class="mn-task">المطلوبُ: <b>'+fmt(target)+'</b></div>' : '');
  const editable=(mode!=='count');
  const items=(q.items||[]).map(v=>Math.round(numOf(v)));
  const rack = editable ? '<div class="bank mnrack"><div class="bt">النقود:</div><div class="chips mnchips">'+
      RACK.map(v=>'<button class="mn-piece mn-rackitem" data-v="'+v+'">'+pieceSvg(v)+'</button>').join('')+
      '</div></div>' : '';
  const opts = (mode==='count') ? '<div class="opts">'+shuffle((q.options||[]).slice()).map(o=>'<button class="opt" data-o="'+o+'">'+o+'</button>').join('')+'</div>' : '';
  const acts = (mode==='count') ? '' : '<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
  body.innerHTML='<div class="moneyq">'+head+
    '<div class="mn-tray'+(editable?'':' mn-tray-fixed')+'"></div>'+
    '<div class="mn-total">المجموع: <b>'+fmt(0)+'</b></div>'+rack+opts+'</div>'+acts;
  const tray=body.querySelector('.mn-tray'), totalEl=body.querySelector('.mn-total b');
  let picked=editable?[]:items.slice(), done=false;
  function total(){ return picked.reduce((a,b)=>a+b,0); }
  function paint(){
    tray.innerHTML=picked.length?picked.map((v,i)=>'<button class="mn-piece mn-trayitem" data-i="'+i+'">'+pieceSvg(v)+'</button>').join('')
      :'<span class="mn-empty">'+(editable?'اختر النقودَ من الأسفل':'')+'</span>';
    totalEl.textContent=(mode==='count'&&!done)?'؟':fmt(total()); // في وضعِ العدِّ لا يُكشفُ المجموعُ قبلَ الجواب
    if(editable) tray.querySelectorAll('.mn-trayitem').forEach(b=>b.onclick=()=>{
      if(done) return; picked.splice(+b.dataset.i,1); paint(); });
  }
  paint();
  if(mode==='count'){
    const val=total();
    body.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
      if(done) return;
      if(numOf(btn.dataset.o)===val){ done=true; btn.classList.add('correct');
        body.querySelectorAll('.opt').forEach(b=>b.disabled=true);
        paint(); qWin(fb,'🎉 أحسنت! المجموعُ '+fmt(val),3);
      } else { btn.classList.add('wrong'); btn.disabled=true;
        qFail(fb,'اجمعْ قيمةَ كلِّ قطعةٍ على حِدَة ثم اجمعِ النواتج'); }
    };});
    return;
  }
  body.querySelectorAll('.mn-rackitem').forEach(b=>{ b.onclick=()=>{
    if(done) return;
    if(q.maxPieces && picked.length>=Math.round(numOf(q.maxPieces))){ qFail(fb,'لا تزدْ على '+arNum(Math.round(numOf(q.maxPieces)))+' قطعة'); return; }
    picked.push(+b.dataset.v); paint(); };});
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const t=total();
    if(t===target){ done=true;
      tray.querySelectorAll('.mn-piece').forEach(el=>el.classList.add('correct'));
      qWin(fb,'🎉 أحسنت! '+(mode==='change'?'الباقي ':'')+fmt(target)+' بـ'+arNum(picked.length)+' قطعة',3);
    } else qFail(fb, t<target ? 'معك '+fmt(t)+' والمطلوبُ '+fmt(target)+' — أضِفْ المزيد'
                              : 'معك '+fmt(t)+' وهو أكثرُ من '+fmt(target)+' — انقرْ قطعةً في الصندوقِ لإرجاعها');
  };
  body.querySelector('.btn-reset').onclick=()=>renderMoney(q,body,fb);
}

/* ⓗ خط التماثل (symmetry): وضعان —
   • line: شكلٌ (من مكتبةِ الأشكالِ `shape` أو مسارٍ حرٍّ `path` في فضاء ٢٠٠×٢٠٠) وعليه خطوطٌ
     مرشَّحةٌ في `lines[]` لكلٍّ منها `ok`، فينقرُ الطالبُ ما يراه خطَّ تماثلٍ **والتحقّقُ على
     المجموعةِ** (لا تكفي إصابةٌ مع نقصٍ أو زيادة) — فيصحّ الشكلُ ذو الخطوطِ المتعدّدة.
   • mirror: شبكةُ rows×cols ومحورٌ في الوسطِ (`axis:'v'` أو `'h'`)، وخلايا `shape[[r,c]]` معطاةٌ
     على أحدِ الجانبَينِ فيُكمل الطالبُ صورتَها المرآتيّة؛ المقابلُ يُحسبُ حسابياً لا يُؤلَّف. */
function renderSymmetry(q, body, fb){
  const mode=q.mode||'line';
  if(mode==='mirror'){
    /* ── إكمالُ الصورةِ المرآتيّةِ على شبكةٍ: محورٌ عموديٌّ أو أفقيٌّ في الوسط ── */
    const rows=Math.max(2,Math.round(numOf(q.rows)||6)), cols=Math.max(2,Math.round(numOf(q.cols)||6));
    const axis=(q.axis==='h')?'h':'v';
    const given={}; (q.shape||[]).forEach(p=>{ given[Math.round(numOf(p[0]))+','+Math.round(numOf(p[1]))]=1; });
    const mirrorOf=(r,c)=> axis==='v' ? [r, cols-1-c] : [rows-1-r, c];
    const want={}; Object.keys(given).forEach(k=>{ const p=k.split(',').map(Number), m=mirrorOf(p[0],p[1]);
      const mk=m[0]+','+m[1]; if(!given[mk]) want[mk]=1; });
    const CELL=100, W=cols*CELL, H=rows*CELL;
    let cells='';
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      const x=(cols-1-c)*CELL, y=r*CELL, k=r+','+c;        // العمودُ ٠ أقصى اليمين (اتجاهُ القراءة)
      cells+='<g class="sy-cell'+(given[k]?' sy-given':'')+'" data-k="'+k+'">'+
        '<rect class="sy-hit" x="'+x+'" y="'+y+'" width="'+CELL+'" height="'+CELL+'"></rect>'+
        '<rect class="sy-face" x="'+(x+5)+'" y="'+(y+5)+'" width="'+(CELL-10)+'" height="'+(CELL-10)+'" rx="10"></rect></g>';
    }
    const ax = axis==='v'
      ? '<line class="sy-axis" x1="'+(W/2)+'" y1="-8" x2="'+(W/2)+'" y2="'+(H+8)+'"></line>'
      : '<line class="sy-axis" x1="-8" y1="'+(H/2)+'" x2="'+(W+8)+'" y2="'+(H/2)+'"></line>';
    body.innerHTML='<div class="symq"><svg class="sysvg" viewBox="-10 -10 '+(W+20)+' '+(H+20)+'" preserveAspectRatio="xMidYMid meet">'+
      cells+ax+'</svg></div>'+
      '<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
    const on={}; let done=false;
    body.querySelectorAll('.sy-cell').forEach(g=>{ g.addEventListener('click',()=>{
      if(done||g.classList.contains('sy-given')) return;     // الجانبُ المُعطى ثابتٌ لا يُعدَّل
      const k=g.dataset.k;
      if(on[k]){ delete on[k]; g.classList.remove('on'); } else { on[k]=1; g.classList.add('on'); }
      g.classList.remove('correct','wrong');
    });});
    body.querySelector('.btn-check').onclick=()=>{
      if(done) return;
      const mine=Object.keys(on), need=Object.keys(want);
      body.querySelectorAll('.sy-cell.on').forEach(g=>g.classList.toggle(want[g.dataset.k]?'correct':'wrong',true));
      if(mine.length===need.length && need.every(k=>on[k])){
        done=true; qWin(fb,'🎉 أحسنت! الصورةُ متماثلةٌ حولَ المحور',3);
      } else {
        const hit=mine.filter(k=>want[k]).length, extra=mine.length-hit;
        qFail(fb, extra ? 'الصحيحُ '+arNum(hit)+' من '+arNum(need.length)+' ولديك '+arNum(extra)+' مربّعاً زائداً'
                        : 'الصحيحُ '+arNum(hit)+' من '+arNum(need.length)+' — كلُّ مربّعٍ يقابلُه مربّعٌ على البعدِ نفسِه من المحور');
      }
    };
    body.querySelector('.btn-reset').onclick=()=>renderSymmetry(q,body,fb);
    return;
  }
  /* ── اختيارُ خطِّ التماثلِ الصحيحِ على شكلٍ: الخطوطُ المرشَّحةُ تُنقر، والتحقّقُ على المجموعة ── */
  const SHAPES={ square:'M 40 40 H 160 V 160 H 40 Z', rect:'M 20 55 H 180 V 145 H 20 Z',
    triangle:'M 100 30 L 170 165 H 30 Z', circle:'M 100 25 A 75 75 0 1 1 99 25 Z',
    rhombus:'M 100 25 L 175 100 L 100 175 L 25 100 Z', hexagon:'M 60 32 H 140 L 175 100 L 140 168 H 60 L 25 100 Z',
    heart:'M 100 168 C 20 110 30 40 68 40 C 88 40 100 58 100 58 C 100 58 112 40 132 40 C 170 40 180 110 100 168 Z' };
  const path=q.path||SHAPES[q.shape||'square']||SHAPES.square;
  const lines=(q.lines||[]).map(l=>({x1:numOf(l.x1),y1:numOf(l.y1),x2:numOf(l.x2),y2:numOf(l.y2),ok:!!l.ok}));
  let ls='';
  lines.forEach((l,i)=>{ ls+='<g class="sy-line" data-i="'+i+'">'+
    '<line class="sy-lhit" x1="'+l.x1+'" y1="'+l.y1+'" x2="'+l.x2+'" y2="'+l.y2+'"></line>'+
    '<line class="sy-lface" x1="'+l.x1+'" y1="'+l.y1+'" x2="'+l.x2+'" y2="'+l.y2+'"></line></g>'; });
  body.innerHTML='<div class="symq"><svg class="sysvg sysvg-shape" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">'+
    '<path class="sy-shape" d="'+path+'"></path>'+ls+'</svg></div>'+
    '<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>';
  const sel={}; let done=false;
  body.querySelectorAll('.sy-line').forEach(g=>{ g.addEventListener('click',()=>{
    if(done) return; const i=g.dataset.i;
    if(sel[i]){ delete sel[i]; g.classList.remove('on'); } else { sel[i]=1; g.classList.add('on'); }
    g.classList.remove('correct','wrong');
  });});
  body.querySelector('.btn-check').onclick=()=>{
    if(done) return;
    const need=lines.map((l,i)=>l.ok?String(i):null).filter(v=>v!==null);
    const mine=Object.keys(sel);
    if(!mine.length){ qFail(fb,'انقرِ الخطَّ الذي تراه خطَّ تماثل'); return; }
    body.querySelectorAll('.sy-line.on').forEach(g=>g.classList.toggle(lines[+g.dataset.i].ok?'correct':'wrong',true));
    if(mine.length===need.length && need.every(i=>sel[i])){
      done=true; qWin(fb, need.length>1?('🎉 أحسنت! وجدتَ خطوطَ التماثلِ كلَّها ('+arNum(need.length)+')'):'🎉 أحسنت! هذا خطُّ التماثل',3);
    } else {
      const hit=mine.filter(i=>lines[+i].ok).length;
      qFail(fb, 'الصحيحُ '+arNum(hit)+' من '+arNum(need.length)+' — خطُّ التماثلِ يجعلُ نصفَي الشكلِ منطبقَينِ تماماً');
    }
  };
  body.querySelector('.btn-reset').onclick=()=>renderSymmetry(q,body,fb);
}

/* ⓘ قراءة التمثيل البياني (chart-read): `series[{label,value}]` والتدريجُ من `step`/`max`
   (يُحسبُ تلقائياً إن غاب). المحورُ الرأسيُّ **يمينَ الرسمِ** والفئاتُ من اليمينِ إلى اليسارِ
   باتّجاهِ القراءةِ العربيّ (كمحرّكِ الشبكةِ المشترك). ثلاثةُ أوضاعٍ —
   • read: يقرأُ الطالبُ الرسمَ ويختارُ من `options` والصوابُ `answer`.
   • tap: ينقرُ العمودَ الذي يحقّقُ المطلوبَ و`answer` عنوانُه (الأكثرُ/الأقلُّ/عددٌ معيّن).
   • build: أعمدةٌ فارغةٌ يضبطُ الطالبُ ارتفاعَها لتطابقَ `series` (تُعرضُ الأعدادُ في شريطٍ فوقَ الرسم). */
function renderChartRead(q, body, fb){
  const mode=q.mode||'read';
  const series=(q.series||[]).map(s=>({label:String(s.label), value:Math.round(numOf(s.value)||0)}));
  if(!series.length){ body.textContent='لا بيانات في هذا التمثيل'; return; }
  const step=Math.max(1,Math.round(numOf(q.step)||1));
  const max=Math.max(step, Math.round(numOf(q.max)|| (Math.ceil(Math.max.apply(null,series.map(s=>s.value))/step)*step)));
  const W=900, H=470, AX=820, X0=110, Y0=60, Y1=380;
  const py=v=>scalePos(v,0,max,Y1,Y0);                 // القيمةُ إلى إحداثيٍّ رأسيّ (محرّكُ التدريجِ نفسُه)
  const vy=y=>scaleVal(y,0,max,Y1,Y0);
  const n=series.length, slot=(AX-X0)/n, bw=Math.min(96, slot*0.62);
  let grid='';
  for(let v=0; v<=max; v+=step){ const y=py(v);
    grid+='<line class="ch-grid" x1="'+X0+'" y1="'+y.toFixed(1)+'" x2="'+AX+'" y2="'+y.toFixed(1)+'"></line>'+
      '<text class="ch-num" x="'+(AX+22)+'" y="'+(y+10).toFixed(1)+'">'+arNum(v)+'</text>';
  }
  let bars='';
  series.forEach((s,i)=>{
    const cx=AX-(i+0.5)*slot;                           // الفئةُ الأولى أقصى اليمين (اتجاهُ القراءة)
    bars+='<g class="ch-bar" data-i="'+i+'" data-label="'+s.label+'">'+
      '<rect class="ch-hit" x="'+(cx-slot/2).toFixed(1)+'" y="'+Y0+'" width="'+slot.toFixed(1)+'" height="'+(Y1-Y0)+'"></rect>'+
      '<rect class="ch-face" x="'+(cx-bw/2).toFixed(1)+'" y="'+Y1+'" width="'+bw.toFixed(1)+'" height="0"></rect>'+
      '<text class="ch-val" x="'+cx.toFixed(1)+'" y="'+(Y1-10)+'"></text>'+
      '<text class="ch-label" x="'+cx.toFixed(1)+'" y="'+(Y1+44)+'">'+s.label+'</text></g>';
  });
  const legend=(mode==='build')?'<div class="ch-legend">'+series.map(s=>'<span>'+s.label+': <b>'+arNum(s.value)+'</b></span>').join('')+'</div>':'';
  /* خياراتُ القراءةِ صفٌّ أفقيٌّ ملتفٌّ (ch-opts) لا عمودُ .opts الافتراضيُّ: خياراتُ
     قراءةِ التمثيلِ قصيرةٌ دائماً (عددٌ أو اسمُ فئة)، والعمودُ الرأسيُّ فوقَ رسمٍ بيانيٍّ
     كاملٍ كان يملأُ أكبرَ إطارٍ (tall) قبلَ الإجابةِ أصلاً، فإذا جاءَ سطرُ التغذيةِ
     الراجعةِ فاضَ المحتوى إلى الحاويةِ المرنةِ وامتدَّ ذيلُه تحتَ رسمِ الإطارِ (علّةُ
     qflex الموثّقةُ في CLAUDE.md — بلاغُ المالك ٢٠٢٦-٠٨-٣١ على g2m-10-2#٣).
     والعلاجُ المنصوصُ تخفيفُ المحتوى لا تعديلُ الواجهة: الصفُّ يوفّرُ ارتفاعَ ثلاثةِ
     أزرارٍ (~١٩٠px) فيدخلُ السؤالُ إطاراً حقيقياً وسطرُ التغذيةِ محسوبٌ معه. */
  const opts=(mode==='read')?'<div class="opts ch-opts">'+shuffle((q.options||[]).slice()).map(o=>'<button class="opt'+(isShortAnswer(String(o))?' opt-num':'')+'" data-o="'+o+'">'+o+'</button>').join('')+'</div>':'';
  const acts=(mode==='build')?'<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>':'';
  body.innerHTML='<div class="chartq">'+legend+
    '<svg class="chsvg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+grid+
    '<line class="ch-axis" x1="'+AX+'" y1="'+Y0+'" x2="'+AX+'" y2="'+Y1+'"></line>'+
    '<line class="ch-axis" x1="'+X0+'" y1="'+Y1+'" x2="'+AX+'" y2="'+Y1+'"></line>'+bars+
    (q.yTitle?'<text class="ch-title" x="'+(AX-6)+'" y="'+(Y0-34)+'">'+q.yTitle+'</text>':'')+
    '</svg>'+opts+'</div>'+acts;
  const cur=series.map(s=>(mode==='build')?0:s.value);
  let done=false;
  function paintBar(i){
    const g=body.querySelector('.ch-bar[data-i="'+i+'"]');
    const face=g.querySelector('.ch-face'), val=g.querySelector('.ch-val');
    const y=py(cur[i]);
    face.setAttribute('y', y.toFixed(1)); face.setAttribute('height', Math.max(0,Y1-y).toFixed(1));
    val.setAttribute('y', (y-12).toFixed(1)); val.textContent=cur[i]?arNum(cur[i]):'';
  }
  series.forEach((s,i)=>paintBar(i));
  if(mode==='build'){
    const svg=body.querySelector('.chsvg');
    // النقرُ في عمودِ الفئةِ يضبطُ ارتفاعَها إلى أقربِ تدريجةٍ (لا مقبضَ سحبٍ دقيق)
    svgPointer(svg, p=>{
      if(done) return;
      if(p.x>AX||p.x<X0) return;
      const i=Math.floor((AX-p.x)/slot); if(i<0||i>=n) return;
      let v=Math.round(vy(p.y)/step)*step;
      cur[i]=Math.max(0,Math.min(max,v)); paintBar(i);
      const g=body.querySelector('.ch-bar[data-i="'+i+'"]'); g.classList.remove('correct','wrong');
    }, p=>{ if(done) return;
      if(p.x>AX||p.x<X0) return;
      const i=Math.floor((AX-p.x)/slot); if(i<0||i>=n) return;
      let v=Math.round(vy(p.y)/step)*step; cur[i]=Math.max(0,Math.min(max,v)); paintBar(i); });
    body.querySelector('.btn-check').onclick=()=>{
      if(done) return;
      let ok=0;
      series.forEach((s,i)=>{ const g=body.querySelector('.ch-bar[data-i="'+i+'"]');
        const good=(cur[i]===s.value); g.classList.toggle('correct',good); g.classList.toggle('wrong',!good); if(good) ok++; });
      if(ok===n){ done=true; qWin(fb,'🎉 أحسنت! التمثيلُ مطابقٌ للبيانات',3); }
      else qFail(fb,'الصحيحُ '+arNum(ok)+' من '+arNum(n)+' — اضبطْ ارتفاعَ كلِّ عمودٍ على عددِه');
    };
    body.querySelector('.btn-reset').onclick=()=>renderChartRead(q,body,fb);
    return;
  }
  if(mode==='tap'){
    body.querySelectorAll('.ch-bar').forEach(g=>{ g.addEventListener('click',()=>{
      if(done) return;
      if(g.dataset.label===String(q.answer)){ done=true; g.classList.add('correct');
        qWin(fb,'🎉 أحسنت! '+q.answer+' ('+arNum(cur[+g.dataset.i])+')',3);
      } else { g.classList.add('wrong'); qFail(fb,'قارنْ ارتفاعاتِ الأعمدةِ بالتدريجِ على المحور'); }
    });});
    return;
  }
  body.querySelectorAll('.opt').forEach(btn=>{ btn.onclick=()=>{
    if(done) return;
    const good = (q.answer!=null) ? (String(btn.dataset.o)===String(q.answer)) : false;
    if(good){ done=true; btn.classList.add('correct');
      body.querySelectorAll('.opt').forEach(b=>b.disabled=true);
      qWin(fb,'🎉 أحسنت! '+q.answer,3);
    } else { btn.classList.add('wrong'); btn.disabled=true;
      qFail(fb,'اقرأْ ارتفاعَ العمودِ على تدريجِ المحورِ ثم أجبْ'); }
  };});
}

/* ══════════ الأنواعُ الخاصةُ باللغةِ العربية («أحب لغتي») ══════════
   أربعةُ أنواعٍ بُنيت بطلبٍ مستقلٍّ (قاعدةُ بناءِ الأنواعِ الجديدة — CLAUDE.md)، وكلُّها
   على محرّكاتِ المنصّةِ القائمةِ لا بجانبِها: `tashkeel` على بنكِ البطاقاتِ وخاناتِ `.blank`،
   و`sentence` على محرّكِ الترتيبِ المشتركِ نفسِه الذي يخدمُ `arrange`، و`sun-moon` على
   صناديقِ `classify`، و`letter-picture` على خطوطِ `matching`. وتستعملُ **أصنافَ العناصرِ
   القائمةَ** (`.chip` و`.blank` و`.mitem`) فترثُ قشرةَ «الكبسولة» تلقائياً بلا CSS جديدٍ فيها.

   ومبدأٌ يجمعُ `tashkeel` و`sun-moon`: **البياناتُ تُكتَبُ مرّةً والباقي يُشتَقّ** — الحركاتُ
   تُقشَّرُ من الكلمةِ المشكولة، ونوعُ اللامِ يُحسَبُ من الحرفِ التالي — فلا يقعُ المؤلِّفُ
   في خطأِ تصنيفٍ لغويٍّ ولا يُكرّرُ الجوابَ في حقلٍ ثانٍ يتعارضُ مع الأول. */

/* ㉜ التشكيل (tashkeel): `word` = الكلمةُ **مشكولةً كاملة** (مثل "كَتَبَ").
   تُقشَّرُ الحركاتُ برمجياً: كلُّ حرفٍ يحملُ حركةً في المصدرِ تصيرُ فوقَه خانةٌ فارغة،
   والحرفُ العاري (كألفِ «قال») يبقى بلا خانةٍ فلا يُطالَبُ الطفلُ بما لا حركةَ له.
   والحركاتُ المتتاليةُ على حرفٍ واحد (الشدّةُ معَ الفتحة) **وحدةٌ واحدةٌ وبطاقةٌ واحدة**،
   فالطفلُ يرى «ــَّ» كما ينطقُها لا رمزَين يركّبُهما.
   التفاعلُ **نقرٌ لا سحب** (نمطُ لوحةِ ألوانِ `color`): تُختارُ الحركةُ ثم تُنقَرُ الحروف —
   لأنّ **بطاقةَ الحركةِ لا تُستهلَك** (الفتحةُ الواحدةُ قد تلزمُ ثلاثةَ حروف)، والنقرُ
   أسلمُ على السبورةِ من سحبِ نسخةٍ عن بطاقةٍ باقية. ونقرُ الحرفِ بحركتِه نفسِها يمحوها.
   الحقول: `word` (إلزامي)، `marks[]` (اختياري — بنكُ حركاتٍ مخصّص). */
/* الحركاتُ **بترميزِ `\u` صريحٍ لا بحرفِها المجرّد**: الحركةُ علامةٌ تركيبيةٌ لا عرضَ لها،
   فلو كُتبت في المصدرِ حرفاً لالتصقت بالاقتباسِ قبلَها وصارت غيرَ مرئيةٍ للقارئِ ولا
   للمراجِع، ويُتلفُها أيُّ نسخٍ أو محرّرٍ لا يحسنُ التطبيع. والترميزُ يجعلُها مقروءةً
   ومتينة. النطاق U+064B–U+0652 = التنوينُ والحركاتُ والشدّةُ والسكون. */
const AR_MARK_RE=/[\u064B-\u0652]/;
const AR_SHADDA='\u0651', AR_SUKUN='\u0652';
const AR_MARK_POOL=['\u064E','\u064F','\u0650','\u0652','\u0651'];  // فتحة، ضمّة، كسرة، سكون، شدّة
function renderTashkeel(q, body, fb){
  // ①  تقشيرُ الكلمة: كلُّ وحدةٍ = حرفٌ أساسيٌّ + ما تلاه من حركات
  const units=[];
  Array.from(q.word).forEach(ch=>{
    if(AR_MARK_RE.test(ch) && units.length) units[units.length-1].mark+=ch;
    else units.push({ch, mark:''});
  });
  const needed=units.filter(u=>u.mark);                   // الحروفُ المطلوبُ تشكيلُها
  if(!needed.length){ body.innerHTML='<div class="qerr">كلمةُ السؤالِ غيرُ مشكولة</div>'; return; }
  // ②  بنكُ الحركات: حركاتُ الكلمةِ نفسِها، ثم يُكمَّلُ من الحركاتِ القياسيةِ حتى ثلاثٍ
  //     على الأقلّ — كي لا يصيرَ السؤالُ بلا اختيارٍ حين تتّحدُ حركاتُ الكلمةِ كلُّها.
  let bank=q.marks ? q.marks.slice() : [];
  if(!bank.length){
    needed.forEach(u=>{ if(bank.indexOf(u.mark)<0) bank.push(u.mark); });
    for(let i=0;i<AR_MARK_POOL.length && bank.length<3;i++)
      if(bank.indexOf(AR_MARK_POOL[i])<0) bank.push(AR_MARK_POOL[i]);
  }
  bank=shuffle(bank);
  // ③  البناء: عمودٌ لكلِّ حرف — الخانةُ فوقَه والحرفُ تحتَها (قراءةُ الكلمةِ يمين→يسار)
  let cols='';
  units.forEach((u,i)=>{
    const slot=u.mark
      ? `<span class="blank tshslot" data-i="${i}" data-answer="${u.mark}"></span>`
      : `<span class="tshslot tsh-none"></span>`;
    cols+=`<span class="tshcol">${slot}<span class="tshletter">${u.ch}</span></span>`;
  });
  body.innerHTML=`<div class="tashkeel"><div class="tshword">${cols}</div>`+
    `<div class="bank tshbank"><div class="bt">الحركات:</div><div class="chips">`+
    bank.map(m=>`<button type="button" class="chip tshmark" data-m="${m}">ـ${m}</button>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  let pick=bank[0], done=false;
  const marks=body.querySelectorAll('.tshmark');
  const paint=()=>marks.forEach(b=>b.classList.toggle('sel', b.dataset.m===pick));
  paint();
  marks.forEach(b=>b.onclick=()=>{ if(done)return; pick=b.dataset.m; paint(); });
  const clearMark=()=>body.querySelectorAll('.tshslot').forEach(s=>s.classList.remove('correct','wrong'));
  body.querySelectorAll('.blank.tshslot').forEach(slot=>{
    slot.onclick=()=>{
      if(done)return;
      // نقرُ الحرفِ بحركتِه نفسِها يمحوها (مِفتاحُ تصحيحٍ بلا زرٍّ إضافي)
      if(slot.dataset.put===pick){ slot.dataset.put=''; slot.innerHTML=''; slot.classList.remove('filled'); }
      else { slot.dataset.put=pick; slot.innerHTML=`<span class="chip tshput">ـ${pick}</span>`; slot.classList.add('filled'); }
      clearMark();
    };
  });
  body.querySelector('.btn-check').onclick=()=>{
    if(done)return;
    const slots=body.querySelectorAll('.blank.tshslot'); let ok=0;
    slots.forEach(s=>{
      if(s.dataset.put && s.dataset.put===s.dataset.answer){ s.classList.add('correct'); s.classList.remove('wrong'); ok++; }
      else { s.classList.add('wrong'); s.classList.remove('correct'); }
    });
    if(ok===slots.length){
      done=true;
      qWin(fb,'🎉 أحسنت! الكلمةُ مشكولةٌ صحيحةً: '+q.word,3);
      const w=body.querySelector('.tshword');
      if(w) w.innerHTML=`<span class="lword tshfull">${q.word}</span>`;
    }
    else qFail(fb,`راجعِ الحركات — الصحيح ${arNum(ok)} من ${arNum(slots.length)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderTashkeel(q,body,fb);
}

/* ㉝ ترتيبُ كلماتٍ لتكوينِ جملة (sentence): `sentence` = الجملةُ الصحيحة، تُقسَّمُ على
   المسافاتِ فتصيرُ كلماتُها رموزَ الترتيب. `words[]` (اختياري) لبنكٍ مخصّصٍ يُضافُ إليه
   دخيلٌ أو تُدمَجُ فيه كلمتانِ متلازمتان. المحرّكُ هو محرّكُ الترتيبِ المشتركُ نفسُه
   (`renderTokenOrder`) — لا سطرَ منطقٍ مكرّرٌ بينَه وبينَ `arrange`. */
function renderSentence(q, body, fb){
  const target=String(q.sentence).trim().split(/\s+/);
  const scatter=(q.words && q.words.length) ? q.words.slice() : target.slice();
  return renderTokenOrder(q, body, fb, {
    target, scatter,
    wrapClass:'sentbuild', slotClass:'wslot', chipClass:'wchip',
    bankTitle:'الكلمات:',
    reveal:q.sentence,
    win:'🎉 أحسنت! الجملة: '+q.sentence,
    fail:'راجعْ ترتيبَ الكلمات',
    again:()=>renderSentence(q,body,fb)
  });
}

/* ㉞ الحروفُ الشمسيةُ والقمرية (sun-moon): `words[]` كلماتٌ معرَّفةٌ بـ«ال» **نصّاً فقط**،
   والنوعُ يستنتجُ شمسيَّتَها من قمريَّتِها بالحروفِ الأربعةَ عشرَ المعروفة — فلا يُكتَبُ
   الجوابُ في البياناتِ أصلاً ولا يُخطئُ المؤلِّفُ تصنيفَ حرف. (يجوزُ `{word, kind}` لكلمةٍ
   شاذّةٍ أو غيرِ مبدوءةٍ بـ«ال».)
   وفائدةُ الدرسِ تظهرُ **عندَ الصواب**: تُكشَفُ صورةُ النطقِ — «الشّمس» بشدّةٍ على الحرفِ
   بعدَ اللام (اللامُ لا تُنطَق)، و«الْقمر» بسكونٍ على اللامِ (تُنطَقُ ساكنة) — فالتغذيةُ
   الراجعةُ تعليمٌ لا حكمٌ فقط. صناديقُ الاستقبالِ صناديقُ `classify` نفسُها. */
const AR_SUN='تثدذرزسشصضطظلن';
function renderSunMoon(q, body, fb){
  const items=q.words.map(w=>{
    const word=(typeof w==='string')?w:w.word;
    let kind=(typeof w==='object' && w.kind) ? w.kind : null;
    const after=(word.indexOf('ال')===0) ? word.charAt(2) : '';
    if(!kind) kind = (after && AR_SUN.indexOf(after)>=0) ? 'sun' : 'moon';
    // صورةُ النطق: شدّةٌ على الحرفِ بعدَ اللامِ في الشمسية، وسكونٌ على اللامِ في القمرية
    const show = after
      ? (kind==='sun' ? 'ال'+after+AR_SHADDA+word.slice(3) : 'ال'+AR_SUKUN+word.slice(2))
      : word;
    return {word, kind, show};
  });
  const zone=(key,name,ic)=>`<div class="grp smgrp"><div class="grp-h">${ic} ${name}</div>`+
    `<div class="grp-drop" data-kind="${key}"></div></div>`;
  body.innerHTML=`<div class="classify sunmoon"><div class="grp-row">`+
    zone('sun','شمسية','☀️')+zone('moon','قمرية','🌙')+`</div>`+
    `<div class="bank clsbank"><div class="bt">الكلمات:</div><div class="chips">`+
    shuffle(items).map(it=>`<div class="chip smchip" draggable="true" data-w="${it.word}">${it.word}</div>`).join('')+
    `</div></div></div>`+
    `<div class="actions"><button class="btn btn-check">تحقّق ✔</button><button class="btn btn-reset">إعادة ↺</button></div>`;
  const kindOf={}, showOf={};
  items.forEach(it=>{kindOf[it.word]=it.kind; showOf[it.word]=it.show;});
  let dragged=null, done=false;
  const clearMark=()=>body.querySelectorAll('.smchip').forEach(c=>c.classList.remove('ok','no'));
  const place=z=>{ if(!dragged)return; z.appendChild(dragged); clearMark(); dragged=null; };
  body.querySelectorAll('.smchip').forEach(chip=>{
    chip.addEventListener('dragstart',()=>{dragged=chip;chip.classList.add('dragging')});
    chip.addEventListener('dragend',()=>chip.classList.remove('dragging'));
    chip.addEventListener('touchstart',()=>{dragged=chip;chip.classList.add('dragging')},{passive:true});
    chip.addEventListener('touchend',e=>{const t=e.changedTouches[0];const el=document.elementFromPoint(t.clientX,t.clientY);
      const z=el&&el.closest('.grp-drop, .chips'); if(z)place(z); chip.classList.remove('dragging')});
  });
  body.querySelectorAll('.grp-drop, .clsbank .chips').forEach(z=>{
    z.addEventListener('dragover',e=>{e.preventDefault();z.classList.add('over')});
    z.addEventListener('dragleave',()=>z.classList.remove('over'));
    z.addEventListener('drop',e=>{e.preventDefault();z.classList.remove('over');place(z)});
  });
  body.querySelector('.btn-check').onclick=()=>{
    if(done)return;
    let ok=0;
    body.querySelectorAll('.grp-drop').forEach(z=>{
      z.querySelectorAll('.smchip').forEach(c=>{
        if(kindOf[c.dataset.w]===z.dataset.kind){c.classList.add('ok');c.classList.remove('no');ok++;}
        else{c.classList.add('no');c.classList.remove('ok');}
      });
    });
    if(ok===items.length){
      done=true;
      // كشفُ صورةِ النطقِ على كلِّ بطاقةٍ بعدَ صحّةِ التصنيف
      body.querySelectorAll('.smchip').forEach(c=>{c.textContent=showOf[c.dataset.w];c.classList.add('revealed');});
      qWin(fb,'🎉 أحسنت! في الشمسيةِ لا تُنطَقُ اللامُ ويُشدَّدُ الحرفُ بعدَها، وفي القمريةِ تُنطَقُ اللامُ ساكنة',3);
    }
    else qFail(fb,`راجعِ التصنيف — الصحيح ${arNum(ok)} من ${arNum(items.length)}`);
  };
  body.querySelector('.btn-reset').onclick=()=>renderSunMoon(q,body,fb);
}

/* ★ الحرفُ المصمَّم — يُستعمَلُ في دروسِ الحروفِ («أحب لغتي» الصفُّ الأول) حيثُ الحرفُ
   نفسُه هو موضوعُ الدرسِ لا مجرّدُ نصٍّ في بطاقة. يُبنى بورقةِ المواصفاتِ البصريةِ
   المعتمدةِ في `CLAUDE.md`: **تدرّجُ أربعِ حزمٍ حادّةِ الحوافِّ** من سُلَّمِ لونٍ واحدٍ من
   سلالمِ `images/rocket/`، و**لمعةٌ بيضاءُ عريضةٌ** على أعلاه، و**حدٌّ `#111111` رفيعٌ
   مستديرُ الرؤوس**، والحرفُ **طافٍ بلا خطِّ أرضٍ ولا ظلٍّ مُلقًى**.

   **ولماذا `<text>` مقصوصٌ لا مساراتٌ يدوية:** المساراتُ تعني رسمَ كلِّ حرفٍ من العشرينَ
   يدوياً بكلِّ أشكالِ اتصالِه — أربعُ نسخٍ للحرفِ الواحد. والقصُّ يجعلُ الدالّةَ تعملُ مع
   **أيِّ حرفٍ وأيِّ شكلِ اتصالٍ** بلا رسمٍ جديد، والحزمُ تبقى حزماً حادّةً كما تشترطُ الورقة.

   `stroke-width` هنا **2.5 من لوحةِ 100** لا `3` من لوحةِ 600 — لأنّ المعيارَ في الورقةِ
   سماكةٌ **معروضةٌ** ≈٣ بكسل، والبلاطةُ تُعرَضُ 96px فتُعطي 2.4px. ولو أُخِذَ الرقمُ حرفياً
   لخرجَ الحدُّ شعرةً لا تُرى. */
const LETTER_RAMPS = {
  green:  ['#80C020','#60C020','#4A9018','#356810'],
  orange: ['#FF8000','#FF6000','#E04000','#C04000'],
  sky:    ['#40C0FF','#20A0FF','#2080E0','#1060A0'],
  ocean:  ['#00A0E0','#0080C0','#0060A0','#004880'],
  red:    ['#FF4020','#FF2020','#E02000','#B01800'],
  amber:  ['#FFA000','#E08000','#C06000','#984800'],
  moon:   ['#FFFFC0','#E0E0A0','#E0C080','#E0C060'],
  steel:  ['#C0C0C0','#808080','#606060','#404040']
};
let _laSeq = 0;
function letterArt(ch, ramp){
  const c = LETTER_RAMPS[ramp] || LETTER_RAMPS.orange;
  const id = 'la' + (++_laSeq);
  // الأشكالُ المتّصلةُ («ـبـ») أعرضُ من المنفصلة، فيتقلّصُ القياسُ لتبقى داخلَ اللوحة.
  const n = [...ch].length;
  const fs = n >= 3 ? 60 : n === 2 ? 76 : 90;
  const glyph = a => `<text x="50" y="54" text-anchor="middle" dominant-baseline="central"`+
    ` font-family="Cairo,Tajawal,sans-serif" font-weight="900" font-size="${fs}" ${a}>${ch}</text>`;
  return `<svg class="letterart" viewBox="0 0 100 100" role="img" aria-label="${ch}">`+
    `<defs><clipPath id="${id}">${glyph('')}</clipPath></defs>`+
    `<g clip-path="url(#${id})">`+
      `<rect x="0" y="0"  width="100" height="30" fill="${c[0]}"/>`+
      `<rect x="0" y="30" width="100" height="22" fill="${c[1]}"/>`+
      `<rect x="0" y="52" width="100" height="22" fill="${c[2]}"/>`+
      `<rect x="0" y="74" width="100" height="26" fill="${c[3]}"/>`+
      `<ellipse cx="36" cy="25" rx="18" ry="8" fill="#fff" opacity=".82" transform="rotate(-14 36 25)"/>`+
    `</g>`+
    glyph('fill="none" stroke="#111111" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"')+
  `</svg>`;
}

/* ㉟ توصيلُ الحرفِ بالصورة (letter-picture): `pairs[{letter, word, art?, img|svg}]` — عمودُ حروفٍ
   وعمودُ صور، يُنقَرُ الحرفُ ثم صورتُه فيُرسَمُ الخطُّ الواصل. وعندَ الوصلِ الصحيحِ
   **تظهرُ الكلمةُ تحتَ الصورةِ وحرفُها الأولُ مميَّز**، فيرى الطفلُ الصوتَ في موضعِه من
   الكلمةِ لا مجرّدَ «صحيح». الصورةُ إمّا أصلٌ من `images/` (`img`) أو SVG مكتوبٌ معَ
   السؤال (`svg`) — والثاني هو الأصلُ في قاعدةِ الرسومِ (CLAUDE.md).
   محرّكُ الخطِّ المنحني هو محرّكُ `matching` نفسُه. */
function renderLetterPicture(q, body, fb){
  body.innerHTML=`<div class="matchwrap lpwrap"><svg class="matchsvg"></svg>`+
    `<div class="match"><div class="mcol mcolL"></div><div class="mcol mcolR"></div></div></div>`+
    `<div class="actions"><button class="btn btn-reset">إعادة ↺</button></div>`;
  const wrap=body.querySelector('.matchwrap'), svg=body.querySelector('.matchsvg');
  const L=body.querySelector('.mcolL'), Rr=body.querySelector('.mcolR');
  const NS='http://www.w3.org/2000/svg';
  let sel=null, done=0;
  function drawLink(a,b){
    const R=window.fitRect||(el=>el.getBoundingClientRect());
    const wr=R(wrap), ra=R(a), rb=R(b);
    const aRight = ra.left < rb.left;
    const ax=(aRight?ra.right:ra.left)-wr.left, ay=ra.top+ra.height/2-wr.top;
    const bx=(aRight?rb.left:rb.right)-wr.left, by=rb.top+rb.height/2-wr.top;
    const mx=(ax+bx)/2;
    const p=document.createElementNS(NS,'path');
    p.setAttribute('d',`M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`);
    p.setAttribute('fill','none'); p.setAttribute('stroke',MATCH_LINE);
    p.setAttribute('stroke-width','3.5'); p.setAttribute('stroke-linecap','round');
    svg.appendChild(p);
    [[ax,ay],[bx,by]].forEach(pt=>{const c=document.createElementNS(NS,'circle');
      c.setAttribute('cx',pt[0]); c.setAttribute('cy',pt[1]); c.setAttribute('r','5');
      c.setAttribute('fill',MATCH_LINE); svg.appendChild(c);});
  }
  // عمودُ الصور (يسار) — الكلمةُ مخفيّةٌ حتى يصحَّ الوصل.
  // **ليست `.mitem` عن قصد:** الكبسولةُ زخرفةُ نصٍّ لا إطارُ صورة، ولو حملتِ البطاقةُ
  // صنفَ `.mitem` لفُرِدَت عليها كبسولةٌ ضخمةٌ حولَ الرسم. فلها لوحُها الهادئُ الخاصّ
  // (‏`.lpcard` في `style.css`)، وتبقى الكبسولةُ لعمودِ الحروفِ النصّيّ وحدَه.
  shuffle(q.pairs).forEach(pr=>{
    const d=document.createElement('div');
    d.className='lpcard left'; d.dataset.k=pr.letter;
    d.innerHTML=`<span class="lpimg">${pr.svg || `<img src="${pr.img}" alt="">`}</span>`+
                `<span class="lpword">${pr.word||''}</span>`;
    d.onclick=()=>{
      if(!sel || d.classList.contains('matched'))return;
      if(sel.dataset.k===pr.letter){
        drawLink(sel,d); sel.classList.add('matched'); d.classList.add('matched','shown');
        sel.classList.remove('selected'); sel=null; done++; playCorrectSound();
        if(done===q.pairs.length) qWin(fb,'🌟 ممتاز! وصلتَ كلَّ حرفٍ بصورتِه',1);
      } else { qFail(fb,'ليس هذا حرفَ الصورة، أعدِ المحاولة'); d.classList.add('shake'); setTimeout(()=>d.classList.remove('shake'),500); }
    };
    L.appendChild(d);
  });
  // عمودُ الحروف (يمين)
  shuffle(q.pairs).forEach(pr=>{
    const d=document.createElement('div');
    d.className='mitem right lpletter'; d.dataset.k=pr.letter;
    // `art` = اسمُ سُلَّمِ لونٍ ⇒ الحرفُ رسمٌ مصمَّم. وغيابُه يُبقيه نصّاً خامّاً كما كان
    // حرفياً، فلا يتأثّرُ أيُّ سؤالٍ مؤلَّفٍ قبلَ هذه التوسعة.
    if(pr.art){ d.classList.add('hasart'); d.innerHTML=letterArt(pr.letter,pr.art); }
    else d.textContent=pr.letter;
    d.onclick=()=>{
      if(d.classList.contains('matched'))return;
      Rr.querySelectorAll('.right').forEach(x=>x.classList.remove('selected'));
      d.classList.add('selected'); sel=d;
    };
    Rr.appendChild(d);
  });
  body.querySelector('.btn-reset').onclick=()=>renderLetterPicture(q,body,fb);
}

/* ㊱ الحكمُ والتعليل (judge-reason) — **خاصٌّ باللغة العربية**، مستواه `evaluation`:
   بنيةُ `mcq` نفسُها (`options` + `answer`) للحكم، ويزيدُ عليها `reasons` (ثلاثةُ أسباب)
   و`reasonAnswer` (فهرسُ الصحيح) للتعليل.

   **لماذا خطوتان لا خطوة:** لو ظهرتِ الأسبابُ معَ الحكمِ لَدَلَّ نصُّ السببِ على الحكمِ
   نفسِه («لأنّه أخذَه إلى الطبيب» يفضحُ أنّ الجوابَ «نعم»)، فيصيرُ السؤالُ تذكّراً لا تقويماً.

   **ولماذا تُبنى الأسبابُ من البداية محجوبةً بـ`visibility` لا تُنشأُ عندَ الكشف:**
   هذا النوعُ **الوحيدُ في المنصّةِ الذي ينمو بعدَ أوّلِ تفاعل**، وكلُّ الأنواعِ القائمةِ
   ثابتةُ الارتفاعِ فيُختارُ إطارُها القمريُّ مرّةً واحدةً عندَ العرض. وقد قِسنا أنّ إنشاءَ
   الأسبابِ عندَ الكشفِ يُنمي المحتوى ‏١٨٦px فيفيضُ عن الإطارِ المختار (‏`scrollHeight 534`
   مقابلَ `clientHeight 348`) **ولا تتدخّلُ شبكةُ أمانِ الأبعاد**. فحجزُ ارتفاعِها من البداية
   يجعلُ الارتفاعَ ثابتاً فيُختارُ الإطارُ على أقصى امتدادِ السؤالِ من أوّلِ لحظة — وهو
   علاجُ «تخفيفِ السؤالِ ليدخلَ إطاراً حقيقياً» لا تعديلُ الواجهة (قاعدةُ فحصِ الإطار).

   **المقايضةُ المقبولةُ صراحةً:** نصُّ الأسبابِ موجودٌ في DOM منذ البداية (محجوبٌ بصرياً
   وغيرُ قابلٍ للتركيزِ ولا النقر)، فيمكنُ لفاحصِ الصفحةِ رؤيتُه. قُبِلَ ذلك لأنّ البديلَ
   يكسرُ قاعدةَ الإطارِ الإلزامية، ولأنّ المخاطبَ تلميذُ الحلقةِ الأولى على سبّورةٍ ذكيّةٍ
   لا فاحصَ عناصر. الشرطُ التربويُّ محفوظٌ: **لا يراها الطالبُ حتى يصحَّ حكمُه.**

   **الدرجةُ واحدةٌ لا اثنتان:** `qWin` (ورفعُ الصاروخ) لا يُنادى إلا عندَ صحّةِ الحكمِ
   والسببِ معاً. وصحّةُ الحكمِ وحدَها تعطي سطرَ تغذيةٍ محايداً بلا صوتٍ ولا مكافأة.

   **الحكمُ الخاطئ يُعادُ اختيارُه** (لا يُعطَّلُ زرُّه) لأنّ الخيارَينِ اثنانِ فتعطيلُ
   الخطأِ يكشفُ الصواب؛ بخلافِ السببِ الخاطئِ فيُعطَّلُ كما في `mcq` لأنّ الأسبابَ ثلاثة.

   يُعيدُ استعمالَ `.opts/.opt` فيرثُ أقشرةَ الواجهةِ الثلاث (rocky · metal · capsule) تلقائياً. */
function renderJudgeReason(q, body, fb){
  const opts=shuffle(q.options.map((o,idx)=>({o,idx})));
  const reasons=shuffle(q.reasons.map((r,idx)=>({r,idx})));
  body.innerHTML=`<div class="jr">`+
    `<div class="opts jr-judge">`+opts.map(x=>`<button class="opt" data-i="${x.idx}">${x.o}</button>`).join('')+`</div>`+
    /* محجوزةُ الارتفاعِ من البداية، محجوبةٌ بـ`visibility` ومعطّلةٌ وخارجَ ترتيبِ التركيز */
    `<div class="jr-why jr-locked" aria-hidden="true"><div class="bt jr-bt">لماذا؟</div>`+
    `<div class="opts jr-reasons">`+reasons.map(x=>
      `<button class="opt" data-i="${x.idx}" disabled tabindex="-1">${x.r}</button>`).join('')+
    `</div></div></div>`;
  const why=body.querySelector('.jr-why');
  let judged=false, done=false;

  body.querySelectorAll('.jr-judge .opt').forEach(btn=>{ btn.onclick=()=>{
    if(judged) return;
    if(+btn.dataset.i===q.answer){
      judged=true;
      btn.classList.add('correct');
      body.querySelectorAll('.jr-judge .opt').forEach(b=>b.disabled=true);
      fb.textContent='حكمٌ صحيح ✔ — والآن: لماذا؟';
      fb.className='fb qfb';                       // محايد: لا مكافأةَ حتى يصحَّ السببُ أيضاً
      unlockReasons();
    } else {
      btn.classList.add('wrong');
      qFail(fb,'أعِدِ النظرَ في الموقف، ثمّ اختَرِ الحكم');
      setTimeout(()=>btn.classList.remove('wrong'),900);   // يُعادُ الاختيارُ ولا يُعطَّل
    }
  };});

  function unlockReasons(){
    why.classList.remove('jr-locked');
    why.removeAttribute('aria-hidden');
    why.querySelectorAll('.jr-reasons .opt').forEach(btn=>{
      btn.disabled=false; btn.removeAttribute('tabindex');
      btn.onclick=()=>{
        if(done) return;
        if(+btn.dataset.i===q.reasonAnswer){
          done=true;
          btn.classList.add('correct');
          why.querySelectorAll('.opt').forEach(b=>b.disabled=true);
          qWin(fb,'🎉 أحسنت! الحكمُ صحيحٌ وتعليلُه صحيح',3);
        } else {
          btn.classList.add('wrong'); btn.disabled=true;
          /* صيغةٌ محايدةٌ **بلا تفريعٍ حسبَ نوعِ الحكم**: تصلحُ لأحكامِ التصرّفاتِ
             («ما فعلَه») ولأحكامِ النصوصِ (ما فيه) معاً. والتفريعُ كان سيُلزِمُ كلَّ
             سؤالٍ بحقلٍ يصفُ نوعَ حكمِه، وهو تعقيدٌ في البياناتِ لا يشتريه شيء. */
          qFail(fb,'ليس هذا هو السبب، عُدْ إلى النصِّ وتأمَّلْ');
        }
      };
    });
  }
}

/* ㊲ أستمع وحدّد موضع الحكم (listen-locate) — مجالُ التلاوةِ والتجويدِ في «ديني حياتي».
   البيانات: rule (اسمُ الحكم) · surah · ayah · audio (مسارُ التلاوة) · tokens[] (كلماتُ
   الآيةِ على ترتيبِها الصحيح) · answer[{token, chars?}] · why (تعليلٌ قصير).

   ⛔ **حُرمةُ النصِّ الشريف (CLAUDE.md §① وdini-hayati-question-types.json §sacredText):**
   الآيةُ تُعرَضُ **كاملةً على ترتيبِها الصحيحِ مضبوطةً** ولا تُبعثَرُ ولا يُحذَفُ منها
   شيء. التلميذُ **يشيرُ** إلى موضعِ الحكمِ ولا يحرّكُ لفظاً — فلا تنشأُ حالةٌ وسطى
   محرَّفةٌ في أيِّ لحظة. و`shuffle` **لا تُستعمَلُ هنا إطلاقاً**، بخلافِ كلِّ نوعٍ
   ذي خيارات.

   **`chars` فهارسُ حروفٍ لا فهارسُ محارف** (`llClusters`): كلُّ حرفٍ يُضَمُّ إليه ما
   يتبعُه من حركاتٍ فيصيرَ عنصراً واحداً. والفرقُ ليس تسهيلاً على المؤلِّف فحسب —
   الفهرسةُ على محارفِ JS الخامِ كانت تفصلُ الحركةَ عن حرفِها فيخرجَ النصُّ الشريفُ
   مشوّهاً على الشاشة، وهو عينُ ما تمنعُه القاعدةُ أعلاه. وغيابُ `chars` = إبرازُ
   الكلمةِ كلِّها.

   **الصوتُ لا يُعطِّلُ السؤال:** إن تعذّرَ تحميلُ الملفِّ عُطِّلَ الزرُّ وحدَه وتغيّرَ
   نصُّه، ويبقى السؤالُ قابلاً للحلِّ بالنظرِ في النصّ. */
function llClusters(word){
  /* الحركاتُ والعلاماتُ العلويةُ/السفلية — تُلحَقُ بالحرفِ السابقِ لها.
     بالهروبِ الرقميِّ لا بالمحارفِ نفسِها: محارفُ التشكيلِ غيرُ مرئيةٍ في الشيفرة
     فلا تُراجَعُ بالعين. U+064B–U+065F حركاتٌ وتنوينٌ وسكونٌ وهمزات ·
     U+0670 ألفٌ خنجرية · U+06D6–U+06ED علاماتُ الضبطِ والوقفِ المصحفية. */
  const MARK=/[\u064B-\u065F\u0670\u06D6-\u06ED]/;
  const out=[];
  for(const ch of String(word)){
    if(out.length && MARK.test(ch)) out[out.length-1]+=ch;
    else out.push(ch);
  }
  return out;
}
function renderListenLocate(q, body, fb){
  const toks=q.tokens||[];
  const answers=q.answer||[];
  body.innerHTML=`<div class="ll">`+
    `<div class="ll-bar"><button class="btn aplay ll-listen" type="button">🔊 اسْتَمِعْ إِلى التِّلاوَةِ</button></div>`+
    (q.rule?`<div class="ll-rule">الحُكْمُ: <b>${q.rule}</b></div>`:'')+
    /* الآيةُ بخطِّ المصحف — `.tajweed-ayah` (تعريفُ ‎@font-face‎ في `css/style.css`) */
    `<div class="tajweed-ayah ll-ayah">`+
      toks.map((t,i)=>`<span class="ll-tok" data-i="${i}">${t}</span>`).join('')+
    `</div>`+
    (q.surah?`<div class="ll-src">﴿${q.surah}: ${arNum(q.ayah)}﴾</div>`:'')+
    `<div class="ll-why" hidden></div>`+
    `<div class="actions"><button class="btn btn-check" disabled>تحقّق ✔</button>`+
    `<button class="btn btn-reset">إعادة ↺</button></div></div>`;

  const playBtn=body.querySelector('.ll-listen');
  const why=body.querySelector('.ll-why');
  const check=body.querySelector('.btn-check');
  const tokEls=[].slice.call(body.querySelectorAll('.ll-tok'));

  /* ── الصوت: يُعطَّلُ الزرُّ وحدَه عندَ الفشل، ولا يُرمى استثناءٌ ولا ينكسرُ السؤال ── */
  let snd=null, audioDead=false;
  function killAudio(){
    if(audioDead) return;
    audioDead=true; snd=null;
    playBtn.disabled=true;
    playBtn.textContent='التسجيل غير متوفّر بعد';
    playBtn.classList.add('ll-dead');
  }
  if(q.audio){
    try{
      snd=new Audio();
      snd.preload='auto';
      snd.addEventListener('error',killAudio);       // 404 أو ترميزٌ غيرُ مدعوم
      snd.src=q.audio;
    }catch(e){ killAudio(); }
  } else killAudio();
  function play(){
    if(!snd||audioDead) return;
    try{ snd.currentTime=0; const p=snd.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){}
  }
  playBtn.onclick=play;

  /* ── التحديد: نقرةٌ واحدةٌ تختارُ كلمةً واحدةً، وتفتحُ زرَّ التحقّق ── */
  let sel=-1, done=false;
  tokEls.forEach(el=>{ el.onclick=()=>{
    if(done) return;
    tokEls.forEach(x=>x.classList.remove('sel'));
    el.classList.add('sel');
    sel=+el.dataset.i;
    check.disabled=false;
  };});

  check.onclick=()=>{
    if(done||sel<0) return;
    const hit=answers.filter(a=>a.token===sel)[0];
    if(hit){
      done=true;
      const cl=llClusters(tokEls[sel].textContent);
      const chars=hit.chars;
      /* إبرازُ الحروفِ المقصودةِ داخلَ الكلمة — وبلا `chars` تُبرَزُ الكلمةُ كلُّها */
      if(chars&&chars.length){
        tokEls[sel].innerHTML=cl.map((c,i)=>
          chars.indexOf(i)>=0?`<b class="ll-ch">${c}</b>`:c).join('');
      } else tokEls[sel].classList.add('ll-whole');
      tokEls[sel].classList.remove('sel');
      tokEls[sel].classList.add('hit');
      tokEls.forEach(x=>{ x.style.cursor='default'; });
      if(q.why){ why.innerHTML=`<b>لِماذا؟</b> ${q.why}`; why.hidden=false; }
      check.disabled=true;
      qWin(fb,'🎯 أَحْسَنْتَ! هٰذا مَوْضِعُ الحُكْمِ',2);
      play();                                        // إعادةُ التلاوةِ لترسيخِ الأثرِ السمعيّ
    } else {
      tokEls[sel].classList.add('miss');
      const bad=tokEls[sel];
      setTimeout(()=>{ if(bad) bad.classList.remove('miss'); },900);
      qFail(fb,'لَيْسَ هٰذا مَوْضِعَ الحُكْمِ، اسْتَمِعْ مَرَّةً أُخْرى');
    }
  };
  body.querySelector('.btn-reset').onclick=()=>renderListenLocate(q,body,fb);
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
