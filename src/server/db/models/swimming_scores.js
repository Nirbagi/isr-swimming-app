const { Model } = require("objection");

class SwimmingScores extends Model {
  static get tableName() {
    return "swimming_scores";
  }
}

module.exports = SwimmingScores;
