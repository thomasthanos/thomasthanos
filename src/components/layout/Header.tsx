import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Github, Menu } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { LangSwitch } from '../ui/LangSwitch'
import { ChaosToggle } from '../chaos/ChaosToggle'
import { MobileNav } from './MobileNav'
import { useI18n } from '../../i18n/i18n'
import { nav, site } from '../../data/site'
import { external } from '../../utils'
import './header.css'

export function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const barRef = useRef<HTMLDivElement>(null)

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  // Scroll progress hairline. rAF-throttled, transform-only.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = barRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.transform = `scaleX(${p})`
      el.style.width = '100%'
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <header className="hdr">
        <div className="container hdr__inner">
          <Link to="/" className="brand" aria-label={`${site.name} — ${t.nav.home}`}>
            <Logo size={30} className="brand__mark" />
            <span className="brand__text">
              <span className="brand__name">{site.name}</span>
              <span className="brand__sub">{site.studio}</span>
            </span>
          </Link>

          <nav className="nav" aria-label={t.nav.primary}>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav__link is-active' : 'nav__link'
                }
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
          </nav>

          <span className="hdr__spacer" />

          <div className="hdr__tools">
            <ChaosToggle />
            <LangSwitch />
            <a
              className="icon-btn"
              href={site.github}
              {...external}
              aria-label={`${t.nav.github} — ${t.common.external}`}
            >
              <Github aria-hidden="true" />
            </a>
            <button
              type="button"
              className="icon-btn burger"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-haspopup="dialog"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="hdr__progress" ref={barRef} aria-hidden="true" />
      </header>

      {open && <MobileNav onClose={() => setOpen(false)} />}
    </>
  )
}
