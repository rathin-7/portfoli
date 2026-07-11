import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLayout, FiFolder, FiCode, FiBriefcase, FiMessageSquare, FiLogOut, FiMenu, FiX, FiFile, FiDownload } from 'react-icons/fi';

const sidebarLinks = [
  { to: '/admin', icon: FiLayout, label: 'Dashboard', exact: true },
  { to: '/admin/projects', icon: FiFolder, label: 'Projects' },
  { to: '/admin/skills', icon: FiCode, label: 'Skills' },
  { to: '/admin/experience', icon: FiBriefcase, label: 'Experience' },
  { to: '/admin/files', icon: FiFile, label: 'Documents' },
  { to: '/admin/resume', icon: FiDownload, label: 'Resume' },
  { to: '/admin/messages', icon: FiMessageSquare, label: 'Messages' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f]">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white/5 border-r border-white/10 flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bold text-lg gradient-text">Admin Panel</h2>
          <p className="text-xs text-white/30 mt-1">Radhin Portfolio</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ to, icon: Icon, label, exact }) => {
            const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive ? 'bg-primary/20 text-primary' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full transition-all">
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-xl flex items-center px-6 gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/50 hover:text-white">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <h1 className="font-semibold">Dashboard</h1>
          <div className="ml-auto flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm text-white/50 hover:text-primary transition-colors">
              View Portfolio
            </a>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
