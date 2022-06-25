exports.seed = (knex, Promise) => {
  return knex("exercises")
    .del()
    .then(() => {
      return knex("exercises").insert([
        {
          coach_id: 2,
          name: "חזה 100",
          num_of_sets: 1,
          num_of_reps: 1,
          distance: 100,
          notes: "work hard, play hard!",
          is_public: true,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 3,
          name: "חתירה 200",
          num_of_sets: 2,
          num_of_reps: 2,
          distance: 400,
          is_public: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 3,
          name: "עליות מתח",
          num_of_sets: 3,
          num_of_reps: 10,
          distance: 0,
          notes: "work hard, play hard!",
          is_public: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 4,
          name: "תרגיל עכביש",
          num_of_sets: 15,
          num_of_reps: 1,
          distance: 0,
          notes: "יש לעשות את התרגיל בפיסוק",
          is_public: true,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          coach_id: 4,
          name: "זחילת דוב",
          num_of_sets: 1,
          num_of_reps: 1,
          distance: 0,
          notes: "יש להקפיד על גב ישר !",
          is_public: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
