// backend/routes/userRoutes.js
const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get current user
router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

// Update profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { caste, income, classLevel, yearOfStudy, marks, age, gender } =
      req.body;

    req.user.profile = {
      caste,
      income,
      classLevel,
      yearOfStudy,
      marks,
      age,
      gender,
    };

    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
