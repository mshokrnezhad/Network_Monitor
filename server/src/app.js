const express = require("express");
const morgan = require("morgan");
const app = express();
const api = require("./routers/api");

app.use(morgan("combined"));
app.use(express.json());

app.use("/v1", api);

module.exports = app;