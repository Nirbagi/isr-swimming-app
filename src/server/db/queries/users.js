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

function getUserInfoByID(user_id) {
  return knex("users")
    .select("first_name")
    .select("last_name")
    .select("email")
    .select("age")
    .select("city")
    .select("address")
    .select("zipcode")
    .where({ user_id: parseInt(user_id) })
    .first();
}

function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex("users")
    .insert({
      username: user.username,
      password: hash,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role_id: process.env.NOT_ASSIGNED_ROLE_ID,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("*");
}

function updateUser(user_id, user) {
  user.updated_at = knex.fn.now();
  return knex("users")
    .update(user)
    .where({ user_id: parseInt(user_id) })
    .returning("*")
    .then((user) => {
      return user[0]["user_id"];
    });
}

function updateUserRoleID(user_id, role_id) {
  return knex("users")
    .update({ role_id: role_id, updated_at: knex.fn.now() })
    .where({ user_id: parseInt(user_id) })
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
