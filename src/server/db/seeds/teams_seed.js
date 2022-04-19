exports.seed = (knex, Promise) => {
  return knex("teams")
    .del()
    .then(() => {
      return knex("teams").insert([
        { name: "A", min_age: 10, max_age: 15, description: "test team A" },
        { name: "B", min_age: 16, max_age: 18, description: "test team B" },
        { name: "C", min_age: 19, max_age: 20, description: "test team C" },
      ]);
    });
};
