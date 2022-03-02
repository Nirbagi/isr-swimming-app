exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      user_id: 1,
      first_name: 'Nir',
      last_name: "Bagi",
      email: "test@test.com",
      role: "admin"
    });
  })
  .then(() => {
    return knex('users').insert({
      user_id: 1,
      first_name: 'test',
      last_name: "test",
      email: "test@test.com",
      role: "user"
    });
  })
  .then(() => {
    return knex('users').insert({
      user_id: 1,
      first_name: 'test',
      last_name: "test",
      email: "test@test.com",
      role: "coach"
    });
  });
};