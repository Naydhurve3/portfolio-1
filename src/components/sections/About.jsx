import { useState } from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/experience';
import { certificates } from '../../data/certificates';
import CertificateDetailsModal from '../shared/CertificateDetailsModal';
import EducationDetailsModal from '../shared/EducationDetailsModal';
import { ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function About() {
  const [exploreCert, setExploreCert] = useState(null);
  const [exploreEdu, setExploreEdu] = useState(null);

  return (
    <section id="about" style={{ padding: '8rem 0' }}>
      {exploreCert && (
        <CertificateDetailsModal
          cert={exploreCert}
          onClose={() => setExploreCert(null)}
        />
      )}
      {exploreEdu && (
        <EducationDetailsModal
          edu={exploreEdu}
          onClose={() => setExploreEdu(null)}
        />
      )}

      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          01 / profile
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          About Me
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Education */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              🎓 Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => setExploreEdu(edu)}
                  className="compact-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(15px)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 18px var(--accent-glow)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    minWidth: 0,
                    flexGrow: 1,
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--accent)', flexShrink: 0,
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>{edu.degree}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.63rem',
                        color: 'var(--text-muted)',
                      }}>{edu.institution.length > 40 ? edu.institution.substring(0, 40) + '...' : edu.institution}</div>
                    </div>
                  </div>

                  <div className="explore-label" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--accent)',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    flexShrink: 0,
                  }}>
                    Explore <ArrowUpRight size={10} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              📜 Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => setExploreCert(cert)}
                  className="compact-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(15px)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 18px var(--accent-glow)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    minWidth: 0,
                    flexGrow: 1,
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--accent)', flexShrink: 0,
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>{cert.title}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--text-muted)',
                      }}>{cert.org} · {cert.date}</div>
                    </div>
                  </div>

                  <div className="explore-label" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--accent)',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    flexShrink: 0,
                  }}>
                    Explore <ArrowUpRight size={10} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .compact-card:hover .explore-label { opacity: 1 !important; }
        @media (max-width: 768px) {
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
