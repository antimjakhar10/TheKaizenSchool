const Gallery = require("../models/Gallery");

// GET GALLERY ITEMS (Public)
const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Get Gallery Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch gallery items" });
  }
};

// GET GALLERY ITEMS (Admin)
const getAdminGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Get Admin Gallery Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch gallery items" });
  }
};

// CREATE GALLERY ITEM (Admin)
const createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, message: "Gallery item created successfully", item });
  } catch (error) {
    console.error("Create Gallery Error:", error);
    res.status(500).json({ success: false, message: "Failed to create gallery item" });
  }
};

// UPDATE GALLERY ITEM (Admin)
const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, message: "Gallery item updated successfully", item });
  } catch (error) {
    console.error("Update Gallery Error:", error);
    res.status(500).json({ success: false, message: "Failed to update gallery item" });
  }
};

// DELETE GALLERY ITEM (Admin)
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Delete Gallery Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete gallery item" });
  }
};

module.exports = {
  getGallery,
  getAdminGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
