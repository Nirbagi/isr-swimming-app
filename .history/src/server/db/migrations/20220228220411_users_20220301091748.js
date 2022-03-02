/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('useres', (table) => {
        table.increments();
        table.integer('user_id');
        table.charset('first_name');
        table.charset('last_name');
        table.charset('last_name');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
