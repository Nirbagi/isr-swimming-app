const knex = require("../connection");

function createEvent(user_id, params) {
  params.created_at = knex.fn.now();
  params.updated_at = knex.fn.now();
  return knex("events")
    .insert(Object.assign({}, { event_manager_id: user_id }, params))
    .returning("event_id")
    .then((id) => id[0]["event_id"]);
}

function getEvents(params) {
  return knex("events")
    .where({ team_id: params.team_id })
    .orderBy("updated_at", "desc")
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function updateEvent(params) {
  params.updated_at = knex.fn.now();
  return knex("events")
    .update(params)
    .where({ event_id: parseInt(params.event_id) })
    .returning("event_id")
    .then((id) => id[0]["event_id"]);
}

function deleteEvent(event_id) {
  return knex("events")
    .del()
    .where({ event_id: event_id })
    .returning("event_id")
    .then((id) => id[0]["event_id"]);
}

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
