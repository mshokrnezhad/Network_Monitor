const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL;

async function httpGetAllNodes() {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/nodes`,
    });

    if (response.status == 200) {
      return await response.data;
    } else {
      console.log("😩 getting the list of nodes is failed!");
    }
  } catch {
    console.log("😩 getting the list of nodes is failed!");
  }
}

async function httpPostMeasuredData(data) {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}//latencies`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    if (response.status == 201) {
      return await response.data;
    } else {
      console.log("😩 posting measured data is failed!");
    }
  } catch {
    console.log("😩 posting measured data is failed!");
  }
}

module.exports = {
  httpGetAllNodes,
  httpPostMeasuredData,
};
