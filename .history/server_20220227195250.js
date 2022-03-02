const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Routes = require('./routes/router');

const app = new Koa();
const bodyparser = new BodyParser();

app.use(bodyparser);

app.use(Routes.routes()).use(Routes.allowedMethods());

app.listen(8585, () => console.log('Server Started...'));