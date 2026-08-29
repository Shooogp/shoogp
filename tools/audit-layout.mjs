/* ═══════════════════════════════════════════════════════════════════
   فحصُ تخطيطِ الأسئلةِ على البنكِ كاملاً — خروجٌ من الحاويةِ وتداخلُ عناصر
   ───────────────────────────────────────────────────────────────────
   الاستعمال:   node tools/audit-layout.mjs [مرشِّحُ الكتاب] [ملفُّ الخرج]
   مثال:        node tools/audit-layout.mjs -sci
                node tools/audit-layout.mjs g2-math /tmp/math.json

   ⚠️ أداةُ تطويرٍ لا تُحمَّلُ في المنصّة.

   ═══ ما يُقاس، ولكلِّ سؤالٍ مرّتَين: فارغاً وممتلئاً بالإجاباتِ الصحيحة ═══
   ‏`CLAUDE.md` ينصُّ أنّ الخريطةَ الذهنيةَ **تعلو حينَ تمتلئُ خاناتُها**،
   فالحالةُ الفارغةُ لا تكفي حَكَماً — ولذلك يُملأُ السؤالُ ثمّ يُعادُ القياس.

   ⛔ **قصّ**   — تجاوزُ صندوقِ القصِّ الحقيقيّ (‏`hOverflow(w).bad`).
   ⚠️ **تنفّس** — تجاوزُ حافّةِ محتوى `.qwin` بلا قصّ (‏`.warn`).
   ⚠️ **رأسيّ** — تجاوزُ حافّةِ النافذةِ عُلواً أو سُفلاً، **لعناصرِ المحتوى وحدَها**:
      العنصرُ الفارغُ (شريطُ التغذيةِ الراجعةِ قبلَ الإجابة) يحجزُ مساحةً بلا
      محتوىً يُقَصّ، فاحتسابُه يُغرِقُ التقريرَ بضجيجٍ لا عيبَ تحتَه.
   ⚠️ **تداخل** — تقاطعُ صندوقَي عنصرَي محتوى. **وثلاثةٌ تُستثنى لأنّ تراكبَها
      مقصودٌ بالتصميم**: ما `pointer-events:none` (خطوطُ التوصيل)، والمطلقُ
      الموضعِ (وجهُ بطاقةِ الذاكرةِ فوقَ ظهرِها · أهدافُ السحب)، والسطريُّ
      (‏`display:inline` يلتفُّ فتتقاطعُ صناديقُه بلا تداخلٍ بصريّ).
   • **مرنة**  — سقوطُ السؤالِ إلى `qflex` (علّةُ الواجهةِ الموثّقةُ في `CLAUDE.md`).
   ═══════════════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import { openPlatform, outPath } from './audit-lib.mjs';

const FILTER = process.argv[2] || '';
const OUT    = process.argv[3] || outPath('layout.json');

const { page, pageErrors, close } = await openPlatform();

await page.evaluate(() => {
  // ── geometry helpers ───────────────────────────────────────────────
  function vis(el) {
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0.5 && r.height > 0.5;
  }
  function tag(el) {
    if (!el) return '—';
    var c = el.className;
    c = (c && c.baseVal === undefined) ? '.' + String(c).trim().split(/\s+/).join('.') : '';
    return el.tagName.toLowerCase() + c;
  }
  function txt(el) { return (el.textContent || '').trim().slice(0, 40); }

  // does the element itself carry visible content (direct text / media)?
  function isContent(el) {
    var t = el.tagName.toLowerCase();
    if (t === 'img' || t === 'svg' || t === 'canvas' || t === 'video' || t === 'input') return true;
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    }
    return false;
  }
  function contentLeaves(w) {
    var out = [], all = w.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
      if (!vis(el)) continue;
      if (!isContent(el)) continue;
      out.push(el);
    }
    return out;
  }

  /* حدودُ القصِّ الرأسيِّ التي يخضعُ لها العنصر — أقربُ سلفٍ يقصُّ عمودياً،
     زائداً هامشَ قصِّه (‏`.qbody` يقصُّ بهامشِ 20px، فاحتسابُه بلا الهامشِ
     يُبلِّغُ بتراً لا يقع). نظيرُ `clipBoundsOf` الأفقيِّ في `shoogp-ui.js`. */
  function vClipBounds(el, stop) {
    var T = -Infinity, B = Infinity, p = el.parentElement;
    while (p) {
      var cs = getComputedStyle(p);
      if (cs.overflowY === 'hidden' || cs.overflowY === 'clip') {
        var r = p.getBoundingClientRect();
        var m = cs.overflowY === 'clip' ? (parseFloat(cs.overflowClipMargin) || 0) : 0;
        T = Math.max(T, r.top + (parseFloat(cs.borderTopWidth) || 0) - m);
        B = Math.min(B, r.bottom - (parseFloat(cs.borderBottomWidth) || 0) + m);
      }
      if (p === stop) break;
      p = p.parentElement;
    }
    return (T === -Infinity && B === Infinity) ? null : { T: T, B: B };
  }

  // vertical overflow past the window's content box (content-bearing elements only)
  function vOverflow(w) {
    var cs = getComputedStyle(w), r = w.getBoundingClientRect();
    var T = r.top + (parseFloat(cs.paddingTop) || 0), B = r.bottom - (parseFloat(cs.paddingBottom) || 0);
    var out = 0, who = null, any = 0, anyWho = null, vcut = 0, vcutWho = null;
    var all = w.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
      var ecs = getComputedStyle(el);
      if (ecs.display === 'none' || ecs.position === 'fixed') continue;
      var br = el.getBoundingClientRect();
      if (!br.width || !br.height) continue;
      var o = Math.max(T - br.top, br.bottom - B);
      if (o > any) { any = o; anyWho = el; }
      var cb = vClipBounds(el, w);
      if (cb) { var k = Math.max(cb.T - br.top, br.bottom - cb.B);
                if (k > vcut) { vcut = k; vcutWho = el; } }
      if (!isContent(el)) continue;
      if (o > out) { out = o; who = el; }
    }
    return { out: +out.toFixed(1), who: tag(who), text: who ? txt(who) : '',
             any: +any.toFixed(1), anyWho: tag(anyWho),
             vcut: +vcut.toFixed(1), vcutWho: tag(vcutWho) };
  }

  // element-collision among visible content leaves
  function collisions(w) {
    var wr = w.getBoundingClientRect(), wa = wr.width * wr.height;
    var leaves = contentLeaves(w).filter(function (e) {
      var r = e.getBoundingClientRect();
      if (r.width <= 4 || r.height <= 4) return false;
      var cs = getComputedStyle(e);
      /* طبقاتٌ فوقيّةٌ مقصودة: خطوطُ التوصيل، وجهُ بطاقةِ الذاكرة، أهدافُ السحب */
      if (cs.pointerEvents === 'none') return false;
      if (cs.position === 'absolute' || cs.position === 'sticky') return false;
      /* العناصرُ السطريّةُ تلتفُّ فتتقاطعُ صناديقُها بلا تداخلٍ بصريّ */
      if (cs.display === 'inline') return false;
      /* غطاءٌ يكادُ يملأُ النافذة = طبقةٌ لا عنصرُ محتوى */
      if (r.width * r.height > 0.7 * wa) return false;
      return true;
    });
    var hits = [];
    for (var a = 0; a < leaves.length; a++) for (var b = a + 1; b < leaves.length; b++) {
      var A = leaves[a], B = leaves[b];
      if (A.contains(B) || B.contains(A)) continue;
      var ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
      var ix = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
      var iy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (ix > 1.5 && iy > 1.5) {
        var area = ix * iy, small = Math.min(ra.width * ra.height, rb.width * rb.height);
        var pct = 100 * area / small;
        if (pct > 10) hits.push({ a: tag(A), at: txt(A), b: tag(B), bt: txt(B), pct: +pct.toFixed(0) });
      }
    }
    hits.sort(function (x, y) { return y.pct - x.pct; });
    return hits.slice(0, 5);
  }

  /* ملءُ السؤالِ بالإجاباتِ الصحيحة — الخريطةُ الذهنيةُ والتصنيفُ يعلوانِ عند الامتلاء
     (تحذيرُ `CLAUDE.md`: الحالةُ الفارغةُ لا تكفي حَكَماً) */
  window.__fill = function (card, q) {
    var body = card.querySelector('.qbody'); if (!body) return false;
    try {
      if (q.type === 'mindmap') {
        var slots = [].slice.call(body.querySelectorAll('.mm-slot'));
        var chips = [].slice.call(body.querySelectorAll('.mmchip'));
        if (!slots.length) return false;
        slots.forEach(function (s) {
          var c = chips.filter(function (x) { return x.dataset.w === s.dataset.answer; })[0];
          if (c) s.appendChild(c);
        });
        return true;
      }
      if (q.type === 'classify') {
        var map = {}; q.groups.forEach(function (g, gi) { g.items.forEach(function (it) { map[it] = gi; }); });
        var cs = [].slice.call(body.querySelectorAll('.chip'));
        if (!cs.length) return false;
        cs.forEach(function (c) {
          var z = body.querySelector('.grp-drop[data-i="' + map[c.dataset.w] + '"]');
          if (z) z.appendChild(c);
        });
        return true;
      }
      if (q.type === 'fill-blank') {
        var bl = [].slice.call(body.querySelectorAll('.blank'));
        if (!bl.length) return false;
        bl.forEach(function (s) { s.dataset.placed = s.dataset.answer; s.textContent = s.dataset.answer; });
        return true;
      }
      if (q.type === 'drag-drop') {
        var tg = [].slice.call(body.querySelectorAll('.target'));
        if (!tg.length) return false;
        tg.forEach(function (t) { t.textContent = t.dataset.answer; });
        return true;
      }
    } catch (e) {}
    return false;
  };

  /* اقتطاعُ الصورةِ في المشهد — و**لماذا يُقاسُ بالنسبةِ المئويةِ من الصورةِ نفسِها**:
     `.figwrap.fw` عرضُه ١٠٠٪ وارتفاعُه تلقائيّ، فإن كانت نسبةُ الصورةِ أطولَ من
     المشهدِ فاضَ الفائضُ و`.stage` يقصُّه بـ`overflow:hidden` أعلى وأسفل.
     ⚠️ والأثرُ ليس بصرياً فحسب: `hitsSpot` يقيسُ النقرةَ على **صندوقِ الصورةِ
     كاملاً** (‏`fig.getBoundingClientRect()`)، بينما `overflow:hidden` يقصُّ
     الإصابةَ كما يقصُّ الطلاء — فمنطقةُ إجابةٍ تقعُ في الشريطِ المقصوصِ
     **لا تُدرَكُ نقرتُها أصلاً**. ولذلك يُبلَّغُ الشريطُ بالنسبةِ ليُقارَنَ
     بإحداثيّاتِ `spot` و`dot` في `js/questions.js`. */
  function figCrop(card) {
    var fig = card.querySelector('.hsfig, .labelimg, .csvg');
    if (!fig) return null;
    var st = fig.closest('.stage');
    if (!st) return null;
    var scs = getComputedStyle(st);
    if (scs.overflowY !== 'hidden' && scs.overflowY !== 'clip') return null;
    var fr = fig.getBoundingClientRect(), sr = st.getBoundingClientRect();
    if (!fr.height) return null;
    var top = Math.max(0, sr.top - fr.top), bot = Math.max(0, fr.bottom - sr.bottom);
    if (top < 1 && bot < 1) return null;
    return { top: +(100 * top / fr.height).toFixed(1), bot: +(100 * bot / fr.height).toFixed(1) };
  }

  window.__measureCard = function (card) {
    var w = card.querySelector('.qwin');
    if (!w) return { noWin: true };
    var h = hOverflow(w);
    var v = vOverflow(w);
    var f = card.querySelector('.qframe');
    return {
      fit: card.dataset.fit || '?',
      frameCls: f ? f.className : '',
      cut: h.cut, selfCut: h.selfCut, who: h.cut > 1 ? h.cutSel : h.selfSel,
      out: h.out, outWho: h.outSel,
      vOut: v.out, vWho: v.who, vText: v.text, vAny: v.any, vAnyWho: v.anyWho,
      vCut: v.vcut, vCutWho: v.vcutWho,
      hits: collisions(w),
      crop: figCrop(card),
      winW: w.clientWidth, winH: w.clientHeight
    };
  };
});

