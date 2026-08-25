import type { L } from '@/data/types'


export const consoleLines = [
  'Καλώς ήρθες στο console. Το ήξερα ότι θα το άνοιγες.',
  'Τίποτα δεν είναι minified. Διάβασε ό,τι θες.',
  'πούτσες μπλε καραμελέ',
  'Αν είσαι recruiter: γεια, το βιογραφικό είναι τα repositories.',
  'Δοκίμασε ↑ ↑ ↓ ↓ ← → ← → B A. Ή μη. βαριέμαι.',
  'γιο γιο κατσαρίδα με μαγιό σου πήρα 5 ευρώ',
]

export const terminalIdle: L[] = [
  {
    en: 'listening for annoying problems...',
    el: 'ακούω για εκνευριστικά προβλήματα...',
  },
  { en: 'no telemetry running. none ever was.', el: 'telemetry: κανένα. ούτε υπήρξε ποτέ.' },
  {
    en: 'four extensions shipped, zero trackers',
    el: 'τέσσερα extensions έξω, μηδέν trackers',
  },
  { en: 'probably debugging something', el: 'κάτι θα debugάρω αυτή την ώρα' },
  { en: 'coffee: critical', el: 'καφές: επικίνδυνα χαμηλά' },
]

export const terminalChaos: L[] = [
  { en: "let's play GTA", el: 'πάμε GTA' },
  { en: 'I need money', el: 'θέλω λεφτά' },
  { en: 'SpongeBob SquarePants', el: 'Μπομπ Σφουγγαράκης' },
  { en: "I'm bored", el: 'βαριέμαι' },
  { en: 'works on my machine (unverified)', el: 'σε μένα δούλευε (ανεπιβεβαίωτο)' },
  { en: 'blue caramel dicks', el: 'πούτσες μπλε καραμελέ' },
]

export const chaosNotes = [
  { en: 'I need money', el: 'θέλω λεφτά' },
  { en: "I'm bored", el: 'βαριέμαι' },
] as const satisfies readonly L[]

export const statusChips: L[] = [
  { en: 'works on my machine', el: 'σε μένα δούλευε πάντως' },
  { en: 'probably debugging something', el: 'κάτι debugάρω τώρα σίγουρα' },
  {
    en: 'no telemetry, because I hate telemetry too',
    el: 'μηδέν telemetry, γιατί το μισώ κι εγώ',
  },
  { en: 'built at unreasonable hours', el: 'γραμμένο σε ώρες που δεν λέγονται' },
  { en: 'source-available on purpose', el: 'ο κώδικας ανοιχτός, επίτηδες' },
]

export const logoWhispers: L[] = [
  { en: 'kolokithes A.E. — est. whenever', el: 'kolokithes A.E. — ιδρύθηκε κάποια στιγμή' },
  { en: 'come on, asshole', el: 'άντε ρε μαλάκα' },
  { en: 'it is a pumpkin. do not overthink it.', el: 'κολοκύθα είναι. μην το ψειρίζεις.' },
  { en: "let's play GTA", el: 'πάμε GTA' },
]

export const emptyStates: L[] = [
  {
    en: 'Nothing here. Either I have not built it yet or I built it and deleted it in shame.',
    el: 'Άδειο. Ή δεν το έχω φτιάξει ακόμα, ή το έφτιαξα και το έσβησα από ντροπή.',
  },
]

export const notFound = {
  code: '404',
  title: {
    en: 'This route does not exist',
    el: 'Αυτή η σελίδα δεν υπάρχει',
  } satisfies L,
  body: {
    en: 'Which is technically a bug, but not one of mine — unless you got here from a link on this site, in which case it is absolutely one of mine.',
    el: 'Που τεχνικά είναι bug, αλλά όχι δικό μου — εκτός αν ήρθες από link μέσα από το site, οπότε ναι, δικό μου είναι και το παραδέχομαι.',
  } satisfies L,
}

export const konamiMessage: L = {
  en: 'Chaos Mode unlocked. You have too much free time. Respect.',
  el: 'Ξεκλείδωσες το Chaos Mode. Έχεις πάρα πολύ ελεύθερο χρόνο. Σέβομαι.',
}
