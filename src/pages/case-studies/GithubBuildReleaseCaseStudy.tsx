import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  ExternalLink,
  FileText,
  Github,
  KeyRound,
  ListOrdered,
  Package,
  ScrollText,
  Sparkles,
  Tag,
  Terminal,
  TriangleAlert,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/github-build-release.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/* Captures are wired but not shipped yet — every shot is probed on mount, so each section
   omits itself until the matching .webp exists and lights up on its own once it does. */
const SHOTS = {
  create: { file: 'create', w: 1462, h: 1251 },
  empty: { file: 'empty', w: 1486, h: 1267 },
  ai: { file: 'ai-notes', w: 1003, h: 661 },
  history: { file: 'history', w: 1132, h: 1147 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['empty', 'ai', 'history']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Desktop app · ReleaseFlow',
    tagline: 'The part of shipping nobody enjoys, reduced to one window and one button.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '10,627 lines across the app · 5,627 JavaScript and JSX, 5,000 CSS · 2,390 of them in the main process alone, and 1,629 in one stylesheet',

    premise: 'The premise',
    premiseNote: 'The entire tool, in one sentence.',
    premiseLead: 'The manual path is identical every single time.',
    premiseBody:
      'Write the notes. Bump the version. Run the build. Wait. Find the installer. Open GitHub. Create a release. Paste the notes. Upload the file. Every one of those steps is the same on every release of every project, and none of them is interesting. Maintaining several desktop apps at once made that repetition the actual bottleneck — so this is the window that does all nine and shows its work.',

    output: 'Real output',
    outputNote: 'The app, in the states that matter.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      create: 'A project loaded: next tag, notes editor, and the version bump waiting on confirmation.',
      empty: 'The empty state, with the GitHub CLI check already done.',
      ai: 'Three ways to draft notes, and the scope it will actually read.',
      history: 'Past releases and tags, with bulk selection.',
    } as Record<ShotKey, string>,

    pillars: 'What it does for you',
    pillarsNote: 'Four steps, one window.',
    pillarList: [
      {
        title: 'Drafts the notes',
        body: 'A first pass written from what actually changed.',
        lines: [
          'reads the working tree, or a commit range, or your brief',
          'falls back to the last commit when the tree is clean',
          'lands in a markdown editor with a live preview',
        ],
      },
      {
        title: 'Bumps and builds',
        body: 'The version moves and the packager runs, in order.',
        lines: [
          'patch version staged, applied on confirm',
          'runs your own build command, not an assumed one',
          'log stream stays in the window',
        ],
      },
      {
        title: 'Publishes through gh',
        body: 'The release is created by the CLI you already signed into.',
        lines: [
          'no token of its own to store or refresh',
          'no auth flow written from scratch',
          'no browser tab in the loop',
        ],
      },
      {
        title: 'Keeps the history',
        body: 'What shipped, when, and what is still only a tag.',
        lines: [
          'releases and tags listed separately',
          'bulk selection for cleaning up',
          'each entry links back out to GitHub',
        ],
      },
    ],

    shell: 'It shells out',
    shellNote: 'The decision the whole tool rests on.',
    shellLead:
      'Every GitHub operation in here runs the `gh` command line rather than the REST API. That is the load-bearing choice: it means there is no token to store, no OAuth flow to write, no scopes to get subtly wrong, and no refresh logic to maintain. The tool simply inherits whatever login you already have. It also means the tool is inert without `gh` installed — so installing it is part of the product rather than a line in a readme.',
    shellCards: [
      {
        problem: 'Tokens are a liability',
        answer: 'Never hold one',
        body:
          'Writing my own GitHub auth would mean storing a credential, refreshing it, scoping it correctly and being responsible for it. Shelling out to the CLI removes all four problems at once. The app holds no GitHub credential of any kind.',
      },
      {
        problem: 'gh might not be installed',
        answer: 'Offer to install it',
        body:
          'The empty state checks for the CLI, and if it is missing the app runs the winget install for you rather than linking to a download page. A dependency the user has to go and fetch themselves is where most internal tools quietly stop being used.',
      },
      {
        problem: 'gh might be signed out',
        answer: 'Open the command',
        body:
          'Detecting that you are not authenticated is only half an answer. The app opens the authentication command for you, so the fix is one confirmation rather than a search for the right incantation.',
      },
      {
        problem: 'The network can just fail',
        answer: 'Name the likely cause',
        body:
          'When the model call cannot reach DeepSeek, the error does not say “request failed”. It says to check the connection or allow the app through the firewall, because on Windows that is what it usually is. Guessing well on behalf of the user is most of what a good error message does.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'Four problems, one of them self-inflicted.',
    hardMore: 'Technical detail',
    hardShort: [
      'Three stages fail in three different ways, so each needs its own visible state.',
      'The model gets the first word on the notes, never the last one.',
      'Every GitHub call goes through a CLI instead of an API, and that is the point.',
      'Half the line count is stylesheet, for a tool with three buttons.',
    ],

    how: 'How it’s built',
    howNote: 'Left to right, and you can stop it at any point.',
    flow: [
      ['WORKING TREE', 'or a range'],
      ['DEEPSEEK', 'v4-flash'],
      ['MARKDOWN', 'you edit it'],
      ['electron-builder', 'your command'],
      ['gh release', 'published'],
    ],

    honest: 'Honest accounting',
    honestHeadline: 'Three things worth saying out loud.',
    honestChant: ['No telemetry.', 'No accounts.', 'No CI.', 'No self-update.'],
    honestPoints: [
      [
        'The key is in plain text',
        'It stores no GitHub credential — that is the whole point of using the CLI. But it does save your DeepSeek API key to a local config file, unencrypted. Electron ships safeStorage for exactly this, and wiring it up is the outstanding job on this project.',
      ],
      [
        'It has four names',
        'The interface calls it ReleaseFlow. The package calls it github-release-manager. The installer shortcut says GitHub Release Manager. The folder says Github-Build-Release. That is what happens when a tool gets renamed in the UI and nowhere else, and it is worth a tidy-up.',
      ],
      [
        'A release tool that cannot release itself',
        'There is no electron-updater in here, so the app that automates publishing has no way to update itself. You reinstall it by hand. The irony has been noted and not yet acted on.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'Nine manual steps, one confirmation, and the log still visible.',
    finaleOther: 'See other projects',

    notes: [
      'nine steps. one button.',
      'all four counted.',
      'i did this every single release.',
      'the states that matter.',
      'none of these need a browser.',
      'no token. that is the trick.',
      'yes, four names. i know.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Desktop app · ReleaseFlow',
    tagline: 'Το κομμάτι του shipping που δεν γουστάρει κανείς, σε ένα παράθυρο και ένα κουμπί.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '10.627 γραμμές συνολικά · 5.627 JavaScript και JSX, 5.000 CSS · οι 2.390 μόνο στον main process, και 1.629 σε ένα stylesheet',

    premise: 'Η αφετηρία',
    premiseNote: 'Όλο το εργαλείο, σε μία πρόταση.',
    premiseLead: 'Η χειροκίνητη διαδρομή είναι κάθε φορά ακριβώς ίδια.',
    premiseBody:
      'Γράψε τις σημειώσεις. Ανέβασε την έκδοση. Τρέξε το build. Περίμενε. Βρες τον installer. Άνοιξε το GitHub. Φτιάξε release. Κάνε paste τις σημειώσεις. Ανέβασε το αρχείο. Κάθε ένα από αυτά είναι ίδιο σε κάθε release κάθε project, και κανένα δεν έχει ενδιαφέρον. Η συντήρηση πολλών desktop apps ταυτόχρονα έκανε αυτή την επανάληψη το πραγματικό bottleneck — οπότε αυτό είναι το παράθυρο που τα κάνει και τα εννιά και δείχνει τη δουλειά του.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Η εφαρμογή, στις καταστάσεις που μετράνε.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      create: 'Φορτωμένο project: επόμενο tag, editor σημειώσεων, και το version bump να περιμένει επιβεβαίωση.',
      empty: 'Η αρχική οθόνη, με τον έλεγχο του GitHub CLI ήδη περασμένο.',
      ai: 'Τρεις τρόποι για σημειώσεις, και το εύρος που θα διαβάσει όντως.',
      history: 'Παλιά releases και tags, με μαζική επιλογή.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει για σένα',
    pillarsNote: 'Τέσσερα βήματα, ένα παράθυρο.',
    pillarList: [
      {
        title: 'Γράφει το πρώτο draft',
        body: 'Ένα πρώτο πέρασμα γραμμένο από αυτό που όντως άλλαξε.',
        lines: [
          'διαβάζει το working tree, ή commit range, ή το brief σου',
          'πέφτει πίσω στο τελευταίο commit όταν το tree είναι καθαρό',
          'καταλήγει σε markdown editor με ζωντανό preview',
        ],
      },
      {
        title: 'Ανεβάζει έκδοση και χτίζει',
        body: 'Η έκδοση προχωράει και ο packager τρέχει, με σειρά.',
        lines: [
          'το patch version ετοιμάζεται, εφαρμόζεται στην επιβεβαίωση',
          'τρέχει τη δική σου εντολή build, όχι μια υποτιθέμενη',
          'το log stream μένει μέσα στο παράθυρο',
        ],
      },
      {
        title: 'Δημοσιεύει μέσω gh',
        body: 'Το release το φτιάχνει το CLI στο οποίο είσαι ήδη συνδεδεμένος.',
        lines: [
          'κανένα δικό του token για αποθήκευση ή ανανέωση',
          'κανένα auth flow γραμμένο από το μηδέν',
          'κανένα tab browser στη μέση',
        ],
      },
      {
        title: 'Κρατάει το ιστορικό',
        body: 'Τι βγήκε, πότε, και τι είναι ακόμα μόνο tag.',
        lines: [
          'releases και tags σε ξεχωριστές λίστες',
          'μαζική επιλογή για καθάρισμα',
          'κάθε εγγραφή συνδέει πίσω στο GitHub',
        ],
      },
    ],

    shell: 'Καλεί το CLI',
    shellNote: 'Η απόφαση πάνω στην οποία στέκεται όλο το εργαλείο.',
    shellLead:
      'Κάθε λειτουργία GitHub εδώ μέσα τρέχει τη γραμμή εντολών `gh` αντί για το REST API. Αυτή είναι η φέρουσα επιλογή: σημαίνει κανένα token για αποθήκευση, κανένα OAuth flow για γράψιμο, κανένα scope για να το κάνεις διακριτικά λάθος, και καμία λογική ανανέωσης για συντήρηση. Το εργαλείο απλώς κληρονομεί όποιο login έχεις ήδη. Σημαίνει επίσης ότι είναι αδρανές χωρίς εγκατεστημένο `gh` — γι᾽ αυτό η εγκατάστασή του είναι μέρος του προϊόντος και όχι γραμμή σε readme.',
    shellCards: [
      {
        problem: 'Τα tokens είναι ευθύνη',
        answer: 'Μην κρατάς κανένα',
        body:
          'Το να γράψω δικό μου GitHub auth θα σήμαινε αποθήκευση credential, ανανέωσή του, σωστό scoping και ευθύνη γι᾽ αυτό. Η κλήση του CLI αφαιρεί και τα τέσσερα προβλήματα μαζί. Η εφαρμογή δεν κρατάει κανένα GitHub credential.',
      },
      {
        problem: 'Το gh μπορεί να λείπει',
        answer: 'Πρόσφερε να το εγκαταστήσεις',
        body:
          'Η αρχική οθόνη ελέγχει για το CLI, και αν λείπει η εφαρμογή τρέχει την εγκατάσταση με winget αντί να παραπέμπει σε σελίδα λήψης. Μια εξάρτηση που πρέπει να πάει να βρει ο χρήστης μόνος του είναι εκεί που τα περισσότερα εσωτερικά εργαλεία σταματούν σιωπηλά να χρησιμοποιούνται.',
      },
      {
        problem: 'Το gh μπορεί να μην έχει login',
        answer: 'Άνοιξε την εντολή',
        body:
          'Το να εντοπίσεις ότι δεν είσαι συνδεδεμένος είναι μισή απάντηση. Η εφαρμογή ανοίγει την εντολή σύνδεσης για σένα, ώστε η λύση να είναι μία επιβεβαίωση αντί για ψάξιμο του σωστού ξορκιού.',
      },
      {
        problem: 'Το δίκτυο απλώς σκάει',
        answer: 'Πες την πιθανή αιτία',
        body:
          'Όταν η κλήση στο μοντέλο δεν φτάνει το DeepSeek, το σφάλμα δεν λέει «το request απέτυχε». Λέει να ελέγξεις τη σύνδεση ή να επιτρέψεις την εφαρμογή στο firewall, επειδή στα Windows αυτό είναι συνήθως. Το να μαντεύεις σωστά για λογαριασμό του χρήστη είναι το μεγαλύτερο μέρος ενός καλού μηνύματος σφάλματος.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τέσσερα προβλήματα, το ένα αυτοπροκλήθηκε.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Τρία στάδια αποτυγχάνουν με τρεις διαφορετικούς τρόπους, οπότε καθένα θέλει δικό του ορατό state.',
      'Το μοντέλο παίρνει τον πρώτο λόγο στις σημειώσεις, ποτέ τον τελευταίο.',
      'Κάθε κλήση GitHub περνάει από CLI αντί για API, και αυτό είναι το ζητούμενο.',
      'Το μισό line count είναι stylesheet, για εργαλείο με τρία κουμπιά.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Από αριστερά προς τα δεξιά, και μπορείς να το σταματήσεις σε κάθε σημείο.',
    flow: [
      ['WORKING TREE', 'ή ένα range'],
      ['DEEPSEEK', 'v4-flash'],
      ['MARKDOWN', 'το γράφεις εσύ'],
      ['electron-builder', 'η εντολή σου'],
      ['gh release', 'δημοσιεύτηκε'],
    ],

    honest: 'Τίμιος απολογισμός',
    honestHeadline: 'Τρία πράγματα που αξίζει να ειπωθούν δυνατά.',
    honestChant: ['Χωρίς telemetry.', 'Χωρίς λογαριασμούς.', 'Χωρίς CI.', 'Χωρίς self-update.'],
    honestPoints: [
      [
        'Το κλειδί είναι σε απλό κείμενο',
        'Δεν αποθηκεύει κανένα GitHub credential — αυτό είναι όλο το νόημα του CLI. Αποθηκεύει όμως το DeepSeek API key σου σε τοπικό αρχείο config, χωρίς κρυπτογράφηση. Το Electron έχει safeStorage ακριβώς γι᾽ αυτό, και η σύνδεσή του είναι η εκκρεμότητα αυτού του project.',
      ],
      [
        'Έχει τέσσερα ονόματα',
        'Το interface το λέει ReleaseFlow. Το package το λέει github-release-manager. Η συντόμευση του installer λέει GitHub Release Manager. Ο φάκελος λέει Github-Build-Release. Αυτό γίνεται όταν ένα εργαλείο μετονομάζεται στο UI και πουθενά αλλού, και θέλει συγύρισμα.',
      ],
      [
        'Εργαλείο release που δεν κάνει release τον εαυτό του',
        'Δεν υπάρχει electron-updater εδώ μέσα, οπότε η εφαρμογή που αυτοματοποιεί τη δημοσίευση δεν έχει τρόπο να ενημερώσει τον εαυτό της. Την ξαναεγκαθιστάς στο χέρι. Η ειρωνεία έχει καταγραφεί και δεν έχει ακόμα αντιμετωπιστεί.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Εννιά χειροκίνητα βήματα, μία επιβεβαίωση, και το log ακόμα ορατό.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'εννιά βήματα. ένα κουμπί.',
      'και τα τέσσερα μετρημένα.',
      'το έκανα σε κάθε release.',
      'οι καταστάσεις που μετράνε.',
      'κανένα δεν θέλει browser.',
      'κανένα token. αυτό είναι το κόλπο.',
      'ναι, τέσσερα ονόματα. το ξέρω.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/github-build-release/`

function useShot(file: string) {
  const src = `${ASSETS}${file}.webp`
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    let cancelled = false
    const miss = () => !cancelled && setBroken(true)
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) miss()
      })
      .catch(miss)
    return () => {
      cancelled = true
    }
  }, [src])

  const props = {
    src,
    onError: () => setBroken(true),
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) =>
      e.currentTarget.naturalWidth === 0 && setBroken(true),
  }
  return { broken, props }
}

interface SectionProps {
  id: string
  label: string
  aside?: string
  children: React.ReactNode
  className?: string
}

function GbrSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`gbr-section ${className}`} aria-labelledby={id}>
      <div className="gbr-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="gbr-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="gbr-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Sparkles, Package, Terminal, ListOrdered]
const SHELL_ICONS = [KeyRound, Boxes, Terminal, TriangleAlert]

export function GithubBuildReleaseCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const create = useShot(SHOTS.create.file)
  const empty = useShot(SHOTS.empty.file)
  const ai = useShot(SHOTS.ai.file)
  const history = useShot(SHOTS.history.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = { create, empty, ai, history }

  const [zoomed, setZoomed] = useState<ShotKey | null>(null)

  useEffect(() => {
    if (!zoomed) return
    const previous = document.body.style.overflow
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomed(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [zoomed])

  const gallery = GALLERY.filter((key) => !shots[key].broken)

  return (
    <div className="page gbr" data-accent="lime">
      <div className="container gbr__container cs-scope">
        <Link className="gbr__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="gbr-hero" data-solo={create.broken ? 'y' : undefined}>
          <Reveal className="gbr-hero__copy">
            <div className="gbr-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="gbr-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              {p.version && <span className="gbr-tag">v{p.version}</span>}
            </div>
            <h1>
              RELEASE
              <span className="gbr-hero__line2">FLOW</span>
            </h1>
            <p className="gbr-hero__tagline">{c.tagline}</p>
            <p className="gbr-hero__summary">{tr(p.summary)}</p>
            <div className="gbr-hero__actions">
              <a className="btn btn--primary" href={p.repo} {...external}>
                <Github aria-hidden="true" />
                {c.source}
              </a>
              <Link className="btn btn--outline" to="/projects">
                {c.more}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {!create.broken && (
            <Reveal className="gbr-hero__shot" delay={90}>
              <button
                type="button"
                className="gbr-hero__shot-btn"
                onClick={() => setZoomed('create')}
              >
                <img
                  {...create.props}
                  alt={c.shotCaptions.create}
                  width={SHOTS.create.w}
                  height={SHOTS.create.h}
                  fetchPriority="high"
                  decoding="async"
                />
              </button>
              <p>{c.shotCaptions.create}</p>
            </Reveal>
          )}

          <span className="cs-note cs-note--to-r gbr-note gbr-note--hero">{c.notes[0]}</span>
        </header>

        <GbrSection
          id="gbr-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="gbr-section--tight"
        >
          <dl className="gbr-stats">
            {p.metrics?.map((m) => (
              <div className="gbr-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="gbr-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l gbr-note gbr-note--metrics">{c.notes[1]}</span>
        </GbrSection>

        <GbrSection
          id="gbr-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="gbr-section--premise"
        >
          <Reveal className="gbr-premise">
            <p className="gbr-premise__lead">{c.premiseLead}</p>
            <p className="gbr-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r gbr-note gbr-note--premise">{c.notes[2]}</span>
        </GbrSection>

        {gallery.length > 0 && (
          <GbrSection
            id="gbr-output"
            label={c.output}
            aside={c.outputNote}
            className="gbr-section--output gbr-section--tinted"
          >
            <SwipeHint className="gbr-swipe" />
            <div className="gbr-gallery">
              {gallery.map((key, i) => (
                <Reveal className="gbr-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="gbr-frame__btn"
                    onClick={() => setZoomed(key)}
                  >
                    <img
                      {...shots[key].props}
                      alt={c.shotCaptions[key]}
                      width={SHOTS[key].w}
                      height={SHOTS[key].h}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="gbr-frame__expand">{c.expand}</span>
                  </button>
                  <p className="gbr-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
            <span className="cs-note cs-note--to-l gbr-note gbr-note--output">{c.notes[3]}</span>
          </GbrSection>
        )}

        <GbrSection
          id="gbr-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="gbr-section--pillars"
        >
          <SwipeHint className="gbr-swipe" />
          <div className="gbr-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Sparkles
              return (
                <Reveal className="gbr-pillar" delay={i * 60} key={pillar.title}>
                  <span className="gbr-pillar__step" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="gbr-pillar__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                  <ul>
                    {pillar.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-r gbr-note gbr-note--pillars">{c.notes[4]}</span>
        </GbrSection>

        <GbrSection
          id="gbr-shell"
          label={c.shell}
          aside={c.shellNote}
          className="gbr-section--shell gbr-section--tinted"
        >
          <Reveal className="gbr-statement" as="p">
            {c.shellLead}
          </Reveal>

          <SwipeHint className="gbr-swipe" />
          <div className="gbr-shells">
            {c.shellCards.map((card, i) => {
              const Icon = SHELL_ICONS[i] ?? KeyRound
              return (
                <Reveal className="gbr-shell" delay={i * 60} key={card.problem}>
                  <span className="gbr-shell__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="gbr-shell__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="gbr-shell__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-l gbr-note gbr-note--shell">{c.notes[5]}</span>
        </GbrSection>

        {p.challenges && (
          <GbrSection id="gbr-hard" label={c.hard} aside={c.hardNote} className="gbr-section--hard">
            <SwipeHint className="gbr-swipe" />
            <ol className="gbr-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="gbr-hard__row" delay={i * 50} key={ch.title.en} as="li">
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{tr(ch.title)}</h3>
                    <p>{c.hardShort[i]}</p>
                    <details>
                      <summary>{c.hardMore}</summary>
                      <p>{tr(ch.body)}</p>
                    </details>
                  </div>
                </Reveal>
              ))}
            </ol>
          </GbrSection>
        )}

        <GbrSection id="gbr-how" label={c.how} aside={c.howNote} className="gbr-section--how">
          <SwipeHint className="gbr-swipe" />
          <Reveal className="gbr-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="gbr-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="gbr-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </GbrSection>

        <GbrSection
          id="gbr-honest"
          label={c.honest}
          className="gbr-section--honest gbr-section--tinted"
        >
          <Reveal className="gbr-verdict">
            <p>{c.honestHeadline}</p>
            <ul className="gbr-chant">
              {c.honestChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="gbr-swipe" />
          <div className="gbr-points">
            {c.honestPoints.map(([title, body], i) => (
              <Reveal className="gbr-point" delay={i * 60} key={title}>
                <span className="gbr-point__icon" aria-hidden="true">
                  {i === 0 ? <KeyRound /> : i === 1 ? <Tag /> : <ScrollText />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l gbr-note gbr-note--honest">{c.notes[6]}</span>
        </GbrSection>

        <div className="gbr-endgrid">
          {p.lessons && (
            <GbrSection id="gbr-lessons" label={c.lessons} className="gbr-section--panel">
              <SwipeHint className="gbr-swipe" />
              <ul className="gbr-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </GbrSection>
          )}

          <GbrSection id="gbr-stack" label={c.stack} className="gbr-section--panel">
            <div className="gbr-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.privacy && (
              <p className="gbr-disclaimer">
                <FileText aria-hidden="true" />
                <span>
                  <strong>{c.disclaimerTitle}:</strong> {tr(p.privacy)}
                </span>
              </p>
            )}
          </GbrSection>
        </div>

        <Reveal className="gbr-finale" as="section">
          <p>{c.finale}</p>
          <div className="gbr-finale__actions" aria-label={c.links}>
            <a className="btn btn--primary" href={p.repo} {...external}>
              <Github aria-hidden="true" />
              {c.source}
              <ExternalLink aria-hidden="true" />
            </a>
            <Link className="btn btn--outline" to="/projects">
              {c.finaleOther}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {near && (
          <nav className="gbr-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="gbr-nav__copy">
                <span className="gbr-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="gbr-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="gbr-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="gbr-nav__copy">
                <span className="gbr-nav__label">
                  {c.next} <ArrowRight aria-hidden="true" />
                </span>
                <strong>{near.next.name}</strong>
                <small>{tr(near.next.short)}</small>
              </span>
              <ProjectThumb project={near.next} />
            </Link>
          </nav>
        )}
      </div>

      {zoomed && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="gbr-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="gbr-zoom__close"
              onClick={() => setZoomed(null)}
              aria-label={c.close}
            >
              ×
            </button>
            <img
              src={`${ASSETS}${SHOTS[zoomed].file}.webp`}
              alt={c.shotCaptions[zoomed]}
              width={SHOTS[zoomed].w}
              height={SHOTS[zoomed].h}
            />
          </div>,
          document.body,
        )}
    </div>
  )
}
