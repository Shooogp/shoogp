/* ═══════════════════════════════════════════════════════════════════
   أساسُ أدواتِ الفحصِ الآليّ — ما تشترك فيه `audit-layout` و`audit-answers`
   و`audit-rules` و`audit-shot`: إقلاعُ المتصفّح، وخادمٌ ساكنٌ مؤقّت، وفكُّ
   القفل، وبذرةٌ ثابتةٌ للخلط، وانتظارُ جهوزيةِ الخطوطِ وقياسِ الإطارات.
   ───────────────────────────────────────────────────────────────────
   ⚠️ **أداةُ تطويرٍ لا تُحمَّلُ في المنصّة** — لا تُذكَرُ في `index.html`
   ولا يعتمدُ عليها كودُ الموقعِ إطلاقاً. اعتمادُها `playwright` في
   `devDependencies` وحدَها.

   الاحتميّةُ ثلاثيّةُ المصدرِ كما في `audit-hoverflow.js` وبعلّتِها نفسِها،
   ولا يُكرَّرُ شرحُها هنا: ① بذرةٌ من اسمِ الدرس ② `document.fonts.ready`
   ③ جهوزيةُ قياسِ **كلِّ** صورِ الإطاراتِ قبلَ أوّلِ سؤال.
   ═══════════════════════════════════════════════════════════════════ */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

/* متصفّحُ البيئة: `PW_CHROME` إن ضُبِط، وإلا أوّلُ نسخةِ Chromium في مخزنِ playwright،
   وإلا تنفيذيّةُ playwright المدمجة (فتفشلُ برسالتِها هي لا برسالةٍ مبهمة). */
function chromePath() {
  if (process.env.PW_CHROME) return process.env.PW_CHROME;
  const store = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  try {
    const dir = fs.readdirSync(store).filter(d => /^chromium-\d+$/.test(d)).sort().pop();
    if (dir) {
      const exe = path.join(store, dir, 'chrome-linux', 'chrome');
      if (fs.existsSync(exe)) return exe;
    }
  } catch (e) {}
  return undefined;
}

/* خادمٌ ساكنٌ مؤقّتٌ على منفذٍ حرّ — يُغلَقُ في `close()`.
   `SHOOGP_URL` يتخطّاه إن كان الموقعُ مخدوماً سلفاً. */
export async function serve() {
  if (process.env.SHOOGP_URL) return { url: process.env.SHOOGP_URL, stop() {} };
  const port = 8000 + Math.floor(Math.random() * 1000);
  const ch = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'],
                   { cwd: ROOT, stdio: 'ignore' });
  const url = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(url + '/index.html'); if (r.ok) break; } catch (e) {}
    await new Promise(r => setTimeout(r, 100));
  }
  return { url, stop() { try { ch.kill(); } catch (e) {} } };
}

/* صفحةٌ جاهزةٌ: القفلُ مطفأٌ، والخطوطُ والإطاراتُ مقيسة، والمساعداتُ محقونة */
export async function openPlatform({ width = 1920, height = 1080 } = {}) {
  const srv = await serve();
  const browser = await chromium.launch({ executablePath: chromePath() });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(String(e.message)));
  await page.addInitScript(() => { try { localStorage.setItem('shoogp-lock-off', '1'); } catch (e) {} });
  await page.goto(srv.url + '/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof DATA !== 'undefined' && typeof QUESTIONS !== 'undefined'
                                   && typeof openLesson === 'function', null, { timeout: 30000 });
  await page.evaluate(injectHelpers);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.__framesReady());
  return { browser, page, pageErrors, close: async () => { await browser.close(); srv.stop(); } };
}

