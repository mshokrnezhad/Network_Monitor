const mongoose = require("mongoose");

const latenciesSchema = mongoose.Schema({
  date: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
    required: true,
  },
  rtt: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Latencies", latenciesSchema);
