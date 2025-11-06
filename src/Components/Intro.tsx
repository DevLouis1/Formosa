
import { JSX } from 'react';
import './Intro.css'
import rectangleBg from '../assets/Rectangle.png'
import glowLogo from '../assets/glow@3x 1.png'

export default function INTRO(): JSX.Element {

  return (
    <div className='intro-container'>
      {/* Background image */}
      <img src={rectangleBg} alt="Background" className='intro-background-image' />
      
      {/* FORMOSA scrolling text overlay */}
      <div className="formosa-text-background">
        <div className="formosa-horizontal-text">FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA</div>
        <div className="formosa-horizontal-text">FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA</div>
        <div className="formosa-horizontal-text">FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA</div>
        <div className="formosa-horizontal-text">FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA</div>
        <div className="formosa-horizontal-text">FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA FORMOSA</div>
      </div>
      
      {/* Logo */}
      <img src={glowLogo} alt="Formosa Logo" className='intro-logo' />
      
      <div className='IntroText'>
        <p>DEVELOP YOUR BUSINESS TO THE NEXT LEVEL</p>
        <p className='chinese-intro'>將您的業務提升到新的水平</p>
      </div>
    </div>
  );
}