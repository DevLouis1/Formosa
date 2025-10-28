import './Portfolio.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import artboard1 from '../assets/Artboard 1@3x 1.png';
import artboard2 from '../assets/Artboard 1_1@3x 1.png';
import artboard3 from '../assets/Artboard 1_2@3x 1.png';
import artboard4 from '../assets/Artboard 1_3@3x 1.png';
import group4 from '../assets/Group 4 (1).png';
import kanvasaCup from '../assets/Cup & Business Card Kanvasa (1) 1.png';
import kanvasaCard from '../assets/kanvasa Business card 1.png';
import kanvasaSign from '../assets/Kanvasa Sign Store 1.png';

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
          <div className="portfolio-item kanvasa-item">
            <img src={kanvasaCup} alt="Kanvasa Cup & Business Card" />
          </div>
          <div className="portfolio-item kanvasa-item">
            <img src={kanvasaCard} alt="Kanvasa Business Card" />
          </div>
          <div className="portfolio-item kanvasa-item">
            <img src={kanvasaSign} alt="Kanvasa Sign Store" />
          </div>
        </div>

        {/* Photography Full-Width Section */}
        <div className="photography-full-section">
          <div className="photography-text-background">
            <div className="horizontal-text">PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY</div>
            <div className="horizontal-text">PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY</div>
            <div className="horizontal-text">PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY</div>
            <div className="horizontal-text">PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY</div>
            <div className="horizontal-text">PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY PHOTOGRAPHY</div>
          </div>
          <img src={group4} alt="Photography" className="photography-image" />
        </div>
      </div>
    </section>
  );
}
