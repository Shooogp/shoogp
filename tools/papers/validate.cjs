// فحص ورقة الوكيل مقابل مواصفات الوثيقة والنموذج المعتمد (٢٠٢٦-١١-١١).
// pics (اختياري): { keys: Set, key: fn } من pics.cjs — لفحص أنّ كلَّ كلمةٍ مطلوبٍ رسمُها لها رسمٌ في سِجلّ شوجب.
function validatePaper(p, req, pics) {
  const E = [];
  const strip = s => String(s || '').replace(/[ً-ْٰـ]/g, '').replace(/\s+/g, ' ').trim();
  if (!p || typeof p !== 'object') return ['الناتج ليس كائن JSON'];
  const items = Array.isArray(p.items) ? p.items : null;
  if (!items) return ['لا توجد مصفوفة items'];
  const isTest = req.kind === 'short-test';
  const TYPES = ['mcq','tf','correct-word','matching','fill','classify','sequence','exclude','label','mindmap','short','data-table','opinion'];
  // أنماطُ النموذجِ المعتمدِ للأسئلة القصيرة: اختيارٌ بالتظليل، توصيلٌ بالصور، سؤالُ رأيٍ (توافقه؟ فسّر، ارسم).
  const CORE = ['mcq','matching','opinion'];
  const hasPic = w => !pics || pics.keys.has(pics.key(w));
  const noPic = (list, at, what) => { const miss = list.filter(w => !hasPic(w)); if (miss.length) E.push(`${at}: ${what} بلا رسم في سجلّ شوجب: ${miss.join('، ')}`); };
  const LEVELS = ['knowledge','application','reasoning'];
  const DIFF = { L: 0, M: 1, H: 2 };
  const seeds = {}; const lessonIds = {};
  (req.lessons || []).forEach(l => { lessonIds[l.id] = 1; (l.questions || []).forEach(q => { seeds[q.ref] = q; }); });
  const BANNED_SEED = ['hotspot','find-error','color','puzzle','audio-q','lens','slider'];

  // العدد والمجموع
  const n = items.length;
  const total = items.reduce((s, it) => s + (Number(it.marks) || 0), 0);
  if (isTest) {
    if (!(req.grade === 3 || req.grade === 4)) E.push('الاختبار القصير للصفين الثالث والرابع فقط');
    if (n < 7 || n > 8) E.push(`عدد المفردات ${n} والمطلوب ٧ أو ٨`);
    if (total !== 10) E.push(`المجموع ${total} والمطلوب ١٠`);
  } else {
    if (n < 3 || n > 4) E.push(`عدد المفردات ${n} والمطلوب ٣ أو ٤`);
    if (total !== 5) E.push(`المجموع ${total} والمطلوب ٥`);
  }

  let prevD = -1, kMarks = 0, iMarks = 0;
  const types = [], levels = {}, mcqs = [];
  items.forEach((it, i) => {
    const at = `المفردة ${i + 1}`;
    if (!TYPES.includes(it.type)) { E.push(`${at}: نوع غير مسموح «${it.type}»`); return; }
    types.push(it.type);
    if (![1, 2].includes(Number(it.marks))) E.push(`${at}: الدرجة ${it.marks} والمسموح ١ أو ٢`);
    if (!LEVELS.includes(it.level)) E.push(`${at}: level غير صالح`); else levels[it.level] = 1;
    if (!(it.difficulty in DIFF)) E.push(`${at}: difficulty غير صالحة`);
    else { if (DIFF[it.difficulty] < prevD) E.push(`${at}: ترتيب الصعوبة مخالف (يجب L ثم M ثم H)`); prevD = Math.max(prevD, DIFF[it.difficulty]); }
    if (!['knowledge','inquiry'].includes(it.domain)) E.push(`${at}: domain غير صالح`);
    if (it.domain === 'knowledge') kMarks += Number(it.marks) || 0; else if (it.domain === 'inquiry') iMarks += Number(it.marks) || 0;
    if (!it.objective) E.push(`${at}: لا هدف`);
    if (!it.answerText) E.push(`${at}: لا answerText`);
    // البذرة
    if (it.domain === 'knowledge') {
      const s = seeds[it.seed];
      if (!s) E.push(`${at}: seed «${it.seed}» ليس سؤالاً في الدروس المعطاة`);
      else {
        if (BANNED_SEED.includes(s.type)) E.push(`${at}: بذرة من نوع ممنوع ${s.type}`);
        if (it.type === 'label' && s.type !== 'drag-drop') E.push(`${at}: label يحتاج بذرة drag-drop`);
        const a = strip(it.prompt || it.statement || it.sentence), b = strip(s.prompt || s.statement);
        if (it.type !== 'label' && a && b && a === b) E.push(`${at}: نص منسوخ من الأصل حرفياً`);
      }
    } else if (it.domain === 'inquiry') {
      if (!lessonIds[it.seed] && !seeds[it.seed]) E.push(`${at}: seed «${it.seed}» ليس درساً معطى`);
    }
    // حقول النوع
    const arr = x => Array.isArray(x) ? x : [];
    switch (it.type) {
      case 'mcq': mcqs.push(it);
        if (arr(it.options).length !== 4) E.push(`${at}: mcq يحتاج ٤ بدائل`);
        if (!(Number.isInteger(it.answer) && it.answer >= 0 && it.answer < arr(it.options).length)) E.push(`${at}: answer خارج البدائل`);
        if (new Set(arr(it.options).map(strip)).size !== arr(it.options).length) E.push(`${at}: بدائل مكرّرة`);
        if (Number(it.marks) !== 1) E.push(`${at}: mcq بدرجة واحدة`);
        if (it.pics === true) noPic(arr(it.options), at, 'بدائل');
        if (it.stemPic) noPic([it.stemPic], at, 'stemPic');
        break;
      case 'tf':
        if (isTest) E.push(`${at}: tf ممنوع في الاختبار القصير`);
        if (typeof it.answer !== 'boolean' || !it.statement) E.push(`${at}: tf يحتاج statement وanswer منطقياً`);
        if (Number(it.marks) !== 1) E.push(`${at}: tf بدرجة واحدة`);
        break;
      case 'correct-word':
        if (!it.sentence || !it.wrong || !it.answer) E.push(`${at}: correct-word يحتاج sentence وwrong وanswer`);
        else if (strip(it.sentence).indexOf(strip(it.wrong)) < 0) E.push(`${at}: الكلمة الخاطئة غير موجودة في الجملة`);
        break;
      case 'matching':
        if (arr(it.pairs).length < 3 || arr(it.pairs).length > 4) E.push(`${at}: matching يحتاج ٣–٤ أزواج`);
        if (arr(it.pairs).some(x => !x || !x.a || !x.b)) E.push(`${at}: زوج ناقص`);
        if (!it.extra) E.push(`${at}: matching يحتاج extra (بند زائد في العمود الثاني)`);
        if (it.pics === true || it.pics === 'a') noPic(arr(it.pairs).map(x => x && x.a), at, 'العمود الأول');
        if (it.pics === true || it.pics === 'b') noPic(arr(it.pairs).map(x => x && x.b).concat(it.extra ? [it.extra] : []), at, 'العمود الثاني');
        break;
      case 'opinion':
        if (isTest) E.push(`${at}: opinion للأسئلة القصيرة فقط`);
        if (!it.scenario || !it.question || !it.explain) E.push(`${at}: opinion يحتاج scenario وquestion وexplain`);
        if (!['نعم','لا'].includes(strip(it.answer))) E.push(`${at}: answer في opinion «نعم» أو «لا»`);
        if (it.scenePics) { if (!Array.isArray(it.scenePics) || it.scenePics.length > 3) E.push(`${at}: scenePics مصفوفة من ١–٣`); else noPic(it.scenePics, at, 'scenePics'); }
        break;
      case 'fill': {
        const blanks = (String(it.text || '').match(/\{\}/g) || []).length;
        if (!blanks) E.push(`${at}: fill بلا فراغ {}`);
        if (blanks !== arr(it.answers).length) E.push(`${at}: عدد الفراغات ${blanks} لا يطابق الإجابات ${arr(it.answers).length}`);
        if (!arr(it.distractors).length) E.push(`${at}: fill يحتاج مشتّتاً`);
        break; }
      case 'classify':
        if (arr(it.groups).length < 2 || arr(it.groups).length > 3) E.push(`${at}: classify يحتاج مجموعتين أو ثلاثاً`);
        if (arr(it.groups).some(g => !g || !g.name || arr(g.items).length < 2)) E.push(`${at}: مجموعة ناقصة`);
        if (it.pics === true) noPic(arr(it.groups).flatMap(g => arr(g && g.items)), at, 'عناصر');
        break;
      case 'sequence':
        if (arr(it.steps).length < 3 || arr(it.steps).length > 5) E.push(`${at}: sequence يحتاج ٣–٥ خطوات`);
        break;
      case 'exclude':
        if (arr(it.options).length !== 4) E.push(`${at}: exclude يحتاج ٤ عناصر`);
        if (!(Number.isInteger(it.answer) && it.answer >= 0 && it.answer < arr(it.options).length)) E.push(`${at}: answer خارج العناصر`);
        if (Number(it.marks) !== 1) E.push(`${at}: exclude بدرجة واحدة`);
        if (it.pics === true) noPic(arr(it.options), at, 'عناصر');
        break;
      case 'label': {
        const s = seeds[it.seed];
        if (s && s.type === 'drag-drop') {
          const want = arr(s.targets).map(t => strip(t.answer)).sort().join('|');
          const got = arr(it.answers).map(strip).sort().join('|');
          if (want !== got) E.push(`${at}: أسماء label لا تطابق الأصل`);
        }
        break; }
      case 'mindmap':
        if (!it.center || arr(it.branches).length < 2 || arr(it.branches).some(b => !b || !b.label || !b.answer)) E.push(`${at}: mindmap ناقصة`);
        break;
      case 'short':
        if (!it.prompt || !it.answer) E.push(`${at}: short يحتاج prompt وanswer`);
        break;
      case 'data-table':
        if (!it.table || arr(it.table.headers).length < 2 || arr(it.table.rows).length < 2) E.push(`${at}: data-table يحتاج جدولاً بعمودين وصفّين على الأقل`);
        if (!it.prompt || !it.answer) E.push(`${at}: data-table يحتاج prompt وanswer`);
        break;
    }
    if (Number(it.marks) === 2 && ['mcq','tf','exclude'].includes(it.type)) E.push(`${at}: ${it.type} لا يحمل درجتين`);
  });

  if (isTest) {
    if (mcqs.length !== 2) E.push(`عدد mcq ${mcqs.length} والمطلوب ٢`);
    else if (mcqs[0].level === mcqs[1].level) E.push('مفردتا mcq بالمستوى المعرفي نفسه');
    if (kMarks !== 7) E.push(`درجات المعرفة والفهم ${kMarks} والمطلوب ٧`);
    if (iMarks !== 3) E.push(`درجات الاستقصاء ${iMarks} والمطلوب ٣`);
    const ds = new Set(items.map(it => it.difficulty));
    ['L','M','H'].forEach(d => { if (!ds.has(d)) E.push(`الاختبار بلا مفردة صعوبتها ${d}`); });
  } else {
    if (items.some(it => it.domain !== req.domain)) E.push(`كل المفردات يجب أن تكون من المجال ${req.domain}`);
    if (new Set(types).size !== types.length) E.push('نوع مفردة مكرّر في الورقة');
    if (Object.keys(levels).length < 2) E.push('الورقة بمستوى معرفي واحد');
    if (req.domain === 'inquiry' && !(req.grade === 1 || req.grade === 2)) E.push('أسئلة الاستقصاء القصيرة للصفين ١–٢ فقط');
    if (types.filter(t => CORE.includes(t)).length < 2) E.push('الورقة تحتاج نمطين على الأقل من أنماط النموذج: mcq وmatching وopinion');
  }
  return E;
}
if (typeof module !== 'undefined') module.exports = { validatePaper };
