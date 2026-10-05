// يبني ملف بيانات الألعاب لكل كتاب: games/data/<book>.js
const fs=require('fs'),path=require('path');
const REPO=path.resolve(process.argv[2]||'.'); const OUT=path.resolve(process.argv[3]||'games/data');
global.window={};require(REPO+'/js/questions.js');const Q=window.QUESTIONS;
const idx=JSON.parse(fs.readFileSync(REPO+'/data/index.json','utf8'));
fs.mkdirSync(OUT,{recursive:true});
const conv=(q,l)=>q.type==='true-false'?{t:'t',q:q.statement||q.prompt,a:!!q.answer,l}
  :{t:'m',q:q.prompt,o:q.options,a:q.answer,l};
const ok=q=>(q.type==='true-false'&&typeof (q.statement||q.prompt)==='string')||(q.type==='mcq'&&typeof q.prompt==='string'&&Array.isArray(q.options)&&q.options.length>=2&&q.options.every(o=>typeof o==='string')&&Number.isInteger(q.answer));
const rep=[];
for(const BOOKID of Object.keys(idx)){
  const b=idx[BOOKID];
  const [subject,grade]=b.book.split(' — ');
  const en=/-en$/.test(BOOKID);
  /* عزل اتجاه العناوين الإنجليزية داخل الواجهة العربية (FSI…PDI) فلا تقفز علامات الترقيم */
  const iso=t=>en?'\u2068'+t+'\u2069':t;
  const bankF=path.join(__dirname,'gamebank-'+BOOKID+'.json');
  const BANK=fs.existsSync(bankF)?JSON.parse(fs.readFileSync(bankF,'utf8')):{};
  const extra=(id,t)=>(BANK[id]||[]).map(q=>q.t==='t'?{t:'t',q:q.q,a:q.a,l:t}:{t:'m',q:q.q,o:q.o,a:q.a,l:t});
  const units=b.units.map((u,i)=>({un:i+1,u:iso(u.unit),lessons:u.lessons.map(l=>({id:l.file,t:iso(l.title),qs:(Q[l.file]||[]).filter(ok).map(q=>conv(q,iso(l.title))).concat(extra(l.file,iso(l.title)))}))}));
  const out='/* بيانات ألعاب الكتاب — تُولَّد من js/questions.js وبنوك أسئلة الألعاب */\nvar BOOKDATA = '+JSON.stringify({id:BOOKID,subject,grade,en,units})+';\n';
  fs.writeFileSync(path.join(OUT,BOOKID+'.js'),out);
  const ls=units.flatMap(u=>u.lessons); 
  rep.push([BOOKID, units.length, ls.length, ls.filter(l=>!l.qs.length).length, ls.reduce((s,l)=>s+l.qs.length,0), Object.keys(BANK).length, Math.round(out.length/1024)+'K']);
}
console.table(rep);
