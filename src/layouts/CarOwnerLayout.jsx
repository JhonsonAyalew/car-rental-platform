import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Car, 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  User, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CarOwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();
  
  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Desktop: sidebar open by default
      } else {
        setSidebarOpen(false); // Mobile: sidebar closed by default
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
        const sidebar = document.getElementById('mobile-sidebar');
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
    { path: '/owner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/owner/submit-car', icon: PlusCircle, label: 'Submit Car' },
    { path: '/owner/submissions', icon: List, label: 'My Listings' },
    { path: '/owner/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/owner/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/owner/profile', icon: User, label: 'Profile' },
    { path: '/owner/settings', icon: Settings, label: 'Settings' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          
          <Link to="/owner/dashboard" className="flex items-center gap-2">
            <Car className="w-6 h-6 text-[#D97706]" />
            <span className="text-lg font-bold text-[#1A1A1A]">CarRental</span>
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
          <h1 className="text-lg font-semibold text-[#1A1A1A]">
            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#52525B] hover:text-[#D97706] transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || 'O'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-[#1A1A1A]">{user?.name || 'Car Owner'}</p>
                <p className="text-xs text-[#A1A1AA]">Car Owner</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Sidebar - Different behavior for mobile vs desktop */}
      {/* Mobile: Overlay drawer that slides in */}
      {/* Desktop: Fixed sidebar that pushes content */}
      
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="mobile-sidebar"
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
          {sidebarOpen || !isMobile ? (
            <Link to="/owner/dashboard" className="flex items-center gap-2">
              <Car className="w-7 h-7 text-[#D97706]" />
              <span className="text-white font-bold text-lg">CarRental</span>
              <span className="text-[#D97706] text-xs bg-white/10 px-1.5 py-0.5 rounded">Owner</span>
            </Link>
          ) : (
            <Car className="w-7 h-7 text-[#D97706] mx-auto" />
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
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1
                ${isActive(item.path) 
                  ? 'bg-[#D97706] text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {(sidebarOpen || !isMobile) && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        {/* User Info & Logout */}
        <div className="p-3 border-t border-white/10">
          {(sidebarOpen || !isMobile) && (
            <div className="px-3 py-2 mb-2">
              <p className="text-white text-sm font-medium">{user?.name || 'Car Owner'}</p>
              <p className="text-white/40 text-xs truncate">{user?.email || 'owner@example.com'}</p>
            </div>
          )}
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(sidebarOpen || !isMobile) && <span className="text-sm font-medium">Logout</span>}
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

export default CarOwnerLayout;
