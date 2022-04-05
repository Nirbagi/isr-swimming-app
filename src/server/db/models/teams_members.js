const { Model } = require("objection");

class TeamsMembers extends Model {
  static get tableName() {
    return "teams_members";
  }
}

module.exports = TeamsMembers;
