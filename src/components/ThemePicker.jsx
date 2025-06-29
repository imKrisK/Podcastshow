import React, { useContext } from 'react';
import SettingsContext from '../components/SettingsContext';

const ACCENTS = [
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Pink', color: '#ec4899' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Amber', color: '#f59e42' },
  { name: 'Sky', color: '#0ea5e9' },
];

const ThemePicker = () => {
  const { accent, setAccent } = useContext(SettingsContext);
  return (
    <div style={{margin: '2rem 0'}}>
      <h3>Accent Color</h3>
      <div style={{display: 'flex', gap: 16}}>
        {ACCENTS.map(a => (
          <button
            key={a.name + '-' + a.color}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: accent === a.color ? '2px solid #222' : '1px solid #e5e7eb', background: a.color, cursor: 'pointer', outline: accent === a.color ? '2px solid #6366f1' : 'none'
            }}
            aria-label={a.name}
            onClick={() => setAccent(a.color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemePicker;
