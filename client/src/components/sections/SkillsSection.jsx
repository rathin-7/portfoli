import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';
import SkillsScene from '../three/SkillsScene';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const categories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
];

const skills = [
  { name: 'React', category: 'frontend', level: 90, color: '#61DAFB' },
  { name: 'JavaScript', category: 'frontend', level: 92, color: '#F7DF1E' },
  { name: 'HTML', category: 'frontend', level: 95, color: '#E34F26' },
  { name: 'CSS', category: 'frontend', level: 90, color: '#1572B6' },
  { name: 'Tailwind CSS', category: 'frontend', level: 88, color: '#06B6D4' },
  { name: 'Bootstrap', category: 'frontend', level: 85, color: '#7952B3' },
  { name: 'Node.js', category: 'backend', level: 85, color: '#339933' },
  { name: 'Express.js', category: 'backend', level: 82, color: '#000000' },
  { name: 'MongoDB', category: 'database', level: 80, color: '#47A248' },
  { name: 'MySQL', category: 'database', level: 75, color: '#4479A1' },
  { name: 'Git', category: 'tools', level: 85, color: '#F05032' },
  { name: 'GitHub', category: 'tools', level: 88, color: '#181717' },
  { name: 'VS Code', category: 'tools', level: 90, color: '#007ACC' },
  { name: 'Postman', category: 'tools', level: 82, color: '#FF6C37' },
  { name: 'Cloudinary', category: 'tools', level: 78, color: '#F23D6F' },
  { name: 'JWT', category: 'tools', level: 80, color: '#000000' },
];

export default function SkillsSection() {
  const [active, setActive] = useState('all');
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();
  const filtered = active === 'all' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <SkillsScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f] z-[1]" />

      <div className="container-custom relative z-[2]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Skills
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            My <span className="gradient-text">Tech Stack</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              variants={fadeInUp}
              custom={i + 2}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'glass text-white/60 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: -5 }}
              style={{ perspective: 600 }}
              className="glass p-6 text-center group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-300 group-hover:shadow-lg"
                style={{ backgroundColor: `${skill.color}20`, color: skill.color, boxShadow: `0 0 0px ${skill.color}00` }}
              >
                {skill.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-sm mb-3">{skill.name}</h3>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                />
              </div>
              <span className="text-xs text-white/30 mt-2 block">{skill.level}%</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
