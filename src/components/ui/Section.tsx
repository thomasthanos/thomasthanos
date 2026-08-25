import { useId, type ReactNode } from 'react'
import { cx } from '@/utils'
import '@/components/ui/section.css'

interface SectionProps {
  title: string
  note?: string
  children: ReactNode
  className?: string
}

export function Section({ title, note, children, className }: SectionProps) {
  const id = useId()

  return (
    <section className={cx('dsec', className)} aria-labelledby={id}>
      <div className="dsec__head">
        <h2 className="dsec__title" id={id}>
          {title}
        </h2>
        <span className="dsec__rule" aria-hidden="true" />
      </div>
      {note && <p className="dsec__note">{note}</p>}
      <div className="dsec__body">{children}</div>
    </section>
  )
}
