// ─── carService.js ──────────────────────────────────
import api from './api';

export const carService = {
  getAll: (params) => api.get('/equipment', { params }).then(r => r.data),
  getById: (id)    => api.get(`/equipment/${id}`).then(r => r.data),
  create: (data)   => api.post('/equipment', data).then(r => r.data),
  update: (id, d)  => api.put(`/equipment/${id}`, d).then(r => r.data),
  delete: (id)     => api.delete(`/equipment/${id}`).then(r => r.data),
  getFeatured: ()  => api.get('/equipment/featured').then(r => r.data),
  search: (query)  => api.get('/equipment/search', { params: { q: query } }).then(r => r.data),
  getCategories: () => api.get('/categories').then(r => r.data),
};
