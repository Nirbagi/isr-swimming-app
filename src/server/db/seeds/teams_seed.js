exports.seed = (knex, Promise) => {
  return knex("teams")
    .del()
    .then(() => {
      return knex("teams").insert([
        {
          name: "הפועל תל אביב",
          coach_id: 2,
          min_age: 10,
          max_age: 15,
          description: "נערים א'",
        },
        {
          name: "דולפיני נתניה",
          coach_id: 3,
          min_age: 16,
          max_age: 18,
          description: "נערים ב",
        },
        {
          name: "כרישי הרצליה",
          coach_id: 4,
          min_age: 19,
          max_age: 20,
          description: "בוגרים",
        },
        {
          name: "הפועל קריית אונו",
          coach_id: 4,
          min_age: 21,
          max_age: 22,
          description: "מתקדמים ג",
        },
      ]);
    });
};
