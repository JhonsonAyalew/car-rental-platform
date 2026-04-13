import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  iconLeft,
  iconRight,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#D97706] text-white hover:bg-[#B45309]',
    secondary: 'bg-white text-[#D97706] border border-[#D97706] hover:bg-[#FEF3C7]',
    ghost: 'bg-transparent text-[#52525B] border border-[#E4E4E7] hover:bg-[#F3F2EE]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C]',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && iconLeft}
      {children}
      {!isLoading && iconRight}
    </button>
  );
};

export default Button;
