import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { I18nProvider } from './i18n/i18n'
import { ChaosProvider } from './hooks/useChaos'
import { PageFallback } from './components/ui/PageFallback'
import { Home } from './pages/Home'

// Home ships in the entry chunk; everything else loads on navigation.
const Projects = lazy(() =>
  import('./pages/Projects').then((m) => ({ default: m.Projects })),
)
const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
)
const Stack = lazy(() => import('./pages/Stack').then((m) => ({ default: m.Stack })))
const Labs = lazy(() => import('./pages/Labs').then((m) => ({ default: m.Labs })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Contact = lazy(() =>
  import('./pages/Contact').then((m) => ({ default: m.Contact })),
)
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound })),
)

export default function App() {
  return (
    <I18nProvider>
      <ChaosProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="projects/:slug"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <ProjectDetail />
                  </Suspense>
                }
              />
              <Route
                path="stack"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Stack />
                  </Suspense>
                }
              />
              <Route
                path="labs"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Labs />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChaosProvider>
    </I18nProvider>
  )
}
