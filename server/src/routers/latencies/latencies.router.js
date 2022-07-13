const express = require("express");
const {
  httpGetAllLatencies,
  httpGetAllLatenciesPerNode,
  httpPostNewLatency,
} = require("./latencies.controller");

const latenciesRouter = express.Router();

latenciesRouter.get("/", httpGetAllLatencies);
latenciesRouter.get("/:name", httpGetAllLatenciesPerNode);
latenciesRouter.post("/", httpPostNewLatency);

module.exports = latenciesRouter;
