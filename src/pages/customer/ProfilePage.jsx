import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Camera, Save, Mail, Phone, MapPin, User } from 'lucide-react';
import Button   from '../../components/ui/Button';
import Input    from '../../components/ui/Input';
import Select   from '../../components/ui/Select';
import { Avatar } from '../../components/ui/index.jsx';

const CITIES = ['Addis Ababa','Dire Dawa','Adama','Hawassa','Bahir Dar','Mekelle'].map(c => ({ value: c, label: c }));

const CustomerProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { success }         = useNotification();
  const [saving, setSaving] = useState(false);
  const [form, setForm]     = useState({ name: user?.name||'', email: user?.email||'', phone: user?.phone||'', city: user?.city||'' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser(form);
    success('Profile Updated', 'Your profile has been saved.');
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>My Profile</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage your account details</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[['8', 'Total Bookings'],['2', 'Active'],['ETB 184k', 'Total Spent']].map(([v, l]) => (
          <div key={l} className="p-4 border text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-xl font-black" style={{ color: 'var(--brand)' }}>{v}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{l}</p>
          </div>
        ))}
      </div>

      <div className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <div className="relative">
            <Avatar name={form.name} size="xl" />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full border-2"
              style={{ background: 'var(--brand)', borderColor: 'var(--bg-elevated)' }}>
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{form.name || 'Customer'}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Customer · EquipRent Ethiopia</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={set('name')} leftIcon={<User className="w-4 h-4" />} required />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} leftIcon={<Mail className="w-4 h-4" />} required />
            <Input label="Phone" value={form.phone} onChange={set('phone')} leftIcon={<Phone className="w-4 h-4" />} />
            <Select label="City" options={CITIES} value={form.city} onChange={set('city')} placeholder="Select city" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" loading={saving} leftIcon={<Save className="w-4 h-4" />}>Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
