# -*- coding: utf-8 -*-
"""يبني tools/audio-audit.html: كلُّ مقطعٍ صوتيٍّ في إنجليزيةِ الصفَّينِ الأولِ والثاني مع المتوقَّعِ منه ومواضعِ استعمالِه."""
import os, re, json, html
os.chdir(r"D:\منصة شوجب التفاعلية")
s = open('js/questions.js', encoding='utf-8').read()
idx = json.load(open('data/index.json', encoding='utf-8'))
title = {}
for bk, gname in (('g1-en', 'Grade 1'), ('g2-en', 'Grade 2'), ('g3-en', 'Grade 3'), ('g4-en', 'Grade 4')):
    for u in idx[bk]['units']:
        for l in u['lessons']:
            un = re.match(r'g\de-(\w+)-', l['file']).group(1)
            ulabel = f"Unit {un} ({u['unit']})" if un.isdigit() and un != '0' else u['unit']
            title[l['file']] = f"{gname} › {ulabel} › {l['title']}"
FIXED = {'ball', 'blend-bike', 'blend-house', 'blend-pie', 'mum-word', 'plane', 'ten', 'blend-sleigh', 'blend-whale'}   # أُعيدَ توليدُها ٢٠٢٦-٠٩-١٩
clips = {}
def add(path, expect, where):
    k = os.path.basename(path)[:-4]
    c = clips.setdefault(k, dict(path=path, expect=set(), where=[], grades=set()))
    c['grades'].add(where[6])
    c['expect'].add(expect); c['where'].append(where)
for m in re.finditer(r'\n  "(g[1-4]e-[^"]+)": \[', s):
    code = m.group(1); a = m.end(); b = s.find('\n  ],', a)
    for qi, q in enumerate(s[a:b].split('\n    {\n')[1:], 1):
        qq = re.sub(r'svg:\s*`.*?`', '', q, flags=re.S)
        t = re.search(r'type:\s*"([^"]+)"', qq).group(1)
        pr = re.search(r'(?:prompt|statement):\s*"((?:[^"\\]|\\.)*)"', qq)
        pr = pr.group(1) if pr else ''
        where = f'{title.get(code, code)} — Q{qi} ({t})'
        o = re.search(r'options:\s*\[(.*?)\]', qq, re.S)
        opts = re.findall(r'"((?:[^"\\]|\\.)*)"', o.group(1)) if o else []
        an = re.search(r'answer:\s*(\d+)', qq)
        for f in re.findall(r'\baudio:\s*"([^"]+)"', qq):
            k = os.path.basename(f)[:-4]
            if t == 'mcq' and opts and an: exp = 'الكلمة: ' + opts[int(an.group(1))]
            elif t == 'trace-letter' or re.fullmatch(r'[a-z]{1,2}', k): exp = f'صوتُ الحرف /{k}/ (لا اسمُه)'
            elif t == 'hotspot': exp = 'الكلمة: ' + k
            else: exp = 'يطابقُ السؤال: ' + pr
            add(f, exp, where)
        sm = re.search(r'soundOf:\s*\{(.*?)\}', q, re.S)
        if sm:
            for L, f in re.findall(r'(\w+):\s*"(audio/[^"]+)"', sm.group(1)):
                add(f, f'صوتُ المقطع «{L}» كما يُنطَقُ داخلَ الكلمة', where)
        bm = re.search(r'blendAudio:\s*"([^"]+)"', q)
        if bm and opts and an: add(bm.group(1), 'الكلمة: ' + opts[int(an.group(1))], where)
isnew = lambda c: False   # دُقِّقت الصفوفُ الأربعةُ كلُّها سمعاً ٢٠٢٦-٠٩-١٩
rows = sorted(clips.items(), key=lambda kv: (not isnew(kv[1]) and kv[0] not in FIXED, kv[0] not in FIXED, kv[0].startswith('phon-'), kv[0]))
tr = []
for k, c in rows:
    sus = '<span class="ok">أُعيدَ توليدُه</span>' if k in FIXED else ('<span class="sus">جديد — لم يُدقَّق</span>' if isnew(c) else '<span class="done">دُقِّق</span>')
    tr.append(f'<tr data-k="{k}"><td><button class="play" data-src="../{c["path"]}">▶</button></td>'
              f'<td class="f">{k}.mp3 {sus}</td><td class="e">{"<br>".join(html.escape(e) for e in sorted(c["expect"]))}</td>'
              f'<td class="w">{"<br>".join(html.escape(w) for w in c["where"])}</td>'
              f'<td><label><input type="checkbox" class="bad"> خطأ</label><br><input class="note" placeholder="ماذا سمعت؟"></td></tr>')
