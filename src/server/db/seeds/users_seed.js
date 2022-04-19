const bcrypt = require("bcrypt");

exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        {
          username: "admin-user",
          password: bcrypt.hashSync("1", bcrypt.genSaltSync()),
          first_name: "admin",
          last_name: "test",
          email: "admin@test.com",
          role_id: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          username: "coach-user",
          password: bcrypt.hashSync("1", bcrypt.genSaltSync()),
          first_name: "coach",
          last_name: "test",
          email: "coach@test.com",
          role_id: 2,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          username: "trainee-user-a",
          password: bcrypt.hashSync("1", bcrypt.genSaltSync()),
          first_name: "trainee-a",
          last_name: "test",
          email: "trainee@test.com",
          role_id: 3,
          age: 15,
          city: "Tel-Aviv",
          zipcode: 123456,
          address: "test address",
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          username: "trainee-user-b",
          password: bcrypt.hashSync("1", bcrypt.genSaltSync()),
          first_name: "trainee-b",
          last_name: "test",
          email: "trainee@test.com",
          role_id: 3,
          age: 17,
          city: "Petah-Tikva",
          zipcode: 123456,
          address: "test address",
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          username: "trainee-user-c",
          password: bcrypt.hashSync("1", bcrypt.genSaltSync()),
          first_name: "trainee-c",
          last_name: "test",
          email: "trainee@test.com",
          role_id: 3,
          age: 20,
          city: "Ashkelon",
          zipcode: 123456,
          address: "test address",
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          username: "not-assigned-user",
          password: bcrypt.hashSync("1", bcrypt.genSaltSync()),
          first_name: "not-assigned",
          last_name: "test",
          email: "not-assigned@test.com",
          role_id: 4,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
