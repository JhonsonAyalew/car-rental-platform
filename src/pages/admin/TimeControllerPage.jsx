import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Timer, Clock, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Badge, Modal } from '../../components/ui/index.jsx';
import { useNotification } from '../../context/NotificationContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const INITIAL_SLOTS = [
  { id: 1, name: 'Morning Shift',   start: '06:00', end: '12:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], active: true },
  { id: 2, name: 'Afternoon Shift', start: '12:00', end: '18:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], active: true },
  { id: 3, name: 'Full Day',        start: '06:00', end: '20:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], active: true },
  { id: 4, name: 'Weekend Half',    start: '08:00', end: '14:00', days: ['Saturday', 'Sunday'], active: false },
  { id: 5, name: 'Weekly Rental',   start: '06:00', end: '20:00', days: DAYS, active: true },
];

const TimeControllerPage = () => {
  const { success } = useNotification();
  const [slots, setSlots]   = useState(INITIAL_SLOTS);
  const [modal, setModal]   = useState(false);
  const [newSlot, setNewSlot] = useState({ name: '', start: '08:00', end: '17:00', days: [] });
  const [saving, setSaving] = useState(false);

  const toggleDay = (day) => {
    setNewSlot(s => ({
      ...s,
      days: s.days.includes(day) ? s.days.filter(d => d !== day) : [...s.days, day],
    }));
  };

  const handleAdd = async () => {
    if (!newSlot.name || newSlot.days.length === 0) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSlots(s => [...s, { ...newSlot, id: Date.now(), active: true }]);
    success('Time Slot Added', `"${newSlot.name}" is now available.`);
    setModal(false);
    setNewSlot({ name: '', start: '08:00', end: '17:00', days: [] });
    setSaving(false);
  };

  const toggleActive = (id) => {
    setSlots(s => s.map(sl => sl.id === id ? { ...sl, active: !sl.active } : sl));
    success('Updated', 'Slot availability changed');
  };

  const deleteSlot = (id) => {
    setSlots(s => s.filter(sl => sl.id !== id));
    success('Deleted', 'Time slot removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Time Controller</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage available booking time slots platform-wide</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setModal(true)}>Add Time Slot</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Slots', val: slots.length, color: 'var(--brand)' },
          { label: 'Active', val: slots.filter(s => s.active).length, color: 'var(--success)' },
          { label: 'Inactive', val: slots.filter(s => !s.active).length, color: 'var(--text-muted)' },
        ].map(s => (
          <div key={s.label} className="p-4 border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.val}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Slots grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {slots.map((slot, i) => (
          <motion.div key={slot.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="border p-5 transition-all duration-200"
            style={{
              background:   'var(--bg-elevated)',
              borderColor:  slot.active ? 'var(--brand-border)' : 'var(--border-base)',
              borderRadius: 'var(--r-lg)',
              opacity:      slot.active ? 1 : 0.65,
            }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{slot.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="w-3.5 h-3.5" style={{ color: 'var(--brand)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--brand)' }}>{slot.start} – {slot.end}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleActive(slot.id)}
                  className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                  style={{ color: slot.active ? 'var(--success)' : 'var(--text-muted)' }}
                  title={slot.active ? 'Deactivate' : 'Activate'}>
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button onClick={() => deleteSlot(slot.id)}
                  className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = 'var(--danger-bg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Days */}
            <div className="flex flex-wrap gap-1">
              {DAYS.map(day => (
                <span key={day}
                  className="text-[10px] font-bold px-1.5 py-0.5"
                  style={{
                    background:   slot.days.includes(day) ? 'var(--brand-muted)' : 'var(--bg-overlay)',
                    color:        slot.days.includes(day) ? 'var(--brand)' : 'var(--text-faint)',
                    borderRadius: 'var(--r-sm)',
                  }}>
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-faint)' }}>
              <Badge variant={slot.active ? 'success' : 'default'}>
                {slot.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Add Time Slot" size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={handleAdd} loading={saving} disabled={!newSlot.name || !newSlot.days.length}>
              Add Slot
            </Button>
          </>
        }>
        <div className="space-y-4">
          <Input label="Slot Name" placeholder="e.g. Morning Shift" value={newSlot.name}
            onChange={e => setNewSlot(s => ({ ...s, name: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Time" type="time" value={newSlot.start} onChange={e => setNewSlot(s => ({ ...s, start: e.target.value }))} />
            <Input label="End Time"   type="time" value={newSlot.end}   onChange={e => setNewSlot(s => ({ ...s, end: e.target.value }))} />
          </div>
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Available Days</p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(day => (
                <button key={day} type="button" onClick={() => toggleDay(day)}
                  className="px-2.5 py-1.5 text-xs font-bold border transition-all"
                  style={{
                    background:   newSlot.days.includes(day) ? 'var(--brand)' : 'transparent',
                    borderColor:  newSlot.days.includes(day) ? 'var(--brand)' : 'var(--border-base)',
                    color:        newSlot.days.includes(day) ? '#fff' : 'var(--text-muted)',
                    borderRadius: 'var(--r-sm)',
                  }}>
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TimeControllerPage;
