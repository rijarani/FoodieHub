const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "foodiehub",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.js"],
});

module.exports = AppDataSource;