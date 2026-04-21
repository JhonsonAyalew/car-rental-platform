import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, MapPin, Tag, DollarSign, Calendar } from 'lucide-react';
import Button from '../../components/ui/Button';
import { StatusBadge, Badge, Textarea } from '../../components/ui/index.jsx';
import { Textarea } from '../../components/ui/Textarea.jsx';
import { useNotification } from '../../context/NotificationContext';

const MOCK_SUBMISSION = {
  id: 'SUB-001',
  carName: 'CAT 320 Excavator with Shovel',
  brand: 'Caterpillar',
  model: '320',
  year: 2022,
  equipmentType: 'Excavator',
  condition: 'Excellent',
  ownerName: 'Getachew Alemayehu',
  ownerEmail: 'getachew@example.com',
  ownerPhone: '+251 911 234 567',
  submittedDate: '2024-01-22',
  pricePerDay: 8500,
  pricePerWeek: 50000,
  status: 'pending',
  location: 'Addis Ababa, Bole',
  description: 'Well-maintained CAT 320 Excavator in excellent condition. Full service history available. Equipped with standard shovel attachment. Available for short and long-term rental. Experienced operator available upon request.',
  specifications: {
    weight: '20,000 kg',
    engine: 'Cat C7.1 ACERT',
    power: '122 kW',
    maxReach: '9.6 m',
    bucketCapacity: '0.8 m³',
  },
  attachments: ['Shovel', 'Bucket'],
  images: [1, 2, 3, 4],
  documents: ['registration.pdf', 'insurance.pdf'],
};

const SubmissionReviewPage = () => {
  const { id }            = useParams();
  const navigate          = useNavigate();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(false);
  const [note, setNote]   = useState('');
  const sub = MOCK_SUBMISSION; // In production: fetch by id

  const handleAction = async (action) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (action === 'approve') {
      success('Approved!', `"${sub.carName}" is now live on the platform.`);
    } else {
      if (!note.trim()) { error('Note Required', 'Please add a rejection reason.'); setLoading(false); return; }
      success('Rejected', 'Owner has been notified.');
    }
    setLoading(false);
    navigate('/admin/submissions');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft className="w-4 h-4" /> Back to Submissions
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{sub.id}</span>
            <StatusBadge status={sub.status} />
            <Badge variant="default">{sub.equipmentType}</Badge>
          </div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{sub.carName}</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Submitted on {sub.submittedDate}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="danger" size="sm" leftIcon={<XCircle className="w-4 h-4" />} loading={loading}
            onClick={() => handleAction('reject')}>Reject</Button>
          <Button size="sm" leftIcon={<CheckCircle className="w-4 h-4" />} loading={loading}
            onClick={() => handleAction('approve')}>Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Image placeholders */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Images ({sub.images.length})</p>
            <div className="grid grid-cols-4 gap-2">
              {sub.images.map(i => (
                <div key={i} className="aspect-square flex items-center justify-center text-2xl"
                  style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>⛏️</div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Description</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{sub.description}</p>
          </div>

          {/* Specifications */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Specifications</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(sub.specifications).map(([k, v]) => (
                <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                  <p className="text-xs font-semibold capitalize mb-0.5" style={{ color: 'var(--text-muted)' }}>{k.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection note */}
          {sub.status === 'pending' && (
            <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
              <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Rejection Note <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(required if rejecting)</span></p>
              <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
                placeholder="Explain why this submission is being rejected…"
                className="w-full px-3 py-2.5 text-sm border outline-none resize-none"
                style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }} />
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          {/* Pricing */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Pricing</p>
            <div className="space-y-2">
              {[['Per Day', sub.pricePerDay], ['Per Week', sub.pricePerWeek]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>ETB {v.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Owner</p>
            <div className="space-y-2">
              {[['Name', sub.ownerName], ['Email', sub.ownerEmail], ['Phone', sub.ownerPhone]].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Details</p>
            <div className="space-y-2">
              {[['Brand', sub.brand], ['Model', sub.model], ['Year', sub.year], ['Condition', sub.condition], ['Location', sub.location]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Documents</p>
            {sub.documents.map(doc => (
              <div key={doc} className="flex items-center gap-2 p-2 mb-2" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                <span className="text-sm">📄</span>
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionReviewPage;
