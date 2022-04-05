const KoaRouter = require("koa-joi-router");
const queries = require("../../db/queries/users");

const router = new KoaRouter();

BASE_URL = "/v1/users";

user_not_exist_msg = "User does not exist.";

general_err_msg = "An error occured while processing this request.";

// function err_handle(ctx, err=null, err_msg=null) {
//     if (err) {
//         console.log(err);
//         ctx.status = 400;
//         ctx.body = {
//             status: 'error',
//             message: err.message || 'Sorry, an error has occurred.'
//         };
//     } else {
//         ctx.status = 404;
//         ctx.body = {
//             status: 'error',
//             message: err_msg
//         }
//     }
// }

// // get all users
// router.get(BASE_URL, async (ctx) => {
//     try {
//         const users = await queries.getAllUsers();
//         ctx.body = {
//             status: 'success',
//             data: users
//         };
//     } catch (err) {
//         err_handle(ctx, err);
//     }
// })

// // get user by user_id
// router.get(`${BASE_URL}/:user_id`, async (ctx) => {
//     try {
//         const user = await queries.getUserByID(ctx.params.user_id);
//         if (user.length) {
//             ctx.body = {
//                 status: 'success',
//                 data: user
//             };
//         } else {
//             err_handle(ctx, null, user_not_exist_msg);
//         }
//     } catch (err) {
//         err_handle(ctx, err);
//     }
// })

// // add new user
// // TODO: validate payload.
// router.post(`${BASE_URL}`, async (ctx) => {
//     try {
//         const user = await queries.addUser(ctx.request.body);
//         if (user.length) {
//             ctx.status = 201;
//             ctx.body = {
//                 status: 'success',
//                 data: user
//             }
//         } else {
//             err_handle(ctx, null, general_err_msg);
//         }
//     } catch(err) {
//         err_handle(ctx, err);
//     }
// })

// // update existing user
// router.put(`${BASE_URL}/:user_id`, async (ctx) => {
//     try {
//         const user = await queries.updateUser(ctx.params.user_id, ctx.request.body);
//         if (user.length) {
//             ctx.status = 200;
//             ctx.body = {
//             status: 'success',
//             data: user
//             };
//         } else {
//             err_handle(ctx, null, user_not_exist_msg);
//         }
//     } catch (err) {
//         err_handle(ctx, err);
//     }
//   })

// // delete user
// router.del(`${BASE_URL}/:user_id`, async (ctx) => {
//     try {
//         const user = await queries.deleteUser(ctx.params.user_id);
//         if (user.length) {
//           ctx.status = 200;
//           ctx.body = {
//             status: 'success',
//             data: user
//           };
//         } else {
//             err_handle(ctx, null, user_not_exist_msg);
//         }
//     } catch (err) {
//         err_handle(ctx, err);
//     }
// })

const test = (a, b) => {
  return a - b;
};

module.exports = router;
