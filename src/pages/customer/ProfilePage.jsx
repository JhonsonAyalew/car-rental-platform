import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Camera,
  Edit2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Home,
  Briefcase,
  Award,
  Star,
  Clock,
  TrendingUp,
  Heart,
  Car,
  DollarSign,
  Upload,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: 'Abebe',
    lastName: 'Belay',
    email: 'abebe.belay@example.com',
    phone: '+251 911 234567',
    altPhone: '+251 922 345678',
    address: 'Bole Medhanialem',
    subcity: 'Bole',
    woreda: 'Woreda 03',
    city: 'Addis Ababa',
    dateOfBirth: '1990-05-15',
    occupation: 'Construction Manager',
    company: 'ABC Construction PLC',
    taxId: '123456789',
    emergencyContact: '+251 933 456789',
    emergencyName: 'Tigist Abebe'
  });

  const [stats, setStats] = useState({
    totalBookings: 12,
    activeBookings: 2,
    totalSpent: 45600,
    loyaltyPoints: 2450,
    memberSince: '2023-06-15',
    verificationStatus: 'verified',
    completedProjects: 8
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load saved profile image from localStorage
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        localStorage.setItem('profileImage', reader.result);
        toast.success(t('toast.profilePictureUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSaveProfile = () => {
    // Validate
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = t('validation.firstNameRequired');
    if (!formData.lastName) newErrors.lastName = t('validation.lastNameRequired');
    if (!formData.email) newErrors.email = t('validation.emailRequired');
    if (!formData.phone) newErrors.phone = t('validation.phoneRequired');
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t('toast.fixErrors'));
      return;
    }
    
    toast.success(t('toast.profileUpdated'));
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword) {
      toast.error(t('validation.enterCurrentPassword'));
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error(t('validation.passwordMinLength'));
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t('validation.passwordMismatch'));
      return;
    }
    
    toast.success(t('toast.passwordChanged'));
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`;
  };

  const memberSinceDate = new Date(stats.memberSince).toLocaleDateString('en-ET', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="bg-gradient-to-br from-[#F9F8F6] to-[#FEF3C7]/20 min-h-screen py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">{t('page.title')}</h1>
          <p className="text-[#52525B]">{t('page.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Card */}
              <Card className="text-center overflow-hidden">
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#D97706] to-[#B45309]" />
                  <div className="relative pt-12">
                    <div className="relative inline-block">
                      <div className="w-28 h-28 rounded-full bg-white p-1 mx-auto">
                        {imagePreview ? (
                          <img 
                            src={imagePreview} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] flex items-center justify-center text-white text-3xl font-bold">
                            {getInitials()}
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 p-1.5 bg-[#D97706] rounded-full cursor-pointer hover:bg-[#B45309] transition">
                        <Camera className="w-4 h-4 text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-4 pb-6">
                    <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
                    <p className="text-sm text-[#52525B]">{formData.occupation}</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge variant="approved">✓ {t('profileCard.verifiedMember')}</Badge>
                      <Badge variant="approved">⭐ {stats.loyaltyPoints} {t('profileCard.points')}</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats Cards */}
              <Card>
                <h3 className="font-semibold mb-4">{t('accountStatistics')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('profileCard.memberSince')}</span>
                    </div>
                    <span className="text-sm font-medium">{memberSinceDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('profileCard.totalBookings')}</span>
                    </div>
                    <span className="text-sm font-medium">{stats.totalBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('profileCard.activeBookings')}</span>
                    </div>
                    <span className="text-sm font-medium">{stats.activeBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('profileCard.totalSpent')}</span>
                    </div>
                    <span className="text-sm font-bold text-[#D97706]">{formatCurrency(stats.totalSpent)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#52525B]" />
                      <span className="text-sm">{t('profileCard.completedProjects')}</span>
                    </div>
                    <span className="text-sm font-medium">{stats.completedProjects}</span>
                  </div>
                </div>
              </Card>

              {/* Loyalty Card */}
              <Card className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold">{t('loyaltyCard.title')}</h3>
                    <p className="text-xs opacity-90">{t('loyaltyCard.goldMember')}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{stats.loyaltyPoints} {t('loyaltyCard.points')}</span>
                    <span>{t('loyaltyCard.next')}: 3,000 {t('loyaltyCard.points')}</span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
                <p className="text-xs opacity-90">{t('loyaltyCard.cashback')}</p>
              </Card>
            </div>
          </div>

          {/* Right Column - Edit Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="text-[#D97706]" />
                  {t('personalInfo.title')}
                </h2>
                {!isEditing ? (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    iconLeft={<Edit2 className="w-4 h-4" />}
                  >
                    {t('personalInfo.editButton')}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      iconLeft={<X className="w-4 h-4" />}
                    >
                      {t('personalInfo.cancelButton')}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSaveProfile}
                      iconLeft={<Save className="w-4 h-4" />}
                    >
                      {t('personalInfo.saveButton')}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('personalInfo.firstName')}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  error={errors.firstName}
                />
                <Input
                  label={t('personalInfo.lastName')}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  error={errors.lastName}
                />
                <Input
                  label={t('personalInfo.email')}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  error={errors.email}
                  icon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label={t('personalInfo.phone')}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  error={errors.phone}
                  icon={<Phone className="w-4 h-4" />}
                />
                <Input
                  label={t('personalInfo.altPhone')}
                  type="tel"
                  value={formData.altPhone}
                  onChange={(e) => handleInputChange('altPhone', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  type="date"
                  label={t('personalInfo.dateOfBirth')}
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </Card>

            {/* Address Information - Ethiopian Format */}
            <Card>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Home className="text-[#D97706]" />
                {t('addressInfo.title')}
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('addressInfo.streetAddress')}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label={t('addressInfo.subcity')}
                    value={formData.subcity}
                    onChange={(e) => handleInputChange('subcity', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label={t('addressInfo.woreda')}
                    value={formData.woreda}
                    onChange={(e) => handleInputChange('woreda', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label={t('addressInfo.city')}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </Card>

            {/* Professional Information */}
            <Card>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="text-[#D97706]" />
                {t('professionalInfo.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('professionalInfo.occupation')}
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label={t('professionalInfo.company')}
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label={t('professionalInfo.taxId')}
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="text-[#D97706]" />
                {t('emergencyContact.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('emergencyContact.name')}
                  value={formData.emergencyName}
                  onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label={t('emergencyContact.phone')}
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </Card>

            {/* Security Settings */}
            <Card>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lock className="text-[#D97706]" />
                {t('security.title')}
              </h2>
              
              {!showChangePassword ? (
                <Button 
                  variant="secondary" 
                  onClick={() => setShowChangePassword(true)}
                  iconLeft={<Lock className="w-4 h-4" />}
                >
                  {t('security.changePassword')}
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      label={t('security.currentPassword')}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-[#A1A1AA] hover:text-[#D97706]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      label={t('security.newPassword')}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-[#A1A1AA] hover:text-[#D97706]"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      label={t('security.confirmPassword')}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-[#A1A1AA] hover:text-[#D97706]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={handleChangePassword}>{t('security.updateButton')}</Button>
                    <Button variant="ghost" onClick={() => setShowChangePassword(false)}>{t('security.cancelButton')}</Button>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Account Actions */}
            <Card className="border-red-200 bg-red-50">
              <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
                <AlertCircle className="text-red-600" />
                {t('accountActions.title')}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="danger" size="sm">{t('accountActions.deleteAccount')}</Button>
                <Button variant="ghost" size="sm">{t('accountActions.downloadData')}</Button>
                <Button variant="ghost" size="sm">{t('accountActions.exportLogs')}</Button>
              </div>
              <p className="text-xs text-red-600 mt-3">
                {t('accountActions.warning')}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
