#!/usr/bin/env python3
"""مولِّدُ خلفيّةِ «لوحة الدوائر» لإطارِ محادثةِ المساعد — images/ui/assistant-circuit.svg

طلبُ المالك ٢٠٢٦-١١-٠٣ بصورةٍ مرجعيّةٍ (خلفيّةُ دوائرَ إلكترونيّةٍ رماديّة): «اضف مثل هذه الخلفية لفريم المحادثة
بحيث تكون ظاهرة بشكل خفيف». والمرجعُ تصميمٌ جاهزٌ مجهولُ الترخيص، فهذا **رسمٌ أصليٌّ بالأسلوبِ نفسِه لا نسخةٌ منه**
(كما فُعِلَ بإطارِ المحادثةِ نفسِه — §مساعدةُ المعلّمة في CLAUDE.md): مساراتٌ عموديّةٌ بانعطافاتٍ مائلةٍ ٤٥° تنتهي بنقاط،
ورقائقُ بأرجل، وسلالمُ مخطّطة، ووصلاتٌ قطريّةٌ قصيرة، وخلايا سداسيّةٌ خافتة، ومستطيلاتٌ مفرّغة.

البلاطةُ **متّصلةُ الحوافّ في الاتجاهين** (كلُّ عنصرٍ يعبرُ حافّةً يُرسَمُ أيضاً من الجهةِ المقابلة)، فتتكرّرُ في اللوحةِ
مهما طالت المحادثةُ بلا خطِّ التقاء. الألوانُ فاتحةٌ لأنّ اللوحةَ رماديّةٌ غامقة، والخفوتُ يُضبَطُ في الصفحةِ لا هنا
(‏CIRCUIT.opacity في assistant.html).

التشغيل:  python3 tools/make-circuit-bg.py      (البذرةُ ثابتة: الناتجُ نفسُه في كلِّ مرّة)
"""
import math
import random

W, H = 480, 720          # البلاطةُ ببكسلات CSS
SEED = 1103
OUT = 'images/ui/assistant-circuit.svg'
G = 12                   # شبكةُ المواضع

rnd = random.Random(SEED)
els = []                 # (bbox, svg) — bbox = (x0, y0, x1, y1)


def f(v):
    return ('%.1f' % v).rstrip('0').rstrip('.')


def add(svg, pts):
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    els.append(((min(xs), min(ys), max(xs), max(ys)), svg))


def poly(pts, cls):
    d = 'M' + ' L'.join(f(x) + ' ' + f(y) for x, y in pts)
    add('<path class="%s" d="%s"/>' % (cls, d), pts)


def dot(x, y, r, cls):
    add('<circle class="%s" cx="%s" cy="%s" r="%s"/>' % (cls, f(x), f(y), f(r)), [(x - r, y - r), (x + r, y + r)])


used = set()


