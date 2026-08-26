import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { Terminal } from '@/components/ui/Terminal'
import { Annotation } from '@/components/ui/Annotation'
import { Sticker } from '@/components/brand/Sticker'
import { ProjectCard } from '@/features/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { useI18n } from '@/i18n/i18n'
import { useChaos } from '@/hooks/useChaos'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { featuredProjects, labProjects, projects } from '@/data/projects'
import { stackGroups } from '@/data/stack'
import { site } from '@/data/site'
import { statusChips } from '@/data/eggs'
import { notes } from '@/data/notes'
import { pick } from '@/utils'
import '@/pages/page-kit.css'
import '@/pages/home.css'

export function Home() {
  const { t, tr } = useI18n()
  const { chaos } = useChaos()

  useDocumentMeta({
    title: site.name,
    description: tr(site.description),
    path: '/',
  })

  const chips = useMemo(() => {
    const first = pick(statusChips)
    const rest = statusChips.filter((c) => c !== first)
    return [first, pick(rest)]
  }, [])

  /* Derived from the project data, never typed in. "Shipped" is the browser extensions plus
     anything that lists Electron — three and five today. The old hardcoded 7 had already drifted
     out of step with what the case studies say. */
  const counts = useMemo(
    () => ({
      shipped: projects.filter((p) => p.category === 'browser' || p.tech.includes('Electron'))
        .length,
      entries: stackGroups.reduce((n, g) => n + g.items.length, 0),
    }),
    [],
  )

  const routes = [
    {
      to: '/projects',
      index: '02',
      name: t.nav.projects,
      value: String(projects.length),
      body: t.home.indexProjects,
    },
    {
      to: '/stack',
      index: '03',
      name: t.nav.stack,
      value: String(counts.entries),
      body: t.home.indexStack,
    },
    {
      to: '/labs',
      index: '04',
      name: t.nav.labs,
      value: String(labProjects.length),
      body: t.home.indexLabs,
    },
    {
      to: '/about',
      index: '05',
      name: t.nav.about,
      value: '2018',
      body: t.home.indexAbout,
    },
  ]

  return (
    <div className="page pk home-page">
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__left">
            <p className="label label--accent">
              <span className="label__tick" aria-hidden="true" />
              {t.home.kicker}
            </p>

            <h1 className="hero__title" id="hero-title">
              {t.home.heroLead} <span className="hero__accent">{t.home.heroAccent}</span>.
            </h1>

            <p className="hero__lede">{t.home.lede}</p>

            <div className="hero__cta">
              <Link className="btn btn--primary" to="/projects">
                {t.home.ctaPrimary}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="btn btn--ghost" to="/contact">
                <Mail aria-hidden="true" />
                {t.home.ctaSecondary}
              </Link>
            </div>

            <ul className="hero__chips">
              {chips.map((c) => (
                <li key={c.en} className="chip">
                  <span className="chip__dot" aria-hidden="true" />
                  {tr(c)}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__right">
            <Annotation className="hero__note" arrow="se" tilt={-6}>
              {tr(notes.heroTerminal)}
            </Annotation>

            <Terminal />

            <Sticker className="hero__sticker" tilt={chaos ? -3 : -7} />
          </div>
        </section>

        <Reveal as="section" className="proof" aria-label={t.detail.metrics}>
          <div className="proof__cell">
            <span className="proof__n">8K+</span>
            <span className="proof__t">{t.home.statsUsers}</span>
          </div>
          <div className="proof__cell">
            <span className="proof__n">{counts.shipped}</span>
            <span className="proof__t">{t.home.statsShipped}</span>
          </div>
          <div className="proof__cell">
            <span className="proof__n">0</span>
            <span className="proof__t">{t.home.statsTracking}</span>
          </div>
        </Reveal>

        <section className="section featured" aria-labelledby="featured-title">
          <header className="featured__head">
            <h2 className="featured__title" id="featured-title">
              <span aria-hidden="true" />
              {t.home.featuredTitle}
            </h2>
            <div className="featured__aside">
              <Annotation className="featured__note" arrow="se" tilt={-5} accent="violet">
                {tr(notes.featured)}
              </Annotation>
              <Link className="featured__all" to="/projects">
                {t.common.viewAll}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </header>

          <div className="featured__meta">
            {featuredProjects.length > 1 && <SwipeHint />}
            <span className="featured__count">{t.home.featuredAside}</span>
          </div>

          <div className="featured__grid">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProjectCard project={p} variant="featured" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* The front page used to stop at five cards. This is the way into the other five pages,
            each carrying one number that the page itself can back up. */}
        <section className="home__index" aria-labelledby="home-index-title">
          <div className="pk-rule home__index-rule">
            <h2 id="home-index-title">{t.home.indexTitle}</h2>
            <p className="pk-rule__aside">{t.home.indexAside}</p>
          </div>

          <ul className="hroutes">
            {routes.map((r, i) => (
              <li key={r.to}>
                <Reveal delay={Math.min(i, 4) * 55}>
                  <Link className="hroute" to={r.to}>
                    <span className="hroute__idx" aria-hidden="true">
                      {r.index}
                    </span>
                    <span className="hroute__v" aria-hidden="true">
                      {r.value}
                    </span>
                    <span className="hroute__name">
                      {r.name}
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                    <span className="hroute__b">{r.body}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
