import type { L } from './types'

export interface TimelineEntry {
  period: string
  title: L
  body: L
  /** Marks the entries that changed direction rather than just continued it. */
  pivot?: boolean
}

export const timeline: TimelineEntry[] = [
  {
    period: 'before 2018',
    title: { en: 'Taking GTA V apart', el: 'Ξεκοιλιάζοντας το GTA V' },
    body: {
      en: 'Modding through OpenIV — opening archives, swapping assets, breaking the game and putting it back together. No code yet, but the habit of assuming anything can be opened and changed started here.',
      el: 'Modding μέσω OpenIV — άνοιγα archives, άλλαζα assets, χαλούσα το παιχνίδι και μετά το ξανάστηνα. Κώδικα ακόμα δεν έγραφα, αλλά η συνήθεια να θεωρώ ότι το κάθε τι ανοίγει και αλλάζει ξεκίνησε από εκεί.',
    },
  },
  {
    period: '2018 — 2019',
    title: { en: 'BetterDiscord, the hard way', el: 'BetterDiscord, με τον δύσκολο τρόπο' },
    body: {
      en: 'Found BetterDiscord and started tearing into plugins, themes and CSS snippets. Built my first theme by hand, with devtools open and nothing else — no AI tooling, no tutorial that matched what I was doing. Just inspecting, breaking, fixing.',
      el: 'Έπεσα πάνω στο BetterDiscord και άρχισα να ξεσκίζω plugins, themes και CSS snippets. Το πρώτο μου theme το έγραψα με το χέρι, με τα devtools ανοιχτά και τίποτε άλλο — μηδέν AI, κανένα tutorial που να ταιριάζει σε αυτό που έκανα. Σκέτο inspect, σπάσιμο, φτιάξιμο.',
    },
    pivot: true,
  },
  {
    period: '2019 — 2023',
    title: { en: 'GTA RP, and the people writing the scripts', el: 'GTA RP, και οι άνθρωποι που έγραφαν τα scripts' },
    body: {
      en: 'Ended up as staff manager in a Greek GTA RP community with 200,000+ members. The useful part was not the moderation — it was spending years around developers writing server scripts, watching how real systems get built, argued about and fixed under pressure.',
      el: 'Κατέληξα staff manager σε ελληνική κοινότητα GTA RP με 200.000+ μέλη. Το χρήσιμο δεν ήταν το moderation — ήταν τα χρόνια δίπλα σε developers που έγραφαν server scripts, βλέποντας από κοντά πώς χτίζονται, πώς τσακώνονται και πώς φτιάχνονται υπό πίεση τα πραγματικά συστήματα.',
    },
  },
  {
    period: '2023',
    title: { en: 'First repository that stuck', el: 'Το πρώτο repository που κράτησε' },
    body: {
      en: 'Themes and plugins moved onto GitHub and kept getting commits instead of being abandoned. Five themes, six plugins, and the first time maintaining something felt normal rather than heroic.',
      el: 'Τα themes και τα plugins ανέβηκαν στο GitHub και, αντί να τα παρατήσω, συνέχισαν να παίρνουν commits. Πέντε themes, έξι plugins, και η πρώτη φορά που η συντήρηση ενός project μού φάνηκε κανονική δουλειά και όχι κατόρθωμα.',
    },
  },
  {
    period: '2024 — 2025',
    title: { en: 'Design starts to matter', el: 'Το design αρχίζει να μετράει' },
    body: {
      en: 'GTA Academy was the project where I let the interface be the point — CSS, hierarchy, responsiveness, all of it obsessed over. Around the same time Make Your Life Easier turned from a script collection into a real Windows application.',
      el: 'Στο GTA Academy άφησα για πρώτη φορά το interface να είναι το ζητούμενο — CSS, ιεραρχία, responsiveness, εμμονή με όλα. Την ίδια περίοδο το Make Your Life Easier έπαψε να είναι συλλογή από scripts και έγινε κανονική εφαρμογή Windows.',
    },
    pivot: true,
  },
  {
    period: '2026 — now',
    title: { en: 'Shipping things other people use', el: 'Βγάζω πράγματα που χρησιμοποιούν άλλοι' },
    body: {
      en: 'Four browser extensions, three desktop apps, a data tool and a pile of smaller utilities. NexusMods Bypass alone runs for around 8,000 people in a normal week. Everything is source-available, nothing collects anything, and I still fix bugs the same evening someone reports them.',
      el: 'Τέσσερα browser extensions, τρεις desktop εφαρμογές, ένα data tool και ένα σωρό μικρότερα utilities. Μόνο το NexusMods Bypass τρέχει για κάπου 8.000 άτομα σε μια κανονική εβδομάδα. Ο κώδικας όλων είναι ανοιχτός, κανένα δεν μαζεύει δεδομένα, και ακόμα διορθώνω bugs το ίδιο βράδυ που θα μου τα αναφέρει κάποιος.',
    },
  },
]

