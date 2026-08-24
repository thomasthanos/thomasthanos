import type { ReactNode } from 'react'
import './page-header.css'

interface PageHeaderProps {
  kicker: string
  title: string
  lede?: string
  /** Mono metadata shown on the right, e.g. a count. */
  meta?: ReactNode
  children?: ReactNode
}

export function PageHeader({ kicker, title, lede, meta, children }: PageHeaderProps) {
  return (
    <header className="phead">
      <div className="phead__row">
        <div className="phead__main">
          <p className="label label--accent">
            <span className="label__tick" aria-hidden="true" />
            {kicker}
          </p>
          <h1 className="phead__title">{title}</h1>
          {lede && <p className="phead__lede">{lede}</p>}
        </div>
        {meta && <div className="phead__meta">{meta}</div>}
      </div>
      {children}
    </header>
  )
}
