const knex = require("../connection");

function createTeam(team_data) {
  return knex("teams")
    .insert({
      team_name: team_data.team_name,
      description: team_data.description,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("*");
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

function updateTeam(team_id, team_data) {
  return knex("teams")
    .update(team_data)
    .where({ team_id: parseInt(team_id) })
    .returning("*");
}

function deleteTeam() {
  return knex("teams")
    .del()
    .where({ team_id: parseInt(team_id) })
    .returning("*");
}

module.exports = {
  createTeam,
  getTeamByTeamID,
  getTeams,
  getCoachTeams,
  updateTeam,
  deleteTeam,
};
