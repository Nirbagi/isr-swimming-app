const knex = require("../connection");

function addUserToTeam(user_id, team_id) {
  return knex("teams_members")
    .insert({
      user_id: parseInt(user_id),
      team_id: parseInt(team_id),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("*");
}

function removeUserFromTeam(user_id) {
  return knex("teams_members")
    .del()
    .where({ user_id: parseInt(user_id) })
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
  removeUserFromTeam,
  getTeamIDByUserID,
};
