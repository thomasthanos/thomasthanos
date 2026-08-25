import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = process.env.SITE_ORIGIN ?? 'https://me.thomast.uk'

const STATIC_ROUTES = ['/', '/projects', '/stack', '/labs', '/about', '/contact']

function projectSlugs() {
  const dir = join(root, 'src/data/projects')
  const slugs = []
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue
    const src = readFileSync(join(dir, file), 'utf8')
    for (const m of src.matchAll(/^\s*slug:\s*'([a-z0-9-]+)',/gm)) slugs.push(m[1])
  }
  if (slugs.length === 0) {
    throw new Error('gen-static: found no project slugs — did the data files move?')
  }
  return [...new Set(slugs)]
}

const slugs = projectSlugs()
const today = new Date().toISOString().slice(0, 10)

const urls = [
  ...STATIC_ROUTES.map((path) => ({
    path,
    priority: path === '/' ? '1.0' : '0.8',
  })),
  ...slugs.map((slug) => ({ path: `/projects/${slug}`, priority: '0.6' })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ path, priority }) => `  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), sitemap)
console.log(`sitemap.xml — ${urls.length} urls (${slugs.length} projects)`)

const indexHtml = join(root, 'dist/index.html')
if (existsSync(indexHtml)) {
  writeFileSync(join(root, 'dist/404.html'), readFileSync(indexHtml))
  console.log('404.html — SPA fallback written')
}
