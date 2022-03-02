const knex = require('../connection');

function getAllUsers() {
    return knex('users');
}

function getUserByID(id) {
    return knex('users')
    .select('*')
    .where({ id: parseInt(id) });
}

module.exports = {
    getAllUsers
};