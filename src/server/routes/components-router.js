const KoaRouter = require("koa-joi-router");

const router = new KoaRouter();

/**
 * @swagger
 * /components:
 *   get:
 *     description: Get components to render based on role.
 *     tags: [Components]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: list of components to render.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Components'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ServerError'
 */
router.get("/", async (ctx) => {
  ctx.status = 200;
  switch (ctx.role_id) {
    case 1:
      ctx.body = ["home", "video-lib", "about-app", "about-us", "admin-panel"];
      break;
    case 2:
      ctx.body = [
        "home",
        "video-lib",
        "about-app",
        "about-us",
        "profile-stack-coach",
        "exercises-pool",
      ];
      break;
    case 3:
      ctx.body = [
        "home",
        "video-lib",
        "about-app",
        "about-us",
        "profile-stack-trainee",
        "trainee-stats",
      ];
      break;
    case 4:
      ctx.body = [
        "home",
        "video-lib",
        "about-app",
        "about-us",
        "profile-stack-trainee",
      ];
      break;
    default:
      ctx.body = [];
  }
});

router.prefix("/components");

module.exports = router;
