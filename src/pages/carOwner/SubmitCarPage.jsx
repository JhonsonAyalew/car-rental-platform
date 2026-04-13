import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import StepProgress from '../../components/forms/StepProgress';
import ImageUploader from '../../components/forms/ImageUploader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { 
  HardHat,
  Calendar, 
  Fuel, 
  Settings, 
  Users, 
  Gauge,
  CheckCircle,
  AlertCircle,
  DollarSign,
  MapPin,
  Phone,
  Clock,
  Truck,
  Wrench,
  Package,
  Factory,
  Hammer
} from 'lucide-react';

const SubmitEquipmentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    
    // Equipment Details
    equipmentType: '',
    attachment: '',
    transmission: '',
    fuelType: '',
    operatingWeight: '',
    enginePower: '',
    features: [],
    
    // Photos
    images: [],
    
    // Pricing (in ETB)
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    pricePerHour: '',
    securityDeposit: '',
    lateFee: '',
    
    // Location & Contact (Ethiopia)
    region: '',
    city: '',
    subcity: '',
    woreda: '',
    pickupInstructions: '',
    contactPhone: '',
    contactName: '',
    
    // Additional Info
    description: '',
    operatorAvailable: false,
    deliveryAvailable: false,
    maintenanceIncluded: false,
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const steps = ['Basic Info', 'Equipment Details', 'Photos', 'Pricing & Location', 'Review'];
  
  // Ethiopian Regions
  const ethiopianRegions = [
    'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa',
    'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali', 'South West Ethiopia',
    'Southern Nations', 'Tigray'
  ];
  
  // Ethiopian Cities
  const ethiopianCities = [
    'Addis Ababa', 'Adama', 'Bahir Dar', 'Dire Dawa', 'Hawassa',
    'Mekelle', 'Gondar', 'Jimma', 'Harar', 'Dessie', 'Debre Markos',
    'Arba Minch', 'Jijiga', 'Shashemene', 'Nekemte', 'Debre Birhan'
  ];
  
  // Equipment Types
  const equipmentTypes = [
    { value: 'excavator', label: 'Excavator', icon: HardHat },
    { value: 'loader', label: 'Loader', icon: Truck },
    { value: 'bulldozer', label: 'Bulldozer', icon: Factory },
    { value: 'grader', label: 'Motor Grader', icon: Settings },
    { value: 'crane', label: 'Crane', icon: Package },
    { value: 'waterTruck', label: 'Water Truck', icon: Fuel },
    { value: 'dumpTruck', label: 'Dump Truck', icon: Truck },
    { value: 'roller', label: 'Road Roller', icon: Gauge },
    { value: 'backhoe', label: 'Backhoe Loader', icon: Wrench },
    { value: 'wheeledExcavator', label: 'Wheeled Excavator', icon: HardHat },
    { value: 'cargoTruck', label: 'Cargo Truck', icon: Truck }
  ];
  
  // Attachments based on equipment type
  const attachmentOptions = {
    excavator: ['Shovel', 'Hammer', 'Thumb', 'Auger', 'Grapple'],
    loader: ['Bucket', 'Fork', 'Pallet Forks', 'Snow Blade'],
    bulldozer: ['Straight Blade', 'Angle Blade', 'Universal Blade', 'Ripper'],
    grader: ['Moldboard', 'Scarifier', 'Snow Wing'],
    crane: ['Hook', 'Magnets', 'Concrete Bucket', 'Personnel Basket'],
    waterTruck: ['Automatic Sprinkler', 'Manual Sprinkler', 'Water Cannon'],
    dumpTruck: ['Tipper', 'Roll-off', 'Concrete Mixer'],
    roller: ['Drum', 'Padfoot', 'Vibratory Drum'],
    backhoe: ['Backhoe Bucket', 'Loader Bucket', 'Hydraulic Breaker'],
    wheeledExcavator: ['Shovel', 'Hammer', 'Grapple'],
    cargoTruck: ['Flatbed', 'Box', 'Refrigerated', 'Curtain Side']
  };
  
  // Transmission types
  const transmissionOptions = ['Automatic', 'Manual', 'Semi-Automatic'];
  
  // Fuel types
  const fuelOptions = ['Diesel', 'Petrol', 'Electric', 'Hybrid'];
  
  // Feature options for heavy equipment
  const featureOptions = [
    'Air Conditioning', 'GPS Tracking', 'Backup Camera', 'ROPS Certified',
    'LED Work Lights', 'Bluetooth Radio', 'Heated Seats', 'Hydraulic Quick Coupler',
    'Auxiliary Hydraulics', 'Long Reach Boom', 'Rubber Tracks', 'Steel Tracks',
    'Grade Control System', 'Telematics', 'Remote Control', 'Emergency Stop'
  ];
  
  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.brand) newErrors.brand = 'Brand is required';
      if (!formData.model) newErrors.model = 'Model is required';
      if (!formData.year) newErrors.year = 'Year is required';
      if (formData.year && (formData.year < 2000 || formData.year > new Date().getFullYear())) {
        newErrors.year = 'Please enter a valid year';
      }
      if (!formData.title) newErrors.title = 'Equipment title is required';
      if (!formData.equipmentType) newErrors.equipmentType = 'Equipment type is required';
    }
    
    if (currentStep === 2) {
      if (!formData.attachment) newErrors.attachment = 'Attachment type is required';
      if (!formData.transmission) newErrors.transmission = 'Transmission is required';
      if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
      if (!formData.operatingWeight) newErrors.operatingWeight = 'Operating weight is required';
      if (!formData.enginePower) newErrors.enginePower = 'Engine power is required';
    }
    
    if (currentStep === 3) {
      if (formData.images.length === 0) {
        newErrors.images = 'Please upload at least one photo of your equipment';
      }
    }
    
    if (currentStep === 4) {
      if (!formData.pricePerDay) newErrors.pricePerDay = 'Daily price is required';
      if (!formData.pricePerHour) newErrors.pricePerHour = 'Hourly price is required';
      if (formData.pricePerDay && formData.pricePerDay < 1000) {
        newErrors.pricePerDay = 'Price must be at least ETB 1,000 per day';
      }
      if (!formData.region) newErrors.region = 'Region is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    } else {
      toast.error('Please fix the errors before continuing');
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleSubmit = async () => {
    toast.loading('Submitting your equipment for review...', { id: 'submit' });
    
    setTimeout(() => {
      toast.success('Equipment submitted successfully! Awaiting admin approval.', { id: 'submit' });
      setTimeout(() => {
        navigate('/owner/submissions');
      }, 2000);
    }, 2000);
  };
  
  const handleFeatureToggle = (feature) => {
    const updatedFeatures = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features: updatedFeatures });
  };
  
  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };
  
  const getEquipmentIcon = () => {
    const equipment = equipmentTypes.find(e => e.value === formData.equipmentType);
    if (equipment && equipment.icon) {
      const Icon = equipment.icon;
      return <Icon className="w-5 h-5 text-[#D97706]" />;
    }
    return <HardHat className="w-5 h-5 text-[#D97706]" />;
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Equipment Title *"
                placeholder="e.g., CAT 320 Excavator - 2022 Model"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                error={errors.title}
                icon={<HardHat className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <div>
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Equipment Type *
                </label>
                <select
                  value={formData.equipmentType}
                  onChange={(e) => updateFormData('equipmentType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-[#D97706] ${errors.equipmentType ? 'border-red-500' : 'border-[#E4E4E7]'}`}
                >
                  <option value="">Select equipment type</option>
                  {equipmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.equipmentType && (
                  <p className="text-red-500 text-xs mt-1">{errors.equipmentType}</p>
                )}
              </div>
              
              <Input
                label="Brand *"
                placeholder="e.g., Caterpillar, Komatsu, Liebherr"
                value={formData.brand}
                onChange={(e) => updateFormData('brand', e.target.value)}
                error={errors.brand}
              />
              
              <Input
                label="Model *"
                placeholder="e.g., 320, PC200, LTM 1050"
                value={formData.model}
                onChange={(e) => updateFormData('model', e.target.value)}
                error={errors.model}
              />
              
              <Input
                label="Year *"
                type="number"
                placeholder="e.g., 2022"
                value={formData.year}
                onChange={(e) => updateFormData('year', e.target.value)}
                error={errors.year}
              />
              
              <Input
                label="Color"
                placeholder="e.g., Yellow, Black, White"
                value={formData.color}
                onChange={(e) => updateFormData('color', e.target.value)}
              />
            </div>
            
            <div className="bg-[#FEF3C7] p-4 rounded-lg border border-[#FDE68A]">
              <p className="text-sm text-[#92400E] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>Make sure to provide accurate equipment specifications. This helps contractors find your equipment for their construction projects in Ethiopia.</span>
              </p>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Attachment / Bucket Type *
                </label>
                <select
                  value={formData.attachment}
                  onChange={(e) => updateFormData('attachment', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-[#D97706] ${errors.attachment ? 'border-red-500' : 'border-[#E4E4E7]'}`}
                >
                  <option value="">Select attachment</option>
                  {(attachmentOptions[formData.equipmentType] || ['Standard', 'Heavy Duty', 'Light Duty']).map(attachment => (
                    <option key={attachment} value={attachment}>{attachment}</option>
                  ))}
                </select>
                {errors.attachment && (
                  <p className="text-red-500 text-xs mt-1">{errors.attachment}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Transmission *
                </label>
                <div className="flex gap-3 flex-wrap">
                  {transmissionOptions.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateFormData('transmission', type)}
                      className={`
                        py-2 px-4 rounded-lg border-2 font-medium transition-all
                        ${formData.transmission === type
                          ? 'border-[#D97706] bg-[#FEF3C7] text-[#D97706]'
                          : 'border-[#E4E4E7] text-[#52525B] hover:border-[#D97706]'
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.transmission && (
                  <p className="text-red-500 text-xs mt-1">{errors.transmission}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Fuel Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fuelOptions.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateFormData('fuelType', type)}
                      className={`
                        py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all
                        ${formData.fuelType === type
                          ? 'border-[#D97706] bg-[#FEF3C7] text-[#D97706]'
                          : 'border-[#E4E4E7] text-[#52525B] hover:border-[#D97706]'
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.fuelType && (
                  <p className="text-red-500 text-xs mt-1">{errors.fuelType}</p>
                )}
              </div>
              
              <Input
                label="Operating Weight *"
                type="number"
                placeholder="e.g., 20000 (kg)"
                value={formData.operatingWeight}
                onChange={(e) => updateFormData('operatingWeight', e.target.value)}
                error={errors.operatingWeight}
                icon={<Gauge className="w-4 h-4 text-[#A1A1AA]" />}
                suffix="kg"
              />
              
              <Input
                label="Engine Power *"
                placeholder="e.g., 200 HP"
                value={formData.enginePower}
                onChange={(e) => updateFormData('enginePower', e.target.value)}
                error={errors.enginePower}
                icon={<Settings className="w-4 h-4 text-[#A1A1AA]" />}
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-[#1A1A1A] mb-3">
                Features & Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {featureOptions.map(feature => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg border text-sm transition-all
                      ${formData.features.includes(feature)
                        ? 'border-[#D97706] bg-[#FEF3C7] text-[#D97706]'
                        : 'border-[#E4E4E7] text-[#52525B] hover:border-[#D97706]'
                      }
                    `}
                  >
                    <CheckCircle className={`w-4 h-4 ${formData.features.includes(feature) ? 'text-[#D97706]' : 'text-[#A1A1AA]'}`} />
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <ImageUploader
              images={formData.images}
              onImagesChange={(images) => updateFormData('images', images)}
              maxImages={10}
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <Camera className="w-4 h-4 mt-0.5" />
                <span>Tips for great photos: Take clear, well-lit photos from all angles. Include exterior, interior, cabin, attachment, and any unique features. Photos of the equipment working on site are very effective.</span>
              </p>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Price per Day * (ETB)"
                type="number"
                placeholder="e.g., 8500"
                value={formData.pricePerDay}
                onChange={(e) => updateFormData('pricePerDay', e.target.value)}
                error={errors.pricePerDay}
                prefix="ETB"
                icon={<DollarSign className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Price per Hour * (ETB)"
                type="number"
                placeholder="e.g., 1200"
                value={formData.pricePerHour}
                onChange={(e) => updateFormData('pricePerHour', e.target.value)}
                error={errors.pricePerHour}
                prefix="ETB"
              />
              
              <Input
                label="Price per Week (Optional)"
                type="number"
                placeholder="e.g., 50000"
                value={formData.pricePerWeek}
                onChange={(e) => updateFormData('pricePerWeek', e.target.value)}
                prefix="ETB"
              />
              
              <Input
                label="Price per Month (Optional)"
                type="number"
                placeholder="e.g., 180000"
                value={formData.pricePerMonth}
                onChange={(e) => updateFormData('pricePerMonth', e.target.value)}
                prefix="ETB"
              />
              
              <Input
                label="Security Deposit * (ETB)"
                type="number"
                placeholder="e.g., 50000"
                value={formData.securityDeposit}
                onChange={(e) => updateFormData('securityDeposit', e.target.value)}
                prefix="ETB"
              />
              
              <Input
                label="Late Fee per Hour (ETB)"
                type="number"
                placeholder="e.g., 500"
                value={formData.lateFee}
                onChange={(e) => updateFormData('lateFee', e.target.value)}
                prefix="ETB"
              />
              
              <div>
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Region *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => updateFormData('region', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-[#D97706] ${errors.region ? 'border-red-500' : 'border-[#E4E4E7]'}`}
                >
                  <option value="">Select region</option>
                  {ethiopianRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && (
                  <p className="text-red-500 text-xs mt-1">{errors.region}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-[#D97706] ${errors.city ? 'border-red-500' : 'border-[#E4E4E7]'}`}
                >
                  <option value="">Select city</option>
                  {ethiopianCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              
              <Input
                label="Subcity / District"
                placeholder="e.g., Bole, Kazanchis"
                value={formData.subcity}
                onChange={(e) => updateFormData('subcity', e.target.value)}
                icon={<MapPin className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Woreda / Zone"
                placeholder="e.g., Woreda 03"
                value={formData.woreda}
                onChange={(e) => updateFormData('woreda', e.target.value)}
              />
              
              <Input
                label="Contact Name *"
                placeholder="Your full name"
                value={formData.contactName}
                onChange={(e) => updateFormData('contactName', e.target.value)}
                icon={<Users className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Contact Phone *"
                type="tel"
                placeholder="+251 911 234567"
                value={formData.contactPhone}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
                error={errors.contactPhone}
                icon={<Phone className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <div className="col-span-2">
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Pickup / Delivery Instructions
                </label>
                <textarea
                  className="w-full px-3 py-2.5 bg-[#F3F2EE] border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10"
                  rows="3"
                  placeholder="Provide detailed instructions for equipment pickup or delivery in Ethiopia..."
                  value={formData.pickupInstructions}
                  onChange={(e) => updateFormData('pickupInstructions', e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-[#FEF3C7] p-4 rounded-lg border border-[#FDE68A]">
              <h3 className="font-semibold text-[#92400E] mb-2">Additional Services (Optional)</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.operatorAvailable}
                    onChange={(e) => updateFormData('operatorAvailable', e.target.checked)}
                    className="text-[#D97706] rounded"
                  />
                  <span className="text-sm text-[#92400E]">✓ Professional operator available (+ ETB 500/day)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.deliveryAvailable}
                    onChange={(e) => updateFormData('deliveryAvailable', e.target.checked)}
                    className="text-[#D97706] rounded"
                  />
                  <span className="text-sm text-[#92400E]">✓ Delivery service available within Ethiopia (+ ETB 2,000 - 5,000)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.maintenanceIncluded}
                    onChange={(e) => updateFormData('maintenanceIncluded', e.target.checked)}
                    className="text-[#D97706] rounded"
                  />
                  <span className="text-sm text-[#92400E]">✓ Regular maintenance included in price</span>
                </label>
              </div>
            </div>
          </motion.div>
        );
        
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Review Card - Equipment Information */}
              <Card className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {getEquipmentIcon()}
                  Equipment Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Title:</span>
                    <span className="font-medium">{formData.title || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Type:</span>
                    <span className="font-medium">{equipmentTypes.find(t => t.value === formData.equipmentType)?.label || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Brand & Model:</span>
                    <span className="font-medium">{formData.brand} {formData.model} ({formData.year})</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Attachment:</span>
                    <span className="font-medium">{formData.attachment}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Transmission:</span>
                    <span className="font-medium">{formData.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Fuel Type:</span>
                    <span className="font-medium">{formData.fuelType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Operating Weight:</span>
                    <span className="font-medium">{formData.operatingWeight} kg</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B]">Engine Power:</span>
                    <span className="font-medium">{formData.enginePower}</span>
                  </div>
                </div>
              </Card>
              
              {/* Pricing Card */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="text-[#D97706]" />
                  Pricing (ETB)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Price per Day:</span>
                    <span className="font-medium text-[#D97706]">{formatCurrency(formData.pricePerDay)}/day</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Price per Hour:</span>
                    <span className="font-medium text-[#D97706]">{formatCurrency(formData.pricePerHour)}/hour</span>
                  </div>
                  {formData.pricePerWeek && (
                    <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                      <span className="text-[#52525B]">Price per Week:</span>
                      <span className="font-medium">{formatCurrency(formData.pricePerWeek)}/week</span>
                    </div>
                  )}
                  {formData.pricePerMonth && (
                    <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                      <span className="text-[#52525B]">Price per Month:</span>
                      <span className="font-medium">{formatCurrency(formData.pricePerMonth)}/month</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B]">Security Deposit:</span>
                    <span className="font-medium">{formatCurrency(formData.securityDeposit)}</span>
                  </div>
                </div>
              </Card>
              
              {/* Location & Contact Card */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="text-[#D97706]" />
                  Location & Contact (Ethiopia)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Region:</span>
                    <span className="font-medium">{formData.region}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">City:</span>
                    <span className="font-medium">{formData.city}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Contact:</span>
                    <span className="font-medium">{formData.contactName}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B]">Phone:</span>
                    <span className="font-medium">{formData.contactPhone}</span>
                  </div>
                </div>
              </Card>
              
              {/* Features Card */}
              {formData.features.length > 0 && (
                <Card className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map(f => (
                      <span key={f} className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-1 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
              
              {/* Additional Services Card */}
              {(formData.operatorAvailable || formData.deliveryAvailable || formData.maintenanceIncluded) && (
                <Card className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3">Additional Services</h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.operatorAvailable && (
                      <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">✓ Operator Available</span>
                    )}
                    {formData.deliveryAvailable && (
                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">✓ Delivery Available</span>
                    )}
                    {formData.maintenanceIncluded && (
                      <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">✓ Maintenance Included</span>
                    )}
                  </div>
                </Card>
              )}
              
              {/* Terms Agreement */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => updateFormData('terms', e.target.checked)}
                    className="w-4 h-4 text-[#D97706] rounded border-[#E4E4E7] focus:ring-[#D97706]"
                  />
                  <span className="text-sm text-[#1A1A1A]">
                    I confirm that all information provided is accurate and I agree to the{' '}
                    <a href="#" className="text-[#D97706] hover:underline">Terms of Service</a>
                  </span>
                </label>
                {!formData.terms && errors.terms && (
                  <p className="text-red-500 text-xs mt-1">You must agree to the terms</p>
                )}
              </div>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D97706] mb-4 shadow-lg"
          >
            <HardHat className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            List Your Heavy Equipment
          </h1>
          <p className="text-[#52525B] text-lg">
            Start earning by listing your construction equipment in Ethiopia
          </p>
        </div>
        
        {/* Step Progress */}
        <StepProgress currentStep={currentStep} steps={steps} />
        
        {/* Form Content */}
        <Card className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-[#E4E4E7]">
            {currentStep > 1 && (
              <Button variant="ghost" onClick={handleBack} className="min-w-[120px]">
                ← Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className={`min-w-[160px] ${currentStep === 1 ? 'w-full' : ''}`}
              size="lg"
            >
              {currentStep === steps.length ? 'Submit for Review ✓' : 'Continue →'}
            </Button>
          </div>
        </Card>
        
        {/* Trust Badges */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#A1A1AA]">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free to list
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No hidden fees
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              24/7 support in Ethiopia
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Secure payments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitEquipmentPage;
