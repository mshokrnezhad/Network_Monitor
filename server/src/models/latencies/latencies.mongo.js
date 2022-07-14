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
  maxRTT: {
    type: Number,
    required: true,
  },
  minRTT: {
    type: Number,
    required: true,
  },
  avgRTT: {
    type: Number,
    required: true,
  },
  loss: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Latencies", latenciesSchema);
