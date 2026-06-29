import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/experience';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          05 / feedback
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Endorsements
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div style={{
            display: 'flex',
            transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
            transform: `translateX(-${currentSlide * 100}%)`
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                minWidth: '100%',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  maxWidth: '700px'
                }}>{t.quote}</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{t.author}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem'
        }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: currentSlide === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === i ? 'var(--accent)' : 'var(--border-hover)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
