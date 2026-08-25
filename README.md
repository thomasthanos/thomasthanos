# me.thomast.uk - portfolio

Personal site for Thomas Thanos (`kolokithes A.E.`). React + TypeScript + Vite, deployed on Cloudflare Workers.

## Repository Map

The project is structured following modern Feature-Sliced Design principles and strict separation of source/generated assets:

```text
portofolio/
├─ public/           # Static assets served as-is
│  ├─ assets/        # Generated WebP images (DO NOT EDIT THESE)
│  └─ robots.txt, sitemap.xml, site.webmanifest, icons, etc.
│
├─ src/              # Application source code
│  ├─ components/    # Reusable, global UI components (brand, layout, ui)
│  ├─ features/      # Domain-specific components (chaos mode, projects)
│  ├─ pages/         # Full page views
│  │  └─ case-studies/ # Deep-dive project write-ups
│  ├─ data/          # JSON-like data stores (projects, site info, content)
│  ├─ hooks/         # Custom React hooks
│  ├─ i18n/          # Translations (en, el)
│  ├─ layouts/       # Route shell layouts
│  ├─ styles/        # Global CSS, tokens, primitives
│  └─ utils/         # Helper functions
│
├─ tools/            # Scripts & build utilities
│  ├─ assets-src/    # Editable PNG source files (EDIT THESE)
│  ├─ manual/        # Manual tools like sticker-edit.js and redact-dpv-dashboard.mjs
│  ├─ workbench/     # Ignored folder for temporary/unredacted test inputs
│  └─ *.mjs          # Generation scripts
```

### Component Structure
- `src/components/`: Contains globally reusable components such as UI primitives (`ui/`), structural layout elements (`layout/`), and brand-specific visual elements (`brand/`).
- `src/features/`: Contains domain-specific components that belong to a particular feature area (e.g., `projects/` for project catalogs, `chaos/` for the easter-egg mode).

### Asset Pipeline
- **`tools/assets-src/`**: This is where you put your editable, high-quality `.png` source files. These are *never* shipped to production to save bandwidth.
- **`tools/workbench/`**: Used for temporary screenshots and unredacted captures during case-study development. Contents are intentionally ignored by git.
- **`tools/manual/`**: Contains manual dev scripts. For example, `sticker-edit.js` is a bookmarklet to position stickers in the browser console.
- **`public/assets/`**: This is where the optimized `.webp` files live. They are generated automatically by `npm run gen:assets`. Note: For "Make Your Life Easier", the WebP screenshots do not have regeneratable PNG originals in `assets-src`, so they are retained directly here.

> **Note on Generated Files**: The optimized images (WebP), icons, OG image, and subset handwriting fonts in `public/` are intentionally committed to Git because the standard build does not regenerate them. A clean checkout must already contain them. Conversely, `public/sitemap.xml` and the SPA fallback (`404.html`) ARE refreshed automatically during `npm run build` by `gen-static.mjs`.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | sitemap → typecheck → bundle → SPA 404 fallback |
| `npm run preview` | Serves `dist/` locally |
| `npm run typecheck` | `tsc -b --noEmit`, no emit |
| `npm run gen:og` | Re-renders `public/og.png` from `tools/og-card.html` (needs Chromium) |
| `npm run gen:icons` | Rebuilds every favicon and app icon from `tools/assets-src/pumpkin-logo-transparent.png` |
| `npm run gen:font` | Re-subsets the handwriting font - **run after editing any margin note** |
| `npm run gen:assets` | Re-encodes `tools/assets-src/*.png` → `public/assets/**/*.webp` |

## Deployment

Live at **https://me.thomast.uk** as a Cloudflare Worker serving static assets.

**Deployment Command:**
```bash
npx wrangler deploy
```

**Node Version:**
The `.nvmrc` file pins **Node 22**. Vite 7 requires it to build properly (the default Node 18 build images will fail).
