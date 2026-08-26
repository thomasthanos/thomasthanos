import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Database,
  ExternalLink,
  Frame,
  Gauge,
  Github,
  MousePointerClick,
  Radio,
  RefreshCw,
  ShieldCheck,
  Timer,
  ToggleRight,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/an1me-speed-control.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

const SHOTS = {
  popup: { file: 'popup', w: 645, h: 500 },
  context: { file: 'context', w: 1280, h: 800 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['context']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Browser extension · Manifest V3',
    tagline: 'Hold F7 to go faster. Press F8 to stay there. That is the entire product.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '707 lines in total · 359 in the content script, 231 in the popup stylesheet, 2 in the service worker · one permission, zero dependencies',

    premise: 'The premise',
    premiseNote: 'The entire product, in one sentence.',
    premiseLead: 'The player has no speed control worth using.',
    premiseBody:
      'Every video site eventually makes you want to skip a slow stretch without dragging the scrub bar and losing your place. This adds two keys to one site and then gets out of the way. It is deliberately not part of the Tracker: a tool that does one thing should not need an account, a sync layer or a background process to exist.',

    output: 'Real output',
    outputNote: 'The extension, in place.',
    outputDisclosure:
      'The popup below is the real interface, cropped out of the store listing image so the shot is the UI on its own. The second is a mock-up of the watch page showing the prompt the extension injects.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      popup: 'The whole interface: two keybinds, five speeds, and nothing else.',
      context: 'The prompt the extension injects, on the watch page.',
    } as Record<ShotKey, string>,

    pillars: 'What the two keys do',
    pillarsNote: 'Four behaviours, no settings screen.',
    pillarList: [
      {
        title: 'Hold to boost',
        body: 'F7 speeds playback for exactly as long as you hold it.',
        lines: [
          'jumps to your chosen boost speed on keydown',
          'drops back the moment you let go',
          'shows the new rate as a badge over the video',
        ],
      },
      {
        title: 'Press to lock',
        body: 'F8 latches the boost on, and a second press releases it.',
        lines: [
          'remembers the rate it interrupted',
          'restores that exact rate when switched off',
          'the two keys never fight each other for state',
        ],
      },
      {
        title: 'Remembers your normal',
        body: 'Your everyday speed and volume survive between sessions.',
        lines: [
          'only speeds of 2× or slower are saved as a default',
          'volume and mute persist, debounced at 100ms',
          'a boost can never become your starting speed',
        ],
      },
      {
        title: 'Lives in every frame',
        body: 'The player is inside an iframe, so the script is too.',
        lines: [
          'registered with all_frames in the manifest',
          'a single storage write reaches all of them',
          'no tab messaging, and no tabs permission',
        ],
      },
    ],

    honest: 'Two keys and one honest sentence',
    honestNote: 'The interesting part is the bit that could not be fixed.',
    honestLead:
      'A keydown listener only fires in the document that has focus. The video lives in an iframe, so until you click it, F7 and F8 go to the page around the player and nothing happens. No extension can take focus on your behalf. So rather than pretend, the extension puts a line on screen saying exactly what to do — and that one sentence resolved more confusion than any workaround would have.',
    honestCards: [
      {
        problem: 'Focus is not yours to take',
        answer: 'Say it in the interface',
        body:
          'A toast appears over the player reading “Click the video to activate speed controls,” with both keys drawn on it. It is an admission rather than a feature, and it is the single most useful thing in the project.',
      },
      {
        problem: 'The player overwrites you',
        answer: 'Apply it again. And again',
        body:
          'Setting rate and volume once does not stick — the player re-applies its own values while it initialises. The defaults go on at loadedmetadata, canplay and playing, then again at 500ms, 1s and 2s. Brute force, and the reason it works.',
      },
      {
        problem: 'Popup cannot reach the frames',
        answer: 'Use storage as the bus',
        body:
          'The popup writes the chosen speed to chrome.storage.local and every frame listens on storage.onChanged. One write lands everywhere at once, and no tabs permission is needed to deliver it.',
      },
      {
        problem: 'The site has its own menu',
        answer: 'Catch the click first',
        body:
          'The site runs ArtPlayer. When you set a speed through its settings menu, a capturing-phase listener sees the click before ArtPlayer does, so your choice is recorded instead of quietly diverging from what the extension believes.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'Four small problems, honestly handled.',
    hardMore: 'Technical detail',
    hardShort: [
      'Keystrokes go to whichever document has focus, and the player is not it.',
      'The player re-applies its own rate and volume while it starts up.',
      'The popup and the frames never speak — they share a key instead.',
      'The background worker is two lines because nothing needed to run there.',
    ],

    how: 'How it’s built',
    howNote: 'One write in, every frame out. There is no step four.',
    flow: [
      ['POPUP', 'five buttons'],
      ['chrome.storage', 'selectedSpeed'],
      ['onChanged', 'broadcast'],
      ['EVERY FRAME', 'all_frames'],
      ['video', 'playbackRate'],
    ],

    privacy: 'Privacy',
    privacyHeadline: 'One permission. No network calls at all.',
    privacyChant: ['No analytics.', 'No accounts.', 'No tabs access.', 'No history.'],
    privacyPoints: [
      [
        'What it stores',
        'Four preferences, all in local extension storage on your own machine: the boost speed you picked, your normal playback speed, your volume and your mute state. Nothing else is written, and none of it leaves the browser.',
      ],
      [
        'What it can reach',
        'One site. The manifest lists a single host permission for an1me.to and a single API permission for storage — no tabs, no history, no scripting on anything else. The permission list is short enough to read in full in about two seconds.',
      ],
      [
        'What it sends',
        'Nothing. There is no fetch, no request and no endpoint anywhere in the source. The only outbound links are the two donate buttons in the popup, which open a page when you click them and never otherwise.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'Two keys, one permission, and nothing left to add.',
    finaleOther: 'See other projects',

    notes: [
      'two keys. that is it.',
      'all four counted.',
      'no account. no sync. no worker.',
      'the real UI, cropped out.',
      'none of them need a menu.',
      'the toast is the feature.',
      'read the permission list. it is one line.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Browser extension · Manifest V3',
    tagline: 'Κρατάς F7 και τρέχει. Πατάς F8 και μένει. Αυτό είναι όλο το προϊόν.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '707 γραμμές συνολικά · 359 στο content script, 231 στο stylesheet του popup, 2 στον service worker · ένα permission, μηδέν dependencies',

    premise: 'Η αφετηρία',
    premiseNote: 'Όλο το προϊόν, σε μία πρόταση.',
    premiseLead: 'Ο player δεν έχει speed control που να αξίζει.',
    premiseBody:
      'Κάθε site με βίντεο κάποια στιγμή σε κάνει να θέλεις να προσπεράσεις ένα αργό κομμάτι χωρίς να σέρνεις τη μπάρα και να χάνεις τη θέση σου. Αυτό προσθέτει δύο πλήκτρα σε ένα site και μετά φεύγει από τη μέση. Επίτηδες δεν είναι κομμάτι του Tracker: ένα εργαλείο που κάνει ένα πράγμα δεν χρειάζεται λογαριασμό, sync layer ή background process για να υπάρχει.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Το extension, στη θέση του.',
    outputDisclosure:
      'Το popup παρακάτω είναι το πραγματικό interface, κομμένο από την εικόνα του store ώστε το στιγμιότυπο να είναι μόνο το UI. Το δεύτερο είναι mock-up της σελίδας παρακολούθησης που δείχνει το μήνυμα που εισάγει το extension.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      popup: 'Όλο το interface: δύο keybinds, πέντε ταχύτητες, τίποτα άλλο.',
      context: 'Το μήνυμα που εισάγει το extension, στη σελίδα παρακολούθησης.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνουν τα δύο πλήκτρα',
    pillarsNote: 'Τέσσερις συμπεριφορές, καμία οθόνη ρυθμίσεων.',
    pillarList: [
      {
        title: 'Κράτα για boost',
        body: 'Το F7 επιταχύνει για ακριβώς όσο το κρατάς.',
        lines: [
          'πηδάει στην επιλεγμένη ταχύτητα boost στο keydown',
          'επιστρέφει τη στιγμή που το αφήνεις',
          'δείχνει τον νέο ρυθμό ως badge πάνω στο βίντεο',
        ],
      },
      {
        title: 'Πάτα για κλείδωμα',
        body: 'Το F8 κλειδώνει το boost, και δεύτερο πάτημα το λύνει.',
        lines: [
          'θυμάται τον ρυθμό που διέκοψε',
          'επαναφέρει ακριβώς αυτόν όταν κλείσει',
          'τα δύο πλήκτρα δεν μαλώνουν ποτέ για την κατάσταση',
        ],
      },
      {
        title: 'Θυμάται το κανονικό σου',
        body: 'Η καθημερινή σου ταχύτητα και ένταση επιβιώνουν ανάμεσα στα sessions.',
        lines: [
          'μόνο ταχύτητες 2× ή πιο αργές αποθηκεύονται ως προεπιλογή',
          'ένταση και mute μένουν, με debounce στα 100ms',
          'ένα boost δεν γίνεται ποτέ η ταχύτητα εκκίνησης',
        ],
      },
      {
        title: 'Ζει σε κάθε frame',
        body: 'Ο player είναι μέσα σε iframe, άρα και το script.',
        lines: [
          'δηλωμένο με all_frames στο manifest',
          'ένα μόνο write στο storage τα φτάνει όλα',
          'χωρίς messaging σε tabs, χωρίς permission tabs',
        ],
      },
    ],

    honest: 'Δύο πλήκτρα και μία τίμια πρόταση',
    honestNote: 'Το ενδιαφέρον είναι το κομμάτι που δεν διορθωνόταν.',
    honestLead:
      'Ένας listener keydown πυροδοτείται μόνο στο document που έχει focus. Το βίντεο ζει σε iframe, οπότε μέχρι να κάνεις κλικ πάνω του, τα F7 και F8 πάνε στη σελίδα γύρω από τον player και δεν γίνεται τίποτα. Κανένα extension δεν μπορεί να πάρει focus για λογαριασμό σου. Οπότε αντί να προσποιηθεί, το extension βάζει μια γραμμή στην οθόνη που λέει ακριβώς τι να κάνεις — και αυτή η μία πρόταση έλυσε περισσότερη σύγχυση απ᾽ όσο κάθε workaround.',
    honestCards: [
      {
        problem: 'Το focus δεν σου ανήκει',
        answer: 'Πες το στο interface',
        body:
          'Εμφανίζεται ένα toast πάνω από τον player που γράφει «Click the video to activate speed controls», με τα δύο πλήκτρα σχεδιασμένα πάνω του. Είναι παραδοχή παρά feature, και είναι το πιο χρήσιμο πράγμα στο project.',
      },
      {
        problem: 'Ο player σε ξαναγράφει',
        answer: 'Ξαναβάλ᾽ το. Και ξανά',
        body:
          'Το να ορίσεις ρυθμό και ένταση μία φορά δεν κρατάει — ο player ξαναβάζει τις δικές του τιμές καθώς αρχικοποιείται. Οι προεπιλογές μπαίνουν σε loadedmetadata, canplay και playing, και ξανά στα 500ms, 1s και 2s. Μπρούτε φορς, και ο λόγος που δουλεύει.',
      },
      {
        problem: 'Το popup δεν φτάνει τα frames',
        answer: 'Κάνε το storage δίαυλο',
        body:
          'Το popup γράφει την επιλεγμένη ταχύτητα στο chrome.storage.local και κάθε frame ακούει στο storage.onChanged. Ένα write προσγειώνεται παντού ταυτόχρονα, και δεν χρειάζεται permission tabs για να παραδοθεί.',
      },
      {
        problem: 'Το site έχει δικό του μενού',
        answer: 'Πιάσε πρώτος το κλικ',
        body:
          'Το site τρέχει ArtPlayer. Όταν βάζεις ταχύτητα από το μενού ρυθμίσεών του, ένας listener σε capturing phase βλέπει το κλικ πριν τον ArtPlayer, ώστε η επιλογή σου να καταγραφεί αντί να αποκλίνει σιωπηλά από αυτό που νομίζει το extension.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τέσσερα μικρά προβλήματα, τίμια αντιμετωπισμένα.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Τα πλήκτρα πάνε σε όποιο document έχει focus, και ο player δεν είναι αυτό.',
      'Ο player ξαναβάζει τον δικό του ρυθμό και ένταση καθώς ξεκινάει.',
      'Το popup και τα frames δεν μιλάνε ποτέ — μοιράζονται ένα κλειδί.',
      'Ο background worker είναι δύο γραμμές επειδή τίποτα δεν χρειαζόταν να τρέχει εκεί.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Ένα write μέσα, όλα τα frames έξω. Δεν υπάρχει βήμα τέσσερα.',
    flow: [
      ['POPUP', 'πέντε κουμπιά'],
      ['chrome.storage', 'selectedSpeed'],
      ['onChanged', 'broadcast'],
      ['ΚΑΘΕ FRAME', 'all_frames'],
      ['video', 'playbackRate'],
    ],

    privacy: 'Ιδιωτικότητα',
    privacyHeadline: 'Ένα permission. Καμία απολύτως κλήση δικτύου.',
    privacyChant: ['Χωρίς analytics.', 'Χωρίς λογαριασμούς.', 'Χωρίς πρόσβαση σε tabs.', 'Χωρίς ιστορικό.'],
    privacyPoints: [
      [
        'Τι αποθηκεύει',
        'Τέσσερις προτιμήσεις, όλες στο τοπικό storage του extension στο δικό σου μηχάνημα: την ταχύτητα boost που διάλεξες, την κανονική σου ταχύτητα, την ένταση και το mute. Τίποτα άλλο δεν γράφεται, και τίποτα από αυτά δεν φεύγει από τον browser.',
      ],
      [
        'Τι μπορεί να φτάσει',
        'Ένα site. Το manifest δηλώνει ένα host permission για το an1me.to και ένα API permission για storage — χωρίς tabs, χωρίς ιστορικό, χωρίς scripting σε οτιδήποτε άλλο. Η λίστα permissions διαβάζεται ολόκληρη σε δύο δευτερόλεπτα.',
      ],
      [
        'Τι στέλνει',
        'Τίποτα. Δεν υπάρχει fetch, ούτε request, ούτε endpoint πουθενά στον κώδικα. Οι μόνοι εξερχόμενοι σύνδεσμοι είναι τα δύο κουμπιά δωρεάς στο popup, που ανοίγουν σελίδα όταν τα πατήσεις και ποτέ αλλιώς.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Δύο πλήκτρα, ένα permission, και τίποτα άλλο να προστεθεί.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'δύο πλήκτρα. τέλος.',
      'και τα τέσσερα μετρημένα.',
      'χωρίς λογαριασμό. χωρίς sync.',
      'το αληθινό UI, κομμένο.',
      'κανένα δεν θέλει μενού.',
      'το toast είναι το feature.',
      'διάβασε τα permissions. μία γραμμή.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/an1me-speed-control/`

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

function AscSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`asc-section ${className}`} aria-labelledby={id}>
      <div className="asc-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="asc-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="asc-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Gauge, ToggleRight, Timer, Frame]
const HONEST_ICONS = [MousePointerClick, RefreshCw, Radio, MousePointerClick]

export function An1meSpeedControlCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const popup = useShot(SHOTS.popup.file)
  const context = useShot(SHOTS.context.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = { popup, context }

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
    <div className="page asc" data-accent="violet">
      <div className="container asc__container cs-scope">
        <Link className="asc__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="asc-hero" data-solo={popup.broken ? 'y' : undefined}>
          <Reveal className="asc-hero__copy">
            <div className="asc-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="asc-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              {p.version && <span className="asc-hero__ver">v{p.version}</span>}
            </div>
            <h1>
              SPEED
              <span className="asc-hero__line2">CONTROL</span>
            </h1>
            <p className="asc-hero__tagline">{c.tagline}</p>

            <div className="asc-keys" aria-hidden="true">
              <span className="asc-key asc-key--hold">
                <b>Hold</b>
                <i>F7</i>
              </span>
              <span className="asc-key asc-key--toggle">
                <b>Toggle</b>
                <i>F8</i>
              </span>
            </div>

            <p className="asc-hero__summary">{tr(p.summary)}</p>
            <div className="asc-hero__actions">
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

          {!popup.broken && (
            <Reveal className="asc-hero__shot" delay={90}>
              <button
                type="button"
                className="asc-hero__shot-btn"
                onClick={() => setZoomed('popup')}
              >
                <img
                  {...popup.props}
                  alt={c.shotCaptions.popup}
                  width={SHOTS.popup.w}
                  height={SHOTS.popup.h}
                  fetchPriority="high"
                  decoding="async"
                />
              </button>
              <p>{c.shotCaptions.popup}</p>
            </Reveal>
          )}

          <span className="cs-note cs-note--to-r asc-note asc-note--hero">{c.notes[0]}</span>
        </header>

        <AscSection
          id="asc-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="asc-section--tight"
        >
          <dl className="asc-stats">
            {p.metrics?.map((m) => (
              <div className="asc-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="asc-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l asc-note asc-note--metrics">{c.notes[1]}</span>
        </AscSection>

        <AscSection
          id="asc-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="asc-section--premise"
        >
          <Reveal className="asc-premise">
            <p className="asc-premise__lead">{c.premiseLead}</p>
            <p className="asc-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r asc-note asc-note--premise">{c.notes[2]}</span>
        </AscSection>

        {gallery.length > 0 && (
          <AscSection
            id="asc-output"
            label={c.output}
            aside={c.outputNote}
            className="asc-section--output asc-section--tinted"
          >
            <Reveal className="asc-disclosure" as="p">
              <ShieldCheck aria-hidden="true" />
              <span>{c.outputDisclosure}</span>
            </Reveal>

            <div className="asc-gallery">
              {gallery.map((key, i) => (
                <Reveal className="asc-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="asc-frame__btn"
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
                    <span className="asc-frame__expand">{c.expand}</span>
                  </button>
                  <p className="asc-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
            <span className="cs-note cs-note--to-l asc-note asc-note--output">{c.notes[3]}</span>
          </AscSection>
        )}

        <AscSection
          id="asc-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="asc-section--pillars"
        >
          <SwipeHint className="asc-swipe" />
          <div className="asc-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Gauge
              return (
                <Reveal className="asc-pillar" delay={i * 60} key={pillar.title}>
                  <span className="asc-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-r asc-note asc-note--pillars">{c.notes[4]}</span>
        </AscSection>

        <AscSection
          id="asc-honest"
          label={c.honest}
          aside={c.honestNote}
          className="asc-section--honest asc-section--tinted"
        >
          <Reveal className="asc-statement" as="p">
            {c.honestLead}
          </Reveal>

          <SwipeHint className="asc-swipe" />
          <div className="asc-honests">
            {c.honestCards.map((card, i) => {
              const Icon = HONEST_ICONS[i] ?? MousePointerClick
              return (
                <Reveal className="asc-honest" delay={i * 60} key={card.problem}>
                  <span className="asc-honest__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="asc-honest__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="asc-honest__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-l asc-note asc-note--honest">{c.notes[5]}</span>
        </AscSection>

        {p.challenges && (
          <AscSection id="asc-hard" label={c.hard} aside={c.hardNote} className="asc-section--hard">
            <SwipeHint className="asc-swipe" />
            <ol className="asc-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="asc-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </AscSection>
        )}

        <AscSection id="asc-how" label={c.how} aside={c.howNote} className="asc-section--how">
          <SwipeHint className="asc-swipe" />
          <Reveal className="asc-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="asc-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="asc-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </AscSection>

        <AscSection
          id="asc-privacy"
          label={c.privacy}
          className="asc-section--privacy asc-section--tinted"
        >
          <Reveal className="asc-verdict">
            <p>{c.privacyHeadline}</p>
            <ul className="asc-chant">
              {c.privacyChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="asc-swipe" />
          <div className="asc-points">
            {c.privacyPoints.map(([title, body], i) => (
              <Reveal className="asc-point" delay={i * 60} key={title}>
                <span className="asc-point__icon" aria-hidden="true">
                  {i === 0 ? <Database /> : i === 1 ? <ShieldCheck /> : <Radio />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l asc-note asc-note--privacy">{c.notes[6]}</span>
        </AscSection>

        <div className="asc-endgrid">
          {p.lessons && (
            <AscSection id="asc-lessons" label={c.lessons} className="asc-section--panel">
              <SwipeHint className="asc-swipe" />
              <ul className="asc-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </AscSection>
          )}

          <AscSection id="asc-stack" label={c.stack} className="asc-section--panel">
            <div className="asc-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="asc-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </AscSection>
        </div>

        <Reveal className="asc-finale" as="section">
          <p>{c.finale}</p>
          <div className="asc-finale__actions" aria-label={c.links}>
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
          <nav className="asc-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="asc-nav__copy">
                <span className="asc-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="asc-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="asc-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="asc-nav__copy">
                <span className="asc-nav__label">
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
            className="asc-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="asc-zoom__close"
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
