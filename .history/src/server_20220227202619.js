// Env vars
require('dotenv').config({path: __dirname+'src/config/dev.env'});

// Enforce path to server.js
const enforceNodePath = require('enforce-node-path');
enforceNodePath(__dirname+"/src");

// App config
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Routes = require('./routes/router');

const app = new Koa();
const bodyparser = new BodyParser();

app.use(bodyparser);

app.use(Routes.routes()).use(Routes.allowedMethods());

app.listen(8585, () => console.log('Server Started...'));