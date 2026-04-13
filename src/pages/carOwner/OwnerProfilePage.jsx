import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { toast, Toaster } from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Camera, 
  Save, 
  HardHat,
  Truck,
  Award,
  Clock,
  Shield,
  Globe,
  FileText,
  AlertCircle
} from 'lucide-react';

const OwnerProfilePage = () => {
  const { t } = useTranslation('ownerProfile');
  const [profile, setProfile] = useState({
    name: 'Abebe Bekele',
    email: 'abebe@construction.com',
    phone: '+251 911 234567',
    altPhone: '+251 922 345678',
    businessName: 'Abebe Heavy Equipment Rentals',
    tinNumber: '123456789',
    licenseNumber: 'CON-2024-001',
    address: 'Bole Medhanialem, near the airport',
    subcity: 'Bole',
    woreda: 'Woreda 03',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    bio: 'Professional heavy equipment rental service with over 8 years of experience in the Ethiopian construction industry. We provide well-maintained excavators, loaders, dump trucks, and cranes for all types of construction projects across Ethiopia.',
    website: 'www.abebeequipment.com',
    experience: '8+ years',
    equipmentCount: 16,
    verifiedSince: '2022'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t('profileUpdated'));
      setIsEditing(false);
      setLoading(false);
    }, 1500);
  };
  
  const StatCard = ({ icon: Icon, label, value, color = '#D97706' }) => (
    <motion.div 
      className="text-center p-4 bg-[#F9F8F6] rounded-lg hover:shadow-md transition"
      whileHover={{ y: -2 }}
    >
      <Icon className="w-6 h-6 mx-auto mb-2" style={{ color }} />
      <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
      <p className="text-xs text-[#A1A1AA]">{label}</p>
    </motion.div>
  );
  
  // Ethiopian regions for dropdown
  const ethiopianRegions = t('ethiopianRegions', { returnObjects: true }) || [
    'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa',
    'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali', 'South West Ethiopia',
    'Southern Nations', 'Tigray'
  ];
  
  const ethiopianCities = t('ethiopianCities', { returnObjects: true }) || [
    'Addis Ababa', 'Adama', 'Bahir Dar', 'Dire Dawa', 'Hawassa',
    'Mekelle', 'Gondar', 'Jimma', 'Harar', 'Dessie', 'Debre Markos'
  ];
  
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D97706] mb-4 shadow-lg"
          >
            <HardHat className="w-10 h-10 text-white" />
          </motion.div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">{t('title')}</h1>
            <span className="text-2xl">🇪🇹</span>
          </div>
          <p className="text-[#52525B]">{t('subtitle')}</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="approved">✓ {t('verifiedOwner')}</Badge>
            <Badge variant="approved">⭐ {t('premiumPartner')}</Badge>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={HardHat} label={t('stats.totalEquipment')} value={profile.equipmentCount} color="#D97706" />
          <StatCard icon={Truck} label={t('stats.totalBookings')} value="48" color="#10B981" />
          <StatCard icon={Clock} label={t('stats.responseRate')} value="96%" color="#3B82F6" />
          <StatCard icon={Award} label={t('stats.responseTime')} value="< 2 hours" color="#8B5CF6" />
        </div>
        
        {/* Profile Form */}
        <Card className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">{t('profileInfo')}</h2>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="secondary">
                {t('editProfile')}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setIsEditing(false)} variant="ghost">
                  {t('cancel')}
                </Button>
                <Button onClick={handleSubmit} isLoading={loading} iconLeft={<Save className="w-4 h-4" />}>
                  {t('saveChanges')}
                </Button>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#D97706]" />
                  {t('sections.personalInfo')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('personalInfo.fullName')}
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditing}
                    icon={<User className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label={t('personalInfo.email')}
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                    icon={<Mail className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label={t('personalInfo.phone')}
                    value={profile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                    icon={<Phone className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label={t('personalInfo.altPhone')}
                    value={profile.altPhone}
                    onChange={(e) => handleChange('altPhone', e.target.value)}
                    disabled={!isEditing}
                    icon={<Phone className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                </div>
              </div>
              
              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#D97706]" />
                  {t('sections.businessInfo')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('businessInfo.businessName')}
                    value={profile.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    disabled={!isEditing}
                    icon={<Building className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label={t('businessInfo.tinNumber')}
                    value={profile.tinNumber}
                    onChange={(e) => handleChange('tinNumber', e.target.value)}
                    disabled={!isEditing}
                    icon={<FileText className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label={t('businessInfo.licenseNumber')}
                    value={profile.licenseNumber}
                    onChange={(e) => handleChange('licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    icon={<Shield className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label={t('businessInfo.yearsInBusiness')}
                    value={profile.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    disabled={!isEditing}
                    icon={<Clock className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                </div>
              </div>
              
              {/* Address Information - Ethiopian Format */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D97706]" />
                  {t('sections.addressInfo')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('addressInfo.streetAddress')}
                    value={profile.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    disabled={!isEditing}
                    placeholder={t('addressInfo.addressHint')}
                  />
                  <Input
                    label={t('addressInfo.subcity')}
                    value={profile.subcity}
                    onChange={(e) => handleChange('subcity', e.target.value)}
                    disabled={!isEditing}
                    placeholder={t('addressInfo.subcityPlaceholder')}
                  />
                  <Input
                    label={t('addressInfo.woreda')}
                    value={profile.woreda}
                    onChange={(e) => handleChange('woreda', e.target.value)}
                    disabled={!isEditing}
                    placeholder={t('addressInfo.woredaPlaceholder')}
                  />
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                      {t('addressInfo.city')}
                    </label>
                    <select
                      value={profile.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white focus:outline-none focus:border-[#D97706] disabled:opacity-50"
                    >
                      <option value="">{t('placeholders.selectCity')}</option>
                      {ethiopianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                      {t('addressInfo.region')}
                    </label>
                    <select
                      value={profile.region}
                      onChange={(e) => handleChange('region', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white focus:outline-none focus:border-[#D97706] disabled:opacity-50"
                    >
                      <option value="">{t('placeholders.selectRegion')}</option>
                      {ethiopianRegions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Bio & Website */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('sections.additionalInfo')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                      {t('additionalInfo.companyBio')}
                    </label>
                    <textarea
                      className="w-full px-3 py-2.5 bg-[#F3F2EE] border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10 disabled:opacity-50"
                      rows="4"
                      value={profile.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      disabled={!isEditing}
                      placeholder={t('additionalInfo.bioPlaceholder')}
                    />
                  </div>
                  <Input
                    label={t('additionalInfo.website')}
                    value={profile.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    disabled={!isEditing}
                    placeholder={t('additionalInfo.websitePlaceholder')}
                    icon={<Globe className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                </div>
              </div>
              
              {/* Change Password Section */}
              {isEditing && (
                <div className="pt-4 border-t border-[#E4E4E7]">
                  <h3 className="text-lg font-semibold mb-4 text-[#D97706]">{t('sections.changePassword')}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="password"
                      label={t('changePassword.currentPassword')}
                      placeholder={t('changePassword.currentPlaceholder')}
                    />
                    <Input
                      type="password"
                      label={t('changePassword.newPassword')}
                      placeholder={t('changePassword.newPlaceholder')}
                    />
                    <Input
                      type="password"
                      label={t('changePassword.confirmPassword')}
                      placeholder={t('changePassword.confirmPlaceholder')}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </Card>
        
        {/* Service Area Card */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-[#D97706]/5 to-[#FEF3C7]/20">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#D97706]" />
            {t('sections.serviceArea')}
          </h2>
          <p className="text-sm text-[#52525B] mb-3">
            {t('serviceArea.description')}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.values(t('serviceArea.cities', { returnObjects: true })).map(city => (
              <span key={city} className="px-2 py-1 bg-white rounded-full text-xs text-[#52525B] border border-[#E4E4E7]">
                {city}
              </span>
            ))}
          </div>
        </Card>
        
        {/* Account Settings Card - Danger Zone */}
        <Card className="mt-6 p-6 border-red-200 bg-red-50">
          <h2 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {t('sections.dangerZone')}
          </h2>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="font-medium text-[#1A1A1A]">{t('dangerZone.deactivateTitle')}</p>
              <p className="text-sm text-[#52525B]">{t('dangerZone.deactivateDescription')}</p>
            </div>
            <Button variant="danger" size="sm">
              {t('dangerZone.deactivateButton')}
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-red-200 flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="font-medium text-[#1A1A1A]">{t('dangerZone.exportTitle')}</p>
              <p className="text-sm text-[#52525B]">{t('dangerZone.exportDescription')}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600 border-red-300 hover:bg-red-100">
              {t('dangerZone.exportButton')}
            </Button>
          </div>
        </Card>
        
        {/* Verification Status */}
        <div className="mt-4 text-center">
          <p className="text-xs text-[#A1A1AA]">
            {t('verification.text', { year: profile.verifiedSince })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
