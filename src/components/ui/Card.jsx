import React from 'react';

const Card = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-white rounded-xl shadow-soft p-5',
    info: 'bg-white rounded-xl shadow-soft p-5 border-l-4 border-[#D97706]',
    interactive: 'bg-white rounded-xl shadow-soft p-5 hover:shadow-medium transition-shadow cursor-pointer',
  };
  
  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
