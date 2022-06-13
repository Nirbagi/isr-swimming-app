const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ISR Swimming Association Backend Docs",
      version: "1.0.0",
    },
  },
  apis: ["./src/server/routes/*.js", `${__dirname}/*.yaml`],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
