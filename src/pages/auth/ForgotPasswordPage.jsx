import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Truck, Check } from 'lucide-react';
import { authService } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import ThemeToggle from '../../components/ui/ThemeToggle';

const ForgotPasswordPage = () => {
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-base)' }}>
      <div className="fixed top-4 right-4"><ThemeToggle size="sm" /></div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 flex items-center justify-center" style={{ background: 'var(--brand)', borderRadius: 'var(--r-md)' }}>
            <Truck className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>EquipRent</span>
        </div>

        <div className="p-7 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-md)' }}>
          {!sent ? (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full"
                  style={{ background: 'var(--brand-muted)' }}>
                  <Mail className="w-6 h-6" style={{ color: 'var(--brand)' }} />
                </div>
                <h1 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>Reset your password</h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  error={error}
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
                <Button type="submit" fullWidth loading={loading}>Send reset link</Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 flex items-center justify-center mx-auto rounded-full"
                style={{ background: 'rgba(16,185,129,0.15)' }}>
                <Check className="w-7 h-7" style={{ color: 'var(--success)' }} />
              </div>
              <h2 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Email sent!</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                We sent a reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
                Check your inbox.
              </p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t flex justify-center" style={{ borderColor: 'var(--border-base)' }}>
            <Link to="/login" className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}>
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
