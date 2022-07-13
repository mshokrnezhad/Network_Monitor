const express = require("express");
const latenciesRouter = require("./latencies/latencies.router");
const nodesRouter = require("./nodes/nodes.router");
const api = express.Router();

api.use("/latencies", latenciesRouter);
api.use("/nodes", nodesRouter);

module.exports = api;