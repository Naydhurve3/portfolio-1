import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

function CaseStudyAccordion({ caseStudy }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'The Challenge (Problem)', content: caseStudy.problem },
    { label: 'The Solution', content: caseStudy.solution },
    { label: 'The Results', content: caseStudy.results },
  ];

  return (
    <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2rem' }}>
      {tabs.map((tab, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
          <button
            onClick={() => setActiveTab(activeTab === i ? -1 : i)}
            style={{
              width: '100%',
              padding: '0.85rem 0',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: '0.8rem',
              transition: 'transform 0.3s ease',
              transform: activeTab === i ? 'rotate(45deg)' : 'rotate(0deg)'
            }}>+</span>
          </button>
          <div style={{
            maxHeight: activeTab === i ? '180px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            <p style={{ paddingBottom: '1rem' }}>{tab.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectSection({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      padding: '6rem 0',
      borderBottom: index < projects.length - 1 ? '1px solid var(--border)' : 'none'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'linear-gradient(145deg, var(--card-bg) 0%, var(--surface-hover) 100%)',
            aspectRatio: '16/10',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            boxShadow: 'var(--card-shadow)',
            padding: '1.5rem',
            order: isEven ? 0 : 1
          }}
        >
          <ProjectDiagram project={project} />
        </motion.div>

        {/* Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            order: isEven ? 1 : 0
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            marginBottom: '0.5rem'
          }}>{project.tag}</span>

          <h3 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.03em'
          }}>{project.title}</h3>

          {/* Metric */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '1.5rem',
            borderLeft: '2px solid var(--accent)',
            paddingLeft: '1rem'
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--accent)',
              lineHeight: 1.1
            }}>{project.metricValue}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)'
            }}>{project.metricLabel}</span>
          </div>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>{project.description}</p>

          <CaseStudyAccordion caseStudy={project.caseStudy} />

          {/* Tech chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '2rem'
          }}>
            {project.chips.map((chip, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                background: 'var(--surface-hover)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                color: 'var(--text-secondary)'
              }}>{chip}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink size={14} /> Code GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects .container {
            grid-template-columns: 1fr !important;
          }
          #projects .container > div {
            order: unset !important;
          }
        }
      `}</style>
    </div>
  );
}

/* Animated SVG diagrams for each project */
function ProjectDiagram({ project }) {
  const diagramStyle = `
    .svg-node { animation: flow-pulse 3s infinite ease-in-out; }
    .svg-node:nth-child(2n) { animation-delay: 1.5s; }
    .svg-flow-line { stroke-dasharray: 6, 4; animation: dash-flow 1.2s linear infinite; }
  `;

  if (project.id === 'cosmoguide') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <defs>
          <pattern id="diag-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-grid)" rx="10"/>
        <text x="250" y="18" fill="var(--accent)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">REACT 19 SPA + EXPRESS PROXY</text>
        <path d="M 60 80 L 60 170" stroke="#818cf8" strokeWidth="1" fill="none" className="svg-flow-line"/>
        <path d="M 60 130 L 180 130" stroke="#818cf8" strokeWidth="1" fill="none" className="svg-flow-line"/>
        <path d="M 260 130 L 380 130" stroke="#10b981" strokeWidth="1" fill="none" className="svg-flow-line"/>
        <g className="svg-node" transform="translate(10, 105)">
          <rect width="50" height="50" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"/>
          <text x="25" y="24" fill="#e0e7ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">3D KEPLER</text>
          <text x="25" y="38" fill="#818cf8" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">SIMULATOR</text>
        </g>
        <g className="svg-node" transform="translate(185, 105)">
          <rect width="75" height="50" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="37" y="22" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">EXPRESS</text>
          <text x="37" y="36" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">PROXY LAYER</text>
        </g>
        <g className="svg-node" transform="translate(380, 95)">
          <rect width="110" height="65" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
          <text x="55" y="18" fill="#94a3b8" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">11 AI PROVIDERS</text>
          <text x="55" y="30" fill="#64748b" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">Gemini · Groq · Anthropic</text>
          <text x="55" y="40" fill="#64748b" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">OpenRouter · NVIDIA · Together</text>
          <text x="55" y="50" fill="#64748b" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">DeepSeek · Mistral · Cohere</text>
          <text x="55" y="60" fill="#64748b" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">Perplexity · HuggingFace</text>
        </g>
        <path d="M 230 40 L 320 40 L 320 90" stroke="#a855f7" strokeWidth="1" fill="none" className="svg-flow-line" style={{animationDuration:'2s'}}/>
        <path d="M 230 70 L 290 70 L 290 95" stroke="#f43f5e" strokeWidth="1" fill="none" className="svg-flow-line" style={{animationDuration:'2.5s'}}/>
        <g className="svg-node" transform="translate(130, 30)">
          <rect width="100" height="30" rx="6" fill="#311042" stroke="#c084fc" strokeWidth="1"/>
          <text x="50" y="19" fill="#f3e8ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">STAR CHART / WEATHER</text>
        </g>
        <g className="svg-node" transform="translate(130, 60)">
          <rect width="100" height="30" rx="6" fill="#1c1917" stroke="#f43f5e" strokeWidth="1"/>
          <text x="50" y="19" fill="#fecaca" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">QUIZ / ASTRO VISION</text>
        </g>
        <text x="250" y="230" fill="var(--text-muted)" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Live: cosmoguide.onrender.com</text>
      </svg>
    );
  }

  if (project.id === 'liver-cancer') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#0a0a0d" rx="10"/>
        <circle cx="150" cy="120" r="60" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5 3"/>
        <circle cx="150" cy="120" r="45" fill="none" stroke="#4b5563" strokeWidth="2"/>
        <path d="M 125 100 C 130 90, 150 95, 155 105 C 160 115, 145 130, 135 125 C 125 120, 120 110, 125 100 Z" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1" className="svg-node"/>
        <circle cx="140" cy="112" r="2.5" fill="#ef4444"/>
        <text x="175" y="90" fill="#ef4444" fontSize="8" fontFamily="var(--font-mono)">LESION DETECTED</text>
        <path d="M 140 112 L 280 60 M 140 112 L 280 180" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1"/>
        <rect x="280" y="60" width="70" height="120" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" rx="4"/>
        <text x="315" y="100" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">ResNet50</text>
        <text x="315" y="125" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">CONV LAYERS</text>
        <path d="M 350 120 L 400 120" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <circle cx="430" cy="120" r="25" fill="#022c22" stroke="#10b981" strokeWidth="1.5" className="svg-node"/>
        <text x="430" y="123" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">89% ACC</text>
      </svg>
    );
  }

  if (project.id === 'stem-cell') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#09090b" rx="10"/>
        <path d="M 50 120 L 140 70 M 50 120 L 140 170" stroke="var(--border)" strokeWidth="1.5"/>
        <path d="M 220 70 L 310 120 M 220 170 L 310 120" stroke="var(--border)" strokeWidth="1.5" className="svg-flow-line"/>
        <path d="M 390 120 L 440 120" stroke="#10b981" strokeWidth="1.5" className="svg-flow-line"/>
        <g className="svg-node" transform="translate(10, 95)">
          <circle cx="20" cy="25" r="20" fill="#1e1e24" stroke="var(--border)" strokeWidth="1.5"/>
          <text x="20" y="28" fill="#ffffff" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">GENES</text>
        </g>
        <g className="svg-node" transform="translate(130, 45)">
          <rect width="90" height="50" rx="6" fill="#1a1c2e" stroke="#818cf8" strokeWidth="1.5"/>
          <text x="45" y="24" fill="#e0e7ff" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">DEEP NET</text>
          <text x="45" y="38" fill="#6366f1" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">LATENT DENSE</text>
        </g>
        <g className="svg-node" transform="translate(130, 145)">
          <rect width="90" height="50" rx="6" fill="#1e2c24" stroke="#10b981" strokeWidth="1.5"/>
          <text x="45" y="24" fill="#d1fae5" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">RANDOM FOREST</text>
          <text x="45" y="38" fill="#059669" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">DECISION TREE</text>
        </g>
        <g className="svg-node" transform="translate(300, 95)">
          <rect width="90" height="50" rx="6" fill="#2d1a3a" stroke="#d8b4fe" strokeWidth="1.5"/>
          <text x="45" y="24" fill="#f3e8ff" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">HYBRID CLF</text>
          <text x="45" y="38" fill="#a855f7" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">VOTING WEIGHTS</text>
        </g>
        <g className="svg-node" transform="translate(435, 95)">
          <circle cx="20" cy="25" r="20" fill="#022c22" stroke="#10b981" strokeWidth="1.5"/>
          <text x="20" y="28" fill="#10b981" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">85% ACC</text>
        </g>
      </svg>
    );
  }

  if (project.id === 'movie-recommender') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#0a0a0c" rx="10"/>
        <line x1="150" y1="120" x2="300" y2="70" stroke="#818cf8" strokeWidth="1.5"/>
        <line x1="150" y1="120" x2="280" y2="170" stroke="#818cf8" strokeWidth="1.5"/>
        <path d="M 180 110 A 30 30 0 0 1 176 130" fill="none" stroke="#10b981" strokeWidth="1.5"/>
        <text x="190" y="124" fill="#10b981" fontSize="8" fontFamily="var(--font-mono)">COSINE θ</text>
        <circle cx="150" cy="120" r="4" fill="#ef4444" className="svg-node"/>
        <text x="150" y="110" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">SELECTED FILM</text>
        <circle cx="300" cy="70" r="4" fill="#818cf8" className="svg-node"/>
        <text x="300" y="60" fill="#818cf8" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">REC A (0.88)</text>
        <circle cx="280" cy="170" r="4" fill="#818cf8" className="svg-node"/>
        <text x="280" y="185" fill="#818cf8" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">REC B (0.75)</text>
        <rect x="360" y="90" width="110" height="60" fill="#18181b" stroke="#818cf8" strokeWidth="1.5" rx="6"/>
        <text x="415" y="115" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">TF-IDF + Cosine</text>
        <text x="415" y="135" fill="#10b981" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">Cold-Start Bypassed</text>
      </svg>
    );
  }

  if (project.id === 'atm-simulation') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#0a0a0c" rx="10"/>
        <path d="M 45 80 L 130 80" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 210 80 L 300 80" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 380 80 L 440 80" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 300 55 L 300 35 L 380 35" stroke="#818cf8" strokeWidth="1" fill="none" className="svg-flow-line" style={{animationDuration:'2s'}}/>
        <g className="svg-node" transform="translate(8, 50)">
          <rect width="40" height="55" rx="4" fill="#1c1917" stroke="#f59e0b" strokeWidth="1"/>
          <text x="20" y="20" fill="#fde68a" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">RBI</text>
          <text x="20" y="32" fill="#a16207" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">DATA</text>
          <text x="20" y="44" fill="#a16207" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">65 BANKS</text>
        </g>
        <g className="svg-node" transform="translate(120, 55)">
          <rect width="95" height="50" rx="6" fill="#1a1c2e" stroke="#818cf8" strokeWidth="1"/>
          <text x="47" y="22" fill="#e0e7ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">PYTHON PIPELINE</text>
          <text x="47" y="36" fill="#6366f1" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Clean → Impute → ML</text>
        </g>
        <g className="svg-node" transform="translate(290, 55)">
          <rect width="95" height="50" rx="6" fill="#1e2c24" stroke="#10b981" strokeWidth="1"/>
          <text x="47" y="22" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">20 ML/DL MODELS</text>
          <text x="47" y="36" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Prophet · XGBoost · LSTM</text>
        </g>
        <g className="svg-node" transform="translate(430, 55)">
          <rect width="60" height="50" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="30" y="24" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">FLASK</text>
          <text x="30" y="38" fill="#047857" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">DASHBOARD</text>
        </g>
        <g className="svg-node" transform="translate(370, 10)">
          <rect width="70" height="35" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"/>
          <text x="35" y="20" fill="#c7d2fe" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">ATM SIM</text>
        </g>
        <text x="250" y="150" fill="#f59e0b" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">20 MODELS · REAL RBI DATA · FULL BANKING ECOSYSTEM</text>
        <text x="250" y="170" fill="var(--text-muted)" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">Fraud Detection · Credit Scoring · Churn · Forecasting</text>
        <rect x="80" y="185" width="70" height="25" rx="4" fill="none" stroke="#f59e0b" strokeWidth="0.75" opacity="0.5"/>
        <text x="115" y="201" fill="#f59e0b" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">CLI (Rich)</text>
        <rect x="215" y="185" width="70" height="25" rx="4" fill="none" stroke="#818cf8" strokeWidth="0.75" opacity="0.5"/>
        <text x="250" y="201" fill="#818cf8" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">KYC SYSTEM</text>
        <rect x="350" y="185" width="70" height="25" rx="4" fill="none" stroke="#10b981" strokeWidth="0.75" opacity="0.5"/>
        <text x="385" y="201" fill="#10b981" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">PASSBOOK</text>
      </svg>
    );
  }

  if (project.id === 'hr-analytics') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#0a0a0d" rx="10"/>
        <path d="M 40 110 L 100 110" stroke="#818cf8" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 170 60 L 170 110 L 280 110" stroke="#818cf8" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 170 170 L 170 110" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 350 40 L 350 110 L 420 110" stroke="#f43f5e" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 350 180 L 350 110" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <g className="svg-node" transform="translate(8, 85)">
          <rect width="32" height="50" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"/>
          <text x="16" y="20" fill="#e0e7ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">RAW</text>
          <text x="16" y="34" fill="#818cf8" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">HR</text>
          <text x="16" y="44" fill="#818cf8" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">DATA</text>
        </g>
        <g className="svg-node" transform="translate(90, 85)">
          <rect width="85" height="50" rx="6" fill="#1a1c2e" stroke="#818cf8" strokeWidth="1"/>
          <text x="42" y="20" fill="#e0e7ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">CLEANING</text>
          <text x="42" y="34" fill="#6366f1" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">3-tier imputation</text>
        </g>
        <g className="svg-node" transform="translate(270, 85)">
          <rect width="85" height="50" rx="6" fill="#1e2c24" stroke="#10b981" strokeWidth="1"/>
          <text x="42" y="20" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">15 REPORTS</text>
          <text x="42" y="34" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Attrition · Diversity</text>
        </g>
        <g className="svg-node" transform="translate(410, 85)">
          <rect width="80" height="50" rx="6" fill="#1c1917" stroke="#f43f5e" strokeWidth="1"/>
          <text x="40" y="22" fill="#fecaca" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">POWER BI</text>
          <text x="40" y="36" fill="#ef4444" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">DASHBOARD</text>
        </g>
        <g className="svg-node" transform="translate(120, 10)">
          <rect width="105" height="40" rx="6" fill="#2d1a3a" stroke="#d8b4fe" strokeWidth="1"/>
          <text x="52" y="17" fill="#f3e8ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">FEATURE ENGINEERING</text>
          <text x="52" y="30" fill="#a855f7" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">JobFamily · Tenure · AgeGroup</text>
        </g>
        <g className="svg-node" transform="translate(120, 140)">
          <rect width="105" height="40" rx="6" fill="#1c1917" stroke="#f43f5e" strokeWidth="1"/>
          <text x="52" y="17" fill="#fecaca" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">49 HiPo EMPLOYEES</text>
          <text x="52" y="30" fill="#ef4444" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Performance + Projects</text>
        </g>
        <g className="svg-node" transform="translate(340, 30)">
          <rect width="130" height="30" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="65" y="19" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">Compensation · Career · ROI</text>
        </g>
        <g className="svg-node" transform="translate(340, 150)">
          <rect width="130" height="30" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="65" y="19" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">Planning · Engagement · Recruit</text>
        </g>
      </svg>
    );
  }

  // default fallback
  return (
    <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
      <style>{diagramStyle}</style>
      <rect width="100%" height="100%" fill="#0a0a0d" rx="10"/>
      <line x1="50" y1="180" x2="450" y2="180" stroke="#27272a" strokeWidth="1.5"/>
      <line x1="50" y1="40" x2="50" y2="180" stroke="#27272a" strokeWidth="1.5"/>
      <line x1="50" y1="140" x2="450" y2="140" stroke="#1f1f23" strokeWidth="0.75" strokeDasharray="4 4"/>
      <line x1="50" y1="100" x2="450" y2="100" stroke="#1f1f23" strokeWidth="0.75" strokeDasharray="4 4"/>
      <line x1="50" y1="60" x2="450" y2="60" stroke="#1f1f23" strokeWidth="0.75" strokeDasharray="4 4"/>
      <path d="M 50 160 Q 150 130, 250 80 T 450 50" fill="none" stroke="#ef4444" strokeWidth="3" className="svg-node"/>
      <circle cx="250" cy="80" r="5" fill="#ef4444"/>
      <text x="250" y="65" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">CRITICAL CHURN ZONE</text>
      <rect x="80" y="160" width="30" height="20" fill="#818cf8" rx="2"/>
      <rect x="150" y="130" width="30" height="50" fill="#818cf8" rx="2"/>
      <rect x="220" y="100" width="30" height="80" fill="#818cf8" rx="2"/>
      <rect x="290" y="70" width="30" height="110" fill="#818cf8" rx="2"/>
      <rect x="360" y="50" width="30" height="130" fill="#818cf8" rx="2"/>
      <text x="430" y="175" fill="#a1a1aa" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)">XGBoost risk classification</text>
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: 0 }}>
      <div className="container" style={{ paddingTop: '8rem' }}>
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          03 / work
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Featured Projects
        </motion.h2>
      </div>

      {projects.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
