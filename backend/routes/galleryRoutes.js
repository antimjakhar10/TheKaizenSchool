const express = require("express");
const router = express.Router();
const {
  getGallery,
  getAdminGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getGallery);
router.get("/admin", authMiddleware, getAdminGallery);
router.post("/", authMiddleware, createGalleryItem);
router.put("/:id", authMiddleware, updateGalleryItem);
router.delete("/:id", authMiddleware, deleteGalleryItem);

module.exports = router;
