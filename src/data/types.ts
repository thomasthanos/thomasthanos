/** Every user-facing string in the data layer carries both locales. */
export type Locale = 'en' | 'el'

/** A localized string. */
export type L = Record<Locale, string>

/** A localized list of strings. */
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

/** Drives the `data-accent` attribute, which swaps `--accent` in tokens.css. */
export type Accent = 'lime' | 'violet' | 'blue' | 'orange' | 'pink'

export interface Metric {
  /** Short, factual. e.g. "8K+" */
  value: string
  label: L
}

export interface Entry {
  title: L
  body: L
}

/** One horizontal band of the architecture diagram. */
export interface ArchLayer {
  name: L
  /** Real module / package names — never invented. */
  items: string[]
  note?: L
}

/** A slot for a real screenshot. Empty by default; drop files in /public/shots. */
export interface Shot {
  src: string
  caption: L
  /** Intrinsic size so the browser reserves space and never shifts layout. */
  width: number
  height: number
}

/**
 * A schematic of the product's actual interface, drawn from data rather than
 * bitmap screenshots. Honest illustration, not a fake screenshot.
 */
export interface Sketch {
  /** Window chrome title. */
  title: string
  kind: 'panel' | 'terminal' | 'browser' | 'grid'
  /** Rows rendered inside the frame. */
  rows: SketchRow[]
}

export interface SketchRow {
  label: string
  /** Right-hand value/state. */
  value?: string
  /** Renders the row in the accent colour. */
  hot?: boolean
  /** 0–100 progress bar. */
  bar?: number
}

export interface Project {
  slug: string
  name: string
  /** Real internal codename, when the repo has one worth showing. */
  codename?: string
  category: Category
  /** Additional filter buckets this project also belongs to. */
  alsoIn?: Category[]
  status: Status
  accent: Accent
  /** Present = appears on the homepage rail, lower number sorts first. */
  featured?: number
  /** Present = appears on /labs. */
  lab?: { badge: L; note: L }
  /** Year or range, as displayed. */
  year: string
  version?: string
  repo: string
  /** Shown on the repo button, e.g. "thomasthanos/steam-idler". */
  repoLabel: string
  /** Path inside the repo, when the project is a subfolder. */
  repoPath?: string
  demo?: string
  tech: string[]
  metrics?: Metric[]

  /** One or two sentences. Used on cards. */
  short: L
  /** The lead paragraph of the detail page. */
  summary: L

  // --- Case study (all optional; the page renders only what exists) --------
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
