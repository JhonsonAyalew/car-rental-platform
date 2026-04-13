import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  BarChart3,
  Shield,
  LogOut,
  Menu,
  X,
  Car
} from 'lucide-react';

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const navItems = [
    { path: '/super-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/super-admin/admins', icon: Shield, label: 'Admin Management' },
    { path: '/super-admin/users', icon: Users, label: 'All Users' },
    { path: '/super-admin/bookings', icon: FileText, label: 'All Bookings' },
    { path: '/super-admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/super-admin/settings', icon: Settings, label: 'Platform Settings' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-[#1C1917] transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen ? (
            <Link to="/super-admin/dashboard" className="flex items-center gap-2">
              <Car className="w-7 h-7 text-[#D97706]" />
              <span className="text-white font-bold">CarRental</span>
              <span className="text-[#D97706] text-xs bg-white/10 px-1.5 py-0.5 rounded">Super</span>
            </Link>
          ) : (
            <Car className="w-7 h-7 text-[#D97706] mx-auto" />
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-3">
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
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-3 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/60 hover:text-white hover:bg-white/10">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
