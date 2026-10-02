import { lazy, Suspense, useState } from 'react'
import { useInViewport } from '../../hooks/useInViewport'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ErrorBoundary } from '../layout/ErrorBoundary'

const DitherVeil = lazy(() => import('../reactbits/DitherVeil'))
const PaperCrumple = lazy(() => import('../reactbits/PaperCrumple'))

export function About() {
  const { ref: aboutRef, inView: aboutInView } = useInViewport<HTMLElement>('250px')
  const { ref: noteRef, inView: noteInView } = useInViewport<HTMLDivElement>('320px')
  const reduced = useReducedMotion()
  const [paperState, setPaperState] = useState('ready')

  return <section id="about" ref={aboutRef} className="about-section" aria-labelledby="about-title">
    <div className="about-heading">
      <p className="eyebrow">04 / ABOUT THE PERSON</p>
      <h2 id="about-title">A little<br /><em>closer.</em></h2>
    </div>
    <div className="about-main">
      <div className="veil-card">
        {aboutInView ? <ErrorBoundary fallback={<img src="/photos/felina-portrait.webp" alt="Felina Doungel in a monochrome portrait" />}><Suspense fallback={<img src="/photos/felina-portrait.webp" alt="Felina Doungel in a monochrome portrait" />}><DitherVeil src="/photos/felina-portrait.webp" fit="cover" pattern="floyd" palette="duotone" pixelSize={2} levels={2} inkColor="#101010" paperColor="#f2f0e9" contrast={1.15} brightness={0} revealRadius={170} softness={0.65} linger={reduced ? 0 : 1} rim={0} reverse={false} wander={!reduced} clickBurst={!reduced} /></Suspense></ErrorBoundary> : <img src="/photos/felina-portrait.webp" alt="Felina Doungel in a monochrome portrait" />}
        <div className="veil-overlay"><span>MOVE / TOUCH TO REVEAL</span><span>PORTRAIT 01</span></div>
      </div>
      <article className="about-copy">
        <p className="lead">I’m a student, a creative, and the kind of person who will probably try it just to see if it works.</p>
        <p>I love football, singing, and, lowkey, dancing too — when my mind decides to cooperate. I’m naturally social, comfortable around people, and happiest when a random idea starts becoming something real.</p>
        <p>I prefer people, instincts, and actual personality over machines trying to do everything for us. AI? I have notes.</p>
        <div className="about-stamp"><span>OPEN TO</span><strong>GOOD<br />CONVERSATIONS</strong><span>2026 / BENGALURU</span></div>
      </article>
    </div>
    <div className="note-section" ref={noteRef}>
      <div className="note-instruction"><p className="eyebrow">05 / MICRO-ARCHIVE</p><h3>Hold the<br />note.</h3><p>It is meant to be held, moved, and unfolded. A small reminder for later.</p><small>{paperState === 'holding' ? 'CRUMPLING…' : 'HOLD / DRAG / RELEASE'}</small></div>
      <div className="paper-stage">
        {noteInView ? <Suspense fallback={<img src="/notes/note-front.svg" alt="A personal note from Felina" className="paper-static" />}><PaperCrumple src="/notes/note-front.svg" alt="A personal note from Felina" width={400} height={400} sceneHeight={560} imageFit="contain" releaseBehavior="creased" crumpleAmount={0.85} crumpleDuration={0.55} releaseDuration={0.4} foldCount={6} foldSharpness={0.6} wrinkleDepth={0.65} creaseStrength={0.18} paperColor="#f4f0e8" roughness={0.92} paperTexture={0.08} draggable dragRotation={10} dragRadius={180} returnToOrigin onStateChange={state => setPaperState(state)} onError={() => setPaperState('fallback')} /></Suspense> : <img src="/notes/note-front.svg" alt="A personal note from Felina" className="paper-static" />}
      </div>
    </div>
  </section>
}
