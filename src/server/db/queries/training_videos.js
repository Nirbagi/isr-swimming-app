const knex = require("../connection");

function addVideo(video) {
  return knex("training_videos")
    .insert({
      name: video.name,
      category: video.category,
      sub_category: video.sub_cat,
      training_id: video.training_id,
      link: video.link,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("video_id")
    .then((id) => id[0]["video_id"]);
}

function getVideos(skip, take, category = null, sub_cat = null) {
  where_stmt = null;
  if (category) where_stmt = { category: category };
  if (sub_cat)
    where_stmt = Object.assign({}, where_stmt, { sub_category: sub_cat });
  if (where_stmt) {
    return knex("training_videos")
      .where(where_stmt)
      .orderBy("created_at", "desc")
      .paginate({
        perPage: take,
        currentPage: skip,
      })
      .then((results) => results["data"]);
  }
  return knex("training_videos")
    .orderBy("created_at", "desc")
    .paginate({
      perPage: take,
      currentPage: skip,
    })
    .then((results) => results["data"]);
}

function updateVideo(video_data) {
  return knex("training_videos")
    .update(video_data)
    .where({ video_id: video_data.video_id })
    .returning("*")
    .then((video) => {
      return video[0];
    });
}

function deleteVideo(video_id) {
  return knex("training_videos")
    .del()
    .where({ video_id: video_id })
    .returning("video_id")
    .then((video) => video[0]["video_id"]);
}

module.exports = {
  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,
};
