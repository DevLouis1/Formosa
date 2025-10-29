import React, { useCallback, useRef } from 'react';
import './VisionHelp.css';

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

  return (
    <section
      className="vision-help-section"
      id="vision-mission"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="vh-bg" aria-hidden />

      <div className="vh-inner container">
        <header className="vh-header">
          <h2 className="vh-super">Vision • Mission</h2>
          <p className="vh-kicker">Bold ideas. Clear execution. Real impact.</p>
        </header>

        <div className="vh-panels">
          <article className="vh-panel vh-vision">
            <h3>Our Vision</h3>
            <p>
              Craft unforgettable brand stories that glow in culture — merging design, content,
              and motion to move people emotionally and commercially.
            </p>
          </article>

          <article className="vh-panel vh-mission">
            <h3>Our Mission</h3>
            <p>
              Partner with founders and teams to turn ambitious ideas into polished realities —
              fast, collaborative, and relentlessly creative.
            </p>
          </article>
        </div>

        <div className="vh-divider" />

        <section className="vh-help" id="services" aria-label="How we can help">
          <header className="vh-help-head">
            <h3>How we can help</h3>
            <p>From concept to launch — and the glow that follows.</p>
          </header>

          <div className="vh-cards">
            <div className="vh-card">
              <div className="vh-card-title">Brand & Identity</div>
              <ul>
                <li>Naming, voice, and strategy</li>
                <li>Logo systems and guidelines</li>
                <li>Art direction and styleframes</li>
              </ul>
            </div>

            <div className="vh-card">
              <div className="vh-card-title">Web & Product</div>
              <ul>
                <li>UX flows and prototypes</li>
                <li>Websites with performance</li>
                <li>Design systems and docs</li>
              </ul>
            </div>

            <div className="vh-card">
              <div className="vh-card-title">Content & Campaigns</div>
              <ul>
                <li>Photo/video production</li>
                <li>Social kits and templates</li>
                <li>Launch creative and ads</li>
              </ul>
            </div>

            <div className="vh-card">
              <div className="vh-card-title">Motion & 3D</div>
              <ul>
                <li>Micro-interactions</li>
                <li>Animated explainers</li>
                <li>3D visuals and renders</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default VisionHelp;
