const express = require("express");
//const latencyRouter = require("./latency/latency.router");
const nodeRouter = require("./node/node.router");
const api = express.Router();

//api.use("/latency", latencyRouter);
api.use("/node", nodeRouter);

module.exports = api;