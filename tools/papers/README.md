# مولّد الأوراق الورقية — العلوم (الفصل الأول)

مكتبة الأوراق في `data/papers/sci-g<الصف>.json` وتعرضها `papers.html` (وضع المطوّر).
ولّدها سير n8n «شوجب — وكيل الأوراق الورقية» (`pGuffyWwJHbXHhCL`) بجيميناي، بتعليمات `sys-prompt.txt`
المأخوذة من وثيقة تقويم المجال الثاني ١–٤ (سبتمبر ٢٠٢٦) وملحقاتها.

## إعادة التوليد
1. انشر سير n8n (يبقى غير منشور في العادة، لأن مفتاح التجربة في `gen.cjs` علني).
2. `node tools/papers/export-bank.cjs . tools/papers/bank-sci.json` — بنك الأسئلة من `js/questions.js`.
3. `node tools/papers/gen.cjs --model=gemini-3.8-flash --conc=5` — يولّد كل ورقة في `tools/papers/out/`،
   ويفحصها بـ`validate.js`، ويطلب تصحيحاً حتى مرّتين عند المخالفة. `--skip-done` يكمل الناقص فقط،
   ومعرّف ورقة أو أكثر (مثل `g4s-2-test`) يولّدها وحدها.
4. `node tools/papers/assemble.cjs data/papers` — يجمعها في ملفّ لكل صف ويُلحق صور مفردات label.
5. أعد إيقاف نشر سير n8n.

`bank-sci.json` و`out/` ملفّات عمل لا تُودَع.
