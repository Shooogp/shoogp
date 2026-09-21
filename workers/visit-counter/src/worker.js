/* ═══════════════════════════════════════════════════════════════════
   شوجب — عدّادُ الدخول (Cloudflare Worker + D1)
   ═══════════════════════════════════════════════════════════════════
   **بديلُ سيرِ n8n «شوجب — عدّاد الدخول»، ويعيدُ الشكلَ نفسَه حرفياً** فلا يتغيّرُ
   في المنصّةِ إلا عنوانا `VISIT_URL` و`STATS_URL` في `js/unlock.js`.

   ── لماذا نُقِلَ عن n8n (سببٌ مقيسٌ لا تفضيل) ──
   رصيدُ تنفيذاتِ n8n **حسابٌ واحدٌ مشتركٌ مع مسارَي تفعيلِ رموزِ الشراء**، والعدّادُ
   ينفقُ تنفيذاً لكلِّ جهازٍ في اليوم — أي مئاتٍ يومياً مقابلَ عشراتٍ شهرياً للتفعيل.
   فاستنفدَ الرصيدَ في ستّةِ أيّامٍ (تنفيذ `3292`، ٢٠٢٦-٠٩-١٣:
   `Execution limit reached`)، **فتوقّفَ معه تفعيلُ الرموزِ صامتاً** — تدفعُ المعلّمةُ
   ولا يُفتَحُ لها الكتاب. والتفصيلُ في `CLAUDE.md` §رصيدُ تنفيذاتِ n8n مشترك.
   هنا: ‏100,000 طلبٍ يومياً في الخطّةِ المجّانية — أي نحوُ ٣٠٠ ضعفِ الاستهلاكِ الحاليّ.

   ── لماذا D1 لا KV ──
   العدُّ **قراءةٌ ثمّ كتابة**، وKV متّسقٌ اتّساقاً نهائياً (eventual) فتتسابقُ
   الزياراتُ المتزامنةُ وتضيعُ زيادات — **والذروةُ المقيسةُ ٨٨ جهازاً في ساعتَين**.
   وسقفُ كتابةِ KV المجّانيِّ ‏1,000 يومياً، وأعلى يومٍ مقيسٍ ٦٣٠ — أي على الحافّة.
   أمّا D1 فَـ`ON CONFLICT DO UPDATE` فيه **ذرّيٌّ في عبارةٍ واحدة**، فلا سباقَ
   ولا زيادةٌ تضيع.

   ── ما يُخزَّن ــ ولا هويّةَ فيه ──
   جدولانِ لا غير: `days(day, visits)` و`hits(day, hour, visits)`. **لا IP ولا
   مُعرِّفٌ ولا كوكيز ولا بصمةُ متصفّح** — وفاءً بنصِّ `privacy.html` («ولا نستعملُ
   أدواتِ تتبّعٍ ولا إعلاناتٍ ولا ملفّاتِ ارتباطٍ للتتبّع»). ووحدةُ العدِّ «جهازٌ
   فتحَ الموقعَ اليوم» يحرسُها `localStorage` في المتصفّحِ نفسِه لا الخادم.

   ── الجديدُ الذي لم يكن ممكناً في n8n ──
   جدولُ `hits` يحفظُ **ساعةَ الزيارة**، فيصيرُ «الإثنينُ الماضي **حتى هذه الساعةِ
   نفسِها**» مقارنةً حقيقيةً بدلَ مقارنةِ نصفِ يومٍ بيومٍ كامل. وكان متعذّراً هناك
   لأنّه يضاعفُ الكتابةَ في جدولٍ محدودِ الرصيد؛ وهنا بلا كلفةٍ تُذكَر.
   ⚠️ **ولا يمتلئُ إلا بأسبوعٍ من التشغيل** — قبلَه يُرجِعُ `refHasHours:false`
   والشارةُ تُخفي السطرَ من تلقائِها. */

const DAY_FMT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Muscat', year: 'numeric', month: '2-digit', day: '2-digit',
});
const HOUR_FMT = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Muscat', hour: '2-digit', hour12: false,
});

/* اليومُ والساعةُ **بتوقيتِ مسقطِ على الخادم** لا بساعةِ جهازِ المعلّمة — كما كانت
   عقدةُ «يوم مسقط» في n8n تماماً. فجسمُ الطلبِ لا يُوثَقُ به ولا يُقرَأُ أصلاً:
   ساعةٌ مغلوطةٌ في لوحٍ مدرسيٍّ قديمٍ كانت ستكتبُ الزيارةَ في يومٍ آخر. */
const muscatDay = (d = new Date()) => DAY_FMT.format(d);
const muscatHour = (d = new Date()) => Number(HOUR_FMT.format(d)) % 24;

function shiftDay(day, delta) {
  const [y, m, dd] = day.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, dd));
  t.setUTCDate(t.getUTCDate() + delta);
  return t.toISOString().slice(0, 10);
}

/* أصولٌ مسمّاةٌ لا `*` — كان ويبهوكُ n8n يقبلُ كلَّ أصلٍ، ولا داعيَ لذلك.
   (‏`sendBeacon` بنوعِ `text/plain` طلبٌ بسيطٌ بلا preflight، فالترويسةُ هنا
   لأجلِ `/stats` وحدَها عملياً، وتُكتَبُ على الاثنَين توحيداً.) */
