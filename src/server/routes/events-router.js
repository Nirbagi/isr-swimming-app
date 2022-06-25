const KoaRouter = require("koa-joi-router");
const eventsQueries = require("../db/queries/events");
const teamMembersQueries = require("../db/queries/teams_members");

const {
  get_events_schema,
  get_team_events_schema,
  create_event_schema,
  update_event_schema,
  delete_event_schema,
} = require("../services/shcema_validators/events_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /events/general:
 *   get:
 *     description: ISA Events intended for the general user.
 *     tags: [Events]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Events list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/GeneralEvents'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/general", async (ctx) => {
  const params = await get_events_schema.validateAsync(ctx.request.query);
  params.team_id = null;
  try {
    const events = await eventsQueries.getEvents(params);
    ctx.status = 200;
    ctx.body = events;
  } catch (err) {
    ctx.throw(500, "failed to load events.", err.msg);
  }
});

/**
 * @swagger
 * /events:
 *   get:
 *     description: Events intended for a specific team. Team will be selected based on logged in swimmer.
 *     tags: [Events]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: ISA Events list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamEvents'
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
  const params = await get_events_schema.validateAsync(ctx.request.query);
  team_id = await teamMembersQueries.getTeamIDByUserID(ctx.session.user_id);
  params.team_id = team_id;
  try {
    const events = await eventsQueries.getEvents(params);
    ctx.status = 200;
    ctx.body = events;
  } catch (err) {
    console.log(err);
    ctx.throw(500, "failed to load events.");
  }
});

// higher authorization level required

/**
 * @swagger
 * /events/team/{team_id}:
 *   get:
 *     description: Events intended for a specific team - for coach to view events for one of his assigned teams. Coach or Admin authorization level is required.
 *     tags: [Events]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *       - $ref: '#/parameters/teamIdPath'
 *     responses:
 *       200:
 *         description: Events list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TeamEvents'
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
  const params = await get_team_events_schema.validateAsync(
    Object.assign({}, { team_id: ctx.params.team_id }, ctx.request.query)
  );
  try {
    const events = await eventsQueries.getEvents(params);
    ctx.status = 200;
    ctx.body = events;
  } catch (err) {
    console.log(err);
    ctx.throw(500, "failed to load events.");
  }
});

/**
 * @swagger
 * /events/add:
 *   post:
 *     description: Create new event. Coach or Admin authorization level is required.
 *     tags: [Events]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: event
 *       description: The event description.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createEvent'
 *     responses:
 *       201:
 *         description: Event created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CreatedEvent'
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
  const params = await create_event_schema.validateAsync(ctx.request.body);
  try {
    const event_id = await eventsQueries.createEvent(
      ctx.session.user_id,
      params
    );
    ctx.status = 201;
    ctx.body = { status: "created", event_id: event_id };
  } catch (err) {
    ctx.throw(500, "failed to add event.");
  }
});

/**
 * @swagger
 * /events/edit/{event_id}:
 *   patch:
 *     description: Update existing event. Coach or Admin authorization level is required.
 *     tags: [Events]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/eventId'
 *     requestBody:
 *       name: event
 *       description: The content of the Event.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateEvent'
 *     responses:
 *       200:
 *         description: Event updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UpdatedEvent'
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
router.patch("/edit/:event_id", async (ctx) => {
  const params = await update_event_schema.validateAsync(
    Object.assign({}, { event_id: ctx.params.event_id }, ctx.request.body)
  );
  try {
    const event_id = await eventsQueries.updateEvent(params);
    ctx.status = 200;
    ctx.body = { status: "updated", event_id: event_id };
  } catch (err) {
    ctx.throw(500, `failed to edit event, id num: ${params.event_id}`);
  }
});

/**
 * @swagger
 * /events/edit/{event_id}:
 *   delete:
 *     description: Delete existing event. Coach or Admin authorization level is required.
 *     tags: [Events]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/eventId'
 *     responses:
 *       200:
 *         description: Event deleted.
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
router.delete("/edit/:event_id", async (ctx) => {
  const params = await delete_event_schema.validateAsync({
    event_id: ctx.params.event_id,
  });
  try {
    const event_id = await eventsQueries.deleteEvent(params.event_id);
    ctx.status = 200;
    ctx.body = { status: "deleted", event_id: event_id };
  } catch (err) {
    ctx.throw(500, `failed to delete event, id num: ${params.event_id}`);
  }
});

router.prefix("/events");

module.exports = router;
