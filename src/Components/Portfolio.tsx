import './Portfolio.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
          <p className="coming-soon">Our amazing projects coming soon...</p>
          <p className="description">
            We're currently curating our best work to showcase here. 
            Stay tuned for inspiring designs and creative solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
