const KoaRouter = require("koa-joi-router");
const userQueries = require("../db/queries/users");
const teamQueries = require("../db/queries/teams");
const joinQueries = require("../db/queries/join_queries");
const {
  get_user_info_schema,
  get_coache_info_schema,
  get_user_by_user_id_schema,
  get_user_role_schema,
  edit_role_schema,
  edit_user_schema,
  admin_edit_user_schema,
} = require("../services/shcema_validators/users_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /users/info:
 *   get:
 *     description: Get registered user information.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserInfo'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/info", async (ctx) => {
  const user_info = await userQueries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

/**
 * @swagger
 * /users/info:
 *   patch:
 *     description: Update user information.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: user_info
 *       description: The user information to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUserInfo'
 *     responses:
 *       200:
 *         description: Update status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserUpdated'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.patch("/info", async (ctx) => {
  const params = await edit_user_schema.validateAsync(ctx.request.body);
  const user_id = await userQueries.updateUser(
    Object.assign({}, { user_id: ctx.session.user_id }, params)
  );
  ctx.status = 200;
  ctx.body = { status: "updated", user_id: user_id };
});

// higher authorization level required

/**
 * @swagger
 * /users/coaches:
 *   get:
 *     description: Get list of ISA coaches and their information. Admin authorization level is required.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Coaches information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CoachesInfo'
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
router.get("/coaches", async (ctx) => {
  params = await get_coache_info_schema.validateAsync(ctx.request.query);
  const coaches_info = await joinQueries.getCoachesincludeTeamInfo(params);
  ctx.status = 200;
  ctx.body = coaches_info;
});

/**
 * @swagger
 * /users/user_info/{user_id}:
 *   get:
 *     description: Get user information by internal ID number. Coach or Admin authorization level is required.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     responses:
 *       200:
 *         description: User information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserInfo'
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
router.get("/user_info/:user_id", async (ctx) => {
  params = await get_user_info_schema.validateAsync({
    user_id: ctx.params.user_id,
  });
  // const user_info = await userQueries.getUserInfoByIDNumber(params.id_number);
  const user_info = await joinQueries.getUserincludeTeamInfo(params);
  ctx.status = 200;
  ctx.body = user_info;
});

/**
 * @swagger
 * /users/user_info/{id_number}:
 *   get:
 *     description: Get user information by Israeli ID number. Coach or Admin authorization level is required.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/idNumber'
 *     responses:
 *       200:
 *         description: User information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserInfo'
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
router.get("/user_info/:id_number", async (ctx) => {
  params = await get_user_info_schema.validateAsync({
    id_number: ctx.params.id_number,
  });
  // const user_info = await userQueries.getUserInfoByIDNumber(params.id_number);
  const user_info = await joinQueries.getUserincludeTeamInfo(params);
  ctx.status = 200;
  ctx.body = user_info;
});

/**
 * @swagger
 * /users/user_info/{user_id}}:
 *   patch:
 *     description: Update user information. Coach or Admin authorization level is required.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     requestBody:
 *       name: user_info
 *       description: The user information to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/adminUpdateUserInfo'
 *     responses:
 *       200:
 *         description: Update status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserUpdated'
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
router.patch("/user_info/:user_id", async (ctx) => {
  params = await admin_edit_user_schema.validateAsync(
    Object.assign({}, { user_id: ctx.params.user_id }, ctx.request.body)
  );
  const user_id = await userQueries.updateUser(params);
  ctx.status = 200;
  ctx.body = { status: "updated", user_id: user_id };
});

/**
 * @swagger
 * /users/role/{user_id}:
 *   get:
 *     description: Get user role information. Admin authorization level is required.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     responses:
 *       200:
 *         description: User role information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserRoleInformation'
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
router.get("/role/:user_id", async (ctx) => {
  params = await get_user_role_schema.validateAsync({
    user_id: ctx.params.user_id,
  });
  const role = await joinQueries.getUserRoleNameID(params.user_id);
  ctx.status = 200;
  ctx.body = role;
});

/**
 * @swagger
 * /users/role/edit/{user_id}:
 *   patch:
 *     description: Update user role. Admin authorization level is required.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *       - $ref: '#/parameters/roleId'
 *     responses:
 *       200:
 *         description: Update status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserRoleUpdated'
 *       400:
 *         description: User or coach assigned to team.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NotAuthenticatedError'
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
router.patch("/role/edit/:user_id", async (ctx) => {
  const params = await edit_role_schema.validateAsync(
    Object.assign({}, { user_id: ctx.params.user_id }, ctx.request.query)
  );
  current_role_id = await userQueries.getUserRoleByID(params.user_id);
  if (current_role_id == 3) {
    // check if not belong to any team
    const user_info = await joinQueries.getUserincludeTeamInfo(params);
    if (user_info.team_id)
      ctx.throw(
        400,
        "User assigned to team. Unassign him before trying to change role."
      );
  }
  if (current_role_id == 2) {
    // check if not coach of any team
    const coach_info = teamQueries.getCoachTeams({ coach_id: params.user_id });
    if (coach_info)
      ctx.throw(
        400,
        "Coach assigned as a team coach. Unassign him before trying to change role."
      );
  }
  const updated = await userQueries.updateUserRoleID(params);
  ctx.status = 200;
  ctx.body = {
    status: "updated",
    user_id: updated.user_id,
    role_id: updated.role_id,
  };
});

router.prefix("/users");

module.exports = router;
