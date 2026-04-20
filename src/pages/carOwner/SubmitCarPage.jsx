import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, HardHat, DollarSign,
  MapPin, FileText, Image as ImageIcon, Upload,
} from 'lucide-react';
import Button   from '../../components/ui/Button';
import Input    from '../../components/ui/Input';
import Select   from '../../components/ui/Select';
import { useNotification } from '../../context/NotificationContext';

const STEPS = [
  { id: 'basic',    label: 'Basic Info',   icon: HardHat   },
  { id: 'details',  label: 'Details',      icon: FileText   },
  { id: 'pricing',  label: 'Pricing',      icon: DollarSign },
  { id: 'location', label: 'Location',     icon: MapPin     },
  { id: 'media',    label: 'Media & Docs', icon: ImageIcon  },
];

const CATEGORIES = ['Excavator','Bulldozer','Loader','Crane','Truck','Water Truck','Grader','Compactor','Generator','Other'].map(c => ({ value: c.toLowerCase().replace(' ','_'), label: c }));
const CITIES     = ['Addis Ababa','Dire Dawa','Adama','Hawassa','Bahir Dar','Mekelle','Jimma','Gondar'].map(c => ({ value: c, label: c }));
const CONDITIONS = [{ value: 'excellent', label: 'Excellent' },{ value: 'good', label: 'Good' },{ value: 'fair', label: 'Fair' }];

const INITIAL = {
  name: '', brand: '', model: '', year: '', category: '', condition: '',
  engine: '', power: '', weight: '', maxReach: '', description: '',
  pricePerDay: '', pricePerWeek: '', depositRequired: '',
  availableFrom: '', availableTo: '', minRentalDays: '1',
  city: '', specificAddress: '', deliveryAvailable: false, deliveryRadius: '',
  images: [], documents: [],
};

