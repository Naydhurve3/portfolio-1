import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText } from 'lucide-react';
import CertificateModal from './CertificateModal';
import { useModalFocus } from './useModalFocus';

export default function CertificateDetailsModal({ cert, onClose }) {
  const overlayRef = useRef(null);
  const [showPdf, setShowPdf] = useState(false);
  useModalFocus(overlayRef);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {showPdf && cert.pdfUrl ? (
        <CertificateModal
          pdfUrl={cert.pdfUrl}
          title={cert.title}
          onClose={() => setShowPdf(false)}
        />
      ) : (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={cert.title}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="modal-panel"
          >
            <div className="modal-header">
              <div className="modal-header__title">
                <FileText size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span>{cert.title}</span>
              </div>
              <div className="modal-header__actions">
                <button onClick={onClose} className="modal-close" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}>{cert.title}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--accent)',
                  marginTop: '0.25rem',
                }}>{cert.org} · {cert.date}</div>
              </div>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>{cert.description}</p>

              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.5rem',
                }}>Skills Covered</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {cert.skills.map((skill, si) => (
                    <span key={si} className="project-chip">{skill}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                {cert.pdfUrl ? (
                  <button onClick={() => setShowPdf(true)} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <FileText size={14} /> View Certificate
                  </button>
                ) : null}
                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                    <ExternalLink size={14} /> Verify Online
                  </a>
                ) : null}
                {!cert.pdfUrl && !cert.credentialUrl ? (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    No certificate file available
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
