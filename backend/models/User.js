// backend/models/User.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  caste: { type: String },
  income: { type: Number },
  classLevel: { type: String },   // e.g., "10th", "UG", "PG"
  yearOfStudy: { type: String },  // "1st Year", "2nd Year"
  marks: { type: Number },        // previous year %
  age: { type: Number },
  gender: { type: String },       // "Male", "Female", "Other"
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: profileSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
