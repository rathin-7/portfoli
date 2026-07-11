import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiFile, FiFileText, FiFilePlus, FiImage, FiArchive, FiTrash2, FiEdit2, FiDownload, FiEye, FiSearch, FiFilter, FiX, FiCheck, FiRefreshCw } from 'react-icons/fi';

const API = '/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const categories = [
  { id: 'all', label: 'All Files', icon: FiFile },
  { id: 'resume', label: 'Resume', icon: FiFileText },
  { id: 'certificates', label: 'Certificates', icon: FiCheck },
  { id: 'documents', label: 'Documents', icon: FiFileText },
  { id: 'project-files', label: 'Project Files', icon: FiArchive },
  { id: 'images', label: 'Images', icon: FiImage },
  { id: 'others', label: 'Others', icon: FiFile },
];

const formatSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (mimeType) => {
  if (mimeType?.startsWith('image/')) return FiImage;
  if (mimeType?.includes('pdf')) return FiFileText;
  if (mimeType?.includes('zip') || mimeType?.includes('rar')) return FiArchive;
  return FiFile;
};

const isPreviewable = (mimeType) => mimeType?.startsWith('image/') || mimeType?.includes('pdf');

export default function AdminFileManager() {
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sort, setSort] = useState('-createdAt');
  const fileInputRef = useRef(null);

  const fetchFiles = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (search) params.set('search', search);
      params.set('sort', sort);
      const res = await fetch(`${API}/files?${params}`, { headers: headers() });
      const data = await res.json();
      setFiles(data.files || []);
    } catch { /* files fetch failed */ }
    setLoading(false);
  }, [category, search, sort]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/files/stats`, { headers: headers() });
      setStats(await res.json());
    } catch { /* files fetch failed */ }
  };

  useEffect(() => { fetchFiles(); fetchStats(); }, [fetchFiles]);

  const uploadFiles = async (fileList) => {
    if (!fileList.length) return;
    setUploading(true);
    setUploadProgress(0);
    for (let i = 0; i < fileList.length; i++) {
      const formData = new FormData();
      formData.append('file', fileList[i]);
      formData.append('category', 'others');
      await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round(((i + e.loaded / e.total) / fileList.length) * 100));
          }
        };
        xhr.onload = () => resolve();
        xhr.onerror = () => resolve();
        xhr.open('POST', `${API}/files`);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.send(formData);
      });
    }
    setUploading(false);
    setUploadProgress(0);
    fetchFiles();
    fetchStats();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this file?')) return;
    await fetch(`${API}/files/${id}`, { method: 'DELETE', headers: headers() });
    fetchFiles();
    fetchStats();
  };

  const handleUpdate = async (id, data) => {
    await fetch(`${API}/files/${id}`, { method: 'PUT', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setEditFile(null);
    fetchFiles();
  };

  const handleReplace = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    await fetch(`${API}/files/${id}/replace`, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, body: formData });
    fetchFiles();
    fetchStats();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Document Manager</h2>
        <div className="flex items-center gap-3">
          {stats && (
            <span className="text-sm text-white/40">{stats.totalFiles} files • {formatSize(stats.totalSize)}</span>
          )}
          <button onClick={() => fileInputRef.current?.click()} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
            <FiUpload size={14} /> Upload Files
          </button>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => uploadFiles(e.target.files)} />
        </div>
      </div>

      {uploading && (
        <div className="glass p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Uploading...</span>
            <span className="text-sm text-primary">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" animate={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center mb-6 transition-all ${dragOver ? 'border-primary bg-primary/5' : 'border-white/10'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <FiUpload className="mx-auto mb-3 text-white/20" size={32} />
        <p className="text-white/40 text-sm">Drag & drop files here, or <button onClick={() => fileInputRef.current?.click()} className="text-primary hover:underline">browse</button></p>
        <p className="text-white/20 text-xs mt-1">PDF, DOC, DOCX, PPT, PPTX, XLSX, ZIP, Images (max 50MB)</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${category === cat.id ? 'bg-primary text-white' : 'glass text-white/50 hover:text-white'}`}>
            <cat.icon size={14} /> {cat.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-glass pl-10" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-glass w-auto">
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="originalName">Name A-Z</option>
          <option value="-size">Largest</option>
          <option value="size">Smallest</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {files.map(file => {
            const Icon = getFileIcon(file.mimeType);
            return (
              <motion.div key={file._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="glass p-4 group relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${file.mimeType?.startsWith('image/') ? 'bg-pink-500/10 text-pink-400' : file.mimeType?.includes('pdf') ? 'bg-red-500/10 text-red-400' : 'bg-primary/10 text-primary'}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPreviewable(file.mimeType) && (
                      <button onClick={() => setPreviewFile(file)} className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center"><FiEye size={12} /></button>
                    )}
                    <a href={file.fileUrl} download className="w-7 h-7 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center"><FiDownload size={12} /></a>
                    <button onClick={() => setEditFile(file)} className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><FiEdit2 size={12} /></button>
                    <label className="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center cursor-pointer">
                      <FiRefreshCw size={12} />
                      <input type="file" className="hidden" onChange={(e) => e.target.files[0] && handleReplace(file._id, e.target.files[0])} />
                    </label>
                    <button onClick={() => handleDelete(file._id)} className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center"><FiTrash2 size={12} /></button>
                  </div>
                </div>
                <h4 className="font-medium text-sm truncate mb-1" title={file.originalName}>{file.originalName}</h4>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span>{formatSize(file.size)}</span>
                  <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                </div>
                <span className="inline-block mt-2 px-2 py-0.5 bg-white/5 rounded text-xs text-white/40 capitalize">{file.category.replace('-', ' ')}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {files.length === 0 && !loading && (
        <div className="text-center py-16 text-white/30">
          <FiFile size={48} className="mx-auto mb-4 opacity-30" />
          <p>No files found</p>
        </div>
      )}

      <AnimatePresence>
        {previewFile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewFile(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-semibold truncate">{previewFile.originalName}</h3>
                <button onClick={() => setPreviewFile(null)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10"><FiX size={16} /></button>
              </div>
              <div className="p-4 overflow-auto max-h-[75vh]">
                {previewFile.mimeType?.startsWith('image/') ? (
                  <img src={previewFile.fileUrl} alt={previewFile.originalName} className="max-w-full mx-auto rounded-lg" />
                ) : previewFile.mimeType?.includes('pdf') ? (
                  <iframe src={previewFile.fileUrl} className="w-full h-[70vh] rounded-lg" title="PDF Preview" />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editFile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditFile(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-lg mb-4">Edit File</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 block mb-1">Name</label>
                  <input value={editFile.originalName} onChange={(e) => setEditFile({ ...editFile, originalName: e.target.value })} className="input-glass" />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">Category</label>
                  <select value={editFile.category} onChange={(e) => setEditFile({ ...editFile, category: e.target.value })} className="input-glass">
                    {categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1">Description</label>
                  <textarea value={editFile.description || ''} onChange={(e) => setEditFile({ ...editFile, description: e.target.value })} className="input-glass resize-none" rows={2} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleUpdate(editFile._id, { originalName: editFile.originalName, category: editFile.category, description: editFile.description })} className="btn-primary text-sm py-2 flex-1">Save Changes</button>
                  <button onClick={() => setEditFile(null)} className="btn-secondary text-sm py-2">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
