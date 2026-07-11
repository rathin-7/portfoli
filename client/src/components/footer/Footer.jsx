import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiHeart } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, href: 'https://github.com/radhinraj', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/radhinraj', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://www.instagram.com/ra.th.in?igsh=MWNvZTB1ZzQ1a2p4ZQ%3D%3D&utm_source=qr', label: 'Instagram' },
  { icon: FiMail, href: 'mailto:rathinraj1122@gmail.com', label: 'Email' },
];

const links = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="container-custom relative section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold">R</div>
              <span className="font-bold text-lg">Radhin</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              MERN Stack Developer crafting digital experiences with passion and precision.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a key={link.name} href={link.href} className="text-white/50 hover:text-primary text-sm transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Radhin. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Built with <FiHeart className="text-red-500" /> using React & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
