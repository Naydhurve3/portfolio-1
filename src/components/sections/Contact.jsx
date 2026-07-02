import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, FileText } from 'lucide-react';
import CertificateModal from '../shared/CertificateModal';

const GithubIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) errs.email = 'Please enter a valid email.';
    if (!formState.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', subject: '', message: '' });
      }, 2500);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    paddingTop: '1.5rem',
    background: 'var(--surface-hover)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const labelStyle = {
    position: 'absolute',
    top: '0.55rem',
    left: '1rem',
    fontSize: '0.7rem',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    pointerEvents: 'none'
  };

  return (
    <section id="contact" style={{ padding: '8rem 0' }}>
      {showResume && (
        <CertificateModal
          pdfUrl="/certificates/Nayan Dhurve Resume.pdf"
          title="Resume — Nayan Dhurve"
          onClose={() => setShowResume(false)}
        />
      )}
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          08 / connect
        </motion.span>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Info Column */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: '1.5rem',
              letterSpacing: '-0.04em',
              lineHeight: 1.1
            }}>
              Let's Build<br />Something Great
            </h2>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              lineHeight: 1.7
            }}>
              Have an opening in your AI team, a dataset challenge, or want to collaborate on GenAI integrations? Drop me a line.
            </p>

            {/* Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <a href="mailto:nayankdhurve@gmail.com" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                transition: 'border-color 0.3s ease'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <Mail size={20} style={{ color: 'var(--accent)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Email</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>nayankdhurve@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918788577239" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                transition: 'border-color 0.3s ease'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <Phone size={20} style={{ color: 'var(--accent)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Phone</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>+91-8788577239</div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/Naydhurve3" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GithubIcon size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/nayan-dhurve-31815a258" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <button onClick={() => setShowResume(true)} className="btn btn-accent btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <FileText size={16} /> Resume
              </button>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card"
          >
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  style={{ ...inputStyle, borderColor: errors.name ? 'var(--danger)' : undefined }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => { if (!errors.name) e.target.style.borderColor = 'var(--border)'; }}
                />
                {errors.name && <div style={{ fontSize: '0.72rem', color: 'var(--danger)', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>

              {/* Email */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  style={{ ...inputStyle, borderColor: errors.email ? 'var(--danger)' : undefined }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--border)'; }}
                />
                {errors.email && <div style={{ fontSize: '0.72rem', color: 'var(--danger)', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>

              {/* Subject */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Message */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Message *</label>
                <textarea
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical', borderColor: errors.message ? 'var(--danger)' : undefined }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => { if (!errors.message) e.target.style.borderColor = 'var(--border)'; }}
                />
                {errors.message && <div style={{ fontSize: '0.72rem', color: 'var(--danger)', marginTop: '0.25rem' }}>{errors.message}</div>}
              </div>

              <button
                type="submit"
                className={`btn ${submitted ? '' : 'btn-primary'}`}
                disabled={submitted}
                style={submitted ? {
                  background: 'var(--success)',
                  color: '#ffffff',
                  border: '1px solid var(--success)',
                  width: '100%',
                  justifyContent: 'center'
                } : { width: '100%', justifyContent: 'center' }}
              >
                {submitted ? '✓ Sent!' : <><Send size={14} /> Send message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
