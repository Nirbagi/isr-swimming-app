const KoaRouter = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const queries = require('../db/queries/users');

const router = new KoaRouter();

router.get('/auth/register', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('../views/register.html');
});

module.exports = router;