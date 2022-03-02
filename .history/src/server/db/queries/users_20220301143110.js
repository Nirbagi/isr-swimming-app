const bcrypt = require('bcrypt');
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
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);
    return knex('users')
    .insert({
        username: user.username,
        password: hash,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user. email,
        role: user.role,
    })
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
    updateUser,
    deleteUser
};