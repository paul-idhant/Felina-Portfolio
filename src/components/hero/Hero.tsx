import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { LiquidChrome } from '../reactbits/LiquidChrome'
import TrueFocus from '../reactbits/TrueFocus'
import { useInViewport } from '../../hooks/useInViewport'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { portfolio } from '../../data/portfolio'
import { ErrorBoundary } from '../layout/ErrorBoundary'

const Lanyard = lazy(() => import('../reactbits/Lanyard'))

export function Hero() {
  const { ref, inView } = useInViewport<HTMLElement>('160px')
  const reduced = useReducedMotion()
  const [hidden, setHidden] = useState(false)
  const [mountedCard, setMountedCard] = useState(true)

  useEffect(() => {
    let timeout: number | undefined
    const handleScroll = () => {
      const beyondHero = window.scrollY > Math.min(160, window.innerHeight * 0.18)
      if (beyondHero) {
        setHidden(true)
        timeout = window.setTimeout(() => setMountedCard(false), reduced ? 0 : 520)
      } else {
        if (timeout) window.clearTimeout(timeout)
        setMountedCard(true)
        setHidden(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); if (timeout) window.clearTimeout(timeout) }
  }, [reduced])

  return <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
    {inView && <div className="chrome-field" aria-hidden="true"><LiquidChrome baseColor={[0.03, 0.03, 0.03]} speed={reduced ? 0 : 0.2} amplitude={0.3} frequencyX={3} frequencyY={3} interactive={!reduced} /></div>}
    <div className="hero-vignette" aria-hidden="true" />
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-content">
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>01 / PERSONAL ARCHIVE · BENGALURU</motion.p>
      <h1 id="hero-title" aria-label="Felina Doungel"><span>FELINA</span><span>DOUNGEL</span></h1>
      <div className="hero-support">
        <p className="small-copy">from Bengaluru, India<br />student notes, pictures &amp; things in progress.</p>
        <a href="#archive" className="scroll-cue">Explore the archive <ArrowDown size={15} /></a>
      </div>
      <div className="true-focus-wrap" aria-label={portfolio.descriptor}>
        <TrueFocus sentence="student · creative · human-first" separator=" · " manualMode={reduced} blurAmount={reduced ? 0 : 3.5} borderColor="#ededeb" glowColor="rgba(255,255,255,.34)" animationDuration={reduced ? 0 : 0.55} pauseBetweenAnimations={1.65} />
      </div>
    </div>
    {mountedCard && inView && <motion.div className="lanyard-stage" initial={{ opacity: 0, y: -16 }} animate={{ opacity: hidden ? 0 : 1, y: hidden ? -130 : 0, scale: hidden ? 0.95 : 1 }} transition={{ duration: reduced ? 0 : 0.48, ease: 'easeOut' }} style={{ pointerEvents: hidden ? 'none' : 'auto' }} aria-label="A draggable personal ID card">
      <ErrorBoundary fallback={<div className="lanyard-fallback"><img src="/assets/lanyard/felina-card-front.svg" alt="Felina Doungel personal ID card" /></div>}><Suspense fallback={<div className="lanyard-fallback"><img src="/assets/lanyard/felina-card-front.svg" alt="Felina Doungel personal ID card" /></div>}>
        <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} fov={20} transparent frontImage="/assets/lanyard/felina-card-front.svg" backImage="/assets/lanyard/felina-card-back.svg" lanyardImage="/assets/lanyard/lanyard.png" lanyardWidth={1.05} />
      </Suspense></ErrorBoundary>
      <span className="lanyard-instruction">GRAB THE CARD</span>
    </motion.div>}
    <div className="hero-side-note">HUMAN-FIRST<br />ARCHIVE / 01</div>
    <a className="hero-instagram" href={portfolio.instagram} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={13} /></a>
  </section>
}
