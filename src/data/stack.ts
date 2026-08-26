import type { L } from '@/data/types'

export interface StackItem {
  name: string
  note: L
  usedIn?: string[]
}

export interface StackGroup {
  id: string
  title: L
  blurb: L
  accent: 'lime' | 'violet' | 'blue' | 'orange' | 'pink'
  items: StackItem[]
}

export const stackGroups: StackGroup[] = [
  {
    id: 'languages',
    accent: 'lime',
    title: { en: 'Languages', el: 'Γλώσσες' },
    blurb: {
      en: 'Four, and I reach for the same one most days.',
      el: 'Τέσσερις, και τις μισές μέρες πιάνω την ίδια.',
    },
    items: [
      {
        name: 'JavaScript',
        note: {
          en: 'The default. Extensions, Electron main processes, everything glued together.',
          el: 'Η προεπιλογή. Extensions, Electron main processes, και ό,τι κολλάει τα υπόλοιπα μεταξύ τους.',
        },
        usedIn: ['nexusmods-bypass', 'an1me-tracker', 'make-your-life-easier'],
      },
      {
        name: 'TypeScript',
        note: {
          en: 'When a project crosses process boundaries. One shared types file catches more IPC bugs than any test I have written.',
          el: 'Όταν ένα project περνάει όρια διεργασιών. Ένα κοινό αρχείο τύπων πιάνει περισσότερα IPC bugs από κάθε test που έχω γράψει.',
        },
        usedIn: ['steam-idler'],
      },
      {
        name: 'Python',
        note: {
          en: 'For anything that eats a folder of files and produces one useful artefact.',
          el: 'Για ό,τι τρώει έναν φάκελο αρχεία και βγάζει ένα χρήσιμο πράγμα στην άλλη άκρη.',
        },
        usedIn: ['discord-package-viewer'],
      },
      {
        name: 'HTML / CSS',
        note: {
          en: 'Not a checkbox. This is the part I actually enjoy and the reason my tools do not look like tools.',
          el: 'Δεν είναι checkbox σε λίστα. Είναι το κομμάτι που όντως γουστάρω, και ο λόγος που τα εργαλεία μου δεν μοιάζουν με εργαλεία.',
        },
        usedIn: ['gta-academy', 'betterdiscord-themes'],
      },
    ],
  },
  {
    id: 'runtime',
    accent: 'violet',
    title: { en: 'Desktop & Runtime', el: 'Desktop & Runtime' },
    blurb: {
      en: 'Where most of the actual work happens.',
      el: 'Εκεί που γίνεται η περισσότερη δουλειά.',
    },
    items: [
      {
        name: 'Electron',
        note: {
          en: 'Five apps deep. I know exactly which parts of it will bite, and context isolation is not optional.',
          el: 'Πέντε εφαρμογές βαθιά. Ξέρω ακριβώς ποια κομμάτια του δαγκώνουν, και το context isolation δεν είναι προαιρετικό.',
        },
        usedIn: [
          'make-your-life-easier',
          'steam-idler',
          'autoclicker-premium',
          'github-build-release',
          'backup-studio',
        ],
      },
      {
        name: 'Node.js',
        note: {
          en: 'Every main process, every build script, the Discord bot.',
          el: 'Κάθε main process, κάθε build script, το Discord bot.',
        },
        usedIn: ['discord-bot-dashboard', 'github-build-release'],
      },
      {
        name: 'React',
        note: {
          en: 'For renderers with real state. Not for a page that could be three files.',
          el: 'Για renderers με πραγματικό state. Όχι για μια σελίδα που θα ήταν τρία αρχεία.',
        },
        usedIn: ['steam-idler', 'github-build-release'],
      },
      {
        name: 'Vite',
        note: {
          en: 'The build tool I stopped thinking about, which is the highest compliment available.',
          el: 'Το build tool που έπαψα να σκέφτομαι — που είναι και το μεγαλύτερο κομπλιμέντο που μπορώ να κάνω.',
        },
      },
    ],
  },
  {
    id: 'browser',
    accent: 'blue',
    title: { en: 'Browser Platform', el: 'Πλατφόρμα Browser' },
    blurb: {
      en: 'Three extensions in, Manifest V3 has opinions and I have learned them the hard way.',
      el: 'Τρία extensions μέσα, το Manifest V3 έχει απόψεις και τις έμαθα με τον δύσκολο τρόπο.',
    },
    items: [
      {
        name: 'Manifest V3',
        note: {
          en: 'Service workers die constantly. Design for waking up, not for staying alive.',
          el: 'Τα service workers πεθαίνουν συνέχεια. Σχεδίασέ το για να ξυπνάει, όχι για να επιβιώνει.',
        },
        usedIn: ['nexusmods-bypass', 'an1me-tracker', 'an1me-speed-control'],
      },
      {
        name: 'Chrome Extension APIs',
        note: {
          en: 'storage, alarms, downloads, notifications, identity, sidePanel. Ask for the narrowest set that works.',
          el: 'storage, alarms, downloads, notifications, identity, sidePanel. Ζητάς το πιο στενό σετ που δουλεύει και τίποτα παραπάνω.',
        },
      },
      {
        name: 'DOM injection',
        note: {
          en: 'Modifying a site you do not control means the layout will change under you. Fail visibly, never silently.',
          el: 'Όταν πειράζεις site που δεν ελέγχεις, το layout θα αλλάξει κάτω από τα πόδια σου. Απέτυχε φανερά, ποτέ σιωπηλά.',
        },
      },
      {
        name: 'Extension i18n',
        note: {
          en: '13 locales × 322 strings only survives with a script that fails the build.',
          el: '13 locales × 322 strings επιβιώνουν μόνο με script που ρίχνει το build όταν λείπει κάτι.',
        },
        usedIn: ['nexusmods-bypass'],
      },
    ],
  },
  {
    id: 'data',
    accent: 'orange',
    title: { en: 'Data & Cloud', el: 'Data & Cloud' },
    blurb: {
      en: 'Used sparingly. Local-first by default, cloud only when it earns its place.',
      el: 'Με φειδώ. Local-first από προεπιλογή, cloud μόνο όταν το αξίζει.',
    },
    items: [
      {
        name: 'Supabase',
        note: {
          en: 'Auth and preference sync. Google and Discord OAuth, and nothing that would hurt if the service vanished.',
          el: 'Auth και sync προτιμήσεων. Google και Discord OAuth, και τίποτα που θα πονούσε αν εξαφανιζόταν αύριο η υπηρεσία.',
        },
        usedIn: ['make-your-life-easier'],
      },
      {
        name: 'Firebase / Firestore',
        note: {
          en: 'One private document per user. Optional — the extension works fully signed out.',
          el: 'Ένα ιδιωτικό document ανά χρήστη. Προαιρετικό — το extension δουλεύει πλήρως χωρίς σύνδεση.',
        },
        usedIn: ['an1me-tracker'],
      },
      {
        name: 'SQLite',
        note: {
          en: 'When a local app needs real queries instead of a JSON file pretending to be a database.',
          el: 'Όταν μια τοπική εφαρμογή θέλει πραγματικά queries αντί για ένα JSON που παριστάνει τη βάση.',
        },
      },
      {
        name: 'Cloudflare R2',
        note: {
          en: 'Update feed for installers and portable builds. Cheap, boring, does not go down.',
          el: 'Update feed για installers και portable builds. Φθηνό, βαρετό, δεν πέφτει ποτέ.',
        },
        usedIn: ['make-your-life-easier'],
      },
    ],
  },
  {
    id: 'tools',
    accent: 'pink',
    title: { en: 'Tools', el: 'Εργαλεία' },
    blurb: {
      en: 'Nothing exotic. Boring tools leave more attention for the problem.',
      el: 'Τίποτα εξωτικό. Τα βαρετά εργαλεία αφήνουν περισσότερη προσοχή για το πρόβλημα.',
    },
    items: [
      {
        name: 'Git / GitHub',
        note: {
          en: 'Everything public is source-available on purpose. If you can read it, you can check it.',
          el: 'Ό,τι είναι δημόσιο είναι source-available επίτηδες. Αν μπορείς να το διαβάσεις, μπορείς και να το ελέγξεις.',
        },
      },
      {
        name: 'VS Code',
        note: {
          en: 'With about six extensions, four of which I would not miss.',
          el: 'Με έξι περίπου extensions, τα τέσσερα από τα οποία δεν θα μου έλειπαν.',
        },
      },
      {
        name: 'electron-builder',
        note: {
          en: 'NSIS installers, portable builds, Authenticode signing. The unglamorous half of shipping desktop software.',
          el: 'NSIS installers, portable builds, Authenticode signing. Το άχαρο μισό του να βγάζεις desktop λογισμικό.',
        },
      },
      {
        name: 'winget / PowerShell',
        note: {
          en: 'The actual Windows automation surface underneath the pretty buttons.',
          el: 'Η πραγματική επιφάνεια αυτοματισμού των Windows, κάτω από τα ωραία κουμπιά.',
        },
        usedIn: ['make-your-life-easier', 'autoclicker-premium'],
      },
    ],
  },
]

