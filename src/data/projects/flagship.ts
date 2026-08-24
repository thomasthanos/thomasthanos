import type { Project } from '../types'

const GH = 'https://github.com/thomasthanos'

/**
 * The six projects that get a full case study.
 * Every technical claim here comes from the repository itself — manifests,
 * package.json, source tree or README. Nothing is invented.
 */
export const flagship: Project[] = [
  // ==========================================================================
  {
    slug: 'nexusmods-bypass',
    name: 'NexusMods Bypass',
    category: 'browser',
    alsoIn: ['automation'],
    status: 'active',
    accent: 'lime',
    featured: 1,
    year: '2026 — now',
    version: '2.4.4',
    repo: `${GH}/google_extention_privacy/tree/main/nexus.mods.bypass`,
    repoLabel: 'google_extention_privacy',
    repoPath: 'nexus.mods.bypass',
    demo: 'https://thomasthanos.github.io/google_extention_privacy/',
    tech: ['JavaScript', 'Manifest V3', 'Service Worker', 'Chrome', 'Firefox', 'i18n'],
    metrics: [
      { value: '8K+', label: { en: 'weekly users', el: 'χρήστες / εβδομάδα' } },
      { value: '15K', label: { en: 'peak', el: 'peak' } },
      { value: '13', label: { en: 'languages', el: 'γλώσσες' } },
    ],
    short: {
      en: 'Skip the wait, queue the whole collection, get the mods. A Manifest V3 extension that turns an hour of clicking into one button.',
      el: 'Τέρμα η αναμονή. Βάζεις όλο το collection στην ουρά και φεύγεις. Manifest V3 extension που κάνει μια ώρα κλικ ένα κουμπί.',
    },
    summary: {
      en: 'Installing a large mod collection by hand means clicking through requirement screens, ad panels and download pages, one file at a time, for an hour. This extension turns that into: open the collection page, press start, walk away.',
      el: 'Το να κατεβάσεις ένα μεγάλο mod collection με το χέρι σημαίνει requirement screens, διαφημιστικά panels και download σελίδες, ένα αρχείο τη φορά, για μία ώρα. Αυτό το extension το κάνει: άνοιξε το collection, πάτα start, φύγε.',
    },
    why: {
      en: 'I did not want to wait five seconds. Then I counted: a 200-mod collection is roughly 200 requirement screens, 200 timers and 200 download clicks. Five seconds each stops being a joke somewhere around the twenty-minute mark. So the extension exists because the maths was insulting, not because the wait was.',
      el: 'Δεν ήθελα να περιμένω πέντε δευτερόλεπτα. Μετά κάτσε και μέτρα: ένα collection με 200 mods είναι 200 requirement screens, 200 timers και 200 download κλικ. Τα πέντε δευτερόλεπτα παύουν να είναι αστείο κάπου στο εικοσάλεπτο. Το extension υπάρχει επειδή τα μαθηματικά ήταν προσβλητικά, όχι η αναμονή.',
    },
    what: {
      en: 'It handles two download modes — send to Vortex, or download in the browser — queues an entire collection revision, paces itself so Nexus does not rate-limit you, and keeps a local history so an interrupted run picks up where it stopped instead of starting over.',
      el: 'Υποστηρίζει δύο τρόπους: send to Vortex ή download στον browser. Βάζει ολόκληρο το revision ενός collection σε ουρά, ρυθμίζει μόνο του τον ρυθμό ώστε να μη σε κόψει το Nexus με rate limit, και κρατάει τοπικό ιστορικό — αν κοπεί κάτι στη μέση, συνεχίζει από εκεί που σταμάτησε αντί να ξαναρχίσει.',
    },
    features: [
      {
        title: { en: 'Collection Ready Queue', el: 'Collection Ready Queue' },
        body: {
          en: 'Detects collection pages and builds a queue of every mod in the revision. Pick Send to Vortex or Browser download per run.',
          el: 'Εντοπίζει τις σελίδες collection και φτιάχνει ουρά με κάθε mod του revision. Διαλέγεις Send to Vortex ή Browser download ανά run.',
        },
      },
      {
        title: { en: 'Rate-limit aware pacing', el: 'Pacing με επίγνωση rate limit' },
        body: {
          en: 'A configurable pause between mods. If Nexus throttles the session, the queue pauses itself and resumes on its own instead of failing loudly.',
          el: 'Ρυθμιζόμενη παύση ανάμεσα στα mods. Αν το Nexus σε στραγγαλίσει, η ουρά κάνει μόνη της παύση και συνεχίζει μόνη της αντί να σκάσει.',
        },
      },
      {
        title: { en: 'Local download history', el: 'Τοπικό ιστορικό downloads' },
        body: {
          en: 'Finished files are remembered, so retrying a collection offers Skip Downloaded or Re-download All. Update collection diffs two revisions to show what actually changed.',
          el: 'Θυμάται τι τελείωσε, οπότε σε ένα retry σου δίνει Skip Downloaded ή Re-download All. Το Update collection συγκρίνει δύο revisions και δείχνει τι όντως άλλαξε.',
        },
      },
      {
        title: { en: 'Archived file buttons', el: 'Κουμπιά σε archived αρχεία' },
        body: {
          en: 'Puts the Vortex and browser download buttons back on archived entries that Nexus hides.',
          el: 'Επαναφέρει τα Vortex και browser download κουμπιά στα archived entries που κρύβει το Nexus.',
        },
      },
      {
        title: { en: 'Quiet page', el: 'Ήσυχη σελίδα' },
        body: {
          en: 'Ad slots, empty ad containers and Premium upgrade banners are collapsed while you browse. Optional, off-switchable.',
          el: 'Τα ad slots, τα άδεια ad containers και τα Premium banners διπλώνονται όσο περιηγείσαι. Προαιρετικό, με διακόπτη.',
        },
      },
      {
        title: { en: 'Chrome and Firefox from one source', el: 'Chrome και Firefox από μία πηγή' },
        body: {
          en: 'Since 2.4.4 the build script emits a second archive for addons.mozilla.org. The Firefox manifest is derived from the Chrome one at build time, so a permission or content script added for Chrome cannot go missing from the Firefox package. Only three keys differ: the Gecko add-on id, an event page in place of a service worker, and no `downloads.ui`, which Firefox does not have.',
          el: 'Από την 2.4.4 το build script βγάζει και δεύτερο αρχείο για το addons.mozilla.org. Το manifest του Firefox παράγεται από αυτό του Chrome τη στιγμή του build, οπότε ένα permission ή content script που μπήκε για Chrome δεν γίνεται να λείψει από το πακέτο του Firefox. Διαφέρουν μόνο τρία κλειδιά: το Gecko add-on id, event page αντί για service worker, και μηδέν `downloads.ui`, που στον Firefox δεν υπάρχει.',
        },
      },
      {
        title: { en: '13 languages', el: '13 γλώσσες' },
        body: {
          en: 'English, Greek, German, Spanish, French, Italian, Japanese, Korean, Polish, Brazilian Portuguese, Russian, Turkish and Simplified Chinese — 319 strings each, plus an Always use English switch.',
          el: 'Αγγλικά, Ελληνικά, Γερμανικά, Ισπανικά, Γαλλικά, Ιταλικά, Ιαπωνικά, Κορεατικά, Πολωνικά, Πορτογαλικά Βραζιλίας, Ρωσικά, Τουρκικά και Απλοποιημένα Κινέζικα — 319 strings η καθεμία, συν διακόπτη Always use English.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'The browser cannot see inside Vortex',
          el: 'Ο browser δεν βλέπει μέσα στο Vortex',
        },
        body: {
          en: 'Once a link is handed to Vortex the page loses all visibility — there is no completion event to listen for. Rather than pretend, files are recorded as sent rather than completed, and the queue paces itself using a download-speed estimate you set once.',
          el: 'Μόλις ένα link πάει στο Vortex, η σελίδα χάνει κάθε ορατότητα — δεν υπάρχει event ολοκλήρωσης να ακούσεις. Αντί να παριστάνει ότι ξέρει, τα αρχεία καταγράφονται ως sent και όχι ως completed, και η ουρά ρυθμίζει τον ρυθμό της με μια εκτίμηση ταχύτητας που ορίζεις μία φορά.',
        },
      },
      {
        title: {
          en: 'Surviving tab navigation',
          el: 'Να επιβιώνει από την πλοήγηση',
        },
        body: {
          en: 'A queue that dies when the tab navigates is useless. The whole run lives in the MV3 background service worker, with `alarms` keeping it awake between mods — service workers are killed aggressively, so pacing had to be scheduled rather than slept through.',
          el: 'Μια ουρά που πεθαίνει όταν αλλάζει σελίδα το tab δεν κάνει τίποτα. Όλο το run ζει στο MV3 background service worker, με `alarms` να το κρατάνε ξύπνιο ανάμεσα στα mods — τα service workers τα σκοτώνει επιθετικά ο browser, οπότε το pacing έπρεπε να είναι προγραμματισμένο, όχι sleep.',
        },
      },
      {
        title: {
          en: '319 strings × 13 locales',
          el: '319 strings × 13 locales',
        },
        body: {
          en: 'Translation drift is silent and permanent. A `tools/check-locales.mjs` script runs before any string-touching PR and fails when a key is missing, extra or empty in any locale.',
          el: 'Το translation drift είναι σιωπηλό και μόνιμο. Ένα script `tools/check-locales.mjs` τρέχει πριν από κάθε PR που πειράζει strings και σκάει αν ένα key λείπει, περισσεύει ή είναι άδειο σε οποιοδήποτε locale.',
        },
      },
      {
        title: {
          en: 'Failing out loud, on purpose',
          el: 'Να αποτυγχάνει φωναχτά, επίτηδες',
        },
        body: {
          en: 'When Nexus refuses to return a usable link, the old behaviour was a silent dead end. Now it surfaces a readable error and a built-in bug reporter attaches the recent extension errors to a pre-filled GitHub issue.',
          el: 'Όταν το Nexus αρνιόταν να δώσει χρησιμοποιήσιμο link, παλιά έβγαινε σιωπηλό αδιέξοδο. Τώρα βγάζει ευανάγνωστο error, και ένας ενσωματωμένος bug reporter κολλάει τα πρόσφατα errors σε ένα προσυμπληρωμένο GitHub issue.',
        },
      },
    ],
    architecture: [
      {
        name: { en: 'Content scripts', el: 'Content scripts' },
        items: [
          'shared.js',
          'storage.js',
          'errors.js',
          'auth.js',
          'nnw.js',
          'ndc.js',
          'ui.js',
          'main.js',
        ],
        note: {
          en: 'Injected at document_idle on nexusmods.com only. Ordered so storage and error handling exist before the UI mounts.',
          el: 'Γίνονται inject στο document_idle μόνο στο nexusmods.com. Με σειρά τέτοια ώστε storage και error handling να υπάρχουν πριν φορτώσει το UI.',
        },
      },
      {
        name: { en: 'Background', el: 'Background' },
        items: ['background.js (service worker)', 'chrome.alarms', 'chrome.downloads'],
        note: {
          en: 'Owns the queue. Survives navigation, paces itself with alarms, drives browser downloads.',
          el: 'Κρατάει την ουρά. Επιβιώνει από πλοήγηση, ρυθμίζει τον ρυθμό με alarms, τρέχει τα browser downloads.',
        },
      },
      {
        name: { en: 'Storage', el: 'Storage' },
        items: ['chrome.storage — settings', 'chrome.storage — download history'],
        note: {
          en: 'Local only. There is no account and no server.',
          el: 'Μόνο τοπικά. Δεν υπάρχει λογαριασμός ούτε server.',
        },
      },
      {
        name: { en: 'Locales', el: 'Locales' },
        items: ['_locales/ × 13', 'tools/check-locales.mjs'],
      },
    ],
    privacy: {
      en: 'Everything stays on your computer. Settings, history and error logs live in local extension storage. The only network requests are the ones to Nexus Mods that a download requires — the same ones your browser would make if you clicked the buttons yourself. No `tabs` permission, no all-URLs host permission, no remote code, no analytics, no account.',
      el: 'Όλα μένουν στον υπολογιστή σου. Settings, ιστορικό και error logs ζουν στο local extension storage. Τα μόνα network requests είναι αυτά προς το Nexus Mods που απαιτεί ένα download — τα ίδια που θα έκανε ο browser σου αν πατούσες τα κουμπιά μόνος σου. Χωρίς `tabs` permission, χωρίς all-URLs, χωρίς remote code, χωρίς analytics, χωρίς λογαριασμό.',
    },
    impact: {
      en: 'Around 8,000 people use it in a normal week, with peaks near 15,000. It is the clearest proof I have that a small tool solving one specific irritation will find its audience without any marketing at all.',
      el: 'Περίπου 8.000 άτομα το χρησιμοποιούν σε μια κανονική εβδομάδα, με peaks κοντά στις 15.000. Είναι η πιο καθαρή απόδειξη που έχω ότι ένα μικρό εργαλείο που λύνει έναν συγκεκριμένο εκνευρισμό βρίσκει κοινό χωρίς καθόλου marketing.',
    },
    lessons: {
      en: [
        'A queue that cannot resume is a queue nobody trusts. Local history was the feature that made people keep it installed.',
        'MV3 service workers get killed constantly. Design for being woken up, not for staying alive.',
        'Deprecating a permission is a two-release job: 2.4.3 keeps `downloads.ui` only to un-hide the button for old profiles, and drops it in 2.5.0.',
        'Thirteen locales are only maintainable with a script that fails the build.',
      ],
      el: [
        'Μια ουρά που δεν μπορεί να συνεχίσει είναι ουρά που δεν εμπιστεύεται κανείς. Το τοπικό ιστορικό ήταν το feature που έκανε τον κόσμο να το κρατήσει.',
        'Τα MV3 service workers πεθαίνουν συνέχεια. Σχεδίασέ το για να ξυπνάει, όχι για να μένει ζωντανό.',
        'Το να αφαιρέσεις ένα permission θέλει δύο releases: το 2.4.3 κρατάει το `downloads.ui` μόνο για να ξανα-εμφανίσει το κουμπί σε παλιά profiles, και το ρίχνει στο 2.5.0.',
        'Δεκατρία locales συντηρούνται μόνο με script που ρίχνει το build.',
      ],
    },
    disclaimer: {
      en: 'Not affiliated with, endorsed by or connected to Nexus Mods. All product names and trademarks belong to their owners.',
      el: 'Χωρίς καμία σχέση, έγκριση ή σύνδεση με το Nexus Mods. Όλα τα ονόματα και τα εμπορικά σήματα ανήκουν στους κατόχους τους.',
    },
    sketch: {
      title: 'Ready Queue — collection revision',
      kind: 'browser',
      rows: [
        { label: 'Skyrim Anniversary Edition · 214 mods', value: 'detected', hot: true },
        { label: 'Method', value: 'Send to Vortex' },
        { label: 'Skip already downloaded', value: '38 found' },
        { label: 'Pause between mods', value: '2.5s' },
        { label: 'Queue progress', bar: 62, value: '133 / 214' },
        { label: 'Rate limit', value: 'ok' },
      ],
    },
  },

  // ==========================================================================
  {
    slug: 'make-your-life-easier',
    name: 'Make Your Life Easier',
    category: 'windows',
    alsoIn: ['desktop', 'automation'],
    status: 'active',
    accent: 'violet',
    featured: 2,
    year: '2024 — now',
    version: '4.6.7',
    repo: `${GH}/Make_Your_Life_Easier.A.E`,
    repoLabel: 'Make_Your_Life_Easier.A.E',
    tech: [
      'Electron',
      'Node.js',
      'JavaScript',
      'Supabase',
      'electron-updater',
      'winget',
    ],
    metrics: [
      { value: '61', label: { en: 'apps in the catalog', el: 'apps στον κατάλογο' } },
      { value: '17K', label: { en: 'lines across 68 files', el: 'γραμμές σε 68 αρχεία' } },
      { value: 'signed', label: { en: 'Authenticode', el: 'Authenticode' } },
    ],
    short: {
      en: 'The Windows utility suite I actually use. Installer hub, system cleaner, repair toolkit and activation — one window instead of nine.',
      el: 'Το Windows utility suite που όντως χρησιμοποιώ κάθε μέρα. Installer hub, καθάρισμα συστήματος, εργαλεία επισκευής και activation — ένα παράθυρο αντί για εννιά.',
    },
    summary: {
      en: 'Windows already has a package manager, a disk cleaner, a repair toolkit and a pile of third-party utilities. They just live in different windows, different elevation prompts and different websites. This puts the ones you actually use in one place: open it, pick a job from the sidebar, walk away.',
      el: 'Τα Windows έχουν ήδη package manager, disk cleaner, εργαλεία επισκευής και ένα σωρό third-party utilities. Απλώς ζουν σε διαφορετικά παράθυρα, διαφορετικά UAC prompts και διαφορετικά sites. Αυτό βάζει όσα όντως χρησιμοποιείς σε ένα μέρος: το ανοίγεις, διαλέγεις δουλειά από το sidebar, φεύγεις.',
    },
    why: {
      en: 'This is the oldest thing I still maintain, and the most personal. It started years ago with a UI that looked like a potato and has been torn down and rebuilt more times than I want to admit — four different data layers alone before it felt fast. Running the same three maintenance chores by hand every month is not a personality, so I stopped.',
      el: 'Είναι το παλιότερο πράγμα που ακόμα συντηρώ, και το πιο προσωπικό. Ξεκίνησε πριν χρόνια με UI που έμοιαζε με πατάτα και έχει γκρεμιστεί και ξαναχτιστεί περισσότερες φορές απ᾽ όσες θέλω να παραδεχτώ — μόνο τα data layers έχουν αλλάξει τέσσερις φορές μέχρι να γίνει γρήγορο. Το να κάνεις τις ίδιες τρεις αγγαρείες συντήρησης με το χέρι κάθε μήνα δεν είναι προσωπικότητα, οπότε σταμάτησα.',
    },
    what: {
      en: 'Install a catalog of apps through winget, check what is already installed and what can be upgraded, clean and repair the system, activate Windows, launch Sparkle or WinUtil, theme Spotify with Spicetify, or restart straight into BIOS. An account is optional and only syncs preferences.',
      el: 'Εγκατάσταση καταλόγου εφαρμογών μέσω winget, έλεγχος τι υπάρχει ήδη και τι αναβαθμίζεται, καθάρισμα και επισκευή συστήματος, activation των Windows, εκκίνηση Sparkle ή WinUtil, theming του Spotify με Spicetify, ή restart κατευθείαν στο BIOS. Ο λογαριασμός είναι προαιρετικός και συγχρονίζει μόνο προτιμήσεις.',
    },
    features: [
      {
        title: { en: 'winget catalog', el: 'Κατάλογος winget' },
        body: {
          en: 'Browsers, communication, games, media, development, security, hardware, utilities — plus your own custom entries. Bulk install, uncheck all, export/import lists, upgrade all. List or grid, sorted by category, A→Z, Z→A or status.',
          el: 'Browsers, communication, games, media, development, security, hardware, utilities — συν δικές σου custom καταχωρήσεις. Μαζική εγκατάσταση, uncheck all, export/import λιστών, upgrade all. Λίστα ή grid, ταξινόμηση κατά κατηγορία, A→Z, Z→A ή κατάσταση.',
        },
      },
      {
        title: { en: 'System cleaner', el: 'System cleaner' },
        body: {
          en: 'Scans and removes temporary files, Prefetch, Recycle Bin, Windows Update cache, thumbnail cache and error reports.',
          el: 'Σκανάρει και σβήνει temporary files, Prefetch, Recycle Bin, Windows Update cache, thumbnail cache και error reports.',
        },
      },
      {
        title: { en: 'Repair & network', el: 'Επισκευή & δίκτυο' },
        body: {
          en: 'SFC, DISM, Check Disk, restart audio services, winget upgrade all. Flush DNS, release/renew IP, fix Bluetooth, full network reset.',
          el: 'SFC, DISM, Check Disk, restart audio services, winget upgrade all. Flush DNS, release/renew IP, φτιάξιμο Bluetooth, πλήρες network reset.',
        },
      },
      {
        title: { en: 'Utilities', el: 'Utilities' },
        body: {
          en: 'Activate Windows/Office and set up auto-login, launch the open-source Sparkle debloater, run Chris Titus Tech WinUtil elevated from the official signed script, install or fully remove Spicetify, or reboot into firmware setup.',
          el: 'Activation Windows/Office και auto-login, εκκίνηση του open-source Sparkle debloater, εκτέλεση του WinUtil του Chris Titus Tech elevated από το επίσημο signed script, εγκατάσταση ή πλήρης αφαίρεση Spicetify, ή reboot στο firmware setup.',
        },
      },
      {
        title: { en: 'Optional cloud sync', el: 'Προαιρετικό cloud sync' },
        body: {
          en: 'Google or Discord sign-in via Supabase Auth syncs theme, language, selected app list and view/sort. Never files, credentials or system state.',
          el: 'Σύνδεση με Google ή Discord μέσω Supabase Auth συγχρονίζει theme, γλώσσα, επιλεγμένη λίστα apps και view/sort. Ποτέ αρχεία, credentials ή κατάσταση συστήματος.',
        },
      },
      {
        title: { en: 'Background auto-update', el: 'Auto-update στο παρασκήνιο' },
        body: {
          en: 'Updates stream from Cloudflare R2, including for the portable build. Installers are Authenticode-signed as ThomasThanos so SmartScreen shows a real publisher.',
          el: 'Τα updates έρχονται από Cloudflare R2, ακόμα και για το portable build. Οι installers είναι Authenticode-signed ως ThomasThanos, οπότε το SmartScreen δείχνει πραγματικό publisher.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Four data layers', el: 'Τέσσερα data layers' },
        body: {
          en: 'The settings and session store has been rebuilt four times chasing responsiveness. What finally worked was writing locally first and treating the cloud as an eventually-consistent mirror, so the UI never waits on a network round trip.',
          el: 'Το store για settings και session ξαναχτίστηκε τέσσερις φορές κυνηγώντας ταχύτητα. Αυτό που τελικά δούλεψε ήταν να γράφει πρώτα τοπικά και να θεωρεί το cloud eventually-consistent καθρέφτη, ώστε το UI να μην περιμένει ποτέ network round trip.',
        },
      },
      {
        title: {
          en: 'Elevation without handing over the app',
          el: 'Elevation χωρίς να παραδώσεις την εφαρμογή',
        },
        body: {
          en: 'Cleanup of protected paths, SFC/DISM, BIOS restart, Sparkle and WinUtil all need administrator. The app itself runs unelevated and requests UAC per task, so a cleanup prompt never turns the whole process into an admin process.',
          el: 'Το καθάρισμα protected paths, τα SFC/DISM, το BIOS restart, το Sparkle και το WinUtil θέλουν όλα administrator. Η εφαρμογή τρέχει unelevated και ζητάει UAC ανά εργασία, ώστε ένα cleanup prompt να μη μετατρέπει όλη τη διεργασία σε admin.',
        },
      },
      {
        title: { en: 'Locking down the renderer', el: 'Κλείδωμα του renderer' },
        body: {
          en: 'Strict CSP, no inline scripts, context isolation and a dedicated preload bridge. Every privileged operation crosses an explicit IPC boundary — `src/main/ipc-handlers.js` is the only door.',
          el: 'Αυστηρό CSP, μηδέν inline scripts, context isolation και ειδικό preload bridge. Κάθε προνομιούχα λειτουργία περνάει από ρητό IPC όριο — το `src/main/ipc-handlers.js` είναι η μόνη πόρτα.',
        },
      },
      {
        title: { en: 'Updating a portable build', el: 'Update σε portable build' },
        body: {
          en: 'Portable executables have no installer to hand control to. A self-installer plus an external updater and a health check (`update-health.js`) handle the swap, with unit tests around the parts that can strand a user on a broken version.',
          el: 'Τα portable executables δεν έχουν installer να παραδώσουν τον έλεγχο. Ένας self-installer μαζί με εξωτερικό updater και health check (`update-health.js`) κάνουν την αλλαγή, με unit tests στα σημεία που μπορούν να αφήσουν χρήστη κολλημένο σε χαλασμένη έκδοση.',
        },
      },
    ],
    architecture: [
      {
        name: { en: 'Main process', el: 'Main process' },
        items: [
          'index.js',
          'window-manager.js',
          'ipc-handlers.js',
          'security.js',
          'updater.js',
          'external-updater.js',
          'update-health.js',
          'certificate.js',
        ],
      },
      {
        name: { en: 'Modules', el: 'Modules' },
        items: [
          'system-tools.js',
          'download-manager.js',
          'sparkle.js',
          'spicetify.js',
          'supabase.js',
          'oauth.js',
          'session-storage.js',
          'settings-store.js',
        ],
        note: {
          en: 'Everything privileged lives here and is reachable only through IPC.',
          el: 'Ό,τι προνομιούχο ζει εδώ και είναι προσβάσιμο μόνο μέσω IPC.',
        },
      },
      {
        name: { en: 'Preload bridge', el: 'Preload bridge' },
        items: ['preload/index.js'],
        note: {
          en: 'Context-isolated. The renderer gets a narrow, explicit API and nothing else.',
          el: 'Context-isolated. Ο renderer παίρνει ένα στενό, ρητό API και τίποτε άλλο.',
        },
      },
      {
        name: { en: 'Renderer', el: 'Renderer' },
        items: [
          'pages/installers.js',
          'pages/tools.js',
          'pages/utilities.js',
          'pages/activation.js',
          'pages/media.js',
          'i18n/en.json · gr.json',
        ],
      },
      {
        name: { en: 'Tests & tooling', el: 'Tests & tooling' },
        items: [
          'tests/auth-profile',
          'tests/session-storage',
          'tests/settings-state',
          'tests/update-health',
          'electron-builder',
        ],
      },
    ],
    privacy: {
      en: 'The tools run on your computer. Maintenance, the installer hub, debloat and utility launches never leave the machine. Optional account sync stores only preferences through Supabase Auth. The session cache is encrypted at rest with Electron `safeStorage`, which uses the OS credential store when available. No telemetry, no ads, no always-on cloud. Signed-out is the default.',
      el: 'Τα εργαλεία τρέχουν στον υπολογιστή σου. Η συντήρηση, το installer hub, το debloat και οι εκκινήσεις utilities δεν φεύγουν ποτέ από το μηχάνημα. Το προαιρετικό sync αποθηκεύει μόνο προτιμήσεις μέσω Supabase Auth. Το session cache είναι κρυπτογραφημένο at rest με το Electron `safeStorage`, που χρησιμοποιεί το credential store του λειτουργικού όπου υπάρχει. Χωρίς telemetry, χωρίς διαφημίσεις, χωρίς μόνιμο cloud. Το προεπιλεγμένο είναι signed-out.',
    },
    lessons: {
      en: [
        'Local-first is not an ideology, it is a latency fix. The moment the UI stopped waiting on the network it felt like a different app.',
        'A preload bridge with a narrow surface is easier to reason about than any amount of renderer discipline.',
        'Auto-update is the feature you must test hardest, because its failure mode is a user stranded on a broken version with no way back.',
        'Four rewrites is not a badge of honour. It is what happens when you keep the product and throw away the plumbing.',
      ],
      el: [
        'Το local-first δεν είναι ιδεολογία, είναι διόρθωση latency. Από τη στιγμή που το UI σταμάτησε να περιμένει το δίκτυο, έμοιαζε με άλλη εφαρμογή.',
        'Ένα preload bridge με στενή επιφάνεια είναι πιο εύκολο να το σκεφτείς από οποιαδήποτε πειθαρχία στον renderer.',
        'Το auto-update είναι το feature που πρέπει να τεστάρεις πιο σκληρά, γιατί το failure mode του είναι χρήστης κολλημένος σε χαλασμένη έκδοση χωρίς γυρισμό.',
        'Τέσσερα rewrites δεν είναι παράσημο. Είναι αυτό που συμβαίνει όταν κρατάς το προϊόν και πετάς τα σωληνάκια.',
      ],
    },
    sketch: {
      title: 'Make Your Life Easier — System Maintenance',
      kind: 'panel',
      rows: [
        { label: 'Temporary files', value: '4.2 GB', hot: true },
        { label: 'Windows Update cache', value: '1.8 GB' },
        { label: 'Prefetch · thumbnails', value: '340 MB' },
        { label: 'SFC /scannow', bar: 78, value: 'running' },
        { label: 'DISM RestoreHealth', value: 'queued' },
        { label: 'Elevation', value: 'per task · UAC' },
      ],
    },
  },

  // ==========================================================================
  {
    slug: 'an1me-tracker',
    name: 'An1me.to Tracker',
    category: 'browser',
    alsoIn: ['automation'],
    status: 'active',
    accent: 'pink',
    featured: 3,
    year: '2026 — now',
    version: '7.3.3',
    repo: `${GH}/google_extention_privacy/tree/main/An1me_tracker`,
    repoLabel: 'google_extention_privacy',
    repoPath: 'An1me_tracker',
    tech: [
      'JavaScript',
      'Manifest V3',
      'Firebase',
      'Firestore',
      'GraphQL',
      'Side Panel API',
    ],
    metrics: [
      { value: '72', label: { en: 'ES modules', el: 'ES modules' } },
      { value: '0', label: { en: 'build step', el: 'build step' } },
      { value: '39K', label: { en: 'lines of source', el: 'γραμμές κώδικα' } },
    ],
    short: {
      en: 'Watches you watch anime so you do not have to remember anything. Auto progress, resume, library, cloud sync, achievements.',
      el: 'Σε βλέπει να βλέπεις anime ώστε να μη χρειάζεται να θυμάσαι εσύ τίποτα. Auto progress, resume, βιβλιοθήκη, cloud sync, achievements.',
    },
    summary: {
      en: 'The tracker sits quietly in the background and remembers everything: which episode you are on, how far into it you got, what you have finished, and what just aired. Open the popup and the whole library is there — sorted, searchable, with covers, stats and just enough gamification to keep you honest.',
      el: 'Ο tracker κάθεται ήσυχα στο παρασκήνιο και θυμάται τα πάντα: σε ποιο επεισόδιο είσαι, πόσο μέσα έφτασες, τι τελείωσες και τι μόλις βγήκε. Ανοίγεις το popup και όλη η βιβλιοθήκη είναι εκεί — ταξινομημένη, με αναζήτηση, με covers, stats και όση ακριβώς gamification χρειάζεται για να μη λες ψέματα στον εαυτό σου.',
    },
    why: {
      en: 'Remembering which episode you were on is apparently too much to ask of a grown adult. It is also a solved problem everywhere except on the site I actually use, so I solved it there.',
      el: 'Το να θυμάσαι σε ποιο επεισόδιο ήσουν είναι προφανώς πολλά να ζητάει κανείς από έναν ενήλικα. Είναι επίσης λυμένο πρόβλημα παντού εκτός από το site που όντως χρησιμοποιώ, οπότε το έλυσα κι εκεί.',
    },
    what: {
      en: 'Start a video and the episode gets recorded — no buttons. Reopen it and playback resumes at the second you stopped. A Continue Watching row is injected on the homepage, watched episodes are marked on the series page, and a Skip Outro button appears with timings pulled from AniSkip.',
      el: 'Ξεκινάς ένα βίντεο και το επεισόδιο καταγράφεται — χωρίς κουμπιά. Το ξανανοίγεις και συνεχίζει από το δευτερόλεπτο που σταμάτησες. Στην αρχική μπαίνει μια σειρά Continue Watching, τα δεδομένα επεισόδια σημειώνονται στη σελίδα της σειράς, και εμφανίζεται κουμπί Skip Outro με χρόνους από το AniSkip.',
    },
    features: [
      {
        title: { en: 'Tracking that happens by itself', el: 'Tracking που γίνεται μόνο του' },
        body: {
          en: 'Automatic progress detection, resume-at-the-second, Continue Watching row, watched-episode highlighting, and separate handling for movies and multi-part series.',
          el: 'Αυτόματη ανίχνευση προόδου, resume στο δευτερόλεπτο, σειρά Continue Watching, σήμανση δεδομένων επεισοδίων, και ξεχωριστή διαχείριση για ταινίες και σειρές πολλών μερών.',
        },
      },
      {
        title: { en: 'A real library', el: 'Πραγματική βιβλιοθήκη' },
        body: {
          en: 'Categories, search and sorting. Add anything manually, including series you finished before installing. Cover art and episode counts resolve automatically, and a metadata repair job quietly fixes entries that came in incomplete.',
          el: 'Κατηγορίες, αναζήτηση και ταξινόμηση. Προσθέτεις χειροκίνητα ό,τι θες, ακόμα και σειρές που τελείωσες πριν το εγκαταστήσεις. Cover art και αριθμοί επεισοδίων βρίσκονται αυτόματα, και ένα metadata repair job διορθώνει σιωπηλά τις μισοτελειωμένες εγγραφές.',
        },
      },
      {
        title: { en: 'Filler marking', el: 'Σήμανση filler' },
        body: {
          en: 'Filler episodes are flagged from AnimeFillerList — skip the padding or count it, your call.',
          el: 'Τα filler επεισόδια σημειώνονται από το AnimeFillerList — τα προσπερνάς ή τα μετράς, δικό σου θέμα.',
        },
      },
      {
        title: { en: 'Sync and connections', el: 'Sync και συνδέσεις' },
        body: {
          en: 'Optional cloud sync through Firebase — Google or email sign-in. AniList integration imports your list in and pushes progress back out. Export/import the whole library as a file, any time.',
          el: 'Προαιρετικό cloud sync μέσω Firebase — σύνδεση με Google ή email. Το AniList integration κάνει import τη λίστα σου και push την πρόοδο πίσω. Export/import όλης της βιβλιοθήκης σε αρχείο, όποτε θες.',
        },
      },
      {
        title: { en: 'Stats, goals, achievements', el: 'Stats, στόχοι, achievements' },
        body: {
          en: 'Totals for series, movies, episodes and hours. Viewing trends, goals you set, and bronze/silver/gold achievements. Share cards generate a postable image of your stats.',
          el: 'Σύνολα για σειρές, ταινίες, επεισόδια και ώρες. Τάσεις παρακολούθησης, στόχοι που βάζεις, και achievements χάλκινα/ασημένια/χρυσά. Τα share cards φτιάχνουν εικόνα με τα stats σου έτοιμη για post.',
        },
      },
      {
        title: { en: 'Adaptive alerts', el: 'Προσαρμοστικά alerts' },
        body: {
          en: 'Notifications when a followed series airs. The checker adapts its frequency to how often a show actually updates instead of hammering the site every hour.',
          el: 'Ειδοποιήσεις όταν βγαίνει επεισόδιο σε σειρά που παρακολουθείς. Ο checker προσαρμόζει τη συχνότητά του στο πόσο συχνά ανεβάζει η κάθε σειρά, αντί να χτυπάει το site κάθε ώρα.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Six metadata sources, one truth', el: 'Έξι πηγές metadata, μία αλήθεια' },
        body: {
          en: 'AniList, Jikan/MyAnimeList, AniSkip, AnimeFillerList and four separate CDNs for cover art all disagree about titles. Resolution is best-effort with a repair pass that revisits incomplete entries later rather than blocking the UI on a lookup.',
          el: 'AniList, Jikan/MyAnimeList, AniSkip, AnimeFillerList και τέσσερα διαφορετικά CDN για covers διαφωνούν όλα για τους τίτλους. Η επίλυση γίνεται best-effort με ένα repair pass που ξαναπερνάει αργότερα από τις μισοτελειωμένες εγγραφές, αντί να μπλοκάρει το UI σε κάθε lookup.',
        },
      },
      {
        title: { en: 'Not counting a scrub as watched', el: 'Το scrub δεν είναι watched' },
        body: {
          en: 'Dragging to the end of a video is not watching it. Progress only counts once real playback time accumulates, which sounds obvious and was the source of most early false positives.',
          el: 'Το να σύρεις τη μπάρα στο τέλος δεν είναι παρακολούθηση. Η πρόοδος μετράει μόνο όταν μαζευτεί πραγματικός χρόνος αναπαραγωγής — ακούγεται προφανές και ήταν η πηγή των περισσότερων αρχικών false positives.',
        },
      },
      {
        title: { en: 'Storage quota', el: 'Όριο storage' },
        body: {
          en: 'A library with hundreds of covers blows straight past the normal extension quota, which is why `unlimitedStorage` is in the manifest and why the cache has an eviction policy at all.',
          el: 'Μια βιβλιοθήκη με εκατοντάδες covers ξεπερνάει άνετα το κανονικό quota του extension — γι᾽ αυτό υπάρχει `unlimitedStorage` στο manifest και γι᾽ αυτό η cache έχει καθόλου eviction policy.',
        },
      },
      {
        title: { en: '72 modules, no bundler', el: '72 modules, χωρίς bundler' },
        body: {
          en: 'Plain ES modules, no build step, nothing minified. Reviewing an extension should not require trusting a build pipeline — what you read is what runs.',
          el: 'Σκέτα ES modules, χωρίς build step, τίποτα minified. Το να ελέγξεις ένα extension δεν πρέπει να απαιτεί εμπιστοσύνη σε build pipeline — αυτό που διαβάζεις είναι αυτό που τρέχει.',
        },
      },
    ],
    architecture: [
      {
        name: { en: 'On-page', el: 'Στη σελίδα' },
        items: ['content scripts (an1me.to)', 'watch-page injector', 'Continue Watching row'],
      },
      {
        name: { en: 'Background', el: 'Background' },
        items: ['service worker', 'chrome.alarms', 'chrome.notifications'],
        note: {
          en: 'Adaptive new-episode checker and sync refresh.',
          el: 'Προσαρμοστικός checker νέων επεισοδίων και ανανέωση sync.',
        },
      },
      {
        name: { en: 'UI', el: 'UI' },
        items: ['popup.html', 'Side Panel API', 'stats · goals · achievements'],
      },
      {
        name: { en: 'Sync', el: 'Sync' },
        items: [
          'Firebase Authentication',
          'Cloud Firestore',
          'chrome.identity',
          'AniList GraphQL',
        ],
      },
      {
        name: { en: 'Metadata', el: 'Metadata' },
        items: ['Jikan / MAL', 'AniSkip', 'AnimeFillerList', 'cover CDNs × 5'],
        note: {
          en: 'These receive a title or an ID. Never your identity.',
          el: 'Παίρνουν τίτλο ή ID. Ποτέ την ταυτότητά σου.',
        },
      },
    ],
    privacy: {
      en: 'Without an account, everything stays on your machine. With an account, your library is written to your own private Firestore document, readable only by you. Metadata lookups send a series title or ID and never your identity. No analytics, no ad SDK, no data sale — anywhere.',
      el: 'Χωρίς λογαριασμό, όλα μένουν στο μηχάνημά σου. Με λογαριασμό, η βιβλιοθήκη σου γράφεται στο δικό σου ιδιωτικό Firestore document, που το διαβάζεις μόνο εσύ. Τα metadata lookups στέλνουν τίτλο ή ID σειράς και ποτέ την ταυτότητά σου. Χωρίς analytics, χωρίς ad SDK, χωρίς πώληση δεδομένων — πουθενά.',
    },
    lessons: {
      en: [
        'Optional sync is worth the complexity. Making sign-in required would have cost more users than the feature gained.',
        'Metadata from five sources will never be clean. A background repair pass beats a blocking lookup every time.',
        'A side panel is a better home for a busy popup than a bigger popup.',
      ],
      el: [
        'Το προαιρετικό sync αξίζει την πολυπλοκότητα. Αν το sign-in ήταν υποχρεωτικό θα έχανα περισσότερους χρήστες απ᾽ όσους κέρδιζε το feature.',
        'Τα metadata από πέντε πηγές δεν θα είναι ποτέ καθαρά. Ένα repair pass στο παρασκήνιο κερδίζει πάντα από ένα blocking lookup.',
        'Το side panel είναι καλύτερο σπίτι για ένα φορτωμένο popup απ᾽ ό,τι ένα μεγαλύτερο popup.',
      ],
    },
    disclaimer: {
      en: 'Not affiliated with an1me.to, AniList, MyAnimeList or AniSkip.',
      el: 'Χωρίς σχέση με an1me.to, AniList, MyAnimeList ή AniSkip.',
    },
    sketch: {
      title: 'An1me.to Tracker — Library',
      kind: 'panel',
      rows: [
        { label: 'Continue watching', value: '6 series', hot: true },
        { label: 'Frieren · ep 21', bar: 43, value: '11:04 / 24:12' },
        { label: 'Filler detected', value: 'ep 18–20' },
        { label: 'Cloud sync', value: 'Firestore · ok' },
        { label: 'Hours watched', value: '412' },
        { label: 'Achievements', value: '14 / 30 · gold ×3' },
      ],
    },
  },

  // ==========================================================================
  {
    slug: 'discord-package-viewer',
    name: 'Discord Package Viewer',
    category: 'discord',
    alsoIn: ['automation', 'desktop'],
    status: 'maintained',
    accent: 'blue',
    featured: 4,
    year: '2026 — now',
    repo: `${GH}/discord_package_viewer`,
    repoLabel: 'discord_package_viewer',
    tech: ['Python', 'HTML', 'CSS', 'JavaScript', 'PyInstaller'],
    metrics: [
      { value: '0', label: { en: 'dependencies', el: 'εξαρτήσεις' } },
      { value: '1', label: { en: 'output file', el: 'αρχείο εξόδου' } },
      { value: '7,760', label: { en: 'lines, one script', el: 'γραμμές, ένα script' } },
    ],
    short: {
      en: 'Turns your Discord data export into one offline HTML archive with full search, charts and a word cloud. No server, no upload, no dependencies.',
      el: 'Παίρνει το Discord data export σου και το κάνει ένα offline HTML με πλήρη αναζήτηση, γραφήματα και word cloud. Μηδέν server, μηδέν upload, μηδέν εξαρτήσεις.',
    },
    summary: {
      en: 'When you request your data from Discord you get a ZIP full of JSON. This turns that ZIP into a single `discord_viewer.html` that works completely offline — no server, no installation, no internet connection required after generation. Because scrolling through four years of DMs in Notepad is not a personality trait.',
      el: 'Όταν ζητάς τα δεδομένα σου από το Discord παίρνεις ένα ZIP γεμάτο JSON. Αυτό μετατρέπει το ZIP σε ένα `discord_viewer.html` που δουλεύει εντελώς offline — χωρίς server, χωρίς εγκατάσταση, χωρίς σύνδεση μετά τη δημιουργία. Επειδή το να σκρολάρεις τέσσερα χρόνια DM στο Notepad δεν είναι προσωπικότητα.',
    },
    why: {
      en: 'Every online "Discord package viewer" asks you to upload the single most personal file you own to a stranger\'s server. That is an absurd trade for a bit of convenience. So this one never leaves your disk, and the proof is that it works with the Wi-Fi off.',
      el: 'Κάθε online "Discord package viewer" σου ζητάει να ανεβάσεις το πιο προσωπικό αρχείο που έχεις στον server ενός αγνώστου. Παράλογη ανταλλαγή για λίγη ευκολία. Οπότε αυτό δεν φεύγει ποτέ από τον δίσκο σου, και η απόδειξη είναι ότι δουλεύει με το Wi-Fi κλειστό.',
    },
    what: {
      en: 'Point it at the ZIP and it produces one HTML file containing every DM and server channel you have written in, with Discord markdown, spoilers, mentions, custom emoji and attachments rendered properly — plus statistics, charts, a word cloud and live search over everything.',
      el: 'Του δείχνεις το ZIP και βγάζει ένα HTML αρχείο με κάθε DM και server channel που έγραψες ποτέ, με σωστό Discord markdown, spoilers, mentions, custom emoji και attachments — συν στατιστικά, γραφήματα, word cloud και live αναζήτηση σε όλα.',
    },
    features: [
      {
        title: { en: 'Full message history', el: 'Πλήρες ιστορικό μηνυμάτων' },
        body: {
          en: 'Every DM and server channel, with Discord markdown, spoilers, @mentions, custom emoji and attachments. Consecutive messages from the same author group together with mini avatars, exactly like the real client.',
          el: 'Κάθε DM και server channel, με Discord markdown, spoilers, @mentions, custom emoji και attachments. Τα διαδοχικά μηνύματα του ίδιου ατόμου ομαδοποιούνται με mini avatars, ακριβώς όπως ο κανονικός client.',
        },
      },
      {
        title: { en: 'Media playback', el: 'Αναπαραγωγή media' },
        body: {
          en: 'Image previews, a custom video player, an audio player for voice messages, and Tenor GIF thumbnails pre-fetched during generation.',
          el: 'Προεπισκόπηση εικόνων, custom video player, audio player για voice messages, και Tenor GIF thumbnails που κατεβαίνουν κατά τη δημιουργία.',
        },
      },
      {
        title: { en: 'Statistics and charts', el: 'Στατιστικά και γραφήματα' },
        body: {
          en: 'Dynamic graphs for hourly, daily and all-time messaging activity, top emoji usage, most active servers, and a word cloud of what you actually say.',
          el: 'Δυναμικά γραφήματα για ωριαία, ημερήσια και συνολική δραστηριότητα, top emoji, πιο ενεργοί servers, και word cloud με αυτά που όντως λες.',
        },
      },
      {
        title: { en: 'Live search', el: 'Live αναζήτηση' },
        body: {
          en: 'Instant search across every message with keyword highlighting and quick date-range filters.',
          el: 'Άμεση αναζήτηση σε κάθε μήνυμα με highlight λέξεων και γρήγορα φίλτρα ημερομηνίας.',
        },
      },
      {
        title: { en: 'Account detail', el: 'Στοιχεία λογαριασμού' },
        body: {
          en: 'Creation date, badges (HypeSquad, Active Developer and the rest), device info, Nitro history, linked accounts and payment history.',
          el: 'Ημερομηνία δημιουργίας, badges (HypeSquad, Active Developer και τα λοιπά), στοιχεία συσκευών, ιστορικό Nitro, συνδεδεμένοι λογαριασμοί και ιστορικό πληρωμών.',
        },
      },
      {
        title: { en: 'Built for big exports', el: 'Φτιαγμένο για μεγάλα exports' },
        body: {
          en: 'Floating jump-to-top/bottom, incremental "Load More" so the browser never chokes, and a loading progress bar for the first paint.',
          el: 'Floating jump-to-top/bottom, σταδιακό "Load More" ώστε να μην πνιγεί ο browser, και progress bar φόρτωσης για το πρώτο render.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'One file, no dependencies', el: 'Ένα αρχείο, μηδέν εξαρτήσεις' },
        body: {
          en: 'The generator is a single 7,760-line Python script that imports nothing outside the standard library, and the output is a single HTML file. Charts, the word cloud, the video player and the search index are all hand-rolled, because pulling in a chart library would have meant shipping a CDN link into a file that is supposed to work offline.',
          el: 'Ο generator είναι ένα script Python 7.760 γραμμών που δεν κάνει import τίποτα εκτός standard library, και η έξοδος είναι ένα HTML αρχείο. Τα γραφήματα, το word cloud, ο video player και το search index είναι όλα γραμμένα στο χέρι, γιατί μια chart library θα σήμαινε CDN link μέσα σε ένα αρχείο που υποτίθεται δουλεύει offline.',
        },
      },
      {
        title: { en: 'Years of messages in one page', el: 'Χρόνια μηνυμάτων σε μία σελίδα' },
        body: {
          en: 'A large export is hundreds of thousands of messages. Rendering all of it at once locks the tab, so channels load incrementally and the search index is built ahead of time during generation rather than on the fly in the browser.',
          el: 'Ένα μεγάλο export είναι εκατοντάδες χιλιάδες μηνύματα. Το να τα κάνεις render όλα μαζί κολλάει το tab, οπότε τα κανάλια φορτώνουν σταδιακά και το search index χτίζεται από πριν κατά τη δημιουργία αντί για on the fly στον browser.',
        },
      },
      {
        title: { en: 'Discord markdown is not markdown', el: 'Το Discord markdown δεν είναι markdown' },
        body: {
          en: 'Spoilers, custom emoji IDs, mention resolution, channel links and inline code all need their own parsing rules, and the export gives you raw text with none of the client-side context.',
          el: 'Spoilers, IDs για custom emoji, ανάλυση mentions, channel links και inline code θέλουν όλα δικούς τους κανόνες parsing, και το export σου δίνει σκέτο κείμενο χωρίς κανένα από τα συμφραζόμενα του client.',
        },
      },
    ],
    architecture: [
      {
        name: { en: 'Input', el: 'Είσοδος' },
        items: ['Discord data package (.zip)', 'messages/ · account/ · servers/'],
      },
      {
        name: { en: 'Generator', el: 'Generator' },
        items: ['generate_discord_viewer.py', 'stdlib only', 'PyInstaller build'],
        note: {
          en: 'Also ships as a standalone .exe for people who do not have Python.',
          el: 'Διατίθεται και ως αυτόνομο .exe για όσους δεν έχουν Python.',
        },
      },
      {
        name: { en: 'Output', el: 'Έξοδος' },
        items: ['discord_viewer.html', 'inlined CSS + JS', 'prebuilt search index'],
      },
    ],
    privacy: {
      en: 'Everything runs locally and the script never sends your data anywhere. The generated HTML makes exactly three kinds of outbound request, all optional to its function: Google Fonts for the UI typeface, the Discord CDN to load custom server emoji by ID, and Tenor for GIF thumbnails that were pre-fetched during generation. Your messages, account info and personal data never leave your computer.',
      el: 'Όλα τρέχουν τοπικά και το script δεν στέλνει ποτέ τα δεδομένα σου πουθενά. Το HTML που παράγεται κάνει ακριβώς τριών ειδών εξωτερικά requests, όλα προαιρετικά για τη λειτουργία του: Google Fonts για τη γραμματοσειρά, το CDN του Discord για custom server emoji ανά ID, και το Tenor για GIF thumbnails που κατέβηκαν ήδη κατά τη δημιουργία. Τα μηνύματα, τα στοιχεία λογαριασμού και τα προσωπικά σου δεδομένα δεν φεύγουν ποτέ από τον υπολογιστή σου.',
    },
    lessons: {
      en: [
        'The strongest privacy claim is a demonstrable one: unplug the network and the archive still works.',
        'Zero dependencies is a real constraint, not a flex. It forced simpler charts, and the simpler charts were better.',
        'Ship the .exe. Asking a non-developer to install Python is where a good tool goes to die.',
      ],
      el: [
        'Ο πιο δυνατός ισχυρισμός για privacy είναι αυτός που αποδεικνύεται: βγάζεις το δίκτυο και το αρχείο δουλεύει.',
        'Το μηδέν εξαρτήσεις είναι πραγματικός περιορισμός, όχι επίδειξη. Ανάγκασε πιο απλά γραφήματα, και τα πιο απλά γραφήματα ήταν καλύτερα.',
        'Δώσε το .exe. Το να ζητάς από μη-προγραμματιστή να εγκαταστήσει Python είναι εκεί που πεθαίνει ένα καλό εργαλείο.',
      ],
    },
    sketch: {
      title: 'discord_viewer.html — offline',
      kind: 'browser',
      rows: [
        { label: 'Channels indexed', value: '412', hot: true },
        { label: 'Messages parsed', value: '286,431' },
        { label: 'Search', value: 'live · highlighted' },
        { label: 'Peak hour', value: '02:00 — 03:00' },
        { label: 'Network required', value: 'no' },
        { label: 'Generating', bar: 88 },
      ],
    },
  },

  // ==========================================================================
  {
    slug: 'steam-idler',
    name: 'Steam Idler',
    codename: 'Souvlatzidiko Unlocker',
    category: 'desktop',
    alsoIn: ['windows'],
    status: 'active',
    accent: 'orange',
    featured: 5,
    year: '2026 — now',
    version: '3.0.6',
    repo: `${GH}/steam-idler`,
    repoLabel: 'steam-idler',
    tech: [
      'Electron',
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind',
      'steamworks.js',
    ],
    metrics: [
      { value: '9.7K', label: { en: 'lines across 36 files', el: 'γραμμές σε 36 αρχεία' } },
      { value: 'TS', label: { en: 'end to end', el: 'από άκρη σε άκρη' } },
    ],
    short: {
      en: 'Achievement manager and game idler for Steam. For the achievements you earned emotionally but never quite managed technically.',
      el: 'Achievement manager και game idler για το Steam. Για τα achievements που τα κέρδισες ψυχολογικά αλλά ποτέ τεχνικά.',
    },
    summary: {
      en: 'A modern Steam achievement manager and game idler built with Electron, React 18 and TypeScript. Unlock or lock achievements, idle games for playtime, go auto-invisible while it runs, and keep the whole thing behind a UI that does not look like it was written in 2009.',
      el: 'Ένας σύγχρονος Steam achievement manager και game idler φτιαγμένος με Electron, React 18 και TypeScript. Ξεκλειδώνεις ή κλειδώνεις achievements, κάνεις idle παιχνίδια για playtime, γίνεσαι αυτόματα invisible όσο τρέχει, και όλα αυτά πίσω από UI που δεν δείχνει γραμμένο το 2009.',
    },
    why: {
      en: 'Every tool in this space works and looks like a hostage note. The functionality was solved a decade ago; the experience never was. This was the project where I let myself care about the interface first and reverse-engineer the plumbing second.',
      el: 'Κάθε εργαλείο σε αυτόν τον χώρο δουλεύει, αλλά μοιάζει με σημείωμα απαγωγής. Η λειτουργικότητα λύθηκε πριν από μια δεκαετία· η εμπειρία ποτέ. Εδώ άφησα τον εαυτό μου να νοιαστεί πρώτα για το interface και μετά για τα σωληνάκια.',
    },
    what: {
      en: 'Sign in to Steam (including QR sign-in), browse your library with real cover art, unlock or re-lock achievements per game, run an idle session across multiple titles, and let the app flip your profile to invisible while it does. Tray icons, toasts and an update banner keep it out of the way.',
      el: 'Συνδέεσαι στο Steam (και με QR), βλέπεις τη βιβλιοθήκη σου με κανονικά covers, ξεκλειδώνεις ή ξανακλειδώνεις achievements ανά παιχνίδι, τρέχεις idle session σε πολλά παιχνίδια, και η εφαρμογή σε γυρνάει σε invisible όσο τρέχει. Tray icons, toasts και update banner το κρατάνε διακριτικό.',
    },
    features: [
      {
        title: { en: 'Achievement manager', el: 'Achievement manager' },
        body: {
          en: 'Per-game achievement list with unlock and lock, backed by `steamworks.js` running out-of-process.',
          el: 'Λίστα achievements ανά παιχνίδι με unlock και lock, με το `steamworks.js` να τρέχει σε ξεχωριστή διεργασία.',
        },
      },
      {
        title: { en: 'Game idler', el: 'Game idler' },
        body: {
          en: 'Idle one or many titles for playtime, driven by `steam-user` sessions rather than launching the actual games.',
          el: 'Idle σε ένα ή πολλά παιχνίδια για playtime, μέσω `steam-user` sessions αντί να ανοίγει τα ίδια τα παιχνίδια.',
        },
      },
      {
        title: { en: 'Auto-invisible', el: 'Auto-invisible' },
        body: {
          en: 'Flips your Steam presence to invisible for the duration of a session and puts it back afterwards.',
          el: 'Γυρνάει το Steam presence σε invisible όσο κρατάει το session και το επαναφέρει μετά.',
        },
      },
      {
        title: { en: 'QR sign-in', el: 'Σύνδεση με QR' },
        body: {
          en: 'Authentication through `steam-session` with a generated QR code, so credentials never pass through the app.',
          el: 'Authentication μέσω `steam-session` με QR code, ώστε τα credentials να μην περνούν ποτέ από την εφαρμογή.',
        },
      },
      {
        title: { en: 'A library that scrolls', el: 'Βιβλιοθήκη που σκρολάρει' },
        body: {
          en: 'Virtualised with `react-window`, so a 900-game account renders as fast as a 9-game one.',
          el: 'Virtualised με `react-window`, οπότε ένας λογαριασμός με 900 παιχνίδια κάνει render το ίδιο γρήγορα με έναν με 9.',
        },
      },
      {
        title: { en: 'Self-updating', el: 'Αυτόματα updates' },
        body: {
          en: '`electron-updater` with an in-app banner, plus tray icons and toasts that keep progress visible without stealing focus.',
          el: '`electron-updater` με banner μέσα στην εφαρμογή, συν tray icons και toasts που δείχνουν την πρόοδο χωρίς να κλέβουν focus.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Native Steam code cannot crash the app', el: 'Ο native κώδικας του Steam δεν πρέπει να ρίχνει την εφαρμογή' },
        body: {
          en: '`steamworks.js` is a native binding, and native bindings fault. It runs in a dedicated worker bundled separately with esbuild and torn down with `tree-kill`, so a bad AppID takes the worker down and nothing else.',
          el: 'Το `steamworks.js` είναι native binding, και τα native bindings σκάνε. Τρέχει σε ξεχωριστό worker, bundled χωριστά με esbuild και τερματισμένο με `tree-kill`, οπότε ένα κακό AppID ρίχνει τον worker και τίποτα άλλο.',
        },
      },
      {
        title: { en: 'Three build targets, one command', el: 'Τρία build targets, μία εντολή' },
        body: {
          en: 'Main process via `tsc`, the Steam worker via `esbuild` with `steamworks.js` marked external, and the renderer via Vite — all orchestrated with `concurrently` and `wait-on` so `npm run dev` is still one command.',
          el: 'Main process με `tsc`, ο Steam worker με `esbuild` και το `steamworks.js` marked external, και ο renderer με Vite — όλα ορχηστρωμένα με `concurrently` και `wait-on` ώστε το `npm run dev` να παραμένει μία εντολή.',
        },
      },
      {
        title: { en: 'Failing gracefully when Steam is not there', el: 'Να μη σκάει όταν λείπει το Steam' },
        body: {
          en: 'A dedicated setup screen and `steamPaths` resolution handle the case where Steam is installed somewhere unusual or not running at all, instead of showing an empty list and a shrug.',
          el: 'Μια ειδική οθόνη setup και η επίλυση `steamPaths` καλύπτουν την περίπτωση που το Steam είναι εγκατεστημένο κάπου παράξενα ή δεν τρέχει καθόλου, αντί για άδεια λίστα και σήκωμα ώμων.',
        },
      },
    ],
    architecture: [
      {
        name: { en: 'Main process', el: 'Main process' },
        items: [
          'main/index.ts',
          'ipc/handlers.ts',
          'managers/store.ts',
          'managers/updater.ts',
          'managers/trayIcons.ts',
          'managers/notificationManager.ts',
        ],
      },
      {
        name: { en: 'Steam layer', el: 'Steam layer' },
        items: [
          'steam/client.ts',
          'steam/idleManager.ts',
          'steam/steamUser.ts',
          'steam/steamPaths.ts',
          'steam/worker.ts',
        ],
        note: {
          en: 'The worker is bundled separately and isolated from the main process.',
          el: 'Ο worker γίνεται bundle χωριστά και είναι απομονωμένος από τον main process.',
        },
      },
      {
        name: { en: 'Preload', el: 'Preload' },
        items: ['preload/index.ts', 'shared/types.ts'],
        note: {
          en: 'One shared type file keeps main and renderer honest about the IPC contract.',
          el: 'Ένα κοινό αρχείο τύπων κρατάει main και renderer ειλικρινείς για το IPC contract.',
        },
      },
      {
        name: { en: 'Renderer', el: 'Renderer' },
        items: [
          'pages/HomePage',
          'pages/GamesPage',
          'pages/AchievementsPage',
          'pages/IdlePage',
          'pages/AutoIdlePage',
          'pages/SettingsPage',
        ],
      },
    ],
    lessons: {
      en: [
        'Put anything native in its own process. The first version crashed the window; the second one only ever loses a worker.',
        'A single shared `types.ts` across main, preload and renderer catches more IPC bugs than any amount of runtime validation.',
        'Virtualise the list before you need to. Retro-fitting it is much worse than starting with it.',
      ],
      el: [
        'Βάλε ό,τι είναι native σε δική του διεργασία. Η πρώτη έκδοση έριχνε το παράθυρο· η δεύτερη το πολύ χάνει έναν worker.',
        'Ένα κοινό `types.ts` σε main, preload και renderer πιάνει περισσότερα IPC bugs από οποιοδήποτε runtime validation.',
        'Κάνε virtualise τη λίστα πριν το χρειαστείς. Το να το προσθέσεις μετά είναι πολύ χειρότερο.',
      ],
    },
    disclaimer: {
      en: 'Modifying Steam achievements may violate the Steam Subscriber Agreement. Use at your own risk. Not affiliated with or endorsed by Valve Corporation.',
      el: 'Η τροποποίηση achievements στο Steam μπορεί να παραβιάζει το Steam Subscriber Agreement. Με δική σου ευθύνη. Χωρίς σχέση ή έγκριση από τη Valve Corporation.',
    },
    sketch: {
      title: 'Steam Idler — Idle session',
      kind: 'panel',
      rows: [
        { label: 'Signed in', value: 'QR · steam-session', hot: true },
        { label: 'Presence', value: 'invisible' },
        { label: 'Idling', value: '4 titles' },
        { label: 'Worker', value: 'steamworks.js · isolated' },
        { label: 'Session uptime', bar: 34, value: '01:12:40' },
        { label: 'Update', value: 'v3.0.6 · current' },
      ],
    },
  },

  // ==========================================================================
  {
    slug: 'gta-academy',
    name: 'GTA Academy',
    category: 'web',
    status: 'maintained',
    accent: 'lime',
    year: '2023 — 2025',
    repo: `${GH}/gta-academy`,
    repoLabel: 'gta-academy',
    demo: 'https://thomasthanos.github.io/gta-academy/',
    tech: ['HTML5', 'CSS3', 'Vanilla JS', 'localStorage'],
    metrics: [
      { value: '30+', label: { en: 'vehicles tested', el: 'οχήματα' } },
      { value: '0', label: { en: 'frameworks', el: 'frameworks' } },
    ],
    short: {
      en: 'A vehicle-durability wiki for GTA V, built from real in-game testing. The project where I got obsessed with the CSS and never really recovered.',
      el: 'Wiki αντοχής οχημάτων για το GTA V, από πραγματικά in-game τεστ. Το project όπου κόλλησα με το CSS και δεν συνήλθα ποτέ.',
    },
    summary: {
      en: 'A stylish, responsive in-game wiki for Grand Theft Auto V documenting how much damage each vehicle actually survives — cars, helicopters and planes. Every number came from repeated in-game experiments with fully upgraded vehicles, measuring hits from RPGs, homing missiles, railguns and the rest.',
      el: 'Ένα στιλάτο, responsive in-game wiki για το Grand Theft Auto V που καταγράφει πόση ζημιά αντέχει πραγματικά κάθε όχημα — αυτοκίνητα, ελικόπτερα και αεροπλάνα. Κάθε νούμερο βγήκε από επαναλαμβανόμενα in-game πειράματα με πλήρως αναβαθμισμένα οχήματα, μετρώντας χτυπήματα από RPG, homing missiles, railguns και τα λοιπά.',
    },
    why: {
      en: 'The data did not exist anywhere in a form you could actually read, and getting blown up should not be a surprise. But the honest answer is that I wanted a project where design was the point. I spent far more hours on the CSS, the hierarchy and the mobile breakpoints than on the content — and that obsession is the reason every UI I have built since looks the way it does.',
      el: 'Τα δεδομένα δεν υπήρχαν πουθενά σε μορφή που να διαβάζεται, και το να ανατιναχτείς δεν πρέπει να είναι έκπληξη. Η ειλικρινής απάντηση όμως είναι ότι ήθελα ένα project όπου το design να είναι το ζητούμενο. Έφαγα πολύ περισσότερες ώρες στο CSS, στην ιεραρχία και στα mobile breakpoints απ᾽ ό,τι στο περιεχόμενο — και αυτή η εμμονή είναι ο λόγος που κάθε UI που έχω φτιάξει από τότε δείχνει έτσι.',
    },
    what: {
      en: 'Damage statistics for 30+ vehicles, live search with dynamic filtering, an animated dark/light toggle whose choice persists in localStorage, and a layout tuned all the way down to very small phones.',
      el: 'Στατιστικά ζημιάς για 30+ οχήματα, live αναζήτηση με δυναμικό φιλτράρισμα, animated dark/light toggle που θυμάται την επιλογή σου στο localStorage, και layout ρυθμισμένο μέχρι και σε πολύ μικρά κινητά.',
    },
    features: [
      {
        title: { en: 'Tested, not guessed', el: 'Τεσταρισμένο, όχι μαντεμένο' },
        body: {
          en: 'Every durability figure is the result of repeated in-game experiments on fully upgraded vehicles.',
          el: 'Κάθε νούμερο αντοχής είναι αποτέλεσμα επαναλαμβανόμενων in-game πειραμάτων σε πλήρως αναβαθμισμένα οχήματα.',
        },
      },
      {
        title: { en: 'Live search', el: 'Live αναζήτηση' },
        body: {
          en: 'Filtering happens as you type, with no page reload and no framework underneath it.',
          el: 'Το φιλτράρισμα γίνεται καθώς πληκτρολογείς, χωρίς reload και χωρίς framework από κάτω.',
        },
      },
      {
        title: { en: 'Animated theme toggle', el: 'Animated theme toggle' },
        body: {
          en: 'Dark and light modes with a transition that is doing slightly more work than it needs to, on purpose.',
          el: 'Dark και light mode με transition που κάνει λίγο παραπάνω δουλειά απ᾽ όση χρειάζεται, επίτηδες.',
        },
      },
      {
        title: { en: 'Modular CSS', el: 'Modular CSS' },
        body: {
          en: 'Split across `style.css`, `apperience_mode.css`, `searchbar.css`, `friend.css` and `copyright.css` so each concern stays readable.',
          el: 'Χωρισμένο σε `style.css`, `apperience_mode.css`, `searchbar.css`, `friend.css` και `copyright.css` ώστε κάθε κομμάτι να παραμένει ευανάγνωστο.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'No framework, on purpose', el: 'Χωρίς framework, επίτηδες' },
        body: {
          en: 'Semantic HTML, hand-written CSS and vanilla JS. Everything a framework would have given for free — state, filtering, persistence, transitions — had to be written, which is exactly why it taught me anything.',
          el: 'Semantic HTML, CSS γραμμένο στο χέρι και vanilla JS. Ό,τι θα έδινε τζάμπα ένα framework — state, φιλτράρισμα, persistence, transitions — έπρεπε να γραφτεί, και ακριβώς γι᾽ αυτό μου έμαθε κάτι.',
        },
      },
      {
        title: { en: 'Ultra-small screens', el: 'Πολύ μικρές οθόνες' },
        body: {
          en: 'A dense stats table on a 320px phone is where responsive design stops being a media query and starts being a redesign.',
          el: 'Ένας πυκνός πίνακας στατιστικών σε κινητό 320px είναι εκεί που το responsive design σταματάει να είναι media query και γίνεται ξανασχεδιασμός.',
        },
      },
    ],
    lessons: {
      en: [
        'Caring about the design of a small project is not wasted time. It set the bar for everything after it.',
        'Writing the state layer by hand once makes every framework afterwards make sense.',
        'Data is only useful if someone can read it on a phone.',
      ],
      el: [
        'Το να νοιαστείς για το design ενός μικρού project δεν είναι χαμένος χρόνος. Έβαλε τον πήχη για όλα τα επόμενα.',
        'Το να γράψεις το state layer στο χέρι μία φορά κάνει κάθε framework μετά να βγάζει νόημα.',
        'Τα δεδομένα είναι χρήσιμα μόνο αν μπορεί κάποιος να τα διαβάσει σε κινητό.',
      ],
    },
    disclaimer: {
      en: 'Built with Tony_Greek. Not affiliated with Rockstar Games. All numbers are measured in-game and vary slightly, because sometimes GTA just GTAs.',
      el: 'Φτιαγμένο μαζί με τον Tony_Greek. Χωρίς σχέση με τη Rockstar Games. Όλα τα νούμερα μετρήθηκαν in-game και ποικίλλουν ελαφρώς, επειδή καμιά φορά το GTA απλώς κάνει GTA.',
    },
    sketch: {
      title: 'GTA Academy — durability index',
      kind: 'browser',
      rows: [
        { label: 'Search', value: 'insur…', hot: true },
        { label: 'Insurgent Pick-Up', value: 'RPG ×6' },
        { label: 'Kuruma (Armored)', value: 'RPG ×3' },
        { label: 'Akula', value: 'Homing ×5' },
        { label: 'Theme', value: 'dark · saved' },
        { label: 'Viewport', value: '320px ok' },
      ],
    },
  },
]
