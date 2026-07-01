import { useState, useEffect, useCallback } from 'react';
import Preloader from './components/layout/Preloader';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
/* FUTURE: Testimonials, Blog, Achievements, Playground — preserved in sections/ for later activation */
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

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

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}

export default App;
