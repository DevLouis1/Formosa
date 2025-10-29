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
import Carousel from './Carousel';

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
        
        <Carousel
          images={[
            { src: artboard4, alt: 'Artboard 4' },
            { src: artboard1, alt: 'Artboard 1' },
            { src: artboard2, alt: 'Artboard 2' },
            { src: artboard3, alt: 'Artboard 3' },
            { src: kanvasaCup, alt: 'Kanvasa Cup & Business Card', kind: 'kanvasa' },
            { src: kanvasaCard, alt: 'Kanvasa Business Card', kind: 'kanvasa' },
            { src: kanvasaSign, alt: 'Kanvasa Sign Store', kind: 'kanvasa' },
          ]}
          className="portfolio-carousel"
          autoplay
          intervalMs={3600}
          pauseOnHover
        />

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
