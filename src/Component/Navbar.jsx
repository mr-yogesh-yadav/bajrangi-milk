
import { useState } from "react";
import "./Navbar.css";

import { FaWhatsapp, FaBars, FaXmark } from "react-icons/fa6";
import { GiMilkCarton } from "react-icons/gi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <a href="#home" className="nav-logo" onClick={closeMenu}>
        <div className="logo-icon">
          <GiMilkCarton />
        </div>

        <div className="logo-text">
          <h2>Bajrangi</h2>
          <span>PURE MILK FARM</span>
        </div>
      </a>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#milk" onClick={closeMenu}>Our Milk</a>
        <a href="#story" onClick={closeMenu}>Our Story</a>
        <a href="#delivery" onClick={closeMenu}>Delivery</a>
        <a href="#order" onClick={closeMenu}>Order Now</a>
      </div>

      <a
 href="https://wa.me/919571973691?text=Hello%20Bajrangi%20milk%2C%20I%20want%20to%20know%20about%20daily%20milk%20delivery."
  target="_blank"
  rel="noopener noreferrer"
  className="nav-order"
  aria-label="Order milk on WhatsApp"
>
  <FaWhatsapp />
  Order Milk
</a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaXmark /> : <FaBars />}
      </button>

    </nav>
  );
}

export default Navbar;
