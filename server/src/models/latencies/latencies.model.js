const latencies = require("./latencies.mongo");

async function getAllLatencies(skip, limit) {
  return await latencies
    .find({}, { _id: 0, __v: 0 })
    .sort({ date: 1 })
    .skip(skip)
    .limit(limit);
}

async function getAllLatenciesPerName(nodeName) {
  return await latencies
    .find({ from: nodeName }, { _id: 0, __v: 0 })
    .sort({ date: 1 });
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

module.exports = {
  getAllLatencies,
  searchNodeName,
  addNewLatencies,
  getAllLatenciesPerName,
};
