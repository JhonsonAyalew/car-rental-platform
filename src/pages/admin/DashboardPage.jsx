import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Calendar, Users, DollarSign, TrendingUp, Clock, Download,
  Timer, HardHat, Package, ArrowUpRight, ChevronRight, Activity,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Card, Badge, StatusBadge, Skeleton } from '../../components/ui/index.jsx';

/* ── Animation ── */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.055, duration: 0.38, ease: [0.22, 1, 0.36, 1] } }),
};

/* ── Stat Card ── */
const StatCard = ({ icon: Icon, label, value, trend, trendLabel, accent = 'var(--brand)', index = 0, onClick }) => {
  const { isDark } = useTheme();
  return (
    <motion.div variants={fadeUp} custom={index} initial="hidden" animate="show"
      onClick={onClick}
      className="relative overflow-hidden border transition-all duration-200"
      style={{
        background:   'var(--bg-elevated)',
        borderColor:  'var(--border-base)',
        borderRadius: 'var(--r-lg)',
        cursor:       onClick ? 'pointer' : 'default',
        padding:      '20px',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.borderColor = accent; }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.borderColor = 'var(--border-base)'; }}
    >
      {/* Glow */}
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(circle, ${accent}18, transparent 70%)` }} />

      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}14`, border: `1px solid ${accent}28`, borderRadius: 'var(--r-md)' }}>
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        {trend != null && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1`}
            style={{
              background:   trend >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              color:        trend >= 0 ? 'var(--success)' : 'var(--danger)',
              borderRadius: 'var(--r-sm)',
            }}>
            <ArrowUpRight className={`w-3 h-3 ${trend < 0 ? 'rotate-90' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <p className="text-2xl font-black mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
      <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{label}</p>
      {trendLabel && (
        <p className="text-xs mt-3 pt-3 border-t" style={{ color: 'var(--text-faint)', borderColor: 'var(--border-faint)' }}>
          {trendLabel}
        </p>
      )}
    </motion.div>
  );
};

/* ── Chart Tooltip ── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border p-3 shadow-xl" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)' }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span style={{ color: 'var(--text-muted)' }}>{p.name}:</span>
          <span className="font-bold ml-auto pl-2" style={{ color: 'var(--text-primary)' }}>
            {p.name === 'revenue' ? `ETB ${(p.value / 1000).toFixed(0)}k` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Section Card ── */
