import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    const tick = () => {
      const { mx, my } = pos.current;
      pos.current.cx += (mx - pos.current.cx) * 0.12;
      pos.current.cy += (my - pos.current.cy) * 0.12;
      if (circleRef.current) {
        circleRef.current.style.left = pos.current.cx + 'px';
        circleRef.current.style.top = pos.current.cy + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };

    const onPointerOver = (event) => {
      const interactive = event.target.closest?.('a, button, input, textarea, select, .skill-card, .glass-card, .project-card');
      circleRef.current?.classList.toggle('is-interactive', Boolean(interactive));
    };

    let rafId;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('pointerover', onPointerOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={circleRef} className="cursor-circle" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}
