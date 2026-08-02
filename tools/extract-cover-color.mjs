/* ═══════════════════════════════════════════════════════════════════════════
   قياسُ اللونِ السائدِ من أغلفةِ كتبِ التلميذ — منصّة شوجب
   ──────────────────────────────────────────────────────────────────────────
   يفتحُ **صفحةَ الغلافِ الأولى** من كلِّ `كتاب-التلميذ*.pdf` ويقيسُ لونَها السائد
   بفحصِ البكسل، فيُغني عن التخمين: البطاقةُ لا تُبنى إلا بلونٍ **مقيسٍ من الغلافِ
   نفسِه** (‏§إنشاء بطاقات الكتب في `CLAUDE.md`‏).

   طريقةُ القياسِ — هي المنهجُ الموثَّقُ في `CLAUDE.md` (§ورقة المواصفات البصرية):
     • هستوغرام مكمَّمٌ إلى مضاعفاتِ ٣٢،
     • مع إسقاطِ البكسلِ منخفضِ التشبّع (‏max−min < 60‏) — فلا يغلبُ البياضُ
       ولا السوادُ ولا رماديُّ النصِّ على لونِ الغلافِ الحقيقيّ،
     • ثمّ **متوسّطُ** بكسلاتِ أكبرِ حزمةٍ يُعطي اللونَ النهائيَّ بدقّةٍ كاملة.

   الاستعمال (يحتاجُ `npm i` مرّةً واحدة — playwright وpdfjs-dist):
     node tools/extract-cover-color.mjs                 ← يمسحُ مجلّدَ `المصادر` كلَّه
     node tools/extract-cover-color.mjs "مسار/كتاب-التلميذ-ج1.pdf" …  ← ملفّاتٌ بعينِها
   ولا يُشغَّلُ إلا على الجهازِ الذي تسكنُه الكتب: ملفّاتُ الـPDF مستثناةٌ في
   `.gitignore` فلا تصلُ الجلساتِ البعيدةَ أصلاً.

   ⚠️ اللونُ المقيسُ **يُعرضُ على المالكِ للاعتمادِ قبلَ بناءِ البطاقة** — القياسُ
   خطوةٌ أولى لا قرارٌ نهائيّ. وفي الكتبِ المقسّمة **لكلِّ جزءٍ غلافُه ولونُه**
   (‏غلافُ «أحب لغتي ٤» فيروزيٌّ في ج١ ومشمشيٌّ في ج٢‏).

   ⚠️ وقبلَ القياسِ تحقّقْ أنّ الملفَّ هو الكتابُ المقصودُ فعلاً: مجلّدُ رياضيّاتِ
   الصفِّ الأوّلِ كانَ يحملُ كتابَ **علومِ الثالثِ** بالخطأ، فوُقفت بطاقتُه.
   ═══════════════════════════════════════════════════════════════════════════ */

import pw from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES = path.join(ROOT, 'المصادر');
const RENDER_W = 700;          // عرضُ التصييرِ — يكفي للقياسِ ويبقى سريعاً
const QUANT = 32;              // تكميمُ الهستوغرام
const SAT_FLOOR = 60;          // حدُّ التشبّع: أقلُّ منه يُسقَط

/** يجدُ ملفَّ pdf.js الصالحَ للحقنِ في المتصفّح (يختلفُ موضعُه بينَ الإصدارات). */
function pdfjsBundle() {
  const tries = [
    'pdfjs-dist/legacy/build/pdf.min.mjs',
    'pdfjs-dist/legacy/build/pdf.mjs',
    'pdfjs-dist/build/pdf.min.mjs',
    'pdfjs-dist/build/pdf.mjs'
  ];
  for (const t of tries) { try { return require.resolve(t); } catch { /* التالي */ } }
  throw new Error('لم يُعثر على pdfjs-dist — نفّذ: npm i -D pdfjs-dist');
}

/* أصلٌ وهميٌّ تُخدَمُ منه ملفّاتُ pdf.js داخلَ المتصفّح. لا يُستعملُ `file://` لأنّ
   أصلَه معتِمٌ فيَرفضُ المتصفّحُ الاستيرادَ الديناميكيَّ للوحدات؛ ولا شبكةَ هنا —
   الطلباتُ كلُّها تُعتَرضُ وتُخدَمُ من القرصِ مباشرة. */
const ORIGIN = 'https://pdfjs.shoogp.local';

