const Joi = require("koa-joi-router").Joi.extend(require("@joi/date"));

const add_training_schema = Joi.object({
  team_id: Joi.number().integer().required(),
  training_type: Joi.string().required(),
  target_date: Joi.date().format("YYYY-MM-DD").utc().required(),
  exercises: Joi.object(),
  is_test: Joi.boolean(),
});

const get_trainings_schema = Joi.object({
  coach_id: Joi.number().integer().required(),
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
});

const get_past_trainings_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
});

const get_past_tests_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
  team_id: Joi.number().integer().required(),
});

const update_training_schema = Joi.object({
  training_id: Joi.number().integer(),
  team_id: Joi.number().integer(),
  training_type: Joi.string(),
  target_date: Joi.date().format("YYYY-MM-DD").utc(),
  exercises: Joi.object(),
  is_test: Joi.boolean(),
});

const delete_training_schema = Joi.object({
  training_id: Joi.number().integer().required(),
});

module.exports = {
  add_training_schema,
  get_trainings_schema,
  get_past_trainings_schema,
  get_past_tests_schema,
  update_training_schema,
  delete_training_schema,
};
