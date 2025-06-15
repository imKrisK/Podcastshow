import React, { useContext } from 'react';
import { QueueContext } from '../components/QueueContext';
import { PlayerContext } from '../components/PlayerContext';

const QueueBar = () => {
  const { queue, removeFromQueue, clearQueue } = useContext(QueueContext);
  const { playPodcast } = useContext(PlayerContext);
  if (!queue.length) return null;
  return (
    <div style={{position: 'fixed', bottom: 60, left: 0, right: 0, background: '#fff', borderTop: '1px solid #e5e7eb', zIndex: 100, boxShadow: '0 -2px 12px rgba(30,41,59,0.10)', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto'}}>
      <span style={{fontWeight: 600}}>Up Next:</span>
      {queue.map((ep, i) => (
        <span key={ep.id + ep.title + i} style={{display: 'flex', alignItems: 'center', gap: 4}}>
          <button onClick={() => playPodcast(ep)} style={{padding: '0.2rem 0.7rem', fontSize: 14}}>{ep.title}</button>
          <button onClick={() => removeFromQueue(i)} aria-label="Remove from queue" style={{background: 'none', border: 'none', color: '#ef4444', fontSize: 18, cursor: 'pointer'}}>×</button>
        </span>
      ))}
      <button onClick={clearQueue} style={{marginLeft: 'auto', fontSize: 14}}>Clear</button>
    </div>
  );
};

export default QueueBar;
