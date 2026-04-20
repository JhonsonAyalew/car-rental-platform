import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, PlusCircle, ClipboardList, BarChart2, Calendar,
  User, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight,
  Truck, Bell, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from '../components/ui/index.jsx';
import ThemeToggle from '../components/ui/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';

const NAV = [
  { path: '/owner/dashboard',    icon: LayoutDashboard, key: 'dashboard',   section: 'MAIN' },
  { path: '/owner/submit',       icon: PlusCircle,      key: 'submit',      section: 'MAIN', accent: true },
  { path: '/owner/submissions',  icon: ClipboardList,   key: 'submissions', section: 'MANAGE' },
  { path: '/owner/calendar',     icon: Calendar,        key: 'calendar',    section: 'MANAGE' },
  { path: '/owner/analytics',    icon: BarChart2,       key: 'analytics',   section: 'MANAGE' },
  { path: '/owner/profile',      icon: User,            key: 'profile',     section: 'ACCOUNT' },
  { path: '/owner/settings',     icon: Settings,        key: 'settings',    section: 'ACCOUNT' },
];

const SECTIONS = { MAIN: 'Main', MANAGE: 'Manage', ACCOUNT: 'Account' };

const CarOwnerLayout = () => {
  const { t }            = useTranslation('carOwnerLayout');
  const { user, logout } = useAuth();
  const { isDark }       = useTheme();
  const location         = useLocation();
  const navigate         = useNavigate();
  const [open, setOpen]  = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => { const m = window.innerWidth < 1024; setIsMobile(m); if (m) setOpen(false); else setOpen(true); };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { if (isMobile) setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (p) => location.pathname === p || location.pathname.startsWith(p + '/');
  const grouped  = NAV.reduce((a, i) => { (a[i.section] ??= []).push(i); return a; }, {});
  const W        = open ? 256 : 70;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>

      <AnimatePresence>
        {isMobile && open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
            onClick={() => setOpen(false)} />
        )}
      </AnimatePresence>

      <aside
        className="fixed left-0 top-0 h-full flex flex-col transition-all duration-300 overflow-hidden"
        style={{
          width:       isMobile ? (open ? 256 : 0) : W,
          background:  isDark ? '#0D0D0D' : '#FFFFFF',
          borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          zIndex:      isMobile ? 50 : 30,
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-3 border-b flex-shrink-0"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
          <Link to="/owner/dashboard" className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>
              <Truck className="w-4 h-4 text-white" />
            </div>
            {(open || isMobile) && (
              <div className="min-w-0">
                <span className="font-black text-sm block" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>EquipRent</span>
                <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#8b5cf6' }}>Owner Portal</span>
              </div>
            )}
          </Link>
          {!isMobile && (
            <button onClick={() => setOpen(o => !o)} style={{ color: 'var(--text-muted)' }}>
              {open ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
          {isMobile && <button onClick={() => setOpen(false)} style={{ color: 'var(--text-muted)' }}><X className="w-4 h-4" /></button>}
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="mb-4">
              {(open || isMobile) && (
                <p className="text-[9px] font-bold tracking-widest uppercase mb-1.5 px-3" style={{ color: 'var(--text-faint)' }}>
                  {SECTIONS[section]}
                </p>
              )}
              {items.map(item => {
                const Icon   = item.icon;
                const active = isActive(item.path);
                return (
                  <div key={item.path} className="relative group mb-0.5">
                    <Link to={item.path}
                      className="flex items-center gap-3 px-3 py-2.5 transition-all duration-150"
                      style={{
                        background:     active ? '#8b5cf6' : item.accent ? 'rgba(139,92,246,0.1)' : 'transparent',
                        color:          active ? '#fff' : item.accent ? '#8b5cf6' : 'var(--text-muted)',
                        borderRadius:   'var(--r-md)',
                        justifyContent: (!open && !isMobile) ? 'center' : 'flex-start',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = item.accent ? 'rgba(139,92,246,0.1)' : 'transparent'; }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {(open || isMobile) && (
                        <span className="text-sm font-medium flex-1" style={{ color: active ? '#fff' : 'var(--text-secondary)' }}>
                          {t(`nav.${item.key}`) || item.key}
                        </span>
                      )}
                    </Link>
                    {!open && !isMobile && (
                      <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                        style={{ background: 'var(--text-primary)', color: 'var(--bg-base)', borderRadius: 'var(--r-sm)' }}>
                        {t(`nav.${item.key}`) || item.key}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* User + logout */}
        <div className="border-t p-2 flex-shrink-0" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
          {(open || isMobile) && (
            <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
              <Avatar name={user?.name} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user?.name}</p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>Equipment Owner</p>
              </div>
            </div>
          )}
          <button onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 px-3 py-2.5 w-full transition-colors"
            style={{ color: 'var(--text-muted)', borderRadius: 'var(--r-md)', justifyContent: (!open && !isMobile) ? 'center' : 'flex-start' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-bg)'; e.currentTarget.style.color = 'var(--danger)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {(open || isMobile) && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300"
        style={{ marginLeft: isMobile ? 0 : W }}>
        <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-6 border-b transition-all duration-300"
          style={{
            background:  scrolled ? (isDark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)') : (isDark ? 'rgba(13,13,13,0.8)' : 'rgba(255,255,255,0.8)'),
            borderColor: 'var(--border-base)',
            backdropFilter: 'blur(16px)',
          }}>
          <div className="flex items-center gap-3">
            {isMobile && (
              <button onClick={() => setOpen(true)} style={{ color: 'var(--text-muted)' }}>
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {NAV.find(n => isActive(n.path))?.key ?? 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <ThemeToggle size="sm" />
            <button className="relative w-9 h-9 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
            </button>
            <Avatar name={user?.name} size="sm" />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 xl:p-8"><Outlet /></main>
        <footer className="border-t px-6 py-4" style={{ borderColor: 'var(--border-base)' }}>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>© {new Date().getFullYear()} EquipRent Ethiopia</p>
        </footer>
      </div>
    </div>
  );
};

export default CarOwnerLayout;
