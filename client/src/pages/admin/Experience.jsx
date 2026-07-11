import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({ company: '', position: '', description: '', achievements: '', startDate: '', endDate: '', location: '' });
  const [editing, setEditing] = useState(null);

  const fetchExperiences = async () => { const res = await fetch(`${API}/experiences`, { headers: headers() }); setExperiences(await res.json()); };
  useEffect(() => { fetchExperiences(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, achievements: form.achievements.split('\n').filter(a => a.trim()) };
    if (editing) {
      await fetch(`${API}/experiences/${editing}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) });
    } else {
      await fetch(`${API}/experiences`, { method: 'POST', headers: headers(), body: JSON.stringify(data) });
    }
    setForm({ company: '', position: '', description: '', achievements: '', startDate: '', endDate: '', location: '' });
    setEditing(null);
    fetchExperiences();
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API}/experiences/${id}`, { method: 'DELETE', headers: headers() }); fetchExperiences(); } };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Manage Experience</h2>

      <form onSubmit={handleSubmit} className="glass p-6 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Company" required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="input-glass" />
          <input placeholder="Position" required value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="input-glass" />
        </div>
        <textarea placeholder="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-glass resize-none" rows={2} />
        <textarea placeholder="Achievements (one per line)" value={form.achievements} onChange={e => setForm({ ...form, achievements: e.target.value })} className="input-glass resize-none" rows={3} />
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-white/40 block mb-1">Start Date</label>
            <input type="date" required value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="input-glass" />
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-1">End Date</label>
            <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="input-glass" />
          </div>
          <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="input-glass" />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2"><FiPlus size={16} /> {editing ? 'Update' : 'Add'} Experience</button>
      </form>

      <div className="space-y-3">
        {experiences.map(exp => (
          <motion.div key={exp._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{exp.position}</h3>
              <p className="text-sm text-white/40">{exp.company} • {exp.location}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(exp._id); setForm({ company: exp.company, position: exp.position, description: exp.description, achievements: exp.achievements?.join('\n') || '', startDate: exp.startDate?.slice(0, 10) || '', endDate: exp.endDate?.slice(0, 10) || '', location: exp.location || '' }); }} className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><FiEdit2 size={14} /></button>
              <button onClick={() => handleDelete(exp._id)} className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"><FiTrash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
