import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Tag, 
  FileText, 
  Settings, 
  Bell, 
  Menu, 
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Timer,
  HardHat,
  Package,
  TrendingUp,
  UserCheck,
  ClipboardList,
  DollarSign,
  Languages,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const { t } = useTranslation('adminLayout');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('i18nextLng') || 'en';
  });
  const location = useLocation();
  const { user, logout } = useAuth();

  const changeLanguage = (lng) => {
    setCurrentLang(lng);
    localStorage.setItem('i18nextLng', lng);
    window.location.reload();
  };
  
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'አማርኛ' }
  ];
  
  const currentLanguageName = languageOptions.find(lang => lang.code === currentLang)?.name || 'English';

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('admin-sidebar');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        if (sidebar && !sidebar.contains(e.target) && !hamburgerBtn?.contains(e.target)) {
          setSidebarOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const navItems = [
    // MAIN SECTION
    { path: '/admin/dashboard', icon: LayoutDashboard, label: t('nav.items.dashboard'), section: 'MAIN' },
    { path: '/admin/time-controller', icon: Timer, label: t('nav.items.timeController'), section: 'MAIN', highlight: true },
    
    // MANAGEMENT SECTION
    { path: '/admin/equipment', icon: HardHat, label: t('nav.items.equipment'), section: 'MANAGEMENT' },
    { path: '/admin/categories', icon: Tag, label: t('nav.items.categories'), section: 'MANAGEMENT' },
    { path: '/admin/submissions', icon: ClipboardList, label: t('nav.items.pendingSubmissions'), section: 'MANAGEMENT', badge: '12' },
    { path: '/admin/bookings', icon: Calendar, label: t('nav.items.bookings'), section: 'MANAGEMENT' },
    { path: '/admin/materials', icon: Package, label: t('nav.items.materialOrders'), section: 'MANAGEMENT', badge: '5' },
    
    // USERS SECTION
    { path: '/admin/customers', icon: Users, label: t('nav.items.customers'), section: 'USERS' },
    { path: '/admin/owners', icon: UserCheck, label: t('nav.items.equipmentOwners'), section: 'USERS' },
    
    // REPORTS SECTION
    { path: '/admin/reports', icon: TrendingUp, label: t('nav.items.reportsAnalytics'), section: 'REPORTS' },
    
    // SETTINGS SECTION
    { path: '/admin/settings', icon: Settings, label: t('nav.items.settings'), section: 'SETTINGS' },
    { path: '/admin/profile', icon: UserCheck, label: t('nav.items.myProfile'), section: 'SETTINGS' },
  ];
  
  // Group nav items by section
  const groupedNav = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});
  
  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'A';
  };
  
  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Mobile Header with Hamburger */}
      <header className="bg-white border-b border-[#E4E4E7] sticky top-0 z-30 md:hidden">
        <div className="flex justify-between items-center px-4 h-16">
          <button
            id="hamburger-btn"
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-[#52525B] hover:bg-[#F3F2EE] transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <HardHat className="w-6 h-6 text-[#D97706]" />
            <span className="text-lg font-bold text-[#1A1A1A]">{t('brand.name') || 'EquiRent'}</span>
          </Link>
          
          <button className="relative p-2 text-[#52525B] hover:text-[#D97706] transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>
      
      {/* Desktop Top Bar (hidden on mobile) */}
      <header className="bg-white border-b border-[#E4E4E7] sticky top-0 z-30 hidden md:block">
        <div className="flex justify-between items-center px-6 h-16">
          <div>
            <h1 className="text-lg font-semibold text-[#1A1A1A]">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-[#A1A1AA]">
              {t('topbar.subtitle')}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F3F2EE] hover:bg-[#FEF3C7] transition"
              >
                <Languages className="w-4 h-4 text-[#D97706]" />
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {currentLanguageName}
                </span>
                <ChevronDown className={`w-3 h-3 text-[#52525B] transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {languageMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLanguageMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-strong border border-[#E4E4E7] z-50 overflow-hidden"
                    >
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setLanguageMenuOpen(false);
                          }}
                          className={`
                            w-full text-left px-4 py-3 text-sm transition
                            ${currentLang === lang.code 
                              ? 'bg-[#D97706] text-white' 
                              : 'text-[#1A1A1A] hover:bg-[#FEF3C7]'
                            }
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${currentLang === lang.code ? 'bg-white' : 'bg-[#D97706]'}`} />
                            {lang.name}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Notification Button */}
            <button className="relative p-2 rounded-lg text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706] transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1 rounded-lg hover:bg-[#F3F2EE] transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-semibold text-sm">
                  {getUserInitials()}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium text-[#1A1A1A]">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-[#A1A1AA]">{user?.email || 'admin@equirent.com'}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-[#A1A1AA] hidden lg:block" />
              </button>
              
              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-strong border border-[#E4E4E7] z-50 overflow-hidden">
                    <Link 
                      to="/admin/profile" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F9F8F6] transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-semibold">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A]">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-[#A1A1AA]">{user?.email || 'admin@equirent.com'}</p>
                      </div>
                    </Link>
                    <div className="border-t border-[#E4E4E7]"></div>
                    <Link 
                      to="/admin/settings" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F9F8F6] transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('topbar.profile.settings')}</span>
                    </Link>
                    <Link 
                      to="/admin/reports" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F9F8F6] transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <TrendingUp className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('topbar.profile.reports')}</span>
                    </Link>
                    <div className="border-t border-[#E4E4E7]"></div>
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }} 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{t('topbar.profile.logout')}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="admin-sidebar"
        className={`
          fixed top-0 left-0 h-full bg-[#1C1917] transition-all duration-300 z-50
          ${isMobile 
            ? `w-72 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl` 
            : `${sidebarOpen ? 'w-64' : 'w-20'}`
          }
        `}
        style={{
          boxShadow: isMobile && sidebarOpen ? '0 0 20px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {(sidebarOpen || !isMobile) ? (
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <HardHat className="w-7 h-7 text-[#D97706]" />
              <span className="text-white font-bold text-lg">{t('brand.name') || 'EquiRent'}</span>
              <span className="text-[#D97706] text-xs bg-white/10 px-1.5 py-0.5 rounded">{t('brand.role') || 'Admin'}</span>
            </Link>
          ) : (
            <HardHat className="w-7 h-7 text-[#D97706] mx-auto" />
          )}
          
          {/* Close button on mobile, toggle on desktop */}
          {isMobile ? (
            <button 
              onClick={toggleSidebar}
              className="text-white/60 hover:text-white transition md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={toggleSidebar}
              className="text-white/60 hover:text-white transition hidden md:block"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 h-[calc(100vh-64px)]">
          {Object.entries(groupedNav).map(([section, items]) => (
            <div key={section} className="mb-6">
              {(sidebarOpen || !isMobile) && (
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider px-3 mb-3">
                  {t(`nav.sections.${section.toLowerCase()}`) || section}
                </div>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isItemActive = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 group relative
                      ${isItemActive 
                        ? 'bg-[#D97706] text-white' 
                        : item.highlight 
                          ? 'bg-[#D97706]/20 text-white border border-[#D97706]/50 hover:bg-[#D97706]/30' 
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }
                    `}
                    title={(!sidebarOpen && !isMobile) ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {(sidebarOpen || !isMobile) && (
                      <>
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="bg-[#D97706] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.highlight && (
                          <span className="text-[10px] text-[#D97706] animate-pulse">●</span>
                        )}
                      </>
                    )}
                    {(!sidebarOpen && !isMobile) && item.badge && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        
        {/* Bottom Section - User Info & Logout */}
        <div className="p-3 border-t border-white/10">
          {(sidebarOpen || !isMobile) && (
            <div className="px-3 py-2 mb-2">
              <p className="text-white text-sm font-medium">{user?.name || 'Admin User'}</p>
              <p className="text-white/40 text-xs truncate">{user?.email || 'admin@equirent.com'}</p>
            </div>
          )}
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(sidebarOpen || !isMobile) && <span className="text-sm font-medium">{t('bottom.logout') || 'Logout'}</span>}
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className={`
        transition-all duration-300
        ${!isMobile ? (sidebarOpen ? 'md:ml-64' : 'md:ml-20') : ''}
      `}>
        {/* Page Content */}
        <main className={isMobile ? 'p-4 pt-6' : 'p-6'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
