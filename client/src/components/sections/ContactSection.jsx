import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiMapPin, FiPhone, FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { useInView } from '../../hooks/useAnimations';
import { useApp } from '../../context/AppContext';
import ContactScene from '../three/ContactScene';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { setCursorVariant } = useApp();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <ContactScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f] z-[1]" />

      <div className="container-custom relative z-[2]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} custom={0} className="text-primary font-mono text-sm">
            // Contact
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl font-bold mt-4">
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p variants={fadeInUp} custom={2} className="text-white/50 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </motion.p>

            {[
              { icon: FiMapPin, label: 'Location', value: 'Chennai, India' },
              { icon: FiMail, label: 'Email', value: 'rathinraj1122@gmail.com' },
              { icon: FiPhone, label: 'Phone', value: '+91 6238659224' },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                variants={fadeInUp}
                custom={3 + i}
                className="flex items-center gap-4 glass p-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs text-white/40">{label}</div>
                  <div className="text-sm font-medium">{value}</div>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} custom={6} className="flex gap-3 pt-4">
              {[
                { icon: FiGithub, href: 'https://github.com/radhinraj' },
                { icon: FiLinkedin, href: 'https://linkedin.com/in/radhinraj' },
                { icon: FiInstagram, href: 'https://www.instagram.com/ra.th.in?igsh=MWNvZTB1ZzQ1a2p4ZQ%3D%3D&utm_source=qr' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="glass p-8 space-y-5"
          >
            <motion.div variants={fadeInUp} custom={2} className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="input-glass"
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="input-glass"
              />
            </motion.div>
            <motion.input
              variants={fadeInUp}
              custom={3}
              type="text"
              placeholder="Subject"
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              className="input-glass"
            />
            <motion.textarea
              variants={fadeInUp}
              custom={4}
              placeholder="Your Message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="input-glass resize-none"
            />
            <motion.button
              variants={fadeInUp}
              custom={5}
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? <><FiCheckCircle /> Sent!</> : <><FiSend /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
