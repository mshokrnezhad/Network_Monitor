const {
  getAllLatencies,
  getAllLatenciesPerName,
  addNewLatency,
  searchNodeName,
} = require("../../models/latencies/latencies.model");
const { getPagination } = require("../../services/query");

async function httpGetAllLatencies(req, res) {
  const { skip, limit } = getPagination(req.query);
  const latencies = await getAllLatencies(skip, limit);
  return res.status(200).json(latencies);
}

async function httpGetAllLatenciesPerNode(req, res) {
  const nodeName = req.params.name;
  const isNodeNameAvailable = await searchNodeName(nodeName);

  if (!isNodeNameAvailable) {
    return res
      .status(404)
      .json({ error: "😩 the node name is not available." });
  }

  const latencies = await getAllLatenciesPerName(nodeName);
  return res.status(200).json(latencies);
}

async function httpPostNewLatency(req, res) {
  const latency = req.body;

  if (!latency.date || !latency.from || !latency.to || !latency.rtt) {
    return res.status(400).json({
      error: "😩  at least one of the required launch properties is missed.",
    });
  }

  await addNewLatency(latency);
  return res.status(201).json(latency);
}

module.exports = {
  httpGetAllLatencies,
  httpGetAllLatenciesPerNode,
  httpPostNewLatency,
};
