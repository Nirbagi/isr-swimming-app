const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Routes = require('./routes/router');

const app = new Koa();
const router = new KoaRouter();

app.use(async ctx => ctx.body = 'Hello ISR!');

app.listen(8585, () => console.log('Server Started...'));