import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Shield, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/index.jsx';
import { useAuth } from '../../context/AuthContext';

const MOCK_EQ = {
  id: 'EQ-01', name: 'CAT 320 Excavator with Shovel', brand: 'Caterpillar', model: '320', year: 2022,
  category: 'Excavator', condition: 'Excellent', rating: 4.9, reviewCount: 14, pricePerDay: 8500,
  pricePerWeek: 50000, location: 'Addis Ababa, Bole', owner: { name: 'Getachew Alemayehu', rating: 4.9, equipment: 6 },
  description: 'Well-maintained CAT 320 excavator in excellent condition. Full service history. Equipped with standard shovel. Experienced operator available upon request.',
  specifications: { weight: '20,000 kg', engine: 'Cat C7.1 ACERT', power: '122 kW', maxReach: '9.6 m', bucketCapacity: '0.8 m³' },
  features: ['Full service history', 'Operator available', 'Insurance included', 'Delivery available', '24/7 support'],
  available: true,
};

const CarDetailPage = () => {
  const { id }            = useParams();
  const { isAuthenticated } = useAuth();
  const eq = MOCK_EQ;

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/search" className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image */}
            <div className="h-64 flex items-center justify-center text-7xl border"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>⛏️</div>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="brand">{eq.category}</Badge>
                <Badge variant="success">{eq.condition}</Badge>
                {eq.available && <Badge variant="success">Available</Badge>}
              </div>
              <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{eq.name}</h1>
              <div className="flex items-center flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {eq.location}</span>
                <span>⭐ {eq.rating} ({eq.reviewCount} reviews)</span>
                <span>{eq.brand} · {eq.year}</span>
              </div>
            </div>

            {/* Description */}
            <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
              <h2 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>Description</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{eq.description}</p>
            </div>

            {/* Specs */}
            <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
              <h2 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(eq.specifications).map(([k, v]) => (
                  <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                    <p className="text-xs font-semibold capitalize mb-0.5" style={{ color: 'var(--text-muted)' }}>{k.replace(/([A-Z])/g,' $1')}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
              <h2 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Included Features</h2>
              <div className="grid grid-cols-2 gap-2">
                {eq.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--success)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="space-y-4">
            <div className="border p-5 sticky top-20" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black" style={{ color: 'var(--brand)' }}>ETB {eq.pricePerDay.toLocaleString()}</span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>/day</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Weekly: ETB {eq.pricePerWeek.toLocaleString()}</p>
              </div>

              {isAuthenticated ? (
                <Link to={`/customer/book/${eq.id}`}>
                  <Button fullWidth size="lg">Book Now</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button fullWidth size="lg">Sign in to Book</Button>
                </Link>
              )}

              <div className="mt-4 space-y-2">
                {[['Free cancellation', '24 hrs before start'], ['Secure booking', 'Platform protection'], ['Verified owner', 'ID & equipment checked']].map(([t, s]) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner */}
            <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Equipment Owner</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-white"
                  style={{ background: 'var(--brand)', fontSize: 14 }}>
                  {eq.owner.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{eq.owner.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>⭐ {eq.owner.rating} · {eq.owner.equipment} machines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
