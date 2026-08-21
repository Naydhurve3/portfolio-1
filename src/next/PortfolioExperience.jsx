import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight, ArrowUpRight, BarChart3, Bot, BriefcaseBusiness, Check,
  ChevronRight, CircleDot, Cpu, Download, ExternalLink,
  Mail, Menu, MessageCircle, Moon, Phone, Sparkles, Sun, X,
} from 'lucide-react';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { experience } from '../data/experience';
import { CONTACT, mailtoUrl, whatsappUrl } from '../config/contact';
import { openResumePopup } from '../components/shared/ResumeModal';
import './portfolio-next.css';

const nav = [
  ['01', 'work', 'Selected work'],
  ['02', 'capabilities', 'Capabilities'],
  ['03', 'journey', 'Journey'],
  ['04', 'contact', 'Contact'],
];

const workingLoop = [
  { title: 'Frame the question', verb: 'Define', detail: 'Translate an ambiguous request into a measurable decision, constraint set and failure definition.', output: 'Decision brief', signal: 'A testable success criterion' },
  { title: 'Audit the evidence', verb: 'Inspect', detail: 'Profile provenance, leakage, missingness, geometry, bias and the assumptions hidden in source data.', output: 'Evidence map', signal: 'Known risks before modelling' },
  { title: 'Build the system', verb: 'Engineer', detail: 'Connect data, models, APIs and interface states into one observable and reproducible workflow.', output: 'Working system', signal: 'Traceable inputs and outputs' },
  { title: 'Validate failures', verb: 'Challenge', detail: 'Inspect edge cases and patient- or segment-level failures instead of trusting aggregate scores alone.', output: 'Failure report', signal: 'Limits are explicit' },
  { title: 'Ship the interface', verb: 'Deliver', detail: 'Turn the validated system into a clear, accessible experience with feedback and operational safeguards.', output: 'Usable product', signal: 'People can act on the result' },
];

