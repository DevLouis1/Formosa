
import { JSX, useEffect, useRef } from 'react';
import './Intro.css'
import vector1 from '../assets/Vector 1.png'
import vector2 from '../assets/Vector 2.png'
import logo from '../assets/Group 2 (1).png'
import vector3 from '../assets/Vector 3.png'

export default function INTRO(): JSX.Element {
  const logoRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        logoRef.current.style.transform = `translate(${-50 + x * 20}%, ${-50 + y * 20}%) scale(1.05)`;
      }
    };

    const handleMouseLeave = () => {
      if (logoRef.current) {
        logoRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className='intro-container' ref={containerRef}>
      <img ref={logoRef} src={logo} alt="Background Logo" className='background-logo' />
      <img src={vector1} alt="Vector Design 1" className='vector-1' />
      <img src={vector2} alt="Vector Design 2" className='vector-2' />
      <img src={vector3} alt="Vector Design 3" className='vector-3' />
      <img src={vector3} alt="Vector Design 4" className='vector-4' />
      <div className='ellipse-design'/>
      <div className='IntroText'>
        <p>Imagine.</p>
        <p>We Make it Happen.</p>
        <p className='chinese-intro'>想像。我們助您實現夢想。</p>
      </div>
      <div className='text-background'/>
    </div>
  );
}