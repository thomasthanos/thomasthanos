"""Turn a string into SVG path data using a bundled font.

Rendering text as outlines means the generated SVGs look identical everywhere —
no dependency on whatever font the reader's machine happens to have, and no
guessing at text widths.
"""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

_cache = {}


def _load(path):
    if path not in _cache:
        f = TTFont(path)
        _cache[path] = (f, f.getGlyphSet(), f["head"].unitsPerEm, f.getBestCmap(), f["hmtx"])
    return _cache[path]


def text_path(s, font_path, size, tracking=0.0):
    """Return (svg_path_markup, advance_width). Baseline at y=0, starts at x=0."""
    font, gs, upem, cmap, hmtx = _load(font_path)
    scale = size / upem
    out, x = [], 0.0
    for ch in s:
        gname = cmap.get(ord(ch))
        if gname is None:
            x += size * 0.5 + tracking
            continue
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}")
        gs[gname].draw(pen)
        seg = pen.getCommands()
        if seg:
            out.append(
                f'<path transform="translate({x:.2f},0) scale({scale:.5f},{-scale:.5f})" d="{seg}"/>'
            )
        x += hmtx[gname][0] * scale + tracking
    return "".join(out), (x - tracking if s else 0.0)


def text_width(s, font_path, size, tracking=0.0):
    return text_path(s, font_path, size, tracking)[1]
