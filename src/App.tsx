import { useCallback, useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Navigation } from './components/layout/Navigation'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Hero } from './components/hero/Hero'
import { DigiCam } from './components/archive/DigiCam'
import { SignBridgeProject } from './components/projects/SignBridgeProject'
import { About } from './components/about/About'
import { Footer } from './components/layout/Footer'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { LoaderFallback } from './components/loader/LoaderFallback'

const ClassicLaptopLoader = lazy(() =>
  import('./components/loader/ClassicLaptopLoader').then(module => ({
    default: module.ClassicLaptopLoader,
  }))
)

function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem('felina-archive-opened') !== 'true'
    } catch {
      return true
    }
  })
  const finishLoader = useCallback(() => {
    try {
      sessionStorage.setItem('felina-archive-opened', 'true')
    } catch {
      /* session storage is optional */
    }
    setLoading(false)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to archive
      </a>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="loader-layer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.025 }}
            transition={{ duration: 0.6 }}
          >
            <ErrorBoundary
              fallback={
                <div className="loader-error">
                  <img
                    src="/assets/laptop/classic-laptop-fallback.png"
                    alt="A classic beige laptop"
                  />
                  <button type="button" onClick={finishLoader}>
                    Enter archive →
                  </button>
                </div>
              }
            >
              <Suspense fallback={<LoaderFallback onFinish={finishLoader} />}>
                <ClassicLaptopLoader onFinish={finishLoader} />
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <ErrorBoundary
          fallback={
            <section className="hero hero-error">
              <h1>
                FELINA
                <br />
                DOUNGEL
              </h1>
              <p>
                student · creative · human-first
                <br />
                from Bengaluru, India
              </p>
            </section>
          }
        >
          <Hero />
        </ErrorBoundary>
        <DigiCam />
        <SignBridgeProject />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App

