import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Search, 
  Calendar, 
  User, 
  Heart, 
  Menu, 
  X, 
  Bell, 
  Moon, 
  Sun, 
  Settings,
  LogOut,
  HardHat,
  Package,
  Wrench,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Shield,
  Sparkles,
  Languages,
  ChevronDown,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerLayout = () => {
  const { t } = useTranslation('customerLayout');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
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
  
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowProfileMenu(false);
    setShowNotifications(false);
    setLanguageMenuOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/customer/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/search', icon: Search, label: t('nav.browseCars') },
    { path: '/customer/bookings', icon: Calendar, label: t('nav.myBookings') },
    { path: '/customer/profile', icon: User, label: t('nav.profile') }
  ];
  
  const notifications = [
    { id: 1, title: t('notifications.bookingConfirmedTitle'), message: t('notifications.bookingConfirmed', { carName: 'CAT 320 Excavator' }), time: '2 hours ago', read: false, type: 'success' },
    { id: 2, title: t('notifications.newMessageTitle'), message: t('notifications.newMessage', { ownerName: 'Equipment Owner' }), time: '1 day ago', read: false, type: 'info' },
    { id: 3, title: t('notifications.bookingCompletedTitle'), message: t('notifications.bookingCompleted', { carName: 'Sinotruk HOWO' }), time: '3 days ago', read: true, type: 'success' }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };
  
  const getUserName = () => {
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    return t('profile.defaultName');
  };
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-[#F9F8F6]'}`}>
      {/* Top Navbar */}
      <nav className={`sticky top-0 z-40 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#E4E4E7]'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-[#D97706]' : 'text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706]'}`}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Logo */}
            <Link to="/customer/dashboard" className="flex items-center gap-2 group">
              <div className="relative">
                <HardHat className="w-7 h-7 text-[#D97706] group-hover:scale-110 transition-transform" />
                <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className={`text-lg font-bold transition ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {t('brand.name')}
              </span>
              <span className="text-[10px] bg-[#D97706]/20 text-[#D97706] px-1.5 py-0.5 rounded-full hidden sm:inline">
                Ethiopia
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${active 
                        ? darkMode 
                          ? 'bg-[#D97706] text-white shadow-lg' 
                          : 'bg-[#D97706] text-white shadow-md'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-[#D97706]'
                          : 'text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706]'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {active && (
                      <ChevronRight className="w-3 h-3 ml-1" />
                    )}
                  </Link>
                );
              })}
            </div>
            
            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-[#D97706]' : 'text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706]'}`}
                >
                  <Languages className="w-5 h-5" />
                </button>
                
                <AnimatePresence>
                  {languageMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setLanguageMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute right-0 mt-2 w-40 rounded-xl shadow-strong border z-50 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#E4E4E7]'}`}
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
                                : darkMode
                                  ? 'text-gray-300 hover:bg-gray-700'
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
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-[#D97706]' : 'text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706]'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* Notifications Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-lg transition ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-[#D97706]' : 'text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706]'}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-strong border z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#E4E4E7]'}`}>
                      <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`}>
                        <div className="flex justify-between items-center">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{t('notifications.title')}</h3>
                          <button className="text-xs text-[#D97706] hover:underline">{t('notifications.markAllRead')}</button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-3 transition cursor-pointer ${!notif.read ? darkMode ? 'bg-gray-700/50' : 'bg-[#FEF3C7]/30' : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#F9F8F6]'} border-b ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`}
                          >
                            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{notif.title}</p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-[#52525B]'}`}>{notif.message}</p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-[#A1A1AA]'}`}>{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className={`p-3 border-t text-center ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`}>
                        <button className="text-sm text-[#D97706] hover:underline">{t('notifications.viewAll')}</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 md:gap-3 p-1 rounded-lg hover:bg-[#F3F2EE] dark:hover:bg-gray-700 transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:scale-105 transition">
                    {getInitials()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {getUserName()}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-[#A1A1AA]'}`}>
                      Customer
                    </p>
                  </div>
                </button>
                
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                    <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-strong border z-50 overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#E4E4E7]'}`}>
                      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-bold">
                            {getInitials()}
                          </div>
                          <div>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{user?.name || 'Customer User'}</p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-[#A1A1AA]'}`}>{user?.email || 'customer@equirent.com'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link 
                          to="/customer/profile" 
                          className={`flex items-center gap-3 px-4 py-2.5 transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-[#1A1A1A] hover:bg-[#F9F8F6]'}`}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm">{t('bottomNav.profile')}</span>
                        </Link>
                        
                        <Link 
                          to="/customer/messages" 
                          className={`flex items-center gap-3 px-4 py-2.5 transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-[#1A1A1A] hover:bg-[#F9F8F6]'}`}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Messages</span>
                          <span className="ml-auto text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">2</span>
                        </Link>
                        <Link 
                          to="/customer/help" 
                          className={`flex items-center gap-3 px-4 py-2.5 transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-[#1A1A1A] hover:bg-[#F9F8F6]'}`}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <HelpCircle className="w-4 h-4" />
                          <span className="text-sm">Help Center</span>
                        </Link>
                      </div>
                      
                      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`}>
                        <button 
                          onClick={() => {
                            setShowProfileMenu(false);
                            logout();
                          }} 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition w-full text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-500">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed top-0 left-0 bottom-0 w-72 z-50 shadow-xl md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`}>
                <div className="flex items-center gap-2">
                  <HardHat className="w-6 h-6 text-[#D97706]" />
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{t('brand.name')}</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className={`p-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#F3F2EE]'}`}>
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-[#52525B]'}`} />
                </button>
              </div>
              
              <div className="p-4 space-y-1">
                {/* User Info Card */}
                <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-[#F9F8F6]'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-bold">
                      {getInitials()}
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{user?.name || 'Customer User'}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-[#A1A1AA]'}`}>Customer</p>
                    </div>
                  </div>
                </div>
                
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition
                        ${active 
                          ? 'bg-[#D97706] text-white' 
                          : darkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-[#52525B] hover:bg-[#F3F2EE]'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  );
                })}
                
                <div className={`border-t my-3 ${darkMode ? 'border-gray-700' : 'border-[#E4E4E7]'}`} />
                
                <button 
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition w-full ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-[#52525B] hover:bg-[#F3F2EE]'}`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg transition w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-6">
        <Outlet />
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t md:hidden z-40 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#E4E4E7]'}`}>
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center py-2 px-4 group"
              >
                <Icon className={`w-5 h-5 transition ${active ? 'text-[#D97706]' : darkMode ? 'text-gray-400 group-hover:text-[#D97706]' : 'text-[#A1A1AA] group-hover:text-[#D97706]'}`} />
                <span className={`text-[10px] mt-1 transition ${active ? 'text-[#D97706]' : darkMode ? 'text-gray-400' : 'text-[#A1A1AA]'}`}>
                  {item.label === 'Browse Cars' ? 'Browse' : item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CustomerLayout;
