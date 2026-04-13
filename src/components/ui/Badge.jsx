import React from 'react';

const Badge = ({ children, variant = 'pending', className = '' }) => {
  const variants = {
    pending: 'bg-[#FEF3C7] text-[#92400E]',
    approved: 'bg-[#DCFCE7] text-[#166534]',
    confirmed: 'bg-[#DCFCE7] text-[#166534]',
    rejected: 'bg-[#FEE2E2] text-[#991B1B]',
    declined: 'bg-[#FEE2E2] text-[#991B1B]',
    completed: 'bg-[#DBEAFE] text-[#1E40AF]',
    cancelled: 'bg-[#F4F4F5] text-[#71717A]',
    review: 'bg-[#F3E8FF] text-[#6B21A8]',
  };
  
  return (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium
      ${variants[variant] || variants.pending}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
