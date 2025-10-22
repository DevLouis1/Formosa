import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import INTRO from './Components/Intro';
import VisionMission from './Components/VisionMission';
import Services from './Components/Services';
import Portfolio from './Components/Portfolio';
import Contributors from './Components/Contributors';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds to enjoy the crazy animation

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
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
      <Contributors />
    </div>
  );
}

export default App;
