const KoaRouter = require("koa-joi-router");
const passport = require("koa-passport");
const fs = require("fs");
const queries = require("../../db/queries/users");
const {
  auth_schema,
  login_schema,
} = require("../../helpers/schema_validators");

const router = new KoaRouter();

router.get("/register", async (ctx) => {
  ctx.type = "html";
  ctx.body = fs.createReadStream("./src/server/views/register.html");
});

router.post("/register", async (ctx) => {
  if (!("role" in ctx.request.body)) ctx.request.body.role_id = 1;
  const validated = await auth_schema.validateAsync(ctx.request.body);
  await queries.addUser(validated);
  return passport.authenticate("local", (err, user, info, status) => {
    console.log(ctx);
    if (user) {
      ctx.login(user);
      ctx.session.user_id = user.user_id;
      ctx.status = 200;
      ctx.body = { status: "registered successfully." };
      // ctx.redirect("/users/auth/status");
    } else {
      ctx.throw(500, "Unable to reguster user.");
    }
  })(ctx);
});

router.get("/status", async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("./src/server/views/status.html");
  } else {
    ctx.redirect("/users/auth/login");
  }
});

router.get("/login", async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("./src/server/views/login.html");
  } else {
    ctx.redirect("/users/auth/status");
  }
});

router.post("/login", async (ctx) => {
  await login_schema.validateAsync(ctx.request.body);
  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.session.user_id = user.user_id;
      ctx.status = 200;
      ctx.body = { status: "successfully logged in." };
      // ctx.redirect("/users/auth/status");
    } else {
      ctx.throw(500, "Unable to login. check your username or password.");
    }
  })(ctx);
});

router.get("/logout", async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect("/users/auth/login");
  } else {
    ctx.throw(500, "Unable to logout");
  }
});

router.prefix("/users/auth");

module.exports = router;
