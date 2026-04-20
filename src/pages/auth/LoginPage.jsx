// /src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Truck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ThemeToggle from '../../components/ui/ThemeToggle';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const DEMO_ACCOUNTS = [
  { role: 'Admin', email: 'admin@equiprent.et', password: 'admin123', color: '#E8650A' },
  { role: 'Owner', email: 'owner@equiprent.et', password: 'owner123', color: '#8b5cf6' },
  { role: 'Customer', email: 'customer@equiprent.et', password: 'customer123', color: '#3b82f6' },
];

const LoginPage = () => {
  const { t } = useTranslation('common');
  const { login } = useAuth();
  const { success, error: notifyError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      
      if (result.success) {
        success('Welcome back!', `Logged in as ${result.user.name}`);
        const redirect = from || {
          admin: '/admin/dashboard',
          superadmin: '/superadmin/dashboard',
          owner: '/owner/dashboard',
          customer: '/customer/dashboard',
        }[result.user.role] || '/';
        navigate(redirect, { replace: true });
      } else {
        notifyError('Login failed', result.error || 'Invalid credentials');
      }
    } catch (err) {
      notifyError('Login failed', err.response?.data?.message || err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (account) => {
    setForm({ email: account.email, password: account.password });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Left panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: '#0D0D0D' }}>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(var(--brand) 1px, transparent 1px), linear-gradient(90deg, var(--brand) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.15) 0%, transparent 70%)' }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center"
            style={{ background: 'var(--brand)', borderRadius: 'var(--r-md)' }}>
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-black text-lg" style={{ fontFamily: 'var(--font-display)' }}>EquipRent</span>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--brand)' }}>Ethiopia</p>
          </div>
        </div>

        {/* Center headline */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ethiopia's #1<br />Equipment<br />Rental Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Connect with equipment owners.<br />Book machinery. Build Ethiopia.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 grid grid-cols-3 gap-4"
        >
          {[['234+', 'Machines'], ['1,240+', 'Users'], ['ETB 2.8M+', 'Revenue']].map(([v, l]) => (
            <div key={l} className="p-3 border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--r-md)' }}>
              <p className="text-lg font-black" style={{ color: 'var(--brand)' }}>{v}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="flex items-center justify-between p-4 lg:p-6">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base" style={{ color: 'var(--text-primary)' }}>EquipRent</span>
          </div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <ThemeToggle size="sm" />
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                Welcome back
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Sign in to your EquipRent account
              </p>
            </div>

            {/* Demo accounts */}
            <div className="mb-6">
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Quick demo login:</p>
              <div className="flex gap-2 flex-wrap">
                {DEMO_ACCOUNTS.map(acc => (
                  <button
                    key={acc.role}
                    onClick={() => fillDemo(acc)}
                    className="px-3 py-1.5 text-xs font-bold border transition-all duration-150 hover:scale-[1.02]"
                    style={{
                      background: `${acc.color}12`,
                      borderColor: `${acc.color}35`,
                      color: acc.color,
                      borderRadius: 'var(--r-sm)',
                    }}
                  >
                    {acc.role}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                required
                autoComplete="email"
              />

              <Input
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '' })); }}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                rightAction={
                  <button type="button" onClick={() => setShowPass(s => !s)} className="transition-colors hover:text-brand">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[--brand]" />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold" style={{ color: 'var(--brand)' }}>
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={loading}
                rightIcon={!loading && <ArrowRight className="w-4 h-4" />}
              >
                Sign in
              </Button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-bold" style={{ color: 'var(--brand)' }}>
                Create account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
