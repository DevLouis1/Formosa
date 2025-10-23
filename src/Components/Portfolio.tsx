import './Portfolio.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import artboard1 from '../assets/Artboard 1@3x 1.png';
import artboard2 from '../assets/Artboard 1_1@3x 1.png';
import artboard3 from '../assets/Artboard 1_2@3x 1.png';
import artboard4 from '../assets/Artboard 1_3@3x 1.png';

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section 
      id="portfolio" 
      className="portfolio-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`portfolio-container ${isVisible ? 'animate' : ''}`}>
        <h2 className="portfolio-title">Portfolio</h2>
        <p className="portfolio-subtitle">作品集</p>
        
        <div className="portfolio-content">
          <div className="portfolio-item featured">
            <img src={artboard4} alt="Artboard 4" />
          </div>
          <div className="portfolio-item">
            <img src={artboard1} alt="Artboard 1" />
          </div>
          <div className="portfolio-item">
            <img src={artboard2} alt="Artboard 2" />
          </div>
          <div className="portfolio-item">
            <img src={artboard3} alt="Artboard 3" />
          </div>
        </div>
      </div>
    </section>
  );
}
