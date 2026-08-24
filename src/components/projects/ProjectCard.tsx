import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../../i18n/i18n'
import type { Project } from '../../data/types'
import { cx } from '../../utils'
import { Sketch } from './Sketch'
import './project-card.css'

interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'lead' | 'compact' | 'featured' | 'catalog'
  index?: number
  /** Shows the Labs badge and note instead of metrics. */
  labs?: boolean
  /**
   * Heading level for the card title. Cards sitting directly under a page h1
   * need h2; cards inside a titled section keep the default h3.
   */
  as?: 'h2' | 'h3'
}

const LIVE: Project['status'][] = ['active', 'maintained']

export function ProjectCard({
  project: p,
  variant = 'default',
  labs = false,
  index,
  as: Heading = 'h3',
}: ProjectCardProps) {
  const { t, tr } = useI18n()
  const showMetrics = !labs && p.metrics && p.metrics.length > 0
  const featured = variant === 'featured'
  const catalog = variant === 'catalog'

  return (
    <Link
      to={`/projects/${p.slug}`}
      data-accent={p.accent}
      className={cx(
        'pcard',
        variant === 'lead' && 'pcard--lead',
        variant === 'compact' && 'pcard--compact',
        featured && 'pcard--featured',
        catalog && 'pcard--catalog',
        labs && 'pcard--labs',
      )}
    >
      {featured && p.sketch && (
        <div className="pcard__visual" aria-hidden="true">
          <Sketch data={p.sketch} accent={p.accent} />
        </div>
      )}

      <div className="pcard__head">
        <span className="pcard__meta">
          {index !== undefined && (
            <span className="pcard__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <span className="pcard__cat">{t.category[p.category]}</span>
        </span>
        <span className="pcard__status" data-live={LIVE.includes(p.status)}>
          <i aria-hidden="true" />
          {t.status[p.status]}
        </span>
      </div>

      <div className="pcard__body">
        <Heading className="pcard__title">{p.name}</Heading>
        {labs && p.lab && (
          <span className="pcard__badge" style={{ marginTop: 'var(--s-3)' }}>
            {tr(p.lab.badge)}
          </span>
        )}
      </div>

      <p className="pcard__desc">{tr(p.short)}</p>

      {labs && p.lab && <p className="pcard__note">{tr(p.lab.note)}</p>}

      {showMetrics && (
        <div className="pcard__metrics">
          {p.metrics?.slice(0, featured || catalog ? 2 : undefined).map((m) => (
            <span key={m.value + m.label.en} className="pcard__metric">
              <b>{m.value}</b>
              <span>{tr(m.label)}</span>
            </span>
          ))}
        </div>
      )}

      <div className="pcard__foot">
        <ul className="tags" aria-label={t.detail.tech}>
          {p.tech.slice(0, featured ? 1 : catalog || variant === 'compact' ? 3 : 4).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
          {catalog && p.tech.length > 3 && (
            <li className="tag pcard__tag-more" aria-label={`${p.tech.length - 3} more`}>
              +{p.tech.length - 3}
            </li>
          )}
        </ul>
        <span className="pcard__go">
          {!catalog && !labs && t.common.viewProject}
          <ArrowUpRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
