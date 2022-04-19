const KoaRouter = require("koa-joi-router");
const ancmtQueries = require("../db/queries/announcements");
const {
  get_ancmt_schema,
  create_ancmt_schema,
  update_ancmt_schema,
  delete_ancmt_schema,
} = require("../services/shcema_validators/announcements_schemas");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  const params = await get_ancmt_schema.validateAsync(ctx.request.query);
  // if requesting general announcements
  const announcements = await ancmtQueries.getAnnouncements(params);
  ctx.status = 200;
  ctx.body = announcements;
});

// higher authorization level required

router.post("/add", async (ctx) => {
  const params = await create_ancmt_schema.validateAsync(ctx.request.body);
  const ancmt_id = await ancmtQueries.createAnnouncement(
    ctx.session.user_id,
    params
  );
  ctx.status = 201;
  ctx.body = { status: "created", announcements_id: ancmt_id };
});

router.patch("/edit/:announcement_id", async (ctx) => {
  const params = await update_ancmt_schema.validateAsync(
    Object.assign(
      {},
      { announcement_id: ctx.params.ancmt_id },
      ctx.request.body
    )
  );
  const ancmt_id = await ancmtQueries.updateAnnouncement(
    ctx.session.user_id,
    params
  );
  ctx.status = 200;
  ctx.body = { status: "updated", announcement_id: ancmt_id };
});

router.delete("/edit/:announcement_id", async (ctx) => {
  const params = await delete_ancmt_schema.validateAsync({
    announcement_id: ctx.params.ancmt_id,
  });
  const ancmt_id = await ancmtQueries.deleteAnnouncement(
    params.announcement_id
  );
  ctx.status = 200;
  ctx.body = { status: "deleted", announcement_id: ancmt_id };
});

router.prefix("/announcements");

module.exports = router;
