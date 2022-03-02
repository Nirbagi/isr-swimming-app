// Env vars
require('dotenv').config({path: __dirname+'/config/dev.env'});

// Enforce env var path to server.js
const enforceNodePath = require('enforce-node-path');
enforceNodePath(__dirname);

// App config
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Morgan = require('koa-morgan');

// Routes
const indexRoutes = require(__dirname+'/server/routes/index');
const usersRoutes = require(__dirname+'/server/routes/users');


const app = new Koa();
const bodyparser = new BodyParser();

const PORT = 8585;

app.use(Morgan('combined'));
app.use(bodyparser);

app.use(Routes.routes()).use(Routes.allowedMethods());

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});