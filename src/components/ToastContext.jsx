import React, { createContext, useState, useCallback, useContext } from 'react';

export const ToastContext = createContext();

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

export const useToast = () => useContext(ToastContext);
