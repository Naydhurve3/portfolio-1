import { useState, useEffect, useRef } from 'react';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Journey' },
];

const SHOW_THRESHOLD = 80;
const MIN_DELTA = 6;
const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export default function Navbar({ theme, toggleTheme, sections = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navHovered, setNavHovered] = useState(false);
  const hamburgerRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const mobileOpenRef = useRef(false);
  const hoveredRef = useRef(false);
  const visibleItems = navItems.filter(item => sections[item.id] !== false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
    if (mobileOpen) setHidden(false);
  }, [mobileOpen]);

  useEffect(() => {
    hoveredRef.current = navHovered;
  }, [navHovered]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0);
        setScrolled(y > 50);
        if (!REDUCED_MOTION && !mobileOpenRef.current && !hoveredRef.current) {
          if (y < SHOW_THRESHOLD) setHidden(false);
          else if (Math.abs(delta) > MIN_DELTA) setHidden(delta > 0);
        }
        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.boundingClientRect.top < best.boundingClientRect.top) {
            best = entry;
          }
        }
        if (best) setActiveSection(best.target.id);
      },
      { threshold: 0, rootMargin: '-20% 0px -45% 0px' }
    );

    const sectionEls = document.querySelectorAll('section[id]');
    sectionEls.forEach(sec => observer.observe(sec));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header
        className={`navbar-wrapper ${hidden ? 'navbar-wrapper--hidden' : ''}`}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
          <a
            className="nav-logo"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Back to top"
          >
            N.<span>DHURVE</span>
          </a>

          {visibleItems.length > 0 && (
            <ul id="mobile-menu" className={`nav-links ${mobileOpen ? 'active' : ''}`}>
              {visibleItems.map(item => (
                <li key={item.id}>
                  <a
                    className={activeSection === item.id ? 'active' : ''}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.id);
                    }}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="nav-actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              ref={hamburgerRef}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}