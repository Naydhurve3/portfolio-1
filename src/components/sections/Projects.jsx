import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, secondaryProjects } from '../../data/projects';
import { ArrowRight, CheckCircle2, ExternalLink, GitBranch, ShieldCheck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

function WorkflowDiagram({ project }) {
  return (
    <div className="workflow-diagram" aria-label={`${project.title} workflow`}>
      <div className="workflow-diagram__header">
        <div>
          <span>System workflow</span>
          <strong>{project.id.replace('-', ' / ')}</strong>
        </div>
        <GitBranch size={18} aria-hidden="true" />
      </div>
      <div className="workflow-diagram__track">
        {project.workflow.map((step, index) => (
          <div className="workflow-diagram__stage" key={step.label}>
            <div className="workflow-diagram__node" style={{ '--project-color': project.color }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </div>
            {index < project.workflow.length - 1 && (
              <div className="workflow-diagram__arrow" aria-hidden="true">
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="workflow-diagram__decision">
        <ShieldCheck size={16} aria-hidden="true" />
        <span><strong>Architecture decision</strong>{project.decision}</span>
      </div>
    </div>
  );
}

function EvidenceGrid({ project }) {
  return (
    <div className="project-evidence" aria-label="Repository-backed evidence">
      <div className="project-evidence__title">
        <span>Repository evidence</span>
        <small>{project.sourceLabel}</small>
      </div>
      <div className="project-evidence__grid">
        {project.evidence.map(item => (
          <span key={item}><CheckCircle2 size={13} aria-hidden="true" />{item}</span>
        ))}
      </div>
    </div>
  );
}

function CaseStudyAccordion({ caseStudy }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'The Challenge (Problem)', content: caseStudy.problem },
    { label: 'The Solution', content: caseStudy.solution },
    { label: 'The Results', content: caseStudy.results },
  ];

  return (
    <div style={{ borderTop: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
      {tabs.map((tab, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
          <button
            onClick={() => setActiveTab(activeTab === i ? -1 : i)}
            aria-expanded={activeTab === i}
            aria-controls={`case-study-${i}`}
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
          <div
            id={`case-study-${i}`}
            role="region"
            aria-label={tab.label}
            style={{
              maxHeight: activeTab === i ? '400px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
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
          className="project-workflow-card"
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
            borderColor: 'var(--glass-border)',
            background: 'linear-gradient(145deg, var(--glass-bg) 0%, var(--glass-bg-strong) 100%)',
            backdropFilter: 'var(--glass-blur-strong)',
            WebkitBackdropFilter: 'var(--glass-blur-strong)',
            aspectRatio: '16/10',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            boxShadow: 'var(--card-shadow)',
            padding: '1.5rem',
            order: isEven ? 0 : 1,
            transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            cursor: 'default',
            transformStyle: 'preserve-3d'
          }}
        >
          <WorkflowDiagram project={project} />
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

          <div className="project-meta">
            <span>{project.year}</span>
            <span className="project-meta__status">{project.status}</span>
          </div>

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

          <EvidenceGrid project={project} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '2rem'
          }}>
            {project.chips.map((chip, i) => (
              <span key={i} className="project-chip">{chip}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink size={14} /> Code GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                <ExternalLink size={14} /> {project.liveLabel || 'Live Demo'}
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

export default function Projects({ hiddenProjects = new Set() }) {
  const featured = projects.filter(project => !hiddenProjects.has(project.id));
  const secondary = secondaryProjects.filter(proj => !hiddenProjects.has(proj.id));
  if (!featured.length && !secondary.length) return null;
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

      {featured.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}

      {/* Secondary Projects Grid */}
      {secondary.length > 0 && (
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
          {secondary.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: 'var(--radius-lg)',
                borderColor: 'var(--glass-border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s ease, transform 0.3s ease, background 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = proj.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.background = 'var(--glass-bg-strong)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'var(--glass-bg)';
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
                  <span key={ci} className="project-chip">{chip}</span>
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
      )}

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
