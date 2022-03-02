const KoaRouter = require("@koa/router");
const router = new KoaRouter({
    prefix: ''
});

router.get('/', ctx => {
    ctx.body = 'Hello Test!';
});

router.post('/', ctx => {
    ctx.body = 'Hello Test Post!';
});

module.exports = router;