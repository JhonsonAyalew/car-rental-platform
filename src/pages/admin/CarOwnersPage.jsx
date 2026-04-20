// CarOwnersPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, UserCheck } from 'lucide-react';
import { StatusBadge, Avatar, Modal } from '../../components/ui/index.jsx';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useNotification } from '../../context/NotificationContext';

const MOCK = Array.from({ length: 14 }, (_, i) => ({
  id: `OWN-${100 + i}`,
  name: ['Getachew Alemayehu', 'Tigist Worku', 'Dawit Mekonnen', 'Helen Ayele', 'Abebe Bekele', 'Selam Tesfaye', 'Yonas T.'][i % 7],
  email: `owner${i + 1}@example.com`,
  phone: `+251 9${i}2 345 6789`,
  company: ['ABC Construction', 'XYZ Contractors', 'Nile Enterprise', 'Sunrise PLC', '', '', 'Lion Build'][i % 7],
  city: ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa'][i % 4],
  joinedDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-01`,
  equipment: Math.floor(Math.random() * 8) + 1,
  totalEarnings: Math.floor(Math.random() * 500000) + 50000,
  status: i % 6 === 2 ? 'suspended' : 'active',
}));

const CarOwnersPage = () => {
  const { success } = useNotification();
  const [search, setSearch] = useState('');
  const [viewItem, setViewItem] = useState(null);

  const filtered = MOCK.filter(o =>
    !search || o.name.toLowerCase().includes(search.toLowerCase()) || o.email.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Equipment Owners</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{filtered.length} registered owners</p>
        </div>
      </div>

      <div className="max-w-sm">
        <Input placeholder="Search owners…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((o, i) => (
          <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="border p-5 transition-all duration-200"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-border)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
            <div className="flex items-start gap-3 mb-4">
              <Avatar name={o.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{o.name}</p>
                {o.company && <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{o.company}</p>}
                <StatusBadge status={o.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[['Equipment', o.equipment], ['Earnings', `ETB ${(o.totalEarnings / 1000).toFixed(0)}k`]].map(([k, v]) => (
                <div key={k} className="p-2 text-center" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-sm font-bold" style={{ color: 'var(--brand)' }}>{v}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{k}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setViewItem(o)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border transition-colors"
              style={{ borderColor: 'var(--border-base)', color: 'var(--text-secondary)', borderRadius: 'var(--r-md)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.color = 'var(--brand)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
              <Eye className="w-3.5 h-3.5" /> View Details
            </button>
          </motion.div>
        ))}
      </div>

      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name} size="md">
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)' }}>
              <Avatar name={viewItem.name} size="lg" />
              <div>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{viewItem.name}</p>
                {viewItem.company && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{viewItem.company}</p>}
                <StatusBadge status={viewItem.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['Email', viewItem.email], ['Phone', viewItem.phone], ['City', viewItem.city], ['Joined', viewItem.joinedDate], ['Equipment', viewItem.equipment], ['Total Earnings', `ETB ${viewItem.totalEarnings?.toLocaleString()}`]].map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarOwnersPage;
