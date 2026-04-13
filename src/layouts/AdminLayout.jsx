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
    <div className="min-h-screen bg-[#F9F8F6] flex">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#1C1917] transition-all duration-300 z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${sidebarOpen ? 'w-72' : 'w-20'}
        shadow-xl
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen ? (
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <HardHat className="w-7 h-7 text-[#D97706]" />
              <span className="text-white font-bold text-lg">{t('brand.name')}</span>
              <span className="text-[#D97706] text-xs bg-white/10 px-1.5 py-0.5 rounded">{t('brand.role')}</span>
            </Link>
          ) : (
            <HardHat className="w-7 h-7 text-[#D97706] mx-auto" />
          )}
          
          {/* Desktop toggle button */}
          {!isMobile && (
            <button 
              onClick={toggleSidebar}
              className="text-white/60 hover:text-white transition"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}
          
          {/* Mobile close button */}
          {isMobile && sidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="text-white/60 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 h-[calc(100vh-64px)]">
          {Object.entries(groupedNav).map(([section, items]) => (
            <div key={section} className="mb-6">
              {sidebarOpen && (
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider px-3 mb-3">
                  {t(`nav.sections.${section.toLowerCase()}`)}
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
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 group
                      ${isItemActive 
                        ? 'bg-[#D97706] text-white' 
                        : item.highlight 
                          ? 'bg-[#D97706]/20 text-white border border-[#D97706]/50 hover:bg-[#D97706]/30' 
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }
                    `}
                    title={!sidebarOpen ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {sidebarOpen && (
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
                    {!sidebarOpen && item.badge && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        
        {/* Bottom Section */}
        <div className="p-3 border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">{t('bottom.logout')}</span>}
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${!isMobile && sidebarOpen ? 'md:ml-72' : !isMobile ? 'md:ml-20' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E4E4E7] sticky top-0 z-30">
          <div className="flex justify-between items-center px-4 md:px-6 h-16">
            {/* Left Section - Mobile Menu Button */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706] transition md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base md:text-lg font-semibold text-[#1A1A1A]">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-[#A1A1AA] hidden md:block">
                  {t('topbar.subtitle')}
                </p>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F3F2EE] hover:bg-[#FEF3C7] transition"
                >
                  <Languages className="w-4 h-4 text-[#D97706]" />
                  <span className="text-sm font-medium text-[#1A1A1A] hidden sm:inline">
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
                  className="flex items-center gap-2 md:gap-3 p-1 rounded-lg hover:bg-[#F3F2EE] transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  {!isMobile && (
                    <>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-medium text-[#1A1A1A]">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-[#A1A1AA]">{user?.email || 'admin@equirent.com'}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />
                    </>
                  )}
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
        
        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
