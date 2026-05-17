const express = require("express");

const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
  getRestaurantMenu,
} = require("../controllers/menuController");

router.post("/", createMenuItem);

router.get("/", getMenuItems);

router.get(
  "/restaurant/:id",
  getRestaurantMenu
);

module.exports = router;