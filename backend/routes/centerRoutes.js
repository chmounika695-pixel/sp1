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
    
    // Build query object based on provided filters
    const query = {};
    if (city) {
      // Case-insensitive search for city
      query.city = { $regex: new RegExp(city, "i") };
    }

    const centers = await Center.find(query).sort({ name: 1 });
    
    res.status(200).json(centers);
  } catch (error) {
    console.error("Error fetching centers:", error);
    res.status(500).json({ message: "Server error fetching centers" });
  }
});

// @route   POST /api/centers/seed
// @desc    Development route to seed dummy centers
// @access  Public
router.post("/seed", async (req, res) => {
  try {
    const dummyCenters = [
      {
        name: "Central Scholarship Helpdesk",
        address: "101 Main Street, Building A",
        city: "Mumbai",
        state: "Maharashtra",
        contactPhone: "9876543210"
      },
      {
        name: "Education Support Center",
        address: "45 Tech Park, Ground Floor",
        city: "Bangalore",
        state: "Karnataka",
        contactEmail: "support@educenter.in"
      },
      {
        name: "Student Resource Center",
        address: "Block C, Knowledge City",
        city: "Mumbai",
        state: "Maharashtra",
        contactPhone: "9988776655"
      }
    ];

    // Clear existing centers first to avoid duplicates during dev
    await Center.deleteMany({});
    
    const createdCenters = await Center.insertMany(dummyCenters);
    res.status(201).json({ message: "Dummy centers created successfully", count: createdCenters.length, data: createdCenters });
  } catch (error) {
    console.error("Error seeding centers:", error);
    res.status(500).json({ message: "Server error seeding centers" });
  }
});

module.exports = router;
