const AppDataSource = require("../config/db");

const cartRepository =
  AppDataSource.getRepository("CartItem");

const menuRepository =
  AppDataSource.getRepository("MenuItem");

const userRepository =
  AppDataSource.getRepository("User");

const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    const menuItem =
      await menuRepository.findOne({
        where: { id: menuItemId },
      });

    const user = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    const cartItem = cartRepository.create({
      quantity,
      menuItem,
      user,
    });

    await cartRepository.save(cartItem);

    res.status(201).json(cartItem);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems =
      await cartRepository.find({
        where: {
          user: {
            id: req.user.id,
          },
        },
      });

    res.json(cartItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const cartItem =
      await cartRepository.findOne({
        where: {
          id: parseInt(req.params.id),
        },
      });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartRepository.remove(cartItem);

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
};