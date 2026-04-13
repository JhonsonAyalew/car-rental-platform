import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import {
  Settings,
  Bell,
  Shield,
  DollarSign,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Smartphone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Save,
  RefreshCw,
  Moon,
  Sun,
  Languages,
  Printer,
  Download,
  Lock,
  Users,
  Truck,
  Building,
  BarChart3,
  HardHat
} from 'lucide-react';

const SettingsPage = () => {
  const { t } = useTranslation('ownerSettings');
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    businessName: 'Abebe Heavy Equipment Rentals',
    businessEmail: 'info@abebeequipment.com',
    businessPhone: '+251 911 234567',
    businessPhoneAlt: '+251 922 345678',
    website: 'www.abebeequipment.com',
    timezone: 'Africa/Addis_Ababa',
    language: 'bilingual',
    dateFormat: 'DD/MM/YYYY',
    currency: 'ETB'
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNewBooking: true,
    emailBookingCancellation: true,
    emailPaymentReceived: true,
    emailReminders: true,
    smsNewBooking: false,
    smsReminders: true,
    pushNewMessage: true,
    pushBookingUpdate: true,
    weeklyReport: true,
    monthlyReport: true
  });
  
  // Pricing Settings
  const [pricingSettings, setPricingSettings] = useState({
    defaultHourlyRate: 1200,
    defaultDailyRate: 8500,
    defaultWeeklyDiscount: 10,
    defaultMonthlyDiscount: 20,
    securityDepositPercentage: 15,
    lateFeePerHour: 500,
    cancellationFee: 5,
    operatorFee: 500,
    deliveryFee: {
      withinAddis: 2000,
      outsideAddis: 5000
    }
  });
  
  // Availability Settings
  const [availabilitySettings, setAvailabilitySettings] = useState({
    defaultStartTime: '08:00',
    defaultEndTime: '18:00',
    bufferBetweenBookings: 60,
    advanceBookingDays: 90,
    minimumRentalHours: 4,
    minimumRentalDays: 1,
    weekendAvailable: true,
    holidayAvailable: false,
    emergencyContact: '+251 911 000000'
  });
  
  // Business Hours
  const [businessHours, setBusinessHours] = useState({
    monday: { enabled: true, start: '08:00', end: '18:00' },
    tuesday: { enabled: true, start: '08:00', end: '18:00' },
    wednesday: { enabled: true, start: '08:00', end: '18:00' },
    thursday: { enabled: true, start: '08:00', end: '18:00' },
    friday: { enabled: true, start: '08:00', end: '18:00' },
    saturday: { enabled: true, start: '09:00', end: '16:00' },
    sunday: { enabled: false, start: '09:00', end: '14:00' }
  });
  
  const handleGeneralChange = (field, value) => {
    setGeneralSettings({ ...generalSettings, [field]: value });
  };
  
  const handleNotificationChange = (field) => {
    setNotificationSettings({ ...notificationSettings, [field]: !notificationSettings[field] });
  };
  
  const handlePricingChange = (field, value) => {
    setPricingSettings({ ...pricingSettings, [field]: value });
  };
  
  const handleAvailabilityChange = (field, value) => {
    setAvailabilitySettings({ ...availabilitySettings, [field]: value });
  };
  
  const handleBusinessHourChange = (day, field, value) => {
    setBusinessHours({
      ...businessHours,
      [day]: { ...businessHours[day], [field]: value }
    });
  };
  
  const saveSettings = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(t('toastMessages.saveSuccess'));
      setLoading(false);
    }, 1500);
  };
  
  const resetSettings = () => {
    if (window.confirm(t('actions.resetConfirm'))) {
      toast.success(t('toastMessages.resetSuccess'));
    }
  };
  
  const tabs = [
    { id: 'general', label: t('tabs.general'), icon: Settings },
    { id: 'notifications', label: t('tabs.notifications'), icon: Bell },
    { id: 'pricing', label: t('tabs.pricing'), icon: DollarSign },
    { id: 'availability', label: t('tabs.availability'), icon: Clock },
    { id: 'businessHours', label: t('tabs.businessHours'), icon: Calendar }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D97706] mb-4 shadow-lg"
          >
            <Settings className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">{t('title')}</h1>
          <p className="text-[#52525B]">{t('subtitle')}</p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E4E4E7]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition relative ${
                activeTab === tab.id ? 'text-[#D97706]' : 'text-[#52525B] hover:text-[#D97706]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" />
              )}
            </button>
          ))}
        </div>
        
        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building className="text-[#D97706]" />
                {t('general.businessInfo.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('general.businessInfo.businessName')}
                  value={generalSettings.businessName}
                  onChange={(e) => handleGeneralChange('businessName', e.target.value)}
                  icon={<Building className="w-4 h-4" />}
                />
                <Input
                  label={t('general.businessInfo.businessEmail')}
                  type="email"
                  value={generalSettings.businessEmail}
                  onChange={(e) => handleGeneralChange('businessEmail', e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label={t('general.businessInfo.primaryPhone')}
                  value={generalSettings.businessPhone}
                  onChange={(e) => handleGeneralChange('businessPhone', e.target.value)}
                  icon={<Phone className="w-4 h-4" />}
                />
                <Input
                  label={t('general.businessInfo.alternativePhone')}
                  value={generalSettings.businessPhoneAlt}
                  onChange={(e) => handleGeneralChange('businessPhoneAlt', e.target.value)}
                  icon={<Smartphone className="w-4 h-4" />}
                />
                <Input
                  label={t('general.businessInfo.website')}
                  value={generalSettings.website}
                  onChange={(e) => handleGeneralChange('website', e.target.value)}
                  icon={<Globe className="w-4 h-4" />}
                />
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="text-[#D97706]" />
                {t('general.regionalSettings.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                    {t('general.regionalSettings.timezone')}
                  </label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                  >
                    <option value="Africa/Addis_Ababa">{t('general.regionalSettings.timezoneOptions.addis')}</option>
                    <option value="Africa/Nairobi">{t('general.regionalSettings.timezoneOptions.nairobi')}</option>
                    <option value="Africa/Cairo">{t('general.regionalSettings.timezoneOptions.cairo')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                    {t('general.regionalSettings.language')}
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) => handleGeneralChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                  >
                    <option value="english">{t('general.regionalSettings.languageOptions.english')}</option>
                    <option value="amharic">{t('general.regionalSettings.languageOptions.amharic')}</option>
                    <option value="bilingual">{t('general.regionalSettings.languageOptions.bilingual')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                    {t('general.regionalSettings.dateFormat')}
                  </label>
                  <select
                    value={generalSettings.dateFormat}
                    onChange={(e) => handleGeneralChange('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                  >
                    <option value="DD/MM/YYYY">{t('general.regionalSettings.dateFormatOptions.ethiopian')}</option>
                    <option value="MM/DD/YYYY">{t('general.regionalSettings.dateFormatOptions.us')}</option>
                    <option value="YYYY-MM-DD">{t('general.regionalSettings.dateFormatOptions.iso')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                    {t('general.regionalSettings.currency')}
                  </label>
                  <select
                    value={generalSettings.currency}
                    onChange={(e) => handleGeneralChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                  >
                    <option value="ETB">{t('general.regionalSettings.currencyOptions.etb')}</option>
                    <option value="USD">{t('general.regionalSettings.currencyOptions.usd')}</option>
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="text-[#D97706]" />
                {t('notifications.email.title')}
              </h2>
              <div className="space-y-3">
                {[
                  { key: 'emailNewBooking', label: t('notifications.email.newBooking.label'), desc: t('notifications.email.newBooking.desc') },
                  { key: 'emailBookingCancellation', label: t('notifications.email.cancellation.label'), desc: t('notifications.email.cancellation.desc') },
                  { key: 'emailPaymentReceived', label: t('notifications.email.payment.label'), desc: t('notifications.email.payment.desc') },
                  { key: 'emailReminders', label: t('notifications.email.reminders.label'), desc: t('notifications.email.reminders.desc') }
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-[#A1A1AA]">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings[item.key]}
                      onChange={() => handleNotificationChange(item.key)}
                      className="w-4 h-4 text-[#D97706] rounded"
                    />
                  </label>
                ))}
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="text-[#D97706]" />
                {t('notifications.sms.title')}
              </h2>
              <div className="space-y-3">
                {[
                  { key: 'smsNewBooking', label: t('notifications.sms.newBooking.label'), desc: t('notifications.sms.newBooking.desc') },
                  { key: 'smsReminders', label: t('notifications.sms.reminders.label'), desc: t('notifications.sms.reminders.desc') }
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-[#A1A1AA]">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings[item.key]}
                      onChange={() => handleNotificationChange(item.key)}
                      className="w-4 h-4 text-[#D97706] rounded"
                    />
                  </label>
                ))}
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="text-[#D97706]" />
                {t('notifications.reports.title')}
              </h2>
              <div className="space-y-3">
                {[
                  { key: 'weeklyReport', label: t('notifications.reports.weekly.label'), desc: t('notifications.reports.weekly.desc') },
                  { key: 'monthlyReport', label: t('notifications.reports.monthly.label'), desc: t('notifications.reports.monthly.desc') }
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-[#A1A1AA]">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings[item.key]}
                      onChange={() => handleNotificationChange(item.key)}
                      className="w-4 h-4 text-[#D97706] rounded"
                    />
                  </label>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Pricing Settings Tab */}
        {activeTab === 'pricing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="text-[#D97706]" />
                {t('pricing.rentalRates.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('pricing.rentalRates.hourlyRate')}
                  type="number"
                  value={pricingSettings.defaultHourlyRate}
                  onChange={(e) => handlePricingChange('defaultHourlyRate', parseInt(e.target.value))}
                  prefix="ETB"
                />
                <Input
                  label={t('pricing.rentalRates.dailyRate')}
                  type="number"
                  value={pricingSettings.defaultDailyRate}
                  onChange={(e) => handlePricingChange('defaultDailyRate', parseInt(e.target.value))}
                  prefix="ETB"
                />
                <Input
                  label={t('pricing.rentalRates.weeklyDiscount')}
                  type="number"
                  value={pricingSettings.defaultWeeklyDiscount}
                  onChange={(e) => handlePricingChange('defaultWeeklyDiscount', parseInt(e.target.value))}
                  suffix="%"
                />
                <Input
                  label={t('pricing.rentalRates.monthlyDiscount')}
                  type="number"
                  value={pricingSettings.defaultMonthlyDiscount}
                  onChange={(e) => handlePricingChange('defaultMonthlyDiscount', parseInt(e.target.value))}
                  suffix="%"
                />
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="text-[#D97706]" />
                {t('pricing.depositsFees.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('pricing.depositsFees.securityDeposit')}
                  type="number"
                  value={pricingSettings.securityDepositPercentage}
                  onChange={(e) => handlePricingChange('securityDepositPercentage', parseInt(e.target.value))}
                  suffix="%"
                />
                <Input
                  label={t('pricing.depositsFees.lateFee')}
                  type="number"
                  value={pricingSettings.lateFeePerHour}
                  onChange={(e) => handlePricingChange('lateFeePerHour', parseInt(e.target.value))}
                  prefix="ETB"
                />
                <Input
                  label={t('pricing.depositsFees.cancellationFee')}
                  type="number"
                  value={pricingSettings.cancellationFee}
                  onChange={(e) => handlePricingChange('cancellationFee', parseInt(e.target.value))}
                  suffix="%"
                />
                <Input
                  label={t('pricing.depositsFees.operatorFee')}
                  type="number"
                  value={pricingSettings.operatorFee}
                  onChange={(e) => handlePricingChange('operatorFee', parseInt(e.target.value))}
                  prefix="ETB"
                />
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck className="text-[#D97706]" />
                {t('pricing.deliveryFees.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('pricing.deliveryFees.withinAddis')}
                  type="number"
                  value={pricingSettings.deliveryFee.withinAddis}
                  onChange={(e) => handlePricingChange('deliveryFee', { ...pricingSettings.deliveryFee, withinAddis: parseInt(e.target.value) })}
                  prefix="ETB"
                />
                <Input
                  label={t('pricing.deliveryFees.outsideAddis')}
                  type="number"
                  value={pricingSettings.deliveryFee.outsideAddis}
                  onChange={(e) => handlePricingChange('deliveryFee', { ...pricingSettings.deliveryFee, outsideAddis: parseInt(e.target.value) })}
                  prefix="ETB"
                />
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="text-[#D97706]" />
                {t('availability.defaultAvailability.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('availability.defaultAvailability.startTime')}
                  type="time"
                  value={availabilitySettings.defaultStartTime}
                  onChange={(e) => handleAvailabilityChange('defaultStartTime', e.target.value)}
                />
                <Input
                  label={t('availability.defaultAvailability.endTime')}
                  type="time"
                  value={availabilitySettings.defaultEndTime}
                  onChange={(e) => handleAvailabilityChange('defaultEndTime', e.target.value)}
                />
                <Input
                  label={t('availability.defaultAvailability.bufferTime')}
                  type="number"
                  value={availabilitySettings.bufferBetweenBookings}
                  onChange={(e) => handleAvailabilityChange('bufferBetweenBookings', parseInt(e.target.value))}
                  suffix="min"
                />
                <Input
                  label={t('availability.defaultAvailability.advanceBooking')}
                  type="number"
                  value={availabilitySettings.advanceBookingDays}
                  onChange={(e) => handleAvailabilityChange('advanceBookingDays', parseInt(e.target.value))}
                  suffix="days"
                />
                <Input
                  label={t('availability.defaultAvailability.minHours')}
                  type="number"
                  value={availabilitySettings.minimumRentalHours}
                  onChange={(e) => handleAvailabilityChange('minimumRentalHours', parseInt(e.target.value))}
                  suffix="hours"
                />
                <Input
                  label={t('availability.defaultAvailability.minDays')}
                  type="number"
                  value={availabilitySettings.minimumRentalDays}
                  onChange={(e) => handleAvailabilityChange('minimumRentalDays', parseInt(e.target.value))}
                  suffix="days"
                />
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-[#D97706]" />
                {t('availability.specialAvailability.title')}
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">{t('availability.specialAvailability.weekends.label')}</p>
                    <p className="text-xs text-[#A1A1AA]">{t('availability.specialAvailability.weekends.desc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={availabilitySettings.weekendAvailable}
                    onChange={(e) => handleAvailabilityChange('weekendAvailable', e.target.checked)}
                    className="w-4 h-4 text-[#D97706] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">{t('availability.specialAvailability.holidays.label')}</p>
                    <p className="text-xs text-[#A1A1AA]">{t('availability.specialAvailability.holidays.desc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={availabilitySettings.holidayAvailable}
                    onChange={(e) => handleAvailabilityChange('holidayAvailable', e.target.checked)}
                    className="w-4 h-4 text-[#D97706] rounded"
                  />
                </label>
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Phone className="text-[#D97706]" />
                {t('availability.emergencyContact.title')}
              </h2>
              <Input
                label={t('availability.emergencyContact.label')}
                value={availabilitySettings.emergencyContact}
                onChange={(e) => handleAvailabilityChange('emergencyContact', e.target.value)}
                placeholder={t('availability.emergencyContact.placeholder')}
              />
            </Card>
          </motion.div>
        )}
        
        {/* Business Hours Tab */}
        {activeTab === 'businessHours' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-[#D97706]" />
                {t('businessHours.title')}
              </h2>
              <div className="space-y-3">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <div key={day} className="flex flex-wrap items-center gap-4 p-3 border border-[#E4E4E7] rounded-lg">
                    <label className="flex items-center gap-2 w-24">
                      <input
                        type="checkbox"
                        checked={businessHours[day].enabled}
                        onChange={(e) => handleBusinessHourChange(day, 'enabled', e.target.checked)}
                        className="w-4 h-4 text-[#D97706] rounded"
                      />
                      <span className="font-medium capitalize">{t(`businessHours.days.${day}`)}</span>
                    </label>
                    {businessHours[day].enabled ? (
                      <>
                        <input
                          type="time"
                          value={businessHours[day].start}
                          onChange={(e) => handleBusinessHourChange(day, 'start', e.target.value)}
                          className="px-3 py-1.5 border border-[#E4E4E7] rounded-lg"
                        />
                        <span>{t('businessHours.to')}</span>
                        <input
                          type="time"
                          value={businessHours[day].end}
                          onChange={(e) => handleBusinessHourChange(day, 'end', e.target.value)}
                          className="px-3 py-1.5 border border-[#E4E4E7] rounded-lg"
                        />
                      </>
                    ) : (
                      <span className="text-[#A1A1AA] text-sm">{t('businessHours.closed')}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={resetSettings} iconLeft={<RefreshCw className="w-4 h-4" />}>
            {t('actions.reset')}
          </Button>
          <Button onClick={saveSettings} isLoading={loading} iconLeft={<Save className="w-4 h-4" />}>
            {t('actions.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
