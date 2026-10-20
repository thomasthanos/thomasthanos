import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Boxes,
  Cable,
  CloudOff,
  Database,
  Download,
  ExternalLink,
  Github,
  LockKeyhole,
  Paintbrush,
  RefreshCw,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/make-your-life-easier.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

interface CaseSectionProps {
  id: string
  label: string
  aside?: ReactNode
  children: ReactNode
  className?: string
}

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Windows toolkit · v10.0.6',
    tagline: 'Built because repetitive clicking is stupid.',
    source: 'View source',
    download: 'Download MYLE',
    verified: 'Historical v4.6.7 interface · before the Tauri redesign',
    metrics: 'By the numbers',
    features: 'What it actually does',
    featuresNote: 'One window. Fewer chores.',
    architecture: 'Under the hood',
    architectureNote: 'Local first. Privilege only when a task needs it.',
    renderer: 'Svelte frontend',
    rendererNote: 'Svelte 5 · TypeScript · WebView2',
    bridge: 'Tauri commands',
    bridgeNote: 'Typed frontend calls',
    main: 'Rust backend',
    mainNote: 'Validates native operations',
    local: 'Local files',
    localNote: 'Settings + encrypted vault',
    windows: 'Windows tools',
    windowsNote: 'winget · SFC · DISM · PowerShell',
    updater: 'Updater',
    updaterNote: 'R2 · SHA-256 · GitHub fallback',
    cloud: 'Optional sync',
    cloudNote: 'Account + encrypted vault sync',
    challenges: 'Engineering challenges',
    evolution: 'How it evolved',
    evolutionNote: 'From the Electron generations to the current Tauri, Svelte and Rust rewrite.',
    gallery: 'Earlier interface',
    galleryNote: 'Archived v4.6.7 captures, retained to show the previous Electron generation. Current downloads use the redesigned Tauri app.',
    installerShot: 'The installer catalog in the earlier v4.6.7 Electron build.',
    cleanerShot: 'The system cleaner in the earlier v4.6.7 Electron build.',
    privacy: 'Privacy & security',
    privacyLine: 'Your PC is not my playground.',
    lessons: 'What shipping it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    more: 'More projects',
    previous: 'Previous project',
    next: 'Next project',
    notes: [
      'one place for the PC chores',
      'if it needs admin, it asks',
      'new runtime. same hatred of chores.',
      'UAC: the Windows jump scare.',
      'Electron → Tauri. character development.',
      'dark because bright software hurts',
      "0 telemetry. I genuinely don't care what you clicked.",
      'Still learning. Always shipping. :)',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Windows toolkit · v10.0.6',
    tagline: 'Φτιάχτηκε γιατί τα επαναλαμβανόμενα κλικ είναι χαζά.',
    source: 'Δες τον κώδικα',
    download: 'Κατέβασε το MYLE',
    verified: 'Ιστορικό UI της v4.6.7 · πριν το Tauri redesign',
    metrics: 'Με αριθμούς',
    features: 'Τι κάνει πραγματικά',
    featuresNote: 'Ένα παράθυρο. Λιγότερες αγγαρείες.',
    architecture: 'Κάτω από το καπό',
    architectureNote: 'Local-first. Δικαιώματα μόνο όταν τα χρειάζεται η εργασία.',
    renderer: 'Svelte frontend',
    rendererNote: 'Svelte 5 · TypeScript · WebView2',
    bridge: 'Tauri commands',
    bridgeNote: 'Typed frontend calls',
    main: 'Rust backend',
    mainNote: 'Ελέγχει τις native λειτουργίες',
    local: 'Τοπικά αρχεία',
    localNote: 'Settings + κρυπτογραφημένο vault',
    windows: 'Windows tools',
    windowsNote: 'winget · SFC · DISM · PowerShell',
    updater: 'Updater',
    updaterNote: 'R2 · SHA-256 · GitHub fallback',
    cloud: 'Προαιρετικό sync',
    cloudNote: 'Λογαριασμός + encrypted vault sync',
    challenges: 'Engineering challenges',
    evolution: 'Πώς εξελίχθηκε',
    evolutionNote: 'Από τις γενιές Electron στο σημερινό rewrite με Tauri, Svelte και Rust.',
    gallery: 'Παλαιότερο interface',
    galleryNote: 'Αρχειακά captures της v4.6.7 από την προηγούμενη γενιά Electron. Τα σημερινά downloads χρησιμοποιούν τη νέα εφαρμογή Tauri.',
    installerShot: 'Ο installer κατάλογος στο παλαιότερο Electron build v4.6.7.',
    cleanerShot: 'Το system cleaner στο παλαιότερο Electron build v4.6.7.',
    privacy: 'Privacy & security',
    privacyLine: 'Ο υπολογιστής σου δεν είναι η παιδική μου χαρά.',
    lessons: 'Τι μου έμαθε το shipping',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    more: 'Περισσότερα projects',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    notes: [
      'ένα μέρος για τις αγγαρείες του PC',
      'αν θέλει admin, το ζητάει',
      'νέο runtime. οι ίδιες αγγαρείες.',
      'UAC: το jump scare των Windows.',
      'Electron → Tauri. character development.',
      'dark γιατί το φωτεινό software πονάει',
      '0 telemetry. πραγματικά δε με νοιάζει τι πάτησες.',
      'Ακόμα μαθαίνω. Πάντα shipάρω. :)',
    ],
  },
} as const

