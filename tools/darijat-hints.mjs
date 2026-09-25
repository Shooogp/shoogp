/* ═══ طريقةُ داريجات — حروفٌ لاتينيةٌ مرافقةٌ تُجبرُ المحرّكَ على الحركةِ المكتوبة ═══
   اقترحَها دعمُ داريجات (٢٠٢٦-٠٩-٢٥) وأثبتَها المالكُ بالسماعِ على جملةِ «أكمل» (الصيغةُ m2):
   - بعدَ كلِّ حركةٍ قصيرةٍ حرفُ علّةٍ لاتينيٌّ صغير: فتحة a · ضمّة u · كسرة i (والتنوينُ an/un/in).
   - بعدَ كلِّ حرفٍ ساكنٍ (سكونٌ صريح) نظيرُه اللاتينيُّ كبيراً، والحرفُ العربيُّ باقٍ: «أَكْkمِiلْL».
   - السكونُ الوقفيُّ في آخرِ الجملةِ لا يُرافَق (يبقى كما هو)، والشدّةُ تبقى وتتبعُها حركتُها.
   تُطبَّقُ بعدَ liaison() على النصِّ المنطوقِ وحدَه، ولا تمسُّ النصَّ المعروض. */
const LAT = { 'ب':'B','ت':'T','ث':'TH','ج':'J','ح':'H','خ':'KH','د':'D','ذ':'DH','ر':'R','ز':'Z','س':'S','ش':'SH',
  'ص':'S','ض':'D','ط':'T','ظ':'Z','غ':'GH','ف':'F','ق':'Q','ك':'K','ل':'L','م':'M','ن':'N','ه':'H','و':'W','ي':'Y','ة':'T' };
const VOW = { 'َ':'a', 'ُ':'u', 'ِ':'i', 'ً':'an', 'ٌ':'un', 'ٍ':'in' };
export function darijat(text){
  const words = text.split(' ');
  return words.map((w, wi) => {
    const last = wi === words.length - 1;
    let out = '';
    for (let i = 0; i < w.length; i++) {
      const c = w[i]; out += c;
      if (VOW[c]) { if (w[i + 1] === '\u0651') { out += '\u0651'; i++; } out += VOW[c]; continue; }   // الشدّةُ قبلَ الحرفِ المرافق
      if (c === '\u0651' && VOW[w[i + 1]]) { out += w[i + 1] + VOW[w[i + 1]]; i++; continue; }
      if (c === 'ْ') {                              // سكون
        const rest = w.slice(i + 1);
        if (last && /^[.،؟!:]*$/.test(rest)) continue;   // وقفُ آخرِ الجملة
        let j = i - 1; while (j >= 0 && /[ً-ْٰ]/.test(w[j])) j--;
        const L = LAT[w[j]]; if (L) out += L;
      }
    }
    return out;
  }).join(' ');
}
if (process.argv[1] && process.argv[1].endsWith('darijat-hints.mjs')) console.log(darijat(process.argv.slice(2).join(' ')));
