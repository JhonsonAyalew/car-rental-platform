import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Car,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  CreditCard,
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
  Users
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const BookingFormPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Driver Information
    driverLicense: '',
    driverLicenseExpiry: '',
    dateOfBirth: '',
    
    // Payment Method
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    
    // Additional Options
    insurance: false,
    gps: false,
    childSeat: false,
    additionalDriver: false,
    
    // Special Requests
    specialRequests: '',
    
    // Terms Agreement
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  // Insurance options pricing
  const addOns = {
    insurance: { label: 'Full Insurance Coverage', price: 15, description: 'Complete protection against damages' },
    gps: { label: 'GPS Navigation', price: 8, description: 'Built-in GPS navigation system' },
    childSeat: { label: 'Child Seat', price: 10, description: 'Safety seat for children' },
    additionalDriver: { label: 'Additional Driver', price: 12, description: 'Add another licensed driver' }
  };
  
  useEffect(() => {
    fetchCarDetails();
    
    // Set default dates (tomorrow to next week)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setPickupDate(tomorrow.toISOString().split('T')[0]);
    setDropoffDate(nextWeek.toISOString().split('T')[0]);
  }, [carId]);
  
  useEffect(() => {
    if (pickupDate && dropoffDate && car) {
      const days = Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
      setTotalDays(days > 0 ? days : 1);
      
      let basePrice = car.price * (days > 0 ? days : 1);
      
      // Add add-ons
      if (formData.insurance) basePrice += addOns.insurance.price * (days > 0 ? days : 1);
      if (formData.gps) basePrice += addOns.gps.price * (days > 0 ? days : 1);
      if (formData.childSeat) basePrice += addOns.childSeat.price * (days > 0 ? days : 1);
      if (formData.additionalDriver) basePrice += addOns.additionalDriver.price * (days > 0 ? days : 1);
      
      setTotalPrice(basePrice);
    }
  }, [pickupDate, dropoffDate, car, formData.insurance, formData.gps, formData.childSeat, formData.additionalDriver]);
  
  const fetchCarDetails = () => {
    setTimeout(() => {
      const mockCar = {
        id: parseInt(carId),
        name: 'Tesla Model 3',
        brand: 'Tesla',
        year: 2023,
        price: 120,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
        location: 'Los Angeles, CA',
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Electric',
        owner: {
          name: 'Sarah Johnson',
          phone: '+1 234 567 8900',
          email: 'sarah@example.com'
        }
      };
      setCar(mockCar);
      setLoading(false);
    }, 500);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Personal Information
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    // Address
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    // Driver License
    if (!formData.driverLicense) newErrors.driverLicense = 'Driver license number is required';
    if (!formData.driverLicenseExpiry) newErrors.driverLicenseExpiry = 'License expiry date is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    
    // Payment (if credit card selected)
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
    }
    
    // Terms
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before continuing');
      return;
    }
    
    setSubmitting(true);
    toast.loading('Processing your booking...', { id: 'booking' });
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Booking confirmed successfully!', { id: 'booking' });
      setTimeout(() => {
        navigate('/customer/bookings');
      }, 2000);
    }, 2000);
  };
  
  const getAddOnPrice = (addOnKey) => {
    if (!formData[addOnKey]) return 0;
    return addOns[addOnKey].price * totalDays;
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
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#52525B] hover:text-[#D97706] transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Car Details
          </button>
          
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Complete Your Booking</h1>
          <p className="text-[#52525B]">Fill in the details to confirm your rental</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Car Summary Card */}
              <Card>
                <div className="flex gap-4">
                  <img src={car.image} alt={car.name} className="w-24 h-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{car.name}</h3>
                    <p className="text-sm text-[#52525B]">{car.year} • {car.brand}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{car.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{car.seats} seats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Rental Dates */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="text-[#D97706]" />
                  Rental Dates
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Pickup Date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                  <Input
                    type="date"
                    label="Dropoff Date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    required
                  />
                </div>
                {totalDays > 0 && (
                  <div className="mt-3 p-3 bg-[#FEF3C7] rounded-lg">
                    <p className="text-sm text-[#92400E]">
                      Total rental period: {totalDays} day{totalDays > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </Card>
              
              {/* Personal Information */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="text-[#D97706]" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    error={errors.lastName}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                    required
                  />
                </div>
              </Card>
              
              {/* Address */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Home className="text-[#D97706]" />
                  Address
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={errors.address}
                    required
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      error={errors.state}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      error={errors.zipCode}
                      required
                    />
                  </div>
                </div>
              </Card>
              
              {/* Driver Information */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="text-[#D97706]" />
                  Driver License Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Driver License Number"
                    value={formData.driverLicense}
                    onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                    error={errors.driverLicense}
                    required
                  />
                  <Input
                    type="date"
                    label="License Expiry Date"
                    value={formData.driverLicenseExpiry}
                    onChange={(e) => setFormData({ ...formData, driverLicenseExpiry: e.target.value })}
                    error={errors.driverLicenseExpiry}
                    required
                  />
                  <Input
                    type="date"
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    error={errors.dateOfBirth}
                    required
                  />
                </div>
              </Card>
              
              {/* Additional Options */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Gift className="text-[#D97706]" />
                  Additional Options
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
                          <span className="text-[#D97706]">+${option.price}/day</span>
                        </div>
                        <p className="text-sm text-[#52525B]">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="text-[#D97706]" />
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="text-[#D97706]"
                      />
                      <span>Credit / Debit Card</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="text-[#D97706]"
                      />
                      <span>PayPal</span>
                    </label>
                  </div>
                  
                  {formData.paymentMethod === 'credit_card' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        error={errors.cardNumber}
                        required
                      />
                      <Input
                        label="Cardholder Name"
                        placeholder="Name on card"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        error={errors.cardName}
                        required
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          error={errors.cardExpiry}
                          required
                        />
                        <Input
                          label="CVV"
                          type="password"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          error={errors.cardCvv}
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
              
              {/* Special Requests */}
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="text-[#D97706]" />
                  Special Requests (Optional)
                </h2>
                <textarea
                  className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706]"
                  rows="3"
                  placeholder="Any special requests or notes for the owner..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                />
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
                      I agree to the{' '}
                      <a href="#" className="text-[#D97706] hover:underline">Terms and Conditions</a>
                      {' '}and{' '}
                      <a href="#" className="text-[#D97706] hover:underline">Cancellation Policy</a>
                    </span>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>
                    )}
                  </div>
                </label>
              </Card>
              
              <Button type="submit" size="lg" className="w-full" isLoading={submitting}>
                Confirm Booking - ${totalPrice}
              </Button>
            </form>
          </div>
          
          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#52525B]">Car Rental ({totalDays} days)</span>
                    <span>${car.price} × {totalDays} = ${car.price * totalDays}</span>
                  </div>
                  
                  {formData.insurance && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">Insurance Coverage</span>
                      <span>+${getAddOnPrice('insurance')}</span>
                    </div>
                  )}
                  
                  {formData.gps && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">GPS Navigation</span>
                      <span>+${getAddOnPrice('gps')}</span>
                    </div>
                  )}
                  
                  {formData.childSeat && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">Child Seat</span>
                      <span>+${getAddOnPrice('childSeat')}</span>
                    </div>
                  )}
                  
                  {formData.additionalDriver && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#52525B]">Additional Driver</span>
                      <span>+${getAddOnPrice('additionalDriver')}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-[#E4E4E7] pt-3 mb-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-[#D97706]">${totalPrice}</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-1">Taxes included</p>
                </div>
                
                <div className="space-y-2 text-xs text-[#52525B]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span>Secure payment protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-blue-500" />
                    <span>Free cancellation up to 24 hours before pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>No hidden fees</span>
                  </div>
                </div>
              </Card>
              
              {/* Need Help Card */}
              <Card className="mt-4 bg-[#FEF3C7]">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-[#92400E] mb-3">Contact our support team</p>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Mail className="w-4 h-4" />
                  <span>support@carrental.com</span>
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
