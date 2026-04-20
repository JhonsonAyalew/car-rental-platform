import React from 'react';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action,
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FEF3C7] text-[#D97706] mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-[#52525B] text-[15px] mb-6">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;
