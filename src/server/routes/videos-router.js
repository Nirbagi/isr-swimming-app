const KoaRouter = require("koa-joi-router");
const videoQueries = require("../db/queries/training_videos");
const {
  get_videos_schema,
  create_video_schema,
  update_video_schema,
  delete_video_schema,
} = require("../services/shcema_validators/videos_schemas");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  const params = await get_videos_schema.validateAsync(ctx.request.query);
  const videos = await videoQueries.getVideos(params);
  ctx.status = 200;
  ctx.body = videos;
});

// higher authorization level required

router.post("/add", async (ctx) => {
  const params = await create_video_schema.validateAsync(ctx.request.body);
  const video_id = await videoQueries.addVideo(params);
  ctx.status = 201;
  ctx.body = { status: "created", video_id: video_id };
});

router.patch("/edit/:video_id", async (ctx) => {
  const params = await update_video_schema.validateAsync(
    Object.assign({}, { video_id: ctx.params.video_id }, ctx.request.body)
  );
  const video_id = await videoQueries.updateVideo(params);
  ctx.status = 200;
  ctx.body = { status: "updated", video_id: video_id };
});

router.delete("/edit/:video_id", async (ctx) => {
  const params = await delete_video_schema.validateAsync({
    video_id: ctx.params.video_id,
  });
  const video_id = await videoQueries.deleteVideo(params.video_id);
  ctx.status = 200;
  ctx.body = { status: "deleted", video_id: video_id };
});

router.prefix("/videos");

module.exports = router;
