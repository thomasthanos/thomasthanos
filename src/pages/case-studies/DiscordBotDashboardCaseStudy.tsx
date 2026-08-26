import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bot,
  Database,
  ExternalLink,
  Github,
  Gauge,
  ListChecks,
  Music,
  PackageX,
  ScrollText,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Pumpkin } from '@/components/brand/Pumpkin'
import type { Project } from '@/data/types'
import { useI18n } from '@/i18n/i18n'
import { external } from '@/utils'
import '@/pages/case-studies/annotations.css'
import '@/pages/case-studies/discord-bot-dashboard.css'

interface Props {
  project: Project
  near: { prev: Project; next: Project } | null
}

/* Captures are wired but not shipped yet — each shot is probed on mount, so the section stays
   hidden until the matching .webp exists and appears on its own once one does. */
const SHOTS = {
  dashboard: { file: 'dashboard', w: 2000, h: 768 },
  permissions: { file: 'permissions', w: 2000, h: 1122 },
  commands: { file: 'commands', w: 777, h: 694 },
} as const

type ShotKey = keyof typeof SHOTS

const GALLERY: ShotKey[] = ['dashboard', 'permissions', 'commands']

const copy = {
  en: {
    back: 'Back to projects',
    eyebrow: 'Discord bot · live dashboard',
    tagline: 'Twenty commands, a 24/7 radio, and a control panel that speaks Greek.',
    source: 'View source',
    more: 'More projects',

    metrics: 'By the numbers',
    metricsNote: 'Counted from the repository, not from memory.',
    nerdStat:
      '20,836 lines across 88 modules · 20 slash commands, 8 dashboard views, 15 checks · one SQLite file holds the whole state',

    premise: 'The premise',
    premiseNote: 'Why it exists at all.',
    premiseLead: 'Every music bot worth using eventually asks you to pay it to stay.',
    premiseBody:
      'Years of helping run a large Greek community taught me which moderation jobs actually repeat, and which ones nobody wants to do at three in the morning. So this does those — and it also plays music, because the free tier of every bot that does eventually turns into a subscription prompt in your own voice channel. Running your own is the only way out of that, and once you are running your own you may as well give it a control panel.',

    output: 'Real output',
    outputNote: 'The dashboard, the permission model, and the bot in Discord.',
    expand: 'Open full size',
    close: 'Close',
    shotCaptions: {
      dashboard: 'Pulse: live server stats, recent command runs and the most-used commands.',
      permissions: 'Per-command access, grouped by category, with role and user overrides.',
      commands: 'The command list as Discord shows it, descriptions and all.',
    } as Record<ShotKey, string>,

    pillars: 'What it does',
    pillarsNote: 'Four jobs, all reachable from either side.',
    pillarList: [
      {
        title: 'Music and a radio',
        body: 'A real queue, and a station that stays put.',
        lines: [
          'skip, shuffle, loop, volume, now-playing',
          '24/7 mode rejoins after a reboot or a crash',
          'no premium prompt, because it is yours',
        ],
      },
      {
        title: 'Moderation that finishes',
        body: 'Including the messages Discord will not bulk delete.',
        lines: [
          'falls back to one-by-one past the 14-day wall',
          'interruptible, with progress reported',
          'keeps a record of what it removed',
        ],
      },
      {
        title: 'Transcripts and invites',
        body: 'Who said what, and who brought whom.',
        lines: [
          'channel transcripts exported with attachments',
          'invite tracking per member',
          'both readable from the dashboard',
        ],
      },
      {
        title: 'A dashboard on the same data',
        body: 'Eight views over one SQLite file.',
        lines: [
          'live stats pushed over socket.io',
          'latency, uptime and voice channels at a glance',
          'anything a command does, the browser does too',
        ],
      },
    ],

    access: 'Who may run what',
    accessNote: 'The part that had to be explainable.',
    accessLead:
      'Discord’s own permission model answers “can this member manage messages”. It does not answer “may this member run this one command”. So every command carries a default, and the dashboard lets you override it per role or per raw user ID. The rule is one sentence, and it is printed on the page itself: an empty list means the default applies; one entry means only those people, plus the administrators.',
    accessCards: [
      {
        problem: 'Roles are too coarse',
        answer: 'Override per command',
        body:
          'Commands are grouped by category — moderation, invites, music — and each one can be locked independently. Being allowed to clear a channel should not imply being allowed to change the radio, and with a single role toggle it always did.',
      },
      {
        problem: 'Some people have no role',
        answer: 'Accept a raw user ID',
        body:
          'The person you trust with a destructive command is not always someone you want to give a role to. The override field takes a Discord user ID directly, so access can be granted to exactly one human without inventing a role to carry it.',
      },
      {
        problem: 'Empty is ambiguous',
        answer: 'Define it out loud',
        body:
          'An empty allow-list could mean nobody or everybody. Here it means the command’s own default applies, and that sentence is written above the list rather than buried in a readme — a permission system nobody can explain is one nobody will trust.',
      },
      {
        problem: 'Admins must never lock out',
        answer: 'Always keep the back door',
        body:
          'Administrators keep access regardless of what the overrides say. Otherwise the first person to restrict a command too tightly locks the server out of its own moderation tooling, at which point the only fix is editing the database by hand.',
      },
    ],

    hard: 'Engineering challenges',
    hardNote: 'Four problems, one of them not mine.',
    hardMore: 'Technical detail',
    hardShort: [
      'Every search silently returned nothing, and none of the code was wrong.',
      'Discord refuses to bulk delete anything older than two weeks.',
      'Per-command access had to be something a server owner could reason about.',
      'Fifteen check files answer “will it start and behave”, not “does this return 4”.',
    ],

    how: 'How it’s built',
    howNote: 'One process, two front doors, one file of truth.',
    flow: [
      ['DISCORD', '20 commands'],
      ['discord.js v14', 'one process'],
      ['SQLite', 'single file'],
      ['socket.io', 'live push'],
      ['PULSE', '8 views'],
    ],

    honest: 'Honest accounting',
    honestHeadline: 'Three things worth stating plainly.',
    honestChant: ['No paywall.', 'No hosting bill.', 'No telemetry.', 'No lock-in.'],
    honestPoints: [
      [
        'The AI is read-only on purpose',
        'There is an optional AI layer behind one command, and it can look things up and answer — it cannot delete, ban, kick or change a setting. That is not a limitation I am apologising for; it is the only reason it was safe to add to a bot that also holds destructive commands.',
      ],
      [
        'It depends on YouTube not changing again',
        'The music side rests on an extractor talking to an undocumented internal API. It broke once already when YouTube started rejecting the pinned client version, and the fix is an override in package.json that I will have to remove when upstream catches up. This is not stable ground and the code says so in a comment.',
      ],
      [
        'It is written for one community',
        'The interface, the command descriptions and the bot’s replies are all in Greek, because it was built for a Greek server and never pretended otherwise. That makes it immediately useful to about eleven million people and immediately useless to everyone else, which was the correct trade for the actual audience.',
      ],
    ],

    lessons: 'What it taught me',
    stack: 'Built with',
    links: 'Keep digging',
    previous: 'Previous project',
    next: 'Next project',
    disclaimerTitle: 'Small print',

    finale: 'One process, one database file, and nobody asking you for a subscription.',
    finaleOther: 'See other projects',

    notes: [
      'twenty commands. one file.',
      'all four counted.',
      'nobody wants that job at 3am.',
      'the panel speaks greek.',
      'none of these need a browser.',
      'an empty list means default.',
      'read-only ai. on purpose.',
    ],
  },
  el: {
    back: 'Πίσω στα projects',
    eyebrow: 'Discord bot · ζωντανό dashboard',
    tagline: 'Είκοσι εντολές, ραδιόφωνο 24/7, και πίνακας ελέγχου που μιλάει ελληνικά.',
    source: 'Δες τον κώδικα',
    more: 'Περισσότερα projects',

    metrics: 'Με νούμερα',
    metricsNote: 'Μετρημένα από το repository, όχι από μνήμης.',
    nerdStat:
      '20.836 γραμμές σε 88 modules · 20 slash commands, 8 όψεις dashboard, 15 checks · ένα αρχείο SQLite κρατάει όλο το state',

    premise: 'Η αφετηρία',
    premiseNote: 'Γιατί υπάρχει.',
    premiseLead: 'Κάθε music bot που αξίζει κάτι, κάποια στιγμή σου ζητάει λεφτά για να μείνει.',
    premiseBody:
      'Χρόνια βοήθειας στο τρέξιμο μιας μεγάλης ελληνικής κοινότητας μού έμαθαν ποιες δουλειές moderation όντως επαναλαμβάνονται, και ποιες δεν θέλει να κάνει κανείς στις τρεις τα ξημερώματα. Οπότε αυτό κάνει εκείνες — και παίζει και μουσική, επειδή το δωρεάν επίπεδο κάθε bot που παίζει καταλήγει σε μήνυμα συνδρομής μέσα στο δικό σου voice channel. Το να στήσεις δικό σου είναι ο μόνος τρόπος να ξεφύγεις, και αφού έχεις δικό σου, βάλ᾽ του και πίνακα ελέγχου.',

    output: 'Πραγματικό αποτέλεσμα',
    outputNote: 'Το dashboard, το μοντέλο δικαιωμάτων, και το bot μέσα στο Discord.',
    expand: 'Άνοιγμα σε πλήρες μέγεθος',
    close: 'Κλείσιμο',
    shotCaptions: {
      dashboard: 'Pulse: ζωντανά στατιστικά server, πρόσφατες εκτελέσεις και οι πιο δημοφιλείς εντολές.',
      permissions: 'Πρόσβαση ανά εντολή, ομαδοποιημένη ανά κατηγορία, με ρόλους και χρήστες.',
      commands: 'Η λίστα εντολών όπως τη δείχνει το Discord, με τις περιγραφές.',
    } as Record<ShotKey, string>,

    pillars: 'Τι κάνει',
    pillarsNote: 'Τέσσερις δουλειές, όλες προσβάσιμες κι από τις δύο πλευρές.',
    pillarList: [
      {
        title: 'Μουσική και ραδιόφωνο',
        body: 'Κανονική ουρά, και σταθμός που δεν φεύγει.',
        lines: [
          'skip, shuffle, loop, ένταση, now-playing',
          'το 24/7 ξαναμπαίνει μετά από reboot ή crash',
          'κανένα μήνυμα premium, επειδή είναι δικό σου',
        ],
      },
      {
        title: 'Moderation που τελειώνει',
        body: 'Μαζί με όσα δεν σβήνει μαζικά το Discord.',
        lines: [
          'πέφτει σε ένα-ένα πέρα από το όριο των 14 ημερών',
          'διακόψιμο, με αναφορά προόδου',
          'κρατάει καταγραφή του τι αφαίρεσε',
        ],
      },
      {
        title: 'Transcripts και προσκλήσεις',
        body: 'Ποιος είπε τι, και ποιος έφερε ποιον.',
        lines: [
          'transcripts καναλιών με τα συνημμένα',
          'καταγραφή προσκλήσεων ανά μέλος',
          'και τα δύο διαβάζονται από το dashboard',
        ],
      },
      {
        title: 'Dashboard στα ίδια δεδομένα',
        body: 'Οκτώ όψεις πάνω σε ένα αρχείο SQLite.',
        lines: [
          'ζωντανά στατιστικά μέσω socket.io',
          'καθυστέρηση, uptime και κανάλια φωνής με μια ματιά',
          'ό,τι κάνει μια εντολή, το κάνει και ο browser',
        ],
      },
    ],

    access: 'Ποιος τρέχει ποια εντολή',
    accessNote: 'Το κομμάτι που έπρεπε να εξηγείται.',
    accessLead:
      'Το μοντέλο δικαιωμάτων του Discord απαντάει στο «μπορεί αυτό το μέλος να διαχειρίζεται μηνύματα». Δεν απαντάει στο «μπορεί αυτό το μέλος να τρέξει αυτή τη μία εντολή». Οπότε κάθε εντολή έχει προεπιλογή, και το dashboard σε αφήνει να την παρακάμψεις ανά ρόλο ή ανά σκέτο user ID. Ο κανόνας είναι μία πρόταση, και είναι τυπωμένος πάνω στη σελίδα: άδεια λίστα σημαίνει ότι ισχύει η προεπιλογή· μία εγγραφή σημαίνει μόνο αυτοί, συν οι διαχειριστές.',
    accessCards: [
      {
        problem: 'Οι ρόλοι είναι πολύ χοντροί',
        answer: 'Παράκαμψη ανά εντολή',
        body:
          'Οι εντολές ομαδοποιούνται ανά κατηγορία — moderation, προσκλήσεις, μουσική — και καθεμία κλειδώνει ανεξάρτητα. Το να μπορείς να καθαρίσεις κανάλι δεν πρέπει να σημαίνει ότι μπορείς να αλλάξεις το ραδιόφωνο, και με έναν σκέτο ρόλο πάντα σήμαινε.',
      },
      {
        problem: 'Κάποιοι δεν έχουν ρόλο',
        answer: 'Δέξου σκέτο user ID',
        body:
          'Ο άνθρωπος που εμπιστεύεσαι για καταστροφική εντολή δεν είναι πάντα κάποιος στον οποίο θες να δώσεις ρόλο. Το πεδίο παράκαμψης δέχεται Discord user ID απευθείας, οπότε η πρόσβαση δίνεται σε ακριβώς έναν άνθρωπο χωρίς να εφευρεθεί ρόλος για να την κουβαλήσει.',
      },
      {
        problem: 'Το άδειο είναι διφορούμενο',
        answer: 'Όρισέ το φωναχτά',
        body:
          'Μια άδεια λίστα θα μπορούσε να σημαίνει κανείς ή όλοι. Εδώ σημαίνει ότι ισχύει η προεπιλογή της εντολής, και αυτή η πρόταση είναι γραμμένη πάνω από τη λίστα αντί για θαμμένη σε readme — ένα σύστημα δικαιωμάτων που δεν εξηγείται είναι ένα που δεν θα εμπιστευτεί κανείς.',
      },
      {
        problem: 'Οι διαχειριστές δεν κλειδώνονται έξω',
        answer: 'Κράτα πάντα πίσω πόρτα',
        body:
          'Οι διαχειριστές κρατάνε πρόσβαση ανεξάρτητα από τις παρακάμψεις. Αλλιώς ο πρώτος που θα περιορίσει μια εντολή υπερβολικά κλειδώνει τον server έξω από τα ίδια του τα εργαλεία moderation, και τότε η μόνη λύση είναι να πειράξεις τη βάση στο χέρι.',
      },
    ],

    hard: 'Τεχνικές προκλήσεις',
    hardNote: 'Τέσσερα προβλήματα, το ένα δεν ήταν δικό μου.',
    hardMore: 'Τεχνική λεπτομέρεια',
    hardShort: [
      'Κάθε αναζήτηση επέστρεφε σιωπηλά τίποτα, και τίποτα στον κώδικα δεν ήταν λάθος.',
      'Το Discord αρνείται να σβήσει μαζικά ό,τι είναι παλιότερο από δύο εβδομάδες.',
      'Η πρόσβαση ανά εντολή έπρεπε να είναι κάτι που καταλαβαίνει ο ιδιοκτήτης του server.',
      'Δεκαπέντε αρχεία check απαντούν στο «θα ξεκινήσει», όχι στο «επιστρέφει 4».',
    ],

    how: 'Πώς είναι χτισμένο',
    howNote: 'Μία διεργασία, δύο πόρτες εισόδου, ένα αρχείο αλήθειας.',
    flow: [
      ['DISCORD', '20 εντολές'],
      ['discord.js v14', 'μία διεργασία'],
      ['SQLite', 'ένα αρχείο'],
      ['socket.io', 'ζωντανό push'],
      ['PULSE', '8 όψεις'],
    ],

    honest: 'Τίμιος απολογισμός',
    honestHeadline: 'Τρία πράγματα που αξίζει να ειπωθούν καθαρά.',
    honestChant: ['Χωρίς paywall.', 'Χωρίς λογαριασμό hosting.', 'Χωρίς telemetry.', 'Χωρίς εγκλωβισμό.'],
    honestPoints: [
      [
        'Το AI είναι read-only επίτηδες',
        'Υπάρχει προαιρετικό AI layer πίσω από μία εντολή, και μπορεί να ψάξει και να απαντήσει — δεν μπορεί να σβήσει, να κάνει ban, kick ή να αλλάξει ρύθμιση. Δεν ζητάω συγγνώμη γι᾽ αυτόν τον περιορισμό· είναι ο μόνος λόγος που ήταν ασφαλές να προστεθεί σε bot που κρατάει και καταστροφικές εντολές.',
      ],
      [
        'Εξαρτάται από το να μην ξαναλλάξει το YouTube',
        'Η πλευρά της μουσικής στηρίζεται σε extractor που μιλάει σε ατεκμηρίωτο εσωτερικό API. Έσπασε ήδη μία φορά όταν το YouTube άρχισε να απορρίπτει την καρφωμένη έκδοση, και η λύση είναι override στο package.json που θα πρέπει να αφαιρέσω όταν προλάβει το upstream. Δεν είναι σταθερό έδαφος και ο κώδικας το λέει σε σχόλιο.',
      ],
      [
        'Είναι γραμμένο για μία κοινότητα',
        'Το interface, οι περιγραφές των εντολών και οι απαντήσεις του bot είναι όλα στα ελληνικά, επειδή φτιάχτηκε για ελληνικό server και ποτέ δεν προσποιήθηκε το αντίθετο. Αυτό το κάνει αμέσως χρήσιμο σε περίπου έντεκα εκατομμύρια ανθρώπους και αμέσως άχρηστο σε όλους τους υπόλοιπους, που ήταν το σωστό αντάλλαγμα για το πραγματικό κοινό.',
      ],
    ],

    lessons: 'Τι μου έμαθε',
    stack: 'Χτίστηκε με',
    links: 'Συνέχισε το ψάξιμο',
    previous: 'Προηγούμενο project',
    next: 'Επόμενο project',
    disclaimerTitle: 'Ψιλά γράμματα',

    finale: 'Μία διεργασία, ένα αρχείο βάσης, και κανείς να μη σου ζητάει συνδρομή.',
    finaleOther: 'Δες άλλα projects',

    notes: [
      'είκοσι εντολές. ένα αρχείο.',
      'και τα τέσσερα μετρημένα.',
      'κανείς δεν θέλει αυτή τη δουλειά στις 3.',
      'ο πίνακας μιλάει ελληνικά.',
      'κανένα δεν θέλει browser.',
      'άδεια λίστα σημαίνει προεπιλογή.',
      'read-only ai. επίτηδες.',
    ],
  },
} as const

