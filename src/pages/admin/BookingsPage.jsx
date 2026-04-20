import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { StatusBadge, Modal, EmptyState } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useNotification } from '../../context/NotificationContext';

const MOCK = Array.from({ length: 30 }, (_, i) => ({
  id: `BK-${1000 + i}`,
  customer: ['Abebe Bekele', 'Selam Tesfaye', 'Tekle Berhan', 'Meron Desta', 'Dawit M.', 'Helen A.'][i % 6],
  equipment: ['CAT 320 Excavator', 'Komatsu D65 Bulldozer', 'Liebherr Crane', 'Sinotruk HOWO', 'CAT 950 Loader'][i % 5],
  startDate: `2024-01-${String(i + 1).padStart(2, '0')}`,
  endDate:   `2024-01-${String(i + 5).padStart(2, '0')}`,
  amount:    [42500, 27000, 54000, 28800, 36000][i % 5],
  status:    ['confirmed', 'pending', 'completed', 'cancelled', 'confirmed'][i % 5],
  location:  ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa'][i % 4],
  timeSlot:  ['Full Day', '8:00 AM – 5:00 PM', 'Half Day', 'Weekly'][i % 4],
}));

const PAGE_SIZE = 10;

const BookingsPage = () => {
  const { success } = useNotification();
  const [data, setData]           = useState(MOCK);
  const [filtered, setFiltered]   = useState(MOCK);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('');
  const [page, setPage]           = useState(1);
  const [viewItem, setViewItem]   = useState(null);

  useEffect(() => {
    let f = data;
    if (search)      f = f.filter(b => b.customer.toLowerCase().includes(search.toLowerCase()) || b.equipment.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search));
    if (statusFilter) f = f.filter(b => b.status === statusFilter);
    setFiltered(f);
    setPage(1);
  }, [search, statusFilter, data]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStatusChange = (id, newStatus) => {
    setData(d => d.map(b => b.id === id ? { ...b, status: newStatus } : b));
    success('Updated', `Booking marked as ${newStatus}`);
    setViewItem(v => v ? { ...v, status: newStatus } : v);
  };

  const statusOpts = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending',   label: 'Pending'   },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const totalRevenue = filtered.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.amount : 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Bookings</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} bookings · ETB {totalRevenue.toLocaleString()} total
          </p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />} size="sm">Export CSV</Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', count: data.length, color: 'var(--brand)' },
          { label: 'Confirmed', count: data.filter(b => b.status === 'confirmed').length, color: 'var(--success)' },
          { label: 'Pending', count: data.filter(b => b.status === 'pending').length, color: 'var(--warning)' },
          { label: 'Completed', count: data.filter(b => b.status === 'completed').length, color: 'var(--info)' },
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
          <Input placeholder="Search bookings…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="w-40">
          <Select placeholder="All Status" options={statusOpts} value={statusFilter} onChange={e => setStatus(e.target.value)} />
        </div>
        {(search || statusFilter) && (
          <Button variant="ghost" onClick={() => { setSearch(''); setStatus(''); }}>Clear</Button>
        )}
      </div>

      {/* Table */}
      <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 700, width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid var(--border-base)`, background: 'var(--bg-surface)' }}>
                {['Booking ID', 'Customer', 'Equipment', 'Dates', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((b, i) => (
                <motion.tr key={b.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.025 }}
                  style={{ borderBottom: '1px solid var(--border-faint)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-muted)' }}>{b.id}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{b.customer}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{b.equipment}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.location} · {b.timeSlot}</p>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {b.startDate}<br />{b.endDate}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {b.amount.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={b.status} /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => setViewItem(b)}
                      className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-muted)'; e.currentTarget.style.color = 'var(--brand)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: 'var(--border-base)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded border disabled:opacity-40"
                style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-sm)', color: 'var(--text-secondary)' }}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const n = Math.max(1, Math.min(page - 2 + i + (page <= 2 ? 2 - page : 0), totalPages - (4 - i)));
                return (
                  <button key={n} onClick={() => setPage(n)}
                    className="w-7 h-7 flex items-center justify-center text-xs font-semibold rounded border"
                    style={{ background: n === page ? 'var(--brand)' : 'transparent', borderColor: n === page ? 'var(--brand)' : 'var(--border-base)', color: n === page ? '#fff' : 'var(--text-secondary)', borderRadius: 'var(--r-sm)' }}>
                    {n}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded border disabled:opacity-40"
                style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-sm)', color: 'var(--text-secondary)' }}>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={`Booking ${viewItem?.id}`} size="md"
        footer={
          viewItem?.status === 'pending' && <>
            <Button variant="secondary" onClick={() => handleStatusChange(viewItem.id, 'cancelled')}>Cancel Booking</Button>
            <Button onClick={() => handleStatusChange(viewItem.id, 'confirmed')}>Confirm Booking</Button>
          </>
        }>
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Customer', viewItem.customer], ['Equipment', viewItem.equipment],
                ['Start Date', viewItem.startDate], ['End Date', viewItem.endDate],
                ['Location', viewItem.location], ['Time Slot', viewItem.timeSlot],
                ['Amount', `ETB ${viewItem.amount?.toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
            <div><StatusBadge status={viewItem.status} /></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingsPage;
