import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, DollarSign, Clock, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge, Badge, Skeleton, Avatar } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] } }),
};

const CustomerDashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setStats({ totalBookings: 8, activeBookings: 2, totalSpent: 184500, savedEquipment: 5 });
      setRecentBookings([
        { id: 'BK-1003', equipment: 'CAT 320 Excavator', owner: 'Getachew A.', start: '2024-01-19', end: '2024-01-22', amount: 25500, status: 'completed', location: 'Addis Ababa' },
        { id: 'BK-1001', equipment: 'HOWO Truck 371',    owner: 'Tigist W.',   start: '2024-01-20', end: '2024-01-25', amount: 24000, status: 'confirmed', location: 'Dire Dawa' },
        { id: 'BK-1002', equipment: 'Komatsu Loader',    owner: 'Dawit M.',    start: '2024-01-22', end: '2024-01-28', amount: 50400, status: 'pending',   location: 'Adama' },
      ]);
      setRecommended([
        { id: 'EQ-01', name: 'CAT 320 Excavator',  pricePerDay: 8500, rating: 4.9, location: 'Addis Ababa', category: 'Excavator' },
        { id: 'EQ-02', name: 'SANY SY335',          pricePerDay: 7800, rating: 4.7, location: 'Dire Dawa',   category: 'Excavator' },
        { id: 'EQ-03', name: 'Water Bowser 12k',    pricePerDay: 4500, rating: 4.6, location: 'Adama',       category: 'Water Truck' },
      ]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton.Card key={i} />)}</div>;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div variants={fadeUp} initial="hidden" animate="show"
        className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--brand-muted) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name={user?.name} size="md" />
            <div>
              <h1 className="text-xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                Welcome back, {user?.name?.split(' ')[0] || 'there'}!
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Find and book construction equipment across Ethiopia</p>
            </div>
          </div>
          <Link to="/search">
            <Button leftIcon={<Search className="w-4 h-4" />} size="lg">Browse Equipment</Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Bookings',  val: stats.totalBookings,   color: 'var(--brand)', icon: Calendar },
          { label: 'Active',          val: stats.activeBookings,  color: 'var(--success)', icon: Clock },
          { label: 'Total Spent',     val: `ETB ${(stats.totalSpent / 1000).toFixed(0)}k`, color: '#8b5cf6', icon: DollarSign },
          { label: 'Saved',           val: stats.savedEquipment,  color: 'var(--warning)', icon: Search },
        ].map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" animate="show"
            className="p-5 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <div className="w-9 h-9 flex items-center justify-center mb-3"
              style={{ background: `${s.color}15`, borderRadius: 'var(--r-md)' }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{s.val}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show">
        <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-base)' }}>
            <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Recent Bookings</h2>
            <Link to="/customer/bookings" className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div>
            {recentBookings.map((b, i) => (
              <div key={b.id} className="flex items-start justify-between gap-3 px-5 py-4 transition-colors"
                style={{ borderBottom: i < recentBookings.length - 1 ? '1px solid var(--border-faint)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>{b.id}</span>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{b.equipment}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.owner} · {b.location}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{b.start} → {b.end}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {b.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recommended */}
      <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>Recommended for You</h2>
          <Link to="/search" className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            Browse All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommended.map((eq, i) => (
            <motion.div key={eq.id} variants={fadeUp} custom={i} initial="hidden" animate="show"
              className="border p-4 transition-all duration-200"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
              <div className="w-full h-28 mb-3 flex items-center justify-center text-4xl"
                style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>⛏️</div>
              <Badge variant="default" size="xs">{eq.category}</Badge>
              <p className="text-sm font-bold mt-2 mb-1" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{eq.location}</span>
                <span className="text-xs ml-auto" style={{ color: 'var(--warning)' }}>⭐ {eq.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-black" style={{ color: 'var(--brand)' }}>ETB {eq.pricePerDay.toLocaleString()}</span>
                  <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>/day</span>
                </div>
                <Link to={`/equipment/${eq.id}`}>
                  <Button size="xs">Book Now</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDashboardPage;
