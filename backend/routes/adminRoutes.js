
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const Settings = require("../models/Settings");
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Limit login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

// Admin Login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD_HASH ||
      !process.env.JWT_SECRET
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid login details.",
      });
    }

    const validUsername = username === process.env.ADMIN_USERNAME;

    const validPassword = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!validUsername || !validPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect username or password.",
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      success: true,
      token,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to login.",
    });
  }
});

// Get All Orders
router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .select("-__v");

    return res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
    });
  }
});

// Update Order Status
router.patch("/orders/:id/status", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Delivered",
      "Cancelled",
    ];

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.json({
      success: true,
      message: "Order status updated.",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update order.",
    });
  }
});
// GET: Milk prices
router.get("/settings", adminAuth, async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        cowPrice: 0,
        buffaloPrice: 0,
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch settings.",
    });
  }
});

// PATCH: Update milk prices
router.patch("/settings", adminAuth, async (req, res) => {
  try {
    const { cowPrice, buffaloPrice } = req.body;

    const updates = {};

    if (cowPrice !== undefined) {
      updates.cowPrice = cowPrice;
    }

    if (buffaloPrice !== undefined) {
      updates.buffaloPrice = buffaloPrice;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one milk price is required.",
      });
    }

    for (const price of Object.values(updates)) {
      if (
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Milk price must be a valid non-negative number.",
        });
      }
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: updates },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Milk prices updated successfully.",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update milk prices.",
    });
  }
});
module.exports = router;
