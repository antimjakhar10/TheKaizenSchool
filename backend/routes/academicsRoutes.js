const express = require("express");
const router = express.Router();
const {
  getAcademics,
  getAdminAcademics,
  createAcademic,
  updateAcademic,
  deleteAcademic,
} = require("../controllers/academicsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAcademics);
router.get("/admin", authMiddleware, getAdminAcademics);
router.post("/", authMiddleware, createAcademic);
router.put("/:id", authMiddleware, updateAcademic);
router.delete("/:id", authMiddleware, deleteAcademic);

module.exports = router;
