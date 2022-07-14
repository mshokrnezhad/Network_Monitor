const ping = require("ping");
const { getAllNodes } = require("./api");
var PING_INTERVAL = 5000;
var PUBLISH_INTERVAL = 15000 - 1000; //60000 - 1000;
var NODES = [];

async function loadData() {
  NODES = await getAllNodes();
}

loadData();

var pingInterval = setInterval(pingNodes, PING_INTERVAL);
var results = [];
async function pingNodes() {
  //console.log("🦕 pinging nodes...");
  for (let node of await NODES) {
    let response = await ping.promise.probe(node.nodeAddress);
    results.push({
      to: node.nodeName,
      min: response.min,
      max: response.max,
      avg: response.avg,
      loss: response.packetLoss,
    });
  }
}

var publishID = setInterval(printResults, PUBLISH_INTERVAL);
function printResults() {
  console.log("---", Date.now(), "---");
  results.map((result) => {
    console.log(result.to, result.min, result.max, result.avg, result.loss);
  });
  results = [];
}
