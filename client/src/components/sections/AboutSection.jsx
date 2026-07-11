import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiBriefcase, FiHome } from 'react-icons/fi';
import { useInView, useCountUp } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';
import AboutScene from '../three/AboutScene';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const stats = [
  { label: 'Projects Completed', value: 15 },
  { label: 'Happy Clients', value: 10 },
  { label: 'Years Experience', value: 2 },
  { label: 'Technologies', value: 20 },
];

export default function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <AboutScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f] z-[1]" />

      <div className="container-custom relative z-[2]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // About Me
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            Passionate <span className="gradient-text">Developer</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p variants={fadeInUp} custom={2} className="text-lg text-white/60 leading-relaxed">
              I'm a dedicated MERN Stack Developer with a passion for creating elegant, efficient, and user-friendly web applications. My journey in tech started with curiosity and evolved into a career building modern digital experiences.
            </motion.p>

            <motion.div variants={fadeInUp} custom={3} className="grid grid-cols-2 gap-4">
              {[
                { icon: FiMapPin, label: 'Current Location', value: 'Chennai', color: 'text-primary' },
                { icon: FiHome, label: 'Home', value: 'Kerala', color: 'text-accent' },
                { icon: FiBriefcase, label: 'Training', value: 'Besant Technologies', color: 'text-pink-500' },
                { icon: FiBookOpen, label: 'College', value: 'Malabar College of Engineering', color: 'text-yellow-500' },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <motion.div
                  key={label}
                  className="glass p-4"
                  variants={fadeInUp}
                  custom={4 + i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Icon className={`${color} mb-2`} size={20} />
                  <div className="text-xs text-white/40">{label}</div>
                  <div className="text-sm font-medium mt-1">{value}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ label, value }, i) => (
              <StatCard key={label} label={label} value={value} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, delay }) {
  const [count, ref, trigger] = useCountUp(value, 2000);
  const [inViewRef, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (isInView) trigger();
  }, [isInView, trigger]);

  return (
    <motion.div
      ref={(el) => { ref.current = el; inViewRef.current = el; }}
      className="glass p-6 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text">{count}+</div>
      <div className="text-sm text-white/40 mt-2">{label}</div>
    </motion.div>
  );
}

import { useEffect } from 'react';
