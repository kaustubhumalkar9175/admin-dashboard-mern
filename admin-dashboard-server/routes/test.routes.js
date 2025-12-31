const express = require("express");
const protect = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});

// Admin only
router.get(
  "/admin",
  protect,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Admin route accessed" });
  }
);

// Admin + Manager
router.get(
  "/manager",
  protect,
  roleMiddleware(["admin", "manager"]),
  (req, res) => {
    res.json({ message: "Manager route accessed" });
  }
);

module.exports = router;