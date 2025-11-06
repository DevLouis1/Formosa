
import { JSX } from 'react';
import './Intro.css'
import rectangleBg from '../assets/Rectangle.png'

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
      
      <div className='IntroText'>
        <p>Imagine.</p>
        <p>We Make it Happen.</p>
        <p className='chinese-intro'>想像。我們助您實現夢想。</p>
      </div>
    </div>
  );
}