const knex = require("../connection");

function createAnnouncement(user_id, params) {
  params.created_at = knex.fn.now();
  params.updated_at = knex.fn.now();
  return knex("announcements")
    .insert(Object.assign({}, { author_id: user_id }, params))
    .returning("announcement_id")
    .then((id) => id[0]["announcement_id"]);
}

function getAnnouncements(params) {
  return knex("announcements")
    .where({ team_id: params.team_id })
    .orderBy("updated_at", "desc")
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function updateAnnouncement(user_id, params) {
  params.updated_at = knex.fn.now();
  return knex("announcements")
    .update(params)
    .where({ announcement_id: params.announcement_id })
    .returning("announcement_id")
    .then((id) => id[0]["announcement_id"]);
}

function deleteAnnouncement(announcement_id) {
  return knex("announcements")
    .del()
    .where({ announcement_id: announcement_id })
    .returning("announcement_id")
    .then((id) => id[0]["announcement_id"]);
}

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
