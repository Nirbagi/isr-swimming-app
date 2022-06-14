const KoaRouter = require("koa-joi-router");
const ancmtQueries = require("../db/queries/announcements");
const teamMembersQueries = require("../db/queries/teams_members");
const {
  get_ancmt_schema,
  get_team_ancmt_schema,
  create_ancmt_schema,
  update_ancmt_schema,
  delete_ancmt_schema,
} = require("../services/shcema_validators/announcements_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /announcements/general:
 *   get:
 *     description: Announcements intended for the general user.
 *     tags: [Announcements]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Announcements list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/GeneralAnnouncements'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
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

/**
 * @swagger
 * /announcements:
 *   get:
 *     description: Announcements intended for a specific team. Team will be selected based on logged in swimmer.
 *     tags: [Announcements]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Announcements list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamAnnouncements'
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
  const params = await get_ancmt_schema.validateAsync(ctx.request.query);
  team_id = await teamMembersQueries.getTeamIDByUserID(ctx.session.user_id);
  params.team_id = team_id;
  try {
    const announcements = await ancmtQueries.getAnnouncements(params);
    ctx.status = 200;
    ctx.body = announcements;
  } catch (err) {
    console.log(err);
    ctx.throw(500, "failed to load announcements.");
  }
});

//-------------higher authorization level required-------------//

/**
 * @swagger
 * /announcements/team/{team_id}:
 *   get:
 *     description: Announcements intended for a specific team - for coach to view announcement for one of his assigned teams. Coach or Admin authorization level is required.
 *     tags: [Announcements]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *       - $ref: '#/parameters/teamIdPath'
 *     responses:
 *       200:
 *         description: Announcements list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamAnnouncements'
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
router.get("/team/:team_id", async (ctx) => {
  const params = await get_team_ancmt_schema.validateAsync(
    Object.assign({}, { team_id: ctx.params.team_id }, ctx.request.query)
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

/**
 * @swagger
 * /announcements/add:
 *   post:
 *     description: Create new announcement. Coach or Admin authorization level is required.
 *     tags: [Announcements]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: announcement
 *       description: The content of the announcement.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createAnnouncement'
 *     responses:
 *       201:
 *         description: Announcement created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CreatedAnnouncement'
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

/**
 * @swagger
 * /announcements/edit/{announcement_id}:
 *   patch:
 *     description: Update existing announcement. Coach or Admin authorization level is required.
 *     tags: [Announcements]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/announcementId'
 *     requestBody:
 *       name: announcement
 *       description: The content of the announcement.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateAnnouncement'
 *     responses:
 *       200:
 *         description: Announcement updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UpdatedAnnouncement'
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

/**
 * @swagger
 * /announcements/edit/{announcement_id}:
 *   delete:
 *     description: Delete existing announcement. Coach or Admin authorization level is required.
 *     tags: [Announcements]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/announcementId'
 *     responses:
 *       200:
 *         description: Announcement deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DeletedAnnouncement'
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
