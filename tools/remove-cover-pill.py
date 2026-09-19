# -*- coding: utf-8 -*-
"""حذفُ شارةِ «قريباً» المرسومةِ أسفلَ يسارِ أغلفةِ الكتب وترميمُ الخلفيّة (تدرّجٌ + شبكةُ نقاط).
الكشف: في المنطقةِ أسفلَ اليسار، البكسلُ الذي يبتعدُ لونُه عن «خلفيّةِ صفِّه» (وسيطُ الجانبِ الأيمنِ
من المنطقةِ نفسِها) أكثرَ من عتبة، ثمّ أكبرُ كتلةٍ متّصلة. الترميم: نسخُ رقعةٍ من فوقِ الشارةِ مباشرةً
بإزاحةٍ رأسيّةٍ هي مضاعفُ خطوةِ شبكةِ النقاط (فتنطبقُ النقاط)، مع تصحيحِ لونِ كلِّ صفٍّ بفرقِ التدرّج."""
import sys, os, glob
import numpy as np
from PIL import Image
from collections import deque

ROOT = r"D:\منصة شوجب التفاعلية"
OUT = os.path.dirname(os.path.abspath(__file__))

def dot_pitch(a):
    """خطوةُ شبكةِ النقاطِ الرأسيّة: ذروةُ الارتباطِ الذاتيِّ لعمودٍ من الخلفيّةِ اليسرى العليا."""
    H, W = a.shape[:2]
    g = a[int(H*.55):int(H*.80), int(W*.03):int(W*.30)].mean(axis=2)
    g = g - g.mean(axis=1, keepdims=True)
    prof = g.std(axis=1)                        # صفوفُ النقاطِ أعلى تبايناً
    prof = prof - prof.mean()
    best, bl = 0, None
    for lag in range(8, 60):
        c = float((prof[:-lag] * prof[lag:]).mean())
        if c > best: best, bl = c, lag
    return bl

def find_pill(a):
    H, W = a.shape[:2]
    y0, y1, x0, x1 = int(H*.84), H, 0, int(W*.40)
    reg = a[y0:y1, x0:x1].astype(np.int32)
    ref = np.median(reg[:, int(reg.shape[1]*.62):], axis=1)      # خلفيّةُ كلِّ صفّ
    d = np.abs(reg - ref[:, None, :]).sum(axis=2)
    m = d > 24
    # أكبرُ كتلةٍ متّصلة
    h, w = m.shape; seen = np.zeros_like(m); best = None
    for sy in range(h):
        for sx in range(w):
            if m[sy, sx] and not seen[sy, sx]:
                q = deque([(sy, sx)]); seen[sy, sx] = True; pts = []
                while q:
                    y, x = q.popleft(); pts.append((y, x))
                    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                        ny, nx = y+dy, x+dx
                        if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not seen[ny, nx]:
                            seen[ny, nx] = True; q.append((ny, nx))
                if best is None or len(pts) > len(best): best = pts
    if not best or len(best) < 300: return None
    ys = [p[0] for p in best]; xs = [p[1] for p in best]
    return (x0+min(xs), y0+min(ys), x0+max(xs)+1, y0+max(ys)+1, len(best))

def plane(a, x0, y0, x1, y1, R):
    """مستوى لونيٌّ (a+bx+cy) لكلِّ قناةٍ مُقدَّرٌ من حلقةٍ عرضُها R حولَ المستطيل، بإسقاطِ الشواذّ (النقاط)."""
    H, W = a.shape[:2]
    X0, Y0, X1, Y1 = max(0, x0-R), max(0, y0-R), min(W, x1+R), min(H, y1+R)
    yy, xx = np.mgrid[Y0:Y1, X0:X1]
    ring = ~((yy >= y0) & (yy < y1) & (xx >= x0) & (xx < x1))
    X = np.stack([np.ones(ring.sum()), xx[ring], yy[ring]], 1).astype(np.float64)
    V = a[Y0:Y1, X0:X1][ring].astype(np.float64)
    keep = np.ones(len(V), bool)
    for _ in range(3):
        coef, *_ = np.linalg.lstsq(X[keep], V[keep], rcond=None)
        res = np.abs(V - X @ coef).sum(1)
        keep = res < max(6.0, 2.5 * np.median(res[keep]))
    return coef

