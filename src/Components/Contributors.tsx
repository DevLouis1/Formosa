import './Contributors.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contributors() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section 
      id="contributors" 
      className="contributors-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`contributors-container ${isVisible ? 'animate' : ''}`}>
        <h2 className="contributors-title">Contributors</h2>
        <p className="contributors-subtitle">團隊成員</p>
        
        <div className="contributors-content">
          <p className="coming-soon">Meet our creative team soon...</p>
          <p className="description">
            Our talented team of designers, developers, and strategists 
            work together to bring your vision to life.
          </p>
        </div>
      </div>
    </section>
  );
}
