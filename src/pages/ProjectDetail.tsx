import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  HelpCircle,
  Info,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Sketch } from '@/features/projects/Sketch'
import { ArchDiagram } from '@/features/projects/ArchDiagram'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { useI18n } from '@/i18n/i18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { getProject, neighbours } from '@/data/projects'
import { external } from '@/utils'
import { An1meSpeedControlCaseStudy } from '@/pages/case-studies/An1meSpeedControlCaseStudy'
import { BetterDiscordThemesCaseStudy } from '@/pages/case-studies/BetterDiscordThemesCaseStudy'
import { An1meTrackerCaseStudy } from '@/pages/case-studies/An1meTrackerCaseStudy'
import { DiscordPackageViewerCaseStudy } from '@/pages/case-studies/DiscordPackageViewerCaseStudy'
import { GithubBuildReleaseCaseStudy } from '@/pages/case-studies/GithubBuildReleaseCaseStudy'
import { GtaAcademyCaseStudy } from '@/pages/case-studies/GtaAcademyCaseStudy'
import { MakeYourLifeEasierCaseStudy } from '@/pages/case-studies/MakeYourLifeEasierCaseStudy'
import { NexusModsBypassCaseStudy } from '@/pages/case-studies/NexusModsBypassCaseStudy'
import { SteamIdlerCaseStudy } from '@/pages/case-studies/SteamIdlerCaseStudy'
import '@/pages/detail.css'

