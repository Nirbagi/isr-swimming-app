const knex = require("../connection");

function getUserRoleNameID(user_id) {
  return knex
    .select(["roles.role_id", "roles.role"])
    .from("users")
    .where({ user_id: parseInt(user_id) })
    .leftOuterJoin("roles", "users.role_id", "roles.role_id")
    .first();
}

function getUserincludeTeamInfo(params) {
  let where_stmt = null;
  if (params.id_number) where_stmt = { id_number: params.id_number };
  else where_stmt = { "users.user_id": params.user_id };
  return knex("users")
    .select([
      "users.user_id",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.age",
      "users.city",
      "users.address",
      "users.zipcode",
      "users.id_number",
      "teams_members.team_id",
      "teams.name",
    ])
    .where(where_stmt)
    .leftOuterJoin("teams_members", "teams_members.user_id", "users.user_id")
    .leftOuterJoin("teams", "teams.team_id", "teams_members.team_id")
    .first()
    .then((user) => {
      user.team_name = user.name;
      delete user["name"];
      return user;
    });
}

function getCoachesincludeTeamInfo() {
  return knex("users")
    .select([
      "users.user_id",
      "users.role_id",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.age",
      "users.city",
      "users.address",
      "users.zipcode",
      "users.id_number",
      "teams.team_id",
      "teams.name",
    ])
    .where({ "users.role_id": 2 })
    .leftOuterJoin("teams", "teams.coach_id", "users.user_id")
    .then((coaches) => {
      for (idx in coaches) {
        idx = parseInt(idx);
        coaches[idx].team_name = coaches[idx].name;
        delete coaches[idx]["name"];
        delete coaches[idx]["role_id"];
      }
      return coaches;
    });
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

function getTeamDetailsByUserID(user_id) {
  return knex("teams_members")
    .select(["teams_members.team_id", "teams.name"])
    .where({ user_id: parseInt(user_id) })
    .leftOuterJoin("teams", "teams.team_id", "teams_members.team_id")
    .first()
    .returning("*");
}

function getExperiencedExercises(params) {
  return knex("exercises_scores")
    .select(["exercises_scores.exercise_id", "exercises.name"])
    .distinct()
    .where({ user_id: parseInt(params.user_id) })
    .leftOuterJoin(
      "exercises",
      "exercises.exercise_id",
      "exercises_scores.exercise_id"
    )
    .returning("*");
}

module.exports = {
  getUserRoleNameID,
  getUserincludeTeamInfo,
  getCoachesincludeTeamInfo,
  getTeamMembersByTeamID,
  getTeamDetailsByUserID,
  getExperiencedExercises,
};
