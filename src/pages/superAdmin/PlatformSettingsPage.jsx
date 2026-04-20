import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const PlatformSettingsPage = () => {
  const [settings, setSettings] = useState({
    platformName: 'CarRental Platform',
    platformEmail: 'support@carrental.com',
    platformPhone: '+1 234 567 8900',
    platformFee: 15,
    minRentalDays: 1,
    maxRentalDays: 30,
    cancellationHours: 24,
    securityDeposit: 200,
    enableReviews: true,
    enableNotifications: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Platform Settings</h1>
        <p className="text-[#52525B] mt-1">Configure global platform settings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <Input
              label="Platform Name"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
            />
            <Input
              label="Support Email"
              type="email"
              value={settings.platformEmail}
              onChange={(e) => setSettings({ ...settings, platformEmail: e.target.value })}
            />
            <Input
              label="Support Phone"
              value={settings.platformPhone}
              onChange={(e) => setSettings({ ...settings, platformPhone: e.target.value })}
            />
          </div>
        </Card>

        {/* Fee Settings */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Fee & Commission</h2>
          <div className="space-y-4">
            <Input
              label="Platform Fee (%)"
              type="number"
              value={settings.platformFee}
              onChange={(e) => setSettings({ ...settings, platformFee: parseInt(e.target.value) })}
              suffix="%"
            />
            <Input
              label="Minimum Rental Days"
              type="number"
              value={settings.minRentalDays}
              onChange={(e) => setSettings({ ...settings, minRentalDays: parseInt(e.target.value) })}
            />
            <Input
              label="Maximum Rental Days"
              type="number"
              value={settings.maxRentalDays}
              onChange={(e) => setSettings({ ...settings, maxRentalDays: parseInt(e.target.value) })}
            />
            <Input
              label="Cancellation Window (hours)"
              type="number"
              value={settings.cancellationHours}
              onChange={(e) => setSettings({ ...settings, cancellationHours: parseInt(e.target.value) })}
            />
            <Input
              label="Default Security Deposit ($)"
              type="number"
              value={settings.securityDeposit}
              onChange={(e) => setSettings({ ...settings, securityDeposit: parseInt(e.target.value) })}
              prefix="$"
            />
          </div>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Feature Toggles</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Enable Customer Reviews</span>
              <input
                type="checkbox"
                checked={settings.enableReviews}
                onChange={(e) => setSettings({ ...settings, enableReviews: e.target.checked })}
                className="toggle"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Enable Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                className="toggle"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Maintenance Mode</span>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="toggle"
              />
            </label>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card>
          <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
          <div className="space-y-3">
            <Button variant="danger" className="w-full">Clear All Cache</Button>
            <Button variant="danger" className="w-full">Export All Data</Button>
            <Button variant="danger" className="w-full">Reset Platform Settings</Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default PlatformSettingsPage;
