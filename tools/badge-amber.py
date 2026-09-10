# -*- coding: utf-8 -*-
"""توحيدُ لونِ شارةِ رقمِ الصفِّ في أغلفةِ الكتب على الكهرمانيِّ (لونُ أغلفةِ العلوم).

الشارةُ مربّعٌ مستديرُ الزوايا أعلى يسارِ الغلاف، لونُها في أغلفةِ العلومِ كهرمانيٌّ
بتدرّجٍ رأسيٍّ خفيف، وفي بقيّةِ الموادِّ أبيضُ شفّافٌ يأخذُ لونَ الغلافِ تحتَه.
يكشفُ السكربتُ الشارةَ بفرقِ الإضاءةِ عن خلفيتِها (فالشارةُ أفتحُ من محيطِها دائماً،
والظلُّ أغمقُ فيخرجُ من القناعِ تلقائياً)، ثمّ يعيدُ طلاءَها بالتدرّجِ الكهرمانيِّ
ويعيدُ رسمَ الرقمِ أبيضَ فوقَه.

التشغيل:  python tools/badge-amber.py [--apply] [ملفّات…]
بلا --apply يكتبُ معاينةً في مجلّدٍ مؤقّتٍ ولا يمسُّ الأصول.
"""
import sys, os, glob
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG  = os.path.join(ROOT, 'images')

TOP = np.array([252., 217., 126.])   # أعلى التدرّج الكهرمانيّ
BOT = np.array([241., 198.,  86.])   # أسفلُه — مقيسانِ من cover-g4-sci.jpg

def lum(a):  return 0.299*a[...,0] + 0.587*a[...,1] + 0.114*a[...,2]

def badge_mask(a):
    """قناعُ الشارةِ وحدَها: أفتحُ من خلفيةِ صفِّها بفارقٍ محسوس، وأكبرُ كتلةٍ متّصلة."""
    H, W, _ = a.shape
    rh, rw = int(H*0.24), int(W*0.34)
    roi = a[:rh, :rw]
    bg  = np.median(roi[:, int(rw*0.80):], axis=1, keepdims=True)
    dl  = lum(roi) - lum(bg)
    core = dl > 12
    lab, n = ndimage.label(core)
    if n == 0: return None
    k = int(np.argmax(ndimage.sum(core, lab, range(1, n+1)))) + 1
    keep = (lab == k)
    ys, xs = np.nonzero(keep)
    box = (xs.min(), ys.min(), xs.max()+1, ys.max()+1)
    bw, bh = box[2]-box[0], box[3]-box[1]
    if bw < W*0.08 or bw > W*0.25 or not (0.7 < bw/max(bh,1) < 1.4): return None   # ليست شارة
    # القناعُ **مصمتٌ لا متدرّجٌ بفارقِ الإضاءة**: الشارةُ على خلفيةٍ فاتحةٍ فارقُها
    # ضعيفٌ، فلو تناسبَ الطلاءُ معه لخرجَ الكهرمانيُّ باهتاً في بعضِ الأغلفةِ دونَ
    # بعض. فيُملأُ الشكلُ ثمّ يُنعَّمُ حدُّه وحدَه (تمويهٌ خفيف) لِيَذوبَ في محيطِه.
    core  = ndimage.binary_fill_holes(keep)
    sigma = max(0.8, 1.5 * W / 1000.0)
    alpha = np.clip(ndimage.gaussian_filter(core.astype(np.float32), sigma), 0, 1)
    return box, alpha, core, roi.shape

