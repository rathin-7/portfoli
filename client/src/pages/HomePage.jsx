import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ServicesSection from '../components/sections/ServicesSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import ContactSection from '../components/sections/ContactSection';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { setActiveSection } = useApp();
  const location = useLocation();

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'services', 'experience', 'projects', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [setActiveSection]);

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.querySelector(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location.state]);

  return (
    <>
      <Helmet>
        <title>Radhin | MERN Stack Developer</title>
        <meta name="description" content="MERN Stack Developer portfolio - Building modern web experiences with React, Node.js, and cutting-edge technologies." />
        <meta property="og:title" content="Radhin | MERN Stack Developer" />
        <meta property="og:description" content="Building modern web experiences with React, Node.js, and cutting-edge technologies." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Radhin | MERN Stack Developer" />
        <link rel="canonical" href="https://radhinraj.dev" />
      </Helmet>

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </>
  );
}
