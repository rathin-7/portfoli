import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import HeroScene from '../three/HeroScene';
import { useApp } from '../../context/AppContext';
import profile from '../../config/profile.json';

export default function HeroSection() {
  const { setCursorVariant } = useApp();

  const titles = [
    'MERN Stack Developer',
    'React Specialist',
    'Node.js Developer',
    'Full Stack Engineer',
    'UI/UX Enthusiast',
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-transparent to-[#0a0a0f] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/50 z-[1]" />

      <div className="container-custom relative z-[2] px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 glass text-sm text-primary font-medium rounded-full mb-6">
              Welcome to my universe
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Hi,
              <br />
              I'm{' '}
              <span className="gradient-text-animated">{profile.name}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-mono text-white/80">
              <TypeAnimation
                sequence={titles.flatMap(t => [t, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-white/50 mb-10 max-w-xl leading-relaxed"
          >
            {profile.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary flex items-center gap-2">
              View Projects
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary flex items-center gap-2">
              <FiMail /> Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-4"
          >
            {[
              { icon: FiGithub, href: profile.socials.github },
              { icon: FiLinkedin, href: profile.socials.linkedin },
              { icon: FiMail, href: profile.socials.email },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/50 hover:text-primary transition-all"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
        >
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profile.stats).map(([key, value], i) => (
              <motion.div
                key={key}
                className="glass p-4 text-center min-w-[100px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <div className="text-2xl font-bold gradient-text">{value}+</div>
                <div className="text-xs text-white/40 mt-1 capitalize">{key}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex flex-col items-center gap-2 text-white/30 hover:text-primary transition-colors">
          <span className="text-xs font-mono">Scroll Down</span>
          <FiArrowDown size={16} />
        </a>
      </motion.div>
    </section>
  );
}
