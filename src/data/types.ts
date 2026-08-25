export type Locale = 'en' | 'el'

export type L = Record<Locale, string>

export type LList = Record<Locale, string[]>

export type Category =
  | 'browser'
  | 'windows'
  | 'desktop'
  | 'automation'
  | 'discord'
  | 'web'
  | 'labs'

export type Status =
  | 'active'
  | 'maintained'
  | 'shipped'
  | 'experiment'
  | 'legacy'

export type Accent = 'lime' | 'violet' | 'blue' | 'orange' | 'pink'

export interface Metric {
  value: string
  label: L
}

export interface Entry {
  title: L
  body: L
}

export interface ArchLayer {
  name: L
  items: string[]
  note?: L
}

export interface Shot {
  src: string
  caption: L
  width: number
  height: number
}

export interface Sketch {
  title: string
  kind: 'panel' | 'terminal' | 'browser' | 'grid'
  rows: SketchRow[]
}

export interface SketchRow {
  label: string
  value?: string
  hot?: boolean
  bar?: number
}

export interface Project {
  slug: string
  name: string
  codename?: string
  category: Category
  alsoIn?: Category[]
  status: Status
  accent: Accent
  featured?: number
  lab?: { badge: L; note: L }
  year: string
  version?: string
  repo: string
  repoLabel: string
  repoPath?: string
  demo?: string
  tech: string[]
  metrics?: Metric[]

  short: L
  summary: L

  why?: L
  what?: L
  features?: Entry[]
  challenges?: Entry[]
  architecture?: ArchLayer[]
  privacy?: L
  impact?: L
  lessons?: LList
  disclaimer?: L
  sketch?: Sketch
  shots?: Shot[]
}
