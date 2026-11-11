// يستخرج أسئلة العلوم (الفصل الأول) من js/questions.js وبيانات الدروس، إلى بنك JSON للوكيل.
const fs = require('fs'), vm = require('vm'), path = require('path');
const repo = process.argv[2];
const src = fs.readFileSync(path.join(repo, 'js/questions.js'), 'utf8');
const ctx = { window: {}, document: {} };
vm.runInNewContext(src, ctx);
const Q = ctx.window.QUESTIONS;
const imgOf = s => { if (!s) return null; const m = /href=['"]([^'"]+)['"]/.exec(s); return m ? m[1] : 'inline-svg'; };
const out = {};
for (const g of [1, 2, 3, 4]) {
  const meta = JSON.parse(fs.readFileSync(path.join(repo, `data/assistant/lessons/g${g}-sci.json`), 'utf8'));
  const units = [];
  for (const [id, L] of Object.entries(meta.lessons)) {
    const qs = (Q[id] || []).map((q, i) => {
      const c = {};
      for (const [k, v] of Object.entries(q)) {
        if (k === 'svg') { c.image = imgOf(v); continue; }
        if (typeof v === 'string' && v.length > 600 && /<svg/.test(v)) { c[k] = imgOf(v); continue; }
        c[k] = v;
      }
      c.ref = `${id}#${i + 1}`;
      return c;
    });
    let u = units.find(x => x.unitNo === L.unitNo);
    if (!u) { u = { unitNo: L.unitNo, unit: L.unit, lessons: [] }; units.push(u); }
    u.lessons.push({ id, title: L.title, lessonNo: L.lessonNo, objectives: L.objectives, questions: qs });
  }
  out[`g${g}`] = { grade: g, book: `g${g}-sci`, units };
}
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
let n = 0; for (const g of Object.values(out)) for (const u of g.units) for (const l of u.lessons) n += l.questions.length;
console.log('questions', n, 'bytes', fs.statSync(process.argv[3]).size);
