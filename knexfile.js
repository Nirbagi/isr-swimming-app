const path = require("path");
const { knexSnakeCaseMappers } = require("objection");
// env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/src/config/dev.env" });
}

const BASE_PATH = path.join(__dirname, "src", "server", "db");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_CONNECTION_STRING,
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
    ...knexSnakeCaseMappers,
  },
};
