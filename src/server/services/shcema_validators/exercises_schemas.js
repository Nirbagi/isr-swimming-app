const { Joi } = require("koa-joi-router");

const add_exercise_schema = Joi.object({
  name: Joi.string(),
  num_of_sets: Joi.number().integer(),
  num_of_reps: Joi.number().integer(),
  distance: Joi.number().integer().default(0),
  notes: Joi.string(),
  is_public: Joi.boolean(),
});

const get_exercises_schema = Joi.object({
  skip: Joi.number().integer().required(),
  take: Joi.number().integer().required(),
});

const update_exercise_schema = Joi.object({
  exercise_id: Joi.number().integer(),
  name: Joi.string(),
  num_of_sets: Joi.number().integer(),
  num_of_reps: Joi.number().integer(),
  distance: Joi.number().integer(),
  notes: Joi.string(),
  is_public: Joi.boolean(),
});

const delete_exercise_schema = Joi.object({
  exercise_id: Joi.number().integer().required(),
});

module.exports = {
  add_exercise_schema,
  get_exercises_schema,
  update_exercise_schema,
  delete_exercise_schema,
};
