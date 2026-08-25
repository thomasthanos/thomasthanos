import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import { ChaosLayer } from '@/features/chaos/ChaosLayer'
import { useI18n } from '@/i18n/i18n'

function useRouteChange(mainRef: React.RefObject<HTMLElement | null>) {
  const { pathname } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, mainRef])

  return pathname
}

export function RootLayout() {
  const { t, phase } = useI18n()
  const mainRef = useRef<HTMLElement>(null)
  const pathname = useRouteChange(mainRef)

  return (
    <>
      <a className="skip-link" href="#main">
        {t.common.skipToContent}
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} key={pathname} className="route-enter">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      {phase !== 'idle' && <span className="lang-sweep" aria-hidden="true" />}
      <ChaosLayer />
    </>
  )
}
