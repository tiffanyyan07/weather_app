"use strict";

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var swaggerTools = require("swagger-tools");

function start() {
  var app = express();
  app.use(morgan("dev"));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(bodyParser.json());

  var swaggerOpt = {
    swaggerUi: "/swagger.json",
    controllers: "./controller",
    useStubs: process.env.NODE_ENV === "development" ? true : false,
  };

  var swaggerDoc = require("./swagger.json");

  swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator());
    app.use(middleware.swaggerUi());
    app.use(middleware.swaggerRouter(swaggerOpt));
  });
  return app;
}

module.exports = start();
