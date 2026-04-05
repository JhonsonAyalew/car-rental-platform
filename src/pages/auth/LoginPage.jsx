import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Car,
  ArrowRight,
  Fingerprint,
  Shield,
  User,
  Briefcase,
  Crown
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const fillDemoCredentials = (role, email, password) => {
    setActiveDemo(role);
    setFormData({ email, password });
    setError('');
    
    // Add visual feedback
    setTimeout(() => setActiveDemo(null), 2000);
  };

  const demoAccounts = [
    {
      role: 'customer',
      label: 'Customer',
      icon: User,
      email: 'customer@example.com',
      password: 'customer123',
      color: '#10B981',
      bgColor: 'bg-emerald-50',
      hoverColor: 'hover:bg-emerald-100',
      borderColor: 'border-emerald-200'
    },
    {
      role: 'owner',
      label: 'Car Owner',
      icon: Briefcase,
      email: 'owner@example.com',
      password: 'owner123',
      color: '#D97706',
      bgColor: 'bg-amber-50',
      hoverColor: 'hover:bg-amber-100',
      borderColor: 'border-amber-200'
    },
    {
      role: 'admin',
      label: 'Admin',
      icon: Shield,
      email: 'admin@example.com',
      password: 'admin123',
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      role: 'super',
      label: 'Super Admin',
      icon: Crown,
      email: 'super@example.com',
      password: 'super123',
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9F8F6] via-white to-[#FEF3C7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D97706] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F59E0B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#D97706] to-[#F59E0B] bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-3 text-[#52525B]">Sign in to continue your journey</p>
        </div>

        

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-strong p-8 animate-slide-up animation-delay-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A1A1AA] hover:text-[#D97706] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-[#E4E4E7] rounded-md bg-white peer-checked:bg-[#D97706] peer-checked:border-[#D97706] transition-all"></div>
                  {rememberMe && (
                    <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-[#52525B] group-hover:text-[#D97706] transition-colors">
                  Remember me
                </span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-[#D97706] hover:text-[#B45309] transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              isLoading={loading}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E4E7]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-[#A1A1AA]">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E4E4E7] rounded-xl hover:bg-[#F3F2EE] hover:border-[#D97706] transition-all group"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-sm font-medium text-[#52525B] group-hover:text-[#D97706] hidden sm:inline">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E4E4E7] rounded-xl hover:bg-[#F3F2EE] hover:border-[#D97706] transition-all group"
              >
                <FaApple className="w-5 h-5 text-[#1A1A1A]" />
                <span className="text-sm font-medium text-[#52525B] group-hover:text-[#D97706] hidden sm:inline">Apple</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E4E4E7] rounded-xl hover:bg-[#F3F2EE] hover:border-[#D97706] transition-all group"
              >
                <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                <span className="text-sm font-medium text-[#52525B] group-hover:text-[#D97706] hidden sm:inline">Facebook</span>
              </button>
            </div>

            {/* Biometric Option */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[#A1A1AA] hover:text-[#D97706] transition-colors"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Use biometric login</span>
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#52525B] pt-4">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-[#D97706] hover:text-[#B45309] hover:underline transition-colors">
                Create account
              </Link>
            </p>
          </form>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
            <Shield className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs text-[#52525B]">Secure & Encrypted</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
