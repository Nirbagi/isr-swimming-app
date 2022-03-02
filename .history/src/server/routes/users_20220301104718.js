const Router = require('@koa/router');
const queris = require('../db/queries');

const router = new Router();
const BASE_URL = '/v1/users';

module.exports = router