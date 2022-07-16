const latencies = require("./latencies.mongo");
const _ = require("lodash");
const { getAllNodes } = require("../nodes/nodes.model");

async function getAllLatencies(limit) {
  const NODES = await getAllNodes();

  const allLatencies = await latencies
    .find({ date: { $gt: limit } }, { _id: 0, __v: 0 })
    .sort({ date: 1 });

  return (processedLatencies = processLatencies(NODES, allLatencies));
}

async function getAllLatenciesPerName(nodeName, limit) {
  const NODES = await getAllNodes();

  const allLatenciesPerNode = await latencies
    .find({ from: nodeName, date: { $gt: limit } }, { _id: 0, __v: 0 })
    .sort({ date: 1 });
  console.log(allLatenciesPerNode);

  return (processedLatenciesPerNode = processLatenciesPerNode(
    nodeName,
    NODES,
    allLatenciesPerNode
  ));
}

async function addNewLatencies(newLatencies) {
  newLatencies.map(async (latency) => {
    await saveLatency(latency);
  });
}

async function findLatency(filter) {
  return await latencies.findOne(filter);
}

async function searchNodeName(nodeName) {
  return await findLatency({
    nodeName: nodeName,
  });
}

async function saveLatency(data) {
  await latencies.findOneAndUpdate(
    {
      to: data.to,
      from: data.from,
      date: data.date,
    },
    data,
    {
      upsert: true,
    }
  );
}

function processLatencies(NODES, allLatencies) {
  var processedLatencies = [];

  NODES.map((NODE1) => {
    NODES.map((NODE2) => {
      if (NODE1.nodeName !== NODE2.nodeName) {
        const filteredLatencies = _.filter(allLatencies, (filteredRecord) => {
          return (
            filteredRecord.from === NODE1.nodeName &&
            filteredRecord.to === NODE2.nodeName
          );
        });

        const minRTT =
          !_.isUndefined(_.minBy(filteredLatencies, "minRTT")) &&
          !_.isNaN(_.minBy(filteredLatencies, "minRTT"))
            ? _.round(_.minBy(filteredLatencies, "minRTT").minRTT, 3)
            : -1;
        const maxRTT =
          !_.isUndefined(_.maxBy(filteredLatencies, "maxRTT")) &&
          !_.isNaN(_.maxBy(filteredLatencies, "maxRTT"))
            ? _.round(_.maxBy(filteredLatencies, "maxRTT").maxRTT, 3)
            : -1;
        const avgRTT =
          !_.isUndefined(_.meanBy(filteredLatencies, "avgRTT")) &&
          !_.isNaN(_.meanBy(filteredLatencies, "avgRTT"))
            ? _.round(_.meanBy(filteredLatencies, "avgRTT"), 3)
            : -1;
        const lossRate =
          !_.isUndefined(_.meanBy(filteredLatencies, "loss")) &&
          !_.isNaN(_.meanBy(filteredLatencies, "loss"))
            ? _.round(_.meanBy(filteredLatencies, "loss"), 3)
            : -1;

        processedLatencies.push({
          from: NODE1.nodeName,
          to: NODE2.nodeName,
          avgRTT: avgRTT,
          loss: lossRate,
          maxRTT: maxRTT,
          minRTT: minRTT,
        });
      }
    });
  });

  return processedLatencies;
}

function processLatenciesPerNode(nodeName, NODES, allLatencies) {
  var processedLatencies = [];

  NODES.map((NODE2) => {
    if (nodeName !== NODE2.nodeName) {
      const filteredLatencies = _.filter(allLatencies, (filteredRecord) => {
        return (
          filteredRecord.from === nodeName &&
          filteredRecord.to === NODE2.nodeName
        );
      });

      const minRTT =
        !_.isUndefined(_.minBy(filteredLatencies, "minRTT")) &&
        !_.isNaN(_.minBy(filteredLatencies, "minRTT"))
          ? _.round(_.minBy(filteredLatencies, "minRTT").minRTT, 3)
          : -1;
      const maxRTT =
        !_.isUndefined(_.maxBy(filteredLatencies, "maxRTT")) &&
        !_.isNaN(_.maxBy(filteredLatencies, "maxRTT"))
          ? _.round(_.maxBy(filteredLatencies, "maxRTT").maxRTT, 3)
          : -1;
      const avgRTT =
        !_.isUndefined(_.meanBy(filteredLatencies, "avgRTT")) &&
        !_.isNaN(_.meanBy(filteredLatencies, "avgRTT"))
          ? _.round(_.meanBy(filteredLatencies, "avgRTT"), 3)
          : -1;
      const lossRate =
        !_.isUndefined(_.meanBy(filteredLatencies, "loss")) &&
        !_.isNaN(_.meanBy(filteredLatencies, "loss"))
          ? _.round(_.meanBy(filteredLatencies, "loss"), 3)
          : -1;

      processedLatencies.push({
        from: nodeName,
        to: NODE2.nodeName,
        avgRTT: avgRTT,
        loss: lossRate,
        maxRTT: maxRTT,
        minRTT: minRTT,
      });
    }
  });

  return processedLatencies;
}

module.exports = {
  getAllLatencies,
  searchNodeName,
  addNewLatencies,
  getAllLatenciesPerName,
};
