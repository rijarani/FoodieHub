const AppDataSource = require("../config/db");

const orderRepository =
  AppDataSource.getRepository("Order");

const cartRepository =
  AppDataSource.getRepository("CartItem");

const userRepository =
  AppDataSource.getRepository("User");

const checkout = async (req, res) => {
  try {
    const { address } = req.body;

    const user = await userRepository.findOne({
      where: { id: req.user.id },
    });

    const cartItems =
      await cartRepository.find({
        where: {
          user: {
            id: req.user.id,
          },
        },
      });

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice +=
        item.menuItem.price * item.quantity;
    });

    const order = orderRepository.create({
      address,
      totalPrice,
      user,
    });

    await orderRepository.save(order);

    await cartRepository.remove(cartItems);

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders =
      await orderRepository.find({
        where: {
          user: {
            id: req.user.id,
          },
        },
      });

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  checkout,
  getOrders,
};