import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

const Modal = ({ open, onClose, children }) => {
  const ref = useRef();
  useEffect(() => {
    if (!open) return;
    const modalNode = ref.current;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    function onTouchStart(e) {
      modalNode._touchStartY = e.touches[0].clientY;
    }
    function onTouchEnd(e) {
      if (modalNode._touchStartY && e.changedTouches[0].clientY - modalNode._touchStartY > 80) onClose();
    }
    window.addEventListener('keydown', onKey);
    modalNode && modalNode.addEventListener('touchstart', onTouchStart);
    modalNode && modalNode.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('keydown', onKey);
      modalNode && modalNode.removeEventListener('touchstart', onTouchStart);
      modalNode && modalNode.removeEventListener('touchend', onTouchEnd);
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(30,41,59,0.45)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            ref={ref}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 8px 32px rgba(30,41,59,0.18)', position: 'relative' }}
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {children}
            <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} aria-label="Close">×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
