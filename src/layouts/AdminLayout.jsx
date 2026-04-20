import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, Tag, Settings, Bell, Menu, X,
  LogOut, ChevronLeft, ChevronRight, ChevronDown, Timer, HardHat,
  Package, TrendingUp, UserCheck, ClipboardList, Languages, Truck,
  Zap, Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from '../components/ui/index.jsx';
import ThemeToggle from '../components/ui/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';

const NAV = [
  { path: '/admin/dashboard',       icon: LayoutDashboard, key: 'dashboard',      section: 'MAIN' },
  { path: '/admin/time-controller', icon: Timer,           key: 'timeController', section: 'MAIN', highlight: true },
  { path: '/admin/equipment',       icon: HardHat,         key: 'equipment',      section: 'MANAGEMENT' },
  { path: '/admin/categories',      icon: Tag,             key: 'categories',     section: 'MANAGEMENT' },
  { path: '/admin/submissions',     icon: ClipboardList,   key: 'submissions',    section: 'MANAGEMENT', badge: '12' },
  { path: '/admin/bookings',        icon: Calendar,        key: 'bookings',       section: 'MANAGEMENT' },
  { path: '/admin/materials',       icon: Package,         key: 'materials',      section: 'MANAGEMENT', badge: '5' },
  { path: '/admin/customers',       icon: Users,           key: 'customers',      section: 'USERS' },
  { path: '/admin/owners',          icon: UserCheck,       key: 'owners',         section: 'USERS' },
  { path: '/admin/reports',         icon: TrendingUp,      key: 'reports',        section: 'REPORTS' },
  { path: '/admin/settings',        icon: Settings,        key: 'settings',       section: 'SETTINGS' },
  { path: '/admin/profile',         icon: UserCheck,       key: 'profile',        section: 'SETTINGS' },
];

const SECTION_LABELS = { MAIN: 'Main', MANAGEMENT: 'Management', USERS: 'Users', REPORTS: 'Reports', SETTINGS: 'Settings' };

