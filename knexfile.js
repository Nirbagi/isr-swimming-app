const path = require("path");
const { knexSnakeCaseMappers } = require("objection");

const BASE_PATH = path.join(__dirname, "src", "server", "db");

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:9095582@localhost:5432/postgres",
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
    ...knexSnakeCaseMappers,
  },
};
