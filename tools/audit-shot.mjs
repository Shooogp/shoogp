/* ═══════════════════════════════════════════════════════════════════
   لقطةُ سؤالٍ واحدٍ كما يراه المعلّم — للتحقّقِ البصريِّ ممّا أبلغَته الأدواتُ الأخرى
   ───────────────────────────────────────────────────────────────────
   الاستعمال:   node tools/audit-shot.mjs <معرّفُ الدرس> <رقمُ السؤال> [ملفُّ PNG]
   مثال:        node tools/audit-shot.mjs g1s-3-3 4 /tmp/lesson.png

   ⚠️ أداةُ تطويرٍ لا تُحمَّلُ في المنصّة.
   البذرةُ نفسُها المستعمَلةُ في `audit-layout`، فاللقطةُ تُظهرُ **الخلطَ الذي قِيسَ**
   لا خلطاً آخرَ يُنتِجُ إطاراً مختلفاً.
   ═══════════════════════════════════════════════════════════════════ */
import { openPlatform, outPath } from './audit-lib.mjs';

const file = process.argv[2];
const num  = +(process.argv[3] || 1);
const out  = process.argv[4] || outPath(`${file}-${num}.png`);
if (!file) { console.error('الاستعمال: node tools/audit-shot.mjs <معرّفُ الدرس> <رقمُ السؤال> [ملفُّ PNG]'); process.exit(1); }

const { page, close } = await openPlatform();

const info = await page.evaluate(({ file, num }) => {
  const job = window.__jobs('').find(j => j.file === file);
  if (!job) return { err: 'لا درسَ بهذا المعرّف: ' + file };
  window.__openLesson(job);
  const cards = [...document.querySelectorAll('.qcard')];
  if (!cards[num - 1]) return { err: `الدرسُ فيه ${cards.length} أسئلةٍ فقط` };
  cards.forEach((x, i) => x.style.display = (i === num - 1) ? '' : 'none');
  const c = cards[num - 1];
  c.dataset.fitSig = '';
  fitFrame(c);
  if (window.ShoogpFit && ShoogpFit.apply) ShoogpFit.apply();
  if (window.placeChrome) placeChrome();
  const q = QUESTIONS[file][num - 1] || {};
  return { book: job.book, lesson: job.lesson, fit: c.dataset.fit,
           type: q.type, level: q.level, prompt: q.prompt || q.statement || '' };
}, { file, num });

if (info.err) { console.error(info.err); await close(); process.exit(1); }
await page.waitForTimeout(500);
await page.screenshot({ path: out });
console.log(info);
console.log('→ ' + out);
await close();
