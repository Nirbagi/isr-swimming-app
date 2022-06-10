const KoaRouter = require("koa-joi-router");
const teamsQueries = require("../db/queries/teams");
const teamMembersQueries = require("../db/queries/teams_members");
const joinQueries = require("../db/queries/join_queries");

const {
  get_teams_schema,
  get_coach_teams_schema,
  create_team_schema,
  update_team_schema,
  delete_team_schema,
  assign_user_to_team_schema,
  unassign_user_from_team_schema,
} = require("../services/shcema_validators/teams_schemas");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  const team = await joinQueries.getTeamDetailsByUserID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = { team_id: team.team_id, team_name: team.name };
});

// TODO: fix this endpoint
router.get("/members", async (ctx) => {
  const team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  const members = await joinQueries.getTeamMembersByTeamID(team_id);
  ctx.status = 200;
  ctx.body = { test: members };
});

// higher authorization level required
// TODO: fix Announcements queries in team
router.get("/all", async (ctx) => {
  const params = await get_teams_schema.validateAsync(ctx.request.query);
  const teams = await teamsQueries.getTeams(params);
  ctx.status = 200;
  ctx.body = teams;
});

router.get("/coach", async (ctx) => {
  const params = await get_coach_teams_schema.validateAsync(
    Object.assign({}, { coach_id: ctx.session.user_id }, ctx.request.query)
  );
  const teams = await teamsQueries.getCoachTeams(params);
  ctx.status = 200;
  ctx.body = teams;
});

router.post("/assign", async (ctx) => {
  const params = await assign_user_to_team_schema.validateAsync(
    ctx.request.query
  );
  // first check if already assigned to team
  user_info = await joinQueries.getUserincludeTeamInfo(params);
  //if yes - update existing entry
  if (user_info.team_id) {
    assigned = await teamMembersQueries.updateUserTeam(params);
  }
  // if not - create new entry
  else {
    assigned = await teamMembersQueries.addUserToTeam(params);
  }
  ctx.status = 200;
  ctx.body = assigned;
});

router.delete("/unassign", async (ctx) => {
  const params = await unassign_user_from_team_schema.validateAsync(
    ctx.request.query
  );
  await teamMembersQueries.removeUserFromTeam(params);
  ctx.status = 200;
  ctx.body = { status: "unassigned from team successfully." };
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
