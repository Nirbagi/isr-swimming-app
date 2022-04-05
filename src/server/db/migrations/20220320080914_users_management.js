exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("roles", (table) => {
      table.increments("role_id").primary().notNullable().unique();
      table.string("role").unique().notNullable();
      table.timestamps(false, true);
    })
    .createTable("teams", (table) => {
      table.increments("team_id").primary().notNullable().unique();
      table.string("team_name").unique().notNullable();
      table.string("description").notNullable();
      table.timestamps(false, true);
    })
    .createTable("users", (table) => {
      table.increments("user_id").primary().notNullable().unique();
      table.string("username").unique().notNullable();
      table.string("password").notNullable();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table
        .integer("role")
        .references("role_id")
        .inTable("roles")
        .notNull()
        .onDelete("SET NULL");
      table.timestamps(false, true);
    })
    .createTable("teams_members", (table) => {
      table.increments("member_id").primary().notNullable().unique();
      table
        .integer("user_id")
        .references("user_id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table
        .integer("team_id")
        .references("team_id")
        .inTable("teams")
        .notNull()
        .onDelete("cascade");
      table.timestamps(false, true);
    })
    .createTable("swimming_scores", (table) => {
      table.increments("swim_score_id").primary().notNullable().unique();
      table
        .integer("user_id")
        .references("user_id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table.string("swim_style");
      table.integer("num_of_pools");
      table.float("distance");
      table.timestamps(false, true);
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("roles")
    .dropTable("teams")
    .dropTable("users")
    .dropTable("teams_members")
    .dropTable("swimming_scores");
};
