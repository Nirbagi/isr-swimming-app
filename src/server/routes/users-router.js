const KoaRouter = require("koa-joi-router");
const userQueries = require("../db/queries/users");
const joinQueries = require("../db/queries/join_queries");
const {
  get_user_info_schema,
  get_user_role_schema,
  edit_role_schema,
  edit_user_schema,
  admin_edit_user_schema,
} = require("../services/shcema_validators/users_schemas");

const router = new KoaRouter();

router.get("/info", async (ctx) => {
  const user_info = await userQueries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.patch("/info", async (ctx) => {
  const params = await edit_user_schema.validateAsync(ctx.request.body);
  const user_id = await userQueries.updateUser(
    Object.assign({}, { user_id: ctx.session.user_id }, params)
  );
  ctx.status = 200;
  ctx.body = { status: "updated", user_id: user_id };
});

// higher authorization level required

router.get("/user_info/:user_id", async (ctx) => {
  params = await get_user_info_schema.validateAsync({
    user_id: ctx.params.user_id,
  });
  const user_info = await userQueries.getUserInfoByID(params.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.patch("/user_info/:user_id", async (ctx) => {
  params = await admin_edit_user_schema.validateAsync(
    Object.assign({}, { user_id: ctx.params.user_id }, ctx.request.body)
  );
  const user_id = await userQueries.updateUser(params);
  ctx.status = 200;
  ctx.body = { status: "updated", user_id: user_id };
});

router.get("/role/:user_id", async (ctx) => {
  params = await get_user_role_schema.validateAsync({
    user_id: ctx.params.user_id,
  });
  const role = await joinQueries.getUserRoleNameID(params.user_id);
  ctx.status = 200;
  ctx.body = role;
});

router.patch("/role/edit/:user_id", async (ctx) => {
  const params = await edit_role_schema.validateAsync(
    Object.assign({}, { user_id: ctx.params.user_id }, ctx.request.body)
  );
  const updated = await userQueries.updateUserRoleID(params);
  ctx.status = 200;
  ctx.body = {
    status: "updated",
    user_id: updated.user_id,
    role_id: updated.role_id,
  };
});

router.prefix("/users");

module.exports = router;
