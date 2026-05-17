const AppDataSource =
  require("../config/db");

const menuRepository =
  AppDataSource.getRepository(
    "MenuItem"
  );

const restaurantRepository =
  AppDataSource.getRepository(
    "Restaurant"
  );

const createMenuItem = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      restaurantId,
    } = req.body;

    const restaurant =
      await restaurantRepository.findOne({
        where: {
          id: restaurantId,
        },
      });

    if (!restaurant) {
      return res.status(404).json({
        message:
          "Restaurant not found",
      });
    }

    const menuItem =
      menuRepository.create({
        name,
        description,
        price,
        image,
        category,
        restaurant,
      });

    await menuRepository.save(
      menuItem
    );

    res.status(201).json(menuItem);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMenuItems = async (
  req,
  res
) => {
  try {
    const { search } = req.query;

    let menuItems;

    if (search) {
      menuItems =
        await menuRepository
          .createQueryBuilder("menu")
          .where(
            "LOWER(menu.name) LIKE LOWER(:search)",
            {
              search: `%${search}%`,
            }
          )
          .getMany();
    } else {
      menuItems =
        await menuRepository.find();
    }

    res.json(menuItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getRestaurantMenu =
  async (req, res) => {
    try {
      const restaurantId =
        req.params.id;

      const menuItems =
        await menuRepository.find({
          where: {
            restaurant: {
              id: restaurantId,
            },
          },
        });

      res.json(menuItems);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

module.exports = {
  createMenuItem,
  getMenuItems,
  getRestaurantMenu,
};