async function servePdfjs(page) {
  const bundle = pdfjsBundle();
  const worker = bundle.replace(/pdf(\.min)?\.mjs$/, 'pdf.worker$1.mjs');
  const files = {
    '/index.html': ['text/html', Buffer.from('<!doctype html><meta charset="utf-8"><body></body>')],
    '/pdf.mjs': ['text/javascript', fs.readFileSync(bundle)],
    '/pdf.worker.mjs': ['text/javascript', fs.existsSync(worker) ? fs.readFileSync(worker) : Buffer.alloc(0)]
  };
  await page.route(ORIGIN + '/**', route => {
    const hit = files[new URL(route.request().url()).pathname];
    return hit
      ? route.fulfill({ contentType: hit[0], body: hit[1] })
      : route.fulfill({ status: 404, body: '' });
  });
  await page.goto(ORIGIN + '/index.html');
}

/** يمسحُ `المصادر` بحثاً عن كلِّ `كتاب-التلميذ*.pdf`. */
function scanSources(dir = SOURCES, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scanSources(p, out);
    else if (/^كتاب-التلميذ.*\.pdf$/.test(e.name)) out.push(p);
  }
  return out;
}

/* الدالّةُ التي تعملُ داخلَ المتصفّح: تُصيّرُ الصفحةَ الأولى ثمّ تقيسُ اللون. */
async function measureInPage(page, pdfBytes, opts) {
  return page.evaluate(async ({ bytes, RENDER_W, QUANT, SAT_FLOOR }) => {
    const data = Uint8Array.from(atob(bytes), ch => ch.charCodeAt(0));
    const pdfjs = window.pdfjsLib;
    const doc = await pdfjs.getDocument({ data }).promise;
    const pg = await doc.getPage(1);                     // ← صفحةُ الغلافِ الأولى

    const base = pg.getViewport({ scale: 1 });
    const viewport = pg.getViewport({ scale: RENDER_W / base.width });
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    await pg.render({ canvasContext: ctx, viewport }).promise;

    const { data: px } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bins = new Map();
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i], g = px[i + 1], b = px[i + 2];
      if (px[i + 3] < 250) continue;
      if (Math.max(r, g, b) - Math.min(r, g, b) < SAT_FLOOR) continue;   // رماديٌّ/أبيضُ/أسود
      const k = `${(r / QUANT) | 0},${(g / QUANT) | 0},${(b / QUANT) | 0}`;
      const acc = bins.get(k) || { n: 0, r: 0, g: 0, b: 0 };
      acc.n++; acc.r += r; acc.g += g; acc.b += b;
      bins.set(k, acc);
    }
    if (!bins.size) return { hex: null, share: 0, reason: 'الغلافُ بلا لونٍ مشبَّعٍ يُقاس' };

    let top = null;
    for (const acc of bins.values()) if (!top || acc.n > top.n) top = acc;
    const totalKept = [...bins.values()].reduce((s, a) => s + a.n, 0);
    const hex = '#' + [top.r, top.g, top.b]
      .map(v => Math.round(v / top.n).toString(16).padStart(2, '0')).join('');
    return { hex, share: top.n / totalKept, pixels: canvas.width * canvas.height };
  }, { bytes: pdfBytes, RENDER_W, QUANT, SAT_FLOOR, ...opts });
}

export async function extract(files) {
  const browser = await pw.chromium.launch();
  const page = await browser.newPage();
  await servePdfjs(page);
  // pdf.js يُشحنُ اليومَ وحدةَ ESM، فيُستوردُ استيراداً ديناميكيّاً لا بحقنِ سكربتٍ عاديّ.
  await page.evaluate(async () => {
    window.pdfjsLib = await import('./pdf.mjs');
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('./pdf.worker.mjs', location.href).href;
  });

  const results = [];
  for (const file of files) {
    let out;
    try {
      const bytes = fs.readFileSync(file).toString('base64');
      out = await measureInPage(page, bytes);
    } catch (e) {
      out = { hex: null, reason: e.message };
    }
    const rel = path.relative(ROOT, file);
    results.push({ file: rel, ...out });
    console.log(out.hex
      ? `${out.hex}  (${(out.share * 100).toFixed(0)}٪ من البكسل المشبَّع)  ← ${rel}`
      : `  —      تعذّر القياس: ${out.reason}  ← ${rel}`);
  }
  await browser.close();

  return results;
}

/* ═══ التشغيل ═══════════════════════════════════════════════════════════════ */
if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const files = argv.length ? argv.map(f => path.resolve(f)) : scanSources();
  if (!files.length) {
    console.error(`لم يُعثر على أيِّ «كتاب-التلميذ*.pdf» داخلَ ${path.relative(ROOT, SOURCES)}.`);
    console.error('ملفّاتُ الـPDF محليّةٌ على جهازِ المعلّمِ ومستثناةٌ في `.gitignore`،');
    console.error('فشغّلْ هذه الأداةَ على الجهازِ الذي تسكنُه الكتب.');
    process.exit(1);
  }
  await extract(files);
}
