import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Globe, Calendar } from 'lucide-react';

export default function EducationDetailsModal({ edu, onClose }) {
  const overlayRef = useRef(null);

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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: '100%',
            maxWidth: '500px',
            background: '#0a0a0c',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #1c1c24',
            background: '#111116',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🎓</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#fff',
              }}>{edu.degree}</span>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '32px', height: '32px', borderRadius: '6px',
                border: '1px solid #27272a', background: 'transparent',
                color: '#a1a1aa', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#a1a1aa'; }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}>{edu.degree}</div>
              <div style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                marginTop: '0.25rem',
                lineHeight: 1.5,
              }}>{edu.institution}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Calendar size={15} color="var(--accent)" />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{edu.period}</span>
              </div>
              {edu.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={15} color="var(--accent)" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{edu.location}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              {edu.mapUrl && (
                <a
                  href={edu.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', cursor: 'pointer' }}
                >
                  <MapPin size={14} /> View on Maps
                </a>
              )}
              {edu.websiteUrl && (
                <a
                  href={edu.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
                >
                  <Globe size={14} /> Visit Website
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
