import React, { useState, useCallback } from 'react';
import { ToastContext } from './ToastContextOnly.js';

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <>
          <div className={`toast toast-${toast.type}`}>{toast.message}</div>
          <div aria-live="polite">{toast.message}</div>
        </>
      )}
    </ToastContext.Provider>
  );
};

// Moved useToast to its own file for fast refresh compatibility
