const environment = process.env.NODE_ENV || "development";
const config = require("../../../knexfile.js")[environment];

knex = require("knex")(config);

const { attachPaginate } = require("knex-paginate");

attachPaginate();

module.exports = knex;
