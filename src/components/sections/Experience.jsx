import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          04 / history
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          My Journey
        </motion.h2>

        <div style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          paddingLeft: '2rem'
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '3.5px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'var(--border-hover)'
          }} />

          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              style={{
                position: 'relative',
                marginBottom: i < experience.length - 1 ? '4rem' : 0
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: 'calc(-2rem - 3.5px)',
                top: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)'
              }} />

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--accent)',
                marginBottom: '0.5rem'
              }}>{item.year}</div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '0.25rem',
                fontFamily: 'var(--font-heading)'
              }}>{item.title}</h3>

              <div style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem'
              }}>{item.subtitle}</div>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.7
              }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
