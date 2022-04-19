const knex = require("../connection");

function createAnnouncement(user_id, team_id = null, body) {
  return knex("announcements")
    .insert({
      author_id: parseInt(user_id),
      team_id: team_id,
      body: body,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("announcement_id")
    .then((id) => id[0]["announcement_id"]);
}

function getAnnouncements(skip, take, team_id = null) {
  return knex("announcements")
    .where({ team_id: team_id })
    .orderBy("created_at", "desc")
    .paginate({
      perPage: take,
      currentPage: skip,
    })
    .then((results) => results["data"]);
}

function updateAnnouncement(user_id, announcement_id, new_body) {
  return knex("announcements")
    .update({ author_id: user_id, body: new_body })
    .where({ announcement_id: announcement_id })
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
