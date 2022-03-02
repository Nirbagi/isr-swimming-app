// Env vars
console.log(__dirname)
require('dotenv').config({path: __dirname+'/../config/dev.env'});

// Enforce env var path to server.js
const enforceNodePath = require('enforce-node-path');
enforceNodePath(__dirname);

// App config
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Routes = require('./routes/router');
const Morgan = require('koa-morgan');

const app = new Koa();
const bodyparser = new BodyParser();

app.use(Morgan('combined'));
app.use(bodyparser);

app.use(Routes.routes()).use(Routes.allowedMethods());

app.listen(8585, () => console.log('Server Started...'));