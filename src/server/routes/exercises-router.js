const KoaRouter = require("koa-joi-router");
const exercisesQueries = require("../db/queries/exercises");

const {
  add_exercise_schema,
  update_exercise_schema,
  get_exercises_schema,
  delete_exercise_schema,
} = require("../services/shcema_validators/exercises_schemas");

const router = new KoaRouter();

router.get("/public", async (ctx) => {
  const params = await get_exercises_schema.validateAsync(ctx.request.query);
  const exercises = await exercisesQueries.getPublicExercises(params);
  ctx.status = 200;
  ctx.body = exercises;
});

// higher authorization level required
router.post("/add", async (ctx) => {
  let params = await add_exercise_schema.validateAsync(ctx.request.body);
  params = Object.assign({}, { coach_id: ctx.session.user_id }, params);
  const exercise_id = await exercisesQueries.addExercise(params);
  ctx.status = 200;
  ctx.body = { exercise_id: exercise_id };
});

router.get("/coach", async (ctx) => {
  let params = await get_exercises_schema.validateAsync(ctx.request.query);
  params = Object.assign({}, { coach_id: ctx.session.user_id }, params);
  const exercises = await exercisesQueries.getCoachExercises(params);
  ctx.status = 200;
  ctx.body = exercises;
});

router.patch("/edit/:exercise_id", async (ctx) => {
  const params = await update_exercise_schema.validateAsync(
    Object.assign({}, { exercise_id: ctx.params.exercise_id }, ctx.request.body)
  );
  const exercise_id = await exercisesQueries.updateExercise(params);
  ctx.status = 200;
  ctx.body = { status: "updated", exercise_id: exercise_id };
});

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
