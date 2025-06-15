import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PodcastList from './pages/PodcastList';
import PodcastDetail from './pages/PodcastDetail';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import MiniPlayer from './components/MiniPlayer';
import SettingsContext from './components/SettingsContext';
import { useGlobalKeyboardShortcuts } from './components/useGlobalKeyboardShortcuts';
import OnboardingModal from './components/OnboardingModal';
import RecentlyPlayedSection from './components/RecentlyPlayedSection';
import QueueBar from './components/QueueBar';
import { showDemoNotification } from './components/notifications';
import BackToTop from './components/BackToTop';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.25 }}
        style={{ height: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<PodcastList />} />
          <Route path="/podcast/:id" element={<PodcastDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const { dark } = React.useContext(SettingsContext);
  const navigate = useNavigate();
  useGlobalKeyboardShortcuts({
    onPlayPause: () => {
      // Try to play/pause the mini player
      const audio = document.querySelector('.mini-player audio');
      if (audio) audio.paused ? audio.play() : audio.pause();
    },
    onNext: null, // Could be implemented for playlist/queue
    onPrev: null,
    onNavHome: () => navigate('/'),
    onNavFavorites: () => navigate('/favorites'),
  });

  useEffect(() => {
    // Demo: notify on first load
    if (window.Notification && Notification.permission !== 'denied') {
      setTimeout(() => {
        showDemoNotification('Welcome!', 'Thanks for using Podcast Streaming.');
      }, 2000);
    }
    // Register service worker for offline/push
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <div className={`app-layout${dark ? ' dark' : ''}`}> {/* Add dark mode class */}
      <OnboardingModal />
      <nav className={`app-navbar${dark ? ' dark' : ''}`} role="navigation" aria-label="Main navigation">
        <Link to="/">
          <span role="img" aria-label="logo">🎧</span> Podcast Streaming
        </Link>
        <Link to="/favorites" style={{marginLeft: 'auto', fontSize: 18}}>★ Favorites</Link>
        <Link to="/settings" style={{marginLeft: 24, fontSize: 18}}>⚙️ Settings</Link>
      </nav>
      <div className="app-main">
        <aside className={`app-sidebar${dark ? ' dark' : ''}`}>
          {/* Sidebar content: categories, links, etc. */}
          <div className="sidebar-title">Categories</div>
          <ul className="sidebar-list">
            <li>All</li>
            <li>Tech</li>
            <li>Frontend</li>
            <li>React</li>
          </ul>
        </aside>
        <main id="main-content" className={`app-content${dark ? ' dark' : ''}`} style={{ position: 'relative', minHeight: 400 }} role="main" aria-label="Main content">
          <a href="#main-content" className="skip-link">Skip to content</a>
          <RecentlyPlayedSection />
          <AnimatedRoutes />
        </main>
      </div>
      <MiniPlayer />
      <QueueBar />
      <BackToTop />
      <footer className={dark ? 'dark' : ''}> an imacKris production
        &copy; {new Date().getFullYear()} Podcast Streaming App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
