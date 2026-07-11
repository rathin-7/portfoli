import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle, FiCode } from 'react-icons/fi';
import { useInView } from '../../hooks/useAnimations';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const achievements = [
  { icon: FiAward, title: 'MERN Stack Certification', description: 'Completed comprehensive MERN stack development training at Besant Technologies', date: 'Dec 2023', color: '#8b5cf6' },
  { icon: FiCheckCircle, title: 'Web Dev Internship', description: 'Successfully completed 6-month internship as MERN Stack Developer at BDreamz Global Solutions', date: 'Jun 2024', color: '#06b6d4' },
  { icon: FiCode, title: '15+ Projects', description: 'Built and deployed 15+ full-stack web applications across various domains', date: '2024', color: '#22c55e' },
];

export default function AchievementsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className="relative section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Achievements
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            My <span className="gradient-text">Milestones</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {achievements.map(({ icon: Icon, title, description, date, color }, i) => (
            <motion.div
              key={title}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              custom={i + 2}
              className="glass p-6 text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm mb-3">{description}</p>
              <span className="text-xs text-white/30 font-mono">{date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
