const bcrypt = require("bcrypt");
const knex = require("../connection");

function getAllUsers() {
  return knex("users");
}

function getUserRoleByID(user_id) {
  return knex("users")
    .select("role_id")
    .where({ user_id: parseInt(user_id) })
    .first()
    .then((role_id) => role_id["role_id"]);
}

// TODO: check if needed anymore
function getUserInfoByID(user_id) {
  return knex("users")
    .select("user_id")
    .select("username")
    .select("first_name")
    .select("last_name")
    .select("email")
    .select("age")
    .select("city")
    .select("address")
    .select("zipcode")
    .select("id_number")
    .where({ user_id: user_id })
    .first();
}

function addUser(user) {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  user.role_id = process.env.NOT_ASSIGNED_ROLE_ID;
  user.created_at = knex.fn.now();
  user.updated_at = knex.fn.now();
  return knex("users").insert(user).returning("*");
}

function updateUser(params) {
  params.updated_at = knex.fn.now();
  return knex("users")
    .update(params)
    .where({ user_id: params.user_id })
    .returning("*")
    .then((user) => {
      return user[0]["user_id"];
    });
}

function updateUserRoleID(params) {
  params.updated_at = knex.fn.now();
  return knex("users")
    .update(params)
    .where({ user_id: params.user_id })
    .returning("*")
    .then((user) => {
      return { user_id: user[0]["user_id"], role_id: user[0]["role_id"] };
    });
}

function deleteUser(user_id) {
  return knex("users")
    .del()
    .where({ user_id: parseInt(user_id) })
    .returning("*");
}

module.exports = {
  getAllUsers,
  getUserRoleByID,
  getUserInfoByID,
  addUser,
  updateUser,
  updateUserRoleID,
  deleteUser,
};
