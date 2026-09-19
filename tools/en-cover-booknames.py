# -*- coding: utf-8 -*-
"""أسماءُ الكتبِ تحتَ الخطِّ الأبيضِ في أغلفةِ الإنجليزية: تُمحى وتُعادُ بخطِّ Cairo عريض (800).
المحو: قناعُ النصِّ القديمِ (مستطيلُه موسَّعاً) **خارجَ القرص** يُملأُ بحلِّ لابلاس من حافّتِه —
فالقرصُ الشفّافُ يبقى كما هو (في الصفِّ الثاني كانَ يغطّي وسطَ السطرِ الثالث).
الرسم: الأسطرُ في الفسحةِ بين الخطِّ الأبيضِ وأعلى القرص، بلونِ النصِّ القديمِ نفسِه."""
import sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = r"D:\منصة شوجب التفاعلية"
HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, 'Cairo-800.ttf')
XC, YC, RD = 499.5, 734.5, 234.8
BOOKS = {1: ['Class Book', 'Activity Book', 'Sounds and Spelling Book'],
         2: ['Class Book', 'Activity Book', 'Sounds and Spelling Book'],
         3: ['Class Book', 'Activity Book'],
         4: ['Class Book', 'Activity Book']}

def white_line(a):
    """الخطُّ الأبيض: صفوفٌ يكادُ عرضُها كلُّه (١٥٪ الأدنى) يكونُ فاتحاً — والعنوانُ حروفٌ متقطّعةٌ لا تبلغُ ذلك.
    (في الصفَّين ٣ و٤ الخطُّ أبيضُ شفّافٌ ~١٦٠ لا ٢٤٠، فالعتبةُ ١٢٠.)"""
    rows = [(np.percentile(a[y, 120:880].min(1), 15), y) for y in range(300, 470)]
    top = max(rows)[0]
    ys = [y for v, y in rows if v > max(120, 0.8 * top)]
    return min(ys), max(ys)

def laplace_mask(u, mask, side, iters=4000):
    """ملءُ لابلاس لا يعبرُ حافّةَ القرص: كلُّ بكسلٍ يأخذُ متوسّطَ جيرانِه **من جانبِه نفسِه** وحدَهم،
    فيُملأُ ما داخلَ القرصِ من داخلِه وما خارجَه من خارجِه، وتبقى الحافّةُ حادّةً كما رُسِمَت."""
    u = u.copy()
    nb = []
    for sh, ax in ((1, 0), (-1, 0), (1, 1), (-1, 1)):
        nb.append((np.roll(side, sh, ax) == side).astype(np.float64))
    cnt = np.maximum(sum(nb), 1)
    for _ in range(iters):
        acc = np.zeros_like(u)
        for (sh, ax), w in zip(((1, 0), (-1, 0), (1, 1), (-1, 1)), nb):
            acc += np.roll(u, sh, ax) * w
        u[mask] = (acc / cnt)[mask]
    return u

def run(g, write=False):
    p = os.path.join(ROOT, 'images', 'cover-g%d-en.jpg' % g)
    a = np.asarray(Image.open(p).convert('RGB')).astype(np.float64)
    H, W = a.shape[:2]
    ly0, ly1 = white_line(a.astype(np.uint8))
    disc_top = YC - RD
    yy, xx = np.mgrid[0:H, 0:W]
    in_disc = (xx - XC) ** 2 + (yy - YC) ** 2 <= (RD + 3) ** 2
    rim = np.abs(np.sqrt((xx - XC) ** 2 + (yy - YC) ** 2) - RD) <= 3     # حافّةُ القرصِ نفسُها لا تُمَسّ
    # المحو: الشريطُ كلُّه بين أعلى الخطِّ (السطرُ الأوّلُ في الصفِّ الأوّلِ يلامسُه) وما تحتَ أعلى القرص،
    # في الوسطِ الذي تسكنُه الأسماءُ وحدَها — خارجَ القرص.
    by0, by1 = ly0 - 8, int(disc_top + 40)
    bx0, bx1 = 160, W - 160
    reg = a[ly1+3:by1, bx0:bx1]
    med = np.median(reg, axis=1)
    txt = (np.abs(reg - med[:, None, :]).sum(2) > 45) & ~in_disc[ly1+3:by1, bx0:bx1]
    col = reg[txt]
    lum = col @ np.array([.299, .587, .114])
    ink = tuple(int(v) for v in np.median(col[lum <= np.percentile(lum, 20)], axis=0))
    # الخطُّ: لونُ كلِّ صفٍّ منه يُؤخَذُ من طرفَيه (خارجَ الأسماء) ويُعادُ رسمُه بعدَ الملء
    lxs = np.where(a[ly0:ly1+1].min(2).min(0) > 100)[0]
    lx0, lx1 = int(lxs.min()), int(lxs.max()) + 1
    line_rows = {y: np.median(np.concatenate([a[y, lx0+2:bx0], a[y, bx1:lx1-2]]), axis=0) for y in range(ly0, ly1+1)}
    mask = np.zeros((H, W), bool); mask[by0:by1, bx0:bx1] = True
    out = a.copy()
    sub = (slice(by0-2, by1+2), slice(bx0-2, bx1+2))
    # ثلاثُ طبقاتٍ لا يعبرُ الملءُ بينها: خارجَ القرص · داخلَه · حافّتُه (تُملأُ على امتدادِ القوسِ من طرفَيه)
    side = np.where(rim, 2, np.where(in_disc, 1, 0))
    u = out[sub].copy(); m = mask[sub]; sd = side[sub]
    for c in range(3):
        u[..., c] = laplace_mask(u[..., c], m, sd)
    out[sub] = u
    for y, v in line_rows.items():
        out[y, max(lx0, bx0-2):min(lx1, bx1+2)] = v
    img = Image.fromarray(np.clip(np.round(out), 0, 255).astype(np.uint8))
    # الأسطرُ الجديدة: تملأُ الفسحةَ بين الخطِّ وأعلى القرص
    lines = BOOKS[g]
    top, bot = ly1 + 10, disc_top - 3
    avail = bot - top
    size = int(min(42, avail / (len(lines) * 1.10)))
    d = ImageDraw.Draw(img)
    while True:
        f = ImageFont.truetype(FONT, size)
        widest = max(d.textbbox((0, 0), s, font=f)[2] for s in lines)
        if widest <= 820 or size <= 20: break
        size -= 1
    asc, desc = f.getmetrics()
    lh = size * 1.10
    block = lh * (len(lines) - 1) + (asc + desc) * 0.72
    y = top + (avail - block) / 2 - (asc + desc) * 0.14
    for s in lines:
        d.text((W / 2, y), s, font=f, fill=ink, anchor='ma')
        y += lh
    print('g%d' % g, 'line', (ly0, ly1), (lx0, lx1), 'erase', (bx0, by0, bx1, by1), 'ink', ink, 'font', size, 'avail', round(avail))
    img.save(os.path.join(HERE, 'en-g%d.png' % g))
    if write:
        img.save(p, quality=95, subsampling=0)

if __name__ == '__main__':
    w = '--write' in sys.argv
    for g in (1, 2, 3, 4):
        run(g, w)
