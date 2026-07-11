import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiCode, FiBriefcase, FiMessageSquare } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experiences, messages] = await Promise.all([
          fetch(`${API}/projects`, { headers: headers() }).then(r => r.json()),
          fetch(`${API}/skills`, { headers: headers() }).then(r => r.json()),
          fetch(`${API}/experiences`, { headers: headers() }).then(r => r.json()),
          fetch(`${API}/messages`, { headers: headers() }).then(r => r.json()),
        ]);
        setStats({
          projects: projects.length || 0,
          skills: skills.length || 0,
          experiences: experiences.length || 0,
          messages: messages.length || 0,
        });
      } catch { /* stats fetch failed */ }
    };
    fetchStats();
  }, []);

  const cards = [
    { icon: FiFolder, label: 'Projects', value: stats.projects, color: '#8b5cf6' },
    { icon: FiCode, label: 'Skills', value: stats.skills, color: '#06b6d4' },
    { icon: FiBriefcase, label: 'Experience', value: stats.experiences, color: '#22c55e' },
    { icon: FiMessageSquare, label: 'Messages', value: stats.messages, color: '#f59e0b' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                <Icon size={22} />
              </div>
            </div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-white/40 mt-1">{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
