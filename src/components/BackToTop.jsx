import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        right: 18,
        bottom: 90,
        zIndex: 9999,
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 24,
        padding: '0.7rem 1.3rem',
        fontSize: 18,
        boxShadow: '0 2px 8px rgba(30,41,59,0.12)',
        cursor: 'pointer',
      }}
      aria-label="Back to top"
    >↑ Top</button>
  );
};

export default BackToTop;
