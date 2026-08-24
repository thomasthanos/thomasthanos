import type { L } from './types'

/**
 * Handwritten margin notes. Kept together so the tone stays consistent and so
 * the font subsetter (tools/subset-hand-font.mjs) has one file to scan for
 * the characters it needs to keep.
 *
 * These are asides in the author's own voice, not translations of each other —
 * the Greek is allowed to be blunter, because that is how it actually sounds.
 */
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
