const knex = require("../connection");

function addVideo(video) {
  video.created_at = knex.fn.now();
  video.updated_at = knex.fn.now();
  return knex("training_videos")
    .insert(video)
    .returning("video_id")
    .then((id) => id[0]["video_id"]);
}

function getVideos(params) {
  where_stmt = null;
  if (params.category) where_stmt = { category: params.category };
  if (params.sub_category)
    where_stmt = Object.assign({}, where_stmt, {
      sub_category: params.sub_category,
    });
  if (where_stmt) {
    return knex("training_videos")
      .where(where_stmt)
      .orderBy("created_at", "desc")
      .paginate({
        perPage: params.take,
        currentPage: params.skip,
      })
      .then((results) => results["data"]);
  }
  return knex("training_videos")
    .orderBy("created_at", "desc")
    .paginate({
      perPage: params.take,
      currentPage: params.skip,
    })
    .then((results) => results["data"]);
}

function updateVideo(params) {
  params.updated_at = knex.fn.now();
  return knex("training_videos")
    .update(params)
    .where({ video_id: params.video_id })
    .returning("*")
    .then((video) => {
      return video[0]["video_id"];
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
