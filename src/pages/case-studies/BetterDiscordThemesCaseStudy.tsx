import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  Code2,
  ExternalLink,
  FolderTree,
  Github,
  History,
  Layers,
  PauseCircle,
  Palette,
  Users,
  Wand2,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/betterdiscord-themes.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/* No captures live in this repository — every shot is probed on mount, so the section stays
   hidden until a .webp exists and lights up on its own once one does. */
const SHOTS = {
  v3: { file: 'simpletheme-v3', w: 1280, h: 800 },
  folder: { file: 'folder-theme', w: 1280, h: 800 },
  plugins: { file: 'plugins', w: 1280, h: 800 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['v3', 'folder', 'plugins']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'BetterDiscord · themes and plugins',
    tagline: 'The first thing I ever built by hand, and the reason every UI since looks the way it does.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '12,004 lines of CSS, JavaScript and one HTML page · 3,246 in the V2 stylesheet alone, 1,425 in the largest plugin · no build step, no framework, no dependency of any kind',

    premise: 'The premise',
    premiseNote: 'Where all of it started.',
    premiseLead: 'Default Discord feels like a corporate spreadsheet with a dark mode filter.',
    premiseBody:
      'Around 2018 I found BetterDiscord and started pulling it apart. No AI, no course, no tutorial that matched what I was looking at — just devtools open on a live application, a stylesheet, and enough stubbornness to keep going after breaking it. Everything I know about interfaces started in this repository, on a product I did not own and whose markup I could not change.',

    output: 'Real output',
    outputNote: 'Screenshots of the themes running.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      v3: 'Simpletheme V3 — the current generation.',
      folder: 'The folder theme, generated from its own plugin.',
      plugins: 'The plugin list inside BetterDiscord.',
    } as Record<ShotKey, string>,

    pillars: 'What is in it',
    pillarsNote: 'Four themes, six plugins, one long argument with a client I did not write.',
    pillarList: [
      {
        title: 'Simpletheme V3',
        body: 'The current line, and the one that is actually maintained.',
        lines: [
          'version 2.0, 1,869 lines of stylesheet',
          'V2 stays in the repo at 3,246 lines',
          'the previous working V3 sits beside it as a rollback',
        ],
      },
      {
        title: 'Folder Theme',
        body: 'Folder categorisation and a quieter sidebar.',
        lines: [
          'paired with the FolderManager plugin',
          'the stylesheet is emitted from the plugin, not hand-written',
          '599 lines the author never typed',
        ],
      },
      {
        title: 'Prezomenoi',
        body: 'A community theme for a server I was running.',
        lines: [
          'per-guild icon and banner overrides',
          'the only theme written for other people first',
          'kept as legacy rather than deleted',
        ],
      },
      {
        title: 'The plugins',
        body: 'Behaviour the client does not ship with.',
        lines: [
          'FolderManager at 1,425 lines, the biggest thing here',
          'NoPause for Quests, the one still loaded',
          'every interface written in Greek, for a Greek server',
        ],
      },
    ],

    borrowed: 'Styling something you do not own',
    borrowedNote: 'The constraint that shaped everything after it.',
    borrowedLead:
      'A theme is CSS pointed at an application somebody else builds, ships and rewrites without telling you. There is no markup to fix, no class to rename, no build step to hook into. Every class name is machine-generated and can change on any release. You cannot own the structure — you can only learn to read it faster than it changes.',
    borrowedCards: [
      {
        problem: 'Class names are not yours',
        answer: 'Target structure, not labels',
        body:
          'Generated class names survive nothing. What survives is the shape of the tree — what sits inside what, what follows what, what is the only child of its kind. Learning to write selectors that describe relationships instead of names was the entire lesson, and it is the one that transferred to every project since.',
      },
      {
        problem: 'Every update can break it',
        answer: 'Keep the last one that worked',
        body:
          'There is no changelog for internals and no warning before a release. That is why the previous working V3 is still in the folder under a name that literally says OLD_WORKING, and why V2 was never deleted. It reads as untidiness until the morning an update lands and it is the only rollback you have.',
      },
      {
        problem: 'Two files must agree',
        answer: 'Generate one from the other',
        body:
          'FolderManager grew past a thousand lines and its matching stylesheet had to stay in step with it. Writing the same structure in two languages is how the two of them quietly drift apart, so the theme is emitted by the plugin instead. First tool I ever wrote to write my own code.',
      },
      {
        problem: 'Not everything deserves shipping',
        answer: 'Park it, do not delete it',
        body:
          'Only one of the six plugins carries a real BetterDiscord metadata header. The other five sit in the folder behind a leading dot — present, not loading, and not thrown away either, because half of them still work and I have not decided which are worth bringing back.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'What it is actually like to build on someone else’s client.',
    hardMore: 'Technical detail',
    hardShort: [
      'No markup to fix, no class to rename, and every name is generated.',
      'A client update can break all of it, with no changelog and no warning.',
      'The largest plugin outgrew a hand-written stylesheet, so it writes its own.',
      'There is no registry, so four plugins update themselves straight from this repo.',
      'Five of the six plugins are parked rather than shipped, and the repo says so.',
    ],

    how: 'How it’s built',
    howNote: 'There is no pipeline. There is a browser inspector and a text file.',
    flow: [
      ['DEVTOOLS', 'open on a live app'],
      ['SELECTOR', 'structure, not names'],
      ['theme.css', 'one flat file'],
      ['BETTERDISCORD', 'loads it in'],
      ['CLIENT', 'restyled'],
    ],

    honest: 'Honest accounting',
    honestHeadline: 'Three things this repository admits about itself.',
    honestChant: ['No build.', 'No framework.', 'No dependencies.', 'No minifier.'],
    honestPoints: [
      [
        'The repo is younger than the work',
        'Git history here starts in October 2023, but the themes go back to roughly 2018. The repository is a re-upload, so the commit graph measures how long this copy has existed, not how long the project has. The 511 commits are real; the start date is not the beginning.',
      ],
      [
        'A filename got published',
        'The V2 stylesheet still declares its name as “SimplethemeV2 - Αντιγραφή”. That is the Greek word Windows appends when you duplicate a file — it leaked out of a filename, into the metadata header, and out to everyone who installed it. It has been sitting there for years and it is staying.',
      ],
      [
        'It is a workshop, not a shelf',
        'Four themes are documented in the readme; five stylesheets are in the folder. Four plugins are documented; six exist. The difference is backups and parked experiments, and the honest description of this repository is a bench with work still on it rather than a finished product listing.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'No AI, no framework, no build step. Just devtools and refusing to stop.',
    finaleOther: 'See other projects',

    notes: [
      'this is where it started.',
      'all four counted, not guessed.',
      '2018. devtools and stubbornness.',
      'four themes, six plugins.',
      'the markup was never mine.',
      'yes, Αντιγραφή. it shipped.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'BetterDiscord · themes και plugins',
    tagline: 'Το πρώτο πράγμα που έφτιαξα με τα χέρια μου, και ο λόγος που κάθε UI από τότε δείχνει έτσι.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '12.004 γραμμές CSS, JavaScript και μίας σελίδας HTML · 3.246 μόνο στο stylesheet του V2, 1.425 στο μεγαλύτερο plugin · χωρίς build step, χωρίς framework, χωρίς καμία εξάρτηση',

    premise: 'Η αφετηρία',
    premiseNote: 'Από εδώ ξεκίνησαν όλα.',
    premiseLead: 'Το default Discord μοιάζει με εταιρικό spreadsheet που του έβαλαν φίλτρο dark mode.',
    premiseBody:
      'Γύρω στο 2018 έπεσε στα χέρια μου το BetterDiscord και άρχισα να το ξεσκίζω. Χωρίς AI, χωρίς μάθημα, χωρίς tutorial που να ταιριάζει με αυτό που κοιτούσα — μόνο devtools ανοιχτά πάνω σε μια ζωντανή εφαρμογή, ένα stylesheet, και αρκετό πείσμα ώστε να συνεχίσω αφού το έσπασα. Ό,τι ξέρω για interfaces ξεκίνησε σε αυτό το repository, πάνω σε ένα προϊόν που δεν μου ανήκε και του οποίου δεν μπορούσα να αλλάξω το markup.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Στιγμιότυπα από τα themes σε λειτουργία.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      v3: 'Simpletheme V3 — η τρέχουσα γενιά.',
      folder: 'Το folder theme, παραγόμενο από το ίδιο του το plugin.',
      plugins: 'Η λίστα plugins μέσα στο BetterDiscord.',
    } as Record<ShotKey, string>,

    pillars: 'Τι περιέχει',
    pillarsNote: 'Τέσσερα themes, έξι plugins, μία μακρά διαφωνία με client που δεν έγραψα.',
    pillarList: [
      {
        title: 'Simpletheme V3',
        body: 'Η τρέχουσα γραμμή, και αυτή που όντως συντηρείται.',
        lines: [
          'έκδοση 2.0, 1.869 γραμμές stylesheet',
          'το V2 μένει στο repo με 3.246 γραμμές',
          'το προηγούμενο V3 που δούλευε κάθεται δίπλα ως rollback',
        ],
      },
      {
        title: 'Folder Theme',
        body: 'Κατηγοριοποίηση φακέλων και πιο ήσυχο sidebar.',
        lines: [
          'μαζί με το plugin FolderManager',
          'το stylesheet παράγεται από το plugin, δεν γράφτηκε στο χέρι',
          '599 γραμμές που δεν πληκτρολόγησε ποτέ κανείς',
        ],
      },
      {
        title: 'Prezomenoi',
        body: 'Community theme για server που έτρεχα.',
        lines: [
          'αντικαταστάσεις εικονιδίων και banner ανά guild',
          'το μόνο theme γραμμένο πρώτα για άλλους',
          'κρατήθηκε ως legacy αντί να διαγραφεί',
        ],
      },
      {
        title: 'Τα plugins',
        body: 'Συμπεριφορά που δεν έχει ο client.',
        lines: [
          'FolderManager με 1.425 γραμμές, το μεγαλύτερο εδώ',
          'NoPause for Quests, το μόνο που φορτώνει ακόμα',
          'κάθε interface γραμμένο στα ελληνικά, για ελληνικό server',
        ],
      },
    ],

    borrowed: 'Styling σε κάτι που δεν σου ανήκει',
    borrowedNote: 'Ο περιορισμός που διαμόρφωσε ό,τι ήρθε μετά.',
    borrowedLead:
      'Ένα theme είναι CSS στραμμένο σε εφαρμογή που χτίζει, εκδίδει και ξαναγράφει κάποιος άλλος χωρίς να σου το πει. Δεν υπάρχει markup να διορθώσεις, ούτε class να μετονομάσεις, ούτε build step να πιαστείς. Κάθε όνομα class είναι παραγμένο από μηχανή και μπορεί να αλλάξει σε κάθε έκδοση. Δεν μπορείς να κατέχεις τη δομή — μπορείς μόνο να μάθεις να τη διαβάζεις πιο γρήγορα απ᾽ ό,τι αλλάζει.',
    borrowedCards: [
      {
        problem: 'Τα ονόματα class δεν είναι δικά σου',
        answer: 'Στόχευσε δομή, όχι ετικέτες',
        body:
          'Τα παραγμένα ονόματα δεν επιβιώνουν από τίποτα. Αυτό που επιβιώνει είναι το σχήμα του δέντρου — τι κάθεται μέσα σε τι, τι ακολουθεί τι, τι είναι το μοναδικό παιδί του είδους του. Το να μάθω να γράφω selectors που περιγράφουν σχέσεις αντί για ονόματα ήταν όλο το μάθημα, και είναι αυτό που μεταφέρθηκε σε κάθε project από τότε.',
      },
      {
        problem: 'Κάθε update μπορεί να τα σπάσει',
        answer: 'Κράτα το τελευταίο που δούλευε',
        body:
          'Δεν υπάρχει changelog για τα εσωτερικά ούτε προειδοποίηση πριν από έκδοση. Γι᾽ αυτό το προηγούμενο V3 που δούλευε είναι ακόμα στον φάκελο με όνομα που λέει κυριολεκτικά OLD_WORKING, και γι᾽ αυτό το V2 δεν διαγράφηκε ποτέ. Διαβάζεται ως ακαταστασία μέχρι το πρωί που σκάει ένα update και είναι το μόνο rollback που έχεις.',
      },
      {
        problem: 'Δύο αρχεία πρέπει να συμφωνούν',
        answer: 'Παρήγαγε το ένα από το άλλο',
        body:
          'Το FolderManager ξεπέρασε τις χίλιες γραμμές και το αντίστοιχο stylesheet έπρεπε να μένει συγχρονισμένο. Το να γράφεις την ίδια δομή σε δύο γλώσσες είναι ο τρόπος με τον οποίο αποκλίνουν σιωπηλά, οπότε το theme παράγεται από το plugin. Το πρώτο εργαλείο που έγραψα για να γράφει τον κώδικά μου.',
      },
      {
        problem: 'Δεν αξίζουν όλα να βγουν',
        answer: 'Πάρκαρέ το, μη το σβήσεις',
        body:
          'Μόνο ένα από τα έξι plugins έχει κανονικό BetterDiscord metadata header. Τα άλλα πέντε κάθονται στον φάκελο πίσω από μια τελεία — παρόντα, χωρίς να φορτώνουν, και ούτε πεταμένα, επειδή τα μισά ακόμα δουλεύουν και δεν έχω αποφασίσει ποια αξίζει να επιστρέψουν.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Πώς είναι πραγματικά να χτίζεις πάνω στον client κάποιου άλλου.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Κανένα markup να διορθώσεις, καμία class να μετονομάσεις, και κάθε όνομα παραγμένο.',
      'Ένα update του client μπορεί να τα σπάσει όλα, χωρίς changelog και χωρίς προειδοποίηση.',
      'Το μεγαλύτερο plugin ξεπέρασε το χειρόγραφο stylesheet, οπότε γράφει το δικό του.',
      'Δεν υπάρχει registry, οπότε τέσσερα plugins ενημερώνονται κατευθείαν από αυτό το repo.',
      'Πέντε από τα έξι plugins είναι παρκαρισμένα αντί για δημοσιευμένα, και το repo το λέει.',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Δεν υπάρχει pipeline. Υπάρχει ένας inspector και ένα αρχείο κειμένου.',
    flow: [
      ['DEVTOOLS', 'πάνω σε ζωντανή app'],
      ['SELECTOR', 'δομή, όχι ονόματα'],
      ['theme.css', 'ένα επίπεδο αρχείο'],
      ['BETTERDISCORD', 'το φορτώνει'],
      ['CLIENT', 'ξαναστυλαρισμένος'],
    ],

    honest: 'Τίμιος απολογισμός',
    honestHeadline: 'Τρία πράγματα που παραδέχεται το ίδιο το repository.',
    honestChant: ['Χωρίς build.', 'Χωρίς framework.', 'Χωρίς εξαρτήσεις.', 'Χωρίς minifier.'],
    honestPoints: [
      [
        'Το repo είναι νεότερο από τη δουλειά',
        'Το git history εδώ ξεκινά τον Οκτώβριο του 2023, αλλά τα themes πάνε πίσω περίπου στο 2018. Το repository είναι re-upload, οπότε το commit graph μετράει πόσο υπάρχει αυτό το αντίγραφο, όχι πόσο υπάρχει το project. Τα 511 commits είναι αληθινά· η ημερομηνία έναρξης δεν είναι η αρχή.',
      ],
      [
        'Ένα όνομα αρχείου δημοσιεύτηκε',
        'Το stylesheet του V2 δηλώνει ακόμα το όνομά του ως «SimplethemeV2 - Αντιγραφή». Αυτό είναι που προσθέτουν τα Windows όταν διπλασιάζεις αρχείο — διέρρευσε από όνομα αρχείου, μέσα στο metadata header, και έξω προς όποιον το εγκατέστησε. Κάθεται εκεί χρόνια και μένει.',
      ],
      [
        'Είναι εργαστήριο, όχι ράφι',
        'Τέσσερα themes τεκμηριώνονται στο readme· πέντε stylesheets είναι στον φάκελο. Τέσσερα plugins τεκμηριώνονται· έξι υπάρχουν. Η διαφορά είναι backups και παρκαρισμένα πειράματα, και η τίμια περιγραφή αυτού του repository είναι ένας πάγκος με δουλειά πάνω του και όχι λίστα ολοκληρωμένων προϊόντων.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Χωρίς AI, χωρίς framework, χωρίς build step. Μόνο devtools και άρνηση να σταματήσω.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'από εδώ ξεκίνησαν όλα.',
      'και τα τέσσερα μετρημένα.',
      '2018. devtools και πείσμα.',
      'τέσσερα themes, έξι plugins.',
      'το markup δεν ήταν ποτέ δικό μου.',
      'ναι, Αντιγραφή. βγήκε έτσι.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/betterdiscord-themes/`

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

function BdtSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`bdt-section ${className}`} aria-labelledby={id}>
      <div className="bdt-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="bdt-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="bdt-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Palette, FolderTree, Users, PauseCircle]
const BORROWED_ICONS = [Code2, History, Wand2, Archive]

export function BetterDiscordThemesCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const v3 = useShot(SHOTS.v3.file)
  const folder = useShot(SHOTS.folder.file)
  const plugins = useShot(SHOTS.plugins.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = { v3, folder, plugins }

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
    <div className="page bdt" data-accent="orange">
      <div className="container bdt__container cs-scope">
        <Link className="bdt__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="bdt-hero">
          <Reveal className="bdt-hero__copy">
            <div className="bdt-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="bdt-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              <span className="bdt-hero__year">{p.year}</span>
            </div>
            <h1>
              1ST
              <span className="bdt-hero__line2">THEME</span>
            </h1>
            <p className="bdt-hero__tagline">{c.tagline}</p>
            <p className="bdt-hero__summary">{tr(p.summary)}</p>
            <div className="bdt-hero__actions">
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

          {/* the device: the metadata header every BetterDiscord theme opens with */}
          <Reveal className="bdt-meta" delay={90}>
            <p className="bdt-meta__open" aria-hidden="true">/**</p>
            <dl>
              {[
                ['@name', 'SimplethemeV3'],
                ['@description', 'Simple Discord theme with custom emojis'],
                ['@author', 'Thomas Thanos'],
                ['@version', '2.0'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="bdt-meta__close" aria-hidden="true">*/</p>
          </Reveal>

          <span className="cs-note cs-note--to-r bdt-note bdt-note--hero">{c.notes[0]}</span>
        </header>

        <BdtSection
          id="bdt-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="bdt-section--tight"
        >
          <dl className="bdt-stats">
            {p.metrics?.map((m) => (
              <div className="bdt-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="bdt-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l bdt-note bdt-note--metrics">{c.notes[1]}</span>
        </BdtSection>

        <BdtSection
          id="bdt-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="bdt-section--premise"
        >
          <Reveal className="bdt-premise">
            <p className="bdt-premise__lead">{c.premiseLead}</p>
            <p className="bdt-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r bdt-note bdt-note--premise">{c.notes[2]}</span>
        </BdtSection>

        {gallery.length > 0 && (
          <BdtSection
            id="bdt-output"
            label={c.output}
            aside={c.outputNote}
            className="bdt-section--output bdt-section--tinted"
          >
            <SwipeHint className="bdt-swipe" />
            <div className="bdt-gallery">
              {gallery.map((key, i) => (
                <Reveal className="bdt-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="bdt-frame__btn"
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
                    <span className="bdt-frame__expand">{c.expand}</span>
                  </button>
                  <p className="bdt-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
          </BdtSection>
        )}

        <BdtSection
          id="bdt-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="bdt-section--pillars"
        >
          <SwipeHint className="bdt-swipe" />
          <div className="bdt-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Palette
              return (
                <Reveal className="bdt-pillar" delay={i * 60} key={pillar.title}>
                  <span className="bdt-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-l bdt-note bdt-note--pillars">{c.notes[3]}</span>
        </BdtSection>

        <BdtSection
          id="bdt-borrowed"
          label={c.borrowed}
          aside={c.borrowedNote}
          className="bdt-section--borrowed bdt-section--tinted"
        >
          <Reveal className="bdt-statement" as="p">
            {c.borrowedLead}
          </Reveal>

          <SwipeHint className="bdt-swipe" />
          <div className="bdt-borroweds">
            {c.borrowedCards.map((card, i) => {
              const Icon = BORROWED_ICONS[i] ?? Code2
              return (
                <Reveal className="bdt-borrowed" delay={i * 60} key={card.problem}>
                  <span className="bdt-borrowed__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="bdt-borrowed__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="bdt-borrowed__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-r bdt-note bdt-note--borrowed">{c.notes[4]}</span>
        </BdtSection>

        {p.challenges && (
          <BdtSection id="bdt-hard" label={c.hard} aside={c.hardNote} className="bdt-section--hard">
            <SwipeHint className="bdt-swipe" />
            <ol className="bdt-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="bdt-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </BdtSection>
        )}

        <BdtSection id="bdt-how" label={c.how} aside={c.howNote} className="bdt-section--how">
          <SwipeHint className="bdt-swipe" />
          <Reveal className="bdt-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="bdt-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="bdt-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </BdtSection>

        <BdtSection
          id="bdt-honest"
          label={c.honest}
          className="bdt-section--honest bdt-section--tinted"
        >
          <Reveal className="bdt-verdict">
            <p>{c.honestHeadline}</p>
            <ul className="bdt-chant">
              {c.honestChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="bdt-swipe" />
          <div className="bdt-points">
            {c.honestPoints.map(([title, body], i) => (
              <Reveal className="bdt-point" delay={i * 60} key={title}>
                <span className="bdt-point__icon" aria-hidden="true">
                  {i === 0 ? <History /> : i === 1 ? <Code2 /> : <Layers />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l bdt-note bdt-note--honest">{c.notes[5]}</span>
        </BdtSection>

        <div className="bdt-endgrid">
          {p.lessons && (
            <BdtSection id="bdt-lessons" label={c.lessons} className="bdt-section--panel">
              <SwipeHint className="bdt-swipe" />
              <ul className="bdt-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </BdtSection>
          )}

          <BdtSection id="bdt-stack" label={c.stack} className="bdt-section--panel">
            <div className="bdt-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="bdt-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </BdtSection>
        </div>

        <Reveal className="bdt-finale" as="section">
          <p>{c.finale}</p>
          <div className="bdt-finale__actions" aria-label={c.links}>
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
          <nav className="bdt-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="bdt-nav__copy">
                <span className="bdt-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="bdt-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="bdt-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="bdt-nav__copy">
                <span className="bdt-nav__label">
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
            className="bdt-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="bdt-zoom__close"
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
