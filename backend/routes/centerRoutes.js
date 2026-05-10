// backend/routes/centerRoutes.js
const express = require("express");
const router = express.Router();
const Center = require("../models/Center");

// @route   GET /api/centers
// @desc    Get all centers (with optional city filter)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { city } = req.query;

    let query = {};

    // Optional city filter
    if (city) {
      query.city = {
        $regex: city,
        $options: "i",
      };
    }

    const centers = await Center.find(query);

    res.status(200).json(centers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;