import api from './api';

// Mock user database (will be replaced with real API calls)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    avatar: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'John Customer',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer',
    avatar: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Car Owner',
    email: 'owner@example.com',
    password: 'owner123',
    role: 'car_owner',
    avatar: null,
    createdAt: new Date().toISOString(),
    businessName: 'Premium Auto Rentals',
    phone: '+1 234 567 8900',
  },
  {
    id: '4',
    name: 'Super Admin',
    email: 'super@example.com',
    password: 'super123',
    role: 'super_admin',
    avatar: null,
    createdAt: new Date().toISOString(),
  },
];

// Helper to generate JWT token (mock)
const generateToken = (user) => {
  return btoa(JSON.stringify({ 
    id: user.id, 
    email: user.email, 
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  }));
};

// Verify token
export const verifyToken = async (token) => {
  try {
    // Decode token (mock verification)
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch (error) {
    return false;
  }
};

// Login user
export const login = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(user);
    
    return {
      success: true,
      data: {
        token,
        user: userWithoutPassword,
      },
    };
  }
  
  return {
    success: false,
    message: 'Invalid email or password',
  };
};

// Register new user
export const register = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(u => u.email === userData.email);
  
  if (existingUser) {
    return {
      success: false,
      message: 'User with this email already exists',
    };
  }
  
  // Create new user
  const newUser = {
    id: String(MOCK_USERS.length + 1),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    avatar: null,
    createdAt: new Date().toISOString(),
  };
  
  // Add to mock database
  MOCK_USERS.push(newUser);
  
  // Don't send password back
  const { password: _, ...userWithoutPassword } = newUser;
  const token = generateToken(newUser);
  
  return {
    success: true,
    data: {
      token,
      user: userWithoutPassword,
    },
  };
};

// Update user profile
export const updateProfile = async (userId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
    const { password: _, ...userWithoutPassword } = MOCK_USERS[userIndex];
    
    return {
      success: true,
      data: userWithoutPassword,
    };
  }
  
  return {
    success: false,
    message: 'User not found',
  };
};

// Get current user from token
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = JSON.parse(atob(token));
    const user = MOCK_USERS.find(u => u.id === decoded.id);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Change password
export const changePassword = async (userId, oldPassword, newPassword) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = MOCK_USERS.find(u => u.id === userId);
  
  if (user && user.password === oldPassword) {
    user.password = newPassword;
    return { success: true };
  }
  
  return {
    success: false,
    message: 'Current password is incorrect',
  };
};

// Forgot password request
export const forgotPassword = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = MOCK_USERS.find(u => u.email === email);
  
  if (user) {
    // In real app, send reset email
    console.log(`Password reset link sent to ${email}`);
    return { success: true };
  }
  
  return {
    success: false,
    message: 'No user found with this email',
  };
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // In real app, verify token and update password
  return { success: true };
};
