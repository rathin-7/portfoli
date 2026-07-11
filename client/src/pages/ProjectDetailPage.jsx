import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiExternalLink, FiGithub, FiArrowLeft } from 'react-icons/fi';

const projectsData = {
  mitti: { title: 'MITTI', description: 'A full-featured MERN stack e-commerce platform with payment integration, real-time inventory, and admin dashboard.', techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'], features: ['Payment Integration', 'Real-time Inventory', 'Admin Dashboard', 'Responsive Design', 'Search & Filter', 'User Authentication'], challenges: ['Implementing real-time inventory sync', 'Optimizing payment flow', 'Building responsive admin panel'], liveUrl: 'https://mitti-zeta.vercel.app' },
  'ai-resume-builder': { title: 'AI Resume Builder', description: 'AI-powered resume builder with dynamic templates, ATS optimization, and PDF export.', techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'PDF.js'], features: ['AI Content Generation', 'Multiple Templates', 'ATS Optimization', 'PDF Export'], challenges: ['Integrating AI API responses', 'Template rendering system'] },
  'hotel-management': { title: 'Hotel Management System', description: 'Complete hotel management solution with booking, billing, and room management.', techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'], features: ['Real-time Booking', 'Billing System', 'Room Management', 'Staff Dashboard'], challenges: ['Real-time room availability', 'Concurrent booking handling'] },
  'movie-ticket-booking': { title: 'Movie Ticket Booking', description: 'Modern movie ticket booking platform with seat selection, payments, and showtimes.', techStack: ['React', 'Node.js', 'Express', 'MongoDB'], features: ['Seat Selection', 'Payment Gateway', 'Showtime Management'], challenges: ['Interactive seat map', 'Payment integration'] },
  'inventory-management': { title: 'Inventory Management', description: 'Inventory management system with tracking, analytics, and alert system.', techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js'], features: ['Stock Tracking', 'Analytics Dashboard', 'Low Stock Alerts'], challenges: ['Real-time stock updates', 'Analytics calculations'] },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Radhin Portfolio</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 section-padding"
      >
        <div className="container-custom max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-8">
            <FiArrowLeft /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{project.title}</h1>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">{project.description}</p>

            <div className="glass p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm">{tech}</span>
                ))}
              </div>
            </div>

            <div className="glass p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="text-white/50 flex items-center gap-2">
                    <span className="text-accent">&#9656;</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {project.challenges && (
              <div className="glass p-6 mb-8">
                <h3 className="font-semibold text-lg mb-4">Challenges</h3>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="text-white/50 flex items-center gap-2">
                      <span className="text-pink-500">&#9656;</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                  <FiExternalLink /> Live Demo
                </a>
              )}
              <a href="#" className="btn-secondary flex items-center gap-2">
                <FiGithub /> Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
