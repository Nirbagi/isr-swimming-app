exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('user_id');
        table.dropColumn('email');
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table.dropColumn('role');
        table.dropColumn('id');
      })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};