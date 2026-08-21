import { CONTACT, mailtoUrl, whatsappUrl } from '../../config/contact';
import { ArrowUp, Mail, Phone, MessageCircle, FileText } from 'lucide-react';
import { openResumePopup } from '../shared/ResumeModal';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const sectionLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Journey' },
];

export default function Footer({ publicSettings = {}, visibility = {} }) {
  const { sections = {}, channels = {}, resumeVisible = true } = visibility;
  const visibleLinks = sectionLinks.filter(link => sections[link.id] !== false);
  const socialLinks = [
    ...(channels.github !== false ? [{ href: CONTACT.github, label: 'GitHub', icon: GithubIcon }] : []),
    ...(channels.linkedin !== false ? [{ href: CONTACT.linkedin, label: 'LinkedIn', icon: LinkedinIcon }] : []),
    ...(channels.whatsapp !== false ? [{ href: whatsappUrl(), label: 'WhatsApp', icon: MessageCircle }] : []),
  ];
  return (
    <footer id="contact" style={{ padding: '4rem 0 2rem', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <div
          className="glass-surface"
          style={{ borderRadius: 'var(--radius-xl)', padding: 'clamp(1.5rem, 4vw, 3.5rem)', overflow: 'hidden' }}
        >
          {/* CTA + columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 0.8fr 1fr',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}>
            {/* Brand / CTA */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                marginBottom: '0.75rem'
              }}>
                Let's Build<br />Something <span style={{ color: 'var(--accent)' }}>Meaningful ↓</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '34ch' }}>
                Data Science &amp; AI Engineering — from raw datasets to production GenAI integrations.
              </p>
            </div>

            {/* Explore */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                display: 'block',
                marginBottom: '0.9rem'
              }}>Explore</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {visibleLinks.map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </a>
                ))}
                {resumeVisible && (
                <button
                  type="button"
                  onClick={openResumePopup}
                  style={{ fontSize: '0.88rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  <FileText size={13} /> Resume
                </button>
                )}
              </div>
            </div>

            {/* Connect */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                display: 'block',
                marginBottom: '0.9rem'
              }}>Connect</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {channels.email !== false && (
                <a href={mailtoUrl()} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <Mail size={13} /> {CONTACT.email}
                </a>
                )}
                {channels.phone !== false && (
                <a href={`tel:${CONTACT.phoneE164}`} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <Phone size={13} /> {CONTACT.phoneDisplay}
                </a>
                )}
                {socialLinks.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: '34px', height: '34px',
                        display: 'grid', placeItems: 'center',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--glass-bg)',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.color = 'var(--neon)'; e.currentTarget.style.boxShadow = '0 0 18px var(--neon-glow)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)', display: 'inline-block' }} />
                  {publicSettings.availability || 'Systems Active · Available'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.4rem',
            borderTop: '1px solid var(--glass-border)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <div>© 2026 Nayan Dhurve. All rights reserved.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <span>Built with <span style={{ color: 'var(--accent)' }}>♥</span> · React &amp; Three.js</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                  padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                Top <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
