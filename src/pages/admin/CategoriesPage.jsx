import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import { Modal, Badge } from '../../components/ui/index.jsx';
import ConfirmDialog from '../../components/feedback/ConfirmDialog';
import { useNotification } from '../../context/NotificationContext';

const INITIAL = [
  { id: 1, name: 'Excavator',   slug: 'excavator',   count: 45, icon: '⛏️' },
  { id: 2, name: 'Bulldozer',   slug: 'bulldozer',   count: 18, icon: '🚜' },
  { id: 3, name: 'Crane',       slug: 'crane',        count: 12, icon: '🏗️' },
  { id: 4, name: 'Loader',      slug: 'loader',       count: 32, icon: '🚛' },
  { id: 5, name: 'Truck',       slug: 'truck',        count: 89, icon: '🚚' },
  { id: 6, name: 'Water Truck', slug: 'water_truck',  count: 14, icon: '💧' },
  { id: 7, name: 'Grader',      slug: 'grader',       count: 9,  icon: '🛣️' },
  { id: 8, name: 'Compactor',   slug: 'compactor',    count: 7,  icon: '🔩' },
];

const CategoriesPage = () => {
  const { success } = useNotification();
  const [cats, setCats]         = useState(INITIAL);
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState({ name: '', slug: '', icon: '' });
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);

  const openAdd  = () => { setEditing(null); setForm({ name: '', slug: '', icon: '' }); setModal(true); };
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, slug: c.slug, icon: c.icon }); setModal(true); };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    if (editing) {
      setCats(cs => cs.map(c => c.id === editing.id ? { ...c, ...form } : c));
      success('Updated', `Category "${form.name}" updated`);
    } else {
      setCats(cs => [...cs, { id: Date.now(), ...form, count: 0 }]);
      success('Added', `Category "${form.name}" created`);
    }
    setModal(false);
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await new Promise(r => setTimeout(r, 700));
    setCats(cs => cs.filter(c => c.id !== deleteId));
    success('Deleted', 'Category removed');
    setDeleteId(null);
    setDeleting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Categories</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage equipment categories</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={openAdd}>Add Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cats.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="border p-5 group transition-all duration-200"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-border)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-base)'}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl">{cat.icon}</div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-muted)'; e.currentTarget.style.color = 'var(--brand)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteId(cat.id)} className="w-7 h-7 flex items-center justify-center rounded transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-bg)'; e.currentTarget.style.color = 'var(--danger)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{cat.name}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{cat.count} machines</p>
            <p className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-faint)' }}>{cat.slug}</p>
          </motion.div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Category' : 'Add Category'} size="sm"
        footer={<><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button onClick={handleSave} loading={saving}>Save</Button></>}>
        <div className="space-y-3">
          <Input label="Category Name" placeholder="e.g. Excavator" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <Input label="Slug" placeholder="e.g. excavator" value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '_') }))} />
          <Input label="Icon (emoji)" placeholder="e.g. ⛏️" value={form.icon}
            onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting}
        title="Delete Category?" message="This will remove the category. Equipment using it won't be affected." />
    </div>
  );
};

export default CategoriesPage;