const repoEvidence = {
  cosmoguide: { version: 'v2.0 · verified repository', stats: ['17 interactive modules', '11 AI providers', '3-tier key strategy', '50 demo requests/IP/day'], architecture: ['React 19 browser cockpit', 'Express proxy + rate limiter', 'Provider-specific adapters', 'Browser-owned key vault'] },
  'atm-simulation': { version: 'v4.0 · verified repository', stats: ['3-project monorepo', '94 automated tests', 'Core + CLI + Flask web', 'SQLite / Postgres layers'], architecture: ['V1 owns shared banking logic', 'V2 Rich terminal experience', 'V3 Flask product surface', 'Unified UserService / ATMService'] },
  'hr-analytics': { version: 'v2 research + v3 paper · verified', stats: ['1,755 interaction tests', '5 workforce outcomes', '7 reproducible phases', '60 publication figures'], architecture: ['Deep EDA + 27 engineered features', 'LR / RF / XGBoost comparison', 'SHAP + survival analysis', 'HTML report + paper blueprint'] },
  'lits17-liver-segmentation': { version: 'LiTS platform · verified repository', stats: ['131 CT volumes', '58,638 axial slices', '47 orientation repairs', '100% ROI containment'], architecture: ['Patient-disjoint cohorts', 'HU window + spatial forensics', 'Two-stage liver → tumour ROI', 'External 3D-IRCADb evaluation'] },
};

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function PortfolioExperience({ theme, toggleTheme, visibility }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false);
  const [active, setActive] = useState('top');
  const [projectOpen, setProjectOpen] = useState(null);
  const [loopStep, setLoopStep] = useState(0);
  const customContent = useMemo(
    () => (visibility.contentItems || []).filter(item => item.visible !== false),
    [visibility.contentItems],
  );
  const customProjects = useMemo(() => customContent.filter(item => item.type === 'project').map((item, index) => ({
    ...item,
    tag: item.subtitle || 'CUSTOM PROJECT',
    status: item.featured ? 'Featured' : item.date || 'Published',
    chips: item.tags || [],
    github: item.primaryUrl,
    live: item.documentUrl,
    color: ['#d7ff43', '#67e8f9', '#a855f7', '#f59e0b'][index % 4],
    metricValue: item.metricValue || item.date || 'New',
    metricLabel: item.metricLabel || 'Added from the content studio',
    caseStudy: { problem: item.description, solution: item.description, results: item.metricLabel || 'Published from the private content studio.' },
    evidence: item.tags || [],
  })), [customContent]);
  const visibleProjects = useMemo(
    () => [...customProjects, ...projects.filter((project) => !visibility.hiddenProjects.has(project.id))],
    [customProjects, visibility.hiddenProjects],
  );
  const libraryContent = useMemo(() => customContent.filter(item => item.type !== 'project'), [customContent]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (menuOpen || y < 90 || delta < -7) setMobileHeaderHidden(false);
        else if (delta > 9 && y > 140) setMobileHeaderHidden(true);
        lastY = y;
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', onScroll); };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActive(current.target.id);
    }, { rootMargin: '-35% 0px -50% 0px' });
    document.querySelectorAll('.neo-page section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="neo-page" id="top">
      <ExperienceEffects />
      <div className="neo-ambient" aria-hidden="true"><i /><i /><i /></div>
      <header className={`neo-mobile-head ${mobileHeaderHidden ? 'is-hidden' : ''}`} onFocusCapture={() => setMobileHeaderHidden(false)} onPointerEnter={() => setMobileHeaderHidden(false)}>
        <button className="neo-wordmark" onClick={() => go('top')} aria-label="Back to top">ND<span>®</span></button>
        <div>
          <button className="neo-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun /> : <Moon />}</button>
          <button className="neo-icon-btn" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></button>
        </div>
      </header>

      <aside className="neo-rail" aria-label="Primary navigation">
        <button className="neo-wordmark" onClick={() => go('top')} aria-label="Back to top">ND<span>®</span></button>
        <nav>
          {nav.map(([num, id, label]) => (
            <button key={id} className={active === id ? 'is-active' : ''} onClick={() => go(id)} title={label}>
              <span>{num}</span><i /><b>{label}</b>
            </button>
          ))}
        </nav>
        <div className="neo-rail-foot">
          <button className="neo-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun /> : <Moon />}</button>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ExternalLink /></a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
        </div>
      </aside>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="neo-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="neo-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button>
            <small>Navigate / 2026</small>
            {nav.map(([num, id, label]) => <button key={id} onClick={() => go(id)}><span>{num}</span>{label}<ArrowDownRight /></button>)}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="neo-main">
        <section className="neo-hero" aria-labelledby="hero-title">
          <div className="neo-hero-topline"><span><CircleDot /> Available for ambitious work</span><span>Nagpur, India · IST</span></div>
          <motion.div className="neo-hero-copy" {...fade}>
            <p className="neo-kicker">DATA SCIENTIST · AI ENGINEER · SYSTEM BUILDER</p>
            <h1 id="hero-title">I turn complex data into <em>decisions</em> people can use.</h1>
            <p className="neo-lede">From medical imaging to multi-model AI products, I design evidence-led systems that survive outside a notebook.</p>
            <div className="neo-hero-actions">
              <button className="neo-primary" onClick={() => go('work')}>Explore selected work <ArrowDownRight /></button>
              {visibility.resumeVisible && <button className="neo-text-action" onClick={openResumePopup}><Download /> Resume / PDF</button>}
            </div>
          </motion.div>

          <motion.div className="neo-orbit-card neo-portrait-card" initial={{ opacity: 0, scale: 0.9, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.25, duration: 0.8 }} whileHover={{ y: -7, rotate: -0.5 }}>
            <div className="neo-portrait-frame">
              <img src="/nayan-dhurve-portrait.jpg" alt="Nayan Dhurve, Data Scientist and AI Engineer" loading="eager" />
              <div className="neo-portrait-orbit" aria-hidden="true"><i /><i /><span /></div>
              <span className="neo-portrait-badge"><CircleDot /> Open to work</span>
              <span className="neo-portrait-coordinate">21.1458° N<br />79.0882° E</span>
            </div>
            <div className="neo-portrait-copy">
              <small>About me</small>
              <strong>Machine Learning Engineer</strong>
              <p>I build AI-powered decision-support systems that connect machine learning, explainable AI and data engineering to real business problems.</p>
              <div className="neo-about-tags"><span>ML systems</span><span>Explainable AI</span><span>Data engineering</span></div>
            </div>
          </motion.div>

          <div className="neo-proof-strip">
            <ProofMetric value={visibleProjects.length} suffix="+" label="Deep case studies" note="Open selected systems" onClick={() => go('work')} delay={0} />
            <ProofMetric value={20} label="ML/DL models in one platform" note="FinSight model registry" onClick={() => setProjectOpen(visibleProjects.find((item) => item.id === 'atm-simulation'))} delay={0.08} />
            <ProofMetric value={11} label="AI providers integrated" note="CosmoGuide routing" onClick={() => setProjectOpen(visibleProjects.find((item) => item.id === 'cosmoguide'))} delay={0.16} />
            <ProofMetric value={2026} label="Building now" note="Active systems + research" onClick={() => go('journey')} delay={0.24} year />
          </div>
        </section>

        {visibility.sections.projects !== false && (
          <section className="neo-section neo-work" id="work">
            <SectionIntro index="01" eyebrow="Selected systems" title="Work that connects research, engineering and real use." copy="Each project is presented as a decision system—not just a screenshot gallery." />
            <div className="neo-project-list">
              {visibleProjects.slice(0, 6).map((project, index) => (
                <motion.article className="neo-project" key={project.id} {...fade} style={{ '--project': project.color }}>
                  <button className="neo-project-main" onClick={() => setProjectOpen(project)}>
                    <span className="neo-project-index">{String(index + 1).padStart(2, '0')}</span>
                    <div className="neo-project-copy">
                      <div><small>{project.tag}</small><span>{project.status}</span></div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="neo-chips">{project.chips.slice(0, 5).map((chip) => <span key={chip}>{chip}</span>)}</div>
                    </div>
                    <div className="neo-project-metric"><strong>{project.metricValue}</strong><small>{project.metricLabel}</small><i><ArrowUpRight /></i></div>
                  </button>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {visibility.sections.skills !== false && (
          <section className="neo-section neo-capabilities" id="capabilities">
            <SectionIntro index="02" eyebrow="Capability matrix" title="One builder across the full intelligence stack." copy="I move between exploratory analysis, model engineering and the product surface where users make decisions." />
            <div className="neo-cap-grid">
              {skillCategories.map((category, index) => {
                const Icon = [BarChart3, Cpu, Bot, Sparkles][index] || Cpu;
                return (
                  <motion.article key={category.id} className="neo-cap-card" {...fade}>
                    <div><span>0{index + 1}</span><Icon /></div>
                    <h3>{category.title}</h3>
                    <ul>{category.technologies.slice(0, 8).map((tech) => <li key={tech}><Check />{tech}</li>)}</ul>
                  </motion.article>
                );
              })}
            </div>
            <div className="neo-method-wrap">
              <div className="neo-method-head"><span>My working loop</span><small>Choose a stage to inspect how the system adapts</small></div>
              <div className="neo-method" role="tablist" aria-label="Working process">
                {workingLoop.map((item, index) => <button role="tab" aria-selected={loopStep === index} className={loopStep === index ? 'is-active' : ''} key={item.title} onClick={() => setLoopStep(index)}><small>0{index + 1}</small><strong>{item.title}</strong><ChevronRight /></button>)}
              </div>
              <AnimatePresence mode="wait">
                <motion.div className="neo-method-detail" key={loopStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22 }}>
                  <span>0{loopStep + 1} / 05</span><div><small>{workingLoop[loopStep].verb}</small><h3>{workingLoop[loopStep].title}</h3><p>{workingLoop[loopStep].detail}</p></div><div><small>OUTPUT</small><strong>{workingLoop[loopStep].output}</strong></div><div><small>CHANGE CREATED</small><strong>{workingLoop[loopStep].signal}</strong></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        )}

        {visibility.sections.experience !== false && (
          <section className="neo-section neo-journey" id="journey">
            <SectionIntro index="03" eyebrow="Journey log" title="A career built by increasing the difficulty." copy="From statistical foundations to full-stack AI products and research-grade medical imaging." />
            <div className="neo-timeline">
              {experience.map((item, index) => (
                <motion.article key={`${item.year}-${item.title}`} {...fade}>
                  <span className="neo-year">{item.year}</span>
                  <i />
                  <div><small>{item.subtitle}</small><h3>{item.title}</h3><p>{item.description}</p>{item.certificateUrl && <a href={item.certificateUrl} target="_blank" rel="noreferrer">View certificate <ExternalLink /></a>}</div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {libraryContent.length > 0 && (
          <section className="neo-section neo-library" id="updates">
            <SectionIntro index="04" eyebrow="Live content library" title="Credentials, milestones and work added from the private studio." copy="This collection updates directly from the portfolio control room—no code change or redeployment required." />
            <div className="neo-library-grid">
              {libraryContent.map((item, index) => (
                <motion.article className={`neo-library-card ${item.featured ? 'is-featured' : ''}`} key={item.id} {...fade}>
                  {item.imageUrl && <div className="neo-library-card__image"><img src={item.imageUrl} alt="" loading="lazy" /></div>}
                  <header><span>{String(index + 1).padStart(2, '0')} / {item.type}</span>{item.featured && <b>Featured</b>}</header>
                  <small>{[item.subtitle, item.date].filter(Boolean).join(' · ')}</small>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.tags?.length > 0 && <div className="neo-chips">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
                  {(item.primaryUrl || item.documentUrl) && <footer>
                    {item.primaryUrl && <a href={item.primaryUrl} target="_blank" rel="noreferrer">Open link <ArrowUpRight /></a>}
                    {item.documentUrl && <a href={item.documentUrl} target="_blank" rel="noreferrer"><Download /> View document</a>}
                  </footer>}
                </motion.article>
              ))}
            </div>
          </section>
        )}

        <section className="neo-section neo-contact" id="contact">
          <div className="neo-contact-copy">
            <span className="neo-index">04</span>
            <p className="neo-kicker">START A CONVERSATION</p>
            <h2>Have a hard problem? <em>Let’s make it legible.</em></h2>
            <p>Open to data science, machine-learning engineering, AI product work and research collaborations.</p>
          </div>
          <div className="neo-contact-actions">
            {visibility.channels.email !== false && <a href={mailtoUrl()}><span><Mail /><b>Email</b></span><small>{CONTACT.email}</small><ArrowUpRight /></a>}
            {visibility.channels.whatsapp !== false && <a href={whatsappUrl()} target="_blank" rel="noreferrer"><span><MessageCircle /><b>WhatsApp</b></span><small>Usually the fastest response</small><ArrowUpRight /></a>}
            {visibility.channels.phone !== false && <a href={`tel:${CONTACT.phoneE164}`}><span><Phone /><b>Call</b></span><small>{CONTACT.phoneDisplay}</small><ArrowUpRight /></a>}
          </div>
          <footer><span>© 2026 Nayan Dhurve</span><span>Designed as an evidence-led interface</span><button onClick={() => go('top')}>Back to top <ArrowUpRight /></button></footer>
        </section>
      </main>

      <AnimatePresence>
        {projectOpen && <ProjectPanel project={projectOpen} onClose={() => setProjectOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function SectionIntro({ index, eyebrow, title, copy }) {
  return <motion.header className="neo-section-head" {...fade}><span className="neo-index">{index}</span><div><p className="neo-kicker">{eyebrow}</p><h2>{title}</h2></div><p>{copy}</p></motion.header>;
}

function ExperienceEffects() {
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  useEffect(() => {
    const root = document.querySelector('.neo-page');
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const precise = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let pointerFrame = 0;
    let scrollFrame = 0;

    const onPointer = (event) => {
      if (reduce || !precise) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const nx = event.clientX / innerWidth - .5;
        const ny = event.clientY / innerHeight - .5;
        root.style.setProperty('--scene-x', `${nx * 22}px`);
        root.style.setProperty('--scene-y', `${ny * 16}px`);
        if (glowRef.current) glowRef.current.style.transform = `translate3d(${event.clientX - 260}px,${event.clientY - 260}px,0)`;
        const magnetic = event.target.closest?.('.neo-primary,.neo-icon-btn,.neo-project-metric i,.neo-contact-actions a');
        if (magnetic) {
          const rect = magnetic.getBoundingClientRect();
          magnetic.style.setProperty('--pull-x', `${((event.clientX - rect.left) / rect.width - .5) * 7}px`);
          magnetic.style.setProperty('--pull-y', `${((event.clientY - rect.top) / rect.height - .5) * 5}px`);
        }
      });
    };
    const onPointerOut = (event) => {
      const magnetic = event.target.closest?.('.neo-primary,.neo-icon-btn,.neo-project-metric i,.neo-contact-actions a');
      if (magnetic && !magnetic.contains(event.relatedTarget)) {
        magnetic.style.setProperty('--pull-x', '0px');
        magnetic.style.setProperty('--pull-y', '0px');
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const ratio = max > 0 ? scrollY / max : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
        root.style.setProperty('--scroll-shift', `${Math.min(scrollY * .035, 80)}px`);
      });
    };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle('is-lit', entry.isIntersecting);
    }), { threshold: .12, rootMargin: '-10% 0px -15%' });
    root.querySelectorAll('.neo-section').forEach((section) => observer.observe(section));
    document.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(scrollFrame);
      document.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerout', onPointerOut);
      removeEventListener('scroll', onScroll);
    };
  }, []);
  return <><div ref={progressRef} className="neo-scroll-light" aria-hidden="true" /><div ref={glowRef} className="neo-cursor-light" aria-hidden="true" /><div className="neo-noise" aria-hidden="true" /></>;
}

function ProofMetric({ value, suffix = '', label, note, onClick, delay, year = false }) {
  return <button className="neo-proof-metric" onClick={onClick}><strong>{value}{suffix}</strong><small>{label}</small><em>{note} <ArrowUpRight /></em></button>;
}

function ProjectPanel({ project, onClose }) {
  const verified = repoEvidence[project.id];
  useEffect(() => {
    const key = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <motion.div className="neo-case-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.aside className="neo-case" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
        <header><span>{project.tag}</span><button onClick={onClose} aria-label="Close case study"><X /></button></header>
        <div className="neo-case-body">
          <div className="neo-case-status"><CircleDot /> {project.status} · {project.year}</div>
          <h2>{project.title}</h2><p className="neo-case-lede">{project.description}</p>
          <div className="neo-case-metric"><strong>{project.metricValue}</strong><span>{project.metricLabel}</span></div>
          {verified && <div className="neo-repo-evidence"><header><span><Check /> Repository verified</span><small>{verified.version}</small></header><div>{verified.stats.map((item) => <strong key={item}>{item}</strong>)}</div><ol>{verified.architecture.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>}
          <div className="neo-case-block"><small>THE PROBLEM</small><p>{project.caseStudy?.problem}</p></div>
          <div className="neo-case-block"><small>THE SYSTEM</small><p>{project.caseStudy?.solution}</p></div>
          <div className="neo-case-block"><small>THE RESULT</small><p>{project.caseStudy?.results}</p></div>
          <div className="neo-evidence">{project.evidence?.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <footer>
          {project.github && <a href={project.github} target="_blank" rel="noreferrer"><ExternalLink /> Source <ArrowUpRight /></a>}
          {project.live && <a className="is-primary" href={project.live} target="_blank" rel="noreferrer"><ExternalLink /> {project.liveLabel || 'Live system'} <ArrowUpRight /></a>}
        </footer>
      </motion.aside>
    </motion.div>
  );
}
