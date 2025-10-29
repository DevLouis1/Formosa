import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="contact-hint" aria-label="Contact hint">
      <div className="contact-hint__inner">
        <span className="contact-hint__label">Want to collaborate?</span>
        <a className="contact-hint__link" href="mailto:contact@example.com" rel="noopener noreferrer">
          Contact us
        </a>
      </div>
    </footer>
  );
}
