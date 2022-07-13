const express = require("express");
const { httpGetAllNodes } =  require("./nodes.controller")
const nodesRouter = express.Router();

nodesRouter.get("/", httpGetAllNodes);

module.exports = nodesRouter;