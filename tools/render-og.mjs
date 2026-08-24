/**
 * Rasterises tools/og-card.html to public/og.png using whichever Chromium is
 * already installed.
 *
 * Favicons and app icons are not made here — they come straight from the
 * artwork via tools/gen-icons.mjs, which needs no browser.
 *
 * Run after editing the template:  npm run gen:og
 * The PNG is committed, so this is not part of the normal build.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

const browser = CANDIDATES.find((p) => existsSync(p))
if (!browser) {
  console.error(
    'No Chromium found. Set CHROME_PATH to a Chrome or Edge executable.',
  )
  process.exit(1)
}

const JOBS = [{ src: 'tools/og-card.html', out: 'public/og.png', w: 1200, h: 630 }]

for (const job of JOBS) {
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${job.w},${job.h}`,
    `--screenshot=${join(root, job.out)}`,
    '--allow-file-access-from-files',
    '--virtual-time-budget=4000',
    `file:///${join(root, job.src).replace(/\\/g, '/')}`,
  ])
  console.log(`${job.out} — ${job.w}×${job.h}`)
}
