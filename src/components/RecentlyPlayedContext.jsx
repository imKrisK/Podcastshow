import React, { createContext, useState, useEffect } from 'react';

export const RecentlyPlayedContext = createContext();

export const RecentlyPlayedProvider = ({ children }) => {
  const [recent, setRecent] = useState(() => {
    const data = localStorage.getItem('recentlyPlayed');
    return data ? JSON.parse(data) : [];
  });

  const addRecentlyPlayed = (podcast) => {
    setRecent(prev => {
      const exists = prev.find(p => p.id === podcast.id && p.title === podcast.title);
      let updated = exists ? prev : [podcast, ...prev];
      if (updated.length > 20) updated = updated.slice(0, 20);
      localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RecentlyPlayedContext.Provider value={{ recent, addRecentlyPlayed }}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
};
