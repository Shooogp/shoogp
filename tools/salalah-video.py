#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
salalah-video.py — تحريكٌ برمجيٌّ لملصق شوجب (صلالة) وترميزُه لإنستغرام.
لا نموذجَ توليدِ فيديو: كلُّ حركةٍ محسوبةٌ بـ Pillow + numpy، والترميزُ بـ ffmpeg.

الطبقاتُ الثلاثُ المدخلة (في مجلّدٍ واحد):
  plate.png   الملصقُ كاملاً بلا الصاروخ (مكانُه مرقَّعٌ بسطحِ القمر)
  rocket.png  الصاروخُ وحدَه بخلفيةٍ شفافة
  text.png    العبارةُ والشعارُ والرابطُ بخلفيةٍ شفافة

قاعدةٌ قاطعة: text.png فوقَ كلِّ شيءٍ ثابتةً — بلا تقريبِ كاميرا وبلا حركة،
وتُعادُ عيّنتُها مرّةً واحدةً فقط من الأصلِ بـ LANCZOS فتبقى الحروفُ حادّة.

المخرجان (بالتوسيعِ لا بالقصّ):
  video/salalah-4x5.mp4    1080×1350
  video/salalah-9x16.mp4   1080×1920

الاستعمال:
  python salalah-video.py --src "<مجلّد الملفات>" [--out "<مجلّد المخرجات>"]
                          [--smoke x0,y0,x1,y1] [--ffmpeg <مسار ffmpeg.exe>]
                          [--probe-only]
