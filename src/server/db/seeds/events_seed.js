exports.seed = (knex, Promise) => {
  return knex("events")
    .del()
    .then(() => {
      return knex("events").insert([
        {
          event_manager_id: 1,
          description: "תחרויות המכביה לנוער ובוגרים",
          location: "מכון וינגייט",
          datetime: new Date("2022-07-17"),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          event_manager_id: 2,
          description: "מוקדמות אליפות ישראל arena לצעירים",
          location: "מכון וינגייט",
          datetime: new Date("2022-07-07"),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          event_manager_id: 3,
          description: "אליפות ישראל לנערים",
          location: "בריכת הסולטן",
          datetime: new Date("2022-06-30"),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
