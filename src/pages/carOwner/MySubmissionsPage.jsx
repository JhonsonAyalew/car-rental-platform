import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Eye, HardHat, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatusBadge, Badge, EmptyState } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';

const MOCK = [
  { id: 'SUB-001', name: 'CAT 320 Excavator',   brand: 'Caterpillar', year: 2022, status: 'approved',  pricePerDay: 8500, location: 'Addis Ababa', submittedDate: '2024-01-10', bookings: 14, earnings: 119000 },
  { id: 'SUB-002', name: 'HOWO Truck 371',       brand: 'Sinotruk',    year: 2021, status: 'approved',  pricePerDay: 4800, location: 'Addis Ababa', submittedDate: '2024-01-12', bookings: 8,  earnings: 38400  },
  { id: 'SUB-003', name: 'Komatsu D65 Loader',   brand: 'Komatsu',     year: 2023, status: 'approved',  pricePerDay: 7200, location: 'Adama',       submittedDate: '2024-01-15', bookings: 5,  earnings: 36000  },
  { id: 'SUB-004', name: 'Water Bowser 12000L',  brand: 'HOWO',        year: 2020, status: 'pending',   pricePerDay: 4500, location: 'Dire Dawa',   submittedDate: '2024-01-20', bookings: 0,  earnings: 0      },
  { id: 'SUB-005', name: 'Liebherr Crane LTM',   brand: 'Liebherr',    year: 2019, status: 'rejected',  pricePerDay: 9500, location: 'Addis Ababa', submittedDate: '2024-01-05', bookings: 0,  earnings: 0      },
  { id: 'SUB-006', name: 'SANY SY335 Excavator', brand: 'SANY',        year: 2023, status: 'review',    pricePerDay: 7800, location: 'Hawassa',     submittedDate: '2024-01-22', bookings: 0,  earnings: 0      },
];

const MySubmissionsPage = () => {
  const { t }       = useTranslation('mySubmissions');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = MOCK.filter(s =>
    (!search || s.name.toLowerCase().includes(search.toLowerCase()))
    && (!statusFilter || s.status === statusFilter)
  );

  const counts = {
    total:    MOCK.length,
    approved: MOCK.filter(s => s.status === 'approved').length,
    pending:  MOCK.filter(s => s.status === 'pending' || s.status === 'review').length,
    rejected: MOCK.filter(s => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {t('title') || 'My Submissions'}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle') || 'Track your equipment listings and approvals'}
          </p>
        </div>
        <Link to="/owner/submit">
          <Button leftIcon={<PlusCircle className="w-4 h-4" />}>{t('addNew') || 'Add New'}</Button>
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total',    count: counts.total,    color: '#8b5cf6' },
          { label: 'Live',     count: counts.approved, color: 'var(--success)' },
          { label: 'Pending',  count: counts.pending,  color: 'var(--warning)' },
          { label: 'Rejected', count: counts.rejected, color: 'var(--danger)' },
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
          <Input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['', 'approved', 'pending', 'review', 'rejected'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 text-xs font-semibold border transition-all"
              style={{
                background:   statusFilter === s ? '#8b5cf6' : 'transparent',
                borderColor:  statusFilter === s ? '#8b5cf6' : 'var(--border-base)',
                color:        statusFilter === s ? '#fff' : 'var(--text-muted)',
                borderRadius: 'var(--r-md)',
              }}>
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={HardHat} title="No submissions found" description="No equipment matches your search."
          action={<Link to="/owner/submit"><Button>Add Equipment</Button></Link>} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="border p-5 transition-all duration-200"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#8b5cf640'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>

              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', borderRadius: 'var(--r-md)' }}>
                  <HardHat className="w-5 h-5" style={{ color: '#8b5cf6' }} />
                </div>
                <StatusBadge status={s.status} />
              </div>

              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{s.name}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{s.brand} · {s.year} · {s.location}</p>

              <div className="flex items-center justify-between mb-4 py-3 border-y" style={{ borderColor: 'var(--border-faint)' }}>
                <div className="text-center">
                  <p className="text-sm font-black" style={{ color: '#8b5cf6' }}>ETB {s.pricePerDay.toLocaleString()}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>/day</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{s.bookings}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black" style={{ color: 'var(--success)' }}>ETB {s.earnings.toLocaleString()}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>Earned</p>
                </div>
              </div>

              <Link to={`/owner/submissions/${s.id}`}>
                <Button variant="secondary" fullWidth size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                  View Details
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissionsPage;
