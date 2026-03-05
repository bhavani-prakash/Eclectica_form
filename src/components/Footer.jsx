import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="fest-footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h2>ECE Department Fest 2026</h2>
          <p>
            Join us for innovation, creativity, and technical excellence.
            Experience workshops, competitions, and exciting technical events.
          </p>
          <a href="#committee" className="committee-btn">Meet the Committee</a>
        </div>

        <div className="footer-div">
          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="https://eclectica2k26-registration.netlify.app/">Register</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="footer-follow">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#instagram" target="_blank" rel="noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#linkedin" target="_blank" rel="noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#youtube" target="_blank" rel="noreferrer" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="footer-map">
          <h3>Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6391.753530288878!2d78.477809!3d13.629646!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2677c83886ad7%3A0xad73159e2bddda33!2sMadanapalle%20institute%20of%20technology%20and%20Sciences!5e1!3m2!1sen!2sin!4v1771146519075!5m2!1sen!2sin"
            width="300"
            height="200"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MITS Madanapalle Location"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="developed-by">
          <p style={{ marginLeft: '-50px' }}>Developed by :</p>
          <div style={{ marginLeft: '30px' }}>
            <p style={{ color: '#e9ec09', marginBottom: '10px' }}>
              <b>P.BHAVANI PRAKASH</b>
            </p>
            <a 
              href="https://www.linkedin.com/in/bhavani-prakash-579b13295" 
              target="_blank" 
              rel="noreferrer"
              title="LinkedIn Profile"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a 
              href="https://github.com/bhavani-prakash" 
              target="_blank" 
              rel="noreferrer"
              title="GitHub Profile"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <p>© 2026 ECE Department Fest</p>
      </div>
    </footer>
  );
};

export default Footer;
