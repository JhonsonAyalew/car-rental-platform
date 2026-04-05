import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Car, Calendar, User, Home, Search, Heart, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CustomerLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-[#E4E4E7] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#52525B] hover:bg-[#F3F2EE]"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Logo */}
            <Link to="/customer/dashboard" className="flex items-center gap-2">
              <Car className="w-7 h-7 text-[#D97706]" />
              <span className="text-lg font-bold text-[#1A1A1A]">CarRental</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/customer/dashboard" className={`text-sm font-medium transition ${isActive('/customer/dashboard') ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'}`}>
                Dashboard
              </Link>
              <Link to="/search" className={`text-sm font-medium transition ${isActive('/search') ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'}`}>
                Browse Cars
              </Link>
              <Link to="/customer/bookings" className={`text-sm font-medium transition ${isActive('/customer/bookings') ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'}`}>
                My Bookings
              </Link>
              <Link to="/customer/wishlist" className={`text-sm font-medium transition ${isActive('/customer/wishlist') ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'}`}>
                Wishlist
              </Link>
            </div>
            
            {/* Profile & Notifications */}
            <div className="flex items-center gap-3">
              {/* Notifications Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg text-[#52525B] hover:bg-[#F3F2EE] hover:text-[#D97706] transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-strong border border-[#E4E4E7] z-50">
                      <div className="p-3 border-b border-[#E4E4E7]">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="p-3 hover:bg-[#F9F8F6] border-b border-[#E4E4E7]">
                          <p className="text-sm">Your booking for Tesla Model 3 is confirmed!</p>
                          <p className="text-xs text-[#A1A1AA] mt-1">2 hours ago</p>
                        </div>
                        <div className="p-3 hover:bg-[#F9F8F6] border-b border-[#E4E4E7]">
                          <p className="text-sm">New message from car owner</p>
                          <p className="text-xs text-[#A1A1AA] mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Profile */}
              <Link to="/customer/profile" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden md:inline text-sm font-medium text-[#1A1A1A]">{user?.name || 'User'}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-xl md:hidden">
            <div className="p-4 border-b border-[#E4E4E7] flex justify-between items-center">
              <span className="font-bold text-[#1A1A1A]">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <Link to="/customer/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F3F2EE]">
                <Home className="w-5 h-5" /> Dashboard
              </Link>
              <Link to="/search" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F3F2EE]">
                <Search className="w-5 h-5" /> Browse Cars
              </Link>
              <Link to="/customer/bookings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F3F2EE]">
                <Calendar className="w-5 h-5" /> My Bookings
              </Link>
              <Link to="/customer/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F3F2EE]">
                <Heart className="w-5 h-5" /> Wishlist
              </Link>
              <Link to="/customer/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F3F2EE]">
                <User className="w-5 h-5" /> Profile
              </Link>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-6">
        <Outlet />
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4E4E7] md:hidden z-40">
        <div className="flex justify-around items-center py-2">
          <Link to="/customer/dashboard" className="flex flex-col items-center py-2 px-4">
            <Home className={`w-5 h-5 ${isActive('/customer/dashboard') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`} />
            <span className={`text-[10px] mt-1 ${isActive('/customer/dashboard') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`}>Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center py-2 px-4">
            <Search className={`w-5 h-5 ${isActive('/search') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`} />
            <span className={`text-[10px] mt-1 ${isActive('/search') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`}>Search</span>
          </Link>
          <Link to="/customer/bookings" className="flex flex-col items-center py-2 px-4">
            <Calendar className={`w-5 h-5 ${isActive('/customer/bookings') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`} />
            <span className={`text-[10px] mt-1 ${isActive('/customer/bookings') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`}>Bookings</span>
          </Link>
          <Link to="/customer/profile" className="flex flex-col items-center py-2 px-4">
            <User className={`w-5 h-5 ${isActive('/customer/profile') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`} />
            <span className={`text-[10px] mt-1 ${isActive('/customer/profile') ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`}>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CustomerLayout;
