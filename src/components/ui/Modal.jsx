import React, { useEffect } from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmVariant = 'primary', children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative glass-strong rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in z-10">
        <h3 className="text-xl font-display font-bold text-white mb-2">{title}</h3>
        {message && <p className="text-white/50 mb-6">{message}</p>}
        {children}
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
