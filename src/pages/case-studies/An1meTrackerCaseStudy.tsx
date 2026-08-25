import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CloudOff,
  ExternalLink,
  Github,
  Radar,
  ShieldBan,
  SplitSquareHorizontal,
  Timer,
  TriangleAlert,
  Unplug,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/an1me-tracker.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

const SHOTS = {
  panels: { file: 'panels', w: 1448, h: 1086 },
  watch: { file: 'watch-page', w: 1280, h: 800 },
  library: { file: 'library-detail', w: 1280, h: 800 },
  stats: { file: 'stats', w: 1280, h: 800 },
  settings: { file: 'settings', w: 1280, h: 800 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['watch', 'library', 'stats', 'settings']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Browser extension · Manifest V3',
    tagline: 'It watches you watch, so you never have to remember an episode number again.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '47K lines hand-written · 38,957 JavaScript, 8,148 CSS · zero TODO, FIXME or HACK markers in any of it',

    premise: 'The premise',
    premiseNote: 'The entire product, in one sentence.',
    premiseLead: 'You forget which episode you were on.',
    premiseBody:
      'That is it. That is the whole problem. Every anime site on earth solved it years ago, except the one I actually use — so the tracker sits on top of that site and quietly keeps the count for me. Nothing to press, nothing to fill in, nothing to remember.',

    output: 'Real output',
    outputNote: 'Store listing art, labelled as such.',
    outputDisclosure:
      'Fair warning: these are the Chrome Web Store listing images, not raw screenshots. The panels are rendered in perspective on a designed background, they show v6.4.5 while the current manifest reads 7.3.3, and two of them have a Sync Error chip sitting in the corner. The interface in them is real. The framing is marketing.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      watch: 'The watch page on an1me.to, with the resume prompt the extension injects.',
      library: 'A series in the library: 245 of 500, canon progress at 31%, 80 fillers flagged.',
      stats: 'Streaks, hours and a sixteen-week activity map.',
      settings: 'Settings, on a demo account. Copy Guard, alerts, filler skipping, backup, danger zone.',
    } as Record<ShotKey, string>,

    pillars: 'What it does while you watch',
    pillarsNote: 'Three jobs, none of which need you.',
    pillarList: [
      {
        title: 'Records by itself',
        body: 'Start an episode and it is logged. There is no button to press and never was.',
        lines: [
          'progress detected from the player, not from clicks',
          'movies and multi-part series handled separately',
          'a scrub to the end is not a watch',
        ],
      },
      {
        title: 'Remembers where you stopped',
        body: 'Reopen an episode and it offers the second you left it on.',
        lines: [
          'resume prompt injected into the page',
          'a Continue Watching row added to the homepage',
          'watched episodes marked on the series page',
        ],
      },
      {
        title: 'Knows what is filler',
        body: 'Canon and filler are separated, so the count means something.',
        lines: [
          'filler episodes flagged from AnimeFillerList',
          'canon progress tracked apart from raw episode number',
          'outro timings from AniSkip, intros captured by hand',
        ],
      },
    ],

    hostile: 'Living on someone else’s website',
    hostileNote: 'The site does not know this exists, and would not help if it did.',
    hostileLead:
      'Everything above assumes the page cooperates. It does not. an1me.to sits behind a Cloudflare challenge, renames its own URLs without warning, and serves popunder ads from an inline script. An extension that lives there has to survive all three without ever being invited.',
    hostileCards: [
      {
        problem: 'Cloudflare challenge',
        answer: 'Borrow a real tab',
        body:
          'The service worker cannot pass the challenge on its own. So it leases a live an1me.to tab, runs the request from inside the page, reference-counts who is using it, retries once on a 403 or 503, and closes the tab eight seconds after the last borrower lets go. A separate bridge checks every requested URL against an origin pattern and refuses anything else outright.',
      },
      {
        problem: 'Renamed slugs',
        answer: 'Re-probe on a sweep',
        body:
          'The site rewrites its own URLs, which silently orphans every saved entry pointing at the old one. A sweep runs at most weekly, re-probes stale slugs with a cooldown on each one so a dead series is not hammered, and caps itself at 25 renames per run rather than rewriting the whole library on one bad guess.',
      },
      {
        problem: 'Popunder ads',
        answer: 'Guard the main world',
        body:
          'The popunder loader is an inline page script, which an isolated content script can never reach. So one script runs in the main world at document_start and wraps window.open, plus click on anchors that were never attached to the document. Its on/off bridge only ever writes “off” — the guard defaults to blocking, so ads stay blocked during the gap before the setting has even been read.',
      },
      {
        problem: 'No build step',
        answer: 'Assert on boot',
        body:
          'Nothing is bundled, so nothing checks that 73 files loaded in the right order. A 39-line startup file asserts that every namespace member it expects actually exists, and fails loudly at boot instead of throwing somewhere deep in a watch session three days later.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'The parts that were genuinely hard.',
    hardMore: 'Technical detail',
    hardShort: [
      '85% of the runtime, 120 seconds of real playback, and a 30-second floor before anything is recorded at all.',
      'Four APIs know the same show under four different names. Nothing blocks the interface waiting for them to agree.',
      'The popup, the watch page and the service worker all write the same library, sometimes at the same moment.',
      'Hundreds of covers overrun the quota. Recovery escalates in three passes and starts with what already expired.',
    ],

    how: 'How it’s built',
    howNote: 'One direction, five stages, no bundler anywhere in it.',
    flow: [
      ['WATCH PAGE', 'an1me.to'],
      ['CONTENT SCRIPTS', 'main + isolated'],
      ['SERVICE WORKER', 'alarms · jobs'],
      ['chrome.storage', 'local · revisioned'],
      ['FIRESTORE', 'optional · yours'],
    ],

    privacy: 'Privacy',
    privacyHeadline: 'Without an account, nothing leaves the machine.',
    privacyChant: ['No analytics.', 'No ad SDK.', 'No telemetry.', 'No sale.'],
    privacyPoints: [
      [
        'Stays on your machine',
        'With no account, the entire library — progress, resume positions, stats, goals, achievements — lives in chrome.storage on your own disk and is never transmitted anywhere. Sign-in is optional and always was.',
      ],
      [
        'What each API receives',
        'A series title or a numeric ID. That is the whole payload. None of the four metadata APIs is told who is asking, and none of them receives an account, a device id or anything that could link two lookups together.',
      ],
      [
        'What is never sent',
        'There is no analytics host in the source. Grepping for the twelve usual vendors returns nothing but false positives. Sync writes to your own Firestore document, reachable only by you, through hand-rolled REST calls rather than a bundled SDK.',
      ],
    ],
    endpointsTitle: 'Every host the extension contacts',
    endpoints: [
      ['graphql.anilist.co', 'library import, progress pushed back out'],
      ['api.jikan.moe/v4', 'MyAnimeList id resolution, episode listings'],
      ['api.aniskip.com/v2', 'outro timings only — the request hardcodes types[]=ed'],
      ['www.animefillerlist.com', 'which episodes are filler'],
      ['identitytoolkit · securetoken · firestore', 'optional account and sync, plain REST, no SDK'],
      ['an1me.to', 'the site itself — search, scrape, watchlist'],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'You press play. It handles the rest.',
    finaleOther: 'See other projects',

    notes: [
      'it counts. you watch.',
      'all four verified by grep.',
      'this is the entire pitch.',
      'store art. not a real capture.',
      'none of these need you.',
      'the site is not on my side.',
      'nothing phones home. ever.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Browser extension · Manifest V3',
    tagline: 'Σε βλέπει να βλέπεις, ώστε να μη χρειαστεί ποτέ ξανά να θυμηθείς αριθμό επεισοδίου.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '47K γραμμές γραμμένες στο χέρι · 38.957 JavaScript, 8.148 CSS · μηδέν TODO, FIXME ή HACK σε καμία από αυτές',

    premise: 'Η αφετηρία',
    premiseNote: 'Όλο το προϊόν, σε μία πρόταση.',
    premiseLead: 'Ξεχνάς σε ποιο επεισόδιο ήσουν.',
    premiseBody:
      'Αυτό είναι. Αυτό είναι όλο το πρόβλημα. Κάθε anime site στον πλανήτη το έλυσε χρόνια πριν, εκτός από αυτό που όντως χρησιμοποιώ — οπότε ο tracker κάθεται πάνω από εκείνο το site και κρατάει ήσυχα τον λογαριασμό για μένα. Τίποτα να πατήσεις, τίποτα να συμπληρώσεις, τίποτα να θυμηθείς.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Εικόνες από το Chrome Web Store, δηλωμένες ως τέτοιες.',
    outputDisclosure:
      'Με το χέρι στην καρδιά: αυτές είναι οι εικόνες της καταχώρησης στο Chrome Web Store, όχι σκέτα screenshots. Τα panels είναι σε προοπτική πάνω σε σχεδιασμένο φόντο, δείχνουν v6.4.5 ενώ το τρέχον manifest γράφει 7.3.3, και δύο από αυτές έχουν ένα Sync Error στη γωνία. Το interface μέσα τους είναι αληθινό. Το στήσιμο είναι μάρκετινγκ.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      watch: 'Η σελίδα παρακολούθησης στο an1me.to, με το resume prompt που εισάγει το extension.',
      library: 'Μια σειρά στη βιβλιοθήκη: 245 από 500, canon πρόοδος 31%, 80 filler σημειωμένα.',
      stats: 'Σερί, ώρες και χάρτης δραστηριότητας δεκαέξι εβδομάδων.',
      settings: 'Ρυθμίσεις, σε demo λογαριασμό. Copy Guard, ειδοποιήσεις, filler skipping, backup, danger zone.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει όσο βλέπεις',
    pillarsNote: 'Τρεις δουλειές, καμία δεν σε χρειάζεται.',
    pillarList: [
      {
        title: 'Καταγράφει μόνο του',
        body: 'Ξεκινάς επεισόδιο και έχει καταγραφεί. Δεν υπάρχει κουμπί να πατήσεις, ούτε υπήρξε ποτέ.',
        lines: [
          'η πρόοδος ανιχνεύεται από τον player, όχι από κλικ',
          'ταινίες και σειρές πολλών μερών χωριστά',
          'το σύρσιμο στο τέλος δεν είναι παρακολούθηση',
        ],
      },
      {
        title: 'Θυμάται πού σταμάτησες',
        body: 'Ξανανοίγεις επεισόδιο και σου προτείνει το δευτερόλεπτο που το άφησες.',
        lines: [
          'resume prompt μέσα στη σελίδα',
          'σειρά Continue Watching στην αρχική',
          'σήμανση δεδομένων επεισοδίων στη σελίδα της σειράς',
        ],
      },
      {
        title: 'Ξέρει τι είναι filler',
        body: 'Canon και filler χωρίζονται, ώστε ο αριθμός να σημαίνει κάτι.',
        lines: [
          'filler επεισόδια από το AnimeFillerList',
          'canon πρόοδος ξεχωριστά από τον σκέτο αριθμό',
          'χρόνοι outro από AniSkip, τα intro στο χέρι',
        ],
      },
    ],

    hostile: 'Ζώντας στο site κάποιου άλλου',
    hostileNote: 'Το site δεν ξέρει ότι υπάρχει, και δεν θα βοηθούσε αν ήξερε.',
    hostileLead:
      'Όλα τα παραπάνω υποθέτουν ότι η σελίδα συνεργάζεται. Δεν συνεργάζεται. Το an1me.to κάθεται πίσω από Cloudflare challenge, μετονομάζει τα ίδια του τα URL χωρίς προειδοποίηση, και σερβίρει popunder διαφημίσεις από inline script. Ένα extension που ζει εκεί πρέπει να επιβιώσει και από τα τρία, χωρίς ποτέ να έχει προσκληθεί.',
    hostileCards: [
      {
        problem: 'Cloudflare challenge',
        answer: 'Δανείσου αληθινό tab',
        body:
          'Ο service worker δεν περνάει το challenge μόνος του. Οπότε δανείζεται ένα ζωντανό tab του an1me.to, τρέχει το request μέσα από τη σελίδα, μετράει ποιοι το χρησιμοποιούν, ξαναδοκιμάζει μία φορά σε 403 ή 503, και κλείνει το tab οκτώ δευτερόλεπτα αφού το αφήσει ο τελευταίος. Ξεχωριστό bridge ελέγχει κάθε URL με origin pattern και απορρίπτει ό,τι άλλο.',
      },
      {
        problem: 'Μετονομασμένα slugs',
        answer: 'Ξανά-ανίχνευση σε σάρωση',
        body:
          'Το site ξαναγράφει τα URL του, κάτι που σιωπηλά ορφανεύει κάθε αποθηκευμένη εγγραφή. Μια σάρωση τρέχει το πολύ εβδομαδιαία, ξαναδοκιμάζει τα παλιά slugs με cooldown στο καθένα ώστε μια νεκρή σειρά να μη χτυπιέται συνέχεια, και βάζει πλαφόν 25 μετονομασιών ανά πέρασμα αντί να ξαναγράψει όλη τη βιβλιοθήκη σε μία λάθος εικασία.',
      },
      {
        problem: 'Popunder διαφημίσεις',
        answer: 'Φύλαξε τον main world',
        body:
          'Ο popunder loader είναι inline script της σελίδας, που ένα isolated content script δεν φτάνει ποτέ. Οπότε ένα script τρέχει στον main world στο document_start και τυλίγει το window.open, μαζί με το click σε anchors που δεν μπήκαν ποτέ στο document. Το bridge on/off γράφει μόνο «off» — ο φύλακας μπλοκάρει εξ ορισμού, οπότε οι διαφημίσεις μένουν μπλοκαρισμένες στο κενό πριν καν διαβαστεί η ρύθμιση.',
      },
      {
        problem: 'Χωρίς build step',
        answer: 'Έλεγχος στο boot',
        body:
          'Τίποτα δεν γίνεται bundle, οπότε τίποτα δεν ελέγχει ότι 73 αρχεία φόρτωσαν με τη σωστή σειρά. Ένα αρχείο 39 γραμμών βεβαιώνει στην εκκίνηση ότι κάθε namespace που περιμένει όντως υπάρχει, και σκάει δυνατά στο boot αντί κάπου βαθιά σε ένα watch session τρεις μέρες μετά.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τα κομμάτια που ήταν όντως δύσκολα.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      '85% της διάρκειας, 120 δευτερόλεπτα πραγματικής αναπαραγωγής, και κατώφλι 30 δευτερολέπτων πριν καταγραφεί οτιδήποτε.',
      'Τέσσερα APIs ξέρουν την ίδια σειρά με τέσσερα διαφορετικά ονόματα. Τίποτα δεν μπλοκάρει το interface περιμένοντάς τα να συμφωνήσουν.',
      'Το popup, η σελίδα παρακολούθησης και ο service worker γράφουν όλοι την ίδια βιβλιοθήκη, κάποιες φορές ταυτόχρονα.',
      'Εκατοντάδες covers ξεπερνούν το quota. Η ανάκτηση κλιμακώνεται σε τρία περάσματα και ξεκινά από ό,τι έχει ήδη λήξει.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Μία κατεύθυνση, πέντε στάδια, κανένα bundler πουθενά μέσα.',
    flow: [
      ['WATCH PAGE', 'an1me.to'],
      ['CONTENT SCRIPTS', 'main + isolated'],
      ['SERVICE WORKER', 'alarms · jobs'],
      ['chrome.storage', 'local · revisioned'],
      ['FIRESTORE', 'προαιρετικό · δικό σου'],
    ],

    privacy: 'Ιδιωτικότητα',
    privacyHeadline: 'Χωρίς λογαριασμό, τίποτα δεν φεύγει από το μηχάνημα.',
    privacyChant: ['Χωρίς analytics.', 'Χωρίς ad SDK.', 'Χωρίς telemetry.', 'Χωρίς πώληση.'],
    privacyPoints: [
      [
        'Μένει στο μηχάνημά σου',
        'Χωρίς λογαριασμό, όλη η βιβλιοθήκη — πρόοδος, σημεία resume, stats, στόχοι, achievements — ζει στο chrome.storage στον δικό σου δίσκο και δεν μεταδίδεται πουθενά. Το sign-in είναι προαιρετικό και ήταν πάντα.',
      ],
      [
        'Τι παίρνει κάθε API',
        'Έναν τίτλο σειράς ή ένα αριθμητικό ID. Αυτό είναι όλο το payload. Κανένα από τα τέσσερα metadata APIs δεν μαθαίνει ποιος ρωτάει, και κανένα δεν παίρνει λογαριασμό, device id ή οτιδήποτε θα συνέδεε δύο lookups μεταξύ τους.',
      ],
      [
        'Τι δεν στέλνεται ποτέ',
        'Δεν υπάρχει analytics host στον κώδικα. Το grep για τους δώδεκα συνηθισμένους vendors δεν επιστρέφει παρά false positives. Το sync γράφει στο δικό σου Firestore document, προσβάσιμο μόνο από εσένα, με REST κλήσεις στο χέρι αντί για bundled SDK.',
      ],
    ],
    endpointsTitle: 'Κάθε host που καλεί το extension',
    endpoints: [
      ['graphql.anilist.co', 'import βιβλιοθήκης, πρόοδος πίσω προς τα έξω'],
      ['api.jikan.moe/v4', 'εύρεση MyAnimeList id, λίστες επεισοδίων'],
      ['api.aniskip.com/v2', 'μόνο χρόνοι outro — το request έχει σταθερό types[]=ed'],
      ['www.animefillerlist.com', 'ποια επεισόδια είναι filler'],
      ['identitytoolkit · securetoken · firestore', 'προαιρετικός λογαριασμός και sync, σκέτο REST'],
      ['an1me.to', 'το ίδιο το site — αναζήτηση, scrape, watchlist'],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Πατάς play. Αναλαμβάνει τα υπόλοιπα.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'μετράει. εσύ βλέπεις.',
      'και τα τέσσερα με grep.',
      'αυτό είναι όλο το pitch.',
      'store art. όχι αληθινό capture.',
      'κανένα δεν σε χρειάζεται.',
      'το site δεν είναι με το μέρος μου.',
      'τίποτα δεν τηλεφωνεί σπίτι.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/an1me-tracker/`

function useShot(file: string) {
  const [broken, setBroken] = useState(false)
  const props = {
    src: `${ASSETS}${file}.webp`,
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

function AntSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`ant-section ${className}`} aria-labelledby={id}>
      <div className="ant-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="ant-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="ant-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const HOSTILE_ICONS = [Unplug, Radar, ShieldBan, SplitSquareHorizontal]

export function An1meTrackerCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const panels = useShot(SHOTS.panels.file)
  const watch = useShot(SHOTS.watch.file)
  const library = useShot(SHOTS.library.file)
  const stats = useShot(SHOTS.stats.file)
  const settings = useShot(SHOTS.settings.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = {
    panels,
    watch,
    library,
    stats,
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
    <div className="page ant" data-accent="blue">
      <div className="container ant__container cs-scope">
        <Link className="ant__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="ant-hero" data-solo={panels.broken ? 'y' : undefined}>
          <Reveal className="ant-hero__copy">
            <div className="ant-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="ant-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
            </div>
            <h1>
              AN1ME.TO
              <span className="ant-hero__line2">TRACKER</span>
            </h1>
            <p className="ant-hero__tagline">{c.tagline}</p>
            <p className="ant-hero__summary">{tr(p.summary)}</p>
            <div className="ant-hero__actions">
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

          {!panels.broken && (
            <Reveal className="ant-hero__shot" delay={90}>
              <img
                {...panels.props}
                alt={c.outputNote}
                width={SHOTS.panels.w}
                height={SHOTS.panels.h}
                fetchPriority="high"
                decoding="async"
              />
            </Reveal>
          )}

          <span className="cs-note cs-note--to-r ant-note ant-note--hero">{c.notes[0]}</span>
        </header>

        <AntSection
          id="ant-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="ant-section--tight"
        >
          <dl className="ant-stats">
            {p.metrics?.map((m) => (
              <div className="ant-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="ant-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l ant-note ant-note--metrics">{c.notes[1]}</span>
        </AntSection>

        <AntSection id="ant-premise" label={c.premise} aside={c.premiseNote} className="ant-section--premise">
          <Reveal className="ant-premise">
            <p className="ant-premise__lead">{c.premiseLead}</p>
            <p className="ant-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r ant-note ant-note--premise">{c.notes[2]}</span>
        </AntSection>

        {gallery.length > 0 && (
          <AntSection
            id="ant-output"
            label={c.output}
            aside={c.outputNote}
            className="ant-section--output ant-section--tinted"
          >
            <Reveal className="ant-disclosure" as="p">
              <TriangleAlert aria-hidden="true" />
              <span>{c.outputDisclosure}</span>
            </Reveal>

            <SwipeHint className="ant-swipe" />
            <div className="ant-gallery">
              {gallery.map((key, i) => (
                <Reveal className="ant-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="ant-frame__btn"
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
                    <span className="ant-frame__expand">{c.expand}</span>
                  </button>
                  <p className="ant-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
            <span className="cs-note cs-note--to-l ant-note ant-note--output">{c.notes[3]}</span>
          </AntSection>
        )}

        <AntSection id="ant-pillars" label={c.pillars} aside={c.pillarsNote} className="ant-section--pillars">
          <SwipeHint className="ant-swipe" />
          <div className="ant-pillars">
            {c.pillarList.map((pillar, i) => (
              <Reveal className="ant-pillar" delay={i * 60} key={pillar.title}>
                <span className="ant-pillar__ep" aria-hidden="true">
                  EP {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <ul>
                  {pillar.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-r ant-note ant-note--pillars">{c.notes[4]}</span>
        </AntSection>

        <AntSection
          id="ant-hostile"
          label={c.hostile}
          aside={c.hostileNote}
          className="ant-section--hostile ant-section--tinted"
        >
          <Reveal className="ant-statement" as="p">
            {c.hostileLead}
          </Reveal>

          <SwipeHint className="ant-swipe" />
          <div className="ant-hostiles">
            {c.hostileCards.map((card, i) => {
              const Icon = HOSTILE_ICONS[i] ?? Unplug
              return (
                <Reveal className="ant-hostile" delay={i * 60} key={card.problem}>
                  <span className="ant-hostile__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="ant-hostile__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="ant-hostile__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-l ant-note ant-note--hostile">{c.notes[5]}</span>
        </AntSection>

        {p.challenges && (
          <AntSection id="ant-hard" label={c.hard} aside={c.hardNote} className="ant-section--hard">
            <SwipeHint className="ant-swipe" />
            <ol className="ant-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="ant-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </AntSection>
        )}

        <AntSection id="ant-how" label={c.how} aside={c.howNote} className="ant-section--how">
          <SwipeHint className="ant-swipe" />
          <Reveal className="ant-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="ant-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="ant-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </AntSection>

        <AntSection
          id="ant-privacy"
          label={c.privacy}
          className="ant-section--privacy ant-section--tinted"
        >
          <Reveal className="ant-verdict">
            <p>{c.privacyHeadline}</p>
            <ul className="ant-chant">
              {c.privacyChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="ant-swipe" />
          <div className="ant-points">
            {c.privacyPoints.map(([title, body], i) => (
              <Reveal className="ant-point" delay={i * 60} key={title}>
                <span className="ant-point__icon" aria-hidden="true">
                  {i === 0 ? <CloudOff /> : i === 1 ? <Timer /> : <ShieldBan />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="ant-endpoints" delay={80}>
            <p className="ant-endpoints__title">{c.endpointsTitle}</p>
            <dl>
              {c.endpoints.map(([host, purpose]) => (
                <div key={host}>
                  <dt>{host}</dt>
                  <dd>{purpose}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <span className="cs-note cs-note--to-l ant-note ant-note--privacy">{c.notes[6]}</span>
        </AntSection>

        <div className="ant-endgrid">
          {p.lessons && (
            <AntSection id="ant-lessons" label={c.lessons} className="ant-section--panel">
              <SwipeHint className="ant-swipe" />
              <ul className="ant-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </AntSection>
          )}

          <AntSection id="ant-stack" label={c.stack} className="ant-section--panel">
            <div className="ant-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="ant-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </AntSection>
        </div>

        <Reveal className="ant-finale" as="section">
          <p>{c.finale}</p>
          <div className="ant-finale__actions" aria-label={c.links}>
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
          <nav className="ant-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="ant-nav__copy">
                <span className="ant-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="ant-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="ant-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="ant-nav__copy">
                <span className="ant-nav__label">
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
            className="ant-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="ant-zoom__close"
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
