// backend/models/Center.js
const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
  },
  {
    timestamps: true,
    collection: "centers",
  }
);

module.exports = mongoose.model("Center", centerSchema);
