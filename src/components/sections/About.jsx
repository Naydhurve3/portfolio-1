import { motion } from 'framer-motion';
import { education, certifications } from '../../data/experience';

const editorialCards = [
  { label: 'Who I Am', title: 'AI & Developer', text: 'B.Tech IT graduate specializing in AI Engineering and Data Science. Passionate about building robust, scalable, and intelligent systems.' },
  { label: 'Mission', title: 'Bridges & Value', text: 'To bridge the gap between machine learning models and high-performance product deployments, ensuring AI delivers measurable, explainable business value.' },
  { label: 'What I Build', title: 'RAG & CNNs', text: 'Retrieval-Augmented Generation (RAG) agents, custom deep learning models (CNNs/CV), and robust pipeline integrations using Python and Vector databases.' },
  { label: 'Current Focus', title: 'Agents & Ops', text: 'Agentic workflows, prompt engineering optimization, local vector indexes, and deploying containerized, full-stack AI solutions.' },
  { label: 'Beyond Coding', title: 'Lab & Writing', text: 'A dedicated learner tracking open-source AI advancements, actively contributing to technical writings, and building interactive micro-experiments.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

export default function About() {
  return (
    <section id="about" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          01 / profile
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          About Me
        </motion.h2>

        {/* Editorial Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}
        >
          {editorialCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              style={{
                borderLeft: '1px solid var(--border)',
                paddingLeft: '1.5rem',
                position: 'relative'
              }}
            >
              <span style={{
                position: 'absolute',
                left: '-5px',
                top: '-24px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}>↓</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                marginBottom: '0.75rem',
                display: 'block'
              }}>{card.label}</span>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>{card.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Education + Certifications Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Education Timeline */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              🎓 Education
            </h3>
            <div style={{
              paddingLeft: '1.5rem',
              borderLeft: '1px solid var(--border)'
            }}>
              {education.map((edu, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < education.length - 1 ? '2rem' : 0 }}>
                  <div style={{
                    position: 'absolute',
                    left: 'calc(-1.5rem - 4.5px)',
                    top: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    border: '2px solid var(--bg)'
                  }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.2rem' }}>
                    {edu.period}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              📜 Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{
                  padding: '1rem 1.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{cert.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.org}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