def median_bg(a, k):
    """خلفيّةٌ بلا نقاط: مرشِّحُ وسيطٍ يمحو النقاطَ الصغيرةَ ويحفظُ حوافَّ الأقواس."""
    from PIL import ImageFilter
    return np.asarray(Image.fromarray(a).filter(ImageFilter.MedianFilter(k))).astype(np.float64)

def laplace_fill(bg, x0, y0, x1, y1, iters=1500):
    """ملءُ المستطيلِ بحلِّ معادلةِ لابلاس من حافّتِه — تدرّجٌ ناعمٌ يلتقي بالمحيطِ بلا حدّ."""
    u = bg[y0-1:y1+1, x0-1:x1+1].copy()
    inner = u[1:-1, 1:-1]
    # بدايةٌ خطّيّةٌ بين الحافّتين العليا والسفلى تسرّعُ التقارب
    t = np.linspace(0, 1, inner.shape[0])[:, None, None]
    u[1:-1, 1:-1] = u[0:1, 1:-1] * (1 - t) + u[-1:, 1:-1] * t
    for _ in range(iters):
        u[1:-1, 1:-1] = 0.25 * (u[:-2, 1:-1] + u[2:, 1:-1] + u[1:-1, :-2] + u[1:-1, 2:])
    return u[1:-1, 1:-1]

def repair(a, box, pitch, pad):
    H, W = a.shape[:2]
    bx0, by0, bx1, by1 = box[:4]
    bx0 = max(1, bx0-pad); by0 = max(1, by0-pad); bx1 = min(W-1, bx1+pad); by1 = min(H-1, by1+pad)
    hh, ww = by1 - by0, bx1 - bx0
    k = 7 if W <= 600 else 9
    bg = median_bg(a, k)
    smooth = laplace_fill(bg, bx0, by0, bx1, by1)
    shift = 0; dots = np.zeros((hh, ww, 3))
    if pitch and pitch >= 12:                       # غلافٌ بشبكةِ نقاط: تُنقَلُ النقاطُ وحدَها
        shift = int(np.ceil((hh + 4) / pitch)) * pitch
        sy0 = by0 - shift; assert sy0 >= 0
        dots = a[sy0:sy0+hh, bx0:bx1].astype(np.float64) - bg[sy0:sy0+hh, bx0:bx1]
    patch = smooth + dots
    out = a.astype(np.float64).copy()
    out[by0:by1, bx0:bx1] = patch
    return np.clip(np.round(out), 0, 255).astype(np.uint8), (bx0, by0, bx1, by1, shift)

if __name__ == '__main__':
    names = sys.argv[1:]
    write = '--write' in names; names = [n for n in names if n != '--write']
    for spec in names:
        # صيغةُ ‹اسم@x0,y0,x1,y1›: صندوقٌ مقيسٌ يدوياً حيث يفشلُ الكشفُ الآليّ
        name, _, bb = spec.partition('@')
        p = os.path.join(ROOT, 'images', 'cover-%s.jpg' % name)
        im = Image.open(p); a = np.asarray(im.convert('RGB'))
        pitch = dot_pitch(a)
        box = tuple(int(v) for v in bb.split(',')) + (0,) if bb else find_pill(a)
        if not box: print(name, 'NO PILL'); continue
        pad = max(4, a.shape[1] // 70)
        b, info = repair(a, box, pitch, pad)
        print(name, 'size', a.shape[1], a.shape[0], 'pitch', pitch, 'pill', box[:4], 'px', box[4], 'patch', info)
        Image.fromarray(b).save(os.path.join(OUT, 'fixed-%s.png' % name))
        if write:
            Image.fromarray(b).save(p, quality=95, subsampling=0)
