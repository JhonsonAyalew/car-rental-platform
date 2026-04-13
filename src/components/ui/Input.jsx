import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  required,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[13px] font-medium text-[#1A1A1A] mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-3 py-2.5 bg-[#F3F2EE] border rounded-lg text-[15px] text-[#1A1A1A]
          placeholder:text-[#A1A1AA] transition-all duration-200
          focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10
          ${error ? 'border-red-500' : 'border-[#E4E4E7]'}
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-[12px] mt-1.5">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
