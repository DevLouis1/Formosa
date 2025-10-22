import './Services.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const services = [
    {
      title: 'Logo Design',
      description: 'Craft unique brand identities that leave lasting impressions',
      icon: '✦'
    },
    {
      title: 'Website Design',
      description: 'Build responsive, modern websites that captivate and convert',
      icon: '⚡'
    },
    {
      title: 'Branding',
      description: 'Develop comprehensive brand strategies that resonate',
      icon: '◆'
    },
    {
      title: 'Digital Marketing',
      description: 'Amplify your reach with strategic digital campaigns',
      icon: '★'
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
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card ${isVisible ? 'animate' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
