
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },

    phone: {
      type: String,
      required: true,
      match: /^[6-9][0-9]{9}$/,
    },

    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 200,
    },

    milkType: {
      type: String,
      required: true,
      enum: ["Cow", "Buffalo"],
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number.",
      },
    },

    // Price per litre
    pricePerLitre: {
      type: Number,
      required: true,
      min: 0,
    },

    // Total order amount
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    instructions: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
