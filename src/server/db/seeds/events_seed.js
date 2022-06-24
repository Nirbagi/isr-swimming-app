exports.seed = (knex, Promise) => {
  return knex("events")
    .del()
    .then(() => {
      return knex("events").insert([
        {
          event_manager_id: 1,
          description: "A General Event",
          location: "בריכת הסולטן",
          datetime: knex.fn.now(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          event_manager_id: 2,
          description: "Team A Event",
          location: "בריכת הסולטן",
          team_id: 1,
          datetime: knex.fn.now(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          event_manager_id: 3,
          description: "Team B Event",
          location: "בריכת הסולטן",
          team_id: 2,
          datetime: knex.fn.now(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          event_manager_id: 4,
          description: "Team C Event",
          location: "בריכת הסולטן",
          team_id: 3,
          datetime: knex.fn.now(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          event_manager_id: 4,
          description: "Team D Event",
          location: "בריכת הסולטן",
          team_id: 4,
          datetime: knex.fn.now(),
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
