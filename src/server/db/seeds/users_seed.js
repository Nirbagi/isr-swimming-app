exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      knex("roles").del();
    })
    .then(() => {
      return knex("roles").insert({
        role: "test",
      });
    });
};
