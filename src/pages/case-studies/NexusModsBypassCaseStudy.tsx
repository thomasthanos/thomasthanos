import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Ban,
  Check,
  ExternalLink,
  EyeOff,
  Flame,
  Gauge,
  Github,
  Globe,
  History,
  Languages,
  ListOrdered,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/nexusmods-bypass.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Browser extension · v2.4.4',
    tagline: '200 mods. One button. Sanity preserved.',
    source: 'View source',
    install: 'Extensions page',
    schematic: 'Interface schematic — drawn from the extension’s own queue data, not a screenshot',

    metrics: 'By the numbers',
    metricsNote: 'Chrome Web Store, a normal week.',

    maths: 'The maths was insulting',
    mathsNote: 'The wait was never the problem. The multiplication was.',
    mathsWhy: 'The friction',
    mathsWhat: 'The automation',
    sum: [
      ['200', 'requirement screens'],
      ['200', 'five-second timers'],
      ['200', 'download clicks'],
    ],
    sumTotal: 'one evening',
    sumTotalNote: 'gone',

    queue: 'How the queue works',
    queueNote: 'One press. The background worker does the rest, and survives you navigating away.',
    steps: [
      ['Detect', 'A collection page is recognised and its revision read.'],
      ['Build', 'Every mod in the revision becomes a queue entry.'],
      ['Resolve', 'Each entry is turned into a real download link.'],
      ['Pace', 'A configurable pause keeps Nexus from throttling the session.'],
      ['Hand off', 'Send to Vortex, or download in the browser.'],
      ['Remember', 'Finished files are written to local history.'],
      ['Resume', 'An interrupted run picks up instead of starting over.'],
    ],

    features: 'What it actually does',
    featuresNote: 'Seven things, in rough order of how much they matter.',

    challenges: 'Engineering challenges',
    challengesNote: 'The parts that were genuinely hard.',

    architecture: 'Under the hood',
    architectureNote: 'Manifest V3. One host. No server anywhere in the picture.',

    privacy: 'Privacy',
    privacyLine: 'no cloud. no account. no nonsense.',
    granted: 'What it asks for',
    absent: 'What it deliberately does not',
    grantedItems: [
      ['storage', 'settings and download history, locally'],
      ['downloads', 'the browser download mode'],
      ['downloads.ui', 'un-hides the button for old profiles'],
      ['alarms', 'paces the queue between mods'],
      ['nexusmods.com', 'the only site it can read'],
    ],
    absentItems: [
      ['tabs', 'never reads your other tabs'],
      ['<all_urls>', 'no access to any other site'],
      ['remote code', 'everything ships in the package'],
      ['analytics', 'nothing is measured or sent'],
      ['account', 'there is nothing to sign in to'],
    ],

    origin: 'Where it came from',
    originNote: 'The repository history was squashed, so this is my account rather than a changelog.',
    story: [
      [
        'March 2026',
        'Borrowed, then outgrown',
        'It started from ideas in the Nexus No Wait++ userscript, which skipped the timer and little else. That was enough to prove the idea and not enough to use, so I started rebuilding it properly.',
      ],
      [
        'Step by step',
        'From workaround to tool',
        'Features went in one at a time: collection detection, a real queue, the pacing, local history, archived-file buttons. The wait bypass itself got rewritten until it stopped being the fragile part.',
      ],
      [
        'Now',
        '15K at peak, ~8.5K steady',
        'It peaked near fifteen thousand users and settles around eight and a half thousand in a normal week. No marketing, no post, no launch. People just kept installing it.',
      ],
    ],

    gallery: 'Real interface',
    galleryNote: 'Captured from v2.4.3 running in Chrome. No mockups, no device frames.',
    openShot: 'open full size',
    shotPrev: 'Previous screen',
    shotNext: 'Next screen',
    shotGo: 'Screen',
    shots: [
      'Before a run: 1,954 mods detected, Vortex or the browser, one button.',
      'Mid-run. Adaptive pacing, a live log, and an honest line about what the browser cannot see.',
      'Popup and settings. The controls people actually use, instant saves, queue pacing, and a bug report that copies the error out for you.',
    ],

    lessons: 'What shipping it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    more: 'More projects',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    notes: [
      'five seconds × 200. absolutely not.',
      'click once. leave.',
      'rate limits have feelings too.',
      'it remembers, because I won’t.',
      'Firefox made it weird.',
      '8K people also hated clicking.',
      'no cloud. no account. calm down.',
      'the timer started it.',
    ],
  },

  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Browser extension · v2.4.4',
    tagline: '200 mods. Ένα κουμπί. Τα νεύρα σου σώθηκαν.',
    source: 'Δες τον κώδικα',
    install: 'Σελίδα extensions',
    schematic: 'Σκίτσο interface — φτιαγμένο από τα δεδομένα της ίδιας της ουράς, όχι screenshot',

    metrics: 'Με αριθμούς',
    metricsNote: 'Chrome Web Store, μια κανονική εβδομάδα.',

    maths: 'Τα μαθηματικά ήταν προσβλητικά',
    mathsNote: 'Η αναμονή δεν ήταν ποτέ το πρόβλημα. Ο πολλαπλασιασμός ήταν.',
    mathsWhy: 'Η τριβή',
    mathsWhat: 'Η αυτοματοποίηση',
    sum: [
      ['200', 'requirement screens'],
      ['200', 'χρονόμετρα των πέντε δευτερολέπτων'],
      ['200', 'κλικ στο download'],
    ],
    sumTotal: 'ένα βράδυ',
    sumTotalNote: 'πάει',

    queue: 'Πώς δουλεύει η ουρά',
    queueNote: 'Ένα πάτημα. Τα υπόλοιπα τα κάνει το background worker, και επιβιώνει αν φύγεις από τη σελίδα.',
    steps: [
      ['Εντοπισμός', 'Αναγνωρίζει σελίδα collection και διαβάζει το revision.'],
      ['Ουρά', 'Κάθε mod του revision γίνεται εγγραφή στην ουρά.'],
      ['Ανάλυση', 'Κάθε εγγραφή γίνεται πραγματικό download link.'],
      ['Ρυθμός', 'Ρυθμιζόμενη παύση ώστε να μη σε κόψει το Nexus.'],
      ['Παράδοση', 'Send to Vortex, ή download μέσα από τον browser.'],
      ['Μνήμη', 'Ό,τι τελείωσε γράφεται σε τοπικό ιστορικό.'],
      ['Συνέχεια', 'Ένα run που κόπηκε συνεχίζει αντί να ξαναρχίζει.'],
    ],

    features: 'Τι κάνει πραγματικά',
    featuresNote: 'Εφτά πράγματα, χοντρικά κατά σειρά σημασίας.',

    challenges: 'Engineering challenges',
    challengesNote: 'Τα κομμάτια που ήταν όντως δύσκολα.',

    architecture: 'Κάτω από το καπό',
    architectureNote: 'Manifest V3. Ένας host. Κανένας server πουθενά στην εικόνα.',

    privacy: 'Ιδιωτικότητα',
    privacyLine: 'κανένα cloud. κανένας λογαριασμός. ηρέμησε.',
    granted: 'Τι ζητάει',
    absent: 'Τι επίτηδες δεν ζητάει',
    grantedItems: [
      ['storage', 'settings και ιστορικό, τοπικά'],
      ['downloads', 'το browser download mode'],
      ['downloads.ui', 'ξανα-εμφανίζει το κουμπί σε παλιά profiles'],
      ['alarms', 'ρυθμίζει τον ρυθμό ανάμεσα στα mods'],
      ['nexusmods.com', 'το μόνο site που μπορεί να διαβάσει'],
    ],
    absentItems: [
      ['tabs', 'δεν διαβάζει ποτέ τις άλλες σου καρτέλες'],
      ['<all_urls>', 'καμία πρόσβαση σε άλλο site'],
      ['remote code', 'τα πάντα έρχονται μέσα στο πακέτο'],
      ['analytics', 'τίποτα δεν μετριέται και τίποτα δεν φεύγει'],
      ['λογαριασμός', 'δεν υπάρχει πουθενά να συνδεθείς'],
    ],

    origin: 'Από πού ξεκίνησε',
    originNote: 'Το ιστορικό του repo έγινε squash, οπότε αυτά είναι δικά μου λόγια και όχι changelog.',
    story: [
      [
        'Μάρτιος 2026',
        'Δανεικό, και μετά ξεπερασμένο',
        'Ξεκίνησε από ιδέες του userscript Nexus No Wait++, που πηδούσε το χρονόμετρο και λίγα άλλα. Αρκετό για να αποδειχθεί η ιδέα, όχι αρκετό για να το χρησιμοποιείς — οπότε άρχισα να το ξαναχτίζω σωστά.',
      ],
      [
        'Βήμα βήμα',
        'Από workaround σε εργαλείο',
        'Τα features μπήκαν ένα ένα: εντοπισμός collection, κανονική ουρά, το pacing, τοπικό ιστορικό, κουμπιά στα archived. Το ίδιο το bypass ξαναγράφτηκε μέχρι να πάψει να είναι το εύθραυστο κομμάτι.',
      ],
      [
        'Σήμερα',
        '15K στο peak, ~8.5K σταθερά',
        'Έφτασε κοντά στις δεκαπέντε χιλιάδες χρήστες και κάθεται γύρω στις οκτώμισι χιλιάδες σε μια κανονική εβδομάδα. Μηδέν marketing, μηδέν post, μηδέν launch. Απλώς το κατέβαζε ο κόσμος.',
      ],
    ],

    gallery: 'Πραγματικό interface',
    galleryNote: 'Capture από την v2.4.3 σε Chrome. Χωρίς mockups, χωρίς πλαίσια συσκευών.',
    openShot: 'πλήρες μέγεθος',
    shotPrev: 'Προηγούμενη οθόνη',
    shotNext: 'Επόμενη οθόνη',
    shotGo: 'Οθόνη',
    shots: [
      'Πριν το run: 1.954 mods εντοπισμένα, Vortex ή browser, ένα κουμπί.',
      'Στη μέση του run. Adaptive pacing, ζωντανό log, και μια τίμια γραμμή για ό,τι δεν βλέπει ο browser.',
      'Popup και settings μαζί. Τα controls που όντως χρησιμοποιούνται, άμεσο save, queue pacing και bug report που αντιγράφει μόνο του το σφάλμα.',
    ],

    lessons: 'Τι μου έμαθε το shipping',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    more: 'Περισσότερα projects',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    notes: [
      'πέντε δευτερόλεπτα × 200. με τίποτα.',
      'πάτα μία. φύγε.',
      'και τα rate limits έχουν αισθήματα.',
      'το θυμάται αυτό, γιατί εγώ δεν πρόκειται.',
      'ο Firefox το έκανε περίεργο.',
      '8 χιλιάδες άτομα σιχάθηκαν κι αυτοί τα κλικ.',
      'κανένα cloud. κανένας λογαριασμός. ηρέμησε.',
      'το χρονόμετρο το ξεκίνησε.',
    ],
  },
} as const

