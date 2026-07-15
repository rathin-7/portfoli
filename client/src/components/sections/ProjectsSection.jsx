import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';
import ProjectScene from '../three/ProjectScene';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const projects = [
  {
    title: 'MITTI',
    slug: 'mitti',
    shortDescription: 'MERN E-commerce Platform',
    description: 'A full-featured MERN stack e-commerce platform with payment integration, real-time inventory, and admin dashboard.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://mitti-zeta.vercel.app',
    githubUrl: 'https://github.com/radhinraj/mitti',
    featured: true,
  },
  {
    title: 'AI Resume Builder',
    slug: 'ai-resume-builder',
    shortDescription: 'AI Resume Builder',
    description: 'AI-powered resume builder with dynamic templates, ATS optimization, and PDF export.',
    techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'PDF.js'],
    featured: true,
  },
  {
    title: 'Hotel Management System',
    slug: 'hotel-management',
    shortDescription: 'Hotel Management System',
    description: 'Complete hotel management solution with booking, billing, and room management.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    featured: true,
  },
  {
    title: 'Movie Ticket Booking',
    slug: 'movie-ticket-booking',
    shortDescription: 'Movie Ticket Booking',
    description: 'Modern movie ticket booking platform with seat selection, payments, and showtimes.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    featured: false,
  },
  {
    title: 'Inventory Management',
    slug: 'inventory-management',
    shortDescription: 'Inventory Management',
    description: 'Inventory management system with tracking, analytics, and alert system.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    featured: false,
  },
];

export default function ProjectsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-15">
        <ProjectScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f] z-[1]" />

      <div className="container-custom relative z-[2]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Projects
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            Featured <span className="gradient-text">Work</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              custom={i + 2}
              className="glass overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {project.featured && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium">Featured</span>
                      )}
                      <span className="text-white/30 text-sm font-mono">0{i + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-white/40 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
                          <FiExternalLink size={14} /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-5 flex items-center gap-2">
                          <FiGithub size={14} /> GitHub
                        </a>
                      )}
                      <Link to={`/project/${project.slug}`} className="btn-secondary text-sm py-2 px-5 flex items-center gap-2">
                        Case Study <FiArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
