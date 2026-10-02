import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Pause,
  Grid,
  Camera,
  X,
  Sparkles,
  Info,
  Calendar,
  MapPin,
  Tag,
} from 'lucide-react'
import { memories, type Memory } from '../../data/memories'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function DigiCam() {
  const [index, setIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'camera' | 'grid'>('camera')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showOsd, setShowOsd] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const reduced = useReducedMotion()

  const current: Memory = memories[index]

  const triggerFlash = useCallback(() => {
    if (reduced) return
    setFlashing(true)
    window.setTimeout(() => setFlashing(false), 160)
  }, [reduced])

  const next = useCallback(() => {
    triggerFlash()
    setIndex(prev => (prev + 1) % memories.length)
  }, [triggerFlash])

  const previous = useCallback(() => {
    triggerFlash()
    setIndex(prev => (prev - 1 + memories.length) % memories.length)
  }, [triggerFlash])

  const selectPhoto = useCallback(
    (targetIndex: number) => {
      triggerFlash()
      setIndex(targetIndex)
    },
    [triggerFlash]
  )

  // Autoplay slideshow timer
  useEffect(() => {
    if (isPlaying && !lightboxOpen) {
      timerRef.current = window.setInterval(() => {
        setIndex(prev => (prev + 1) % memories.length)
      }, 3400)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, lightboxOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false)
        if (e.key === 'ArrowRight') next()
        if (e.key === 'ArrowLeft') previous()
        return
      }
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') previous()
      if (e.key === ' ') {
        e.preventDefault()
        setIsPlaying(p => !p)
      }
      if (e.key.toLowerCase() === 'f' || e.key === 'Enter') setLightboxOpen(true)
      if (e.key.toLowerCase() === 'g') setViewMode(v => (v === 'camera' ? 'grid' : 'camera'))
      if (e.key.toLowerCase() === 'd') setShowOsd(o => !o)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, next, previous])

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) next()
      else previous()
    }
    touchStartX.current = null
  }

  return (
    <section id="archive" className="archive section-dark" aria-labelledby="archive-title">
      <div className="section-intro">
        <p className="eyebrow">02 / MEMORY ARCHIVE</p>
        <h2 id="archive-title">
          KEPT
          <br />
          <em>close.</em>
        </h2>
        <div className="archive-intro-copy">
          <p>
            Memories, snapshots, and moments in progress. Browse through the digital camera archive or explore the full gallery.
          </p>
          <div className="archive-view-pills">
            <button
              type="button"
              className={viewMode === 'camera' ? 'view-pill active' : 'view-pill'}
              onClick={() => setViewMode('camera')}
              aria-pressed={viewMode === 'camera'}
            >
              <Camera size={13} />
              <span>DigiCam</span>
            </button>
            <button
              type="button"
              className={viewMode === 'grid' ? 'view-pill active' : 'view-pill'}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
            >
              <Grid size={13} />
              <span>All Photos ({memories.length})</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'camera' ? (
        <div className="digicam-shell" aria-label="Interactive 2000s Retro DigiCam Archive">
          {/* Camera Top Chrome Plate */}
          <div className="digicam-top">
            <div className="digicam-top-left">
              <span className="digicam-logo">FELINA·CAM</span>
              <span className="digicam-sublogo">DC-2000 DIGITAL</span>
            </div>
            <div className="digicam-top-right">
              <span className="digicam-badge">
                <span className="rec-dot" /> LIVE
              </span>
              <span className="digicam-badge">SD 32GB · 4K</span>
              <span className="digicam-battery" title="Battery: 100%">
                <i className="bar" />
                <i className="bar" />
                <i className="bar" />
              </span>
            </div>
          </div>

          {/* Camera Main Body */}
          <div className="digicam-body">
            {/* Screen Section */}
            <div className="camera-screen-wrap">
              <div
                className="camera-screen"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => setLightboxOpen(true)}
                title="Click to view full resolution"
              >
                {/* Shutter flash animation layer */}
                {flashing && <div className="shutter-flash" aria-hidden="true" />}

                {/* Actual Photo Display */}
                <img
                  key={current.id}
                  src={current.src}
                  alt={current.alt}
                  className="camera-photo-img"
                  loading="eager"
                />

                {/* Retro CRT / CCD scanlines */}
                <div className="ccd-lines" aria-hidden="true" />

                {/* Viewfinder Overlay / OSD */}
                {showOsd && (
                  <div className="viewfinder-osd">
                    <div className="screen-top">
                      <span className="osd-mode">
                        <span className="osd-rec-light" />
                        PLAY 00:0{index + 1}
                      </span>
                      <span className="osd-lens">⚡ AUTO · F2.8 · ISO 100</span>
                    </div>

                    <div className="screen-center-crosshair">
                      <span className="bracket tl" />
                      <span className="bracket tr" />
                      <span className="bracket bl" />
                      <span className="bracket br" />
                      <span className="crosshair-dot" />
                    </div>

                    <div className="screen-bottom">
                      <span className="osd-title">
                        <b>0{index + 1}/0{memories.length}</b> {current.title}
                      </span>
                      <span className="osd-date">
                        {current.date} {current.tag && `[${current.tag}]`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Expand overlay button */}
                <button
                  type="button"
                  className="screen-expand-btn"
                  onClick={e => {
                    e.stopPropagation()
                    setLightboxOpen(true)
                  }}
                  aria-label="Open fullscreen photo"
                  title="Fullscreen"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Photo Caption & Metadata Box */}
              <div className="camera-info-banner">
                <div className="info-main">
                  <strong>{current.title}</strong>
                  <p>{current.caption}</p>
                </div>
                <div className="info-tags">
                  <span>
                    <Calendar size={11} /> {current.date}
                  </span>
                  <span>
                    <MapPin size={11} /> {current.location}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip / Filmstrip */}
              <div className="filmstrip-row" aria-label="Photo filmstrip selector">
                {memories.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`filmstrip-item ${idx === index ? 'active' : ''}`}
                    onClick={() => selectPhoto(idx)}
                    aria-label={`View photo ${idx + 1}: ${m.title}`}
                    aria-pressed={idx === index}
                  >
                    <img src={m.src} alt="" />
                    <span className="thumb-idx">0{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Controls Panel (Right Side) */}
            <div className="camera-controls">
              <div className="control-header">
                <div className="camera-brand">
                  FELINA <span>3.2x OPTICAL</span>
                </div>
                <div className="optical-viewfinder-glass" title="Optical Viewfinder">
                  <div className="viewfinder-reticle" />
                </div>
              </div>

              <div className="speaker-and-leds">
                <div className="speaker">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <i key={i} />
                  ))}
                </div>
                <div className="status-leds">
                  <span className={`led-dot ${isPlaying ? 'pulse' : ''}`} title="Slideshow status" />
                  <small>{isPlaying ? 'PLAYING' : 'READY'}</small>
                </div>
              </div>

              {/* Physical D-Pad */}
              <div className="dpad" role="group" aria-label="DigiCam D-Pad Navigation">
                <button
                  type="button"
                  className="dpad-btn dpad-left"
                  onClick={previous}
                  aria-label="Previous photograph"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="dpad-btn dpad-center"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Open high-res lightbox"
                  title="Open Fullscreen (F)"
                >
                  <span>OK</span>
                </button>
                <button
                  type="button"
                  className="dpad-btn dpad-right"
                  onClick={next}
                  aria-label="Next photograph"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  className="dpad-btn dpad-up"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Zoom photo"
                  title="Zoom / Fullscreen"
                >
                  <span className="arrow-sym">▲</span>
                </button>
                <button
                  type="button"
                  className="dpad-btn dpad-down"
                  onClick={() => setShowOsd(o => !o)}
                  aria-label="Toggle camera OSD display"
                  title="Toggle OSD (D)"
                >
                  <span className="arrow-sym">▼</span>
                </button>
              </div>

              {/* Utility Push Buttons */}
              <div className="camera-utility-grid">
                <button
                  type="button"
                  className={`cam-util-btn ${isPlaying ? 'active' : ''}`}
                  onClick={() => setIsPlaying(p => !p)}
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isPlaying ? 'PAUSE' : 'AUTO'}</span>
                </button>

                <button
                  type="button"
                  className="cam-util-btn"
                  onClick={triggerFlash}
                  aria-label="Simulate camera flash snap"
                  title="Flash snap"
                >
                  <Sparkles size={12} />
                  <span>SNAP</span>
                </button>

                <button
                  type="button"
                  className={`cam-util-btn ${showOsd ? 'active' : ''}`}
                  onClick={() => setShowOsd(o => !o)}
                  aria-label="Toggle display overlays"
                  title="Toggle OSD"
                >
                  <Info size={12} />
                  <span>DISP</span>
                </button>

                <button
                  type="button"
                  className="cam-util-btn"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Open fullscreen view"
                  title="Fullscreen modal"
                >
                  <Maximize2 size={12} />
                  <span>ZOOM</span>
                </button>
              </div>

              <div className="camera-footer-note">
                <span>CCD 1/1.8" SENSOR</span>
                <span>MADE IN 2026</span>
              </div>
            </div>
          </div>

          {/* Camera Base Details */}
          <div className="digicam-base">
            <i></i>
            <span>FELINA DOUNGEL MEMORY VAULT · HIGH RESOLUTION ARCHIVE</span>
            <i></i>
          </div>
        </div>
      ) : (
        /* Full Gallery Grid View */
        <div className="gallery-grid-wrap" aria-label="Photo Gallery Grid">
          <div className="gallery-grid">
            {memories.map((m, idx) => (
              <div
                key={m.id}
                className="gallery-card"
                onClick={() => {
                  setIndex(idx)
                  setLightboxOpen(true)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setIndex(idx)
                    setLightboxOpen(true)
                  }
                }}
              >
                <div className="gallery-card-img-wrap">
                  <img src={m.src} alt={m.alt} loading="lazy" />
                  <span className="gallery-card-idx">0{idx + 1}</span>
                  {m.tag && <span className="gallery-card-tag">{m.tag}</span>}
                </div>
                <div className="gallery-card-meta">
                  <h3>{m.title}</h3>
                  <p>{m.caption}</p>
                  <div className="gallery-card-sub">
                    <span>
                      <Calendar size={11} /> {m.date}
                    </span>
                    <span>
                      <MapPin size={11} /> {m.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helpful Key Shortcuts Indicator */}
      <p className="archive-help">
        ← → Navigate pictures · Space Slideshow · Click picture or press F for Fullscreen · G Grid View
      </p>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="digicam-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo details: ${current.title}`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox-dialog" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen modal"
            >
              <X size={20} />
            </button>

            <div
              className="lightbox-media-wrap"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={previous}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="lightbox-image-stage">
                <img src={current.src} alt={current.alt} />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={next}
                aria-label="Next photograph"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="lightbox-caption-bar">
              <div className="lightbox-caption-main">
                <span className="lightbox-badge">
                  0{index + 1} / 0{memories.length}
                </span>
                <h3>{current.title}</h3>
                <p>{current.caption}</p>
              </div>
              <div className="lightbox-meta-details">
                <span>
                  <Calendar size={13} /> {current.date}
                </span>
                <span>
                  <MapPin size={13} /> {current.location}
                </span>
                {current.tag && (
                  <span>
                    <Tag size={13} /> {current.tag}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
