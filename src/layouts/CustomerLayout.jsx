import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Search, BookOpen, User, Settings, LogOut, Bell, Menu, X, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from '../components/ui/index.jsx';
import ThemeToggle from '../components/ui/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';

const NAV = [
  { path: '/customer/dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { path: '/search',             icon: Search,          key: 'browse'    },
  { path: '/customer/bookings',  icon: BookOpen,        key: 'bookings'  },
  { path: '/customer/profile',   icon: User,            key: 'profile'   },
];

const CustomerLayout = () => {
  const { user, logout }   = useAuth();
  const { isDark }         = useTheme();
  const location           = useLocation();
  const navigate           = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (p) => location.pathname === p || location.pathname.startsWith(p + '/');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Top nav ── */}
      <header
        className="sticky top-0 z-30 transition-all duration-300"
        style={{
          background:   scrolled ? (isDark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)') : (isDark ? 'rgba(13,13,13,0.7)' : 'rgba(255,255,255,0.7)'),
          borderBottom: `1px solid ${scrolled ? 'var(--border-base)' : 'var(--border-faint)'}`,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/customer/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-sm hidden sm:block" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>EquipRent</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ path, icon: Icon, key }) => (
              <Link key={path} to={path}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors"
                style={{
                  color:      isActive(path) ? 'var(--brand)' : 'var(--text-secondary)',
                  background: isActive(path) ? 'var(--brand-muted)' : 'transparent',
                  borderRadius: 'var(--r-md)',
                }}>
                <Icon className="w-3.5 h-3.5" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <ThemeToggle size="sm" />
            <button className="relative w-8 h-8 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
            </button>

            <div className="flex items-center gap-2">
              <Avatar name={user?.name} size="sm" />
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 border transition-colors"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'var(--danger)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-base)'; }}>
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>

            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden" style={{ color: 'var(--text-secondary)' }}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t overflow-hidden" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-elevated)' }}>
              <div className="p-4 space-y-1">
                {NAV.map(({ path, icon: Icon, key }) => (
                  <Link key={path} to={path}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded transition-colors"
                    style={{ color: isActive(path) ? 'var(--brand)' : 'var(--text-secondary)', background: isActive(path) ? 'var(--brand-muted)' : 'transparent', borderRadius: 'var(--r-md)' }}>
                    <Icon className="w-4 h-4" />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                ))}
                <button onClick={() => { logout(); navigate('/login'); }}
                  className="flex items-center gap-2 px-3 py-2.5 w-full text-sm font-medium transition-colors mt-1"
                  style={{ color: 'var(--danger)', borderRadius: 'var(--r-md)' }}>
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t px-8 py-5 text-center" style={{ borderColor: 'var(--border-base)' }}>
        <p className="text-xs" style={{ color: 'var(--text-faint)' }}>© {new Date().getFullYear()} EquipRent Ethiopia</p>
      </footer>
    </div>
  );
};

export default CustomerLayout;
