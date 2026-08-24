import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight, Github, X } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { Annotation } from '../ui/Annotation'
import { useI18n } from '../../i18n/i18n'
import { nav, site } from '../../data/site'
import { notes } from '../../data/notes'
import { external } from '../../utils'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

export function MobileNav({ onClose }: { onClose: () => void }) {
  const { t, tr } = useI18n()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // Trap focus inside the drawer.
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [onClose])

  return (
    <div
      className="drawer"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      ref={panelRef}
    >
      <div className="container drawer__top">
        <span className="brand">
          <Logo size={30} />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__sub">{site.studio}</span>
          </span>
        </span>
        <button
          type="button"
          className="icon-btn drawer__close"
          onClick={onClose}
          aria-label={t.nav.closeMenu}
          ref={closeRef}
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <div className="container drawer__body">
        <nav className="drawer__nav" aria-label={t.nav.primary}>
          <ul className="drawer__list">
            {nav.map((item, i) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  style={{ '--i': `${i * 40}ms` } as React.CSSProperties}
                  className={({ isActive }) =>
                    isActive ? 'drawer__link is-active' : 'drawer__link'
                  }
                >
                  <span className="drawer__rail" aria-hidden="true" />
                  <span className="drawer__idx" aria-hidden="true">
                    {item.index}
                  </span>
                  <span className="drawer__label">{t.nav[item.key]}</span>
                  <span className="drawer__hint" aria-hidden="true">
                    {t.nav.hint[item.key]}
                  </span>
                  <ArrowUpRight className="drawer__arrow" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Annotation className="drawer__note" arrow="se" tilt={-5} accent="violet">
          {tr(notes.menu)}
        </Annotation>

        <div className="drawer__foot">
          <a className="btn btn--ghost drawer__gh" href={site.github} {...external}>
            <Github aria-hidden="true" />
            {t.nav.github}
            <ArrowUpRight aria-hidden="true" />
          </a>

          <p className="drawer__sig">
            <span>{site.studio}</span>
            <span aria-hidden="true">/</span>
            <span>{tr(site.location)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
