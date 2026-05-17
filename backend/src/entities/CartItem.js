const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CartItem",
  tableName: "cart_items",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    quantity: {
      type: "int",
      default: 1,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      eager: true,
    },

    menuItem: {
      type: "many-to-one",
      target: "MenuItem",
      eager: true,
    },
  },
});