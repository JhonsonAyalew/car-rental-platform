import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/* ─── Request interceptor: attach token ─── */
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('equiprent-user');
    if (user) {
      try {
        const { token } = JSON.parse(user);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch (_) { /* ignore */ }
    }
    return config;
  },
  (err) => Promise.reject(err),
);

/* ─── Response interceptor: handle 401 ─── */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('equiprent-user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export default api;

