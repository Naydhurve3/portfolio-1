import { useEffect } from 'react';

const REVEAL_SELECTOR = [
  'main > section',
  '.section-header',
  '.glass-card',
  '.project-card',
  '.skill-card',
  '.experience-card',
].join(',');

const GLOW_SELECTOR = '.glass-card, .glass-surface, .project-card, .skill-card, .navbar, .quick-contact';
const MAGNETIC_SELECTOR = '.btn-accent, .nav-actions button, .quick-contact__actions a';

export default function AmbientInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const revealItems = [...document.querySelectorAll(REVEAL_SELECTOR)];

    revealItems.forEach((item, index) => {
      item.classList.add('reveal-ready');
      item.style.setProperty('--reveal-order', String(index % 4));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach((item) => observer.observe(item));

    if (reduceMotion || !canHover) {
      revealItems.forEach((item) => item.classList.add('is-revealed'));
      return () => observer.disconnect();
    }

    let frame = 0;
    const onPointerMove = (event) => {
      const glowTarget = event.target.closest?.(GLOW_SELECTOR);
      const magneticTarget = event.target.closest?.(MAGNETIC_SELECTOR);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (glowTarget) {
          const rect = glowTarget.getBoundingClientRect();
          glowTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
          glowTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
        }
        if (magneticTarget) {
          const rect = magneticTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
          magneticTarget.style.setProperty('--magnetic-x', `${x}px`);
          magneticTarget.style.setProperty('--magnetic-y', `${y}px`);
        }
      });
    };

    const onPointerOut = (event) => {
      const magneticTarget = event.target.closest?.(MAGNETIC_SELECTOR);
      if (magneticTarget && !magneticTarget.contains(event.relatedTarget)) {
        magneticTarget.style.setProperty('--magnetic-x', '0px');
        magneticTarget.style.setProperty('--magnetic-y', '0px');
      }
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  return <div className="edge-reveal-hint" aria-hidden="true"><span /></div>;
}
