import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  fullWidth = false,
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-[10px] active:scale-[0.97] focus:outline-none';
  
  const variants = {
    primary: 'bg-teal-500 text-black hover:bg-teal-400 shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30',
    secondary: 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.15]',
    danger: 'bg-red-500/80 text-white hover:bg-red-500 shadow-lg shadow-red-500/15',
    ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/[0.05]',
    gradient: 'bg-gradient-to-r from-teal-500 to-emerald-400 text-black shadow-lg shadow-teal-500/25 hover:shadow-teal-400/35 hover:brightness-110'
  };
  
  const sizes = {
    sm: 'text-sm px-3.5 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5'
  };

  const width = fullWidth ? 'w-full' : '';
  const opacity = disabled || loading ? 'opacity-40 cursor-not-allowed' : '';

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${opacity} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
