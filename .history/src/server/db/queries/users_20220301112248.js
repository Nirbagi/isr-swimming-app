const knex = require('../connection');

function getAllUsers() {
    return knex('users');
}

module.exports = {
    getAllUsers
};