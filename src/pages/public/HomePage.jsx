import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Shield, Clock, Star, ArrowRight, ChevronRight, HardHat, Truck, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';

const CATEGORIES = [
  { name: 'Excavators',  icon: '⛏️', count: 45 },
  { name: 'Trucks',      icon: '🚚', count: 89 },
  { name: 'Loaders',     icon: '🚜', count: 32 },
  { name: 'Cranes',      icon: '🏗️', count: 12 },
  { name: 'Bulldozers',  icon: '🚧', count: 18 },
  { name: 'Water Trucks',icon: '💧', count: 14 },
];

const FEATURES = [
  { icon: Shield, title: 'Verified Equipment',  desc: 'All machinery is inspected and verified before listing', color: 'var(--success)' },
  { icon: Clock,  title: 'Fast Booking',         desc: 'Book in minutes — available for same-day confirmation',  color: 'var(--brand)' },
  { icon: Star,   title: 'Top-Rated Owners',     desc: 'Work with trusted, highly-rated equipment owners',      color: 'var(--warning)' },
  { icon: Zap,    title: 'Flexible Rentals',     desc: 'Daily, weekly, or monthly — your terms',               color: '#8b5cf6' },
];

const FEATURED = [
  { id: 'EQ-01', name: 'CAT 320 Excavator',    price: 8500,  rating: 4.9, location: 'Addis Ababa', category: 'Excavator' },
  { id: 'EQ-02', name: 'Sinotruk HOWO 371',    price: 4800,  rating: 4.7, location: 'Dire Dawa',   category: 'Truck' },
  { id: 'EQ-03', name: 'SANY SY335 Excavator', price: 7800,  rating: 4.8, location: 'Adama',       category: 'Excavator' },
  { id: 'EQ-04', name: 'Komatsu D65 Loader',   price: 7200,  rating: 4.6, location: 'Hawassa',     category: 'Loader' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.07, duration: 0.45, ease:[0.22,1,0.36,1] } }) };

const HomePage = () => {
  const { t } = useTranslation('Home');

  return (
    <div>
     {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06]"
            style={{ background: 'var(--brand)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-[0.04]"
            style={{ background: '#8b5cf6', filter: 'blur(60px)' }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-bold border"
              style={{ background: 'var(--brand-muted)', borderColor: 'var(--brand-border)', color: 'var(--brand)', borderRadius: '100px' }}>
              <Zap className="w-3 h-3" />
              {t('hero.badge') || "Ethiopia's #1 Equipment Rental Platform"}
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show"
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {t('hero.title') || 'Rent Heavy Equipment'}<br />
              <span style={{ color: 'var(--brand)' }}>Across Ethiopia</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="show"
              className="text-lg mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {t('hero.subtitle') || 'Connect with verified equipment owners. Book excavators, trucks, cranes and more — fast and affordable.'}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className="flex flex-wrap gap-3">
              <Link to="/search">
                <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t('hero.cta') || 'Browse Equipment'}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="xl" variant="outline">
                  {t('hero.secondary') || 'List Your Equipment'}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show" className="flex flex-wrap gap-6 mt-10 pt-8 border-t" style={{ borderColor: 'var(--border-base)' }}>
              {[['234+', 'Machines'], ['1,240+', 'Happy Users'], ['ETB 2.8M+', 'Total Value']].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black" style={{ color: 'var(--brand)' }}>{v}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 px-4" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {t('categories.title') || 'Browse by Category'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Find the right equipment for your project</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/search?category=${cat.name.toLowerCase()}`}>
                  <div className="border p-4 text-center transition-all duration-200"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{cat.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cat.count} listed</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Equipment ── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                {t('featured.title') || 'Featured Equipment'}
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Top-rated machines ready to book</p>
            </div>
            <Link to="/search" className="flex items-center gap-1 text-sm font-semibold transition-colors"
              style={{ color: 'var(--brand)' }}>
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED.map((eq, i) => (
              <motion.div key={eq.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={`/equipment/${eq.id}`}>
                  <div className="border overflow-hidden transition-all duration-200"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div className="h-40 flex items-center justify-center text-5xl"
                      style={{ background: 'var(--bg-surface)' }}>⛏️</div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ background: 'var(--brand-muted)', color: 'var(--brand)' }}>{eq.category}</span>
                        <span className="text-xs" style={{ color: 'var(--warning)' }}>⭐ {eq.rating}</span>
                      </div>
                      <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
                      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>📍 {eq.location}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-black" style={{ color: 'var(--brand)' }}>ETB {eq.price.toLocaleString()}</span>
                          <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>/day</span>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 border" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>Book Now</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 px-4" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {t('features.title') || 'Why Choose EquipRent?'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
                <div className="w-11 h-11 flex items-center justify-center mb-4"
                  style={{ background: `${f.color}15`, borderRadius: 'var(--r-md)' }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="border p-10" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--brand-border)', borderRadius: 'var(--r-2xl)', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% -20%, var(--brand-muted), transparent 60%)' }} />
            <div className="relative">
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--brand)', borderRadius: 'var(--r-xl)' }}>
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                {t('cta.title') || 'Own Equipment? Earn More.'}
              </h2>
              <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {t('cta.subtitle') || 'List your machines on EquipRent and earn passive income. Join 67 active equipment owners today.'}
              </p>
              <Link to="/register">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('cta.button') || 'Start Listing for Free'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
