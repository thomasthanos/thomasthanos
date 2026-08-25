import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  Check,
  Cloud,
  CloudOff,
  ExternalLink,
  Github,
  Languages,
  TriangleAlert,
} from 'lucide-react'
import { Reveal } from '../../components/ui/Reveal'
import { Pumpkin } from '../../components/brand/Pumpkin'
import type { Project } from '../../data/types'
import { useI18n } from '../../i18n/i18n'
import { external } from '../../utils'
import './annotations.css'
import './discord-package-viewer.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/**
 * The three real captures. Intrinsic sizes are the originals so the browser
 * reserves the right box and nothing shifts as they decode. Filenames match
 * the jobs in tools/optimise-assets.mjs; the dashboard is the redacted copy
 * produced by tools/redact-dpv-dashboard.mjs.
 */
const SHOTS = {
  generator: { file: 'generator', w: 1092, h: 907 },
  dashboard: { file: 'dashboard', w: 2000, h: 1011 },
  warning: { file: 'language-warning', w: 718, h: 609 },
} as const

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Desktop generator · Archive Viewer v4',
    tagline: 'Your whole Discord life. One file. Nobody else’s server.',
    source: 'View source',
    more: 'More projects',
    generatorCaption: 'The generator. Pick a ZIP, press one button, walk away.',

    metrics: 'By the numbers',
    metricsNote: 'One script in, one file out.',
    nerdStat: '7,760 lines in one Python script · zero third-party imports on the command line',

    trade: 'The trade nobody should accept',
    tradeThem: 'Upload your private archive',
    tradeUs: 'Process it locally',
    themItems: [
      'four years of private messages',
      'your payment and Nitro history',
      'every IP you ever signed in from',
    ],
    usItems: [
      'a ZIP already on your disk',
      'about a minute of CPU',
      'nothing else',
    ],
    tradeStatement:
      'Every online “Discord package viewer” wants the single most personal file you own, on a stranger’s server, for a bit of convenience. This one never asks.',

    output: 'Real output',
    outputNote:
      'One HTML file, opened from disk. Not a mockup, not a device frame — this is the archive.',
    dashboardCaption:
      'The generated archive: 48.3k messages, 942 channels, 198 servers. Names and handles redacted — everything else is exactly what the tool wrote.',
    expand: 'Open full size',
    close: 'Close',

    pillars: [
      {
        title: 'Browse everything',
        body: 'Every DM and server channel, rendered the way Discord renders it.',
        lines: [
          'markdown, spoilers, mentions resolved to names',
          'hand-written video and audio players',
          'dead attachment links labelled, not hidden',
        ],
      },
      {
        title: 'Understand your archive',
        body: 'Search, statistics, charts and a word cloud over the whole thing.',
        lines: [
          'highlighted search with next/previous',
          'a date-range picker written from scratch',
          'hourly, daily and all-time activity',
        ],
      },
      {
        title: 'Survive huge exports',
        body: 'Progressive rendering, batching and local media.',
        lines: [
          '250 messages a page, never the whole channel',
          '200-message chunks per animation frame',
          'scroll anchored so nothing jumps',
        ],
      },
    ],

    index: 'What it finds',
    indexNote: 'Twenty loaders. Including the file where Discord keeps its guesses about you.',
    indexGroups: [
      ['Messages', 'DMs · Servers · Attachments · Voice'],
      ['Account', 'Badges · Devices · Sessions · Connections'],
      ['Money', 'Nitro · Payments · Entitlements · Orbs'],
      ['Servers', 'Icons · Channels · Webhooks · Totals'],
      ['Goodies', 'Quests · Poker stats · Dev apps · Tickets'],
      ['The creepy bit', 'Ads data · Past requests · Activity'],
    ],

    how: 'How it works',
    howNote: 'One ZIP in, one HTML out. Everything between is a detail.',
    flow: [
      ['ZIP', 'package.zip'],
      ['Verify', 'Account/user.json'],
      ['Parse', '20 loaders · stdlib'],
      ['Resolve', 'mentions · GIFs · avatars'],
      ['Generate', 'streaming writer'],
      ['Open', 'discord_viewer.html'],
    ],

    hard: 'Engineering challenges',
    hardNote: 'The parts that were genuinely hard.',
    hardMore: 'Technical detail',
    hardShort: [
      'Channels render in batches instead of dumping hundreds of thousands of messages into the DOM at once.',
      'The archive is encoded and freed one channel at a time, straight to disk, so RAM never holds it twice.',
      'Spoilers, custom emoji IDs and mentions each need their own parser — the export has none of the client’s context.',
      'Tenor thumbnails are fetched in parallel behind a hard wall-clock cap, so a bad network never hangs the build.',
    ],

    annoying: 'The one stupid requirement',
    annoyingNote: 'Every tool has one.',
    annoyingLead:
      'Discord decided folder names should be translated. I decided that was my problem somehow.',
    annoyingBody:
      'A Greek export has Μηνύματα where an English one has Messages, and every path in the generator would miss. So the app peeks inside the ZIP before it starts, recognises nine languages by their folder names, and tells you to re-request the export in English — which costs you a wait, but not ten minutes of watching a progress bar produce nothing.',
    warningCaption: 'Shown before generation starts, not after it fails.',

    privacy: 'Privacy',
    privacyHeadline: 'Your ZIP never moves.',
    privacyChant: ['No upload.', 'No account.', 'No server.', 'No bullshit.'],
    privacyPoints: [
      [
        'Works locally',
        'The generator runs entirely on your machine — no server, no account, no telemetry. Every message, every filter and the word cloud work with the network unplugged.',
      ],
      [
        'Optional network resources',
        'The page reaches three hosts, none of which learn anything about you: Google Fonts, the Discord CDN for custom emoji by ID, and Tenor for GIF thumbnails already resolved during generation.',
      ],
      [
        'One honest caveat',
        'The activity charts pull Chart.js from jsDelivr. Offline they are the single thing that will not draw. I could have hand-rolled them and kept the cleaner sentence; I did not.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'One ZIP in. One HTML out. Nothing leaves your machine.',
    finaleOther: 'See other projects',

    notes: [
      'your ZIP. not some guy’s server.',
      'none of these are inflated.',
      'read the left column again.',
      'yes, Discord profiled you. go look.',
      'one ZIP in. one file out.',
      'Discord’s fault. genuinely not mine.',
      'pull the cable. it still works. mostly.',
    ],
  },

  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Desktop generator · Archive Viewer v4',
    tagline: 'Όλη σου η ζωή στο Discord. Ένα αρχείο. Κανενός άλλου server.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',
    generatorCaption: 'Ο generator. Διαλέγεις ZIP, πατάς ένα κουμπί, φεύγεις.',

    metrics: 'Με αριθμούς',
    metricsNote: 'Ένα script μέσα, ένα αρχείο έξω.',
    nerdStat: '7.760 γραμμές σε ένα Python script · μηδέν εξωτερικά imports στο command line',

    trade: 'Η ανταλλαγή που δεν πρέπει να δεχτείς',
    tradeThem: 'Ανέβασε το προσωπικό σου αρχείο',
    tradeUs: 'Επεξεργάσου το τοπικά',
    themItems: [
      'τέσσερα χρόνια προσωπικά μηνύματα',
      'το ιστορικό πληρωμών και Nitro σου',
      'κάθε IP που συνδέθηκες ποτέ',
    ],
    usItems: [
      'ένα ZIP που ήδη έχεις',
      'κάπου ένα λεπτό CPU',
      'τίποτε άλλο',
    ],
    tradeStatement:
      'Κάθε online «Discord package viewer» θέλει το πιο προσωπικό αρχείο που έχεις, στον server ενός αγνώστου, για λίγη ευκολία. Αυτό εδώ δεν το ζητάει ποτέ.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote:
      'Ένα HTML αρχείο, ανοιγμένο από τον δίσκο. Χωρίς mockup, χωρίς πλαίσιο συσκευής — αυτό είναι το αρχείο.',
    dashboardCaption:
      'Το αρχείο που παράγεται: 48,3k μηνύματα, 942 κανάλια, 198 servers. Ονόματα και handles λογοκριμένα — όλα τα υπόλοιπα είναι ακριβώς ό,τι έγραψε το εργαλείο.',
    expand: 'Πλήρες μέγεθος',
    close: 'Κλείσιμο',

    pillars: [
      {
        title: 'Δες τα πάντα',
        body: 'Κάθε DM και server channel, όπως ακριβώς τα δείχνει το Discord.',
        lines: [
          'markdown, spoilers, mentions που γίνονται ονόματα',
          'video και audio players γραμμένοι στο χέρι',
          'τα νεκρά attachment links δηλώνονται, δεν κρύβονται',
        ],
      },
      {
        title: 'Κατάλαβε το αρχείο σου',
        body: 'Αναζήτηση, στατιστικά, γραφήματα και word cloud σε όλο το υλικό.',
        lines: [
          'αναζήτηση με highlight και next/previous',
          'date-range picker γραμμένος από το μηδέν',
          'δραστηριότητα ανά ώρα, μέρα και συνολικά',
        ],
      },
      {
        title: 'Άντεξε τεράστια exports',
        body: 'Σταδιακό rendering, batching και τοπικά media.',
        lines: [
          '250 μηνύματα ανά σελίδα, ποτέ όλο το κανάλι',
          'κομμάτια των 200 σε κάθε animation frame',
          'το scroll κρατιέται σταθερό, δεν πηδάει',
        ],
      },
    ],

    index: 'Τι βρίσκει',
    indexNote: 'Είκοσι loaders. Μαζί με το αρχείο όπου το Discord κρατάει τις εικασίες του για σένα.',
    indexGroups: [
      ['Μηνύματα', 'DM · Servers · Attachments · Voice'],
      ['Λογαριασμός', 'Badges · Συσκευές · Sessions · Συνδέσεις'],
      ['Λεφτά', 'Nitro · Πληρωμές · Entitlements · Orbs'],
      ['Servers', 'Εικονίδια · Κανάλια · Webhooks · Σύνολα'],
      ['Παραξενιές', 'Quests · Poker · Dev apps · Tickets'],
      ['Το ανατριχιαστικό', 'Ads data · Παλιά αιτήματα · Activity'],
    ],

    how: 'Πώς δουλεύει',
    howNote: 'Ένα ZIP μέσα, ένα HTML έξω. Τα ενδιάμεσα είναι λεπτομέρεια.',
    flow: [
      ['ZIP', 'package.zip'],
      ['Έλεγχος', 'Account/user.json'],
      ['Parse', '20 loaders · stdlib'],
      ['Επίλυση', 'mentions · GIF · avatars'],
      ['Δημιουργία', 'streaming writer'],
      ['Άνοιγμα', 'discord_viewer.html'],
    ],

    hard: 'Engineering challenges',
    hardNote: 'Τα κομμάτια που ήταν όντως δύσκολα.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Τα κανάλια κάνουν render σε παρτίδες αντί να ρίχνουν εκατοντάδες χιλιάδες μηνύματα στο DOM μονομιάς.',
      'Το αρχείο κωδικοποιείται και ελευθερώνεται κανάλι-κανάλι, κατευθείαν στον δίσκο, ώστε η RAM να μην το κρατάει δύο φορές.',
      'Spoilers, IDs για custom emoji και mentions θέλουν το καθένα δικό του parser — το export δεν έχει τα συμφραζόμενα του client.',
      'Τα Tenor thumbnails κατεβαίνουν παράλληλα πίσω από σκληρό χρονικό όριο, ώστε ένα κακό δίκτυο να μην κολλάει ποτέ το build.',
    ],

    annoying: 'Η μία χαζή απαίτηση',
    annoyingNote: 'Κάθε εργαλείο έχει μία.',
    annoyingLead:
      'Το Discord αποφάσισε να μεταφράζει τα ονόματα των φακέλων. Εγώ αποφάσισα ότι αυτό είναι κάπως δικό μου πρόβλημα.',
    annoyingBody:
      'Ένα ελληνικό export έχει Μηνύματα εκεί που το αγγλικό έχει Messages, και κάθε path του generator θα αστοχούσε. Οπότε η εφαρμογή κοιτάζει μέσα στο ZIP πριν ξεκινήσει, αναγνωρίζει εννιά γλώσσες από τα ονόματα των φακέλων, και σου λέει να ξαναζητήσεις το export στα Αγγλικά — που σου κοστίζει μια αναμονή, αλλά όχι δέκα λεπτά να κοιτάς μια μπάρα να μη βγάζει τίποτα.',
    warningCaption: 'Εμφανίζεται πριν ξεκινήσει η δημιουργία, όχι αφού αποτύχει.',

    privacy: 'Ιδιωτικότητα',
    privacyHeadline: 'Το ZIP σου δεν κουνιέται.',
    privacyChant: ['Κανένα upload.', 'Κανένας λογαριασμός.', 'Κανένας server.', 'Καμία μαλακία.'],
    privacyPoints: [
      [
        'Δουλεύει τοπικά',
        'Ο generator τρέχει εξ ολοκλήρου στο μηχάνημά σου — χωρίς server, χωρίς λογαριασμό, χωρίς telemetry. Κάθε μήνυμα, κάθε φίλτρο και το word cloud δουλεύουν με το δίκτυο κατεβασμένο.',
      ],
      [
        'Προαιρετικοί εξωτερικοί πόροι',
        'Η σελίδα επικοινωνεί με τρεις hosts, και κανένας δεν μαθαίνει τίποτα για σένα: Google Fonts, το CDN του Discord για custom emoji ανά ID, και το Tenor για GIF thumbnails που λύθηκαν ήδη κατά τη δημιουργία.',
      ],
      [
        'Ένας τίμιος αστερίσκος',
        'Τα γραφήματα δραστηριότητας τραβάνε το Chart.js από το jsDelivr. Offline είναι το μόνο που δεν θα ζωγραφιστεί. Θα μπορούσα να τα γράψω στο χέρι και να κρατήσω την καθαρή πρόταση· δεν το έκανα.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Ένα ZIP μέσα. Ένα HTML έξω. Τίποτα δεν φεύγει από το μηχάνημά σου.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'το ZIP σου. όχι του server κάποιου τύπου.',
      'κανένα από αυτά δεν είναι φουσκωμένο.',
      'ξαναδιάβασε την αριστερή στήλη.',
      'ναι, σε έχει προφίλ το Discord. δες το.',
      'ένα ZIP μέσα. ένα αρχείο έξω.',
      'φταίει το Discord. σοβαρά, όχι εγώ.',
      'βγάλε το καλώδιο. δουλεύει. σχεδόν.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/discord-package-viewer/`

/**
 * A real capture that removes itself if the file is not there.
 *
 * A missing file does not always 404: an SPA host answers with index.html and
 * a 200, which loads but decodes to nothing — hence the naturalWidth check
 * alongside onError.
 */
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

function DpvSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`dpv-section ${className}`} aria-labelledby={id}>
      <div className="dpv-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="dpv-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark = project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="dpv-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

export function DiscordPackageViewerCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const generator = useShot(SHOTS.generator.file)
  const dashboard = useShot(SHOTS.dashboard.file)
  const warning = useShot(SHOTS.warning.file)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!zoomed) return
    const previous = document.body.style.overflow
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomed(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [zoomed])

  return (
    <div className="page dpv" data-accent="blue">
      <div className="container dpv__container cs-scope">
        <Link className="dpv__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        {/* --- 1. Hero, with the real generator ------------------------ */}
        <header className="dpv-hero" data-solo={generator.broken ? 'y' : undefined}>
          <Reveal className="dpv-hero__copy">
            <div className="dpv-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="dpv-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
            </div>
            <h1>
              DISCORD
              <span className="dpv-hero__line2">PACKAGE VIEWER</span>
            </h1>
            <p className="dpv-hero__tagline">{c.tagline}</p>
            <p className="dpv-hero__summary">{tr(p.summary)}</p>
            <div className="dpv-hero__actions">
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

          {!generator.broken && (
            <Reveal className="dpv-hero__shot" delay={90}>
              <img
                {...generator.props}
                alt={c.generatorCaption}
                width={SHOTS.generator.w}
                height={SHOTS.generator.h}
                fetchPriority="high"
                decoding="async"
              />
              <p>{c.generatorCaption}</p>
            </Reveal>
          )}

          <span className="cs-note cs-note--to-r dpv-note dpv-note--hero">{c.notes[0]}</span>
        </header>

        {/* --- 2. Metrics ---------------------------------------------- */}
        <DpvSection id="dpv-metrics" label={c.metrics} aside={c.metricsNote} className="dpv-section--tight">
          <dl className="dpv-stats">
            {p.metrics?.map((m) => (
              <div className="dpv-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="dpv-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l dpv-note dpv-note--metrics">{c.notes[1]}</span>
        </DpvSection>

        {/* --- 3. The trade -------------------------------------------- */}
        <DpvSection id="dpv-trade" label={c.trade} className="dpv-section--trade">
          <Reveal className="dpv-versus">
            <div className="dpv-versus__side dpv-versus__side--them">
              <h3>{c.tradeThem}</h3>
              <ul>
                {c.themItems.map((item) => (
                  <li key={item}>
                    <Ban aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="dpv-versus__vs" aria-hidden="true">VS</span>
            <div className="dpv-versus__side dpv-versus__side--us">
              <h3>{c.tradeUs}</h3>
              <ul>
                {c.usItems.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="dpv-statement" delay={80} as="p">
            {c.tradeStatement}
          </Reveal>
          <span className="cs-note cs-note--to-r dpv-note dpv-note--trade">{c.notes[2]}</span>
        </DpvSection>

        {/* --- 4. Real output + the three pillars ---------------------- */}
        <DpvSection id="dpv-output" label={c.output} aside={c.outputNote} className="dpv-section--output dpv-section--tinted">
          {!dashboard.broken && (
            <Reveal className="dpv-showcase">
              <button type="button" className="dpv-showcase__frame" onClick={() => setZoomed(true)}>
                <img
                  {...dashboard.props}
                  alt={c.dashboardCaption}
                  width={SHOTS.dashboard.w}
                  height={SHOTS.dashboard.h}
                  loading="lazy"
                  decoding="async"
                />
                <span className="dpv-showcase__expand">{c.expand}</span>
              </button>
              <p className="dpv-showcase__caption">{c.dashboardCaption}</p>
            </Reveal>
          )}

          <div className="dpv-pillars">
            {c.pillars.map((pillar, i) => (
              <Reveal className="dpv-pillar" delay={i * 60} key={pillar.title}>
                <span className="dpv-pillar__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
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

          <span className="cs-note cs-note--to-l dpv-note dpv-note--output">{c.notes[3]}</span>
        </DpvSection>

        {/* --- 5. What it finds ---------------------------------------- */}
        <DpvSection id="dpv-index" label={c.index} aside={c.indexNote} className="dpv-section--index">
          <div className="dpv-index">
            {c.indexGroups.map(([group, items], i) => (
              /* Reveal only forwards className, so the highlight on the last
                 group is a modifier class rather than a data attribute. */
              <Reveal
                className={`dpv-cat${i === c.indexGroups.length - 1 ? ' dpv-cat--creepy' : ''}`}
                delay={Math.min(i, 5) * 45}
                key={group}
              >
                <h3>{group}</h3>
                <p>{items}</p>
              </Reveal>
            ))}
          </div>
        </DpvSection>

        {/* --- 6. How it works ----------------------------------------- */}
        <DpvSection id="dpv-how" label={c.how} aside={c.howNote} className="dpv-section--how">
          <Reveal className="dpv-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="dpv-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="dpv-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
          <span className="cs-note cs-note--to-l dpv-note dpv-note--how">{c.notes[4]}</span>
        </DpvSection>

        {/* --- 7. Engineering challenges ------------------------------- */}
        {p.challenges && (
          <DpvSection id="dpv-hard" label={c.hard} aside={c.hardNote} className="dpv-section--hard">
            <ol className="dpv-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="dpv-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </DpvSection>
        )}

        {/* --- 8. The one stupid requirement --------------------------- */}
        <DpvSection
          id="dpv-annoying"
          label={c.annoying}
          aside={c.annoyingNote}
          className="dpv-section--annoying dpv-section--tinted"
        >
          <div className="dpv-limit" data-solo={warning.broken ? 'y' : undefined}>
            <Reveal className="dpv-limit__copy">
              <span className="dpv-limit__icon" aria-hidden="true">
                <Languages />
              </span>
              <p className="dpv-limit__lead">{c.annoyingLead}</p>
              <p>{c.annoyingBody}</p>
            </Reveal>
            {!warning.broken && (
              <Reveal className="dpv-limit__shot" delay={70}>
                <img
                  {...warning.props}
                  alt={c.warningCaption}
                  width={SHOTS.warning.w}
                  height={SHOTS.warning.h}
                  loading="lazy"
                  decoding="async"
                />
                <p>{c.warningCaption}</p>
              </Reveal>
            )}
          </div>
          <span className="cs-note cs-note--to-r dpv-note dpv-note--annoying">{c.notes[5]}</span>
        </DpvSection>

        {/* --- 9. Privacy conclusion ----------------------------------- */}
        <DpvSection id="dpv-privacy" label={c.privacy} className="dpv-section--privacy dpv-section--tinted">
          <Reveal className="dpv-verdict">
            <p>{c.privacyHeadline}</p>
            <ul className="dpv-chant">
              {c.privacyChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
          <div className="dpv-points">
            {c.privacyPoints.map(([title, body], i) => (
              <Reveal className="dpv-point" delay={i * 60} key={title}>
                <span className="dpv-point__icon" aria-hidden="true">
                  {i === 0 ? <CloudOff /> : i === 1 ? <Cloud /> : <TriangleAlert />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l dpv-note dpv-note--privacy">{c.notes[6]}</span>
        </DpvSection>

        {/* --- 10. Lessons, stack, links ------------------------------- */}
        <div className="dpv-endgrid">
          {p.lessons && (
            <DpvSection id="dpv-lessons" label={c.lessons} className="dpv-section--panel">
              <ul className="dpv-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </DpvSection>
          )}

          <DpvSection id="dpv-stack" label={c.stack} className="dpv-section--panel">
            <div className="dpv-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.disclaimer && (
              <p className="dpv-disclaimer">
                <strong>{c.disclaimerTitle}:</strong> {tr(p.disclaimer)}
              </p>
            )}
          </DpvSection>
        </div>

        {/* --- 11. Final statement ------------------------------------- */}
        <Reveal className="dpv-finale" as="section">
          <p>{c.finale}</p>
          <div className="dpv-finale__actions" aria-label={c.links}>
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

        {/* --- Prev / next --------------------------------------------- */}
        {near && (
          <nav className="dpv-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="dpv-nav__copy">
                <span className="dpv-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="dpv-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="dpv-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="dpv-nav__copy">
                <span className="dpv-nav__label">
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

      {/* The dashboard is the one capture worth a real overlay: at container
          width its 11px UI text is legible but its detail is not. */}
      {zoomed && !dashboard.broken && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="dpv-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.dashboardCaption}
            onClick={(e) => e.target === e.currentTarget && setZoomed(false)}
          >
            <button
              type="button"
              className="dpv-zoom__close"
              onClick={() => setZoomed(false)}
              aria-label={c.close}
            >
              ×
            </button>
            <img
              src={`${ASSETS}${SHOTS.dashboard.file}.webp`}
              alt={c.dashboardCaption}
              width={SHOTS.dashboard.w}
              height={SHOTS.dashboard.h}
            />
          </div>,
          document.body,
        )}
    </div>
  )
}
