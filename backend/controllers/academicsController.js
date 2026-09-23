const Academic = require("../models/Academics");

// GET ALL ACADEMICS (Public)
const getAcademics = async (req, res) => {
  try {
    const academics = await Academic.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, academics });
  } catch (error) {
    console.error("Get Academics Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch academics" });
  }
};

// GET ALL ACADEMICS (Admin)
const getAdminAcademics = async (req, res) => {
  try {
    const academics = await Academic.find().sort({ order: 1 });
    res.status(200).json({ success: true, academics });
  } catch (error) {
    console.error("Get Admin Academics Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch academics" });
  }
};

// CREATE ACADEMIC LEVEL (Admin)
const createAcademic = async (req, res) => {
  try {
    const academic = await Academic.create(req.body);
    res.status(201).json({ success: true, message: "Academic level created successfully", academic });
  } catch (error) {
    console.error("Create Academic Error:", error);
    res.status(500).json({ success: false, message: "Failed to create academic level" });
  }
};

// UPDATE ACADEMIC LEVEL (Admin)
const updateAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!academic) {
      return res.status(404).json({ success: false, message: "Academic level not found" });
    }
    res.status(200).json({ success: true, message: "Academic level updated successfully", academic });
  } catch (error) {
    console.error("Update Academic Error:", error);
    res.status(500).json({ success: false, message: "Failed to update academic level" });
  }
};

// DELETE ACADEMIC LEVEL (Admin)
const deleteAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndDelete(req.params.id);
    if (!academic) {
      return res.status(404).json({ success: false, message: "Academic level not found" });
    }
    res.status(200).json({ success: true, message: "Academic level deleted successfully" });
  } catch (error) {
    console.error("Delete Academic Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete academic level" });
  }
};

module.exports = {
  getAcademics,
  getAdminAcademics,
  createAcademic,
  updateAcademic,
  deleteAcademic,
};
