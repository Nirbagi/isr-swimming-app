const knex = require("../connection");

function getUserRoleNameID(user_id) {
  return knex
    .select("*")
    .from("users")
    .where({ user_id: parseInt(user_id) })
    .leftOuterJoin("roles", "users.role_id", "roles.role_id")
    .first()
    .then((role) => {
      return { role_id: role["role_id"], role: role["role"] };
    });
}

module.exports = {
  getUserRoleNameID,
};
