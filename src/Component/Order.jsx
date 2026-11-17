
import { useState } from "react";
import "./Order.css";
import Reveal from "../Component/Reveal";
import { FaWhatsapp } from "react-icons/fa";

const MILK_PRICES = {
  Cow: 55,
  Buffalo: 75,
};

function Order() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    milkType: "Cow",
    quantity: "1",
    instructions: "",
  });

  const price = MILK_PRICES[form.milkType];
  const quantity = Number(form.quantity) || 0;
  const total = price * quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const cleanName = form.name.trim();
    const cleanAddress = form.address.trim();

    if (!/^[A-Za-z ]+$/.test(cleanName)) {
      alert("Please enter a valid name using letters only.");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!cleanAddress || quantity < 1 || quantity > 50) {
      alert("Please check your address and milk quantity.");
      return;
    }

    const message = `
Hello Bajrangi Dairy!

New Milk Order

Name: ${cleanName}
Phone: ${form.phone}
Address: ${cleanAddress}
Milk: ${form.milkType}
Quantity: ${quantity} Litre
Price per litre: ₹${price}
Total: ₹${total}
Instructions: ${form.instructions.trim() || "None"}
`;

    const whatsappURL =
      `https://wa.me/919571973691?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="order-section" id="order">

      <Reveal>
        <div className="order-heading">
          <span>✳ FRESH MILK, YOUR WAY</span>

          <h2>
            Place Your
            <span> Order.</span>
          </h2>

          <p>
            Fill in your details and get fresh milk delivered
            to your doorstep.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <form className="order-form" onSubmit={handleOrder}>

          <div className="order-fields">

            <div className="order-field">
              <label htmlFor="order-name">Full Name *</label>
              <input
                id="order-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                pattern="[A-Za-z ]+"
                maxLength="50"
                title="Only letters and spaces are allowed"
                required
              />
            </div>

            <div className="order-field">
              <label htmlFor="order-phone">Mobile Number *</label>
              <input
                id="order-phone"
                type="tel"
                name="phone"
                placeholder="Enter 10 digit number"
                value={form.phone}
                onChange={handleChange}
                pattern="[6-9][0-9]{9}"
                maxLength="10"
                title="Enter a valid 10-digit Indian mobile number"
                required
              />
            </div>

            <div className="order-field full-width">
              <label htmlFor="order-address">Delivery Address *</label>
              <textarea
                id="order-address"
                name="address"
                placeholder="Enter your complete address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="order-field">
              <label htmlFor="order-milk">Select Milk *</label>
              <select
                id="order-milk"
                name="milkType"
                value={form.milkType}
                onChange={handleChange}
                required
              >
                <option value="Cow">Cow Milk</option>
                <option value="Buffalo">Buffalo Milk</option>
              </select>
            </div>

            <div className="order-field">
              <label htmlFor="order-quantity">Quantity (Litres) *</label>
              <input
                id="order-quantity"
                type="number"
                name="quantity"
                min="1"
                max="50"
                step="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="order-field full-width">
              <label htmlFor="order-instructions">
                Special Instructions
              </label>
              <textarea
                id="order-instructions"
                name="instructions"
                placeholder="Any delivery instructions..."
                value={form.instructions}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="order-summary">

            <div>
              <span>Selected Milk</span>
              <h3>{form.milkType} Milk</h3>
            </div>

            <div>
              <span>Quantity</span>
              <h3>{quantity} Litre</h3>
            </div>

            <div>
              <span>Total Amount</span>
              <h3>
                {quantity === 0 ? "Select quantity" : `₹${total}`}
              </h3>
            </div>

          </div>

          <button type="submit" className="order-submit">
            <FaWhatsapp />
            Continue on WhatsApp
            <span>↗</span>
          </button>

          <p className="order-note">
            Your order details will be shared with Bajrangi Dairy on WhatsApp.
          </p>

        </form>
      </Reveal>

    </section>
  );
}

export default Order;
