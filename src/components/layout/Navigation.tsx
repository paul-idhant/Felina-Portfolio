import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { portfolio } from '../../data/portfolio'

const sections = [
  ['Home', 'home'],
  ['Archive', 'archive'],
  ['Work', 'work'],
  ['About', 'about'],
] as const

export function Navigation() {
  const [open, setOpen] = useState(false)
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <header className="site-nav">
      <a className="nav-monogram" href="#home" aria-label="Felina Doungel — back to home">FD<span>•</span>01</a>
      <button className="nav-menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="nav-links">
        <span>{open ? 'Close' : 'Index'}</span>{open ? <X size={16} /> : <Menu size={16} />}
      </button>
      <nav id="nav-links" className={open ? 'nav-links nav-links-open' : 'nav-links'} aria-label="Primary navigation">
        {sections.map(([label, id], index) => <button key={id} onClick={() => go(id)}><small>0{index + 1}</small>{label}</button>)}
        <a href={portfolio.instagram} target="_blank" rel="noreferrer"><small>05</small>Instagram ↗</a>
      </nav>
    </header>
  )
}
