#!/usr/bin/env python3
"""Build the hero banner from the illustration in photos/.

The artwork carries the personality; this script makes it usable as a header:
grades it into the profile palette, lays a scrim over the left half so text is
readable on top, and renders the name and chips as vector paths.

Run:  python tools/gen_banner.py
"""
import base64, io, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from PIL import Image, ImageEnhance
from textpath import text_path
from theme import F_BOLD, F_MED, MINT, SKY, ROSE, AMBER, write, OUT

HERE = os.path.dirname(os.path.abspath(__file__))
ART  = os.path.join(HERE, "..", "photos", "banner_gthub_copy.png")

# The artwork has "DIVING INTO APP DEVELOPMENT!" baked across the top, which
# fights the real title. Cropping those rows away removes it and gives a
# shorter, calmer hero at the same time.
CROP_TOP = 0.27
W, H = 1200, 252
NAVY = (10, 18, 32)


def grade(path):
    """Pull the artwork towards the profile palette and dim it enough to sit
       behind text, then fade the left side into the page background."""
    im = Image.open(path).convert("RGB")
    im = im.crop((0, int(im.height * CROP_TOP), im.width, im.height))

    # cover-fit to the banner box
    sr, tr = im.width / im.height, W / H
    if sr > tr:
        nw = int(im.height * tr)
        im = im.crop(((im.width - nw) // 2, 0, (im.width + nw) // 2, im.height))
    else:
        nh = int(im.width / tr)
        im = im.crop((0, (im.height - nh) // 2, im.width, (im.height + nh) // 2))
    im = im.resize((W, H), Image.LANCZOS)

    im = ImageEnhance.Color(im).enhance(0.72)       # calm the neon
    im = ImageEnhance.Brightness(im).enhance(0.66)  # make room for white text
    im = ImageEnhance.Contrast(im).enhance(1.06)

    # unify the cyan background towards navy
    im = Image.blend(im, Image.new("RGB", (W, H), NAVY), 0.34)

    # left-to-right scrim: solid navy at the text edge, clear over the artwork
    scrim = Image.new("RGB", (W, H), NAVY)
    mask = Image.new("L", (W, 1))
    for x in range(W):
        t = x / W
        if   t < 0.34: a = 236
        elif t < 0.72: a = int(236 * (1 - (t - 0.34) / 0.38) ** 1.35)
        else:          a = 0
        mask.putpixel((x, 0), a)
    im = Image.composite(scrim, im, mask.resize((W, H)))

    # a touch of mint in the deepest shadows ties it to the rest of the profile
    tint = Image.new("RGB", (W, H), (18, 46, 44))
    im = Image.blend(im, tint, 0.10)

    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
    return base64.b64encode(buf.getvalue()).decode(), len(buf.getvalue())


def build():
    if not os.path.exists(ART):
        raise SystemExit(f"artwork not found: {ART}")
    b64, raw = grade(ART)

    kick, _  = text_path("KOLOKITHES A.E.", F_BOLD, 13.5, 3.1)
    name, _  = text_path("Thomas Thanos", F_BOLD, 52, -1.3)
    sub1, _  = text_path("A multinational corporation with one employee, one office,", F_MED, 17, 0)
    sub2, _  = text_path("and deeply questionable working hours.", F_MED, 17, 0)

    chips, x = [], 64.0
    for label, colour in [("Browser extensions", MINT), ("Windows apps", AMBER),
                          ("Athens", ROSE), ("04:00 AM commits", SKY)]:
        d, lw = text_path(label, F_MED, 13.6, 0)
        w = 18 + 13 + lw + 17
        chips.append(
            f'    <g>\n'
            f'      <rect x="{x:.1f}" y="196" width="{w:.1f}" height="34" rx="17" fill="#0a1220" fill-opacity=".55"/>\n'
            f'      <rect x="{x:.1f}" y="196" width="{w:.1f}" height="34" rx="17" fill="none" stroke="{colour}" stroke-opacity=".45" stroke-width="1.1"/>\n'
            f'      <circle cx="{x+18:.1f}" cy="213" r="3.9" fill="{colour}"/>\n'
            f'      <g transform="translate({x+31:.1f},{217.8:.1f})" fill="#e6eefb">{d}</g>\n'
            f'    </g>')
        x += w + 11

    css = """
    @keyframes breathe { 0%,100% { opacity:.55 } 50% { opacity:1 } }
    @keyframes sweepx  { 0% { transform: translateX(-520px) } 100% { transform: translateX(1320px) } }
    .br { animation: breathe 8s ease-in-out infinite }
    .sw { animation: sweepx 11s linear infinite }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important } }
"""

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Thomas Thanos — Kolokithes A.E.">
  <defs>
    <clipPath id="clip"><rect x="0" y="0" width="{W}" height="{H}" rx="26"/></clipPath>
    <linearGradient id="title" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="620" y2="0">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#c8f5e9"/><stop offset="1" stop-color="#9cc6ff"/>
    </linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".30"/><stop offset="1" stop-color="#ffffff" stop-opacity=".04"/>
    </linearGradient>
    <linearGradient id="rule" gradientUnits="userSpaceOnUse" x1="64" y1="0" x2="112" y2="0">
      <stop offset="0" stop-color="{MINT}" stop-opacity=".95"/><stop offset="1" stop-color="{SKY}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".5" stop-color="#ffffff" stop-opacity=".05"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a1220" stop-opacity="0"/>
      <stop offset="1" stop-color="#0a1220" stop-opacity=".75"/>
    </linearGradient>
  </defs>
  <style>{css}</style>
  <g clip-path="url(#clip)">
    <image x="0" y="0" width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice"
           href="data:image/jpeg;base64,{b64}"/>
    <rect x="0" y="{H-96}" width="{W}" height="96" fill="url(#floor)"/>
    <rect class="sw" x="-520" y="0" width="520" height="{H}" fill="url(#sweep)"/>
  </g>
  <rect x=".75" y=".75" width="{W-1.5}" height="{H-1.5}" rx="26" fill="none" stroke="url(#hair)" stroke-width="1.5"/>
  <rect x="64" y="34" width="42" height="3" rx="1.5" fill="url(#rule)" class="br"/>
  <g transform="translate(64,62)" fill="{MINT}">{kick}</g>
  <g transform="translate(62,122)" fill="url(#title)">{name}</g>
  <g transform="translate(64,150)" fill="#c3d2e6">{sub1}</g>
  <g transform="translate(64,172)" fill="#c3d2e6">{sub2}</g>
{chr(10).join(chips)}
</svg>
'''
    write("banner-profile.svg", svg)
    out = os.path.join(OUT, "banner-profile.svg")
    print(f"artwork  {raw/1024:.0f} KB jpeg")
    print(f"banner   {os.path.getsize(out)/1024:.0f} KB svg  (was 1.5 MB png)")


if __name__ == "__main__":
    build()
