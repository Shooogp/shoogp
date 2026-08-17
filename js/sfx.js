/* ═══════════════════════════════════════════════════════════════════════════
   شوجب — وحدةُ الصوتِ الموحَّدة (`SHOOGP_SFX`)
   ═══════════════════════════════════════════════════════════════════════════

   **العلّةُ التي أُنشئتْ لها:** كانَ نطقُ عباراتِ التعزيزِ («أحسنت»، «وصلتَ القمر»)
   يخرجُ من `speechSynthesis` — أي من **محرّكِ نطقِ جهازِ المعلّمة لا من المنصّة**.
   فإن خلا الجهازُ من صوتٍ عربيٍّ مثبَّت (شائعٌ في متصفّحاتِ السبوراتِ الذكيةِ
   وأجهزةِ أندرويدَ المبسَّطة) سقطَ النطقُ على الصوتِ الافتراضيِّ اللاتينيِّ فخرجَ
   مشوَّهاً أو صامتاً — فيختلفُ الدرسُ الواحدُ من فصلٍ إلى فصل، والتعزيزُ الذي لا
   يُسمَعُ بانتظامٍ يفقدُ أثرَه التربويَّ أصلاً.

   **القاعدةُ بعدَ اليوم: كلُّ صوتٍ في المنصّةِ ملفٌّ في المستودع.** لا نطقَ آليّاً،
   ولا اعتمادَ على جهازِ المعلّمة. صوتٌ واحدٌ لكلِّ الفصول.

   ▸ الصوتُ البشريُّ (`audio/voice/`) — عباراتُ التعزيزِ الثابتةُ مولَّدةً بصوتٍ بشريّ.
   ▸ المؤثّراتُ غيرُ البشريةِ (`audio/sfx/`) — نقرٌ وسحبٌ وانتقالٌ وفتحُ قفل.

   ═══ ثلاثةُ قراراتٍ هندسيةٍ تستحقُّ التفسير ═══

   ① **الوسمُ يُورَثُ من رابطِ هذا السكربتِ نفسِه** — كما يفعلُ `imgURL` في
      `shoogp-ui.js`. لولاه لبقيَ متصفّحُ المعلّمةِ على نسخةٍ قديمةٍ من مؤثّرٍ
      بعدَ تحديثِه ونشرِه بنجاح. (وقعَ فعلاً مع الصورِ — ٢٠٢٦-٠٨-٠٦.)

   ② **المؤثّراتُ عبرَ WebAudio لا `<audio>`** — لأنّ عنصرَ `<audio>` الواحدَ لا
      يتداخلُ مع نفسِه: نقرتانِ متتاليتانِ سريعتانِ تقطعُ ثانيتُهما الأولى. ومخزَنُ
      `AudioBuffer` يسمحُ بأصواتٍ متزامنةٍ وبتأخيرٍ أدنى — وهو ما يُحسُّ فعلاً على
      السبورةِ الذكية. **سياقٌ مستقلٌّ تماماً عن سياقِ `rocket.js`** فلا يُمَسُّ
      نظامُ الصاروخِ ولا يتأثّرُ به.

   ③ **الصوتُ البشريُّ عبرَ `<audio>` عمداً** — فهو طويلٌ نسبياً ويجبُ أن **يقطعَ
      سابقَه لا أن يتراكبَ معه**: صوتانِ بشريانِ معاً ضجيجٌ لا تعزيز.

   ═══ الالتقاطُ بالتفويضِ لا بتعديلِ المُصيِّرات ═══
   أنواعُ الأسئلةِ تتجاوزُ الأربعين، ولكلٍّ منها مُصيِّرُه ومعالجاتُه. فلو رُبطَ الصوتُ
   داخلَ كلِّ معالجٍ لَلَزِمَ تعديلُ عشراتِ المواضعِ ولَنَسِيَ كلُّ سؤالٍ جديدٍ صوتَه.
   فالوحدةُ تستمعُ على `document` وتستنتجُ الحدثَ من المُحدِّداتِ نفسِها التي
   يستعملُها `app.js` — **فلا سطرَ واحدٌ يُمَسُّ في المُصيِّرات، وكلُّ سؤالٍ يُؤلَّفُ
   غداً يرثُ الصوتَ تلقائياً**.

   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── وسمُ النسخة: يُلتقَطُ من رابطِ هذا السكربتِ (ختمَه النشرُ ببصمةِ النشرة) ── */
  var _SELF_SRC = (function () {
    if (document.currentScript && document.currentScript.src) return document.currentScript.src;
    var s = document.querySelector('script[src*="js/sfx.js"]');
    return s ? s.src : '';
  })();
  var VER = (function () {
    var m = /[?&]v=([^&#]+)/.exec(_SELF_SRC);
    return m ? '?v=' + m[1] : '';
  })();

  /* ── الملفّات ─────────────────────────────────────────────────────────── */
  var SFX = {
    click:  'audio/sfx/ui-click.mp3',   // نقرةُ زرٍّ أو خيار
    pick:   'audio/sfx/ui-pick.mp3',    // التقاطٌ عندَ بدءِ السحب
    drop:   'audio/sfx/ui-drop.mp3',    // استقرارٌ عندَ الإفلات
    move:   'audio/sfx/ui-move.mp3',    // انتقالُ سؤالٍ أو شاشة
    unlock: 'audio/sfx/ui-unlock.mp3'   // فتحُ قفلٍ حقيقيّ
  };
  var VOICE = {
    'all-done':          'audio/voice/all-done.mp3',           // أحسنت، أكملتَ كلَّ الأسئلة
    'moon-arrived':      'audio/voice/moon-arrived.mp3',       // وصلتَ القمرَ في الوقتِ المناسب
    'moon-arrived-hard': 'audio/voice/moon-arrived-hard.mp3'   // وصلتَ بعدَ رحلةٍ مليئةٍ بالتحدّي
  };

  /* ── الكتم: مصدرُ الحقيقةِ هو `muted` في app.js، وإلّا فالتخزينُ المحليّ ──── */
  function isMuted() {
    try {
      if (typeof window.muted !== 'undefined') return !!window.muted;
      if (typeof muted !== 'undefined') return !!muted;
    } catch (e) {}
    try { return localStorage.getItem('shoogp-muted') === '1'; } catch (e) { return false; }
  }

  /* ── سياقُ WebAudio للمؤثّرات (مستقلٌّ عن سياقِ الصاروخ) ─────────────────── */
  var ctx = null, buffers = {}, ready = false;

  function audioCtx() {
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      try { ctx = new C(); } catch (e) { return null; }
    }
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }

  function loadOne(key) {
    var c = audioCtx(); if (!c) return;
    if (buffers[key] !== undefined) return;
    buffers[key] = null;                       // علامةُ «قيدَ التحميل» فلا يُطلَبُ مرّتين
    fetch(SFX[key] + VER)
      .then(function (r) { return r.ok ? r.arrayBuffer() : Promise.reject(); })
      .then(function (a) {
        return new Promise(function (res, rej) {
          var p = c.decodeAudioData(a, res, rej);            // الصيغةُ القديمةُ لسفاري
          if (p && p.then) p.then(res, rej);
        });
      })
      .then(function (b) { buffers[key] = b; })
      .catch(function () { buffers[key] = false; });          // مفقودٌ أو تالف: صمتٌ بلا ضجيج
  }

  /* تُستدعى عندَ أوّلِ تفاعل: سياسةُ التشغيلِ التلقائيِّ تمنعُ الصوتَ قبلَه، والتحميلُ
     قبلَه هدرٌ لباقةِ المدرسة. المجموعُ ٢٣ كيلوبايت فالتحميلُ دفعةً واحدةً آمن. */
  function warm() {
    if (ready) return; ready = true;
    for (var k in SFX) if (Object.prototype.hasOwnProperty.call(SFX, k)) loadOne(k);
  }

  var lastAt = {};
  function play(key, gain) {
    if (isMuted() || !SFX[key]) return;
    var now = (window.performance && performance.now) ? performance.now() : +new Date();
    /* خنقٌ زمنيّ: نقراتٌ متلاحقةٌ على السبورةِ تتحوّلُ إلى طقطقةٍ مزعجةٍ بلا هذا. */
    if (lastAt[key] && now - lastAt[key] < 45) return;
    lastAt[key] = now;

    var c = audioCtx(); if (!c) return fallbackPlay(key);
    warm();
    var buf = buffers[key];
    if (!buf) { if (buf === undefined) loadOne(key); return; }
    try {
      var src = c.createBufferSource(); src.buffer = buf;
      var g = c.createGain(); g.gain.value = (gain === undefined ? 1 : gain);
      src.connect(g); g.connect(c.destination); src.start();
    } catch (e) {}
  }

  /* احتياطٌ لمتصفّحٍ بلا WebAudio — نادرٌ لكنّه يبقي الصوتَ موجوداً */
  var fallbackEls = {};
  function fallbackPlay(key) {
    try {
      var a = fallbackEls[key] || (fallbackEls[key] = new Audio(SFX[key] + VER));
      a.currentTime = 0; var p = a.play(); if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  /* ── الصوتُ البشريّ: عنصرٌ واحدٌ يقطعُ سابقَه ─────────────────────────── */
  var voiceEl = null;
  function voice(key) {
    if (isMuted() || !VOICE[key]) return;
    try {
      if (!voiceEl) { voiceEl = new Audio(); voiceEl.preload = 'auto'; }
      voiceEl.pause();
      voiceEl.src = VOICE[key] + VER;
      voiceEl.currentTime = 0;
      var p = voiceEl.play(); if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function stopVoice() { try { if (voiceEl) voiceEl.pause(); } catch (e) {} }

  /* ═══ التفويض: المُحدِّداتُ منقولةٌ حرفياً من app.js فلا تفترقُ عنه ═══ */

  /* مناطقُ الإفلاتِ — نفسُ ما يستعملُه `closest(...)` في معالجاتِ اللمسِ هناك */
  var DROP_ZONES = '.target, .grp-drop, .chips, .pzslot, .pztray, .lslot, .lbank,' +
                   '.mm-slot, .mmchips, .cmp-slot, .hc-blank, .aopt';
  /* عناصرُ السحب */
  var DRAGGABLES = '[draggable="true"], .chip, .seqitem, .pzpiece';
  /* أزرارُ التنقّلِ بينَ الأسئلة — لها صوتُ انتقالٍ لا صوتُ نقرة */
  var NAV = '.qprev, .qnext, .qfinish';
  /* ما يُنقَرُ فيُسمَعُ نقرةً — وعناصرُ السحبِ مستثناةٌ لأنّ لها صوتَيها الخاصَّين */
  var CLICKABLE = 'button, .btn, .opt, .bt, .tf, .memcard, .mitem, .cswatch,' +
                  '.aopt, [role="button"]';
  /* فتحُ كتابٍ أو درسٍ = انتقالُ شاشة */
  var SCREEN = '.bookcard, .book, .lesson, .lcard, .lessoncard';

  var dragging = false;

  document.addEventListener('pointerdown', warm, { once: true, passive: true });
  document.addEventListener('touchstart',  warm, { once: true, passive: true });
  document.addEventListener('keydown',     warm, { once: true, passive: true });

  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest(NAV))     { play('move'); return; }
    if (t.closest(SCREEN))  { play('move'); return; }
    if (t.closest(DRAGGABLES) && !t.closest(CLICKABLE)) return;   // للسحبِ صوتُه
    if (t.closest(CLICKABLE)) play('click');
  }, true);

  /* السحبُ بالفأرة (الحاسوب) */
  document.addEventListener('dragstart', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest(DRAGGABLES)) { dragging = true; play('pick'); }
  }, true);
  document.addEventListener('drop', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest(DROP_ZONES)) play('drop');
    dragging = false;
  }, true);
  document.addEventListener('dragend', function () { dragging = false; }, true);

  /* السحبُ باللمسِ (السبورةُ الذكيةُ واللوحيّ) — `app.js` يعتمدُ `touchend` مع
     `elementFromPoint`، فنقيسُ الشيءَ نفسَه حتى يتطابقَ الصوتُ مع ما حدثَ فعلاً. */
  document.addEventListener('touchstart', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest(DRAGGABLES)) { dragging = true; play('pick'); }
  }, { capture: true, passive: true });

  document.addEventListener('touchend', function (e) {
    if (!dragging) return;
    dragging = false;
    try {
      var p = e.changedTouches && e.changedTouches[0]; if (!p) return;
      var el = document.elementFromPoint(p.clientX, p.clientY);
      if (el && el.closest && el.closest(DROP_ZONES)) play('drop');
    } catch (err) {}
  }, { capture: true, passive: true });

  /* ── الواجهةُ العامّة ─────────────────────────────────────────────────── */
  window.SHOOGP_SFX = {
    play: play,           // play('click'|'pick'|'drop'|'move'|'unlock')
    voice: voice,         // voice('all-done'|'moon-arrived'|'moon-arrived-hard')
    stopVoice: stopVoice,
    warm: warm,
    isMuted: isMuted,
    _buffers: buffers     // للتشخيصِ فقط
  };
})();