const list = await page.evaluate(f => window.__jobs(f), FILTER);
const results = [];

for (const j of list) {
  if (!await page.evaluate(job => window.__openLesson(job), j)) {
    results.push({ ...j, error: 'lesson-not-found' });
    continue;
  }
  const n = await page.evaluate(() => document.querySelectorAll('.qcard').length);
  for (let k = 0; k < n; k++) {
    /* التنقّلُ بزرِّ «التالي» نفسِه — لا بإخفاءِ البطاقاتِ يدوياً، فالتطبيقُ
       يتكفّلُ بالعرضِ وتبنّي أزرارِ «تحقّق» في شريطِ التنقّل، وهو ما يراه المعلّم */
    const m = await page.evaluate(async k => {
      if (k > 0) {
        const nx = document.querySelector('.qnav .qnext');
        if (nx && nx.style.display !== 'none') nx.click();
      }
      const c = [...document.querySelectorAll('.qcard')][k];
      await window.__settle(c);
      return window.__measureCard(c);
    }, k);

    /* الحالةُ الممتلئة — تُقاسُ فقط للأنواعِ التي تعلو بالإجابات */
    const filled = await page.evaluate(async ({ f, k }) => {
      const c = [...document.querySelectorAll('.qcard')][k];
      const qq = (QUESTIONS[f] || [])[k];
      if (!qq || !window.__fill(c, qq)) return null;
      await window.__settle(c);
      const m = window.__measureCard(c);
      return { fFit: m.fit, fCut: m.cut, fSelfCut: m.selfCut, fWho: m.who,
               fOut: m.out, fOutWho: m.outWho, fVOut: m.vOut, fVWho: m.vWho,
               fVCut: m.vCut, fVCutWho: m.vCutWho, fHits: m.hits };
    }, { f: j.file, k });

    const q = await page.evaluate(({ f, k }) => {
      const qq = (QUESTIONS[f] || [])[k] || {};
      return { type: qq.type || '?', level: qq.level || null };
    }, { f: j.file, k });

    results.push({ ...j, n: k + 1, id: `${j.file}[${k + 1}]`, ...q, ...m, ...(filled || {}) });
  }
  await page.evaluate(() => window.__unseed());
}

