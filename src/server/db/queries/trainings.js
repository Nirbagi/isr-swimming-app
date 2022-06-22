const knex = require("../connection");

function addTraining(params) {
  params.created_at = knex.fn.now();
  params.updated_at = knex.fn.now();
  return knex("trainings")
    .insert(params)
    .returning("training_id")
    .then((ex_id) => ex_id[0]["training_id"]);
}

function getNextTraining(team_id) {
  return knex("trainings")
    .where({ team_id: team_id })
    .where("target_date", ">", knex.fn.now())
    .orderBy("target_date", "asc")
    .first();
}

function getPastTrainings(params) {
  return knex("trainings")
    .orderBy("target_date", "desc")
    .where({ team_id: params.team_id, is_test: params.is_test })
    .where("target_date", "<", knex.fn.now())
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function getCoachTrainings(params) {
  return knex("trainings")
    .orderBy("updated_at", "desc")
    .where({ coach_id: parseInt(params.coach_id) })
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function updateTraining(params) {
  params.updated_at = knex.fn.now();
  return knex("trainings")
    .update(params)
    .where({ training_id: parseInt(params.training_id) })
    .returning("training_id")
    .then((ex_id) => ex_id[0]["training_id"]);
}

function deleteTraining(params) {
  return knex("trainings")
    .del()
    .where({ training_id: parseInt(params.training_id) })
    .returning("*")
    .then((ex_id) => ex_id[0]["training_id"]);
}

module.exports = {
  addTraining,
  getNextTraining,
  getPastTrainings,
  getCoachTrainings,
  updateTraining,
  deleteTraining,
};
