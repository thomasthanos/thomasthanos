/**
 * Mynerve is used for exactly two margin notes, but the shipped Latin + Greek
 * files come to 74 KB. This cuts them to ~28 KB by keeping only:
 *
 *   1. every character that actually appears inside an <Annotation> in src/,
 *   2. plus a safety set — lowercase Latin, lowercase Greek with accents, and
 *      common punctuation — so editing an annotation does not silently drop
 *      glyphs before anyone remembers to re-run this.
 *
 * Output is committed, so this is a manual step, not part of the build:
 *   npm run gen:font
 *
 * Uppercase Latin and digits are included because translated asides can contain
 * standalone "I" and project counts even when most handwriting is lowercase.
 */
import subsetFont from 'subset-font'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const range = (from, to) => {
  let s = ''
  for (let c = from; c <= to; c += 1) s += String.fromCodePoint(c)
  return s
}

const SAFETY =
  range(0x41, 0x5a) + // A–Z
  range(0x61, 0x7a) + // a–z
  range(0x30, 0x39) + // 0–9
  range(0x3b1, 0x3c9) + // α–ω
  'άέήίόύώϊϋΐΰς' + // accented Greek + final sigma
  " ,.!?'’-–—«»…·"

/** Every character in the notes data, plus any literal <Annotation> child. */
function charsFromSource() {
  let found = ''
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) {
        walk(p)
        continue
      }
      if (!['.tsx', '.ts'].includes(extname(p))) continue
      const src = readFileSync(p, 'utf8')
      for (const m of src.matchAll(/<Annotation[^>]*>([\s\S]*?)<\/Annotation>/g)) {
        found += m[1].replace(/\{[^}]*\}/g, '')
      }
    }
  }
  walk(join(root, 'src'))
  return found
}

const chars = [...new Set(SAFETY + charsFromSource())].join('')

const FILES = [
  {
    src: 'node_modules/@fontsource/mynerve/files/mynerve-latin-400-normal.woff2',
    out: 'mynerve-latin.woff2',
  },
  {
    src: 'node_modules/@fontsource/mynerve/files/mynerve-greek-400-normal.woff2',
    out: 'mynerve-greek.woff2',
  },
]

const dir = join(root, 'src/assets/fonts')
mkdirSync(dir, { recursive: true })

let before = 0
let after = 0
for (const f of FILES) {
  const full = readFileSync(join(root, f.src))
  const out = await subsetFont(full, chars, { targetFormat: 'woff2' })
  writeFileSync(join(dir, f.out), out)
  before += full.length
  after += out.length
  console.log(`${f.out.padEnd(22)} ${(out.length / 1024).toFixed(1)} KB`)
}

console.log(
  `total ${(after / 1024).toFixed(1)} KB (was ${(before / 1024).toFixed(1)} KB) ` +
    `— ${chars.length} glyphs`,
)
