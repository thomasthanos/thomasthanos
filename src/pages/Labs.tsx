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
import type { L } from '@/data/types'
import '@/pages/labs.css'

const labKinds: L[] = [
  { en: 'experiments', el: 'πειράματα' },
  { en: 'prototypes', el: 'πρωτότυπα' },
  { en: 'side quests', el: 'παράπλευρες αποστολές' },
  { en: '4am ideas', el: 'ιδέες στις 4 π.μ.' },
  { en: 'older work', el: 'παλιότερη δουλειά' },
]

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

  return (
    <div className="page">
      <div className="container">
        <PageHeader
          kicker={t.labs.kicker}
          title={t.labs.title}
          lede={t.labs.lede}
          meta={
            <span className="chip chip--violet">
              <TriangleAlert
                aria-hidden="true"
                style={{ width: 12, height: 12 }}
              />
              {t.labs.warning}
            </span>
          }
        />

        <div className="labs__toolbar">
          <SwipeHint />
          <div className="labs__note" aria-hidden="true">
            {labKinds.map((kind) => (
              <span key={kind.en}>{tr(kind)}</span>
            ))}
          </div>
          <div className="labs__summary">
            <Annotation className="labs__note-hand" arrow="none" tilt={-4} accent="violet">
              {tr(notes.labsWarning)}
            </Annotation>
            <span className="labs__count">
              {String(visible.length).padStart(2, '0')} /{' '}
              {String(labProjects.length).padStart(2, '0')} {t.labs.title}
            </span>
          </div>
        </div>

        <ul className="labs__grid" id="labs-grid">
          {visible.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={Math.min(i, 6) * 45}>
                <ProjectCard project={p} variant="compact" labs index={i} as="h2" />
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
      </div>
    </div>
  )
}