const statData = {
  en: [['10.0.6', 'latest release'], ['Tauri 2', 'native app shell'], ['Svelte 5', 'TypeScript frontend'], ['Rust', 'native backend'], ['SHA-256', 'verified updates'], ['3', 'GitHub stars · 20 Oct 2026']],
  el: [['10.0.6', 'νεότερη έκδοση'], ['Tauri 2', 'native app shell'], ['Svelte 5', 'TypeScript frontend'], ['Rust', 'native backend'], ['SHA-256', 'επαληθευμένα updates'], ['3', 'GitHub stars · 20 Οκτ 2026']],
} as const

const evolution = {
  en: [
    ['v2 · 2025', 'First tagged generation', 'The product shape was already real: one app gathering Windows chores that used to live in separate scripts and pages.'],
    ['v3 · 2025', 'The monolith came apart', 'The renderer and main process moved into modules, CSP and IPC boundaries got stricter, and updates became a product feature instead of an afterthought.'],
    ['v10 · 2026', 'Redesigned and recoded', 'Electron gave way to Tauri 2, Svelte 5 and Rust. The current toolkit adds game-save backups, an encrypted vault with browser integration, and MYLE Passwords builds for Android and iPhone.'],
  ],
  el: [
    ['v2 · 2025', 'Η πρώτη tagged γενιά', 'Το προϊόν είχε ήδη μορφή: μία εφαρμογή που μαζεύει Windows αγγαρείες οι οποίες πριν ζούσαν σε ξεχωριστά scripts και σελίδες.'],
    ['v3 · 2025', 'Ο μονόλιθος έσπασε', 'Renderer και main process έγιναν modules, τα CSP και IPC όρια έγιναν αυστηρότερα και το update έγινε product feature αντί για υποσημείωση.'],
    ['v10 · 2026', 'Redesign και recode', 'Το Electron έδωσε τη θέση του σε Tauri 2, Svelte 5 και Rust. Το σημερινό toolkit περιλαμβάνει game-save backups, encrypted vault με browser integration και MYLE Passwords builds για Android και iPhone.'],
  ],
} as const

const featureIcons = [Download, Wrench, ShieldCheck, Boxes, CloudOff, RefreshCw]

