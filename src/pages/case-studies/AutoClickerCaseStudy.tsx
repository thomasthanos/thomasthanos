import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CloudOff,
  Crosshair,
  ExternalLink,
  Gauge,
  Github,
  Keyboard,
  Layers,
  OctagonX,
  Shuffle,
  Tags,
  Terminal,
  Zap,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/autoclicker.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/* The capture is wired but not shipped yet — it is probed on mount, so the section stays hidden
   until the .webp exists and appears on its own once it does. */
const SHOTS = {
  app: { file: 'app', w: 1252, h: 1080 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['app']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Desktop app · Windows 11 Edition',
    tagline: 'The clicking was never the hard part. The cost of starting a process was.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '2,421 lines across 18 application components, 822 in the Electron main process · 3,954 more came with the UI kit and I did not write them',

    premise: 'The premise',
    premiseNote: 'Where the actual problem was.',
    premiseLead: 'Starting a process costs more than the work you asked it to do.',
    premiseBody:
      'Simulating a click on Windows is a couple of lines of PowerShell. Doing it two hundred times a second is a different problem entirely, because spawning powershell.exe costs somewhere between fifty and two hundred milliseconds — so at a 200ms interval, the process startup is the interval. Everything interesting in this project is the work done to move that cost out of the loop and only pay it once.',

    output: 'Real output',
    outputNote: 'The app, running.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      app: 'The whole interface: interval, mode, target and two large buttons you cannot miss.',
    } as Record<ShotKey, string>,

    pillars: 'What it does',
    pillarsNote: 'Four controls, and a way out of all of them.',
    pillarList: [
      {
        title: 'An interval you can actually set',
        body: 'Hours, minutes, seconds and milliseconds, as four separate fields.',
        lines: [
          'no single box demanding you convert to ms',
          'random interval available as a toggle',
          'because a perfectly even click is its own signature',
        ],
      },
      {
        title: 'Where to click',
        body: 'Follow the cursor, pin one point, or queue several.',
        lines: [
          'follow mode leaves the mouse yours',
          'fixed position for one target',
          'multiple positions, each with its own click count',
        ],
      },
      {
        title: 'How long to run',
        body: 'A capped number of repeats, or until you stop it.',
        lines: [
          'repeat N times, with N on screen',
          'or repeat until stopped, deliberately explicit',
          'live counters for total, session and clicks per second',
        ],
      },
      {
        title: 'A way out',
        body: 'Two global keys, because the app takes your mouse.',
        lines: [
          'F6 toggles start and stop',
          'F7 is a separate emergency stop that only stops',
          'both reassignable, both registered globally',
        ],
      },
    ],

    runspace: 'One process, not one per click',
    runspaceNote: 'The only genuinely interesting decision here.',
    runspaceLead:
      'The naive build shells out to PowerShell for each click. That works, and it caps you at roughly five to twenty clicks a second no matter what interval you asked for, because you are paying process startup every time. So the app starts one powershell.exe at launch, holds it open for the whole session, and pushes commands into its standard input. The cost moves from every click to once, and the interval you set becomes the interval you get.',
    runspaceCards: [
      {
        problem: 'Startup dominates the loop',
        answer: 'Pay it once',
        body:
          'A process spawn costs roughly 50 to 200ms. At a 200ms interval that is the entire budget, and at anything faster the loop simply cannot keep up. Holding one process open removes that number from the hot path completely.',
      },
      {
        problem: 'The process needs feeding',
        answer: 'Talk to it over stdin',
        body:
          'PowerShell is started in a mode where it reads commands from standard input rather than taking one command and exiting. Each click is a line written to that stream — about as cheap as an inter-process message gets, and no new handles per click.',
      },
      {
        problem: 'It can still die',
        answer: 'Notice, and restart',
        body:
          'A long-lived child process will eventually exit on you. Its close event clears the handle so the next click starts a fresh one instead of writing into a dead pipe, which is the difference between a brief hiccup and the app silently doing nothing forever.',
      },
      {
        problem: 'The mouse is not yours any more',
        answer: 'Register the exits globally',
        body:
          'Once it is running, the pointer belongs to the app, so the stop path cannot live inside a window you may not be able to click. Both hotkeys register with the OS and work from whatever has focus, and one of them only ever stops.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'Two real problems, and two things I would fix.',
    hardMore: 'Technical detail',
    hardShort: [
      'Process startup time is the interval, once the interval gets short enough.',
      'A tool that owns your mouse needs an exit that does not require clicking.',
      'A generated scaffold left a cloud client in an offline application.',
      'Most of the line count came with the UI kit, not from me.',
    ],

    how: 'How it’s built',
    howNote: 'Four steps, and the third one only happens once.',
    flow: [
      ['REACT UI', 'interval · target'],
      ['IPC', 'to the main process'],
      ['powershell.exe', 'started once'],
      ['stdin', 'one line per click'],
      ['WINDOWS', 'the click lands'],
    ],

    honest: 'Honest accounting',
    honestHeadline: 'Three things this repository should not be quoted on.',
    honestChant: ['No network calls.', 'No account.', 'No telemetry.', 'No installer tricks.'],
    honestPoints: [
      [
        'There is a cloud client that does nothing',
        'The scaffold this was generated from came with a Supabase client, two table types and a device-ID hook. Nothing uses any of it — no file imports the client, there is not one table call in the source, and there is no environment file to aim it at. So it sends nothing, but only because it was never connected. That is a weaker promise than deleting it, and deleting it is the outstanding job.',
      ],
      [
        'Most of the code is not mine',
        'Forty-nine component files and 3,954 lines arrived with the UI kit. The application itself is eighteen files and 2,421 lines, plus 822 in the main process. The generated code is real and it saved real time — but the repository’s total line count describes the kit, not the project, and quoting it would be misleading.',
      ],
      [
        'It has three names',
        'The window says AutoClicker Pro. The folder says autoclicker_premium. This page says AutoClicker Premium. Nobody has ever been confused by this except me, at the moment of writing the page, which is exactly when it stops being harmless.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'One process, held open. Everything else is a text field.',
    finaleOther: 'See other projects',

    notes: [
      'the spawn was the bottleneck.',
      'all four counted.',
      '200ms interval, 200ms startup.',
      'two keys out. always.',
      'pay the cost once.',
      'the cloud client does nothing.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Desktop app · Windows 11 Edition',
    tagline: 'Το κλικ δεν ήταν ποτέ το δύσκολο. Το κόστος εκκίνησης μιας διεργασίας ήταν.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '2.421 γραμμές σε 18 components της εφαρμογής, 822 στον main process του Electron · άλλες 3.954 ήρθαν με το UI kit και δεν τις έγραψα εγώ',

    premise: 'Η αφετηρία',
    premiseNote: 'Πού ήταν το πραγματικό πρόβλημα.',
    premiseLead: 'Η εκκίνηση μιας διεργασίας κοστίζει πιο πολύ από τη δουλειά που της ζήτησες.',
    premiseBody:
      'Το να προσομοιώσεις ένα κλικ στα Windows είναι δυο γραμμές PowerShell. Το να το κάνεις διακόσιες φορές το δευτερόλεπτο είναι εντελώς άλλο πρόβλημα, επειδή το άνοιγμα του powershell.exe κοστίζει κάπου ανάμεσα σε πενήντα και διακόσια χιλιοστά του δευτερολέπτου — οπότε σε interval 200ms, η εκκίνηση της διεργασίας είναι το interval. Ό,τι ενδιαφέρον έχει αυτό το project είναι η δουλειά που έγινε ώστε αυτό το κόστος να βγει από τον βρόχο και να πληρωθεί μία φορά.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Η εφαρμογή σε λειτουργία.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      app: 'Όλο το interface: interval, λειτουργία, στόχος και δύο μεγάλα κουμπιά που δεν χάνονται.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει',
    pillarsNote: 'Τέσσερα χειριστήρια, και μια έξοδος από όλα.',
    pillarList: [
      {
        title: 'Interval που όντως ορίζεις',
        body: 'Ώρες, λεπτά, δευτερόλεπτα και χιλιοστά, σε τέσσερα ξεχωριστά πεδία.',
        lines: [
          'κανένα μονό κουτί που σε βάζει να μετατρέψεις σε ms',
          'τυχαίο interval διαθέσιμο με διακόπτη',
          'επειδή το απόλυτα σταθερό κλικ είναι δική του υπογραφή',
        ],
      },
      {
        title: 'Πού να κάνει κλικ',
        body: 'Ακολουθεί τον κέρσορα, καρφώνει ένα σημείο, ή βάζει πολλά σε σειρά.',
        lines: [
          'η λειτουργία follow αφήνει το ποντίκι δικό σου',
          'σταθερή θέση για έναν στόχο',
          'πολλαπλές θέσεις, καθεμία με δικό της αριθμό κλικ',
        ],
      },
      {
        title: 'Πόσο να τρέξει',
        body: 'Ορισμένος αριθμός επαναλήψεων, ή μέχρι να το σταματήσεις.',
        lines: [
          'επανάληψη Ν φορές, με το Ν στην οθόνη',
          'ή μέχρι να σταματήσει, δηλωμένο ρητά',
          'ζωντανοί μετρητές για σύνολο, session και κλικ ανά δευτερόλεπτο',
        ],
      },
      {
        title: 'Μια έξοδος',
        body: 'Δύο global πλήκτρα, επειδή η εφαρμογή παίρνει το ποντίκι σου.',
        lines: [
          'το F6 ανοιγοκλείνει',
          'το F7 είναι ξεχωριστό emergency stop που μόνο σταματάει',
          'και τα δύο αλλάζουν, και τα δύο δηλώνονται global',
        ],
      },
    ],

    runspace: 'Μία διεργασία, όχι μία ανά κλικ',
    runspaceNote: 'Η μόνη πραγματικά ενδιαφέρουσα απόφαση εδώ.',
    runspaceLead:
      'Η αφελής υλοποίηση καλεί PowerShell για κάθε κλικ. Δουλεύει, και σε κλειδώνει περίπου στα πέντε με είκοσι κλικ το δευτερόλεπτο ό,τι interval κι αν ζήτησες, επειδή πληρώνεις εκκίνηση διεργασίας κάθε φορά. Οπότε η εφαρμογή ξεκινάει ένα powershell.exe στην έναρξη, το κρατάει ανοιχτό για όλο το session, και του σπρώχνει εντολές στην τυπική είσοδο. Το κόστος μετακινείται από κάθε κλικ στο μία φορά, και το interval που ορίζεις γίνεται το interval που παίρνεις.',
    runspaceCards: [
      {
        problem: 'Η εκκίνηση κυριαρχεί στον βρόχο',
        answer: 'Πλήρωσέ τη μία φορά',
        body:
          'Ένα spawn διεργασίας κοστίζει περίπου 50 έως 200ms. Σε interval 200ms αυτό είναι όλος ο προϋπολογισμός, και σε οτιδήποτε γρηγορότερο ο βρόχος απλώς δεν προλαβαίνει. Το να κρατάς μία διεργασία ανοιχτή βγάζει αυτό το νούμερο εντελώς από το hot path.',
      },
      {
        problem: 'Η διεργασία θέλει τροφοδοσία',
        answer: 'Μίλα της μέσω stdin',
        body:
          'Το PowerShell ξεκινάει σε λειτουργία όπου διαβάζει εντολές από την τυπική είσοδο αντί να πάρει μία εντολή και να βγει. Κάθε κλικ είναι μια γραμμή γραμμένη σε αυτό το ρεύμα — περίπου το φθηνότερο μήνυμα ανάμεσα σε διεργασίες, και κανένα νέο handle ανά κλικ.',
      },
      {
        problem: 'Μπορεί να πεθάνει',
        answer: 'Πάρ᾽ το είδηση, ξεκίνα ξανά',
        body:
          'Μια μακρόβια child process κάποια στιγμή θα βγει. Το event κλεισίματος καθαρίζει το handle ώστε το επόμενο κλικ να ξεκινήσει καινούργια αντί να γράψει σε νεκρό pipe — που είναι η διαφορά ανάμεσα σε ένα σύντομο σκαλοπάτι και στο να μη κάνει η εφαρμογή τίποτα σιωπηλά για πάντα.',
      },
      {
        problem: 'Το ποντίκι δεν είναι πια δικό σου',
        answer: 'Δήλωσε τις εξόδους global',
        body:
          'Μόλις τρέχει, ο δείκτης ανήκει στην εφαρμογή, οπότε η έξοδος δεν μπορεί να ζει μέσα σε παράθυρο που ίσως δεν μπορείς να κλικάρεις. Και τα δύο hotkeys δηλώνονται στο λειτουργικό και δουλεύουν από όπου κι αν έχει focus, και το ένα μόνο σταματάει.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Δύο πραγματικά προβλήματα, και δύο που θα διόρθωνα.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Ο χρόνος εκκίνησης διεργασίας γίνεται το interval, μόλις το interval μικρύνει αρκετά.',
      'Ένα εργαλείο που κατέχει το ποντίκι σου χρειάζεται έξοδο που δεν απαιτεί κλικ.',
      'Ένα παραγμένο scaffold άφησε cloud client μέσα σε offline εφαρμογή.',
      'Οι περισσότερες γραμμές ήρθαν με το UI kit, όχι από μένα.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Τέσσερα βήματα, και το τρίτο γίνεται μόνο μία φορά.',
    flow: [
      ['REACT UI', 'interval · στόχος'],
      ['IPC', 'προς τον main process'],
      ['powershell.exe', 'ξεκινά μία φορά'],
      ['stdin', 'μία γραμμή ανά κλικ'],
      ['WINDOWS', 'το κλικ προσγειώνεται'],
    ],

    honest: 'Τίμιος απολογισμός',
    honestHeadline: 'Τρία πράγματα για τα οποία δεν πρέπει να επικαλείται κανείς αυτό το repository.',
    honestChant: ['Χωρίς κλήσεις δικτύου.', 'Χωρίς λογαριασμό.', 'Χωρίς telemetry.', 'Χωρίς κόλπα installer.'],
    honestPoints: [
      [
        'Υπάρχει cloud client που δεν κάνει τίποτα',
        'Το scaffold από το οποίο παρήχθη ήρθε με Supabase client, δύο τύπους πινάκων και hook για device ID. Τίποτα δεν τα χρησιμοποιεί — κανένα αρχείο δεν εισάγει τον client, δεν υπάρχει ούτε μία κλήση πίνακα στον κώδικα, και δεν υπάρχει αρχείο περιβάλλοντος να τον στρέψει κάπου. Οπότε δεν στέλνει τίποτα, αλλά μόνο επειδή ποτέ δεν συνδέθηκε. Αυτό είναι πιο αδύναμη υπόσχεση από το να το σβήσεις, και το σβήσιμο είναι η εκκρεμότητα.',
      ],
      [
        'Ο περισσότερος κώδικας δεν είναι δικός μου',
        'Σαράντα εννιά αρχεία component και 3.954 γραμμές ήρθαν με το UI kit. Η ίδια η εφαρμογή είναι δεκαοκτώ αρχεία και 2.421 γραμμές, συν 822 στον main process. Ο παραγμένος κώδικας είναι αληθινός και γλίτωσε αληθινό χρόνο — αλλά το συνολικό line count του repository περιγράφει το kit, όχι το project, και το να το επικαλεστώ θα ήταν παραπλανητικό.',
      ],
      [
        'Έχει τρία ονόματα',
        'Το παράθυρο λέει AutoClicker Pro. Ο φάκελος λέει autoclicker_premium. Αυτή η σελίδα λέει AutoClicker Premium. Δεν έχει μπερδευτεί ποτέ κανείς εκτός από μένα, τη στιγμή που έγραφα τη σελίδα — που είναι ακριβώς η στιγμή που παύει να είναι αθώο.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Μία διεργασία, κρατημένη ανοιχτή. Όλα τα υπόλοιπα είναι πεδία κειμένου.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'το spawn ήταν το bottleneck.',
      'και τα τέσσερα μετρημένα.',
      '200ms interval, 200ms εκκίνηση.',
      'δύο πλήκτρα εξόδου. πάντα.',
      'πλήρωσε το κόστος μία φορά.',
      'ο cloud client δεν κάνει τίποτα.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/autoclicker-premium/`

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

function AclSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`acl-section ${className}`} aria-labelledby={id}>
      <div className="acl-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="acl-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="acl-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Gauge, Crosshair, Shuffle, Keyboard]
const RUNSPACE_ICONS = [Zap, Terminal, Layers, OctagonX]

export function AutoClickerCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const app = useShot(SHOTS.app.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = { app }

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
    <div className="page acl" data-accent="blue">
      <div className="container acl__container cs-scope">
        <Link className="acl__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="acl-hero">
          <Reveal className="acl-hero__copy">
            <div className="acl-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="acl-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              {p.version && <span className="acl-hero__ver">v{p.version}</span>}
            </div>
            <h1>
              AUTO
              <span className="acl-hero__line2">CLICKER</span>
            </h1>
            <p className="acl-hero__tagline">{c.tagline}</p>
            <p className="acl-hero__summary">{tr(p.summary)}</p>
            <div className="acl-hero__actions">
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

          {/* the device: the interval row, four fields as the app splits them */}
          <Reveal className="acl-interval" delay={90}>
            <p className="acl-interval__title">
              <Gauge aria-hidden="true" /> Click Interval
            </p>
            <div className="acl-interval__row" aria-hidden="true">
              {[
                ['0', 'HOURS'],
                ['0', 'MINS'],
                ['0', 'SECS'],
                ['200', 'MILLIS'],
              ].map(([v, k]) => (
                <div className="acl-field" key={k}>
                  <b>{v}</b>
                  <span>{k}</span>
                </div>
              ))}
            </div>
            <div className="acl-keys" aria-hidden="true">
              <span className="acl-key acl-key--go">F6</span>
              <span>start / stop</span>
              <span className="acl-key acl-key--stop">F7</span>
              <span>emergency</span>
            </div>
          </Reveal>

          <span className="cs-note cs-note--to-r acl-note acl-note--hero">{c.notes[0]}</span>
        </header>

        <AclSection
          id="acl-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="acl-section--tight"
        >
          <dl className="acl-stats">
            {p.metrics?.map((m) => (
              <div className="acl-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="acl-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l acl-note acl-note--metrics">{c.notes[1]}</span>
        </AclSection>

        <AclSection
          id="acl-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="acl-section--premise"
        >
          <Reveal className="acl-premise">
            <p className="acl-premise__lead">{c.premiseLead}</p>
            <p className="acl-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r acl-note acl-note--premise">{c.notes[2]}</span>
        </AclSection>

        {gallery.length > 0 && (
          <AclSection
            id="acl-output"
            label={c.output}
            aside={c.outputNote}
            className="acl-section--output acl-section--tinted"
          >
            <div className="acl-gallery">
              {gallery.map((key, i) => (
                <Reveal className="acl-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="acl-frame__btn"
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
                    <span className="acl-frame__expand">{c.expand}</span>
                  </button>
                  <p className="acl-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
          </AclSection>
        )}

        <AclSection
          id="acl-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="acl-section--pillars"
        >
          <SwipeHint className="acl-swipe" />
          <div className="acl-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Gauge
              return (
                <Reveal className="acl-pillar" delay={i * 60} key={pillar.title}>
                  <span className="acl-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-l acl-note acl-note--pillars">{c.notes[3]}</span>
        </AclSection>

        <AclSection
          id="acl-runspace"
          label={c.runspace}
          aside={c.runspaceNote}
          className="acl-section--runspace acl-section--tinted"
        >
          <Reveal className="acl-statement" as="p">
            {c.runspaceLead}
          </Reveal>

          <SwipeHint className="acl-swipe" />
          <div className="acl-runspaces">
            {c.runspaceCards.map((card, i) => {
              const Icon = RUNSPACE_ICONS[i] ?? Zap
              return (
                <Reveal className="acl-runspace" delay={i * 60} key={card.problem}>
                  <span className="acl-runspace__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="acl-runspace__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="acl-runspace__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-r acl-note acl-note--runspace">{c.notes[4]}</span>
        </AclSection>

        {p.challenges && (
          <AclSection id="acl-hard" label={c.hard} aside={c.hardNote} className="acl-section--hard">
            <SwipeHint className="acl-swipe" />
            <ol className="acl-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="acl-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </AclSection>
        )}

        <AclSection id="acl-how" label={c.how} aside={c.howNote} className="acl-section--how">
          <SwipeHint className="acl-swipe" />
          <Reveal className="acl-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="acl-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="acl-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </AclSection>

        <AclSection
          id="acl-honest"
          label={c.honest}
          className="acl-section--honest acl-section--tinted"
        >
          <Reveal className="acl-verdict">
            <p>{c.honestHeadline}</p>
            <ul className="acl-chant">
              {c.honestChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="acl-swipe" />
          <div className="acl-points">
            {c.honestPoints.map(([title, body], i) => (
              <Reveal className="acl-point" delay={i * 60} key={title}>
                <span className="acl-point__icon" aria-hidden="true">
                  {i === 0 ? <CloudOff /> : i === 1 ? <Layers /> : <Tags />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l acl-note acl-note--honest">{c.notes[5]}</span>
        </AclSection>

        <div className="acl-endgrid">
          {p.lessons && (
            <AclSection id="acl-lessons" label={c.lessons} className="acl-section--panel">
              <SwipeHint className="acl-swipe" />
              <ul className="acl-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </AclSection>
          )}

          <AclSection id="acl-stack" label={c.stack} className="acl-section--panel">
            <div className="acl-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="acl-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </AclSection>
        </div>

        <Reveal className="acl-finale" as="section">
          <p>{c.finale}</p>
          <div className="acl-finale__actions" aria-label={c.links}>
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
          <nav className="acl-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="acl-nav__copy">
                <span className="acl-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="acl-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="acl-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="acl-nav__copy">
                <span className="acl-nav__label">
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
            className="acl-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="acl-zoom__close"
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
