const KoaRouter = require("koa-joi-router");
const ancmtQueries = require("../db/queries/announcements");
const {
  get_ancmt_schema,
  create_ancmt_schema,
  update_ancmt_schema,
} = require("../services/shcema_validators/announcements_schemas");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  const params = await get_ancmt_schema.validateAsync(ctx.request.query);
  // if requesting general announcements
  const announcements = await ancmtQueries.getAnnouncements(
    params.skip,
    params.take,
    params.team_id
  );
  ctx.status = 200;
  ctx.body = announcements;
});

router.post("/add", async (ctx) => {
  const params = await create_ancmt_schema.validateAsync(ctx.request.body);
  const ancmt_id = await ancmtQueries.createAnnouncement(
    ctx.session.user_id,
    params.team_id,
    params.body
  );
  ctx.status = 201;
  ctx.body = { status: "created", announcements_id: ancmt_id };
});

router.patch("/edit/:ancmt_id", async (ctx) => {
  const params = await update_ancmt_schema.validateAsync(ctx.request.body);
  const ancmt_id = await ancmtQueries.updateAnnouncement(
    ctx.session.user_id,
    ctx.params.ancmt_id,
    params.body
  );
  ctx.status = 200;
  ctx.body = { status: "updated", msg_id: ancmt_id };
});

router.delete("/edit/:ancmt_id", async (ctx) => {
  const ancmt_id = await ancmtQueries.deleteAnnouncement(ctx.params.ancmt_id);
  ctx.status = 200;
  ctx.body = { status: "deleted", msg_id: ancmt_id };
});

router.prefix("/announcements");

module.exports = router;
