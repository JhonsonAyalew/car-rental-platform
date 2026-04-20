import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Bell, CreditCard, Shield, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useNotification } from '../../context/NotificationContext';

const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--border-faint)' }}>
    <div className="flex-1 min-w-0 pr-4">
      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{description}</p>}
    </div>
    <button onClick={() => onChange(!checked)}
      className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
      style={{ background: checked ? '#8b5cf6' : 'var(--border-base)' }}>
      <span className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
        style={{ left: checked ? '22px' : '2px' }} />
    </button>
  </div>
);

const TABS = [
  { id: 'notifications', label: 'Notifications', icon: Bell     },
  { id: 'availability',  label: 'Availability',  icon: Clock    },
  { id: 'payout',        label: 'Payout',        icon: CreditCard },
  { id: 'security',      label: 'Security',      icon: Shield    },
];

const OwnerSettingsPage = () => {
  const { success } = useNotification();
  const [tab, setTab]     = useState('notifications');
  const [saving, setSaving] = useState(false);
  const [s, setS]         = useState({
    emailBookingNew:    true,
    emailBookingCancel: true,
    emailPayment:       true,
    smsNew:             false,
    autoAccept:         false,
    instantBook:        true,
    minNoticeDays:      '1',
    maxAdvanceDays:     '90',
    payoutMethod:       'bank_transfer',
    bankName:           '',
    accountNumber:      '',
    twoFactor:          false,
  });
  const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
  const setN = (k) => (e) => set(k, e.target.value);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    success('Settings Saved', 'Your preferences have been updated.');
    setSaving(false);
  };

  const renderTab = () => {
    if (tab === 'notifications') return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Email</p>
        <Toggle label="New Booking"          description="When a customer books your equipment"       checked={s.emailBookingNew}    onChange={v => set('emailBookingNew', v)} />
        <Toggle label="Booking Cancelled"    description="When a customer cancels a booking"           checked={s.emailBookingCancel} onChange={v => set('emailBookingCancel', v)} />
        <Toggle label="Payment Received"     description="When you receive a rental payment"            checked={s.emailPayment}       onChange={v => set('emailPayment', v)} />
        <p className="text-xs font-bold uppercase tracking-wider mt-5 mb-1" style={{ color: 'var(--text-muted)' }}>SMS</p>
        <Toggle label="SMS Notifications"   description="Receive booking alerts via SMS"               checked={s.smsNew}             onChange={v => set('smsNew', v)} />
      </div>
    );

    if (tab === 'availability') return (
      <div className="space-y-4">
        <Toggle label="Auto-Accept Bookings" description="Automatically confirm bookings without manual review" checked={s.autoAccept}   onChange={v => set('autoAccept', v)} />
        <Toggle label="Instant Book"         description="Allow customers to book immediately"                  checked={s.instantBook} onChange={v => set('instantBook', v)} />
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Input label="Min. Notice (days)" type="number" min="0" value={s.minNoticeDays}   onChange={setN('minNoticeDays')}   hint="Minimum days before booking" />
          <Input label="Max Advance (days)" type="number" min="1" value={s.maxAdvanceDays}  onChange={setN('maxAdvanceDays')}  hint="How far ahead customers can book" />
        </div>
      </div>
    );

    if (tab === 'payout') return (
      <div className="space-y-4">
        <Select label="Payout Method" value={s.payoutMethod} onChange={setN('payoutMethod')}
          options={[
            { value: 'bank_transfer', label: 'Bank Transfer' },
            { value: 'telebirr',      label: 'TeleBirr'      },
            { value: 'cbe_birr',      label: 'CBE Birr'      },
          ]} />
        {s.payoutMethod === 'bank_transfer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Bank Name" placeholder="e.g. Commercial Bank of Ethiopia" value={s.bankName} onChange={setN('bankName')} />
            <Input label="Account Number" placeholder="1000123456789" value={s.accountNumber} onChange={setN('accountNumber')} />
          </div>
        )}
        {s.payoutMethod !== 'bank_transfer' && (
          <Input label="Mobile Number" placeholder="+251 91 234 5678" />
        )}
        <div className="p-4 border" style={{ borderColor: 'var(--info)', background: 'var(--info-bg)', borderRadius: 'var(--r-md)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--info)' }}>Payout Schedule</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Payouts are processed within 3 business days after booking completion. Platform commission: 12%.</p>
        </div>
      </div>
    );

    if (tab === 'security') return (
      <div className="space-y-4">
        <Toggle label="Two-Factor Authentication" description="Add an extra layer of security to your account" checked={s.twoFactor} onChange={v => set('twoFactor', v)} />
        <div className="p-4 border" style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Change Password</p>
          <div className="space-y-3">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="Min. 8 characters" />
            <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage your owner preferences</p>
      </div>

      <div className="flex gap-5">
        <div className="w-44 flex-shrink-0 space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-all"
              style={{
                background:   tab === id ? 'rgba(139,92,246,0.1)' : 'transparent',
                color:        tab === id ? '#8b5cf6' : 'var(--text-muted)',
                borderRadius: 'var(--r-md)',
                textAlign:    'left',
              }}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0 border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              <h2 className="font-bold text-base mb-5" style={{ color: 'var(--text-primary)' }}>
                {TABS.find(t => t.id === tab)?.label}
              </h2>
              {renderTab()}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 pt-5 border-t flex justify-end" style={{ borderColor: 'var(--border-base)' }}>
            <Button onClick={handleSave} loading={saving} leftIcon={<Save className="w-4 h-4" />}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerSettingsPage;
