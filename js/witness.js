/* ═══════════════════════════════════════════════════════════════
   شاهدُ الحصّة — ورقةٌ واحدةٌ جاهزةٌ للطبعِ تُلصَقُ في ملفِّ إنجازِ المعلّمة.

   **العلّةُ التي بُنيَ لها:** ملفُّ الإنجازِ والشواهدُ عبءٌ متكرّرٌ على المعلّمة —
   تُصوِّرُ وتكتبُ وتربطُ كلَّ نشاطٍ بهدفِه المرمَّزِ يدوياً. والمنصّةُ تملكُ هذا
   الربطَ **سؤالاً سؤالاً** في حقلِ `objective` (‏§قاعدة ربط السؤال بالهدف في
   `CLAUDE.md`)، فإخراجُ الورقةِ آلياً لا يحتاجُ بياناً جديداً — يحتاجُ عرضاً.

   ⚠️ **وضعُ المطوّرِ وحدَه مبدئياً (قرارُ المالك ٢٠٢٦-٠٩-٢٠).** والحجبُ
   **عندَ البناءِ لا بالإخفاء**: بلا وضعِ مطوّرٍ لا يوجدُ زرٌّ في الصفحةِ أصلاً —
   العُرفُ نفسُه المتّبَعُ في زرِّ القفلِ التطويريِّ (`buildBtn` في `js/unlock.js`).

   **ولغتُها عربيةٌ في كلِّ المواد — حتى الإنجليزية.** فهي مستندٌ تقرؤُه المعلّمةُ
   والمشرفة، فحالُها حالُ نافذةِ الرمزِ التي بقيت عربيةً في كتابِ الإنجليزيةِ
   (‏§استثناءُ `uiLanguageOverride` في `CLAUDE.md`). وعنوانُ الدرسِ يُعرَضُ كما هو
   بـ`dir="auto"` فيُقرَأُ الإنجليزيُّ سليماً داخلَ صفحةٍ عربية.

   **ولا يقرأُ هذا الملفُّ بياناتَ المنصّةِ بنفسِه**: `DATA` و`Q_LABEL` معرَّفانِ
   بـ`let/const` في سكربتٍ كلاسيكيٍّ فلا يصيرانِ خاصيّةً على `window`، فيُمرِّرُهما
   `js/app.js` في سياقِ النداء. وهذا الفصلُ مقصودٌ كذلك: هناك البيانات، وهنا الورقة.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var LV_AR = { knowledge:'معرفة', application:'تطبيق', reasoning:'استدلال', evaluation:'تقويم' };
  var LV_ORDER = ['knowledge','application','reasoning','evaluation'];
  var DAYS = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  var TEACHER_KEY = 'shoogp-wit-teacher';
  var SCHOOL_KEY  = 'shoogp-wit-school';

  /* الأرقامُ الهنديةُ وجوباً كبقيّةِ المنصّة (‏§صيغةُ الترقيم في `CLAUDE.md`) */
  function arNum(n){ return String(n).replace(/[0-9]/g, function(d){ return '٠١٢٣٤٥٦٧٨٩'[+d]; }); }
  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c];
    });
  }
  function pad2(n){ return (n < 10 ? '0' : '') + n; }
  function todayAr(){
    var d = new Date();
    return DAYS[d.getDay()] + ' ' + arNum(pad2(d.getDate()) + ' / ' + pad2(d.getMonth()+1) + ' / ' + d.getFullYear());
  }
  /* قراءةُ/كتابةُ ما يتكرّرُ في كلِّ ورقةٍ (الاسمُ والمدرسة) — كلُّ مساسٍ بالتخزينِ
     محروسٌ: المتصفّحُ قد يرفضُه في التصفّحِ الخاصِّ أو بحجبِ بياناتِ الموقع. */
  function memGet(k){ try { return localStorage.getItem(k) || ''; } catch(e){ return ''; } }
  function memSet(k, v){ try { localStorage.setItem(k, v); } catch(e){} }

  /* ── تجميعُ الأهداف: مفتاحُها الرمزُ إن وُجد، وإلا نصُّها ──
     صيغةُ الحقلِ في البيانات: «‏1Bp2: يتعلّم أنّ النباتات…» — فما قبلَ أوّلِ نقطتَين
     رمزٌ وما بعدَه نصّ. وبعضُ الأسئلةِ قد تأتي بلا رمزٍ فلا يُفتَرَضُ وجودُه. */
  function collectObjectives(qs){
    var map = {}, order = [];
    (qs || []).forEach(function(q){
      var raw = (q && q.objective) ? String(q.objective).trim() : '';
      if (!raw) return;
      var m = /^([^\s:：]{2,12})\s*[:：]\s*([\s\S]+)$/.exec(raw);
      var code = m ? m[1] : '', text = m ? m[2].trim() : raw;
      var key = code || text;
      if (!map[key]) { map[key] = { code:code, text:text, n:0, levels:{} }; order.push(key); }
      map[key].n++;
      if (q.level) map[key].levels[q.level] = true;
    });
    return order.map(function(k){ return map[k]; });
  }
  function levelsAr(levels){
    var out = LV_ORDER.filter(function(l){ return levels[l]; }).map(function(l){ return LV_AR[l]; });
    return out.length ? out.join(' · ') : '—';
  }

  /* ── بناءُ الورقةِ وفتحُها ── */
  var wrap = null;

  function close(){
    if (!wrap) return;
    document.removeEventListener('keydown', onKey, true);
    if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    wrap = null;
  }
  function onKey(e){ if (e.key === 'Escape'){ e.stopPropagation(); close(); } }

  function open(ctx){
    close();
    ctx = ctx || {};
    var qs    = ctx.questions || [];
    var objs  = collectObjectives(qs);
    var label = (typeof ctx.typeLabel === 'function') ? ctx.typeLabel : function(t){ return t; };
    /* الشارةُ تحملُ رمزاً تعبيرياً في `Q_LABEL` («🌿 سحب وإفلات») — يُنزَعُ في
       مستندٍ مطبوعٍ: الرموزُ التعبيريةُ تُطبَعُ مربّعاتٍ على كثيرٍ من الطابعات.
       مرحلتان لا واحدة: الأزواجُ البديلةُ (‏🌿 · 💯 · 🔠) خارجَ المستوى الأساسيِّ
       فلا يبلغُها هروبُ `\uXXXX`، ثمّ الرموزُ الأساسيةُ (‏✅ · ⚖️ · ☀️) ومحدِّدا
       الهيئةِ والوصل. ونطاقُ المرحلةِ الثانيةِ يقفُ عندَ `➿` فلا يمسُّ حرفاً
       عربياً (‏«ـَ التشكيل» تطويلٌ وفتحةٌ في كتلةِ العربية، فتسلم). */
    function typeName(t){
      return String(label(t) || t)
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
        .replace(/[←-➿️‍]/g, '')
        .trim();
    }

    wrap = document.createElement('div');
    wrap.className = 'wit-wrap';

    /* ⚠️ عمودُ الرمزِ **لا يُطبَعُ إلا إن وُجدَ رمزٌ فعلاً** — مقيسٌ على كلِّ أسئلةِ
       المنصّةِ (٢٠٢٦-٠٩-٢٠): ١٤٣٦ سؤالاً من ٣٥٦١ تحملُ رمزاً وزارياً (العلومُ
       والرياضياتُ) و**الباقي أهدافُه نصٌّ بلا ترميز** (أحبُّ لغتي · ديني حياتي ·
       الإنجليزيةُ · عالمي الرقميّ). فعمودٌ ثابتٌ كان سيخرجُ شُرَطاً في ستّينَ
       بالمئةِ من الكتب. والإحالةُ في جدولِ الأنشطةِ **برقمِ الهدفِ في هذه الورقةِ**
       لا برمزِه، فتعملُ في المادّتَين سواءً. */
    var hasCodes = objs.some(function(o){ return !!o.code; });
    var objNo = {};   // مفتاحُ الهدف → رقمُه في الورقة
    objs.forEach(function(o, i){ objNo[o.code || o.text] = i + 1; });

    var rows = objs.map(function(o, i){
      return '<tr>'+
        '<td class="mid">'+ arNum(i+1) +'</td>'+
        (hasCodes ? '<td class="mid">'+ (o.code ? '<span class="wit-code">'+esc(o.code)+'</span>' : '—') +'</td>' : '')+
        '<td>'+ esc(o.text) +'</td>'+
        '<td class="mid">'+ esc(levelsAr(o.levels)) +'</td>'+
        '<td class="mid">'+ arNum(o.n) +'</td>'+
      '</tr>';
    }).join('');
    if (!rows) rows = '<tr><td colspan="'+ (hasCodes ? 5 : 4) +'" class="mid">لا أهدافَ مسجَّلةٌ في أسئلةِ هذا الدرس</td></tr>';

    var acts = qs.map(function(q, i){
      var raw = (q && q.objective) ? String(q.objective).trim() : '';
      var m = /^([^\s:：]{2,12})\s*[:：]\s*([\s\S]+)$/.exec(raw);
      var no = objNo[m ? m[1] : raw];
      return '<tr>'+
        '<td class="mid">'+ arNum(i+1) +'</td>'+
        '<td>'+ esc(typeName(q.type)) +'</td>'+
        '<td class="mid">'+ esc(q.level ? (LV_AR[q.level] || q.level) : '—') +'</td>'+
        '<td class="mid">'+ (no ? 'هدف '+arNum(no) : '—') +'</td>'+
      '</tr>';
    }).join('');

    wrap.innerHTML =
      '<div class="wit-actions">'+
        '<button type="button" class="wit-btn wit-print">🖨️ طبع / حفظ PDF</button>'+
        '<button type="button" class="wit-btn ghost wit-close">إغلاق</button>'+
      '</div>'+
      '<div class="wit-sheet" dir="rtl">'+
        '<div class="wit-head">'+
          '<img src="images/logo-mark.png" alt="شوجب">'+
          '<div class="wit-head-t">'+
            '<div class="wit-h1">شاهدُ حصّة</div>'+
            '<div class="wit-h2">نشاطٌ تفاعليٌّ مُنفَّذٌ على السبّورةِ الذكيّة — منصّةُ شوجب التفاعلية</div>'+
          '</div>'+
        '</div>'+

        '<div class="wit-grid">'+
          '<span class="wit-k">الكتاب</span><span class="wit-v" dir="auto">'+ esc(ctx.book || '—') +'</span>'+
          '<span class="wit-k">الصف</span><span class="wit-v">'+ esc(ctx.grade ? 'الصف '+ctx.grade : '—') +'</span>'+

          '<span class="wit-k">الفصل الدراسيّ</span><span class="wit-v">'+ esc(ctx.term || '—') +'</span>'+
          '<span class="wit-k">التاريخ</span><span class="wit-v"><input class="wit-field wit-date" value="'+ esc(todayAr()) +'"></span>'+

          '<span class="wit-k">الوحدة</span><span class="wit-v wide" dir="auto">'+ esc(ctx.unit || '—') +'</span>'+
          '<span class="wit-k">الدرس</span><span class="wit-v wide" dir="auto">'+ esc(ctx.lesson || '—') +'</span>'+

          '<span class="wit-k">المعلّمة</span><span class="wit-v"><input class="wit-field wit-teacher" value="'+ esc(memGet(TEACHER_KEY)) +'" placeholder="الاسم"></span>'+
          '<span class="wit-k">المدرسة</span><span class="wit-v"><input class="wit-field wit-school" value="'+ esc(memGet(SCHOOL_KEY)) +'" placeholder="اسم المدرسة"></span>'+

          '<span class="wit-k">عددُ الأنشطة</span><span class="wit-v">'+ arNum(ctx.total || qs.length || 0) +'</span>'+
          '<span class="wit-k">أُجيبَ صحيحاً</span><span class="wit-v">'+ arNum(ctx.good || 0) +' من '+ arNum(ctx.total || qs.length || 0) +'</span>'+
        '</div>'+

        '<div class="wit-sec">أهدافُ الدرسِ المُغطّاة</div>'+
        '<table class="wit-tbl"><thead><tr>'+
          '<th style="width:7%">#</th>'+
          (hasCodes ? '<th style="width:12%">الرمز</th>' : '')+
          '<th>الهدف</th>'+
          '<th style="width:20%">المستوى المعرفيّ</th><th style="width:10%">الأنشطة</th>'+
        '</tr></thead><tbody>'+ rows +'</tbody></table>'+

        '<div class="wit-sec">تفصيلُ الأنشطةِ المنفَّذة</div>'+
        '<table class="wit-tbl"><thead><tr>'+
          '<th style="width:10%">#</th><th>نوعُ النشاطِ التفاعليّ</th>'+
          '<th style="width:20%">المستوى</th><th style="width:16%">الهدف</th>'+
        '</tr></thead><tbody>'+ acts +'</tbody></table>'+

        '<div class="wit-sec">شاهدٌ مصوَّر</div>'+
        '<div class="wit-photo">'+
          '<div class="wit-drop">موضعُ صورةِ الحصّة — أرفِقي صورةً من جهازِك، أو اطبعي الورقةَ والصقي الصورةَ هنا</div>'+
          '<div class="wit-pick"><label for="witFile">📎 إرفاقُ صورةٍ من الجهاز…</label>'+
          '<input id="witFile" type="file" class="wit-file" accept="image/*"></div>'+
        '</div>'+

        '<div class="wit-sec">ملاحظاتُ المعلّمة</div>'+
        '<textarea class="wit-notes" placeholder="تأمّلٌ في الحصّة، استجابةُ التلاميذ، ما يُبنى عليه في الحصّةِ القادمة…"></textarea>'+

        '<div class="wit-foot">'+
          '<span>التوقيع: ………………………………</span>'+
          '<span>أُنشئَت بمنصّةِ <b>شوجب</b> التفاعلية — shoogp.com</span>'+
        '</div>'+
      '</div>';

    document.body.appendChild(wrap);

    wrap.querySelector('.wit-close').onclick = close;
    document.addEventListener('keydown', onKey, true);

    /* الاسمُ والمدرسةُ يُحفظانِ فلا تُعيدَ كتابتَهما في كلِّ ورقة.
       والحفظُ عندَ الطبعِ أيضاً لا عندَ `change` وحدَه: الكتابةُ بلا مغادرةِ الحقلِ
       لا تُطلِقُ `change`، فلو طبعت المعلّمةُ بلمسةٍ من لوحةِ مفاتيحِ السبّورةِ
       دونَ أن يفقدَ الحقلُ تركيزَه ضاعَ ما كتبته. */
    var t = wrap.querySelector('.wit-teacher'), s = wrap.querySelector('.wit-school');
    function keep(){ memSet(TEACHER_KEY, t.value); memSet(SCHOOL_KEY, s.value); }
    t.addEventListener('change', keep);
    s.addEventListener('change', keep);
    wrap.querySelector('.wit-print').onclick = function(){ keep(); window.print(); };

    /* الصورةُ تُقرَأُ محلياً ولا تُرفَعُ إلى أيِّ مكان — `FileReader` في المتصفّحِ وحدَه */
    var file = wrap.querySelector('.wit-file'), drop = wrap.querySelector('.wit-drop');
    file.addEventListener('change', function(){
      var f = file.files && file.files[0];
      if (!f) return;
      var rd = new FileReader();
      rd.onload = function(){ drop.innerHTML = '<img alt="صورة الحصة" src="'+ rd.result +'">'; };
      rd.readAsDataURL(f);
    });

    wrap.scrollTop = 0;
  }

  /* ── زرُّ الاستدعاءِ في شاشةِ النتيجة ──
     يُنادى من `js/app.js` بعدَ بناءِ تقريرِ «أنهيت الدرس!». بلا وضعِ مطوّرٍ
     يعودُ بلا أثرٍ فلا يُضافُ عنصرٌ إلى الصفحة. */
  function mount(host, ctx){
    if (!host) return;
    if (!(window.ShoogpLock && ShoogpLock.isDevMode())) return;
    var box = document.createElement('div');
    box.className = 'wit-launch';
    box.innerHTML = '<button type="button" class="wit-launch-btn">🧾 شاهدُ الحصّة</button>'+
      '<span class="wit-launch-note">ورقةٌ جاهزةٌ لملفِّ الإنجاز — وضعُ المطوّر</span>';
    box.querySelector('.wit-launch-btn').onclick = function(){ open(ctx); };
    host.appendChild(box);
  }

  window.ShoogpWitness = { mount: mount, open: open, close: close };
})();
