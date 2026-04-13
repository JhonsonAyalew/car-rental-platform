import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Settings,
  Globe,
  DollarSign,
  Bell,
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  HardHat,
  Calendar,
  Download,
  Upload,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Truck,
  FileText,
  Printer,
  Database,
  Key,
  Badge,
  Lock,
  UserCheck,
  MessageSquare,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const { t } = useTranslation('settings');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'EquiRent Ethiopia',
    platformEmail: 'support@equirent.com',
    platformPhone: '+251 911 123456',
    platformAddress: 'Bole, Addis Ababa, Ethiopia',
    timezone: 'Africa/Addis_Ababa',
    currency: 'ETB',
    language: 'en'
  });
  
  const [feeSettings, setFeeSettings] = useState({
    platformFee: 15,
    minRentalDays: 1,
    maxRentalDays: 90,
    cancellationHours: 24,
    securityDeposit: 5000,
    lateFeePerHour: 200,
    insuranceFee: 500
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    marketingEmails: false,
    weeklyDigest: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    ipWhitelist: '',
    maintenanceMode: false
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    paymentGateway: 'chapa',
    chapaApiKey: 'chapa_live_xxxxxxxxxxxxx',
    bankName: 'Commercial Bank of Ethiopia',
    accountNumber: '1000134567890',
    accountName: 'EquiRent Ethiopia PLC',
    settlementDays: 3
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = () => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleSaveSettings = async (section) => {
    setSaving(true);
    setTimeout(() => {
      toast.success(t('toast.saveSuccess', { section: t(`tabs.${section}`) }));
      setSaving(false);
    }, 1000);
  };

  const handleResetSettings = () => {
    toast.success(t('toast.resetSuccess'));
  };

  const tabs = [
    { id: 'general', label: t('tabs.general'), icon: Settings },
    { id: 'fees', label: t('tabs.fees'), icon: DollarSign },
    { id: 'notifications', label: t('tabs.notifications'), icon: Bell },
    { id: 'security', label: t('tabs.security'), icon: Shield },
    { id: 'payment', label: t('tabs.payment'), icon: CreditCard }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{t('page.title')}</h1>
          <p className="text-[#52525B] mt-1">{t('page.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleResetSettings} iconLeft={<RefreshCw className="w-4 h-4" />}>
            {t('page.resetButton')}
          </Button>
          <Button onClick={() => handleSaveSettings(activeTab)} isLoading={saving} iconLeft={<Save className="w-4 h-4" />}>
            {t('page.saveButton')}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E4E4E7]">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-[#D97706] text-white' 
                    : 'text-[#52525B] hover:text-[#D97706] hover:bg-[#FEF3C7]'}
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <Card>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#D97706]" />
                {t('general.title')}
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('general.platformName')}
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                    icon={<Settings className="w-4 h-4" />}
                  />
                  <Input
                    label={t('general.supportEmail')}
                    type="email"
                    value={generalSettings.platformEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformEmail: e.target.value })}
                    icon={<Mail className="w-4 h-4" />}
                  />
                  <Input
                    label={t('general.supportPhone')}
                    value={generalSettings.platformPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformPhone: e.target.value })}
                    icon={<Phone className="w-4 h-4" />}
                  />
                  <Input
                    label={t('general.platformAddress')}
                    value={generalSettings.platformAddress}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformAddress: e.target.value })}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('general.timezone')}</label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                    >
                      <option value="Africa/Addis_Ababa">{t('general.timezoneOptions.addis')}</option>
                      <option value="Africa/Nairobi">{t('general.timezoneOptions.nairobi')}</option>
                      <option value="UTC">{t('general.timezoneOptions.utc')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('general.defaultLanguage')}</label>
                    <select
                      value={generalSettings.language}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                    >
                      <option value="en">{t('general.languageOptions.en')}</option>
                      <option value="am">{t('general.languageOptions.am')}</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Fees & Pricing Tab */}
          {activeTab === 'fees' && (
            <Card>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#D97706]" />
                {t('fees.title')}
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('fees.platformFee')}
                    type="number"
                    value={feeSettings.platformFee}
                    onChange={(e) => setFeeSettings({ ...feeSettings, platformFee: parseInt(e.target.value) })}
                    suffix="%"
                  />
                  <Input
                    label={t('fees.minRentalDays')}
                    type="number"
                    value={feeSettings.minRentalDays}
                    onChange={(e) => setFeeSettings({ ...feeSettings, minRentalDays: parseInt(e.target.value) })}
                  />
                  <Input
                    label={t('fees.maxRentalDays')}
                    type="number"
                    value={feeSettings.maxRentalDays}
                    onChange={(e) => setFeeSettings({ ...feeSettings, maxRentalDays: parseInt(e.target.value) })}
                  />
                  <Input
                    label={t('fees.cancellationWindow')}
                    type="number"
                    value={feeSettings.cancellationHours}
                    onChange={(e) => setFeeSettings({ ...feeSettings, cancellationHours: parseInt(e.target.value) })}
                    suffix={t('fees.suffixHours')}
                  />
                  <Input
                    label={t('fees.securityDeposit')}
                    type="number"
                    value={feeSettings.securityDeposit}
                    onChange={(e) => setFeeSettings({ ...feeSettings, securityDeposit: parseInt(e.target.value) })}
                    prefix="ETB"
                  />
                  <Input
                    label={t('fees.lateFee')}
                    type="number"
                    value={feeSettings.lateFeePerHour}
                    onChange={(e) => setFeeSettings({ ...feeSettings, lateFeePerHour: parseInt(e.target.value) })}
                    prefix="ETB"
                  />
                  <Input
                    label={t('fees.insuranceFee')}
                    type="number"
                    value={feeSettings.insuranceFee}
                    onChange={(e) => setFeeSettings({ ...feeSettings, insuranceFee: parseInt(e.target.value) })}
                    prefix="ETB"
                  />
                </div>
                
                <div className="bg-[#FEF3C7] p-4 rounded-lg">
                  <p className="text-sm text-[#92400E] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5" />
                    <span>{t('fees.infoMessage')}</span>
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#D97706]" />
                {t('notifications.title')}
              </h2>
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium">{t('notifications.email.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('notifications.email.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium">{t('notifications.sms.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('notifications.sms.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium">{t('notifications.bookingAlerts.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('notifications.bookingAlerts.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.bookingAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, bookingAlerts: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium">{t('notifications.paymentAlerts.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('notifications.paymentAlerts.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.paymentAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, paymentAlerts: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium">{t('notifications.weeklyDigest.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('notifications.weeklyDigest.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyDigest}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyDigest: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#D97706]" />
                {t('security.title')}
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('security.sessionTimeout')}</label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('security.passwordExpiry')}</label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('security.maxLoginAttempts')}</label>
                    <input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('security.ipWhitelist')}</label>
                    <input
                      type="text"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                      placeholder={t('security.ipWhitelistPlaceholder')}
                      className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-[#E4E4E7]">
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium">{t('security.twoFactorAuth.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('security.twoFactorAuth.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F9F8F6]">
                    <div>
                      <p className="font-medium text-red-600">{t('security.maintenanceMode.title')}</p>
                      <p className="text-sm text-[#52525B]">{t('security.maintenanceMode.desc')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.maintenanceMode}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, maintenanceMode: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                </div>
              </div>
            </Card>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <Card>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D97706]" />
                {t('payment.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('payment.gateway')}</label>
                  <select
                    value={paymentSettings.paymentGateway}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentGateway: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E4E4E7] rounded-lg bg-white"
                  >
                    <option value="chapa">{t('payment.gatewayOptions.chapa')}</option>
                    <option value="telebirr">{t('payment.gatewayOptions.telebirr')}</option>
                    <option value="cbebirr">{t('payment.gatewayOptions.cbebirr')}</option>
                    <option value="stripe">{t('payment.gatewayOptions.stripe')}</option>
                  </select>
                </div>
                
                <Input
                  label={t('payment.apiKey')}
                  type="password"
                  value={paymentSettings.chapaApiKey}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, chapaApiKey: e.target.value })}
                  icon={<Key className="w-4 h-4" />}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={t('payment.bankName')}
                    value={paymentSettings.bankName}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, bankName: e.target.value })}
                  />
                  <Input
                    label={t('payment.accountNumber')}
                    value={paymentSettings.accountNumber}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, accountNumber: e.target.value })}
                  />
                  <Input
                    label={t('payment.accountName')}
                    value={paymentSettings.accountName}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, accountName: e.target.value })}
                  />
                  <Input
                    label={t('payment.settlementDays')}
                    type="number"
                    value={paymentSettings.settlementDays}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, settlementDays: parseInt(e.target.value) })}
                    suffix={t('fees.suffixHours')}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5" />
                    <span>{t('payment.infoMessage')}</span>
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar - Quick Actions & Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#D97706]" />
              {t('sidebar.dataManagement.title')}
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" iconLeft={<Download className="w-4 h-4" />}>
                {t('sidebar.dataManagement.export')}
              </Button>
              <Button variant="ghost" className="w-full justify-start" iconLeft={<Upload className="w-4 h-4" />}>
                {t('sidebar.dataManagement.import')}
              </Button>
              <Button variant="ghost" className="w-full justify-start" iconLeft={<Printer className="w-4 h-4" />}>
                {t('sidebar.dataManagement.print')}
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#D97706]" />
              {t('sidebar.systemStatus.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#52525B]">{t('sidebar.systemStatus.platformStatus')}</span>
                <Badge variant="approved">{t('sidebar.systemStatus.operational')}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#52525B]">{t('sidebar.systemStatus.lastBackup')}</span>
                <span className="text-sm">2024-01-20 03:00 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#52525B]">{t('sidebar.systemStatus.version')}</span>
                <span className="text-sm font-medium">v2.5.0</span>
              </div>
              <Button variant="secondary" className="w-full mt-2" size="sm">
                {t('sidebar.systemStatus.checkUpdates')}
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-[#D97706]/10 to-[#FEF3C7]/30">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#D97706]" />
              {t('sidebar.help.title')}
            </h3>
            <p className="text-sm text-[#52525B] mb-3">
              {t('sidebar.help.message')}
            </p>
            <Button variant="secondary" className="w-full" size="sm">
              {t('sidebar.help.button')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
