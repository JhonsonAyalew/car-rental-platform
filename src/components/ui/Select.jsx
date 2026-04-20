import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label, error, hint, options = [], placeholder,
  fullWidth = true, size = 'md', className = '', required, id, ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
  const heights = { sm: 'h-8 text-sm', md: 'h-10 text-sm', lg: 'h-12 text-base' };

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {label}{required && <span style={{ color: 'var(--danger)' }} className="ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref} id={selectId} {...props}
          className={[
            'w-full font-medium appearance-none px-4 pr-9 border outline-none transition-all duration-150 cursor-pointer',
            heights[size],
            error
              ? 'border-[--danger] focus:ring-2 focus:ring-[--danger]/20'
              : 'border-[--border-base] focus:border-[--brand] focus:ring-2 focus:ring-[--brand-muted]',
            className,
          ].filter(Boolean).join(' ')}
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', borderRadius: 'var(--r-md)' }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: 'var(--text-muted)' }} />
      </div>
      {error && <p className="text-xs" style={{ color: 'var(--danger)' }}>{error}</p>}
      {hint && !error && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
