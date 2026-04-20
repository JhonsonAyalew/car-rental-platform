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

export default BookingFormPage;import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Calendar,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Info,
  Gift,
  FileText,
  Home,
  Briefcase,
  Users,
  Package,
  Wrench,
  Clock as ClockIcon,
  HardHat,
  Truck,
  Gauge,
  Star
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';

const BookingFormPage = () => {
  const { t } = useTranslation('bookingForm');
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalType, setRentalType] = useState('daily');
  const [hours, setHours] = useState(8);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    subcity: '',
    woreda: '',
    projectSiteAddress: '',
    driverLicense: '',
    operatorExperience: '',
    dateOfBirth: '',
    operatorIncluded: false,
    fuelIncluded: false,
    transportIncluded: false,
    needMaterials: false,
    materialType: '',
    materialQuantity: '',
    specialRequests: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  // Ethiopian cities
  const ethiopianCities = t('ethiopianCities', { returnObjects: true }) || [
    'Addis Ababa', 'Adama', 'Bahir Dar', 'Dire Dawa', 'Hawassa', 
    'Mekelle', 'Gondar', 'Jimma', 'Harar', 'Dessie', 'Debre Markos'
  ];
  
  const addOns = {
    operatorIncluded: { label: t('additionalServices.operator.label'), price: 250, description: t('additionalServices.operator.description'), unit: 'day' },
    fuelIncluded: { label: t('additionalServices.fuel.label'), price: 100, description: t('additionalServices.fuel.description'), unit: 'day' },
    transportIncluded: { label: t('additionalServices.transport.label'), price: 500, description: t('additionalServices.transport.description'), unit: 'one-time' }
  };
  
  const materialPrices = {
    cement: { label: t('materials.cement'), price: 120, unit: t('materials.perTon') },
    sand: { label: t('materials.sand'), price: 45, unit: t('materials.perTon') },
    gravel: { label: t('materials.gravel'), price: 40, unit: t('materials.perTon') },
    steel: { label: t('materials.steel'), price: 850, unit: t('materials.perTon') },
    bricks: { label: t('materials.bricks'), price: 0.50, unit: t('materials.perPiece') },
    aggregate: { label: t('materials.aggregate'), price: 55, unit: t('materials.perTon') }
  };
  
  useEffect(() => {
    fetchEquipmentDetails();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setPickupDate(tomorrow.toISOString().split('T')[0]);
    setDropoffDate(nextWeek.toISOString().split('T')[0]);
  }, [equipmentId]);
  
  useEffect(() => {
    if ((pickupDate && dropoffDate && equipment) || (rentalType === 'hourly' && hours > 0 && equipment)) {
      calculateTotalPrice();
    }
  }, [pickupDate, dropoffDate, equipment, formData.operatorIncluded, formData.fuelIncluded, formData.transportIncluded, formData.needMaterials, formData.materialType, formData.materialQuantity, rentalType, hours]);
  
  const fetchEquipmentDetails = () => {
    setTimeout(() => {
      const equipmentData = {
        1: { id: 1, name: 'CAT 320 Excavator', brand: 'Caterpillar', price: 8500, hourlyRate: 1200, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10', location: 'Addis Ababa', type: 'Excavator', attachment: 'Shovel', weight: '20 tons', owner: { name: 'Heavy Machinery PLC', phone: '+251 911 234567', email: 'rentals@heavymachinery.com' } },
        2: { id: 2, name: 'SANY SY335 Excavator', brand: 'SANY', price: 7800, hourlyRate: 1100, rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_ud0B5zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10', location: 'Dire Dawa', type: 'Excavator', attachment: 'Hammer', weight: '33 tons', owner: { name: 'SANY Ethiopia', phone: '+251 922 345678', email: 'sany@ethiopia.com' } },
        3: { id: 3, name: 'CAT 950 Wheel Loader', brand: 'Caterpillar', price: 7200, hourlyRate: 1000, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10', location: 'Hawassa', type: 'Loader', attachment: 'Bucket', weight: '25 tons', owner: { name: 'Hawassa Construction', phone: '+251 933 456789', email: 'hawassa@construction.com' } },
        5: { id: 5, name: 'Komatsu D65 Bulldozer', brand: 'Komatsu', price: 9000, hourlyRate: 1300, rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10', location: 'Adama', type: 'Bulldozer', attachment: 'Blade', weight: '22 tons', owner: { name: 'Adama Heavy Equipment', phone: '+251 944 567890', email: 'adama@heavy.com' } },
        8: { id: 8, name: 'Liebherr LTM 1050 Crane', brand: 'Liebherr', price: 18000, hourlyRate: 2500, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10', location: 'Addis Ababa', type: 'Crane', attachment: 'Hook', weight: '50 tons', owner: { name: 'Tower Crane PLC', phone: '+251 955 678901', email: 'tower@crane.com' } },
        12: { id: 12, name: 'Sinotruk HOWO 371', brand: 'Sinotruk', price: 4800, hourlyRate: 680, rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10', location: 'Addis Ababa', type: 'Dump Truck', attachment: 'Tipper', weight: '25 tons', owner: { name: 'Sinotruk Ethiopia', phone: '+251 966 789012', email: 'sinotruk@ethiopia.com' } }
      };
      
      const selectedEquipment = equipmentData[equipmentId] || {
        id: parseInt(equipmentId),
        name: 'Heavy Equipment',
        brand: 'Various Brands',
        price: 5000,
        hourlyRate: 700,
        rating: 4.5,
        image: 'https://via.placeholder.com/400',
        location: 'Addis Ababa',
        type: 'Heavy Equipment',
        attachment: 'Standard',
        weight: 'Various',
        owner: { name: 'Equipment Rental Co.', phone: '+251 911 000000', email: 'rentals@equipment.com' }
      };
      
      setEquipment(selectedEquipment);
      setLoading(false);
    }, 500);
  };
  
  const calculateTotalPrice = () => {
    let basePrice = 0;
    
    if (rentalType === 'daily') {
      const days = Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
      const validDays = days > 0 ? days : 1;
      setTotalDays(validDays);
      basePrice = equipment.price * validDays;
      
      if (formData.operatorIncluded) basePrice += addOns.operatorIncluded.price * validDays;
      if (formData.fuelIncluded) basePrice += addOns.fuelIncluded.price * validDays;
      if (formData.transportIncluded) basePrice += addOns.transportIncluded.price;
    } else {
      const validHours = hours > 0 ? hours : 1;
      setHours(validHours);
      basePrice = equipment.hourlyRate * validHours;
      
      if (formData.operatorIncluded) basePrice += (addOns.operatorIncluded.price / 8) * validHours;
      if (formData.fuelIncluded) basePrice += (addOns.fuelIncluded.price / 8) * validHours;
      if (formData.transportIncluded) basePrice += addOns.transportIncluded.price;
    }
    
    if (formData.needMaterials && formData.materialType && formData.materialQuantity) {
      const material = materialPrices[formData.materialType];
      if (material) {
        basePrice += material.price * parseFloat(formData.materialQuantity);
      }
    }
    
    setTotalPrice(basePrice);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = t('validation.firstNameRequired');
    if (!formData.lastName) newErrors.lastName = t('validation.lastNameRequired');
    if (!formData.email) newErrors.email = t('validation.emailRequired');
    if (!formData.phone) newErrors.phone = t('validation.phoneRequired');
    if (!formData.address) newErrors.address = t('validation.addressRequired');
    if (!formData.city) newErrors.city = t('validation.cityRequired');
    if (!formData.subcity) newErrors.subcity = t('validation.subcityRequired');
    if (!formData.projectSiteAddress) newErrors.projectSiteAddress = t('validation.projectSiteRequired');
    if (!formData.driverLicense) newErrors.driverLicense = t('validation.licenseRequired');
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t('validation.dobRequired');
    
    if (formData.needMaterials) {
      if (!formData.materialType) newErrors.materialType = t('validation.materialTypeRequired');
      if (!formData.materialQuantity) newErrors.materialQuantity = t('validation.materialQuantityRequired');
    }
    
    if (!formData.agreeTerms) newErrors.agreeTerms = t('validation.termsRequired');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(t('toast.fixErrors'));
      return;
    }
    
    setSubmitting(true);
    toast.loading(t('toast.submitting'), { id: 'booking' });
    
    setTimeout(() => {
      toast.success(t('toast.success'), { id: 'booking' });
      setTimeout(() => {
        navigate('/customer/bookings');
      }, 2000);
    }, 2000);
  };
  
  const getAddOnPrice = (addOnKey) => {
    if (!formData[addOnKey]) return 0;
    if (rentalType === 'daily') {
      if (addOnKey === 'transportIncluded') return addOns.transportIncluded.price;
      return addOns[addOnKey].price * totalDays;
    } else {
      if (addOnKey === 'transportIncluded') return addOns.transportIncluded.price;
      return (addOns[addOnKey].price / 8) * hours;
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 min-h-screen py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#52525B] hover:text-[#D97706] transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('page.backButton')}
          </button>
          
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">{t('page.title')}</h1>
          <p className="text-[#52525B]">{t('page.subtitle')}</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Equipment Summary Card */}
              <Card>
                <div className="flex gap-4">
                  <img 
                    src={equipment.image} 
                    alt={equipment.name} 
                    className="w-24 h-24 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128x128?text=Equipment';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{equipment.name}</h3>
                      <Badge variant="approved">⭐ {equipment.rating}</Badge>
                    </div>
                    <p className="text-sm text-[#52525B]">{equipment.brand} • {equipment.type}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{equipment.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{equipment.weight}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wrench className="w-3 h-3" />
                        <span>{equipment.attachment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Rental Type Selection */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ClockIcon className="text-[#D97706]" />
                  {t('rentalType.title')}
                </h2>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 p-3 border border-[#E4E4E7] rounded-lg cursor-pointer hover:bg-[#F9F8F6] flex-1">
                    <input
                      type="radio"
                      name="rentalType"
                      value="daily"
                      checked={rentalType === 'daily'}
                      onChange={() => setRentalType('daily')}
                      className="text-[#D97706]"
                    />
                    <div>
                      <span className="font-medium">{t('rentalType.daily')}</span>
                      <p className="text-xs text-[#52525B]">{formatCurrency(equipment.price)}{t('rentalType.perDay')}</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-[#E4E4E7] rounded-lg cursor-pointer hover:bg-[#F9F8F6] flex-1">
                    <input
                      type="radio"
                      name="rentalType"
                      value="hourly"
                      checked={rentalType === 'hourly'}
                      onChange={() => setRentalType('hourly')}
                      className="text-[#D97706]"
                    />
                    <div>
                      <span className="font-medium">{t('rentalType.hourly')}</span>
                      <p className="text-xs text-[#52525B]">{formatCurrency(equipment.hourlyRate)}{t('rentalType.perHour')}</p>
                    </div>
                  </label>
                </div>
                
                {rentalType === 'daily' ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="date"
                      label={t('rentalType.pickupDate')}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                    />
                    <Input
                      type="date"
                      label={t('rentalType.returnDate')}
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <Input
                      type="number"
                      label={t('rentalType.numberOfHours')}
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value))}
                      min="1"
                      max="24"
                      required
                    />
                  </div>
                )}
              </Card>
              
              {/* Personal Information */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="text-[#D97706]" />
                  {t('personalInfo.title')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('personalInfo.firstName')}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label={t('personalInfo.lastName')}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    error={errors.lastName}
                    required
                  />
                  <Input
                    label={t('personalInfo.email')}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                  <Input
                    label={t('personalInfo.phone')}
                    type="tel"
                    placeholder="+251 XXX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                    required
                  />
                </div>
              </Card>
              
              {/* Address Information - Ethiopian Format */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Home className="text-[#D97706]" />
                  {t('addressInfo.title')}
                </h2>
                <div className="space-y-4">
                  <Input
                    label={t('addressInfo.streetAddress')}
                    placeholder="House number, street name"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={errors.address}
                    required
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">{t('addressInfo.city')}</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-[#D97706] ${errors.city ? 'border-red-500' : 'border-[#E4E4E7]'}`}
                      >
                        <option value="">{t('addressInfo.selectCity')}</option>
                        {ethiopianCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <Input
                      label={t('addressInfo.subcity')}
                      placeholder="e.g., Bole, Kazanchis"
                      value={formData.subcity}
                      onChange={(e) => setFormData({ ...formData, subcity: e.target.value })}
                      error={errors.subcity}
                      required
                    />
                    <Input
                      label={t('addressInfo.woreda')}
                      placeholder="e.g., Woreda 03"
                      value={formData.woreda}
                      onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
              
              {/* Project Site Address */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="text-[#D97706]" />
                  {t('projectSite.title')}
                </h2>
                <textarea
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706]"
                  rows="2"
                  placeholder={t('projectSite.placeholder')}
                  value={formData.projectSiteAddress}
                  onChange={(e) => setFormData({ ...formData, projectSiteAddress: e.target.value })}
                />
                {errors.projectSiteAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.projectSiteAddress}</p>
                )}
              </Card>
              
              {/* Operator Information */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="text-[#D97706]" />
                  {t('operatorInfo.title')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('operatorInfo.licenseNumber')}
                    placeholder="e.g., 123456789"
                    value={formData.driverLicense}
                    onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                    error={errors.driverLicense}
                    required
                  />
                  <Input
                    type="date"
                    label={t('operatorInfo.dateOfBirth')}
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    error={errors.dateOfBirth}
                    required
                  />
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                      {t('operatorInfo.experience')}
                    </label>
                    <select
                      value={formData.operatorExperience}
                      onChange={(e) => setFormData({ ...formData, operatorExperience: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                    >
                      <option value="">{t('operatorInfo.experiencePlaceholder')}</option>
                      <option value="0-1">{t('operatorInfo.lessThan1Year')}</option>
                      <option value="1-3">{t('operatorInfo.years1to3')}</option>
                      <option value="3-5">{t('operatorInfo.years3to5')}</option>
                      <option value="5-10">{t('operatorInfo.years5to10')}</option>
                      <option value="10+">{t('operatorInfo.years10plus')}</option>
                    </select>
                  </div>
                </div>
              </Card>
              
              {/* Additional Options */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Gift className="text-[#D97706]" />
                  {t('additionalServices.title')}
                </h2>
                <div className="space-y-3">
                  {Object.entries(addOns).map(([key, option]) => (
                    <label key={key} className="flex items-start gap-3 p-3 border border-[#E4E4E7] rounded-lg hover:bg-[#F9F8F6] cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="mt-1 text-[#D97706] rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-[#D97706]">+{formatCurrency(option.price)}/{option.unit === 'one-time' ? t('additionalServices.oneTime') : t(`additionalServices.${option.unit}`)}</span>
                        </div>
                        <p className="text-sm text-[#52525B]">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>
              
              {/* Construction Materials Add-on */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Package className="text-[#D97706]" />
                  {t('materials.title')}
                </h2>
                <label className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={formData.needMaterials}
                    onChange={(e) => setFormData({ ...formData, needMaterials: e.target.checked })}
                    className="text-[#D97706] rounded"
                  />
                  <span>{t('materials.checkbox')}</span>
                </label>
                
                {formData.needMaterials && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">{t('materials.materialType')}</label>
                        <select
                          value={formData.materialType}
                          onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                          className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                        >
                          <option value="">{t('materials.selectMaterial')}</option>
                          {Object.entries(materialPrices).map(([key, material]) => (
                            <option key={key} value={key}>
                              {material.label} - {formatCurrency(material.price)}/{material.unit}
                            </option>
                          ))}
                        </select>
                        {errors.materialType && (
                          <p className="text-red-500 text-xs mt-1">{errors.materialType}</p>
                        )}
                      </div>
                      <Input
                        label={`${t('materials.quantity')} (${materialPrices[formData.materialType]?.unit || t('materials.perTon')})`}
                        type="number"
                        placeholder="Enter quantity"
                        value={formData.materialQuantity}
                        onChange={(e) => setFormData({ ...formData, materialQuantity: e.target.value })}
                        error={errors.materialQuantity}
                      />
                    </div>
                  </motion.div>
                )}
              </Card>
              
              {/* Special Requests */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="text-[#D97706]" />
                  {t('specialRequests.title')}
                </h2>
                <textarea
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706]"
                  rows="3"
                  placeholder={t('specialRequests.placeholder')}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                />
              </Card>
              
              {/* Payment Notice */}
              <Card className="bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">{t('paymentNotice.title')}</h3>
                    <p className="text-sm text-blue-700">
                      {t('paymentNotice.description')}
                    </p>
                  </div>
                </div>
              </Card>
              
              {/* Terms Agreement */}
              <Card>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-1 text-[#D97706] rounded"
                  />
                  <div>
                    <span className="text-sm">
                      {t('termsAgreement.confirmText')}{' '}
                      <a href="#" className="text-[#D97706] hover:underline">{t('termsAgreement.termsAndConditions')}</a>
                      {' '}{t('termsAgreement.and')}{' '}
                      <a href="#" className="text-[#D97706] hover:underline">{t('termsAgreement.rentalAgreement')}</a>
                    </span>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>
                    )}
                  </div>
                </label>
              </Card>
              
              <Button type="submit" size="lg" className="w-full" isLoading={submitting}>
                {t('submitButton')} - {formatCurrency(totalPrice)}
              </Button>
            </form>
          </div>
          
          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h2 className="text-lg font-semibold mb-4">{t('bookingSummary.title')}</h2>
                
                <div className="space-y-3 mb-4">
                  {rentalType === 'daily' ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">{t('bookingSummary.equipmentRental')} ({totalDays} {t('bookingSummary.days')})</span>
                      <span>{formatCurrency(equipment.price)} × {totalDays} = {formatCurrency(equipment.price * totalDays)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">{t('bookingSummary.equipmentRental')} ({hours} {t('bookingSummary.hours')})</span>
                      <span>{formatCurrency(equipment.hourlyRate)} × {hours} = {formatCurrency(equipment.hourlyRate * hours)}</span>
                    </div>
                  )}
                  
                  {formData.operatorIncluded && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">{addOns.operatorIncluded.label}</span>
                      <span>+{formatCurrency(getAddOnPrice('operatorIncluded'))}</span>
                    </div>
                  )}
                  
                  {formData.fuelIncluded && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">{addOns.fuelIncluded.label}</span>
                      <span>+{formatCurrency(getAddOnPrice('fuelIncluded'))}</span>
                    </div>
                  )}
                  
                  {formData.transportIncluded && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">{addOns.transportIncluded.label}</span>
                      <span>+{formatCurrency(getAddOnPrice('transportIncluded'))}</span>
                    </div>
                  )}
                  
                  {formData.needMaterials && formData.materialType && formData.materialQuantity && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">
                        {t('materials.title')} ({materialPrices[formData.materialType]?.label})
                      </span>
                      <span>+{formatCurrency(materialPrices[formData.materialType]?.price * parseFloat(formData.materialQuantity || 0))}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-[#E4E4E7] pt-3 mb-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t('bookingSummary.totalEstimate')}</span>
                    <span className="text-[#D97706]">{formatCurrency(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-1">{t('bookingSummary.finalPriceNote')}</p>
                </div>
                
                <div className="space-y-2 text-xs text-[#52525B]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span>{t('bookingSummary.protected')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-blue-500" />
                    <span>{t('bookingSummary.freeCancellation')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{t('bookingSummary.contactForPayment')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3 h-3 text-[#D97706]" />
                    <span>{t('bookingSummary.deliveryAvailable')}</span>
                  </div>
                </div>
              </Card>
              
              {/* Need Help Card */}
              <Card className="mt-4 bg-[#FEF3C7]">
                <h3 className="font-semibold mb-2">{t('needHelp.title')}</h3>
                <p className="text-sm text-[#92400E] mb-3">{t('needHelp.subtitle')}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+251 911 234567</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Mail className="w-4 h-4" />
                  <span>support@equipmentrental.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{t('needHelp.hours')}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFormPage;
