const { Joi } = require("koa-joi-router");

const get_videos_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  category: Joi.string().default(null),
  sub_category: Joi.string().default(null),
});

const create_video_schema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  sub_category: Joi.string().required(),
  link: Joi.string().required(),
});

const update_video_schema = Joi.object({
  video_id: Joi.number().integer().required(),
  name: Joi.string(),
  category: Joi.string(),
  sub_category: Joi.string(),
  link: Joi.string(),
});

const delete_video_schema = Joi.object({
  video_id: Joi.number().integer().required(),
});

module.exports = {
  get_videos_schema,
  create_video_schema,
  update_video_schema,
  delete_video_schema,
};
