const KoaRouter = require("koa-joi-router");
const teamsQueries = require("../db/queries/teams");
const teamMembersQueries = require("../db/queries/teams_members");
const joinQueries = require("../db/queries/join_queries");

const {
  get_team_schema,
  create_team_schema,
  update_team_schema,
  delete_team_schema,
} = require("../services/shcema_validators/teams_schemas");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  const team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  ctx.status = 200;
  ctx.body = { team_id: team_id };
});

router.get("/members", async (ctx) => {
  const team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  const members = await joinQueries.getTeamMembersByTeamID(team_id);
  ctx.status = 200;
  ctx.body = { test: members };
});

// higher authorization level required

router.get("/all", async (ctx) => {
  const params = await get_team_schema.validateAsync(ctx.request.query);
  const announcements = await teamsQueries.getAnnouncements(params);
  ctx.status = 200;
  ctx.body = announcements;
});

router.post("/add", async (ctx) => {
  const params = await create_team_schema.validateAsync(ctx.request.body);
  const ancmt_id = await teamsQueries.createAnnouncement(
    ctx.session.user_id,
    params
  );
  ctx.status = 201;
  ctx.body = { status: "created", announcements_id: ancmt_id };
});

router.patch("/edit/:team_id", async (ctx) => {
  const params = await update_team_schema.validateAsync(
    Object.assign(
      {},
      { announcement_id: ctx.params.ancmt_id },
      ctx.request.body
    )
  );
  const ancmt_id = await teamsQueries.updateAnnouncement(
    ctx.session.user_id,
    params
  );
  ctx.status = 200;
  ctx.body = { status: "updated", announcement_id: ancmt_id };
});

router.delete("/edit/:team_id", async (ctx) => {
  const params = await delete_team_schema.validateAsync({
    announcement_id: ctx.params.ancmt_id,
  });
  const ancmt_id = await teamsQueries.deleteAnnouncement(
    params.announcement_id
  );
  ctx.status = 200;
  ctx.body = { status: "deleted", announcement_id: ancmt_id };
});

router.prefix("/team");

module.exports = router;
