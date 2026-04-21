import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, DollarSign, CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useNotification } from '../../context/NotificationContext';

const EQUIPMENT = {
  'EQ-01': { name: 'CAT 320 Excavator', pricePerDay: 8500, owner: 'Getachew Alemayehu', location: 'Addis Ababa' },
};
const TIME_SLOTS = [
  { value: 'full_day',  label: 'Full Day (6AM–8PM)' },
  { value: 'morning',   label: 'Morning (6AM–12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM–6PM)' },
  { value: 'weekly',    label: 'Weekly Rental' },
];

const BookingFormPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const eq = EQUIPMENT[id] || { name: 'CAT 320 Excavator', pricePerDay: 8500, owner: 'Getachew A.', location: 'Addis Ababa' };

  const [form, setForm] = useState({ startDate: '', endDate: '', timeSlot: '', notes: '', deliveryAddress: '' });
  const [errors, setErrors] = useState({});
  const [step, setStep]     = useState(0); // 0=form, 1=confirm, 2=done
  const [loading, setLoading] = useState(false);

  const days = form.startDate && form.endDate
    ? Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
    : 0;
  const total = days * eq.pricePerDay;

  const validate = () => {
    const e = {};
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate)   e.endDate   = 'End date is required';
    if (!form.timeSlot)  e.timeSlot  = 'Please select a time slot';
    if (form.startDate && form.endDate && form.endDate <= form.startDate) e.endDate = 'End date must be after start';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleNext = () => { if (validate()) setStep(1); };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    success('Booking Confirmed!', `Your booking for ${eq.name} has been submitted.`);
    setLoading(false);
    setStep(2);
    setTimeout(() => navigate('/customer/bookings'), 2000);
  };

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(er => ({ ...er, [k]: '' })); };

  if (step === 2) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4" style={{ background: 'rgba(16,185,129,0.15)' }}>
        <CheckCircle className="w-8 h-8" style={{ color: 'var(--success)' }} />
      </div>
      <h2 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>Booking Submitted!</h2>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Redirecting to your bookings…</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={() => step === 0 ? navigate(-1) : setStep(0)}
        className="flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft className="w-4 h-4" /> {step === 0 ? 'Back' : 'Edit Booking'}
      </button>

      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          {step === 0 ? 'Book Equipment' : 'Confirm Booking'}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{eq.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form / Confirm */}
        <div className="lg:col-span-2">
          <div className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
            {step === 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Start Date" type="date" value={form.startDate} onChange={set('startDate')} error={errors.startDate} leftIcon={<Calendar className="w-4 h-4" />} required />
                  <Input label="End Date"   type="date" value={form.endDate}   onChange={set('endDate')}   error={errors.endDate}   leftIcon={<Calendar className="w-4 h-4" />} required />
                </div>
                <Select label="Time Slot" placeholder="Select time slot" options={TIME_SLOTS} value={form.timeSlot} onChange={set('timeSlot')} error={errors.timeSlot} required />
                <Input label="Delivery Address (optional)" placeholder="e.g. Bole, Addis Ababa" value={form.deliveryAddress} onChange={set('deliveryAddress')} leftIcon={<MapPin className="w-4 h-4" />} />
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Notes (optional)</label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any special requirements…"
                    className="w-full px-4 py-3 text-sm border outline-none resize-none"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }} />
                </div>
                <Button fullWidth size="lg" onClick={handleNext}>Continue to Confirm</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[['Equipment', eq.name], ['Owner', eq.owner], ['Location', eq.location], ['Start', form.startDate], ['End', form.endDate], ['Time Slot', TIME_SLOTS.find(s => s.value === form.timeSlot)?.label || ''], ['Days', days], ['Total', `ETB ${total.toLocaleString()}`]].map(([k, v]) => (
                    <div key={k} className="p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)' }}>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{k}</p>
                      <p className="text-sm font-medium" style={{ color: k === 'Total' ? 'var(--brand)' : 'var(--text-primary)', fontWeight: k === 'Total' ? 800 : 500 }}>{v}</p>
                    </div>
                  ))}
                </div>
                <Button fullWidth size="lg" loading={loading} onClick={handleConfirm}>Confirm Booking</Button>
              </div>
            )}
          </div>
        </div>

        {/* Summary card */}
        <div className="border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Price Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Daily rate</span>
              <span style={{ color: 'var(--text-primary)' }}>ETB {eq.pricePerDay.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Days</span>
              <span style={{ color: 'var(--text-primary)' }}>{days || '—'}</span>
            </div>
          </div>
          <div className="pt-3 border-t flex justify-between" style={{ borderColor: 'var(--border-base)' }}>
            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Total</span>
            <span className="font-black text-lg" style={{ color: 'var(--brand)' }}>
              {days ? `ETB ${total.toLocaleString()}` : '—'}
            </span>
          </div>
          <div className="mt-4 p-3" style={{ background: 'var(--brand-muted)', borderRadius: 'var(--r-md)' }}>
            <p className="text-xs" style={{ color: 'var(--brand)' }}>Payment is collected by the owner upon delivery or equipment pickup.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
