const KoaRouter = require("koa-joi-router");
const queries = require("../db/queries/users");

const router = new KoaRouter();

router.get("/info", async (ctx) => {
  const user_info = await queries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.post("/info", async (ctx) => {
  const user_info = await queries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.patch("/info", async (ctx) => {
  const user_info = await queries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.delete("/info", async (ctx) => {
  const user_info = await queries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.prefix("/scores/training");

module.exports = router;
