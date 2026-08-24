import type { Category, Project } from '../types'
import { flagship } from './flagship'
import { more } from './more'

export const projects: Project[] = [...flagship, ...more]

/** Homepage rail — ordered by the `featured` weight. */
export const featuredProjects: Project[] = projects
  .filter((p): p is Project & { featured: number } => p.featured !== undefined)
  .sort((a, b) => a.featured - b.featured)

/** /labs — the smaller, weirder, older half. */
export const labProjects: Project[] = projects.filter((p) => p.lab)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** True when a project belongs in a given filter bucket. */
export function inCategory(project: Project, category: Category): boolean {
  if (category === 'labs') return Boolean(project.lab)
  return project.category === category || Boolean(project.alsoIn?.includes(category))
}

/** Filter buckets that actually contain something, in display order. */
const CATEGORY_ORDER: Category[] = [
  'browser',
  'windows',
  'desktop',
  'automation',
  'discord',
  'web',
  'labs',
]

export const activeCategories: Category[] = CATEGORY_ORDER.filter((c) =>
  projects.some((p) => inCategory(p, c)),
)

export function countIn(category: Category): number {
  return projects.filter((p) => inCategory(p, category)).length
}

/**
 * Previous/next within the full list, so a detail page can offer somewhere
 * to go that is not the back button.
 */
export function neighbours(slug: string): { prev: Project; next: Project } | null {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1 || projects.length < 2) return null
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  return { prev, next }
}
