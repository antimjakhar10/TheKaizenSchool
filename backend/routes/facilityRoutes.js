const express = require("express");
const router = express.Router();
const {
  getFacilities,
  getAdminFacilities,
  updateFacilityPage,
  createFacility,
  updateFacility,
  deleteFacility,
} = require("../controllers/facilityController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getFacilities);
router.get("/admin", authMiddleware, getAdminFacilities);
router.put("/page", authMiddleware, updateFacilityPage);
router.post("/", authMiddleware, createFacility);
router.put("/:id", authMiddleware, updateFacility);
router.delete("/:id", authMiddleware, deleteFacility);

module.exports = router;
