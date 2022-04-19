exports.seed = (knex, Promise) => {
  return knex("tournament_scores")
    .del()
    .then(() => {
      return knex("tournament_scores").insert([
        {
          user_id: 3,
          tournament_id: 1,
          rank: 1,
          score: 12,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 4,
          tournament_id: 1,
          rank: 3,
          score: 24,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
