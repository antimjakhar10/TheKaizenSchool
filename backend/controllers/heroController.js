const Hero = require("../models/Hero");

// ==========================================
// GET ACTIVE HERO - PUBLIC
// ==========================================
const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne({
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      hero,
    });
  } catch (error) {
    console.error("Get Hero Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hero",
    });
  }
};

// ==========================================
// GET HERO - ADMIN
// ==========================================
const getAdminHero = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      hero,
    });
  } catch (error) {
    console.error("Get Admin Hero Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hero",
    });
  }
};

// ==========================================
// CREATE HERO - ADMIN
// ==========================================
const createHero = async (req, res) => {
  try {
    const existingHero = await Hero.findOne();

    if (existingHero) {
      return res.status(400).json({
        success: false,
        message:
          "Hero already exists. Please update the existing hero.",
      });
    }

    const hero = await Hero.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hero created successfully",
      hero,
    });
  } catch (error) {
    console.error("Create Hero Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create hero",
    });
  }
};

// ==========================================
// UPDATE HERO - ADMIN
// ==========================================
const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Hero updated successfully",
      hero,
    });
  } catch (error) {
    console.error("Update Hero Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update hero",
    });
  }
};

// ==========================================
// DELETE HERO - ADMIN
// ==========================================
const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findOneAndDelete({});

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero deleted successfully",
    });
  } catch (error) {
    console.error("Delete Hero Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete hero",
    });
  }
};

module.exports = {
  getHero,
  getAdminHero,
  createHero,
  updateHero,
  deleteHero,
};