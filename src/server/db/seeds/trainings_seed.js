exports.seed = (knex, Promise) => {
  return knex("trainings")
    .del()
    .then(() => {
      return knex("trainings").insert([
        {
          team_id: 1,
          coach_id: 2,
          category: "wet",
          sub_category: "back",
          day: 1,
          exercises: {
            1: "ex-1",
            2: "ex-2",
            3: "ex-3",
            4: "ex-4",
          },
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          team_id: 2,
          coach_id: 2,
          category: "dry",
          sub_category: "chest",
          day: 2,
          exercises: {
            1: "ex-1",
            2: "ex-2",
            3: "ex-3",
            4: "ex-4",
          },
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          team_id: 3,
          coach_id: 2,
          category: "dry",
          sub_category: "back",
          day: 2,
          exercises: {
            1: "ex-1",
            2: "ex-2",
            3: "ex-3",
            4: "ex-4",
          },
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
