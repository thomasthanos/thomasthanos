#!/usr/bin/env python3
"""Generate every static SVG used by the profile README.

Run:  python tools/gen_assets.py
Output goes to .github/assets/. Safe to re-run — it overwrites in place.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from xml.sax.saxutils import escape as esc
from textpath import text_path
from theme import (F_BOLD, F_MED, MINT, SKY, ROSE, AMBER, MUTED,
                   defs_pill, card_defs, card_frame, write, INLINE_LIFT)

FONT_STACK = '"Segoe UI",system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif'


# ══════════════════════════════════════════════════ glyphs (24×24 grid)
G = {
 "build":    '<path d="M12 2.9l8.4 4.6v9l-8.4 4.6-8.4-4.6v-9z"/><path d="M3.6 7.5L12 12.1l8.4-4.6"/><path d="M12 12.1v9"/>',
 "stack":    '<path d="M12 3.2l8.6 4.6L12 12.4 3.4 7.8z"/><path d="M3.4 12l8.6 4.6L20.6 12"/><path d="M3.4 16.2l8.6 4.6 8.6-4.6"/>',
 "apps":     '<rect x="3.2" y="3.2" width="7.2" height="7.2" rx="2"/><rect x="13.6" y="3.2" width="7.2" height="7.2" rx="2"/><rect x="3.2" y="13.6" width="7.2" height="7.2" rx="2"/><rect x="13.6" y="13.6" width="7.2" height="7.2" rx="2"/>',
 "stats":    '<path d="M4 20V10.5"/><path d="M9.9 20V4.4"/><path d="M15.8 20v-6.6"/><path d="M21 20H3.2"/>',
 "info":     '<circle cx="12" cy="12" r="8.8"/><path d="M12 11.4v5.2"/><path d="M12 7.7h.01"/>',
 "star":     '<path d="M12 3.4l2.8 5.6 6.2.9-4.5 4.4 1.1 6.2L12 17.6l-5.6 2.9 1.1-6.2L3 9.9l6.2-.9z"/>',
 "heart":    '<path d="M12 20.2S4.5 15.5 4.5 10.4A4.2 4.2 0 0112 7.9a4.2 4.2 0 017.5 2.5c0 5.1-7.5 9.8-7.5 9.8z"/>',
 "globe":    '<circle cx="12" cy="12" r="8.7"/><path d="M3.3 12h17.4"/><path d="M12 3.3a13.4 13.4 0 010 17.4 13.4 13.4 0 010-17.4z"/>',
 "puzzle":   '<path d="M4.6 6.6a2 2 0 012-2h2.9v-.3a2.3 2.3 0 114.6 0v.3h2.9a2 2 0 012 2v2.9h.3a2.3 2.3 0 110 4.6h-.3v2.9a2 2 0 01-2 2h-2.9v-.3a2.3 2.3 0 10-4.6 0v.3H6.6a2 2 0 01-2-2v-2.9h.3a2.3 2.3 0 100-4.6h-.3z"/>',
 "toolbox":  '<rect x="3" y="7.6" width="18" height="12" rx="2.2"/><path d="M8.6 7.6V5.8a2 2 0 012-2h2.8a2 2 0 012 2v1.8"/><path d="M3 13h18"/><path d="M10 11.6h4v2.8h-4z"/>',
 "gamepad":  '<path d="M7.6 8.2h8.8a4.6 4.6 0 014.5 3.7l.7 4a3 3 0 01-5.3 2.4l-1.2-1.5H8.9l-1.2 1.5a3 3 0 01-5.3-2.4l.7-4a4.6 4.6 0 014.5-3.7z"/><path d="M7.4 12v3M5.9 13.5h3"/><circle cx="16.2" cy="12.6" r=".9"/><circle cx="18" cy="14.6" r=".9"/>',
 "archive":  '<rect x="2.8" y="4.2" width="18.4" height="4.4" rx="1.4"/><path d="M4.6 8.6v9a2 2 0 002 2h10.8a2 2 0 002-2v-9"/><path d="M9.8 12.4h4.4"/>',
 "mail":     '<rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.4"/><path d="M3.4 7l8.6 6 8.6-6"/>',
 "code":     '<path d="M9 6.6L3.7 12 9 17.4"/><path d="M15 6.6L20.3 12 15 17.4"/>',
 "clock":    '<circle cx="12" cy="12" r="8.7"/><path d="M12 6.9V12l3.4 2"/>',
 "bolt":     '<path d="M13.3 2.6L4.7 13.6h6.1L10.2 21.4l8.6-11h-6.1z"/>',
 "activity": '<path d="M2.8 12.4h4.1l2.7-7.1 4.3 12 2.5-4.9h4.8"/>',
 "coffee":   '<path d="M4 8.4h13v6.2a4.6 4.6 0 01-4.6 4.6H8.6A4.6 4.6 0 014 14.6z"/><path d="M17 9.8h1.6a2.6 2.6 0 010 5.2H17"/><path d="M7 3.4v2.2M11 3.4v2.2M15 3.4v2.2"/>',
}


def glyph(name, x, y, size=16, stroke="url(#ink)", halo=True, sw=2.1):
    sc = size / 24.0
    g = G[name]
    out = ""
    if halo:
        out += (f'<g transform="translate({x:.1f},{y:.1f}) scale({sc:.4f})" fill="none" stroke="{MINT}" '
                f'stroke-width="{sw+2.4:.1f}" stroke-linecap="round" stroke-linejoin="round" opacity=".14">{g}</g>')
    out += (f'<g transform="translate({x:.1f},{y:.1f}) scale({sc:.4f})" fill="none" stroke="{stroke}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{g}</g>')
    return out


# ══════════════════════════════════════════════════ heading / project icons
def icon(name, gname, accent=MINT, pad=True, prefix="icon"):
    """pad=True adds transparent space below so the icon optically centres on
       a line of text (see theme.INLINE_LIFT). Icons that sit alone in a table
       cell are already centred by the cell, so they skip it."""
    W = 48.0
    PAD = 10.0 if pad else 0.0
    ink_a = accent if accent != MINT else "#7bead2"
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 {48+PAD:g}" width="48" height="{48+PAD:g}" role="img" aria-label="{esc(name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#18243a"/><stop offset="1" stop-color="#0a1220"/>
    </linearGradient>
    <linearGradient id="ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
      <stop offset="0" stop-color="{ink_a}"/><stop offset="1" stop-color="#7fb2ff"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".40"/>
      <stop offset=".55" stop-color="#ffffff" stop-opacity=".08"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".03"/>
    </linearGradient>
    <radialGradient id="sheen" cx=".28" cy=".18" r=".85">
      <stop offset="0" stop-color="{accent}" stop-opacity=".22"/>
      <stop offset="1" stop-color="{SKY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="1.25" y="1.25" width="45.5" height="45.5" rx="14" fill="url(#bg)"/>
  <rect x="1.25" y="1.25" width="45.5" height="45.5" rx="14" fill="url(#sheen)"/>
  <rect x="1.25" y="1.25" width="45.5" height="45.5" rx="14" fill="none" stroke="url(#edge)" stroke-width="1.3"/>
  {glyph(gname, 12, 12, 24, sw=2.1)}
</svg>
'''
    return write(f"{prefix}-{name}.svg", svg)


# ══════════════════════════════════════════════════ badges
def badge(fname, label, value, accent):
    H, R, fs, trk = 26.0, 13.0, 10.2, 0.35
    padL, gap, mid, padR, dot = 12.0, 7.0, 8.5, 13.0, 3.4
    lab, lw = text_path(label.upper(), F_BOLD, fs, trk)
    val, vw = text_path(value.upper(), F_BOLD, fs, trk)
    x_dot = padL + dot
    x_lab = x_dot + dot + gap
    x_div = x_lab + lw + mid
    x_val = x_div + mid
    W = x_val + vw + padR
    by = H / 2 + fs * 0.36
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.2f} {H:.0f}" role="img" aria-label="{esc(label)}: {esc(value)}">
{defs_pill(accent)}  <rect x=".55" y=".55" width="{W-1.1:.2f}" height="{H-1.1:.1f}" rx="{R-.55:.2f}" fill="url(#pill)"/>
  <rect x=".55" y=".55" width="{W-1.1:.2f}" height="{H-1.1:.1f}" rx="{R-.55:.2f}" fill="url(#wash)"/>
  <rect x=".55" y=".55" width="{W-1.1:.2f}" height="{H-1.1:.1f}" rx="{R-.55:.2f}" fill="none" stroke="url(#edge)" stroke-width="1.1"/>
  <circle cx="{x_dot:.2f}" cy="{H/2:.1f}" r="{dot+2.4:.1f}" fill="{accent}" opacity=".16"/>
  <circle cx="{x_dot:.2f}" cy="{H/2:.1f}" r="{dot}" fill="{accent}"/>
  <path d="M{x_div:.2f} 7.4v11.2" stroke="#ffffff" stroke-opacity=".14" stroke-width="1"/>
  <g transform="translate({x_lab:.2f},{by:.2f})" fill="#93a6c0">{lab}</g>
  <g transform="translate({x_val:.2f},{by:.2f})" fill="{accent}">{val}</g>
</svg>
'''
    write(fname, svg)
    return W


# ══════════════════════════════════════════════════ nav buttons
def button(fname, label, gname):
    H, R, fs = 38.0, 19.0, 14.2
    padL, ico, gap, padR = 16.0, 17.0, 9.5, 18.0
    lab, lw = text_path(label, F_MED, fs, 0.0)
    x_lab = padL + ico + gap
    W = x_lab + lw + padR
    by = H / 2 + fs * 0.355
    top = ('    <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">\n'
           '      <stop offset="0" stop-color="#ffffff" stop-opacity=".075"/>\n'
           '      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>\n'
           '    </linearGradient>\n')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.2f} {H:.0f}" role="img" aria-label="{esc(label)}">
{defs_pill(extra=top)}  <rect x=".7" y=".7" width="{W-1.4:.2f}" height="{H-1.4:.1f}" rx="{R-.7:.1f}" fill="url(#pill)"/>
  <rect x=".7" y=".7" width="{W-1.4:.2f}" height="{H-1.4:.1f}" rx="{R-.7:.1f}" fill="url(#top)"/>
  <rect x=".7" y=".7" width="{W-1.4:.2f}" height="{H-1.4:.1f}" rx="{R-.7:.1f}" fill="none" stroke="url(#edge)" stroke-width="1.3"/>
  {glyph(gname, padL, (H-ico)/2, ico, sw=2.2)}
  <g transform="translate({x_lab:.2f},{by:.2f})" fill="#e2ebf8">{lab}</g>
</svg>
'''
    write(fname, svg)
    return W


# ══════════════════════════════════════════════════ project pills
P_H, P_R, P_FS = 44.0, 22.0, 15.2
P_PADL, P_ICO, P_GAP, P_PADR, P_CHEV, P_CHEVGAP = 9.0, 24.0, 11.0, 14.0, 13.0, 16.0


def project_width(name):
    _, lw = text_path(name, F_MED, P_FS, -0.1)
    return P_PADL + P_ICO + P_GAP + lw + P_CHEVGAP + P_CHEV + P_PADR


def project(fname, name, gname, accent, uniform_w=None):
    H, R, fs = P_H, P_R, P_FS
    padL, ico, gap, padR, chev = P_PADL, P_ICO, P_GAP, P_PADR, P_CHEV
    lab, lw = text_path(name, F_MED, fs, -0.1)
    x_lab = padL + ico + gap
    W = uniform_w or project_width(name)
    by = H / 2 + fs * 0.355
    x_chev = W - padR - chev
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.2f} {H:.0f}" role="img" aria-label="{esc(name)}">
  <defs>
    <linearGradient id="pill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a273e"/><stop offset="1" stop-color="#0b1422"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".34"/>
      <stop offset=".5" stop-color="#ffffff" stop-opacity=".10"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".04"/>
    </linearGradient>
    <radialGradient id="wash" cx=".08" cy=".5" r=".85">
      <stop offset="0" stop-color="{accent}" stop-opacity=".26"/>
      <stop offset="1" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".08"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
      <stop offset="0" stop-color="{accent}"/><stop offset="1" stop-color="#7fb2ff"/>
    </linearGradient>
  </defs>
  <rect x=".8" y=".8" width="{W-1.6:.2f}" height="{H-1.6:.1f}" rx="{R-.8:.1f}" fill="url(#pill)"/>
  <rect x=".8" y=".8" width="{W-1.6:.2f}" height="{H-1.6:.1f}" rx="{R-.8:.1f}" fill="url(#wash)"/>
  <rect x=".8" y=".8" width="{W-1.6:.2f}" height="{H-1.6:.1f}" rx="{R-.8:.1f}" fill="url(#sheen)"/>
  <rect x=".8" y=".8" width="{W-1.6:.2f}" height="{H-1.6:.1f}" rx="{R-.8:.1f}" fill="none" stroke="url(#edge)" stroke-width="1.4"/>
  <circle cx="{padL+ico/2:.1f}" cy="{H/2:.1f}" r="{ico/2+4:.1f}" fill="{accent}" opacity=".13"/>
  {glyph(gname, padL, (H-ico)/2, ico, halo=False, sw=1.9)}
  <g transform="translate({x_lab:.2f},{by:.2f})" fill="#eaf1fb">{lab}</g>
  <path d="M{x_chev:.1f} {H/2-4.4:.1f}l4.4 4.4-4.4 4.4" fill="none" stroke="{accent}" stroke-opacity=".85"
        stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'''
    write(fname, svg)
    return W


# ══════════════════════════════════════════════════ tech / app strips
def stack_card(fname, groups):
    """groups = [(category, [(label, colour), ...]), ...] — one row per category."""
    LFS, CFS = 11.6, 13.2
    CH, PADX, PADY, GAPX, GAPY = 32.0, 22.0, 20.0, 8.0, 12.0
    dot, cpadL, cgap, cpadR = 3.7, 11.0, 7.5, 13.0
    labw = 0.0
    prepared = []
    for cat, items in groups:
        ld, lw = text_path(cat.upper(), F_BOLD, LFS, 1.0)
        labw = max(labw, lw)
        chips = []
        for label, colour in items:
            d, tw = text_path(label, F_MED, CFS, 0)
            chips.append((d, colour, cpadL + dot * 2 + cgap + tw + cpadR))
        prepared.append((ld, lw, chips))
    colx = PADX + labw + 22
    W = max(colx + sum(c[2] for c in chips) + GAPX * (len(chips) - 1) + PADX
            for _, _, chips in prepared)
    H = PADY * 2 + len(prepared) * CH + (len(prepared) - 1) * GAPY
    parts, y = [], PADY
    for ld, lw, chips in prepared:
        parts.append(f'<g transform="translate({PADX:.1f},{y + CH/2 + LFS*0.355:.2f})" fill="{MUTED}">{ld}</g>')
        x = colx
        for d, colour, cw in chips:
            by = y + CH / 2 + CFS * 0.355
            parts.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{cw:.2f}" height="{CH}" rx="{CH/2}" fill="#ffffff" fill-opacity=".045"/>')
            parts.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{cw:.2f}" height="{CH}" rx="{CH/2}" fill="none" stroke="{colour}" stroke-opacity=".30" stroke-width="1.1"/>')
            parts.append(f'<circle cx="{x+cpadL+dot:.2f}" cy="{y+CH/2:.2f}" r="{dot+2.2:.1f}" fill="{colour}" opacity=".18"/>')
            parts.append(f'<circle cx="{x+cpadL+dot:.2f}" cy="{y+CH/2:.2f}" r="{dot}" fill="{colour}"/>')
            parts.append(f'<g transform="translate({x+cpadL+dot*2+cgap:.2f},{by:.2f})" fill="#dfe9f7">{d}</g>')
            x += cw + GAPX
        y += CH + GAPY
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" '
           f'viewBox="0 0 {W:.2f} {H:.2f}" role="img" aria-label="Tech stack">\n'
           f'{card_defs(MINT)}{card_frame(W, H)}\n'
           + "\n".join("  " + p for p in parts) + "\n</svg>\n")
    write(fname, svg)
    return W, H


def strip(fname, title, items, cols=6):
    """items = [(label, colour), ...] laid out as a grid of chips inside a card."""
    fs, trk = 13.4, 0.0
    CH, PADX, PADY, GAPX, GAPY = 34.0, 20.0, 20.0, 10.0, 10.0
    dot, padL, gap, padR = 4.0, 12.0, 8.0, 14.0
    chips = []
    for label, colour in items:
        d, lw = text_path(label, F_MED, fs, trk)
        chips.append((label, colour, d, padL + dot * 2 + gap + lw + padR, lw))
    rows, row, roww = [], [], 0.0
    for c in chips:
        if len(row) == cols:
            rows.append((row, roww)); row, roww = [], 0.0
        row.append(c); roww += c[3] + GAPX
    if row:
        rows.append((row, roww))
    W = PADX * 2 + max(rw - GAPX for _, rw in rows)
    H = PADY * 2 + len(rows) * CH + (len(rows) - 1) * GAPY
    parts, y = [], PADY
    for row, roww in rows:
        x = (W - (roww - GAPX)) / 2
        for label, colour, d, cw, lw in row:
            by = y + CH / 2 + fs * 0.355
            parts.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{cw:.2f}" height="{CH}" rx="{CH/2}" fill="#ffffff" fill-opacity=".045"/>')
            parts.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{cw:.2f}" height="{CH}" rx="{CH/2}" fill="none" stroke="{colour}" stroke-opacity=".30" stroke-width="1.1"/>')
            parts.append(f'<circle cx="{x+padL+dot:.2f}" cy="{y+CH/2:.2f}" r="{dot+2.4:.1f}" fill="{colour}" opacity=".18"/>')
            parts.append(f'<circle cx="{x+padL+dot:.2f}" cy="{y+CH/2:.2f}" r="{dot}" fill="{colour}"/>')
            parts.append(f'<g transform="translate({x+padL+dot*2+gap:.2f},{by:.2f})" fill="#dfe9f7">{d}</g>')
            x += cw + GAPX
        y += CH + GAPY
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.2f} {H:.2f}" role="img" aria-label="{esc(title)}">
{card_defs(MINT)}{card_frame(W, H)}
{chr(10).join('  ' + p for p in parts)}
</svg>
'''
    write(fname, svg)
    return W, H


# ══════════════════════════════════════════════════ context strip
def strip_stats(fname, cells, accent=MINT):
    """cells = [(value, label), ...] — the at-a-glance line above the projects."""
    H, R, PADX, VFS, LFS, GAP = 82.0, 16.0, 22.0, 21.0, 10.4, 26.0
    m = []
    for v, l in cells:
        vd, vw = text_path(v, F_BOLD, VFS, -0.2)
        ld, lw = text_path(l.upper(), F_MED, LFS, 1.15)
        m.append((vd, vw, ld, lw))
    colw = [max(vw, lw) for _, vw, _, lw in m]
    W = PADX * 2 + sum(colw) + GAP * (len(cells) - 1)
    parts, x = [], PADX
    for i, (vd, vw, ld, lw) in enumerate(m):
        cx = x + colw[i] / 2
        parts.append(f'<rect x="{cx-12:.2f}" y="15" width="24" height="2.4" rx="1.2" fill="{accent}" opacity=".85"/>')
        parts.append(f'<g transform="translate({cx-vw/2:.2f},45)" fill="#ffffff">{vd}</g>')
        parts.append(f'<g transform="translate({cx-lw/2:.2f},65)" fill="{MUTED}">{ld}</g>')
        if i < len(cells) - 1:
            parts.append(f'<path d="M{x+colw[i]+GAP/2:.2f} 24V66" stroke="#ffffff" stroke-opacity=".10" stroke-width="1"/>')
        x += colw[i] + GAP
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" '
           f'viewBox="0 0 {W:.2f} {H:.0f}" role="img" aria-label="At a glance">\n'
           f'{card_defs(accent)}{card_frame(W, H, R)}\n'
           + "\n".join("  " + p for p in parts) + "\n</svg>\n")
    write(fname, svg)
    return W


# ══════════════════════════════════════════════════ divider
def divider():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="10" viewBox="0 0 1200 10" role="img" aria-label="">
  <defs>
    <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
      <stop offset="0"   stop-color="#63e0c7" stop-opacity="0"/>
      <stop offset=".10" stop-color="#63e0c7" stop-opacity=".65"/>
      <stop offset=".42" stop-color="#71a8ff" stop-opacity=".45"/>
      <stop offset=".72" stop-color="#ff8fab" stop-opacity=".22"/>
      <stop offset="1"   stop-color="#71a8ff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="n" cx=".085" cy=".5" r=".5">
      <stop offset="0" stop-color="#63e0c7" stop-opacity=".9"/>
      <stop offset="1" stop-color="#63e0c7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="4.2" width="1200" height="1.6" rx=".8" fill="url(#d)"/>
  <ellipse cx="102" cy="5" rx="52" ry="4" fill="url(#n)"/>
  <circle cx="102" cy="5" r="2.4" fill="#7bead2"/>
</svg>
'''
    return write("divider.svg", svg)


# ══════════════════════════════════════════════════ hero banner
def banner():
    W, H = 1200.0, 340.0
    css = '''
    @keyframes drift1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(26px,-16px) } }
    @keyframes drift2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-22px,14px) } }
    @keyframes breathe { 0%,100% { opacity:.55 } 50% { opacity:.95 } }
    @keyframes sweepx  { 0% { transform: translateX(-560px) } 100% { transform: translateX(1360px) } }
    @keyframes floaty  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
    .d1 { animation: drift1 15s ease-in-out infinite }
    .d2 { animation: drift2 19s ease-in-out infinite }
    .br { animation: breathe 8s ease-in-out infinite }
    .sw { animation: sweepx 9s linear infinite }
    .f1 { animation: floaty 7s ease-in-out infinite }
    .f2 { animation: floaty 7s ease-in-out infinite .9s }
    .f3 { animation: floaty 7s ease-in-out infinite 1.8s }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important } }
'''
    chips = []
    x = 64.0
    for label, colour in [("Browser extensions", MINT), ("Windows apps", AMBER),
                          ("Athens", ROSE), ("04:00 commits", SKY)]:
        d, lw = text_path(label, F_MED, 15.5, 0)
        w = 21 + 15 + lw + 20
        chips.append(f'''    <g>
      <rect x="{x:.1f}" y="262" width="{w:.1f}" height="40" rx="20" fill="#ffffff" fill-opacity=".045"/>
      <rect x="{x:.1f}" y="262" width="{w:.1f}" height="40" rx="20" fill="none" stroke="url(#hair)" stroke-width="1.1"/>
      <circle cx="{x+21:.1f}" cy="282" r="4.5" fill="{colour}"/>
      <g transform="translate({x+36:.1f},{287.5:.1f})" fill="#dce6f5">{d}</g>
    </g>''')
        x += w + 14

    t_kick, _ = text_path("KOLOKITHES A.E.", F_BOLD, 13.5, 3.1)
    t_name, _ = text_path("Thomas Thanos", F_BOLD, 62, -1.6)
    t_sub, _  = text_path("A multinational corporation with one employee, one office,", F_MED, 20, 0)
    t_sub2, _ = text_path("and deeply questionable working hours.", F_MED, 20, 0)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:g} {H:g}" width="{W:g}" height="{H:g}" role="img" aria-label="Thomas Thanos — Kolokithes A.E.">
  <defs>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c1727"/><stop offset=".55" stop-color="#08121f"/><stop offset="1" stop-color="#060e18"/>
    </linearGradient>
    <radialGradient id="gm" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="{MINT}" stop-opacity=".55"/><stop offset="1" stop-color="{MINT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gs" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="{SKY}" stop-opacity=".55"/><stop offset="1" stop-color="{SKY}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gr" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="{ROSE}" stop-opacity=".38"/><stop offset="1" stop-color="{ROSE}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="760" y2="0">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#b9f2e4"/><stop offset="1" stop-color="#8fbcff"/>
    </linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".30"/><stop offset="1" stop-color="#ffffff" stop-opacity=".04"/>
    </linearGradient>
    <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".5" stop-color="#ffffff" stop-opacity=".07"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rule" gradientUnits="userSpaceOnUse" x1="64" y1="0" x2="112" y2="0">
      <stop offset="0" stop-color="{MINT}" stop-opacity=".9"/>
      <stop offset="1" stop-color="{SKY}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0v44" fill="none" stroke="#9fb4d0" stroke-opacity=".05" stroke-width="1"/>
    </pattern>
    <clipPath id="clip"><rect x="0" y="0" width="{W:g}" height="{H:g}" rx="26"/></clipPath>
  </defs>
  <style>{css}</style>
  <g clip-path="url(#clip)">
    <rect width="{W:g}" height="{H:g}" fill="url(#card)"/>
    <rect width="{W:g}" height="{H:g}" fill="url(#grid)"/>
    <g class="d1"><ellipse cx="120" cy="20" rx="420" ry="270" fill="url(#gm)"/></g>
    <g class="d2"><ellipse cx="1080" cy="40" rx="440" ry="290" fill="url(#gs)"/></g>
    <ellipse cx="700" cy="350" rx="380" ry="180" fill="url(#gr)"/>
    <g opacity=".9" transform="translate(902,54)">
      <g class="f1"><rect x="0" y="34" width="94" height="94" rx="26" fill="#ffffff" fill-opacity=".05" stroke="url(#hair)" stroke-width="1.2" transform="rotate(-9 47 81)"/></g>
      <g class="f2"><rect x="86" y="8" width="94" height="94" rx="26" fill="#ffffff" fill-opacity=".05" stroke="url(#hair)" stroke-width="1.2" transform="rotate(6 133 55)"/></g>
      <g class="f3"><rect x="150" y="112" width="94" height="94" rx="26" fill="#ffffff" fill-opacity=".05" stroke="url(#hair)" stroke-width="1.2" transform="rotate(-4 197 159)"/></g>
    </g>
    <rect class="sw" x="-560" y="0" width="560" height="{H:g}" fill="url(#sweep)"/>
  </g>
  <rect x=".75" y=".75" width="{W-1.5:g}" height="{H-1.5:g}" rx="26" fill="none" stroke="url(#hair)" stroke-width="1.5"/>
  <rect x="64" y="52" width="46" height="3" rx="1.5" fill="url(#rule)" class="br"/>
  <g transform="translate(64,88)" fill="{MINT}" fill-opacity=".95">{t_kick}</g>
  <g transform="translate(62,164)" fill="url(#title)">{t_name}</g>
  <g transform="translate(64,203)" fill="#a8b6cb">{t_sub}</g>
  <g transform="translate(64,229)" fill="#a8b6cb">{t_sub2}</g>
{chr(10).join(chips)}
</svg>
'''
    return write("banner-profile.svg", svg)


# ══════════════════════════════════════════════════ build everything
if __name__ == "__main__":
    made = []

    # section icons — Featured Projects / Tech Stack / Currently Building / GitHub Activity
    for n, g in [("build", "build"), ("stack", "stack"),
                 ("bolt", "bolt"), ("activity", "activity")]:
        made.append(icon(n, g))

    # project icons — alone in a table cell, so no inline padding
    for n, g, a in [("extensions", "puzzle", MINT), ("mylife", "toolbox", AMBER),
                    ("steam", "gamepad", SKY), ("discord", "archive", ROSE)]:
        made.append(icon(n, g, accent=a, pad=False, prefix="proj"))

    badges = [("badge-extensions.svg", "extensions", "4 shipped", MINT),
              ("badge-users.svg",      "nexusmods bypass", "12k+ users", AMBER),
              ("badge-apps.svg",       "desktop apps", "3", SKY)]
    row = sum(badge(*b) for b in badges) + 4 * (len(badges) - 1)

    buttons = [("btn-website.svg",  "Website",  "globe"),
               ("btn-projects.svg", "Projects", "puzzle"),
               ("btn-paypal.svg",   "PayPal",   "heart"),
               ("btn-revolut.svg",  "Revolut",  "heart")]
    brow = sum(button(*b) for b in buttons) + 4 * (len(buttons) - 1)

    # "100% open source" would contradict the extensions LICENCE, which is
    # explicitly source-available. "source available" is the accurate claim.
    sw = strip_stats("stats-strip.svg", [("12K+", "users"), ("4", "extensions"),
                                         ("3", "desktop apps"), ("100%", "source available")])

    stw, sth = stack_card("stack.svg", [
        ("Languages",      [("TypeScript", "#3178c6"), ("JavaScript", "#f7df1e"),
                            ("Python", "#3776ab"), ("C#", "#9b4f96")]),
        ("Frontend",       [("React", "#61dafb"), ("HTML", "#e34f26"), ("CSS", "#1572b6")]),
        ("Backend / Data", [("Node.js", "#5fa04e"), ("SQLite", "#0f80cc"), ("Firebase", "#ffca28")]),
        ("Tools",          [("Git", "#f05033"), ("VS Code", "#0098ff")]),
    ])

    divider()
    banner()

    print(f"badge row   {row:.0f}px  (GitHub content width ~860px)")
    print(f"button row  {brow:.0f}px")
    print(f"stats strip {sw:.0f}px")
    print(f"stack card  {stw:.0f} x {sth:.0f}px")
    print("assets written to .github/assets/")
