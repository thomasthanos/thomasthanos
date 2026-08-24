import { useI18n } from '../../i18n/i18n'
import type { Category } from '../../data/types'
import { activeCategories, countIn, projects } from '../../data/projects'
import { SwipeHint } from '../ui/SwipeHint'
import './filter-bar.css'

interface FilterBarProps {
  value: Category | 'all'
  onChange: (next: Category | 'all') => void
  label: string
}

export function FilterBar({ value, onChange, label }: FilterBarProps) {
  const { t } = useI18n()
  const options: (Category | 'all')[] = ['all', ...activeCategories]

  return (
    <div className="filters" role="group" aria-label={label}>
      <SwipeHint />
      <div className="filters__scroll">
        {options.map((option) => {
          const on = option === value
          const count = option === 'all' ? projects.length : countIn(option)
          return (
            <button
              key={option}
              type="button"
              className={on ? 'filters__btn is-on' : 'filters__btn'}
              onClick={() => onChange(option)}
              aria-pressed={on}
            >
              {t.category[option]}
              <span className="filters__count">{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
