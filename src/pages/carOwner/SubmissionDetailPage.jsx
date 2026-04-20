import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, HardHat, Calendar, DollarSign, MapPin } from 'lucide-react';
import { StatusBadge, Badge } from '../../components/ui/index.jsx';
import Button from '../../components/ui/Button';

const MOCK = {
  id: 'SUB-001', name: 'CAT 320 Excavator', brand: 'Caterpillar', model: '320', year: 2022,
  status: 'approved', pricePerDay: 8500, pricePerWeek: 50000, location: 'Addis Ababa, Bole',
  description: 'Well-maintained CAT 320 Excavator. Full service history. Equipped with standard shovel.',
  bookings: 14, earnings: 119000, rating: 4.9, reviews: 12,
  specifications: { weight: '20,000 kg', engine: 'Cat C7.1', power: '122 kW', maxReach: '9.6 m' },
};

const SubmissionDetailPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const sub      = MOCK;

  return (
    <div className="space-y-6 max-w-4xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => e.currentTarget.style.color = '#8b5cf6'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft className="w-4 h-4" /> Back to My Submissions
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{sub.id}</span>
            <StatusBadge status={sub.status} />
          </div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{sub.name}</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub.brand} · {sub.year} · {sub.location}</p>
        </div>
        <Button variant="outline" leftIcon={<Edit2 className="w-4 h-4" />}>Edit Listing</Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Bookings', val: sub.bookings, color: '#8b5cf6' },
          { label: 'Total Earnings', val: `ETB ${sub.earnings.toLocaleString()}`, color: 'var(--success)' },
          { label: 'Rating', val: `⭐ ${sub.rating} (${sub.reviews})`, color: 'var(--warning)' },
        ].map(s => (
          <div key={s.label} className="p-4 border text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-lg font-black" style={{ color: s.color }}>{s.val}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>Description</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{sub.description}</p>
          </div>
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Specifications</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(sub.specifications).map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold capitalize mb-0.5" style={{ color: 'var(--text-muted)' }}>{k.replace(/([A-Z])/g,' $1')}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Pricing</p>
            <div className="space-y-2">
              {[['Daily', `ETB ${sub.pricePerDay.toLocaleString()}`], ['Weekly', `ETB ${sub.pricePerWeek.toLocaleString()}`]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span className="text-sm font-bold" style={{ color: '#8b5cf6' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailPage;
