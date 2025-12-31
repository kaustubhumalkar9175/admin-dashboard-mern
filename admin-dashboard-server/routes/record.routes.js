const express = require("express");
const protect = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/record.controller");

const router = express.Router();

// Any logged-in user can view records
router.get("/", protect, getRecords);

// Admin + Manager can create & update
router.post(
  "/",
  protect,
  roleMiddleware(["admin", "manager"]),
  createRecord
);

router.put(
  "/:id",
  protect,
  roleMiddleware(["admin", "manager"]),
  updateRecord
);

// Only admin can delete
router.delete(
  "/:id",
  protect,
  roleMiddleware(["admin"]),
  deleteRecord
);

module.exports = router;
