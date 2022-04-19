exports.seed = (knex, Promise) => {
  return knex("training_videos")
    .del()
    .then(() => {
      return knex("training_videos").insert([
        {
          category: "general",
          sub_category: "test",
          link: "https://www.youtube.com/watch?v=rRXrXtac_uI",
        },
        {
          training_id: 1,
          category: "training1",
          sub_category: "wet",
          link: "https://www.youtube.com/watch?v=rRXrXtac_uI",
        },
        {
          training_id: 2,
          category: "training3",
          sub_category: "dry",
          link: "https://www.youtube.com/watch?v=rRXrXtac_uI",
        },
        {
          training_id: 3,
          category: "training3",
          sub_category: "dry",
          link: "https://www.youtube.com/watch?v=rRXrXtac_uI",
        },
      ]);
    });
};
