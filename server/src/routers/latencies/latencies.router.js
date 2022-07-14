const express = require("express");
const {
  httpGetAllLatencies,
  httpGetAllLatenciesPerNode,
  httpPostNewLatencies,
} = require("./latencies.controller");

const latenciesRouter = express.Router();

latenciesRouter.get("/", httpGetAllLatencies);
latenciesRouter.get("/:name", httpGetAllLatenciesPerNode);
latenciesRouter.post("/", httpPostNewLatencies);

module.exports = latenciesRouter;
