const KoaRouter = require("koa-joi-router");
const exercisesQueries = require("../db/queries/exercises");
const joinQueries = require("../db/queries/join_queries");

const {
  add_exercise_schema,
  update_exercise_schema,
  get_exercises_schema,
  get_exp_exercises_schema,
  delete_exercise_schema,
} = require("../services/shcema_validators/exercises_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /exercises:
 *   get:
 *     description: Get all exercises trainee has done until now.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: exercises names & ids list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExpExercisesList'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/", async (ctx) => {
  const exercises = await joinQueries.getExperiencedExercises({
    user_id: ctx.session.user_id,
  });
  ctx.status = 200;
  ctx.body = exercises;
});

/**
 * @swagger
 * /exercises/public:
 *   get:
 *     description: Get public exercises. Public exercises are exercises that the coaches choose to share.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Public exercises.
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
router.get("/public", async (ctx) => {
  const params = await get_exercises_schema.validateAsync(ctx.request.query);
  const exercises = await exercisesQueries.getPublicExercises(params);
  ctx.status = 200;
  ctx.body = exercises;
});

// higher authorization level required

/**
 * @swagger
 * /exercises/add:
 *   post:
 *     description: Create new exercise. Coach or Admin authorization level is required.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: exercise_info
 *       description: Information about the new exercise.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addUpdateExercise'
 *     responses:
 *       201:
 *         description: Exercise created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExerciseCreated'
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
  let params = await add_exercise_schema.validateAsync(ctx.request.body);
  params = Object.assign({}, { coach_id: ctx.session.user_id }, params);
  const exercise_id = await exercisesQueries.addExercise(params);
  ctx.status = 200;
  ctx.body = { exercise_id: exercise_id };
});

/**
 * @swagger
 * /exercises/coach:
 *   get:
 *     description: Get coach private exercises. Coach or Admin authorization level is required.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *     responses:
 *       200:
 *         description: Coach private exercises.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExercisesList'
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
  let params = await get_exercises_schema.validateAsync(ctx.request.query);
  params = Object.assign({}, { coach_id: ctx.session.user_id }, params);
  const exercises = await exercisesQueries.getCoachExercises(params);
  ctx.status = 200;
  ctx.body = exercises;
});

/**
 * @swagger
 * /exercises/coach/trainee:
 *   get:
 *     description: Get all exercises specific trainee has done until now. Coach authorization level is required.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userIdQuery'
 *     responses:
 *       200:
 *         description: exercises names & ids list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExpExercisesList'
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
router.get("/coach/trainee", async (ctx) => {
  const params = await get_exp_exercises_schema.validateAsync(
    ctx.request.query
  );
  const exercises = await joinQueries.getExperiencedExercises(params);
  ctx.status = 200;
  ctx.body = exercises;
});

/**
 * @swagger
 * /exercises/edit/{exercise_id}:
 *   patch:
 *     description: Update existing exercise. Coach or Admin authorization level is required.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: exercise_info
 *       description: Information changed about the exercise.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addUpdateExercise'
 *     responses:
 *       200:
 *         description: Exercise updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExerciseUpdated'
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
router.patch("/edit/:exercise_id", async (ctx) => {
  const params = await update_exercise_schema.validateAsync(
    Object.assign({}, { exercise_id: ctx.params.exercise_id }, ctx.request.body)
  );
  const exercise_id = await exercisesQueries.updateExercise(params);
  ctx.status = 200;
  ctx.body = { status: "updated", exercise_id: exercise_id };
});

/**
 * @swagger
 * /exercises/edit/{exercise_id}:
 *   delete:
 *     description: Delete existing exercise. Coach or Admin authorization level is required.
 *     tags: [Exercises]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/exerciseId'
 *     responses:
 *       200:
 *         description: Exercise has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ExerciseDeleted'
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
router.delete("/edit/:exercise_id", async (ctx) => {
  const params = await delete_exercise_schema.validateAsync({
    exercise_id: ctx.params.exercise_id,
  });
  const exercise_id = await exercisesQueries.deleteExercise(params);
  ctx.status = 200;
  ctx.body = { status: "deleted", exercise_id: exercise_id };
});

router.prefix("/exercises");

module.exports = router;
