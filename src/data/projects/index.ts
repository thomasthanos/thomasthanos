import type { Category, Project } from '@/data/types'
import { flagship } from '@/data/projects/flagship'
import { more } from '@/data/projects/more'

export const projects: Project[] = [...flagship, ...more]

export const featuredProjects: Project[] = projects
  .filter((p): p is Project & { featured: number } => p.featured !== undefined)
  .sort((a, b) => a.featured - b.featured)

export const labProjects: Project[] = projects.filter((p) => p.lab)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function inCategory(project: Project, category: Category): boolean {
  if (category === 'labs') return Boolean(project.lab)
  return project.category === category || Boolean(project.alsoIn?.includes(category))
}

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

export function neighbours(slug: string): { prev: Project; next: Project } | null {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1 || projects.length < 2) return null
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  return { prev, next }
}
