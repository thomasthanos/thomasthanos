import type { Project } from '@/data/types'

const GH = 'https://github.com/thomasthanos'

export const flagship: Project[] = [
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
    repo: `${GH}/nexusmods-bypass`,
    repoLabel: 'nexusmods-bypass',
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
    repo: `${GH}/an1me-extensions/tree/main/an1me-tracker`,
    repoLabel: 'an1me-extensions',
    repoPath: 'an1me-tracker',
    tech: [
      'JavaScript',
      'Manifest V3',
      'Service worker',
      'Firebase',
      'Firestore',
      'GraphQL',
    ],
    metrics: [
      { value: '73', label: { en: 'modules, no bundler', el: 'modules, χωρίς bundler' } },
      { value: '0', label: { en: 'build step', el: 'build step' } },
      { value: '4', label: { en: 'APIs actually called', el: 'APIs που όντως καλούνται' } },
      { value: '0', label: { en: 'analytics, ever', el: 'analytics, ποτέ' } },
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
        title: { en: 'Not counting a scrub as watched', el: 'Το scrub δεν είναι watched' },
        body: {
          en: 'Dragging to the end of a video is not watching it. An episode only completes past 85% of its duration, and only after 120 seconds of real playback have accumulated — with a hard floor of 30 seconds before anything is recorded at all. Those three numbers exist because every one of them was, at some point, the reason a series jumped six episodes on its own.',
          el: 'Το να σύρεις τη μπάρα στο τέλος δεν είναι παρακολούθηση. Ένα επεισόδιο ολοκληρώνεται μόνο πάνω από το 85% της διάρκειας, και μόνο αφού μαζευτούν 120 δευτερόλεπτα πραγματικής αναπαραγωγής — με απόλυτο κατώφλι 30 δευτερολέπτων πριν καταγραφεί οτιδήποτε. Αυτοί οι τρεις αριθμοί υπάρχουν επειδή ο καθένας τους ήταν κάποια στιγμή ο λόγος που μια σειρά πήδηξε μόνη της έξι επεισόδια.',
        },
      },
      {
        title: { en: 'Four APIs, one truth', el: 'Τέσσερα APIs, μία αλήθεια' },
        body: {
          en: 'AniList, Jikan, AniSkip and AnimeFillerList each know the same series under a different name, and the site itself uses a fifth. Nothing blocks the UI on a lookup: entries land incomplete and a repair pass revisits them later. AniList in particular is serialised behind a single queue with a 1.8-second gap, a parsed Retry-After capped at 65 seconds and a 20-second abort, because the alternative is a rate-limit ban halfway through importing a 300-title list.',
          el: 'AniList, Jikan, AniSkip και AnimeFillerList ξέρουν το ίδιο anime με διαφορετικό όνομα το καθένα, και το ίδιο το site χρησιμοποιεί ένα πέμπτο. Τίποτα δεν μπλοκάρει το UI σε lookup: οι εγγραφές μπαίνουν μισοτελειωμένες και ένα repair pass ξαναπερνάει αργότερα. Ειδικά το AniList μπαίνει σε μία σειρά με κενό 1,8 δευτερολέπτου, Retry-After με πλαφόν 65 δευτερολέπτων και abort στα 20, γιατί η εναλλακτική είναι rate-limit ban στη μέση ενός import 300 τίτλων.',
        },
      },
      {
        title: { en: 'Three writers, one library', el: 'Τρεις γράφουν, μία βιβλιοθήκη' },
        body: {
          en: 'The popup, the content script on the watch page and the service worker all write to the same library at the same time — you can finish an episode while the popup is open and a sync is running. Every mutation is a compare-and-swap: it carries the revision it thinks it is editing, and the background rejects it outright if that revision has moved. A stale write comes back as a conflict and re-pulls instead of quietly overwriting the newer state.',
          el: 'Το popup, το content script στη σελίδα παρακολούθησης και ο service worker γράφουν όλοι στην ίδια βιβλιοθήκη ταυτόχρονα — μπορείς να τελειώσεις επεισόδιο με το popup ανοιχτό ενώ τρέχει sync. Κάθε mutation είναι compare-and-swap: κουβαλάει το revision που νομίζει ότι επεξεργάζεται, και το background το απορρίπτει αν αυτό έχει προχωρήσει. Ένα παλιό write γυρνάει ως conflict και ξανατραβάει, αντί να σβήσει σιωπηλά τη νεότερη κατάσταση.',
        },
      },
      {
        title: { en: 'Storage quota', el: 'Όριο storage' },
        body: {
          en: 'A library with hundreds of covers blows straight past the normal extension quota, which is why `unlimitedStorage` is in the manifest. When it still fills up, recovery runs in three escalating passes and deliberately starts with expired caches — wiping fresh ones would only force a full re-fetch and put the pressure straight back. Freshness itself is decided in one 158-line file with no IO in it: six TTLs from 15 minutes for a retryable miss up to 30 days for a series that has finished airing, each invalidated by a schema version.',
          el: 'Μια βιβλιοθήκη με εκατοντάδες covers ξεπερνάει άνετα το κανονικό quota του extension — γι᾽ αυτό υπάρχει `unlimitedStorage` στο manifest. Όταν πάλι γεμίσει, η ανάκτηση τρέχει σε τρία κλιμακούμενα περάσματα και ξεκινάει επίτηδες από τις ληγμένες caches — σβήνοντας τις φρέσκες θα ανάγκαζε πλήρες re-fetch και θα ξαναέφερνε αμέσως την πίεση. Η ίδια η φρεσκάδα κρίνεται σε ένα αρχείο 158 γραμμών χωρίς καθόλου IO: έξι TTL από 15 λεπτά για retryable αστοχία έως 30 μέρες για σειρά που τελείωσε, με schema version να τα ακυρώνει.',
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
        items: ['popup.html', '45 plain script tags', 'stats · goals · achievements'],
        note: {
          en: 'The same document is registered as the side panel, reachable from Chrome’s own menu.',
          el: 'Το ίδιο document είναι δηλωμένο και ως side panel, προσβάσιμο από το μενού του Chrome.',
        },
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
        items: ['Jikan v4 · MAL ids', 'AniSkip v2 · outro', 'AnimeFillerList', 'an1me.to · scrape'],
        note: {
          en: 'These receive a title or an ID. Never your identity. MyAnimeList itself is never contacted — Jikan resolves its IDs.',
          el: 'Παίρνουν τίτλο ή ID. Ποτέ την ταυτότητά σου. Το ίδιο το MyAnimeList δεν καλείται ποτέ — το Jikan βρίσκει τα ID του.',
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
        'Metadata from four APIs will never be clean. A background repair pass beats a blocking lookup every time.',
        'The popup is also registered as the side panel, which costs one line and gives a busy UI somewhere taller to live — but nothing in the code drives it, so it is only ever as discoverable as Chrome’s own menu.',
        'Writing an extension with no build step means the load order is the architecture. A 39-line startup assertion that every namespace exists is not paranoia when nothing else will catch a bad script tag.',
      ],
      el: [
        'Το προαιρετικό sync αξίζει την πολυπλοκότητα. Αν το sign-in ήταν υποχρεωτικό θα έχανα περισσότερους χρήστες απ᾽ όσους κέρδιζε το feature.',
        'Τα metadata από τέσσερα APIs δεν θα είναι ποτέ καθαρά. Ένα repair pass στο παρασκήνιο κερδίζει πάντα από ένα blocking lookup.',
        'Το popup είναι δηλωμένο και ως side panel — κοστίζει μία γραμμή και δίνει σε ένα φορτωμένο UI κάπου πιο ψηλά να ζήσει. Απλώς τίποτα στον κώδικα δεν το ανοίγει, οπότε είναι τόσο ευδιάκριτο όσο και το μενού του Chrome.',
        'Χωρίς build step, η σειρά φόρτωσης είναι η αρχιτεκτονική. Ένα startup assertion 39 γραμμών που ελέγχει ότι κάθε namespace υπάρχει δεν είναι παράνοια όταν τίποτα άλλο δεν πρόκειται να πιάσει ένα λάθος script tag.',
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

  {
    slug: 'discord-package-viewer',
    name: 'Discord Package Viewer',
    codename: 'Discord Archive Viewer v4',
    category: 'discord',
    alsoIn: ['automation', 'desktop'],
    status: 'maintained',
    accent: 'blue',
    featured: 4,
    year: '2026 — now',
    repo: `${GH}/discord_package_viewer`,
    repoLabel: 'discord_package_viewer',
    tech: ['Python', 'HTML', 'CSS', 'JavaScript', 'CustomTkinter', 'PyInstaller'],
    metrics: [
      { value: '20', label: { en: 'export loaders', el: 'loaders του export' } },
      { value: '1', label: { en: 'self-contained HTML', el: 'αυτόνομο HTML' } },
      { value: '0', label: { en: 'uploads', el: 'uploads' } },
      { value: '100%', label: { en: 'local processing', el: 'τοπική επεξεργασία' } },
    ],
    short: {
      en: 'Turns your Discord data export into one offline HTML archive with search, charts and a word cloud. No server, no account, nothing uploaded anywhere.',
      el: 'Παίρνει το Discord data export σου και το κάνει ένα offline HTML με αναζήτηση, γραφήματα και word cloud. Μηδέν server, μηδέν λογαριασμός, τίποτα δεν ανεβαίνει πουθενά.',
    },
    summary: {
      en: 'When you request your data from Discord you get a ZIP full of JSON that no human was meant to read. This turns that ZIP into a single discord_viewer.html you open in any browser — every DM, every server channel, your statistics, and the parts of the export nobody ever scrolls to. Because reading four years of your own messages in Notepad is not a personality trait.',
      el: 'Όταν ζητάς τα δεδομένα σου από το Discord παίρνεις ένα ZIP γεμάτο JSON που δεν προοριζόταν για ανθρώπινα μάτια. Αυτό το κάνει ένα discord_viewer.html που ανοίγει σε οποιονδήποτε browser — κάθε DM, κάθε server channel, τα στατιστικά σου, και τα κομμάτια του export που δεν σκρολάρει ποτέ κανείς. Επειδή το να διαβάζεις τέσσερα χρόνια δικών σου μηνυμάτων στο Notepad δεν είναι προσωπικότητα.',
    },
    why: {
      en: 'Every online "Discord package viewer" asks you to upload the single most personal file you own to a stranger\'s server. Four years of private messages, your payment history and your IP log, handed to a domain you found on Google. That is an absurd trade for a bit of convenience, so this one runs on your machine and the ZIP never moves.',
      el: 'Κάθε online "Discord package viewer" σου ζητάει να ανεβάσεις το πιο προσωπικό αρχείο που έχεις στον server ενός αγνώστου. Τέσσερα χρόνια προσωπικά μηνύματα, το ιστορικό πληρωμών σου και το log των IP σου, δώρο σε ένα domain που βρήκες στο Google. Παράλογη ανταλλαγή για λίγη ευκολία, οπότε αυτό τρέχει στο μηχάνημά σου και το ZIP δεν κουνιέται από τη θέση του.',
    },
    what: {
      en: 'You point it at the ZIP and it hands back one HTML file: every DM and server channel with Discord markdown, spoilers, mentions, custom emoji and attachments rendered properly, plus charts, a word cloud, and twenty different sections of the export decoded — including the ones Discord would rather you skimmed, like what its ad system thinks you are into.',
      el: 'Του δείχνεις το ZIP και σου δίνει ένα HTML αρχείο: κάθε DM και server channel με σωστό Discord markdown, spoilers, mentions, custom emoji και attachments, συν γραφήματα, word cloud, και είκοσι διαφορετικά κομμάτια του export αποκωδικοποιημένα — μαζί με αυτά που το Discord θα προτιμούσε να προσπεράσεις, όπως το τι νομίζει το διαφημιστικό του σύστημα ότι σου αρέσει.',
    },
    features: [
      {
        title: { en: 'Every message, rendered like Discord', el: 'Κάθε μήνυμα, σαν Discord' },
        body: {
          en: 'All DMs and server channels, with markdown, spoilers, @mentions resolved to real names, custom emoji and attachments. Consecutive messages from the same author group under one avatar, exactly like the client you already know.',
          el: 'Όλα τα DM και τα server channels, με markdown, spoilers, @mentions που γίνονται κανονικά ονόματα, custom emoji και attachments. Τα διαδοχικά μηνύματα του ίδιου ατόμου μπαίνουν κάτω από ένα avatar, ακριβώς όπως στον client που ήδη ξέρεις.',
        },
      },
      {
        title: { en: 'Media, and an honest grave for the rest', el: 'Media, και τίμιος τάφος για τα υπόλοιπα' },
        body: {
          en: 'A hand-written video player with fullscreen and picture-in-picture, an audio player for voice messages, an image lightbox, and Tenor thumbnails fetched during generation. Discord attachment links expire; when one is dead the viewer says so and offers the original URL instead of showing a broken frame.',
          el: 'Video player γραμμένος στο χέρι με fullscreen και picture-in-picture, audio player για voice messages, lightbox για εικόνες, και Tenor thumbnails που κατεβαίνουν κατά τη δημιουργία. Τα attachment links του Discord λήγουν· όταν ένα είναι νεκρό, ο viewer το λέει και σου δίνει το αρχικό URL αντί για σπασμένο πλαίσιο.',
        },
      },
      {
        title: { en: 'Statistics you did not ask for', el: 'Στατιστικά που δεν ζήτησες' },
        body: {
          en: 'Hourly, daily and all-time activity charts, top emoji, most active servers, top DM contacts, and a word cloud of the forty words you actually type. It will tell you your peak messaging hour. You will not enjoy it.',
          el: 'Γραφήματα δραστηριότητας ανά ώρα, ανά μέρα και συνολικά, top emoji, πιο ενεργοί servers, top DM επαφές, και word cloud με τις σαράντα λέξεις που όντως γράφεις. Θα σου πει και την ώρα αιχμής σου. Δεν θα σου αρέσει.',
        },
      },
      {
        title: { en: 'Search and date filtering', el: 'Αναζήτηση και φίλτρα ημερομηνίας' },
        body: {
          en: 'Instant highlighted search across the channel you have open, with next/previous jumps and a match counter, plus a date-range picker — calendar and all — written from scratch because the native one does not exist in a file with no framework.',
          el: 'Άμεση αναζήτηση με highlight μέσα στο κανάλι που έχεις ανοιχτό, με next/previous και μετρητή αποτελεσμάτων, συν date-range picker — με ημερολόγιο — γραμμένος από το μηδέν, γιατί το native δεν υπάρχει σε ένα αρχείο χωρίς framework.',
        },
      },
      {
        title: { en: 'The parts of the export nobody reads', el: 'Τα κομμάτια που δεν διαβάζει κανείς' },
        body: {
          en: 'Account creation date, badges, devices and IP sessions, Nitro history, payments, linked accounts, quests, developer apps, support tickets, past data requests — and `Ads/traits.json`, the file where Discord keeps its guesses about who you are.',
          el: 'Ημερομηνία δημιουργίας, badges, συσκευές και IP sessions, ιστορικό Nitro, πληρωμές, συνδεδεμένοι λογαριασμοί, quests, developer apps, support tickets, παλιά αιτήματα δεδομένων — και το `Ads/traits.json`, το αρχείο όπου το Discord κρατάει τις εικασίες του για το ποιος είσαι.',
        },
      },
      {
        title: { en: 'Survives a genuinely huge export', el: 'Αντέχει τεράστιο export' },
        body: {
          en: 'Channels render 250 messages at a time and older pages arrive in 200-message chunks across animation frames, so the tab keeps breathing. Scroll position is anchored on load so the page never yanks under your thumb, and a progress strip shows what is happening.',
          el: 'Τα κανάλια κάνουν render 250 μηνύματα τη φορά και οι παλιότερες σελίδες έρχονται σε κομμάτια των 200 ανά animation frame, ώστε το tab να συνεχίζει να αναπνέει. Η θέση του scroll κρατιέται σταθερή στη φόρτωση για να μη σου φεύγει η σελίδα κάτω από το δάχτυλο, και μια μπάρα δείχνει τι γίνεται.',
        },
      },
      {
        title: { en: 'Two languages, and a check before you waste ten minutes', el: 'Δύο γλώσσες, κι ένας έλεγχος πριν χάσεις δέκα λεπτά' },
        body: {
          en: 'The generated viewer switches between English and Greek at runtime. The desktop app peeks inside the ZIP first and refuses politely if your export was downloaded in another language, because the folder names change and everything downstream would break.',
          el: 'Ο viewer που παράγεται αλλάζει ανάμεσα σε Αγγλικά και Ελληνικά την ώρα που τρέχει. Η εφαρμογή κοιτάζει πρώτα μέσα στο ZIP και αρνείται ευγενικά αν το export σου κατέβηκε σε άλλη γλώσσα, γιατί αλλάζουν τα ονόματα των φακέλων και σπάει ό,τι ακολουθεί.',
        },
      },
    ],
    challenges: [
      {
        title: { en: 'Years of messages, one page, one thread', el: 'Χρόνια μηνυμάτων, μία σελίδα, ένα thread' },
        body: {
          en: 'A large export is hundreds of thousands of messages, and putting them all in the DOM freezes the tab. Each channel is embedded as its own `application/json` block and parsed only when opened, older pages arrive in 200-message chunks across animation frames, and the scroll height difference is re-applied so nothing moves under what you were reading.',
          el: 'Ένα μεγάλο export είναι εκατοντάδες χιλιάδες μηνύματα, και το να τα ρίξεις όλα στο DOM παγώνει το tab. Κάθε κανάλι μπαίνει ως δικό του `application/json` block και γίνεται parse μόνο όταν το ανοίξεις, οι παλιότερες σελίδες έρχονται ανά 200 σε κάθε frame, και η διαφορά ύψους ξαναμπαίνει ώστε να μη σου κουνιέται αυτό που διαβάζεις.',
        },
      },
      {
        title: { en: 'Not running out of RAM while writing the file', el: 'Να μη σκάσει η RAM όσο γράφεται το αρχείο' },
        body: {
          en: 'Serialising every message at once meant holding the whole archive twice — once as Python objects, once as a JSON string. Channels are now popped from the dictionary as they are encoded, and the HTML streams straight to disk instead of being returned as one enormous string.',
          el: 'Το να σειριοποιείς όλα τα μηνύματα μαζί σήμαινε ότι κρατάς το αρχείο δύο φορές — μία ως Python objects και μία ως JSON string. Τώρα τα κανάλια βγαίνουν από το dictionary καθώς κωδικοποιούνται, και το HTML γράφεται κατευθείαν στον δίσκο αντί να επιστρέφεται ως ένα τεράστιο string.',
        },
      },
      {
        title: { en: 'Discord markdown is not markdown', el: 'Το Discord markdown δεν είναι markdown' },
        body: {
          en: 'Spoilers, custom emoji IDs, channel links and `<@123…>` mentions each need their own rules, and the export is raw text with none of the client context. Mentions resolve against a table built from your relationships list, so a DM reads with names instead of eighteen-digit numbers.',
          el: 'Spoilers, IDs για custom emoji, channel links και `<@123…>` mentions θέλουν το καθένα δικούς του κανόνες, και το export είναι σκέτο κείμενο χωρίς τα συμφραζόμενα του client. Τα mentions λύνονται με πίνακα από τη λίστα επαφών σου, ώστε ένα DM να διαβάζεται με ονόματα αντί για δεκαοκταψήφιους αριθμούς.',
        },
      },
      {
        title: { en: 'A rate limiter that must never hang the build', el: 'Rate limiter που δεν πρέπει να κολλήσει το build' },
        body: {
          en: 'Tenor thumbnails are fetched in parallel: fifty workers, four attempts each, exponential backoff with jitter on HTTP 429, and a hard 120-second cap after which pending work is cancelled outright. A flaky network costs you a few GIF previews, never the archive.',
          el: 'Τα Tenor thumbnails κατεβαίνουν παράλληλα: πενήντα workers, τέσσερις προσπάθειες το καθένα, exponential backoff με jitter στο HTTP 429, και σκληρό όριο 120 δευτερολέπτων μετά το οποίο ό,τι εκκρεμεί ακυρώνεται. Ένα προβληματικό δίκτυο σου κοστίζει μερικά GIF previews, ποτέ το αρχείο.',
        },
      },
    ],
    architecture: [
      {
        name: { en: 'Input', el: 'Είσοδος' },
        items: ['Discord data package (.zip)', 'Account/user.json', 'Messages/index.json', 'Servers/ · Activity/ · Ads/'],
        note: {
          en: 'Extracted in place, unwrapped if the ZIP has a single top folder, and rejected early if the two files it needs are missing.',
          el: 'Γίνεται extract επιτόπου, ξετυλίγεται αν το ZIP έχει έναν φάκελο-περιτύλιγμα, και απορρίπτεται νωρίς αν λείπουν τα δύο αρχεία που χρειάζεται.',
        },
      },
      {
        name: { en: 'Generator', el: 'Generator' },
        items: ['generate_discord_viewer.py', '20 loaders · stdlib only', 'ThreadPoolExecutor · Tenor', 'CustomTkinter GUI · PyInstaller'],
        note: {
          en: 'The command-line path imports nothing outside the standard library. The desktop window adds CustomTkinter, and the shipped .exe bundles it so nobody has to install Python.',
          el: 'Το command-line μονοπάτι δεν κάνει import τίποτα εκτός standard library. Το παράθυρο προσθέτει CustomTkinter, και το .exe το κουβαλάει μέσα του ώστε να μη χρειαστεί κανείς να εγκαταστήσει Python.',
        },
      },
      {
        name: { en: 'Output', el: 'Έξοδος' },
        items: ['discord_viewer.html', 'inlined CSS + JS', 'per-channel JSON blocks', 'EN / EL runtime toggle'],
        note: {
          en: 'One file, written straight to disk, opened by double-clicking it.',
          el: 'Ένα αρχείο, γραμμένο κατευθείαν στον δίσκο, που ανοίγει με διπλό κλικ.',
        },
      },
    ],
    privacy: {
      en: 'The generator runs entirely on your machine and never sends your data anywhere — no server, no account, no telemetry, nothing uploaded. The page it writes reaches out to exactly four hosts, none of which receive anything about you: Google Fonts for the typeface, the Discord CDN for custom emoji and server icons by ID, Tenor for GIF thumbnails already resolved during generation, and jsDelivr for the charting library. Pull the network cable and every message, every filter and the word cloud still work; the activity charts are the one thing that will not draw.',
      el: 'Ο generator τρέχει εξ ολοκλήρου στο μηχάνημά σου και δεν στέλνει ποτέ τα δεδομένα σου πουθενά — χωρίς server, χωρίς λογαριασμό, χωρίς telemetry, χωρίς κανένα upload. Η σελίδα που γράφει επικοινωνεί με ακριβώς τέσσερις hosts, και κανένας τους δεν μαθαίνει τίποτα για σένα: Google Fonts για τη γραμματοσειρά, το CDN του Discord για custom emoji και server icons ανά ID, το Tenor για GIF thumbnails που έχουν ήδη λυθεί κατά τη δημιουργία, και το jsDelivr για τη βιβλιοθήκη γραφημάτων. Βγάλε το καλώδιο του δικτύου και κάθε μήνυμα, κάθε φίλτρο και το word cloud δουλεύουν κανονικά· τα γραφήματα δραστηριότητας είναι το μόνο που δεν θα ζωγραφιστεί.',
    },
    lessons: {
      en: [
        'The strongest privacy claim is one you can demonstrate: unplug the network and almost the whole archive still works. Almost — and saying which part does not is worth more than pretending.',
        'One CDN link is how a genuinely offline file stops being offline. It bought me nice charts and cost me the clean version of the sentence.',
        'Rendering is a budget, not a loop. Two hundred messages per animation frame with the scroll height re-anchored beats any amount of clever virtualisation I could have hand-rolled.',
        'Ship the .exe. Asking someone who just wants to read their own DMs to install Python is where a good tool goes to die.',
      ],
      el: [
        'Ο πιο δυνατός ισχυρισμός για privacy είναι αυτός που αποδεικνύεται: βγάζεις το δίκτυο και σχεδόν όλο το αρχείο δουλεύει. Σχεδόν — και το να λες ποιο κομμάτι δεν δουλεύει αξίζει περισσότερο από το να το κρύβεις.',
        'Ένα CDN link είναι αρκετό για να πάψει να είναι offline ένα offline αρχείο. Μου αγόρασε ωραία γραφήματα και μου κόστισε την καθαρή εκδοχή της πρότασης.',
        'Το rendering είναι budget, όχι loop. Διακόσια μηνύματα ανά animation frame με ξανα-καρφωμένο scroll κερδίζουν κάθε έξυπνο virtualisation που θα έγραφα στο χέρι.',
        'Δώσε το .exe. Το να ζητάς από κάποιον που θέλει απλώς να διαβάσει τα DM του να εγκαταστήσει Python είναι εκεί που πεθαίνει ένα καλό εργαλείο.',
      ],
    },
    disclaimer: {
      en: 'Not affiliated with Discord. It reads the official data package Discord gives you, on your own machine, and nothing else — there is no login, no token and no API call to Discord anywhere in it.',
      el: 'Καμία σχέση με το Discord. Διαβάζει το επίσημο data package που σου δίνει το Discord, στο δικό σου μηχάνημα, και τίποτε άλλο — δεν υπάρχει login, token ή κλήση στο API του Discord πουθενά μέσα.',
    },
    sketch: {
      title: 'discord_viewer.html — file://',
      kind: 'browser',
      rows: [
        { label: 'Channels indexed', value: '412', hot: true },
        { label: 'Messages parsed', value: '286,431' },
        { label: 'Top word', value: '"lol" · 4,112×' },
        { label: 'Peak hour', value: '02:00 — 03:00' },
        { label: 'Uploaded anywhere', value: 'no' },
        { label: 'Writing archive', bar: 88 },
      ],
    },
  },

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
      'esbuild',
      'Tailwind',
      'steamworks.js',
    ],
    metrics: [
      { value: '36', label: { en: 'TypeScript files', el: 'αρχεία TypeScript' } },
      { value: '3', label: { en: 'build targets, one command', el: 'build targets, μία εντολή' } },
      { value: '1', label: { en: 'child process per game', el: 'διεργασία ανά παιχνίδι' } },
      { value: '0', label: { en: 'passwords, ever', el: 'κωδικοί, ποτέ' } },
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
          en: 'Idle one or many titles for playtime without launching the actual games. Each title gets its own child process with `SteamAppId` set, and `sw.init(appId)` is what makes Steam advertise it as currently playing.',
          el: 'Idle σε ένα ή πολλά παιχνίδια για playtime, χωρίς να ανοίγουν τα ίδια τα παιχνίδια. Κάθε τίτλος παίρνει δική του child process με `SteamAppId`, και το `sw.init(appId)` είναι αυτό που κάνει το Steam να το δείχνει ως currently playing.',
        },
      },
      {
        title: { en: 'Auto-invisible', el: 'Auto-invisible' },
        body: {
          en: 'Flips your Steam presence to invisible for the duration of a session and puts it back afterwards. The switch goes through the `steam://` URL protocol — handled by the Steam client already running on the machine — so it costs no network traffic and cannot collide with the worker’s session. Your previous state is read from `localconfig.vdf` first and written to disk, so a crash still restores the right one.',
          el: 'Γυρνάει το Steam presence σε invisible όσο κρατάει το session και το επαναφέρει μετά. Η αλλαγή περνάει από το πρωτόκολλο `steam://` — το χειρίζεται ο ίδιος ο Steam client που ήδη τρέχει — οπότε δεν κοστίζει καθόλου δικτυακή κίνηση και δεν μπορεί να συγκρουστεί με το session του worker. Η προηγούμενη κατάστασή σου διαβάζεται πρώτα από το `localconfig.vdf` και γράφεται στον δίσκο, ώστε ακόμα και ένα crash να επαναφέρει τη σωστή.',
        },
      },
      {
        title: { en: 'Sign-in without a password', el: 'Σύνδεση χωρίς κωδικό' },
        body: {
          en: 'Two ways in, neither of which is a password: scan a QR code with the Steam mobile app through `steam-session`, or paste a refresh token. The app only ever holds a token, so there is no password for it to mishandle.',
          el: 'Δύο τρόποι εισόδου, κανένας τους κωδικός: σκανάρεις QR code με την εφαρμογή Steam στο κινητό μέσω `steam-session`, ή κάνεις paste ένα refresh token. Η εφαρμογή κρατάει μόνο token, οπότε δεν υπάρχει κωδικός για να τον κακοδιαχειριστεί.',
        },
      },
      {
        title: { en: 'Your library, without an API key', el: 'Η βιβλιοθήκη σου, χωρίς API key' },
        body: {
          en: 'The game list is read straight off disk from the `steamapps/*.acf` manifests across every library folder, parsed with a hand-written reader for Valve’s KeyValue format. Steam itself is found through the Windows registry, with common install paths as a fallback.',
          el: 'Η λίστα παιχνιδιών διαβάζεται κατευθείαν από τον δίσκο, από τα manifests `steamapps/*.acf` σε κάθε φάκελο βιβλιοθήκης, με parser γραμμένο στο χέρι για τη μορφή KeyValue της Valve. Το ίδιο το Steam εντοπίζεται μέσω του registry των Windows, με τα συνηθισμένα paths ως εφεδρεία.',
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
          en: 'A dedicated setup screen and `steamPaths` resolution handle the case where Steam is installed somewhere unusual or not running at all, instead of showing an empty list and a shrug. Auto-idle waits for the Steam process to actually appear before it starts, rather than assuming it is there.',
          el: 'Μια ειδική οθόνη setup και η επίλυση `steamPaths` καλύπτουν την περίπτωση που το Steam είναι εγκατεστημένο κάπου παράξενα ή δεν τρέχει καθόλου, αντί για άδεια λίστα και σήκωμα ώμων. Το auto-idle περιμένει να εμφανιστεί όντως η διεργασία του Steam πριν ξεκινήσει, αντί να θεωρεί ότι είναι εκεί.',
        },
      },
      {
        title: { en: 'Fifteen seconds of being visible', el: 'Δεκαπέντε δευτερόλεπτα ορατός' },
        body: {
          en: 'Going invisible has to win a race against your own workers. If auto-idle spawned before the account session was up, the presence switch arrived two to fifteen seconds late — long enough for everyone to watch you come online playing four games at once. The startup sequence is now explicitly ordered: wait for Steam, log in, only then start idling, so the switch fires before the first worker announces itself. Shutdown runs the same logic backwards — restore presence first, while the session is still alive, and stop the workers after.',
          el: 'Το να γίνεις invisible πρέπει να κερδίσει μια κούρσα απέναντι στους ίδιους σου τους workers. Αν το auto-idle ξεκινούσε πριν σηκωθεί το session του λογαριασμού, η αλλαγή παρουσίας ερχόταν δύο έως δεκαπέντε δευτερόλεπτα αργότερα — αρκετά ώστε να σε δουν όλοι να μπαίνεις online παίζοντας τέσσερα παιχνίδια μαζί. Η ακολουθία εκκίνησης είναι πλέον ρητά διατεταγμένη: περίμενε το Steam, κάνε login, και μόνο τότε ξεκίνα idle, ώστε η αλλαγή να προλάβει τον πρώτο worker. Ο τερματισμός τρέχει την ίδια λογική ανάποδα — πρώτα επαναφορά παρουσίας όσο ζει ακόμα το session, και μετά σταμάτημα των workers.',
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
          'steam/workerPath.ts',
        ],
        note: {
          en: 'The worker is bundled separately, unpacked out of the asar, and talks to the main process over newline-delimited JSON on stdin and stdout.',
          el: 'Ο worker γίνεται bundle χωριστά, βγαίνει έξω από το asar, και μιλάει με τον main process με JSON ανά γραμμή σε stdin και stdout.',
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
          'pages/PortfolioPage',
        ],
        note: {
          en: '5,205 of the 9,711 lines live here. React, Tailwind and Framer Motion are dev dependencies — the renderer is bundled by Vite, so only the main process ships its packages.',
          el: '5.205 από τις 9.711 γραμμές είναι εδώ. React, Tailwind και Framer Motion είναι dev dependencies — ο renderer γίνεται bundle από το Vite, οπότε μόνο ο main process κουβαλάει πακέτα.',
        },
      },
    ],
    lessons: {
      en: [
        'Put anything native in its own process. The first version crashed the window; the second one only ever loses a worker.',
        'A single shared `types.ts` across main, preload and renderer catches more IPC bugs than any amount of runtime validation.',
        'Reach for the mechanism already running on the machine before you open a second connection to the same service. Switching presence through the `steam://` protocol is free and never conflicts; doing it over a second session cost me the worker every time.',
        'Ordering is a feature. Half the bugs worth writing down here were not wrong logic, they were the right logic in the wrong sequence.',
      ],
      el: [
        'Βάλε ό,τι είναι native σε δική του διεργασία. Η πρώτη έκδοση έριχνε το παράθυρο· η δεύτερη το πολύ χάνει έναν worker.',
        'Ένα κοινό `types.ts` σε main, preload και renderer πιάνει περισσότερα IPC bugs από οποιοδήποτε runtime validation.',
        'Πριν ανοίξεις δεύτερη σύνδεση στην ίδια υπηρεσία, δες τι τρέχει ήδη στο μηχάνημα. Η αλλαγή παρουσίας μέσω `steam://` είναι δωρεάν και δεν συγκρούεται ποτέ· μέσω δεύτερου session μου κόστιζε τον worker κάθε φορά.',
        'Η σειρά είναι feature. Τα μισά bugs που άξιζε να γραφτούν εδώ δεν ήταν λάθος λογική, ήταν η σωστή λογική με λάθος σειρά.',
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
