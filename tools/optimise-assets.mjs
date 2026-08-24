/**
 * Re-encodes the artwork in public/assets to WebP at the size it is actually
 * displayed (2× for retina), because the source PNGs are exports, not
 * web assets — the hoodie figure alone was 975 KB for a 310px slot.
 *
 * Pixel art is encoded losslessly so the blocks stay crisp; the painted
 * artwork uses lossy WebP, which handles its gradients far better than PNG.
 *
 * The original PNGs are left on disk untouched. Run after replacing any of
 * them:  npm run gen:assets
 */
import sharp from 'sharp'
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'assets-src')
const OUT = join(root, 'public/assets')

/** `width` is 2× the largest CSS size the image is ever rendered at. */
const JOBS = [
  // .ab__facts-figure — max 310px wide
  { src: 'pumpkin-hoodie-figure.png', width: 620, mode: 'lossy', quality: 82 },
  // .term__face-art — max 270px wide, but it is pixel art: keep it exact.
  { src: 'terminal-pixel-face.png', width: null, mode: 'lossless' },
  // .sticker__art — max 172px wide
  { src: 'spongebob-pame-gta_en.png', width: 344, mode: 'lossy', quality: 86 },
  { src: 'spongebob-pame-gta_gr.png', width: 344, mode: 'lossy', quality: 86 },
  // .logo__image — 30px in the header, 25px in the footer. 96px covers 3×.
  { src: 'pumpkin-logo-transparent.png', width: 96, mode: 'lossless' },

  // Project captures. `out` puts them in a per-project folder, so the flat top
  // level stays for brand artwork. These are UI, not photographs, so they get a
  // high quality setting — banding across a settings panel is very visible.
  { src: 'nxb-popup.png', out: 'projects/nexusmods-bypass/popup.webp', width: null, mode: 'lossy', quality: 92 },
  { src: 'nxb-collection-idle.png', out: 'projects/nexusmods-bypass/collection-idle.webp', width: 1792, mode: 'lossy', quality: 88 },
  { src: 'nxb-collection-running.png', out: 'projects/nexusmods-bypass/collection-running.webp', width: 1794, mode: 'lossy', quality: 88 },
  { src: 'nxb-settings.png', out: 'projects/nexusmods-bypass/settings.webp', width: null, mode: 'lossy', quality: 90 },
]

let before = 0
let after = 0

for (const job of JOBS) {
  const from = join(SRC, job.src)
  try {
    statSync(from)
  } catch {
    console.log(`skip (missing): ${job.src}`)
    continue
  }

  const out = join(OUT, job.out ?? job.src.replace(/\.png$/, '.webp'))
  mkdirSync(dirname(out), { recursive: true })
  let img = sharp(from)
  const meta = await img.metadata()

  // Never upscale — that only adds bytes, never detail.
  if (job.width && meta.width && meta.width > job.width) {
    img = img.resize({ width: job.width, withoutEnlargement: true })
  }

  await img
    .webp(
      job.mode === 'lossless'
        ? { lossless: true, effort: 6 }
        : { quality: job.quality, effort: 6, alphaQuality: 100 },
    )
    .toFile(out)

  const a = statSync(from).size
  const b = statSync(out).size
  before += a
  after += b
  const w = job.width && meta.width && meta.width > job.width ? job.width : meta.width
  console.log(
    `${job.src.padEnd(30)} ${String(Math.round(a / 1024)).padStart(4)} KB → ` +
      `${String(Math.round(b / 1024)).padStart(4)} KB webp  (${w}px, ${job.mode})`,
  )
}

console.log(
  `\ntotal ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB ` +
    `(-${Math.round((1 - after / before) * 100)}%)`,
)

const sources = readdirSync(SRC).filter((f) => f.endsWith('.png'))
console.log(`\nsources in assets-src/ (never shipped): ${sources.length} files`)
