const router = require("koa-joi-router");

const Joi = router.Joi;

const get_ancmt_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  team_id: Joi.number().integer(),
});

const create_ancmt_schema = Joi.object({
  body: Joi.string().required(),
  team_id: Joi.number().integer(),
});

const update_ancmt_schema = Joi.object({
  body: Joi.string().required(),
});

module.exports = {
  get_ancmt_schema,
  create_ancmt_schema,
  update_ancmt_schema,
};
