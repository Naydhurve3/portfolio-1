export default function Footer() {
  return (
    <footer style={{
      padding: '6rem 0 3rem',
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container">
        {/* Big CTA */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05
          }}>
            Let's Build<br />
            Something<br />
            Meaningful <span style={{ color: 'var(--accent)' }}>↓</span>
          </h2>
        </div>

        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)'
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              display: 'block',
              marginBottom: '0.75rem'
            }}>Connect</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:nayankdhurve@gmail.com" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
                Email
              </a>
              <a href="https://github.com/Naydhurve3" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/nayan-dhurve-31815a258" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              display: 'block',
              marginBottom: '0.75rem'
            }}>Location</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Nagpur, India</span>
          </div>

          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              display: 'block',
              marginBottom: '0.75rem'
            }}>Availability</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--success)',
                boxShadow: '0 0 8px var(--success)',
                display: 'inline-block'
              }} />
              Systems Active · Available
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>© 2026 Nayan Dhurve. All rights reserved.</div>
          <div>Built with <span style={{ color: 'var(--accent)' }}>♥</span> & Premium AI Product Aesthetics.</div>
        </div>
      </div>
    </footer>
  );
}
