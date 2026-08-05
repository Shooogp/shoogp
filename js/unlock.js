/* ═══════════════════════════════════════════════════════════════════
   شوجب — قفل الوحدات وفتحها برمز  (النسخة الأولى)
   ═══════════════════════════════════════════════════════════════════
   **هذا الملفُّ هو موطنُ قاعدةِ القفلِ كاملةً** — لا تُكرَّرْ في مكانٍ آخر.
   ‏`CLAUDE.md` يشيرُ إليه بسطرٍ واحدٍ فقط.

   ── القاعدةُ الأساسية ──
   • **الوحدةُ الأولى من كلِّ كتابٍ مفتوحةٌ دائماً ومجاناً.**
   • كلُّ وحدةٍ رقمُها أكبرُ من ١ مقفلةٌ حتى يُدخَلَ رمزُ فتحٍ صالح.
   • القاعدةُ **مشتقّةٌ من رقمِ الوحدةِ نفسِه** (ترتيبِها في `units`) — فلا حقلَ
     `locked` في `data/index.json`، ولا تعديلَ بياناتٍ عندَ إضافةِ كتاب.

   ── نطاقُ الرمز ──
   الرمزُ الواحدُ يفتحُ إمّا كتاباً كاملاً أو وحدةً مفردة، ويُحدَّدُ **في ملفِّ
   الرموزِ لا في الكود**:
     • كتابٌ كامل →  `g4-sci`
     • وحدةٌ مفردة → `g4-sci#3`   (الوحدةُ الثالثة — بترقيمِ العرضِ ١‑based)

   ⚠️ **النطاقُ هو مفتاحُ الكتابِ في `data/books.json` حرفياً** (‏`g4-sci`‏، `g4-math`‏،
   `g2-arabic-1`‏) — **لا بادئةُ ملفِّ الدرس** (‏`g4s-1-1`‏). وبينهما اختلافٌ قائمٌ في
   المستودع، ولا تُبنى ترجمةٌ بينهما في أيِّ موضع: هويةُ الكتابِ في القفلِ تُقرأُ من
   **المصدرِ نفسِه الذي تُقرأُ منه القائمة** (`currentBook` في `js/app.js`).

   ⚠️ **الفاصلُ `#` لا `-`** — لأنّ مفاتيحَ الكتبِ نفسَها تحوي شرطات (`g4-sci`)،
   فالتقسيمُ بالشرطةِ يفشل.

   ── آليةُ التحقّق ──
   • **لا يُخزَّنُ أيُّ رمزٍ صريحٍ في المستودع.** يُخزَّنُ `SHA-256` للنصِّ
     `SALT + الرمزُ المطبَّع`، والتطبيعُ: رفعٌ إلى الحروفِ الكبيرةِ وحذفُ الفراغاتِ
     والشرطاتِ والشرطاتِ السفلية.
   • ‏`data/codes.json` يُجلَبُ بـ`cache:'no-store'` لأنّه يتغيّرُ بين النشرات،
     و**لا يُجلَبُ إلا عندَ التحقّقِ من رمزٍ مُدخَل** — حالةُ الفتحِ نفسُها تُقرأُ من
     `localStorage` فتُرسَمُ الأقفالُ فوراً بلا انتظارِ شبكة.
   • لكلِّ رمزٍ تاريخُ انتهاءٍ اختياريّ (`exp`) لأنّ البيعَ بالفصلِ الدراسيِّ لا مدى
     الحياة. يُتحقَّقُ من الانتهاءِ **في كلِّ قراءة**، لا عندَ الفتحِ فقط.
   • ما يُفتَحُ يُحفَظُ في `localStorage` تحتَ **مفتاحٍ واحد** (`shoogp-unlocked`)
     خريطةً: النطاقُ ← تاريخُ الانتهاء (أو `null` بلا انتهاء).

   ── حدٌّ صريحٌ لا يُتجاوَز ──
   هذا **حاجزُ شراءٍ لا حمايةٌ أمنية**. أيُّ قفلٍ في موقعٍ ثابتٍ يمكنُ تجاوزُه من
   أدواتِ المطوّر، وأيُّ رمزٍ يمكنُ مشاركتُه. **لا يُبنى تعقيدٌ إضافيٌّ لمنعِ ذلك** —
   لا تشويشَ على الكود، ولا ربطَ بالجهاز، ولا كشفَ لأدواتِ المطوّر.

   ── توليدُ الرموز ──
   `npm run codes -- --count 30 --scope g4-sci --exp 2026-12-31`
   يكتبُ البصماتِ في `data/codes.json` (تُدفَع) والرموزَ الصريحةَ في
   `codes-private.csv` (محلّيٌّ — في `.gitignore`، لا يُدفَعُ أبداً).

   ⚠️ **قيمةُ `SALT` تُثبَّتُ مرّةً واحدة**، وهي هنا وفي `generate-codes.cjs` معاً.
   **تغييرُها يُبطِلُ كلَّ الرموزِ الصادرةِ من قبل** — لا تُغيَّرْ إلا بقرارٍ صريحٍ
   من المالكِ وبعدَ تنبيهِه.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SALT = 'shoogp::2026';        // ⚠️ يجب أن يطابق SALT في generate-codes.cjs
  var STORE_KEY = 'shoogp-unlocked';
  var CODES_URL = 'data/codes.json';
  var FREE_UNITS = 1;               // عدد الوحدات المجانية في رأس كل كتاب
  var SEP = '#';                    // فاصل نطاق الوحدة (لا '-' — المفاتيح تحوي شرطات)

  /* ───────────────────────── أدوات صغيرة ───────────────────────── */

  function normalize(s) {
    return String(s == null ? '' : s).trim().toUpperCase().replace(/[\s\-_]/g, '');
  }

  // تاريخ اليوم ISO بالتوقيت المحلّي (لا UTC — المعلّمة تقرأ تقويمها لا تقويم غرينتش)
  function todayISO() {
    var d = new Date();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  // exp شامل: الرمز صالح في يوم انتهائه نفسه، ومنتهٍ في اليوم التالي
  function isExpired(exp) {
    return !!exp && String(exp) < todayISO();
  }

  /* ── التخزين المحلّي — لا ينهار في التصفّح الخاص ──
     كل نداء محاط بـtry: قراءةٌ فاشلة ⇒ لا مفاتيح مفتوحة (الوحدة الأولى تبقى
     مجانية فيبقى الموقع صالحاً للاستعمال)، وكتابةٌ فاشلة ⇒ نُخبر المعلّمة. */
  function readStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return {};
      var o = JSON.parse(raw);
      return (o && typeof o === 'object') ? o : {};
    } catch (e) { return {}; }
  }

  function writeStore(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); return true; }
    catch (e) { return false; }
  }

  /* المنَحُ الصالحةُ الآن: تُسقِطُ المنتهيةَ عند كل قراءة (لا عند الفتح فقط)،
     وتكتبُ الخريطةَ المنقّاةَ إن تغيّرت فلا تتراكم أسطرٌ ميتة. */
  function grants() {
    var raw = readStore(), out = {}, dirty = false;
    Object.keys(raw).forEach(function (scope) {
      var exp = raw[scope];
      if (isExpired(exp)) { dirty = true; return; }
      out[scope] = exp || null;
    });
    if (dirty) writeStore(out);
    return out;
  }

  /* ───────────────────── حالة القفل (بلا شبكة) ───────────────────── */

  // نطاق الوحدة بترقيم العرض (١-based) — الوحدة الأولى ui=0 ⇒ '…#1'
  function unitScope(bookKey, unitIndex) {
    return bookKey + SEP + (unitIndex + 1);
  }

  function isUnitLocked(bookKey, unitIndex) {
    if (!bookKey) return false;
    if (unitIndex < FREE_UNITS) return false;          // القاعدة: الأولى مجانية دائماً
    var g = grants();
    if (Object.prototype.hasOwnProperty.call(g, bookKey)) return false;              // رمز كتاب
    if (Object.prototype.hasOwnProperty.call(g, unitScope(bookKey, unitIndex))) return false; // رمز وحدة
    return true;
  }

  /* حارسُ الدرس: يمنعُ فتحَ درسٍ في وحدةٍ مقفلة مهما كان مدخلُه (نقرٌ أو نداءٌ
     برمجيّ أو رابطٌ مباشرٌ إن أُضيف لاحقاً). هويةُ الكتابِ تأتي **وسيطاً** من
     `currentBook` — لا تُشتَقُّ هنا من اسمِ ملفِّ الدرس. */
  function guardLesson(bookKey, lesson, indexData) {
    var idx = bookKey && indexData && indexData[bookKey];
    if (!idx || !idx.units || !lesson) return false;
    for (var i = 0; i < idx.units.length; i++) {
      var lessons = idx.units[i].lessons || [];
      for (var j = 0; j < lessons.length; j++) {
        if (lessons[j].file === lesson.file) {
          if (isUnitLocked(bookKey, i)) { ask(bookKey, i, idx.units[i].unit); return true; }
          return false;   // وُجد الدرس ووحدتُه مفتوحة
        }
      }
    }
    return false;         // درسٌ خارجَ الفهرس — لا يُحجَب
  }

  /* ───────────────────── التحقّق من رمزٍ مُدخَل ───────────────────── */

  function sha256hex(text) {
    var subtle = window.crypto && window.crypto.subtle;
    if (!subtle) return Promise.reject(new Error('no-subtle'));
    var bytes = new TextEncoder().encode(text);
    return subtle.digest('SHA-256', bytes).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    });
  }

  // {ok:true, scope, exp} | {ok:false, reason:'empty'|'bad'|'expired'|'net'|'store'}
  function redeem(input) {
    var code = normalize(input);
    if (!code) return Promise.resolve({ ok: false, reason: 'empty' });

    return sha256hex(SALT + code)
      .then(function (digest) {
        return fetch(CODES_URL, { cache: 'no-store' })
          .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
          .then(function (codes) { return { digest: digest, codes: codes }; });
      })
      .then(function (res) {
        var entry = res.codes && res.codes[res.digest];
        if (!entry) return { ok: false, reason: 'bad' };

        // الصيغتان: نصٌّ مجرّد (بلا انتهاء) أو كائن {scope, exp}
        var scope = (typeof entry === 'string') ? entry : entry.scope;
        var exp = (typeof entry === 'string') ? null : (entry.exp || null);
        if (!scope) return { ok: false, reason: 'bad' };
        if (isExpired(exp)) return { ok: false, reason: 'expired' };

        var g = grants();
        g[scope] = exp;
        if (!writeStore(g)) return { ok: false, reason: 'store' };
        return { ok: true, scope: scope, exp: exp };
      })
      .catch(function () { return { ok: false, reason: 'net' }; });
  }

  /* ───────────────────────── نافذة الإدخال ───────────────────────── */

  var MSG = {
    empty:   'أدخلي رمز الفتح أولاً.',
    bad:     'هذا الرمز غير صحيح. تأكّدي من كتابته كما وصلكِ.',
    expired: 'انتهت صلاحية هذا الرمز. الرموز تُباع بالفصل الدراسي.',
    net:     'تعذّر الاتصال للتحقّق من الرمز. تأكّدي من الإنترنت وأعيدي المحاولة.',
    store:   'متصفّحكِ يمنع الحفظ (تصفّح خاص؟). جرّبي نافذة عادية.',
    ok:      '🎉 تمّ الفتح! جارٍ تحديث الصفحة…'
  };

  var box = null, elInput, elMsg, elGo, elTitle, elSub, elBand, lastFocus = null;

  function build() {
    if (box) return box;

    box = document.createElement('div');
    box.className = 'lockwrap';
    box.setAttribute('hidden', '');
    box.innerHTML =
      '<div class="lockback" data-close="1"></div>' +
      '<div class="lockbox" role="dialog" aria-modal="true" aria-labelledby="lockTitle">' +
        '<div class="lockband"></div>' +
        '<button type="button" class="lockclose" data-close="1" aria-label="إغلاق">✕</button>' +
        '<div class="lockicon" aria-hidden="true">🔒</div>' +
        '<h2 class="locktitle" id="lockTitle">هذه الوحدة مقفلة</h2>' +
        '<p class="locksub"></p>' +
        '<label class="locklabel" for="lockInput">أدخلي رمز الفتح</label>' +
        '<input class="lockinput" id="lockInput" type="text" autocomplete="off"' +
              ' spellcheck="false" autocapitalize="characters" dir="ltr" placeholder="XXXXX-XXXXX">' +
        '<p class="lockmsg" role="status" aria-live="polite"></p>' +
        '<button type="button" class="lockgo">فتح الوحدة</button>' +
      '</div>';

    document.body.appendChild(box);
    elBand  = box.querySelector('.lockband');
    elTitle = box.querySelector('.locktitle');
    elSub   = box.querySelector('.locksub');
    elInput = box.querySelector('.lockinput');
    elMsg   = box.querySelector('.lockmsg');
    elGo    = box.querySelector('.lockgo');

    box.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) close();
    });
    elGo.addEventListener('click', submit);
    elInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
    });
    elInput.addEventListener('input', function () { say('', ''); });

    // Esc للإغلاق + حبسُ التركيزِ داخلَ النافذة
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = box.querySelectorAll('.lockclose, .lockinput, .lockgo');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    return box;
  }

  function say(text, kind) {
    elMsg.textContent = text || '';
    elMsg.className = 'lockmsg' + (kind ? ' ' + kind : '');
  }

  var pending = null;   // {bookKey, unitIndex}

  function ask(bookKey, unitIndex, unitTitle) {
    build();
    pending = { bookKey: bookKey, unitIndex: unitIndex };

    // لونُ الكتابِ حيث يصحّ: شريطٌ علويٌّ بصنفِ بطاقةِ الكتابِ الحالي
    elBand.className = 'lockband' + (window.currentBookColor ? ' ' + window.currentBookColor : '');
    // الأرقامُ الهنديةُ وجوباً (قاعدةُ المنصّة) — `arNum` من `js/app.js`، وبديلٌ محلّيٌّ إن غاب
    var num = (typeof window.arNum === 'function')
      ? window.arNum(unitIndex + 1)
      : String(unitIndex + 1).replace(/[0-9]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[+d]; });
    elTitle.textContent = 'الوحدة ' + num + ' مقفلة';
    elSub.textContent = unitTitle
      ? unitTitle + ' — افتحيها برمزٍ لتظهر دروسها.'
      : 'افتحيها برمزٍ لتظهر دروسها.';
    elInput.value = '';
    say('', '');
    elGo.disabled = false;

    lastFocus = document.activeElement;
    box.removeAttribute('hidden');
    document.body.classList.add('lock-open');
    // التركيزُ بعدَ الرسمِ كي لا تُلغيه حركةُ الظهور
    requestAnimationFrame(function () { elInput.focus(); });
  }

  function close() {
    if (!box || box.hasAttribute('hidden')) return;
    box.setAttribute('hidden', '');
    document.body.classList.remove('lock-open');
    pending = null;
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    lastFocus = null;
  }

  function submit() {
    if (elGo.disabled) return;
    elGo.disabled = true;
    say('جارٍ التحقّق…', '');

    redeem(elInput.value).then(function (res) {
      if (res.ok) {
        say(MSG.ok, 'good');
        // إعادةُ التحميلِ أبسطُ من إعادةِ بناءِ القائمةِ يدوياً، وتضمنُ اتّساقَ كلِّ شيء
        setTimeout(function () { location.reload(); }, 900);
        return;
      }
      elGo.disabled = false;
      say(MSG[res.reason] || MSG.bad, 'bad');
      elInput.focus();
      elInput.select();
    });
  }

  /* ───────────────────────────── الواجهة ───────────────────────────── */
  window.ShoogpLock = {
    isUnitLocked: isUnitLocked,
    guardLesson:  guardLesson,
    unitScope:    unitScope,
    ask:          ask,
    close:        close,
    normalize:    normalize,
    FREE_UNITS:   FREE_UNITS
  };
})();