fs.writeFileSync(OUT, JSON.stringify({ pageErrors, results }, null, 1));

/* التكبيرُ يضاعفُ البكسل، فالمقارنةُ بالبكسلِ الحقيقيِّ قبلَه لا بعدَه */
const zoom = r => { const m = /@(\d+)%/.exec(r.fit || ''); return m ? +m[1] / 100 : 1; };
const cut  = results.filter(r => r.cut > 1 || r.selfCut > 1 || r.fCut > 1 || r.fSelfCut > 1);
const vcut = results.filter(r => (r.vCut || 0) > 1 || (r.fVCut || 0) > 1);
const flex = results.filter(r => /flex/.test(r.fit) || /flex/.test(r.fFit || ''));
const hits = results.filter(r => (r.hits || []).length || (r.fHits || []).length);
const vert = results.filter(r => Math.max(r.vOut || 0, r.fVOut || 0) / zoom(r) > 3);

console.log(`دروس: ${list.length} · أسئلة: ${results.length} → ${OUT}`);
console.log(`⛔ قصٌّ أفقيّ: ${cut.length} · ⛔ قصٌّ رأسيّ: ${vcut.length} · مرنة: ${flex.length} · تداخل: ${hits.length} · ⚠️ تنفّسٌ رأسيّ: ${vert.length} · أخطاءُ JS: ${pageErrors.length}`);
[['⛔ قصٌّ أفقيّ', cut], ['⛔ قصٌّ رأسيّ', vcut], ['مرنة', flex], ['تداخل', hits], ['⚠️ تنفّسٌ رأسيّ', vert]].forEach(([label, arr]) =>
  arr.slice(0, 20).forEach(r => console.log(`   ${label}  ${r.id}  ${r.type}  ${r.fit}`)));

await close();