def free_col(lo=2, hi=None):
    hi = hi or (W // G - 2)
    for _ in range(200):
        c = rnd.randint(lo, hi)
        if not any(abs(c - u) < 2 for u in used):
            used.add(c)
            return c * G
    return None


# ① مساراتٌ عموديّةٌ بانعطافٍ أو انعطافَين مائلَين، تنتهي بنقطة (مصمتة أو حلقة)
for i in range(20):
    x = free_col()
    if x is None:
        break
    y = rnd.randint(0, H // G) * G
    L = rnd.choice([180, 240, 300, 360, 420, 540])
    cls = 't2' if rnd.random() < .22 else 't'
    pts = [(x, y)]
    seg = L / rnd.choice([2, 3])
    cx, cy = x, y
    while cy - y < L:
        nxt = min(cy + seg, y + L)
        pts.append((cx, nxt))
        cy = nxt
        if cy - y < L - 40 and rnd.random() < .75:
            dx = rnd.choice([-1, 1]) * rnd.choice([24, 36, 48])
            if 16 <= cx + dx <= W - 16:
                cx += dx
                cy += abs(dx)
                pts.append((cx, cy))
    poly(pts, cls)
    ends = rnd.random()
    if ends < .45:
        dot(pts[0][0], pts[0][1], 2.6, 'p')
        dot(pts[-1][0], pts[-1][1], 3.4, 'ring')
    elif ends < .8:
        dot(pts[-1][0], pts[-1][1], 3, 'p')
    else:
        dot(pts[0][0], pts[0][1], 3.4, 'ring')

# ② مساراتٌ طويلةٌ تعبرُ البلاطةَ كلَّها (تتّصلُ بنظيرتِها في البلاطةِ التالية)
for i in range(4):
    x = free_col()
    if x is None:
        break
    y0 = rnd.randint(0, H // G) * G
    dx = rnd.choice([-1, 1]) * 36
    pts = [(x, y0), (x, y0 + 260), (x + dx, y0 + 296), (x + dx, y0 + 460), (x, y0 + 496), (x, y0 + H)]
    poly(pts, 't')

# ③ رقائقُ بأرجل (مربّعٌ مفرَّغٌ وداخلَه مربّعٌ مصمت)
for cxp, cyp in [(0.27, 0.40), (0.74, 0.80)]:
    cx, cy, s = W * cxp, H * cyp, 30
    add('<rect class="t" x="%s" y="%s" width="%d" height="%d" rx="2"/>' % (f(cx - s / 2), f(cy - s / 2), s, s),
        [(cx - s / 2, cy - s / 2), (cx + s / 2, cy + s / 2)])
    add('<rect class="fill" x="%s" y="%s" width="12" height="12"/>' % (f(cx - 6), f(cy - 6)), [(cx - 6, cy - 6), (cx + 6, cy + 6)])
    pins = []
    for k in range(-2, 3):
        o = k * 5.5
        pins += ['M%s %sv-6' % (f(cx + o), f(cy - s / 2)), 'M%s %sv6' % (f(cx + o), f(cy + s / 2)),
                 'M%s %sh-6' % (f(cx - s / 2), f(cy + o)), 'M%s %sh6' % (f(cx + s / 2), f(cy + o))]
    add('<path class="pin" d="%s"/>' % ' '.join(pins), [(cx - s / 2 - 6, cy - s / 2 - 6), (cx + s / 2 + 6, cy + s / 2 + 6)])

# ④ سلالمُ مخطّطة (أعمدةٌ من خطوطٍ أفقيّةٍ قصيرة)
for cxp, cyp, n in [(0.36, 0.06, 18), (0.62, 0.66, 22)]:
    x, y = W * cxp, H * cyp
    d = ' '.join('M%s %sh14' % (f(x), f(y + k * 5)) for k in range(n))
    add('<path class="lad" d="%s"/>' % d, [(x, y), (x + 14, y + n * 5)])

# ⑤ وصلاتٌ قطريّةٌ قصيرةٌ بنقطتَين (عمودٌ منها)
for cxp, cyp, n in [(0.46, 0.20, 7), (0.80, 0.56, 6)]:
    x, y = W * cxp, H * cyp
    for k in range(n):
        yy = y + k * 13
        poly([(x, yy), (x + 12, yy + 9)], 'tt')
        dot(x, yy, 1.8, 'p')
        dot(x + 12, yy + 9, 1.8, 'p')

# ⑥ خلايا سداسيّةٌ خافتة (عنقودان)
def hexagon(cx, cy, r):
    pts = [(cx + r * math.cos(math.radians(60 * k)), cy + r * math.sin(math.radians(60 * k))) for k in range(6)]
    pts.append(pts[0])
    poly(pts, 'hex')

for (ox, oy, cols, rows) in [(0.15, 0.62, 3, 3), (0.70, 0.12, 3, 2)]:
    r = 30
    for c in range(cols):
        for rr in range(rows):
            hexagon(W * ox + c * r * 1.5, H * oy + rr * r * math.sqrt(3) + (c % 2) * r * math.sqrt(3) / 2, r)

# ⑦ مستطيلاتٌ مفرّغة (بعضُها طويلٌ ضيّق)
for (xp, yp, w, h) in [(0.10, 0.03, 26, 90), (0.88, 0.47, 22, 110), (0.05, 0.30, 44, 40), (0.84, 0.90, 52, 46), (0.55, 0.93, 30, 30)]:
    x, y = W * xp, H * yp
    add('<rect class="box" x="%s" y="%s" width="%d" height="%d"/>' % (f(x), f(y), w, h), [(x, y), (x + w, y + h)])


# ── الاتّصالُ عبرَ الحوافّ: كلُّ عنصرٍ يعبرُ حافّةً يُكرَّرُ مُزاحاً بعرضِ البلاطةِ أو طولِها ──
out = []
for (x0, y0, x1, y1), svg in els:
    out.append(svg)
    sx = [0] + ([W] if x0 < 0 else []) + ([-W] if x1 > W else [])
    sy = [0] + ([H] if y0 < 0 else []) + ([-H] if y1 > H else [])
    for dx in sx:
        for dy in sy:
            if dx or dy:
                out.append('<g transform="translate(%d %d)">%s</g>' % (dx, dy, svg))

STYLE = ('.t,.t2,.tt,.pin,.lad,.hex,.box,.ring{fill:none;stroke-linecap:round;stroke-linejoin:round}'
         '.t{stroke:#C7CED6;stroke-width:1.3}.t2{stroke:#FFFFFF;stroke-width:1.4}.tt{stroke:#C7CED6;stroke-width:1.1}'
         '.pin{stroke:#C7CED6;stroke-width:1}.lad{stroke:#C7CED6;stroke-width:1.8}'
         '.hex{stroke:#AEB6BF;stroke-width:.9;opacity:.55}.box{stroke:#C7CED6;stroke-width:1.1;opacity:.8}'
         '.ring{stroke:#C7CED6;stroke-width:1.3}.p,.fill{fill:#C7CED6}')
svg = ('<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d">'
       '<style>%s</style>%s</svg>\n') % (W, H, W, H, STYLE, ''.join(out))
open(OUT, 'w', encoding='utf8').write(svg)
print('✓', OUT, len(els), 'عنصراً', len(svg), 'بايت')
