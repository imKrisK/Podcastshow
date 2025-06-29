
import React, { useState } from 'react';
import { PlayerContext } from './PlayerContextOnly.js';

export const PlayerProvider = ({ children }) => {
  const [nowPlaying, setNowPlaying] = useState(null); // { podcast, episode }
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
  });

  const playPodcast = (podcast) => setNowPlaying(podcast);

  const toggleFavorite = (podcast) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === podcast.id);
      let updated;
      if (exists) {
        updated = prev.filter((p) => p.id !== podcast.id);
      } else {
        updated = [...prev, podcast];
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PlayerContext.Provider value={{ nowPlaying, playPodcast, favorites, toggleFavorite }}>
      {children}
    </PlayerContext.Provider>
  );
};
