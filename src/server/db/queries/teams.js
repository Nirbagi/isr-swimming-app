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
  updateTeam,
  deleteTeam,
};
