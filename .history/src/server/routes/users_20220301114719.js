const KoaRouter = require('@koa/router');
const queries = require('../db/queries/users');

const router = new KoaRouter();

BASE_URL = '/v1/users'

// get all users
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

// get user by user_id
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const user = await queries.getUserByID(ctx.params.id);
        if (user.length) {
            ctx.body = {
                status: 'success',
                data: user
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'User does not exist.'
            };
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router