import api from './api';

// ─── submissionService ───────────────────────────────
export const submissionService = {
  create:   (data) => api.post('/submissions', data).then(r => r.data),
  getAll:   (p)    => api.get('/submissions', { params: p }).then(r => r.data),
  getMine:  ()     => api.get('/submissions/mine').then(r => r.data),
  getById:  (id)   => api.get(`/submissions/${id}`).then(r => r.data),
  approve:  (id, note)   => api.patch(`/submissions/${id}/approve`, { note }).then(r => r.data),
  reject:   (id, reason) => api.patch(`/submissions/${id}/reject`, { reason }).then(r => r.data),
  update:   (id, data)   => api.put(`/submissions/${id}`, data).then(r => r.data),
  delete:   (id)         => api.delete(`/submissions/${id}`).then(r => r.data),
};

// ─── userService ────────────────────────────────────
export const userService = {
  getAll:    (p)   => api.get('/users', { params: p }).then(r => r.data),
  getById:   (id)  => api.get(`/users/${id}`).then(r => r.data),
  updateMe:  (d)   => api.put('/users/me', d).then(r => r.data),
  updateById:(id,d)=> api.put(`/users/${id}`, d).then(r => r.data),
  suspend:   (id)  => api.patch(`/users/${id}/suspend`).then(r => r.data),
  activate:  (id)  => api.patch(`/users/${id}/activate`).then(r => r.data),
  delete:    (id)  => api.delete(`/users/${id}`).then(r => r.data),
  getOwners: (p)   => api.get('/users/owners', { params: p }).then(r => r.data),
  getCustomers: (p)=> api.get('/users/customers', { params: p }).then(r => r.data),
};

// ─── notificationService ────────────────────────────
export const notificationService = {
  getAll:   ()     => api.get('/notifications').then(r => r.data),
  markRead: (id)   => api.patch(`/notifications/${id}/read`).then(r => r.data),
  markAllRead: ()  => api.patch('/notifications/read-all').then(r => r.data),
  delete:   (id)   => api.delete(`/notifications/${id}`).then(r => r.data),
};

// ─── uploadService ──────────────────────────────────
export const uploadService = {
  uploadImage: (file, onProgress) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => onProgress?.(Math.round((e.loaded * 100) / e.total)),
    }).then(r => r.data);
  },
  uploadDocument: (file, onProgress) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => onProgress?.(Math.round((e.loaded * 100) / e.total)),
    }).then(r => r.data);
  },
  uploadMultiple: (files, type = 'image', onProgress) => {
    const formData = new FormData();
    files.forEach((f, i) => formData.append(`file_${i}`, f));
    return api.post(`/upload/multiple?type=${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => onProgress?.(Math.round((e.loaded * 100) / e.total)),
    }).then(r => r.data);
  },
};
