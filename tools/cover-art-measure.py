# -*- coding: utf-8 -*-
"""يقيس القرص الزجاجي الأوسط في كل بطاقة كتاب: المركز ونصف القطر، ويرسم لوحة تحقّق."""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")
OUT = os.path.dirname(os.path.abspath(__file__))  # يكتب cover-discs.json بجانبه ولوحة التحقّق في TEMP

def lum(a):
    return 0.299*a[...,0] + 0.587*a[...,1] + 0.114*a[...,2]

def scan_row(L, y, W, thr, K):
    row = L[y]
    # baseline: interpolate between left plain background and right plain background
    lb = np.median(row[int(0.05*W):int(0.18*W)]); rb = np.median(row[int(0.82*W):int(0.95*W)])
    xs = np.arange(W)
    base = lb + (rb-lb)*(xs-0.115*W)/(0.885*W-0.115*W)
    res = row - base
    hi = res > thr
    xc = W//2
    # right edge: last x such that hi[x] and next K are all not hi
    xr = xc
    for x in range(xc, int(0.95*W)-K):
        if hi[x] and not hi[x+1:x+1+K].any():
            xr = x; break
    xl = xc
    for x in range(xc, int(0.05*W)+K, -1):
        if hi[x] and not hi[x-K:x].any():
            xl = x; break
    return xl, xr, res

def measure(path):
    im = Image.open(path).convert("RGB")
    W, H = im.size
    a = np.asarray(im).astype(np.float32)
    L = lum(a)
    thr = 6.0
    K = int(0.05*W)
    # try a few rows near expected center and take the widest chord
    best = None
    for fy in (0.52, 0.55, 0.58, 0.61):
        y = int(fy*H)
        xl, xr, _ = scan_row(L, y, W, thr, K)
        if best is None or (xr-xl) > (best[2]-best[1]):
            best = (y, xl, xr)
    y0, xl, xr = best
    xc = (xl+xr)/2; r0 = (xr-xl)/2
    # vertical: scan column at xc - 0.85 r0
    x = int(round(xc - 0.85*r0))
    col = L[:, x]
    top = int(y0 - 1.15*r0); bot = int(y0 + 1.15*r0)
    top = max(top, 0); bot = min(bot, H-1)
    tb = np.median(col[max(top-6,0):top+6]); bb = np.median(col[bot-6:bot+6])
    ys = np.arange(H)
    base = tb + (bb-tb)*(ys-top)/max(bot-top,1)
    res = col - base
    hi = res > thr
    Kv = int(0.03*H)
    yt = y0; yb = y0
    for yy in range(y0, top+Kv, -1):
        if hi[yy] and not hi[yy-Kv:yy].any():
            yt = yy; break
    for yy in range(y0, bot-Kv):
        if hi[yy] and not hi[yy+1:yy+1+Kv].any():
            yb = yy; break
    yc = (yt+yb)/2
    # radius refine from chord at x: half chord = sqrt(r^2 - dx^2)
    half = (yb-yt)/2; dx = xc - x
    r = math.sqrt(half*half + dx*dx)
    return dict(W=W, H=H, xc=round(xc,1), yc=round(yc,1), r=round(r,1), r_row=round(r0,1), xl=xl, xr=xr, yt=yt, yb=yb, xcol=x)

def main():
    names = sorted(n for n in os.listdir(IMG) if n.startswith("cover-g") and n.endswith(".jpg") and "real" not in n)
    res = {}
    tiles = []
    for n in names:
        g = measure(os.path.join(IMG, n))
        res[n] = g
        print(n, g)
        im = Image.open(os.path.join(IMG, n)).convert("RGB")
        d = ImageDraw.Draw(im)
        xc, yc, r = g["xc"], g["yc"], g["r"]
        d.ellipse([xc-r, yc-r, xc+r, yc+r], outline=(255,0,0), width=4)
        d.line([g["xl"], g["yt"]-40, g["xl"], g["yb"]+40], fill=(0,255,0), width=3)
        d.line([g["xr"], g["yt"]-40, g["xr"], g["yb"]+40], fill=(0,255,0), width=3)
        d.line([g["xcol"], g["yt"], g["xcol"], g["yb"]], fill=(0,0,255), width=4)
        tiles.append(im.resize((250, int(250*im.height/im.width))))
    json.dump(res, open(os.path.join(OUT, "cover-discs.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    cols = 6; rows = math.ceil(len(tiles)/cols)
    th = max(t.height for t in tiles)
    sheet = Image.new("RGB", (cols*250, rows*th), (30,30,30))
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i%cols)*250, (i//cols)*th))
    sheet.save(os.path.join(os.environ.get("TEMP", OUT), "cover-discs-check.png"))

main()
