const http = require("http");
const app = require("./app");
require("dotenv").config();
const { loadMiniclouds } = require("./models/nodes/nodes.model");
const { connectToMongodb } = require("../src/services/mongodb");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectToMongodb();
  const minicloudCounter = await loadMiniclouds();

  if (minicloudCounter == 0) {
    console.log("😩 there is no minicloud available!");
    return 0;
  } else {
    server.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  }
}

startServer();
