const Koa = require('koa');

const app = new Koa();
const router = new KoaRouter();

app.use(async ctx => ctx.body = 'Hello ISR!');

app.listen(8585, () => console.log('Server Started...'));