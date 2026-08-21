import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';
import Preloader from './components/layout/Preloader';
import ResumeModal from './components/shared/ResumeModal';
import PortfolioExperience from './next/PortfolioExperience';

const AdminPage = lazy(() => import('./components/admin/AdminPage'));

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <Suspense fallback={<main className="admin-shell admin-shell--center">Opening private control room…</main>}><AdminPage /></Suspense>;
  }
  return <PublicApp />;
}

function PublicApp() {
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

  const sections = { about: true, skills: true, projects: true, experience: true, ...(publicSettings.sections || {}) };
  const channels = { email: true, phone: true, whatsapp: true, github: true, linkedin: true, ...(publicSettings.channels || {}) };
  const hiddenProjects = Array.isArray(publicSettings.hiddenProjects) ? new Set(publicSettings.hiddenProjects) : new Set();
  const resumeVisible = publicSettings.resumeVisible !== false;
  const contentItems = Array.isArray(publicSettings.contentItems) ? publicSettings.contentItems : [];
  const visibility = { sections, channels, hiddenProjects, resumeVisible, contentItems };

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader loading={loading} onComplete={handleLoadComplete} />

      {!loading && (
        <>
          <ResumeModal resumeVisible={resumeVisible} />
          <PortfolioExperience theme={theme} toggleTheme={toggleTheme} visibility={visibility} />
        </>
      )}
    </MotionConfig>
  );
}

export default App;
