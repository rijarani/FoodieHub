const express = require("express");

const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);
router.get("/", getRestaurants);

module.exports = router;