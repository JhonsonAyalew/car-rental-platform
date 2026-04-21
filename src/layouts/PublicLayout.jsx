import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Menu, X, Search, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { path: '/',        key: 'home' },
  { path: '/search',  key: 'search' },
  { path: '/about',   key: 'about' },
  { path: '/contact', key: 'contact' },
];

const PublicLayout = () => {
  const { t }               = useTranslation('publicLayout');
  const { isAuthenticated, user } = useAuth(); // Removed getRedirectPath from here
  const { isDark }          = useTheme();
  const location            = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Define the getRedirectPath function locally
  const getRedirectPath = () => {
    if (!user) return '/dashboard';
    
    const rolePaths = {
      admin: '/admin/dashboard',
      superadmin: '/superadmin/dashboard',
      owner: '/owner/dashboard',
      customer: '/customer/dashboard',
    };
    
    return rolePaths[user.role] || '/dashboard';
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (p) => location.pathname === p;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-30 transition-all duration-300"
        style={{
          background:   scrolled
            ? (isDark ? 'rgba(10,10,10,0.96)' : 'rgba(255,255,255,0.96)')
            : 'transparent',
          borderBottom: scrolled ? `1px solid var(--border-base)` : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
     {/* Logo */}
<Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
  <img 
    src="/logo.png" 
    alt="Concrete" 
    className="h-8 w-auto object-contain"
    loading="eager"
  />
  <span className="font-black text-base" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
    Concrete
  </span>
</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ path, key }) => (
              <Link
                key={path}
                to={path}
                className="px-3 py-1.5 text-sm font-medium rounded transition-colors duration-150"
                style={{
                  color:      isActive(path) ? 'var(--brand)' : 'var(--text-secondary)',
                  background: isActive(path) ? 'var(--brand-muted)' : 'transparent',
                  borderRadius: 'var(--r-md)',
                }}
              >
                {t(`nav.${key}`) || key}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <ThemeToggle size="sm" />

            {isAuthenticated ? (
              <Link to={getRedirectPath()}>
                <Button size="sm" variant="outline" leftIcon={<User className="w-3.5 h-3.5" />}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button size="sm" variant="ghost">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center transition-colors"
              style={{ color: 'var(--text-secondary)', borderRadius: 'var(--r-md)' }}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t overflow-hidden"
              style={{ borderColor: 'var(--border-base)', background: 'var(--bg-elevated)' }}
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map(({ path, key }) => (
                  <Link key={path} to={path}
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded transition-colors"
                    style={{
                      color:      isActive(path) ? 'var(--brand)' : 'var(--text-secondary)',
                      background: isActive(path) ? 'var(--brand-muted)' : 'transparent',
                      borderRadius: 'var(--r-md)',
                    }}>
                    {t(`nav.${key}`) || key}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="pt-2 border-t flex gap-2" style={{ borderColor: 'var(--border-base)' }}>
                    <Link to="/login" className="flex-1">
                      <Button variant="secondary" fullWidth size="sm">Sign in</Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button fullWidth size="sm">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <span className="font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>EquipRent</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Ethiopia's leading platform for construction equipment rental.
              </p>
            </div>

            {[
              { title: 'Platform', links: [['Browse Equipment', '/search'], ['How it Works', '/about'], ['Pricing', '/'], ['Contact', '/contact']] },
              { title: 'For Owners', links: [['List Equipment', '/register'], ['Owner Dashboard', '/owner/dashboard'], ['Analytics', '/owner/analytics'], ['Support', '/contact']] },
              { title: 'Company', links: [['About Us', '/about'], ['Careers', '/'], ['Blog', '/'], ['Privacy Policy', '/']] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                <ul className="space-y-2">
                  {links.map(([label, path]) => (
                    <li key={label}>
                      <Link to={path} className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t flex flex-wrap items-center justify-between gap-3"
            style={{ borderColor: 'var(--border-base)' }}>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
              © {new Date().getFullYear()} EquipRent Ethiopia. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)' }} />
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
