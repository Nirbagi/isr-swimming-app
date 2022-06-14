const KoaRouter = require("koa-joi-router");
const videoQueries = require("../db/queries/training_videos");
const {
  get_videos_schema,
  create_video_schema,
  update_video_schema,
  delete_video_schema,
} = require("../services/shcema_validators/videos_schemas");

const router = new KoaRouter();

/**
 * @swagger
 * /videos:
 *   get:
 *     description: Get ISR Swimming Association training videos.
 *     tags: [TrainingVideos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/take'
 *       - $ref: '#/parameters/videoCategory'
 *       - $ref: '#/parameters/videoSubCategory'
 *     responses:
 *       200:
 *         description: Training videos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TrainingVideos'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/", async (ctx) => {
  const params = await get_videos_schema.validateAsync(ctx.request.query);
  const videos = await videoQueries.getVideos(params);
  ctx.status = 200;
  ctx.body = videos;
});

// higher authorization level required

/**
 * @swagger
 * /videos/add:
 *   post:
 *     description: Add new video to the video library. Coach or Admin authorization level is required.
 *     tags: [TrainingVideos]
 *     produces:
 *       - application/json
 *     requestBody:
 *       name: video
 *       description: Video information and description.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addVideo'
 *     responses:
 *       200:
 *         description: The video was successfully added to the library.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AddedVideo'
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
  const params = await create_video_schema.validateAsync(ctx.request.body);
  const video_id = await videoQueries.addVideo(params);
  ctx.status = 201;
  ctx.body = { status: "created", video_id: video_id };
});

/**
 * @swagger
 * /videos/edit/{video_id}:
 *   patch:
 *     description: Update information for existing video. Coach or Admin authorization level is required.
 *     tags: [TrainingVideos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/videoId'
 *     requestBody:
 *       name: video
 *       description: Video information for update.
 *       in: body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateVideo'
 *     responses:
 *       200:
 *         description: Video information was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UpdatedVideo'
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
router.patch("/edit/:video_id", async (ctx) => {
  const params = await update_video_schema.validateAsync(
    Object.assign({}, { video_id: ctx.params.video_id }, ctx.request.body)
  );
  const video_id = await videoQueries.updateVideo(params);
  ctx.status = 200;
  ctx.body = { status: "updated", video_id: video_id };
});

/**
 * @swagger
 * /videos/edit/{video_id}:
 *   delete:
 *     description: Delete video from internal library. Coach or Admin authorization level is required.
 *     tags: [TrainingVideos]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/videoId'
 *     responses:
 *       200:
 *         description: Video has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DeletedVideo'
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
