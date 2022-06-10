exports.seed = (knex, Promise) => {
  return knex("trainings")
    .del()
    .then(() => {
      return knex("trainings").insert([
        {
          team_id: 1,
          coach_id: 2,
          training_type: "dry",
          target_date: knex.fn.now(),
          exercises: {
            1: 1,
            2: 3,
            3: 5,
          },
          is_test: true,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          team_id: 2,
          coach_id: 3,
          training_type: "wet",
          target_date: knex.fn.now(),
          exercises: {
            1: 2,
            2: 3,
            3: 5,
          },
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          team_id: 3,
          coach_id: 4,
          training_type: "wet",
          target_date: knex.fn.now(),
          exercises: {
            1: 3,
            2: 4,
            3: 5,
          },
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
