import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const icons = {
  success: { Icon: CheckCircle, color: 'var(--success)' },
  error:   { Icon: XCircle,     color: 'var(--danger)' },
  warning: { Icon: AlertTriangle,color: 'var(--warning)' },
  info:    { Icon: Info,        color: 'var(--info)' },
};

const Toast = ({ id, type = 'info', title, message }) => {
  const { dismiss } = useNotification();
  const { Icon, color } = icons[type] ?? icons.info;

  return (
    <div
      className="flex items-start gap-3 p-4 mb-2 w-80 border"
      style={{
        background:    'var(--bg-elevated)',
        borderColor:   'var(--border-base)',
        borderRadius:  'var(--r-lg)',
        boxShadow:     'var(--shadow-lg)',
        animation:     'slideInRight 0.25s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        {title   && <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</p>}
        {message && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{message}</p>}
      </div>
      <button
        onClick={() => dismiss(id)}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded transition-colors hover:bg-[--bg-hover]"
        style={{ color: 'var(--text-muted)' }}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const { notifications } = useNotification();
  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col">
      {notifications.map(n => <Toast key={n.id} {...n} />)}
    </div>
  );
};
