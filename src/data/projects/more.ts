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
    tech: ['JavaScript', 'Manifest V3'],
    lab: {
      badge: { en: 'Surprisingly stable', el: 'Απρόσμενα σταθερό' },
      note: {
        en: 'Two keys. Three years of not needing to touch it.',
        el: 'Δύο πλήκτρα. Τρία χρόνια χωρίς να χρειαστεί να το πειράξω.',
      },
    },
    metrics: [
      { value: '2', label: { en: 'hotkeys', el: 'hotkeys' } },
      { value: '5', label: { en: 'boost speeds', el: 'ταχύτητες boost' } },
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
    ],
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
      ],
      el: [
        'Ένα μικρό εργαλείο μοιάζει ολοκληρωμένο όταν θυμάται την προτιμώμενη κατάσταση του χρήστη, όχι όταν αποκτά άλλη μία οθόνη.',
        'Το media μέσα σε iframe χρειάζεται content script δηλωμένο για όλα τα frames, όχι μόνο για το κεντρικό document.',
      ],
    },
  },

  {
    slug: 'auto-liker',
    name: 'Auto Liker for Tinder & Boo',
    category: 'browser',
    alsoIn: ['automation'],
    status: 'maintained',
    accent: 'pink',
    year: '2026',
    version: '4.8',
    repo: `${GH}/auto-liker-for-tinder-and-boo`,
    repoLabel: 'auto-liker-for-tinder-and-boo',
    tech: ['JavaScript', 'Manifest V3', 'i18n'],
    lab: {
      badge: { en: 'Questionable idea', el: 'Αμφίβολη ιδέα' },
      note: {
        en: 'It works. Whether it should is between you and your conscience.',
        el: 'Δουλεύει. Το αν πρέπει είναι μεταξύ εσού και της συνείδησής σου.',
      },
    },
    metrics: [
      { value: '2', label: { en: 'platforms', el: 'πλατφόρμες' } },
      { value: '3', label: { en: 'languages', el: 'γλώσσες' } },
      { value: '1', label: { en: 'permission', el: 'permission' } },
    ],
    short: {
      en: 'A neon on-page button that likes for you, with a live counter, a progress ring and a smart pause.',
      el: 'Ένα neon κουμπί μέσα στη σελίδα που κάνει like για σένα, με live μετρητή, progress ring και έξυπνη παύση.',
    },
    summary: {
      en: 'An on-page control that automates the swipe loop on Tinder and Boo, with a live counter, a progress ring and a pause that backs off when the site stops responding the way it should.',
      el: 'Ένα control μέσα στη σελίδα που αυτοματοποιεί το swipe loop σε Tinder και Boo, με live μετρητή, progress ring και παύση που υποχωρεί όταν το site σταματάει να απαντάει σωστά.',
    },
    why: {
      en: 'Built as an exercise in doing DOM automation politely — pacing itself, stopping when the page shape changes, and never asking for a permission it does not need. It requests `activeTab` and nothing else.',
      el: 'Φτιάχτηκε ως άσκηση στο να κάνεις DOM automation ευγενικά — να ρυθμίζει ρυθμό, να σταματάει όταν αλλάζει η δομή της σελίδας, και να μη ζητάει permission που δεν χρειάζεται. Ζητάει `activeTab` και τίποτα άλλο.',
    },
    disclaimer: {
      en: 'Not affiliated with Tinder or Boo.',
      el: 'Χωρίς σχέση με Tinder ή Boo.',
    },
    what: {
      en: 'Adds one control to the page: a neon button that runs the swipe loop for you, with a live count of what it has done, a progress ring, and a pause that backs off on its own when the page stops behaving the way it expects.',
      el: 'Προσθέτει ένα control στη σελίδα: ένα neon κουμπί που τρέχει το swipe loop για σένα, με ζωντανό μετρητή, progress ring, και παύση που υποχωρεί μόνη της όταν η σελίδα σταματήσει να συμπεριφέρεται όπως περιμένει.',
    },
    sketch: {
      title: 'Auto Liker — on-page control',
      kind: 'browser',
      rows: [
        { label: 'Session count', value: '128', hot: true },
        { label: 'Progress', bar: 64 },
        { label: 'Smart pause', value: 'armed' },
        { label: 'Platforms', value: 'Tinder · Boo' },
        { label: 'Languages', value: '3' },
        { label: 'Permissions', value: 'activeTab only' }
      ]
    },
    features: [
      {
        title: { en: 'One-tap automation', el: 'Automation με ένα tap' },
        body: {
          en: 'A floating control starts and stops the loop on Tinder and Boo, while the popup mirrors its live state.',
          el: 'Ένα floating control ξεκινάει και σταματάει το loop σε Tinder και Boo, ενώ το popup δείχνει ζωντανά την κατάστασή του.',
        },
      },
      {
        title: { en: 'Counter + progress ring', el: 'Μετρητής + progress ring' },
        body: {
          en: 'Counts successful likes during the current session and fills a progress ring every 100 actions.',
          el: 'Μετράει τα επιτυχημένα likes του τρέχοντος session και γεμίζει ένα progress ring κάθε 100 ενέργειες.',
        },
      },
      {
        title: { en: 'Smart pause', el: 'Έξυπνη παύση' },
        body: {
          en: 'Stops after four consecutive failures, waits through loading states and dismisses match overlays before continuing.',
          el: 'Σταματάει μετά από τέσσερις συνεχόμενες αποτυχίες, περιμένει τα loading states και κλείνει τα match overlays πριν συνεχίσει.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Moving DOM targets', el: 'DOM που αλλάζει' },
        body: {
          en: 'Both sites change their markup regularly, so selectors have to fail safely instead of clicking whatever happens to occupy the same position.',
          el: 'Και τα δύο sites αλλάζουν συχνά το markup τους, οπότε οι selectors πρέπει να αποτυγχάνουν με ασφάλεια αντί να πατούν ό,τι βρεθεί στην ίδια θέση.',
        },
      },
      {
        title: { en: 'Knowing when to stop', el: 'Να ξέρει πότε να σταματήσει' },
        body: {
          en: 'Daily limits, overlays and navigation can all look like a broken button. The failure counter turns those ambiguous states into a deliberate pause.',
          el: 'Daily limits, overlays και navigation μπορούν όλα να μοιάζουν με χαλασμένο κουμπί. Ο failure counter μετατρέπει αυτές τις ασαφείς καταστάσεις σε ελεγχόμενη παύση.',
        },
      },
    ],
    privacy: {
      en: 'Nothing is stored or sent anywhere. The session counter lives only in memory, and the extension asks for activeTab plus access to Tinder and Boo — no tabs list, history, storage, analytics or all-sites access.',
      el: 'Τίποτα δεν αποθηκεύεται ή στέλνεται αλλού. Ο session counter μένει μόνο στη μνήμη και το extension ζητά activeTab μαζί με πρόσβαση σε Tinder και Boo — χωρίς λίστα tabs, ιστορικό, storage, analytics ή πρόσβαση σε όλα τα sites.',
    },
    lessons: {
      en: [
        'DOM automation needs pacing, loading awareness and a clear stop condition more than it needs raw speed.',
        'The smallest permission set makes a questionable automation idea much easier to inspect and understand.',
      ],
      el: [
        'Το DOM automation χρειάζεται ρυθμό, επίγνωση του loading και καθαρή συνθήκη τερματισμού περισσότερο από ωμή ταχύτητα.',
        'Το μικρότερο δυνατό permission set κάνει μια αμφίβολη ιδέα automation πολύ πιο εύκολη στον έλεγχο και την κατανόηση.',
      ],
    },
  },

  {
    slug: 'extensions-showcase',
    name: 'Extensions Showcase',
    category: 'web',
    status: 'maintained',
    accent: 'lime',
    year: '2026',
    repo: `${GH}/nexusmods-bypass/tree/727b706`,
    repoLabel: 'historical multi-extension showcase',
    tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare'],
    lab: {
      badge: { en: 'Ships itself', el: 'Ανεβαίνει μόνο του' },
      note: {
        en: 'The install page for four extensions, at the root of their own repo.',
        el: 'Η σελίδα εγκατάστασης τεσσάρων extensions, στη ρίζα του δικού τους repo.',
      },
    },
    metrics: [
      { value: '4', label: { en: 'extensions', el: 'extensions' } },
      { value: '~30s', label: { en: 'to install', el: 'για εγκατάσταση' } },
      { value: '0', label: { en: 'analytics SDKs', el: 'analytics SDKs' } },
    ],
    short: {
      en: 'The landing and install page for all four browser extensions, served from the root of the repository that contains them.',
      el: 'Η σελίδα εγκατάστασης και για τα τέσσερα extensions, στη ρίζα του ίδιου repository που τα φιλοξενεί.',
    },
    summary: {
      en: 'A single-page showcase that explains what each extension does, how to load it unpacked, and what permissions it asks for — sitting at the root of the same repository as the source, so the page and the code can never drift apart.',
      el: 'Ένα single-page showcase που εξηγεί τι κάνει κάθε extension, πώς το φορτώνεις unpacked, και τι permissions ζητάει — στη ρίζα του ίδιου repository με τον κώδικα, ώστε σελίδα και κώδικας να μην ξεκολλήσουν ποτέ.',
    },
    why: {
      en: 'None of the four are on the Chrome Web Store, so the repository had to do the job a store listing normally does: explain, reassure, and get someone to a working install in about thirty seconds.',
      el: 'Κανένα από τα τέσσερα δεν είναι στο Chrome Web Store, οπότε το repository έπρεπε να κάνει τη δουλειά που κάνει κανονικά ένα store listing: να εξηγήσει, να καθησυχάσει, και να φέρει κάποιον σε λειτουργική εγκατάσταση σε τριάντα δευτερόλεπτα.',
    },
    what: {
      en: 'One page that does the job a store listing normally would: what each of the four extensions is for, the permissions it asks for and why, and the thirty-second path to a working unpacked install.',
      el: 'Μία σελίδα που κάνει τη δουλειά που θα έκανε ένα store listing: τι κάνει καθένα από τα τέσσερα extensions, τι permissions ζητάει και γιατί, και η διαδρομή τριάντα δευτερολέπτων μέχρι να δουλέψει unpacked.',
    },
    sketch: {
      title: 'historical multi-extension showcase',
      kind: 'browser',
      rows: [
        { label: 'NexusMods Bypass', value: 'Chrome · Firefox', hot: true },
        { label: 'An1me.to Tracker', value: 'v7.3.3' },
        { label: 'Auto Liker', value: 'v4.8' },
        { label: 'Speed Control', value: 'v3.5' },
        { label: 'Install time', value: '~30s, unpacked' },
        { label: 'Analytics', value: 'none' }
      ]
    },
    features: [
      {
        title: { en: 'Four products, one home', el: 'Τέσσερα προϊόντα, ένα σπίτι' },
        body: {
          en: 'Presents An1me Tracker, NexusMods Bypass, Auto Liker and Speed Control from the same repository that contains their source.',
          el: 'Παρουσιάζει τα An1me Tracker, NexusMods Bypass, Auto Liker και Speed Control από το ίδιο repository που περιέχει τον κώδικά τους.',
        },
      },
      {
        title: { en: 'Install walkthrough', el: 'Οδηγός εγκατάστασης' },
        body: {
          en: 'Explains the unpacked-extension flow for Chrome-family browsers and Edge, including the easy-to-miss subfolder selection.',
          el: 'Εξηγεί τη διαδικασία unpacked extension για Chrome-family browsers και Edge, μαζί με την εύκολα χαμένη επιλογή του σωστού subfolder.',
        },
      },
      {
        title: { en: 'Permission context', el: 'Εξήγηση permissions' },
        body: {
          en: 'Each product is linked to readable source, a full feature list and a permission explanation before anyone installs it.',
          el: 'Κάθε προϊόν συνδέεται με αναγνώσιμο source, πλήρη λίστα λειτουργιών και εξήγηση permissions πριν το εγκαταστήσει κάποιος.',
        },
      },
    ],
    privacy: {
      en: 'The showcase itself has no analytics SDK. It also makes the privacy model of the four extensions explicit: three are fully local, while Tracker syncs only a signed-in user’s private library document.',
      el: 'Το ίδιο το showcase δεν έχει analytics SDK. Κάνει επίσης ξεκάθαρο το privacy model των τεσσάρων extensions: τα τρία είναι πλήρως τοπικά, ενώ το Tracker συγχρονίζει μόνο το ιδιωτικό library document του συνδεδεμένου χρήστη.',
    },
    impact: {
      en: 'One page now handles discovery, trust and installation for four source-available extensions without relying on a browser-store listing.',
      el: 'Μία σελίδα καλύπτει πλέον discovery, εμπιστοσύνη και εγκατάσταση για τέσσερα source-available extensions χωρίς browser-store listing.',
    },
    lessons: {
      en: [
        'When distribution is manual, installation instructions are part of the product rather than optional documentation.',
        'Keeping the showcase beside the source reduces the chance that marketing copy and actual permissions drift apart.',
      ],
      el: [
        'Όταν η διανομή είναι χειροκίνητη, οι οδηγίες εγκατάστασης είναι μέρος του προϊόντος και όχι προαιρετικό documentation.',
        'Το showcase δίπλα στον κώδικα μειώνει την πιθανότητα να ξεφύγουν μεταξύ τους το marketing copy και τα πραγματικά permissions.',
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
    tech: ['Electron', 'React', 'Vite', 'GitHub API', 'DeepSeek'],
    lab: {
      badge: { en: 'Side quest', el: 'Side quest' },
      note: {
        en: 'A release tool, built to avoid the release process. The irony is noted.',
        el: 'Εργαλείο για releases, φτιαγμένο για να αποφύγω τη διαδικασία των releases. Το είδα κι εγώ το αστείο.',
      },
    },
    metrics: [
      { value: '3', label: { en: 'automated stages', el: 'αυτόματα στάδια' } },
      { value: '1', label: { en: 'release workflow', el: 'release workflow' } },
      { value: '0', label: { en: 'browser hopping', el: 'αλλαγές browser' } },
    ],
    short: {
      en: 'Picks a commit range, generates release notes from the diff with an LLM, runs electron-builder and pushes the release straight to GitHub.',
      el: 'Διαλέγεις commit range, ένα LLM διαβάζει το diff και γράφει τα release notes, τρέχει το electron-builder και ανεβαίνει το release στο GitHub. Εσύ πίνεις καφέ.',
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
      en: 'Pick a commit range, let DeepSeek read the diff and draft the notes, kick off the electron-builder run, watch the log stream in the window, then push the tag and upload the artefacts to a GitHub Release. Past releases stay listed so you can see what shipped when.',
      el: 'Διαλέγεις commit range, αφήνεις το DeepSeek να διαβάσει το diff και να γράψει τις σημειώσεις, ξεκινάς το electron-builder, βλέπεις τα logs να τρέχουν μέσα στο παράθυρο, και μετά ανεβαίνει το tag και τα artefacts σε GitHub Release. Τα παλιά releases μένουν στη λίστα για να βλέπεις τι βγήκε πότε.',
    },
    sketch: {
      title: 'GitHub Release Manager',
      kind: 'panel',
      rows: [
        { label: 'Commit range', value: 'v3.7.0 … HEAD', hot: true },
        { label: 'Notes', value: 'deepseek-v4-flash' },
        { label: 'Build', bar: 71, value: 'electron-builder' },
        { label: 'Artefacts', value: '2 queued' },
        { label: 'Upload', value: 'GitHub Releases' },
        { label: 'History', value: '18 releases' }
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
          en: 'The model has to receive a bounded commit diff and return editable notes, not invent a release from a vague project description.',
          el: 'Το model πρέπει να παίρνει περιορισμένο commit diff και να επιστρέφει επεξεργάσιμες σημειώσεις, όχι να επινοεί release από μια αόριστη περιγραφή project.',
        },
      },
    ],
    privacy: {
      en: 'This tool is intentionally not offline: selected diff content is sent to the configured DeepSeek model, while release metadata and build artefacts are sent to GitHub.',
      el: 'Αυτό το εργαλείο σκόπιμα δεν είναι offline: το επιλεγμένο diff στέλνεται στο ρυθμισμένο DeepSeek model, ενώ τα release metadata και build artefacts στέλνονται στο GitHub.',
    },
    impact: {
      en: 'Commit selection, note drafting, packaging and publishing live in one repeatable flow instead of four disconnected tools.',
      el: 'Commit selection, σύνταξη σημειώσεων, packaging και publishing βρίσκονται σε ένα επαναλήψιμο flow αντί για τέσσερα ασύνδετα εργαλεία.',
    },
    lessons: {
      en: [
        'AI is most useful in a release tool when it is grounded in an explicit diff and its output stays editable.',
        'A multi-stage automation needs honest logs just as much as it needs a one-click start button.',
      ],
      el: [
        'Το AI είναι πιο χρήσιμο σε release tool όταν βασίζεται σε συγκεκριμένο diff και το output του παραμένει επεξεργάσιμο.',
        'Ένα multi-stage automation χρειάζεται ειλικρινή logs όσο χρειάζεται και κουμπί εκκίνησης με ένα click.',
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
    year: '2023 — now',
    repo: `${GH}/1st-theme`,
    repoLabel: '1st-theme',
    tech: ['CSS', 'JavaScript', 'BetterDiscord'],
    lab: {
      badge: { en: 'Where it started', el: 'Από εδώ ξεκίνησαν όλα' },
      note: {
        en: 'The first thing I ever built by hand. No AI, no tutorials that fit, just devtools and stubbornness.',
        el: 'Το πρώτο πράγμα που έφτιαξα με τα χέρια μου. Χωρίς AI, χωρίς tutorial που να ταιριάζει, μόνο devtools και πείσμα.',
      },
    },
    metrics: [
      { value: '5', label: { en: 'themes', el: 'themes' } },
      { value: '6', label: { en: 'plugins', el: 'plugins' } },
      { value: '500+', label: { en: 'commits', el: 'commits' } },
    ],
    short: {
      en: 'Five themes and six plugins for BetterDiscord. The origin story — raw CSS, devtools and trial and error, years before I used any AI tooling.',
      el: 'Πέντε themes και έξι plugins για το BetterDiscord. Από εδώ ξεκίνησαν όλα — σκέτο CSS, devtools και δοκιμή-λάθος, χρόνια πριν αγγίξω AI εργαλείο.',
    },
    summary: {
      en: 'Simpletheme V3 and V2, a folder theme, a community theme, and six plugins — FolderManager, NoPause, Timer, Safe Console, Prezomenoi and an all-in-one updater. This is the repository where I learned CSS by inspecting a live application and breaking it repeatedly.',
      el: 'Simpletheme V3 και V2, ένα folder theme, ένα community theme, και έξι plugins — FolderManager, NoPause, Timer, Safe Console, Prezomenoi και ένας all-in-one updater. Είναι το repository όπου έμαθα CSS κάνοντας inspect μια ζωντανή εφαρμογή και σπάζοντάς την ξανά και ξανά.',
    },
    why: {
      en: 'Default Discord feels like a corporate spreadsheet with a dark mode filter. Fixing that was the first time building software felt like something I could actually do.',
      el: 'Το default Discord μοιάζει με εταιρικό spreadsheet που του έβαλαν φίλτρο dark mode. Το να το φτιάξω ήταν η πρώτη φορά που το να γράφω λογισμικό μου φάνηκε κάτι που μπορώ όντως να κάνω.',
    },
    what: {
      en: 'Five themes and six plugins loaded straight into the Discord client. The themes restyle the app through CSS alone; the plugins add behaviour the client does not have — folder customisation, stopping unwanted stream pauses, an activity timer and quieter console logging.',
      el: 'Πέντε themes και έξι plugins που φορτώνουν κατευθείαν μέσα στον Discord client. Τα themes αλλάζουν την εμφάνιση μόνο με CSS· τα plugins προσθέτουν συμπεριφορά που δεν έχει ο client — παραμετροποίηση φακέλων, σταμάτημα του ανεπιθύμητου pause σε stream, χρονόμετρο δραστηριότητας και πιο ήσυχο console.',
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
          en: 'FolderManager for folder customisation, NoPause to stop unwanted stream and audio pausing, Timer for an embedded activity timer, and Safe Console for cleaner developer logging.',
          el: 'FolderManager για παραμετροποίηση φακέλων, NoPause για να σταματήσει το ανεπιθύμητο pause σε stream και ήχο, Timer για ενσωματωμένο χρονόμετρο δραστηριότητας, και Safe Console για πιο καθαρό developer logging.',
        },
      },
    ],
    lessons: {
      en: [
        'Reading someone else\'s live DOM in devtools taught me more CSS than any course would have.',
        'Everything I know about UI polish started here, on a product I did not own and could not change the markup of.',
      ],
      el: [
        'Το να διαβάζω ζωντανό DOM κάποιου άλλου στα devtools μου έμαθε περισσότερο CSS από οποιοδήποτε μάθημα.',
        'Ό,τι ξέρω για UI polish ξεκίνησε εδώ, σε ένα προϊόν που δεν μου ανήκε και του οποίου δεν μπορούσα να αλλάξω το markup.',
      ],
    },
    disclaimer: {
      en: 'Not affiliated with Discord or BetterDiscord.',
      el: 'Χωρίς σχέση με το Discord ή το BetterDiscord.',
    },
  },
]
