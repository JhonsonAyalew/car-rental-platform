import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  PlusCircle, DollarSign, Calendar, HardHat, TrendingUp,
  Clock, ChevronRight, ArrowUpRight, Star, Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { StatusBadge, Badge, Skeleton } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] } }),
};

const StatCard = ({ icon: Icon, label, value, trend, accent = '#8b5cf6', index = 0 }) => (
  <motion.div variants={fadeUp} custom={index} initial="hidden" animate="show"
    className="relative overflow-hidden border p-5"
    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 flex items-center justify-center"
        style={{ background: `${accent}15`, border: `1px solid ${accent}28`, borderRadius: 'var(--r-md)' }}>
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      {trend != null && (
        <div className="flex items-center gap-1 text-xs font-bold px-2 py-1"
          style={{ background: trend >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: trend >= 0 ? 'var(--success)' : 'var(--danger)', borderRadius: 'var(--r-sm)' }}>
          <ArrowUpRight className={`w-3 h-3 ${trend < 0 ? 'rotate-90' : ''}`} />
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <p className="text-2xl font-black mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
    <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{label}</p>
  </motion.div>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border p-3 shadow-xl" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)' }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: 'var(--text-muted)' }}>{p.name}:</span>
          <span className="font-bold ml-auto pl-2" style={{ color: 'var(--text-primary)' }}>
            {p.name === 'earnings' ? `ETB ${(p.value / 1000).toFixed(0)}k` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const OwnerDashboardPage = () => {
  const { t }    = useTranslation('ownerDashboard');
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats,   setStats]   = useState({});
  const [earningsData, setEarningsData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [myEquipment, setMyEquipment] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalEquipment: 6, activeBookings: 3, pendingSubmissions: 1,
        totalEarnings: 384000, monthlyEarnings: 84500, avgRating: 4.8,
        completedBookings: 27, cancelledBookings: 2,
      });
      setEarningsData([
        { month: 'Aug', earnings: 42000, bookings: 5 },
        { month: 'Sep', earnings: 58000, bookings: 7 },
        { month: 'Oct', earnings: 51000, bookings: 6 },
        { month: 'Nov', earnings: 72000, bookings: 9 },
        { month: 'Dec', earnings: 76000, bookings: 10 },
        { month: 'Jan', earnings: 84500, bookings: 11 },
      ]);
      setRecentBookings([
        { id: 'BK-1001', customer: 'Abebe Bekele',   equipment: 'CAT 320 Excavator', start: '2024-01-20', end: '2024-01-25', amount: 42500, status: 'confirmed' },
        { id: 'BK-1002', customer: 'Selam Tesfaye',  equipment: 'HOWO Truck 371',    start: '2024-01-22', end: '2024-01-28', amount: 28800, status: 'pending'   },
        { id: 'BK-1003', customer: 'Tekle Berhan',   equipment: 'CAT 320 Excavator', start: '2024-01-15', end: '2024-01-18', amount: 25500, status: 'completed' },
        { id: 'BK-1004', customer: 'Meron Desta',    equipment: 'Komatsu Loader',    start: '2024-01-28', end: '2024-02-02', amount: 36000, status: 'confirmed' },
      ]);
      setMyEquipment([
        { id: 'EQ-01', name: 'CAT 320 Excavator',  status: 'active', bookings: 14, rating: 4.9, pricePerDay: 8500  },
        { id: 'EQ-02', name: 'HOWO Truck 371',      status: 'active', bookings: 8,  rating: 4.7, pricePerDay: 4800  },
        { id: 'EQ-03', name: 'Komatsu Loader',      status: 'active', bookings: 5,  rating: 4.6, pricePerDay: 7200  },
        { id: 'EQ-04', name: 'Water Bowser',         status: 'inactive', bookings: 0, rating: null, pricePerDay: 4500 },
      ]);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const axisStyle = { fontSize: 11, fill: 'var(--text-muted)' };

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton.Card key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {t('title') || `Welcome back, ${user?.name?.split(' ')[0] || 'Owner'}`}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle') || 'Manage your equipment and track earnings'}
          </p>
        </motion.div>
        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
          <Link to="/owner/submit">
            <Button leftIcon={<PlusCircle className="w-4 h-4" />}>
              {t('addEquipment') || 'Add Equipment'}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard index={0} icon={HardHat}    label={t('kpi.equipment') || 'My Equipment'}      value={stats.totalEquipment}   trend={null}   accent="#8b5cf6" />
        <StatCard index={1} icon={Calendar}   label={t('kpi.active')    || 'Active Bookings'}    value={stats.activeBookings}   trend={8}      accent="var(--brand)" />
        <StatCard index={2} icon={DollarSign} label={t('kpi.monthly')   || 'This Month'}         value={`ETB ${(stats.monthlyEarnings / 1000).toFixed(0)}k`} trend={18} accent="var(--success)" />
        <StatCard index={3} icon={Star}       label={t('kpi.rating')    || 'Avg. Rating'}         value={`${stats.avgRating} ⭐`} trend={null}  accent="var(--warning)" />
      </div>

      {/* Earnings chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show"
          className="xl:col-span-2 border p-5"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
            {t('charts.earnings') || 'Monthly Earnings'}
          </h2>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Last 6 months performance</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={isDark ? 0.25 : 0.12} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="earnings" name="earnings" stroke="#8b5cf6" strokeWidth={2} fill="url(#earnGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Booking summary */}
        <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show"
          className="border p-5"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Booking Summary</h2>
          <div className="space-y-3">
            {[
              { label: 'Completed', val: stats.completedBookings, color: 'var(--success)' },
              { label: 'Active',    val: stats.activeBookings,    color: '#8b5cf6' },
              { label: 'Pending',   val: stats.pendingSubmissions, color: 'var(--warning)' },
              { label: 'Cancelled', val: stats.cancelledBookings, color: 'var(--danger)' },
            ].map(s => {
              const total = stats.completedBookings + stats.activeBookings + stats.pendingSubmissions + stats.cancelledBookings;
              const pct   = Math.round((s.val / total) * 100);
              return (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                    <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{s.val} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-overlay)' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, delay: 0.2 }}
                      className="h-full rounded-full" style={{ background: s.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-5 border-t" style={{ borderColor: 'var(--border-faint)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Total Earnings</p>
            <p className="text-xl font-black" style={{ color: '#8b5cf6' }}>ETB {stats.totalEarnings?.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>

      {/* My Equipment */}
      <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>My Equipment</h2>
          <Link to="/owner/submissions" className="flex items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#8b5cf6'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {myEquipment.map((eq, i) => (
            <motion.div key={eq.id} variants={fadeUp} custom={i} initial="hidden" animate="show"
              className="border p-4 transition-all duration-200"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#8b5cf640'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', borderRadius: 'var(--r-md)' }}>
                  <HardHat className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                </div>
                <StatusBadge status={eq.status} />
              </div>
              <p className="text-sm font-bold mb-1 leading-tight" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
              <p className="text-xs mb-3" style={{ color: 'var(--brand)' }}>ETB {eq.pricePerDay.toLocaleString()}/day</p>
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{eq.bookings} bookings</span>
                {eq.rating && <span>⭐ {eq.rating}</span>}
              </div>
            </motion.div>
          ))}

          {/* Add new card */}
          <Link to="/owner/submit">
            <motion.div variants={fadeUp} custom={myEquipment.length} initial="hidden" animate="show"
              className="border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer h-full min-h-[120px]"
              style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.background = 'transparent'; }}>
              <PlusCircle className="w-6 h-6" style={{ color: '#8b5cf6' }} />
              <p className="text-xs font-semibold" style={{ color: '#8b5cf6' }}>Add Equipment</p>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div variants={fadeUp} custom={5} initial="hidden" animate="show">
        <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-base)' }}>
            <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Recent Bookings</h2>
            <Link to="/owner/calendar" className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#8b5cf6'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              Calendar View <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: 580, width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-faint)', background: 'var(--bg-surface)' }}>
                  {['Customer', 'Equipment', 'Dates', 'Amount', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border-faint)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{b.customer}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{b.equipment}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)' }}>{b.start} → {b.end}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="text-sm font-bold" style={{ color: '#8b5cf6' }}>ETB {b.amount.toLocaleString()}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={fadeUp} custom={6} initial="hidden" animate="show">
        <h3 className="font-bold text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-faint)' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/owner/submit',      icon: PlusCircle,  label: 'Submit Equipment', color: '#8b5cf6' },
            { to: '/owner/calendar',    icon: Calendar,    label: 'View Calendar',    color: 'var(--brand)' },
            { to: '/owner/analytics',   icon: TrendingUp,  label: 'Analytics',        color: 'var(--success)' },
            { to: '/owner/submissions', icon: HardHat,     label: 'My Submissions',   color: 'var(--info)' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to}>
              <div className="p-4 border text-center transition-all duration-200"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.background = `${color}08`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.background = 'var(--bg-surface)'; }}>
                <div className="w-9 h-9 flex items-center justify-center mx-auto mb-2" style={{ background: `${color}15`, borderRadius: 'var(--r-md)' }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerDashboardPage;
