import React, { useState } from 'react';
import { QueueContext } from './QueueContextOnly.js';

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);

  const addToQueue = (episode) => {
    setQueue(prev => [...prev, episode]);
  };

  const removeFromQueue = (index) => {
    setQueue(prev => prev.filter((_, i) => i !== index));
  };

  const clearQueue = () => setQueue([]);

  return (
    <QueueContext.Provider value={{ queue, addToQueue, removeFromQueue, clearQueue }}>
      {children}
    </QueueContext.Provider>
  );
};
