const { Model } = require("objection");

class Roles extends Model {
  static get tableName() {
    return "roles";
  }
}

module.exports = Roles;
