import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/experience';
import { certificates } from '../../data/certificates';
import CertificateModal from '../shared/CertificateModal';
import { ExternalLink, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function About() {
  const [modalCert, setModalCert] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handle = () => {
      const idx = Math.round(el.scrollLeft / 300);
      setScrollIndex(Math.min(idx, certificates.length - 1));
    };
    el.addEventListener('scroll', handle);
    return () => el.removeEventListener('scroll', handle);
  }, []);

  const CertCard = ({ cert, i, inView = true }) => (
    <motion.div
      initial={inView ? { opacity: 0, y: 20 } : false}
      whileInView={inView ? { opacity: 1, y: 0 } : undefined}
      viewport={inView ? { once: true } : undefined}
      transition={inView ? { delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] } : undefined}
      style={{
        minWidth: '280px',
        width: '280px',
        flexShrink: 0,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(15px)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
        scrollSnapAlign: 'start',
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
      <div style={{ padding: '1.2rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{cert.title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.15rem' }}>{cert.org} · {cert.date}</div>
          </div>
          {cert.pdfUrl ? (
            <button onClick={() => setModalCert(cert)} style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.7rem',
              borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
              cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <FileText size={12} /> View
            </button>
          ) : (
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.7rem',
              borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
              cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <ExternalLink size={12} /> Verify
            </a>
          )}
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cert.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {cert.skills.map((skill, si) => (
            <span key={si} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '0.15rem 0.45rem',
              borderRadius: '4px', background: 'var(--surface-hover)', border: '1px solid var(--border)', color: 'var(--text-muted)',
            }}>{skill}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );

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
            <div style={{ paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
              {education.map((edu, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < education.length - 1 ? '2rem' : 0 }}>
                  <div style={{
                    position: 'absolute', left: 'calc(-1.5rem - 4.5px)', top: '6px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'var(--accent)', border: '2px solid var(--bg)',
                  }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.2rem' }}>{edu.period}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                📜 Certifications
              </h3>
              {/* Desktop arrows */}
              <div className="cert-arrows" style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => scroll('left')} style={{
                  width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border)',
                  background: 'var(--card-bg)', color: 'var(--text-secondary)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                ><ChevronLeft size={16} /></button>
                <button onClick={() => scroll('right')} style={{
                  width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border)',
                  background: 'var(--card-bg)', color: 'var(--text-secondary)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                ><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Desktop horizontal scroll */}
            <div className="cert-desktop-scroll" style={{ position: 'relative' }}>
              <div ref={scrollRef} style={{
                display: 'flex', gap: '1rem', overflowX: 'auto', scrollSnapType: 'x mandatory',
                paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none',
              }}>
                {certificates.map((cert, i) => (
                  <CertCard key={cert.id} cert={cert} i={i} />
                ))}
              </div>
              {/* Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginTop: '0.5rem' }}>
                {certificates.map((_, i) => (
                  <div key={i} style={{
                    width: scrollIndex === i ? '18px' : '6px', height: '6px',
                    borderRadius: '3px', background: scrollIndex === i ? 'var(--accent)' : 'var(--border)',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            </div>

            {/* Mobile collapsible stack */}
            <div className="cert-mobile-stack" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
              {(showAllMobile ? certificates : certificates.slice(0, 3)).map((cert, i) => (
                <CertCard key={cert.id} cert={cert} i={i} inView={false} />
              ))}
              {certificates.length > 3 && (
                <button
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)', background: 'transparent',
                    color: 'var(--accent)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)',
                    cursor: 'pointer', transition: 'all 0.2s', width: '100%',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {showAllMobile ? 'Show less ↑' : `Show all ${certificates.length} ↓`}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .cert-mobile-stack { display: none !important; }
        }
        @media (max-width: 768px) {
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .cert-desktop-scroll { display: none !important; }
          .cert-arrows { display: none !important; }
          .cert-mobile-stack { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
