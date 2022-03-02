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

// add new user
// TODO: validate payload.
router.post(`${BASE_URL}`, async (ctx) => {
    try {
        const user = await queries.addUser(ctx.request.body);
        if (user.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: user
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'An error occured while processing this request.'
            }
        }
    } catch(err) {
        console.log(err);
    }
})

module.exports = router