import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { StatusBadge, EmptyState, Modal } from '../../components/ui/index.jsx';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const MOCK = [
  { id: 'BK-1001', equipment: 'CAT 320 Excavator',  owner: 'Getachew A.', start: '2024-01-20', end: '2024-01-25', amount: 42500, status: 'confirmed', location: 'Addis Ababa', timeSlot: 'Full Day' },
  { id: 'BK-1002', equipment: 'HOWO Truck 371',      owner: 'Tigist W.',   start: '2024-01-22', end: '2024-01-28', amount: 28800, status: 'pending',   location: 'Dire Dawa',   timeSlot: '8AM–5PM' },
  { id: 'BK-1003', equipment: 'Komatsu D65 Loader',  owner: 'Dawit M.',    start: '2024-01-15', end: '2024-01-18', amount: 25500, status: 'completed', location: 'Adama',       timeSlot: 'Full Day' },
  { id: 'BK-1004', equipment: 'Water Bowser 12kL',   owner: 'Helen A.',    start: '2024-01-10', end: '2024-01-11', amount: 4500,  status: 'cancelled', location: 'Hawassa',     timeSlot: 'Half Day' },
  { id: 'BK-1005', equipment: 'Liebherr LTM Crane',  owner: 'Getachew A.', start: '2024-02-01', end: '2024-02-05', amount: 47500, status: 'confirmed', location: 'Addis Ababa', timeSlot: 'Weekly' },
];

const MyBookingsPage = () => {
  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState('');
  const [viewItem, setViewItem] = useState(null);

  const filtered = MOCK.filter(b =>
    (!search || b.equipment.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search))
    && (!status || b.status === status)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>My Bookings</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Track all your equipment rental history</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total',     count: MOCK.length,                                      color: 'var(--brand)' },
          { label: 'Active',    count: MOCK.filter(b => b.status === 'confirmed').length, color: 'var(--success)' },
          { label: 'Pending',   count: MOCK.filter(b => b.status === 'pending').length,   color: 'var(--warning)' },
          { label: 'Completed', count: MOCK.filter(b => b.status === 'completed').length, color: 'var(--info)' },
        ].map(s => (
          <div key={s.label} className="p-4 border text-center"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-xl font-black" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] max-w-xs">
          <Input placeholder="Search bookings…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="w-40">
          <Select placeholder="All Status" value={status} onChange={e => setStatus(e.target.value)}
            options={[{ value: 'confirmed', label: 'Confirmed' },{ value: 'pending', label: 'Pending' },{ value: 'completed', label: 'Completed' },{ value: 'cancelled', label: 'Cancelled' }]} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Calendar} title="No bookings found" description="Try adjusting your search or filters."
          action={<Link to="/search"><Button>Browse Equipment</Button></Link>} />
      ) : (
        <div className="space-y-3">
          {filtered.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="border p-5 flex flex-wrap items-start justify-between gap-4 transition-all duration-200"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>{b.id}</span>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{b.equipment}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.location} · {b.timeSlot}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{b.start} → {b.end}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className="text-lg font-black" style={{ color: 'var(--brand)' }}>ETB {b.amount.toLocaleString()}</p>
                <Button variant="secondary" size="sm" onClick={() => setViewItem(b)}>View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={`Booking ${viewItem?.id}`} size="md">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[['Equipment', viewItem.equipment], ['Owner', viewItem.owner], ['Location', viewItem.location], ['Time Slot', viewItem.timeSlot], ['Start', viewItem.start], ['End', viewItem.end], ['Amount', `ETB ${viewItem.amount?.toLocaleString()}`]].map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
            <StatusBadge status={viewItem.status} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyBookingsPage;
