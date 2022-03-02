exports.up = (knex, Promise) => {
    return knex.schema.createTable('users_login', (table) => {
      table.increments();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users_login');
  };