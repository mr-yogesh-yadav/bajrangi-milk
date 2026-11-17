
import { useEffect, useState } from "react";
import "./Footer.css";
import Reveal from "../Component/Reveal";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaArrowUp
} from "react-icons/fa";

function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 200);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand-wrapper">
          <Reveal>
            <div className="footer-brand">
              <h2>Bajrangi<span>.</span></h2>

              <p>
                Freshness you can trust.
                Bringing pure dairy goodness
                closer to every family.
              </p>

              <a
                href="https://wa.me/919571973691"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp"
              >
                <FaWhatsapp />
                Connect on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <div className="footer-column-wrapper">
          <Reveal delay={100}>
            <div className="footer-links">
              <h3>EXPLORE</h3>
              <a href="#home">Home</a>
              <a href="#milk">Our Milk</a>
              <a href="#story">Our Story</a>
              <a href="#delivery">Delivery</a>
            </div>
          </Reveal>
        </div>

        <div className="footer-column-wrapper">
          <Reveal delay={200}>
            <div className="footer-links">
              <h3>OUR PRODUCTS</h3>
              <a href="#milk">Cow Milk</a>
              <a href="#milk">Buffalo Milk</a>
              <a href="#delivery">Daily Delivery</a>
              <a href="#order">Order Now</a>
            </div>
          </Reveal>
        </div>

        <div className="footer-column-wrapper">
          <Reveal delay={300}>
            <div className="footer-contact">
              <h3>GET IN TOUCH</h3>

              <p>Jaipur, Rajasthan, India</p>

              <a href="tel:+919571973691">
                +91 95719 73691
              </a>

              <div className="footer-socials">
                <a
                  href="https://wa.me/919571973691"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      <Reveal>
        <div className="footer-middle">
          <h2>PURE MILK. PURE TRUST.</h2>
          <span>✳ FRESHNESS EVERY DAY ✳</span>
        </div>
      </Reveal>

      <div className="footer-bottom">

        <p>© 2026 Bajrangi Dairy. All Rights Reserved.</p>

        <p>Made with care for every family.</p>

        {showTopBtn && (
          <a
            href="#home"
            className="footer-top-btn"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </a>
        )}

      </div>

    </footer>
  );
}

export default Footer;
