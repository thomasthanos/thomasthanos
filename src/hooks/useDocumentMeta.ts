import { useEffect } from 'react'
import { site } from '../data/site'

interface Meta {
  title: string
  description: string
  /** Route path, e.g. "/projects/steam-idler". */
  path: string
}

function setTag(
  selector: string,
  create: () => HTMLElement,
  apply: (el: HTMLElement) => void,
) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  apply(el)
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  setTag(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement('meta')
      el.setAttribute(attr, key)
      return el
    },
    (el) => el.setAttribute('content', content),
  )
}

/**
 * Per-route document metadata. There is no SSR here, so crawlers that execute
 * JS get the right tags and the static index.html carries a sensible default.
 */
export function useDocumentMeta({ title, description, path }: Meta) {
  useEffect(() => {
    const full = title === site.name ? title : `${title} — ${site.name}`
    const url = `${site.url}${path === '/' ? '' : path}`

    document.title = full
    setMeta('name', 'description', description)

    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', path.startsWith('/projects/') ? 'article' : 'website')

    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)

    setTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        return el
      },
      (el) => el.setAttribute('href', url),
    )
  }, [title, description, path])
}
