/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.integer('user_id');
        table.charset('first_name');
        table.charset('last_name');
        table.charset('email');
        table.charset('role');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
  };