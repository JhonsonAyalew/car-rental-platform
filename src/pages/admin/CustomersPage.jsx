import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserX, UserCheck, Eye, Users } from 'lucide-react';
import { StatusBadge, Avatar, Modal, EmptyState, Badge } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import ConfirmDialog from '../../components/feedback/ConfirmDialog';
import { useNotification } from '../../context/NotificationContext';

const MOCK = Array.from({ length: 22 }, (_, i) => ({
  id: `USR-${1000 + i}`,
  name: ['Abebe Bekele', 'Selam Tesfaye', 'Tekle Berhan', 'Meron Desta', 'Dawit Mekonnen', 'Helen Ayele', 'Yonas Tadesse', 'Sara Haile'][i % 8],
  email: `user${i + 1}@example.com`,
  phone: `+251 9${i}1 234 ${5678 + i}`,
  city: ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa'][i % 4],
  joinedDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  bookings: Math.floor(Math.random() * 15),
  totalSpent: Math.floor(Math.random() * 200000) + 10000,
  status: i % 8 === 3 ? 'suspended' : 'active',
}));

const PAGE_SIZE = 8;

const CustomersPage = () => {
  const { success } = useNotification();
  const [data, setData]           = useState(MOCK);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('');
  const [cityFilter, setCity]     = useState('');
  const [page, setPage]           = useState(1);
  const [viewItem, setViewItem]   = useState(null);
  const [suspendId, setSuspendId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const filtered = data.filter(u => {
    const q = search.toLowerCase();
    return (!search || u.name.toLowerCase().includes(q) || u.email.includes(q) || u.phone.includes(q))
      && (!statusFilter || u.status === statusFilter)
      && (!cityFilter || u.city === cityFilter);
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSuspendToggle = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 700));
    const target = data.find(u => u.id === suspendId);
    const newStatus = target.status === 'active' ? 'suspended' : 'active';
    setData(d => d.map(u => u.id === suspendId ? { ...u, status: newStatus } : u));
    if (viewItem?.id === suspendId) setViewItem(v => ({ ...v, status: newStatus }));
    success('Updated', `User ${newStatus === 'suspended' ? 'suspended' : 'reactivated'} successfully`);
    setSuspendId(null);
    setProcessing(false);
  };

  const cities = [...new Set(MOCK.map(u => u.city))].map(c => ({ value: c, label: c }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Customers</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{filtered.length} registered customers</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', count: data.length, color: 'var(--brand)' },
          { label: 'Active', count: data.filter(u => u.status === 'active').length, color: 'var(--success)' },
          { label: 'Suspended', count: data.filter(u => u.status === 'suspended').length, color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="p-4 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input placeholder="Search customers…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="w-36">
          <Select placeholder="All Status" options={[{ value: 'active', label: 'Active' }, { value: 'suspended', label: 'Suspended' }]} value={statusFilter} onChange={e => { setStatus(e.target.value); setPage(1); }} />
        </div>
        <div className="w-40">
          <Select placeholder="All Cities" options={cities} value={cityFilter} onChange={e => { setCity(e.target.value); setPage(1); }} />
        </div>
      </div>

      {/* Table */}
      <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 650, width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid var(--border-base)`, background: 'var(--bg-surface)' }}>
                {['Customer', 'Contact', 'City', 'Bookings', 'Total Spent', 'Joined', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No customers found</td></tr>
              ) : paged.map((u, i) => (
                <motion.tr key={u.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: '1px solid var(--border-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{u.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{u.email}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.phone}</p>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)' }}>{u.city}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{u.bookings}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {u.totalSpent.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)' }}>{u.joinedDate}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={u.status} /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex gap-1">
                      <button onClick={() => setViewItem(u)} title="View"
                        className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-muted)'; e.currentTarget.style.color = 'var(--brand)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setSuspendId(u.id)} title={u.status === 'active' ? 'Suspend' : 'Reactivate'}
                        className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = u.status === 'active' ? 'var(--danger-bg)' : 'var(--success-bg)'; e.currentTarget.style.color = u.status === 'active' ? 'var(--danger)' : 'var(--success)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        {u.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: 'var(--border-base)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className="w-7 h-7 flex items-center justify-center text-xs font-semibold rounded border transition-colors"
                  style={{ background: n === page ? 'var(--brand)' : 'transparent', borderColor: n === page ? 'var(--brand)' : 'var(--border-base)', color: n === page ? '#fff' : 'var(--text-secondary)', borderRadius: 'var(--r-sm)' }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name} size="md">
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)' }}>
              <Avatar name={viewItem.name} size="lg" />
              <div>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{viewItem.name}</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{viewItem.email}</p>
                <StatusBadge status={viewItem.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['Phone', viewItem.phone], ['City', viewItem.city], ['Joined', viewItem.joinedDate], ['Bookings', viewItem.bookings], ['Total Spent', `ETB ${viewItem.totalSpent?.toLocaleString()}`], ['ID', viewItem.id]].map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Suspend confirm */}
      <ConfirmDialog
        open={!!suspendId}
        onClose={() => setSuspendId(null)}
        onConfirm={handleSuspendToggle}
        loading={processing}
        variant={data.find(u => u.id === suspendId)?.status === 'active' ? 'danger' : 'primary'}
        title={data.find(u => u.id === suspendId)?.status === 'active' ? 'Suspend User?' : 'Reactivate User?'}
        message={data.find(u => u.id === suspendId)?.status === 'active'
          ? 'This user will no longer be able to make bookings.'
          : 'This user will regain full access to the platform.'}
        confirmLabel={data.find(u => u.id === suspendId)?.status === 'active' ? 'Suspend' : 'Reactivate'}
      />
    </div>
  );
};

export default CustomersPage;
