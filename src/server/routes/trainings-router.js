const KoaRouter = require("koa-joi-router");
const trainingsQueries = require("../db/queries/trainings");
const teamMembersQueries = require("../db/queries/teams_members");
const moment = require("moment");

const {
  expandExercises,
  expandMultipleTrainingsExercises,
} = require("../services/trainings");

const {
  add_training_schema,
  update_training_schema,
  get_trainings_schema,
  get_past_trainings_schema,
  delete_training_schema,
} = require("../services/shcema_validators/trainings_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /trainings/next:
 *   get:
 *     description: Get the next schedule training / test information.
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Next training / test information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TrainingInfo'
 *       204:
 *         description: There is no scheduled training.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NoScheduledTrainig'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/next", async (ctx) => {
  const team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  let training = await trainingsQueries.getNextTraining(team_id);
  if (training) {
    training.exercises = await expandExercises(training.exercises);
    mt = moment(training.target_date);
    training.target_date = moment(
      training.target_date.setHours(mt.utcOffset() / 60)
    ).format("YYYY-MM-DD");
    ctx.status = 200;
    ctx.body = training;
  } else {
    ctx.status = 204;
    ctx.body = { info: "there is no next training scheduled." };
  }
});

/**
 * @swagger
 * /trainings/exercises/expand:
 *   get:
 *     description: Expand short exercise format to full format which includes exercises information.
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: short_training_exercises_form
 *       description: Mapping between exercise order position in training to its exercise_id.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/expandTrainingsExercises'
 *     responses:
 *       200:
 *         description: Exercises information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExercisesList'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/exercises/expand", async (ctx) => {
  ctx.status = 200;
  ctx.body = await expandExercises(ctx.request.body);
});

/**
 * @swagger
 * /trainings/past:
 *   get:
 *     description: Get list of past trainings / tests of a trainee (including information about them)
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: List of past trainings / tests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CoachTrainingsList'
 *       204:
 *         description: There are'nt any past trainings / tests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NoConfiguredTrainigs'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/past", async (ctx) => {
  let params = await get_past_trainings_schema.validateAsync(ctx.request.query);
  params.team_id = await teamMembersQueries.getTeamIDByUserID(
    ctx.session.user_id
  );
  let trainings = await trainingsQueries.getPastTrainings(params);
  if (trainings) {
    trainings = await expandMultipleTrainingsExercises(trainings);
    for (tr in trainings) {
      mt = moment(trainings[tr].target_date);
      trainings[tr].target_date = moment(
        trainings[tr].target_date.setHours(mt.utcOffset() / 60)
      ).format("YYYY-MM-DD");
    }
    ctx.status = 200;
    ctx.body = trainings;
  } else {
    ctx.status = 204;
    ctx.body = { info: "there are'nt any past trainings / tests" };
  }
});

// higher authorization level required

/**
 * @swagger
 * /trainings/coach:
 *   get:
 *     description: Get list of configured trainings / tests of a coach (including information about them). Coach authorization level is required.
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: List of configured trainings / tests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CoachTrainingsList'
 *       204:
 *         description: There are'nt any configured trainings / tests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/NoConfiguredTrainigs'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/coach", async (ctx) => {
  let params = await get_trainings_schema.validateAsync(
    Object.assign({}, { coach_id: ctx.session.user_id }, ctx.request.query)
  );
  let trainings = await trainingsQueries.getCoachTrainings(params);
  if (trainings) {
    trainings = await expandMultipleTrainingsExercises(trainings);
    for (tr in trainings) {
      mt = moment(trainings[tr].target_date);
      trainings[tr].target_date = moment(
        trainings[tr].target_date.setHours(mt.utcOffset() / 60)
      ).format("YYYY-MM-DD");
    }
    ctx.status = 200;
    ctx.body = trainings;
  } else {
    ctx.status = 204;
    ctx.body = { info: "there are'nt any configured trainings / tests" };
  }
});

/**
 * @swagger
 * /trainings/add:
 *   post:
 *     description: Add new training / test to specific team. Coach authorization level is required.
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: training_info
 *       description: Training info with short form of exercises description (mapping between position to exercise_id).
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addTraining'
 *     responses:
 *       200:
 *         description: Training / Test created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TrainingCreated'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/add", async (ctx) => {
  let params = await add_training_schema.validateAsync(ctx.request.body);
  params = Object.assign({}, { coach_id: ctx.session.user_id }, params);
  const training_id = await trainingsQueries.addTraining(params);
  ctx.status = 200;
  ctx.body = { training_id: training_id };
});

/**
 * @swagger
 * /trainings/edit/{training_id}:
 *   patch:
 *     description: Update existing training / test. Coach authorization level is required.
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/trainingId'
 *     requestBody:
 *       name: training_info
 *       description: Training info to update.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateTraining'
 *     responses:
 *       200:
 *         description: Training / Test updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TrainingUpdated'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.patch("/edit/:training_id", async (ctx) => {
  const params = await update_training_schema.validateAsync(
    Object.assign({}, { training_id: ctx.params.training_id }, ctx.request.body)
  );
  const training_id = await trainingsQueries.updateTraining(params);
  ctx.status = 200;
  ctx.body = { status: "updated", training_id: training_id };
});

/**
 * @swagger
 * /trainings/edit/{training_id}:
 *   delete:
 *     description: Delete existing training / test. Coach authorization level is required.
 *     tags: [Trainings]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/trainingId'
 *     responses:
 *       200:
 *         description: Training / Test deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TrainingDeleted'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.delete("/edit/:training_id", async (ctx) => {
  const params = await delete_training_schema.validateAsync({
    training_id: ctx.params.training_id,
  });
  const training_id = await trainingsQueries.deleteTraining(params);
  ctx.status = 200;
  ctx.body = { status: "deleted", training_id: training_id };
});

router.prefix("/trainings");

module.exports = router;
