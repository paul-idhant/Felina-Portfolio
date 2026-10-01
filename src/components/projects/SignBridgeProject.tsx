import { ArrowUpRight } from 'lucide-react'
import { MacbookScroll } from '../ui/macbook-scroll'
import { portfolio } from '../../data/portfolio'

export function SignBridgeProject() {
  return <section id="work" className="project-section" aria-labelledby="project-title">
    <div className="project-heading">
      <p className="eyebrow">03 / FEATURED PROJECT</p>
      <p className="project-overline">A design &amp; communication study</p>
    </div>

    <div className="macbook-stage">
      <MacbookScroll
        src="/projects/signbridge-interface.png"
        showGradient={false}
        title={<span id="project-title">SignBridge<br /><i>opens a conversation.</i></span>}
        badge={<span className="macbook-badge">01 / SIGNBRIDGE</span>}
      />
    </div>

    <div className="project-details">
      <div className="project-number">PROJECT<br /><strong>01</strong></div>
      <div className="project-story">
        <h2>SignBridge</h2>
        <p>An AI-powered Indian Sign Language communication system focused on making communication more accessible while keeping user privacy at the centre.</p>
        <div className="project-labels"><span>AI</span><span>ACCESSIBILITY</span><span>INDIAN SIGN LANGUAGE</span><span>PRIVACY</span></div>
      </div>
      <div className="project-links">
        <a href={portfolio.signBridge.live} target="_blank" rel="noreferrer">Explore live project <ArrowUpRight size={16} /></a>
        <a href={portfolio.signBridge.github} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={16} /></a>
      </div>
    </div>

    <div className="impact-section" aria-labelledby="impact-title">
      <div className="impact-copy">
        <p className="eyebrow">04 / EARLY ACTIVITY</p>
        <h3 id="impact-title">A bridge is only useful when it makes room for a real conversation.</h3>
        <p>SignBridge is designed to help Deaf and hearing people communicate more directly: hand landmarks can become text, and spoken language can be presented through sign visuals.</p>
        <p className="impact-disclaimer">The current build is an honest prototype with a controlled vocabulary—not a complete sign-language interpreter. The request figure is activity, not a count of people or an unverified impact claim.</p>
      </div>
      <figure className="activity-card">
        <img src="/projects/signbridge-activity.png" alt="SignBridge deployment activity dashboard showing 159,640 total requests across 30 days" />
        <figcaption><span>LAST 30 DAYS</span><strong>159,640 <small>REQUESTS</small></strong><p>Deployment activity from the supplied dashboard capture.</p></figcaption>
      </figure>
      <ul className="impact-list" aria-label="SignBridge capabilities">
        <li><span>01</span><strong>Sign → Text</strong><p>Hand landmarks can be translated into a readable output.</p></li>
        <li><span>02</span><strong>Speech → Sign</strong><p>Spoken words can be paired with sign visuals for a shared exchange.</p></li>
        <li><span>03</span><strong>Privacy-aware</strong><p>Designed around landmarks rather than showing a raw camera feed.</p></li>
      </ul>
    </div>
  </section>
}
