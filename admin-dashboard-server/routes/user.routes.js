const express = require("express");
const protect = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { getUsers } = require("../controllers/user.controller");

const router = express.Router();

// Admin only
router.get(
  "/",
  protect,
  roleMiddleware(["admin"]),
  getUsers
);

module.exports = router;
