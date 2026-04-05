import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Car, User, LogIn } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher'; // ⚠️ Add this import

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#E4E4E7] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Car className="w-8 h-8 text-[#D97706]" />
              <span className="text-xl font-bold text-[#1A1A1A]">CarRental</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/search" className="text-[#52525B] hover:text-[#D97706] transition">Browse Cars</Link>
              <Link to="/about" className="text-[#52525B] hover:text-[#D97706] transition">About</Link>
              <Link to="/contact" className="text-[#52525B] hover:text-[#D97706] transition">Contact</Link>
            </div>
            
            {/* Auth Buttons & Language Switcher */}
            <div className="flex items-center gap-3">
              {/* 🌍 Language Switcher - Added here */}
              <LanguageSwitcher />
              
              <Link to="/login" className="text-[#52525B] hover:text-[#D97706] transition px-3 py-2">
                <LogIn className="w-5 h-5 md:hidden" />
                <span className="hidden md:inline">Log in</span>
              </Link>
              <Link 
                to="/register" 
                className="bg-[#D97706] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#B45309] transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-[#E4E4E7] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[#A1A1AA] text-[13px]">
            © 2024 CarRental Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
