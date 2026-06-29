import { useEffect, useRef, useState } from 'react';

export default function Preloader({ loading, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing');
  const intervalRef = useRef(null);

  useEffect(() => {
    let p = 0;
    const statuses = ['Loading modules', 'Initializing 3D engine', 'Building scene', 'Ready'];
    intervalRef.current = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setStatus('Ready');
        setTimeout(() => onComplete(), 600);
      } else {
        const idx = Math.min(Math.floor(p / 30), statuses.length - 1);
        setStatus(statuses[idx]);
      }
      setProgress(Math.min(p, 100));
    }, 80);

    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`}>
      <div className="preloader-logo">
        N.<span>DHURVE</span>
      </div>
      <div className="preloader-status">{status}</div>
      <div className="preloader-progress-track">
        <div
          className="preloader-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
