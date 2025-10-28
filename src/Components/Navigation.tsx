import { useState, useEffect } from 'react';
import './Navigation.css';
import formosaLogo from '../assets/formosa-logo.png';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navigation ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={scrollToTop}>
          <img src={formosaLogo} alt="Formosa" />
        </div>
        
        <div className="nav-links">
          <button onClick={() => scrollToSection('vision-mission')}>Vision & Mission</button>
          <button onClick={() => scrollToSection('services')}>Services</button>
          <button onClick={() => scrollToSection('portfolio')}>Portfolio</button>
          <button onClick={() => scrollToSection('contributors')}>Contributors</button>
        </div>
      </div>
    </nav>
  );
}
