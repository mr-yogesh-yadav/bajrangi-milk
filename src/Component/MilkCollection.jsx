
import Reveal from "../Component/Reveal";
import "./MilkCollection.css";
import cowMilkImage from "../Component/images/cow-milk.webp"
import buffaloMilkImage from "../Component/images/buffalo-milk.webp"
const milkProducts = [
  {
    id: 1,
    name: "Cow Milk",
    subtitle: "Light, Fresh & Naturally Pure",
    description:
      "Enjoy fresh cow milk, carefully sourced for your family's everyday goodness.",
    type: "01 — FARM FRESH",
    image: cowMilkImage,
    className: "cow-product",
  },
  {
    id: 2,
    name: "Buffalo Milk",
    subtitle: "Rich, Creamy & Wholesome",
    description:
      "Rich and creamy buffalo milk, bringing traditional milk goodness to your home.",
    type: "02 — FARM FRESH",
    image: buffaloMilkImage,
    className: "buffalo-product",
  },
];

function MilkCollection() {
  return (
    <section className="milk-section" id="milk">

      <div className="milk-heading">
        <div>
          <Reveal>
            <span className="milk-tag">
              ✳ OUR COLLECTION
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2>
              Goodness in
              <span> Every Drop.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p>
            Discover our fresh Milk collection.
            Pure milk, delivered with care to your home.
          </p>
        </Reveal>
      </div>

      <div className="milk-grid">

        {milkProducts.map((product, index) => (
          <div
            className={`milk-card ${product.className}`}
            key={product.id}
          >
            <Reveal delay={index * 200}>
              <div className="milk-card-inner">

                <div className="milk-card-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />

                  <span className="milk-card-type">
                    {product.type}
                  </span>
                </div>

                <div className="milk-card-content">
                  <span>{product.subtitle}</span>

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <a
                    href={`https://wa.me/919571973691?text=${encodeURIComponent(
                      `Hello Bajrangi Dairy, I want to order ${product.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order Now <span>↗</span>
                  </a>
                </div>

              </div>
            </Reveal>
          </div>
        ))}

      </div>

      <Reveal>
        <div className="milk-bottom-text">
          <span>PURE MILK. HONEST CARE.</span>
          <span>MADE FOR EVERYDAY MOMENTS ✳</span>
        </div>
      </Reveal>

    </section>
  );
}

export default MilkCollection;
