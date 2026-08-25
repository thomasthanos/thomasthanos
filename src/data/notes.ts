import type { L } from '@/data/types'

export const notes = {
  heroTerminal: {
    en: 'works on my machine',
    el: 'σε μένα δούλευε πάντως',
  },
  featured: {
    en: 'people actually use these',
    el: 'αυτά τα κατεβάζει κόσμος',
  },
  projectsCount: {
    en: 'yes, I counted them',
    el: 'τα μέτρησα, μη ρωτάς',
  },
  stackNoBars: {
    en: 'skill bars? no thanks',
    el: 'μπάρες δεξιοτήτων; μαλακίες',
  },
  labsWarning: {
    en: 'lower your expectations',
    el: 'κατέβασε λίγο τον πήχη',
  },
  aboutNoDegrees: {
    en: 'no degrees, just late nights',
    el: 'μηδέν πτυχία, άπειρα ξενύχτια',
  },
  contactSend: {
    en: 'go on then, send it',
    el: 'άντε ρε μαλάκα, στείλε',
  },
  menu: {
    en: 'six pages. that is the whole site',
    el: 'έξι σελίδες. αυτό είναι όλο το site',
  },
} as const satisfies Record<string, L>
