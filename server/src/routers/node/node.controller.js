const { getAllNodes } = require("../../models/node/node.model")

async function httpGetAllNodes (req, res) {
    return res.status(200).json(await getAllNodes());
}

module.exports = { httpGetAllNodes };