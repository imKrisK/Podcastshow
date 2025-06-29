import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from 'axios';
import { fetchAndParseRSS } from '../components/rssUtils';
import { PlayerContext } from '../components/PlayerContextOnly';
import { RecentlyPlayedContext } from '../components/RecentlyPlayedContextOnly';
import { QueueContext } from '../components/QueueContextOnly';
import Modal from '../components/Modal';
import Comments from '../components/Comments';

const PodcastDetail = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playPodcast } = useContext(PlayerContext);
  const { addRecentlyPlayed } = useContext(RecentlyPlayedContext);
  const { addToQueue } = useContext(QueueContext);
  const [modalEp, setModalEp] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`https://itunes.apple.com/lookup?id=${id}`)
      .then(async res => {
        const pod = res.data.results[0];
        setPodcast(pod);
        if (pod.feedUrl) {
          try {
            const eps = await fetchAndParseRSS(pod.feedUrl);
            setEpisodes(eps);
          } catch {
            setEpisodes([]);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch podcast details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="spinner" role="status" aria-label="Loading" />;
  if (error) return <div className="podcast-detail">{error}</div>;
  if (!podcast) return <div className="podcast-detail">Podcast not found.</div>;

  return (
    <div className="podcast-detail">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: 16, color: '#1e293b', textDecoration: 'none' }}>&larr; Back</Link>
      <img src={podcast.artworkUrl600 || podcast.artworkUrl100} alt={podcast.collectionName} />
      <div className="podcast-detail-title">{podcast.collectionName}</div>
      <div className="podcast-detail-desc">{podcast.artistName}</div>
      <div style={{marginTop: 16, color: '#888', fontSize: 14}}>
        <a href={podcast.collectionViewUrl} target="_blank" rel="noopener noreferrer">View on iTunes</a>
      </div>
      <h3 style={{marginTop: 32}}>Episodes</h3>
      {episodes.length === 0 ? (
        <div style={{color: '#888', fontSize: 14}}>No episodes found or failed to load RSS feed.</div>
      ) : (
        <ul style={{listStyle: 'none', padding: 0, width: '100%'}}>
          {episodes.map((ep, i) => (
            <li key={(ep.guid || ep.audioUrl) + '-' + i} style={{marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16}}>
              <div style={{fontWeight: 600, marginBottom: 4}}>{ep.title}</div>
              <div style={{fontSize: 13, color: '#888', marginBottom: 6}}>{ep.pubDate && new Date(ep.pubDate).toLocaleDateString()}</div>
              <div style={{fontSize: 14, marginBottom: 8, cursor: 'pointer', color: '#6366f1', textDecoration: 'underline'}} onClick={() => setModalEp(ep)} tabIndex={0} role="button" aria-label="Show episode details" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalEp(ep); }}>Show details</div>
              <button onClick={() => {
                playPodcast({
                  id: podcast.collectionId,
                  title: ep.title,
                  audioUrl: ep.audioUrl,
                  image: podcast.artworkUrl100
                });
                addRecentlyPlayed({
                  id: podcast.collectionId,
                  title: ep.title,
                  audioUrl: ep.audioUrl,
                  image: podcast.artworkUrl100
                });
              }} style={{padding: '0.3rem 0.8rem'}}>Play</button>
              <button onClick={() => addToQueue({
                id: podcast.collectionId,
                title: ep.title,
                audioUrl: ep.audioUrl,
                image: podcast.artworkUrl100
              })} style={{padding: '0.3rem 0.8rem'}}>Queue</button>
              <a href={ep.audioUrl} download style={{padding: '0.3rem 0.8rem', marginLeft: 4, textDecoration: 'none', border: '1px solid #e5e7eb', borderRadius: 8, background: '#f3f4f6', color: '#222', fontSize: 15}}>Download</a>
              <button onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: ep.title,
                    text: `Listen to this episode: ${ep.title}`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }} style={{padding: '0.3rem 0.8rem'}}>Share</button>
            </li>
          ))}
        </ul>
      )}
      <Modal open={!!modalEp} onClose={() => setModalEp(null)}>
        {modalEp && (
          <div>
            <h4 style={{marginTop: 0}}>{modalEp.title}</h4>
            <div style={{fontSize: 13, color: '#888', marginBottom: 8}}>{modalEp.pubDate && new Date(modalEp.pubDate).toLocaleDateString()}</div>
            <div style={{fontSize: 15, marginBottom: 12}} dangerouslySetInnerHTML={{__html: modalEp.description}} />
            <button onClick={() => {
              playPodcast({
                id: podcast.collectionId,
                title: modalEp.title,
                audioUrl: modalEp.audioUrl,
                image: podcast.artworkUrl100
              });
              setModalEp(null);
            }} style={{padding: '0.3rem 0.8rem'}}>Play Episode</button>
            <Comments episodeId={modalEp.guid || modalEp.audioUrl} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PodcastDetail;
