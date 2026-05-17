const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    totalPrice: {
      type: "float",
    },

    status: {
      type: "varchar",
      default: "Pending",
    },

    address: {
      type: "varchar",
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      eager: true,
    },
  },
});