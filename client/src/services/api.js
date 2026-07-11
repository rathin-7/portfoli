const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

const api = {
  get: async (url) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async (url, data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  put: async (url, data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  delete: async (url) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

export const projectService = {
  getAll: () => api.get('/projects'),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const skillService = {
  getAll: () => api.get('/skills'),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const experienceService = {
  getAll: () => api.get('/experiences'),
  create: (data) => api.post('/experiences', data),
  update: (id, data) => api.put(`/experiences/${id}`, data),
  delete: (id) => api.delete(`/experiences/${id}`),
};

export const messageService = {
  send: (data) => api.post('/messages', data),
  getAll: () => api.get('/messages'),
  markRead: (id) => api.put(`/messages/${id}/read`),
  delete: (id) => api.delete(`/messages/${id}`),
};

export const certificateService = {
  getAll: () => api.get('/certificates'),
  create: (data) => api.post('/certificates', data),
  update: (id, data) => api.put(`/certificates/${id}`, data),
  delete: (id) => api.delete(`/certificates/${id}`),
};

export const educationService = {
  getAll: () => api.get('/education'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`),
};

export const fileService = {
  getAll: (params = '') => api.get(`/files?${params}`),
  get: (id) => api.get(`/files/${id}`),
  upload: async (formData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/files`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  update: (id, data) => api.put(`/files/${id}`, data),
  replace: async (id, formData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/files/${id}/replace`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: formData });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  delete: (id) => api.delete(`/files/${id}`),
  getStats: () => api.get('/files/stats'),
};

export const resumeService = {
  get: () => api.get('/resume'),
  upload: async (formData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/resume`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  update: (data) => api.put('/resume', data),
  delete: () => api.delete('/resume'),
};

export const authService = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};
