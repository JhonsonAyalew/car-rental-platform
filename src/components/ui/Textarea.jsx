import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label, error, hint, fullWidth = true, className = '', required, id, rows = 4, ...props
}, ref) => {
  const taId = id || `ta-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={taId} className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {label}{required && <span style={{ color: 'var(--danger)' }} className="ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref} id={taId} rows={rows} {...props}
        className={[
          'w-full px-4 py-3 text-sm font-medium border outline-none resize-y transition-all duration-150',
          'placeholder:text-[--text-faint]',
          error
            ? 'border-[--danger] focus:ring-2 focus:ring-[--danger]/20'
            : 'border-[--border-base] focus:border-[--brand] focus:ring-2 focus:ring-[--brand-muted]',
          className,
        ].filter(Boolean).join(' ')}
        style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }}
      />
      {error && <p className="text-xs" style={{ color: 'var(--danger)' }}>{error}</p>}
      {hint && !error && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
