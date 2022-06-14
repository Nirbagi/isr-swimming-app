const knex = require("../connection");

function createTeam(params) {
  params.created_at = knex.fn.now();
  params.updated_at = knex.fn.now();
  return knex("teams")
    .insert(params)
    .returning("*")
    .then((team) => {
      return team[0];
    });
}

function getTeamByTeamID(team_id) {
  return knex("teams")
    .select("*")
    .where({ team_id: parseInt(team_id) })
    .returning("*");
}

function getTeams(params) {
  return knex("teams")
    .orderBy("created_at", "desc")
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function getCoachTeams(params) {
  return knex("teams")
    .orderBy("created_at", "desc")
    .where({ coach_id: parseInt(params.coach_id) })
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function updateTeam(params) {
  return knex("teams")
    .update(params)
    .where({ team_id: parseInt(params.team_id) })
    .returning("*")
    .then((team) => {
      return team[0];
    });
}

function deleteTeam(params) {
  return knex("teams")
    .del()
    .where({ team_id: parseInt(params.team_id) })
    .returning("*")
    .then((team) => {
      return team[0];
    });
}

module.exports = {
  createTeam,
  getTeamByTeamID,
  getTeams,
  getCoachTeams,
  updateTeam,
  deleteTeam,
};
