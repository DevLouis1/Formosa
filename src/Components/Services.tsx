import './Services.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const services = [
    {
      title: 'Website Design',
      titleZh: '網站設計',
      icon: '✦',
    },
    {
      title: 'Media Social Design',
      titleZh: '媒體社群設計',
      icon: '⚡',
    },
    {
      title: 'Brand Development',
      titleZh: '品牌發展',
      icon: '◆',
    },
    {
      title: 'Photography',
      titleZh: '攝影',
      icon: '★',
    }
  ];

  return (
    <section 
      id="services" 
      className="services-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`services-container ${isVisible ? 'animate' : ''}`}>
        <h2 className="services-title">How Can We Help</h2>
        <p className="services-subtitle">我們能如何幫助您</p>
        
        <div className="services-grid">
          {services.map((service, index) => {
            const alt = index % 2 === 1; // alternate order
            return (
              <div
                key={index}
                className={`service-card ${isVisible ? 'animate' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon">{service.icon}</div>
                <div className="service-titles">
                  {alt ? (
                    <>
                      <h3 className="service-title-zh primary">{service.titleZh}</h3>
                      <div className="service-title-en secondary">{service.title}</div>
                    </>
                  ) : (
                    <>
                      <h3 className="service-title-en primary">{service.title}</h3>
                      <div className="service-title-zh secondary">{service.titleZh}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
