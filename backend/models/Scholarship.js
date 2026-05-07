// backend/models/Scholarship.js
const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    provider: { type: String },

    // caste can be single string or array – allow both
    caste: { type: [String], default: [] },  // e.g. ["SC", "ST"]

    minIncome: { type: Number },
    minMarks: { type: Number },
    gender: { type: String, default: "Any" },
    maxAge: { type: Number },

    classLevel: { type: String },   // "UG", "10th" etc.
    yearOfStudy: { type: String },  // "1st Year", "Any"

    sector: { type: String },
    description: { type: String },
    applyLink: { type: String },
  },
  {
    timestamps: true,

    // !!! IMPORTANT: tell Mongoose the EXACT collection name
    // Change 'scholarship' to 'scholarships' if that’s where your docs are.
    collection: "scholarships",
  }
);

module.exports = mongoose.model("Scholarship", scholarshipSchema);
