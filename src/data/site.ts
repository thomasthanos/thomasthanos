import type { L } from './types'

export const site = {
  name: 'Thomas Thanos',
  handle: 'thomasthanos',
  studio: 'kolokithes A.E.',
  role: {
    en: 'Self-Taught Indie Developer',
    el: 'Αυτοδίδακτος Indie Developer',
  } satisfies L,
  location: {
    en: 'Athens, Greece',
    el: 'Αθήνα, Ελλάδα',
  } satisfies L,
  url: 'https://me.thomast.uk',
  github: 'https://github.com/thomasthanos',
  email: 'thomasthanos28@gmail.com',
  discord: 'thomass_28',
  description: {
    en: 'Self-taught indie developer from Athens building browser extensions, Windows utilities, automation tools and other software that removes annoying friction.',
    el: 'Αυτοδίδακτος indie developer από την Αθήνα που φτιάχνει browser extensions, εργαλεία για Windows, automations και άλλο λογισμικό που διώχνει την ενοχλητική τριβή.',
  } satisfies L,
} as const

export interface NavItem {
  to: string
  key: 'home' | 'projects' | 'stack' | 'labs' | 'about' | 'contact'
  /** Shown as a mono index in the nav drawer. */
  index: string
}

export const nav: NavItem[] = [
  { to: '/', key: 'home', index: '01' },
  { to: '/projects', key: 'projects', index: '02' },
  { to: '/stack', key: 'stack', index: '03' },
  { to: '/labs', key: 'labs', index: '04' },
  { to: '/about', key: 'about', index: '05' },
  { to: '/contact', key: 'contact', index: '06' },
]

/** Rotating footer micro-messages. Index is chosen per page load. */
export const footerLines: L[] = [
  { en: 'Code. Coffee. Regret. Repeat.', el: 'Κώδικας. Καφές. Μετάνοια. Επανάληψη.' },
  { en: 'Still probably debugging something.', el: 'Κάτι θα debugάρω κι αυτή την ώρα.' },
  { en: 'No telemetry. I hate telemetry too.', el: 'Μηδέν telemetry. Το μισώ κι εγώ.' },
  { en: 'Built at unreasonable hours.', el: 'Γραμμένο σε ώρες που δεν λέγονται.' },
  { en: 'It worked five minutes ago.', el: 'Πριν πέντε λεπτά δούλευε, τ᾽ ορκίζομαι.' },
  { en: 'Shipped, then immediately refactored.', el: 'Βγήκε, και μετά refactor απ᾽ την αρχή.' },
  { en: 'One more tiny fix and I go to bed.', el: 'Άλλο ένα μικρό fix και πάω για ύπνο.' },
]