"""

import argparse
import math
import os
import subprocess
import sys

import numpy as np
from PIL import Image

# ────────────────────────── ثوابتُ التحريك ──────────────────────────
FPS          = 30
NFRAMES      = 150
DUR          = NFRAMES / FPS          # 5.0 ثانية بالضبط

ROCKET_EXIT_T   = 4.2                 # لحظةُ خروجِ الصاروخِ من أعلى الكادر
ROCKET_SCALE_1  = 0.88                # التصغيرُ النهائيُّ مع البُعد
TILT_DEG        = 4.0                 # ذبذبةُ الميلان ±٤°
TILT_CYCLES     = 1.5                 # دورةٌ ونصفٌ طوالَ المقطع
SWAY_PX         = 10.0                # الانزياحُ الأفقيُّ ±١٠px

SMOKE_RISE_PX   = 6.0                 # صعودُ عمودِ الدخانِ طوالَ المقطع
SMOKE_NOISE_PX  = 1.6                 # تشويهُ noise خفيفٌ جداً
SMOKE_FEATHER   = 26                  # تنعيمُ حوافِّ منطقةِ الدخانِ فلا تظهرَ خياطة

FLAME_PULSE     = 0.08                # نبضُ سطوعِ اللهبِ ±٨٪

STAR_TOP_FRAC   = 0.38                # السماءُ العليا: أعلى ٣٨٪ من الملصق
STAR_THRESH     = 168                 # عتبةُ سطوعِ بكسلِ النجم
STAR_TWINKLE    = 0.38                # عمقُ التلألؤ

CAM_Z0, CAM_Z1  = 1.00, 1.05          # التقريبُ البطيء
CAM_CY          = 0.45                # مركزُ التقريبِ أعلى قليلاً من الوسط

XFADE_SEC       = 0.3                 # التلاشي المتقاطعُ نحوَ الإطارِ الأول

OUT_4x5   = (1080, 1350)
OUT_9x16  = (1080, 1920)

SEED = 20260808


# ────────────────────────── أدواتٌ عامّة ──────────────────────────
def smoothstep(x):
    x = min(max(x, 0.0), 1.0)
    return x * x * (3.0 - 2.0 * x)


def bilinear(sub, sx, sy):
    """أخذُ عيّنةٍ ثنائيةِ الخطّيةِ من مصفوفةٍ (h,w,3) عند إحداثياتٍ كسرية."""
    h, w = sub.shape[:2]
    x0 = np.floor(sx).astype(np.int32)
    y0 = np.floor(sy).astype(np.int32)
    fx = (sx - x0)[..., None]
    fy = (sy - y0)[..., None]
    x1, y1 = x0 + 1, y0 + 1
    x0 = np.clip(x0, 0, w - 1); x1 = np.clip(x1, 0, w - 1)
    y0 = np.clip(y0, 0, h - 1); y1 = np.clip(y1, 0, h - 1)
    a = sub[y0, x0]; b = sub[y0, x1]
    c = sub[y1, x0]; d = sub[y1, x1]
    top = a * (1.0 - fx) + b * fx
    bot = c * (1.0 - fx) + d * fx
    return top * (1.0 - fy) + bot * fy


def feather_mask(h, w, pad):
    """قناعٌ مُنعَّمُ الحوافِّ لدمجِ منطقةٍ مُشوَّهةٍ في الأصلِ بلا خياطة."""
    ry = np.minimum(np.arange(h), np.arange(h)[::-1]).astype(np.float32)
    rx = np.minimum(np.arange(w), np.arange(w)[::-1]).astype(np.float32)
    my = np.clip(ry / max(pad, 1), 0, 1)
    mx = np.clip(rx / max(pad, 1), 0, 1)
    m = np.minimum(my[:, None], mx[None, :])
    return (m * m * (3 - 2 * m))[..., None]


def detect_horizon(arr):
    """تقديرُ خطِّ الأفق: أولُ صفٍّ يغلبُ عليه الأخضر (العشب)."""
    h = arr.shape[0]
    a = arr.astype(np.int16)
    grassy = (a[..., 1] > a[..., 0] + 8) & (a[..., 1] > a[..., 2] + 8)
    frac = grassy.mean(axis=1)
    for y in range(int(h * 0.35), h):
        if frac[y] > 0.40:
            return y
    return int(h * 0.68)


# ────────────────────────── محرّكُ الإطارات ──────────────────────────
class Renderer:
    def __init__(self, src, smoke_rect=None):
        self.plate = Image.open(os.path.join(src, "plate.png")).convert("RGB")
        rocket_img = Image.open(os.path.join(src, "rocket.png")).convert("RGBA")
        self.text_src = Image.open(os.path.join(src, "text.png")).convert("RGBA")

        self.W, self.H = self.plate.size
        self.plate_arr = np.asarray(self.plate, dtype=np.uint8)

        # ── الصاروخ: قصُّ الحدودِ غيرِ الشفافةِ لمعرفةِ موضعِه ومقاسِه
        if rocket_img.size != self.plate.size:
            print(f"  ! rocket.png ({rocket_img.size}) يخالف plate.png ({self.plate.size}) — "
                  f"سيُوسَّط أفقياً ويُثبَّت على خطِّ الأفق.", file=sys.stderr)
            canvas = Image.new("RGBA", self.plate.size, (0, 0, 0, 0))
            bb = rocket_img.getbbox() or (0, 0, *rocket_img.size)
            sp = rocket_img.crop(bb)
            canvas.paste(sp, ((self.W - sp.width) // 2,
                              int(self.H * 0.62) - sp.height), sp)
            rocket_img = canvas

        bbox = rocket_img.getbbox()
        if bbox is None:
            raise SystemExit("rocket.png شفافٌ بالكامل — لا صاروخَ فيه.")
        self.rbox = bbox
        self.sprite = rocket_img.crop(bbox)
        self.rcx = (bbox[0] + bbox[2]) / 2.0
        self.rcy = (bbox[1] + bbox[3]) / 2.0
        self.total_rise = bbox[3] + 40.0        # يكفي لخروجِه كاملاً من أعلى الكادر

        self.horizon = detect_horizon(self.plate_arr)

        # ── عمودُ الدخان: عمودٌ تحتَ الصاروخِ حتى الأرضِ ما لم يُحدَّد يدوياً
        if smoke_rect:
            self.smoke = smoke_rect
        else:
            rw = bbox[2] - bbox[0]
            half = int(rw * 0.95)
            x0 = max(0, int(self.rcx) - half)
            x1 = min(self.W, int(self.rcx) + half)
            y0 = max(0, bbox[3] - int(rw * 0.35))
            y1 = min(self.H, self.horizon + int(rw * 0.30))
            self.smoke = (x0, y0, x1, y1)
        sx0, sy0, sx1, sy1 = self.smoke
        self.smoke_mask = feather_mask(sy1 - sy0, sx1 - sx0, SMOKE_FEATHER)
        sh, sw = sy1 - sy0, sx1 - sx0
        self.s_yy, self.s_xx = np.mgrid[0:sh, 0:sw].astype(np.float32)

        # ── النجوم: البكسلاتُ الساطعةُ في السماءِ العليا
        top = int(self.H * STAR_TOP_FRAC)
        sky = self.plate_arr[:top]
        lum = sky.astype(np.float32) @ np.array([0.299, 0.587, 0.114], np.float32)
        ys, xs = np.nonzero(lum > STAR_THRESH)
        self.star_ys, self.star_xs = ys, xs
        rng = np.random.default_rng(SEED)
        self.star_phase = rng.uniform(0, 2 * math.pi, size=ys.shape).astype(np.float32)
        self.star_freq = rng.uniform(1.1, 2.6, size=ys.shape).astype(np.float32)
        self.star_bg = np.median(sky.reshape(-1, 3)[lum.reshape(-1) <= STAR_THRESH],
                                 axis=0).astype(np.float32) if ys.size else np.zeros(3, np.float32)
        self.star_val = self.plate_arr[ys, xs].astype(np.float32) if ys.size else None
        print(f"  · نجومٌ مرصودة: {ys.size:,} بكسل | خطُّ الأفق: y={self.horizon} | "
              f"عمودُ الدخان: {self.smoke}")

        # ── سلسلةُ نبضِ اللهبِ: عشوائيةٌ سريعةٌ منعَّمةٌ قليلاً
        raw = rng.uniform(-1.0, 1.0, size=NFRAMES + 4).astype(np.float32)
        self.flame_seq = (raw[:NFRAMES] * 0.65 + raw[1:NFRAMES + 1] * 0.35)

        # ── لونُ السماءِ ولونُ الكحليِّ العميقِ للتوسيع (عيّنةٌ من الملصقِ نفسِه)
        sky_px = sky.reshape(-1, 3).astype(np.float32)
        self.sky_top = np.asarray(self.plate_arr[:max(8, self.H // 40)]
                                  .reshape(-1, 3).mean(axis=0), np.float32)
        dark = np.percentile(sky_px, 12, axis=0)
        deep = dark * 0.62
        deep[2] = min(255.0, deep[2] * 1.16 + 6.0)     # ميلٌ بنفسجيّ
        deep[0] = deep[0] * 0.92
        self.deep_navy = np.clip(deep, 0, 255).astype(np.float32)
        print(f"  · لونُ الكحليِّ العميقِ (عيّنةً من السماء): "
              f"#{int(self.deep_navy[0]):02X}{int(self.deep_navy[1]):02X}{int(self.deep_navy[2]):02X}")

    # ────────────── مكوّناتُ الحركة ──────────────
    def _smoke(self, arr, t):
        x0, y0, x1, y1 = self.smoke
        sub = arr[y0:y1, x0:x1].astype(np.float32)
        yy, xx = self.s_yy, self.s_xx
        rise = SMOKE_RISE_PX * (t / DUR)
        a = SMOKE_NOISE_PX
        nx = (a * np.sin(yy / 37.0 + t * 1.05)
              + a * 0.6 * np.sin(yy / 17.0 - t * 1.7 + xx / 61.0))
        ny = (a * 0.5 * np.sin(xx / 44.0 + t * 0.85)
              + a * 0.3 * np.sin(yy / 23.0 + t * 1.3))
        warped = bilinear(sub, xx + nx, yy + rise + ny)
        m = self.smoke_mask
        arr[y0:y1, x0:x1] = np.clip(warped * m + sub * (1.0 - m), 0, 255).astype(np.uint8)

    def _stars(self, arr, t):
        if self.star_val is None or self.star_ys.size == 0:
            return
        k = 1.0 + STAR_TWINKLE * np.sin(2 * math.pi * self.star_freq * t + self.star_phase)
        v = self.star_bg + (self.star_val - self.star_bg) * k[:, None]
        arr[self.star_ys, self.star_xs] = np.clip(v, 0, 255).astype(np.uint8)

    def _flame(self, arr, i, cx, cy, sw, sh):
        """نبضُ سطوعٍ أسفلَ الصاروخِ — يتبعُ موضعَه الحاليّ."""
        fy0 = int(cy + sh * 0.30)
        fy1 = int(cy + sh * 0.62)
        fx0 = int(cx - sw * 0.42)
        fx1 = int(cx + sw * 0.42)
        fy0 = max(0, fy0); fx0 = max(0, fx0)
        fy1 = min(self.H, fy1); fx1 = min(self.W, fx1)
        if fy1 <= fy0 or fx1 <= fx0:
            return
        k = 1.0 + FLAME_PULSE * float(self.flame_seq[i])
        reg = arr[fy0:fy1, fx0:fx1].astype(np.float32)
        m = feather_mask(fy1 - fy0, fx1 - fx0, max(4, (fy1 - fy0) // 4))
        arr[fy0:fy1, fx0:fx1] = np.clip(reg * (1.0 + (k - 1.0) * m), 0, 255).astype(np.uint8)

    def _camera(self, img, t):
        z = CAM_Z0 + (CAM_Z1 - CAM_Z0) * smoothstep(t / DUR)
        cw, ch = self.W / z, self.H / z
        cx, cy = self.W / 2.0, self.H * CAM_CY
        left = min(max(cx - cw / 2.0, 0.0), self.W - cw)
        top = min(max(cy - ch / 2.0, 0.0), self.H - ch)
        return img.resize((self.W, self.H), Image.LANCZOS,
                          box=(left, top, left + cw, top + ch))

    # ────────────── إطارٌ واحدٌ بالأبعادِ الأصلية ──────────────
    def frame(self, i):
        t = i / FPS
        arr = self.plate_arr.copy()
        self._smoke(arr, t)
        self._stars(arr, t)

        u = t / ROCKET_EXIT_T
        p = u * u                                   # تسارعٌ تربيعيّ (ease-in)
        rise = p * self.total_rise
        phase = 2 * math.pi * TILT_CYCLES * (t / DUR)
        tilt = TILT_DEG * math.sin(phase)
        dx = SWAY_PX * math.sin(phase)
        scale = 1.0 - (1.0 - ROCKET_SCALE_1) * min(p, 1.0)

        sw = max(1, int(round(self.sprite.width * scale)))
        sh = max(1, int(round(self.sprite.height * scale)))
        sp = self.sprite.resize((sw, sh), Image.LANCZOS)
        sp = sp.rotate(tilt, resample=Image.BICUBIC, expand=True)

        cx = self.rcx + dx
        cy = self.rcy - rise
        self._flame(arr, i, cx, cy, sw, sh)

        img = Image.fromarray(arr, "RGB")
        img.paste(sp, (int(round(cx - sp.width / 2)),
                       int(round(cy - sp.height / 2))), sp)
        return self._camera(img, t)


# ────────────────────────── التوسيعُ إلى النسبِ المطلوبة ──────────────────────────
class Fitter:
    """يضعُ الملصقَ في كادرِ المخرجِ بالتوسيعِ لا بالقصّ، ويبني الامتداداتِ والنصّ."""

    def __init__(self, rend, out_wh, mode):
        self.r = rend
        self.OW, self.OH = out_wh
        self.mode = mode
        ar = rend.W / rend.H

        if mode == "4x5":
            bh = self.OH
            bw = int(round(bh * ar))
            if bw > self.OW:                        # الملصقُ أعرضُ من الكادر: نلائمُ بالعرض
                bw, bh = self.OW, int(round(self.OW / ar))
        else:
            bw = self.OW
            bh = int(round(bw / ar))
            if bh > self.OH:
                bh, bw = self.OH, int(round(self.OH * ar))

        self.bw, self.bh = bw, bh
        self.bx = (self.OW - bw) // 2
        self.by = (self.OH - bh) // 2
        self.pad_l, self.pad_r = self.bx, self.OW - bw - self.bx
        self.pad_t, self.pad_b = self.by, self.OH - bh - self.by

        # النصُّ: عيّنةٌ واحدةٌ من الأصلِ إلى مقاسِ الملصقِ في الكادر، تُحسبُ مرّةً وتُعادُ لكلِّ إطار
        self.text = rend.text_src.resize((bw, bh), Image.LANCZOS)
        ta = np.asarray(self.text, dtype=np.float32)
        self.t_rgb = ta[..., :3]
        self.t_a = (ta[..., 3:4] / 255.0)

        rng = np.random.default_rng(SEED + (7 if mode == "4x5" else 13))
        self.stars = self._starfield(rng)
        print(f"  · [{mode}] الكادر {self.OW}×{self.OH} | الملصق {bw}×{bh} عند ({self.bx},{self.by}) | "
              f"جانبيّ {self.pad_l}/{self.pad_r} | علويّ {self.pad_t} سفليّ {self.pad_b}")

    def _starfield(self, rng):
        """نجومٌ خافتةٌ متناثرةٌ في مناطقِ التوسيعِ — تبدو امتداداً للسماء."""
        pts = []
        areas = []
        if self.pad_l > 2:
            areas.append((0, 0, self.pad_l, self.OH))
        if self.pad_r > 2:
            areas.append((self.OW - self.pad_r, 0, self.OW, self.OH))
        if self.pad_t > 2:
            areas.append((0, 0, self.OW, self.pad_t))
        for (ax0, ay0, ax1, ay1) in areas:
            area = (ax1 - ax0) * (ay1 - ay0)
            n = max(0, int(area / 5200))
            if n == 0:
                continue
            xs = rng.integers(ax0, ax1, n)
            ys = rng.integers(ay0, ay1, n)
            br = rng.uniform(0.30, 1.0, n) ** 1.7
            ph = rng.uniform(0, 2 * math.pi, n)
            fr = rng.uniform(0.8, 2.4, n)
            pts.append((xs, ys, br, ph, fr))
        if not pts:
            return None
        return tuple(np.concatenate([p[k] for p in pts]) for k in range(5))

    def _paint_stars(self, canvas, t):
        if self.stars is None:
            return
        xs, ys, br, ph, fr = self.stars
        k = np.clip(br * (0.72 + 0.28 * np.sin(2 * math.pi * fr * t + ph)), 0, 1)
        add = (k[:, None] * np.array([148.0, 152.0, 168.0], np.float32))
        ix = xs.astype(np.int32); iy = ys.astype(np.int32)
        cur = canvas[iy, ix]
        canvas[iy, ix] = np.clip(cur + add, 0, 255)

    def compose(self, poster_img, t):
        """poster_img: إطارُ الملصقِ بالأبعادِ الأصلية → كادرُ المخرجِ كاملاً (RGB uint8)."""
        r = self.r
        body = np.asarray(poster_img.resize((self.bw, self.bh), Image.LANCZOS),
                          dtype=np.float32)
        canvas = np.zeros((self.OH, self.OW, 3), np.float32)
        canvas[self.by:self.by + self.bh, self.bx:self.bx + self.bw] = body

        deep = r.deep_navy

        if self.mode == "4x5":
            # شريطانِ جانبيّانِ: تدرّجٌ كحليٌّ بنفسجيٌّ يتّصلُ بلونِ حافّةِ السماءِ فلا يبدو إطاراً أسود
            hor_out = int(round(r.horizon * self.bh / r.H))
            for side in ("l", "r"):
                pad = self.pad_l if side == "l" else self.pad_r
                if pad <= 0:
                    continue
                edge = body[:, 0, :] if side == "l" else body[:, -1, :]
                edge = edge.copy()
                if 0 < hor_out < self.bh:                 # تحتَ الأفقِ نُبقي لونَ السماءِ لا العشب
                    edge[hor_out:] = edge[max(0, hor_out - 3)]
                    fall = np.linspace(1.0, 0.55, self.bh - hor_out, dtype=np.float32)
                    edge[hor_out:] *= fall[:, None]
                col = np.zeros((self.OH, 3), np.float32)
                col[self.by:self.by + self.bh] = edge
                if self.by > 0:
                    col[:self.by] = edge[0]
                if self.by + self.bh < self.OH:
                    col[self.by + self.bh:] = edge[-1]
                f = (np.linspace(0, 1, pad, dtype=np.float32) ** 0.75)[None, :, None]
                if side == "l":
                    f = f[:, ::-1, :]                     # ١ عندَ الملصقِ، ٠ عندَ حافّةِ الكادر
                bar = col[:, None, :] * f + deep[None, None, :] * (1.0 - f)
                if side == "l":
                    canvas[:, :pad] = bar
                else:
                    canvas[:, self.OW - pad:] = bar

        else:
            # 9:16 — مدُّ شريطِ السماءِ العلويِّ إلى كحليٍّ أغمق، ومدُّ العشبِ السفليِّ مع تعتيمٍ تدريجيّ
            if self.pad_t > 0:
                band = body[:max(4, self.bh // 90)].mean(axis=0)          # (bw,3)
                f = (np.linspace(0.0, 1.0, self.pad_t, dtype=np.float32) ** 0.85)[:, None, None]
                canvas[:self.pad_t, self.bx:self.bx + self.bw] = (
                    band[None, :, :] * f + deep[None, None, :] * (1.0 - f))
                if self.pad_l > 0:
                    canvas[:self.pad_t, :self.pad_l] = canvas[:self.pad_t, self.bx:self.bx + 1]
                if self.pad_r > 0:
                    canvas[:self.pad_t, self.OW - self.pad_r:] = \
                        canvas[:self.pad_t, self.bx + self.bw - 1:self.bx + self.bw]
            if self.pad_b > 0:
                band = body[-max(4, self.bh // 90):].mean(axis=0)
                f = (np.linspace(1.0, 0.40, self.pad_b, dtype=np.float32))[:, None, None]
                y0 = self.by + self.bh
                canvas[y0:, self.bx:self.bx + self.bw] = band[None, :, :] * f
                if self.pad_l > 0:
                    canvas[y0:, :self.pad_l] = canvas[y0:, self.bx:self.bx + 1]
                if self.pad_r > 0:
                    canvas[y0:, self.OW - self.pad_r:] = \
                        canvas[y0:, self.bx + self.bw - 1:self.bx + self.bw]

        self._paint_stars(canvas, t)

        # ── النصُّ فوقَ كلِّ شيء: ثابتٌ، بلا تقريبٍ ولا حركة
        sl = canvas[self.by:self.by + self.bh, self.bx:self.bx + self.bw]
        canvas[self.by:self.by + self.bh, self.bx:self.bx + self.bw] = \
            self.t_rgb * self.t_a + sl * (1.0 - self.t_a)

        return np.clip(canvas, 0, 255).astype(np.uint8)


# ────────────────────────── الترميز ──────────────────────────
def open_encoder(ffmpeg, w, h, path, logf):
    cmd = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{w}x{h}", "-r", str(FPS), "-i", "-",
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
        "-map", "0:v:0", "-map", "1:a:0",
        "-c:v", "libx264", "-profile:v", "high", "-level", "4.1",
        "-pix_fmt", "yuv420p", "-preset", "slow",
        "-crf", "18", "-maxrate", "10M", "-bufsize", "20M",
        "-r", str(FPS), "-g", str(FPS * 2),
        "-c:a", "aac", "-b:a", "128k", "-ar", "48000", "-ac", "2",
        "-shortest", "-movflags", "+faststart",
        path,
    ]
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    return subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=logf, stderr=logf)


def probe(ffprobe, path):
    out = subprocess.run(
        [ffprobe, "-v", "error", "-show_entries",
         "format=duration:stream=index,codec_type,codec_name,profile,width,height,pix_fmt,r_frame_rate,nb_frames",
         "-of", "default=noprint_wrappers=1", path],
        capture_output=True, text=True).stdout
    return out


# ────────────────────────── المسارُ الكامل ──────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, help="مجلّدُ plate.png و rocket.png و text.png")
    ap.add_argument("--out", default=None, help="مجلّدُ المخرجات (افتراضاً: <src>/video)")
    ap.add_argument("--smoke", default=None, help="مستطيلُ عمودِ الدخان x0,y0,x1,y1")
    ap.add_argument("--ffmpeg", default="ffmpeg")
    ap.add_argument("--ffprobe", default="ffprobe")
    ap.add_argument("--shots", default=None, help="مجلّدُ حفظِ اللقطاتِ للمراجعة")
    args = ap.parse_args()

    src = args.src
    for f in ("plate.png", "rocket.png", "text.png"):
        p = os.path.join(src, f)
        if not os.path.isfile(p):
            raise SystemExit(f"ملفٌّ مفقود: {p}")

    out_dir = args.out or os.path.join(src, "video")
    smoke = tuple(int(v) for v in args.smoke.split(",")) if args.smoke else None

    print("• قراءةُ الطبقاتِ وتحليلُ الملصق…")
    rend = Renderer(src, smoke)
    print(f"  · أبعادُ الملصقِ الأصلية: {rend.W}×{rend.H}  (النسبة {rend.W/rend.H:.4f})")

    fit45 = Fitter(rend, OUT_4x5, "4x5")
    fit916 = Fitter(rend, OUT_9x16, "9x16")

    p45 = os.path.join(out_dir, "salalah-4x5.mp4")
    p916 = os.path.join(out_dir, "salalah-9x16.mp4")
    os.makedirs(out_dir, exist_ok=True)
    logp = os.path.join(out_dir, "_ffmpeg.log")

    xf = int(round(XFADE_SEC * FPS))
    first45 = first916 = None
    shots = {0, 60, 120, 149}
    shot_dir = args.shots or os.path.join(out_dir, "shots")
    os.makedirs(shot_dir, exist_ok=True)

    print(f"• توليدُ {NFRAMES} إطاراً وترميزُهما معاً…")
    with open(logp, "wb") as logf:
        e45 = open_encoder(args.ffmpeg, *OUT_4x5, p45, logf)
        e916 = open_encoder(args.ffmpeg, *OUT_9x16, p916, logf)
        try:
            for i in range(NFRAMES):
                t = i / FPS
                poster = rend.frame(i)
                f45 = fit45.compose(poster, t)
                f916 = fit916.compose(poster, t)

                if i == 0:
                    first45, first916 = f45.copy(), f916.copy()
                elif i >= NFRAMES - xf:               # تلاشٍ متقاطعٌ نحوَ الإطارِ الأول
                    k = smoothstep((i - (NFRAMES - xf) + 1) / (xf + 1.0))
                    f45 = (f45 * (1 - k) + first45 * k).astype(np.uint8)
                    f916 = (f916 * (1 - k) + first916 * k).astype(np.uint8)

                if i in shots:
                    Image.fromarray(f45).save(os.path.join(shot_dir, f"4x5-{i:03d}.png"))
                    Image.fromarray(f916).save(os.path.join(shot_dir, f"9x16-{i:03d}.png"))

                e45.stdin.write(f45.tobytes())
                e916.stdin.write(f916.tobytes())
                if (i + 1) % 25 == 0:
                    print(f"    … {i+1}/{NFRAMES}")
        finally:
            for e in (e45, e916):
                try:
                    e.stdin.close()
                except Exception:
                    pass
            rc45, rc916 = e45.wait(), e916.wait()

    if rc45 or rc916:
        print(open(logp, "r", errors="replace").read()[-3000:], file=sys.stderr)
        raise SystemExit(f"فشلَ الترميز (rc {rc45}/{rc916}) — راجع {logp}")

    print("\n• تحقّقُ ffprobe:")
    for p in (p45, p916):
        print(f"\n=== {os.path.basename(p)} ({os.path.getsize(p)/1e6:.2f} MB) ===")
        print(probe(args.ffprobe, p).strip())

    print(f"\n• اللقطاتُ للمراجعة في: {shot_dir}")


if __name__ == "__main__":
    main()
