# -*- coding: utf-8 -*-
"""
تركيبُ رسومِ جيميناي داخلَ القرصِ الزجاجيِّ لبطاقاتِ الكتب — منصّة شوجب
=====================================================================
المسارُ المعتمد (٢٠٢٦-٠٩-٠٥):
  ١) الرسومُ تُولَّدُ بسيرِ n8n «شوجب — مولّد رسومات الأسئلة (جيميناي)» من دفعةِ
     `tools/graphics-batch.json` بخلفيةٍ **ماجنتا** صريحة (تُفرَّغُ هنا بمفتاحٍ لونيّ)،
     وتُودَعُ في فرعِ `graphics-inbox` باسم `cover-art-<key>-<batch>.jpg`.
  ٢) هذا السكربتُ يمسحُ داخلَ القرصِ بسطحٍ مستوٍ مقدَّرٍ من حلقتِه النظيفة، يفرّغُ
     الخلفيةَ ويزيلُ هالةَ «الملصق» البيضاءَ إن رسمَها النموذج، ثمّ يركّبُ الرسمَ
     في مركزِ القرصِ بعرضِ 1.3 × نصفِ القطر، ويكتبُ فوقَ `images/cover-<key>.jpg`.
  ٣) هندسةُ الأقراصِ في `tools/cover-discs.json` (تُقاسُ بـ`cover-art-measure.py`).
نصُّ البطاقةِ لا يُمَسُّ إطلاقاً — الاستبدالُ داخلَ القرصِ وحدَه.

التشغيل:  python tools/cover-art-compose.py <مجلد الرسوم الخام> [مفاتيح…]
"""
import os, sys, json, math, glob
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")
HERE = os.path.dirname(os.path.abspath(__file__))
DISCS = json.load(open(os.path.join(HERE, "cover-discs.json"), encoding="utf-8"))
PREVIEW = os.environ.get("COVER_PREVIEW") or os.path.join(os.environ.get("TEMP", HERE), "cover-preview"); os.makedirs(PREVIEW, exist_ok=True)