const SectionCard = ({ title, subtitle, icon: Icon, badge, badgeCount, action, actionTo, children }) => (
  <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
    <div className="flex flex-wrap items-start justify-between gap-3 p-5 border-b" style={{ borderColor: 'var(--border-base)' }}>
      <div>
        <h2 className="font-bold text-sm flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-primary)' }}>
          {Icon && <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--brand)' }} />}
          {title}
          {badge && badgeCount > 0 && (
            <span className="text-[10px] font-black px-1.5 py-0.5" style={{ background: 'var(--brand)', color: '#fff', borderRadius: 'var(--r-sm)' }}>
              {badgeCount}
            </span>
          )}
        </h2>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      {action && actionTo && (
        <Link to={actionTo} className="flex items-center gap-1 text-xs font-semibold transition-colors group"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          {action}
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
    {children}
  </div>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const AdminDashboardPage = () => {
  const { t }       = useTranslation('adminDashboard');
  const { isDark }  = useTheme();
  const [loading, setLoading]   = useState(true);
  const [period, setPeriod]     = useState('weekly');
  const [stats, setStats]       = useState({});
  const [revenueData, setRevenueData]     = useState([]);
  const [bookingData, setBookingData]     = useState([]);
  const [recentBookings, setRecentBookings]         = useState([]);
  const [recentSubmissions, setRecentSubmissions]   = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setStats({
        totalEquipment: 234, activeBookings: 42, pendingSubmissions: 12,
        totalRevenue: 2845000, totalUsers: 1240, equipmentOwners: 67,
        activeTimeSlots: 156, pendingMaterialRequests: 8,
      });
      setRevenueData([
        { name: 'Week 1', revenue: 425000, bookings: 32 },
        { name: 'Week 2', revenue: 538000, bookings: 41 },
        { name: 'Week 3', revenue: 612000, bookings: 48 },
        { name: 'Week 4', revenue: 745000, bookings: 56 },
      ]);
      setBookingData([
        { month: 'Jan', bookings: 45, revenue: 1250000 },
        { month: 'Feb', bookings: 52, revenue: 1480000 },
        { month: 'Mar', bookings: 61, revenue: 1760000 },
        { month: 'Apr', bookings: 58, revenue: 1690000 },
        { month: 'May', bookings: 73, revenue: 2120000 },
        { month: 'Jun', bookings: 84, revenue: 2450000 },
      ]);
      setRecentBookings([
        { id: 'BK-1001', customerName: 'Abebe Bekele', carName: 'CAT 320 Excavator', startDate: '2024-01-20', endDate: '2024-01-25', amount: 42500, status: 'confirmed', location: 'Addis Ababa' },
        { id: 'BK-1002', customerName: 'Selam Tesfaye', carName: 'Komatsu D65 Bulldozer', startDate: '2024-01-21', endDate: '2024-01-23', amount: 27000, status: 'pending', location: 'Adama' },
        { id: 'BK-1003', customerName: 'Tekle Berhan', carName: 'Liebherr LTM 1050 Crane', startDate: '2024-01-19', endDate: '2024-01-22', amount: 54000, status: 'completed', location: 'Addis Ababa' },
        { id: 'BK-1004', customerName: 'Meron Desta', carName: 'Sinotruk HOWO 371', startDate: '2024-01-22', endDate: '2024-01-28', amount: 28800, status: 'confirmed', location: 'Dire Dawa' },
      ]);
      setRecentSubmissions([
        { id: 'SUB-001', carName: 'CAT 320 Excavator', brand: 'Caterpillar', year: 2022, ownerName: 'Getachew Alemayehu', submittedDate: '2024-01-22', pricePerDay: 8500, status: 'pending', equipmentType: 'Excavator', location: 'Addis Ababa' },
        { id: 'SUB-002', carName: 'SANY SY335 Excavator', brand: 'SANY', year: 2023, ownerName: 'Tigist Worku', submittedDate: '2024-01-21', pricePerDay: 7800, status: 'pending', equipmentType: 'Excavator', location: 'Dire Dawa' },
        { id: 'SUB-003', carName: 'CAT 950 Wheel Loader', brand: 'Caterpillar', year: 2023, ownerName: 'Dawit Mekonnen', submittedDate: '2024-01-20', pricePerDay: 7200, status: 'review', equipmentType: 'Loader', location: 'Hawassa' },
        { id: 'SUB-004', carName: 'Water Bowser Automatic', brand: 'HOWO', year: 2022, ownerName: 'Helen Ayele', submittedDate: '2024-01-19', pricePerDay: 4500, status: 'pending', equipmentType: 'Water Truck', location: 'Dire Dawa' },
      ]);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const equipmentDist = [
    { name: 'Trucks', value: 89, color: 'var(--brand)' },
    { name: 'Excavators', value: 45, color: '#FF7A20' },
    { name: 'Loaders', value: 32, color: '#C4540A' },
    { name: 'Other', value: 38, color: '#F5A623' },
    { name: 'Bulldozers', value: 18, color: '#D97706' },
    { name: 'Cranes', value: 12, color: '#92400E' },
  ];

  const axisStyle   = { fontSize: 11, fill: 'var(--text-muted)' };
  const gridColor   = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <Skeleton.Card key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-full">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {t('title') || 'Dashboard'}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle') || 'Overview of your equipment rental platform'}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show" className="flex flex-wrap items-center gap-2">
          <div className="flex border overflow-hidden" style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)' }}>
            {['daily', 'weekly', 'monthly'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 py-1.5 text-xs font-semibold capitalize transition-all"
                style={{
                  background: period === p ? 'var(--brand)' : 'transparent',
                  color:      period === p ? '#fff' : 'var(--text-muted)',
                }}>
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium transition-all"
            style={{ borderColor: 'var(--border-base)', color: 'var(--text-muted)', borderRadius: 'var(--r-md)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand)'; e.currentTarget.style.borderColor = 'var(--brand-border)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-base)'; }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </motion.div>
      </div>

      {/* ── KPI Row 1 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard index={0} icon={HardHat}    label={t('kpi.equipment') || 'Total Equipment'}     value={stats.totalEquipment}   trend={12}   trendLabel="+18 this month" />
        <StatCard index={1} icon={Calendar}   label={t('kpi.bookings') || 'Active Bookings'}       value={stats.activeBookings}   trend={8}    trendLabel="Peak season" />
        <StatCard index={2} icon={Clock}      label={t('kpi.pending') || 'Pending Submissions'}    value={stats.pendingSubmissions} trend={null} trendLabel="Needs review" accent="#F5A623" />
        <StatCard index={3} icon={DollarSign} label={t('kpi.revenue') || 'Total Revenue'}          value={`ETB ${(stats.totalRevenue / 1000).toFixed(0)}k`} trend={23} trendLabel="vs last month" accent="var(--success)" />
      </div>

      {/* ── KPI Row 2 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard index={0} icon={Users}    label={t('kpi.users') || 'Total Users'}           value={stats.totalUsers}      trend={14}   trendLabel="+156 new" />
        <StatCard index={1} icon={Activity} label={t('kpi.owners') || 'Equipment Owners'}    value={stats.equipmentOwners} trend={13}   trendLabel="+8 new" />
        <StatCard index={2} icon={Timer}    label={t('kpi.slots') || 'Active Time Slots'}    value={stats.activeTimeSlots} trend={null} trendLabel="Time Controller →" accent="#8b5cf6"
          onClick={() => window.location.href = '/admin/time-controller'} />
        <StatCard index={3} icon={Package}  label={t('kpi.materials') || 'Material Requests'} value={stats.pendingMaterialRequests} trend={null} trendLabel="Pending delivery" accent="#F5A623"
          onClick={() => window.location.href = '/admin/materials'} />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        {/* Revenue area chart */}
        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show"
          className="xl:col-span-3 border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Revenue Overview</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Weekly performance</p>
            </div>
            <select className="text-xs px-2.5 py-1.5 border outline-none transition-colors"
              style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)', color: 'var(--text-muted)', borderRadius: 'var(--r-md)' }}>
              <option>Last 4 Weeks</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8650A" stopOpacity={isDark ? 0.25 : 0.15} />
                  <stop offset="100%" stopColor="#E8650A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#E8650A" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="bookings" stroke="#FF7A20" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-faint)' }}>
            {[['#E8650A', 'Revenue (ETB)'], ['#FF7A20', 'Bookings']].map(([c, l]) => (
              <div key={l} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 flex-shrink-0" style={{ background: c, borderRadius: '2px' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Equipment donut */}
        <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show"
          className="xl:col-span-2 border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Equipment Distribution</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>By category</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={equipmentDist} cx="50%" cy="50%" innerRadius="50%" outerRadius="70%"
                paddingAngle={3} dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}>
                {equipmentDist.map((e, i) => <Cell key={i} fill={e.color} stroke="transparent" />)}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
            {equipmentDist.map(e => (
              <div key={e.name} className="flex items-center gap-2">
                <span className="w-2 h-2 flex-shrink-0" style={{ background: e.color, borderRadius: '2px' }} />
                <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{e.name}</span>
                <span className="text-xs font-bold ml-auto" style={{ color: 'var(--text-primary)' }}>{e.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Monthly bar chart ── */}
      <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show"
        className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Monthly Trends</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Bookings & revenue by month</p>
          </div>
          <div className="flex items-center gap-4">
            {[['#E8650A', 'Bookings'], ['#FF7A20', 'Revenue']].map(([c, l]) => (
              <div key={l} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5" style={{ background: c, borderRadius: '2px' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={bookingData} barGap={4} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<ChartTooltip />} />
            <Bar yAxisId="l" dataKey="bookings" fill="#E8650A" radius={[3, 3, 0, 0]} maxBarSize={26} />
            <Bar yAxisId="r" dataKey="revenue"  fill="#FF7A20" radius={[3, 3, 0, 0]} maxBarSize={26} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Pending Submissions table ── */}
      <motion.div variants={fadeUp} custom={5} initial="hidden" animate="show">
        <SectionCard title="Pending Equipment Submissions" subtitle="Review and approve new listings"
          icon={Clock} badge action="View All" actionTo="/admin/submissions" badgeCount={stats.pendingSubmissions}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: 620, width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid var(--border-faint)` }}>
                  {['Equipment', 'Owner', 'Type', 'Location', 'Price/Day', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map(s => (
                  <tr key={s.id} style={{ borderBottom: `1px solid var(--border-faint)` }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 16px' }}>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.carName}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.brand} · {s.year}</p>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.ownerName}</p>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s.equipmentType}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s.location}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <p className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {s.pricePerDay.toLocaleString()}</p>
                    </td>
                    <td style={{ padding: '12px 16px' }}><StatusBadge status={s.status} /></td>
                    <td style={{ padding: '12px 16px' }}>
                      <Link to={`/admin/submissions/${s.id}`}
                        className="text-xs font-bold transition-colors"
                        style={{ color: 'var(--brand)' }}>
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </motion.div>

      {/* ── Two col: Bookings + quick actions ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Recent bookings */}
        <motion.div variants={fadeUp} custom={6} initial="hidden" animate="show">
          <SectionCard title="Recent Bookings" subtitle="Active and completed rentals" icon={Calendar} action="View All" actionTo="/admin/bookings">
            <div style={{ divide: 'var(--border-faint)' }}>
              {recentBookings.map(b => (
                <div key={b.id} className="flex items-start justify-between gap-3 px-5 py-3.5 transition-colors"
                  style={{ borderBottom: '1px solid var(--border-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>{b.id}</span>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{b.carName}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.customerName} · {b.location}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{b.startDate} → {b.endDate}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {b.amount.toLocaleString()}</p>
                    <Link to={`/admin/bookings`} className="text-xs font-medium transition-colors mt-1 block"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={fadeUp} custom={7} initial="hidden" animate="show">
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <h2 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: '/admin/submissions',     icon: Clock,      label: 'Review Submissions',  sub: `${stats.pendingSubmissions} Pending`,  highlight: true },
                { to: '/admin/time-controller', icon: Timer,      label: 'Time Controller',     sub: 'Manage Slots' },
                { to: '/admin/equipment',       icon: HardHat,    label: 'Equipment',           sub: `${stats.totalEquipment} Listed` },
                { to: '/admin/owners',          icon: Users,      label: 'Owners',              sub: `${stats.equipmentOwners} Registered` },
                { to: '/admin/reports',         icon: TrendingUp, label: 'Reports',             sub: 'Analytics' },
                { to: '/admin/settings',        icon: Activity,   label: 'Settings',            sub: 'Platform Config' },
              ].map(({ to, icon: Icon, label, sub, highlight }) => (
                <Link key={to} to={to}>
                  <div className="p-4 text-center border transition-all duration-200 group"
                    style={{
                      background:   highlight ? 'var(--brand-muted)' : 'var(--bg-surface)',
                      borderColor:  highlight ? 'var(--brand-border)' : 'var(--border-base)',
                      borderRadius: 'var(--r-lg)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.background = highlight ? 'rgba(232,101,10,0.1)' : 'var(--bg-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = highlight ? 'var(--brand-border)' : 'var(--border-base)'; e.currentTarget.style.background = highlight ? 'var(--brand-muted)' : 'var(--bg-surface)'; }}>
                    <div className="w-9 h-9 flex items-center justify-center mx-auto mb-2.5"
                      style={{ background: highlight ? 'rgba(232,101,10,0.15)' : 'var(--bg-overlay)', borderRadius: 'var(--r-md)' }}>
                      <Icon className="w-4 h-4" style={{ color: highlight ? 'var(--brand)' : 'var(--text-muted)' }} />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: highlight ? 'var(--brand)' : 'var(--text-primary)' }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
