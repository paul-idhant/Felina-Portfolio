import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-topline"><span>09 / END OF ARCHIVE</span><span>© 2026 FELINA DOUNGEL</span></div>
      <h2>GOOD<br />CONVERSATIONS<span className="period">.</span></h2>
      <div className="footer-bottom">
        <a className="footer-instagram" href={portfolio.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16} /></a>
        <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </div>
      <p className="credit"><a href={portfolio.idhant} target="_blank" rel="noreferrer">built with help from Idhant ↗</a></p>
    </footer>
  )
}
