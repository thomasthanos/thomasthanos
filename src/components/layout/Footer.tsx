import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { useI18n } from '../../i18n/i18n'
import { footerLines, site } from '../../data/site'
import { external, pick } from '../../utils'
import './footer.css'

export function Footer() {
  const { t, tr } = useI18n()
  // Chosen once per mount so it does not flicker on every re-render.
  const line = useMemo(() => pick(footerLines), [])

  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__bar">
          <Link
            to="/"
            className="ftr__mark"
            aria-label={`${site.name} — ${t.nav.home}`}
          >
            <Logo size={25} />
            <span className="ftr__name">{site.name}</span>
          </Link>

          <span className="ftr__signature">{tr(line)}</span>

          <div className="ftr__meta">
            <span className="ftr__copyright">© {new Date().getFullYear()}</span>
            <a href={site.github} {...external}>
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
