const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  checkout,
  getOrders,
} = require("../controllers/orderController");

router.post("/checkout", authMiddleware, checkout);

router.get("/", authMiddleware, getOrders);

module.exports = router;