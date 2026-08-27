/* ═══════════════════════════════════════════════════════════════════════════
   سِجِلُّ رسومِ الإجابات — `qpics`
   ───────────────────────────────────────────────────────────────────────────
   بطاقاتُ التصنيفِ (`classify`) والاستبعادِ (`exclude`) كانت نصّاً خاماً. وفي
   الحلقةِ الأولى — والصفّانِ الأولُ والثاني خاصّةً — التلميذُ لَمّا يُتقنِ القراءةَ
   بعدُ، فالكلمةُ وحدَها تُحوّلُ سؤالَ العلومِ إلى اختبارِ قراءة. فيُعرَضُ **رسمٌ
   كبيرٌ والكلمةُ صغيرةً تحته**: الصورةُ تقودُ والنصُّ يسند.

   ▸ **الاشتراكُ صريحٌ لا تلقائيّ**: السؤالُ يحملُ `pics: true` فيطلبُ الرسوم.
     فلا يتغيّرُ درسٌ لم يُطلَبْ له ذلك، ولو تشاركَ الكلمةَ نفسَها.
   ▸ **المفتاحُ هو الكلمةُ نفسُها بعدَ التجريد** (بلا تشكيلٍ ولا «ال») — فالرسمُ
     الواحدُ يخدمُ كلَّ درسٍ يذكرُ الكلمةَ، ويُكتَبُ مرّةً واحدة.
   ▸ **الكلمةُ بلا رسمٍ تبقى نصّاً** كما كانت — لا فراغَ ولا كسر.

   الأسلوبُ البصريُّ: ورقةُ المواصفاتِ المعتمدةُ في `CLAUDE.md` — ملصقاتُ الفضاءِ
   الكرتونيةُ اللامعة: حدٌّ ‎#111111‎ مستديرُ الرؤوس، تدرّجُ ٣–٤ درجاتٍ بحزمٍ حادّةٍ
   من سلالمِ الألوانِ المعتمدة، لمعةٌ بيضاءُ على المنحني، بلا خطِّ أرضٍ ولا ظلٍّ
   مُلقًى، **وبلا أيِّ ملامحِ وجهٍ إطلاقاً**.

   السماكةُ ‎3‎ للحدِّ الخارجيِّ و‎2‎ للداخليِّ على لوحةِ ‎100‎ — لا ‎600‎ — لأنّ الأيقونةَ
   تُعرَضُ نحوَ ‎60px‎، فهذه القيمةُ تُبقي **السماكةَ المعروضةَ** مطابقةً لرسومِ
   الأسئلةِ الكبيرة (‎3‎ على ‎600‎ معروضةً بنحوِ ‎400px‎ ≈ ‎1.8px‎؛ و‎3‎ على ‎100‎ معروضةً
   بـ‎60px‎ ≈ ‎1.8px‎). فالقاعدةُ محفوظةٌ في أثرِها المعروضِ لا في رقمِها المجرّد.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* تجريدُ الكلمة: حذفُ التشكيلِ والتطويل، ثمّ أداةِ التعريف، ثمّ توحيدُ الألف.
     والترتيبُ مقصود: لو وُحِّدتِ الألفُ أوّلاً لصارت «ألماس» ← «الماس» فقُصَّت
     أداةَ تعريفٍ وهماً وبقيَ «ماس». */
  function key(s){
    var t = String(s == null ? '' : s).replace(/[ً-ْٰـ]/g, '').trim();
    t = t.replace(/^ال(?=.)/, '');
    return t.replace(/[أإآٱ]/g, 'ا').replace(/\s+/g, ' ');
  }

  function svg(label, body){
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" '
      + 'stroke-linejoin="round" role="img" aria-label="' + label + '">'
      + '<g stroke="#111111" stroke-width="3">' + body + '</g></svg>';
  }
  /* اللمعةُ البيضاءُ على السطحِ المنحني — بندٌ إلزاميٌّ في ورقةِ المواصفات */
  function gloss(cx, cy, rx, ry, deg, op){
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="#FFFFFF"'
      + ' stroke="none" opacity="' + (op || .5) + '" transform="rotate(' + (deg || -25) + ' ' + cx + ' ' + cy + ')"/>';
  }

  var RAW = {};

  /* ══ كائناتٌ حيّة ══════════════════════════════════════════════════════ */

  RAW['سمكة'] = svg('سمكة', [
    '<path d="M34,28 C36,17 42,11 50,9 C53,18 49,26 43,31 Z" fill="#0080C0" stroke-width="2"/>',
    '<path d="M32,72 C34,83 40,89 48,91 C51,82 47,75 41,70 Z" fill="#0080C0" stroke-width="2"/>',
    '<path d="M78,50 L93,35 L89,50 L93,65 Z" fill="#0080C0"/>',
    '<path d="M12,50 C12,34 27,22 44,22 C62,22 75,34 79,50 C75,66 62,78 44,78 C27,78 12,66 12,50 Z" fill="#00A0E0"/>',
    '<path d="M12,50 C12,34 27,22 44,22 L44,78 C27,78 12,66 12,50 Z" fill="#40C0FF" stroke="none"/>',
    '<path d="M12,50 C12,34 27,22 44,22 C62,22 75,34 79,50 C75,66 62,78 44,78 C27,78 12,66 12,50 Z" fill="none"/>',
    '<g fill="none" stroke="#0060A0" stroke-width="2">',
    '<path d="M28,30 C34,39 34,61 28,70"/><path d="M45,27 C52,37 52,63 45,73"/><path d="M62,31 C68,39 68,61 62,69"/>',
    '</g>',
    '<path d="M21,29 C18,37 17,45 18,52" fill="none" stroke-width="2.4"/>',
    gloss(27, 35, 7, 4, -24, .55)
  ].join(''));

  RAW['دلفين'] = svg('دلفين', [
    '<path d="M47,28 C50,16 58,9 66,7 C64,18 59,26 55,31 Z" fill="#2080E0" stroke-width="2"/>',
    '<path d="M39,66 C43,77 51,84 59,86 C59,75 53,68 46,64 Z" fill="#2080E0" stroke-width="2"/>',
    '<path d="M84,53 C92,44 99,47 97,56 C99,65 92,70 84,63 Z" fill="#2080E0"/>',
    '<path d="M4,62 C8,50 18,40 34,36 C56,30 76,38 86,56 C74,72 52,80 34,75 C18,71 7,68 4,62 Z" fill="#20A0FF"/>',
    '<path d="M4,62 C8,50 18,40 34,36 C56,30 76,38 86,56 C62,46 30,48 4,62 Z" fill="#40C0FF" stroke="none"/>',
    '<path d="M4,62 C8,50 18,40 34,36 C56,30 76,38 86,56 C74,72 52,80 34,75 C18,71 7,68 4,62 Z" fill="none"/>',
    '<path d="M4,62 C10,58 16,57 21,58" fill="none" stroke-width="2"/>',
    gloss(34, 45, 11, 4, -14, .5)
  ].join(''));

  RAW['سلحفاة مائية'] = svg('سلحفاة مائية', [
    '<g fill="#60C020" stroke-width="2">',
    '<ellipse cx="20" cy="32" rx="12" ry="7" transform="rotate(-38 20 32)"/>',
    '<ellipse cx="80" cy="32" rx="12" ry="7" transform="rotate(38 80 32)"/>',
    '<ellipse cx="22" cy="74" rx="10" ry="6" transform="rotate(34 22 74)"/>',
    '<ellipse cx="78" cy="74" rx="10" ry="6" transform="rotate(-34 78 74)"/>',
    '</g>',
    '<ellipse cx="50" cy="17" rx="10" ry="9" fill="#80C020"/>',
    '<ellipse cx="50" cy="54" rx="31" ry="26" fill="#4A9018"/>',
    '<path d="M19,54 A31,26 0 0 1 81,54 Z" fill="#60C020" stroke="none"/>',
    '<ellipse cx="50" cy="54" rx="31" ry="26" fill="none"/>',
    '<path d="M50,35 L64,45 L59,62 L41,62 L36,45 Z" fill="#80C020" stroke-width="2"/>',
    '<g fill="none" stroke="#356810" stroke-width="2">',
    '<path d="M36,45 L22,42"/><path d="M64,45 L78,42"/><path d="M41,62 L34,74"/><path d="M59,62 L66,74"/>',
    '</g>',
    gloss(35, 41, 8, 4, -22, .45)
  ].join(''));

  RAW['شرغوف'] = svg('شرغوف', [
    /* ذيلٌ متموّجٌ طويلٌ متناقصُ السُّمك — هو الفارقُ بينَ الشرغوفِ وأيِّ جسمٍ مستدير */
    '<path d="M42,40 C58,32 66,52 80,44 C90,38 92,26 88,18 C99,30 98,54 82,60 C68,66 58,50 44,58 Z" fill="#60C020"/>',
    '<path d="M42,40 C58,32 66,52 80,44 C90,38 92,26 88,18 C94,32 90,48 78,52 C64,57 56,44 43,49 Z" fill="#80C020" stroke="none"/>',
    '<path d="M42,40 C58,32 66,52 80,44 C90,38 92,26 88,18 C99,30 98,54 82,60 C68,66 58,50 44,58 Z" fill="none"/>',
    '<circle cx="32" cy="50" r="24" fill="#4A9018"/>',
    '<path d="M32,26 A24,24 0 0 0 32,74 Z" fill="#60C020" stroke="none"/>',
    '<circle cx="32" cy="50" r="24" fill="none"/>',
    '<g fill="none" stroke="#356810" stroke-width="2"><path d="M48,40 C53,44 54,56 49,60"/></g>',
    gloss(24, 38, 9, 4.5, -25, .5)
  ].join(''));

  RAW['عصفور'] = svg('عصفور', [
    '<path d="M30,52 L8,42 L13,54 L8,66 Z" fill="#C06000"/>',
    '<ellipse cx="47" cy="56" rx="26" ry="21" fill="#E08000"/>',
    '<path d="M21,56 A26,21 0 0 1 73,56 Z" fill="#FFA000" stroke="none"/>',
    '<ellipse cx="47" cy="56" rx="26" ry="21" fill="none"/>',
    '<circle cx="68" cy="35" r="16" fill="#FFA000"/>',
    '<path d="M83,34 L96,40 L83,46 Z" fill="#FF8000" stroke-width="2"/>',
    '<path d="M40,52 C48,44 62,47 63,57 C56,66 43,63 40,52 Z" fill="#C06000" stroke-width="2"/>',
    '<g stroke="#984800" stroke-width="2.4" fill="none"><path d="M42,77 L42,88"/><path d="M56,77 L56,88"/></g>',
    '<g stroke="#984800" stroke-width="2.4" fill="none"><path d="M36,89 L48,89"/><path d="M50,89 L62,89"/></g>',
    gloss(62, 27, 8, 4, -28, .5)
  ].join(''));

  RAW['طائر'] = svg('طائر', [
    '<path d="M26,58 L4,50 L9,62 L4,74 Z" fill="#2080E0"/>',
    '<ellipse cx="46" cy="62" rx="25" ry="19" fill="#20A0FF"/>',
    '<path d="M21,62 A25,19 0 0 1 71,62 Z" fill="#40C0FF" stroke="none"/>',
    '<ellipse cx="46" cy="62" rx="25" ry="19" fill="none"/>',
    '<path d="M40,52 C48,30 68,20 84,24 C74,42 58,54 40,56 Z" fill="#2080E0"/>',
    '<g fill="none" stroke="#1060A0" stroke-width="2"><path d="M50,48 C60,38 70,32 79,29"/><path d="M46,54 C56,46 66,40 76,36"/></g>',
    '<circle cx="70" cy="42" r="14" fill="#40C0FF"/>',
    '<path d="M83,40 L96,45 L83,50 Z" fill="#FFA000" stroke-width="2"/>',
    '<g stroke="#1060A0" stroke-width="2.4" fill="none"><path d="M44,81 L44,91"/><path d="M56,80 L58,90"/></g>',
    gloss(64, 34, 7, 4, -28, .5)
  ].join(''));

  RAW['قطة'] = svg('قطة', [
    '<path d="M70,76 C86,74 90,58 80,50 C75,46 69,50 71,56 C78,58 78,68 66,70 Z" fill="#FF6000"/>',
    '<ellipse cx="48" cy="70" rx="25" ry="18" fill="#FF8000"/>',
    '<path d="M23,70 A25,18 0 0 0 73,70 Z" fill="#FF6000" stroke="none"/>',
    '<ellipse cx="48" cy="70" rx="25" ry="18" fill="none"/>',
    '<path d="M32,32 L27,11 L46,22 Z" fill="#FF6000"/>',
    '<path d="M62,22 L79,11 L74,32 Z" fill="#FF6000"/>',
    '<circle cx="52" cy="36" r="20" fill="#FF8000"/>',
    '<path d="M52,16 A20,20 0 0 0 52,56 Z" fill="#FF8000" stroke="none"/>',
    '<circle cx="52" cy="36" r="20" fill="none"/>',
    '<g fill="none" stroke="#E04000" stroke-width="2"><path d="M44,20 C46,26 46,32 44,37"/><path d="M56,19 C58,25 58,32 56,37"/><path d="M34,62 C42,60 50,60 58,62"/></g>',
    '<g fill="#E04000" stroke-width="2"><ellipse cx="34" cy="87" rx="9" ry="5"/><ellipse cx="60" cy="87" rx="9" ry="5"/></g>',
    gloss(41, 27, 8, 4, -28, .5)
  ].join(''));

  RAW['هريرة'] = svg('هريرة', [
    '<path d="M70,78 C80,76 83,66 77,61 C73,58 68,61 70,66 C74,68 74,74 66,74 Z" fill="#C0C0C0"/>',
    '<ellipse cx="50" cy="74" rx="20" ry="14" fill="#C0C0C0"/>',
    '<path d="M50,60 A20,14 0 0 0 50,88 Z" fill="#F9F8F3" stroke="none"/>',
    '<ellipse cx="50" cy="74" rx="20" ry="14" fill="none"/>',
    '<path d="M31,36 L27,16 L45,26 Z" fill="#C0C0C0"/>',
    '<path d="M58,26 L74,16 L70,36 Z" fill="#C0C0C0"/>',
    '<circle cx="50" cy="40" r="22" fill="#F9F8F3"/>',
    '<path d="M50,18 A22,22 0 0 0 50,62 Z" fill="#FFFFFF" stroke="none"/>',
    '<circle cx="50" cy="40" r="22" fill="none"/>',
    '<g fill="none" stroke="#808080" stroke-width="2"><path d="M34,24 C36,30 36,36 34,42"/><path d="M66,24 C64,30 64,36 66,42"/></g>',
    '<g fill="#C0C0C0" stroke-width="2"><ellipse cx="38" cy="88" rx="8" ry="4.5"/><ellipse cx="62" cy="88" rx="8" ry="4.5"/></g>',
    gloss(39, 30, 8, 4, -28, .6)
  ].join(''));

  RAW['شبل'] = svg('شبل', [
    /* اللِّبدةُ حلقةٌ مسنَّنةٌ من دوائرَ حولَ الوجه، لا حلقةٌ ملساء — الملساءُ تُقرأُ دبّاً */
    '<path d="M72,74 C84,70 88,56 82,48" fill="none" stroke-width="3"/>',
    '<circle cx="84" cy="44" r="9" fill="#C06000"/>',
    '<ellipse cx="46" cy="72" rx="24" ry="17" fill="#E08000"/>',
    '<path d="M46,55 A24,17 0 0 1 46,89 Z" fill="#FFA000" stroke="none"/>',
    '<ellipse cx="46" cy="72" rx="24" ry="17" fill="none"/>',
    '<g fill="#E08000" stroke-width="2"><circle cx="34" cy="16" r="7"/><circle cx="66" cy="16" r="7"/></g>',
    '<g fill="#C06000" stroke-width="2">',
    '<circle cx="71" cy="36" r="8"/><circle cx="67" cy="48" r="8"/><circle cx="57" cy="56" r="8"/>',
    '<circle cx="44" cy="56" r="8"/><circle cx="33" cy="48" r="8"/><circle cx="29" cy="36" r="8"/>',
    '<circle cx="33" cy="24" r="8"/><circle cx="44" cy="16" r="8"/><circle cx="57" cy="16" r="8"/>',
    '<circle cx="67" cy="24" r="8"/>',
    '</g>',
    '<circle cx="50" cy="36" r="17" fill="#FFA000"/>',
    '<path d="M50,19 A17,17 0 0 0 50,53 Z" fill="#FFA000" stroke="none"/>',
    '<circle cx="50" cy="36" r="17" fill="none"/>',
    '<path d="M41,42 C45,50 55,50 59,42" fill="none" stroke="#984800" stroke-width="2"/>',
    '<g fill="#C06000" stroke-width="2"><ellipse cx="33" cy="88" rx="9" ry="5"/><ellipse cx="59" cy="88" rx="9" ry="5"/></g>',
    gloss(41, 28, 7, 3.5, -28, .45)
  ].join(''));

  RAW['كتكوت'] = svg('كتكوت', [
    '<g stroke="#C06000" stroke-width="3" fill="none"><path d="M42,82 L42,92"/><path d="M58,82 L58,92"/></g>',
    '<g stroke="#C06000" stroke-width="3" fill="none"><path d="M35,93 L49,93"/><path d="M51,93 L65,93"/></g>',
    '<ellipse cx="50" cy="62" rx="26" ry="23" fill="#E0E0A0"/>',
    '<path d="M50,39 A26,23 0 0 0 50,85 Z" fill="#FFFFC0" stroke="none"/>',
    '<ellipse cx="50" cy="62" rx="26" ry="23" fill="none"/>',
    '<path d="M36,58 C44,49 60,52 62,63 C55,73 39,70 36,58 Z" fill="#E0C080" stroke-width="2"/>',
    '<circle cx="50" cy="30" r="18" fill="#FFFFC0"/>',
    '<path d="M67,29 L80,35 L67,41 Z" fill="#FF8000" stroke-width="2"/>',
    '<path d="M48,12 C50,6 55,4 58,5 C56,10 52,13 50,15 Z" fill="#E0C060" stroke-width="2"/>',
    gloss(42, 22, 8, 4, -30, .6)
  ].join(''));

  RAW['أرنب'] = svg('أرنب', [
    '<path d="M34,36 C28,20 30,7 37,5 C44,7 45,21 43,35 Z" fill="#FFFFFF"/>',
    '<path d="M37,32 C34,21 35,13 38,11 C41,14 41,23 40,32 Z" fill="#F2C3A0" stroke-width="2"/>',
    '<path d="M56,35 C58,20 65,8 72,8 C77,12 71,26 64,37 Z" fill="#FFFFFF"/>',
    '<path d="M60,32 C62,22 66,15 70,14 C72,18 68,26 64,33 Z" fill="#F2C3A0" stroke-width="2"/>',
    '<circle cx="80" cy="70" r="9" fill="#FFFFFF"/>',
    '<ellipse cx="52" cy="70" rx="24" ry="18" fill="#C0C0C0"/>',
    '<path d="M52,52 A24,18 0 0 0 52,88 Z" fill="#FFFFFF" stroke="none"/>',
    '<ellipse cx="52" cy="70" rx="24" ry="18" fill="none"/>',
    '<circle cx="47" cy="45" r="18" fill="#FFFFFF"/>',
    '<path d="M40,53 C44,58 50,58 54,53" fill="none" stroke="#C0C0C0" stroke-width="2"/>',
    '<g fill="#F9F8F3" stroke-width="2"><ellipse cx="38" cy="88" rx="10" ry="5.5"/><ellipse cx="64" cy="88" rx="10" ry="5.5"/></g>',
    gloss(39, 37, 8, 4, -28, .7)
  ].join(''));

  RAW['ثعلب'] = svg('ثعلب', [
    /* الذيلُ الكثُّ الأبيضُ الطرفِ والخطمُ المدبَّبُ الأبيضُ: علامتا الثعلبِ اللتانِ
       تفرِقانِه عن القطّ — وقد كانَ ذيلُه أوّلَ مرّةٍ صغيراً فقُرئَ قطّاً. */
    '<path d="M70,80 C90,78 100,58 90,40 C85,31 74,32 74,42 C82,52 82,70 64,72 Z" fill="#FF8000"/>',
    '<path d="M90,40 C85,31 74,32 74,42 C78,36 86,35 90,40 Z" fill="#FFFFFF" stroke-width="2"/>',
    '<ellipse cx="44" cy="72" rx="24" ry="16" fill="#FF6000"/>',
    '<path d="M44,56 A24,16 0 0 1 44,88 Z" fill="#FF8000" stroke="none"/>',
    '<ellipse cx="44" cy="72" rx="24" ry="16" fill="none"/>',
    '<path d="M28,32 L21,8 L45,21 Z" fill="#E04000"/>',
    '<path d="M55,21 L79,8 L72,32 Z" fill="#E04000"/>',
    '<path d="M50,18 C64,18 74,28 74,40 C74,50 64,58 50,58 C36,58 26,50 26,40 C26,28 36,18 50,18 Z" fill="#FF8000"/>',
    '<path d="M50,18 C36,18 26,28 26,40 C26,50 36,58 50,58 Z" fill="#FF6000" stroke="none"/>',
    '<path d="M50,18 C64,18 74,28 74,40 C74,50 64,58 50,58 C36,58 26,50 26,40 C26,28 36,18 50,18 Z" fill="none"/>',
    '<path d="M37,46 L50,70 L63,46 Z" fill="#FFFFFF"/>',
    '<g fill="#E04000" stroke-width="2"><ellipse cx="32" cy="86" rx="9" ry="5"/><ellipse cx="56" cy="86" rx="9" ry="5"/></g>',
    gloss(38, 28, 8, 4, -30, .45)
  ].join(''));

  RAW['جمل'] = svg('جمل', [
    '<g stroke="#111111" stroke-width="9" fill="none">',
    '<path d="M36,64 L36,89"/><path d="M50,64 L50,89"/><path d="M68,64 L68,89"/><path d="M80,64 L80,89"/>',
    '</g>',
    '<g stroke="#C06000" stroke-width="5" fill="none">',
    '<path d="M36,64 L36,89"/><path d="M50,64 L50,89"/><path d="M68,64 L68,89"/><path d="M80,64 L80,89"/>',
    '</g>',
    '<path d="M22,54 C22,42 32,36 44,36 C48,24 62,24 66,36 C78,36 88,42 88,54 C88,63 80,68 66,68 L40,68 C28,68 22,62 22,54 Z" fill="#E08000"/>',
    '<path d="M22,54 C22,42 32,36 44,36 C48,24 62,24 66,36 C78,36 88,42 88,54 C60,48 40,48 22,54 Z" fill="#FFA000" stroke="none"/>',
    '<path d="M22,54 C22,42 32,36 44,36 C48,24 62,24 66,36 C78,36 88,42 88,54 C88,63 80,68 66,68 L40,68 C28,68 22,62 22,54 Z" fill="none"/>',
    '<path d="M26,56 C18,46 14,32 17,20 L30,22 C28,34 32,46 38,54 Z" fill="#FFA000"/>',
    '<path d="M17,20 C10,18 5,21 5,26 C5,31 11,34 18,32 C24,30 24,22 17,20 Z" fill="#FFA000"/>',
    '<path d="M22,15 L29,10 L28,20 Z" fill="#E08000" stroke-width="2"/>',
    '<path d="M88,50 C94,54 96,62 94,70" fill="none" stroke-width="2.4"/>',
    gloss(38, 44, 9, 4, -18, .4)
  ].join(''));

  /* ══ نباتٌ وشجر ═══════════════════════════════════════════════════════ */

  RAW['نخلة'] = svg('نخلة', [
    '<path d="M44,92 C42,72 42,54 45,36 L57,36 C59,54 58,74 56,92 Z" fill="#9A6636"/>',
    '<path d="M44,92 C42,72 42,54 45,36 L51,36 C50,54 50,74 50,92 Z" fill="#B98551" stroke="none"/>',
    '<path d="M44,92 C42,72 42,54 45,36 L57,36 C59,54 58,74 56,92 Z" fill="none"/>',
    '<g fill="none" stroke="#7A4C22" stroke-width="2"><path d="M43,54 L58,54"/><path d="M43,68 L57,68"/><path d="M44,82 L57,82"/></g>',
    '<path d="M50,34 C34,26 18,30 8,42 C24,42 40,40 50,40 Z" fill="#4A9018"/>',
    '<path d="M50,34 C66,26 82,30 92,42 C76,42 60,40 50,40 Z" fill="#4A9018"/>',
    '<path d="M50,32 C38,18 22,14 12,20 C28,26 42,30 50,38 Z" fill="#60C020"/>',
    '<path d="M50,32 C62,18 78,14 88,20 C72,26 58,30 50,38 Z" fill="#60C020"/>',
    '<path d="M50,32 C44,16 48,6 56,2 C60,14 58,26 54,36 Z" fill="#80C020"/>',
    '<g fill="#C06000" stroke-width="2"><circle cx="42" cy="32" r="4"/><circle cx="58" cy="33" r="4"/><circle cx="50" cy="27" r="4"/></g>',
    gloss(30, 24, 8, 3, -22, .35)
  ].join(''));

  RAW['شجرة'] = svg('شجرة', [
    '<path d="M43,92 C42,76 42,64 44,56 L56,56 C58,64 58,76 57,92 Z" fill="#9A6636"/>',
    '<path d="M43,92 C42,76 42,64 44,56 L50,56 C49,68 49,80 50,92 Z" fill="#B98551" stroke="none"/>',
    '<path d="M43,92 C42,76 42,64 44,56 L56,56 C58,64 58,76 57,92 Z" fill="none"/>',
    '<path d="M50,8 C68,8 84,20 84,36 C84,52 68,62 50,62 C32,62 16,52 16,36 C16,20 32,8 50,8 Z" fill="#4A9018"/>',
    '<path d="M50,8 C32,8 16,20 16,36 C16,45 21,53 30,58 C22,44 26,20 50,8 Z" fill="#60C020" stroke="none"/>',
    '<path d="M50,8 C68,8 84,20 84,36 C84,52 68,62 50,62 C32,62 16,52 16,36 C16,20 32,8 50,8 Z" fill="none"/>',
    '<path d="M30,28 C36,18 46,14 56,15" fill="none" stroke="#80C020" stroke-width="3"/>',
    '<path d="M62,46 C70,44 76,38 78,32" fill="none" stroke="#356810" stroke-width="2.4"/>',
    gloss(34, 24, 9, 4.5, -28, .4)
  ].join(''));

  /* ══ جماداتٌ وأشياء ═══════════════════════════════════════════════════ */

  RAW['صخرة'] = svg('صخرة', [
    '<path d="M8,78 C8,60 20,42 38,34 C54,27 72,32 84,46 C92,56 94,70 92,80 C92,84 89,86 84,86 L14,86 C10,86 8,83 8,78 Z" fill="#808080"/>',
    '<path d="M8,78 C8,60 20,42 38,34 C48,30 58,31 66,36 C42,44 20,58 8,78 Z" fill="#C0C0C0" stroke="none"/>',
    '<path d="M66,36 C76,42 92,60 92,80 C92,84 89,86 84,86 L64,86 C72,66 72,48 66,36 Z" fill="#606060" stroke="none"/>',
    '<path d="M8,78 C8,60 20,42 38,34 C54,27 72,32 84,46 C92,56 94,70 92,80 C92,84 89,86 84,86 L14,86 C10,86 8,83 8,78 Z" fill="none"/>',
    '<g fill="none" stroke="#404040" stroke-width="2"><path d="M32,52 L44,58 L38,68"/><path d="M62,54 L70,62"/></g>',
    gloss(30, 46, 9, 4, -30, .45)
  ].join(''));

  RAW['حجر'] = svg('حجر', [
    '<path d="M18,62 C18,48 30,36 50,36 C70,36 82,48 82,62 C82,72 70,80 50,80 C30,80 18,72 18,62 Z" fill="#808080"/>',
    '<path d="M18,62 C18,48 30,36 50,36 C58,36 65,38 70,42 C46,44 26,52 18,62 Z" fill="#C0C0C0" stroke="none"/>',
    '<path d="M70,42 C78,48 82,55 82,62 C82,72 70,80 50,80 C44,80 39,79 35,78 C58,74 70,60 70,42 Z" fill="#606060" stroke="none"/>',
    '<path d="M18,62 C18,48 30,36 50,36 C70,36 82,48 82,62 C82,72 70,80 50,80 C30,80 18,72 18,62 Z" fill="none"/>',
    '<path d="M40,54 L50,60 L44,68" fill="none" stroke="#404040" stroke-width="2"/>',
    gloss(36, 47, 9, 4, -28, .5)
  ].join(''));

  RAW['كرسي'] = svg('كرسي', [
    '<path d="M28,8 L72,8 C75,8 76,10 76,13 L76,46 C76,49 75,50 72,50 L28,50 C25,50 24,49 24,46 L24,13 C24,10 25,8 28,8 Z" fill="#B98551"/>',
    '<path d="M62,8 L72,8 C75,8 76,10 76,13 L76,46 C76,49 75,50 72,50 L62,50 Z" fill="#9A6636" stroke="none"/>',
    '<path d="M28,8 L72,8 C75,8 76,10 76,13 L76,46 C76,49 75,50 72,50 L28,50 C25,50 24,49 24,46 L24,13 C24,10 25,8 28,8 Z" fill="none"/>',
    '<g fill="none" stroke="#7A4C22" stroke-width="2"><path d="M38,14 L38,44"/><path d="M62,14 L62,44"/></g>',
    '<path d="M16,52 L84,52 C86,52 88,54 88,57 L88,63 C88,66 86,68 84,68 L16,68 C14,68 12,66 12,63 L12,57 C12,54 14,52 16,52 Z" fill="#9A6636"/>',
    '<path d="M16,52 L50,52 L50,68 L16,68 C14,68 12,66 12,63 L12,57 C12,54 14,52 16,52 Z" fill="#B98551" stroke="none"/>',
    '<path d="M16,52 L84,52 C86,52 88,54 88,57 L88,63 C88,66 86,68 84,68 L16,68 C14,68 12,66 12,63 L12,57 C12,54 14,52 16,52 Z" fill="none"/>',
    '<g fill="#7A4C22"><path d="M20,68 L30,68 L30,92 L20,92 Z"/><path d="M70,68 L80,68 L80,92 L70,92 Z"/></g>',
    gloss(32, 20, 8, 4, -30, .35)
  ].join(''));

  RAW['حافلة'] = svg('حافلة', [
    '<path d="M8,36 C8,29 12,25 19,25 L81,25 C88,25 92,30 92,38 L92,68 C92,72 89,74 85,74 L15,74 C11,74 8,72 8,68 Z" fill="#E08000"/>',
    '<path d="M8,36 C8,29 12,25 19,25 L81,25 C88,25 92,30 92,38 L92,44 L8,44 Z" fill="#FFA000" stroke="none"/>',
    '<path d="M8,36 C8,29 12,25 19,25 L81,25 C88,25 92,30 92,38 L92,68 C92,72 89,74 85,74 L15,74 C11,74 8,72 8,68 Z" fill="none"/>',
    '<g fill="#40C0FF" stroke-width="2">',
    '<path d="M15,33 L33,33 L33,47 L15,47 Z"/><path d="M39,33 L57,33 L57,47 L39,47 Z"/><path d="M63,33 L81,33 L81,47 L63,47 Z"/>',
    '</g>',
    '<path d="M63,54 L81,54 L81,74 L63,74 Z" fill="#C06000" stroke-width="2"/>',
    '<path d="M12,58 L46,58" fill="none" stroke="#C06000" stroke-width="3"/>',
    '<g stroke-width="2"><circle cx="28" cy="76" r="10" fill="#404040"/><circle cx="28" cy="76" r="4.5" fill="#C0C0C0"/>',
    '<circle cx="72" cy="76" r="10" fill="#404040"/><circle cx="72" cy="76" r="4.5" fill="#C0C0C0"/></g>',
    gloss(22, 32, 8, 3.5, -20, .45)
  ].join(''));

  /* ══ طعامٌ وشراب ══════════════════════════════════════════════════════ */

  RAW['تفاحة'] = svg('تفاحة', [
    '<path d="M50,26 C50,18 52,12 57,7" fill="none" stroke-width="5"/>',
    '<path d="M50,26 C50,18 52,12 57,7" fill="none" stroke="#7A4C22" stroke-width="3"/>',
    '<path d="M56,14 C66,7 80,11 80,20 C71,27 58,24 56,14 Z" fill="#60C020" stroke-width="2"/>',
    '<path d="M50,27 C64,20 81,30 81,50 C81,71 67,88 50,88 C33,88 19,71 19,50 C19,30 36,20 50,27 Z" fill="#FF2020"/>',
    '<path d="M50,27 C36,20 19,30 19,50 C19,63 25,76 34,83 C29,60 34,37 50,27 Z" fill="#FF4020" stroke="none"/>',
    '<path d="M50,27 C64,20 81,30 81,50 C81,67 71,82 58,87 C71,66 68,40 50,27 Z" fill="#E02000" stroke="none"/>',
    '<path d="M50,27 C64,20 81,30 81,50 C81,71 67,88 50,88 C33,88 19,71 19,50 C19,30 36,20 50,27 Z" fill="none"/>',
    gloss(35, 44, 9, 5, -32, .5)
  ].join(''));

  RAW['موزة'] = svg('موزة', [
    '<path d="M12,26 C10,54 30,80 60,84 C78,86 90,78 94,66 C84,70 70,70 58,65 C38,57 28,42 26,22 Z" fill="#E0E0A0"/>',
    '<path d="M12,26 C10,54 30,80 60,84 C66,84 71,83 76,81 C46,78 24,56 20,24 Z" fill="#FFFFC0" stroke="none"/>',
    '<path d="M12,26 C10,54 30,80 60,84 C78,86 90,78 94,66 C84,70 70,70 58,65 C38,57 28,42 26,22 Z" fill="none"/>',
    '<path d="M12,26 C10,20 16,14 22,15 C27,16 28,20 26,22 Z" fill="#E0C060" stroke-width="2"/>',
    '<path d="M94,66 C97,72 94,78 88,79 C84,79 82,76 83,73 Z" fill="#7A4C22" stroke-width="2"/>',
    '<path d="M24,34 C28,52 42,66 60,72" fill="none" stroke="#E0C080" stroke-width="2.4"/>',
    gloss(22, 42, 5, 12, 16, .45)
  ].join(''));

  RAW['جزرة'] = svg('جزرة', [
    '<path d="M50,36 C42,26 32,18 24,14 C28,28 36,36 44,42 Z" fill="#4A9018"/>',
    '<path d="M50,36 C58,26 68,18 76,14 C72,28 64,36 56,42 Z" fill="#60C020"/>',
    '<path d="M50,36 C48,24 50,12 53,4 C58,14 57,28 55,40 Z" fill="#80C020"/>',
    '<path d="M50,94 C43,76 39,56 41,38 L59,38 C61,56 57,76 50,94 Z" fill="#FF6000"/>',
    '<path d="M50,94 C43,76 39,56 41,38 L50,38 Z" fill="#FF8000" stroke="none"/>',
    '<path d="M50,94 C57,76 61,56 59,38 L50,38 Z" fill="#E04000" stroke="none"/>',
    '<path d="M50,94 C43,76 39,56 41,38 L59,38 C61,56 57,76 50,94 Z" fill="none"/>',
    '<g fill="none" stroke="#C04000" stroke-width="2"><path d="M43,52 L57,50"/><path d="M45,66 L56,64"/><path d="M47,79 L54,78"/></g>',
    gloss(45, 50, 3.5, 9, 6, .4)
  ].join(''));

  RAW['خضار'] = svg('خضار', [
    '<path d="M70,92 C66,80 63,66 65,54 L79,54 C81,66 78,80 74,92 Z" fill="#FF6000"/>',
    '<path d="M70,92 C66,80 63,66 65,54 L72,54 Z" fill="#FF8000" stroke="none"/>',
    '<path d="M70,92 C66,80 63,66 65,54 L79,54 C81,66 78,80 74,92 Z" fill="none"/>',
    '<path d="M72,54 C68,44 62,38 58,36 C62,46 66,50 70,56 Z" fill="#60C020" stroke-width="2"/>',
    '<path d="M72,54 C74,44 78,36 82,32 C84,42 80,50 76,56 Z" fill="#80C020" stroke-width="2"/>',
    '<path d="M32,92 C28,80 26,66 28,52 L44,52 C46,66 43,80 39,92 Z" fill="#80C020"/>',
    '<path d="M32,92 C28,80 26,66 28,52 L36,52 Z" fill="#80C020" stroke="none"/>',
    '<path d="M32,92 C28,80 26,66 28,52 L44,52 C46,66 43,80 39,92 Z" fill="none"/>',
    '<g stroke-width="2.4">',
    '<circle cx="20" cy="38" r="14" fill="#4A9018"/><circle cx="48" cy="36" r="14" fill="#4A9018"/>',
    '<circle cx="16" cy="24" r="11" fill="#60C020"/><circle cx="52" cy="22" r="11" fill="#4A9018"/>',
    '<circle cx="34" cy="20" r="16" fill="#60C020"/><circle cx="34" cy="38" r="14" fill="#60C020"/>',
    '</g>',
    gloss(26, 14, 8, 4, -28, .4)
  ].join(''));

  RAW['ماء'] = svg('ماء', [
    '<path d="M30,18 L70,18 L64,84 C64,89 58,92 50,92 C42,92 36,89 36,84 Z" fill="#F9F8F3"/>',
    '<path d="M32,42 L68,42 L64,84 C64,89 58,92 50,92 C42,92 36,89 36,84 Z" fill="#20A0FF" stroke="none"/>',
    '<path d="M32,42 L50,42 L50,92 C42,92 36,89 36,84 Z" fill="#40C0FF" stroke="none"/>',
    '<ellipse cx="50" cy="42" rx="18" ry="5" fill="#40C0FF" stroke-width="2"/>',
    '<path d="M30,18 L70,18 L64,84 C64,89 58,92 50,92 C42,92 36,89 36,84 Z" fill="none"/>',
    '<ellipse cx="50" cy="18" rx="20" ry="6" fill="#FFFFFF"/>',
    '<path d="M40,52 C38,62 38,72 40,82" fill="none" stroke="#FFFFFF" stroke-width="4" opacity=".6"/>',
    gloss(41, 28, 5, 8, 8, .55)
  ].join(''));

  RAW['شوكولاتة'] = svg('شوكولاتة', [
    '<path d="M20,24 L8,18 L8,80 L20,74 Z" fill="#C0C0C0"/>',
    '<path d="M20,24 L84,24 C87,24 88,26 88,29 L88,71 C88,74 87,76 84,76 L20,76 C17,76 16,74 16,71 L16,29 C16,26 17,24 20,24 Z" fill="#7A4C22"/>',
    '<path d="M20,24 L84,24 C87,24 88,26 88,29 L88,38 L16,38 L16,29 C16,26 17,24 20,24 Z" fill="#9A6636" stroke="none"/>',
    '<path d="M64,50 L88,50 L88,71 C88,74 87,76 84,76 L64,76 Z" fill="#68411D" stroke="none"/>',
    '<path d="M20,24 L84,24 C87,24 88,26 88,29 L88,71 C88,74 87,76 84,76 L20,76 C17,76 16,74 16,71 L16,29 C16,26 17,24 20,24 Z" fill="none"/>',
    '<g fill="none" stroke="#68411D" stroke-width="2.4"><path d="M40,26 L40,74"/><path d="M64,26 L64,74"/><path d="M18,50 L86,50"/></g>',
    gloss(30, 31, 8, 3, -8, .3)
  ].join(''));

  RAW['حلوى'] = svg('حلوى', [
    '<path d="M30,50 L10,32 L15,50 L10,68 Z" fill="#FF4020"/>',
    '<path d="M70,50 L90,32 L85,50 L90,68 Z" fill="#FF4020"/>',
    '<circle cx="50" cy="50" r="22" fill="#FF2020"/>',
    '<path d="M50,28 A22,22 0 0 0 50,72 Z" fill="#FF4020" stroke="none"/>',
    '<circle cx="50" cy="50" r="22" fill="none"/>',
    '<path d="M34,42 C42,36 58,36 66,42" fill="none" stroke="#FFFFFF" stroke-width="4"/>',
    '<path d="M34,58 C42,64 58,64 66,58" fill="none" stroke="#FFFFFF" stroke-width="4"/>',
    gloss(40, 40, 7, 3.5, -30, .55)
  ].join(''));

  RAW['مشروب غازي'] = svg('مشروب غازي', [
    '<g fill="#40C0FF" stroke-width="2"><circle cx="22" cy="14" r="5"/><circle cx="80" cy="10" r="4"/><circle cx="70" cy="4" r="3.5"/></g>',
    '<path d="M30,20 L70,20 L70,84 C70,88 62,91 50,91 C38,91 30,88 30,84 Z" fill="#FF2020"/>',
    '<path d="M30,20 L44,20 L44,90 C36,89 30,87 30,84 Z" fill="#FF4020" stroke="none"/>',
    '<path d="M62,20 L70,20 L70,84 C70,87 67,89 62,90 Z" fill="#E02000" stroke="none"/>',
    '<path d="M30,48 L70,48 L70,62 L30,62 Z" fill="#FFFFFF" stroke="none"/>',
    '<path d="M30,20 L70,20 L70,84 C70,88 62,91 50,91 C38,91 30,88 30,84 Z" fill="none"/>',
    '<g fill="none" stroke-width="2.4"><path d="M30,48 L70,48"/><path d="M30,62 L70,62"/></g>',
    '<ellipse cx="50" cy="20" rx="20" ry="6" fill="#C0C0C0"/>',
    '<ellipse cx="50" cy="20" rx="9" ry="3" fill="#808080" stroke-width="2"/>',
    gloss(37, 32, 4, 8, 4, .5)
  ].join(''));


  /* ══ أماكنُ ومبانٍ ═════════════════════════════════════════════════════ */

  RAW['بيت'] = svg('بيت', [
    '<path d="M50,12 L90,44 L10,44 Z" fill="#E02000"/>',
    '<path d="M50,12 L10,44 L50,44 Z" fill="#FF2020" stroke="none"/>',
    '<path d="M50,12 L90,44 L10,44 Z" fill="none"/>',
    '<rect x="20" y="44" width="60" height="42" rx="3" fill="#E0E0A0"/>',
    '<rect x="20" y="44" width="24" height="42" fill="#FFFFC0" stroke="none"/>',
    '<rect x="20" y="44" width="60" height="42" rx="3" fill="none"/>',
    '<rect x="41" y="60" width="18" height="26" rx="2" fill="#9A6636" stroke-width="2"/>',
    '<rect x="26" y="52" width="12" height="12" rx="2" fill="#40C0FF" stroke-width="2"/>',
    '<rect x="62" y="52" width="12" height="12" rx="2" fill="#40C0FF" stroke-width="2"/>',
    gloss(30, 24, 4, 9, 38, .35)
  ].join(''));

  RAW['صف'] = svg('صف', [
    '<rect x="26" y="8" width="48" height="26" rx="3" fill="#9A6636"/>',
    '<rect x="31" y="13" width="38" height="16" rx="2" fill="#356810" stroke-width="2"/>',
    '<rect x="31" y="13" width="17" height="16" fill="#4A9018" stroke="none"/>',
    '<rect x="31" y="13" width="38" height="16" rx="2" fill="none" stroke-width="2"/>',
    '<rect x="6" y="52" width="40" height="10" rx="4" fill="#B98551"/>',
    '<path d="M12,62 L12,86 M40,62 L40,86" fill="none" stroke-width="3"/>',
    '<rect x="16" y="40" width="18" height="13" rx="4" fill="#E08000" stroke-width="2"/>',
    '<rect x="54" y="52" width="40" height="10" rx="4" fill="#B98551"/>',
    '<path d="M60,62 L60,86 M88,62 L88,86" fill="none" stroke-width="3"/>',
    '<rect x="64" y="40" width="18" height="13" rx="4" fill="#20A0FF" stroke-width="2"/>',
    gloss(38, 17, 5, 2, -12, .4)
  ].join(''));

  RAW['سبورة'] = svg('سبورة', [
    '<rect x="8" y="16" width="84" height="56" rx="5" fill="#9A6636"/>',
    '<rect x="15" y="23" width="70" height="42" rx="3" fill="#356810" stroke-width="2"/>',
    '<rect x="15" y="23" width="30" height="42" fill="#4A9018" stroke="none"/>',
    '<rect x="15" y="23" width="70" height="42" rx="3" fill="none" stroke-width="2"/>',
    '<rect x="13" y="70" width="74" height="10" rx="4" fill="#B98551"/>',
    '<rect x="13" y="70" width="74" height="5" fill="#C8A76B" stroke="none"/>',
    '<rect x="13" y="70" width="74" height="10" rx="4" fill="none"/>',
    '<rect x="24" y="72" width="20" height="6" rx="3" fill="#FFFFFF" stroke-width="2"/>',
    '<rect x="50" y="72" width="14" height="6" rx="3" fill="#FFFFC0" stroke-width="2"/>',
    gloss(27, 30, 8, 4, -12, .4)
  ].join(''));

  RAW['مكتبة'] = svg('مكتبة', [
    '<rect x="14" y="10" width="72" height="78" rx="4" fill="#9A6636"/>',
    '<rect x="14" y="10" width="22" height="78" fill="#B98551" stroke="none"/>',
    '<rect x="14" y="10" width="72" height="78" rx="4" fill="none"/>',
    '<path d="M14,49 L86,49" fill="none" stroke-width="3"/>',
    '<rect x="23" y="18" width="11" height="28" rx="2" fill="#FF2020" stroke-width="2"/>',
    '<rect x="36" y="16" width="11" height="30" rx="2" fill="#20A0FF" stroke-width="2"/>',
    '<rect x="49" y="20" width="11" height="26" rx="2" fill="#60C020" stroke-width="2"/>',
    '<rect x="62" y="17" width="11" height="29" rx="2" fill="#E08000" stroke-width="2"/>',
    '<rect x="23" y="57" width="11" height="28" rx="2" fill="#E08000" stroke-width="2"/>',
    '<rect x="36" y="55" width="11" height="30" rx="2" fill="#FF2020" stroke-width="2"/>',
    '<rect x="49" y="59" width="11" height="26" rx="2" fill="#20A0FF" stroke-width="2"/>',
    '<rect x="62" y="56" width="11" height="29" rx="2" fill="#60C020" stroke-width="2"/>'
  ].join(''));

  RAW['ساحة'] = svg('ساحة', [
    '<rect x="6" y="24" width="88" height="54" rx="9" fill="#4A9018"/>',
    '<rect x="6" y="24" width="88" height="26" fill="#60C020" stroke="none"/>',
    '<rect x="6" y="24" width="88" height="54" rx="9" fill="none"/>',
    '<circle cx="50" cy="51" r="15" fill="none" stroke="#FFFFFF" stroke-width="3"/>',
    '<path d="M50,24 L50,78" fill="none" stroke="#FFFFFF" stroke-width="3"/>',
    '<circle cx="73" cy="62" r="13" fill="#F9F8F3"/>',
    '<path d="M73,53 L80,58 L77,67 L69,67 L66,58 Z" fill="#606060" stroke="none"/>',
    '<path d="M73,49 L73,53 M62,58 L66,58 M84,58 L80,58 M68,72 L69,67 M78,72 L77,67" fill="none" stroke="#606060" stroke-width="2"/>',
    gloss(67, 56, 4, 2, -25, .75)
  ].join(''));

  RAW['شارع'] = svg('شارع', [
    '<rect x="6" y="22" width="88" height="9" rx="3" fill="#C0C0C0"/>',
    '<rect x="6" y="69" width="88" height="9" rx="3" fill="#C0C0C0"/>',
    '<rect x="6" y="31" width="88" height="38" fill="#606060"/>',
    '<rect x="6" y="31" width="88" height="13" fill="#808080" stroke="none"/>',
    '<rect x="6" y="31" width="88" height="38" fill="none"/>',
    '<g fill="#FFFFC0" stroke="none">',
    '<rect x="14" y="47" width="15" height="6" rx="3"/>',
    '<rect x="42" y="47" width="15" height="6" rx="3"/>',
    '<rect x="70" y="47" width="15" height="6" rx="3"/>',
    '</g>'
  ].join(''));

  RAW['سرير'] = svg('سرير', [
    '<rect x="8" y="30" width="13" height="52" rx="5" fill="#9A6636"/>',
    '<rect x="79" y="50" width="13" height="32" rx="5" fill="#9A6636"/>',
    '<rect x="14" y="52" width="72" height="21" rx="6" fill="#F9F8F3"/>',
    '<rect x="14" y="63" width="72" height="10" fill="#F7F6F1" stroke="none"/>',
    '<rect x="14" y="52" width="72" height="21" rx="6" fill="none"/>',
    '<path d="M44,52 L86,52 C89,52 92,55 92,58 L92,67 C92,70 89,73 86,73 L44,73 Z" fill="#20A0FF" stroke-width="2"/>',
    '<rect x="20" y="43" width="24" height="13" rx="6" fill="#FFFFFF" stroke-width="2"/>',
    gloss(28, 47, 6, 3, -14, .55)
  ].join(''));

  RAW['قطار'] = svg('قطار', [
    '<rect x="8" y="40" width="30" height="26" rx="4" fill="#0080C0"/>',
    '<rect x="8" y="40" width="30" height="11" fill="#40C0FF" stroke="none"/>',
    '<rect x="8" y="40" width="30" height="26" rx="4" fill="none"/>',
    '<path d="M38,56 L46,56" fill="none" stroke-width="3"/>',
    '<path d="M46,66 L46,38 C46,35 48,33 51,33 L64,33 C67,33 69,35 69,38 L69,46 L85,46 C88,46 90,48 90,51 L90,66 Z" fill="#E02000"/>',
    '<path d="M46,66 L46,38 C46,35 48,33 51,33 L57,33 L57,66 Z" fill="#FF2020" stroke="none"/>',
    '<path d="M46,66 L46,38 C46,35 48,33 51,33 L64,33 C67,33 69,35 69,38 L69,46 L85,46 C88,46 90,48 90,51 L90,66 Z" fill="none"/>',
    '<rect x="51" y="38" width="14" height="11" rx="2" fill="#40C0FF" stroke-width="2"/>',
    '<rect x="73" y="26" width="11" height="14" rx="3" fill="#606060" stroke-width="2"/>',
    '<circle cx="18" cy="72" r="8" fill="#606060"/><circle cx="18" cy="72" r="3" fill="#C0C0C0" stroke-width="2"/>',
    '<circle cx="55" cy="72" r="8" fill="#606060"/><circle cx="55" cy="72" r="3" fill="#C0C0C0" stroke-width="2"/>',
    '<circle cx="80" cy="72" r="8" fill="#606060"/><circle cx="80" cy="72" r="3" fill="#C0C0C0" stroke-width="2"/>'
  ].join(''));


  /* ══ أدواتٌ مدرسيّة ════════════════════════════════════════════════════ */

  RAW['قلم'] = svg('قلم', [
    '<path d="M38,68 L50,90 L62,68 Z" fill="#B98551"/>',
    '<path d="M44,79 L50,90 L56,79 Z" fill="#404040" stroke="none"/>',
    '<path d="M38,68 L50,90 L62,68 Z" fill="none"/>',
    '<rect x="38" y="24" width="24" height="44" fill="#E08000"/>',
    '<rect x="38" y="24" width="9" height="44" fill="#FFA000" stroke="none"/>',
    '<rect x="38" y="24" width="24" height="44" fill="none"/>',
    '<rect x="37" y="16" width="26" height="9" rx="2" fill="#C0C0C0"/>',
    '<path d="M43,8 L57,8 C60,8 62,10 62,13 L62,16 L38,16 L38,13 C38,10 40,8 43,8 Z" fill="#FF4020"/>',
    gloss(43, 40, 3, 12, 0, .35)
  ].join(''));

  RAW['دفتر'] = svg('دفتر', [
    '<rect x="20" y="14" width="60" height="74" rx="4" fill="#2080E0"/>',
    '<rect x="20" y="14" width="20" height="74" fill="#40C0FF" stroke="none"/>',
    '<rect x="20" y="14" width="60" height="74" rx="4" fill="none"/>',
    '<rect x="28" y="30" width="44" height="50" rx="2" fill="#F9F8F3" stroke-width="2"/>',
    '<g fill="none" stroke="#808080" stroke-width="2">',
    '<path d="M34,42 L66,42"/><path d="M34,53 L66,53"/><path d="M34,64 L66,64"/>',
    '</g>',
    '<g fill="none" stroke-width="3">',
    '<path d="M32,10 C28,14 28,20 32,24"/><path d="M50,10 C46,14 46,20 50,24"/><path d="M68,10 C64,14 64,20 68,24"/>',
    '</g>'
  ].join(''));

  RAW['كتاب'] = svg('كتاب', [
    '<path d="M50,30 C42,22 26,20 14,23 L14,80 C26,77 42,79 50,86 Z" fill="#E02000"/>',
    '<path d="M50,30 C58,22 74,20 86,23 L86,80 C74,77 58,79 50,86 Z" fill="#FF2020"/>',
    '<path d="M50,34 C43,28 30,26 20,28 L20,74 C30,72 43,74 50,79 Z" fill="#F9F8F3" stroke-width="2"/>',
    '<path d="M50,34 C57,28 70,26 80,28 L80,74 C70,72 57,74 50,79 Z" fill="#FFFFFF" stroke-width="2"/>',
    '<g fill="none" stroke="#808080" stroke-width="2">',
    '<path d="M27,42 C33,41 40,42 44,44"/><path d="M27,53 C33,52 40,53 44,55"/>',
    '<path d="M73,42 C67,41 60,42 56,44"/><path d="M73,53 C67,52 60,53 56,55"/>',
    '</g>',
    '<path d="M50,30 L50,86" fill="none" stroke-width="3"/>'
  ].join(''));

  RAW['طاولة'] = svg('طاولة', [
    '<rect x="8" y="32" width="84" height="14" rx="5" fill="#9A6636"/>',
    '<rect x="8" y="32" width="84" height="6" fill="#B98551" stroke="none"/>',
    '<rect x="8" y="32" width="84" height="14" rx="5" fill="none"/>',
    '<rect x="16" y="46" width="10" height="38" rx="3" fill="#9A6636"/>',
    '<rect x="74" y="46" width="10" height="38" rx="3" fill="#9A6636"/>',
    gloss(28, 36, 8, 2, 0, .4)
  ].join(''));

  RAW['ممحاة'] = svg('ممحاة', [
    '<rect x="14" y="34" width="72" height="32" rx="7" fill="#20A0FF"/>',
    '<path d="M21,34 L79,34 C83,34 86,37 86,41 L86,50 L14,50 L14,41 C14,37 17,34 21,34 Z" fill="#FF4020" stroke="none"/>',
    '<path d="M14,50 L86,50" fill="none" stroke-width="2"/>',
    '<rect x="14" y="34" width="72" height="32" rx="7" fill="none"/>',
    gloss(30, 40, 10, 3, -8, .45)
  ].join(''));

  RAW['مسطرة'] = svg('مسطرة', [
    '<rect x="8" y="38" width="84" height="24" rx="4" fill="#E0C080"/>',
    '<rect x="8" y="38" width="84" height="10" fill="#FFFFC0" stroke="none"/>',
    '<rect x="8" y="38" width="84" height="24" rx="4" fill="none"/>',
    '<g fill="none" stroke-width="2">',
    '<path d="M20,62 L20,50"/><path d="M28,62 L28,55"/><path d="M36,62 L36,55"/>',
    '<path d="M44,62 L44,50"/><path d="M52,62 L52,55"/><path d="M60,62 L60,55"/>',
    '<path d="M68,62 L68,50"/><path d="M76,62 L76,55"/><path d="M84,62 L84,55"/>',
    '</g>',
    gloss(28, 42, 12, 2, 0, .45)
  ].join(''));

  RAW['مبراة'] = svg('مبراة', [
    '<rect x="6" y="43" width="26" height="14" fill="#E08000"/>',
    '<rect x="6" y="43" width="26" height="6" fill="#FFA000" stroke="none"/>',
    '<rect x="6" y="43" width="26" height="14" fill="none"/>',
    '<path d="M32,43 L44,50 L32,57 Z" fill="#B98551" stroke-width="2"/>',
    '<rect x="38" y="32" width="52" height="36" rx="6" fill="#2080E0"/>',
    '<rect x="38" y="32" width="52" height="15" fill="#40C0FF" stroke="none"/>',
    '<rect x="38" y="32" width="52" height="36" rx="6" fill="none"/>',
    '<path d="M38,42 L52,46 L52,54 L38,58 Z" fill="#1060A0" stroke-width="2"/>',
    '<rect x="56" y="37" width="30" height="26" rx="3" fill="#C0C0C0" stroke-width="2"/>',
    '<path d="M56,50 L86,50" fill="none" stroke="#606060" stroke-width="2"/>',
    '<circle cx="64" cy="43" r="2.5" fill="#606060" stroke="none"/>',
    '<circle cx="78" cy="57" r="2.5" fill="#606060" stroke="none"/>',
    gloss(50, 36, 6, 2, 0, .4)
  ].join(''));

  RAW['كرة'] = svg('كرة', [
    '<circle cx="50" cy="50" r="36" fill="#F9F8F3"/>',
    '<path d="M50,14 C60,26 60,74 50,86 C62,86 74,74 78,62 C72,54 72,46 78,38 C74,26 62,14 50,14 Z" fill="#20A0FF" stroke="none"/>',
    '<path d="M50,14 C40,26 40,74 50,86 C38,86 26,74 22,62 C28,54 28,46 22,38 C26,26 38,14 50,14 Z" fill="#FF2020" stroke="none"/>',
    '<path d="M50,14 C56,26 56,74 50,86 C44,74 44,26 50,14 Z" fill="#E0C060" stroke="none"/>',
    '<path d="M78,38 C84,46 84,54 78,62 C86,54 86,46 78,38 Z" fill="#60C020" stroke="none"/>',
    '<circle cx="50" cy="50" r="36" fill="none"/>',
    '<path d="M50,14 C60,26 60,74 50,86" fill="none" stroke-width="2"/>',
    '<path d="M50,14 C40,26 40,74 50,86" fill="none" stroke-width="2"/>',
    '<path d="M22,38 C28,46 28,54 22,62" fill="none" stroke-width="2"/>',
    '<path d="M78,38 C72,46 72,54 78,62" fill="none" stroke-width="2"/>',
    gloss(36, 32, 9, 5, -35, .6)
  ].join(''));

  /* ══ أدواتُ تنظيفٍ وموسيقى ═════════════════════════════════════════════ */

  RAW['كيس'] = svg('كيس', [
    '<g fill="none" stroke-width="3">',
    '<path d="M36,38 C36,24 40,16 50,16 C60,16 64,24 64,38"/>',
    '</g>',
    '<path d="M20,36 L80,36 L86,84 C86,87 84,89 81,89 L19,89 C16,89 14,87 14,84 Z" fill="#0080C0"/>',
    '<path d="M20,36 L44,36 L46,89 L19,89 C16,89 14,87 14,84 Z" fill="#00A0E0" stroke="none"/>',
    '<path d="M20,36 L80,36 L86,84 C86,87 84,89 81,89 L19,89 C16,89 14,87 14,84 Z" fill="none"/>',
    '<rect x="14" y="34" width="72" height="9" rx="4" fill="#40C0FF" stroke-width="2"/>',
    gloss(28, 56, 4, 14, 4, .3)
  ].join(''));

  RAW['ملقط'] = svg('ملقط', [
    '<path d="M45,16 C38,28 22,40 20,58 C19,68 26,74 34,74" fill="none" stroke-width="10"/>',
    '<path d="M45,16 C38,28 22,40 20,58 C19,68 26,74 34,74" fill="none" stroke="#C0C0C0" stroke-width="6"/>',
    '<path d="M55,16 C62,28 78,40 80,58 C81,68 74,74 66,74" fill="none" stroke-width="10"/>',
    '<path d="M55,16 C62,28 78,40 80,58 C81,68 74,74 66,74" fill="none" stroke="#C0C0C0" stroke-width="6"/>',
    '<path d="M45,16 C47,10 53,10 55,16" fill="none" stroke-width="10"/>',
    '<path d="M45,16 C47,10 53,10 55,16" fill="none" stroke="#808080" stroke-width="6"/>',
    '<rect x="22" y="72" width="24" height="12" rx="4" fill="#E08000"/>',
    '<rect x="22" y="72" width="24" height="5" fill="#FFA000" stroke="none"/>',
    '<rect x="22" y="72" width="24" height="12" rx="4" fill="none"/>',
    '<rect x="54" y="72" width="24" height="12" rx="4" fill="#E08000"/>',
    '<rect x="54" y="72" width="24" height="5" fill="#FFA000" stroke="none"/>',
    '<rect x="54" y="72" width="24" height="12" rx="4" fill="none"/>'
  ].join(''));

  RAW['قفاز'] = svg('قفاز', [
    '<path d="M30,44 L30,26 C30,22 33,19 37,19 C41,19 44,22 44,26 L44,40 L44,22 C44,18 47,15 51,15 C55,15 58,18 58,22 L58,40 L58,26 C58,22 61,19 65,19 C69,19 72,22 72,26 L72,58 C72,72 64,82 50,82 C36,82 28,72 28,58 L28,50 C24,46 20,44 16,44 C12,44 10,48 13,52 L24,66" fill="#E0C080"/>',
    '<path d="M30,44 L30,26 C30,22 33,19 37,19 C41,19 44,22 44,26 L44,58 C44,72 44,78 44,82 C36,82 28,72 28,58 L28,50 C24,46 20,44 16,44 C12,44 10,48 13,52 L24,66" fill="#FFFFC0" stroke="none"/>',
    '<path d="M30,44 L30,26 C30,22 33,19 37,19 C41,19 44,22 44,26 L44,40 L44,22 C44,18 47,15 51,15 C55,15 58,18 58,22 L58,40 L58,26 C58,22 61,19 65,19 C69,19 72,22 72,26 L72,58 C72,72 64,82 50,82 C36,82 28,72 28,58 L28,50 C24,46 20,44 16,44 C12,44 10,48 13,52 L24,66" fill="none"/>',
    '<path d="M28,74 L72,74 L72,86 C72,88 70,90 68,90 L32,90 C30,90 28,88 28,86 Z" fill="#E0A87F" stroke-width="2"/>',
    gloss(36, 34, 3, 8, 4, .4)
  ].join(''));

  RAW['طبل'] = svg('طبل', [
    '<path d="M22,40 L78,40 L78,72 C78,78 66,82 50,82 C34,82 22,78 22,72 Z" fill="#E02000"/>',
    '<path d="M22,40 L40,40 L40,81 C29,79 22,76 22,72 Z" fill="#FF2020" stroke="none"/>',
    '<path d="M22,40 L78,40 L78,72 C78,78 66,82 50,82 C34,82 22,78 22,72 Z" fill="none"/>',
    '<g fill="none" stroke="#E0C060" stroke-width="3">',
    '<path d="M30,44 L42,72"/><path d="M42,44 L54,72"/><path d="M54,44 L66,72"/><path d="M66,44 L78,68"/>',
    '</g>',
    '<ellipse cx="50" cy="40" rx="28" ry="10" fill="#F9F8F3"/>',
    '<path d="M28,52 L18,22" fill="none" stroke-width="7"/>',
    '<path d="M28,52 L18,22" fill="none" stroke="#B98551" stroke-width="4"/>',
    '<circle cx="17" cy="19" r="6" fill="#9A6636" stroke-width="2"/>',
    '<path d="M72,52 L82,22" fill="none" stroke-width="7"/>',
    '<path d="M72,52 L82,22" fill="none" stroke="#B98551" stroke-width="4"/>',
    '<circle cx="83" cy="19" r="6" fill="#9A6636" stroke-width="2"/>',
    gloss(40, 37, 8, 3, -8, .55)
  ].join(''));

  /* ══ أطعمة ═════════════════════════════════════════════════════════════ */

  RAW['حليب'] = svg('حليب', [
    '<path d="M29,20 L71,20 L64,84 C64,88 61,90 58,90 L42,90 C39,90 36,88 36,84 Z" fill="#F7F6F1"/>',
    '<path d="M31,32 L69,32 L63,82 C63,86 61,87 58,87 L42,87 C39,87 37,86 37,82 Z" fill="#FFFFFF" stroke="none"/>',
    '<ellipse cx="50" cy="32" rx="19" ry="6" fill="#F9F8F3" stroke-width="2"/>',
    '<path d="M29,20 L71,20 L64,84 C64,88 61,90 58,90 L42,90 C39,90 36,88 36,84 Z" fill="none"/>',
    '<ellipse cx="50" cy="20" rx="21" ry="6.5" fill="none"/>',
    gloss(40, 56, 4, 16, 3, .55)
  ].join(''));

  RAW['إجاص'] = svg('إجاص', [
    '<path d="M50,26 C50,20 51,15 54,10" fill="none" stroke="#7A4C22" stroke-width="5"/>',
    '<path d="M54,16 C62,10 74,13 74,21 C66,27 56,25 54,16 Z" fill="#60C020" stroke-width="2"/>',
    '<path d="M50,24 C58,24 62,32 60,42 C58,52 72,56 72,68 C72,80 62,90 50,90 C38,90 28,80 28,68 C28,56 42,52 40,42 C38,32 42,24 50,24 Z" fill="#80C020"/>',
    '<path d="M50,24 C42,24 38,32 40,42 C42,52 28,56 28,68 C28,80 38,90 50,90 Z" fill="#B0D840" stroke="none"/>',
    '<path d="M50,24 C58,24 62,32 60,42 C58,52 72,56 72,68 C72,80 62,90 50,90 C38,90 28,80 28,68 C28,56 42,52 40,42 C38,32 42,24 50,24 Z" fill="none"/>',
    gloss(39, 64, 5, 11, -18, .45)
  ].join(''));

  RAW['سلطة'] = svg('سلطة', [
    '<path d="M28,44 C24,34 32,26 42,30 C44,20 58,20 60,30 C70,26 78,34 74,44 Z" fill="#4A9018" stroke-width="2"/>',
    '<path d="M34,44 C30,36 36,30 42,33 C44,25 56,25 58,33 C64,30 70,36 66,44 Z" fill="#60C020" stroke="none"/>',
    '<circle cx="62" cy="40" r="8" fill="#FF2020" stroke-width="2"/>',
    '<circle cx="38" cy="41" r="6" fill="#E08000" stroke-width="2"/>',
    '<path d="M14,46 L86,46 C86,68 72,82 50,82 C28,82 14,68 14,46 Z" fill="#C0C0C0"/>',
    '<path d="M14,46 L50,46 L50,82 C28,82 14,68 14,46 Z" fill="#F9F8F3" stroke="none"/>',
    '<path d="M14,46 L86,46 C86,68 72,82 50,82 C28,82 14,68 14,46 Z" fill="none"/>',
    gloss(30, 58, 5, 10, -30, .5)
  ].join(''));

  RAW['أرز'] = svg('أرز', [
    '<path d="M26,54 C26,38 36,28 50,28 C64,28 74,38 74,54 Z" fill="#F9F8F3"/>',
    '<path d="M26,54 C26,38 36,28 50,28 L50,54 Z" fill="#FFFFFF" stroke="none"/>',
    '<path d="M26,54 C26,38 36,28 50,28 C64,28 74,38 74,54 Z" fill="none"/>',
    '<g fill="none" stroke="#C88A5E" stroke-width="2">',
    '<path d="M34,48 C36,45 39,45 41,48"/><path d="M45,50 C47,47 50,47 52,50"/>',
    '<path d="M56,48 C58,45 61,45 63,48"/><path d="M40,41 C42,38 45,38 47,41"/>',
    '<path d="M52,40 C54,37 57,37 59,40"/><path d="M46,33 C48,30 51,30 53,33"/>',
    '<path d="M62,42 C64,39 67,39 68,42"/><path d="M30,50 C32,47 35,47 36,50"/>',
    '</g>',
    '<path d="M10,54 L90,54 C90,70 76,80 50,80 C24,80 10,70 10,54 Z" fill="#20A0FF"/>',
    '<path d="M10,54 L50,54 L50,80 C24,80 10,70 10,54 Z" fill="#40C0FF" stroke="none"/>',
    '<path d="M10,54 L90,54 C90,70 76,80 50,80 C24,80 10,70 10,54 Z" fill="none"/>',
    gloss(26, 63, 5, 8, -30, .5)
  ].join(''));

  RAW['فواكه'] = svg('فواكه', [
    '<path d="M34,32 C34,26 36,22 39,19" fill="none" stroke="#7A4C22" stroke-width="4"/>',
    '<path d="M34,30 C26,30 20,38 22,48 C24,56 28,58 34,58 C40,58 44,56 46,48 C48,38 42,30 34,30 Z" fill="#E02000"/>',
    '<path d="M34,30 C26,30 20,38 22,48 C24,56 28,58 34,58 L34,30 Z" fill="#FF2020" stroke="none"/>',
    '<path d="M34,30 C26,30 20,38 22,48 C24,56 28,58 34,58 C40,58 44,56 46,48 C48,38 42,30 34,30 Z" fill="none"/>',
    '<path d="M66,26 C62,22 60,20 58,20 C62,26 62,38 56,46 C50,54 60,58 68,54 C78,48 76,34 66,26 Z" fill="#E0C060"/>',
    '<path d="M66,26 C62,22 60,20 58,20 C62,26 62,38 56,46 C50,54 60,58 68,54 Z" fill="#FFFFC0" stroke="none"/>',
    '<path d="M66,26 C62,22 60,20 58,20 C62,26 62,38 56,46 C50,54 60,58 68,54 C78,48 76,34 66,26 Z" fill="none"/>',
    '<path d="M12,58 L88,58 C88,74 74,86 50,86 C26,86 12,74 12,58 Z" fill="#C06000"/>',
    '<path d="M12,58 L50,58 L50,86 C26,86 12,74 12,58 Z" fill="#E08000" stroke="none"/>',
    '<path d="M12,58 L88,58 C88,74 74,86 50,86 C26,86 12,74 12,58 Z" fill="none"/>',
    gloss(27, 66, 5, 8, -30, .45)
  ].join(''));

  /* «سمك» اسمُ جنسٍ لِـ«سمكة» — الرسمُ واحدٌ والوسمُ يتبعُ الكلمة، فلا يُرسَمُ مرّتَين */
  RAW['سمك'] = RAW['سمكة'].replace('aria-label="سمكة"', 'aria-label="سمك"');

  /* ══ بناءُ السجلِّ النهائيِّ بمفاتيحَ مجرّدة ═══════════════════════════ */
  var PICS = {};
  Object.keys(RAW).forEach(function(k){ PICS[key(k)] = RAW[k]; });

  window.QPICS   = PICS;
  window.qPicKey = key;
  window.qPic    = function(word){ return PICS[key(word)] || ''; };
})();
