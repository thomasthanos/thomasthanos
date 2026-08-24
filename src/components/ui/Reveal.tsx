import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cx } from '../../utils'

interface RevealProps {
  children: ReactNode
  /** Stagger in ms. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fades content in the first time it scrolls into view.
 *
 * The important part is what happens when that never occurs. The element
 * starts at opacity 0, so anything that does not composite — a background tab,
 * a link-preview bot, a screenshot service, a browser without
 * IntersectionObserver — would otherwise be left staring at blank sections
 * forever. Three guarantees stop that:
 *
 *   1. anything already inside the viewport on mount is revealed immediately,
 *      without waiting for the observer;
 *   2. no IntersectionObserver means reveal everything at once;
 *   3. a backstop timer reveals regardless, so content is never permanently
 *      invisible no matter how the page is being rendered.
 */
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

    // (1) Already on screen — no reason to wait for a callback.
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

    // (3) Whatever happens, this content becomes readable.
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
