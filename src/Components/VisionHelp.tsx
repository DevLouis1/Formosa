import React, { useCallback, useEffect, useRef } from 'react';
import './VisionHelp.css';
import visionImg from '../assets/vision.png';
import missionImg from '../assets/mission.png';
import websiteDesignImg from '../assets/website design.png';
import mediaSocialImg from '../assets/media social design.png';
import brandDevImg from '../assets/brand development.png';
import photographyImg from '../assets/photograhy.png';

const VisionHelp: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    el.style.setProperty('--mx', x.toString());
    el.style.setProperty('--my', y.toString());
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const toReveal = Array.from(
      root.querySelectorAll<HTMLElement>('.vh-reveal')
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    toReveal.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="vision-help-section"
      id="vision-mission"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="vh-bg" aria-hidden />

      <div className="vh-inner container">
        <header className="vh-header vh-reveal">
          <div className="vh-aurora" aria-hidden />
          <h2 className="vh-super">Vision • Mission</h2>
          <p className="vh-kicker">Bold ideas. Clear execution. Real impact.</p>
        </header>
        <div className="vh-divider2" >
        <img src={visionImg} alt="Vision" className="vh-panel-image vh-vision vh-reveal" />
        <img src={missionImg} alt="Mission" className="vh-panel-image vh-mission vh-reveal" />
       </div>
        <section className="vh-help" id="services" aria-label="How we can help">
          <header className="vh-help-head vh-reveal">
            <h3>How we can help</h3>
            <p>From concept to launch — and the glow that follows.</p>
          </header>

          <div className="vh-cards">
            <div className="vh-card vh-reveal" style={{ backgroundImage: `url("${websiteDesignImg}")` }}>
              <div className="vh-card-surface">
                <div className="vh-card-title">Website Design</div>
                <div className="vh-card-subtitle zh">網站設計</div>
              </div>
            </div>

            <div className="vh-card vh-reveal" style={{ backgroundImage: `url("${mediaSocialImg}")` }}>
              <div className="vh-card-surface">
                <div className="vh-card-title">Media Social Design</div>
                <div className="vh-card-subtitle zh">媒體社群設計</div>
              </div>
            </div>

            <div className="vh-card vh-reveal" style={{ backgroundImage: `url("${brandDevImg}")` }}>
              <div className="vh-card-surface">
                <div className="vh-card-title">Brand Development</div>
                <div className="vh-card-subtitle zh">品牌發展</div>
              </div>
            </div>

            <div className="vh-card vh-reveal" style={{backgroundImage:`url(${photographyImg})`}}>
              <div className="vh-card-surface">
                <div className="vh-card-title">Photography</div>
                <div className="vh-card-subtitle zh">攝影</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default VisionHelp;
