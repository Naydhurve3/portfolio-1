import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText } from 'lucide-react';
import { useModalFocus } from './useModalFocus';

export default function CertificateModal({ pdfUrl, title, onClose }) {
  const viewerUrl = pdfUrl.includes('?') ? `${pdfUrl}&toolbar=0` : `${pdfUrl}#toolbar=0`;
  const overlayRef = useRef(null);
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
          aria-label={title}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="modal-panel modal-panel--wide"
        >
          <div className="modal-header">
            <div className="modal-header__title">
              <FileText size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>{title}</span>
            </div>
            <div className="modal-header__actions">
              <a href={pdfUrl} download className="btn btn-secondary btn-sm">
                <ExternalLink size={12} /> Download PDF
              </a>
              <button onClick={onClose} className="modal-close" aria-label="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          <div style={{ flexGrow: 1, background: 'transparent' }}>
            <embed
              src={viewerUrl}
              type="application/pdf"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
