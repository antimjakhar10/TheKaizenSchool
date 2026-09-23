const Settings = require("../models/Settings");

// GET SETTINGS (Public & Admin)
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch settings" });
  }
};

// UPDATE SETTINGS (Admin)
const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({ success: true, message: "Settings updated successfully", settings });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({ success: false, message: "Failed to update settings" });
  }
};

module.exports = { getSettings, updateSettings };
