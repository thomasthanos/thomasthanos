# me.thomast.uk — portfolio

Personal site for Thomas Thanos (`kolokithes A.E.`). React + TypeScript + Vite,
no UI framework, no trackers, no cookie banner because there are no cookies.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the built output
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | sitemap → typecheck → bundle → 404 fallback |
| `npm run preview` | Serves `dist/` locally |
| `npm run typecheck` | `tsc -b --noEmit`, no emit |
| `npm run gen:og` | Re-renders `public/og.png` from `tools/og-card.html` (needs Chromium) |
| `npm run gen:icons` | Rebuilds every favicon and app icon from the mascot artwork |
| `npm run gen:font` | Re-subsets the handwriting font — **run after editing any margin note** |
| `npm run gen:assets` | Re-encodes `assets-src/*.png` → `public/assets/*.webp` |

Everything under `public/` that these four produce is committed, because
`npm run build` does not run them. Change the logo → run `gen:assets`,
`gen:icons` and `gen:og`, in that order.

## Where the content lives

Nothing is hardcoded in a component. All copy is data, and every user-facing
string carries both languages as `{ en, el }`.

```
src/data/
  projects/flagship.ts   6 projects with full case studies
  projects/more.ts       8 smaller tools, experiments and older work
  projects/index.ts      assembles the list, filters, prev/next
  about.ts               bio, timeline, the six principles, "what I like building"
  stack.ts               tech groups with human comments (deliberately no % bars)
  notes.ts               the handwritten margin notes
  eggs.ts                console messages, Chaos Mode lines, 404 copy
  site.ts                identity, nav, rotating footer lines
src/i18n/
  en.ts                  source of truth — the Dict type is derived from it
  el.ts                  must match en.ts's shape or the build fails
```

**Adding a project:** append an object to `flagship.ts` (full case study) or
`more.ts` (lighter, shows on /labs if it has a `lab` field). It appears on
/projects, in the filters, in prev/next and in `sitemap.xml` automatically.

**Changing a translation:** edit `el.ts`. A missing key is a compile error, not
a blank label on the page.

## Artwork

Source PNGs live in `assets-src/` and are **not** shipped. `npm run gen:assets`
re-encodes them into `public/assets/*.webp` at 2× their rendered size — pixel
art losslessly, painted artwork lossy. That pass takes the artwork from 1.7 MB
down to 276 KB, so replace a PNG in `assets-src/` and re-run the script rather
than dropping a file straight into `public/`.

## Design system

`src/styles/tokens.css` holds every colour, size, radius and duration. Nothing
elsewhere hardcodes a value. The three text tiers all clear WCAG AA against the
lightest surface they sit on — hierarchy comes from size and weight, not from
making dim text unreadable.

Three fonts, all self-hosted: **Tektur** (squared display, headlines only),
**Inter Tight** (UI), **JetBrains Mono** (labels, terminal), plus **Mynerve**
for the handwritten notes, hand-subset from 74 KB down to what the notes
actually use.

## Chaos Mode

Off by default, persisted in `localStorage`, and reachable two ways: the header
toggle, or the Konami code. It adds doodles in the page margins, swaps some
terminal lines and recolours the mascot. It never moves layout, never blocks a
click, and it respects `prefers-reduced-motion`. The margin decorations only
appear above 1424px, where there is actual gutter to draw in.

## Deploying

Live at **https://me.thomast.uk** on Cloudflare Pages, built from this branch on
every push.

| Pages setting | Value |
|---|---|
| Production branch | `portfolio` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | `/` |

`.nvmrc` pins Node 22 — Vite 7 refuses to build on the Node 18 that Pages
otherwise defaults to.

Two files in `public/` configure the host and are copied into `dist/` verbatim:

- **`_redirects`** — `/* /index.html 200`. Without it a hard refresh on
  `/projects/steam-idler` is answered by `404.html` with a 404 status, so
  crawlers record every deep link as missing.
- **`_headers`** — CSP, `X-Frame-Options`, `Permissions-Policy` and cache
  lifetimes. The CSP is `'self'`-only because the site genuinely loads nothing
  from anywhere else; adding a third-party script means editing this file first.

Other hosts: `dist/404.html` covers GitHub Pages, and `VITE_BASE=/sub/ npm run build`
covers a sub-path. Moving domain means editing `src/data/site.ts`, `index.html`,
`public/robots.txt` and the `ORIGIN` default in `tools/gen-static.mjs`.

## Notes

- The `8K+ weekly / 15K peak` figures on NexusMods Bypass are supplied by the
  author. Everything else — versions, module names, locale counts, architecture
  layers — was read out of the actual repositories.
- Project "interface" panels are schematics generated from project data, clearly
  labelled as such. They are not screenshots. Drop real ones into a project's
  `shots` array and the gallery section renders itself.