export interface AreaItem {
  title: L
  body: L
  proof: string[]
}

export const areas: AreaItem[] = [
  {
    title: { en: 'Browser extensions', el: 'Browser extensions' },
    body: {
      en: 'Modifying sites I do not control, politely and reversibly. Three shipped, one with thousands of weekly users.',
      el: 'Να πειράζω sites που δεν ελέγχω, ευγενικά και αναστρέψιμα. Τρία βγήκαν, το ένα με χιλιάδες χρήστες την εβδομάδα.',
    },
    proof: ['nexusmods-bypass', 'an1me-tracker', 'an1me-speed-control'],
  },
  {
    title: { en: 'Windows automation', el: 'Windows automation' },
    body: {
      en: 'winget, SFC, DISM, PowerShell, scheduled cleanup and per-task elevation — wrapped so you never see any of it.',
      el: 'winget, SFC, DISM, PowerShell, προγραμματισμένο καθάρισμα και elevation ανά εργασία — τυλιγμένα ώστε να μη χρειάζεται να δεις τίποτα από αυτά.',
    },
    proof: ['make-your-life-easier', 'autoclicker-premium'],
  },
  {
    title: { en: 'Desktop apps', el: 'Desktop εφαρμογές' },
    body: {
      en: 'Electron with a locked-down renderer, an isolated worker for anything native, and auto-update that has actually been tested.',
      el: 'Electron με κλειδωμένο renderer, απομονωμένο worker για ό,τι είναι native, και auto-update που έχει όντως τεσταριστεί.',
    },
    proof: ['steam-idler', 'make-your-life-easier', 'github-build-release'],
  },
  {
    title: { en: 'Data parsing', el: 'Data parsing' },
    body: {
      en: 'Taking a badly-shaped export and turning it into something a human can read, search and understand.',
      el: 'Να παίρνω ένα κακοφτιαγμένο export και να το κάνω κάτι που ένας άνθρωπος μπορεί να διαβάσει, να ψάξει και να καταλάβει.',
    },
    proof: ['discord-package-viewer'],
  },
  {
    title: { en: 'REST & third-party APIs', el: 'REST & third-party APIs' },
    body: {
      en: 'GitHub, AniList GraphQL, Jikan, AniSkip, Steam, Dropbox. Mostly the art of failing well when they are down.',
      el: 'GitHub, AniList GraphQL, Jikan, AniSkip, Steam, Dropbox. Κυρίως η τέχνη του να μη σκας όταν πέφτουν.',
    },
    proof: ['an1me-tracker', 'github-build-release', 'steam-idler'],
  },
  {
    title: { en: 'UI development', el: 'UI development' },
    body: {
      en: 'The reason people keep the tools installed. A utility that looks considered gets forgiven for a lot.',
      el: 'Ο λόγος που ο κόσμος κρατάει τα εργαλεία εγκατεστημένα. Ένα utility που δείχνει προσεγμένο το συγχωρείς για πολλά.',
    },
    proof: ['gta-academy', 'steam-idler', 'discord-package-viewer'],
  },
]

export const stackNote: L = {
  en: 'No percentage bars. A number next to a language name has never told anyone anything true. If you want to know whether I can do the thing, the repositories are right there.',
  el: 'Χωρίς μπάρες ποσοστών. Ένα νούμερο δίπλα σε όνομα γλώσσας δεν έχει πει ποτέ σε κανέναν κάτι αληθινό. Αν θες να μάθεις αν μπορώ να κάνω το πράγμα, τα repositories είναι από πάνω.',
}
