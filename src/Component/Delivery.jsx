
import "./Delivery.css";
import Reveal from "../Component/Reveal";
import milkDeliveryImage from "../Component/images/Milk-dilevery.webp"
import {
  FaTruckFast,
  FaClock,
  FaHouse,
  FaWhatsapp
} from "react-icons/fa6";

const benefits = [
  {
    icon: <FaTruckFast />,
    title: "Doorstep Delivery",
    text: "Fresh milk delivered directly to your home."
  },
  {
    icon: <FaClock />,
    title: "Daily Freshness",
    text: "Enjoy fresh milk for your everyday needs."
  },
  {
    icon: <FaHouse />,
    title: "Made for Families",
    text: "Convenient milk delivery for your home."
  }
];

function Delivery() {
  return (
    <section className="delivery-section" id="delivery">

      <div className="delivery-main">

        <div className="delivery-content-wrapper">
          <Reveal>
            <div className="delivery-content">

              <span className="delivery-tag">
                ✳ FRESHNESS AT YOUR DOORSTEP
              </span>

              <h2>
                Your Daily Milk,
                <span> Made Simple.</span>
              </h2>

              <p>
                Start every morning with fresh milk goodness.
                Order your favourite milk from Bajrangi milk
                and get it delivered to your doorstep.
              </p>

              <a
                href="https://wa.me/919571973691?text=Hello%20Bajrangi%20milk%2C%20I%20want%20to%20know%20about%20daily%20milk%20delivery."
                target="_blank"
                rel="noopener noreferrer"
                className="delivery-button"
              >
                <FaWhatsapp />
                Order on WhatsApp
                <span>↗</span>
              </a>

              <div className="delivery-location">
                <span>📍</span>
                Currently serving Jaipur
              </div>

            </div>
          </Reveal>
        </div>

        <div className="delivery-image-wrapper">
          <Reveal delay={200}>
            <div className="delivery-image">
              <img
                src={milkDeliveryImage}
                alt="Fresh milk delivery"
                loading="lazy"
              />

              <div className="delivery-image-note">
                FRESHNESS, EVERY MORNING ✳
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      <div className="delivery-benefits">

        {benefits.map((item, index) => (
          <div className="delivery-benefit-wrapper" key={index}>
            <Reveal delay={index * 150}>
              <div className="delivery-benefit">

                <div className="benefit-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

              </div>
            </Reveal>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Delivery;
