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

router.patch("/edit/:event_id", async (ctx) => {
  const params = await update_event_schema.validateAsync(
    Object.assign({}, { event_id: ctx.params.event_id }, ctx.request.body)
  );
  try {
    const event_id = await eventsQueries.updateEvent(
      ctx.session.user_id,
      params
    );
    ctx.status = 200;
    ctx.body = { status: "updated", event_id: event_id };
  } catch (err) {
    ctx.throw(500, `failed to edit event, id num: ${params.event_id}`);
  }
});

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