export interface Principle {
  n: string
  title: L
  body: L
}

export const principles: Principle[] = [
  {
    n: '01',
    title: { en: 'Annoyance is a spec', el: 'Ο εκνευρισμός είναι προδιαγραφή' },
    body: {
      en: 'If something wastes my time, costs unnecessary clicks or is boring to do by hand, that is a complete feature request. Every project here started as an irritation, not an idea.',
      el: 'Αν κάτι μου τρώει χρόνο, θέλει περιττά κλικ ή βαριέμαι θανάσιμα να το κάνω με το χέρι, αυτό για μένα είναι ολοκληρωμένο feature request. Κάθε project εδώ μέσα ξεκίνησε από εκνευρισμό, όχι από ιδέα.',
    },
  },
  {
    n: '02',
    title: { en: 'Then make it look like something', el: 'Και μετά κάν᾽ το να δείχνει κάτι' },
    body: {
      en: 'A utility that looks like a utility gets uninstalled. Half the work on every project here is the interface, and that is not decoration — it is the difference between a script and a tool.',
      el: 'Ένα utility που δείχνει σαν utility το ξεφορτώνεσαι σε δύο μέρες. Το μισό της δουλειάς σε κάθε project εδώ είναι το interface, και αυτό δεν είναι διακόσμηση — είναι η διαφορά ανάμεσα σε ένα script και σε ένα εργαλείο.',
    },
  },
  {
    n: '03',
    title: { en: 'Local first, always', el: 'Πρώτα τοπικά, πάντα' },
    body: {
      en: 'Cloud only when it earns its place, and never as a requirement. Every tool here works fully signed out. The Discord viewer works with the network unplugged, which is a claim you can test.',
      el: 'Cloud μόνο όταν το αξίζει, και ποτέ ως προϋπόθεση. Κάθε εργαλείο εδώ δουλεύει πλήρως χωρίς λογαριασμό. Ο Discord viewer δουλεύει ακόμα και με βγαλμένο το ίντερνετ, και αυτό μπορείς να το τεστάρεις μόνος σου.',
    },
  },
  {
    n: '04',
    title: { en: 'No telemetry, no exceptions', el: 'Χωρίς telemetry, χωρίς εξαιρέσεις' },
    body: {
      en: 'There is no analytics SDK in anything I have published. Not a privacy policy promising restraint — just no code that could do it, in repositories you can read.',
      el: 'Δεν υπάρχει analytics SDK πουθενά σε ό,τι έχω δημοσιεύσει. Όχι πολιτική απορρήτου που υπόσχεται αυτοσυγκράτηση — απλώς δεν υπάρχει γραμμή κώδικα που να μπορεί να το κάνει, και τα repositories είναι εκεί για να το επιβεβαιώσεις.',
    },
  },
  {
    n: '05',
    title: { en: 'Finish it, then keep it alive', el: 'Τελείωσέ το, και κράτα το ζωντανό' },
    body: {
      en: 'Shipping is the easy half. Make Your Life Easier is on its fourth data layer and six hundred-something commits. The unglamorous maintenance is the part that separates a demo from a product.',
      el: 'Το να το βγάλεις είναι το εύκολο μισό. Το Make Your Life Easier πάει στο τέταρτο data layer του και σε εξακόσια και κάτι commits. Η άχαρη συντήρηση είναι αυτό που χωρίζει το demo από το προϊόν.',
    },
  },
  {
    n: '06',
    title: { en: 'Not a guru', el: 'Δεν παίζω τον γκουρού' },
    body: {
      en: 'No architecture titles, no thought leadership, no roadmap slide. Everything I know came from documentation, tutorials, breaking things and fixing them again. I use what gets the job done and I am fine saying I do not know.',
      el: 'Χωρίς τίτλους αρχιτέκτονα, χωρίς thought leadership, χωρίς roadmap slide. Ό,τι ξέρω βγήκε από documentation, tutorials, σπάσιμο πραγμάτων και ξαναφτιάξιμο. Χρησιμοποιώ ό,τι κάνει τη δουλειά και δεν έχω κανένα πρόβλημα να πω «δεν ξέρω».',
    },
  },
]

