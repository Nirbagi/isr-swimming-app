exports.up = function(knex, Promise) {
    // return knex.schema.alterTable('users', (table) => {
    //     table.integer('user_id').primary().notNullable().unique().increments();
    //     table.string('username').unique().notNullable();
    //     table.string('password').notNullable();
    //     table.string('first_name');
    //     table.string('last_name');
    //     table.string('email');
    //     table.string('role');
    // });
    return knex.schema.alterTable('users', table => {
        table.dropColumn('user_id');
        table.dropColumn('email');
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        // table.dropColumn('email');
        table.dropColumn('role');
        table.dropColumn('id');
      })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};