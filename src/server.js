/*********************imports*********************/
const Koa = require("koa");
const JoiRouter = require("koa-joi-router");
const Morgan = require("koa-morgan");
const session = require("koa-session");
const passport = require("koa-passport");
const BodyParser = require("koa-bodyparser");
const enforceNodePath = require("enforce-node-path");

const trainingScoresRoutes = require("./server/routes/training-scores-router");
const usersRoutes = require("./server/routes/users-router");
const usersAuthRoutes = require("./server/routes/users-auth-router");
const AnnouncementsRoutes = require("./server/routes/announcements-router");
const VideosRoutes = require("./server/routes/videos-router");
const TeamRoutes = require("./server/routes/team-router");

const userQueries = require("./server/db/queries/users");
// env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/config/dev.env" });
}
/*********************imports*********************/

const app = new Koa();
const bodyparser = new BodyParser();
const PORT = 8585;

// enforce env var path to server.js
enforceNodePath(__dirname);

// sessions
app.keys = ["secret"];
app.use(session(app));

// authentication
require("./server/services/auth");
app.use(passport.initialize());
app.use(
  passport.session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(Morgan("combined"));
app.use(bodyparser);

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof JoiRouter.Joi.ValidationError) {
      ctx.status = 400;
    } else ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit("error", err, ctx);
  }
});

app.on("error", async (err, ctx) => {
  console.log(err);
});

// Authentication - middleware for getting role_id before request
app.use(async (ctx, next) => {
  const nonSecurePaths = [
    "/users/auth/login",
    "/users/auth/register",
    "/announcements/general",
    "/videos",
  ];
  if (!ctx.isAuthenticated() && !nonSecurePaths.includes(ctx.path)) {
    ctx.throw(401, "Not Authenticated");
  }
  if (ctx.isAuthenticated()) {
    ctx.role_id = await userQueries.getUserRoleByID(ctx.session.user_id);
  }
  await next();
});

// Authorization
app.use(async (ctx, next) => {
  const adminCoachPaths = [
    // users
    "/users/role",
    "/users/role/edit",
    "/users/user_info",
    // videos
    "/videos/add",
    "/videos/edit",
    //announcements
    "/announcements/add",
    "/announcements/edit",
  ];
  adminCoachPaths.forEach((path) => {
    if (ctx.role_id > 2 && ctx.path.includes(path)) {
      ctx.throw(401, "Not Authorized");
    }
  });

  await next();
});

// app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
app.use(usersAuthRoutes.middleware());
app.use(usersRoutes.middleware());
app.use(trainingScoresRoutes.middleware());
app.use(AnnouncementsRoutes.middleware());
app.use(VideosRoutes.middleware());
app.use(TeamRoutes.middleware());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
