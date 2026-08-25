import { useEffect, useState, type CSSProperties } from 'react'
import { useI18n } from '@/i18n/i18n'
import '@/components/ui/back-to-top.css'

export function BackToTop() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)
  const [footerLift, setFooterLift] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const threshold = Math.max(520, window.innerHeight * 0.65)
        setVisible(window.scrollY > threshold)

        const footer = document.querySelector<HTMLElement>('.ftr')
        if (!footer) {
          setFooterLift(0)
          return
        }

        const rect = footer.getBoundingClientRect()
        const overlap = Math.max(
          0,
          Math.min(rect.height, window.innerHeight - rect.top),
        )
        setFooterLift(Math.round(overlap))
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <button
      type="button"
      className={`backtop${visible ? ' backtop--visible' : ''}`}
      aria-label={t.common.backToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{ '--backtop-lift': `${footerLift}px` } as CSSProperties}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
    >
      <svg
        className="backtop__icon"
        viewBox="0 0 384 512"
        aria-hidden="true"
      >
        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
      </svg>
      <span className="backtop__label">{t.common.backToTop}</span>
    </button>
  )
}
