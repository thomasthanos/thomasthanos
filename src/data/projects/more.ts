import type { Project } from '@/data/types'

const GH = 'https://github.com/thomasthanos'

export const more: Project[] = [
  {
    slug: 'an1me-speed-control',
    name: 'An1me.to Speed Control',
    category: 'browser',
    status: 'maintained',
    accent: 'pink',
    year: '2026',
    version: '3.5',
    repo: `${GH}/an1me-extensions/tree/main/an1me-speed-control`,
    repoLabel: 'an1me-extensions',
    repoPath: 'an1me-speed-control',
    tech: ['JavaScript', 'Manifest V3', 'chrome.storage'],
    lab: {
      badge: { en: 'Surprisingly stable', el: 'Απρόσμενα σταθερό' },
      note: {
        en: 'Two keys, one permission, and nothing left to add.',
        el: 'Δύο πλήκτρα, ένα permission, και τίποτα άλλο να προστεθεί.',
      },
    },
    metrics: [
      { value: '2', label: { en: 'hotkeys', el: 'hotkeys' } },
      { value: '5', label: { en: 'boost speeds', el: 'ταχύτητες boost' } },
      { value: '1', label: { en: 'permission', el: 'permission' } },
      { value: '0', label: { en: 'network calls', el: 'κλήσεις δικτύου' } },
    ],
    short: {
      en: 'Hold F7 to boost playback speed, press F8 to toggle it. Remembers your default speed and volume. That is the entire product.',
      el: 'Κρατάς F7 και τρέχει, πατάς F8 και κλειδώνει. Θυμάται ταχύτητα και ένταση. Αυτό είναι όλο το προϊόν, τέλος.',
    },
    summary: {
      en: 'A single content script that gives an1me.to the playback controls it should have shipped with. Hold F7 for temporary speed-up, F8 to lock it on, and your preferred default speed and volume persist between sessions.',
      el: 'Ένα content script που δίνει στο an1me.to τα playback controls που έπρεπε να έχει εξαρχής. Κρατάς F7 για προσωρινή επιτάχυνση, F8 για να το κλειδώσεις, και η προτιμώμενη ταχύτητα και ένταση μένουν αποθηκευμένες.',
    },
    why: {
      en: 'A separate extension rather than a feature of the Tracker, because a tool that does one thing should not need a Firebase account to exist.',
      el: 'Ξεχωριστό extension αντί για feature του Tracker, επειδή ένα εργαλείο που κάνει ένα πράγμα δεν χρειάζεται λογαριασμό Firebase για να υπάρχει.',
    },
    what: {
      en: 'Hold F7 and playback speeds up for as long as you hold it; F8 locks the boost on. Your preferred default speed and volume are remembered between sessions. It registers on every frame, because the player is not on the top-level document.',
      el: 'Κρατάς F7 και η αναπαραγωγή επιταχύνει όσο το κρατάς· το F8 κλειδώνει το boost. Η ταχύτητα και η ένταση που προτιμάς θυμούνται από session σε session. Δηλώνεται σε κάθε frame, επειδή ο player δεν είναι στο top-level document.',
    },
    sketch: {
      title: 'an1me.to — playback',
      kind: 'browser',
      rows: [
        { label: 'Hold F7', value: 'boost while held', hot: true },
        { label: 'Press F8', value: 'lock boost on' },
        { label: 'Default speed', value: 'remembered' },
        { label: 'Volume', value: 'remembered' },
        { label: 'Injected into', value: 'all_frames' },
        { label: 'Permissions', value: 'storage only' }
      ]
    },
    features: [
      {
        title: { en: 'Hold-to-boost', el: 'Hold-to-boost' },
        body: {
          en: 'F7 speeds playback while held and drops back the moment you let go.',
          el: 'Το F7 επιταχύνει όσο το κρατάς και επιστρέφει μόλις το αφήσεις.',
        },
      },
      {
        title: { en: 'Works inside iframes', el: 'Δουλεύει και σε iframes' },
        body: {
          en: 'Registered with `all_frames`, because the player is not on the top-level document.',
          el: 'Δηλωμένο με `all_frames`, επειδή ο player δεν είναι στο top-level document.',
        },
      },
      {
        title: { en: 'It never learns a boost', el: 'Δεν μαθαίνει ποτέ boost' },
        body: {
          en: 'Your default speed is only ever remembered when it is 2× or slower. Boost speeds are deliberately excluded, so a session at 8× cannot quietly become the speed every episode starts at.',
          el: 'Η προεπιλεγμένη ταχύτητά σου αποθηκεύεται μόνο όταν είναι 2× ή πιο αργή. Οι ταχύτητες boost εξαιρούνται επίτηδες, ώστε μια βραδιά στα 8× να μη γίνει σιωπηλά η ταχύτητα με την οποία ξεκινάει κάθε επεισόδιο.',
        },
      },
      {
        title: { en: 'Hooks the site’s own player', el: 'Πιάνει τον player του site' },
        body: {
          en: 'The site runs ArtPlayer. When you change speed through its own settings menu, a capturing-phase listener catches the click before ArtPlayer handles it, so your choice is recorded rather than lost.',
          el: 'Το site τρέχει ArtPlayer. Όταν αλλάζεις ταχύτητα από το δικό του μενού, ένας listener σε capturing phase πιάνει το κλικ πριν το χειριστεί ο ArtPlayer, ώστε η επιλογή σου να καταγραφεί αντί να χαθεί.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'The keys go to whoever is focused', el: 'Τα πλήκτρα πάνε σε όποιον έχει focus' },
        body: {
          en: 'A keydown listener only fires in the document that has focus, and the player lives in an iframe. Until you click the video, the keystrokes land on the page around it and nothing happens. There is no way to fix that from an extension, so the extension says so instead: a toast appears reading “Click the video to activate speed controls,” with both keys drawn on it. Admitting the constraint in one line was cheaper than any workaround.',
          el: 'Ένας listener keydown πυροδοτείται μόνο στο document που έχει focus, και ο player ζει μέσα σε iframe. Μέχρι να κάνεις κλικ στο βίντεο, τα πλήκτρα πέφτουν στη σελίδα γύρω του και δεν γίνεται τίποτα. Δεν διορθώνεται από extension, οπότε το extension απλώς το λέει: εμφανίζεται ένα toast «Click the video to activate speed controls», με τα δύο πλήκτρα σχεδιασμένα πάνω του. Το να παραδεχτείς τον περιορισμό σε μία γραμμή ήταν φθηνότερο από κάθε workaround.',
        },
      },
      {
        title: { en: 'The player overwrites you', el: 'Ο player σε ξαναγράφει' },
        body: {
          en: 'Setting playback rate and volume once does not hold — the player re-applies its own values as it initialises. Rather than fight for a single correct moment, the defaults are re-applied on `loadedmetadata`, `canplay` and `playing`, and then again at 500ms, 1s and 2s. It is brute force, and it is the thing that made the feature actually work.',
          el: 'Το να ορίσεις ταχύτητα και ένταση μία φορά δεν κρατάει — ο player ξαναβάζει τις δικές του τιμές καθώς αρχικοποιείται. Αντί να ψάχνουμε τη μία σωστή στιγμή, οι προεπιλογές ξαναεφαρμόζονται σε `loadedmetadata`, `canplay` και `playing`, και ξανά στα 500ms, 1s και 2s. Είναι μπρούτε φορς, και είναι αυτό που έκανε το feature να δουλέψει στ᾽ αλήθεια.',
        },
      },
      {
        title: { en: 'No messaging between popup and page', el: 'Χωρίς messaging popup και σελίδας' },
        body: {
          en: 'The popup never talks to the content script directly. It writes the chosen speed to `chrome.storage.local`, and every frame listens on `storage.onChanged`. One write reaches every iframe at once, and the extension never needs the `tabs` permission to do it — which is why the permission list has exactly one entry on it.',
          el: 'Το popup δεν μιλάει ποτέ απευθείας στο content script. Γράφει την επιλεγμένη ταχύτητα στο `chrome.storage.local`, και κάθε frame ακούει στο `storage.onChanged`. Ένα write φτάνει ταυτόχρονα σε όλα τα iframes, και το extension δεν χρειάζεται ποτέ permission `tabs` γι᾽ αυτό — γι᾽ αυτό η λίστα permissions έχει ακριβώς μία εγγραφή.',
        },
      },
      {
        title: { en: 'Knowing when to stop', el: 'Να ξέρεις πότε να σταματήσεις' },
        body: {
          en: 'The declared service worker is two lines long and one of them is a `console.log`. Nothing needs to run in the background, so nothing does. The whole extension is 707 lines, and 231 of them are the popup stylesheet — the interface is a third of the project because the logic genuinely did not need to be larger.',
          el: 'Ο δηλωμένος service worker είναι δύο γραμμές και η μία είναι `console.log`. Τίποτα δεν χρειάζεται να τρέχει στο παρασκήνιο, οπότε δεν τρέχει τίποτα. Όλο το extension είναι 707 γραμμές, και οι 231 είναι το stylesheet του popup — το interface είναι το ένα τρίτο του project επειδή η λογική πραγματικά δεν χρειαζόταν να είναι μεγαλύτερη.',
        },
      },
    ],
    disclaimer: {
      en: 'Not affiliated with an1me.to.',
      el: 'Χωρίς σχέση με το an1me.to.',
    },
    privacy: {
      en: 'Four preferences stay in local extension storage: boost speed, default speed, volume and mute state. There are no network requests, analytics, accounts, tabs access or browsing-history access.',
      el: 'Τέσσερις προτιμήσεις μένουν στο τοπικό storage του extension: boost speed, default speed, ένταση και mute state. Δεν υπάρχουν network requests, analytics, λογαριασμοί, πρόσβαση σε tabs ή ιστορικό περιήγησης.',
    },
    impact: {
      en: 'It turns a missing player control into two muscle-memory shortcuts and then stays out of the way — including when the video is embedded inside an iframe.',
      el: 'Μετατρέπει ένα player control που λείπει σε δύο shortcuts μυϊκής μνήμης και μετά εξαφανίζεται από τη μέση — ακόμη κι όταν το video βρίσκεται μέσα σε iframe.',
    },
    lessons: {
      en: [
        'A tiny tool feels finished when it remembers the user’s preferred state, not when it gains another screen.',
        'Iframe-hosted media needs the content script registered for every frame, not just the top document.',
        'Shared storage is a message bus. Writing one key and letting every frame listen removed the need for tab messaging, and with it the permission that would have come attached.',
        'When a constraint cannot be engineered away, say it in the interface. One honest sentence about clicking the video saved more confusion than any amount of clever focus handling would have.',
      ],
      el: [
        'Ένα μικρό εργαλείο μοιάζει ολοκληρωμένο όταν θυμάται την προτιμώμενη κατάσταση του χρήστη, όχι όταν αποκτά άλλη μία οθόνη.',
        'Το media μέσα σε iframe χρειάζεται content script δηλωμένο για όλα τα frames, όχι μόνο για το κεντρικό document.',
        'Το κοινό storage είναι δίαυλος μηνυμάτων. Γράφοντας ένα κλειδί και αφήνοντας κάθε frame να ακούει, έφυγε η ανάγκη για messaging σε tabs — και μαζί της το permission που θα ερχόταν κολλημένο.',
        'Όταν ένας περιορισμός δεν λύνεται τεχνικά, πες τον στο interface. Μία τίμια πρόταση για το κλικ στο βίντεο γλίτωσε περισσότερη σύγχυση απ᾽ όσο κάθε έξυπνος χειρισμός focus.',
      ],
    },
  },

  {
    slug: 'autoclicker-premium',
    name: 'AutoClicker Premium',
    category: 'windows',
    alsoIn: ['desktop', 'automation'],
    status: 'maintained',
    accent: 'violet',
    year: '2026',
    version: '1.0.0',
    repo: `${GH}/desktop-utils/tree/main/autoclicker_premium`,
    repoLabel: 'desktop-utils',
    repoPath: 'autoclicker_premium',
    tech: ['Electron', 'React', 'TypeScript', 'Tailwind', 'Radix UI', 'PowerShell'],
    lab: {
      badge: { en: 'Works on my machine', el: 'Στο δικό μου δουλεύει' },
      note: {
        en: 'F6 to destroy. Use responsibly, or do not — I am not your boss.',
        el: 'F6 για καταστροφή. Χρησιμοποίησέ το υπεύθυνα, ή μη — δεν είμαι αφεντικό σου.',
      },
    },
    metrics: [
      { value: '1', label: { en: 'PowerShell process', el: 'PowerShell process' } },
      { value: '0', label: { en: 'spawns per click', el: 'spawns ανά click' } },
      { value: '0', label: { en: 'rows sent anywhere', el: 'γραμμές που στέλνονται' } },
      { value: '2,421', label: { en: 'lines hand-written', el: 'γραμμές στο χέρι' } },
    ],
    short: {
      en: 'A highly configurable, Windows 11-styled auto-clicker with global hotkeys and a persistent PowerShell runspace for zero-overhead clicking.',
      el: 'Auto-clicker σε στυλ Windows 11, με global hotkeys και μόνιμο PowerShell runspace ώστε το κάθε κλικ να μη στοιχίζει τίποτα.',
    },
    summary: {
      en: 'Left, right and middle click simulation across a queue of screen positions, each with its own click count, fixed or randomised intervals and a repeat cap. Arrangements save as profiles, global hotkeys drive it while another window has focus, and the whole thing sits behind a clean Windows 11-style interface.',
      el: 'Προσομοίωση αριστερού, δεξιού και μεσαίου κλικ σε ουρά από θέσεις στην οθόνη, με ξεχωριστό αριθμό κλικ ανά θέση, σταθερά ή τυχαία intervals και όριο επαναλήψεων. Οι διατάξεις σώζονται ως profiles, τα global hotkeys το οδηγούν ενώ έχει focus άλλο παράθυρο, και όλα κάθονται πίσω από ένα καθαρό interface σε στυλ Windows 11.',
    },
    why: {
      en: 'The interesting part is not the clicking. It is that spawning a PowerShell process per click is catastrophically slow, so the app holds one runspace open for the whole session and pushes commands into it.',
      el: 'Το ενδιαφέρον δεν είναι το clicking. Είναι ότι το να ξεκινάς PowerShell process ανά κλικ είναι καταστροφικά αργό, οπότε η εφαρμογή κρατάει ένα runspace ανοιχτό για όλο το session και του σπρώχνει εντολές.',
    },
    what: {
      en: 'More than a click loop: you can queue several screen positions, give each its own click count, choose fixed or randomised intervals, cap the repeats, and save the whole arrangement as a profile to load later. Global hotkeys start and stop it while another window has focus.',
      el: 'Κάτι παραπάνω από ένα click loop: βάζεις πολλές θέσεις στην οθόνη σε σειρά, δίνεις σε καθεμιά δικό της αριθμό κλικ, διαλέγεις σταθερά ή τυχαία intervals, βάζεις όριο επαναλήψεων, και σώζεις όλη τη διάταξη ως profile για να τη φορτώσεις μετά. Global hotkeys το ξεκινούν και το σταματούν ενώ έχει focus άλλο παράθυρο.',
    },
    sketch: {
      title: 'AutoClicker Premium',
      kind: 'panel',
      rows: [
        { label: 'Positions queued', value: '4', hot: true },
        { label: 'Clicks at position 2', value: '25' },
        { label: 'Interval', value: '80ms ± random' },
        { label: 'Repeat limit', value: '500' },
        { label: 'Hotkeys', value: 'F6 toggle · F7 panic' },
        { label: 'Profile', value: 'saved' }
      ]
    },
    features: [
      {
        title: { en: 'Three click modes', el: 'Τρεις λειτουργίες click' },
        body: {
          en: 'Simulates left, right and middle clicks with configurable timing and screen position.',
          el: 'Προσομοιώνει αριστερό, δεξί και μεσαίο click με ρυθμιζόμενο timing και θέση στην οθόνη.',
        },
      },
      {
        title: { en: 'Global hotkeys, and a panic key', el: 'Global hotkeys, και πλήκτρο πανικού' },
        body: {
          en: 'F6 toggles it on and off, F7 is a separate emergency stop, and both register globally so they work while another application owns the foreground. Both are reassignable — a tool that takes over your mouse needs a way out that does not require finding its window first.',
          el: 'Το F6 το ανοιγοκλείνει, το F7 είναι ξεχωριστό emergency stop, και τα δύο δηλώνονται global ώστε να δουλεύουν όσο άλλη εφαρμογή έχει το foreground. Και τα δύο αλλάζουν — ένα εργαλείο που παίρνει το ποντίκι σου χρειάζεται έξοδο που δεν απαιτεί να βρεις πρώτα το παράθυρό του.',
        },
      },
      {
        title: { en: 'Persistent runspace', el: 'Μόνιμο runspace' },
        body: {
          en: 'Keeps one PowerShell runspace alive and feeds it work instead of launching a new process for every click.',
          el: 'Κρατάει ένα PowerShell runspace ζωντανό και του στέλνει δουλειά αντί να ανοίγει νέο process για κάθε click.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Hot-path overhead', el: 'Overhead στο hot path' },
        body: {
          en: 'Process startup time dominates at short intervals. Moving that cost outside the click loop is what makes the tool responsive.',
          el: 'Ο χρόνος εκκίνησης process κυριαρχεί στα μικρά intervals. Η μεταφορά αυτού του κόστους έξω από το click loop είναι αυτό που κάνει το εργαλείο responsive.',
        },
      },
      {
        title: { en: 'Safe global control', el: 'Ασφαλής global έλεγχος' },
        body: {
          en: 'A clicker that can keep running behind other windows needs an obvious global stop path, not a button hidden in its own UI. Hence two separate keys: one to toggle, one that only ever stops.',
          el: 'Ένα clicker που συνεχίζει πίσω από άλλα παράθυρα χρειάζεται ξεκάθαρο global stop, όχι κουμπί κρυμμένο στο δικό του UI. Γι᾽ αυτό δύο ξεχωριστά πλήκτρα: ένα που εναλλάσσει, ένα που μόνο σταματάει.',
        },
      },
      {
        title: { en: 'A cloud client wired to nothing', el: 'Cloud client συνδεδεμένος στο τίποτα' },
        body: {
          en: 'The project was scaffolded from a generator, and the scaffold came with a Supabase client, two generated table types and a device-ID hook. None of it is used: there is not a single table call anywhere in the source, no file imports the client, and there is no environment file to point it at. So an auto-clicker ships something that reads like telemetry and does nothing. It sends no data because it was never wired to — which is a weaker guarantee than deleting it, and deleting it is the job.',
          el: 'Το project ξεκίνησε από generator, και το scaffold ήρθε με Supabase client, δύο παραγμένους τύπους πινάκων και ένα hook για device ID. Τίποτα δεν χρησιμοποιείται: δεν υπάρχει ούτε μία κλήση πίνακα πουθενά, κανένα αρχείο δεν εισάγει τον client, και δεν υπάρχει καν αρχείο περιβάλλοντος να τον στρέψει κάπου. Οπότε ένα auto-clicker κουβαλάει κάτι που διαβάζεται σαν telemetry και δεν κάνει τίποτα. Δεν στέλνει δεδομένα επειδή ποτέ δεν συνδέθηκε — που είναι πιο αδύναμη εγγύηση από το να το σβήσεις, και το σβήσιμο είναι η δουλειά.',
        },
      },
      {
        title: { en: 'More generated than written', el: 'Περισσότερα παραγμένα παρά γραμμένα' },
        body: {
          en: 'Forty-nine component files came with the UI kit and account for 3,954 lines. The eighteen files that are actually this application come to 2,421, plus 822 in the Electron main process. The generated half is real, working code and it saved a great deal of time — but it means the line count of this repository says almost nothing about the size of the project, and it would be dishonest to quote the total as if it did.',
          el: 'Σαράντα εννιά αρχεία component ήρθαν με το UI kit και αντιστοιχούν σε 3.954 γραμμές. Τα δεκαοκτώ αρχεία που είναι όντως αυτή η εφαρμογή φτάνουν τις 2.421, συν 822 στον main process του Electron. Το παραγμένο μισό είναι αληθινός κώδικας που δουλεύει και γλίτωσε πολύ χρόνο — αλλά σημαίνει ότι το line count αυτού του repository δεν λέει σχεδόν τίποτα για το μέγεθος του project, και θα ήταν ανέντιμο να αναφέρω το σύνολο σαν να λέει.',
        },
      },
    ],
    impact: {
      en: 'The same interface covers slow repetitive work and high-frequency clicking without paying for a new PowerShell process on every action.',
      el: 'Το ίδιο interface καλύπτει αργή επαναλαμβανόμενη δουλειά και high-frequency clicking χωρίς να πληρώνει νέο PowerShell process σε κάθε ενέργεια.',
    },
    lessons: {
      en: [
        'Optimising the setup around a loop can matter more than optimising the loop itself.',
        'Background automation needs a stop control that remains reachable when the application is not focused.',
      ],
      el: [
        'Το optimization γύρω από ένα loop μπορεί να έχει μεγαλύτερη σημασία από το optimization του ίδιου του loop.',
        'Το background automation χρειάζεται stop control που παραμένει προσβάσιμο όταν η εφαρμογή δεν έχει focus.',
      ],
    },
  },

  {
    slug: 'github-build-release',
    name: 'GitHub Build Release',
    category: 'automation',
    alsoIn: ['desktop'],
    status: 'maintained',
    accent: 'violet',
    year: '2026',
    version: '3.7.1',
    repo: `${GH}/desktop-utils/tree/main/Github-Build-Release`,
    repoLabel: 'desktop-utils',
    repoPath: 'Github-Build-Release',
    tech: ['Electron', 'React 19', 'Vite', 'GitHub CLI', 'DeepSeek', 'electron-builder'],
    lab: {
      badge: { en: 'Side quest', el: 'Side quest' },
      note: {
        en: 'A release tool, built to avoid the release process. The irony is noted.',
        el: 'Εργαλείο για releases, φτιαγμένο για να αποφύγω τη διαδικασία των releases. Το είδα κι εγώ το αστείο.',
      },
    },
    metrics: [
      { value: '3', label: { en: 'ways to draft notes', el: 'τρόποι για σημειώσεις' } },
      { value: '5,000', label: { en: 'lines of CSS', el: 'γραμμές CSS' } },
      { value: '1', label: { en: 'CLI, not an API', el: 'CLI, όχι API' } },
      { value: '0', label: { en: 'GitHub tokens stored', el: 'GitHub tokens αποθηκευμένα' } },
    ],
    short: {
      en: 'Reads your latest changes, drafts release notes from them with an LLM, bumps the version, runs electron-builder and publishes the release through the GitHub CLI.',
      el: 'Διαβάζει τις τελευταίες σου αλλαγές, γράφει release notes από αυτές με LLM, ανεβάζει την έκδοση, τρέχει το electron-builder και δημοσιεύει το release μέσω του GitHub CLI. Εσύ πίνεις καφέ.',
    },
    summary: {
      en: 'A desktop app around the part of shipping that nobody enjoys: pick a commit range, let a model read the diff and draft the notes, trigger the electron-builder build, watch the logs, and upload the artefacts to a GitHub Release without leaving the window.',
      el: 'Μια desktop εφαρμογή γύρω από το κομμάτι του shipping που δεν γουστάρει κανείς: διαλέγεις commit range, αφήνεις ένα μοντέλο να διαβάσει το diff και να γράψει τις σημειώσεις, τρέχεις το electron-builder build, βλέπεις τα logs, και ανεβάζεις τα artefacts σε GitHub Release χωρίς να βγεις από το παράθυρο.',
    },
    why: {
      en: 'I ship a lot of Electron builds and the manual path is identical every time. This is the automation that made maintaining four desktop apps at once survivable.',
      el: 'Βγάζω πολλά Electron builds και η χειροκίνητη διαδρομή είναι κάθε φορά ίδια. Αυτή η αυτοματοποίηση είναι που έκανε τη συντήρηση τεσσάρων desktop apps ταυτόχρονα βιώσιμη.',
    },
    what: {
      en: 'Point it at a repository and it reads the working tree — or a commit range, or a brief you type — sends that to DeepSeek for a first draft, and hands you the notes in a markdown editor with a live GitHub-flavoured preview. It bumps the patch version in package.json, runs electron-builder with the log stream in the window, and publishes through the GitHub CLI. Past releases and tags stay listed, with bulk delete.',
      el: 'Του δείχνεις ένα repository και διαβάζει το working tree — ή ένα commit range, ή ένα brief που γράφεις — τα στέλνει στο DeepSeek για πρώτο draft, και σου δίνει τις σημειώσεις σε markdown editor με ζωντανό GitHub-flavoured preview. Ανεβάζει το patch version στο package.json, τρέχει το electron-builder με τα logs μέσα στο παράθυρο, και δημοσιεύει μέσω του GitHub CLI. Τα παλιά releases και tags μένουν στη λίστα, με μαζική διαγραφή.',
    },
    sketch: {
      title: 'GitHub Release Manager',
      kind: 'panel',
      rows: [
        { label: 'Scope', value: 'working tree → HEAD', hot: true },
        { label: 'Notes', value: 'deepseek-v4-flash' },
        { label: 'Next tag', value: 'v4.6.7 → v4.6.8' },
        { label: 'Build', bar: 71, value: 'electron-builder' },
        { label: 'Publish', value: 'gh release create' },
        { label: 'History', value: '26 releases' }
      ]
    },
    features: [
      {
        title: { en: 'Diff-aware release notes', el: 'Release notes από το diff' },
        body: {
          en: 'Reads a selected commit range and sends the diff through an LLM to draft release notes from the actual changes.',
          el: 'Διαβάζει επιλεγμένο commit range και περνάει το diff από LLM για να γράψει release notes από τις πραγματικές αλλαγές.',
        },
      },
      {
        title: { en: 'Build orchestration', el: 'Build orchestration' },
        body: {
          en: 'Triggers electron-builder and keeps its output visible in the same desktop workflow.',
          el: 'Ενεργοποιεί το electron-builder και κρατάει το output του ορατό στο ίδιο desktop workflow.',
        },
      },
      {
        title: { en: 'Direct GitHub upload', el: 'Άμεσο upload στο GitHub' },
        body: {
          en: 'Creates the GitHub Release and uploads the generated artefacts without a separate browser session.',
          el: 'Δημιουργεί το GitHub Release και ανεβάζει τα παραγόμενα artefacts χωρίς ξεχωριστό browser session.',
        },
      },
      {
        title: { en: 'Three ways to draft', el: 'Τρεις τρόποι για draft' },
        body: {
          en: 'Latest changes reads the working tree and falls back to the last commit if the tree is clean. Commit range lets you pick two points. Manual brief lets you describe the release in your own words and have it written up. All three land in the same editable markdown field.',
          el: 'Το «Latest changes» διαβάζει το working tree και πέφτει πίσω στο τελευταίο commit αν είναι καθαρό. Το «Commit range» σε αφήνει να διαλέξεις δύο σημεία. Το «Manual brief» σε αφήνει να περιγράψεις το release με δικά σου λόγια και να γραφτεί από εκεί. Και τα τρία καταλήγουν στο ίδιο επεξεργάσιμο markdown πεδίο.',
        },
      },
      {
        title: { en: 'It installs its own dependency', el: 'Εγκαθιστά μόνο του την εξάρτησή του' },
        body: {
          en: 'The whole tool is built on the GitHub CLI, so if `gh` is missing it offers to install it for you with winget rather than sending you to a download page — and if you are signed out, it opens the authentication command instead of just reporting a failure.',
          el: 'Όλο το εργαλείο στηρίζεται στο GitHub CLI, οπότε αν λείπει το `gh` προσφέρεται να το εγκαταστήσει με winget αντί να σε στείλει σε σελίδα λήψης — και αν δεν είσαι συνδεδεμένος, ανοίγει την εντολή σύνδεσης αντί να αναφέρει απλώς αποτυχία.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'One pipeline, three failure modes', el: 'Ένα pipeline, τρία failure modes' },
        body: {
          en: 'Model generation, local packaging and remote upload can fail independently, so each stage needs its own visible state and logs.',
          el: 'Model generation, local packaging και remote upload μπορούν να αποτύχουν ανεξάρτητα, οπότε κάθε στάδιο χρειάζεται δικό του ορατό state και logs.',
        },
      },
      {
        title: { en: 'Useful AI output', el: 'Χρήσιμο AI output' },
        body: {
          en: 'The model has to receive a bounded commit diff and return editable notes, not invent a release from a vague project description. The draft always lands in a markdown field you can rewrite before anything is published — the model gets the first word, never the last one.',
          el: 'Το model πρέπει να παίρνει περιορισμένο commit diff και να επιστρέφει επεξεργάσιμες σημειώσεις, όχι να επινοεί release από μια αόριστη περιγραφή project. Το draft καταλήγει πάντα σε markdown πεδίο που μπορείς να ξαναγράψεις πριν δημοσιευτεί οτιδήποτε — το μοντέλο παίρνει τον πρώτο λόγο, ποτέ τον τελευταίο.',
        },
      },
      {
        title: { en: 'Shelling out instead of calling an API', el: 'Shell αντί για API' },
        body: {
          en: 'Every GitHub operation runs through the `gh` command line rather than the REST API. That means no token to store, no auth flow to write and no scopes to get wrong — the tool inherits whatever login you already have. The cost is that it is useless without `gh` present, which is why installing it is part of the empty state rather than a note in a readme.',
          el: 'Κάθε λειτουργία GitHub περνάει από τη γραμμή εντολών `gh` αντί για το REST API. Αυτό σημαίνει κανένα token για αποθήκευση, κανένα auth flow για γράψιμο και κανένα scope για να το κάνεις λάθος — το εργαλείο κληρονομεί όποιο login έχεις ήδη. Το κόστος είναι ότι είναι άχρηστο χωρίς το `gh`, γι᾽ αυτό η εγκατάστασή του είναι μέρος της αρχικής οθόνης και όχι σημείωση σε readme.',
        },
      },
      {
        title: { en: 'Half the project is stylesheet', el: 'Το μισό project είναι stylesheet' },
        body: {
          en: '5,000 of the 10,676 lines here are CSS, and 1,629 of those are the create-release screen alone. For a tool with three buttons and a text field that is either indefensible or exactly the point, depending on how you feel about tools you use every week. I lean towards the second.',
          el: '5.000 από τις 10.676 γραμμές εδώ είναι CSS, και οι 1.629 μόνο η οθόνη δημιουργίας release. Για ένα εργαλείο με τρία κουμπιά και ένα πεδίο κειμένου, αυτό είναι είτε αδικαιολόγητο είτε ακριβώς το ζητούμενο, ανάλογα με το πώς νιώθεις για εργαλεία που χρησιμοποιείς κάθε βδομάδα. Κλίνω προς το δεύτερο.',
        },
      },
    ],
    privacy: {
      en: 'This tool is intentionally not offline. Your selected diff is sent to DeepSeek, and release metadata and build artefacts go to GitHub through the `gh` CLI. It stores no GitHub token of its own — it borrows whatever login `gh` already holds — but it does save your DeepSeek API key to a local config file, and that key is stored in plain text.',
      el: 'Αυτό το εργαλείο σκόπιμα δεν είναι offline. Το επιλεγμένο diff στέλνεται στο DeepSeek, και τα release metadata και build artefacts πάνε στο GitHub μέσω του `gh` CLI. Δεν αποθηκεύει δικό του GitHub token — δανείζεται όποιο login κρατάει ήδη το `gh` — αλλά αποθηκεύει το DeepSeek API key σου σε τοπικό αρχείο config, και αυτό το κλειδί μένει σε απλό κείμενο.',
    },
    impact: {
      en: 'Commit selection, note drafting, packaging and publishing live in one repeatable flow instead of four disconnected tools.',
      el: 'Commit selection, σύνταξη σημειώσεων, packaging και publishing βρίσκονται σε ένα επαναλήψιμο flow αντί για τέσσερα ασύνδετα εργαλεία.',
    },
    lessons: {
      en: [
        'AI is most useful in a release tool when it is grounded in an explicit diff and its output stays editable.',
        'A multi-stage automation needs honest logs just as much as it needs a one-click start button.',
        'Shelling out to a CLI someone else maintains beat writing my own auth. No token to store, no scopes to get wrong, and the login was already there.',
        'If a tool depends on something not installed, installing it is part of the product. Sending the user to a download page is where most internal tools quietly die.',
      ],
      el: [
        'Το AI είναι πιο χρήσιμο σε release tool όταν βασίζεται σε συγκεκριμένο diff και το output του παραμένει επεξεργάσιμο.',
        'Ένα multi-stage automation χρειάζεται ειλικρινή logs όσο χρειάζεται και κουμπί εκκίνησης με ένα click.',
        'Το να καλέσω ένα CLI που συντηρεί κάποιος άλλος κέρδισε από το να γράψω δικό μου auth. Κανένα token για αποθήκευση, κανένα scope για λάθος, και το login ήταν ήδη εκεί.',
        'Αν ένα εργαλείο εξαρτάται από κάτι που δεν είναι εγκατεστημένο, η εγκατάστασή του είναι μέρος του προϊόντος. Το να στέλνεις τον χρήστη σε σελίδα λήψης είναι εκεί που πεθαίνουν σιωπηλά τα περισσότερα εσωτερικά εργαλεία.',
      ],
    },
  },

  {
    slug: 'backup-studio',
    name: 'Backup Studio',
    category: 'automation',
    alsoIn: ['desktop', 'windows'],
    status: 'maintained',
    accent: 'blue',
    year: '2026',
    version: '2.0.2',
    repo: `${GH}/desktop-utils/tree/main/backup_projects`,
    repoLabel: 'desktop-utils',
    repoPath: 'backup_projects',
    tech: ['Electron', 'React 18', 'Node.js', 'diff2html', 'Babel standalone'],
    lab: {
      badge: { en: 'Built out of fear', el: 'Φτιαγμένο από φόβο' },
      note: {
        en: 'Written the week after I nearly lost three weeks of uncommitted work.',
        el: 'Γραμμένο την εβδομάδα μετά που παραλίγο να χάσω τρεις εβδομάδες uncommitted δουλειάς.',
      },
    },
    metrics: [
      { value: '5', label: { en: 'folders never archived', el: 'φάκελοι που δεν μπαίνουν ποτέ' } },
      { value: '0', label: { en: 'API keys needed', el: 'API keys που χρειάζονται' } },
      { value: '0', label: { en: 'build step', el: 'build step' } },
      { value: '55%', label: { en: 'of it is stylesheet', el: 'είναι stylesheet' } },
    ],
    short: {
      en: 'Compresses your project folders into the Dropbox folder you already have, skipping the five directories that rebuild themselves, and shows you the diff between any two versions.',
      el: 'Ζιπάρει τους φακέλους των projects σου μέσα στον φάκελο Dropbox που ήδη έχεις, παρακάμπτοντας τους πέντε καταλόγους που ξαναχτίζονται μόνοι τους, και σου δείχνει το diff ανάμεσα σε δύο εκδόσεις.',
    },
    summary: {
      en: 'Backup for the gap between commits. It zips selected project folders, skips the five directories that rebuild themselves, and writes the archive into your local Dropbox folder — letting the Dropbox client you already run do the syncing. Its own config lives in there too, so the same project list follows you between machines.',
      el: 'Backup για το κενό ανάμεσα στα commits. Κάνει zip επιλεγμένους φακέλους, παρακάμπτει τους πέντε καταλόγους που ξαναχτίζονται μόνοι τους, και γράφει το archive μέσα στον τοπικό σου φάκελο Dropbox — αφήνοντας τον Dropbox client που ήδη τρέχεις να κάνει το sync. Το ίδιο του το config ζει κι αυτό εκεί μέσα, ώστε η ίδια λίστα project να σε ακολουθεί ανάμεσα στα μηχανήματα.',
    },
    why: {
      en: 'Git protects committed work. Nothing protects the three days you have not committed yet, which is exactly the window in which SSDs like to die.',
      el: 'Το Git προστατεύει ό,τι έχεις κάνει commit. Τίποτα δεν προστατεύει τις τρεις μέρες που δεν έχεις κάνει ακόμα commit — και ακριβώς εκεί μέσα αρέσει στους SSD να πεθαίνουν.',
    },
    what: {
      en: 'Keeps a list of the project folders worth protecting and archives them on demand, naming each one by day and version so the history reads at a glance. It can show you a full file-level diff between any two backups, tells you whether the Dropbox client is actually running and starts it if not, and pulls each project’s latest GitHub release into the same window.',
      el: 'Κρατάει λίστα με τους φακέλους που αξίζει να προστατευτούν και τους αρχειοθετεί όποτε το ζητήσεις, ονομάζοντας τον καθένα με ημέρα και έκδοση ώστε το ιστορικό να διαβάζεται με μια ματιά. Μπορεί να σου δείξει πλήρες diff σε επίπεδο αρχείου ανάμεσα σε δύο backup, σου λέει αν ο Dropbox client όντως τρέχει και τον ξεκινάει αν όχι, και φέρνει το τελευταίο GitHub release κάθε project στο ίδιο παράθυρο.',
    },
    sketch: {
      title: 'Backup Studio',
      kind: 'panel',
      rows: [
        { label: 'Projects tracked', value: '9', hot: true },
        { label: 'Excluded', value: '5 folders' },
        { label: 'Archiving', bar: 55 },
        { label: 'Named', value: '..._D18_V4' },
        { label: 'Dropbox client', value: 'running' },
        { label: 'Compare', value: 'file-level diff' }
      ]
    },
    features: [
      {
        title: { en: 'Selective compression', el: 'Επιλεκτική συμπίεση' },
        body: {
          en: 'Packages the project folders you choose while excluding dependency folders such as node_modules.',
          el: 'Συμπιέζει τους φακέλους project που επιλέγεις ενώ εξαιρεί dependency folders όπως το node_modules.',
        },
      },
      {
        title: { en: 'Dropbox without the Dropbox API', el: 'Dropbox χωρίς το Dropbox API' },
        body: {
          en: 'It never talks to Dropbox over the network. It reads the Dropbox client’s own `info.json` to find where your Dropbox folder lives, writes the archive in there, and lets the client you already run do the syncing. No API key, no OAuth, no token to store — and it drops its config in the same folder, so the project list follows you between machines for free.',
          el: 'Δεν μιλάει ποτέ στο Dropbox μέσω δικτύου. Διαβάζει το `info.json` του ίδιου του Dropbox client για να βρει πού ζει ο φάκελός σου, γράφει εκεί μέσα το archive, και αφήνει τον client που ήδη τρέχεις να κάνει το sync. Κανένα API key, κανένα OAuth, κανένα token — και αφήνει το config του στον ίδιο φάκελο, οπότε η λίστα project σε ακολουθεί ανάμεσα στα μηχανήματα δωρεάν.',
        },
      },
      {
        title: { en: 'Compare two backups', el: 'Σύγκριση δύο backup' },
        body: {
          en: 'Pick any two versions and it renders a full file-level diff in the window, so you can see what actually changed between Tuesday and Friday before you go digging through an archive.',
          el: 'Διαλέγεις δύο εκδόσεις και σου εμφανίζει πλήρες diff σε επίπεδο αρχείου μέσα στο παράθυρο, ώστε να δεις τι όντως άλλαξε ανάμεσα σε Τρίτη και Παρασκευή πριν αρχίσεις να σκαλίζεις archive.',
        },
      },
      {
        title: { en: 'It watches the client, not the cloud', el: 'Παρακολουθεί τον client, όχι το cloud' },
        body: {
          en: 'Because the sync is somebody else’s job, the one thing that can silently break it is the Dropbox client not running. So the sidebar shows its status, and offers to start it — the failure mode is surfaced instead of discovered three weeks later.',
          el: 'Επειδή το sync είναι δουλειά κάποιου άλλου, το ένα πράγμα που μπορεί να το χαλάσει σιωπηλά είναι να μην τρέχει ο Dropbox client. Οπότε το sidebar δείχνει την κατάστασή του και προσφέρεται να τον ξεκινήσει — η αστοχία φαίνεται αντί να ανακαλυφθεί τρεις εβδομάδες μετά.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Useful archives, not huge archives', el: 'Χρήσιμα, όχι τεράστια archives' },
        body: {
          en: 'Source folders contain rebuildable dependencies and generated output. Excluding that noise keeps backups fast enough to run regularly.',
          el: 'Οι source φάκελοι περιέχουν rebuildable dependencies και generated output. Ο αποκλεισμός αυτού του θορύβου κρατάει τα backups αρκετά γρήγορα για τακτική χρήση.',
        },
      },
      {
        title: { en: 'Configuration across machines', el: 'Ρυθμίσεις μεταξύ μηχανημάτων' },
        body: {
          en: 'Backing up projects is only half the problem; the application also has to remember which projects belong in the set on another PC. The config file is written into the Dropbox folder alongside the archives, so the second machine finds the list already there — and if the config is ever missing, the app rebuilds it by reading the backup folders that exist.',
          el: 'Το backup των projects είναι μόνο το μισό πρόβλημα· η εφαρμογή πρέπει επίσης να θυμάται ποια projects ανήκουν στο σετ σε άλλο PC. Το αρχείο config γράφεται μέσα στον φάκελο Dropbox δίπλα στα archives, οπότε το δεύτερο μηχάνημα βρίσκει τη λίστα ήδη εκεί — και αν το config λείψει, η εφαρμογή το ξαναχτίζει διαβάζοντας τους φακέλους backup που υπάρχουν.',
        },
      },
      {
        title: { en: 'Not writing a Dropbox integration', el: 'Να μη γράψεις integration για το Dropbox' },
        body: {
          en: 'The obvious build is an OAuth flow, a stored token, a refresh cycle and an upload queue. The actual build reads the Dropbox client’s own `info.json` to learn where your Dropbox folder is, writes a file into it, and stops. The syncing was already solved by software running on the machine; the only thing worth adding was finding it. The cost is that the app is useless if the client is not installed — which is why its status sits in the sidebar with a button to start it.',
          el: 'Η προφανής υλοποίηση είναι OAuth flow, αποθηκευμένο token, κύκλος ανανέωσης και ουρά upload. Η πραγματική υλοποίηση διαβάζει το `info.json` του ίδιου του Dropbox client για να μάθει πού είναι ο φάκελός σου, γράφει ένα αρχείο μέσα, και σταματάει. Το sync ήταν ήδη λυμένο από λογισμικό που τρέχει στο μηχάνημα· το μόνο που άξιζε να προστεθεί ήταν να το βρεις. Το κόστος είναι ότι η εφαρμογή είναι άχρηστη αν ο client δεν είναι εγκατεστημένος — γι᾽ αυτό η κατάστασή του κάθεται στο sidebar με κουμπί εκκίνησης.',
        },
      },
      {
        title: { en: 'A JSX app with no bundler', el: 'Εφαρμογή JSX χωρίς bundler' },
        body: {
          en: 'The renderer is a single 1,210-line JSX file, and there is no Vite, no webpack and no build step for it — Babel standalone ships as a runtime dependency and transpiles the file in the browser when the window opens. It is not what I would choose for something that had to start fast, but for a tool that opens once a week it removed an entire toolchain from a project that did not need one.',
          el: 'Ο renderer είναι ένα μοναδικό αρχείο JSX 1.210 γραμμών, και δεν υπάρχει Vite, webpack ή build step γι᾽ αυτόν — το Babel standalone έρχεται ως runtime dependency και το μεταγλωττίζει στον browser όταν ανοίγει το παράθυρο. Δεν θα το διάλεγα για κάτι που πρέπει να ξεκινάει γρήγορα, αλλά για εργαλείο που ανοίγει μία φορά τη βδομάδα αφαίρεσε ολόκληρη toolchain από project που δεν τη χρειαζόταν.',
        },
      },
    ],
    privacy: {
      en: 'Nothing is uploaded by this app. Archives and the config file are written into your own local Dropbox folder, and the Dropbox client you already run syncs them under your own account — the app holds no token and makes no network call to Dropbox at all. The one place it does reach the network is GitHub’s public API, to read the latest release for a project. Rebuildable dependency folders are deliberately excluded from every archive.',
      el: 'Τίποτα δεν ανεβαίνει από αυτή την εφαρμογή. Τα archives και το αρχείο config γράφονται στον δικό σου τοπικό φάκελο Dropbox, και ο Dropbox client που ήδη τρέχεις τα συγχρονίζει με τον δικό σου λογαριασμό — η εφαρμογή δεν κρατάει token και δεν κάνει καμία κλήση δικτύου προς το Dropbox. Το ένα σημείο όπου αγγίζει το δίκτυο είναι το δημόσιο API του GitHub, για να διαβάσει το τελευταίο release ενός project. Τα rebuildable dependency folders εξαιρούνται σκόπιμα από κάθε archive.',
    },
    impact: {
      en: 'It protects the work that exists after the last commit but before the next one — the exact window normal Git history cannot recover.',
      el: 'Προστατεύει τη δουλειά που υπάρχει μετά το τελευταίο commit αλλά πριν από το επόμενο — ακριβώς το παράθυρο που δεν μπορεί να επαναφέρει το κανονικό Git history.',
    },
    lessons: {
      en: [
        'A backup people actually run is better than a theoretically perfect backup with too much setup.',
        'Before writing an integration, check whether the machine already runs software that solves it. Reading the Dropbox client’s own config beat an OAuth flow, a stored token and an upload queue — and there is nothing to leak.',
        'This is the honest gap: there is still no restore. It archives, it compares, it never puts a version back. Recovery deserves the same attention as capture, and so far it has not had it — I open the folder and unzip by hand like everybody else.',
      ],
      el: [
        'Ένα backup που οι άνθρωποι πράγματι τρέχουν είναι καλύτερο από ένα θεωρητικά τέλειο backup με υπερβολικό setup.',
        'Πριν γράψεις integration, δες αν το μηχάνημα τρέχει ήδη λογισμικό που το λύνει. Το να διαβάσω το config του ίδιου του Dropbox client κέρδισε από OAuth flow, αποθηκευμένο token και ουρά upload — και δεν υπάρχει τίποτα να διαρρεύσει.',
        'Αυτό είναι το τίμιο κενό: δεν υπάρχει ακόμα restore. Αρχειοθετεί, συγκρίνει, ποτέ δεν επαναφέρει έκδοση. Το recovery αξίζει την ίδια προσοχή με την καταγραφή, και μέχρι στιγμής δεν την είχε — ανοίγω τον φάκελο και κάνω unzip στο χέρι όπως όλοι.',
      ],
    },
  },

  {
    slug: 'discord-bot-dashboard',
    name: 'Discord Bot & Dashboard',
    category: 'discord',
    alsoIn: ['web', 'automation'],
    status: 'active',
    accent: 'violet',
    year: '2026 — now',
    version: '1.0.0',
    repo: `${GH}/desktop-utils/tree/main/discord_bot`,
    repoLabel: 'desktop-utils',
    repoPath: 'discord_bot',
    tech: [
      'Node.js 22',
      'discord.js v14',
      'discord-player v7',
      'Express',
      'socket.io',
      'better-sqlite3',
      'EJS',
    ],
    lab: {
      badge: { en: 'Surprisingly stable', el: 'Απρόσμενα σταθερό' },
      note: {
        en: 'Has outlived several of the servers it was written for.',
        el: 'Έχει επιζήσει από αρκετούς servers για τους οποίους γράφτηκε.',
      },
    },
    metrics: [
      { value: '21', label: { en: 'slash commands', el: 'slash commands' } },
      { value: '98', label: { en: 'modules, 23K lines', el: 'modules, 23K γραμμές' } },
      { value: '15', label: { en: 'checks before deploy', el: 'checks πριν το deploy' } },
      { value: '24/7', label: { en: 'radio, self-reconnecting', el: 'ραδιόφωνο που επανασυνδέεται' } },
    ],
    short: {
      en: 'Music, 24/7 radio, deep-delete moderation and full transcripts, driven from a live web dashboard instead of a wall of chat commands.',
      el: 'Μουσική, ραδιόφωνο 24/7, deep-delete moderation και πλήρη transcripts, από ζωντανό web dashboard αντί για τοίχο από chat εντολές.',
    },
    summary: {
      en: 'Twenty-one slash commands over a discord.js v14 bot: a full music queue, a 24/7 radio mode that reconnects itself after a reboot or a crash, moderation that can delete past Discord\'s fourteen-day bulk limit, channel transcripts with their attachments, and invite tracking. All of it is also driveable from Pulse — an Express, EJS and socket.io dashboard that shows live stats, and where every command can be locked to specific roles or user IDs. The interface, and the bot, speak Greek.',
      el: 'Είκοσι μία slash commands πάνω σε bot με discord.js v14: πλήρης ουρά μουσικής, λειτουργία ραδιοφώνου 24/7 που επανασυνδέεται μόνη της μετά από reboot ή crash, moderation που σβήνει και πέρα από το όριο των δεκατεσσάρων ημερών του Discord, transcripts καναλιών μαζί με τα συνημμένα, και καταγραφή προσκλήσεων. Όλα δουλεύουν και από το Pulse — dashboard σε Express, EJS και socket.io που δείχνει ζωντανά στατιστικά, και όπου κάθε εντολή κλειδώνεται σε συγκεκριμένους ρόλους ή user ID. Το interface, και το bot, μιλάνε ελληνικά.',
    },
    why: {
      en: 'Years of running a large Greek GTA RP community taught me exactly which moderation jobs repeat and which ones nobody wants to do at 3am. The radio mode exists for a pettier reason: every music bot worth using eventually asks for a premium subscription to stay in the channel, and running your own is the only way out of that.',
      el: 'Χρόνια σε μεγάλη ελληνική GTA RP κοινότητα μού έμαθαν ακριβώς ποιες δουλειές moderation επαναλαμβάνονται και ποιες δεν θέλει να κάνει κανείς στις 3 τα ξημερώματα. Το ραδιόφωνο υπάρχει για πιο μίζερο λόγο: κάθε music bot που αξίζει κάτι, κάποια στιγμή σου ζητάει premium συνδρομή για να μείνει στο κανάλι, και το να στήσεις δικό σου είναι ο μόνος τρόπος να ξεφύγεις.',
    },
    what: {
      en: 'Runs as a normal Discord bot and, at the same time, serves a web dashboard on the same data. Anything you can do with a slash command you can do from the browser: queue a track, read a transcript, see who invited whom, or change which roles are allowed to run what.',
      el: 'Τρέχει σαν κανονικό Discord bot και ταυτόχρονα σερβίρει web dashboard πάνω στα ίδια δεδομένα. Ό,τι κάνεις με slash command το κάνεις και από τον browser: βάζεις τραγούδι στην ουρά, διαβάζεις transcript, βλέπεις ποιος προσκάλεσε ποιον, ή αλλάζεις ποιοι ρόλοι επιτρέπεται να τρέχουν τι.',
    },
    sketch: {
      title: 'dashboard — live',
      kind: 'panel',
      rows: [
        { label: 'Now playing', value: 'queue: 7 tracks', hot: true },
        { label: '24/7 radio', value: 'on · auto-reconnect' },
        { label: 'Commands', value: '21 registered' },
        { label: 'Access rules', value: 'per user + role' },
        { label: 'Transcripts', value: 'with attachments' },
        { label: 'Checks passing', bar: 100, value: '15 / 15' }
      ]
    },
    features: [
      {
        title: { en: 'Music and a 24/7 radio', el: 'Μουσική και ραδιόφωνο 24/7' },
        body: {
          en: 'Playback from YouTube or Spotify with a real queue — skip, shuffle, loop, volume, now-playing. Radio mode keeps a station running on its own and rejoins the channel after a restart or a crash without anyone touching it.',
          el: 'Αναπαραγωγή από YouTube ή Spotify με κανονική ουρά — skip, shuffle, loop, ένταση, now-playing. Η λειτουργία ραδιοφώνου κρατάει έναν σταθμό να παίζει μόνος του και ξαναμπαίνει στο κανάλι μετά από restart ή crash χωρίς να το αγγίξει κανείς.',
        },
      },
      {
        title: { en: 'Deleting past the 14-day wall', el: 'Σβήσιμο πέρα από τις 14 μέρες' },
        body: {
          en: 'Discord refuses to bulk-delete anything older than fourteen days. The clear command walks the history and removes it anyway, which is the difference between a usable cleanup tool and a toy.',
          el: 'Το Discord αρνείται να κάνει bulk delete σε ό,τι είναι παλιότερο από δεκατέσσερις μέρες. Η εντολή clear διατρέχει το ιστορικό και το σβήνει έτσι κι αλλιώς — αυτή είναι η διαφορά ανάμεσα σε χρήσιμο εργαλείο και σε παιχνιδάκι.',
        },
      },
      {
        title: { en: 'Transcripts and invite tracking', el: 'Transcripts και καταγραφή προσκλήσεων' },
        body: {
          en: 'Full channel transcripts including the attachments, plus a log of which invite brought each member in. Both are readable from the dashboard.',
          el: 'Πλήρη transcripts καναλιών μαζί με τα συνημμένα, συν καταγραφή του ποια πρόσκληση έφερε το κάθε μέλος. Και τα δύο διαβάζονται από το dashboard.',
        },
      },
      {
        title: { en: 'Optional AI, deliberately read-only', el: 'Προαιρετικό AI, σκόπιμα read-only' },
        body: {
          en: 'Drop in a Gemini key and the bot will hold a conversation in DMs. It is constrained by a schema and given read-only permissions on purpose: it can answer questions about the server, it cannot be talked into deleting anything.',
          el: 'Βάζεις ένα κλειδί Gemini και το bot κουβεντιάζει στα DM. Είναι περιορισμένο από schema και έχει read-only δικαιώματα επίτηδες: μπορεί να απαντήσει για τον server, δεν μπορεί να πειστεί να σβήσει τίποτα.',
        },
      },
      {
        title: { en: 'Live dashboard', el: 'Ζωντανό dashboard' },
        body: {
          en: 'Express, EJS and socket.io. Live stats, real-time control of the player, transcript previews and permission management — pushed over a socket rather than polled.',
          el: 'Express, EJS και socket.io. Ζωντανά στατιστικά, έλεγχος του player σε πραγματικό χρόνο, προεπισκόπηση transcripts και διαχείριση δικαιωμάτων — μέσω socket, όχι polling.',
        },
      },
      {
        title: { en: 'Per-user and per-role access', el: 'Πρόσβαση ανά χρήστη και ρόλο' },
        body: {
          en: 'Every command can be locked to specific users or roles from the dashboard, and revoking access takes effect mid-session rather than at the next restart. Commands a member cannot run are hidden from them instead of failing after the fact.',
          el: 'Κάθε εντολή κλειδώνεται σε συγκεκριμένους χρήστες ή ρόλους από το dashboard, και η ανάκληση πρόσβασης ισχύει άμεσα, όχι στο επόμενο restart. Όσες εντολές δεν μπορεί να τρέξει ένα μέλος δεν του εμφανίζονται καν, αντί να σκάνε αφού τις πατήσει.',
        },
      },
      {
        title: { en: 'It tests itself', el: 'Ελέγχει τον εαυτό του' },
        body: {
          en: 'Seventeen check scripts run against a shared harness — music, voice, DMs, transcripts, invites, permissions, command access, security and the AI layer — plus standalone diagnostics for the extractors, the emoji set and the YouTube session. `npm test` runs the lot before anything reaches a live server.',
          el: 'Δεκαεπτά check scripts τρέχουν πάνω σε κοινό harness — μουσική, φωνή, DM, transcripts, προσκλήσεις, δικαιώματα, πρόσβαση σε εντολές, ασφάλεια και το AI layer — συν ξεχωριστά διαγνωστικά για τους extractors, τα emoji και το YouTube session. Το `npm test` τα τρέχει όλα πριν φτάσει οτιδήποτε σε ζωντανό server.',
        },
      },
      {
        title: { en: 'One SQLite file', el: 'Ένα αρχείο SQLite' },
        body: {
          en: 'better-sqlite3 keeps state in a single local file with scheduled backups, so the bot and the dashboard read the same truth and moving the whole thing is a file copy.',
          el: 'Το better-sqlite3 κρατάει το state σε ένα τοπικό αρχείο με προγραμματισμένα backup, οπότε bot και dashboard διαβάζουν την ίδια αλήθεια και η μεταφορά του συνόλου είναι μια αντιγραφή αρχείου.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'A dependency that YouTube had already broken', el: 'Μια εξάρτηση που το YouTube είχε ήδη σπάσει' },
        body: {
          en: 'The YouTube extractor pins an older version of the client library, and YouTube now answers that protocol with HTTP 400 on every player and search call — so every single search silently returned zero results. The fix is an override in package.json forcing the newer library underneath it, with a comment explaining exactly why and when it can be removed. Nothing in the code was wrong; the internet moved underneath a transitive dependency.',
          el: 'Ο extractor του YouTube καρφώνει παλιότερη έκδοση της βιβλιοθήκης, και το YouTube πλέον απαντάει σε εκείνο το πρωτόκολλο με HTTP 400 σε κάθε κλήση player και search — οπότε κάθε αναζήτηση επέστρεφε σιωπηλά μηδέν αποτελέσματα. Η λύση είναι ένα override στο package.json που επιβάλλει τη νεότερη βιβλιοθήκη από κάτω, με σχόλιο που εξηγεί ακριβώς γιατί και πότε μπορεί να φύγει. Τίποτα στον κώδικα δεν ήταν λάθος· το ίντερνετ κουνήθηκε κάτω από μια transitive εξάρτηση.',
        },
      },
      {
        title: { en: 'Discord will not bulk delete old messages', el: 'Το Discord δεν σβήνει μαζικά παλιά μηνύματα' },
        body: {
          en: 'The bulk endpoint refuses anything older than fourteen days, which is exactly the backlog you actually want gone. Clearing a channel properly means falling back to deleting message by message, slowly enough not to be rate limited, while staying interruptible and reporting progress — because a wipe that cannot be stopped halfway is a wipe nobody will start.',
          el: 'Το bulk endpoint αρνείται ό,τι είναι παλιότερο από δεκατέσσερις μέρες, που είναι ακριβώς το backlog που θες να φύγει. Το σωστό καθάρισμα καναλιού σημαίνει πτώση σε διαγραφή μήνυμα προς μήνυμα, αρκετά αργά ώστε να μη φας rate limit, μένοντας διακόψιμο και αναφέροντας πρόοδο — επειδή ένα wipe που δεν σταματάει στη μέση είναι wipe που δεν θα ξεκινήσει κανείς.',
        },
      },
      {
        title: { en: 'Permissions the server owner can actually reason about', el: 'Δικαιώματα που καταλαβαίνει ο ιδιοκτήτης' },
        body: {
          en: 'Discord\'s own permission model does not map onto "who may run this one command". So each command carries a default, and the dashboard lets you override it per role or per raw user ID — with the rule that an empty list means the default applies, and one entry means only those people and the administrators. That sentence is written on the page itself, because a permission system nobody can explain is a permission system nobody will trust.',
          el: 'Το μοντέλο δικαιωμάτων του Discord δεν αντιστοιχεί στο «ποιος μπορεί να τρέξει αυτή τη μία εντολή». Οπότε κάθε εντολή έχει προεπιλογή, και το dashboard σε αφήνει να την παρακάμψεις ανά ρόλο ή ανά σκέτο user ID — με τον κανόνα ότι άδεια λίστα σημαίνει ότι ισχύει η προεπιλογή, και μία εγγραφή σημαίνει μόνο αυτοί και οι διαχειριστές. Αυτή η πρόταση είναι γραμμένη πάνω στη σελίδα, επειδή ένα σύστημα δικαιωμάτων που δεν εξηγείται είναι σύστημα που δεν θα εμπιστευτεί κανείς.',
        },
      },
      {
        title: { en: 'Fifteen checks instead of a test framework', el: 'Δεκαπέντε checks αντί για test framework' },
        body: {
          en: 'There is no Jest here. There are fifteen check files — one each for music, voice, permissions, command access, transcripts, invites, dates, DMs, security, the AI layer and YouTube auth — run by a small harness with `npm test`. They are closer to smoke tests than unit tests, and that is the point: they answer "will this bot actually start and behave" rather than "does this function return 4".',
          el: 'Δεν υπάρχει Jest εδώ. Υπάρχουν δεκαπέντε αρχεία check — ένα για μουσική, φωνή, δικαιώματα, πρόσβαση εντολών, transcripts, προσκλήσεις, ημερομηνίες, DM, ασφάλεια, το AI layer και το YouTube auth — που τρέχουν από ένα μικρό harness με `npm test`. Είναι πιο κοντά σε smoke tests παρά σε unit tests, και αυτό είναι το ζητούμενο: απαντούν στο «θα ξεκινήσει και θα συμπεριφερθεί σωστά αυτό το bot» αντί για το «επιστρέφει 4 αυτή η συνάρτηση».',
        },
      },
    ],
    lessons: {
      en: [
        'The best moderation automation comes from watching which real work repeats, not from guessing what administrators might want.',
        'A dashboard is only worth building once it shares one source of truth with the chat commands and the background jobs.',
        'Giving an AI layer read-only permissions is not a limitation. It is the only reason it was safe to add at all.',
      ],
      el: [
        'Το καλύτερο moderation automation προκύπτει από το να βλέπεις ποια πραγματική δουλειά επαναλαμβάνεται, όχι από μαντεψιά για το τι ίσως θέλουν οι administrators.',
        'Ένα dashboard αξίζει να φτιαχτεί μόνο όταν μοιράζεται μία πηγή αλήθειας με τα chat commands και τα background jobs.',
        'Το να δώσεις read-only δικαιώματα σε ένα AI layer δεν είναι περιορισμός. Είναι ο μόνος λόγος που ήταν ασφαλές να μπει.',
      ],
    },
  },

  {
    slug: 'betterdiscord-themes',
    name: 'BetterDiscord Themes & Plugins',
    category: 'discord',
    alsoIn: ['web'],
    status: 'legacy',
    accent: 'violet',
    year: '2018 — now',
    repo: `${GH}/1st-theme`,
    repoLabel: '1st-theme',
    tech: ['CSS', 'JavaScript', 'BetterDiscord', 'DevTools'],
    lab: {
      badge: { en: 'Where it started', el: 'Από εδώ ξεκίνησαν όλα' },
      note: {
        en: 'The first thing I ever built by hand. No AI, no tutorials that fit, just devtools and stubbornness.',
        el: 'Το πρώτο πράγμα που έφτιαξα με τα χέρια μου. Χωρίς AI, χωρίς tutorial που να ταιριάζει, μόνο devtools και πείσμα.',
      },
    },
    metrics: [
      { value: '4', label: { en: 'themes shipped', el: 'themes σε χρήση' } },
      { value: '6', label: { en: 'plugins written', el: 'plugins γραμμένα' } },
      { value: '511', label: { en: 'commits', el: 'commits' } },
      { value: '12K', label: { en: 'lines of CSS and JS', el: 'γραμμές CSS και JS' } },
    ],
    short: {
      en: 'Four themes and six plugins for BetterDiscord. The origin story — raw CSS, devtools and trial and error, years before I used any AI tooling.',
      el: 'Τέσσερα themes και έξι plugins για το BetterDiscord. Από εδώ ξεκίνησαν όλα — σκέτο CSS, devtools και δοκιμή-λάθος, χρόνια πριν αγγίξω AI εργαλείο.',
    },
    summary: {
      en: 'Simpletheme V3 and the V2 line it replaced, a folder theme generated from its own plugin, a community theme for a server I ran, and six plugins — FolderManager, NoPause, Timer, Safe Console, Prezomenoi and an all-in-one updater. This is the repository where I learned CSS by inspecting a live application I did not own and breaking it repeatedly.',
      el: 'Το Simpletheme V3 και η γραμμή V2 που αντικατέστησε, ένα folder theme παραγόμενο από το ίδιο του το plugin, ένα community theme για server που έτρεχα, και έξι plugins — FolderManager, NoPause, Timer, Safe Console, Prezomenoi και ένας all-in-one updater. Είναι το repository όπου έμαθα CSS κάνοντας inspect μια ζωντανή εφαρμογή που δεν μου ανήκε και σπάζοντάς την ξανά και ξανά.',
    },
    why: {
      en: 'Default Discord feels like a corporate spreadsheet with a dark mode filter. Fixing that was the first time building software felt like something I could actually do.',
      el: 'Το default Discord μοιάζει με εταιρικό spreadsheet που του έβαλαν φίλτρο dark mode. Το να το φτιάξω ήταν η πρώτη φορά που το να γράφω λογισμικό μου φάνηκε κάτι που μπορώ όντως να κάνω.',
    },
    what: {
      en: 'Four themes and six plugins loaded straight into the Discord client. The themes restyle the app through CSS alone; the plugins add behaviour the client does not have — folder customisation, stopping unwanted stream pauses, a clock with its own settings panel and quieter console logging. Their interfaces are in Greek, because the people using them were.',
      el: 'Τέσσερα themes και έξι plugins που φορτώνουν κατευθείαν μέσα στον Discord client. Τα themes αλλάζουν την εμφάνιση μόνο με CSS· τα plugins προσθέτουν συμπεριφορά που δεν έχει ο client — παραμετροποίηση φακέλων, σταμάτημα του ανεπιθύμητου pause σε stream, ρολόι με δικό του panel ρυθμίσεων και πιο ήσυχο console. Τα interface τους είναι στα ελληνικά, επειδή έτσι ήταν κι όσοι τα χρησιμοποιούσαν.',
    },
    sketch: {
      title: 'BetterDiscord — installed',
      kind: 'panel',
      rows: [
        { label: 'Simpletheme V3', value: 'active', hot: true },
        { label: 'Folder Theme', value: 'active' },
        { label: 'FolderManager', value: 'plugin' },
        { label: 'NoPause', value: 'plugin' },
        { label: 'Safe Console', value: 'plugin' },
        { label: 'Themes / plugins', value: '5 / 6' }
      ]
    },
    features: [
      {
        title: { en: 'Simpletheme V3', el: 'Simpletheme V3' },
        body: {
          en: 'The current generation — a rebuilt take on Discord styling. V2 stays in the repo as the previous stable line.',
          el: 'Η τρέχουσα γενιά — ξαναχτισμένη προσέγγιση στο styling του Discord. Το V2 μένει στο repo ως η προηγούμενη σταθερή γραμμή.',
        },
      },
      {
        title: { en: 'Folder Theme', el: 'Folder Theme' },
        body: {
          en: 'Folder categorisation and a cleaner sidebar, paired with the FolderManager plugin.',
          el: 'Κατηγοριοποίηση φακέλων και πιο καθαρό sidebar, μαζί με το plugin FolderManager.',
        },
      },
      {
        title: { en: 'Plugins', el: 'Plugins' },
        body: {
          en: 'FolderManager for folder customisation, NoPause for Quests to stop unwanted stream and audio pausing, Timer for a dark-styled clock with its own settings panel, and Safe Console for cleaner developer logging. Every one of them talks to you in Greek.',
          el: 'FolderManager για παραμετροποίηση φακέλων, NoPause for Quests για να σταματήσει το ανεπιθύμητο pause σε stream και ήχο, Timer για ρολόι με dark εμφάνιση και δικό του panel ρυθμίσεων, και Safe Console για πιο καθαρό developer logging. Και τα έξι σου μιλάνε ελληνικά.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Styling markup you cannot change', el: 'Styling σε markup που δεν αλλάζεις' },
        body: {
          en: 'A theme is CSS aimed at an application someone else builds, ships and rewrites without telling you. There is no markup to fix, no class you can rename, and every class name is machine-generated and can change on any update. You learn to target structure and relationships instead of names, because names are the one thing guaranteed not to survive.',
          el: 'Ένα theme είναι CSS που στοχεύει μια εφαρμογή που χτίζει, εκδίδει και ξαναγράφει κάποιος άλλος χωρίς να σου το πει. Δεν υπάρχει markup να διορθώσεις, ούτε class να μετονομάσεις, και κάθε όνομα class είναι παραγμένο από μηχανή και μπορεί να αλλάξει σε κάθε update. Μαθαίνεις να στοχεύεις δομή και σχέσεις αντί για ονόματα, επειδή τα ονόματα είναι το ένα πράγμα που σίγουρα δεν επιβιώνει.',
        },
      },
      {
        title: { en: 'The update that breaks everything', el: 'Το update που τα σπάει όλα' },
        body: {
          en: 'Every Discord release is a potential total break, and there is no warning and no changelog for the internals. That is why V2 is still in the repository at 3,246 lines, and why the previous working V3 sits beside the current one under a name that says OLD_WORKING. Keeping the last version that definitely worked is not untidiness — it is the only rollback available when the thing you are styling updates itself underneath you.',
          el: 'Κάθε έκδοση του Discord είναι πιθανό ολικό σπάσιμο, χωρίς προειδοποίηση και χωρίς changelog για τα εσωτερικά. Γι᾽ αυτό το V2 είναι ακόμα στο repository με 3.246 γραμμές, και γι᾽ αυτό το προηγούμενο V3 που δούλευε κάθεται δίπλα στο τρέχον με όνομα που λέει OLD_WORKING. Το να κρατάς την τελευταία έκδοση που σίγουρα δούλευε δεν είναι ακαταστασία — είναι το μόνο rollback που έχεις όταν αυτό που στυλάρεις ενημερώνεται από μόνο του από κάτω σου.',
        },
      },
      {
        title: { en: 'Generating the theme from the plugin', el: 'Το theme παράγεται από το plugin' },
        body: {
          en: 'FolderManager is 1,425 lines and the largest thing in the repository. It got big enough that hand-writing a matching stylesheet stopped making sense, so the folder theme is emitted from the plugin instead — its own header says it is auto-generated. That was the first time I built a tool to write my code rather than writing it twice.',
          el: 'Το FolderManager είναι 1.425 γραμμές και το μεγαλύτερο πράγμα στο repository. Μεγάλωσε τόσο που το να γράφω στο χέρι ένα stylesheet που να ταιριάζει έπαψε να βγάζει νόημα, οπότε το folder theme παράγεται από το plugin — το ίδιο του το header το λέει auto-generated. Ήταν η πρώτη φορά που έφτιαξα εργαλείο να γράφει τον κώδικά μου αντί να τον γράφω δύο φορές.',
        },
      },
      {
        title: { en: 'The repository is the update server', el: 'Το repository είναι ο update server' },
        body: {
          en: 'There is no package registry for BetterDiscord plugins, so four of the six ship their own updater: a panel with one button that fetches the current file straight from this repository’s main branch, compares versions and reports back. No infrastructure, no release process, no account — the raw file on GitHub is the distribution channel. Every one of those panels is written in Greek, because the people installing them were on a Greek server.',
          el: 'Δεν υπάρχει package registry για BetterDiscord plugins, οπότε τέσσερα από τα έξι κουβαλάνε δικό τους updater: ένα panel με ένα κουμπί που τραβάει το τρέχον αρχείο κατευθείαν από το main branch αυτού του repository, συγκρίνει εκδόσεις και απαντάει. Καμία υποδομή, καμία διαδικασία release, κανένας λογαριασμός — το raw αρχείο στο GitHub είναι το κανάλι διανομής. Κάθε ένα από αυτά τα panel είναι γραμμένο στα ελληνικά, επειδή όσοι τα εγκαθιστούσαν ήταν σε ελληνικό server.',
        },
      },
      {
        title: { en: 'Five of the six are parked', el: 'Τα πέντε από τα έξι είναι παρκαρισμένα' },
        body: {
          en: 'Only NoPause carries a proper BetterDiscord metadata header. The other five plugin files are prefixed with a dot, which is how they sit in the folder without loading — parked rather than deleted, because half of them still work and I have not decided which ones are worth bringing back. The repository is honest about being a workshop rather than a product shelf.',
          el: 'Μόνο το NoPause έχει κανονικό BetterDiscord metadata header. Τα άλλα πέντε αρχεία plugin ξεκινούν με τελεία, κι έτσι κάθονται στον φάκελο χωρίς να φορτώνουν — παρκαρισμένα αντί για διαγραμμένα, επειδή τα μισά ακόμα δουλεύουν και δεν έχω αποφασίσει ποια αξίζει να επιστρέψουν. Το repository είναι ειλικρινές ότι είναι εργαστήριο και όχι ράφι προϊόντων.',
        },
      },
    ],
    lessons: {
      en: [
        'Reading someone else\'s live DOM in devtools taught me more CSS than any course would have.',
        'Everything I know about UI polish started here, on a product I did not own and could not change the markup of.',
        'Keep the last version that worked. When the thing underneath you updates without warning, the backup file with the embarrassing name is the only rollback you have.',
        'When a stylesheet and a plugin have to agree, generate one from the other. Writing the same structure twice is how the two of them drift apart.',
      ],
      el: [
        'Το να διαβάζω ζωντανό DOM κάποιου άλλου στα devtools μου έμαθε περισσότερο CSS από οποιοδήποτε μάθημα.',
        'Ό,τι ξέρω για UI polish ξεκίνησε εδώ, σε ένα προϊόν που δεν μου ανήκε και του οποίου δεν μπορούσα να αλλάξω το markup.',
        'Κράτα την τελευταία έκδοση που δούλευε. Όταν αυτό που πατάς ενημερώνεται χωρίς προειδοποίηση, το backup αρχείο με το ντροπιαστικό όνομα είναι το μόνο rollback που έχεις.',
        'Όταν ένα stylesheet και ένα plugin πρέπει να συμφωνούν, παρήγαγε το ένα από το άλλο. Το να γράφεις την ίδια δομή δύο φορές είναι ο τρόπος με τον οποίο αποκλίνουν.',
      ],
    },
    disclaimer: {
      en: 'Not affiliated with Discord or BetterDiscord.',
      el: 'Χωρίς σχέση με το Discord ή το BetterDiscord.',
    },
  },
]
