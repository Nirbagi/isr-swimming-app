const router = require("koa-joi-router");

const Joi = router.Joi;

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

const assign_user_to_team_schema = Joi.object({
  team_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

const unassign_user_from_team_schema = Joi.object({
  user_id: Joi.number().integer().required(),
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
  get_teams_schema,
  get_coach_teams_schema,
  assign_user_to_team_schema,
  unassign_user_from_team_schema,
  create_team_schema,
  update_team_schema,
  delete_team_schema,
};
