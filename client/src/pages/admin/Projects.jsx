import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '', shortDescription: '', description: '', techStack: '', liveUrl: '', githubUrl: '', featured: false });
  const [editing, setEditing] = useState(null);

  const fetchProjects = async () => {
    const res = await fetch(`${API}/projects`, { headers: headers() });
    setProjects(await res.json());
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, techStack: form.techStack.split(',').map(s => s.trim()) };
    if (editing) {
      await fetch(`${API}/projects/${editing}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) });
    } else {
      await fetch(`${API}/projects`, { method: 'POST', headers: headers(), body: JSON.stringify(data) });
    }
    setForm({ title: '', slug: '', shortDescription: '', description: '', techStack: '', liveUrl: '', githubUrl: '', featured: false });
    setEditing(null);
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: headers() });
    fetchProjects();
  };

  const handleEdit = (p) => {
    setEditing(p._id);
    setForm({ title: p.title, slug: p.slug, shortDescription: p.shortDescription, description: p.description, techStack: p.techStack?.join(', ') || '', liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '', featured: p.featured });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="glass p-6 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-glass" />
          <input placeholder="Slug" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="input-glass" />
        </div>
        <input placeholder="Short Description" required value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className="input-glass" />
        <textarea placeholder="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-glass resize-none" rows={3} />
        <input placeholder="Tech Stack (comma separated)" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} className="input-glass" />
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Live URL" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} className="input-glass" />
          <input placeholder="GitHub URL" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} className="input-glass" />
        </div>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
          Featured
        </label>
        <button type="submit" className="btn-primary flex items-center gap-2">
          <FiPlus size={16} /> {editing ? 'Update' : 'Add'} Project
        </button>
      </form>

      <div className="space-y-3">
        {projects.map(p => (
          <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-white/40">{p.shortDescription}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20"><FiEdit2 size={14} /></button>
              <button onClick={() => handleDelete(p._id)} className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><FiTrash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
