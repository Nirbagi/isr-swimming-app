exports.up = function (knex, Promise) {
  return knex.schema.alterTable("users", function (table) {
    table.renameColumn("role", "role_id");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable("users", function (table) {
    table.renameColumn("role_id", "role");
  });
};
