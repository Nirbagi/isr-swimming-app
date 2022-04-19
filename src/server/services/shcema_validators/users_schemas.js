const router = require("koa-joi-router");

const Joi = router.Joi;

const edit_user_schema = Joi.object({
  username: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  age: Joi.number().integer(),
  email: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  zipcode: Joi.number().integer(),
});

const edit_role_schema = Joi.object({
  role_id: Joi.number().integer().min(1).max(4).required(),
});

module.exports = {
  edit_user_schema,
  edit_role_schema,
};
