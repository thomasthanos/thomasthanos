import { useState } from 'react'
import { ChevronDown, TriangleAlert } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProjectCard } from '@/features/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Annotation } from '@/components/ui/Annotation'
import { useI18n } from '@/i18n/i18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { labProjects } from '@/data/projects'
import { notes } from '@/data/notes'
import '@/pages/page-kit.css'
import '@/pages/labs.css'

const LAB_BATCH = 4

export function Labs() {
  const { t, tr } = useI18n()
  const compact = useMediaQuery('(max-width: 899px)')
  const [visibleCount, setVisibleCount] = useState(LAB_BATCH)
  const visible = compact ? labProjects.slice(0, visibleCount) : labProjects
  const remaining = labProjects.length - visible.length

  useDocumentMeta({
    title: t.labs.title,
    description: t.labs.lede,
    path: '/labs',
  })

  /* Every figure here is counted from the repositories, not estimated. One of the six is the
     2018 origin and is marked legacy rather than dropped; nothing here was abandoned. */
  const legacy = labProjects.filter((p) => p.status === 'legacy').length
  const stats = [
    { v: String(labProjects.length), k: t.labs.statProjects },
    { v: '55K', k: t.labs.statLines },
    { v: String(labProjects.length), k: t.labs.statWriteups },
    { v: '0', k: t.labs.statAbandoned },
  ]

  return (
    <div className="page pk labs-page">
      <div className="container">
        <PageHeader
          kicker={t.labs.kicker}
          title={t.labs.title}
          lede={t.labs.lede}
          meta={
            <span className="chip chip--violet">
              <TriangleAlert aria-hidden="true" style={{ width: 12, height: 12 }} />
              {t.labs.warning}
            </span>
          }
        />

        <section className="labs__scale" aria-label={t.labs.statProjects}>
          <dl className="pk-stats">
            {stats.map((s) => (
              <div className="pk-stat" key={s.k}>
                <dt>{s.v}</dt>
                <dd>{s.k}</dd>
              </div>
            ))}
          </dl>
          <p className="pk-foot">{t.labs.foot}</p>
          <Annotation className="labs__note-hand" arrow="none" tilt={-4} accent="violet">
            {tr(notes.labsWarning)}
          </Annotation>
        </section>

        <section className="labs__list" aria-label={t.labs.gridTitle}>
          <div className="pk-rule labs__rule">
            <h2>{t.labs.gridTitle}</h2>
            <p className="pk-rule__aside">{t.labs.gridAside}</p>
          </div>

          <div className="labs__toolbar">
            <SwipeHint />
            <span className="labs__count">
              {String(visible.length).padStart(2, '0')} /{' '}
              {String(labProjects.length).padStart(2, '0')} · {legacy} legacy
            </span>
          </div>

          <ul className="labs__grid" id="labs-grid">
            {visible.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={Math.min(i, 6) * 45}>
                  <ProjectCard project={p} variant="compact" labs index={i} as="h3" />
                </Reveal>
              </li>
            ))}
          </ul>

          {remaining > 0 && (
            <button
              type="button"
              className="btn btn--ghost labs__more"
              aria-controls="labs-grid"
              onClick={() => setVisibleCount((count) => count + LAB_BATCH)}
            >
              {t.common.showMore}
              <span>+{Math.min(LAB_BATCH, remaining)}</span>
              <ChevronDown aria-hidden="true" />
            </button>
          )}
        </section>
      </div>
    </div>
  )
}
