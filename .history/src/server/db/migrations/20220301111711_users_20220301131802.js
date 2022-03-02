exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', (table) => {
        table.integer('user_id').primary().unique().increments();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('role');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTableIfExist('users');
};