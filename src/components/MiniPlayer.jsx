import React, { useContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { PlayerContext } from './PlayerContextOnly.js';
import SettingsContext from './SettingsContext';
import 'react-h5-audio-player/lib/styles.css';

const MiniPlayer = () => {
  const { nowPlaying } = useContext(PlayerContext);
  const { playbackRate, dark } = useContext(SettingsContext);
  if (!nowPlaying) return null;
  return (
    <div className={`mini-player${dark ? ' dark' : ''}`}>
      <img src={nowPlaying.image} alt={nowPlaying.title} className="mini-player-img" />
      <div className="mini-player-info">
        <div className="mini-player-title">{nowPlaying.title}</div>
      </div>
      <AudioPlayer
        src={nowPlaying.audioUrl}
        autoPlay
        showJumpControls={false}
        customAdditionalControls={[]}
        style={{ background: 'transparent', boxShadow: 'none', flex: 1 }}
        playbackRate={playbackRate}
      />
    </div>
  );
};

export default MiniPlayer;
