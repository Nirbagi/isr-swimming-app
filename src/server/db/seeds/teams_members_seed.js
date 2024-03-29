exports.seed = (knex, Promise) => {
  return knex("teams_members")
    .del()
    .then(() => {
      return knex("teams_members").insert([
        {
          user_id: 5,
          team_id: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 6,
          team_id: 2,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          team_id: 3,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 8,
          team_id: 3,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
