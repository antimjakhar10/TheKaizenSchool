const express = require("express");
const router = express.Router();
const {
  getAdmissions,
  updateAdmissions,
} = require("../controllers/admissionsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAdmissions);
router.put("/", authMiddleware, updateAdmissions);

module.exports = router;
