const express = require("express");
const { httpGetAllNodes } =  require("./node.controller")
const nodeRouter = express.Router();

nodeRouter.get("/", httpGetAllNodes);

module.exports = nodeRouter;