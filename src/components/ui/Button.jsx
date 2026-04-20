import React from 'react';
import Spinner from './Spinner';

const variants = {
  primary:   'bg-[--brand] hover:bg-[--brand-light] text-white border-transparent',
  secondary: 'bg-[--bg-overlay] hover:bg-[--bg-hover] text-[--text-primary] border-[--border-base]',
  outline:   'bg-transparent hover:bg-[--bg-overlay] text-[--brand] border-[--brand-border]',
  ghost:     'bg-transparent hover:bg-[--bg-hover] text-[--text-secondary] border-transparent',
  danger:    'bg-[--danger] hover:opacity-90 text-white border-transparent',
  success:   'bg-[--success] hover:opacity-90 text-white border-transparent',
};

const sizes = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
  xl: 'px-6 py-3 text-base gap-2.5',
};

const Button = ({
  children,
  variant = 'primary',
  size    = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center font-semibold border transition-all duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'select-none rounded',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-[0.98]',
        className,
      ].filter(Boolean).join(' ')}
      style={{ borderRadius: 'var(--r-md)' }}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" color="currentColor" />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
