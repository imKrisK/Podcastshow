import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecentlyPlayedContext } from '../components/RecentlyPlayedContext';

const RecentlyPlayedSection = () => {
  const { recent } = useContext(RecentlyPlayedContext);
  if (!recent.length) return null;
  return (
    <div style={{margin: '2rem 0'}}>
      <h3 style={{marginBottom: 16}}>Recently Played</h3>
      <div className="podcast-list">
        {recent.map((podcast, i) => (
          <div className="podcast-card" key={podcast.id + podcast.title + i}>
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
            </Link>
            <div className="podcast-card-title">{podcast.title}</div>
            <div className="podcast-card-desc">{podcast.artistName || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayedSection;
