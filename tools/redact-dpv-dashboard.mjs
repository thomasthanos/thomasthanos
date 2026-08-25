/**
 * Redacts the Discord Package Viewer dashboard capture before it is published.
 *
 * The capture is a real archive, which is the whole point of showing it — and
 * also the problem. It contains the author's email, the Discord handles of
 * about fifteen other people, real linked-account names and a handful of
 * server names. Two of those are the author's to publish; the handles of other
 * people are not, under any reading.
 *
 * So every identifying string is painted over with a colour sampled from the
 * surrounding surface and replaced with a plausible stand-in at the same size
 * and weight. Blurring would have been faster and would have wrecked the one
 * thing the screenshot is there to prove: that this is a dense, real, working
 * interface. Photographic server icons are blurred rather than replaced,
 * because a solid block where an avatar should be reads as a bug.
 *
 * The source stays untouched on disk. Run this, then `npm run gen:assets`:
 *   node tools/redact-dpv-dashboard.mjs
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'assets-src/image-1787646942595.webp')
const OUT = join(root, 'assets-src/dpv-dashboard.png')

/** Surfaces sampled out of the capture itself, so the patches disappear. */
const BG = {
  sidebar: '#080b1a',
  header: '#111532',
  panel: '#181e2e',
  linked: '#1a1f2d',
}

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

/**
 * One patch: fill the box, then draw the replacement.
 * `size`/`weight`/`fill` mirror what the real element used.
 */
function patch({ x, y, w, h, bg, text, size = 13, weight = 400, fill = '#dbdee1', dx = 0 }) {
  const escaped = String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const label = text
    ? `<text x="${dx}" y="${h / 2}" dominant-baseline="central" font-family="${FONT}" ` +
      `font-size="${size}" font-weight="${weight}" fill="${fill}">${escaped}</text>`
    : ''
  return {
    input: Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
        `<rect width="${w}" height="${h}" fill="${bg}"/>${label}</svg>`,
    ),
    left: Math.round(x),
    top: Math.round(y),
  }
}

/** Contacts get generic handles. Counts and avatars stay — those are the UI. */
const DM_NAMES = [
  'friend_01', 'friend_02', 'friend_03', 'friend_04', 'friend_05',
  'friend_06', 'friend_07', 'friend_08', 'friend_09', 'friend_10',
  'Unknown Participant', 'friend_11', 'friend_12', 'friend_13',
  'Unknown Participant', 'friend_14', 'friend_15', 'friend_16',
]

/** The first sidebar row sits at y=133 and they repeat every 45.4px. */
const ROW_0 = 124
const ROW_STEP = 45.4

const composites = [
  // --- Header: the email. The @handle beside it is the author's own. -------
  patch({ x: 487, y: 56, w: 180, h: 20, bg: BG.header, text: 'you@example.com', size: 12, fill: '#8b8fa3' }),

  // --- Sidebar: every contact name ----------------------------------------
  ...DM_NAMES.map((name, i) =>
    patch({
      x: 110,
      y: ROW_0 + i * ROW_STEP,
      w: 126,
      h: 20,
      bg: BG.sidebar,
      text: name,
      size: 13,
      fill: '#c9ccd4',
    }),
  ),

  // --- Top servers: eight names, two columns ------------------------------
  ...[
    ['Modding Hub', 358, 321],
    ['Study Group', 358, 392],
    ['Game Night', 358, 463],
    ['RP CONTENT', 358, 534],
    ['Dev Corner', 1208, 321],
    ['Backup', 1208, 392],
    ['Side Project', 1208, 463],
    ['Guild Staff', 1208, 534],
  ].map(([text, x, y]) =>
    patch({ x, y, w: 300, h: 19, bg: BG.panel, text, size: 13, weight: 700, fill: '#f2f3f5' }),
  ),

  // --- Linked accounts: the values, not the service labels -----------------
  ...[
    ['Real Name', 332],
    ['epic-handle', 474],
    ['psn-handle', 614],
    ['Real Name', 756],
  ].map(([text, x]) =>
    patch({ x, y: 972, w: 108, h: 18, bg: BG.linked, text, size: 12, weight: 600, fill: '#e3e5e8' }),
  ),
]

/** Photographic icons — blurred in place, because a filled box reads as a bug. */
const BLUR_ICONS = [
  { left: 310, top: 320, width: 42, height: 42 },
  { left: 1158, top: 390, width: 42, height: 42 },
  { left: 10, top: 74, width: 42, height: 42 },
  { left: 10, top: 248, width: 42, height: 42 },
  { left: 10, top: 664, width: 42, height: 42 },
]

const base = sharp(SRC)
const { width, height } = await base.metadata()

for (const box of BLUR_ICONS) {
  const patchBuf = await sharp(SRC).extract(box).blur(9).png().toBuffer()
  composites.push({ input: patchBuf, left: box.left, top: box.top })
}

await base.composite(composites).png().toFile(OUT)

console.log(
  `redacted ${width}x${height} → ${OUT.replace(root + '\\', '').replace(root + '/', '')}  ` +
    `(${composites.length} patches, ${Math.round(statSync(OUT).size / 1024)} KB)`,
)
