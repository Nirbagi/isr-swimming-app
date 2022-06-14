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
  get_team_members_schema,
  assign_unassign_to_team_schema,
} = require("../services/shcema_validators/teams_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /team:
 *   get:
 *     description: Get team information.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Team information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamInfo'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/", async (ctx) => {
  const team = await joinQueries.getTeamDetailsByUserID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = { team_id: team.team_id, team_name: team.name };
});

/**
 * @swagger
 * /team/members:
 *   get:
 *     description: Get team members.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Team members.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamsMembers'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/members", async (ctx) => {
  const team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  const members = await joinQueries.getTeamMembersByTeamID(team_id);
  ctx.status = 200;
  ctx.body = members;
});

// higher authorization level required

/**
 * @swagger
 * /team/all:
 *   get:
 *     description: Get teams information. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Teams information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Teamsinformation'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/all", async (ctx) => {
  const params = await get_teams_schema.validateAsync(ctx.request.query);
  const teams = await teamsQueries.getTeams(params);
  ctx.status = 200;
  ctx.body = teams;
});

/**
 * @swagger
 * /team/coach/members:
 *   get:
 *     description: Get team members for one of coach's teams. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/teamIdQuery'
 *     responses:
 *       200:
 *         description: Team members.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamsMembers'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/coach/members", async (ctx) => {
  const params = await get_team_members_schema.validateAsync(ctx.request.query);
  const members = await joinQueries.getTeamMembersByTeamID(params.team_id);
  ctx.status = 200;
  ctx.body = members;
});

/**
 * @swagger
 * /team/coach:
 *   get:
 *     description: Get team assigned to coach. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Teams.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Teamsinformation'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/coach", async (ctx) => {
  const params = await get_coach_teams_schema.validateAsync(
    Object.assign({}, { coach_id: ctx.session.user_id }, ctx.request.query)
  );
  const teams = await teamsQueries.getCoachTeams(params);
  ctx.status = 200;
  ctx.body = teams;
});

/**
 * @swagger
 * /team/assign:
 *   post:
 *     description: Assign user to team. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/teamIdQuery'
 *       - $ref: '#/parameters/userIdQuery'
 *     responses:
 *       200:
 *         description: Teams.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AssignedToTeam'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/assign", async (ctx) => {
  const params = await assign_unassign_to_team_schema.validateAsync(
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

/**
 * @swagger
 * /team/unassign:
 *   post:
 *     description: Unassign user from team. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/teamIdQuery'
 *       - $ref: '#/parameters/userIdQuery'
 *     responses:
 *       200:
 *         description: Teams.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AssignedToTeam'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/unassign", async (ctx) => {
  const params = await assign_unassign_to_team_schema.validateAsync(
    ctx.request.query
  );
  await teamMembersQueries.removeUserFromTeam(params);
  ctx.status = 200;
  ctx.body = { status: "unassigned from team successfully." };
});

/**
 * @swagger
 * /team/add:
 *   post:
 *     description: Create new team. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: team
 *       description: Information about the new team.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUpdateTeam'
 *     responses:
 *       201:
 *         description: Team created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/createdTeamStatus'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/add", async (ctx) => {
  const params = await create_team_schema.validateAsync(ctx.request.body);
  const team = await teamsQueries.createTeam(params);
  ctx.status = 201;
  ctx.body = { status: "created", team_id: team.team_id };
});

/**
 * @swagger
 * /team/edit/{team_id}:
 *   patch:
 *     description: Update existing team information. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/teamIdPath'
 *     requestBody:
 *       name: team
 *       description: Changed information about the team.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUpdateTeam'
 *     responses:
 *       200:
 *         description: Team updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/updatedTeamStatus'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.patch("/edit/:team_id", async (ctx) => {
  const params = await update_team_schema.validateAsync(
    Object.assign({}, { team_id: ctx.params.team_id }, ctx.request.body)
  );
  const team = await teamsQueries.updateTeam(params);
  ctx.status = 200;
  ctx.body = { status: "updated", team_id: team.team_id };
});

/**
 * @swagger
 * /team/edit/{team_id}:
 *   delete:
 *     description: delete team. Coach or Admin authorization level is required.
 *     tags: [Teams]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/teamIdPath'
 *     responses:
 *       200:
 *         description: Team has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/deletedTeamStatus'
 *       401:
 *         description: Not logged in or higher authorization level is required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.delete("/edit/:team_id", async (ctx) => {
  const params = await delete_team_schema.validateAsync({
    team_id: ctx.params.team_id,
  });
  const team = await teamsQueries.deleteTeam(params.team_id);
  ctx.status = 200;
  ctx.body = { status: "deleted", team_id: team.team_id };
});

router.prefix("/team");

module.exports = router;
