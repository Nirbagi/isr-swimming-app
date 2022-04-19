const knex = require("../connection");

function addUserToTeam(user_id, team_id) {
  return knex("team_members")
    .insert({
      user_id: parseInt(user_id),
      team_id: parseInt(team_id),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("*");
}

function removeUserFromTeam(user_id) {
  return knex("team_members")
    .del()
    .where({ user_id: parseInt(user_id) })
    .returning("*");
}

function getTeamIDByUserID(user_id) {
  return knex("team_members")
    .select("team_id")
    .where({ user_id: parseInt(user_id) })
    .first();
}

function getTeamMembersByTeamID(team_id) {
  return knex("team_members")
    .select("user_id")
    .where({ team_id: parseInt(team_id) })
    .returning("*");
}

module.exports = {
  addUserToTeam,
  removeUserFromTeam,
  getTeamIDByUserID,
  getTeamMembersByTeamID,
};
