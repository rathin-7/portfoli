import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiTrash2, FiEye } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => { const res = await fetch(`${API}/messages`, { headers: headers() }); setMessages(await res.json()); };
  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id) => {
    await fetch(`${API}/messages/${id}/read`, { method: 'PUT', headers: headers() });
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete?')) return;
    await fetch(`${API}/messages/${id}`, { method: 'DELETE', headers: headers() });
    setSelected(null);
    fetchMessages();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Messages</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {messages.map(m => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`glass p-4 cursor-pointer transition-all ${selected?._id === m._id ? 'border-primary/50' : ''} ${!m.read ? 'border-l-2 border-l-primary' : ''}`}
              onClick={() => { setSelected(m); markRead(m._id); }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{m.name}</span>
                {!m.read && <span className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <p className="text-xs text-white/30 truncate">{m.message}</p>
            </motion.div>
          ))}
          {messages.length === 0 && <p className="text-white/30 text-sm text-center py-8">No messages yet</p>}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-primary text-sm">{selected.email}</a>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteMessage(selected._id)} className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"><FiTrash2 size={14} /></button>
                </div>
              </div>
              {selected.subject && <div className="text-sm text-white/40 mb-4">Subject: {selected.subject}</div>}
              <p className="text-white/60 leading-relaxed">{selected.message}</p>
              <div className="text-xs text-white/20 mt-6">{new Date(selected.createdAt).toLocaleString()}</div>
            </div>
          ) : (
            <div className="glass p-12 text-center text-white/30">
              <FiMail size={48} className="mx-auto mb-4 opacity-30" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
