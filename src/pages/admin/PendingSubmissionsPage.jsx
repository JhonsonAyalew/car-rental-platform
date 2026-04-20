import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Eye, Clock, Filter } from 'lucide-react';
import { StatusBadge, Modal, Badge, EmptyState } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import ConfirmDialog from '../../components/feedback/ConfirmDialog';
import { useNotification } from '../../context/NotificationContext';

const MOCK = Array.from({ length: 18 }, (_, i) => ({
  id: `SUB-${String(i + 1).padStart(3, '0')}`,
  carName: ['CAT 320 Excavator', 'SANY SY335', 'Komatsu D65', 'Liebherr LTM Crane', 'Water Bowser', 'HOWO Truck'][i % 6],
  brand: ['Caterpillar', 'SANY', 'Komatsu', 'Liebherr', 'HOWO', 'Sinotruk'][i % 6],
  year: 2020 + (i % 4),
  ownerName: ['Getachew Alemayehu', 'Tigist Worku', 'Dawit Mekonnen', 'Helen Ayele', 'Abebe B.', 'Selam T.'][i % 6],
  ownerEmail: ['getachew@ex.com', 'tigist@ex.com', 'dawit@ex.com', 'helen@ex.com', 'abebe@ex.com', 'selam@ex.com'][i % 6],
  submittedDate: `2024-01-${String(i + 1).padStart(2, '0')}`,
  pricePerDay: [8500, 7800, 7200, 9500, 4500, 5500][i % 6],
  status: ['pending', 'pending', 'review', 'pending', 'pending', 'review'][i % 6],
  equipmentType: ['Excavator', 'Excavator', 'Bulldozer', 'Crane', 'Water Truck', 'Heavy Truck'][i % 6],
  location: ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa'][i % 4],
  description: 'Well-maintained machine with full service history. Available for short and long-term rental.',
  images: 3,
  documents: 2,
}));

const PendingSubmissionsPage = () => {
  const { success, error } = useNotification();
  const [data, setData]           = useState(MOCK);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('');
  const [viewItem, setViewItem]   = useState(null);
  const [actionItem, setActionItem] = useState(null); // { id, action: 'approve'|'reject' }
  const [processing, setProcessing] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = data.filter(s => {
    const matchSearch = !search || s.carName.toLowerCase().includes(search.toLowerCase()) || s.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = async () => {
    if (!actionItem) return;
    setProcessing(true);
    await new Promise(r => setTimeout(r, 900));
    const newStatus = actionItem.action === 'approve' ? 'approved' : 'rejected';
    setData(d => d.map(s => s.id === actionItem.id ? { ...s, status: newStatus } : s));
    if (viewItem?.id === actionItem.id) setViewItem(v => ({ ...v, status: newStatus }));
    success(
      actionItem.action === 'approve' ? 'Approved!' : 'Rejected',
      actionItem.action === 'approve' ? 'Submission has been approved and listed.' : 'Submission has been rejected.'
    );
    setActionItem(null);
    setRejectReason('');
    setProcessing(false);
  };

  const counts = {
    pending:  data.filter(s => s.status === 'pending').length,
    review:   data.filter(s => s.status === 'review').length,
    approved: data.filter(s => s.status === 'approved').length,
    rejected: data.filter(s => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            Pending Submissions
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Review and approve equipment listings from owners
          </p>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending',  count: counts.pending,  color: 'var(--warning)', bg: 'var(--warning-bg)' },
          { label: 'In Review',count: counts.review,   color: 'var(--info)',    bg: 'var(--info-bg)' },
          { label: 'Approved', count: counts.approved, color: 'var(--success)', bg: 'var(--success-bg)' },
          { label: 'Rejected', count: counts.rejected, color: 'var(--danger)',  bg: 'var(--danger-bg)' },
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
          <Input placeholder="Search submissions…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="w-40">
          <Select placeholder="All Status" value={statusFilter} onChange={e => setStatus(e.target.value)}
            options={[
              { value: 'pending',  label: 'Pending'   },
              { value: 'review',   label: 'In Review' },
              { value: 'approved', label: 'Approved'  },
              { value: 'rejected', label: 'Rejected'  },
            ]} />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={Clock} title="No submissions found" description="No submissions match your current filters." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="border p-5 transition-all duration-200"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>{s.id}</span>
                    <StatusBadge status={s.status} />
                    <Badge variant="default" size="xs">{s.equipmentType}</Badge>
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{s.carName}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.brand} · {s.year} · {s.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-black" style={{ color: 'var(--brand)' }}>ETB {s.pricePerDay.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: 'var(--text-faint)' }}>/day</p>
                </div>
              </div>

              {/* Owner */}
              <div className="flex items-center gap-2 p-3 mb-4" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                <div className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0"
                  style={{ background: 'var(--brand)', color: '#fff' }}>
                  {s.ownerName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{s.ownerName}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.ownerEmail}</p>
                </div>
                <span className="text-xs ml-auto" style={{ color: 'var(--text-faint)' }}>{s.submittedDate}</span>
              </div>

              {/* Meta */}
              <div className="flex gap-3 mb-4">
                <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--bg-overlay)', color: 'var(--text-muted)' }}>
                  {s.images} photos
                </span>
                <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--bg-overlay)', color: 'var(--text-muted)' }}>
                  {s.documents} docs
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => setViewItem(s)} className="flex-1">
                  View Details
                </Button>
                {(s.status === 'pending' || s.status === 'review') && (
                  <>
                    <Button variant="success" size="sm" leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
                      onClick={() => setActionItem({ id: s.id, action: 'approve' })}>
                      Approve
                    </Button>
                    <Button variant="danger" size="sm" leftIcon={<XCircle className="w-3.5 h-3.5" />}
                      onClick={() => setActionItem({ id: s.id, action: 'reject' })}>
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={viewItem?.carName} size="lg"
        footer={
          (viewItem?.status === 'pending' || viewItem?.status === 'review') && (
            <>
              <Button variant="secondary" onClick={() => setViewItem(null)}>Close</Button>
              <Button variant="danger" onClick={() => { setActionItem({ id: viewItem.id, action: 'reject' }); }}>Reject</Button>
              <Button onClick={() => setActionItem({ id: viewItem.id, action: 'approve' })}>Approve</Button>
            </>
          )
        }>
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                ['ID', viewItem.id], ['Brand', viewItem.brand], ['Year', viewItem.year],
                ['Type', viewItem.equipmentType], ['Location', viewItem.location],
                ['Price/Day', `ETB ${viewItem.pricePerDay?.toLocaleString()}`],
                ['Owner', viewItem.ownerName], ['Email', viewItem.ownerEmail], ['Submitted', viewItem.submittedDate],
              ].map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Description</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{viewItem.description}</p>
            </div>
            <StatusBadge status={viewItem.status} />
          </div>
        )}
      </Modal>

      {/* Approve/Reject confirm */}
      <ConfirmDialog
        open={!!actionItem}
        onClose={() => { setActionItem(null); setRejectReason(''); }}
        onConfirm={handleAction}
        loading={processing}
        variant={actionItem?.action === 'reject' ? 'danger' : 'primary'}
        title={actionItem?.action === 'approve' ? 'Approve Submission?' : 'Reject Submission?'}
        message={actionItem?.action === 'approve'
          ? 'This equipment will be listed publicly and available for booking.'
          : 'This submission will be rejected and the owner will be notified.'}
        confirmLabel={actionItem?.action === 'approve' ? 'Yes, Approve' : 'Yes, Reject'}
      />
    </div>
  );
};

export default PendingSubmissionsPage;
