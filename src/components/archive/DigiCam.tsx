import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Rotate3D } from 'lucide-react'
import { memories } from '../../data/memories'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useInViewport } from '../../hooks/useInViewport'
import { ErrorBoundary } from '../layout/ErrorBoundary'

const CanonCamera = lazy(() => import('./CanonCamera').then(module => ({ default: module.CanonCamera })))

function CameraFallback() {
  return <div className="canon-fallback">
    <img src="/assets/camera/camera-showroom-fallback.jpg" alt="A retro Canon AT-1 camera from the 3D showroom reference" />
    <p>3D camera is unavailable. The archive controls are still ready below.</p>
  </div>
}

export function DigiCam() {
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const { ref, inView } = useInViewport<HTMLDivElement>('320px')
  const current = memories[index]
  const next = useCallback(() => setIndex(value => (value + 1) % memories.length), [])
  const previous = useCallback(() => setIndex(value => (value - 1 + memories.length) % memories.length), [])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
      if (event.key.toLowerCase() === 'r') setShowBack(value => !value)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, previous])

  return <section id="archive" className="archive section-dark" aria-labelledby="archive-title">
    <div className="section-intro">
      <p className="eyebrow">02 / MEMORY ARCHIVE</p>
      <h2 id="archive-title">KEPT<br /><em>close.</em></h2>
      <p>Small moments will live here. Turn the camera over to browse the archive tucked onto its other side.</p>
    </div>

    <div ref={ref} className="canon-archive" aria-label="Interactive 3D Canon camera containing Felina’s photo archive">
      <div className="canon-canvas-wrap">
        {inView ? <ErrorBoundary fallback={<CameraFallback />}><Suspense fallback={<CameraFallback />}><CanonCamera current={current} showBack={showBack} isMobile={isMobile} /></Suspense></ErrorBoundary> : <CameraFallback />}
      </div>
      <div className="canon-hud">
        <div><span className="canon-status-dot" /> <span>{showBack ? `ARCHIVE 0${index + 1} / 0${memories.length} · ${current.date}` : 'CAMERA / FRONT VIEW'}</span></div>
        <p>{showBack ? current.caption : 'Drag to inspect the camera. Turn it over to find the archive.'}</p>
      </div>
      <div className="canon-controls">
        <button type="button" onClick={previous} aria-label="Show previous archive photograph"><ChevronLeft size={18} /><span>PREV</span></button>
        <button type="button" className="canon-turn" onClick={() => setShowBack(value => !value)} aria-pressed={showBack} aria-label={showBack ? 'Turn camera to front' : 'Turn camera to rear archive display'}><Rotate3D size={19} /><span>{showBack ? 'FRONT' : 'TURN OVER'}</span></button>
        <button type="button" onClick={next} aria-label="Show next archive photograph"><span>NEXT</span><ChevronRight size={18} /></button>
      </div>
    </div>
    <p className="archive-help">Drag to rotate the actual 3D model · Turn it over for the photo archive · ← → changes photographs · R flips the camera</p>
    <p className="archive-attribution">3D camera: <a href="https://sketchfab.com/3d-models/canon-at-1-retro-camera-9de66868d0f240e985da00c9480bfc82" target="_blank" rel="noreferrer">Canon AT-1 Retro Camera by AleixoAlonso</a> · CC BY 4.0 · integrated from <a href="https://github.com/TomPast/camera-3D-showroom" target="_blank" rel="noreferrer">camera-3D-showroom</a></p>
    {reduced && <p className="reduced-note">Motion is reduced; controls still work.</p>}
  </section>
}
