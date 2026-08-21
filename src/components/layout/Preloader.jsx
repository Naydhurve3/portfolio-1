import { useEffect, useState } from 'react';
import { CONTACT } from '../../config/contact';

const NAME = CONTACT.name.toUpperCase();
const STAGGER_MS = 45;
const HOLD_MS = 350;
const EXIT_MS = 300;
const REDUCED_TOTAL_MS = 600;

export default function Preloader({ loading, onComplete }) {
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [letterCount, setLetterCount] = useState(reduced ? NAME.length : 0);
  const [showSubtitle, setShowSubtitle] = useState(reduced);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onComplete, REDUCED_TOTAL_MS);
      return () => clearTimeout(t);
    }
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setLetterCount(index);
      if (index >= NAME.length) {
        clearInterval(interval);
        setShowSubtitle(true);
        setTimeout(() => {
          setFading(true);
          setTimeout(onComplete, EXIT_MS);
        }, HOLD_MS);
      }
    }, STAGGER_MS);
    return () => clearInterval(interval);
  }, [reduced, onComplete]);

  const progress = Math.min(100, Math.round((letterCount / NAME.length) * 100));

  return (
    <div
      className={`preloader preloader-studio ${!loading ? 'hidden' : ''} ${reduced ? 'preloader--static' : ''} ${fading ? 'preloader--fading' : ''}`}
      role="status"
      aria-label={`Loading portfolio for ${CONTACT.name}`}
    >
      <div className="preloader-studio__grid" aria-hidden="true"><i /><i /><i /></div>
      <header className="preloader-studio__header"><strong>ND<span>®</span></strong><small>PORTFOLIO SYSTEM / 2026</small></header>
      <div className="preloader-studio__body">
        <div className="preloader-studio__signal"><i /> Initialising evidence-led interface</div>
        <div className="preloader-name" aria-hidden="true">
          {NAME.split('').map((char, i) => (
            <span
              key={i}
              className={`preloader-letter ${char === ' ' ? 'preloader-letter--space' : ''} ${i < letterCount ? 'revealed' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className={`preloader-subtitle ${showSubtitle ? 'shown' : ''}`}>Machine Learning Engineer · AI Systems Builder</div>
        <div className="preloader-studio__orbit" aria-hidden="true"><i /><i /><span>ND</span></div>
      </div>
      <footer className="preloader-studio__footer">
        <span>BUILDING EXPERIENCE</span>
        <div className="preloader-progress-track" aria-hidden="true"><div className="preloader-progress-bar" style={{ width: `${progress}%` }} /></div>
        <strong>{String(progress).padStart(3, '0')}%</strong>
      </footer>
    </div>
  );
}
