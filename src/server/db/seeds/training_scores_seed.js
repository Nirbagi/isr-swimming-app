exports.seed = (knex, Promise) => {
  return knex("training_scores")
    .del()
    .then(() => {
      return knex("training_scores").insert([
        {
          user_id: 3,
          training_id: 1,
          scores: {
            1: "10/10",
            2: "9/10",
            3: "8/10",
            4: "Not perfomed",
          },
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 4,
          training_id: 2,
          scores: {
            1: "10/10",
            2: "9/10",
            3: "8/10",
            4: "Not perfomed",
          },
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 5,
          training_id: 3,
          scores: {
            1: "10/10",
            2: "9/10",
            3: "8/10",
            4: "Not perfomed",
          },
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