def is_amber(a, box):
    """أكهرمانيّةٌ سلفاً؟ — الفصلُ بأنّ الشارةَ البيضاءَ الشفّافةَ **تبييضٌ لخلفيتِها**:
       لونُها ‎bg + k(255−bg)‎ بمعاملٍ واحدٍ للقنواتِ الثلاث. فإن طابقَ اللونُ هذه
       الصيغةَ فهي بيضاءُ شفّافةٌ تُطلى، وإلا فهي لونٌ مستقلٌّ — يُقبَلُ كهرمانيّاً
       إن كان أحمرُه أعلى من أزرقِه بفارقٍ كبير. وبهذا لا تُخدَعُ الأغلفةُ البرتقاليةُ
       التي تبدو شارتُها كهرمانيةً وهي تبييضُ برتقاليّ. """
    x0,y0,x1,y1 = box
    b = a[y0:y1, x0:x1].reshape(-1,3)
    b = b[b.min(axis=1) < 235]                  # بلا الرقمِ الأبيض
    m = np.median(b, axis=0)
    H, W, _ = a.shape
    rw = int(W*0.34)
    bg = np.median(a[y0:y1, int(rw*0.80):rw].reshape(-1,3), axis=0)
    # القنواتُ المشبَعةُ سلفاً (خلفيةٌ برتقاليةٌ أحمرُها ≈٢٤٥) لا تحملُ معلومةً عن
    # معاملِ التبييضِ فتُستبعَدُ — وإلا خرجَ الانحرافُ كبيراً وحُسِبَتِ الشارةُ الكريميّةُ
    # لوناً مستقلاً (وقعَ فعلاً في غلافِ رياضياتِ الثاني).
    usable = (255.0 - bg) > 40
    if usable.sum() < 2: return False
    k  = np.clip((m[usable] - bg[usable]) / (255.0 - bg[usable]), 0, 1)
    whitened = k.std() < 0.12 and 0.12 < k.mean() < 0.85
    if whitened: return False
    return (m[0] - m[2]) > 70 and m[0] > 215

def process(path, apply=False, outdir=None):
    im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(np.float32)
    # غلافُ رياضياتِ الثاني معكوسُ التخطيط: شارتُه أعلى **اليمين**. فإن أخفقَ الكشفُ
    # في الزاويةِ اليسرى قُلِبَ الغلافُ أفقياً وعُولِجَ ثمّ رُدَّ — قاعدةٌ واحدةٌ تكفي
    # التخطيطَين بلا إحداثياتٍ خاصّةٍ بغلافٍ بعينِه.
    flip = False
    got = badge_mask(a)
    if not got:
        a = np.ascontiguousarray(np.fliplr(a)); flip = True
        got = badge_mask(a)
    if not got: return 'تعذّر الكشف'
    box, alpha, core, rshape = got
    if is_amber(a, box): return 'كهرمانيّة سلفاً'
    x0, y0, x1, y1 = box
    roi = a[:rshape[0], :rshape[1]].copy()

    # التدرّجُ الكهرمانيُّ على ارتفاعِ الشارة
    yy = np.arange(rshape[0], dtype=np.float32)
    t  = np.clip((yy - y0) / max(y1-y0-1, 1), 0, 1)[:, None, None]
    paint = TOP + (BOT - TOP) * t

    al = alpha[..., None]
    roi = roi*(1-al) + paint*al

    # الرقمُ يُعادُ **بلونِه الأصليِّ** لا أبيضَ دائماً: في الصفوفِ الأولى أبيضُ،
    # وفي الرابعِ بلونِ الغلافِ الغامقِ كما في أغلفةِ العلوم. فيُلتقَطُ بفارقِه عن
    # جسمِ الشارةِ (وسيطُ لونِها) ثمّ يُركَّبُ فوقَ الطلاءِ بحافّتِه الناعمة.
    src  = a[:rshape[0], :rshape[1]]
    er   = ndimage.binary_erosion(core, np.ones((3,3)), iterations=max(2, int(min(x1-x0, y1-y0)*0.06)))
    body = np.median(src[er], axis=0) if er.any() else np.median(src[core], axis=0)
    d    = np.sqrt(((src - body)**2).sum(axis=2))
    an   = np.clip((d - 26) / 26.0, 0, 1) * er
    roi  = roi*(1-an[...,None]) + src*an[...,None]

    a[:rshape[0], :rshape[1]] = roi
    if flip: a = np.fliplr(a)
    out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    dest = path if apply else os.path.join(outdir, os.path.basename(path))
    out.save(dest, quality=92, subsampling=0)
    return 'تمّ %dx%d' % (x1-x0, y1-y0)

if __name__ == '__main__':
    args  = [x for x in sys.argv[1:] if not x.startswith('--')]
    apply = '--apply' in sys.argv
    outdir = os.environ.get('OUTDIR', '/tmp/badge-preview'); os.makedirs(outdir, exist_ok=True)
    files = args or sorted(glob.glob(os.path.join(IMG, 'cover-*.jpg')))
    for f in files:
        print('%-28s %s' % (os.path.basename(f), process(f, apply, outdir)))
