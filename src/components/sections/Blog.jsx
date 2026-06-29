import { motion } from 'framer-motion';
import { blogArticles } from '../../data/experience';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function Blog() {
  return (
    <section id="blog" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          06 / writings
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Recent Articles
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {blogArticles.map((article, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(15px)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 15px 35px var(--accent-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Emoji visual */}
              <div style={{
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                background: 'linear-gradient(135deg, var(--surface-hover) 0%, var(--card-bg) 100%)',
                borderBottom: '1px solid var(--border)'
              }}>
                {article.emoji}
              </div>

              <div style={{ padding: '1.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>{article.category}</span>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em'
                }}>{article.title}</h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>{article.summary}</p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span>{article.readTime}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
