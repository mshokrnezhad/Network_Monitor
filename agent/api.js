const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL;

async function httpGetAllNodes() {
  const response = await axios({
    method: "get",
    url: `${API_URL}/nodes`,
  });

  if (response.status == 200) {
    return await response.data;
  } else {
    return { error: "😩 getting the ist of nodes is failed!" };
  }
}

async function httpPostMeasuredData(data) {
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
    return { error: "😩 posting measured data is failed!" };
  }
}

module.exports = {
  httpGetAllNodes,
  httpPostMeasuredData,
};
