import { useId } from 'react'
import { cx } from '@/utils'
import '@/components/ui/annotation.css'

type ArrowShape = 'sw' | 'se' | 'nw' | 'ne' | 'none'

interface AnnotationProps {
  children: string
  arrow?: ArrowShape
  tilt?: number
  accent?: 'lime' | 'violet'
  className?: string
}

const ARROWS: Record<Exclude<ArrowShape, 'none'>, string> = {
  sw: 'M65 7C55 18 41 29 15 36',
  se: 'M7 7C17 18 31 29 57 36',
  nw: 'M65 49C55 38 41 27 15 20',
  ne: 'M7 49C17 38 31 27 57 20',
}

export function Annotation({
  children,
  arrow = 'sw',
  tilt = -4,
  accent = 'lime',
  className,
}: AnnotationProps) {
  const markerId = useId().replace(/:/g, '')

  return (
    <span
      className={cx('anno', `anno--${accent}`, className)}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="anno__text">{children}</span>
      {arrow !== 'none' && (
        <svg className={`anno__arrow anno__arrow--${arrow}`} viewBox="0 0 72 56" fill="none">
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="9"
              markerHeight="9"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M1 1L9 5L1 9Z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d={ARROWS[arrow]}
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            markerEnd={`url(#${markerId})`}
          />
        </svg>
      )}
    </span>
  )
}