def key_out(a):
    """يفرّغ الخلفية: لونها من الزوايا؛ ماجنتا/أي لون مشبع ← مفتاح لوني، وأبيض ← تعبئة فيضية من الحواف."""
    a = a.astype(np.float32)
    H, W = a.shape[:2]
    corners = np.concatenate([a[:8, :8].reshape(-1, 3), a[:8, -8:].reshape(-1, 3), a[-8:, :8].reshape(-1, 3), a[-8:, -8:].reshape(-1, 3)])
    bg = np.median(corners, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    white = bg.min() > 235
    if white:
        # تعبئة فيضية من الحواف: الأبيض المتصل بالخارج فقط
        from collections import deque
        near = dist < 22
        seen = np.zeros((H, W), bool)
        q = deque()
        for x in range(W):
            for y in (0, H - 1):
                if near[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
        for y in range(H):
            for x in (0, W - 1):
                if near[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
        while q:
            y, x = q.popleft()
            for ny, nx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
                if 0 <= ny < H and 0 <= nx < W and near[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; q.append((ny, nx))
        alpha = np.where(seen, 0.0, 1.0)
        # حافة انتقال: بكسل ملاصق للمفرَّغ يأخذ شفافية بحسب بعده عن الأبيض
        lo, hi = 22.0, 90.0
        edge = np.clip((dist - lo) / (hi - lo), 0, 1)
        nb = np.zeros_like(seen)
        nb[1:, :] |= seen[:-1, :]; nb[:-1, :] |= seen[1:, :]; nb[:, 1:] |= seen[:, :-1]; nb[:, :-1] |= seen[:, 1:]
        ring = nb & ~seen
        alpha = np.where(ring, edge, alpha)
    else:
        lo, hi = 45.0, 130.0
        alpha = np.clip((dist - lo) / (hi - lo), 0, 1)
    return a, bg, alpha

def unmix(a, bg, alpha):
    al = alpha[..., None]
    safe = np.where(al > 0.02, al, 1.0)
    c = (a - (1 - al) * bg) / safe
    c = np.where(al > 0.02, c, 0)
    return np.clip(c, 0, 255)

def strip_halo(rgb, alpha, white_t=215):
    """يزيل إطار «الملصق» الأبيض: كل بكسل شبه أبيض متصل بالخارج الشفاف يُفرَّغ،
    والحدّ الأسود يوقف الفيض فلا يُمسّ بياض الجسم الداخلي (جدران المسجد، الريشة)."""
    from collections import deque
    H, W = alpha.shape
    minc = rgb.min(axis=2)
    nearwhite = (minc >= white_t)
    cleared = alpha < 0.5
    seen = cleared.copy()
    q = deque(zip(*np.where(cleared)))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
            if 0 <= ny < H and 0 <= nx < W and not seen[ny, nx] and nearwhite[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx))
    halo = seen & ~cleared
    alpha = np.where(halo, 0.0, alpha)
    # حافة الانتقال بين الهالة والحدّ الأسود: رمادي = خليط أسود وأبيض ← يُفكّ خلطه من الأبيض
    nb = np.zeros_like(seen)
    nb[1:, :] |= seen[:-1, :]; nb[:-1, :] |= seen[1:, :]; nb[:, 1:] |= seen[:, :-1]; nb[:, :-1] |= seen[:, 1:]
    ring = nb & ~seen & (minc >= 90) & (minc < white_t)
    a_ring = np.clip((white_t - minc) / (white_t - 90.0), 0, 1)
    ring_rgb = np.clip((rgb - (1 - a_ring[..., None]) * 255) / np.maximum(a_ring[..., None], 0.05), 0, 255)
    rgb = np.where(ring[..., None], ring_rgb, rgb)
    alpha = np.where(ring, a_ring * alpha, alpha)
    return rgb, alpha

def cutout(path):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im)
    a, bg, alpha = key_out(a)
    rgb = unmix(a, bg, alpha)
    rgb, alpha = strip_halo(rgb, alpha)
    rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba, "RGBA")
    # قصّ إلى حدود المحتوى
    m = alpha > 0.04
    ys, xs = np.where(m)
    if len(xs) == 0: raise SystemExit("الرسم فارغ بعد التفريغ: " + path)
    out = out.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    return out, bg

def erase_disc(cov, g, inset_frac=0.0):
    """يملأ داخل القرص بسطحٍ مستوٍ (لكل قناة) مقدَّرٍ من حلقة القرص الخارجية النظيفة —
    تقديرٌ متينٌ يطرح النقاط الشاذّة (بقايا الرسم القديم إن بلغت الحلقة)."""
    a = np.asarray(cov).astype(np.float32)
    xc, yc, R = g["xc"], g["yc"], g["r"]
    r = R * (1 - inset_frac)
    H, W = a.shape[:2]
    ys, xs = np.mgrid[0:H, 0:W]
    d = np.sqrt((xs - xc) ** 2 + (ys - yc) ** 2)
    ring = (d >= 0.86 * r) & (d <= 0.975 * r)
    inner = d <= r
    X = np.stack([xs[ring] - xc, ys[ring] - yc, np.ones(ring.sum())], axis=1)
    fill = np.zeros((H, W, 3), np.float32)
    for ch in range(3):
        v = a[..., ch][ring]
        keep = np.ones(len(v), bool)
        for _ in range(3):
            coef, *_ = np.linalg.lstsq(X[keep], v[keep], rcond=None)
            res = v - X @ coef
            s = np.std(res[keep]) + 1e-3
            keep = np.abs(res) < 2.0 * s
        Xi = np.stack([xs[inner] - xc, ys[inner] - yc, np.ones(inner.sum())], axis=1)
        fill[..., ch][inner] = Xi @ coef
    # مزجٌ ناعم عند حدّ المسح كي لا تظهر حافة
    t = np.clip((r - d) / (0.015 * r), 0, 1)[..., None]
    a = a * (1 - t) + fill * t
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def patch_outside(cov, g, cx, cy, rad):
    """يمسح بقايا رسمٍ قديمٍ تجاوزت حافة القرص (شمس علوم الصف الأول): يملأ ما هو داخل
    الدائرة المعطاة وخارج القرص بسطحٍ مستوٍ من حلقةٍ خارجيةٍ نظيفة."""
    a = np.asarray(cov).astype(np.float32)
    H, W = a.shape[:2]
    ys, xs = np.mgrid[0:H, 0:W]
    dd = np.sqrt((xs - g["xc"]) ** 2 + (ys - g["yc"]) ** 2)
    dp = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2)
    outside = dd > g["r"] * 0.96
    target = (dp <= rad) & outside
    ring = (dp > rad) & (dp <= rad * 1.8) & outside
    X = np.stack([xs[ring] - cx, ys[ring] - cy, np.ones(ring.sum())], axis=1)
    Xi = np.stack([xs[target] - cx, ys[target] - cy, np.ones(target.sum())], axis=1)
    for ch in range(3):
        v = a[..., ch][ring]; keep = np.ones(len(v), bool)
        for _ in range(3):
            coef, *_ = np.linalg.lstsq(X[keep], v[keep], rcond=None)
            res = v - X @ coef; s = np.std(res[keep]) + 1e-3; keep = np.abs(res) < 2.0 * s
        a[..., ch][target] = Xi @ coef
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

PATCHES = {"g1-sci": (355, 245, 62)}   # مركز الشمس القديمة ونصف قطرها (بكسل الصورة الأصلية)

def compose(key, art_path, scale=1.3):
    name = f"cover-{key}.jpg"
    g = DISCS[name]
    cov = Image.open(os.path.join(IMG, name)).convert("RGB")
    if key in PATCHES:
        cov = patch_outside(cov, g, *PATCHES[key])
    cov = erase_disc(cov, g)
    art, bg = cutout(art_path)
    target = g["r"] * scale
    f = target / max(art.width, art.height)
    art = art.resize((max(1, round(art.width * f)), max(1, round(art.height * f))), Image.LANCZOS)
    x = int(round(g["xc"] - art.width / 2)); y = int(round(g["yc"] - art.height / 2))
    cov.paste(art, (x, y), art)
    cov.save(os.path.join(IMG, name), "JPEG", quality=90, subsampling=0, optimize=True)
    cov.save(os.path.join(PREVIEW, name.replace(".jpg", ".png")))
    art.save(os.path.join(PREVIEW, f"art-{key}.png"))
    print(f"{name}: bg={tuple(int(v) for v in bg)} art={art.size} at=({x},{y})")

def main():
    src = sys.argv[1]; only = sys.argv[2:]
    files = sorted(glob.glob(os.path.join(src, "cover-art-*.*")))
    for fpath in files:
        base = os.path.basename(fpath)
        k = base[len("cover-art-"):].split("-2026")[0]
        if only and k not in only: continue
        compose(k, fpath)

if __name__ == "__main__":
    main()
