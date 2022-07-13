const express = require("express");
//const latencyRouter = require("./latency/latency.router");
const nodeRouter = require("./nodes/nodes.router");
const api = express.Router();

//api.use("/latency", latencyRouter);
api.use("/nodes", nodeRouter);

module.exports = api;