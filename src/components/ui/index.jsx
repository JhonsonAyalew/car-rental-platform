/* ─────────────────────────────────────────────
   All small UI primitives in one file
   ───────────────────────────────────────────── */
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/* ── Card ───────────────────────────────────── */
export const Card = ({ children, className = '', padding = true, hover = false, onClick, ...props }) => (
  <div
    onClick={onClick}
    className={[
      'border transition-all duration-200',
      padding ? 'p-5' : '',
      hover ? 'hover:border-[--brand-border] hover:shadow-lg cursor-pointer' : '',
      onClick ? 'cursor-pointer' : '',
      className,
    ].filter(Boolean).join(' ')}
    style={{
      background:    'var(--bg-elevated)',
      borderColor:   'var(--border-base)',
      borderRadius:  'var(--r-lg)',
      boxShadow:     'var(--shadow-sm)',
    }}
    {...props}
  >
    {children}
  </div>
);

/* ── Badge ──────────────────────────────────── */
const badgeStyles = {
  default: { bg: 'var(--bg-overlay)', color: 'var(--text-secondary)', border: 'var(--border-base)' },
  brand:   { bg: 'var(--brand-muted)', color: 'var(--brand)', border: 'var(--brand-border)' },
  success: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'rgba(16,185,129,0.3)' },
  warning: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'rgba(245,158,11,0.3)' },
  danger:  { bg: 'var(--danger-bg)',  color: 'var(--danger)',  border: 'rgba(239,68,68,0.3)' },
  info:    { bg: 'var(--info-bg)',    color: 'var(--info)',    border: 'rgba(59,130,246,0.3)' },
  purple:  { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
};

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const s = badgeStyles[variant] ?? badgeStyles.default;
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span
      className={`inline-flex items-center font-bold border ${sizeClass} ${className}`}
      style={{ background: s.bg, color: s.color, borderColor: s.border, borderRadius: 'var(--r-sm)' }}
    >
      {children}
    </span>
  );
};

/* ── Status Badge ───────────────────────────── */
const statusMap = {
  confirmed:  'success',
  active:     'success',
  approved:   'success',
  pending:    'warning',
  review:     'info',
  rejected:   'danger',
  cancelled:  'danger',
  completed:  'brand',
  shipped:    'purple',
  inactive:   'default',
};

export const StatusBadge = ({ status }) => {
  const variant = statusMap[status?.toLowerCase()] ?? 'default';
  return <Badge variant={variant}>{status?.toUpperCase()}</Badge>;
};

/* ── Spinner ────────────────────────────────── */
const spinnerSizes = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8', xl: 'w-12 h-12' };

export const Spinner = ({ size = 'md', color, className = '' }) => (
  <div
    className={`${spinnerSizes[size] ?? spinnerSizes.md} border-2 rounded-full animate-spin flex-shrink-0 ${className}`}
    style={{
      borderColor:      color ? `${color}30` : 'var(--border-base)',
      borderTopColor:   color ?? 'var(--brand)',
    }}
  />
);

export default Spinner;

/* ── Skeleton ───────────────────────────────── */
const SkeletonBlock = ({ className = '', style = {} }) => (
  <div
    className={`relative overflow-hidden ${className}`}
    style={{ background: 'var(--bg-overlay)', borderRadius: 'var(--r-md)', ...style }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, var(--bg-hover) 50%, transparent 100%)',
        animation: 'shimmer 1.6s infinite',
      }}
    />
  </div>
);

export const Skeleton = {
  Block: SkeletonBlock,
  Text:  ({ lines = 3, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} className="h-4" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  ),
  Card:  ({ className = '' }) => (
    <div className={`p-5 border ${className}`}
      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-base)', borderRadius: 'var(--r-lg)' }}>
      <SkeletonBlock className="h-8 w-8 mb-4" style={{ borderRadius: '50%' }} />
      <SkeletonBlock className="h-7 w-1/2 mb-2" />
      <SkeletonBlock className="h-4 w-3/4" />
    </div>
  ),
};

/* ── Modal ──────────────────────────────────── */
export const Modal = ({ open, onClose, title, children, footer, size = 'md', closeOnBackdrop = true }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-6xl' };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.15s ease' }}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`w-full ${widths[size] ?? widths.md} flex flex-col max-h-[90vh]`}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--r-xl)',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeUp 0.2s cubic-bezier(0.22,1,0.36,1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-base)' }}>
            <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-colors hover:bg-[--bg-hover]"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && (
          <div className="p-5 border-t flex items-center justify-end gap-3" style={{ borderColor: 'var(--border-base)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── EmptyState ─────────────────────────────── */
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    {Icon && (
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4"
        style={{ background: 'var(--brand-muted)' }}>
        <Icon className="w-7 h-7" style={{ color: 'var(--brand)' }} />
      </div>
    )}
    <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
    {description && <p className="text-sm mb-5 max-w-xs" style={{ color: 'var(--text-muted)' }}>{description}</p>}
    {action}
  </div>
);

/* ── Avatar ─────────────────────────────────── */
export const Avatar = ({ name, src, size = 'md', className = '' }) => {
  const initials = name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
  const sizes = { xs: 'w-6 h-6 text-[10px]', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };

  if (src) return (
    <img src={src} alt={name} className={`rounded-full object-cover flex-shrink-0 ${sizes[size]} ${className}`} />
  );

  return (
    <div
      className={`flex items-center justify-center font-bold flex-shrink-0 rounded-full ${sizes[size]} ${className}`}
      style={{ background: 'var(--brand)', color: '#fff' }}
    >
      {initials}
    </div>
  );
};

/* ── Divider ────────────────────────────────── */
export const Divider = ({ label, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="flex-1 h-px" style={{ background: 'var(--border-base)' }} />
    {label && <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{label}</span>}
    {label && <div className="flex-1 h-px" style={{ background: 'var(--border-base)' }} />}
  </div>
);

/* ── Tooltip ────────────────────────────────── */
export const Tooltip = ({ children, text, position = 'top' }) => (
  <div className="relative group inline-flex">
    {children}
    <div
      className={`absolute z-50 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap pointer-events-none
        opacity-0 group-hover:opacity-100 transition-opacity duration-150
        ${position === 'top' ? 'bottom-full mb-1.5 left-1/2 -translate-x-1/2' : ''}
        ${position === 'bottom' ? 'top-full mt-1.5 left-1/2 -translate-x-1/2' : ''}
        ${position === 'left' ? 'right-full mr-1.5 top-1/2 -translate-y-1/2' : ''}
        ${position === 'right' ? 'left-full ml-1.5 top-1/2 -translate-y-1/2' : ''}
      `}
      style={{ background: 'var(--text-primary)', color: 'var(--bg-base)', borderRadius: 'var(--r-sm)' }}
    >
      {text}
    </div>
  </div>
);
