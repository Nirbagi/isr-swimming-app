const { Model } = require("objection");

class Teams extends Model {
  static get tableName() {
    return "teams";
  }
}

module.exports = Teams;
