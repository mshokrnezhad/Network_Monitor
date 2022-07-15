const axios = require("axios");
const API_URL = "http://23.22.67.147:8000/v1";

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
