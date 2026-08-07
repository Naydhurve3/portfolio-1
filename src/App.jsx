import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import Preloader from './components/layout/Preloader';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import QuickContact from './components/layout/QuickContact';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
/* FUTURE: Testimonials, Blog, Achievements, Playground — preserved in sections/ for later activation */
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

const AdminPage = lazy(() => import('./components/admin/AdminPage'));

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <Suspense fallback={<main className="admin-shell admin-shell--center">Opening private control room…</main>}><AdminPage /></Suspense>;
  }
  const [loading, setLoading] = useState(true);
  const [publicSettings, setPublicSettings] = useState({});
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch('/api/public-settings')
      .then(response => response.ok ? response.json() : {})
      .then(setPublicSettings)
      .catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Preloader loading={loading} onComplete={handleLoadComplete} />

      {!loading && (
        <>
          <ScrollProgress />
          <CustomCursor />
          <div className="bg-grain" />
          <div className="bg-grid" />

          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {publicSettings.announcement && (
            <div className="site-announcement" role="status">{publicSettings.announcement}</div>
          )}

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact publicSettings={publicSettings} />
          </main>

          <Footer publicSettings={publicSettings} />
          <QuickContact />
          <BackToTop />
        </>
      )}
    </>
  );
}

export default App;
