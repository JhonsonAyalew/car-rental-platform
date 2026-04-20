import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Calendar, Star, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const MONTHLY = [
  { month: 'Aug', earnings: 42000, bookings: 5 },
  { month: 'Sep', earnings: 58000, bookings: 7 },
  { month: 'Oct', earnings: 51000, bookings: 6 },
  { month: 'Nov', earnings: 72000, bookings: 9 },
  { month: 'Dec', earnings: 76000, bookings: 10 },
  { month: 'Jan', earnings: 84500, bookings: 11 },
];

const BY_EQUIPMENT = [
  { name: 'CAT 320',    earnings: 119000, bookings: 14 },
  { name: 'HOWO Truck', earnings: 38400,  bookings: 8  },
  { name: 'Loader',     earnings: 36000,  bookings: 5  },
];

const Tooltip_ = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border p-3 shadow-xl" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-md)' }}>
      <p className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
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

const AnalyticsPage = () => {
  const { isDark } = useTheme();
  const gridColor  = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const axisStyle  = { fontSize: 11, fill: 'var(--text-muted)' };

  const kpis = [
    { label: 'Total Earnings',  value: 'ETB 193k', change: '+22%', icon: DollarSign, color: '#8b5cf6' },
    { label: 'Total Bookings',  value: '27',        change: '+18%', icon: Calendar,   color: 'var(--brand)' },
    { label: 'Avg. Rating',     value: '4.8 ⭐',    change: '+0.2', icon: Star,       color: 'var(--warning)' },
    { label: 'Avg. Duration',   value: '4.8 days',  change: '+8%',  icon: TrendingUp, color: 'var(--success)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Analytics</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Your equipment performance overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: `${k.color}15`, borderRadius: 'var(--r-md)' }}>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold px-1.5 py-0.5"
                style={{ background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--r-sm)' }}>
                <ArrowUpRight className="w-3 h-3" />{k.change}
              </div>
            </div>
            <p className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{k.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{k.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Monthly Earnings</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Last 6 months</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={isDark ? 0.25 : 0.12} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<Tooltip_ />} />
              <Area type="monotone" dataKey="earnings" name="earnings" stroke="#8b5cf6" strokeWidth={2} fill="url(#eGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h2 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Bookings per Month</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Monthly booking count</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Bar dataKey="bookings" name="bookings" fill="#8b5cf6" radius={[3, 3, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per equipment */}
      <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
        <h2 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Performance by Equipment</h2>
        <div className="space-y-4">
          {BY_EQUIPMENT.map(eq => {
            const total = BY_EQUIPMENT.reduce((s, e) => s + e.earnings, 0);
            const pct   = Math.round((eq.earnings / total) * 100);
            return (
              <div key={eq.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{eq.name}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span style={{ color: 'var(--text-muted)' }}>{eq.bookings} bookings</span>
                    <span className="font-bold" style={{ color: '#8b5cf6' }}>ETB {(eq.earnings / 1000).toFixed(0)}k · {pct}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-overlay)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7 }}
                    className="h-full rounded-full" style={{ background: '#8b5cf6' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
