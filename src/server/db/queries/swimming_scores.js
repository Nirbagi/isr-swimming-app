const knex = require("../connection");

function addScore(user_id, score_data) {
  return knex("swimming_scores").insert({
    user_id: parseInt(user_id),
    swim_style: score_data.swim_style,
    num_of_pools: score_data.num_of_pools,
    distance: score_data.distance,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });
}

function getScoresByUserID(user_id) {
  return knex("swimming_scores")
    .select("*")
    .where({ user_id: parseInt(user_id) });
}

function updateScoreByScoreID(score_id, score_data) {
  return knex("swimming_scores")
    .update(score_data)
    .where({ score_id: parseInt(score_id) })
    .returning("*");
}

function deleteScore(score_id) {
  return knex("swimming_scores")
    .del()
    .where({ score_id: parseInt(score_id) })
    .returning("*");
}

module.exports = {
  addScore,
  getScoresByUserID,
  updateScoreByScoreID,
  deleteScore,
};
