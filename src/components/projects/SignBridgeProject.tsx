import { ArrowUpRight, Award } from 'lucide-react'
import { SignBridgeShowcase } from './SignBridgeShowcase'
import { portfolio } from '../../data/portfolio'

export function SignBridgeProject() {
  return (
    <section id="work" className="project-section" aria-labelledby="project-title">
      <div className="project-heading">
        <div>
          <p className="eyebrow">03 / FEATURED PROJECT</p>
          <h2 id="project-title" className="featured-project-heading">
            SignBridge <em>· ISL AI</em>
          </h2>
        </div>
        <p className="project-overline">
          An AI-powered Indian Sign Language accessibility system
        </p>
      </div>

      {/* Modern Interactive Project Showcase */}
      <div className="project-showcase-stage">
        <SignBridgeShowcase />
      </div>

      {/* Project Story */}
      <div className="project-details">
        <div className="project-number">
          PROJECT<br />
          <strong>01</strong>
        </div>

        <div className="project-story">
          <h3>Breaking Communication Barriers with Human-Centric AI</h3>
          <p>
            SignBridge is an assistive communication system engineered to bridge the divide between Deaf and hearing communities across India. Built with on-device computer vision and natural language models, it delivers seamless bidirectional translation: converting Indian Sign Language (ISL) hand landmarks into real-time text/speech, and transcribing spoken voice into visual sign cues.
          </p>
          <div className="project-labels">
            <span>AI / ML</span>
            <span>INDIAN SIGN LANGUAGE</span>
            <span>ACCESSIBILITY</span>
            <span>ON-DEVICE PRIVACY</span>
            <span>MEDIAPIPE</span>
            <span>REACT</span>
          </div>
        </div>

        <div className="project-links">
          <a href={portfolio.signBridge.live} target="_blank" rel="noreferrer">
            <span>Explore live project</span> <ArrowUpRight size={16} />
          </a>
          <a href={portfolio.signBridge.github} target="_blank" rel="noreferrer">
            <span>View on GitHub</span> <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Exhibition & Technical Story Card */}
      <div className="exhibition-spotlight-card">
        <div className="exhibition-badge-col">
          <div className="exhibition-medal">
            <Award size={28} />
          </div>
          <span className="exhibition-year">SCIENCE EXHIBITION</span>
        </div>
        <div className="exhibition-text-col">
          <h4>Recognized Nationally at Bhavan Press School</h4>
          <p>
            At the <strong>All India Science Exhibition conducted at Bhavan Press School</strong>, SignBridge took top honors for its practical approach to assistive technology. Rather than relying on heavy cloud servers or invasive full-camera streaming, SignBridge extracts 21-point hand landmark vectors on-device—protecting user privacy while providing instantaneous translation under challenging low-bandwidth conditions.
          </p>
        </div>
      </div>

      {/* Early Activity & Telemetry Section */}
      <div className="impact-section" aria-labelledby="impact-title">
        <div className="impact-copy">
          <p className="eyebrow">04 / EARLY ACTIVITY &amp; DEPLOYMENT</p>
          <h3 id="impact-title">
            A bridge is only useful when it makes room for a real conversation.
          </h3>
          <p>
            SignBridge is designed to help Deaf and hearing people communicate more directly. Hand landmarks become text in milliseconds, and spoken language is presented through clear visual signs for natural conversation.
          </p>
          <p className="impact-disclaimer">
            The current build is an active prototype with a verified vocabulary. The telemetry below reflects live prototype activity across real testing sessions.
          </p>
        </div>

        <figure className="activity-card">
          <img
            src="/projects/signbridge-activity.png"
            alt="SignBridge deployment activity dashboard showing 159,640 total requests across 30 days"
          />
          <figcaption>
            <span>LAST 30 DAYS</span>
            <strong>159,640 <small>REQUESTS</small></strong>
            <p>Deployment activity from the live prototype capture.</p>
          </figcaption>
        </figure>

        <ul className="impact-list" aria-label="SignBridge capabilities">
          <li>
            <span>01</span>
            <strong>Sign → Text</strong>
            <p>21-point geometric hand landmarks translated into instant readable text.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Speech → Sign</strong>
            <p>Spoken words paired with synchronized sign visuals for mutual understanding.</p>
          </li>
          <li>
            <span>03</span>
            <strong>Privacy-First Edge AI</strong>
            <p>Processes skeleton vectors locally without storing or transmitting raw video.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
