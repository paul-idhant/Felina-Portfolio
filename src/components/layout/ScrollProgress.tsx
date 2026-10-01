import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const max = document.documentElement.scrollHeight - window.innerHeight
            const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
            barRef.current.style.transform = `scaleX(${progress})`
          }
          ticking = false
        })
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <i ref={barRef} style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

