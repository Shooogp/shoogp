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
