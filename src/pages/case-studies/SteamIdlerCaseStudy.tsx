import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  ExternalLink,
  Eye,
  Github,
  HardDrive,
  KeyRound,
  LayoutDashboard,
  Package,
  Scissors,
  ShieldAlert,
  Trophy,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/steam-idler.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/* Captures are wired but not yet shipped — every shot below is guarded by useShot,
   so each section simply omits itself until the matching .webp exists. */
const SHOTS = {
  hero: { file: 'app', w: 1280, h: 800 },
  games: { file: 'games', w: 1280, h: 800 },
  achievements: { file: 'achievements', w: 1280, h: 800 },
  idle: { file: 'idle', w: 1280, h: 800 },
  settings: { file: 'settings', w: 1280, h: 800 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['games', 'achievements', 'idle', 'settings']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Desktop app · Souvlatzidiko Unlocker',
    tagline: 'Unlock the achievements you earned emotionally but never quite managed technically.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '9,711 lines of TypeScript across 36 files · 4,082 in the main process, 5,205 in the renderer · zero TODO, FIXME or HACK markers in any of it',

    premise: 'The premise',
    premiseNote: 'The entire product, in one sentence.',
    premiseLead: 'Every tool in this space works and looks like a hostage note.',
    premiseBody:
      'The functionality here was solved a decade ago. Steam Achievement Manager does the job and has done it for years. What nobody solved was the experience — the grey dialogs, the untranslated buttons, the list that loads for nine seconds and then shows you nothing. This is the project where I let myself care about the interface first and reverse-engineer the plumbing second.',

    output: 'Real output',
    outputNote: 'Captures of the running app.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      hero: 'The app, running.',
      games: 'The library, read from local Steam manifests rather than a Web API.',
      achievements: 'Per-game achievements, unlockable and re-lockable.',
      idle: 'An idle session across several titles at once.',
      settings: 'Settings: auto-idle, auto-invisible, and what happens when a real game launches.',
    } as Record<ShotKey, string>,

    pillars: 'What it actually does',
    pillarsNote: 'Three jobs, none of which launch a game.',
    pillarList: [
      {
        title: 'Unlocks and re-locks',
        body: 'A per-game achievement list you can write to in both directions.',
        lines: [
          'achievement schema from the free public Steam Web API',
          'writes gated on the stats callback, not a blind timer',
          're-locking is a first-class action, not a footnote',
        ],
      },
      {
        title: 'Idles without launching',
        body: 'Playtime accrues without a single game window opening.',
        lines: [
          'one child process per title, SteamAppId set on each',
          'sw.init(appId) is what Steam reads as “currently playing”',
          'the main process deliberately never init()s Spacewar',
        ],
      },
      {
        title: 'Keeps you invisible',
        body: 'Presence flips before the first worker announces itself.',
        lines: [
          'switched through the steam:// protocol, not a second session',
          'previous state read from localconfig.vdf, then persisted',
          'restored first on shutdown, while the session is still alive',
        ],
      },
      {
        title: 'Opens on something useful',
        body: 'The home page is a dashboard, not a menu.',
        lines: [
          'total playtime, achievement percentage, game count',
          'a ranked Most Played list with bars',
          'live store deals behind a five-minute cache',
        ],
      },
    ],

    isolation: 'Nothing native runs in the window',
    isolationNote: 'The whole architecture is one idea, applied four times.',
    isolationLead:
      'steamworks.js is a native binding, and native bindings fault. A bad AppID, a Steam client that quit mid-call, a stats request that never returns — in a normal Electron app every one of those takes the window down with it. So none of it runs in the window. It runs in a child process that is allowed to die.',
    isolationCards: [
      {
        problem: 'A native addon can fault',
        answer: 'Give it its own process',
        body:
          'The worker is spawned as a separate child process — the Electron binary re-run as plain Node, with SteamAppId set in its environment. It talks to the main process over newline-delimited JSON on stdin and stdout, which is about as small an interface as two processes can share. When it dies, it dies alone, and the window never notices.',
      },
      {
        problem: 'Two callers, two workers',
        answer: 'Hold the spawn behind a mutex',
        body:
          'Clicking two games quickly used to start two workers for the same account, which Steam resolves by logging one of them out. The spawn is now wrapped in a stored promise: whoever arrives second waits on the first instead of starting its own. It is four lines and it removed an entire category of bug report.',
      },
      {
        problem: 'Children outlive the kill',
        answer: 'Kill the whole tree',
        body:
          'A native addon can spawn children of its own, and those do not care that you killed their parent — they linger, holding the AppID, so the next idle session starts against a ghost. Termination goes through tree-kill with SIGKILL so the entire process tree goes, not just the pid that was convenient to remember.',
      },
      {
        problem: 'asar cannot load a .node',
        answer: 'Unpack the binding',
        body:
          'Electron packs the app into an asar archive, and a native binding cannot be loaded from inside one. Both the bundled worker and the whole of steamworks.js are listed in asarUnpack, and the worker path is resolved against the unpacked directory at runtime rather than assumed.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'The parts that were genuinely hard.',
    hardMore: 'Technical detail',
    hardShort: [
      'Native bindings fault, so the one that talks to Steam is not allowed anywhere near the window.',
      'The main process, the worker and the renderer each need a different compiler, and still one command.',
      'Steam is not always installed where you expect, and is not always running at all.',
      'Going invisible has to beat your own workers to the announcement.',
    ],

    how: 'How it’s built',
    howNote: 'Left to right, and the only network call is a schema lookup.',
    flow: [
      ['steamapps/*.acf', 'local disk'],
      ['MAIN PROCESS', 'registry · parse'],
      ['JSON-LINES', 'stdin · stdout'],
      ['WORKER', 'SteamAppId · sw.init'],
      ['STEAM', 'shows as playing'],
    ],

    honesty: 'What it touches',
    honestyHeadline: 'No password ever reaches this app.',
    honestyChant: ['No password.', 'No account server.', 'No telemetry.', 'No launcher.'],
    honestyPoints: [
      [
        'Works before it asks for anything',
        'Steam is located through the Windows registry, and your installed games are parsed out of the steamapps/*.acf manifests with a hand-written reader for Valve’s KeyValue format. That layer needs no key, no login and no network — it is just your own disk, read back to you.',
      ],
      [
        'What a key buys you',
        'Adding a Steam Web API key upgrades the list from installed games to your full owned library, with playtime and achievement counts fetched in chunked passes. The key is yours, it is stored locally, and it is sent to nobody but Steam. The store rows on the home page come from Steam’s own public endpoints and identify no one.',
      ],
      [
        'One honest caveat',
        'The refresh token is written to the settings file base64-encoded, and base64 is not encryption — anyone with read access to your profile directory can decode it. Electron ships safeStorage for exactly this and I have not wired it up yet. It is the one thing on this page I would not call finished.',
      ],
    ],
    endpointsTitle: 'Every host the app contacts',
    endpoints: [
      ['api.steampowered.com', 'achievement schemas — the free public endpoint'],
      ['cdn.cloudflare.steamstatic.com', 'cover art and game images'],
      ['steamcommunity.com · store.steampowered.com', 'profile details and store links'],
      ['api.github.com · github.com', 'update checks and releases'],
      ['steam:// (local)', 'presence changes, handled by the Steam client itself'],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'The window stays up. The worker is the one allowed to die.',
    finaleOther: 'See other projects',

    notes: [
      'earned emotionally. unlocked technically.',
      'all four counted, not guessed.',
      'the UI was the actual project.',
      'no game window ever opens.',
      'one idea, four times.',
      'read the caveat. it is real.',
      'base64 is not encryption.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Desktop app · Souvlatzidiko Unlocker',
    tagline: 'Ξεκλείδωσε τα achievements που κέρδισες ψυχολογικά αλλά ποτέ τεχνικά.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '9.711 γραμμές TypeScript σε 36 αρχεία · 4.082 στον main process, 5.205 στον renderer · μηδέν TODO, FIXME ή HACK σε καμία από αυτές',

    premise: 'Η αφετηρία',
    premiseNote: 'Όλο το προϊόν, σε μία πρόταση.',
    premiseLead: 'Κάθε εργαλείο στον χώρο δουλεύει, αλλά μοιάζει με σημείωμα απαγωγής.',
    premiseBody:
      'Η λειτουργικότητα εδώ λύθηκε πριν από μια δεκαετία. Το Steam Achievement Manager κάνει τη δουλειά, και την κάνει χρόνια. Αυτό που δεν έλυσε κανείς ήταν η εμπειρία — οι γκρίζοι διάλογοι, τα αμετάφραστα κουμπιά, η λίστα που φορτώνει εννιά δευτερόλεπτα και μετά δεν σου δείχνει τίποτα. Εδώ άφησα τον εαυτό μου να νοιαστεί πρώτα για το interface και μετά για τα σωληνάκια.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Στιγμιότυπα από την εφαρμογή σε λειτουργία.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      hero: 'Η εφαρμογή σε λειτουργία.',
      games: 'Η βιβλιοθήκη, διαβασμένη από τοπικά manifests του Steam αντί για Web API.',
      achievements: 'Achievements ανά παιχνίδι, με unlock και re-lock.',
      idle: 'Ένα idle session σε πολλούς τίτλους ταυτόχρονα.',
      settings: 'Ρυθμίσεις: auto-idle, auto-invisible, και τι γίνεται όταν ανοίξει αληθινό παιχνίδι.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει στ᾽ αλήθεια',
    pillarsNote: 'Τρεις δουλειές, καμία δεν ανοίγει παιχνίδι.',
    pillarList: [
      {
        title: 'Ξεκλειδώνει και ξανακλειδώνει',
        body: 'Λίστα achievements ανά παιχνίδι, με εγγραφή και προς τις δύο κατευθύνσεις.',
        lines: [
          'schema achievements από το δωρεάν δημόσιο Steam Web API',
          'οι εγγραφές περιμένουν το callback των stats, όχι χρονόμετρο',
          'το re-lock είναι κανονική ενέργεια, όχι υποσημείωση',
        ],
      },
      {
        title: 'Κάνει idle χωρίς να ανοίγει τίποτα',
        body: 'Ο χρόνος παιχνιδιού μαζεύεται χωρίς να ανοίξει ούτε ένα παράθυρο.',
        lines: [
          'μία child process ανά τίτλο, με SteamAppId στην καθεμία',
          'το sw.init(appId) είναι αυτό που διαβάζει το Steam ως «παίζει τώρα»',
          'ο main process επίτηδες δεν κάνει ποτέ init το Spacewar',
        ],
      },
      {
        title: 'Σε κρατάει invisible',
        body: 'Η παρουσία αλλάζει πριν προλάβει ο πρώτος worker.',
        lines: [
          'αλλάζει μέσω του πρωτοκόλλου steam://, όχι δεύτερου session',
          'η προηγούμενη κατάσταση διαβάζεται από το localconfig.vdf',
          'επαναφέρεται πρώτη στο κλείσιμο, όσο ζει ακόμα το session',
        ],
      },
      {
        title: 'Ανοίγει σε κάτι χρήσιμο',
        body: 'Η αρχική είναι dashboard, όχι μενού.',
        lines: [
          'συνολικός χρόνος, ποσοστό achievements, αριθμός παιχνιδιών',
          'κατάταξη Most Played με μπάρες',
          'ζωντανές προσφορές του store πίσω από cache πέντε λεπτών',
        ],
      },
    ],

    isolation: 'Τίποτα native δεν τρέχει στο παράθυρο',
    isolationNote: 'Όλη η αρχιτεκτονική είναι μία ιδέα, εφαρμοσμένη τέσσερις φορές.',
    isolationLead:
      'Το steamworks.js είναι native binding, και τα native bindings σκάνε. Ένα κακό AppID, ένας Steam client που έκλεισε στη μέση, ένα request stats που δεν γυρνάει ποτέ — σε ένα κανονικό Electron app καθένα από αυτά ρίχνει μαζί του και το παράθυρο. Οπότε τίποτα από αυτά δεν τρέχει στο παράθυρο. Τρέχει σε μια child process που της επιτρέπεται να πεθάνει.',
    isolationCards: [
      {
        problem: 'Ένα native addon σκάει',
        answer: 'Δώσ᾽ του δική του διεργασία',
        body:
          'Ο worker ξεκινάει ως ξεχωριστή child process — το ίδιο το binary του Electron ξανατρεγμένο ως σκέτος Node, με SteamAppId στο περιβάλλον του. Μιλάει με τον main process με JSON ανά γραμμή σε stdin και stdout, που είναι περίπου το μικρότερο interface που μπορούν να μοιραστούν δύο διεργασίες. Όταν πεθαίνει, πεθαίνει μόνος, και το παράθυρο δεν το παίρνει καν είδηση.',
      },
      {
        problem: 'Δύο κλήσεις, δύο workers',
        answer: 'Κλείδωσε το spawn σε mutex',
        body:
          'Δύο γρήγορα κλικ σε παιχνίδια ξεκινούσαν δύο workers για τον ίδιο λογαριασμό, κάτι που το Steam το λύνει πετώντας έξω τον έναν. Πλέον το spawn είναι τυλιγμένο σε αποθηκευμένο promise: όποιος έρθει δεύτερος περιμένει τον πρώτο αντί να ξεκινήσει δικό του. Είναι τέσσερις γραμμές και εξαφάνισε μια ολόκληρη κατηγορία bug report.',
      },
      {
        problem: 'Τα παιδιά επιζούν του kill',
        answer: 'Σκότωσε όλο το δέντρο',
        body:
          'Ένα native addon μπορεί να φτιάξει δικά του παιδιά, και αυτά αδιαφορούν που σκότωσες τον γονιό τους — μένουν, κρατώντας το AppID, οπότε το επόμενο idle session ξεκινάει πάνω σε φάντασμα. Ο τερματισμός περνάει από tree-kill με SIGKILL ώστε να φύγει όλο το δέντρο διεργασιών, όχι μόνο το pid που θυμόμασταν.',
      },
      {
        problem: 'Το asar δεν φορτώνει .node',
        answer: 'Βγάλ᾽ το από το πακέτο',
        body:
          'Το Electron πακετάρει την εφαρμογή σε αρχείο asar, και ένα native binding δεν φορτώνεται από μέσα. Τόσο ο bundled worker όσο και ολόκληρο το steamworks.js είναι δηλωμένα στο asarUnpack, και το path του worker υπολογίζεται στο runtime πάνω στον unpacked φάκελο αντί να θεωρείται δεδομένο.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τα κομμάτια που ήταν όντως δύσκολα.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Τα native bindings σκάνε, οπότε αυτό που μιλάει στο Steam δεν πλησιάζει καν το παράθυρο.',
      'Ο main process, ο worker και ο renderer θέλουν διαφορετικό compiler ο καθένας — και πάλι μία εντολή.',
      'Το Steam δεν είναι πάντα εκεί που το περιμένεις, ούτε πάντα ανοιχτό.',
      'Το invisible πρέπει να προλάβει τους ίδιους σου τους workers.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Από αριστερά προς τα δεξιά, και η μόνη δικτυακή κλήση είναι ένα schema lookup.',
    flow: [
      ['steamapps/*.acf', 'τοπικός δίσκος'],
      ['MAIN PROCESS', 'registry · parse'],
      ['JSON-LINES', 'stdin · stdout'],
      ['WORKER', 'SteamAppId · sw.init'],
      ['STEAM', 'δείχνει «παίζει»'],
    ],

    honesty: 'Τι αγγίζει',
    honestyHeadline: 'Κανένας κωδικός δεν φτάνει ποτέ σε αυτή την εφαρμογή.',
    honestyChant: ['Χωρίς κωδικό.', 'Χωρίς server λογαριασμών.', 'Χωρίς telemetry.', 'Χωρίς launcher.'],
    honestyPoints: [
      [
        'Δουλεύει πριν ζητήσει οτιδήποτε',
        'Το Steam εντοπίζεται μέσω του registry των Windows, και τα εγκατεστημένα παιχνίδια σου βγαίνουν από τα manifests steamapps/*.acf με parser γραμμένο στο χέρι για τη μορφή KeyValue της Valve. Αυτό το στρώμα δεν θέλει key, ούτε login, ούτε δίκτυο — είναι απλώς ο δικός σου δίσκος, διαβασμένος πίσω σε σένα.',
      ],
      [
        'Τι σου αγοράζει ένα key',
        'Ένα Steam Web API key αναβαθμίζει τη λίστα από τα εγκατεστημένα σε ολόκληρη τη βιβλιοθήκη σου, με playtime και achievement counts σε chunked περάσματα. Το key είναι δικό σου, αποθηκεύεται τοπικά, και δεν στέλνεται σε κανέναν πέρα από το Steam. Οι σειρές του store στην αρχική έρχονται από τα δημόσια endpoints του Steam και δεν ταυτοποιούν κανέναν.',
      ],
      [
        'Ένας τίμιος αστερίσκος',
        'Το refresh token γράφεται στο αρχείο ρυθμίσεων κωδικοποιημένο σε base64, και το base64 δεν είναι κρυπτογράφηση — όποιος διαβάζει τον φάκελο του προφίλ σου μπορεί να το αποκωδικοποιήσει. Το Electron έχει safeStorage ακριβώς γι᾽ αυτό και δεν το έχω συνδέσει ακόμα. Είναι το μόνο πράγμα σε αυτή τη σελίδα που δεν θα έλεγα τελειωμένο.',
      ],
    ],
    endpointsTitle: 'Κάθε host που καλεί η εφαρμογή',
    endpoints: [
      ['api.steampowered.com', 'schemas achievements — το δωρεάν δημόσιο endpoint'],
      ['cdn.cloudflare.steamstatic.com', 'covers και εικόνες παιχνιδιών'],
      ['steamcommunity.com · store.steampowered.com', 'στοιχεία προφίλ και σύνδεσμοι store'],
      ['api.github.com · github.com', 'έλεγχος ενημερώσεων και releases'],
      ['steam:// (τοπικό)', 'αλλαγές παρουσίας, από τον ίδιο τον Steam client'],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Το παράθυρο μένει όρθιο. Ο worker είναι αυτός που επιτρέπεται να πεθάνει.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'κερδισμένα ψυχολογικά. ξεκλείδωτα τεχνικά.',
      'και τα τέσσερα μετρημένα.',
      'το UI ήταν το πραγματικό project.',
      'κανένα παράθυρο παιχνιδιού δεν ανοίγει.',
      'μία ιδέα, τέσσερις φορές.',
      'διάβασε τον αστερίσκο. ισχύει.',
      'το base64 δεν είναι κρυπτογράφηση.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/steam-idler/`

/* Captures for this project are not shipped yet. The <img> guards alone are not enough here:
   gallery shots are lazy and below the fold, so a missing file never loads, never fires onError,
   and the section would hold open a void. Probe for the file up front instead — the section stays
   hidden until the .webp actually exists, and lights up on its own once it does. */
function useShot(file: string) {
  const src = `${ASSETS}${file}.webp`
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    let cancelled = false
    const miss = () => !cancelled && setBroken(true)
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        // A SPA host can answer a missing path with 200 + index.html, so check the type too.
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

function StiSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`sti-section ${className}`} aria-labelledby={id}>
      <div className="sti-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="sti-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="sti-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const ISOLATION_ICONS = [Boxes, KeyRound, Scissors, Package]
const PILLAR_ICONS = [Trophy, HardDrive, Eye, LayoutDashboard]

export function SteamIdlerCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const hero = useShot(SHOTS.hero.file)
  const games = useShot(SHOTS.games.file)
  const achievements = useShot(SHOTS.achievements.file)
  const idle = useShot(SHOTS.idle.file)
  const settings = useShot(SHOTS.settings.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = {
    hero,
    games,
    achievements,
    idle,
    settings,
  }

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
    <div className="page sti" data-accent="orange">
      <div className="container sti__container cs-scope">
        <Link className="sti__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="sti-hero" data-solo={hero.broken ? 'y' : undefined}>
          <Reveal className="sti-hero__copy">
            <div className="sti-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="sti-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              {p.version && <span className="sti-hero__ver">v{p.version}</span>}
            </div>
            <h1>
              STEAM
              <span className="sti-hero__line2">IDLER</span>
            </h1>
            <p className="sti-hero__tagline">{c.tagline}</p>
            <p className="sti-hero__summary">{tr(p.summary)}</p>
            <div className="sti-hero__actions">
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

          {!hero.broken && (
            <Reveal className="sti-hero__shot" delay={90}>
              <img
                {...hero.props}
                alt={c.shotCaptions.hero}
                width={SHOTS.hero.w}
                height={SHOTS.hero.h}
                fetchPriority="high"
                decoding="async"
              />
            </Reveal>
          )}

          <span className="cs-note cs-note--to-r sti-note sti-note--hero">{c.notes[0]}</span>
        </header>

        <StiSection
          id="sti-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="sti-section--tight"
        >
          <dl className="sti-stats">
            {p.metrics?.map((m) => (
              <div className="sti-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="sti-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l sti-note sti-note--metrics">{c.notes[1]}</span>
        </StiSection>

        <StiSection
          id="sti-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="sti-section--premise"
        >
          <Reveal className="sti-premise">
            <p className="sti-premise__lead">{c.premiseLead}</p>
            <p className="sti-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r sti-note sti-note--premise">{c.notes[2]}</span>
        </StiSection>

        {gallery.length > 0 && (
          <StiSection
            id="sti-output"
            label={c.output}
            aside={c.outputNote}
            className="sti-section--output sti-section--tinted"
          >
            <SwipeHint className="sti-swipe" />
            <div className="sti-gallery">
              {gallery.map((key, i) => (
                <Reveal className="sti-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="sti-frame__btn"
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
                    <span className="sti-frame__expand">{c.expand}</span>
                  </button>
                  <p className="sti-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
          </StiSection>
        )}

        <StiSection
          id="sti-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="sti-section--pillars"
        >
          <SwipeHint className="sti-swipe" />
          <div className="sti-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Trophy
              return (
                <Reveal className="sti-pillar" delay={i * 60} key={pillar.title}>
                  <span className="sti-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-l sti-note sti-note--pillars">{c.notes[3]}</span>
        </StiSection>

        <StiSection
          id="sti-isolation"
          label={c.isolation}
          aside={c.isolationNote}
          className="sti-section--isolation sti-section--tinted"
        >
          <Reveal className="sti-statement" as="p">
            {c.isolationLead}
          </Reveal>

          <SwipeHint className="sti-swipe" />
          <div className="sti-isolations">
            {c.isolationCards.map((card, i) => {
              const Icon = ISOLATION_ICONS[i] ?? Boxes
              return (
                <Reveal className="sti-iso" delay={i * 60} key={card.problem}>
                  <span className="sti-iso__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="sti-iso__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="sti-iso__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-r sti-note sti-note--isolation">{c.notes[4]}</span>
        </StiSection>

        {p.challenges && (
          <StiSection id="sti-hard" label={c.hard} aside={c.hardNote} className="sti-section--hard">
            <SwipeHint className="sti-swipe" />
            <ol className="sti-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="sti-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </StiSection>
        )}

        <StiSection id="sti-how" label={c.how} aside={c.howNote} className="sti-section--how">
          <SwipeHint className="sti-swipe" />
          <Reveal className="sti-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="sti-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="sti-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </StiSection>

        <StiSection
          id="sti-honesty"
          label={c.honesty}
          className="sti-section--honesty sti-section--tinted"
        >
          <Reveal className="sti-verdict">
            <p>{c.honestyHeadline}</p>
            <ul className="sti-chant">
              {c.honestyChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="sti-swipe" />
          <div className="sti-points">
            {c.honestyPoints.map(([title, body], i) => (
              <Reveal className="sti-point" delay={i * 60} key={title}>
                <span className="sti-point__icon" aria-hidden="true">
                  {i === 0 ? <HardDrive /> : i === 1 ? <ExternalLink /> : <ShieldAlert />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="sti-endpoints" delay={80}>
            <p className="sti-endpoints__title">{c.endpointsTitle}</p>
            <dl>
              {c.endpoints.map(([host, purpose]) => (
                <div key={host}>
                  <dt>{host}</dt>
                  <dd>{purpose}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <span className="cs-note cs-note--to-l sti-note sti-note--honesty">{c.notes[6]}</span>
        </StiSection>

        <div className="sti-endgrid">
          {p.lessons && (
            <StiSection id="sti-lessons" label={c.lessons} className="sti-section--panel">
              <SwipeHint className="sti-swipe" />
              <ul className="sti-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </StiSection>
          )}

          <StiSection id="sti-stack" label={c.stack} className="sti-section--panel">
            <div className="sti-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="sti-disclaimer">
                <ShieldAlert aria-hidden="true" />
                <span>
                  <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
                </span>
              </p>
            )}
          </StiSection>
        </div>

        <Reveal className="sti-finale" as="section">
          <p>{c.finale}</p>
          <div className="sti-finale__actions" aria-label={c.links}>
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
          <nav className="sti-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="sti-nav__copy">
                <span className="sti-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="sti-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="sti-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="sti-nav__copy">
                <span className="sti-nav__label">
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
            className="sti-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="sti-zoom__close"
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
