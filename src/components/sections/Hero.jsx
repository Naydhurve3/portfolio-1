import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroScene from '../three/HeroScene';

const roles = [
  { emoji: '📊', title: 'Data Science & Analytics', color: '#818cf8' },
  { emoji: '⚙️', title: 'ML Engineering', color: '#10b981' },
  { emoji: '🤖', title: 'AI App Development', color: '#a855f7' },
  { emoji: '🧠', title: 'Deep Learning & CV', color: '#f43f5e' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  })
};

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '8rem',
      paddingBottom: '5rem'
    }}>
      {/* 3D Background Scene */}
      <HeroScene />

      {/* Foreground Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Intro */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}
        >
          👋 Hello, I'm Nayan Dhurve — AI Engineer & Data Scientist
        </motion.p>

        {/* Giant Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: 0.95,
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <span style={{
            fontSize: 'clamp(2.5rem, 9vw, 7rem)',
            fontWeight: 850,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            BUILDING
          </span>
          <span style={{
            fontSize: 'clamp(2rem, 7.5vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: 'transparent',
            WebkitTextStroke: '1.5px var(--text)',
          }}>
            INTELLIGENT SYSTEMS
          </span>
        </motion.h1>

        {/* Role Cards Row */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}
        >
          {roles.map((role, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: role.color,
                cursor: 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{role.emoji}</span>
              <span>{role.title}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2.2rem',
            marginBottom: '3rem',
            width: '90%',
            maxWidth: '900px'
          }}
        >
          {['ICEICO Technologies', 'YCCE Research', 'Render Cloud', 'IBM SkillsBuild', 'Tata Forage'].map((name, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              opacity: 0.6,
              transition: 'opacity 0.3s ease, color 0.3s ease',
              cursor: 'default'
            }}
              onMouseEnter={e => { e.target.style.opacity = '1'; e.target.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.target.style.opacity = '0.6'; e.target.style.color = 'var(--text-muted)'; }}
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
        >
          <a href="#projects" className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Explore Work
          </a>
          <a href="#contact" className="btn btn-secondary"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Contact Me
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
          style={{
            marginTop: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'indicatorScroll 1.5s infinite'
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>Scroll</span>
        </motion.div>
      </div>

      <style>{`
        @keyframes indicatorScroll {
          0% { transform: translateY(-8px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
