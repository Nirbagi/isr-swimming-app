const knex = require("../connection");

function createRole(role_name) {
  return knex("roles")
    .insert({
      role: role_name,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("role_id");
}

function deleteRoleByRoleID(role_id) {
  return knex("roles").del().where({ role_id: role_id }).returning("role_id");
}

function deleteRoleByRoleName(role_name) {
  return knex("roles").del().where({ role: role_name }).returning("role_id");
}

module.exports = {
  createRole,
  deleteRoleByRoleID,
  deleteRoleByRoleName,
};
