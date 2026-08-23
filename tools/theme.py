"""Shared design tokens and SVG building blocks for the profile assets.

One palette, one set of primitives — so the profile, the badges and the
generated stats cards all look like they came from the same place.
"""
import os

HERE  = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "fonts")
F_BOLD = os.path.join(FONTS, "Poppins-Bold.ttf")
F_MED  = os.path.join(FONTS, "Poppins-Medium.ttf")
OUT    = os.path.abspath(os.path.join(HERE, "..", ".github", "assets"))

# ── palette ───────────────────────────────────────────────────────────────
MINT   = "#63e0c7"
SKY    = "#71a8ff"
ROSE   = "#ff8fab"
AMBER  = "#ffb84e"
INK    = "#eaf2ff"
MUTED  = "#8296b3"
CARD_A = "#122034"
CARD_B = "#0a1220"

# ── reusable gradient defs ────────────────────────────────────────────────
def defs_pill(accent=None, extra=""):
    wash = ""
    if accent:
        wash = (f'    <radialGradient id="wash" cx="1" cy=".5" r=".95">\n'
                f'      <stop offset="0" stop-color="{accent}" stop-opacity=".18"/>\n'
                f'      <stop offset="1" stop-color="{accent}" stop-opacity="0"/>\n'
                f'    </radialGradient>\n')
    return f'''  <defs>
    <linearGradient id="pill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#18253c"/><stop offset="1" stop-color="#0b1422"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".36"/>
      <stop offset=".5" stop-color="#ffffff" stop-opacity=".10"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".04"/>
    </linearGradient>
    <linearGradient id="ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
      <stop offset="0" stop-color="#7bead2"/><stop offset="1" stop-color="#7fb2ff"/>
    </linearGradient>
{wash}{extra}  </defs>
'''


def card_defs(accent=MINT):
    return f'''  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{CARD_A}"/><stop offset="1" stop-color="{CARD_B}"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".26"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".05"/>
    </linearGradient>
    <radialGradient id="w" cx=".5" cy="0" r=".9">
      <stop offset="0" stop-color="{accent}" stop-opacity=".16"/>
      <stop offset="1" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
      <stop offset="0" stop-color="#7bead2"/><stop offset="1" stop-color="#7fb2ff"/>
    </linearGradient>
  </defs>
'''


def card_frame(w, h, r=16):
    return (f'  <rect x=".7" y=".7" width="{w-1.4:.2f}" height="{h-1.4:.2f}" rx="{r}" fill="url(#bg)"/>\n'
            f'  <rect x=".7" y=".7" width="{w-1.4:.2f}" height="{h-1.4:.2f}" rx="{r}" fill="url(#w)"/>\n'
            f'  <rect x=".7" y=".7" width="{w-1.4:.2f}" height="{h-1.4:.2f}" rx="{r}" fill="none" '
            f'stroke="url(#edge)" stroke-width="1.3"/>')


def write(fname, svg):
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
        f.write(svg)
    return fname


# Inline chips sit in 16px body text. vertical-align:middle centres on the
# x-height, but the eye reads the centre at half the cap-height — about 1.6px
# higher. Transparent padding at the bottom of the canvas makes up the
# difference, since the box is what gets centred.
INLINE_LIFT = 3.2
