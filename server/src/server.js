const http = require("http");
const app = require("./app");
require("dotenv").config();
const { loadNodesData } = require("./models/nodes/nodes.model");
const { connectToMongodb } = require("../src/services/mongodb");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectToMongodb();
  await loadNodesData();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

startServer();
