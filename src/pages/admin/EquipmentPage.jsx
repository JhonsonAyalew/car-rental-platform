import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, Eye, HardHat, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Card, Badge, StatusBadge, EmptyState, Spinner, Modal } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import ConfirmDialog from '../../components/feedback/ConfirmDialog';
import { useNotification } from '../../context/NotificationContext';

const MOCK = Array.from({ length: 24 }, (_, i) => ({
  id: `EQ-${1000 + i}`,
  name: ['CAT 320 Excavator', 'Komatsu D65 Bulldozer', 'Liebherr LTM Crane', 'Sinotruk HOWO', 'CAT 950 Loader', 'SANY Excavator'][i % 6],
  brand: ['Caterpillar', 'Komatsu', 'Liebherr', 'Sinotruk', 'Caterpillar', 'SANY'][i % 6],
  category: ['Excavator', 'Bulldozer', 'Crane', 'Truck', 'Loader', 'Excavator'][i % 6],
  owner: ['Getachew A.', 'Tigist W.', 'Dawit M.', 'Helen A.', 'Abebe B.', 'Selam T.'][i % 6],
  pricePerDay: [8500, 6000, 9500, 4500, 7200, 7800][i % 6],
  status: ['active', 'active', 'inactive', 'active', 'active', 'active'][i % 6],
  location: ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa'][i % 4],
  year: 2020 + (i % 4),
  bookings: Math.floor(Math.random() * 40),
}));

const PAGE_SIZE = 8;

const EquipmentPage = () => {
  const { t }    = useTranslation('adminEquipment');
  const { isDark } = useTheme();
  const { success, error } = useNotification();

  const [data, setData]           = useState(MOCK);
  const [filtered, setFiltered]   = useState(MOCK);
  const [loading, setLoading]     = useState(false);
  const [search, setSearch]       = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage]           = useState(1);
  const [deleteId, setDeleteId]   = useState(null);
  const [deleting, setDeleting]   = useState(false);
  const [viewItem, setViewItem]   = useState(null);

  useEffect(() => {
    let f = data;
    if (search)      f = f.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.owner.toLowerCase().includes(search.toLowerCase()));
    if (catFilter)   f = f.filter(e => e.category === catFilter);
    if (statusFilter) f = f.filter(e => e.status === statusFilter);
    setFiltered(f);
    setPage(1);
  }, [search, catFilter, statusFilter, data]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async () => {
    setDeleting(true);
    await new Promise(r => setTimeout(r, 800));
    setData(d => d.filter(e => e.id !== deleteId));
    success('Deleted', 'Equipment removed successfully');
    setDeleteId(null);
    setDeleting(false);
  };

  const handleToggleStatus = async (id) => {
    setData(d => d.map(e => e.id === id ? { ...e, status: e.status === 'active' ? 'inactive' : 'active' } : e));
    success('Updated', 'Equipment status changed');
  };

  const cats    = [...new Set(MOCK.map(e => e.category))];
  const catOpts = cats.map(c => ({ value: c, label: c }));
  const stOpts  = [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Equipment</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{filtered.length} machines registered</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>Add Equipment</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input placeholder="Search equipment or owner…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="w-40">
          <Select placeholder="All Categories" options={catOpts} value={catFilter} onChange={e => setCatFilter(e.target.value)} />
        </div>
        <div className="w-36">
          <Select placeholder="All Status" options={stOpts} value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
        </div>
        {(search || catFilter || statusFilter) && (
          <Button variant="ghost" size="md" onClick={() => { setSearch(''); setCatFilter(''); setStatusFilter(''); }}>
            Clear
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 700, width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid var(--border-base)` }}>
                {['Equipment', 'Category', 'Owner', 'Location', 'Price/Day', 'Bookings', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', whiteSpace: 'nowrap', background: 'var(--bg-surface)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>No equipment found</td></tr>
              ) : paged.map((eq, i) => (
                <motion.tr key={eq.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: '1px solid var(--border-faint)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px' }}>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{eq.brand} · {eq.year} · {eq.id}</p>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge variant="default">{eq.category}</Badge>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{eq.owner}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{eq.location}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {eq.pricePerDay.toLocaleString()}</span>
                    <span className="text-xs ml-1" style={{ color: 'var(--text-faint)' }}>/day</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{eq.bookings}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => handleToggleStatus(eq.id)}>
                      <StatusBadge status={eq.status} />
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewItem(eq)} title="View"
                        className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--info-bg)'; e.currentTarget.style.color = 'var(--info)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button title="Edit"
                        className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-muted)'; e.currentTarget.style.color = 'var(--brand)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(eq.id)} title="Delete"
                        className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-bg)'; e.currentTarget.style.color = 'var(--danger)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded border transition-colors disabled:opacity-40"
                style={{ borderColor: 'var(--border-base)', color: 'var(--text-secondary)', borderRadius: 'var(--r-sm)' }}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const n = page <= 3 ? i + 1 : page + i - 2;
                if (n < 1 || n > totalPages) return null;
                return (
                  <button key={n} onClick={() => setPage(n)}
                    className="w-7 h-7 flex items-center justify-center text-xs font-semibold rounded border transition-colors"
                    style={{
                      background:  n === page ? 'var(--brand)' : 'transparent',
                      borderColor: n === page ? 'var(--brand)' : 'var(--border-base)',
                      color:       n === page ? '#fff' : 'var(--text-secondary)',
                      borderRadius: 'var(--r-sm)',
                    }}>
                    {n}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded border transition-colors disabled:opacity-40"
                style={{ borderColor: 'var(--border-base)', color: 'var(--text-secondary)', borderRadius: 'var(--r-sm)' }}>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.name} size="md">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['ID', viewItem.id], ['Brand', viewItem.brand], ['Year', viewItem.year],
                ['Category', viewItem.category], ['Owner', viewItem.owner], ['Location', viewItem.location],
                ['Price/Day', `ETB ${viewItem.pricePerDay?.toLocaleString()}`], ['Bookings', viewItem.bookings],
              ].map(([k, v]) => (
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

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Equipment?"
        message="This will permanently remove this equipment and all associated data."
      />
    </div>
  );
};

export default EquipmentPage;
