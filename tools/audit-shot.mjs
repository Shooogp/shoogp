/* ═══════════════════════════════════════════════════════════════════
   لقطةُ سؤالٍ واحدٍ كما يراه المعلّم — للتحقّقِ البصريِّ ممّا أبلغَته الأدواتُ الأخرى
   ───────────────────────────────────────────────────────────────────
   الاستعمال:   node tools/audit-shot.mjs <معرّفُ الدرس> <رقمُ السؤال> [ملفُّ PNG] [محدِّد]
   مثال:        node tools/audit-shot.mjs g1s-3-3 4 /tmp/lesson.png
                node tools/audit-shot.mjs g2m-8-1 3 /tmp/stage.png .stage

   ⚠️ أداةُ تطويرٍ لا تُحمَّلُ في المنصّة.
   البذرةُ نفسُها المستعمَلةُ في `audit-layout`، فاللقطةُ تُظهرُ **الخلطَ الذي قِيسَ**
   لا خلطاً آخرَ يُنتِجُ إطاراً مختلفاً.
   ═══════════════════════════════════════════════════════════════════ */
import { openPlatform, outPath } from './audit-lib.mjs';

const file = process.argv[2];
const num  = +(process.argv[3] || 1);
const out  = process.argv[4] || outPath(`${file}-${num}.png`);
/* محدِّدٌ اختياريّ: لقطةُ عنصرٍ بعينِه (‏`.qwin` · `.stage`) بدلَ الصفحةِ كاملةً —
   فالعيبُ بحجمِ بضعةِ بكسلاتٍ لا يُرى في لقطةِ ١٩٢٠ عرضاً */
const SEL  = process.argv[5] || '';
if (!file) { console.error('الاستعمال: node tools/audit-shot.mjs <معرّفُ الدرس> <رقمُ السؤال> [ملفُّ PNG]'); process.exit(1); }

const { page, close } = await openPlatform();

const info = await page.evaluate(async ({ file, num }) => {
  const job = window.__jobs('').find(j => j.file === file);
  if (!job) return { err: 'لا درسَ بهذا المعرّف: ' + file };
  window.__openLesson(job);
  const cards = [...document.querySelectorAll('.qcard')];
  if (!cards[num - 1]) return { err: `الدرسُ فيه ${cards.length} أسئلةٍ فقط` };
  /* التنقّلُ بزرِّ «التالي» كما في `audit-layout` — والنداءُ اليدويُّ لـ`fitFrame`
     يغيّرُ الإطارَ المختارَ لا يقرأُه، فتخالفُ اللقطةُ ما أبلغَه الفحص */
  for (let i = 1; i < num; i++) {
    const nx = document.querySelector('.qnav .qnext');
    if (nx && nx.style.display !== 'none') nx.click();
    await new Promise(r => setTimeout(r, 60));
  }
  const c = cards[num - 1];
  c.id = '__shot';                       /* مرساةُ المحدِّد: `.qwin` الأولى في DOM لبطاقةٍ مخفيّة */
  await window.__settle(c);
  const q = QUESTIONS[file][num - 1] || {};
  return { book: job.book, lesson: job.lesson, fit: c.dataset.fit,
           type: q.type, level: q.level, prompt: q.prompt || q.statement || '' };
}, { file, num });

if (info.err) { console.error(info.err); await close(); process.exit(1); }
await page.waitForTimeout(500);
if (SEL) {
  const el = await page.$(SEL === '.qcard' ? '#__shot' : `#__shot ${SEL}`);
  if (!el) { console.error('لا عنصرَ بالمحدِّد: ' + SEL); await close(); process.exit(1); }
  await el.screenshot({ path: out, scale: 'css' });
} else {
  await page.screenshot({ path: out });
}
console.log(info);
console.log('→ ' + out);
await close();
