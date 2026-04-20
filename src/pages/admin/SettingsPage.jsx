import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Bell, Shield, CreditCard, Palette, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useNotification } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';

const TABS = [
  { id: 'general',       label: 'General',       icon: Globe     },
  { id: 'notifications', label: 'Notifications', icon: Bell      },
  { id: 'security',      label: 'Security',      icon: Shield    },
  { id: 'payments',      label: 'Payments',      icon: CreditCard},
  { id: 'appearance',    label: 'Appearance',    icon: Palette   },
];

const Toggle = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border-faint)' }}>
    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    <button onClick={() => onChange(!checked)}
      className="relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{ background: checked ? 'var(--brand)' : 'var(--border-base)' }}>
      <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
        style={{ left: checked ? '22px' : '2px' }} />
    </button>
  </div>
);

const SettingsPage = () => {
  const { success } = useNotification();
  const { isDark, toggleTheme } = useTheme();
  const [tab, setTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    platformName: 'EquipRent Ethiopia',
    supportEmail: 'support@equiprent.et',
    phone: '+251 11 234 5678',
    currency: 'ETB',
    timezone: 'Africa/Addis_Ababa',
    maintenanceMode: false,
    registrationOpen: true,
    emailBookingConfirmation: true,
    emailNewSubmission: true,
    emailNewUser: false,
    smsNotifications: true,
    twoFactorAuth: true,
    sessionTimeout: '60',
    paymentGateway: 'bank_transfer',
    commissionRate: '12',
    vatRate: '15',
  });

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    success('Settings Saved', 'Platform settings updated successfully');
    setSaving(false);
  };

  const renderTab = () => {
    if (tab === 'general') return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Platform Name" value={settings.platformName} onChange={e => set('platformName', e.target.value)} />
          <Input label="Support Email" type="email" value={settings.supportEmail} onChange={e => set('supportEmail', e.target.value)} leftIcon={<Mail className="w-4 h-4" />} />
          <Input label="Support Phone" value={settings.phone} onChange={e => set('phone', e.target.value)} />
          <Select label="Currency" value={settings.currency} onChange={e => set('currency', e.target.value)}
            options={[{ value: 'ETB', label: 'ETB — Ethiopian Birr' }, { value: 'USD', label: 'USD — US Dollar' }]} />
          <Select label="Timezone" value={settings.timezone} onChange={e => set('timezone', e.target.value)}
            options={[{ value: 'Africa/Addis_Ababa', label: 'Africa/Addis Ababa (EAT)' }, { value: 'UTC', label: 'UTC' }]} />
        </div>
        <Toggle label="Maintenance Mode" checked={settings.maintenanceMode} onChange={v => set('maintenanceMode', v)} />
        <Toggle label="Open Registration" checked={settings.registrationOpen} onChange={v => set('registrationOpen', v)} />
      </div>
    );

    if (tab === 'notifications') return (
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Email Notifications</p>
        <Toggle label="Booking confirmation emails" checked={settings.emailBookingConfirmation} onChange={v => set('emailBookingConfirmation', v)} />
        <Toggle label="New submission alerts" checked={settings.emailNewSubmission} onChange={v => set('emailNewSubmission', v)} />
        <Toggle label="New user registration alerts" checked={settings.emailNewUser} onChange={v => set('emailNewUser', v)} />
        <p className="text-xs font-bold uppercase tracking-wider mb-3 mt-5" style={{ color: 'var(--text-muted)' }}>SMS Notifications</p>
        <Toggle label="SMS alerts for bookings" checked={settings.smsNotifications} onChange={v => set('smsNotifications', v)} />
      </div>
    );

    if (tab === 'security') return (
      <div className="space-y-5">
        <Toggle label="Require Two-Factor Authentication" checked={settings.twoFactorAuth} onChange={v => set('twoFactorAuth', v)} />
        <div className="w-48">
          <Select label="Session Timeout (minutes)" value={settings.sessionTimeout} onChange={e => set('sessionTimeout', e.target.value)}
            options={[{ value: '30', label: '30 minutes' }, { value: '60', label: '1 hour' }, { value: '120', label: '2 hours' }, { value: '480', label: '8 hours' }]} />
        </div>
        <div className="p-4 border" style={{ borderColor: 'var(--warning)', background: 'var(--warning-bg)', borderRadius: 'var(--r-md)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--warning)' }}>Security Tip</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Regularly rotate API keys and ensure all admin accounts use strong passwords.</p>
        </div>
      </div>
    );

    if (tab === 'payments') return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="Payment Gateway" value={settings.paymentGateway} onChange={e => set('paymentGateway', e.target.value)}
            options={[{ value: 'bank_transfer', label: 'Bank Transfer' }, { value: 'telebirr', label: 'TeleBirr' }, { value: 'cbe_birr', label: 'CBE Birr' }]} />
          <Input label="Platform Commission (%)" type="number" value={settings.commissionRate} onChange={e => set('commissionRate', e.target.value)} hint="Percentage taken from each booking" />
          <Input label="VAT Rate (%)" type="number" value={settings.vatRate} onChange={e => set('vatRate', e.target.value)} hint="Applied to all transactions" />
        </div>
        <div className="p-4 border" style={{ borderColor: 'var(--info)', background: 'var(--info-bg)', borderRadius: 'var(--r-md)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--info)' }}>Payment Info</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Current gateway: Bank Transfer. Commission: {settings.commissionRate}% per booking. VAT: {settings.vatRate}%.</p>
        </div>
      </div>
    );

    if (tab === 'appearance') return (
      <div className="space-y-5">
        <div className="flex items-center justify-between p-4 border" style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Dark Mode</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Currently: {isDark ? 'Dark' : 'Light'}</p>
          </div>
          <Toggle checked={isDark} onChange={toggleTheme} label="" />
        </div>
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>Brand Color</p>
          <div className="flex gap-3 flex-wrap">
            {['#E8650A', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b'].map(c => (
              <button key={c} className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{ background: c, borderColor: c === '#E8650A' ? 'var(--text-primary)' : 'transparent' }} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Configure your platform preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-44 flex-shrink-0">
          <div className="space-y-0.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-all"
                style={{
                  background:   tab === id ? 'var(--brand-muted)' : 'transparent',
                  color:        tab === id ? 'var(--brand)' : 'var(--text-muted)',
                  borderRadius: 'var(--r-md)',
                  textAlign:    'left',
                }}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
          <motion.div key={tab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="font-bold text-base mb-5" style={{ color: 'var(--text-primary)' }}>
              {TABS.find(t => t.id === tab)?.label}
            </h2>
            {renderTab()}
          </motion.div>

          {tab !== 'appearance' && (
            <div className="mt-6 pt-5 border-t flex justify-end" style={{ borderColor: 'var(--border-base)' }}>
              <Button onClick={handleSave} loading={saving} leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
