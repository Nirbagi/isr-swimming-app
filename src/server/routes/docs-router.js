const KoaRouter = require("koa-joi-router");
const { koaSwagger } = require("koa2-swagger-ui");
const openapiSpecification = require("../services/swagger/apispec");
const router = new KoaRouter();

router.get(
  "/v1/docs",
  koaSwagger({
    routePrefix: false,
    swaggerOptions: { spec: openapiSpecification },
  })
);

module.exports = router;
