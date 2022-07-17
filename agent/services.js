const { result } = require("lodash");
const _ = require("lodash");
const ping = require("ping");
const { httpGetAllNodes, httpPostMeasuredData } = require("./api");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
var PING_INTERVAL = 5000;
var PUBLISH_INTERVAL = 60000 - 1000; //15000 - 1000
var NODES = [];
var NODE_NAME = "";
var results = [];
var isDataPublished = false;

async function getAllNodes() {
  NODES = await httpGetAllNodes();

  console.log("\nthe list of active miniclouds:");
  NODES.map((node) => {
    console.log("-", node.nodeName);
  });
}

function getNodeName() {
  return new Promise((resolve) =>
    readline.question(
      "\nwhat is the name of this minicloud (it should be one of the active miniclouds)? ",
      (data) => {
        NODE_NAME = data;
        readline.close();
        resolve(NODE_NAME);
      }
    )
  );
}

function validateNodeName() {
  const nodeInfo = NODES.find((node) => {
    return node.nodeName === NODE_NAME;
  });
  if (nodeInfo) {
    return true;
  } else {
    throw new Error("😩 the entered minicloud name is invalid!");
  }
}

function measureLinks() {
  var pingInterval = setInterval(pingNodes, PING_INTERVAL);

  console.log("");

  async function pingNodes() {
    console.log("🦀 measuring links...");

    if (isDataPublished) {
      results = [];
      isDataPublished = false;
    }

    for (let node of await NODES) {
      if (node.nodeName !== NODE_NAME) {
        let response = await ping.promise.probe(node.nodeAddress);
        results.push({
          to: node.nodeName,
          min: _.toNumber(response.min),
          max: _.toNumber(response.max),
          avg: _.toNumber(response.avg),
          loss: _.toNumber(response.packetLoss),
        });
      }
    }
  }
}

function publishResults() {
  var publishID = setInterval(sendData, PUBLISH_INTERVAL);

  async function sendData() {
    console.log("🐝 publishing results...");

    var data = [];

    NODES.map((node) => {
      if (node.nodeName !== NODE_NAME) {
        const nodeResults = _.filter(results, (result) => {
          return result.to === node.nodeName;
        });
        const minRTT =
          !_.isUndefined(_.minBy(nodeResults, "min")) &&
          !_.isNaN(_.minBy(nodeResults, "min"))
            ? _.round(_.minBy(nodeResults, "min").min, 3)
            : -1;
        const maxRTT =
          !_.isUndefined(_.maxBy(nodeResults, "max")) &&
          !_.isNaN(_.maxBy(nodeResults, "max"))
            ? _.round(_.maxBy(nodeResults, "max").max, 3)
            : -1;
        const avgRTT =
          !_.isUndefined(_.meanBy(nodeResults, "avg")) &&
          !_.isNaN(_.meanBy(nodeResults, "avg"))
            ? _.round(_.meanBy(nodeResults, "avg"), 3)
            : -1;
        const lossRate =
          !_.isUndefined(_.meanBy(nodeResults, "loss")) &&
          !_.isNaN(_.meanBy(nodeResults, "loss"))
            ? _.round(_.meanBy(nodeResults, "loss"), 3)
            : -1;

        data.push({
          date: Date.now(),
          from: NODE_NAME,
          to: node.nodeName,
          avgRTT: avgRTT,
          loss: lossRate,
          maxRTT: maxRTT,
          minRTT: minRTT,
        });
      }
    });

    isDataPublished = true;

    await httpPostMeasuredData(data);
  }
}

module.exports = {
  getAllNodes,
  getNodeName,
  validateNodeName,
  measureLinks,
  publishResults,
};
