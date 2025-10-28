import './VisionMission.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function VisionMission() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section 
      id="vision-mission" 
      className="vision-mission-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`vision-mission-container ${isVisible ? 'animate' : ''}`}>
        <div className="vision-box">
          <h2>Our Vision</h2>
          <p>
            To be the leading creative force that transforms imagination into reality, 
            empowering brands to connect with their audience in meaningful and innovative ways.
          </p>
        </div>
        
        <div className="divider"></div>
        
        <div className="mission-box">
          <h2>Our Mission</h2>
          <p>
            We craft exceptional digital experiences through innovative design and strategic thinking. 
            Our mission is to bring your vision to life with creativity, precision, and passion.
          </p>
        </div>
      </div>
    </section>
  );
}