export function ProjectDetail() {
  const { slug = '' } = useParams()
  const { t, tr, trList } = useI18n()
  const project = getProject(slug)

  useDocumentMeta({
    title: project ? project.name : t.projects.title,
    description: project ? tr(project.short) : t.projects.lede,
    path: `/projects/${slug}`,
  })

  if (!project) return <Navigate to="/projects" replace />

  const p = project
  const near = neighbours(p.slug)

  if (p.slug === 'make-your-life-easier') {
    return <MakeYourLifeEasierCaseStudy project={p} near={near} />
  }

  if (p.slug === 'nexusmods-bypass') {
    return <NexusModsBypassCaseStudy project={p} near={near} />
  }

  if (p.slug === 'discord-package-viewer') {
    return <DiscordPackageViewerCaseStudy project={p} near={near} />
  }

  if (p.slug === 'an1me-tracker') {
    return <An1meTrackerCaseStudy project={p} near={near} />
  }

  if (p.slug === 'steam-idler') {
    return <SteamIdlerCaseStudy project={p} near={near} />
  }

  if (p.slug === 'gta-academy') {
    return <GtaAcademyCaseStudy project={p} near={near} />
  }

  if (p.slug === 'an1me-speed-control') {
    return <An1meSpeedControlCaseStudy project={p} near={near} />
  }

  if (p.slug === 'github-build-release') {
    return <GithubBuildReleaseCaseStudy project={p} near={near} />
  }

  if (p.slug === 'betterdiscord-themes') {
    return <BetterDiscordThemesCaseStudy project={p} near={near} />
  }

  return (
    <div className="page" data-accent={p.accent}>
      <div className="container">
        <Link className="dback" to="/projects">
          <ArrowLeft aria-hidden="true" />
          {t.common.backToProjects}
        </Link>

        <header className="dhero">
          <div className="dhero__main">
            <div className="dhero__eyebrow">
              <span className="dhero__cat">{t.category[p.category]}</span>
              <span className="chip">
                <span className="chip__dot" aria-hidden="true" />
                {t.status[p.status]}
              </span>
              {p.version && <span className="chip">v{p.version}</span>}
            </div>

            <h1 className="dhero__title">
              {p.name}
              {p.codename && (
                <span className="dhero__codename">{p.codename}</span>
              )}
            </h1>

            <p className="dhero__summary">{tr(p.summary)}</p>

            <div className="dhero__cta">
              <a className="btn btn--primary" href={p.repo} {...external}>
                <Github aria-hidden="true" />
                {t.common.repository}
              </a>
              {p.demo && (
                <a className="btn btn--ghost" href={p.demo} {...external}>
                  <ExternalLink aria-hidden="true" />
                  {t.common.liveDemo}
                </a>
              )}
            </div>

            <dl className="dspec">
              <div className="dspec__cell">
                <dt className="dspec__k">{t.detail.tech}</dt>
                <dd className="dspec__v">{p.tech[0]}</dd>
              </div>
              <div className="dspec__cell">
                <dt className="dspec__k">{t.common.year}</dt>
                <dd className="dspec__v">{p.year}</dd>
              </div>
              <div className="dspec__cell">
                <dt className="dspec__k">{t.common.repository}</dt>
                <dd className="dspec__v dspec__v--accent">
                  {p.repoPath ?? p.repoLabel}
                </dd>
              </div>
            </dl>
          </div>

          {p.sketch && (
            <div className="dhero__aside">
              <Sketch data={p.sketch} accent={p.accent} />
              <p className="dhero__sketch-note">{t.detail.sketchNote}</p>
            </div>
          )}
        </header>

        {p.metrics && p.metrics.length > 0 && (
          <Section title={t.detail.metrics}>
            <div className="dmetrics">
              {p.metrics.map((m) => (
                <div key={m.value + m.label.en} className="dmetric">
                  <span className="dmetric__n">{m.value}</span>
                  <span className="dmetric__l">{tr(m.label)}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {(p.why || p.what) && (
          <Section title={t.detail.overview}>
            <div className="dsplit">
              {p.why && (
                <Reveal className="dblock">
                  <h3 className="dblock__t">
                    <HelpCircle aria-hidden="true" />
                    {t.detail.why}
                  </h3>
                  <p>{tr(p.why)}</p>
                </Reveal>
              )}
              {p.what && (
                <Reveal className="dblock" delay={70}>
                  <h3 className="dblock__t">
                    <Wrench aria-hidden="true" />
                    {t.detail.what}
                  </h3>
                  <p>{tr(p.what)}</p>
                </Reveal>
              )}
            </div>
          </Section>
        )}

        {p.features && p.features.length > 0 && (
          <Section title={t.detail.features} className="dsec--cards">
            {p.features.length > 1 && <SwipeHint />}
            <ul className="dgrid" data-count={p.features.length}>
              {p.features.map((f, i) => (
                <li key={f.title.en}>
                  <Reveal className="dcard" delay={Math.min(i, 5) * 50}>
                    <h3 className="dcard__t">
                      <span className="dcard__n">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {tr(f.title)}
                    </h3>
                    <p className="dcard__b">{tr(f.body)}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.challenges && p.challenges.length > 0 && (
          <Section title={t.detail.challenges} className="dsec--cards">
            {p.challenges.length > 1 && <SwipeHint />}
            <ul className="dgrid" data-count={p.challenges.length}>
              {p.challenges.map((c, i) => (
                <li key={c.title.en}>
                  <Reveal className="dcard" delay={Math.min(i, 5) * 50}>
                    <h3 className="dcard__t">
                      <span className="dcard__n">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {tr(c.title)}
                    </h3>
                    <p className="dcard__b">{tr(c.body)}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.architecture && p.architecture.length > 0 && (
          <Section title={t.detail.architecture}>
            <ArchDiagram layers={p.architecture} />
          </Section>
        )}

        {p.shots && p.shots.length > 0 && (
          <Section title={t.detail.gallery}>
            {p.shots.length > 1 && <SwipeHint />}
            <div className="dshots">
              {p.shots.map((s) => (
                <figure key={s.src} className="dshot">
                  <img
                    src={s.src}
                    alt={tr(s.caption)}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{tr(s.caption)}</figcaption>
                </figure>
              ))}
            </div>
          </Section>
        )}

        {(p.privacy || p.impact) && (
          <Section title={p.privacy ? t.detail.privacy : t.detail.impact}>
            <div className="dsplit">
              {p.privacy && (
                <Reveal className="dblock dblock--accent">
                  <h3 className="dblock__t">
                    <ShieldCheck aria-hidden="true" />
                    {t.detail.privacy}
                  </h3>
                  <p>{tr(p.privacy)}</p>
                </Reveal>
              )}
              {p.impact && (
                <Reveal className="dblock dblock--accent" delay={70}>
                  <h3 className="dblock__t">
                    <TrendingUp aria-hidden="true" />
                    {t.detail.impact}
                  </h3>
                  <p>{tr(p.impact)}</p>
                </Reveal>
              )}
            </div>
          </Section>
        )}

        {p.lessons && (
          <Section title={t.detail.lessons}>
            <ul className="bullets" style={{ maxWidth: 'var(--w-prose)' }}>
              {trList(p.lessons).map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section title={t.detail.tech}>
          <ul className="tags">
            {p.tech.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        {p.disclaimer && (
          <Section title={t.detail.disclaimer}>
            <p className="ddisclaimer">
              <Info aria-hidden="true" />
              <span>{tr(p.disclaimer)}</span>
            </p>
          </Section>
        )}

        <Section title={t.detail.links}>
          <div className="dhero__cta">
            <a className="btn btn--outline btn--path" href={p.repo} {...external}>
              <Github aria-hidden="true" />
              {p.repoLabel}
              {p.repoPath ? ` / ${p.repoPath}` : ''}
            </a>
            {p.demo && (
              <a className="btn btn--outline" href={p.demo} {...external}>
                <ExternalLink aria-hidden="true" />
                {t.common.liveDemo}
              </a>
            )}
            <Link className="btn btn--ghost" to="/projects">
              <Lightbulb aria-hidden="true" />
              {t.detail.moreProjects}
            </Link>
          </div>
        </Section>

        {near && (
          <nav className="dnav" aria-label={t.detail.moreProjects}>
            <Link className="dnav__link" to={`/projects/${near.prev.slug}`}>
              <span className="dnav__k">
                <ArrowLeft aria-hidden="true" />
                {t.common.previous}
              </span>
              <span className="dnav__n">{near.prev.name}</span>
            </Link>
            <Link className="dnav__link dnav__link--next" to={`/projects/${near.next.slug}`}>
              <span className="dnav__k">
                {t.common.next}
                <ArrowRight aria-hidden="true" />
              </span>
              <span className="dnav__n">{near.next.name}</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  )
}
