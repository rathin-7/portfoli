import { motion } from 'framer-motion';
import { FiCode, FiServer, FiLayers, FiDatabase, FiSmartphone, FiZap, FiCloud, FiBriefcase } from 'react-icons/fi';
import { useInView } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const services = [
  { icon: FiCode, title: 'Frontend Development', description: 'Building responsive, interactive UIs with React, modern CSS, and pixel-perfect designs.', color: '#61DAFB' },
  { icon: FiServer, title: 'Backend Development', description: 'Scalable server-side applications with Node.js, Express, and RESTful APIs.', color: '#339933' },
  { icon: FiLayers, title: 'Full Stack Development', description: 'End-to-end MERN stack solutions from database to deployment.', color: '#8b5cf6' },
  { icon: FiDatabase, title: 'REST APIs', description: 'Well-structured, documented, and tested API architectures.', color: '#F7DF1E' },
  { icon: FiSmartphone, title: 'Responsive Websites', description: 'Mobile-first designs that work flawlessly across all devices.', color: '#06B6D4' },
  { icon: FiZap, title: 'Performance Optimization', description: 'Lightning-fast applications optimized for Core Web Vitals.', color: '#FF6C37' },
  { icon: FiCloud, title: 'Deployment', description: 'Seamless deployment to Vercel, Render, and cloud platforms.', color: '#F23D6F' },
  { icon: FiBriefcase, title: 'Freelancing', description: 'Available for freelance projects and long-term collaborations.', color: '#7952B3' },
];

export default function ServicesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();

  return (
    <section id="services" className="relative section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Services
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            What I <span className="gradient-text">Offer</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map(({ icon: Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              custom={i + 2}
              whileHover={{ scale: 1.03, y: -8 }}
              className="glass p-6 group relative overflow-hidden"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
