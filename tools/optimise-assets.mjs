import sharp from 'sharp'
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'tools/assets-src')
const OUT = join(root, 'public/assets')

const JOBS = [
  { src: 'pumpkin-hoodie-figure.png', width: 620, mode: 'lossy', quality: 82 },
  { src: 'terminal-pixel-face.png', width: null, mode: 'lossless' },
  { src: 'spongebob-pame-gta_en.png', width: 344, mode: 'lossy', quality: 86 },
  { src: 'spongebob-pame-gta_gr.png', width: 344, mode: 'lossy', quality: 86 },
  { src: 'pumpkin-logo-transparent.png', width: 96, mode: 'lossless' },

  { src: 'nxb-collection-idle.png', out: 'projects/nexusmods-bypass/collection-idle.webp', width: 1792, mode: 'lossy', quality: 88 },
  { src: 'nxb-collection-running.png', out: 'projects/nexusmods-bypass/collection-running.webp', width: 1794, mode: 'lossy', quality: 88 },
  { src: 'nxb-popup-settings.png', out: 'projects/nexusmods-bypass/popup-settings.webp', width: 2730, mode: 'lossy', quality: 92 },

  { src: 'dpv-generator.png', out: 'projects/discord-package-viewer/generator.webp', width: 1400, mode: 'lossy', quality: 90 },
  { src: 'dpv-dashboard.png', out: 'projects/discord-package-viewer/dashboard.webp', width: 2400, mode: 'lossy', quality: 92 },
  { src: 'dpv-language-warning.png', out: 'projects/discord-package-viewer/language-warning.webp', width: null, mode: 'lossless' },

  // Chrome Web Store listing art (v6.4.5), not raw captures — dark gradient render, lossy suits it.
  { src: 'ant-panels.png', out: 'projects/an1me-tracker/panels.webp', width: 1448, mode: 'lossy', quality: 90 },
  { src: 'ant-watch-page.png', out: 'projects/an1me-tracker/watch-page.webp', width: 1280, mode: 'lossy', quality: 90 },
  { src: 'ant-library-detail.png', out: 'projects/an1me-tracker/library-detail.webp', width: 1280, mode: 'lossy', quality: 90 },
  { src: 'ant-stats.png', out: 'projects/an1me-tracker/stats.webp', width: 1280, mode: 'lossy', quality: 90 },
  { src: 'ant-settings.png', out: 'projects/an1me-tracker/settings.webp', width: 1280, mode: 'lossy', quality: 90 },

  // Steam Idler — drop the captures in as sti-*.png and re-run; missing sources are skipped.
  { src: 'sti-app.png', out: 'projects/steam-idler/app.webp', width: 1600, mode: 'lossy', quality: 90 },
  { src: 'sti-games.png', out: 'projects/steam-idler/games.webp', width: 1600, mode: 'lossy', quality: 90 },
  { src: 'sti-achievements.png', out: 'projects/steam-idler/achievements.webp', width: 1600, mode: 'lossy', quality: 90 },
  { src: 'sti-idle.png', out: 'projects/steam-idler/idle.webp', width: 1600, mode: 'lossy', quality: 90 },
  { src: 'sti-settings.png', out: 'projects/steam-idler/settings.webp', width: 1600, mode: 'lossy', quality: 90 },

  // GTA Academy — in-game captures, one per category. The site's hero art is a third-party
  // illustration and is deliberately not republished here.
  { src: 'gta-cars.png', out: 'projects/gta-academy/cars.webp', width: 1456, mode: 'lossy', quality: 78 },
  { src: 'gta-helicopters.png', out: 'projects/gta-academy/helicopters.webp', width: 1456, mode: 'lossy', quality: 78 },
  { src: 'gta-planes.png', out: 'projects/gta-academy/planes.webp', width: 1456, mode: 'lossy', quality: 78 },
  { src: 'gta-special.png', out: 'projects/gta-academy/special.webp', width: 1456, mode: 'lossy', quality: 78 },

  // An1me Speed Control — the popup is cropped out of the store art so the shot is the UI alone.
  { src: 'asc-popup.png', out: 'projects/an1me-speed-control/popup.webp', width: 645, mode: 'lossy', quality: 90 },
  { src: 'asc-context.png', out: 'projects/an1me-speed-control/context.webp', width: 1280, mode: 'lossy', quality: 86 },

  // ReleaseFlow — drop the captures in as gbr-*.png and re-run; missing sources are skipped.
  { src: 'gbr-create.png', out: 'projects/github-build-release/create.webp', width: 1462, mode: 'lossy', quality: 88 },
  { src: 'gbr-empty.png', out: 'projects/github-build-release/empty.webp', width: 1486, mode: 'lossy', quality: 88 },
  { src: 'gbr-ai-notes.png', out: 'projects/github-build-release/ai-notes.webp', width: 1003, mode: 'lossy', quality: 90 },
  { src: 'gbr-history.png', out: 'projects/github-build-release/history.webp', width: 1132, mode: 'lossy', quality: 90 },

  // BetterDiscord — drop the captures in as bdt-*.png and re-run; missing sources are skipped.
  { src: 'bdt-simpletheme-v3.png', out: 'projects/betterdiscord-themes/simpletheme-v3.webp', width: 1600, mode: 'lossy', quality: 86 },
  { src: 'bdt-folder-theme.png', out: 'projects/betterdiscord-themes/folder-theme.webp', width: 1600, mode: 'lossy', quality: 86 },
  { src: 'bdt-plugins.png', out: 'projects/betterdiscord-themes/plugins.webp', width: 1200, mode: 'lossy', quality: 90 },

  // Backup Studio — drop the captures in as bks-*.png and re-run.
  { src: 'bks-home.png', out: 'projects/backup-studio/home.webp', width: 1476, mode: 'lossy', quality: 88 },
  { src: 'bks-backups.png', out: 'projects/backup-studio/backups.webp', width: 1891, mode: 'lossy', quality: 88 },

  // Pulse dashboard — drop the captures in as dbd-*.png and re-run.
  { src: 'dbd-dashboard.png', out: 'projects/discord-bot-dashboard/dashboard.webp', width: 2000, mode: 'lossy', quality: 88 },
  { src: 'dbd-permissions.png', out: 'projects/discord-bot-dashboard/permissions.webp', width: 2000, mode: 'lossy', quality: 88 },
  { src: 'dbd-commands.png', out: 'projects/discord-bot-dashboard/commands.webp', width: 900, mode: 'lossy', quality: 90 },

  // AutoClicker — drop the capture in as acl-app.png and re-run.
  { src: 'acl-app.png', out: 'projects/autoclicker-premium/app.webp', width: 1252, mode: 'lossy', quality: 90 },
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
console.log(`\nsources in tools/assets-src/ (never shipped): ${sources.length} files`)
