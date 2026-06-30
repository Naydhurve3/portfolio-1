import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, secondaryProjects } from '../../data/projects';
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
          }}
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
            order: isEven ? 0 : 1,
            transition: 'transform 0.2s ease, box-shadow 0.3s ease',
            cursor: 'default',
            transformStyle: 'preserve-3d'
          }}
        >
          <ProjectDiagram project={project} />
        </motion.div>

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
          <pattern id="cg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cg-grid)" rx="10"/>
        <text x="250" y="16" fill="var(--accent)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">RAG PIPELINE ARCHITECTURE</text>
        <path d="M 40 80 L 145 80" stroke="#818cf8" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 235 80 L 340 80" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 235 55 L 340 55" stroke="#a855f7" strokeWidth="1" fill="none" className="svg-flow-line" style={{animationDuration:'2s'}}/>
        <path d="M 420 80 L 465 80" stroke="#f43f5e" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <g className="svg-node" transform="translate(8, 50)">
          <rect width="35" height="55" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"/>
          <text x="17" y="20" fill="#e0e7ff" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">USER</text>
          <text x="17" y="34" fill="#818cf8" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">QUERY</text>
          <text x="17" y="44" fill="#818cf8" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">NASA APOD</text>
        </g>
        <g className="svg-node" transform="translate(130, 55)">
          <rect width="110" height="50" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1"/>
          <text x="55" y="18" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">FAISS VECTOR SEARCH</text>
          <text x="55" y="30" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Semantic Embeddings</text>
          <text x="55" y="42" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">LangChain Retrieval</text>
        </g>
        <g className="svg-node" transform="translate(330, 30)">
          <rect width="95" height="50" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="47" y="18" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">11 LLM ROUTER</text>
          <text x="47" y="30" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Gemini · Groq</text>
          <text x="47" y="42" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Anthropic · OpenRouter</text>
        </g>
        <g className="svg-node" transform="translate(330, 60)">
          <rect width="95" height="40" rx="6" fill="#2d1a3a" stroke="#c084fc" strokeWidth="1"/>
          <text x="47" y="16" fill="#f3e8ff" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">CASCADING</text>
          <text x="47" y="30" fill="#a855f7" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">FALLBACK LOGIC</text>
        </g>
        <g className="svg-node" transform="translate(460, 55)">
          <rect width="35" height="50" rx="4" fill="#1c1917" stroke="#f43f5e" strokeWidth="1"/>
          <text x="17" y="22" fill="#fecaca" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">AI</text>
          <text x="17" y="36" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">REPLY</text>
        </g>
        <text x="250" y="145" fill="var(--text-muted)" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">AI/ML backend: Self-designed. Frontend/3D: References + ChatGPT guidance</text>
        <rect x="100" y="160" width="85" height="22" rx="4" fill="none" stroke="#818cf8" strokeWidth="0.75" opacity="0.5"/>
        <text x="142" y="174" fill="#818cf8" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">FAISS · LangChain</text>
        <rect x="205" y="160" width="90" height="22" rx="4" fill="none" stroke="#10b981" strokeWidth="0.75" opacity="0.5"/>
        <text x="250" y="174" fill="#10b981" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">11 PROVIDER ROUTING</text>
        <rect x="315" y="160" width="85" height="22" rx="4" fill="none" stroke="#f43f5e" strokeWidth="0.75" opacity="0.5"/>
        <text x="357" y="174" fill="#f43f5e" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">CASCADING FALLBACK</text>
        <text x="250" y="220" fill="var(--accent)" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">Live: cosmoguide.onrender.com</text>
      </svg>
    );
  }

  if (project.id === 'atm-simulation') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#0a0a0c" rx="10"/>
        <text x="250" y="16" fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">DATA PIPELINE & ML ARCHITECTURE</text>
        <path d="M 50 80 L 140 80" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 235 80 L 330 80" stroke="#818cf8" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 420 80 L 470 80" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 330 55 L 330 40 L 420 40" stroke="#a855f7" strokeWidth="1" fill="none" className="svg-flow-line" style={{animationDuration:'2s'}}/>
        <g className="svg-node" transform="translate(8, 50)">
          <rect width="42" height="55" rx="4" fill="#1c1917" stroke="#f59e0b" strokeWidth="1"/>
          <text x="21" y="20" fill="#fde68a" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">RBI</text>
          <text x="21" y="32" fill="#a16207" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">CSV</text>
          <text x="21" y="44" fill="#a16207" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">65 BANKS</text>
        </g>
        <g className="svg-node" transform="translate(130, 55)">
          <rect width="105" height="50" rx="6" fill="#1a1c2e" stroke="#818cf8" strokeWidth="1"/>
          <text x="52" y="18" fill="#e0e7ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">PYTHON PIPELINE</text>
          <text x="52" y="30" fill="#6366f1" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Clean → Feature Eng</text>
          <text x="52" y="42" fill="#6366f1" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">SQLite Store</text>
        </g>
        <g className="svg-node" transform="translate(320, 55)">
          <rect width="105" height="50" rx="6" fill="#1e2c24" stroke="#10b981" strokeWidth="1"/>
          <text x="52" y="18" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">20 ML/DL MODELS</text>
          <text x="52" y="30" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">Prophet · XGBoost</text>
          <text x="52" y="42" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">LSTM · Gradient Boost</text>
        </g>
        <g className="svg-node" transform="translate(465, 55)">
          <rect width="30" height="50" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="15" y="24" fill="#a7f3d0" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">FLASK</text>
          <text x="15" y="38" fill="#047857" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">UI</text>
        </g>
        <g className="svg-node" transform="translate(410, 15)">
          <rect width="80" height="30" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"/>
          <text x="40" y="19" fill="#c7d2fe" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">ATM SIMULATOR</text>
        </g>
        <text x="250" y="150" fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">20 ML MODELS · REAL RBI DATA · FULL BANKING ECOSYSTEM</text>
        <rect x="70" y="170" width="75" height="22" rx="4" fill="none" stroke="#f59e0b" strokeWidth="0.75" opacity="0.5"/>
        <text x="107" y="184" fill="#f59e0b" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">DATA INGESTION</text>
        <rect x="165" y="170" width="75" height="22" rx="4" fill="none" stroke="#10b981" strokeWidth="0.75" opacity="0.5"/>
        <text x="202" y="184" fill="#10b981" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">FRAUD DETECTION</text>
        <rect x="260" y="170" width="75" height="22" rx="4" fill="none" stroke="#818cf8" strokeWidth="0.75" opacity="0.5"/>
        <text x="297" y="184" fill="#818cf8" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">CREDIT SCORING</text>
        <rect x="355" y="170" width="75" height="22" rx="4" fill="none" stroke="#a855f7" strokeWidth="0.75" opacity="0.5"/>
        <text x="392" y="184" fill="#a855f7" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">KYC SYSTEM</text>
      </svg>
    );
  }

  if (project.id === 'hr-analytics') {
    return (
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
        <style>{diagramStyle}</style>
        <rect width="100%" height="100%" fill="#0a0a0d" rx="10"/>
        <text x="250" y="16" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">WORKFORCE ANALYTICS PIPELINE</text>
        <path d="M 40 100 L 120 100" stroke="#818cf8" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 210 100 L 300 100" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 300 70 L 390 70 L 390 100" stroke="#a855f7" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 300 130 L 390 130 L 390 100" stroke="#f43f5e" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <path d="M 430 100 L 470 100" stroke="#10b981" strokeWidth="1.5" fill="none" className="svg-flow-line"/>
        <g className="svg-node" transform="translate(8, 70)">
          <rect width="32" height="55" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"/>
          <text x="16" y="20" fill="#e0e7ff" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">RAW</text>
          <text x="16" y="34" fill="#818cf8" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">3,000</text>
          <text x="16" y="44" fill="#818cf8" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)">RECORDS</text>
        </g>
        <g className="svg-node" transform="translate(110, 70)">
          <rect width="100" height="55" rx="6" fill="#1a1c2e" stroke="#818cf8" strokeWidth="1"/>
          <text x="50" y="18" fill="#e0e7ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">DATA CLEANING</text>
          <text x="50" y="32" fill="#6366f1" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">3-tier Imputation</text>
          <text x="50" y="44" fill="#6366f1" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">KDE Validation</text>
        </g>
        <g className="svg-node" transform="translate(290, 70)">
          <rect width="105" height="55" rx="6" fill="#2d1a3a" stroke="#a855f7" strokeWidth="1"/>
          <text x="52" y="16" fill="#f3e8ff" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">FEATURE ENGINEERING</text>
          <text x="52" y="28" fill="#d8b4fe" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">JobFamily · Seniority</text>
          <text x="52" y="40" fill="#d8b4fe" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">AgeGroup · TenureDays</text>
          <text x="52" y="50" fill="#d8b4fe" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">DivisionGroup</text>
        </g>
        <g className="svg-node" transform="translate(420, 70)">
          <rect width="55" height="55" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1"/>
          <text x="27" y="20" fill="#d1fae5" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">POWER</text>
          <text x="27" y="34" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">BI</text>
          <text x="27" y="46" fill="#059669" fontSize="6" textAnchor="middle" fontFamily="var(--font-mono)">DASH</text>
        </g>
        <text x="130" y="165" fill="#f43f5e" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="bold">15 ANALYSIS REPORTS</text>
        <rect x="55" y="180" width="55" height="18" rx="4" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.5"/>
        <text x="82" y="192" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">Attrition</text>
        <rect x="120" y="180" width="55" height="18" rx="4" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.5"/>
        <text x="147" y="192" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">Diversity</text>
        <rect x="185" y="180" width="55" height="18" rx="4" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.5"/>
        <text x="212" y="192" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">Compensation</text>
        <rect x="250" y="180" width="55" height="18" rx="4" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.5"/>
        <text x="277" y="192" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">Performance</text>
        <rect x="315" y="180" width="55" height="18" rx="4" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.5"/>
        <text x="342" y="192" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">Career</text>
        <rect x="380" y="180" width="70" height="18" rx="4" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.5"/>
        <text x="415" y="192" fill="#ef4444" fontSize="5" textAnchor="middle" fontFamily="var(--font-mono)" opacity="0.7">HiPo + 10 more</text>
        <text x="250" y="225" fill="var(--accent)" fontSize="7" textAnchor="middle" fontFamily="var(--font-mono)">ICEICO Technologies Pvt. Ltd. · Jan 2025 – Jul 2025</text>
      </svg>
    );
  }

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

      {/* Secondary Projects Grid */}
      <div className="container" style={{ paddingBottom: '6rem', paddingTop: '4rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ marginBottom: '2rem' }}
        >
          <span className="section-num" style={{ display: 'block', marginBottom: '0.5rem' }}>more projects</span>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em'
          }}>Additional Work</h3>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {secondaryProjects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(15px)',
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s ease, transform 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = proj.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: proj.color,
                marginBottom: '0.5rem',
                display: 'block'
              }}>{proj.tag}</span>

              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em'
              }}>{proj.title}</h4>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1rem',
                flexGrow: 1
              }}>{proj.description}</p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: proj.color,
                  lineHeight: 1
                }}>{proj.metricValue}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)'
                }}>{proj.metricLabel}</span>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.3rem',
                marginBottom: '1.2rem'
              }}>
                {proj.chips.slice(0, 4).map((chip, ci) => (
                  <span key={ci} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.5rem',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)'
                  }}>{chip}</span>
                ))}
                {proj.chips.length > 4 && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)'
                  }}>+{proj.chips.length - 4}</span>
                )}
              </div>

              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                <ExternalLink size={12} /> GitHub
              </a>
            </motion.div>
          ))}
        </div>
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
    </section>
  );
}
