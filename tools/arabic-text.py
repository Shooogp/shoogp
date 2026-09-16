"""تشكيلُ نصٍّ عربيٍّ ورسمُه صورةً لبطاقاتِ الكتب (Pillow + HarfBuzz + FreeType).

الاستعمال:
    from importlib.machinery import SourceFileLoader
    at = SourceFileLoader('at', 'tools/arabic-text.py').load_module()
    img, ascent = at.shape_and_render('الفصل الدراسي الأول', 'Cairo-Black.ttf', 62)
    card.paste(img, (x, y), img)          # img صورة RGBA مقصوصةٌ على النصّ

المتطلبات: pip install uharfbuzz freetype-py
خطُّ Cairo (OFL) يُنزَّل من Google Fonts (روابطُ TTF ثابتة عبر css2 بـUser-Agent قديم):
    https://fonts.googleapis.com/css2?family=Cairo:wght@700;900

⚠️ العلّةُ التي أفسدت بطاقةَ الإنجليزية (٢٠٢٦-٠٩-١٦): تفعيلُ init/medi/fina كميزاتٍ
عامّةٍ في hb.shape(...) يفرضُ الشكلَ «النهائيَّ» على كلِّ حرف، فتخرجُ الحروفُ بأشكالِها
السياقيةِ لكن متباعدةً لا تلتقي (مبعثرة). لا تُمرَّرُ ميزاتٌ إطلاقاً — المُشكِّلُ
العربيُّ يطبّقُها حرفاً حرفاً بنفسِه.
"""
import uharfbuzz as hb
import freetype
from PIL import Image
import numpy as np

_face_cache = {}


def _ft_face(font_path):
    if font_path not in _face_cache:
        _face_cache[font_path] = freetype.Face(font_path)
    return _face_cache[font_path]


def shape_and_render(text, font_path, size_px, color=(255, 255, 255), rtl=True):
    """يُعيدُ (صورة RGBA مقصوصةً على النصّ، ارتفاعَ السطرِ فوقَ خطِّ الأساس)."""
    with open(font_path, 'rb') as f:
        fontdata = f.read()
    hb_font = hb.Font(hb.Face(fontdata))
    hb_font.scale = (int(size_px * 64), int(size_px * 64))  # 26.6 → px = units >> 6

    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    if rtl:
        buf.direction = 'rtl'
    buf.script = 'Arab'
    buf.language = 'ar'
    hb.shape(hb_font, buf)  # بلا ميزاتٍ عامّة — انظر التحذير أعلاه

    ft = _ft_face(font_path)
    ft.set_char_size(int(size_px * 64))

    pen_x = pen_y = 0
    glyphs = []
    min_left = max_right = max_top = min_bottom = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        ft.load_glyph(info.codepoint, freetype.FT_LOAD_RENDER | freetype.FT_LOAD_TARGET_NORMAL)
        bm = ft.glyph.bitmap
        x0 = pen_x + (pos.x_offset >> 6) + ft.glyph.bitmap_left
        y0 = pen_y - (pos.y_offset >> 6) - ft.glyph.bitmap_top
        w, h = bm.width, bm.rows
        arr = np.array(bm.buffer, dtype=np.uint8).reshape(h, w) if w and h else np.zeros((0, 0), np.uint8)
        glyphs.append((x0, y0, w, h, arr))
        min_left, max_right = min(min_left, x0), max(max_right, x0 + w)
        max_top, min_bottom = min(max_top, y0), max(min_bottom, y0 + h)
        pen_x += pos.x_advance >> 6
        pen_y += pos.y_advance >> 6

    cw, ch = max_right - min_left, min_bottom - max_top
    if cw <= 0 or ch <= 0:
        return Image.new('RGBA', (1, 1), (0, 0, 0, 0)), 0

    canvas = np.zeros((ch, cw, 4), dtype=np.uint8)
    r, g, b = color
    for x0, y0, w, h, arr in glyphs:
        if not (w and h):
            continue
        gx, gy = x0 - min_left, y0 - max_top
        region = canvas[gy:gy + h, gx:gx + w]
        a_new = arr.astype(np.uint16)
        a_old = region[..., 3].astype(np.uint16)
        region[..., 0], region[..., 1], region[..., 2] = r, g, b
        region[..., 3] = np.clip(a_new + a_old * (255 - a_new) // 255, 0, 255).astype(np.uint8)
        canvas[gy:gy + h, gx:gx + w] = region

    return Image.fromarray(canvas, 'RGBA'), -max_top
