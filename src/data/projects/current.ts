import type { Project } from '@/data/types'

// Refreshed 2026-10-20 from the source repositories and releases.
// Chrome count/rating: owner-provided developer dashboard screenshot (not weekly activity).
// GitHub stars: live GitHub API snapshot on the same date.
export const currentProjects: Project[] = [
  {
    slug: 'nexusmods-bypass',
    "name": "NexusMods Bypass",
    "category": "browser",
    "alsoIn": [
      "automation"
    ],
    "status": "active",
    "accent": "lime",
    "featured": 1,
    "year": "2026 — now",
    "version": "3.1.9",
    "repo": "https://github.com/thomasthanos/nexusmods-bypass",
    "repoLabel": "nexusmods-bypass",
    "demo": "https://chromewebstore.google.com/detail/nexusmods-bypass/chfghiknjhpcncpcjopglefnckckdlpj",
    "tech": [
      "JavaScript",
      "Manifest V3",
      "Chrome",
      "Firefox 140+",
      "Edge",
      "Nexus API",
      "13 languages"
    ],
    "metrics": [
      {
        "value": "39,972",
        "label": {
          "en": "Chrome users",
          "el": "χρήστες Chrome"
        }
      },
      {
        "value": "142",
        "label": {
          "en": "GitHub stars",
          "el": "GitHub stars"
        }
      },
      {
        "value": "4.84 / 5",
        "label": {
          "en": "Chrome rating",
          "el": "βαθμολογία Chrome"
        }
      }
    ],
    "short": {
      "en": "Queue Nexus Mods collections, send files to Vortex or your browser, and resume interrupted runs. Chrome, Firefox and Edge.",
      "el": "Βάλε Nexus Mods collections στην ουρά, στείλε αρχεία στο Vortex ή στον browser και συνέχισε ό,τι διακόπηκε. Chrome, Firefox και Edge."
    },
    "summary": {
      "en": "A Manifest V3 extension for Chrome, Firefox and Edge that removes repetitive download steps on Nexus Mods. Queue a whole collection or selected files, send them to Vortex or your browser, and use local history to skip what you already sent or downloaded.",
      "el": "Manifest V3 extension για Chrome, Firefox και Edge που αφαιρεί τα επαναλαμβανόμενα βήματα στα downloads του Nexus Mods. Βάζεις ολόκληρο collection ή επιλεγμένα αρχεία στην ουρά, τα στέλνεις στο Vortex ή στον browser και παραλείπεις όσα έχουν ήδη σταλεί ή κατέβει."
    },
    "why": {
      "en": "A collection of 200 mods means repeating the same requirements screens, timers and download clicks 200 times. I wanted the browser to do the repetitive part while keeping control over the files and the download method.",
      "el": "Ένα collection με 200 mods σημαίνει τις ίδιες οθόνες requirements, χρονόμετρα και κλικ στο download 200 φορές. Ήθελα ο browser να κάνει την επανάληψη, με έλεγχο στα αρχεία και στον τρόπο λήψης."
    },
    "what": {
      "en": "Choose Vortex or browser downloads, queue a collection revision, and keep the collection tab open. The background queue handles pacing and retries. A run ends with a sent/skipped/failed summary, retry controls and local history. Version 3.1.9 fixes Vortex handoff and adds optional Mod Organizer 2 metadata.",
      "el": "Διάλεξε Vortex ή browser downloads, βάλε ένα collection revision στην ουρά και κράτα ανοιχτό το tab του collection. Η background ουρά αναλαμβάνει pacing και retries. Στο τέλος βλέπεις sent/skipped/failed, επιλογές επανάληψης και τοπικό ιστορικό. Η 3.1.9 διορθώνει το Vortex handoff και προσθέτει προαιρετικά metadata για Mod Organizer 2."
    },
    "features": [
      {
        "title": {
          "en": "Collection queues",
          "el": "Ουρές collections"
        },
        "body": {
          "en": "Download a whole revision, mandatory or optional files, or your own selection. Choose Vortex or browser downloads for each run.",
          "el": "Κατέβασε ολόκληρο revision, mandatory ή optional αρχεία, ή τη δική σου επιλογή. Διάλεξε Vortex ή browser ανά run."
        }
      },
      {
        "title": {
          "en": "Pacing and retries",
          "el": "Pacing και retries"
        },
        "body": {
          "en": "Configurable delays and rate-limit pauses keep the queue moving. A failed file is reported without stopping the entire collection. Keep its tab open during the run.",
          "el": "Ρυθμιζόμενες καθυστερήσεις και παύσεις για rate limits κρατούν την ουρά σε κίνηση. Ένα αποτυχημένο αρχείο δεν σταματά όλο το collection. Κράτα το tab ανοιχτό όσο τρέχει."
        }
      },
      {
        "title": {
          "en": "Local history and summaries",
          "el": "Τοπικό ιστορικό και σύνοψη"
        },
        "body": {
          "en": "See sent, skipped and failed files, retry failures or copy the list. Vortex handoffs are recorded as sent; the browser cannot confirm that Vortex finished.",
          "el": "Δες sent, skipped και failed αρχεία, επανάλαβε αποτυχίες ή αντέγραψε τη λίστα. Τα Vortex handoffs καταγράφονται ως sent: ο browser δεν επιβεβαιώνει ότι το Vortex ολοκλήρωσε."
        }
      },
      {
        "title": {
          "en": "Official Nexus API",
          "el": "Επίσημο Nexus API"
        },
        "body": {
          "en": "Reads collection, mod and file details through the documented Nexus API using your existing session. Endorse and Track run only when you press their buttons.",
          "el": "Διαβάζει collections, mods και αρχεία από το documented Nexus API με το υπάρχον session σου. Endorse και Track εκτελούνται μόνο όταν πατήσεις τα κουμπιά."
        }
      },
      {
        "title": {
          "en": "Page controls",
          "el": "Έλεγχος της σελίδας"
        },
        "body": {
          "en": "Optional controls collapse ads and Premium panels, skip supported wait steps and restore archived-file download buttons. Features can be switched off individually.",
          "el": "Προαιρετικά controls κρύβουν διαφημίσεις και Premium panels, παρακάμπτουν υποστηριζόμενα βήματα αναμονής και επαναφέρουν download buttons σε archived αρχεία. Κάθε λειτουργία κλείνει ξεχωριστά."
        }
      },
      {
        "title": {
          "en": "Chrome, Firefox and Edge",
          "el": "Chrome, Firefox και Edge"
        },
        "body": {
          "en": "One source produces Chromium and Firefox packages. Firefox requires version 140 or newer; permanent installs use Mozilla Add-ons. Store approvals can trail GitHub releases.",
          "el": "Ένας κώδικας παράγει Chromium και Firefox πακέτα. Ο Firefox απαιτεί έκδοση 140 ή νεότερη· η μόνιμη εγκατάσταση γίνεται από Mozilla Add-ons. Οι εγκρίσεις των stores μπορεί να ακολουθούν τα GitHub releases."
        }
      },
      {
        "title": {
          "en": "13 languages",
          "el": "13 γλώσσες"
        },
        "body": {
          "en": "English, Greek, German, Spanish, French, Italian, Japanese, Korean, Polish, Brazilian Portuguese, Russian, Turkish and Simplified Chinese, plus an Always use English switch.",
          "el": "Αγγλικά, Ελληνικά, Γερμανικά, Ισπανικά, Γαλλικά, Ιταλικά, Ιαπωνικά, Κορεατικά, Πολωνικά, Πορτογαλικά Βραζιλίας, Ρωσικά, Τουρκικά και Απλοποιημένα Κινέζικα, συν διακόπτη Always use English."
        }
      },
      {
        "title": {
          "en": "Wabbajack import · beta",
          "el": "Wabbajack import · beta"
        },
        "body": {
          "en": "Import the Nexus files from a Wabbajack modlist into the queue. This is a beta workflow, not a replacement for the Wabbajack installer.",
          "el": "Εισαγωγή των Nexus αρχείων ενός Wabbajack modlist στην ουρά. Είναι beta λειτουργία, όχι αντικατάσταση του Wabbajack installer."
        }
      },
      {
        "title": {
          "en": "Mod Organizer 2 metadata",
          "el": "Metadata για Mod Organizer 2"
        },
        "body": {
          "en": "Version 3.1.9 can write a .meta file beside each browser collection download with its Nexus mod ID, file ID and version. Off by default.",
          "el": "Η 3.1.9 μπορεί να γράφει ένα .meta δίπλα σε κάθε browser download από collection, με Nexus mod ID, file ID και version. Είναι κλειστό από προεπιλογή."
        }
      },
      {
        "title": {
          "en": "Reports you control",
          "el": "Reports με δική σου επιλογή"
        },
        "body": {
          "en": "Preview the redacted JSON before sending a manual report. Automatic technical error reports and extra diagnostics are separate opt-ins, both off by default.",
          "el": "Δες το JSON αφού αφαιρεθούν ευαίσθητα στοιχεία πριν στείλεις manual report. Τα αυτόματα τεχνικά error reports και τα πρόσθετα diagnostics είναι ξεχωριστές επιλογές, κλειστές από προεπιλογή."
        }
      }
    ],
    "challenges": [
      {
        "title": {
          "en": "The browser cannot see inside Vortex",
          "el": "Ο browser δεν βλέπει μέσα στο Vortex"
        },
        "body": {
          "en": "A link reaching the mod manager is not proof of a finished download. History says sent, and the UI tells you to check Vortex rather than claiming completion.",
          "el": "Ένα link που έφτασε στον mod manager δεν αποδεικνύει ολοκληρωμένο download. Το ιστορικό γράφει sent και το UI σε στέλνει να ελέγξεις το Vortex."
        }
      },
      {
        "title": {
          "en": "A queue that survives interruptions",
          "el": "Μια ουρά που αντέχει διακοπές"
        },
        "body": {
          "en": "The background worker schedules pacing with alarms and persists queue state. Version 3.1.9 also avoids overwriting saved data with defaults when a storage read fails.",
          "el": "Το background worker προγραμματίζει pacing με alarms και αποθηκεύει την κατάσταση της ουράς. Η 3.1.9 αποφεύγει επίσης να γράψει defaults πάνω στα αποθηκευμένα δεδομένα όταν αποτύχει μια ανάγνωση."
        }
      },
      {
        "title": {
          "en": "Changing download responses",
          "el": "Αλλαγές στις απαντήσεις downloads"
        },
        "body": {
          "en": "Nexus may return a link, a sign-in requirement, a browser check or a rate limit. The resolver distinguishes those answers and 3.1.9 restores the normal Vortex handoff.",
          "el": "Το Nexus μπορεί να επιστρέψει link, απαίτηση σύνδεσης, browser check ή rate limit. Ο resolver τα ξεχωρίζει και η 3.1.9 επαναφέρει το κανονικό handoff στο Vortex."
        }
      },
      {
        "title": {
          "en": "Useful diagnostics without analytics",
          "el": "Χρήσιμα diagnostics χωρίς analytics"
        },
        "body": {
          "en": "Manual reports show their payload first. Automatic reporting requires consent, removes sensitive fields, groups repeated faults and can be switched off with its pending queue cleared.",
          "el": "Τα manual reports δείχνουν πρώτα το περιεχόμενό τους. Τα αυτόματα απαιτούν συγκατάθεση, αφαιρούν ευαίσθητα πεδία, ομαδοποιούν επαναλήψεις και κλείνουν καθαρίζοντας την εκκρεμή ουρά."
        }
      }
    ],
    "architecture": [
      {
        "name": {
          "en": "Packaged page code",
          "el": "Κώδικας σελίδας στο πακέτο"
        },
        "items": [
          "shared.js",
          "selectors.js",
          "response-classifier.js",
          "download-url-parser.js",
          "content/storage.js",
          "content/nexus-api.js",
          "content/main.js"
        ],
        "note": {
          "en": "Runs only on www.nexusmods.com. Larger packaged features load on demand through scripting.",
          "el": "Τρέχει μόνο στο www.nexusmods.com. Μεγαλύτερες λειτουργίες του πακέτου φορτώνονται όταν χρειάζονται μέσω scripting."
        }
      },
      {
        "name": {
          "en": "Background queue",
          "el": "Background ουρά"
        },
        "items": [
          "background.js",
          "chrome.alarms",
          "chrome.downloads"
        ],
        "note": {
          "en": "Schedules the queue, starts browser downloads and persists progress. Keep the collection tab open.",
          "el": "Προγραμματίζει την ουρά, ξεκινά browser downloads και αποθηκεύει πρόοδο. Κράτα το tab του collection ανοιχτό."
        }
      },
      {
        "name": {
          "en": "Local data",
          "el": "Τοπικά δεδομένα"
        },
        "items": [
          "chrome.storage.local",
          "settings · history · queue · logs"
        ],
        "note": {
          "en": "No extension account is required. Downloading requires your own Nexus Mods account.",
          "el": "Δεν χρειάζεται λογαριασμός του extension. Για downloads χρειάζεται ο δικός σου λογαριασμός Nexus Mods."
        }
      },
      {
        "name": {
          "en": "Optional report relay",
          "el": "Προαιρετικό report relay"
        },
        "items": [
          "report-page/",
          "auto-reports.js",
          "relay/ · Cloudflare Worker"
        ],
        "note": {
          "en": "Receives reports only after a manual send or explicit automatic-report opt-in.",
          "el": "Λαμβάνει reports μόνο μετά από manual αποστολή ή ρητή ενεργοποίηση αυτόματων reports."
        }
      }
    ],
    "privacy": {
      "en": "Settings, history, queue state and logs stay in local extension storage. Download and API requests go to Nexus Mods. There is no analytics SDK or extension account. Manual reports can be previewed before sending to the maintainer relay; automatic technical error reports are off until you opt in, with extra diagnostics as a separate choice. Reports are redacted, but reporting is not a guarantee of anonymity.",
      "el": "Settings, ιστορικό, κατάσταση ουράς και logs μένουν στο local extension storage. Τα download και API requests πηγαίνουν στο Nexus Mods. Δεν υπάρχει analytics SDK ή λογαριασμός του extension. Τα manual reports προβάλλονται πριν σταλούν στο relay του maintainer· τα αυτόματα τεχνικά reports είναι κλειστά μέχρι να τα ενεργοποιήσεις, με ξεχωριστή επιλογή για πρόσθετα diagnostics. Αφαιρούνται ευαίσθητα στοιχεία, αλλά τα reports δεν εγγυώνται ανωνυμία."
    },
    "impact": {
      "en": "On 20 October 2026, the developer dashboard showed 39,972 Chrome users and a 4.84/5 rating; GitHub showed 142 stars. These are dated snapshots, not weekly activity or a combined count across browsers. GitHub 3.1.9 is available while the submitted store update is under review.",
      "el": "Στις 20 Οκτωβρίου 2026, το developer dashboard έδειχνε 39.972 χρήστες Chrome και βαθμολογία 4,84/5· το GitHub έδειχνε 142 stars. Είναι στιγμιότυπα της ημερομηνίας, όχι εβδομαδιαία δραστηριότητα ή άθροισμα όλων των browsers. Η 3.1.9 είναι διαθέσιμη στο GitHub ενώ το υποβληθέν store update περιμένει έλεγχο."
    },
    "lessons": {
      "en": [
        "Record what the browser can prove: a Vortex handoff is sent, not completed.",
        "Service workers stop and restart. Persist state and schedule work with alarms.",
        "A permission description must match the current implementation: downloads.ui now hides the bubble during a run and restores it afterwards.",
        "Diagnostics should explain failures while leaving the user in control of what gets sent."
      ],
      "el": [
        "Κατάγραψε ό,τι μπορεί να αποδείξει ο browser: ένα Vortex handoff είναι sent, όχι completed.",
        "Τα service workers σταματούν και ξαναξεκινούν. Αποθήκευε κατάσταση και προγραμμάτιζε με alarms.",
        "Η περιγραφή permissions πρέπει να ταιριάζει στον τρέχοντα κώδικα: το downloads.ui κρύβει προσωρινά το bubble και το επαναφέρει μετά.",
        "Τα diagnostics πρέπει να εξηγούν τις αποτυχίες αφήνοντας τον χρήστη να ελέγχει τι στέλνεται."
      ]
    },
    "disclaimer": {
      "en": "Requires your own Nexus Mods account and does not unlock Premium-only content. Not affiliated with, endorsed by or connected to Nexus Mods.",
      "el": "Απαιτεί τον δικό σου λογαριασμό Nexus Mods και δεν ξεκλειδώνει Premium-only περιεχόμενο. Χωρίς σχέση, έγκριση ή σύνδεση με το Nexus Mods."
    },
    "sketch": {
      "title": "Ready Queue — collection revision",
      "kind": "browser",
      "rows": [
        {
          "label": "Skyrim Anniversary Edition · 214 mods",
          "value": "detected",
          "hot": true
        },
        {
          "label": "Method",
          "value": "Send to Vortex"
        },
        {
          "label": "Skip already sent",
          "value": "38 found"
        },
        {
          "label": "Pause between mods",
          "value": "2.5s"
        },
        {
          "label": "Queue progress",
          "bar": 62,
          "value": "133 / 214"
        },
        {
          "label": "Rate limit",
          "value": "ok"
        }
      ]
    }
  },
  {
    slug: 'make-your-life-easier',
    "name": "Make Your Life Easier",
    "category": "windows",
    "alsoIn": [
      "desktop",
      "automation"
    ],
    "status": "active",
    "accent": "violet",
    "featured": 2,
    "year": "2024 — now",
    "version": "10.0.6",
    "repo": "https://github.com/thomasthanos/MYLE",
    "repoLabel": "MYLE",
    "demo": "https://downloads.thomast.uk/MYLE.exe",
    "tech": [
      "Tauri 2",
      "Svelte 5",
      "TypeScript",
      "Rust",
      "WebView2",
      "winget"
    ],
    "metrics": [
      {
        "value": "10.0.6",
        "label": {
          "en": "latest release",
          "el": "νεότερη έκδοση"
        }
      },
      {
        "value": "Tauri 2",
        "label": {
          "en": "rebuilt with Svelte + Rust",
          "el": "ξαναγραμμένο με Svelte + Rust"
        }
      },
      {
        "value": "3",
        "label": {
          "en": "GitHub stars",
          "el": "GitHub stars"
        }
      }
    ],
    "short": {
      "en": "Rebuilt with Tauri, Svelte and Rust. App installs, encrypted passwords, game-save backups, Spotify tools and Windows maintenance in one place.",
      "el": "Ξαναγραμμένο με Tauri, Svelte και Rust. Εγκατάσταση apps, κρυπτογραφημένοι κωδικοί, game-save backups, εργαλεία Spotify και συντήρηση Windows σε ένα μέρος."
    },
    "summary": {
      "en": "The Windows toolkit I use myself, redesigned and recoded from Electron to Tauri 2, Svelte 5 and Rust. Install and update apps, keep passwords, back up game saves, customize Spotify and maintain Windows from one interface. MYLE Passwords also has Android and iPhone builds.",
      "el": "Το Windows toolkit που χρησιμοποιώ ο ίδιος, με redesign και recode από Electron σε Tauri 2, Svelte 5 και Rust. Εγκατάσταση και ενημέρωση apps, κωδικοί, game-save backups, Spotify και συντήρηση Windows από ένα interface. Το MYLE Passwords έχει και builds για Android και iPhone."
    },
    "why": {
      "en": "Windows chores kept sending me between scripts, installers, settings pages and browser tabs. I kept the jobs that mattered, rebuilt the interface in Svelte and moved native work into Rust. The product stayed; the Electron plumbing did not.",
      "el": "Οι αγγαρείες των Windows με έστελναν συνέχεια ανάμεσα σε scripts, installers, settings και browser tabs. Κράτησα τις δουλειές που χρειάζομαι, ξανάχτισα το interface σε Svelte και μετέφερα τις native λειτουργίες σε Rust."
    },
    "what": {
      "en": "A Svelte frontend talks to Rust commands through Tauri. The toolkit combines app installs and updates, an encrypted password vault with browser integration, game-save backups through Ludusavi, Spotify customization, cleanup and system repair. Downloads and app updates are verified before installation.",
      "el": "Ένα Svelte frontend μιλά με Rust commands μέσω Tauri. Το toolkit συνδυάζει εγκατάσταση και updates apps, κρυπτογραφημένο password vault με browser integration, game-save backups μέσω Ludusavi, Spotify customization, καθάρισμα και επισκευή συστήματος. Τα downloads και τα updates ελέγχονται πριν εγκατασταθούν."
    },
    "features": [
      {
        "title": {
          "en": "Install Apps",
          "el": "Install Apps"
        },
        "body": {
          "en": "Search the catalog, install or update apps through winget, and use curated packages for apps outside it. The backend resolves downloads and checks required hashes or publisher signatures.",
          "el": "Αναζήτησε στον κατάλογο και εγκατέστησε ή ενημέρωσε apps μέσω winget ή curated packages. Το backend επιλύει τα downloads και ελέγχει τα απαιτούμενα hashes ή publisher signatures."
        }
      },
      {
        "title": {
          "en": "Game Saves",
          "el": "Game Saves"
        },
        "body": {
          "en": "Ludusavi finds game saves for local ZIP backups. Preview a restore, keep a safety copy and undo the last restore. Scheduled backups can catch up after sleep or sign-in.",
          "el": "Το Ludusavi εντοπίζει game saves για τοπικά ZIP backups. Preview πριν το restore, safety copy και αναίρεση του τελευταίου restore. Τα προγραμματισμένα backups μπορούν να καλύψουν χαμένο run μετά από sleep ή sign-in."
        }
      },
      {
        "title": {
          "en": "Passwords and passkeys",
          "el": "Κωδικοί και passkeys"
        },
        "body": {
          "en": "An encrypted vault for logins, TOTP codes and passkeys, with browser filling and optional encrypted sync. MYLE Passwords shares the vault code on Android and iPhone.",
          "el": "Κρυπτογραφημένο vault για logins, TOTP και passkeys, με browser filling και προαιρετικό encrypted sync. Το MYLE Passwords μοιράζεται τον ίδιο κώδικα vault σε Android και iPhone."
        }
      },
      {
        "title": {
          "en": "Spotify Hub",
          "el": "Spotify Hub"
        },
        "body": {
          "en": "Install and manage Spicetify, customize Spotify or return it to stock from a dedicated page.",
          "el": "Εγκατάσταση και διαχείριση Spicetify, customization του Spotify ή επαναφορά στην αρχική του μορφή από ξεχωριστή σελίδα."
        }
      },
      {
        "title": {
          "en": "Windows optimization",
          "el": "Βελτιστοποίηση Windows"
        },
        "body": {
          "en": "Windows tools and cleanup in dedicated pages, with system maintenance for repairs and network tasks. Tasks request administrator access when needed.",
          "el": "Εργαλεία Windows και καθάρισμα σε ξεχωριστές σελίδες, με system maintenance για επισκευές και δίκτυο. Οι εργασίες ζητούν administrator όταν χρειάζεται."
        }
      },
      {
        "title": {
          "en": "Verified updates",
          "el": "Επαληθευμένα updates"
        },
        "body": {
          "en": "A native setup installs for your account. The updater uses a Cloudflare R2 feed with GitHub Releases as fallback and verifies SHA-256 before applying the update.",
          "el": "Native setup για τον λογαριασμό σου. Ο updater χρησιμοποιεί feed στο Cloudflare R2 με fallback στα GitHub Releases και ελέγχει SHA-256 πριν εφαρμόσει το update."
        }
      }
    ],
    "challenges": [
      {
        "title": {
          "en": "A complete native rewrite",
          "el": "Πλήρες native rewrite"
        },
        "body": {
          "en": "The former Electron renderer/main/preload design became Svelte pages and Rust modules behind Tauri commands. App, setup and mobile vault use distinct shells with shared frontend pieces.",
          "el": "Το παλιό Electron renderer/main/preload έγινε Svelte σελίδες και Rust modules πίσω από Tauri commands. App, setup και mobile vault έχουν διαφορετικά shells με κοινά frontend κομμάτια."
        }
      },
      {
        "title": {
          "en": "Safe restore and backup scheduling",
          "el": "Ασφαλές restore και προγραμματισμός backups"
        },
        "body": {
          "en": "Restores start with a fresh preview and safety copy. Calendar-aware scheduling handles sleep and missed runs without repeatedly backing up the same slot.",
          "el": "Τα restores ξεκινούν με νέο preview και safety copy. Ο προγραμματισμός λαμβάνει υπόψη ημερολόγιο, sleep και χαμένα runs χωρίς να επαναλαμβάνει το ίδιο slot."
        }
      },
      {
        "title": {
          "en": "A narrow native boundary",
          "el": "Στενό native όριο"
        },
        "body": {
          "en": "The app catalog sends IDs to the backend; download URLs and execution details live in the packaged catalog. Rust handles validation and native operations.",
          "el": "Ο κατάλογος στέλνει IDs στο backend· download URLs και λεπτομέρειες εκτέλεσης βρίσκονται στον κατάλογο του πακέτου. Το Rust αναλαμβάνει validation και native λειτουργίες."
        }
      },
      {
        "title": {
          "en": "One vault across platforms",
          "el": "Ένα vault σε διαφορετικές πλατφόρμες"
        },
        "body": {
          "en": "The myle-vault Rust crate shares encryption and sync across Windows and mobile. Platform-specific code handles biometrics, browser filling and native credential integrations.",
          "el": "Το Rust crate myle-vault μοιράζει κρυπτογράφηση και sync σε Windows και mobile. Platform-specific κώδικας αναλαμβάνει biometrics, browser filling και native credential integrations."
        }
      }
    ],
    "architecture": [
      {
        "name": {
          "en": "Frontend",
          "el": "Frontend"
        },
        "items": [
          "frontend/app/ · Svelte 5",
          "TypeScript · Vite",
          "WebView2 on Windows"
        ]
      },
      {
        "name": {
          "en": "Native backend",
          "el": "Native backend"
        },
        "items": [
          "backend/src/ · Rust",
          "Tauri 2 commands",
          "winget · Ludusavi · Windows tools"
        ]
      },
      {
        "name": {
          "en": "Shared vault",
          "el": "Κοινό vault"
        },
        "items": [
          "backend/vault/ · myle-vault",
          "backend/mobile/ · MYLE Passwords",
          "extension/ · browser integration"
        ]
      },
      {
        "name": {
          "en": "Setup and updates",
          "el": "Setup και updates"
        },
        "items": [
          "backend/installer/",
          "SHA-256 verification",
          "R2 feed · GitHub fallback"
        ]
      }
    ],
    "privacy": {
      "en": "Maintenance and backup operations run locally. Signing in and sync are optional; the password vault is encrypted before saving or syncing. Browser filling and mobile credential access are explicit features you enable. Updates and requested downloads contact their providers, and optional cloud sync uses the account service.",
      "el": "Οι εργασίες συντήρησης και backup τρέχουν τοπικά. Η σύνδεση και το sync είναι προαιρετικά· το password vault κρυπτογραφείται πριν αποθηκευτεί ή συγχρονιστεί. Το browser filling και η πρόσβαση credentials στο mobile ενεργοποιούνται από εσένα. Updates και downloads επικοινωνούν με τους παρόχους τους, ενώ το προαιρετικό cloud sync χρησιμοποιεί την υπηρεσία λογαριασμού."
    },
    "lessons": {
      "en": [
        "Keep the useful workflows while replacing the runtime around them.",
        "A native boundary works best when the frontend sends intent and the backend validates the operation.",
        "Backups need a safe restore path, not just a successful ZIP file.",
        "An updater is part of the product: verify what arrives and keep settings through upgrades."
      ],
      "el": [
        "Κράτα τα χρήσιμα workflows όταν αντικαθιστάς το runtime γύρω τους.",
        "Το native όριο δουλεύει καλύτερα όταν το frontend στέλνει πρόθεση και το backend ελέγχει την πράξη.",
        "Τα backups χρειάζονται ασφαλές restore, όχι μόνο επιτυχημένο ZIP.",
        "Ο updater είναι κομμάτι του προϊόντος: έλεγχε τι φτάνει και κράτα τα settings στα upgrades."
      ]
    },
    "sketch": {
      "title": "MYLE · Tauri + Svelte + Rust",
      "kind": "panel",
      "rows": [
        {
          "label": "Install Apps",
          "value": "winget + curated catalog",
          "hot": true
        },
        {
          "label": "Game Saves",
          "value": "Ludusavi · backup / restore"
        },
        {
          "label": "Passwords",
          "value": "encrypted vault"
        },
        {
          "label": "Spotify Hub",
          "value": "Spicetify"
        },
        {
          "label": "Maintenance",
          "value": "Windows tools"
        },
        {
          "label": "Updates",
          "value": "SHA-256 verified"
        }
      ]
    }
  }
]
