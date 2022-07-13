const mongoose = require("mongoose");

const nodeSchema = mongoose.Schema({
    nodeName: {
        type: String,
        required: true
    },
    nodeAddress: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Nodes", nodeSchema);