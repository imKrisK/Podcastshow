import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ONBOARD_KEY = 'onboarded';

const OnboardingModal = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(ONBOARD_KEY)) setOpen(true);
  }, []);
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(ONBOARD_KEY, '1');
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <h2>Welcome to Podcast Streaming!</h2>
      <ul style={{fontSize: 15, margin: '1rem 0 1.5rem 0'}}>
        <li>🎧 Browse and play real podcasts</li>
        <li>★ Favorite podcasts for quick access</li>
        <li>⚡ Use keyboard shortcuts: <b>Space</b> (play/pause), <b>h</b> (home), <b>f</b> (favorites)</li>
        <li>🌙 Toggle dark mode and playback speed in settings</li>
        <li>🔗 Share episodes with friends</li>
      </ul>
      <button onClick={handleClose} style={{padding: '0.5rem 1.2rem'}}>Get Started</button>
    </Modal>
  );
};

export default OnboardingModal;
