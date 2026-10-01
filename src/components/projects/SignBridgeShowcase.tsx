import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Trophy,
  ExternalLink,
  Maximize2,
  ShieldCheck,
  Activity,
  Hand,
  Volume2,
  Lock,
  ArrowUpRight,
  X,
  Layers,
} from 'lucide-react'
import { portfolio } from '../../data/portfolio'

type ViewMode = 'interface' | 'activity' | 'ai-landmarks'

export function SignBridgeShowcase() {
  const [activeTab, setActiveTab] = useState<ViewMode>('interface')
  const [privacyMode, setPrivacyMode] = useState(true)
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [recognizedSign, setRecognizedSign] = useState('HELLO / नमस्ते')

  const sampleSigns = [
    { label: 'HELLO', phrase: 'HELLO / नमस्ते', confidence: '99.4%', hand: 'Right Hand · Open Palm Wave' },
    { label: 'THANK YOU', phrase: 'THANK YOU / धन्यवाद', confidence: '98.8%', hand: 'Right Hand · Chin to Forward' },
    { label: 'WELCOME', phrase: 'WELCOME / स्वागत', confidence: '97.6%', hand: 'Both Hands · Open Arc Sweep' },
    { label: 'FRIEND', phrase: 'FRIEND / मित्र', confidence: '99.1%', hand: 'Dual Index Hook Interlock' },
    { label: 'HOW ARE YOU', phrase: 'HOW ARE YOU? / आप कैसे हैं?', confidence: '96.9%', hand: 'Chest Outward Hand Sweep' },
  ]

  return (
    <div className="signbridge-showcase-container">
      {/* Main Workstation / Studio Mockup */}
      <motion.div
        className="showcase-workstation"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Workstation Header Bar */}
        <div className="workstation-chrome">
          <div className="chrome-controls">
            <span className="dot dot-close" />
            <span className="dot dot-minimize" />
            <span className="dot dot-expand" />
          </div>

          <div className="chrome-url-bar">
            <Lock size={11} className="url-lock" />
            <span className="url-protocol">https://</span>
            <span className="url-domain">signbridge.ai</span>
            <span className="url-path">/app/workspace</span>
          </div>

          <div className="chrome-meta">
            <span className="live-status-pill">
              <span className="live-pulse-dot" />
              SYSTEM ACTIVE
            </span>
            <button
              className="chrome-expand-btn"
              onClick={() => setLightboxOpen(true)}
              title="Fullscreen Preview"
              aria-label="Fullscreen Preview"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="showcase-tabs-bar">
          <div className="showcase-tabs">
            <button
              className={`showcase-tab ${activeTab === 'interface' ? 'active' : ''}`}
              onClick={() => setActiveTab('interface')}
            >
              <Layers size={13} />
              <span>SignBridge UI</span>
            </button>
            <button
              className={`showcase-tab ${activeTab === 'ai-landmarks' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai-landmarks')}
            >
              <Hand size={13} />
              <span>ISL Landmark Engine</span>
              <span className="tab-pill">Interactive</span>
            </button>
            <button
              className={`showcase-tab ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity size={13} />
              <span>Live Telemetry</span>
              <span className="tab-metric">159.6k</span>
            </button>
          </div>

          <div className="showcase-quick-actions">
            <a
              href={portfolio.signBridge.live}
              target="_blank"
              rel="noreferrer"
              className="quick-action-link primary"
            >
              <span>Try Live Demo</span>
              <ExternalLink size={12} />
            </a>
            <a
              href={portfolio.signBridge.github}
              target="_blank"
              rel="noreferrer"
              className="quick-action-link secondary"
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Display Canvas Viewport */}
        <div className="showcase-viewport">
          <AnimatePresence mode="wait">
            {activeTab === 'interface' && (
              <motion.div
                key="interface"
                className="viewport-screen interface-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <div className="image-wrapper" onClick={() => setLightboxOpen(true)}>
                  <img
                    src="/projects/signbridge-interface.png"
                    alt="SignBridge AI Accessible Communication Interface"
                    className="viewport-img"
                  />
                  <div className="screen-hover-overlay">
                    <span className="overlay-pill">
                      <Maximize2 size={14} /> Click to expand high-res view
                    </span>
                  </div>
                </div>
                <div className="screen-info-footer">
                  <div className="info-stat">
                    <span className="stat-label">Model Architecture</span>
                    <span className="stat-value">On-Device ISL Transformer</span>
                  </div>
                  <div className="info-stat">
                    <span className="stat-label">Inference Latency</span>
                    <span className="stat-value highlight-green">&lt; 32ms (Real-time)</span>
                  </div>
                  <div className="info-stat">
                    <span className="stat-label">Communication Flow</span>
                    <span className="stat-value">Bidirectional (ISL ↔ Voice)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-landmarks' && (
              <motion.div
                key="ai-landmarks"
                className="viewport-screen landmarks-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <div className="landmarks-stage">
                  {/* Simulated Camera & Skeletal Canvas */}
                  <div className={`camera-simulation ${privacyMode ? 'privacy-active' : ''}`}>
                    {/* Background Grid & Privacy Mask */}
                    <div className="sim-cyber-grid" />
                    <div className="sim-privacy-mesh">
                      <div className="privacy-badge">
                        <ShieldCheck size={14} />
                        <span>ZERO VIDEO STREAMING · LOCAL SKELETON EXTRACTION</span>
                      </div>
                    </div>

                    {/* Hand 21-Landmark Vector Overlay SVG */}
                    <svg className="landmark-svg" viewBox="0 0 500 400">
                      {/* Skeletal connecting lines */}
                      <g className="bone-lines" stroke="#00e5ff" strokeWidth="2.5" strokeOpacity="0.75" strokeLinecap="round">
                        {/* Palm */}
                        <line x1="250" y1="340" x2="200" y2="280" />
                        <line x1="250" y1="340" x2="235" y2="240" />
                        <line x1="250" y1="340" x2="270" y2="240" />
                        <line x1="250" y1="340" x2="300" y2="255" />
                        <line x1="250" y1="340" x2="325" y2="285" />
                        {/* Thumb */}
                        <line x1="200" y1="280" x2="165" y2="240" />
                        <line x1="165" y1="240" x2="145" y2="200" />
                        <line x1="145" y1="200" x2="135" y2="165" />
                        {/* Index */}
                        <line x1="235" y1="240" x2="230" y2="180" />
                        <line x1="230" y1="180" x2="225" y2="130" />
                        <line x1="225" y1="130" x2="220" y2="85" />
                        {/* Middle */}
                        <line x1="270" y1="240" x2="270" y2="170" />
                        <line x1="270" y1="170" x2="270" y2="115" />
                        <line x1="270" y1="115" x2="270" y2="65" />
                        {/* Ring */}
                        <line x1="300" y1="255" x2="305" y2="190" />
                        <line x1="305" y1="190" x2="310" y2="140" />
                        <line x1="310" y1="140" x2="315" y2="95" />
                        {/* Pinky */}
                        <line x1="325" y1="285" x2="340" y2="235" />
                        <line x1="340" y1="235" x2="350" y2="190" />
                        <line x1="350" y1="190" x2="360" y2="150" />
                      </g>

                      {/* 21 Keypoint Nodes */}
                      {[
                        { id: 0, x: 250, y: 340, name: 'Wrist' },
                        { id: 1, x: 200, y: 280, name: 'Thumb CMC' },
                        { id: 2, x: 165, y: 240, name: 'Thumb MCP' },
                        { id: 3, x: 145, y: 200, name: 'Thumb IP' },
                        { id: 4, x: 135, y: 165, name: 'Thumb Tip' },
                        { id: 5, x: 235, y: 240, name: 'Index MCP' },
                        { id: 6, x: 230, y: 180, name: 'Index PIP' },
                        { id: 7, x: 225, y: 130, name: 'Index DIP' },
                        { id: 8, x: 220, y: 85, name: 'Index Tip' },
                        { id: 9, x: 270, y: 240, name: 'Middle MCP' },
                        { id: 10, x: 270, y: 170, name: 'Middle PIP' },
                        { id: 11, x: 270, y: 115, name: 'Middle DIP' },
                        { id: 12, x: 270, y: 65, name: 'Middle Tip' },
                        { id: 13, x: 300, y: 255, name: 'Ring MCP' },
                        { id: 14, x: 305, y: 190, name: 'Ring PIP' },
                        { id: 15, x: 310, y: 140, name: 'Ring DIP' },
                        { id: 16, x: 315, y: 95, name: 'Ring Tip' },
                        { id: 17, x: 325, y: 285, name: 'Pinky MCP' },
                        { id: 18, x: 340, y: 235, name: 'Pinky PIP' },
                        { id: 19, x: 350, y: 190, name: 'Pinky DIP' },
                        { id: 20, x: 360, y: 150, name: 'Pinky Tip' },
                      ].map((node) => (
                        <g
                          key={node.id}
                          className="landmark-node"
                          onClick={() => setSelectedLandmark(node.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={selectedLandmark === node.id ? 8 : 5}
                            fill={selectedLandmark === node.id ? '#ffffff' : '#00e5ff'}
                            stroke="#0a192f"
                            strokeWidth="2"
                            className="landmark-dot"
                          />
                          {selectedLandmark === node.id && (
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={14}
                              fill="none"
                              stroke="#00e5ff"
                              strokeWidth="1.5"
                              strokeDasharray="3 2"
                              className="animate-spin-slow"
                            />
                          )}
                        </g>
                      ))}
                    </svg>

                    {/* Real-time Recognition Banner */}
                    <div className="recognition-hud">
                      <div className="hud-header">
                        <span className="hud-badge">ISL RECOGNITION LIVE</span>
                        <span className="hud-confidence">99.4% CONFIDENCE</span>
                      </div>
                      <div className="hud-output">
                        <span className="hud-text">{recognizedSign}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Interactive Sign Tester */}
                  <div className="landmarks-sidebar">
                    <div className="sidebar-top">
                      <span className="sidebar-title">Test Sign Vocabulary</span>
                      <button
                        className={`privacy-toggle ${privacyMode ? 'active' : ''}`}
                        onClick={() => setPrivacyMode(!privacyMode)}
                      >
                        <ShieldCheck size={13} />
                        <span>{privacyMode ? 'Privacy On' : 'Privacy Off'}</span>
                      </button>
                    </div>

                    <div className="sign-buttons-list">
                      {sampleSigns.map((sign) => (
                        <button
                          key={sign.label}
                          className={`sign-select-btn ${recognizedSign === sign.phrase ? 'active' : ''}`}
                          onClick={() => setRecognizedSign(sign.phrase)}
                        >
                          <div className="btn-left">
                            <span className="sign-name">{sign.label}</span>
                            <span className="sign-detail">{sign.hand}</span>
                          </div>
                          <span className="sign-conf">{sign.confidence}</span>
                        </button>
                      ))}
                    </div>

                    <div className="landmark-tech-note">
                      <Lock size={12} className="note-icon" />
                      <p>
                        Video frames are never transmitted. Only normalized 21-point 3D landmark arrays are parsed on-device via WebAssembly.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                className="viewport-screen activity-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <div className="image-wrapper" onClick={() => setLightboxOpen(true)}>
                  <img
                    src="/projects/signbridge-activity.png"
                    alt="SignBridge Deployment Activity - 159,640 Requests"
                    className="viewport-img"
                  />
                  <div className="screen-hover-overlay">
                    <span className="overlay-pill">
                      <Maximize2 size={14} /> Click to expand telemetry report
                    </span>
                  </div>
                </div>
                <div className="screen-info-footer">
                  <div className="info-stat">
                    <span className="stat-label">Total Prototype Requests</span>
                    <span className="stat-value highlight-cyan">159,640 Calls</span>
                  </div>
                  <div className="info-stat">
                    <span className="stat-label">Evaluation Period</span>
                    <span className="stat-value">30 Days Continuous Deployment</span>
                  </div>
                  <div className="info-stat">
                    <span className="stat-label">System Availability</span>
                    <span className="stat-value highlight-green">99.98% Uptime</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Feature Pillars Grid */}
      <div className="showcase-pillars-grid">
        <div className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-number">01</span>
            <Hand size={18} className="pillar-icon" />
          </div>
          <h4>Sign → Text Conversion</h4>
          <p>
            MediaPipe-extracted hand landmarks are converted into normalized coordinate tensors and matched against Indian Sign Language grammatical structures.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-number">02</span>
            <Volume2 size={18} className="pillar-icon" />
          </div>
          <h4>Speech → Visual Sign</h4>
          <p>
            Spoken language is transcribed with sub-second accuracy and synthesized into synchronized sign gestures for fluid, reciprocal two-way dialog.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-number">03</span>
            <ShieldCheck size={18} className="pillar-icon" />
          </div>
          <h4>Privacy-Preserving Edge AI</h4>
          <p>
            No raw camera video or facial imagery leaves the device. Calculations happen locally over anonymized skeletal nodes to protect user identity.
          </p>
        </div>

        <div className="pillar-card award-pillar">
          <div className="pillar-header">
            <span className="pillar-number">04</span>
            <Trophy size={18} className="pillar-icon gold" />
          </div>
          <h4>All India Exhibition Winner</h4>
          <p>
            Demonstrated live at <strong>Bhavan Press School</strong>, taking First Place nationally for solving genuine communication obstacles through AI.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="showcase-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close-btn"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
              <img
                src={activeTab === 'activity' ? '/projects/signbridge-activity.png' : '/projects/signbridge-interface.png'}
                alt="SignBridge High Resolution View"
                className="lightbox-full-img"
              />
              <div className="lightbox-caption">
                <strong>SignBridge</strong> · {activeTab === 'activity' ? 'Telemetry Activity Dashboard (159,640 Requests)' : 'Main Indian Sign Language Accessibility Workstation'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
