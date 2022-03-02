const KoaRouter = require('@koa/router');
const queries = require('../db/queries/users');

const router = new KoaRouter();

BASE_URL = '/v1/users'

router.get(BASE_URL, async (ctx) => {
    try {
        const users = await queries.getAllUsers();
        ctx.body = {
            status: 'success',
            data: users
        };
    } catch (err) {
        console.log(err);
    }
})

module.exports = router