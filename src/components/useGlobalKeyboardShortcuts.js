import { useEffect } from 'react';

export function useGlobalKeyboardShortcuts({ onPlayPause, onNext, onPrev, onNavHome, onNavFavorites }) {
  useEffect(() => {
    function handler(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); onPlayPause && onPlayPause(); }
      if (e.code === 'ArrowRight') { onNext && onNext(); }
      if (e.code === 'ArrowLeft') { onPrev && onPrev(); }
      if (e.key === 'h') { onNavHome && onNavHome(); }
      if (e.key === 'f') { onNavFavorites && onNavFavorites(); }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onPlayPause, onNext, onPrev, onNavHome, onNavFavorites]);
}
