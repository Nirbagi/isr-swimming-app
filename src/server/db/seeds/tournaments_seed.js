exports.seed = (knex, Promise) => {
  return knex("tournaments")
    .del()
    .then(() => {
      return knex("tournaments").insert([
        {
          name: "test tournament",
          location: "Ashkelon",
          category: "Back",
          datetime: knex.fn.now(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
