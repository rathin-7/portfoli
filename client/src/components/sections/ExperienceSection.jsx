import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useInView } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const experiences = [
  {
    company: 'BDreamz Global Solutions',
    position: 'MERN Stack Developer Intern',
    period: 'Jan 2024 - Jun 2024',
    location: 'Chennai',
    description: 'Developed full-stack web applications using the MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    achievements: [
      'Built 3 full-stack applications from scratch',
      'Implemented RESTful APIs with Node.js and Express',
      'Developed responsive UIs with React and Tailwind CSS',
      'Integrated MongoDB for data persistence',
    ],
  },
];

export default function ExperienceSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();

  return (
    <section id="experience" className="relative section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Experience
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            My <span className="gradient-text">Journey</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                custom={i + 2}
                className={`relative mb-12 ${i % 2 === 0 ? 'md:pr-[55%]' : 'md:pl-[55%]'} pl-12 md:pl-0`}
              >
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-[#0a0a0f] z-10" />

                <motion.div
                  className="glass p-6"
                  whileHover={{ scale: 1.02, y: -3 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className="flex items-center gap-2 text-primary text-sm mb-2">
                    <FiBriefcase size={14} />
                    <span>{exp.position}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exp.company}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-white/40 mb-4">
                    <span className="flex items-center gap-1"><FiCalendar size={12} /> {exp.period}</span>
                    <span className="flex items-center gap-1"><FiMapPin size={12} /> {exp.location}</span>
                  </div>
                  <p className="text-white/50 text-sm mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-white/40 flex items-start gap-2">
                        <span className="text-accent mt-1">&#9656;</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
