import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const SHOW_AT_TOP_BELOW = 80;
const AUTO_HIDE_MS = 8000;

export default function NameBanner({ announcement }) {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);

  const stopHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const startHideTimer = () => {
    stopHideTimer();
    hideTimer.current = setTimeout(() => setVisible(false), AUTO_HIDE_MS);
  };

  useEffect(() => {
    const appear = setTimeout(() => {
      setVisible(true);
      startHideTimer();
    }, 1000);
    return () => {
      clearTimeout(appear);
      stopHideTimer();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < SHOW_AT_TOP_BELOW) {
        setVisible(true);
        startHideTimer();
      } else {
        setVisible(false);
        stopHideTimer();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      stopHideTimer();
    };
  }, []);

  return (
    <button
      type="button"
      className={`name-banner neon-border ${visible ? '' : 'name-banner--hidden'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top — Nayan Dhurve"
    >
      <span className="name-banner__dot" aria-hidden="true" />
      {announcement ? (
        <span role="status">{announcement}</span>
      ) : (
        <span role="status">
          <strong>Nayan Dhurve</strong>&nbsp;<span className="name-banner__accent">· Data Scientist &amp; AI Engineer</span>
        </span>
      )}
      <span className="name-banner__chevron" aria-hidden="true">
        <ArrowUp size={12} />
      </span>
    </button>
  );
}
