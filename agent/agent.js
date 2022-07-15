const {
  getAllNodes,
  getNodeName,
  validateNodeName,
  measureLinks,
  publishResults,
} = require("./services");

async function startAgent() {
  await getAllNodes();
  await getNodeName();
  validateNodeName();
  measureLinks();
  publishResults();
}

startAgent();
