import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../../data/experience';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

function GitHubGrid() {
  const blocks = useMemo(() => {
    return Array.from({ length: 96 }, () => {
      const r = Math.random();
      let level = 0;
      if (r > 0.85) level = 4;
      else if (r > 0.7) level = 3;
      else if (r > 0.5) level = 2;
      else if (r > 0.3) level = 1;
      return level;
    });
  }, []);

  const colors = {
    0: 'rgba(255,255,255,0.03)',
    1: 'rgba(129,140,248,0.15)',
    2: 'rgba(129,140,248,0.3)',
    3: 'rgba(129,140,248,0.55)',
    4: 'rgba(129,140,248,0.85)'
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(24, 1fr)',
      gap: '3px',
      padding: '1rem 0'
    }}>
      {blocks.map((level, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            borderRadius: '2px',
            background: colors[level],
            transition: 'background 0.3s ease'
          }}
        />
      ))}
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          07 / metrics
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Achievements
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Awards */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              Awards & Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {achievements.map((a, i) => (
                <div key={i} style={{
                  padding: '1rem 1.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{a.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {a.year || a.org}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* GitHub Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: 'var(--card-bg)',
              backdropFilter: 'blur(15px)'
            }}
          >
            <div style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-heading)'
            }}>
              🐙 GitHub Contribution Matrix
            </div>
            <GitHubGrid />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              marginTop: '0.5rem'
            }}>
              <span>320+ Contributions this year</span>
              <span>Active Developer Status</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #achievements .container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
