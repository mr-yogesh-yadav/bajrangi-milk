
const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    cowPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    buffaloPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