const AdminLayout = () => {
  const { t }              = useTranslation('adminLayout');
  const { user, logout }   = useAuth();
  const { isDark }         = useTheme();
  const location           = useLocation();
  const navigate           = useNavigate();
  const profileRef         = useRef(null);
  const sidebarRef         = useRef(null);

  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [isMobile, setIsMobile]           = useState(false);
  const [profileOpen, setProfileOpen]     = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  /* responsive */
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* close sidebar on mobile nav */
  useEffect(() => { if (isMobile) setSidebarOpen(false); }, [location.pathname]);

  /* scrolled topbar */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* close profile on outside click */
  useEffect(() => {
    const fn = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  /* close sidebar on mobile outside click */
  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    const fn = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) setSidebarOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [isMobile, sidebarOpen]);

  const isActive   = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const getTitle   = () => NAV.find(i => isActive(i.path))?.key ?? 'dashboard';
  const grouped    = NAV.reduce((acc, item) => { (acc[item.section] ??= []).push(item); return acc; }, {});

  const SIDEBAR_W  = sidebarOpen ? 256 : 70;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ═══ Sidebar ═════════════════════════════════════ */}
      <aside
        ref={sidebarRef}
        className="fixed left-0 top-0 h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          width:       isMobile ? (sidebarOpen ? 256 : 0) : SIDEBAR_W,
          background:  isDark ? '#0D0D0D' : '#FFFFFF',
          borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          boxShadow:   isMobile && sidebarOpen ? 'var(--shadow-lg)' : 'none',
          zIndex:      isMobile ? 50 : 30,
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center h-16 px-4 gap-3 border-b"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
          <Link to="/admin/dashboard" className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)', boxShadow: '0 0 14px rgba(232,101,10,0.35)' }}>
              <Truck className="w-4 h-4 text-white" />
            </div>
            {(sidebarOpen || isMobile) && (
              <div className="min-w-0 flex-1">
                <span className="font-black text-sm block truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  {t('brand') || 'EquipRent'}
                </span>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase block" style={{ color: 'var(--brand)' }}>
                  Admin Portal
                </span>
              </div>
            )}
          </Link>
          {!isMobile && (
            <button onClick={() => setSidebarOpen(s => !s)}
              className="w-6 h-6 flex items-center justify-center transition-colors flex-shrink-0"
              style={{ color: 'var(--text-muted)' }}>
              {sidebarOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)}
              className="w-7 h-7 flex items-center justify-center flex-shrink-0"
              style={{ color: 'var(--text-muted)' }}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-2"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--border-base) transparent' }}>
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="mb-4">
              {(sidebarOpen || isMobile) && (
                <p className="text-[9px] font-bold tracking-[0.14em] uppercase mb-1.5 px-3"
                  style={{ color: 'var(--text-faint)' }}>
                  {SECTION_LABELS[section]}
                </p>
              )}
              {!sidebarOpen && !isMobile && <div className="h-px mx-2 mb-2" style={{ background: 'var(--border-base)' }} />}

              {items.map(item => {
                const Icon   = item.icon;
                const active = isActive(item.path);
                return (
                  <div key={item.path} className="relative group mb-0.5">
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-3 py-2.5 transition-all duration-150 relative"
                      style={{
                        background:   active ? 'var(--brand)' : item.highlight ? 'var(--brand-muted)' : 'transparent',
                        color:        active ? '#fff' : item.highlight ? 'var(--brand)' : 'var(--text-muted)',
                        borderRadius: 'var(--r-md)',
                        justifyContent: (!sidebarOpen && !isMobile) ? 'center' : 'flex-start',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = item.highlight ? 'var(--brand-muted)' : 'transparent'; }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? '#fff' : item.highlight ? 'var(--brand)' : undefined }} />
                      {(sidebarOpen || isMobile) && (
                        <>
                          <span className="text-sm font-medium flex-1 truncate" style={{ color: active ? '#fff' : 'var(--text-secondary)' }}>
                            {t(`nav.${item.key}`) || item.key}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-black px-1.5 py-0.5"
                              style={{ background: active ? 'rgba(0,0,0,0.2)' : 'var(--brand)', color: active ? '#fff' : '#fff', borderRadius: 'var(--r-sm)' }}>
                              {item.badge}
                            </span>
                          )}
                          {item.highlight && !active && <Zap className="w-3 h-3" style={{ color: 'var(--brand)' }} />}
                        </>
                      )}
                      {/* Dot badge when collapsed */}
                      {!sidebarOpen && !isMobile && item.badge && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: 'var(--brand)' }} />
                      )}
                    </Link>

                    {/* Tooltip on collapsed */}
                    {!sidebarOpen && !isMobile && (
                      <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap
                        opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50"
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

        {/* User strip + logout */}
        <div className="flex-shrink-0 border-t p-2" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
          {(sidebarOpen || isMobile) && (
            <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
              <Avatar name={user?.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user?.name || 'Admin User'}</p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
              </div>
            </div>
          )}
          <div className="relative group">
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-3 px-3 py-2.5 w-full transition-colors duration-150"
              style={{
                borderRadius:   'var(--r-md)',
                color:          'var(--text-muted)',
                justifyContent: (!sidebarOpen && !isMobile) ? 'center' : 'flex-start',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-bg)'; e.currentTarget.style.color = 'var(--danger)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {(sidebarOpen || isMobile) && <span className="text-sm font-medium">{t('logout') || 'Logout'}</span>}
            </button>
            {!sidebarOpen && !isMobile && (
              <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap
                opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                style={{ background: 'var(--danger)', color: '#fff', borderRadius: 'var(--r-sm)' }}>
                Logout
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ═══ Main content ════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300"
        style={{ marginLeft: isMobile ? 0 : SIDEBAR_W }}
      >
        {/* ── Topbar ── */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 lg:px-6 border-b transition-all duration-300"
          style={{
            background:   scrolled
              ? (isDark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)')
              : (isDark ? 'rgba(13,13,13,0.8)'   : 'rgba(255,255,255,0.8)'),
            borderColor:  scrolled ? 'var(--border-base)' : 'var(--border-faint)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)', borderRadius: 'var(--r-md)' }}>
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="min-w-0">
              <h1 className="font-bold text-base lg:text-lg truncate" style={{ color: 'var(--text-primary)' }}>
                {t(`pageTitle.${getTitle()}`) || getTitle()}
              </h1>
              <p className="text-[11px] hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                Admin Panel · EquipRent Ethiopia
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSwitcher compact />
            <ThemeToggle size="sm" />

            {/* Bell */}
            <button className="relative w-9 h-9 flex items-center justify-center transition-colors"
              style={{ color: 'var(--text-muted)', borderRadius: 'var(--r-md)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full animate-[pulse-dot_2s_ease_infinite]"
                style={{ background: 'var(--brand)' }} />
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-2">
                <Avatar name={user?.name} size="sm" />
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>{user?.name || 'Admin'}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Administrator</p>
                </div>
                <ChevronDown className={`w-3 h-3 hidden xl:block transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                  style={{ color: 'var(--text-muted)' }} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.14 }}
                      className="absolute right-0 mt-2 w-56 border overflow-hidden z-50"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-lg)' }}
                    >
                      <div className="px-4 py-3.5 border-b" style={{ borderColor: 'var(--border-base)' }}>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
                      </div>
                      {[
                        { to: '/admin/profile',  label: 'My Profile' },
                        { to: '/admin/settings', label: 'Settings' },
                        { to: '/admin/reports',  label: 'Reports' },
                      ].map(({ to, label }) => (
                        <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          {label}
                        </Link>
                      ))}
                      <div className="border-t" style={{ borderColor: 'var(--border-base)' }} />
                      <button
                        onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }}
                        className="flex items-center gap-2 px-4 py-2.5 w-full text-sm transition-colors"
                        style={{ color: 'var(--danger)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--danger-bg)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          <Outlet />
        </main>

        {/* ── Footer ── */}
        <footer className="border-t px-6 py-4 flex flex-wrap items-center justify-between gap-2"
          style={{ borderColor: 'var(--border-base)' }}>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} EquipRent Ethiopia. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)', animation: 'pulse-dot 2s ease infinite' }} />
            <span className="text-xs" style={{ color: 'var(--text-faint)' }}>System Online</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
