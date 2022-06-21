const knex = require("../connection");

function addScore(params) {
  params.created_at = knex.fn.now();
  params.updated_at = knex.fn.now();
  return knex("exercises_scores")
    .insert(params)
    .returning("ex_score_id")
    .then((ex_id) => ex_id[0]["ex_score_id"]);
}

function getExScoresByUserID(params) {
  let where_stmt = { user_id: params.user_id, exercise_id: params.exercise_id };
  if (params.is_test) {
    const is_test = params.is_test === "true";
    where_stmt = Object.assign({}, where_stmt, { is_test: is_test });
  }
  return knex("exercises_scores")
    .select([params.score_type, "created_at"])
    .where(where_stmt);
}

function getTestExScoresByUserID(params) {
  return knex("exercises_scores").select("*").where({
    user_id: params.user_id,
    exercise_id: params.exercise_id,
    is_test: params.is_test,
  });
}

function updateScoreByScoreID(params) {
  return knex("exercises_scores")
    .update(params)
    .where({ ex_score_id: params.ex_score_id })
    .returning("*")
    .then((result) => {
      return result[0].ex_score_id;
    });
}

function deleteScore(params) {
  return knex("exercises_scores")
    .del()
    .where({ ex_score_id: params.ex_score_id })
    .returning("*")
    .then((result) => {
      return result[0].ex_score_id;
    });
}

module.exports = {
  addScore,
  getExScoresByUserID,
  getTestExScoresByUserID,
  updateScoreByScoreID,
  deleteScore,
};
