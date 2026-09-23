const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", createEnquiry);
router.get("/", authMiddleware, getEnquiries);
router.put("/:id", authMiddleware, updateEnquiryStatus);
router.delete("/:id", authMiddleware, deleteEnquiry);

module.exports = router;
