const KoaRouter = require("@koa/router");
const router = new KoaRouter({
    prefix: ''
});

router.get('/', async (ctx) => {
    ctx.body = {
      status: 'successs',
      message: 'hello, world!'
    };
  })

router.post('/', ctx => {
    ctx.body = 'Hello Test Post!';
});

module.exports = router;