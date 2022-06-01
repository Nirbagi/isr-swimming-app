exports.seed = (knex, Promise) => {
  return knex("announcements")
    .del()
    .then(() => {
      return knex("announcements").insert([
        {
          author_id: 1,
          body: "1st msg - general",
          image_link: "https://imgur.com/Z7nmUKr",
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "2nd msg - team A",
          team_id: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "3rd msg - team B",
          team_id: 2,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "4th msg - team c",
          team_id: 3,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
