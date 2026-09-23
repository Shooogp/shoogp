/* ═══ صفحةُ تدقيقِ نطقِ الأسئلة — tools/qread-audit.html ═══
   على غرارِ tools/audio-audit.html (تدقيقُ أصواتِ الإنجليزية): زرُّ ▶ لكلِّ مقطع، وعمودُ المتوقَّع،
   وخانةُ «خطأ» مع ما سُمِع، وزرٌّ ينسخُ القائمةَ لتُلصَقَ في المحادثة.
   المصدر: تقاريرُ فحصِ جيميناي في tools/qread-audit-reports/ (المقاطعُ التي حكمَ عليها بخطأٍ جوهريّ)،
   وفي أعلى الصفحةِ مجموعاتُ صيغٍ تجريبيةٍ (audio/qread-variants/) يختارُ المالكُ أصحَّها.
   التشغيل: node tools/build-qread-audit-page.mjs */
import fs from 'node:fs';
import vm from 'node:vm';
import { qreadHash } from './build-qread-batch.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* مواضعُ كلِّ مقطعٍ في الكتب */
const ctx = { window: {}, document: {} };
vm.runInNewContext(fs.readFileSync(ROOT + 'js/questions.js', 'utf8'), ctx);
const I = JSON.parse(fs.readFileSync(ROOT + 'data/index.json', 'utf8'));
const where = {};
for (const b of Object.keys(I).filter(k => k.startsWith('g1-')))
  for (const u of I[b].units) for (const l of u.lessons)
    (ctx.window.QUESTIONS[l.file] || []).forEach((q, i) => {
      const h = qreadHash(q.prompt || q.statement || '');
      (where[h] ??= []).push(`${I[b].book.split(' — ')[0]} › ${l.title} › س${i + 1}`);
    });

/* المشتبهُ به من التقارير */
const rows = []; let checked = 0; const seen = new Set();
for (const f of fs.readdirSync(ROOT + 'tools/qread-audit-reports').filter(f => f.endsWith('.json')).sort()) {
  const r = JSON.parse(fs.readFileSync(ROOT + 'tools/qread-audit-reports/' + f, 'utf8'));
  for (const it of r.items) {
    const v = it.verdict || {}; if (v.ok === null || v.ok === undefined) continue; checked++;
    const major = (v.issues || []).filter(x => x.severity === 'major');
    if ((v.ok === false || major.length) && !seen.has(it.name)) { seen.add(it.name); rows.push({ ...it, issues: v.issues || [] }); }
  }
}

/* الصيغُ التجريبية */
const VARIANTS = [
  { title: 'فعلُ الأمر — سؤالُ العلوم «أَكْمِلْ مَا آكُلُهُ لِأَنْمُوَ بِصِحَّةٍ…»', note: 'رصدَ جيميناي نطقَ «أَكْمِلْ» ماضياً «أَكْمَلَ» في مقطعَين، و«اقْلِبْ» و«صَنِّفْ» و«ضَعِ» و«صِلْ» بحركاتٍ مخالفةٍ في مقاطعَ أخرى. الفائزُ يُعمَّمُ على المقاطعِ المرصودة.',
    group: 'imp', options: [
      ['akmil-i1', 'i1 — فاصلةٌ بعدَ الفعل: «أَكْمِلْ، مَا آكُلُهُ…»'],
      ['akmil-i2', 'i2 — الكتابةُ الحاليةُ نفسُها: «أَكْمِلْ مَا آكُلُهُ…»'],
      ['akmil-i3', 'i3 — الفعلُ بلا تشكيل: «أكمل مَا آكُلُهُ…»']] },
  { title: 'الحرفُ الإنجليزيُّ المفرد — «…starts with the letter t»', note: 'رصدَ جيميناي نطقَ الحرفِ المفردِ بينَ علامتَي تنصيصٍ خطأً في ٥ من ٩ مقاطع (t → «at»، p → «app»، s → «as»). الفائزُ يُعمَّمُ على التسعة.',
    group: 'eng', options: [
      ['letter-e1', 'e1 — «the letter T»'],
      ['letter-e2', 'e2 — «the letter tee»'],
      ['letter-e3', 'e3 — «the letter "T"»']] }
];

const vsec = VARIANTS.map(g => `<section class="var"><h2>${esc(g.title)}</h2><p>${esc(g.note)}</p>` +
  g.options.map(([k, label]) => `<label class="opt"><button class="play" type="button" data-src="../audio/qread-variants/${k}.mp3">▶</button>` +
    `<input type="radio" name="${g.group}" value="${k}"> <span>${esc(label)}</span></label>`).join('') + `</section>`).join('\n');

