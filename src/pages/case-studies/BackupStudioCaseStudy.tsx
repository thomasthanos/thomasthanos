import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileStack,
  FolderMinus,
  Github,
  GitCompare,
  HardDriveDownload,
  KeyRound,
  Package,
  ShieldQuestion,
  Timer,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/backup-studio.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/* Captures are wired but not shipped yet — each shot is probed on mount, so the section stays
   hidden until the matching .webp exists and appears on its own once it does. */
const SHOTS = {
  home: { file: 'home', w: 1476, h: 1024 },
  backups: { file: 'backups', w: 1891, h: 1257 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['home', 'backups']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Desktop app · Windows',
    tagline: 'Git protects what you committed. This protects the three days you did not.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '5,471 lines in total · 3,032 of them stylesheet, 1,210 in one JSX file, 962 in the main process · 23 IPC handlers, no bundler, no API key',

    premise: 'The premise',
    premiseNote: 'The whole reason it exists.',
    premiseLead: 'Git protects committed work. Nothing protects the rest.',
    premiseBody:
      'Every project has a window between the last commit and the next one where the only copy of your work is on one disk. That window is usually a few days long and it is exactly where drives like to fail. This does not try to be a version control system or a cloud service — it zips the folder, drops it somewhere that already syncs, and names it so you can find the right one later.',

    output: 'Real output',
    outputNote: 'The app, in its two views.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      home: 'The project grid: nine projects, each with its backup count.',
      backups: 'One backup, with its version, day, size and the project’s latest GitHub release below it.',
    } as Record<ShotKey, string>,

    pillars: 'What it does',
    pillarsNote: 'Four jobs, none of which need an account.',
    pillarList: [
      {
        title: 'Archives on demand',
        body: 'You press the button. There is no schedule and no daemon.',
        lines: [
          'named by project, day of month and version',
          'Github-Build-Release_D18_V4 reads at a glance',
          'the day number makes duplicates within a month obvious',
        ],
      },
      {
        title: 'Skips what rebuilds',
        body: 'Five directories never enter an archive.',
        lines: [
          'node_modules, dist, .git, __pycache__, release',
          'a 200MB project becomes a 900KB archive',
          'small enough that running it stays a habit',
        ],
      },
      {
        title: 'Compares two versions',
        body: 'A full file-level diff, rendered in the window.',
        lines: [
          'pick any two backups of the same project',
          'diff2html renders it like a pull request',
          'you see what changed before you go digging',
        ],
      },
      {
        title: 'Watches the client',
        body: 'The one thing that can silently break the sync.',
        lines: [
          'the sidebar shows whether Dropbox is running',
          'a button starts it if it is not',
          'the failure surfaces instead of hiding',
        ],
      },
    ],

    nodropbox: 'It never talks to Dropbox',
    nodropboxNote: 'The decision the whole tool rests on.',
    nodropboxLead:
      'The obvious way to build this is an OAuth flow, a stored token, a refresh cycle and an upload queue. This app does none of it. It reads the Dropbox client’s own configuration file to learn where your Dropbox folder lives, writes a zip into it, and stops. The syncing was already solved by software running on the machine — the only part worth building was finding it.',
    nodropboxCards: [
      {
        problem: 'An integration is a liability',
        answer: 'Do not write one',
        body:
          'No API key, no OAuth screen, no token in a config file, no refresh logic and no scopes to get wrong. There is no credential in this app because there is no account in this app. It writes a file to a path.',
      },
      {
        problem: 'Where is the Dropbox folder?',
        answer: 'Ask the client',
        body:
          'It reads info.json from the Dropbox client’s own AppData directory — the file Dropbox keeps to record where it put your folder. That is a supported, stable place to look, and it works regardless of where you chose to install it.',
      },
      {
        problem: 'The config has to travel too',
        answer: 'Put it in the same folder',
        body:
          'Backing up projects is half the job; the second machine also needs to know which projects are in the set. The config file goes into the Dropbox folder next to the archives, so it arrives on its own. If it ever goes missing, the app rebuilds the list by reading the backup folders that already exist.',
      },
      {
        problem: 'Somebody else owns the sync',
        answer: 'Show their status',
        body:
          'Delegating the hard part means inheriting one failure mode: the client not running. So its state sits in the sidebar with a button to launch it, because a backup tool that quietly stopped backing up is worse than no backup tool.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'Four decisions, and what each one cost.',
    hardMore: 'Technical detail',
    hardShort: [
      'Source folders are mostly rebuildable noise, and archives have to stay small enough to run often.',
      'The project list has to reach the second machine on its own, or it is not really a backup.',
      'The obvious Dropbox integration was an OAuth flow. The real one was a file path.',
      'The renderer is one JSX file that no bundler ever touches.',
    ],

    how: 'How it’s built',
    howNote: 'Five steps, and the last one is somebody else’s software.',
    flow: [
      ['PROJECT FOLDER', 'the source'],
      ['SKIP 5 DIRS', 'rebuildable'],
      ['ZIP', '_D18_V4'],
      ['DROPBOX FOLDER', 'a local path'],
      ['THEIR CLIENT', 'does the sync'],
    ],

    honest: 'Honest accounting',
    honestHeadline: 'Three things this app does not do.',
    honestChant: ['No account.', 'No token.', 'No telemetry.', 'No upload.'],
    honestPoints: [
      [
        'There is no restore',
        'It archives, it lists, it compares — and it never puts a version back. There is no restore handler and no extraction code anywhere in it. When I need an old file I open the folder and unzip it by hand, like anyone would. Recovery deserves the same attention as capture and has not had it yet; this is the outstanding job on the project.',
      ],
      [
        'There is no schedule',
        'Backups happen when you press the button. There is no timer, no daemon and no background job — which means the tool only protects you as often as you remember it exists. That is a real weakness for something whose entire purpose is catching the disk failure you did not plan for.',
      ],
      [
        'The renderer is transpiled at runtime',
        'Babel standalone ships as a runtime dependency and compiles the 1,210-line JSX file in the browser every time the window opens. It removed a whole toolchain from a project that did not need one, and it costs startup time on every launch. For a tool opened once a week that trade is fine; for anything else it would not be.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'Zip the folder. Drop it somewhere that already syncs. Name it so you can find it.',
    finaleOther: 'See other projects',

    notes: [
      'the gap between commits.',
      'all four counted.',
      'built the week after i nearly lost it.',
      'nine projects. one window.',
      'none of them need an account.',
      'no api. just a file path.',
      'no restore. yet. i know.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Desktop app · Windows',
    tagline: 'Το Git προστατεύει ό,τι έκανες commit. Αυτό προστατεύει τις τρεις μέρες που δεν έκανες.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '5.471 γραμμές συνολικά · οι 3.032 stylesheet, 1.210 σε ένα αρχείο JSX, 962 στον main process · 23 IPC handlers, χωρίς bundler, χωρίς API key',

    premise: 'Η αφετηρία',
    premiseNote: 'Ο λόγος που υπάρχει.',
    premiseLead: 'Το Git προστατεύει ό,τι έγινε commit. Τίποτα δεν προστατεύει τα υπόλοιπα.',
    premiseBody:
      'Κάθε project έχει ένα παράθυρο ανάμεσα στο τελευταίο commit και στο επόμενο, όπου το μόνο αντίγραφο της δουλειάς σου είναι σε έναν δίσκο. Αυτό το παράθυρο κρατάει συνήθως λίγες μέρες και είναι ακριβώς εκεί που αρέσει στους δίσκους να πεθαίνουν. Δεν προσπαθεί να γίνει version control ή cloud υπηρεσία — ζιπάρει τον φάκελο, τον αφήνει κάπου που ήδη συγχρονίζεται, και τον ονομάζει ώστε να βρεις τον σωστό μετά.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Η εφαρμογή, στις δύο της όψεις.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      home: 'Το πλέγμα project: εννιά projects, το καθένα με τον αριθμό των backup του.',
      backups: 'Ένα backup, με έκδοση, ημέρα, μέγεθος και το τελευταίο GitHub release του project από κάτω.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει',
    pillarsNote: 'Τέσσερις δουλειές, καμία δεν θέλει λογαριασμό.',
    pillarList: [
      {
        title: 'Αρχειοθετεί όποτε ζητήσεις',
        body: 'Πατάς το κουμπί. Δεν υπάρχει πρόγραμμα ούτε daemon.',
        lines: [
          'ονομασία με project, ημέρα μήνα και έκδοση',
          'το Github-Build-Release_D18_V4 διαβάζεται αμέσως',
          'ο αριθμός ημέρας κάνει προφανή τα διπλά μέσα στον μήνα',
        ],
      },
      {
        title: 'Παρακάμπτει ό,τι ξαναχτίζεται',
        body: 'Πέντε κατάλογοι δεν μπαίνουν ποτέ σε archive.',
        lines: [
          'node_modules, dist, .git, __pycache__, release',
          'ένα project 200MB γίνεται archive 900KB',
          'αρκετά μικρό ώστε να παραμένει συνήθεια',
        ],
      },
      {
        title: 'Συγκρίνει δύο εκδόσεις',
        body: 'Πλήρες diff σε επίπεδο αρχείου, μέσα στο παράθυρο.',
        lines: [
          'διαλέγεις δύο backup του ίδιου project',
          'το diff2html το εμφανίζει σαν pull request',
          'βλέπεις τι άλλαξε πριν αρχίσεις να σκαλίζεις',
        ],
      },
      {
        title: 'Παρακολουθεί τον client',
        body: 'Το ένα πράγμα που μπορεί να χαλάσει σιωπηλά το sync.',
        lines: [
          'το sidebar δείχνει αν τρέχει το Dropbox',
          'ένα κουμπί το ξεκινάει αν δεν τρέχει',
          'η αστοχία φαίνεται αντί να κρύβεται',
        ],
      },
    ],

    nodropbox: 'Δεν μιλάει ποτέ στο Dropbox',
    nodropboxNote: 'Η απόφαση πάνω στην οποία στέκεται όλο το εργαλείο.',
    nodropboxLead:
      'Ο προφανής τρόπος να το χτίσεις είναι OAuth flow, αποθηκευμένο token, κύκλος ανανέωσης και ουρά upload. Αυτή η εφαρμογή δεν κάνει τίποτα από αυτά. Διαβάζει το αρχείο ρυθμίσεων του ίδιου του Dropbox client για να μάθει πού ζει ο φάκελός σου, γράφει ένα zip μέσα, και σταματάει. Το sync ήταν ήδη λυμένο από λογισμικό που τρέχει στο μηχάνημα — το μόνο που άξιζε να χτιστεί ήταν να το βρεις.',
    nodropboxCards: [
      {
        problem: 'Ένα integration είναι ευθύνη',
        answer: 'Μη γράψεις κανένα',
        body:
          'Κανένα API key, καμία οθόνη OAuth, κανένα token σε αρχείο config, καμία λογική ανανέωσης και κανένα scope για λάθος. Δεν υπάρχει credential σε αυτή την εφαρμογή επειδή δεν υπάρχει λογαριασμός. Γράφει ένα αρχείο σε ένα path.',
      },
      {
        problem: 'Πού είναι ο φάκελος Dropbox;',
        answer: 'Ρώτα τον client',
        body:
          'Διαβάζει το info.json από τον κατάλογο AppData του ίδιου του Dropbox client — το αρχείο που κρατάει το Dropbox για να θυμάται πού έβαλε τον φάκελό σου. Είναι σταθερό σημείο να κοιτάξεις, και δουλεύει ανεξάρτητα από το πού διάλεξες να το εγκαταστήσεις.',
      },
      {
        problem: 'Πρέπει να ταξιδέψει και το config',
        answer: 'Βάλ᾽ το στον ίδιο φάκελο',
        body:
          'Το backup των projects είναι η μισή δουλειά· το δεύτερο μηχάνημα πρέπει να ξέρει και ποια projects είναι στο σετ. Το αρχείο config πάει στον φάκελο Dropbox δίπλα στα archives, οπότε φτάνει μόνο του. Αν χαθεί, η εφαρμογή ξαναχτίζει τη λίστα διαβάζοντας τους φακέλους backup που ήδη υπάρχουν.',
      },
      {
        problem: 'Το sync το κάνει άλλος',
        answer: 'Δείξε την κατάστασή του',
        body:
          'Το να αναθέσεις το δύσκολο κομμάτι σημαίνει ότι κληρονομείς μία αστοχία: να μην τρέχει ο client. Οπότε η κατάστασή του κάθεται στο sidebar με κουμπί εκκίνησης, επειδή ένα εργαλείο backup που σταμάτησε σιωπηλά να κρατάει backup είναι χειρότερο από κανένα εργαλείο.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τέσσερις αποφάσεις, και τι κόστισε η καθεμία.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Οι φάκελοι πηγής είναι κυρίως θόρυβος που ξαναχτίζεται, και τα archives πρέπει να μένουν μικρά για να τρέχουν συχνά.',
      'Η λίστα project πρέπει να φτάσει μόνη της στο δεύτερο μηχάνημα, αλλιώς δεν είναι πραγματικά backup.',
      'Το προφανές integration για το Dropbox ήταν OAuth flow. Το πραγματικό ήταν ένα path αρχείου.',
      'Ο renderer είναι ένα αρχείο JSX που δεν το αγγίζει ποτέ bundler.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Πέντε βήματα, και το τελευταίο είναι λογισμικό κάποιου άλλου.',
    flow: [
      ['ΦΑΚΕΛΟΣ PROJECT', 'η πηγή'],
      ['ΠΑΡΑΚΑΜΨΗ 5', 'ξαναχτίζονται'],
      ['ZIP', '_D18_V4'],
      ['ΦΑΚΕΛΟΣ DROPBOX', 'τοπικό path'],
      ['Ο CLIENT ΤΟΥΣ', 'κάνει το sync'],
    ],

    honest: 'Τίμιος απολογισμός',
    honestHeadline: 'Τρία πράγματα που αυτή η εφαρμογή δεν κάνει.',
    honestChant: ['Χωρίς λογαριασμό.', 'Χωρίς token.', 'Χωρίς telemetry.', 'Χωρίς upload.'],
    honestPoints: [
      [
        'Δεν υπάρχει restore',
        'Αρχειοθετεί, καταγράφει, συγκρίνει — και ποτέ δεν επαναφέρει έκδοση. Δεν υπάρχει restore handler ούτε κώδικας εξαγωγής πουθενά μέσα. Όταν χρειάζομαι παλιό αρχείο ανοίγω τον φάκελο και κάνω unzip στο χέρι, όπως ο καθένας. Το recovery αξίζει την ίδια προσοχή με την καταγραφή και δεν την είχε ακόμα· είναι η εκκρεμότητα του project.',
      ],
      [
        'Δεν υπάρχει πρόγραμμα',
        'Τα backup γίνονται όταν πατήσεις το κουμπί. Δεν υπάρχει timer, daemon ή background job — που σημαίνει ότι σε προστατεύει τόσο συχνά όσο θυμάσαι ότι υπάρχει. Είναι πραγματική αδυναμία για κάτι που ο σκοπός του είναι να πιάσει τη βλάβη δίσκου που δεν προγραμμάτισες.',
      ],
      [
        'Ο renderer μεταγλωττίζεται στο runtime',
        'Το Babel standalone έρχεται ως runtime dependency και μεταγλωττίζει το αρχείο JSX 1.210 γραμμών στον browser κάθε φορά που ανοίγει το παράθυρο. Αφαίρεσε ολόκληρη toolchain από project που δεν τη χρειαζόταν, και κοστίζει χρόνο εκκίνησης σε κάθε άνοιγμα. Για εργαλείο που ανοίγει μία φορά τη βδομάδα το αντάλλαγμα είναι εντάξει· για οτιδήποτε άλλο δεν θα ήταν.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Ζιπάρεις τον φάκελο. Τον αφήνεις κάπου που ήδη συγχρονίζεται. Τον ονομάζεις για να τον βρεις.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'το κενό ανάμεσα στα commit.',
      'και τα τέσσερα μετρημένα.',
      'φτιάχτηκε την εβδομάδα μετά.',
      'εννιά projects. ένα παράθυρο.',
      'κανένα δεν θέλει λογαριασμό.',
      'χωρίς api. σκέτο path.',
      'δεν έχει restore. ακόμα. το ξέρω.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/backup-studio/`

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

function BksSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`bks-section ${className}`} aria-labelledby={id}>
      <div className="bks-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="bks-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="bks-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Package, FolderMinus, GitCompare, Activity]
const NODROPBOX_ICONS = [KeyRound, FileStack, HardDriveDownload, Activity]

export function BackupStudioCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const home = useShot(SHOTS.home.file)
  const backups = useShot(SHOTS.backups.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = { home, backups }

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
    <div className="page bks" data-accent="blue">
      <div className="container bks__container cs-scope">
        <Link className="bks__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="bks-hero">
          <Reveal className="bks-hero__copy">
            <div className="bks-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="bks-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              {p.version && <span className="bks-hero__ver">v{p.version}</span>}
            </div>
            <h1>
              BACKUP
              <span className="bks-hero__line2">STUDIO</span>
            </h1>
            <p className="bks-hero__tagline">{c.tagline}</p>
            <p className="bks-hero__summary">{tr(p.summary)}</p>
            <div className="bks-hero__actions">
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

          {/* the device: one archive, named the way the app names it */}
          <Reveal className="bks-card" delay={90}>
            <p className="bks-card__name">Github-Build-Release_D18_V4</p>
            <div className="bks-chips" aria-hidden="true">
              <span className="bks-chip bks-chip--v">Version 4</span>
              <span className="bks-chip bks-chip--d">Day 18</span>
              <span className="bks-chip bks-chip--star">★ Τελευταίο</span>
            </div>
            <dl className="bks-card__rows">
              {[
                ['SOURCE', 'Projects\\Github-Build-Release'],
                ['DEST', 'Dropbox\\Projects Backup\\…'],
                ['SIZE', '927.51 KB'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <span className="cs-note cs-note--to-r bks-note bks-note--hero">{c.notes[0]}</span>
        </header>

        <BksSection
          id="bks-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="bks-section--tight"
        >
          <dl className="bks-stats">
            {p.metrics?.map((m) => (
              <div className="bks-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="bks-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l bks-note bks-note--metrics">{c.notes[1]}</span>
        </BksSection>

        <BksSection
          id="bks-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="bks-section--premise"
        >
          <Reveal className="bks-premise">
            <p className="bks-premise__lead">{c.premiseLead}</p>
            <p className="bks-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r bks-note bks-note--premise">{c.notes[2]}</span>
        </BksSection>

        {gallery.length > 0 && (
          <BksSection
            id="bks-output"
            label={c.output}
            aside={c.outputNote}
            className="bks-section--output bks-section--tinted"
          >
            <SwipeHint className="bks-swipe" />
            <div className="bks-gallery">
              {gallery.map((key, i) => (
                <Reveal className="bks-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="bks-frame__btn"
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
                    <span className="bks-frame__expand">{c.expand}</span>
                  </button>
                  <p className="bks-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
            <span className="cs-note cs-note--to-l bks-note bks-note--output">{c.notes[3]}</span>
          </BksSection>
        )}

        <BksSection
          id="bks-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="bks-section--pillars"
        >
          <SwipeHint className="bks-swipe" />
          <div className="bks-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Package
              return (
                <Reveal className="bks-pillar" delay={i * 60} key={pillar.title}>
                  <span className="bks-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-r bks-note bks-note--pillars">{c.notes[4]}</span>
        </BksSection>

        <BksSection
          id="bks-nodropbox"
          label={c.nodropbox}
          aside={c.nodropboxNote}
          className="bks-section--nodropbox bks-section--tinted"
        >
          <Reveal className="bks-statement" as="p">
            {c.nodropboxLead}
          </Reveal>

          <SwipeHint className="bks-swipe" />
          <div className="bks-nodropboxes">
            {c.nodropboxCards.map((card, i) => {
              const Icon = NODROPBOX_ICONS[i] ?? KeyRound
              return (
                <Reveal className="bks-nodropbox" delay={i * 60} key={card.problem}>
                  <span className="bks-nodropbox__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="bks-nodropbox__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="bks-nodropbox__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-l bks-note bks-note--nodropbox">{c.notes[5]}</span>
        </BksSection>

        {p.challenges && (
          <BksSection id="bks-hard" label={c.hard} aside={c.hardNote} className="bks-section--hard">
            <SwipeHint className="bks-swipe" />
            <ol className="bks-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="bks-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </BksSection>
        )}

        <BksSection id="bks-how" label={c.how} aside={c.howNote} className="bks-section--how">
          <SwipeHint className="bks-swipe" />
          <Reveal className="bks-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="bks-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="bks-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </BksSection>

        <BksSection
          id="bks-honest"
          label={c.honest}
          className="bks-section--honest bks-section--tinted"
        >
          <Reveal className="bks-verdict">
            <p>{c.honestHeadline}</p>
            <ul className="bks-chant">
              {c.honestChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="bks-swipe" />
          <div className="bks-points">
            {c.honestPoints.map(([title, body], i) => (
              <Reveal className="bks-point" delay={i * 60} key={title}>
                <span className="bks-point__icon" aria-hidden="true">
                  {i === 0 ? <ShieldQuestion /> : i === 1 ? <Timer /> : <Package />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l bks-note bks-note--honest">{c.notes[6]}</span>
        </BksSection>

        <div className="bks-endgrid">
          {p.lessons && (
            <BksSection id="bks-lessons" label={c.lessons} className="bks-section--panel">
              <SwipeHint className="bks-swipe" />
              <ul className="bks-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </BksSection>
          )}

          <BksSection id="bks-stack" label={c.stack} className="bks-section--panel">
            <div className="bks-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.privacy && (
              <p className="bks-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.privacy)}
              </p>
            )}
          </BksSection>
        </div>

        <Reveal className="bks-finale" as="section">
          <p>{c.finale}</p>
          <div className="bks-finale__actions" aria-label={c.links}>
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
          <nav className="bks-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="bks-nav__copy">
                <span className="bks-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="bks-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="bks-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="bks-nav__copy">
                <span className="bks-nav__label">
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
            className="bks-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="bks-zoom__close"
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
