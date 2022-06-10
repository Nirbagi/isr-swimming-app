exports.seed = (knex, Promise) => {
  return knex("exercises")
    .del()
    .then(() => {
      return knex("exercises").insert([
        {
          coach_id: 2,
          name: "ex-A",
          num_of_sets: 2,
          num_of_reps: 100,
          distance: 0,
          notes: "work hard, play hard!",
          is_public: true,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 3,
          name: "ex-B",
          num_of_sets: 2,
          num_of_reps: 1,
          distance: 200,
          notes: "work hard, play hard!",
          is_public: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 3,
          name: "ex-C",
          num_of_sets: 2,
          num_of_reps: 4,
          distance: 300,
          notes: "work hard, play hard!",
          is_public: true,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 4,
          name: "ex-D",
          num_of_sets: 4,
          num_of_reps: 100,
          distance: 0,
          notes: "work hard, play hard!",
          is_public: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 4,
          name: "ex-F",
          num_of_sets: 3,
          num_of_reps: 50,
          distance: 0,
          notes: "work hard, play hard!",
          is_public: true,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
