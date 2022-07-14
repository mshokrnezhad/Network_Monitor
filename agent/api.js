const axios = require("axios");
const API_URL = "http://23.22.67.147:8000/v1";

async function getAllNodes() {
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

module.exports = {
  getAllNodes,
};
