const { getAllNodes } = require("../../models/nodes/nodes.model")

async function httpGetAllNodes (req, res) {
    return res.status(200).json(await getAllNodes());
}

module.exports = { httpGetAllNodes };