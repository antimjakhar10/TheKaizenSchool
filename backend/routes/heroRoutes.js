const express = require("express");

const {
  getHero,
  getAdminHero,
  createHero,
  updateHero,
  deleteHero,
} = require("../controllers/heroController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC ROUTE
// GET /api/hero
// ==========================================
router.get("/", getHero);

// ==========================================
// ADMIN ROUTE
// GET /api/hero/admin
// ==========================================
router.get(
  "/admin",
  authMiddleware,
  getAdminHero
);

// ==========================================
// ADMIN ROUTE
// POST /api/hero
// ==========================================
router.post(
  "/",
  authMiddleware,
  createHero
);

// ==========================================
// ADMIN ROUTE
// PUT /api/hero
// ==========================================
router.put(
  "/",
  authMiddleware,
  updateHero
);

// ==========================================
// ADMIN ROUTE
// DELETE /api/hero
// ==========================================
router.delete(
  "/",
  authMiddleware,
  deleteHero
);

module.exports = router;