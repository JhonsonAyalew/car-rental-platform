import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Shield, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/index.jsx';
import ThemeToggle from '../components/ui/ThemeToggle';

const NAV = [
  { path: '/superadmin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/superadmin/admins',    icon: Users,           label: 'Admins'    },
];

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const location         = useLocation();
  const navigate         = useNavigate();
  const isActive         = (p) => location.pathname === p;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>
      <aside className="w-56 flex-shrink-0 border-r flex flex-col" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-base)' }}>
        <div className="h-16 flex items-center gap-2.5 px-4 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <div className="w-7 h-7 flex items-center justify-center" style={{ background: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>
            <Truck className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <span className="font-black text-sm block" style={{ color: 'var(--text-primary)' }}>EquipRent</span>
            <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'var(--danger)' }}>Super Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ path, icon: Icon, label }) => (
            <Link key={path} to={path}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-all"
              style={{
                background:   isActive(path) ? 'var(--brand)' : 'transparent',
                color:        isActive(path) ? '#fff' : 'var(--text-muted)',
                borderRadius: 'var(--r-md)',
              }}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t p-3" style={{ borderColor: 'var(--border-base)' }}>
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <Avatar name={user?.name} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user?.name}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Super Admin</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-2 px-3 py-2 w-full text-sm transition-colors"
            style={{ color: 'var(--text-muted)', borderRadius: 'var(--r-md)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = 'var(--danger-bg)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <h1 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            {NAV.find(n => isActive(n.path))?.label ?? 'Super Admin'}
          </h1>
          <ThemeToggle size="sm" />
        </header>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
