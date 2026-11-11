// رسومُ شوجب المتاحةُ للأوراق: يقرأ سِجلَّ js/qpics.js نفسَه (المصدرَ الذي ترسمُ منه الصفحة)،
// فيُعطي الوكيلَ قائمةَ الكلماتِ التي لها رسم، ويُعطي الفاحصَ مفاتيحَها المجرّدة.
const fs = require('fs'), path = require('path'), vm = require('vm');

function load() {
  const w = {};
  const ctx = { window: w, document: { currentScript: { src: 'js/qpics.js' }, getElementsByTagName: () => [] }, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../../js/qpics.js'), 'utf8'), ctx);
  const keys = new Set(Object.keys(w.QPICS));
  // الكلمةُ كما تُكتَب (من alt أو aria-label)، عربيّةً، بلا المفاتيحِ المركّبةِ بالشرطة ولا عباراتِ الموضع.
  const words = new Set();
  for (const [k, v] of Object.entries(w.QPICS)) {
    const m = /(?:alt|aria-label)="([^"]+)"/.exec(v);
    const d = m ? m[1] : k;
    if (/[؀-ۿ]/.test(d) && !/-/.test(d) && !/^(في|تحت|داخل|قرب) /.test(d)) words.add(d);
  }
  return { keys, words: [...words], key: w.qPicKey };
}

module.exports = load();
