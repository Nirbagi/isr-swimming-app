const router = require("koa-joi-router");

const Joi = router.Joi;

const auth_schema = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
    .required(),
  email: Joi.string().email().required(),
});

const login_schema = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  password: Joi.string().required(),
});

module.exports = {
  auth_schema,
  login_schema,
};