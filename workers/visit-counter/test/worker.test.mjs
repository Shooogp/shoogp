/* اختبارُ عدّادِ الدخولِ على D1 محلّيّ — بلا شبكةٍ وبلا حسابِ Cloudflare.
   يبني الجدولَين، يبذرُ تاريخَ n8n، يُشغِّلُ الـWorker، ثمّ يفحصُ السلوكَ كلَّه.
       npm test                                                         */

import { spawn, execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const PORT = 8788;
const BASE = `http://127.0.0.1:${PORT}`;
const KEY = 'shoogp2026';
const ORIGIN = 'https://shoogp.com';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140 Safari/537.36';

let pass = 0, fail = 0;
const ok = (name, cond, extra = '') => {
  if (cond) { pass++; console.log('  ✅ ' + name); }
  else { fail++; console.log('  ❌ ' + name + (extra ? '  → ' + extra : '')); }
};

const wrangler = (...args) =>
  execFileSync('npx', ['wrangler', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

/* حالةٌ نظيفةٌ في كلِّ تشغيل، وإلا تراكمت أرقامُ التشغيلِ السابقِ فبطلَ الفحص. */
rmSync('.wrangler/state', { recursive: true, force: true });
console.log('▸ بناءُ الجدولَين وبذرُ تاريخِ n8n على D1 محلّيّ…');
wrangler('d1', 'execute', 'shoogp-visits', '--local', '--file=schema.sql', '-y');
wrangler('d1', 'execute', 'shoogp-visits', '--local', '--file=seed.sql', '-y');

console.log('▸ تشغيلُ الـWorker…');
const dev = spawn('npx', ['wrangler', 'dev', '--port', String(PORT), '--var', `STATS_KEY:${KEY}`],
  { stdio: ['ignore', 'pipe', 'pipe'] });

const die = (msg) => { try { dev.kill('SIGKILL'); } catch {} console.error(msg); process.exit(1); };
for (let i = 0; ; i++) {
  if (i > 120) die('✗ لم يُقلِعِ الـWorker في ٦٠ ثانية');
  await new Promise(r => setTimeout(r, 500));
  try { const r = await fetch(BASE + '/nope'); if (r.status === 404) break; } catch {}
}

const visit = (ua = UA) => fetch(BASE + '/visit', {
  method: 'POST', body: '2026-01-01', headers: { 'User-Agent': ua, Origin: ORIGIN },
});
const stats = (key = KEY) =>
  fetch(`${BASE}/stats?key=${encodeURIComponent(key)}`, { headers: { Origin: ORIGIN } });

try {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Muscat', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());

  console.log('\n① التاريخُ المبذورُ وصلَ سليماً');
  let s = await (await stats()).json();
  ok('الاستجابةُ ok', s.ok === true);
  ok('الإجماليُّ المبذورُ ٤٢٠٧', s.total === 4207, 'وجِد ' + s.total);
  ok('‏`days` لا تتجاوزُ ١٤', Array.isArray(s.days) && s.days.length <= 14, 'وجِد ' + s.days?.length);
  ok('‏`days` مرتّبةٌ تنازلياً', s.days[0].day > s.days[1].day);
  ok('‏`since` أقدمُ يوم', s.since === '2026-09-06', 'وجِد ' + s.since);
  ok('حقولُ n8n كلُّها موجودة',
    ['ok', 'total', 'today', 'yesterday', 'days', 'since'].every(k => k in s));

  console.log('\n② الزيارةُ تُحسَبُ وتُجمَع');
  const before = s.total;
  let r = await visit();
  ok('الردُّ ٢٠٤ بلا جسم', r.status === 204, 'وجِد ' + r.status);
  await visit(); await visit();
  s = await (await stats()).json();
  ok('ثلاثُ زياراتٍ ⇒ +٣ في الإجمالي', s.total === before + 3, 'وجِد ' + (s.total - before));
  ok('‏`today` = ٣', s.today === 3, 'وجِد ' + s.today);
  ok('صفُّ اليومِ بتوقيتِ مسقط', s.days[0].day === today, 'وجِد ' + s.days[0].day);

  console.log('\n③ الزواحفُ لا تُحسَب');
  const t0 = s.total;
  await visit('WhatsApp/2.0');
  await visit('Mozilla/5.0 (compatible; Googlebot/2.1)');
  await visit('curl/8.5.0');
  s = await (await stats()).json();
  ok('ثلاثةُ زواحفَ ⇒ بلا زيادة', s.total === t0, 'تغيّرَ بـ' + (s.total - t0));

  console.log('\n④ الزيادةُ ذرّيّةٌ تحتَ التزامن');
  const t1 = s.total;
  await Promise.all(Array.from({ length: 25 }, () => visit()));
  s = await (await stats()).json();
  ok('‏٢٥ زيارةً متزامنةً ⇒ +٢٥ بلا ضياع', s.total === t1 + 25, 'وجِد +' + (s.total - t1));

  console.log('\n⑤ المفتاحُ يحرسُ الأرقام');
  ok('بلا مفتاحٍ ⇒ ٤٠٣', (await stats('')).status === 403);
  ok('بمفتاحٍ خطأٍ ⇒ ٤٠٣', (await stats('shoogp2027')).status === 403);
  ok('بمفتاحٍ أقصرَ ⇒ ٤٠٣', (await stats('shoogp')).status === 403);
  ok('بالمفتاحِ الصحيحِ ⇒ ٢٠٠', (await stats()).status === 200);

  console.log('\n⑥ المقارنةُ الساعيّة');
  s = await (await stats()).json();
  ok('‏`refDay` قبلَ اليومِ بسبعة', s.refDay === new Date(Date.UTC(
    ...today.split('-').map((v, i) => i === 1 ? +v - 1 : +v)) - 7 * 864e5).toISOString().slice(0, 10),
    'وجِد ' + s.refDay);
  ok('بلا ساعاتٍ منقولةٍ ⇒ `refHasHours:false`', s.refHasHours === false);
  ok('‏`atHour` ساعةٌ صالحة', Number.isInteger(s.atHour) && s.atHour >= 0 && s.atHour <= 23, 'وجِد ' + s.atHour);

  console.log('\n⑦ جدولُ الساعاتِ يمتلئُ فعلاً');
  const hrs = wrangler('d1', 'execute', 'shoogp-visits', '--local', '--json', '-y',
    '--command', `SELECT hour, visits FROM hits WHERE day = '${today}'`);
  const rows = JSON.parse(hrs)[0].results;
  ok('صفُّ ساعةٍ واحدٌ لليوم', rows.length === 1, 'وجِد ' + rows.length);
  ok('مجموعُ ساعاتِه = زياراتِ يومِه', rows[0].visits === s.today, rows[0].visits + ' ≠ ' + s.today);

  console.log('\n⑧ ترويسةُ الأصل');
  ok('أصلٌ مسموحٌ ⇒ ترويسةٌ مطابقة',
    (await stats()).headers.get('access-control-allow-origin') === ORIGIN);
  const foreign = await fetch(`${BASE}/stats?key=${KEY}`, { headers: { Origin: 'https://evil.example' } });
  ok('أصلٌ غريبٌ ⇒ بلا ترويسة', foreign.headers.get('access-control-allow-origin') === null);

  console.log('\n⑨ البذرُ آمنُ التكرار');
  const t2 = (await (await stats()).json()).total;
  wrangler('d1', 'execute', 'shoogp-visits', '--local', '--file=seed.sql', '-y');
  ok('إعادةُ البذرِ لا تُضاعِفُ شيئاً', (await (await stats()).json()).total === t2);

  console.log('\n⑩ قِمْعُ الكتب');
  const hit = (bk, st, ua = UA) => fetch(BASE + '/book', {
    method: 'POST', body: JSON.stringify({ book: bk, stage: st }),
    headers: { 'User-Agent': ua, Origin: ORIGIN, 'Content-Type': 'text/plain' },
  });
  ok('نبضةٌ صالحةٌ ⇒ ٢٠٤', (await hit('g4-sci', 'open')).status === 204);
  await hit('g4-sci', 'open'); await hit('g1-en', 'open');
  await hit('g4-sci', 'lock'); await hit('g4-sci', 'code');
  s = await (await stats()).json();
  ok('مجموعُ open = ٣', s.funnel.open === 3, 'وجِد ' + s.funnel.open);
  ok('مجموعُ lock = ١', s.funnel.lock === 1, 'وجِد ' + s.funnel.lock);
  ok('مجموعُ code = ١', s.funnel.code === 1, 'وجِد ' + s.funnel.code);
  ok('كتابانِ في التفصيل', s.books.length === 2, 'وجِد ' + s.books.length);
  ok('الأقربُ للشراءِ أوّلاً', s.books[0].book === 'g4-sci', 'وجِد ' + s.books[0].book);
  ok('تفصيلُ g4-sci صحيح',
    s.books[0].open === 2 && s.books[0].lock === 1 && s.books[0].code === 1,
    JSON.stringify(s.books[0]));
  ok('الكتبُ لا تُغيّرُ عدّادَ الأجهزة', s.today === (await (await stats()).json()).today);

  console.log('\n⑪ الجسمُ لا يُوثَقُ به');
  ok('مفتاحٌ بمحارفَ غريبةٍ ⇒ ٤٠٠', (await hit('g4 sci!<script>', 'open')).status === 400);
  ok('مفتاحٌ فارغٌ ⇒ ٤٠٠', (await hit('', 'open')).status === 400);
  ok('مفتاحٌ أطولُ من ٢٤ ⇒ ٤٠٠', (await hit('g'.repeat(25), 'open')).status === 400);
  ok('مرحلةٌ مجهولةٌ ⇒ ٤٠٠', (await hit('g4-sci', 'buy')).status === 400);
  ok('جسمٌ غيرُ JSON ⇒ ٤٠٠', (await fetch(BASE + '/book', {
    method: 'POST', body: 'مرحبا', headers: { 'User-Agent': UA },
  })).status === 400);
  ok('زاحفٌ ⇒ ٢٠٤ بلا عدّ', (await hit('g2-math', 'code', 'Googlebot/2.1')).status === 204);
  s = await (await stats()).json();
  ok('ولم يدخلِ الزاحفُ الجدول', s.books.length === 2 && s.funnel.code === 1);

  console.log('\n⑫ المسالكُ غيرُ المعروفة');
  ok('مسلكٌ مجهولٌ ⇒ ٤٠٤', (await fetch(BASE + '/x')).status === 404);
  ok('‏GET على /visit ⇒ ٤٠٤', (await fetch(BASE + '/visit')).status === 404);
} finally {
  dev.kill('SIGTERM');
}

console.log(`\n${fail ? '❌' : '✅'} نجحَ ${pass} · أخفقَ ${fail}`);
process.exit(fail ? 1 : 0);
