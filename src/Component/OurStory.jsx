
import "./OurStory.css";
import Reveal from "../Component/Reveal";
import milkFarmImage from "../Component/images/dairy-farm.webp"
function OurStory() {
  return (
    <section className="story-section" id="story">

      <Reveal>
        <div className="story-top">
          <span>✳ THE BAJRANGI PROMISE</span>
          <span>OUR STORY — 03</span>
        </div>
      </Reveal>

      <div className="story-layout">

        <div className="story-image-wrapper">
          <Reveal>
            <div className="story-image">
              <img
                src={milkFarmImage}
                alt="Bajrangi dairy farm"
                loading="lazy"
              />

              <div className="story-image-note">
                <span>OUR ROOTS</span>
                <h3>Nature is<br />our inspiration.</h3>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="story-content-wrapper">
          <Reveal delay={200}>
            <div className="story-content">

              <span className="story-label">
                A LITTLE ABOUT US
              </span>

              <h2>
                More Than Milk,
                <span> It's a Promise.</span>
              </h2>

              <p>
                At Bajrangi Dairy, we believe that good milk
                begins with care. Our goal is to bring fresh
                cow and buffalo milk straight to your doorstep.
              </p>

              <p>
                We value freshness, quality and the trust
                of every family we serve. Every delivery
                is a commitment to bringing dairy goodness
                closer to your home.
              </p>

              <a href="#delivery" className="story-button">
                Know Our Delivery <span>↗</span>
              </a>

              <div className="story-signature">
                <span>BAJRANGI DAIRY</span>
                <p>Freshness You Can Trust.</p>
              </div>

            </div>
          </Reveal>
        </div>

      </div>

      <Reveal delay={150}>
        <div className="story-bottom">
          <h3>GOODNESS GROWN WITH CARE.</h3>
          <span>ROOTED IN TRUST ✳</span>
        </div>
      </Reveal>

    </section>
  );
}

export default OurStory;
