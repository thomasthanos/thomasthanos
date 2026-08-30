import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Annotation } from '@/components/ui/Annotation'
import { useI18n } from '@/i18n/i18n'
import { useChaos } from '@/hooks/useChaos'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { bio, likes, principles, timeline } from '@/data/about'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { logoWhispers } from '@/data/eggs'
import { notes } from '@/data/notes'
import { cx, pick } from '@/utils'
import '@/pages/page-kit.css'
import '@/pages/about.css'

export function About() {
  const { t, tr } = useI18n()
  const { chaos } = useChaos()
  const timelineRefs = useRef<Array<HTMLLIElement | null>>([])
  const [activeTimeline, setActiveTimeline] = useState(0)

  useDocumentMeta({
    title: t.about.title,
    description: tr(bio[0]),
    path: '/about',
  })

  const whisper = chaos ? tr(pick(logoWhispers)) : undefined

  useEffect(() => {
    let frame = 0

    const updateActiveTimeline = () => {
      frame = 0
      const readingLine = window.innerHeight * 0.44
      let next = 0
      let closest = Number.POSITIVE_INFINITY

      timelineRefs.current.forEach((item, index) => {
        if (!item) return
        const rect = item.getBoundingClientRect()
        const marker = rect.top + Math.min(rect.height * 0.18, 28)
        const distance = Math.abs(marker - readingLine)

        if (distance < closest) {
          closest = distance
          next = index
        }
      })

      setActiveTimeline((current) => (current === next ? current : next))
    }

    const scheduleUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateActiveTimeline)
    }

    updateActiveTimeline()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="page pk about-page">
      <div className="container">
        <div className="ab__top">
          <PageHeader
            kicker={t.about.kicker}
            title={t.about.title}
            meta={
              <div className="ab__header-meta">
                <span>05 / profile</span>
                <span className="ab__header-status">
                  <span className="live-dot" aria-hidden="true" />
                  {t.about.factStatusValue}
                </span>
              </div>
            }
          />

          <div className="ab__hero">
            <div className="ab__hero-bar" aria-hidden="true">
              <span className="ab__hero-prompt">thomas@athens</span>
              <span className="ab__hero-path">:~/about</span>
              <span className="ab__hero-file">origin_story.txt</span>
            </div>

            <div className="ab__intro">
              <div className="ab__prose">
                {bio.map((paragraph, i) => (
                  <p className={i === 0 ? 'ab__lead' : undefined} key={paragraph.en}>
                    {tr(paragraph)}
                  </p>
                ))}

                <div className="ab__manifest" aria-label={t.about.principlesKicker}>
                  {[principles[0], principles[2], principles[3]].map((principle) => (
                    <span key={principle.n}>{tr(principle.title)}</span>
                  ))}
                </div>

                <Annotation className="ab__note" arrow="ne" tilt={-5} accent="violet">
                  {tr(notes.aboutNoDegrees)}
                </Annotation>

                <div className="ab__cta">
                  <Link className="btn btn--primary btn--sm" to="/projects">
                    {t.common.allProjects}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link className="btn btn--ghost btn--sm" to="/contact">
                    {t.nav.contact}
                  </Link>
                </div>
              </div>

              <aside className="ab__facts" aria-label={t.about.factsTitle}>
                <div className="ab__facts-mark" title={whisper}>
                  <span className="ab__figure-index" aria-hidden="true">
                    identity / 01
                  </span>
                  <div className="ab__facts-figure-wrapper">
                    <img
                      className="ab__facts-figure"
                      src={`${import.meta.env.BASE_URL}assets/pumpkin-hoodie-figure.webp?v=2`}
                      alt=""
                      width="620"
                      height="1028"
                      draggable="false"
                      decoding="async"
                    />
                  </div>
                  <span className="ab__facts-studio">
                    {site.studio}
                    <em>software &amp; chaos</em>
                  </span>
                </div>
                <dl>
                  <div>
                    <dt>{t.about.factRole}</dt>
                    <dd>{tr(site.role)}</dd>
                  </div>
                  <div>
                    <dt>{t.about.factBased}</dt>
                    <dd>{tr(site.location)}</dd>
                  </div>
                  <div>
                    <dt>{t.about.factLanguages}</dt>
                    <dd>{t.about.factLanguagesValue}</dd>
                  </div>
                  <div>
                    <dt>{t.about.factStarted}</dt>
                    <dd>{t.about.factStartedValue}</dd>
                  </div>
                  <div>
                    <dt>{t.about.factStatus}</dt>
                    <dd className="ab__ok">
                      <span className="live-dot" aria-hidden="true" />
                      {t.about.factStatusValue}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </div>

        {/* Bridge from the story to the twelve case studies. Counted, not estimated. */}
        <section className="ab__now" aria-labelledby="ab-now-title">
          <div className="pk-rule ab__now-rule">
            <h2 id="ab-now-title">{t.about.nowTitle}</h2>
            <p className="pk-rule__aside">{t.about.nowAside}</p>
          </div>
          <dl className="pk-stats">
            {[
              { v: String(projects.length), k: t.about.nowProjects },
              { v: '2018', k: t.about.nowSince },
              { v: '~8K', k: t.about.nowUsers },
              { v: '0', k: t.about.nowAnalytics },
            ].map((s) => (
              <div className="pk-stat" key={s.k}>
                <dt>{s.v}</dt>
                <dd>{s.k}</dd>
              </div>
            ))}
          </dl>
          <p className="pk-foot">{t.about.nowFoot}</p>
          <Link className="btn btn--ghost btn--sm ab__now-cta" to="/projects">
            {t.common.allProjects}
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <Section className="ab__section ab__section--timeline" title={t.about.timelineTitle}>
          <p className="label ab__section-kicker">
            <span className="label__tick" aria-hidden="true" />
            {t.about.timelineKicker}
          </p>
          <ol className="tl">
            {timeline.map((entry, i) => (
              <li
                ref={(element) => {
                  timelineRefs.current[i] = element
                }}
                key={entry.period}
                className={cx(
                  'tl__i',
                  entry.pivot && 'is-pivot',
                  activeTimeline === i && 'is-active',
                )}
                aria-current={activeTimeline === i ? 'step' : undefined}
              >
                <span className="tl__period">{entry.period}</span>
                <div className="tl__content">
                  <h3 className="tl__title">{tr(entry.title)}</h3>
                  <p className="tl__body">{tr(entry.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section className="ab__section ab__section--principles" title={t.about.principlesTitle}>
          <div className="ab__rail-head">
            <p className="label ab__section-kicker">
              <span className="label__tick" aria-hidden="true" />
              {t.about.principlesKicker}
            </p>
            {principles.length > 1 && <SwipeHint />}
          </div>
          <ul className="prin">
            {principles.map((principle, i) => (
              <li key={principle.n}>
                <Reveal className="prin__i" delay={Math.min(i, 5) * 50}>
                  <span className="prin__n" aria-hidden="true">
                    {principle.n}
                  </span>
                  <h3 className="prin__t">{tr(principle.title)}</h3>
                  <p className="prin__b">{tr(principle.body)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="ab__section ab__section--likes" title={t.about.likesTitle}>
          <div className="ab__rail-head">
            <p className="label ab__section-kicker">
              <span className="label__tick" aria-hidden="true" />
              {t.about.likesKicker}
            </p>
            {likes.length > 1 && <SwipeHint />}
          </div>
          <ul className="likes">
            {likes.map((like, i) => (
              <li key={like.title.en} className="likes__i">
                <span className="likes__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="likes__t">{tr(like.title)}</h3>
                  <p className="likes__b">{tr(like.body)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <section className="ab__closing" aria-labelledby="ab-closing-title">
          <div>
            <p className="label label--accent">
              <span className="label__tick" aria-hidden="true" />
              {t.about.closingKicker}
            </p>
            <h2 id="ab-closing-title">{t.about.closingTitle}</h2>
            <p>{t.about.closingBody}</p>
          </div>
          <Link className="btn btn--primary" to="/contact">
            {t.about.closingAction}
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  )
}
