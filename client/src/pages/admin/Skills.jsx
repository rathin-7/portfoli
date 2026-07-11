import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'frontend', level: 80, color: '#8b5cf6' });
  const [editing, setEditing] = useState(null);

  const fetchSkills = async () => { const res = await fetch(`${API}/skills`, { headers: headers() }); setSkills(await res.json()); };
  useEffect(() => { fetchSkills(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fetch(`${API}/skills/${editing}`, { method: 'PUT', headers: headers(), body: JSON.stringify(form) });
    } else {
      await fetch(`${API}/skills`, { method: 'POST', headers: headers(), body: JSON.stringify(form) });
    }
    setForm({ name: '', category: 'frontend', level: 80, color: '#8b5cf6' });
    setEditing(null);
    fetchSkills();
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API}/skills/${id}`, { method: 'DELETE', headers: headers() }); fetchSkills(); } };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Manage Skills</h2>

      <form onSubmit={handleSubmit} className="glass p-6 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Skill Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-glass" />
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-glass">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="tools">Tools</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/40 mb-1 block">Level: {form.level}%</label>
            <input type="range" min="0" max="100" value={form.level} onChange={e => setForm({ ...form, level: parseInt(e.target.value) })} className="w-full" />
          </div>
          <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="w-full h-10 rounded-xl cursor-pointer" />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2"><FiPlus size={16} /> {editing ? 'Update' : 'Add'} Skill</button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map(s => (
          <motion.div key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${s.color}20`, color: s.color }}>{s.name.charAt(0)}</div>
              <div>
                <div className="font-medium text-sm">{s.name}</div>
                <div className="text-xs text-white/30">{s.category} • {s.level}%</div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditing(s._id); setForm({ name: s.name, category: s.category, level: s.level, color: s.color }); }} className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><FiEdit2 size={12} /></button>
              <button onClick={() => handleDelete(s._id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"><FiTrash2 size={12} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
