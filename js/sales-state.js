/* ═══════════════════════════════════════════════════════════════════
   شوجب — حالةُ البيعِ والفتحِ المجانيّ  (المصدرُ الوحيد)
   ═══════════════════════════════════════════════════════════════════
   **مفتاحانِ هنا وحدَهما يقرّرانِ حالَ الموقعِ كلِّه** — لا يُكرَّرانِ في صفحة:

   • `freeAll` — `true` ⇒ **كلُّ الوحداتِ مفتوحةٌ بلا رمز** في كلِّ الكتب
     (‏`isUnitLocked` في `js/unlock.js` يُرجِعُ `false`، وصفحةُ الألعابِ ترثُه منه)،
     ويظهرُ شريطُ الإعلانِ في الشاشةِ الرئيسية. **لا يمسُّ المنَحَ المحفوظة**:
     من فتحَت كتابَها برمزٍ يبقى مفتوحاً لها بعدَ إطفاءِ المفتاح.
   • `paused` — `true` ⇒ **الشراءُ موقوف**: تُخفى روابطُ الشراءِ ودليلُه
     (كلُّ عنصرٍ عليه `data-hide-when-paused`)، وتعرضُ `pay.html` و`guide.html`
     رسالةَ الإيقافِ مكانَ السلّة (العنصرُ `data-sales-paused-note`)، وتظهرُ نافذةُ
     الرمزِ معطَّلةً إن فُتِحَت (‏`SALES_PAUSED` في `js/unlock.js` يُقرَأُ من هنا).

   **والمفتاحانِ مستقلّان:** الشراءُ يُوقَفُ بلا فتحٍ (كما في ٢٠٢٦-٠٩-٠٥)، والفتحُ
   ممكنٌ والبيعُ قائم. و`until` نصُّ التاريخِ الظاهرُ في الشريطِ والرسالةِ فقط —
   **لا إقفالَ تلقائيَّ عندَه** (قرارُ المالك ٢٠٢٦-١٠-١٨): الفترةُ تنتهي بقرارِه،
   فإن مُدِّدَت بُدِّلَ النصُّ وحدَه.

   ⚠️ **وإيقافُ الشراءِ في الموقعِ لا يوقفُه في واتساب** — مسارُ «شوجب — استقبال
   واتساب» في n8n له مفتاحُه (عقدةُ «حالة البيع»)، ومساعدُ واتساب له تعليماتُه
   (‏`docs/whatsapp-assistant-prompt.md`). **فكلُّ قلبٍ لهذا الملفِّ يُقلَبُ معه هناك.**

   السجلّ: أسبوعُ شوجب المجانيّ — فُتِحَ ٢٠٢٦-١٠-١٨ بإعلانِ إنستغرام «حتى ٢٦ أكتوبر»،
   والشراءُ موقوفٌ معه (طلبُ ترخيصِ الجمعِ مع الوظيفةِ قيدَ النظر).

   لإعادةِ الوضعِ الطبيعيّ: `freeAll:false` و`paused:false` — ثمّ مفتاحُ n8n والمساعد.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var S = window.SHOOGP_SALES = {
    freeAll: true,
    paused:  true,
    title:   'أسبوع شوجب المجاني',
    until:   '٢٦ أكتوبر'
  };

  var root = document.documentElement;
  if (S.paused)  root.classList.add('sales-paused');
  if (S.freeAll) root.classList.add('free-all');

  /* الإخفاءُ بقاعدةٍ تُحقَنُ هنا لا في كلِّ صفحة — فيقعُ قبلَ الرسمِ بلا وميض،
     والملفُّ يُحمَّلُ في رأسِ الصفحةِ متزامناً لهذا. */
  var css =
    '.sales-paused [data-hide-when-paused]{display:none!important}' +
    '[data-sales-paused-note]{display:none}' +
    '.sales-paused [data-sales-paused-note]{display:block;margin:0 0 26px;padding:20px 22px;border-radius:18px;' +
      'background:linear-gradient(135deg,rgba(255,164,40,.16),rgba(201,162,39,.10));border:1px solid rgba(255,179,59,.55);' +
      'color:#F4EEE3;font-family:Cairo,Tajawal,sans-serif;line-height:1.75;text-align:center}' +
    '.paused-kicker{font-size:15px;font-weight:800;color:#FFB33B;letter-spacing:.2px}' +
    '.paused-title{font-size:22px;font-weight:900;margin:2px 0 6px}' +
    '.paused-body{font-size:16px;color:#DCE6F7;margin:0 0 14px}' +
    '.paused-go{display:inline-block;background:linear-gradient(180deg,#FFC24A,#F58A16);color:#14204a;' +
      'font-weight:900;font-size:16px;text-decoration:none;border-radius:999px;padding:9px 26px}' +
    '.paused-go:focus-visible{outline:3px solid #fff;outline-offset:3px}';
  var st = document.createElement('style');
  st.textContent = css;
  (document.head || root).appendChild(st);

  function fillNotes() {
    if (!S.paused) return;
    var notes = document.querySelectorAll('[data-sales-paused-note]');
    for (var i = 0; i < notes.length; i++) {
      notes[i].setAttribute('role', 'status');
      notes[i].innerHTML =
        '<div class="paused-kicker">🎁 ' + S.title + '</div>' +
        '<div class="paused-title">خدمة الشراء متوقفة مؤقتاً</div>' +
        '<p class="paused-body">' +
          (S.freeAll
            ? 'هدية شوجب للجميع: جميع الوحدات متاحة دون الحاجة إلى شراء أو رمز تفعيل حتى ' + S.until + '.'
            : 'نعتذر، الشراء غير متاح في الوقت الحالي، وسنعلن عودته قريباً.') +
        '</p>' +
        '<a class="paused-go" href="index.html">ادخلي إلى المنصّة</a>';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fillNotes);
  else fillNotes();
})();
