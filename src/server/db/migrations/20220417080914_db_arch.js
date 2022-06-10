exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("roles", (table) => {
      table.increments("role_id").primary().notNullable().unique();
      table.string("role").unique().notNullable();
      table.timestamps(false, true);
    })
    .createTable("users", (table) => {
      table.increments("user_id").primary().notNullable().unique();
      table.string("username").unique().notNullable();
      table.string("password").notNullable();
      table.string("first_name");
      table.string("last_name");
      table.integer("age");
      table.string("email").unique().notNullable();
      table.string("id_number").unique().notNullable();
      table.string("address");
      table.string("city");
      table.string("zipcode");
      table
        .integer("role_id")
        .references("role_id")
        .inTable("roles")
        .notNull()
        .onDelete("SET NULL");
      table.timestamps(false, true);
    })
    .createTable("teams", (table) => {
      table.increments("team_id").primary().notNullable().unique();
      table
        .integer("coach_id")
        .references("user_id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table.string("name").unique().notNullable();
      table.integer("min_age");
      table.integer("max_age");
      table.string("description");

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
    .createTable("trainings", (table) => {
      table.increments("training_id").primary().notNullable().unique();
      table
        .integer("coach_id")
        .references("user_id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table.string("category");
      table.string("sub_category");
      table.integer("day");
      table
        .integer("team_id")
        .references("team_id")
        .inTable("teams")
        .notNull()
        .onDelete("cascade");
      table.json("exercises");
      table.timestamps(false, true);
    })
    .createTable("training_videos", (table) => {
      table.increments("video_id").primary().notNullable().unique();
      table
        .integer("training_id")
        .references("training_id")
        .inTable("trainings")
        .onDelete("cascade");
      table.string("name");
      table.string("category");
      table.string("sub_category");
      table.string("link");
      table.timestamps(false, true);
    })
    .createTable("training_scores", (table) => {
      table.increments("trainig_score_id").primary().notNullable().unique();
      table
        .integer("user_id")
        .references("user_id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table
        .integer("training_id")
        .references("training_id")
        .inTable("trainings")
        .notNull()
        .onDelete("cascade");
      table.json("scores");
      table.timestamps(false, true);
    })
    .createTable("tournaments", (table) => {
      table.increments("tournament_id").primary().notNullable().unique();
      table.string("name");
      table.string("location");
      table.string("category");
      table.timestamp("datetime");
      table.timestamps(false, true);
    })
    .createTable("tournament_scores", (table) => {
      table.increments("tournament_score_id").primary().notNullable().unique();
      table
        .integer("user_id")
        .references("user_id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table
        .integer("tournament_id")
        .references("tournament_id")
        .inTable("tournaments")
        .notNull()
        .onDelete("cascade");
      table.integer("rank");
      table.integer("score");
      table.timestamps(false, true);
    })
    .createTable("announcements", (table) => {
      table.increments("announcement_id").primary().notNullable().unique();
      table.string("body").notNullable();
      table.string("image_link");
      table
        .integer("author_id")
        .references("user_id")
        .inTable("users")
        .onDelete("SET NULL");
      table
        .integer("team_id")
        .references("team_id")
        .inTable("teams")
        .onDelete("SET NULL");
      table.timestamps(false, true);
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("announcements")
    .dropTable("tournament_scores")
    .dropTable("tournaments")
    .dropTable("training_scores")
    .dropTable("training_videos")
    .dropTable("trainings")
    .dropTable("teams_members")
    .dropTable("teams")
    .dropTable("users")
    .dropTable("roles");
};
