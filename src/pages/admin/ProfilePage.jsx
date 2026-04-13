import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, Toaster } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const AdminProfilePage = () => {
  const { t } = useTranslation('adminProfile');
  
  const [formData, setFormData] = useState({
    fullName: 'Admin User',
    emailAddress: 'admin@example.com',
    phoneNumber: '+1 234 567 8900'
  });
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = () => {
    toast.success(t('messages.updateSuccess'));
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success(t('messages.passwordChangeSuccess'));
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster position="top-right" />
      
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">{t('profile.title')}</h1>
      
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E4E4E7]">
            <div className="w-20 h-20 rounded-full bg-[#D97706] flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
            <div>
              <h2 className="text-xl font-semibold">{formData.fullName}</h2>
              <p className="text-[#52525B]">{t('profile.administrator')}</p>
            </div>
          </div>
          
          <Input 
            label={t('form.fullName')} 
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input 
            label={t('form.emailAddress')} 
            type="email"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
          />
          <Input 
            label={t('form.phoneNumber')} 
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          
          <div className="pt-4">
            <Button onClick={handleProfileUpdate}>{t('form.updateProfile')}</Button>
            <Button 
              variant="ghost" 
              className="ml-3"
              onClick={() => setShowPasswordModal(true)}
            >
              {t('form.changePassword')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-strong">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{t('form.changePassword')}</h2>
              
              <div className="space-y-4">
                <Input 
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
                <Input 
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
                <Input 
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button onClick={handlePasswordChange}>Update Password</Button>
                <Button variant="ghost" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfilePage;
