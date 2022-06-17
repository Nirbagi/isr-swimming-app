const { Joi } = require("koa-joi-router");

const get_user_info_schema = Joi.object({
  id_number: Joi.string().required(),
});

const get_user_role_schema = Joi.object({
  user_id: Joi.number().integer().required(),
});

const edit_user_schema = Joi.object({
  username: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  age: Joi.number().integer(),
  address: Joi.string(),
  city: Joi.string(),
  zipcode: Joi.number().integer(),
});

const admin_edit_user_schema = Joi.object({
  user_id: Joi.number().integer().required(),
  username: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  age: Joi.number().integer(),
  email: Joi.string().email(),
  address: Joi.string(),
  city: Joi.string(),
  zipcode: Joi.number().integer(),
  id_number: Joi.number().integer(),
});

const edit_role_schema = Joi.object({
  user_id: Joi.number().integer().required(),
  role_id: Joi.number().integer().min(1).max(4).required(),
});

module.exports = {
  admin_edit_user_schema,
  get_user_info_schema,
  get_user_role_schema,
  edit_user_schema,
  edit_role_schema,
};
