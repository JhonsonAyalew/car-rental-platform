import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Verify token with backend
          const isValid = await authService.verifyToken(storedToken);
          if (isValid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            logout();
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    
    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      if (response.success) {
        const { token, user: userData } = response.data;
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setToken(token);
        setUser(userData);
        
        // Redirect based on role
        redirectToDashboard(userData.role);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response.success) {
        // Auto-login after registration
        const loginResponse = await login(userData.email, userData.password);
        return loginResponse;
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Redirect based on user role
  const redirectToDashboard = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'super_admin':
        navigate('/super-admin/dashboard');
        break;
      case 'car_owner':
        navigate('/owner/dashboard');
        break;
      case 'customer':
        navigate('/customer/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;
    if (typeof roles === 'string') return user.role === roles;
    return roles.includes(user.role);
  };

  // Update user profile
  const updateUser = async (updates) => {
    try {
      const response = await authService.updateProfile(user.id, updates);
      if (response.success) {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    updateUser,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
