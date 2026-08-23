#!/usr/bin/env python3
"""Render the profile stats cards from live GitHub data.

Why self-hosted: the usual stats services are shared public instances that get
rate-limited, and the profile then shows a broken image. This runs in Actions,
commits plain SVG into the repo, and can never fail at read time.

Run:  GITHUB_TOKEN=... python tools/gen_stats.py [username]
"""
import json, os, sys, urllib.request, urllib.error
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from textpath import text_path
from theme import (F_BOLD, F_MED, MINT, SKY, ROSE, AMBER, MUTED,
                   card_defs, card_frame, write)

USER  = (sys.argv[1] if len(sys.argv) > 1 else os.environ.get("GH_USER", "thomasthanos"))
TOKEN = os.environ.get("GITHUB_TOKEN", "")
API   = "https://api.github.com/graphql"

QUERY = """
query($login:String!) {
  user(login:$login) {
    followers { totalCount }
    repositories(first:100, ownerAffiliations:OWNER, isFork:false,
                 orderBy:{field:STARGAZERS, direction:DESC}) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        languages(first:10, orderBy:{field:SIZE, direction:DESC}) {
          edges { size node { name color } }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      contributionCalendar { totalContributions }
    }
  }
}
"""


def fetch():
    if not TOKEN:
        raise SystemExit("GITHUB_TOKEN is not set — refusing to write stats from no data.")
    body = json.dumps({"query": QUERY, "variables": {"login": USER}}).encode()
    req = urllib.request.Request(API, data=body, headers={
        "Authorization": f"bearer {TOKEN}",
        "Content-Type": "application/json",
        "User-Agent": f"{USER}-profile-stats",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        payload = json.load(r)
    if "errors" in payload:
        raise SystemExit(f"GitHub API returned errors: {payload['errors']}")
    return payload["data"]["user"]


def summarise(u):
    repos = u["repositories"]["nodes"]
    stars = sum(r["stargazerCount"] for r in repos)
    forks = sum(r["forkCount"] for r in repos)
    langs = {}
    for r in repos:
        for e in r["languages"]["edges"]:
            n = e["node"]["name"]
            langs.setdefault(n, {"size": 0, "color": e["node"]["color"] or "#8296b3"})
            langs[n]["size"] += e["size"]
    total = sum(v["size"] for v in langs.values()) or 1
    top = sorted(langs.items(), key=lambda kv: -kv[1]["size"])[:6]
    return {
        "repos":     u["repositories"]["totalCount"],
        "stars":     stars,
        "forks":     forks,
        "followers": u["followers"]["totalCount"],
        "commits":   u["contributionsCollection"]["totalCommitContributions"],
        "contribs":  u["contributionsCollection"]["contributionCalendar"]["totalContributions"],
        "langs":     [(n, v["size"] / total * 100, v["color"]) for n, v in top],
    }


def human(n):
    if n >= 1_000_000: return f"{n/1_000_000:.1f}M".replace(".0M", "M")
    if n >= 1_000:     return f"{n/1_000:.1f}k".replace(".0k", "k")
    return str(n)


# ────────────────────────────────────────────────── stats card
def render_stats(s):
    cells = [(human(s["repos"]), "repos"), (human(s["stars"]), "stars"),
             (human(s["forks"]), "forks"), (human(s["commits"]), "commits"),
             (human(s["contribs"]), "contributions")]
    # Kept narrow enough that this and the languages card sit side by side
    # inside GitHub's ~860px content column instead of stacking.
    H, R, PADX, VFS, LFS, GAP = 84.0, 16.0, 18.0, 21.0, 10.4, 22.0
    m = []
    for v, l in cells:
        vd, vw = text_path(v, F_BOLD, VFS, -0.2)
        ld, lw = text_path(l.upper(), F_MED, LFS, 1.15)
        m.append((vd, vw, ld, lw))
    colw = [max(vw, lw) for _, vw, _, lw in m]
    W = PADX * 2 + sum(colw) + GAP * (len(cells) - 1)
    parts, x = [], PADX
    for i, ((v, l), (vd, vw, ld, lw)) in enumerate(zip(cells, m)):
        cx = x + colw[i] / 2
        parts.append(f'<rect x="{cx-12:.2f}" y="15" width="24" height="2.4" rx="1.2" fill="{MINT}" opacity=".85"/>')
        parts.append(f'<g transform="translate({cx-vw/2:.2f},45)" fill="#ffffff">{vd}</g>')
        parts.append(f'<g transform="translate({cx-lw/2:.2f},65)" fill="{MUTED}">{ld}</g>')
        if i < len(cells) - 1:
            parts.append(f'<path d="M{x+colw[i]+GAP/2:.2f} 24V66" stroke="#ffffff" stroke-opacity=".10" stroke-width="1"/>')
        x += colw[i] + GAP
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" '
           f'viewBox="0 0 {W:.2f} {H:.0f}" role="img" aria-label="GitHub stats">\n'
           f'{card_defs(MINT)}{card_frame(W, H)}\n'
           + "\n".join("  " + p for p in parts) + "\n</svg>\n")
    write("stats.svg", svg)
    return W


# ────────────────────────────────────────────────── languages card
def render_langs(s):
    FS, LH, PADX, PADT, PADB = 12.6, 26.0, 18.0, 46.0, 18.0
    BARW, BARH = 168.0, 7.0
    title, tw = text_path("Most used languages", F_BOLD, 14.0, 0.2)
    rows = []
    for name, pct, colour in s["langs"]:
        nd, nw = text_path(name, F_MED, FS, 0)
        pd, pw = text_path(f"{pct:.1f}%", F_BOLD, FS, 0)
        rows.append((nd, nw, pd, pw, pct, colour))
    namew = max(nw for _, nw, _, _, _, _ in rows)
    pctw  = max(pw for _, _, _, pw, _, _ in rows)
    W = PADX * 2 + namew + 12 + BARW + 12 + pctw
    H = PADT + len(rows) * LH + PADB
    parts = [f'<g transform="translate({PADX:.1f},28)" fill="#eaf2ff">{title}</g>']
    y = PADT
    for nd, nw, pd, pw, pct, colour in rows:
        by = y + FS * 0.355 + 2
        bx = PADX + namew + 12
        parts.append(f'<g transform="translate({PADX:.1f},{by:.2f})" fill="#dfe9f7">{nd}</g>')
        parts.append(f'<rect x="{bx:.1f}" y="{y-BARH/2-1:.2f}" width="{BARW}" height="{BARH}" rx="{BARH/2}" fill="#ffffff" fill-opacity=".07"/>')
        parts.append(f'<rect x="{bx:.1f}" y="{y-BARH/2-1:.2f}" width="{max(BARW*pct/100, BARH):.2f}" height="{BARH}" rx="{BARH/2}" fill="{colour}"/>')
        parts.append(f'<g transform="translate({bx+BARW+12:.1f},{by:.2f})" fill="{MUTED}">{pd}</g>')
        y += LH
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" '
           f'viewBox="0 0 {W:.2f} {H:.2f}" role="img" aria-label="Most used languages">\n'
           f'{card_defs(SKY)}{card_frame(W, H)}\n'
           + "\n".join("  " + p for p in parts) + "\n</svg>\n")
    write("top-langs.svg", svg)
    return W


if __name__ == "__main__":
    data = summarise(fetch())
    w1 = render_stats(data)
    w2 = render_langs(data)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"stats.svg      {w1:.0f}px")
    print(f"top-langs.svg  {w2:.0f}px")
    print(f"repos={data['repos']} stars={data['stars']} forks={data['forks']} "
          f"commits={data['commits']} contribs={data['contribs']}")
    print(f"languages: {', '.join(n for n, _, _ in data['langs'])}")
    print(f"generated {stamp}")
