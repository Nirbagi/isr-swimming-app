const knex = require('../connection');

function getAllUsers() {
    return knex('users');
}

function getUserByID(id) {
    return knex('users')
    .select('*')
    .where({ user_id: parseInt(id) });
}

function addUser(user) {
    return knex('users')
    .insert(user)
    .returning('*');
}

module.exports = {
    getAllUsers,
    getUserByID,
    addUser
};