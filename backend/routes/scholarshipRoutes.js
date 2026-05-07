// backend/routes/scholarshipRoutes.js
const express = require("express");
const Scholarship = require("../models/Scholarship");
const auth = require("../middleware/authMiddleware");
const { checkEligibility, matchScore } = require("../utils/eligibility");

const router = express.Router();

// GET /api/scholarships
router.get("/", auth, async (req, res) => {
  try {
    const scholarships = await Scholarship.find({});
    const userProfile = req.user?.profile || {};

    const result = scholarships.map((doc) => {
      const s = doc.toObject();
      const eligible = checkEligibility(userProfile, s);
      const score = matchScore(userProfile, s);
      return { ...s, eligible, matchScore: score };
    });

    console.log("Returning scholarships:", result.length);
    res.json(result);
  } catch (err) {
    console.error("Error in /api/scholarships:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
