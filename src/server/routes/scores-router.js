const KoaRouter = require("koa-joi-router");
const scoresQueries = require("../db/queries/scores");
const { ExtractScoresArrays } = require("../services/scores");

const {
  validate_user,
  add_score_schema,
  get_ex_scores_schema,
  update_score_schema,
  delete_score_schema,
} = require("../services/shcema_validators/scores_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /scores/ex/{exercise_id}:
 *   get:
 *     description: Get exercise recorded scores based on time_duration / sets / reps / weight.
 *     tags: [Scores]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/exerciseId'
 *       - $ref: '#/parameters/scoreTypeQuery'
 *       - $ref: '#/parameters/isTestScoreQuery'
 *     responses:
 *       200:
 *         description: exercises recorded scores and dates of recording.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/GetExScores'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/ex/:exercise_id", async (ctx) => {
  let params = await get_ex_scores_schema.validateAsync(
    Object.assign({}, ctx.request.query, {
      exercise_id: ctx.params.exercise_id,
    })
  );
  params = Object.assign({}, { user_id: ctx.session.user_id }, params);
  const scores = await scoresQueries.getExScoresByUserID(params);
  ctx.status = 200;
  ctx.body = ExtractScoresArrays(params, scores);
});

/**
 * @swagger
 * /scores/add:
 *   post:
 *     description: add training exercises scores.
 *     tags: [Scores]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: trainings_exercises_scores
 *       description: exercises scores based on time_duration / sets / reps / weight and indication wether belongs to test or not.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addTrainingScores'
 *     responses:
 *       200:
 *         description: list of the added score_ids.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AddedScores'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.post("/add", async (ctx) => {
  let training_params = await add_score_schema.validateAsync(ctx.request.body);
  let scores = [];
  for (idx in training_params) {
    let params = training_params[idx];
    params = Object.assign({}, { user_id: ctx.session.user_id }, params);
    scores.push(await scoresQueries.addScore(params));
  }
  ctx.status = 201;
  ctx.body = { added_scores: scores };
});

// higher authorization level required

/**
 * @swagger
 * /scores/coach/add:
 *   post:
 *     description: add training exercises scores for specific user.
 *     tags: [Scores]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userIdQuery'
 *     requestBody:
 *       name: trainings_exercises_scores
 *       description: exercises scores based on time_duration / sets / reps / weight and indication wether belongs to test or not.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addTrainingScores'
 *     responses:
 *       200:
 *         description: list of the added score_ids.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AddedScores'
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
router.post("/coach/add", async (ctx) => {
  const user_id = await validate_user.validateAsync(ctx.request.query);
  let training_params = await add_score_schema.validateAsync(ctx.request.body);
  let scores = [];
  for (idx in training_params) {
    let params = training_params[idx];
    params = Object.assign({}, { user_id: user_id }, params);
    scores.push(await scoresQueries.addScore(params));
  }
  ctx.status = 201;
  ctx.body = { added_scores: scores };
});

/**
 * @swagger
 * /scores/edit/{ex_score_id}:
 *   patch:
 *     description: update exercise submitted score.
 *     tags: [Scores]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/scoreId'
 *     requestBody:
 *       name: exercise_score_info
 *       description: score info to update.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateScore'
 *     responses:
 *       200:
 *         description: score updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ScoreUpdated'
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
router.patch("/edit/:ex_score_id", async (ctx) => {
  const params = await update_score_schema.validateAsync(
    Object.assign({}, { ex_score_id: ctx.params.ex_score_id }, ctx.request.body)
  );
  const ex_score_id = await scoresQueries.updateScoreByScoreID(params);
  ctx.status = 200;
  ctx.body = { status: "score updated", ex_score_id: ex_score_id };
});

/**
 * @swagger
 * /scores/edit/{ex_score_id}:
 *   delete:
 *     description: delete exercise submitted score.
 *     tags: [Scores]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/scoreId'
 *     responses:
 *       201:
 *         description: Score deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ScoreDeleted'
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
router.delete("/edit/:ex_score_id", async (ctx) => {
  const params = await delete_score_schema.validateAsync({
    ex_score_id: ctx.params.ex_score_id,
  });
  const ex_score_id = await scoresQueries.deleteScore(params);
  ctx.status = 200;
  ctx.body = { status: "score deleted", ex_score_id: ex_score_id };
});

router.prefix("/scores");

module.exports = router;
