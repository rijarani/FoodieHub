const AppDataSource = require("../config/db");

const restaurantRepository =
  AppDataSource.getRepository("Restaurant");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = restaurantRepository.create(req.body);

    await restaurantRepository.save(restaurant);

    res.status(201).json(restaurant);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants =
      await restaurantRepository.find();

    res.json(restaurants);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
};