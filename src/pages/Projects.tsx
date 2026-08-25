import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterBar } from '@/features/projects/FilterBar'
import { Annotation } from '@/components/ui/Annotation'
import { ProjectCard } from '@/features/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { useI18n } from '@/i18n/i18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { activeCategories, inCategory, projects } from '@/data/projects'
import { emptyStates } from '@/data/eggs'
import { notes } from '@/data/notes'
import type { Category } from '@/data/types'
import '@/pages/projects.css'

function isCategory(value: string | null): value is Category {
  return value !== null && (activeCategories as string[]).includes(value)
}

const PROJECT_BATCH = 4

export function Projects() {
  const { t, tr } = useI18n()
  const compact = useMediaQuery('(max-width: 899px)')
  const [visibleCount, setVisibleCount] = useState(PROJECT_BATCH)
  const [params, setParams] = useSearchParams()
  const raw = params.get('filter')
  const filter: Category | 'all' = isCategory(raw) ? raw : 'all'

  useDocumentMeta({
    title: t.projects.title,
    description: t.projects.lede,
    path: '/projects',
  })

  const shown = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => inCategory(p, filter))),
    [filter],
  )

  useEffect(() => setVisibleCount(PROJECT_BATCH), [filter])

  const visible = compact ? shown.slice(0, visibleCount) : shown
  const remaining = shown.length - visible.length

  const setFilter = (next: Category | 'all') => {
    setParams(next === 'all' ? {} : { filter: next }, { replace: true })
  }

  return (
    <div className="page">
      <div className="container">
        <PageHeader
          kicker={t.projects.kicker}
          title={t.projects.title}
          lede={t.projects.lede}
          meta={
            <>
              <span className="label">
                {projects.length} {t.projects.projects}
              </span>
              <span className="chip">
                <span className="chip__dot" aria-hidden="true" />
                {projects.filter((p) => p.status === 'active').length} {t.status.active}
              </span>
            </>
          }
        />

        <div className="proj__controls">
          <FilterBar value={filter} onChange={setFilter} label={t.projects.filterLabel} />
          <div className="proj__result">
            <Annotation className="proj__note" arrow="none" tilt={-4} accent="violet">
              {tr(notes.projectsCount)}
            </Annotation>
            <p className="proj__count" role="status" aria-live="polite">
              <span>{t.projects.showing}</span>
              <strong>{String(visible.length).padStart(2, '0')}</strong>
              {remaining > 0 && <span>/ {String(shown.length).padStart(2, '0')}</span>}
              <span>{shown.length === 1 ? t.projects.project : t.projects.projects}</span>
            </p>
          </div>
        </div>

        {shown.length === 0 ? (
          <p className="proj__empty">{tr(emptyStates[0])}</p>
        ) : (
          <ul className="proj__grid" id="projects-grid">
            {visible.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={Math.min(i, 6) * 45}>
                  <ProjectCard project={p} variant="catalog" index={i} as="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {remaining > 0 && (
          <button
            type="button"
            className="btn btn--ghost proj__more"
            aria-controls="projects-grid"
            onClick={() => setVisibleCount((count) => count + PROJECT_BATCH)}
          >
            {t.common.showMore}
            <span>+{Math.min(PROJECT_BATCH, remaining)}</span>
            <ChevronDown aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
