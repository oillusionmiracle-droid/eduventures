import React from 'react';

const Card = ({ children, className = '', variant = 'default', onClick, ...props }) => {
  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';
  
  const variants = {
    default: 'glass',
    elevated: 'glass-strong glow-teal',
    gradient: 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/10',
    flat: 'bg-white/[0.02] border border-dashed border-white/[0.08]'
  };
  
  const hoverStyles = onClick ? 'card-hover cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;
