const express = require("express");
const { httpGetAllNodes } =  require("./nodes.controller")
const nodeRouter = express.Router();

nodeRouter.get("/", httpGetAllNodes);

module.exports = nodeRouter;