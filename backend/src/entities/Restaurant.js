const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Restaurant",
  tableName: "restaurants",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    name: {
      type: "varchar",
    },

    image: {
      type: "varchar",
    },

    location: {
      type: "varchar",
    },
  },

  relations: {
    menuItems: {
      type: "one-to-many",
      target: "MenuItem",
      inverseSide: "restaurant",
    },
  },
});