/* يُنفَّذُ داخلَ الصفحة */
function injectHelpers() {
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedOf(n) {
    var h = 0x811c9dc5;
    for (var i = 0; i < n.length; i++) { h ^= n.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return h >>> 0;
  }
  window.__seed   = f => { window.__realRandom = window.__realRandom || Math.random;
                           Math.random = mulberry32(seedOf(f)); };
  window.__unseed = () => { if (window.__realRandom) Math.random = window.__realRandom; };

  window.__framesReady = function () {
    var names = [];
    Object.keys(FRAME_FAMILIES).forEach(function (fam) {
      var s = FRAME_FAMILIES[fam].sizes;
      Object.keys(s).forEach(function (k) { if (names.indexOf(s[k].img) < 0) names.push(s[k].img); });
    });
    names.forEach(function (n) { measureFrameGeo(n); });
    return new Promise(function (res) {
      var t = 0;
      (function poll() {
        var p = names.filter(function (n) { return _frameGeo[n] === 'pending' || _frameGeo[n] === undefined; });
        if (!p.length || ++t > 200) return res(names.length);
        setTimeout(poll, 50);
      })();
    });
  };

  /* كلُّ درسٍ فيه أسئلة — مرشَّحاً بجزءٍ من مفتاحِ الكتاب (‏`-sci`، `g2-math`، …) */
  window.__jobs = function (filter) {
    var out = [];
    for (var term in DATA.terms) for (var grade in DATA.terms[term])
      DATA.terms[term][grade].forEach(function (b) {
        if (filter && b.key.indexOf(filter) < 0) return;
        var idx = DATA.index[b.key]; if (!idx) return;
        idx.units.forEach(function (u) {
          u.lessons.forEach(function (l) {
            if (((window.QUESTIONS && QUESTIONS[l.file]) || []).length)
              out.push({ term: term, grade: grade, book: b.key, title: b.title,
                         unit: u.unit, file: l.file, lesson: l.title });
          });
        });
      });
    return out;
  };

  /* الاستقرار: الإطارُ يُختارُ ثمّ يُصحَّحُ (‏`ShoogpFit` يضبطُ زومَ الصفحةِ فيتغيّرُ
     الفضاءُ المتاحُ فيُعادُ الاختيار). فيُنتظَرُ حتى تثبتَ قيمةُ `data-fit` ثلاثَ
     عيّناتٍ متتالية — ولا يُنادى `fitFrame` يدوياً إطلاقاً، فالتطبيقُ هو الذي يقرّر.
     ⚠️ النداءُ اليدويُّ **يغيّرُ النتيجةَ لا يقرأُها**: مقيسٌ في `g2m-2-1[1]` أنّ
     `fitFrame` قبلَ `ShoogpFit.apply` يُعطي `l@200%` وبعدَه `m@171%` — وعليه
     اختلفَ تقريرُ القصِّ اختلافاً كاملاً. */
  window.__settle = function (card) {
    return new Promise(function (res) {
      var last = null, same = 0, n = 0;
      (function poll() {
        var f = card.dataset.fit || '';
        /* ثمّ مهلةٌ أخيرةٌ لانتقالاتِ CSS: `.target` مثلاً فيه `transition:.2s`،
           فالقراءةُ الفوريةُ تُعيدُ موضعَ ما قبلَ الانتقالِ لا موضعَ الاستقرار —
           وقد أبلغَت بذلك بتراً في `g2m-8-1#٣` بعدَ إصلاحِه فعلاً. */
        if (f && f === last) { if (++same >= 3) return setTimeout(function(){ res(f); }, 260); }
        else { same = 0; last = f; }
        if (++n > 150) return res(f);
        requestAnimationFrame(function () { setTimeout(poll, 40); });
      })();
    });
  };

  /* فتحُ الدرسِ كما يفتحُه المعلّم — لا `renderQuestions` وحدَه (‏`CLAUDE.md`:
     يتخطّى سياقَ الكتابِ فيختارُ إطاراً مختلفاً) */
  window.__openLesson = function (j) {
    [].slice.call(document.querySelectorAll('#terms .term-btn'))
      .filter(function (e) { return e.textContent.indexOf(j.term) >= 0; })[0].click();
    [].slice.call(document.querySelectorAll('#grades .grade'))
      .filter(function (e) { return e.textContent.indexOf(j.grade) >= 0; })[0].click();
    document.getElementById('books').children[
      DATA.terms[j.term][j.grade].findIndex(function (b) { return b.key === j.book; })].click();
    var ls = null;
    DATA.index[j.book].units.forEach(function (u) {
      u.lessons.forEach(function (l) { if (l.file === j.file) ls = l; });
    });
    if (!ls) return false;
    window.__seed(j.file);
    openLesson(ls);
    frameize();
    return true;
  };
}

export function outPath(name) {
  const dir = process.env.AUDIT_OUT || fs.mkdtempSync(path.join(os.tmpdir(), 'shoogp-audit-'));
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, name);
}
export { ROOT };
