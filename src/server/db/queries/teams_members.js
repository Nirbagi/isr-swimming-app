const knex = require("../connection");

function addUserToTeam(params) {
  return knex("teams_members")
    .insert({
      user_id: parseInt(params.user_id),
      team_id: parseInt(params.team_id),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("*");
}

function updateUserTeam(params) {
  params.updated_at = knex.fn.now();
  return knex("teams_members")
    .update(params)
    .where({ user_id: params.user_id })
    .returning("*");
}

function removeUserFromTeam(params) {
  return knex("teams_members")
    .del()
    .where({ user_id: parseInt(params.user_id) })
    .returning("*");
}

function getTeamIDByUserID(user_id) {
  return knex("teams_members")
    .select("team_id")
    .where({ user_id: parseInt(user_id) })
    .first();
}

module.exports = {
  addUserToTeam,
  updateUserTeam,
  removeUserFromTeam,
  getTeamIDByUserID,
};
