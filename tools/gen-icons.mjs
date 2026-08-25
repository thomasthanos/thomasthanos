import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(root, 'tools/assets-src/pumpkin-logo-transparent.png')

const BG = '#0a0b0d'

const ROUND = 0.22

const JOBS = [
  { out: 'public/favicon-32.png', size: 32, round: ROUND, pad: 0.03 },
  { out: 'public/icon-192.png', size: 192, round: ROUND, pad: 0.08 },
  { out: 'public/icon-512.png', size: 512, round: ROUND, pad: 0.1 },
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

console.log(`source ${width}x${height} - tools/assets-src/pumpkin-logo-transparent.png`)
