const router = require("koa-joi-router");

const Joi = router.Joi;

const get_ancmt_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
});

const create_ancmt_schema = Joi.object({
  body: Joi.string().required(),
  image_link: Joi.string(),
  team_id: Joi.number().integer().default(null),
});

const update_ancmt_schema = Joi.object({
  announcement_id: Joi.number().integer().required(),
  body: Joi.string().required(),
});

const delete_ancmt_schema = Joi.object({
  announcement_id: Joi.number().integer().required(),
});

module.exports = {
  get_ancmt_schema,
  create_ancmt_schema,
  update_ancmt_schema,
  delete_ancmt_schema,
};
