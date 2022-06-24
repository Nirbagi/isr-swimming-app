const { Joi } = require("koa-joi-router");

const get_events_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
});

const get_team_events_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  team_id: Joi.number().integer().required(),
});

const create_event_schema = Joi.object({
  description: Joi.string().required(),
  location: Joi.string(),
  datetime: Joi.date().required(),
  team_id: Joi.number().integer().default(null),
});

const update_event_schema = Joi.object({
  event_id: Joi.number().integer().required(),
  description: Joi.string(),
  location: Joi.string(),
  datetime: Joi.date(),
});

const delete_event_schema = Joi.object({
  event_id: Joi.number().integer().required(),
});

module.exports = {
  get_events_schema,
  get_team_events_schema,
  create_event_schema,
  update_event_schema,
  delete_event_schema,
};
