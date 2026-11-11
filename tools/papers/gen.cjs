// مولّد مكتبة الأوراق: يرسل كل مهمّة إلى وكيل n8n، يفحص الناتج، ويطلب تصحيحاً مرة واحدة عند المخالفة.
const fs = require('fs'), path = require('path');
const { validatePaper } = require('./validate.js');
let jsonrepair = s => s;
try { ({ jsonrepair } = require('jsonrepair')); } catch (e) { /* اختياري: npm i jsonrepair لإصلاح JSON المكسور */ }
const HOOK = 'https://shoogp.app.n8n.cloud/webhook/shoogp-papers-x7q2';
const SYS = fs.readFileSync(path.join(__dirname, 'sys-prompt.txt'), 'utf8');
const BANK = JSON.parse(fs.readFileSync(path.join(__dirname, 'bank-sci.json'), 'utf8'));
const OUT = path.join(__dirname, 'out');  // bank-sci.json وout/ ملفّات عمل محلية لا تُودَع
fs.mkdirSync(OUT, { recursive: true });

const KEEP = ['type','ref','level','objective','prompt','statement','text','options','answer','answers','distractors','reason','pairs','groups','steps','center','branches'];
function slimQ(q) {
  const o = {};
  for (const k of KEEP) if (q[k] !== undefined) o[k] = q[k];
  if (q.type === 'drag-drop' && Array.isArray(q.targets)) o.targets = q.targets.map(t => ({ answer: t.answer }));
  if (q.type === 'color' && Array.isArray(q.parts)) o.parts = q.parts.map(p => p.name);
  if (q.type === 'lens' && Array.isArray(q.spots)) o.spots = q.spots.map(s => s.label);
  if (q.type === 'audio-q' && Array.isArray(q.options)) o.options = q.options.map(x => x.label || x);
  return o;
}
const slimL = l => ({ id: l.id, title: l.title, objectives: l.objectives, questions: l.questions.map(slimQ) });

function jobs() {
  const J = [];
  for (const g of Object.values(BANK)) for (const u of g.units) {
    for (const l of u.lessons) J.push({ id: `${l.id}-sq`, kind: 'short-questions', grade: g.grade, domain: 'knowledge', unitNo: u.unitNo, unit: u.unit, lessons: [l] });
    if (g.grade <= 2) J.push({ id: `g${g.grade}s-${u.unitNo}-inq`, kind: 'short-questions', grade: g.grade, domain: 'inquiry', unitNo: u.unitNo, unit: u.unit, lessons: u.lessons });
    if (g.grade >= 3) J.push({ id: `g${g.grade}s-${u.unitNo}-test`, kind: 'short-test', grade: g.grade, domain: 'mixed', unitNo: u.unitNo, unit: u.unit, lessons: u.lessons });
  }
  return J;
}

async function call(payload) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(HOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(300000) });
      const txt = await r.text();
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${txt.slice(0, 200)}`);
      return JSON.parse(txt);
    } catch (e) { if (t === 2) throw e; await new Promise(s => setTimeout(s, 4000)); }
  }
}

async function run(job, model) {
  const req = { kind: job.kind, grade: job.grade, domain: job.domain, lessons: job.lessons.map(slimL) };
  const base = { ...req, sys: SYS, devKey: 'x7q2-dev', model };
  const t0 = Date.now();
  const take = r => {
    if (r.ok) return { paper: r.paper, raw: JSON.stringify(r.paper) };
    try { const p = JSON.parse(jsonrepair(r.text || '')); return { paper: p, raw: JSON.stringify(p), repaired: true }; }
    catch (e) { return { paper: null, raw: r.text || '{}', err: r.error || 'لا ورقة' }; }
  };
  let r = await call(base), attempts = 1, firstErrors = null;
  let t = take(r), paper = t.paper, errors = paper ? validatePaper(paper, req) : [t.err];
  while (errors.length && attempts < 3) {
    if (!firstErrors) firstErrors = errors;
    r = await call({ ...base, previous: t.raw, errors });
    attempts++;
    t = take(r); paper = t.paper; errors = paper ? validatePaper(paper, req) : [t.err];
  }
  const rec = { id: job.id, kind: job.kind, grade: job.grade, domain: job.domain, unitNo: job.unitNo, unit: job.unit,
    lessons: job.lessons.map(l => ({ id: l.id, title: l.title })), model: r.model, attempts, ok: errors.length === 0,
    errors, firstErrors, seconds: Math.round((Date.now() - t0) / 1000), paper };
  fs.writeFileSync(path.join(OUT, job.id + '.json'), JSON.stringify(rec, null, 1));
  return rec;
}

(async () => {
  const args = process.argv.slice(2);
  const model = (args.find(a => a.startsWith('--model=')) || '').slice(8) || 'gemini-3.7-flash';
  const conc = Number((args.find(a => a.startsWith('--conc=')) || '').slice(7)) || 3;
  const only = args.filter(a => !a.startsWith('--'));
  const skipDone = args.includes('--skip-done');
  let J = jobs();
  if (only.length) J = J.filter(j => only.includes(j.id));
  if (skipDone) J = J.filter(j => { try { return !JSON.parse(fs.readFileSync(path.join(OUT, j.id + '.json'))).ok; } catch { return true; } });
  console.log('jobs', J.length, 'model', model);
  let i = 0;
  const worker = async () => { while (i < J.length) { const j = J[i++];
    try { const r = await run(j, model); console.log(`${r.ok ? 'OK ' : 'BAD'} ${j.id} a=${r.attempts} ${r.seconds}s ${r.ok ? '' : r.errors.join(' | ')}`); }
    catch (e) { console.log(`ERR ${j.id} ${e.message}`); } } };
  await Promise.all(Array.from({ length: conc }, worker));
})();
