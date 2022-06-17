const { Joi } = require("koa-joi-router");

const get_teams_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  team_id: Joi.number().integer().default(null),
});

const get_coach_teams_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  coach_id: Joi.number().integer().default(null),
});

const get_team_members_schema = Joi.object({
  team_id: Joi.number().integer().required(),
});

const assign_unassign_to_team_schema = Joi.object({
  team_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

const create_team_schema = Joi.object({
  coach_id: Joi.number().integer().required(),
  name: Joi.string().required(),
  min_age: Joi.number().integer().required(),
  max_age: Joi.number().integer().required(),
  description: Joi.string().required(),
});

const update_team_schema = Joi.object({
  team_id: Joi.number().integer().required(),
  coach_id: Joi.number().integer(),
  name: Joi.string(),
  min_age: Joi.number().integer(),
  max_age: Joi.number().integer(),
  description: Joi.string(),
});

const delete_team_schema = Joi.object({
  team_id: Joi.number().integer().required(),
});

module.exports = {
  get_teams_schema,
  get_coach_teams_schema,
  assign_unassign_to_team_schema,
  get_team_members_schema,
  create_team_schema,
  update_team_schema,
  delete_team_schema,
};
