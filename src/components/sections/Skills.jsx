import { useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Cpu, Bot, Eye } from 'lucide-react';
import { skillCategories } from '../../data/skills';

const iconMap = { BarChart3, Cpu, Bot, Eye };

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const IconComponent = iconMap[skill.icon];

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotX = (yc - y) / 12;
    const rotY = (x - xc) / 12;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="skill-card"
      variants={fadeUp}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.2rem',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(15px)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: 'var(--card-shadow)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 15px 35px var(--accent-glow)';
      }}
      onMouseLeaveCapture={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
      }}
    >
      {/* Glow follower */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1rem',
        transform: 'translateZ(10px)',
        position: 'relative',
        zIndex: 2
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '-0.02em'
        }}>{skill.title}</span>
        <div style={{
          width: '36px',
          height: '36px',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {IconComponent && <IconComponent size={26} strokeWidth={1.75} />}
        </div>
      </div>

      {/* Tech chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        transform: 'translateZ(25px)',
        position: 'relative',
        zIndex: 2
      }}>
        {skill.technologies.map((tech, i) => (
          <span key={i} className="skill-chip">{tech}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          02 / capabilities
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Core Skills
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {skillCategories.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
