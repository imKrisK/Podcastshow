import React, { useEffect, useState } from 'react';

const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [playbackRate, setPlaybackRate] = useState(() => {
    return Number(localStorage.getItem('playbackRate')) || 1;
  });
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('accent') || '#6366f1';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    localStorage.setItem('playbackRate', playbackRate);
  }, [playbackRate]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    localStorage.setItem('accent', accent);
  }, [accent]);

  return (
    <SettingsContext.Provider value={{ dark, setDark, playbackRate, setPlaybackRate, accent, setAccent }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
