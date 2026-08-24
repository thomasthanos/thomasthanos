/**
 * Builds every favicon and app icon from the real mascot artwork in
 * assets-src/, so the browser tab shows the same pumpkin as the header.
 *
 * These used to be a hand-drawn SVG approximation kept in three places
 * (public/favicon.svg, tools/icon.html and the mark inside tools/og-card.html)
 * which drifted away from the artwork and stopped matching the site.
 *
 * Run after changing the logo:  npm run gen:icons
 * The PNGs are committed, so this is not part of the normal build.
 */
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(root, 'assets-src/pumpkin-logo-transparent.png')

/** Page background, so the black pumpkin body never sits on a light tab bar. */
const BG = '#0a0b0d'

/** Corner radius as a share of the canvas. iOS masks its own, so 0 there. */
const ROUND = 0.22

// Padding is per size: at 32px every pixel of the face counts, so the mark is
// allowed almost to the edge, while the large icons get room to breathe.
const JOBS = [
  { out: 'public/favicon-32.png', size: 32, round: ROUND, pad: 0.03 },
  { out: 'public/icon-192.png', size: 192, round: ROUND, pad: 0.08 },
  { out: 'public/icon-512.png', size: 512, round: ROUND, pad: 0.1 },
  // iOS applies its own squircle mask and ignores alpha, so this one is
  // full-bleed with square corners.
  { out: 'public/apple-touch-icon.png', size: 180, round: 0, pad: 0.08 },
]

function plate(size, round) {
  const r = Math.round(size * round)
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${BG}"/>` +
      `</svg>`,
  )
}

const source = sharp(SOURCE)
const { width, height } = await source.metadata()

for (const job of JOBS) {
  const box = Math.round(job.size * (1 - job.pad * 2))
  // `contain` keeps the 4:3 mark intact; it is centred by the composite below.
  const mark = await source
    .clone()
    .resize(box, box, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const info = await sharp(plate(job.size, job.round))
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(root, job.out))

  console.log(`${job.out.padEnd(30)} ${job.size}×${job.size}  ${(info.size / 1024).toFixed(1)} KB`)
}

console.log(`source ${width}×${height} — assets-src/pumpkin-logo-transparent.png`)
