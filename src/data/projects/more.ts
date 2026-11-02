import type { Project } from '@/data/types'

const GH = 'https://github.com/thomasthanos'

export const more: Project[] = [
  {
    slug: 'discord-bot-dashboard',
    name: 'Discord Bot & Dashboard',
    category: 'discord',
    alsoIn: ['web', 'automation'],
    status: 'active',
    accent: 'violet',
    year: '2026 — now',
    version: '1.0.0',
    repo: `${GH}/discord-dashboard-bot`,
    repoLabel: 'discord-dashboard-bot (private)',
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
    disclaimer: {
      en: "Private source repository; GitHub access is restricted. The project uses discord.js v14, Node.js, Express, Socket.IO and SQLite.",
      el: "Ιδιωτικό repository: ο πηγαίος κώδικας δεν είναι δημόσια προσβάσιμος. Υλοποίηση με discord.js v14, Node.js, Express, Socket.IO και SQLite.",
    },
  },

  {
    slug: 'betterdiscord-themes',
    name: 'BetterDiscord Themes & Plugins',
    category: 'discord',
    alsoIn: ['web'],
    status: 'legacy',
    accent: 'violet',
    year: '2022 — now',
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
  {
    slug: 'touch-screen-app',
    name: 'Touch 0.2 · Windows Touch Dashboard',
    category: 'windows',
    alsoIn: ['desktop', 'discord'],
    status: 'experiment',
    accent: 'blue',
    year: '2026 — now',
    version: '0.2.0',
    repo: `${GH}/touch-screen-app`,
    repoLabel: 'touch-screen-app (private)',
    lab: {
      badge: { en: 'In development', el: 'Σε ανάπτυξη' },
      note: { en: 'A private touchscreen dashboard, still being tested on real hardware.', el: 'Ιδιωτικό touchscreen dashboard, σε δοκιμές με πραγματικό hardware.' },
    },
    tech: ['Tauri 2', 'Svelte 5', 'Rust', '.NET 10', 'WebView2', 'LibreHardwareMonitor'],
    short: {
      en: 'Portable Windows dashboard designed for a 7-inch touchscreen, with system monitoring, app launching, game mode and Discord voice controls.',
      el: 'Portable Windows dashboard για οθόνη αφής 7 ιντσών, με hardware monitoring, εκκίνηση apps, game mode και χειριστήρια Discord.',
    },
    summary: {
      en: 'A portable 1024×600 Windows control surface built with Svelte 5 and Tauri 2, with a self-contained .NET 10 monitoring helper. It includes live CPU/GPU/RAM/network readings, customizable app shortcuts and a Discord mixer. Its game mode is designed to avoid stealing focus from the active game.',
      el: 'Portable περιβάλλον ελέγχου Windows 1024×600 με Svelte 5/Tauri 2 και self-contained .NET 10 helper. Περιλαμβάνει αισθητήρες CPU/GPU/RAM/network, συντομεύσεις εφαρμογών και Discord mixer. Το game mode σχεδιάστηκε για να μην αφαιρεί focus από το ενεργό παιχνίδι.',
    },
    features: [
      { title: { en: 'Live hardware readings', el: 'Live μετρήσεις hardware' }, body: { en: 'CPU/GPU temperatures, usage, memory, storage and network sensors through LibreHardwareMonitor.', el: 'Θερμοκρασίες και χρήση CPU/GPU, μνήμη, δίσκοι και δίκτυο μέσω LibreHardwareMonitor.' } },
      { title: { en: 'Touch-first game mode', el: 'Game mode για touch' }, body: { en: 'Separate game/edit modes designed for touch interaction while preserving foreground game focus.', el: 'Ξεχωριστά game/edit modes για χειρισμό αφής χωρίς απώλεια focus από το παιχνίδι.' } },
      { title: { en: 'Discord controls', el: 'Έλεγχος Discord' }, body: { en: 'Optional Discord voice mixer, mute/deafen and BetterDiscord bridge integration.', el: 'Προαιρετικό Discord voice mixer, mute/deafen και BetterDiscord bridge.' } },
    ],
    disclaimer: {
      en: 'Private, work-in-progress repository. Features that depend on real touchscreen hardware or Discord authorization require validation on the target setup; source link is not publicly accessible.',
      el: 'Ιδιωτικό repository σε εξέλιξη. Οι λειτουργίες πραγματικής αφής και Discord authorization απαιτούν δοκιμή στο αντίστοιχο setup· ο κώδικας δεν είναι δημόσιος.',
    },
  },
  {
    slug: 'glass-player',
    name: 'Glass Player',
    category: 'desktop',
    alsoIn: ['windows'],
    status: 'experiment',
    accent: 'violet',
    year: '2026',
    version: '0.1.0',
    repo: `${GH}/svelte-video-player-prompt`,
    repoLabel: 'svelte-video-player-prompt (private)',
    lab: {
      badge: { en: 'Experiment', el: 'Πείραμα' },
      note: { en: 'A private portable player exploring a smaller desktop interface.', el: 'Ιδιωτικός portable player που δοκιμάζει ένα μικρότερο desktop interface.' },
    },
    tech: ['Tauri 2', 'Svelte 5', 'Vite', 'JavaScript', 'WebView2'],
    short: {
      en: 'Lightweight portable Windows video player with a glass-style UI, playlists, subtitle support and playback resume.',
      el: 'Ελαφρύς portable video player για Windows με glass UI, playlists, υπότιτλους και συνέχιση αναπαραγωγής.',
    },
    summary: {
      en: 'A portable Windows media player written with Svelte 5 and Tauri 2. It opens local files or folders, sorts episode playlists naturally, remembers playback positions and automatically finds matching SRT, WebVTT and ASS/SSA subtitles.',
      el: 'Portable media player για Windows με Svelte 5 και Tauri 2. Ανοίγει αρχεία/φακέλους, ταξινομεί επεισόδια, θυμάται το σημείο αναπαραγωγής και αναζητά αυτόματα υπότιτλους SRT, WebVTT και ASS/SSA.',
    },
    features: [
      { title: { en: 'Smart playlists', el: 'Έξυπνες playlists' }, body: { en: 'Folder import, natural episode ordering and drag-and-drop file opening.', el: 'Εισαγωγή φακέλων, φυσική ταξινόμηση επεισοδίων και drag-and-drop.' } },
      { title: { en: 'Resume and subtitles', el: 'Resume και υπότιτλοι' }, body: { en: 'Saved progress and automatic SRT/WebVTT/ASS subtitle matching.', el: 'Αποθηκευμένη πρόοδος και αυτόματη αντιστοίχιση υποτίτλων SRT/WebVTT/ASS.' } },
    ],
    disclaimer: {
      en: 'Private experimental repository. Playback formats depend on codecs supported by the Windows WebView2 runtime; source is not publicly accessible.',
      el: 'Ιδιωτικό πειραματικό repository. Τα formats εξαρτώνται από τους codecs του Windows WebView2· ο κώδικας δεν είναι δημόσιος.',
    },
  },
]
