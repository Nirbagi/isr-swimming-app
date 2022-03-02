/*********************imports*********************/
const Koa = require('koa');
const Morgan = require('koa-morgan');
const session = require('koa-session');
const passport = require('koa-passport');
const BodyParser = require('koa-bodyparser');
const enforceNodePath = require('enforce-node-path');

const indexRoutes = require('./server/routes/index-router');
const usersRoutes = require('./server/routes/users-router');
const usersAuthRoutes = require('./server/routes/auth-router');

// env vars
require('dotenv').config({path: __dirname+'/config/dev.env'});
/*********************imports*********************/

const app = new Koa();
const bodyparser = new BodyParser();
const PORT = 8585;

// enforce env var path to server.js
enforceNodePath(__dirname);

// sessions
app.keys = ['secret'];
app.use(session(app));

// authentication
require('./server/auth');
app.use(passport.initialize());
app.use(passport.session());


app.use(Morgan('combined'));
app.use(bodyparser);

app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());
app.use(usersAuthRoutes.routes()).use(usersAuthRoutes.allowedMethods());

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});