exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary().notNullable().unique();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('role');
        
    });
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};