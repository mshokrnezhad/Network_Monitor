const fs = require("fs");
const nodes = require("./nodes.mongo");
const { parse } = require("csv-parse");
const path = require("path");
const axios = require("axios");
const FETCHING_MINICLOUDS_INTERVAL = 60000;

async function loadMiniclouds() {
  await fetchMiniclouds();
  setInterval(fetchMiniclouds, FETCHING_MINICLOUDS_INTERVAL);
}

async function fetchMiniclouds() {
  try {
    await nodes.deleteMany({});
    const response = await axios({
      method: "get",
      url: `${process.env.MMM_API}`,
    });

    if (response.status == 200) {
      const miniclouds = response.data;
      const minicloudCounter = miniclouds.length;

      if (minicloudCounter != 0) {
        miniclouds.map(async (minicloud) => {
          await saveNode({ nodeName: minicloud.minicloudId, nodeAddress: minicloud.echoserverIp });
        });
        console.log(`😎 ${minicloudCounter} minicloud(s) is/are available!`);
      }
    } else {
      console.log(`😩 getting the list of miniclouds is failed! status code is ${response.status}`);
    }
  } catch {
    console.log("😩 something bad happend in getting the list of miniclouds!");
  }
}

// async function fetchMiniclouds() {
//   await nodes.deleteMany({});
//   var nodeCounter = 0;
  
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(path.join(__dirname, "..", "..", "..", "data", "nodes.csv"))
//       .pipe(
//         parse({
//           comment: "#",
//           columns: true,
//         })
//       )
//       .on("data", async (data) => {
//         nodeCounter += 1;
//         await saveNode(data);
//       })
//       .on("error", (error) => {
//         console.log(`saving nodes is failed: ${error}`);
//         reject();
//       })
//       .on("end", async () => {
//         console.log(`the number of nodes is ${nodeCounter}.`);
//         resolve();
//       });
//   });
// }

async function saveNode(data) {
  try {
    await nodes.updateOne(
      {
        nodeName: data.nodeName,
        nodeAddress: data.nodeAddress,
      },
      {
        nodeName: data.nodeName,
        nodeAddress: data.nodeAddress,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`saving nodes is failed: ${error}`);
  }
}

async function getAllNodes() {
  return await nodes.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

module.exports = {
  loadMiniclouds,
  getAllNodes,
};