const ALLOWED = new Set(['https://shoogp.com', 'https://www.shoogp.com']);

function cors(request, extra = {}) {
  const origin = request.headers.get('Origin') || '';
  const head = { 'Cache-Control': 'no-store', ...extra };
  if (ALLOWED.has(origin)) {
    head['Access-Control-Allow-Origin'] = origin;
    head['Vary'] = 'Origin';
  }
  return head;
}

/* حجبُ الزواحفِ — مقابلُ `ignoreBots:true` في ويبهوكِ n8n. وبلا هذا يعدُّ الموقعُ
   كلَّ فاحصِ روابطٍ في واتسابَ زائراً، فينتفخُ الرقمُ في يومِ نشرِ الرابطِ خاصّة. */
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|monitor|headless|curl|wget|python-requests|axios|node-fetch|scan/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: cors(request, { 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Max-Age': '86400' }),
      });
    }

    if (url.pathname === '/visit' && request.method === 'POST') return visit(request, env);
    if (url.pathname === '/stats' && request.method === 'GET') return stats(request, env, url);
    return new Response('not found', { status: 404, headers: cors(request) });
  },
};

/* ───────────────────────── تسجيلُ زيارة ─────────────────────────
   يردُّ ٢٠٤ بلا جسمٍ كما كان `noResponseBody` في n8n — **لكنّ الفارقَ جوهريّ:
   هناك كانَ الردُّ `onReceived` أي قبلَ تنفيذِ السيرِ أصلاً، فالنجاحُ لا يدلُّ على
   أنّ الصفَّ كُتِب. وهنا لا يُردُّ إلا بعدَ نجاحِ الكتابةِ فعلاً**، والفشلُ يردُّ ٥٠٠.
   فصارَ رمزُ الاستجابةِ صادقاً ويصلحُ للاعتمادِ عليه لاحقاً في إعادةِ المحاولة. */
async function visit(request, env) {
  if (BOT.test(request.headers.get('User-Agent') || '')) {
    return new Response(null, { status: 204, headers: cors(request) });
  }

  const now = new Date();
  const day = muscatDay(now);
  const hour = muscatHour(now);

  try {
    await env.DB.batch([
      env.DB.prepare(
        'INSERT INTO days (day, visits) VALUES (?1, 1) ON CONFLICT(day) DO UPDATE SET visits = visits + 1'
      ).bind(day),
      env.DB.prepare(
        'INSERT INTO hits (day, hour, visits) VALUES (?1, ?2, 1) ON CONFLICT(day, hour) DO UPDATE SET visits = visits + 1'
      ).bind(day, hour),
    ]);
  } catch (e) {
    return new Response('db', { status: 500, headers: cors(request) });
  }
  return new Response(null, { status: 204, headers: cors(request) });
}

/* ───────────────────────── قراءةُ الأرقام ─────────────────────────
   ⚠️ **المفتاحُ سترٌ لا أمان:** هو في جافاسكربتِ الصفحةِ فيراه من فتحَ المصدر —
   وكذلك كان في n8n. ولا خطرَ فيه: أسوأُ ما يُتيحُ قراءةَ أعدادٍ مجمّعةٍ لا بيانات.
   ويُقارَنُ بطولٍ ثابتٍ كي لا يُسرِّبَ زمنُ المقارنةِ حروفَه حرفاً حرفاً. */
function sameKey(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function stats(request, env, url) {
  if (!sameKey(url.searchParams.get('key') || '', env.STATS_KEY || '')) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 403,
      headers: cors(request, { 'Content-Type': 'application/json; charset=utf-8' }),
    });
  }

  const now = new Date();
  const today = muscatDay(now);
  const hour = muscatHour(now);
  const yKey = shiftDay(today, -1);
  const refKey = shiftDay(today, -7);

  const [rowsRes, refRes] = await Promise.all([
    env.DB.prepare('SELECT day, visits FROM days ORDER BY day DESC').all(),
    env.DB.prepare('SELECT COALESCE(SUM(visits), 0) AS n, COUNT(*) AS c FROM hits WHERE day = ?1 AND hour <= ?2')
      .bind(refKey, hour).first(),
  ]);

  const rows = (rowsRes.results || []).map(r => ({ day: r.day, visits: Number(r.visits) || 0 }));
  let total = 0, todayN = 0, yest = 0;
  for (const r of rows) {
    total += r.visits;
    if (r.day === today) todayN = r.visits;
    if (r.day === yKey) yest = r.visits;
  }

  const body = {
    ok: true,
    total,
    today: todayN,
    yesterday: yest,
    days: rows.slice(0, 14),
    since: rows.length ? rows[rows.length - 1].day : null,
    /* الحقولُ الأربعةُ الأخيرةُ زائدةٌ على ما كان يُرجِعُه n8n — والشارةُ تتجاهلُها
       إن غابت، فالانتقالُ بينَ المصدرَينِ لا يكسرُ شيئاً في الاتّجاهَين. */
    refDay: refKey,
    refSoFar: Number(refRes && refRes.n) || 0,
    refHasHours: Boolean(refRes && Number(refRes.c) > 0),
    atHour: hour,
  };

  return new Response(JSON.stringify(body), {
    headers: cors(request, { 'Content-Type': 'application/json; charset=utf-8' }),
  });
}
