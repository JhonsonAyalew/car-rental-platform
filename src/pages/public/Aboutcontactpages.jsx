import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Users, HardHat, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.07, duration: 0.4, ease:[0.22,1,0.36,1] } }) };

export const AboutPage = () => (
  <div className="py-16 px-4">
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show"
          className="text-3xl sm:text-4xl font-black mb-4"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          About EquipRent Ethiopia
        </motion.h1>
        <motion.p variants={fadeUp} custom={1} initial="hidden" animate="show"
          className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We're building the infrastructure that connects Ethiopia's construction industry — making heavy equipment accessible to every builder, contractor, and developer across the country.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: HardHat, label: 'Machines Listed', val: '234+', color: 'var(--brand)' },
          { icon: Users,   label: 'Registered Users', val: '1,240+', color: '#8b5cf6' },
          { icon: Truck,   label: 'Equipment Owners', val: '67+', color: 'var(--success)' },
          { icon: TrendingUp, label: 'Total Bookings', val: '533+', color: 'var(--info)' },
        ].map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" animate="show"
            className="border p-5 text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <div className="w-10 h-10 flex items-center justify-center mx-auto mb-3" style={{ background: `${s.color}15`, borderRadius: 'var(--r-md)' }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.val}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Our Mission</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
            EquipRent was founded to solve a critical gap in Ethiopia's construction industry — the difficulty of accessing reliable, affordable heavy machinery for short-term projects.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We believe every contractor, no matter their size, should have access to the right equipment at the right time. By connecting equipment owners with renters, we're building a more efficient, transparent, and prosperous construction ecosystem.
          </p>
        </div>
        <div className="border p-8 text-center" style={{ background: 'var(--brand-muted)', borderColor: 'var(--brand-border)', borderRadius: 'var(--r-xl)' }}>
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--brand)', borderRadius: 'var(--r-xl)' }}>
            <Truck className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-black" style={{ color: 'var(--brand)', fontFamily: 'var(--font-display)' }}>
            "Building Ethiopia,<br />One Rental at a Time."
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const ContactPage = () => {
  const { success } = useNotification();
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    success('Message Sent!', "We'll get back to you within 24 hours.");
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Contact Us</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We're here to help. Send us a message and we'll respond quickly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Mail,    label: 'Email',   val: 'support@equiprent.et' },
              { icon: Phone,   label: 'Phone',   val: '+251 11 234 5678' },
              { icon: MapPin,  label: 'Address', val: 'Bole, Addis Ababa, Ethiopia' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="border p-4 flex items-center gap-3"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: 'var(--brand-muted)', borderRadius: 'var(--r-md)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--brand)' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-xl)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="Your name" value={form.name} onChange={set('name')} required />
                <Input label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
              </div>
              <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={set('subject')} required />
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Message <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea rows={5} value={form.message} onChange={set('message')} placeholder="Tell us more…" required
                  className="w-full px-4 py-3 text-sm border outline-none resize-none transition-all"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }} />
              </div>
              <Button type="submit" loading={loading} size="lg">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
