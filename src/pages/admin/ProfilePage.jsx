import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { motion } from 'framer-motion';
import { Camera, Save, Mail, Phone, MapPin, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import { Avatar } from '../../components/ui/index.jsx';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { success }         = useNotification();
  const [saving, setSaving] = useState(false);
  const [form, setForm]     = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city:  user?.city  || 'Addis Ababa',
    bio:   user?.bio   || '',
  });

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
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage your admin account details</p>
      </div>

      <div className="border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <div className="relative">
            <Avatar name={form.name} size="xl" />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full border-2"
              style={{ background: 'var(--brand)', borderColor: 'var(--bg-elevated)' }}>
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{form.name || 'Admin User'}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Administrator · EquipRent Ethiopia</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} leftIcon={<User className="w-4 h-4" />} required />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} leftIcon={<Mail className="w-4 h-4" />} required />
            <Input label="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} leftIcon={<Phone className="w-4 h-4" />} />
            <Input label="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} leftIcon={<MapPin className="w-4 h-4" />} />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" loading={saving} leftIcon={<Save className="w-4 h-4" />}>Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
