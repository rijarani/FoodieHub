const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "MenuItem",
  tableName: "menu_items",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    name: {
      type: "varchar",
    },

    description: {
      type: "varchar",
    },

    price: {
      type: "float",
    },

    image: {
      type: "varchar",
    },

    category: {
      type: "varchar",
    },
  },

  relations: {
    restaurant: {
      type: "many-to-one",
      target: "Restaurant",
      joinColumn: true,
      eager: true,
    },
  },
});