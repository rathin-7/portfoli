import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiTrash2, FiDownload, FiEye, FiFileText, FiRefreshCw, FiCheck, FiAlertCircle } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

export default function AdminResume() {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchResume = async () => {
    try {
      const res = await fetch(`${API}/resume`, { headers: headers() });
      const data = await res.json();
      setResume(data);
    } catch { /* resume fetch failed */ }
  };

  useEffect(() => { fetchResume(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showMessage('error', 'Only PDF files are allowed');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API}/resume`, { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, body: formData });
      if (res.ok) {
        await fetchResume();
        showMessage('success', 'Resume uploaded successfully');
      } else {
        const data = await res.json();
        showMessage('error', data.message || 'Upload failed');
      }
    } catch (e) {
      showMessage('error', 'Upload failed — network error');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async () => {
    if (!confirm('Delete current resume? This cannot be undone.')) return;
    try {
      const res = await fetch(`${API}/resume`, { method: 'DELETE', headers: headers() });
      if (res.ok) {
        setResume(null);
        showMessage('success', 'Resume deleted');
      } else {
        showMessage('error', 'Delete failed');
      }
    } catch (e) {
      showMessage('error', 'Delete failed');
    }
  };

  const hasResume = resume?.fileUrl;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Resume Manager</h2>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {message.type === 'success' ? <FiCheck size={16} /> : <FiAlertCircle size={16} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <FiFileText size={28} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Resume PDF</h3>
            <p className="text-sm text-white/40">Upload and manage your resume. The frontend always serves the latest version.</p>
          </div>
        </div>

        {hasResume ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <FiFileText className="text-red-400 shrink-0" size={20} />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{resume.fileName || 'Resume'}</p>
                  <p className="text-xs text-white/30">Uploaded {new Date(resume.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setPreviewOpen(true)} title="Preview" className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <FiEye size={14} />
                </button>
                <a href="/api/resume/download" title="Download" className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors">
                  <FiDownload size={14} />
                </a>
                <label title="Replace" className="w-9 h-9 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center hover:bg-yellow-500/20 transition-colors cursor-pointer">
                  <FiRefreshCw size={14} />
                  <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
                </label>
                <button onClick={handleDelete} title="Delete" className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-xs text-white/40 mb-1">File Name</div>
                <div className="text-sm font-medium truncate">{resume.fileName || '—'}</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-xs text-white/40 mb-1">Status</div>
                <div className="text-sm font-medium text-green-400">Active</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="text-xs text-white/40 mb-1">Last Updated</div>
                <div className="text-sm font-medium">{new Date(resume.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-primary/30 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUpload className="mx-auto mb-4 text-white/20" size={40} />
            <p className="text-white/40 mb-2">No resume uploaded</p>
            <p className="text-white/20 text-sm">Click to upload your resume PDF</p>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleUpload} />

        {uploading && (
          <div className="mt-4 flex items-center gap-3 text-sm text-primary">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Uploading resume...
          </div>
        )}
      </div>

      <div className="glass p-6">
        <h3 className="font-semibold mb-3">How it works</h3>
        <ul className="space-y-2 text-sm text-white/40">
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#9656;</span> Upload a PDF and it becomes the active resume</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#9656;</span> The "Download Resume" button on the homepage always serves the latest PDF</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#9656;</span> Replace or delete at any time — changes are instant</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">&#9656;</span> Previous resume files are automatically cleaned up</li>
        </ul>
      </div>

      <AnimatePresence>
        {previewOpen && hasResume && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-semibold">Resume Preview</h3>
                <button onClick={() => setPreviewOpen(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10">✕</button>
              </div>
              <iframe src="/api/resume/preview" className="w-full h-[80vh]" title="Resume Preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
