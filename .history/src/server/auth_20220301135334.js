const passport = require('koa-passport');
const knex = require('./db/connection');

passport.serializeUser((user, done) => { done(null, user.user_id); });

passport.deserializeUser((user_id, done) => {
  return knex('users').where({user_id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});