const tr = rows.map((r, i) => {
  const n = String(i + 1).padStart(2, '0');
  const iss = r.issues.map(x => `<div class="iss"><b>${esc(x.word)}</b> ← سُمِعَت <b>${esc(x.heard || '؟')}</b>` +
    `${x.severity ? ` <span class="${x.severity}">${x.severity === 'major' ? 'جوهريّ' : 'ثانويّ'}</span>` : ''}${x.note ? `<br><small>${esc(x.note)}</small>` : ''}</div>`).join('');
  return `<tr data-k="${n} ${r.name}"><td><button class="play" type="button" data-src="../audio/qread/${r.name}.mp3">▶</button><div class="num">${n}</div></td>` +
    `<td class="t">${esc(r.text)}</td><td class="e">${iss}</td>` +
    `<td class="w">${(where[r.name] || []).map(esc).join('<br>')}</td>` +
    `<td><label><input type="checkbox" class="bad"> خطأٌ فعلاً</label><br><input class="note" placeholder="ماذا سمعت؟"></td></tr>`;
}).join('\n');

const page = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تدقيق نطق الأسئلة — الصف الأول</title>
<meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font:16px/1.7 Cairo,Tahoma,sans-serif;margin:0;padding:16px;background:#1d1830;color:#f4f0ff}
h1{font-size:20px;margin:0 0 6px}h2{font-size:17px;margin:0 0 4px}p{margin:4px 0 12px;color:#cfc6ee}
.var{background:#2a2340;border-radius:14px;padding:12px 14px;margin:0 0 12px}.opt{display:flex;gap:10px;align-items:center;padding:6px 0;border-top:1px solid #3d3560}
table{border-collapse:collapse;width:100%;background:#2a2340}td,th{border-bottom:1px solid #3d3560;padding:8px;vertical-align:top;text-align:right}
th{position:sticky;top:0;background:#3d3560}.t{font-size:18px;font-weight:700;min-width:220px}.e{min-width:220px}.w{font-size:13px;color:#cfc6ee}
.num{text-align:center;font-size:13px;color:#cfc6ee;margin-top:4px}
.play{font-size:22px;width:54px;height:44px;border-radius:12px;border:0;background:#FF6000;color:#fff;cursor:pointer}.play.on{background:#60C020}
.iss{margin-bottom:6px}.major{display:inline-block;background:#7a2a2a;color:#ffd9d9;border-radius:8px;padding:0 8px;font-size:12px}.minor{display:inline-block;background:#3d3560;color:#cfc6ee;border-radius:8px;padding:0 8px;font-size:12px}
tr.isbad{background:#4a2030}.note{width:170px;margin-top:4px}
#bar{position:sticky;bottom:0;background:#3d3560;padding:10px;display:flex;gap:10px;align-items:center}
#out{flex:1;height:70px}#copy{font-size:16px;padding:10px 18px;border-radius:12px;border:0;background:#20A0FF;color:#fff;cursor:pointer}</style></head><body>
<h1>تدقيق نطق الأسئلة — الصف الأول</h1>
<p>القسمُ الأول: اختر الصيغةَ الصحيحةَ من كلِّ مجموعة. القسمُ الثاني: ${rows.length} مقطعاً حكمَ عليها جيميناي بخطأٍ جوهريٍّ من ${checked} مقطعاً فُحِصَت — اضغط ▶ واسمع، فإن كان الخطأُ حقيقياً علِّمْ عليه واكتبْ ما سمعت. ثمّ اضغط «انسخ القائمة» وألصقها في المحادثة.</p>
${vsec}
<h2>المشتبه به</h2>
<table><thead><tr><th></th><th>النصّ المتوقَّع</th><th>ما رصده جيميناي</th><th>أين يُستعمَل</th><th>حكمك</th></tr></thead><tbody>
${tr}
</tbody></table>
<div id="bar"><button id="copy">انسخ القائمة</button><textarea id="out" readonly></textarea></div>
<script>
let cur=null;
document.querySelectorAll('.play').forEach(b=>b.onclick=()=>{ if(cur){cur.a.pause();cur.b.classList.remove('on');}
  const a=new Audio(b.dataset.src+'?t='+Date.now()); cur={a,b}; b.classList.add('on'); a.onended=()=>b.classList.remove('on'); a.play(); });
function refresh(){ const L=[];
  document.querySelectorAll('.var').forEach(s=>{ const r=s.querySelector('input:checked'); if(r) L.push('الصيغة: '+r.value); });
  document.querySelectorAll('tbody tr').forEach(tr=>{ const bad=tr.querySelector('.bad').checked; tr.classList.toggle('isbad',bad);
    if(bad) L.push(tr.dataset.k+' — سمعت: '+(tr.querySelector('.note').value||'؟')); });
  document.getElementById('out').value=L.join('\\n'); }
document.addEventListener('input',refresh);
document.getElementById('copy').onclick=()=>{ refresh(); const t=document.getElementById('out'); t.select(); document.execCommand('copy'); };
</script></body></html>`;
fs.writeFileSync(ROOT + 'tools/qread-audit.html', page);
console.log(`tools/qread-audit.html: ${rows.length} مشتبهاً من ${checked} مفحوصاً · ${VARIANTS.length} مجموعتَي صيغ`);