/** The lead paragraphs on /about. */
export const bio: L[] = [
  {
    en: 'I am a self-taught developer from Athens who builds tools because doing the same thing manually twice feels like a personal insult. Browser extensions, Windows utilities, desktop apps and automations — small software that removes a specific piece of friction and then gets maintained for years, which is the part nobody warns you about.',
    el: 'Είμαι αυτοδίδακτος developer από την Αθήνα και φτιάχνω εργαλεία επειδή το να κάνω το ίδιο πράγμα δεύτερη φορά με το χέρι το παίρνω προσωπικά. Browser extensions, εργαλεία για Windows, desktop apps και automations — μικρά προγράμματα που διώχνουν μια συγκεκριμένη τριβή και μετά τα συντηρώ για χρόνια, που είναι και το κομμάτι για το οποίο δεν σε προειδοποιεί κανείς.',
  },
  {
    en: 'None of it came from a classroom. It came from opening devtools on something that annoyed me, reading documentation until it made sense, breaking it, and fixing it again. That is still exactly how I work, except now the things I break have users.',
    el: 'Τίποτα από αυτά δεν το έμαθα σε αίθουσα. Το έμαθα ανοίγοντας devtools πάνω σε κάτι που με εκνεύριζε, διαβάζοντας documentation μέχρι να βγάλει νόημα, σπάζοντάς το και ξαναφτιάχνοντάς το. Έτσι δουλεύω ακόμα — απλώς τώρα αυτά που σπάω τα χρησιμοποιεί και κόσμος.',
  },
]

/** Short "what I like building" cards on /about. */
export const likes: { title: L; body: L }[] = [
  {
    title: { en: 'Utilities', el: 'Utilities' },
    body: {
      en: 'Small tools that delete repetitive work permanently.',
      el: 'Μικρά εργαλεία που σβήνουν οριστικά μια επαναλαμβανόμενη αγγαρεία.',
    },
  },
  {
    title: { en: 'Automation', el: 'Automation' },
    body: {
      en: 'Anything that saves clicks or removes a workflow I resent.',
      el: 'Ό,τι γλιτώνει κλικ ή διώχνει ένα workflow που δεν αντέχω άλλο.',
    },
  },
  {
    title: { en: 'Browser extensions', el: 'Browser extensions' },
    body: {
      en: 'Improving sites I use every day and do not control.',
      el: 'Να φτιάχνω sites που χρησιμοποιώ κάθε μέρα και δεν ελέγχω.',
    },
  },
  {
    title: { en: 'Windows tools', el: 'Εργαλεία Windows' },
    body: {
      en: 'Optimization, maintenance and quality-of-life for an OS that hides its own features.',
      el: 'Optimization, συντήρηση και quality-of-life για ένα λειτουργικό που κρύβει τα ίδια του τα features.',
    },
  },
  {
    title: { en: 'Discord & community tools', el: 'Discord & community tools' },
    body: {
      en: 'Viewers, dashboards and bots, from years of actually running communities.',
      el: 'Viewers, dashboards και bots, από χρόνια που έτρεχα κανονικές κοινότητες.',
    },
  },
  {
    title: { en: 'Clean UI products', el: 'Προϊόντα με καθαρό UI' },
    body: {
      en: 'Utilities that are visually polished instead of looking like developer tools.',
      el: 'Utilities που δείχνουν προσεγμένα αντί να μοιάζουν με εργαλείο προγραμματιστή του 2009.',
    },
  },
]
