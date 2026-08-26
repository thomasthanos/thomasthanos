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
      { value: '3', label: { en: 'click types', el: 'τύποι click' } },
      { value: '1', label: { en: 'persistent runspace', el: 'μόνιμο runspace' } },
      { value: '0', label: { en: 'per-click processes', el: 'processes ανά click' } },
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
        { label: 'Hotkeys', value: 'F6 start · F7 stop' },
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
        title: { en: 'Global hotkeys', el: 'Global hotkeys' },
        body: {
          en: 'Starts and stops from the keyboard even while another application owns the foreground focus.',
          el: 'Ξεκινάει και σταματάει από το πληκτρολόγιο ακόμη κι όταν άλλη εφαρμογή έχει το foreground focus.',
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
          en: 'A clicker that can keep running behind other windows needs an obvious global stop path, not a button hidden in its own UI.',
          el: 'Ένα clicker που συνεχίζει πίσω από άλλα παράθυρα χρειάζεται ξεκάθαρο global stop, όχι κουμπί κρυμμένο στο δικό του UI.',
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
          en: '5,000 of the 10,627 lines here are CSS, and 1,629 of those are the create-release screen alone. For a tool with three buttons and a text field that is either indefensible or exactly the point, depending on how you feel about tools you use every week. I lean towards the second.',
          el: '5.000 από τις 10.627 γραμμές εδώ είναι CSS, και οι 1.629 μόνο η οθόνη δημιουργίας release. Για ένα εργαλείο με τρία κουμπιά και ένα πεδίο κειμένου, αυτό είναι είτε αδικαιολόγητο είτε ακριβώς το ζητούμενο, ανάλογα με το πώς νιώθεις για εργαλεία που χρησιμοποιείς κάθε βδομάδα. Κλίνω προς το δεύτερο.',
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
    tech: ['Electron', 'Node.js', 'Dropbox API', 'diff2html'],
    lab: {
      badge: { en: 'Built out of fear', el: 'Φτιαγμένο από φόβο' },
      note: {
        en: 'Written the week after I nearly lost three weeks of uncommitted work.',
        el: 'Γραμμένο την εβδομάδα μετά που παραλίγο να χάσω τρεις εβδομάδες uncommitted δουλειάς.',
      },
    },
    metrics: [
      { value: '1-click', label: { en: 'restore', el: 'επαναφορά' } },
      { value: 'AUTO', label: { en: 'scheduled backups', el: 'προγραμματισμένα backups' } },
      { value: '0', label: { en: 'node_modules', el: 'node_modules' } },
    ],
    short: {
      en: 'Compresses your project folders and syncs them to Dropbox on a schedule, aggressively ignoring node_modules. One-click restore.',
      el: 'Ζιπάρει τους φακέλους των projects σου και τους πετάει στο Dropbox προγραμματισμένα, αγνοώντας επιθετικά το node_modules. Επαναφορά με ένα κλικ.',
    },
    summary: {
      en: 'Backup for the gap between commits. It zips selected project folders, skips the junk, pushes them to Dropbox, and syncs its own `projects.json` config across machines so the same set is protected everywhere.',
      el: 'Backup για το κενό ανάμεσα στα commits. Κάνει zip επιλεγμένους φακέλους, παρακάμπτει τα σκουπίδια, τους στέλνει στο Dropbox, και συγχρονίζει και το δικό του `projects.json` config ανάμεσα σε μηχανήματα ώστε να προστατεύεται το ίδιο σετ παντού.',
    },
    why: {
      en: 'Git protects committed work. Nothing protects the three days you have not committed yet, which is exactly the window in which SSDs like to die.',
      el: 'Το Git προστατεύει ό,τι έχεις κάνει commit. Τίποτα δεν προστατεύει τις τρεις μέρες που δεν έχεις κάνει ακόμα commit — και ακριβώς εκεί μέσα αρέσει στους SSD να πεθαίνουν.',
    },
    what: {
      en: 'Keeps a list of the project folders worth protecting, zips them on a schedule while skipping the junk, and pushes the archives to Dropbox. It can show you the diff between two backups before you restore, and the restore itself is one click.',
      el: 'Κρατάει λίστα με τους φακέλους που αξίζει να προστατευτούν, τους ζιπάρει προγραμματισμένα παρακάμπτοντας τα σκουπίδια, και στέλνει τα αρχεία στο Dropbox. Μπορεί να σου δείξει το diff ανάμεσα σε δύο backup πριν κάνεις restore, και το restore είναι ένα κλικ.',
    },
    sketch: {
      title: 'Backup Studio',
      kind: 'panel',
      rows: [
        { label: 'Projects tracked', value: '9', hot: true },
        { label: 'Excluded', value: 'node_modules, dist' },
        { label: 'Archiving', bar: 55 },
        { label: 'Target', value: 'Dropbox' },
        { label: 'Diff vs previous', value: '34 files changed' },
        { label: 'Restore', value: 'one click' }
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
        title: { en: 'Dropbox sync', el: 'Dropbox sync' },
        body: {
          en: 'Uploads the archives and synchronises projects.json so the same backup list follows you between PCs.',
          el: 'Ανεβάζει τα archives και συγχρονίζει το projects.json ώστε η ίδια λίστα backup να σε ακολουθεί ανάμεσα στα PCs.',
        },
      },
      {
        title: { en: 'One-click restore', el: 'Επαναφορά με ένα click' },
        body: {
          en: 'Brings a selected archive back without making recovery a second manual file-management project.',
          el: 'Επαναφέρει επιλεγμένο archive χωρίς να μετατρέπει το recovery σε δεύτερο χειροκίνητο project διαχείρισης αρχείων.',
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
          en: 'Backing up projects is only half the problem; the application also has to remember which projects belong in the set on another PC.',
          el: 'Το backup των projects είναι μόνο το μισό πρόβλημα· η εφαρμογή πρέπει επίσης να θυμάται ποια projects ανήκουν στο σετ σε άλλο PC.',
        },
      },
    ],
    privacy: {
      en: 'Selected project archives and the projects.json configuration are uploaded to the user’s connected Dropbox account. Rebuildable dependency folders are deliberately excluded.',
      el: 'Τα επιλεγμένα project archives και το projects.json configuration ανεβαίνουν στον συνδεδεμένο Dropbox λογαριασμό του χρήστη. Τα rebuildable dependency folders εξαιρούνται σκόπιμα.',
    },
    impact: {
      en: 'It protects the work that exists after the last commit but before the next one — the exact window normal Git history cannot recover.',
      el: 'Προστατεύει τη δουλειά που υπάρχει μετά το τελευταίο commit αλλά πριν από το επόμενο — ακριβώς το παράθυρο που δεν μπορεί να επαναφέρει το κανονικό Git history.',
    },
    lessons: {
      en: [
        'A backup people actually run is better than a theoretically perfect backup with too much setup.',
        'Recovery deserves the same product attention as upload; an archive is not useful if restoring it is painful.',
      ],
      el: [
        'Ένα backup που οι άνθρωποι πράγματι τρέχουν είναι καλύτερο από ένα θεωρητικά τέλειο backup με υπερβολικό setup.',
        'Το recovery αξίζει την ίδια προσοχή με το upload· ένα archive δεν είναι χρήσιμο αν η επαναφορά του είναι βασανιστική.',
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
      { value: '17K', label: { en: 'lines across 98 modules', el: 'γραμμές σε 98 modules' } },
      { value: '24/7', label: { en: 'radio, self-reconnecting', el: 'ραδιόφωνο που επανασυνδέεται' } },
    ],
    short: {
      en: 'Music, 24/7 radio, deep-delete moderation and full transcripts, driven from a live web dashboard instead of a wall of chat commands.',
      el: 'Μουσική, ραδιόφωνο 24/7, deep-delete moderation και πλήρη transcripts, από ζωντανό web dashboard αντί για τοίχο από chat εντολές.',
    },
    summary: {
      en: 'Twenty-one slash commands over a discord.js v14 bot: a full music queue from YouTube or Spotify, a 24/7 radio mode that reconnects itself after a reboot or a crash, moderation that can delete past Discord\'s fourteen-day bulk limit, channel transcripts with their attachments, and invite tracking. All of it is also driveable from an Express + socket.io dashboard that shows live stats and controls the player in real time.',
      el: 'Είκοσι ένα slash commands πάνω σε bot με discord.js v14: πλήρης ουρά μουσικής από YouTube ή Spotify, λειτουργία ραδιοφώνου 24/7 που επανασυνδέεται μόνη της μετά από reboot ή crash, moderation που σβήνει και πέρα από το όριο των δεκατεσσάρων ημερών του Discord, transcripts καναλιών μαζί με τα συνημμένα, και καταγραφή προσκλήσεων. Όλα δουλεύουν και από dashboard σε Express + socket.io που δείχνει ζωντανά στατιστικά και ελέγχει τον player σε πραγματικό χρόνο.',
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
        { label: 'Checks passing', bar: 100, value: '17 / 17' }
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
