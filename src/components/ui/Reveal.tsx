import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cx } from '@/utils'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
}

const BACKSTOP_MS = 1500

export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const box = el.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        setVisible(true)
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)

    const backstop = window.setTimeout(() => setVisible(true), BACKSTOP_MS)

    return () => {
      io.disconnect()
      window.clearTimeout(backstop)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
