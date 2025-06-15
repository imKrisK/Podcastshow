import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../components/PlayerContext';
import { RecentlyPlayedContext } from '../components/RecentlyPlayedContext';
import { QueueContext } from '../components/QueueContext';
import axios from 'axios';
import { useToast } from '../components/useToast';

const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search?media=podcast&term=';
const PAGE_SIZE = 20;

const PodcastList = () => {
  const [search, setSearch] = useState('react');
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { playPodcast, favorites, toggleFavorite } = useContext(PlayerContext);
  const { addRecentlyPlayed } = useContext(RecentlyPlayedContext);
  const { addToQueue } = useContext(QueueContext);
  const loader = useRef();
  const { showToast } = useToast();

  const fetchPodcasts = useCallback((reset = false) => {
    setLoading(true);
    setError(null);
    axios.get(`${ITUNES_SEARCH_URL}${encodeURIComponent(search)}&limit=${PAGE_SIZE}&offset=${reset ? 0 : offset}`)
      .then(res => {
        const results = res.data.results || [];
        setPodcasts(prev => reset ? results : [...prev, ...results]);
        setHasMore(results.length === PAGE_SIZE);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch podcasts.');
        showToast('Failed to fetch podcasts.', 'error');
        setLoading(false);
      });
  }, [search, offset, showToast]);

  useEffect(() => {
    setPodcasts([]);
    setOffset(0);
    setHasMore(true);
    fetchPodcasts(true);
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (offset === 0) return;
    fetchPodcasts();
    // eslint-disable-next-line
  }, [offset]);

  useEffect(() => {
    if (!hasMore || loading) return;
    const currentLoader = loader.current;
    const observer = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setOffset(prev => prev + PAGE_SIZE);
      }
    });
    if (currentLoader) observer.observe(currentLoader);
    return () => currentLoader && observer.unobserve(currentLoader);
  }, [hasMore, loading]);

  const handleFavorite = (podcast) => {
    toggleFavorite(podcast);
    const isFav = favorites.find(f => f.id === podcast.collectionId);
    showToast(isFav ? 'Removed from favorites' : 'Added to favorites', isFav ? 'info' : 'success');
  };

  const handlePlay = (podcast) => {
    playPodcast(podcast);
    addRecentlyPlayed(podcast);
  };

  return (
    <div>
      <div className="podcast-search-bar">
        <input
          type="text"
          placeholder="Search podcasts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="podcast-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="podcast-card skeleton" key={i} aria-hidden="true">
              <div className="skeleton skeleton-img" />
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-desc" />
            </div>
          ))}
        </div>
      ) : (
        <div className="podcast-list">
          {podcasts.map((podcast) => (
            <div className="podcast-card" key={podcast.collectionId}>
              <Link to={`/podcast/${podcast.collectionId}`}>
                <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
              </Link>
              <div className="podcast-card-title">{podcast.collectionName}</div>
              <div className="podcast-card-desc">{podcast.artistName}</div>
              <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                <button onClick={() => handlePlay({
                  id: podcast.collectionId,
                  title: podcast.collectionName,
                  audioUrl: podcast.feedUrl,
                  image: podcast.artworkUrl100
                })} style={{padding: '0.3rem 0.8rem'}}>Play</button>
                <button onClick={() => handleFavorite({
                  id: podcast.collectionId,
                  title: podcast.collectionName,
                  audioUrl: podcast.feedUrl,
                  image: podcast.artworkUrl100
                })} style={{padding: '0.3rem 0.8rem'}}>
                  {favorites.find(f => f.id === podcast.collectionId) ? '★' : '☆'}
                </button>
                <button onClick={() => addToQueue({
                  id: podcast.collectionId,
                  title: podcast.collectionName,
                  audioUrl: podcast.feedUrl,
                  image: podcast.artworkUrl100
                })} style={{padding: '0.3rem 0.8rem'}}>Queue</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <div style={{textAlign: 'center', color: 'red', marginTop: 40}}>{error}</div>}
      <div ref={loader} style={{height: 40}} />
      {!hasMore && !loading && podcasts.length > 0 && (
        <div style={{textAlign: 'center', color: '#888', margin: 24}}>No more podcasts.</div>
      )}
    </div>
  );
};

export default PodcastList;
