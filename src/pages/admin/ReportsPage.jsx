import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Download, TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const MONTHLY = [
  { month: 'Jan', revenue: 1250000, bookings: 45, newUsers: 120, equipment: 12 },
  { month: 'Feb', revenue: 1480000, bookings: 52, newUsers: 145, equipment: 18 },
  { month: 'Mar', revenue: 1760000, bookings: 61, newUsers: 98,  equipment: 22 },
  { month: 'Apr', revenue: 1690000, bookings: 58, newUsers: 167, equipment: 15 },
  { month: 'May', revenue: 2120000, bookings: 73, newUsers: 210, equipment: 28 },
  { month: 'Jun', revenue: 2450000, bookings: 84, newUsers: 189, equipment: 31 },
  { month: 'Jul', revenue: 2280000, bookings: 79, newUsers: 156, equipment: 20 },
  { month: 'Aug', revenue: 2690000, bookings: 91, newUsers: 234, equipment: 35 },
];

const BY_CATEGORY = [
  { name: 'Excavators', revenue: 980000, bookings: 89, avgDays: 4.2 },
  { name: 'Trucks',     revenue: 1240000, bookings: 124, avgDays: 6.1 },
  { name: 'Loaders',    revenue: 650000, bookings: 67, avgDays: 3.8 },
  { name: 'Cranes',     revenue: 420000, bookings: 28, avgDays: 5.5 },
  { name: 'Bulldozers', revenue: 390000, bookings: 34, avgDays: 4.0 },
];

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

const ReportsPage = () => {
  const { isDark } = useTheme();
  const [period, setPeriod] = useState('monthly');

  const axisStyle = { fontSize: 11, fill: 'var(--text-muted)' };
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  const kpis = [
    { label: 'Total Revenue',  value: 'ETB 15.7M', change: '+23%', icon: DollarSign, color: 'var(--success)' },
    { label: 'Total Bookings', value: '533',        change: '+18%', icon: Calendar,   color: 'var(--brand)' },
    { label: 'New Users',      value: '1,319',      change: '+31%', icon: Users,      color: 'var(--info)' },
    { label: 'Avg. Booking',   value: '5.2 days',   change: '+8%',  icon: TrendingUp, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Reports & Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Platform performance overview</p>
        </div>
        <div className="flex gap-2">
          <Select size="sm" value={period} onChange={e => setPeriod(e.target.value)} fullWidth={false}
            options={[{ value: 'weekly', label: 'Weekly' }, { value: 'monthly', label: 'Monthly' }, { value: 'yearly', label: 'Yearly' }]} />
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>Export</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: `${k.color}15`, borderRadius: 'var(--r-md)' }}>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <span className="text-xs font-bold px-2 py-0.5" style={{ background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--r-sm)' }}>{k.change}</span>
            </div>
            <p className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{k.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue line chart */}
      <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
        <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Revenue Trend</h2>
        <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Monthly revenue (ETB)</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={MONTHLY} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8650A" stopOpacity={isDark ? 0.25 : 0.12} />
                <stop offset="100%" stopColor="#E8650A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" name="revenue" stroke="#E8650A" strokeWidth={2.5} fill="url(#rGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Two-col charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bookings + new users */}
        <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Bookings vs. New Users</h2>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Monthly comparison</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY} barGap={4} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="bookings" name="bookings" fill="#E8650A" radius={[3, 3, 0, 0]} maxBarSize={22} />
              <Bar dataKey="newUsers" name="newUsers" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By category */}
        <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Revenue by Category</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>ETB contribution per equipment type</p>
          <div className="space-y-3">
            {BY_CATEGORY.sort((a, b) => b.revenue - a.revenue).map((cat, i) => {
              const pct = Math.round((cat.revenue / BY_CATEGORY.reduce((s, c) => s + c.revenue, 0)) * 100);
              const colors = ['var(--brand)', '#FF7A20', '#3b82f6', '#8b5cf6', 'var(--success)'];
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                    <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>ETB {(cat.revenue / 1000).toFixed(0)}k · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-overlay)' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full" style={{ background: colors[i] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category table */}
      <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div className="p-5 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Performance by Category</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid var(--border-base)`, background: 'var(--bg-surface)' }}>
              {['Category', 'Total Revenue', 'Bookings', 'Avg. Duration'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BY_CATEGORY.map((cat, i) => (
              <tr key={cat.name} style={{ borderBottom: '1px solid var(--border-faint)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{cat.name}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {cat.revenue.toLocaleString()}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{cat.bookings}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{cat.avgDays} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
