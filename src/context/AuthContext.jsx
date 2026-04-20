// /src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Mock user database - built right into the context
const MOCK_USERS = [
  {
    id: '1',
    name: 'Super Admin User',
    email: 'superadmin@equiprent.et',
    password: 'superadmin123',
    role: 'superadmin',
    avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=dc2626&color=fff',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@equiprent.et',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=E8650A&color=fff',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'John Owner',
    email: 'owner@equiprent.et',
    password: 'owner123',
    role: 'owner',
    avatar: 'https://ui-avatars.com/api/?name=John+Owner&background=8b5cf6&color=fff',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sarah Customer',
    email: 'customer@equiprent.et',
    password: 'customer123',
    role: 'customer',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Customer&background=3b82f6&color=fff',
    createdAt: new Date().toISOString()
  }
];

// Helper functions
const generateToken = (user) => {
  return `mock-token-${user.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateRefreshToken = (user) => {
  return `mock-refresh-${user.id}-${Date.now()}`;
};

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

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
  const navigate = useNavigate();

  // Initialize auth from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Verify token (mock check)
          if (storedToken && storedToken.startsWith('mock-token-')) {
            setUser(JSON.parse(storedUser));
            console.log('✅ Auth restored from storage');
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    console.log('🔐 Login called for:', email);
    try {
      setLoading(true);
      await delay(800); // Simulate network delay
      
      // Find user
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        console.log('❌ Login failed: Invalid credentials');
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Generate tokens
      const token = generateToken(foundUser);
      const refreshToken = generateRefreshToken(foundUser);
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      console.log('✅ Login successful for:', userWithoutPassword.name, 'Role:', userWithoutPassword.role);
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('❌ Login error:', error.message);
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    console.log('📝 Register called for:', userData.email);
    try {
      setLoading(true);
      await delay(800);
      
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        return { 
          success: false, 
          error: 'User with this email already exists' 
        };
      }
      
      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'customer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=E8650A&color=fff`,
        createdAt: new Date().toISOString()
      };
      
      // Add to mock database
      MOCK_USERS.push(newUser);
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Generate tokens
      const token = generateToken(newUser);
      const refreshToken = generateRefreshToken(newUser);
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      console.log('✅ Registration successful for:', userWithoutPassword.name);
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('❌ Registration error:', error.message);
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    console.log('🚪 Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;
    if (typeof roles === 'string') return user.role === roles;
    return roles.includes(user.role);
  };

  // Check if user is super admin
  const isSuperAdmin = () => {
    return user?.role === 'superadmin';
  };

  // Check if user is admin (including super admin)
  const isAdmin = () => {
    return user?.role === 'admin' || user?.role === 'superadmin';
  };

  // Update user profile
  const updateUser = async (updates) => {
    try {
      await delay(500);
      
      // Find and update user in mock database
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
      }
      
      // Update current user
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update error:', error);
      return { success: false, error: error.message };
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken || !refreshToken.startsWith('mock-refresh-')) {
        throw new Error('Invalid refresh token');
      }
      
      const userId = refreshToken.split('-')[2];
      const foundUser = MOCK_USERS.find(u => u.id === userId);
      
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      const newToken = generateToken(foundUser);
      localStorage.setItem('token', newToken);
      
      return { success: true, token: newToken };
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return { success: false, error: error.message };
    }
  };

  // Get user by ID
  const getUserById = async (userId) => {
    await delay(300);
    const foundUser = MOCK_USERS.find(u => u.id === userId);
    if (!foundUser) return null;
    
    const { password: _, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  };

  // Get all users (admin only)
  const getAllUsers = async () => {
    await delay(500);
    return MOCK_USERS.map(({ password, ...user }) => user);
  };

  // Delete user (super admin only)
  const deleteUser = async (userId) => {
    if (!isSuperAdmin()) {
      return { success: false, error: 'Unauthorized: Only super admin can delete users' };
    }
    
    await delay(500);
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }
    
    // Prevent deleting yourself
    if (MOCK_USERS[userIndex].id === user?.id) {
      return { success: false, error: 'Cannot delete your own account' };
    }
    
    MOCK_USERS.splice(userIndex, 1);
    return { success: true, message: 'User deleted successfully' };
  };

  // Update user role (super admin only)
  const updateUserRole = async (userId, newRole) => {
    if (!isSuperAdmin()) {
      return { success: false, error: 'Unauthorized: Only super admin can update user roles' };
    }
    
    await delay(500);
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }
    
    const validRoles = ['superadmin', 'admin', 'owner', 'customer'];
    if (!validRoles.includes(newRole)) {
      return { success: false, error: 'Invalid role' };
    }
    
    MOCK_USERS[userIndex].role = newRole;
    
    // If updating current user, update state
    if (MOCK_USERS[userIndex].id === user?.id) {
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    
    return { success: true, user: MOCK_USERS[userIndex] };
  };

  // Get dashboard path based on role
  const getDashboardPath = () => {
    if (!user) return '/';
    
    const rolePaths = {
      superadmin: '/superadmin/dashboard',
      admin: '/admin/dashboard',
      owner: '/owner/dashboard',
      customer: '/customer/dashboard',
    };
    
    return rolePaths[user.role] || '/';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    hasRole,
    isSuperAdmin,
    isAdmin,
    updateUser,
    refreshToken,
    getUserById,
    getAllUsers,
    deleteUser,
    updateUserRole,
    getDashboardPath,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
