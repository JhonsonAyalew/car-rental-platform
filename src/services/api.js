// /src/services/api.js
import axios from 'axios';

// Check if we're using mock mode
const USE_MOCK = true; // Set to false when you have a real backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent long waiting
  timeout: 10000,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Don't make actual API calls in mock mode
    if (USE_MOCK) {
      console.warn('🚫 Mock mode active - Not making API call to:', config.url);
      // Create a mock abort controller to prevent actual network requests
      const controller = new AbortController();
      config.signal = controller.signal;
      controller.abort('Mock mode - no backend available');
      return Promise.reject({ message: 'Mock mode active', __isMockError: true });
    }
    
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't try to refresh if it's a mock error
    if (error.__isMockError) {
      return Promise.reject(error);
    }
    
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Mock API handler - prevents any actual network requests
export const mockApi = {
  isMockMode: USE_MOCK,
  
  // Helper to check if we should use mock
  shouldMock: () => USE_MOCK,
  
  // Disable mock mode (when backend is ready)
  disableMock: () => {
    console.log('Disabling mock mode - switching to real API');
    USE_MOCK = false;
  },
  
  // Enable mock mode
  enableMock: () => {
    console.log('Enabling mock mode - using mock authentication');
    USE_MOCK = true;
  }
};

export default api;
