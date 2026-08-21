import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useModalFocus } from './useModalFocus';

const OPEN_EVENT = 'nd-open-resume';

export const openResumePopup = () => {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
};

export default function ResumeModal({ resumeVisible = true }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const overlayRef = useRef(null);
  useModalFocus(overlayRef);

  useEffect(() => {
    if (!resumeVisible) return;
    const handler = () => {
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [resumeVisible]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => { if (e.target === overlayRef.current) setOpen(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(0.75rem, 3vw, 2rem)',
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="modal-panel modal-panel--wide resume-modal"
          >
            <div className="modal-header">
              <div className="modal-header__title">
                <FileText size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span>Resume — Nayan Dhurve</span>
              </div>
              <div className="modal-header__actions">
                <a href="/api/resume" download="Nayan-Dhurve-Resume.pdf" className="btn btn-accent btn-sm">
                  <Download size={12} /> Download
                </a>
                <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <ExternalLink size={12} /> Open
                </a>
                <button onClick={() => setOpen(false)} className="modal-close" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="resume-modal__viewer">
              {!loaded && (
                <div className="resume-modal__loading" aria-hidden="true">
                  <span className="resume-modal__spinner" />
                  <span>Loading resume…</span>
                </div>
              )}
              <iframe
                src="/api/resume#toolbar=0"
                title="Resume preview"
                onLoad={() => setLoaded(true)}
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