const SubmitCarPage = () => {
  const { t }    = useTranslation('submitEquipment');
  const navigate = useNavigate();
  const { success, error } = useNotification();

  const [step,    setStep]    = useState(0);
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const set  = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };
  const setN = (k) => (e) => set(k, e.target.value);

  const validateStep = (s) => {
    const err = {};
    if (s === 0) {
      if (!form.name)      err.name      = 'Equipment name is required';
      if (!form.brand)     err.brand     = 'Brand is required';
      if (!form.category)  err.category  = 'Category is required';
      if (!form.year)      err.year      = 'Year is required';
      if (!form.condition) err.condition = 'Condition is required';
    }
    if (s === 2) {
      if (!form.pricePerDay) err.pricePerDay = 'Daily price is required';
    }
    if (s === 3) {
      if (!form.city) err.city = 'City is required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    success('Submitted!', 'Your equipment has been submitted for review. We\'ll notify you within 24 hours.');
    setLoading(false);
    navigate('/owner/submissions');
  };

  const stepContent = [
    /* ── Step 0: Basic Info ── */
    <div key="basic" className="space-y-4">
      <Input label="Equipment Name" placeholder="e.g. CAT 320 Excavator with Shovel" value={form.name} onChange={setN('name')} error={errors.name} required leftIcon={<HardHat className="w-4 h-4" />} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Brand" placeholder="e.g. Caterpillar" value={form.brand} onChange={setN('brand')} error={errors.brand} required />
        <Input label="Model" placeholder="e.g. 320" value={form.model} onChange={setN('model')} />
        <Select label="Category" placeholder="Select category" options={CATEGORIES} value={form.category} onChange={setN('category')} error={errors.category} required />
        <Input label="Year" type="number" placeholder="e.g. 2022" value={form.year} onChange={setN('year')} error={errors.year} required />
        <Select label="Condition" placeholder="Select condition" options={CONDITIONS} value={form.condition} onChange={setN('condition')} error={errors.condition} required />
      </div>
    </div>,

    /* ── Step 1: Details ── */
    <div key="details" className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Description</label>
        <textarea rows={4} value={form.description} onChange={setN('description')} placeholder="Describe your equipment, its condition, history, and any special features…"
          className="w-full px-4 py-3 text-sm border outline-none resize-y transition-all"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }} />
      </div>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Specifications (optional)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Engine" placeholder="e.g. Cat C7.1 ACERT" value={form.engine} onChange={setN('engine')} />
        <Input label="Power (kW)" type="number" placeholder="e.g. 122" value={form.power} onChange={setN('power')} />
        <Input label="Weight (kg)" type="number" placeholder="e.g. 20000" value={form.weight} onChange={setN('weight')} />
        <Input label="Max Reach (m)" type="number" placeholder="e.g. 9.6" value={form.maxReach} onChange={setN('maxReach')} />
      </div>
    </div>,

    /* ── Step 2: Pricing ── */
    <div key="pricing" className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Price per Day (ETB)" type="number" placeholder="e.g. 8500" value={form.pricePerDay} onChange={setN('pricePerDay')} error={errors.pricePerDay} required leftIcon={<DollarSign className="w-4 h-4" />} />
        <Input label="Price per Week (ETB)" type="number" placeholder="e.g. 50000" value={form.pricePerWeek} onChange={setN('pricePerWeek')} leftIcon={<DollarSign className="w-4 h-4" />} hint="Leave empty to auto-calculate" />
        <Input label="Security Deposit (ETB)" type="number" placeholder="e.g. 20000" value={form.depositRequired} onChange={setN('depositRequired')} leftIcon={<DollarSign className="w-4 h-4" />} />
        <Input label="Minimum Rental Days" type="number" min="1" placeholder="1" value={form.minRentalDays} onChange={setN('minRentalDays')} />
        <Input label="Available From" type="date" value={form.availableFrom} onChange={setN('availableFrom')} />
        <Input label="Available To" type="date" value={form.availableTo} onChange={setN('availableTo')} hint="Leave empty for ongoing availability" />
      </div>

      {form.pricePerDay && (
        <div className="p-4 border" style={{ borderColor: 'var(--brand-border)', background: 'var(--brand-muted)', borderRadius: 'var(--r-md)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--brand)' }}>Pricing Preview</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Daily', `ETB ${Number(form.pricePerDay).toLocaleString()}`],
              ['Weekly', `ETB ${(form.pricePerWeek || Number(form.pricePerDay) * 7).toLocaleString()}`],
              ['Monthly', `ETB ${(Number(form.pricePerDay) * 28).toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k} className="text-center">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{k}</p>
                <p className="text-sm font-black" style={{ color: 'var(--brand)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>,

    /* ── Step 3: Location ── */
    <div key="location" className="space-y-4">
      <Select label="City" placeholder="Select city" options={CITIES} value={form.city} onChange={setN('city')} error={errors.city} required leftIcon={<MapPin className="w-4 h-4" />} />
      <Input label="Specific Address / Landmark" placeholder="e.g. Bole, near Edna Mall" value={form.specificAddress} onChange={setN('specificAddress')} leftIcon={<MapPin className="w-4 h-4" />} />

      <div className="flex items-center justify-between p-4 border" style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Delivery Available</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Can you deliver to customer sites?</p>
        </div>
        <button onClick={() => set('deliveryAvailable', !form.deliveryAvailable)}
          className="relative w-10 h-5 rounded-full transition-colors"
          style={{ background: form.deliveryAvailable ? 'var(--brand)' : 'var(--border-base)' }}>
          <span className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
            style={{ left: form.deliveryAvailable ? '22px' : '2px' }} />
        </button>
      </div>

      {form.deliveryAvailable && (
        <Input label="Delivery Radius (km)" type="number" placeholder="e.g. 50" value={form.deliveryRadius} onChange={setN('deliveryRadius')} />
      )}
    </div>,

    /* ── Step 4: Media ── */
    <div key="media" className="space-y-5">
      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Equipment Photos <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(min 3 recommended)</span></p>
        <div className="border-2 border-dashed p-8 text-center transition-colors"
          style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--brand-muted)', borderRadius: 'var(--r-md)' }}>
            <Upload className="w-6 h-6" style={{ color: 'var(--brand)' }} />
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Upload photos</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>PNG, JPG up to 10MB each. Max 10 photos.</p>
          <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold cursor-pointer border transition-colors"
            style={{ borderColor: 'var(--border-base)', color: 'var(--text-secondary)', borderRadius: 'var(--r-md)' }}>
            <Upload className="w-3.5 h-3.5" />
            Browse Files
            <input type="file" multiple accept="image/*" className="hidden"
              onChange={e => set('images', [...form.images, ...Array.from(e.target.files || [])])} />
          </label>
        </div>
        {form.images.length > 0 && (
          <p className="text-xs mt-2" style={{ color: 'var(--success)' }}>✓ {form.images.length} file(s) selected</p>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Documents <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(registration, insurance)</span></p>
        <div className="border-2 border-dashed p-6 text-center"
          style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Upload PDF documents</p>
          <label className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold cursor-pointer border transition-colors"
            style={{ borderColor: 'var(--border-base)', color: 'var(--text-secondary)', borderRadius: 'var(--r-md)' }}>
            <Upload className="w-3.5 h-3.5" /> Browse
            <input type="file" multiple accept=".pdf" className="hidden"
              onChange={e => set('documents', [...form.documents, ...Array.from(e.target.files || [])])} />
          </label>
        </div>
        {form.documents.length > 0 && (
          <p className="text-xs mt-2" style={{ color: 'var(--success)' }}>✓ {form.documents.length} document(s) selected</p>
        )}
      </div>
    </div>,
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          {t('title') || 'Submit Equipment'}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle') || 'List your equipment for rent on the platform'}
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <button onClick={() => i < step && setStep(i)}
              className="flex items-center gap-1.5 px-2 py-1.5 transition-all text-xs font-semibold"
              style={{
                background:   i === step ? 'var(--brand-muted)' : 'transparent',
                color:        i < step ? 'var(--success)' : i === step ? 'var(--brand)' : 'var(--text-faint)',
                borderRadius: 'var(--r-md)',
                cursor:       i < step ? 'pointer' : 'default',
              }}>
              <div className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black flex-shrink-0"
                style={{ background: i < step ? 'var(--success)' : i === step ? 'var(--brand)' : 'var(--bg-overlay)', color: i <= step ? '#fff' : 'var(--text-muted)' }}>
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <div className="flex-1 h-px" style={{ background: i < step ? 'var(--success)' : 'var(--border-base)' }} />}
          </React.Fragment>
        ))}
      </div>

      {/* Form card */}
      <div className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-2 mb-5">
          {React.createElement(STEPS[step].icon, { className: 'w-5 h-5', style: { color: 'var(--brand)' } })}
          <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{STEPS[step].label}</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6 pt-5 border-t" style={{ borderColor: 'var(--border-base)' }}>
          <Button variant="secondary" onClick={prev} disabled={step === 0} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} loading={loading}>Submit for Review</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitCarPage;
