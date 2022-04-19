const KoaRouter = require("koa-joi-router");
const passport = require("koa-passport");
const queries = require("../db/queries/users");
const {
  auth_schema,
  login_schema,
} = require("../services/shcema_validators/auth_schemas");

const router = new KoaRouter();

router.post("/register", async (ctx) => {
  const params = await auth_schema.validateAsync(ctx.request.body);
  params.role_id = 4;
  await queries.addUser(params);
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

router.post("/login", async (ctx) => {
  await login_schema.validateAsync(ctx.request.body);
  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.session.user_id = user.user_id;
      ctx.status = 200;
      ctx.body = { status: "successfully logged in." };
    } else {
      ctx.throw(500, "Unable to login. check your username or password.");
    }
  })(ctx);
});

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
