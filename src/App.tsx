import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import INTRO from './Components/Intro';
import VisionMission from './Components/VisionMission';
import Services from './Components/Services';
import Portfolio from './Components/Portfolio';
import Footer from './Components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove loading screen after fade completes
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 2.5s loading + 1s fade out

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
        <div className="spinner"></div>
        <p className="loading-text" data-text="IMAGINATING...">IMAGINATING...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation />
      <div id="intro">
        <INTRO />
      </div>
      <VisionMission />
      <Services />
  <Portfolio />
  <Footer />
    </div>
  );
}

export default App;
