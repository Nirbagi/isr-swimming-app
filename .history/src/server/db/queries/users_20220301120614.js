const { ParamName } = require('@koa/router');
const { database, user } = require('pg/lib/defaults');
const knex = require('../connection');

function getAllUsers() {
    return knex('users');
}

function getUserByID(user_id) {
    return knex('users')
    .select('*')
    .where({ user_id: parseInt(user_id) });
}

function addUser(user) {
    return knex('users')
    .insert(user)
    .returning('*');
}

function updateUser(user_id, user) {
    return knex('users')
    .update(user)
    .where( {user_id: parseInt(user_id) })
    .returning('*');
}

function deleteUser(user_id) {
    return knex('users')
    .del()
    .where({ user_id: parseInt(user_id) })
    .returning('*');
}

module.exports = {
    getAllUsers,
    getUserByID,
    addUser,
    updateUser
};