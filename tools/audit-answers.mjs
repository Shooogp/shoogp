/* ═══════════════════════════════════════════════════════════════════
   فحصُ صحّةِ الإجابات — يحلُّ كلَّ سؤالٍ بالإجابةِ الصحيحةِ ويتحقّقُ من قبولِها
   ───────────────────────────────────────────────────────────────────
   الاستعمال:   node tools/audit-answers.mjs [مرشِّحُ الكتاب] [ملفُّ الخرج]

   ⚠️ أداةُ تطويرٍ لا تُحمَّلُ في المنصّة.

   ═══ لماذا يُحَلُّ السؤالُ ولا يُقرَأُ مفتاحُه فحسب ═══
   قراءةُ `answer` تُثبتُ أنّ الرقمَ في المدى، **ولا تُثبتُ أنّ الطالبَ يستطيعُ
   الوصولَ إليه**. والعيبُ الذي كشفَته هذه الأداةُ من النوعِ الثاني: في التوصيلِ
   يحملُ عنصرُ العمودِ الأيمنِ مفتاحَ **زوجِه** (‏`d.dataset.k = pr.a` في
   `renderMatching`)، فلو تطابقت بطاقتانِ نصّاً في ذلك العمودِ صارَ الوصلُ
   الصحيحُ إلى إحداهما مردوداً — ولا يظهرُ ذلك في البياناتِ إطلاقاً.

   ═══ ما لا يُفحَصُ هنا وسببُه ═══
   • **البازل** و**الشريط المتدرّج** — سحبٌ حرٌّ بالمؤشّرِ لا حالةَ صحيحةٌ تُبنى.
   • **السحب والإفلات** و**ملء الفراغ** و**الخريطة الذهنية** — تُفحَصُ
     **مطابقةُ البنك** (أنّ لكلِّ إجابةٍ بطاقةً تحملُها) لا حركةُ السحبِ نفسُها،
     فالسحبُ سلوكُ متصفّحٍ لا منطقُ سؤال. والتصنيفُ والترتيبُ يُحَلّانِ كاملَين
     لأنّ إسقاطَ البطاقةِ فيهما `appendChild` صريحٌ يُحاكى بلا التباس.
   ═══════════════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import { openPlatform, outPath } from './audit-lib.mjs';

const FILTER = process.argv[2] || '';
const OUT    = process.argv[3] || outPath('answers.json');

const { page, pageErrors, close } = await openPlatform({ width: 1600, height: 1000 });

const out = await page.evaluate(async (FILTER) => {
  const R = [];
  const add = (o) => R.push(o);
  const sleep = ms => new Promise(r=>setTimeout(r,ms));

  const jobs = window.__jobs(FILTER).map(j => ({ book: j.book, file: j.file }));

  const host = document.createElement('div');
  host.className = 'shoogp-ui'; host.style.cssText = 'position:fixed;left:-4000px;top:0;width:900px';
  const bodyEl = document.createElement('div'); bodyEl.className = 'qbody';
  const fb = document.createElement('div'); fb.className = 'fb qfb';
  host.append(bodyEl, fb); document.body.appendChild(host);

  const RENDER = {
    mcq: window.renderMcq, exclude: window.renderExclude, 'audio-q': window.renderAudioQ,
    'true-false': window.renderTrueFalse, 'judge-reason': window.renderJudgeReason,
    matching: window.renderMatching, 'letter-picture': window.renderLetterPicture,
    memory: window.renderMemory, classify: window.renderClassify, sequence: window.renderSequence,
    'fill-blank': window.renderFillBlank, mindmap: window.renderMindmap,
    'drag-drop': window.renderDragDrop, color: window.renderColor,
    'equation-builder': window.renderEquationBuilder, pattern: window.renderPattern,
    compare: window.renderCompare
  };
  /* ثلاثةُ أنواعٍ تتقاسمُ عقدَ `wireBank`: خانةٌ تحملُ `data-answer` وبطاقةٌ تحملُ
     `data-w`، والتحقّقُ يقارنُ `dataset.placed` بها. فتُحَلُّ بمنطقٍ واحد. */
  const BANK = { 'fill-blank': ['.blank', '.chip'],
                 'equation-builder': ['.eqslot', '.eqchip'],
                 pattern: ['.pt-slot', '.ptchip'] };
  const won = () => /🎉|🌟|ممتاز|أحسنت/.test(fb.textContent);

  for (const j of jobs) {
    const qs = QUESTIONS[j.file];
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i], id = `${j.file}[${i+1}]`;
      const rec = { book: j.book, file: j.file, q: i+1, id, type: q.type, status: 'skip', note: '' };
      try {
        if (q.type === 'hotspot' || q.type === 'find-error') {
          const spots = Array.isArray(q.spot) ? q.spot : [q.spot];
          let bad = [];
          spots.forEach((s, si) => {
            if (!hitsSpot(q.spot, s.x, s.y)) bad.push(`مركزُ المنطقة ${si+1} لا يُحتسَبُ إصابةً`);
          });
          // نسبةُ المساحةِ المقبولةِ من الصورة
          const area = spots.reduce((a,s)=> a + (s.r!==undefined ? Math.PI*s.r*s.r : s.w*s.h), 0) / 100;
          rec.area = +area.toFixed(1);
          rec.status = bad.length ? 'FAIL' : 'ok';
          rec.note = bad.join(' · ');
          if (rec.status === 'ok' && area > 45) { rec.status = 'warn'; rec.note = `منطقةُ الإجابةِ تغطّي ${area.toFixed(0)}٪ من الصورة`; }
          if (rec.status === 'ok' && area < 1.2) { rec.status = 'warn'; rec.note = `منطقةُ الإجابةِ ${area.toFixed(1)}٪ فقط — صغيرةٌ على الإصبع`; }
          add(rec); continue;
        }
        if (q.type === 'lens') {
          const bad = (q.spots||[]).filter(s => !hitsSpot(s, s.x, s.y));
          rec.status = bad.length ? 'FAIL' : 'ok';
          rec.note = bad.map(s=>s.label).join('، ');
          add(rec); continue;
        }
        const fn = RENDER[q.type];
        if (!fn) { add(rec); continue; }
        bodyEl.innerHTML = ''; fb.textContent = ''; fb.className = 'fb qfb';
        fn(q, bodyEl, fb);

        if (q.type === 'mcq' || q.type === 'exclude' || q.type === 'audio-q') {
          const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
          const btn = [...bodyEl.querySelectorAll('.opt,.excl-opt,.aopt')].find(e => ans.includes(+e.dataset.i));
          if (!btn) { rec.status='FAIL'; rec.note='لا زرَّ للإجابةِ الصحيحة'; }
          else { btn.click();
            rec.status = btn.classList.contains('correct') ? 'ok' : 'FAIL';
            if (rec.status==='FAIL') rec.note = 'الإجابةُ الصحيحةُ لم تُقبَل — ' + fb.textContent.trim(); }
        }
        else if (q.type === 'true-false') {
          const btn = bodyEl.querySelector(q.answer ? '.tf-t' : '.tf-f');
          btn.click();
          rec.status = btn.classList.contains('tf-correct') ? 'ok' : 'FAIL';
          if (rec.status==='FAIL') rec.note = fb.textContent.trim();
        }
        else if (q.type === 'judge-reason') {
          const j1 = [...bodyEl.querySelectorAll('.jr-judge .opt')].find(e=>+e.dataset.i===q.answer);
          j1.click();
          if (!j1.classList.contains('correct')) { rec.status='FAIL'; rec.note='الحكمُ الصحيحُ رُفِض'; }
          else {
            const j2 = [...bodyEl.querySelectorAll('.jr-reasons .opt')].find(e=>+e.dataset.i===q.reasonAnswer);
            if (!j2 || j2.disabled) { rec.status='FAIL'; rec.note='أزرارُ الأسبابِ لم تُفتَح'; }
            else { j2.click(); rec.status = j2.classList.contains('correct') ? 'ok' : 'FAIL';
                   if (rec.status==='FAIL') rec.note='السببُ الصحيحُ رُفِض — '+fb.textContent.trim(); }
          }
        }
        else if (q.type === 'matching' || q.type === 'letter-picture') {
          const L = [...bodyEl.querySelectorAll('.left')], Rr = [...bodyEl.querySelectorAll('.right')];
          let okAll = true;
          for (const l of L) {
            const sel = q.type==='letter-picture' ? Rr : L;   // letter-picture: يُختارُ الحرفُ أولاً
            const first = q.type==='letter-picture' ? Rr.find(e=>e.dataset.k===l.dataset.k) : l;
            const second= q.type==='letter-picture' ? l : Rr.find(e=>e.dataset.k===l.dataset.k);
            if (!first || !second) { okAll=false; break; }
            first.click(); second.click();
            if (!second.classList.contains('matched')) { okAll=false; rec.note='وصلٌ صحيحٌ رُفِض: '+(l.textContent||'').trim().slice(0,20); break; }
          }
          rec.status = okAll ? 'ok' : 'FAIL';
          if (okAll && !/ممتاز/.test(fb.textContent)) { rec.status='warn'; rec.note='اكتملَ الوصلُ بلا رسالةِ فوز'; }
        }
        else if (q.type === 'classify') {
          const map = {}; q.groups.forEach((g,gi)=>g.items.forEach(it=>map[it]=gi));
          const chips = [...bodyEl.querySelectorAll('.chip')];
          const missing = Object.keys(map).filter(w => !chips.some(c=>c.dataset.w===w));
          if (missing.length) { rec.status='FAIL'; rec.note='عنصرٌ بلا بطاقةٍ في البنك: '+missing.join('، '); }
          else {
            chips.forEach(c => bodyEl.querySelector('.grp-drop[data-i="'+map[c.dataset.w]+'"]').appendChild(c));
            bodyEl.querySelector('.btn-check').click();
            rec.status = won() ? 'ok' : 'FAIL';
            if (rec.status==='FAIL') rec.note='التصنيفُ الصحيحُ لم يُقبَل — '+fb.textContent.trim();
          }
        }
        else if (q.type === 'sequence') {
          const list = bodyEl.querySelector('.seqlist');
          const items = [...bodyEl.querySelectorAll('.seqitem')];
          const missing = q.steps.filter(st => !items.some(li=>li.dataset.k===st));
          if (missing.length) { rec.status='FAIL'; rec.note='خطوةٌ بلا بطاقة: '+missing.join('، '); }
          else {
            q.steps.forEach(st => list.appendChild(items.find(li=>li.dataset.k===st)));
            bodyEl.querySelector('.btn-check').click();
            rec.status = won() ? 'ok' : 'FAIL';
            if (rec.status==='FAIL') rec.note='الترتيبُ الصحيحُ لم يُقبَل — '+fb.textContent.trim();
          }
        }
        else if (BANK[q.type] || q.type === 'mindmap') {
          const slotSel = BANK[q.type] ? BANK[q.type][0] : '.mm-slot';
          const chipSel = BANK[q.type] ? BANK[q.type][1] : '.mmchip';
          const slots = [...bodyEl.querySelectorAll(slotSel)];
          const chips = [...bodyEl.querySelectorAll(chipSel)];
          const missing = slots.map(s=>s.dataset.answer).filter(a => !chips.some(c=>c.dataset.w===a));
          if (missing.length) { rec.status='FAIL'; rec.note='إجابةٌ بلا بطاقةٍ في البنك: '+[...new Set(missing)].join('، '); }
          else {
            if (BANK[q.type]) slots.forEach(s=>{ s.dataset.placed=s.dataset.answer; s.textContent=s.dataset.answer; });
            else slots.forEach(s=>{ s.appendChild(chips.find(c=>c.dataset.w===s.dataset.answer)); });
            bodyEl.querySelector('.btn-check').click();
            rec.status = won() ? 'ok' : 'FAIL';
            if (rec.status==='FAIL') rec.note='الإجاباتُ الصحيحةُ لم تُقبَل — '+fb.textContent.trim();
          }
        }
        else if (q.type === 'drag-drop') {
          const tg = [...bodyEl.querySelectorAll('.target')];
          const chips = [...bodyEl.querySelectorAll('.chip')];
          const missing = tg.map(t=>t.dataset.answer).filter(a => !chips.some(c=>c.dataset.w===a));
          if (missing.length) { rec.status='FAIL'; rec.note='هدفٌ بلا بطاقةٍ في البنك: '+[...new Set(missing)].join('، '); }
          else if (tg.length !== q.targets.length) { rec.status='FAIL'; rec.note='عددُ الأهدافِ المرسومةِ يخالفُ البيانات'; }
          else rec.status = 'ok';
        }
        else if (q.type === 'color') {
          const parts = [...bodyEl.querySelectorAll('.cpart')].map(e=>e.dataset.name);
          const missing = (q.parts||[]).map(p=>p.name).filter(n => !parts.includes(n));
          if (missing.length) { rec.status='FAIL'; rec.note='جزءٌ مذكورٌ في البيانات بلا منطقةٍ في الرسم: '+missing.join('، '); }
          else {
            (q.parts||[]).forEach(pt => {
              const sw = bodyEl.querySelector('.cswatch[data-color="'+pt.color+'"]'); if (sw) sw.click();
              const el = [...bodyEl.querySelectorAll('.cpart')].find(e=>e.dataset.name===pt.name); if (el) el.dispatchEvent(new MouseEvent('click',{bubbles:true}));
            });
            bodyEl.querySelector('.btn-check').click();
            rec.status = won() ? 'ok' : 'warn';
            if (rec.status==='warn') rec.note='التلوينُ الصحيحُ لم يُنتِجْ رسالةَ فوز — '+fb.textContent.trim();
          }
        }
        else if (q.type === 'compare') {
          /* الرمزُ الصحيحُ يُشتَقُّ بـ`numOf` نفسِها التي يستعملُها السؤال — والطرفُ
             قد يكونَ عبارةَ منزلةٍ («٤ مِئات» = ٤٠٠) لا رقماً، فالقراءةُ الساذجةُ
             للأرقامِ تُنتِجُ رمزاً مقلوباً وتُبلِّغُ عيباً لا يقع */
          const slots = [...bodyEl.querySelectorAll('.cmp-slot')];
          slots.forEach(sl => {
            const p = q.pairs[+sl.dataset.i];
            const a = numOf(p.a), b = numOf(p.b);
            sl.dataset.placed = a < b ? '<' : a > b ? '>' : '=';
            sl.textContent = sl.dataset.placed;
          });
          bodyEl.querySelector('.btn-check').click();
          rec.status = won() ? 'ok' : 'FAIL';
          if (rec.status==='FAIL') rec.note='المقارنةُ الصحيحةُ لم تُقبَل — '+fb.textContent.trim();
        }
        else if (q.type === 'memory') {
          const cards = [...bodyEl.querySelectorAll('.memcard')];
          const byK = {}; cards.forEach(c => (byK[c.dataset.k]=byK[c.dataset.k]||[]).push(c));
          let okAll = true;
          for (const k in byK) {
            const [a,c] = byK[k];
            if (!a || !c) { okAll=false; rec.note='بطاقةٌ بلا قرين'; break; }
            a.click(); c.click();
            if (!c.classList.contains('matched')) { okAll=false; rec.note='زوجٌ صحيحٌ لم يُقبَل'; break; }
          }
          rec.status = okAll ? 'ok' : 'FAIL';
        }
      } catch (e) { rec.status = 'ERR'; rec.note = String(e.message).slice(0,120); }
      add(rec);
    }
  }
  host.remove();
  return R;
}, FILTER);

fs.writeFileSync(OUT, JSON.stringify({ pageErrors, out }, null, 1));

const by = {};
out.forEach(o => by[o.status] = (by[o.status] || 0) + 1);
console.log(`أسئلة: ${out.length} → ${OUT}`);
console.log(`✔ سليم: ${by.ok || 0} · ⛔ رُفِضت إجابةٌ صحيحة: ${(by.FAIL || 0) + (by.ERR || 0)} · ⚠️ ملاحظة: ${by.warn || 0} · لم تُفحَصْ: ${by.skip || 0}`);
out.filter(o => ['FAIL', 'ERR', 'warn'].includes(o.status))
   .forEach(o => console.log(`   ${o.status === 'warn' ? '⚠️' : '⛔'} ${o.id}  ${o.type}  —  ${o.note}`));
const skipped = [...new Set(out.filter(o => o.status === 'skip').map(o => o.type))];
if (skipped.length) console.log('   أنواعٌ لم تُفحَصْ تفاعلياً: ' + skipped.join('، '));

await close();
