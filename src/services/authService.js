import api from './api';

export const authService = {
  login: async ({ email, password }) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      // Return the data directly (assuming API returns { token, user, refreshToken })
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  verifyToken: async (token) => {
    try {
      const res = await api.post('/auth/verify', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.valid === true;
    } catch (error) {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  forgotPassword: async (email) => {
    try {
      const res = await api.post('/auth/forgot-password', { email });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  resetPassword: async ({ token, password }) => {
    try {
      const res = await api.post('/auth/reset-password', { token, password });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const res = await api.post('/auth/refresh', { refreshToken });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  verifyEmail: async (token) => {
    try {
      const res = await api.post('/auth/verify-email', { token });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (userId, updates) => {
    try {
      const res = await api.put(`/users/${userId}`, updates);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
