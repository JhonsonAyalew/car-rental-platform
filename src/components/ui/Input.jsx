import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  rightAction,
  size = 'md',
  fullWidth = true,
  className = '',
  required,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

  const heights = { sm: 'h-8 text-sm', md: 'h-10 text-sm', lg: 'h-12 text-base' };
  const paddings = {
    sm: leftIcon ? 'pl-8  pr-3'  : rightIcon ? 'pl-3  pr-8'  : 'px-3',
    md: leftIcon ? 'pl-10 pr-4'  : rightIcon ? 'pl-4  pr-10' : 'px-4',
    lg: leftIcon ? 'pl-11 pr-5'  : rightIcon ? 'pl-5  pr-11' : 'px-5',
  };

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold"
          style={{ color: 'var(--text-secondary)' }}>
          {label}{required && <span style={{ color: 'var(--danger)' }} className="ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center"
            style={{ color: 'var(--text-muted)' }}>
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          {...props}
          className={[
            'w-full font-medium transition-all duration-150',
            'border rounded outline-none',
            'placeholder:text-[--text-faint]',
            heights[size],
            paddings[size],
            error
              ? 'border-[--danger] focus:ring-2 focus:ring-[--danger]/20'
              : 'border-[--border-base] focus:border-[--brand] focus:ring-2 focus:ring-[--brand-muted]',
            className,
          ].filter(Boolean).join(' ')}
          style={{
            background:  'var(--bg-elevated)',
            color:       'var(--text-primary)',
            borderRadius:'var(--r-md)',
          }}
        />

        {(rightIcon || rightAction) && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center"
            style={{ color: 'var(--text-muted)' }}>
            {rightAction || rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--danger)' }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
