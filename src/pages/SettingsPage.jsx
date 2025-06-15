import React, { useContext } from 'react';
import SettingsContext from '../components/SettingsContext';
import ThemePicker from '../components/ThemePicker';

const SettingsPage = () => {
  const { dark, setDark, playbackRate, setPlaybackRate } = useContext(SettingsContext);
  return (
    <div style={{maxWidth: 400, margin: '2rem auto'}}>
      <h2>User Settings</h2>
      <div style={{marginBottom: 24}}>
        <label style={{fontWeight: 500}}>
          <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
          {' '}Enable dark mode
        </label>
      </div>
      <div style={{marginBottom: 24}}>
        <label style={{fontWeight: 500}}>
          Playback speed:{' '}
          <select value={playbackRate} onChange={e => setPlaybackRate(Number(e.target.value))}>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x (Normal)</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>
      <ThemePicker />
    </div>
  );
};

export default SettingsPage;