page = '''<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تدقيق أصوات الإنجليزية — الصفوف ١–٤</title>
<meta name="robots" content="noindex">
<style>body{font:16px/1.6 Cairo,Tahoma,sans-serif;margin:0;padding:16px;background:#1d1830;color:#f4f0ff}
h1{font-size:20px;margin:0 0 6px}p{margin:4px 0 12px;color:#cfc6ee}
table{border-collapse:collapse;width:100%;background:#2a2340}td,th{border-bottom:1px solid #3d3560;padding:8px;vertical-align:top;text-align:right}
th{position:sticky;top:0;background:#3d3560}.f,.e{direction:ltr;text-align:left}.f{font-weight:700;white-space:nowrap}.w{font-size:13px;color:#cfc6ee;direction:ltr;text-align:left}
.play{font-size:22px;width:54px;height:44px;border-radius:12px;border:0;background:#FF6000;color:#fff;cursor:pointer}.play.on{background:#60C020}
.ok,.done{display:inline-block;direction:rtl;border-radius:8px;padding:0 8px;font-size:12px;font-weight:400}.ok{background:#245c2a;color:#d9ffd9}.done{background:#3d3560;color:#cfc6ee}
.sus{display:inline-block;direction:rtl;background:#7a2a2a;color:#ffd9d9;border-radius:8px;padding:0 8px;font-size:12px;font-weight:400}
tr.isbad{background:#4a2030}.note{width:150px;margin-top:4px;direction:ltr}
#bar{position:sticky;bottom:0;background:#3d3560;padding:10px;display:flex;gap:10px;align-items:center}
#out{flex:1;height:60px;direction:ltr}#copy{font-size:16px;padding:10px 18px;border-radius:12px;border:0;background:#20A0FF;color:#fff;cursor:pointer}</style></head><body>
<h1>تدقيق أصوات الإنجليزية — الصفوف ١–٤ (__N__ مقطعاً)</h1>
<p>اضغط ▶ واسمع، وقارن بعمود «المتوقَّع». ما كان خطأً علِّم عليه واكتب ما سمعت، ثم اضغط «انسخ القائمة» وألصقها في المحادثة. دُقِّقت كلُّها سمعاً ٢٠٢٦-٠٩-١٩ (٩ أُعيدَ توليدُها — في الأعلى بشارةٍ خضراء). تُعادُ الصفحةُ عندَ إضافةِ أصواتٍ جديدة.</p>
<table><thead><tr><th></th><th>الملفّ</th><th>المتوقَّع</th><th>أين يُستعمَل</th><th>حكمك</th></tr></thead><tbody>
__ROWS__
</tbody></table>
<div id="bar"><button id="copy">انسخ القائمة</button><textarea id="out" readonly></textarea></div>
<script>
let cur=null;
document.querySelectorAll('.play').forEach(b=>b.onclick=()=>{ if(cur){cur.a.pause();cur.b.classList.remove('on');}
  const a=new Audio(b.dataset.src+'?t='+Date.now()); cur={a,b}; b.classList.add('on'); a.onended=()=>b.classList.remove('on'); a.play(); });
function refresh(){ const L=[]; document.querySelectorAll('tbody tr').forEach(tr=>{ const bad=tr.querySelector('.bad').checked; tr.classList.toggle('isbad',bad);
  if(bad) L.push(tr.dataset.k+'.mp3 — سمعت: '+(tr.querySelector('.note').value||'؟')); }); document.getElementById('out').value=L.join('\\n'); }
document.addEventListener('input',refresh);
document.getElementById('copy').onclick=()=>{ refresh(); const t=document.getElementById('out'); t.select(); document.execCommand('copy'); };
</script></body></html>'''
page = page.replace('__N__', str(len(rows))).replace('__ROWS__', '\n'.join(tr))
open('tools/audio-audit.html', 'w', encoding='utf-8', newline='\n').write(page)
print('clips', len(rows), 'new', sum(1 for _, c in rows if isnew(c)))
missing = [c['path'] for _, c in rows if not os.path.exists(c['path'])]
print('missing files:', missing)
