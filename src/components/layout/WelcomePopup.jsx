import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

const POPUP_DELAY_MS = 2600;
const AUTO_HIDE_MS = 9000;
const STORAGE_KEY = 'nd-welcome-seen';

export default function WelcomePopup({ sections = {} }) {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const projectsVisible = sections.projects !== false;
  const aboutVisible = sections.about !== false;
  const firstTarget = projectsVisible ? 'projects' : aboutVisible ? 'about' : null;

  useEffect(() => {
    if (!firstTarget || sessionStorage.getItem(STORAGE_KEY)) return;
    const appear = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(appear);
  }, [firstTarget]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(dismiss, AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => {
      if (window.scrollY > 150) dismiss();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setOpen(false), 350);
  };

  const go = (sectionId) => {
    dismiss();
    setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Welcome — quick navigation"
          className="welcome-popup neon-border"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <button type="button" className="modal-close welcome-popup__close" onClick={dismiss} aria-label="Close welcome popup">
            <X size={15} />
          </button>

          <div className="welcome-popup__eyebrow"><Sparkles size={13} /> Quick tour</div>
          <div className="welcome-popup__title">Hi, I'm <span>Nayan Dhurve</span> 👋</div>
          <p className="welcome-popup__text">
            Data Scientist &amp; AI Engineer — this is my interactive portfolio. Peek behind the metrics or jump straight in.
          </p>

          <div className="welcome-popup__actions">
            {projectsVisible && (
            <button type="button" className="btn btn-accent btn-sm" onClick={() => go('projects')}>
              Explore Work <ArrowRight size={13} />
            </button>
            )}
            {aboutVisible && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => go('about')}>
              More Details
            </button>
            )}
          </div>

          <div className="welcome-popup__progress" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
