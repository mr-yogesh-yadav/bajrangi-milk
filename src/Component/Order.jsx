import { useState, useEffect } from "react";
import { IoSend, IoCheckmarkCircle } from "react-icons/io5";
import "./Order.css";
import Reveal from "../Component/Reveal";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    type: "",
    text: "",
  });

  const price = MILK_PRICES[form.milkType];
  const quantity = Number(form.quantity) || 0;
  const total = price * quantity;
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [showSuccess]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z ]/g, "");
    }

    if (name === "phone") {
      updatedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    }

    if (name === "quantity") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitMessage({
      type: "",
      text: "",
    });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const cleanName = form.name.trim();
    const cleanAddress = form.address.trim();
    const cleanInstructions = form.instructions.trim();

    const newErrors = {};

    if (!/^[A-Za-z ]{4,50}$/.test(cleanName)) {
      newErrors.name = "Name must contain 4-50 letters.";
    }

    if (!/^[6-9][0-9]{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!cleanAddress) {
      newErrors.address = "Please enter your delivery address.";
    } else if (cleanAddress.length < 10 || cleanAddress.length > 200) {
      newErrors.address = "Address must be between 10 and 200 characters.";
    }

    if (cleanInstructions.length > 0 && cleanInstructions.length < 5) {
      newErrors.instructions =
        "Instructions must contain at least 5 characters.";
    }

    if (quantity < 1 || quantity > 50 || !Number.isInteger(quantity)) {
      newErrors.quantity = "Quantity must be between 1 and 50 litres.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    setSubmitMessage({
      type: "",
      text: "",
    });

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          phone: form.phone,
          address: cleanAddress,
          milkType: form.milkType,
          quantity,
          instructions: cleanInstructions,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Order could not be placed.");
      }

      setShowSuccess(true);

      setForm({
        name: "",
        phone: "",
        address: "",
        milkType: "Cow",
        quantity: "1",
        instructions: "",
      });

      setErrors({});
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error.message === "Failed to fetch"
            ? "Server connection failed. Please try again."
            : error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
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
            Fill in your details and get fresh milk delivered to your doorstep.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
  {showSuccess ? (
    <div className="order-success">
      <IoCheckmarkCircle className="success-icon" />

      <h2>Congratulations!</h2>

      <p>Your Order Has Been Placed Successfully.</p>

      <span>
        Thank you for choosing Bajrangi Milk.
        Your fresh milk order is received.
      </span>
    </div>
  ) : (
    <form className="order-form" onSubmit={handleOrder} noValidate>
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
                maxLength={50}
                required
              />

              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
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
                inputMode="numeric"
                maxLength={10}
                required
              />

              {errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>

            <div className="order-field full-width">
              <label htmlFor="order-address">Delivery Address *</label>

              <textarea
                id="order-address"
                name="address"
                placeholder="Enter your complete address"
                value={form.address}
                onChange={handleChange}
                minLength={10}
                maxLength={200}
                required
              />

              {errors.address && (
                <span className="field-error">{errors.address}</span>
              )}
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
                type="text"
                name="quantity"
                placeholder="Enter quantity"
                inputMode="numeric"
                value={form.quantity}
                onChange={handleChange}
                required
              />

              {errors.quantity && (
                <span className="field-error">{errors.quantity}</span>
              )}
            </div>

            <div className="order-field full-width">
              <label htmlFor="order-instructions">Special Instructions</label>

              <textarea
                id="order-instructions"
                name="instructions"
                placeholder="Any delivery instructions..."
                value={form.instructions}
                onChange={handleChange}
                minLength={5}
                maxLength={150}
              />

              {errors.instructions && (
                <span className="field-error">{errors.instructions}</span>
              )}
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
              <h3>₹{total}</h3>
            </div>
          </div>

          <button
            type="submit"
            className="order-submit"
            disabled={isSubmitting}
          >
            <IoSend />
            {isSubmitting ? "Placing Order..." : "Order Now"}
            {!isSubmitting && <span>↗</span>}
          </button>

          {submitMessage.text && (
            <p
              className={`order-response ${submitMessage.type}`}
              role="status"
              aria-live="polite"
            >
              {submitMessage.text}
            </p>
          )}

          <p className="order-note">
            Your order details will be securely submitted to Bajrangi Milk.
          </p>
            </form>
  )}
</Reveal>
    </section>
  );
}

export default Order;
