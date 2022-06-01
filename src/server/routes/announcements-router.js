const KoaRouter = require("koa-joi-router");
const ancmtQueries = require("../db/queries/announcements");
const teamMembersQueries = require("../db/queries/teams_members");
const {
  get_ancmt_schema,
  create_ancmt_schema,
  update_ancmt_schema,
  delete_ancmt_schema,
} = require("../services/shcema_validators/announcements_schemas");

const router = new KoaRouter();

router.get("/general", async (ctx) => {
  const params = await get_ancmt_schema.validateAsync(ctx.request.query);
  params.team_id = null;
  try {
    const announcements = await ancmtQueries.getAnnouncements(params);
    ctx.status = 200;
    ctx.body = announcements;
  } catch (err) {
    ctx.throw(500, "failed to load announcements.", err.msg);
  }
});

// TODO: add author name
router.get("/", async (ctx) => {
  const params = await get_ancmt_schema.validateAsync(ctx.request.query);
  params.team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  try {
    const announcements = await ancmtQueries.getAnnouncements(params);
    ctx.status = 200;
    ctx.body = announcements;
  } catch (err) {
    console.log(err);
    ctx.throw(500, "failed to load announcements.");
  }
});

// higher authorization level required
router.post("/add", async (ctx) => {
  const params = await create_ancmt_schema.validateAsync(ctx.request.body);
  try {
    const ancmt_id = await ancmtQueries.createAnnouncement(
      ctx.session.user_id,
      params
    );
    ctx.status = 201;
    ctx.body = { status: "created", announcements_id: ancmt_id };
  } catch (err) {
    ctx.throw(500, "failed to add announcement.");
  }
});

router.patch("/edit/:announcement_id", async (ctx) => {
  const params = await update_ancmt_schema.validateAsync(
    Object.assign(
      {},
      { announcement_id: ctx.params.announcement_id },
      ctx.request.body
    )
  );
  try {
    const ancmt_id = await ancmtQueries.updateAnnouncement(
      ctx.session.user_id,
      params
    );
    ctx.status = 200;
    ctx.body = { status: "updated", announcement_id: ancmt_id };
  } catch (err) {
    ctx.throw(
      500,
      `failed to edit announcement, id num: ${params.announcement_id}`
    );
  }
});

router.delete("/edit/:announcement_id", async (ctx) => {
  const params = await delete_ancmt_schema.validateAsync({
    announcement_id: ctx.params.announcement_id,
  });
  try {
    const ancmt_id = await ancmtQueries.deleteAnnouncement(
      params.announcement_id
    );
    ctx.status = 200;
    ctx.body = { status: "deleted", announcement_id: ancmt_id };
  } catch (err) {
    ctx.throw(
      500,
      `failed to delete announcement, id num: ${params.announcement_id}`
    );
  }
});

router.prefix("/announcements");

module.exports = router;
