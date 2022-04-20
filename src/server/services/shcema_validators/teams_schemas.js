const router = require("koa-joi-router");

const Joi = router.Joi;

const get_team_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  team_id: Joi.number().integer().default(null),
});

const create_team_schema = Joi.object({
  body: Joi.string().required(),
  team_id: Joi.number().integer().default(null),
});

const update_team_schema = Joi.object({
  announcement_id: Joi.number().integer().required(),
  body: Joi.string().required(),
});

const delete_team_schema = Joi.object({
  announcement_id: Joi.number().integer().required(),
});

module.exports = {
  get_team_schema,
  create_team_schema,
  update_team_schema,
  delete_team_schema,
};