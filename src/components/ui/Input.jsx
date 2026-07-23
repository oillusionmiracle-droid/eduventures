import React from 'react';

const Input = ({
  label,
  error,
  icon,
  textarea = false,
  className = '',
  required,
  ...props
}) => {
  const inputStyles = `
    w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-2.5 
    transition-all duration-200 outline-none font-sans
    focus:bg-white/[0.06] focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20
    placeholder:text-white/25
    ${icon ? 'pl-10' : ''}
    ${error ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : ''}
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          {label} {required && <span className="text-teal-400">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/30">
            {icon}
          </div>
        )}
        
        {textarea ? (
          <textarea className={inputStyles} {...props} />
        ) : (
          <input className={inputStyles} {...props} />
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-400 animate-slide-down">{error}</p>}
    </div>
  );
};

export default Input;
