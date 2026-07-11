import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const testimonials = [
  { name: 'Client One', role: 'Startup Founder', text: 'Radhin delivered an exceptional e-commerce platform. His attention to detail and technical skills are outstanding.', rating: 5 },
  { name: 'Client Two', role: 'Project Manager', text: 'Professional, punctual, and incredibly talented. The MERN stack application exceeded our expectations.', rating: 5 },
  { name: 'Client Three', role: 'Tech Lead', text: 'One of the best developers I have worked with. Clean code, great communication, and delivered on time.', rating: 5 },
];

export default function TestimonialsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();

  return (
    <section className="relative section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Testimonials
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            What People <span className="gradient-text">Say</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              custom={i + 2}
              className="glass p-6 relative overflow-hidden"
              whileHover={{ scale: 1.03, y: -5 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              <div className="text-4xl text-primary/20 font-serif mb-4">"</div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-500 text-sm">&#9733;</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