const ASSETS = `${import.meta.env.BASE_URL}assets/projects/discord-bot-dashboard/`

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

function DbdSection({ id, label, aside, children, className = '' }: SectionProps) {
  return (
    <section className={`dbd-section ${className}`} aria-labelledby={id}>
      <div className="dbd-section__head">
        <h2 id={id}>{label}</h2>
        {aside && <p className="dbd-section__aside">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const mark =
    project.slug === 'an1me-tracker' ? 'A1' : project.name.slice(0, 2).toUpperCase()
  return (
    <span className="dbd-nav__thumb" data-accent={project.accent} aria-hidden="true">
      {mark}
    </span>
  )
}

const PILLAR_ICONS = [Music, Trash2, ScrollText, Gauge]
const ACCESS_ICONS = [ShieldCheck, Bot, ListChecks, ShieldCheck]

export function DiscordBotDashboardCaseStudy({ project: p, near }: Props) {
  const { lang, t, tr, trList } = useI18n()
  const c = copy[lang]

  const dashboard = useShot(SHOTS.dashboard.file)
  const permissions = useShot(SHOTS.permissions.file)
  const commands = useShot(SHOTS.commands.file)
  const shots: Record<ShotKey, ReturnType<typeof useShot>> = { dashboard, permissions, commands }

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
    <div className="page dbd" data-accent="violet">
      <div className="container dbd__container cs-scope">
        <Link className="dbd__back" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {c.back}
        </Link>

        <header className="dbd-hero">
          <Reveal className="dbd-hero__copy">
            <div className="dbd-hero__meta">
              <span>{c.eyebrow}</span>
              <span className="dbd-hero__status">
                <i aria-hidden="true" /> {t.status[p.status]}
              </span>
              {p.version && <span className="dbd-hero__ver">v{p.version}</span>}
            </div>
            <h1>
              PULSE
              <span className="dbd-hero__line2">DASHBOARD</span>
            </h1>
            <p className="dbd-hero__tagline">{c.tagline}</p>
            <p className="dbd-hero__summary">{tr(p.summary)}</p>
            <div className="dbd-hero__actions">
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

          {/* the device: one command's access row, as the dashboard renders it */}
          <Reveal className="dbd-perm" delay={90}>
            <p className="dbd-perm__group" aria-hidden="true">
              <ShieldCheck /> MODERATION
            </p>
            {[
              ['/clear', '@επ ηρθες?'],
              ['/wipe-channel', '@Ελα μουυυυ'],
            ].map(([cmd, who]) => (
              <div className="dbd-perm__row" key={cmd}>
                <code>{cmd}</code>
                <span className="dbd-perm__badge">ΠΕΡΙΟΡΙΣΜΕΝΗ</span>
                <span className="dbd-perm__who">{who}</span>
              </div>
            ))}
            <p className="dbd-perm__rule">
              {lang === 'el'
                ? 'Άδεια λίστα → ισχύει η προεπιλογή.'
                : 'Empty list → the default applies.'}
            </p>
          </Reveal>

          <span className="cs-note cs-note--to-r dbd-note dbd-note--hero">{c.notes[0]}</span>
        </header>

        <DbdSection
          id="dbd-metrics"
          label={c.metrics}
          aside={c.metricsNote}
          className="dbd-section--tight"
        >
          <dl className="dbd-stats">
            {p.metrics?.map((m) => (
              <div className="dbd-stat" key={m.value + tr(m.label)}>
                <dt>{m.value}</dt>
                <dd>{tr(m.label)}</dd>
              </div>
            ))}
          </dl>
          <p className="dbd-nerd">{c.nerdStat}</p>
          <span className="cs-note cs-note--to-l dbd-note dbd-note--metrics">{c.notes[1]}</span>
        </DbdSection>

        <DbdSection
          id="dbd-premise"
          label={c.premise}
          aside={c.premiseNote}
          className="dbd-section--premise"
        >
          <Reveal className="dbd-premise">
            <p className="dbd-premise__lead">{c.premiseLead}</p>
            <p className="dbd-premise__body">{c.premiseBody}</p>
          </Reveal>
          <span className="cs-note cs-note--to-r dbd-note dbd-note--premise">{c.notes[2]}</span>
        </DbdSection>

        {gallery.length > 0 && (
          <DbdSection
            id="dbd-output"
            label={c.output}
            aside={c.outputNote}
            className="dbd-section--output dbd-section--tinted"
          >
            <SwipeHint className="dbd-swipe" />
            <div className="dbd-gallery">
              {gallery.map((key, i) => (
                <Reveal className="dbd-frame" delay={i * 60} key={key}>
                  <button
                    type="button"
                    className="dbd-frame__btn"
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
                    <span className="dbd-frame__expand">{c.expand}</span>
                  </button>
                  <p className="dbd-frame__caption">{c.shotCaptions[key]}</p>
                </Reveal>
              ))}
            </div>
            <span className="cs-note cs-note--to-l dbd-note dbd-note--output">{c.notes[3]}</span>
          </DbdSection>
        )}

        <DbdSection
          id="dbd-pillars"
          label={c.pillars}
          aside={c.pillarsNote}
          className="dbd-section--pillars"
        >
          <SwipeHint className="dbd-swipe" />
          <div className="dbd-pillars">
            {c.pillarList.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? Music
              return (
                <Reveal className="dbd-pillar" delay={i * 60} key={pillar.title}>
                  <span className="dbd-pillar__icon" aria-hidden="true">
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
          <span className="cs-note cs-note--to-r dbd-note dbd-note--pillars">{c.notes[4]}</span>
        </DbdSection>

        <DbdSection
          id="dbd-access"
          label={c.access}
          aside={c.accessNote}
          className="dbd-section--access dbd-section--tinted"
        >
          <Reveal className="dbd-statement" as="p">
            {c.accessLead}
          </Reveal>

          <SwipeHint className="dbd-swipe" />
          <div className="dbd-accesses">
            {c.accessCards.map((card, i) => {
              const Icon = ACCESS_ICONS[i] ?? ShieldCheck
              return (
                <Reveal className="dbd-access" delay={i * 60} key={card.problem}>
                  <span className="dbd-access__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="dbd-access__problem">{card.problem}</p>
                  <h3>{card.answer}</h3>
                  <p className="dbd-access__body">{card.body}</p>
                </Reveal>
              )
            })}
          </div>
          <span className="cs-note cs-note--to-l dbd-note dbd-note--access">{c.notes[5]}</span>
        </DbdSection>

        {p.challenges && (
          <DbdSection id="dbd-hard" label={c.hard} aside={c.hardNote} className="dbd-section--hard">
            <SwipeHint className="dbd-swipe" />
            <ol className="dbd-hard">
              {p.challenges.map((ch, i) => (
                <Reveal className="dbd-hard__row" delay={i * 50} key={ch.title.en} as="li">
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
          </DbdSection>
        )}

        <DbdSection id="dbd-how" label={c.how} aside={c.howNote} className="dbd-section--how">
          <SwipeHint className="dbd-swipe" />
          <Reveal className="dbd-flow">
            {c.flow.map(([name, sub], i) => (
              <div
                className="dbd-flow__stage"
                key={name}
                data-end={i === 0 ? 'in' : i === c.flow.length - 1 ? 'out' : undefined}
              >
                <span className="dbd-flow__name">{name}</span>
                <code>{sub}</code>
              </div>
            ))}
          </Reveal>
        </DbdSection>

        <DbdSection
          id="dbd-honest"
          label={c.honest}
          className="dbd-section--honest dbd-section--tinted"
        >
          <Reveal className="dbd-verdict">
            <p>{c.honestHeadline}</p>
            <ul className="dbd-chant">
              {c.honestChant.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <SwipeHint className="dbd-swipe" />
          <div className="dbd-points">
            {c.honestPoints.map(([title, body], i) => (
              <Reveal className="dbd-point" delay={i * 60} key={title}>
                <span className="dbd-point__icon" aria-hidden="true">
                  {i === 0 ? <Bot /> : i === 1 ? <PackageX /> : <Activity />}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
          <span className="cs-note cs-note--to-l dbd-note dbd-note--honest">{c.notes[6]}</span>
        </DbdSection>

        <div className="dbd-endgrid">
          {p.lessons && (
            <DbdSection id="dbd-lessons" label={c.lessons} className="dbd-section--panel">
              <SwipeHint className="dbd-swipe" />
              <ul className="dbd-lessons">
                {trList(p.lessons).map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </DbdSection>
          )}

          <DbdSection id="dbd-stack" label={c.stack} className="dbd-section--panel">
            <div className="dbd-stack">
              {p.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {p.privacy && (
              <p className="dbd-disclaimer">
                <Database aria-hidden="true" />
                <span>
                  <strong>{c.disclaimerTitle}:</strong> {tr(p.privacy)}
                </span>
              </p>
            )}
          </DbdSection>
        </div>

        <Reveal className="dbd-finale" as="section">
          <p>{c.finale}</p>
          <div className="dbd-finale__actions" aria-label={c.links}>
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
          <nav className="dbd-nav" aria-label={c.more}>
            <Link to={`/projects/${near.prev.slug}`}>
              <ProjectThumb project={near.prev} />
              <span className="dbd-nav__copy">
                <span className="dbd-nav__label">
                  <ArrowLeft aria-hidden="true" /> {c.previous}
                </span>
                <strong>{near.prev.name}</strong>
                <small>{tr(near.prev.short)}</small>
              </span>
            </Link>
            <span className="dbd-nav__brand" aria-hidden="true">
              <Pumpkin size={64} mood="wide" />
            </span>
            <Link className="dbd-nav__next" to={`/projects/${near.next.slug}`}>
              <span className="dbd-nav__copy">
                <span className="dbd-nav__label">
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
            className="dbd-zoom"
            role="dialog"
            aria-modal="true"
            aria-label={c.shotCaptions[zoomed]}
            onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          >
            <button
              type="button"
              className="dbd-zoom__close"
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
