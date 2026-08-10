/* ═══════════════════════════════════════════════════════════════════
   لوحُ فحصٍ بصريٍّ لقشرةِ «ديني حياتي» العاجية (skin-ivory) — أداةُ تطويرٍ لا واجهة
   ───────────────────────────────────────────────────────────────────
   يعرضُ **كلَّ زرٍّ تشمَلُه القشرةُ** وكلَّ حالةٍ من حالاتِه في طبقةٍ واحدةٍ **بمقياسِ
   ١:١ بلا زومِ `fit.js`**، فتُرى هيئةُ الطرفَينِ والتباينُ بالبكسلِ لا مصغَّرةً إلى ٤٠٪.
   وهو الفارقُ الذي جعلَ فحصَ الشكلِ ممكناً أصلاً: في الصفحةِ الحيّةِ يبلغُ زومُ
   `.fit-lock` ‏0.40، فتنكمشُ الكبسولةُ ٧٨px إلى ٣١px ويستحيلُ الحكمُ على قوسِ الطرف.

   الاستعمال (طرفيةُ المتصفّح، والموقعُ مفتوحٌ على أيِّ درسٍ من ديني حياتي):
       await (await fetch('/tools/qa-ivory-panel.js')).text().then(eval)
       ShoogpIvoryQA.open()      // يفتحُ اللوح
       ShoogpIvoryQA.close()     // يُزيلُه
   ⚠️ لا يُستدعى من المنصّةِ نفسِها ولا يُحمَّلُ في `index.html` — أداةُ فحصٍ يدويّة.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ID = 'shoogpIvoryQA';

  var MARKUP =
    '<div class="shoogp-ui subj-deeny skin-ivory">' +
    '<div class="qframe qf-l qf-hasfill">' +
    /* نافذةٌ مسطَّحةٌ عمداً: بلا `position`/`clip-path`/`overflow` كي لا يُقَصَّ الوهجُ
       أثناءَ الفحص — القصُّ نفسُه يُقاسُ بـ`ShoogpAudit` لا بالعين. */
    '<div class="qwin" style="position:static;width:820px;overflow:visible;clip-path:none">' +

      '<div class="opts" style="gap:10px">' +
        '<button class="opt">خيارٌ من متعدد — سطرٌ واحد</button>' +
        '<button class="opt">خيارٌ طويلٌ يلتفُّ سطرين ليُرى أنّ الطرفَينِ يبقيانِ نصفَي دائرةٍ مهما طالَ النصُّ وامتدَّ</button>' +
        '<button class="opt correct">خيارٌ صحيح</button>' +
        '<button class="opt wrong">خيارٌ خطأ</button>' +
        '<button class="opt" disabled>خيارٌ معطَّل</button>' +
      '</div>' +

      '<div class="tf-btns" style="margin-top:12px">' +
        '<button class="tf">صواب</button><button class="tf tf-correct">صواب</button>' +
        '<button class="tf tf-wrong">خطأ</button></div>' +

      '<div class="excl" style="margin-top:12px">' +
        '<button class="excl-opt">استبعاد</button>' +
        '<button class="excl-opt correct">استبعادٌ صحيح</button>' +
        '<button class="excl-opt wrong">استبعادٌ خطأ</button></div>' +

      '<div class="matchwrap" style="margin-top:12px"><div class="match">' +
        '<div class="mcol"><div class="mitem left">طرفٌ أيسر</div>' +
        '<div class="mitem left selected">محدَّد</div></div>' +
        '<div class="mcol"><div class="mitem right">طرفٌ أيمن</div>' +
        '<div class="mitem right matched">موصولٌ صحيح</div></div></div></div>' +

      '<ol class="seqlist" style="margin-top:12px">' +
        '<li class="seqitem" data-pos="١"><span class="seq-txt">عنصرُ ترتيبٍ تسلسليّ</span>' +
        '<span class="seq-grip">⋮⋮</span></li>' +
        '<li class="seqitem correct" data-pos="٢"><span class="seq-txt">عنصرٌ في مكانِه</span>' +
        '<span class="seq-grip">⋮⋮</span></li></ol>' +

      '<div class="bank fillbank" style="margin-top:12px"><div class="bt">الكلمات:</div>' +
        '<div class="chips"><div class="chip">بطاقة</div><div class="chip ok">صحيحة</div>' +
        '<div class="chip no">خطأ</div><div class="chip used">مستعملة</div>' +
        '<div class="chip">بطاقةٌ نصُّها جملةٌ كاملةٌ تلتفُّ سطرين داخلَ الكبسولة</div></div></div>' +

      '<p class="fbtext" style="margin-top:12px">جملةٌ فيها <span class="blank">______</span>' +
        ' وفراغٌ <span class="blank filled">مملوء</span>' +
        ' وآخرُ <span class="blank filled correct">صحيح</span>' +
        ' ورابعٌ <span class="blank filled wrong">خطأ</span>.</p>' +

      '<div class="classify" style="margin-top:12px"><div class="grp-row">' +
        '<div class="grp"><div class="grp-h">مجموعةٌ أولى</div>' +
        '<div class="grp-drop"><div class="chip">عنصر</div></div></div>' +
        '<div class="grp"><div class="grp-h">مجموعةٌ ثانيةٌ عنوانُها أطول</div>' +
        '<div class="grp-drop over"></div></div></div></div>' +

      '<div class="jr" style="margin-top:12px"><div class="jr-why">' +
        '<div class="bt jr-bt">لماذا؟</div><div class="opts jr-reasons">' +
        '<button class="opt">سببٌ نثريٌّ متعدّدُ الأسطرِ يُقرأُ مصفوفَ الحافّةِ لا مركزاً مُشرشَراً، ' +
        'ويمتدُّ ليُظهرَ التفافَ الكبسولةِ وثباتَ طرفَيها.</button></div></div></div>' +

      '<div class="stage" style="position:relative;height:150px;margin-top:12px;background:rgba(0,0,0,.18)">' +
        '<div class="target" style="left:25%;top:50%">؟</div>' +
        '<div class="target filled" style="left:55%;top:50%">مملوء</div>' +
        '<div class="target filled correct" style="left:82%;top:50%">صحيح</div></div>' +

      '<div class="cpalette" style="margin-top:12px">' +
        '<div class="cswatch"><span class="bucket-wrap">🪣</span><span class="cswatch-name">أحمر</span></div>' +
        '<div class="cswatch sel"><span class="bucket-wrap">🪣</span><span class="cswatch-name">أزرق</span></div></div>' +

      '<div class="fb qfb good" style="margin-top:10px">🎉 أحسنت!</div>' +
      '<div class="fb qfb bad">حاول مرة أخرى</div>' +

    '</div></div></div>';

  function open() {
    close();
    var p = document.createElement('div');
    p.id = ID;
    /* `zoom:1` صريحٌ: `fit.js` يضعُ الزومَ على `<html>` فيرثُه كلُّ شيء، وإلغاؤه هنا
       وحدَه يُعيدُ المقياسَ ١:١ للّوحِ دونَ المساسِ بالصفحةِ تحتَه. */
    p.style.cssText = 'position:fixed;inset:0;z-index:99999;zoom:1;overflow:auto;' +
                      'padding:16px;background:#2b5748';
    p.innerHTML = MARKUP;
    document.body.appendChild(p);
    return p;
  }
  function close() { var e = document.getElementById(ID); if (e) e.remove(); }

  window.ShoogpIvoryQA = { open: open, close: close };
  return 'ShoogpIvoryQA جاهز — ShoogpIvoryQA.open()';
})()
