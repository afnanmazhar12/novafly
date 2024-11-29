import React from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './scrolltotop';

const Footer = () => {


  
  
  return (
    <div className="footcont">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section logo-description">
            <h2 className="footer-logo">
            <Logo/>
            </h2>
            <p id='footext'>
              We’re here to make it effortless and memorable. Start planning your
              trip today and let us take you where you need to go.
            </p>
            <div className="social-icons">
            <i id='logo1' class="fa-brands fa-instagram"></i>
            <i id='logo1' class="fa-brands fa-facebook"></i>
            <i id='logo1' class="fa-brands fa-twitter"></i>
            <i id='logo1' class="fa-brands fa-linkedin"></i>
            </div>
          </div>
          <div className="links">
            <h3>Quick Links</h3>
            <ul>
            <li><Link to="/">Home</Link></li> {/* Link to the homepage */}
        <li><Link to="/about">About Us</Link></li> {/* Link to About Us */}
        <li><Link to="/booking">Book Flight</Link></li> {/* Link to Book Flight */}
        <li><Link to="/testimonials">Testimonials</Link></li> {/* Link to Testimonials */}
            </ul>
          </div>
          <div className="touch">
            <h3>Get In Touch</h3>

            {/* <div className="icons">

            <i class="fa-solid fa-envelope"></i>
            <i class="fa-solid fa-phone"></i>
            <i class="fa-solid fa-location-dot"></i>
            </div> */}
                
            <p><i className="email-icon"></i> NovaFly@gmail.com</p>
            <p><i className="phone-icon"></i> +1 (800) 555-1234</p>
            <p><i className="address-icon"></i> NovaFly Airways Headquarters<br />
              456 Jetstream Avenue<br />
              San Francisco, CA 94128<br />
              United States
            </p>
          </div>
          <div className="newsletter">
            <h3>Newsletter Now</h3>
            <p>Subscribe to our newsletter!</p>
            <form>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
