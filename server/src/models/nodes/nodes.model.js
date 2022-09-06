const fs = require("fs");
const nodes = require("./nodes.mongo");
const { parse } = require("csv-parse");
const path = require("path");
const axios = require("axios");

async function loadMiniclouds() {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.MMM_API}`,
    });

    if (response.status == 200) {
      const miniclouds = response.data;
      const minicloudCounter = miniclouds.length;

      if (minicloudCounter == 0) {
        return 0;
      } else
        console.log(nodeCounter);
        // nodeCounter += 1;
        // await saveNode(data);
        // return await response.data;
    } else {
      console.log("😩 getting the list of miniclouds is failed!");
    }
  } catch {
    console.log("😩 getting the list of miniclouds is failed!");
  }

  // return new Promise((resolve, reject) => {
  //   fs.createReadStream(
  //     path.join(__dirname, "..", "..", "..", "data", "nodes.csv")
  //   )
  //     .pipe(
  //       parse({
  //         comment: "#",
  //         columns: true,
  //       })
  //     )
  //     .on("data", async (data) => {
  //       nodeCounter += 1;
  //       await saveNode(data);
  //     })
  //     .on("error", (error) => {
  //       console.log(`saving nodes is failed: ${error}`);
  //       reject();
  //     })
  //     .on("end", async () => {
  //       console.log(`the number of nodes is ${nodeCounter}.`);
  //       resolve();
  //     });
  // });
}

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
