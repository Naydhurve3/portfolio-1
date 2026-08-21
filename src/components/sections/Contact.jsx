import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, FileText, MessageCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import CertificateModal from '../shared/CertificateModal';
import { CONTACT, mailtoUrl, whatsappUrl } from '../../config/contact';
import { submitContact } from '../../lib/submitContact';

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

export default function Contact({ publicSettings = {} }) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [showResume, setShowResume] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (submitState !== 'success') return;
    const timer = setTimeout(() => {
      setSubmitState('idle');
      setErrors({});
    }, 3200);
    return () => clearTimeout(timer);
  }, [submitState]);

  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) errs.email = 'Please enter a valid email.';
    if (!formState.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const company = new FormData(e.currentTarget).get('company');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length !== 0) return;

    setSubmitState('sending');
    try {
      await submitContact({ ...formState, company });
      setSubmitState('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitState('fallback');
      window.location.href = mailtoUrl(formState);
    }
  };

  const inputStyle = {
    width: '100%',
    borderColor: 'var(--glass-border)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease'
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
          pdfUrl="/api/resume"
          title="Resume — Nayan Dhurve"
          onClose={() => setShowResume(false)}
        />
      )}
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          05 / connect
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Contact
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Info Column */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {/* Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <a href={mailtoUrl()} className="contact-channel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = ''}
              >
                <Mail size={20} style={{ color: 'var(--accent)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Email</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{CONTACT.email}</div>
                </div>
                <ExternalLink size={15} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </a>

              <a href={`tel:${CONTACT.phoneE164}`} className="contact-channel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = ''}
              >
                <Phone size={20} style={{ color: 'var(--accent)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Phone</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{CONTACT.phoneDisplay}</div>
                </div>
                <ExternalLink size={15} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GithubIcon size={16} /> GitHub
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageCircle size={16} /> WhatsApp
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
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="contact-form__eyebrow">Direct enquiry</div>
              <h3 className="contact-form__title">Tell me what you&apos;re building.</h3>
              <p className="contact-form__intro">{publicSettings.responseTime || 'I typically reply within 24 hours.'}</p>
              <input className="contact-honeypot" name="company" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              {/* Name */}
              <div className="form-field">
                <label htmlFor="contact-name" style={labelStyle}>Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  aria-label="Name"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  style={{ ...inputStyle, borderColor: errors.name ? 'var(--danger)' : undefined }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => { if (!errors.name) e.target.style.borderColor = 'var(--glass-border)'; }}
                />
                {errors.name && <div className="form-field__error">{errors.name}</div>}
              </div>

              {/* Email */}
              <div className="form-field">
                <label htmlFor="contact-email" style={labelStyle}>Email *</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  aria-label="Email"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  style={{ ...inputStyle, borderColor: errors.email ? 'var(--danger)' : undefined }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--glass-border)'; }}
                />
                {errors.email && <div className="form-field__error">{errors.email}</div>}
              </div>

              {/* Subject */}
              <div className="form-field">
                <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  aria-label="Subject"
                  value={formState.subject}
                  onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </div>

              {/* Message */}
              <div className="form-field">
                <label htmlFor="contact-message" style={labelStyle}>Message *</label>
                <textarea
                  id="contact-message"
                  value={formState.message}
                  name="message"
                  aria-label="Message"
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical', borderColor: errors.message ? 'var(--danger)' : undefined }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => { if (!errors.message) e.target.style.borderColor = 'var(--glass-border)'; }}
                />
                {errors.message && <div className="form-field__error">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className={`btn ${submitState === 'success' ? '' : 'btn-primary'}`}
                disabled={submitState === 'sending' || submitState === 'success'}
                style={submitState === 'success' ? {
                  background: 'var(--success)',
                  color: '#ffffff',
                  border: '1px solid var(--success)',
                  width: '100%',
                  justifyContent: 'center'
                } : { width: '100%', justifyContent: 'center' }}
              >
                {submitState === 'sending' && 'Sending…'}
                {submitState === 'success' && <><CheckCircle2 size={15} /> Message received</>}
                {(submitState === 'idle' || submitState === 'fallback') && <><Send size={14} /> Send message</>}
              </button>
              <div className="contact-form__status" role="status" aria-live="polite">
                {submitState === 'success' && 'Thanks — your enquiry was saved securely.'}
                {submitState === 'fallback' && 'Opening your email app so your message still reaches me.'}
              </div>
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
