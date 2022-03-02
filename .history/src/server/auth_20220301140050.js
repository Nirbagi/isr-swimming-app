const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const knex = require('./db/connection');

const options = {};

passport.serializeUser((user, done) => { 
    done(null, user.user_id); 
});

passport.deserializeUser((user_id, done) => {
    return knex('users').where({user_id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
    knex('users').where({ username }).first()
    .then((user) => {
        if (!user) return done(null, false);
        if (password === user.password) {
            return done(null, user);
        } else {
            return (null, false);
        }
    })
    .catch((err) => { return done(err); });
}));