const SHOTS = [
  { file: 'collection-idle', w: 1792, h: 726 },
  { file: 'collection-running', w: 1794, h: 805 },
  { file: 'popup-settings', w: 2730, h: 1536 },
] as const

const featureIcons = [ListOrdered, Gauge, History, Archive, EyeOff, Globe, Languages]

interface SectionProps {
  id: string
  label: string
  aside?: string
  children: React.ReactNode
  className?: string
}

function NxbSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`nxb-section ${className}`} aria-labelledby={id}>
      <div className="nxb-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="nxb-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark = project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="nxb-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

function Gallery({
  label,
  note,
  captions,
  openLabel,
  prevLabel,
  nextLabel,
  goLabel,
}: {
  label: string
  note: string
  captions: readonly string[]
  openLabel: string
  prevLabel: string
  nextLabel: string
  goLabel: string
}) {
  const [broken, setBroken] = useState<readonly string[]>([])
  const [active, setActive] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const dragRef = useRef({ pointerId: -1, startX: 0, startY: 0 })

  const shots = SHOTS.filter((s) => !broken.includes(s.file))

  useEffect(() => {
    if (!expanded) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [expanded])

  useEffect(() => {
    SHOTS.slice(1).forEach(({ file }) => {
      const image = new Image()
      image.src = `${import.meta.env.BASE_URL}assets/projects/nexusmods-bypass/${file}.webp`
    })
  }, [])

  if (shots.length === 0) return null

  const index = Math.min(active, shots.length - 1)
  const shot = shots[index]
  const shotNumber = SHOTS.indexOf(shot)

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, shots.length - 1))
    if (clamped === index) return
    setActive(clamped)
    setDragX(0)
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || event.pointerId !== dragRef.current.pointerId) return
    const deltaX = event.clientX - dragRef.current.startX
    const deltaY = event.clientY - dragRef.current.startY
    if (Math.abs(deltaY) > Math.abs(deltaX)) return

    const atStart = index === 0 && deltaX > 0
    const atEnd = index === shots.length - 1 && deltaX < 0
    setDragX((atStart || atEnd ? 0.08 : 0.18) * deltaX)
  }

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    if (event.pointerId !== dragRef.current.pointerId) return
    const deltaX = event.clientX - dragRef.current.startX
    const deltaY = event.clientY - dragRef.current.startY
    const threshold = Math.min(72, event.currentTarget.clientWidth * 0.12)

    const target = Math.max(0, Math.min(index + (deltaX < 0 ? 1 : -1), shots.length - 1))
    const shouldMove =
      !cancelled &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) >= threshold &&
      target !== index

    if (shouldMove) {
      setActive(target)
      setDragX(0)
    } else {
      setDragX(0)
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragRef.current.pointerId = -1
    setDragging(false)
  }

  return (
    <NxbSection id="nxb-gallery" label={label} aside={note} className="nxb-section--gallery">
      <div
        className="nxb-carousel-shell"
      >
        <SwipeHint className="nxb-carousel__swipe" />
        <div className="nxb-carousel" role="group" aria-roledescription="carousel" aria-label={label}>
          <div
            className={`nxb-carousel__track${dragging ? ' is-dragging' : ''}`}
            style={{ '--nxb-drag-x': `${dragX}px` } as React.CSSProperties}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => finishDrag(event)}
            onPointerCancel={(event) => finishDrag(event, true)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') goTo(index - 1)
              if (event.key === 'ArrowRight') goTo(index + 1)
            }}
            tabIndex={0}
            aria-live="polite"
          >
            <figure className="nxb-slide" key={shot.file} data-shot={shot.file}>
              <img
                src={`${import.meta.env.BASE_URL}assets/projects/nexusmods-bypass/${shot.file}.webp`}
                alt={captions[shotNumber]}
                width={shot.w}
                height={shot.h}
                loading={shotNumber === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
                onError={() => setBroken((b) => [...b, shot.file])}
                onLoad={(e) =>
                  e.currentTarget.naturalWidth === 0 &&
                  setBroken((b) => [...b, shot.file])
                }
              />
            </figure>
          </div>

          <button
            type="button"
            className="nxb-carousel__arrow nxb-carousel__arrow--prev"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={prevLabel}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="nxb-carousel__arrow nxb-carousel__arrow--next"
            onClick={() => goTo(index + 1)}
            disabled={index === shots.length - 1}
            aria-label={nextLabel}
          >
            <ArrowRight aria-hidden="true" />
          </button>

          <button
            type="button"
            className="nxb-carousel__open"
            onClick={() => setExpanded(true)}
          >
            {openLabel}
          </button>
        </div>

        <div className="nxb-carousel__foot">
          <p className="nxb-carousel__caption">
            <span>{String(shotNumber + 1).padStart(2, '0')}</span>
            {captions[shotNumber]}
          </p>
          <div className="nxb-dots">
            {shots.map((item, i) => (
              <button
                type="button"
                key={item.file}
                className={i === index ? 'is-on' : undefined}
                onClick={() => goTo(i)}
                aria-label={`${goLabel} ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {expanded && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="nxb-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={captions[shotNumber]}
            onClick={(event) => event.target === event.currentTarget && setExpanded(false)}
          >
            <button
              type="button"
              className="nxb-lightbox__close"
              onClick={() => setExpanded(false)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={`${import.meta.env.BASE_URL}assets/projects/nexusmods-bypass/${shot.file}.webp`}
              alt={captions[shotNumber]}
              width={shot.w}
              height={shot.h}
            />
          </div>,
          document.body,
        )}
    </NxbSection>
  )
}

export function NexusModsBypassCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  return (
    <div className="page nxb" data-accent="lime">
      <div className="container nxb__container cs-scope">
        <Link className="nxb__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="nxb-hero">
          <Reveal className="nxb-hero__copy">
            <div className="nxb-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="nxb-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
            </div>
            <h1>
              NEXUSMODS
              <span className="nxb-hero__line2">
                BYPASS<i className="nxb-hero__caret" aria-hidden="true" />
              </span>
            </h1>
            <p className="nxb-hero__tagline">{c.tagline}</p>
            <p className="nxb-hero__summary">{tr(p.summary)}</p>
            <div className="nxb-hero__actions">
              <a className="btn btn--primary" href={p.repo} {...external}>
                <Github aria-hidden="true" />
                {c.source}
              </a>
              {p.demo && (
                <a className="btn btn--outline" href={p.demo} {...external}>
                  {c.install}
                  <ExternalLink aria-hidden="true" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal className="nxb-console" delay={90}>
            <div className="nxb-console__chrome" aria-hidden="true">
              <span className="nxb-console__tab">
                <i /> Collection · Ready Queue
              </span>
              <span className="nxb-console__url">nexusmods.com</span>
            </div>
            <div className="nxb-console__body">
              {p.sketch?.rows.map((row) => (
                <div className="nxb-row" key={row.label} data-hot={row.hot ? 'y' : undefined}>
                  <span className="nxb-row__k">{row.label}</span>
                  {row.bar !== undefined ? (
                    <span className="nxb-row__bar" aria-hidden="true">
                      <i style={{ '--p': `${row.bar}%` } as React.CSSProperties} />
                    </span>
                  ) : null}
                  {row.value && <span className="nxb-row__v">{row.value}</span>}
                </div>
              ))}
              <div className="nxb-console__foot">
                <span className="nxb-console__clicks">
                  <Check aria-hidden="true" /> human clicks required: 1
                </span>
              </div>
            </div>
            <p className="nxb-console__caption">{c.schematic}</p>
          </Reveal>

          <span className="cs-note cs-note--to-r nxb-note nxb-note--hero">{c.notes[1]}</span>
          <span className="cs-note cs-note--to-l nxb-note nxb-note--console">{c.notes[2]}</span>
        </header>

        <NxbSection id="nxb-metrics" label={c.metrics} aside={c.metricsNote} className="nxb-section--tight">
          <dl className="nxb-stats">
            {p.metrics?.map((m) => (
              <div className="nxb-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <span className="cs-note cs-note--to-l nxb-note nxb-note--stats">{c.notes[5]}</span>
        </NxbSection>

        <NxbSection id="nxb-maths" label={c.maths} aside={c.mathsNote} className="nxb-section--maths">
          <div className="nxb-maths">
            <Reveal className="nxb-sum" as="div">
              {c.sum.map(([n, label], i) => (
                <div className="nxb-sum__row" key={label}>
                  <span className="nxb-sum__op" aria-hidden="true">{i === 0 ? '' : '+'}</span>
                  <span className="nxb-sum__n">{n}</span>
                  <span className="nxb-sum__l">{label}</span>
                </div>
              ))}
              <div className="nxb-sum__rule" aria-hidden="true" />
              <div className="nxb-sum__row nxb-sum__row--total">
                <span className="nxb-sum__op" aria-hidden="true">=</span>
                <span className="nxb-sum__n">{c.sumTotal}</span>
                <span className="nxb-sum__l">{c.sumTotalNote}</span>
              </div>
            </Reveal>
            <Reveal className="nxb-maths__card" delay={80} as="div">
              {p.why && (
                <div className="nxb-maths__block nxb-maths__block--why">
                  <div className="nxb-maths__tag">
                    <Flame aria-hidden="true" />
                    <span>{c.mathsWhy}</span>
                  </div>
                  <p>{tr(p.why)}</p>
                </div>
              )}
              {p.why && p.what && <div className="nxb-maths__divider" aria-hidden="true" />}
              {p.what && (
                <div className="nxb-maths__block nxb-maths__block--what">
                  <div className="nxb-maths__tag">
                    <Zap aria-hidden="true" />
                    <span>{c.mathsWhat}</span>
                  </div>
                  <p>{tr(p.what)}</p>
                </div>
              )}
            </Reveal>
          </div>
          <span className="cs-note cs-note--to-r nxb-note nxb-note--maths">{c.notes[0]}</span>
        </NxbSection>

        <NxbSection id="nxb-queue" label={c.queue} aside={c.queueNote} className="nxb-section--queue">
          <SwipeHint />
          <ol className="nxb-pipe">
            {c.steps.map(([name, body], i) => (
              <li key={name}>
                <Reveal className="nxb-step" delay={Math.min(i, 6) * 40}>
                  <span className="nxb-step__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <span className="cs-note cs-note--to-l nxb-note nxb-note--queue">{c.notes[3]}</span>
        </NxbSection>

        {p.features && (
          <NxbSection id="nxb-features" label={c.features} aside={c.featuresNote} className="nxb-section--features">
            <SwipeHint />
            <ul className="nxb-features">
              {p.features.map((feature, i) => {
                const Icon = featureIcons[i] ?? ListOrdered
                return (
                  <li key={feature.title.en} data-lead={i < 2 ? 'y' : undefined}>
                    <Reveal className="nxb-feature" delay={Math.min(i, 6) * 40}>
                      <span className="nxb-feature__icon" aria-hidden="true"><Icon /></span>
                      <h3>{tr(feature.title)}</h3>
                      <p>{tr(feature.body)}</p>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
            <span className="cs-note cs-note--to-l nxb-note nxb-note--features">{c.notes[4]}</span>
          </NxbSection>
        )}

        {p.challenges && (
          <NxbSection id="nxb-challenges" label={c.challenges} aside={c.challengesNote} className="nxb-section--challenges">
            <div className="nxb-challenges">
              {p.challenges.map((ch, i) => (
                <Reveal className="nxb-challenge" delay={i * 45} key={ch.title.en}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{tr(ch.title)}</h3>
                    <p>{tr(ch.body)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </NxbSection>
        )}

        {p.architecture && (
          <NxbSection id="nxb-arch" label={c.architecture} aside={c.architectureNote} className="nxb-section--arch">
            <div className="nxb-arch">
              {p.architecture.map((layer, i) => (
                <Reveal className="nxb-layer" delay={i * 50} key={layer.name.en}>
                  <h3>{tr(layer.name)}</h3>
                  <ul>
                    {layer.items.map((item) => (
                      <li key={item}><code>{item}</code></li>
                    ))}
                  </ul>
                  {layer.note && <p>{tr(layer.note)}</p>}
                </Reveal>
              ))}
            </div>
          </NxbSection>
        )}

        {p.privacy && (
          <NxbSection id="nxb-privacy" label={c.privacy} className="nxb-section--privacy">
            <div className="nxb-privacy">
              <Reveal className="nxb-privacy__prose">
                <ShieldCheck aria-hidden="true" />
                <p>{tr(p.privacy)}</p>
                <strong>{c.privacyLine}</strong>
              </Reveal>
              <Reveal className="nxb-perms" delay={70}>
                <div className="nxb-perms__col">
                  <h3>{c.granted}</h3>
                  <ul>
                    {c.grantedItems.map(([k, v]) => (
                      <li key={k}>
                        <Check aria-hidden="true" />
                        <code>{k}</code>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="nxb-perms__col nxb-perms__col--no">
                  <h3>{c.absent}</h3>
                  <ul>
                    {c.absentItems.map(([k, v]) => (
                      <li key={k}>
                        <Ban aria-hidden="true" />
                        <code>{k}</code>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <span className="cs-note cs-note--to-r nxb-note nxb-note--privacy">{c.notes[6]}</span>
          </NxbSection>
        )}

        <Gallery
          label={c.gallery}
          note={c.galleryNote}
          captions={c.shots}
          openLabel={c.openShot}
          prevLabel={c.shotPrev}
          nextLabel={c.shotNext}
          goLabel={c.shotGo}
        />

        <NxbSection id="nxb-origin" label={c.origin} aside={c.originNote} className="nxb-section--origin">
          <SwipeHint />
          <ol className="nxb-story">
            {c.story.map(([when, title, body], i) => (
              <li key={when}>
                <Reveal className="nxb-era" delay={i * 60}>
                  <span className="nxb-era__when">{when}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <span className="cs-note cs-note--to-l nxb-note nxb-note--origin">{c.notes[7]}</span>
        </NxbSection>

        <div className="nxb-endgrid">
          {p.lessons && (
            <NxbSection id="nxb-lessons" label={c.lessons} className="nxb-section--panel">
              <ul className="nxb-lessons">
                {trList(p.lessons).map((lesson) => <li key={lesson}>{lesson}</li>)}
              </ul>
            </NxbSection>
          )}

          <NxbSection id="nxb-stack" label={c.stack} className="nxb-section--panel">
            <div className="nxb-stack">
              {p.tech.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="nxb-links" aria-label={c.links}>
              <a className="btn btn--outline btn--path" href={p.repo} {...external}>
                <Github aria-hidden="true" /> {p.repoLabel} <ExternalLink aria-hidden="true" />
              </a>
            </div>
            {p.disclaimer && (
              <p className="nxb-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </NxbSection>
        </div>

        {near && (
          <nav className="nxb-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="nxb-nav__copy">
                <span className="nxb-nav__label"><ArrowLeft aria-hidden="true" /> {c.previous}</span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="nxb-nav__brand" aria-hidden="true"><Pumpkin size={64} mood="wide" /></span>
            <Link className="nxb-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="nxb-nav__copy">
                <span className="nxb-nav__label">{c.next} <ArrowRight aria-hidden="true" /></span>
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
