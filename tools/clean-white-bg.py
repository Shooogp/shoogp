# -*- coding: utf-8 -*-
"""
تنظيف خلفيات صور الواجهة البيضاء وتحويلها إلى شفافية — منصّة شوجب
=====================================================================
يعالج كل ملفات PNG في images/ui/‏:
  ١. flood fill من حواف الصورة: كل بكسل أبيض/قريب من الأبيض (القنوات الثلاث
     ≥ 245) متصل بالخارج يصبح شفافاً تماماً — الأبيض الداخلي (بريق النجمة،
     حدود الكبسولات، علامة الصح) لا يُمسّ لأنه غير متصل بالخارج.
  ٢. حواف الانتقال: البكسلات شبه البيضاء (200-244) الملاصقة للمنطقة المفرَّغة
     تأخذ شفافية متدرجة حسب قربها من الأبيض، مع فكّ خلط لونها من الأبيض
     (defringe) كي لا تبقى هالة ولا تخرج الحواف مسننة (حتى ٣ طبقات عمقاً).
  ٣. نسخة احتياطية من كل أصل في images/ui/originals/ قبل الكتابة فوقه.
  ٤. الحفظ بنفس الاسم بصيغة PNG RGBA.

التشغيل:  pip install pillow  ثم  python tools/clean-white-bg.py
"""
import os
import shutil
from collections import deque
from PIL import Image

UI_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                      "images", "ui")
BACKUP_DIR = os.path.join(UI_DIR, "originals")

WHITE_T = 245      # عتبة «الأبيض تقريباً» للتفريغ الكامل
EDGE_LOW = 200     # أدنى قناة تدخل في نطاق التدرج الحافّي
EDGE_PASSES = 3    # عمق معالجة حافة الانتقال بالبكسل


def min_channel(px):
    return min(px[0], px[1], px[2])


def clean(path):
    """يعيد (هل كانت بخلفية بيضاء؟, هل عولجت؟)"""
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()

    # هل الزوايا/الحواف بيضاء معتمة أصلاً؟ إن كانت شفافة فالصورة سليمة
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    had_white = any(a[3] > 0 and min_channel(a) >= WHITE_T for a in corners)
    if not had_white:
        return False, False

    # ١) flood fill من كل بكسلات الإطار: الأبيض المتصل بالخارج فقط
    outside = [[False] * w for _ in range(h)]
    q = deque()

    def push(x, y):
        if not outside[y][x]:
            p = px[x, y]
            if p[3] > 0 and min_channel(p) >= WHITE_T:
                outside[y][x] = True
                q.append((x, y))

    for x in range(w):
        push(x, 0); push(x, h - 1)
    for y in range(h):
        push(0, y); push(w - 1, y)
    while q:
        x, y = q.popleft()
        if x > 0: push(x - 1, y)
        if x < w - 1: push(x + 1, y)
        if y > 0: push(x, y - 1)
        if y < h - 1: push(x, y + 1)

    for y in range(h):
        for x in range(w):
            if outside[y][x]:
                px[x, y] = (0, 0, 0, 0)

    # ٢) حواف الانتقال: تدرّج + فكّ خلط من الأبيض، من الخارج نحو الداخل
    for _ in range(EDGE_PASSES):
        edge = []
        for y in range(h):
            for x in range(w):
                p = px[x, y]
                if p[3] == 0:
                    continue
                mc = min_channel(p)
                if mc < EDGE_LOW or mc >= 255:
                    continue
                near_clear = any(
                    0 <= nx < w and 0 <= ny < h and px[nx, ny][3] < 255
                    for nx, ny in ((x-1, y), (x+1, y), (x, y-1), (x, y+1)))
                if near_clear:
                    edge.append((x, y, p, mc))
        if not edge:
            break
        for x, y, p, mc in edge:
            a = (255 - mc) * 255 // (255 - EDGE_LOW)     # أبعد عن الأبيض = أكثر عتامة
            a = max(0, min(255, a))
            if a == 0:
                px[x, y] = (0, 0, 0, 0)
                continue
            af = a / 255.0
            r = max(0, min(255, round((p[0] - (1 - af) * 255) / af)))
            g = max(0, min(255, round((p[1] - (1 - af) * 255) / af)))
            b = max(0, min(255, round((p[2] - (1 - af) * 255) / af)))
            px[x, y] = (r, g, b, min(a, p[3]))

    im.save(path, "PNG")
    return True, True


def main():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    print(f"{'الصورة':<22}{'خلفية بيضاء؟':<15}{'عولجت؟'}")
    for name in sorted(os.listdir(UI_DIR)):
        if not name.lower().endswith(".png"):
            continue
        path = os.path.join(UI_DIR, name)
        if not os.path.isfile(path):
            continue
        shutil.copy2(path, os.path.join(BACKUP_DIR, name))
        had, done = clean(path)
        print(f"{name:<22}{'نعم' if had else 'لا':<15}{'نُظّفت' if done else 'سليمة — لم تُمسّ'}")


if __name__ == "__main__":
    main()
