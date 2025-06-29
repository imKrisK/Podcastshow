import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../components/PlayerContextOnly';

const FavoritesPage = () => {
  const { favorites, playPodcast, toggleFavorite } = useContext(PlayerContext);
  return (
    <div>
      <h2>Favorites</h2>
      <div className="podcast-list">
        {favorites.length === 0 ? (
          <div style={{textAlign: 'center', color: '#888', marginTop: 40}}>No favorites yet.</div>
        ) : (
          favorites.map((podcast) => (
            <div className="podcast-card" key={podcast.id}>
              <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.image} alt={podcast.title} />
              </Link>
              <div className="podcast-card-title">{podcast.title}</div>
              <div className="podcast-card-desc">{podcast.artistName || ''}</div>
              <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                <button onClick={() => playPodcast(podcast)} style={{padding: '0.3rem 0.8rem'}}>Play</button>
                <button onClick={() => toggleFavorite(podcast)} style={{padding: '0.3rem 0.8rem'}}>
                  {favorites.find(f => f.id === podcast.id) ? '★' : '☆'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
