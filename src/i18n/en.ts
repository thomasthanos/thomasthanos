export const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    stack: 'Stack',
    labs: 'Labs',
    about: 'About',
    contact: 'Contact',
    github: 'GitHub',
    menu: 'Menu',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
    primary: 'Primary',
    hint: {
      home: 'start here',
      projects: 'everything that shipped',
      stack: 'tools of the trade',
      labs: 'the half-finished half',
      about: 'who is typing',
      contact: 'say something',
    },
  },

  common: {
    viewProject: 'View project',
    viewAll: 'All projects',
    allProjects: 'Browse all projects',
    repository: 'Repository',
    liveDemo: 'Live demo',
    copy: 'Copy',
    copied: 'Copied',
    next: 'Next',
    previous: 'Previous',
    backToProjects: 'Back to projects',
    backToTop: 'Back to top',
    skipToContent: 'Skip to content',
    loading: 'Loading',
    showMore: 'Show more',
    swipe: 'Swipe',
    year: 'Year',
    external: 'opens in a new tab',
  },

  status: {
    active: 'Active',
    maintained: 'Maintained',
    shipped: 'Shipped',
    experiment: 'Experiment',
    legacy: 'Legacy',
  },

  category: {
    all: 'All',
    browser: 'Browser',
    windows: 'Windows',
    desktop: 'Desktop',
    automation: 'Automation',
    discord: 'Discord',
    web: 'Web',
    labs: 'Labs',
  },

  home: {
    kicker: 'Self-taught indie developer',
    heroLead: 'I build tools for',
    heroAccent: 'annoying problems',
    lede: 'Automations, Windows utilities, browser extensions and desktop apps that save time, clicks and sanity. Source-available, local-first, and free of anything that phones home.',
    ctaPrimary: 'See what I ship',
    ctaSecondary: 'Get in touch',
    terminalHint: 'Type nothing. It runs by itself.',
    featuredTitle: 'Things people actually use',
    statsUsers: 'weekly users on one extension',
    statsShipped: 'extensions and desktop apps shipped',
    statsTracking: 'analytics SDKs in any of it',
  },

  projects: {
    kicker: 'Everything',
    title: 'Projects',
    lede: 'Fourteen things I have built and still maintain. Filter by what they run on, or read the case studies for the big ones.',
    filterLabel: 'Filter by platform',
    showing: 'Showing',
    project: 'project',
    projects: 'projects',
  },

  detail: {
    overview: 'Overview',
    why: 'Why I built it',
    what: 'What it does',
    features: 'Main features',
    challenges: 'Engineering challenges',
    architecture: 'Architecture',
    sketchNote: 'A schematic of the real interface, drawn from the project data — not a screenshot.',
    privacy: 'Privacy & security',
    impact: 'Real usage',
    lessons: 'What it taught me',
    tech: 'Built with',
    links: 'Links',
    disclaimer: 'Disclaimer',
    metrics: 'By the numbers',
    gallery: 'Screens',
    moreProjects: 'More projects',
  },

  stack: {
    kicker: 'Tools of the trade',
    title: 'Stack',
    lede: 'I use what gets the job done. This is what that actually turned out to be, with a note on why rather than a number I made up.',
    areasKicker: 'What I do with it',
    areasTitle: 'Areas',
    usedIn: 'Used in',
    noteTitle: 'On skill bars',
  },

  labs: {
    kicker: 'The other half',
    title: 'Labs',
    lede: 'Experiments, smaller tools, older work and ideas that survived the night. Held to a lower standard on purpose — the point was to find out whether the thing was possible.',
    warning: 'Stability not guaranteed. Enthusiasm was.',
  },

  about: {
    kicker: 'Who is typing',
    title: 'About',
    timelineKicker: 'How it happened',
    timelineTitle: 'The route in',
    principlesKicker: 'How I work',
    principlesTitle: 'Six rules I actually follow',
    likesKicker: 'What I reach for',
    likesTitle: 'What I like building',
    factsTitle: 'Facts',
    factRole: 'Role',
    factBased: 'Based in',
    factLanguages: 'Languages',
    factLanguagesValue: 'English, Greek',
    factStarted: 'Started',
    factStartedValue: '2018, with devtools open',
    factStatus: 'Status',
    factStatusValue: 'Open to work',
    closingKicker: 'The useful part',
    closingTitle: 'Got a repetitive problem? Good.',
    closingBody: 'That is usually where the projects worth building begin.',
    closingAction: 'Tell me what is annoying you',
  },

  contact: {
    kicker: 'Say something',
    title: "Let's build something unnecessarily useful",
    lede: 'No contact form, no autoresponder, no "thanks for reaching out". Pick whichever of these you already have open.',
    availabilityKicker: 'Availability',
    availabilityTitle: 'Open to',
    availabilityNote: 'Fastest on Discord. Email if it needs a paper trail.',
    discordLabel: 'Discord',
    emailLabel: 'Email',
    githubLabel: 'GitHub',
    open: 'Open',
    availability: [
      'Freelance projects',
      'Small collaborations',
      'Utilities and internal tools',
      'Browser extensions',
      'Automation work',
      'Indie side-projects',
    ],
    notInterested: 'Not looking for',
    notInterestedItems: [
      'Unpaid "exposure" work',
      'Anything requiring a LinkedIn post',
      'Crypto',
    ],
  },

  chaos: {
    label: 'Chaos',
    enable: 'Enable Chaos Mode',
    disable: 'Disable Chaos Mode',
    hint: 'Hidden things become less hidden.',
  },

  lang: {
    label: 'Language',
    en: 'English',
    el: 'Ελληνικά',
  },

  notFound: {
    back: 'Go home',
    browse: 'Or look at the projects',
  },
} as const

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> }

export type Dict = Widen<typeof en>