function CaseSection({ id, label, aside, children, className = '' }: CaseSectionProps) {
  return (
    <section className={`myle-section ${className}`} aria-labelledby={id}>
      <div className="myle-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <div className="myle-section__aside">{aside}</div>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark = project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="myle-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

export function MakeYourLifeEasierCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  return (
    <div className="page myle" data-accent="lime">
      <div className="container myle__container cs-scope">
        <Link className="myle__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="myle-hero">
          <Reveal className="myle-hero__copy">
            <div className="myle-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="myle-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
            </div>
            <h1>{p.name}</h1>
            <p className="myle-hero__tagline">{c.tagline}</p>
            <p className="myle-hero__summary">{tr(p.summary)}</p>
            <div className="myle-hero__actions">
              <a className="btn btn--primary" href={p.repo} {...external}>
                <Github aria-hidden="true" />
                {c.source}
              </a>
              {p.demo && (
                <a className="btn btn--outline" href={p.demo} {...external}>
                  <Download aria-hidden="true" /> {c.download}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal className="myle-window" delay={90}>
            <div className="myle-window__bar" aria-hidden="true">
              <span><i /> Make Your Life Easier</span>
              <span>—　□　×</span>
            </div>
            <img
              src="/assets/projects/make-your-life-easier/app-installer.webp"
              alt={c.installerShot}
              width="1100"
              height="750"
              fetchPriority="high"
              decoding="async"
            />
            <p className="myle-window__caption">{c.verified}</p>
          </Reveal>

          <span className="cs-note cs-note--to-r myle-note myle-note--hero">{c.notes[0]}</span>
          <span className="cs-note cs-note--to-l myle-note myle-note--admin">{c.notes[1]}</span>
        </header>

        <CaseSection id="myle-metrics" label={c.metrics} className="myle-section--tight">
          <dl className="myle-stats">
            {statData[lang].map(([value, label]) => (
              <div className="myle-stat" key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
          <span className="cs-note cs-note--to-l myle-note myle-note--metrics">{c.notes[2]}</span>
        </CaseSection>

        {p.features && (
          <CaseSection id="myle-features" label={c.features} aside={c.featuresNote}>
            <SwipeHint />
            <ul className="myle-features">
              {p.features.map((feature, index) => {
                const Icon = featureIcons[index] ?? Boxes
                return (
                  <li key={feature.title.en}>
                    <Reveal className="myle-feature" delay={Math.min(index, 5) * 45}>
                      <div className="myle-feature__top">
                        <Icon aria-hidden="true" />
                        <span>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3>{tr(feature.title)}</h3>
                      <p>{tr(feature.body)}</p>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </CaseSection>
        )}

        <CaseSection id="myle-architecture" label={c.architecture} aside={c.architectureNote} className="myle-section--note-space">
          <div className="myle-engineering">
            <Reveal className="myle-arch">
              <div className="myle-arch__node myle-arch__node--renderer">
                <AppWindow aria-hidden="true" />
                <strong>{c.renderer}</strong>
                <span>{c.rendererNote}</span>
              </div>
              <div className="myle-arch__route" aria-hidden="true"><span>IPC</span></div>
              <div className="myle-arch__node myle-arch__node--bridge">
                <Cable aria-hidden="true" />
                <strong>{c.bridge}</strong>
                <span>{c.bridgeNote}</span>
              </div>
              <div className="myle-arch__route" aria-hidden="true"><span>invoke</span></div>
              <div className="myle-arch__node myle-arch__node--main">
                <LockKeyhole aria-hidden="true" />
                <strong>{c.main}</strong>
                <span>{c.mainNote}</span>
              </div>
              <div className="myle-arch__branches" aria-hidden="true" />
              <div className="myle-arch__leaves">
                <div className="myle-arch__node">
                  <Database aria-hidden="true" /><strong>{c.local}</strong><span>{c.localNote}</span>
                </div>
                <div className="myle-arch__node">
                  <Wrench aria-hidden="true" /><strong>{c.windows}</strong><span>{c.windowsNote}</span>
                </div>
                <div className="myle-arch__node">
                  <RefreshCw aria-hidden="true" /><strong>{c.updater}</strong><span>{c.updaterNote}</span>
                </div>
                <div className="myle-arch__node">
                  <CloudOff aria-hidden="true" /><strong>{c.cloud}</strong><span>{c.cloudNote}</span>
                </div>
              </div>
            </Reveal>

            {p.challenges && (
              <div className="myle-challenges-wrap" aria-labelledby="myle-challenges-title">
                <div className="myle-challenges__head">
                  <h3 id="myle-challenges-title">{c.challenges}</h3>
                  <SwipeHint />
                </div>
                <div className="myle-challenges">
                  {p.challenges.map((challenge, index) => (
                    <Reveal className="myle-challenge" delay={index * 45} key={challenge.title.en}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{tr(challenge.title)}</h4>
                        <p>{tr(challenge.body)}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span className="cs-note cs-note--to-r myle-note myle-note--ipc">{c.notes[3]}</span>
        </CaseSection>

        <CaseSection id="myle-evolution" label={c.evolution} aside={c.evolutionNote} className="myle-section--note-space">
          <SwipeHint />
          <ol className="myle-evolution">
            {evolution[lang].map(([version, title, body], index) => (
              <li key={version}>
                <Reveal className="myle-era" delay={index * 60}>
                  <span className="myle-era__version">{version}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <span className="cs-note cs-note--to-l myle-note myle-note--evolution">{c.notes[4]}</span>
        </CaseSection>

        <CaseSection id="myle-gallery" label={c.gallery} aside={c.galleryNote} className="myle-section--gallery myle-section--note-space">
          <SwipeHint />
          <div className="myle-gallery">
            <figure className="myle-shot">
              <img
                src="/assets/projects/make-your-life-easier/app-installer.webp"
                alt={c.installerShot}
                width="1100"
                height="750"
                loading="lazy"
                decoding="async"
              />
              <figcaption><span>01</span>{c.installerShot}</figcaption>
            </figure>
            <figure className="myle-shot">
              <img
                src="/assets/projects/make-your-life-easier/app-cleaner.webp"
                alt={c.cleanerShot}
                width="1100"
                height="750"
                loading="lazy"
                decoding="async"
              />
              <figcaption><span>02</span>{c.cleanerShot}</figcaption>
            </figure>
          </div>
          <span className="cs-note cs-note--to-l myle-note myle-note--gallery">{c.notes[5]}</span>
        </CaseSection>

        <div className="myle-endgrid">
          {p.privacy && (
            <CaseSection id="myle-privacy" label={c.privacy} className="myle-section--panel myle-section--note-space">
              <Reveal className="myle-privacy">
                <ShieldCheck aria-hidden="true" />
                <p>{tr(p.privacy)}</p>
                <strong>{c.privacyLine}</strong>
              </Reveal>
              <span className="cs-note cs-note--to-r myle-note myle-note--privacy">{c.notes[6]}</span>
            </CaseSection>
          )}

          {p.lessons && (
            <CaseSection id="myle-lessons" label={c.lessons} className="myle-section--panel myle-section--lessons">
              <SwipeHint />
              <ul className="myle-lessons">
                {trList(p.lessons).map((lesson) => <li key={lesson}>{lesson}</li>)}
              </ul>
              <span className="cs-note cs-note--to-u myle-note myle-note--ship">{c.notes[7]}</span>
            </CaseSection>
          )}
        </div>

        <CaseSection id="myle-stack" label={c.stack} className="myle-section--links">
          <div className="myle-stack">
            {p.tech.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="myle-links" aria-label={c.links}>
            <a className="btn btn--outline btn--path" href={p.repo} {...external}>
              <Github aria-hidden="true" /> {p.repoLabel} <ExternalLink aria-hidden="true" />
            </a>
            <Link className="btn btn--ghost" to="/projects">
              <Paintbrush aria-hidden="true" /> {c.more}
            </Link>
          </div>
        </CaseSection>

        {near && (
          <nav className="myle-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="myle-nav__copy">
                <span className="myle-nav__label"><ArrowLeft aria-hidden="true" /> {c.previous}</span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="myle-nav__brand" aria-hidden="true"><Pumpkin size={64} mood="wide" /></span>
            <Link className="myle-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="myle-nav__copy">
                <span className="myle-nav__label">{c.next} <ArrowRight aria-hidden="true" /></span>
                <strong>{near.next.name}</strong>
                <small>{tr(near.next.short)}</small>
              </span>
              <ProjectThumb project={near.next} />
            </Link>
          </nav>
        )}
      </div>
    </div>
  )
}
