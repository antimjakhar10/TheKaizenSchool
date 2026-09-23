const express = require("express");
const router = express.Router();
const {
  getEvents,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getEvents);
router.get("/admin", authMiddleware, getAdminEvents);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
