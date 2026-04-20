import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, Truck, Building2, Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import ThemeToggle from '../../components/ui/ThemeToggle';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const ROLES = [
  {
    value: 'customer',
    label: 'Rent Equipment',
    description: 'Browse and book construction equipment from verified owners',
    icon: Users,
    color: '#3b82f6',
  },
  {
    value: 'owner',
    label: 'List Equipment',
    description: 'Register your machinery and earn by renting it out',
    icon: Truck,
    color: 'var(--brand)',
  },
];

const STEPS = ['Role', 'Account', 'Details', 'Done'];

const RegisterPage = () => {
  const { register } = useAuth();
  const { success, error: notifyError } = useNotification();
  const navigate = useNavigate();

  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]   = useState({});

  const [form, setForm] = useState({
    role: '',
    name: '', email: '', password: '', confirmPassword: '',
    phone: '', city: '', companyName: '',
  });

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 0 && !form.role) e.role = 'Please select a role';
    if (s === 1) {
      if (!form.name)    e.name    = 'Full name is required';
      if (!form.email)   e.email   = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
      if (!form.password) e.password = 'Password is required';
      else if (form.password.length < 8) e.password = 'Minimum 8 characters';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    if (s === 2) {
      if (!form.phone) e.phone = 'Phone is required';
      if (!form.city)  e.city  = 'City is required';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => {
    if (!validateStep(step)) return;
    if (step < 2) { setStep(s => s + 1); return; }
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await register(form);
      success('Account created!', 'Welcome to EquipRent Ethiopia');
      setStep(3);
      setTimeout(() => {
        navigate(form.role === 'owner' ? '/owner/dashboard' : '/customer/dashboard');
      }, 2000);
    } catch (err) {
      notifyError('Registration failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const stepContent = [
    /* ── Step 0: Role ── */
    <div key="role" className="space-y-4">
      <div>
        <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>How will you use EquipRent?</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Choose the account type that fits you.</p>
      </div>
      {errors.role && <p className="text-xs" style={{ color: 'var(--danger)' }}>{errors.role}</p>}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ROLES.map(({ value, label, description, icon: Icon, color }) => (
          <button
            key={value}
            type="button"
            onClick={() => set('role', value)}
            className="text-left p-4 border-2 transition-all duration-200"
            style={{
              borderColor:  form.role === value ? color : 'var(--border-base)',
              background:   form.role === value ? `${color}0d` : 'var(--bg-elevated)',
              borderRadius: 'var(--r-lg)',
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center mb-3"
              style={{ background: `${color}18`, borderRadius: 'var(--r-md)' }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{description}</p>
            {form.role === value && (
              <div className="mt-2 flex items-center gap-1" style={{ color }}>
                <Check className="w-3 h-3" />
                <span className="text-[10px] font-bold">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>,

    /* ── Step 1: Account ── */
    <div key="account" className="space-y-4">
      <div>
        <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>Create your account</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Enter your login credentials.</p>
      </div>
      <Input label="Full name" placeholder="Abebe Bekele" value={form.name}
        onChange={e => set('name', e.target.value)} error={errors.name}
        leftIcon={<User className="w-4 h-4" />} required />
      <Input label="Email address" type="email" placeholder="you@example.com" value={form.email}
        onChange={e => set('email', e.target.value)} error={errors.email}
        leftIcon={<Mail className="w-4 h-4" />} required autoComplete="email" />
      <Input label="Password" type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password}
        onChange={e => set('password', e.target.value)} error={errors.password}
        leftIcon={<Lock className="w-4 h-4" />}
        rightAction={
          <button type="button" onClick={() => setShowPass(s => !s)}>
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        } required />
      <Input label="Confirm password" type="password" placeholder="Repeat password" value={form.confirmPassword}
        onChange={e => set('confirmPassword', e.target.value)} error={errors.confirmPassword}
        leftIcon={<Lock className="w-4 h-4" />} required />
    </div>,

    /* ── Step 2: Details ── */
    <div key="details" className="space-y-4">
      <div>
        <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>A bit more about you</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Help us personalise your experience.</p>
      </div>
      <Input label="Phone number" type="tel" placeholder="+251 91 234 5678" value={form.phone}
        onChange={e => set('phone', e.target.value)} error={errors.phone}
        leftIcon={<Phone className="w-4 h-4" />} required />
      <Select label="City" placeholder="Select city" value={form.city}
        onChange={e => set('city', e.target.value)} error={errors.city} required
        options={['Addis Ababa','Dire Dawa','Adama','Hawassa','Bahir Dar','Mekelle','Jimma','Gondar'].map(c => ({ value: c, label: c }))} />
      {form.role === 'owner' && (
        <Input label="Company / Business name" placeholder="ABC Construction PLC" value={form.companyName}
          onChange={e => set('companyName', e.target.value)}
          leftIcon={<Building2 className="w-4 h-4" />}
          hint="Optional — shown on your public profile" />
      )}
    </div>,

    /* ── Step 3: Done ── */
    <div key="done" className="text-center py-8 space-y-4">
      <div className="w-16 h-16 flex items-center justify-center mx-auto rounded-full"
        style={{ background: 'rgba(16,185,129,0.15)' }}>
        <Check className="w-8 h-8" style={{ color: 'var(--success)' }} />
      </div>
      <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Account Created!</h2>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Redirecting you to your dashboard…</p>
      <div className="w-6 h-6 border-2 rounded-full animate-spin mx-auto"
        style={{ borderColor: 'var(--border-base)', borderTopColor: 'var(--success)' }} />
    </div>,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-base)' }}>
      {/* Top controls */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-10">
        <LanguageSwitcher compact />
        <ThemeToggle size="sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>
            <Truck className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-base" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>EquipRent Ethiopia</span>
        </div>

        {/* Progress steps */}
        {step < 3 && (
          <div className="flex items-center gap-1 mb-8">
            {STEPS.slice(0, 3).map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 flex items-center justify-center text-[10px] font-black transition-all duration-300"
                    style={{
                      background:   i <= step ? 'var(--brand)' : 'var(--bg-overlay)',
                      color:        i <= step ? '#fff' : 'var(--text-muted)',
                      borderRadius: '50%',
                    }}
                  >
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="text-xs font-semibold hidden sm:inline"
                    style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px" style={{ background: i < step ? 'var(--brand)' : 'var(--border-base)' }} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="p-6 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-md)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>

          {step < 3 && (
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <Button variant="secondary" onClick={() => setStep(s => s - 1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
              )}
              <Button fullWidth loading={loading} onClick={next}
                rightIcon={!loading && <ArrowRight className="w-4 h-4" />}>
                {step === 2 ? 'Create Account' : 'Continue'}
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-bold" style={{ color: 'var(--brand)' }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
