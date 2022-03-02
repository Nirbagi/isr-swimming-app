const knex = require('../connection');

function getAllUsers() {
    return knex('users');
}

function getUserByID(id) {
    return knex('users')
    .select('*')
    .where({ user_id: parseInt(id) });
}

module.exports = {
    getAllUsers,
    getUserByID
};