import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Car,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Phone,
  Building2,
  Shield,
  Sparkles,
  CreditCard,
  MapPin,
  FileText
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

const RegisterPage = () => {
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    address: '',
    taxId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service');
      return false;
    }
    
    if (role === 'car_owner') {
      if (!formData.businessName) {
        setError('Business name is required');
        return false;
      }
      if (!formData.phone) {
        setError('Phone number is required');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role,
    };
    
    if (role === 'car_owner') {
      registrationData.businessName = formData.businessName;
      registrationData.phone = formData.phone;
      registrationData.address = formData.address;
      registrationData.taxId = formData.taxId;
    }
    
    const result = await register(registrationData);
    
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  const roleOptions = [
    {
      value: 'customer',
      label: 'Renter',
      icon: User,
      description: 'Find and book cars',
      benefits: ['No listing fees', '24/7 support', 'Best price guarantee'],
      color: '#10B981',
      bgGradient: 'from-emerald-500 to-teal-500'
    },
    {
      value: 'car_owner',
      label: 'Car Owner',
      icon: Briefcase,
      description: 'Earn by renting out',
      benefits: ['List unlimited cars', 'Earn up to 80%', 'Insurance included'],
      color: '#D97706',
      bgGradient: 'from-amber-500 to-orange-500'
    }
  ];

  const selectedRole = roleOptions.find(r => r.value === role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9F8F6] via-white to-[#FEF3C7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D97706] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F59E0B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#D97706]/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Role Selection & Benefits */}
          <div className="hidden lg:block animate-fade-in">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-[#1C1917] to-[#2A2520] rounded-2xl p-8 text-white shadow-strong">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                  <p className="text-white/70 text-sm">
                    Choose your role and start your journey with us
                  </p>
                </div>

                {/* Role Selection Cards */}
                <div className="space-y-3 mb-6">
                  {roleOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = role === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setRole(option.value)}
                        className={`
                          w-full p-4 rounded-xl transition-all duration-300 text-left
                          ${isSelected 
                            ? `bg-gradient-to-r ${option.bgGradient} shadow-lg scale-[1.02]` 
                            : 'bg-white/10 hover:bg-white/20'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{option.label}</p>
                            <p className="text-sm opacity-80">{option.description}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Benefits List */}
                {selectedRole && (
                  <div className="animate-slide-up">
                    <p className="text-sm font-semibold text-white/70 mb-3">Benefits:</p>
                    <div className="space-y-2">
                      {selectedRole.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#10B981]" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Secure Platform</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      <span>Safe Payments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Verified Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-strong p-6 md:p-8 animate-slide-up animation-delay-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] mb-4 shadow-lg lg:hidden">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#D97706] to-[#F59E0B] bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="mt-2 text-[#52525B] text-sm">
                Join thousands of happy users
              </p>
            </div>

            {/* Mobile Role Selector */}
            <div className="flex gap-3 mb-6 lg:hidden">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = role === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setRole(option.value)}
                    className={`
                      flex-1 py-3 rounded-xl transition-all duration-300 text-center
                      ${isSelected 
                        ? `bg-gradient-to-r ${option.bgGradient} text-white shadow-md` 
                        : 'bg-[#F3F2EE] text-[#52525B]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Full Name <span className="text-[#D97706]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Email Address <span className="text-[#D97706]">*</span>
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

              {/* Car Owner Specific Fields */}
              {role === 'car_owner' && (
                <div className="space-y-4 animate-slide-up">
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Business Name <span className="text-[#D97706]">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                      <input
                        type="text"
                        required
                        placeholder="Your business or personal name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Phone Number <span className="text-[#D97706]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                      <textarea
                        placeholder="Your business address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows="2"
                        className="w-full pl-10 pr-3 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Tax ID / Business Registration
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                      <input
                        type="text"
                        placeholder="Optional"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="group">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Password <span className="text-[#D97706]">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a password (min. 6 characters)"
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

              {/* Confirm Password */}
              <div className="group">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Confirm Password <span className="text-[#D97706]">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA] group-focus-within:text-[#D97706] transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-[#F3F2EE] border border-[#E4E4E7] rounded-xl text-[#1A1A1A] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A1A1AA] hover:text-[#D97706] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#E4E4E7] text-[#D97706] focus:ring-[#D97706]"
                />
                <label htmlFor="terms" className="text-xs text-[#52525B] cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#D97706] hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-[#D97706] hover:underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Register Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                isLoading={loading}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E4E4E7]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-[#A1A1AA]">Or sign up with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 border border-[#E4E4E7] rounded-xl hover:bg-[#F3F2EE] hover:border-[#D97706] transition-all group"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-xs font-medium text-[#52525B] group-hover:text-[#D97706] hidden sm:inline">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 border border-[#E4E4E7] rounded-xl hover:bg-[#F3F2EE] hover:border-[#D97706] transition-all group"
                >
                  <FaApple className="w-5 h-5 text-[#1A1A1A]" />
                  <span className="text-xs font-medium text-[#52525B] group-hover:text-[#D97706] hidden sm:inline">Apple</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 border border-[#E4E4E7] rounded-xl hover:bg-[#F3F2EE] hover:border-[#D97706] transition-all group"
                >
                  <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="text-xs font-medium text-[#52525B] group-hover:text-[#D97706] hidden sm:inline">Meta</span>
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-[#52525B] pt-2">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#D97706] hover:text-[#B45309] hover:underline transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Trust Badge - Mobile */}
        <div className="mt-6 text-center lg:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
            <Shield className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs text-[#52525B]">Secure & Encrypted</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
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
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
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

export default RegisterPage;
