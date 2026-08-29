/* ═══════════════════════════════════════════════════════════════════
   فحصُ قواعدِ المنهجِ وسلامةِ بياناتِ الأسئلة
   ───────────────────────────────────────────────────────────────────
   الاستعمال:   node tools/audit-rules.mjs [مرشِّحُ الكتاب] [ملفُّ الخرج]

   ⚠️ أداةُ تطويرٍ لا تُحمَّلُ في المنصّة.

   ═══ ما يُفحَص ═══
   **قواعدُ المنهج** (‏`CLAUDE.md` هو الحَكَم، ولا تُكرَّرُ عللُها هنا):
     • «٥ أو ٦» أسئلةً لكلِّ درس · لا نوعَ مكرَّراً في الخمسةِ الأساسية.
     • التوزيعُ المعرفيّ: العلوم ٣+١+١ · الرياضيات ٢+٢+١.
     • ترتيبٌ تصاعديٌّ للمستويات · `evaluation` ممنوعٌ في العلومِ والرياضيات.
     • لا يتكرّرُ نوعُ الإثرائيِّ في درسَين متتاليَين من الوحدةِ الواحدة.
   **سلامةُ البيانات**: فهرسُ الإجابةِ في المدى · لا خيارَ مكرَّراً · عددُ
   الفراغاتِ = عددُ الإجابات · لا مشتِّتَ يطابقُ إجابةً · `spot` و`dot` داخلَ
   ٠–١٠٠ · وجودُ ملفّاتِ الصورِ والأصوات · لونُ كلِّ جزءٍ في لوحةِ التلوين.

   ═══ `dup-right` — كانت ⛔ وصارت ⚠️ بعدَ إصلاحِ المحرّك ═══
   كان عنصرُ العمودِ المختارِ ثانياً يحملُ مفتاحَ **زوجِه** لا نصَّه، فبطاقتانِ
   متطابقتانِ نصّاً تبدوانِ للتلميذِ سواءً والوصلُ إلى «الخطأِ» منهما يُرَدُّ وهو
   صحيحٌ نصّاً. وقد صارَ `renderMatching` و`renderMemory` يحكمانِ **بالنصّ** مع
   مبادلةِ الربطِ بين القرينتَين، فلم يبقَ العيب. والملاحظةُ باقيةٌ لأنّ تكرارَ
   البطاقةِ يظلُّ قراراً تأليفياً يُنظَرُ فيه، لا لأنّه يكسرُ السؤال.
   ═══════════════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import { openPlatform, outPath, ROOT as REPO } from './audit-lib.mjs';

const FILTER = process.argv[2] || '';
const OUT    = process.argv[3] || outPath('rules.json');

const { page, close } = await openPlatform({ width: 1280, height: 800 });
const D = await page.evaluate(f => {
  const books = {};
  for (const term in DATA.terms) for (const g in DATA.terms[term])
    DATA.terms[term][g].forEach(bk => {
      if (f && !bk.key.includes(f)) return;
      const ix = DATA.index[bk.key]; if (!ix) return;
      books[bk.key] = { title: bk.title, grade: g, term, units: ix.units.map(u => ({
        unit: u.unit,
        lessons: u.lessons.map(l => ({ title: l.title, file: l.file, qs: QUESTIONS[l.file] || [] }))
      })) };
    });
  return books;
}, FILTER);
await close();

const ROOT = REPO + '/';
const exists = p => { if (!p || /^data:/.test(p)) return true; try { return fs.existsSync(ROOT + p); } catch (e) { return false; } };

const subjOf = k => k.includes('-sci') ? 'sci' : k.includes('-math') ? 'math'
                 : k.includes('-arabic') ? 'arabic' : k.includes('-dini') ? 'dini' : '?';
const LEVELS = ['knowledge','application','reasoning','evaluation'];
const ORDER  = { knowledge:0, reasoning:1, application:2, evaluation:3 }; // arabic ladder
const SORDER = { knowledge:0, application:1, reasoning:2 };               // sci/math ladder

const F = [];   // findings
const add = (sev, book, file, n, code, msg) =>
  F.push({ sev, book, file, q: n, code, msg });

const asArr = v => Array.isArray(v) ? v : [v];
const inR = (v,a,b) => typeof v === 'number' && isFinite(v) && v >= a && v <= b;
const dup = arr => { const s = new Set(), d = []; for (const x of arr) { if (s.has(x)) d.push(x); s.add(x); } return d; };

for (const bk in D) {
  const B = D[bk], subj = subjOf(bk);
  B.units.forEach(u => {
    let prevEnrich = null;
    u.lessons.forEach(L => {
      const qs = L.qs; if (!qs.length) return;
      const file = L.file;

      /* ───── قواعد المنهج ───── */
      if (subj !== 'dini') {
        if (qs.length < 5 || qs.length > 6)
          add('⛔', bk, file, 0, 'count', `عددُ الأسئلة ${qs.length} (القاعدة ٥ أو ٦)`);
      }
      const base = qs.slice(0, 5);
      const dt = dup(base.map(q => q.type));
      if (dt.length) add('⛔', bk, file, 0, 'dup-type', `نوعٌ مكرَّرٌ في الخمسة الأساسية: ${dt.join('، ')}`);

      if (subj === 'sci' || subj === 'math') {
        const ev = qs.filter(q => q.level === 'evaluation');
        if (ev.length) add('⛔', bk, file, 0, 'evaluation', `مستوى evaluation ممنوعٌ في ${subj}`);
        const c = {}; base.forEach(q => c[q.level] = (c[q.level]||0)+1);
        const want = subj === 'sci' ? {knowledge:3, application:1, reasoning:1}
                                    : {knowledge:2, application:2, reasoning:1};
        const got = LEVELS.map(l => `${l}:${c[l]||0}`).filter(s => !s.endsWith(':0')).join(' ');
        const okDist = Object.keys(want).every(l => (c[l]||0) === want[l]) &&
                       Object.keys(c).every(l => want[l] !== undefined);
        if (base.length === 5 && !okDist)
          add('⚠️', bk, file, 0, 'dist', `توزيعٌ معرفيٌّ مخالف — ${got}`);
        const seq = base.map(q => SORDER[q.level]);
        if (seq.every(x => x !== undefined) && seq.some((x,i) => i && x < seq[i-1]))
          add('⚠️', bk, file, 0, 'order', `ترتيبُ المستويات غيرُ تصاعديّ: ${base.map(q=>q.level).join(' → ')}`);
      }

      /* تناوبُ الإثرائيّ بين درسَين متتاليَين */
      if (qs.length === 6) {
        const t = qs[5].type;
        if (prevEnrich === t) add('⚠️', bk, file, 6, 'enrich-repeat',
          `نوعُ الإثرائيِّ «${t}» تكرَّرَ في درسَين متتاليَين من الوحدة`);
        prevEnrich = t;
      } else prevEnrich = null;

      /* ───── سلامةُ كلِّ سؤال ───── */
      qs.forEach((q, i) => {
        const n = i + 1;
        const E = (c,m) => add('⛔', bk, file, n, c, m);
        const W = (c,m) => add('⚠️', bk, file, n, c, m);

        if (!q.objective || !String(q.objective).trim()) E('objective','بلا حقلِ objective');
        if (!q.level) E('level','بلا حقلِ level');
        else if (!LEVELS.includes(q.level)) E('level',`مستوىً غيرُ معروف: ${q.level}`);
        if (!String(q.prompt || q.statement || '').trim()) E('prompt','بلا نصِّ سؤال');

        const opts = q.options && q.options.map(o => typeof o === 'string' ? o : (o.label||o.text||''));
        switch (q.type) {
          case 'mcq': case 'exclude': case 'audio-q': {
            if (!opts || opts.length < 2) { E('options','خياراتٌ ناقصة'); break; }
            const d = dup(opts); if (d.length) E('dup-opt', `خيارٌ مكرَّر: ${d.join('، ')}`);
            if (opts.some(o => !String(o).trim())) E('empty-opt','خيارٌ فارغ');
            for (const a of asArr(q.answer))
              if (!Number.isInteger(a) || a < 0 || a >= opts.length)
                E('answer', `answer=${JSON.stringify(q.answer)} خارجَ نطاقِ ${opts.length} خيارات`);
            if (q.type === 'audio-q' && q.sound && !exists(q.sound)) E('file',`ملفُّ صوتٍ مفقود: ${q.sound}`);
            (q.options||[]).forEach(o => { if (o && o.image && !exists(o.image)) E('file',`صورةٌ مفقودة: ${o.image}`); });
            break;
          }
          case 'true-false':
            if (typeof q.answer !== 'boolean') E('answer','answer ليس منطقياً');
            break;
          case 'judge-reason': {
            if (!opts || opts.length < 2) { E('options','خياراتٌ ناقصة'); break; }
            if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= opts.length) E('answer','answer خارجَ النطاق');
            if (!Array.isArray(q.reasons) || q.reasons.length < 2) E('reasons','أسبابٌ ناقصة');
            else if (!Number.isInteger(q.reasonAnswer) || q.reasonAnswer < 0 || q.reasonAnswer >= q.reasons.length)
              E('reasonAnswer','reasonAnswer خارجَ النطاق');
            if (subj === 'arabic' && q.level !== 'evaluation')
              W('jr-level',`judge-reason مستواه ${q.level} (القاعدة في العربية: evaluation)`);
            break;
          }
          case 'matching': case 'memory': {
            const P = q.pairs || [];
            if (P.length < 2) { E('pairs','أزواجٌ ناقصة'); break; }
            const A = P.map(x=>x.a), Bb = P.map(x=>x.b);
            if (dup(A).length) E('dup-pair',`طرفٌ (a) مكرَّر: ${dup(A).join('، ')}`);
            if (dup(Bb).length) W('dup-right',
              `بطاقتانِ متطابقتانِ نصّاً: ${[...new Set(dup(Bb))].join('، ')} — يقبلُها المحرّكُ الآنَ بالنصّ، وتبقى ملاحظةً تأليفيةً لا عيباً`);
            if (A.concat(Bb).some(x => !String(x||'').trim())) E('empty-pair','طرفٌ فارغ');
            break;
          }
          case 'letter-picture': {
            const P = q.pairs || [];
            if (P.length < 2) E('pairs','أزواجٌ ناقصة');
            P.forEach(x => { if (x.img && !exists(x.img)) E('file',`صورةٌ مفقودة: ${x.img}`); });
            if (dup(P.map(x=>x.word)).length) E('dup-pair','كلمةٌ مكرَّرة');
            if (dup(P.map(x=>x.letter)).length) W('dup-right',
              `حرفٌ مكرَّرٌ في عمودِ الحروف: ${[...new Set(dup(P.map(x=>x.letter)))].join('، ')}`);
            break;
          }
          case 'fill-blank': {
            const nb = (String(q.text||'').match(/\{\}/g)||[]).length;
            if (!nb) E('blank','لا فراغَ في النصّ');
            else if (nb !== (q.answers||[]).length)
              E('blank',`فراغات=${nb} لكنّ answers=${(q.answers||[]).length}`);
            const ov = (q.answers||[]).filter(a => (q.distractors||[]).includes(a));
            if (ov.length) E('distractor',`مشتِّتٌ يطابقُ إجابةً: ${ov.join('، ')}`);
            break;
          }
          case 'classify': {
            const G = q.groups || [];
            if (G.length < 2) { E('groups','مجموعاتٌ ناقصة'); break; }
            const items = G.flatMap(g => g.items||[]);
            if (G.some(g => !(g.items||[]).length)) E('groups','مجموعةٌ بلا عناصر');
            if (dup(items).length) E('dup-item',`عنصرٌ مكرَّرٌ بين المجموعات: ${dup(items).join('، ')}`);
            if (G.length > 3) W('cap',`${G.length} مجموعات (السقفُ المقيسُ ٣)`);
            break;
          }
          case 'sequence': {
            const S = q.steps || [];
            if (S.length < 2) E('steps','خطواتٌ ناقصة');
            if (dup(S).length) E('dup-step',`خطوةٌ مكرَّرة: ${dup(S).join('، ')}`);
            break;
          }
          case 'mindmap': {
            const Br = q.branches || [];
            if (Br.length < 2) E('branches','فروعٌ ناقصة');
            const ans = Br.map(b=>b.answer);
            if (dup(ans).length) E('dup-branch','إجابةُ فرعٍ مكرَّرة');
            const ov = (q.distractors||[]).filter(d => ans.includes(d));
            if (ov.length) E('distractor',`مشتِّتٌ يطابقُ إجابةَ فرع: ${ov.join('، ')}`);
            break;
          }
          case 'hotspot': case 'find-error': {
            if (!q.svg && !q.image) E('media','بلا رسمٍ ولا صورة');
            if (q.image && !exists(q.image)) E('file',`صورةٌ مفقودة: ${q.image}`);
            const spots = asArr(q.spot).filter(Boolean);
            if (!spots.length) { E('spot','بلا منطقةِ إجابة'); break; }
            spots.forEach(s => {
              if (!inR(s.x,0,100) || !inR(s.y,0,100)) E('spot',`مركزُ spot خارجَ ٠–١٠٠: ${JSON.stringify(s)}`);
              if (s.r === undefined && (s.w === undefined || s.h === undefined))
                E('spot',`spot بلا r ولا w/h: ${JSON.stringify(s)}`);
              const L = s.r !== undefined ? s.x - s.r : s.x - s.w/2;
              const R = s.r !== undefined ? s.x + s.r : s.x + s.w/2;
              const T = s.r !== undefined ? s.y - s.r : s.y - s.h/2;
              const Bo= s.r !== undefined ? s.y + s.r : s.y + s.h/2;
              if (L < -2 || R > 102 || T < -2 || Bo > 102)
                W('spot-edge',`منطقةُ الإجابةِ تتجاوزُ حدَّ الصورة: ${JSON.stringify(s)}`);
            });
            break;
          }
          case 'lens': {
            if (q.image && !exists(q.image)) E('file',`صورةٌ مفقودة: ${q.image}`);
            if (q.hidden && !exists(q.hidden)) E('file',`صورةٌ مفقودة: ${q.hidden}`);
            (q.spots||[]).forEach(s => { if (!inR(s.x,0,100)||!inR(s.y,0,100)) E('spot','spot خارجَ النطاق'); });
            break;
          }
          case 'drag-drop': {
            if (q.image && !exists(q.image)) E('file',`صورةٌ مفقودة: ${q.image}`);
            const T = q.targets || [];
            if (T.length < 2) { E('targets','أهدافٌ ناقصة'); break; }
            if (dup(T.map(t=>t.answer)).length) E('dup-target','إجابةُ هدفٍ مكرَّرة');
            T.forEach(t => {
              if (t.dot && (!inR(t.dot.x,0,100)||!inR(t.dot.y,0,100))) E('dot',`dot خارجَ ٠–١٠٠: ${t.answer}`);
              if (t.box && (!inR(t.box.x,0,100)||!inR(t.box.y,0,100))) E('box',`box خارجَ ٠–١٠٠: ${t.answer}`);
            });
            break;
          }
          case 'color': {
            const pal = (q.palette||[]).map(p=>p.color);
            (q.parts||[]).forEach(p => { if (!pal.includes(p.color)) E('palette',`لونُ الجزء «${p.name}» ليس في اللوحة`); });
            if (!q.svg) E('media','بلا رسم');
            break;
          }
          case 'slider':
            if (!inR(q.answer, q.min, q.max)) E('answer','answer خارجَ min..max');
            break;
          case 'number-line':
            if (q.target !== undefined && !inR(q.target, q.min, q.max)) E('answer','target خارجَ min..max');
            break;
          case 'pattern': {
            const nb = (q.items||[]).filter(x => String(x).includes('__')).length;
            if (nb !== (q.answers||[]).length) E('blank',`فراغات=${nb} لكنّ answers=${(q.answers||[]).length}`);
            break;
          }
          case 'equation-builder': {
            const nb = (q.tokens||[]).filter(x => String(x).includes('__')).length;
            if (nb !== (q.answers||[]).length) E('blank',`فراغات=${nb} لكنّ answers=${(q.answers||[]).length}`);
            (q.answers||[]).forEach(a => { if (q.bank && !q.bank.includes(a)) E('bank',`إجابةٌ «${a}» ليست في البنك`); });
            break;
          }
          case 'sentence':
            if (String(q.sentence||'').trim().split(/\s+/).length < 2) E('sentence','جملةٌ من كلمةٍ واحدة');
            break;
          case 'arrange': case 'tashkeel':
            if (!String(q.word||'').trim()) E('word','بلا كلمة');
            break;
          case 'sun-moon':
            if ((q.words||[]).length < 2) E('words','كلماتٌ ناقصة');
            if (dup(q.words||[]).length) E('dup-word','كلمةٌ مكرَّرة');
            break;
          case 'listen-locate':
            if (q.audio && !exists(q.audio)) E('file',`ملفُّ صوتٍ مفقود: ${q.audio}`);
            break;
          case 'puzzle':
            if (q.image && !exists(q.image)) E('file',`صورةٌ مفقودة: ${q.image}`);
            break;
        }
        if (q.image && !exists(q.image)) { /* handled per type */ }
      });
    });
  });
}

fs.writeFileSync(OUT, JSON.stringify(F, null, 1));
const stop = F.filter(f => f.sev === '⛔');
console.log(`كتب: ${Object.keys(D).length} → ${OUT}`);
console.log(`⛔ ${stop.length} · ⚠️ ${F.length - stop.length}`);
F.sort((a, b) => (a.sev === b.sev ? 0 : a.sev === '⛔' ? -1 : 1))
 .forEach(f => console.log(`   ${f.sev} ${f.book} ${f.file}${f.q ? '#' + f.q : ''} [${f.code}] ${f.msg}`));
