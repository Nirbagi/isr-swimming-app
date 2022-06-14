const KoaRouter = require("koa-joi-router");
const passport = require("koa-passport");
const queries = require("../db/queries/users");
const {
  auth_schema,
  login_schema,
} = require("../services/shcema_validators/auth_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     description: User registration.
 *     tags: [UserAuthentication]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: user_info
 *       description: User info for registration.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userRegistration'
 *     responses:
 *       200:
 *         description: registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Status'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/register", async (ctx) => {
  const params = await auth_schema.validateAsync(ctx.request.body);
  try {
    await queries.addUser(params);
  } catch (err) {
    ctx.throw(400, err.detail);
  }
  return passport.authenticate("local", (err, user, info, status) => {
    console.log(ctx);
    if (user) {
      ctx.login(user);
      ctx.session.user_id = user.user_id;
      ctx.status = 200;
      ctx.body = { status: "registered successfully." };
    } else {
      ctx.throw(500, "Unable to register user.");
    }
  })(ctx);
});

/**
 * @swagger
 * /users/auth/login:
 *   post:
 *     description: User login.
 *     tags: [UserAuthentication]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: user_login
 *       description: Username and password are required for logging in.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userLogin'
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Status'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/login", async (ctx) => {
  await login_schema.validateAsync(ctx.request.body);
  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.session.user_id = user.user_id;
      ctx.status = 200;
      ctx.body = { status: "successfully logged in." };
    } else {
      ctx.throw(400, "Unable to login. check your username or password.");
    }
  })(ctx);
});

/**
 * @swagger
 * /users/auth/logout:
 *   post:
 *     description: User logout.
 *     tags: [UserAuthentication]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Status'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/logout", async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.status = 200;
    ctx.body = { status: "logged out successfully." };
  } else {
    ctx.throw(500, "Unable to logout");
  }
});

router.prefix("/users/auth");

module.exports = router;
