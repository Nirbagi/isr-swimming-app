const KoaRouter = require("koa-joi-router");
const queries = require("../db/queries/users");
const joinQueries = require("../db/queries/join_queries");
const {
  edit_role_schema,
  edit_user_schema,
} = require("../services/shcema_validators/users_schemas");

const router = new KoaRouter();

router.get("/info", async (ctx) => {
  const user_info = await queries.getUserInfoByID(ctx.session.user_id);
  ctx.status = 200;
  ctx.body = user_info;
});

router.patch("/info", async (ctx) => {
  const update_info = await edit_user_schema.validateAsync(ctx.request.body);
  const updated_user_id = await queries.updateUser(
    ctx.session.user_id,
    update_info
  );
  ctx.status = 200;
  ctx.body = { status: "updated", user_id: updated_user_id };
});

router.get("/role/:user_id", async (ctx) => {
  const role = await joinQueries.getUserRoleNameID(ctx.params.user_id);
  ctx.status = 200;
  ctx.body = role;
});

router.patch("/role/edit/:user_id", async (ctx) => {
  const role_info = await edit_role_schema.validateAsync(ctx.request.body);
  const updated = await queries.updateUserRoleID(
    ctx.params.user_id,
    role_info.role_id
  );
  ctx.status = 200;
  ctx.body = {
    status: "updated",
    user_id: updated.user_id,
    role_id: updated.role_id,
  };
});

router.prefix("/users");

module.exports = router;
