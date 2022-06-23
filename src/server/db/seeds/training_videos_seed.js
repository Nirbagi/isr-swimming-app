exports.seed = (knex, Promise) => {
  return knex("training_videos")
    .del()
    .then(() => {
      return knex("training_videos").insert([
        {
          name: "תרגילים יבשים - חלק א",
          category: "יבש",
          sub_category: "יבש",
          link: "https://www.youtube.com/watch?v=s0fpyS2-wow",
        },
        {
          name: "תרגילים יבשים - חלק ב",
          category: "יבש",
          sub_category: "יבש",
          link: "https://www.youtube.com/watch?v=s9lK4GUDkb0",
        },
        {
          name: "תרגילים יבשים - חלק ג",
          category: "יבש",
          sub_category: "יבש",
          link: "https://www.youtube.com/watch?v=hBQRPCyLAxU",
        },
        {
          name: "הדרכה חתירה",
          category: "רטוב",
          sub_category: "חתירה",
          link: "https://www.youtube.com/watch?v=K6cnuEI6KIM",
        },
        {
          name: "הדרכה בקטגוריית חזה רגליים",
          category: "רטוב",
          sub_category: "חזה",
          link: "https://www.youtube.com/watch?v=laXZFRXqKkY",
        },
        {
          name: "הדרכה קטגוריית חתירה",
          category: "רטוב",
          sub_category: "חתירה",
          link: "https://www.youtube.com/watch?v=zlfDaRV1jtk",
        },
      ]);
    });
};
