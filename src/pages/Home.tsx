import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { Terminal } from '../components/ui/Terminal'
import { Annotation } from '../components/ui/Annotation'
import { Sticker } from '../components/brand/Sticker'
import { ProjectCard } from '../components/projects/ProjectCard'
import { Reveal } from '../components/ui/Reveal'
import { SwipeHint } from '../components/ui/SwipeHint'
import { useI18n } from '../i18n/i18n'
import { useChaos } from '../hooks/useChaos'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { featuredProjects } from '../data/projects'
import { site } from '../data/site'
import { statusChips } from '../data/eggs'
import { notes } from '../data/notes'
import { pick } from '../utils'
import './home.css'

export function Home() {
  const { t, tr } = useI18n()
  const { chaos } = useChaos()

  useDocumentMeta({
    title: site.name,
    description: tr(site.description),
    path: '/',
  })

  // Two chips, chosen once per mount so the page does not reshuffle on render.
  const chips = useMemo(() => {
    const first = pick(statusChips)
    const rest = statusChips.filter((c) => c !== first)
    return [first, pick(rest)]
  }, [])

  return (
    <div className="page">
      <div className="container">
        {/* --- Hero ------------------------------------------------------- */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__left">
            <p className="label label--accent">
              <span className="label__tick" aria-hidden="true" />
              {t.home.kicker}
            </p>

            <h1 className="hero__title" id="hero-title">
              {t.home.heroLead}{' '}
              <span className="hero__accent">{t.home.heroAccent}</span>.
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
            {/* Margin note pointing at the terminal, and the sticker slapped
                on its corner. Both decorative and both hidden on narrow
                screens, where there is no margin to write in. */}
            <Annotation className="hero__note" arrow="se" tilt={-6}>
              {tr(notes.heroTerminal)}
            </Annotation>

            <Terminal />

            {/* Locale-aware sticker: Greek sign in EL, English sign in EN. */}
            <Sticker className="hero__sticker" tilt={chaos ? -3 : -7} />
          </div>
        </section>

        {/* --- Proof ------------------------------------------------------- */}
        <Reveal as="section" className="proof" aria-label={t.detail.metrics}>
          <div className="proof__cell">
            <span className="proof__n">8K+</span>
            <span className="proof__t">{t.home.statsUsers}</span>
          </div>
          <div className="proof__cell">
            <span className="proof__n">7</span>
            <span className="proof__t">{t.home.statsShipped}</span>
          </div>
          <div className="proof__cell">
            <span className="proof__n">0</span>
            <span className="proof__t">{t.home.statsTracking}</span>
          </div>
        </Reveal>

        {/* --- Featured ---------------------------------------------------- */}
        <section className="section featured" aria-labelledby="featured-title">
          <header className="featured__head">
            <h2 className="featured__title" id="featured-title">
              <span aria-hidden="true" />
              {t.home.featuredTitle}
            </h2>
            <Link className="featured__all" to="/projects">
              {t.common.viewAll}
              <ArrowRight aria-hidden="true" />
            </Link>
          </header>

          {featuredProjects.length > 1 && <SwipeHint />}
          <div className="featured__grid">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProjectCard project={p} variant="featured" />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
