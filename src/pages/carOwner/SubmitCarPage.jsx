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
  Car, 
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
  Mail,
  Clock
} from 'lucide-react';

const SubmitCarPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    
    // Car Details
    transmission: '',
    fuelType: '',
    seats: '',
    mileage: '',
    engineSize: '',
    features: [],
    
    // Photos
    images: [],
    
    // Pricing
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    securityDeposit: '',
    lateFee: '',
    
    // Location & Contact
    location: '',
    pickupInstructions: '',
    contactPhone: '',
    
    // Additional Info
    description: '',
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const steps = ['Basic Info', 'Car Details', 'Photos', 'Pricing', 'Review'];
  
  // Feature options
  const featureOptions = [
    'GPS Navigation', 'Bluetooth', 'Backup Camera', 'Heated Seats',
    'Sunroof', 'USB Port', 'Apple CarPlay', 'Android Auto',
    'Cruise Control', 'Parking Sensors', 'Keyless Entry', 'Child Seat Available'
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
      if (!formData.title) newErrors.title = 'Title is required';
    }
    
    if (currentStep === 2) {
      if (!formData.transmission) newErrors.transmission = 'Transmission is required';
      if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
      if (!formData.seats) newErrors.seats = 'Number of seats is required';
      if (!formData.mileage) newErrors.mileage = 'Mileage is required';
    }
    
    if (currentStep === 3) {
      if (formData.images.length === 0) {
        newErrors.images = 'Please upload at least one photo of your car';
      }
    }
    
    if (currentStep === 4) {
      if (!formData.pricePerDay) newErrors.pricePerDay = 'Daily price is required';
      if (formData.pricePerDay && formData.pricePerDay < 10) {
        newErrors.pricePerDay = 'Price must be at least $10 per day';
      }
      if (!formData.location) newErrors.location = 'Pickup location is required';
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
    toast.loading('Submitting your car for review...', { id: 'submit' });
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Car submitted successfully! Awaiting admin approval.', { id: 'submit' });
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
                label="Car Title *"
                placeholder="e.g., 2022 Toyota Camry XLE"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                error={errors.title}
                icon={<Car className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Brand *"
                placeholder="e.g., Toyota, Honda, BMW"
                value={formData.brand}
                onChange={(e) => updateFormData('brand', e.target.value)}
                error={errors.brand}
              />
              
              <Input
                label="Model *"
                placeholder="e.g., Camry, Civic, X5"
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
                placeholder="e.g., Silver, Black, White"
                value={formData.color}
                onChange={(e) => updateFormData('color', e.target.value)}
              />
            </div>
            
            <div className="bg-[#FEF3C7] p-4 rounded-lg border border-[#FDE68A]">
              <p className="text-sm text-[#92400E] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>Make sure to provide accurate information. This will help customers find your car easily.</span>
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
                  Transmission *
                </label>
                <div className="flex gap-3">
                  {['Automatic', 'Manual'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateFormData('transmission', type)}
                      className={`
                        flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all
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
                  {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(type => (
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
                label="Number of Seats *"
                type="number"
                placeholder="e.g., 5"
                value={formData.seats}
                onChange={(e) => updateFormData('seats', e.target.value)}
                error={errors.seats}
                icon={<Users className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Mileage *"
                type="number"
                placeholder="e.g., 25000"
                value={formData.mileage}
                onChange={(e) => updateFormData('mileage', e.target.value)}
                error={errors.mileage}
                icon={<Gauge className="w-4 h-4 text-[#A1A1AA]" />}
                suffix="km"
              />
              
              <Input
                label="Engine Size"
                placeholder="e.g., 2.0L, V6, Electric"
                value={formData.engineSize}
                onChange={(e) => updateFormData('engineSize', e.target.value)}
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
                <span>Tips for great photos: Take clear, well-lit photos from different angles. Include exterior, interior, trunk, and any unique features.</span>
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
                label="Price per Day *"
                type="number"
                placeholder="e.g., 50"
                value={formData.pricePerDay}
                onChange={(e) => updateFormData('pricePerDay', e.target.value)}
                error={errors.pricePerDay}
                prefix="$"
                icon={<DollarSign className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Price per Week (Optional)"
                type="number"
                placeholder="e.g., 300"
                value={formData.pricePerWeek}
                onChange={(e) => updateFormData('pricePerWeek', e.target.value)}
                prefix="$"
              />
              
              <Input
                label="Price per Month (Optional)"
                type="number"
                placeholder="e.g., 1000"
                value={formData.pricePerMonth}
                onChange={(e) => updateFormData('pricePerMonth', e.target.value)}
                prefix="$"
              />
              
              <Input
                label="Security Deposit *"
                type="number"
                placeholder="e.g., 200"
                value={formData.securityDeposit}
                onChange={(e) => updateFormData('securityDeposit', e.target.value)}
                prefix="$"
              />
              
              <Input
                label="Late Fee per Hour"
                type="number"
                placeholder="e.g., 10"
                value={formData.lateFee}
                onChange={(e) => updateFormData('lateFee', e.target.value)}
                prefix="$"
              />
              
              <Input
                label="Pickup Location *"
                placeholder="Full address"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                error={errors.location}
                icon={<MapPin className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <Input
                label="Contact Phone *"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.contactPhone}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
                icon={<Phone className="w-4 h-4 text-[#A1A1AA]" />}
              />
              
              <div className="col-span-2">
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                  Pickup Instructions
                </label>
                <textarea
                  className="w-full px-3 py-2.5 bg-[#F3F2EE] border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10"
                  rows="3"
                  placeholder="Provide detailed instructions for picking up the car..."
                  value={formData.pickupInstructions}
                  onChange={(e) => updateFormData('pickupInstructions', e.target.value)}
                />
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
              {/* Review Card */}
              <Card className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Car className="text-[#D97706]" />
                  Car Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Title:</span>
                    <span className="font-medium">{formData.title || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Brand & Model:</span>
                    <span className="font-medium">{formData.brand} {formData.model} ({formData.year})</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Color:</span>
                    <span className="font-medium">{formData.color || 'Not specified'}</span>
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
                    <span className="text-[#52525B]">Seats:</span>
                    <span className="font-medium">{formData.seats} seats</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Mileage:</span>
                    <span className="font-medium">{formData.mileage} km</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B]">Features:</span>
                    <div className="flex flex-wrap gap-1 max-w-[60%]">
                      {formData.features.length > 0 ? (
                        formData.features.map(f => (
                          <span key={f} className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-1 rounded">
                            {f}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#A1A1AA]">No features selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="text-[#D97706]" />
                  Pricing
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Price per Day:</span>
                    <span className="font-medium text-[#D97706]">${formData.pricePerDay}/day</span>
                  </div>
                  {formData.pricePerWeek && (
                    <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                      <span className="text-[#52525B]">Price per Week:</span>
                      <span className="font-medium">${formData.pricePerWeek}/week</span>
                    </div>
                  )}
                  {formData.pricePerMonth && (
                    <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                      <span className="text-[#52525B]">Price per Month:</span>
                      <span className="font-medium">${formData.pricePerMonth}/month</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B]">Security Deposit:</span>
                    <span className="font-medium">${formData.securityDeposit}</span>
                  </div>
                </div>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="text-[#D97706]" />
                  Location & Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Pickup Location:</span>
                    <span className="font-medium text-right">{formData.location}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E4E7]">
                    <span className="text-[#52525B]">Contact Phone:</span>
                    <span className="font-medium">{formData.contactPhone}</span>
                  </div>
                  {formData.pickupInstructions && (
                    <div className="py-2">
                      <span className="text-[#52525B] block mb-1">Pickup Instructions:</span>
                      <p className="text-sm">{formData.pickupInstructions}</p>
                    </div>
                  )}
                </div>
              </Card>
              
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
            <Car className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            List Your Car
          </h1>
          <p className="text-[#52525B] text-lg">
            Start earning by sharing your vehicle with trusted drivers
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
              24/7 support
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

export default SubmitCarPage;
