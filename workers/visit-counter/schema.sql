-- شوجب — بنيةُ عدّادِ الدخول (D1/SQLite)
-- تُنفَّذُ مرّةً واحدةً قبلَ البذر:
--   npx wrangler d1 execute shoogp-visits --remote --file=schema.sql

-- صفٌّ لكلِّ يومٍ بتوقيتِ مسقط. `day` مفتاحٌ أساسيٌّ كي يكونَ
-- `ON CONFLICT DO UPDATE` ذرّياً فلا تضيعَ زيادةٌ عندَ التزامن.
CREATE TABLE IF NOT EXISTS days (
  day    TEXT    PRIMARY KEY,
  visits INTEGER NOT NULL DEFAULT 0
);

-- صفٌّ لكلِّ ساعةٍ من كلِّ يوم — يُتيحُ «الأسبوعَ الماضي حتى هذه الساعة».
-- ‏٢٤ صفّاً في اليومِ على الأكثر، أي نحوُ ٨٨٠٠ في السنة: لا شيءَ أمامَ سعةِ D1.
CREATE TABLE IF NOT EXISTS hits (
  day    TEXT    NOT NULL,
  hour   INTEGER NOT NULL,
  visits INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, hour)
);

-- ═══ قِمْعُ الكتب — وحدةُ الشراءِ الحقيقيّة (قرارُ المالك ٢٠٢٦-٠٩-٢١) ═══
-- عدّادُ `days` يقيسُ **أجهزةً**، والسبّورةُ الواحدةُ تستعملُها ثلاثُ معلّماتٍ في
-- اليومِ فتُحسَبُ واحدة. أمّا **الكتابُ فهو ما يُشترى**: معلّمةٌ تفتحُ العلومَ
-- وأخرى تفتحُ الإنجليزيةَ على اللوحِ نفسِه = فرصتا شراءٍ لا واحدة.
-- فالوحدةُ هنا: **(يوم × كتاب × مرحلة)** — والجهازُ يُحسَبُ مرّةً لكلِّ كتابٍ في اليوم.
--
-- والمراحلُ ثلاثٌ تصنعُ قِمْعاً:
--   open — فُتِحَ الكتاب            (الفرصة)
--   lock — نُقِرَ درسٌ مقفولٌ فيه    (الاهتمام)
--   code — فُتِحَت نافذةُ الرمز      (نيّةُ الشراء — أقربُ ما يُقاسُ إلى عمليّةِ بيع)
CREATE TABLE IF NOT EXISTS books (
  day   TEXT    NOT NULL,
  book  TEXT    NOT NULL,
  stage TEXT    NOT NULL,
  n     INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, book, stage)
);
