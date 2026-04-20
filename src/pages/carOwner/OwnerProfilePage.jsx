import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { motion } from 'framer-motion';
import { Camera, Save, Mail, Phone, MapPin, User, Building2 } from 'lucide-react';
import Button   from '../../components/ui/Button';
import Input    from '../../components/ui/Input';
import Select   from '../../components/ui/Select';
import { Avatar } from '../../components/ui/index.jsx';

const CITIES = ['Addis Ababa','Dire Dawa','Adama','Hawassa','Bahir Dar','Mekelle'].map(c => ({ value: c, label: c }));

const OwnerProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { success }         = useNotification();
  const [saving, setSaving] = useState(false);
  const [form, setForm]     = useState({
    name:        user?.name        || '',
    email:       user?.email       || '',
    phone:       user?.phone       || '',
    city:        user?.city        || '',
    companyName: user?.companyName || '',
    bio:         user?.bio         || '',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser(form);
    success('Profile Updated', 'Your owner profile has been saved.');
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>My Profile</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage your owner account and public profile</p>
      </div>

      <div className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <div className="relative">
            <Avatar name={form.name} size="xl" />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full border-2"
              style={{ background: '#8b5cf6', borderColor: 'var(--bg-elevated)' }}>
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{form.name || 'Equipment Owner'}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Equipment Owner · EquipRent Ethiopia</p>
            {form.companyName && <p className="text-xs mt-0.5" style={{ color: '#8b5cf6' }}>{form.companyName}</p>}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={set('name')} leftIcon={<User className="w-4 h-4" />} required />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} leftIcon={<Mail className="w-4 h-4" />} required />
            <Input label="Phone" value={form.phone} onChange={set('phone')} leftIcon={<Phone className="w-4 h-4" />} />
            <Select label="City" options={CITIES} value={form.city} onChange={set('city')} placeholder="Select city" />
            <div className="sm:col-span-2">
              <Input label="Company / Business Name" value={form.companyName} onChange={set('companyName')} leftIcon={<Building2 className="w-4 h-4" />} hint="Shown on your public listings" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Bio</label>
              <textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Tell customers about yourself and your equipment…"
                className="w-full px-4 py-3 text-sm border outline-none resize-none transition-all"
                style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }} />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" loading={saving} leftIcon={<Save className="w-4 h-4" />}>Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
