const express = require("express");
const protect = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  getDashboardStats,
} = require("../controllers/dashboard.controller");

const router = express.Router();

// Admin & Manager only
router.get(
  "/stats",
  protect,
  roleMiddleware(["admin", "manager"]),
  getDashboardStats
);

module.exports = router;
