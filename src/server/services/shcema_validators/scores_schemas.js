const { Joi } = require("koa-joi-router");

const validate_user = Joi.object({
  user_id: Joi.number().integer(),
});

const add_score_schema = Joi.object({
  training_id: Joi.number().integer(),
  scores: Joi.array().items(
    Joi.object({
      exercise_id: Joi.number().integer().required(),
      time_duration: Joi.number().integer().default(0),
      sets: Joi.number().integer().default(0),
      reps: Joi.number().integer().default(0),
      weight: Joi.number().precision(2).default(0),
      is_test: Joi.boolean().required(),
    })
  ),
});

const get_ex_scores_schema = Joi.object({
  exercise_id: Joi.number().integer().required(),
  score_type: Joi.string()
    .required()
    .valid("time_duration", "weight", "sets", "reps"),
  is_test: Joi.string(),
});

const get_coach_ex_scores_schema = Joi.object({
  user_id: Joi.number().integer().required(),
  exercise_id: Joi.number().integer().required(),
  score_type: Joi.string()
    .required()
    .valid("time_duration", "weight", "sets", "reps"),
  is_test: Joi.string(),
});

const get_training_submitted_schema = Joi.object({
  training_id: Joi.number().integer(),
  user_id: Joi.number().integer(),
});

const update_score_schema = Joi.object({
  training_id: Joi.number().integer().required(),
  exercise_id: Joi.number().integer(),
  time_duration: Joi.number().integer(),
  sets: Joi.number().integer(),
  reps: Joi.number().integer(),
  weight: Joi.number().precision(2),
  is_test: Joi.boolean(),
});

const delete_score_schema = Joi.object({
  training_id: Joi.number().integer().required(),
  exercise_id: Joi.number().integer(),
});

module.exports = {
  validate_user,
  add_score_schema,
  get_ex_scores_schema,
  get_coach_ex_scores_schema,
  get_training_submitted_schema,
  update_score_schema,
  delete_score_schema,
};
