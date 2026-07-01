import { useState } from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/experience';
import { certificates } from '../../data/certificates';
import CertificateModal from '../shared/CertificateModal';
import { ExternalLink, FileText } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function About() {
  const [modalCert, setModalCert] = useState(null);
  const [flippedCert, setFlippedCert] = useState(null);

  return (
    <section id="about" style={{ padding: '8rem 0' }}>
      {modalCert && (
        <CertificateModal
          pdfUrl={modalCert.pdfUrl}
          title={modalCert.title}
          onClose={() => setModalCert(null)}
        />
      )}

      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          01 / profile
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          About Me
        </motion.h2>

        {/* Education + Certifications Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Education Timeline */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              🎓 Education
            </h3>
            <div style={{
              paddingLeft: '1.5rem',
              borderLeft: '1px solid var(--border)'
            }}>
              {education.map((edu, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < education.length - 1 ? '2rem' : 0 }}>
                  <div style={{
                    position: 'absolute',
                    left: 'calc(-1.5rem - 4.5px)',
                    top: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    border: '2px solid var(--bg)'
                  }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.2rem' }}>
                    {edu.period}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              📜 Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(15px)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 25px var(--accent-glow), inset 0 0 25px rgba(129,140,248,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    padding: '1.2rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                        }}>{cert.title}</div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--accent)',
                          marginTop: '0.15rem',
                        }}>{cert.org} · {cert.date}</div>
                      </div>
                      {cert.pdfUrl ? (
                        <button
                          onClick={() => setModalCert(cert)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                          <FileText size={12} /> View
                        </button>
                      ) : (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            textDecoration: 'none',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                          <ExternalLink size={12} /> Verify
                        </a>
                      )}
                    </div>

                    <p style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>{cert.description}</p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.3rem',
                    }}>
                      {cert.skills.map((skill, si) => (
                        <span key={si} style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          background: 'var(--surface-hover)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-muted)',
                        }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
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
