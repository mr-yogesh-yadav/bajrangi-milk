const Settings = require("./models/Settings");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");
const Order = require("./models/Order");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bajrangi-milk.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());
app.use("/api/admin", adminRoutes);
// Test API
app.get("/", (req, res) => {
  res.send("Bajrangi Milk Backend is Running!");
});
// GET: Public milk prices for customer order form
app.get("/api/prices", async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Milk prices are not configured yet.",
      });
    }

    res.status(200).json({
      success: true,
      prices: {
        Cow: settings.cowPrice,
        Buffalo: settings.buffaloPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch milk prices.",
    });
  }
});
// Create New Order
app.post("/api/orders", async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      milkType,
      quantity,
      instructions
    } = req.body;

    // Required fields validation
    if (
      !name ||
      !phone ||
      !address ||
      !milkType ||
      quantity === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // Name validation
    if (!/^[A-Za-z ]{4,50}$/.test(name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer name."
      });
    }

    // Phone validation
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number."
      });
    }

    // Address validation
    if (address.trim().length < 10 || address.trim().length > 200) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery address."
      });
    }

    // Milk type validation
    if (!["Cow", "Buffalo"].includes(milkType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid milk type."
      });
    }

    // Quantity validation
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be between 1 and 50 litres."
      });
    }

    // Instructions validation
    if (
      typeof instructions !== "undefined" &&
      (typeof instructions !== "string" ||
        instructions.trim().length > 150)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid instructions."
      });
    }

    // Save order in MongoDB
// Get latest milk prices from MongoDB
const settings = await Settings.findOne();

if (!settings) {
  return res.status(503).json({
    success: false,
    message: "Milk prices are not configured yet.",
  });
}

// Calculate price on the server
const pricePerLitre =
  milkType === "Cow"
    ? settings.cowPrice
    : settings.buffaloPrice;

if (
  typeof pricePerLitre !== "number" ||
  !Number.isFinite(pricePerLitre) ||
  pricePerLitre < 0
) {
  return res.status(503).json({
    success: false,
    message: "Milk price is currently unavailable.",
  });
}

const totalAmount = Number(
  (pricePerLitre * quantity).toFixed(2)
);

// Save order in MongoDB
const newOrder = await Order.create({
  name: name.trim(),
  phone,
  address: address.trim(),
  milkType,
  quantity,
  pricePerLitre,
  totalAmount,
  instructions: instructions?.trim() || "",
});

return res.status(201).json({
  success: true,
  message: "Order placed successfully!",
  order: {
    id: newOrder._id,
    status: newOrder.status,
    milkType: newOrder.milkType,
    quantity: newOrder.quantity,
    pricePerLitre: newOrder.pricePerLitre,
    totalAmount: newOrder.totalAmount,
  },
});

  } catch (error) {
    console.error("Order Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });
