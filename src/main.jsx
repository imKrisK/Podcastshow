import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PlayerProvider } from './components/PlayerContext';
import { SettingsProvider } from './components/SettingsContext';
import { ToastProvider } from './components/ToastContext';
import { RecentlyPlayedProvider } from './components/RecentlyPlayedContext';
import { QueueProvider } from './components/QueueContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <SettingsProvider>
        <RecentlyPlayedProvider>
          <QueueProvider>
            <Router>
              <PlayerProvider>
                <App />
              </PlayerProvider>
            </Router>
          </QueueProvider>
        </RecentlyPlayedProvider>
      </SettingsProvider>
    </ToastProvider>
  </React.StrictMode>
);
