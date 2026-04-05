
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { toast, Toaster } from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Building, Camera, Save } from 'lucide-react';

const OwnerProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'John Owner',
    email: 'owner@example.com',
    phone: '+1 234 567 8900',
    businessName: "John's Premium Auto Rentals",
    address: '123 Business Street, Suite 100',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    bio: 'Professional car rental service with over 5 years of experience. All cars are regularly maintained and cleaned.',
    website: 'www.johnsautorentals.com'
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
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setLoading(false);
    }, 1500);
  };
  
  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="text-center p-4 bg-[#F9F8F6] rounded-lg">
      <Icon className="w-6 h-6 text-[#D97706] mx-auto mb-2" />
      <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
      <p className="text-xs text-[#A1A1AA]">{label}</p>
    </div>
  );
  
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
            <User className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Owner Profile</h1>
          <p className="text-[#52525B]">Manage your account and business information</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Building} label="Total Listings" value="5" />
          <StatCard icon={User} label="Total Bookings" value="12" />
          <StatCard icon={Mail} label="Response Rate" value="98%" />
          <StatCard icon={Phone} label="Response Time" value="Less than 1 hour" />
        </div>
        
        {/* Profile Form */}
        <Card className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">Profile Information</h2>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="secondary">
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setIsEditing(false)} variant="ghost">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} isLoading={loading} iconLeft={<Save className="w-4 h-4" />}>
                  Save Changes
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
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditing}
                    icon={<User className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                    icon={<Mail className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                    icon={<Phone className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                  <Input
                    label="Business Name"
                    value={profile.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    disabled={!isEditing}
                    icon={<Building className="w-4 h-4 text-[#A1A1AA]" />}
                  />
                </div>
              </div>
              
              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D97706]" />
                  Address Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Street Address"
                    value={profile.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="City"
                    value={profile.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="State"
                    value={profile.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Zip Code"
                    value={profile.zipCode}
                    onChange={(e) => handleChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {/* Bio & Website */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
                      Bio / Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2.5 bg-[#F3F2EE] border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10 disabled:opacity-50"
                      rows="4"
                      value={profile.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Tell customers about your car rental business..."
                    />
                  </div>
                  <Input
                    label="Website (Optional)"
                    value={profile.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    disabled={!isEditing}
                    placeholder="www.yourwebsite.com"
                  />
                </div>
              </div>
              
              {/* Change Password Section */}
              {isEditing && (
                <div className="pt-4 border-t border-[#E4E4E7]">
                  <h3 className="text-lg font-semibold mb-4 text-[#D97706]">Change Password</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="password"
                      label="Current Password"
                      placeholder="Enter current password"
                    />
                    <Input
                      type="password"
                      label="New Password"
                      placeholder="Enter new password"
                    />
                    <Input
                      type="password"
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </Card>
        
        {/* Account Settings Card */}
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="font-medium text-[#1A1A1A]">Deactivate Account</p>
              <p className="text-sm text-[#52525B]">Once deactivated, your listings will be hidden</p>
            </div>
            <Button variant="danger" size="sm">
              Deactivate Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
