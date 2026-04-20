import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/index.jsx';
import Button from '../ui/Button.jsx';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) => (
  <Modal open={open} onClose={onClose} size="sm">
    <div className="flex flex-col items-center text-center gap-4 py-2">
      <div className="w-12 h-12 flex items-center justify-center rounded-full"
        style={{ background: variant === 'danger' ? 'var(--danger-bg)' : 'var(--warning-bg)' }}>
        <AlertTriangle className="w-6 h-6" style={{ color: variant === 'danger' ? 'var(--danger)' : 'var(--warning)' }} />
      </div>
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{message}</p>
      </div>
      <div className="flex gap-3 w-full">
        <Button variant="secondary" fullWidth onClick={onClose} disabled={loading}>{cancelLabel}</Button>
        <Button variant={variant} fullWidth onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
