import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Star, SlidersHorizontal } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Badge } from '../../components/ui/index.jsx';

const ALL = Array.from({ length: 20 }, (_, i) => ({
  id: `EQ-${String(i + 1).padStart(2, '0')}`,
  name: ['CAT 320 Excavator','HOWO Truck 371','Komatsu D65','Water Bowser','Liebherr Crane','SANY SY335','CAT 950 Loader','Bulldozer D8'][i % 8],
  price: [8500,4800,7200,4500,9500,7800,7200,6500][i % 8],
  rating: [4.9,4.7,4.8,4.6,4.5,4.8,4.6,4.7][i % 8],
  location: ['Addis Ababa','Dire Dawa','Adama','Hawassa'][i % 4],
  category: ['Excavator','Truck','Loader','Water Truck','Crane','Excavator','Loader','Bulldozer'][i % 8],
  available: i % 5 !== 3,
}));

const CATS = ['All','Excavator','Truck','Loader','Crane','Bulldozer','Water Truck'];
const CITIES = ['All','Addis Ababa','Dire Dawa','Adama','Hawassa'];

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [cat, setCat]       = useState('All');
  const [city, setCity]     = useState('All');
  const [maxPrice, setMax]  = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = ALL.filter(e =>
    (!search || e.name.toLowerCase().includes(search.toLowerCase()))
    && (cat  === 'All' || e.category === cat)
    && (city === 'All' || e.location === city)
    && (!maxPrice || e.price <= Number(maxPrice))
    && e.available
  );

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Browse Equipment</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{filtered.length} machines available</p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input placeholder="Search equipment…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
          </div>
          <Button variant="secondary" leftIcon={<SlidersHorizontal className="w-4 h-4" />} onClick={() => setShowFilters(s => !s)}>
            Filters
          </Button>
        </div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <Select placeholder="All Categories" options={CATS.map(c => ({ value: c, label: c }))} value={cat} onChange={e => setCat(e.target.value)} />
            <Select placeholder="All Cities" options={CITIES.map(c => ({ value: c, label: c }))} value={city} onChange={e => setCity(e.target.value)} />
            <Input type="number" placeholder="Max price/day (ETB)" value={maxPrice} onChange={e => setMax(e.target.value)} />
            <Button variant="ghost" onClick={() => { setSearch(''); setCat('All'); setCity('All'); setMax(''); }}>Clear All</Button>
          </motion.div>
        )}

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-3 py-1.5 text-xs font-semibold border transition-all"
              style={{ background: cat === c ? 'var(--brand)' : 'transparent', borderColor: cat === c ? 'var(--brand)' : 'var(--border-base)', color: cat === c ? '#fff' : 'var(--text-muted)', borderRadius: '100px' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No equipment found</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((eq, i) => (
              <motion.div key={eq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to={`/equipment/${eq.id}`}>
                  <div className="border overflow-hidden transition-all duration-200"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div className="h-36 flex items-center justify-center text-4xl" style={{ background: 'var(--bg-surface)' }}>⛏️</div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default" size="xs">{eq.category}</Badge>
                        <span className="text-xs" style={{ color: 'var(--warning)' }}>⭐ {eq.rating}</span>
                      </div>
                      <p className="font-bold text-sm mb-1 leading-tight" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{eq.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-black" style={{ color: 'var(--brand)' }}>ETB {eq.price.toLocaleString()}</span>
                          <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>/day</span>
                        </div>
                        <span className="text-xs font-bold px-2 py-1" style={{ background: 'var(--brand-muted)', color: 'var(--brand)', borderRadius: 'var(--r-sm)' }}>Book →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
