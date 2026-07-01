import { useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Cpu, Bot, Eye } from 'lucide-react';
import { skillCategories } from '../../data/skills';

const iconMap = { BarChart3, Cpu, Bot, Eye };

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

const colors = ['#818cf8', '#10b981', '#a855f7', '#f43f5e'];

function ProficiencyDots({ level = 4, total = 5, color }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: i < level ? color : 'var(--border)',
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

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

  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={cardRef}
      className="skill-card"
      variants={fadeUp}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(15px)',
        transition: 'box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: 'var(--card-shadow)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 15px 35px ${color}20, 0 0 0 1px ${color}`;
      }}
      onMouseLeaveCapture={(e) => {
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}08 0%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            background: `${color}15`,
          }}>
            {IconComponent && <IconComponent size={22} strokeWidth={1.75} />}
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              display: 'block',
            }}>{skill.title}</span>
            <ProficiencyDots level={index === 0 ? 4 : index === 1 ? 4 : index === 2 ? 4 : 3} color={color} />
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        transform: 'translateZ(25px)',
        position: 'relative',
        zIndex: 2,
      }}>
        {skill.technologies.map((tech, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
            className="skill-chip"
            style={{
              transition: 'all 0.2s ease',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = ''; }}
          >{tech}</motion.span>
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
          Atlas of Capabilities
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
