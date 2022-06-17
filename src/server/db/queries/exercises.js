const knex = require("../connection");

function addExercise(params) {
  params.created_at = knex.fn.now();
  params.updated_at = knex.fn.now();
  return knex("exercises")
    .insert(params)
    .returning("exercise_id")
    .then((ex_id) => ex_id[0]["exercise_id"]);
}

function getExerciseByID(params) {
  return knex("exercises")
    .select("*")
    .where({ exercise_id: parseInt(params.exercise_id) })
    .returning("*")
    .then((data) => {
      return data[0];
    });
}

function getPublicExercises(params) {
  return knex("exercises")
    .where({ is_public: true })
    .orderBy("created_at", "desc")
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function getCoachExercises(params) {
  return knex("exercises")
    .orderBy("created_at", "desc")
    .where({ coach_id: parseInt(params.coach_id) })
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function updateExercise(params) {
  params.updated_at = knex.fn.now();
  return knex("exercises")
    .update(params)
    .where({ exercise_id: parseInt(params.exercise_id) })
    .returning("exercise_id")
    .then((ex_id) => ex_id[0]["exercise_id"]);
}

function deleteExercise(params) {
  return knex("exercises")
    .del()
    .where({ exercise_id: parseInt(params.exercise_id) })
    .returning("*")
    .then((ex_id) => ex_id[0]["exercise_id"]);
}

module.exports = {
  addExercise,
  getExerciseByID,
  getPublicExercises,
  getCoachExercises,
  updateExercise,
  deleteExercise,
};
