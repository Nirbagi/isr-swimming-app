const knex = require("../connection");

function getUserRoleNameID(user_id) {
  return knex
    .select(["roles.role_id", "roles.role"])
    .from("users")
    .where({ user_id: parseInt(user_id) })
    .leftOuterJoin("roles", "users.role_id", "roles.role_id")
    .first();
}

function getTeamMembersByTeamID(team_id) {
  return knex("teams_members")
    .select([
      "users.user_id",
      "users.first_name",
      "users.last_name",
      "users.email",
    ])
    .where({ team_id: parseInt(team_id) })
    .leftOuterJoin("users", "users.user_id", "teams_members.user_id")
    .returning("*");
}

module.exports = {
  getUserRoleNameID,
  getTeamMembersByTeamID,
};
