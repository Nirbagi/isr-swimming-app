/*********************imports*********************/
const enforceNodePath = require('enforce-node-path');

// App config
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Morgan = require('koa-morgan');
const passport = require("koa-passport")

// Routes
const indexRoutes = require('./server/routes/index');
const usersRoutes = require('./server/routes/users');
/*********************imports*********************/

// Env vars
require('dotenv').config({path: __dirname+'/config/dev.env'});

// Enforce env var path to server.js
enforceNodePath(__dirname);

const app = new Koa();
const bodyparser = new BodyParser();

const PORT = 8585;

app.use(Morgan('combined'));
app.use(bodyparser);

app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});