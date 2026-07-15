import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import CustomCursor from './components/cursor/CustomCursor';
import ScrollProgress from './components/scroll/ScrollProgress';
import Loader from './components/loader/Loader';
import HomePage from './pages/HomePage';

const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const AdminSkills = lazy(() => import('./pages/admin/Skills'));
const AdminExperience = lazy(() => import('./pages/admin/Experience'));
const AdminMessages = lazy(() => import('./pages/admin/Messages'));
const AdminFileManager = lazy(() => import('./pages/admin/Files'));
const AdminResume = lazy(() => import('./pages/admin/Resume'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));

const AdminFallback = () => (
  <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const { loading } = useApp();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (loading) return <Loader />;

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {!isAdmin && <Navbar />}
      <Suspense fallback={<AdminFallback />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="files" element={<AdminFileManager />} />
            <Route path="resume" element={<AdminResume />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
    </>
  );
}
