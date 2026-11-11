// يجمع أوراق out/ في ملفّ لكلّ صفّ: data/papers/sci-g<n>.json، ويُلحق بمفردات label صورة الأصل ومواضع أجزائه.
const fs = require('fs'), path = require('path');
const { validatePaper } = require('./validate.js');
const BANK = JSON.parse(fs.readFileSync(path.join(__dirname, 'bank-sci.json'), 'utf8'));
const OUT = path.join(__dirname, 'out');
const DEST = process.argv[2];
fs.mkdirSync(DEST, { recursive: true });
const seeds = {};
for (const g of Object.values(BANK)) for (const u of g.units) for (const l of u.lessons) for (const q of l.questions) seeds[q.ref] = q;
const summary = [];
for (const g of Object.values(BANK)) {
  const lib = { subject: 'sci', grade: g.grade, term: 1, generated: new Date().toISOString().slice(0, 10),
    source: 'شوجب — وكيل الأوراق الورقية (n8n) · وثيقة تقويم المجال الثاني ١–٤ سبتمبر ٢٠٢٦',
    units: g.units.map(u => ({ unitNo: u.unitNo, unit: u.unit, lessons: u.lessons.map(l => ({ id: l.id, lessonNo: l.lessonNo, title: l.title })) })),
    papers: {} };
  for (const f of fs.readdirSync(OUT)) {
    if (!f.startsWith(`g${g.grade}s-`)) continue;
    const rec = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
    if (!rec.paper) continue;
    for (const it of rec.paper.items || []) {
      if (it.type === 'label' && seeds[it.seed] && seeds[it.seed].type === 'drag-drop') {
        const s = seeds[it.seed];
        it.figure = { image: s.image, targets: (s.targets || []).map(t => ({ answer: t.answer, dot: t.dot, box: t.box })) };
      }
    }
    const req = { kind: rec.kind, grade: rec.grade, domain: rec.domain, lessons: g.units.flatMap(u => u.lessons).filter(l => rec.lessons.some(x => x.id === l.id)) };
    rec.errors = validatePaper(rec.paper, req);
    rec.ok = rec.errors.length === 0;
    delete rec.firstErrors;
    lib.papers[rec.id] = rec;
    summary.push([rec.id, rec.ok, rec.attempts, rec.errors.join(' | ')]);
  }
  fs.writeFileSync(path.join(DEST, `sci-g${g.grade}.json`), JSON.stringify(lib));
  console.log(`g${g.grade}`, Object.keys(lib.papers).length, 'papers', fs.statSync(path.join(DEST, `sci-g${g.grade}.json`)).size, 'bytes');
}
const bad = summary.filter(s => !s[1]);
console.log('total', summary.length, 'bad', bad.length);
bad.forEach(b => console.log('BAD', b[0], b[3]));
