/* ═══════════════════════════════════════════════════════════════════
   فحصُ الفيضِ الأفقيِّ على البنكِ كاملاً — **ببذرةٍ ثابتة، فيتكرّرُ حرفياً**
   ───────────────────────────────────────────────────────────────────
   الاستعمال (طرفيةُ المتصفّح، والموقعُ مفتوح):
       await (await fetch('/tools/audit-hoverflow.js')).text().then(eval)
       await ShoogpAudit.run()          // تشغيلةٌ واحدة
       await ShoogpAudit.twice()        // تشغيلتانِ + إثباتُ التطابق

   ═══ لماذا لم يكن الفحصُ قابلاً للتكرار ═══
   `shuffle` في `js/app.js` يخلطُ خياراتِ كلِّ سؤالٍ بـ`Math.random()` **عندَ كلِّ بناء**،
   فيتغيّرُ أطولُ عنصرٍ في العمودِ وأطولُ التفافٍ ⇒ يتغيّرُ ارتفاعُ المحتوى ⇒ **يتغيّرُ
   الإطارُ المختار**. مقيسٌ قبلَ العلاج: تشغيلتانِ بالشيفرةِ نفسِها تختلفانِ في **١٧ سؤالاً**،
   منها تبادلا `l`↔`tall` بـ±٥٥٪. فأيُّ مقارنةِ «قبل/بعد» كانت تقرأُ الضجيجَ أثراً.

   ═══ وثلاثةُ مصادرَ للاحتمية لا مصدرٌ واحد — وتثبيتُ الخلطِ وحدَه لا يكفي ═══
   ① **الخلط** — يُثبَّتُ ببذرةٍ مشتقّةٍ من **اسمِ ملفِّ الدرس**، فتُعادُ البذرةُ قبلَ بناءِ
      كلِّ درس. ولذلك **لا يتأثّرُ الدرسُ بترتيبِ الدروسِ قبلَه**: فحصُ درسٍ منفرداً يُعطي
      نتيجةَ فحصِه ضمنَ البنك. (لو بُذِرَت مرّةً واحدةً في البدايةِ لَتسلسلَ المولّدُ عبرَ
      الدروسِ فارتبطَ كلُّ درسٍ بما سبقَه.)
   ② **الخطوط** — القياسُ قبلَ جهوزِ `Tajawal` يُعطي عرضَ نصٍّ مختلفاً (خطُّ احتياطيّ)،
      فيُنتَظَرُ `document.fonts.ready`.
   ③ **قياسُ صورِ الإطارات** — `measureFrameGeo` غيرُ متزامن، و`reconcileAR` **يصحّحُ نسبةَ
      الإطارِ المعلنةَ** إن خالفت أبعادَ الملفّ ⇒ يغيّرُ الاختيارَ نفسَه. فتُنتظَرُ جهوزيةُ
      قياسِ **كلِّ** صورِ العائلاتِ قبلَ أوّلِ سؤال.
   و`Math.random` يُستعادُ في `finally` مهما وقع.

   ═══ ما يُبلَّغ ═══
   بدرجتَي `hOverflow` نفسِهما (مصدرٌ واحدٌ للحقيقة، لا نسخةٌ ثانيةٌ من المنطق):
     ⛔ **قصّ** — تجاوزُ صندوقِ القصِّ الحقيقيّ (‏`overflow-x ≠ visible` + هامشُ قصِّه).
     ⚠️ **أكلٌ من التنفّس** — تجاوزُ حافّةِ محتوى `.qwin` بلا قصّ.
   وتُذكَرُ الأسئلةُ التي سقطت إلى الحاويةِ المرنة.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* مولّدٌ حتميّ (mulberry32) — لا يعتمدُ على شيءٍ خارجَ بذرتِه */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* بذرةٌ من اسمِ الدرس (FNV-1a) — فيستقلُّ كلُّ درسٍ عمّا قبلَه */
  function seedOf(name) {
    var h = 0x811c9dc5;
    for (var i = 0; i < name.length; i++) {
      h ^= name.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ③ جهوزيةُ قياسِ كلِّ صورِ الإطارات (وإلا صحّحَ reconcileAR نسبةً في منتصفِ المسح) */
  function framesReady() {
    var names = [];
    Object.keys(FRAME_FAMILIES).forEach(function (fam) {
      var sizes = FRAME_FAMILIES[fam].sizes;
      Object.keys(sizes).forEach(function (k) {
        if (names.indexOf(sizes[k].img) < 0) names.push(sizes[k].img);
      });
    });
    names.forEach(function (n) { measureFrameGeo(n); });
    return new Promise(function (resolve) {
      var tries = 0;
      (function poll() {
        var pending = names.filter(function (n) { return _frameGeo[n] === 'pending' || _frameGeo[n] === undefined; });
        if (!pending.length || ++tries > 200) return resolve({ total: names.length, pending: pending.length });
        setTimeout(poll, 50);
      })();
    });
  }

  function jobs() {
    var out = [];
    for (var term in DATA.terms) for (var grade in DATA.terms[term])
      DATA.terms[term][grade].forEach(function (b) {
        var idx = DATA.index[b.key]; if (!idx) return;
        idx.units.forEach(function (u) {
          u.lessons.forEach(function (l) {
            if (((window.QUESTIONS && QUESTIONS[l.file]) || []).length)
              out.push({ term: term, grade: grade, book: b.key, file: l.file });
          });
        });
      });
    return out;
  }

  /* `opts.seed:false` يُعطّلُ البذرةَ **ولا يُعطّلُ الانتظارَين** — وهو الضابطُ الذي يفصلُ
     أثرَ البذرةِ عن أثرِ جهوزيةِ الخطوطِ وقياسِ الإطارات. ⚠️ ولا يصحُّ تعطيلُها من خارجِ
     الوحدةِ بإعادةِ تعريفِ `ShoogpAudit.mulberry32`: `run` يُغلِقُ على الدالّةِ المحليةِ
     معجمياً فلا يراها، فيخرجُ «ضابطٌ» مبذورٌ في الحقيقةِ يُثبتُ نقيضَ ما يُظَنُّ به. */
  async function run(opts) {
    opts = opts || {};
    var seeded = opts.seed !== false;
    var realRandom = Math.random;
    var res = {
      lessons: 0, questions: 0, books: {},
      cut: [], breath: [], flex: [], fits: {},
      viewport: [innerWidth, innerHeight]
    };
    try {
      await document.fonts.ready;                      /* ② */
      res.frames = await framesReady();                /* ③ */

      var list = jobs(), curT = null, curG = null;
      for (var i = 0; i < list.length; i++) {
        var j = list[i];
        if (j.term !== curT || j.grade !== curG) {
          [].slice.call(document.querySelectorAll('#terms .term-btn'))
            .filter(function (e) { return e.textContent.indexOf(j.term) >= 0; })[0].click();
          [].slice.call(document.querySelectorAll('#grades .grade'))
            .filter(function (e) { return e.textContent.indexOf(j.grade) >= 0; })[0].click();
          curT = j.term; curG = j.grade; await sleep(20);
        }
        document.getElementById('books').children[
          DATA.terms[j.term][j.grade].findIndex(function (b) { return b.key === j.book; })].click();

        var ls = null;
        DATA.index[j.book].units.forEach(function (u) {
          u.lessons.forEach(function (l) { if (l.file === j.file) ls = l; });
        });

        if (seeded) Math.random = mulberry32(seedOf(j.file));   /* ① قبلَ البناءِ مباشرةً */
        openLesson(ls);
        frameize();

        var cards = [].slice.call(document.querySelectorAll('.qcard'));
        var qs = QUESTIONS[j.file];
        cards.forEach(function (c, k) {
          cards.forEach(function (x, m) { x.style.display = (m === k) ? '' : 'none'; });
          c.dataset.fitSig = '';
          fitFrame(c);
          var w = c.querySelector('.qwin'); if (!w) return;
          var h = hOverflow(w);
          res.questions++;
          res.books[j.book] = (res.books[j.book] || 0) + 1;
          var id = j.file + '[' + (k + 1) + ']';
          var ty = (qs[k] && qs[k].type) || '?';
          var fit = c.dataset.fit || '?';
          res.fits[id] = fit;
          if (fit === 'flex') res.flex.push(id + ' ' + ty);
          if (h.bad) res.cut.push({ q: id, type: ty, fit: fit, cut: h.cut, selfCut: h.selfCut,
                                    who: h.cut > 1 ? h.cutSel : h.selfSel, win: w.clientWidth });
          else if (h.warn) res.breath.push({ q: id, type: ty, fit: fit, out: h.out, who: h.outSel });
        });
        res.lessons++;
        if (res.lessons % 8 === 0) await sleep(0);
      }
    } finally {
      Math.random = realRandom;                        /* يُستعادُ مهما وقع */
    }
    return res;
  }

  /* تشغيلتانِ متتاليتانِ + إثباتُ التطابقِ الحرفيّ */
  async function twice(opts) {
    var a = await run(opts), b = await run(opts);
    var keys = Object.keys(a.fits);
    var diff = keys.filter(function (k) { return a.fits[k] !== b.fits[k]; });
    var sig = function (r) {
      return JSON.stringify([r.cut, r.breath, r.flex]);
    };
    return {
      أسئلة: a.questions, دروس: a.lessons, كتب: Object.keys(a.books).length,
      'إطاراتٌ مختلفة': diff.length,
      'أمثلةُ الاختلاف': diff.slice(0, 8).map(function (k) {
        return { q: k, ['١']: a.fits[k], ['٢']: b.fits[k] };
      }),
      'تطابقُ التقارير': sig(a) === sig(b),
      'قصّ ⛔': a.cut, 'تنفّس ⚠️': a.breath, 'مرنة': a.flex,
      متطابقتان: diff.length === 0 && sig(a) === sig(b)
    };
  }

  window.ShoogpAudit = { run: run, twice: twice, seedOf: seedOf, mulberry32: mulberry32 };
  return 'ShoogpAudit جاهز — ShoogpAudit.twice()';
})()
