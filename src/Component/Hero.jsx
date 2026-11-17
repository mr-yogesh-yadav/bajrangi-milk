
import "./Hero.css";
import Reveal from "../Component/Reveal";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <Reveal>
          <span className="hero-tag">
            ✳ FRESH FROM OUR FARM
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1>
            Nature's Goodness,
            <span> Delivered Fresh.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p>
            Experience the purity of fresh cow and buffalo milk.
            Naturally sourced, carefully delivered to your doorstep
            every single day.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-buttons">
            <a href="#milk" className="hero-btn">
              Explore Our Milk <span>↗</span>
            </a>

            <a href="#story" className="hero-link">
              Discover Our Story →
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="hero-bottom">
            <div>
              <h3>100%</h3>
              <span>Fresh Milk</span>
            </div>

            <div>
              <h3>Daily</h3>
              <span>Home Delivery</span>
            </div>

            <div>
              <h3>Local</h3>
              <span>Jaipur Dairy</span>
            </div>
          </div>
        </Reveal>

      </div>

      <Reveal delay={200}>
        <div className="hero-image">

          <div className="hero-image-label">
            <span>PURE & NATURAL</span>
            <h3>From Farm<br />To Family.</h3>
          </div>

          <div className="hero-image-bottom">
            <span>BAJRANGI DAIRY</span>
            <span>EST. WITH CARE ✳</span>
          </div>

        </div>
      </Reveal>

      <div className="hero-number">
        01 / 05
      </div>

    </section>
  );
}

export default Hero;
