exports.seed = (knex, Promise) => {
  return knex("teams")
    .del()
    .then(() => {
      return knex("teams").insert([
        {
          name: "A",
          coach_id: 2,
          min_age: 10,
          max_age: 15,
          description: "test team A",
        },
        {
          name: "B",
          coach_id: 3,
          min_age: 16,
          max_age: 18,
          description: "test team B",
        },
        {
          name: "C",
          coach_id: 4,
          min_age: 19,
          max_age: 20,
          description: "test team C",
        },
        {
          name: "D",
          coach_id: 4,
          min_age: 21,
          max_age: 22,
          description: "test team D",
        },
      ]);
    });
};
