import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  ExternalLink,
  Github,
  Hash,
  ImageOff,
  Lock,
  Moon,
  Repeat,
  Search,
  Smartphone,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/gta-academy.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

const SHOTS = {
  cars: { file: 'cars', w: 1456, h: 720 },
  helicopters: { file: 'helicopters', w: 1456, h: 711 },
  planes: { file: 'planes', w: 1456, h: 783 },
  special: { file: 'special', w: 1456, h: 754 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['cars', 'helicopters', 'planes', 'special']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Static site · GitHub Pages',
    tagline: 'How many rockets does it actually take? Somebody had to sit there and count.',
    source: 'View source',
    live: 'Open the site',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '3,471 lines of HTML, CSS and JavaScript · 907 of them in style.css alone · six stylesheets, three scripts, zero dependencies',

    premise: 'The premise',
    premiseNote: 'The entire project, in one sentence.',
    premiseLead: 'Getting blown up should not be a surprise.',
    premiseBody:
      'If you play GTA Online you eventually want to know a very specific thing: will this vehicle survive the rocket that is already in the air. The answer exists, scattered across forum posts and contradicting wiki edits, in a form nobody can read on a phone. So we went and measured it ourselves — and then I spent considerably longer than the measuring took making it pleasant to read.',

    output: 'Real output',
    outputNote: 'In-game captures, one per category.',
    outputDisclosure:
      'These are in-game captures taken for the wiki — the vehicles and the world in them belong to Rockstar. The site’s own hero illustration is a signed piece by another artist, so it is credited on the site and deliberately not reproduced here.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      cars: 'APC — the first of nine ground vehicles.',
      helicopters: 'Akula — one of ten helicopters, and the reason stealth mode needed its own note.',
      planes: 'P-996 Lazer — the largest category, at fifteen aircraft.',
      special: 'Acid Lab — the category for everything that refused to be a car, a plane or a helicopter.',
    } as Record<ShotKey, string>,

    pillars: 'What the site does',
    pillarsNote: 'Four things, all written by hand.',
    pillarList: [
      {
        title: 'Measured, not sourced',
        body: 'Every figure came out of a lobby, not a wiki.',
        lines: [
          '41 vehicles across four categories',
          'six weapon types per vehicle',
          '239 individual readings in total',
        ],
      },
      {
        title: 'Search that keeps up',
        body: 'Filtering happens while you type, on the cards already in the page.',
        lines: [
          'debounced at 300ms, so fast typing costs one pass',
          'matches on vehicle name, case-insensitive',
          'no reload, no request, no framework',
        ],
      },
      {
        title: 'A theme that remembers',
        body: 'Dark and light, with the choice kept between visits.',
        lines: [
          'written to localStorage on every toggle',
          'falls back to your system preference',
          'follows the OS live until you overrule it',
        ],
      },
      {
        title: 'A mode for tiny screens',
        body: 'Below 351 pixels the page changes character rather than shrinking.',
        lines: [
          'an ultra-mobile class goes on the document',
          'the whole layout scales to 85%',
          'animations are removed, not just slowed',
        ],
      },
    ],

    method: 'The data is the hard part',
    methodNote: 'The CSS was the fun part. This was the project.',
    methodLead:
      'There is no endpoint that returns how many rockets a Nightshark survives. There is no dataset, no export, no API. There is a lobby, a fully upgraded vehicle, a weapon, and somebody willing to fire it over and over and write down what happened. Everything on this site cost real time in a way no amount of clever code would have shortened.',
    methodCards: [
      {
        problem: 'No source exists',
        answer: 'Become the source',
        body:
          'Every number is a test run: spawn the vehicle fully upgraded, fire one weapon type at it until it is destroyed, record the count, repeat to confirm. Forty-one vehicles times six weapon types is 239 readings, and each one had to be done more than once to be worth writing down.',
      },
      {
        problem: 'The numbers move',
        answer: 'Publish the wobble',
        body:
          'The same test does not always give the same answer — angle, damage falloff and whatever the netcode felt like that evening all move it by one. Rather than average it into a false decimal, the site prints ranges where a range is what we actually saw, and the small print says outright that the figures vary.',
      },
      {
        problem: 'Six weapons, one grid',
        answer: 'Same six, every time',
        body:
          'RPG, homing missile, tank shell, railgun round, explosive sniper and anti-aircraft fire — the same six, in the same order, on every single card. A comparison is only worth anything if the column means the same thing on every row, so no vehicle gets a bespoke set.',
      },
      {
        problem: 'One person is too slow',
        answer: 'Split it with Tony',
        body:
          'This took months of evenings, which is why there are two names on it. Tony_greek did half the firing and half the counting, and the site credits both of us on the page and on its own copyright screen rather than quietly becoming a solo project in the retelling.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'The parts that were genuinely hard — and one I got wrong.',
    hardMore: 'Technical detail',
    hardShort: [
      'No framework meant writing state, filtering, persistence and transitions by hand.',
      'Below 351 pixels the design was too heavy, so it switches to a quieter mode instead of pretending.',
      'Two people, six weapons, forty-one vehicles and no API to ask.',
      'A 279-line lock on a page the browser had already handed over.',
    ],

    how: 'How it’s built',
    howNote: 'The pipeline is a person with a notepad, and then some HTML.',
    flow: [
      ['IN-GAME TEST', 'fire · count · repeat'],
      ['NOTEPAD', 'two people, months'],
      ['index.html', '41 cards, hand-written'],
      ['6 STYLESHEETS', 'no preprocessor'],
      ['GITHUB PAGES', 'no build step'],
    ],

    honest: 'Honest accounting',
    honestHeadline: 'Three things I would flag before you open the source.',
    honestChant: ['No tracking.', 'No accounts.', 'No cookies.', 'No backend.'],
    honestPoints: [
      [
        'The lock that does not lock',
        'There are 279 lines in patch.js that disable right-click, long-press, multi-touch and clipboard access, and try to detect open developer tools. It was written to protect months of hand-collected data. It does not work — anything the browser renders, the reader already has — and it costs real accessibility. It is still in the repository, and I would rather point at it than quietly remove it.',
      ],
      [
        'The numbers are not numbers',
        'The damage figures are typeset in Unicode mathematical bold digits, because they looked better. That means the browser’s own find-in-page cannot match them, and a screen reader does not announce them as the digits they are. It is a small vanity with a real cost, and the fix is a font, not a character set.',
      ],
      [
        'Nineteen megabytes of pictures',
        'The site ships its images as unoptimised PNGs — around 19MB across 48 files, with a single 3840×2160 hero. There is no build step to convert them, which is exactly the trade of having no build step. The four captures on this page were converted to WebP first, which is the whole argument in one sentence.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'Somebody fired the rocket 239 times so you would not have to guess.',
    finaleOther: 'See other projects',

    notes: [
      'somebody had to count.',
      'all four verified by grep.',
      'the CSS was the real hobby.',
      'rockstar’s world. our captures.',
      'none of this came from a wiki.',
      'months of evenings.',
      'yes, i know. it is in there.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Στατικό site · GitHub Pages',
    tagline: 'Πόσες ρουκέτες θέλει τελικά; Κάποιος έπρεπε να καθίσει και να μετρήσει.',
    source: 'Δες τον κώδικα',
    live: 'Άνοιξε το site',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '3.471 γραμμές HTML, CSS και JavaScript · οι 907 μόνο στο style.css · έξι stylesheets, τρία scripts, μηδέν dependencies',

    premise: 'Η αφετηρία',
    premiseNote: 'Όλο το project, σε μία πρόταση.',
    premiseLead: 'Το να ανατιναχτείς δεν πρέπει να είναι έκπληξη.',
    premiseBody:
      'Αν παίζεις GTA Online, κάποια στιγμή θέλεις να ξέρεις κάτι πολύ συγκεκριμένο: θα αντέξει αυτό το όχημα τη ρουκέτα που είναι ήδη στον αέρα. Η απάντηση υπάρχει, σκορπισμένη σε forum posts και αλληλοαναιρούμενα wiki, σε μορφή που κανείς δεν διαβάζει σε κινητό. Οπότε πήγαμε και τη μετρήσαμε μόνοι μας — και μετά έφαγα αισθητά περισσότερο χρόνο απ᾽ όσο η μέτρηση για να γίνει ευχάριστη στο διάβασμα.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'In-game captures, ένα ανά κατηγορία.',
    outputDisclosure:
      'Αυτά είναι in-game captures τραβηγμένα για το wiki — τα οχήματα και ο κόσμος μέσα τους ανήκουν στη Rockstar. Η κεντρική εικόνα του ίδιου του site είναι υπογεγραμμένο έργο άλλου καλλιτέχνη, οπότε αναφέρεται εκεί και επίτηδες δεν αναπαράγεται εδώ.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      cars: 'APC — το πρώτο από εννιά επίγεια οχήματα.',
      helicopters: 'Akula — ένα από δέκα ελικόπτερα, και ο λόγος που το stealth ήθελε δική του σημείωση.',
      planes: 'P-996 Lazer — η μεγαλύτερη κατηγορία, με δεκαπέντε αεροσκάφη.',
      special: 'Acid Lab — η κατηγορία για ό,τι αρνήθηκε να είναι αυτοκίνητο, αεροπλάνο ή ελικόπτερο.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει το site',
    pillarsNote: 'Τέσσερα πράγματα, όλα γραμμένα στο χέρι.',
    pillarList: [
      {
        title: 'Μετρημένο, όχι αντιγραμμένο',
        body: 'Κάθε νούμερο βγήκε από lobby, όχι από wiki.',
        lines: [
          '41 οχήματα σε τέσσερις κατηγορίες',
          'έξι τύποι όπλων ανά όχημα',
          '239 ξεχωριστές μετρήσεις συνολικά',
        ],
      },
      {
        title: 'Αναζήτηση που προλαβαίνει',
        body: 'Το φιλτράρισμα γίνεται όσο πληκτρολογείς, πάνω στις κάρτες που ήδη υπάρχουν.',
        lines: [
          'debounce στα 300ms, ώστε η γρήγορη πληκτρολόγηση να κοστίζει ένα πέρασμα',
          'ταιριάζει στο όνομα οχήματος, χωρίς διάκριση πεζών',
          'χωρίς reload, χωρίς request, χωρίς framework',
        ],
      },
      {
        title: 'Θέμα που θυμάται',
        body: 'Σκοτεινό και φωτεινό, με την επιλογή να κρατάει ανάμεσα στις επισκέψεις.',
        lines: [
          'γράφεται στο localStorage σε κάθε αλλαγή',
          'πέφτει πίσω στην προτίμηση του συστήματος',
          'ακολουθεί ζωντανά το λειτουργικό μέχρι να το αναιρέσεις',
        ],
      },
      {
        title: 'Λειτουργία για μικροσκοπικές οθόνες',
        body: 'Κάτω από τα 351 pixel η σελίδα αλλάζει χαρακτήρα αντί να ζαρώνει.',
        lines: [
          'μπαίνει κλάση ultra-mobile στο document',
          'όλο το layout κλιμακώνεται στο 85%',
          'τα animations αφαιρούνται, δεν απλώς επιβραδύνονται',
        ],
      },
    ],

    method: 'Τα δεδομένα είναι το δύσκολο',
    methodNote: 'Το CSS ήταν η διασκέδαση. Αυτό ήταν το project.',
    methodLead:
      'Δεν υπάρχει endpoint που να επιστρέφει πόσες ρουκέτες αντέχει ένα Nightshark. Δεν υπάρχει dataset, ούτε export, ούτε API. Υπάρχει ένα lobby, ένα πλήρως αναβαθμισμένο όχημα, ένα όπλο, και κάποιος πρόθυμος να το ρίξει ξανά και ξανά και να σημειώσει τι έγινε. Ό,τι υπάρχει σε αυτό το site κόστισε πραγματικό χρόνο, με τρόπο που κανένας έξυπνος κώδικας δεν θα συντόμευε.',
    methodCards: [
      {
        problem: 'Δεν υπάρχει πηγή',
        answer: 'Γίνε η πηγή',
        body:
          'Κάθε νούμερο είναι μια δοκιμή: βγάζεις το όχημα πλήρως αναβαθμισμένο, ρίχνεις έναν τύπο όπλου μέχρι να καταστραφεί, καταγράφεις τον αριθμό, επαναλαμβάνεις για επιβεβαίωση. Σαράντα ένα οχήματα επί έξι τύπους όπλων είναι 239 μετρήσεις, και καθεμιά έπρεπε να γίνει πάνω από μία φορά για να αξίζει να γραφτεί.',
      },
      {
        problem: 'Τα νούμερα κουνιούνται',
        answer: 'Δημοσίευσε την απόκλιση',
        body:
          'Η ίδια δοκιμή δεν δίνει πάντα την ίδια απάντηση — η γωνία, η μείωση ζημιάς με την απόσταση και ό,τι είχε όρεξη το netcode εκείνο το βράδυ τη μετακινούν κατά ένα. Αντί να βγάλουμε μέσο όρο σε ψεύτικο δεκαδικό, το site τυπώνει εύρη εκεί που εύρος είδαμε, και τα ψιλά γράμματα λένε ανοιχτά ότι τα νούμερα ποικίλλουν.',
      },
      {
        problem: 'Έξι όπλα, ένα πλέγμα',
        answer: 'Τα ίδια έξι, κάθε φορά',
        body:
          'RPG, homing missile, tank shell, railgun round, εκρηκτικό sniper και αντιαεροπορικά — τα ίδια έξι, με την ίδια σειρά, σε κάθε κάρτα. Μια σύγκριση αξίζει μόνο αν η στήλη σημαίνει το ίδιο σε κάθε γραμμή, οπότε κανένα όχημα δεν παίρνει δικό του σετ.',
      },
      {
        problem: 'Ένας άνθρωπος είναι αργός',
        answer: 'Μοίρασέ το με τον Tony',
        body:
          'Πήρε μήνες από βράδια, γι᾽ αυτό υπάρχουν δύο ονόματα πάνω του. Ο Tony_greek έκανε τα μισά ρίξιμο και τα μισά μέτρημα, και το site μας αναφέρει και τους δύο στη σελίδα και στη δική του οθόνη copyright, αντί να γίνει σιωπηλά solo project στην αφήγηση.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τα κομμάτια που ήταν όντως δύσκολα — και ένα που το έκανα λάθος.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Χωρίς framework, το state, το φιλτράρισμα, η persistence και τα transitions γράφτηκαν στο χέρι.',
      'Κάτω από τα 351 pixel το design ήταν πολύ βαρύ, οπότε αλλάζει σε πιο ήσυχη λειτουργία αντί να προσποιείται.',
      'Δύο άνθρωποι, έξι όπλα, σαράντα ένα οχήματα και κανένα API να ρωτήσεις.',
      'Μια κλειδαριά 279 γραμμών σε μια σελίδα που ο browser είχε ήδη παραδώσει.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Το pipeline είναι ένας άνθρωπος με μπλοκάκι, και μετά λίγη HTML.',
    flow: [
      ['IN-GAME TEST', 'ρίξε · μέτρα · ξανά'],
      ['ΜΠΛΟΚΑΚΙ', 'δύο άνθρωποι, μήνες'],
      ['index.html', '41 κάρτες, στο χέρι'],
      ['6 STYLESHEETS', 'χωρίς preprocessor'],
      ['GITHUB PAGES', 'χωρίς build step'],
    ],

    honest: 'Τίμιος απολογισμός',
    honestHeadline: 'Τρία πράγματα που θα σου έλεγα πριν ανοίξεις τον κώδικα.',
    honestChant: ['Χωρίς tracking.', 'Χωρίς λογαριασμούς.', 'Χωρίς cookies.', 'Χωρίς backend.'],
    honestPoints: [
      [
        'Η κλειδαριά που δεν κλειδώνει',
        'Υπάρχουν 279 γραμμές στο patch.js που απενεργοποιούν δεξί κλικ, long-press, multi-touch και πρόσβαση στο clipboard, και προσπαθούν να ανιχνεύσουν ανοιχτά developer tools. Γράφτηκαν για να προστατέψουν μήνες δεδομένων μαζεμένων στο χέρι. Δεν δουλεύει — ό,τι κάνει render ο browser, ο αναγνώστης ήδη το έχει — και κοστίζει πραγματική προσβασιμότητα. Είναι ακόμα στο repository, και προτιμώ να το δείξω παρά να το σβήσω στα κρυφά.',
      ],
      [
        'Τα νούμερα δεν είναι νούμερα',
        'Τα νούμερα ζημιάς είναι στοιχειοθετημένα σε Unicode mathematical bold ψηφία, επειδή έδειχναν καλύτερα. Αυτό σημαίνει ότι η αναζήτηση του browser μέσα στη σελίδα δεν τα βρίσκει, και ένας screen reader δεν τα ανακοινώνει ως τα ψηφία που είναι. Μικρή ματαιοδοξία με πραγματικό κόστος, και η λύση είναι γραμματοσειρά, όχι σύνολο χαρακτήρων.',
      ],
      [
        'Δεκαεννιά megabyte εικόνες',
        'Το site σερβίρει τις εικόνες του ως ασυμπίεστα PNG — περίπου 19MB σε 48 αρχεία, με μία κεντρική στα 3840×2160. Δεν υπάρχει build step να τα μετατρέψει, που είναι ακριβώς το αντάλλαγμα του να μην έχεις build step. Τα τέσσερα captures αυτής της σελίδας μετατράπηκαν πρώτα σε WebP, κάτι που είναι όλο το επιχείρημα σε μία πρόταση.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Κάποιος έριξε τη ρουκέτα 239 φορές για να μη μαντεύεις εσύ.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'κάποιος έπρεπε να μετρήσει.',
      'και τα τέσσερα με grep.',
      'το CSS ήταν το αληθινό χόμπι.',
      'κόσμος της rockstar. δικά μας captures.',
      'τίποτα από αυτά δεν βγήκε από wiki.',
      'μήνες από βράδια.',
      'ναι, το ξέρω. είναι μέσα.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/gta-academy/`

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

function GtaSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`gta-section ${className}`} aria-labelledby={id}>
      <div className="gta-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="gta-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="gta-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Crosshair, Search, Moon, Smartphone]
const METHOD_ICONS = [Crosshair, Repeat, Hash, Users]

export function GtaAcademyCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const cars = useShot(SHOTS.cars.file)
  const helicopters = useShot(SHOTS.helicopters.file)
  const planes = useShot(SHOTS.planes.file)
  const special = useShot(SHOTS.special.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = {
    cars,
    helicopters,
    planes,
    special,
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
    <div className="page gta" data-accent="lime">
      <div className="container gta__container cs-scope">
        <Link className="gta__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="gta-hero">
          <Reveal className="gta-hero__copy">
            <div className="gta-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="gta-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              <span className="gta-hero__year">{p.year}</span>
            </div>
            <h1>
              GTA
              <span className="gta-hero__line2">ACADEMY</span>
            </h1>
            <p className="gta-hero__tagline">{c.tagline}</p>
            <p className="gta-hero__summary">{tr(p.summary)}</p>
            <div className="gta-hero__actions">
              {p.demo && (
                <a className="btn btn--primary" href={p.demo} {...external}>
                  {c.live}
                  <ExternalLink aria-hidden="true" />
                </a>
              )}
              <a className="btn btn--outline" href={p.repo} {...external}>
                <Github aria-hidden="true" />
                {c.source}
              </a>
            </div>
          </Reveal>

          <Reveal className="gta-hero__panel" delay={90}>
            <p className="gta-hero__panel-title">Insurgent Pick-Up Custom</p>
            <ul className="gta-rows">
              {[
                ['RPG', '5'],
                ['HOMING', '14'],
                ['Tank Shell', '3'],
                ['Railgun rounds', '10'],
                ['Heavy Sniper Mk II EXP', '22'],
                ['Anti-Aircraft', '1'],
              ].map(([weapon, hits]) => (
                <li key={weapon}>
                  <span>{weapon}</span>
                  <i aria-hidden="true">➟➟</i>
                  <b>{hits}</b>
                </li>
              ))}
            </ul>
            <p className="gta-hero__panel-note">one card, as the site prints it</p>
          </Reveal>

          <span className="cs-note cs-note--to-r gta-note gta-note--hero">{c.notes[0]}</span>
        </header>

        <GtaSection
          id="gta-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="gta-section--tight"
        >
          <dl className="gta-stats">
            {p.metrics?.map((m) => (
              <div className="gta-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="gta-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l gta-note gta-note--metrics">{c.notes[1]}</span>
        </GtaSection>

        <GtaSection
          id="gta-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="gta-section--premise"
        >
          <Reveal className="gta-premise">
            <p className="gta-premise__lead">{c.premiseLead}</p>
            <p className="gta-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r gta-note gta-note--premise">{c.notes[2]}</span>
        </GtaSection>

        {gallery.length > 0 && (
          <GtaSection
            id="gta-output"
            label={c.output}
            aside={c.outputNote}
            className="gta-section--output gta-section--tinted"
          >
            <Reveal className="gta-disclosure" as="p">
              <ImageOff aria-hidden="true" />
              <span>{c.outputDisclosure}</span>
            </Reveal>

            <SwipeHint className="gta-swipe" />
            <div className="gta-gallery">
              {gallery.map((key, i) => (
                <Reveal className="gta-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="gta-frame__btn"
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
                    <span className="gta-frame__expand">{c.expand}</span>
                  </button>
                  <p className="gta-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
            <span className="cs-note cs-note--to-l gta-note gta-note--output">{c.notes[3]}</span>
          </GtaSection>
        )}

        <GtaSection
          id="gta-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="gta-section--pillars"
        >
          <SwipeHint className="gta-swipe" />
          <div className="gta-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Crosshair
              return (
                <Reveal className="gta-pillar" delay={i * 60} key={pillar.title}>
                  <span className="gta-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-r gta-note gta-note--pillars">{c.notes[4]}</span>
        </GtaSection>

        <GtaSection
          id="gta-method"
          label={c.method}
          aside={c.methodNote}
          className="gta-section--method gta-section--tinted"
        >
          <Reveal className="gta-statement" as="p">
            {c.methodLead}
          </Reveal>

          <SwipeHint className="gta-swipe" />
          <div className="gta-methods">
            {c.methodCards.map((card, i) => {
              const Icon = METHOD_ICONS[i] ?? Crosshair
              return (
                <Reveal className="gta-method" delay={i * 60} key={card.problem}>
                  <span className="gta-method__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="gta-method__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="gta-method__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-l gta-note gta-note--method">{c.notes[5]}</span>
        </GtaSection>

        {p.challenges && (
          <GtaSection id="gta-hard" label={c.hard} aside={c.hardNote} className="gta-section--hard">
            <SwipeHint className="gta-swipe" />
            <ol className="gta-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="gta-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </GtaSection>
        )}

        <GtaSection id="gta-how" label={c.how} aside={c.howNote} className="gta-section--how">
          <SwipeHint className="gta-swipe" />
          <Reveal className="gta-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="gta-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="gta-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </GtaSection>

        <GtaSection
          id="gta-honest"
          label={c.honest}
          className="gta-section--honest gta-section--tinted"
        >
          <Reveal className="gta-verdict">
            <p>{c.honestHeadline}</p>
            <ul className="gta-chant">
              {c.honestChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="gta-swipe" />
          <div className="gta-points">
            {c.honestPoints.map(([title, body], i) => (
              <Reveal className="gta-point" delay={i * 60} key={title}>
                <span className="gta-point__icon" aria-hidden="true">
                  {i === 0 ? <Lock /> : i === 1 ? <Hash /> : <ImageOff />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l gta-note gta-note--honest">{c.notes[6]}</span>
        </GtaSection>

        <div className="gta-endgrid">
          {p.lessons && (
            <GtaSection id="gta-lessons" label={c.lessons} className="gta-section--panel">
              <SwipeHint className="gta-swipe" />
              <ul className="gta-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </GtaSection>
          )}

          <GtaSection id="gta-stack" label={c.stack} className="gta-section--panel">
            <div className="gta-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="gta-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </GtaSection>
        </div>

        <Reveal className="gta-finale" as="section">
          <p>{c.finale}</p>
          <div className="gta-finale__actions" aria-label={c.links}>
            {p.demo && (
              <a className="btn btn--primary" href={p.demo} {...external}>
                {c.live}
                <ExternalLink aria-hidden="true" />
              </a>
            )}
            <Link className="btn btn--outline" to="/projects">
              {c.finaleOther}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {near && (
          <nav className="gta-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="gta-nav__copy">
                <span className="gta-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="gta-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="gta-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="gta-nav__copy">
                <span className="gta-nav__label">
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
            className="gta-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="gta-zoom__close"
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
